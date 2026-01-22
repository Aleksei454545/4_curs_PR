export const campaigns = {
    template: `
        <div class="page-container">
            <header class="header-actions">
                <h1>Кампании</h1>
                <button @click="$root.logout()" class="btn-exit">Выйти</button>
            </header>

            <div class="content">
                <p>Добро пожаловать, {{ $root.user.name }}</p>
                
                <div class="campaign-list">
                    </div>
            </div>
        </div>
    `,
    data() {
        return {
            parent:"",
        }
    },
    mounted() {
       this.parent = this.$parent.$parent;

       if (!this.parent.user) {
        this.parent.logout();
    }

},
};