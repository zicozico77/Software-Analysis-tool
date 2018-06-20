<template>
    <div>
        <b-row style="margin-bottom: 20px">
            <p class="wizard-title">{{details? details.CourseCode: 'Course Code'}} / {{details? details.Name: 'Name'}}</p>
        </b-row>
        <b-row style="justify-content: space-around; margin-bottom: 30px">
            <b-button class="primary-button" @click="showModal = true">Edit Assignment</b-button>
            <b-button class="primary-button" :to="{name: 'assignmentRules'}">Check Rules Applied</b-button>
            <b-button class="primary-button" v-if="analysisReady" @click="showAnalysis = true">Show analysis</b-button>
            <b-button class="secondary-button" @click="deleteAssignment" v-if="details">
                {{details.Active === 1?'Deactivate':'Activate'}}
            </b-button>
        </b-row>
        <b-row>
            <b-col v-if="details" class="shadow" style="border: 1px solid purple; margin-right: 10px">
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
            <b-col cols="7">
                <b-row>
                    <b-col>
                        <b-form-group horizontal label="Filter">
                            <b-input-group>
                                <b-form-input v-model="filter" placeholder="Type to Search" />
                                <b-input-group-append>
                                    <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                                </b-input-group-append>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-table striped hover :items="items" :fields="fields" :filter="filter">
                        <template slot="ID" slot-scope="data">
                            <router-link :to="{name: 'projectDetail', params: {id: data.item.ID}, query: {sID: data.item.StudentID, aID: data.item.AssignmentID, name: `${details.CourseCode}_${details.Name}`}}" tag="a">{{data.item.StudentID}}</router-link>
                        </template>
                        <template slot="Marked" slot-scope="data">
                           {{data.item.Marked?'Yes':'No'}}
                        </template>
                    </b-table>
                </b-row>
            </b-col>
        </b-row>

        <b-modal size="lg" v-model="showAnalysis" hide-footer title="Result Analysis" style="text-align: left">
            <analysis v-if="showAnalysis" :maxMark="details.TotalMarks" :data="items"></analysis>
            <b-row style="margin-top: 10px">
                <b-button class="primary-button" style="margin: 0 auto" @click="showAnalysis = false">Back</b-button>
            </b-row>
        </b-modal>

        <b-modal size="lg" v-if="dataCopy" v-model="showModal" hide-footer title="Edit Assignment" style="text-align: left">
            <b-container class="mark-modal">
                <b-card>
                    <b-row>
                        <b-col style="display: flex; justify-content: space-between">
                            <label for="startDatee">Start Date</label>
                            <datetime id="startDatee" type="datetime" v-model="dataCopy.StartDate" :minute-step="30" :second-step="60" value-zone="Australia/Brisbane"></datetime>
                        </b-col>
                        <b-col style="display: flex; justify-content: space-between">
                            <label for="endDatee">Due Date</label>
                            <datetime id="endDatee" type="datetime" v-model="dataCopy.DueDate" :minute-step="30" value-zone="Australia/Brisbane"></datetime>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col style="display: flex; justify-content: space-between">
                            <label for="mark">Total Marks</label>
                            <input id="mark"
                                   type="number"
                                   v-model="dataCopy.TotalMarks"
                                   placeholder="Total Marks"/>
                        </b-col>
                        <b-col style="display: flex; justify-content: space-between">
                            <label for="weight">Weight:</label>
                            <input id="weight" type="number" v-model="dataCopy.Weight" placeholder="Weight in %"/>
                        </b-col>
                    </b-row>
                    <b-form-group
                            label="Comments"
                            label-for="comments">
                        <vue-editor v-model="dataCopy.Comments"></vue-editor>
                    </b-form-group>
                </b-card>

                <b-row style="margin-top: 10px">
                    <b-button class="primary-button" style="margin: 0 auto" @click="onUpdate">Update</b-button>
                    <b-button class="secondary-button" style="margin: 0 auto" @click="onCancel">Cancel</b-button>

                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
    import axios from 'axios';
    import { VueEditor } from 'vue2-editor';
    import { Datetime } from 'vue-datetime';
    import Analysis from './Analysis.vue';

    const fields = [
        {
            key: 'ID',
            label: 'Student ID',
            sortable: true
        },
        {
            key: 'Version',
            label: 'No of submission',
            sortable: true
        },
        {
            key: 'Marked',
            label: 'Marked',
            sortable: true
        },
    ];

    export default {
        data() {
            return {
                items: null,
                details: null,
                dataCopy: null,
                fields,
                filter: '',
                showModal: false,
                showAnalysis: false,
                analysisReady: false
            }
        },
        methods: {
          deleteAssignment() {
              this.details.Active = this.details.Active===1? 0:1;
              axios.delete(`/qualityFile/${this.$route.params.id}/${this.details.Active}`).then(res => {
                  console.log(res);
                  if(this.details.Active === 0) {
                      this.$router.push({name:'staffDashboard'});
                      this.$snotify.success('Assignment inactivated!');
                  } else {
                      this.$snotify.success('Assignment activated!');
                  }
              })
                  .catch(err => {
                      console.error(err);
                  })
          },
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
            },
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
            },
            onCancel() {
              this.showModal = false;
              this.dataCopy = JSON.parse(JSON.stringify(this.details));
            },
            onUpdate() {
                const id = this.$route.params.id;
                const data = {Comments: this.dataCopy.Comments, StartDate: this.dataCopy.StartDate.slice(0, 19).replace('T', ' '), DueDate: this.dataCopy.DueDate.slice(0, 19).replace('T', ' '), TotalMarks: this.dataCopy.TotalMarks, Weight: this.dataCopy.Weight};
                axios.put(`/qualityFile/${id}`, data).then(res => {
                    this.fetchData();
                    this.showModal = false;
                    this.$snotify.success('Assignment Updated!');
                })
                .catch(err => {
                    console.error(err);
                    this.$snotify.error('Update failed!');
                })
            },
            fetchData() {
                const id = this.$route.params.id;
                axios.get(`/projects/search/${id}`).then(res => {
                    console.log(res);
                    this.items = res.data.submissions;
                    this.details = res.data.assignment[0];
                    this.dataCopy = JSON.parse(JSON.stringify(this.details));
                    this.analysisReady = !this.items.some(i => {
                        return i.Marked === 0;
                    })
//                    this.processData(this.details.TotalMarks, this.items);
                })
                    .catch(err => {
                        console.error(err);
                    })
            },
        },
        created() {
            this.fetchData();
        },
        components: {
            VueEditor,
            Datetime,
            Analysis
        }
    }
</script>

<style>
    .assignment-detail {
        border-bottom: 1px solid purple;
        justify-content: flex-start;
        padding: 2px;
    }
    .assignment-detail-label {
        width: 100px;
        margin-right: 50px;
        text-align: right;
    }
    .assignment-detail .ql-toolbar {
        display: none;
    }
</style>