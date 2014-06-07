// ==UserScript==
// @name           Kronos MCAnime - Carga de vistas en miniatura
// @namespace      MetalTxus
// @description    Muestra vistas en miniatura de las imágenes en los feed
// @include        http://kronos.mcanime.net/*
// ==/UserScript==

// Activar aumento del tamaño de la miniatura al pasar el cursor por encima
var enable_zoom_on_hover = true;

function loadThumbnails() {
    $('.story-message a:not(.imageChecked)[href^="http://bit.ly/"], .pComment-content a:not(.imageChecked)[href^="http://bit.ly/"]').each(function(i, value) {
        // Comprobar si ya existe una miniatura
        if ($(value).children().length == 0) {
    		$("<img>", {
        		src: $(value).attr('href'),
        		load: function() {
                    var strCode = '<img class="thumbnail" src="' + $(value).attr('href') + '">';
                    //if ($(value).prev().length < 1) strCode = '<br>' + strCode;
                    if (!$(value).next().is('br')) strCode += '<br>';
            		$(value).html(strCode);
                }
        	});
           	// Añadir clase a los enlaces ya comprobados
        	$(value).addClass('imageChecked');
        }
    });
}

$(document).ready(function() {
    // Cargar estilos
    $('<style>.thumbnail {max-height:128px; max-width:488px;}</style>').appendTo('body');
    if (enable_zoom_on_hover) $('<style>.thumbnail:hover {max-height:none;}</style>').appendTo('body');
    setInterval(loadThumbnails, 2000);
});