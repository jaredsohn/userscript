// ==UserScript==
// @name           eMule Search
// @namespace  http://emule-fans.com/
// @author         tomchen1989
// @homepage   http://emule-fans.com/emule-search-browser-plugins/
// @description  Search for selected text in eD2k network using eMule
// @include        *
// @version        0.1
// ==/UserScript==
/*
This is an userscript, it works in Google Chrome, Firefox Greasemonkey, Opera, IE Trixie, etc.
Select text in your browser. Then press hotkey to search for the selected text in eD2k network using eMule.
You can configure the hotkey in the "settings" below. Default is ctrl + q.
*/
(function () {

var settings = {
	ctrl: true,
	shift: false,
	key: "q"
};

var key = {
	"0":48, "1":49, "2":50, "3":51, "4":52, "5":53, "6":54, "7":55, "8":56, "9":57,
	"a":65, "b":66, "c":67, "d":68, "e":69, "f":70, "g":71, "h":72, "i":73, "j":74, "k":75, "l":76, "m":77, "n":78, "o":79, "p":80, "q":81, "r":82, "s":83, "t":84, "u":85, "v":86, "w":87, "x":88, "y":89, "z":90,
	"F1":112, "F2":113, "F3":114, "F4":115, "F5":116, "F6":117, "F7":118, "F8":119, "F9":120, "F10":121, "F11":122, "F12":123
};

function emulesearch(e) {
	var e = e || window.event;
	var src = e.target || e.srcElement;
	if (e.ctrlKey == settings.ctrl && e.shiftKey == settings.shift && e.keyCode == key[settings.key]) {
		var sel;
		if (document.selection && document.selection.type == "Text" && document.selection.createRange) {
			sel = document.selection.createRange().text;
		} else if (src.tagName == "TEXTAREA" && src.selectionStart !== "undefined" && src.selectionEnd !== "undefined") {
			var start = src.selectionStart;
			var end = src.selectionEnd;
			sel = src.value.substring(start, end);
		} else if (window.getSelection) {
			sel = window.getSelection();
		}
		sel = encodeURIComponent(sel);
		if (sel === "") {
			return false;
		}
		sel = "ed2k://|search|" + sel + "|/";
		window.location = sel;
	}
}

function addEventS(el, evt, fn){
	if (el.addEventListener) {
		el.addEventListener(evt, fn, false);
	} else if (el.attachEvent) {
		el.attachEvent("on" + evt, fn);
	}
}

addEventS(document, "keydown", emulesearch);

})();