// ==UserScript==
// @name           Search Lotto to Google
// @namespace      None
// @description    Redirects from the search lotto search to a google search
// @date           01.01.2011
// @version        0.1
// @include        http://searchlotto.co.uk/yhs_frame*
// ==/UserScript==

setTimeout(changeLocation(), 1000);
function changeLocation() {
	//Get Current URL
	var searchURL = location.href;
	//Get the search query
	var i = 0;
	//Find the character just before the query string (should be =)
	while (searchURL.charAt(i) != '=') {
		i++;
	}
	i++;
	var query = "";
	//Add the characters to the string
	while (searchURL.charAt(i) != '&') {
		query = query + searchURL.charAt(i);
		i++;
	}
	//change location
	location = "http://www.google.co.uk/#q="+query;
        return location;
}