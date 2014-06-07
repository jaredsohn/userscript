// ==UserScript==
// @name           Feedly - Remove Ads
// @description    Block Ads in Feedly
// @version        0.2
// @author         Tryn Mirell
// @include        http://www.feedly.com/*
// @run-at         document-end
// @namespace      https://mirell.org
// @updateURL      https://userscripts.org/scripts/source/169942.meta.js
// ==/UserScript==

/*jslint browser:true*/

(function() {
    "use strict";
    var target, observer, ads, config;

    target = document.body;

    observer = new window.MutationObserver(function() {
        if (document.querySelector('#sideArea')) {
            ads = document.getElementById('sponsorsModule_part');
            if (ads) {
                ads.parentNode.removeChild(ads);
            }
        }
    });

    config = { attributes: true, childList: true, characterData: true };

    observer.observe(target, config);

}());