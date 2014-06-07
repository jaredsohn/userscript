// ==UserScript==
// @name           The-West Yol İşareti
// @namespace      www.the-west.org
// @description    Oyunun arayüzüne bulunduğun şehrin yol işaretini kısayol olarak ekler. 
// @include        http://*.the-west.*/game.php*
// @author         TVE
// @version        1.3
// ==/UserScript==



var fingerboard ="<a href=\"javascript:AjaxWindow.show('fingerboard',{town_id:Character.home_town.town_id});\" style=\"margin-right:123px;\"><img src=\"http://img5.imagebanana.com/img/k3njonf2/thumb/wegweiser2.png\" style=\"z-index:100;position:relative;top:-37px;\"></a>";
var divforfingerboard = document.createElement('div')
divforfingerboard.innerHTML = fingerboard;
document.getElementById("footer_menu_right").appendChild(divforfingerboard); 