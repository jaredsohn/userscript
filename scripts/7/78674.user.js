// ==UserScript==
// @name		Grepolis Re-Title
// @namespace	http://userscripts.org/users/5860
// @description	Removes the title of the Grepolis site to see your city names easier.
// @include		*.grepolis.*
// @author		SirCasey, based off the script by Vaughan Chandler, http://userscripts.org/scripts/show/9731
// ==/UserScript==

// Last updated June 9 2010

var matches = {
"^http://[a-z0-9\s]+\.grepolis\.com/": "^grepolis - "
};

for (var url in matches) {
    if (location.href.match(new RegExp(url))) {
        document.title = document.title.replace(new RegExp(matches[url],'i'),'');
        break;
    }
}