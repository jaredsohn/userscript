// ==UserScript==
// @name         forum.pirati.cz - Open Links in New Tab/Window as Default
// @namespace    http://krtek.net/gm/pirati-forum-wopen
// @version      1
// @description  Set all the links in posts on forum.pirati.cz to open in a new tab/window when clicked.
// @include      https://forum.pirati.cz/viewtopic.php?*
// @require      https://forum.pirati.cz/addons/jquery-1.7.2.min.js
// @copyheart    http://pir.at/krtek
// ==/UserScript==

//    Copyheart 2012 Lukas -krtek.net- Novy <lukas.novy@pirati.cz>
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function($){$('.postbody a').prop('target','_blank');})(jQuery);

