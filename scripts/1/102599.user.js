// ==UserScript==
// @name           Jamendo OGG Download Link
// @namespace      http://userscripts.org/users/desequencer
// @description    Adds a link to Jamendo's download page to download albums in .ogg format.
// @include        http://www.jamendo.com/*/download/album/*
// ==/UserScript==

var url = document.location.href;
albumRegex = /\d[0-9]*/;
var albumID = url.match(albumRegex);
var downloadOGG = document.createElement('a');
downloadOGG.href = 'http://www.jamendo.com/get/album/id/album/archiverestricted/redirect/' + albumID + '/?are=ogg3';
downloadOGG.appendChild(document.createTextNode('Download OGG'));
var jamForm = document.getElementById('Jamform_download_with_email_submit');
jamForm.parentNode.insertBefore(downloadOGG, jamForm.nextSibling);
