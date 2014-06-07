// ==UserScript==
// @name          YouTube comment character counter
// @namespace     http://clows.net
// @description   Adds a Character Counter to the 'Post Comment' Button so you can see how many characters you have left
// @include       http://*youtube.com/watch?*
// @include       http://*youtube.com/comment_servlet?*
// ==/UserScript==

function newkeyup(event) {
	var counter = 'c_counter';
	var f = event.target.parentNode; // f = form
	if (event.target.value.length > 300) {
		event.target.value = event.target.value.substr(0,300);
	}
    if (!document.getElementById(event.target.parentNode.id + "_counter")) {
	var newPara = document.createElement("p");
	var newText = document.createTextNode("");
	newPara.appendChild(newText);
	newPara.id = event.target.parentNode.id + "_counter";
	newPara.className = 'commentBody marL8 normalText';
	document.getElementById(event.target.parentNode.id).appendChild(newPara);
    }
    document.getElementById(event.target.parentNode.id + "_counter").innerHTML = "&nbsp;" + (300 - event.target.value.length);
}
window.addEventListener('keyup', newkeyup, true);
