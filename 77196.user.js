// ==UserScript==
// @name          Show hidden user photos in Vkontakte
// @namespace
// @description   Показывает фото пользователей, запретивших это в настройках
// @include       http://vkontakte.ru/search.php?id=*
// ==/UserScript==

(function(){
//	http://kosiakk.livejournal.com/profile
//  http://vkontakte.ru/id88750

	var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search", "photos"));
	a.appendChild(document.createTextNode("| show photos |"));
	document.getElementById("searchResults").appendChild(a);
	
	var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search", "friend"));
	a.appendChild(document.createTextNode("| show friend |"));
	document.getElementById("searchResults").appendChild(a);
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search", "video"));
	a.appendChild(document.createTextNode("| show video |"));
	document.getElementById("searchResults").appendChild(a);
	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search", "audio"));
	a.appendChild(document.createTextNode("| show audio |"));
	document.getElementById("searchResults").appendChild(a);
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search", "notes"));
	a.appendChild(document.createTextNode("| show notes |"));
	document.getElementById("searchResults").appendChild(a);	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search", "groups"));
	a.appendChild(document.createTextNode("| show groups |"));
	document.getElementById("searchResults").appendChild(a);	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search", "opinions"));
	a.appendChild(document.createTextNode("| show opinions |"));
	document.getElementById("searchResults").appendChild(a);	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search.php?", "apps.php?m"));
	a.appendChild(document.createTextNode("| show apps |"));
	document.getElementById("searchResults").appendChild(a);	
	
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search.php?", "photos.php?act=user&"));
	a.appendChild(document.createTextNode("| show photo with |"));
	document.getElementById("searchResults").appendChild(a);
	
		var a = document.createElement("a");
	a.setAttribute("href", document.URL.replace("search.php?", "video.php?act=tagview&"));
	a.appendChild(document.createTextNode("| show video with |"));
	document.getElementById("searchResults").appendChild(a);
	
	
})()
