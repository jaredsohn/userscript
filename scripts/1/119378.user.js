// ==UserScript==
// @name           Google Tracking Redirection Remover
// @description    Disable click-tracking in Google search result and Google News.
// @version        1.1
// @author         FootRoot
// @include        http://www.google.co*
// @include        https://www.google.co*
// @include        https://encrypted.google.co*
// @include        http://news.google.co*
// @include        https://news.google.co*
// ==/UserScript==

var allLinks = document.getElementsByTagName("a");
window.addEventListener("mouseover", function() {
	for (var i in allLinks)
		{
		if (!allLinks[i].removeAttribute) continue;
		if (allLinks[i].id == null || (allLinks[i].id.indexOf("gb_") == -1 && allLinks[i].id.indexOf("gbztm") == -1))
			{
			allLinks[i].removeAttribute('onmousedown');                    
			if (allLinks[i].target == "_blank" && allLinks[i].href.indexOf("/accounts/") == -1 && window.location.href.match("news"))
				{
				allLinks[i].removeAttribute('class');
				}
			}
		}
}, false);
