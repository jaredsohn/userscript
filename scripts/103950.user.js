// ==UserScript==
// @name           ING Categoriser
// @namespace      http://www.paour.com
// @description    Removes the idiotic 3-line limit on operations in categorize mode
// @include        https://secure.ingdirect.fr/protected/pages/cc/transactionLookup.jsf
// ==/UserScript==

var tableContainer = document.getElementById("ops_form:tableContainer");
tableContainer.style.height="auto";

var agrandir = function() {
	document.getElementById('ops_form:tableContainer').style.height='auto';
	return false;
}

var newButton = document.createElement('a');
newButton.addEventListener('click', agrandir, false);
newButton.href="javascript:void(0)";
newButton.appendChild(document.createTextNode('Agrandir liste'));

var renderer = document.getElementById("ops_rerender");
renderer.parentNode.insertBefore(newButton, renderer);