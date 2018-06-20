<template>
    <div>
            <b-row>
                <b-col>
                    <b-form-group horizontal label="Filter">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search" />
                            <b-input-group-append>
                                <b-btn :disabled="!filter" @click="filter = ''" class="secondary-button">Clear</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-button to="create" class="primary-button right-align">Create New Assignment</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-table striped hover :items="items" :fields="fields" :filter="filter">
                    <template slot="name" slot-scope="data">
                        <router-link :to="{name: 'assignmentDetail', params: {id: data.item.id}}" tag="a">{{data.item.name}}</router-link>
                    </template>
                    <template slot="dueDate" slot-scope="data">
                        {{data.item.dueDate? new Date(new Date(data.item.dueDate).setSeconds(0)).toLocaleString() : ''}}
                    </template>
                    <template slot="active" slot-scope="data">
                        <template v-if="data.item.active === 1">
                            <i class="fa fa-check-circle" style="margin-right:5px;color: lawngreen;" aria-hidden="true"></i>Active
                        </template>
                        <template v-else>
                            <i class="fa fa-ban" aria-hidden="true" style="margin-right:5px;color: red;"></i>Inactive
                        </template>
                    </template>
                </b-table>
            </b-row>
    </div>
</template>

<script>
    import axios from 'axios';

    const fields = [
        {
            key: 'name',
            label: 'Assignment Name',
            sortable: true
        },
        {
            key: 'code',
            label: 'Course Code',
            sortable: true
        },
        {
            key: 'rules',
            label: 'Rules Used',
            sortable: true
        },
        {
            key: 'dueDate',
            label: 'Due Date',
            sortable: true,
            // Variant applies to the whole column, including the header and footer
//            variant: 'danger'
        },
        {
            key: 'submitted',
            label: 'Student Submitted',
            sortable: true
        },
        {
            key: 'active',
            label: 'Active Assignment',
            sortable: true
        }
    ];

    export default {
        data() {
            return {
                items: null,
                fields,
                filter: ''
            }
        },
        created() {
            axios.get('/qualityFile').then(res => {
                console.log(res);
                this.items = res.data.db.map(i => {
                    for (let j in res.data.sonar.profiles) {
                        if (res.data.sonar.profiles[j].key === i.ID) {
                            return {id: i.ID, name:i.Name, dueDate: i.DueDate, code: i.CourseCode, submitted: res.data.sonar.profiles[j].projectCount, rules: res.data.sonar.profiles[j].activeRuleCount, active: i.Active};
                        }
                    };
                });
            })
                .catch(err => {
                    console.error(err);
                })
        }
    }
</script>