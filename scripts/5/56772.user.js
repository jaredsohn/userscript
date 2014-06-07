// ==UserScript==
// @name           TW-Fingerboard
// @namespace      http://tve.cms4people.de
// @description    Link zum Wegweiser
// @include		   http://*.the-west.*/game.php*
// ==/UserScript==



var fingerboard ="<a href=\"javascript:AjaxWindow.show('fingerboard',{town_id:Character.home_town.town_id});\" style=\"margin-left:160px;\"><img src=\"http://img5.imagebanana.com/img/k3njonf2/thumb/wegweiser2.png\" style=\"z-index:100;position:relative;top:-37px;\"></a>";
var divforfingerboard = document.createElement('div')
divforfingerboard.innerHTML = fingerboard;
document.getElementById("footer_menu_left").appendChild(divforfingerboard); 