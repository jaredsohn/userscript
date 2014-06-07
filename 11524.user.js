// ==UserScript==
// @name           TribalWars Forum Shorcuts (World 8)
// @namespace      http://none
// @description    Adds shortcuts for new TWars world 8 forums
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=1
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=323
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=324
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=325
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=326
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=327
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=328
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=330
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=331
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=334
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=336
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=336
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=343
// @include        http://*.tribalwar.com/forums/forumdisplay.php?f=342
// @author         hmeh, modded by vawlk, adapted for w8 by TheSpirit
// @version        3.0
// ==/UserScript==

	var screens = new Array("1", "323", "324", "325", "334", "326", "327", "328", "330", "331", "336", "343", "342");
	var screenNames = new Array("GD", "Main", "Strategy", "Account Sitting", "Recruitment", "K45", "K54", "K55", "K56", "K65", "K66", "K73", "K74");

      var seg = document.getElementById('forumtools');
	
	var row = document.createElement("tr");
	var col = document.createElement("td");
	col.setAttribute('class', 'tcat');
	col.setAttribute('colspan','3');
	for (var j = 0; j < screens.length; j++)
	{
		var a = document.createElement("a");
		a.href="forumdisplay.php?f=" + screens[j];
		var text = document.createTextNode(screenNames[j]);
		a.appendChild(text);
		col.appendChild(a);
		if (j != screens.length - 1)
		{
			text = document.createTextNode(" - ");
			col.appendChild(text);
		}

	row.appendChild(col);
	seg.parentNode.parentNode.insertBefore(row,seg.parentNode.nextSibling);

      }
