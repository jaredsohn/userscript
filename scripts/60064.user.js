// ==UserScript==
// @name MEGAUPLOAD direct downloader
// @namespace http://hail2u.net/
// @include http://www.megaupload.com/?d=*
// ==/UserScript==
 
window.location.href = window.location.href.replace(/\/\?d=/, "/mgr_dl.php?d=");