// ==UserScript==
// @name           facebook-fkv-x-oys
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Kven Finnish (öystä)
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.2
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-10-11
// Translations:   Mervi Haavisto, Pirjo Paavalniemi, Terje Aronsen

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
  d = r(d, '(^|="|>)<span[^>]+>Du og </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> liker dette\.</span>(?=($|"|<))', "$1"+"Sie ja "+"$2"+" tykkäättä tästä.");
  d = r(d, '(^|="|>)<span[^>]+>Du, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> og </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> liker dette\.</span>(?=($|"|<))', "$1"+"Sie, "+"$2"+" ja "+"$3"+" tykkäättä tästä.");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+>, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> og </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> liker dette\.</span>(?=($|"|<))', "$1"+"$2"+", "+"$3"+" ja "+"$4"+" tykkäävä tästä.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) har lagt til et nytt bilde\.(?=($|"|<))', "$1"+"$2"+" lisäsi uuen kuvan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) har lagt til ([0-9,]+) nye bilder\.(?=($|"|<))', "$1"+"$2"+" lisäsi "+"$3"+" uutta kuvvaa.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) har lagt til et nytt bilde i albumet (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" lisäsi 1 uuen kuvan albumhiin "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) har lagt til ([0-9,]+) nye bilder i albumet (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" lisäsi "+"$3"+" uutta kuvvaa albumhiin "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" ja "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) er nå venner\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" oon nyt ystävät.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) er nå venner med (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" oon nyt ystävät tämän kans: "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" kommenteerathiin "+"$4"+"elämäntapahtummaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" kommenteerathiin "+"$4"+"linkkiä</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" kommenteerathiin "+"$4"+"kuvvaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" kommenteerathiin "+"$4"+"muistelusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" kommenteerathiin "+"$4"+"staattusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" kommenteerathiin "+"$4"+"staattuksen uuistamista</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" kommenteerathiin "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" tykkäävä sivusta "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> og </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> liker dette\.</span>(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" tykkäävä tästä.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) delte (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" jaethiin "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>) delte (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ja "+"$3"+" jaethiin "+"$5"+" jonka "+"$4"+" oon julkaissu.");
  d = r(d, '(^|="|>)Om(?=($|"|<))', "$1"+"Tietoja");
  d = r(d, '(^|="|>)for ca\. en time siden(?=($|"|<))', "$1"+"kohta tiima aikaa");
  d = r(d, '(^|="|>)for ca\. ett minutt siden(?=($|"|<))', "$1"+"kohta minutti aikaa");
  d = r(d, '(^|="|>)Kontoinnstillinger(?=($|"|<))', "$1"+"Konton asetukset");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) har byttet profilbilde\.(?=($|"|<))', "$1"+"$2"+" vaihetti oman profiilikuvan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) har byttet profilbilde\.(?=($|"|<))', "$1"+"$2"+" vaihetti oman profiilikuvan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi "+"$3"+"elämäntapahtummaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi "+"$3"+"linkkiä</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi "+"$3"+"kuvvaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi "+"$3"+"muistelusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi "+"$3"+"staattusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi "+"$3"+"staattuksen uuistamista</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte e[nt] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"elämäntapahtummaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"linkkiä</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"kuvvaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"muistelusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"staattusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"staattuksen uuistamista</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"elämäntapahtummaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"linkkiä</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"kuvvaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"muistelusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"staattusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+"staattuksen uuistamista</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte si[nt]t? ege[nt] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi ommaa "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte di[nt]t? (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi sinun "+"$3"+"elämäntapahtummaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte di[nt]t? (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi sinun "+"$3"+"linkkiä</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte di[nt]t? (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi sinun "+"$3"+"kuvvaa</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte di[nt]t? (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi sinun "+"$3"+"muistelusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte di[nt]t? (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi sinun "+"$3"+"staattusta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte di[nt]t? (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi sinun "+"$3"+"staattuksen uuistamista</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) kommenterte di[nt]t? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kommenteerasi sinun "+"$3"+".");
  d = r(d, '(^|="|>)Aktivitetslogg(?=($|"|<))', "$1"+"Aktiviteettilogi");
  d = r(d, '(^|="|>)Legg til som venn(?=($|"|<))', "$1"+"Lissää ystävän");
  d = r(d, '(^|="|>)Legg til interesser \.\.\.(?=($|"|<))', "$1"+"Lissää intressejä...");
  d = r(d, '(^|="|>)Legg til bilde/video(?=($|"|<))', "$1"+"Lissää kuvan / videon");
  d = r(d, '(^|="|>)Annonsering(?=($|"|<))', "$1"+"Anonseeraus");
  d = r(d, '(^|="|>)for noen sekunder siden(?=($|"|<))', "$1"+"justhiin nyt");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) er på (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" oon täälä: "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) er nå venn med (<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" oon nyt ystävä näitten kans: "+"$3"+" ja "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" tykkää tästä: "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker e[nt] (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$3"+"elämäntapahtumasta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker e[nt] (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$3"+"linkistä</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker e[nt] (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$3"+"kuvasta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker e[nt] (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$3"+"muisteluksesta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker e[nt] (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$3"+"staattuksesta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker e[nt] (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$3"+"staattuksen uuistamisesta</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker e[nt] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$4"+"elämäntapahtumasta</a>"+" jonka "+"$3"+" oon julkaissu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$4"+"linkistä</a>"+" jonka "+"$3"+" oon julkaissu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$4"+"kuvasta</a>"+" jonka "+"$3"+" oon julkaissu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$4"+"muisteluksesta</a>"+" jonka "+"$3"+" oon julkaissu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$4"+"staattuksesta</a>"+" jonka "+"$3"+" oon julkaissu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$4"+"staattuksen uuistamisesta</a>"+" jonka "+"$3"+" oon julkaissu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" tykkää "+"$4"+" jonka "+"$3"+" oon julkaissu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) liker (<a [^>]+>[^<]+</a>) og (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" tykkää sivusta "+"$3"+" ja "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> liker dette\.</span>(?=($|"|<))', "$1"+"$2"+" tykkää tästä.");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> liker dette\.</span>(?=($|"|<))', "$1"+"$2"+" tykkäävä tästä.");
  d = r(d, '(^|>)en lenke(?=($|<))', "$1"+"linkin");
  d = r(d, '(^|="|>)APPLIKASJONER(?=($|"|<))', "$1"+"APPLIT");
  d = r(d, '(^|="|>)Applikasjonssenter(?=($|"|<))', "$1"+"Applit ja pelit");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) delte (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" jakoi "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) delte (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" jakoi "+"$4"+" jonka "+"$3"+" oon julkaissu.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) delte si[nt]t? ege[nt] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" jakoi oman "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) delte si[nt]t? ege[nt] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" jakoi oman "+"$3"+".");
  d = r(d, '(^|="|>)Still spørsmål(?=($|"|<))', "$1"+"Kysy");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$4"+"elämäntapahtumhaan</a>"+" jonka "+"$3"+" julkaisi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$4"+"linkkhiin</a>"+" jonka "+"$3"+" julkaisi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$4"+"kuvhaan</a>"+" jonka "+"$3"+" julkaisi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$4"+"muisteluksheen</a>"+" jonka "+"$3"+" julkaisi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$4"+"staattuksheen</a>"+" jonka "+"$3"+" julkaisi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$4"+"staattuksen uuistamisheen</a>"+" jonka "+"$3"+" julkaisi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i (<a [^>]+>[^<]+</a>) si[nt]t? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$4"+" jonka "+"$3"+" julkaisi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i e[nt] (<a [^>]+>)livshendelse</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$3"+"elämäntapahtumhaan</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i e[nt] (<a [^>]+>)lenke</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$3"+"linkkhiin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i e[nt] (<a [^>]+>)bilde</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$3"+"kuvhaan</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i e[nt] (<a [^>]+>)innlegg</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$3"+"muisteluksheen</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i e[nt] (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$3"+"staattuksheen</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i e[nt] (<a [^>]+>)statusoppdatering</a>\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$3"+"staattuksen uuistamisheen</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i e[nt] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" oon merkitty "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ble tagget i bildene til (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" oon merkitty kuvhiin jokka "+"$3"+" julkaisi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oppdaterte forsidebildet sitt\.(?=($|"|<))', "$1"+"$2"+" uuisti oman etusivun kuvan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oppdaterte forsidebildet sitt\.(?=($|"|<))', "$1"+"$2"+" uuisti oman etusivun kuvan.");
  d = r(d, '(^|="|>)Født(?=($|"|<))', "$1"+"Syntyny");
  d = r(d, '(^|="|>)via(?=($|"|<))', "$1"+"Keneltä:");
  d = r(d, '(^|="|>)Avbryt(?=($|"|<))', "$1"+"Ei sittekhään");
  d = r(d, '(^|="|>)Jobber(?=($|"|<))', "$1"+"Karriäärit");
  d = r(d, '(^|="|>)Endre forsidebilde(?=($|"|<))', "$1"+"Vaiheta kuvan");
  d = r(d, '(^|="|>)Chat \\(frakoblet\\)(?=($|"|<))', "$1"+"Praati (Ei käytössä)");
  d = r(d, '(^|="|>)Lukk(?=($|"|<))', "$1"+"Sulje");
  d = r(d, '(^|="|>)Nære venner(?=($|"|<))', "$1"+"Liki ystävät");
  d = r(d, '(^|="|>)Kommenter(?=($|"|<))', "$1"+"Kommenteeraa");
  d = r(d, '(^|="|>)Informasjonskapsler(?=($|"|<))', "$1"+"Cookies");
  d = r(d, '(^|="|>)Bekreft(?=($|"|<))', "$1"+"Hyväksy");
  d = r(d, '(^|="|>)Opprett en annonse(?=($|"|<))', "$1"+"Luo anonsin");
  d = r(d, '(^|="|>)Opprett en side(?=($|"|<))', "$1"+"Luo sivun");
  d = r(d, '(^|="|>)Opprett en gruppe \.\.\.(?=($|"|<))', "$1"+"Luo roikan...");
  d = r(d, '(^|="|>)Opprett ny gruppe(?=($|"|<))', "$1"+"Luo roikan");
  d = r(d, '(^|="|>)Utviklere(?=($|"|<))', "$1"+"Kehittäjät");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"1 tiima aikaa");
  d = r(d, '(^|="|>)for ([0-9,]+) timer siden(?=($|"|<))', "$1"+"$2"+" tiimaa aikaa");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"1 minutti aikaa");
  d = r(d, '(^|="|>)for ([0-9,]+) minutter siden(?=($|"|<))', "$1"+"$2"+" minuttia aikaa");
  d = r(d, '(^|="|>)1 felles venn(?=($|"|<))', "$1"+"1 yhtheinen ystävä");
  d = r(d, '(^|="|>)([0-9,]+) felles venner(?=($|"|<))', "$1"+"$2"+" yhtheistä ystävää");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"1 muu");
  d = r(d, '(^|>)([0-9,]+) andre(?=($|<))', "$1"+"$2"+" muuta");
  d = r(d, '(^|>)1 other friend(?=($|<))', "$1"+"yksi muu ystävä");
  d = r(d, '(^|>)([0-9,]+) andre venner(?=($|<))', "$1"+"$2"+" muuta ystävää");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"1 muusta sivusta");
  d = r(d, '(^|>)([0-9,]+) sider til(?=($|<))', "$1"+"$2"+" muusta sivusta");
  d = r(d, '(^|>)1 other person(?=($|<))', "$1"+"1 muu ihminen");
  d = r(d, '(^|>)([0-9,]+) andre personer(?=($|<))', "$1"+"$2"+" muuta ihmistä");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"1 ihminen");
  d = r(d, '(^|="|>)([0-9,]+) personer(?=($|"|<))', "$1"+"$2"+" ihmistä");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"1 sekuntti aikaa");
  d = r(d, '(^|="|>)for ([0-9,]+) sekunder siden(?=($|"|<))', "$1"+"$2"+" sekunttia aikaa");
  d = r(d, '(^|="|>)1 deling(?=($|"|<))', "$1"+"1 jako");
  d = r(d, '(^|="|>)([0-9,]+) delinger(?=($|"|<))', "$1"+"$2"+" jakoa");
  d = r(d, '(^|="|>)Endre alternativer(?=($|"|<))', "$1"+"Muuta alternatiiviä");
  d = r(d, '(^|="|>)Rediger eller fjern(?=($|"|<))', "$1"+"Muuta tahi poista");
  d = r(d, '(^|="|>)Norsk \\(bokmål\\)(?=($|"|<))', "$1"+"Kvääni/Kainu (öystä)");
  d = r(d, '(^|="|>)Skriv inn navnet eller e-postadressen til en venn(?=($|"|<))', "$1"+"Lissää ystävän nimen tahi e-postiadressin");
  d = r(d, '(^|="|>)Arrangementer(?=($|"|<))', "$1"+"Tapahtumat");
  d = r(d, '(^|="|>)Familie(?=($|"|<))', "$1"+"Peret");
  d = r(d, '(^|="|>)FAVORITTER(?=($|"|<))', "$1"+"FAVORIITIT");
  d = r(d, '(^|="|>)Finn venner(?=($|"|<))', "$1"+"Haje ystäviä");
  d = r(d, '(^|="|>)Finn flere sider(?=($|"|<))', "$1"+"Haje enämen sivuja");
  d = r(d, '(^|="|>)Venner på chat(?=($|"|<))', "$1"+"Ystävät Praatissa");
  d = r(d, '(^|="|>)Venneforespørsler(?=($|"|<))', "$1"+"Ystäväpyynöt");
  d = r(d, '(^|="|>)Venner(?=($|"|<))', "$1"+"Ystävät");
  d = r(d, '(^|="|>)VENNER(?=($|"|<))', "$1"+"YSTÄVÄT");
  d = r(d, '(^|="|>)GRUPPER(?=($|"|<))', "$1"+"ROIKAT");
  d = r(d, '(^|="|>)Hjelp(?=($|"|<))', "$1"+"Apu");
  d = r(d, '(^|="|>)Hjem(?=($|"|<))', "$1"+"Koti");
  d = r(d, '(^|="|>)INTERESSER(?=($|"|<))', "$1"+"INTRESSIT");
  d = r(d, '(^|="|>)Livshendelse(?=($|"|<))', "$1"+"Elämäntapahtuma");
  d = r(d, '(^|="|>)Liker(?=($|"|<))', "$1"+"Tykkää");
  d = r(d, '(^|="|>)Liker(?=($|"|<))', "$1"+"Tykkäämiset");
  d = r(d, '(^|="|>)Lik side(?=($|"|<))', "$1"+"Tykkää sivusta");
  d = r(d, '(^|="|>)Lik denne siden(?=($|"|<))', "$1"+"Tykkää tästä sivusta");
  d = r(d, '(^|="|>)Lenker(?=($|"|<))', "$1"+"Linkit");
  d = r(d, '(^|="|>)Lister(?=($|"|<))', "$1"+"LISTAT");
  d = r(d, '(^|="|>)Logg ut(?=($|"|<))', "$1"+"Lopeta");
  d = r(d, '(^|="|>)Kart(?=($|"|<))', "$1"+"Kartta");
  d = r(d, '(^|="|>)Send melding(?=($|"|<))', "$1"+"Mellinki");
  d = r(d, '(^|="|>)Send melding:(?=($|"|<))', "$1"+"Mellinki:");
  d = r(d, '(^|="|>)Meldinger(?=($|"|<))', "$1"+"Mellingit");
  d = r(d, '(^|="|>)Mobilopplastninger(?=($|"|<))', "$1"+"Mobiilin lastaukset");
  d = r(d, '(^|="|>)Mer(?=($|"|<))', "$1"+"Enämen");
  d = r(d, '(^|="|>)MER(?=($|"|<))', "$1"+"ENÄMEN");
  d = r(d, '(^|="|>)Vis alle hendelser(?=($|"|<))', "$1"+"Enämen muisteluksia");
  d = r(d, '(^|="|>)Siste nytt(?=($|"|<))', "$1"+"Viimi muistelukset");
  d = r(d, '(^|="|>)Musikk(?=($|"|<))', "$1"+"Musikki");
  d = r(d, '(^|="|>)Ny melding(?=($|"|<))', "$1"+"Uusi mellinki");
  d = r(d, '(^|="|>)Nyhetsoppdatering(?=($|"|<))', "$1"+"Muistelukset");
  d = r(d, '(^|="|>)Notater(?=($|"|<))', "$1"+"Muisthoonpanot");
  d = r(d, '(^|="|>)Varsler(?=($|"|<))', "$1"+"Ilmoitukset");
  d = r(d, '(^|="|>)Ikke nå(?=($|"|<))', "$1"+"Ei nyt");
  d = r(d, '(^|="|>)Nå(?=($|"|<))', "$1"+"Nyt");
  d = r(d, '(^|="|>)SIDER(?=($|"|<))', "$1"+"SIVUT");
  d = r(d, '(^|="|>)Personer som liker dette(?=($|"|<))', "$1"+"Ihmiset jokka tykkäävä tästä");
  d = r(d, '(^|="|>)Personer du kanskje kjenner(?=($|"|<))', "$1"+"Ihmiset joita piian tunnet");
  d = r(d, '(^|="|>)Bilde(?=($|"|<))', "$1"+"Kuva");
  d = r(d, '(^|="|>)Bilder(?=($|"|<))', "$1"+"Kuvat");
  d = r(d, '(^|="|>)Sted(?=($|"|<))', "$1"+"Paikka");
  d = r(d, '(^|="|>)Steder(?=($|"|<))', "$1"+"Paikat");
  d = r(d, '(^|="|>)Poker(?=($|"|<))', "$1"+"Koputukset");
  d = r(d, '(^|="|>)Personvern(?=($|"|<))', "$1"+"Persoonasuoja");
  d = r(d, '(^|="|>)Personverninnstillinger(?=($|"|<))', "$1"+"Persoonasuojan asetukset");
  d = r(d, '(^|="|>)Profil(?=($|"|<))', "$1"+"Profiili");
  d = r(d, '(^|="|>)Spørsmål(?=($|"|<))', "$1"+"Kysymykset");
  d = r(d, '(^|="|>)Aktiviteter(?=($|"|<))', "$1"+"Viimi aktiviteetti");
  d = r(d, '(^|="|>)NYLIGE INNLEGG(?=($|"|<))', "$1"+"VIIMI MUISTELUKSET");
  d = r(d, '(^|="|>)Anbefalte sider(?=($|"|<))', "$1"+"Ehotetut sivut");
  d = r(d, '(^|="|>)Fjern forhåndsvisning(?=($|"|<))', "$1"+"Poista");
  d = r(d, '(^|="|>)Fremhevet(?=($|"|<))', "$1"+"Vaiheta kovon");
  d = r(d, '(^|="|>)Skriv en kommentar \.\.\.(?=($|"|<))', "$1"+"Kirjoita kommentaarin...");
  d = r(d, '(^|="|>)Søk(?=($|"|<))', "$1"+"Haje");
  d = r(d, '(^|="|>)Søk etter personer, steder og ting(?=($|"|<))', "$1"+"Haje ihmisiä, paikkoja ja asioita");
  d = r(d, '(^|="|>)Vis alle(?=($|"|<))', "$1"+"Näytä kaikki");
  d = r(d, '(^|="|>)Vis alle(?=($|"|<))', "$1"+"Näytä kaikki ystäväpyynöt");
  d = r(d, '(^|="|>)Vis alle(?=($|"|<))', "$1"+"Näytä kaikki mellingit");
  d = r(d, '(^|="|>)Vis alle(?=($|"|<))', "$1"+"Näytä kaikki ilmoitukset");
  d = r(d, '(^|="|>)Se vennskap(?=($|"|<))', "$1"+"Näytä ystävyyen");
  d = r(d, '(^|="|>)Vis flere(?=($|"|<))', "$1"+"Näytä enämen");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Lähätä");
  d = r(d, '(^|="|>)Send en ny melding(?=($|"|<))', "$1"+"Lähätä uuen mellingin");
  d = r(d, '(^|="|>)Del(?=($|"|<))', "$1"+"Jaa");
  d = r(d, '(^|="|>)SORTER(?=($|"|<))', "$1"+"SORTTEERAA");
  d = r(d, '(^|="|>)Sponset(?=($|"|<))', "$1"+"Sponsoreerattu");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Staattus");
  d = r(d, '(^|="|>)Abonnementer(?=($|"|<))', "$1"+"Abonnementit");
  d = r(d, '(^|="|>)Foreslåtte grupper(?=($|"|<))', "$1"+"Ehotetut roikat");
  d = r(d, '(^|="|>)Tag venner(?=($|"|<))', "$1"+"Merkitte ystäviä");
  d = r(d, '(^|="|>)Betingelser(?=($|"|<))', "$1"+"Käyttöehot");
  d = r(d, '(^|="|>)ticker(?=($|"|<))', "$1"+"Uutiset nyt");
  d = r(d, '(^|="|>)Tidslinje(?=($|"|<))', "$1"+"Aikalinja");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) i nærheten av (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" likelä tätä paikkaa: "+"$3");
  d = r(d, '(^|="|>)Til:(?=($|"|<))', "$1"+"Kenele:");
  d = r(d, '(^|="|>)Topphendelser(?=($|"|<))', "$1"+"Tärkeimät muistelukset");
  d = r(d, '(^|="|>)Liker ikke(?=($|"|<))', "$1"+"En tykkääkhään");
  d = r(d, '(^|="|>)Oppdater informasjon(?=($|"|<))', "$1"+"Uuista tietoja");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Uuista staattuksen");
  d = r(d, '(^|="|>)Bruk Facebook som:(?=($|"|<))', "$1"+"Valitte mitä Facebook-sivua käytät:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Näytä 1 kommentaarin");
  d = r(d, '(^|="|>)Vis alle ([0-9,]+) kommentarene(?=($|"|<))', "$1"+"Näytä kaikki "+"$2"+" kommentaaria");
  d = r(d, '(^|="|>)Veggbilder(?=($|"|<))', "$1"+"Etusivun kuvat");
  d = r(d, '(^|="|>)Velkommen(?=($|"|<))', "$1"+"Tervettulemaa");
  d = r(d, '(^|="|>)Hva tenker du på\\?(?=($|"|<))', "$1"+"Mitä sie hunteeraat?");
  d = r(d, '(^|="|>)Skriv en kommentar\.\.\.(?=($|"|<))', "$1"+"Kirjoita kommentaarin...");
  d = r(d, '(^|="|>)i går(?=($|"|<))', "$1"+"Eilen");
  d = r(d, '(^|="|>)i går kl\. ([^<"]+)(?=($|"|<))', "$1"+"Eilen klo "+"$2");
  d = r(d, '(^|="|>)<span[^>]+>Du liker dette\.</span>(?=($|"|<))', "$1"+"Sie tykkäät tästä.");
  d = r(d, '(^|="|>)([0-9]{1,2})\. januar(?=($|"|<))', "$1"+"Januaarikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. januar kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Januaarikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. januar ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Januaarikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)januar(?=($|"|<))', "$1"+"Januaarikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. januar ([0-9]{4})(?=($|"|<))', "$1"+"Januaarikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. februar(?=($|"|<))', "$1"+"Fepruaarikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. februar kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Fepruaarikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. februar ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Fepruaarikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)februar(?=($|"|<))', "$1"+"Fepruaarikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. februar ([0-9]{4})(?=($|"|<))', "$1"+"Fepruaarikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. mars(?=($|"|<))', "$1"+"Marsikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. mars kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Marsikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. mars ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Marsikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)mars(?=($|"|<))', "$1"+"Marsikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. mars ([0-9]{4})(?=($|"|<))', "$1"+"Marsikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. april(?=($|"|<))', "$1"+"Aprillikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. april kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aprillikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. april ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aprillikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)april(?=($|"|<))', "$1"+"Aprillikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. april ([0-9]{4})(?=($|"|<))', "$1"+"Aprillikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. mai(?=($|"|<))', "$1"+"Maikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. mai kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Maikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. mai ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Maikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)mai(?=($|"|<))', "$1"+"Maikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. mai ([0-9]{4})(?=($|"|<))', "$1"+"Maikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. juni(?=($|"|<))', "$1"+"Juunikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. juni kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Juunikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. juni ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Juunikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)juni(?=($|"|<))', "$1"+"Juunikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. juni ([0-9]{4})(?=($|"|<))', "$1"+"Juunikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. juli(?=($|"|<))', "$1"+"Juulikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. juli kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Juulikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. juli ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Juulikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)juli(?=($|"|<))', "$1"+"Juulikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. juli ([0-9]{4})(?=($|"|<))', "$1"+"Juulikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. august(?=($|"|<))', "$1"+"Aukustikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. august kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aukustikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. august ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Aukustikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)august(?=($|"|<))', "$1"+"Aukustikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. august ([0-9]{4})(?=($|"|<))', "$1"+"Aukustikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. september(?=($|"|<))', "$1"+"Septemperikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. september kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Septemperikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. september ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Septemperikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)september(?=($|"|<))', "$1"+"Septemperikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. september ([0-9]{4})(?=($|"|<))', "$1"+"Septemperikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. oktober(?=($|"|<))', "$1"+"Oktooperikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. oktober kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oktooperikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. oktober ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Oktooperikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)oktober(?=($|"|<))', "$1"+"Oktooperikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. oktober ([0-9]{4})(?=($|"|<))', "$1"+"Oktooperikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. november(?=($|"|<))', "$1"+"Novemperikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. november kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Novemperikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. november ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Novemperikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)november(?=($|"|<))', "$1"+"Novemperikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. november ([0-9]{4})(?=($|"|<))', "$1"+"Novemperikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. desember(?=($|"|<))', "$1"+"Desemperikuun "+"$2"+". päivä");
  d = r(d, '(^|="|>)([0-9]{1,2})\. desember kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Desemperikuun "+"$2"+". päivä klo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2})\. desember ([0-9]{4}) kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Desemperikuun "+"$2"+". päivä, "+"$3"+" klo "+"$4");
  d = r(d, '(^|="|>)desember(?=($|"|<))', "$1"+"Desemperikuu");
  d = r(d, '(^|="|>)([0-9]{1,2})\. desember ([0-9]{4})(?=($|"|<))', "$1"+"Desemperikuun "+"$2"+". päivä, "+"$3");
  d = r(d, '(^|="|>)mandag kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Maanantai klo "+"$2");
  d = r(d, '(^|="|>)mandag(?=($|"|<))', "$1"+"Maanantai");
  d = r(d, '(^|="|>)tirsdag kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Tiistai klo "+"$2");
  d = r(d, '(^|="|>)tirsdag(?=($|"|<))', "$1"+"Tiistai");
  d = r(d, '(^|="|>)onsdag kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Keskiviikko klo "+"$2");
  d = r(d, '(^|="|>)onsdag(?=($|"|<))', "$1"+"Keskiviikko");
  d = r(d, '(^|="|>)torsdag kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Tuorestai klo "+"$2");
  d = r(d, '(^|="|>)torsdag(?=($|"|<))', "$1"+"Tuorestai");
  d = r(d, '(^|="|>)fredag kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Perjantai klo "+"$2");
  d = r(d, '(^|="|>)fredag(?=($|"|<))', "$1"+"Perjantai");
  d = r(d, '(^|="|>)lørdag kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lauvantai klo "+"$2");
  d = r(d, '(^|="|>)lørdag(?=($|"|<))', "$1"+"Lauvantai");
  d = r(d, '(^|="|>)søndag kl\. ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sunnuntai klo "+"$2");
  d = r(d, '(^|="|>)søndag(?=($|"|<))', "$1"+"Sunnuntai");
  d = r(d, '(^|>)livshendelse(?=($|<))', "$1"+"elämäntapahtuman");
  d = r(d, '(^|>)lenke(?=($|<))', "$1"+"linkin");
  d = r(d, '(^|>)bilde(?=($|<))', "$1"+"kuvan");
  d = r(d, '(^|>)innlegg(?=($|<))', "$1"+"muisteluksen");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"staattuksen");
  d = r(d, '(^|>)statusoppdatering(?=($|<))', "$1"+"staattuksen uuistamisen");
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
