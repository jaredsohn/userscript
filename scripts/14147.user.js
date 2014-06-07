// ==UserScript==
// @name           RS - Advanced Hiscores
// @namespace      MaxWaterman, Fern1970, Helcaterian, Oblivion590, Hans980, Benmarchant, mredkj.com, frostedfreeze@gmail.com
// @description    This script currently adds the Combat skill to the hiscores. Expect the combat rows to be added in the next version when comparing hiscores.
// @include        http://hiscore.runescape.com/hiscorepersonal.ws*
// @include        http://*.hiscore.runescape.com/highscorepersonal.ws*
// @include        http://hiscore.runescape.com/*/hiscorepersonal.ws*
// @include        http://*.hiscore.runescape.com/*/hiscorepersonal.ws*
// ==/UserScript==

// Formula version 4.0 
// Created by MaxWaterman
// Formula by MaxWaterman, Fern1970, Helcaterian,
// Oblivion590, Hans980 and Benmarchant.
// Reproduction without this comment is prohibited.

// Converted to Javascript, made to work with Hiscores, combat XP, and percent out of maximum XP by frostedfreeze@gmail.com
// addCommas function made by mredkj.com

var listed = true;
var table = document.getElementsByTagName('table')[0];
var td = table.getElementsByTagName('td');
if(td[2].innerHTML.indexOf("does not")>-1 || td[2].innerHTML.indexOf("No user")>-1) {
	listed = false;
	td[2].rowSpan = "27";
}
var skillLevel = [1,1,1,10,1,1,1,1];
var skillXP = [0,0,0,1154,0,0,0,0];
var skillName = ['Attack','Defence','Strength','Hitpoints','Ranged','Prayer','Magic','Summoning'];
for(i=0;i<td.length;i++) {
	if(td[i].className=="alL") {
		for(i2=0;i2<8;i2++) {
			if(td[i].innerHTML.indexOf(skillName[i2]+"\n</a>")>-1) {
				skillLevel[i2] = parseInt(td[i+2].innerHTML.replace(new RegExp(/,/g), ""));
				skillXP[i2] = parseInt(td[i+3].innerHTML.replace(new RegExp(/,/g), ""));
			}
		}
	}
}
var base = [(skillLevel[1] + skillLevel[3] + Math.floor(skillLevel[5] / 2)) * 0.25,(skillLevel[1] + skillLevel[3] + Math.floor(skillLevel[5] / 2) + Math.floor(skillLevel[7] / 2)) * 0.25];
var melee = (skillLevel[0] + skillLevel[2]) * 0.325;
var ranger = Math.floor(skillLevel[4] * 1.5) * 0.325;
var mage = Math.floor(skillLevel[6] * 1.5) * 0.325;
var combatLevel = [Math.floor(base[0] + Math.max(melee, ranger, mage)),Math.floor(base[1] + Math.max(melee, ranger, mage))];
var combatXP = [0,0];
for(i=0;i<skillXP.length;i++) {
	combatXP[0] = combatXP[0] + skillXP[i];
}
combatXP[1] = combatXP[0];
combatXP[0] = combatXP[0] - skillXP[7];
var combatPercent = [Math.round((combatXP[0] / 1400000000) * 10000) / 100 +'%',Math.round((combatXP[1] / 1600000000) * 10000) / 100 +'%'];
combatXP = [addCommas(combatXP[0]),addCommas(combatXP[1])];
var tablehtml = table.innerHTML.replace('class="row rowp1"','class="row" bgcolor="#705B32"');
var index = tablehtml.indexOf('<tr class="row rowp2">');
var line = '<tr class="row" bgcolor="#604E2D">\n<td align="center">\n<img class="miniimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPEAYAAAC945NsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dE////////CVj33AAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAl2cEFnAAAAEAAAAA8AkZyjXQAAAs1JREFUOMutVc9LMlEUPeOMDqJlNS0CdWG6MMwsXLRwaa0iCAxa6KJN0MK9f4NEO/8EjYKEIFqFbUQ3Zj/UQROHDHU3LRTc1Mj7FvJ4fdoQ8X0Hhpm5955z3tz7HgMAAAihd57neZ5n7/gv0Nfn6EMikUgkEoySSqVSqRQwHA6HwyGNctxvjS0Wi8ViAeLxeDweZ5lkMplMJgEDDaiqqqoqK6AESZIkSZr8kp+NKW/SeNKHmyRGo9FoNAo4HA6Hw8Ey6XQ6nU4DvV6v1+vpdYQQu91ut9uBWCwWi8VYptvtdrtdIJPJZDIZxtdpKSGRSCQSiQAej8fj8QA8D2gacHFxeXl1BSiKoigKY7jdbrfbDRwc7O/v7QGjESAIQKvVarVaQDabzWaz0ws3fL8AjqOEWq1Wq9XGYprGDCh8Pp/P52NxWkd5esY6I9CfaTgcDofDQC6Xy+VyQDAYDAaDQCi0ubmxAZjNomgyAff3lcrLC6vTM/7lAthCQqFQKBQC/H6vd3kZMBqNRkEAHh6q1WYTKBQKhULhZ2MKgT6srLhckjS9y+v119f3d4B2wOlcWpqbY8bFYqlUqQDlcrlcLrO6cQcIGetOG491ueldvLOzu2s0fp2x16tpAMcJwvo60O+raiAA5PPFYqkEyLIsyzJwfHx0dHgI2GyLi8/PACGa9vQEyHKjIQhM7+bm+vrzk3VoahM2GvX6aASsrq6tCQKwvb21ZTAAgYDfX60Ct7d3d/k8M6agcVpHeVSH6uqOgGJhwWx2uYBm8/GR5wGbbXb27Y3l/z5+rIPjOCHtdqcjikC73ekAYx2nc6w7GgGKMr4oDHNzMzOiyGY/P2+zWa3AcDgYmM3A6enJyccH0O8PBgadQ/sVtI7yqA7VpZjwJeT8/OzMYCBEFE0mQWB3mrdardavP5Xv7afr6M+H6lGfCR1CTCaT6WeDf8W0zx900ohoTcGl/wAAAABJRU5ErkJggg==">\n</td>\n<td class="alL">\n\nNormal Combat\n</td>\n<td class="alL">'+combatPercent[0]+'</td>\n\n<td class="alL">'+combatLevel[0]+'</td>\n<td class="alL">'+combatXP[0]+'</td>\n</tr>\n<tr class="row rowp1">\n<td align="center">\n<img class="miniimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPEAYAAAC945NsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dE////////CVj33AAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAl2cEFnAAAAEAAAAA8AkZyjXQAAAs1JREFUOMutVc9LMlEUPeOMDqJlNS0CdWG6MMwsXLRwaa0iCAxa6KJN0MK9f4NEO/8EjYKEIFqFbUQ3Zj/UQROHDHU3LRTc1Mj7FvJ4fdoQ8X0Hhpm5955z3tz7HgMAAAihd57neZ5n7/gv0Nfn6EMikUgkEoySSqVSqRQwHA6HwyGNctxvjS0Wi8ViAeLxeDweZ5lkMplMJgEDDaiqqqoqK6AESZIkSZr8kp+NKW/SeNKHmyRGo9FoNAo4HA6Hw8Ey6XQ6nU4DvV6v1+vpdYQQu91ut9uBWCwWi8VYptvtdrtdIJPJZDIZxtdpKSGRSCQSiQAej8fj8QA8D2gacHFxeXl1BSiKoigKY7jdbrfbDRwc7O/v7QGjESAIQKvVarVaQDabzWaz0ws3fL8AjqOEWq1Wq9XGYprGDCh8Pp/P52NxWkd5esY6I9CfaTgcDofDQC6Xy+VyQDAYDAaDQCi0ubmxAZjNomgyAff3lcrLC6vTM/7lAthCQqFQKBQC/H6vd3kZMBqNRkEAHh6q1WYTKBQKhULhZ2MKgT6srLhckjS9y+v119f3d4B2wOlcWpqbY8bFYqlUqQDlcrlcLrO6cQcIGetOG491ueldvLOzu2s0fp2x16tpAMcJwvo60O+raiAA5PPFYqkEyLIsyzJwfHx0dHgI2GyLi8/PACGa9vQEyHKjIQhM7+bm+vrzk3VoahM2GvX6aASsrq6tCQKwvb21ZTAAgYDfX60Ct7d3d/k8M6agcVpHeVSH6uqOgGJhwWx2uYBm8/GR5wGbbXb27Y3l/z5+rIPjOCHtdqcjikC73ekAYx2nc6w7GgGKMr4oDHNzMzOiyGY/P2+zWa3AcDgYmM3A6enJyccH0O8PBgadQ/sVtI7yqA7VpZjwJeT8/OzMYCBEFE0mQWB3mrdardavP5Xv7afr6M+H6lGfCR1CTCaT6WeDf8W0zx900ohoTcGl/wAAAABJRU5ErkJggg==">\n</td>\n<td class="alL">\n\nSummon Combat\n</td>\n<td class="alL">'+combatPercent[1]+'</td>\n\n<td class="alL">'+combatLevel[1]+'</td>\n<td class="alL">'+combatXP[1]+'</td>\n</tr>\n';
if(!listed) {
	line = '<tr class="row" bgcolor="#604E2D">\n<td align="center">\n<img class="miniimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPEAYAAAC945NsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dE////////CVj33AAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAl2cEFnAAAAEAAAAA8AkZyjXQAAAs1JREFUOMutVc9LMlEUPeOMDqJlNS0CdWG6MMwsXLRwaa0iCAxa6KJN0MK9f4NEO/8EjYKEIFqFbUQ3Zj/UQROHDHU3LRTc1Mj7FvJ4fdoQ8X0Hhpm5955z3tz7HgMAAAihd57neZ5n7/gv0Nfn6EMikUgkEoySSqVSqRQwHA6HwyGNctxvjS0Wi8ViAeLxeDweZ5lkMplMJgEDDaiqqqoqK6AESZIkSZr8kp+NKW/SeNKHmyRGo9FoNAo4HA6Hw8Ey6XQ6nU4DvV6v1+vpdYQQu91ut9uBWCwWi8VYptvtdrtdIJPJZDIZxtdpKSGRSCQSiQAej8fj8QA8D2gacHFxeXl1BSiKoigKY7jdbrfbDRwc7O/v7QGjESAIQKvVarVaQDabzWaz0ws3fL8AjqOEWq1Wq9XGYprGDCh8Pp/P52NxWkd5esY6I9CfaTgcDofDQC6Xy+VyQDAYDAaDQCi0ubmxAZjNomgyAff3lcrLC6vTM/7lAthCQqFQKBQC/H6vd3kZMBqNRkEAHh6q1WYTKBQKhULhZ2MKgT6srLhckjS9y+v119f3d4B2wOlcWpqbY8bFYqlUqQDlcrlcLrO6cQcIGetOG491ueldvLOzu2s0fp2x16tpAMcJwvo60O+raiAA5PPFYqkEyLIsyzJwfHx0dHgI2GyLi8/PACGa9vQEyHKjIQhM7+bm+vrzk3VoahM2GvX6aASsrq6tCQKwvb21ZTAAgYDfX60Ct7d3d/k8M6agcVpHeVSH6uqOgGJhwWx2uYBm8/GR5wGbbXb27Y3l/z5+rIPjOCHtdqcjikC73ekAYx2nc6w7GgGKMr4oDHNzMzOiyGY/P2+zWa3AcDgYmM3A6enJyccH0O8PBgadQ/sVtI7yqA7VpZjwJeT8/OzMYCBEFE0mQWB3mrdardavP5Xv7afr6M+H6lGfCR1CTCaT6WeDf8W0zx900ohoTcGl/wAAAABJRU5ErkJggg==">\n</td>\n<td>\n\nNormal Combat\n</td>\n</tr>\n<tr class="row rowp1">\n<td align="center">\n<img class="miniimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPEAYAAAC945NsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dE////////CVj33AAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAl2cEFnAAAAEAAAAA8AkZyjXQAAAs1JREFUOMutVc9LMlEUPeOMDqJlNS0CdWG6MMwsXLRwaa0iCAxa6KJN0MK9f4NEO/8EjYKEIFqFbUQ3Zj/UQROHDHU3LRTc1Mj7FvJ4fdoQ8X0Hhpm5955z3tz7HgMAAAihd57neZ5n7/gv0Nfn6EMikUgkEoySSqVSqRQwHA6HwyGNctxvjS0Wi8ViAeLxeDweZ5lkMplMJgEDDaiqqqoqK6AESZIkSZr8kp+NKW/SeNKHmyRGo9FoNAo4HA6Hw8Ey6XQ6nU4DvV6v1+vpdYQQu91ut9uBWCwWi8VYptvtdrtdIJPJZDIZxtdpKSGRSCQSiQAej8fj8QA8D2gacHFxeXl1BSiKoigKY7jdbrfbDRwc7O/v7QGjESAIQKvVarVaQDabzWaz0ws3fL8AjqOEWq1Wq9XGYprGDCh8Pp/P52NxWkd5esY6I9CfaTgcDofDQC6Xy+VyQDAYDAaDQCi0ubmxAZjNomgyAff3lcrLC6vTM/7lAthCQqFQKBQC/H6vd3kZMBqNRkEAHh6q1WYTKBQKhULhZ2MKgT6srLhckjS9y+v119f3d4B2wOlcWpqbY8bFYqlUqQDlcrlcLrO6cQcIGetOG491ueldvLOzu2s0fp2x16tpAMcJwvo60O+raiAA5PPFYqkEyLIsyzJwfHx0dHgI2GyLi8/PACGa9vQEyHKjIQhM7+bm+vrzk3VoahM2GvX6aASsrq6tCQKwvb21ZTAAgYDfX60Ct7d3d/k8M6agcVpHeVSH6uqOgGJhwWx2uYBm8/GR5wGbbXb27Y3l/z5+rIPjOCHtdqcjikC73ekAYx2nc6w7GgGKMr4oDHNzMzOiyGY/P2+zWa3AcDgYmM3A6enJyccH0O8PBgadQ/sVtI7yqA7VpZjwJeT8/OzMYCBEFE0mQWB3mrdardavP5Xv7afr6M+H6lGfCR1CTCaT6WeDf8W0zx900ohoTcGl/wAAAABJRU5ErkJggg==">\n</td>\n<td>\n\nSummon Combat\n</td>\n</tr>\n';
}
tablehtml = tablehtml.substring(0, index) + line + tablehtml.substring(index, tablehtml.length);
table.innerHTML = tablehtml;
var box = document.getElementsByClassName('brown_box')[1];
if(!listed) {
	box.innerHTML = box.innerHTML + '&nbsp;\n<br />\n<div class="brown_box">\n<div align="center">\nRS - Advanced Hiscores\n<br />\nUserscript by frostedfreeze@gmail.com</div>';
} else {
	box.innerHTML = box.innerHTML + '&nbsp;\n</div>\n<br />\n<div class="brown_box">\n<div align="center">\nRS - Advanced Hiscores\n<br />\nUserscript by frostedfreeze@gmail.com\n</div>\n<br />\n<div align="left">\nCombat Formula:\n<br />\nFormula version 4.0\n<br />\nCreated by MaxWaterman\n<br />\nFormula by MaxWaterman, Fern1970, Helcaterian,\n<br />\nOblivion590, Hans980 and Benmarchant.\n<br />\nReproduction without this comment is prohibited.<br />\n<br />\naddCommas function made by mredkj.com\n<br />\n<br />\nNote: If the stat is not ranked, it will be assumed that the level is 1 and the XP is 0 (with the exception of HP).\n<br />\n<br />\nNote: The rank of Summoning and Normal combat is the percentage of the combat XP the player has out of the maximum combat XP the player can reach.</div>';
}
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}