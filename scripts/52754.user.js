// ==UserScript==
// @name           SM Toggle Original LJ/DW Comment
// @namespace      http://twilite.org/~xtina
// @description    Toggles display of the original LJ/DW comment in Squirrelmail.
// @include        */src/read_body.php
// @include        */src/read_body.php*
// ==/UserScript==

// ## Set your preferences here.

// Change this to false to hide the comment by default; true to show by default.
var showComm = false;

// Change the text of the hide/show lines here.
var hideText = "[hide comment/post]";
var showText = "[show comment/post]";

// Change the colouration here.
var textColour = "#000";
var backColour = "#E8E8FF";

// ## Don't edit any more.


// Get the email, and split it out to find where the original comment is hiding.
var emlBody = document.getElementsByTagName("table")[7];
var emlLines = emlBody.innerHTML.split("\n");
var isDone = 0;

for (var x = 0; x < emlLines.length; x++) {
// Insert a line just before the comment starts.
	if (isDone == 0 && (emlLines[x].substr(-5) == "said:" || emlLines[x].substr(-4) == "was:") && emlLines[x + 1].length == 0) {
		emlLines[x + 1] += "\n<a id=\"ljtext\" style=\"color: " + textColour + "; background-color: " + backColour + ";\" onClick=\"var ljc = document.getElementById('ljcomm'); var ljt = document.getElementById('ljtext'); if (ljc.style.display == 'none') { ljc.style.display = 'inline'; ljt.innerHTML = '" + hideText + "'; } else { ljc.style.display = 'none'; ljt.innerHTML = '" + showText + "'; }\">" + showText + "</a><div id=\"ljcomm\" style=\"display: none;\">";
		isDone++;
	}

// Close the div just before the indication-of-reply starts.
	if (isDone == 1 && (emlLines[x].substr(0, 5) == "Their" || emlLines[x].substr(0, 4) == "The ")) {
		emlLines[x - 2] += "</div>";
		isDone++;
	}
}

// Put together the email body, and replace it with the new container.
var newEmail = "";
for (x = 0; x < emlLines.length; x++) {
	newEmail += emlLines[x] + "\n";
}
emlBody.innerHTML = newEmail;
