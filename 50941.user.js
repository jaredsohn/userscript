// ==UserScript==
// @name           SF Library See Card Number
// @namespace    http://www.sflib.org
// @description    Allows you to view the card number as you enter it on the SF Library's website
// @include        https://*.sfpl.org/*
// ==/UserScript==
//By Matthew D. Adler 
//http://sites.google.com/site/matthewdadler/

(
function()
{
	fields = document.getElementsByTagName("input")
	for( var i=0; i < fields.length; i=i+1 )
	{
		if( fields[i].type == "PASSWORD" || fields[i].type == "password" )
			if( fields[i].name != "pin" && fields[i].name != "PIN" )
				fields[i].type = "text"
	}
}
) ();