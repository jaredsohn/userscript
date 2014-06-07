// ==UserScript==
// @name           Overrideable Default Colorsafe
// @namespace      http://userscripts.org/users/110369
// @include        *
// ==/UserScript==

//any time you want to override this style with another script, just
//include the following lines (obviously without the comments) at
//the end of that script:
/*
var userstyleFlagElement = document.createElement("a");
userstyleFlagElement.id="nodefaultstyle";
document.body.appendChild(userstyleFlagElement)
*/
//or you could just give the id to document.body directly, but that 
//might not be the best solution as it could break site scripts, or 
//be broken by them.

function failsafeCSS(){
    var defaultCSS='*{background-color:#000!important;color:#069!important}';
    if(!document.getElementById('nodefaultstyle'))GM_addStyle(defaultCSS);}

window.addEventListener('load',failsafeCSS,false);
