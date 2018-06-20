<template>
    <div>
    <b-row>
        <!-- Using modifiers -->
        <template v-if="updateMode">
            <span style="align-self: center; margin-right: 30px">{{rule.name}}</span>
            <b-button variant="primary" @click="showModal = true">Edit Details</b-button>
        </template>
        <template v-else>
            <b-form-checkbox
                    v-model="checked"
                    :value="true"
                    :unchecked-value="false"
            >
                {{rule.name}}
            </b-form-checkbox>
            <b-link @click="showModal = true" v-if="checked">Info</b-link>
        </template>
    </b-row>
        <!-- <b-btn v-b-toggle="rule.key" class="m-1">{{rule.name}}</b-btn> -->
        <b-modal size="lg" v-model="showModal" hide-footer title="Chidamber and Kemerer Metrics" style="text-align: left">
            <b-container class="bv-example-row">
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
                <b-row>
                    <b-col style="text-align: center">
                        <b-button variant="outline-primary" @click="onCancel">Close</b-button>
                    </b-col>
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
            checked(val) {
                if (this.checked != this.selected) {
                    this.$emit('checked', val, this.rule);
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