// ==UserScript==
// @name           OGame Redesign: Disable Useless Stuff
// @namespace      Vesselin
// @version        1.08
// @date           2012-11-25
// @description    "Disables" the buttons for building storages on moons and for reasearching useless techs
// @include        http://*.ogame.*/game/index.php?page=research*
// @include        http://*.ogame.*/game/index.php?page=resources*
// @include        http://*.ogame.*/game/index.php?page=station*
// @include        http://*.ogame.*/game/index.php?page=shipyard*
// @exclude        http://*.ogame.*/game/index.php?page=station*openJumpgate=1*
// ==/UserScript==

(function ()
{
	var myFunc = (function ()
	{
		var theUrl = document.location.href
		if ($ ("meta[name='ogame-planet-type']").attr ("content") == "moon")
		{
			if (theUrl.indexOf ("/game/index.php?page=resources") >= 0)
			{
				for (var i = 6; i <= 12; i++)
					if ($ ("#button" + i).length > 0)
						$ ("#button" + i)
							.attr ("class", "off")
							.find ("a.fastBuild")
								.css ("display", "none");
			}
			else if (theUrl.indexOf ("/game/index.php?page=shipyard") >= 0)
				$ ("#civil").children ().eq (5).attr ("class", "off");
			else if ((theUrl.indexOf ("/game/index.php?page=station") >= 0) &&
				 (theUrl.indexOf ("openJumpgate=1") < 0) &&
				 ($ ("#details43 .textlabel").length > 0) &&
				 (parseInt ($ ("#details43 .textlabel") [0].nextSibling.textContent) >= 1))
			{
				$ ("#button4").attr ("class", "off");
				if ($ ("#detail43").prev ().hasClass ("fastBuild"))
					$ ("#detail43").prev ().css ("display", "none");
			}
		}
		else if (theUrl.indexOf ('/game/index.php?page=research') >= 0)
		{
			var limits = [["120", 12], ["114", 8], ["199", 1]];
			/(\d+)\/\d+/.exec ($ ("#countColonies p span").text ());
			limits.push (["123", parseInt (RegExp.$1) - 1]);
			for (var i = 0; i < limits.length; i++)
			{
				var level = $ ("#details" + limits [i] [0] + " span.textlabel");
				if ((level.length > 0) && (parseInt (level [0].nextSibling.textContent) >= limits [i] [1]))
				{
					$ (".research" + limits [i] [0]).parent ().attr ("class", "off");
					if ($ (".research" + limits [i] [0] + " a").hasClass ("fastBuild"))
						$ (".research" + limits [i] [0] + " a.fastBuild").css ("display", "none");
				}
			}
		}
	}).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
})();
