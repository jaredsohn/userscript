// ==UserScript==
// @name           [HFR] Google +1
// @namespace      nhttp://mycrub.info
// @include        http://forum.hardware.fr/forum2.php*
// @include        http://forum.hardware.fr/*/*/*/*-sujet_*_*.htm*
// ==/UserScript==

var img, src;
var rehost = GM_getValue("ar_rehost_site", "http://hfr-rehost.net/");

var getElementByXpath = function (path, element)
{
	var arr = Array(), xpr = document.evaluate(path, element, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for (;item = xpr.iterateNext();) arr.push(item);
	return arr;
}

var root = document.getElementById('mesdiscussions');
getElementByXpath('//table//tr[contains(@class, "message")]//div[contains(@class, "toolbar")]', root).filter(function(toolbar)
{	
	var case1 = toolbar.parentNode.previousSibling;
	var url;
	getElementByXpath('div[@class="right"]//a[starts-with(@href, "#")]', case1).filter(function(anchor) {
		url=anchor;
	});

	var plusOne = document.createElement('g:plusone');
	plusOne.setAttribute('size', 'small');
	plusOne.setAttribute('href', url);

	var newDiv = document.createElement('div');
	newDiv.className = 'right';
	newDiv.appendChild(plusOne);
	toolbar.insertBefore(newDiv, toolbar.lastChild);
}
);

var body=document.getElementsByTagName('body')[0];
var script = document.createElement('script');
script.type="text/javascript";
script.src="https://apis.google.com/js/plusone.js";
body.insertBefore(script, body.lastChild);

