<template>
  <div class="main">
    <div class="wrapper">
        <b-navbar toggleable="md" type="dark" variant="uq" class="header">
            <router-link to="/studentDashboard" tag="b-navbar-brand" style="cursor:pointer;">CSSE2002</router-link>
        </b-navbar>
        <b-container>
        <h2>Welcome</h2>
        <p>Upload your files for assesing your code</p>
        <b-row>
        <b-col>
            <b-form-group
                    label="Assignment:"
                    label-for="assignmentDrop">
            <b-form-select id="assignmentDrop"
                            :options="assignments"
                            v-model="assignment"
                           @change.native="fetchData($event)">
            </b-form-select>
            </b-form-group>
        </b-col>

        <b-col>
            <b-form-group
                    label="Student:"
                    label-for="studentDrop">
            <b-form-select id="studentDrop"
                            :options="['1','2','3','4','5','6','7','8','9']"
                            v-model="studentId">
            </b-form-select>
            </b-form-group>
        </b-col>
        </b-row>
        <b-card no-body class="shadow student-tab" style="min-height: 100vh">
            <b-tabs pills card vertical style="min-height: 100vh">
                <b-tab title="Assignment Detail" active>
                    <b-col v-if="details" style="padding:15px">
                        <h4 style="color: #42135A; font-weight: 600; font-size:1.6rem" class="wizard-title">{{details.Name}}</h4>
                        <b-row class="assignment-detail">
                            <label class="assignment-detail-label">Total Marks:</label>
                            <p>{{details.TotalMarks}}</p>
                        </b-row>
                        <b-row class="assignment-detail">
                            <label class="assignment-detail-label">Weight:</label>
                            <p>{{details.Weight}}%</p>
                        </b-row>
                        <b-row class="assignment-detail">
                            <label class="assignment-detail-label">Start Date:</label>
                            <p>{{new Date(new Date(details.StartDate).setSeconds(0)).toLocaleString()}}</p>
                        </b-row>
                        <b-row class="assignment-detail">
                            <label class="assignment-detail-label">Due Date:</label>
                            <p>{{new Date(new Date(details.DueDate).setSeconds(0)).toLocaleString()}}</p>
                        </b-row>
                        <b-row class="assignment-detail">
                            <label class="assignment-detail-label">Specification:</label>
                            <p @click="downloadSpec" style="cursor:pointer; text-decoration: underline">
                                spec.pdf
                            </p>
                        </b-row>
                        <b-row class="assignment-detail">
                            <label class="assignment-detail-label">Extra:</label>
                            <template v-if="details.ExtraFilePath">
                                <p @click="downloadExtra" style="cursor:pointer; text-decoration: underline">
                                    extra.zip
                                </p>
                            </template>
                            <template v-else>
                                None
                            </template>
                        </b-row>
                        <b-row class="assignment-detail" style="flex-direction: column">
                            <label class="assignment-detail-label">Comments:</label>
                            <vue-editor id="dddd" v-model="details.Comments" disabled :editorToolbar="[]"></vue-editor>
                        </b-row>
                    </b-col>
                </b-tab>
                <b-tab title="Submit Assignment">
                    <uploader :options="options" class="uploader" ref="uploader">
                        <uploader-unsupport></uploader-unsupport>
                        <uploader-drop>
                            <p>Drop files here to upload or</p>
                            <uploader-btn>select files</uploader-btn>
                            <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
                        </uploader-drop>
                        <uploader-list></uploader-list>
                    </uploader>
                    <b-button v-on:click="sendRequest" class="send primary-button">Check Code</b-button>
                    <!--<b-button v-on:click="sendTest" class="send primary-button">TEST</b-button>-->
                    <div v-if="loadAnimation" class="loadingDiv">
                        <h3 class="loadingText">Loading Results</h3><i class="fa fa-3x fa-spinner fa-pulse"></i>
                    </div>
                </b-tab>
                <b-tab title="Result" @click="getResult" id="result">
                    <b-row style="flex-direction: row; justify-content: space-around; align-items: center; margin-bottom: 10px">
                            <p><strong>{{projectStatus}}</strong></p>
                            <b-button  v-if="markReady" class="primary-button" @click="showResult">View Result</b-button>
                    </b-row>
                    <b-row v-if="issuesParams">
                        <b-col>
                            <issue-list :queryParams="issuesParams"></issue-list>
                        </b-col>
                        <b-modal size="lg" v-if="markData" v-model="showModal" hide-footer title="Assignment Result" style="text-align: left">
                            <b-container class="mark-modal">
                                <b-card>
                                    <p>
                                        Student: <span>{{markData.StudentID}}</span>
                                    </p>
                                    <p>
                                        Submitted on: <span>{{new Date(markData.LastSubmited).toLocaleString()}}</span>
                                    </p>
                                    <p>
                                        Result: <span>{{markData.Result}} / {{markData.TotalMarks}}</span>
                                    </p>
                                    <b-form-group
                                            label="Comments"
                                            label-for="comment">
                                        <vue-editor v-model="markData.Comments" :disabled="true"></vue-editor>
                                    </b-form-group>
                                </b-card>

                                <b-row style="justify-content: center">
                                        <b-button class="primary-button" style="min-width: 150px; margin-top: 10px" @click="showModal = false">OK</b-button>
                                </b-row>
                            </b-container>
                        </b-modal>
                    </b-row>
                    <div class="push"></div>
                </b-tab>
            </b-tabs>
        </b-card>
        </b-container>
        </div>
        <footer>
            <router-link class="footerLink" to="/" tag="b-navbar-brand" style="cursor:pointer;">PAT - Programming Assesment Tool</router-link>
        </footer>
  </div>
</template>

<style>

  html, body, .main {
      height: 100%;
  }

    .main {
        display: flex;
        flex-direction: column;
    }

    .header {
        margin-bottom: 20px;
    }

    .wrapper{
        flex: 1 0 auto;
    }

    .footerLink {
        font-size: 1em;
    }

    .fileUpload{
    width: 40%;
    }

    .uploader, .ckjm-table {
    width: 60%;
    margin: auto;
    }

    .ckjm-table {
    margin-bottom: 30px;
    }

    .send{
    margin: 20px 0;
    display: flex;
    margin: 30px auto;
    }

    th, .bg-uq {
    background-color: #42135A;
    color: #fff;
    }

    .mark-modal .ql-toolbar {
    display: none;
    }

    #assignmentDrop, #studentDrop {
        width: 70%;
    }

    .loadingDiv{
        display: inline-flex;
    }

    .loadingText{
        margin-right: 10px;
    }


    .student-tab ul li .active {
        background: #42135A !important;
        color: #f2f2f2 !important;
    }

  .student-tab ul li a {
      color: #42135A !important;
  }
  .student-tab ul li a:hover {
      background: rgba(0,0,0,0);
      color: #42135A;
      box-shadow: inset 0 0 0 3px #42135A;
  }
    .assignment-detail-label {
        margin-right: 10px;
    }
</style>

<script lang="ts">
import axios from "axios"
import { Vue, Component, Watch, Lifecycle } from "av-ts";
import IssueList from '../shared/IssueList.vue';
import { VueEditor } from 'vue2-editor';
import 'font-awesome/css/font-awesome.css';

export interface item{
    CLASS?: string,
    WMC?: number,
    DIT?: number,
    NOC?: number,
    CBO?: number,
    RFC?: number,
    LCOM?: number,
    Ca?: number,
    NPM?: number
}

@Component({
    components: {
        IssueList,
        VueEditor
    }
})
export default class studentDashboard extends Vue {
    items: item[] = [];
    file: File[] = [];
//    ckjmMetrics: string[] = ['CLASS', 'WMC', 'DIT', 'NOC', 'CBO', 'RFC', 'LCOM', 'Ca', 'NPM'];
    assignments = [];
    assignment = null;
    studentId = null;
    details = null;
    issuesParams:URLSearchParams = null;

    projectStatus:String = '';
    projectId:String = null;
    markReady:boolean = false;
    markData:Object = null;
    showModal= false;

    pingInterval: any;

    uploaderInstance: any;

    loadAnimation: boolean = false;

    uploaderOptions: {
            autoStart: false,
            testChunks: false
        };

    get options() {
        return this.uploaderOptions;
    }

    sendRequest(){
        console.log(this.uploaderInstance.fileList);
        this.items = [];
        const files = this.uploaderInstance.fileList;
        let formData: FormData = new FormData();
        files.map((file:any) => {
            formData.append('files', file.file, file.file.name);
        })
        formData.append('StudentID', this.studentId);
        formData.append('AssignmentID', this.assignment.id);
        formData.append('Name', this.assignment.name);
        axios.post('/form', formData)
            .then((response) => {
                this.loadAnimation = true;
                console.log(response);
                if (response.status == 200) {
                    this.pingResults();
                }
            });
    }

    sendTest() {
        const formData = new URLSearchParams();
        formData.append('key', 'CSSE2002_unit_test_3');
        axios.post('/test_read', formData)
            .then((response) => {
                console.log(response); 
            });
    }

    pingResults() {
        //Using different formdata object as could not get other to work for unknow reason
        const formData = new URLSearchParams();
        formData.append('StudentID', this.studentId);
        formData.append('AssignmentID', this.assignment.id);
        formData.append('Name', this.assignment.name);
        const pingInterval = setInterval((id) => {
            axios.post(`/retrieve_results`, formData)
                .then((response) => {
                    console.log(response);
                    if(response.data) {
                        clearInterval(pingInterval);

                        setTimeout(()=>{
                            this.$snotify.success('Scan finished, fetching...');
                        }, 2000);
                        setTimeout(()=>{
                            this.loadAnimation = false;
                            (<HTMLElement> document.querySelectorAll('#result___BV_tab_button__')[0]).click();

                        }, 5000)
                    }
                });
        }, 5000);
    }

    getResult() {
        if (this.studentId == null || this.assignment == null) {
            this.$snotify.error('Student id and assignment cannot be null');
            (<HTMLElement> document.querySelectorAll('#__BVID__11___BV_tab_button__')[0]).click();
            return;
        }
        const formData = new URLSearchParams();
        formData.append('StudentID', this.studentId);
        formData.append('AssignmentID', this.assignment.id);
        formData.append('Name', this.assignment.name);
        this.issuesParams = formData;
        this.viewResult();
    }
    viewResult() {
        this.projectStatus = '';
        if(!this.assignment) return;
        const data = {
            'StudentID': this.studentId,
            'AssignmentID': this.assignment.id,
            'Name': this.assignment.name
        };
        axios.post('/project', data)
            .then(res => {
                console.log(res);

                if (res.data.length === 0) {
                    this.projectStatus = 'You have not made any submission yet!';
                    return;
                }
                const dt = res.data[0];
                if (dt.Version === 1 && dt.Scanned === 0) {
                    this.projectStatus = 'You submission has not been scanned yet!';
                    return;
                }
                if (dt.Scanned === 0) {
                    this.projectStatus = 'This is NOT the latest report!';
                } else {
                    this.projectStatus = 'This is the latest report!';
                }
                this.projectId = dt.ID;

                if(dt.Marked === 1) {
                    this.markReady = true;
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    showResult() {
        axios.get(`/project/${this.projectId}`).then(res => {
            console.log(res);
            this.markData = res.data[0];
            this.showModal = true;
        }).catch(err => {
                console.error(err);
            })

    }


    @Lifecycle
    mounted() {
        this.uploaderInstance = this.$refs.uploader;
        console.log(this.uploaderInstance.fileList);
        axios.get('/qualityFile/' + 'CSSE2002').then(res => {
        console.log(res);
        res.data.forEach(i=>{
            if(i.Active === 1) {
                this.assignments.push({text: i.Name, value: {id: i.ID, name: i.CourseCode+'_'+i.Name}});
            }
        })
        })
        .catch(err => {
            console.error(err);
        })
    }

    fetchData(data) {
//        (<HTMLElement> document.querySelectorAll('#result___BV_tab_button__')[0]).click();
        const dt = data.target;
        const id = dt.selectedOptions[0]._value.id;
        this.issuesParams = null;
        axios.get(`/projects/search/${id}`).then(res => {
            console.log(res);
//            this.items = res.data.submissions;
            this.details = res.data.assignment[0];
        })
            .catch(err => {
                console.error(err);
            });
    }

    downloadSpec() {
        axios({
            method:'get',
            url:'/download/spec/' + this.details.ID,
            responseType:'arraybuffer',
        })
            .then(function(response) {
                let blob = new Blob([response.data], { type:   'application/pdf' } );
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'spec.pdf';
                link.click()
            });
    }

    downloadExtra() {
        axios({
            method:'get',
            url:'/download/extra/' + this.details.ID,
            responseType:'arraybuffer',
        })
            .then(function(response) {
                let blob = new Blob([response.data], { type:   'application/pdf' } );
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'extra.zip';
                link.click()
            });
    }

}
</script>

