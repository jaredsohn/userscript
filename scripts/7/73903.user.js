// ==UserScript==
// @name          Automatic Megaupload Happy Hour Download
// @namespace     
// @description   Script which allows automatic downloads from MegaUpload during Happy Hour
// @include       http://www.megaupload.com/?d=*
// ==/UserScript==
location.href=document.getElementById('downloadlink').getElementsByTagName('a')[0].getAttribute('href');