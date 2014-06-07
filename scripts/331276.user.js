// ==UserScript==
// @name     		Indie Gala Show Key
// @namespace		iFantz7E.GalaShowKey
// @version			0.3
// @description		Show your keys instantly
// @match      		http://www.indiegala.com/profile?user_id=*
// @match      		https://www.indiegala.com/profile?user_id=*
// @match      		http://www.indiegala.com/gift?gift_id=*
// @icon      		http://www.indiegala.com/favicon.ico
// @updateURL   	http://userscripts.org/scripts/source/331276.meta.js
// @downloadURL		https://userscripts.org/scripts/source/331276.user.js
// @run-at 			document-end
// @copyright		2014, 7-elephant
// ==/UserScript==

var as = document.querySelectorAll(".span-keys > a");
for (var i = 0; i < as.length; i++)
{
	as[i].style.display = "none";
}

as = document.querySelectorAll(".span-keys > div > a");
for (var i = 0; i < as.length; i++)
{
	as[i].style.display = "none";
}

var divs = document.querySelectorAll(".span-keys > div");
for (var i = 0; i < divs.length; i++)
{
	var key = divs[i].id;
	divs[i].style.display = "";
	//divs[i].innerHTML = "<strong>"+key+"</strong>";
}

var inputs = document.querySelectorAll(".span-keys > div > input");
for (var i = 0; i < inputs.length; i++)
{
	inputs[i].setAttribute("onclick","this.select();");
}