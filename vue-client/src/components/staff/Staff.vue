<template>
    <div>
        <app-header></app-header>
        <b-container style="min-height: 90vh">
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
        </b-container>
        <footer>
            <router-link class="footerLink" to="/" tag="b-navbar-brand" style="cursor:pointer;">PAT - Programming Assesment Tool</router-link>
        </footer>
    </div>
</template>

<script>
    import Header from './Header.vue';
    export default {
        components: {
            appHeader: Header
        }
    }
</script>

<style>

    .slide-enter-active {
        animation: slide-in 200ms ease-out forwards;
    }

    .slide-leave-active {
        animation: slide-out 200ms ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
</style>