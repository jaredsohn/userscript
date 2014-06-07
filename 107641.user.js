// ==UserScript==
// @name           Facebook chat - Hide offline 
// @namespace      http://userscripts.org
// @description    "shows" online &  "Hides" offline friends !! Howzzat!!
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==
function addStyle(css) {
    var divnode=document.createElement('div');
    divnode.setAttribute('id','something1');
    var stylestring="<style type=text/css>"+css+"</style>";
    document.body.appendChild(divnode);
    document.getElementById('something1').innerHTML=stylestring;
}
addStyle('.item{ display:none;}.active,.idle{display:inline;}');