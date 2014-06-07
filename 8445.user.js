// ==UserScript==
// @name           Facebook
// @namespace      Facebook
// @description    Fixes annoying layout
// @include        http://*.facebook.com/*
// @include        http://www.facebook.com/*
// @include	   https://*.facebook.com/*
// ==/UserScript==
// This will get rid of the stupid cutcorner look, change some colors, make the top nav full-height. Ahh, a normal layout again!
// HUGE THANKS to: Josh Booth, Tyler Collins, Josh Christopherson, Alan K, Praveen Markandu, and Joseph Hickman!
(function() {
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}
addGlobalStyle(
'* {' +
' font-family: lucida grande, tahoma, arial, helvetica !important;' +
'}' +
'body {' +
' margin-top: -13px;' +
'}' +
'#book {' +
' width: 795px' +
'}' +
'#sidebar {' +
' z-index: 11; width: 146px; background-image: url(http://static.ak.facebook.com/images/facebook_logo.gif); background-repeat: repeat-x; ' +
'}' +
'#sidebar a.go_home, #sidebar a.go_home:hover {' +
' margin-left: 7px; width: 125px; height: 26px; margin-right: 14px; background-color: #3b5998;' +
'}' +
'#sidebar_content {' +
' position: relative; top: 33px; border-left: 1px solid #ddd; padding: 2px 0px 6px;' +
'}' +
'#global_search_link {' +
' position: relative; top: -1px; left: -3px' +
'}' +
'#publicity {' +
' position: relative; top: 33px; padding: 12px 3px 16px 16px; background: #f7f7f7; border-left: 1px solid #ddd; border-bottom: 1px solid #ddd; height: auto; ' +
'}' +
'div.container a.link_title, #qsearch .search_arrow {' +
' position: relative; left: -2px' +
'}' +
'#navigator {' +
' background: transparent none repeat scroll 0%; background-color: #3b5998; height: 37px; width: 662px; margin: 0; padding: 9px 0 4px 0; z-index: 12; position: relative; left: -14px; border-bottom: 5px solid #6D84B4; border-right: 1px solid #e5e5e5;' +
'}' +
'.navigator_menu {' +
' width: 100%;' + 
'}' +
'.menu_divider {' +
' visibility: visible;' +
'}' +
'#nav_unused_1 {' +
' position: relative; top: 13px; left: 30px;' +
'}' +
'#nav_unused_2 {' +
' position: relative; top: 14px; left: 5px;' +
'}' +
'#nav_unused_2 li a, #nav_unused_3 li a, .secondary_set li a {' +
' text-transform: none !important;' +
'}' +
'.secondary_set {' +
' position: relative; top: 14px; left: 8px;' +
'}' + 
'#ssponsor {' +
' display: block; margin-top: 61px;' +
'}' +
'.under_login_tour {' +
' position: relative; top: 30px; padding: 0px 0px 16px 12px; background: #f7f7f7; border-left: 1px solid #ddd; border-bottom: 1px solid #ddd; ' +
'}' +
'.tour_button {' +
' border: 0px !important' +
'}');
})(); 
