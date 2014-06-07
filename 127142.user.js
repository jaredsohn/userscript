// ==UserScript==
// @name           facebook-hil
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Hiligaynon
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.5
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-06-20
// Translations:   Francis Dimzon, Eliodora Dimzon, Edgar Siscar, Ofelia Libo-on-Salaya, Blomar Rain Catipunan, Essan Labos, Emmanuel Lerona, Ruben Magan Gamala

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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Si "+"$2"+", "+"$3"+" kag "+"$4"+" nanamian sini.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagdugang sang bag-o nga litrato.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagdugang sang "+"$3"+" ka mga bag-o nga litrato.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagdugang sang bag-o nga litrato sa album "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagdugang sang "+"$3"+" ka mga bag-o nga litrato sa album "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"Si "+"$2"+" kag "+"$3"+" mag-abyan na.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" kag "+"$3"+" abyan na ni "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" kag "+"$3"+" nanamian sang "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Si "+"$2"+" kag "+"$3"+" nanamian sini.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" kag "+"$3"+" nagpaambit sang "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" kag "+"$3"+" nagpaambit sang "+"$5"+" ni "+"$4"+".");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Tuhoy sa Facebook");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"mga isa ka oras ang nakaligad");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"mga isa ka minuto ang nakaligad");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Mga Settings sang Account");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagbaylo sang iya litrato sa profile.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagbaylo sang iya litrato sa profile.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagtugda sa isa ka "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagtugda sa iya kaugalingon nga "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagtugda sa iya kaugalingon nga "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagtugda sa imo "+"$3"+".");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Lista sang Ginpanghimo");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Idugang nga Abyan");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Idugang ang mga Huyog...");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Magdugang sang Litrato/Video");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Pasayod");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"mga pila ka gutlo ang nakaligad");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" ara sa "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" mag-abyan na kanday "+"$3"+" kag "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nanamian sang "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nanamian sang isa ka "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nanamian sang "+"$4"+" ni "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nanamian sang "+"$3"+" kag "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"Si "+"$2"+" nanamian sini.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"May "+"$2"+" nga nanamian sini.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"isa ka link");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Apps kag mga Hampang");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagpaambit sang "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" nagpaambit sang "+"$4"+" ni "+"$3"+".");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Mamangkot");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Si "+"$2"+" gintag sa "+"$4"+" ni "+"$3"+".");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Natawo");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Ni:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Kanselahon");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Mga Trabaho");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Islan ang Tabon");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Magsugilanon (Offline)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Siraduhan");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Mga Suod Nga Kaabyanan");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Magtugda");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Batunon");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Maghimo sang Pasayod");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Maghimo sang Pahina");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Maghimo sang Grupo...");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Maghimo sang Grupo");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"1 ka oras ang nakaligad");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" ka mga oras ang nakaligad");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"1 ka minuto ang nakaligad");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" ka mga minutos ang nakaligad");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 ka kaangay nga abyan");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" ka mga kaangay nga abyan");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 KA BAG-O NGA ISTORYA");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" KA MGA BAG-O NGA ISTORYA");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 ka iban pa");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"$2"+" ka mga iban pa");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"1 ka kaangay nga abyan");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"$2"+" ka mga kaangay nga abyan");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"1 ka iban pa nga pahina");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"$2"+" ka iban pa nga mga pahina");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"1 ka iban pa nga tawo");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"$2"+" ka iban pa nga mga tawo");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"1 ka tawo");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" ka mga tawo");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"1 ka gutlo ang nakaligad");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"$2"+" ka mga ginutlo ang nakaligad");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"1 ka paambit");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" ka mga paambit");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"I-edit ang Options");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"I-edit ukon Kuhaon");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Hiligaynon");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Ihatag ang ngalan ukon email address sang abyan");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Mga Hitabo");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Pamilya");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"MGA NAHAMUT-AN");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Mangita sang mga Kaabyanan");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Mangita sang dugang pa nga mga Pahina");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Mga Kaabyanan nga Mahimo Sugilanonon");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Mga Pangabay Para Mangin Abyan");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Mga Kaabyanan");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"MGA KAABYANAN");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"MGA GRUPO");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"BULIG");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"MGA HUYOG");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Hitabo sa Kabuhi");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Kanami");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Mga Nanamian");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"Nanamian nga Pahina");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Nanamian ka sini nga Pahina");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"Mga Lista");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Maguwa Na");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Mapa");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Mensahe:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Mga Mensahe");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Dugang pa");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"DUGANG PA");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Dugang pa nga mga Istorya");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Pinakabag-o");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Musika");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Bag-o nga Grupo...");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Bag-o nga Mensahe");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Mga Balita");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Mga Pahibalo");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Indi Lang Anay");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Subong");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"MGA PAHIHA");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Mga tawo nga nanamian sini");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Mga Tawo nga Basi Kilala Mo");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Litrato");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Mga Litrato");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Lugar");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Mga Lugar");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Mga Pagdukol");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Husa");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Mga Settings sang Husa");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Mga Pamangkot");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Bag-o nga Ginhimo");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Ginarekomendar nga mga Pahina");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Kuhaon ang Preview");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Lainon ang Kadakuon");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Mangita");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Mangita sang mga tawo, lugar kag bagay");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Lantawon Tanan");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Lantawon ang Tanan nga mga Pangabay Para Mangin Abyan");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Lantawon ang Tanan Nga Mga Mensahe");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Lantawon ang Tanan Nga Mga Pahibalo");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Lantawon Ang Pag-abyanay");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Lantawon ang dugang pa");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Lantawon ang Paglubad");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Ipadala");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Ipadala ang Bag-o nga Mensahe");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Ipaambit");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"PASUNUDON");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Mga Binayaran Nga Pasayod");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Ginasuhestiyon nga Mga Grupo");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"I-tag ang mga kaabyanan");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Mga Kasugtanan");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Mga Preska nga Impormasyon");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"Mga "+"$2"+" malapit sa "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Para kay:");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Nagapanguna nga mga Istorya");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Ay, indi gali manami");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"I-update ang Impormasyon");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"I-update ang Status");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Gamiton ang Facebook bilang:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Lantawon ang 1 ka tugda");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Lantawon ang "+"$2"+" ka mga tugda");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Mga Litrato sa Wall");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Pag-abiabi");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Ano ang sa imo ginapaminsar?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Magsulat sang tugda...");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Kagapon");
  d = r(d, '(^|="|>)Yesterday at ([^<" ]+)(?=($|"|<))', "$1"+"Kagapon alas "+"$2");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Ikaw kag "+"$2"+" nanamian sini.");
  d = r(d, '(^|="|>)You, (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Ikaw, si "+"$2"+" kag "+"$3"+" nanamian sini.");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Nanamian mo ini.");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Enero "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Enero "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"Enero "+"$2");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Enero "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Enero");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Pebrero "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Pebrero "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"Pebrero "+"$2");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Pebrero "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Pebrero");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Marso "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Marso "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"Marso "+"$2");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Marso "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Marso");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Abril "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Abril "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"Abril "+"$2");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Abril "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Abril");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Mayo "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mayo "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"Mayo "+"$2");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mayo "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Mayo");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Hunyo "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hunyo "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"Hunyo "+"$2");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hunyo "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Hunyo");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Hulyo "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hulyo "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"Hulyo "+"$2");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hulyo "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Hulyo");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Agosto "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Agosto "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"Agosto "+"$2");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Agosto "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Agosto");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Septyembre "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Septyembre "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"Septyembre "+"$2");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Septyembre "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Septyembre");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Oktubre "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oktubre "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"Oktubre "+"$2");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oktubre "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Oktubre");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Nobyembre "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Nobyembre "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"Nobyembre "+"$2");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Nobyembre "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Nobyembre");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Disyembre "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Disyembre "+"$2"+" alas "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"Disyembre "+"$2");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Disyembre "+"$2"+", "+"$3"+" alas "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Disyembre");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lunes alas "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Lunes");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Martes alas "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Martes");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Miyerkules alas "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Miyerkules");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Huwebes alas "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Huwebes");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Biyernes alas "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Biyernes");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sabado alas "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Sabado");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Domingo alas "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Domingo");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"litrato");
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
