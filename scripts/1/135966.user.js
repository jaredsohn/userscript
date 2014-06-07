// ==UserScript==
// @name        AdFlyAway
// @description Remove adf.ly and anonym.to from links on a selected sites
// @description If you're using TamperMonkey you can customize the affected 
// @description sites by overriding @include tags in the script settings tab
// @include     *viewtopic.php*
// @include     *showthread.php*
// @version     1.3
// ==/UserScript==
(function() {
//########################################
//# Remove Anonym/AdFly ##################
//########################################
function remove_redirects()
{
	element = document.getElementsByTagName("a");
	for(var i = 0; i < element.length; i++)
	{
		if(element[i].href.match("http://(adf.ly|anonym.to|linkbucks.com)/(.*)/"))
		{
			if(element[i].href.match("https://"))
			{
				element[i].href = element[i].href.substr(element[i].href.lastIndexOf("https://"));
			} else {
				element[i].href = element[i].href.substr(element[i].href.lastIndexOf("http://"));
			}
		}
	}
}
    
var allLinks = document.evaluate(
	'//a['+
		'starts-with(@href, "http://") '+

	']',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
remove_redirects();

})();