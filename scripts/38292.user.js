// De-sidebar Facebook
// 
// version 1.2
// 2010-02-04 by tony
// A few tweaks to remove new sidebar ads after facebook redesign.
//
// ==UserScript==
// @name           De-sidebar Facebook
// @description    Hides sidebar ads in Facebook
// @include        http://*.facebook.com/*
// ==/UserScript==

//hides the sidebar in the profile page
GM_addStyle('#sidebar_ads { visibility:hidden !important }');

//removes on the home section: the sidebar sponsor area and the sponsored feeds	
GM_addStyle('.social_ad, .sponsor, .emu_sponsor { display:none !important }');	

// removes Suggestions and Sponsored sidebar on sub pages
GM_addStyle('#ego { visibility:hidden !important }');
GM_addStyle('#home_sponsor_nile { display:none !important }');
