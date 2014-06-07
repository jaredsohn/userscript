// ==UserScript==
// @name        Add All to Clipboard in LinkedIn Recruiter
// @description	This is for LinkedIn Recruiter search results only. Add all results to your clipboard with one button. 
// @namespace   http://www.devrecruiter.com
// @author		2011 Douglas G Smiley
// @include     https://www.linkedin.com/cap/search/resultsWithFacets/*
// ==/UserScript==
function addclipscript() {
	var head = document.getElementsByTagName("head")[0];
	if (!head) {
		return;
	}
	var linkElem = document.createElement("script");
	linkElem.setAttribute("src", "http://dl.dropbox.com/u/12619073/addalltoclip.js");
	linkElem.setAttribute("type", "text/javascript");
	head.appendChild(linkElem);
};
addclipscript();

function addclipbutton(){
var dgsCreateDiv=document.createElement("div");
dgsCreateDiv.setAttribute("style","position:fixed;top:50%;left:90%;width:34px;height:34px; tabindex:1;");
dgsCreateDiv.innerHTML = '<input type="button" style="padding:0px;" tabindex="1" value="Add to Clipboard" name="addtoclip" onclick="addalltoclip()">';
document.body.appendChild(dgsCreateDiv);
};
addclipbutton();