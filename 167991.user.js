// ==UserScript==
// @name        IkaMuseumFinder
// @version     1.0
// @author      Giuseppe De Rito
// @namespace   http://toolsdb.altervista.org/
// @updateURL   http://toolsdb.altervista.org/tools/updaters/IkaMuseumFinder.meta.js
// @description IkaMuseumFinder is a tool for Ikariam that helps you to find cultural goods.
// @include     http://s*.ikariam.*/index.php*
// @run-at      document-end
// @resource    res1 http://toolsdb.altervista.org/images/icons/museumfinder.jpg
// ==/UserScript==

var server = unsafeWindow.dataSetForView['serverName'].toLowerCase();
var land = location.href.split('.')[1];
if (server == 'testserver_en') server = "test_en";
if (server == 'testserver_en_2') server = "test_en_2";

var menu = document.getElementsByClassName('menu_slots')[0];
menu.innerHTML += '<li class="expandable slot5" onclick="window.open(\'http://toolsdb.altervista.org/tools/ikamuseumfinder/index.php?server='+server+'&country='+land+'\'); return false;"><div class="image" style="background: url(\'http://toolsdb.altervista.org/images/icons/museumfinder.jpg\');"></div><div class="name"><span class="namebox">IkaMuseumFinder</span></div></li>';