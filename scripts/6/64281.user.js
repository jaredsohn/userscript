// ==UserScript==
// @name           CPS public forum notifier
// @namespace      http://krtek.net/gs/cps-forum/
// @description    Shows floating div on public CPS forums
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
// @version        1.0
// @require        http://krtek.net/gs/updater.js?id=64281
// @require        http://krtek.net/jquery.js
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

notifierCss = '\n'
	+ '#notifier {\n'
	+ '	position: fixed;\n'
	+ '	background: #FFBBBB;\n'
	+ '	top: 10px;\n'
	+ '	left: 20%;\n'
	+ '	width: 60%;\n'
	+ '	height: 30px;\n'
	+ '	line-height: 30px;\n'
	+ '	font-size: 18px;\n'
	+ '	text-align: center;\n'
	+ '	opacity: 0.9;\n'
	+ '}\n\n';

(notifierLoader = function() {
	var head, style;

	head = document.getElementsByTagName('head')[0];

	if (!head) {
		setTimeout("notifierLoader();", Math.random()*30000);
		return;
	}

	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = notifierCss;
	head.appendChild(style);
})();


window.addEventListener('load', function () {
	var img;

	if ($('#page-header .navbar .navlinks .icon-home a:first-child + strong + a').html() == 'Veřejné fórum') {
			body = document.getElementsByTagName('body')[0];
			div = document.createElement('div');
			$(div).attr('id', 'notifier');
			div.innerHTML = '!!! Toto je veřejné fórum !!!';
			body.appendChild(div);
	}
}, true);
