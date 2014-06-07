// ==UserScript==
// @name Libera Zero Hora
// @version 1.0
// @description Libera Noticias da Zero Hora
// @include http://zerohora.clicrbs.com.br/*
// ==/UserScript==

function addJQuery(callback){var script=document.createElement("script");script.setAttribute("src","http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");script.addEventListener('load',function(){var script=document.createElement("script");script.textContent="("+callback.toString()+")();";document.body.appendChild(script)},false);document.body.appendChild(script)}function main(){$.get(document.URL,function(data){var materia=data.split('<div class="materia-corpo entry-content">');materia=materia[1].split('</div>');$(".materia-corpo").html(materia[0]);$("body").css({overflow:"scroll"});$("#paywall-wrapper").hide()})}addJQuery(main);
