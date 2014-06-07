// ==UserScript==
// @name          Hit Area Expander
// @description   Adds a button to change the height of the working area for the hit.
// @include       https://www.mturk.com/mturk/preview*
// @include       https://www.mturk.com/mturk/continue*
// @include       https://www.mturk.com/mturk/accept*
// @include       https://www.mturk.com/mturk/submit
// @include       https://www.mturk.com/mturk/return*
// ==/UserScript==
var Page_Status = document.forms[1].action;

insertButton();
changeHeight();

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function changeHeight() {
	var iframes = document.getElementsByTagName('iframe');
	var height = document.getElementById("new_size").value;
	for(var i = 0; i < iframes.length; i++) {
		iframes[i].height = height;

	}
}

function insertButton() {
	var firstElement = document.getElementById("requester.tooltip").parentNode;

	var button = document.createElement("div");
	button.innerHTML = 'New Height: <input type=number name="new_size" id="new_size" value = 1200><br><button id="sizeChange" type="Button">Expand</button>';
	button.setAttribute('id','buttonContainer');

	firstElement.appendChild(button);

	document.getElementById('sizeChange').addEventListener("click",changeHeight);
}
