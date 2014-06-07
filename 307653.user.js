// ==UserScript==
// @name        Добавляет ссылку "Статистика" в каждое сообщество вконтакте
// @namespace   vk.com/seopublic
// @include vk.com/*
// @include http://vk.com/*
// @include https://vk.com/*
// @version     1.0
// @grant       none

// ==/UserScript==
if (!document.getElementById("public_manage_page_link") && document.getElementById("group_narrow")){
//получени id сообщества
var divhref = document.getElementById("group_narrow");
var divhref2= divhref.getElementsByTagName('a')[0].href;
var a = divhref2.split('_')[0];
b = a.split('-')[1];
////////////////////////

if (document.getElementById("page_actions")){
//имеет ссылку упоминания или пригласить
if (document.getElementById("page_actions").getElementsByTagName('a')[0]) {
var divforlink2 = document.getElementById("page_actions");
var link_stat = document.createElement("div");
link_stat.setAttribute("style", "text-align:left");
link_stat.innerHTML = '<a href="http://vk.com/stats?gid='+b+'" target="_blank">Статистика</a>';
divforlink2.appendChild(link_stat);	
}
//не имеет ссылку упоминания или пригласить
if (!document.getElementById("page_actions").getElementsByTagName('a')[0]) {
var divforlink2 = document.getElementById("group_like_module");
var link_stat = document.createElement("div");
link_stat.setAttribute("style", "text-align:center");
link_stat.innerHTML = '<a href="http://vk.com/stats?gid='+b+'" target="_blank">Статистика</a>';
divforlink2.appendChild(link_stat);	
}}
// ссылки упоминания нет, подписан-неподписан
if (document.getElementById("share_page_link")) {
var link_stat = document.createElement("div");
if (document.getElementById("unsubscribe").getAttribute("class") == 'like_link_state unshown') {
var divforlink3 = document.getElementById("subscribe");
link_stat.setAttribute("style", "text-align:center");}
else {
var divforlink3 = document.getElementById("unsubscribe");
link_stat.setAttribute("style", "text-align:left");
}
link_stat.innerHTML = '<a href="http://vk.com/stats?gid='+b+'" target="_blank">Статистика</a>';
divforlink3.appendChild(link_stat);	
}
}