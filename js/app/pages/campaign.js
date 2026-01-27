export const campaign = {
    data: function() {
        return {
            parent: "",
            id: this.$route.params.id, 
            data: {},
            loader: 1
        }
    },
    mounted: function() {

        let root = this.$parent;
        while (root.$parent && !root.url) {
            root = root.$parent;
        }
        this.parent = root;

        this.get();
    },
    methods: {
        get: function() {
            var self = this;
            self.loader = 1;
            
            axios.post(this.parent.url + "/site/getCampaign?auth=" + this.parent.user.auth, 
                this.parent.toFormData({id: this.id}))
                .then(function(response) {
                    self.data = response.data;
                    self.loader = 0;
                })
                .catch(function() {
                    self.loader = 0;
                });
        }
    },
    template: `
<div class="inside-content">
    <Header ref="header" />
    <div id="spinner" v-if="loader"></div>
    <div class="wrapper">
        <div class="flex panel">
            <div class="w20 ptb30">
                <router-link to="/campaigns" class="btn-back">← Back</router-link>
            </div>
            <div class="w60 ptb20 ac">
                <h1>Campaign Details #{{id}}</h1>
            </div>
            <div class="w20"></div>
        </div>

        <div class="table-container" v-if="data">
            <div class="p20">
                <h3>Title: {{data.title}}</h3>
                <p>Status: {{data.status}}</p>
                </div>
        </div>
    </div>
</div>`
};