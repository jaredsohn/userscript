// ==UserScript==
// @name         Log all variables
// @namespace    http://localhost
// @description  list all the variables in the content's global scope
// @author       bob2005euro
// @version      0.0.1
// @include      http://*
// @exclude
// ==/UserScript==

/*
For security reasons Greasemonkey scripts cannot directly access objects in the current document's global scope.
Greasemonkey provides object unsafeWindow for scripts that wish to access such variables.

This script produces a simple list of all unsafeWindow variables followed by the same
list with all the values after each.
*/

(function()
{
    if (typeof unsafeWindow != "undefined") {
        loghead="See list of all variables at end of this page.<br/>";
        log="<b>Log all variables: Global variables in unsafeWindow:</b><br/>";
        logfull="<b>Global variables and values:</b><br/>";
	// list all the variables in the content's global scope
	GM_log("index : variable (index)" + "\n");
	for (var p in unsafeWindow) {
	    log=log + p + "<br/>";
	    logfull=logfull + p + "= " + unsafeWindow[p] + "<br/><br/>";
	    GM_log(p + ": " + unsafeWindow[p] + "\n");
	}
	GM_log("End of GM_Log" + "\n");
    }
    else {
        loghead="<b>Log all variables : unsafeWindow is not defined, "
         +" script needs Greasemonkey version 0.6.4 or after</b><br/>";
        log="";
        logfull="";
    }
    document.body.innerHTML = loghead + document.body.innerHTML + log + logfull;
})();
