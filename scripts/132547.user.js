// ==UserScript==
// @name	OGame Redesign: Show Ships in Stats
// @description	Shows in a separate column on the Military Points page the number of ships of the players
// @namespace	Vesselin
// @version	1.05
// @date        2012-09-20
// @author      Vesselin Bontchev
// @include	http://*.ogame.*/game/index.php?page=highscore*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=highscore") < 0)
		return;
	var $;
	try
	{
		$ = unsafeWindow.$;
	}
	catch (e)
	{
		$ = window.$;
	}
	$ ("#stat_list_content").css ("width", "640px");
	$ ("#highscore .contentbox div.content").css ({"width": "660px", "padding-left": "0"});
	$ ("#stat_list_content").ajaxSuccess (function (e, xhr, settings)
	{
        	if (settings.url.indexOf ("page=highscoreContent") < 0)
			return;
		$ ("#ranks td.name").css ("white-space", "nowrap");
		$ ("#ranks td.sendmsg").css ("white-space", "nowrap");
		if ($ ("#player").hasClass ("active") &&
		    (! $ ("#fleet").hasClass ("active") ||
		    $ ("#subnav_fleet .subnavButton_lost").hasClass ("active")  ||
		    $ ("#subnav_fleet .subnavButton_built").hasClass ("active") ||
		    $ ("#subnav_fleet .subnavButton_honor").hasClass ("active") ||
		    $ ("#subnav_fleet .subnavButton_destroyed").hasClass ("active")))
		{
			$ ("#ranks thead tr:last td").eq (2).after ('<td align="center"></td>');
			$ ("#ranks tbody tr").each (function ()
			{
				var myHref = $ (this).find ("td.name a:last").attr ("href");
				var myCoords = myHref.match (/galaxy=(\d+)&system=(\d+)&position=(\d+)/);
				$ (this).find ("td.name").after ('<td align="center">[<a href="' + myHref + '">' + myCoords [1] + ":" + myCoords [2] + ":" + myCoords [3] + "</a>]");
			});
		}
		if (! $ ("#alliance").hasClass ("active") &&
		    ! $ ("#player").hasClass ("active") &&
		    (! $ ("#fleet").hasClass ("active") ||
		    $ ("#subnav_fleet .subnavButton_lost").hasClass ("active")  ||
		    $ ("#subnav_fleet .subnavButton_built").hasClass ("active") ||
		    $ ("#subnav_fleet .subnavButton_honor").hasClass ("active") ||
		    $ ("#subnav_fleet .subnavButton_destroyed").hasClass ("active")))
			return;
		var myTitle = $ ("#ranks td.score").eq (0).attr ("title");
		if (myTitle)
		{
			myTitle = ($ ("#alliance").hasClass ("active")) ? myTitle.substr (1, 1) : myTitle.split (/\s+/) [0].replace (/[\|:]/g, "");
			$ ("#ranks thead tr:last td:last").after ('<td align="center">' + myTitle + "</td>");
		}
		$ ("#ranks tbody tr").each (function ()
		{
			var myNumber = $ (this).find ("td.score").attr ("title");
			if (myNumber)
			{
				myNumber = ($ ("#alliance").hasClass ("active")) ? myNumber.substr (2) : myNumber.split (/\s+/) [1];
				$ (this).find ("td:last").after ('<td style="font-size: 13px; font-weight: bold; text-align: right; width: 50px;">' + myNumber + "</td>");
			}
		});
	});
	if ($ ("#player").hasClass ("active"))
	{
		$ ("#ranks td.name").css ("white-space", "nowrap");
		$ ("#ranks td.sendmsg").css ("white-space", "nowrap");
		$ ("#ranks thead tr:last td").eq (2).after ('<td align="center"></td>');
		$ ("#ranks tbody tr").each (function ()
		{
			var myHref = $ (this).find ("td.name a:last").attr ("href");
			var myCoords = myHref.match (/galaxy=(\d+)&system=(\d+)&position=(\d+)/);
			$ (this).find ("td.name").after ('<td align="center">[<a href="' + myHref + '">' + myCoords [1] + ":" + myCoords [2] + ":" + myCoords [3] + "</a>]");
		});
	}
}) ();
