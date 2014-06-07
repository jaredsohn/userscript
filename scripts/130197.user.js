// ==UserScript==
// @name           facebook-an
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Aragonese
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.3
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-07-08
// Translations:   Juan Pablo Martínez

/*
 *  Copyright 2012 Kevin Scannell
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
*/


var tags = new Array();
tags.push('h4');     // Sponsored, Ticker, ...
tags.push('h6');     // %a commented on %a.
tags.push('label');  // Comment
tags.push('a');      // many... (should do last for "context sensitive" stuff)

var divclasses = new Array();
divclasses.push('innerWrap');  // Write a comment... <textarea>
divclasses.push('commentActions fsm fwn fcg'); // time stamps on comments
divclasses.push('UIImageBlock_Content UIImageBlock_ICON_Content');  // 2 people like this
//divclasses.push('fsm fwn fcg');  // By:
//divclasses.push('uiImageBlockContent uiImageBlockSmallContent');  // "near"

var spanclasses = new Array();
spanclasses.push('default_message');  // Like/Dislike
spanclasses.push('saving_message');   // Like/Dislike
spanclasses.push('uiStreamSource');   // %T near %a

// Replace the search string with the translated string
function r(dd, s, t) {
    if (s == t) {
        return (dd);
    } else {
        var RegExpr = new RegExp(s, "g");
        return (dd.replace(RegExpr, t));
    }
}

function translate(x) {
  d = x;
// Translations go here
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) les gusta esto\.(?=($|"|<))', "$1"+"A "+"$2"+", "+"$3"+" y "+"$4"+" les ha feito goyo isto.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó una nueva foto\.(?=($|"|<))', "$1"+"$2"+" i ha adhibiu una nueva foto.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó ([0-9,]+) fotos nuevas\.(?=($|"|<))', "$1"+"$2"+" i ha adhibiu "+"$3"+" nuevas fotos.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó una foto nueva al álbum (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha adhibiu una nueva foto en l'album "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó ([0-9,]+) fotos nuevas al álbum (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha adhibiu "+"$3"+" nuevas fotos en l'album "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) ahora son amigos\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" son agora amigos.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) comentaron una? (<a [^>]+>)enlace</a>\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han comentau sobre "+"$4"+"un vinclo</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) comentaron una? (<a [^>]+>)foto</a>\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han comentau sobre "+"$4"+"una foto</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) comentaron una? (<a [^>]+>)publicación</a>\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han comentau sobre "+"$4"+"una dentrada</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) comentaron una? (<a [^>]+>)estado</a>\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han comentau sobre "+"$4"+"un estau</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) comentaron una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han comentau sobre "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) les gusta (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" y "+"$3"+" les fa goyo "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) les gusta esto\.(?=($|"|<))', "$1"+"A "+"$2"+" y "+"$3"+" les fa goyo isto.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han compartiu "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron e?la? (<a [^>]+>)enlace</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han compartiu "+"$4"+"o vinclo</a>"+" de "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron e?la? (<a [^>]+>)foto</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han compartiu "+"$4"+"a foto</a>"+" de "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron e?la? (<a [^>]+>)publicación</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han compartiu "+"$4"+"a dentrada</a>"+" de "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron e?la? (<a [^>]+>)estado</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han compartiu "+"$4"+"o estau</a>"+" de "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron e?la? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" han compartiu "+"$4"+" de "+"$5"+".");
  d = r(d, '(^|="|>)Acerca de(?=($|"|<))', "$1"+"Arredol de");
  d = r(d, '(^|="|>)Hace aproximadamente una hora(?=($|"|<))', "$1"+"en fa una hora");
  d = r(d, '(^|="|>)Hace un minuto aproximadamente(?=($|"|<))', "$1"+"en fa un minuto");
  d = r(d, '(^|="|>)Configuración de la cuenta(?=($|"|<))', "$1"+"Achustes de cuenta");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) cambió la foto de su perfil\.(?=($|"|<))', "$1"+"$2"+" ha cambiau a suya foto de perfil.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) cambió la foto de su perfil\.(?=($|"|<))', "$1"+"$2"+" ha cambiau a suya foto de perfil.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó una? (<a [^>]+>)enlace</a>\.(?=($|"|<))', "$1"+"$2"+" ha comentau sobre "+"$3"+"un vinclo</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó una? (<a [^>]+>)foto</a>\.(?=($|"|<))', "$1"+"$2"+" ha comentau sobre "+"$3"+"una foto</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó una? (<a [^>]+>)publicación</a>\.(?=($|"|<))', "$1"+"$2"+" ha comentau sobre "+"$3"+"una dentrada</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó una? (<a [^>]+>)estado</a>\.(?=($|"|<))', "$1"+"$2"+" ha comentau sobre "+"$3"+"un estau</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha comentau sobre "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha comentado su (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha comentau sobre o suyo propio "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha comentado su (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha comentau sobre o suyo propio "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó tu (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha comentau sobre o tuyo "+"$3"+".");
  d = r(d, '(^|="|>)Registro de actividad(?=($|"|<))', "$1"+"Rechistro d'actividatz");
  d = r(d, '(^|="|>)Agregar a mis amigos(?=($|"|<))', "$1"+"Adhibir como amigo");
  d = r(d, '(^|="|>)Agregar intereses\.\.\.(?=($|"|<))', "$1"+"Adhibir Intereses...");
  d = r(d, '(^|="|>)Foto/video(?=($|"|<))', "$1"+"Adhibe una foto u video");
  d = r(d, '(^|="|>)Publicidad(?=($|"|<))', "$1"+"Publicidat");
  d = r(d, '(^|="|>)Hace unos segundos(?=($|"|<))', "$1"+"en fa qualques segundos");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta una? (<a [^>]+>)enlace</a>\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+"un vinclo</a>"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta una? (<a [^>]+>)foto</a>\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+"una foto</a>"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta una? (<a [^>]+>)publicación</a>\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+"una dentrada</a>"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta una? (<a [^>]+>)estado</a>\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+"un estau</a>"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta e?la? (<a [^>]+>)enlace</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+"o vinclo</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta e?la? (<a [^>]+>)foto</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+"a foto</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta e?la? (<a [^>]+>)publicación</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+"a dentrada</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta e?la? (<a [^>]+>)estado</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+"o estau</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta e?la? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+" de "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo "+"$3"+" y "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta esto\.(?=($|"|<))', "$1"+"A "+"$2"+" le fa goyo isto.");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) les gusta esto\.(?=($|"|<))', "$1"+"A "+"$2"+" les fa goyo isto.");
  d = r(d, '(^|>)un enlace(?=($|<))', "$1"+"un vinclo");
  d = r(d, '(^|="|>)APLICACIONES(?=($|"|<))', "$1"+"APLICACIONS");
  d = r(d, '(^|="|>)Aplicaciones y juegos(?=($|"|<))', "$1"+"Aplicacions y chuegos");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha compartiu "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió e?la? (<a [^>]+>)enlace</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha compartiu "+"$3"+"o vinclo</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió e?la? (<a [^>]+>)foto</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha compartiu "+"$3"+"a foto</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió e?la? (<a [^>]+>)publicación</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha compartiu "+"$3"+"a dentrada</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió e?la? (<a [^>]+>)estado</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha compartiu "+"$3"+"o estau</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió e?la? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha compartiu "+"$3"+" de "+"$4"+".");
  d = r(d, '(^|="|>)Pregunta(?=($|"|<))', "$1"+"Fe una pregunta");
  d = r(d, '(^|="|>)Se ha etiquetado a (<a [^>]+>[^<]+</a>) en e?la? (<a [^>]+>)enlace</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en "+"$3"+"o vinclo</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)Se ha etiquetado a (<a [^>]+>[^<]+</a>) en e?la? (<a [^>]+>)foto</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en "+"$3"+"a foto</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)Se ha etiquetado a (<a [^>]+>[^<]+</a>) en e?la? (<a [^>]+>)publicación</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en "+"$3"+"a dentrada</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)Se ha etiquetado a (<a [^>]+>[^<]+</a>) en e?la? (<a [^>]+>)estado</a> de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en "+"$3"+"o estau</a>"+" de "+"$4"+".");
  d = r(d, '(^|="|>)Se ha etiquetado a (<a [^>]+>[^<]+</a>) en e?la? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en "+"$3"+" de "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)enlace</a>\'s photos\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en as fotos de "+"$3"+"o vinclo</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)foto</a>\'s photos\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en as fotos de "+"$3"+"a foto</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)publicación</a>\'s photos\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en as fotos de "+"$3"+"a dentrada</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)estado</a>\'s photos\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en as fotos de "+"$3"+"o estau</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"S'ha etiquetau a "+"$2"+" en as fotos de "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) actualizó la foto de su portada\.(?=($|"|<))', "$1"+"$2"+" ha esviellau a suya foto de portalada.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) actualizó la foto de su portada\.(?=($|"|<))', "$1"+"$2"+" ha esviellau a suya foto de portalada.");
  d = r(d, '(^|="|>)Nacimiento(?=($|"|<))', "$1"+"Naixencia");
  d = r(d, '(^|="|>)Empleo(?=($|"|<))', "$1"+"Treballar-ie");
  d = r(d, '(^|="|>)Cambiar portada(?=($|"|<))', "$1"+"Cambiar a portalada");
  d = r(d, '(^|="|>)Chat \\(Desconectado\\)(?=($|"|<))', "$1"+"Chat (desconnectau)");
  d = r(d, '(^|="|>)Cerrar(?=($|"|<))', "$1"+"Zarrar");
  d = r(d, '(^|="|>)Mejores amigos(?=($|"|<))', "$1"+"Los mas amigos");
  d = r(d, '(^|="|>)Crear un anuncio(?=($|"|<))', "$1"+"Creyar un anuncio");
  d = r(d, '(^|="|>)Crear una página(?=($|"|<))', "$1"+"Creyar una pachina");
  d = r(d, '(^|="|>)Crear un grupo\.\.\.(?=($|"|<))', "$1"+"Creyar una colla...");
  d = r(d, '(^|="|>)Crear un grupo(?=($|"|<))', "$1"+"Creyar una colla");
  d = r(d, '(^|="|>)Desarrolladores(?=($|"|<))', "$1"+"Desembolicadors");
  d = r(d, '(^|="|>)Hace una hora(?=($|"|<))', "$1"+"en fa una hora");
  d = r(d, '(^|="|>)Hace ([0-9,]+) horas(?=($|"|<))', "$1"+"en fa "+"$2"+" horas");
  d = r(d, '(^|="|>)Hace un minuto(?=($|"|<))', "$1"+"en fa un minuto");
  d = r(d, '(^|="|>)Hace ([0-9,]+) minutos(?=($|"|<))', "$1"+"en fa "+"$2"+" minutos");
  d = r(d, '(^|="|>)1 amigo\\(a\\) en común(?=($|"|<))', "$1"+"un amigo común");
  d = r(d, '(^|="|>)([0-9,]+) amigos en común(?=($|"|<))', "$1"+"$2"+" amigos comuns");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"UNA HISTORIA NUEVA");
  d = r(d, '(^|="|>)([0-9,]+) HISTORIAS NUEVAS(?=($|"|<))', "$1"+"$2"+" HISTORIAS NUEVAS");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"unatro mas");
  d = r(d, '(^|>)otras ([0-9,]+) personas más(?=($|<))', "$1"+"atros "+"$2"+" mas");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"unatro amigo");
  d = r(d, '(^|>)([0-9,]+) amigos más(?=($|<))', "$1"+"atros "+"$2"+" amigos");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"unatra pachina");
  d = r(d, '(^|>)([0-9,]+) páginas más(?=($|<))', "$1"+"atras "+"$2"+" pachinas");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"unatra persona");
  d = r(d, '(^|>)otras ([0-9,]+) personas más(?=($|<))', "$1"+"atras "+"$2"+" personas");
  d = r(d, '(^|="|>)Una persona(?=($|"|<))', "$1"+"una persona");
  d = r(d, '(^|="|>)([0-9,]+) personas(?=($|"|<))', "$1"+"$2"+" personas");
  d = r(d, '(^|="|>)Hace un segundo(?=($|"|<))', "$1"+"en fa un segundo");
  d = r(d, '(^|="|>)Hace ([0-9,]+) segundos(?=($|"|<))', "$1"+"en fa "+"$2"+" segundos");
  d = r(d, '(^|="|>)1 vez compartido(?=($|"|<))', "$1"+"Compartiu una vegada");
  d = r(d, '(^|="|>)([0-9,]+) veces compartido(?=($|"|<))', "$1"+"Compartiu "+"$2"+" vegadas");
  d = r(d, '(^|="|>)Editar opciones(?=($|"|<))', "$1"+"Editar Opcions");
  d = r(d, '(^|="|>)Editar o eliminar(?=($|"|<))', "$1"+"Editar u Borrar");
  d = r(d, '(^|="|>)Español(?=($|"|<))', "$1"+"Aragonés");
  d = r(d, '(^|="|>)Escribe el nombre o correo electrónico de un amigo(?=($|"|<))', "$1"+"Escribe o nombre d'un amigo u a suya adreza de correu");
  d = r(d, '(^|="|>)Buscar amigos(?=($|"|<))', "$1"+"Trobar amigos míos");
  d = r(d, '(^|="|>)Amigos conectados(?=($|"|<))', "$1"+"Amigos connectaus");
  d = r(d, '(^|="|>)Solicitudes de amistad(?=($|"|<))', "$1"+"Demandas d'amistanza");
  d = r(d, '(^|="|>)GRUPOS(?=($|"|<))', "$1"+"COLLAS");
  d = r(d, '(^|="|>)Ayuda(?=($|"|<))', "$1"+"Aduya");
  d = r(d, '(^|="|>)Acontecimiento importante(?=($|"|<))', "$1"+"Episodios importants");
  d = r(d, '(^|="|>)Me gusta(?=($|"|<))', "$1"+"Me fa goyo");
  d = r(d, '(^|="|>)Me gusta(?=($|"|<))', "$1"+"Me fa goyo");
  d = r(d, '(^|="|>)Me gusta(?=($|"|<))', "$1"+"Me fa goyo");
  d = r(d, '(^|="|>)Me gusta esta página(?=($|"|<))', "$1"+"Me fa goyo ista pachina");
  d = r(d, '(^|="|>)Enlaces(?=($|"|<))', "$1"+"Vinclos");
  d = r(d, '(^|="|>)Mensaje:(?=($|"|<))', "$1"+"Mensache:");
  d = r(d, '(^|="|>)Mensajes(?=($|"|<))', "$1"+"Mensaches");
  d = r(d, '(^|="|>)Fotos subidas con el celular(?=($|"|<))', "$1"+"Puyadas dende o mobil");
  d = r(d, '(^|="|>)Más(?=($|"|<))', "$1"+"Mas");
  d = r(d, '(^|="|>)MÁS(?=($|"|<))', "$1"+"MAS");
  d = r(d, '(^|="|>)Más historias(?=($|"|<))', "$1"+"Mas historias");
  d = r(d, '(^|="|>)Más recientes(?=($|"|<))', "$1"+"Mas recients");
  d = r(d, '(^|="|>)Música(?=($|"|<))', "$1"+"Musica");
  d = r(d, '(^|="|>)Nuevo mensaje(?=($|"|<))', "$1"+"Nuevo mensache");
  d = r(d, '(^|="|>)Noticias(?=($|"|<))', "$1"+"Nueva canal (feed)");
  d = r(d, '(^|="|>)Notificaciones(?=($|"|<))', "$1"+"Notificacions");
  d = r(d, '(^|="|>)En otro momento(?=($|"|<))', "$1"+"No pas agora");
  d = r(d, '(^|="|>)Ahora(?=($|"|<))', "$1"+"Agora");
  d = r(d, '(^|="|>)PÁGINAS(?=($|"|<))', "$1"+"PACHINAS");
  d = r(d, '(^|="|>)Personas a las que les gusta(?=($|"|<))', "$1"+"Chent que le fa goyo isto");
  d = r(d, '(^|="|>)Personas que quizá conozcas(?=($|"|<))', "$1"+"Chent que talment conoixes");
  d = r(d, '(^|="|>)Foto(?=($|"|<))', "$1"+"Adhibe una foto");
  d = r(d, '(^|="|>)Lugar(?=($|"|<))', "$1"+"Puesto");
  d = r(d, '(^|="|>)Lugares(?=($|"|<))', "$1"+"Puestos");
  d = r(d, '(^|="|>)Toques(?=($|"|<))', "$1"+"Trucos");
  d = r(d, '(^|="|>)Privacidad(?=($|"|<))', "$1"+"Privacidat");
  d = r(d, '(^|="|>)Configuración de la privacidad(?=($|"|<))', "$1"+"Achustes de privacidat");
  d = r(d, '(^|="|>)Actividad reciente(?=($|"|<))', "$1"+"Actividat recient");
  d = r(d, '(^|="|>)Páginas recomendadas(?=($|"|<))', "$1"+"Pachinas recomendadas");
  d = r(d, '(^|="|>)Eliminar Vista Previa(?=($|"|<))', "$1"+"Borrar l'anvista previa");
  d = r(d, '(^|="|>)Cambiar tamaño(?=($|"|<))', "$1"+"Cambiar a mida");
  d = r(d, '(^|="|>)Buscar(?=($|"|<))', "$1"+"Mirar-lo");
  d = r(d, '(^|="|>)Buscar personas, lugares y cosas(?=($|"|<))', "$1"+"Mirar chent, puestos y cosas");
  d = r(d, '(^|="|>)Ver tod[ao]s(?=($|"|<))', "$1"+"Veyer-las todas");
  d = r(d, '(^|="|>)Ver todas las solicitudes de amistad(?=($|"|<))', "$1"+"Veyer todas as demandas d'amistanza");
  d = r(d, '(^|="|>)Ver todos los mensajes(?=($|"|<))', "$1"+"Veyer totz os mensaches");
  d = r(d, '(^|="|>)Ver todas las notificaciones(?=($|"|<))', "$1"+"Veyer todas as notificaciones");
  d = r(d, '(^|="|>)Ver amistad(?=($|"|<))', "$1"+"Veyer os vinclos d'amistanza");
  d = r(d, '(^|="|>)Ver más(?=($|"|<))', "$1"+"Veyer-ne mas");
  d = r(d, '(^|="|>)Ver traducción(?=($|"|<))', "$1"+"Veyer a traducción");
  d = r(d, '(^|="|>)Enviar(?=($|"|<))', "$1"+"Ninviar");
  d = r(d, '(^|="|>)Enviar un mensaje nuevo(?=($|"|<))', "$1"+"Ninviar un nuevo mensache");
  d = r(d, '(^|="|>)Anuncios(?=($|"|<))', "$1"+"Publicidat");
  d = r(d, '(^|="|>)Estado(?=($|"|<))', "$1"+"Estau");
  d = r(d, '(^|="|>)Suscripciones(?=($|"|<))', "$1"+"Condutas");
  d = r(d, '(^|="|>)Etiquetar a amigos(?=($|"|<))', "$1"+"Etiquetar a os amigos");
  d = r(d, '(^|="|>)Condiciones(?=($|"|<))', "$1"+"Condicions");
  d = r(d, '(^|="|>)Información instantánea(?=($|"|<))', "$1"+"Teletipo");
  d = r(d, '(^|="|>)Biografía(?=($|"|<))', "$1"+"Cronolochía");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) cerca de (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+", amán de "+"$3");
  d = r(d, '(^|="|>)Para:(?=($|"|<))', "$1"+"Ta:");
  d = r(d, '(^|="|>)Historias destacadas(?=($|"|<))', "$1"+"Mas importants");
  d = r(d, '(^|="|>)Ya no me gusta(?=($|"|<))', "$1"+"Ya no me fa goyo");
  d = r(d, '(^|="|>)Actualizar información(?=($|"|<))', "$1"+"Esviellar a información");
  d = r(d, '(^|="|>)Estado(?=($|"|<))', "$1"+"Esviella lo estau");
  d = r(d, '(^|="|>)Usar Facebook como:(?=($|"|<))', "$1"+"Fer servir Facebook como:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Veyer un comentario");
  d = r(d, '(^|="|>)Ver todos los ([0-9,]+) comentarios(?=($|"|<))', "$1"+"Veyer totz os "+"$2"+" comentarios");
  d = r(d, '(^|="|>)Fotos del muro(?=($|"|<))', "$1"+"Fotos de paret");
  d = r(d, '(^|="|>)Te damos la bienvenida(?=($|"|<))', "$1"+"Bienveniu");
  d = r(d, '(^|="|>)¿Qué estás pensando\\?(?=($|"|<))', "$1"+"En qué yes pensando?");
  d = r(d, '(^|="|>)Escribe un comentario\.\.\.(?=($|"|<))', "$1"+"Fer un comentario...");
  d = r(d, '(^|="|>)Ayer(?=($|"|<))', "$1"+"Ahiere");
  d = r(d, '(^|="|>)Ayer a las ([^<"]+)(?=($|"|<))', "$1"+"Ahiere a la(s) "+"$2");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) y a ti les gusta esto\.(?=($|"|<))', "$1"+"A tu y a "+"$2"+" tos fa goyo isto.");
  d = r(d, '(^|="|>)A ti, (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) les gusta esto\.(?=($|"|<))', "$1"+"A tu, a "+"$2"+" y a "+"$3"+" tos fa goyo isto.");
  d = r(d, '(^|="|>)Te gusta esto\.(?=($|"|<))', "$1"+"Te fa goyo isto.");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" de chinero de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de chinero a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero(?=($|"|<))', "$1"+"$2"+" de chinero");
  d = r(d, '(^|="|>)enero(?=($|"|<))', "$1"+"chinero");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de chinero de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" de febrero de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de febrero a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero(?=($|"|<))', "$1"+"$2"+" de febrero");
  d = r(d, '(^|="|>)febrero(?=($|"|<))', "$1"+"febrero");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de febrero de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" de marzo de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de marzo a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo(?=($|"|<))', "$1"+"$2"+" de marzo");
  d = r(d, '(^|="|>)marzo(?=($|"|<))', "$1"+"marzo");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de marzo de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'abril de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'abril a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril(?=($|"|<))', "$1"+"$2"+" d'abril");
  d = r(d, '(^|="|>)abril(?=($|"|<))', "$1"+"abril");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'abril de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" de mayo de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de mayo a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo(?=($|"|<))', "$1"+"$2"+" de mayo");
  d = r(d, '(^|="|>)mayo(?=($|"|<))', "$1"+"mayo");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de mayo de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" de chunyo de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de chunyo a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio(?=($|"|<))', "$1"+"$2"+" de chunyo");
  d = r(d, '(^|="|>)junio(?=($|"|<))', "$1"+"chunyo");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de chunyo de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de [Jj]ulio de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" de chulio de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de [Jj]ulio a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de chulio a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de [Jj]ulio(?=($|"|<))', "$1"+"$2"+" de chulio");
  d = r(d, '(^|="|>)[Jj]ulio(?=($|"|<))', "$1"+"chulio");
  d = r(d, '(^|="|>)([0-9]{1,2}) de [Jj]ulio de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de chulio de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'agosto de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'agosto a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto(?=($|"|<))', "$1"+"$2"+" d'agosto");
  d = r(d, '(^|="|>)agosto(?=($|"|<))', "$1"+"agosto");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'agosto de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" de setiembre de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de setiembre a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre(?=($|"|<))', "$1"+"$2"+" de setiembre");
  d = r(d, '(^|="|>)septiembre(?=($|"|<))', "$1"+"setiembre");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de setiembre de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'octubre de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'octubre a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre(?=($|"|<))', "$1"+"$2"+" d'octubre");
  d = r(d, '(^|="|>)octubre(?=($|"|<))', "$1"+"octubre");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'octubre de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" de noviembre de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de noviembre a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre(?=($|"|<))', "$1"+"$2"+" de noviembre");
  d = r(d, '(^|="|>)noviembre(?=($|"|<))', "$1"+"noviembre");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" de noviembre de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" d'aviento de "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'aviento a la(s) "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre(?=($|"|<))', "$1"+"$2"+" d'aviento");
  d = r(d, '(^|="|>)diciembre(?=($|"|<))', "$1"+"aviento");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" d'aviento de "+"$3"+", a la(s) "+"$4");
  d = r(d, '(^|="|>)El [Ll]unes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lo luns a las "+"$2");
  d = r(d, '(^|="|>)[Ll]unes(?=($|"|<))', "$1"+"luns");
  d = r(d, '(^|="|>)El [Mm]artes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lo martz a las "+"$2");
  d = r(d, '(^|="|>)[Mm]artes(?=($|"|<))', "$1"+"martz");
  d = r(d, '(^|="|>)El [Mm]iércoles a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lo mierques a las "+"$2");
  d = r(d, '(^|="|>)[Mm]iércoles(?=($|"|<))', "$1"+"mierques");
  d = r(d, '(^|="|>)El [Jj]ueves a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lo chueus a las "+"$2");
  d = r(d, '(^|="|>)[Jj]ueves(?=($|"|<))', "$1"+"chueus");
  d = r(d, '(^|="|>)El [Vv]iernes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lo viernes a las "+"$2");
  d = r(d, '(^|="|>)[Vv]iernes(?=($|"|<))', "$1"+"viernes");
  d = r(d, '(^|="|>)El [Ss]ábado a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lo sabado a las "+"$2");
  d = r(d, '(^|="|>)[Ss]ábado(?=($|"|<))', "$1"+"sabado");
  d = r(d, '(^|="|>)El [Dd]omingo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lo domingo a las "+"$2");
  d = r(d, '(^|="|>)[Dd]omingo(?=($|"|<))', "$1"+"domingo");
  d = r(d, '(^|>)enlace(?=($|<))', "$1"+"vinclo");
  d = r(d, '(^|>)publicación(?=($|<))', "$1"+"dentrada");
  d = r(d, '(^|>)estado(?=($|<))', "$1"+"estau");
  return d;
}

function translateOnInsert( node ) {

  //var logmsg = 'inserted a ' + node.nodeName + ' node; untranslated elements: ';
  for (n = 0; n < tags.length; n++) {
    var tagmatches = node.getElementsByTagName(tags[n]);
    for ( i = 0; i < tagmatches.length; i++ ) {
      // innerHTML often empty (never null)
      if (!tagmatches[i].hasAttribute('indigenous') &&
           tagmatches[i].innerHTML != '') {
        // logmsg = logmsg + tagmatches[i].nodeName + ' ';
        tagmatches[i].innerHTML = translate(tagmatches[i].innerHTML);
        tagmatches[i].setAttribute('indigenous', true);
      }
    }
  }

  var divs = node.getElementsByTagName('div');
  for (i = 0; i < divs.length; i++ ) {
    if (!divs[i].hasAttribute('indigenous')) {
      for (n = 0; n < divclasses.length; n++) {
        if (divs[i].className == divclasses[n]) {
          // logmsg = logmsg + 'DIV.' + divclasses[n] + ' ';
          divs[i].innerHTML = translate(divs[i].innerHTML);
          divs[i].setAttribute('indigenous', true);
          break;
        }
      }
    }
  }

  var spans = node.getElementsByTagName('span');
  for (i = 0; i < spans.length; i++ ) {
    if (!spans[i].hasAttribute('indigenous')) {
      for (n = 0; n < spanclasses.length; n++) {
        if (spans[i].className == spanclasses[n]) {
          // logmsg = logmsg + 'SPAN.' + spanclasses[n] + ' ';
          spans[i].innerHTML = translate(spans[i].innerHTML);
          spans[i].setAttribute('indigenous', true);
          break;
        }
      }
    }
  }
  // GM_log(logmsg);
}

// This is (only) needed to handle updates to time stamps
function listen_for_change(evt)
{
  var node = evt.target;
  //GM_log('in change node, data='+node.data+'; was='+evt.prevValue);
  document.body.removeEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  node.data = translate(node.data);
  document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
}

function listen_for_add(evt)
{
  var node = evt.target;
  if (node.nodeType == document.ELEMENT_NODE &&
      node.nodeName != 'SCRIPT' &&
      node.nodeName != 'INPUT') {
    document.body.removeEventListener( 'DOMNodeInserted', listen_for_add, false );
    translateOnInsert(node);
    document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  }
}

function initme()
{
  document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  document.body.innerHTML = translate(document.body.innerHTML);
}

document.addEventListener( "DOMContentLoaded", initme, false);
