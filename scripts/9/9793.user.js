// ==UserScript==
// @name           IMDb Tags on Flickr
// @namespace      http://code.leekelleher.com/
// @description    This is a greasemonkey script that associates a Flickr page with IMDb movie. When a photo is associated to a movie (using an IMDb machine-tag, e.g. "imdb:title=tt0107048"), a link will appear to the IMDb movie information page.
// @version        1.0.1
// @identifier	   http://code.leekelleher.com/greasemonkey/imdbtagsonflickr.user.js
// @date           2007-06-11
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
var imdbTest = new RegExp("^imdb:", "i");
var imdbTags = new Array();

// helping vars
var splitTag = new Array();
var splitValue = new Array();


// loop through all the machine-tags
for (var i = 0; i < getTags.length; i++)
{
	if (getTags[i].className == 'Plain')
	{
		if (imdbTest.test(getTags[i].innerHTML))
		{
			splitTag = getTags[i].innerHTML.split(":");
			splitValue = splitTag[1].split("=");
			imdbTags[splitValue[0]] = splitValue[1];
		}
	}
}

var imdb_image = 'data:image/gif;base64,R0lGODlhLgAYALMAAAkJCdLS0vj4+Pf39woKCn9/f9TU1NPT0////wAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAACH5BAAAAAAALAAAAAAuABgAAASXEMlJq7046827/2AojmRpnpSgqsM6vGgmHMZh00ZeC7E1' +
'HIEacBgYGni9CQ1wIBgAT4KNEDRQCgisBFvobjlBJoAAlUoBgOA1y+V+tRqa0yluGs6HtdudZW+A' +
'dAdiUk1OVhN8fVp7cTVCBlWPNnqIbItwGGlAj0I0QQRJFE40N0WOgqEVaGQEra1jAKmys7S1tre4' +
'ubohEQA7';

var imdb_image_over = 'data:image/gif;base64,R0lGODlhLgAYALMAAMDAwJqamgQEBJubm///AP/MAAAAAP/MZv///wAAAAAAAAAAAAAAAAAAAAAA' +
'AAAAACH5BAAAAAAALAAAAAAuABgAAASkEMlJq704h8y7n9snjlJInpyJrpXKviohz7T8YiZx7Hy/' +
'EzdLSFc4FI/G5AEYBEl2gkN0GpUWDxQDQivRGr5djaRInUqlgmJ26/WGuZcQ9GyuYyfu/Bveehbs' +
'AlF/VWtwbluIfE4IPVdXjXdveGxcYHESaUqOSWRNiwhVmj4Cnp+ggaipgaWmrCIurh6wsSm0IwO2' +
'r7kfAQO+v8DBwsPEwr0DABEAOw==';

if (imdbTags['title'])
{
	imgIMDb = document.createElement('img');
	imgIMDb.setAttribute('src', imdb_image);
	imgIMDb.setAttribute('onmouseover', 'javascript:this.src="' + imdb_image_over + '";');
	imgIMDb.setAttribute('onmouseout', 'javascript:this.src="' + imdb_image + '";');
	
	lnkIMDb = document.createElement('a');
	lnkIMDb.setAttribute('href', 'http://www.imdb.com/title/' + imdbTags['title'] + '/');
	lnkIMDb.setAttribute('target', '_blank');
	lnkIMDb.appendChild(imgIMDb);
	
	document.getElementById('button_bar').appendChild(lnkIMDb);
}