// ==UserScript==
// @name          Show hidden user photos in Vkontakte
// @namespace
// @description   РџРѕРєР°Р·С‹РІР°РµС‚ С„РѕС‚Рѕ РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№, Р·Р°РїСЂРµС‚РёРІС€РёС… СЌС‚Рѕ РІ РЅР°СЃС‚СЂРѕР№РєР°С…
// @include       http://vkontakte.ru/*
// ==/UserScript==

(function(){
//	http://kosiakk.livejournal.com/profile
//  http://vkontakte.ru/id88750

	var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "photos.php?id="));
	a.appendChild(document.createTextNode("| show photos |"));
	document.getElementById("pageLayout").appendChild(a);
	
	var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "friend.php?id="));
	a.appendChild(document.createTextNode("| show friend |"));
	document.getElementById("pageLayout").appendChild(a);
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "video.php?id="));
	a.appendChild(document.createTextNode("| show video |"));
	document.getElementById("pageLayout").appendChild(a);
	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "audio.php?id="));
	a.appendChild(document.createTextNode("| show audio |"));
	document.getElementById("pageLayout").appendChild(a);
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "notes.php?id="));
	a.appendChild(document.createTextNode("| show notes |"));
	document.getElementById("pageLayout").appendChild(a);	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "groups.php?id="));
	a.appendChild(document.createTextNode("| show groups |"));
	document.getElementById("pageLayout").appendChild(a);	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "opinions.php?id="));
	a.appendChild(document.createTextNode("| show opinions |"));
	document.getElementById("pageLayout").appendChild(a);	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "apps.php?m"));
	a.appendChild(document.createTextNode("| show apps |"));
	document.getElementById("pageLayout").appendChild(a);	
	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "photos.php?act=user&id="));
	a.appendChild(document.createTextNode("| show photo with |"));
	document.getElementById("pageLayout").appendChild(a);
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("id", "video.php?act=tagview&id="));
	a.appendChild(document.createTextNode("| show video with |"));
	document.getElementById("pageLayout").appendChild(a);
	
	
})()
