// ==UserScript==
// @name         Remove YouTube Managed By Alert
// @description  Removes the alert that an account is managed by a certain domain
// @version      0.2
// @include      http://www.youtube.com/*
// @author       Tryn Mirell
// @run-at       document-end
// @updateURL    https://userscripts.org/scripts/source/169936.meta.js
// @namespace    https://mirell.org
// ==/UserScript==

/*jslint browser:true*/

(function() {
    "use strict";
    var alerts, boxes, i, messages, message;

    alerts = document.getElementById('alerts');

    if (alerts) {
        boxes = alerts.getElementsByClassName('yt-alert-content');
    }

    if (boxes) {
        for (i = 0; i < boxes.length; i += 1) {
            messages = boxes[i].getElementsByClassName('yt-alert-message');
            if (messages[0]) {
                message = messages[0].innerHTML;
                if (message.search('This account is managed') !== -1) {
                    alerts.removeChild(messages[0].parentNode.parentNode);
                }
            }
        }
    }

}());