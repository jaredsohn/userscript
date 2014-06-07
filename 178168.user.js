// ==UserScript==
// @name         TW Test Script
// @version      0.05
// @description  Test Script
// @author       xShteff
// @namespace    http://userscripts.org/scripts/show/178168
// @updateURL    http://userscripts.org/scripts/show/178168.user.js
// @website      http://the-west.ro
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
window.openMenu = function(){ wman.open('MainTab').setTitle('<img src=http://i.imgur.com/d1AvAPM.png>').appendToContentPane(jQuery('<center><div style=height:435px;width:635px;position:relative;left:-10px;><iframe src=http://forum.the-west.ro width=650px height=360px frameborder=0></iframe><a href=javascript:openMenu() title=Refresh>Refresh</a>')); }

jQuery("#buffbars").append("<a href='javascript:openMenu()'><img style='position:absolute; top:1px;left:-50px;cursor:pointer' title='<b>TEST</b>' src='http://i.imgur.com/KCbQfes.png' width='43' /></a>");
/**************************/
/*  injected script ends  */

 }).toString()+")();";
 document.getElementsByTagName('body')[0].appendChild(Sx3js);
};

if (location.href.indexOf(".the-west.") != -1 && location.href.indexOf("game.php") != -1) Sx3_inject();