// ==UserScript==
// @name           OGame Redesign: Fix the Action Icons
// @description    Prevents the shifting of the action icons if no spy icon available and removes the IPM and spy icons and menus if not applicable
// @namespace      Vesselin
// @version        2.02
// @date           2012-10-16
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=galaxy") < 0)
		return;
	var myFunc = (function ()
	{
		// Check OGame version (must be >= 5):
		var version = $ ("meta[name='ogame-version']");
		if (version.length == 0)
			return;
		version = version.attr ("content");
		if (version === undefined)
			return;
		var versionMajor = version.split (".");
		if (versionMajor.length < 1)
			return;
		versionMajor = parseInt (versionMajor [0], 10);
		if (versionMajor < 5)
			return;
		// Compute the planet relocation price:
		var planetRelocationPrice = 240000;
		var now = new Date ();
		var monthDay = now.getDate ();
		var year = now.getYear ();
		if (year < 2000)
			year += 1900;
		if ((year == 2010) && (now.getMonth () == 11) && (monthDay >= 20) && (monthDay <= 22))
			planetRelocationPrice = 160000;
		else if ((year == 2011) && (now.getMonth () == 7) && (monthDay >= 25) && (monthDay <= 26))
			planetRelocationPrice = 180000;
		// Make the unread messages icon visible:
		var envelope = $ ("#message_alert_box");
		if (envelope.length == 0)
		envelope = $ ("#message_alert_box_default");
		envelope.css ({
			"position" : "absolute",
			"left" : "2px",
			"top" : "-60px"
		});
		$ ("#inhalt").append (envelope);
		// Make the attack sign visible:
		var attackSign = $ ("#attack_alert");
		attackSign.css ({
			"position" : "absolute",
			"left" : "600px",
			"top" : "0px"
		});
		$ ("#inhalt").append (attackSign);
		// Wait until the Galaxy page is fully loaded:
		$ ("#galaxyContent").ajaxSuccess (function (e, xhr, settings)
		{
			// Fix the class of the flight slots the moment they are filled:
			if (settings.url.indexOf ("page=minifleet") >= 0)
			{
				/(\d+)\/(\d+)/.exec ($ ("#slotValue").text ());
				if (parseInt (RegExp.$1) == parseInt (RegExp.$2))
					$ ("#slotValue").addClass ("overmark");
				else
					$ ("#slotValue").removeClass ("overmark");
				return;
			}
			if (settings.url.indexOf ("page=fetchResources") >= 0)
			{
				// Make the planet relocation icons inactive and change their tooltips, if there isn't enough DM:
				eval ("var res = " + xhr.responseText);
				var darkMatter = res ["darkmatter"] ["resources"] ["actual"];
				var darkMatterName = res ["darkmatter"] ["string"].replace (res ["darkmatter"] ["resources"] ["actualFormat"] + " ", "");
				if (darkMatter < planetRelocationPrice)
				{
					$ (".planetMoveIcons.planetMoveDefault.tooltip").each (function ()
					{
						$ (this)
							.removeAttr ("onclick")
							.removeClass ("planetMoveDefault")
							.addClass ("planetMoveInactive")
							.attr ("href", document.location.href.replace ("galaxy", "premium") + "&openDetail=1");
						changeTooltip (this, darkMatterName + " < " + number_format (planetRelocationPrice));
					});
				}
				return;
			}
			// Check if the Galaxy page has been loaded:
			if ((settings.url.indexOf ("page=galaxyContent") < 0) || ($ ("#fleetstatus").length == 0))
				return;
			// Close the opened tooltips when viewing a new system (bug in OGame 5.1.1):
			Tipped.hideAll ();
			$ ("tr.row").each (function ()
			{
				// Get the coordinates of the position (must be done first):
				var coords = $ (this).find ("span#pos-planet");
				if (coords.length == 0)
					return;
				coords = coords.text ().split (/[\[:\]]/);
				if (coords.length == 0)
					return;
				// Replace the "ghostly" moon picture (if any) with a proper one:
				var moonPic = $ (this).find ("td.moon a img");
				if (moonPic.length)
				{
					var moonImage = $ (this).find ("td.moon ul.ListImage img");
					moonPic.attr ("src", (moonImage.length) ? moonImage.attr ("src") : "/cdn/img/planets/moon_" + ((parseInt (coords [2], 10) + parseInt (coords [3], 10)) % 5 + 1).toString () + "_3.gif");
				}
				// Add the missing espionage icon or empty space, whichever is appropriate:
				var firstA = $ (this).find ("td.action a:first");
				if (firstA.length)
				{
					var href = firstA.attr ("href");
					if ((href != null) && (href.length > 0) && (firstA.find ("span.icon_eye").length == 0))
						firstA.before (
							($ (this).find ("td.playername").is (".vacation,.noob")) ?
								'<a></a>' :
								'<a href="javascript:void(0);" onclick="sendShips (6, ' + coords [1] + ", " + coords [2] + ", " + coords [3] + ', 1, ' + spionageAmount + '); return false;">' +
								'<img width="16" height="16" src="data:image/gif;base64,R0lGODlhEAAQAJEDAP///1x2i2+JnQAAACH5BAEAAAMALAAAAAAQABAAAAIrXI6Zpu0P4wMUyFohxs4G+h1eIAhAaVboiZor67YlvMrtRtv6zvf84EMNCgA7">' +
								'</a>'
						);
				}
			});
		});
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
})();
