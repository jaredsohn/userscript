// ==UserScript==
// @id             talk.jandan.net-3d6733a6-53d8-496a-976b-4933f640e310@scriptish
// @name           煎蛋火星增强脚本
// @version        1.0.5
// @namespace      https://userscripts.org/users/447040
// @author         燃燒的盒子
// @developer	   燃燒的盒子
// @description    就是加了个搜索框而已...
// @include        http://talk.jandan.net/*
// @include        http://huox.in/*
// @run-at         document-end
// @homepage	   http://huox.in/profile/6605/%E7%87%83%E7%87%92%E7%9A%84%E7%9B%92%E5%AD%90
// ==/UserScript==
var searchBox,whoisonlinebox;
var ua = window.navigator.userAgent;
var script = document.createElement('script');
script.textContent = 'function gogogo(){var keywords = document.getElementById("sinputbox").value;window.open("http://huox.in/search?Search="+keywords);}';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script); 
searchBox = document.createElement ('div');
whoisonlinebox = document.getElementById('Panel');
if (whoisonlinebox) {
	whoisonlinebox.appendChild(searchBox);
	searchBox.innerHTML = '<div id="SearchBox" class="Box"><h4>搜索</h4><input id="sinputbox" type="text" /><input type="button" name="Submit" value="Go!" onclick="gogogo()"></div>';
}