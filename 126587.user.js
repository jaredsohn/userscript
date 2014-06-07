// ==UserScript==
// @name           facebook-ppl
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Nawat
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-04-04
// Translations:   Alan King

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
tags.push('a');      // many...
tags.push('h4');     // Sponsored, Ticker, ...
tags.push('h6');     // %a commented on %a.
tags.push('label');  // Comment

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
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Ume ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Se ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chiknawi ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwasen ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwey ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de julio de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikume ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Ume ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Makwil ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Nawi ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Yey ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero de ([0-9]{4}) a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Se ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) compartieron (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wan "+"$3"+" kichijtiwit compartir "+"$4"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) les gusta esto\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" wan "+"$4"+" ingustoj ini.");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Ume ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Ume ka "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Se ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Se ka "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chiknawi ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chiknawi ka "+"$3");
  d = r(d, '(^|="|>)Escribe el nombre o correo electrónico de un amigo(?=($|"|<))', "$1"+"Shiktajkwilu ne itukay se mukunpa o ne idireccion");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti ka "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwasen ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwasen ka "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwey ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwey ka "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de julio de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikume ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de julio a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikume ka "+"$3");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) y (<a [^>]+>[^<]+</a>) les gusta esto\.(?=($|"|<))', "$1"+"$2"+" wan "+"$3"+" ingustoj ini.");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Ume ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Ume ka "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Makwil ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Makwil ka "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Nawi ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Nawi ka "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) compartió (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kichijtuk compartir se "+"$3"+".");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Yey ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Yey ka "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) comentó una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" taketzki ipanpa se "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) cerca de (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"Ka "+"$2"+" nepa "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero de ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Se ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Se ka "+"$3");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta una? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" igustoj se "+"$3"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) y a ti les gusta esto\.(?=($|"|<))', "$1"+"Taja wan uk "+"$2"+" anmugustoj ini.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) agregó una nueva foto\.(?=($|"|<))', "$1"+"$2"+" kitalijtuk se yankwik fotoj.");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" igustoj "+"$3"+".");
  d = r(d, '(^|="|>)([0-9]{1,2}) de diciembre(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Ume");
  d = r(d, '(^|="|>)([0-9]{1,2}) de noviembre(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Se");
  d = r(d, '(^|="|>)Ver los ([0-9,]+) comentarios(?=($|"|<))', "$1"+"Shikita ne "+"$2"+" tay inatiwit ipanpa");
  d = r(d, '(^|="|>)([0-9]{1,2}) de septiembre(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chiknawi");
  d = r(d, '(^|="|>)([0-9]{1,2}) de octubre(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti");
  d = r(d, '(^|="|>)([0-9]{1,2}) de junio(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwasen");
  d = r(d, '(^|="|>)Ver todas las solicitudes de amistad(?=($|"|<))', "$1"+"Ká kineki muchiwa mukunpa");
  d = r(d, '(^|="|>)([0-9]{1,2}) de agosto(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwey");
  d = r(d, '(^|="|>)([0-9]{1,2}) de julio(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikume");
  d = r(d, '(^|="|>)El Miércoles a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne miercoles ka "+"$2");
  d = r(d, '(^|="|>)([0-9]{1,2}) de febrero(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Ume");
  d = r(d, '(^|="|>)([0-9]{1,2}) de mayo(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Makwil");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) les gusta esto\.(?=($|"|<))', "$1"+"$2"+" ingustoj ini.");
  d = r(d, '(^|="|>)([0-9]{1,2}) de abril(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Nawi");
  d = r(d, '(^|="|>)([0-9,]+) veces compartido(?=($|"|<))', "$1"+"$2"+" kichijtiwit compartir ini");
  d = r(d, '(^|="|>)([0-9]{1,2}) de marzo(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Yey");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) le gusta esto\.(?=($|"|<))', "$1"+"$2"+" igustoj ini.");
  d = r(d, '(^|="|>)([0-9]{1,2}) de enero(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Se");
  d = r(d, '(^|="|>)El Domingo a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne domingoj ka "+"$2");
  d = r(d, '(^|="|>)El Viernes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne viernes ka "+"$2");
  d = r(d, '(^|="|>)El Sábado a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne sabadoj ka "+"$2");
  d = r(d, '(^|="|>)([0-9,]+) amigos en común(?=($|"|<))', "$1"+"Kinhishmati "+"$2"+" mukunpa");
  d = r(d, '(^|="|>)Personas que quizá conozcas(?=($|"|<))', "$1"+"Sejse Ká Weli Tikishmati");
  d = r(d, '(^|="|>)El Martes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne martes ka "+"$2");
  d = r(d, '(^|="|>)El Jueves a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne jueves ka "+"$2");
  d = r(d, '(^|="|>)Chat \\(Desconectado\\)(?=($|"|<))', "$1"+"Shichachalaka (Te nemi ashan)");
  d = r(d, '(^|="|>)([0-9,]+) HISTORIAS NUEVAS(?=($|"|<))', "$1"+"$2"+" YANKWIK TAY INATIWIT");
  d = r(d, '(^|="|>)Ver todas las notificaciones(?=($|"|<))', "$1"+"Muchi ne tajtanawatilis");
  d = r(d, '(^|="|>)Actualizar información(?=($|"|<))', "$1"+"Shikpata Tay Tinatuk Mupanpa");
  d = r(d, '(^|="|>)El Lunes a la\\(s\\) ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne lunes ka "+"$2");
  d = r(d, '(^|="|>)Solicitudes de amistad(?=($|"|<))', "$1"+"Ká kineki muchiwa mukunpa");
  d = r(d, '(^|="|>)Eliminar Vista Previa(?=($|"|<))', "$1"+"Shikishti ne Achtutachialis");
  d = r(d, '(^|="|>)Enviar un mensaje nuevo(?=($|"|<))', "$1"+"Shiktukti se Yankwik Amat");
  d = r(d, '(^|="|>)Hace un minuto aproximadamente(?=($|"|<))', "$1"+"ashan se minutoj");
  d = r(d, '(^|="|>)Aplicaciones y juegos(?=($|"|<))', "$1"+"Ajaplicacion wan ajawilti");
  d = r(d, '(^|="|>)Hace ([0-9,]+) segundos(?=($|"|<))', "$1"+"ashan "+"$2"+" segundoj");
  d = r(d, '(^|="|>)Escribe un comentario\.\.\.(?=($|"|<))', "$1"+"Shina se ipanpa...");
  d = r(d, '(^|="|>)Hace ([0-9,]+) minutos(?=($|"|<))', "$1"+"ashan "+"$2"+" minutoj");
  d = r(d, '(^|="|>)Información instantánea(?=($|"|<))', "$1"+"Muchi ne Yajyankwik");
  d = r(d, '(^|="|>)1 amigo\\(a\\) en común(?=($|"|<))', "$1"+"Kishmati se mukunpa");
  d = r(d, '(^|="|>)hace aproximadamente una hora(?=($|"|<))', "$1"+"ashan se horaj");
  d = r(d, '(^|="|>)Fotos subidas con el celular(?=($|"|<))', "$1"+"Iwan se Celular");
  d = r(d, '(^|="|>)Personas a las que les gusta(?=($|"|<))', "$1"+"Ká igustoj ini");
  d = r(d, '(^|="|>)Ver traducción(?=($|"|<))', "$1"+"Shikpata tik ukse taketzalis");
  d = r(d, '(^|="|>)1 vez compartido(?=($|"|<))', "$1"+"Se kichijtuk compartir ini");
  d = r(d, '(^|="|>)Configuración de la privacidad(?=($|"|<))', "$1"+"Muijichtaka");
  d = r(d, '(^|="|>)Crear un grupo\.\.\.(?=($|"|<))', "$1"+"Shiketza se Tepewa...");
  d = r(d, '(^|="|>)Usar Facebook como:(?=($|"|<))', "$1"+"Shikwi Ishkalamat ken:");
  d = r(d, '(^|="|>)Fotos del muro(?=($|"|<))', "$1"+"Fojfotoj ipal ne Tapepechul");
  d = r(d, '(^|="|>)Registro de actividad(?=($|"|<))', "$1"+"Shikita Tay Panutuk");
  d = r(d, '(^|="|>)Hace ([0-9,]+) horas(?=($|"|<))', "$1"+"ashan "+"$2"+" horaj");
  d = r(d, '(^|="|>)Páginas recomendadas(?=($|"|<))', "$1"+"Nusan Weli Mugustoj");
  d = r(d, '(^|="|>)Cambiar tamaño(?=($|"|<))', "$1"+"Shikwepa Mas Wey/Chikitik");
  d = r(d, '(^|="|>)Etiquetar a amigos(?=($|"|<))', "$1"+"Shiktukayti Mukunpawan");
  d = r(d, '(^|="|>)Configuración de la cuenta(?=($|"|<))', "$1"+"Ne mucuentaj");
  d = r(d, '(^|="|>)Amigos conectados(?=($|"|<))', "$1"+"Mukunpawan Ashan Nemit");
  d = r(d, '(^|="|>)Me gusta esta página(?=($|"|<))', "$1"+"Igustoj Ini Iswat");
  d = r(d, '(^|="|>)Historias destacadas(?=($|"|<))', "$1"+"Sejse Tay Inatiwit");
  d = r(d, '(^|="|>)Agregar a mis amigos(?=($|"|<))', "$1"+"Shikchiwa mukunpa");
  d = r(d, '(^|="|>)Crear un anuncio(?=($|"|<))', "$1"+"Shikchiwa se anuncioj");
  d = r(d, '(^|="|>)Editar o eliminar(?=($|"|<))', "$1"+"Shikpata o Shikishti");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Shikajsi Uksejse Iswat");
  d = r(d, '(^|="|>)Acontecimiento importante(?=($|"|<))', "$1"+"Tay Muchijki");
  d = r(d, '(^|="|>)Más recientes(?=($|"|<))', "$1"+"Yajyankwik Tay Inatiwit");
  d = r(d, '(^|="|>)Ver todos los mensajes(?=($|"|<))', "$1"+"Muchi ne ajamat");
  d = r(d, '(^|="|>)Foto/video(?=($|"|<))', "$1"+"Shikpilu se Fotoj / Videoj");
  d = r(d, '(^|="|>)Cambiar portada(?=($|"|<))', "$1"+"Shikpata ne Wey Fotoj");
  d = r(d, '(^|="|>)Actividad reciente(?=($|"|<))', "$1"+"Tay Kichijtuk Yewa");
  d = r(d, '(^|="|>)Crear una página(?=($|"|<))', "$1"+"Shiketza se Iswat");
  d = r(d, '(^|="|>)Más historias(?=($|"|<))', "$1"+"Sejseuk Tay Inatiwit");
  d = r(d, '(^|="|>)¿Qué estás pensando\\?(?=($|"|<))', "$1"+"Tay tina?");
  d = r(d, '(^|="|>)Ayer a las ([^<" ]+)(?=($|"|<))', "$1"+"Yalua ka "+"$2");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 YANKWIK TAY INATIWIT");
  d = r(d, '(^|="|>)Te damos la bienvenida(?=($|"|<))', "$1"+"Yek shiajsi");
  d = r(d, '(^|>)otras ([0-9,]+) personas más(?=($|<))', "$1"+"uk "+"$2");
  d = r(d, '(^|="|>)([0-9,]+) personas(?=($|"|<))', "$1"+"$2"+" tukniwan");
  d = r(d, '(^|="|>)Buscar amigos(?=($|"|<))', "$1"+"Shiktemu Mukunpawan");
  d = r(d, '(^|="|>)Servicio de ayuda(?=($|"|<))', "$1"+"Timetzpalewikan");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Yankwik Tepewa...");
  d = r(d, '(^|="|>)Desarrolladores(?=($|"|<))', "$1"+"Ká kichijki ini");
  d = r(d, '(^|="|>)Editar opciones(?=($|"|<))', "$1"+"Pal Tikpata Ini");
  d = r(d, '(^|="|>)Ver amistad(?=($|"|<))', "$1"+"Tay Tajtaketztiwit");
  d = r(d, '(^|="|>)Mejores amigos(?=($|"|<))', "$1"+"Mukunpawan yek");
  d = r(d, '(^|="|>)Notificaciones(?=($|"|<))', "$1"+"Tajtanawatilis");
  d = r(d, '(^|="|>)Compartir(?=($|"|<))', "$1"+"Shikchiwa compartir");
  d = r(d, '(^|="|>)Te gusta esto\.(?=($|"|<))', "$1"+"Mugustoj ini.");
  d = r(d, '(^|="|>)diciembre(?=($|"|<))', "$1"+"Metzti Majtakti-Ume");
  d = r(d, '(^|="|>)Hace unos segundos(?=($|"|<))', "$1"+"ashanchin");
  d = r(d, '(^|="|>)Confirmar(?=($|"|<))', "$1"+"Shikwi ken mukunpa");
  d = r(d, '(^|="|>)noviembre(?=($|"|<))', "$1"+"Metzti Majtakti-Se");
  d = r(d, '(^|="|>)Ya no me gusta(?=($|"|<))', "$1"+"Tea nugustoj");
  d = r(d, '(^|="|>)Comentar(?=($|"|<))', "$1"+"Shitaketza ipanpa");
  d = r(d, '(^|="|>)Nuevo mensaje(?=($|"|<))', "$1"+"Yankwik Amat");
  d = r(d, '(^|="|>)septiembre(?=($|"|<))', "$1"+"Metzti Chiknawi");
  d = r(d, '(^|="|>)APLICACIONES(?=($|"|<))', "$1"+"AJAPLICACION");
  d = r(d, '(^|="|>)Ver más(?=($|"|<))', "$1"+"Shikita Chiupiuk");
  d = r(d, '(^|="|>)Estado(?=($|"|<))', "$1"+"Shikpata ken ijtuk");
  d = r(d, '(^|="|>)Eventos(?=($|"|<))', "$1"+"Tay Yawi Muchiwa");
  d = r(d, '(^|="|>)En otro momento(?=($|"|<))', "$1"+"Ashan Te");
  d = r(d, '(^|="|>)Toques(?=($|"|<))', "$1"+"Ká Metztzupintuk");
  d = r(d, '(^|="|>)Anuncios(?=($|"|<))', "$1"+"Tajtashtawijtuk");
  d = r(d, '(^|="|>)Pregunta(?=($|"|<))', "$1"+"Shiktajtani Se");
  d = r(d, '(^|="|>)Ver todas(?=($|"|<))', "$1"+"Shikita Muchi");
  d = r(d, '(^|="|>)Suscripciones(?=($|"|<))', "$1"+"Tay kikwi");
  d = r(d, '(^|="|>)octubre(?=($|"|<))', "$1"+"Metzti Majtakti");
  d = r(d, '(^|="|>)FAVORITOS(?=($|"|<))', "$1"+"FAJFAVORITOJ");
  d = r(d, '(^|="|>)junio(?=($|"|<))', "$1"+"Metzti Chikwasen");
  d = r(d, '(^|="|>)Publicidad(?=($|"|<))', "$1"+"Ajanuncioj");
  d = r(d, '(^|="|>)Preguntas(?=($|"|<))', "$1"+"Shiktajtani");
  d = r(d, '(^|="|>)agosto(?=($|"|<))', "$1"+"Metzti Chikwey");
  d = r(d, '(^|>)publicación(?=($|<))', "$1"+"tay inatiwit");
  d = r(d, '(^|="|>)Privacidad(?=($|"|<))', "$1"+"Ijichtaka");
  d = r(d, '(^|="|>)Biografía(?=($|"|<))', "$1"+"Tay-keman");
  d = r(d, '(^|="|>)julio(?=($|"|<))', "$1"+"Metzti Chikume");
  d = r(d, '(^|="|>)Miércoles(?=($|"|<))', "$1"+"miercoles");
  d = r(d, '(^|="|>)Acerca de(?=($|"|<))', "$1"+"Ken ijtuk");
  d = r(d, '(^|="|>)Cancelar(?=($|"|<))', "$1"+"Shikajkawa");
  d = r(d, '(^|="|>)Noticias(?=($|"|<))', "$1"+"Yajyankwik");
  d = r(d, '(^|="|>)ORDENAR(?=($|"|<))', "$1"+"SHIKYEKTALI");
  d = r(d, '(^|="|>)Empleo(?=($|"|<))', "$1"+"Puejpuestoj");
  d = r(d, '(^|="|>)Inicio(?=($|"|<))', "$1"+"Achtu Iswat");
  d = r(d, '(^|="|>)LISTAS(?=($|"|<))', "$1"+"MULIJLISTAJ");
  d = r(d, '(^|="|>)Notas(?=($|"|<))', "$1"+"Tajtajkwilul");
  d = r(d, '(^|="|>)Lugares(?=($|"|<))', "$1"+"Kan nentuk");
  d = r(d, '(^|="|>)febrero(?=($|"|<))', "$1"+"Metzti Ume");
  d = r(d, '(^|="|>)mayo(?=($|"|<))', "$1"+"Metzti Makwil");
  d = r(d, '(^|="|>)Cerrar(?=($|"|<))', "$1"+"Shiktzakwa");
  d = r(d, '(^|="|>)Familia(?=($|"|<))', "$1"+"Mumiakwan");
  d = r(d, '(^|="|>)Me gusta(?=($|"|<))', "$1"+"Nugustoj");
  d = r(d, '(^|="|>)Lugar(?=($|"|<))', "$1"+"Kan tinemi?");
  d = r(d, '(^|="|>)abril(?=($|"|<))', "$1"+"Metzti Nawi");
  d = r(d, '(^|="|>)Nacimiento(?=($|"|<))', "$1"+"Nesik");
  d = r(d, '(^|="|>)Amigos(?=($|"|<))', "$1"+"Ikunpawan");
  d = r(d, '(^|="|>)AMIGOS(?=($|"|<))', "$1"+"IKUNPAWAN");
  d = r(d, '(^|="|>)GRUPOS(?=($|"|<))', "$1"+"TEJTEPEWA");
  d = r(d, '(^|="|>)Me gusta(?=($|"|<))', "$1"+"Igustoj");
  d = r(d, '(^|="|>)Enlaces(?=($|"|<))', "$1"+"Ijilpika");
  d = r(d, '(^|="|>)PÁGINAS(?=($|"|<))', "$1"+"IJISWAT");
  d = r(d, '(^|="|>)Enviar(?=($|"|<))', "$1"+"Shiktukti");
  d = r(d, '(^|="|>)Estado(?=($|"|<))', "$1"+"Ken Ijtuk");
  d = r(d, '(^|="|>)marzo(?=($|"|<))', "$1"+"Metzti Yey");
  d = r(d, '(^|="|>)Domingo(?=($|"|<))', "$1"+"domingoj");
  d = r(d, '(^|="|>)Mensajes(?=($|"|<))', "$1"+"Ajamat");
  d = r(d, '(^|="|>)Música(?=($|"|<))', "$1"+"Musicaj");
  d = r(d, '(^|="|>)Buscar(?=($|"|<))', "$1"+"Shiktemu");
  d = r(d, '(^|="|>)Para:(?=($|"|<))', "$1"+"Ká ipal:");
  d = r(d, '(^|="|>)enero(?=($|"|<))', "$1"+"Metzti Se");
  d = r(d, '(^|="|>)Viernes(?=($|"|<))', "$1"+"viernes");
  d = r(d, '(^|="|>)Sábado(?=($|"|<))', "$1"+"sabadoj");
  d = r(d, '(^|>)un enlace(?=($|<))', "$1"+"se ilpika");
  d = r(d, '(^|="|>)Español(?=($|"|<))', "$1"+"Nawat");
  d = r(d, '(^|="|>)Mensaje:(?=($|"|<))', "$1"+"Amat:");
  d = r(d, '(^|="|>)Fotos(?=($|"|<))', "$1"+"Fojfotoj");
  d = r(d, '(^|="|>)Salir(?=($|"|<))', "$1"+"Shikisa");
  d = r(d, '(^|="|>)Martes(?=($|"|<))', "$1"+"martes");
  d = r(d, '(^|="|>)Jueves(?=($|"|<))', "$1"+"jueves");
  d = r(d, '(^|="|>)Más(?=($|"|<))', "$1"+"Sejseuk");
  d = r(d, '(^|="|>)MÁS(?=($|"|<))', "$1"+"SEJSEUK");
  d = r(d, '(^|="|>)Perfil(?=($|"|<))', "$1"+"Iswat");
  d = r(d, '(^|="|>)Ahora(?=($|"|<))', "$1"+"Ashan");
  d = r(d, '(^|>)estado(?=($|<))', "$1"+"ken ijtuk");
  d = r(d, '(^|="|>)Lunes(?=($|"|<))', "$1"+"lunes");
  d = r(d, '(^|="|>)Mapa(?=($|"|<))', "$1"+"Mapaj");
  d = r(d, '(^|="|>)Foto(?=($|"|<))', "$1"+"Fotoj");
  d = r(d, '(^|="|>)Ayer(?=($|"|<))', "$1"+"Yalua");
  d = r(d, '(^|="|>)De:(?=($|"|<))', "$1"+"Ipal:");
  d = r(d, '(^|>)enlace(?=($|<))', "$1"+"ilpika");
  d = r(d, '(^|>)foto(?=($|<))', "$1"+"fotoj");
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
