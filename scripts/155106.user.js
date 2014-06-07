// ==UserScript==
// @name           Caster.fm Chat
// @description    Providing some new properties and easier usage to Caster.fm chat panel.
// @namespace      http://userscripts.org/users/burak
// @version        0.0.3
// @author         burakkurkcu
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://*.caster.fm/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

$("#chatmessage").keypress(function(event) {
	if (event.which == 13 && $("#chatmessage").val() != "") {
 	 	$("#chatsubmit").click();
		$("#chatmessage").val("");
	}
});
