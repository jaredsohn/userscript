// ==UserScript==
// @name        No Yandex Ads
// @namespace   lainverse_no_yandex_ads
// @version     3.2
// @description Removes ads in Yandex search results.
// @match       http://*/yandsearch?*
// @match       https://*/yandsearch?*
// @copyright   2014+, lainverse
// ==/UserScript==

(function(s){
    for (var l = 0; l < s.length; l++) s[l].style.cssText = 'display:none';
})(document.querySelectorAll('.serp-adv,.b-spec-adv'));

function removeAds() {
    var s = document.querySelectorAll('.serp-block,.b-serp-item');
    for (var l = 0; l < s.length; l++)
        if (!(getComputedStyle(s[l]).backgroundColor in {'rgba(0, 0, 0, 0)':1, 'transparent':1}))
            s[l].style.cssText = 'display:none';
}

(function(s){
    if (s) (new MutationObserver(removeAds)).observe(s,{childList:true});
})(document.querySelector('.main,.b-page-layout'));

removeAds();
