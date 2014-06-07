// ==UserScript==
// @name          Smiley
// @namespace     http://h4ckcod3r.in/userscripts
// @description	  adds :F smiley in facebook chat
// @include       https://www.facebook.com/*
// @include       https://facebook.com/*
// @include       http://www.facebook.com/*
// @include       http://facebook.com/*
// ==/UserScript==

function gopi()
{
	chatDiv=document.getElementsByClassName('fbChatMessage');
	for(x in chatDiv)
	{
		//var str=chatDiv[x].innerHTML;
		//str.replace(":F", ".!..");
		if(chatDiv[x].innerHTML==":F")
		{
			//chatDiv[x].innerHTML='<img src="http://h4ckcod3r.in/userscripts/images/test.jpg" height="16" width="16"';
			chatDiv[x].innerHTML=".!..";
		}
	}
	
	setTimeout(gopi,5000);
}
setTimeout(gopi,2000);

void 0;