// ==UserScript==
// @name           mitx-exercises-goodies
// @namespace      thomasloch
// @version        0.11
// @description    Add some extra features to the problem set pages (successor of mitx-entry-fields)
// @include        https://6002x.mitx.mit.edu/courseware/*
// ==/UserScript==

/*

MITx Exercises Goodies
----------------------

Add some extra features to the problem set pages:
- check-on-enter behaviour
- resize entry fields
- add pop-out function to images
- improve window title

*/

var sections = document.getElementsByTagName('section');
var course_content;
for(var s, j = 0; (s = sections[j]) != null; j++) {
	if(s.className == 'course-content') {
		course_content = s;
		break;
	}
}

var old_title = window.document.title;

unsafeWindow.console.log('Exercise goodies loading...');

function update_inputs() {


	function startswith(haystack, needle) {
		return( haystack.substr(0, needle.length) == needle );
	}

	var inputs = document.getElementsByTagName('input');
//	for each(var inp in inputs) {
	for(var inp, j = 0; (inp = inputs[j]) != null; j++) {
		// have an entry field (that we didn't process yet!)
		if(! startswith(inp.id, "input_filename")) continue;
		if(inp.style.width == "100%") continue;

		// resize field
		inp.style.width = "100%";

		// add check on enter action
		var button_id = inp.id.replace(/_\d+_\d+$/, '').replace(/^input_/, 'check_');
		eval("inp.onkeypress = function(e) {" +
			"if(e && e.keyCode == 13) {" +
				// this has the button ID compiled in so we don't have
				// issues with variables in the greasemonkey sandbox
				// suddenly disappearing...
				"document.getElementById('" + button_id + "').click();" +
				"return false;" +
			"} else {return true;}" +
		"}");

	}



	// /static/circuits/sensor-thevenin.gif

	var prefix = "/static/circuits/";
	var plen = prefix.length;

	var images = document.getElementsByTagName('img');
//	for each(var img in images) {
	for(var img, j = 0; (img = images[j]) != null; j++) {
		var src = img.getAttribute('src');
		// have an image field (that we didn't process yet!)
		if(! startswith(src, prefix)) continue;
		if(img.style.cursor == 'pointer') continue;

		eval("img.onclick = function(e) {" +
			'window.open("' + src + '",' +
			' "mitx-popoutimage-' + src.substr(plen) + '",' +
			' "width=' + img.width + ',height=' + img.height + ',resizable=yes").focus();' +
		'}');

		img.style.cursor = 'pointer';
		img.setAttribute('title', 'Click to pop out');

	}

	// get window title right
	if(course_content) {
		var h1 = course_content.getElementsByTagName('h1');
		var h2 = course_content.getElementsByTagName('h2');
		var new_title;
		if(h1 && h1[0]) {
			new_title = h1[0].innerHTML + ' - ' + old_title;
		} else if(h2 && h2[0]) {
			new_title = h2[0].childNodes[0].data + ' - ' + old_title;
		} else {
			new_title = old_title;
		}
		if(new_title && (window.document.title != new_title)) window.document.title = new_title;
	}

}

// do the above once every second now. that should be a reasonable trade-off
// between low idle load and usability
setInterval(update_inputs, 1000);




