// ==UserScript==
// @name           Reload Idle Page
// @namespace      userscripts.org
// @description    Reloads the current page after every 5 min of idle time. Timer is reset for
// ==/UserScript==

	var minutes 		= 5;
	var timeOutPeriod 	= 1000*60*minutes;
	var tId; 
	function setRedirect(){
	    window.location=window.location;
	} 
	tId = setTimeout(setRedirect, timeOutPeriod);

	function resetTimer() {
	    clearTimeout(tId);
	    tId = setTimeout(setRedirect, timeOutPeriod);
	}
	
	window.addEventListener( 'mousemove', resetTimer, true );
	window.addEventListener( 'scroll', resetTimer, true );