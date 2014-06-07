// ==UserScript==
// @name Firefox HTML5 Notification
// @namespace FirefoxHTML5Notification
// @author ayanamist
// @description Providing a compatibility wrapper for Notification API.
// @match *://*/*
// @version 1.0
// @run-at document-start
// @grant unsafeWindow
// ==/UserScript==

(function (window) {
    // If unsafeWindow is not accessible, then exit.
    if (typeof unsafeWindow === "undefined" || unsafeWindow === window) {
        return;
    }
    // If webkitNotification is defined or Notification is not defined, then exit.
    if (typeof unsafeWindow.webkitNotifications !== "undefined" || typeof this.Notification === "undefined") {
        return;
    }
    var Notification = this.Notification,
        PERMISSION_ALLOWED = 0,
        PERMISSION_NOT_ALLOWED = 1,
        PERMISSION_DENIED = 2;
    var NotificationWrapper = function (iconUrl, title, body) {
        this.iconUrl = iconUrl;
        this.title = title;
        this.body = body;
    };
    NotificationWrapper.prototype.show = function () {
        var notification = new Notification(this.title, {
            dir: "auto",
            lang: "",
            tag: "notification",
            body: this.body,
            icon: this.iconUrl
        });
        if (notification.hasOwnProperty("ondisplay")) {
            notification.onshow = notification.ondisplay.bind(notification);
        }
        if (notification.hasOwnProperty("onerror")) {
            notification.onerror = notification.onerror.bind(notification);
        }
        if (notification.hasOwnProperty("onclose")) {
            notification.onclose = notification.onclose.bind(notification);
        }
        if (notification.hasOwnProperty("onclick")) {
            notification.onclick = notification.onerror.bind(notification);
        }
    };
    NotificationWrapper.prototype.cancel = function () {

    };
    unsafeWindow.webkitNotifications = {
        checkPermission: function () {
            switch (Notification.permission) {
                case "granted":
                    return PERMISSION_ALLOWED;
                case "denied":
                    return PERMISSION_DENIED;
                default:
                    return PERMISSION_NOT_ALLOWED;
            }
        },
        requestPermission: function (callback) {
            Notification.requestPermission(function (perm) {
                switch (perm) {
                    case "granted":
                        callback(PERMISSION_ALLOWED);
                        break;
                    case "denied":
                        callback(PERMISSION_DENIED);
                        break;
                    default:
                        callback(PERMISSION_NOT_ALLOWED);
                }
            });
        },
        createNotification: function (iconUrl, title, body) {
            return new NotificationWrapper(iconUrl, title, body);
        }
    };
})(this);
