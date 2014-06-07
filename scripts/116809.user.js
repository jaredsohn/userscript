// ==UserScript==
// @name			Google Images bg
// @namespace		google-images-bg
// @include			http://www.google.*/imgres?*
// @include			http://*/*.png
// @include			http://*/*.gif
// @version			1.02
// @author			Salvatore
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require			http://sizzlemctwizzle.com/updater.php?id=116809
// ==/UserScript==

/**
 * Color de fondo
 */
var color = "#333";

/**
 * Degradado [to do]
 */
var degradado = "#333";


function main()
{
	addBackground();
}

function addBackground()
{
	// fondo de la capa en google images result
	$('#il_fic #il_ic').css('background-color', color );
	
	// fondo del body si es una imagen directamente, es posible hacer esto?
	//alert( location.href );
}


window.addEventListener('load',main,true);