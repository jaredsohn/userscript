// ==UserScript==
// @name          Project Free TV Ad Remover
// @namespace     http://www.thegallagher.net
// @description   Gets rid of all ads from Project Free TV.
// @include       http://www.free-tv-video-online.*
// @version       0.3.3
// ==/UserScript==

/*
Changes:
0.2.0 Initial release
0.3.0 Fixed popup block no longer working
0.3.1 Removed old popup code
0.3.2 Fixed popup block again. It is hard to test the popup blocker because the popups only apear sometimes.
0.4.0 Fixed domain name. Changed regex. Hopefully made more efficient.
*/

unsafeWindow.open = function (){};

var removeNodes = [];

var elems = document.body.getElementsByTagName("iframe");
var i = elems.length;
while(i-- > 0)
{
	if(elems[i].width < 400)
		removeNodes.push(elems[i]);
}

var elems = document.body.getElementsByTagName("a");
i = elems.length;
while(i-- > 0)
{
	if(elems[i].innerHTML.match(/^Download in High Definition/i))
		removeNodes.push(elems[i]);
}

document.body.style.display = 'none';
i = removeNodes.length;
while(i-- > 0)
{
	removeNodes[i].parentNode.removeChild(removeNodes[i]);
}
document.body.style.display = 'block';