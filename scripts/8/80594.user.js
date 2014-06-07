// ==UserScript==
// @name           Facebook Dislike Button Adremover
// @description    Removes additinonal ad boxes display when using 
//                 the dislike-button.com firefox plugin
// 
// @author         Stephan Schmitz - code.eyecatch-up.de
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/80594
// @include        http://www.facebook.com/*
// ==/UserScript==

function dislike_button_without_ads() {    
    var ads = document.getElementById('Ad');
    if (ads && ads.style.display != 'none') { 
        ads.style.display = 'none';  
    }
}
document.addEventListener("DOMNodeInserted", dislike_button_without_ads, true);