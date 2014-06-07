// ==UserScript==
// @name           Wordpress No-Arial
// @author	   Chris <soulcore@gmail.com>
// @namespace      http://chrisjahn.de
// @description    Replaces the standard Arial with Fontstack: Lucida Grande, Droid Sans, Bitstream Vera Sans, Helvetica etc…
// @include        http://*/wp-admin*
// ==/UserScript==

(function () 
{
    var css = "@namespace url(http://www.w3.org/1999/xhtml); body, td, textarea, input, select {font-family: 'Lucida Grande', 'Droid Sans', 'Bitstream Vera Sans', Helvetica, Verdana, sans-serif !important;}";
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    }
    else if (typeof addStyle != "undefined") {
        addStyle(css);
    }
    else 
    {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) 
        {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
})();