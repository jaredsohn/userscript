// ==UserScript==
// @name           [Facebook] I Don't Care Where People Are Loging In From
// @description    Get rid of the "WEB" and "MOBILE" next to people's names
// @version        0.1.2
// @date           11/19/2013
// @author         Jung Oh
// @namespace      facebook_idontcarewherepeopleareloginginfrom
// @include        https://www.facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://www.facebook.com/*
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// ==/UserScript==

var idontcarewherepeopleareloginginfrom_start = function() {
        var iconElements = document.getElementsByClassName("status icon img");
        for(var i = 0; i < iconElements.length; i++) {
            (iconElements[i].previousElementSibling).innerHTML = "";
        }
        setTimeout(idontcarewherepeopleareloginginfrom_start, 100);
    }

idontcarewherepeopleareloginginfrom_start();
