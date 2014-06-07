// ==UserScript==
// @name		OLD FB CHATING
// @namespace	old-fb-chatating
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

function OldFBChat ()
{
	function MutilateBuddyList (bl)
	{
		bl._calculateMaxItems = function () { return Infinity; };
		
		var getSortedList = bl.getSortedList;
		bl.getSortedList = function () {
			var ret = getSortedList.call (bl);
			for (var i = ret.length - 1; i >= 0; i--)
				if (AvailableList.get (ret[i]) === AvailableList.OFFLINE) 
					ret.splice (i, 1);
			return ret;
		};
	}

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
		}, 200);
	}
	
	function VarWait (a, b, cb)
	{
		if (a[b])
		{
			cb (a[b]);
			return;
		}
		
		var id = setInterval (function () {
			if (a[b])
			{
				clearInterval (id);
				cb (a[b]);
			}
		}, 200);
	}
	
	function Wait (prop, cb)
	{
		VarWait (window, prop, cb);
	}
	
	Wait ("Arbiter", function (n) {
		n.subscribe ("buddylist-nub/initialized",
			function (e, n) { MutilateBuddyList (n.buddyList); });
		n.subscribe ("sidebar/initialized",
			function (e, n) { n.disable (); });
	});

//	Wait ("ChatSidebar", function (n) {
//		if (n.isEnabled ())
//			n.disable ();
//		n.isViewportCapable = function () { return false; };
//	});
	
	Wait ("ChatConfig", function (n) {
		n.set ("ordered_list.group_availability", 1);
		n.set ("ordered_list.group_idle", 1);
		n.set ("sidebar", 0);
	});
}

(function () {
	if (location.pathname == "/ai.php")
		return;
	
	var script = document.createElement ("script");
	script.appendChild (document.createTextNode (OldFBChat.toString ()));
	script.appendChild (document.createTextNode ("OldFBChat ();"));
	
	var head = document.getElementsByTagName("head")[0];
	head.appendChild (script);
})();