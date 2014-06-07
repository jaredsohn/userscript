// ==UserScript==
// @name        DirectApkmania
// @namespace   DirectApkmania
// @description Apkmania auto downloader
// @include     http://*apkmania.co/*
// @exclude     http://*apkmania.co/*undefined
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @version     1
// @version     0.1
// @grant	metadata
// ==/UserScript==

var downloadLink = $('a[href^="http://chathu.apkmania.co/"]').attr('href')

var DownloadWindow = window.location.replace(downloadLink);

if (!DownloadWindow) {document.location.href = downloadLink;}

function CloseDownload() {
  DownloadWindow.close();
  SelfWindow = window.open('', '_self', '');
  SelfWindow.close();
}