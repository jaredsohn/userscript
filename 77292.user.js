// ==UserScript==
// @name           Traductor
// @description    Agrega un comando al pie de un sitio
// para traducirlo al español con el Traductor de Google
// Variante de:
// http://userscripts.org/scripts/show/77272
// Para adaptarlo a otro idioma, es necesario editar
// los segmentos "value:Español", "hl=es" y "tl=es"
// @include        *
// @exclude        about:*
// ==/UserScript==

(function(){if(location.href.indexOf
('http://translate.google.')==-1){document.body.innerHTML=
document.body.innerHTML+
'<hr size=2 width="75%"><input type="Button" value="Español" onClick="javascript:location.href=\'http://translate.google.com/translate?hl=es&sl=auto&tl=es&u=\'+escape(location.href)"'
}})()