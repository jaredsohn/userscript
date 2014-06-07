// ==UserScript==
// @name        webkitNotifications shim for Firefox 22+
// @namespace   https://github.com/Rob--w/
// @author      Rob Wu <gwnRob@gmail.com>
// @description Enable desktop notifications on Firefox 22+ for websites which use the webkitNotification API.
// @include     *
// @version     1.0.2
// @grant       none
// ==/UserScript==

/**
 * (c) 2013 Rob Wu <gwnRob@gmail.com>
 * License: WTFPL
 *
 * This shim fully implements the legacy webkitNotifications API
 * Usable as a library or user script.
 *
 * References:
 * - http://www.chromium.org/developers/design-documents/desktop-notifications/api-specification
 * - http://notifications.spec.whatwg.org/
 * - chromium/src/third_party/WebKit/Source/modules/notifications/Notification.h
 * - chromium/src/third_party/WebKit/Source/modules/notifications/Notification.idl
 */

(function(global) {
    'use strict';
    if (global.webkitNotifications || typeof Notification == 'undefined') return;

    global.webkitNotifications = {
        createNotification: createNotification,
        PERMISSION_ALLOWED: 0,
        PERMISSION_NOT_ALLOWED: 1,
        PERMISSION_DENIED: 2,
        checkPermission: function() { return permission; },
        requestPermission: requestPermission
    };
    var permission = 1; // Default permission = "Not allowed"
    function createNotification(iconURL, title, text) {
        var notificationOptions = {};
        if (text) notificationOptions.body = text;
        if (iconURL) notificationOptions.icon = iconURL;
        notificationOptions.title = title || '';

        var notification;
        // List of events which we want to expose
        var eventNames = [
            'onshow',
            'onerror',
            'onclose',
            'onclick'
        ];
        // Object which holds the DOM0 event listener until the notification is shown.
        var eventTarget = {};
        // An implementation of the webkitNotification interface
        var webkitNotification = {
            show: function show() {
                if (notification) return;
                notification = new Notification(title, notificationOptions);
                // Call delayed addEventListener, removeEventListener, ...
                var o;
                while( (o = replayQueue.shift()) ) {
                    notification[o.methodName].apply(notification, o.arguments);
                }
                // Synchronize DOM0 events
                eventNames.forEach(function(eventName) {
                    notification[eventName] = eventTarget[eventName];
                });
                eventTarget = notification;
            },
            cancel: function cancel() {
                if (notification) notification.close();
            },
            // Not in spec, but present in Chrome. Included for consistency.
            close: function close() {
                if (notification) notification.close();
            }
        };
        // Implement EventTarget on webkitNotification
        var replayQueue = [];
        [
            'addEventListener',
            'removeEventListener',
            'dispatchEvent'
        ].forEach(function(methodName) {
            webkitNotification[methodName] = function() {
                // Call method directly on the notification object, if available.
                if (notification) return notification[methodName].apply(notification, arguments);
                // Notification not yet visible, queue the call for later use.
                replayQueue.push({methodName: methodName, arguments: arguments});
            };
        });
        // Implement DOM0 event binding.
        eventNames.forEach(function(eventName) {
            defProp(eventName, {
                get: function() { return eventTarget[eventName] || null; },
                set: function(f) { eventTarget[eventName] = typeof f == 'function' ? f : null; }
            });
        });
        // Alias ondisplay <> onshow
        defProp('ondisplay', Object.getOwnPropertyDescriptor(webkitNotification, 'onshow'));

        // dir and tag setters. Only relevant before the show() method has been called.
        ['dir', 'tag'].forEach(function(propertyName) {
            defProp(propertyName, {
                get: function() { return notificationOptions[propertyName] || ''; },
                set: function(value) { notificationOptions[propertyName] = value; }
            });
        });
        // Alias replaceId <> tag
        defProp('replaceid', Object.getOwnPropertyDescriptor(webkitNotification, 'tag'));


        // Shorthand for defining properties on webkitNotification
        function defProp(propertyName, descriptor) {
            descriptor.enumerable = true;
            Object.defineProperty(webkitNotification, propertyName, descriptor);
        }
        return webkitNotification;
    }
    function requestPermission(callback) {
        Notification.requestPermission(function(p) {
            permission = p == 'granted' ? 0 : p == 'denied' ? 2 : /*'default*/ 1;
            if (callback) {
                callback();
            }
        });
    }
})(typeof unsafeWindow == 'undefined' ? this : unsafeWindow);
