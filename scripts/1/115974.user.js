// ==UserScript==
// @name           Seriesyonkis link directo
// @author         Asneo
// @description    Reproducir directamente los capitulos en la nueva web de seriesyonkis.
// @include       *
// @version        1.0
// @copyright      Asneo
// ==/UserScript== 

function(){

	$(".episode-server a").each(function(){
		
		href = $(this).attr("href");
        href = href.replace(/\D/g,'');
		$(this).attr("href","/s/y/"+href);
		$(this).html("Ir ahora");
		})
}()