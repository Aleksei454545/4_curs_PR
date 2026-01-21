export const login = {
    template: `
        <div class="login-page">
            <div class="login-form">
                <h2>Вход в систему</h2>
                <input v-model="email" type="email" placeholder="Email" />
                <input v-model="password" type="password" placeholder="Пароль" />
                <button @click="auth">Войти</button>
                <p v-if="error" class="error">{{ error }}</p>
            </div>
        </div>
    `,
    // data() {
    //     return {
    //         email: "",
    //         password: "",
    //         error: ""
    //     };
    // },
    // methods: {
    //     auth() {
    //         if (this.email === "admin@test.com" && this.password === "admin") {
    //             const userData = {
    //                 name: "Admin",
    //                 type: "admin",
    //                 email: this.email,
    //                 auth: true
    //             };
                
    //             window.localStorage.setItem("user", JSON.stringify(userData));
                
    //             this.$root.init(); 
    //         } else {
    //             this.error = "Неверный логин или пароль";
    //         }
    //     }
    // }
};
