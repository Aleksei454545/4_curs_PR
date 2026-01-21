import { router } from './router.js'; 
// import { header } from './widgets/header.js';
// import { search } from './widgets/search.js'; 
// import { popup } from './widgets/popup.js';
// import { msg } from './widgets/msg.js';
// import { toggle } from './widgets/toggle.js'; 
// import { img } from './widgets/img.js';

document.addEventListener('DOMContentLoaded', function() {
    const main = {
        data() {
            return {
                url: 'http://localhost:3000/',
                user: { name: "", phone: "", email: "", date: "", auth: "" },
                formData: {}, 
                date: "",
                time: "",
                title: ""
            };
        },
        watch: {
            $route: function() {
                this.init(); 
            }
        },
        mounted: function() {
            this.init();
        },
        methods: {
            init() {
                const self = this;
                const savedUser = window.localStorage.getItem("user");
                
                if (savedUser) {
                    self.user = JSON.parse(savedUser);
                }

                router.isReady().then(() => {
                    const userLocal = window.localStorage.getItem("user");
                    if (userLocal) {
                        self.user = JSON.parse(userLocal);
                        
                        const path = self.$route.path;
                        const isAdmin = self.user.type === "admin";

                        if (path === "/" && isAdmin) {
                            self.page('/campaigns');
                        } else if (path === "/campaigns" && !isAdmin) {
                            self.page('/');
                        }
                    } else {

                        if (self.$route.path !== '/') {
                            self.page('/');
                        }
                    }
                });
            },
            logout() { 

                this.user = { name: "", phone: "", email: "", date: "", auth: "" };
                window.localStorage.removeItem("user");

                this.page('/');
            },
            page(path = "") {

                this.$router.push(path);

                setTimeout(() => {
                    if (this.$route && this.$route.name) {
                        this.title = this.$route.name;
                        document.title = this.$route.name;
                    }
                }, 50);
            },

        }
    };

    const app = Vue.createApp(main);
    app.use(router);
    app.mount('#content');
});