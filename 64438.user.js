var meta = <><![CDATA[
// ==UserScript==
// @name 		RATTE = Recovery of quests And The raT. yEs!
// @author		blablubbb
// @namespace 	T3
// @version 	0.1
// @description	Gives the opportytity to fulfil unfulfilled quests after the second village is built. Especially for those who love their rats!
// @source 		none, yet
// @identifier 	none, yet
// @copyright	© blablubbb
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License (This program is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS)
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
]]></>.toString();

/****************
* Thats my first userscript... I hope it will work and give me my rat! It did not. Probably because my starting village didn't existe anymore. But still I could contue with the quests.
* It will add a link to the questmaster even after founding a second village... the usually the questmaster just disappears :(
*****************/
var paragraphs = document.getElementById('side_info');
paragraphs.innerHTML += '<div id="anm" style="width: 120px; height: 140px; visibility: hidden;"></div><div id="qge"><img onclick="qst_handle();" src="dorf8-Dateien/x.gif" id="qgei" class="q_l3" title="Questmaster" alt="Questmaster"></div><script type="text/javascript">quest.number = -8;quest.last = 24;cache_preload = new Image();cache_preload.src = "img/x.gif";cache_preload.className = "allres";</script>'