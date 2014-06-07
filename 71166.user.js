// ==UserScript==
// @name           livep2000_adblock
// @namespace      livep2000_adblock
// @include        http://monitor.livep2000.nl/
// ==/UserScript==

window.addEventListener("load", function(e) 
{
  	document.getElementById('middenblok').style.display = 'none';
 	document.getElementById('tekstlinkrow').style.display = 'none';
	document.getElementById('menu').style.top = '0px';
	
	// eerste 2 tabellen verwijderen
	var table = document.getElementsByTagName('table');
	for (var i = 0; i < 2; i++){  		
   		table[i].style.display = 'none';
	}		
	
	// Browser hoogte bepalen
	var viewportwidth;
	var viewportheight;
	 
	// the more standards compliant browsers (mozilla/netscape/opera/IE7) 
	// use window.innerWidth and window.innerHeight
	 
	if (typeof window.innerWidth != 'undefined')
	{
		viewportwidth = window.innerWidth,
	    viewportheight = window.innerHeight
	}	 
	
	document.getElementById('datatablecontainer').style.height = viewportheight+'px';
	document.getElementById('datatable').style.borderCollapse = 'collapse';
	
	// no wrap td
	var datatable = document.getElementsByTagName('td');
	for (var i = 0; i < datatable.length; i++){  		
   		datatable[i].style.whiteSpace = "nowrap";		
	}

	
}, false);