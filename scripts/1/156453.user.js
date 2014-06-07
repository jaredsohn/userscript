// ==UserScript==
// @name           Facebook Ad Remover
// @description    Removes annoying Facebook ads, and expands the newsfeed!
// @author         William Lewis
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @version        1.0
// ==/UserScript==

//Parent Element To Ads
grandparent = document.getElementById('globalContainer');
var removeAdz = function(){
//Ads
document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden';
document.getElementById('pagelet_reminders').style.visibility = 'show';
document.getElementById('pagelet_rhc_footer').style.visibility = 'hidden';
document.getElementById('rightCol').style.width = '35px';
document.getElementById('contentArea').style.width = '90%';
}
//Below function happens whenever the contents of
//grandparent change
grandparent.addEventListener("DOMSubtreeModified", removeAdz, true);
//fires off the function to start with
removeAdz();