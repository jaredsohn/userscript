// ==UserScript==
// @name New Menu
// @namespace http://bloodpack.forumieren.com/
// @description Adds various useful buttons to the Ogame Menu (Sources traduites et modifiÃ©es pour fonctionner avec OGame.fr "by Joe`")
// @include http://*.ogame.*/*
// ==/UserScript==

//for Ogame Redesign unis

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: i've edited the href string tag to include the usersession ID, not to be a static ID



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<script type="text/javascript">function bonus_boutons(){popupWindow("index.php?page=globalTechtree&session='+usersession+'","techinfo","auto","no","0","0","no","680","600","yes");}</script>
<li class="menubutton_table"><span class="menu_icon"><img src="img/navigation/navi_ikon_research_a.gif" height="29" width="38"></span><a class="menubutton" href="#" onclick="bonus_boutons()"><span class="textlabel">Technologie</span></a></li>