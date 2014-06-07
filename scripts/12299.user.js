// This is a Greasemonkey script.
// See http://www.greasespot.net/ for more information on Greasemonkey.
//
// The listed boards are examples used for testing Mondo Pita and do not represent
//  an endorsement of the boards or their content. Honestly, I don't even know
//  what a couple of them are about.
//
// ==UserScript==
// @name          Mondo Pita
// @namespace     http://www.devoresoftware.com/gm/mpBB
// @description	  Kill/filter individual messages for phpBB 2.x
// @include       http://www.devoresoftware.com/forum/*
// @include       http://devoresoftware.com/forum/*
// @include       http://forums.eslcafe.com/korea/*
// @include       http://www.weezernation.com/bboard/*
// @include       http://www.thetrolls.net/phpbb2/*
// @include       http://www.ddrfreak.com/phpBB2/*
// @include       http://www.animemusicvideos.org/phpBB/*
// @include       http://www.johnlsayers.com/phpBB2/*
// @include       http://featherlinux.berlios.de/phpBB2/*
// @include       http://www.naturescapes.net/phpBB2/*
// @include       http://www.allgraphicdesign.com/phpBB2/*
// @include       http://cefresearch.com/phpBB2/*
// ==/UserScript==
//
// Work begun, August 2007
// Version 1.0 release September 15, 2007
// Version 2.0 release June 16, 2008

var mondoPitaVersion = "Version 2.00, Mondo Pita";
var boxUp = 0;
var mondo_pita_control = null;
var mondo_pita_highlight_control = null;
var mondo_pita_delete_control = null;
var mondo_pita_tag_control = null;
var mondo_pita_style_control = null;
var mondo_pita_manage_control = null;
var freeRules = new Array();
var aDeleteInfo = new Array();
var aHighlightInfo = new Array();
var aTagInfo = new Array();
var aStyleInfo = new Array();
var storedRuleCount = 0;
var currentRuleNumber = 0;
var currentRuleType = 0;
var deactivateDeleteFlag = false;
var deactivateHighlightFlag = false;
var deactivateTagFlag = false;
var deactivateStyleFlag = false;
var flagMultiple = 1;
var flagHighlight = flagMultiple << 1;
var flagDelete = flagHighlight << 1;
var flagTag = flagDelete << 1;
var flagStyle = flagTag << 1;
var originalMenuHeight = "50px";
var originalSiblingHeight = "50px";
var deleteFilterText = "Delete-Filter";
var tagText = "Tag";
var highlightText = "Highlight";
var styleText = "Style";
var manageText = "Manage";
var defaultText = "default";
var usedRuleHeader = "Used:mm1.0:";
var freeRuleHeader = "Free:mm1.0:";
var deleteHeader = "Delete:";
var highlightHeader = "Highlight:";
var tagHeader = "Tag:";
var styleHeader = "Style:";
var systemHeader = "System:mm1.0:";
var systemStatusText = "System Status";
var optionText = "Option";
var contentText = "Content";
var authorText = "Author";
var contentAuthorText = contentText + "+" + authorText;
var customText = "Custom";
var unchangedText = "Unchanged";
var buttonText = "button";
var spanText = "SPAN";
var removeText = "Remove";
var invisibleText = "Make Invisible";
var fg_bgText = "Foreground = Background";
var mmHighlightAttribText = "mmModifiedHighlight";
var mmDeleteAttribText = "mmModifiedDelete";
var mmTagClassText = "mmTagClass";
var mmStyledPostAttribText = "mmStyledPost";
var whiteText = "white";
var darkBlueText = "darkblue";
var textNodeText = "#text";
var trueText = "true";
var falseText = "false";
var clickText = "click";
var noneText = "none";
var hiddenText = "hidden";
var visibleText = "visible";
var xText = "x";
var moveMouseAreaWidth = 50;
var moveMouseAreaSeconds = 3;
var dropdownPeekABoo = false;

function isPostAuthor(node)
{
	if (!node)
	{
		return 0;
	}
	var currentNode = node;
	while (currentNode)
	{
		if (currentNode.nodeName === spanText && currentNode.getAttribute('class') === 'smallcopy')
		{
			return 1;
		}
		currentNode = currentNode.parentNode;
	}
 	return 0;
}

function escapePattern(toEscape)
{
	var needsEscaping = "\\^.*?$|([{}])";
	var afterEscape = "";
	var pos = 0;
	while (pos < toEscape.length)
	{
		var c = toEscape.charAt(pos++);
		if (needsEscaping.indexOf(c) >= 0)
		{
			afterEscape += "\\" + c;
		}
		else
		{
			afterEscape += c;
		}
	}
	return afterEscape;
}

// get free configuration value slot
function getFreeSlot()
{
	if (freeRules.length)
	{
		var slotID = freeRules.pop();
	}
	else
	{
		var slotID = "Rule" + (++storedRuleCount);
	}
	return slotID;
}

// store information to free configuration value slot
function storeInfoToSlot(infoString)
{
	var gmKey = getFreeSlot();
	var gmValue = usedRuleHeader + infoString;
	GM_setValue(gmKey, gmValue);
	return gmKey;
}

// show a slot as free
function freeSlot(ruleID)
{
	GM_setValue(ruleID, freeRuleHeader);
	freeRules.push(ruleID);
}

function saveDeleteItem(deleteInfo)
{
	var infoString = deleteHeader;
	for (var i = 0; i < 9; i++)
	{
		infoString += String(deleteInfo[i]).length + ":" + deleteInfo[i];
	}
	var gmKey = storeInfoToSlot(infoString);
	return gmKey;
}

function saveDelete(event)
{
	event.stopPropagation();
// userDelText, userLocated, userHow, userWhole, userCase, userLinks, userRegExp, userDuration
	mondo_pita_delete_control.style.display = noneText;
	var elem = document.getElementById("mondo_pita_delete_text");
	var userDelText = elem.value;
	elem = document.getElementById("mondo_pita_delete_located");
	var userLocated = elem.value;
	elem = document.getElementById("mondo_pita_delete_how");
	var userHow = elem.value;
	var checkNode = document.getElementById("mondo_pita_delete_wholeword");
	var userWhole = checkNode.checked;
	checkNode = document.getElementById("mondo_pita_delete_matchcase");
	var userCase =  checkNode.checked;
	checkNode = document.getElementById("mondo_pita_delete_matchlinks");
	var userLinks =  checkNode.checked;
	checkNode = document.getElementById("mondo_pita_delete_regexp");
	var userRegExp =  checkNode.checked;
	elem = document.getElementById("mondo_pita_delete_duration");
	var userDuration = elem.value;
	var rightNow = new Date();

	aDeleteInfo.push([
		userDelText,
		userLocated,
		userHow,
		userWhole,
		userCase,
		userLinks,
		userRegExp,
		userDuration,
		rightNow.getTime()]);
	nodeBreaker(flagDelete, aDeleteInfo.length - 1);
	var gmKey = saveDeleteItem(aDeleteInfo[aDeleteInfo.length - 1]);
	aDeleteInfo[aDeleteInfo.length - 1][9] = gmKey;

	boxUp = 0;
}

function cancelDelete(event)
{
	event.stopPropagation();
	boxUp = 0;
	mondo_pita_delete_control.style.display = noneText;
}

function saveTagItem(tagInfo)
{
	var infoString = tagHeader;
	for (var i = 0; i < tagInfo.length; i++)
	{
		infoString += String(tagInfo[i]).length + ":" + tagInfo[i];
	}
	var gmKey = storeInfoToSlot(infoString);
	return gmKey;
}

function saveTag(event)
{
	event.stopPropagation();
// userTagText, userLocated, userTagTags, userWhole, userCase, userRegExp,
	mondo_pita_tag_control.style.display = noneText;
	var elem = document.getElementById("mondo_pita_tag_text");
	var userTagText = elem.value;
	elem = document.getElementById("mondo_pita_tag_located");
	var userLocated = elem.value;
	elem = document.getElementById("mondo_pita_tag_tags");
	var userTagTags = elem.value;
	var checkNode = document.getElementById("mondo_pita_tag_wholeword");
	var userWhole = checkNode.checked;
	checkNode = document.getElementById("mondo_pita_tag_matchcase");
	var userCase =  checkNode.checked;
	checkNode = document.getElementById("mondo_pita_tag_regexp");
	var userRegExp =  checkNode.checked;
	var rightNow = new Date();

	aTagInfo.push([
		userTagText,
		userLocated,
		userTagTags,
		userWhole,
		userCase,
		userRegExp,
		rightNow.getTime()]);
	nodeBreaker(flagTag, aTagInfo.length - 1);
	var gmKey = saveTagItem(aTagInfo[aTagInfo.length - 1]);
	aTagInfo[aTagInfo.length - 1][aTagInfo[aTagInfo.length - 1].length] = gmKey;

	boxUp = 0;
}

function cancelTag(event)
{
	event.stopPropagation();
	boxUp = 0;
	mondo_pita_tag_control.style.display = noneText;
}

function saveStyleItem(styleInfo)
{
	var infoString = styleHeader;
	for (var i = 0; i < styleInfo.length; i++)
	{
		infoString += String(styleInfo[i]).length + ":" + styleInfo[i];
	}
	var gmKey = storeInfoToSlot(infoString);
	return gmKey;
}

function saveStyle(event)
{
	event.stopPropagation();
// userStyleText, userLocated, userStyleStyles, userWhole, userCase, userRegExp,
	mondo_pita_style_control.style.display = noneText;
	var elem = document.getElementById("mondo_pita_style_text");
	var userStyleText = elem.value;
	elem = document.getElementById("mondo_pita_style_located");
	var userLocated = elem.value;
	elem = document.getElementById("mondo_pita_style_styles");
	var userStyleStyles = elem.value;
	var checkNode = document.getElementById("mondo_pita_style_wholeword");
	var userWhole = checkNode.checked;
	checkNode = document.getElementById("mondo_pita_style_matchcase");
	var userCase =  checkNode.checked;
	checkNode = document.getElementById("mondo_pita_style_regexp");
	var userRegExp =  checkNode.checked;
	var rightNow = new Date();

	aStyleInfo.push([
		userStyleText,
		userLocated,
		userStyleStyles,
		userWhole,
		userCase,
		userRegExp,
		false,
		rightNow.getTime()]);
	nodeBreaker(flagStyle, aStyleInfo.length - 1);
	var gmKey = saveStyleItem(aStyleInfo[aStyleInfo.length - 1]);
	aStyleInfo[aStyleInfo.length - 1][aStyleInfo[aStyleInfo.length - 1].length] = gmKey;

	boxUp = 0;
}

function cancelStyle(event)
{
	event.stopPropagation();
	boxUp = 0;
	mondo_pita_style_control.style.display = noneText;
}

function saveHighlightItem(highlightInfo)
{
	var infoString = highlightHeader;
	for (var i = 0; i < 11; i++)
	{
		infoString += String(highlightInfo[i]).length + ":" + highlightInfo[i];
	}
	var gmKey = storeInfoToSlot(infoString);
	return gmKey;
}

function d2h(decNum)
{
	var hexDigits="0123456789ABCDEF";
	var hexNum = hexDigits.substr(decNum & 15, 1);
	decNum >>= 4;
	hexNum = hexDigits.substr(decNum & 15, 1) + hexNum;
	return hexNum;
}

function processRGBvalue(rgbString)
{
	var result;
	if (result = rgbString.match(/[ ;.,-]*(\d{1,3})[ ;.,-]+(\d{1,3})[ ;.,-]+(\d{1,3})/))
	{
		// 3 sets of digits, change to #xxxxxx hexadecimal
		var ret = "#";
		ret += d2h(result[1]);
		ret += d2h(result[2]);
		ret += d2h(result[3]);
		return ret;
	}
	else if (result = rgbString.match(/\s*(#([0-9a-fA-F]{6}))/))
	{
		// already #xxxxxx hexadecimal, use it
		return result[1];
	}
	return "";
}

function deleteTransform(
	candidate,
	doAllFlag,
	doValue,
	spanAuthorStore,
	boldAuthorStore,
	anchorStore,
	textAllNodeStore,
	textContentNodeStore,
	textAuthorNodeStore,
	quoteNodeStore,
	sigNodeStore,
	quoteNameStore)
{
	if (deactivateDeleteFlag)
	{
		return;
	}
	if (candidate.getAttribute(mmDeleteAttribText))
	{
		// entire message already processed for deleting
		return;
	}

	if (doAllFlag)
	{
		var start = 0;
		var end = aDeleteInfo.length;
	}
	else
	{
		var start = doValue;
		var end = start + 1;
	}

	// peek at the delete conditions to see if we need to check all three types of targets
	// set up only search targets that are needed
	var searchTargetAll = "";
	var searchTargetContent = "";
	var searchTargetAuthor = "";
	var searchTargetQuoter = "";
	var useAll, useContent, useAuthor;
	for (var loop = start; loop < end; loop++)
	{
		var requestContent = (aDeleteInfo[loop][1].indexOf(contentText) >= 0 ? true: false);
		var requestAuthor = (aDeleteInfo[loop][1].indexOf(authorText) >= 0 ? true: false);
		if (requestContent && requestAuthor)
		{
			useAll = true;
		}
		else if (requestContent)
		{
			useContent = true;
		}
		else if (requestAuthor)
		{
			useAuthor = true;
		}
	}
	var textValStore = new Array();
	if (useAll)
	{
		// no destructive popping of array
		for (var aLoop = 0; aLoop < textAllNodeStore.length; aLoop++)
		{
			var aNode = textAllNodeStore[aLoop];
			if (aNode.nodeValue)
			{
				textValStore.push(aNode.nodeValue);
			}
		}
		searchTargetAll = textValStore.join(' ');
		textValStore.length = 0;
	}
	if (useContent)
	{
		for (var aLoop = 0; aLoop < textContentNodeStore.length; aLoop++)
		{
			var aNode = textContentNodeStore[aLoop];
			if (aNode.nodeValue)
			{
				textValStore.push(aNode.nodeValue);
			}
		}
		searchTargetContent = textValStore.join(' ');
		textValStore.length = 0;
	}
	if (useAuthor)
	{
		for (var aLoop = 0; aLoop < textAuthorNodeStore.length; aLoop++)
		{
			var aNode = textAuthorNodeStore[aLoop];
			if (aNode.nodeValue)
			{
				textValStore.push(aNode.nodeValue);
			}
		}
		searchTargetAuthor = textValStore.join(' ');
		textValStore.length = 0;
		// quoted author
		for (var aLoop = 0; aLoop < quoteNameStore.length; aLoop++)
		{
			textValStore.push(quoteNameStore[aLoop]);
		}
		searchTargetQuoter = textValStore.join(' ');
		textValStore.length = 0;
	}
	var hrefValueStore = new Array();
	for (var aLoop = 0; aLoop < anchorStore.length; aLoop++)
	{
		var aNode = anchorStore[aLoop];
		hrefValueStore.push(aNode.getAttribute('href'));
	}
	var hrefText = hrefValueStore.join(" ");

	for (var loop = start; loop < end; loop++)
	{
		// set test conditions
		// userHiText, userLocated, userArea, userFg, userBg, userFrgb, userBrgb,
		//  userWhole, userCase, userRegExp
		if (!aDeleteInfo[loop][0])
		{
			continue;
		}

		if (aDeleteInfo[loop][6] === false)
		{
			requestText = escapePattern(aDeleteInfo[loop][0]);
			if (aDeleteInfo[loop][3] === true)
			{
				// wrap pattern in \b for whole word
				requestText = "\\b" + requestText + "\\b";
			}
		}
		else
		{
			// direct RegExp specified
			requestText = aDeleteInfo[loop][0];
		}
		if (aDeleteInfo[loop][4] === false)
		{
			var requestPattern = new RegExp(requestText, "i");		// ignore case
		}
		else
		{
			var requestPattern = new RegExp(requestText);
		}

		// restrict searches for this rule to appropriate content/author location
		var restrictSearchTargetAll = "";
		var restrictSearchTargetContent = "";
		var restrictSearchTargetAuthor = "";
		var restrictSearchTargetQuoter = "";
		if (aDeleteInfo[loop][1] === contentText)
		{
			restrictSearchTargetContent = searchTargetContent;
		}
		else if (aDeleteInfo[loop][1] === authorText)
		{
			restrictSearchTargetAuthor = searchTargetAuthor;
			restrictSearchTargetQuoter = searchTargetQuoter;
		}
		else
		{
			restrictSearchTargetAll = searchTargetAll;
		}

		var requestLinks = aDeleteInfo[loop][5];
		if (requestLinks)
		{
			if (restrictSearchTargetAll.length)
			{
				restrictSearchTargetAll = searchTargetAll + " " + hrefText;
			}
			if (restrictSearchTargetContent.length)
			{
				restrictSearchTargetContent = searchTargetContent + " " + hrefText;
			}
		}
		var bDeleteMess = ((restrictSearchTargetAll.length && requestPattern.test(restrictSearchTargetAll)) ||
			(restrictSearchTargetContent.length && requestPattern.test(restrictSearchTargetContent)) ||
			(restrictSearchTargetAuthor.length && requestPattern.test(restrictSearchTargetAuthor)));
		var matchCandidate = candidate;
		var deleteCycles = 1;
		var bDeleteQuote = (restrictSearchTargetQuoter.length && requestPattern.test(restrictSearchTargetQuoter));
		if ( bDeleteQuote)
		{
			deleteCycles = quoteNodeStore.length;
		}

		if (bDeleteMess)
		{
			// delete filter this post
			var requestHow = aDeleteInfo[loop][2];
			matchCandidate.setAttribute(mmDeleteAttribText, "on");
			// turn off two follow TR's if they are navigation and spacers
			var navNode, spaceNode;
			var followNode = matchCandidate.nextSibling;
			if (followNode && followNode.nodeName == "#text")
			{
				followNode = followNode.nextSibling;
			}
			var cNode;
			// TR-TD-SPAN[nav]
			if (followNode && (cNode = followNode.firstChild))
			{
				if (cNode && cNode.nodeName == "#text")
				{
					cNode = cNode.nextSibling;
				}
				var c2Node;
				if (cNode.nodeName == "TD" && (c2Node = cNode.firstChild))
				{
					if (c2Node.nodeName == "SPAN" &&
						c2Node.getAttribute('class') === 'nav')
					{
						navNode = followNode;
					}
				}
				followNode = followNode.nextSibling;
				if (followNode && followNode.nodeName == "#text")
				{
					followNode = followNode.nextSibling;
				}
			}
			// TR-TD[spacerow]
			if (followNode &&  (cNode = followNode.firstChild))
			{
				if (cNode && cNode.nodeName == "#text")
				{
					cNode = cNode.nextSibling;
				}
				if (cNode.nodeName == "TD" &&
					cNode.getAttribute('class') === 'spaceRow')
				{
					spaceNode = followNode;
				}
			}
			switch (requestHow)
			{
				case invisibleText:
					matchCandidate.style.visibility = hiddenText;
					if (navNode)
					{
						navNode.style.visibility = hiddenText;
					}
					if (spaceNode)
					{
						spaceNode.style.visibility = hiddenText;
					}
					break;
				default:	// remove
					matchCandidate.style.display = noneText;
					if (navNode)
					{
						navNode.style.display = noneText;
					}
					if (spaceNode)
					{
						spaceNode.style.display = noneText;
					}
					break;
			}
		}
		else if (bDeleteQuote)
		{
			// delete selected quotes in this post
			for (var qloop = 0; qloop < deleteCycles; qloop++)
			{
				if (requestPattern.test(quoteNameStore[qloop]))
				{
					matchCandidate = quoteNodeStore[qloop];
					var matchCandidate2 = sigNodeStore[qloop];
					switch (requestHow)
					{
						case invisibleText:
							matchCandidate.style.visibility = hiddenText;
							matchCandidate2.style.visibility = hiddenText;
							break;
						default:
							matchCandidate.style.display = noneText;
							matchCandidate2.style.display = noneText;
							break;
					}
				}
			}
		}
	}
}

function nodeBreaker(flags, singleValue)
{
	if (!(flags & (flagMultiple | flagDelete)))
	{
		return;
	}

	var xpath = "//TABLE[@class='forumline']/TBODY/TR";
	var entryNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	var countTo = entryNodes.snapshotLength;
	var spanAuthorStore = new Array();
	var boldAuthorStore = new Array();
	var anchorStore = new Array();
	var textAllNodeStore = new Array();
	var textAuthorNodeStore = new Array();
	var quoteNodeStore = new Array();
	var sigNodeStore = new Array();
	var quoteNameStore = new Array();
	var textContentNodeStore = new Array();

	for (var i = 0; i < countTo; i++)
	{
		var trNode = entryNodes.snapshotItem(i);
 		if (!trNode)
 		{
	 		break;
 		}
		spanAuthorStore.length = 0;
		boldAuthorStore.length = 0;
		anchorStore.length = 0;
		textAllNodeStore.length = 0;
		textAuthorNodeStore.length = 0;
		quoteNodeStore.length = 0;
		sigNodeStore.length = 0;
		quoteNameStore.length = 0;
		textContentNodeStore.length = 0;

		xpath = "descendant::SPAN[@class='name']/descendant::text()";
		var nameNode = document.evaluate(
			xpath,
			trNode,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		xpath = "descendant::TD/SPAN[@class='postbody']";
		var bodyNodes = document.evaluate(
			xpath,
			trNode,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		if (nameNode.snapshotLength && bodyNodes.snapshotLength)
		{
			var currentNode = nameNode.snapshotItem(0);
			textAllNodeStore.push(currentNode);
			textAuthorNodeStore.push(currentNode);
			for (var j = 0; j < bodyNodes.snapshotLength; j++)
			{
				xpath = "descendant::text()";
				var bodyTextNodes = document.evaluate(
					xpath,
					bodyNodes.snapshotItem(j),
					null,
					XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
					null
				);
				if (bodyTextNodes.snapshotLength)
				{
					for (var k = 0; k < bodyTextNodes.snapshotLength; k++)
					{
						currentNode = bodyTextNodes.snapshotItem(k);
						if (currentNode.nodeValue.length)
						{
							textAllNodeStore.push(currentNode);
							textContentNodeStore.push(currentNode);
						}
					}
				}
			}
			// quoting
			xpath = "descendant::TBODY/TR/TD[@class='quote']";
			var quoteNodes = document.evaluate(
				xpath,
				trNode,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null
			);
			for (var j = 0; j < quoteNodes.snapshotLength; j++)
			{
				var tdQuoteNode = quoteNodes.snapshotItem(j);
				var trPrevNode = tdQuoteNode.parentNode.previousSibling;
				while (trPrevNode && trPrevNode.nodeName != "TR")
				{
					trPrevNode = trPrevNode.previousSibling;
				}
				if (trPrevNode)
				{
					xpath = "descendant::text()";
					var quoteTextNodes = document.evaluate(
						xpath,
						trPrevNode,
						null,
						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
						null
					);
					if (quoteTextNodes.snapshotLength)
					{
						var wroteText = "";
						for (var k = 0; k < quoteTextNodes.snapshotLength; k++)
						{
							wroteText += quoteTextNodes.snapshotItem(k).nodeValue;
						}
						var authorNameLine = wroteText.match(/\s*(.*)\s+wrote:\s*$/);
						if (authorNameLine)
						{
							authorName = authorNameLine[1];
							quoteNodeStore.push(tdQuoteNode);
							sigNodeStore.push(trPrevNode);
							quoteNameStore.push(authorName);
						}
					}
				}
			}
		}

		deleteTransform(
			trNode,
			flagMultiple,
			singleValue,
			spanAuthorStore,
			boldAuthorStore,
			anchorStore,
			textAllNodeStore,
			textContentNodeStore,
			textAuthorNodeStore,
			quoteNodeStore,
			sigNodeStore,
			quoteNameStore);
	}
}

function saveHighlight(event)
{
	event.stopPropagation();
	mondo_pita_highlight_control.style.display = noneText;
	var elem = document.getElementById("mondo_pita_highlight_text");
	var userHiText = elem.value;
	elem = document.getElementById("mondo_pita_highlight_located");
	var userLocated = elem.value;
	elem = document.getElementById("mondo_pita_highlight_area");
	var userArea = elem.value;
	elem = document.getElementById("mondo_pita_highlight_fgcolor");
	var userfgColor = elem.value;
	elem = document.getElementById("mondo_pita_highlight_bgcolor");
	var userbgColor = elem.value;
	elem = document.getElementById("mondo_pita_highlight_fgRGB");
	var userfgRGB = elem.value;
	elem = document.getElementById("mondo_pita_highlight_bgRGB");
	var userbgRGB = elem.value;
	var checkNode = document.getElementById("mondo_pita_highlight_wholeword");
	var userWhole = checkNode.checked;
	checkNode = document.getElementById("mondo_pita_highlight_matchcase");
	var userCase =  checkNode.checked;
	checkNode = document.getElementById("mondo_pita_highlight_regexp");
	var userRegExp =  checkNode.checked;
	var rightNow = new Date();

	aHighlightInfo.push([
		userHiText,
		userLocated, userArea,
		userfgColor, userbgColor,
		userfgRGB, userbgRGB,
		userWhole, userCase, userRegExp,
		rightNow.getTime()]);
	nodeBreaker(flagHighlight, aHighlightInfo.length - 1);
	var gmKey = saveHighlightItem(aHighlightInfo[aHighlightInfo.length - 1]);
	aHighlightInfo[aHighlightInfo.length - 1][11] = gmKey;

	boxUp = 0;
}

function cancelHighlight(event)
{
	event.stopPropagation();
	boxUp = 0;
	mondo_pita_highlight_control.style.display = noneText;
}

function changeFgHighlight(event)
{
	event.stopPropagation();
	var sNode = document.getElementById( "mondo_pita_highlight_fgcolor");
	var iNode = document.getElementById( "mondo_pita_highlight_fgRGB");
	if (sNode.value === customText)
	{
		iNode.disabled = false;
		iNode.style.backgroundColor = whiteText;
		iNode.focus();
	}
	else
	{
		iNode.disabled = true;
		iNode.style.backgroundColor = "gray";
	}
}

function changeBgHighlight(event)
{
	event.stopPropagation();
	var sNode = document.getElementById( "mondo_pita_highlight_bgcolor");
	var iNode = document.getElementById( "mondo_pita_highlight_bgRGB");
	if (sNode.value === customText)
	{
		iNode.disabled = false;
		iNode.style.backgroundColor = whiteText;
		iNode.focus();
	}
	else
	{
		iNode.disabled = true;
		iNode.style.backgroundColor = "gray";
	}
}

// whichType == 1 for delete, 2 for tag, 3 for highlight, 4 for style
function showRuleInfo(ruleNumber, whichType)
{
	var rNode = document.getElementById( "mondo_pita_rulehead");
	var tNode = rNode.firstChild;
	if (!ruleNumber)
	{
		tNode.nodeValue = "Saved Rule 0 of 0";
		var aNode = document.getElementById( "mondo_pita_ruletext");
		aNode.style.visibility = hiddenText;
		aNode = document.getElementById( "mondo_pita_mantext");
		aNode.style.visibility = hiddenText;
	}
	else
	{
		switch (whichType)
		{
			case 1:
				var trueRuleNumber = ruleNumber;
				break;
			case 2:
				var trueRuleNumber = aDeleteInfo.length + ruleNumber;
				break;
			case 3:
				var trueRuleNumber = aTagInfo.length + aDeleteInfo.length + ruleNumber;
				break;
			case 4:
				var trueRuleNumber = aHighlightInfo.length + aTagInfo.length + aDeleteInfo.length + ruleNumber;
				break;
		}
		var ruleHead = "Saved Rule " + trueRuleNumber + " of " + (aDeleteInfo.length + aHighlightInfo.length + aTagInfo.length + aStyleInfo.length);
		tNode.nodeValue = ruleHead;
		var aNode = document.getElementById( "mondo_pita_mantext");
		tNode = aNode.firstChild;
		switch (whichType)
		{
			case 1:
				tNode.nodeValue = "Delete Text:";
				break;
			case 2:
				tNode.nodeValue = "Tag Text:";
				break;
			case 3:
				tNode.nodeValue = "Highlight Text:";
				break;
			case 4:
				tNode.nodeValue = "Style Text:";
				break;
		}
		aNode.style.fontWeight = "bold";
		aNode.style.visibility = visibleText;
		aNode = document.getElementById( "mondo_pita_ruletext");
		switch (whichType)
		{
			case 1:
				aNode.value = aDeleteInfo[ruleNumber - 1][0];
				break;
			case 2:
				aNode.value = aTagInfo[ruleNumber - 1][0];
				break;
			case 3:
				aNode.value = aHighlightInfo[ruleNumber - 1][0];
				break;
			case 4:
				aNode.value = aStyleInfo[ruleNumber - 1][0];
				break;
		}
		aNode.style.visibility = visibleText;
	}
	currentRuleNumber = ruleNumber;
	currentRuleType = whichType;
}

// currentRuleType == 1 for delete, 2 for tag, 3 for highlight, 4 for style
function prevManage(event)
{
	event.stopPropagation();
	if (!currentRuleNumber || !currentRuleType)
	{
		return;
	}
	if (currentRuleNumber > 1)
	{
		showRuleInfo(currentRuleNumber - 1, currentRuleType);
		return;
	}

	if (currentRuleType == 1)	// delete
	{
		if (aStyleInfo.length)
		{
			showRuleInfo(aStyleInfo.length, 4);
		}
		else if (aHighlightInfo.length)
		{
			showRuleInfo(aHighlightInfo.length, 3);
		}
		else if (aTagInfo.length)
		{
			showRuleInfo(aTagInfo.length, 2);
		}
		else
		{
			showRuleInfo(aDeleteInfo.length, 1);
		}
	}
	else if (currentRuleType == 2)	// tag
	{
		if (aDeleteInfo.length)
		{
			showRuleInfo(aDeleteInfo.length, 1);
		}
		else if (aStyleInfo.length)
		{
			showRuleInfo(aStyleInfo.length, 4);
		}
		else if (aHighlightInfo.length)
		{
			showRuleInfo(aHighlightInfo.length, 3);
		}
		else
		{
			showRuleInfo(aTagInfo.length, 2);
		}
	}
	else if (currentRuleType == 3)	// highlight
	{
		if (aTagInfo.length)
		{
			showRuleInfo(aTagInfo.length, 2);
		}
		else if (aDeleteInfo.length)
		{
			showRuleInfo(aDeleteInfo.length, 1);
		}
		else if (aStyleInfo.length)
		{
			showRuleInfo(aStyleInfo.length, 4);
		}
		else
		{
			showRuleInfo(aHighlightInfo.length, 3);
		}
	}
	else if (currentRuleType == 4)	// style
	{
		if (aHighlightInfo.length)
		{
			showRuleInfo(aHighlightInfo.length, 3);
		}
		else if (aTagInfo.length)
		{
			showRuleInfo(aTagInfo.length, 2);
		}
		else if (aDeleteInfo.length)
		{
			showRuleInfo(aDeleteInfo.length, 1);
		}
		else
		{
			showRuleInfo(aStyleInfo.length, 4);
		}
	}
}

// currentRuleType == 1 for delete, 2 for tag, 3 for highlight, 4 for style
function nextManage(event)
{
	event.stopPropagation();
	if (!currentRuleNumber || !currentRuleType)
	{
		return;
	}
	if (currentRuleType == 1)	// delete
	{
		if (currentRuleNumber < aDeleteInfo.length)
		{
			showRuleInfo(currentRuleNumber + 1, 1);
		}
		else
		{
			if (aTagInfo.length)
			{
				showRuleInfo(1, 2);
			}
			else if (aHighlightInfo.length)
			{
				showRuleInfo(1, 3);
			}
			else if (aStyleInfo.length)
			{
				showRuleInfo(1, 4);
			}
			else
			{
				showRuleInfo(1, 1);
			}
		}
	}
	else if (currentRuleType == 2)	// tag
	{
		if (currentRuleNumber < aTagInfo.length)
		{
			showRuleInfo(currentRuleNumber + 1, 2);
		}
		else
		{
			if (aHighlightInfo.length)
			{
				showRuleInfo(1, 3);
			}
			else if (aStyleInfo.length)
			{
				showRuleInfo(1, 4);
			}
			else if (aDeleteInfo.length)
			{
				showRuleInfo(1, 1);
			}
			else
			{
				showRuleInfo(1, 2);
			}
		}
	}
	else if (currentRuleType == 3)	// highlight
	{
		if (currentRuleNumber < aHighlightInfo.length)
		{
			showRuleInfo(currentRuleNumber + 1, 3);
		}
		else
		{
			if (aStyleInfo.length)
			{
				showRuleInfo(1, 4);
			}
			else if (aDeleteInfo.length)
			{
				showRuleInfo(1, 1);
			}
			else if (aTagInfo.length)
			{
				showRuleInfo(1, 2);
			}
			else
			{
				showRuleInfo(1, 3);
			}
		}
	}
	else if (currentRuleType == 4)	// style
	{
		if (currentRuleNumber < aStyleInfo.length)
		{
			showRuleInfo(currentRuleNumber + 1, 4);
		}
		else
		{
			if (aDeleteInfo.length)
			{
				showRuleInfo(1, 1);
			}
			else if (aTagInfo.length)
			{
				showRuleInfo(1, 2);
			}
			else if (aHighlightInfo.length)
			{
				showRuleInfo(1, 3);
			}
			else
			{
				showRuleInfo(1, 4);
			}
		}
	}
}

function deleteManage(event)
{
	event.stopPropagation();
	if (!currentRuleNumber || !currentRuleType)
	{
		return;
	}

	if (currentRuleType == 1)
	{
		freeSlot(aDeleteInfo[currentRuleNumber - 1][9]);	// rule ID
		aDeleteInfo.splice(currentRuleNumber - 1, 1);
	}
	else if (currentRuleType == 2)
	{
		freeSlot(aTagInfo[currentRuleNumber - 1][7]);
		aTagInfo.splice(currentRuleNumber - 1, 1);
	}
	else if (currentRuleType == 3)
	{
		freeSlot(aHighlightInfo[currentRuleNumber - 1][11]);
		aHighlightInfo.splice(currentRuleNumber - 1, 1);
	}
	else if (currentRuleType == 4)
	{
		freeSlot(aStyleInfo[currentRuleNumber - 1][8]);
		aStyleInfo.splice(currentRuleNumber - 1, 1);
	}

	if (currentRuleNumber > 1)
	{
		currentRuleNumber--;
	}
	if (!aDeleteInfo.length && !aTagInfo.length && !aHighlightInfo.length && !aStyleInfo.length)
	{
		showRuleInfo(0, 0);
		return;
	}
	while (1)
	{
		if (currentRuleType == 1 && !aDeleteInfo.length)
		{
			currentRuleNumber = 1;
			currentRuleType++;
		}
		else if (currentRuleType == 2 && !aTagInfo.length)
		{
			currentRuleNumber = 1;
			currentRuleType++;
		}
		else if (currentRuleType == 3 && !aHighlightInfo.length)
		{
			currentRuleNumber = 1;
			currentRuleType++;
		}
		else if (currentRuleType == 4 && !aStyleInfo.length)
		{
			currentRuleNumber = 1;
			currentRuleType = 1;
		}
		else
		{
			break;
		}
	}
	showRuleInfo(currentRuleNumber, currentRuleType);
}

function saveManageStatus()
{
	var gmKey = systemStatusText;
	// NB: system values are in order: delete,highlight,tag,style
	var infoString = String(deactivateDeleteFlag).length + ":" + deactivateDeleteFlag;
	infoString += String(deactivateHighlightFlag).length + ":" + deactivateHighlightFlag;
	infoString += String(deactivateTagFlag).length + ":" + deactivateTagFlag;
	infoString += String(deactivateStyleFlag).length + ":" + deactivateStyleFlag;
	var gmValue = systemHeader + infoString;
	GM_setValue(gmKey, gmValue);
}

function closeManage(event)
{
	event.stopPropagation();
	var checkNode = document.getElementById("mondo_pita_manage_deactdel");
	deactivateDeleteFlag = checkNode.checked;
/*
	checkNode = document.getElementById("mondo_pita_manage_deacthi");
	deactivateHighlightFlag = checkNode.checked;
	checkNode = document.getElementById("mondo_pita_manage_deacttag");
	deactivateTagFlag = checkNode.checked;
	checkNode = document.getElementById("mondo_pita_manage_deactsty");
	deactivateStyleFlag = checkNode.checked;
*/
	saveManageStatus();

	boxUp = 0;
	showRuleInfo(0, 0);
	mondo_pita_manage_control.style.display = noneText;
}

function processManage()
{
	mondo_pita_manage_control.style.display = "";
	var checkNode = document.getElementById("mondo_pita_manage_deactdel");
	checkNode.checked = deactivateDeleteFlag;
	checkNode = document.getElementById("mondo_pita_manage_deacthi");
	checkNode.checked = deactivateHighlightFlag;
	checkNode = document.getElementById("mondo_pita_manage_deacttag");
	checkNode.checked = deactivateTagFlag;
	checkNode = document.getElementById("mondo_pita_manage_deactsty");
	checkNode.checked = deactivateStyleFlag;
	if (aDeleteInfo.length)
	{
		showRuleInfo(1, 1);
	}
	else if (aTagInfo.length)
	{
		showRuleInfo(1, 2);
	}
	else if (aHighlightInfo.length)
	{
		showRuleInfo(1, 3);
	}
	else if (aStyleInfo.length)
	{
		showRuleInfo(1, 4);
	}
	else
	{
		showRuleInfo(0, 0);
	}
}

function do_a_mondo(event)
{
	event.stopPropagation();
	var which = event.target.selectedIndex;
	var choice =  event.target.options[which].value;
	if (choice === deleteFilterText && !boxUp)
	{
		boxUp = 1;
		mondo_pita_delete_control.style.display = "";
		var elem = document.getElementById("mondo_pita_delete_text");
		elem.focus();
	}
	else if  (choice === highlightText && !boxUp)
	{
		boxUp = 1;
		mondo_pita_highlight_control.style.display = "";
		var elem = document.getElementById("mondo_pita_highlight_text");
		elem.focus();
	}
	else if  (choice === tagText && !boxUp)
	{
		boxUp = 1;
		mondo_pita_tag_control.style.display = "";
		var elem = document.getElementById("mondo_pita_tag_text");
		elem.focus();
	}
	else if  (choice === styleText && !boxUp)
	{
		boxUp = 1;
		mondo_pita_style_control.style.display = "";
		var elem = document.getElementById("mondo_pita_style_text");
		elem.focus();
	}
	else if  (choice === manageText & !boxUp)
	{
		boxUp = 1;
		processManage();
	}

	event.target.selectedIndex = 0;
}

function processRule(rule, ruleID)
{
	if (rule.substr(0, 4).toUpperCase() != "USED")
	{
		freeRules.push(ruleID);
	}
	else
	{
		var bBad = false;
		var pos = usedRuleHeader.length;
		if (rule.substr(pos, deleteHeader.length) === deleteHeader)
		{
			pos += deleteHeader.length;
			// DelText, Located, How, Whole, Case, Links, RegExp, Duration, Date
			var storeDelText, storeLocated, storeHow;
			var storeWhole, storeCase, storeLinks, storeRegExp;
			var storeDuration, storeDate;
			for (var j = 0; !bBad && j < 9; j++)
			{
				var len = parseInt(rule.substr(pos));
				if (isNaN(len))
				{
					bBad = true;
					break;
				}
				pos = rule.indexOf(":", pos);
				if (pos == -1)
				{
					bBad = true;
					break;
				}
				pos++;
				var result = rule.substr(pos, len);
				pos += len;
				switch (j)
				{
					case 0:
						storeDelText = result;
						break;
					case 1:
						storeLocated = result;
						break;
					case 2:
						storeHow = result;
						break;
					case 3:
						storeWhole = (result === trueText ? true : false);
						break;
					case 4:
						storeCase = (result === trueText ? true : false);
						break;
					case 5:
						storeLinks = (result === trueText ? true : false);
						break;
					case 6:
						storeRegExp = (result === trueText ? true : false);
						break;
					case 7:
						storeDuration = result;
						break;
					case 8:
						storeDate = result;
						break;
				}
			}
			if (!bBad)
			{
				var rightNow = new Date();
				if (storeDate + parseInt(storeDuration) <= rightNow.getTime())
				{
					freeSlot(ruleID);
				}
				else
				{

					aDeleteInfo.push([
						storeDelText,
						storeLocated,
						storeHow,
						storeWhole,
						storeCase,
						storeLinks,
						storeRegExp,
						storeDuration,
						storeDate,
						ruleID]);
				}
			}
		}

		else if (rule.substr(pos, highlightHeader.length) === highlightHeader)
		{
			pos += highlightHeader.length;
			// HiText, Located, Area,
			// fgColor, userbgColor, userfgRGB, userbgRGB,
			// Whole, Case, RegExp, Date
			var storeHiText, storeLocated, storeArea;
			var storefgColor, storebgColor, storefgRGB, storebgRGB;
			var storeWhole, storeCase, storeRegExp, storeDate
			for (var j = 0; !bBad && j < 11; j++)
			{
				var len = parseInt(rule.substr(pos));
				if (isNaN(len))
				{
					bBad = true;
					break;
				}
				pos = rule.indexOf(":", pos);
				if (pos == -1)
				{
					bBad = true;
					break;
				}
				pos++;
				var result = rule.substr(pos, len);
				pos += len;
				switch (j)
				{
					case 0:
						storeHiText = result;
						break;
					case 1:
						storeLocated = result;
						break;
					case 2:
						storeArea = result;
						break;
					case 3:
						storefgColor = result;
						break;
					case 4:
						storebgColor = result;
						break;
					case 5:
						storefgRGB = result;
						break;
					case 6:
						storebgRGB = result;
						break;
					case 7:
						storeWhole = (result === trueText ? true : false);
						break;
					case 8:
						storeCase = (result === trueText ? true : false);
						break;
					case 9:
						storeRegExp = (result === trueText ? true : false);
						break;
					case 10:
						storeDate = result;
						break;
				}
			}
			if (!bBad)
			{
				aHighlightInfo.push([
					storeHiText,
					storeLocated,
					storeArea,
					storefgColor,
					storebgColor,
					storefgRGB,
					storebgRGB,
					storeWhole,
					storeCase,
					storeRegExp,
					storeDate,
					ruleID]);
			}
		}

		else if (rule.substr(pos, tagHeader.length) === tagHeader)
		{
			// userTagText, userLocated, userTagTags, userWhole, userCase, userRegExp,
			pos += tagHeader.length;
			var storeTagText, storeLocated, storeTagTags;
			var storeWhole, storeCase, storeRegExp, storeDate
			for (var j = 0; !bBad && j < 7; j++)
			{
				var len = parseInt(rule.substr(pos));
				if (isNaN(len))
				{
					bBad = true;
					break;
				}
				pos = rule.indexOf(":", pos);
				if (pos == -1)
				{
					bBad = true;
					break;
				}
				pos++;
				var result = rule.substr(pos, len);
				pos += len;
				switch (j)
				{
					case 0:
						storeTagText = result;
						break;
					case 1:
						storeLocated = result;
						break;
					case 2:
						storeTagTags = result;
						break;
					case 3:
						storeWhole = (result === trueText ? true : false);
						break;
					case 4:
						storeCase = (result === trueText ? true : false);
						break;
					case 5:
						storeRegExp = (result === trueText ? true : false);
						break;
					case 6:
						storeDate = result;
						break;
				}
			}
			if (!bBad)
			{
				aTagInfo.push([
					storeTagText,
					storeLocated,
					storeTagTags,
					storeWhole,
					storeCase,
					storeRegExp,
					storeDate,
					ruleID]);
			}
		}

		else if (rule.substr(pos, styleHeader.length) === styleHeader)
		{
			// userStyleText, userLocated, userStyleStyles, userWhole, userCase, userRegExp,
			pos += styleHeader.length;
			var storeStyleText, storeLocated, storeStyleStyles;
			var storeWhole, storeCase, storeRegExp, storeDate
			for (var j = 0; !bBad && j < 7; j++)
			{
				var len = parseInt(rule.substr(pos));
				if (isNaN(len))
				{
					bBad = true;
					break;
				}
				pos = rule.indexOf(":", pos);
				if (pos == -1)
				{
					bBad = true;
					break;
				}
				pos++;
				var result = rule.substr(pos, len);
				pos += len;
				switch (j)
				{
					case 0:
						storeStyleText = result;
						break;
					case 1:
						storeLocated = result;
						break;
					case 2:
						storeStyleStyles = result;
						break;
					case 3:
						storeWhole = (result === trueText ? true : false);
						break;
					case 4:
						storeCase = (result === trueText ? true : false);
						break;
					case 5:
						storeRegExp = (result === trueText ? true : false);
						break;
					case 6:
						storeDate = result;
						break;
				}
			}
			if (!bBad)
			{
				aStyleInfo.push([
					storeStyleText,
					storeLocated,
					storeStyleStyles,
					storeWhole,
					storeCase,
					storeRegExp,
					false,
					storeDate,
					ruleID]);
			}
		}

		if (bBad)
		{
			// couldn't parse it, kill the rule
			freeSlot(ruleID);
		}
	}
}

function processSystemStatus()
{
	var settingsExist = ((statusValues = GM_getValue(systemStatusText, "x")) != "x");
	if (!settingsExist)
	{
		return;
	}
	// system values are in order: delete,highlight,tag,style
	if (statusValues.substr(0, systemHeader.length) === systemHeader)
	{
		var pos = systemHeader.length;
		for (var j = 0; j < 4; j++)
		{
			var len = parseInt(statusValues.substr(pos));
			if (isNaN(len))
			{
				break;
			}
			pos = statusValues.indexOf(":", pos);
			if (pos == -1)
			{
				break;
			}
			pos++;
			var result = statusValues.substr(pos, len);
			pos += len;
			switch (j)
			{
				case 0:
					deactivateDeleteFlag = (result === trueText ? true : false);
					break;
				case 1:
					deactivateHighlightFlag = (result === trueText ? true : false);
					break;
				case 2:
					deactivateTagFlag = (result === trueText ? true : false);
					break;
				case 3:
					deactivateStyleFlag = (result === trueText ? true : false);
					break;
				default:
			}
		}
	}
}

// load existing filter/highlight info settings and process them
function loadPermanentInfo()
{
	processSystemStatus();
	var count = 0;
	var rule;
	var ruleID;
	freeRules.length = aDeleteInfo.length = aHighlightInfo.length = 0;
	aTagInfo.length = aStyleInfo.length = 0;
	while ((rule = GM_getValue(ruleID = ("Rule"+(++count)), "x")) != "x")
	{
		processRule(rule, ruleID);
		storedRuleCount++;	// increments even on invalid rule
	}
	nodeBreaker(flagMultiple, 0);

	var mmParam = GM_getValue("moveMouseAreaWidth", xText);
	if (mmParam != xText)
	{
		moveMouseAreaWidth = mmParam;
	}
	else
	{
		GM_setValue("moveMouseAreaWidth", moveMouseAreaWidth);
	}
	mmParam = GM_getValue("moveMouseAreaSeconds", xText);
	if (mmParam != xText)
	{
		moveMouseAreaSeconds = mmParam;
	}
	else
	{
		GM_setValue("moveMouseAreaSeconds", moveMouseAreaSeconds);
	}
	mmParam = GM_getValue("dropdownPeekABoo", xText);
	if (mmParam != xText)
	{
		dropdownPeekABoo = (mmParam === trueText ? true : false);
	}
	else
	{
		GM_setValue("dropdownPeekABoo", falseText);
	}
}

function init()
{
	mondo_pita_control = document.getElementById( "mondo_pita_control")
	if (mondo_pita_control)
	{
		return;
	}
	GM_setValue("Version", mondoPitaVersion);
	loadPermanentInfo();

	mondo_pita_control = document.createElement("select");
	mondo_pita_control.style.position = "fixed";
	mondo_pita_control.style.bottom = "5px";
	mondo_pita_control.style.right = "5px";
	mondo_pita_control.style.fontSize = "12px";
	mondo_pita_control.style.color = darkBlueText;
	mondo_pita_control.style.backgroundColor = whiteText;

	var opt_count = 0;
	var optmmo = document.createElement(optionText);
	optmmo.text = "Mondo Pita Options";
	optmmo.value = defaultText;
	optmmo.defaultselected = true;
	optmmo.selected = true;
	optmmo.style.color = darkBlueText;
	optmmo.style.backgroundColor = whiteText;
	mondo_pita_control.options[opt_count++] = optmmo;

	var optfd = document.createElement(optionText);
	optfd.text = deleteFilterText;
	optfd.value = deleteFilterText;
	optfd.style.color = darkBlueText;
	optfd.style.backgroundColor = whiteText;
	mondo_pita_control.options[opt_count++] = optfd;

	var opthi = document.createElement(optionText);
	opthi.text = highlightText;
	opthi.value = highlightText;
	opthi.style.color = darkBlueText;
	opthi.style.backgroundColor = whiteText;
//	mondo_pita_control.options[opt_count++] = opthi;

	var optsty = document.createElement(optionText);
	optsty.text = styleText;
	optsty.value = styleText;
	optsty.style.color = darkBlueText;
	optsty.style.backgroundColor = whiteText;
//	mondo_pita_control.options[opt_count++] = optsty;

	var opttag = document.createElement(optionText);
	opttag.text = tagText;
	opttag.value = tagText;
	opttag.style.color = darkBlueText;
	opttag.style.backgroundColor = whiteText;
//	mondo_pita_control.options[opt_count++] = opttag;

	var optman = document.createElement(optionText);
	optman.text = manageText;
	optman.value = manageText;
	optman.style.color = darkBlueText;
	optman.style.backgroundColor = whiteText;
	mondo_pita_control.options[opt_count++] = optman;

	mondo_pita_control.length = opt_count;
	mondo_pita_control.addEventListener('change', do_a_mondo, false);
	document.getElementsByTagName('body')[0].appendChild(mondo_pita_control);

	var addHeader =
		'td.mondo_pita_basicstyle INPUT,td.mondo_pita_basicstyle SELECT,td.mondo_pita_basicstyle DIV,td.mondo_pita_basicstyle SPAN' +
		'{ font: 12px Verdana, Arial, Helvetica, sans-serif; text-align: left; 	line-height: 1 !important; vertical-align: middle; }' +
		'td.mondo_pita_basicstyle INPUT,td.mondo_pita_basicstyle SELECT' +
		'{ background-color: white;}' +
		'td.mondo_pita_basicstyle SPAN { color: darkblue }' +
		'.mondo_pita_title { font-weight: bold !important; font-size: 18px !important; padding-bottom: 8px; margin-left: 140px; line-height: 1 !important; margin-bottom: 0px !important; }' +
		'.mondo_pita_minititle { font-weight: bold !important; font-size: 14px !important; padding-bottom: 8px; margin-left: 20px; }' +
		'.mondo_pita_label { font-weight: bold; text-align: right !important; float: left !important; width: 140px; vertical-align: baseline !important; line-height: 1 !important; }' +
		'.mondo_pita_userinput { float: left; width: 230px; vertical-align: middle !important; line-height: 1 !important; margin: 0px; padding: 0px !important; border: 1 !important; }' +
		'.mondo_pita_checks { font-weight: bold; float: left;  vertical-align: top; }' +
		'.mondo_pita_rgb { width: 90px; }' +
		'.mondo_pita_duration { width: 40px; }' +
		'.mondo_pita_smallindent, .mondo_pita_mantext { margin-left: 20px !important; }' +
		'.mondo_pita_manage { width: 320px; float: left; }' +
		'.mondo_pita_mantext { text-align: right; float: left; }' +
		'.mondo_pita_inviso { visibility: hidden; }' +
		'button.mondo_pita { width: 70px; position: relative !important; bottom: 10px; text-align: left !important; padding: 0 !important; margin-right: 0 !important; margin-top: 0 !important; margin-bottom: 0 !important; }';
	var test_style = document.createElement("style");
	test_style.setAttribute('type', 'text/css');
	test_style.innerHTML = addHeader;
	document.getElementsByTagName('head')[0].appendChild(test_style);

	mondo_pita_highlight_control = document.createElement("td");
	mondo_pita_highlight_control.className = "mondo_pita_basicstyle";
	mondo_pita_highlight_control.style.lineHeight = "26px";
	mondo_pita_highlight_control.style.color = darkBlueText;
	mondo_pita_highlight_control.style.position = "fixed";
	mondo_pita_highlight_control.style.bottom = "40px";
	mondo_pita_highlight_control.style.right = "5px";
	mondo_pita_highlight_control.style.backgroundColor = "#FFCFCF";
	mondo_pita_highlight_control.style.borderColor = "black";
	mondo_pita_highlight_control.style.borderWidth = "1px";
	mondo_pita_highlight_control.style.borderStyle = "solid";
	mondo_pita_highlight_control.style.opacity = ".94";
	mondo_pita_highlight_control.style.display = noneText;

	var highlightHtml =
		'<div class="mondo_pita_title">Mondo Pita Highlight</div>' +
		'<div>' +
		'<span class="mondo_pita_label">Highlight text:&nbsp;</span>' +
		'<input id="mondo_pita_highlight_text" class="mondo_pita_userinput" type="text">' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_highlight_wholeword" type="checkbox">Whole word only</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Located in:&nbsp;</span>' +
		'<span class="mondo_pita_userinput">' +
		'<select id="mondo_pita_highlight_located"><option>'+contentText+'</option><option>'+authorText+'</option><option>'+contentAuthorText+'</option></select>' +
		'</span>' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_highlight_matchcase" type="checkbox">Match case</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Area highlighted:&nbsp;</span>' +
		'<span class="mondo_pita_userinput">' +
		'<select id="mondo_pita_highlight_area">' +
		'<option>Author only</option>' +
		'<option>Entire post</option>' +
		'</select>' +
		'</span>' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_highlight_regexp" type="checkbox">Regular expression</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Foreground color:&nbsp;</span>' +
		'<span style="float: left">' +
		'<select id="mondo_pita_highlight_fgcolor">' +
		'<option>aqua</option>' +
		'<option>black</option>' +
		'<option selected>blue</option>' +
		'<option>cyan</option>' +
		'<option>gray</option>' +
		'<option>green</option>' +
		'<option>lime</option>' +
		'<option>magenta</option>' +
		'<option>maroon</option>' +
		'<option>navy</option>' +
		'<option>olive</option>' +
		'<option>purple</option>' +
		'<option>red</option>' +
		'<option>teal</option>' +
		'<option>white</option>' +
		'<option>yellow</option>' +
		'<option>Unchanged</option>' +
		'<option>Custom</option>' +
		'</select>' +
		'&nbsp;<b>RGB:</b>' +
		'<input id="mondo_pita_highlight_fgRGB" class="mondo_pita_rgb" disabled type="text" style="background-color: gray;">' +
		'</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Background color:&nbsp;</span>' +
		'<span style="float: left">' +
		'<select id="mondo_pita_highlight_bgcolor">' +
		'<option>aqua</option>' +
		'<option>black</option>' +
		'<option>blue</option>' +
		'<option>cyan</option>' +
		'<option>gray</option>' +
		'<option>green</option>' +
		'<option>lime</option>' +
		'<option>magenta</option>' +
		'<option>maroon</option>' +
		'<option>navy</option>' +
		'<option>olive</option>' +
		'<option>purple</option>' +
		'<option>red</option>' +
		'<option>teal</option>' +
		'<option>white</option>' +
		'<option selected>yellow</option>' +
		'<option>Unchanged</option>' +
		'<option>Custom</option>' +
		'</select>' +
		'&nbsp;<b>RGB:</b>' +
		'<input id="mondo_pita_highlight_bgRGB" class="mondo_pita_rgb" disabled type="text" style="background-color: gray;">' +
		'</span>' +
		'</div><br><br><br>';

	mondo_pita_highlight_control.innerHTML = highlightHtml;
	var saveNode = document.createElement(buttonText);
	saveNode.setAttribute("class", "mondo_pita");
	saveNode.style.marginLeft = "140px";
	saveNode.appendChild(document.createTextNode("Save"));
	var cancelNode = document.createElement(buttonText);
	cancelNode.setAttribute("class", "mondo_pita");
	cancelNode.style.marginLeft = "220px";
	cancelNode.appendChild(document.createTextNode("Cancel"));
	mondo_pita_highlight_control.appendChild(saveNode);
	mondo_pita_highlight_control.appendChild(cancelNode);
//	document.getElementsByTagName('body')[0].appendChild(mondo_pita_highlight_control);

	var sNode = document.getElementById( "mondo_pita_highlight_fgcolor");
//	sNode.addEventListener('change', changeFgHighlight, true);
	sNode = document.getElementById( "mondo_pita_highlight_bgcolor");
//	sNode.addEventListener('change', changeBgHighlight, true);
//	saveNode.addEventListener(clickText, saveHighlight, true);
//	cancelNode.addEventListener(clickText, cancelHighlight, true);

	mondo_pita_delete_control = document.createElement("td");
	mondo_pita_delete_control.className = "mondo_pita_basicstyle";
	mondo_pita_delete_control.style.lineHeight = "26px";
	mondo_pita_delete_control.style.color = darkBlueText;
	mondo_pita_delete_control.style.position = "fixed";
	mondo_pita_delete_control.style.bottom = "40px";
	mondo_pita_delete_control.style.right = "5px";
	mondo_pita_delete_control.style.backgroundColor = "#FFCFCF";
	mondo_pita_delete_control.style.borderColor = "black";
	mondo_pita_delete_control.style.borderWidth = "1px";
	mondo_pita_delete_control.style.borderStyle = "solid";
	mondo_pita_delete_control.style.opacity = ".94";
	mondo_pita_delete_control.style.display = noneText;

	var deleteHtml =
		'<div class="mondo_pita_title">Mondo Pita Delete-Filter</div>' +
		'<div>' +
		'<span class="mondo_pita_label">Delete if text:&nbsp;</span>' +
		'<input id="mondo_pita_delete_text" class="mondo_pita_userinput" type="text">' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_delete_wholeword" type="checkbox">Whole word only</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Located in:&nbsp;</span>' +
		'<span class="mondo_pita_userinput">' +
		'<select id="mondo_pita_delete_located"><option>'+contentText+'</option><option>'+authorText+'</option><option>'+contentAuthorText+'</option></select>' +
		'</span>' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_delete_matchcase" type="checkbox">Match case</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">How:&nbsp;</span>' +
		'<span class="mondo_pita_userinput">' +
		'<select id="mondo_pita_delete_how">' +
		'<option>'+removeText+'</option>' +
		'<option>'+invisibleText+'</option>' +
//		'<option>'+fg_bgText+'</option>' +
		'</select>' +
		'</span>' +
		'<span class="mondo_pita_checks mondo_pita_inviso"><input id="mondo_pita_delete_matchlinks" type="checkbox">Match links</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Duration:&nbsp;</span>' +
		'<span class="mondo_pita_userinput">' +
		'<input id="mondo_pita_delete_duration" class="mondo_pita_duration" type="text" value="90">' +
		'&nbsp;<b>day(s)</b>' +
		'</span>' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_delete_regexp" type="checkbox">Regular expression</span>' +
		'</div><div></div><br><br>';

	mondo_pita_delete_control.innerHTML = deleteHtml;
	var saveNode = document.createElement(buttonText);
	saveNode.setAttribute("class", "mondo_pita");
	saveNode.style.marginLeft = "140px";
	saveNode.appendChild(document.createTextNode("Save "));
	var cancelNode = document.createElement(buttonText);
	cancelNode.setAttribute("class", "mondo_pita");
//	cancelNode.style.marginLeft = "220px";
	cancelNode.style.marginLeft = "20px";
	cancelNode.appendChild(document.createTextNode("Cancel"));
	mondo_pita_delete_control.appendChild(saveNode);
	mondo_pita_delete_control.appendChild(cancelNode);
	document.getElementsByTagName('body')[0].appendChild(mondo_pita_delete_control);

	saveNode.addEventListener(clickText, saveDelete, true);
	cancelNode.addEventListener(clickText, cancelDelete, true);

	mondo_pita_tag_control = document.createElement("td");
	mondo_pita_tag_control.className = "mondo_pita_basicstyle";
	mondo_pita_tag_control.style.lineHeight = "26px";
	mondo_pita_tag_control.style.color = darkBlueText;
	mondo_pita_tag_control.style.position = "fixed";
	mondo_pita_tag_control.style.bottom = "40px";
	mondo_pita_tag_control.style.right = "5px";
	mondo_pita_tag_control.style.backgroundColor = "#FFCFCF";
	mondo_pita_tag_control.style.borderColor = "black";
	mondo_pita_tag_control.style.borderWidth = "1px";
	mondo_pita_tag_control.style.borderStyle = "solid";
	mondo_pita_tag_control.style.opacity = ".94";
	mondo_pita_tag_control.style.display = noneText;

	var tagHtml =
		'<div class="mondo_pita_title">Mondo Pita Tag</div>' +
		'<div>' +
		'<span class="mondo_pita_label">Tag text:&nbsp;</span>' +
		'<input id="mondo_pita_tag_text" class="mondo_pita_userinput" type="text">' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_tag_wholeword" type="checkbox">Whole word only</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Located in:&nbsp;</span>' +
		'<span class="mondo_pita_userinput">' +
		'<select id="mondo_pita_tag_located"><option>'+contentText+'</option><option>'+authorText+'</option><option>'+contentAuthorText+'</option></select>' +
		'</span>' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_tag_matchcase" type="checkbox">Match case</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Use Tags:&nbsp;</span>' +
		'<input id="mondo_pita_tag_tags" class="mondo_pita_userinput" type="text">' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_tag_regexp" type="checkbox">Regular expression</span>' +
		'</div><br><br><br>';

	mondo_pita_tag_control.innerHTML = tagHtml;
	var saveNode = document.createElement(buttonText);
	saveNode.setAttribute("class", "mondo_pita");
	saveNode.style.marginLeft = "140px";
	saveNode.appendChild(document.createTextNode("Save"));
	var cancelNode = document.createElement(buttonText);
	cancelNode.setAttribute("class", "mondo_pita");
	cancelNode.style.marginLeft = "220px";
	cancelNode.appendChild(document.createTextNode("Cancel"));
	mondo_pita_tag_control.appendChild(saveNode);
	mondo_pita_tag_control.appendChild(cancelNode);
//	document.getElementsByTagName('body')[0].appendChild(mondo_pita_tag_control);

//	saveNode.addEventListener(clickText, saveTag, true);
//	cancelNode.addEventListener(clickText, cancelTag, true);

	mondo_pita_style_control = document.createElement("td");
	mondo_pita_style_control.className = "mondo_pita_basicstyle";
	mondo_pita_style_control.style.lineHeight = "26px";
	mondo_pita_style_control.style.color = darkBlueText;
	mondo_pita_style_control.style.position = "fixed";
	mondo_pita_style_control.style.bottom = "40px";
	mondo_pita_style_control.style.right = "5px";
	mondo_pita_style_control.style.backgroundColor = "#FFCFCF";
	mondo_pita_style_control.style.borderColor = "black";
	mondo_pita_style_control.style.borderWidth = "1px";
	mondo_pita_style_control.style.borderStyle = "solid";
	mondo_pita_style_control.style.opacity = ".94";
	mondo_pita_style_control.style.display = noneText;

	var styleHtml =
		'<div class="mondo_pita_title">Mondo Pita Style</div>' +
		'<div>' +
		'<span class="mondo_pita_label">Style text:&nbsp;</span>' +
		'<input id="mondo_pita_style_text" class="mondo_pita_userinput" type="text">' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_style_wholeword" type="checkbox">Whole word only</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Located in:&nbsp;</span>' +
		'<span class="mondo_pita_userinput">' +
		'<select id="mondo_pita_style_located"><option>'+contentText+'</option><option>'+authorText+'</option><option>'+contentAuthorText+'</option></select>' +
		'</span>' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_style_matchcase" type="checkbox">Match case</span>' +
		'</div><br><div>' +
		'<span class="mondo_pita_label">Use Style:&nbsp;</span>' +
		'<input id="mondo_pita_style_styles" class="mondo_pita_userinput" type="text">' +
		'<span class="mondo_pita_checks"><input id="mondo_pita_style_regexp" type="checkbox">Regular expression</span>' +
		'</div><br><br><br>';

	mondo_pita_style_control.innerHTML = styleHtml;
	var saveNode = document.createElement(buttonText);
	saveNode.setAttribute("class", "mondo_pita");
	saveNode.style.marginLeft = "140px";
	saveNode.appendChild(document.createTextNode("Save"));
	var cancelNode = document.createElement(buttonText);
	cancelNode.setAttribute("class", "mondo_pita");
	cancelNode.style.marginLeft = "220px";
	cancelNode.appendChild(document.createTextNode("Cancel"));
	mondo_pita_style_control.appendChild(saveNode);
	mondo_pita_style_control.appendChild(cancelNode);
//	document.getElementsByTagName('body')[0].appendChild(mondo_pita_style_control);

//	saveNode.addEventListener(clickText, saveStyle, true);
//	cancelNode.addEventListener(clickText, cancelStyle, true);

	mondo_pita_manage_control = document.createElement("td");
	mondo_pita_manage_control.className = "mondo_pita_basicstyle";
	mondo_pita_manage_control.style.lineHeight = "24px";
	mondo_pita_manage_control.style.color = darkBlueText;
	mondo_pita_manage_control.style.position = "fixed";
	mondo_pita_manage_control.style.bottom = "40px";
	mondo_pita_manage_control.style.right = "5px";
	mondo_pita_manage_control.style.backgroundColor = "#FFCFCF";
	mondo_pita_manage_control.style.borderColor = "black";
	mondo_pita_manage_control.style.borderWidth = "1px";
	mondo_pita_manage_control.style.borderStyle = "solid";
	mondo_pita_manage_control.style.opacity = ".94";
	mondo_pita_manage_control.style.display = noneText;

	var manageHtml =
		'<div class="mondo_pita_title">Manage Mondo Pita</div>' +
		'<div id="mondo_pita_rulehead" class="mondo_pita_minititle">Saved Rule</div>' +
		'<div><span class="mondo_pita_manage">' +
		'&nbsp;</span>' +
		'<input id="mondo_pita_manage_deactdel" type="checkbox">' +
		'<span>Deactivate All Filters</span></div>' +
		'<div><span class="mondo_pita_manage">' +
		'&nbsp;</span>' +
		'<input id="mondo_pita_manage_deacttag" class="mondo_pita_inviso" type="checkbox">' +
		'<span class="mondo_pita_inviso">Deactivate All Tags</span></div>' +
		'<div><span class="mondo_pita_manage">' +
		'<span id="mondo_pita_mantext" class="mondo_pita_mantext">Highlight Text:</span></span>' +
		'<input id="mondo_pita_manage_deacthi" class="mondo_pita_inviso" type="checkbox">' +
		'<span class="mondo_pita_inviso">Deactivate All Highlights</span></div>' +
		'<div><span class="mondo_pita_manage">' +
		'<input id="mondo_pita_ruletext" class="mondo_pita_userinput mondo_pita_smallindent" type="text"></span>' +
		'<input id="mondo_pita_manage_deactsty" class="mondo_pita_inviso" type="checkbox">' +
		'<span class="mondo_pita_inviso">Deactivate All Styles</span></div><br>' +
		'<span class="mondo_pita_smallindent"><b>Web pages must be refreshed to show changes.</b></span><br><br><br>';

	mondo_pita_manage_control.innerHTML = manageHtml;
	var prevNode = document.createElement(buttonText);
	prevNode.setAttribute("class", "mondo_pita");
	prevNode.style.marginLeft = "20px";
	prevNode.appendChild(document.createTextNode("Previous"));
	mondo_pita_manage_control.appendChild(prevNode);
	var nextNode = document.createElement(buttonText);
	nextNode.setAttribute("class", "mondo_pita");
//	nextNode.style.marginLeft = "100px";
	nextNode.style.marginLeft = "20px";
	nextNode.appendChild(document.createTextNode("Next"));
	mondo_pita_manage_control.appendChild(nextNode);
	var deleteNode = document.createElement(buttonText);
	deleteNode.setAttribute("class", "mondo_pita");
//	deleteNode.style.marginLeft = "220px";
	deleteNode.style.marginLeft = "40px";
	deleteNode.appendChild(document.createTextNode("Delete"));
	mondo_pita_manage_control.appendChild(deleteNode);
	var closeNode = document.createElement(buttonText);
	closeNode.setAttribute("class", "mondo_pita");
//	closeNode.style.marginLeft = "400px";
	closeNode.style.marginLeft = "40px";
	closeNode.appendChild(document.createTextNode("Close"));
	mondo_pita_manage_control.appendChild(closeNode);
	document.getElementsByTagName('body')[0].appendChild(mondo_pita_manage_control);
	prevNode.addEventListener(clickText, prevManage, true);
	nextNode.addEventListener(clickText, nextManage, true);
	deleteNode.addEventListener(clickText, deleteManage, true);
	closeNode.addEventListener(clickText, closeManage, true);

	if (dropdownPeekABoo)
	{
		mondo_pita_control.style.display = noneText;
		window.addEventListener("mousemove", handleMouseMove, true);
	}
}

function handleMouseMove(event)
{
	if (event.clientX > moveMouseAreaWidth && event.clientX < document.body.clientWidth - moveMouseAreaWidth)
	{
		return;
	}
	if (handleMouseMove.currentDirection == null)
	{
		if (event.clientX <= moveMouseAreaWidth)
		{
			handleMouseMove.currentDirection = 0;
		}
		else
		{
			handleMouseMove.currentDirection = 1;
		}
		return;
	}
	if (event.clientX <= moveMouseAreaWidth)
	{
		if (!handleMouseMove.currentDirection)
		{
			return;
		}
		else
		{
			handleMouseMove.currentDirection = 0;
		}
	}
	if (event.clientX > document.body.clientWidth - moveMouseAreaWidth)
	{
		if (handleMouseMove.currentDirection)
		{
			return;
		}
		else
		{
			handleMouseMove.currentDirection = 1;
		}
	}
	var rightNow = new Date();
	var lastTime = rightNow.getTime();
	if (handleMouseMove.timeStamp == null)
	{
		handleMouseMove.timeStamp = 0;
	}
	if (handleMouseMove.timeStamp == 0)
	{
		handleMouseMove.timeStamp = lastTime;
	}
	else if (handleMouseMove.timeStamp + moveMouseAreaSeconds * 1000 < lastTime)
	{
		handleMouseMove.timeStamp = lastTime;
		handleMouseMove.moveCount = 0;
	}
	if (handleMouseMove.moveCount == null)
	{
		handleMouseMove.moveCount = 0;
	}
	handleMouseMove.moveCount++;
	if (handleMouseMove.moveCount < 3)
	{
		return;
	}
	handleMouseMove.moveCount = 0;
	handleMouseMove.timeStamp = 0;
	handleMouseMove.currentDirection == null;
	if (mondo_pita_control.style.display == noneText)
	{
		mondo_pita_control.style.display = "";
	}
	else
	{
		mondo_pita_control.style.display = noneText;
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

main();
