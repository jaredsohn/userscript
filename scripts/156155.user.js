// ==UserScript==
// @name           Bing sidebar removal
// @namespace      msdn
// @include        http://www.bing.com/search*
// ==/UserScript==

(function()
{

    var styleElement = document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    styleElement.setAttribute("media", "screen");
    document.getElementsByTagName("head")[0].appendChild(styleElement);

    function addCssRule(rule)
    {
        styleElement.appendChild(document.createTextNode(rule));
    }

    addCssRule("#id_h { display: none !important; }");
    addCssRule("#spcv { display: none !important; }");

    // var s1 = document.getElementById("id_h");
    // if (s1) s1.parentNode.removeChild(s1);

    // var s2 = document.getElementById("spcv");
    // if (s2) s2.parentNode.removeChild(s2);

    document.getElementsByTagName("body")[0].style.minWidth = "auto";

})();