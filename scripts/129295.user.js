// ==UserScript==
// @name           facebook-gup
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Kunwinjku
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-03-28
// Translations:   Dean Yibarbuk, Andrew Manakgu

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
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wurrkeng September "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kunumeleng December "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kudjewk February "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kurrung November "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kudjewk January "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Bangkerreng March "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Bangkerreng April "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kurrung October "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wurrkeng August "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke June "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke July "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke May "+"$2"+", "+"$3"+" kore "+"$4");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wurrkeng September "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kunumeleng December "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kudjewk February "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kurrung November "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Yiben-ngeykurrme dja imel bedberre");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kudjewk January "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Bangkerreng March "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Bangkerreng April "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kurrung October "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wurrkeng August "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Wurrkeng September "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Kunumeleng December "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Kudjewk February "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Kurrung November "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke June "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke July "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Kudjewk January "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Bangkerreng March "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Bangkerreng April "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Kurrung October "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke May "+"$2"+" kore "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Wurrkeng August "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Yiban-wokbebke bedberre rowk");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Yekke June "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Yekke July "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" bininj ngarri-burrburren");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Nawu ngundi-djawayhme yiben-ngeykurrme");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Yekke May "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Ngurri-wokmunkewerren (domburrinj)");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" kabirri-djare");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Bininj nawu kabirri-djare mahni");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" ka-djare");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Yi-marnbun kun-wok kabirri-bayahme");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Yi-marnbun ba minj kabirri-nan");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"Wurrkeng September "+"$2");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"Kunumeleng December "+"$2");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wednesday kore "+"$2");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" ngarri-wokyikadjurrinj");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Thursday kore "+"$2");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Saturday kore "+"$2");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Yi-munkewe Kun-wokkerrnge");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"Kudjewk February "+"$2");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"Kurrung November "+"$2");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Kabirri-dirri dja Njalenjale");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Nawu darnki ngarri-ni ngadman");
  d = r(d, '(^|="|>)Yesterday at ([^<" ]+)(?=($|"|<))', "$1"+"Wolewoleh kore "+"$2");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Tuesday kore "+"$2");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" minid bolkkime");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" KUN-WOKKERRNGE");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"Kudjewk January "+"$2");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"Bangkerreng March "+"$2");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"Bangkerreng April "+"$2");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"Kurrung October "+"$2");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Ngurrben-djarrngbun...");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Kun-wokkerrnge kabirri-yolyolme");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Njaleh yi-burrbun");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"Wurrkeng August "+"$2");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Monday kore "+"$2");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Friday kore "+"$2");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sunday kore "+"$2");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Yi-marnbun o Yi-bularrbun");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Kubuyika ngundi-bukkan");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Yi-kurrme kun-wok nguddangke");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"1 korroko birri-wokyikadjurrinj");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"korroko kun-dungkudji");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Korroko yimerranj ngudda-ken");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Bale yi-yimeng boyehboyen");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Bolkki nga-djalmarnbom");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Nawu kabirrih-marnhmarnbun");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Nuk yiben-burrbun");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" awa bolkki");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Yi-nan Kun-wok Rowk");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Yi-wokbimbu...");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Yi-marnhmarnbun ke");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 ngarrben-burrbun");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"nawu kabirri-dirri kun-buyika");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Bale nga-yime bolkki");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"Yekke June "+"$2");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"Yekke July "+"$2");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Ku-buyika nga-djare");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Birri-kerrnge...");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Yi-kimukwo o yi-yahwurdwo");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"Yekke May "+"$2");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"djal bolkkime");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Ka-rrungbelbbelbmerren");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Ngudda yi-djare");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Yi-bimborledkemen");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Ka-wokborledme");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Bolkki ka-bebme kun-wok");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Yi-bimrawon");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" bininj");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"NAWU YI-DJAREHDJARE");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Yi-bimbularrbu");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 KUN-WOKKERRNGE");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Yi-kerrngehmen");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Yiben-ngeyyawan");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Wurrkeng September");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Kunumeleng December");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"bolkkime");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Yi-benngeykurrme");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Yi-wokwarlkkan");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Bu minj kabirri-nan");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Ngurri-wokyikadjurren");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Yiben-ngeynamen");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Kabirri-durrkmirri");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Kunwinjku");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Nawu yiben-burrbun");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"NAWU YIBEN-BURRBUN");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Nawu nga-djarehdjare");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Kun-wokkerrnge");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Kabindi-yikarrme");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Karri-bayahme");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Yiben-djawan");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Man-ngarre bedberre");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Kudjewk February");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Kurrung November");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Baleh ka-yimerran");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Kun-wokwern");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Bale nga-yimerran");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Ka-bihbimdi");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Kudjewk January");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Bangkerreng March");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Bangkerreng April");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Kurrung October");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Yi-wernhwokna");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Wurrkeng August");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Yi-wokmarnbun");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Ngun-bidyikarrme");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Kun-wok rowk");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Minj nga-djare");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"KABIRRI-NGEYDI");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Kun-bolk rowk");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Yi-bularrbun");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Ngun-kan kured");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Yi-nan rowk");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Wolewoleh");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Wednesday");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Yi-rrombun");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Bim na-wern");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Djal ngaye");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"Mirndewern");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Kun-wok:");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"YI-DJARRNGBU");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Thursday");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Saturday");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Yi-balhmen");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Njamedken");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Nabeh nawu:");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Kun-bolkken");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Yi-yawan");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Yi-munkewe");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Ka-re kore:");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Yekke June");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Yekke July");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Tuesday");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Nga-djare");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Kun-bolk");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Na-mud");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Yekke May");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Monday");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Friday");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Sunday");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Danginj");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Na-wern");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"NA-WERN");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Bolkkime");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Bim");
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
