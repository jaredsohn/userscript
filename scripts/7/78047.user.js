// HowlsOfOutrage.user.js
//
// Copyright 2010-2013, Michael Devore
// This file is licensed under the terms of the Artistic License 2.0.
// See http://opensource.org/licenses/Artistic-2.0 for the license itself.
//
// This is a Greasemonkey script.
// See http://www.greasespot.net/ for more information on Greasemonkey.
//
// ==UserScript==
// @name          HowlsOfOutrage
// @namespace     http://www.devoresoftware.com/gm/hoo
// @description	show MetaFilter favoriters (favoritors?) on hover
// @include       http://*.metafilter.com/*
// @version			4.1
// ==/UserScript==
//
// version 4.1: minor fixes, works for nonregistered users
// version 4: fixes breakage, made popup positioning more intelligent, minor layout changes
// version 3: adds loading message for when response is slow,
//   minimum delay between favorites popup displays, cosmetic stuff
// version 2: adds explicit text color for white background, variable-height box,
//   hover over post favorites for list in addition to existing comment support

"use strict";

var favPopUp;
var favWork;
var mfBackgroundColor = "#006699";	// MetaFilter blue as background color
var favLoadDelay = 1;	// minimum seconds between subsequent displays of favorite lists
var waitForDelay = false;
var waitForHover = false;
var currentEvent;

var popupWidth = 400;

function howlMain()
{
	favWork = document.createElement("div");
	favPopUp = document.createElement("div");
	favPopUp.style.width = popupWidth+"px";
	favPopUp.style.height = "auto";
	favPopUp.style.top = "0px";
	favPopUp.style.left = "0px";
	favPopUp.style.overflow = "hidden";
	favPopUp.style.color = "white";
	favPopUp.style.paddingLeft = "8px";
	favPopUp.style.paddingRight = "8px";
	favPopUp.style.paddingTop = "8px";
	favPopUp.style.paddingBottom = "8px";
	favPopUp.style.fontSize = "12pt";
	favPopUp.style.backgroundColor = mfBackgroundColor;
	favPopUp.style.borderStyle = "dashed";
	favPopUp.style.borderWidth = "medium";
	favPopUp.style.borderColor = "black";
	favPopUp.style.position = "absolute";
	favPopUp.style.display = "none";
	favPopUp.style.opacity = ".94";
	document.getElementsByTagName('body')[0].appendChild(favPopUp);

	var xpath = "//DIV/SPAN[starts-with(text(),'posted by') and @class='smallcopy']/SPAN[starts-with(@id,'fav')]/SPAN[starts-with(@id,'favcnt')]/A";
	var postNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	if (!postNodes.snapshotLength)
	{
		xpath = "//DIV[@class='comments']/SPAN[starts-with(text(),'posted by') and @class='smallcopy']/A[starts-with(@href, '/favorited/')]";
		postNodes = document.evaluate(
			xpath,
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
	}

	var totalFavAnchors = postNodes.snapshotLength;

	for (var i = 0; i < totalFavAnchors; i++)
	{
		// this is for comments
		var favNode = postNodes.snapshotItem(i);
		favNode = favNode.parentNode;
		favNode.addEventListener('mouseover', checkFavHover, false);
		favNode.addEventListener('mouseout', favGoAway, false);
	}

	// pick up post favorites
	xpath = "//DIV[@class='copy']/SPAN[starts-with(text(),'posted by') and @class='smallcopy']/SPAN[starts-with(@id,'favcnt')]/A";
	postNodes = document.evaluate(
		xpath,
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	if (postNodes.snapshotLength)
	{
		// this is for the original post
		var favNode = postNodes.snapshotItem(0);
		var newSpan = document.createElement("span");
		favNode.parentNode.parentNode.insertBefore(newSpan, favNode.parentNode.nextSibling);
		newSpan.appendChild(favNode.parentNode);

//		favNode.addEventListener('mouseover', checkFavHover, false);
//		favNode.addEventListener('mouseout', favGoAway, false);
		newSpan.addEventListener('mouseover', checkFavHover, false);
		newSpan.addEventListener('mouseout', favGoAway, false);
	}
}

function favGoAway(evt)
{
	waitForHover = false;
	favPopUp.style.display = "none";
}

function checkFavHover(evt)
{
	currentEvent = evt;
	if (waitForDelay)
	{
		waitForHover = true;
		return;
	}
	waitForHover = false;
	favHover(evt);
}

function timesUp()
{
	waitForDelay = false;
	if (waitForHover)
	{
		waitForHover = false;
		favHover(currentEvent);
	}
}

function favHover(evt)
{
	waitForDelay = true;
	window.setTimeout(timesUp, favLoadDelay * 1000);

	favPopUp.style.color = "#CCCC00";
	favPopUp.style.backgroundColor = "#888888";
	favPopUp.innerHTML = "&nbsp;...loading...";

	favPopUp.style.top = (evt.pageY - 4)+"px";
	favPopUp.style.left = (evt.pageX + 20)+"px";

	var divX = parseInt(favPopUp.style.left);
	if (window.innerWidth <= divX + popupWidth+25)
	{
		var left = parseInt(window.innerWidth-popupWidth-25);
		favPopUp.style.left = left+"px";
	}

	favPopUp.style.display = "";
	var favURL = evt['target']['href'];
	evt['target']['title'] = "";

	// cross-domain request, have to use GM_xmlhttpRequest()
	GM_xmlhttpRequest(
	{
			method : "GET",
			url : favURL,
			headers :
			{
				"User-Agent" : "Mozilla/5.0",
				"Accept" : "text/xml"

			},
			onload:function(response)
			{
				processFav(response.responseText);
			}
	});
}

function processFav(pText)
{
	favWork.innerHTML = pText;
	var xpath = "/DIV[@class='copy']/A";
	var userNodes = document.evaluate(
		xpath,
		favWork,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	var totalUserAnchors = userNodes.snapshotLength;
	favPopUp.innerHTML = "";

	favPopUp.style.backgroundColor = mfBackgroundColor;
	for (var i = 0; i < totalUserAnchors; i++)
	{
		var currentNode = userNodes.snapshotItem(i);
		var aNode = currentNode.cloneNode(true);
		aNode.style.color = "white";
		if (i)
		{
			favPopUp.appendChild(document.createTextNode(", "));
		}
		favPopUp.appendChild(aNode);
	}

	var divHeight = parseInt(favPopUp.offsetHeight);
	var divY = parseInt(favPopUp.offsetTop);
	var divBottom = (divY-window.pageYOffset) + divHeight;

	if (window.innerHeight <= divBottom)
	{
		var theTop = parseInt(favPopUp.style.top);
		theTop -= divHeight;
		favPopUp.style.top = theTop+"px";
	}

	var divX = parseInt(favPopUp.style.left);
	if (window.innerWidth <= divX + popupWidth+25)
	{
		var left = parseInt(window.innerWidth-popupWidth-25);
		favPopUp.style.left = left+"px";
	}

}

howlMain();
