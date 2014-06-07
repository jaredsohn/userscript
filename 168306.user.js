// ==UserScript==
// @name       Ingen download på browse.php
// @namespace  https://nxtgn.org
// @version    1.0
// @description  Til ære for Primus den sure gamle mand.
// @match      http://nxtgn.org/browse.php*
// @match      https://nxtgn.org/browse.php*
// @copyright  2012+, You
// ==/UserScript==

/* Rediger download links */
var regex = new RegExp('<a class="index" href="', 'g');
var html=document.documentElement.innerHTML;
html = html.replace(regex, '<a class="index" style="display:none" id="');
regex = new RegExp('<td class="colhead" align="left">DL</td>', 'g');
html = html.replace(regex, '<td class="colhead" align="left"></td>');
document.documentElement.innerHTML=html;