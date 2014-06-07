// ==UserScript==
// @name           Show Notifications While on Scratch Forums
// @namespace      Scimonster,Scratch
// @description    Shows your notifications while using the forums, which does not happen by default
// @include        http://scratch.mit.edu/forums/*
// @include        http://scratch.mit.edu/tbgforums/*
// ==/UserScript==

xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "/" ,true);
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4) {
		var page = xmlhttp.responseText;
		if (page.indexOf("<div id=\"notificationcontainer\"")>0) {
			var noteDiv = page.substring(page.indexOf("<div id=\"notificationcontainer\""),(page.indexOf("</div>",page.indexOf("<div id=\"notificationcontainer\""))+6));
			noteDiv = noteDiv.substring(noteDiv.indexOf("\n"),noteDiv.lastIndexOf("\n"));
			var notesC = document.createElement("div");
			document.getElementById("header").appendChild(notesC);
			notesC = document.getElementById("header").lastChild;
			notesC.style.cssText="float:left";
			var notes = document.createElement("div");
			notesC.appendChild(notes);
			notes.id = "notificationcontainer";
			notes.innerHTML = noteDiv;
			notes.style.cssText="width: 770px; text-align: center; background: url('../img/bg_footer.png') no-repeat center bottom; margin-bottom: 0pt; padding: 15px 5px 5px; position: relative";
			if (document.getElementById("notificationscount").innerHTML.charAt(0)=="0") {notes.style.display="none";} else {notes.style.display="block";}
			 if (notes.style.display=="block") {document.body.onload=correctScroll;}
		}
	}
};
xmlhttp.send(null);
void(0);

function correctScroll() {if (window.location.hash) {window.location.hash = (window.location.hash);}}