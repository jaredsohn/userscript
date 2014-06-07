// ==UserScript==
// @name           facebook-prg
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into revived Old Prussian
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.5
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-08-02
// Translations:   Pīteris Sasnīns Szatkowski - www.prusaspira.org/polska, via: Grzegorz Kulik - Silesian (http://poslunsku.eu)

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
  d = r(d, '(^|="|>)([0-9]{1,2}) stycznia(?=($|"|<))', "$1"+"$2"+" raggas");
  d = r(d, '(^|="|>)([0-9]{1,2}) lutego(?=($|"|<))', "$1"+"$2"+" wassarinas");
  d = r(d, '(^|="|>)([0-9]{1,2}) marca(?=($|"|<))', "$1"+"$2"+" pūlas");
  d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia(?=($|"|<))', "$1"+"$2"+" sakkes");
  d = r(d, '(^|="|>)([0-9]{1,2}) maja(?=($|"|<))', "$1"+"$2"+" zallawas");
  d = r(d, '(^|="|>)([0-9]{1,2}) czerwca(?=($|"|<))', "$1"+"$2"+" sīmenes");
  d = r(d, '(^|="|>)([0-9]{1,2}) lipca(?=($|"|<))', "$1"+"$2"+" līpas");
  d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia(?=($|"|<))', "$1"+"$2"+" dagges");
  d = r(d, '(^|="|>)([0-9]{1,2}) września(?=($|"|<))', "$1"+"$2"+" sillinas");
  d = r(d, '(^|="|>)([0-9]{1,2}) października(?=($|"|<))', "$1"+"$2"+" spallinas");
  d = r(d, '(^|="|>)([0-9]{1,2}) listopada(?=($|"|<))', "$1"+"$2"+" lapkrūtes");
  d = r(d, '(^|="|>)([0-9]{1,2}) grudnia(?=($|"|<))', "$1"+"$2"+" sallawas");

  d = r(d, '(^|="|>)([0-9]{1,2}) stycznia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" raggas "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) lutego ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" wassarinas "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) marca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" pūlas "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" sakkes "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) maja ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" zallawas "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) czerwca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" sīmenes "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) lipca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" līpas "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" dagges "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) września ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" sillinas "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) października ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" spallinas "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) listopada ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" lapkrūtes "+"$3"+" zūrgi "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) grudnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" sallawas "+"$3"+" zūrgi "+"$4");

  d = r(d, '(^|="|>)([0-9]{1,2}) stycznia o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" raggas zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) lutego o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" wassarinas zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) marca o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" pūlas zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" sakkes zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) maja o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" zallawas zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) czerwca o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" sīmenes zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) lipca o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" līpas zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" dagges zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) września o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" sillinas zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) października o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" spallinas zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) listopada o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" lapkrūtes zūrgi "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) grudnia o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" sallaws zūrgi "+"$3");

  d = r(d, '(^|="|>)([0-9]{1,2}) stycznia ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" raggas "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) lutego ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" wassarinas "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) marca ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" pūlas "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"sakkes "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) maja ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" zallawas "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) czerwca ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" sīmenes "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) lipca ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" līpas "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" dagges "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) września ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" sillinas "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) października ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" spallinas "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) listopada ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" lapkrūtes "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) grudnia ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" sallawas "+"$3");

  d = r(d, '(^|="|>)styczeń(?=($|"|<))', "$1"+"Rags");
  d = r(d, '(^|="|>)luty(?=($|"|<))', "$1"+"Wassarins");
  d = r(d, '(^|="|>)marzec(?=($|"|<))', "$1"+"Pūlis");
  d = r(d, '(^|="|>)kwiecień(?=($|"|<))', "$1"+"Sakkis");
  d = r(d, '(^|="|>)maj(?=($|"|<))', "$1"+"Zallaws");
  d = r(d, '(^|="|>)czerwiec(?=($|"|<))', "$1"+"Sīmenis");
  d = r(d, '(^|="|>)lipiec(?=($|"|<))', "$1"+"Līpa");
  d = r(d, '(^|="|>)sierpień(?=($|"|<))', "$1"+"Daggis");
  d = r(d, '(^|="|>)wrzesień(?=($|"|<))', "$1"+"Sillins");
  d = r(d, '(^|="|>)październik(?=($|"|<))', "$1"+"Spallins");
  d = r(d, '(^|="|>)listopad(?=($|"|<))', "$1"+"Lapkrūtis");
  d = r(d, '(^|="|>)grudzień(?=($|"|<))', "$1"+"Sallaws");

  d = r(d, '(^|="|>)około minuty temu(?=($|"|<))', "$1"+"zūrgi pirzdau minūtin");
  d = r(d, '(^|="|>)kilka sekund temu(?=($|"|<))', "$1"+"pirzdau delli sekūndins");
  d = r(d, '(^|="|>)około godziny temu(?=($|"|<))', "$1"+"zūrgi pirzdau stūndin");
  d = r(d, '(^|="|>)godzinę temu(?=($|"|<))', "$1"+"pirzdau aīnan stūndin");
  d = r(d, '(^|="|>)(1?1) godz\\. temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" stūndin");
  d = r(d, '(^|="|>)(1?[2-4]) godz\\. temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" stūndins");
  d = r(d, '(^|="|>)(1?[5-9]) godz\\. temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" stūndins");
  d = r(d, '(^|="|>)([0-9,]+) godz\\. temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" stūndins");
  d = r(d, '(^|="|>)minutę temu(?=($|"|<))', "$1"+"Pirzdau minūtin");
  d = r(d, '(^|="|>)(1?1) minut\\(y\\) temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" minūtin");
  d = r(d, '(^|="|>)(1?[2-4]) minut\\(y\\) temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" minūtins");
  d = r(d, '(^|="|>)(1?[5-9]) minut\\(y\\) temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" minūtins");
  d = r(d, '(^|="|>)([0-9,]+) minut\\(y\\) temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" minūtins");
  d = r(d, '(^|="|>)sekundę temu(?=($|"|<))', "$1"+"Pirzdau sekūndin");
  d = r(d, '(^|="|>)(1?1) sekund\\(y\\) temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" sekūndin");
  d = r(d, '(^|="|>)(1?[2-4]) sekund\\(y\\) temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" sekūndins");
  d = r(d, '(^|="|>)(1?[5-9]) sekund\\(y\\) temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" sekūndins");
  d = r(d, '(^|="|>)([0-9,]+) sekund\\(y\\) temu(?=($|"|<))', "$1"+"Pirzdau "+"$2"+" sekūndins");

  d = r(d, '(^|="|>)Jutro(?=($|"|<))', "$1"+"Ankstāinan");
  d = r(d, '(^|="|>)Wczoraj(?=($|"|<))', "$1"+"Bītan");
  d = r(d, '(^|="|>)Poniedziałek(?=($|"|<))', "$1"+"Panadīli");
  d = r(d, '(^|="|>)Wtorek(?=($|"|<))', "$1"+"Wisasīdis");
  d = r(d, '(^|="|>)Środa(?=($|"|<))', "$1"+"Pussisawaiti");
  d = r(d, '(^|="|>)Czwartek(?=($|"|<))', "$1"+"Ketwirtiks");
  d = r(d, '(^|="|>)Piątek(?=($|"|<))', "$1"+"Pēntniks");
  d = r(d, '(^|="|>)Sobota(?=($|"|<))', "$1"+"Sabattika");
  d = r(d, '(^|="|>)Niedziela(?=($|"|<))', "$1"+"Nadīli");

  d = r(d, '(^|="|>)w poniedziałek(?=($|"|<))', "$1"+"en panadīlai");
  d = r(d, '(^|="|>)we wtorek(?=($|"|<))', "$1"+"en wisasīdju");
  d = r(d, '(^|="|>)w środę(?=($|"|<))', "$1"+"en pussisawaitei");
  d = r(d, '(^|="|>)w czwartek(?=($|"|<))', "$1"+"en ketwirtiku");
  d = r(d, '(^|="|>)w piątek(?=($|"|<))', "$1"+"en pēntniku");
  d = r(d, '(^|="|>)w sobotę(?=($|"|<))', "$1"+"en sabattikai");
  d = r(d, '(^|="|>)w niedzielę(?=($|"|<))', "$1"+"en nadīlai");

  d = r(d, '(^|="|>)W poniedziałek(?=($|"|<))', "$1"+"en panadīlai");
  d = r(d, '(^|="|>)We wtorek(?=($|"|<))', "$1"+"en wisasīdju");
  d = r(d, '(^|="|>)W środę(?=($|"|<))', "$1"+"en pussisawaitei");
  d = r(d, '(^|="|>)W czwartek(?=($|"|<))', "$1"+"en ketwirtiku");
  d = r(d, '(^|="|>)W piątek(?=($|"|<))', "$1"+"en pēntniku");
  d = r(d, '(^|="|>)W sobotę(?=($|"|<))', "$1"+"en sabattikai");
  d = r(d, '(^|="|>)W niedzielę(?=($|"|<))', "$1"+"en nadīlai");

  d = r(d, '(^|="|>)w zeszły poniedziałek(?=($|"|<))', "$1"+"en pirzdaumai panadīlin");
  d = r(d, '(^|="|>)w zeszły wtorek(?=($|"|<))', "$1"+"en pirzdaumasmu wisasīdin");
  d = r(d, '(^|="|>)w zeszłą środę(?=($|"|<))', "$1"+"en pirzdaumai pussisawaitin");
  d = r(d, '(^|="|>)w zeszły czwartek(?=($|"|<))', "$1"+"en pirzdaumasmu ketwirtikan");
  d = r(d, '(^|="|>)w zeszły piątek(?=($|"|<))', "$1"+"en pirzdaumasmu pēntnikan");
  d = r(d, '(^|="|>)w zeszłą sobotę(?=($|"|<))', "$1"+"en pirzdaumai sabattikan");
  d = r(d, '(^|="|>)w zeszłą niedzielę(?=($|"|<))', "$1"+"en pirzdaumai nadīlin");

  d = r(d, '(^|="|>)W zeszły poniedziałek(?=($|"|<))', "$1"+"en pirzdaumai panadīlin");
  d = r(d, '(^|="|>)W zeszły wtorek(?=($|"|<))', "$1"+"en pirzdaumasmu wisasīdin");
  d = r(d, '(^|="|>)W zeszłą środę(?=($|"|<))', "$1"+"en pirzdaumai pussisawaitin");
  d = r(d, '(^|="|>)W zeszły czwartek(?=($|"|<))', "$1"+"en pirzdaumasmu ketwirtikan");
  d = r(d, '(^|="|>)W zeszły piątek(?=($|"|<))', "$1"+"en pirzdaumasmu pēntnikan");
  d = r(d, '(^|="|>)W zeszłą sobotę(?=($|"|<))', "$1"+"en pirzdaumai sabattikan");
  d = r(d, '(^|="|>)W zeszłą niedzielę(?=($|"|<))', "$1"+"en pirzdaumai nadīlin");

  d = r(d, '(^|="|>)Jutro o ([^<" ]+)(?=($|"|<))', "$1"+"Ankstāinan zūrgi"+"$2");
  d = r(d, '(^|="|>)Wczoraj o ([^<" ]+)(?=($|"|<))', "$1"+"Bītan zūrgi "+"$2");
  d = r(d, '(^|="|>)Poniedziałek\, ([0-9:apm]+)(?=($|"|<))', "$1"+"En panadīlai zūrgi "+"$2");
  d = r(d, '(^|="|>)Wtorek\, ([0-9:apm]+)(?=($|"|<))', "$1"+"En wisasīdju zūrgi "+"$2");
  d = r(d, '(^|="|>)Środa\, ([0-9:apm]+)(?=($|"|<))', "$1"+"En pussisawaitei zūrgi "+"$2");
  d = r(d, '(^|="|>)Czwartek\, ([0-9:apm]+)(?=($|"|<))', "$1"+"En ketwirtiku zūrgi "+"$2");
  d = r(d, '(^|="|>)Piątek\, ([0-9:apm]+)(?=($|"|<))', "$1"+"En pēntniku zūrgi "+"$2");
  d = r(d, '(^|="|>)Sobota\, ([0-9:apm]+)(?=($|"|<))', "$1"+"En sabattikai zūrgi "+"$2");
  d = r(d, '(^|="|>)Niedziela\, ([0-9:apm]+)(?=($|"|<))', "$1"+"En panadīlai zūrgi "+"$2");

  d = r(d, '(^|="|>)ULUBIONE(?=($|"|<))', "$1"+"MILĪTAŠAI");
  d = r(d, '(^|="|>)GRUPY(?=($|"|<))', "$1"+"GRUPPIS");
  d = r(d, '(^|="|>)STRONY(?=($|"|<))', "$1"+"PAUSĀI");
  d = r(d, '(^|="|>)WIĘCEJ(?=($|"|<))', "$1"+"TŪLS");
  d = r(d, '(^|="|>)STRONY I REKLAMY(?=($|"|<))', "$1"+"PAUSĀI BE REKLĀMIS");
  d = r(d, '(^|="|>)ZNAJOMI(?=($|"|<))', "$1"+"ZINĀTENEI");
  d = r(d, '(^|="|>)APLIKACJE(?=($|"|<))', "$1"+"APLIKACIŌNIS");
  d = r(d, '(^|="|>)NAJNOWSZY WPIS(?=($|"|<))', "$1"+"UKANAWWAISIS ENPEISĀSENIS");

  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+", "+"$3"+" be dīgi "+"$4"+" padīnga stan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" padīnga stan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+" be "+"$3"+" padīnga stan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) go lubią\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+" be "+"$3"+" tāns padīnga.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) ją lubią\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+" be "+"$3"+" tenā padīnga.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) ich lubią\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+" be "+"$3"+" tenēi padīnga.");
  d = r(d, '(^|>)1 inny znajomy(?=($|<))', "$1"+"1 kits zinātenis");
  d = r(d, '(^|>)(1?1) innych znajomych(?=($|<))', "$1"+"$2"+" kitāi zinātenei");
  d = r(d, '(^|>)(1?[2-4]) innych znajomych(?=($|<))', "$1"+"$2"+" kitāi zinātenei");
  d = r(d, '(^|>)(1?[5-9]) innych znajomych(?=($|<))', "$1"+"$2"+" kitāi zinātenei");
  d = r(d, '(^|>)([0-9,]+) innych znajomych(?=($|<))', "$1"+"$2"+" kitāi zinātenei");
  d = r(d, '(^|>)1 inny(?=($|<))', "$1"+"1 kittasis");
  d = r(d, '(^|>)(1?1) innych(?=($|<))', "$1"+"$2"+" kittasis");
  d = r(d, '(^|>)(1?[2-4]) innych(?=($|<))', "$1"+"$2"+" kitāi");
  d = r(d, '(^|>)(1?[5-9]) innych(?=($|<))', "$1"+"$2"+" kitāi");
  d = r(d, '(^|>)([0-9,]+) innych(?=($|<))', "$1"+"$2"+" kitāi");
  d = r(d, '(^|>)(1?1) innych członków(?=($|<))', "$1"+"$2"+" kitāi streīpstai");
  d = r(d, '(^|>)(1?[2-4]) innych członków(?=($|<))', "$1"+"$2"+" kitāi streīpstai");
  d = r(d, '(^|>)(1?[5-9]) innych członków(?=($|<))', "$1"+"$2"+" kitāi streīpstai");
  d = r(d, '(^|>)([0-9,]+) innych członków(?=($|<))', "$1"+"$2"+" kitāi streīpstai");
  d = r(d, '(^|>)1 inna osoba(?=($|<))', "$1"+"1 kitā persōni");
  d = r(d, '(^|>)inna osoba \\((1?1)\\)(?=($|<))', "$1"+"$2"+" kitā persōni");
  d = r(d, '(^|>)inne osoby \\((1?[2-4])\\)(?=($|<))', "$1"+"$2"+" kittas persōnis");
  d = r(d, '(^|>)inne osoby \\((1?[5-9])\\)(?=($|<))', "$1"+"$2"+" kittas persōnis");
  d = r(d, '(^|>)inne osoby \\(([0-9,]+)\\)(?=($|<))', "$1"+"$2"+" kittas persōnis");
  d = r(d, '(^|>)1 (?=($|<))', "$1"+"1");
  d = r(d, '(^|>)(1?1) innych osób(?=($|<))', "$1"+"$2"+" kitā persōni");
  d = r(d, '(^|>)(1?[2-4]) innych osób(?=($|<))', "$1"+"$2"+" kittas persōnis");
  d = r(d, '(^|>)(1?[5-9]) innych osób(?=($|<))', "$1"+"$2"+" kittas persōnis");
  d = r(d, '(^|>)([0-9,]+) innych osób(?=($|<))', "$1"+"$2"+" kittas persōnis");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcie\.(?=($|"|<))', "$1"+"$2"+" preidāi nawwan auīmsenin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) (1?1) nowe zdjęcie\.(?=($|"|<))', "$1"+"$2"+" preidāi "+"$3"+" nawwan auīmsenin. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\((1?[2-4])\\)\.(?=($|"|<))', "$1"+"$2"+" preidāi "+"$3"+" nawwans auīmsenins. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\((1?[5-9])\\)\.(?=($|"|<))', "$1"+"$2"+" preidāi "+"$3"+" nawwans auīmsenins. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\(([0-9,]+)\\)\.(?=($|"|<))', "$1"+"$2"+" preidāi "+"$3"+" nawwans auīmsenins. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował swoje zdjęcie w tle\.(?=($|"|<))', "$1"+"$2"+" aktualizijja swajjan rīkisnasgruntas auīmsenin. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizowała swoje zdjęcie w tle\.(?=($|"|<))', "$1"+"$2"+" aktualizijja swajjan rīkisnasgruntas auīmsenin. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował\\(a\\) swoje zdjęcie w tle\.(?=($|"|<))', "$1"+"$2"+" aktualizijja swajjan rīkisnasgruntas auīmsenin. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" teinū ast zinātenei.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi z (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" ast teinū zinātenei sen "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi\.(?=($|"|<))', "$1"+"$2"+", "+"$3"+" be "+"$4"+" ast teinū zinātenei.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) od\\: (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" ezze: "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Šismu/šissei"+"$2"+" padīnga "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kumentijja "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kumentijja "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kumentijja "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+" be "+"$3"+" padīnga "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+" be "+"$3"+" padīnga stan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" preiēiminina"+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" preiēiminina "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępniły (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" preiēiminina "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"auīmsenin"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"auīmsenin"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"auīmsenin"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" preiēiminina "+"$4"+"auīmsenin"+"</a>"+" stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"enpeisāsenin"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"enpeisāsenin"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"enpeisāsenin"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" preiēiminina "+"$4"+"enpeisāsenin"+"</a>"+" stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"stātu"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"stātu"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"stātu"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" preiēiminina "+"$4"+"stātu"+"</a>"+" stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"alban"+"</a>"+" stesse tērpautajan "+"$3"+": "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"alban"+"</a>"+" stesse tērpautajan "+"$3"+": "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"alban"+"</a>"+" stesse tērpautajan "+"$3"+": "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"be"+"$2"+" preiēiminina "+"alban"+"</a>"+" stesse tērpautajan "+"$3"+": "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"alban"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"alban"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+"alban"+"</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" preiēiminina "+"$4"+"alban"+"</a>"+" stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" preiēiminina "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) zmienili swoje zdjęcia profilowe\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" kitawīdinusis swāise rekkenas auīmsenins"+".");

  d = r(d, '(^|="|>) przez (?=($|"|<))', "$1"+" pra ");
  d = r(d, '(^|="|>) przez\\: (?=($|"|<))', "$1"+" pra: ");
  d = r(d, '(^|="|>)telefon komórkowy(?=($|"|<))', "$1"+"kūiringin telapōnan");
  d = r(d, '(^|="|>)Szukaj znajomych(?=($|"|<))', "$1"+"Laukīs zinātenins");
  d = r(d, '(^|="|>)Wiadomość(?=($|"|<))', "$1"+"Waīstis");
  d = r(d, '(^|="|>) dzisiaj obchodzi urodziny(?=($|"|<))', "$1"+" turri swajjan gīmsnas dēinan");
  d = r(d, '(^|="|>)Zobacz wszystkie komentarze \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Waidinnais wissans "+"$2"+" kumentārans.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi to\\.(?=($|"|<))', "$1"+"Šismu/šissei "+"$2"+" padīnga stan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią go\\.(?=($|"|<))', "$1"+"Šēimans "+"$2"+" be "+"$3"+" tāns padīnga.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi ich\/je\\.(?=($|"|<))', "$1"+"Šismu/šissei "+"$2"+" tenēi padīnga.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi ją\\.(?=($|"|<))', "$1"+"Šismu/šissei "+"$2"+" tenā padīnga.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" Zmūnin kellisku, kawīdamans stan padīnga.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" Zmūnin kellisku, kawīdamans stan padīnga.");
  d = r(d, '(^|="|>) \\· Osób\, które to lubią\\: ([0-9,]+)(?=($|"|<))', "$1"+" · "+"$2"+" stēisan zmūnin, kawīdamans stan padīnga.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: ([0-9,]+).([0-9,]+)(?=($|"|<))', "$1"+"$2"+"."+"$3"+" Zmūnin kellisku, kawīdamans stan padīnga.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: ([0-9,]+).([0-9,]+).([0-9,]+)(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" Zmūnin kellisku, kawīdamans stan padīnga.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: ([0-9,]+).([0-9,]+)\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+" Zmūnin kellisku, kawīdamans stan padīnga.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: ([0-9,]+).([0-9,]+).([0-9,]+)\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" Zmūnin kellisku, kawīdamans stan padīnga.");
  d = r(d, '(^|="|>)Liczba osób\, które ich lubią\\: ([0-9,]+).([0-9,]+)\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+" Zmūnin kellisku, kawīdamans tenēi padīnga.");
  d = r(d, '(^|="|>)Liczba osób\, które ich lubią\\: ([0-9,]+).([0-9,]+).([0-9,]+)\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" Zmūnin kellisku, kawīdamans tenēi padīnga.");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób go lubi\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans tāns padīnga.");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+).([0-9,]+) osób go lubi\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" zmūnimans tāns padīnga.");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby go lubią\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans tāns padīnga.");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+).([0-9,]+) osoby go lubią\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" zmūnimans tāns padīnga.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma nowych znajomych\\: (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" turri nawwans zinātenins: "+"$3"+" be "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Šismu/šissei "+"$2"+" padīnga: "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Šismu/šissei "+"$2"+" padīnga tērpautajs "+"$3"+" be "+"$4"+".");
  d = r(d, '(^|>)inne strony \\((1?1)\\)(?=($|<))', "$1"+"$2"+" kittan pāusan");
  d = r(d, '(^|>)inne strony \\((1?[2-4])\\)(?=($|<))', "$1"+"$2"+" kittans pāusans");
  d = r(d, '(^|>)inne strony \\((1?[5-9])\\)(?=($|<))', "$1"+"$2"+" kittans pāusans");
  d = r(d, '(^|="|>)O czym teraz myślisz\\?(?=($|"|<))', "$1"+"Ezze ka Tū teinū mīri?");
  d = r(d, '(^|="|>)Zdjęcie / film(?=($|"|<))', "$1"+"Auīmsenis / films");
  d = r(d, '(^|="|>)Osoby\, które to lubią(?=($|"|<))', "$1"+"Zmūnei, kawīdamans stan padīnga.");
  d = r(d, '(^|="|>)Udostępniono ([0-9,]+) razy(?=($|"|<))', "$1"+"Prēieimintan "+"$2"+" rēizai");
  d = r(d, '(^|="|>)Dodaj komentarz\.\.\.(?=($|"|<))', "$1"+"Preidāis kumentāran...");
  d = r(d, '(^|="|>)([0-9,]+) wspólnych znajomych(?=($|"|<))', "$1"+"$2"+" draugāi zinātenei.");
  d = r(d, '(^|="|>)Zdjęcia na tablicy \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Auīmsenei na zēidan "+"("+"$2"+")");
  d = r(d, '(^|="|>)Zdjęcia profilowe \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Rekkenas auīmsenei "+"("+"$2"+")");
  d = r(d, '(^|="|>)Zdjęcia w tle \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Rīkisnasgruntas auīmsenei "+"("+"$2"+")");
  d = r(d, '(^|="|>)Ty to lubisz\.(?=($|"|<))', "$1"+"Tebbei stan padīnga.");
  d = r(d, '(^|="|>)1 wspólny znajomy(?=($|"|<))', "$1"+"1 drāugs zinātenis");
  d = r(d, '(^|="|>)Bliscy znajomi(?=($|"|<))', "$1"+"Taūwai zinātenei");
  d = r(d, '(^|="|>)Uczęszczał do\\: (?=($|"|<))', "$1"+"Mukinnuns si en: ");
  d = r(d, '(^|="|>)Uczęszczała do\\: (?=($|"|<))', "$1"+"Mukinnusi si en: ");
  d = r(d, '(^|="|>)Uczęszczał\\(a\\) do\\: (?=($|"|<))', "$1"+"Mukinnuns(si) si en: ");
  d = r(d, '(^|="|>)Pracował\\(a\\) w (?=($|"|<))', "$1"+"Dīlawuns(si) en ");
  d = r(d, '(^|="|>)Pracowała w (?=($|"|<))', "$1"+"Dīlawusi en ");
  d = r(d, '(^|="|>)Pracował w (?=($|"|<))', "$1"+"Dīlawuns en ");
  d = r(d, '(^|="|>)Utwórz reklamę(?=($|"|<))', "$1"+"Teīkeis reklāmin");
  d = r(d, '(^|="|>)Udostępniono 1 raz(?=($|"|<))', "$1"+"Preiēiminintan 1 rēizus.");
  d = r(d, '(^|="|>)Utwórz stronę(?=($|"|<))', "$1"+"Teīkeis pāusan");
  d = r(d, '(^|="|>)Zbierz publiczność(?=($|"|<))', "$1"+"Senrīnkais perōnin");
  d = r(d, '(^|="|>)Pokaż wszystko(?=($|"|<))', "$1"+"Pawaidinnais wissan");
  d = r(d, '(^|="|>)Panel administratora(?=($|"|<))', "$1"+"Perwaldītajas pāusan");
  d = r(d, '(^|="|>)Powiadomienia(?=($|"|<))', "$1"+"Waīstis");
  d = r(d, '(^|="|>)Filozofia(?=($|"|<))', "$1"+"Filozōfija");
  d = r(d, '(^|="|>)Pokaż post(?=($|"|<))', "$1"+"Pawaidinnais enpeisāsenin");
  d = r(d, '(^|="|>)Nie lubię(?=($|"|<))', "$1"+"Ni padīnga");
  d = r(d, '(^|="|>)Praca(?=($|"|<))', "$1"+"Dīlin");
  d = r(d, '(^|="|>)Reklama(?=($|"|<))', "$1"+"Reklāmi");
  d = r(d, '(^|="|>)Pytanie(?=($|"|<))', "$1"+"Prasīsenis");
  d = r(d, '(^|="|>)Twórcy aplikacji(?=($|"|<))', "$1"+"Aplikaciōnis teikātajai");
  d = r(d, '(^|="|>)Rodzina(?=($|"|<))', "$1"+"Seimī");
  d = r(d, '(^|="|>)Lubię to!(?=($|"|<))', "$1"+"Mennei padīnga!");
  d = r(d, '(^|="|>)Lubię tę stronę!(?=($|"|<))', "$1"+"Mennei padīnga šin pāusan!");
  d = r(d, '(^|="|>)Znajdź więcej stron(?=($|"|<))', "$1"+"Aupallais tūls pāusans");
  d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1"+"Waīstis");
  d = r(d, '(^|="|>)Polski(?=($|"|<))', "$1"+"Prūsiskan");
  d = r(d, '(^|="|>)Wydarzenie z życia(?=($|"|<))', "$1"+"Gīwis audāsenis");
  d = r(d, '(^|="|>)Aktualności(?=($|"|<))', "$1"+"Nawwiniskwas");
  d = r(d, '(^|="|>)Profil(?=($|"|<))', "$1"+"Rekkens");
  d = r(d, '(^|="|>)Dodaj komentarz(?=($|"|<))', "$1"+"Preidāis kumentāran");
  d = r(d, '(^|="|>)Oś czasu(?=($|"|<))', "$1"+"Kērdas līnti");
  d = r(d, '(^|="|>)Prywatność(?=($|"|<))', "$1"+"Priwātisku");
  d = r(d, '(^|="|>)Kliknięcia Lubię to!(?=($|"|<))', "$1"+"Mennei padīnga! sprakstinsenei");
  d = r(d, '(^|="|>)Mapa(?=($|"|<))', "$1"+"Tāutaskarti");
  d = r(d, '(^|="|>)Anuluj(?=($|"|<))', "$1"+"Naikinnais");
  d = r(d, '(^|="|>)Wydarzenia(?=($|"|<))', "$1"+"Audāsenei");
  d = r(d, '(^|="|>)Wyloguj się(?=($|"|<))', "$1"+"Izjaīs");
  d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1"+"Auīmsenei");
  d = r(d, '(^|="|>)Regulamin(?=($|"|<))', "$1"+"Regulīsnas");
  d = r(d, '(^|="|>)Znajomi(?=($|"|<))', "$1"+"Zinātenei");
  d = r(d, '(^|="|>)O Facebooku(?=($|"|<))', "$1"+"Ezze Facebookan");
  d = r(d, '(^|="|>)Więcej(?=($|"|<))', "$1"+"Tūls");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Stātus");
  d = r(d, '(^|="|>)przez\\:(?=($|"|<))', "$1"+"pra:");
  d = r(d, '(^|="|>)Zdjęcie(?=($|"|<))', "$1"+"Auīmsenis");
  d = r(d, '(^|="|>)Miejsca(?=($|"|<))', "$1"+"Deiktāi");
  d = r(d, '(^|="|>)Udostępnij(?=($|"|<))', "$1"+"Preiēimininais");
  d = r(d, '(^|="|>)Albumy(?=($|"|<))', "$1"+"Albai");
  d = r(d, '(^|="|>)Zobacz wszystko(?=($|"|<))', "$1"+"Waidinnais wissan");
  d = r(d, '(^|="|>)Zobacz znajomość(?=($|"|<))', "$1"+"Waidinnais zināteniskwan");
  d = r(d, '(^|="|>)Zamknij(?=($|"|<))', "$1"+"Auwerreis");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pagalba");
  d = r(d, '(^|="|>)Miejsce(?=($|"|<))', "$1"+"Deīktan");
  d = r(d, '(^|="|>)Szukaj(?=($|"|<))', "$1"+"Laukīs");
  d = r(d, '(^|="|>)Aplikacje(?=($|"|<))', "$1"+"Aplikaciōnis");
  d = r(d, '(^|="|>)Strona główna(?=($|"|<))', "$1"+"Galwas pāusan");
  d = r(d, '(^|="|>)Teraz(?=($|"|<))', "$1"+"Teinū");
  d = r(d, '(^|="|>)Wyślij(?=($|"|<))', "$1"+"Tenginnais");
  d = r(d, '(^|="|>)Do:(?=($|"|<))', "$1"+"Prēi:");
  d = r(d, '(^|="|>)Wyszukaj osoby, miejsca i inne(?=($|"|<))', "$1"+"Aupallais zmūnins, deīktans be kittanins");
  d = r(d, '(^|="|>)Przejdź do trybu offline(?=($|"|<))', "$1"+"Wīrstais offline");
  d = r(d, '(^|="|>)Pokaż wszystkie(?=($|"|<))', "$1"+"Pawaidinnais wissan");
  d = r(d, '(^|="|>)Dodaj do tej listy(?=($|"|<))', "$1"+"Preidāis prei listin");
  d = r(d, '(^|="|>)Ukryj(?=($|"|<))', "$1"+"Kliptinnais");
  d = r(d, '(^|="|>)Ostatnie posty innych użytkowników na stronie(?=($|"|<))', "$1"+"Panzdaumai waiţāsenei stēisan kittan tērpautajan nō šin pāusan");
  d = r(d, '(^|="|>)Napisz komentarz...(?=($|"|<))', "$1"+"Peisāis kumentāran...");
  d = r(d, '(^|="|>)Odpowiedz(?=($|"|<))', "$1"+"Etrāis");
  d = r(d, '(^|="|>)Pliki cookie(?=($|"|<))', "$1"+"Cookie zūrbrukei");
  d = r(d, '(^|="|>)Udostępnione dla:(?=($|"|<))', "$1"+"Preiēiminintan per:");
  d = r(d, '(^|="|>)Tryb szybkiej odpowiedzi: naciśnij Enter, aby wysłać(?=($|"|<))', "$1"+"Dīwas etrāsenes wīds. Sprakstinnais Enter, kāi etrālai");
  d = r(d, '(^|="|>)Wykonaj zdjęcie lub nagraj film(?=($|"|<))', "$1"+"Segēis auīmsenin adder filman");
  d = r(d, '(^|="|>)Dołącz plik(?=($|"|<))', "$1"+"Preidāis zūrbrukin");
  d = r(d, '(^|="|>)Osoby\\, które możesz znać(?=($|"|<))', "$1"+"Zmūnei, kawīdans Tū mazzi zinātun");
  d = r(d, '(^|="|>)Zdjęcia znajomych(?=($|"|<))', "$1"+"Zinātenin auīmsenei");
  d = r(d, '(^|="|>)Wyszukaj w konwersacji(?=($|"|<))', "$1"+"Aupallais en waiţāseņu");
  d = r(d, '(^|="|>)Działania(?=($|"|<))', "$1"+"Dilāsnas");
  d = r(d, '(^|="|>)Oznacz jako nieprzeczytane(?=($|"|<))', "$1"+"Zentlis, kāigi niskaitātan");
  d = r(d, '(^|="|>)Prześlij...(?=($|"|<))', "$1"+"Tenginnais...");
  d = r(d, '(^|="|>)Otwórz w czacie(?=($|"|<))', "$1"+"Etwerreis en čattu");
  d = r(d, '(^|="|>)Usuń wiadomości...(?=($|"|<))', "$1"+"Āupasinais waīstins...");
  d = r(d, '(^|="|>)Zgłoś jako spam...(?=($|"|<))', "$1"+"Pawakēis spamman...");
  d = r(d, '(^|="|>)Zgłoś konwersację...(?=($|"|<))', "$1"+"Pawakēis waiţāsenin...");
  d = r(d, '(^|="|>)Przenieś do folderu „Inne”(?=($|"|<))', "$1"+"Praskajjinais en fōlderin ''Kitāi''");
  d = r(d, '(^|="|>)Korzystaj z Facebooka w innym języku.(?=($|"|<))', "$1"+"Tērpaus Facebookan en kitsei billin.");
  d = r(d, '(^|="|>)Oznaczeni — (?=($|"|<))', "$1"+"Pazentlitāi — ");
  d = r(d, '(^|="|>)Ładowanie...(?=($|"|<))', "$1"+"Krausnā...");
  d = r(d, '(^|="|>)Polish(?=($|"|<))', "$1"+"Prussian");
  d = r(d, '(^|="|>)Wydarzenie, ważne wydarzenie \\+(?=($|"|<))', "$1"+"Audāsenis, swarewīngis audāsenis");
  d = r(d, '(^|="|>)SORTUJ: OD NAJNOWSZYCH(?=($|"|<))', "$1"+"RIKAŪJAIS: EZZE UKANAWWAISINS");
  d = r(d, '(^|="|>)Najnowsze(?=($|"|<))', "$1"+"Ukanawwaišai");
  d = r(d, '(^|="|>)Najciekawsze zdarzenia(?=($|"|<))', "$1"+"Ukainteressantei audāsenei");
  d = r(d, '(^|="|>)lubią to.(?=($|"|<))', "$1"+"padīnga stan.");
  d = r(d, '(^|="|>)Powrót do albumu(?=($|"|<))', "$1"+"Etwartinnais si prei alban");
  d = r(d, '(^|="|>)Dodaj znajomego(?=($|"|<))', "$1"+"Preidāis zinātenin");
  d = r(d, '(^|="|>)Zobacz tłumaczenie(?=($|"|<))', "$1"+"Widāis tulkausenin");
  d = r(d, '(^|="|>)Autor\\: (?=($|"|<))', "$1"+"Autōrs: ");
  d = r(d, '(^|="|>)Aplikacje i gry(?=($|"|<))', "$1"+"Aplikaciōnis be spīlis");
  d = r(d, '(^|="|>)Moje albumy(?=($|"|<))', "$1"+"Majāi albai");
  d = r(d, '(^|="|>)Dodaj zdjęcia(?=($|"|<))', "$1"+"Preidāis auīmsenins");
  d = r(d, '(^|="|>)Dodaj film(?=($|"|<))', "$1"+"Preidāis filman");
  d = r(d, '(^|="|>)Korzystaj z Facebooka jako:(?=($|"|<))', "$1"+"Tērpaus Facebookan kāigi:");
  d = r(d, '(^|="|>)Reklamuj się(?=($|"|<))', "$1"+"Reklāmaus si");
  d = r(d, '(^|="|>)Ustawienia konta(?=($|"|<))', "$1"+"Rekkenas ensadīnsnas");
  d = r(d, '(^|="|>)Ustawienia prywatności(?=($|"|<))', "$1"+"Priwātiskwas ensadīnsnas");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pagalba");
  d = r(d, '(^|="|>)Zarządzaj listą(?=($|"|<))', "$1"+"Rikaūjais listin");
  d = r(d, '(^|="|>)Zmień nazwę listy(?=($|"|<))', "$1"+"Kitawīdinais listis pabilīsnan");
  d = r(d, '(^|="|>)Edytuj listę(?=($|"|<))', "$1"+"Redigīs listin");
  d = r(d, '(^|="|>)Wybierz typy informacji...(?=($|"|<))', "$1"+"Etrīnkais waīstin tīpan...");
  d = r(d, '(^|="|>)Ustawienia powiadomień...(?=($|"|<))', "$1"+"Waīstin ensadīnsnas...");
  d = r(d, '(^|="|>)Usuń listę(?=($|"|<))', "$1"+"Āupasinais listin");
  d = r(d, '(^|="|>)Pokaż wszystkich(?=($|"|<))', "$1"+"Pawaidinnais wissans");
  d = r(d, '(^|="|>)Proponowane osoby(?=($|"|<))', "$1"+"Nadātas persōnis");
  d = r(d, '(^|="|>)Na tej liście (?=($|"|<))', "$1"+"Nō šan listin ");
  d = r(d, '(^|="|>)Pokaż więcej sugestii(?=($|"|<))', "$1"+"Pawaidinnais tūls nadāsnans");
  d = r(d, '(^|="|>)Dodaj(?=($|"|<))', "$1"+"Preidāis");
  d = r(d, '(^|="|>)Obecnie jesteś offline. Aby czatować ze znajomym, (?=($|"|<))', "$1"+"Tēnti assei offline. Kāi waiţātwei sen zinātenin ");
  d = r(d, '(^|="|>)przejdź do trybu online(?=($|"|<))', "$1"+"wīrstais online");
  d = r(d, '(^|="|>)Moje zdjęcia(?=($|"|<))', "$1"+"Māise auīmsenei");
  d = r(d, '(^|="|>)Dalej(?=($|"|<))', "$1"+"Tālis");
  d = r(d, '(^|="|>)Poprzednia(?=($|"|<))', "$1"+"Atpenti");
  d = r(d, '(^|="|>)Zdjęcia na tablicy(?=($|"|<))', "$1"+"Auīmsenei na zēidan");
  d = r(d, '(^|="|>)Oznacz zdjęcie(?=($|"|<))', "$1"+"Pazentlis auīmsenin");
  d = r(d, '(^|="|>)Album(?=($|"|<))', "$1"+"Album");
  d = r(d, '(^|="|>)Tablica(?=($|"|<))', "$1"+"Zēids");
  d = r(d, '(^|="|>)Informacje(?=($|"|<))', "$1"+"Infōrmaciōnis");
  d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1"+"Auīmsenei");
  d = r(d, '(^|="|>)Żonaty(?=($|"|<))', "$1"+"Patinnuns");
  d = r(d, '(^|="|>)Czat \\(Offline\\)(?=($|"|<))', "$1"+"Čats (offline)");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"autengīnsenis");
  d = r(d, '(^|>)zdjęcie(?=($|<))', "$1"+"auīmsenis");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"stātus");
  d = r(d, '(^|="|>)Sponsorowane(?=($|"|<))', "$1"+"Ebplatitāi");
  d = r(d, '(^|="|>)Zaproszenia do grona znajomych(?=($|"|<))', "$1"+"Perwūkausnas prei zinātenin gruppin");
  d = r(d, '(^|="|>)Brak nowych zaproszeń\\.(?=($|"|<))', "$1"+"Ni ast nawwas perwūkausnas.");
  d = r(d, '(^|="|>)Zobacz wszystkie zaproszenia od znajomych(?=($|"|<))', "$1"+"Widāis wissans perwūkausnas ezze zinātenimans");
  d = r(d, '(^|="|>)Nie masz już aktywnych zaproszeń\\.(?=($|"|<))', "$1"+"Tū nijāu turri perwūkausnans.");
  d = r(d, '(^|="|>)Znajdź więcej znajomych(?=($|"|<))', "$1"+"Aupallais tūls zinātenins");
  d = r(d, '(^|="|>)Wyślij nową wiadomość(?=($|"|<))', "$1"+"Tenginnais nawwan waīstin");
  d = r(d, '(^|="|>)Zobacz wszystkie wiadomości(?=($|"|<))', "$1"+"Widāis wissans waīstins");
  d = r(d, '(^|="|>)Zobacz wszystkie powiadomienia(?=($|"|<))', "$1"+"Widāis wissans waīstins");
  d = r(d, '(^|="|>)Nowa wiadomość(?=($|"|<))', "$1"+"Nawā waīstis");
  d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1"+"Waīstis");
  d = r(d, '(^|="|>)Utwórz grupę\.\.\.(?=($|"|<))', "$1"+"Teīkeis gruppin...");
  d = r(d, '(^|="|>)Wyszukaj\\:(?=($|"|<))', "$1"+"Aupallais:");
  d = r(d, '(^|="|>)Nieprzeczytane wiadomości(?=($|"|<))', "$1"+"Niskaitātas waīstis");
  d = r(d, '(^|="|>)Zarchiwizowane wiadomości(?=($|"|<))', "$1"+"Arkīwitas waīstis");
  d = r(d, '(^|="|>)Tylko za pośrednictwem poczty e-mail(?=($|"|<))', "$1"+"Tēr pra e-mail");
  d = r(d, '(^|="|>)Wysłane wiadomości(?=($|"|<))', "$1"+"Tengīntas waīstis");
  d = r(d, '(^|="|>)Brak wiadomości(?=($|"|<))', "$1"+"Ni ast waīstis");
  d = r(d, '(^|="|>)Usuń(?=($|"|<))', "$1"+"Āupasinais");
  d = r(d, '(^|="|>) także lubi to\.(?=($|"|<))', "$1"+" dīgi padīnga stan.");
  d = r(d, '(^|="|>)Oznacz jako nieprzeczytane(?=($|"|<))', "$1"+"Pazentlis kāigi niskaitātan");
  d = r(d, '(^|="|>)Oznacz jako przeczytane(?=($|"|<))', "$1"+"Pazentlis kāigi skaitātan");
  d = r(d, '(^|="|>)Zarchiwizuj(?=($|"|<))', "$1"+"Arkiwīs");
  d = r(d, '(^|="|>)Szukaj wiadomości(?=($|"|<))', "$1"+"Aupallais waīstins");
  d = r(d, '(^|="|>)Wyślij wiadomość(?=($|"|<))', "$1"+"Tenginnais waīstin");
  d = r(d, '(^|="|>)Inne(?=($|"|<))', "$1"+"Kitāi");
  d = r(d, '(^|="|>)Nieprzeczytane(?=($|"|<))', "$1"+"Niskaitatāi");
  d = r(d, '(^|="|>)Zarchiwizowane(?=($|"|<))', "$1"+"En arkīwu");
  d = r(d, '(^|="|>)Zobacz\\:(?=($|"|<))', "$1"+"Waidinnais:");
  d = r(d, '(^|="|>)Załaduj starsze wątki(?=($|"|<))', "$1"+"Enkraūneis wūraisins tēmans");
  d = r(d, '(^|="|>)Polecane strony(?=($|"|<))', "$1"+"Nadatāi pausāi");
  d = r(d, '(^|="|>)Strony i reklamy(?=($|"|<))', "$1"+"Pausāi be reklāmis");
  d = r(d, '(^|="|>)Proponowane grupy(?=($|"|<))', "$1"+"Nadātas gruppis");
  d = r(d, '(^|="|>)Polub tę stronę(?=($|"|<))', "$1"+"Zentlīs, kāi Ti padīnga");
  d = r(d, '(^|="|>)Utwórz wydarzenie(?=($|"|<))', "$1"+"Teīkeis audāsenin");
  d = r(d, '(^|="|>)Pokaż wcześniejsze komentarze(?=($|"|<))', "$1"+"Pawaidinnais ānkstaisins kumentārans");
  d = r(d, '(^|="|>)Lubisz to\\!(?=($|"|<))', "$1"+"Tebbei padīnga!");
  d = r(d, '(^|="|>)Pokaż udostępnioną zawartość(?=($|"|<))', "$1"+"Pawaidinnais preiēiminintan");
  d = r(d, '(^|="|>)Dołącz do grupy(?=($|"|<))', "$1"+"Preidāis si prei gruppin");
  d = r(d, '(^|="|>)Kliknięcia \\„Lubię to\\”(?=($|"|<))', "$1"+"Sprakstinsenei Mennei padīnga!");
  d = r(d, '(^|="|>)Narodziny(?=($|"|<))', "$1"+"Gīmsenis");
  d = r(d, '(^|="|>)LISTY(?=($|"|<))', "$1"+"LISTIS");
  d = r(d, '(^|="|>)Zmień zdjęcie w tle(?=($|"|<))', "$1"+"Kitawīdinais rīkisnasgruntas auīmsenin");
  d = r(d, '(^|="|>)Edytuj zdjęcie profilowe(?=($|"|<))', "$1"+"Redigīs rekkenas auīmsenin");
  d = r(d, '(^|="|>)Subskrypcje(?=($|"|<))', "$1"+"Subskribīsnas");
  d = r(d, '(^|="|>)Zaktualizuj informacje(?=($|"|<))', "$1"+"Aktualizīs infōrmaciōnins");
  d = r(d, '(^|="|>)Dziennik aktywności(?=($|"|<))', "$1"+"Aktīwibis deinālaiskan");
  d = r(d, '(^|="|>)Wyświetl jako\.\.\.(?=($|"|<))', "$1"+"Pawaidinnais kāigi...");
  d = r(d, '(^|="|>)Dodaj wizytówkę do swojej strony(?=($|"|<))', "$1"+"Preidāis wizītkartin prei swajjan pāusan");
  d = r(d, '(^|="|>)Opublikuj(?=($|"|<))', "$1"+"Publicīs");
  d = r(d, '(^|="|>)Prześlij zdjęcie / film(?=($|"|<))', "$1"+" Tenginnais auīmsenin / filman ");
  d = r(d, '(^|="|>)Skorzystaj z kamery internetowej(?=($|"|<))', "$1"+" Tērpaus internettas kamēran ");
  d = r(d, '(^|="|>)Utwórz album ze zdjęciami(?=($|"|<))', "$1"+"Segēis alban sen auīmsenins");
  d = r(d, '(^|="|>)Zapytaj o coś\.\.\.(?=($|"|<))', "$1"+"Prasīs ezze ka nika...");
  d = r(d, '(^|="|>)Dodaj opcję\.\.\.(?=($|"|<))', "$1"+"Preidāis opciōnin");
  d = r(d, '(^|="|>)Dodaj opcje ankiety(?=($|"|<))', "$1"+"Preidāis enkētis opciōnins");
  d = r(d, '(^|="|>)Zezwalaj wszystkim na dodawanie opcji(?=($|"|<))', "$1"+"Dāis wisēimans preidātun opciōnins");
  d = r(d, '(^|="|>)Tylko ja(?=($|"|<))', "$1"+"Tēr as");
  d = r(d, '(^|="|>)Znajomi poza dalszymi znajomymi(?=($|"|<))', "$1"+"Zinātenei šlāit tālaisins zinātenins");
  d = r(d, '(^|="|>)Ustawienie niestandardowe(?=($|"|<))', "$1"+"Nistāndardiskas ensadīnsnas");
  d = r(d, '(^|="|>)Wróć(?=($|"|<))', "$1"+"Etwartinnais si");
  d = r(d, '(^|="|>)Dalsi znajomi(?=($|"|<))', "$1"+"Tālaišai zinātenei");
  d = r(d, '(^|="|>) w pobliżu\\: (?=($|"|<))', "$1"+" zūrgi: ");
  d = r(d, '(^|="|>)Ulubione(?=($|"|<))', "$1"+"Milītašai");
  d = r(d, '(^|="|>)Niedawne(?=($|"|<))', "$1"+"Panzdaumai");
  d = r(d, '(^|="|>)Dołącz(?=($|"|<))', "$1"+"Preidāis si");
  d = r(d, '(^|="|>)Więcej ostatniej aktywności(?=($|"|<))', "$1"+"Tūls panzdaumas aktīwibis");
  d = r(d, '(^|="|>)Zobacz wszystkie listy\.\.\.(?=($|"|<))', "$1"+"Waidinnais wissans listins...");
  d = r(d, '(^|="|>)Zobacz wszystkie(?=($|"|<))', "$1"+"Waidinnais wissans");
  d = r(d, '(^|>) \\(([0-9,]+) zdjęcie\\)(?=($|<))', "$1"+" ("+"$2"+" auīmsenis)");
  d = r(d, '(^|>) \\(([0-9,]+) zdjęcia\\)(?=($|<))', "$1"+" ("+"$2"+" auīmsenei)");
  d = r(d, '(^|>) \\(([0-9,]+) zdjęć\\)(?=($|<))', "$1"+" ("+"$2"+" auīmsenei)");
  d = r(d, '(^|>) \\(([0-9,]+) zdjęć\\)(?=($|<))', "$1"+" ("+"$2"+" auīmsenei)");
  d = r(d, '(^|="|>)([0-9,]+) osób lubi to(?=($|"|<))', "$1"+"$2"+" zmūnimans stan padīnga");
  d = r(d, '(^|="|>)([0-9,]+) osoby lubią to(?=($|"|<))', "$1"+"$2"+" zmūnimans stan padīnga");
  d = r(d, '(^|="|>)([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+"$2"+" zmūnei waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+"$2"+" zmūnei waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+" zmūnei ezze stan waiţāi");
  d = r(d, '(^|="|>)([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+"$2"+" zmūnimans stan padīnga, be "+"$3"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+"$2"+" zmūnimans stan padīnga, be "+"$3"+"."+"$4"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+).([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+"."+"$5"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+"."+"$5"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+"."+"$5"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+"."+"$5"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+"$2"+"."+"$3"+" zmūnimans stan padīnga, be "+"$4"+" waiţāi ezze stan");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na zinātenes auīmsenin "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na zinātenes auīmsenin "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na zinātenes auīmsenin "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na "+"$3"+" šisse mīnsis auīmsenin</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na "+"$3"+" šisse mīnsis auīmsenin</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na "+"$3"+" šisse mīnsis auīmsenin</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na "+"$3"+" auīmsenin</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na "+"$3"+" auīmsenin</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan na "+"$3"+" auīmsenin</a>"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony w albumie (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan en albu "+"$3"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona w albumie (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" pastāi pazentlitan en albu "+"$3"+" stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>) \\— z użytkownikiem (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"- sen tērpautajan "+"$2"+".");
  d = r(d, '(^|="|>) \\— z użytkownikiem (<a [^>]+>[^<]+</a>) w miejscu (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"- sen tērpautajan "+"$2"+" en deīktu "+"$3"+".");
  d = r(d, '(^|="|>)Twoja bliska rodzina lub rodzina wielopokoleniowa\. (?=($|"|<))', "$1"+"Twajā taūwa seimī, adder tūlageneraciōnis seimī. ");
  d = r(d, '(^|="|>)Dowiedz się więcej(?=($|"|<))', "$1"+"Erwaīdais tūls");
  d = r(d, '(^|="|>)Na tej liście \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Nō šan listin"+" ($2)");
  d = r(d, '(^|="|>)Dodaj krewnych do tej listy(?=($|"|<))', "$1"+"Preidāis gintun prēi šan listin");
  d = r(d, '(^|="|>)Najbliżsi znajomi, o których chcesz widzieć więcej informacji\. (?=($|"|<))', "$1"+"Ukataūwaišai zinātenei, ezze kans Tu kwāi widātun tūls infōrmaciōnins. ");
  d = r(d, '(^|="|>)Pokaż sugestie znajomych dla listy\.(?=($|"|<))', "$1"+"Pawaidinnais zinātenin nadāsnans per listin.");
  d = r(d, '(^|="|>)Strony polecane(?=($|"|<))', "$1"+"Nadatāi pausāi");
  d = r(d, '(^|="|>)Ukryj propozycje(?=($|"|<))', "$1"+"Kliptinnais nadāsnans");
  d = r(d, '(^|="|>)Proponowane osoby(?=($|"|<))', "$1"+"Nadātas persōnis");
  d = r(d, '(^|="|>)Album\\:(?=($|"|<))', "$1"+" Album:");
  d = r(d, '(^|="|>)Dodaj znacznik do zdjęcia(?=($|"|<))', "$1"+"Preidāis pazentlisnan prei auīmsenin");
  d = r(d, '(^|="|>)Dodaj lokalizację(?=($|"|<))', "$1"+"Preidāis auīmsenes segīsnas deīktan");
  d = r(d, '(^|="|>)Zakończono oznaczanie(?=($|"|<))', "$1"+"Pazentlisna wangīntan");
  d = r(d, '(^|="|>)Gdzie zostało zrobione to zdjęcie\\?(?=($|"|<))', "$1"+"Kwēi šis auīmsenis pastāi segītan?");
  d = r(d, '(^|="|>)Kliknij zdjęcie, aby zacząć oznaczanie(?=($|"|<))', "$1"+"Sprakstinnais auīmsenins, kāi pazentlilai");
  d = r(d, '(^|="|>)Pobierz(?=($|"|<))', "$1"+"Izkraūneis");
  d = r(d, '(^|="|>)Zgłoś to zdjęcie(?=($|"|<))', "$1"+"Pawakēis perwaldīnsnai");
  d = r(d, '(^|="|>)([0-9,]+) znajomych(?=($|"|<))', "$1"+"$2"+" zinātenei");
  d = r(d, '(^|="|>) lubi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" padīnga "+"$2"+".");
  d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" preiēiminina "+"$2"+".");
  d = r(d, '(^|="|>) udostępnił (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" preiēiminina "+"$2"+" stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" preiēiminina "+"$2"+" stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>) udostępniła (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" preiēiminina "+"$2"+" stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>) skomentował\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" preidāi kumentāran: "+"$2"+".");
  d = r(d, '(^|="|>) skomentowała\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" preidāi kumentāran: "+"$2"+".");
  d = r(d, '(^|="|>) odpowiedział\\(a\\) na pytanie\.(?=($|"|<))', "$1"+" etrāi na prasīsenin.");
  d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>) dzięki użytkownikowi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" preiēiminina "+"$2"+" dīnkausnas prei tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>) dołączył do grona znajomych użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" pastāi preidātan prei zinātenins stesse tērpautajan "+"$2"+".");
  d = r(d, '(^|="|>) dołączyła do grona znajomych użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" pastāi preidātan prei zinātenins stesse tērpautajan "+"$2"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował swoje  (<a [^>]+>)zdjęcie w tle</a>\.(?=($|"|<))', "$1"+"$2"+" aktualizijja auīmsenin en rīkisnasgruntu. ");
  d = r(d, '(^|="|>)Pliki(?=($|"|<))', "$1"+"Zūrbrukei");
  d = r(d, '(^|="|>)Dodaj plik(?=($|"|<))', "$1"+"Preidāis zūrbrukin");
  d = r(d, '(^|="|>)Przestań obserwować post(?=($|"|<))', "$1"+"Nijāu nadirēis enpeisāsenin ");
  d = r(d, '(^|="|>)Napisz coś\.\.\.(?=($|"|<))', "$1"+"Peisāis ka nika...");
  d = r(d, '(^|="|>)Studiował w\\: (?=($|"|<))', "$1"+"Studijja en: ");
  d = r(d, '(^|="|>)Mieszka w\\: (?=($|"|<))', "$1"+"Buwinna en: ");
  d = r(d, '(^|="|>)Mieszka w\\:(?=($|"|<))', "$1"+"Buwinna en:");
  d = r(d, '(^|="|>)Strony(?=($|"|<))', "$1"+"Pausāi");
  d = r(d, '(^|="|>)Ulubione cytaty(?=($|"|<))', "$1"+"Milītašai citātai");
  d = r(d, '(^|="|>)Dodaj ulubiony cytat(?=($|"|<))', "$1"+"Preidāis milītasin citātan");
  d = r(d, '(^|="|>)Telefony komórkowe(?=($|"|<))', "$1"+"Kūringiskas telapōnai");
  d = r(d, '(^|="|>)Dane kontaktowe(?=($|"|<))', "$1"+"Kōntaktas dātan");
  d = r(d, '(^|="|>)Języki(?=($|"|<))', "$1"+"Billas");
  d = r(d, '(^|="|>)Data urodzenia(?=($|"|<))', "$1"+"Gīmsenes deinā");
  d = r(d, '(^|="|>)Status związku(?=($|"|<))', "$1"+"Sēisnas stātus");
  d = r(d, '(^|="|>)W związku(?=($|"|<))', "$1"+"En sēisnai");
  d = r(d, '(^|="|>)Podstawowe informacje(?=($|"|<))', "$1"+"Bāziskas infōrmaciōnis");
  d = r(d, '(^|="|>)Informacje o Tobie(?=($|"|<))', "$1"+"Ezze Tin");
  d = r(d, '(^|="|>)Napisz o sobie(?=($|"|<))', "$1"+"Peisāis ka nika ezze sin");
  d = r(d, '(^|="|>)Kobieta(?=($|"|<))', "$1"+"Genā");
  d = r(d, '(^|="|>)Mężczyzna(?=($|"|<))', "$1"+"Wīrs");
  d = r(d, '(^|="|>)Miejsce zamieszkania(?=($|"|<))', "$1"+"Buwīnsnas deīktan");
  d = r(d, '(^|="|>)Miasto rodzinne(?=($|"|<))', "$1"+"Seīmismistan");
  d = r(d, '(^|="|>)Historia \\(wg lat\\)(?=($|"|<))', "$1"+"Istōrija (pa mettamans)");
  d = r(d, '(^|="|>)Wykształcenie i praca(?=($|"|<))', "$1"+"Iztikīnsna be dīlin");
  d = r(d, '(^|="|>)Obserwuj post(?=($|"|<))', "$1"+"Nadirēis enpeisāsenin");
  d = r(d, '(^|="|>)Odwiedzenie ([0-9,]+) miejsc(?=($|"|<))', "$1"+"Kāimalukisenis stēisan "+"$2"+" deīktans");
  d = r(d, '(^|="|>)([0-9,]+) zdjęcia(?=($|"|<))', "$1"+"$2"+" auīmsenei");
  d = r(d, '(^|="|>)([0-9,]+) zdjęć(?=($|"|<))', "$1"+"$2"+" auīmsenei");
  d = r(d, '(^|="|>)([0-9,]+) zdjęcie(?=($|"|<))', "$1"+"$2"+" auīmsenis");
  d = r(d, '(^|="|>) był\\(a\\) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" bēi en deīktu: "+"$2"+".");
  d = r(d, '(^|="|>) był\\(a\\) z użytkownikiem (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" bēi sen tērpautajan "+"$2"+" en deīktu "+"$3"+".");
  d = r(d, '(^|="|>) dodała (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1"+" preidāwusi "+"$2"+" prei alban "+"$3"+".");
  d = r(d, '(^|="|>) dodał (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1"+" preidāwuns "+"$2"+" prei alban "+"$3"+".");
  d = r(d, '(^|="|>) dodał\\(a\\) (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1"+" preidāi "+"$2"+" prei alban "+"$3"+".");
  d = r(d, '(^|="|>) był\\(a\\) z\\: (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+", "+"$2"+" be "+"$3"+" bēi en deīktu "+"$4"+".");
  d = r(d, '(^|="|>) był\\(a\\) z użytkownikami (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+", "+"$2"+" be "+"$3"+" bēi en deīktu "+"$4"+".");
  d = r(d, '(^|="|>) zaktualizował\\(a\\) swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" aktualizijja swajjan "+"$2"+".");
  d = r(d, '(^|="|>) zaktualizował swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" aktualizijja swajjan "+"$2"+".");
  d = r(d, '(^|="|>) zaktualizowała swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" aktualizijja swajjan "+"$2"+".");
  d = r(d, '(^|="|>)zdjęcie w tle(?=($|"|<))', "$1"+"rīkisnasgruntas auīmsenin");
  d = r(d, '(^|="|>)zdjęcie profilowe(?=($|"|<))', "$1"+"rekkenas auīmsenin");
  d = r(d, '(^|="|>)Przejdź do trybu online(?=($|"|<))', "$1"+"Prajaīs prei online wīdan");
  d = r(d, ' korzysta obecnie z wersji serwisu Facebook w języku\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', " tēnti tērpaui Facebookan en: "+"$1"+".");
  d = r(d, '(^|="|>)Zdjęcia i filmy(?=($|"|<))', "$1"+"Auīmsenei be filmai");
  d = r(d, '(^|="|>)Wszystkie(?=($|"|<))', "$1"+"Wisāi");
  d = r(d, '(^|="|>)Tylko dokumenty(?=($|"|<))', "$1"+"Tēr dōkumentis");
  d = r(d, '(^|="|>)Tylko pliki(?=($|"|<))', "$1"+"Tēr zūrbrukei");
  d = r(d, '(^|="|>)Utwórz dokument(?=($|"|<))', "$1"+"Teīkeis dōkumentin");
  d = r(d, '(^|="|>)Porozmawiaj na czacie z grupą(?=($|"|<))', "$1"+"Waiţāis na čattan sen gruppin");
  d = r(d, '(^|="|>)Dodaj do ulubionych(?=($|"|<))', "$1"+"Preidāis prei milītasins");
  d = r(d, '(^|="|>)Edytuj grupę(?=($|"|<))', "$1"+"Redigīs gruppin");
  d = r(d, '(^|="|>)Zgłoś grupę(?=($|"|<))', "$1"+"Pawakēis gruppin perwaldīnsnai");
  d = r(d, '(^|="|>)Opuść grupę(?=($|"|<))', "$1"+"Palaīdeis gruppin");
  d = r(d, '(^|="|>)Brak wyników(?=($|"|<))', "$1"+"Ni ast rezultātai");
  d = r(d, '(^|="|>)W tej grupie nie ma zdjęć i filmów.(?=($|"|<))', "$1"+"En šissei gruppin ni ast auīmsenei be filmai");
  d = r(d, '(^|="|>)Jeszcze w tym tygodniu(?=($|"|<))', "$1"+"Dabber en šissei sawaītin");
  d = r(d, '(^|="|>)W następnym tygodniu(?=($|"|<))', "$1"+"En ripīntei sawaītin");
  d = r(d, '(^|="|>)W tym miesiącu(?=($|"|<))', "$1"+"En šismu mīnsin");
  d = r(d, '(^|="|>)W zeszłym tygodniu(?=($|"|<))', "$1"+"En panzdaumai sawaītin");
  d = r(d, '(^|="|>)Minione wydarzenia(?=($|"|<))', "$1"+"Pragūbingiskwas audāsenei");
  d = r(d, '(^|="|>)Nadchodzące wydarzenia(?=($|"|<))', "$1"+"Perejīngiskwas audāsenei");
  d = r(d, '(^|="|>)Proponowane wydarzenia(?=($|"|<))', "$1"+"Nadatāi audāsenei");
  d = r(d, '(^|="|>)Odrzucone wydarzenia(?=($|"|<))', "$1"+"Etmestai audāsenei");
  d = r(d, '(^|="|>)Urodziny(?=($|"|<))', "$1"+"Gīmsenes deinā");
  d = r(d, '(^|="|>)Eksportuj zdarzenia\.\.\.(?=($|"|<))', "$1"+"Ekspōrtis audāsenins...");
  d = r(d, '(^|="|>) \\· Lubisz tę stronę\.(?=($|"|<))', "$1"+"· Tebbei padīnga šin pāusan.");
  d = r(d, '(^|="|>)Organizowane przez\\: (?=($|"|<))', "$1"+"Ōrganizitan ezze: ");
  d = r(d, '(^|="|>)Ukryj zdarzenie(?=($|"|<))', "$1"+"Kliptinnais audāsenin");
  d = r(d, '(^|="|>)Zgłoś zdarzenie lub spam(?=($|"|<))', "$1"+"Pawakēis perwaldīsnai audāsenin adder spamman");
  d = r(d, '(^|="|>)Wszystkie zdarzenia(?=($|"|<))', "$1"+"Wisāi audāsenei");
  d = r(d, '(^|="|>)Większość zdarzeń(?=($|"|<))', "$1"+"Audāsenin mūisisku");
  d = r(d, '(^|="|>)Tylko ważne(?=($|"|<))', "$1"+"Tēr swarewīngei");
  d = r(d, '(^|="|>)Edytuj ustawienia(?=($|"|<))', "$1"+"Redigīs ensadīnsnans");
  d = r(d, '(^|="|>)Zarchiwizuj listę(?=($|"|<))', "$1"+"Arkīwis listin");
  d = r(d, '(^|="|>)Polecane wydarzenia(?=($|"|<))', "$1"+"Bédowóné rozegracje");
  d = r(d, '(^|="|>)Zapytaj znajomych(?=($|"|<))', "$1"+"Prasīs zinātenins");
  d = r(d, '(^|="|>)Zobacz(?=($|"|<))', "$1"+"Waidinnais");
  d = r(d, '(^|="|>)Inni(?=($|"|<))', "$1"+"Kitāi");
  d = r(d, '(^|="|>)Zadał\\(a\\)(?=($|"|<))', "$1"+"Prasijja");
  d = r(d, '(^|="|>)([0-9,]+) więcej(?=($|"|<))', "$1"+"$2"+" tūls");
  d = r(d, '(^|="|>)Znajomi \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"$2"+" zinātenei");
  d = r(d, '(^|="|>)Sztuka i rozrywka(?=($|"|<))', "$1"+"Kunsta be enwesselinsna");
  d = r(d, '(^|="|>)Ulubione zajęcia i zainteresowania(?=($|"|<))', "$1"+"Milītašai dizīsnas be eninteressinsnas");
  d = r(d, '(^|="|>)Ma ([0-9,]+) znajomych na Facebooku\.(?=($|"|<))', "$1"+"Turri "+"$2"+" zinātenins na Facebookan.");
  d = r(d, '(^|="|>)Edytuj opcje(?=($|"|<))', "$1"+"Redigīs opciōnins");
  d = r(d, '(^|="|>)Obserwuj(?=($|"|<))', "$1"+"Nadirēis");
  d = r(d, '(^|="|>)Ustawienia powiadomień(?=($|"|<))', "$1"+"Waīstin ensadīnsnas");
  d = r(d, '(^|="|>)Twoje powiadomienia(?=($|"|<))', "$1"+"Twajjas waīstis");
  d = r(d, '(^|="|>)Otrzymuj powiadomienia poprzez\:(?=($|"|<))', "$1"+"Gaūneis waīstins pra:");
  d = r(d, '(^|="|>)Nowe znaczniki \\„Lubię to\\!\\”(?=($|"|<))', "$1"+"Nawwas pazentlisnas Mennei padīnga!");
  d = r(d, '(^|="|>)Więcej zdarzeń(?=($|"|<))', "$1"+"Tūls audāsenin");
  d = r(d, '(^|="|>)Edytuj stronę(?=($|"|<))', "$1"+"Redigīs pāusan");
  d = r(d, '(^|="|>)Uprawnienia administracyjne(?=($|"|<))', "$1"+"Perwaldītajas tikrōmiskwas");
  d = r(d, '(^|="|>)Edytuj stronę(?=($|"|<))', "$1"+"Redigīs pāusan");
  d = r(d, '(^|="|>)Zarządzaj powiadomieniami(?=($|"|<))', "$1"+"Perwaldais waīstimans");
  d = r(d, '(^|="|>)Zarządzaj uprawnieniami(?=($|"|<))', "$1"+"Perwaldais tikrōmiskwamans");
  d = r(d, '(^|="|>)Skorzystaj z dziennika aktywności(?=($|"|<))', "$1"+"Tērpaus aktīwibis deinālaiskan");
  d = r(d, '(^|="|>)Zobacz zablokowanych użytkowników(?=($|"|<))', "$1"+"Widāis blōkitans tērpautajans");
  d = r(d, '(^|="|>)Poleć jej znajomych(?=($|"|<))', "$1"+"Nadāis tenessei zinātenins");
  d = r(d, '(^|="|>)Poleć mu znajomych(?=($|"|<))', "$1"+"Nadāis tenesmu zinātenins");
  d = r(d, '(^|="|>)Pomóż znajomemu(?=($|"|<))', "$1"+"Pagalbais zināteņu");
  d = r(d, '(^|="|>)Złóż życzenia(?=($|"|<))', "$1"+"Tenginnais kwaitīsnans");
  d = r(d, '(^|="|>)Zaczepki(?=($|"|<))', "$1"+"Tēlkeis");
  d = r(d, '(^|="|>)Zaczep(?=($|"|<))', "$1"+"Tēlksenei");
  d = r(d, '(^|="|>)Telewizja(?=($|"|<))', "$1"+"Tāliwidasna");
  d = r(d, '(^|="|>)Książki(?=($|"|<))', "$1"+"Lāiskai");
  d = r(d, '(^|="|>)Szkoła średnia(?=($|"|<))', "$1"+"Sirdaskūli");
  d = r(d, '(^|="|>)Pracodawcy(?=($|"|<))', "$1"+"Dilindātajai");
  d = r(d, '(^|="|>)Usuń podgląd(?=($|"|<))', "$1"+"Āupasinais pirzdauwīdan");
  d = r(d, '(^|="|>)Dodaj znajomych do czatu\.\.\.(?=($|"|<))', "$1"+"Preidāis zinātenins prei čattan...");
  d = r(d, '(^|="|>)Zobacz pełną konwersację(?=($|"|<))', "$1"+"Widāis pastippan waiţāsenin");
  d = r(d, '(^|="|>)Wyczyść okno(?=($|"|<))', "$1"+"Skistinnais lāngstan");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Muzīki");
  d = r(d, '(^|="|>)Menedżer reklam(?=($|"|<))', "$1"+"Reklāmin perwaldītajs");
  d = r(d, '(^|="|>)Dziś są jej urodziny\.(?=($|"|<))', "$1"+"Šandēinan ast tenesses gīmsnas deinā.");
  d = r(d, '(^|="|>)Dziś są jego urodziny\.(?=($|"|<))', "$1"+"Šandēinan ast tenesse gīmsnas deinā.");
  d = r(d, '(^|="|>)Inne wiadomości(?=($|"|<))', "$1"+"Kitāi waīstis");
  d = r(d, '(^|="|>)Właściciele strony(?=($|"|<))', "$1"+"Pāusas waldītajai");
  d = r(d, '(^|="|>)Tablica&nbsp;(?=($|"|<))', "$1"+"Zēids&nbsp;");
  d = r(d, '(^|="|>)Informacje&nbsp;(?=($|"|<))', "$1"+"Waīstis&nbsp;");
  d = r(d, '(^|="|>)Zdjęcia&nbsp;(?=($|"|<))', "$1"+"Auīmsenei&nbsp;");
  d = r(d, '(^|="|>)Znajomi&nbsp;(?=($|"|<))', "$1"+"Zinātenei&nbsp;");
  d = r(d, '(^|="|>)Subskrypcje&nbsp;(?=($|"|<))', "$1"+"Subskribīsnas&nbsp;");
  d = r(d, '(^|="|>)Data urodzenia\\: ', "$1"+"Gīmsnas dātan: ");
  d = r(d, '(^|="|>)Dzisiaj(?=($|"|<))', "$1"+"Šandēinan");
  d = r(d, '(^|="|>)W toku(?=($|"|<))', "$1"+"En segīsnai");
  d = r(d, '(^|="|>)Zobacz\\: (?=($|"|<))', "$1"+"Waidinnais: ");
  d = r(d, '(^|="|>)Znajomi na czacie(?=($|"|<))', "$1"+"Zinātenei en čattu");
  d = r(d, '(^|="|>)W związku małżeńskim z użytkownikiem\\:(?=($|"|<))', "$1"+"Pattintan sen tērpautajan: ");
  d = r(d, '(^|="|>)Dodaj swoje miejsce pracy(?=($|"|<))', "$1"+"Preidāis dīlis deīktan");
  d = r(d, '(^|="|>)W związku małżeńskim z użytkownikiem\\: (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"Pattintan sen tērpautajan: "+"$2");
  d = r(d, '(^|="|>)\, aby zobaczyć\, kto jest dostępny na czacie\.(?=($|"|<))', "$1"+", kāi widālai, kas ast preiēiminan.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) dołączyli do grupy(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" preidāi si prei gruppin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Šismu/šissei"+"$2"+" padīnga tērpautajs"+"$3"+""+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Šismu/šissei"+"$2"+" padīnga "+"$3"+" be "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" teinū ast zinātenei stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) zmieniło swoje zdjęcia profilowe\.(?=($|"|<))', "$1"+"$2"+" be "+"$3"+" kitawīdina swajjans rekkenas auīmsenins.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zmienił\\(a\\) swoje zdjęcie profilowe\.(?=($|"|<))', "$1"+"$2"+" kitawīdina swajjan rekkenas auīmsenin.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedział (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" na prasīsenin "+"$3"+" etrāwuns "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedział (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" na prasīsenin "+"$3"+" etrāwuns "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedziała (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" na prasīsenin "+"$3"+" etrāwusi "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedziała (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" na prasīsenin "+"$3"+" etrāwusi "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"Šismu/šissei"+"$2"+" be "+"$3"+" padīnga "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) także to lubią\.(?=($|"|<))', "$1"+"Šismu/šissei"+"$2"+" be "+"$3"+" dīgi padīnga stan.");
  d = r(d, '(^|="|>)Grupa (<a [^>]+>[^<]+</a>) nie ma żadnych minionych wydarzeń\. (?=($|"|<))', "$1"+"Gruppi "+"$2"+" ni turri nikawīdans pragūbingiskwas audāsenins. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) weźmie udział w wydarzeniu \\„(<a [^>]+>[^<]+</a>)\\” \\– (<a [^>]+>[^<]+</a>)\, w miejscu\\:', "$1"+"$2"+" wīrst delīkan immuns "+"$3"+" – "+"$4"+", "+"en deīktu:");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zadał\\(a\\) pytanie \\„(<a [^>]+>[^<]+</a>)\\”(?=($|"|<))', "$1"+"$2"+" prasijja: "+"''"+"$3"+"''");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?1) nowy post opublikowany przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" turri "+"$3"+"nawwan enpeisāsenin publicītan ezze tērpautaju "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[2-4]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" turri "+"$3"+" nawwans enpeisāsenins publicītan ezze tērpautaju "+"$4"+" be "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[5-9]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" turri "+"$3"+" nawwans enpeisāsenins publicītan ezze tērpautaju "+"$4"+" be "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma ([0-9,]+) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" turri "+"$3"+" nawwans enpeisāsenins publicītan ezze tērpautaju "+"$4"+" be "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[2-4]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" turri "+"$3"+" nawwans enpeisāsenins publicītan ezze tērpautaju "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[5-9]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" turri "+"$3"+" nawwans enpeisāsenins publicītan ezze tērpautaju"+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma ([0-9,]+) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" turri "+"$3"+" nawwans enpeisāsenins publicītan ezze tērpautaju "+"$4"+".");
  d = r(d, '(^|>)Zobacz 1 post więcej użytkownika ', "$1"+"Waidinnais 1 enpeisāsenin tūls ezze tērpautaju ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?1)\\) użytkownika\\: ', "$1"+"Waidinnais "+"$2"+" tūls enpeisāsenins ezze tērpautaju: ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?[2-4])\\) użytkowników\\: ', "$1"+"Waidinnais "+"$2"+" tūls enpeisāsenins ezze tērpautajamans: ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?[5-9])\\) użytkowników\\: ', "$1"+"Waidinnais "+"$2"+" tūls enpeisāsenins ezze tērpautajamans: ");
  d = r(d, '(^|>)Zobacz więcej postów \\(([0-9,]+)\\) użytkowników\\: ', "$1"+"Waidinnais "+"$2"+" tūls enpeisāsenins ezze tērpautajamans: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?1)\\) postów użytkownika\\: ', "$1"+"Waidinnais "+"$2"+" tūls enpeisāsenins ezze tērpautaju: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?[2-4])\\) postów użytkownika ', "$1"+"Waidinnais "+"$2"+" tūls enpeisāsenins ezze tērpautaju: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?[5-9])\\) postów użytkownika ', "$1"+"Waidinnais "+"$2"+" tūls enpeisāsenins ezze tērpautaju: ");
  d = r(d, '(^|>)Zobacz więcej \\(([0-9,]+)\\) postów użytkownika ', "$1"+"Waidinnais "+"$2"+" tūls enpeisāsenins ezze tērpautaju: ");
d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+"autengīnsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swoje własne (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+"auīmsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+"enpeisāsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+"stātun</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+" autengīnsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+"auīmsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+"enpeisāsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+"stātun</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kumentijja swajjan "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+"autengīnsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twoje (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+"auīmsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+"enpeisāsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+"stātun</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+"autengīnsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twoje (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+"auīmsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+"enpeisāsenin</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+"stātun</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" kumentijja Twajjan "+"$3"+".");

  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodał post na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" preidāwuns enpeisāsenin en pāusan stesses gruppin "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodała post na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" preidāwusi enpeisāsenin en pāusan stesses gruppin "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodał\\(a\\) post do grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" preidāi enpeisāsenin en gruppei "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował Twój wpis na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" kumentijja Twajjan enpeisāsenin en pāusu stesses gruppin "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała Twój wpis na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" kumentijja Twajjan enpeisāsenin en pāusu stesses gruppin "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentował wpis w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dīgi kumentijja enpeisāsenin en gruppei "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentowała wpis w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dīgi kumentijja enpeisāsenin en gruppei "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentował zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dīgi kumentijja auīmsenin en gruppei "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentowała zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dīgi kumentija auīmsenin en gruppei "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali post w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" be "+"$3"+" dīgi kumentijja enpeisāsenin en gruppei "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali Twoje zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" be "+"$3"+" kumentijja Twajjan auīmsenin en gruppei "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali status użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" be "+"$3"+" dīgi kumentijja stātun stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali Twój status\.', "$1"+"$2"+" be "+"$3"+" kumentijja Twajjan stātun.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepił Cię\. ', "$1"+"$2"+" Tēlki Tin.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepiła Cię\. ', "$1"+"$2"+" Tēlki Tin.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepił\\(a\\) Cię\. ', "$1"+"$2"+" Tēlki Tin.");
  d = r(d, '(^|="|>) zaczepił Cię(?=($|"|<))', "$1"+" tēlki Tin.");
  d = r(d, '(^|="|>) zaczepiła Cię(?=($|"|<))', "$1"+" tēlki Tin.");
  d = r(d, '(^|="|>) zaczepił\\(a\\) Cię(?=($|"|<))', "$1"+" tēlki Tin.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) także skomentowali (<span [^>]+>[^<]+</span>) status\.', "$1"+"$2"+", "+"$3"+" be "+"$4"+" kitāi dīgi kumentijja stātun "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) lubi Twój komentarz\\:',"Šismu/šissei "+"$1"+"$2"+" (zinātenis stesse(s) "+"$3"+") "+"padīnga Twajs kumentārs: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) skomentował link użytkownika (<span [^>]+>[^<]+</span>)\\:', "$1"+"$2"+" (zinātenis stesse(s) "+"$3"+") "+"kumentijja autengīnsenin stesse tērpautajan "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi Twój komentarz\\:', "$1"+"Šismu/šissei "+"$2"+" padīnga Twajs kumentārs: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"Šismu/šissei "+"$2"+" padīnga autengīnsenis stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) skomentował\\(a\\) status użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" (zinātenis stesse(s) "+"$3"+") "+"kumentijja stātun stesse tērpautajan "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią stronę \\„(<span [^>]+>[^<]+</span>)\\”\.', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" kitāi padīnga pāusan "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" be "+"$4"+" kitāi kumentijja auīmsenin stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali link  użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" be "+"$4"+" kitāi kumentijja autengīnsenin stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" be "+"$4"+" kitāi kumentijja enpeisāsenin stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią Twoje zdjęcie na Tablicy użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" kitēimans padīnga Twajs auīmsenis na zēidan stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubi album ', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" kitēimans padīnga album ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i ([0-9,]+) inne osoby lubią Twój komentarz\\: ', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" kitēimans padīnga Twajs kumentārs: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i ([0-9,]+) innych znajomych lubi Twoje zdjęcie\.', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" kitēimans zinātenins padīnga Twajs auīmsenis: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią zdjęcie użykownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" padīnga auīmsenis stesse tērpautajan "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią Twój komentarz\\: ', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" padīnga Twajs kumentārs: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"Šismu/šissei "+"$2"+" padīnga auīmsenis stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) link użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" be "+"$3"+" dīgi kumentijja autengīnsenin stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"Šēimans "+"$2"+" be "+"$3"+" padīnga auīmsenis stesse tērpautajan "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) link użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" be "+"$4"+" dīgi kumentijja autengīnsenin stesse tērpautajan "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią Twój komentarz\\: ', "$1"+"Šēimans "+"$2"+" be "+"$3"+" padīnga Twajs kumentārs: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" kumentijja auīmsenin stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" kumentijja auīmsenin stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" kumentijja autengīnsenin stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" kumentijja autengīnsenin stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował\\(a\\) status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" kumentijja stātun stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" kumentijja stātun stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" kumentijja stātun stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"Šismu/šissei "+"$2"+" padīnga stātus stesse tērpautajan "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" kitēimans padīnga auīmsenis stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubi link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" kitēimans padīnga autengīnsenis stesse tērpautajan "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią link użykownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"Šēimans "+"$2"+", "+"$3"+" be "+"$4"+" padīnga autengīnsenis stesse tērpautajan "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+" be "+"$3"+" dīgi kumentijja auīmsenin stesse tērpautajan "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią link użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"Šēimans "+"$2"+" be "+"$3"+" padīnga autengīnsenis stesse tērpautajan "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali\\(ły\\) zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+" be "+"$3"+" kumentijja auīmsenin stesse tērpautajan "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi album ', "$1"+"Šismu/šissei "+"$2"+" padīnga album ");
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