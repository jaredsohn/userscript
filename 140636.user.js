// ==UserScript==
// @name           facebook-sm
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Samoan
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.4
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   05-11-2013
// Translations:   Chris Bickers

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
divclasses.push('UIImageBlock_Content UIImageBlock_ICON_Content');  // 2 people like this
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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"'E fiafia "+"$2"+", "+"$3"+" ma "+"$4"+" i le mea lea.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"Ua fa'aopoopo e "+"$2"+" le ata fou.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"Ua fa'aopoopo e "+"$2"+" ia ata fou e "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua fa'aopoopo e "+"$2"+" le ata fou e tasi i le tusi ata.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua fa'aopoopo e"+"$2"+" ia ata fou e "+"$3"+" i le tusi ata.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"Ua uō nei ia "+"$2"+" ma "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua uō nei "+"$2"+" ma "+"$3"+" ia "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"O se manatu "+"$2"+" ma "+"$3"+" i le "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"E fiafia "+"$2"+" ma "+"$3"+" i le "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"E fiafia "+"$2"+" ma "+"$3"+" i mea nei");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua 'avatu e "+"$2"+" ma "+"$3"+" le "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua 'avatu e "+"$2"+" ma "+"$3"+" le "+"$5"+" a "+"$4");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Fa'atatau");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"i le itūlā ua mavae");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"i le minute ua mavae");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Fa'atonutonu Account");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"Ua sui e "+"$2"+" lana ata.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+" Ua sui e "+"$2"+" lana ata.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"O se manatu a "+"$2"+" i le "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"O se manatu a "+"$2"+" i lana lava "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"O se manatu a "+"$2"+" i lana lava "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"O se manatu a "+"$2"+" i lou "+"$3");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Lisi Gāoioiga");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Fa'aopoopo Uō");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Fa'aopoopo lau mea e fiafia i ai…");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Fa'aopoopo Ata/Vitiō");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Fa'asalalauga");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"taimi nei");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"O lei ia "+"$2"+" "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"e fiafia "+"$2"+" i le "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"e fiafia "+"$2"+" i le "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"e fiafia "+"$2"+" i le "+"$4"+" a "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"e fiafia "+"$2"+" i le "+"$3"+" ma "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"e fiafia "+"$2"+" i mea nei");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"e fiafia "+"$2"+" i mea nei.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"se itūlau uepe");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"Polokalame");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Polokalame ma Ta'aloga");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua tufa atu e "+"$2"+" lana "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua 'avatu e "+"$2"+" le "+"$4"+" a "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua 'avatu e "+"$2"+" lana ia "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ua 'avatu "+"$2"+" lana ia "+"$3");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Fesili");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" maka i le "+"$4"+" a "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" maka i le "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"$2"+" maka i le ata a "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated her cover photo\.(?=($|"|<))', "$1"+"Ua fa'afou e "+"$2"+" lana ata.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated his cover photo\.(?=($|"|<))', "$1"+"Ua fa'afou e "+"$2"+" lana ata.");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Fānau");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Gaosia e");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Sōloia");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Gāluega");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Sui lou Ata i tua");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Talanoa (Laina-'ese)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Tāpuni");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Uō Mamae");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Lou manatu");
  d = r(d, '(^|="|>)Cookies(?=($|"|<))', "$1"+"Kuki");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Fa'amausalī");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Fa'asalalau");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Gaosia itūlau");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Gaosia Fa'alāpotopotoga…");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Gaosia Fa'alāpotopotoga");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"Tasi le itūlā ua mavae atu");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" ia itūlā ua mavae atu");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"Tasi le minute ua mavae atu");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" ia minute ua mavae atu");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"Tasi uō tutusa");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" uō tutusa");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"TALA FOU");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"TALA FOU E "+"$2");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"tasi le isi");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"$2"+" isi");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"le isi uō e tasi");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"isi uō e "+"$2");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"le isi itūlau e tasi");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"Isi itūlau e "+"$2");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"Le isi tagata e tasi");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"Isi tagata e "+"$2");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"tagata to'atasi");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"tagata e to'a "+"$2");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"Tasi sekone ua mavae atu");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"$2"+" sekone ua mavae atu");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"Fa'atasi na tufa atu");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" na tufatufa atu");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Fa'afou le Filifiliga");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Toe sui pe 'Ave'ese");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Gagana Sāmoa");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Lomitusi le suafa po'o le imeli a lau uō");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Mea ua tupu");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"'Āiga");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"PELEINA");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Su'e Uō");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Su'e isi itūlau");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Talanoa ma uō");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Tagata Fia Fa'auō");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Lisi lou Uō");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"UŌ");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"FA'ALĀPOTOPOTOGA");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Fesoasoani");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Nu'u");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"MEA E FIAFIA I AI");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Mea ua tupu i lou olaga");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Fiafia");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"O mea mānaia");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"Itūlau Mānaia");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Fiafia i le Itūlau");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Itūlau uepe");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"Lisi");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Fa'atōfā");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Fa'afanua");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Fe'au");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Fe'au");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"'Auina mai i le telefoni feavea'i");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Le isi");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"LE ISI");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Le Isi Tala");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Aupito E Le'i Leva");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Musika");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Fa'alāpotopotoga Fou…");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Fe'au Fou");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Tala fou");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"'Api");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"'Api va'ai");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Lē 'o le taimi nei");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Nei");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"ITŪLAU");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Tagata e fiafia le mea lea");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Tagata e te tau iloa");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Ata");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Ata");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Tūlaga");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Tūlaga");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Tōtino");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Meafaigāluega Tōtino");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Lou fa'amatalaga");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Fesili");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Gāoioiga e le'i leva");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"LOMITUSI E LE'I LEVA");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Itūlau Fautua");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"'Ave'ese le ata");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Sui fua");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"$2"+", fa'aopoopo se manatu");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Sā'ili");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Su'e mo Tagata, Tūlaga ma isi mea");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Va'ai 'uma");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Va'ai 'uma 'au fia fa'auō");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Va'ai fe'au 'uma");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Va'ai 'uma i fa'asilasilaga");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Va'ai Uō");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Fia iloa atili");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Va'ai Fa'aliliuga");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Lafo");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Lafo le Fe'au Fou");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Tufatufa");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"Tu'ufa'avasega");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Uiga");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Fa'alāpotopotoga Fautua");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Fa'ailoga Uō");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Tūlafono");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" latalata "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Mo");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Tala Tausa'afia");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Lē fiafia");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Fa'amatalaga Fou");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Uiga fou");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Facebook Fa'aaogā e pei");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Va'ai le tasi manatu");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Va'ai 'uma i manatu e "+"$2");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Ata Puipui");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"'Āfio mai");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"O le ā se mea o 'i lou māfaufau");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Lomitusi se manatu");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"'Ananāfi");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"'Ananāfi i le ");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"O 'oe ma "+"$2"+" e fiafia le mea lea.");
  d = r(d, '(^|="|>)You, (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"O 'oe, "+"$2"+" ma "+"$3"+" e fiafia le mea lea.");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"'E te fiafia i le mea lea");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Ianuari,"+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Ianuari i le "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Ianuari");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Ianuari,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Ianuari");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Fepuari,"+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Fepuari i le "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Fepuari");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Fepuari,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Fepuari");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Mati,"+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Mati i le "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Mati");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Mati,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Mati");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Aperila,"+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Aperila i le "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Aperila");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Aperila,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Aperila");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Me,"+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Me i le "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Me");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Me,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Me");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Iuni,"+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Iuni i le "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Iuni");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Iuni,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Iuni");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Iulai,"+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Iulai i le "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Iulai");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Iulai,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Iulai");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Aukuso,"+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Aukuso i le "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Aukuso");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Aukuso,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Aukuso");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Setema,"+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Setema i le "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Setema");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Setema,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Setema");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Oketopa,"+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Oketopa i le "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Oketopa");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Oketopa,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Oketopa");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Novema,"+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Novema i le "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Novema");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Novema,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Novema");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"Tesema,"+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Tesema i le "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+"Tesema");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+"Tesema,"+"$3"+" i le "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Tesema");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aso Gafua i le "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Aso Gafua");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aso Lua i le "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Aso Lua");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aso Lulu i le "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Aso Lulu");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aso Tofi i le "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Aso Tofi");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aso Faraile i le "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Aso Faraile");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aso To'ona'i i le "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Aso To'ona'i");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aso Sā i le "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Aso Sā");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"mea ua tupu i lou olaga");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"itūlau e sili");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"ata");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"lafo");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"uiga");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"uiga fou");
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
