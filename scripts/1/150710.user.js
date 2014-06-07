// ==UserScript==
// @name           Xat Link Invalidator
// @author         Dr0ne
// @namespace      XatLinkInvalidator
// @version        1.2
// @include        http://linkvalidator.net/warn.php?p=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @require        http://www.webtoolkit.info/djs/webtoolkit.base64.js
// @downloadURL    http://userscripts.org/scripts/source/150710.user.js
// @updateURL      http://userscripts.org/scripts/source/150710.user.js
// ==/UserScript==    
document.body.innerHTML = "Xat Link Invalidator By Dr0ne<br/>You can find me at http://xat.com/TheSinned<br/>http://twitter.com/OfficialDr0ne";
var url = location.href;                       
var urlin = url.replace("http://linkvalidator.net/warn.php?p=","");
var urlout = Base64.decode(urlin);
if (confirm("Would you like to go here?: " + urlout)) {
    location.href = urlout;
} else { }