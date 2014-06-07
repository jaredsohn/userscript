// ==UserScript==
// @name          Who has befriended me on Digg?   
// @description   Adds a link to befriended list on Digg.
// @include       http://digg.com/users/*/friends/*/*
// @include       http://www.digg.com/users/*/friends/*/*
// ==/UserScript==

var diggs = document.getElementsByTagName('span');
for (i = 0; i < diggs.length; i++) {
	if (diggs[i].className == 'tool-set') {
		url = diggs[i].getElementsByTagName('a')[0].href;
		url = url.split("/");
		var a = document.createElement('a');
		a.href = "http://www.digg.com/users/" + url[4] + "/friends/befriended";
		a.innerHTML = "Befriended";
		a.className = "tool";
		a.target = "_blank";
                
diggs[i].insertBefore(a, diggs[i].getElementsByTagName('span')[0].nextSibling);
	}
}
