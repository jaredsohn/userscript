// ==UserScript==
// @name           Facebook Ad Remover
// @description    Removes annoying Facebook ads everywhere and expands viewing area, works with apps
// @author         Caleb Jardine, modified from Rohit Mewada script
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @grant          metadata
// @version        1.0
// ==/UserScript==

//Parent Element To Ads
grandparent = document.getElementById('globalContainer'); 
var removeAdz = function(){
//Ads
if(document.getElementById('pagelet_ego_pane_w'))
    document.getElementById('pagelet_ego_pane_w').style.visibility = 'hidden';
if(document.getElementById('pagelet_reminders'))
    document.getElementById('pagelet_reminders').style.visibility = 'hidden'; 
if(document.getElementById('pagelet_rhc_footer'))
    document.getElementById('pagelet_rhc_footer').style.visibility = 'hidden';
if(document.getElementById('pagelet_canvas_storybox'))
    document.getElementById('pagelet_canvas_storybox').style.visibility = 'hidden'; 
if(document.getElementById('pagelet_canvas_footer_content'))
    document.getElementById('pagelet_canvas_footer_content').style.visibility = 'hidden'; 
if(document.getElementById('pagelet_canvas_developer_upsell'))
    document.getElementById('pagelet_canvas_developer_upsell').style.visibility = 'hidden'; 

document.getElementById('globalContainer').style.paddingRight = '0px'; 
document.getElementById('rightCol').style.width = '0px'; 
document.getElementById('rightCol').style.visibility = 'hidden';
//document.getElementById('contentArea').style.width = '90%'; 
}
//Below function happens whenever the contents of 
//grandparent change
grandparent.addEventListener("DOMSubtreeModified", removeAdz, true);
//fires off the function to start with
removeAdz();
