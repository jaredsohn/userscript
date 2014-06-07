// ==UserScript==
// @name           facebook-rop
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Kriol
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.3
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-08-12
// Translations:   Greg Dickson

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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" en "+"$4"+" laigim dijan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"$2"+" bin pudum wanbala nyuwan foto.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"$2"+" bin pudum "+"$3"+" bala nyuwan foto.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin pudum wanbala nyuwan foto la det album "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin pudum "+"$3"+" bala nyuwan foto la det album "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"$2"+" en "+"$3"+" dubala fren gija na.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" en "+"$3"+" alabat fren garrim "+"$4"+" na.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" en "+"$3"+" bin raidim samting la wanbala "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" en "+"$3"+" laigim "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" en "+"$3"+" laigim dijan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" en "+"$3"+" bin shoim "+"$4"+" la najalot");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" en "+"$3"+" bin shoim det "+"$5"+" bla "+"$4"+" la najalot.");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Blanga");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"maitbi wan awa bifo");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"maitbi wan minit bifo");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Hau yu wandim yu peij");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"$2"+" bin tjeinjim det lilwan pitja bla im.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+"$2"+" bin tjeinjim det lilwan pitja bla im.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin raidim samting langa "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin raidim samting la im oun "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin raidim samting la im oun "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin raidim samting la yu "+"$3"+".");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Wanim yu bin du la Feisbuk");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Meigim nyuwan Fren");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Pudum nyuwan foto o bidiyo");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Pudum Ad la Feisbuk");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"not long");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" im langa "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" im fren garrim "+"$3"+" en "+"$4"+" na.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" im laigim "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" im laigim wanbala "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" im laigim det "+"$4"+" bla "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" im laigim "+"$3"+" en "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" im laigim dijan");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" laigim dijan.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"wanbala lingk");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Geim");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin shoim "+"$3"+" la najalot");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin shoim det "+"$4"+" bla "+"$3"+" la najalot.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin shoim im oun "+"$3"+" la najalot.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" bin shoim im oun "+"$3"+" la najalot.");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Askim kwesjin");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Sambodi bin pudum bla "+"$2"+" neim la det "+"$4"+" bla "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Sambodi bin pudum bla "+"$2"+" neim la wanbala "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"Sambodi bin pudum bla "+"$2"+" neim la fotomob bla "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated her cover photo\.(?=($|"|<))', "$1"+"$2"+" bin pudum nyuwan bigwan foto la im peij.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated his cover photo\.(?=($|"|<))', "$1"+"$2"+" bin pudum nyuwan bigwan foto la im peij.");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Bon");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Blanga:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Libum");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Job");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Tjeinjim bigwan foto");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Toktok (Nomo on)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Shatimap");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Besfrenmob");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Raidim samting");
  d = r(d, '(^|="|>)Cookies(?=($|"|<))', "$1"+"Wanim min Cookies?");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Im rait");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Meigim Ad");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Meigim nyuwan Peij");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Meigim nyuwan Grup...");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Meigim nyuwan Grup...");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Boswan bla Feisbuk");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"wan awa bifo");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" awa bifo");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"wan minit bifo");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" minit bifo");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 sabi yunbala mijimet");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" fren mijimet");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 NYUWAN STORI");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" NYUWAN STORI");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"Wanbala najawan");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"$2"+" bala najalot pipul");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"wanbala najawan");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"$2"+" bala najalot pipul");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"wanbala najawan peij");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"$2"+" bala najalot peij");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"wanbala najawan");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"$2"+" bala najalot pipul");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"wanbala");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" pipul");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"not long");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"not long");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"1 bin shoim la najawan");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" bin shoim la najalot");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Bla tjeinjimbat");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Tjeinjim o Digimat");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Kriol");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Pudum neim bla yu fren o det imeil bla im");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Wanim ting kaminap");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Femili");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"FEIBRIT");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Lukabat Frenmob");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Faindim Mo Peij");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Tok la yu Frenmob");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Askimbat bla bi Fren bla yu");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Frenmob");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"FRENMOB");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"OLA GRUP");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Album mi");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Kemp");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Bigwan Ting Bla Yu Laif");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Laigim");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Laigimbat");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"Laigim Peij");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Laigim Dijan Peij");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Ola Lingk");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"DIFREN-DIFRENWAN PIPUL");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Kamat burrum Facebook");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Mep");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Mesij:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Ola Mesij");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Burrum Mobail Fon");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Mo");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"MO");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Mo Stori");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Nyuwan-nyuwan");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Myusik");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Nyuwan Grup...");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Nyuwan Mesij");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Nyus bla Ebribodi");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Enikain stori");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Guyu!");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Bambai");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Dideiwan");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"OLA PEIJ");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Dislot laigim dijan");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Maitbi yu sabi dismob iya");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Foto");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Fotomob");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Weya yu na?");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Ola difren pleis");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Bugumbat");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Blanga gibum sikrit");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Blanga gibum sikrit");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Peij");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Askim kwesjin");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Ola Dideiwan Stori");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"NYUWAN MESIJ");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Dislot maitbi gudwan bla yu bla luk");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Digimat lilwan pitja");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Tjeinjim sais");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"$2"+", raidim samting...");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Lukranbat");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Lukabat pipul, pleis o enijing");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Luk oldot");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Luk oldot detmob hu bin askimbat bla bi Fren bla yu");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Ola Mesij");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Luk ola lilwan Guyu! stori");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Luk ola stori bla minbala");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Luk mowa");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Luk djian garrim natha langgus");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Jendim");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Jendim nyuwan mesij");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Shoim dijan la yu frenmob");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"SOTIMAT");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Ola Ad dislot iya");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Lilwan stori");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Ai oldei gajim nyus burrum dijan");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Maitbi yu intrested la dislot Grup");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Pudum neim bla yu fren");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Ola rul");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Ola nyuwan stori ba yu frenmob");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Laif Stori");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" gulijap la "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Langa:");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Ola Gudwan Stori");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Digimat weya yu bin laigim");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Pudum nyu infomeishin la yu peij");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Pudum nyuwan stori la yu peij");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Tarnimran Feisbuk so yu garra bi:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Luk wanbala mesij");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Luk langa holot "+"$2"+" bala mesij");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Fotomob langa wol");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Welkam");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Wanim yu jinggibat?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Raidim samting...");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Yestadei");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"Yestadei langa "+"$2");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Yu en "+"$2"+" laigim dijan.");
  d = r(d, '(^|="|>)You, (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Yu, "+"$2"+" en "+"$3"+" laigim dijan.");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Yu laigim dijan");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Jenyuri "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jenyuri "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"Jenyuri "+"$2");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jenyuri "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Jenyuri");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Febri "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Febri "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"Febri "+"$2");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Febri "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Febri");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Matj "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Matj "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"Matj "+"$2");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Matj "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Matj");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Eiprul "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Eiprul "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"Eiprul "+"$2");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Eiprul "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Eiprul");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Mei "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mei "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"Mei "+"$2");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mei "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Mei");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Jun "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jun "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"Jun "+"$2");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jun "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Jun");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Julai "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Julai "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"Julai "+"$2");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Julai "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Julai");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Ogis "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ogis "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"Ogis "+"$2");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ogis "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Ogis");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Septemba "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Septemba "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"Septemba "+"$2");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Septemba "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Septemba");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Oktouba "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oktouba "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"Oktouba "+"$2");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oktouba "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Oktouba");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Nouvemba "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Nouvemba "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"Nouvemba "+"$2");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Nouvemba "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Nouvemba");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Disemba "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Disemba "+"$2"+" langa "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"Disemba "+"$2");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Disemba "+"$2"+", "+"$3"+" langa "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Disemba");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" langa Mandei");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Mandei");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" langa Tjusdei");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Tjusdei");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" langa Wensdei");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Wensdei");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" langa Thesdei");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Thesdei");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" langa Fraidei");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Fraidei");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" langa Sedadei");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Sedadei");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" langa Sandei");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Sandei");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"bigwan ting bla yu laif");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"lingk");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"Foto");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"mesij");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"lilwan stori");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"lilwan stori");
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
