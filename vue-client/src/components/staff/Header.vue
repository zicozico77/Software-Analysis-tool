<template>
    <b-navbar toggleable="md" type="dark" variant="uq" class="header">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <router-link to="/staff" tag="b-navbar-brand" style="cursor:pointer;">PAT-Staff Portal</router-link>
        <!--<b-navbar-brand href="#">PAT-Staff Portal</b-navbar-brand>-->

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item :to="{name:'staffDashboard'}">Dashboard</b-nav-item>
                <!--<b-nav-item href="#" disabled>Disabled</b-nav-item>-->
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <!--<b-navbar-nav class="ml-auto">-->

                <!--<b-nav-form>-->
                    <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>-->
                    <!--<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
                <!--</b-nav-form>-->

                <!--<b-nav-item-dropdown text="Lang" right>-->
                    <!--<b-dropdown-item href="#">EN</b-dropdown-item>-->
                    <!--<b-dropdown-item href="#">ES</b-dropdown-item>-->
                    <!--<b-dropdown-item href="#">RU</b-dropdown-item>-->
                    <!--<b-dropdown-item href="#">FA</b-dropdown-item>-->
                <!--</b-nav-item-dropdown>-->

                <!--<b-nav-item-dropdown right>-->
                    <!--&lt;!&ndash; Using button-content slot &ndash;&gt;-->
                    <!--<template slot="button-content">-->
                        <!--<em>User</em>-->
                    <!--</template>-->
                    <!--<b-dropdown-item href="#">Profile</b-dropdown-item>-->
                    <!--<b-dropdown-item href="#">Signout</b-dropdown-item>-->
                <!--</b-nav-item-dropdown>-->
            <!--</b-navbar-nav>-->

        </b-collapse>
    </b-navbar>
</template>

<style>
    .bg-uq{
        background-color: #42135A;
    }

    .header {
        margin-bottom: 20px;
    }
</style>