// ==UserScript==
// @name Yahoo Neo Mail minimalist cleanup.
// @description Clean up the new Yahoo Mail to maximize the viewing space.
// @namespace
// @include http://*.mail.yahoo.com/neo/*
// @include https://*.mail.yahoo.com/neo/*
// @match http://*.mail.yahoo.com/neo/*
// @match https://*.mail.yahoo.com/neo/*
// @author Razvan aurariu
// @version 1.0
// @date 2011-06-13
// ==/UserScript==

(function () {
document.getElementById("theAd").style.display="none";
document.getElementById("slot_LREC").style.display="none";

document.styleSheets[document.styleSheets.length -1].insertRule("#uh h1 { display:none;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh .upsell { display:none ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh div.right { right:13% ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh .links { right:-145px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#uh #search { margin-top:0px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".nav-bar { top:40px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll #main { top:70px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll #shellnavigation { top:105px ;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll #shellcontent { top:105px;right:0px;}", 0);
document.styleSheets[document.styleSheets.length -1].insertRule(".panescroll .withouttoolbar #shellcontent { top:70px;}", 0);

})();
