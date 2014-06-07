// ==UserScript==
// @name        Tag Locator for ccMixter
// @namespace   ccMixter
// @version 0.1
// @description Creates a simple text field above which helps to locate the tags
// @include  http://ccmixter.org/view/media/samples/browse
// @require  http://code.jquery.com/jquery-latest.js
// ==/UserScript==

var j = jQuery.noConflict();

// HTML

j('#picker_caption').before('<div><span style="display: block; margin: 8px 4px; font-weight: bold;"> Tag locator</span><input type="text" id="tagLocator" style="width: 203px; margin: 0px 0px 5px 3px;"></div>')


// FNs

j('#tagLocator').keyup(function(e,o) {

	var val = this.value;

	if (!val || val == '') {
		j('#taglist tr').show();
		return
	}


	j('#taglist .tb').parents('tr').hide();

	j('#taglist .tb').find("label:contains('" + val + "')").parents('tr').show();

})






























