// ==UserScript==
// @name       linxcrypt.com Foo hax0r
// @namespace  linxcrypt
// @version    0.2
// @description  Removes fake-Button; Replaces Links of Buttons to direct-Links, without Ad-Layer; Removed some on*-Handler
// @match      http://linxcrypt.com/?id=*
// @copyright  2013+, Michael Nowak
// ==/UserScript==

var $ = unsafeWindow.jQuery.noConflict(true);

$(document).ready(function() {
    $("div.button").remove();
    
    $("a.button").each(function() {
        var link = $(this);
        var href = link.attr("href");
        if (href.indexOf("http") != href.lastIndexOf("http")) {
            var href_real = href.slice(href.lastIndexOf("http"));
            link.attr("href", href_real);
        };
    });
    
    $("body").get(0).onload = null;
    $("body").get(0).onunload = null;
    $("body").get(0).onclick = null;
});