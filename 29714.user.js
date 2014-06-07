// ==UserScript==
// @name           Juniper IVE fix for FireFox 3.0
// @include        https://*/starter*.cgi?check=yes
// ==/UserScript==

window.location.href = window.location.href.replace('check=yes', 'check=no');