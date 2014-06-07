// ==UserScript==
// @name           Greasemungo Remember My Club
// @description    Popmundo: Remember the club selection for invites (2008-04-24)
// @namespace      kenmooda@gmail.com
// @include        http://www*.popmundo.com/Common/ConcertInvite.asp?ArtistID=*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Remember My Club
//    Copyright (C) 2007, 2008  Tommi Rautava
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
//
////////////////////////////////////////////////////////////////////////////////

var LOCALE_ID_NAME = "LocaleID";
var SELECTED_INDEX_KEY_POSTFIX = ".selectedIndex";


function changeHandler(event) {
    var target = event ? event.target : this;
    
    var index = target.selectedIndex;
    var name = target.name;
	GM_log(name +".selectedIndex => "+ index);
	GM_setValue(name + SELECTED_INDEX_KEY_POSTFIX, index);
	
	return true;
}


var localeId = document.getElementsByName(LOCALE_ID_NAME)[0];
GM_log(LOCALE_ID_NAME +" = "+ localeId);

if (localeId) {
	GM_log(LOCALE_ID_NAME +".options.length = "+ localeId.options.length);
	
	if (localeId.options.length > 1) {
		var index = GM_getValue(LOCALE_ID_NAME + SELECTED_INDEX_KEY_POSTFIX, 0);
		
		// Check that index is within the limits.
		if (index < localeId.options.length) {
			GM_log(LOCALE_ID_NAME +".selectedIndex <= "+ index);
			localeId.selectedIndex = index;
		}
		else {
			// The stored index is out of limits, reset to 0.
			index = 0;
			
			GM_log(LOCALE_ID_NAME +".selectedIndex => 0");
			GM_setValue(LOCALE_ID_NAME + SELECTED_INDEX_KEY_POSTFIX, 0);
		}		

		localeId.addEventListener("change", changeHandler, true);
		GM_log("'change' event listener registered");
	}
	else {
		GM_log("Single option, nothing to do.");
	}
}

//EOF