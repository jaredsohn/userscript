// XDEBUG_SESSION_START helper
// version 0.1 BETA!
// 2012-05-07
// Released under the GPL License
// http://www.gnu.org/copyleft/gpl.html
// 
//
// ==UserScript==
// @name         XDEBUG_SESSION_START helper
// @namespace    https://github.com/brookhong/DBGPavim
// @description  To place a link at left top corner to add XDEBUG_SESSION_START=1 to current URL 
// @include *
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*
// ==/UserScript==

(function() {
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    function checkStatus() {
        if(document.cookie.indexOf("XDEBUG_SESSION=") == -1) {
            div.style.background = "#f00";
            div.innerHTML = "XSS-0";
        }
        else {
            div.style.background = "#0f0";
            div.innerHTML = "XSS-1";
        }
    }

    div = document.createElement("div");
    div.id = "divDBGPavim";
    div.style.cssText = "border:2px solid #ccc;border-radius:5px;position:absolute;z-index:1996;top:0;padding:0px 5px 0px 5px;cursor:pointer;display:block;font-size:12px;";
    document.getElementsByTagName("body")[0].appendChild(div); 
    div.onclick = function () {
        if(document.cookie.indexOf("XDEBUG_SESSION=") == -1) {
            createCookie("XDEBUG_SESSION", "1", 1);
        }
        else {
            eraseCookie("XDEBUG_SESSION");
        }
        checkStatus();
    }
    checkStatus();
    setInterval(checkStatus,60000);

    s = window.location.href;
    if  (! /.*XDEBUG_SESSION_START=1.*/i.test(s)) {
        i = s.indexOf("?");
        if ( i == -1) {
            s += "?XDEBUG_SESSION_START=1";
        }
        else {
            s = s.substr(0,i)+"?XDEBUG_SESSION_START=1&"+s.substr(i+1);
        }
    }
})();
