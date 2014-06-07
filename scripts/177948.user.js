// ==UserScript==
// @name       Protect-url.net links cleaner
// @namespace  http://pragmasphere.com/
// @version    0.1
// @description Replace Protect-url.net javascript links into real HTML links for better integration with download managers.
// @match      http://protect-url.net/linkid.php
// @copyright  2013, Toilal
// @homepage	  http://userscripts.org/scripts/show/177948
// @updateURL	  https://userscripts.org/scripts/source/177948.meta.js
// @downloadURL	  https://userscripts.org/scripts/source/177948.user.js
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var links = $("span[onmouseup*='monhtsec(']");
links.each(function() {
    var linkJs = $(this).attr("onmouseup");
    linkJs = linkJs.substring(10, linkJs.length - 10 - 2);
    $(this).replaceWith("<a href='http://" + linkJs + "'>" + linkJs + "</a>");
});