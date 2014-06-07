// ==UserScript==
// @name           transformice
// @namespace      script
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/80170.meta.js?interval=1&show
// @script page    http://userscripts.org/scripts/show/80170
// @version	1.4
// @history	1.4 Для правильной работы автоапдейтера отключите блоиратор всплывающих окон.
// @history	1.3 Ввёл переменную качество quality изменяйте её на low или high для установки качества флеша, так же заменил скрытие на удаление контента.
// @history	1.2 Добавил другой автоапдейтер скрипта.
// @history	1.1 Добавил поддержку низкого разрешения, добавил автоапдейтер для Firefox, добавил переменную для изменения высоты, если обрезано.
// @include        http://www.transformice.com/*
// ==/UserScript==
////////////////////////////
// 		  	  //
var p="250"       //Измените эту переменную в меньшую сторону, если у вас обрезана игра по высоте экрана.
var quality="high"//Качество флэша, доступные параметры low и high
//			  //
////////////////////////////
//var oldgame=document.getElementById('MiniJeux')
//if(oldgame) oldgame.parentNode.removeChild(oldgame)
var blocks=document.getElementById('global')
//blocks.setAttribute("style","display:none!important");
if(blocks) blocks.parentNode.removeChild(blocks)
var info=document.createElement("div");
         info.setAttribute("id","info");
         info.setAttribute("style","font: bold italic 22px serif;position:absolute;top: 25%;left:25%");
         info.innerHTML="Removing content and loading game, please wait 2 sec.";
         document.body.insertBefore(info,document.body.firstChild)
var iWidth = self.innerWidth;  
var iHeight = self.innerHeight;
var screenW = (self.opera ? iWidth : screen.availWidth); 
var screenH = (self.opera ? iHeight : screen.availHeight);
setTimeout(function(){ 
if (screenW<=1152)
{
var css="#newgamebox{position:absolute;top: 0px;left: 0px; display:block; width: 100%; height: 100%}";
GM_addStyle(css);
var game='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" id="MiniJeux" align="middle" height="100%" width="100%"><param name="allowScriptAccess" value="always"><param name="movie" value="ChargeurTransformice.swf"><param name="menu" value="true"><param name="quality" value="'+quality+'"><param name="bgcolor" value="#6A7495"><embed src="ChargeurTransformice.swf" menu="true" quality="'+quality+'" bgcolor="#6A7495" name="Transformice" swliveconnect="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="middle" height="100%" width="100%"></object>'
}
else {
var css="#newgamebox{position:absolute;top: 5%}";
GM_addStyle(css);
var game='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" id="MiniJeux" align="middle" height="'+(screenH-100)+'" width="'+(screenW-10)+'"><param name="allowScriptAccess" value="always"><param name="movie" value="ChargeurTransformice.swf"><param name="menu" value="true"><param name="quality" value="'+quality+'"><param name="bgcolor" value="#6A7495"><embed src="ChargeurTransformice.swf" menu="true" quality="'+quality+'" bgcolor="#6A7495" name="Transformice" swliveconnect="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="middle" height="'+(screenH-100)+'" width="'+(screenW-60)+'"></object>'
}
         var gamebox=document.createElement("div");
         gamebox.setAttribute("id","newgamebox");
         gamebox.innerHTML=game;
         document.body.insertBefore(gamebox,document.body.firstChild)
var inforemove=document.getElementById('info')
if(inforemove) inforemove.parentNode.removeChild(inforemove)},1250)