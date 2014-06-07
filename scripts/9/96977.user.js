// ==UserScript==
// @name			Turbofilm new message notifier
// @namespace		http://userscripts.org/scripts/show/96977
// @description		Makes new message presence more clear to user. Homepage: http://userscripts.org/scripts/show/96977
// @include			https://turbik.tv/*
// @include			https://turbik.com/*
// @include			https://turbik.net/*
// @version			0.1.1
// ==/UserScript==

var spanList = document.getElementsByTagName("span");
//var done = false;
for (var i = 0; i < spanList.length; i++) {
	var elem = spanList.item(i);
	var cl = elem.getAttribute("class");
	
	if (cl == "umenu") {
		var children = elem.getElementsByTagName("span");
	
		if (children.length > 1) {
			var ut = false;
			var bt = false;
			for (var k = 0; k < children.length; k++) {
				var child = children.item(k);
				var ccl = child.getAttribute("class");
				
				if (ccl == "uptext") {
					ut = child;
				}
				if (ccl == "botext") {
					bt = child;
				}
			}
			
			if (ut && bt && ut.innerHTML == "МОИ СООБЩЕНИЯ") {
				if (bt.innerHTML != "новых сообщений нет") {
					ut.setAttribute('style', 'color:red;');
					bt.setAttribute('style', 'color:red;');
					
					//alert("Новое сообщение!");
				}
				
				//done = true;
				break;
			}
		}
	}
}