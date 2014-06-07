// ==UserScript==
// @name           vkontakte audio leecher
// @namespace      http://vkontakte.ru/
// @description    Adds a functionality to download music from website vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==


function extend(img) {
	var str = img.wrappedJSObject.onclick.toString();
	var mp3link = '';	
	var arr=/operate.*?(http\:\/\/.*?\.mp3)/ (str);
	if (arr==null) {
		arr=/operate.*?(\d+?)\,.+?(\d+?)\,.+?(\d+)\,(.+?)\,.+?(\d+?)/ (str);
		if (arr!=null) {
			var filename=arr[4];
			filename = filename.replace('"', '');
			filename = filename.replace(' ', '');
			filename = filename.slice(0, filename.length-1);
			mp3link = 'http://cs'+arr[2]+'.vkontakte.ru/u'+arr[3]+'/audio/'+filename+'.mp3';
		}
	} else {
		mp3link = arr[1];
	}	
	if ( mp3link != '' ) {		
		var td=img.parentNode;
		var tr=td.parentNode;
		var cell=document.createElement("td");
		var link=document.createElement("a");
		link.setAttribute("title","Download this file");
		link.setAttribute("href", mp3link);
		
		link.innerHTML="<img src=\"http://img133.imageshack.us/img133/1976/dlpo8.gif\">";
		tr.appendChild(cell);
		cell.appendChild(link);
	}
}

var allImgs=document.getElementsByTagName("img");
for (var i=0;i<allImgs.length;i++) {
	if (allImgs[i].className=="playimg") {
		extend(allImgs[i]);
	}
}
