// ==UserScript==
// @name           Motherless Downloader
// @namespace      http://motherless.com
// @description    Enables One-Click Downloading of Motherless Videos
// @include        *motherless.com*
// By Adam Gardner
// V2
// Changelog
// v2
// Updated the search / find algorithm to make it faster.
// Improved placement of text link.
// ==/UserScript==

var theJavascript = document.getElementsByTagName('script')[12].textContent;

var patt1="http:\/\/(.+)\.(.+)\.flv";
var fileLink = theJavascript.match(patt1)[0];
var file = "<h2><a href=" + fileLink + ">Download Video</a></h2>";


var myDiv = document.createElement('div');

// If you want to change the position, colour or style of the box, this is the place to do it.

myDiv.setAttribute("style", "position:absolute; top: 0%; border:1px; background-color:#FF0000; layer-background-color:#FF0000; solid #000000; width:9.5%; height: 10%");

// End editable Settings
myDiv.innerHTML = file;

document.body.appendChild(myDiv);