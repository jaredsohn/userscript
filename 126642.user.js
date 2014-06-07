// ==UserScript==
// @name           Facebook m'Chichewa
// @namespace      IndigenousTweets.com
// @description    Kutanthauzira Facebook mu Chicheŵa
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-07-06
// Translations:   Edmond Kachale

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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" ndi "+"$4"+" akonda izi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"$2"+" wawonjezera chithunzi chatsopano.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"$2"+" wawonjezera zithunzi "+"$3"+" zatsopano.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wawonjezera chithunzi chimodzi chatsopano m'buku la zithunzi "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wawonjezera zithunzi "+"$3"+" zatsopano m'buku la zithunzi "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"$2"+" ndi "+"$3"+" ndi ambwana tsopano.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ndi "+"$3"+" tsopano ndi anzake a "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ndi "+"$3"+" achita ndemanga pa "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ndi "+"$3"+" akonda "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" ndi "+"$3"+" akonda izi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ndi "+"$3"+" agawa "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)life event</a>\.(?=($|"|<))', "$1"+"$2"+" and "+"$3"+" agawa "+"$5"+"zochitika pamoyo za</a>"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" and "+"$3"+" agawa "+"$5"+"ulalo wa</a>"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"$2"+" and "+"$3"+" agawa "+"$5"+"chithunzi cha</a>"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" and "+"$3"+" agawa "+"$5"+"mbalume ya</a>"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" and "+"$3"+" agawa "+"$5"+"mbalume ya</a>"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"$2"+" and "+"$3"+" agawa "+"$5"+"mbalume ya</a>"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" and "+"$3"+" agawa "+"$5"+" "+"$4"+".");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Zokhudza");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"Pafupifupi ola limodzi lapitalo");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"Pafupifupi mphindi imodzi yapitayo");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Zokhudza Dambwe lanu");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"$2"+" wasintha chithunzi chake.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+"$2"+" wasintha chithunzi chake");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wachita ndemanga pa "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wachita ndemanga pa "+"$3"+" zake zomwe.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wachita ndemanga pa "+"$3"+" zake zomwe.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wachita ndemanga pa "+"$3"+" zanu.");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Zochitikachitika");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Onjezani Mzanu");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Onjezerani Zokonda...");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Ikani Chithunzi/Kanema");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Malonda");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"mphindikati zingapo zapitazo");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ali pa "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" tsopano ndi mnzake wa "+"$3"+" ndi "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)life event</a>\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$4"+"zochitika pamoyo za</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$4"+"ulalo wa</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$4"+"chithunzi cha</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$4"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wakonda "+"$3"+" ndi "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" wakonda izi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" akonda izi.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"ulalo");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"ZIZOMEKA");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Zisomeka ndi Masewero");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wagawa "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)life event</a>\.(?=($|"|<))', "$1"+"$2"+" wagawa "+"$4"+"zochitika pamoyo za</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" wagawa "+"$4"+"ulalo wa</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"$2"+" wagawa "+"$4"+"chithunzi cha</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" wagawa "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" wagawa "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"$2"+" wagawa "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" wagawa "+"$4"+" "+"$3"+".");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Funsani Funso");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)life event</a>\.(?=($|"|<))', "$1"+"$2"+" am'badika pa "+"$4"+"zochitika pamoyo za</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" am'badika pa "+"$4"+"ulalo wa</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"$2"+" am'badika pa "+"$4"+"chithunzi cha</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" am'badika pa "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" am'badika pa "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"$2"+" am'badika pa "+"$4"+"mbalume ya</a>"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" am'badika pa "+"$4"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" am'badika pa "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)life event</a>\'s photos\.(?=($|"|<))', "$1"+"$2"+" am'badika pa zithunzi za "+"$3"+"zochitika pamoyo za</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)link</a>\'s photos\.(?=($|"|<))', "$1"+"$2"+" am'badika pa zithunzi za "+"$3"+"ulalo wa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)photo</a>\'s photos\.(?=($|"|<))', "$1"+"$2"+" am'badika pa zithunzi za "+"$3"+"chithunzi cha</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)post</a>\'s photos\.(?=($|"|<))', "$1"+"$2"+" am'badika pa zithunzi za "+"$3"+"mbalume ya</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)status</a>\'s photos\.(?=($|"|<))', "$1"+"$2"+" am'badika pa zithunzi za "+"$3"+"mbalume ya</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>)status update</a>\'s photos\.(?=($|"|<))', "$1"+"$2"+" am'badika pa zithunzi za "+"$3"+"mbalume ya</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"$2"+" am'badika pa zithunzi za "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated her cover photo\.(?=($|"|<))', "$1"+"$2"+" wasintha chikutiro chake.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated his cover photo\.(?=($|"|<))', "$1"+"$2"+" wasintha chikutiro chake.");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Anabadwa");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Wolemba:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Bwezani");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Ntchito");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Sinthani Chikutiro");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Mchezo (Woduka)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Tsekani");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Anzanu a Ponda-apa-npondenso");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Chitani ndemanga");
  d = r(d, '(^|="|>)Cookies(?=($|"|<))', "$1"+"Makuki");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Yankhani");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Ikani Malonda");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Pangani Tsamba");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Pangani Gulu...");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Pangani Gulu");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Amisiri");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"Pafupifupi ola limodzi lapitalo");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"maola "+"$2"+" apitawo");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"Pafupifupi mphindi imodzi yapitayo");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"mphindi "+"$2"+" zapitazo");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"Womudziwa mmodzi");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"Owadziwa "+"$2");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"NKHANI YATSOPANO IMODZI");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"NKHANI ZATSOPANO "+"$2");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"mmodzi wina");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"anthu ena "+"$2");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"mnzanu wina");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"anzanu ena "+"$2");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"tsamba lina limodzi");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"masamba ena "+"$2");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"munthu wina mmodzi");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"anthu ena "+"$2");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"Munthu mmodzi");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"Anthu "+"$2");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"mphindikati imodzi yapitayo");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"mphindikati "+"$2"+" zapitazo");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"Wagawa m'modzi");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"Agawa "+"$2");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Makonzedwe");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Konzani kapena Chotsani");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Chicheŵa");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Lowetsani dzina la mzanu kapena keyala ya pa utatavu");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Zochitika");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Banja");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"ZOKONDWERETSA");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Pezani Anzanu");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Pezani Masamba Ambiri");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Anzanu pa Mchezo");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Ofuna Chipongo");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Abwenzi");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"ABWENZI");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"MAGULU");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Thandizo");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Bwalo");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"ZOKONDA");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Zochitika Pamoyo");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Kondani");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Makonda");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"Kondani Tsamba");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Kondani Tsambali");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Maulalo");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"AKAUNDULA");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Tulukani");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Malire");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Uthenga:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Mauthenga");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Zithunzi za pa Lamya");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Zambiri");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"ZAMBIRI");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Nkhani Zambiri");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Zatsopano");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Nyimbo");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Gulu latsopano...");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Uthenga Watsopano");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Mpheketsera");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Timakalata");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Zolengeza");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Osati Panopo");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Pompano");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"MASAMBA");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Anthu omwe akonda izi");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Anthu Owadziwa");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Chithunzi");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Zithunzi");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Malo");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Malo");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Okodola");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Chinsinsi");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Makonzedwe a Zinsinsi");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Bwalo");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Mafunso");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Zochitika Kumene");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"MBALUME YATSOPANO");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Masamba Okuganizirani");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Chotsani Chizirezire");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Kulitsani");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"A "+"$2"+", lembani ndemanga...");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Fufuzani");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Fufuzani anthu, malo ndi zinthu");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Onani Zonse");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Onani Ofuna Chipongo Onse");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Onani Mauthenga Onse");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Onani Zolengeza Zonse");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Onani Ubwenzi");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Onani Zambiri");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Onani Zotanthauzira");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Tumizani");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Tumizani Uthenga Watsopano");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Gawani");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"SANKHULANI");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Malonda");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Mbalume");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Zobetcha");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Magulu Zokuganizirani");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Badikani Anzanu");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Zogwirizana");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Wolemba");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Malo");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" pafupi ndi "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Kwa:");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Nkhani Zam'dede");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Msachikonde");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Sinthani Zokhudza Inu");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Lembani Mbalume");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Gwiritsani Ntchito Facebook Ngati: ");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Onani ndemanga imodzi");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Onani ndemanga "+"$2"+" zonse");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Zithunzi za pakhoma");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Takulandirani");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Mwalinganji?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Lembani ndemanga...");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Dzulo");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"Dzulo mma "+"$2");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Inu ndi "+"$2"+" mwakonda izi.");
  d = r(d, '(^|="|>)You, (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"Inu, "+"$2"+" ndi "+"$3"+" mwakonda izi.");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Mwakonda izi.");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Januwale "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Januwale mma "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Januwale");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Januwale "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Januwale");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Febuluwale "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Febuluwale mma "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Febuluwale");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Febuluwale "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Febuluwale");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Malichi "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Malichi mma "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Malichi");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Malichi "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Malichi");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Epulo "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Epulo mma "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Epulo");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Epulo "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Epulo");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Meyi "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Meyi mma "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Meyi");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Meyi "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Meyi");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Juni "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Juni mma "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Juni");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Juni "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Juni");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Julaye "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Julaye mma "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Julaye");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Julaye "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Julaye");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Ogaste "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Ogaste mma "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Ogaste");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Ogaste "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Ogaste");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Sepitembala "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Sepitembala mma "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Sepitembala");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Sepitembala "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Sepitembala");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Okotobala "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Okotobala mma "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Okotobala");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Okotobala "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Okotobala");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Novembala "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Novembala mma "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Novembala");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Novembala "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Novembala");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Desembala "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Desembala mma "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Desembala");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Desembala "+"$3"+" mma "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Desembala");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lolemba mma "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Lolemba");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lachiwiri mma "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Lachiwiri");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lachitatu mma "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Lachitatu");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lachinayi mma "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Lachinayi");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lachisanu mma "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Lachisanu");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Loweruka mma "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Loweruka");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lamulungu mma "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Lamulungu");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"zochitika pamoyo");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"ulalo");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"chithunzi");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"mbalume");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"mbalume");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"mbalume");
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
