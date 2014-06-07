// ==UserScript==
// @name           KingsAge AttackAlarm
// @namespace      All
// @include        http://*.kingsage.*/game.php*
// @exclude        http://board.kingsage.*/*
// @exclude        http://board.kingsage.*/*
// @exclude        http://s*.kingsage.*/forum.php*
// @exclude        http://s*.kingsage.*/popup.php*
// @exclude        http://s*.kingsage.*/map.php*
// @exclude		   http://support.kingsage.*/
// @version		   3.5
// ==/UserScript==

var RELOADTIME = 30 //Reloadtime in secounds

window.addEventListener('load',function() {init();checkattack();},true) //

function init()
{
	if(!GM_getValue("boolsound"))
	{
		GM_setValue("boolsound",false)
	}
	var icon=document.createElement("img")
	icon.setAttribute("style","position:absolute;top:0px;left:0px;z-index:10000;")
	icon.addEventListener('click', function(){ GM_setValue("boolsound",!GM_getValue("boolsound"));document.location.reload();},true); //
	
	if(GM_getValue("boolsound"))
	{
		icon.setAttribute("src","http://www.bitzones.net/images/icons/yes.png")
		icon.setAttribute("title","KingsAge Attackalarm - on")
	} else 
	{
		icon.setAttribute("src","http://www.bitzones.net/images/icons/delete.png")
		icon.setAttribute("title","KingsAge Attackalarm - off")
	}
	document.body.appendChild(icon)
}

function checkattack() {
 tds= document.getElementsByClassName("lay_tower_left_top_attack")[0]
 if(tds) {
	 if(GM_getValue("boolsound")) {
		 flash = document.createElement("object")
		 flash.setAttribute("data","http://www.bitzones.net/flash/alarm.swf")
		 flash.setAttribute("type","application/x-shockwave-flash")
		 flash.setAttribute("name","alarm")
		 flash.setAttribute("width",1)
		 flash.setAttribute("height",1)
		 flash.innerHTML="<param name='movie' value='alarm.swf'><!-- doppelt aber unumgaenglich --><param name='quality' value='low'><!-- Abspielgeschwindigkeit geht vor Bildqualitaet --><param name='scale' value='exactfit'><!-- skaliert wie angegeben --><param name='menu' value='false'><!-- minimales Menue --><param name='loop' value='false'><!-- wird nur einmal geladen und gehalten --><param name='wmode' value='transparent'><!-- damit HTML-Elemente drueber liegen koennen -->"
		 document.body.appendChild(flash)
		 setTimeout("document.location.reload()",RELOADTIME*1000)
	 }
 }
} 