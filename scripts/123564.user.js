// ==UserScript==
// @name           Auto replace AM/PM with 24-hour time
// @namespace      Auto replace AM/PM with 24-hour time
// @description    Auto replace AM/PM with 24-hour time
// @include        *
// @icon           http://i.imgur.com/DCQqR.jpg
// ==/UserScript==
// This userscript is a fork of Dates, Times and Spellings by Pink Duck.
// All code unrelated to time replacement has been removed and optimized.

var reTwelveHour = /\b([012]?[0-9])(?:[:\.]([0-5][0-9]))?(?:[:\.]([0-5][0-9]))?\s?([ap])\.?m(?:\b|\.)/gi;
var reBBCtime = /([01]\d|2[0-3])([0-5]\d) ?(GMT|BST)/g;
var DOUBLE_QUOTE_CHARS = '["\u02BA\u201C\u201D\u201F\u2033\u2036\u275D\u275E\u301D\u301E\uFF02]';
var SINGLE_QUOTE_CHARS = "['\u02B9\u02BC\u2018\u2019\u201B\u2032\u2035\u275B\u275C\uFF07]";
var m_bChangeMade = false;


// Twelve hour to 24-hour clock (16:00 to 16:00)
function cbTwelveHour(sMatch, sHours, sMinutes, sSeconds, sZone)
{
	var iHours = (/p/i.test(sZone) ? 12 : 0) + parseInt(sHours, 10) % 12;
	sHours = (iHours < 10 ? "0" + iHours : String(iHours));
	
	var iMinutes = (sMinutes ? parseInt(sMinutes, 10) : 0);
	sMinutes = (iMinutes < 10 ? "0" + iMinutes : String(iMinutes));
	
	var sLocal = sHours + ":" + sMinutes;
	
	var iSeconds = (sSeconds ? parseInt(sSeconds, 10) : 0);
	if (iSeconds)
	{
		sLocal += ":" + (iSeconds < 10 ? "0" + iSeconds : String(iSeconds));
	}
	
	m_bChangeMade = true;
	
	return sLocal;
}


// BBC hhnn BST|GMT time zone formatting improvement
function cbBBCtime(sMatch, sHours, sMinutes, sTimeZone)
{
	m_bChangeMade = true;
	return sHours + ":" + sMinutes + " " + sTimeZone;
}


// Regex application
function applyRegexs(sText)
{
	sText = sText.replace(reTwelveHour, cbTwelveHour);
	sText = sText.replace(reBBCtime, cbBBCtime);
	
	return sText;
}


// Quoted regex recursion
function quoteRecursion(sText)
{
	if (sText.match(/\d/))
	{
		var reQuotedString = new RegExp("(^|\\s|[(=L,{:])(?:(" + DOUBLE_QUOTE_CHARS + ")(.*?)(" + DOUBLE_QUOTE_CHARS + ")|(" + SINGLE_QUOTE_CHARS + ")(.*?)(" + SINGLE_QUOTE_CHARS + "))(?=([,.)}:;?]|\\s|$))", "g");

		// Look for quoted substrings
		var oQuote = reQuotedString.exec(sText);
		if (oQuote)
		{
			// Prefix text and quoted string
			var iStartPos = reQuotedString.lastIndex;
			var sLocal = applyRegexs(sText.substr(0, oQuote.index)) + oQuote[1];
			if (oQuote[2])
			{
				sLocal += oQuote[2] + quoteRecursion(oQuote[3]) + oQuote[4];
			}
			else
			{
				sLocal += oQuote[5] + quoteRecursion(oQuote[6]) + oQuote[7];
			}
			sLocal += oQuote[8];

			while ((oQuote = reQuotedString.exec(sText)))
			{
				// Inner prefix text and quoted string
				sLocal += applyRegexs(sText.substring(iStartPos + 1, oQuote.index)) + oQuote[1];
				if (oQuote[2])
				{
					sLocal += oQuote[2] + quoteRecursion(oQuote[3]) + oQuote[4];
				}
				else
				{
					sLocal += oQuote[5] + quoteRecursion(oQuote[6]) + oQuote[7];
				}
				sLocal += oQuote[8];
				iStartPos = reQuotedString.lastIndex;
			}

			// Suffix text
			if (iStartPos < sText.length)
			{
				sLocal += applyRegexs(sText.substr(iStartPos + 1));
			}
			sText = sLocal;
		}
		else
		{
			// Plain string recursion termination
			sText = applyRegexs(sText);
		}
	}
	
	return sText;
}


var xpathResult = document.evaluate("//text()[normalize-space()]", document.documentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var iNode = 0; iNode < xpathResult.snapshotLength; iNode++)
{
	var oNode = xpathResult.snapshotItem(iNode);
	if (oNode.nodeValue && oNode.parentNode && !oNode.parentNode.nodeName.match(/script|style/i))
	{
		var sText = oNode.nodeValue;
		
		// If digit present
		if (sText.match(/\d/))
		{
			// Look for quoted substrings
			sText = quoteRecursion(sText);
		}
		
		// Update if change made
		if (m_bChangeMade)
		{
			oNode.nodeValue = sText;
			m_bChangeMade = false;
		}
	}
}