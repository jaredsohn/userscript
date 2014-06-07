// ==UserScript==
// @name           OGame Redesign: Planet Menus
// @description    Puts menus in the tooltip of each planet to switch to that planet's corresponding page
// @namespace      Vesselin
// @version        1.05
// @date           2012-10-18
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?*page=*
// @exclude        http://*.ogame.*/game/index.php?page=search*
// @exclude        http://*.ogame.*/game/index.php?page=logout*
// @exclude        http://*.ogame.*/game/index.php?page=buddies*
// @exclude        http://*.ogame.*/game/index.php?page=payment*
// @exclude        http://*.ogame.*/game/index.php?page=notices*
// @exclude        http://*.ogame.*/game/index.php?page=showmessage*
// @exclude        http://*.ogame.*/game/index.php?page=traderlayer*
// @exclude        http://*.ogame.*/game/index.php?page=rocketlayer*
// @exclude        http://*.ogame.*/game/index.php?page=searchLayer*
// @exclude        http://*.ogame.*/game/index.php?page=combatreport*
// @exclude        http://*.ogame.*/game/index.php?page=globalTechtree*
// @exclude        http://*.ogame.*/game/index.php?page=station*&openJumpgate=1*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php") < 0)
		return;
	var myFunc = (function ()
	{
		const reduceMenu = false;	// Don't put on the menu an item pointing to the same page as the current one
		const addMessages = true;	// Put a menu item pointing to the message box (experimental!)
		$ (document).ready (function ()
		{
			function initClueTips ()
			{
				$ ("div.smallplanet a.planetlink,a.moonlink") 
					.cluetip ("destroy") 
					.cluetip ({
						width: 160,
						leftOffset: 0,
						showTitle: false,
						sticky: true,
						local: true,
						arrows: true,
						mouseOutClose: false,
						titleAttribute: "",
						closeText: ""
					})
					.attr ("title", "")
				;
			}
			function firstCap (theString)
			{
				return theString.charAt (0).toUpperCase () + theString.slice (1);
			}
			var url = document.location.href;
			var session = url.match (/\&session=([a-f0-9]{1,12})/i);
			if (session && session.length > 1)
				session = "&session=" + session [1];
			else
				session = "";
			var menus = [
				["overview",  ""],
				["resources", ""],
				["station",   ""],
				["research",  ""],
				["shipyard",  ""],
				["defense",   ""],
				["fleet1",    ""],
				["galaxy",    ""]
			];
			var version5 = false;
			var version = $ ("meta[name='ogame-version']");
			if (version.length)
			{
				version = version.attr ("content");
				if (version !== undefined)
				{
					var versionMajor = version.split (".");
					if (versionMajor.length >= 1)
					{
						versionMajor = parseInt (versionMajor [0], 10);
						version5 = versionMajor >= 5;
					}
				}
			}
			$ ("a.menubutton span").each (function (index, element)
			{
				for (var i = 0; i < menus.length; i++)
				{
					if ((menus [i] [1] == "") && (element.parentNode.href.indexOf (menus [i] [0]) >= 0))
					{
						menus [i] [1] = element.textContent;
						break;
					}
				}
			});
			if (addMessages)
			{
				var messAlert = document.getElementById ("message_alert_box");
				if (messAlert == null)
					messAlert = document.getElementById ("message_alert_box_default");
				if (messAlert)
				{
					var messTitleWords = messAlert.title.replace (/[\d:]+/g, "").replace (/^\s\s*/, "").replace (/\s\s*$/, "").split (/\s+/);
					menus.push (["messages", firstCap (messTitleWords [messTitleWords.length - 1].replace (/\(.+\)/, ""))]);
				}
			}
			$ ("div.smallplanet a.planetlink,a.moonlink").each (function (index, element)
			{
				var cps = element.href.match (/\&cp=([\d]{1,8})/i);
				if ((cps == null) || (cps.length < 2))
					return true;
				var cp = cps [1];
				var menuId = "planetMenu" + (index + 1).toString ();
				var myUl = (version5) ? "<ul>" : $ ("<ul />");
				for (var i = 0; i < menus.length; i++)
				{
					if (reduceMenu && ((url.indexOf ("page=" + menus [i] [0]) >= 0) ||
					    ((url.indexOf ("page=movement") >= 0) && (menus [i] [0] == "fleet1"))))
						continue;
					if (version5)
						myUl += '<li><a href="' + "index.php?page=" + menus [i] [0] + session + "&cp=" + cp + '">' + menus [i] [1] + '</a></li>';
					else
						$ (myUl)
							.append ($ ("<li />")
								.append ($ ("<a />")
								.attr ("href", "index.php?page=" + menus [i] [0] + session + "&cp=" + cp)
									.append (menus [i] [1])))
						;
				}
				if (version5)
				{
					myUl += "</ul>";
					var title = $ (this).attr ("title") || "";
					if (title.length)
						title += "<hr>";
					title += myUl;
					$ (this).attr ("title", title);
					$ (this).addClass ("tooltipCustom");
					if ($ (this).hasClass ("moonlink"))
						$ (this).addClass ("tooltipRight");
				}
				else
				{
					$ (element.parentNode).append ($ ("<div />")
						.attr ("id", menuId)
						.hide ()
						.append ($ ("<div />")
							.attr ("id", "TTWrapper")
							.addClass ("TTInner")
							.css ("width", "160px")
							.append ($ ("<div />")
								.append (element.title.replace (/^\|/, ""))
								.append ($ ("<div />")
									.addClass ("body")
									.css ("width", "160px")
									.css ("margin-left", "-6px")
									.append ($ ("<div />")
										.css ("margin-left", "45px")
										.css ("margin-top", "5px")
										.append (myUl))))))
					;
					$ (element).attr ("rel", "#" + menuId);
				}
			});
			if (! version5)
				setInterval (initClueTips, 1000);
		});
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
}) ();
