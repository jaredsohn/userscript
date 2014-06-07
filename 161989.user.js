// ==UserScript==
// @name           Khenzuro Ads
// @namespace      www.facebook.com/liang.mail
// @author         Khenzuro
// @description    Remove Ads from facebook.com. Created to work with
//                 language settings in either German, English, French
//                 or Mandarin Chinese.
// @license        BSD
// @version        2013
// @include        http://*.facebook.com/*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// ==/UserScript==

blacklist = [
    "Gesponsert",      // German
    "Sponsored",       // English
    "Lien commercial", // French
    "赞助链接",         // Mandarin Chinese
    "Sponsoreret",     // Danish
    "Anuncios",        // Spanish
    "Sponsorizzate",   // Italian
    "Sponsrade"        // Swedish
];

facebook_adblocker = function() {
    $("h4").each(function(index) {
        t = $(this).text();
        for (var i = 0; i < blacklist.length; i++) {
            if (blacklist[i] == t) {
                $(this).parent().parent().parent().parent().hide();
            }
        }
    });
    setTimeout(facebook_adblocker, 500);
}
facebook_adblocker()
