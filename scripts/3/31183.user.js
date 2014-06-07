// ==UserScript==
// @name           Overheard No Italics in Titles
// @version        0.1
// @date           2008-08-05
// @description    Removes the italics from the headlines on the Overheard web sites.
// @namespace      http://www.theworldofstuff.com/greasemonkey/
// @copyright      Copyright 2007, 2008 Jordon Kalilich (http://www.theworldofstuff.com/)
// @license        GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.overheardinnewyork.com/*
// @include        http://www.overheardintheoffice.com/*
// @include        http://www.overheardatthebeach.com/*
// @include        http://www.overheardeverywhere.com/*
// @include        http://www.celebritywit.com/*
// ==/UserScript==

var h3s = document.evaluate("//h3[@class='title']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < h3s.snapshotLength; i++) {
   h3s.snapshotItem(i).innerHTML = h3s.snapshotItem(i).innerHTML.replace(/<\/?(i|em)>/gi,'');
}

updateNotifier();

// UPDATE NOTIFIER (Version 12: June 19, 2008)
// Usage Information: http://www.theworldofstuff.com/greasemonkey/updatenotifier.html
function updateNotifier() {
//      PARAMETERS       //
var scriptName = "Overheard No Italics in Titles";
var scriptURL = "http://userscripts.org/scripts/show/31183";
var scriptVersion = 0.1;
var updateURL = "http://www.theworldofstuff.com/greasemonkey/overheard.txt";
var updateInterval = 3600;
//   END OF PARAMETERS   //
var checkForUpdates = GM_getValue('checkForUpdates', true);
if (checkForUpdates == true) {
var lastCheck = GM_getValue('lastCheck', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
if (currentTime >= lastCheck + updateInterval) {
   GM_xmlhttpRequest({
    method: 'GET',
    url: updateURL,
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
    onload: function(responseDetails) {
      if (responseDetails.status == 200) {
        var info = responseDetails.responseText;
        function createNotice(noticeText) {
           var notice = document.createElement('div');
           with (notice.style) { id = 'GMscriptnotice'; position = 'fixed'; top = '0px'; left = '0px'; width = '100%'; background = '#ffeb7c'; zIndex = '50000'; textAlign = 'center'; font = '12px sans-serif'; fontWeight = 'normal'; color = '#000'; padding = '5px 3px 5px 3px'; margin = '0px'; borderTop = '0px'; borderRight = '0px'; borderBottom = '1px solid #beaf5d'; borderLeft = '0px'; }
           notice.innerHTML = noticeText;
           document.getElementsByTagName('body')[0].appendChild(notice);
           if (document.getElementById('offLink')) {
              document.getElementById('offLink').addEventListener('click', function(event) {
                 event.stopPropagation();
                 event.preventDefault();
                 var confirmTurnOff = confirm('Are you sure you no longer want to be notified of updates to this script?');
                 if (confirmTurnOff) {
                    alert('You will no longer be notified of updates to ' + scriptName + '. You can change this preference in about:config.');
                    GM_setValue('checkForUpdates', false);
                    notice.parentNode.removeChild(notice);
                 }
              }, true);
           }
           if (document.getElementById('ignoreLink')) {
              document.getElementById('ignoreLink').addEventListener('click', function(event) {
                 event.stopPropagation();
                 event.preventDefault();
                 alert('You will not be notified until the script is updated again.');
                 GM_setValue('ignoreVersionNumber', versionOnSite.toString());
                 notice.parentNode.removeChild(notice);
              }, true);
           }
           document.getElementById('closeLink').addEventListener('click', function(event) {
              event.stopPropagation();
              event.preventDefault();
              notice.parentNode.removeChild(notice);
           }, true);
        }
        var linkStyle = 'color: #00f; text-decoration: underline; font: 12px sans-serif';
        if (info.match(/^[\d\.]+/)) {
           var ignoreVersionNumber = parseFloat(GM_getValue('ignoreVersionNumber', '0'), 10);
           var versionOnSite = info.match(/[\d\.]+/);
           if (info.indexOf(';') > 0) {
              scriptURL = info.split(";")[1];
           } 
           if ((versionOnSite > scriptVersion) && (versionOnSite > ignoreVersionNumber)) {
              createNotice('An update to the Greasemonkey user script "' + scriptName + '" is available. You are using version ' + scriptVersion + '.<br /><a href="' + scriptURL + '" style="' + linkStyle + '; font-weight: bold" id="upgradeLink">Review changes and upgrade to version ' + versionOnSite + '</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="ignoreLink">Wait until next version</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="offLink">Turn off these notifications</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="closeLink">Close</a>');
           }
        }
        else if (info.indexOf('-') == 0) { // if the script will no longer be maintained
           GM_setValue('checkForUpdates', false);
           if (info.indexOf(';') == 1) {
              scriptURL = info.split(";")[1];
              createNotice('The Greasemonkey user script "' + scriptName + '" will no longer be updated.<br /><a href="' + scriptURL + '" style="' + linkStyle + '; font-weight: bold" id="upgradeLink">More information</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="closeLink">Close</a>');
           }
        }
      }
    }
   });
   GM_setValue('lastCheck', currentTime);
}
}
} // END OF UPDATE NOTIFIER
