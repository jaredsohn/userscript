// ==UserScript==
// @name           Yelp Word Count
// @namespace      http://www.kennyocracy.com
// @include        http://www.yelp.com/writeareview/*
// ==/UserScript==


function reset() {
	document.getElementById("spellCheck_message").innerHTML = '';
	document.getElementById("wordCount").addEventListener('click', countWords, false);
}


function countWords() {
    var WHITESPACE_START_RE = /^[^A-Za-z0-9]+/;
    var fullStr = document.getElementById("review-text").value;
	var cleanStr = fullStr.replace(/[\s]+/g, " ").replace(WHITESPACE_START_RE, "");
    var numWords = cleanStr.split(" ").length-1;
    document.getElementById("spellCheck_message").innerHTML = numWords+" words.";
	document.getElementById("wordCount").removeEventListener('click', countWords, false);
	setTimeout(reset, 3000);
}


function placeWcButton() {

	var wcIcon = document.createElement('img');
	wcIcon.src = "data:image/bmp;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK5QTFRFv7+ZjIxwsrKODp0LmZl65eW3EJ8NxMOftb2T4PK2r96OeLFiWVlHnbh%2Fz+uo4N+2Lakl2diyHKIXIngbzs6toKWCX2JNZGRQTEw9nJyB%2Fv7LkZF0ttyU+%2FrKzMumGJ4U+PfJf39mSKc7n9iBJKAd8O%2FDsbGO7OvAJiggGjEW5Oy5e3tlgMxoda1eeoplULlBGp8VSLE7paWEPz8yzMyj8vLCZWVRMzMpAJkA%2F%2F%2FMqodHvgAAAKtJREFUeNpczIcSwjAIBuC0dti69957a9IE%2Fvd%2FMdN6apU7OPgOEAASDejENn5aBLRDCQSR8iUppa14xoopayWlq0lY8UHZsh1c6qc7yMQjZzi4CiWtbD1auGXqjTqHvVSuFccYk2a3dTkZiewqi2rwCCfAS4IxEAfN4g5vqc+OKy5UGvjIje%2FMpSm+cmbmZTjPScy8Lm6Qk8g+qSEvKJTa+JUoxJ%2F8xFOAAQDiLDPlWnj+iQAAAABJRU5ErkJggg==";
	wcIcon.title = "word count"
	wcIcon.style.border = "none";
	wcIcon.style.cursor = "pointer";
	wcIcon.width = "17";
	wcIcon.height = "17";
	
	
	var iconHolder = document.createElement('a');
	iconHolder.setAttribute("class", "spellCheckIcon");
	iconHolder.setAttribute("href", "#");
	iconHolder.id = "wordCount";
	iconHolder.style.marginLeft = "5px";
	iconHolder.appendChild(wcIcon);
	iconHolder.addEventListener('click', countWords, false);

	var commentFooter = document.getElementById("comment_footer");
	commentFooter.style.whiteSpace = "normal";
	var spellCheckMessage = document.getElementById("spellCheck_message");
	spellCheckMessage.style.left = "50px";
	commentFooter.insertBefore(iconHolder, spellCheckMessage);

}

placeWcButton();