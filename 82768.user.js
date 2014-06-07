// ==UserScript==
// @name           derstandard-voting (modified)
// @namespace      http://userscripts.org/users/torotil
// @description    Repariert die Kommentarbewertung auf derstandard.at
// @author         Raphael Wegmann modified by Roman Zimmermann
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://derstandard.at/*
// @include        http://diestandard.at/*
// ==/UserScript==


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


scripts = document.getElementsByTagName('script');
forumjs = "http://" + window.location.host + "/js/Forum.js"

for (i = 0; i < scripts.length; i++) {
	if (scripts[i].src.substr(0, forumjs.length) == forumjs) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'http://github.com/torotil/userscripts/raw/master/derstandard_voting/voting.js';
		scripts[i].parentNode.insertBefore(script, scripts[i].nextSibling);
	}
}