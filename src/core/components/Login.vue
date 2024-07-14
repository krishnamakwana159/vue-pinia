<template>
<div class="mt-16">
    <head>
        <title>Login Page</title>

    </head>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="username">Username: </label>
                <input type="text" id="username" v-model.trim="loginForm.username" placeholder="Enter username" @blur="v$.username.$touch"> <br>
                <div v-for="error of v$.username.$errors" :key="error.$message.toString()"
                    class="error text-red-700">
                    <p id="username-error">{{ error.$message }}</p>
                </div>
                <!-- <span v-if="errors.username" id="username-error" class="error">{{ errors.username }}</span> -->
            </div>
            <div class="form-group">
                <label for="password">Password: </label>
                <input type="password" id="password" v-model.trim="loginForm.password" placeholder="Enter password" @blur="v$.password.$touch"><br>
                <div id="password-error" v-for="error of v$.password.$errors" :key="error.$message.toString()"
                    class="error text-red-700">
                    <p>{{ error.$message }}</p>
                </div>
                <!-- <span v-if="errors.password" id="password-error" class="error">{{ errors.password }}</span> -->
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import router from '@/router'
import type { LoginModel } from '../models/login.model';
import { maxLength, minLength, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const loginForm = ref<LoginModel>({
    id: 0,
    username: '',
    password: ''
})

const loginRules = computed(() => ({
    username: { required, minLength: minLength(5), maxLength: maxLength(10) },
    password: { required, minLength: minLength(3), maxLength: maxLength(5) }
}))

const v$ = useVuelidate(loginRules, loginForm)

const login = async () => {
    const isFormValid: boolean = await v$.value.$validate()
    if (isFormValid) {
        // if (productIndex.value)
        //   productStore.editProduct(productForm.value, parseInt(productIndex.value))
        // else productStore.addProduct(productForm.value)
        router.push('productList')
    }
}

// const login = () => {
//     // Validate form data
//     if (!formData.value.username) {
//         errors.value.username = 'Username is required';
//     } else {
//         errors.value.username = '';
//     }

//     if (!formData.value.password) {
//         errors.value.password = 'Password is required';
//     } else {
//         errors.value.password = '';
//     }

//     // Submit form if no errors
//     if (!errors.value.username && !errors.value.password) {
//         // Perform login action
//         console.log('Logging in...', formData.value);
//         router.push('productList')
//     }
// };
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

.error {
    color: red;
}

button{
    border: 1px solid white;
}
</style>