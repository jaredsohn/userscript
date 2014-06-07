// ==UserScript==
// @name DirectZippy      
// @description Zippyshare direct download forwarder (with autoclose).
// @namespace DirectZippyNS
// @include http://*.zippyshare.com/v/*
// @match http://*.zippyshare.com/v/*
// @icon http://i.imgur.com/PBeDi.png
// @downloadURL  http://userscripts.org/scripts/source/141052.user.js
// @author Jαηροl™
// @version 0.3.2
// ==/UserScript==

document.title = 'DirectZippy';

var DownloadURL = document.getElementById('dlbutton');
var DownloadWindow = window.open(DownloadURL, 'dlwindow');
var DownloadTimeout = setTimeout(CloseDownload, 500);

if (!DownloadWindow) {document.location.href = DownloadURL;}

function CloseDownload() {
  DownloadWindow.close();
  SelfWindow = window.open('', '_self', '');
  SelfWindow.close();
}