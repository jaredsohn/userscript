// ==UserScript==
// @name       Faces on Google The Fucker
// @namespace  http://aycabta.github.io/
// @version    0.1
// @description  Erase fucking Google icons in search results
// @include    /https?:\/\/www.google\.[^\/]+\/search.+/
// @copyright  2013+, Code Ass
// ==/UserScript==

(function() {
    
    var i;
    var sucks = document.getElementsByClassName("thb"); // icons
    for (i = 0; i < sucks.length; i++) {
        var suck = sucks[i];
        var shits = suck.parentNode.parentNode.childNodes;
        for (var j = 0; j < shits.length; j++) {
            var shit = shits[j];
            if (shit.tagName == "DIV") {
                var styleAttribute = shit.getAttribute("style");
                if (styleAttribute != null && styleAttribute.match(/^margin-left/)) {
                    shit.removeAttribute("style");
                }
            }
        }
    }

    var style = document.createElement('style');
    style.type = "text/css";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
    
    var sheet = style.sheet;
    sheet.insertRule('.thb { display: none; }', sheet.cssRules.length);
    sheet.insertRule('.f { display: none; }', sheet.cssRules.length);
    sheet.insertRule('.kv { display: block; }', sheet.cssRules.length);
})();
