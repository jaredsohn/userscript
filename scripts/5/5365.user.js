// ==UserScript==
// @name	SortTagsAndGroupList
// @namespace	http://serprest.pt/flickr/#flickrSortTagsAndGroups
// @description Sort Tags and Groups/Sets when a picture is showed
// @description see how to install here TBD
// @version        0.1.0
// @identifier	http://serprest.pt/Greasemonkey/flickr/flickrSortTagsAndGroups.user.js
// @date           2006-08-27
// @creator        Isidro Vila Verde (jvv@fe.up.pt)
// @include http://*flickr.com/photos/*/*
// ==/UserScript==
// Copyright (C) 2006 Isidro Vila Verde
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

sortTagsAndGroupList = {
    mysort: function(a,b){
	if (a.name.match(/\(Set\)/i) && !b.name.match(/(Set)/)) return -1;
	if (b.name.match(/\(Set\)/i) && !a.name.match(/(Set)/)) return 1;
	if (a.name > b.name) return 1;	
	if (b.name > a.name) return -1;	
	return 0;	
    },
    tags: function ()
    {
    	var node = document.getElementById ('thetags');
	if(!node) return;
    	var nodes = node.getElementsByTagName('div');
	var tags = new Array();
	for (var i = 0; i < nodes.length; i++){
		var name = nodes[i].getElementsByTagName('a')[0].href;
		var obj = new Object();
		obj.name = name;
		obj.value = nodes[i];
		tags[i] = obj;
	}
	tags.sort(sortTagsAndGroupList.mysort);
	for (var i = 0; i < tags.length; i++){
		var obj = tags[i];
		if (!obj) continue;
		node.appendChild(obj.value);
	}
    },
    groups: function ()
    {
    	var node = document.getElementById ('otherContexts_div');
	if(!node) return;
    	var nodes = node.getElementsByTagName('div');
	var tags = new Array();
	for (var i = 0; i < nodes.length; i++){
		if (nodes[i].className !== 'contextDiv') continue;
		var elem = nodes[i].getElementsByTagName('a')[0];
		if (!elem) continue;
		var text = elem.firstChild.nodeValue; 
		text = text.replace(/\W+/,'');
		text = text.toLowerCase();
		var obj = new Object();
		obj.name = text;
		obj.value = nodes[i];
		tags[i] = obj;
	}
	tags.sort(sortTagsAndGroupList.mysort);
	for (var i = 0; i < tags.length; i++){
		var obj = tags[i];
		if (!obj) continue;
		node.appendChild(obj.value);
	}
    }
}

window.addEventListener (
	'load', 
	function (e) {
		sortTagsAndGroupList.tags ();
		sortTagsAndGroupList.groups ();
	}, 
	false
);
