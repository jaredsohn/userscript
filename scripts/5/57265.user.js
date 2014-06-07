// ==UserScript==
// @name 		Yahoo! Answers Spam Button
// @namespace 		http://userscripts.org/users/107071
// @author 		LarryDKB
// @description 	Adds a button for reporting spam.
//	     		-Based on
//	     		-http://userscripts.org/scripts/show/50445 by itsjareds.
// @version 		0.9.3
// @include 		http://*answers.yahoo.com/question/report*
// @include 		http://*answers.yahoo.com/answer/report*
// ==/UserScript==

var cgBtn = document.getElementById("abuse-type-guidelines");
cgBtn.checked = "true";

var detailsText = document.getElementById("violation-details");
newdiv = document.createElement("div");
desc = '<p class="cta secondary"><button id="" value="Report Abuse" name="report">' +
'<span><span><span><span style="color: red">Report Spam</span></span></span></span></button></p>';
newdiv.className = "buttons";
newdiv.innerHTML = desc;
newdiv.style.marginBottom = "5px";

detailsText.parentNode.insertBefore(newdiv, detailsText);

newdiv.addEventListener("click", function() {
	var ans = "SPAM";

	startPos = detailsText.selectionStart;
	endPos = detailsText.selectionEnd;

	detailsText.value = detailsText.value.substr(0, startPos)
			   + ans
			   + detailsText.value.substr(endPos, detailsText.value.length);

	detailsText.focus();
	detailsText.setSelectionRange(endPos + head.length, endPos + head.length);
}, false);