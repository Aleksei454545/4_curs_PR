export const payments = {
    data: function() {
        return {
            parent: "",
            data: {},
            loader: 1,
            menuActive: false // Стан для мобільного меню
        }
    },
    mounted: function() {
        this.parent = this.$parent.$parent;

        if (!this.parent.user) {
            this.parent.logout();
        }
        this.get();
    },
    methods: {
        // Метод для відкриття/закриття меню
        toggleMenu: function() {
            this.menuActive = !this.menuActive;
        },
        get: function() {
            var self = this;
            var data = self.parent.toFormData(self.parent.formData);
            data.append('id', this.parent.user.id);
            self.loader = 1;
            axios.post(this.parent.url + "/site/getPayments?auth=" + this.parent.user.auth, data).then(function(response) {
                self.loader = 0;
                self.data = response.data;
            }).catch(function(error) {
                self.parent.logout();
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
            <div class="w30 ptb10">
                <h2>Payments</h2>
            </div>
            <div class="w50"></div>
            <div class="w20 ptb15 al">
                </div>
        </div>

        <div class="table" v-if="data.items && data.items != ''">
            <table>
                <thead>
                    <tr>
                        <th class="id">#</th>
                        <th class="id">Value</th>
                        <th>Date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data.items">
                        <td class="id">{{item.id}}</td>
                        <td class="id">
                           <span style="font-weight:bold; color:#2ecc71;">{{item.value}}</span>
                        </td>
                        <td>
                           {{item.date_title}}
                        </td>
                        <td>
                            {{item.description}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="empty" v-if="data.items == ''" style="text-align:center; padding:50px;">
            No payments history found.
        </div>
    </div>
</div>
`
};