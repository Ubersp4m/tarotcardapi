<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import router from '@/router/index.js';
const username = ref("");
const password = ref("");

const registerUser = () => {
    // Registration logic here
    createUserWithEmailAndPassword(getAuth(), username.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User registered:", user);
            router.push('/user/profile/');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error ${errorCode}: ${errorMessage}`);
            router.push('/error');
        });
};

</script>

<template>
    <div id="signUp">
        <form>
            <div class="form-row">
                <label for="username">E-mail Address:</label>
                <input type="email" name="username" id="username" v-model="username" />
            </div>
            <div class="form-row">
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" v-model="password" />
            </div>
            <div class="form-row submits">
                <input type="submit" value="Sign Up" @click.prevent="registerUser()" />
            </div>
            <div>
                <p>Have an account already?</p>
                <p><a href="signin">Sign In</a></p>
            </div>
        </form>
    </div>
</template>