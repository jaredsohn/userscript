// ==UserScript==

// @name          Clearcookie

// @namespace     http://superted.me

// @description   A basic example of Greasemonkey that causes an alert at each page load.

// @include       *

// ==/UserScript==




var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        console.log(cookie);
    }