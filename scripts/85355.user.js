// ==UserScript==
// @name		Bugzilla Bug Title Floater
// @namespace		http://www.cobalt.com
// @description		Inserts the Bug Number and Title into a floating div at the upper right of the browser window
// @include		http://bugzilla.*.*/show_bug.cgi?id=*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

jQuery(document).ready(function() {
	var titleText=jQuery('title').html();
	var titleFloatDiv = document.createElement('div');
	titleFloatDiv.style.position = "relative";
	titleFloatDiv.style.textAlign = "right";
	titleFloatDiv.style.width = "100px";
	var titleP = document.createElement('p');
	titleP.style.position = "fixed";
	titleP.style.width = "400px";
	titleP.style.top = "0";
	titleP.style.right = "0";
	titleP.style.marginTop = "25px";
	titleP.style.paddingRight = "25px";
	titleP.style.fontSize = "18px";
	titleP.style.fontWeight = "bold";
	titleP.style.color = "#000000";
	titleP.innerHTML=titleText;
	var footer = document.getElementById('footer');
	footer.appendChild(titleFloatDiv);
	titleFloatDiv.appendChild(titleP);
});