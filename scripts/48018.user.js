// ==UserScript==
// @name	  GMail Without Ads!
// @namespace   http://fluidapp.com
// @version	  2.01
// @description	  GMail without ads, simple as it!
// @author	  Martijn Pieters - based on http://userscripts.org/scripts/show/37693
// @include	  http://mail.google.com/*
// @include	  https://mail.google.com/*
// @include	  http://*.mail.google.com/*
// @include	  https://*.mail.google.com/*
// ==/UserScript==


(function () {
    if (window.fluid) {
        var findHead = function() {
            var iframe = document.getElementById('canvas_frame');
            if (iframe === null) return; // wrong document
            var doc = iframe.contentDocument;
            var heads = doc !== false && doc.getElementsByTagName("head");
            if (heads.length) loadCSS(doc, heads[0]);
            else              setTimeout(findHead, 10);
        };
        var loadCSS = function(doc, head) {
            var css = "@namespace url(http://www.w3.org/1999/xhtml); /* QUICK LINKS*/ table.iY > tr > td:first-child + td > div { width: auto !important } table.iY > tr > td:first-child + td + td > div { width: 0 !important; position: relative !important; font-size: 85% !important; } table.iY > tr > td:first-child + td + td > div > div { position: absolute !important; right: 10px !important; top: -60px !important} table.iY div.hj { width: auto !important;} table.iY div.hj div.hk { display: inline !important; padding-right: 3px !important;} /* NO ADS! */ .u5, .u8 { display: none !important;} table[class=\"T1HY1 nH iY\"] { width: 100% !important;} div[class=\"ip iq\"] { margin-right: 13px !important;} textarea.ir { width: 100% !important;}";
            var node = doc.createElement("style");
            node.type = "text/css";
            node.appendChild(doc.createTextNode(css));
            head.appendChild(node); 
        };
        findHead();
    }
})();