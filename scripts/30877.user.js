// ==UserScript==
// @name TSU of Travian3
// @author Vincente Tsou
// @include http://*.travian*.*/karte.php*
// @version	0.1
// @description add TSU link
// ==/UserScript==

//identify server
var sr = document.title.split(' ')[1];

//parse user
var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++){
	if(links[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {	//User
		var a = RegExp.$1;
		if (a == 0) continue;
		if (links[i].parentNode.className == 'menu') continue;
				
		var tsu = document.createElement('a');
		tsu.innerHTML = " <img src='http://travian-utils.com/favicon.ico' width=14 height=14> ";
		tsu.target = '_blank';
		tsu.href = 'http://travian-utils.com/?s=' + sr +'&idu=' + a;
		links[i].parentNode.insertBefore(tsu, links[i].nextSibling);
/*				
	} else if (links[i].href.search(/karte.php\?d=(\d+)/) > 0){	//Village
		var a = RegExp.$1;

		var tsu = document.createElement('a');
		tsu.innerHTML = " <img src='http://travian-utils.com/favicon.ico' width=14 height=14> ";
		tsu.target = '_blank';
		tsu.href = 'http://travian-utils.com/?s=' + sr +'&idv=' + a;
		links[i].parentNode.insertBefore(tsu, links[i].nextSibling);
*/				
	} else if (links[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){	//Alliance
		var a = RegExp.$1;
		if (a == 0) continue;
				
		var tsu = document.createElement('a');
		tsu.innerHTML = " <img src='http://travian-utils.com/favicon.ico' width=14 height=14> ";
		tsu.target = '_blank';
		tsu.href = 'http://travian-utils.com/?s=' + sr +'&ida=' + a;
		links[i].parentNode.insertBefore(tsu, links[i].nextSibling);				
	}
}