// ==UserScript==
// @name           Neopets : Random Events [BETA]
// @namespace      http://gm.wesley.eti.br
// @description    Loggs random events
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.1.1
// @language       en
// @include        http://www.neopets.com/*
// @exclude        http://www.neopets.com/ads/*
// @exclude        http://www.neopets.com/games/play_flash.phtml?*
// @exclude        http://www.neopets.com/neomail_block_check.phtml?*
// @exclude        http://www.neopets.com/iteminfo.phtml?*
// @exclude        http://www.neopets.com/~*
// @grant          GM_log
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// @grant          GM_getResourceText
// @grant          GM_xmlhttpRequest
// @icon           http://gm.wesley.eti.br/icon.php?desc=154364
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       random_events http://pastebin.com/download.php?i=839tCaQh
// @resource       randomEventsHtml http://pastebin.com/download.php?i=nPMWZeHY
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/154322.user.js
// @require        http://userscripts.org/scripts/source/154363.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        1.1.1 Added missing @icon
// @history        1.1.0 Added Includes Checker (due to the recent problems with userscripts.org)
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

RandomEvents.process({
	onload	: function (obj) {
		alert("Random events saved successfully");
	},
	onerror	: function (obj) {
		alert(obj.value);
	},
});