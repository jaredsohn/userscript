// ==UserScript==
// @name           mitx-grading-indicator
// @namespace      thomasloch
// @version        0.14
// @description    Add indicator which exercises and labs are graded
// @include        https://6002x.mitx.mit.edu/*
// ==/UserScript==

/*

MITx Grading Indicator
----------------------

Add indicator which exercises and labs are graded. Homeworks and labs are
always marked as graded except for the ungraded ones in week 1;
exercise problem sets are marked as ungraded.

*/


unsafeWindow.console.log('Grading loading... ');

function update_titles() {
	var sections = document.getElementsByTagName('section');

	function startswith(haystack, needle) {
		return( haystack.substr(0, needle.length) == needle )
	}

//	for each(var s in sections) {
	for(var s, j = 0; (s = sections[j]) != null; j++) {
		if(s.childNodes[0].nodeName == '#text') continue;
		if(! startswith(s.id, 'main_filename')) continue;

		var heading = s.childNodes[0];
		var problem_title = heading.innerHTML;
		unsafeWindow.console.log(problem_title);

		// mark heading as tagged
		s.insertBefore(document.createTextNode(''), s.firstChild);

		var tagtitle = '';


		// exceptions
		if(startswith(s.id, 'main_filenameL')) {
			tagtitle = 'Ungraded';
		} else if(startswith(s.id, 'main_filenameUsage')) {
			tagtitle = 'Ungraded';
		} else if(s.id == 'main_filenameLab0') {
			tagtitle = 'Ungraded';
		} else if(s.id == 'main_filenameLabsandbox') {
			tagtitle = 'Ungraded';

		// regular matching rules
		} else if(problem_title.match(/H\d+P\d+:/)) {
			tagtitle = 'Graded';
		} else if(problem_title.match(/S\d+E\d+:/)) {
			tagtitle = 'Ungraded';
		} else if(problem_title.match(/Lab \d+:/)) {
			tagtitle = 'Graded';
		} else if(problem_title.match(/Q\d+\s*:/)) {
			tagtitle = 'Graded';

		// fallback: old algorithm
		} else if(startswith(s.id, 'main_filenameHW')) {
			tagtitle = 'Graded';
		} else if(startswith(s.id, 'main_filenameLab')) {
			tagtitle = 'Graded';

		// fallback: don't tag at all
		//} else if(startswith(s.id, 'main_filename')) {
		//	tagtitle = 'unknown status';
		}


		if(tagtitle == '') continue;
		var tag = document.createElement("i");
		tag.appendChild( document.createTextNode(' (' + tagtitle + ')') );
		heading.appendChild(tag);

	}

}

// do the above once every second now. that should be a reasonable trade-off
// between low idle load and usability
setInterval(update_titles, 1000);
//setTimeout(update_titles, 5000);


