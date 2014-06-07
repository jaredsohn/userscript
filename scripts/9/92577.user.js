// ==UserScript==
// @name           The West_-_Wiki
// @namespace      http://userscripts.org/scripts/show/92577
// @description    Couton d'aide The West Wiki (v2.3)
// @copyright      Hack.Crows/ryuuku
// @author         Hack.Crows
// @website        http://selim.oguz.free.fr/
// @include        http://*.the-west.*/game.php*
// @include        http://userscripts.org/scripts/source/92577.meta.js
// @require        http://userscripts.org/scripts/source/95524.user.js
// @exclude        http://forum.the-west.fr/*
// @exclude        http://wiki.the-west.fr/*
// @version        2.3
//
// @history        2.3 Mise en place d'une fentre MAJ.
// ==/UserScript==


// DEBUT DE LA MAJ AUTO
try {
	ScriptUpdater.check(92577, ''+getMoCheckVersion()+'');
} catch(e) {};
// FIN DE LE MAJ AUTO

var wiki ='<a href=\'http://wiki.the-west.fr\' title=\'<b>Wiki The West</b>\' target=\'_blank\' style=\'margin-right:160px;position:relative;top:-37px;\'><img src=\'images/transparent.png\' style=\'width:37px; height:37px; background:url(../images/main/symbols.png) -148px 37px\' ></a>';
var divforwiki = document.createElement('div')
divforwiki.innerHTML = wiki;
document.getElementById('footer_menu_right').appendChild(divforwiki);