// ==UserScript==
// @name           facebook-mi
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Māori
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.3
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-09-10
// Translations:   Karaitiana Taiuru, Teanau Tuiono, Ian Cormack

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
divclasses.push('_29j _29k'); // 2 people like this (etc.)
divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent -cx-PRIVATE-uiImageBlockDeprecated__content'); // 2 people like this (etc.)
divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent _29j -cx-PRIVATE-uiImageBlockDeprecated__content _29k'); // 2 people like this (etc.)
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
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"He pai tēnei ki a "+"$2"+", "+"$3"+" me "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"I tāpiri a "+"$2"+" i tētahi whakaahua hōu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"I tāpiri a "+"$2"+" i ētahi whakaahua hōu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tāpiritia e "+"$2"+" 1 whakaahua hōu ki te pukaemi "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tāpiritia e "+"$2"+" "+"$3"+" ngā whakaahua hōu ki te pukaemi "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" me "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"He hoa a "+"$2"+" me "+"$3"+" ināianei.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"He hoa a "+"$2"+" me "+"$3"+" ināianei me "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tākuputia a "+"$2"+" me "+"$3"+" ki te "+"$4"+". ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"He pai a "+"$2"+" me "+"$3"+" ki a "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"He pai tēnei ki a "+"$2"+" me "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tiritiri a "+"$2"+" me "+"$3"+" i te "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tiritiri a "+"$2"+" me "+"$3"+" i te "+"$5"+" a "+"$4"+".");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Mō");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"he haora ki mua pea");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"he meneti ki mua pea");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Ngā Tautuhinga Pūkete");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"I huri a "+"$2"+" i tōna whakaahua kōtaha.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+"I huri a "+"$2"+" i tōna whakaahua kōtaha.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tākupu a "+"$2"+" ki tētahi "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tākupu a "+"$2"+" ki tōna ake "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tākupu a "+"$2"+" ki tōna ake "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tākupu a "+"$2"+" ki tētahi "+"$3"+".");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Rangitaki Mahi");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Tāpiri Hoa");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Tāpiri Kaingākautanga");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Tāpiri Whakaahua / Ataata");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Pānuitanga");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"ētahi hēkona ki mua");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tākupu a "+"$2"+" ki tō "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"He hoa a "+"$2"+" ināianei me "+"$3"+" rāua ko "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"He pai a "+"$2"+" ki a "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"He pai a "+"$2"+" tētahi "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"He pai a "+"$2"+" ki te "+"$4"+" a "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"He pai a "+"$2"+" ki a "+"$3"+" me "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes this\.(?=($|"|<))', "$1"+"He pai tēnei ki a "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"He pai tēnei ki a "+"$2");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"he hononga");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"NGĀ TAUPĀNGA");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Ngā Taupānga me ngā Kēmu");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tiritiri a "+"$2"+" i te "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tiritiri "+"$2"+" ki te "+"$4"+" a "+"$3"+".");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Tuku Pātai");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"I tūtohua a "+"$2"+" i te "+"$4"+" a "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"I tūtohua a "+"$2"+" i ngā whakaahua o "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated her cover photo\.(?=($|"|<))', "$1"+"I whakahōu a "+"$2"+" i tōna whakaahua uhi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated his cover photo\.(?=($|"|<))', "$1"+"I whakahōu a "+"$2"+" i tōna whakaahua uhi.");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"I whānau");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Nā:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Whakakore");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Aramahi");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Huri Uhi");
  d = r(d, '(^|="|>)Chat \\(Off\\)(?=($|"|<))', "$1"+"Kōrerorero (Tuimotu)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Kati");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Ngā hoa tata");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Tākupu");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Whakaū");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Waihangatia tētahi Pānuitanga");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Waihangatia he Whārangi");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Waihanga Rōpū...");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Waihanga Rōpū");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Ngā Kaiwhakawhanake");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"1 haora i mua");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" ngā hāora i mua");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"1 meneti i mua");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" ngā meneti i mua");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 hoa tahi");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" ngā hoa tahi");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 KŌRERO HŌU");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" NGĀ KŌRERO HŌU");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 atu");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"ētahi atu "+"$2");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"1 hoa atu");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"ētahi atu hoa "+"$2");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"1 whārangi atu");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"ētahi atu whārangi "+"$2");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"1 tangata atu");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"ētahi atu tāngata "+"$2");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"1 tangata");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" ngā tāngata");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"1 hēkona i mua");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"ngā hēkona "+"$2"+" i mua");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"1 tiritiri");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"$2"+" ngā tiritiri");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Ngā Kōwhiringa Whakatika");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Whakatika, Tango rānei");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Māori");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Tāurua he ingoa, he wāhitau rānei o tētahi hoa");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Ngā Takahanga");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Whānau");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"NGĀ MAKAU");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Kimi Hoa");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Kimihia He Whārangi Anō");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Ngā Tono Hoa");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Ngā Hoa");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"NGĀ HOA");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"NGĀ RŌPŪ");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Āwhina");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Kāinga");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"NGĀ MEA KAINGĀKAU");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Takahanga Oranga");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Painga");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Ngā Painga");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"Kia Pai Ki Tēnei Whārangi");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Kia Pai Ki Tēnei Whārangi");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Ngā hononga");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"NGĀ RĀRANGI");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Takiputa");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Mahere");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Karere:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Ngā Karere");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Ngā Tukuatu Pūkoro");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Ētahi atu");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"ĒTAHI ANŌ");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"He Kōrero Anō");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Ngā Mea Hōu Rawa");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Puoro");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Rōpū Hōu...");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Karere Hōu");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Whāngai Rongokōrero");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Ngā Tuhipoka");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Ngā Whakamōhiotanga");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Kāore i Tēnei Wā");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Ināianei");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"NGĀ WHĀRANGI");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Ngā tāngata e pai ai tēnei");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Ētahi Tāngata e Mōhio Pea Koe");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Whakaahua");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Ngā Whakaahua");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Wāhi");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Ngā Wāhi");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Ngā Kōkō");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Tūmataitinga");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Ngā Tautuhinga Tūmataitinga");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Kōtaha");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Hohenga O Mua Tata Nei");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"Tarenga Nōnākuanei");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Ngā Whārangi Kua Tūtohua");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Tango Arokite");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Huria Te Rahi");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"$2"+", tuhia he tākupu...");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Rapu");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Rapua he tāngata, he wāhi, he mea hoki");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Tirohia Te Katoa");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Tirohia Ngā Tono Hoa Katoa");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Tirohia Ngā Karere Katoa");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Tirohia Ngā Whakamōhiotanga Katoa");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Tirohia Ētahi Atu");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Tiro Whakamāori");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Tukuna");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Tukua he Karere Hou");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Tiritiri");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"KŌMAKA");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"I Tautokona ā-Pūtea");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Tūnga");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Ngā Ohaurunga");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Ngā Rōpū Kua Tūtohua");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Tūtohu Hoa");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Ngā Ture");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Panuku Wā Ora");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Rārangi Wā");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"He pātata te "+"$2"+" ki "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Ki:");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Ngā Kōrero Matua");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Wete Painga");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Whakahōu Mōhiohio");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Whakahōu Tūnga");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Whakamahi Facebook hei:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Tirohia 1 tākupu");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Tirohia ngā tākupu "+"$2"+" katoa");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Ngā Whakaahua Pātū");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Nau mai");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"He aha ō whakaaro?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Tuhia he tākupu...");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Inanahi");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"Inanahi i "+"$2");
  d = r(d, '(^|="|>)You and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"He pai tēnei ki a kōrua ko "+"$2"+".");
  d = r(d, '(^|="|>)You, (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like this\.(?=($|"|<))', "$1"+"He pai tēnei ki a kōutou ko "+"$2"+" ko "+"$3"+".");
  d = r(d, '(^|="|>)You like this\.(?=($|"|<))', "$1"+"Kei te pai tēnei ki a koe");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Kohitātea "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kohitātea "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"Kohitātea "+"$2");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Kohitātea "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Kohitātea");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Huitanguru "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Huitanguru "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"Huitanguru "+"$2");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Huitanguru "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Huitanguru");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Poutūterangi "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Poutūterangi "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"Poutūterangi "+"$2");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Poutūterangi "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Poutūterangi");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Paengawhāwhā "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Paengawhāwhā "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"Paengawhāwhā "+"$2");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Paengawhāwhā "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Paengawhāwhā");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Haratua "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Haratua "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"Haratua "+"$2");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Haratua "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Haratua");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Pipiri "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Pipiri "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"Pipiri "+"$2");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Pipiri "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Pipiri");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Hōngongoi "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hōngongoi "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"Hōngongoi "+"$2");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hōngongoi "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Hōngongoi");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Hereturikōkā "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hereturikōkā "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"Hereturikōkā "+"$2");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hereturikōkā "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Hereturikōkā");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Mahuru "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mahuru "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"Mahuru "+"$2");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mahuru "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Mahuru");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Whiringa-ā-nuku "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Whiringa-ā-nuku "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"Whiringa-ā-nuku "+"$2");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Whiringa-ā-nuku "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Whiringa-ā-nuku");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Whiringa-ā-rangi "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Whiringa-ā-rangi "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"Whiringa-ā-rangi "+"$2");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Whiringa-ā-rangi "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Whiringa-ā-rangi");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Hakihea "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hakihea "+"$2"+" i te "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"Hakihea "+"$2");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Hakihea "+"$2"+", "+"$3"+" i te "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Hakihea");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Rāhina i te "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Rāhina");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Rātū i te "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Rātū");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Rāapa i te "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Rāapa");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Rāpare i te "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Rāpare");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Rāmere i te "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Rāmere");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Rāhoroi i te "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Rāhoroi");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Rātapu i te "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Rātapu");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"takahanga oranga");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"hononga");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"whakaahua");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"tare");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"tūnga");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"whakahou tūnga");
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
