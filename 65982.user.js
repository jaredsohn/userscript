// ==UserScript==
// @name           StopDrudgeReload
// @namespace	   None
// @description    Stops the automatic reload of the Drudge Report
// @include        http://www.drudgereport.com/
// ==/UserScript==

function autoRefresh()
{	window.status='Refresh Aborted!';
}

window.status='Refresh Killer Installed!';