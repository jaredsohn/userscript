// ==UserScript==
// @name           Instrucables Cleaner
// @namespace      http://userscripts.org/users/80594
// @description    Cleans up the instructables project pages, removes ads, comments, and extra javascript files.
// @include        http://www.instructables.com/*
// ==/UserScript==

GM_addStyle('
    #newrightbar_div_10{display:none!important;}
    #newrightbar_div_1{display:none!important;}
    #google_ads_div_play_med_rectangle{display:none!important;}
    #related_content{display:none!important;}
    .contents{display:none!important;}
    .adwrapper{display:none!important;}
    .aspace{display:none!important;}
');