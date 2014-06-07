// ==UserScript==
// @name         Block / Hide Ads & Shopping Results on Google SERPs
// @version      v1.2
// @changelog    v1.2 Added more div - thanks to http://userscripts.org/users/212988
// @changelog    v1.1 Added div tag for shopping results
// @description  
// 
// Want to get rid of advertisements on Google SERPs (search engine results pages)?
// 
// This script will set the visibility of the top and the right ad block on all Google
// result pages to 'hidden'. That way you browse Google "ad-free". Works on all TLDs.
// 
// If you like it, i appreciate a positive feedback (http://userscripts.org/scripts/reviews/78246) 
// so others know it works. Thanks! 
// Any Poblems using it? Also leave a comment (http://userscripts.org/scripts/issues/78246)
// and i'll try to help.

// 
// Enjoy your ad-free Google-experience!
// 
// @author       Stephan Schmitz - code.eyecatch-up.de 
// @namespace    http://userscripts.org/scripts/show/78246 
// @include      http*://*google.*
// ==/UserScript== 

function Hide_Ads_On_Google_Serps() {

    var top_ads = document.getElementById('tads');
    if (top_ads && top_ads.style.display != 'none') {
        top_ads.style.display = 'none';
    }
    
    var sidebar_ads = document.getElementById('rhs');
    if (sidebar_ads && sidebar_ads.style.visibility != 'hidden') {
        sidebar_ads.style.visibility = 'hidden';
    }
    
    var shopping_results = document.getElementById('productbox');
    if (shopping_results && shopping_results.style.display != 'none') {
        shopping_results.style.display = 'none';
    }

    var bot_ads = document.getElementById('ads-bot');
    if (bot_ads && bot_ads.style.display != 'none') {
    bot_ads.style.display = 'none';
    }

    var newtop_ads = document.getElementById('ads-top');
    if (newtop_ads && newtop_ads.style.display != 'none') {
    newtop_ads.style.display = 'none';
    }
}

document.addEventListener("DOMNodeInserted", Hide_Ads_On_Google_Serps, true);