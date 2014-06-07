// wiksort.user.js
// written by Michael Devore
//
// This is a Greasemonkey script.
// See http://www.greasespot.net/ for more information on Greasemonkey.
//
// ==UserScript==
// @name          Wikipedia Sorting
// @namespace     http://www.devoresoftware.com/gm/wiksort
// @description	Sort out unique words in Wikipedia articles to a new page
// @include       http://en.wikipedia.org/wiki/*
// @include       https://en.wikipedia.org/wiki/*
// @version			2.0
// ==/UserScript==
//

"use strict";

var wiksGlobals = 
{
	regularNounCutoff : 6,
	properNounCutoff : 6,
	baseApiString : unsafeWindow.wgServer + unsafeWindow.wgScriptPath + "/api.php?action=parse&format=xml&page=",
	wiksText : "Sort words",
	wiksId : "t-sort-words-wikgm",
	wiksToolTip : "Sort unique article words"
};

function wiksMainGM()
{
	var wikiPage = unsafeWindow.wgPageName.replace('_', ' ');
	wiksLoadPageXML(encodeURIComponent(wikiPage));
}

function wiksLoad()
{
	if (unsafeWindow.wgCanonicalNamespace == "Special")
	{
		return;
	}
	// set up the tool link
	if (unsafeWindow.skin != "cologneblue")
	{
//		unsafeWindow.wiksMainGM = wiksMainGM;
//		unsafeWindow.addPortletLink('p-tb', 'javascript: wiksMainGM();',
		unsafeWindow.addPortletLink('p-tb', 'javascript: void(0);',
			wiksGlobals.wiksText,
			wiksGlobals.wiksId,
			wiksGlobals.wiksToolTip);
		var portEl = document.getElementById(wiksGlobals.wiksId);
		if (portEl)
		{
			portEl.addEventListener('click', wiksMainGM, false);
		}
	}
	else
	{
		// my favorite cologne blue skin doesn't support portlet links
		// place sort word link  right before 'This page' quickbar section,
		//  hopefully as last entry in previous 'Edit' section
		var quickEl = document.getElementById("quickbar");
		var childNode = quickEl ? quickEl.firstChild : null;
		while (childNode)
		{
			var tNode = childNode.firstChild;
			while (tNode && tNode.nodeName != "H3")
			{
				tNode = tNode.nextSibling;
			}
			if (tNode)
			{
				tNode = tNode.firstChild;
			}
			if (tNode && tNode.nodeName == "#text" && tNode.nodeValue == "This page")
			{
				break;
			}
			childNode = childNode.nextSibling;
		}
		if (childNode)
		{
			var aBR = document.createElement("BR");
			var aEl = document.createElement("A");
			aEl.setAttribute("href", "javascript: void(0);");
			aEl.addEventListener('click', wiksMainGM, false);
			aEl.appendChild(document.createTextNode(wiksGlobals.wiksText));
			quickEl.insertBefore(aEl, childNode);
			quickEl.insertBefore(aBR, childNode);
		}
	}
}

function wiksLoadPageXML(wikiPage)
{
	var wikiApiString = wiksGlobals.baseApiString + wikiPage;
	var request =  new XMLHttpRequest();
	request.open("GET", wikiApiString, true);
	request.setRequestHeader("User-Agent", "Mozilla/5.0");
	request.setRequestHeader("Accept", "text/xml");
	try
	{
		request.addEventListener("readystatechange", wiksCheckReady, false);
	}
	catch (e)
	{
		if (e.message.indexOf("NS_ERROR_ILLEGAL_VALUE" >= 0))
		{
			// readystatechange event not unsupported for this version Firefox
			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200)
				{
					if (request.responseText)
					{
						wiksProcessPage(request.responseText);
					}
				}
			};
		}
		else
		{
			alert("wiksort doesn't work with this version of Firefox.");
		}
	}
	request.send(null);
}

function wiksCheckReady()
{
	if (this.readyState == 4 && this.status == 200)
	{
		if (this.responseText)
		{
			wiksProcessPage(this.responseText);
		}
	}
}

function wiksProcessPage(pText)
{
	var pDoc = (new DOMParser()).parseFromString(pText, "application/xml");
	var tElements = pDoc.getElementsByTagName("text");
	var tElem = tElements[0];
	var d = document.createElement("div");
	var htmlContent = "";
	var cNode = tElem.firstChild;
	while (cNode)
	{
		htmlContent += cNode.nodeValue;
		cNode = cNode.nextSibling;
	}
	d.innerHTML = htmlContent;
	var theText;
	theText = d.textContent;
	wiksFilterAndShow(theText);
	return true;
}

function wiksFilterAndShow(articleText)
{
	var regNoun = new RegExp("\\b[a-z][a-zA-Z]{" + (wiksGlobals.regularNounCutoff - 1) + ",}", "g");
	var propNoun = new RegExp("\\b[A-Z][a-zA-Z]{" + (wiksGlobals.properNounCutoff - 1) + ",}", "g");

	var resultLC = new Array();
	// initial capped/proper nouns
	var result1 = articleText.match(propNoun);
	// any noun
	var result2 = articleText.match(regNoun);
	var result;
	if (result1 != null)
	{
		result = result1;
		if (result2 != null)
		{
			result = result1.concat(result2);
		}
	}
	else
	{
		result = result2;
	}
	if (result)
	{
		result.sort(function(x,y) { 
			var a = String(x).toUpperCase(); 
			var b = String(y).toUpperCase(); 
			if (a > b) 
			{
				return 1;
			}
			if (a < b)
			{
				return -1;
			}
			return 0; 
		} );
		var wordCount = new Array();
		for (var i = 0; i < result.length; i++)
		{
			var lcWord = result[i].toLowerCase();
			if (lcWord == "reverse" ||
				lcWord == "constructor" ||
				lcWord == "every" ||
				lcWord == "reduce" ||
				lcWord == "splice" ||
				lcWord == "filter")
			{
				lcWord += "_x_wiks";
			}
			if (wordCount[lcWord] !== undefined)
			{
				wordCount[lcWord]++;
			}
			else
			{
				wordCount[lcWord] = 1;
			}
		}
		wiksShowResults(result, wordCount);
	}
}

function wiksShowResults(wordList, wordCount)
{
	var feedback = "";
	var feedFormat = "<html><head><title>";
	var feedTitle = "Sorted words in " + window.location.href.match(/[^\/]+$/);
	feedTitle = feedTitle.replace(/_/g," ");
	feedFormat += feedTitle;
	feedFormat += '</title><body>';
	feedFormat += "== " + feedTitle + ' ==<br><span id="wiksort">';
	var previousWord = "";
	var rowCount = 1;
	var lastLetter = "";
	for (var i = 0; i < wordList.length; i++)
	{
		var lcWord = wordList[i].toLowerCase();
		var adjustWord = lcWord;
		if (lcWord == "reverse" ||
			lcWord == "constructor" ||
			lcWord == "every" ||
			lcWord == "reduce" ||
			lcWord == "splice" ||
			lcWord == "filter")
		{
			adjustWord += "_x_wiks";
		}
		var count = wordCount[adjustWord];
		if (lcWord !== previousWord + "s")
		{
			var startLetter = lcWord.slice(0,1);
			if (lastLetter != startLetter)
			{
				lastLetter = startLetter;
				feedFormat += "\n<br>&nbsp;== " + startLetter.toUpperCase()+" ==\n<br>";
				rowCount += 2;
			}
			feedback += wordList[i] + "(" + count + ") - " + (((i+1) % 10 == 0) ? "\n" : "");
			feedFormat += wordList[i] + "&nbsp;(" + count + ")&nbsp;\n<br>";
			rowCount++;
		}
		i += count - 1;
		previousWord = lcWord;
	}
	feedFormat += "</span>\n";
	feedFormat += '<textarea id="sorttext" wrap="hard" rows="';
	feedFormat += rowCount + '"></textarea>\n';
	feedFormat += '<script language="JavaScript">\n';
	feedFormat += 'var st=document.getElementById("sorttext");\n';
	feedFormat += 'var sortSpan=document.getElementById("wiksort");\n';
	feedFormat += 'st.style.width="600px";\n';
	feedFormat += 'st.style.fontSize="x-large";\n';
	feedFormat += 'st.value=sortSpan.textContent;\n';
	feedFormat += 'sortSpan.style.display="none";\n';
	feedFormat += '</script>';
	feedFormat += "</body></html>";

	if (feedback.length)
	{
		var feedWin = null;
		var iCounter = 0;
		while ((feedWin = window.open()) === null && iCounter < 10)
		{
			iCounter++;
		}
		if (iCounter >= 10)
		{
			alert("You need to enable pop-ups for the Wikipedia site\n"
				+ " (or the browser doesn't work with wiksort)\n");
		}
		var feedDoc = feedWin.document;
		feedDoc.open();
		feedDoc.write(feedFormat);
		feedDoc.close();
		var el = feedDoc.getElementById("sorttext");
		el.focus();
	}
	else
	{
		alert("wiksort found no sortable words.");
	}
}

unsafeWindow.addOnloadHook(wiksLoad);
