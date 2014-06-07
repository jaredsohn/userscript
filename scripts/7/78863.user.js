// ==UserScript==
// @name           Facebook Hide Recommended
// @namespace      Facebook
// @description    Hides the recommended friends and pages section
// @include        http://www.facebook.com/*
// ==/UserScript==

function NoRecommend() {

var sidebar_ads_groups = document.getElementById('ego');
    if (sidebar_ads_groups && sidebar_ads_groups.style.visibility != 'hidden') { 
        sidebar_ads_groups.style.visibility = 'hidden';  
    }

}

document.addEventListener("DOMNodeInserted", NoRecommend, true);