// ==UserScript==
// @name           NYTimes.com bypass login
// @namespace      tag:brainofire.net,2008-12-01:nytimes-bypass-login
// @description    Bypass the New York Times login page semi-automatically. (Not totally automatic because I don't wan't to cause the page to go into a loop or prevent users from using the login page normally.)
// @include        http://www.nytimes.com/glogin?URI=http://www.nytimes.com/*
// @version        0.2
// @changelog      Since 0.1: Properly kill cookies.
// ==/UserScript==


/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

function killAllCookies() {
	var inThePast = new Date();
	inThePast.setTime(inThePast.getTime() - 1000); // for good measure
	var killerVal = "whatever; expires="+inThePast.toGMTString()+"; path=/; domain="+document.domain;
	
	var cookies = document.cookie.split(/; /);
	var cookieNames = cookies.map(
		function(el, i, all) {
			return el.split(/=/, 1);
		});
	cookieNames.forEach(
		function(el, i, all) {
			document.cookie = el + "=" + killerVal;
		});
}

var bypassButton = undefined;

function placeButton()
{
	var regCell = $xpath('//td[span[@class="regiTextTitle"]]')[0];
	regCell.innerHTML = '<button id="bypass-login">Bypass login</button>';
	bypassButton = $xpath('button[@id="bypass-login"]', regCell)[0];
	bypassButton.setAttribute('title', 'Added by Greasemonkey script: "NYTimes.com bypass login"');
	bypassButton.setAttribute('style', 'background-color: #500; color: white;');
	bypassButton.addEventListener('click', doGetLink, false);
}

function doGetLink(ev)
{
	bypassButton.innerHTML = 'Getting auth...';

	GM_xmlhttpRequest({
		'method': 'GET',
		'url': 'http://nytimes.blogspace.com/genlink?q='+encodeURIComponent(destination),
		'onload':afterGetLink,
		'onerror':failGetLink
	});
}

function failGetLink(xhr)
{
	bypassButton.innerHTML = 'Failed!';
}

function afterGetLink(xhr)
{
	var resp = xhr.responseText;
	var found = false;
	
	var destInContext = ' href="'+destination+'?';

	var bypasserContext = resp.indexOf(destInContext);
	var bypasserStarts = bypasserContext + destInContext.length;
	var bypasserEnds = resp.indexOf('"', bypasserStarts);
	var bypasserQuery = resp.substring(bypasserStarts, bypasserEnds);
	
	killAllCookies();
	
	document.location = destination + '?' + bypasserQuery;
}

var destination = location.href.match(/\?URI=(http:\/\/www\.nytimes\.com\/[^&]+\.html)/)[1];
placeButton();
