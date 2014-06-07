// ==UserScript==
// @name           Shortnews Feed Redirect
// @namespace      http://nohomepageyet.de
// @include        http://da.feedsportal.com/*/*/*/*/*/*/*/0L0SShortNews0Bde*
// ==/UserScript==

redirectToShortnewsArticleUrl();

function redirectToShortnewsArticleUrl()
{
	var body = document.body;
	
	var articleUrl = body.childNodes[0].childNodes[0].childNodes[0].href;
	//alert(articleUrl);
	
	location.href = articleUrl;
}