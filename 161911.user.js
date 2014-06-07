// ==UserScript==
// @include        https://thepiratebay.se/top/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @id             hide-large-piratebayfiles
// @name           Hide Large PirateBayFiles
// @namespace      userscripts.org
// @description    Hides any files on 'Top' PirateBay in the GB range
// @version        2013.3.13
// @author         asdfddddddd
// @license        MIT License; http://opensource.org/licenses/mit-license
// ==/UserScript==

jQuery(".detDesc").each(function() {
	var size_string = $(this).html();
	if(size_string.length > 10) {
    	size_string = size_string.split(',')[1].substr(6);
    	if(size_string.indexOf("GiB") > -1) {
        	$(this).parents('tr').hide();
    	}
    }
});