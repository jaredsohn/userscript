// ==UserScript==
// @name           Unhide the Ignored Tags Hider
// @version        1.0.5
// @namespace      http://stackoverflow.com/users/390278
// @description    Unhides the 'hide ignored tags' checkbox from question views
// @include        http://stackoverflow.com/*
// @include        http://*.stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://*.superuser.com/*
// @include        http://serverfault.com/*
// @include        http://*.serverfault.com/*
// @include        http://stackapps.com/*
// @include        http://*.stackapps.com/*
// @include        http://askubuntu.com/*
// @include        http://*.askubuntu.com/*
// @include        http://*.stackexchange.com/*
// @updateURL      http://userscripts.org/scripts/source/102055.meta.js
// ==/UserScript==

(function() {
    var element = document.getElementById("hideIgnored");
    if (element) {
        var parent = element.parentNode;
        parent.className = parent.className.replace("dno", "");
    }
})();
