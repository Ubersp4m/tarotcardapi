import { createRouter, createWebHistory } from 'vue-router';
import { VueFire, VueFireAuth, getCurrentUser } from 'vuefire';
import Auth from '@/components/Auth.vue';
import Forbidden from '@/components/Forbidden.vue';
import Home from '@/components/Home.vue';
import CardList from '@/components/CardList.vue';
import CardDetail from '@/components/CardDetail.vue';
import CardSpread from '@/components/CardSpread.vue';
import NotFound from '@/components/NotFound.vue';
import Error from '@/components/Error.vue';
import SignUp from '@/components/SignUp.vue';
import Profile from '@/components/Profile.vue';
import Decks from '@/components/Decks.vue';
import {firebaseApp} from '../firebase';

const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path : '/signin', component: Auth, name: 'Auth'},
    {path : '/signup', component: SignUp, name: 'SignUp'},
    {path : '/user/profile/', component: Profile, name: 'Profile', meta: { isProtected: true }},
    {path : '/forbidden', component: Forbidden, name: 'Forbidden'},
    {path : '/cards', component: CardList, name: 'CardList'},
    {path : '/cards/:id', component: CardDetail, name: 'CardDetail', props: true},
    // {path : '/spread', component: Spread, name: 'Spread'},
    // {path : '/spread/:type', component: Spread, name: 'SpreadType', props: true},
    {path : '/notfound', component: NotFound, name: 'NotFound'},
    {path : '/error', component: Error, name: 'Error'},
    {path : '/decks', component: Decks, name: 'Decks', meta: {
        requiresAuth: true,
    }},
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// router.beforeEach(async (to, from, next) => {
//     try {
//         const user = await getCurrentUser();
//         console.log('the user is : ' + user);
//         if (to.meta.requiresAuth && !user) {
//             return { name: 'Forbidden' };
//         }       
//     } catch (error) {
//        console.log('an error occured: '+error); 
//     }
    
// });

export default router;