// ==UserScript==
// @name           userInfo in tabs
// @namespace      uiit@kwierso.com
// @description    Open all userInfo links in a new tab!
// @include        http://*.roosterteeth.com/*
// @include        https://*.roosterteeth.com/*
// ==/UserScript==

(function() {
    var userInfoLinks = document.getElementById("userInfo").getElementsByTagName("a");
    for(var i in userInfoLinks) {
        userInfoLinks[i].target = "_blank";
    }
})();