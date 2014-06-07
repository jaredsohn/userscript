// ==UserScript==
// @name AC娘自动点击
// @version 1.0
// @description AC娘自动点击
// @include http://www.acfun.tv/*   
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttp
// ==/UserScript==

var button = document.createElement("input");
button.type = "button";
button.value = "开始";
button.id = "bn";
button.style.cursor = "pointer";
button.style.position = "relative";
button.style.left = -150 + "px";
document.getElementById("block-avatar-header").appendChild(button);

var clock;
button.onclick = function (){
	button.value = (button.value == "开始")? "暂停":"开始";
	if (button.value == "暂停"){
		 clock  = setInterval( document.getElementById("avatar-header").click ,1);
	}if (button.value == "开始"){
		clearInterval(clock);
	}
	
};
