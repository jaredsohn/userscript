// ==UserScript==
// @name         Gazeta TW 
// @version      1.0 revision 14
// @description  Gazeta The-West varianta in-game
// @author       Shteff
// @namespace    http://userscripts.org/scripts/show/125454
// @updateURL    http://userscripts.org/scripts/show/125454.user.js
// @website      http://shteff.com/
// @include      http://*.the-west.*/game.php*
// @credits      Petee
// ==/UserScript==

Sx3_inject = function(){
 if(document.getElementById('Sx3js')) return;
 var Sx3js = document.createElement('script');
 Sx3js.setAttribute('type', 'text/javascript');
 Sx3js.setAttribute('language', 'javascript'); 
 Sx3js.setAttribute('id', 'Sx3js');
 Sx3js.innerHTML = "("+(function(){

/* injected script starts */
/**************************/

window.openMenu = function(){ wman.open('MainTab').setTitle('<img src=http://gazeta.the-westro.eu/online/banner-long.png>').appendToContentPane(jQuery('<center><div style=height:435px;width:635px;position:relative;left:-10px;><iframe src=http://gazeta.the-westro.eu/online width=650px height=360px frameborder=0></iframe><a href=http://gazeta.the-westro.eu target=_blank title=Site Complet>Site Complet</a> | <a href=http://forum.the-west.ro/showthread.php?t=30761 target=_blank title=Forumul The-West>Forum TW</a> | <a href=javascript:openMenu() title=Reincarca Fereastra>Reincarca Fereastra</a>')); }
window.openShoutBox = function(){ wman.open('Shout').setTitle('Gazeta The-West Easter Egg').appendToContentPane(jQuery('<center><iframe title="Shoutbox" WIDTH="600" HEIGHT="320" src="http://shoutbox.widget.me/window.html?uid=k7vh4" frameborder="0" scrolling="auto"></iframe><script src="http://shoutbox.widget.me/v1.js" type="text/javascript"></script></center>')); }
jQuery("#footer_menu_right").append("<a href='javascript:openMenu()'><img style='position:absolute; top:25px;left:10px;cursor:pointer' title='<b>Citeste Gazeta The-West</b>' src='http://gazeta.the-westro.eu/twmenu/button.png' /></a>");
/**************************/
/*  injected script ends  */

 }).toString()+")();";
 document.getElementsByTagName('body')[0].appendChild(Sx3js);
};

if (location.href.indexOf(".the-west.") != -1 && location.href.indexOf("game.php") != -1) Sx3_inject();