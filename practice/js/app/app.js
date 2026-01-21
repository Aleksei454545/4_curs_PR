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
                    const userStr = window.localStorage.getItem("user");
                    if (userStr) {
                        self.user = JSON.parse(userStr);
                        
                        // Используем currentRoute для получения чистого пути без учета подпапок GitHub
                        const path = router.currentRoute.value.path;
                        const type = self.user.type;

                        if (path === "/" && type === "admin") {
                            self.page('/campaigns');
                        } else if (['/campaigns', '/campaign', '/users', '/user'].some(p => path.startsWith(p)) && type !== "admin") {
                            self.page('/statistics');
                        }
                        // Если мы уже на нужной странице, ничего не делаем
                    } else {
                        // Если нет пользователя, всегда на логин
                        if (router.currentRoute.value.path !== '/') {
                            self.page('/');
                        }
                    }
                });
            },
            
            // Самое важное изменение для GitHub Pages
            page(path = "") {
                if (path) {
                    // Используем router.push напрямую, он сам добавит # благодаря HashHistory
                    router.push(path);
                }
                
                setTimeout(() => {
                    const routeName = router.currentRoute.value.name || "App";
                    this.title = routeName;
                    document.title = routeName;
                }, 100);
            },

            logout() {
                this.user = { name: "", phone: "", email: "", date: "", auth: "" };
                window.localStorage.removeItem("user");
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
                this.$router.push(path);

                setTimeout(() => {
                    if (this.$route && this.$route.name) {
                        this.title = this.$route.name;
                        document.title = this.$route.name;
                    }
                }, 0);
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