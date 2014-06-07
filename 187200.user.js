// ==UserScript==
// @name           Open all external links in new tab
// @author         Ahmed brikaa
// @namespace      http://sharepages.ml/p
// @description    Open all external links in new tab
// @version        1.0
// @include        http*://*
// @include        https*://*
// @license        Creative Commons Attributive Share-Alike 3.0
// ==/UserScript==


// JSON parser - jQuery plugin written by Mark Gibson 
// http://jollytoad.googlepages.com/json.js
// $.toJSON(value);
// $.parseJSON(json_str, [safe]);
function externalLinks()
{
if (!document.getElementsByTagName) return;
var anchors = document.getElementsByTagName("a");
for (var i=0; i<anchors.length; i++)
{
var anchor = anchors[i];
if(anchor.getAttribute("href"))
anchor.target = "_blank";
}
}
window.onload = externalLinks;