// ==UserScript==
// @name            HF String Replacer
// @namespace       Snorlax
// @description     Replaces a few strings
// @include         http://www.hackforums.net/report.php*
// @include         http://hackforums.net/report.php*
// @version         1.0
// ==/UserScript==

	var str = document.body.innerHTML; 
	var n = str.replace("Wrong Forum","Wrong Section");
	document.body.innerHTML = n;