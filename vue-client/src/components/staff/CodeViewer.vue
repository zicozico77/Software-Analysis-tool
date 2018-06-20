<template>
    <div style="text-align: left">
        <b-btn class="primary-button" href='javascript:history.go(-1)' style="margin-bottom: 20px"> Go Back</b-btn>

        <template v-for="line in code">
            <div class="code_line">
                <i class="code_line-index">{{line.line}}</i>
                <template v-if="line.line >= s && line.line <= e">
                    <span class="code_line-content error-line" v-html="line.code"></span>
                </template>
                <template v-else>
                    <span class="code_line-content" v-html="line.code"></span>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data () {
            return {
                code: '<h1>hello</h1>',
                s: null,
                e: null
            }
        },
        methods: {
        },
        components: {
        },
        created() {
            const key = this.$route.query.key;
            this.s = this.$route.query.start;
            this.e = this.$route.query.end;
            axios.get(`/sources`, {params: {
                key
            }}).then(res => {
                console.log(res);
                this.code = res.data.sources;
            })
                .catch(err => {
                    console.error(err);
                })
        },
        updated() {
            setTimeout(()=>{
                document.querySelector('.error-line').scrollIntoView({
                    behavior: 'smooth'
                });
            }, 1000)

        }
    }
</script>

<style>
    .k {
        color: blueviolet !important;
    }
    .cd {
        color: lightgrey !important;
    }

    .code_line {
        background-color: azure;
        display: flex;
        flex-direction: row;
    }

    .code_line-index {
        background-color: aliceblue;
        color: gray;
        margin-right: 30px;
        text-align: right;
        width: 15px;
    }

    .code_line-content {
        width: 100%;
        white-space: pre-wrap;
    }

    .code_line-content:hover {
        background-color: lightgrey;
    }

    .error-line {
        background-color: pink;
    }
</style>