// ==UserScript==
// @name           Network Solutions prevent timeout
// @namespace      http://userscripts.org/users/10737
// @description    Prevent the incessant 15 minute timeout on network solutions
// @include        *networksolutions.com/*
// ==/UserScript==

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}

JavaScript:timedRefresh(300000) // This is set to 5 minutes in milliseconds
