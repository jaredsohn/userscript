// ==UserScript==
// @name          String Fighters No Spoiler
// @description   Hides the names of the winners on the tournament page
// @include       http://www.docteeboh.net/stringfighters/string-fighters-tournois.php
// ==/UserScript==
var i = 0;
var fonts = document.getElementsByTagName('font');
while(i < fonts.length)
	if(fonts[i++].color == "#FF0000") // skip the first one ("Pour discuter du tournoi en cours...")
		break;
for(; i < fonts.length; i++)
	if(fonts[i].color == "#FF0000")
		fonts[i].color = "#FFEBD1";