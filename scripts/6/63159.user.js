// ==UserScript==
// @name           OpenByGoogleDocs 
// @namespace      c4software,modified by wyborne
// @include        *
// ==/UserScript==


var hrefs = document.getElementsByTagName("a"); 

for (var i = 0; i < hrefs.length; i++) 
{
	var re = new RegExp("^http.*\.doc$");
	if (hrefs[i].href.match(re)) {
		var uri=escape(hrefs[i].href);
		hrefs[i].href="http://docs.google.com/viewer?url="+uri;
	}
}