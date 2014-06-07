// ==UserScript==
// @author	Mike Markley
// @version	0.1
// @name	splunk-tools
// @grant	none
// @match	*://*/*/manager/*/deployment/serverclass*
// ==/UserScript==

whitelist = document.getElementsByClassName('col-4');
blacklist = document.getElementsByClassName('col-5');

function add_spaces_to_comma_list(target) {
	for (var i=0; i<target.length; i++) {
		var list = target[i].textContent.split(',');
		var content = list[0];
		for (var j=1; j<list.length; j++) {
			content = content + ', ' + list[j];
		}
		target[i].textContent = content;
	}
}

add_spaces_to_comma_list(whitelist);
add_spaces_to_comma_list(blacklist);
