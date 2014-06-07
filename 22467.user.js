// ==UserScript==
// @name           Horde Webmail HTML Inline Display
// @description    Display HTML messages inline in the Horde webmail application
// @include        https://*/horde/imp/message.php*
// ==/UserScript==
//
// Copyright (c) 2008, Matthew Botos (http://matthewbotos.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

var body = document.getElementById("messageBody");

if (body != null) {
   // find mime link if text part is displayed
   var allLinks = document.evaluate(
       '//table[@class="mimeStatusMessage"]',
       document,
       null,
       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
       null);

   // alternate if no text part of message
   if (allLinks.snapshotLength == 0) {
        allLinks = document.evaluate(
           'table',
           body,
           null,
           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
           null);
   }

   // display the first text/html part of message
   for (var i = 0; i < allLinks.snapshotLength; i++) {
       var thisLink = allLinks.snapshotItem(i);

       if (thisLink.innerHTML.indexOf("text/html") > -1) {
           var href = thisLink.innerHTML.replace(/n/g, ''); // single line for regexp
           href = href.replace(/^.*href=.(/horde[^ ]*named).*$/m, '$1'); // get link
           href = href.replace(/&amp;/g, '&'); // decode &
           href = window.location.protocol + '//' + window.location.host + href; // complete link

           GM_xmlhttpRequest({
               method: 'GET',
               url: href,
               onload: function(responseDetails) {
                   var innerText = responseDetails.responseText.replace(/n/g, ''); // single line for regexp
                   innerText = innerText.replace(/^.*<body[^>]*>(<.*>)</body.*$/i, '$1'); // strip html page markup
                   innerText = innerText.replace(/<a /gi, '<a target="_blank" '); // open links in new window instead of current frameset
                   body.innerHTML = innerText;
                   body.style.background = 'white';
                   body.style.margin = '.5em';
               }
           });

           break;
       }
   }
}
