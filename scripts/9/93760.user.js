// ==UserScript==
// @name           ExpressionEngine Changelog Bugtracker Link Adder
// @namespace      bjornbjorn
// @description    Will link #ticket ids from the EE changelog to the EE bugtracker for easier browsing
// @include        http://expressionengine.com/*/changelog.html*
// ==/UserScript==

var bugtracker_url = 'http://expressionengine.com/bug_tracker/bug/';

document.body.innerHTML = document.body.innerHTML.replace(/\(#(\d{3,6}?)\)/g, function(m, key, value){	
	return '(<a href="'+bugtracker_url + key+'">#'+key+'</a>)';
});