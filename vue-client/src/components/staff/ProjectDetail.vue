<template>
    <div>
        <b-row>
            <b-col cols="2" style="display: flex; margin-bottom: 20px">
                <b-btn class="primary-button" href='javascript:history.go(-1)'> Go Back</b-btn>
            </b-col>
            <b-col style="margin-bottom: 20px">
                <b-btn class="primary-button" @click="markSubmission">Mark this submission</b-btn>
            </b-col>
            <b-modal size="lg" v-if="markData" v-model="showModal" hide-footer title="Mark Assignment" style="text-align: left">
                <b-container class="bv-example-row">
                    <b-card>
                        <p>
                            Student: <span>{{markData.StudentID}}</span>
                        </p>
                        <p>
                            Submitted on: <span>{{new Date(new Date(markData.LastSubmited).setSeconds(0)).toLocaleString()}}</span>
                        </p>
                        <p>
                            Due date: <span>{{new Date(new Date(markData.DueDate).setSeconds(0)).toLocaleString()}}</span>
                        </p>
                        <div style="margin-bottom: 15px" v-if="new Date(markData.DueDate).getTime() < new Date(markData.LastSubmited).getTime()">
                            <span class="secondary-button">This is a late submission!</span>
                        </div>
                        <p>
                            Result: <span><b-form-input style="width:100px; display: inline-block"
                                                        type="number"
                                                        v-model="markData.Result">
                            </b-form-input> / {{markData.TotalMarks}}</span>
                        </p>
                        <b-form-group
                                label="Comments"
                                label-for="comment">
                            <vue-editor v-model="markData.Comments"></vue-editor>
                        </b-form-group>
                    </b-card>

                    <b-row style="flex-direction: row; justify-content: space-around; margin-top:15px">
                            <b-button class="primary-button" @click="onSave">Submit</b-button>

                            <b-button class="secondary-button" @click="showModal = false">Cancel</b-button>

                    </b-row>
                </b-container>
            </b-modal>
        </b-row>
        <issue-list :queryParams="queryParams"></issue-list>
    </div>
</template>

<script>
    import axios from 'axios';
    import { VueEditor } from 'vue2-editor';
    import IssueList from '../shared/IssueList.vue';

    export default {
        data() {
            return {
                projectId: '',
                showModal: false,
                markData: null
            }
        },
        methods: {
            onSave() {
                const data = {Comments: this.markData.Comments, Result: this.markData.Result, Marked: 1};
                axios.put(`/project/${this.projectId}`, data).then(res => {
                    console.log(res);
                    this.showModal = false;
                    this.$snotify.success('Marks Updated!');
                })
                .catch(err => {
                    console.error(err);
                    this.$snotify.error('Update failed!');
                })
            },
            markSubmission() {
                axios.get(`/project/${this.projectId}`).then(res => {
                    console.log(res);
                    this.markData = res.data[0];
                    this.showModal = true;
                })
                .catch(err => {
                    console.error(err);
                })
            }
        },
        created() {
            const formData = new URLSearchParams();
            formData.append('StudentID', this.$route.query.sID);
            formData.append('AssignmentID', this.$route.query.aID);
            formData.append('Name', this.$route.query.name);
            this.queryParams = formData;
            this.projectId = this.$route.params.id;
            axios.get(`/issues/${this.projectId}`).then(res => {
                console.log(res);
                this.items = res.data.issues;
            })
            .catch(err => {
                console.error(err);
            })
        },
        components: {
            VueEditor,
            IssueList
        }
    }
</script>