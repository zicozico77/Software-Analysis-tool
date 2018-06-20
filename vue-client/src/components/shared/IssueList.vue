<template>
    <div>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Sonar" active>
                    <b-row>
                        <b-col>
                            <b-form-group horizontal label="Filter">
                                <b-input-group>
                                    <b-form-input v-model="filter" placeholder="Type to Search" />
                                    <b-input-group-append>
                                        <b-btn :disabled="!filter" class="secondary-button" @click="filter = ''">Clear</b-btn>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-table striped hover :items="items" :fields="fields" :filter="filter">
                            <template slot="component" slot-scope="data">
                                <router-link :to="{name: 'codeViewer', query: {key: data.item.component, start: data.item.textRange.startLine, end: data.item.textRange.endLine}}" tag="a">{{data.item.component.slice(data.item.project.length+12)}}</router-link>
                            </template>
                            <template slot="updateDate" slot-scope="data">
                                {{new Date(data.item.updateDate).toLocaleString()}}
                            </template>
                        </b-table>
                    </b-row>
                </b-tab>
                <b-tab no-body title="CKJM">
                    <b-row>
                        <b-col style="margin: 5px">
                            <b-link @click="showCkjmModal = true" class="infoText">Table Information
                                <i class="fa fa-info-circle"></i>
                            </b-link>
                            <b-table class="ckjm-table" striped hover :items="ckdata"></b-table>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Test Cases">
                    <b-row>
                        <b-col>
                            <b-form-group horizontal label="Filter">
                                <b-input-group>
                                    <b-form-input v-model="filter2" placeholder="Type to Search" />
                                    <b-input-group-append>
                                        <b-btn :disabled="!filter2" class="secondary-button" @click="filter2 = ''">Clear</b-btn>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-table striped hover :items="testResult" :fields="testfields" :filter="filter2">
                            <!--<template slot="component" slot-scope="data">-->
                                <!--<router-link :to="{name: 'codeViewer', query: {key: data.item.component, start: data.item.textRange.startLine, end: data.item.textRange.endLine}}" tag="a">{{data.item.component.slice(data.item.project.length+12)}}</router-link>-->
                            <!--</template>-->
                            <!--<template slot="updateDate" slot-scope="data">-->
                                <!--{{new Date(data.item.updateDate).toLocaleString()}}-->
                            <!--</template>-->
                            <template slot="show_details" slot-scope="row">
                                <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
                                <b-button size="sm" class="primary-button" style="padding: 0.25rem 0.5rem; font-size:0.875rem" @click="row.toggleDetails">
                                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                                </b-button>
                            </template>
                            <template slot="row-details" slot-scope="row">
                                <b-card>
                                    <b-row>
                                        <b-col style="text-align: left"><b>Test Name</b></b-col>
                                        <b-col style="text-align: left"><b>Time Taken</b></b-col>
                                    </b-row>
                                    <b-row v-for="c in row.item.cases" :key="c.name">
                                        <b-col style="text-align: left">{{ c.name }}</b-col>
                                        <b-col style="text-align: left">{{ c.time }}s</b-col>
                                    </b-row>
                                </b-card>
                            </template>
                        </b-table>
                    </b-row>
                </b-tab>
            </b-tabs>
            <b-modal size="lg" v-model="showCkjmModal" hide-footer title="Chidamber and Kemerer Metrics" style="text-align: left">
                <b-container class="bv-example-row">
                    <b-card v-for="rule in CkjmRules"
                        :key=rule.name>
                        <b-card>
                        <b-row class="header-row">
                            <b-col>
                                {{rule.name}}
                            </b-col>
                        </b-row>
                        </b-card>
                        <b-card>
                        <b-row class="header-row">
                            <b-col>
                                Description:
                            </b-col>
                        </b-row>
                        <b-row >
                            <b-col>
                                <div v-html="rule.htmlDesc"></div>
                            </b-col>
                        </b-row>
                        </b-card>
                    </b-card>
                    <b-row>
                        <b-col style="text-align: center">
                            <b-button variant="outline-primary" @click="onCancel">Close</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-modal>
        </b-card>
    </div>
</template>

<style>
    .infoText{
        float: right;
        margin-right: 50px;
    }
</style>

<script>
    import axios from 'axios';
    import CkjmRules from '../staff/Rules/ckjmRules';

    const ckjmMetrics = ['CLASS', 'WMC', 'DIT', 'NOC', 'CBO', 'RFC', 'LCOM', 'Ca', 'NPM'];
    const metricRanges = [null, null, 3, null, 1, null, 80, null, null];
    const fields = [
        {
            key: 'message',
            label: 'Issue',
            sortable: true
        },
        {
            key: 'component',
            label: 'File',
            sortable: true
        },
        {
            key: 'severity',
            label: 'Severity',
            sortable: true
        },
        {
            key: 'textRange.startLine',
            label: 'Start Line',
            sortable: true
        },
        {
            key: 'textRange.endLine',
            label: 'End Line',
            sortable: true
        },
        {
            key: 'updateDate',
            label: 'Last Updated',
            sortable: true
        },
    ];

    const testfields = [
        {
            key: 'suite.name',
            label: 'Test Class',
            sortable: true
        },
        {
            key: 'suite.tests',
            label: 'Tests',
            sortable: true
        },
        {
            key: 'suite.failures',
            label: 'Failures',
            sortable: true
        },
        {
            key: 'suite.skipped',
            label: 'Ignored',
            sortable: true
        },
        {
            key: 'suite.time',
            label: 'Duration',
            sortable: true
        },
        {
            key: 'suite.sRate',
            label: 'Success rate',
            sortable: true
        },
        {
            key: 'show_details',
            Label: 'Details'
        }
    ];

    export default {
        data() {
            return {
                items: null,
                ckdata: [],
                fields,
                testfields,
                filter: '',
                CkjmRules,
                showCkjmModal: false,
                filter2: '',
                testResult:null
            }
        },
        methods: {
            createPoint(pointArray) {
                const data = {
                    'AssignmentID': this.queryParams.get('AssignmentID'),
                };
                const item = {
                    CLASS: pointArray[0]
                };
                axios.post('/ckjm/retrieve_metrics', data)
                    .then(res => {

                        const ckjmMetricsToUse = res.data.split(".");
                        let _cellVariants = {};
                        ckjmMetrics.map((metric) => {
                            if (ckjmMetricsToUse.includes(metric)) {
                                const index = ckjmMetrics.indexOf(metric);
                                item[metric] = pointArray[index];
                                const numToCompare = metricRanges[index] == null? NaN: parseInt(pointArray[index]);
                                if (isNaN(numToCompare) || numToCompare < 0) {
                                    return
                                } else if(numToCompare/metricRanges[index] < 1.5) {
                                    _cellVariants[metric] = 'success'
                                } else if (numToCompare/metricRanges[index] < 2) {
                                    _cellVariants[metric] = 'warning'
                                } else {
                                    _cellVariants[metric] = 'danger'
                                }
                                if (_cellVariants) {
                                    item['_cellVariants'] = _cellVariants;
                                }
                            }
                        });
                        console.log(_cellVariants);
                        console.log(item);  
                        this.ckdata.push(item);
                    })
            },
            refreshTable() {
                if (!this.queryParams) return;
                axios.post(`/retrieve_past_results`, this.queryParams)
                    .then((response) => {
                        console.log(response);

                        if(response.data) {
                            const results = response.data;
                            if(results.ckjmData) {
                                let classes = results.ckjmData.split("\n");
                                classes = classes.splice(0, classes.length -1);
                                classes.forEach((file) => {
                                    const res = file.split(" ");
                                    this.createPoint(res);
                                })
                            }
                            if(results.sonarData) {
                                this.items = results.sonarData.issues;
                            }
                            if(results.testData) {
                                this.testResult = results.testData.map(i=>{
                                    const cases = i.testsuite.testcase.map(j=>{
//                                        console.log(j);
//                                        debugger;

                                        return j.$;
                                    });
                                    const suite = i.testsuite.$;
                                    suite.sRate = ((i.testsuite.$.tests - i.testsuite.$.skipped - i.testsuite.$.failures - i.testsuite.$.errors)/i.testsuite.$.tests*100).toFixed(2) + '%';
                                    return {suite, cases};
                                })
                            }
                            console.log(this.testResult);
                            debugger;
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    });
            },
            onCancel() {
                this.showCkjmModal = false;
            }
        },
        props: [
            'queryParams',
        ],
        watch: {
            queryParams() {
                this.refreshTable();
            }
        },
        mounted() {
            this.refreshTable();
        }
    }
</script>