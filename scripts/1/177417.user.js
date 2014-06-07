// ==UserScript==
// @name        Mostrar fechas en los comentarios de Alt-tab
// @autor       aaferrari@eml.cc
// @description Muestra la fecha en los comentarios de Alt-tab en formato local.
// @include     http://alt-tab.com.ar/*
// @version     0.2.1
// @updateURL   https://userscripts.org/scripts/source/177417.meta.js
// ==/UserScript==

var comentarios = document.querySelectorAll('li[id^="comment-"]');
var detector = /<div class="comment-fecha"><a href="#comment-\d+" title="">(([A-Za-z]+) [0-9]+[strn][thd], [0-9]+ at \d{1,2}:\d\d)<\/a>/i;
var meses = {"Enero": "January", "Febrero": "February", "Marzo": "March",
"Abril": "April", "Mayo": "May", "Junio": "June", "Julio": "July", "Agosto": "August","Septiembre": "September", "Octubre": "October", "Noviembre": "November", "Diciembre": "December"}
rss_post = null;

for(var i=0; i < comentarios.length; i++) {
    var resultado = comentarios[i].innerHTML.match(detector);
    if(resultado != null){
        var fecha = new Date(Date.parse(resultado[1].replace(/ at |[strn][thd],/gi, ",").replace(resultado[2], meses[resultado[2]])));
        comentarios[i].innerHTML = comentarios[i].innerHTML.replace(resultado[1], fecha.toLocaleString()).replace(/<!--|-->/gi, "");
    }
}

//Buscamos fechas de los comentarios anidados a través del RSS del post
var anidados = document.querySelectorAll('div[class^="comment-childs"]'); 
if (anidados.length != 0){
    GM_xmlhttpRequest({
      method: "GET",
      url: document.URL.replace(/#comments?(-[0-9]+)?/, "") + "/feed/atom",
      onload: function(response) {
        if (!response.responseXML) {
            rss_post = new DOMParser().parseFromString(response.responseText, "text/xml");
        }
        else { rss_post = response.responseXML; }
        for(var i=0; i < anidados.length; i++) {
            var comprobacion = rss_post.querySelector('link[href$="' + anidados[i].id + '"]');
            if (comprobacion == null) { continue; }
            else {
                var fecha = new Date(Date.parse(comprobacion.parentNode.getElementsByTagName("published")[0].innerHTML));
                anidados[i].innerHTML = '<div class="comment-fecha"><a href="#' + anidados[i].id + '" title="">' + fecha.toLocaleString() + '</a> </div>' + anidados[i].innerHTML;
            }
        }
        }
    });
}