// The West My Town Saloon
// version 0.0.1
// I did not make that. I just deleted some code at http://userscripts.org/scripts/show/51389 to make a script only for the saloon.
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West My Town Saloon
// @namespace      www.the-west.gr
// @description    Buildings Shortcut Icons for the west
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==


function addFooterIcon(mylink,idname) {
    var head, style;
    footer_menu_left = document.getElementById('footer_menu_left').childNodes[1];
    if (!footer_menu_left) {return;}
    var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
    footer_menu_left.appendChild(iconlink);
}
var $=unsafeWindow.$;

addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
addGlobalStyle('.homeless #footer_building_saloon {background-position:-111px 37px; cursor:default;}');


function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}

$('footer').getNext().getChildren()[0].setStyles({
'top':'0px',
'background-position':'0px 0px',
'height':'60px'
});
$('footer_menu_left').setStyle('top', '40px');
addEndDiv('\
	if (Character.home_town == null) {\
		var footer_menu_left = document.getElementById(\'footer_menu_left\');\
		footer_menu_left.setAttribute(\'class\',\'homeless\');\
	}\
;');