// Jamendo Direct MP3 Download, a Greasemonkey user script
// Version 0.1 - August 7, 2009
// cloned by MeinDummy from Jamendo Direct Ogg Download
// Copyright 2007, 2008 Jordon Kalilich (http://www.theworldofstuff.com/)
// This program is free software: you may redistribute and/or modify
// it under the terms of the GNU GPL version 3 or any later version.
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Jamendo Direct MP3 Download
// @namespace      Jamendo
// @description    Rewrites Jamendo's album download links to point to the direct-download MP3 versions.
// @include        http://www.jamendo.com/en/album/*
// @include        http://www.jamendo.com/fr/album/*
// @include        http://www.jamendo.com/de/album/*
// @include        http://www.jamendo.com/it/album/*
// @include        http://www.jamendo.com/pl/album/*
// @include        http://www.jamendo.com/es/album/*
// @include        http://www.jamendo.com/ru/album/*
// @include        http://www.jamendo.com/br/album/*
// ==/UserScript==

// shout-outs to: http://www.jamendo.com/en/forums/discussion/3972/site-bug-josh-woodward-simple-life-tracks-21-22-not-available-ogg-playlist/

//updateNotifier();

var links = document.getElementsByTagName('a');
for (i = 0; i < links.length; i++) {
   if ( (links[i].href) && (/\/download\/album\/\d+$/i.test(links[i].href)) ) {
      var albumID = links[i].href.match(/\d+/);
      links[i].setAttribute('href', 'http://www.jamendo.com/get/album/id/album/archiverestricted/redirect/' + albumID);
      links[i].setAttribute('onclick', null);
   }
}

// UPDATE NOTIFIER (Version 12: June 19, 2008) (deactivated - currently, I have no web server available)
// Usage Information: http://www.theworldofstuff.com/greasemonkey/updatenotifier.html
//function updateNotifier() {
////      PARAMETERS       //
//var scriptName = "Jamendo Direct Ogg Download";
//var scriptURL = "http://userscripts.org/scripts/show/30982";
//var scriptVersion = 0.1;
//var updateURL = "http://www.theworldofstuff.com/greasemonkey/jamendoogg.txt";
//var updateInterval = 3600;
////   END OF PARAMETERS   //
//var checkForUpdates = GM_getValue('checkForUpdates', true);
//if (checkForUpdates == true) {
//var lastCheck = GM_getValue('lastCheck', 0);
//var d = new Date();
//var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
//if (currentTime >= lastCheck + updateInterval) {
//   GM_xmlhttpRequest({
//    method: 'GET',
//    url: updateURL,
//    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
//    onload: function(responseDetails) {
//      if (responseDetails.status == 200) {
//        var info = responseDetails.responseText;
//        function createNotice(noticeText) {
//           var notice = document.createElement('div');
//           with (notice.style) { id = 'GMscriptnotice'; position = 'fixed'; top = '0px'; left = '0px'; width = '100%'; background = '#ffeb7c'; zIndex = '50000'; textAlign = 'center'; font = '12px sans-serif'; fontWeight = 'normal'; color = '#000'; padding = '5px 3px 5px 3px'; margin = '0px'; borderTop = '0px'; borderRight = '0px'; borderBottom = '1px solid #beaf5d'; borderLeft = '0px'; }
//           notice.innerHTML = noticeText;
//           document.getElementsByTagName('body')[0].appendChild(notice);
//           if (document.getElementById('offLink')) {
//              document.getElementById('offLink').addEventListener('click', function(event) {
//                 event.stopPropagation();
//                 event.preventDefault();
//                 var confirmTurnOff = confirm('Are you sure you no longer want to be notified of updates to this script?');
//                 if (confirmTurnOff) {
//                    alert('You will no longer be notified of updates to ' + scriptName + '. You can change this preference in about:config.');
//                    GM_setValue('checkForUpdates', false);
//                    notice.parentNode.removeChild(notice);
//                 }
//              }, true);
//           }
//           if (document.getElementById('ignoreLink')) {
//              document.getElementById('ignoreLink').addEventListener('click', function(event) {
//                 event.stopPropagation();
//                 event.preventDefault();
//                 alert('You will not be notified until the script is updated again.');
//                 GM_setValue('ignoreVersionNumber', versionOnSite.toString());
//                 notice.parentNode.removeChild(notice);
//              }, true);
//           }
//           document.getElementById('closeLink').addEventListener('click', function(event) {
//              event.stopPropagation();
//              event.preventDefault();
//              notice.parentNode.removeChild(notice);
//           }, true);
//        }
//        var linkStyle = 'color: #00f; text-decoration: underline; font: 12px sans-serif';
//        if (info.match(/^[\d\.]+/)) {
//           var ignoreVersionNumber = parseFloat(GM_getValue('ignoreVersionNumber', '0'), 10);
//           var versionOnSite = info.match(/[\d\.]+/);
//           if (info.indexOf(';') > 0) {
//              scriptURL = info.split(";")[1];
//           } 
//           if ((versionOnSite > scriptVersion) && (versionOnSite > ignoreVersionNumber)) {
//              createNotice('An update to the Greasemonkey user script "' + scriptName + '" is available. You are using version ' + scriptVersion + '.<br /><a href="' + scriptURL + '" style="' + linkStyle + '; font-weight: bold" id="upgradeLink">Review changes and upgrade to version ' + versionOnSite + '</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="ignoreLink">Wait until next version</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="offLink">Turn off these notifications</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="closeLink">Close</a>');
//           }
//        }
//        else if (info.indexOf('-') == 0) { // if the script will no longer be maintained
//           GM_setValue('checkForUpdates', false);
//           if (info.indexOf(';') == 1) {
//              scriptURL = info.split(";")[1];
//              createNotice('The Greasemonkey user script "' + scriptName + '" will no longer be updated.<br /><a href="' + scriptURL + '" style="' + linkStyle + '; font-weight: bold" id="upgradeLink">More information</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="closeLink">Close</a>');
//           }
//        }
//      }
//    }
//   });
//   GM_setValue('lastCheck', currentTime);
//}
//}
//} // END OF UPDATE NOTIFIER
