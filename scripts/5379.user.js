// ==UserScript==
// @name	TranslateTag
// @namespace	http://serprest.pt/flickr/#TranslateTag
// @description Helps to translate a Tag to multi-languages  using logo quotes diccionary (http://www.logosdictionary.org/)
// @description see more info here http://www.flickr.com/groups/userscripts/discuss/72157594255025569/
// @version        0.1.0
// @identifier	http://serprest.pt/Greasemonkey/flickr/translateTag.user.js
// @date           2006-08-28
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
    addT: function ()
    {
    	var node = document.getElementById ('thetags');
	if(!node) return;
    	var nodes = node.getElementsByTagName('div');
	if(!nodes) return;
	var tags = new Array();
	for (var i = 0; i < nodes.length; i++){
		var ref = nodes[i].getElementsByTagName('a')[1];
		if (!ref) continue;
		var val = ref.firstChild.nodeValue;
		var newnode = document.createElement('span');
		newnode.innerHTML = '[<a href="http://www.logosdictionary.org/pls/dictionary/new_dictionary.gdic.main?word=' + val + '">T</a>] ';
		ref.parentNode.insertBefore(newnode,ref);
	}
    }
}

window.addEventListener (
	'load', 
	function (e) {
		sortTagsAndGroupList.addT ();
	}, 
	false
);
