// ==UserScript==
// @description Replace URLs with inline preview.
// @grant       none
// @include     http://boards.4chan.org/*/*
// @include     https://boards.4chan.org/*/*
// @name        4chan inliner
// @namespace   http://userscripts.org/users/nescafe
// @version     3
// ==/UserScript==

var
g_oElement,
g_sElementHTML,
g_a_oElementList = document.getElementsByTagName('blockquote'),
g_iElementIndex = g_a_oElementList.length;

while (0 !== g_iElementIndex--)
{
	g_oElement = g_a_oElementList[g_iElementIndex];
	if ('postMessage' === g_oElement.className)
	{
		g_sElementHTML = g_oElement.innerHTML;
		if (-1 !== g_sElementHTML.search('pastebin.com'))
		{
			g_sElementHTML = g_sElementHTML.replace(/(?:http:\/\/)?pastebin\.com\/([A-Za-z0-9]+)/, '<iframe height="315" src="http://pastebin.com/embed_iframe.php?i=$1" style="border:0" width="560" />');
		}
		if (-1 !== g_sElementHTML.search('youtube.com'))
		{
			g_sElementHTML = g_sElementHTML.replace(/(?:http:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9]+)/, '<iframe height="315" src="http://www.youtube.com/embed/$1" style="border:0" width="560" allowfullscreen />');
		}
		g_oElement.innerHTML = g_sElementHTML;
	}
}
