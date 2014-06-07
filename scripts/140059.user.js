// ==UserScript==
// @name        sjlc_custom_label
// @namespace   http://userscripts.org/users/479402
// @description adds logo, crew number, and allergies
// @include     https://purpledoorchurch.ccbchurch.com/checkin_family_detail.php*
// @version     1
// ==/UserScript==

// ***fuction to apply custom css***
function addStyle(css) {
varhead=document.getElementsByTagName('head')[0];
varstyle=document.createElement('style');
style.type='text/css';
style.innerHTML=css;
head.appendChild(style); 
}

// ***custom css for the name label***
addStyle('#print-content-only table {background-image:url("http://dl.dropbox.com/u/5991781/sjlc_scripts/sjlc_small_monochrome_logo.jpg"); background-repeat:no-repeat; background-position:center right;} #print-content-only td {font-family:Candara; line-height:1.25;} .code {font-family:"Museo Sans" !important;}');