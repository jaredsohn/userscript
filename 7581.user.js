// ==UserScript==
// @name          Choads Shoutbox Hack
// @description	  Kills autocomplete for pigs shoutbox.
//  
//			chat 
// @include       *thestudentroom.co.uk/forumdisplay.php?f=143
//			back room
// @include       *thestudentroom.co.uk/forumdisplay.php?f=91
// ==/UserScript==


table = document.getElementById("collapseobj_pigshoutbox"); 
nameBoxHeight = GM_getValue("nameBoxHeight", "64");
shoutBoxHeight = GM_getValue("shoutBoxHeight", "250");
setInputBoxes();
setNamesTable();
setShoutBox();
GM_registerMenuCommand( "Set name box height", setNameBoxHeight);
GM_registerMenuCommand( "Set shout box height", setShoutBoxHeight);


function setInputBoxes() {

	var input = table.getElementsByTagName("input");

	for (var i = 0; i < input.length; i++) {

		if (input[i].name!="target") {

			input[i].setAttribute('autocomplete','off');

			input[i].setAttribute('spellcheck','true');

		}
	}
}

function setNamesTable() {
	var iframes = table.getElementsByTagName("iframe");
	for (var i = 0; i < iframes.length; i++) {
		if (iframes[i].name=="onlineshoutbox") {
			iframes[i].height = nameBoxHeight;
		}
	}
}

function setShoutBox() {
	var iframes = table.getElementsByTagName("iframe");
	for (var i = 0; i < iframes.length; i++) {
		if (iframes[i].name=="pigshoutbox") {
			iframes[i].height = shoutBoxHeight;
		}
	}
}

function setNameBoxHeight(e) {
	nameBoxHeight = prompt("How high? (in pixels)", nameBoxHeight);
	setNamesTable();
	GM_setValue("nameBoxHeight", nameBoxHeight);
}

function setShoutBoxHeight(e) {
	shoutBoxHeight = prompt("How high? (in pixels)", shoutBoxHeight);
	setShoutBox();
	GM_setValue("shoutBoxHeight", shoutBoxHeight);
}
