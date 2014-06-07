// ==UserScript==
// @name LL Quick Tags
// @description Enables ctrl + b, ctrl + i, etc for inserting tags into posts
// @include http://*.endoftheinter.net/postmsg.php*
// @include https://*.endoftheinter.net/postmsg.php*
// @include http://*.endoftheinter.net/postmsg.php
// @include https://*.endoftheinter.net/postmsg.php
// @include http://boards.endoftheinter.net/showmessages.php*
// @include https://boards.endoftheinter.net/showmessages.php*
// @include http://links.endoftheinter.net/linkme.php*
// @include https://links.endoftheinter.net/linkme.php*
// @include http://links.endoftheinter.net/add.php
// @include https://links.endoftheinter.net/add.php
// @include http://links.endoftheinter.net/add.php*
// @include https://links.endoftheinter.net/add.php*
// @include http://endoftheinter.net/priv.php*
// @include http://www.endoftheinter.net/priv.php*
// @include http://endoftheinter.net/priv.php*
// @include http://www.endoftheinter.net/priv.php*
// @include https://endoftheinter.net/priv.php*
// @include https://www.endoftheinter.net/priv.php*
// ==/UserScript==

var allTextareas, textarea;
allTextareas = document.getElementsByTagName('textarea');
if (allTextareas.length != 0) {
textarea = allTextareas[0];

var alt = false;
var boldtext = false;
var italictext = false;
var spoilertag = false;
var underlinetext = false;
var pretag = false;
var quotetag = false;
var modtag = false;

function formatting(e) {
	if (e.ctrlKey) {
		alt = true;
	}
	if (alt && e.which == 73) {	
		italictext = insertTag("i", italictext);
		e.preventDefault();
	}
	if (alt && e.which == 66) {
		boldtext = insertTag("b", boldtext);
		e.preventDefault();
	}
	if (alt && e.which == 71) {
		modtag = insertTag("mod", modtag);
		e.preventDefault();
	}
	if (alt && e.which == 80) {
		pretag = insertTag("pre", pretag);
		e.preventDefault();
	}
	if (alt && e.which == 81) {
		quotetag = insertTag("quote", quotetag);
		e.preventDefault();
	}
	if (alt && e.which == 83) {
		spoilertag = insertTag("spoiler", spoilertag);
		e.preventDefault();
	}
	if (alt && e.which == 85) {
		underlinetext = insertTag("u", underlinetext);
		e.preventDefault();
	}
	if (alt && e.which == 77) {
		spoilertag = insertTag("s", spoilertag);
		e.preventDefault();
	}
	
}

function releaseCtrl(e) {
	if (alt == true && !e.ctrlKey) {
		alt = false;
	}
}

function insertTag(tag, boolean) {
	var spaceBefore = textarea.selectionStart;
	var vOffset = textarea.scrollTop;
	if (spaceBefore == textarea.selectionEnd) {
		if (tag == 's') {
			if (!boolean) {
				var caption = prompt("Please enter a caption for your spoiler tag.");
				if (caption != null) {
					var insert = "<spoiler caption=\"" + caption + "\">";
				} else {
					var insert = "<spoiler>";
				}
			} else {
				var insert = "</spoiler>";	
			}
		} else {
			if (!boolean) {
				var insert = "<" + tag + ">";
			} else {
				var insert = "</" + tag + ">";
			}
		}
		textarea.value = textarea.value.substr(0, spaceBefore) + insert + textarea.value.substr(spaceBefore);
		textarea.setSelectionRange(spaceBefore + insert.length, spaceBefore + insert.length);
		if (boolean) {
			boolean = false;
		} else {
			boolean = true;	
		}	
	} else {
		var selectionLength = textarea.selectionEnd - textarea.selectionStart;
		var parta = textarea.value.substr(0, spaceBefore);
		var partb = textarea.value.substr(spaceBefore, selectionLength);
		var partc = textarea.value.substr(spaceBefore + selectionLength);
		if (tag == 's') {
			var caption = prompt("Please enter a caption for your spoiler tag.");
			if (caption != null) {
				var captiontag = "<spoiler caption=\"" + caption + "\">";
			} else {
				var captiontag = "<spoiler>";
			}
			textarea.value = parta + captiontag + partb + "</spoiler>" + partc;
			textarea.setSelectionRange(spaceBefore + captiontag.length, spaceBefore + captiontag.length + selectionLength);
		} else {
			textarea.value = parta + "<" + tag + ">" + partb + "</" + tag + ">" + partc;
			textarea.setSelectionRange(spaceBefore + tag.length + 2, spaceBefore + tag.length + 2 + selectionLength);
		}
		
	}
	textarea.scrollTop = vOffset;
	return boolean;
}

textarea.addEventListener('keydown', formatting, true);
textarea.addEventListener('keyup', releaseCtrl, true);
}