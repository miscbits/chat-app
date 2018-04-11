
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

Vue.component('chat-messages', require('./components/ChatMessages.vue'));
Vue.component('chat-form', require('./components/ChatForm.vue'));
Vue.component('online-users', require('./components/OnlineUsers.vue'));

const app = new Vue({
    el: '#app',

    data: {
        messages: [],
        users: []
    },

    created() {
        Echo.join('chat')
          .here((users) => {
            this.users = users
          })
          .joining((user) => {
            this.users.push(user);
          })
          .leaving((user) => {
            this.users = this.users.filter(function(item) {
                return item !== user;
            });
          })
          .listen('MessageSent', (e) => {
            this.messages.push({
              message: e.message.message,
              user: e.user
            });
        });

    },

    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },

        addMessage(message) {
            this.messages.push(message);

            axios.post('/messages', message).then(response => {
              console.log(response.data);
            });
        }
    }
});