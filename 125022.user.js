// ==UserScript==
// @name           Show Notifications While on Scratch Forums
// @namespace      Scimonster,Scratch;ExtensionBy MagmaWulf
// @description    Extends the functionality of Scimonsters Message bar for forums, by making it always seen	
// @include        http://scratch.mit.edu/forums/*
// @include        http://scratch.mit.edu/tbgforums/*
// ==/UserScript==

xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', "/" ,true);
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4) {
		var page = xmlhttp.responseText;
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
		if (document.getElementById("notificationscount").innerHTML.charAt(0)=="0") {notes.style.display="none";} else {notes.style.display="block";}
		notes.style.width="770px";
		notes.style.textAlign="center";
		notes.style.backgroundImage="url('../img/bg_footer.png')";
		notes.style.backgroundRepeat="no-repeat";
		notes.style.backgroundPosition="center bottom";
		notes.style.marginBottom="0pt";
		notes.style.padding="15px 5px 5px";
		notes.style.position="fixed";
	}
};
xmlhttp.send(null);
void(0);