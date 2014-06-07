// ==UserScript==
// @name           Change notes text to inline
// @namespace      https://superadmin.t-suite.telstra.com/helpdesk/web/pages/
// @description    Change notes text to inline
// @include        https://superadmin.t-suite.telstra.com/helpdesk/web/pages/view.jsp*
// ==/UserScript==

function do_script() {
	var notes = document.getElementsByName( 'notes' );
	var notestext = notes[0].innerHTML;

	var newtext = "";
	var lines = notestext.split( "\n" );
	for (var i = 0; i < lines.length; i++) {
		newtext += lines[i] + "<br />\r\n";
	}

	var notesfield = document.createElement("pre");
	notesfield.setAttribute("name", "notes" );
	notesfield.setAttribute("style", "white-space:pre-wrap");
	notesfield.innerHTML = newtext;
	notes[0].parentNode.replaceChild(notesfield, notes[0]);
}

window.addEventListener("load", function() { do_script() }, false);

