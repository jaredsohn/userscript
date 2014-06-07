// ==UserScript==
// @name        tumblr remove dashboard ads
// @namespace   http://www.tumblr.com
// @version     0.1
// @description remove sneaky ad posts from the tumblr dashboard
// @author      Nickel
// @copyright   2013, Nickel
// @include     http*://www.tumblr.com/dashboard*
// @downloadURL https://userscripts.org/scripts/source/170756.user.js
// @updateURL   https://userscripts.org/scripts/source/170756.meta.js
// ==/UserScript==
/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

var elm, i, j

elm = document.getElementsByClassName("post_avatar");

for(i=1; i<elm.length; i++ ) {      //start with 1 to skip own avatar
	menuitem =
	elm[i].getElementsByClassName("tumblelog_menu")[0]
	.getElementsByClassName("popover_menu")[0]
	.getElementsByClassName("popover_inner")[0]
	.getElementsByClassName("popover_menu_item");

	for(j=0; j<menuitem.length; j++  ) {
		if( menuitem[j].firstElementChild.classList.contains("follow") ) {
			tokill = elm[i].parentNode;
			tokill.parentNode.removeChild(tokill);
		}
	}
}
