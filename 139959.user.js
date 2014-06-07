// ==UserScript==
// @name           facebook-csb
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Kashubian
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.5
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-08-02
// Translations:   Mateusz Meyer - www.tites.kaszubia.com

/*
 *  Copyright 2012 Kevin Scannell , Grzegorz Kulik , Mateusz Meyer
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
  d = r(d, '(^|="|>)([0-9]{1,2}) stycznia(?=($|"|<))', "$1"+"$2"+" stëcznika");
  d = r(d, '(^|="|>)([0-9]{1,2}) lutego(?=($|"|<))', "$1"+"$2"+" gromicznika");
  d = r(d, '(^|="|>)([0-9]{1,2}) marca(?=($|"|<))', "$1"+"$2"+" strëmiannika");
  d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia(?=($|"|<))', "$1"+"$2"+" łżëkwiôta");
  d = r(d, '(^|="|>)([0-9]{1,2}) maja(?=($|"|<))', "$1"+"$2"+" maja");
  d = r(d, '(^|="|>)([0-9]{1,2}) czerwca(?=($|"|<))', "$1"+"$2"+" czerwińca");
  d = r(d, '(^|="|>)([0-9]{1,2}) lipca(?=($|"|<))', "$1"+"$2"+" lëpińca");
  d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia(?=($|"|<))', "$1"+"$2"+" zélnika");
  d = r(d, '(^|="|>)([0-9]{1,2}) września(?=($|"|<))', "$1"+"$2"+" séwnika");
  d = r(d, '(^|="|>)([0-9]{1,2}) października(?=($|"|<))', "$1"+"$2"+" rujana");
  d = r(d, '(^|="|>)([0-9]{1,2}) listopada(?=($|"|<))', "$1"+"$2"+" smùtana");
  d = r(d, '(^|="|>)([0-9]{1,2}) grudnia(?=($|"|<))', "$1"+"$2"+" gòdnika");

  d = r(d, '(^|="|>)([0-9]{1,2}) stycznia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" stëcznika "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) lutego ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" gromicznika "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) marca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" strëmiannika "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" łżëkwiata "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) maja ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" maja "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) czerwca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" czerwińca "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) lipca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" lëpińca "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" zélnika "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) września ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" séwnika "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) października ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" rujana "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) listopada ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" smùtana "+"$3"+" ò "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) grudnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" gòdnika "+"$3"+" ò "+"$4");

  d = r(d, '(^|="|>)([0-9]{1,2}) stycznia o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" stëcznika ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) lutego o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" gromicznika ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) marca o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" strëmiannika ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" łżëkwiata ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) maja o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" maja ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) czerwca o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" czerwińca ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) lipca o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" lëpińca ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" zélnika ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) września o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" séwnika ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) października o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" rujana ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) listopada o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" smùtana ò "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) grudnia o ([0-9:apm]+)(?=($|"|<))', "$1"+"$2"+" gòdnika ò "+"$3");

  d = r(d, '(^|="|>)([0-9]{1,2}) stycznia ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" stëcznika "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) lutego ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" gromicznika "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) marca ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" strëmiannika "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia ([0-9]{4})(?=($|"|<))', "$1"+"$2"+"łżëkwiata "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) maja ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" maja "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) czerwca ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" czerwińca "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) lipca ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" lëpińca "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" zélnika "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) września ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" séwnika "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) października ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" rujana "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) listopada ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" smùtana "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) grudnia ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" gòdnika "+"$3");

  d = r(d, '(^|="|>)styczeń(?=($|"|<))', "$1"+"Stëcznika");
  d = r(d, '(^|="|>)luty(?=($|"|<))', "$1"+"Gromicznik");
  d = r(d, '(^|="|>)marzec(?=($|"|<))', "$1"+"Strëmiannik");
  d = r(d, '(^|="|>)kwiecień(?=($|"|<))', "$1"+"Łżëkwiat");
  d = r(d, '(^|="|>)maj(?=($|"|<))', "$1"+"Môj");
  d = r(d, '(^|="|>)czerwiec(?=($|"|<))', "$1"+"Czerwińc");
  d = r(d, '(^|="|>)lipiec(?=($|"|<))', "$1"+"Lëpińc");
  d = r(d, '(^|="|>)sierpień(?=($|"|<))', "$1"+"Zélnik");
  d = r(d, '(^|="|>)wrzesień(?=($|"|<))', "$1"+"Séwnik");
  d = r(d, '(^|="|>)październik(?=($|"|<))', "$1"+"Rujan");
  d = r(d, '(^|="|>)listopad(?=($|"|<))', "$1"+"Smùtan");
  d = r(d, '(^|="|>)grudzień(?=($|"|<))', "$1"+"Gòdnik");

  d = r(d, '(^|="|>)około minuty temu(?=($|"|<))', "$1"+"Kòl minutë nazôd");
  d = r(d, '(^|="|>)kilka sekund temu(?=($|"|<))', "$1"+"Czile sekùńdów nazôd");
  d = r(d, '(^|="|>)około godziny temu(?=($|"|<))', "$1"+"Kòl gòdzënë nazôd");
  d = r(d, '(^|="|>)godzinę temu(?=($|"|<))', "$1"+"gòdzënã nazôd");
  d = r(d, '(^|="|>)(1?1) godz\\. temu(?=($|"|<))', "$1"+"$2"+" gòdzënã nazôd");
  d = r(d, '(^|="|>)(1?[2-4]) godz\\. temu(?=($|"|<))', "$1"+"$2"+" gòdzënë nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) godz\\. temu(?=($|"|<))', "$1"+"$2"+" gòdzënów nazôd");
  d = r(d, '(^|="|>)([0-9,]+) godz\\. temu(?=($|"|<))', "$1"+"$2"+" gòdzënów nazôd");
  d = r(d, '(^|="|>)minutę temu(?=($|"|<))', "$1"+"minutã nazôd");
  d = r(d, '(^|="|>)(1?1) minut\\(y\\) temu(?=($|"|<))', "$1"+"$2"+" minutã nazôd");
  d = r(d, '(^|="|>)(1?[2-4]) minut\\(y\\) temu(?=($|"|<))', "$1"+"$2"+" minutë nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) minut\\(y\\) temu(?=($|"|<))', "$1"+"$2"+" minut nazôd");
  d = r(d, '(^|="|>)([0-9,]+) minut\\(y\\) temu(?=($|"|<))', "$1"+"$2"+" minut nazôd");
  d = r(d, '(^|="|>)sekundę temu(?=($|"|<))', "$1"+"sekùńdã nazôd");
  d = r(d, '(^|="|>)(1?1) sekund\\(y\\) temu(?=($|"|<))', "$1"+"$2"+" sekùńdów nazôd");
  d = r(d, '(^|="|>)(1?[2-4]) sekund\\(y\\) temu(?=($|"|<))', "$1"+"$2"+" sekùńdë nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) sekund\\(y\\) temu(?=($|"|<))', "$1"+"$2"+" sekùńdów nazôd");
  d = r(d, '(^|="|>)([0-9,]+) sekund\\(y\\) temu(?=($|"|<))', "$1"+"$2"+" sekùńdów nazôd");

  d = r(d, '(^|="|>)Jutro(?=($|"|<))', "$1"+"Witro");
  d = r(d, '(^|="|>)Wczoraj(?=($|"|<))', "$1"+"Wczora");
  d = r(d, '(^|="|>)Poniedziałek(?=($|"|<))', "$1"+"Pòniedzôłk");
  d = r(d, '(^|="|>)Wtorek(?=($|"|<))', "$1"+"Wtórk");
  d = r(d, '(^|="|>)Środa(?=($|"|<))', "$1"+"Strzoda");
  d = r(d, '(^|="|>)Czwartek(?=($|"|<))', "$1"+"Czwiôrtk");
  d = r(d, '(^|="|>)Piątek(?=($|"|<))', "$1"+"Piątk");
  d = r(d, '(^|="|>)Sobota(?=($|"|<))', "$1"+"Sobòta");
  d = r(d, '(^|="|>)Niedziela(?=($|"|<))', "$1"+"Niedzela");

  d = r(d, '(^|="|>)w poniedziałek(?=($|"|<))', "$1"+"w pòniedzôłk");
  d = r(d, '(^|="|>)we wtorek(?=($|"|<))', "$1"+"we wtórk");
  d = r(d, '(^|="|>)w środę(?=($|"|<))', "$1"+"we strzodã");
  d = r(d, '(^|="|>)w czwartek(?=($|"|<))', "$1"+"we czwiôrtk");
  d = r(d, '(^|="|>)w piątek(?=($|"|<))', "$1"+"w piątk");
  d = r(d, '(^|="|>)w sobotę(?=($|"|<))', "$1"+"w sobòtã");
  d = r(d, '(^|="|>)w niedzielę(?=($|"|<))', "$1"+"w niedzelã");

  d = r(d, '(^|="|>)W poniedziałek(?=($|"|<))', "$1"+"w pòniedzôłk");
  d = r(d, '(^|="|>)We wtorek(?=($|"|<))', "$1"+"we wtórk");
  d = r(d, '(^|="|>)W środę(?=($|"|<))', "$1"+"we strzodã");
  d = r(d, '(^|="|>)W czwartek(?=($|"|<))', "$1"+"we czwiôrtk");
  d = r(d, '(^|="|>)W piątek(?=($|"|<))', "$1"+"w piątk");
  d = r(d, '(^|="|>)W sobotę(?=($|"|<))', "$1"+"w sobòtã");
  d = r(d, '(^|="|>)W niedzielę(?=($|"|<))', "$1"+"w niedzelã");

  d = r(d, '(^|="|>)w zeszły poniedziałek(?=($|"|<))', "$1"+"w ùszłi pòniedzôłk");
  d = r(d, '(^|="|>)w zeszły wtorek(?=($|"|<))', "$1"+"w ùszłi wtórk");
  d = r(d, '(^|="|>)w zeszłą środę(?=($|"|<))', "$1"+"w ùszłą strzodã");
  d = r(d, '(^|="|>)w zeszły czwartek(?=($|"|<))', "$1"+"w ùszłi czwiôrtk");
  d = r(d, '(^|="|>)w zeszły piątek(?=($|"|<))', "$1"+"w ùszłi piątk");
  d = r(d, '(^|="|>)w zeszłą sobotę(?=($|"|<))', "$1"+"w ùszłą sobòtã");
  d = r(d, '(^|="|>)w zeszłą niedzielę(?=($|"|<))', "$1"+"w ùszłą niedzelã");

  d = r(d, '(^|="|>)W zeszły poniedziałek(?=($|"|<))', "$1"+"w ùszłi pòniedzôłk");
  d = r(d, '(^|="|>)W zeszły wtorek(?=($|"|<))', "$1"+"w ùszłi wtórk");
  d = r(d, '(^|="|>)W zeszłą środę(?=($|"|<))', "$1"+"w ùszłą strzodã");
  d = r(d, '(^|="|>)W zeszły czwartek(?=($|"|<))', "$1"+"w ùszłi czwiôrtk");
  d = r(d, '(^|="|>)W zeszły piątek(?=($|"|<))', "$1"+"w ùszłi piątk");
  d = r(d, '(^|="|>)W zeszłą sobotę(?=($|"|<))', "$1"+"w ùszłą sobòtã");
  d = r(d, '(^|="|>)W zeszłą niedzielę(?=($|"|<))', "$1"+"w ùszłą niedzelã");

  d = r(d, '(^|="|>)Jutro o ([^<" ]+)(?=($|"|<))', "$1"+"Witro ò"+"$2");
  d = r(d, '(^|="|>)Wczoraj o ([^<" ]+)(?=($|"|<))', "$1"+"Wczora ò "+"$2");
  d = r(d, '(^|="|>)Poniedziałek\, ([0-9:apm]+)(?=($|"|<))', "$1"+"W pòniedzôłk ò "+"$2");
  d = r(d, '(^|="|>)Wtorek\, ([0-9:apm]+)(?=($|"|<))', "$1"+"We wtórk ò "+"$2");
  d = r(d, '(^|="|>)Środa\, ([0-9:apm]+)(?=($|"|<))', "$1"+"We strzodã ò "+"$2");
  d = r(d, '(^|="|>)Czwartek\, ([0-9:apm]+)(?=($|"|<))', "$1"+"We czwiôrtk ò "+"$2");
  d = r(d, '(^|="|>)Piątek\, ([0-9:apm]+)(?=($|"|<))', "$1"+"W piątk ò "+"$2");
  d = r(d, '(^|="|>)Sobota\, ([0-9:apm]+)(?=($|"|<))', "$1"+"W sobòtã ò "+"$2");
  d = r(d, '(^|="|>)Niedziela\, ([0-9:apm]+)(?=($|"|<))', "$1"+"W niedzelã ò "+"$2");

  d = r(d, '(^|="|>)ULUBIONE(?=($|"|<))', "$1"+"LUBÒTNÉ");
  d = r(d, '(^|="|>)GRUPY(?=($|"|<))', "$1"+"KARNA");
  d = r(d, '(^|="|>)STRONY(?=($|"|<))', "$1"+"STARNË");
  d = r(d, '(^|="|>)WIĘCEJ(?=($|"|<))', "$1"+"WICY");
  d = r(d, '(^|="|>)STRONY I REKLAMY(?=($|"|<))', "$1"+"STARNË Ë REKLAMË");
  d = r(d, '(^|="|>)ZNAJOMI(?=($|"|<))', "$1"+"DRËCHÒWIE");
  d = r(d, '(^|="|>)APLIKACJE(?=($|"|<))', "$1"+"APLIKACJE");
  d = r(d, '(^|="|>)NAJNOWSZY WPIS(?=($|"|<))', "$1"+"NÔNOWSZI WPISËNK");

  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1"+""+"$2"+", "+"$3"+" a téż "+"$4"+" ùwidzelë so to.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1"+""+"$2"+", "+"$3"+" ë "+"$4"+" ùwidzelë so to.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùwidzelë to so.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) go lubią\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùwidzelë gò so.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) ją lubią\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùwidzelë ją so.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) ich lubią\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùwidzelë jich so.");
  d = r(d, '(^|>)1 inny znajomy(?=($|<))', "$1"+"1 jinszi drëch");
  d = r(d, '(^|>)(1?1) innych znajomych(?=($|<))', "$1"+"$2"+" jinszich drëchów");
  d = r(d, '(^|>)(1?[2-4]) innych znajomych(?=($|<))', "$1"+"$2"+" jinszich drëchów");
  d = r(d, '(^|>)(1?[5-9]) innych znajomych(?=($|<))', "$1"+"$2"+" jinszich drëchów");
  d = r(d, '(^|>)([0-9,]+) innych znajomych(?=($|<))', "$1"+"$2"+" jinszich drëchów");
  d = r(d, '(^|>)1 inny(?=($|<))', "$1"+"1 jinszi");
  d = r(d, '(^|>)(1?1) innych(?=($|<))', "$1"+"$2"+" jinszich");
  d = r(d, '(^|>)(1?[2-4]) innych(?=($|<))', "$1"+"$2"+" jinszich");
  d = r(d, '(^|>)(1?[5-9]) innych(?=($|<))', "$1"+"$2"+" jinszich");
  d = r(d, '(^|>)([0-9,]+) innych(?=($|<))', "$1"+"$2"+" jinszich");
  d = r(d, '(^|>)(1?1) innych członków(?=($|<))', "$1"+"$2"+" jinëch nôleżników");
  d = r(d, '(^|>)(1?[2-4]) innych członków(?=($|<))', "$1"+"$2"+" jinëch nôleżników");
  d = r(d, '(^|>)(1?[5-9]) innych członków(?=($|<))', "$1"+"$2"+" jinëch nôleżników");
  d = r(d, '(^|>)([0-9,]+) innych członków(?=($|<))', "$1"+"$2"+" jinëch nôleżników");
  d = r(d, '(^|>)1 inna osoba(?=($|<))', "$1"+"1 jinszi człowiek");
  d = r(d, '(^|>)inna osoba \\((1?1)\\)(?=($|<))', "$1"+"$2"+" jinszi człowiek");
  d = r(d, '(^|>)inne osoby \\((1?[2-4])\\)(?=($|<))', "$1"+"$2"+" jinszi lëdze");
  d = r(d, '(^|>)inne osoby \\((1?[5-9])\\)(?=($|<))', "$1"+"$2"+" jinszich personów");
  d = r(d, '(^|>)inne osoby \\(([0-9,]+)\\)(?=($|<))', "$1"+"$2"+" jinëch lëdzy");
  d = r(d, '(^|>)1 (?=($|<))', "$1"+"1");
  d = r(d, '(^|>)(1?1) innych osób(?=($|<))', "$1"+"$2"+" jinszich lëdzy");
  d = r(d, '(^|>)(1?[2-4]) innych osób(?=($|<))', "$1"+"$2"+" jinszich lëdzy");
  d = r(d, '(^|>)(1?[5-9]) innych osób(?=($|<))', "$1"+"$2"+" jinszich lëdzy");
  d = r(d, '(^|>)([0-9,]+) innych osób(?=($|<))', "$1"+"$2"+" jinëch lëdzy");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcie\.(?=($|"|<))', "$1"+""+"$2"+" dodôł(ała) nowi òdjimk.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) (1?1) nowe zdjęcie\.(?=($|"|<))', "$1"+""+"$2"+" dodôł(ała) "+"$3"+" nowi òdjimk. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\((1?[2-4])\\)\.(?=($|"|<))', "$1"+""+"$2"+" dodôł(ała) "+"$3"+" nowé òdjimczi. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\((1?[5-9])\\)\.(?=($|"|<))', "$1"+""+"$2"+" dodôł(ała) "+"$3"+" nowëch òdjimków. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\(([0-9,]+)\\)\.(?=($|"|<))', "$1"+""+"$2"+" dodôł(ała) "+"$3"+" nowëch òdjimków. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował swoje zdjęcie w tle\.(?=($|"|<))', "$1"+""+"$2"+" zaktualizowôł swój òdjimk w pòlu. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizowała swoje zdjęcie w tle\.(?=($|"|<))', "$1"+""+"$2"+" zaktualizowa swój òdjimk w pòlu. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował\\(a\\) swoje zdjęcie w tle\.(?=($|"|<))', "$1"+""+"$2"+" zaktualizowôł(ała) swój òdjimk w pòlu. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" są terô drëchama.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi z (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" są terô drëchama z "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi\.(?=($|"|<))', "$1"+""+"$2"+", "+"$3"+" ë "+"$4"+" są terô drëchama.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) od\\: (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+""+"$2"+" òd: "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùwidzôł so "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" dodôł dopòwiesc "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" dodała dopòwiesc "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" dodôł(ała) dopòwiesc "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùwidzelë so "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùwidzelë so to.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùprzëstãpnilë(łë)"+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" i "+"$3"+" ùprzëstãpnilë "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępniły (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+""+"$2"+" i "+"$3"+" ùprzëstãpniłë "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił "+"$3"+"òdjimk"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpniła "+"$3"+"òdjimk"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił(a) "+"$3"+"òdjimk"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùprzëstãpnilë(łë) "+"$4"+"òdjimk"+"</a>"+" brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił "+"$3"+"wpisënk"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpniła "+"$3"+"wpisënk"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił(a) "+"$3"+"wpisënk"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùprzëstãpnilë(łë) "+"$4"+"wpisënk"+"</a>"+" brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił "+"$3"+"sztatus"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpniła "+"$3"+"sztatus"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił(a) "+"$3"+"sztatus"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùprzëstãpnilë(łë) "+"$4"+"sztatus"+"</a>"+" brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił "+"albùm"+"</a>"+" brëkòwnika "+"$3"+": "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpniła "+"albùm"+"</a>"+" brëkòwnika "+"$3"+": "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił(a) "+"albùm"+"</a>"+" brëkòwnika "+"$3"+": "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnilë(łë) "+"albùm"+"</a>"+" brëkòwnika "+"$3"+": "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił "+"$3"+"albùm"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpniła "+"$3"+"albùm"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił(a) "+"$3"+"albùm"+"</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" ùprzëstãpnilë(łë) "+"$4"+"albùm"+"</a>"+" brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił(a) "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpnił "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" ùprzëstãpniła "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) zmienili swoje zdjęcia profilowe\.(?=($|"|<))', "$1"+""+"$2"+" ë "+"$3"+" zmienilë swòje profilowé òdjimczi"+".");

  d = r(d, '(^|="|>) przez (?=($|"|<))', "$1"+" bez ");
  d = r(d, '(^|="|>) przez\\: (?=($|"|<))', "$1"+" bez ");
  d = r(d, '(^|="|>)telefon komórkowy(?=($|"|<))', "$1"+"móbilkã");
  d = r(d, '(^|="|>)Szukaj znajomych(?=($|"|<))', "$1"+"Wëzérôj za drëchama");
  d = r(d, '(^|="|>)Wiadomość(?=($|"|<))', "$1"+"Wiadło");
  d = r(d, '(^|="|>) dzisiaj obchodzi urodziny(?=($|"|<))', "$1"+" dzysô mô gebùrstach");
  d = r(d, '(^|="|>)Zobacz wszystkie komentarze \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Òbôcz wszëtczé "+"$2"+" dopòwiescë.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi to\\.(?=($|"|<))', "$1"+""+"$2"+" ùwidzôł so to.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią go\\.(?=($|"|<))', "$1"+"$2"+"ë"+"$3"+" ùwidzelë so gò.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi ich\/je\\.(?=($|"|<))', "$1"+""+"$2"+" ùwidzôł so jich(je).");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi ją\\.(?=($|"|<))', "$1"+""+"$2"+" ùwidzôł so ją.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" Wielena lëdzy, jaczima sã to ùwidzało.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" Wielena lëdzy, jaczima sã to ùwidzało.");
  d = r(d, '(^|="|>) \\· Osób\, które to lubią\\: ([0-9,]+)(?=($|"|<))', "$1"+" · "+"$2"+" lëdzy, jaczima sã to ùwidzało.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: ([0-9,]+).([0-9,]+)(?=($|"|<))', "$1"+"$2"+"."+"$3"+" Wielëna lëdzy, jaczima sã to ùwidzało.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: ([0-9,]+).([0-9,]+).([0-9,]+)(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" Wielëna lëdzy, jaczima sã to ùwidzało.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: ([0-9,]+).([0-9,]+)\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+" Wielëna lëdzy, jaczima sã to ùwidzało.");
  d = r(d, '(^|="|>)Liczba osób\, które to lubią\\: ([0-9,]+).([0-9,]+).([0-9,]+)\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" Wielëna lëdzy, jaczima sã to ùwidzało.");
  d = r(d, '(^|="|>)Liczba osób\, które ich lubią\\: ([0-9,]+).([0-9,]+)\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+" Wielëna lëdzy, jaczima sã òni ùwidzelë.");
  d = r(d, '(^|="|>)Liczba osób\, które ich lubią\\: ([0-9,]+).([0-9,]+).([0-9,]+)\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" Wielëna lëdzy, jaczima sã òni ùwidzelë.");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób go lubi\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+" lëdzy so gò ùwidzało.");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+).([0-9,]+) osób go lubi\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" lëdzy so gò ùwidzało.");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby go lubią\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+" lëdzy so gò ùwidzało.");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+).([0-9,]+) osoby go lubią\.(?=($|"|<))', "$1"+"$2"+"."+"$3"+"."+"$4"+" lëdzy so gò ùwidzało.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma nowych znajomych\\: (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mô nowëch drëchów: "+"$3"+" i "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ùwidzôł so: "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ùwidzôł so brëkòwnika "+"$3"+" ë "+"$4"+".");
  d = r(d, '(^|>)inne strony \\((1?1)\\)(?=($|<))', "$1"+"$2"+" jinszé starnë");
  d = r(d, '(^|>)inne strony \\((1?[2-4])\\)(?=($|<))', "$1"+"$2"+" jinszé starnë");
  d = r(d, '(^|>)inne strony \\((1?[5-9])\\)(?=($|<))', "$1"+"$2"+" jinszëch starnów");
  d = r(d, '(^|="|>)O czym teraz myślisz\\?(?=($|"|<))', "$1"+"Ò czim terô mëslisz?");
  d = r(d, '(^|="|>)Zdjęcie / film(?=($|"|<))', "$1"+"Òdjimk / film");
  d = r(d, '(^|="|>)Osoby\, które to lubią(?=($|"|<))', "$1"+"Lëdze, jaczima sã to ùwidzało.");
  d = r(d, '(^|="|>)Udostępniono ([0-9,]+) razy(?=($|"|<))', "$1"+"$2"+" lëdzy to ùprzëstãpniło");
  d = r(d, '(^|="|>)Dodaj komentarz\.\.\.(?=($|"|<))', "$1"+"Dodôj dopòwiesc...");
  d = r(d, '(^|="|>)([0-9,]+) wspólnych znajomych(?=($|"|<))', "$1"+"$2"+" pòspólnëch drëchów.");
  d = r(d, '(^|="|>)Zdjęcia na tablicy \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Òdjimczi na tôflë "+"("+"$2"+")");
  d = r(d, '(^|="|>)Zdjęcia profilowe \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Profilowé òdjimczi "+"("+"$2"+")");
  d = r(d, '(^|="|>)Zdjęcia w tle \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Òdjimczi w pòlu "+"("+"$2"+")");
  d = r(d, '(^|="|>)Ty to lubisz\.(?=($|"|<))', "$1"+"Widzy cë sã to.");
  d = r(d, '(^|="|>)1 wspólny znajomy(?=($|"|<))', "$1"+"1 pòspólny drëch");
  d = r(d, '(^|="|>)Bliscy znajomi(?=($|"|<))', "$1"+"Bëlny drëchòwie");
  d = r(d, '(^|="|>)Uczęszczał do\\: (?=($|"|<))', "$1"+"Ùcził sã w: ");
  d = r(d, '(^|="|>)Uczęszczała do\\: (?=($|"|<))', "$1"+"Ùcza sã w: ");
  d = r(d, '(^|="|>)Uczęszczał\\(a\\) do\\: (?=($|"|<))', "$1"+"Ùcził(a) sã w: ");
  d = r(d, '(^|="|>)Pracował\\(a\\) w (?=($|"|<))', "$1"+"Robił(a) w ");
  d = r(d, '(^|="|>)Pracowała w (?=($|"|<))', "$1"+"Robia w ");
  d = r(d, '(^|="|>)Pracował w (?=($|"|<))', "$1"+"Robił w ");
  d = r(d, '(^|="|>)Utwórz reklamę(?=($|"|<))', "$1"+"Ùsadzë reklamã");
  d = r(d, '(^|="|>)Udostępniono 1 raz(?=($|"|<))', "$1"+"1 człowiek mô to ùprzëstãpnioné.");
  d = r(d, '(^|="|>)Utwórz stronę(?=($|"|<))', "$1"+"Ùsadzë starnã");
  d = r(d, '(^|="|>)Zbierz publiczność(?=($|"|<))', "$1"+"Pòzbiérôj pùblikã");
  d = r(d, '(^|="|>)Pokaż wszystko(?=($|"|<))', "$1"+"Pòkôżë wszëtkò");
  d = r(d, '(^|="|>)Panel administratora(?=($|"|<))', "$1"+"Sprôwianié starnë");
  d = r(d, '(^|="|>)Powiadomienia(?=($|"|<))', "$1"+"Wiadła");
  d = r(d, '(^|="|>)Filozofia(?=($|"|<))', "$1"+"Filozofiô");
  d = r(d, '(^|="|>)Pokaż post(?=($|"|<))', "$1"+"Pòkôżë wpisënk");
  d = r(d, '(^|="|>)Nie lubię(?=($|"|<))', "$1"+"Nie widzy mie sã");
  d = r(d, '(^|="|>)Praca(?=($|"|<))', "$1"+"Robòta");
  d = r(d, '(^|="|>)Reklama(?=($|"|<))', "$1"+"Reklama");
  d = r(d, '(^|="|>)Pytanie(?=($|"|<))', "$1"+"Pëtanié");
  d = r(d, '(^|="|>)Twórcy aplikacji(?=($|"|<))', "$1"+"Ùsôdzcowie aplikacje");
  d = r(d, '(^|="|>)Rodzina(?=($|"|<))', "$1"+"Rodzëzna");
  d = r(d, '(^|="|>)Lubię to!(?=($|"|<))', "$1"+"Widzy mie sã!");
  d = r(d, '(^|="|>)Lubię tę stronę!(?=($|"|<))', "$1"+"Widzy mie sã ta starna!");
  d = r(d, '(^|="|>)Znajdź więcej stron(?=($|"|<))', "$1"+"Nalézë wicy starnów");
  d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1"+"Wiadła");
  d = r(d, '(^|="|>)Polski(?=($|"|<))', "$1"+"Kaszëbsczi");
  d = r(d, '(^|="|>)Wydarzenie z życia(?=($|"|<))', "$1"+"Wëdarzenié z żëcégò");
  d = r(d, '(^|="|>)Aktualności(?=($|"|<))', "$1"+"Nowinë");
  d = r(d, '(^|="|>)Profil(?=($|"|<))', "$1"+"Profil");
  d = r(d, '(^|="|>)Dodaj komentarz(?=($|"|<))', "$1"+"Dodôj dopòwiesc");
  d = r(d, '(^|="|>)Oś czasu(?=($|"|<))', "$1"+"Czasowô òs");
  d = r(d, '(^|="|>)Prywatność(?=($|"|<))', "$1"+"Swòjizna");
  d = r(d, '(^|="|>)Kliknięcia Lubię to!(?=($|"|<))', "$1"+"Knypsniãca Widzy mie sã!");
  d = r(d, '(^|="|>)Mapa(?=($|"|<))', "$1"+"Kôrta");
  d = r(d, '(^|="|>)Anuluj(?=($|"|<))', "$1"+"Anulujë");
  d = r(d, '(^|="|>)Wydarzenia(?=($|"|<))', "$1"+"Rozegracje");
  d = r(d, '(^|="|>)Wyloguj się(?=($|"|<))', "$1"+"Wëlogùjë sã");
  d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1"+"Òdjimczi");
  d = r(d, '(^|="|>)Regulamin(?=($|"|<))', "$1"+"Réglë");
  d = r(d, '(^|="|>)Znajomi(?=($|"|<))', "$1"+"Drëchòwie");
  d = r(d, '(^|="|>)O Facebooku(?=($|"|<))', "$1"+"Ò Facebookù");
  d = r(d, '(^|="|>)Więcej(?=($|"|<))', "$1"+"Wicy");
  d = r(d, '(^|="|>)Status(?=($|"|<))', "$1"+"Sztatus");
  d = r(d, '(^|="|>)przez\\:(?=($|"|<))', "$1"+"bez:");
  d = r(d, '(^|="|>)Zdjęcie(?=($|"|<))', "$1"+"Òdjimk");
  d = r(d, '(^|="|>)Miejsca(?=($|"|<))', "$1"+"Môle");
  d = r(d, '(^|="|>)Udostępnij(?=($|"|<))', "$1"+"Ùprzëstãpni");
  d = r(d, '(^|="|>)Albumy(?=($|"|<))', "$1"+"Albùmë");
  d = r(d, '(^|="|>)Zobacz wszystko(?=($|"|<))', "$1"+"Ùzdrzi wszëtkò");
  d = r(d, '(^|="|>)Zobacz znajomość(?=($|"|<))', "$1"+"Ùzdrzi drëszbã");
  d = r(d, '(^|="|>)Zamknij(?=($|"|<))', "$1"+"Zamkni");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pòmòc");
  d = r(d, '(^|="|>)Miejsce(?=($|"|<))', "$1"+"Môl");
  d = r(d, '(^|="|>)Szukaj(?=($|"|<))', "$1"+"Szëkôj");
  d = r(d, '(^|="|>)Aplikacje(?=($|"|<))', "$1"+"APLIKACJE");
  d = r(d, '(^|="|>)Strona główna(?=($|"|<))', "$1"+"Przédnô starna");
  d = r(d, '(^|="|>)Teraz(?=($|"|<))', "$1"+"Terô");
  d = r(d, '(^|="|>)Wyślij(?=($|"|<))', "$1"+"Wëslë");
  d = r(d, '(^|="|>)Do:(?=($|"|<))', "$1"+"Do:");
  d = r(d, '(^|="|>)Wyszukaj osoby, miejsca i inne(?=($|"|<))', "$1"+"Nalézë lëdzy, môle ë jinszé");
  d = r(d, '(^|="|>)Przejdź do trybu offline(?=($|"|<))', "$1"+"Mdzë offline");
  d = r(d, '(^|="|>)Pokaż wszystkie(?=($|"|<))', "$1"+"Pòkôżë wszëtczé");
  d = r(d, '(^|="|>)Dodaj do tej listy(?=($|"|<))', "$1"+"Dodôj do ti lëstë");
  d = r(d, '(^|="|>)Ukryj(?=($|"|<))', "$1"+"Schòwôj");
  d = r(d, '(^|="|>)Ostatnie posty innych użytkowników na stronie(?=($|"|<))', "$1"+"Slédné wpisënczi jinszich brëkòwników na starnie");
  d = r(d, '(^|="|>)Napisz komentarz...(?=($|"|<))', "$1"+"Dodôj dopòwiesc...");
  d = r(d, '(^|="|>)Odpowiedz(?=($|"|<))', "$1"+"Òdpòwiedz");
  d = r(d, '(^|="|>)Pliki cookie(?=($|"|<))', "$1"+"Zbiorë cookie");
  d = r(d, '(^|="|>)Udostępnione dla:(?=($|"|<))', "$1"+"Ùprzëstãpni dlô:");
  d = r(d, '(^|="|>)Tryb szybkiej odpowiedzi: naciśnij Enter, aby wysłać(?=($|"|<))', "$1"+"Trib chùtczégò pisaniégò. Knypsni Enter, cobë òdpòwiedzec");
  d = r(d, '(^|="|>)Wykonaj zdjęcie lub nagraj film(?=($|"|<))', "$1"+"Zrobi òdjimk abò nakrącë film");
  d = r(d, '(^|="|>)Dołącz plik(?=($|"|<))', "$1"+"Dołączë zbiér");
  d = r(d, '(^|="|>)Osoby\\, które możesz znać(?=($|"|<))', "$1"+"Lëdze, jaczich mòżesz znac");
  d = r(d, '(^|="|>)Zdjęcia znajomych(?=($|"|<))', "$1"+"Òdjimczi drëchów");
  d = r(d, '(^|="|>)Wyszukaj w konwersacji(?=($|"|<))', "$1"+"Nalézë w kôrbiónce");
  d = r(d, '(^|="|>)Działania(?=($|"|<))', "$1"+"Dzejanié");
  d = r(d, '(^|="|>)Oznacz jako nieprzeczytane(?=($|"|<))', "$1"+"Òznaczë jakno nieprzeczëtóné");
  d = r(d, '(^|="|>)Prześlij...(?=($|"|<))', "$1"+"Przekażë...");
  d = r(d, '(^|="|>)Otwórz w czacie(?=($|"|<))', "$1"+"Òdemkni w kôrbiónce");
  d = r(d, '(^|="|>)Usuń wiadomości...(?=($|"|<))', "$1"+"Wëwalë wiadła...");
  d = r(d, '(^|="|>)Zgłoś jako spam...(?=($|"|<))', "$1"+"Òznaczë jakno spam...");
  d = r(d, '(^|="|>)Zgłoś konwersację...(?=($|"|<))', "$1"+"Zgłoszë kôrbiónkã...");
  d = r(d, '(^|="|>)Przenieś do folderu „Inne”(?=($|"|<))', "$1"+"Przeniesë w môl „Jinszé”");
  d = r(d, '(^|="|>)Korzystaj z Facebooka w innym języku.(?=($|"|<))', "$1"+"Przëłączë Facebooka na jinszi jãzëk.");
  d = r(d, '(^|="|>)Oznaczeni — (?=($|"|<))', "$1"+"Òznaczony — ");
  d = r(d, '(^|="|>)Ładowanie...(?=($|"|<))', "$1"+"Ladowanié...");
  d = r(d, '(^|="|>)Polish(?=($|"|<))', "$1"+"Kashubian");
  d = r(d, '(^|="|>)Wydarzenie, ważne wydarzenie \\+(?=($|"|<))', "$1"+"Rozegracjô, wôżnô rozegracjô");
  d = r(d, '(^|="|>)SORTUJ: OD NAJNOWSZYCH(?=($|"|<))', "$1"+"ÙŁOŻË: ÒD NÔNOWSZICH");
  d = r(d, '(^|="|>)Najnowsze(?=($|"|<))', "$1"+"Nônowszé");
  d = r(d, '(^|="|>)Najciekawsze zdarzenia(?=($|"|<))', "$1"+"Nôczekawszé wiadła");
  d = r(d, '(^|="|>)lubią to.(?=($|"|<))', "$1"+"widzy sã jima to.");
  d = r(d, '(^|="|>)Powrót do albumu(?=($|"|<))', "$1"+"Copni sã do albùmù");
  d = r(d, '(^|="|>)Dodaj znajomego(?=($|"|<))', "$1"+"Dodôj drëcha");
  d = r(d, '(^|="|>)Zobacz tłumaczenie(?=($|"|<))', "$1"+"Òbaczë dolmaczënk");
  d = r(d, '(^|="|>)Autor\\: (?=($|"|<))', "$1"+"Ùsôdzca: ");
  d = r(d, '(^|="|>)Aplikacje i gry(?=($|"|<))', "$1"+"Aplikacje ë jigrë");
  d = r(d, '(^|="|>)Moje albumy(?=($|"|<))', "$1"+"Mòje albùmë");
  d = r(d, '(^|="|>)Dodaj zdjęcia(?=($|"|<))', "$1"+"Dodôj òdjimczi");
  d = r(d, '(^|="|>)Dodaj film(?=($|"|<))', "$1"+"Dodôj film");
  d = r(d, '(^|="|>)Korzystaj z Facebooka jako:(?=($|"|<))', "$1"+"Zwëskiwôj z Facebooka jakno:");
  d = r(d, '(^|="|>)Reklamuj się(?=($|"|<))', "$1"+"Reklamùjë sã");
  d = r(d, '(^|="|>)Ustawienia konta(?=($|"|<))', "$1"+"Ùstawienia kònta");
  d = r(d, '(^|="|>)Ustawienia prywatności(?=($|"|<))', "$1"+"Ùstawienia swòjiznë");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pòmòc");
  d = r(d, '(^|="|>)Zarządzaj listą(?=($|"|<))', "$1"+"Ùłożë lëstã");
  d = r(d, '(^|="|>)Zmień nazwę listy(?=($|"|<))', "$1"+"Zmieni pòzwã lëstë");
  d = r(d, '(^|="|>)Edytuj listę(?=($|"|<))', "$1"+"Editëjë lëstã");
  d = r(d, '(^|="|>)Wybierz typy informacji...(?=($|"|<))', "$1"+"Wëbierzë zortë wiadłów...");
  d = r(d, '(^|="|>)Ustawienia powiadomień...(?=($|"|<))', "$1"+"Ùstawienia wiadłów...");
  d = r(d, '(^|="|>)Usuń listę(?=($|"|<))', "$1"+"Wëwalë lëstã");
  d = r(d, '(^|="|>)Pokaż wszystkich(?=($|"|<))', "$1"+"Pòkażë wszëtczich");
  d = r(d, '(^|="|>)Proponowane osoby(?=($|"|<))', "$1"+"Bédowóny lëdze");
  d = r(d, '(^|="|>)Na tej liście (?=($|"|<))', "$1"+"Na ny lësce ");
  d = r(d, '(^|="|>)Pokaż więcej sugestii(?=($|"|<))', "$1"+"Wëskrzeni wicy bédënków");
  d = r(d, '(^|="|>)Dodaj(?=($|"|<))', "$1"+"Dodôj");
  d = r(d, '(^|="|>)Obecnie jesteś offline. Aby czatować ze znajomym, (?=($|"|<))', "$1"+"Prawie jes offline, cobë pòkôrbic z drëchama ");
  d = r(d, '(^|="|>)przejdź do trybu online(?=($|"|<))', "$1"+"òdemkni trib online");
  d = r(d, '(^|="|>)Moje zdjęcia(?=($|"|<))', "$1"+"Mòje òdjimczi");
  d = r(d, '(^|="|>)Dalej(?=($|"|<))', "$1"+"Dali");
  d = r(d, '(^|="|>)Poprzednia(?=($|"|<))', "$1"+"Nazôd");
  d = r(d, '(^|="|>)Zdjęcia na tablicy(?=($|"|<))', "$1"+"Òdjimczi na tôflë");
  d = r(d, '(^|="|>)Oznacz zdjęcie(?=($|"|<))', "$1"+"Òznaczë òdjimk");
  d = r(d, '(^|="|>)Album(?=($|"|<))', "$1"+"Albùm");
  d = r(d, '(^|="|>)Tablica(?=($|"|<))', "$1"+"Tôfla");
  d = r(d, '(^|="|>)Informacje(?=($|"|<))', "$1"+"Wiadła");
  d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1"+"Òdjimczi");
  d = r(d, '(^|="|>)Żonaty(?=($|"|<))', "$1"+"Chłop");
  d = r(d, '(^|="|>)Czat \\(Offline\\)(?=($|"|<))', "$1"+"Kôrbiónka (offline)");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"pòwrózk");
  d = r(d, '(^|>)zdjęcie(?=($|<))', "$1"+"òdjimk");
  d = r(d, '(^|>)status(?=($|<))', "$1"+"sztatus");
  d = r(d, '(^|="|>)Sponsorowane(?=($|"|<))', "$1"+"Spònsorowóné");
  d = r(d, '(^|="|>)Zaproszenia do grona znajomych(?=($|"|<))', "$1"+"Rôczbë do karna drëchów");
  d = r(d, '(^|="|>)Brak nowych zaproszeń\\.(?=($|"|<))', "$1"+"Felô nowëch rôczbów.");
  d = r(d, '(^|="|>)Zobacz wszystkie zaproszenia od znajomych(?=($|"|<))', "$1"+"Òbaczë wszëtczé rôczbë òd drëchów");
  d = r(d, '(^|="|>)Nie masz już aktywnych zaproszeń\\.(?=($|"|<))', "$1"+"Ni môsz ju wicy rôczbów.");
  d = r(d, '(^|="|>)Znajdź więcej znajomych(?=($|"|<))', "$1"+"Nalézë wicy drëchów");
  d = r(d, '(^|="|>)Wyślij nową wiadomość(?=($|"|<))', "$1"+"Wëslë nowé wiadło");
  d = r(d, '(^|="|>)Zobacz wszystkie wiadomości(?=($|"|<))', "$1"+"Òbaczë wszëtczé wiadła");
  d = r(d, '(^|="|>)Zobacz wszystkie powiadomienia(?=($|"|<))', "$1"+"Òbaczë wszëtczé wiadła");
  d = r(d, '(^|="|>)Nowa wiadomość(?=($|"|<))', "$1"+"Nowé wiadło");
  d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1"+"Wiadła");
  d = r(d, '(^|="|>)Utwórz grupę\.\.\.(?=($|"|<))', "$1"+"Òdemkni karno...");
  d = r(d, '(^|="|>)Wyszukaj\\:(?=($|"|<))', "$1"+"Nalézë:");
  d = r(d, '(^|="|>)Nieprzeczytane wiadomości(?=($|"|<))', "$1"+"Nieprzeczëtóné wiadła");
  d = r(d, '(^|="|>)Zarchiwizowane wiadomości(?=($|"|<))', "$1"+"Zarchiwizowóné wiadła");
  d = r(d, '(^|="|>)Tylko za pośrednictwem poczty e-mail(?=($|"|<))', "$1"+"Leno za pòstrzédnictwã mejlkéstë");
  d = r(d, '(^|="|>)Wysłane wiadomości(?=($|"|<))', "$1"+"Wësłóné wiadła");
  d = r(d, '(^|="|>)Brak wiadomości(?=($|"|<))', "$1"+"Felô wiadłów");
  d = r(d, '(^|="|>)Usuń(?=($|"|<))', "$1"+"Wëwalë");
  d = r(d, '(^|="|>) także lubi to\.(?=($|"|<))', "$1"+" téż mù(ji) sã widzy.");
  d = r(d, '(^|="|>)Oznacz jako nieprzeczytane(?=($|"|<))', "$1"+"Òznaczë jakno nieprzeczëtóné");
  d = r(d, '(^|="|>)Oznacz jako przeczytane(?=($|"|<))', "$1"+"Òznaczë jakno przeczëtóné");
  d = r(d, '(^|="|>)Zarchiwizuj(?=($|"|<))', "$1"+"Przeniesë do archiwùm");
  d = r(d, '(^|="|>)Szukaj wiadomości(?=($|"|<))', "$1"+"Nalézë wiadła");
  d = r(d, '(^|="|>)Wyślij wiadomość(?=($|"|<))', "$1"+"Wëslë wiadło");
  d = r(d, '(^|="|>)Inne(?=($|"|<))', "$1"+"Jinszé");
  d = r(d, '(^|="|>)Nieprzeczytane(?=($|"|<))', "$1"+"Nieprzeczëtóné");
  d = r(d, '(^|="|>)Zarchiwizowane(?=($|"|<))', "$1"+"W archiwùm");
  d = r(d, '(^|="|>)Zobacz\\:(?=($|"|<))', "$1"+"Òbaczë:");
  d = r(d, '(^|="|>)Załaduj starsze wątki(?=($|"|<))', "$1"+"Wëskrzëni pòstãpné wątczi");
  d = r(d, '(^|="|>)Polecane strony(?=($|"|<))', "$1"+"Bédowóné starnë");
  d = r(d, '(^|="|>)Strony i reklamy(?=($|"|<))', "$1"+"Starnë ë reklamë");
  d = r(d, '(^|="|>)Proponowane grupy(?=($|"|<))', "$1"+"Bédowóné karna");
  d = r(d, '(^|="|>)Polub tę stronę(?=($|"|<))', "$1"+"Ùwidzë so nã starnã");
  d = r(d, '(^|="|>)Utwórz wydarzenie(?=($|"|<))', "$1"+"Òdemkni rozegracjã");
  d = r(d, '(^|="|>)Pokaż wcześniejsze komentarze(?=($|"|<))', "$1"+"Wëskrzeni rëchlészé dopòwiescë");
  d = r(d, '(^|="|>)Lubisz to\\!(?=($|"|<))', "$1"+"Widzy cë sã!");
  d = r(d, '(^|="|>)Pokaż udostępnioną zawartość(?=($|"|<))', "$1"+"Wëskrzëni ùprzëstãpnioną zamkłosc");
  d = r(d, '(^|="|>)Dołącz do grupy(?=($|"|<))', "$1"+"Zrzeszë sã z karnã");
  d = r(d, '(^|="|>)Kliknięcia \\„Lubię to\\”(?=($|"|<))', "$1"+"Knypsniãca Widzy mie sã");
  d = r(d, '(^|="|>)Narodziny(?=($|"|<))', "$1"+"Ùrodzëznë");
  d = r(d, '(^|="|>)LISTY(?=($|"|<))', "$1"+"LËSTË");
  d = r(d, '(^|="|>)Zmień zdjęcie w tle(?=($|"|<))', "$1"+"Zmieni òdjimk w pòlu");
  d = r(d, '(^|="|>)Edytuj zdjęcie profilowe(?=($|"|<))', "$1"+"Editëjë profilowi òdjimk");
  d = r(d, '(^|="|>)Subskrypcje(?=($|"|<))', "$1"+"Subskripcje");
  d = r(d, '(^|="|>)Zaktualizuj informacje(?=($|"|<))', "$1"+"Òdnowi wiadła");
  d = r(d, '(^|="|>)Dziennik aktywności(?=($|"|<))', "$1"+"Dzénnik aktiwnotë");
  d = r(d, '(^|="|>)Wyświetl jako\.\.\.(?=($|"|<))', "$1"+"Pòkażë jakno...");
  d = r(d, '(^|="|>)Dodaj wizytówkę do swojej strony(?=($|"|<))', "$1"+"Dodôj wizytkôrta do swòji starnë");
  d = r(d, '(^|="|>)Opublikuj(?=($|"|<))', "$1"+"Ùprzëstãpni");
  d = r(d, '(^|="|>)Prześlij zdjęcie / film(?=($|"|<))', "$1"+"Przeslë òdjimk");
  d = r(d, '(^|="|>)Skorzystaj z kamery internetowej(?=($|"|<))', "$1"+"Zwëskôj z jinternetowi kamérë");
  d = r(d, '(^|="|>)Utwórz album ze zdjęciami(?=($|"|<))', "$1"+"Zrobi albùm z òdjimkama");
  d = r(d, '(^|="|>)Zapytaj o coś\.\.\.(?=($|"|<))', "$1"+"Spëtôj ò cos...");
  d = r(d, '(^|="|>)Dodaj opcję\.\.\.(?=($|"|<))', "$1"+"Dodôj òptacjã");
  d = r(d, '(^|="|>)Dodaj opcje ankiety(?=($|"|<))', "$1"+"Dodôj òptacjã ankétë");
  d = r(d, '(^|="|>)Zezwalaj wszystkim na dodawanie opcji(?=($|"|<))', "$1"+"Pòzwòlë jinszim na dodôwanié òptacjów");
  d = r(d, '(^|="|>)Tylko ja(?=($|"|<))', "$1"+"Leno jô");
  d = r(d, '(^|="|>)Znajomi poza dalszymi znajomymi(?=($|"|<))', "$1"+"Drëchòwie òkróm dalszich drëchów");
  d = r(d, '(^|="|>)Ustawienie niestandardowe(?=($|"|<))', "$1"+"Niesztandardowé ùstawienia");
  d = r(d, '(^|="|>)Wróć(?=($|"|<))', "$1"+"Copni sã");
  d = r(d, '(^|="|>)Dalsi znajomi(?=($|"|<))', "$1"+"Dalszi drëchòwie");
  d = r(d, '(^|="|>) w pobliżu\\: (?=($|"|<))', "$1"+" kòl ");
  d = r(d, '(^|="|>)Ulubione(?=($|"|<))', "$1"+"Lubòtné");
  d = r(d, '(^|="|>)Niedawne(?=($|"|<))', "$1"+"Slédné");
  d = r(d, '(^|="|>)Dołącz(?=($|"|<))', "$1"+"Przëstąpi");
  d = r(d, '(^|="|>)Więcej ostatniej aktywności(?=($|"|<))', "$1"+"Wicy slédny aktiwnoscë");
  d = r(d, '(^|="|>)Zobacz wszystkie listy\.\.\.(?=($|"|<))', "$1"+"Òbaczë wszëtczé lëstë...");
  d = r(d, '(^|="|>)Zobacz wszystkie(?=($|"|<))', "$1"+"Òbaczë wszëtczé");
  d = r(d, '(^|>) \\(([0-9,]+) zdjęcie\\)(?=($|<))', "$1"+" ("+"$2"+" òdjimk)");
  d = r(d, '(^|>) \\(([0-9,]+) zdjęcia\\)(?=($|<))', "$1"+" ("+"$2"+" òdjimczi)");
  d = r(d, '(^|>) \\(([0-9,]+) zdjęć\\)(?=($|<))', "$1"+" ("+"$2"+" òdjimków)");
  d = r(d, '(^|>) \\(([0-9,]+) zdjęć\\)(?=($|<))', "$1"+" ("+"$2"+" òdjimków)");
  d = r(d, '(^|="|>)([0-9,]+) osób lubi to(?=($|"|<))', "$1"+""+"$2"+" lëdzóm widzy sã to");
  d = r(d, '(^|="|>)([0-9,]+) osoby lubią to(?=($|"|<))', "$1"+""+"$2"+" lëdzóm widzy sã to");
  d = r(d, '(^|="|>)([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+""+"$2"+" lëdzy ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+""+"$2"+" lëdzë ò tim gôdają");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+""+"$2"+" lëdzóm to sã widzy, a "+"$3"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+""+"$2"+" lëdzóm to sã widzy, a "+"$3"+"."+"$4"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+).([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+"."+"$5"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+"."+"$5"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+"."+"$5"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+"."+"$5"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+" ò tim gôdô");
  d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1"+""+"$2"+"."+"$3"+" lëdzóm to sã widzy, a "+"$4"+" ò tim gôdô");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" je na òdjimkù brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" je na òdjimkù brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" je na òdjimkù brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1"+""+"$2"+" je na "+"$3"+" òdjimkù</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1"+""+"$2"+" je na "+"$3"+" òdjimkù</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1"+""+"$2"+" je na "+"$3"+" òdjimkù</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" je na "+"$3"+" òdjimkù</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" je na "+"$3"+" òdjimkù</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" je na "+"$3"+" òdjimkù</a>"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony w albumie (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" je na òdjimkach w albùmie "+"$3"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona w albumie (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+""+"$2"+" je na òdjimkach w albùmie "+"$3"+" brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>) \\— z użytkownikiem (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" z brëkòwnikã "+"$2"+".");
  d = r(d, '(^|="|>) \\— z użytkownikiem (<a [^>]+>[^<]+</a>) w miejscu (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" z brëkòwnikã "+"$2"+" w môlu "+"$3"+".");
  d = r(d, '(^|="|>)Twoja bliska rodzina lub rodzina wielopokoleniowa\. (?=($|"|<))', "$1"+"Twòjô krótkò rodzëzna, abò wielepòkòleniowô familiô. ");
  d = r(d, '(^|="|>)Dowiedz się więcej(?=($|"|<))', "$1"+"Doznôj sã wicy");
  d = r(d, '(^|="|>)Na tej liście \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"Na ny lësce"+" ($2)");
  d = r(d, '(^|="|>)Dodaj krewnych do tej listy(?=($|"|<))', "$1"+"Dodôj familiã do ny lëstë");
  d = r(d, '(^|="|>)Najbliżsi znajomi, o których chcesz widzieć więcej informacji\. (?=($|"|<))', "$1"+"Nôbëlniészi drëchòwie, ò jaczich chcesz widzec wicy wiadłów. ");
  d = r(d, '(^|="|>)Pokaż sugestie znajomych dla listy\.(?=($|"|<))', "$1"+"Wëskrzëni bédënczi drëchów dlô lëstë.");
  d = r(d, '(^|="|>)Strony polecane(?=($|"|<))', "$1"+"Bédowóné starnë");
  d = r(d, '(^|="|>)Ukryj propozycje(?=($|"|<))', "$1"+"Wëwalë bédënczi");
  d = r(d, '(^|="|>)Proponowane osoby(?=($|"|<))', "$1"+"Bédowóny lëdze");
  d = r(d, '(^|="|>)Album\\:(?=($|"|<))', "$1"+" Albùm:");
  d = r(d, '(^|="|>)Dodaj znacznik do zdjęcia(?=($|"|<))', "$1"+"Òznaczë òdjimk");
  d = r(d, '(^|="|>)Dodaj lokalizację(?=($|"|<))', "$1"+"Dodôj môl, w jaczim béł zrobiony òdjimk");
  d = r(d, '(^|="|>)Zakończono oznaczanie(?=($|"|<))', "$1"+"Òznôczanié skùńczoné");
  d = r(d, '(^|="|>)Gdzie zostało zrobione to zdjęcie\\?(?=($|"|<))', "$1"+"Dze béł zrobiony nen òdjimk?");
  d = r(d, '(^|="|>)Kliknij zdjęcie, aby zacząć oznaczanie(?=($|"|<))', "$1"+"Knypsni w òdjimk, cobë òznaczëc drëchów");
  d = r(d, '(^|="|>)Pobierz(?=($|"|<))', "$1"+"Scygni");
  d = r(d, '(^|="|>)Zgłoś to zdjęcie(?=($|"|<))', "$1"+"Zgłoszë nen òdjimk");
  d = r(d, '(^|="|>)([0-9,]+) znajomych(?=($|"|<))', "$1"+""+"$2"+" drëchów");
  d = r(d, '(^|="|>) lubi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" ùwidzôł so "+"$2"+".");
  d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" ùprzëstãpnił "+"$2"+".");
  d = r(d, '(^|="|>) udostępnił (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" ùprzëstãpnił(a) "+"$2"+" brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" ùprzëstãpnił "+"$2"+" brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>) udostępniła (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" ùprzëstãpniła "+"$2"+" brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>) skomentował\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" dodôł dopòwiesc "+"$2"+".");
  d = r(d, '(^|="|>) skomentowała\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" dodała dopòwiesc "+"$2"+".");
  d = r(d, '(^|="|>) odpowiedział\\(a\\) na pytanie\.(?=($|"|<))', "$1"+" òdpòwiedzôł(ała) na pëtanié.");
  d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>) dzięki użytkownikowi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" ùprzëstãpnił "+"$2"+" dzãka brëkòwnikòwi "+"$3"+".");
  d = r(d, '(^|="|>) dołączył do grona znajomych użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" zrzësził sã z karnã drëchów brëkòwnika "+"$2"+".");
  d = r(d, '(^|="|>) dołączyła do grona znajomych użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" zrzësza sã z karnã drëchów brëkòwnika "+"$2"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował swoje  (<a [^>]+>)zdjęcie w tle</a>\.(?=($|"|<))', "$1"+""+"$2"+" zaktualizowôł swój òdjimk w pòlu. ");
  d = r(d, '(^|="|>)Pliki(?=($|"|<))', "$1"+"Zbiérë");
  d = r(d, '(^|="|>)Dodaj plik(?=($|"|<))', "$1"+"Dodôj zbiér");
  d = r(d, '(^|="|>)Przestań obserwować post(?=($|"|<))', "$1"+"Nie sledzë wpisënkù ");
  d = r(d, '(^|="|>)Napisz coś\.\.\.(?=($|"|<))', "$1"+"Napiszë cos...");
  d = r(d, '(^|="|>)Studiował w\\: (?=($|"|<))', "$1"+"Sztudérowôł w: ");
  d = r(d, '(^|="|>)Mieszka w\\: (?=($|"|<))', "$1"+"Mieszkô w: ");
  d = r(d, '(^|="|>)Mieszka w\\:(?=($|"|<))', "$1"+"Mieszkô w:");
  d = r(d, '(^|="|>)Strony(?=($|"|<))', "$1"+"Starnë");
  d = r(d, '(^|="|>)Ulubione cytaty(?=($|"|<))', "$1"+"Lubòtné wëjimczi");
  d = r(d, '(^|="|>)Dodaj ulubiony cytat(?=($|"|<))', "$1"+"Dodôj lubòtny wëjimk");
  d = r(d, '(^|="|>)Telefony komórkowe(?=($|"|<))', "$1"+"Móbilczi");
  d = r(d, '(^|="|>)Dane kontaktowe(?=($|"|<))', "$1"+"Sparłãczenié");
  d = r(d, '(^|="|>)Języki(?=($|"|<))', "$1"+"Jãzëczi");
  d = r(d, '(^|="|>)Data urodzenia(?=($|"|<))', "$1"+"Dzéń ùrodzeniégò");
  d = r(d, '(^|="|>)Status związku(?=($|"|<))', "$1"+"Sztatut");
  d = r(d, '(^|="|>)W związku(?=($|"|<))', "$1"+"Je z kògùms");
  d = r(d, '(^|="|>)Podstawowe informacje(?=($|"|<))', "$1"+"Spòdleczné wiadła");
  d = r(d, '(^|="|>)Informacje o Tobie(?=($|"|<))', "$1"+"Pôrã słowów ò Tobie");
  d = r(d, '(^|="|>)Napisz o sobie(?=($|"|<))', "$1"+"Napiszë ò se cos");
  d = r(d, '(^|="|>)Kobieta(?=($|"|<))', "$1"+"Białka");
  d = r(d, '(^|="|>)Mężczyzna(?=($|"|<))', "$1"+"Chłop");
  d = r(d, '(^|="|>)Miejsce zamieszkania(?=($|"|<))', "$1"+"Môl mieszkaniégò");
  d = r(d, '(^|="|>)Miasto rodzinne(?=($|"|<))', "$1"+"Familiowi gard");
  d = r(d, '(^|="|>)Historia \\(wg lat\\)(?=($|"|<))', "$1"+"Historiô pòdług latów");
  d = r(d, '(^|="|>)Wykształcenie i praca(?=($|"|<))', "$1"+"Wësztôłcenié ë robòta");
  d = r(d, '(^|="|>)Obserwuj post(?=($|"|<))', "$1"+"Sledzë wpisënk");
  d = r(d, '(^|="|>)Odwiedzenie ([0-9,]+) miejsc(?=($|"|<))', "$1"+"Réza do "+"$2"+" môlów");
  d = r(d, '(^|="|>)([0-9,]+) zdjęcia(?=($|"|<))', "$1"+"$2"+" òdjimczi");
  d = r(d, '(^|="|>)([0-9,]+) zdjęć(?=($|"|<))', "$1"+"$2"+" òdjimków");
  d = r(d, '(^|="|>)([0-9,]+) zdjęcie(?=($|"|<))', "$1"+"$2"+" òdjimk");
  d = r(d, '(^|="|>) był\\(a\\) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" béł(bëła) w môlu "+"$2"+".");
  d = r(d, '(^|="|>) był\\(a\\) z użytkownikiem (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" béł(bëła) z brëkòwnikã "+"$2"+"  w môlu "+"$3"+".");
  d = r(d, '(^|="|>) dodała (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1"+" doda "+"$2"+" do albùmù "+"$3"+".");
  d = r(d, '(^|="|>) dodał (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1"+" dodôł "+"$2"+" do albùmù "+"$3"+".");
  d = r(d, '(^|="|>) dodał\\(a\\) (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1"+" dodôł(ała) "+"$2"+" do albùmù "+"$3"+".");
  d = r(d, '(^|="|>) był\\(a\\) z\\: (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+", "+"$2"+" ë "+"$3"+" bëlë(łë) w môlu "+"$4"+".");
  d = r(d, '(^|="|>) był\\(a\\) z użytkownikami (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+", "+"$2"+" ë "+"$3"+" bëlë w môlu "+"$4"+".");
  d = r(d, '(^|="|>) zaktualizował\\(a\\) swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" zaktualizowôł(ała) swòje "+"$2"+".");
  d = r(d, '(^|="|>) zaktualizował swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" zaktualizowôł swòje "+"$2"+".");
  d = r(d, '(^|="|>) zaktualizowała swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+" zaktualizowała swòje "+"$2"+".");
  d = r(d, '(^|="|>)zdjęcie w tle(?=($|"|<))', "$1"+"òdjimk w pòlu");
  d = r(d, '(^|="|>)zdjęcie profilowe(?=($|"|<))', "$1"+"profilowi òdjimk");
  d = r(d, '(^|="|>)Przejdź do trybu online(?=($|"|<))', "$1"+"Przeńdzë do tribù online");
  d = r(d, ' korzysta obecnie z wersji serwisu Facebook w języku\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', " prawie zwëskiwô z Facebooka w jãzëkù: "+"$1"+".");
  d = r(d, '(^|="|>)Zdjęcia i filmy(?=($|"|<))', "$1"+"Òdjimczi ë filmë");
  d = r(d, '(^|="|>)Wszystkie(?=($|"|<))', "$1"+"Wszëtczé");
  d = r(d, '(^|="|>)Tylko dokumenty(?=($|"|<))', "$1"+"Leno dokùmeńtë");
  d = r(d, '(^|="|>)Tylko pliki(?=($|"|<))', "$1"+"Leno lopczi");
  d = r(d, '(^|="|>)Utwórz dokument(?=($|"|<))', "$1"+"Zrobi dokùmeńt");
  d = r(d, '(^|="|>)Porozmawiaj na czacie z grupą(?=($|"|<))', "$1"+"Pòkôrbi na kôrbiónce z karnã");
  d = r(d, '(^|="|>)Dodaj do ulubionych(?=($|"|<))', "$1"+"Dodôj do lubòtnëch");
  d = r(d, '(^|="|>)Edytuj grupę(?=($|"|<))', "$1"+"Editëjë karno");
  d = r(d, '(^|="|>)Zgłoś grupę(?=($|"|<))', "$1"+"Zgłoszë karno");
  d = r(d, '(^|="|>)Opuść grupę(?=($|"|<))', "$1"+"Wińdzë z karna");
  d = r(d, '(^|="|>)Brak wyników(?=($|"|<))', "$1"+"Felô pòdrechòwaniów");
  d = r(d, '(^|="|>)W tej grupie nie ma zdjęć i filmów.(?=($|"|<))', "$1"+"W tim karnie felô òdjimków ë filmów");
  d = r(d, '(^|="|>)Jeszcze w tym tygodniu(?=($|"|<))', "$1"+"Jesz w tim tidzeniu");
  d = r(d, '(^|="|>)W następnym tygodniu(?=($|"|<))', "$1"+"W pòstãpnym tidzeniu");
  d = r(d, '(^|="|>)W tym miesiącu(?=($|"|<))', "$1"+"W tim miesącu");
  d = r(d, '(^|="|>)W zeszłym tygodniu(?=($|"|<))', "$1"+"W ùszłim tidzeniu");
  d = r(d, '(^|="|>)Minione wydarzenia(?=($|"|<))', "$1"+"Ùszłi rozegracje");
  d = r(d, '(^|="|>)Nadchodzące wydarzenia(?=($|"|<))', "$1"+"Nadchôdającé rozegracje");
  d = r(d, '(^|="|>)Proponowane wydarzenia(?=($|"|<))', "$1"+"Bédowóné rozegracje");
  d = r(d, '(^|="|>)Odrzucone wydarzenia(?=($|"|<))', "$1"+"Òdrzuconé rozegracje");
  d = r(d, '(^|="|>)Urodziny(?=($|"|<))', "$1"+"Gebùrstach");
  d = r(d, '(^|="|>)Eksportuj zdarzenia\.\.\.(?=($|"|<))', "$1"+"Scygni rozegracje...");
  d = r(d, '(^|="|>) \\· Lubisz tę stronę\.(?=($|"|<))', "$1"+"· Widzy Cë sã ta starna.");
  d = r(d, '(^|="|>)Organizowane przez\\: (?=($|"|<))', "$1"+"Rëchtowóné bez: ");
  d = r(d, '(^|="|>)Ukryj zdarzenie(?=($|"|<))', "$1"+"Skri rozegracjã");
  d = r(d, '(^|="|>)Zgłoś zdarzenie lub spam(?=($|"|<))', "$1"+"Zgłoszë rozegracjã abò spam");
  d = r(d, '(^|="|>)Wszystkie zdarzenia(?=($|"|<))', "$1"+"Wszëtczé rozegracje");
  d = r(d, '(^|="|>)Większość zdarzeń(?=($|"|<))', "$1"+"Wikszosc rozegracjów");
  d = r(d, '(^|="|>)Tylko ważne(?=($|"|<))', "$1"+"Leno wôżné");
  d = r(d, '(^|="|>)Edytuj ustawienia(?=($|"|<))', "$1"+"Editëjë ùstawienia");
  d = r(d, '(^|="|>)Zarchiwizuj listę(?=($|"|<))', "$1"+"Przeniesë lëstã do archiwùm");
  d = r(d, '(^|="|>)Polecane wydarzenia(?=($|"|<))', "$1"+"Bédowóné rozegracje");
  d = r(d, '(^|="|>)Zapytaj znajomych(?=($|"|<))', "$1"+"Spëtôj drëchów");
  d = r(d, '(^|="|>)Zobacz(?=($|"|<))', "$1"+"Ùzdrzi");
  d = r(d, '(^|="|>)Inni(?=($|"|<))', "$1"+"Jinszi");
  d = r(d, '(^|="|>)Zadał\\(a\\)(?=($|"|<))', "$1"+"Spitôł(ała)");
  d = r(d, '(^|="|>)([0-9,]+) więcej(?=($|"|<))', "$1"+"$2"+" wicy");
  d = r(d, '(^|="|>)Znajomi \\(([0-9,]+)\\)(?=($|"|<))', "$1"+"$2"+" drëchòwie");
  d = r(d, '(^|="|>)Sztuka i rozrywka(?=($|"|<))', "$1"+"Kùńszt ë szpôs");
  d = r(d, '(^|="|>)Ulubione zajęcia i zainteresowania(?=($|"|<))', "$1"+"Lubòtné zajãca ë zajinteresowania");
  d = r(d, '(^|="|>)Ma ([0-9,]+) znajomych na Facebooku\.(?=($|"|<))', "$1"+"Mô "+"$2"+" drëchów na Facebookù.");
  d = r(d, '(^|="|>)Edytuj opcje(?=($|"|<))', "$1"+"Editëjë òptacje");
  d = r(d, '(^|="|>)Obserwuj(?=($|"|<))', "$1"+"Sledzë");
  d = r(d, '(^|="|>)Ustawienia powiadomień(?=($|"|<))', "$1"+"Ùstawienia wiadłów");
  d = r(d, '(^|="|>)Twoje powiadomienia(?=($|"|<))', "$1"+"Twòje wiadła");
  d = r(d, '(^|="|>)Otrzymuj powiadomienia poprzez\:(?=($|"|<))', "$1"+"Dostôwôj wiadła bez:");
  d = r(d, '(^|="|>)Nowe znaczniki \\„Lubię to\\!\\”(?=($|"|<))', "$1"+"Nowé knypsniãca Widzy mie sã!");
  d = r(d, '(^|="|>)Więcej zdarzeń(?=($|"|<))', "$1"+"Wicy rozegracjów");
  d = r(d, '(^|="|>)Edytuj stronę(?=($|"|<))', "$1"+"Editëjë starnã");
  d = r(d, '(^|="|>)Uprawnienia administracyjne(?=($|"|<))', "$1"+"Ùprawnienia adminystratora");
  d = r(d, '(^|="|>)Edytuj stronę(?=($|"|<))', "$1"+"Editëjë starnã");
  d = r(d, '(^|="|>)Zarządzaj powiadomieniami(?=($|"|<))', "$1"+"Zarządzôj wiadłama");
  d = r(d, '(^|="|>)Zarządzaj uprawnieniami(?=($|"|<))', "$1"+"Zarządzôj ùprawnieniama");
  d = r(d, '(^|="|>)Skorzystaj z dziennika aktywności(?=($|"|<))', "$1"+"Zwëskôj z aktiwnoscowégò dzénnika");
  d = r(d, '(^|="|>)Zobacz zablokowanych użytkowników(?=($|"|<))', "$1"+"Òbaczë zablokòwónëch brëkòwników");
  d = r(d, '(^|="|>)Poleć jej znajomych(?=($|"|<))', "$1"+"Ùprzëstãpni ji drëchów");
  d = r(d, '(^|="|>)Poleć mu znajomych(?=($|"|<))', "$1"+"Ùprzëstãpni mù drëchów");
  d = r(d, '(^|="|>)Pomóż znajomemu(?=($|"|<))', "$1"+"Pòmòżë drëchòwi");
  d = r(d, '(^|="|>)Złóż życzenia(?=($|"|<))', "$1"+"Wësli żëczbë");
  d = r(d, '(^|="|>)Zaczepki(?=($|"|<))', "$1"+"Zawôranié");
  d = r(d, '(^|="|>)Zaczep(?=($|"|<))', "$1"+"Zawôrëjë");
  d = r(d, '(^|="|>)Telewizja(?=($|"|<))', "$1"+"Telewizjô");
  d = r(d, '(^|="|>)Książki(?=($|"|<))', "$1"+"Ksążczi");
  d = r(d, '(^|="|>)Szkoła średnia(?=($|"|<))', "$1"+"Strzédnô szkòła");
  d = r(d, '(^|="|>)Pracodawcy(?=($|"|<))', "$1"+"Robòtodôwôcze");
  d = r(d, '(^|="|>)Usuń podgląd(?=($|"|<))', "$1"+"Wëwalë przezérk");
  d = r(d, '(^|="|>)Dodaj znajomych do czatu\.\.\.(?=($|"|<))', "$1"+"Dodôj drëchów do kôrbiónczi...");
  d = r(d, '(^|="|>)Zobacz pełną konwersację(?=($|"|<))', "$1"+"Òbaczë całą kôrbiónkã");
  d = r(d, '(^|="|>)Wyczyść okno(?=($|"|<))', "$1"+"Wëczëszczë òkno");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Mùzyka");
  d = r(d, '(^|="|>)Menedżer reklam(?=($|"|<))', "$1"+"Menadżéra reklamów");
  d = r(d, '(^|="|>)Dziś są jej urodziny\.(?=($|"|<))', "$1"+"Dzysô je ji gebùrstach.");
  d = r(d, '(^|="|>)Dziś są jego urodziny\.(?=($|"|<))', "$1"+"Dzysô je jegò gebùrstach.");
  d = r(d, '(^|="|>)Inne wiadomości(?=($|"|<))', "$1"+"Jinszé wiadła");
  d = r(d, '(^|="|>)Właściciele strony(?=($|"|<))', "$1"+"Miéwcowie starnë");
  d = r(d, '(^|="|>)Tablica&nbsp;(?=($|"|<))', "$1"+"Tôfla&nbsp;");
  d = r(d, '(^|="|>)Informacje&nbsp;(?=($|"|<))', "$1"+"Wiadła&nbsp;");
  d = r(d, '(^|="|>)Zdjęcia&nbsp;(?=($|"|<))', "$1"+"Òdjimczi&nbsp;");
  d = r(d, '(^|="|>)Znajomi&nbsp;(?=($|"|<))', "$1"+"Drëchòwie&nbsp;");
  d = r(d, '(^|="|>)Subskrypcje&nbsp;(?=($|"|<))', "$1"+"Subskripcje&nbsp;");
  d = r(d, '(^|="|>)Data urodzenia\\: ', "$1"+"Dzéń ùrodzeniégò: ");
  d = r(d, '(^|="|>)Dzisiaj(?=($|"|<))', "$1"+"Dzysô");
  d = r(d, '(^|="|>)W toku(?=($|"|<))', "$1"+"Prawie je robioné");
  d = r(d, '(^|="|>)Zobacz\\: (?=($|"|<))', "$1"+"Òbaczë: ");
  d = r(d, '(^|="|>)Znajomi na czacie(?=($|"|<))', "$1"+"Drëchòwie na kôrbiónce");
  d = r(d, '(^|="|>)W związku małżeńskim z użytkownikiem\\:(?=($|"|<))', "$1"+"Żeniałi(ô) z brëkòwnikã: ");
  d = r(d, '(^|="|>)Dodaj swoje miejsce pracy(?=($|"|<))', "$1"+"Dodôwôj swój plac robòtë");
  d = r(d, '(^|="|>)W związku małżeńskim z użytkownikiem\\: (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"Żeniałi(ô) z brëkòwnikã: "+"$2");
  d = r(d, '(^|="|>)\, aby zobaczyć\, kto jest dostępny na czacie\.(?=($|"|<))', "$1"+", cobë òbaczëc chto je na kôrbiónce.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) dołączyli do grupy(?=($|"|<))', "$1"+"$2"+" ë "+"$3"+" zrzeszëlë sã z karnã.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ùwidzôł(ała) so brëkòwnika"+"$3"+""+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ùwidzôł(ała) so "+"$3"+" ë "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" i "+"$3"+" są terô drëchama z brëkòwnikã "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) zmieniło swoje zdjęcia profilowe\.(?=($|"|<))', "$1"+"$2"+" ë "+"$3"+" zmienilë swòje profilowé òdjimczi.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zmienił\\(a\\) swoje zdjęcie profilowe\.(?=($|"|<))', "$1"+"$2"+" zmienił(a) swój profilowi òdjimk.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedział (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" na pëtanié "+"$3"+" òdpòwiedzôł "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedział (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" na pëtanié "+"$3"+" òdpòwiedzôł "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedziała (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" na pëtanié "+"$3"+" òdpòwiedza "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedziała (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" na pëtanié "+"$3"+" òdpòwiedza "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ë "+"$3"+" ùwidzelë so "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) także to lubią\.(?=($|"|<))', "$1"+"$2"+" ë "+"$3"+" téż so to ùwidzelë.");
  d = r(d, '(^|="|>)Grupa (<a [^>]+>[^<]+</a>) nie ma żadnych minionych wydarzeń\. (?=($|"|<))', "$1"+"Karno "+"$2"+" ni mô niżódnëch ùszłëch rozegracjów. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) weźmie udział w wydarzeniu \\„(<a [^>]+>[^<]+</a>)\\” \\– (<a [^>]+>[^<]+</a>)\, w miejscu\\:', "$1"+"$2"+" mdze brôł ùdzél w rozegracje "+"$3"+" – "+"$4"+", "+"w môlu:");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zadał\\(a\\) pytanie \\„(<a [^>]+>[^<]+</a>)\\”(?=($|"|<))', "$1"+"$2"+" pitô: "+"„"+"$3"+"”");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?1) nowy post opublikowany przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mô "+"$3"+" nowé wiadło ùprzëstãpnioné bez brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[2-4]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mô "+"$3"+" nowé wiadła ùprzëstãpnioné bez brëkòwnika "+"$4"+" ë "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[5-9]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mô "+"$3"+" nowëch wiadłów ùprzëstãpnionëch bez brëkòwnika "+"$4"+" ë "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma ([0-9,]+) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mô "+"$3"+" nowëch wiadłów ùprzëstãpnionëch bez brëkòwnika "+"$4"+" ë "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[2-4]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mô "+"$3"+" nowé wiadła ùprzëstãpnioné bez brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[5-9]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mô "+"$3"+" nowëch wiadłów ùprzëstãpnionëch bez brëkòwnika"+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma ([0-9,]+) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mô "+"$3"+" nowëch wiadłów ùprzëstãpnionëch bez brëkòwnika "+"$4"+".");
  d = r(d, '(^|>)Zobacz 1 post więcej użytkownika ', "$1"+"Ùzdrzi 1 wiadło wicy brëkòwnika ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?1)\\) użytkownika\\: ', "$1"+"Òbaczë "+"$2"+" jinszé wiadło brëkòwnika: ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?[2-4])\\) użytkowników\\: ', "$1"+"Òbaczë "+"$2"+" jinszé wiadła brëkòwnika: ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?[5-9])\\) użytkowników\\: ', "$1"+"Òbaczë "+"$2"+" jinszich wiadłów brëkòwnika: ");
  d = r(d, '(^|>)Zobacz więcej postów \\(([0-9,]+)\\) użytkowników\\: ', "$1"+"Òbaczë "+"$2"+" jinszich wiadłów brëkòwnika: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?1)\\) postów użytkownika\\: ', "$1"+"Òbaczë "+"$2"+" jinszé wiadło brëkòwnika: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?[2-4])\\) postów użytkownika ', "$1"+"Òbaczë "+"$2"+" jinszé wiadła brëkòwnika: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?[5-9])\\) postów użytkownika ', "$1"+"Òbaczë "+"$2"+" jinszich wiadłów brëkòwnika: ");
  d = r(d, '(^|>)Zobacz więcej \\(([0-9,]+)\\) postów użytkownika ', "$1"+"Òbaczë "+"$2"+" jinszich wiadłów brëkòwnika: ");
d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do swòjégò "+"$3"+"pòwrózkù</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swoje własne (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do swòjégò "+"$3"+"òdjimka</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do swòjégò "+"$3"+"wpisënkù</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do swòjégò "+"$3"+"sztatusu</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do gwôsnégò "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do swòjégò "+"$3"+" pòwrózkù</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do swòjégò "+"$3"+"òdjimka</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do swòjégò "+"$3"+"wpisënkù</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do swòjégò "+"$3"+"sztatusu</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do gwôsnégò "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do twòjégò "+"$3"+"pòwrózkù</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twoje (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" dodôł dopòwiesc do twòjégò "+"$3"+"òdjimka</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do twòjégò "+"$3"+"wpisënkù</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do twòjégò "+"$3"+"sztatusu</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" dodôł dopòwiesc do twòjégò "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do twòjégò "+"$3"+"pòwrózkù</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twoje (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" dodała dopòwiesc do twòjégò "+"$3"+"òdjimka</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do twòjégò "+"$3"+"wpisënkù</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do twòjégò "+"$3"+"sztatusu</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" dodała dopòwiesc do twòjégò "+"$3"+".");

  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodał post na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dodôł wpisënk na starnie karna "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodała post na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dodała wpisënk na starnie karna "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodał\\(a\\) post do grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dodôł(ała) wpisënk do karna "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował Twój wpis na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dodôł dopòwiesc do twòjégò wpisënkù na starnie karna "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała Twój wpis na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" dodała dopòwiesc do twòjégò wpisënkù na starnie karna "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentował wpis w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" téż dodôł dopòwiesc w karnie"+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentowała wpis w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" téż dodała dopòwiesc w karnie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentował zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" téż dodôł wpisënk do òdjimka w karnie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentowała zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" téż dodała wpisënk do òdjimka w karnie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali post w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" ë "+"$3"+" téż dodelë dopòwiescë do wpisënkù w karnie "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali Twoje zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" ë "+"$3"+" dodelë dopòwiescë do twòjégò òdjimka w karnie "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali status użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" ë "+"$3"+" téż dodelë dopòwiescë do sztatusu brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali Twój status\.', "$1"+"$2"+" ë "+"$3"+" dodelë dopòwiescë do twòjégò sztatusu.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepił Cię\. ', "$1"+"$2"+" zawôrł Ce.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepiła Cię\. ', "$1"+"$2"+" zawôrła Ce.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepił\\(a\\) Cię\. ', "$1"+"$2"+" zawôrł(a) Ce.");
  d = r(d, '(^|="|>) zaczepił Cię(?=($|"|<))', "$1"+" zawôrł Ce.");
  d = r(d, '(^|="|>) zaczepiła Cię(?=($|"|<))', "$1"+" zawôrła Ce.");
  d = r(d, '(^|="|>) zaczepił\\(a\\) Cię(?=($|"|<))', "$1"+" zawôrł(a) Ce.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) także skomentowali (<span [^>]+>[^<]+</span>) status\.', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich téż dodało dopòwiesc do sztatusu "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) lubi Twój komentarz\\:', "$1"+"$2"+" (drëch brëkòwnika "+"$3"+") "+"ùwidzôł so Twòją dopòwiesc: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) skomentował link użytkownika (<span [^>]+>[^<]+</span>)\\:', "$1"+"$2"+" (drëch brëkòwnika "+"$3"+") "+"dodôł dopòwiesc do pòwrózkù brëkòwnika "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi Twój komentarz\\:', "$1"+"$2"+" ùwidzôł so Twòją dopòwiesc: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" ùwidzôł so pòwrózk brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) skomentował\\(a\\) status użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" (drëch brëkòwnika "+"$3"+") "+"dodôł(ała) dopòwiesc do sztatusu brëkòwnika "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią stronę \\„(<span [^>]+>[^<]+</span>)\\”\.', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich ùwidzało so starnã "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich dodało dopòwiesc do òdjimka brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali link  użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich dodało dopòwiesc do pòwrózkù brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich dodało dopòwiesc do wpisënkù brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią Twoje zdjęcie na Tablicy użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich ùwidzało so twój òdjimk na tôflë brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubi album ', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich ùwidzało so albùm ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i ([0-9,]+) inne osoby lubią Twój komentarz\\: ', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich ùwidzało so Twòją dopòwiesc: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i ([0-9,]+) innych znajomych lubi Twoje zdjęcie\.', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich ùwidzało so Twój òdjimk: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią zdjęcie użykownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" ùwidzało so òdjimk brëkòwnika "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią Twój komentarz\\: ', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" ùwidzało so Twòją dopòwiesc: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" ùwidzało so òdjimk brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) link użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" ë "+"$3"+" téż dodalë dopòwiesc do pòwrózkù brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" ë "+"$3"+" ùwidzało so òdjimk brëkòwnika "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) link użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" téż dodalë dopòwiesc do pòwrózkù brëkòwnika "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią Twój komentarz\\: ', "$1"+"$2"+" ë "+"$3"+" ùwidzelë so Twòją dopòwiesc: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" dodała dopòwiesc do òdjimkù brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" dodôł dopòwiesc do òdjimkù brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" dodała dopòwiesc do pòwrózkù brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" dodôł dopòwiesc do pòwrózkù brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował\\(a\\) status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" dodôł(ała) dopòwiesc do sztatusu brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" dodała dopòwiesc do sztatusu brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" dodôł dopòwiesc do sztatusu brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" ùwidzôł so sztatus brëkòwnika "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich ùwidzało so òdjimk brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubi link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" jinszich ùwidzało so pòwrózk brëkòwnika "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią link użykownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" ë "+"$4"+" ùwidzało so pòwrózk brëkòwnika "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+" ë "+"$3"+" téż dodalë(ałë) dopòwiesc do òdjimka brëkòwnika "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią link użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+" ë "+"$3"+" ùwidzelë so pòwrózk brëkòwnika "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali\\(ły\\) zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+" ë "+"$3"+" dodalë(ałë) dopòwiesc do òdjimka brëkòwnika "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi album ', "$1"+"$2"+" ùwidzało so albùm ");
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
