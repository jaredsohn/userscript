// ==UserScript==
// @name SubForums 2 Top
// @description Move Facepunch subforums to top
// @author CaptMicro
// @match http://www.facepunch.com/forums/*
// @run-at document-end
// ==/UserScript==

function SF2T_RUN()
{
	var elms = document.getElementsByClassName("forums");
	var above_threadlist = document.getElementById("above_threadlist");
	var subforumshtml = 0;
	for (i = 0; i < elms.length; i++) {
		if (elms[i].innerHTML.indexOf("<h2>Sub-Forums</h2>") != -1) {
			subforumshtml = elms[i].innerHTML;
			elms[i].parentNode.removeChild(elms[i]);
		}
	}
	for (i = 0; i < elms.length; i++)
	{
		if (elms[i].innerHTML.indexOf("View Sub Forums</a>") != -1) {
			elms[i].innerHTML = subforumshtml;
		}
	}
}

SF2T_RUN();
