// ==UserScript==
// @name           BabyCenter - Simple
// @namespace      http://userscripts.org/users/47920
// @description    Removes almost all features and ads from BabyCenter.com
// @include        http://*.babycenter.com/*
// ==/UserScript==

// Crap on front page.
removeContent('undefined');
removeContent('adslice');
removeContent('siteMoreTab');
removeContent('siteBoardsTab');
removeContent('siteProductsTab');
removeContent('siteVideoTab');
removeContent('siteArticlesTab');
removeContent('siteSearchTab');
removeContent('topRated_a1ae1de8_f0ea_4b9c_a195_5e8c1a4fe090');
removeContent('leftcolumn_sponsors_container');
removeContent('mboxImported-bc20_leftrail_top_promo');
removeContent('leaderboard_ad');
removeContent('leaderboard_ad_iframe');
removeContent('leaderboard_footer_iframe');

// Crap on sub pages
removeContent('google_5471d50d_207f_4af7_b13d_f79ac63e54d7');
removeContent('freeStuff_40755718_0e9f_450e_ba63_c1d0e8e4a0b9');
removeContent('interactiveRight_13c31c90_6f7f_40c6_a5ab_644227f8048c');
removeContent('mboxImported-bc20_rightrail_promo');
removeContent('medium_rectangle_ad');
removeContent('medium_rectangle_ad_iframe');
removeContent('rcol_content_block');
removeContent('miniFyf');

//******************************************************************************
// Will remove the child of the element of the object you pass
//******************************************************************************
function removeContent(id) {
   var node = document.getElementById(id);
   
   if (node) {
       node.parentNode.removeChild(node);
       node = null;
   }
}