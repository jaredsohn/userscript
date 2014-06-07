// ==UserScript==
// @name		Old FB Chat
// @namespace	old-fb-chat
// @description	Restores FB chat to its old self
// @include		http://www.facebook.com/*
// @match		http://www.facebook.com/*
// @include		https://www.facebook.com/*
// @match		https://www.facebook.com/*
// ==/UserScript==

Warning = [
"   IF YOU'RE SEEING THIS, YOU'RE PROBABLY USING FIREFOX OR A                    ",
"   NON-SUPPORTED BROWSER.                                                       ",
"                                                                                ",
"   IF YOU'RE USING FIREFOX, YOU MUST INSTALL GREASEMONKEY BEFORE                ",
"   INSTALLING THIS SCRIPT.                                                      ",
"                                                                                ",
"   https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/                 "];

function OldFBChat (window)
{
	function Wait (prop, cb)
	{
		if (window[prop])
		{
			cb (window[prop]);
			return;
		}
		
		var id = setInterval (function () {
			if (window[prop])
			{
				clearInterval (id);
				cb (window[prop]);
			}
		}, 50);
	}
	
	function MutilateBuddyList (bl)
	{
		bl._calculateMaxItems = function () { return Infinity; };
		bl.getSortedList = function () { return window.AvailableList.getAvailableIDs (); };
	}
	
	window.document.documentElement.classList.remove ("sidebarMode");
	
	Wait ("Arbiter", function (a) {
		a.subscribe ("chat-options/initialized", function (e, n) {
			n.settings["sidebar_mode"] = false;
		});
		a.subscribe ("buddylist-nub/initialized", function (e, n) {
			MutilateBuddyList (n.buddyList);
		});
	});
	
	Wait ("ChatConfig", function (n) {
		n.set ("ordered_list.group_availability", 1);
		n.set ("ordered_list.group_idle", 1);
		n.set ("sidebar.minimum_width", Infinity);
	});
	
	Wait ("ChatSidebar", function (n) {
		n.isViewportCapable = function () { return false; };
	});
}

(function () {
	if (location.pathname == "/ai.php")
		return;
	
	if (unsafeWindow.Env)
	{
		OldFBChat (unsafeWindow);
		return;
	}
	
	var script = document.createElement ("script");
	script.appendChild (document.createTextNode (OldFBChat.toString ()));
	script.appendChild (document.createTextNode ("OldFBChat (window);"));
	
	var head = document.getElementsByTagName("head")[0];
	head.appendChild (script);
})();
