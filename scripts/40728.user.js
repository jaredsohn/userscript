// ==UserScript==
// @name           vkontakte audio leecher mod for downthemall
// @namespace      http://vitman.name/
// @description    Adds a functionality to download music from website vkontakte.ru (Mod for DownThemAll).
// @include        http://vkontakte.ru/*
// ==/UserScript==

function trim(str) {
    return str.replace(/\"/g, "");
}


function extend(img) {
	var str=img.wrappedJSObject.onclick.toString();
	var arr=/operate\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/(str);
	var td=img.parentNode;
	var tr=td.parentNode;

	var title_a=tr.getElementsByTagName('td')[1].getElementsByTagName('b')[0].innerHTML;
	var title_t=tr.getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;
	var title = title_a+" - "+title_t;
	title = trim(title);

	var cell=document.createElement("td");
	var link=document.createElement("a");
	link.setAttribute("title",title);
	link.setAttribute("alt",title);
	link.setAttribute("href","http://cs"+arr[2]+".vkontakte.ru/u"+arr[3]+"/audio/"+arr[4]+".mp3");
	link.innerHTML="<img alt=\""+title+"\" src=\"http://img133.imageshack.us/img133/1976/dlpo8.gif\">";
	tr.appendChild(cell);
	cell.appendChild(link);
}

var allImgs=document.getElementsByTagName("img");

for (var i=0;i<allImgs.length;i++) {
	if (allImgs[i].className=="playimg") {
		extend(allImgs[i]);
	}
}