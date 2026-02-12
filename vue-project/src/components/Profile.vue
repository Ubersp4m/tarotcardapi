<template>
    <div id="profile">
        <form>
            <div class="form-row">
                <label for="email">Email Address:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-row">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit" @click.prevent="handleSignUp">Sign Up</button>
        </form>
    </div>
</template>