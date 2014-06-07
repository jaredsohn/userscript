// ==UserScript==
// @version     1.1
// @name        anyRemove
// @author      Zhou Meng
// @description Remove any element by Ctrl+Alt+Click.  Restore by Ctrl+Z.  Supports Greasemonkey and Chrome.
// @namespace   anyRemove
// @include     *
// ==/UserScript==

var removedNodes = [];

function handleKeydown(event) {
	if (event.ctrlKey && event.keyCode == 90 && removedNodes.length > 0) {
		removedNodes.pop().style.display = null;
	}
}
function handleClick(event) {
	if (event.ctrlKey && event.altKey && event.button == 0) {
		removedNodes.push(event.target);
		event.target.style.display = "none";
		event.preventDefault();
		event.stopPropagation();
	}
}

document.addEventListener("keydown", handleKeydown, true);
document.addEventListener("click", handleClick, true);
