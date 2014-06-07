// ==UserScript==
// @name          Lycos banner remover
// @description   Removes the lycos banner from the top of Wired.com
// @include       http*://*wired.com*
// ==/UserScript==
var banner;
banner = document.getElementById("lycosHB");
if(banner)
{
banner.setAttribute('style', 'height: 0; margin: 0; padding: 0 0 0 0; border-width: 0 0 0 0; visibility:collapse;', 0)
}