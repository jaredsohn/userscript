// ==UserScript==
// @name           facebook-kw
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Cornish
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.0
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-06-23
// Translations:   Steve Harris

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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" ha "+"$4"+" a gar hemma.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"$2"+" a geworras skeusen nowyth.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (2) new photos\.(?=($|"|<))', "$1"+"$2"+" a geworras "+"$3"+" skeusen nowyth.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (3) new photos\.(?=($|"|<))', "$1"+"$2"+" a geworras "+"$3"+" skeusen nowyth.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"$2"+" a geworras "+"$3"+" skeusen nowyth.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a geworras 1 skeusen nowyth dhe albom "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (2) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a geworras "+"$3"+" skeusen nowyth dhe albom "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (3) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a geworras "+"$3"+" skeusen nowyth dhe albom "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a geworras "+"$3"+" skeusen nowyth dhe albom "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"$2"+" ha "+"$3"+" yw kowetha lemmyn.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha "+"$3"+" yw kowetha gans "+"$4"+" lemmyn.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha "+"$3"+" a gar "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" ha "+"$3"+" a gar hemma.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha "+"$3"+" a gevrennas "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ha "+"$3"+" a gevrennas "+"$5"+" "+"$4");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"A-dro");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"nans yw a-dro dhe our");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"nans yw a-dro dhe vynysen");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Sedhesow akont");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"$2"+" a janjyas hy skeusen brofil");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+"$2"+" a janjyas y skeusen brofil");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dhe "+"$3"+"gevren</a>");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dhe "+"$3"+"bost</a>");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dhe "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dh'y "+"$3"+"hevren</a>");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dh'y "+"$3"+"fost</a>");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dh'y "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dh'y "+"$3"+"gevren</a>");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dh'y "+"$3"+"bost</a>");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dh'y "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gampollas a-dro dhe'th "+"$3");
  d = r(d, '(^|="|>)Activity log(?=($|"|<))', "$1"+"Rekord a aktivita");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Keworr koweth(es)");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Kewor traow a gerydh...");
  d = r(d, '(^|="|>)Add photo/video(?=($|"|<))', "$1"+"Kewor skeusen/gwydhyow");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Argemynnans");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"nans yw nebes eylennow");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Yma "+"$2"+" dhe "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" yw koweth gans "+"$3"+" ha "+"$4"+" lemmyn.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gar "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gar "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gar "+"$4"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gar "+"$3"+" ha "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" a gar hemma.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" a gar hemma.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"kevren");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"APPOW");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Appow ha gwariow");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gevrennas "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a gevrennas "+"$4"+" "+"$3"+".");
  d = r(d, '(^|="|>)Ask question(?=($|"|<))', "$1"+"Govyn");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Tegys veu "+"$2"+" yn "+"$4"+" "+"$3"+".");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Genys");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Gans:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Hedh");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Oberennow");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Chanj kudhlen");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Kesklap (Dhywarlinen)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Dege");
  d = r(d, '(^|="|>)Close friends(?=($|"|<))', "$1"+"Kowetha dha");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Kampol");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Skoodh");
  d = r(d, '(^|="|>)Create an advert(?=($|"|<))', "$1"+"Gwra argemmyn");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Gwra Folen");
  d = r(d, '(^|="|>)Create group\.\.\.(?=($|"|<))', "$1"+"Gwra Bagas...");
  d = r(d, '(^|="|>)Create group(?=($|"|<))', "$1"+"Gwra Bagas");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Towlenoryon");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"nans yw 1 our");
  d = r(d, '(^|="|>)(2) hours ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" our");
  d = r(d, '(^|="|>)(3) hours ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" our");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" our");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"nans yw 1 mynysen");
  d = r(d, '(^|="|>)(2) minutes ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" vynysen");
  d = r(d, '(^|="|>)(3) minutes ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" mynysen");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" mynysen");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 koweth kemmyn");
  d = r(d, '(^|="|>)(2) mutual friends(?=($|"|<))', "$1"+"$2"+" goweth kemmyn");
  d = r(d, '(^|="|>)(3) mutual friends(?=($|"|<))', "$1"+"$2"+" howeth kemmyn");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" koweth kemmyn");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 HWEDHEL NOWYTH");
  d = r(d, '(^|="|>)(2) NEW STORIES(?=($|"|<))', "$1"+"$2"+" HWEDHEL NOWYTH");
  d = r(d, '(^|="|>)(3) NEW STORIES(?=($|"|<))', "$1"+"$2"+" HWEDHEL NOWYTH");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" HWEDHEL NOWYTH");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 den aral");
  d = r(d, '(^|>)(2) others(?=($|<))', "$1"+"$2"+" den erel");
  d = r(d, '(^|>)(3) others(?=($|<))', "$1"+"$2"+" den erel");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"$2"+" den erel");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"1 koweth aral");
  d = r(d, '(^|>)(2) other friends(?=($|<))', "$1"+"$2"+" goweth erel");
  d = r(d, '(^|>)(3) other friends(?=($|<))', "$1"+"$2"+" howeth erel");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"$2"+" koweth erel");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"1 folen aral");
  d = r(d, '(^|>)(2) other pages(?=($|<))', "$1"+"$2"+" folen erel");
  d = r(d, '(^|>)(3) other pages(?=($|<))', "$1"+"$2"+" folen erel");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"$2"+" folen erel");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"1 den aral");
  d = r(d, '(^|>)(2) other people(?=($|<))', "$1"+"$2"+" den erel");
  d = r(d, '(^|>)(3) other people(?=($|<))', "$1"+"$2"+" den erel");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"$2"+" den erel");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"1 den");
  d = r(d, '(^|="|>)(2) people(?=($|"|<))', "$1"+"$2"+" den");
  d = r(d, '(^|="|>)(3) people(?=($|"|<))', "$1"+"$2"+" den");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" den");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"nans yw 1 eylen");
  d = r(d, '(^|="|>)(2) seconds ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" eylen");
  d = r(d, '(^|="|>)(3) seconds ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" eylen");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"nans yw "+"$2"+" eylen");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"1 kevren");
  d = r(d, '(^|="|>)(2) shares(?=($|"|<))', "$1"+"$2"+" gevren");
  d = r(d, '(^|="|>)(3) shares(?=($|"|<))', "$1"+"$2"+" hevren");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" kevren");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Chanj sedhesow");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Chanj po dile");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Kernewek");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Entra hanow koweth po trigva e-bost");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Hwarvosow");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Teylu");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"AN MOYHA KERYS");
  d = r(d, '(^|="|>)Find friends(?=($|"|<))', "$1"+"Kyv kowetha");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Kyv moy a folennow");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Kowetha ow kesklappya");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Govynnow koweth");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Kowetha");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"KOWETHA");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"BAGASOW");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Gweres");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Tre");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"TRAOW KERYS");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Hwarvos Bewnans");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"My a gar hemma");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Traow kerys");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"My a gar an folen ma");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"My a gar an folen ma");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Kevrennow");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"ROLYOW");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Omdenn");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Mappa");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Messach:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Messajys");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Ughkargansow klapkodh");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Moy");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"MOY");
  d = r(d, '(^|="|>)More stories(?=($|"|<))', "$1"+"Moy a hwedhlow");
  d = r(d, '(^|="|>)Most recent(?=($|"|<))', "$1"+"A-dhiwedhes");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Ilow");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Bagas nowyth...");
  d = r(d, '(^|="|>)New message(?=($|"|<))', "$1"+"Messach nowyth");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Fros nowodhow");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Notennow");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Gwarnyansow");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Na lemmyn");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Lemmyn");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"FOLENNOW");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Tus a gar hemma");
  d = r(d, '(^|="|>)People you may know(?=($|"|<))', "$1"+"Tus a aswonni");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Skeusen");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Skeusennow");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Tyller");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Tylleryow");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Pokys");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Privetter");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Sedhesow privetter");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Profil");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Govynnow");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Aktivita a-dhiwedhes");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"POST A-DHIWEDHES");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Folennow komendys");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Dile daswel");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Chanj an braster");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Hwil");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Hwil tus, leow ha traow");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Gwel oll");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Gwel pub govyn koweth");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Gwel pub messach");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Gwel pub gwarnyans");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Gwel kowethegeth");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Gwel moy");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Gwel treylyans");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Danvon");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Danvon messach nowyth");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Kevren");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"Digemysk");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Tylys");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Studh");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Ragbrenow");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Bagasow profyes");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Tag kowetha");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Ragselyow");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Nowodhow bew");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Linen-dermyn");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" ogas dhe "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Dhe:");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Hwedhlow a vri");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Ny garav");
  d = r(d, '(^|="|>)Update info(?=($|"|<))', "$1"+"Nowythha kedhlow");
  d = r(d, '(^|="|>)Update status(?=($|"|<))', "$1"+"Nowythha studh");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Us Facebook avel:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Gwel 1 kampol");
  d = r(d, '(^|="|>)View all (2) comments(?=($|"|<))', "$1"+"Gwel "+"$2"+" gampol oll");
  d = r(d, '(^|="|>)View all (3) comments(?=($|"|<))', "$1"+"Gwel "+"$2"+" hampol oll");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Gwel "+"$2"+" kampol oll");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Skeusennow Fos");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Dynnargh");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Pyth a dybydh?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Skrif kampol...");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"De");
  d = r(d, '(^|="|>)Yesterday at ([^<" ]+)(?=($|"|<))', "$1"+"De dhe "+"$2");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Ty ha "+"$2"+" a gar hemma.");
  d = r(d, '(^|="|>)You, (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Ty, "+"$2"+" ha "+"$3"+" a gar hemma.");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Ty a gar hemma.");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Genver, "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Genver dhe "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Genver");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Genver, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"mis Genver");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Hwevrer, "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Hwevrer dhe "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Hwevrer");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Hwevrer, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"mis Hwevrer");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Meurth, "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Meurth dhe "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Meurth");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Meurth, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"mis Meurth");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Ebrel, "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Ebrel dhe "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Ebrel");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Ebrel, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"mis Ebrel");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Me, "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Me dhe "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Me");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Me, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"mis Me");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Metheven, "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Metheven dhe "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Metheven");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Metheven, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"mis Metheven");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Gortheren, "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Gortheren dhe "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Gortheren");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Gortheren, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"mis Gortheren");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Est, "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Est dhe "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Est");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Est, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"mis Est");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Gwyngala, "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Gwyngala dhe "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Gwyngala");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Gwyngala, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"mis Gwyngala");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Hedra, "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Hedra dhe "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Hedra");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Hedra, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"mis Hedra");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Du, "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Du dhe "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Du");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Du, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"mis Du");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" mis Kevardhu, "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Kevardhu dhe "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" mis Kevardhu");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" mis Kevardhu, "+"$3"+" dhe "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"mis Kevardhu");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"dy' Lun dhe "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"dy' Lun");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"dy' Meurth dhe "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"dy' Meurth");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"dy' Merher dhe "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"dy' Merher");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"dy' Yow dhe "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"dy' Yow");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"dy' Gwener dhe "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"dy' Gwener");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"dy' Sadorn dhe "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"dy' Sadorn");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dy' Sul dhe "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Dy' Sul");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"kevren");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"skeusen");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"studh");
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
