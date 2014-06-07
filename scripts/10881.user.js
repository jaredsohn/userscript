// ==UserScript==
// @name           B3ta Bash Tags on Flickr
// @namespace      http://code.leekelleher.com/
// @description    This is a greasemonkey script that associates a Flickr page with a B3ta Bash. When a photo is associated to a bash (using a B3ta machine-tag, e.g. "b3ta:bash=7477"), a link will appear to the B3ta Event information page.
// @version        1.0
// @identifier	   http://code.leekelleher.com/greasemonkey/b3tabashflickrtags.user.js
// @date           2007-07-24
// @creator        Lee Kelleher (lee@vertino.net)
// @include        http://*flickr.com/photos/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2007 Lee Kelleher
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA

var getTags = document.getElementsByTagName('a');
var b3taTest = new RegExp("^b3ta:", "i");
var b3taTags = new Array();

// helping vars
var splitTag = new Array();
var splitValue = new Array();


// loop through all the machine-tags
for (var i = 0; i < getTags.length; i++)
{
	if (getTags[i].className == 'Plain')
	{
		if (b3taTest.test(getTags[i].innerHTML))
		{
			splitTag = getTags[i].innerHTML.split(":");
			splitValue = splitTag[1].split("=");
			b3taTags[splitValue[0]] = splitValue[1];
		}
	}
}

var b3ta_image = 'data:image/gif;base64,R0lGODlhLwAYAKIAAM7Oznp6epKSkv/78ICAgAAAAP///wAAACH5BAAAAAAALAAAAAAvABgAAAOE' +
'aLrc/jDKSau9OOvNu/9TUTyiQ5zKSSxqukoFYIi0OAAj874p2xs8SOyBM6FcOtcxMnQUG7vkLwqT' +
'OXO6Y8sH/DFlVgMYC/rOFrFnmSkACMRuQICsZPFaVFh7Fps/ooBSQWw4AX5/WluJSyGGh389eV2S' +
'ISURipFaXmucnZ6foKGioxcJADs=';

var b3ta_image_over = 'data:image/gif;base64,R0lGODlhLwAYALMAAM7Oznp6epKSkv/78MDAwJqampubmwAAAP///wAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAACH5BAAAAAAALAAAAAAvABgAAAS2EMlJq704I6O7/8UnjhRHnl6IrpjJvpM6HcdFW3SN5PO9' +
'6yXKAfDL0QYAoESnBDKXFdmSaEnifD/hkkeR7qgVa+U5K++gQSGYIhb6uGjyxDVFgIltWIX+PU/z' +
'ejFjAgACdoUAAUpbTo01chJeO4Q/iYtxfo9afoI4hAcBihhcRluMi5JLoaKjUJCanBJ8bpe0mKRo' +
'c4Ews7sjqb4fvcEpxCgFBsnIBcgGzczKztLR0M7P1tjTBBEAOw==';

if (b3taTags['bash'])
{
	imgB3ta = document.createElement('img');
	imgB3ta.setAttribute('src', b3ta_image);
	imgB3ta.setAttribute('onmouseover', 'javascript:this.src="' + b3ta_image_over + '";');
	imgB3ta.setAttribute('onmouseout', 'javascript:this.src="' + b3ta_image + '";');
	
	lnkB3ta = document.createElement('a');
	lnkB3ta.setAttribute('href', 'http://www.b3ta.com/calendar/event/' + b3taTags['bash']);
	lnkB3ta.setAttribute('target', '_blank');
	lnkB3ta.appendChild(imgB3ta);
	
	document.getElementById('button_bar').appendChild(lnkB3ta);
}