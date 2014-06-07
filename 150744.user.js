// ==UserScript==
// @name           Log into CC quick
// @include        http://eportal.50below.com/ePortal/
// ==/UserScript==

function logMeInFast() {
    document.getElementById("_ctl1_searchResultsDataGrid__ctl3_sameEditButton").click();
}

logMeInFast();
