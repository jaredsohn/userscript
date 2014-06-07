// ==UserScript==
// @name           facebook-gv
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Manx Gaelic
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.2
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-09-25
// Translations:   Chris Sheard

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
  d = r(d, '(^|="|>)<span[^>]+>You and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"S'mie lhiat as "+"$2"+" shoh.");
  d = r(d, '(^|="|>)<span[^>]+>You, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"S'mie lhiat, "+"$2"+" as "+"$3"+" shoh.");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+>, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"S’mie lesh "+"$2"+", "+"$3"+" as "+"$4"+" shoh");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added a new photo\.(?=($|"|<))', "$1"+"Hug "+"$2"+" stiagh 1 jalloo noa.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (2) new photos\.(?=($|"|<))', "$1"+"Hug "+"$2"+" stiagh "+"$3"+" yalloo noa.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ((1?[2468]0|[0-9,]+00)) new photos\.(?=($|"|<))', "$1"+"Hug "+"$2"+" stiagh "+"$3"+" jalloo noa.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos\.(?=($|"|<))', "$1"+"Hug "+"$2"+" stiagh "+"$3"+" jalloonyn noa.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added 1 new photo to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" stiagh 1 jalloo noa ayns yn albym "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added (2) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" stiagh "+"$3"+" yalloo noa ayns yn albym "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ((1?[2468]0|[0-9,]+00)) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" stiagh "+"$3"+" jalloo noa ayns yn albym "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) added ([0-9,]+) new photos to the album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" stiagh "+"$3"+" jalloonyn noa ayns yn albym "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" as "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends\.(?=($|"|<))', "$1"+"Ta "+"$2"+" as "+"$3"+" nyn gaarjyn nish");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) are now friends with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ta "+"$2"+" as "+"$3"+" nish nyn gaarjyn da "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" as "+"$3"+" baght er "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) like (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S’mie lesh "+"$2"+" as "+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"S’mie lesh "+"$2"+" as "+"$3"+" shoh.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Rheynn "+"$2"+" as "+"$3"+" "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Rheynn "+"$2"+" as "+"$3"+" yn "+"$5"+" ec "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) were tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"Va cowragyn currit er "+"$2"+" as "+"$3"+" ayns jalloonyn "+"$4"+".");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"Mychione");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"mysh oor er dy henney");
  d = r(d, '(^|="|>)about a minute ago(?=($|"|<))', "$1"+"mysh minnid er dy henney");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"Reaghyssyn Coontys");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed her Profile picture\.(?=($|"|<))', "$1"+"Chaglaa "+"$2"+" yn jalloo coontys-bea eck.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) changed his Profile picture\.(?=($|"|<))', "$1"+"Chaglaa "+"$2"+" yn jalloo coontys-bea echey.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" baght er "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" baght er yn "+"$3"+" eck hene.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" baght er yn "+"$3"+" echey hene.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on your (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Hug "+"$2"+" baght er yn "+"$3"+" ayd.");
  d = r(d, '(^|="|>)Activity log(?=($|"|<))', "$1"+"Recortys Ymmyd");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"Gow Stiagh Myr Carrey");
  d = r(d, '(^|="|>)Add Interests\.\.\.(?=($|"|<))', "$1"+"Cur stiagh Symyn...");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"Cur Stiagh Jalloo / Feeshan");
  d = r(d, '(^|="|>)Advertising(?=($|"|<))', "$1"+"Soilsheenys");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"grig ny ghaa er dy henney");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ta "+"$2"+" ec "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) is now friends with (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ta "+"$2"+" nish ny charrey da "+"$3"+" as "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S’mie lesh "+"$2"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S’mie lesh "+"$2"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S'mie lesh "+"$2"+" yn "+"$4"+" ec "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"S’mie lesh "+"$2"+" "+"$3"+" as "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> likes this\.</span>(?=($|"|<))', "$1"+"S’mie lesh "+"$2"+" shoh.");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"S’mie lesh "+"$2"+" shoh.");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"kiangley");
  d = r(d, '(^|="|>)APPS(?=($|"|<))', "$1"+"APPYN");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Appyn as Gammanyn");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Rheynn "+"$2"+" "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Rheynn "+"$2"+" yn "+"$4"+" ec "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared her own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Rheynn "+"$2"+" yn "+"$3"+" eck hene.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared his own (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Rheynn "+"$2"+" yn "+"$3"+" echey hene.");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Cur Feysht");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) took a photo with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Ghow "+"$2"+" jalloo lesh "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged at (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Va cowrag currit er "+"$2"+" ec "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Va cowrag currit er "+"$2"+" sy "+"$4"+" ec "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Va cowrag currit er "+"$2"+" ayns "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) was tagged in (<a [^>]+>[^<]+</a>)\'s photos\.(?=($|"|<))', "$1"+"Va cowrag currit er "+"$2"+" ayns jalloonyn "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated her cover photo\.(?=($|"|<))', "$1"+"Ta jalloo coodagh noa ec "+"$2"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) updated his cover photo\.(?=($|"|<))', "$1"+"Ta jalloo coodagh noa ec "+"$2"+".");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"Ruggit");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"Liorish:");
  d = r(d, '(^|="|>)Cancel(?=($|"|<))', "$1"+"Doll Magh");
  d = r(d, '(^|="|>)Careers(?=($|"|<))', "$1"+"Coorseyn-kiartey");
  d = r(d, '(^|="|>)Change Cover(?=($|"|<))', "$1"+"Caghlaa Coodagh");
  d = r(d, '(^|="|>)Chat \\(Off\\)(?=($|"|<))', "$1"+"Gow cowag (Ass-linney)");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"Dooin");
  d = r(d, '(^|="|>)Close friends(?=($|"|<))', "$1"+"Caarjyn Mooarey");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"Cur baght er");
  d = r(d, '(^|="|>)Cookies(?=($|"|<))', "$1"+"Brishtagyn");
  d = r(d, '(^|="|>)Confirm(?=($|"|<))', "$1"+"Feeree");
  d = r(d, '(^|="|>)Create an [Aa]dvert(?=($|"|<))', "$1"+"Croo Soilsheen");
  d = r(d, '(^|="|>)Create a Page(?=($|"|<))', "$1"+"Croo Duillag");
  d = r(d, '(^|="|>)Create group(?=($|"|<))', "$1"+"Croo Possan...");
  d = r(d, '(^|="|>)Create group(?=($|"|<))', "$1"+"Croo Possan");
  d = r(d, '(^|="|>)Developers(?=($|"|<))', "$1"+"Lhiaseyderyn");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"1 oor er dy henney");
  d = r(d, '(^|="|>)(2) hours ago(?=($|"|<))', "$1"+"$2"+" oor er dy henney");
  d = r(d, '(^|="|>)((1?[2468]0|[0-9,]+00)) hours ago(?=($|"|<))', "$1"+"$2"+" oor er dy henney");
  d = r(d, '(^|="|>)([0-9,]+) hours ago(?=($|"|<))', "$1"+"$2"+" ooryn er dy henney");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"1 vinnid er dy henney");
  d = r(d, '(^|="|>)(2) minutes ago(?=($|"|<))', "$1"+"$2"+" vinnid er dy henney");
  d = r(d, '(^|="|>)((1?[2468]0|[0-9,]+00)) minutes ago(?=($|"|<))', "$1"+"$2"+" minnid er dy henney");
  d = r(d, '(^|="|>)([0-9,]+) minutes ago(?=($|"|<))', "$1"+"$2"+" minnidyn er dy henney");
  d = r(d, '(^|="|>)1 mutual friend(?=($|"|<))', "$1"+"1 cho-charrey");
  d = r(d, '(^|="|>)(2) mutual friends(?=($|"|<))', "$1"+"$2"+" cho-charrey");
  d = r(d, '(^|="|>)((1?[2468]0|[0-9,]+00)) mutual friends(?=($|"|<))', "$1"+"$2"+" co-charrey");
  d = r(d, '(^|="|>)([0-9,]+) mutual friends(?=($|"|<))', "$1"+"$2"+" co-chaarjyn");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 SKEEAL NOA");
  d = r(d, '(^|="|>)(2) NEW STORIES(?=($|"|<))', "$1"+"$2"+" SKEEAL NOA");
  d = r(d, '(^|="|>)((1?[2468]0|[0-9,]+00)) NEW STORIES(?=($|"|<))', "$1"+"$2"+" SKEEAL NOA");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" SKEEALYN NOA");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 phersoon elley");
  d = r(d, '(^|>)(2) others(?=($|<))', "$1"+"$2"+" phersoon elley");
  d = r(d, '(^|>)((1?[2468]0|[0-9,]+00)) others(?=($|<))', "$1"+"$2"+" persoon elley");
  d = r(d, '(^|>)([0-9,]+) others(?=($|<))', "$1"+"$2"+" persoonyn elley");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"1 cho-charrey elley");
  d = r(d, '(^|>)(2) other friends(?=($|<))', "$1"+"$2"+" cho-charrey elley");
  d = r(d, '(^|>)((1?[2468]0|[0-9,]+00)) other friends(?=($|<))', "$1"+"$2"+" co-charrey elley");
  d = r(d, '(^|>)([0-9,]+) other friends(?=($|<))', "$1"+"$2"+" co-chaarjyn elley");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"1 duillag elley");
  d = r(d, '(^|>)(2) other pages(?=($|<))', "$1"+"$2"+" duillag elley");
  d = r(d, '(^|>)((1?[2468]0|[0-9,]+00)) other pages(?=($|<))', "$1"+"$2"+" duillag elley");
  d = r(d, '(^|>)([0-9,]+) other pages(?=($|<))', "$1"+"$2"+" duillagyn elley");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"1 phersoon elley");
  d = r(d, '(^|>)(2) other people(?=($|<))', "$1"+"$2"+" phersoon elley");
  d = r(d, '(^|>)((1?[2468]0|[0-9,]+00)) other people(?=($|<))', "$1"+"$2"+" persoon elley");
  d = r(d, '(^|>)([0-9,]+) other people(?=($|<))', "$1"+"$2"+" persoonyn elley");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"1 phersoon");
  d = r(d, '(^|="|>)(2) people(?=($|"|<))', "$1"+"$2"+" phersoon");
  d = r(d, '(^|="|>)((1?[2468]0|[0-9,]+00)) people(?=($|"|<))', "$1"+"$2"+" persoon");
  d = r(d, '(^|="|>)([0-9,]+) people(?=($|"|<))', "$1"+"$2"+" persoonyn");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"1 tullagh er dy henney");
  d = r(d, '(^|="|>)(2) seconds ago(?=($|"|<))', "$1"+"$2"+" hullagh er dy henney");
  d = r(d, '(^|="|>)((1?[2468]0|[0-9,]+00)) seconds ago(?=($|"|<))', "$1"+"$2"+" tullagh er dy henney");
  d = r(d, '(^|="|>)([0-9,]+) seconds ago(?=($|"|<))', "$1"+"$2"+" tulleeyn er dy henney");
  d = r(d, '(^|="|>)1 share(?=($|"|<))', "$1"+"Rheynnit un cheayrt");
  d = r(d, '(^|="|>)(2) shares(?=($|"|<))', "$1"+"Rheynnit "+"$2"+" cheayrt");
  d = r(d, '(^|="|>)((1?[2468]0|[0-9,]+00)) shares(?=($|"|<))', "$1"+"Rheynnit "+"$2"+" keayrt");
  d = r(d, '(^|="|>)([0-9,]+) shares(?=($|"|<))', "$1"+"Rheynnit "+"$2"+" keayrtyn");
  d = r(d, '(^|="|>)Edit Options(?=($|"|<))', "$1"+"Jean Femblal Reihghyn");
  d = r(d, '(^|="|>)Edit or Remove(?=($|"|<))', "$1"+"Jean Femblal ny Gow Ass");
  d = r(d, '(^|="|>)English \\(UK\\)(?=($|"|<))', "$1"+"Gaelg");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Cur stiagh ennym carrey ny enmys post-l");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Taghyrtyn");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Sleih-mooinjerey");
  d = r(d, '(^|="|>)FAVOURITES(?=($|"|<))', "$1"+"REIH-REDDYN");
  d = r(d, '(^|="|>)Find Friends(?=($|"|<))', "$1"+"Fow Caarjyn");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"Fow tooilley duillagyn");
  d = r(d, '(^|="|>)Follow post(?=($|"|<))', "$1"+"Eiyr Er Post");
  d = r(d, '(^|="|>)Friends on Chat(?=($|"|<))', "$1"+"Caarjyn ta Co-loayrt");
  d = r(d, '(^|="|>)Friend requests(?=($|"|<))', "$1"+"Cuirraghyn gys caarjys");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Caarjyn");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"CAARJYN");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"POSSANYN");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"Cooney");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Thie");
  d = r(d, '(^|="|>)INTERESTS(?=($|"|<))', "$1"+"SYMYN");
  d = r(d, '(^|="|>)Life event(?=($|"|<))', "$1"+"Taghyrt Bea");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"S’mie lhiam shoh");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Reih-reddyn");
  d = r(d, '(^|="|>)Like Page(?=($|"|<))', "$1"+"Ta'n Duillag Mie");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Ta'n Duillag Shoh Mie");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Kianglaghyn");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"LISTYN");
  d = r(d, '(^|="|>)Log out(?=($|"|<))', "$1"+"Log Magh");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Kaart-cheerey");
  d = r(d, '(^|="|>)Message(?=($|"|<))', "$1"+"Chaghteraght");
  d = r(d, '(^|="|>)Message:(?=($|"|<))', "$1"+"Chaghteraght:");
  d = r(d, '(^|="|>)Messages(?=($|"|<))', "$1"+"Chaghteraghtyn");
  d = r(d, '(^|="|>)Mobile Uploads(?=($|"|<))', "$1"+"Veih Greie Shooylagh");
  d = r(d, '(^|="|>)More(?=($|"|<))', "$1"+"Tooilley");
  d = r(d, '(^|="|>)MORE(?=($|"|<))', "$1"+"TOOILLEY");
  d = r(d, '(^|="|>)More Stories(?=($|"|<))', "$1"+"Tooilley Skeealyn");
  d = r(d, '(^|="|>)Most Recent(?=($|"|<))', "$1"+"S’jeianee");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Kiaull");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Possan Noa...");
  d = r(d, '(^|="|>)New message(?=($|"|<))', "$1"+"Chaghteraght Noa");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Skeealyn Noa");
  d = r(d, '(^|="|>)Notes(?=($|"|<))', "$1"+"Baghtagyn");
  d = r(d, '(^|="|>)Notifications(?=($|"|<))', "$1"+"Fograghyn");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"Cha nee nish");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"Nish");
  d = r(d, '(^|="|>)PAGES(?=($|"|<))', "$1"+"DUILLAGYN");
  d = r(d, '(^|="|>)PAGES AND ADS(?=($|"|<))', "$1"+"DUILLAGYN AS SOILSHEENYN");
  d = r(d, '(^|="|>)People who like this(?=($|"|<))', "$1"+"Sleih s’mie lhieu shoh");
  d = r(d, '(^|="|>)People you may know(?=($|"|<))', "$1"+"Vel enney ayd er y cleih shoh?");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"Jalloo");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"Jalloonyn");
  d = r(d, '(^|="|>)Place(?=($|"|<))', "$1"+"Boayl");
  d = r(d, '(^|="|>)Places(?=($|"|<))', "$1"+"Buill");
  d = r(d, '(^|="|>)Pokes(?=($|"|<))', "$1"+"Broddyn");
  d = r(d, '(^|="|>)Privacy(?=($|"|<))', "$1"+"Preevaadjys");
  d = r(d, '(^|="|>)Privacy Settings(?=($|"|<))', "$1"+"Reaghyssyn Preevaadjys");
  d = r(d, '(^|="|>)Profile(?=($|"|<))', "$1"+"Coontys-Bea");
  d = r(d, '(^|="|>)Questions(?=($|"|<))', "$1"+"Feyshtyn");
  d = r(d, '(^|="|>)Recent Activity(?=($|"|<))', "$1"+"Ymmyd Jeianagh");
  d = r(d, '(^|="|>)RECENT POST(?=($|"|<))', "$1"+"POST JEIANAGH");
  d = r(d, '(^|="|>)Recommended Pages(?=($|"|<))', "$1"+"Duillagyn Moyllit");
  d = r(d, '(^|="|>)Remove preview(?=($|"|<))', "$1"+"Gyn Ro-reayrt");
  d = r(d, '(^|="|>)Resize(?=($|"|<))', "$1"+"Caghlaa mooadys");
  d = r(d, '(^|="|>)([^<"]+), add a comment\.\.\.(?=($|"|<))', "$1"+"$2"+", screeu baght er ...");
  d = r(d, '(^|="|>)Search(?=($|"|<))', "$1"+"Shir");
  d = r(d, '(^|="|>)Search for people, places and things(?=($|"|<))', "$1"+"Shir son sleih, buill as reddyn");
  d = r(d, '(^|="|>)See [Aa]ll(?=($|"|<))', "$1"+"Jeeagh orroo OOILLEY");
  d = r(d, '(^|="|>)See All Friend Requests(?=($|"|<))', "$1"+"Jeeagh Orroo Ooilley");
  d = r(d, '(^|="|>)See All Messages(?=($|"|<))', "$1"+"Jeeagh er ny Chaghteraghtyn OOILLEY");
  d = r(d, '(^|="|>)See All Notifications(?=($|"|<))', "$1"+"Jeeagh er OOILLEY ny Fograghyn");
  d = r(d, '(^|="|>)See friendship(?=($|"|<))', "$1"+"Jeeagh er Caarjys");
  d = r(d, '(^|="|>)See more(?=($|"|<))', "$1"+"Jeeagh er Tooilley");
  d = r(d, '(^|="|>)See translation(?=($|"|<))', "$1"+"Jeeagh er Chyndaays");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Cur");
  d = r(d, '(^|="|>)Send a new message(?=($|"|<))', "$1"+"Cur Chaghteraght Noa");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Rheynn");
  d = r(d, '(^|="|>)SORT(?=($|"|<))', "$1"+"Sorch");
  d = r(d, '(^|="|>)Sponsored(?=($|"|<))', "$1"+"Eeckit son ec y toilsheeneyder");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Staydys");
  d = r(d, '(^|="|>)Subscribe to Page(?=($|"|<))', "$1"+"Fo-screeu rish Duillag");
  d = r(d, '(^|="|>)Subscriptions(?=($|"|<))', "$1"+"Fo-screeunyn");
  d = r(d, '(^|="|>)Suggested Groups(?=($|"|<))', "$1"+"Possanyn shione dhyt foddee");
  d = r(d, '(^|="|>)Tag Friends(?=($|"|<))', "$1"+"Cur Cowrag er Caarjyn");
  d = r(d, '(^|="|>)Terms(?=($|"|<))', "$1"+"Connaantyn");
  d = r(d, '(^|="|>)Ticker(?=($|"|<))', "$1"+"Grigeyr");
  d = r(d, '(^|="|>)Timeline(?=($|"|<))', "$1"+"Linney-traa");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) near (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" faggys da "+"$3");
  d = r(d, '(^|="|>)To:(?=($|"|<))', "$1"+"Gys:");
  d = r(d, '(^|="|>)Top stories(?=($|"|<))', "$1"+"Skeealyn Share");
  d = r(d, '(^|="|>)Unfollow post(?=($|"|<))', "$1"+"Nagh Eiyr er Post Arragh");
  d = r(d, '(^|="|>)Unlike(?=($|"|<))', "$1"+"Cha mie lhiam shoh");
  d = r(d, '(^|="|>)Update info(?=($|"|<))', "$1"+"Fysseree Noa");
  d = r(d, '(^|="|>)Update status(?=($|"|<))', "$1"+"Staydys Noa");
  d = r(d, '(^|="|>)Use Facebook as:(?=($|"|<))', "$1"+"Jean ymmyd jeh Facebook myr:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Jeeagh er 1 vaght");
  d = r(d, '(^|="|>)View all (2) comments(?=($|"|<))', "$1"+"Jeeagh er "+"$2"+" vaght");
  d = r(d, '(^|="|>)View all ((1?[2468]0|[0-9,]+00)) comments(?=($|"|<))', "$1"+"Jeeagh er yn "+"$2"+" baght ooilley");
  d = r(d, '(^|="|>)View all ([0-9,]+) comments(?=($|"|<))', "$1"+"Jeeagh er ny "+"$2"+" baghtyn ooilley");
  d = r(d, '(^|="|>)Wall Photos(?=($|"|<))', "$1"+"Jalloonyn Boalley");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Failt");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"C’red t’er dty inchyn?");
  d = r(d, '(^|="|>)Write a comment\.\.\.(?=($|"|<))', "$1"+"Screeu baght er ...");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Jea");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"Jea ec "+"$2");
  d = r(d, '(^|="|>)<span[^>]+>You like this\.</span>(?=($|"|<))', "$1"+"S’mie lhiat shoh.");
  d = r(d, '(^|="|>)([0-9]{1,2}) January(?=($|"|<))', "$1"+"$2"+" Jerrey Geuree");
  d = r(d, '(^|="|>)([0-9]{1,2}) January ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jerrey Geuree, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) January at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jerrey Geuree ec "+"$3");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"Jerrey Geuree");
  d = r(d, '(^|="|>)([0-9]{1,2}) January ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Jerrey Geuree, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) February(?=($|"|<))', "$1"+"$2"+" Toshiaght Arree");
  d = r(d, '(^|="|>)([0-9]{1,2}) February ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Toshiaght Arree, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) February at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Toshiaght Arree ec "+"$3");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Toshiaght Arree");
  d = r(d, '(^|="|>)([0-9]{1,2}) February ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Toshiaght Arree, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) March(?=($|"|<))', "$1"+"$2"+" Mayrnt");
  d = r(d, '(^|="|>)([0-9]{1,2}) March ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mayrnt, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) March at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mayrnt ec "+"$3");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"Mayrnt");
  d = r(d, '(^|="|>)([0-9]{1,2}) March ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Mayrnt, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) April(?=($|"|<))', "$1"+"$2"+" Averil");
  d = r(d, '(^|="|>)([0-9]{1,2}) April ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Averil, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) April at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Averil ec "+"$3");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"Averil");
  d = r(d, '(^|="|>)([0-9]{1,2}) April ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Averil, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) May(?=($|"|<))', "$1"+"$2"+" Boaldyn");
  d = r(d, '(^|="|>)([0-9]{1,2}) May ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Boaldyn, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) May at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Boaldyn ec "+"$3");
  d = r(d, '(^|="|>)May(?=($|"|<))', "$1"+"Boaldyn");
  d = r(d, '(^|="|>)([0-9]{1,2}) May ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Boaldyn, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) June(?=($|"|<))', "$1"+"$2"+" Mean Souree");
  d = r(d, '(^|="|>)([0-9]{1,2}) June ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mean Souree, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) June at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mean Souree ec "+"$3");
  d = r(d, '(^|="|>)June(?=($|"|<))', "$1"+"Mean Souree");
  d = r(d, '(^|="|>)([0-9]{1,2}) June ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Mean Souree, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) July(?=($|"|<))', "$1"+"$2"+" Jerrey Souree");
  d = r(d, '(^|="|>)([0-9]{1,2}) July ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jerrey Souree, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) July at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jerrey Souree ec "+"$3");
  d = r(d, '(^|="|>)July(?=($|"|<))', "$1"+"Jerrey Souree");
  d = r(d, '(^|="|>)([0-9]{1,2}) July ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Jerrey Souree, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) August(?=($|"|<))', "$1"+"$2"+" Luanistyn");
  d = r(d, '(^|="|>)([0-9]{1,2}) August ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Luanistyn, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) August at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Luanistyn ec "+"$3");
  d = r(d, '(^|="|>)August(?=($|"|<))', "$1"+"Luanistyn");
  d = r(d, '(^|="|>)([0-9]{1,2}) August ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Luanistyn, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) September(?=($|"|<))', "$1"+"$2"+" Mean Fouyir");
  d = r(d, '(^|="|>)([0-9]{1,2}) September ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mean Fouyir, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) September at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mean Fouyir ec "+"$3");
  d = r(d, '(^|="|>)September(?=($|"|<))', "$1"+"Mean Fouyir");
  d = r(d, '(^|="|>)([0-9]{1,2}) September ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Mean Fouyir, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) October(?=($|"|<))', "$1"+"$2"+" Jerrey Fouyir");
  d = r(d, '(^|="|>)([0-9]{1,2}) October ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jerrey Fouyir, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) October at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Jerrey Fouyir ec "+"$3");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Jerrey Fouyir");
  d = r(d, '(^|="|>)([0-9]{1,2}) October ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Jerrey Fouyir, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) November(?=($|"|<))', "$1"+"$2"+" Mee Houney");
  d = r(d, '(^|="|>)([0-9]{1,2}) November ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mee Houney, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) November at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mee Houney ec "+"$3");
  d = r(d, '(^|="|>)November(?=($|"|<))', "$1"+"Mee Houney");
  d = r(d, '(^|="|>)([0-9]{1,2}) November ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Mee Houney, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) December(?=($|"|<))', "$1"+"$2"+" Mee ny Nollick");
  d = r(d, '(^|="|>)([0-9]{1,2}) December ([0-9]{4}) at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mee ny Nollick, "+"$3"+" ec "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) December at ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mee ny Nollick ec "+"$3");
  d = r(d, '(^|="|>)December(?=($|"|<))', "$1"+"Mee ny Nollick");
  d = r(d, '(^|="|>)([0-9]{1,2}) December ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Mee ny Nollick, "+"$3");
  d = r(d, '(^|="|>)Monday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jelune ec "+"$2");
  d = r(d, '(^|="|>)Monday(?=($|"|<))', "$1"+"Jelune");
  d = r(d, '(^|="|>)Tuesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jemayrt ec "+"$2");
  d = r(d, '(^|="|>)Tuesday(?=($|"|<))', "$1"+"Jemayrt");
  d = r(d, '(^|="|>)Wednesday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jecrean ec "+"$2");
  d = r(d, '(^|="|>)Wednesday(?=($|"|<))', "$1"+"Jecrean");
  d = r(d, '(^|="|>)Thursday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jerdein ec "+"$2");
  d = r(d, '(^|="|>)Thursday(?=($|"|<))', "$1"+"Jerdein");
  d = r(d, '(^|="|>)Friday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jeheiney ec "+"$2");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Jeheiney");
  d = r(d, '(^|="|>)Saturday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jesarn ec "+"$2");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Jesarn");
  d = r(d, '(^|="|>)Sunday at ([0-9:.apm]+)(?=($|"|<))', "$1"+"Jedoonee ec "+"$2");
  d = r(d, '(^|="|>)Sunday(?=($|"|<))', "$1"+"Jedoonee");
  d = r(d, '(^|>)life event(?=($|<))', "$1"+"taghyrt bea");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"kiangley");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"jalloo");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"staydys");
  d = r(d, '(^|>)status update(?=($|<))', "$1"+"staydys noa");
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
