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
                    if (window.localStorage.getItem("user")) {
                        self.user = JSON.parse(window.localStorage.getItem("user"));
                        
                        const path = self.$route.path;
                        const isAdmin = self.user.type === "admin";
                        const isManager = self.user.type === "manager";

                        if (path === "/" && isAdmin) {
                            self.page('/campaigns');
                        } else if (['/campaigns', '/campaign', '/users', '/user'].includes(path) && !isAdmin) {
                            self.page('/statistics');
                        } else if (['/statistics', '/payments', '/sites'].includes(path) && isAdmin) {
                            self.page('/campaigns');
                        } else if (['/campaigns', '/campaign', '/users', '/user', '/statistics', '/payments', '/sites'].includes(path) && isManager) {
                            self.page();
                        } else if (!['/campaigns', '/campaign', '/users', '/user', '/statistics', '/payments', '/sites'].includes(path)) {
                            self.page();
                        }
                    } else {
                        self.page('/');
                    }
                });
            },
            logout() { 
                this.user = { name: "", phone: "", email: "", date: "", auth: "" };
                window.localStorage.setItem("user", '');
                this.page('/');
            },
            scrollTop() {
                setTimeout(() => {
                    window.scroll({ top: 0, behavior: 'smooth' });
                }, 50);
            },
            scrollBottom() { 
                setTimeout(() => {
                    window.scroll({ top: 1000, behavior: 'smooth' });
                }, 50);
            },
            page(path = "") {

                if (!path) return;

                this.$router.push(path).catch(err => {
                    console.error("Помилка роутингу:", err);
                });

                setTimeout(() => {
                    const routeName = this.$route.name || "App";
                    document.title = routeName;
                }, 100);
            },
            toFormData(obj) { 
                const fd = new FormData();
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        if (typeof obj[key] === 'object' && key !== 'copy' && obj[key] !== null) {

                            for (const subKey in obj[key]) {
                                fd.append(`${key}[${subKey}]`, obj[key][subKey]);
                            }
                        } else if (key !== 'copy') {
                            fd.append(key, obj[key]);
                        }
                    }
                }
                return fd;
            }
        }
    };

    const app = Vue.createApp(main);
    app.use(router);
    app.mount('#content');
});