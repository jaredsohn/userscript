// ==UserScript==
// @name           YouTube Link To Embedded Videos
// @namespace      http://userscripts.org/users/23652
// @description    Creates links under embedded youtube videos and shows thumbnails when hovered over
// @include        http://*.*/*
// @include        https://*.*/*
// @copyright      JoeSimmons
// @version        1.0.6
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==

var ems = document.evaluate("//embed[contains(@src, 'youtube.com/v/')]", document, null, 6, null),
	idRE = /com\/v\/([^&]+)/;

function thumb(id) {
	var pre = 'http://i2.ytimg.com/vi/',
		thumbs = new Array(pre+id+'/1.jpg', pre+id+'/2.jpg', pre+id+'/3.jpg', pre+id+'/default.jpg');
	return thumbs;
}

function show(e) {
	var info = document.getElementById(e.target.id.substring(2));
	if(info) info.style.display = '';
}

function hide(e) {
	var info = document.getElementById(e.target.id.substring(2));
	if(info) info.style.display = 'none';
}

for(var i=0,e; (e=ems.snapshotItem(i)); i++) {
id = (e.src.match(idRE)||"")[1];
if(id=="") return;
var thumbs = thumb(id),
	info = document.createElement('div');
info.innerHTML = "<img src=\""+thumbs[0]+"\"><img src=\""+thumbs[1]+"\"><img src=\""+thumbs[2]+"\">";
info.id = 'v_'+id;
info.setAttribute('style', 'display: none;');
var a = document.createElement('a');
a.textContent = 'View above video';
a.setAttribute('style', 'font-size: 12px; font-family: arial, verdana, sans-serif;');
a.target = '_blank';
a.href = 'http://www.youtube.com/watch?v='+id;
a.id = 'a_v_'+id;
/*
a.addEventListener('mouseover', show, false);
a.addEventListener('mouseout', hide, false);
a.addEventListener('click', hide, false);
*/

e.parentNode.insertBefore(document.createElement('br'), e.nextSibling);
e.parentNode.insertBefore(a, e.nextSibling.nextSibling);
e.parentNode.insertBefore(info, e.nextSibling.nextSibling.nextSibling);
}