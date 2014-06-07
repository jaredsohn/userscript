// ==UserScript==
// @name       PHP Manual Improver
// @version    0.1
// @description  Make the PHP.net manual pages more readable and usable
// @match      http://www.php.net/manual/*
// ==/UserScript==

// Set the CSS rules for the new design
var css_styles = " "

+ ".refname"
+ "{"
+ "color: #336;"
+ "font-size: 1.4em;"
+ "font-family: monospace;"
+ "font-weight: bold;"
+ "}"

+ "h1.refname"
+ "{"
+ "font-size: 2em;"
+ "margin-bottom: 0.3em;"
+ "}"

+ ".docs p.verinfo"
+ "{"
+ "color: #777;"
+ "float: none;"
+ "margin: 0;"
+ "}"

+ ".docs em .parameter"
+ "{"
+ "font-weight: bold;"
+ "font-size: 1.4em;"
+ "}"

+ " ";


// Create a new style tag to hold the new css style changes
var style_element = document.createElement("style");
style_element.innerHTML = css_styles;

// Add the new style tag to the DOM's <HEAD> tag
var head_element = document.getElementsByTagName("head")[0];
head_element.appendChild(style_element);