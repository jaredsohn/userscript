// Wikipedia Auto-Login, a Greasemonkey user script
// Version 0.4 - March 22, 2008
// Copyright 2006-2008 Jordon Kalilich (http://www.theworldofstuff.com/)
// Released under the GPL version 3
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Wikipedia Auto-Login
// @namespace     http://www.theworldofstuff.com/greasemonkey/
// @description   Automatically logs you into Wikipedia if Firefox is set to remember your password.
// @include       http://en.wikipedia.org/*
// ==/UserScript==

var location = window.location.toString();

// When not logged in and not just logged out: go to the login page
if (/:userlog(in|out)/i.test(location) == false) {
    loginbullet = document.getElementById('pt-login');
    if (loginbullet) {
        GM_setValue('returnTo', location);
        window.location.replace(loginbullet.getElementsByTagName('a')[0].href);
    }
    else {
        updateNotifier();
    }
}
// When at the login page: log in
else if ((/:userlogin/i.test(location) == true) && (/action=submitlogin/i.test(location) == false)) {
    var pwFocus = false;
    function autoLogin(){
        if(pwFocus==false){
            if(document.forms[0].elements.namedItem("wpPassword").value.length>1){document.forms[0].submit();}
            else{setTimeout(autoLogin,100);}
        }
    }
    function focusEvent(){
        pwFocus = true;
    }
    if(document.forms[0] && document.forms[0].elements.namedItem("wpPassword")){
        if (document.forms[0].elements.namedItem("wpRemember")) {
            document.forms[0].elements.namedItem("wpRemember").checked = true;
        }
        document.forms[0].elements.namedItem("wpPassword").addEventListener("keypress", focusEvent, false);
        window.addEventListener("load", autoLogin, false);
    }
}
// At the welcome page, after logging in: go back where you came from
else if (/action=submitlogin/i.test(location) == true) {
    if (GM_getValue('returnTo')) {
        var returnToUrl = GM_getValue('returnTo');
        GM_setValue('returnTo', '');
        if (returnToUrl != '') {
            window.location.replace(returnToUrl);
        }
        // if the user went straight to the login page w/no referer, they are taken to the main page.
        else {
            window.location.replace('http://' + window.location.host);
        }
    }
    // if running for the first time and went straight to the login page w/no referer.
    else {
        window.location.replace('http://' + window.location.host);
    }
}

function updateNotifier() {
var scriptName = "Wikipedia Auto-Login";
var shortName = "wikipediaautologin";
var scriptID = "4971";
var scriptVersion = 0.4;

var checkForUpdates = GM_getValue('checkForUpdates', true);
if (checkForUpdates == true) {
var lastCheck = GM_getValue('lastCheck', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
if (currentTime >= lastCheck + 3600) { // (number of seconds in 1 hour
   GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.theworldofstuff.com/greasemonkey/' + shortName + '.txt',
    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
    onload: function(responseDetails) {
      if (responseDetails.status == 200) {
        var info = responseDetails.responseText;
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
              alert('You will be notified again in one week.');
              GM_setValue('lastCheck', currentTime + 601200); // 1 week minus 1 hour (will be set after the one below)
              notice.parentNode.removeChild(notice);
           }, true);
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
        var linkStyle = 'color: #00f; text-decoration: underline; font: 12px sans-serif';
        if (info.match(/[\d\.]+/)) {
           var versionOnSite = info.match(/[\d\.]+/);
           var updateURL = 'http://userscripts.org/scripts/show/' + scriptID;
           if (info.indexOf(';') > 0) {
              updateURL = info.split(";")[1];
           } 
           if (versionOnSite > scriptVersion) {
              var noticeText = 'An update to the Greasemonkey user script "' + scriptName + '" is available. You are using version ' + scriptVersion + '.<br /><a href="' + updateURL + '" style="' + linkStyle + '; font-weight: bold" id="upgradeLink" target="_blank">Review changes and upgrade to version ' + versionOnSite + '</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="waitLink">Notify me later</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" style="' + linkStyle + '; font-weight: normal" id="offLink">Turn off these notifications</a>';
              createNotice(noticeText);
           }
        }
        else if (info.indexOf('-') == 0) { // if the script will no longer be maintained
           GM_setValue('checkForUpdates', false);
        }
      }
    }
   });
   GM_setValue('lastCheck', currentTime);
}
}
} // END OF UPDATE NOTIFIER
