// ==UserScript==
// @name          RapidShare file’s size in megabytes
// @author        Arsalan Bakht...
// @description   Converts file’s size to megabytes.
// @include       http://rapidshare.com/files/*
// @include       http://*.rapidshare.com/files/*
// ==/UserScript==


var result = document.getElementById("inhaltbox").getElementsByTagName("h1")[0].innerHTML;

if ( result && result.toLowerCase() != "error" )
{
	var element = document.getElementsByClassName("downloadlink")[0].getElementsByTagName("font")[0];
	
	if ( element ) 
	{
		var size = element.innerHTML.substring(2),
		unit = size.split(" ");
		unit = unit[unit.length - 1];
		
		if ( size && unit.toLowerCase() == "kb" )
		{
			size = Math.round(parseInt(size) / 102.4) / 10;
			
			if ( size >= 1 ) element.innerHTML = '| ' + size + ' MB';
		}
	}
}