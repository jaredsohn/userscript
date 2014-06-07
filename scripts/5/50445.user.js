// ==UserScript==
// @name          Yahoo Answers Code Button
// @namespace     http://itsjareds.leadhoster.com
// @description   Adds a button to add code in a Y! Answers post.
// @include       http://answers.yahoo.com/question/answer*
// ==/UserScript==

var answerText = document.getElementById("yan-answer-answer");

answerText.focus();
answerText.setSelectionRange(0, 0);

var div = document.createElement("div");
div.style.paddingBottom = "2px";
answerText.parentNode.insertBefore(div, answerText);

var codeBtn = document.createElement("input");
codeBtn.type = "button";
codeBtn.value = "Add Code";
codeBtn.style.width = "100px";
div.appendChild(codeBtn);

codeBtn.addEventListener("click", function() {
	var dashes = "------------";
	var ans = prompt("Enter a programming language:");
	if (ans == null) {
		answerText.focus();
		return false;
	}
	else if (ans == "")
		ans = "Code";
	head = ans + " Syntax:\n" + dashes + "\n";
	ans = head + "\n" + dashes;

	startPos = answerText.selectionStart;
	endPos = answerText.selectionEnd;

	answerText.value = answerText.value.substr(0, startPos)
			   + ans
			   + answerText.value.substr(endPos, answerText.value.length);

	answerText.focus();
	answerText.setSelectionRange(endPos + head.length, endPos + head.length);
}, false);