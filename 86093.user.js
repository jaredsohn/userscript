// ==UserScript==
// @name           Tools_Ogame_Nettoyer_Menu
// @namespace      monkey
// @version        1.4
// @author         MonkeyIsBack
// @include        http://*ogame.*/game/index.php?page=*&session=*
// ==/UserScript==

// Suppression du tutoriel
var helper = document.getElementById('helper');
if (helper) helper.parentNode.removeChild(helper);

// Suppression du changelog
var changelog_link = document.getElementById('changelog_link');
if (changelog_link) changelog_link.parentNode.removeChild(changelog_link);

// Décoloration des liens du menu
var liensMenu = document.getElementById('links').getElementsByTagName("a");
if (liensMenu) {
	for (var i = 0; i < liensMenu.length ; i++) {
		if (liensMenu[i].className == "menubutton premiumHighligt") liensMenu[i].setAttribute("class", "menubutton");
	}
}