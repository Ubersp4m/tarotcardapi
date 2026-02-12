<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import router from '@/router/index.js';

const username = ref("");
const password = ref("");

const signInUser = () => {
    // Sign-in logic here
    signInWithEmailAndPassword(getAuth(), username.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User signed in:", user);
            router.push('/user/profile');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error ${errorCode}: ${errorMessage}`);
            router.push('/error');
        });
};

const signInWithGoogle = () => {
    // Google sign-in logic here
};

</script>

<template>
    <div id="signIn">
        <form>
            <div class="form-row">
                <label for="username">Email Address:</label>
                <input type="email" name="username" id="username" v-model="username" />
            </div>
            <div class="form-row">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" v-model="password"/>
            </div>
            <div class="form-row submits">
                <input type="submit" value="Sign In" @click.prevent="signInUser()" />
                <p>Need an account?</p>
                <p><a href="signup">Sign Up</a></p>
            </div>
        </form>
    </div>
</template>