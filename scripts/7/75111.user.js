// ==UserScript==
// @name           Einzelne Kommentare aendern
// @namespace      http://eurobilltracker.com
// @include        http://*eurobilltracker.com/*
// ==/UserScript==

function globalCommentLostFocus() {
	var inputFields = document.getElementsByTagName('input');

	var globalCommentField = document.getElementById('comment');
	globalCommentField.disabled = true;
	globalCommentField.className += ' disabled';

	for (i = 0; i < inputFields.length; i++) {
		if (inputFields[i].id.search(/my_comment/) == -1) {
			continue;
		}
		
		inputFields[i].disabled = false;
		inputFields[i].className = inputFields[i].className.replace(/disabled/, '');
	}
}

function backToGlobalComment() {
	var answer = confirm('Wenn dieses Feld bearbeitet wird, wird der Inhalt der unteren Kommentarfelder zurückgesetzt.');

	if (answer == false) {
		return;
	}
	
	var globalCommentField = document.getElementById('comment');
	globalCommentField.disabled = false;
	globalCommentField.className = globalCommentField.className.replace(/disabled/, '');
}

var globalCommentField = document.getElementById('comment');
globalCommentField.addEventListener('blur', globalCommentLostFocus, false);

var commentLabel = globalCommentField.parentNode.parentNode.parentNode.children[0];
commentLabel.addEventListener('click', backToGlobalComment, false);
commentLabel.style.cursor = 'pointer';