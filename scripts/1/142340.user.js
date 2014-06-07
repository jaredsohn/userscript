// ==UserScript==
// @name           facebook-quc
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into K'iche'
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.3
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-09-18
// Translations:   Diego Alburez, David Elías Ixmatá, Elena Tambriz Tahay, Biviana Tum Macario, Luis Francisco Jamínez, Ricardo Guarchaj, Elizabeth Tambriz, Catarina Cajtunaj

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
//divclasses.push('UIImageBlock_Content UIImageBlock_ICON_Content');  // 2 people like this
divclasses.push('_8m _8u'); // 2 people like this (etc.)
//divclasses.push('_29j _29k'); // 2 people like this (etc.)
//divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent -cx-PRIVATE-uiImageBlockDeprecated__content'); // 2 people like this (etc.)
//divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent _29j -cx-PRIVATE-uiImageBlockDeprecated__content _29k'); // 2 people like this (etc.)
//divclasses.push('commentActions fsm fwn fcg'); // time stamps on comments
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
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> y a ti les gusta esto\.</span>(?=($|"|<))', "$1"+"At, chi'l "+"$2"+" utz kiwil wa'.");
  d = r(d, '(^|="|>)<span[^>]+>A ti, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> y </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> les gusta esto\.</span>(?=($|"|<))', "$1"+"At, "+"$2"+" chi'l "+"$3"+" utz kiwil wa'.");
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+>, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> y </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> les gusta esto\.</span>(?=($|"|<))', "$1"+"$2"+", "+"$3"+" chi'l "+"$4"+" utz kakil wa'.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó una nueva foto\.(?=($|"|<))', "$1"+"$2"+" xuch'ap jun k'ak' wachib'al.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó ([0-9,]+) fotos nuevas\.(?=($|"|<))', "$1"+"$2"+" agregó "+"$3"+" taq k'ak' wachib'al.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó una foto nueva al álbum (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" xuch'ap jun k'ak' wachib'al pa le k'olib'al "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó ([0-9,]+) fotos nuevas al álbum (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" agregó "+"$3"+" taq k'ak' wachib'al pa le k'olib'al "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) ahora son amigos\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" rachi'il chik chanim.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) comentaron una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" y "+"$3"+" xetzijon chi rij jun "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) les gusta (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" chi'l "+"$3"+" utz kakilo "+"$4"+".");
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> y </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> les gusta esto\.</span>(?=($|"|<))', "$1"+"$2"+" chi'l "+"$3"+" utz kakil wa'.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" chi'l "+"$3"+" xkikomonej "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron e?la? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" chi'l "+"$3"+" xkikomonej u"+"$4"+" "+"$5"+".");
  d = r(d, '(^|="|>)Acerca de(?=($|"|<))', "$1"+"Chi rij");
  d = r(d, '(^|="|>)Hace aproximadamente una hora(?=($|"|<))', "$1"+"k'ate nima jun ramaj kanoq");
  d = r(d, '(^|="|>)Hace un minuto aproximadamente(?=($|"|<))', "$1"+"k'ate nima jun kajb'al kanoq");
  d = r(d, '(^|="|>)Configuración de la cuenta(?=($|"|<))', "$1"+"Suk'manem rech le kemb'i'aj");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) cambió la foto de su perfil\.(?=($|"|<))', "$1"+"$2"+" xuk'ex le wachib'al rech le uchol k'aslemal.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) cambió la foto de su perfil\.(?=($|"|<))', "$1"+"$2"+" xuk'ex le wachib'al rech le uchol k'aslemal.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" xutzijoj pa jun "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha comentado su (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" xutzijoj pa le u"+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha comentado su (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" xutzijoj pa le u"+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó tu (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" xutzijoj pa le a "+"$3"+".");
  d = r(d, '(^|="|>)Registro de actividad(?=($|"|<))', "$1"+"Ucholajil B'anowem");
  d = r(d, '(^|="|>)Agregar a mis amigos(?=($|"|<))', "$1"+"Utiqik achi'il");
  d = r(d, '(^|="|>)Agregar intereses\.\.\.(?=($|"|<))', "$1"+"Uya'ik Rayib'al k'u'xaj...");
  d = r(d, '(^|="|>)Foto/video(?=($|"|<))', "$1"+"Wachib'al / Silob'wachib'al");
  d = r(d, '(^|="|>)Publicidad(?=($|"|<))', "$1"+"Jab'unik");
  d = r(d, '(^|="|>)Hace unos segundos(?=($|"|<))', "$1"+"k'ate jutz'it ri'");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" utz karilo "+"$3"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" utz karilo jun "+"$3"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta e?la? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" utz karilo u"+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" utz karilo "+"$3"+" xuquje' "+"$4"+".");
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> le gusta esto\.</span>(?=($|"|<))', "$1"+"$2"+" utz karilo wa'.");
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> les gusta esto\.</span>(?=($|"|<))', "$1"+"$2"+" utz kakilo wa'.");
  d = r(d, '(^|>)un enlace(?=($|<))', "$1"+"jun kemwiqb'al");
  d = r(d, '(^|="|>)APLICACIONES(?=($|"|<))', "$1"+"KEMWACH");
  d = r(d, '(^|="|>)Aplicaciones y juegos(?=($|"|<))', "$1"+"Kemwach xuquje' etz'anem");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" xukomonej "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió e?la? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" xukomonej u"+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)Pregunta(?=($|"|<))', "$1"+"Uta'ik k'otoj chi'aj");
  d = r(d, '(^|="|>)Se ha etiquetado a (<a [^>]+>[^<]+</a>) en e?la? (<a [^>]+>[^<]+</a>) de (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Xkoj retal "+"$2"+" pa u"+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)Se etiquetó a (<a [^>]+>[^<]+</a>) en una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Xkoj retal "+"$2"+" pa jun "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"$2"+" xkoj retal pa uwachib'al "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) actualizó la foto de su portada\.(?=($|"|<))', "$1"+"$2"+" xuk'ak'arisaj le uwachib'al rech le uwach.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) actualizó la foto de su portada\.(?=($|"|<))', "$1"+"$2"+" xuk'ak'arisaj le uwachib'al rech le uwach.");
  d = r(d, '(^|="|>)Nacimiento(?=($|"|<))', "$1"+"Alaxinaq pa");
  d = r(d, '(^|="|>)De:(?=($|"|<))', "$1"+"Rech:");
  d = r(d, '(^|="|>)Cancelar(?=($|"|<))', "$1"+"Uq'atexik");
  d = r(d, '(^|="|>)Empleo(?=($|"|<))', "$1"+"Uchak");
  d = r(d, '(^|="|>)Cambiar portada(?=($|"|<))', "$1"+"Uk'exik");
  d = r(d, '(^|="|>)Chat \\(Desconectado\\)(?=($|"|<))', "$1"+"Chat (Man t'iqil taj)");
  d = r(d, '(^|="|>)Cerrar(?=($|"|<))', "$1"+"Utz'apixik");
  d = r(d, '(^|="|>)Mejores amigos(?=($|"|<))', "$1"+"Utz taq achi'il");
  d = r(d, '(^|="|>)Comentar(?=($|"|<))', "$1"+"Utzijoxik");
  d = r(d, '(^|="|>)Confirmar(?=($|"|<))', "$1"+"Uk'ulaxik");
  d = r(d, '(^|="|>)Crear un anuncio(?=($|"|<))', "$1"+"Uwinaqirisaxik jun ub'ixikil");
  d = r(d, '(^|="|>)Crear una página(?=($|"|<))', "$1"+"Uwinaqirisaxik jun uxaq web'");
  d = r(d, '(^|="|>)Crear un grupo\.\.\.(?=($|"|<))', "$1"+"Uwinaqirisaxik jun Wokaj...");
  d = r(d, '(^|="|>)Crear un grupo(?=($|"|<))', "$1"+"Uwinaqirisaxik jun Wokaj");
  d = r(d, '(^|="|>)Desarrolladores(?=($|"|<))', "$1"+"Wokonelab'");
  d = r(d, '(^|="|>)Hace una hora(?=($|"|<))', "$1"+"k'ate 1 ramaj kanoq");
  d = r(d, '(^|="|>)Hace ([0-9,]+) horas(?=($|"|<))', "$1"+"k'ate "+"$2"+" ramaj kanoq");
  d = r(d, '(^|="|>)Hace un minuto(?=($|"|<))', "$1"+"k'ate 1 kajb'al kanoq");
  d = r(d, '(^|="|>)Hace ([0-9,]+) minutos(?=($|"|<))', "$1"+"k'ate "+"$2"+" kajb'al kanoq");
  d = r(d, '(^|="|>)1 amigo\\(a\\) en común(?=($|"|<))', "$1"+"1 komonetal achi'il");
  d = r(d, '(^|="|>)([0-9,]+) amigos en común(?=($|"|<))', "$1"+"$2"+" komonetal achi'il");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 K'AK' UTZIJOB'EXIK K'ASLEMAL");
  d = r(d, '(^|="|>)([0-9,]+) HISTORIAS NUEVAS(?=($|"|<))', "$1"+"$2"+" K'AK' UTZIJOB'EXIK K'ASLEMAL");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 winaq chik");
  d = r(d, '(^|>)otras ([0-9,]+) personas más(?=($|<))', "$1"+" "+"$2"+" nik'aj winaq chik");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"1 chik awachi'il");
  d = r(d, '(^|>)([0-9,]+) amigos más(?=($|<))', "$1"+"$2"+" nik'aj awachi'il chik");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"1 chik uxaq web'");
  d = r(d, '(^|>)([0-9,]+) páginas más(?=($|<))', "$1"+"$2"+" nik'aj chik uxaq web'");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"1 winaq chik");
  d = r(d, '(^|>)otras ([0-9,]+) personas más(?=($|<))', "$1"+"$2"+" nik'aj winaq chik");
  d = r(d, '(^|="|>)Una persona(?=($|"|<))', "$1"+"1 winaq");
  d = r(d, '(^|="|>)([0-9,]+) personas(?=($|"|<))', "$1"+"$2"+" e winaq");
  d = r(d, '(^|="|>)Hace un segundo(?=($|"|<))', "$1"+"k'ate jun kajb'al kanoq");
  d = r(d, '(^|="|>)Hace ([0-9,]+) segundos(?=($|"|<))', "$1"+"k'ate "+"$2"+" kajb'al kanoq");
  d = r(d, '(^|="|>)1 vez compartido(?=($|"|<))', "$1"+"Jumul xjab'uxik");
  d = r(d, '(^|="|>)([0-9,]+) veces compartido(?=($|"|<))', "$1"+"$2"+" mul xjab'uxik");
  d = r(d, '(^|="|>)Editar opciones(?=($|"|<))', "$1"+"Uk'exsuk'umaxik Chakub'al");
  d = r(d, '(^|="|>)Editar o eliminar(?=($|"|<))', "$1"+"Uk'exsuk'umaxik on Uchupik");
  d = r(d, '(^|="|>)Español(?=($|"|<))', "$1"+"K'iche'");
  d = r(d, '(^|="|>)Escribe el nombre o correo electrónico de un amigo(?=($|"|<))', "$1"+"Chatz'ib'aj le ub'i' on taqoqxa'n rech jun awachi'il");
  d = r(d, '(^|="|>)Eventos(?=($|"|<))', "$1"+"K'ulmatajem");
  d = r(d, '(^|="|>)Familia(?=($|"|<))', "$1"+"Chalaxik");
  d = r(d, '(^|="|>)FAVORITOS(?=($|"|<))', "$1"+"AJAWATALIK");
  d = r(d, '(^|="|>)Buscar amigos(?=($|"|<))', "$1"+"Utzukuxik awachi'il");
  d = r(d, '(^|="|>)Encuentra más páginas(?=($|"|<))', "$1"+"Uriqik k'i uxaq web'");
  d = r(d, '(^|="|>)Amigos conectados(?=($|"|<))', "$1"+"Awachi'il e k'o pa chat");
  d = r(d, '(^|="|>)Solicitudes de amistad(?=($|"|<))', "$1"+"Tz'onoj rech achi'il");
  d = r(d, '(^|="|>)Amigos(?=($|"|<))', "$1"+"Awachi'il");
  d = r(d, '(^|="|>)AMIGOS(?=($|"|<))', "$1"+"ACHI'IL");
  d = r(d, '(^|="|>)GRUPOS(?=($|"|<))', "$1"+"WOKAJ");
  d = r(d, '(^|="|>)Ayuda(?=($|"|<))', "$1"+"Tob'anem");
  d = r(d, '(^|="|>)Inicio(?=($|"|<))', "$1"+"Umajib'al");
  d = r(d, '(^|="|>)INTERESES(?=($|"|<))', "$1"+"RAYIB'AL K'U'XAJ");
  d = r(d, '(^|="|>)Acontecimiento importante(?=($|"|<))', "$1"+"K'ulmatajem qas rajawaxik");
  d = r(d, '(^|="|>)Me gusta(?=($|"|<))', "$1"+"Utz kinwilo");
  d = r(d, '(^|="|>)Me gusta(?=($|"|<))', "$1"+"Utz kinwilo");
  d = r(d, '(^|="|>)Me gusta esta página(?=($|"|<))', "$1"+"Utz kinwilo");
  d = r(d, '(^|="|>)Me gusta esta página(?=($|"|<))', "$1"+"Utz kawil we uxaq web'");
  d = r(d, '(^|="|>)Enlaces(?=($|"|<))', "$1"+"E kemwiqb'al");
  d = r(d, '(^|="|>)LISTAS(?=($|"|<))', "$1"+"UCHOLAJIL");
  d = r(d, '(^|="|>)Salir(?=($|"|<))', "$1"+"Utz'apixik kemchak");
  d = r(d, '(^|="|>)Mapa(?=($|"|<))', "$1"+"Uwachib'al ulew");
  d = r(d, '(^|="|>)Mensaje:(?=($|"|<))', "$1"+"Oqxa'n:");
  d = r(d, '(^|="|>)Mensajes(?=($|"|<))', "$1"+"Taq oqxa'n");
  d = r(d, '(^|="|>)Fotos subidas con el celular(?=($|"|<))', "$1"+"Wachib'al paqab'am ruk' le ch'aweb'al");
  d = r(d, '(^|="|>)Más(?=($|"|<))', "$1"+"Nik'aj chik");
  d = r(d, '(^|="|>)MÁS(?=($|"|<))', "$1"+"NIK'AJ CHIK");
  d = r(d, '(^|="|>)Más historias(?=($|"|<))', "$1"+"Nik'aj chik utzijob'exik k'aslemal");
  d = r(d, '(^|="|>)Más recientes(?=($|"|<))', "$1"+"K'ate xya'tajik");
  d = r(d, '(^|="|>)Música(?=($|"|<))', "$1"+"Q'ojom");
  d = r(d, '(^|="|>)Nuevo mensaje(?=($|"|<))', "$1"+"k'ak' oqxa'n");
  d = r(d, '(^|="|>)Noticias(?=($|"|<))', "$1"+"B'anoj");
  d = r(d, '(^|="|>)Notas(?=($|"|<))', "$1"+"Taq ub'ixkil");
  d = r(d, '(^|="|>)Notificaciones(?=($|"|<))', "$1"+"Ub'ixikil");
  d = r(d, '(^|="|>)En otro momento(?=($|"|<))', "$1"+"Pa jutz'it");
  d = r(d, '(^|="|>)Ahora(?=($|"|<))', "$1"+"Chanim");
  d = r(d, '(^|="|>)PÁGINAS(?=($|"|<))', "$1"+"TAQ UXAQ WEB'");
  d = r(d, '(^|="|>)Personas a las que les gusta(?=($|"|<))', "$1"+"E winaq le utz kakil wa'");
  d = r(d, '(^|="|>)Personas que quizá conozcas(?=($|"|<))', "$1"+"E winaq wene' aweta'am kiwach");
  d = r(d, '(^|="|>)Foto(?=($|"|<))', "$1"+"Wachib'al");
  d = r(d, '(^|="|>)Fotos(?=($|"|<))', "$1"+"Taq wachib'al");
  d = r(d, '(^|="|>)Lugar(?=($|"|<))', "$1"+"K'olib'al");
  d = r(d, '(^|="|>)Lugares(?=($|"|<))', "$1"+"Taq k'olib'al");
  d = r(d, '(^|="|>)Toques(?=($|"|<))', "$1"+"Chapik");
  d = r(d, '(^|="|>)Privacidad(?=($|"|<))', "$1"+"Uchajixik");
  d = r(d, '(^|="|>)Configuración de la privacidad(?=($|"|<))', "$1"+"Suk'manem rech le uchajixik");
  d = r(d, '(^|="|>)Perfil(?=($|"|<))', "$1"+"Chol k'aslemal");
  d = r(d, '(^|="|>)Preguntas(?=($|"|<))', "$1"+"Taq k'otoj chi'aj");
  d = r(d, '(^|="|>)Actividad reciente(?=($|"|<))', "$1"+"K'ate xb'antajik");
  d = r(d, '(^|="|>)Páginas recomendadas(?=($|"|<))', "$1"+"Uxaq web' qas utz");
  d = r(d, '(^|="|>)Eliminar Vista Previa(?=($|"|<))', "$1"+"Uchupik nab'e rilik");
  d = r(d, '(^|="|>)Cambiar tamaño(?=($|"|<))', "$1"+"Uk'exik retb'alil");
  d = r(d, '(^|="|>)Escribe un comentario\.\.\.(?=($|"|<))', "$1"+"%s, chatz'ib'aj jun utzijoxik ...");
  d = r(d, '(^|="|>)Buscar(?=($|"|<))', "$1"+"Utzukuxik");
  d = r(d, '(^|="|>)Buscar personas, lugares y cosas(?=($|"|<))', "$1"+"Utzukuxik winaq, k'olib'al, y chokonisab'al");
  d = r(d, '(^|="|>)Ver tod[ao]s(?=($|"|<))', "$1"+"Rilik ronojel");
  d = r(d, '(^|="|>)Ver todas las solicitudes de amistad(?=($|"|<))', "$1"+"Rilik ronojel taq tz'onoj rech achi'il");
  d = r(d, '(^|="|>)Ver todos los mensajes(?=($|"|<))', "$1"+"Rilik ronojel taqoqxa'n");
  d = r(d, '(^|="|>)Ver todas las notificaciones(?=($|"|<))', "$1"+"Rilik ronojel le ub'ixikil");
  d = r(d, '(^|="|>)Ver amistad(?=($|"|<))', "$1"+"Rilik achi'il");
  d = r(d, '(^|="|>)Ver más(?=($|"|<))', "$1"+"Rilik nik'aj chik");
  d = r(d, '(^|="|>)Ver traducción(?=($|"|<))', "$1"+"Rilik q'axel tzij");
  d = r(d, '(^|="|>)Enviar(?=($|"|<))', "$1"+"Utaqik");
  d = r(d, '(^|="|>)Enviar un mensaje nuevo(?=($|"|<))', "$1"+"Utaqik jun k'ak' taqoqxa'n");
  d = r(d, '(^|="|>)Compartir(?=($|"|<))', "$1"+"Ukomonexik");
  d = r(d, '(^|="|>)ORDENAR(?=($|"|<))', "$1"+"UCHOLIK");
  d = r(d, '(^|="|>)Anuncios(?=($|"|<))', "$1"+"Ya'onel ub'ixik");
  d = r(d, '(^|="|>)Estado(?=($|"|<))', "$1"+"Chomanik");
  d = r(d, '(^|="|>)Suscripciones(?=($|"|<))', "$1"+"Taq utz'ib'axik ib'");
  d = r(d, '(^|="|>)Grupos sugeridos(?=($|"|<))', "$1"+"Molaj uqxa'netalik");
  d = r(d, '(^|="|>)Etiquetar a amigos(?=($|"|<))', "$1"+"Ukojik ketal le awachi'il");
  d = r(d, '(^|="|>)Condiciones(?=($|"|<))', "$1"+"Ajawatajem");
  d = r(d, '(^|="|>)Información instantánea(?=($|"|<))', "$1"+"Aninaqil q'alajisanem");
  d = r(d, '(^|="|>)Biografía(?=($|"|<))', "$1"+"Uq'alajisaxik k'aslemal");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) cerca de (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" chi unaqaj le "+"$3");
  d = r(d, '(^|="|>)Para:(?=($|"|<))', "$1"+"Chech:");
  d = r(d, '(^|="|>)Historias destacadas(?=($|"|<))', "$1"+"Utzijoxik k'aslemal qas kajawatajik");
  d = r(d, '(^|="|>)Ya no me gusta(?=($|"|<))', "$1"+"Utz ta chi kinwilo'");
  d = r(d, '(^|="|>)Actualizar información(?=($|"|<))', "$1"+"Uk'ak'arisaxik q'alajisanem");
  d = r(d, '(^|="|>)Estado(?=($|"|<))', "$1"+"Uk'ak'arisaxik chomanik");
  d = r(d, '(^|="|>)Usar Facebook como:(?=($|"|<))', "$1"+"Ukojik Facebook pacha':");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Rilik 1 utzijob'exik");
  d = r(d, '(^|="|>)Ver todos los ([0-9,]+) comentarios(?=($|"|<))', "$1"+"Rilik ronojel "+"$2"+" taq utzijob'exik");
  d = r(d, '(^|="|>)Fotos del muro(?=($|"|<))', "$1"+"Wachib'al k'o pa le kemtapya'");
  d = r(d, '(^|="|>)Te damos la bienvenida(?=($|"|<))', "$1"+"Utz awulib'al");
  d = r(d, '(^|="|>)¿Qué estás pensando\\?(?=($|"|<))', "$1"+"¿Jas tajin kachomaj?");
  d = r(d, '(^|="|>)Escribe un comentario\.\.\.(?=($|"|<))', "$1"+"Chatz'ib'aj jun utzijoxik...");
  d = r(d, '(^|="|>)Ayer(?=($|"|<))', "$1"+"Iwir");
  d = r(d, '(^|="|>)Ayer a las ([^<"]+)(?=($|"|<))', "$1"+"Iwir pa taq "+"$2");
  d = r(d, '(^|="|>)<span[^>]+>Te gusta esto\.</span>(?=($|"|<))', "$1"+"Utz kawil wa'.");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech nab'e ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech nab'e ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero(?=($|"|<))', "$1"+"$2"+" rech nab'e ik'");
  d = r(d, '(^|="|>)enero(?=($|"|<))', "$1"+"nab'e ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech nab'e ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech ukab' ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ukab' ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero(?=($|"|<))', "$1"+"$2"+" rech ukab' ik'");
  d = r(d, '(^|="|>)febrero(?=($|"|<))', "$1"+"ukab' ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ukab' ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech urox ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech urox ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo(?=($|"|<))', "$1"+"$2"+" rech urox ik'");
  d = r(d, '(^|="|>)marzo(?=($|"|<))', "$1"+"urox ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech urox ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech ukaj ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ukaj ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril(?=($|"|<))', "$1"+"$2"+" rech ukaj ik'");
  d = r(d, '(^|="|>)abril(?=($|"|<))', "$1"+"ukaj ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ukaj ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech uro ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech uro ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo(?=($|"|<))', "$1"+"$2"+" rech uro ik'");
  d = r(d, '(^|="|>)mayo(?=($|"|<))', "$1"+"uro ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech uro ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech uwaq ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech uwaq ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio(?=($|"|<))', "$1"+"$2"+" rech uwaq ik'");
  d = r(d, '(^|="|>)junio(?=($|"|<))', "$1"+"uwaq ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech uwaq ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de [Jj]ulio de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech uwuq ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de [Jj]ulio a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech uwuq ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de [Jj]ulio(?=($|"|<))', "$1"+"$2"+" rech uwuq ik'");
  d = r(d, '(^|="|>)[Jj]ulio(?=($|"|<))', "$1"+"uwuq ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de [Jj]ulio de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech uwuq ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech uwajxaq ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech uwajxaq ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto(?=($|"|<))', "$1"+"$2"+" rech uwajxaq ik'");
  d = r(d, '(^|="|>)agosto(?=($|"|<))', "$1"+"uwajxaq ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech uwajxaq ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech ub'elej ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ub'elej ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre(?=($|"|<))', "$1"+"$2"+" rech ub'elej ik'");
  d = r(d, '(^|="|>)septiembre(?=($|"|<))', "$1"+"ub'elej ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ub'elej ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech ulaj ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ulaj ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre(?=($|"|<))', "$1"+"$2"+" rech ulaj ik'");
  d = r(d, '(^|="|>)octubre(?=($|"|<))', "$1"+"ulaj ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ulaj ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech ujulaj ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ujulaj ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre(?=($|"|<))', "$1"+"$2"+" rech ujulaj ik'");
  d = r(d, '(^|="|>)noviembre(?=($|"|<))', "$1"+"ujulaj ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ujulaj ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre de ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rech ukab'laj ik' rech "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ukab'laj ik' pa taq "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre(?=($|"|<))', "$1"+"$2"+" rech ukab'laj ik'");
  d = r(d, '(^|="|>)diciembre(?=($|"|<))', "$1"+"ukab'laj ik'");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" rech ukab'laj ik' rech "+"$3"+" pa taq "+"$4");
  d = r(d, '(^|="|>)El [Ll]unes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"luq'ij pa taq "+"$2");
  d = r(d, '(^|="|>)[Ll]unes(?=($|"|<))', "$1"+"luq'ij");
  d = r(d, '(^|="|>)El [Mm]artes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"maq'ij pa taq "+"$2");
  d = r(d, '(^|="|>)[Mm]artes(?=($|"|<))', "$1"+"maq'ij");
  d = r(d, '(^|="|>)El [Mm]iércoles a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"miq'ij pa taq "+"$2");
  d = r(d, '(^|="|>)[Mm]iércoles(?=($|"|<))', "$1"+"miq'ij");
  d = r(d, '(^|="|>)El [Jj]ueves a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"juq'ij pa taq "+"$2");
  d = r(d, '(^|="|>)[Jj]ueves(?=($|"|<))', "$1"+"juq'ij");
  d = r(d, '(^|="|>)El [Vv]iernes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"wiq'ij pa taq "+"$2");
  d = r(d, '(^|="|>)[Vv]iernes(?=($|"|<))', "$1"+"wiq'ij");
  d = r(d, '(^|="|>)El [Ss]ábado a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"saq'ij pa taq "+"$2");
  d = r(d, '(^|="|>)[Ss]ábado(?=($|"|<))', "$1"+"saq'ij");
  d = r(d, '(^|="|>)El [Dd]omingo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"toq'ij pa taq "+"$2");
  d = r(d, '(^|="|>)[Dd]omingo(?=($|"|<))', "$1"+"toq'ij");
  d = r(d, '(^|>)acontecimiento importante(?=($|<))', "$1"+"k'ulmatajem qas rajawaxik");
  d = r(d, '(^|>)enlace(?=($|<))', "$1"+"kemwiqb'al");
  d = r(d, '(^|>)foto(?=($|<))', "$1"+"wachib'al");
  d = r(d, '(^|>)publicación(?=($|<))', "$1"+"jab'uxik");
  d = r(d, '(^|>)estado(?=($|<))', "$1"+"chomanik");
  d = r(d, '(^|>)actualización de estado(?=($|<))', "$1"+"uk'ak'arisaxik chomanik");
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

// This was (only) needed to handle updates to time stamps
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
  else if (node.nodeType == document.TEXT_NODE) { // time stamps only
    document.body.removeEventListener( 'DOMNodeInserted', listen_for_add, false );
    node.data = translate(node.data);
    document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  }
}

function initme()
{
  document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  // document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  document.body.innerHTML = translate(document.body.innerHTML);
}

document.addEventListener( "DOMContentLoaded", initme, false);
