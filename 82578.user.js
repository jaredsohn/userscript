// ==UserScript==
// @name           No time-out after edit cancel
// @description    musicbrainz.org : Avoids getting timeout after an edit cancellation adds some various utilities to the cancel page
// @version        2010-09-08_2010
// @author         Tristan "jesus2099" DANIEL (http://j2.ions.fr)
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http://musicbrainz.org/mod/remove.html?editid=*

// ==/UserScript==

(function () {
/* - --- - --- - --- - START OF CONFIGURATION - --- - --- - --- -
cursorInEditNote: (true|false) Sets the focus to the edit note text area so that you can type your cancel message right away */
var cursorInEditNote = true;
/* - --- - --- - --- - END OF CONFIGURATION - --- - --- - --- - */

var artisteditsURL = "/mod/search/results.html?orderby=desc&amp;mod_status=1&amp;mod_status=8&amp;artist_type=3&amp;artist_id=";
var labeleditsURL = "/mod/search/results.html?orderby=desc&amp;mod_status=1&amp;mod_status=8&amp;object_type=label&amp;object_id=";
var editURL = "/show/edit/?editid=";

var form = document.getElementById("ConfirmForm");
if (cursorInEditNote && document.getElementById("notetext") && document.getElementById("notetext").focus) {
	window.setTimeout("document.getElementById('notetext').focus();", 40)
};

var editid = location.href.match("editid=([0-9]+)")[1];
editURL+=editid;

var artistid = getArtistID();
if (artistid) { artisteditsURL += artistid; }

var labelid = getLabelID();
if (labelid) { labeleditsURL += labelid; }

var URLinput = getURLinput();
var button = document.getElementById("btnYes");
var buttonText = button.getAttribute("value");
var buttonArrow = buttonText.substring(buttonText.length-2, buttonText.length);
var buttons = button.parentNode;

buttons.insertBefore(document.createTextNode(" Cancel edit then go to ") , buttons.lastChild.previousSibling);

if (!URLinput) {
	URLinput = document.createElement("input");
	URLinput.setAttribute("name", "url");
	URLinput.setAttribute("type", "hidden");
	URLinput.setAttribute("value", editURL);
	form.appendChild(URLinput);
	buttons.removeChild(button);
} else {
	button.setAttribute("value", "last edit search" + buttonArrow);
	button.addEventListener("click", function (e) { this.setAttribute("value", buttonText); URLinput.setAttribute("value", url); }, false);
}

if (artistid) { buttons.insertBefore(newButton("artist pending edits" + buttonArrow, artisteditsURL) , buttons.firstChild.nextSibling); }
if (labelid) { buttons.insertBefore(newButton("label pending edits" + buttonArrow, labeleditsURL) , buttons.firstChild.nextSibling); }
buttons.insertBefore(newButton("edit page" + buttonArrow, editURL) , buttons.firstChild.nextSibling);

function newButton(txt, url) {
	var btn = document.createElement("input");
	btn.className = "button";
	btn.setAttribute("type", "submit");
	btn.setAttribute("name", "submitvalue");
	btn.setAttribute("value", txt);
	btn.setAttribute("title", url.replace(/&amp;/g, "&"));
	btn.addEventListener("click", function (e) { this.setAttribute("value", buttonText); URLinput.setAttribute("value", url); }, false);
	var frg = document.createDocumentFragment();
	frg.appendChild(btn);
	frg.appendChild(document.createTextNode(" "));
	return frg;
}

function getURLinput() {
	var inputs = form.getElementsByTagName("input");
	for (var i=0; i < inputs.length; i++) {
		if (inputs[i].getAttribute("name") == "url") {
			return inputs[i];
		}
	}
}
function getArtistID() {
	var artistid;
	var as = form.getElementsByTagName("a");
	for (var i=0; i < as.length; i++) {
		artistid = as[i].getAttribute("href").match("artistid=([0-9]+)");
		if (artistid) {
			return artistid[1];
		}
	}
}

function getLabelID() {
	var labelid;
	var as = form.getElementsByTagName("a");
	for (var i=0; i < as.length; i++) {
		labelid = as[i].getAttribute("href").match("labelid=([0-9]+)");
		if (labelid) {
			return labelid[1];
		}
	}
}

})();