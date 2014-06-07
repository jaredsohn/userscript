// ==UserScript==
// @name           Google Logo
// @namespace      com.blogspot.dy-verse
// @description    Replaces the Google Logo on the search page with the one on the Home Page
// @include        http://www.google.com/search*
// @include        http://www.google.co.in/search*
// ==/UserScript==

var homePage = document.createElement("div");
document.body.appendChild(homePage);

GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.google.com/",
    headers: 
	{
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) 
	{
		homePage.innerHTML = responseDetails.responseText;
		var logoNode = unsafeWindow.document.getElementById("lgpd").nextSibling;
		var logoHTML = "<" + logoNode.nodeName + " ";
		for (var i = 0; i < logoNode.attributes.length; i++)
		{
			logoHTML += " " + logoNode.attributes[i].localName + "=\'" + logoNode.attributes[i].nodeValue + "\'";
		}
		logoHTML += " >";
		logoHTML += logoNode.innerHTML + "</ " + logoNode.nodeName + ">";
	
		document.getElementById("logo").parentNode.innerHTML = logoHTML;
		homePage.innerHTML = "";
    }
});