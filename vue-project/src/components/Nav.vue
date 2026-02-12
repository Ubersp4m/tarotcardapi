<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {vOnClickOutside} from '@vueuse/components';
import {useScreenSize} from './useScreenSize'


const {isMobile} = useScreenSize();
const userSignedIn = ref(false);
const isOpen = ref(false);

onMounted(() => {
    document.addEventListener('click', clickOutsideHandler);
    window.addEventListener('resize', () => {
        if (!isMobile.value) {
            const nav = document.getElementById('nav');
            nav.style.display = 'flex';
            isOpen.value = false;
        }
        else {
            const nav = document.getElementById('nav');
            nav.style.display = 'none';
        }
    });
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userSignedIn.value = true;
        } else {
            userSignedIn.value = false;
        }
    });
});

const clickOutsideHandler = () => {
    if (isOpen.value && isMobile.value) {
        const nav = document.getElementById('nav');
        nav.style.display = 'none';
        isOpen.value = false;
    }
};

onUnmounted(() => {
    document.removeEventListener('click', clickOutsideHandler);
});

const toggleMenu = () => {
    const nav = document.getElementById('nav');
    if (nav.style.display === 'flex' && isMobile.value) {
        isOpen.value = false;
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        isOpen.value = true;
    }
};

const {resetHome} =  defineProps({
    resetHome: {
        type: Function,
        required: false
    }
});

const signUserOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        console.log("User signed out successfully.");
    }).catch((error) => {
        console.log("Error signing out:", error);
    });
};  
</script>

<template>
    <nav>   
        <div id="mobile-nav" @click.stop="toggleMenu()">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <div id="nav">
            <ul id="signedOutNav" v-if="!userSignedIn">
                <li>
                    <RouterLink to="/signup">Sign Up</RouterLink>
                </li>
                <li>
                    <RouterLink to="/signin">Sign In</RouterLink>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <RouterLink to="/" @click="resetHome()">Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/decks">Decks</RouterLink>
                </li>
                <li>
                    <RouterLink to="/cardspreads">Saved Spreads</RouterLink>
                </li>
                <li>
                    <RouterLink to="/signout" @click="signUserOut()">Sign Out</RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>