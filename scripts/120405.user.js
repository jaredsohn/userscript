// ==UserScript==
// @name           xrel-filter
// @namespace      de.uo.duck
// @include        http://www.xrel.to/movie*
// @include        http://www.xrel.to/tv*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

debug = false;

jQuery.fn.justtext = function() {
     return $(this)  .clone()
            .children()
            .remove()
            .end()
            .text();
};

function isBlacklisted(value, list)
{
	for (idx=0;idx<list.length;idx++){
	
		if(value.match(list[idx])) {
			return true;
		}
	}
	return false;
}
/*
EXAMPLES:
	'release_name'     : [/TESTGRP$/, /S[0-9]+E[0-9]+/, /^Glee/],
	'release_audio'    : [/LineDubbed/, 'MicDubbed'],
	'release_type'     : [/DVD-Rip/],
	'release_category' : ['MDVDR'],
*/
var blacklist = {
	'release_name'     : [],
	'release_audio'    : ['LineDubbed', 'MicDubbed'],
	'release_type'     : [],
	'release_category' : [],
};

//blacklist.release_name
releases = $('a span', 'div.release_title');
$.each(releases, 
	function() {
		if ($(this).hasClass('truncd')) {
			var value = $(this).attr('title');
		} else {
			var value = $(this).text();
		}
		
		if (isBlacklisted(value, blacklist.release_name)) {
				if (debug) {
					console.log(value);
					console.log('release_name', blacklist.release_name);				
				}
				$(this).parent().parent().parent().hide();
		}
    }
);

//blacklist.release_audio
releases = $('span.sub', 'div.release_type');
$.each(releases, 
	function() {
		var value = $(this).text().trim();
		
		if (isBlacklisted(value, blacklist.release_audio)) {
				if (debug) {
					console.log(value);
					console.log('release_audio', blacklist.release_audio);				
				}
				$(this).parent().parent().hide();
		}
    }
);

//blacklist.release_type
releases = $('div.release_type');
$.each(releases, 
	function() {
		var value = $(this).justtext().trim();
		
		if (isBlacklisted(value, blacklist.release_type)) {
				if (debug) {
					console.log(value);
					console.log('release_type', blacklist.release_type);				
				}
				$(this).parent().hide();
		}

    }
);

//blacklist.release_category
releases = $('a span', 'div.release_cat');
$.each(releases, 
	function() {
		var value = $(this).text().trim();
		
		if (isBlacklisted(value, blacklist.release_category)) {
				if (debug) {
					console.log(value);
					console.log('release_category', blacklist.release_category);				
				}
				$(this).parent().parent().parent().hide();
		}

    }
);




