// ==UserScript==
// @name           Hide Google notification bell from all Google sites
// @namespace      http://userscripts.org/users/smrots
// @description    Hide Google+ notification from all Google sites
//                 Handcrafted by http://userscripts.org/users/smrots
// @include        http*://*google.com*
// @version        0.1
// @run-at         document-end
// @grant          none
// ==/UserScript==

var timeout = 1000;

function setTimeoutCheck()
{
  var notifyIcon = document.getElementById("gbg1");
  if (notifyIcon)
  {
    notifyIcon.style.display = 'none';
  }

  setTimeout(setTimeoutCheck, timeout);
}

// main loop that checks for page changes
setTimeoutCheck(); 