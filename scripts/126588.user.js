// ==UserScript==
// @name           facebook-ppl-x-en
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
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Ume ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Se ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chiknawi ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wan "+"$3"+" kichijtiwit compartir "+"$4"+".");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwasen ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwey ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" wan "+"$4"+" ingustoj ini.");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Ume ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikume ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Se ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Nawi ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Makwil ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Yey ipal ne shiwit "+"$3"+", ka "+"$4");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Ume ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Se ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chiknawi ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" taketzki ipanpa se "+"$3"+".");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwasen ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwey ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Ume ka "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Se ka "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Ume ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikume ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" wan "+"$3"+" ingustoj ini.");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chiknawi ka "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kichijtuk compartir se "+"$3"+".");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Shiktajkwilu ne itukay se mukunpa o ne idireccion");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Se ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Nawi ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Makwil ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"Ka "+"$2"+" nepa "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Yey ipal ne shiwit "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti ka "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwasen ka "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwey ka "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Ume ka "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikume ka "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Se ka "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Nawi ka "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Makwil ka "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Yey ka "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" igustoj se "+"$3"+".");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Taja wan uk "+"$2"+" anmugustoj ini.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"$2"+" kitalijtuk se yankwik fotoj.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" igustoj "+"$3"+".");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Shikita ne "+"$2"+" tay inatiwit ipanpa");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Ume");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti-Se");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chiknawi");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Majtakti");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwasen");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikwey");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Ume");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Chikume");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Se");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Nawi");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Makwil");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"ne tunal "+"$2"+" ipal ne Metzti Yey");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"Kinhishmati "+"$2"+" mukunpa");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" igustoj ini.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" ingustoj ini.");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Ká kineki muchiwa mukunpa");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Shichachalaka (Te nemi ashan)");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" YANKWIK TAY INATIWIT");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" kichijtiwit compartir ini");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne miercoles ka "+"$2");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"ashan "+"$2"+" segundoj");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Sejse Ká Weli Tikishmati");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Muchi ne tajtanawatilis");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne sabadoj ka "+"$2");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Shikpilu se Fotoj / Videoj");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"ashan "+"$2"+" minutoj");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Shikpata tik ukse taketzalis");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Shiktukti se Yankwik Amat");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne jueves ka "+"$2");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne domingoj ka "+"$2");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne martes ka "+"$2");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne viernes ka "+"$2");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Ká kineki muchiwa mukunpa");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Shikishti ne Achtutachialis");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ne lunes ka "+"$2");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Ajaplicacion wan ajawilti");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Shiketza se Tepewa...");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"ashan "+"$2"+" horaj");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Shikpata Tay Tinatuk Mupanpa");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Shina se ipanpa...");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Shikwi Ishkalamat ken:");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Fojfotoj ipal ne Tapepechul");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Shikajsi Uksejse Iswat");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Mukunpawan Ashan Nemit");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Nusan Weli Mugustoj");
  d = r(d, '(^|="|>)Yesterday at ([^<" ]+)(?=($|"|<))', "$1"+"Yalua ka "+"$2");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Ká igustoj ini");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"Kishmati se mukunpa");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"ashan se minutoj");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Shikpata o Shikishti");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Yajyankwik Tay Inatiwit");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 YANKWIK TAY INATIWIT");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"Se kichijtuk compartir ini");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Shikpata ne Wey Fotoj");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Shikchiwa se anuncioj");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Tay Kichijtuk Yewa");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Shiktukayti Mukunpawan");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Sejseuk Tay Inatiwit");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Yankwik Tepewa...");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Tay Tajtaketztiwit");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Tay tina?");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"ashan se horaj");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Shikita Tay Panutuk");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Shiktemu Mukunpawan");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Igustoj Ini Iswat");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Shikwepa Mas Wey/Chikitik");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Muchi ne ajamat");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Shikpata ken ijtuk");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Shiketza se Iswat");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" tukniwan");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Iwan se Celular");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Sejse Tay Inatiwit");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Ne mucuentaj");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Mugustoj ini.");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Shikchiwa mukunpa");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Mukunpawan yek");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Pal Tikpata Ini");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Tajtanawatilis");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Muijichtaka");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Metzti Majtakti-Ume");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"ashanchin");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Shiktajtani Se");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Ká kichijki ini");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Metzti Majtakti-Se");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Shikwi ken mukunpa");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Muchi ne Yajyankwik");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Shitaketza ipanpa");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Shikita Chiupiuk");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Shikchiwa compartir");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Tajtashtawijtuk");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Metzti Chiknawi");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Yankwik Amat");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Tay Yawi Muchiwa");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Tay Muchijki");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Ká Metztzupintuk");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Tay kikwi");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Metzti Majtakti");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Ajanuncioj");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Nawat");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"FAJFAVORITOJ");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Shiktajtani");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Shikita Muchi");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Metzti Chikwasen");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Metzti Chikwey");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"uk "+"$2");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Timetzpalewikan");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Yajyankwik");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Puejpuestoj");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Tea nugustoj");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Yek shiajsi");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Metzti Ume");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Metzti Chikume");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"miercoles");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Tajtajkwilul");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Tay-keman");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"AJAPLICACION");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Shikajkawa");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Ikunpawan");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"IKUNPAWAN");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"MULIJLISTAJ");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Kan tinemi?");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Kan nentuk");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Ijichtaka");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Metzti Se");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Metzti Nawi");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Metzti Makwil");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Shiktzakwa");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Mumiakwan");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"TEJTEPEWA");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Achtu Iswat");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Ashan Te");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"SHIKYEKTALI");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Ken Ijtuk");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Metzti Yey");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"sabadoj");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Ken ijtuk");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Shikisa");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Ajamat");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Fojfotoj");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Shiktemu");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Yalua");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"jueves");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"domingoj");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Ijilpika");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Amat:");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Shiktukti");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"martes");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"viernes");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Nugustoj");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Igustoj");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Musicaj");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"IJISWAT");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Iswat");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Ká ipal:");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Sejseuk");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"SEJSEUK");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"tay inatiwit");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"lunes");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"se ilpika");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Fotoj");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"ken ijtuk");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Nesik");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Ipal:");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Mapaj");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Ashan");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"ilpika");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"fotoj");
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
