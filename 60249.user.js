// Invisible Facebook Sidebar Ads
// Version 0.1
// 10/20/09
 
// ==UserScript==
// @name           Invisible Facebook Sidebar Ad's
// @version 	   0.1
// @namespace      
// @description    Make the Ad's on the right side of Facebook go away.
// @include        http://*facebook.com*
// ==/UserScript==


function hide(){
    document.getElementById('sidebar_ads').setStyle({display:'none'});
    document.getElementById('pagelet_adbox').setStyle({display:'none'});
}

window.onLoad = hide();