// ==UserScript==
// @name Menu Septum
// @namespace http://septum.ogameteam.com/
// @description Ajoute plusieurs boutons menu utile pour l'alliance Septum
// @include http://*.ogame.*/*
// ==/UserScript==

//Pour les univers Ogame 1.0

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: 



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<script type="text/javascript">function bonus_boutons(){popupWindow("index.php?page=globalTechtree&session='+usersession+'","techinfo","auto","no","0","0","no","680","600","yes");}</script><li 
class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_fleet1_a.gif" height="29" width="38"></span><a class="menubutton " href="http://operationz.forumprofi.de/index.php" accesskey="" target="_blank"><span class="textlabel">Operationz</span></a></li><li;
document.getElementById('menuTable').appendChild(LinkDiv);