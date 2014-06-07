// ==UserScript==
// @name			Turbofilm new message strong notifier
// @namespace		http://userscripts.org/scripts/show/96981
// @description		Makes new message presence more clear to user. Homepage: http://userscripts.org/scripts/show/96981
// @include			https://turbik.tv/*
// @include			https://turbik.com/*
// @include			https://turbik.net/*
// @version			0.3.1
// ==/UserScript==

/* Created by: Robert Nyman | http://robertnyman.com/ */
function removeHTMLTags(str){
	/* 
		This line is optional, it replaces escaped brackets with real ones, 
		i.e. < is replaced with < and > is replaced with >
	*/	
 	str = str.replace(/&(lt|gt);/g, function (strMatch, p1){
	 	return (p1 == "lt")? "<" : ">";
	});
	var strTagStrippedText = str.replace(/<\/?[^>]+(>|$)/g, "");
	return strTagStrippedText;
}

function getMessageNumber(msgStr) {
	msgStr = removeHTMLTags(msgStr);
	if (msgStr != "новых сообщений нет") {
		return parseInt(msgStr.substring(0, msgStr.search(/[^0-9]/g)));
	} else {
		return 0;
	}
}

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
					
					if (getMessageNumber(localStorage['notif_lastmsgtxt']) < getMessageNumber(bt.innerHTML)) {
						alert("Новое сообщение!");
					}
				}
				
				localStorage['notif_lastmsgtxt'] = bt.innerHTML;
				
				//done = true;
				break;
			}
		}
	}
}