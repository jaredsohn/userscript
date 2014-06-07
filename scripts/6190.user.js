// ==UserScript==
// @name          userscripts.org: Toggle edit description
// @namespace     http://loucypher.wordpress.com/
// @include       http://userscripts.org/scripts/show/*
// @description	  Toggle edit script description
// ==/UserScript==

var XPath = "//div[@id='description_button']/span/a[contains(@href, 'edit_description')]";
var editDesc = document.evaluate(XPath, document, null, 0, null).iterateNext();
if(!editDesc) return;

function toggleEdit(aEvent) {
  aEvent.preventDefault();
  var editDescription = document.getElementById("edit_description");
  editDescription.style.display = editDescription.style.display == "" ? "none" : "";
}

editDesc.addEventListener("click", toggleEdit, false);

var textArea = document.getElementById("script_description_extended");

var cancelButton = textArea.parentNode.appendChild(document.createElement("input"));
cancelButton.type = "button";
cancelButton.value = "Cancel Editing";
cancelButton.style.marginLeft = "1em";
cancelButton.addEventListener("click", toggleEdit, false);

var resetButton = document.createElement("input");
resetButton.type = "reset";
resetButton.value = "Discard Changes";
resetButton.style.cssFloat = "right";

textArea.parentNode.insertBefore(resetButton, textArea.nextSibling);

