// ==UserScript==
// @name           Megaupload Skipper
// @namespace      Megaupload
// @description    Skip Megaupload's Regular Download Wait Time
// @include        *megaupload*
// ==/UserScript==
location.href="javascript: document.getElementById('downloadlink').style.display = '';document.getElementById('downloadcounter').style.display = 'none';void(0);";