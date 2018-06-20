const express = require('express');
const fs = require('fs');
var mkdirp = require('mkdirp');
const path = require('path');
const environment = require('./environment');
const request = require('./request');
const jenkins = require("./jenkins");
const sonarProperties = require("./sonar-properties");
const multer = require('multer');
const bodyParser = require("body-parser");
const db = require('./db');
const ncp = require('ncp').ncp;
const rimraf = require('rimraf');
const xmlReader = require('read-xml');
const parseString = require('xml2js').parseString;
db.init();

var app = express();
const upload = multer();

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

// middleware
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} | ${req.url}`;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    console.log(log);

    if ("OPTIONS" == req.method) {
        res.sendStatus(200);
    } else {
        fs.appendFile('server.log', log + '\n', (err) => {
            if (err) {
                console.log('Unable to append to server.log');
            }
        });
        next();
    }
});


// controllers
// get the quality file (java)
app.get('/qualityFile', (req, res) => {
    request.getWithUrl('/qualityprofiles/search?language=java')
        .then(result => {
            db.selectAll('Assignments')
                .then(response => {
                    res.send({ 'sonar': JSON.parse(result.body), 'db': response });
                })
        })
        .catch(err => { throw err });
});

// update one project detail
app.put('/qualityFile/:id', (req, res) => {
    const key = req.params.id;
    const obj = req.body;
    db.update('Assignments', obj, `ID='${key}'`)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            throw err
        });
});

// get assignment with course code
app.get('/qualityFile/:courseCode', (req, res) => {
    const courseCode = req.params.courseCode;
    db.selectWithCondition('Assignments', `CourseCode='${courseCode}'`)
        .then(result => {
            console.log('assignment with course code', result);
            delete result.SpecFilePath;
            delete result.ExtraFilePath
            res.send(result);
        })
        .catch(err => {
            throw err
        });
});

// create a new quality file/ assignment
var cpUpload = upload.fields([{ name: 'specFile', maxCount: 1 }, { name: 'extraFile', maxCount: 1 }])
app.post('/qualityFile/create', cpUpload, (req, res, next) => {
    // const type = req.params.type;

    // const name = req.params.name;
    const obj = req.body;
    const key = environment.baseProfiles[obj.language];
    request.postWithUrl(`/qualityprofiles/copy?fromKey=${key}&toName=${obj.Name}`)
        .then((response) => {
            const body = JSON.parse(response.body);
            const key = body.key;
            console.log(key);
            const folderPath = `/files/assignments/${key}`;
            const basePath = __dirname + folderPath;
            if (!fs.existsSync(basePath)) {
                console.log('create new file path');
                fs.mkdirSync(basePath);
            }
            if (req.files['specFile']) {
                obj['SpecFilePath'] = folderPath + '/spec.pdf';
                fs.writeFile(`${basePath}/spec.pdf`, req.files['specFile'][0].buffer, { flag: 'wx' }, function (err) {
                    if (err) throw err;
                    console.log("It's saved!");
                });
            }
            if (req.files['extraFile']) {
                obj['ExtraFilePath'] = folderPath + '/extra.zip';
                fs.writeFile(`${basePath}/extra.zip`, req.files['extraFile'][0].buffer, { flag: 'wx' }, function (err) {
                    if (err) throw err;
                    console.log("It's saved!");
                });
            }
            delete obj.extraFile;
            delete obj.specFile;
            delete obj.language;
            db.insert('Assignments', { ...obj, ID: key });
            console.log(obj);
            res.send(body);
        }).catch((err) => {
            console.error(err);
            res.send(err.body);
        });
})

app.post('/testFiles', upload.array('files'), function (req, res, next) {
    const obj = req.body;
    const key = obj.key;
    const folderPath = `/files/assignments/${key}`;
    const basePath = __dirname + folderPath;
    let pathToFile = ensureDirectoryExistence(basePath);
    let pathToTestFiles = ensureDirectoryExistence(pathToFile + "/test-files/");

    req.files.forEach((file) => {
        let name = file.originalname;
        if (name.endsWith(".java")) {
            const filePath = pathToTestFiles + name;
            fs.writeFile(filePath, file.buffer, { flag: 'w' }, function (err) {
                if (err) throw err;
                console.log("Test file saved!");
            });
            console.log("Test file saved!");
        } else {
            console.log("File not saved as not a java test");
        }
    })
    res.send();
})

app.get('/download/spec/:key', function (req, res) {
    const key = req.params.key;
    const file = __dirname + `/files/assignments/${key}/spec.pdf`;
    res.download(file); // Set disposition and send it.
});

app.get('/download/extra/:key', function (req, res) {
    const key = req.params.key;
    const file = __dirname + `/files/assignments/${key}/extra.zip`;
    res.download(file); // Set disposition and send it.
});

// add rules to a assignment
app.post('/rules/apply_rule/:query', (req, res) => {
    const query = req.params.query;
    request.post(`/qualityprofiles/activate_rule?${query}`, res);
})

// delete a quality file
app.delete('/qualityFile/:key/:val', (req, res) => {
    const key = req.params.key;
    const val = req.params.val;
    // request.deleteQF(`/qualityprofiles/delete?profile=${key}`).then((response) => {
    //     db.delete('Assignments', key);
    //     rimraf(__dirname + '/files/assignments/' + key, () => { console.log('folder deleted') });
    //     res.send(JSON.parse(response.body));
    // }).catch((err) => {
    //     if (err.body === undefined) {
    //         res.sendStatus(200);
    //     } else {
    //         res.send(err.body);
    //     }
    // })
    db.update('Assignments', { Active: val }, `ID='${key}'`).then((response) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(404);
    })
})


// get one project detail from db
app.get('/project/:id', (req, res) => {
    const key = req.params.id;
    const query = `SELECT s.*, a.DueDate, a.TotalMarks FROM Submissions s JOIN Assignments a ON s.AssignmentID=a.ID AND s.id='${key}'`;
    console.log(query);
    db.customQuery(query)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            throw err
        });
});

// get one project by student id and assignment detail
app.post('/project', (req, res) => {
    const obj = req.body;
    console.log(obj);
    db.selectWithCondition('Submissions', `StudentID='${obj.StudentID}' AND AssignmentID='${obj.AssignmentID}'`)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
            throw err;
        })
});

app.put('/project/:id', (req, res) => {
    const key = req.params.id;
    const obj = req.body;
    console.log(obj, key);
    db.update('Submissions', obj, `ID='${key}'`)
        .then(ok => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.send(err);
            throw err;
        });
});

// get all projects
app.get('/projects/search', (req, res) => {
    request.get('/projects/search', res)
});

// get projects of this quality profile key
app.get('/projects/search/:key', (req, res) => {
    const key = req.params.key;
    db.selectOne('Assignments', key)
        .then(result => {
            db.selectWithCondition('Submissions', `AssignmentID='${key}'`)
                .then(subRes => {
                    res.send({ 'submissions': subRes, 'assignment': result });
                });
        })
        .catch(err => {
            throw err
        });
});

// create a new project
app.post('/projects/create/:name/:projectKey', (req, res) => {
    const key = req.params.projectKey;
    const name = req.params.name;
    request.post(`/projects/create?project=${key}&name=${name}`, res);
});

app.post('/form', upload.array('files'), function (req, res, next) {
    const obj = req.body;
    const key = (`${obj.Name}_${obj.StudentID}`).replace(' ', '_');
    const folderPath = `/files/submissions/${key}`;
    const requiredFilesPath = __dirname + '/project_required_files';
    const basePath = __dirname + folderPath;
    const assignmentTestPath = __dirname + `/files/assignments/${obj.AssignmentID}/test-files`;

    let pathToFile = ensureDirectoryExistence(basePath);
    let pathToClassFiles = ensureDirectoryExistence(pathToFile + "/java-classes/");
    // let pathToJavaFiles = ensureDirectoryExistence(pathToFile + "/java-files/");
    let jenkinsResultPath = ensureDirectoryExistence(pathToFile + "/jenkin_results");
    const ckjmJarLocation = requiredFilesPath + '/ckjm-1.8.jar';
    const gradleBuildLocation = requiredFilesPath + '/build.gradle';
    const write_location = jenkinsResultPath + '/results.txt';
    const submissionGradleBuild = pathToFile + "/build.gradle"

    //Gradle Structure
    let srcFolder = ensureDirectoryExistence(pathToFile + "/src/");
    let mainJavaFolder = ensureDirectoryExistence(srcFolder + 'main/');
    let javaSource = ensureDirectoryExistence(mainJavaFolder + "java/");
    let javaResourceSource = ensureDirectoryExistence(mainJavaFolder + "resources/");
    let mainTestFolder = ensureDirectoryExistence(srcFolder + "test/");
    let testJavaSource = ensureDirectoryExistence(mainTestFolder + "java/");
    let testResourceSource = ensureDirectoryExistence(mainTestFolder + "resources/");
    // cleanDirectory(pathToJavaFiles, () => {
    cleanDirectory(javaSource, () => {
        cleanDirectory(pathToClassFiles, () => {
            req.files.forEach((file) => {
                let name = file.originalname;
                if (name.endsWith(".java")) {
                    // const filePath = pathToJavaFiles + name;
                    const gradlePath = javaSource + name;
                    // fs.writeFile(filePath, file.buffer, { flag: 'w' }, function (err) {
                    //     if (err) throw err;
                    //     console.log("It's saved!");
                    // });
                    fs.writeFile(gradlePath, file.buffer, { flag: 'w' }, function (err) {
                        if (err) throw err;
                        console.log("Saved for gradle testing!");
                    });
                } else if (name.endsWith(".class")) {
                    const filePath = pathToClassFiles + name;
                    fs.writeFile(filePath, file.buffer, { flag: 'w' }, function (err) {
                        if (err) throw err;
                        console.log("It's saved!");
                    });
                }
            })
        })
    })
    // })


    // check if this is first submit
    console.log('out');
    db.selectWithCondition('Submissions', `StudentID='${obj.StudentID}' AND AssignmentID='${obj.AssignmentID}'`)
        .then(result => {
            // first submit
            console.log(result);
            if (result.length === 0) {

                //copy test files
                ncp(assignmentTestPath, testJavaSource, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('done!');
                });

                const filePath = pathToFile + "/sonar-project.properties";
                const buffer = sonarProperties.sonarPropertiesText(key)

                //Creates the gradle build file
                fs.createReadStream(gradleBuildLocation).pipe(
                    fs.createWriteStream(submissionGradleBuild));

                //Creates the sonar properties file
                fs.writeFile(filePath, buffer, { flag: 'w' }, function (err) {
                    if (err) throw err;
                    console.log("Sonar properties file created");
                });
                // // create project
                request.postWithUrl(`/projects/create?project=${key}&name=${key}`)
                    .then(response => {
                        let submit = {
                            ID: key,
                            StudentID: obj.StudentID,
                            Version: 1,
                            AssignmentID: obj.AssignmentID,
                            LastSubmited: new Date(),
                            Path: '/files/submissions/' + key + '/'
                        }
                        db.insert('Submissions', submit);
                        request.post(`/qualityprofiles/add_project?profile=${obj.AssignmentID}&project=${key}`, res);
                    }).then(() => {
                        jenkins.createJob(requiredFilesPath, key, function () {
                            jenkins.buildJob(key, submissionGradleBuild, ckjmJarLocation,
                                write_location, pathToClassFiles + "*.class", pathToFile);
                        })
                    })

                    // })
                    .catch(err => {
                        throw err;
                    });
            } else {
                // if already exist
                // Will call the parent directory of sonar files as the scanner requires this
                jenkins.buildJob(key, submissionGradleBuild, ckjmJarLocation,
                    write_location, pathToClassFiles + "*.class", pathToFile);
                let submit = {
                    Version: result[0].Version + 1,
                    LastSubmited: new Date(),
                    Scanned: false
                }
                db.update('Submissions', submit, `ID='${key}'`);
                res.sendStatus(200);
            }
        })
        .catch(err => {
            throw err
        });
});

function cleanDirectory(directory, callback) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(directory + file, err => {
                if (err) throw err;
            });
        }
        callback();
    })
}

app.post("/retrieve_results", (req, res) => {
    finalData = {};
    const fetchResults = []
    const obj = req.body;
    const key = (`${obj.Name}_${obj.StudentID}`).replace(' ', '_');
    db.selectWithCondition('Submissions', `StudentID='${obj.StudentID}' AND AssignmentID='${obj.AssignmentID}'`)
        .then((result) => {
            if (result[0].Scanned == 1) {
                res.send("ok");
                // const folderPath = `/files/submissions/${key}/jenkin_results/results.txt`;
                // const resultPath = __dirname + folderPath;
                // readFile(resultPath, (data) => {
                //     finalData['ckjmData'] = data;
                //     finalData['sonarData'] = result;
                //     finalData['resultPath'] = __dirname + '/files/submissions/' + key + '/build/reports/tests/test/index.html';
                //     res.send(finalData);
                // })


            } else {
                res.send();
            }
        })
        .catch(err => {
            throw err
        });
})

app.post("/retrieve_past_results", (req, res) => {
    finalData = {};
    cache = [];
    const fetchResults = []
    const obj = req.body;
    const key = (`${obj.Name}_${obj.StudentID}`).replace(' ', '_');
    const testResultPath = __dirname + '/files/submissions/' + key + '/build/test-results/test/';
    db.selectWithCondition('Submissions', `StudentID='${obj.StudentID}' AND AssignmentID='${obj.AssignmentID}'`)
        .then((result) => {
            if (result.length !== 0) {
                if (result[0].Scanned == 1 || result[0].Version > 1) {
                    const folderPath = `/files/submissions/${key}/jenkin_results/results.txt`;
                    const resultPath = __dirname + folderPath;
                    readFile(resultPath, (data) => {
                        request.getWithUrl(`/issues/search?componentKeys=${result[0].ID}`)
                            .then(sonarData => {
                                finalData['ckjmData'] = data;
                                finalData['sonarData'] = JSON.parse(sonarData.body);
                                // finalData['resultPath'] = __dirname + '/files/submissions/' + key + '/build/reports/tests/test/index.html';
                                // res.send(finalData);

                                fs.readdir(testResultPath, (err, files) => {
                                    if (err) throw err;
                                    for (const file of files) {
                                        if (file.startsWith("TEST")) {
                                            console.log(path.join(testResultPath, file));
                                            xmlReader.readXML(fs.readFileSync(path.join(testResultPath, file)), function (err, data) {
                                                if (err) {
                                                    console.error(err);
                                                    res.senD(err);
                                                }
                                                parseString(data.content, function (err, result1) {
                                                    cache.push(result1);
                                                });
                                            });
                                        }
                                    }
                                    finalData['testData'] = cache;
                                    res.send(finalData);
                                })
                            })
                            .catch(err => res.send(err));
                    })
                } else {
                    res.send();
                }
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => {
            throw err
        });
})


app.post("/test_read", (req, res) => {
    cache = {};
    key = req.body.key;
    console.log(key);
    resultPath = __dirname + '/files/submissions/' + key + '/build/test-results/test/';
    fs.readdir(resultPath, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if (file.startsWith("TEST")) {
                console.log(path.join(resultPath, file));
                xmlReader.readXML(fs.readFileSync(path.join(resultPath, file)), function (err, data) {
                    if (err) {
                        console.error(err);
                    }
                    parseString(data.content, function (err, result) {
                        cache[result.testsuite.$.name] = result;
                    });
                });
            }
        }
        res.send(cache);
    })
})

function readFile(resultPath, callback) {
    fs.readFile(resultPath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }
        callback(data);
    });
};

app.post("/api/scan_response", function (req, res, next) {
    if (req.body.result == "Done") {
        console.log(req.body.key);
        // Will retrieve the student number from the key
        const key = req.body.key;
        let submit = {
            Scanned: true
        }
        db.update('Submissions', submit, `ID='${key}'`)
            .catch(err => {
                throw err
            });
    }
    res.sendStatus(200);
})

app.post("/ckjm/ckjm_set_rules", (req, res) => {
    const metrics = req.body.metrics;
    const name = req.body.name;
    const key = req.body.key;
    let submit = {
        CkjmMetrics: metrics
    }
    db.update('Assignments', submit, `Name='${name}' AND ID='${key}'`)
        .catch(err => {
            throw err
        });
    res.send();
})

app.post("/ckjm/retrieve_metrics", (req, res) => {
    const id = req.body.AssignmentID;
    db.selectWithCondition('Assignments', `ID='${id}'`)
        .then(result => res.send(result[0].CkjmMetrics))
        .catch(err => {
            throw err
        });
})

function ensureDirectoryExistence(filePath) {
    if (fs.existsSync(filePath)) {
        return filePath;
    }
    fs.mkdirSync(filePath);
    ensureDirectoryExistence(filePath);
    return filePath;
}

//delete a project
app.delete('/projects/delete/:projectKey', (req, res) => {
    const key = req.params.projectKey;
    request.post(`/projects/delete?project=${key}`, res);
});

// assign a project to a QF
app.post('/projects/assign/:profileKey/:projectKey', (req, res) => {
    const project = req.params.projectKey;
    const profile = req.params.profileKey;
    request.post(`/qualityprofiles/add_project?profile=${profile}&project=${project}`, res);
});

// remove a project from QF
app.delete('/projects/remove/:profileKey/:projectKey', (req, res) => {
    const project = req.params.projectKey;
    const profile = req.params.profileKey;
    request.post(`/qualityprofiles/add_project?profile=${profile}&project=${project}`, res);
});


// get activate rules for a QF
app.get('/rules/:profileKey', (req, res) => {
    const key = req.params.profileKey;
    const showActive = req.query.showActive;
    if (showActive === undefined) {
        request.get(`/rules/search?activation=true&qprofile=${key}`, res);
    } else {
        request.get(`/rules/search?activation=${showActive}&qprofile=${key}`, res);
    };
    // request.get(`/rules/search?activation=true&qprofile=${key}`, res);
});

// get issues of a project
app.get('/issues/:projectKey', (req, res) => {
    const key = req.params.projectKey;
    request.get(`/issues/search?componentKeys=${key}`, res);
});

// get src code of a file
app.get('/sources', (req, res) => {
    const key = req.query.key;
    request.get(`/sources/lines?key=${key}`, res);
});

console.log("server running");

app.listen(4800);
