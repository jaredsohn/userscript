// ==UserScript==
// @name           vkontakte_addlink_онлайн
// @author 		Pashok
// @namespace      http://vkontakte.ru/id7972014
// @description    Link for view who from friends is online. New added RUS: онлайн
// @include        http://vkontakte.ru/*
// ==/UserScript==



function friends_online() {
	var link_li = document.getElementById("myfriends");
	var link_online = document.createElement("a");
	link_online.setAttribute("href","friend.php?act=online");
	link_online.setAttribute("style","color:grey;");
	link_online.innerHTML="онлайн";
	link_li.setAttribute("style","clear:both;");
	link_li.childNodes[0].setAttribute("style","width:67px;float:left;padding:3px 3px 3px 6px;margin-");
	link_li.appendChild(link_online);
}

friends_online();
document.getElementById("sideBar").setAttribute("style","position:fixed !important;top:40px;");
document.getElementById("banner1").style.display="block";
document.getElementById("banner2").style.display="block";