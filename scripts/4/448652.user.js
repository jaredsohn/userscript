// ==UserScript==
// @name        VK HTML5 Notifications
// @namespace   vk-com
// @include     https://vk.com/*
// @include     http://vk.com/*
// @version     1
// @grant       none
// ==/UserScript==

let p = window.Notification.prototype;

if (typeof p.show != "function") {
    p.show = function() {};
}

if (typeof p.cancel != "function") {
    p.cancel = function() {};
}

window.webkitNotifications = {
    checkPermission: function () {
        if (window.Notification.permission == "granted") {
            return 0;
        }
        return 1;
    },
    requestPermission: function() {
        window.Notification.requestPermission();
    },
    createNotification: function(icon, title, text) {
        return new window.Notification(title, { body: text, icon: icon });
    }
};

if (window.cur && typeof window.cur.notify_on == "boolean") {
    window.cur.notify_on = true;
}
