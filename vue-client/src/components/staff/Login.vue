<template>
    <div>
        <b-form @submit="onSubmit">
            <b-form-group id="emailInputGroup"
                          label="Email address:"
                          label-for="email"
                          >
                <b-form-input id="email"
                              type="email"
                              v-model="form.email"
                              placeholder="Enter email">
                </b-form-input>
            </b-form-group>
            <b-form-group id="passwordInputGroup"
                          label="Password:"
                          label-for="password">
                <b-form-input id="password"
                              type="password"
                              v-model="form.password"
                              placeholder="Your password">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                this.$router.push({name: 'staffDashboard'});
            }
        },
        created() {
            this.$router.push({name: 'staffDashboard'});
        }
    }
</script>