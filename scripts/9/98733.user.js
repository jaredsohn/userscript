// ==UserScript==
// @name           xHamster
// @namespace      http://hamster.com
// @description    xHamster Downloader
// @include        *xhamster.com*
//
// Author: Adam Gardner
// v1.0 10th March 2011
//
// Note: If the download is slow it is due to your internet connection / xHamsters server // speed. Not this script.
// The video will ahve to load before the download box appears.
// TIP: Skip through the video until you're near the end, it seems to buffer & offer download link faster.
//
// Enjoy!
// ==/UserScript==

// Change [0] to whatever index is appropriate for the page ... the first script is 0, the second 1 and so on
var theJavascript = document.getElementsByTagName('script')[9].textContent;

// Find the flv hyperlink
// Note: At this point the String still contains the : ' characters
var patt1=": '(.+)\.(.+)\.flv";

hyperlink = theJavascript.match(patt1)[0];
// Split the string at the ' character
var unsplitFile = hyperlink.split("'")

// This returns file[1] as the link
// Store it in a new variable with the http:// added
file = "<h2><a href=http://xhamster.com/flv2/" + unsplitFile[1] +">Download Video</a>";

var myDiv = document.createElement('div');

// If you want to change the style or position of the download link box. Here's where you
// do it.
myDiv.setAttribute("style", "position:absolute; top: 1%; border:1px; background-color:#FF0000; color:#FFFFFF; layer-background-color:#FF0000; solid #000000; width:10%; height: 15%");

// End editable settings

myDiv.innerHTML = file;

document.body.appendChild(myDiv);