// ==UserScript==
// @name	OGame Redesign: Show Players' Status in the Highscores
// @description	Colors the player names in the Highscores the same way they look in the Galaxy
// @namespace	Vesselin
// @version	1.02
// @date        2012-08-23
// @author      Vesselin Bontchev
// @include	http://*.ogame.*/game/index.php?page=highscore*
// @include	http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

(function ()
{
	var theUrl = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((theUrl.indexOf ("/game/index.php?page=highscore") < 0) &&
	    (theUrl.indexOf ("/game/index.php?page=alliance")  < 0))
		return;
	var gameVersion = document.getElementsByName ("ogame-version");
	if (gameVersion.length < 1)
		return;
	gameVersion = gameVersion [0].content.split (".");
	var versionNumber = 0;
	for (var i = 0; i < 3; i++)
	{
		versionNumber *= 100;
		versionNumber += parseInt (gameVersion [i]);
	}
	if (versionNumber < 40100)
		return;
	var strFunc = (function ()
	{
		var players = new Array ();
		var theUrl = document.location.href;
		var uni = theUrl.replace (/^http:\/\/([^\/]+).+/, "$1");
		function colorPlayers (table)
		{
			if (table.length <= 0)
				return;
			table.find ("tbody tr").each (function ()
			{
				var playerName, sendMsgUrl;
				if (theUrl.indexOf ("page=highscore") >= 0)
				{
					playerName = $ (this).find ("td.name a:last span:first");
					sendMsgUrl = $ (this).find ("td.sendmsg a:first");
				}
				else
				{
					playerName = $ (this).find ("td:first");
					sendMsgUrl = $ (this).find ("td:last a[href*=writemessage]");
				}
				var playerStatus = "";
				if (sendMsgUrl.length > 0)
				{
					var playerID = sendMsgUrl.attr ("href").replace (/^.+to=(\d+).*$/, "$1");
					playerStatus = (typeof (players [playerID]) === "undefined") ? "!" : players [playerID];
				}
				if (playerStatus == "")
				{
					if (! playerName.hasClass ("status_abbr_honorableTarget"))
						playerName.addClass ("status_abbr_active");
				}
				else if (playerStatus.indexOf ("v") >= 0)
				{
					playerName.removeClass ("status_abbr_honorableTarget");
					playerName.addClass ("status_abbr_vacation");
				}
				else if (playerStatus.indexOf ("i") >= 0)
					playerName.addClass ("status_abbr_inactive");
				else if (playerStatus.indexOf ("I") >= 0)
					playerName.addClass ("status_abbr_longinactive");
				else if (playerStatus.indexOf ("o") >= 0)
					playerName.addClass ("status_abbr_outlaw");
			});
		}
		var tableID, ajaxID, ajaxPage;
		if (theUrl.indexOf ("page=highscore") >= 0)
		{
			tableID  = "ranks";
			ajaxID   = "stat_list_content";
			ajaxPage = "highscoreContent";
		}
		else
		{
			tableID  = "member-list";
			ajaxID   = "eins";
			ajaxPage = "allianceOverview";
		}
		players = JSON.parse (localStorage.getItem (uni + "_players"));
		var loaded = players && ((Math.round (Date.now () / 1000) - players ["timeStamp"]) < (24 * 60 * 60));
		var table = $ ("#" + tableID);
		if (loaded)
		{
			if (theUrl.indexOf ("page=highscore") >= 0)
				colorPlayers (table);
		}
		else
		{
			$.get (
				"/api/players.xml",
				function (xml)
				{
					var thePlayers = xml.getElementsByTagName ("player");
					var timeStamp = xml.getElementsByTagName ("players");
					timeStamp = (timeStamp.length > 0) ? (timeStamp [0].getAttribute ("timestamp") || "") : "" ;
					players = {};
					for (var i = 0; i < thePlayers.length; i++)
						players [thePlayers [i].getAttribute ("id")] = thePlayers [i].getAttribute ("status") || "";
					players ["timeStamp"] = timeStamp;
					localStorage.setItem (uni + "_players", JSON.stringify (players));
					loaded = true;
					colorPlayers (table);
				},
				"xml"
			);
		}
		$ ("#" + ajaxID).ajaxSuccess (function (e, xhr, settings)
		{
        		if (settings.url.indexOf ("page=" + ajaxPage) < 0)
				return;
			table = $ ("#" + tableID);
			if (loaded)
				colorPlayers (table);
		});
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "text/javascript");
	script.text = "(" + strFunc + ") ();";
	document.body.appendChild (script);
}) ();
