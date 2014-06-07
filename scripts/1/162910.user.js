// ==UserScript==
// @name        Netvibes reader list view - font, background
// @namespace   https://bitbucket.org/novakmi
// @author it.novakmi@gmail.com
// @description Change font and background color in Netvibes reader list view
// @include     http://www.netvibes.com/privatepage/*
// @version     0.3 Updated color of sidebar, extended width of article
// @version     0.2 Updated for new NV Reader
// @version     0.1 Initial 
// ==/UserScript==

var bcg = "#ECECCE";

// Function found at:
// http://www.techradar.com/news/internet/the-beginner%27s-guide-to-greasemonkey-scripting-598247/2
function addCss(cssString) { 
    var head = document.getElementsByTagName('head')[0]; 
    if (!head) return;
    var newCss = document.createElement('style'); 
    newCss.type = "text/css"; 
    newCss.innerHTML = cssString; 
    head.appendChild(newCss); 
} 

//Apply new CSS to list view elements
var cssString = 
"#smartreader-feeds-inner{background:" +bcg+ ";}" 
+ ".entry-row.autoclear{background:" +bcg + ";font-weight:bold;}" 
+ ".nv-treeview-row{background:#202020;foreground:black;}" 
+ ".nv-ir-feed-head{max-width:none;}"
+ ".nv-ir-article-text{max-width:none;}"
+ ".item-title{font-size:115%;font-weight:bold;}" 
;

addCss (cssString); 
