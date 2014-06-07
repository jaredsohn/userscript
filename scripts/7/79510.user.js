// ==UserScript==
// @name Reddit Comment Boxes for The Dark Reddit
// @namespace url(http://www.w3.org/1999/xhtml); 
// @description Modified version of kingping's "Reddit - Comment guide lines" (http://userstyles.org/styles/8804) 
// @author Tiby312 
// @include http://reddit.com/* 
// @include https://reddit.com/* 
// @include http://*.reddit.com/* 
// @include https://*.reddit.com/* 
// @run-at document-start 
// ==/UserScript== 
(function() { 
var border = "#444444";
var odd =  "#1E1E1E";
var even = "#242424";
var css =  "div[class=\"organic-listing\"] div, div.md, div[class=\"entry unvoted\"] { background-color:"+odd+" !important; }"+
".comment{"+ 
" -moz-border-radius:7px !important;"+ 
" -webkit-border-radius:7px !important;"+ 
" margin-left:10px!important;"+ 
" margin-right:310px!important;"+ 
" margin-top:0px!important;"+ 
" margin-bottom:8px!important;"+
" background-color:"+odd+" !important;"+ 
" border:1px solid "+border+" !important;"+ 
" padding-left:5px!important;"+ 
" padding-top:5px!important;"+ 
" padding-right:5px!important;"+ 
" padding-bottom:0px!important;"+ 
"}"+
".comment .child { border-left: none; }"+ 
".comment .comment{"+ 
" margin-right:0px!important;"+ 
" background-color:"+even+" !important;"+
"}"+ 
".comment .comment .entry{ background-color:"+even+" !important;}"+ 
".comment .comment .md{ background-color:"+even+" !important;}"+ 
".comment .comment .comment { background-color:"+odd+" !important;}"+ 
".comment .comment .comment .entry{ background-color:"+odd+" !important;}"+ 
".comment .comment .comment .md{ background-color:"+odd+" !important;}"+ 
".comment .comment .comment .comment{ background-color:"+even+" !important;}"+
".comment .comment .comment .comment .entry{ background-color:"+even+" !important;}"+ 
".comment .comment .comment .comment .md{ background-color:"+even+" !important;}"+ 
".comment .comment .comment .comment .comment{ background-color:"+odd+" !important;}"+ 
".comment .comment .comment .comment .comment .entry{ background-color:"+odd+" !important;}"+ 
".comment .comment .comment .comment .comment .md{ background-color:"+odd+" !important;}"+ 
".comment .comment .comment .comment .comment .comment{ background-color:"+even+" !important;}"+ 
".comment .comment .comment .comment .comment .comment .entry{ background-color:"+even+" !important;}"+ 
".comment .comment .comment .comment .comment .comment .md{ background-color:"+even+" !important;}"+ 
".comment .comment .comment .comment .comment .comment .comment{ background-color:"+odd+" !important;}"+ 
".comment .comment .comment .comment .comment .comment .comment .entry{ background-color:"+odd+" !important;}"+ 
".comment .comment .comment .comment .comment .comment .comment .md{ background-color:"+odd+" !important;}"+
"}";
if (typeof GM_addStyle != "undefined") {
GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
PRO_addStyle(css);
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
})();