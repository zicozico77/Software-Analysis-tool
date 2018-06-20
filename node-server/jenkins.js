var jenkins = require('jenkins')({ baseUrl: 'http://test:test@localhost:8080', crumbIssuer: true, promisify: true });

var fs = require("fs");
var path = require("path");

var command = 
  'java -jar C:/Users/diego/Documents/COURSES/ENGG4802/prototype/ckjm-master/ckjm-master/test/ckjm-1.8.jar >metrics.txt';

module.exports = {
  createJob(xmlPath, name, callback) {
    var file = path.join(xmlPath + "/config.xml");
    fs.readFile((file), 'utf-8', function(err, data) {
      if(err) {
        console.log(err)
      } else {
        jenkins.info(function(err, data) {
          if (err) throw err;
        });
        
        jenkins.job.create(name, data, function(err) {
          if (err) {
            console.log("ERROR");
            throw err;
          } else {
              callback();
          } 
        });
      }
    })
  },

  buildJob(projectName, gradleBuildLocation, cjkmJarLocation, resultLocation, ckjmlocation, sonarLocation) {
    return new Promise((resolve, reject) => {
      jenkins.job.build({name:projectName, parameters: {build_gradle_location: gradleBuildLocation,
        ckjmjar: cjkmJarLocation, write_location: resultLocation, file_ckjm_location: ckjmlocation, 
        file_sonar_location: sonarLocation }}, (err, data) => {
        if (err) {
          console.log("ERROR");
          reject(err);
        } else {
          console.log("worked");
          resolve(data);
        } 
      });
    })
    
  }
}
