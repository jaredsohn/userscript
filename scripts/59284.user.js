// ==UserScript==
// @name           Oldschool CPS Forum theme
// @namespace      http://krtek.net/gs/cps-forum/
// @description    CPS Forum theme fixups
// @include        https://www.ceskapiratskastrana.cz/forum
// @include        https://www.ceskapiratskastrana.cz/forum/
// @include        https://www.ceskapiratskastrana.cz/forum/index.php*
// @include        https://www.ceskapiratskastrana.cz/forum/viewtopic.php*
// @include        https://www.ceskapiratskastrana.cz/forum/viewforum.php*
// @include        https://www.ceskapiratskastrana.cz/forum/posting.php*
// @include        https://www.ceskapiratskastrana.cz/forum/search.php*
// @include        https://www.ceskapiratskastrana.cz/forum/ucp.php*
// @include        https://www.ceskapiratskastrana.cz/forum/mcp.php*
// @include        https://www.ceskapiratskastrana.cz/forum/viewonline.php*
// @include        https://www.ceskapiratskastrana.cz/forum/memberlist.php*
// @include        https://www.ceskapiratskastrana.cz/forum/faq.php*
// @version        2.0
// @require        http://krtek.net/gs/updater.js?id=59284
// ==/UserScript==


//    Copyright 2009 Lukas -krtek.net- Novy <pirat@neasy.cz>
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

oldschoolCss = '\n'
	+ 'ul.linklist li {\n'
	+ '	font-size: 1.1em !important;\n'
	+ '	font-weight: normal !important;\n'
	+ '}\n'
	+ 'ul.navlinks li {\n'
	+ '	font-weight: bold !important;\n'
	+ '}\n'
	+ '#site-description h1, #site-description p {\n'
	+ '	display: none;\n'
	+ '}\n\n';

(oldschoolLoader = function() {
	var head, style;

	head = document.getElementsByTagName('head')[0];

	if (!head) {
		setTimeout("oldschoolLoader();", Math.random()*30000);
		return;
	}

	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = oldschoolCss;
	head.appendChild(style);
})();


window.addEventListener('load', function () {
	var img;

	img = document.getElementById('logo').childNodes[0];
	img.src='https://www.ceskapiratskastrana.cz/media/grafika/forum/cps_forum_banner.png';
	img.width = 380;
	img.height = 70;

}, true);
