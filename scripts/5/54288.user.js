// ==UserScript==
// @name           Ormeo
// @namespace      http://www.tommedley.com/ormeo
// @description    Adds Ormeo to any page
// @include        http://*
// ==/UserScript==

var doit = true;

for ( var scripts in document.getElementsByTagName('script') )
	{
	if ( document.getElementsByTagName('script')[scripts].src == 'http://www.ormeo.net/js/ormeoStart.js' || 
			document.getElementsByTagName('script')[scripts].src == 'http://www.ormeo.net/js/ormeo.js')
		{
		doit = false;
		}
	}
if (doit == true)
	{
	var ormeo = document.createElement('script');
	ormeo.src = 'http://www.tommedley.com/ormeo/js/ormeoStart.js';
	ormeo.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(ormeo);
	}
else{
	}