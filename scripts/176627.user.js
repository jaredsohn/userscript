// ==UserScript==
// @name           YouTube: Hover Guide
// @version        1.1.2
// @namespace      Hpr222
// @description    Sets guide to open on mouse-over to the experimental layout
// @grant          none
// @downloadURL    http://userscripts.org/scripts/source/176627.user.js
// @updateURL      http://userscripts.org/scripts/source/176627.meta.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include        *.youtube.com*
// @run-at         document-end
// ==/UserScript==
$(window).load(hguide());
function hguide() {
$( "#guide" ).contents().css("width","180px");
$( "#guide" ).contents().css("padding","16px 1px 16px 5px");
var body = document.getElementById("body");
var frame = document.getElementById("appbar-guide-iframe-mask");
frame.setAttribute("class","");
    frame.setAttribute('style','left: 0px; width: 180px; padding: 16px 1px 16px 5px;');
jQuery(function( $ ){
	$( "#guide" ).contents().hover(
      function unhide(){
        body.setAttribute("class","ltr webkit webkit-537 exp-top-guide exp-appbar-autohide site-center-aligned exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-expanded ytcenter-branding-remove-banner ytcenter-branding-remove-background ytcenter-site-center ytcenter-remove-ads-page ytcenter-site-not-watch site-center-aligned ytcenter-branding-remove-banner ytcenter-branding-remove-background ytcenter-site-center ytcenter-remove-ads-page ytcenter-site-not-watch page-loaded show-guide");  
      },
      function hide(){
        body.setAttribute("class","ltr webkit webkit-537 exp-top-guide exp-appbar-autohide site-center-aligned exp-watch7-comment-ui hitchhiker-enabled guide-enabled guide-expanded ytcenter-branding-remove-banner ytcenter-branding-remove-background ytcenter-site-center ytcenter-remove-ads-page ytcenter-site-not-watch site-center-aligned ytcenter-branding-remove-banner ytcenter-branding-remove-background ytcenter-site-center ytcenter-remove-ads-page ytcenter-site-not-watch page-loaded");  
      }
	);
});
}