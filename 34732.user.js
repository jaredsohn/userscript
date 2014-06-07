// ==UserScript==
// @name           vkontakte_addlink_online
// @author 		sanya-polecat
// @namespace      http://vkontakte.ru/id12089362
// @description    Link for view who from friends is online
// @include        http://vkontakte.ru/*
// ==/UserScript==

function friends_online() {
	var link_li = document.getElementById("myfriends");
	var link_online = document.createElement("a");
	link_online.setAttribute("href","friend.php?act=online");
	link_online.setAttribute("style","color:grey;");
	link_online.innerHTML="online";
	link_li.setAttribute("style","clear:both;");
	link_li.childNodes[0].setAttribute("style","width:78px;float:left;padding:3px 3px 3px 6px;margin-");
	link_li.appendChild(link_online);
}

friends_online();
document.getElementById("sideBar").setAttribute("style","position:fixed !important;top:40px;");
document.getElementById("banner1").style.display="block";
document.getElementById("banner2").style.display="block";