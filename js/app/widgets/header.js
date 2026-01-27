export const header = {
    data: function () {
        return {
            user: {},
            parent: "",
            active: 0,
            menu: 0
        }
    },
    watch: {

    },
    mounted() {

        this.parent = this.$parent.$parent.$parent;
    },
    methods: {
    logout: function() {

        this.$parent.$parent.user = { auth: "" }; 
        
        localStorage.removeItem('user');
        
        this.$router.push('/');
    }
},
    template: `
    <header class="header">
        <msg ref="msg" />
        <div class="flex">
            <div class="w70">
                </div>
            <div class="w30 ar">
                <a href="#" @click.prevent="logout()" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        </div>
    </header>
`
};