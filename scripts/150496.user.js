// ==UserScript==
// @name           facebook-niu
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Niue
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-10-19
// Translations:   Emani Fakaotimanava-Lui

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
tags.push('h3');     // Friend Requests, Notifications, ...
tags.push('h4');     // Sponsored, Ticker, ...
tags.push('h5');     // new in Sept 2012 for "was tagged in...", "added %d new photos", etc.
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
  d = r(d, '(^|="|>)<span[^>]+>You and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"Fiafia a koe mo e "+"$2"+" ke he mena nai");
  d = r(d, '(^|="|>)<span[^>]+>You, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"$2"+", "+"$3"+" mo koe ne fiafia ke he mena nai");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+>, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"$2"+", "+"$3"+" mo e "+"$4"+" tuga a e.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"$2"+" ne tuku e fakatino foou.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"$2"+" ne tuku "+"$3"+" e tau fakatino foou.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ne tuku 1 e ata foou he pepa ata "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ne tuku "+"$3"+" e tau ata foou he pepa ata "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" mo e "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"Kapitiga a "+"$2"+" mo "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Kua kapitiga a "+"$2"+" mo "+"$3"+" pihia mo e "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mo "+"$3"+" ne fai tala hagaao ke he "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mo "+"$3"+" ne fiafia ke he "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"$2"+" mo "+"$3"+" ne fiafia ke he mena nai.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mo "+"$3"+" ne tufa e "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mo "+"$3"+" ne tufa e "+"$5"+" ha "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) were tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"Kua fakaila a "+"$2"+" mo "+"$3"+" he tau ata ha "+"$4"+".");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Hagaaoaga");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"liga taha e matahola kua mole");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"liga taha e minute kua mole");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Tokaaga he Fakamauaga");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her profile picture\.(?=($|"|<))', "$1"+"Kua fakafoou e ata ha "+"$2"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his profile picture\.(?=($|"|<))', "$1"+"Kua hiki e ata ha "+"$2");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Fai talahauaga a "+"$2"+" hagaao ke he "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Fai talahauaga a "+"$2"+" hagaao ke he haana a "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Fai talahauaga a "+"$2"+" hagaao ke he haana a "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Fai talahauaga a "+"$2"+" hagaao ke he haau a "+"$3"+".");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"Taofiaga he tau Mena Tutupu");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Fakakapitiga");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Lafi e tau Mena ne Fiafia ki ai…");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Lafi e Fakatino / Vitiō");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Tau Tohi Fakataki");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"fiha e sekone kua mole");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" i "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Kua kapitiga a "+"$2"+" mo "+"$3"+" pihia foki mo "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Fiafia a "+"$2"+" ke he "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Fiafia a "+"$2"+" ke he "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Fiafia a "+"$2"+" mo "+"$3"+" ke he "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Fiafia a "+"$2"+" ke he "+"$3"+" mo e "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> likes this\.</span>(?=($|"|<))', "$1"+"Fiafia a "+"$2"+" ke he mena nai.");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"Fiafia e "+"$2"+" ke he mena nai.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"e matutakiaga");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Apps mo e tau Fefeua");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Tufa e "+"$2"+" e "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Tufa e "+"$2"+" e "+"$4"+" ha "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ne tufa e "+"$2"+" e "+"$3"+" haana.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ne tufa e "+"$2"+" e "+"$3"+" haana.");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Hūhū Mai");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) took a photo with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ne poki e "+"$2"+" e ata mo e "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ne fakaila a "+"$2"+" i "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ne taupoki e "+"$2"+" a "+"$3"+" he "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ne taupoki a "+"$2"+" he "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"Ne taupoki a "+"$2"+" he tau ata ha "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated her cover photo\.(?=($|"|<))', "$1"+"Ne fakafoou e ata ha "+"$2"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated his cover photo\.(?=($|"|<))', "$1"+"Ne fakafoou e ata ha "+"$2"+".");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Fanau");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Mai ia:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Utakehe");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Tau Gahua");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Hiki e Fakatino");
  d = r(d, '(^|="|>)Chat \\(Off\\)(?=($|"|<))', "$1"+"Tūtala (Ai Nofo)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Pā");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"Tau Kapitiga Uho");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Fai Tala");
  d = r(d, '(^|="|>)Cookies(?=($|"|<))', "$1"+"Kuki");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Fakamooli");
  d = r(d, '(^|="|>)Create an Ad(?=($|"|<))', "$1"+"Tālaga e Tohi Fakataki");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Tālaga e Pepa");
  d = r(d, '(^|="|>)Create Group\.\.\.(?=($|"|<))', "$1"+"Tālaga e Matakau");
  d = r(d, '(^|="|>)Create Group(?=($|"|<))', "$1"+"Tālaga e Matakau");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Tau Pulotu Talaga");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"1 e matahola kua mole");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" e matahola kua mole");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"1 e minute kua mole");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" e tau minute kua mole");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 e kapitiga mahani");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" e tau kapitiga mahani");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 E TALA FOOU");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" E TAU VALA TALA FOOU");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 foki");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"$2"+" foki");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"1 foki e kapitiga");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"$2"+" foki e tau kapitiga");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"1 foki e lau pepa");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"$2"+" foki e tau lau pepa");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"1 foki e tagata");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"$2"+" foki e tau tagata");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"1 e tagata");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" e tau tagata");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"1 e sekone");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"$2"+" e sekone");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"Laga 1 e tufa");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"Laga "+"$2"+" e tufa");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Fakahui e Fakaholoaga");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Fakahui poke Uta Kehe");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Niue");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Tohi e higoa he kapitiga poke meli hila");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Tau Mena Tutupu");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Magafaoa");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"KATIGA");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Kumi Kapitiga");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Kumi Falu Lau Pepa");
  d = r(d, '(^|="|>)Follow Post(?=($|"|<))', "$1"+"Muitua ke he Tala");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Tau Kapitiga ne Tūtala");
  d = r(d, '(^|="|>)Friend Requests(?=($|"|<))', "$1"+"Uiina ke Kapitiga");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Tau Kapitiga");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"TAU KAPITIGA");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"TAU MATAKAU");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Lagomatai");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Kaina");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"TAU UHOMANAKO");
  d = r(d, '(^|="|>)Life Event(?=($|"|<))', "$1"+"Moui Tupu Fakaholo");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Fiafia");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Fiafia");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"Fiafia ke he Lau Pepa");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Fiafia ke he Lau Pepa nei");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Tautui");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"ATU HIGOA");
  d = r(d, '(^|="|>)Log Out(?=($|"|<))', "$1"+"Hu Ki Fafo");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Fakafonua");
  d = r(d, '(^|="|>)Message(?=($|"|<))', "$1"+"Tohi");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Tohi:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Tau Tohi");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Fakaputu mai he Telefoni");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Falu Foki");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"FAI FOKI");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Falu Tala Foki");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"Tau Mena Foou");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Tau Lologo");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Matakau Foou…");
  d = r(d, '(^|="|>)New Message(?=($|"|<))', "$1"+"Tohi Foou");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Fagai Tala");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Pepa Tohi");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Fakailoaaga");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Aukialā");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Mogo Nai");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"LAU PEPA");
  d = r(d, '(^|="|>)PAGES AND ADS(?=($|"|<))', "$1"+"TAU TOHI MO E TAU FAKATAK");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Tau tagata ne fiafia ke he mena nai");
  d = r(d, '(^|="|>)People You May Know(?=($|"|<))', "$1"+"Tau Tagata Ne Liga Iloa e Koe");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Ata");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Tau Ata");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Matakavi");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Matakavi");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Tau Hoka");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Tau Hataki");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Fakatokaaga he Tau Hataki");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Hagaaoaga");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Hūhū");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Fakaholoaga Ai Leva He Mole");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"TAU TALA TOHI FOOU");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Tau Lau Pepa Ne Omoi Ki Ai");
  d = r(d, '(^|="|>)Remove Preview(?=($|"|<))', "$1"+"Uta Ke He E Fakatai");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Fakafaliu");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"$2"+", tohi haau manatu...");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Kumi");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Kumi e tau tagata, matakavi mo e tau koloa");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Kitia Oti");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Kitia Oti Ko Hai Ne Manako Kapitiga");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Kitia Oti E Tau Tohi");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Kitia Oti E Tau Fakailoaaga");
  d = r(d, '(^|="|>)See Friendship(?=($|"|<))', "$1"+"Kitia e Fekapitigaaki");
  d = r(d, '(^|="|>)See More(?=($|"|<))', "$1"+"Kitia Falu A Mena Foki");
  d = r(d, '(^|="|>)See Translation(?=($|"|<))', "$1"+"Kitia E Fakaliliuaga");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Fakafano");
  d = r(d, '(^|="|>)Send a New Message(?=($|"|<))', "$1"+"Fakafano e Tohi Foou");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Fetufaaki");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"FAKAVAHEGA");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Fakatupe");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Tuaga");
  d = r(d, '(^|="|>)Subscribe to Page(?=($|"|<))', "$1"+"Muitua ke he Pepa");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Matutakiaga");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Falu Matakau Kua Lata Ke Matutaki Ki Ai");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Taupoki e Tau Kapitiga");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Tau Hatakiaga");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Fagai Tala Foou");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Fakaholoaga");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" tata ki "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Kia:");
  d = r(d, '(^|="|>)Top Stories(?=($|"|<))', "$1"+"Tau Tala Mahuiga");
  d = r(d, '(^|="|>)Unfollow Post(?=($|"|<))', "$1"+"Ai Muitua ke he Tala");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Ai Fiafia");
  d = r(d, '(^|="|>)Update Info(?=($|"|<))', "$1"+"Fakafoou e Fakailoaaga");
  d = r(d, '(^|="|>)Update Status(?=($|"|<))', "$1"+"Fakafoou e Tūaga");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Fakaaoga e Facebook tuga a:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Kitekite ke he 1 e talahauaga");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Kitekite oti e "+"$2"+" e talahauaga");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Tau ata he Kaupā");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Fakaalofa Atu");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Fēfē haau a manatu");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Tohi taha tala…");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"I ne afi");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"I ne afi he "+"$2");
  d = r(d, '(^|="|>)<span[^>]+>You like this\.</span>(?=($|"|<))', "$1"+"Fiafia a koe ke he mena nai");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Ianuali "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ianuali "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)January ([0-9]{1,2})(?=($|"|<))', "$1"+"Ianuali "+"$2");
  d = r(d, '(^|="|>)January ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Ianuali "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Ianuali");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Fepuali "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Fepuali "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)February ([0-9]{1,2})(?=($|"|<))', "$1"+"Fepuali "+"$2");
  d = r(d, '(^|="|>)February ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Fepuali "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Fepuali");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Masi "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Masi "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)March ([0-9]{1,2})(?=($|"|<))', "$1"+"Masi "+"$2");
  d = r(d, '(^|="|>)March ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Masi "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Masi");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Apelila "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Apelila "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)April ([0-9]{1,2})(?=($|"|<))', "$1"+"Apelila "+"$2");
  d = r(d, '(^|="|>)April ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Apelila "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Apelila");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Me "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Me "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)May ([0-9]{1,2})(?=($|"|<))', "$1"+"Me "+"$2");
  d = r(d, '(^|="|>)May ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Me "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Me");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Iuni "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Iuni "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)June ([0-9]{1,2})(?=($|"|<))', "$1"+"Iuni "+"$2");
  d = r(d, '(^|="|>)June ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Iuni "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Iuni");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Iulai "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Iulai "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)July ([0-9]{1,2})(?=($|"|<))', "$1"+"Iulai "+"$2");
  d = r(d, '(^|="|>)July ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Iulai "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Iulai");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Aokuso "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aokuso "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)August ([0-9]{1,2})(?=($|"|<))', "$1"+"Aokuso "+"$2");
  d = r(d, '(^|="|>)August ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aokuso "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Aokuso");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Sepetema "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sepetema "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)September ([0-9]{1,2})(?=($|"|<))', "$1"+"Sepetema "+"$2");
  d = r(d, '(^|="|>)September ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sepetema "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Sepetema");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Oketopa "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oketopa "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)October ([0-9]{1,2})(?=($|"|<))', "$1"+"Oketopa "+"$2");
  d = r(d, '(^|="|>)October ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oketopa "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Oketopa");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Novema "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Novema "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)November ([0-9]{1,2})(?=($|"|<))', "$1"+"Novema "+"$2");
  d = r(d, '(^|="|>)November ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Novema "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Novema");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4})(?=($|"|<))', "$1"+"Tesemo "+"$2"+", "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Tesemo "+"$2"+" he matahola "+"$3");
  d = r(d, '(^|="|>)December ([0-9]{1,2})(?=($|"|<))', "$1"+"Tesemo "+"$2");
  d = r(d, '(^|="|>)December ([0-9]{1,2}), ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Tesemo "+"$2"+", "+"$3"+" he matahola "+"$4");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Tesemo");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aho Gofua mo e "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Aho Gofua");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aho Ua mo e "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Aho Ua");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aho Lotu mo e "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Aho Lotu");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aho Tuloto mo e "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Aho Tuloto");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aho Falaile mo e "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Aho Falaile");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aho Faiumu mo e "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Aho Faiumu");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aho Tapu mo e "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Aho Tapu");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"tau gahua tukulagi");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"matutaki");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"ata");
  d = r(d, '(^|>)post(?=($|<))', "$1"+"fakahū");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"tūaga");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"tūaga ainei");
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
