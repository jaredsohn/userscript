// ==UserScript==
// @name           TWiki raw edit
// @namespace      http://userscripts.org/users/98568
// @description    Always edit in raw mode
// @include        http://wiki.benon.com/bin/view/
// ==/UserScript==
(function() {
    var mung_edit_button = function(e) {
	var page_contents = document.getElementById('patternMainContents');
	if (!page_contents) {
	    alert("can't find container");
	    return;
	}
	var all_buttons = page_contents.getElementsByTagName('a');
	var count = all_buttons.length;

	for (var i = 0; i < count ; i++) {
	    var button = all_buttons[i];

	    if (button.title == "Edit this topic text") {
		button.href = button.href+";nowysiwyg=1";
		break;
	    }
	}
    };

    // 
    // After load complete, rewrite first edit button in top menu 
    // to be RAW edit
    //
    window.addEventListener('load', mung_edit_button, false);
})();
