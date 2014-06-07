// ==UserScript==
// @name           Furk Skip Wait Time
// @namespace      Aaron Russell
// @description    skip the wait time
// @include        https://www.furk.net/*.html
// ==/UserScript==
setTimeout("startDownload()", 2000);
setTimeout("document.getElementById('free_download').value='Free Download'", 2010);
setTimeout("document.getElementById('free_download').id='voided'", 2020);
