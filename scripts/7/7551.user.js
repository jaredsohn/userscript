// ==UserScript==
// @name          No Wikipedia editing
// @namespace     
// @description   Prevents editing of the Wikipedia
// @include       http://*.wikipedia.org/*
// ==/UserScript==


var editButton = document.getElementById('ca-edit');
if (editButton) {
    editButton.parentNode.removeChild(editButton);
}

var editForm = document.getElementById('editform');
if (editForm) {
    editForm.parentNode.removeChild(editForm);
}

var buttons = document.getElementByClass('editButtons');
if (buttons) {
    buttons.parentNode.removeChild(buttons);
}

var sectionLink = document.getElementByClass('editsection');
if (sectionLink) {
    sectionLink.parentNode.removeChild(sectionLink);
}