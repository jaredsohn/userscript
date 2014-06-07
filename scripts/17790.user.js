// ==UserScript==
//
// @name          deviantART - Jump to page
// @author        Philippe Lhoste aka. PhiLho
// @namespace     http://Phi.Lho.free.fr/
// @description   Add a control to allow jumping at a given page if several are detected
// @version       1.01.000
// @include       http://*.deviantart.com/*
//
// ==/UserScript==
/*
Add either a combobox (if number of comments is known) or an edit field (otherwise) to the
navigation box (with Previous Page / Next Page links, and sometime a limited array of page numbers)
to allow jumping at an arbitrary page number in forum threads, deviation/journal/news/etc. comments,
list of watchers or deviants having faved a deviation, search pages, browse category, gallery,
favourites and so on.

See the screenshots to see how it looks. If there is only one page, or if the script knows there is
only two pages, it changes nothing.

The script takes the number of comments out of deviation or news or search result pages,
and so is able to display a combo box with the list of pages you can jump to.
Otherwise, it provides an edit field where you can type a page number:
if you chose to have a Go button (see the line below the one starting with <code>//$$</code>),
you can click on it to jump to the given page. Otherwise (in both cases actually),
just hit Return to do the jump.
If you typed a number too big, past the last page, dA won't puke but it will often display a page
stating "No Comments Here" or similar... and no navigation box! Just hit Back button to try again.

You can also type a negative message number (eg. <code>-1427</code>), the script will jump to the
page containing this message. It is convenient to jump to the last page of comments when you know
the number of comments: it is often displayed in the page before the page of comments, I show it for
forums and journals in the screenshot.

I have tested it in several parts of deviantART, and thanks to some consistency in design, it might
works on unknown/news parts. Otherwise, just report the problem to me with the URL where you saw the
issue, and I will try and correct this.

// by Philippe Lhoste <PhiLho(a)GMX.net> http://Phi.Lho.free.fr & http://PhiLho.deviantART.com
// File/Project history:
 1.01.000 -- 2007/12/22 (PL) -- Added improvements made by BoffinbraiN.
 1.00.000 -- 2007/12/04 (PL) -- Creation.
*/
/* Copyright notice: For details, see the following file:
http://Phi.Lho.free.fr/softwares/PhiLhoSoft/PhiLhoSoftLicence.txt
This program is distributed under the zlib/libpng license.
Copyright (c) 2007 Philippe Lhoste / PhiLhoSoft
*/

(function(){

//### User configuration. Edit the settings below as you need

//$$ Change to false if you don't need this Go button (just type the number and Enter!)
var bShowGoButton = true;


//### Do not change code below! (unless you know what you are doing... :D)

var bDebugMode = true;
//~ DebugInfo = alert;
//~ DebugInfo = GM_log;
//~ DebugInfo = DebugLog;
DebugInfo = function () { };

const XPATH_NAVIGATIONBOX = "/div[@class='alink nav' or @class='alink nav nav-big']/span[@class='shadow']/span";
const XPATH_NEWSSPECIFIC = "//div[@id='comments' or @id='jsid-news']";
// Look for inactive links
const XPATH_DELPREV = "/del[. = 'Previous Page']";
const XPATH_DELNEXT = "/del[. = 'Next Page']";

const XPATH_DEVIATIONDETAILS = "//div[@id='artist-comments']/div[@class='details']";
const XPATH_NEWSCOMMENTNB = "//div[@id='jsid-news']/div/div[@class='line1']/small/a";
const XPATH_SEARCHRESULTNB = "//div[@id='browse']/div[@class='catbar']";

// Very specific because news have three of these navigation boxes (two are not displayed...)
xpathNavBox = XPATH_NEWSSPECIFIC + XPATH_NAVIGATIONBOX;
var navigationBox = GetXpathResult(xpathNavBox).iterateNext();
if (navigationBox == null)
{
	// More generic for pages like deviant lists (faving, watching...)
	xpathNavBox = "/" + XPATH_NAVIGATIONBOX;
	navigationBox = GetXpathResult(xpathNavBox).iterateNext();
}
if (navigationBox == null)
{
	DebugInfo("No navigation device here");
	return;	// No navigation device here
}

// Search a disabled Previous Page
var link = GetXpathResult(xpathNavBox + XPATH_DELPREV).iterateNext();
if (link != null)
{
	// No Previous Page link, first page or no other page
	// Search a disabled Next Page
	link = GetXpathResult(xpathNavBox + XPATH_DELNEXT).iterateNext();
	if (link != null)
	{
		DebugInfo("No active link");
		return;	// No Previous Page link either: no other page to jump to
	}
}

var urlInfo = GetURLInfo();
if (urlInfo == null)
{
	DebugInfo("Unknown format URL");
	return;	// Unknown format URL
}
if (urlInfo.section == "today")
{
	DebugInfo("Nothing to do in Today page");
	return;	// Skip this section
}
var itemNb = GetItemNb();
if (bDebugMode) { var o = DumpObject(urlInfo); DebugInfo(o.dump + " - Item nb: " + itemNb); }

// Create the navigation tool.
var wrapperSpan = document.createElement("span");
wrapperSpan.appendChild(navigationBox.firstChild);
if (itemNb != -1)	// We know the total number of pages, use the combo box
{
	if (itemNb <= urlInfo.pageSize * 2)
		return;	// Only one or two pages, no need for extra device...

	var device = document.createElement("select");
	device.setAttribute("style", "margin: 2px 20px -5px 20px;");
	device.setAttribute("name", "PageJumper");
	device.addEventListener('change', JumpToPageCombo, false);
	for (var i = 0; i < itemNb / urlInfo.pageSize; i++)
	{
		var option = document.createElement("option");
		option.value = i * urlInfo.pageSize;
		option.text = "Page " + (i + 1);
		if (urlInfo.offset == i * urlInfo.pageSize)
		{
			option.setAttribute("selected", "true");
		}
		device.appendChild(option);
	}
	wrapperSpan.appendChild(device);
}
else	// Use the text field
{
	var device = document.createElement("input");
	device.setAttribute("type", "text");
	device.setAttribute("size", "5");
	device.setAttribute("id", "PL-PageNb");
	device.setAttribute("name", "PL-PageNb");
	device.setAttribute("style", "margin: 2px 20px -5px 20px; text-align:center;");
	device.value = Math.floor(1 + urlInfo.offset / urlInfo.pageSize);
	device.addEventListener('keypress',
			function (evt) { if (evt.which == 13) JumpToPage(evt); },
			false);
	device.addEventListener('focus', function() { this.select(); }, false);
	wrapperSpan.appendChild(device);

	if (bShowGoButton)
	{
		device = document.createElement("input");
		device.setAttribute("type", "submit");
		device.setAttribute("value", "Go");
		device.addEventListener('click', JumpToPage, false);
		device.setAttribute("style", "margin:-5px 20px -5px -15px;");
		wrapperSpan.appendChild(device);
	}
}
wrapperSpan.appendChild(navigationBox.lastChild);
navigationBox.parentNode.replaceChild(wrapperSpan, navigationBox);

// Jump from combo box selection.
function JumpToPageCombo(evt)	// For event callback
{
	window.location.href = urlInfo.url + "offset=" + evt.target.value;
}

// Jump from text field value.
function JumpToPage(evt)	// For event callback
{
	var pageInput = document.getElementById("PL-PageNb");
	pageNb = parseInt(pageInput.value) - 1;
	if (pageNb < 0)
	{
		// Negative, that's a comment number, compute the page holding this comment nb
		pageNb = Math.floor((-pageNb - 1) / urlInfo.pageSize);
	}
	window.location.href = urlInfo.url + "offset=" + (pageNb * urlInfo.pageSize);
}

// Parse the current URL to know where we are, at which page, and extract as much information as possible.
function GetURLInfo()
{
	var info = new Object();
	info.offset = 0;
	info.pageSize = 100;	// Most common value
	// Note: a possible, more flexible/reliable way to get this pageSize info would be to get current offset and compare
	// to the one found in a Next Page or Previous Page link...

	// Home page of a deviant or main browse page
	// http://somedeviant.deviantart.com/?offset=25#comments
	var m = window.location.href.match(/^(http:\/\/([^.]+)\.deviantart\.com\/)(?:\?offset=(\d+).*)?$/);
	if (m != null)
	{
		info.url = m[1] + "?";
		// http://browse.deviantart.com/
		if (m[2] == "browse")
		{
			info.section = m[2];
			info.pageSize = GetPageSize(info);
		}
		else
		{
			info.section = "deviant";
			info.pageSize = 25;	// Only 25 comments per deviant page
		}
		if (m[3] != undefined)
		{
			info.offset = parseInt(m[3]);
		}
		return info;
	}

	// List of faves on a given deviation
	// http://www.deviantart.com/deviation/15014442/favourites?offset=100
	m = window.location.href.match(/^(http:\/\/www\.deviantart\.com\/deviation\/\d+\/favourites)(?:\?offset=(\d+))?$/);
	if (m != null)
	{
		info.url = m[1] + "?";
		info.section = "deviation/favourites";
		if (m[2] != undefined)
		{
			info.offset = parseInt(m[2]);
		}
		return info;
	}

	// List of faves made by a deviant
	// http://somedeviant.deviantart.com/favourites/?offset=120
	m = window.location.href.match(/^(http:\/\/[^.]+\.deviantart\.com\/favourites\/)(?:\?offset=(\d+))?$/);
	if (m != null)
	{
		info.url = m[1] + "?";
		info.section = "deviant/favourites";
		info.pageSize = GetPageSize(info);
		if (m[2] != undefined)
		{
			info.offset = parseInt(m[2]);
		}
		return info;
	}

	// Tricky browse per category, where the first page has a different URL than the next ones...
	// http://browse.deviantart.com/flash/games/?order=5
	// http://browse.deviantart.com/?catpath=flash/games/&order=5&offset=120
	m = window.location.href.match(/^http:\/\/browse\.deviantart\.com\/((?:\w+\/)+)\?(order=\d+)$/);
	if (m != null)
	{
		info.url = "http://browse.deviantart.com/?catpath=" + m[1] + "&" + m[2] + "&";
		info.section = "browse/cat";
		info.pageSize = GetPageSize(info);
		return info;
	}
	m = window.location.href.match(/^(http:\/\/browse\.deviantart\.com\/\?catpath=.*?&)offset=(\d+)$/);
	if (m != null)
	{
		info.url = m[1];
		info.section = "browse/cat";
		info.pageSize = GetPageSize(info);
		info.offset = parseInt(m[2]);
		return info;
	}

	// Browse search results
	// http://search.deviantart.com/?section=today&q=search+term
	m = window.location.href.match(/^(http:\/\/search\.deviantart\.com\/\?.*?)(?:&offset=(\d+))?$/);
	if (m != null)
	{
		info.url = m[1] + "&";
		info.section = "search";
		info.pageSize = GetPageSize(info);
		info.offset = parseInt(m[2]);
		return info;
	}

	// Various other URLs, more or less consistent
	// http://somedeviant.deviantart.com/friends/?offset=200
	// http://somedeviant.deviantart.com/journal/?offset=20
	// http://somedeviant.deviantart.com/journal/15716381/?offset=100#comments
	// http://news.deviantart.com/browse/fun/technology/
	// http://news.deviantart.com/article/424242/?offset=100#comments
	m = window.location.href.match(/^(http:\/\/([^.]+)\.deviantart\.com\/(\w+)(.*?)?\/)(?:\?offset=(\d+).*)?$/);
	if (m != null)
	{
		info.url = m[1] + "?";
		info.section = m[2];
		if (m[3] == "friends" || m[3] == "journal" || m[3] == "favourites")
		{
			info.section = m[3];
		}
		if (m[3] == "friends")
		{
			info.pageSize = 200;
		}
		if (m[2] == "news" && m[3] == "browse")
		{
			// List of news in a category
			info.section = "news/browse";
			info.pageSize = 20;
		}
		if (m[4] == undefined && m[3] == "journal")
		{
			// Browsing list of journals
			info.pageSize = 5;
		}
		if (m[5] != undefined)
		{
			info.offset = parseInt(m[5]);
		}
		return info;
	}
	m = window.location.href.match(/^(http:\/\/([^.]+)\.deviantart\.com\/.*?)(?:\?offset=(\d+).*)?$/);
	if (m != null)
	{
		info.url = m[1] + "?";
		info.section = m[2];
		if (m[3] != undefined)
		{
			info.offset = parseInt(m[3]);
		}
		return info;
	}
	info.url = window.location.href + "?";
	info.section = "?";
	return info;
}

// Get page size (number of items per page) information from current page.
function GetPageSize(urlInfo)
{
	pageSize = 100;
	if (urlInfo.section == "deviant/favourites" || urlInfo.section == "browse" || urlInfo.section == "search")
	{
		// Look at the bar stating "Show 24 60 120" (deviations at a time)
		const XPATH_BROWSEBAR = "//div[@id='browsebar1']/span/a";
		var xpathResult = GetXpathResult(XPATH_BROWSEBAR);
		var link = xpathResult.iterateNext();
		while (link)
		{
			if (link.className == "h active")
			{
				// We found the "active" link, the current value
				pageSize = parseInt(link.textContent);
				break
			}
			link = xpathResult.iterateNext();
		}
	}
	else
	{
		// Look at the value in the commentslimit combo box
		var commentsLimitSel = document.getElementById("commentslimit");
		if (commentsLimitSel != null)
		{
			pageSize = commentsLimitSel.value;
		}
	}
	return pageSize;
}

// If we are in a section known to display the number of items, get it, it allows to display the combo box.
function GetItemNb()
{
	var itemNb = -1;
	var m = null;
	var deviationDetails = GetXpathResult(XPATH_DEVIATIONDETAILS).iterateNext();
	if (deviationDetails != null)	// In a deviation page
	{
		m = deviationDetails.innerHTML.match(/Comments: ([,\d]+)/);
	}
	else if (urlInfo.section == "news")
	{
		var newsitemNb = GetXpathResult(XPATH_NEWSCOMMENTNB).iterateNext();
		if (newsitemNb != null)	// In a news page
		{
			m = newsitemNb.innerHTML.match(/([,\d]+) comments/);
		}
	}
	else if (urlInfo.section == "deviantwear")
	{
		var dwStats = document.getElementById("deviantwear-stats");
		m = dwStats.innerHTML.match(/Comments: ([,\d]+)/);
	}
	else if (urlInfo.section == "search")
	{
		var searchResultNb = GetXpathResult(XPATH_SEARCHRESULTNB).iterateNext();
		if (searchResultNb != null)	// In a search result page
		{
			m = searchResultNb.innerHTML.match(/([,\d]+) results/);
		}
	}
	if (m != null)
	{
		itemNb = parseInt(m[1].replace(/,/g, ''));
	}
	return itemNb;
}

function GetXpathResult(xpath)
{
	return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
}

// Debug tool
function DumpObject(obj, truncate)
{
  if (truncate == null) truncate = 0;
  var od = new Object;
  var result = "";
  var len = 0;

  for (var property in obj)
  {
    var value = obj[property];
    if (typeof value == 'string')
    {
	  if (truncate > 0)
        value = "'" + value.substring(0, truncate) + "'";
	  else
        value = "'" + value + "'";
    }
    if (typeof value == 'object')
    {
      if (value instanceof Array)
      {
        value = "[ " + value + " ]";
      }
      else
      {
        var ood = DumpObject(value);
        value = "{ " + ood.dump + " }";
      }
    }
    result += "'" + property + "' : " + value + ", ";
    len++;
  }
  od.dump = result.replace(/, $/, "");
  od.len = len;

  return od;
}

})();
