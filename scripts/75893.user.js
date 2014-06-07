// ==UserScript==
// vim: ft=javascript ts=2 sw=2 expandtab
// @name          Jason's GMail Essentials
// @version       3.0
// @description   my essential features that gmail cannot provide 
// @author        Jason
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http*://*.google.com/*
// @include       http*://mail.google.com/*
// @include       http*://gmail.google.com/*
// @include       http*://*.mail.google.com/*
// @include       http*://*.gmail.google.com/*
// ==/UserScript==
// Change Log:
// Enable mono fonts for plain texts
// unnecessary features are deleted to avoid confliction (2010-08-11)


(function() {
   var css = "@namespace url(http://www.w3.org/1999/xhtml);";
   // ADJUST TITLE AND LABELS 
   css += "div.if h1.ha {line-height: 20px !important; margin-top: 30px !important; margin-left: 12px !important; position: relative !important } "
   // QUICK LINKS (NEW WINDOW, PRINT ALL, ETC.) IN A ROW 
   css += "table.iY > tr > td:first-child + td > div { width: auto !important } table.iY > tr > td:first-child + td + td > div { width: 0 !important; position: relative !important } table.iY > tr > td:first-child + td + td > div > div { position: absolute !important; right: 10px !important; top: 7px !important} ";
   // QUICK LINKS as buttons
   css += "table.iY div.hj { width: auto !important;} table.iY div.hj div.hk { display: inline !important; padding-right: 1px !important;} table.iY div.hj div.hk span { padding: 3px 8px !important; border: 1px solid #C0C0C0 !important;} .hk span {background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAoCAAAAAAa3c+rAAAAAXNSR0IArs4c6QAAABJJREFUCNdj+MnEQBT8CsUEIACgKQMyxVIz6AAAAABJRU5ErkJggg==) repeat-x left center !important; color: #000000 !important; } .hk:first-child span {-moz-border-radius-topleft: 2px !important; -moz-border-radius-bottomleft: 2px !important; border-left-color: #BBBBBB !important; } .hk:last-child span {-moz-border-radius-topright: 2px !important; -moz-border-radius-bottomright: 2px !important;} .hk u {text-decoration: none !important; } .hk img {margin-bottom: 2px !important; } ";

   // QUICK LINKS HOVERING EFFECT 
   css += "table.iY div.hj div.hk span:hover { border-top-color: #939393 !important; border-bottom-color: #939393 !important;} table.iY div.hj div.hk:first-child span:hover {border-left-color: #939393 !important;} table.iY div.hj div.hk:last-child span:hover {border-right-color: #939393 !important;} ";
   // QUICK LINKS ACTIVE 
   css += ".hk span:active { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAoCAAAAAAa3c+rAAAAAXNSR0IArs4c6QAAABVJREFUCNdjeMzEQDTkZmJg+IlfDQBx9QI0/iX6wgAAAABJRU5ErkJggg==) !important; border-top-color: #444444 !important; border-bottom-color: #444444 !important; } .hk:first-child span:active { border-left-color: #444444 !important; } .hk:last-child span:active { border-right-color: #444444 !important; } ";

   // DEFAULTS FOR ALL LINKS
   css += "a:link, a:visited, .link { text-decoration: none !important;} a:active, .link:active { color: #92CDFF !important;text-decoration: none !important;} ";
   // added by Jason.sun.hk to remove the underlines
//   css += " .CJ, .p9 { text-decoration: none !important;} ";
   // BLOCK THE ADS TABLE IN THE MESSAGE WINDOW 
   css += ".u5, .u8 { display: none !important } table[class=\"T1HY1 nH iY\"] { width: 100% !important } div[class=\"ip iq\"] { margin-right: 13px !important} textarea.ir { width: 100% !important } ";

   if (typeof GM_addStyle != "undefined") {
     GM_addStyle(css);
   } else if (typeof addStyle != "undefined") {
     addStyle(css);
   } else {
     var heads = document.getElementsByTagName("head");
     if (heads.length > 0) {
       var node = document.createElement("style");
       node.type = "text/css";
       node.appendChild(document.createTextNode(css));
       heads[0].appendChild(node); 
     }
   }
})()


//monospace text font
(function () {
 var s_monoplaintext_font = "div.ii, div.At, div.gt, textarea.Ak, textarea.dV { font-family: monospace !important; font-size: 13px !important; }";
 var heads  = document.getElementsByTagName("head");
 if (heads.length > 0) 
 {
   var node = document.createElement("style");
   node.type = "text/css";
   node.appendChild(document.createTextNode(s_monoplaintext_font ));
   heads[0].appendChild(node); 
 }
 }) ();
