<script setup>
import {RouterLink} from 'vue-router';
</script>

<template>
    <div class="error">
        <h1>500 - Internal Server Error</h1>
        <p>The server encountered an error while processing your request.</p>
        <RouterLink to="/">Go back to Home</RouterLink>
    </div>
</template>