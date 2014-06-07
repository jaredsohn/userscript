// ==UserScript==
// @name           facebook-gd
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Scottish Gaelic
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.6
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-09-18
// Translations:   Michael Bauer

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
  d = r(d, '(^|="|>)<span[^>]+>You and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"'S toil leatsa 's le "+"$2"+" seo.");
  d = r(d, '(^|="|>)<span[^>]+>You, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"'S toil leatsa, le "+"$2"+" agus le "+"$3"+" seo.");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+>, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"'S toil le "+"$2"+", "+"$3"+" is "+"$4"+" seo.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" dealbh ùr ris.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (1?1) new photos\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" dealbh ùr ris.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (1?2) new photos\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" dhealbh ùr ris.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (1?[3-9]) new photos\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" dealbhan ùra ris.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" dealbh ùr ris.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" 1 dealbh ùr ris an albam "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (1?1) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" "+"$3"+" dealbh ùr ris an albam "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (1?2) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" "+"$3"+" dhealbh ùr ris an albam "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (1?[3-9]) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" "+"$3"+" dealbhan ùra ris an albam "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Chuir "+"$2"+" "+"$3"+" dealbh ùr ris an albam "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" agus "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"Tha càirdeas eadar "+"$2"+" is "+"$3"+" a-nis.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Tha càirdeas eadar "+"$2"+" is "+"$3"+" agus "+"$4"+" a-nis.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Thug "+"$2"+" agus "+"$3"+" seachad beachd air "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" is "+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"'S toil le "+"$2"+" is "+"$3"+" seo.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" is "+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" is "+"$3"+" "+"$5"+"an ceangal</a>"+" aig "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" is "+"$3"+" "+"$5"+"an dealbh</a>"+" aig "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" is "+"$3"+" "+"$5"+"am post</a>"+" aig "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" is "+"$3"+" "+"$5"+"an naidheachd</a>"+" aig "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" is "+"$3"+" "+"$5"+"an naidheachd</a>"+" aig "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" is "+"$3"+" "+"$5"+" aig "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) were tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"Chaidh "+"$2"+" agus "+"$3"+" a thagadh sna dealbhan aig "+"$4"+".");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Mu dheidhinn");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"mu uair a thìde air ais");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"mu mhionaid air ais");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Roghainnean a' chunntais");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"Dh'atharraich "+"$2"+" dealbh na pròifil aice.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+"Dh'atharraich "+"$2"+" dealbh na pròifil aige.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"a' cheangal</a>"+" aice fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an dealbh</a>"+" aice fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"a' phost</a>"+" aice fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an naidheachd</a>"+" aice fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an naidheachd</a>"+" aice fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+" aice fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"a' cheangal</a>"+" aige fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an dealbh</a>"+" aige fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"a' phost</a>"+" aige fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an naidheachd</a>"+" aige fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an naidheachd</a>"+" aige fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+" aige fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"a' cheangal</a>"+" agad.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an dealbh</a>"+" agad.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"a' phost</a>"+" agad.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an naidheachd</a>"+" agad.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+"an naidheachd</a>"+" agad.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$3"+" agad.");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Loga na gnìomhachd");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Cuir caraid ris");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Cuir ris na tha ùidh agad ann...");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Cuir dealbh / video ris");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Sanasachd");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"grunn diogan air ais");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Tha "+"$2"+" ann an "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Tha càirdeas eadar "+"$2"+" agus "+"$3"+" is "+"$4"+" a-nis.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$4"+"an ceangal</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$4"+"an dealbh</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$4"+"am post</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$4"+"an naidheachd</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$4"+"an naidheachd</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$4"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"'S toil le "+"$2"+" "+"$3"+" is "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> likes this\.</span>(?=($|"|<))', "$1"+"'S toil le "+"$2"+" seo.");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"'S toil le "+"$2"+" seo.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"ceangal");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"APLACAIDEAN");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Aplacaidean is geamannan");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$4"+"an ceangal</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$4"+"an dealbh</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$4"+"am post</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$4"+"an naidheachd</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$4"+"an naidheachd</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$4"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$3"+" aice fhèin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Cho-roinn "+"$2"+" "+"$3"+" aige fhèin.");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Cum cunntas-bheachd");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) took a photo with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Thog "+"$2"+" dealbh le "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Chaidh "+"$2"+" a thagadh aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$4"+"an ceangal</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)photo</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$4"+"an dealbh</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$4"+"am post</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$4"+"an naidheachd</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>)status update</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$4"+"an naidheachd</a>"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Thug "+"$2"+" seachad beachd air "+"$4"+" aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Chaidh "+"$2"+" a thagadh ann an "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"Chaidh "+"$2"+" a thagadh sna dealbhan aig "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated her cover photo\.(?=($|"|<))', "$1"+"Dh'ùraich "+"$2"+" an dealbh mòr aice.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated his cover photo\.(?=($|"|<))', "$1"+"Dh'ùraich "+"$2"+" an dealbh mòr aige.");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Là-breith");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Le:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Sguir dheth");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Dreuchdan");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Atharraich an còmhadadh");
  d = r(d, '(^|="|>)Chat \\(Off\\)(?=($|"|<))', "$1"+"Cabadaich (far loidhne)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Dùin");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Dlùth-charaidean");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Beachd");
  d = r(d, '(^|="|>)Cookies(?=($|"|<))', "$1"+"Briosgaidean");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Dearbh");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Cruthaich sanasachd");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Cruthaich duilleag");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Cruthaich buidheann...");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Cruthaich buidheann");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Luchd-leasachaidh");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"1 uair a thìde air ais");
  d = r(d, '(^|="|>)(1?1) hours ago(?=($|"|<))', "$1"+"$2"+" uair a thìde air ais");
  d = r(d, '(^|="|>)(1?2) hours ago(?=($|"|<))', "$1"+"$2"+" uair a thìde air ais");
  d = r(d, '(^|="|>)(1?[3-9]) hours ago(?=($|"|<))', "$1"+"$2"+" uairean a thìde air ais");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" uair a thìde air ais");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"1 mhionaid air ais");
  d = r(d, '(^|="|>)(1?1) minutes ago(?=($|"|<))', "$1"+"$2"+" mhionaid air ais");
  d = r(d, '(^|="|>)(1?2) minutes ago(?=($|"|<))', "$1"+"$2"+" mhionaid air ais");
  d = r(d, '(^|="|>)(1?[3-9]) minutes ago(?=($|"|<))', "$1"+"$2"+" mionaidean air ais");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" mionaid air ais");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 charaid an cumantas");
  d = r(d, '(^|="|>)(1?1) mutual friends(?=($|"|<))', "$1"+"$2"+" charaid an cumantas");
  d = r(d, '(^|="|>)(1?2) mutual friends(?=($|"|<))', "$1"+"$2"+" charaid an cumantas");
  d = r(d, '(^|="|>)(1?[3-9]) mutual friends(?=($|"|<))', "$1"+"$2"+" caraidean an cumantas");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" caraid an cumantas");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 sgeulachd ùr");
  d = r(d, '(^|="|>)(1?1) NEW STORIES(?=($|"|<))', "$1"+"$2"+" sgeulachd ùr");
  d = r(d, '(^|="|>)(1?2) NEW STORIES(?=($|"|<))', "$1"+"$2"+" sgeulachd ùr");
  d = r(d, '(^|="|>)(1?[3-9]) NEW STORIES(?=($|"|<))', "$1"+"$2"+" sgeulachdan ùra");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" sgeulachd ùr");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 duine eile");
  d = r(d, '(^|>)(1?1) others(?=($|<))', "$1"+"$2"+" duine eile");
  d = r(d, '(^|>)(1?2) others(?=($|<))', "$1"+"$2"+" dhuine eile");
  d = r(d, '(^|>)(1?[3-9]) others(?=($|<))', "$1"+"$2"+" daoine eile");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"$2"+" duine eile");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"1 charaid an cumantas");
  d = r(d, '(^|>)(1?1) other friends(?=($|<))', "$1"+"$2"+" charaid an cumantas");
  d = r(d, '(^|>)(1?2) other friends(?=($|<))', "$1"+"$2"+" charaid an cumantas");
  d = r(d, '(^|>)(1?[3-9]) other friends(?=($|<))', "$1"+"$2"+" caraidean an cumantas");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"$2"+" caraid an cumantas");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"1 duine eile");
  d = r(d, '(^|>)(1?1) other pages(?=($|<))', "$1"+"$2"+" duine eile");
  d = r(d, '(^|>)(1?2) other pages(?=($|<))', "$1"+"$2"+" dhuine eile");
  d = r(d, '(^|>)(1?[3-9]) other pages(?=($|<))', "$1"+"$2"+" daoine eile");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"$2"+" duine eile");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"1 duine eile");
  d = r(d, '(^|>)(1?1) other people(?=($|<))', "$1"+"$2"+" duine eile");
  d = r(d, '(^|>)(1?2) other people(?=($|<))', "$1"+"$2"+" dhuine eile");
  d = r(d, '(^|>)(1?[3-9]) other people(?=($|<))', "$1"+"$2"+" daoine eile");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"$2"+" duine eile");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"1 duine");
  d = r(d, '(^|="|>)(1?1) people(?=($|"|<))', "$1"+"$2"+" duine");
  d = r(d, '(^|="|>)(1?2) people(?=($|"|<))', "$1"+"$2"+" dhuine");
  d = r(d, '(^|="|>)(1?[3-9]) people(?=($|"|<))', "$1"+"$2"+" daoine");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" duine");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"1 diog air ais");
  d = r(d, '(^|="|>)(1?1) seconds ago(?=($|"|<))', "$1"+"$2"+" diog air ais");
  d = r(d, '(^|="|>)(1?2) seconds ago(?=($|"|<))', "$1"+"$2"+" dhiog air ais");
  d = r(d, '(^|="|>)(1?[3-9]) seconds ago(?=($|"|<))', "$1"+"$2"+" diogan air ais");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"$2"+" diog air ais");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"Air a cho-roinneadh 1 turas");
  d = r(d, '(^|="|>)(1?1) shares(?=($|"|<))', "$1"+"Air a cho-roinneadh "+"$2"+" turas");
  d = r(d, '(^|="|>)(1?2) shares(?=($|"|<))', "$1"+"Air a cho-roinneadh "+"$2"+" thuras");
  d = r(d, '(^|="|>)(1?[3-9]) shares(?=($|"|<))', "$1"+"Air a cho-roinneadh "+"$2"+" turais");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"Air a cho-roinneadh "+"$2"+" turas");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Deasaich na roghainnean");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Deasaich no thoir air falbh");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Gàidhlig");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Cuir a-steach ainm no post-d de charaid");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Tachartasan");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Teaghlach");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"ANNSACHDAN");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Lorg caraidean");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Lorg barrachd dhuilleagan");
  d = r(d, '(^|="|>)Follow Post(?=($|"|<))', "$1"+"Lean ris a' phost");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Caraidean a' cabadaich");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Iarrtasan càirdeis");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Caraidean");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"CARAIDEAN");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"BUIDHNEAN");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Cobhair");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Dhachaigh");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"ÙIDH AGAD ANN");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Tachartas beatha");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"'S toil");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Na 's toil");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"'S toil leam an duilleag seo");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"'S toil leam an duilleag seo");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Ceanglaichean");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"LIOSTAICHEAN");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Clàraich a-mach");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Mapa");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Teachdaireachd:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Teachdaireachdan");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Luchdadh o inneal-làimhe");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Barrachd");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"BARRACHD");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Barrachd sgeulachdan");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"An fheadhainn as ùire");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Ceòl");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Buidheann ùr...");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Teachdaireachd ùr");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Inbhir nan naidheachd");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Nòtaichean");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Brathan");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Chan ann an-dràsta");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"An-dràsta");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"DUILLEAGAN");
  d = r(d, '(^|="|>)PAGES AND ADS(?=($|"|<))', "$1"+"DUILLEAGAN IS SANASACHD");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Daoine as toil leotha seo");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Saoil an aithne dhut...");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Dealbh");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Dealbhan");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Àite");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Àitichean");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Brogaidhean");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Prìobhaideachd");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Roghainnean prìobhaideachd");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Pròifil");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Ceistean");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Gnìomhachd ùr");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"POST O CHIONN GOIRID");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Duilleagan molta");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Thoir air falbh an ro-shealladh");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Atharraich am meud");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"$2"+", nach sgrìobh thu beachd?");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Lorg");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Lorg daoine, àitichean is rudan");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Seall a h-uile");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Seall gach iarrtas càirdeis");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Seall gach teachdaireachd");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Seall gach brath");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Faic an càirdeas");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Faic barrachd");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Seall eadar-theangachadh");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Cuir");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Cuir teachdaireachd ùr");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Co-roinn");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"SEÒRSAICH");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Brosnaichte");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Do naidheachd");
  d = r(d, '(^|="|>)Subscribe to Page(?=($|"|<))', "$1"+"Fo-sgrìobh ris an duilleag");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Fo-sgrìobhaidhean");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Buidhnean a mholamaid");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Cuir taga ri caraidean");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Teirmichean");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Teacsa ruith");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Loidhne-ama");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" faisg air "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Gu:");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Prìomh naidheachdan");
  d = r(d, '(^|="|>)Unfollow Post(?=($|"|<))', "$1"+"Na lean ris a' phost tuilleadh");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Cha toil tuilleadh");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Ùraich am fiosrachadh");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Dè do naidheachd?");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Cleachd Facebook mar:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Seall 1 bheachd");
  d = r(d, '(^|="|>)View all (1?1) comments(?=($|"|<))', "$1"+"Seall "+"$2"+" bheachd");
  d = r(d, '(^|="|>)View all (1?2) comments(?=($|"|<))', "$1"+"Seall an "+"$2"+" bheachd");
  d = r(d, '(^|="|>)View all (1?[3-9]) comments(?=($|"|<))', "$1"+"Seall a h-uile "+"$2"+" beachdan");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Seall a h-uile "+"$2"+" beachd");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Balla nan dealbhan");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Fàilte ort");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Dè tha dol?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Sgrìobh beachd...");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"An-dè");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"An-dè aig "+"$2");
  d = r(d, '(^|="|>)<span[^>]+>You like this\.</span>(?=($|"|<))', "$1"+"'S toil leat seo.");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Am Faoilleach "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Am Faoilleach aig "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Am Faoilleach");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Am Faoilleach "+"$3"+" aig %S");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Am Faoilleach");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An Gearran "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Gearran aig "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An Gearran");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Gearran "+"$3"+" aig %S");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"An Gearran");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Am Màrt "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Am Màrt aig "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" Am Màrt");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Am Màrt "+"$3"+" aig %S");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Am Màrt");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An Giblean "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Giblean aig "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An Giblean");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Giblean "+"$3"+" aig %S");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"An Giblean");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An Cèitean "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Cèitean aig "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An Cèitean");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Cèitean "+"$3"+" aig %S");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"An Cèitean");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An t-Ògmhios "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An t-Ògmhios aig "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An t-Ògmhios");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An t-Ògmhios "+"$3"+" aig %S");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"An t-Ògmhios");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An t-Iuchar "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An t-Iuchar aig "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An t-Iuchar");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An t-Iuchar "+"$3"+" aig %S");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"An t-Iuchar");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An Lùnastal "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Lùnastal aig "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An Lùnastal");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Lùnastal "+"$3"+" aig %S");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"An Lùnastal");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An t-Sultain "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An t-Sultain aig "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An t-Sultain");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An t-Sultain "+"$3"+" aig %S");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"An t-Sultain");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An Dàmhair "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Dàmhair aig "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An Dàmhair");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Dàmhair "+"$3"+" aig %S");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"An Dàmhair");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An t-Samhain "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An t-Samhain aig "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An t-Samhain");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An t-Samhain "+"$3"+" aig %S");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"An t-Samhain");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" An Dùbhlachd "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Dùbhlachd aig "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"$2"+" An Dùbhlachd");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" An Dùbhlachd "+"$3"+" aig %S");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"An Dùbhlachd");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"DiLuain aig "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"DiLuain");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"DiMàirt aig "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"DiMàirt");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"DiCiadain aig "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"DiCiadain");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"DiarDaoin aig "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"DiarDaoin");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"DihAoine aig "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"DihAoine");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"DiSathairne aig "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"DiSathairne");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"DiDòmhnaich aig "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"DiDòmhnaich");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"tachartas beatha");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"ceangal");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"dealbh");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"naidheachd");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"naidheachd");
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
