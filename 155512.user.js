// ==UserScript==
// @name           BBY Sharepoint Fixes
// @namespace      http://userscripts.org/users/thejohnsmith
// @description    Reloads after every 3 min of idle time to prevent logout. Fixes a Google Chrome hover problem. Adds automcomplete to login form. 
// @include        https://view.bestbuy.com/*
// @match          https://view.bestbuy.com/*
// @downloadURL    http://userscripts.org/scripts/source/155512.user.js
// @version 1.1.8
// ==/UserScript==

	var minutes 		= 3;
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
	
	/* Fixes hover problem in Chrome */
	GM_addStyle('body{position:absolute;width:100%;overflow-x:hidden;background:url(http://i45.tinypic.com/1zlrfo5.png) no-repeat bottom right fixed, -webkit-gradient(linear, left top, left bottom, color-stop(0%,#cbeff8), color-stop(100%,#61cfe7)) fixed !important}');
	
	/* Enable autocomplete for login form */
	var username =  document.getElementById('username');
	if (typeof(username) != 'undefined' && username != null) {
  		username.setAttribute('autocomplete', 'on');
		//document.getElementById('password').setAttribute('autocomplete', 'on');
	}
	
	
	/* Add a unique Sharepoint favicon */
	function addIcon() {
		var newIcon = document.createElement('link');
		newIcon.type = 'image/x-icon';
		newIcon.rel = 'shortcut icon';
		newIcon.href = 'data:image/png;base64,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';
		this.document.getElementsByTagName('head')[0].appendChild(newIcon);
	}

addIcon();