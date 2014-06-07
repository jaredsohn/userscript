// ==UserScript==
// @name           facebook-szl
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Silesian
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @exclude        http*://*.facebook.com/messages/*
// @exclude        http*://facebook.com/messages/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.1.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-07-18
// Translations:   Grzegorz Kulik - www.poslunsku.eu

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
    d = r(d, '(^|="|>)([0-9]{1,2}) stycznia(?=($|"|<))', "$1" + "$2" + " stycznia");
    d = r(d, '(^|="|>)([0-9]{1,2}) lutego(?=($|"|<))', "$1" + "$2" + " lutygo");
    d = r(d, '(^|="|>)([0-9]{1,2}) marca(?=($|"|<))', "$1" + "$2" + " marca");
    d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia(?=($|"|<))', "$1" + "$2" + " kwiytnia");
    d = r(d, '(^|="|>)([0-9]{1,2}) maja(?=($|"|<))', "$1" + "$2" + " maja");
    d = r(d, '(^|="|>)([0-9]{1,2}) czerwca(?=($|"|<))', "$1" + "$2" + " czyrwca");
    d = r(d, '(^|="|>)([0-9]{1,2}) lipca(?=($|"|<))', "$1" + "$2" + " lipca");
    d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia(?=($|"|<))', "$1" + "$2" + " siyrpnia");
    d = r(d, '(^|="|>)([0-9]{1,2}) września(?=($|"|<))', "$1" + "$2" + " września");
    d = r(d, '(^|="|>)([0-9]{1,2}) października(?=($|"|<))', "$1" + "$2" + " paździyrnika");
    d = r(d, '(^|="|>)([0-9]{1,2}) listopada(?=($|"|<))', "$1" + "$2" + " listopada");
    d = r(d, '(^|="|>)([0-9]{1,2}) grudnia(?=($|"|<))', "$1" + "$2" + " grudnia");

    d = r(d, '(^|="|>)([0-9]{1,2}) stycznia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " stycznia " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) lutego ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " lutygo " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) marca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " marca " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " kwiytnia " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) maja ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " maja " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) czerwca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " czyrwca " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) lipca ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " lipca " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " siyrpnia " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) września ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " września " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) października ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " paździyrnika " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) listopada ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " listopada " + "$3" + " ô " + "$4");
    d = r(d, '(^|="|>)([0-9]{1,2}) grudnia ([0-9]{4}) o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " grudnia " + "$3" + " ô " + "$4");

    d = r(d, '(^|="|>)([0-9]{1,2}) stycznia o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " stycznia ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) lutego o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " lutygo ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) marca o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " marca ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " kwiytnia ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) maja o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " maja ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) czerwca o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " czyrwca ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) lipca o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " lipca ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " siyrpnia ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) września o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " września ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) października o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " paździyrnika ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) listopada o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " listopada ô " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) grudnia o ([0-9:apm]+)(?=($|"|<))', "$1" + "$2" + " grudnia ô " + "$3");

    d = r(d, '(^|="|>)([0-9]{1,2}) stycznia ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " stycznia " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) lutego ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " lutygo " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) marca ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " marca " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) kwietnia ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " kwiytnia " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) maja ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " maja " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) czerwca ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " czyrwca " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) lipca ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " lipca " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) sierpnia ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " siyrpnia " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) września ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " września " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) października ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " paździyrnika " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) listopada ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " listopada " + "$3");
    d = r(d, '(^|="|>)([0-9]{1,2}) grudnia ([0-9]{4})(?=($|"|<))', "$1" + "$2" + " grudnia " + "$3");

    d = r(d, '(^|="|>)styczeń(?=($|"|<))', "$1" + "Styczyń");
    d = r(d, '(^|="|>)luty(?=($|"|<))', "$1" + "Luty");
    d = r(d, '(^|="|>)marzec(?=($|"|<))', "$1" + "Marzec");
    d = r(d, '(^|="|>)kwiecień(?=($|"|<))', "$1" + "Kwiyciyń");
    d = r(d, '(^|="|>)maj(?=($|"|<))', "$1" + "Mŏj");
    d = r(d, '(^|="|>)czerwiec(?=($|"|<))', "$1" + "Czyrwiyc");
    d = r(d, '(^|="|>)lipiec(?=($|"|<))', "$1" + "Lipiyc");
    d = r(d, '(^|="|>)sierpień(?=($|"|<))', "$1" + "Siyrpiyń");
    d = r(d, '(^|="|>)wrzesień(?=($|"|<))', "$1" + "Wrzesiyń");
    d = r(d, '(^|="|>)październik(?=($|"|<))', "$1" + "Paździyrnik");
    d = r(d, '(^|="|>)listopad(?=($|"|<))', "$1" + "Listopad");
    d = r(d, '(^|="|>)grudzień(?=($|"|<))', "$1" + "Grudziyń");

    d = r(d, '(^|="|>)około minuty temu(?=($|"|<))', "$1" + "Kole minuty do zadku");
    d = r(d, '(^|="|>)kilka sekund temu(?=($|"|<))', "$1" + "Pŏrã sekund do zadku");
    d = r(d, '(^|="|>)około godziny temu(?=($|"|<))', "$1" + "Kole godziny do zadku");
    d = r(d, '(^|="|>)godzinę temu(?=($|"|<))', "$1" + "godzinã do zadku");
    d = r(d, '(^|="|>)([0-9,]+) godz\\. temu(?=($|"|<))', "$1" + "$2" + " godz. do zadku");
    d = r(d, '(^|="|>)minutę temu(?=($|"|<))', "$1" + "minutã do zadku");
    d = r(d, '(^|="|>)([0-9,]+) minut\\(y\\) temu(?=($|"|<))', "$1" + "$2" + " min. do zadku");
    d = r(d, '(^|="|>)sekundę temu(?=($|"|<))', "$1" + "sekundã do zadku");
    d = r(d, '(^|="|>)([0-9,]+) sekund\\(y\\) temu(?=($|"|<))', "$1" + "$2" + " sek. do zadku");

    d = r(d, '(^|="|>)Wczoraj(?=($|"|<))', "$1" + "Wczorej");
    d = r(d, '(^|="|>)Poniedziałek(?=($|"|<))', "$1" + "Pyńdziałek");
    d = r(d, '(^|="|>)Wtorek(?=($|"|<))', "$1" + "Wtorek");
    d = r(d, '(^|="|>)Środa(?=($|"|<))', "$1" + "Strzoda");
    d = r(d, '(^|="|>)Czwartek(?=($|"|<))', "$1" + "Sztwŏrtek");
    d = r(d, '(^|="|>)Piątek(?=($|"|<))', "$1" + "Piōntek");
    d = r(d, '(^|="|>)Sobota(?=($|"|<))', "$1" + "Sobota");
    d = r(d, '(^|="|>)Niedziela(?=($|"|<))', "$1" + "Niydziela");

    d = r(d, '(^|="|>)w poniedziałek(?=($|"|<))', "$1" + "w pyńdziałek");
    d = r(d, '(^|="|>)we wtorek(?=($|"|<))', "$1" + "we wtorek");
    d = r(d, '(^|="|>)w środę(?=($|"|<))', "$1" + "we strzodã");
    d = r(d, '(^|="|>)w czwartek(?=($|"|<))', "$1" + "we sztwŏrtek");
    d = r(d, '(^|="|>)w piątek(?=($|"|<))', "$1" + "w piōntek");
    d = r(d, '(^|="|>)w sobotę(?=($|"|<))', "$1" + "w sobotã");
    d = r(d, '(^|="|>)w niedzielę(?=($|"|<))', "$1" + "w niydziela");

    d = r(d, '(^|="|>)w zeszły poniedziałek(?=($|"|<))', "$1" + "w pyńdziałek");
    d = r(d, '(^|="|>)w zeszły wtorek(?=($|"|<))', "$1" + "we wtorek");
    d = r(d, '(^|="|>)w zeszłą środę(?=($|"|<))', "$1" + "we strzodã");
    d = r(d, '(^|="|>)w zeszły czwartek(?=($|"|<))', "$1" + "we sztwŏrtek");
    d = r(d, '(^|="|>)w zeszły piątek(?=($|"|<))', "$1" + "w piōntek");
    d = r(d, '(^|="|>)w zeszłą sobotę(?=($|"|<))', "$1" + "w sobotã");
    d = r(d, '(^|="|>)w zeszłą niedzielę(?=($|"|<))', "$1" + "w niydziela");

    d = r(d, '(^|="|>)Jutro o ([^<" ]+)(?=($|"|<))', "$1" + "Jutro ô " + "$2");
    d = r(d, '(^|="|>)Wczoraj o ([^<" ]+)(?=($|"|<))', "$1" + "Wczorej ô " + "$2");
    d = r(d, '(^|="|>)Poniedziałek\, ([0-9:apm]+)(?=($|"|<))', "$1" + "W pyńdziałek ô " + "$2");
    d = r(d, '(^|="|>)Wtorek\, ([0-9:apm]+)(?=($|"|<))', "$1" + "We wtorek ô " + "$2");
    d = r(d, '(^|="|>)Środa\, ([0-9:apm]+)(?=($|"|<))', "$1" + "We strzodã ô " + "$2");
    d = r(d, '(^|="|>)Czwartek\, ([0-9:apm]+)(?=($|"|<))', "$1" + "We sztwŏrtek ô " + "$2");
    d = r(d, '(^|="|>)Piątek\, ([0-9:apm]+)(?=($|"|<))', "$1" + "W piōntek ô " + "$2");
    d = r(d, '(^|="|>)Sobota\, ([0-9:apm]+)(?=($|"|<))', "$1" + "W sobotã ô " + "$2");
    d = r(d, '(^|="|>)Niedziela\, ([0-9:apm]+)(?=($|"|<))', "$1" + "W niydzielã ô " + "$2");

    d = r(d, '(^|="|>)ULUBIONE(?=($|"|<))', "$1" + "WERTOWNE");
    d = r(d, '(^|="|>)GRUPY(?=($|"|<))', "$1" + "SKUPINY");
    d = r(d, '(^|="|>)STRONY(?=($|"|<))', "$1" + "STRŌNY");
    d = r(d, '(^|="|>)WIĘCEJ(?=($|"|<))', "$1" + "WIYNCYJ");
    d = r(d, '(^|="|>)STRONY I REKLAMY(?=($|"|<))', "$1" + "STRŌNY I WERBŌNGI");
    d = r(d, '(^|="|>)ZNAJOMI(?=($|"|<))', "$1" + "KAMRATY");
    d = r(d, '(^|="|>)APLIKACJE(?=($|"|<))', "$1" + "APLIKACYJE");
    d = r(d, '(^|="|>)NAJNOWSZY WPIS(?=($|"|<))', "$1" + "NŎJNOWSZY WPIS");

    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1" + "$2" + ", " + "$3" + " i " + "$4" + " przaje tymu.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " przaje tymu.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) go lubią\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " przaje mu.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) ją lubią\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " przaje jij.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) oraz (<a [^>]+>[^<]+</a>) ich lubią\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " przaje im.");
    d = r(d, '(^|>)1 inny znajomy(?=($|<))', "$1" + "1 inkszy kamrat");
    d = r(d, '(^|>)([0-9,]+) innych znajomych(?=($|<))', "$1" + "$2" + " inkszych kamratōw");
    d = r(d, '(^|>)1 inny(?=($|<))', "$1" + "1 inkszy");
    d = r(d, '(^|>)([0-9,]+) innych(?=($|<))', "$1" + "$2" + " inkszych");
    d = r(d, '(^|>)(1?1) innych członków(?=($|<))', "$1" + "$2" + " inkszych");
    d = r(d, '(^|>)([0-9,]+) innych członków(?=($|<))', "$1" + "$2" + " inkszych");
    d = r(d, '(^|>)1 inna osoba(?=($|<))', "$1" + "1 inkszŏ osoba");
    d = r(d, '(^|>)inne osoby \\(([0-9,]+)\\)(?=($|<))', "$1" + "$2" + " inkszych ludzi");
    d = r(d, '(^|>)(1?1) innych osób(?=($|<))', "$1" + "$2" + " inkszy");
    d = r(d, '(^|>)([0-9,]+) innych osób(?=($|<))', "$1" + "$2" + " inkszych");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcie\.(?=($|"|<))', "$1" + "$2" + " dodoł(ała) nowy bild.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) (1?1) nowe zdjęcie\.(?=($|"|<))', "$1" + "$2" + " dodoł(ała) " + "$3" + " nowy bild. ");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\((1?[2-4])\\)\.(?=($|"|<))', "$1" + "$2" + " dodoł(ała) " + "$3" + " nowe bildy. ");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\((1?[3-9])\\)\.(?=($|"|<))', "$1" + "$2" + " dodoł(ała) " + "$3" + " nowych bildōw. ");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) dodał\\(a\\) nowe zdjęcia \\(([0-9,]+)\\)\.(?=($|"|<))', "$1" + "$2" + " dodoł(ała) " + "$3" + " nowych bildōw. ");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował swoje zdjęcie w tle\.(?=($|"|<))', "$1" + "$2" + " mŏ nowy zadni bild. ");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizowała swoje zdjęcie w tle\.(?=($|"|<))', "$1" + "$2" + " mŏ nowy zadni bild. ");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował\\(a\\) swoje zdjęcie w tle\.(?=($|"|<))', "$1" + "$2" + " mŏ nowy zadni bild. ");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " sōm terŏzki kamratami.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi z (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " sōm terŏzki kamratami ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi\.(?=($|"|<))', "$1" + "$2" + ", " + "$3" + " i " + "$4" + " sōm terŏzki kamratami.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) od\\: (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1" + "$2" + " ôd: " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " przaje " + "$3" + "owi.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " skōmyntowoł " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " skōmyntowała " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " skōmyntowoł(ała) " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " przaje " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią to\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " przaje tymu.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " rekōmandujōm " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " rekōmandujōm " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępniły (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " rekōmandujōm " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "bild" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "bild" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "bild" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " rekōmandujōm " + "$4" + "bild" + "</a>" + " ôd " + "$5" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "post" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "post" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "post" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)post</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " rekōmandujōm " + "$4" + "post" + "</a>" + " ôd " + "$5" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "status" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "status" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "status" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)status</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " rekōmandujōm " + "$4" + "status" + "</a>" + " ôd " + "$5" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "albōm" + "</a>" + " ôd " + "$3" + ": " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "albōm" + "</a>" + " ôd " + "$3" + ": " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "albōm" + "</a>" + " ôd " + "$3" + ": " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) album użytkownika (<a [^>]+>[^<]+</a>)\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmandujōm " + "albōm" + "</a>" + " ôd " + "$3" + ": " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "albōm" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "albōm" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + "albōm" + "</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) udostępnili\\(ły\\) (<a [^>]+>)album</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " rekōmandujōm " + "$4" + "albōm" + "</a>" + " ôd " + "$5" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępnił (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) udostępniła (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " rekōmanduje " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) zmienili swoje zdjęcia profilowe\.(?=($|"|<))', "$1" + "$2" + " i " + "$3" + " majōm nowe profilowe ôbrŏzki" + ".");

    d = r(d, '(^|="|>) przez (?=($|"|<))', "$1" + " bez ");
    d = r(d, '(^|="|>) przez\\: (?=($|"|<))', "$1" + " bez ");
    d = r(d, '(^|="|>)telefon komórkowy(?=($|"|<))', "$1" + "mobilniŏk");
    d = r(d, '(^|="|>)Szukaj znajomych(?=($|"|<))', "$1" + "Szukej kamratōw");
    d = r(d, '(^|="|>)Wiadomość(?=($|"|<))', "$1" + "Wiadōmość");
    d = r(d, '(^|="|>) dzisiaj obchodzi urodziny(?=($|"|<))', "$1" + " dzisiej mŏ gyburstag");
    d = r(d, '(^|="|>)Zobacz wszystkie komentarze\\: ([0-9,]+)(?=($|"|<))', "$1" + "Pokŏż wszyjske " + "$2" + " kōmyntŏrzy.");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma nowych znajomych\\: (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " mŏ nowych kamratōw: " + "$3" + " i " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi\\: (<a [^>]+>[^<]+</a>)\\.(?=($|"|<))', "$1" + "$2" + " przaje: " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " przaje " + "$3" + " i " + "$4" + ".");
    d = r(d, '(^|>)inne strony \\((1?1)\\)(?=($|<))', "$1" + "$2" + " inkszyj strōnie");
    d = r(d, '(^|>)inne strony \\((1?[2-9])\\)(?=($|<))', "$1" + "$2" + " inkszym strōnōm");
    d = r(d, '(^|="|>)O czym teraz myślisz\\?(?=($|"|<))', "$1" + "Co Ci łazi po gowie?");
    d = r(d, '(^|="|>)Zdjęcie / film(?=($|"|<))', "$1" + "Bild abo wideo");
    d = r(d, '(^|="|>)Udostępniono ([0-9,]+) razy(?=($|"|<))', "$1" + "$2" + " ludzi to rekōmanduje.");
    d = r(d, '(^|="|>)Dodaj komentarz\.\.\.(?=($|"|<))', "$1" + "Skōmyntuj ...");
    d = r(d, '(^|="|>)([0-9,]+) wspólnych znajomych(?=($|"|<))', "$1" + "$2" + " spōlnych kamratōw");
    d = r(d, '(^|="|>)Zdjęcia na tablicy \\(([0-9,]+)\\)(?=($|"|<))', "$1" + "Bildy na ścianie " + "(" + "$2" + ")");
    d = r(d, '(^|="|>)Zdjęcia profilowe \\(([0-9,]+)\\)(?=($|"|<))', "$1" + "Profilowe ôbrŏzki " + "(" + "$2" + ")");
    d = r(d, '(^|="|>)Zdjęcia w tle \\(([0-9,]+)\\)(?=($|"|<))', "$1" + "Zadnie bildy " + "(" + "$2" + ")");
    d = r(d, '(^|="|>)Ty to lubisz\.(?=($|"|<))', "$1" + "Ty tymu przajesz.");
    d = r(d, '(^|="|>)1 wspólny znajomy(?=($|"|<))', "$1" + "1 spōlny kamrat");
    d = r(d, '(^|="|>)Bliscy znajomi(?=($|"|<))', "$1" + "Bliske kamraty");
    d = r(d, '(^|="|>)Uczęszczał do\\: (?=($|"|<))', "$1" + "Łaziył do: ");
    d = r(d, '(^|="|>)Uczęszczała do\\: (?=($|"|<))', "$1" + "Łaziyła do: ");
    d = r(d, '(^|="|>)Uczęszczał\\(a\\) do\\: (?=($|"|<))', "$1" + "Łaziył(a) do: ");
    d = r(d, '(^|="|>)Pracował\\(a\\) w (?=($|"|<))', "$1" + "Robiył(a) we ");
    d = r(d, '(^|="|>)Pracowała w (?=($|"|<))', "$1" + "Robiyła we ");
    d = r(d, '(^|="|>)Pracował w (?=($|"|<))', "$1" + "Robiył we ");
    d = r(d, '(^|="|>)Utwórz reklamę(?=($|"|<))', "$1" + "Zlōnacz werbōng");
    d = r(d, '(^|="|>)Udostępniono 1 raz(?=($|"|<))', "$1" + "1 osoba to rekōmanduje.");
    d = r(d, '(^|="|>)Utwórz stronę(?=($|"|<))', "$1" + "Złōnacz strōnã");
    d = r(d, '(^|="|>)Pokaż wszystko(?=($|"|<))', "$1" + "Pokŏż wszyjsko");
    d = r(d, '(^|="|>)Powiadomienia(?=($|"|<))', "$1" + "Nowiny");
    d = r(d, '(^|="|>)Filozofia(?=($|"|<))', "$1" + "Filozofijŏ");
    d = r(d, '(^|="|>)Pokaż post(?=($|"|<))', "$1" + "Pokŏż post");
    d = r(d, '(^|="|>)Nie lubię(?=($|"|<))', "$1" + "Niy przajã");
    d = r(d, '(^|="|>)Praca(?=($|"|<))', "$1" + "Prŏca");
    d = r(d, '(^|="|>)Reklama(?=($|"|<))', "$1" + "Werbōng");
    d = r(d, '(^|="|>)Pytanie(?=($|"|<))', "$1" + "Pytaniy");
    d = r(d, '(^|="|>)Twórcy aplikacji(?=($|"|<))', "$1" + "Programisty");
    d = r(d, '(^|="|>)Rodzina(?=($|"|<))', "$1" + "Familijŏ");
    d = r(d, '(^|="|>)Lubię to!(?=($|"|<))', "$1" + "Przajã tymu");
    d = r(d, '(^|="|>)Lubię tę stronę!(?=($|"|<))', "$1" + "Przajã tyj strōnie");
    d = r(d, '(^|="|>)Znajdź więcej stron(?=($|"|<))', "$1" + "Znŏjdź wiyncyj strōn");
    d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1" + "Wiadōmości");
    d = r(d, '(^|="|>)Polski(?=($|"|<))', "$1" + "Ślōnskŏ gŏdka");
    d = r(d, '(^|="|>)Wydarzenie z życia(?=($|"|<))', "$1" + "Życiowe przitrefiyniy");
    d = r(d, '(^|="|>)Aktualności(?=($|"|<))', "$1" + "Nowiny");
    d = r(d, '(^|="|>)Profil(?=($|"|<))', "$1" + "Profil");
    d = r(d, '(^|="|>)Dodaj komentarz(?=($|"|<))', "$1" + "Skōmyntuj");
    d = r(d, '(^|="|>)Oś czasu(?=($|"|<))', "$1" + "Raja");
    d = r(d, '(^|="|>)Prywatność(?=($|"|<))', "$1" + "Prywatność");
    d = r(d, '(^|="|>)Kliknięcia Lubię to!(?=($|"|<))', "$1" + "Reih-reddyn");
    d = r(d, '(^|="|>)Mapa(?=($|"|<))', "$1" + "Mapa");
    d = r(d, '(^|="|>)Anuluj(?=($|"|<))', "$1" + "Ôdciep");
    d = r(d, '(^|="|>)Wydarzenia(?=($|"|<))', "$1" + "Przitrefiynia");
    d = r(d, '(^|="|>)Wyloguj się(?=($|"|<))', "$1" + "Wyloguj sie");
    d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1" + "Bildy");
    d = r(d, '(^|="|>)Regulamin(?=($|"|<))', "$1" + "Warunki");
    d = r(d, '(^|="|>)Znajomi(?=($|"|<))', "$1" + "Kamraty");
    d = r(d, '(^|="|>)O Facebooku(?=($|"|<))', "$1" + "Ô Facebooku");
    d = r(d, '(^|="|>)Więcej(?=($|"|<))', "$1" + "Wiyncyj");
    d = r(d, '(^|="|>)Status(?=($|"|<))', "$1" + "Status");
    d = r(d, '(^|="|>)przez\\:(?=($|"|<))', "$1" + "bez:");
    d = r(d, '(^|="|>)Zdjęcie(?=($|"|<))', "$1" + "Bild");
    d = r(d, '(^|="|>)Miejsca(?=($|"|<))', "$1" + "Place");
    d = r(d, '(^|="|>)Udostępnij(?=($|"|<))', "$1" + "Rekōmanduj");
    d = r(d, '(^|="|>)Albumy(?=($|"|<))', "$1" + "Albōmy");
    d = r(d, '(^|="|>)Zobacz wszystko(?=($|"|<))', "$1" + "Ôbezdrzij wszyjsko");
    d = r(d, '(^|="|>)Zobacz znajomość(?=($|"|<))', "$1" + "Ôbezdrzij kamractwo");
    d = r(d, '(^|="|>)Zamknij(?=($|"|<))', "$1" + "Zawrzij");
    d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1" + "Pōmoc");
    d = r(d, '(^|="|>)Miejsce(?=($|"|<))', "$1" + "Plac");
    d = r(d, '(^|="|>)Szukaj(?=($|"|<))', "$1" + "Szukej");
    d = r(d, '(^|="|>)Aplikacje(?=($|"|<))', "$1" + "APLIKACYJE");
    d = r(d, '(^|="|>)Strona główna(?=($|"|<))', "$1" + "Przodek");
    d = r(d, '(^|="|>)Teraz(?=($|"|<))', "$1" + "Terŏzki");
    d = r(d, '(^|="|>)Do:(?=($|"|<))', "$1" + "Do:");
    d = r(d, '(^|="|>)Wyszukaj osoby, miejsca i inne(?=($|"|<))', "$1" + "Szukej ludzi, placōw i inkszych");
    d = r(d, '(^|="|>)Przejdź do trybu offline(?=($|"|<))', "$1" + "Wyłōncz sie");
    d = r(d, '(^|="|>)Pokaż wszystkie(?=($|"|<))', "$1" + "Pokŏż wszyjske");
    d = r(d, '(^|="|>)Dodaj do tej listy(?=($|"|<))', "$1" + "Dodej do tyj listy");
    d = r(d, '(^|="|>)Ukryj(?=($|"|<))', "$1" + "Skryj");
    d = r(d, '(^|="|>)Ostatnie posty innych użytkowników na stronie(?=($|"|<))', "$1" + "Ôstatnie posty inkszych używoczōw na strōnie");
    d = r(d, '(^|="|>)Napisz komentarz\\…(?=($|"|<))', "$1" + "Napisz kōmyntŏrz...");
    d = r(d, '(^|="|>)Odpowiedz(?=($|"|<))', "$1" + "Wyślij");
    d = r(d, '(^|="|>)Pliki cookie(?=($|"|<))', "$1" + "Zbiory cookie");
    d = r(d, '(^|="|>)Udostępnione dla:(?=($|"|<))', "$1" + "Widzialne:");
    d = r(d, '(^|="|>)Tryb szybkiej odpowiedzi: naciśnij Enter, aby wysłać(?=($|"|<))', "$1" + "Wartke pisaniy. Naciś Enter, coby ôdpedzieć");
    d = r(d, '(^|="|>)Wykonaj zdjęcie lub nagraj film(?=($|"|<))', "$1" + "Zrōb bild abo wideo");
    d = r(d, '(^|="|>)Dołącz plik(?=($|"|<))', "$1" + "Dodej zbiōr");
    d = r(d, '(^|="|>)Osoby\\, które możesz znać(?=($|"|<))', "$1" + "Tych ludzi możesz znać");
    d = r(d, '(^|="|>)Zdjęcia znajomych(?=($|"|<))', "$1" + "Bildy ôd kamratōw");
    d = r(d, '(^|="|>)Wyszukaj w konwersacji(?=($|"|<))', "$1" + "Szukej w rozmŏwie");
    d = r(d, '(^|="|>)Działania(?=($|"|<))', "$1" + "Myni");
    d = r(d, '(^|="|>)Oznacz jako nieprzeczytane(?=($|"|<))', "$1" + "Ôznŏcz jako niyczytane");
    d = r(d, '(^|="|>)Prześlij...(?=($|"|<))', "$1" + "Przekŏż...");
    d = r(d, '(^|="|>)Otwórz w czacie(?=($|"|<))', "$1" + "Ôtwōrz w czacie");
    d = r(d, '(^|="|>)Usuń wiadomości...(?=($|"|<))', "$1" + "Wyciep wiadōmości...");
    d = r(d, '(^|="|>)Zgłoś jako spam...(?=($|"|<))', "$1" + "Zgłoś jako spam...");
    d = r(d, '(^|="|>)Zgłoś konwersację...(?=($|"|<))', "$1" + "Zgłoś rozmŏwã...");
    d = r(d, '(^|="|>)Przenieś do folderu „Inne”(?=($|"|<))', "$1" + "Przeciep do katalogu „Inksze”");
    d = r(d, '(^|="|>)Korzystaj z Facebooka w innym języku.(?=($|"|<))', "$1" + "Używej Facebooka w inkszyj gŏdce.");
    d = r(d, '(^|="|>)Oznaczeni — (?=($|"|<))', "$1" + "Ôznŏczyni — ");
    d = r(d, '(^|="|>)Ładowanie...(?=($|"|<))', "$1" + "Ladowaniy...");
    d = r(d, '(^|="|>)Polish(?=($|"|<))', "$1" + "Silesian");
    d = r(d, '(^|="|>)Wydarzenie, ważne wydarzenie \\+(?=($|"|<))', "$1" + "Ważne przitrefiyniy");
    d = r(d, '(^|="|>)SORTUJ: OD NAJNOWSZYCH(?=($|"|<))', "$1" + "NŎJPRZŌD NŎJNOWSZE");
    d = r(d, '(^|="|>)Najnowsze(?=($|"|<))', "$1" + "Nŏjnowsze");
    d = r(d, '(^|="|>)Najciekawsze zdarzenia(?=($|"|<))', "$1" + "Nŏjbarzij czytane");
    d = r(d, '(^|="|>)Powrót do albumu(?=($|"|<))', "$1" + "Nazŏd do albōmu");
    d = r(d, '(^|="|>)Dodaj znajomego(?=($|"|<))', "$1" + "Dodej do kamratōw");
    d = r(d, '(^|="|>)Zobacz tłumaczenie(?=($|"|<))', "$1" + "Pokŏż przekłŏd");
    d = r(d, '(^|="|>)Autor\\: (?=($|"|<))', "$1" + "Autōr: ");
    d = r(d, '(^|="|>)Aplikacje i gry(?=($|"|<))', "$1" + "Aplikacyje i gry");
    d = r(d, '(^|="|>)Moje albumy(?=($|"|<))', "$1" + "Moje albōmy");
    d = r(d, '(^|="|>)Dodaj film(?=($|"|<))', "$1" + "Dodej wideo");
    d = r(d, '(^|="|>)Korzystaj z Facebooka jako:(?=($|"|<))', "$1" + "Używej Facebooka jako:");
    d = r(d, '(^|="|>)Reklamuj się(?=($|"|<))', "$1" + "Werbuj");
    d = r(d, '(^|="|>)Ustawienia konta(?=($|"|<))', "$1" + "Nasztalowania kōnta");
    d = r(d, '(^|="|>)Ustawienia prywatności(?=($|"|<))', "$1" + "Nasztalowania prywatności");
    d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1" + "Pōmoc");
    d = r(d, '(^|="|>)Zarządzaj listą(?=($|"|<))', "$1" + "Myni listy");
    d = r(d, '(^|="|>)Zmień nazwę listy(?=($|"|<))', "$1" + "Miyń miano listy");
    d = r(d, '(^|="|>)Edytuj listę(?=($|"|<))', "$1" + "Edytuj listã");
    d = r(d, '(^|="|>)Wybierz typy informacji...(?=($|"|<))', "$1" + "Ôbier zorty informacyjōw...");
    d = r(d, '(^|="|>)Ustawienia powiadomień...(?=($|"|<))', "$1" + "Nasztalowania powiadōmiyń...");
    d = r(d, '(^|="|>)Usuń listę(?=($|"|<))', "$1" + "Wyciep listã");
    d = r(d, '(^|="|>)Pokaż wszystkich(?=($|"|<))', "$1" + "Pokŏż wszyjskich");
    d = r(d, '(^|="|>)Proponowane osoby(?=($|"|<))', "$1" + "Forszlagi");
    d = r(d, '(^|="|>)Na tej liście (?=($|"|<))', "$1" + "Na tyj liście ");
    d = r(d, '(^|="|>)Pokaż więcej sugestii(?=($|"|<))', "$1" + "Pokŏż wiyncyj forszlagōw");
    d = r(d, '(^|="|>)Dodaj(?=($|"|<))', "$1" + "Dodej");
    d = r(d, '(^|="|>)Obecnie jesteś offline. Aby czatować ze znajomym, (?=($|"|<))', "$1" + "Terŏzki żeś je oflajn. Jeźli chcesz pogŏdać z kamratami, ");
    d = r(d, '(^|="|>)przejdź do trybu online(?=($|"|<))', "$1" + "to ôtwōrz czat");
    d = r(d, '(^|="|>)Moje zdjęcia(?=($|"|<))', "$1" + "Moje bildy");
    d = r(d, '(^|="|>)Dalej(?=($|"|<))', "$1" + "Dalij");
    d = r(d, '(^|="|>)Poprzednia(?=($|"|<))', "$1" + "Przudzij");
    d = r(d, '(^|="|>)Zdjęcia na tablicy(?=($|"|<))', "$1" + "Bildy na ścianie");
    d = r(d, '(^|="|>)Oznacz zdjęcie(?=($|"|<))', "$1" + "Ôznŏcz bild");
    d = r(d, '(^|="|>)Album(?=($|"|<))', "$1" + "Albōm");
    d = r(d, '(^|="|>)Tablica(?=($|"|<))', "$1" + "Ściana");
    d = r(d, '(^|="|>)Informacje(?=($|"|<))', "$1" + "Informacyje");
    d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1" + "Bildy");
    d = r(d, '(^|="|>)Żonaty(?=($|"|<))', "$1" + "Żyniaty");
    d = r(d, '(^|="|>)Czat \\(Offline\\)(?=($|"|<))', "$1" + "Czat (Oflajn)");
    d = r(d, '(^|>)link(?=($|<))', "$1" + "link");
    d = r(d, '(^|>)zdjęcie(?=($|<))', "$1" + "bild");
    d = r(d, '(^|>)status(?=($|<))', "$1" + "status");
    d = r(d, '(^|="|>)Sponsorowane(?=($|"|<))', "$1" + "Szpōnzorowane");
    d = r(d, '(^|="|>)Zaproszenia do grona znajomych(?=($|"|<))', "$1" + "Prośby ô dodaniy do kamratōw");
    d = r(d, '(^|="|>)Brak nowych zaproszeń\\.(?=($|"|<))', "$1" + "Niy ma żŏdnych prośbōw ô dodaniy do kamratōw.");
    d = r(d, '(^|="|>)Zobacz wszystkie zaproszenia od znajomych(?=($|"|<))', "$1" + "Ôbezdrzij wszyjske prośby");
    d = r(d, '(^|="|>)Nie masz już aktywnych zaproszeń\\.(?=($|"|<))', "$1" + "Niy mŏsz już żŏdnych aktywnych prośbōw.");
    d = r(d, '(^|="|>)Znajdź więcej znajomych(?=($|"|<))', "$1" + "Znŏjdź wiyncyj kamratōw");
    d = r(d, '(^|="|>)Wyślij nową wiadomość(?=($|"|<))', "$1" + "Wyślij nowõ wiadōmość");
    d = r(d, '(^|="|>)Zobacz wszystkie wiadomości(?=($|"|<))', "$1" + "Ôbezdrzij wszyjske");
    d = r(d, '(^|="|>)Zobacz wszystkie powiadomienia(?=($|"|<))', "$1" + "Ôbezdrzij wszyjske");
    d = r(d, '(^|="|>)Nowa wiadomość(?=($|"|<))', "$1" + "Nowŏ wiadōmość");
    d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1" + "Wiadōmości");
    d = r(d, '(^|="|>)Utwórz grupę\.\.\.(?=($|"|<))', "$1" + "Nowŏ skupina...");
    d = r(d, '(^|="|>)Wyszukaj\\:(?=($|"|<))', "$1" + "Szukej:");
    d = r(d, '(^|="|>)Nieprzeczytane wiadomości(?=($|"|<))', "$1" + "Niyczytane wiadōmości");
    d = r(d, '(^|="|>)Zarchiwizowane wiadomości(?=($|"|<))', "$1" + "Wiadōmości w archiwōm");
    d = r(d, '(^|="|>)Tylko za pośrednictwem poczty e-mail(?=($|"|<))', "$1" + "Ino bez e-mail");
    d = r(d, '(^|="|>)Wysłane wiadomości(?=($|"|<))', "$1" + "Wysłane wiadōmości");
    d = r(d, '(^|="|>)Brak wiadomości(?=($|"|<))', "$1" + "Niy ma żŏdnych wiadōmości");
    d = r(d, '(^|="|>)Usuń(?=($|"|<))', "$1" + "Wyciep");
    d = r(d, '(^|="|>) także lubi to\\.(?=($|"|<))', "$1" + " tyż tymu przaje.");
    d = r(d, '(^|="|>)Oznacz jako nieprzeczytane(?=($|"|<))', "$1" + "Ôznŏcz jako niyczytanŏ");
    d = r(d, '(^|="|>)Oznacz jako przeczytane(?=($|"|<))', "$1" + "Ôznŏcz jako przeczytanŏ");
    d = r(d, '(^|="|>)Zarchiwizuj(?=($|"|<))', "$1" + "Przekludź do archiwōm");
    d = r(d, '(^|="|>)Szukaj wiadomości(?=($|"|<))', "$1" + "Szukej wiadōmości");
    d = r(d, '(^|="|>)Wyślij wiadomość(?=($|"|<))', "$1" + "Wyślij wiadōmość");
    d = r(d, '(^|="|>)Inne(?=($|"|<))', "$1" + "Inksze");
    d = r(d, '(^|="|>)Nieprzeczytane(?=($|"|<))', "$1" + "Niyczytane");
    d = r(d, '(^|="|>)Zarchiwizowane(?=($|"|<))', "$1" + "W archiwōm");
    d = r(d, '(^|="|>)Zobacz\\:(?=($|"|<))', "$1" + "Ôbezdrzij:");
    d = r(d, '(^|="|>)Załaduj starsze wątki(?=($|"|<))', "$1" + "Laduj starsze rozmowy");
    d = r(d, '(^|="|>)Polecane strony(?=($|"|<))', "$1" + "Rekōmandowane strōny");
    d = r(d, '(^|="|>)Strony i reklamy(?=($|"|<))', "$1" + "Strōny i reklamy");
    d = r(d, '(^|="|>)Proponowane grupy(?=($|"|<))', "$1" + "Rekōmandowane skupiny");
    d = r(d, '(^|="|>)Polub tę stronę(?=($|"|<))', "$1" + "Przajã tyj strōnie");
    d = r(d, '(^|="|>)Utwórz wydarzenie(?=($|"|<))', "$1" + "Nowe przitrefiyniy");
    d = r(d, '(^|="|>)Pokaż wcześniejsze komentarze(?=($|"|<))', "$1" + "Pokŏż kōmyntŏrze pisane zawczasu");
    d = r(d, '(^|="|>)Lubisz to\\!(?=($|"|<))', "$1" + "Ty tymu przajesz");
    d = r(d, '(^|="|>)Pokaż udostępnioną zawartość(?=($|"|<))', "$1" + "Pokŏż, fto to rekōmanduje");
    d = r(d, '(^|="|>)Dołącz do grupy(?=($|"|<))', "$1" + "Przistōmp do skupiny");
    d = r(d, '(^|="|>)Kliknięcia \\„Lubię to\\”(?=($|"|<))', "$1" + "Czymu przaje");
    d = r(d, '(^|="|>)Narodziny(?=($|"|<))', "$1" + "Gyburstag");
    d = r(d, '(^|="|>)LISTY(?=($|"|<))', "$1" + "LISTY");
    d = r(d, '(^|="|>)Zmień zdjęcie w tle(?=($|"|<))', "$1" + "Nowy zadni bild");
    d = r(d, '(^|="|>)Edytuj zdjęcie profilowe(?=($|"|<))', "$1" + "Edytuj profilowy ôbrŏzek");
    d = r(d, '(^|="|>)Subskrypcje(?=($|"|<))', "$1" + "Subskrypcyje");
    d = r(d, '(^|="|>)Zaktualizuj informacje(?=($|"|<))', "$1" + "Ôdnōw informacyje");
    d = r(d, '(^|="|>)Dziennik aktywności(?=($|"|<))', "$1" + "Dziynnik działaniŏ");
    d = r(d, '(^|="|>)Wyświetl jako\.\.\.(?=($|"|<))', "$1" + "Pokŏż jako...");
    d = r(d, '(^|="|>)Dodaj wizytówkę do swojej strony(?=($|"|<))', "$1" + "Dodej boks kludzōncy do tyj strōny");
    d = r(d, '(^|="|>)Opublikuj(?=($|"|<))', "$1" + "Ôpublikuj");
    d = r(d, '(^|="|>)Prześlij zdjęcie / film(?=($|"|<))', "$1" + "Prziślij bild abo film");
    d = r(d, '(^|="|>)Skorzystaj z kamery internetowej(?=($|"|<))', "$1" + "Użyj kamery internetowyj");
    d = r(d, '(^|="|>)Utwórz album ze zdjęciami(?=($|"|<))', "$1" + "Stwōrz albōm z bildami");
    d = r(d, '(^|="|>)Zapytaj o coś\.\.\.(?=($|"|<))', "$1" + "Zapytej ô cosik...");
    d = r(d, '(^|="|>)Dodaj opcję\.\.\.(?=($|"|<))', "$1" + "Dodej możność");
    d = r(d, '(^|="|>)Dodaj opcje ankiety(?=($|"|<))', "$1" + "Dodej możności ankyty");
    d = r(d, '(^|="|>)Zezwalaj wszystkim na dodawanie opcji(?=($|"|<))', "$1" + "Zwōl swobodnie dodować inksze możności");
    d = r(d, '(^|="|>)Tylko ja(?=($|"|<))', "$1" + "Ino jŏ");
    d = r(d, '(^|="|>)Znajomi poza dalszymi znajomymi(?=($|"|<))', "$1" + "Kamraty bez dalszych kamratōw");
    d = r(d, '(^|="|>)Ustawienie niestandardowe(?=($|"|<))', "$1" + "Inakszyj");
    d = r(d, '(^|="|>)Wróć(?=($|"|<))', "$1" + "Nazŏd");
    d = r(d, '(^|="|>)Dalsi znajomi(?=($|"|<))', "$1" + "Dalsze kamraty");
    d = r(d, '(^|="|>) w pobliżu\\: (?=($|"|<))', "$1" + " wele ");
    d = r(d, '(^|="|>)Ulubione(?=($|"|<))', "$1" + "Wertowne");
    d = r(d, '(^|="|>)Niedawne(?=($|"|<))', "$1" + "Niydŏwne");
    d = r(d, '(^|="|>)Dołącz(?=($|"|<))', "$1" + "Przistōmp");
    d = r(d, '(^|="|>)Więcej ostatniej aktywności(?=($|"|<))', "$1" + "Pokŏż wiyncyj");
    d = r(d, '(^|="|>)Zobacz wszystkie listy\.\.\.(?=($|"|<))', "$1" + "Ôbezdrzij wszyjske listy...");
    d = r(d, '(^|="|>)Zobacz wszystkie(?=($|"|<))', "$1" + "Ôbezdrzij wszyjske");
    d = r(d, '(^|>) \\(([0-9,]+) zdjęcie\\)(?=($|<))', "$1" + " (" + "$2" + " bild)");
    d = r(d, '(^|>) \\(([0-9,]+) zdjęcia\\)(?=($|<))', "$1" + " (" + "$2" + " bildy)");
    d = r(d, '(^|>) \\(([0-9,]+) zdjęć\\)(?=($|<))', "$1" + " (" + "$2" + " bildōw)");
    d = r(d, '(^|>) \\(([0-9,]+) zdjęć\\)(?=($|<))', "$1" + " (" + "$2" + " bildōw)");
    d = r(d, '(^|="|>)([0-9,]+) osób(?=($|"|<))', "$1" + "$2" + " ludzi");
    d = r(d, '(^|="|>)([0-9,]+) osoby(?=($|"|<))', "$1" + "$2" + " ludzi");
    d = r(d, '(^|="|>) lubi to\.(?=($|"|<))', "$1" + " przaje tymu.");
    d = r(d, '(^|="|>) lubią to\.(?=($|"|<))', "$1" + " przaje tymu.");
    d = r(d, '(^|="|>)([0-9,]+) osób o tym mówi(?=($|"|<))', "$1" + "$2" + " ludzi ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1" + "$2" + " ludzi ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1" + "$2" + " ludzi tymu przaje, a " + "$3" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1" + "$2" + " ludzi tymu przaje, a " + "$3" + "." + "$4" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+).([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + "." + "$5" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + "." + "$5" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + "." + "$5" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+).([0-9,]+) osób o tym mówi(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + "." + "$5" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osób lubi to \\· ([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+) osób o tym mówi(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)([0-9,]+).([0-9,]+) osoby lubią to \\· ([0-9,]+) osoby o tym mówią(?=($|"|<))', "$1" + "$2" + "." + "$3" + " ludzi tymu przaje, a " + "$4" + " ô tym gŏdŏ");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " je na bildzie ôd " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " je na bildzie ôd " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) na zdjęciu użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " je na bildzie ôd " + "$3" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1" + "$2" + " je na " + "$3" + " bildzie</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1" + "$2" + " je na " + "$3" + " bildzie</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) w obiekcie (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>) z tego miesiąca\.(?=($|"|<))', "$1" + "$2" + " je na " + "$3" + " bildzie</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " je na " + "$3" + " bildzie</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " je na " + "$3" + " bildzie</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został\\(a\\) oznaczony\\(a\\) na (<a [^>]+>)bild</a> użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " je na " + "$3" + " bildzie</a>" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) został oznaczony w albumie (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " je na bildach w albōmie " + "$3" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) została oznaczona w albumie (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + "$2" + " je na bildach w albōmie " + "$3" + " ôd " + "$4" + ".");
    d = r(d, '(^|="|>) \\— z użytkownikiem (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " z " + "$2" + ".");
    d = r(d, '(^|="|>) \\— z użytkownikiem (<a [^>]+>[^<]+</a>) w miejscu (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " z " + "$2" + " we " + "$3" + ".");
    d = r(d, '(^|="|>)Twoja bliska rodzina lub rodzina wielopokoleniowa\. (?=($|"|<))', "$1" + "Bliskŏ familijŏ ôd Ciebie abo familijŏ, co mŏ wiyncyj genyracyjōw. ");
    d = r(d, '(^|="|>)Dowiedz się więcej(?=($|"|<))', "$1" + "Wiyncyj informacyjōw");
    d = r(d, '(^|="|>)Na tej liście \\(([0-9,]+)\\)(?=($|"|<))', "$1" + "Na tyj liście" + " ($2)");
    d = r(d, '(^|="|>)Dodaj krewnych do tej listy(?=($|"|<))', "$1" + "Dodej familijã do tyj listy");
    d = r(d, '(^|="|>)Najbliżsi znajomi, o których chcesz widzieć więcej informacji\. (?=($|"|<))', "$1" + "Nŏjbliższe kamraty, z kerymi chcesz mieć nŏjwiynkszy kōntakt. ");
    d = r(d, '(^|="|>)Pokaż sugestie znajomych dla listy\.(?=($|"|<))', "$1" + "Pokŏż fto by jeszcze mōg być na tyj liście.");
    d = r(d, '(^|="|>)Strony polecane(?=($|"|<))', "$1" + "Rekōmandowane strōny");
    d = r(d, '(^|="|>)Ukryj propozycje(?=($|"|<))', "$1" + "Skryj");
    d = r(d, '(^|="|>)Proponowane osoby(?=($|"|<))', "$1" + "Propōnowane osoby");
    d = r(d, '(^|="|>)Album\\:(?=($|"|<))', "$1" + " Albōm:");
    d = r(d, '(^|="|>)Dodaj znacznik do zdjęcia(?=($|"|<))', "$1" + "Ôznŏcz bild");
    d = r(d, '(^|="|>)Dodaj lokalizację(?=($|"|<))', "$1" + "Dodej plac");
    d = r(d, '(^|="|>)Zakończono oznaczanie(?=($|"|<))', "$1" + "Ôznŏczaniy gotowe");
    d = r(d, '(^|="|>)Gdzie zostało zrobione to zdjęcie\\?(?=($|"|<))', "$1" + "Kaj tyn bild bōł zrobiōny?");
    d = r(d, '(^|="|>)Kliknij zdjęcie, aby zacząć oznaczanie(?=($|"|<))', "$1" + "Kliknij w bild, coby ôznaczyć");
    d = r(d, '(^|="|>)Pobierz(?=($|"|<))', "$1" + "Symnij");
    d = r(d, '(^|="|>)Zgłoś to zdjęcie(?=($|"|<))', "$1" + "Zgłoś bild");
    d = r(d, '(^|="|>)([0-9,]+) znajomych(?=($|"|<))', "$1" + "$2" + " kamratōw");
    d = r(d, '(^|="|>) lubi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " przaje " + "$2" + "owi.");
    d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " rekōmanduje " + "$2" + ".");
    d = r(d, '(^|="|>) udostępnił (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " rekōmanduje " + "$2" + " ôd " + "$3" + ".");
    d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " rekōmanduje " + "$2" + " ôd " + "$3" + ".");
    d = r(d, '(^|="|>) udostępniła (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " rekōmanduje " + "$2" + " ôd " + "$3" + ".");
    d = r(d, '(^|="|>) skomentował\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " skōmyntowoł " + "$2" + ".");
    d = r(d, '(^|="|>) skomentowała\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " skōmyntowała " + "$2" + ".");
    d = r(d, '(^|="|>) odpowiedział\\(a\\) na pytanie\.(?=($|"|<))', "$1" + " ôdpedzioł(ała) na pytaniy.");
    d = r(d, '(^|="|>) udostępnił\\(a\\) (<a [^>]+>[^<]+</a>) dzięki użytkownikowi (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " rekōmanduje " + "$2" + " ôd " + "$3" + ".");
    d = r(d, '(^|="|>) dołączył do grona znajomych użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " je terŏzki postrzōd kamratōw ôd " + "$2" + ".");
    d = r(d, '(^|="|>) dołączyła do grona znajomych użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " je terŏzki postrzōd kamratōw ôd " + "$2" + ".");
    d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zaktualizował swoje  (<a [^>]+>)zdjęcie w tle</a>\.(?=($|"|<))', "$1" + "$2" + " mŏ nowy zadni bild. ");
    d = r(d, '(^|="|>)Pliki(?=($|"|<))', "$1" + "Zbiory");
    d = r(d, '(^|="|>)Dodaj plik(?=($|"|<))', "$1" + "Dodej zbiōr");
    d = r(d, '(^|="|>)Przestań obserwować post(?=($|"|<))', "$1" + "Niy subskrybuj postu");
    d = r(d, '(^|="|>)Napisz coś\.\.\.(?=($|"|<))', "$1" + "Napisz cosik...");
    d = r(d, '(^|="|>)Studiował w\\: (?=($|"|<))', "$1" + "Sztudiyrowoł we: ");
    d = r(d, '(^|="|>)Mieszka w\\: (?=($|"|<))', "$1" + "Miyszkŏ we: ");
    d = r(d, '(^|="|>)Mieszka w\\:(?=($|"|<))', "$1" + "Miyszkŏ we:");
    d = r(d, '(^|="|>)Strony(?=($|"|<))', "$1" + "Strōny");
    d = r(d, '(^|="|>)Ulubione cytaty(?=($|"|<))', "$1" + "Moje cytacyje");
    d = r(d, '(^|="|>)Dodaj ulubiony cytat(?=($|"|<))', "$1" + "Dodej wertownõ wedle Ciebie cytacyjã");
    d = r(d, '(^|="|>)Telefony komórkowe(?=($|"|<))', "$1" + "Mobiniŏki");
    d = r(d, '(^|="|>)Dane kontaktowe(?=($|"|<))', "$1" + "Kōntakt");
    d = r(d, '(^|="|>)Języki(?=($|"|<))', "$1" + "Mŏwy");
    d = r(d, '(^|="|>)Data urodzenia(?=($|"|<))', "$1" + "Gyburstag");
    d = r(d, '(^|="|>)Status związku(?=($|"|<))', "$1" + "Mŏ kogŏ?");
    d = r(d, '(^|="|>)W związku(?=($|"|<))', "$1" + "Ja");
    d = r(d, '(^|="|>)Podstawowe informacje(?=($|"|<))', "$1" + "Nŏjważniyjsze informacyje");
    d = r(d, '(^|="|>)Informacje o Tobie(?=($|"|<))', "$1" + "Pŏrã słōw ô Ciebie");
    d = r(d, '(^|="|>)Napisz o sobie(?=($|"|<))', "$1" + "Napisz ô siebie");
    d = r(d, '(^|="|>)Kobieta(?=($|"|<))', "$1" + "Kobiyta");
    d = r(d, '(^|="|>)Mężczyzna(?=($|"|<))', "$1" + "Chop");
    d = r(d, '(^|="|>)Miejsce zamieszkania(?=($|"|<))', "$1" + "Plac pomiyszkaniŏ");
    d = r(d, '(^|="|>)Miasto rodzinne(?=($|"|<))', "$1" + "Miasto ôd familije");
    d = r(d, '(^|="|>)Historia \\(wg lat\\)(?=($|"|<))', "$1" + "Gyszichta wedle lŏt");
    d = r(d, '(^|="|>)Wykształcenie i praca(?=($|"|<))', "$1" + "Bildōng i robota");
    d = r(d, '(^|="|>)Obserwuj post(?=($|"|<))', "$1" + "Subskrybuj post");
    d = r(d, '(^|="|>)Odwiedzenie ([0-9,]+) miejsc(?=($|"|<))', "$1" + "Byzuch we " + "$2" + " placach");
    d = r(d, '(^|="|>)([0-9,]+) zdjęcia(?=($|"|<))', "$1" + "$2" + " bildy");
    d = r(d, '(^|="|>)([0-9,]+) zdjęć(?=($|"|<))', "$1" + "$2" + " bildōw");
    d = r(d, '(^|="|>)([0-9,]+) zdjęcie(?=($|"|<))', "$1" + "$2" + " bild");
    d = r(d, '(^|="|>) był\\(a\\) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " je we " + "$2" + ".");
    d = r(d, '(^|="|>) był\\(a\\) z użytkownikiem (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " je ze " + "$2" + "  we " + "$3" + ".");
    d = r(d, '(^|="|>) dodała (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1" + " dodała " + "$2" + " do albōmu " + "$3" + ".");
    d = r(d, '(^|="|>) dodał (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1" + " dodoł " + "$2" + " do albōmu " + "$3" + ".");
    d = r(d, '(^|="|>) dodał\\(a\\) (<a [^>]+>[^<]+</a>) do albumu \\„(<a [^>]+>[^<]+</a>)\\”\.(?=($|"|<))', "$1" + " dodoł(ała) " + "$2" + " do albōmu " + "$3" + ".");
    d = r(d, '(^|="|>) był\\(a\\) z\\: (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + ", " + "$2" + " i " + "$3" + " byli we " + "$4" + ".");
    d = r(d, '(^|="|>) był\\(a\\) z użytkownikami (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) w miejscu\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + ", " + "$2" + " i " + "$3" + " byli we " + "$4" + ".");
    d = r(d, '(^|="|>) zaktualizował\\(a\\) swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " mŏ nowy " + "$2" + ".");
    d = r(d, '(^|="|>) zaktualizował swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " mŏ nowy " + "$2" + ".");
    d = r(d, '(^|="|>) zaktualizowała swoje (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1" + " mŏ nowy " + "$2" + ".");
    d = r(d, '(^|="|>)zdjęcie w tle(?=($|"|<))', "$1" + "zadni bild");
    d = r(d, '(^|="|>)zdjęcie profilowe(?=($|"|<))', "$1" + "profilowy ôbrŏzek");
    d = r(d, '(^|="|>)Przejdź do trybu online(?=($|"|<))', "$1" + "Przejdź onlajn");
    d = r(d, ' korzysta obecnie z wersji serwisu Facebook w języku\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', " używŏ Facebooka w wersyji: " + "$1" + ".");
    d = r(d, '(^|="|>)Zdjęcia i filmy(?=($|"|<))', "$1" + "Bildy i wideo");
    d = r(d, '(^|="|>)Wszystkie(?=($|"|<))', "$1" + "Wszyjske");
    d = r(d, '(^|="|>)Tylko dokumenty(?=($|"|<))', "$1" + "Ino dokumynty");
    d = r(d, '(^|="|>)Tylko pliki(?=($|"|<))', "$1" + "Ino zbiory");
    d = r(d, '(^|="|>)Utwórz dokument(?=($|"|<))', "$1" + "Stwōrz dokumynt");
    d = r(d, '(^|="|>)Porozmawiaj na czacie z grupą(?=($|"|<))', "$1" + "Gŏdej na czacie ze skupinōm");
    d = r(d, '(^|="|>)Dodaj do ulubionych(?=($|"|<))', "$1" + "Dodej do wertownych");
    d = r(d, '(^|="|>)Edytuj grupę(?=($|"|<))', "$1" + "Edytuj skupinã");
    d = r(d, '(^|="|>)Zgłoś grupę(?=($|"|<))', "$1" + "Zgłoś skupinã");
    d = r(d, '(^|="|>)Opuść grupę(?=($|"|<))', "$1" + "Wylyź ze skupiny");
    d = r(d, '(^|="|>)Brak wyników(?=($|"|<))', "$1" + "Tyn plac je pusty");
    d = r(d, '(^|="|>)W tej grupie nie ma zdjęć i filmów.(?=($|"|<))', "$1" + "W tyj skupinie niy ma bildōw ani wideo.");
    d = r(d, '(^|="|>)Jeszcze w tym tygodniu(?=($|"|<))', "$1" + "W tym tydniu");
    d = r(d, '(^|="|>)W następnym tygodniu(?=($|"|<))', "$1" + "W nŏstympnym tydniu");
    d = r(d, '(^|="|>)W tym miesiącu(?=($|"|<))', "$1" + "W tym miesiōncu");
    d = r(d, '(^|="|>)W zeszłym tygodniu(?=($|"|<))', "$1" + "Ôński tydziyń");
    d = r(d, '(^|="|>)Minione wydarzenia(?=($|"|<))', "$1" + "Dŏwne przitrefiynia");
    d = r(d, '(^|="|>)Nadchodzące wydarzenia(?=($|"|<))', "$1" + "Prziszłe przitrefiynia");
    d = r(d, '(^|="|>)Proponowane wydarzenia(?=($|"|<))', "$1" + "Forszlagowane przitrefiynia");
    d = r(d, '(^|="|>)Odrzucone wydarzenia(?=($|"|<))', "$1" + "Ôdciepniynte przitrefiynia");
    d = r(d, '(^|="|>)Urodziny(?=($|"|<))', "$1" + "Gyburstagi");
    d = r(d, '(^|="|>)Eksportuj zdarzenia\.\.\.(?=($|"|<))', "$1" + "Eksportuj przitrefiynia...");
    d = r(d, '(^|="|>) \\· Lubisz tę stronę\.(?=($|"|<))', "$1" + "· Przajesz tyj strōnie.");
    d = r(d, '(^|="|>)Organizowane przez\\: (?=($|"|<))', "$1" + "Rychtowane ôd: ");
    d = r(d, '(^|="|>)Ukryj zdarzenie(?=($|"|<))', "$1" + "Skryj");
    d = r(d, '(^|="|>)Zgłoś zdarzenie lub spam(?=($|"|<))', "$1" + "Zgłoś, że niyôdpednie, abo że spam");
    d = r(d, '(^|="|>)Wszystkie zdarzenia(?=($|"|<))', "$1" + "Wszyjske przitrefiynia");
    d = r(d, '(^|="|>)Większość zdarzeń(?=($|"|<))', "$1" + "Wiyncyj przitrefiyń");
    d = r(d, '(^|="|>)Tylko ważne(?=($|"|<))', "$1" + "Ino nŏjważniyjsze");
    d = r(d, '(^|="|>)Edytuj ustawienia(?=($|"|<))', "$1" + "Edytuj nasztalowania");
    d = r(d, '(^|="|>)Zarchiwizuj listę(?=($|"|<))', "$1" + "Przeniyś do archiwōm");
    d = r(d, '(^|="|>)Polecane wydarzenia(?=($|"|<))', "$1" + "Rekōmandowane przitrefiynia");
    d = r(d, '(^|="|>)Zapytaj znajomych(?=($|"|<))', "$1" + "Spytej kamratōw");
    d = r(d, '(^|="|>)Zobacz(?=($|"|<))', "$1" + "Ôbezdrzij");
    d = r(d, '(^|="|>)Inni(?=($|"|<))', "$1" + "Inksi");
    d = r(d, '(^|="|>)Zadał\\(a\\)(?=($|"|<))', "$1" + "Pytŏ");
    d = r(d, '(^|="|>)([0-9,]+) więcej(?=($|"|<))', "$1" + "$2" + " wiyncyj");
    d = r(d, '(^|="|>)wydarzenia \\(([0-9,]+)\\)(?=($|"|<))', "$1" + "przitrefiynia - " + "$2");
    d = r(d, '(^|="|>) w tym tygodniu(?=($|"|<))', "$1" + " w tym tydniu");
    d = r(d, '(^|="|>)Znajomi \\(([0-9,]+)\\)(?=($|"|<))', "$1" + "$2" + " kamratōw");
    d = r(d, '(^|="|>)Sztuka i rozrywka(?=($|"|<))', "$1" + "Kōnszt i szpas");
    d = r(d, '(^|="|>)Ulubione zajęcia i zainteresowania(?=($|"|<))', "$1" + "Ôbmiyłowania");
    d = r(d, '(^|="|>)Ma ([0-9,]+) znajomych na Facebooku\.(?=($|"|<))', "$1" + "Mŏ " + "$2" + " kamratōw na Facebooku.");
    d = r(d, '(^|="|>)Edytuj opcje(?=($|"|<))', "$1" + "Miyń możności");
    d = r(d, '(^|="|>)Obserwuj(?=($|"|<))', "$1" + "Óbserwuj");
    d = r(d, '(^|="|>)Ustawienia powiadomień(?=($|"|<))', "$1" + "Nasztalowania nowin");
    d = r(d, '(^|="|>)Twoje powiadomienia(?=($|"|<))', "$1" + "Twoje nowiny");
    d = r(d, '(^|="|>)Więcej zdarzeń(?=($|"|<))', "$1" + "Wiyncyj");
    d = r(d, '(^|="|>)Poleć jej znajomych(?=($|"|<))', "$1" + "Forszlaguj kamratōw");
    d = r(d, '(^|="|>)Poleć mu znajomych(?=($|"|<))', "$1" + "Forszlaguj kamratōw");
    d = r(d, '(^|="|>)Pomóż znajomemu(?=($|"|<))', "$1" + "Pōmōż kamratōm");
    d = r(d, '(^|="|>)Złóż życzenia(?=($|"|<))', "$1" + "Powinszuj");
    d = r(d, '(^|="|>)Zaczepki(?=($|"|<))', "$1" + "Napasztowaniy");
    d = r(d, '(^|="|>)Zaczep(?=($|"|<))', "$1" + "Napasztuj");
    d = r(d, '(^|="|>)Telewizja(?=($|"|<))', "$1" + "Telewizyjŏ");
    d = r(d, '(^|="|>)Książki(?=($|"|<))', "$1" + "Ksiōnżki");
    d = r(d, '(^|="|>)Szkoła średnia(?=($|"|<))', "$1" + "Strzedniŏ szkoła");
    d = r(d, '(^|="|>)Pracodawcy(?=($|"|<))', "$1" + "Robota");
    d = r(d, '(^|="|>)Usuń podgląd(?=($|"|<))', "$1" + "Wyciep podglōnd");
    d = r(d, '(^|="|>)Dodaj znajomych do czatu\.\.\.(?=($|"|<))', "$1" + "Dodej kamratōw do czatu...");
    d = r(d, '(^|="|>)Zobacz pełną konwersację(?=($|"|<))', "$1" + "Óbezdrzij cŏłkõ rozmŏwã");
    d = r(d, '(^|="|>)Wyczyść okno(?=($|"|<))', "$1" + "Wysnoż ôkno");
    d = r(d, '(^|="|>)Music(?=($|"|<))', "$1" + "Muzyka");
    d = r(d, '(^|="|>)Menedżer reklam(?=($|"|<))', "$1" + "Mynedżer werbōngōw");
    d = r(d, '(^|="|>)Dziś są jej urodziny\.(?=($|"|<))', "$1" + "Dzisiej mŏ gyburstag.");
    d = r(d, '(^|="|>)Dziś są jego urodziny\.(?=($|"|<))', "$1" + "Dzisiej mŏ gyburstag.");
    d = r(d, '(^|="|>)Inne wiadomości(?=($|"|<))', "$1" + "Inksze wiadōmości");
    d = r(d, '(^|="|>)Właściciele strony(?=($|"|<))', "$1" + "Włŏszczyzna ôd");
    d = r(d, '(^|="|>)Tablica&nbsp;(?=($|"|<))', "$1" + "Ściana&nbsp;");
    d = r(d, '(^|="|>)Informacje&nbsp;(?=($|"|<))', "$1" + "Informacyje&nbsp;");
    d = r(d, '(^|="|>)Zdjęcia&nbsp;(?=($|"|<))', "$1" + "Bildy&nbsp;");
    d = r(d, '(^|="|>)Znajomi&nbsp;(?=($|"|<))', "$1" + "Kamraty&nbsp;");
    d = r(d, '(^|="|>)Subskrypcje&nbsp;(?=($|"|<))', "$1" + "Subskrypcyje&nbsp;");
    d = r(d, '(^|="|>)Data urodzenia\\: ', "$1" + "Gyburstag: ");
    d = r(d, '(^|="|>)Dzisiaj(?=($|"|<))', "$1" + "Dzisiej");
    d = r(d, '(^|="|>)W toku(?=($|"|<))', "$1" + "Terŏzki");
    d = r(d, '(^|="|>)Zobacz\\: (?=($|"|<))', "$1" + "Óbezdrzij: ");
    d = r(d, '(^|="|>)Znajomi na czacie(?=($|"|<))', "$1" + "Kamraty na czacie");
    d = r(d, '(^|="|>)W związku małżeńskim z użytkownikiem\\:(?=($|"|<))', "$1" + "Żyniaty ze/wydanŏ za: ");
    d = r(d, '(^|="|>)Dodaj swoje miejsce pracy(?=($|"|<))', "$1" + "Dopisz plac, kaj robisz");
    d = r(d, '(^|="|>)W związku małżeńskim z użytkownikiem\\: (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1" + "Żyniaty ze/wydanŏ za: " + "$2");
  d = r(d, '(^|="|>)\, aby zobaczyć\, kto jest dostępny na czacie\.(?=($|"|<))', "$1"+", coby óbezdrzeć, fto je na czacie.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) dołączyli do grupy(?=($|"|<))', "$1"+"$2"+" i "+"$3"+" przistōmpiyli do skupiny.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>) użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" przaje "+"$3"+"owi ôd "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) lubi (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" przaje "+"$3"+" i "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) są teraz znajomymi użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" i "+"$3"+" sōm terŏzki kamratami ôd "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) zmieniło swoje zdjęcia profilowe\.(?=($|"|<))', "$1"+"$2"+" i "+"$3"+" mŏ nowe profilowe ôbrŏzki.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zmienił\\(a\\) swoje zdjęcie profilowe\.(?=($|"|<))', "$1"+"$2"+" mŏ nowe profilowy ôbrŏzek.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedział (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" na pytaniy "+"$3"+" ôdpedzioł "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedział (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" na pytaniy "+"$3"+" ôdpedzioł "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedziała (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" na pytaniy "+"$3"+" ôdpedziała "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) na pytanie (<a [^>]+>[^<]+</a>) odpowiedziała (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" na pytaniy "+"$3"+" ôdpedziała "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) lubią\\: (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" i "+"$3"+" przajōm "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>) także to lubią\.(?=($|"|<))', "$1"+"$2"+" i "+"$3"+" tyż tymu przajōm.");
  d = r(d, '(^|="|>)Grupa (<a [^>]+>[^<]+</a>) nie ma żadnych minionych wydarzeń\. (?=($|"|<))', "$1"+"Skupina "+"$2"+" niy mŏ żŏdnych starych przitrefiyń. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) weźmie udział w wydarzeniu \\„(<a [^>]+>[^<]+</a>)\\” \\– (<a [^>]+>[^<]+</a>)\, w miejscu\\:', "$1"+"$2"+" przistympuje do przitrefiyniŏ "+"$3"+" – "+"$4"+", "+"we:");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) zadał\\(a\\) pytanie \\„(<a [^>]+>[^<]+</a>)\\”(?=($|"|<))', "$1"+"$2"+" pytŏ: "+"„"+"$3"+"”");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?1) nowy post opublikowany przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mŏ "+"$3"+" nowy post ôd "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[2-4]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mŏ "+"$3"+" nowe posty ôd "+"$4"+" i "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[5-9]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mŏ "+"$3"+" nowych postōw ôd "+"$4"+" i "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma ([0-9,]+) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>) i (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mŏ "+"$3"+" nowych postōw ôd "+"$4"+" i "+"$5"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[2-4]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mŏ "+"$3"+" nowe posty ôd "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma (1?[5-9]) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mŏ "+"$3"+" nowych postōw ôd "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ma ([0-9,]+) nowych postów opublikowanych przez użytkownika (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" mŏ "+"$3"+" nowych postōw ôd "+"$4"+".");
  d = r(d, '(^|>)Zobacz 1 post więcej użytkownika ', "$1"+"Ôbezdrzij 1 inkszy post ôd ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?1)\\) użytkownika\\: ', "$1"+"Ôbezdrzij "+"$2"+" inkszy post ôd: ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?[2-4])\\) użytkowników\\: ', "$1"+"Ôbezdrzij "+"$2"+" inksze posty ôd: ");
  d = r(d, '(^|>)Zobacz więcej postów \\((1?[5-9])\\) użytkowników\\: ', "$1"+"Ôbezdrzij "+"$2"+" inkszych postōw ôd: ");
  d = r(d, '(^|>)Zobacz więcej postów \\(([0-9,]+)\\) użytkowników\\: ', "$1"+"Ôbezdrzij "+"$2"+" inkszych postōw ôd: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?1)\\) postów użytkownika\\: ', "$1"+"Ôbezdrzij "+"$2"+" inkszy post ôd: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?[2-4])\\) postów użytkownika ', "$1"+"Ôbezdrzij "+"$2"+" inksze posty ôd: ");
  d = r(d, '(^|>)Zobacz więcej \\((1?[5-9])\\) postów użytkownika ', "$1"+"Ôbezdrzij "+"$2"+" inkszych postōw ôd: ");
  d = r(d, '(^|>)Zobacz więcej \\(([0-9,]+)\\) postów użytkownika ', "$1"+"Ôbezdrzij "+"$2"+" inkszych postōw ôd: ");
d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała ôd niyj włŏsny "+"$3"+"link</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swoje własne (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała ôd niyj włŏsny "+"$3"+"bild</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała ôd niyj włŏsny "+"$3"+"post</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała ôd niyj włŏsny "+"$3"+"status</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała swój własny (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała ôd niyj włŏsny "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł ôd niygo włŏsny "+"$3"+"link</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł ôd niygo włŏsny "+"$3"+"bild</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł ôd niygo włŏsny "+"$3"+"post</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł ôd niygo włŏsny "+"$3"+"status</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował swój własny (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł ôd niygo włŏsny "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł twōj "+"$3"+"link</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twoje (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" skōmyntowoł twōj "+"$3"+"bild</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł twōj "+"$3"+"post</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł twōj "+"$3"+"status</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentował twój (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" skōmyntowoł twōj "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)link</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała twōj "+"$3"+"link</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twoje (<a [^>]+>)bild</a>\.(?=($|"|<))', "$1"+"Thug "+"$2"+" skōmyntowała twōj "+"$3"+"bild</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)post</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała twōj "+"$3"+"post</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>)status</a>\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała twōj "+"$3"+"status</a>"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) skomentowała twój (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" skōmyntowała twōj "+"$3"+".");

  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodał post na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" napisoł post we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodała post na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" napisała post we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) dodał\\(a\\) post do grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" napisoł(ała) post we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował Twój wpis na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" skōmyntowoł post ôd Ciebie we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała Twój wpis na stronie grupy (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" skōmyntowała post ôd Ciebie we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentował wpis w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" tyż skōmyntowoł post we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentowała wpis w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" tyż skōmyntowała post we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentował zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" tyż skōmyntowoł bild we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) także skomentowała zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" tyż skōmyntowała bild we skupinie "+"$3");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali post w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" i "+"$3"+" tyż skōmyntowali post we skupinie "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali Twoje zdjęcie w grupie (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" i "+"$3"+" skōmyntowali bild ód ciebie we skupinie "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali status użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" i "+"$3"+" tyż skōmyntowali status ôd "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali Twój status\.', "$1"+"$2"+" i "+"$3"+" skōmyntowali status ód ciebie.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepił Cię\. ', "$1"+"$2"+" cie napasztuje.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepiła Cię\. ', "$1"+"$2"+" cie napasztuje.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) zaczepił\\(a\\) Cię\. ', "$1"+"$2"+" cie napasztuje.");
  d = r(d, '(^|="|>) zaczepił Cię(?=($|"|<))', "$1"+" cie napasztuje.");
  d = r(d, '(^|="|>) zaczepiła Cię(?=($|"|<))', "$1"+" cie napasztuje.");
  d = r(d, '(^|="|>) zaczepił\\(a\\) Cię(?=($|"|<))', "$1"+" cie napasztuje.");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) także skomentowali (<span [^>]+>[^<]+</span>) status\.', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych tyż skōmyntowali status ôd "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) lubi Twój komentarz\\:', "$1"+"$2"+" (kamrat ód "+"$3"+") "+"przaje twojimu kōmyntŏrzowi: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) skomentował link użytkownika (<span [^>]+>[^<]+</span>)\\:', "$1"+"$2"+" (kamrat ód "+"$3"+") "+"skōmyntowoł link ôd "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi Twój komentarz\\:', "$1"+"$2"+" przaje twojimu kōmyntŏrzowi: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" przaje linkowi ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) \\(znajomy użytkownika (<span [^>]+>[^<]+</span>)\\) skomentował\\(a\\) status użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" (kamrat ód "+"$3"+") "+"skōmyntowoł(ała) status ôd "+"$4");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią stronę \\„(<span [^>]+>[^<]+</span>)\\”\.', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych przaje "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych skōmyntowało bild ôd "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali link  użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych skōmyntowało link ôd "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inni \\(([0-9,]+)\\) skomentowali status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych skōmyntowało status ôd "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią Twoje zdjęcie na Tablicy użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych przaje twojimu bildowi na ścianie ôd "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubi album ', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych przaje albōmowi ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i ([0-9,]+) inne osoby lubią Twój komentarz\\: ', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych przaje kōmyntŏrzowi ôd ciebie: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i ([0-9,]+) innych znajomych lubi Twoje zdjęcie\.', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych kamratōw przaje bildowi ôd ciebie: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią zdjęcie użykownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" i "+"$4"+" przajōm bildowi ôd "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią Twój komentarz\\: ', "$1"+"$2"+", "+"$3"+" i "+"$4"+" przajōm kōmyntŏrzowi ôd ciebie: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" przaje bildowi ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) link użytkownika (<span [^>]+>[^<]+</span>)', "$1"+"$2"+" i "+"$3"+" tyż skōmyntowali link ôd "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" i "+"$3"+" przajōm bildowi ôd "+"$4"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) link użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" i "+"$4"+" tyż skōmyntowali link ôd "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią Twój komentarz\\: ', "$1"+"$2"+" i "+"$3"+" przajōm kōmyntŏrzowi ôd ciebie: ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" skōmyntowała bild ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" skōmyntowoł bild ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" skōmyntowała link ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" skōmyntowoł link ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował\\(a\\) status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" skōmyntowoł(ała) status ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentowała status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" skōmyntowała status ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) skomentował status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" skōmyntowoł status ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi status użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+" przaje statusowi ôd "+"$3"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubią zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych przaje bildowi ôd "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i inne osoby \\(([0-9,]+)\\) lubi link użytkownika (<span [^>]+>[^<]+</span>)\.', "$1"+"$2"+", "+"$3"+" i "+"$4"+" inkszych przaje linkowi ôd "+"$5"+".");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>)\, (<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią link użykownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+", "+"$3"+" i "+"$4"+" przajōm linkowi ôd "+"$5"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) także skomentowali\\(ły\\) zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+" i "+"$3"+" tyż skōmyntowali bild ôd "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) lubią link użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+" i "+"$3"+" przajōm linkowi ôd "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) i (<span [^>]+>[^<]+</span>) skomentowali\\(ły\\) zdjęcie użytkownika (<span [^>]+>[^<]+</span>)\. ', "$1"+"$2"+" i "+"$3"+" skōmyntowali(ły) bild ôd "+"$4"+". ");
  d = r(d, '(^|="|>)(<span [^>]+>[^<]+</span>) lubi album ', "$1"+"$2"+" przaje albōmowi ");

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