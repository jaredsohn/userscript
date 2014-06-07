// MySpace Go Right Home, a Greasemonkey user script
// Version 0.5 - November 29, 2007
// Copyright 2007 Jordon Kalilich (http://www.theworldofstuff.com/)
// Released under the GPL version 3
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          MySpace Go Right Home
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @description   Skips over MySpace's main page to your personal home page if you are already logged in.
// @include       http://myspace.com/
// @include       http://www.myspace.com/
// @include       http://myspace.com/index.cfm*
// @include       http://www.myspace.com/index.cfm*
// ==/UserScript==

if (document.getElementById('topnav')) {
   var homeURL = document.getElementById('topnav').getElementsByTagName('a')[0].href;
   if (homeURL) {
      if (homeURL.indexOf('fuseaction=user') > -1) {
         location.replace(homeURL);
      }
      else UpdateNotifier();
   }
   else UpdateNotifier();
}
else UpdateNotifier();

function UpdateNotifier() {

// UPDATE NOTIFIER (Version 5: November 28, 2007)
// (based on UserScript Update Notification by Seifer: http://userscripts.org/scripts/show/12193)
var scriptName = "MySpace Go Right Home";
var scriptVersion = 0.5;
var scriptID = '4716';

var checkForUpdates = GM_getValue('checkForUpdates', true);
if (checkForUpdates == true) {
var lastCheck = GM_getValue('lastCheck', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
if (currentTime >= lastCheck + 1209600) { // (number of seconds in 2 weeks
   GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://userscripts.org/scripts/review/' + scriptID + '?format=txt',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
    onload: function(responseDetails) {
        var script = responseDetails.responseText;
        var chooseToUpdate;
        function createNotice(noticeText) {
           var notice = document.createElement('div');
           with (notice.style) { id = 'GMscriptnotice'; position = 'fixed'; top = '0px'; left = '0px'; width = '100%'; background = '#ffeb7c'; zIndex = '1000'; textAlign = 'center'; font = '12px sans-serif'; fontWeight = 'normal'; color = '#000'; padding = '5px 3px 5px 3px'; margin = '0px'; borderTop = '0px'; borderRight = '0px'; borderBottom = '1px solid #beaf5d'; borderLeft = '0px'; }
           notice.innerHTML = noticeText;
           document.getElementsByTagName('body')[0].appendChild(notice);
           document.getElementById('upgradeLink').addEventListener('click', function(event) {
              notice.parentNode.removeChild(notice);
           }, true);
           document.getElementById('waitLink').addEventListener('click', function(event) {
              event.stopPropagation();
              event.preventDefault();
              alert('You will be notified again after two weeks.');
              notice.parentNode.removeChild(notice);
           }, true);
           document.getElementById('offLink').addEventListener('click', function(event) {
              event.stopPropagation();
              event.preventDefault();
              var confirmTurnOff = confirm('Disable notifications of updates to this script?');
              if (confirmTurnOff) {
                 alert('You will no longer be notified of updates to ' + scriptName + '. You can change this preference in about:config.');
                 GM_setValue('checkForUpdates', false);
                 notice.parentNode.removeChild(notice);
              }
           }, true);
        }
        if (script.indexOf('var scriptVersion = ' ) > -1) {
           var foo = script.match(/var scriptVersion = [\d\.]+/i) + ''; // makes it a string
           var versionOnSite = foo.match(/[\d\.]+/);
           if (versionOnSite > scriptVersion) {
              var noticeText = 'An update to the Greasemonkey user script "' + scriptName + '" is available. You are running version ' + scriptVersion + '. <a href="http://userscripts.org/scripts/source/' + scriptID + '.user.js" style="color: #00f; text-decoration: underline; font-weight: bold" id="upgradeLink">Upgrade to version ' + versionOnSite + ' now</a>, <a href="#" style="color: #00f; text-decoration: underline; font-weight: normal" id="waitLink">wait until later</a>, or <a href="#" style="color: #00f; text-decoration: underline; font-weight: normal" id="offLink">turn off these notifications</a>.';
              createNotice(noticeText);
           }
        }
        else { // if the new version of the script doesn't have this update mechanism
           var noticeText = 'An update to the Greasemonkey user script "' + scriptName + '" is available. <a href="http://userscripts.org/scripts/source/' + scriptID + '.user.js" style="color: #00f; text-decoration: underline; font-weight: bold" id="upgradeLink">Upgrade now</a>, <a href="#" style="color: #00f; text-decoration: underline; font-weight: normal" id="waitLink">wait until later</a>, or <a href="#" style="color: #00f; text-decoration: underline; font-weight: normal" id="offLink">turn off these notifications</a>.';
           createNotice(noticeText);
        }
    }
   });
   GM_setValue('lastCheck', currentTime);
}
}
// END OF UPDATE NOTIFIER

}
