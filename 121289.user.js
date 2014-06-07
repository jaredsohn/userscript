// ==UserScript==
// @name          Remove Wikipedia begging
// @namespace     WikipediaBegging
// @version       0.0.2
// @date          2011-12-24
// @author        Vin2
// @description   This script removes the money begging banner on Wikipedia.
// @include       http*://*.wikipedia.*
// @include       http*://wikipedia.*
// ==/UserScript== 
window.addEventListener('load', function ()
{
    location.href = "javascript:void(hideBanner());";
    setTimeout("hideBanner()",500);
});
