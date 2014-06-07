// ==UserScript==
// @name           NoBGSOUND
// @description    Delete all the BGSOUND elements
// @include        *
// ==/UserScript==

if (document.getElementsByTagName("bgsound")) {
document.body.innerHTML+="<style>bgsound {display:none}</style>";
}