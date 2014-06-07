// ==UserScript==
//
// @name          deviantART - Watching you?
// @author        Philippe Lhoste aka. PhiLho
// @namespace     http://Phi.Lho.free.fr/
// @description   Shows, when visiting a deviant, if it watches you.
// @version       1.03.005
// @include       http://*.deviantart.com/*
//
// ==/UserScript==
/*
Summary:
In deviantART.com site, a deviant is just a member of the site,
and to watch somebody is to get notifications of their activity (a bit like RSS).
My script adds an icon in the deviant's pages if they watch you.

Description:
If the deviant you visit (in his/her profile page, gallery or deviation) is watching you,
this script adds on the right of the deviant name in the title bar a watch icon,
so you can check this at a glance.
Also adds in the profile (main) page a line above the <i>Watch this deviant/Watching this deviant</i> one.
Both can be deactivated, by changing in the script the lines below those starting with <code>//$$</code>
Read these comments for instructions.
The message can be changed too. Also the icon, but it is slighly harder...

If you have no watchers, well this script will do nothing...
If you have some watchers, when you go to your main page, you will see in the <i>Recent Watchers</i>
box, on the right of the title, a new <i>Update watcher list</i> button.
If you have 20 watchers or less, just click this button, and you are done: go visit some of
your watchers, and see the magic works!
If you have more than 20 watchers, you have a <i>Complete List</i> link: click on it, a window listing
the first 200 watchers (or less if, like me, you are an ordinary deviant...) appears, as usual.
Hit the End key and you go at the bottom of the page. Here, you have a checkbox and a button
added by the script, below the navigation box.
For the first time, just hit the <i>Update watcher list</i> button. If you have 200 watchers or less,
you are already done, close the window. Above this number, the script will load the next page in the window.
Just let it work through all the pages of watchers you have. At the end, like in other cases,
a message box will display the total number of watchers found, confirming the end of the process.

Note: if you have a large number of watchers, like 20,000 to 50,000, the capture of the deviants
can take a long time... You can even minimize this window and see the page numbers going in the title...
But sometime deviantART doesn't like these repeated requests and returns an error page.
Or you closed the window, tired of waiting. Etc.
For these cases, there is a recovery/resume mechanism: go to the Complete List (first page),
and click the <i>Update watcher list</i> button: the watcher capture will resume were it was.
I was able to capture the 32,138 watchers of a deviant after many restarts...

What about new deviants?
If you have less than 20 new watchers, just click on the <i>Update watcher list</i> button in your
profile page. The script will get the new names in this page and update your list.
If you are very popular or away for a long time, with more than 20 new watchers,
click the <i>Complete List</i> link and in the Friends page, click the <i>Update watcher list</i>
button. The page will be scanned. If the last deviant wasn't in the list, it is likely there are
more, so the script will continue on the next page, until it finds a page full of known deviants.
If, for some reason, you prefer to regenerate fully the list (eg. to handle deviants no
longer watching you), check the <i>Rescan all</i> check box and the script will clear the list and
fill it again from scratch.
Note: the script doesn't handle automatically deviants no longer watching you: you have to rescan the
list to get rid of them.

Where does this list of watchers go?
I store it using the function GM_setValue. Greasemonkey puts these values in the user settings.
You can view these settings by typing <code>about:config</code> (and Enter) in the address bar of Firefox.
You can locate the settings of my scripts by typing <code>phi.lho</code> in the filter area:
you will see GM creates the keys <code>greasemonkey.scriptvals.http://Phi.Lho.free.fr//deviantART - Watching you?.xxx</code>
You can even edit them or copy them... Or erase their content.
These settings are stored in <code>C:\Documents and Settings\<Windows user name>\Application Data\Mozilla\Firefox\Profiles\<some profile code>.default\prefs.js</code>.
Path to user data (<code>C:\Documents and Settings</code>) might have been changed.
Note that this file seems to be written only when Firefox is stopped.

Technical notes:
I chose this way over cookies for convenience of examination and ease of use, plus you can't delete
it by accident if cleaning up your cookies...
As for the capacity, I have read that more than 32MB can be written without problem, which should be
more than enough, even for the most popular deviants!
Performance depends on your computer, of course.

Also why I do redirections instead of using GM_xmltttpRequest? Because the later is asynchonous,
which is fine for getting one piece of data only, but annoying for sequential processing
of several pages.
And I found no good way to convert the HTML text to a document able to run an XPath request,
and I didn't wanted to give up this nice capability...
Loading pages has the interesting side effect of letting the Dom processing the request.
And it also provides a nice visual feedback of the long operation...


Credits:
- rotane suggested the message in deviant menu, and Solitude12 suggested another icon for it.
- BoffinbraiN suggested to handle multiple accounts.


// by Philippe Lhoste <PhiLho(a)GMX.net> http://Phi.Lho.free.fr & http://PhiLho.deviantART.com
// File/Project history:
 1.03.005 -- 2008/06/26 (PL) -- Fixed for dA v.5! (watcher list)
 1.03.004 -- 2008/06/02 (PL) -- Fixed for dA v.6, should work in both versions.
 1.03.003 -- 2008/05/29 (PL) -- Fixed a bug in the previous change: problem with case...
 1.03.002 -- 2008/05/10 (PL) -- Don't display scan button if not your watcher list.
 1.03.001 -- 2008/03/13 (PL) -- Remove parameters from URL because MC has ?loggedin=1 n times...
 1.03.000 -- 2008/02/14 (PL) -- Added button in Message Center to add new watchers.
             Also renamed the file & script.
 1.02.000 -- 2007/11/12 (PL) -- Change icon, manage multiple accounts.
 1.01.000 -- 2007/11/09 (PL) -- Automatic build of the list of watchers, on user request.
 1.00.000 -- 2007/11/06 (PL) -- Creation.
*/
/* Copyright notice: For details, see the following file:
http://Phi.Lho.free.fr/softwares/PhiLhoSoft/PhiLhoSoftLicence.txt
This program is distributed under the zlib/libpng license.
Copyright (c) 2007-2008 Philippe Lhoste / PhiLhoSoft
*/

(function(){

//### User configuration. Edit the settings below as you need

//$$ Change true to false if you don't want an icon next to the watcher name (in its profile, gallery or deviations)
const bShowWatchIcon = true;

//$$ Change true to false if you don't want a message (defined below) to appear above
// the Watch this deviant / Watching this deviant line in the watcher's profile
const bShowWatchMessage = true;

//$$ Keep it short...
const WATCH_MESSAGE = "Deviant watching you!";

//### Do not change code below! (unless you know what you are doing... :D)

//~ const DEVIANT_SEPARATOR = ':';
const WATCHER_LIST_KEY = "WatcherList";
const DEVIANT_SEPARATOR = ' ';
const PARAMS_KEY = "Params";
const PARAM_SEPARATOR = '-';
const PARAM_RE = /(\d+)-(\d+)-([tf])/;

// Reusing the watch icon of dA!
// This is an indexed PNG image with transparency layer... You can do your own and convert it with
// http://www.abluestar.com/utilities/encode_base64/index.php or similar, then replace the image below
const ICON_WATCH = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAAXNSR0IArs4c6QAAADBQTFRFjJ2UBAIEdIZ8/Loc5OLk9J5Uh5aM9MKUlKKbvH5M/N6MLCos/P78fI6E7OrsfIqEB5A18AAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH1wsGECoeGBa6wQAAAHFJREFUCNdjYEAGjAlwlrAgAwP3BhBTWFhYjGGPN0hK0MpQlmGf9wWgvPGqxYYJO6dug4gKZZdO3QtRC2SGboKYoMsNYbJd1L3GPRXMZGBIY+A+Ga0Ls2f3bjUYc+tsBUJMhNqZ22BMboQJbJeuIfsGALlMIY7xN7XrAAAAAElFTkSuQmCC";

// What I like with these scripts is that I improve my XPath knowledge with each one...
const XPATH_DEVIANTLINK = "//div[@id='deviant' or @id='deviation']//div/h1//a";
const XPATH_WATCHNOTICE = "//div[@id='deviant-commands']/div/div";
const XPATH_RECENTWATCHERS = "//div[@id='deviant']//div[@class='boxtop']/h2/i[@class='icon i7']/../..";

// In Friends
const XPATH_OUTPUT_VIEW = "//div[@id='output']/div[@class='bubbleview']";

// In Message Center
//~ const XPATH_MC_MISCHEADER = "//div[@id='message-center']/div[@class='container subsection']/h3";
const XPATH_MC_WATCHERS = "//div[@id='message-center']/div[@class='container subsection']/ul/li/span/img[@src='http://i.deviantart.com/icons/userpage/friends.gif']";

var bDebugMode = false;
//~ DebugInfo = alert;
//~ DebugInfo = GM_log;
//~ DebugInfo = DebugLog;
DebugInfo = function () { };

// Some global variables...
var g_watcherList;

// For watcher list grabbing
var g_newWatcherNb = 0;
var g_currentPageNb = 1;
var g_bFullScan = false;

// Where we are
var g_currentURL = window.location.href;
var g_strippedURL = g_currentURL.replace(/\?.*$/, '');
// Name of the deviant we visit
var g_visitedDeviantName = window.location.host.match(/^[^.]+/)[0];
// Your deviant name!
if (unsafeWindow.deviantART == null)
	return;	// Perhaps page wasn't loaded properly
DebugObject(unsafeWindow.deviantART);
var yourUsername = unsafeWindow.deviantART.deviant["username"];
if (yourUsername === undefined)
{
	// A variant in some page (the watcher list in v.5 now!)
	yourUsername = unsafeWindow.deviantART.pageData.user["username"];
}
if (bDebugMode) DebugInfo(yourUsername);
if (yourUsername === undefined)
	return;	// You are probably logged out (or dA is in read-only mode, once again!)

var g_deviantName = yourUsername;
if (bDebugMode) g_deviantName = g_visitedDeviantName;
var g_lowDeviantName = g_deviantName.toLowerCase();

if ("http://my.deviantart.com/messages/" == g_strippedURL)
{
	var miscHeader = document.getElementById("subsection-head-m"); // h3 section
	if (miscHeader != null)
	{
		var button = document.createElement("input");
		button.setAttribute("type", "button");
		button.setAttribute("value", "Update watcher list");
		button.setAttribute("style", "font-size: 75%; margin-left: 20px;");
		button.addEventListener('click', UpdateWatcherListInMC, false);
		miscHeader.appendChild(button);
	}
	return;
}

if ("http://" + g_lowDeviantName + ".deviantart.com/" == g_strippedURL)
{
	// Add a button on the Recent Watchers list, for quick update if you have less than 20 new watchers
	// ... and to get the list if you have less than 20 watchers! (No Complete List link...)
	var recentWatchersTitle = GetXpathElement(XPATH_RECENTWATCHERS);
	if (recentWatchersTitle == null)	// No watchers at all?
		return;

	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("value", "Update watcher list");
	button.setAttribute("style", "font-size: 75%; float: right; margin-top: -2.5em;");
	button.addEventListener('click', UpdateWatcherList, false);
	recentWatchersTitle.appendChild(button);

	return;
}

// If we are on the Friend list page, we might be scanning it, or we propose the refresh (script) list options to the user.
var m = g_currentURL.match(/^http:\/\/([^.]+)\.deviantart.com\/friends\/(?:\?offset=(\d+))?$/);
if (m != null)
{
	if (m[1] == g_lowDeviantName)
	{
		// We are in the deviant's Friends page
		if (m[2] == '0' || m[2] === undefined)
		{
			// First page (offset=0 or no offset at all)
			// Add interface to start the update
			ManageWatchers();
		}
		else
		{
			if (GetParams())
			{
				// A page scan has started, we continue it
				LoadWatcherList();
				GrabWatchersAndGo();
			}
		}
	}
	return;
}

var deviantLink = GetXpathElement(XPATH_DEVIANTLINK);
if (deviantLink == null)
	return;	// Not a deviant page

// OK, so we went over all the barriers, we just display the result
// Get the current list
LoadWatcherList();

// Check if the visited deviant is in the watcher list
if (!IsWatcherInList(g_visitedDeviantName))
	return;	// Not a watcher

// Do the stuff!
if (bShowWatchIcon)
{
	var icon = document.createElement("img");
	icon.src = ICON_WATCH;
	deviantLink.style.marginRight = "20px";
	deviantLink.parentNode.insertBefore(icon, deviantLink.nextSibling);
}

if (bShowWatchMessage)
{
	var watchNotice = GetXpathElement(XPATH_WATCHNOTICE);
	if (watchNotice == null)
		return;	// Not on main page
	// Like dA, I create an empty i element (!) just to let CSS show an icon
	var watcherIcon = document.createElement("i");
	watcherIcon.setAttribute("class", "i11");
	watcherIcon.setAttribute("style", "opacity: 0.5;");
	// Here again, I create a line looking like Watching this deviant
	var watcherLink = document.createElement("a");
	watcherLink.setAttribute("style", "opacity: 0.5; text-decoration: none;");
	// Since I show a link, might point to your list of friends as well
	watcherLink.href = "http://" + g_deviantName + ".deviantART.com/friends/";
	watcherLink.innerHTML = WATCH_MESSAGE;
	watchNotice.parentNode.insertBefore(watcherIcon, watchNotice);
	watchNotice.parentNode.insertBefore(watcherLink, watchNotice);
}


//===== Management of the list: interface and grabbing

// Add the (basic) user interface to the watcher list page
function ManageWatchers()
{
	var page = GetXpathElement(XPATH_OUTPUT_VIEW);

	var div = document.createElement("div");
	div.setAttribute("style", "display: block; margin: auto; text-align: center; white-space: nowrap; width: 33em;");

	// Checkbox
	var option = document.createElement("input");
	option.setAttribute("type", "checkbox");
	option.setAttribute("id", "PL-Rescan");
	option.checked = false;
	// Button
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("value", "Update watcher list");
	button.style.marginLeft = "5em";
	button.addEventListener('click', ListWatchers, false);

	// Add them to the bottom of the page
	div.appendChild(option);
	div.appendChild(document.createTextNode("Rescan all"));
	div.appendChild(button);
	page.appendChild(div);
}

// Callback of the Update watcher list button in the profile page: just get the latest watchers (might be incomplete...)
function UpdateWatcherList()
{
	LoadWatcherList();
	var gwr = GrabWatchers();
	DebugObject(gwr);

	if (gwr.deviantNb > 0)	// More deviants
	{
		// Add the newer deviants to the start
		g_newWatcherNb = gwr.deviantNb;
		g_watcherList = gwr.deviantList + g_watcherList;
		SaveWatcherList();
	}
	ShowResult();
}

// Callback of the Update watcher list button in the message center page:
// just get the displayed new watchers (beware if more than 25 messages here...)
function UpdateWatcherListInMC()
{
	LoadWatcherList();
	var deviantNb = 0;
	var deviantList = DEVIANT_SEPARATOR;
	var watchers = GetXpathResult(XPATH_MC_WATCHERS);
	var node = watchers.iterateNext();
	while (node != null)
	{
		var link = node.parentNode.getElementsByTagName('a')[0];
		var deviant = link.textContent;
		if (!IsWatcherInList(deviant))	// Don't add duplicates
		{
			deviantList += deviant + DEVIANT_SEPARATOR;
			deviantNb++;
		}
		node = watchers.iterateNext();
	}
	if (deviantNb > 0)	// More deviants
	{
		// Add the newer deviants to the start
		g_newWatcherNb = deviantNb;
		g_watcherList = deviantList + g_watcherList;
		SaveWatcherList();
	}
	ShowResult();
}

// Callback of the Update watcher list button in the Friends list
function ListWatchers()
{
	var option = document.getElementById("PL-Rescan");

	if (option.checked)	// Rescan the full list
	{
		// Erase the previous list
		g_newWatcherNb = 0;
		g_watcherList = DEVIANT_SEPARATOR;
		g_bFullScan = true;
	}
	else	// Update the current list
	{
		if (GetParams())
		{
			// A scan was started and probably interrupted, we resume it
			GoToCurrentPage();
			return;	// The page reload isn't immediate, so I must stop the script here!
		}
		LoadWatcherList();
	}
	// Get the content of the current page (no need to reload it)
	// then try to get another page (and those beyond)
	GrabWatchersAndGo();
}

// Called when starting a rescan, and on each page of the Friend list called automatically
function GrabWatchersAndGo()
{
	// Show we are working...
	document.title = "Page " + g_currentPageNb + " - " + document.title;

	// Parse the current page
	var gwr = GrabWatchers();
	DebugObject(gwr);

	if (gwr.deviantNb > 0)	// More deviants
	{
		g_newWatcherNb += gwr.deviantNb;
		// Add the older deviants to the end
		g_watcherList += gwr.deviantList;
		SaveWatcherList();
	}
	// No deviants found, or last deviant of the page is known or no next page
	if (!g_bFullScan && (gwr.deviantNb == 0 || gwr.bLastIsKnown) || gwr.bNoNextPage)
	{
		// End of the scan, show the result
		ShowResult();
		GM_setValue(PARAMS_KEY, PARAM_SEPARATOR);
		return;
	}
	// Get the next page
	g_currentPageNb++;
	SetParams();
	GoToCurrentPage();
}

// Scan the watcher list page and grab all the watcher names.
// Return an object with the deviant list, the number of deviant grabbed,
// a boolean telling if there is a next page and
// a boolean telling if the last deviant of the page is known.
function GrabWatchers()
{
	// Designed so it works both in the deviant page and in the deviant's Friends page...
	const XPATH_DEVIANTLIST = "//div[@id='output']/div//ul[@class='f list']/li/a[@class='u']";
	const XPATH_NONEXTPAGE = "//div[@id='output']/div//del[. = 'Next Page']";

	var result = {};
	result.deviantList = DEVIANT_SEPARATOR;
	result.deviantNb = 0;
	result.bLastIsKnown = false;
	var xpathResult = GetXpathElement(XPATH_NONEXTPAGE);
	// If found, we have a <del>Next Page</del> tag, ie. no (more) pages after this one
	result.bNoNextPage = (xpathResult != null);

	xpathResult = GetXpathResult(XPATH_DEVIANTLIST);
	var node = xpathResult.iterateNext();
	while (node)
	{
		var deviant = node.textContent;
		result.bLastIsKnown = IsWatcherInList(deviant);
		if (!result.bLastIsKnown)	// Don't add duplicates
		{
			result.deviantList += deviant + DEVIANT_SEPARATOR;
			result.deviantNb++;
		}
		node = xpathResult.iterateNext();
	}
	return result;
}


//===== Convenience functions

function SaveWatcherList()
{
	// Replace multiple consecutive separators by one
	g_watcherList = g_watcherList.replace(new RegExp("[" + DEVIANT_SEPARATOR + "]+", 'g'), DEVIANT_SEPARATOR);
	// The trick to handle multiple accounts
	GM_setValue(WATCHER_LIST_KEY + ":" + g_deviantName, g_watcherList);
}

function LoadWatcherList()
{
	var wl = GM_getValue(WATCHER_LIST_KEY + ":" + g_deviantName, DEVIANT_SEPARATOR);
	if (wl.length < 3)
	{
		// Empty or something...
		wl = DEVIANT_SEPARATOR;
	}
	g_watcherList = wl;
}

function IsWatcherInList(deviant)
{
	return g_watcherList.toLowerCase().indexOf(DEVIANT_SEPARATOR + deviant.toLowerCase() + DEVIANT_SEPARATOR) >= 0;
}

function SetParams()
{
	GM_setValue(PARAMS_KEY, g_currentPageNb + PARAM_SEPARATOR +
			g_newWatcherNb + PARAM_SEPARATOR +
			(g_bFullScan ? "t" : "f"));
}

function GetParams()
{
	var paramStr = GM_getValue(PARAMS_KEY, PARAM_SEPARATOR)
	var paramArray = paramStr.match(PARAM_RE);
	if (paramArray != null)
	{
		// A page scan has started, we continue it
		g_currentPageNb = parseInt(paramArray[1]);
		g_newWatcherNb = parseInt(paramArray[2]);
		g_bFullScan = paramArray[3] == 't';
//~ 		DebugInfo(g_currentPageNb + " - " + g_newWatcherNb + " - " + g_bFullScan);
		return true;
	}
	return false;
}

function GoToCurrentPage()
{
	window.location.href = "http://" + g_deviantName + ".deviantART.com/friends/" +
			"?offset=" + (g_currentPageNb - 1) * 200;
}

function ShowResult()
{
	// Compute final number of watchers using a convoluted trick...
	var nb = g_watcherList.replace(new RegExp("[^" + DEVIANT_SEPARATOR + "]", 'g'), '').length - 1;
	// And show the result of the operation
	alert("Done:\n" +
			(g_newWatcherNb == 0 ? "No new watchers found\n" :
					g_newWatcherNb + " new watcher" + (g_newWatcherNb == 1 ? '' : 's') + " found\n") +
			"Total: " + nb + " watcher" + (nb == 1 ? '' : 's'));
}

function GetXpathResult(xpath)
{
	return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
}

function GetXpathElements(xpath)
{
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function GetXpathElement(xpath)
{
	var xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	if (xpathResult != null)
		return xpathResult.iterateNext();
	return null;
}

// Unlike GM_log, this log is persistent accross page reloads...
function DebugLog(str)
{
	GM_setValue("DebugLog", GM_getValue("DebugLog", "?") + "@" + str);
}

// Debug tool
function DebugObject(obj)
{
	if (bDebugMode)
	{
		var o = DumpObject(obj, 25);
		DebugInfo(o.dump);
	}
}
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
			{
				value = "'" + value.substring(0, truncate) + "'";
			}
			else
			{
				value = "'" + value + "'";
			}
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
