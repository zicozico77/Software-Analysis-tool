<template>
    <div>
        <p class="wizard-title">Edit Rules</p>
        <assignment-rule v-for="rule in rules" :key="rule.key" :rule="rule" :assignmentKey="assignmentKey" :callback="onUpdate" :updateMode="true" style="margin-bottom: 10px">
        </assignment-rule>
    </div>
</template>

<script>
    import axios from 'axios';
    import Rule from './Rule.vue';

    export default {
        data() {
            return {
                rules: null,
                assignmentKey: ''
            }
        },
        methods: {
            onUpdate() {
                console.log("updated");
            }
        },
        watch: {
        },
        components: {
            assignmentRule: Rule
        },
        created() {
            const id = this.$route.params.id;
            axios.get(`/rules/${id}`).then(res => {
                console.log(res);
                this.rules = res.data.rules;
            })
                .catch(err => {
                    console.error(err);
                })
        }
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