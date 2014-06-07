// ==UserScript==
// @name           Customised Google
// @namespace      CustomisedGoogle
// @description    Stylish Google page
// @author		   Djouimai Sofiane
// @include        http://www.google.com/*
// @include        http://www.google.dz/*
// @include        https://www.google.com/*
// @include        https://www.google.dz/*
// @require		   //ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version        1.001
// ==/UserScript==
	
function addCss(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
$("head").append('');

addCss ('\
        body,#appbar,#hdtbSum{\
        background-color: rgb(241,241,241) !important;}\
        \
        body{\
        background-image: url("https://dl.dropboxusercontent.com/s/p6etesys4agpno9/d.jpg?dl=1&token_hash=AAHyoyfWe39OigpS-jYZUGxqFIBkFQK2BDvVmBtuYurJjg");\
        background-repeat:no-repeat;\
        background-position:bottom;\
        background-attachment:fixed;\
        }\
        .fbar,#appbar {\
        background:rgba(242, 242, 242,0)!important;}\
        \
        ' );