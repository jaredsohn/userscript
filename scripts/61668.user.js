// ==UserScript==
// @name Menu
// @namespace http://bloodpack.forumieren.com/
// @description Adds useful buttons to the Ogame Menu (Speedsim/oRaiders/Ally massages/Ally)
// @include http://andromeda.ogame.gr/*
// ==/UserScript==
// @ Version 0.2
//for Ogame Redesign unis

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: i've edited the href string tag to include the usersession ID, not to be a static ID



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<script type="text/javascript">function bonus_boutons(){popupWindow("index.php?page=globalTechtree&session='+usersession+'","techinfo","auto","no","0","0","no","680","600","yes");}</script><li class="menubutton_table"><a class="menubutton " href="index.php?page=networkkommunikation&session='+usersession+'" accesskey="" target="_self"><span class="textlabel">Αποστολή Κυκλικού</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);