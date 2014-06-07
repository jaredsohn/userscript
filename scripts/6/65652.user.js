// ==UserScript==
// @name Permanent sublepras links in navigation panel
// @description Ссылки на подлепры не пропадают из навигационной панели.
// @include http://*leprosorium.ru*
// @namespace http://*leprosorium.ru*
// ==/UserScript==

function findInArray(arr, href){
	for(var j = 0, n = arr.length; j < n; j += 1){
		if(arr[j].href === href){
			return true;
		}
	}
	return false;
}

var your_sublepras = document.querySelectorAll(".subs_loaded .sub a[class='link']")
var sublepras_in_navthing = document.querySelectorAll("#domains_unread a[href*='http']");
var navthing = document.getElementById("domains_unread");


for(var i = 0, l = your_sublepras.length; i < l; i += 1){
	if(!findInArray(sublepras_in_navthing, your_sublepras[i].href)){
		var p = document.createElement("p");
		var a = document.createElement("a");

		a.href = your_sublepras[i].href;
		a.innerHTML = your_sublepras[i].innerHTML.substr(0,  your_sublepras[i].innerHTML.indexOf("."));
		p.appendChild(a);
		navthing.appendChild(p);		
	}
}
