// ==UserScript==
// @name        Zendesk Chat Notifications
// @namespace   http://www.software-architects.at
// @description Adds desktop notifications, sound looping and always on to Zendesk chat.
// @match       https://*.zendesk.com/agent/*
// @grant       none
// @version     1.7
// @copyright   2014 software architects gmbh
// ==/UserScript==

var currentNotifications = [];
var chatsDiv = null;
var settingsDiv = null;
var loopTimer = null;
var enableDesktop = false;
var enableLoop = false;
var alwaysOn = false;
var alwaysOnTimer = null;
var onlineButton = null;

function getStorageOrDefault(key, defaultValue) {
    "use strict";
    var text = localStorage.getItem(key);
    console.debug('ZendeskChat: getStorage for ' + key + ' = ' + text + ' (' + typeof text + ')');
    if (text === null) {
        console.debug('ZendeskChat: getStorage returning default ' + defaultValue + ' (' + typeof defaultValue + ')');
        return defaultValue;
    } else {
        var val = JSON.parse(text);
        console.debug('ZendeskChat: getStorage returning ' + val + ' (' + typeof val + ')');
        return val;
    }
}

function setStorage(key, val) {
    "use strict";
    var text = JSON.stringify(val);
    console.debug('ZendeskChat: setStorage for ' + key + ' = ' + val + ' (' + typeof val + ') as ' + text + ' (' + typeof text + ')');
    localStorage.setItem(key, text);
}

function processChatsAdded(event) {
    "use strict";
    if ((enableDesktop && Notification.permission === "granted") || enableLoop) {
        // find invite nodes
        var invites = chatsDiv.find('.ember-view.invite');
        $.each(invites, function (index, value) {

            // only handle each request once
            if ($.inArray(value, currentNotifications) < 0) {
                var username = chatsDiv.find('a.username').text();
                var subject = chatsDiv.find('div.chat-subject').text();

                // only if we could gather all the info
                if (username && subject) {
                    console.debug('ZendeskChat: new chat request - notifying');
                    var title = "Chat request: " + username;
                    var options = {
                        body : subject,
                        icon : 'http://www.zendesk.com/favicon.ico'
                    };

                    var notification = null;
                    if (enableDesktop) {
                        notification = new Notification(title, options);
                        notification.onclick = function (x) { window.focus(); };
                    }
                    currentNotifications.push(value);

                    // sound looping
                    if (enableLoop && loopTimer === null) {
                        console.debug('ZendeskChat: looping sound');
                        loopTimer = window.setInterval(function () {
                            soundManager.sounds.invite.play();
                            console.debug('ZendeskChat: beeping');
                        }, 4000);
                    }

                    // when the zendesk-internal notification closes
                    $(value).on("remove", function () {
                        console.debug('ZendeskChat: chat request ended');
                        currentNotifications.splice($.inArray(this, currentNotifications), 1);
                        if (currentNotifications.length === 0 && loopTimer !== null) {
                            console.debug('ZendeskChat: ending sound loop');
                            window.clearInterval(loopTimer);
                            loopTimer = null;
                        }

                        if (notification !== null) {
                            notification.close();
                        }
                    });
                }
            }
        });
    }
}

function ensureOnlineChat() {
    "use strict";
    if (onlineButton === null) {
        onlineButton = $('#chat-header').find('button.ember-view.availability');
        console.debug('ZendeskChat: setAlwaysOn discovered button');
    }

    if (onlineButton.hasClass('unavailable')) {
        console.debug('ZendeskChat: setAlwaysOn chat seems offline - clicking');
        onlineButton.click();
    }
}

function setAlwaysOn(value) {
    "use strict";
    console.debug('ZendeskChat: setAlwaysOn ' + value);
    if (value === true) {
        if (alwaysOnTimer === null) {
            alwaysOnTimer = window.setInterval(ensureOnlineChat, 5000);
            console.debug('ZendeskChat: setAlwaysOn started timer');
            ensureOnlineChat();
        }
    } else {
        if (alwaysOnTimer !== null) {
            window.clearInterval(alwaysOnTimer);
            alwaysOnTimer = null;
            console.debug('ZendeskChat: setAlwaysOn removed timer');
        }
    }
}

function buildSettingsDiv() {
    "use strict";
    var div = $('<div class="enable_checkbox" id="ZendeskChatNotificationsSettings" style="padding-top:15px;float:left;" />');

    // add notify checkbox
    var notifications = $('<input type="checkbox" style="margin-left:10px;" />');
    notifications.prop('checked', enableDesktop);
    notifications.change(function () {
        enableDesktop = $(this).is(':checked');
        setStorage('ChatNotifications.Desktop', enableDesktop);
        if (enableDesktop && Notification.permission !== "granted" && Notification.permission !== 'denied') {
            console.debug('ZendeskChat: requesting notification permission');
            Notification.requestPermission(function (permission) {
                console.debug('ZendeskChat: permission: ' + permission);
                if (!Notification.hasOwnProperty('permission')) {
                    Notification.permission = permission;
                }
            });
        }
    });

    // add loop checkbox
    var loop = $('<input type="checkbox" style="margin-left:10px;" />');
    loop.prop('checked', enableLoop);
    loop.change(function () {
        enableLoop = $(this).is(':checked');
        setStorage('ChatNotifications.Loop', enableLoop);
    });

    // add a-on checkbox
    var aon = $('<input type="checkbox" style="margin-left:10px;" />');
    aon.prop('checked', alwaysOn);
    aon.change(function () {
        alwaysOn = $(this).is(':checked');
        setStorage('ChatNotifications.AlwaysOn', alwaysOn);
        setAlwaysOn(alwaysOn);
    });

    var label = $('<label class="checkbox" />');
    label.append(notifications);
    label.append('<span>Desktop notifications</span>');
    div.append(label);
    div.append('<br />');

    label = $('<label class="checkbox" />');
    label.append(loop);
    label.append('<span>Notification sound looping</span>');
    div.append(label);
    div.append('<br />');

    label = $('<label class="checkbox" />');
    label.append(aon);
    label.append('<span>Always-online</span>');
    div.append(label);
    div.append('<br />');

    return div;
}

// try to find the main chat dom element
function findChat() {
    "use strict";
    console.debug('ZendeskChat: looking for incoming-chats');
    chatsDiv = $('#incoming-chats');
    if (chatsDiv.length === 0) {
        // not found -> DOM not fully built -> retry in due time
        window.setTimeout(function () { findChat(); }, 1000);
    } else {
        console.debug('ZendeskChat: found incoming-chats');
        // if the current div gets lost -> look for it again
        chatsDiv.on("remove", function () {
            console.debug('ZendeskChat: incoming-chats lost - rediscovering');
            findChat();
        });

        chatsDiv.on('DOMNodeInserted', processChatsAdded);

        // for pre-1.4 scripts assume that a granted permission means notify
        if (localStorage.getItem('ChatNotifications.Desktop') === null && Notification.permission === "granted") {
            console.debug('ZendeskChat: setting legacy desktop notification');
            setStorage('ChatNotifications.Desktop', true);
        }

        // get settings
        enableDesktop = getStorageOrDefault('ChatNotifications.Desktop', false);
        enableLoop = getStorageOrDefault('ChatNotifications.Loop', false);
        alwaysOn = getStorageOrDefault('ChatNotifications.AlwaysOn', false);
        setAlwaysOn(alwaysOn);

        // add settings button
        if ($('#ZendeskChatNotificationsSettingsButton').length === 0) {
            var settingsButton = $('<a id="ZendeskChatNotificationsSettingsButton">Settings</a>');
            var header = $('#chat-header').children('span.dialer-title');
            var span = $('<span style="font-weight:normal;font-size:10px;margin-left:10px;"></span>');
            span.append(settingsButton);
            header.append(span);
            settingsButton.click(function () {
                console.debug('ZendeskChat: toggling settings');
                if (settingsDiv === null) {
                    settingsDiv = buildSettingsDiv();
                }

                var settingsInDom = $('#ZendeskChatNotificationsSettings');
                if (settingsInDom.length === 0) {
                    $('#chat-section').append(settingsDiv);
                } else {
                    settingsInDom.remove();
                }
            });
        }
    }
}

// check for notification support
if (window.hasOwnProperty('Notification')) {
    console.debug('ZendeskChat: notifications supported');
    window.setTimeout(findChat, 500);
} else {
    console.debug('ZendeskChat: notifications not supported');
}