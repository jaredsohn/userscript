// ==UserScript==
//
// @name          deviantART - Deviation statistics
// @author        Philippe Lhoste aka. PhiLho
// @namespace     http://Phi.Lho.free.fr/
// @description   Computes some stats in a deviation page.
// @version       1.02.001
// @include       http://*.deviantart.com/art/*
//
// ==/UserScript==
/*
Displays on the deviation page some percentages: faves per view, faves per comment, comments per view.
Suggested by :devsOn-et-lumiere: in <i><a href="http://forum.deviantart.com/devart/suggestions/1013658/">percentage</a></i>.

I also add the file type of the deviation, if it can be found in the Download link: it can be useful
to spot some miscats.

Also as seen in the Suggestion forum in
<i><a href="http://forum.deviantart.com/devart/suggestions/1022028/">Add the Word Count Option</a></i>
and backed up by the :devWordCount: club, I compute the word count of literature deviations.
By default, I try to count like MS Word (items separated by spaces) although I see sometime a
difference up to a dozen words. I have also a mode attempting to count real words
("I'm" counted as "I am").
Fails on words with accents or written in non-Ascii char set (Russian, Chinese, etc.) as dA replaces
them with HTML entities.

// by Philippe Lhoste <PhiLho(a)GMX.net> http://Phi.Lho.free.fr & http://PhiLho.deviantART.com
// File/Project history:
 1.02.001 -- 2008/11/16 (PL) -- Fix to follow dA change.
 1.02.000 -- 2008/04/21 (PL) -- File type display.
 1.01.001 -- 2008/01/30 (PL) -- Thanks for BoffinbraiN, I improved a bit the display.
 1.01.000 -- 2008/01/15 (PL) -- Added word count for literature deviations.
 1.00.000 -- 2008/01/07 (PL) -- Creation.
*/
/* Copyright notice: For details, see the following file:
http://Phi.Lho.free.fr/softwares/PhiLhoSoft/PhiLhoSoftLicence.txt
This program is distributed under the zlib/libpng license.
Copyright (c) 2008 Philippe Lhoste / PhiLhoSoft
*/

(function(){

//### User configuration. Edit the settings below as you need

//=== For word counting

//$$ If true, counts like MS Word (and Unix' wc utility) seeing anything (including punctuation) between
// two spaces as word. If false, "I'm" counts as two words, so is "long—dash".
var bCountBetweenSpaces = true;
//$$ The style of the counter. Defaults to green (#4C7) and slightly smaller (0.8em).
var counterStyle = "color: #4C7; text-size: 0.8em;";

//$$ Comment out (prefix with //) if you don't want this feature.
DisplayWordCount();


//=== To display the file type (useful to spot some miscats...)

//$$ Comment out (prefix with //) if you don't want this feature.
DisplayFileType();


//=== To display visitor stats in the deviation details

//$$ Comment out (prefix with //) if you don't want this feature.
DisplayVisitorStats();


//### Do not change code below! (unless you know what you are doing... :D)

function DisplayWordCount()
{
	const XPATH_LITTEXT = "//div[@id='lit-view']//div[@class='text']";
	const XPATH_LITTOOLBAR = "//div[@id='lit-view']//div[@class='textbar ch']";

	var text = GetXpathElement(XPATH_LITTEXT);
	if (text != null)
	{
		var wordNb = CountWords(text.textContent);
		var textbar = GetXpathElement(XPATH_LITTOOLBAR);
		if (textbar != null)
		{
			var counter = document.createElement("div");
			counter.innerHTML = wordNb + " words";
			counter.setAttribute("style", "position: absolute; top: 4px; right: 110px; width: 10em; " +
					counterStyle);
			textbar.appendChild(counter);
		}
//~	 	alert(wordNb);
	}

	function CountWords(text)
	{
		// Trim
		text = text.replace(/(?:^\s+|\s+$)/g, '');
		if (bCountBetweenSpaces)
		{
			// Collapse multiple spaces
			text = text.replace(/\s\s+/g, ' ');
			// Remove non-spaces
			text = text.replace(/\S+/g, '');
		}
		else
		{
			// Replace HTML entities by space (supposing they are not accented letters!)
			// Also counts "Marion's head" as three words, but it is hard to distinguish from "Marion's nice"
			text = text.replace(/&#\d+;/g, ' ');
			// Replace multiple occurences of space or punctuation (except dash) by one space
			text = text.replace(/[^\w-]+/g, ' ');
			// Replace words by a single char
			text = text.replace(/[\w-]+/g, '#');
			// Remove spaces
			text = text.replace(/ /g, '');
		}
		return text.length + (bCountBetweenSpaces ? 1 : 0);
	}
}

function DisplayFileType()
{
	const XPATH_DOWNLOADLINK = "//a[text()='Download']";
	const XPATH_DEVIATIONDETAILS = "//div[@id='artist-comments']/div[@class='details']";

	var commentNb, faveNb, viewNb;

	var deviationDetails = GetXpathElement(XPATH_DEVIATIONDETAILS);
	if (deviationDetails != null)	// In a deviation page
	{
		var fileType = "(No download)";
		var downloadLink = GetXpathElement(XPATH_DOWNLOADLINK);
		if (downloadLink != null)
		{
			downloadLink += "";
			var dot = downloadLink.lastIndexOf(".");
			if (dot == -1)
			{
				fileType = "?";	// Urm?
			}
			else
			{
				fileType = downloadLink.substr(dot + 1);
			}
		}

		var devDetails = deviationDetails.innerHTML + "";
		devDetails = devDetails.replace(/<br>\s*<br>\s*<strong>Views/,
				"<br>File type: " + fileType + "<br><br><strong>Views");
		deviationDetails.innerHTML = devDetails;
	}

	function GetStat(message, value1, value2)
	{
		if (value2 == 0)
			return "";
		var percent = Math.floor((value1 / value2) * 10000) / 100;
		return message + ": " + percent + "%<br>";
	}
}

function DisplayVisitorStats()
{
	const XPATH_DEVIATIONDETAILS = "//div[@id='artist-comments']/div[@class='details']";

	var commentNb, faveNb, viewNb;

	var deviationDetails = GetXpathElement(XPATH_DEVIATIONDETAILS);
	if (deviationDetails != null)	// In a deviation page
	{
		var devDetails = deviationDetails.innerHTML + "";
		var m = devDetails.match(/Comments: ([,\d]+)/);
		if (m != null)
		{
			commentNb = GetIntVal(m[1]);
		}
		m = devDetails.match(/Favourites(?: &amp; Collections)?: ([,\d]+)/);
		if (m != null)
		{
			faveNb = GetIntVal(m[1]);
		}
		m = devDetails.match(/Total: ([,\d]+)/);
		if (m != null)
		{
			viewNb = GetIntVal(m[1]);
		}

		if (viewNb > 0)	// Can be null just after submitting... No point of displaying stats then
		{
			devDetails = devDetails.replace(/<strong>Views/,
					"<strong>Statistics</strong><br>" +
					GetStat("Faves per view", faveNb, viewNb) +
					GetStat("Faves per comment", faveNb, commentNb) +
					GetStat("Comments per view", commentNb, viewNb) +
					"<br><strong>Views");
			deviationDetails.innerHTML = devDetails;
		}
	}

	function GetStat(message, value1, value2)
	{
		if (value2 == 0)
			return "";
		var percent = Math.floor((value1 / value2) * 10000) / 100;
		return message + ": " + percent + "%<br>";
	}
}


function GetXpathElement(xpath)
{
	var xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	if (xpathResult != null)
		return xpathResult.iterateNext();
	return null;
}

function GetXpathResult(xpath)
{
	return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
}

// Get a string supposed to hold a number with a possible thousand separator (comma in dA),
// and return the numerical value.
function GetIntVal(str)
{
	return parseInt(str.replace(/,/g, ''));
}

})();
