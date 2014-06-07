// ==UserScript==
// @name           4chan quick spoiler tag inserter
// @namespace      Seiba
// @description    Inserts spoiler tags when ALT-Z is pressed.
// @version        1.1
// @include        http://boards.4chan.org/*
// @include        http://bunbunmaru.com/*
// ==/UserScript==
var altdown = false;
function KeyUp(e) {
	if (e.which == 18) altdown=false;
}
function KeyDown(e){
	if(e.which == 18) altdown=true;
	if(e.which == 90 && altdown == true) {
		if (window.location.href.indexOf("boards.4chan.org") != -1) {
			if(document.getElementsByName("com")[1] != null) {
				inserttxt(document.getElementsByName("com")[1]);
				}
			else {
				inserttxt(document.getElementsByName("com")[0]);
			}
		} else if (window.location.href.indexOf("bunbunmaru.com") != -1) {
			inserttxt(document.getElementsByName("field4")[0]);
		}
altdown=false;
	}
}
function inserttxt(o){
var start = o.selectionStart;
var end = o.selectionEnd;
	if(o.setSelectionRange) {
		o.value = o.value.substr(0, start) + '[spoiler][/spoiler]' + o.value.substr(end, o.value.length);
		o.setSelectionRange(start+9,start+9);
	}
}
window.addEventListener('keydown', KeyDown, true);
window.addEventListener('keyup', KeyUp, true);