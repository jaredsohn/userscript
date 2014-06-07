// ==UserScript==
// @name	Ogame UserForum Menu
// @namespace	Ogame UserForum Menu
// @description   Reemplaza el menu del foro por el que nosotros seleccionemos.
// @include	   http://*ogame*/
// @include	   http://*/game/leftmenu.php*
// @exclude	   
// ==/UserScript==    

// Copyright (C) 2006, Perberos
// http://www.perberos.com.ar/
// E-Mail: perberos@hotmail.com
//
// Version 0.6b beta [2006.8.30]
// Copyright (c) 2006, Matsurai
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

GM_registerMenuCommand("UserForum Menu...", function() {
  OgameUserForumMenu = prompt("Forum URL",GM_getValue("OgameUserForumMenu"));
  GM_setValue("OgameUserForumMenu", OgameUserForumMenu);
});//menu para elegir el link del foro

GM_registerMenuCommand("UserForum Frame...", function() {
  OgameUserForumMenu_fame = confirm("Want use the same frame of the game?");
  GM_setValue("OgameUserForumMenu_fame", OgameUserForumMenu_fame);
});//menu para elegir el link del foro

if (self.document.URL.indexOf("leftmenu.php") != -1){
	//cambia el link del foro
	var a = document.getElementsByTagName('a');

	for (var i = a.length - 1; i >= 0; i--) {
		if(a[i].href.indexOf('http://board.ogame') != -1){
			OgameUserForumMenu = GM_getValue("OgameUserForumMenu");
			if(OgameUserForumMenu!= undefined &&OgameUserForumMenu!='')
			  a[i].href = OgameUserForumMenu;
			if(GM_getValue("OgameUserForumMenu_fame"))
			  a[i].target = 'Hauptframe';//para mostrar el foro en el mismo frame del juego
		}
	}
}
//ogameccmenu.user.js
