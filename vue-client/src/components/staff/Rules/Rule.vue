<template>
    <div>
    <b-row>
        <!-- Using modifiers -->
        <template v-if="updateMode">
            <span style="align-self: center; margin-right: 30px">{{rule.name}}</span>
            <b-button class="primary-button" @click="showModal = true">Show Details</b-button>
        </template>
        <template v-else>
            <b-form-checkbox
                    v-model="checked"
                    :value="true"
                    :unchecked-value="false"
            >
                {{rule.name}}
            </b-form-checkbox>
            <b-link @click="showModal = true" v-if="checked">Modify</b-link>
        </template>
    </b-row>
        <!--<b-btn v-b-toggle="rule.key" class="m-1">{{rule.name}}</b-btn>-->
        <b-modal size="lg" v-model="showModal" hide-footer :title="rule.name" style="text-align: left">
            <b-container class="bv-example-row">
                <b-card>
                <b-row class="header-row">
                    <b-col>
                        <b-link v-b-toggle="rule.key">
                            Description:
                        </b-link>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-collapse :id="rule.key">
                            <div v-html="rule.htmlDesc"></div>
                        </b-collapse>
                    </b-col>
                </b-row>
                </b-card>
                <b-card>
                <b-row class="header-row">
                    <b-col>
                        Params:
                    </b-col>
                </b-row>
                <b-row v-for="params in dataDisplay.params" :key="params.key" class="rule-params">
                    <b-col>
                    <b-form-group
                            :label="params.key + ':'"
                            :description="params.htmlDesc"
                            :label-for="params.key">
                        <template v-if="params.type === 'BOOLEAN'">
                            <b-form-select :id="params.key"
                                           :options="options"
                                           v-model="params.defaultValue">
                            </b-form-select>
                        </template>
                        <template v-else-if="params.type === 'INTEGER'">
                            <b-form-input :id="params.key"
                                          type="number"
                                          v-model="params.defaultValue">
                            </b-form-input>
                        </template>
                        <template v-else>
                            <b-form-textarea :id="params.key"
                                             v-model="params.defaultValue"
                                             :rows="3"
                                             :max-rows="6">
                            </b-form-textarea>
                        </template>
                    </b-form-group>
                    </b-col>
                </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group label="severity:"
                                          label-for="severity">
                                <b-form-select id="severity"
                                               :options="severities"
                                               v-model="dataDisplay.severity">
                                </b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
                <b-row style="justify-content: space-around; margin-top:20px">
                    <template v-if="updateMode">
                        <b-button class="primary-button" @click="showModal = false">Back</b-button>
                    </template>
                    <template v-else>
                        <b-button class="primary-button" @click="onSave">Save</b-button>
                        <b-button class="secondary-button" @click="onCancel">Cancel</b-button>
                    </template>
                </b-row>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                showModal: false,
                checked: false,
                options: ['true','false'],
                severities: ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'INFO'],
                data : JSON.parse(JSON.stringify(this.rule)),
                dataDisplay : JSON.parse(JSON.stringify(this.rule))
            }
        },
        methods: {
            onCancel() {
                this.dataDisplay = JSON.parse(JSON.stringify(this.data));
                this.showModal = false;
            },
            onSave() {
                this.data = JSON.parse(JSON.stringify(this.dataDisplay));
                this.showModal = false;
            }
        },
        watch: {
            assignmentKey(val) {
                    if (this.checked) {
                        let paramString = `profile=${val}&rule=${this.data.key}&severity=${this.data.severity}`;
                        console.log('submit!!!!');
                        if (this.data.params.length > 0) {
                            paramString += '&params=';
                            this.data.params.forEach(i => {
                                paramString += `${i.key}=${i.defaultValue};`;
                            })
                        }

                        axios.post(`/rules/apply_rule/${paramString}`)
                            .then(res => {
                                console.log(res);
                                this.callback();
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    } else {
                        this.callback();
                    }
            },
            selected(val) {
                this.checked = val;
            }
        },
        props: [
            'rule',
            'assignmentKey',
            'callback',
            'selected',
            'updateMode'
        ]
    }
</script>

<style scoped>
    .rule-params:not(:last-of-type) {
        border-bottom: 1px solid lightgrey;
    }
    .header-row {
        margin-bottom: 3px;
        font-size: 1.5rem;
    }
    .card {
        margin-bottom: 3px;
    }
</style>