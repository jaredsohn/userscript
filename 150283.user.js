// ==UserScript==
// @name        Brood War Homepage
// @namespace   http://www.dabbelt.com/~palmer/software/greasemonkey
// @description Return Brood War to TL's homepage
// @include     http://teamliquid.net/
// @include     http://www.teamliquid.net/
// @version     1.1.3
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* These are just some constants.  I like my scripts less than 80
 * characters wide so I had to give these some short names. */
var xpr = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
document.title = "Team Liquid - Foreign Brood War News Coverage";
var bw = "http://www.teamliquid.net/forum/viewmessage.php?topic_id=367822";
var xh = 'http://www.w3.org/1999/xhtml';

/* Get rid of the little scrolling bit down towards the bottom because
 * there is no cooresponding component in HP's post. */
var list = document.evaluate('//div[@id="news_feed"]',
			     document, null, xpr, null);

if (list.snapshotLength == 1)
{
    var elm = list.snapshotItem(0);
    elm.parentNode.removeChild(elm);
}

/* Fetch the BW homepage. */
var xmlreq = new XMLHttpRequest();
xmlreq.onreadystatechange = function()
{
    if (xmlreq.readyState == 4 && xmlreq.status == 200)
    {
	/* Parses the fetched BW document. */
	var bwdoc = document.implementation.createHTMLDocument("example");
	bwdoc.documentElement.innerHTML = xmlreq.responseText;

	/* Set the main photo */
	var bwlist = bwdoc.evaluate('//div[@id="topnews"]',
				    bwdoc, null, xpr, null);

	list = document.evaluate('//div[@id="main_news_0"]',
				 document, null, xpr, null);

	if (list.snapshotLength == 1 && bwlist.snapshotLength == 1)
	{
	    var elm = list.snapshotItem(0);
	    var bwelm = bwlist.snapshotItem(0);

	    elm.innerHTML = '<link rel=stylesheet href="/staff/HawaiianPig/bwportal/portal.css" media=screen type="text/css"/> <div id="topnews"> <style type="text/css">#topnews { background: url(\'http://www.teamliquid.net/staff/HawaiianPig/SSL/SSLfp.jpg\') no-repeat; width: 504px; height: 348px;}</style>' + bwelm.innerHTML + '</div>';
	}

	/* Set the community news section */
	bwlist = bwdoc.evaluate('//div[@id="commnews"]',
				bwdoc, null, xpr, null);

	list = document.evaluate('//div[@id="right_news"]',
				 document, null, xpr, null);

	if (list.snapshotLength == 1 && bwlist.snapshotLength == 1)
	{
	    var elm = list.snapshotItem(0);
	    var bwelm = bwlist.snapshotItem(0);

	    elm.innerHTML = '<link rel=stylesheet href="/staff/HawaiianPig/bwportal/portal.css" media=screen type="text/css"/> <style type="text/css">#commnews { width: 238px;}</style> <div id="commnews">' + bwelm.innerHTML + '</div>';
	}

	/* Remove the SC2 specific homepage junk */
	list = document.evaluate('//div[@id="news_column_right"]',
				 document, null, xpr, null);
	if (list.snapshotLength == 1)
	{
	    var elm = list.snapshotItem(0);
	    elm.parentNode.removeChild(elm);
	}

	/* Replace the news articles with the latest tournament results. */
	bwlist = bwdoc.evaluate('//div[@id="bwportal"]/div',
				bwdoc, null, xpr, null);

	list = document.evaluate('//div[@id="news_column_mid"]',
				 document, null, xpr, null);

	if (list.snapshotLength == 1 && bwlist.snapshotLength == 6)
	{
	    var elm = list.snapshotItem(0);
	    var bwelm = bwlist.snapshotItem(3);

	    elm.innerHTML = '<div class="bigbox">' + bwelm.innerHTML + '</div>';
	    elm.style.marginRight = "0px";
	    elm.style.width = "567px";
	}

	/* Add a bit of padding below to make it look OK. */
	list = document.evaluate('//div[@id="news_main"]',
				 document, null, xpr, null);

	if (list.snapshotLength == 1)
	{
	    var elm = list.snapshotItem(0);
	    elm.innerHTML = elm.innerHTML + '<style type="text/css">p{font-size: 4pt;}</style><p>&nbsp;</p>';
	}

	/* Remove the bits at the bottom that are SC2 specific. */
	list = document.evaluate('//div[@id="fp_content"]/p',
				 document, null, xpr, null);

	if (list.snapshotLength == 1)
	{
	    var elm = list.snapshotItem(0);
	    elm.parentNode.removeChild(elm);
	}

	list = document.evaluate('//div[@id="fp_content"]/label',
				 document, null, xpr, null);

	if (list.snapshotLength == 1)
	{
	    var elm = list.snapshotItem(0);
	    elm.parentNode.removeChild(elm);
	}

	list = document.evaluate('//input[@id="fp_spoilertoggle"]',
				 document, null, xpr, null);

	if (list.snapshotLength == 1)
	{
	    var elm = list.snapshotItem(0);
	    elm.parentNode.removeChild(elm);
	}
    }
}
xmlreq.open("GET", bw, true);
xmlreq.send();
