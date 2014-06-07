// ==UserScript==
// @name           Notification Threader
// @namespace      Bluestone
// @description    Threads Facebook notifications so that notifications from the same source appear as a single entry in the drop-down list.
// @version        1.0
// @include        http*://facebook.com/*
// @include        http*://facebook.com
// @include        http*://facebook.com?*
// @include        http*://facebook.com#*
// @include        http*://*.facebook.com/*
// @include        http*://*.facebook.com
// @include        http*://*.facebook.com?*
// @include        http*://*.facebook.com#*
// ==/UserScript==

var $;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    
    // This function returns an array of names from the text of a FB notification
    // It parses a consecutive set of capitalized words at the start of a string
    // The word "and" is parsed out
    function explodeNames(text){
        var name = "";
        var names = new Array();
        for (i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            // We know commas are our thing
            if (c == ",") {
                i++; // Skip the following space
                names.push(name);
                name = "";
            // If there's a space, either it's the same name, a new name, or we're done
            } else if (c == " ") {
                var d = text.charAt(i + 1);
                if (d != d.toUpperCase()) {
                    // Is it an "and"?
                    if (text.substring(i + 1, 3) == "and") {
                        i += 4;
                    // We're done
                    } else {
                        names.push(name);
                        break;
                    } 
                } else {
                    name += " ";
                }
            } else {
                name += c;
            }
        }
        return names;
    }
    
    // Turn an array of names into a English list of names
    function implodeNames(names) {
        if (names.length == 0) {
            return "";
        } else if (names.length == 1) {
            return names[0];
        } else if (names.length == 2) {
            return (names[0] + " and " + names[1]);
        }
        var returnString = "";
        var i = 0;
        for (; i < (names.length - 1); i++) {
            returnString += names[i] + ", ";
        }
        returnString += "and " + names[i];
        return returnString; 
    }
    
    // Strip duplicates
    function uniqueArray(names) {
        var returnArray = new Array(); 
        for (i = 0; i < names.length; i++) {
            var alreadyOccurred = false;
            for (j = 0; j < i; j++) {
                if (names[i] == names[j]) {
                    alreadyOccurred = true;
                    break;
                }
            }
            if (!alreadyOccurred) returnArray.push(names[i]); 
        }
        return returnArray;
    }
    
    // On click of the button, wait a little bit and then run a function
    $('a.jewelToggler').click(function () {
        setTimeout(onNotificationLoad, 2000)
    });
    
    // Run this when the notification button is pressed
    function onNotificationLoad() {   
        // Deconstruct old notifications
        var notifications = {};
        $("li.notification").each(function() {
            var item = $(this);
            var alreadyExists = false;
            var url = item.find("a").first().attr("href");
            $.each(notifications, function(k, v) {
                if (url == k) {
                    alreadyExists = true;
                    // break equivalent
                    return false;
                }
            });
            var text = item.find("div.info").first().children().first().text();
            var names = explodeNames(text);
            if (alreadyExists) {
                var notification = notifications[url];
                $.each(names, function(i, n) { notification.people.push(n) });
                item.remove();
            } else {
                var notification = new Object();
                notification.people = new Array();
                $.each(names, function(i, n) { notification.people.push(n) });
                notification.li = item.detach();
                notification.li.html(notification.li.html().replace(implodeNames(names), "[NAME]"));
                notifications[url] = notification;
            }
        });
        
        // Reconstruct new notifications
        var list = $("ul#jewelNotifs").first();
        $.each(notifications, function(k, notification) {
            notification.li.html(notification.li.html().replace("[NAME]", implodeNames(uniqueArray(notification.people))));
            list.append(notification.li);
        });
    }
    
}
