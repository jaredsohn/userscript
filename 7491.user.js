// ops.user.js
//
// Copyright 2007-2008, Michael Devore
// This file is licensed under the terms of the Artistic License.
// See http://www.opensource.org/licenses/artistic-license.php for the license itself.
//
// This is a Greasemonkey script.
// See http://greasemonkey.mozdev.org/ for more information on Greasemonkey.
//
// ==UserScript==
// @name          Oust-spammer phpBB Script
// @namespace     http://www.devoresoftware.com/gm/ops
// @description	Streamline deletion of spammy user registrations for phpBB 2.x
// @include       http://www.devoresoftware.com/forum/memberlist.php*
// @include       http://devoresoftware.com/forum/memberlist.php*
// @include       http://www.devoresoftware.com/phpBB2/memberlist.php*
// @include       http://devoresoftware.com/phpBB2/memberlist.php*
// @include       http://www.devoresoftware.com/forum/viewforum.php*
// @include       http://devoresoftware.com/forum/viewforum.php*
// @include       http://www.devoresoftware.com/phpBB2/viewforum.php*
// @include       http://devoresoftware.com/phpBB2/viewforum.php*
// @include       http://www.devoresoftware.com/phpBB2/admin/index.php*
// @include       http://devoresoftware.com/phpBB2/admin/index.php*
// @include       http://www.devoresoftware.com/phpBB2/admin/admin_users.php*
// @include       http://devoresoftware.com/phpBB2/admin/admin_users.php*
// ==/UserScript==
//
// Work begun, February 2007
// Version 1.0, released February 2007
// Version 2.0, released early March 2007
// Version 2.5, released mid-March 2007
// Version 3.0, released early April 2007
// Version 3.1, released mid-April 2008
// Version 4.0, released mid-October 2008

var neverDeleteList = [
	"mdevore",
	"Flying Spaghetti Monster"
];

var stopIfHitList = [
//	"mdevore",
//	"nico"
];

var showEmailAddress = false;
var showWebsiteAddress = false;
var emailNode = null;
var websiteNode = null;
var aAnchorEmailNodes = new Array();
var aImgEmailNodes = new Array();
var aSpanEmailNodes = new Array();
var aAnchorWebsiteNodes = new Array();
var aImgWebsiteNodes = new Array();
var aSpanWebsiteNodes = new Array();
var aTopicLinks = new Array();
var listCount = 0;
var trueText = "true";
var falseText = "false";
var offText = "off";
var onText = "on";
var xText = "x";
var buttonText = "button";
var spanText = "SPAN";
var trText = "TR";
var tdText = "TD";
var gbTopicActionsOn = true;

function resetDeletedNames()
{
	GM_setValue("namesToDeletePending", falseText);
	GM_setValue("deletedNamesList", "");
	GM_setValue("phaseType", "lookupPhase");
}

function deleteChecked(event)
{
	if (event != null)
	{
		event.preventDefault();
		event.stopPropagation();
	}
	var xpath = "//input[starts-with(@id, 'ops_checkbox')]";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	var aDeleteUsers = new Array();
	for (var loopVar = 0; loopVar < divNodes.snapshotLength; loopVar++)
	{
		var delNode = divNodes.snapshotItem(loopVar);
		if (delNode.checked)
		{
			var trNode = delNode.parentNode.parentNode.parentNode;	// owning TR
			var tdNode = trNode.getElementsByTagName('TD')[2];	// TD of name
			var spanNode = tdNode.getElementsByTagName(spanText)[0];	// SPAN of name
			var aNode = tdNode.getElementsByTagName('A')[0];
			if (aNode.firstChild.nodeName === "#text")
			{
				var userName = aNode.firstChild.nodeValue;
				var safeName = false;
				for (var i = 0; i < neverDeleteList.length; i++)
				{
					if (userName === neverDeleteList[i])
					{
						safeName = true;
					}
				}
				if (!safeName)
				{
					aDeleteUsers.push(encodeURI(userName));
				}
			}
		}
	}
	if (aDeleteUsers.length)
	{
		var deleteNamesEncoded = aDeleteUsers.join("\"")
		GM_setValue("namesToDeletePending", trueText);
		GM_setValue("deletedNamesList", deleteNamesEncoded);
	}
	else
	{
		resetDeletedNames();
	}

/*
	xpath = "//span[@class='copyright']/a[contains(text(),'Administration')]";
	var adminNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	var adminURL = adminNodes.snapshotItem(0).getAttribute('href');
*/
	xpath = "//a[starts-with(@href, 'admin/index.php?')]";
	var adminNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (adminNodes.snapshotLength > 0)
	{
		var adminURL = adminNodes.snapshotItem(adminNodes.snapshotLength - 1);
		window.location.href = adminURL;
	}
	else
	{
		alert("No administration link was found.");
	}
}

function setAll(event)
{
	if (event != null)
	{
		event.preventDefault();
		event.stopPropagation();
	}
	var xpath = "//input[starts-with(@id, 'ops_checkbox')]";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var loopVar = 0; loopVar < divNodes.snapshotLength; loopVar++)
	{
		divNodes.snapshotItem(loopVar).checked = true;
	}
}

function clearAll(event)
{
	if (event != null)
	{
		event.preventDefault();
		event.stopPropagation();
	}
	var xpath = "//input[starts-with(@id, 'ops_checkbox')]";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var loopVar = 0; loopVar < divNodes.snapshotLength; loopVar++)
	{
		divNodes.snapshotItem(loopVar).checked = false;
	}
}

function toggleEmailAddress(event)
{
	if (event != null)
	{
		event.preventDefault();
		event.stopPropagation();
	}
	if (emailNode === null)
	{
		return;
	}
	var tNode = emailNode.firstChild;
	if (showEmailAddress)
	{
		tNode.nodeValue = "Show Email";
	}
	else
	{
		tNode.nodeValue = "Hide Email";
	}
	showEmailAddress = !showEmailAddress;
	showHideEmail();
}

function toggleWebsiteAddress(event)
{
	if (event != null)
	{
		event.preventDefault();
		event.stopPropagation();
	}
	if (websiteNode === null)
	{
		return;
	}
	var tNode = websiteNode.firstChild;
	if (showWebsiteAddress)
	{
		tNode.nodeValue = "Show Website";
	}
	else
	{
		tNode.nodeValue = "Hide Website";
	}
	showWebsiteAddress = !showWebsiteAddress;
	showHideWebsite();
}

function showHideEmail()
{
	for (var loopVar = 0; loopVar < aAnchorEmailNodes.length; loopVar++)
	{
		var aNode = aAnchorEmailNodes[loopVar];
		var imgNode = aImgEmailNodes[loopVar];
		var spanNode = aSpanEmailNodes[loopVar];
		if (showEmailAddress)
		{
			aNode.removeChild(imgNode);
			aNode.appendChild(spanNode);
		}
		else
		{
			aNode.removeChild(spanNode);
			aNode.appendChild(imgNode);
		}
	}
}

function showHideWebsite()
{
	for (var loopVar = 0; loopVar < aAnchorWebsiteNodes.length; loopVar++)
	{
		var aNode = aAnchorWebsiteNodes[loopVar];
		var imgNode = aImgWebsiteNodes[loopVar];
		var spanNode = aSpanWebsiteNodes[loopVar];
		if (showWebsiteAddress)
		{
			aNode.removeChild(imgNode);
			aNode.appendChild(spanNode);
		}
		else
		{
			aNode.removeChild(spanNode);
			aNode.appendChild(imgNode);
		}
	}
}

function memberlistPage()
{
	showEmailAddress = false;
	showWebsiteAddress = false;
	aAnchorEmailNodes.length = 0;
	aImgEmailNodes.length = 0;
	aSpanEmailNodes.length = 0;
	aAnchorWebsiteNodes.length = 0;
	aImgWebsiteNodes.length = 0;
	aSpanWebsiteNodes.length = 0;
	resetDeletedNames();

	var xpath = "//tr/td[starts-with(@class,'row') and position()=1]/span[@class='gen']";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	listCount = 0;
	for (var loopVar = 0; loopVar < divNodes.snapshotLength; loopVar++)
	{
		var spanNode = divNodes.snapshotItem(loopVar);
		var tdNode = spanNode.parentNode;
		var newSpanNode = document.createElement(spanText);
		newSpanNode.setAttribute('class', 'gen');
		var iNode = document.createElement("INPUT");
		iNode.setAttribute('type', 'checkbox');
		iNode.setAttribute('id', 'ops_checkbox' + (loopVar + 1));
		newSpanNode.appendChild(iNode);
		newSpanNode.appendChild(document.createTextNode("Delete  "));
		tdNode.insertBefore(newSpanNode, spanNode);

		var trNode = tdNode.parentNode;
		xpath = "td/a/img[contains(@src,'/icon_email') or contains(@src,'/icon_www')]";
		var imgNodes =  document.evaluate(
			xpath,
			trNode,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		for (var imgLoop = 0; imgLoop < imgNodes.snapshotLength; imgLoop++)
		{
			var imgNode = imgNodes.snapshotItem(imgLoop);
			var aNode = imgNode.parentNode;
			var linkVal = aNode.getAttribute('href');
			linkVal = linkVal.replace(/^(http:\/\/)|(mailto:)/i, "");
			var aSpanNode = document.createElement(spanText);
			aSpanNode.setAttribute('class', 'gen');
			aSpanNode.appendChild(document.createTextNode(linkVal));
			var srcAttribute = imgNode.getAttribute('src');
			if (srcAttribute.match(/\/icon_email/i) != null)
			{
				aAnchorEmailNodes.push(aNode);
				aImgEmailNodes.push(imgNode);
				aSpanEmailNodes.push(aSpanNode);
			}
			else
			{
				aAnchorWebsiteNodes.push(aNode);
				aImgWebsiteNodes.push(imgNode);
				aSpanWebsiteNodes.push(aSpanNode);
			}
		}

		listCount++;
	}

	var lastNumericTR = divNodes.snapshotItem(divNodes.snapshotLength - 1).parentNode.parentNode;
	var trNode = lastNumericTR.nextSibling;
	while (trNode && trNode.nodeName != "TR")
	{
		trNode = trNode.nextSibling;
	}
	var cNode = null;

	if (trNode)
	{
		// tr exists past last entry, find TD if exists
		cNode = trNode.firstChild;
		while (cNode && (cNode.nodeName != "TD"))
		{
			cNode = cNode.nextSibling;
		}
	}

	if (!cNode)
	{
		// not the default style we expected, so...
		// see if there's a TD with class 'ftr', if so, use that node to place buttons
		xpath = "//tr/td[@class='ftr']";
		var tdNodes = document.evaluate(
			xpath,
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		if (tdNodes.snapshotLength > 0)
		{
			cNode = tdNodes.snapshotItem(0);
		}
		else
		{
			// no 'ftr' class TD,
			// place buttons after last entry and hope for the best
			if (!trNode)
			{
				// no tr exists past last entry, create and place it with proper class
				trNode = document.createElement(trText);
				var trClass = lastNumericTR.getAttribute("class");
				trNode.setAttribute("class", trClass);
				lastNumericTR.parentNode.appendChild(trNode);
			}

			// no TD after TR, create and place it with proper class
			var lastTD = lastNumericTR.firstChild;
			while (lastTD && (lastTD.nodeName != "TD"))
			{
				lastTD = lastTD.nextSibling;
			}
			cNode = document.createElement(tdText);
			if (lastTD)
			{
				var tdClass = lastTD.getAttribute("class");
				cNode.setAttribute("class", tdClass);
//				cNode.setAttribute("class", "catBottom");
			}
			trNode.appendChild(cNode);
		}
	}

	if (cNode)
	{
		var newSpanNode = document.createElement(spanText);
		var clearNode = document.createElement(buttonText);
		clearNode.appendChild(document.createTextNode("Clear All"));
		clearNode.addEventListener('click', clearAll, false);
		var setNode = document.createElement(buttonText);
		setNode.appendChild(document.createTextNode("Set All"));
		setNode.addEventListener('click', setAll, false);
		var deleteNode = document.createElement(buttonText);
		deleteNode.appendChild(document.createTextNode("Delete Checked"));
		deleteNode.addEventListener('click', deleteChecked, false);
		emailNode = document.createElement(buttonText);
		emailNode.appendChild(document.createTextNode("Show Email"));
		emailNode.addEventListener('click', toggleEmailAddress, false);
		websiteNode = document.createElement(buttonText);
		websiteNode.appendChild(document.createTextNode("Show Website"));
		websiteNode.addEventListener('click', toggleWebsiteAddress, false);
		newSpanNode.appendChild(clearNode);
		newSpanNode.appendChild(document.createTextNode(" "));
		newSpanNode.appendChild(setNode);
		newSpanNode.appendChild(document.createTextNode(" "));
		newSpanNode.appendChild(deleteNode);
		newSpanNode.appendChild(document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"));
		newSpanNode.appendChild(emailNode);
		newSpanNode.appendChild(document.createTextNode(" "));
		newSpanNode.appendChild(websiteNode);
		cNode.appendChild(newSpanNode);
	}
}

function mainAdminPage()
{
	var miParam = GM_getValue("namesToDeletePending", xText);
	if (miParam != trueText)
	{
		// nothing to do
		return;
	}
	if (window.location.search.match(/^\?pane=right/) == null)
	{
		// only change right pane
		return;
	}
	window.location.href = window.location.href.replace(/index\.php/, "admin_users.php");
}

function lookupPhase()
{
	var miParam = GM_getValue("namesToDeletePending", xText);
	if (miParam != trueText)
	{
		// nothing to do
		resetDeletedNames();
		return;
	}

	var aDeletedUsers = null;
	miParam = GM_getValue("deletedNamesList", xText);
	if (miParam === xText || ((aDeletedUsers = miParam.split("\"")) == null))
	{
		// no names
		resetDeletedNames();
		return;
	}
	var userName = decodeURI(aDeletedUsers.pop());
	for (var i = 0; i < stopIfHitList.length; i++)
	{
		if (userName === stopIfHitList[i])
		{
			resetDeletedNames();
			return;
		}
	}

	var xpath = "//input[@class='post' and @name='username']";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (divNodes.snapshotLength < 1)
	{
		alert("Oust-spammer couldn't find User Administration page.");
		resetDeletedNames();
		return;
	}
	var iNode = divNodes.snapshotItem(0);
	iNode.value = userName;

	if (aDeletedUsers.length)
	{
		var deleteNamesEncoded = aDeletedUsers.join("\"")
		GM_setValue("namesToDeletePending", trueText);
		GM_setValue("deletedNamesList", deleteNamesEncoded);
	}
	else
	{
		resetDeletedNames();
	}

	xpath = "//input[@class='mainoption' and @name='submituser']";
	divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (divNodes.snapshotLength > 0)
	{
		GM_setValue("phaseType", "delete");
		var submitNode = divNodes.snapshotItem(0);
		submitNode.click();
	}
	else
	{
		alert("Oust-spammer couldn't find Look up user button.");
	}
}

function deletePhase()
{
	var xpath = "//input[@name='deleteuser']";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (divNodes.snapshotLength < 1)
	{
		resetDeletedNames();
		alert("Oust-spammer couldn't find Delete this user user button.");
		return;
	}
	var iNode = divNodes.snapshotItem(0);
	iNode.checked = true;

	xpath = "//input[@class='mainoption' and @name='submit']";
	divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (divNodes.snapshotLength > 0)
	{
		GM_setValue("phaseType", "readyNext");
		var submitNode = divNodes.snapshotItem(0);
		submitNode.click();
	}
	else
	{
		alert("Oust-spammer couldn't find User Administration Submit button.");
	}
}

function readyNextPhase()
{
	xpath = "//tr/td/span/a[text()='Here']";
	var adminNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (adminNodes.snapshotLength < 1)
	{
		// didn't find the 'Click Here to return' link
		// non-English text perhaps, try a more-specific non-text lookup
		//  this one isn't at all forgiving about differences in the exact internal structure
		xpath = "//body/table[@class='forumline']/tbody/tr/td/span[@class='gen']/a";
		var adminNodes = document.evaluate(
			xpath,
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
	}
	GM_setValue("phaseType", "lookupPhase");
	if (adminNodes.snapshotLength > 0)
	{
		var adminURL = adminNodes.snapshotItem(0).getAttribute('href');
		window.location.href = adminURL;
	}
}

function adminUsersPage()
{
	var miParam = GM_getValue("phaseType", xText);
	if (miParam === "delete")
	{
		deletePhase();
	}
	else if (miParam === "readyNext")
	{
		readyNextPhase();
	}
	else
	{
		lookupPhase();
	}
}

function oustTopicOn()
{
	gbTopicActionsOn = true;
	GM_setValue("TopicActions", onText);
	GM_registerMenuCommand("Disable topic actions", oustTopicOff, "", "", "D");
	location.reload();
}

function oustTopicOff()
{
	gbTopicActionsOn = false;
	GM_setValue("TopicActions", offText);
	GM_registerMenuCommand("Enable topic actions", oustTopicOn, "", "", "E");
	location.reload();
}

function topiclistPage()
{
	var topicSetting = GM_getValue("TopicActions", xText);
	if (topicSetting == offText)
	{
		gbTopicActionsOn = false;
	}
	else
	{
		gbTopicActionsOn = true;
	}

	if (gbTopicActionsOn)
	{
		GM_setValue("TopicActions", onText);
		GM_registerMenuCommand("Disable topic actions", oustTopicOff, "", "", "D");
	}
	else
	{
		GM_setValue("TopicActions", offText);
		GM_registerMenuCommand("Enable topic actions", oustTopicOn, "", "", "E");
		return;
	}
	var xpath = "//tr/td[starts-with(@class,'row')]/span[@class='topictitle']";
	var divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	aTopicLinks.length = 0;
	for (var loopVar = 0; loopVar < divNodes.snapshotLength; loopVar++)
	{
		var spanNode = divNodes.snapshotItem(loopVar);
		var aNode = spanNode.firstChild;
		while (aNode)
		{
			if (aNode.nodeName == "A" && aNode.getAttribute('class') == "topictitle")
			{
				break;
			}
			aNode = aNode.nextSibling;
		}
		if (!aNode)
		{
			continue;
		}
		aTopicLinks.push(aNode.getAttribute('href'));
		var tdNode = spanNode.parentNode;
		var newSpanNode = document.createElement(spanText);
		var iNode = document.createElement("INPUT");
		iNode.setAttribute('type', 'checkbox');
		iNode.setAttribute('id', 'ops_checkbox' + (loopVar + 1));
		newSpanNode.appendChild(document.createTextNode(" . . . "));
		newSpanNode.appendChild(iNode);
		newSpanNode.appendChild(document.createTextNode("Delete  "));
		tdNode.insertBefore(newSpanNode, spanNode.nextSibling);
	}
}

function init()
{
	if (window.location.href.match(/memberlist\.php/) != null)
	{
		memberlistPage();
	}
	else if (window.location.href.match(/admin_users\.php/) != null)
	{
		adminUsersPage();
	}
	else if (window.location.href.match(/viewforum\.php/) != null)
	{
		topiclistPage();
	}
	else if (window.location.href.match(/index\.php/) != null)
	{
		mainAdminPage();
	}
}

function main()
{
	if (!GM_setValue)
	{
		return;
	}
	init();
}

window.addEventListener("load", main, false );
