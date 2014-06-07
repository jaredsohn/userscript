// ==UserScript==
// @name        Quizlet allow export editing
// @author      Kevin Zhou
// @version     0.1.3
// @namespace   quizletScript
// @description A script to allow export data textarea editing
// @include	*uizlet.com/*/export*
// ==/UserScript==
function wait() {
	if (document.readyState == "complete") {
		document.querySelector("#word-data").readOnly = false;
	}
	else {
		setTimeout("wait()", 500);
	}
}
wait();