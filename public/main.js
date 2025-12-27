import{ createApp } from Vue;
import { createRouter, createWebHistory } from 'vue-router';
import { VueFire, VueFireAuth, getCurrentUser } from 'vuefire';
import { getFirebase } from './firebase'
import App from './App.vue';
import Auth from './components/Auth.vue';
import Firestoe from './components/Firestore.vue';
import Protected from './components/Protected.vue';
import Forbidden from './components/Forbidden.vue';
import Mouse from './components/Mouse.vue';
import Home from './components/Home.vue';
import CardList from './components/CardList.vue';
import CardDetail from './components/CardDetail.vue';
import Spread from './components/Spread.vue';

const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path : '/auth', component: Auth, name: 'Auth'},
    {path : '/firestore', component: Firestoe, name: 'Firestore', meta: isProtected: true},
    {path : '/protected', component: Protected, name: 'Protected', meta: { requiresAuth: true, isProtected: true }},
    {path : '/forbidden', component: Forbidden, name: 'Forbidden'},
    {path : '/mouse', component: Mouse, name: 'Mouse'},
    {path : '/cards', component: CardList, name: 'CardList'},
    {path : '/cards/:id', component: CardDetail, name: 'CardDetail', props: true},
    {path : '/spread', component: Spread, name: 'Spread'},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const user =    await getCurrentUser();
    if to.meta.isProtected && !user {
        return { name: 'Forbidden' };
    }
});