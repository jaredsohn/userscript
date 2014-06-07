// ==UserScript==
// @name           DW Insert Username
// @namespace      http://twilite.org/~xtina/
// @description    Inserts a user tag with "site" attribute into your post.
// @include        http://www.dreamwidth.org/update*
// @include        http://dreamwidth.org/update*
// @include        http://www.dreamwidth.org/editjournal*
// @include        http://dreamwidth.org/editjournal*
// ==/UserScript==

// Set the menu.
GM_registerMenuCommand("DW Insert Username: Default Site", setHead);

// The options window.
function setHead() {
	editWindow = window.open("about:blank", "_blank", "width=280, height=370, resizable=1");

// Set the style.
	editWindow.document.writeln('<html><head><style type="text/css">');
	editWindow.document.writeln('form {	width: 240px; border: 1px solid #9CF; padding: 0 10px;  }');
	editWindow.document.writeln(' p, td { font-family: Verdana, Tahoma, "Segoe UI", sans-serif; font-size: 10pt; color: #036; }');
	editWindow.document.writeln('</style>	</head><body>');

// Open the form, and warn.
	editWindow.document.writeln("<form name='insert_opts' action='about:blank'>");

	editWindow.document.writeln("<p>Which LJ-esque site would you like to set as the default?</p>");

	editWindow.document.writeln("<p style='text-align: center;'><table border=1 cellpadding=5 cellspacing=-1>");

// LJ-esque and other supported sites.
	var allEsques = new Array(
		"AO | ArchiveOfOurOwn.org"
		,"BL | Blurty.com"
		,"CJ | CommieJournal.com"
		,"DJ | DeadJournal.com"
		,"IJ | InsaneJournal.com"
		,"IS | Inksome.com"
		,"JF | JournalFen.net"
		,"LJ | LiveJournal.com"
		,"TW | Twitter.com"
	);

	editWindow.document.writeln("<tr><td><input type='radio' name='esque' value='DW'");
	if (GM_getValue("esque", "DW") == "DW") { editWindow.document.writeln(" checked"); }
	editWindow.document.writeln("></td><td>DreamWidth.org (default)</td></tr>");

	for (var x = 0; x < allEsques.length; x++) {
		editWindow.document.writeln("<td><input type='radio' name='esque' value='" + allEsques[x].split(" | ")[0] + "'");
		if (GM_getValue("esque", "DW") == allEsques[x].split(" | ")[0]) { editWindow.document.writeln(" checked"); }
		editWindow.document.writeln(" /></td><td>" + allEsques[x].split(" | ")[1] + "</td></tr>");
	}
	editWindow.document.writeln("</table></p>");

// Submit button.
	editWindow.document.writeln("<p style='text-align: center;'><input type='submit' value='Set Default LJ-esque Site' /></p>");
	editWindow.document.writeln("</form>");
	editWindow.document.writeln("</body></html>");

	editWindow.document.close();

	var form = editWindow.document.forms.namedItem("insert_opts");
	form.addEventListener("submit", processForm, true);
	editWindow.focus();
}

// Process the form - set all the elements.
function processForm() {
	var form = editWindow.document.forms.namedItem("insert_opts");

	var esque = editWindow.document.getElementsByName("esque");
	for (var x = 0; x < esque.length; x++) {
		if (esque[x].checked) {
			GM_setValue("esque", esque[x].value);
			break;
		}
	}
	editWindow.close();

	var reLoad = confirm("You will need to reload to change the default.\n\nReload now?  OK for reload, Cancel to remain here.\n\n");
	if (reLoad) { location.reload(); }
}


// Get the HTML Tools line (insert image/media).
var htmlTools = document.getElementById("htmltools")

// Gwar, default.
var hiddenItem = document.createElement("span");
hiddenItem.innerHTML = GM_getValue("esque", "DW");
hiddenItem.setAttribute("id", "gm-hidden-default");
hiddenItem.style.display = "none";
document.getElementsByTagName("body")[0].appendChild(hiddenItem);

// That line only exists in HTML mode.
if (htmlTools) {
	htmlTools = htmlTools.childNodes[1];

// Create the LI item and link.
	var newItem = document.createElement("li");
	var newLink = document.createElement("a");

	newLink.href = "javascript:(" + function() {


// LJ-esque and other supported sites.
		var allEsques = new Array(
			"AO | ArchiveOfOurOwn.org"
			,"BL | Blurty.com"
			,"CJ | CommieJournal.com"
			,"DJ | DeadJournal.com"
			,"IJ | InsaneJournal.com"
			,"IS | Inksome.com"
			,"JF | JournalFen.net"
			,"LJ | LiveJournal.com"
			,"TW | Twitter.com"
		);

// Combine for the msgbox.
		var allMsg = "";
		for (var x = 0; x < allEsques.length; x++) {
			allMsg += allEsques[x].split(".")[0];
			allMsg += "\n";
		}

// Did the user select text for this?  If so, grab it.
		var myField = document.getElementById("draft");
		var selectedText = "";
		if (myField.selectionStart != undefined) {
			var posBef = myField.selectionStart;
			var posAft = myField.selectionEnd;
			selectedText = myField.value.substring(posBef, posAft)
		}

// Get the default.
		var defEsque = document.getElementById("gm-hidden-default").innerHTML;

// Ask the user for the user/site.
		var ljName = prompt("What user name?", selectedText);
		if (ljName) {var ljSite = prompt("What LJesque site?  Use the full name or the initials.\n\nBlank out to leave at DW.\n\n" + allMsg + "\n", defEsque); }
		if (ljSite) {

// You, too, can make sure the information is present and valid before continuing!
			ljName = ljName.toLowerCase();
			var tmp = "";
			var onlyThese = /[A-Za-z0-9-_]/gi;
			for (x = 0; x < ljName.length; x++) {
				if (ljName[x].search(onlyThese) >= 0) { tmp += ljName[x]; }
			}
			ljName = tmp;
			if (ljSite == "") { ljSite = 'dw'; }
			ljSite = ljSite.toLowerCase();

// Match with the username/site list above, if possible.
			for (x = 0; x < allEsques.length; x++) {
				var esqueOne = allEsques[x].split(" | ")[0].toLowerCase();
				var esqueTwo = allEsques[x].split(" | ")[1].toLowerCase();
				if (ljSite.indexOf(esqueOne) > -1 || ljSite.indexOf(esqueTwo) > -1) {
					ljSite = allEsques[x].split(" | ")[1];
					var found = true;
					break;
				}
			}

// Format, hoot hoot.
			var newTag = "<user name=\"" + ljName + "\"";
			if (ljSite != "") { newTag += " site=\"" + ljSite + "\""; }
			newTag += " />";

// Insert at cursor position in the draft.  Because I am so pretty.
			if (myField.selectionStart || myField.selectionStart == '0') {
				var startPos = myField.selectionStart;
				var endPos = myField.selectionEnd;
				myField.value = myField.value.substring(0, startPos) + newTag + myField.value.substring(endPos, myField.value.length);
			} else {
				myField.value += newTag;
			}

// Put the cursor back, you fiend!
// ...this needs a bit of work.
			myField.focus();
			if (posBef) {
				posBef += newTag.length;
				myField.setSelectionRange(posBef, posBef);
			}
		}
	} + ")();";

// Add the link to the toolbar.
	newLink.innerHTML = "<img src=\"http://s.dreamwidth.org/img/silk/identity/user.png\" border=\"0\" style=\"vertical-align: middle;\" alt=\"Add LJesque User\" title=\"Add LJesque User\" /> Add LJesque User";
	newItem.appendChild(newLink);
	htmlTools.appendChild(newItem);
}
