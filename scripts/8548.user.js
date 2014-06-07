// abef.user.js
//
// Copyright 2007-2013, Michael Devore
// This file is licensed under the terms of the Artistic License 2.0.
// See http://opensource.org/licenses/artistic-license-2.0 for the license itself.
//
// This is a Greasemonkey script.
// See http://www.greasespot.net/ for more information on Greasemonkey.
//
// ==UserScript==
// @name          A Better eBay Filter
// @namespace     http://www.devoresoftware.com/gm/abef
// @description	Allow filtering eBay searches based on additional criteria, Global site support
// @version       6.0
// @include       http://*listings*.ebay.*/*
// @include       http://*search*.ebay.*/*
// @include       http://*shop*.ebay.*/*
// @include       http://www.ebay.*/sch/*
// ==/UserScript==
//
// Work begun, February 2007
// Version 1.0, released April 2007
// Version 2.0, released late-April 2007
// Version 3.0, release early January 2010, rework for revised eBay
// Version 3.1, release mid-January 2010, fix for eBay Motors
// Version 3.2, release early September 2010, fix for Ebay update
// Version 4.0, release November 2010, add support for Top-rated seller filtering
// Version 4.1, release November 2011, add @include to support changed eBay search links
// Version 5.0, release March 2012, rework due to eBay changing internals
// Version 6.0, release February 2013, rework due to eBay redesign

var defaultScoreThreshold = 50;
var defaultPercentThreshold = 98.5;
var defaultScoreMax = "";
var FILTER_SCORE_FLAG = 1;
var FILTER_PERCENT_FLAG = FILTER_SCORE_FLAG << 1;
var FILTER_SCOREMAX_FLAG = FILTER_PERCENT_FLAG << 1;
var filteredCount = 0;
var buttonText = "button";
var divText = "DIV";
var spanText = "SPAN";
var inputText = "INPUT";
var brText = "BR";
var noneText = "none";
var xText = "x";
var changedText = "\u00a0 (Values changed.)";
var changeNode = null;
var configNode = null;
var filteredNode = null;
var scoreThreshold = defaultScoreThreshold;
var percentThreshold = defaultPercentThreshold;
var scoreMax = defaultScoreMax;
var noTrsChecked = false;

var abefActiveControl = null;

function getAbefConfiguration()
{
	var abefParam = GM_getValue("scoreThreshold", xText);
	if (abefParam != xText)
	{
		scoreThreshold = abefParam - 0;
	}
	else
	{
		GM_setValue("scoreThreshold", scoreThreshold + "");
	}
	abefParam = GM_getValue("percentThreshold", xText);
	if (abefParam != xText)
	{
		percentThreshold = abefParam - 0;
	}
	else
	{
		GM_setValue("percentThreshold", percentThreshold + "");
	}
	abefParam = GM_getValue("scoreMax", xText);
	if (abefParam != xText)
	{
		if (isNaN(parseInt(abefParam)))
		{
			scoreMax = "";
		}
		else
		{
			scoreMax = abefParam - 0;
		}
	}
	else
	{
		GM_setValue("scoreMax", scoreMax + "");
	}

	abefParam = GM_getValue("noTrsChecked", xText);
	if (abefParam != xText)
	{
		noTrsChecked = abefParam;
	}
	else
	{
		GM_setValue("noTrsChecked", noTrsChecked);
	}
}

function updateAbefConfiguration()
{
	GM_setValue("scoreThreshold", scoreThreshold + "");
	GM_setValue("percentThreshold", percentThreshold + "");
	GM_setValue("scoreMax", scoreMax + "");
	GM_setValue("noTrsChecked",noTrsChecked);
}

function showFilteredCount()
{
	filteredNode.nodeValue =
		"\u00a0 " + filteredCount + " entr"+ (filteredCount != 1 ? "ies" : "y") + " filtered from view";
	configNode.parentNode.appendChild(filteredNode);
}

function newFilterValues(event)
{
	if (event != null)
	{
		event.preventDefault();
		event.stopPropagation();
	}
	if (configNode.nextSibling == changeNode)
	{
		configNode.parentNode.removeChild(changeNode);
	}

	var fNode = document.getElementById("fbScore");
	scoreThreshold = fNode.value - 0;	// force numeric
	fNode = document.getElementById("fbPercent");
	percentThreshold = fNode.value - 0;
	fNode = document.getElementById("fbMax");
	if (isNaN(parseInt(fNode.value)))
	{
		scoreMax = "";
	}
	else
	{
		scoreMax = fNode.value - 0;
	}
	fNode = document.getElementById("fbTrs");
	noTrsChecked = fNode.checked;
	updateAbefConfiguration();
	walkTheListings();
}

function changedFilter(event)
{
	if (event != null)
	{
		event.preventDefault();
		event.stopPropagation();
	}
	if (configNode.nextSibling == changeNode)
	{
		return;
	}
	if (configNode.nextSibling == filteredNode)
	{
		configNode.parentNode.removeChild(filteredNode);
	}
	configNode.parentNode.appendChild(changeNode);
}

function getFeedbackScore(textNode)
{
	if (!textNode.nodeValue)
	{
		return xText;
	}
	var s = textNode.nodeValue;
	var result;
	if ((result = s.match(/([\.,0-9]+)/)) != null)
	{
		// remove comma and period
		result[1] = result[1].replace(/[\.,]/g, "");
		return result[1] - 0;	// force numeric
	}
	return xText;
}

function getFeedbackPercent(textNode)
{
	if (!textNode.nodeValue)
	{
		return xText;
	}
	var s = textNode.nodeValue;
	var result;
	// globalize by accepting comma as a period
	if ((result = s.match(/([\.,0-9]+)%/)) != null)
	{
		// change comma, if any, to period
		result[1] = result[1].replace(/,/, ".");
		return result[1] - 0;	// force numeric
	}
	return xText;
}

function shouldFilterOut(spanNode)
{
	var cNode = spanNode.firstChild;
	var validScore = false;
	var validPercent = false;
	var feedbackScore = 0;
	var feedbackPercent = 0;

	while (cNode && (!validScore || !validPercent))
	{
		if (cNode.nodeName === "#text")
		{
			if (!validPercent)
			{
				if ((feedbackPercent = getFeedbackPercent(cNode)) != xText)
				{
					validPercent = true;
				}
			}
			else if (!validScore)
			{
				if ((feedbackScore = getFeedbackScore(cNode)) != xText)
				{
					validScore = true;
				}
			}
		}
		cNode = cNode.nextSibling;
	}

	var retValue = 0;
	if (validScore && feedbackScore < scoreThreshold)
	{
		retValue |= FILTER_SCORE_FLAG;
	}
	if (validPercent && feedbackPercent < percentThreshold)
	{
		retValue |= FILTER_PERCENT_FLAG;
	}
	if (validScore && !isNaN(parseInt(scoreMax)) && feedbackScore > scoreMax)
	{
		retValue |= FILTER_SCOREMAX_FLAG;
	}
	if (retValue)
	{
		filteredCount++;
	}

	return retValue;
}

function walkTheListings()
{
	filteredCount = 0;

	var xpath = "//div[@id='Results']//a[@class='lv-1st']";
	var aNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	var aStore = new Array();
	for (var loopVar = 0; loopVar < aNodes.snapshotLength; loopVar++)
	{
		var aNode = aNodes.snapshotItem(loopVar);
		aStore[loopVar] = aNode;
	}

//	var xpath2 = "//div[@class='s1']/span[@class='v']";
	var xpath2 = "//div[@class='logos']";

	var divNodes = document.evaluate(
		xpath2,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		aNodes
	);

	var entryCounter = 0;
	for (var loopVar = 0; loopVar < divNodes.snapshotLength; loopVar++)
	{
		var aNode = aStore[entryCounter++];
		if (aNode == null)
		{
			break;
		}

		var divNode = divNodes.snapshotItem(loopVar);
		var prevNode = divNode.previousSibling;
		while (prevNode && prevNode.nodeName !== "DIV")
		{
			prevNode = prevNode.previousSibling;
		}
		if (!prevNode)
		{
			break;
		}

		var divS1Node = prevNode.lastChild;
		while (divS1Node && divS1Node.className !== "s1")
		{
			divS1Node = divS1Node.previousSibling;
		}
		if (!divS1Node)
		{
			break;
		}

		var spanNode = divS1Node.firstChild;
		while (spanNode && spanNode.className !== "v")
		{
			spanNode = spanNode.nextSibling;
		}
		if (!spanNode)
		{
			break;
		}

		var textNode = null;
		var tableNode = null;
		sib = aNode;
		for (var i = 0; i < 2; i++)
		{
			var sib = sib.nextSibling;
			if (sib == null)
			{
				break;
			}
			if (sib.nodeName === "#text")
			{
				textNode = sib;
			}
			else if (sib.nodeName === "TABLE")
			{
				tableNode = sib;
			}
		}

		var topSellerFilter = false;
		if (noTrsChecked)
		{
			var checkNode = divNode.firstChild;
			while (checkNode)
			{
				if (checkNode.nodeName === "IMG" && checkNode.className === "iconTrp")
				{
					topSellerFilter = true;
					filteredCount++;
					break;
				}
				checkNode = checkNode.nextSibling;
			}
		}

		if (topSellerFilter || shouldFilterOut(spanNode))
		{
			if (aNode.style.display != noneText)
			{
				aNode.style.display = noneText;
			}
			if (tableNode && tableNode.style.display != noneText)
			{
				tableNode.style.display = noneText;
			}
		}
		else
		{
			aNode.style.display = "";
			if (tableNode)
			{
				tableNode.style.display = "";
			}
		}
	}
	showFilteredCount();
}

function buildControls()
{
	var xpath;
	var divNodes;

		xpath = "//div[@id='RelatedSearchesDF']";

	divNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (divNodes.snapshotLength <= 0)
	{
		return false;
	}

	changeNode = document.createTextNode(changedText);
	filteredNode = document.createTextNode("\u00a0 0 entries filtered from view");

	var divSibling;

	divSibling = divNodes.snapshotItem(0);

	var newDivNode = document.createElement(divText);

	var span1Node = document.createElement(spanText);
	span1Node.style.fontWeight = "bold";
	var input1Node = document.createElement(inputText);
	input1Node.type = "text";
	input1Node.size = 4;
	input1Node.style.textAlign = "right";
	input1Node.setAttribute("id", "fbScore");
	input1Node.defaultValue = scoreThreshold;
	input1Node.addEventListener('change', changedFilter, false);
	span1Node.appendChild(input1Node);
	span1Node.appendChild(document.createTextNode(" Minimum feedback score\u00a0\u00a0\u00a0\u00a0"));

	newDivNode.appendChild(span1Node);
	var span2Node = document.createElement(spanText);
	span2Node.style.fontWeight = "bold";
	var input2Node = document.createElement(inputText);
	input2Node.type = "text";
	input2Node.size = 4;
	input2Node.style.textAlign = "right";
	input2Node.setAttribute("id", "fbPercent");
	input2Node.defaultValue = percentThreshold;
	input2Node.addEventListener('change', changedFilter, false);
	span2Node.appendChild(input2Node);
	span2Node.appendChild(document.createTextNode("% Minimum positive feedback\u00a0\u00a0\u00a0\u00a0"));
	newDivNode.appendChild(span2Node);

	var spanMaxNode = document.createElement(spanText);
	spanMaxNode.style.fontWeight = "bold";
	var inputMaxNode = document.createElement(inputText);
	inputMaxNode.type = "text";
	inputMaxNode.size = 4;
	inputMaxNode.style.textAlign = "right";
	inputMaxNode.setAttribute("id", "fbMax");
	inputMaxNode.defaultValue = scoreMax;
	inputMaxNode.addEventListener('change', changedFilter, false);
	spanMaxNode.appendChild(inputMaxNode);
	spanMaxNode.appendChild(document.createTextNode(" Maximum feedback score (blank to disable)\u00a0\u00a0\u00a0\u00a0"));
	newDivNode.appendChild(spanMaxNode);

	var spanTrsNode = document.createElement(spanText);
	spanTrsNode.style.fontWeight = "bold";
	var inputTrsNode = document.createElement(inputText);
	inputTrsNode.type = "checkbox";
	inputTrsNode.size = 4;
	inputTrsNode.style.textAlign = "right";
	inputTrsNode.setAttribute("id", "fbTrs");
	inputTrsNode.checked = noTrsChecked;
	inputTrsNode.defaultChecked = noTrsChecked;
	inputTrsNode.addEventListener('change', changedFilter, false);
	spanTrsNode.appendChild(inputTrsNode);
	spanTrsNode.appendChild(document.createTextNode(" No Top-rated Sellers"));
	newDivNode.appendChild(spanTrsNode);

	// second line
	newDivNode.appendChild(document.createElement(brText));
	configNode = document.createElement(buttonText);
	configNode.appendChild(document.createTextNode("Update Filter"));
	configNode.addEventListener('click', newFilterValues, false);
	newDivNode.appendChild(configNode);

	divSibling.parentNode.insertBefore(document.createElement(brText), divSibling.nextSibling);
	divSibling.parentNode.insertBefore(document.createElement(brText), divSibling.nextSibling);

	divSibling.parentNode.insertBefore(newDivNode, divSibling.nextSibling);

	return true;
}

function init()
{
	getAbefConfiguration();
	if (!buildControls())
	{
		return;
	}
	walkTheListings();
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
