// ==UserScript==
// @name           Neopets : Avatars Flash Games
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Displays Avatars Flash Games and lets us to send score automatically
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2010+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.4.0
// @language       en
// @include        http://www.neopets.com/games/play.phtml?game_id=*
// @resource       meta http://userscripts.org/scripts/source/66139.meta.js
// @resource       i18n http://i18n.pastebin.com/download.php?i=N5Bnm8z6
// @require        http://gm.wesley.eti.br/uso_default.php
// @require        http://userscripts.org/scripts/source/85450.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @require        http://userscripts.org/scripts/source/69584.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/66138.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @history        2.0.4.0 Fixed bug in @require#69584
// @history        2.0.3.5 Sorted list of games by id
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

(function()
{	// script scope
	var games = {
	//	"id"  : [min_score, rnd_score, mod_score, ratio_time, rnd_time, avatar_gif, avatar_name]

	//	"330" : [900, 28, 10, 533, 1422, "drgrumps.gif", "Dr. Grumps"],	// shockwave
	//	"349" : [150000, 2129, 5, 8, -9876, "hatpc.gif", "Hannah and the Pirate Caves"],	// shockwave
	//	"356" : [1000, 197, 1, 768, 4556, "dice_escape.gif", "Dice Escape"],	// shockwave
	//	"386" : [1000, 241, 1, 568, 5698, "attackoftheslorgs.gif", "Attack of the Slorgs"],	// shockwave

		"149" : [250, 33, 1, 2322, -2566, "kacheek06.gif", "Kacheek - Herder"],
		"197" : [1220, 26, 1, 979, 4561, "efmcdraik.gif", "Draik - Escape from Meridell Castle"],
		"358" : [2000, 265, 1, 299, 3599, "faeriebubbles.gif", "Faerie Bubbles"],
		"390" : [1250, 586, 1, 700, 5427, "ff_yoinked.gif", "Freaky Factory - Yoinked"],
		"538" : [1000, 194, 1, 556, 4517, "jellyprocessing.gif", "Skeith - Jelly Processing Plant"],
		"801" : [9050, 34, 10, 130, -8754, "freakedkorbat.gif", "Freaked Korbat"],
		"903" : [100, 30, 1, 2412, 2222, "bullseye.gif", "Turtum"],
		"999" : [2500, 291, 1, 236, -6543, "destructomatch2.gif", "Destruct-O-Match II"],
                "885" : [7530, 16, 10, 77, -3756, "mathsbabaa.gif", "Babaa - Maths Nightmare"],

		"1042": [2250, 19, 10, 396, -4531, "mutantgravedoom.gif", "Mutant Graveyard of Doom II"],
		"1048": [4000, 24, 10, 124, -3214, "nimmospond.gif", "Nimmos Pond"]
	},
	id = location.search.match(/\bgame_id=(\d+)/)[1],
	cat = xpath("id('cat_images_container')/div[position()=last()]")[0];

	if (id in games && cat)
	{
		var ava = document.createElement("div"),
		span = [document.createElement("span"), document.createElement("span")];
		ava.setAttribute("class", "cat_image");
		if (!games[id][5])
		games[id][5] = "default.gif";
		if (!/^\w+:\//.test(games[id][5]))
		games[id][5] = "http://images.neopets.com/neoboards/avatars/" + games[id][5];
		ava.innerHTML = "<a class='info' href='javascript:void(0);'><img width='50' border='0' height='50' src='" + games[id][5] + "' />" + (games[id][6] ? "<span class='cat_tooltip'>" + games[id][6] + "</span>" : "") + "</a>";
		cat.parentNode.insertBefore(ava, cat.nextSibling);
		ava.parentNode.insertBefore(span[1], ava.nextSibling);	// time
		ava.parentNode.insertBefore(span[0], span[1]);	// score
		
		xpath(".//a", ava)[0].addEventListener("click", function(e)
		{
			var t,
			game = games[id],
			s = game[0] + Math.floor(game[1] * game[2] * Math.random()),
			s = parseInt(prompt(I18n.get("npafg.score.prompt") + " " + game[0] + "+)", s - s%game[2]), 10)||0;
			s -= s % game[2];	// mod
			
			if (s > 0 && (t = parseInt(prompt(I18n.get("npafg.time.prompt"), s * game[3] + Math.floor(game[4] * Math.random())), 10)||0) > 0)
			FlashGame.execute({
				"params" : {
					"span" : span
				},
				"id" : id,
				"score" : [s, 0, 1],
				"time" : [t, 0],
				"session" : true,
				"autosend" : false,
				"continue" : function(p)
				{
					p.params.span[0].innerHTML = p.s + "<br />";
					p.params.span[1].textContent = "";

					(function(span, timer, p)
					{
						var i = timer.current(true);
						if (!span.textContent.length || span.textContent.indexOf(":") > -1)
						if (i < 1000)
						{
							span.textContent = I18n.get("npafg.wait.label");
							p.next(p);
						}
						else
						{
							span.textContent = timer.toString();

							if (/^(?:20|15|10|5|4|3|2|1)$/.test(Math.floor(i/1000)) && p.beep.play)
							p.beep.play();

							setTimeout(arguments.callee, 1000, span, timer, p);
						}
					})(p.params.span[1], new Timer(new Date().valueOf() + p.t), p);

					document.body.setAttribute("onbeforeunload", "return '" + I18n.get("npafg.running.bkgd") + "'");
				},
				"onsuccess" : function(p)
				{
					var msgs = [
						I18n.get("npafg.msg.success"),
						"Unknown success",
						"Unknown bonus",
						I18n.get("npafg.msg.reached_max"),
						"Zero score",
						"Unknown",
						"Invalid",
						"Timeout",
						"No login",
						"Challenge",
						"Cookie",
						I18n.get("npafg.msg.reached_max"),
						"Challenge slow",
						"DC COMP",
						"DC TIME",
						I18n.get("npafg.msg.reviewed"),
						"Quick session",
						I18n.get("npafg.msg.missing_hash"),
						"Too slow",
						"DD SUCCESS",
						"DD NO SUCCESS",
						"IDS_SM_DD_MAX",
						"IDS_SM_DD_BEAT_AAA",
						"IDS_SM_DD_BEAT_ABIGAIL",
						"IDS_SM_DD_BEAT_DOUBLE",
						"IDS_SM_DD_BEAT_LULU",
						I18n.get("npafg.msg.success")
					];

					if (p.list.errcode in msgs)
					p.params.span[1].textContent = msgs[p.list.errcode];
					else
					p.params.span[1].textContent = I18n.get("npafg.error.unknown") + " " + p.list.errcode;

					var o = [];
					for ( var k in p.list )
					o.push([k, p.list[k]].join("\t"));
					GM_log(o.join("\n"));

					document.body.setAttribute("onbeforeunload", "");
					document.body.removeAttribute("onbeforeunload");
				}
			});
		}, false);
		
		FlashGame.menu("cached_includes", "[Neopets : Avatars Flash Games] " + I18n.get("inpfg.cache_encrypt.label"));
	}
})();matr