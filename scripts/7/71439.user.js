// ==UserScript==
// @name           meneplayer
// @namespace      menehacks
// @description    Añade un reproductor para YouTube parecido al de Tuenti en Meneame.net. Funciona con los vídeos que son noticia, en los vídeos enlazados en los comentarios de noticias y en el nótame.
// @author        matachana
// @homepage      http://userstyles.org/styles/71439
// @include       http://meneame.net/*
// @include       https://meneame.net/*
// @include       http://www.meneame.net/*
// @include       https://www.meneame.net/*
// ==/UserScript==

function insertLinks() {
$('a[href*=youtube.com]').each(
  function (i,j) {  
    var video_url = $(this).attr("href"); 

    if( video_url.indexOf('?') == -1 )
    {
	return;
    }

    tokens = video_url.split('?')[1].split('&');
    for(i=0;i<tokens.length;i++) {
        subtokens = tokens[i].split('=');
        if(subtokens[0] == 'v') {
            video_id = subtokens[1];
        }
    } 
    var elemento = document.createElement('a');
    elemento.addEventListener('click',function (event) {
	 $('#ReproductorVideo').remove();
        id = event.currentTarget.id;
	$('body').append('<div id="ReproductorVideo" style="position: fixed; bottom: 0px; right: 0px; border: 2px solid #FF9400;"><div style="float: rigth; background-color: #FEEFE5; text-align: right;">&nbsp;</div><object width="320" height="265"><param name="movie" value="http://www.youtube.com/v/' + id + '&hl=es_ES&fs=1&autplay=1&"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/' + id + '&hl=es_ES&fs=1&autoplay=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="320" height="265"></embed></object></div>');
    // Insertamos ahora los botones para cerrar/separar la ventana YouTube

    var detach = document.createElement('a');
    detach.addEventListener('click',function (event) {
	url = $('param[name=movie]')[0].value;

	$('#ReproductorVideo').remove();
	window.open(url, "_blank", 'width=300,height=265')
	    }, true);
    detach.href='javascript:void(0)';
    detach.innerHTML = '[^]&nbsp;';

    var close = document.createElement('a');
    close.addEventListener('click', function() {
	 $('#ReproductorVideo').remove();
	}, true);
    close.href = 'javascript:void(0)';
    close.innerHTML = '&nbsp;[X]';

    $('object').parents()[0].children[0].appendChild(detach);
    $('object').parents()[0].children[0].appendChild(close);
	},true);
    elemento.href = 'javascript:void(0)';
    elemento.innerHTML = '&nbsp;&nbsp;[>]';
    elemento.id = video_id;
    $(this).after(elemento);
  });
}

// Se asegura de que jQuery se cargue

function addjQuery() {
// Extracted from: http://joanpiedra.com/jquery/greasemonkey/
/*  No hace falta cargar jQuery, ya que meneame ya lo hace.
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ); */

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        insertLinks();
    }
}
addjQuery();
