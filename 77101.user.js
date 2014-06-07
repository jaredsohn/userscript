// ==UserScript==
// @name atalhos
// @namespace eragon
// @description alguns atalhos que estavam a falar no redesign
// @include http://*.ogame.com.pt/*
// ==/UserScript==



var usersession = unsafeWindow.session; //"saca" a sessão



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '</script><li class="menubutton_table"><span class="menu_icon"><a href="Aceito Sugestões" accesskey="" target="_blank"><img class="mouseSwitch" src="http://img405.imageshack.us/img405/8342/botoe.gif" rel="http://img405.imageshack.us/img405/8342/botoe.gif" height="22" width="25"></a></span><a class="menubutton " href="index.php?page=messages&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Mensagens</span></a></li><li class="menubutton_table"><span class="menu_icon"><a href="Aceito Sugestões" accesskey="" target="_blank"><img class="mouseSwitch" src="http://img405.imageshack.us/img405/8342/botoe.gif" rel="http://img405.imageshack.us/img405/8342/botoe.gif" height="22" width="25"></a></span><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Colectivo</span></a><li class="menubutton_table"><span class="menu_icon"><a href="Aceito Sugestões" accesskey="" target="_blank"><img class="mouseSwitch" src="http://img405.imageshack.us/img405/8342/botoe.gif" rel="http://img405.imageshack.us/img405/8342/botoe.gif" height="22" width="25"></a></span><a class="menubutton " href="pranger.php" accesskey="" target="_blank"><span class="textlabel">Banidos</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);