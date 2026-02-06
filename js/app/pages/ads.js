export const ads = {
  data: function() {
    return {
      parent: "",
      data: {},
      loader: 1,
      menuActive: false, // Додано для бургера
      type: 0
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
      data.append('uid', this.parent.user.id);
      data.append('type', 'user');
      self.loader = 1;
      axios.post(this.parent.url + "/site/getBanners?auth=" + this.parent.user.auth, data).then(function(response) {
        self.loader = 0;
        self.data = response.data;
        if (response.data.types && response.data.types[0] && !self.type) self.type = response.data.types[0].id;
      }).catch(function(error) {
        self.parent.logout();
      });
    },
    copy: async function(text) {
      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        this.$refs.header.$refs.msg.successFun("Successfully copied!");
        this.$refs.copy.active = 0;
        this.parent.formData = {};
      } else {
        this.$refs.header.$refs.msg.alertFun("Use https!");
      }
    }
  },

  template: `
<div class="inside-content">
  <Header ref="header" />
  <div id="spinner" v-if="loader"></div>
  
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
      <div class="w10 ptb30">
        <h1>Ads</h1>
      </div>
      <div class="w70"></div>
      <div class="w20 al ptb20">
          <a href="#" class="btnS" @click.prevent="parent.formData.copy = data.multi;$refs.copy.active=1;">
            <i class="fas fa-images"></i>
            Multi banners
          </a>
      </div>
    </div>

    <popup ref="img" title="Banner">
      <div class="ac">
        <img :src="parent.url + '/' + parent.formData.img" v-if="parent.formData.img" style="max-width:100%" />
      </div>
    </popup>

    <popup ref="copy" :title="'Copy banner'">
      <div class="form inner-form">
        <form v-if="parent.formData">
          <div class="row">
            <label>Code</label>
            <textarea v-model="parent.formData.copy" style="width:100%; height:120px;"></textarea>
          </div>

          <div class="row">
            <label>Type</label>
            <select v-model="type" @change="get()" required>
              <option value="0">----</option>
              <option v-if="data.types" v-for="c in data.types" :value="c.id">{{c.title}}</option>
            </select>
          </div>

          <div class="row">
            <button class="btn" @click.prevent="copy(parent.formData.copy)">Copy code</button>
          </div>
        </form>
      </div>
    </popup>

    <div class="table" v-if="data.items && data.items != ''">
      <table>
        <thead>
          <tr>
            <th class="id">#</th>
            <th class="id">Status</th>
            <th class="image">Banner</th>
            <th>Campaign</th>
            <th class="hide-mobile">Link</th>
            <th class="id">Views</th>
            <th class="id">Clicks</th>
            <th class="id">Leads</th>
            <th class="actions">Get Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.items">
            <td class="id">{{item.id}}</td>
            <td class="id">
              <toogle v-model="item.published" @update:modelValue="item.published = $event;parent.formData = item;" />
            </td>
            <td class="image">
              <a href="#" @click.prevent="parent.formData=item;$refs.img.active=1">
                <img :src="parent.url + '/' + item.img" style="width:50px; border-radius:4px;" />
              </a>
            </td>
            <td><strong>{{item.campaign_title}}</strong></td>
            <td class="hide-mobile">{{item.link}}</td>
            <td class="id">{{item.views || 0}}</td>
            <td class="id">{{item.clicks || 0}}</td>
            <td class="id">{{item.leads || 0}}</td>
            <td class="actions">
              <a href="#" class="btnS" @click.prevent="parent.formData = item; parent.formData.copy = item.copy; $refs.copy.active=1;" style="padding: 5px 10px;">
                <i class="fas fa-code"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="empty" v-if="data.items == ''">
      No items
    </div>
  </div>
</div>
`
};