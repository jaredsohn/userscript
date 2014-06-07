// ==UserScript==
// @name           PeliculasID AdsFree
// @namespace      http://www.chimpachole.com/
// @version        1.3
// @description    Quita todos los banners de publicidad del sitio.
// @include        http://peliculasid.net/*
// ==/UserScript==

// Workaround to load jQuery in Firefox and Chrome as well.
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    $('#header > div.ads-header').remove();

    $('#contendor > div.iframe').remove();
    $('#contendor > div.banners').remove();

    $('#contenido > div.contenedor-banner-item').remove();

    $('#sidebar > div').each(function(i, e){

        if ($(this).text() == 'Anuncios')
        {
            $(this).next().next().remove();
            $(this).next().remove();
            $(this).remove();
        }

    });

    $('#footer').remove();

    if (location.pathname.indexOf('/peliculas') >= 0)
    {
        $('#contenido > div[style*="float: right;"]').remove();
        $('#contenido > h2').eq(1).remove();
        $('#contenido > div.texto-pelicula').eq(0).remove();
        $('#contenido > div.texto-ver').remove();
    }

    if (location.pathname.indexOf('/modulos') >= 0)
    {
        $('div[id*="imagecont"]').eq(0).remove();
        $('div[id*="embedcont"]').eq(0).css('visibility', 'visible');
    }
}

// load jQuery and execute the main function
addJQuery(main);