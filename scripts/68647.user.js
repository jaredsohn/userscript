// ==UserScript==
// @name           Tahoma font in Wordpress.com editor
// @author         MFiRE <dr.mfire@gmail.com> 
// @namespace      http://mfire.wordpress.com
// @include        http://*.wordpress.com/*
// ==/UserScript==
(function () 
{
    var css = "@namespace url(http://www.w3.org/1999/xhtml); #tinymce, textarea#content, textarea#comment {font-family: tahoma !important; font-size:12px !important;  line-height: 140% !important;}";
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
