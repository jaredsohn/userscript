// ==UserScript==
// @name           facebook-gup-x-gud
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Gundjeihmi
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-03-28
// Translations:   Violet Lawson

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
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wurrgeng September "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gunumeleng December "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gudjeuk February "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gurrung November "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gudjeuk January "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Banggerreng March "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Banggerreng April "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gurrung October "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wurrgeng August "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke June "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke July "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke May "+"$2"+", "+"$3"+" gure "+"$4");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Yiban-ngeigurrmehgurrme dja imel bedberre");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wurrgeng September "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gunumeleng December "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gudjeuk February "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gurrung November "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gudjeuk January "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Banggerreng March "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Banggerreng April "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Gurrung October "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wurrgeng August "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Wurrgeng September "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Gunumeleng December "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Gudjeuk February "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Gurrung November "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke June "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke July "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Gudjeuk January "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Banggerreng March "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Banggerreng April "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Gurrung October "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Yekke May "+"$2"+" gure "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Wurrgeng August "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Ngurri-wokmun.gewerren (ba-rromburrinj)");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Yekke June "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Yekke July "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Gabarri-ngeidi Nawu Gabarri-djare");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Yekke May "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Yi-marnbu bu Ngurri-djarrkwokdi...");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" bininj arri-burrburren");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"$2"+" gabarri-djare");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Nawu Ngundi-djawan Yiban-ngeigurrme");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"$2"+" ga-djare");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Yi-marnbun ba minj gabarri-nan");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Yiban-wokbebge rouk");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"Wurrgeng September "+"$2");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"Gunumeleng December "+"$2");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Wednesday gure "+"$2");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Yi-bimbularrbu An-buyiga Yi-namen");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" AN-GERRNGE GUN-WOK");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Yi-djendjihme dja Yi-bularrbun");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Yi-mun.gewe gun-wokgerrnge");
  d = r(d, '(^|="|>)Yesterday at ([^<" ]+)(?=($|"|<))', "$1"+"Wolewolehni gure "+"$2");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Thursday gure "+"$2");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Saturday gure "+"$2");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Njanjuk yih-burrbun?");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"Gudjeuk February "+"$2");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"Gurrung November "+"$2");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"An-buyihbuyiga Gabarri-dirri");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Tuesday gure "+"$2");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Yi-marnbun nawu ngudda ge");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" minid bolkkime");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Gorrogo Ba-yimerranj Ngudda-gen");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Gare nuk Yiban-burrbun");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"Gudjeuk January "+"$2");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"Banggerreng March "+"$2");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"Banggerreng April "+"$2");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"Gurrung October "+"$2");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Yi-marnbu ba gabarri-bayahme");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" arri-wokgadjurrinj");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Bu yiga minj yi-djare gabarri-nan");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Yi-marnbun an-gimuk dja an-yahwurd");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"Wurrgeng August "+"$2");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Monday gure "+"$2");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Friday gure "+"$2");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sunday gure "+"$2");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"djal bolkki ba-bebmeng");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Mirndewern An-gerrnge...");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Gubuyiga ngundi-bukkan");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Ga-bebme gun-wok rouk");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Yi-gurrme gun-wok wudda ge");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Yi-nan ga-wokborledge");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" awa bolkki");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Gun-wokgerrnge yi-mun.gewe:");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Yi-wokbimbu...");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Darn.gi arri-ni adman");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Gabarri-yolyolme Gun-wok");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Njanjuk Yi-marnbom");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Bolkkime Ayed A-yime");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"Yekke June "+"$2");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"Yekke July "+"$2");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 arri-burrburren");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"nawu gabarri-dirri an-buyiga");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"An-buyiga yi-marnbu");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Gabarri-nan rouk gun-wok ge");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 AN-GERRNGE GUN-WOK");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Yiban-ngalge bininj");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"Yekke May "+"$2");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"1 garri-djarrkgadjurren");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"An-buyiga a-djare");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Ga-rrungbelbbelbmerren");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Wudda yi-djare.");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Yi-bimgurrme");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Bolkki ga-bebme gun-wok");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" bininj");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"NAWU YI-DJAREHDJARE");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Yi-bimbularrbu");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Ga-wokbebme ga-djale");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Wurrgeng September");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Gunumeleng December");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"bolkkime");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Ngaled yi-yimi");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Gabarri-bayahme");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Yi-wokwarlkkan");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Gundjeihmi");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Garri-bengdaihgerren");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Yiban-ngeinamen");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"bolkkime");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Nawu Yiban-burrbun");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"NAWU YIBAN-BURRBUN");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Gun-wokbuyiga");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Gun-wokgerrnge");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Gabandi-yigarrme");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Yiban-djawan");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"GABARRI-NGEIHNGEIDI");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Gudjeuk February");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Gurrung November");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Yi-ngeigurrme");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Barri-marnbom");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Bonj, yi-balhmen");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Bim nawu gun-bolkgen");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Ngayed a-yimerran");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"An-ngarre bedberre");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Ngundi-bidyigarrme");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Yi-rrurndeng gured");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"An-buyiga ga-djale");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"AN-BUYIGA GA-DJALE");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Gudjeuk January");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Banggerreng March");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Banggerreng April");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Gurrung October");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Yi-rrurrkmirri");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Wurrgeng August");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Yi-wokgurrmen");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Gun-wok rouk");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Ga-bebme rouk");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Wolewolehni");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Nawu Arri-mud");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Gun-bolk rouk");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Ga-bimdi");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Minj a-djare");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Wednesday");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Yi-bularrbu");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Nawu a-djare");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"An-wern bim");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"MIRNDEWERN");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Thursday");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Saturday");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Njanjukgen");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Ba-rranginj");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Yi-balhmen");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Djal Aye");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Yi-mun.gewe");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Ba-marnbom:");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Yi-yawan");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"YI-MARNBUN");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Ga-re gore:");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Yekke June");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Yekke July");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Tuesday");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Gun-bolk");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Yekke May");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Monday");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Friday");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Sunday");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"A-djare");
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
