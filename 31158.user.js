// ==UserScript==
//
// @name          deviantART improvements
// @author        Philippe Lhoste aka. PhiLho
// @namespace     http://Phi.Lho.free.fr/
// @description   Try to make dA navigation/usage smoother.
// @version       1.07.000
// @include       http://*.deviantart.com/*
//
// ==/UserScript==
/*
Remove the "deviantART" title prefix: the favicon is enough for tab identification...
If you have lot of tabs in Firefox, having a title shortened to the essential information
at the start is important!

Also add a combobox in the account bar allowing to quickly jump to various parts of the account,
or dA or actually anywhere!
You can edit the list (var links) below to add, remove or change the addresses.

Also add a text area after the combo box: if you type a number and hit Return, you will jump to the
deviation whose ID you provided. Idem if typing d:<deviation ID>.
If you type a string, jumps to the deviant whose name you gave. Idem if typing D:<deviant name>
which is useful for names like 1 or 666...
You can use other prefixes:
- With a deviant name, use j: to jump to their journal, g: for their gallery and f: for their favourites.
- With a numerical ID, use n: to jump to a news article and F: for a FAQ entry.

All features can be deactivated, by changing in the script the lines below those starting with <code>//$$</code>
Read these comments for instructions.

// by Philippe Lhoste <PhiLho(a)GMX.net> http://Phi.Lho.free.fr & http://PhiLho.deviantART.com
// File/Project history:
 1.07.000 -- 2010/05/30 (PL) -- Adapt to dA v.7. Removed Move reply area as they did that already!
 1.06.000 -- 2009/10/21 (PL) -- Remove link obfuscation ("outgoing link").
 1.05.003 -- 2008/11/21 (PL) -- Centered the Move reply area button.
 1.05.002 -- 2008/11/11 (PL) -- Fixed anchoring to dock, again...
 1.05.001 -- 2008/08/06 (PL) -- Bug fix.
 1.05.000 -- 2008/08/05 (PL) -- Button to move reply area.
 1.04.001 -- 2008/06/04 (PL) -- Support of v.6 (and v.5).
 1.04.000 -- 2008/03/18 (PL) -- Added the jump to ID.
 1.03.000 -- 2007/12/04 (PL) -- Modularized, added links to uncomment.
 1.02.000 -- 2007/11/12 (PL) -- Changed the Gallery link to a combobox with lot of links!
 1.01.000 -- 2007/07/04 (PL) -- Add the Gallery link.
 1.00.000 -- 2007/06/27 (PL) -- Creation for titles.
*/
/* Copyright notice: For details, see the following file:
http://Phi.Lho.free.fr/softwares/PhiLhoSoft/PhiLhoSoftLicense.txt
This program is distributed under the zlib/libpng license.
Copyright (c) 2007-2010 Philippe Lhoste / PhiLhoSoft
*/

(function(){

//### User configuration. Edit the settings below as you need

//=== Shorten the title to significant parts to show in tabs.

//$$ Comment out (prefix with //) if you don't want this feature.
ChangeTitle();


//=== Remove the stupid "outgoing" link obfuscation (I am a grown up!)

//$$ Comment out (prefix with //) if you don't want this feature.
RemoveOutgoingObfuscation();


//=== Provide a shortcut to copy a deviant name (not working!)

//$$ Comment out (prefix with //) if you don't want this feature.
//AddDeviantShortcut();


//=== Add a combo box to quickly jump around your profile or dA (or even elsewhere!).
// and a text box to jump to an ID (number or deviant name).

// I put there only links not available in the deviant menu
// (deviantART icon left of your nickname in the status strip in v.5, drop down arrow right of the nickname in v.6).
//$$ Feel free to add or remove links, like Random Deviant!
var links =
{
//	Name shown by combo		URL to jump to
	'Jump Around!':			"",		// Shown by default in the combo, kind of title, inactive
	// Visible by everybody, prefixed by http://YourDeviantName.deviantART.com
	// where YourDeviantName is found by the script.
	'Gallery':				"/gallery/",
	'Scraps':				"/gallery/scraps/",
	'Favourites':			"/favourites/",
	'Journal':				"/journal/",
	// When you are logged in
	'Friends list':			"http://my.deviantart.com/deviants/",
	'Notes':				"http://my.deviantart.com/notes/",
	// Stats, etc.
	'Gallery Stats':		"/stats/gallery/",
	'Pageviews':			"/stats/pageviews/",	// Only if you are subscribed!
	'Activity':				"/activity/",
	'Watchers':				"/friends/",
	'Selected watchers':	"/myfriends/",	// Only if you are subscribed!
	'Nearby deviants':		"/near/",
	// Favorite forums
	'Forum: Suggestions':	"http://forum.deviantart.com/devart/suggestions/",
	'Forum: Programming':	"http://forum.deviantart.com/community/programming/",
	'Forum: Software':		"http://forum.deviantart.com/software/general/",
	'Forum: Cartoons':		"http://forum.deviantart.com/galleries/cartoons/",
	'Forum: Beta feedback':	"http://forum.deviantart.com/devart/betafeedback/",
// Other links you can use (just remove the // at the start of the line).
// Most of them are nearly always reachable in the icon menu or somewhere else in the page.

	// Easily reachable when there is something to see
//	'deviantWATCH':			"http://my.deviantart.com/devwatch/",
//	'Community Messages':		"http://my.deviantart.com/messages/",

	// Icon menu
//	'Submit deviation':			"http://www.deviantart.com/submit/",
//	'Submit print':			"http://www.deviantart.com/submit/sell/",
//	'Update journal':			"http://my.deviantart.com/journal/",
//	'Shopping account':		"http://my.deviantart.com/account/",
//	'Wishlist':				"http://my.deviantart.com/wishlist/",
//	'Edit profile':				"http://my.deviantart.com/profile/",
//	'Edit settings':				"http://my.deviantart.com/settings/",
//	'Manage prints':			"http://store.deviantart.com/",
//	'Deviation management':	"http://my.deviantart.com/gallery/",
//	'Services':				"http://my.deviantart.com/services/",
//	'Help & FAQ':				"http://help.deviantart.com/",

	// Links on top or bottom of every page
//	'Browse':					"http://browse.deviantart.com/",
//	'Shop':					"http://shop.deviantart.com/",
//	'Chat':					"http://chat.deviantart.com/",
//	'News':					"http://news.deviantart.com/",
//	'Today':					"http://today.deviantart.com/",
//	'Forum':					"http://forum.deviantart.com/",
//	'Random deviation':		"http://www.deviantart.com/random/deviation",
//	'Random deviant':			"http://www.deviantart.com/random/deviant",
}

// You can add the URL for your favorite galleries, deviants you visit often, specific forums, etc.

//$$ Comment out (prefix with //) if you don't want this feature.
AddJumpAround();


//### Do not change code below! (unless you know what you are doing... :D)

//=== Shorten title to show more significant info in small Firefox' tabs
function ChangeTitle()
{
	// We see the title tag of the header
	var title = document.title;
	// And alter it a bit:
	// Remove "deviantART" prefix (there is a favicon anyway)
	document.title = title.replace(/^deviantART(?::)? /, "");
}

//=== Remove outgoing link obfuscation
// http://www.deviantart.com/users/outgoing?http://registry.gimp.org/
function RemoveOutgoingObfuscation()
{
	const XPATH_LINK = "//a";
	const dauoRE = /^http:\/\/www\.deviantart\.com\/users\/outgoing\?/;

	var xpathResult = GetXpathElements(XPATH_LINK);
	for (var i = 0; i < xpathResult.snapshotLength; i++)
	{
		var link = xpathResult.snapshotItem(i);

		var url = link.getAttribute("href");
		if (url == null)
			continue;	// Fishy, skip it
		if (url.match(dauoRE))
		{
			url = url.replace(dauoRE, "");
//~ GM_log("=> " + url);
			link.setAttribute("href", url);
		}
	}
}

//=== Add deviant shortcut
function AddDeviantShortcut()
{
	const XPATH_DEVIANT = "//div[@class='thought block']/span[@class='author']/a";

	var xpathResult = GetXpathElements(XPATH_DEVIANT);
	for (var i = 0; i < xpathResult.snapshotLength; i++)
	{
		var node = xpathResult.snapshotItem(i);
	}
}

// No used yet... Might become a "copy deviant name" feature.
function CopyCode(evt)
{
  var tb = evt.target.parentNode.wrappedJSObject;
  unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  const clipboardHelper = Components.classes
		  ["@mozilla.org/widget/clipboardhelper;1"].
		  getService(Components.interfaces.nsIClipboardHelper);
  // For some reason, all end-of-line chars are doubled. Also &nbsp; becomes 0xA0
  clipboardHelper.copyString(tb.targetDiv.textContent.replace(/\n\n/g, '\n').replace(/\xA0/g, ' '));
}


//=== Add a navigation bar in profile dock: a drop down with useful URLs, a text field to jump to variable places.
function AddJumpAround()
{
	// Your deviant name!
	if (unsafeWindow.deviantART == null)
		return;	// Perhaps page wasn't loaded properly
	var yourUsername = unsafeWindow.deviantART.deviant["username"];
	var yourURL = "http://" + yourUsername + ".deviantART.com";


	// The Upgrade Now section, not sure where to go for subscribers now...
	const XPATH_UPNOW = "//div[@id='overhead-sc']/div[@class='oh-ml oh-hl']";

	var addJumpArea = GetXpathElement(XPATH_UPNOW);
	if (addJumpArea == null)	// Might be not yet created by JS? Or dA has changed again...
		return;

	var unLink = addJumpArea.firstElementChild;
	addJumpArea.removeChild(unLink);
	var comboBox = document.createElement("select");
	comboBox.setAttribute("name", "LinkList");
	comboBox.setAttribute("style", "background-color: #BCCEC3; font-size: .8em; margin: 12px 8px 0 4px;");
	comboBox.addEventListener('change', JumpToLink, false);

	for (var key in links)
	{
		var option = document.createElement("option");
		var link = links[key];
		if (link.charAt(0) == '/')
		{
			// Relative link, add the URL of the user
			option.value = yourURL + link;
		}
		else	// Raw link
		{
			option.value = link;
		}
		option.text = key;
		comboBox.appendChild(option);
	}
	addJumpArea.appendChild(comboBox);

	// You can paste a deviation ID there and when hitting Return, it will jump to this deviation. Great to see inert thumb...
	// You can also paste or type a deviant name (if not purely numerical...).
	var inputArea = document.createElement("input");
	inputArea.setAttribute("type", "text");
	inputArea.setAttribute("size", "10");
	inputArea.setAttribute("id", "PL-ID");
	inputArea.setAttribute("name", "PL-ID");
	inputArea.setAttribute("style", "background-color: #BCCEC3; font-size: .8em;");
	inputArea.addEventListener('keypress',
			function (evt) { if (evt.which == 13) JumpToID(evt); },
			false);
	addJumpArea.appendChild(inputArea);

	function JumpToLink(evt)	// For event callback
	{
		window.location.href = evt.target.value;
	}

	// Jump from text field value.
	function JumpToID(evt)	// For event callback
	{
		var inputValue = document.getElementById("PL-ID").value;
		var m = inputValue.match(/^(?:([a-zA-Z]):)?(.*)$/);
		if (m != null)
		{
			var action, id;
			if (m[1] == undefined)	// No ':'
			{
				id = parseInt(inputValue);
				if (isNaN(id))	// Not a number
				{
					action = 'D';	// Jump to deviant page
					id = inputValue;
				}
				else
				{
					action = 'd';	// Jump to deviation
				}
			}
			else
			{
				action = m[1];
				id = m[2];
			}
			switch (action)
			{
			case 'd':	// Deviation
				window.location.href = "http://www.deviantart.com/deviation/" + id + "/";
				break;
			case 'D':	// Deviant
				window.location.href = "http://" + id + ".deviantart.com/";
				break;
			case 'j':	// Journal
				window.location.href = "http://" + id + ".deviantart.com/journal/";
				break;
			case 'g':	// Gallery
				window.location.href = "http://" + id + ".deviantart.com/gallery/";
				break;
			case 'f':	// Favourites
				window.location.href = "http://" + id + ".deviantart.com/favourites/";
				break;
			case 'F':	// FAQ
				window.location.href = "http://help.deviantart.com/" + id + "/";
				break;
			case 'n':	// News
				window.location.href = "http://news.deviantart.com/article/" + id + "/";
				break;
			default:
				alert(action + ":" + id);
				break;
			}
		}
	}
}

function GetXpathResult(xpath)
{
	return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
}

function GetXpathElement(xpath)
{
	var xpathResult = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	if (xpathResult != null)
		return xpathResult.iterateNext();
	return null;
}

function GetXpathElements(xpath)
{
	return document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function GetXpathSubElement(xpath, parent)
{
	return document.evaluate(xpath, parent, null, XPathResult.ANY_TYPE, null);
}

})();
