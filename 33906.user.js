// ==UserScript==
// @name          Refresh Pandora
// @namespace     http://pandora.com
// @description   Refreshes Panora
// @include       http://www.pandora.com/
// ==/UserScript==

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}

JavaScript:timedRefresh(108000000)