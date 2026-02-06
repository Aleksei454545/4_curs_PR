export const sites = {
    data: function() {
        return {
            parent: "",
            data: {},
            date: "",
            date2: "",
            loader: 1,
            menuActive: false // Додано для бургера
        }
    },
    mounted: function() {
        this.parent = this.$parent.$parent;

        if (!this.parent.user) {
            this.parent.logout();
        }
        this.get();
        this.GetFirstAndLastDate();
    },
    methods: {
        // Метод для відкриття/закриття меню
        toggleMenu: function() {
            this.menuActive = !this.menuActive;
        },

        GetFirstAndLastDate: function() {
            var year = new Date().getFullYear();
            var month = new Date().getMonth();
            var firstDayOfMonth = new Date(year, month, 2);
            var lastDayOfMonth = new Date(year, month + 1, 1);

            this.date = firstDayOfMonth.toISOString().substring(0, 10);
            this.date2 = lastDayOfMonth.toISOString().substring(0, 10);
        },

        get: function() {
            var self = this;
            var data = self.parent.toFormData(self.parent.formData);

            data.append('uid', this.parent.user.id);
            if (this.date != "") data.append('date', this.date);
            if (this.date2 != "") data.append('date2', this.date2);
            
            self.loader = 1;
            axios.post(this.parent.url + "/site/getSites?auth=" + this.parent.user.auth, data).then(function(response) {
                self.loader = 0;
                self.data = response.data;
            }).catch(function(error) {
                self.parent.logout();
            });
        },

        action: function() {
            var self = this;
            var data = self.parent.toFormData(self.parent.formData);

            axios.post(this.parent.url + "/site/actionSite?auth=" + this.parent.user.auth, data).then(function(response) {
                if (self.parent.formData.id) {
                    self.$refs.header.$refs.msg.successFun("Successfully updated site!");
                } else {
                    self.$refs.header.$refs.msg.successFun("Successfully added new site!");
                }
                self.get();
            }).catch(function(error) {
                console.log('errors : ', error);
            });
        },
    },
    template: `
<div class="inside-content">
    <Header ref="header" />
    <div id='spinner' v-if="loader"></div>
    
    <div class="wrapper">
        <div id="mobile-menu-btn" @click="toggleMenu">
            <i class="fas" :class="menuActive ? 'fa-times' : 'fa-bars'"></i>
        </div>

<nav id="mobile-menu" :class="{ active: menuActive }">
        <ul>
            <li><a href="#/campaigns" @click="menuActive = false">Campaigns</a></li>
            <li><a href="#/ads" @click="menuActive = false">Ads</a></li>
            <li><a href="#/sites" @click="menuActive = false">Sites</a></li>
            <li><a href="#/payments" @click="menuActive = false">Payments</a></li>
        </ul>
    </nav>

        <div class="flex panel">
            <div class="w20 ptb30">
                <h1>Sites</h1>
            </div>
            <div class="w60 ptb20 ac">
                <input type="date" v-model="date" @change="get()" /> — <input type="date" v-model="date2" @change="get()" />
            </div>
            <div class="w20 ar ptb20">
                </div>
        </div>

        <div class="table" v-if="data.items && data.items != ''">
            <table>
                <thead>
                    <tr>
                        <th class="id">Status</th>
                        <th class="image">Site URL</th>
                        <th class="id">Views</th>
                        <th class="id">Clicks</th>
                        <th class="id">Leads</th>
                        <th class="id">Fraud</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data.items">
                        <td class="id">
                            <toogle v-model="item.published" @update:modelValue="item.published = $event; parent.formData = item; action()"></toogle>
                        </td>
                        <td class="image" style="font-weight: bold; color: #333;">
                            {{item.site}}
                        </td>
                        <td class="id">{{item.views || 0}}</td>
                        <td class="id">{{item.clicks || 0}}</td>
                        <td class="id">{{item.leads || 0}}</td>
                        <td class="id">{{item.fclicks || 0}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="empty" v-if="data.items && data.items == ''" style="text-align:center; padding:50px;">
            No sites found for this period.
        </div>
    </div>
</div>
`
};