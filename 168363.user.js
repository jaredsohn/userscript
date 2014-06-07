// ==UserScript==
// @name        eNLinkify
// @namespace   DutchSaint
// @description Converts text like NL30918 into a clickable link. Based on LLinkify by pendevin
// @include     http://*nolinks.net/boards/viewtopic.php*
// @version     0.4
// ==/UserScript==

// VERSION HISTORY
// ---------------
// 0.4 - (08 Mar 2014) Code optimization. I was apparently drunk when I wrote the first version.
// 0.3 - Included a version history
// 0.2 - Made the regex match case-insensitive
// 0.1 - Initial Version

// Code based on http://stackoverflow.com/a/3365999
var nl_regex = /NL[0-9]+/ig;
var match, matches = [];
var new_link;
var full_code = document.body.innerHTML;

while ((match = nl_regex.exec(document.body.innerHTML)) != null) matches.push(match.toString());

for (var ii = 0; ii < matches.length; ii++) {
	new_link = '<a target="_blank" href="http://nolinks.net/boards/viewtopic.php?id=' +
	matches[ii].substring(2)+'">'+matches[ii]+'</a>';
	
	var global_regex= new RegExp(matches[ii].toString(), "ig");
	document.body.innerHTML = document.body.innerHTML.replace(global_regex,new_link);
}