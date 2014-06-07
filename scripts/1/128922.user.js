// ==UserScript==
// @name           mitx-entry-fields
// @namespace      thomasloch
// @version        0.06
// @description    Add check-on-enter and resize entry fields in exercises, add pop-out function to images in exercises
// @include        https://6002x.mitx.mit.edu/courseware/*
// ==/UserScript==

function update_inputs() {
	var inputs = document.getElementsByTagName('input');

	for each(var inp in inputs) {
		// have an entry field (that we didn't process yet!)
		if( (inp.id.match("^input_filename") == "input_filename") &&
			(inp.style.width != "100%") ) {

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
	}


	var images = document.getElementsByTagName('img');

	// /static/circuits/sensor-thevenin.gif

	var prefix = "/static/circuits/";
	var plen = prefix.length;

	for each(var img in images) {
		// have an entry field (that we didn't process yet!)
		var src = img.getAttribute('src');
		if( src.substr(0, plen) == prefix ) {
			if(img.getAttribute('onClick')) continue;
			console.log('> ' + src.substr(plen) );
			img.setAttribute('onClick',
				'window.open("' + img.getAttribute('src') + '",' +
				' "mitx-popoutimage-' + src.substr(plen) + '",' +
				' "width='+img.width+',height='+img.height+',resizable=yes").focus();'
			);
			img.style.cursor = 'pointer';
			img.setAttribute('title', 'Click to pop out');


		}
	}

}

// do the above twice every second now. that should be a reasonable trade-off
// between low idle load and usability
setInterval(update_inputs, 500);




