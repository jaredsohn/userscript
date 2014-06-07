// Beth Tfiloh Cleaner
// version 3.0
// 10/31/2007

// ==UserScript==
// @name	  Beth Tfiloh Cleaner
// @description   Clean up the Beth Tfiloh Site
// @include       http://*btfiloh.org/podium/default.aspx
// @include       http://*btfiloh.org/podium/default.aspx?t=23218
// @include	  http://*bethtfiloh.com/podium/default.aspx
// @include	  http://*bethtfiloh.com/podium/default.aspx?t=23218
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2006 Gabe Gorelick
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You can download a copy of the GNU General Public License at <http://www.gnu.org/licenses/>.
END LICENSE BLOCK */

//get and insert "My Groups" before "Synagogue Renovation"
var groups = document.getElementById('cbhcb52698');
if (groups)
{
//remember to change the ID depending on what first content is
//because for some reason they constantly change it
        
        var before = document.getElementById('cbhcb139802');
	before.parentNode.insertBefore(groups, before);
}

var groupsb = document.getElementById('cbcb52698');
if (groupsb)
{
	before.parentNode.insertBefore(groupsb, before);
}