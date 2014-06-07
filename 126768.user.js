// ==UserScript==
// @name           Taringa Full Menu
// @version        1.2
// @author         ohmayk
// @description    Todas las categorias en el menu desplegable
// @include        http://www.taringa.net/*
// @exclude        http://www.taringa.net/agregar*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
/*
v1.2 - 15 Jan 2013
 - Don't Repeat Yourself (DRY)
*/


// NOTA: Para añadir el listado al final del dropbox cambiar ".prepend" por ".append" y cambiar el orden de las variables.

var $jq = jQuery.noConflict();

var url = document.URL;

// Opciones para:
// - Pagina Principal www.taringa.net
// - Pagina Principal http://www.taringa.net/posts/*
var myOptions1 = {
    NULL : '----------------------',
    'tv-peliculas-series'   : 'Tv-Peliculas-Series',
    'musica'                : 'Musica',
    'manga-anime'           : 'Manga y Anime',
    'links'                 : 'Links',
    'juegos'                : 'Juegos',
    'downloads'             : 'Downloads',
    'comics'                : 'Comics',
    'celulares'             : 'Celulares'
};


// Opciones para:
// - Pagina de TOPs http://www.taringa.net/top/posts/*
var myOptions2 = {
    NULL : '----------------------',
    13   : 'Tv-Peliculas-Series',
    8    : 'Musica',
    32   : 'Manga y Anime',
    2    : 'Links',
    0    : 'Juegos',
    9    : 'Downloads',
    19   : 'Comics',
    17   : 'Celulares'
};


if ( url === 'http://www.taringa.net/' ) {
    $jq.each( myOptions1, function ( val, text ) {
        listP ( val, text );
    });
} else

if ( url.indexOf("top") >=0 ) {
    $jq.each( myOptions2, function ( val, text ) {
        listP ( val, text );
    });
} else

if ( url.indexOf("posts") >=0 ) {
    $jq.each( myOptions1, function ( val, text ) {
        listP ( val, text );
    });
}


function  listP (val, text) {
    $jq('select').prepend(
        $jq('<option></option>').val(val).html(text)
    );
}


