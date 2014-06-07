// ==UserScript==
// @name           facebook-ach
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Acholi
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.2
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-08-10
// Translations:   David Ojara Prince

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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" ki "+"$4"+" maro eni.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"$2"+" kimedo cal manyen.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kimedo cal acel manyen i albam "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"$2"+" ki "+"$3"+" gin ong lurem.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ki "+"$3"+" gin dong luremi kombdi ki "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ki "+"$3"+" kimino tam ikom "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ki "+"$3"+" maro "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" ki "+"$3"+" maro eni.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ki "+"$3"+" kinywako "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ki "+"$3"+" kinywako "+"$4"+"'s "+"$5"+".");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Lok kom");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"Cawa acel mukato");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"Dakika acel angec");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Tero akaunti");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"$2"+" otiko loko cal mamege me lok kome.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+"$2"+" otiko loko cal mamege me lok kome.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kimino tam ikom a "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kimino tam ikom "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" omino tam ikome pire kene "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kimino tam ikom megi "+"$3"+".");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Gin later tic");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Med Larem");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Med Keero...");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Med cal/Video");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Cato wil");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"Dakika manok mukato");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" tye ii "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kombedi ty laremi ki "+"$3"+" ki "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" maro "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" maro a "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" maro "+"$3"+"'s "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" maro "+"$3"+" ki "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" maro eni.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" maro eni.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"kakube");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"TIC");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Kit me tuko");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kinywako "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kinywako "+"$3"+"'s "+"$4"+".");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Peny Lapeny");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" onongo ki kelo ii "+"$3"+"'s "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" onongo dong ki kelo ii a "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"$2"+" onong dong ki klo ii "+"$3"+"'s cal.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated her cover photo\.(?=($|"|<))', "$1"+"$2"+"1 onongo dong ki kelo ii %a2's cal.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated his cover photo\.(?=($|"|<))', "$1"+"$2"+" omedo  yonge cal pare.");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Kinywalo");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Ngadi:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Ngol");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Dog tic");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Lok Ngeye");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Lok ma pe ikube i yamo");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Lor");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Luremi ma Cok");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Mi tam");
  d = r(d, '(^|="|>)Cookies(?=($|"|<))', "$1"+"Layeny me intanet");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Moki");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Yub Ad");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Yub pot buk");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Yub Dul...");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Yub Dul");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Ludong");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"Cawa 1 mukato");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"Cawa 1 mukato");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"Dakika 1 angec");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"Dakika 1 angec");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"Larema macok");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"lurem ma inywako kwedgi jami");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"Lok mutime nyen");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" lok manyen ma okat");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 mukene");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"larem 1 mukene");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"larem 1 mukene");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"Pot buk 1 mukene");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"Pot buk 1 mukene");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"Dano 1 mukene");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"Dano 1 mukene");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"Dano 1");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"Dano 1 mukene");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"ceken 1 mukato");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"nywako 1");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Yub yo mukene");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Yubi onyo kwany");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Leb munu me (US)");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Ket nying laremi onyo email address");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Jami ma time");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Gang");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"JAMI MA IMARO");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"yeny Lurem");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Nongo Pot buk Mapol");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Luremi matye i ka boko lok");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Leg pi Larem");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Lurem");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"LUREM");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"DULE");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Kony");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Gang");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"KERO");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Kit me kwo");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Maro");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Maro");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"Maro Pot buk");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Maro pot buk man");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Kubo");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"kIT MA KIRYEYO KWEDE");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"kat woko");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Kwena:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Kwena Mapol");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Keto ki Gin cing");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Mukene");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"MUKENE");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Lok mukene ma okati");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Macok coki");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Wer");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Dul Manyen...");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Kwena Manyen");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Adwogi me lok Manyen");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Lok");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Miyo ngc");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Kombedo ku");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Kombedi");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"POT BUK");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Jo ma maro man");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Dano mogo ma nyo ingeyo");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Cal");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Cal mapol");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Kabedo");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Kabedo");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Dir");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Mung");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Tero imung");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Jami mapat pat ma tye");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Lapeny");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Tic ma otime cok-cok");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"GIN MA KICWALO MACOK-COKI");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Pot buk ma kicwako");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Kwany gin ma ineno");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Dwok dite odoco");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"$2"+", med tam...");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Yeny");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Yeny jo, kabedo ki jami mapol");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Nen Gin weng");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Nen Lga pa Lurem");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Nen Kwena Weng");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Nen Ngec Weng");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Nen jo ma Luremi");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Nen mukene");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Nen Lagony");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Cwal");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Cwal Kwena Manyen");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Nywak");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"Yer");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Kiculo pire");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Kit ma tye kwede");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Coye");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Byek Dule");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Lurem ma imaro lok kwedgi");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Kite");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Gin ma omoko");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Cawa me agiki");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" cok "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Bot:");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Wii lok Mukato");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Pe kumeno");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Ket Lok");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Ket kit ma tye kwede");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Tii ki Facebook calo:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Nen tam amia 1");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"nen "+"$2"+" tam weng");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Cal me kor ot");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Jolo");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Itye katamo ngo?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Coo tami...");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Lawoo");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"Laworo i "+"$2");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"In ki "+"$2"+" maro man.");
  d = r(d, '(^|="|>)You, (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"In, "+"$2"+" ki "+"$3"+" maro man.");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Imaro eni.");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me acel "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me acel "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me acel "+"$2");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me acel "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Dwe me acel");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me aryo "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me aryo "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me aryo "+"$2");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me aryo "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Dwe me aryo");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me adek "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me adek "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me adek "+"$2");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me adek "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Dwe me adek");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me angwen "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me angwen "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me angwen "+"$2");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me angwen "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Dwe me angwen");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me abic "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me abic "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me abic "+"$2");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me abic "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Dwe me abic");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me abicel "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me abicel "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me abicel "+"$2");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me abicel "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Dwe me abicel");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me abiro "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me abiro "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me abiro "+"$2");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me abiro "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Dwe me abiro");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me aboro "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me aboro "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me aboro "+"$2");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me aboro "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Dwe me aboro");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me abonwen "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me abonwen "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me abonwen "+"$2");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me abonwen "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Dwe me abonwen");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me apar "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me apar "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me apar "+"$2");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me apar "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Dwe me apar");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me apar wiye acel "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me apar wiye acel "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me apar wiye acel "+"$2");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me apar wiye acel "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Dwe me apar wiye acel");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Dwe me apar wiye aryo "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me apar wiye aryo "+"$2"+" at "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"Dwe me apar wiye aryo "+"$2");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dwe me apar wiye aryo "+"$2"+", "+"$3"+" at "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Dwe me apar wiye aryo");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ceng baraja ki "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Ceng baraja");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Cng aryo ki "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Cng aryo");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ceng adek ki "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Ceng adek");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ceng angwen ki "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Ceng angwen");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ceng abic ki "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Ceng abic");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"ceng abicel ki "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"ceng abicel");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ceng cabit ki "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Ceng cabit");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"Gin kwo matime");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"Kube");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"Cal");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"Cwal");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"Kit matye kwede");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"Ki me keto");
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
