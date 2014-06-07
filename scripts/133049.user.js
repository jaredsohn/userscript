// ==UserScript==
// @name           Jappy Autoreload und akustische neue Nachrichten V4
// @namespace      MetaIIica
// @description    Lädt die "Jappy"-Profilseite automatisch neu, um automatisches Ausloggen zu verhindern und zeigt neue Nachrichten akustisch an
// @include        http://www.jappy.*/user/*
// ==/UserScript==


var ONESEC   = 1000 ;				// Eine Sekunde (in ms)
var ONEMIN = (Math.round(1+60*(Math.random()))) * ONESEC ;		// Eine Minute (in ms)
var INTERVAL = (Math.round(1+9*(Math.random()))) * ONEMIN ;			// Wie oft wird Seite aktualisiert (in ms) 1-9min eingestellt
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;

window.addEventListener('load',function() {init();checkmail();},true) //

function init()
{
	if(!GM_getValue("boolsound"))
	{
		GM_setValue("boolsound",true)
	}
	var icon=document.createElement("img")
	icon.setAttribute("style","position:absolute;top:0px;left:0px;z-index:10000;")
	icon.addEventListener('click', function(){ GM_setValue("boolsound",!GM_getValue("boolsound"));document.location.reload();},true); //
	
	if(GM_getValue("boolsound"))
	{
		icon.setAttribute("src","http://metallica.gaddy.de/yes.png")
		icon.setAttribute("title","Nachrichten - on")
	} else 
	{
		icon.setAttribute("src","http://metallica.gaddy.de/delete.png")
		icon.setAttribute("title","Nachrichten - off")
	}
	document.body.appendChild(icon)
}

function checkmail() {
 tds= document.getElementsByClassName("mailboxStream cf")[0]
 if(tds) {
	 if(GM_getValue("boolsound")) {
		 flash = document.createElement("object")
		 flash.setAttribute("data","http://metallica.gaddy.de/emailp.swf")
		 flash.setAttribute("type","application/x-shockwave-flash")
		 flash.setAttribute("name","alarm")
		 flash.setAttribute("width",1)
		 flash.setAttribute("height",1)
		 flash.innerHTML="<param name='movie' value='emailp.swf'><param name='quality' value='low'><param name='scale' value='exactfit'><param name='menu' value='false'><param name='wmode' value='transparent'>"
		 document.body.appendChild(flash)
		 setTimeout("document.location.reload()",RELOADTIME*1000)
	 }
 }
}