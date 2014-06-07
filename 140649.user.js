// ==UserScript==
// @name           facebook-ilo
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Ilocano
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-09-04
// Translations:   Eugene Carmelo C. Pedro

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
//divclasses.push('_29j _29k'); // 2 people like this (etc.)
divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent -cx-PRIVATE-uiImageBlockDeprecated__content'); // 2 people like this (etc.)
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
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Maipanggep");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"agarup maysa nga oras ti napalabasen");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"agarup maysa a minute ti napalabasen");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Settings ti Account");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Rekord ti Aktibidad");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Gayyemen");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Manginayon iti Ladawan/Video");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Patalastas");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"sumagmamano a segundo ti napalabasen");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"Kayat ni "+"$2"+" daytoy.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" ti mangayat iti daytoy.");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"APLIKASION");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Aplikasion ken Ay-ayam");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Agsaludsod");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Nayanak idi");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Ni:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Ikansel");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Karera");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Baliwan ti Paulo a Ladawan");
  d = r(d, '(^|="|>)Chat \\(Off\\)(?=($|"|<))', "$1"+"Chat (Deskonektado)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Iserra");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Nasinged a Gagayyem");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Agkomentario");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Agpatalastas");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Mangaramid iti Panid");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Mangaramid iti Grupo…");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Mangaramid iti Grupo");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Dagiti Developer");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" oras ti napalabasen");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" minuto ti napalabasen");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 pagpadaan a gayyem");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" pagpadaan a gayyem");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 BARO NGA ESTORIA");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" DAMAG");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"1 binglay");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" binglay");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Editen dagiti Opsion");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Editen wenno Ikkaten");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Ilocano");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Mangisurat iti nagan ti gayyem wenno adres ti email");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Dagiti Pasamak");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Familia");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"DAGITI FABORITO");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Agsarak kadagiti gayyem");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Panagpakada a Makigayyem");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Gagayyem");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"DAGITI GRUPO");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Tulong");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Sungad");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Pasamak iti Biag");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Kayaten");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Dagiti Kayat");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"DAGITI LISTAAN");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Agdeskonektar");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Mapa");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Mensahe:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Dagiti Mensahe");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Ad-adu pay");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"AD-ADU PAY");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Ad-adu pay nga estoria");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Baro a Grupo…");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Baro a Mensahe");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Ita");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"DAGITI PANID");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Dagiti mangkayat iti daytoy");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Dagiti Posible nga Am-ammom");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Ladawan");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Dagiti Ladawan");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Lugar");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Dagiti Lugar");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Kinapribado");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Settings ti Kinapribado");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Kabaruan nga Aktibidad");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Dagiti Panid a Rekomendado");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Ikkaten ti Preview");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Baliwan ti Kadakkel");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"$2"+", mangisurat iti komentario…");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Saraken");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Kitaen ti Amin");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Kitaen ti Amin a Mensahe");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Kitaen ti Ad-adu Pay");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Kitaen ti Pataros");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Ipatulod");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Mangipatulod iti Baro a Mensahe");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Ibinglay");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"URNOSEN");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Nasponsoran");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Estado");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Dagiti suskripsion");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Itag dagiti Gayyem");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Dagiti Termino");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Kenni:");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Di Kayaten");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"I-update ti Info");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"I-Update ti Estado");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Kitaen ti amin a "+"$2"+" komentario");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Dagiti Ladawan iti Diding");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Ania ti panpanunotem?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Mangisurat iti komentario…");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Idi Kalman");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"Idi kalman iti "+"$2");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Kayatmo daytoy.");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Enero "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Enero "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"Enero "+"$2");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Enero "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Enero");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Febrero "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Febrero "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"Febrero "+"$2");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Febrero "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Febrero");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Marso "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Marso "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"Marso "+"$2");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Marso "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Marso");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Abril "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Abril "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"Abril "+"$2");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Abril "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Abril");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Mayo "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mayo "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"Mayo "+"$2");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mayo "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Mayo");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Hunio "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hunio "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"Hunio "+"$2");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hunio "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Hunio");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Hulio "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hulio "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"Hulio "+"$2");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hulio "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Hulio");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Agosto "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Agosto "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"Agosto "+"$2");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Agosto "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Agosto");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Setiembre "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Setiembre "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"Setiembre "+"$2");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Setiembre "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Setiembre");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Oktubre "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oktubre "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"Oktubre "+"$2");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oktubre "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Oktubre");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Nobiembre "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Nobiembre "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"Nobiembre "+"$2");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Nobiembre "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Nobiembre");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Disiembre "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Disiembre "+"$2"+" iti "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"Disiembre "+"$2");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Disiembre "+"$2"+", "+"$3"+" iti "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Disiembre");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lunes iti "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Lunes");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Martes iti "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Martes");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mierkoles iti "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Mierkoles");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Huebes iti "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Huebes");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Biernes iti "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Biernes");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sabado iti "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Sabado");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Domingo iti "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Domingo");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"pasamak iti biag");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"ladawan");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"estado");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"estado");
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
