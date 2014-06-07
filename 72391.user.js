// ==UserScript==
// @name           Google Maps - Show Coordinates by Menu
// @namespace      http://jsatt.blogspot.com
// @description    Get coordinates of center marker in Google Maps
// @include        http://maps.google.com/*
// ==/UserScript==
var lists = document.getElementsByTagName('ul');
for (i = 0; i < lists.length; i++) {
	console.log(lists[i]);
	if (lists[i].className == 'leaf-links' && lists[i].parentNode.id == 'links') {
 
		console.log('test');
		var sepLi = document.createElement('li');
		var sepImg = document.createElement('img');
		sepImg.className = "bar-icon-divider bar-divider";
		sepImg.src = "/intl/en_us/mapfiles/transparent.png";
		sepLi.appendChild(sepImg);

		var li = document.createElement('li');
		var a = document.createElement('a');
		var iconImg = document.createElement('img');
		var span = document.createElement('span');
		a.href = "javascript:void(prompt('',gApplication.getMap().getCenter())); ";
		a.id = "Coor";
		iconImg.className = "bar-icon-survey2";
		iconImg.src = "/intl/en_us/mapfiles/transparent.png";
		a.appendChild(iconImg);
		span.innerHTML = "Get Coordinates";
		a.appendChild(span);
		li.appendChild(a);

		lists[i].appendChild(sepLi);
		lists[i].appendChild(li);
		//cells[i].insertBefore(a, document.getElementById('link').nextSibling);
	}

}

function showCoords(){

prompt('',unsafeWindow.gApplication.getMap().getCenter());

}

GM_registerMenuCommand("Show Coordinates of the Center", showCoords, "s", "shift alt", "S");
