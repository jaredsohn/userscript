// ==UserScript==
// @name        chatwork_alert
// @namespace   http://fluidapp.com
// @description Better ChatWork notification. Supports Growl and dock badge when running in Fluid.
// @include     https://www.chat-work.com/*
// @author      Marica Odagaki
// ==/UserScript==

// Released under the Simplified BSD License.
// https://github.com/ento/chatwork_alert/blob/1abbe8322490f5c1a08ca6ab9a4329f81a7eb429/chatwork_alert.user.js

function main() {
    var NORMAL_SECTION_HEADER_BG = "#769D03";
    var ALERT_SECTION_HEADER_BG = "#9D0303";
    var NORMAL_PAGE_HEADER_BG = "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#3F5A86), to(#243553))";
    var ALERT_PAGE_HEADER_BG = "-webkit-gradient(linear, 0% 0%, 0% 100%, from(#CB5454), to(#7D2F2F))";

    function updateAlert() {
        if (typeof RL == 'undefined') {
            return;
        }
        var sectionHeaderBackground = NORMAL_SECTION_HEADER_BG;
        var pageHeaderBackground = NORMAL_PAGE_HEADER_BG;
        var unreadCount = countNewMessages(RL.rooms)
        if (unreadCount > 0) {
            sectionHeaderBackground = ALERT_SECTION_HEADER_BG;
            pageHeaderBackground = ALERT_PAGE_HEADER_BG;
        }

        updateDockBadge(unreadCount);

        var currentBG = $(".tm_header_bg").css("background-image");
        currentBG = replaceRGBWithHex(currentBG);

        if(currentBG.toLowerCase() != pageHeaderBackground.toLowerCase()) {
            if (unreadCount > 0) {
                // rising edge: new message has just arrived
                showGrowlNotification("New message.");
            }
            // falling edge: no more new messages
            $(".tm_header_bg").css("background-image", pageHeaderBackground);
        }
    }
    function updateDockBadge(unreadCount) {
        if (window.fluid) {
            fluid.dockBadge = unreadCount > 0 ? unreadCount : null;
        }
    }
    function showGrowlNotification(description) {
        if (window.fluid) {
            fluid.showGrowlNotification({
		title: "ChatWork",
		description: description,
		priority: 0,
		sticky: false
            });
        }
    }
    function countNewMessages(rooms) {
        var count = 0
        for(var i in rooms) {
            count += rooms[i].getUnreadNum();
        }
        return count;
    }
    function replaceRGBWithHex(str) {
        return str.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, rgb2hex);
    }
    function rgb2hex(str, r, g, b, offset, s) {
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(r) + hex(g) + hex(b);
    }

    // do yer thang!
    window.updateAlertInterval = setInterval(updateAlert, 500);
}

// warp through Chrome's isolated world
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
