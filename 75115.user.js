// The West Fort Battle Alert
// version 1
// Copyright (C) 2010 Peter Ward (x.peter.ward.x@gmail.com)
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name				The West Fort Battle Alert
// @namespace		www.the-west.net
// @description		Alerts you to fort battles when you log in
// @include			http://*.the-west.*/game.php*
// ==/UserScript==


function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}

	addEndDiv('AjaxWindow.show("fort_overview");');
	addEndDiv('AjaxWindow.minimize("fort_overview");');

function main(){

	var forts = document.querySelectorAll( "div.fortOverviewBox span" );

	if (forts.length < 1){
		addEndDiv('AjaxWindow.close("fort_overview");');
		return;
	} else {
		if (forts.length == 1){
			alert("There is currently " + forts.length + " Fort Battle!");
			addEndDiv('AjaxWindow.close("fort_overview");');
			return;
		} else {
			alert("There are currently " + forts.length + " Fort Battles!");
			addEndDiv('AjaxWindow.close("fort_overview");');
			return;
		}
	}
}


window.setTimeout(main, 10000);