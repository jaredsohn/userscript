// ==UserScript==
// @name          DllDll Downloader
// @namespace     http://y4kstudios.com/greasemonkey/
// @description   Removes the download waiting time
// @include       http://dlldll.com/getdll/*.html
// @include       http://www.dlldll.com/getdll/*.html
// ==/UserScript==

window.addEventListener('load', window.setTimeout('if(c) c=0;', 0),true);