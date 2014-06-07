// ==UserScript==
// @name           OKCupid: Quickmatch Snitch
// @namespace      tag:brainonfire.net,2008-12-30:okcupid-quickmatch-snitch
// @description    Add more info to QuickMatch screen, such as links to uncropped photos and the user's profile page.
// @include        http://www.okcupid.com/quickmatch
// @version        0.2
// @changelog      Since 0.1: Make images linkable to reveal originals, not cropped or resized.
// ==/UserScript==


/* From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i;
	var arr = [];
	var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

// profile link

var uname = $xpath('//form[@id="essays-form"]//input[@name="sn"]/@value')[0].nodeValue;

var profLink = document.createElement('a');
profLink.appendChild(document.createTextNode(uname));
profLink.setAttribute('href', '/profile/'+encodeURI(uname));

var QM_title_span = $xpath('//div[@id="main_content"]/h1[1]/span')[0];
QM_title_span.parentNode.insertBefore(profLink, QM_title_span.nextSibling);
QM_title_span.parentNode.insertBefore(document.createTextNode(' '), QM_title_span.nextSibling);
QM_title_span.textContent += ':';

// uncropped images

var re_cropscale = /\/([0-9]+x[0-9]+\/){4}/gi;
var bigImage = document.getElementById('user_image');

function repointOrigLink()
{
	try
	{
		var cropSrc = bigImage.getAttribute('src');
		var origSrc = cropSrc.replace(re_cropscale, '/0x0/0x0/0x0/0x0/');
		origLink.setAttribute('href', origSrc);
	}
	catch(e) { GM_log("QuickMatch page structure has changed, couldn't link to uncropped image."); }
	
	return true;
}

var origLink = document.createElement('a');
origLink.setAttribute('title', 'See original, without cropping or scaling');
repointOrigLink();

bigImage.parentNode.insertBefore(origLink, bigImage);
origLink.appendChild(bigImage);

bigImage.addEventListener('DOMAttrModified', repointOrigLink, false);

