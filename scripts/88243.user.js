// ==UserScript==
// @name		Invisible.ir Images Grabber by Nabi K.A.Z.
// @namespace	http://userscripts.org/users/126399
// @description	You can grab and save images of profile pages of the invisible.ir site!
// @version	1.0
// @date		2010-10-17
// @author		Nabi KaramAlizadeh (from Iran)
// @homepage	http://Nabi.ir/
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html 
// @include	http://*invisible.ir/*
// ==/UserScript==

var imgSave = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAICAMAAABJcsbZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF5wAA////rpi05wAAAEVJREFUeNqEjwEKACAIA+f/Px3o3BDBBhU5vRZAxaW2v11JQl1yiHut8RTMa9vHYpGIwYpqgHLZZlEsFUagcFbr/OMTYAB9DgDNysXSiQAAAABJRU5ErkJggg==';
var els = document.getElementsByTagName('div');
var elsLen = els.length;
var pattern = new RegExp("(^|\\s)(displayimage|profileimage)(\\s|$)");
for (i=0; i<elsLen; i++) {
	if ( pattern.test(els[i].className) ) {
		var url = /^url\(\"(.*)\"\)$/i.exec(els[i].style.backgroundImage)[1];
		var a = document.createElement('a');
		a.href = url;
		a.target = '_blank';
		a.title = 'Save as...';
		a.style.display = 'block';
		a.style.textAlign = 'center';
		a.innerHTML = '<img src="'+imgSave+'" alt="Save as..." style="width:37px;height:8px;" />';
		els[i].appendChild(a);
	}
}
