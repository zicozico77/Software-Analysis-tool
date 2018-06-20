<template>
    <b-container>
        <b-row align-v="center">
            <b-col sm="12">
                <form-wizard @on-complete="onComplete"
                             title="Create New Assignment"
                             subtitle="Please follow the wizard"
                             shape="tab"
                             next-button-text="Next"
                             color="#42135A">
                    <template slot="step" slot-scope="props">
                        <wizard-step :tab="props.tab"
                                     :transition="props.transition"
                                     :key="props.tab.title"
                                     :index="props.index">
                        </wizard-step>
                    </template>
                    <tab-content title="Select Course" style="text-align: left;"
                                 icon="fa fa-tasks" :before-change="createAssignment">
                        <b-form-group
                                      label="Course:"
                                      label-for="courseDrop">
                            <b-form-select id="courseDrop"
                                           :options="courses"
                                           v-model="form.CourseCode">
                            </b-form-select>
                        </b-form-group>
                        <b-form-group
                                label="Language:"
                                label-for="languageDrop">
                            <b-form-select id="languageDrop"
                                           :options="languages"
                                           v-model="form.language">
                            </b-form-select>
                        </b-form-group>
                        <b-form-group
                                      label="Name:"
                                      label-for="assignmentName">
                            <b-form-input id="assignmentName"
                                          type="text"
                                          v-model="form.Name"
                                          placeholder="Assignment Name">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group
                                label="Assignment Specification File: (pdf only)"
                                label-for="specFile">
                            <b-form-file id="specFile"
                                         v-model="form.specFile"
                                         :state="Boolean(form.specFile)"
                                         accept=".pdf"
                                         placeholder="Choose a file...">
                            </b-form-file>
                        </b-form-group>
                        <b-form-group
                                label="Extra Files: (zip only)"
                                label-for="extraFile">
                            <b-form-file id="extraFile"
                                         v-model="form.extraFile"
                                         :state="Boolean(form.extraFile)"
                                         accept=".zip, .7z"
                                         class="secondary-button"
                                         placeholder="Choose a file...">
                            </b-form-file>
                        </b-form-group>
                        <b-form-group class="testFiles"
                                label="Test files"
                                label-for="testFiles">
                            <b-form-file multiple 
                                         id="testFile"
                                         v-model="testFile"
                                         :state="Boolean(testFile)"
                                         class="secondary-button"
                                         placeholder="Choose a file...">
                            </b-form-file>
                        </b-form-group>
                        <b-row>
                            <b-col style="display: flex; justify-content: space-between">
                                <label for="startDate">Start Date</label>
                                <datetime id="startDate" type="datetime" v-model="form.StartDate" :minute-step="30" :second-step="60" value-zone="Australia/Brisbane"></datetime>
                            </b-col>
                            <b-col style="display: flex; justify-content: space-between">
                                <label for="endDate">Due Date</label>
                                <datetime id="endDate" type="datetime" v-model="form.DueDate" :minute-step="30" value-zone="Australia/Brisbane"></datetime>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col style="display: flex; justify-content: space-between">
                                <label for="mark">Total Marks</label>
                                <input id="mark"
                                              type="number"
                                              v-model="form.TotalMarks"
                                              placeholder="Total Marks"/>
                            </b-col>
                            <b-col style="display: flex; justify-content: space-between">
                                <label for="weight">Weight:</label>
                                <input id="weight" type="number" v-model="form.Weight" placeholder="Weight in %"/>
                            </b-col>
                        </b-row>
                        <b-form-group
                                label="Comments"
                                label-for="comment">
                            <vue-editor v-model="form.Comments"></vue-editor>
                        </b-form-group>

                    </tab-content>
                    <tab-content title="Set Rules"
                                 icon="fa fa-sliders" :before-change="applyRules">
                        <b-form-checkbox
                                v-model="selectAll"
                        >
                            Select All
                        </b-form-checkbox>
                        <app-rule v-for="rule in Rules" :key="rule.key" :rule="rule" :assignmentKey="submit" :callback="onApply" :selected="selectAll"></app-rule>
                        <p class="CkjmTitle">CKJM Rules</p>
                        <b-form-checkbox
                                v-model="selectAllCkjm"
                                @change="toggleAllCkjm"
                        >
                            Select All
                        </b-form-checkbox>
                        <b-form-checkbox-group 
                        v-model="selectedCkjm">
                            <ckjm-rule v-for="rule in CkjmRules"
                            :key="rule.name"
                            :rule="rule"
                            @checked = "checkedRule"
                            :assignmentKey="submit"
                            :callback="onApply"
                            :selected="selectAllCkjm"></ckjm-rule>
                        </b-form-checkbox-group>
                    </tab-content>
                    <tab-content title="Apply Setting"
                                 icon="fa fa-check-square-o">
                        <b-progress :value="finished" :max="total" show-progress animated></b-progress>
                        <div>Setting up the assignment ... {{finished / total * 100}}%</div>
                        <template v-if="finished === total">
                            <button @click="onComplete" class="p-button">Done!</button>
                        </template>
                    </tab-content>

                    <button slot="finish" v-show="false">done</button>
                    <button slot="next" class="p-button">Next</button>

                    <button slot="prev" v-show="false">Back</button>
                </form-wizard>
            </b-col>
        </b-row>
    </b-container>
</template>

<style scoped>
    .CkjmTitle{
        margin: 20px 0px;
    }

    .testFiles >>> label {
        overflow: auto !important;
    }

</style>

<script>
    import {FormWizard, TabContent, WizardStep} from 'vue-form-wizard';
    import 'vue-form-wizard/dist/vue-form-wizard.min.css';
    import axios from 'axios';
    import Rules from './Rules/rules';
    import CkjmRules from './Rules/ckjmRules';
    import CkjmRule from './Rules/CkjmRule.vue';
    import Rule from './Rules/Rule.vue';
    import { Datetime } from 'vue-datetime';
    import 'vue-datetime/dist/vue-datetime.css';
    import { VueEditor } from 'vue2-editor';

    export default {
        data() {
            return {
                testFile: [],
                form: {
                    language: null,
                    CourseCode: null,
                    Name: null,
                    specFile: null,
                    extraFile: null,
                    StartDate: null,
                    DueDate: null,
                    TotalMarks: null,
                    Weight: null,
                    Comments: null,
                },
                selectAll: false,
                selectAllCkjm: false,
                selectedCkjm: [],
                courses: [
                    { text: 'Select A Course', value: null },
                    'CSSE2002'
                ],
                languages: [
                    { text: 'Select A Language', value: null },
                    'java'
                ],
                submit: '',
                assignmentKey: '',
                Rules,
                CkjmRules,
                total: Rules.length,
                finished: 0
            }
        },
        watch: {
            form: function(newC, oldC) {
                console.log(newC);
            }
        },
        methods: {
            onComplete: function(){
                this.$router.push({name: 'staffDashboard'})
            },
            createAssignment() {
                if (this.form.language === '' || this.form.Name === '') {
                    return false;
                }
                let formData = new FormData();
//                formData.append("specFile", this.form.specFile, this.form.specFile.name);
//                formData.append("extraFile", this.form.extraFile, this.form.extraFile.name);
                for (let key in this.form ) {
                    if (key === 'StartDate' || key === 'DueDate') {
                        formData.append(key, this.form[key].slice(0, 19).replace('T', ' '));
                    } else {
                        formData.append(key, this.form[key]);
                    }
                }
                return axios.post(`/qualityFile/create`, formData)
                    .then(res => {
                        console.log(res);
                        this.assignmentKey = res.data.key;
                        let testFileData = new FormData();
                            this.testFile.map((file) => {
                                testFileData.append('files', file, file.name);
                            })
                        testFileData.append('key', res.data.key);
                        axios.post(`/testFiles`, testFileData).then(res => {
                        }).catch(err => {
                            console.error(err);
                            return false;
                        })
                        return true
                    })
                    .catch(err => {
                        console.error(err);
                        return false;
                    });
            },
            applyRules() {
                this.submit= this.assignmentKey;
                const formData = new URLSearchParams();
                let rules = "";
                if (this.form.language !== '' || this.form.Name !== '') {
                    this.selectedCkjm.map((rule) => {
                        let splitName = rule.name.split('-');
                        let initials = splitName[0];
                        initials = initials.replace(/ /g,'');
                        rules = rules + initials + '.'
                    });
                    formData.append('metrics', rules);
                    formData.append('name', this.form.Name);
                    formData.append('key', this.assignmentKey);
                    axios.post(`/ckjm/ckjm_set_rules`, formData)
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
                return true;
            },
            onApply() {
                this.finished++;
                console.log('got reply');
            },

            toggleAllCkjm(checked) {
                if (checked) {
                    this.selectedCkjm = [];
                    this.CkjmRules.map((rule) => {
                    this.selectedCkjm.push(rule);
                    }) 
                } else {
                    this.selectedCkjm = [];
                }
            },
            checkedRule(val, rule) {
                if (val) {
                    this.selectedCkjm.push(rule);
                } else {
                    const index = this.selectedCkjm.indexOf(rule);
                    if (index > -1) {
                        this.selectedCkjm.splice(index, 1);
                    } 
                }
            }
        },
        components: {
            FormWizard,
            TabContent,
            WizardStep,
            appRule: Rule,
            ckjmRule: CkjmRule,
            datetime: Datetime,
            VueEditor
        }
    }
</script>