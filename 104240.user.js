// ==UserScript==
// @name          Add Voice Link to Google Toolbar
// @namespace     http://mattolenik.net/userscripts
// @description	  Add a link to Google Voice in the top toolbar for Google, Google+ and Google Apps
// @version	  1.1
// @include       https://*.google.com*
// @include       http://*.google.com*
// ==/UserScript==

function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

var toolbar = document.getElementsByClassName("gbtc")[0];
var firstLink = toolbar.getElementsByClassName("gbt")[0];
var voiceLink = document.createElement('li');
var innerHTML = '<a target="_blank" class="gbzt ';
// Add class for active link if the current page is Voice
if(document.location.href.substring(28, 0) == "https://www.google.com/voice") {
    innerHTML += 'gbz0l';
}
innerHTML += '" href="https://www.google.com/voice"><span class="gbtb2"></span><span class="gbts">Voice</span></a>';
voiceLink.setAttribute("class", "gbt");
voiceLink.innerHTML = innerHTML;
insertAfter(firstLink, voiceLink);