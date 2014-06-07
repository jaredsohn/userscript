// ==UserScript==
// @name           zbos_site
// @version        1.0
// @description    Bleee
// @include        http://tornado.uck.pk.edu.pl/~danusia/*
// ==/UserScript==
function get ()
{
	var body = document.body.children[0].innerHTML;
	var newBody = body.replace(/\<\!--/g, ' ').replace(/--\>/g, ' ');
	
	document.body.children[0].innerHTML = newBody;
}

function addLoadEvent(func) 
{
	var oldonload = window.onload;
	if (typeof window.onload != 'function') 
	{
		window.onload = func;
	} 
	else 
	{
		window.onload = function() 
		{
			if (oldonload) 
			{
				oldonload();
			}
			func();
		}
	}
}

addLoadEvent(get)