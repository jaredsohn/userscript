// ==UserScript==
// @name           Sledzik Killer :)
// @namespace      Nasza-Klasa.pl
// @description    Usuwa sledzika i czesc reklam ze strony NK
// @include        *nasza-klasa.pl/*
// ==/UserScript==


/***************************************************************************/
/*                                                                         */
/*                          CopyRight by Yeramihi                          */
/*                           All rights reserved                           */
/*                                                                         */
/***************************************************************************/



function kasuj(co) 
{
	try 
	{
    	co.parentNode.removeChild(co);
	} 
	catch(error)
	{
		//alert (error);
	}
}


var funkcja = setInterval(ladowanie, 100);

function ladowanie()
{
	clearInterval(funkcja);

	kasuj(document.getElementById('adserver_prefetch_code'));
	kasuj(document.getElementById('sledzik_box'));
	kasuj(document.getElementById('content_banner'));
	kasuj(document.getElementById('box_180x150'));
	kasuj(document.getElementById('ibd_okazja_dnia'));
	kasuj(document.getElementById('promo_entry'));
}