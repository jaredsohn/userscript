// ==UserScript==
// @name FB Ads Remover
// @version 0.0.5 ≋TGMW≋
// @description Remove FB advertising and expands the news feed.
// @copyright 2012 - Prince Loa
// @include http://www.facebook.*
// @include https://www.facebook.*
// ==/UserScript==

//Global Element To Ads
globelement = document.getElementById('globalContainer'); 
var removeAds = function(){
//Ads
document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden'; 
document.getElementById('pagelet_ego_pane').style.visibility = 'hidden'; 
document.getElementById('pagelet_reminders').style.visibility = 'hidden'; 
document.getElementById('pagelet_rhc_footer').style.visibility = 'hidden'; 
document.getElementById('rhcFooterBorder').style.visibility = 'hidden'; 
document.getElementById('rightCol').style.width = '0px'; 
document.getElementById('contentArea').style.width = '90%'; 
}
//Below function happens whenever the contents of 
//globelement change
globelement.addEventListener("DOMSubtreeModified", removeAds, true);
//fires off the function to start with
removeAds();