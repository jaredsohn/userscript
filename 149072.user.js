// ==UserScript==
// @name        YouTube-csb
// @namespace   http://userscripts.org/users/479052
// @description Translates YouTube to Kashubian 
// @include     http*://*.youtube.*/*
// @include     http*://youtube.*/*

// @version     0.1
// ==/UserScript==

// Last updated:   2012-09-26
// Translations:   Mateusz Meyer - www.tites.kaszubia.com

/*
 *  Copyright 2012 Kevin Scannell, Grzegorz Kulik, Mateusz Meyer
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

// main page
  d = r(d, '\"Strona główna YouTube\"', "\"Przédnô starna YouTube\"");
  d = r(d, '(^|="|>)Zaloguj się(?=($|"|<))', "$1"+"Sparłączë");
  d = r(d, '(^|="|>)Przeglądaj(?=($|"|<))', "$1"+"Przezérôj");
  d = r(d, '(^|="|>)Prześlij film(?=($|"|<))', "$1"+"Przeslë film");
  d = r(d, '(^|="|>) Reklama (?=($|"|<))', "$1"+"Reklama");
  d = r(d, '(^|="|>)    Kategorie YouTube\n(?=($|"|<))', "$1"+"Kategòrie YouTube");
  d = r(d, '(^|="|>)\nZaloguj się\\, by dodać kanały do strony głównej\n      (?=($|"|<))', "$1"+"Sparłączë, cobë dodac kanałë do przédny starnë.");
  d = r(d, '(^|="|>)Szukaj(?=($|"|<))', "$1"+"Nalézë");
  d = r(d, '(^|="|>)Zaloguj się (?=($|"|<))', "$1"+"Sparłączë");
  d = r(d, '(^|="|>)Załóż konto (?=($|"|<))', "$1"+"Òdemknij kònto");
  d = r(d, '(^|="|>)\nKategorie YouTube\n          (?=($|"|<))', "$1"+"Kategòrie YouTube");
  d = r(d, '(^|="|>)\n          Trendy\n      (?=($|"|<))', "$1"+"Mòdné");
  d = r(d, '(^|="|>)\n          Rozrywka\n      (?=($|"|<))', "$1"+"Szpas");
  d = r(d, '(^|="|>)\n          Sport\n      (?=($|"|<))', "$1"+"Spòrt");
  d = r(d, '(^|="|>)\n          Śmieszne\n      (?=($|"|<))', "$1"+"Smiészné");
  d = r(d, '(^|="|>)\n          Film i animacja\n      (?=($|"|<))', "$1"+"Film ë animacjô");
  d = r(d, '(^|="|>)\n          Gry\n      (?=($|"|<))', "$1"+"Jigrë");
  d = r(d, '(^|="|>)zobacz wszystko(?=($|"|<))', "$1"+"òbezdrzi wszëtkò");
  d = r(d, '(^|="|>)\nWybrane dla Ciebie »\n      (?=($|"|<))', "$1"+"Òbróné dlô Ce");
  d = r(d, '(^|="|>)\nPolecane\n    (?=($|"|<))', "$1"+"Bédowóné");
  d = r(d, '(^|="|>)\n przesłał\\(a\\) film\n\n\n\n              (?=($|"|<))', "$1"+" przesłôł(ała) film");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pòmòc");
  d = r(d, '(^|="|>)Informacje(?=($|"|<))', "$1"+"Wëdowiédza ò YouTube");
  d = r(d, '(^|="|>)Centrum prasowe(?=($|"|<))', "$1"+"Gazétny ceńter");
  d = r(d, '(^|="|>)Prawa autorskie(?=($|"|<))', "$1"+"Ùsôdzkòwé prawa");
  d = r(d, '(^|="|>)Twórcy i partnerzy(?=($|"|<))', "$1"+"Ùsôdcowie ë wespółrobòtnicë");
  d = r(d, '(^|="|>)Reklamy(?=($|"|<))', "$1"+"Reklamë");
  d = r(d, '(^|="|>)Programiści(?=($|"|<))', "$1"+"Programiscë");
  d = r(d, '(^|="|>)Bezpieczeństwo(?=($|"|<))', "$1"+"Bezpiek");
  d = r(d, '(^|="|>)Zgłoś błąd(?=($|"|<))', "$1"+"Zgłoszë felã");
  d = r(d, '(^|="|>)Spróbuj czegoś nowego\\!(?=($|"|<))', "$1"+"Spróbùjë czegòs nowégò!");
  d = r(d, '(^|="|>)\nJęzyk\\:\n          \n  (?=($|"|<))', "$1"+"Jãzëk: ");
  d = r(d, '(^|="|>)Polski (?=($|"|<))', "$1"+"Kaszëbsczi ");
  d = r(d, '(^|="|>)\nLokalizacja\\:\n          \n  (?=($|"|<))', "$1"+"Môlezna: ");
  d = r(d, '(^|="|>)Czechy (?=($|"|<))', "$1"+"Czechë");
  d = r(d, '(^|="|>)\nTryb bezpieczny\\:\n          \n  (?=($|"|<))', "$1"+"Bezpieczny trib: ");
  d = r(d, '(^|="|>)Wyłączony\n (?=($|"|<))', "$1"+"Wëłączony");
  d = r(d, '(^|="|>)Włączony\n (?=($|"|<))', "$1"+"Włączony");
  d = r(d, '(^|="|>)\n            Tryb bezpieczny jest teraz włączony\\.\n    (?=($|"|<))', "$1"+"Prawie dzejô bezpieczny trib.");
  d = r(d, '(^|="|>)\n            Tryb bezpieczny został wyłączony\n    (?=($|"|<))', "$1"+"Bezpieczny trib òstół wëłączony.");
  d = r(d, '(^|="|>)\nwięcej\n              (?=($|"|<))', "$1"+"Wicy");
  d = r(d, '(^|="|>)\nmniej\n              (?=($|"|<))', "$1"+"Mni");
  d = r(d, '(^|="|>)\nSubskrypcje\n            (?=($|"|<))', "$1"+"Subskripcje");
  d = r(d, '(^|="|>)Przeglądaj kanały (?=($|"|<))', "$1"+"Przezérôj kanałë ");
  d = r(d, '(^|="|>)\n            Uaktualnij konto\n          (?=($|"|<))', "$1"+"Òdnowi kònto");
  d = r(d, '(^|="|>)Mój kanał(?=($|"|<))', "$1"+"Mój kanôł");
  d = r(d, '(^|="|>)Moje filmy(?=($|"|<))', "$1"+"Mòje filmë");
  d = r(d, '\"Filmy przesłane przez Ciebie\"', "\"Filmë przesłóné bez Cebie\"");
  d = r(d, '(^|="|>)Lubiane(?=($|"|<))', "$1"+"Ùwidzoné");
  d = r(d, '\"Filmy wskazane przez Ciebie jako lubiane\"', "\"Filmë òznôczoné bez Ce jakno ùwidzoné\"");
  d = r(d, '(^|="|>)Historia(?=($|"|<))', "$1"+"Historiô");
  d = r(d, '\"Filmy obejrzane przez Ciebie\"', "\"Filmë òbezdrzoné bez Cebie\"");
  d = r(d, '(^|="|>)Do obejrzenia(?=($|"|<))', "$1"+"Do òbezdrzeniô");
  d = r(d, '\"Filmy dodane do Twojej listy Do obejrzenia\"', "\"Filmë dodóné do Twòji lëstë \"Do òbezdrzeniô\"");
  d = r(d, '(^|="|>)\nSubskrypcje\n      (?=($|"|<))', "$1"+"Subskripcje");
  d = r(d, '(^|="|>)Subskrypcje\\: ([0-9,]+)\n(?=($|"|<))', "$1"+"Subskripcje: "+"$2");
  d = r(d, '(^|="|>)\n\nPokaż tylko przesłane filmy\n  (?=($|"|<))', "$1"+"Pòkôżë leno przesłóné filmë");
  d = r(d, '(^|="|>)Widok (?=($|"|<))', "$1"+"Widnik");
  d = r(d, '(^|="|>)Najważniejsze wydarzenia(?=($|"|<))', "$1"+"Nôwôżniészé rozegracje");
  d = r(d, '(^|="|>)Wszystko(?=($|"|<))', "$1"+"Wszëtkò");
  d = r(d, '(^|="|>)\n    \n([0-9,]+) wyświetleń\n  (?=($|"|<))', "$1"+"$2"+" òdemkniãców");
  d = r(d, '(^|="|>)\n    \n([0-9,]+) wyświetlenia\n  (?=($|"|<))', "$1"+"$2"+" òdemkniãców");
  d = r(d, '(^|="|>)\n lubi ten film\n\n\n\n\n              (?=($|"|<))', "$1"+"ùwidzôł(ała) so nen film");
  d = r(d, '(^|="|>)\n\n\nprzesłał\\(a\\)    \\•\n\n        (?=($|"|<))', "$1"+"przesłôł(ała) • ");
  d = r(d, '(^|="|>)\ndodał\\(a\\) do (?=($|"|<))', "$1"+"dodôł(ała) do ");
  d = r(d, '(^|="|>)\n\n\nprzesłał\\(a\\)    \\•\n(?=($|"|<))', "$1"+"przesłôł(ała) • ");
  d = r(d, '(^|="|>)skomentował\\(a\\)(?=($|"|<))', "$1"+"dodôł(ała) dopòwiesc do");
  d = r(d, '(^|="|>)\n dodał\\(a\\) \n1 film do (?=($|"|<))', "$1"+" dodôł(ała) 1 film do ");
  d = r(d, '(^|="|>)\ndodał\\(a\\) \n([2-4,]+) filmy do (?=($|"|<))', "$1"+" dodôł(ała) "+"$2"+" filmë do ");
  d = r(d, '(^|="|>)\ndodał\\(a\\) \n([5-9,]+) filmy do (?=($|"|<))', "$1"+" dodôł(ała) "+"$2"+" filmów do ");
  d = r(d, '(^|="|>)\ndodał\\(a\\) \n([2-4,]+) filmów do (?=($|"|<))', "$1"+" dodôł(ała) "+"$2"+" filmë do ");
  d = r(d, '(^|="|>)\ndodał\\(a\\) \n([5-9,]+) filmów do (?=($|"|<))', "$1"+" dodôł(ała) "+"$2"+" filmów do ");
  d = r(d, '(^|="|>)    \\•\ndodał\\(a\\) do listy   (?=($|"|<))', "$1"+" • dodôł(ała) do lëstë ");
  d = r(d, '(^|="|>)Ulubione(?=($|"|<))', "$1"+"Lubòtné");
  d = r(d, '(^|="|>)\n    \\•\nlubi\n\n              (?=($|"|<))', "$1"+" • ùwidzôł(ała) so ");
  d = r(d, '(^|="|>)\nOdtwórz wszystkie\n      (?=($|"|<))', "$1"+"Òdemkni wszëtkò");
  d = r(d, '(^|="|>)wyświetl całą playlistę \\(\n([0-9,]+) filmy\\)(?=($|"|<))', "$1"+"Pòkôżë całą lëstã ("+"$2"+" filmów)");
  d = r(d, '(^|="|>)\n dodał\\(a\\) film\\(y\\) do playlisty   (?=($|"|<))', "$1"+" dodôł(ała) film(ë) do lëstë ");
  d = r(d, '(^|="|>)wyświetl playlistę \\(\n(1?[2-4]) filmów\\)(?=($|"|<))', "$1"+"Pòkôżë lëstã ("+"$2"+" filmë)");
  d = r(d, '(^|="|>)wyświetl playlistę \\(\n(1?[5-9]) filmów\\)(?=($|"|<))', "$1"+"Pòkôżë lëstã ("+"$2"+" filmów)");
  d = r(d, '(^|="|>)wyświetl playlistę \\(\n([0-9,]+) filmów\\)(?=($|"|<))', "$1"+"Pòkôżë lëstã ("+"$2"+" filmów)");
  d = r(d, '(^|="|>)\nWczytaj więcej\n  (?=($|"|<))', "$1"+"Wladëj wicy");
  d = r(d, '(^|="|>)\n    (1?[2-4]) sek\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" sekùndë nazôd");
  d = r(d, '(^|="|>)\n    (1?[5-9]) sek\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" sekùndów nazôd");
  d = r(d, '(^|="|>)\n    ([0-9,]+) sek\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" sek. nazôd");
  d = r(d, '(^|="|>)\n    (1?[2-4]) min\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" minutë nazôd");
  d = r(d, '(^|="|>)\n    (1?[5-9]) min\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" minut nazôd");
  d = r(d, '(^|="|>)\n    ([0-9,]+) min\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" min. nazôd");
  d = r(d, '(^|="|>)\n    1 godzinę temu\n  (?=($|"|<))', "$1"+" "+"1 gòdznã nazôd");
  d = r(d, '(^|="|>)\n    (1?[2-4]) godz\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" gòdznë nazôd");
  d = r(d, '(^|="|>)\n    (1?[5-9]) godz\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" gòdznów nazôd");
  d = r(d, '(^|="|>)\n    ([0-9,]+) godz\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" godz. nazôd");
  d = r(d, '(^|="|>)\n    1 dzień temu\n  (?=($|"|<))', "$1"+" "+"1 dzéń nazôd");
  d = r(d, '(^|="|>)\n    (1?[2-4]) dni temu\n  (?=($|"|<))', "$1"+" "+"$2"+" dnie nazôd");
  d = r(d, '(^|="|>)\n    (1?[5-9]) dni temu\n  (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)\n    ([0-9,]+) dni temu\n  (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)\n    1 tydzień temu\n  (?=($|"|<))', "$1"+" "+"1 tidzéń nazôd");
  d = r(d, '(^|="|>)\n    (1?[2-4]) tygodnie temu\n  (?=($|"|<))', "$1"+" "+"$2"+" tidzenie nazôd");
  d = r(d, '(^|="|>)\n    1 miesiąc temu\n  (?=($|"|<))', "$1"+" "+"1 miesąc nazôd");
  d = r(d, '(^|="|>)\n    (1?[2-4]) mies\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" miesące nazôd");
  d = r(d, '(^|="|>)\n    (1?[5-9]) mies\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" miesąców nazôd");
  d = r(d, '(^|="|>)\n    ([0-9,]+) mies\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" miesąców nazôd");
  d = r(d, '(^|="|>)\n    1 rok temu\n  (?=($|"|<))', "$1"+" "+"łoni");
  d = r(d, '(^|="|>)\n    (1?[2-4]) lata temu\n  (?=($|"|<))', "$1"+" "+"$2"+" lata slôde");
  d = r(d, '(^|="|>)\n    (1?[5-9]) lata temu\n  (?=($|"|<))', "$1"+" "+"$2"+" lat slôde");
  d = r(d, '(^|="|>)\n    ([0-9,]+) lata temu\n  (?=($|"|<))', "$1"+" "+"$2"+" lat slôde");
  d = r(d, '(^|="|>)\nWygląda na to\\, że jeszcze nie masz żadnych subskrypcji\\.\n      (?=($|"|<))', "$1"+"Wëzdrzi na to, że ni môsz niżódnëch subskripcjów");
  d = r(d, '(^|="|>)\nZacznij od dodania kanałów\\.\n      (?=($|"|<))', "$1"+"Zaczni òd dodôwaniô kanałów");
  d = r(d, '(^|="|>)\nMój kanał\n        (?=($|"|<))', "$1"+"Mój kanôł");
  d = r(d, '(^|="|>)\nMenedżer filmów\n        (?=($|"|<))', "$1"+"Menédzéra filmów");
  d = r(d, '(^|="|>)\nUstawienia YouTube\n        (?=($|"|<))', "$1"+"Ùstôwë YouTube");
  d = r(d, '(^|="|>)\nKonto Google\n    (?=($|"|<))', "$1"+"Kònto Google");
  d = r(d, '(^|="|>)\nWyloguj się\n            (?=($|"|<))', "$1"+"Òdparłączë");

// videos
  d = r(d, '(^|="|>)\n        Na żywo\n    (?=($|"|<))', "$1"+"Na żëwò");
  d = r(d, '(^|="|>)\n        Edukacja\n    (?=($|"|<))', "$1"+"Edukacjô");
  d = r(d, '(^|="|>)\n        Wiadomości\n    (?=($|"|<))', "$1"+"Wiadła");
  d = r(d, '(^|="|>)\n          Wszystkie kategorie\n        (?=($|"|<))', "$1"+"Wszëtczé kategòrie");
  d = r(d, '(^|="|>)\n          Wybrane dla Ciebie\n        (?=($|"|<))', "$1"+"Bédowóné dlô Ce");
  d = r(d, '(^|="|>)\n          Motoryzacja\n        (?=($|"|<))', "$1"+"Mòtorizacjô");
  d = r(d, '(^|="|>)\n          Śmieszne\n        (?=($|"|<))', "$1"+"Smiészné");
  d = r(d, '(^|="|>)\n          Rozrywka\n        (?=($|"|<))', "$1"+"Szpas");
  d = r(d, '(^|="|>)\n          Film i animacja\n        (?=($|"|<))', "$1"+"Film ë animacjô");
  d = r(d, '(^|="|>)\n          Gry\n        (?=($|"|<))', "$1"+"Jigrë");
  d = r(d, '(^|="|>)\n          Poradniki i styl\n        (?=($|"|<))', "$1"+"Doradë ë stil");
  d = r(d, '(^|="|>)\n          Społeczne i non-profit\n        (?=($|"|<))', "$1"+"Spòleznowé ë non-profit");
  d = r(d, '(^|="|>)\n          Zwierzęta\n        (?=($|"|<))', "$1"+"Zwiérzãta");
  d = r(d, '(^|="|>)\n          Nauka i technika\n        (?=($|"|<))', "$1"+"Wiédza ë technologie");
  d = r(d, '(^|="|>)\n          Sport\n        (?=($|"|<))', "$1"+"Spòrt");
  d = r(d, '(^|="|>)\n          Podróże i wydarzenia\n        (?=($|"|<))', "$1"+"Wanodżi ë rozegracje");
  d = r(d, '(^|="|>)\nOdtwórz wszystkie\n  (?=($|"|<))', "$1"+"Òdemknij wszëtczé");
  d = r(d, '(^|="|>)Wybrane dla Ciebie \\»(?=($|"|<))', "$1"+"Bédowóné dlô Ce »");
  d = r(d, '(^|="|>)Najpopularniejsze \\»(?=($|"|<))', "$1"+"Nôpòpùlarniészé »");
  d = r(d, '(^|="|>)Motoryzacja \\»(?=($|"|<))', "$1"+"Mòtorizacjô »");
  d = r(d, '(^|="|>)Śmieszne \\»(?=($|"|<))', "$1"+"Śmiészné »");
  d = r(d, '(^|="|>)Rozrywka \\»(?=($|"|<))', "$1"+"Szpas »");
  d = r(d, '(^|="|>)Film i animacja \\»(?=($|"|<))', "$1"+"Film ë animacjô »");
  d = r(d, '(^|="|>)Gry \\»(?=($|"|<))', "$1"+"Jigrë »");
  d = r(d, '(^|="|>)Poradniki i styl \\»(?=($|"|<))', "$1"+"Doradë ë stil »");
  d = r(d, '(^|="|>)Społeczne i non-profit \\»(?=($|"|<))', "$1"+"Spòleznowé ë non-profit »");
  d = r(d, '(^|="|>)Zwierzęta \\»(?=($|"|<))', "$1"+"Zwiérzãta »");
  d = r(d, '(^|="|>)Nauka i technika \\»(?=($|"|<))', "$1"+"Wiédza ë technologie »");
  d = r(d, '(^|="|>)Sport \\»(?=($|"|<))', "$1"+"Spòrt »");
  d = r(d, '(^|="|>)Podróże i wydarzenia \\»(?=($|"|<))', "$1"+"Wanodżi ë rozegracje »");
  d = r(d, '(^|="|>)\n              Utworzona automatycznie przez YouTube\n            (?=($|"|<))', "$1"+"Òdemknionô aùtomaticzno bez YouTube");
  d = r(d, '(^|="|>)\n              autor\\: (.+)\n            (?=($|"|<))', "$1"+"ùsôdca: "+"$2");
  d = r(d, '(^|="|>)\n(.+) wyświetleń(?=($|"|<))', "$1"+"Òdemkłé "+"$2"+" razë");
  d = r(d, '(^|="|>)\n(.+) wyświetlenia(?=($|"|<))', "$1"+"Òdemkłé "+"$2"+" razë");
  d = r(d, '(^|="|>)\nMój kanał\n            (?=($|"|<))', "$1"+"Mój kanôł");
  d = r(d, '(^|="|>)\nMenedżer filmów\n            (?=($|"|<))', "$1"+"Menédzéra filmów");
  d = r(d, '(^|="|>)Subskrypcje(?=($|"|<))', "$1"+"Subskripcje");
  d = r(d, '(^|="|>)Skrzynka odbiorcza(?=($|"|<))', "$1"+"Òdbiorczô kasta");
  d = r(d, '(^|="|>)\nUstawienia\n            (?=($|"|<))', "$1"+"Ùstôwë");
  d = r(d, '(^|="|>)\nPrzełącz konto\n              (?=($|"|<))', "$1"+"Przełączë kònto");
  d = r(d, '(^|="|>)\nWyloguj się(?=($|"|<))', "$1"+"Òdparłączë");

// watch
  d = r(d, '(^|="|>)Subskrybuj(?=($|"|<))', "$1"+"Subskribùj");
  d = r(d, '(^|="|>)Subskrybujesz(?=($|"|<))', "$1"+"Subskribùjesz");
  d = r(d, '(^|="|>)Anuluj subskrypcję(?=($|"|<))', "$1"+"Anëlëjë subskripcjã");
  d = r(d, '(^|="|>)\n(.+) filmów (?=($|"|<))', "$1"+"$2"+" filmów");
  d = r(d, '(^|="|>)Trwa wczytywanie\\.\\.\\.(?=($|"|<))', "$1"+"Òdmikóm...");
  d = r(d, '(^|="|>)autor\\: (?=($|"|<))', "$1"+"ùsôdca: ");
  d = r(d, '\"Podoba mi się\"', "\"Widzy mie sã\"");
  d = r(d, '\"Nie podoba mi się\"', "\"Nie widzy mie sã\"");
  d = r(d, '(^|="|>)Dodaj do(?=($|"|<))', "$1"+"Dodôj do");
  d = r(d, '\"Dodaj do ulubionych lub playlisty\"', "\"Dodôj do lubòtnëch abò lëstë òdmikónëch\"");
  d = r(d, '(^|="|>)Udostępnij (?=($|"|<))', "$1"+"Ùprzestãpni ");
  d = r(d, '\"Udostępnij film lub umieść go na stronie\"', "\"Ùprzestãpni film abò wsadzë gò na starnã\"");
  d = r(d, '\"Zgłoś naruszenie zasad\"', "\"Zgłoszë złamanié prawów\"");
  d = r(d, '\"Pokaż statystyki filmu\"', "\"Pòkôżë statisticzi filmù\"");
  d = r(d, '(^|="|>)\n        \nPrzesłane przez     (?=($|"|<))', "$1"+"Przesłóné bez ");
  d = r(d, '(^|="|>)\n        \nOpublikowane w dniu (?=($|"|<))', "$1"+"Òpùblikòwóné w ");
  d = r(d, '(^|="|>) przez użytkownika     (?=($|"|<))', "$1"+" bez brëkòwnika ");
  d = r(d, '(^|="|>)\n    Sklep wykonawcy\n  (?=($|"|<))', "$1"+"Króm ùsôdcë");
  d = r(d, '(^|="|>)Pokaż więcej (?=($|"|<))', "$1"+"Pòkôżë wicy");
  d = r(d, '(^|="|>)Pokaż mniej (?=($|"|<))', "$1"+"Pòkôżë mni");
  d = r(d, '(^|="|>)\nKategoria:\n    (?=($|"|<))', "$1"+"Kategòriô: ");
  d = r(d, '(^|="|>)Licencja\\:(?=($|"|<))', "$1"+"Licencjô:");
  d = r(d, '(^|="|>)\nStandardowa licencja YouTube\n  (?=($|"|<))', "$1"+"Sztandardowô licencjô YouTube");
  d = r(d, '(^|="|>) głosów na tak\\, (?=($|"|<))', "$1"+" lëdzy za. ");
  d = r(d, '(^|="|>) głosów na nie\n  (?=($|"|<))', "$1"+" lëdzy procem. ");
  d = r(d, '(^|="|>) głosy na tak\\, (?=($|"|<))', "$1"+" głosë na jo. ");
  d = r(d, '(^|="|>) głosy na nie\n  (?=($|"|<))', "$1"+" głosë na nié. ");
  d = r(d, '(^|="|>)Odpowiedzi wideo(?=($|"|<))', "$1"+"Filmòwé òdpòwiedzë");
  d = r(d, '(^|="|>)\nzobacz wszystko\n      (?=($|"|<))', "$1"+"pòkôżë wszëtkò");
  d = r(d, '(^|="|>)\nWszystkie komentarze\n          (?=($|"|<))', "$1"+"Wszëtczé dopòwiescë ");
  d = r(d, '(^|="|>)\nzobacz wszystkie\n          (?=($|"|<))', "$1"+"pòkôżë wszëtczé");
  d = r(d, '(^|="|>)Odpowiedz na ten film\\.\\.\\.(?=($|"|<))', "$1"+"Òdpòwiédz na nen film...");
  d = r(d, '(^|="|>)\nPozostało znaków\\: (?=($|"|<))', "$1"+"Òstało sztriszków: ");
  d = r(d, '(^|="|>)\nMożesz ponownie opublikować za (?=($|"|<))', "$1"+"Pòstãpny rôz mòżesz òpùblikòwac za ");
  d = r(d, '(^|="|>)Utwórz odpowiedź wideo(?=($|"|<))', "$1"+"Ùtwòrzë filmòwą òdpòwiédz");
  d = r(d, '(^|="|>)\&nbsp\;lub\&nbsp\;(?=($|"|<))', "$1"+" abò ");
  d = r(d, '(^|="|>)Opublikuj (?=($|"|<))', "$1"+"Òpùblikùj");
  d = r(d, '(^|="|>)Pokaż nowe komentarze\\: (.+)\\.(?=($|"|<))', "$1"+"Pòkôżë nowé dopòwiescë: "+"$2"+".");
  d = r(d, '(^|="|>)Aktualizuj automatycznie(?=($|"|<))', "$1"+"Aùtomatné òdswiéżanié");
  d = r(d, '(^|="|>)Odpowiedz (?=($|"|<))', "$1"+"Òdpòwiédz");
  d = r(d, '(^|="|>)Udostępnij(?=($|"|<))', "$1"+"Ùprzestãpni");
  d = r(d, '(^|="|>)Zgłoś jako spam(?=($|"|<))', "$1"+"Zgłoszë jakno spam");
  d = r(d, '(^|="|>)Zablokuj użytkownika(?=($|"|<))', "$1"+"Zablokùjë brëkòwnika");
  d = r(d, '(^|="|>)Odblokuj użytkownika(?=($|"|<))', "$1"+"Òdblokùjë brëkòwnika");
  d = r(d, '(^|="|>)Usuń(?=($|"|<))', "$1"+"Wëwalë");
  d = r(d, '(^|="|>)Komentarz oznaczony jako spam(?=($|"|<))', "$1"+"Dopòwiesc nacechòwónô jakno spam.");
  d = r(d, '(^|="|>)pokaż(?=($|"|<))', "$1"+"pòkôżë");
  d = r(d, '(^|="|>)ukryj(?=($|"|<))', "$1"+"schòwôj");
  d = r(d, '(^|="|>)Nie spam (?=($|"|<))', "$1"+"To nié spam");
  d = r(d, '(^|="|>)Komentarz został usunięty(?=($|"|<))', "$1"+"Dopòwiesc òstała wëwalonô");
  d = r(d, '(^|="|>)\nAutor zablokowany\n          (?=($|"|<))', "$1"+"Zablokòwóny ùsôdca.");
  d = r(d, '(^|="|>)\\« Poprzednia(?=($|"|<))', "$1"+"« Slôdnô");
  d = r(d, '(^|="|>)Następna \\»(?=($|"|<))', "$1"+"Pòstãpnô »");
  d = r(d, '(^|="|>)\n            (1?[2-4]) sek\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" sekùndë nazôd");
  d = r(d, '(^|="|>)\n            (1?[5-9]) sek\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" sekùndów nazôd");
  d = r(d, '(^|="|>)\n            ([0-9,]+) sek\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" sek. nazôd");
  d = r(d, '(^|="|>)\n            (1?[2-4]) sek\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" sekùndë nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) sek\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" sekùndów nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) sek\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" sek. nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) min\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" minutë nazôd");
  d = r(d, '(^|="|>)\n            (1?[5-9]) min\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" minutów nazôd");
  d = r(d, '(^|="|>)\n            ([0-9,]+) min\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" min. nazôd");
  d = r(d, '(^|="|>)\n            (1?[2-4]) min\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" minutë nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) min\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" minutów nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) min\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" min. nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            1 godzinę temu\n          (?=($|"|<))', "$1"+" "+"1 gòdznã nazôd");
  d = r(d, '(^|="|>)\n            (1?[2-4]) godz\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" gòdznë nazôd");
  d = r(d, '(^|="|>)\n            (1?[5-9]) godz\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" gòdznów nazôd");
  d = r(d, '(^|="|>)\n            ([0-9,]+) godz\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" gòdz. nazôd");
  d = r(d, '(^|="|>)\n            1 godzinę temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 gòdznã nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) godz\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" gòdznë nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) godz\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" gòdznów nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) godz\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" gòdz. nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            1 dzień temu\n          (?=($|"|<))', "$1"+" "+"1 dzéń nazôd");
  d = r(d, '(^|="|>)\n            (1?[2-4]) dni temu\n          (?=($|"|<))', "$1"+" "+"$2"+" dnie nazôd");
  d = r(d, '(^|="|>)\n            (1?[5-9]) dni temu\n          (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)\n            ([0-9,]+) dni temu\n          (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)\n            1 dzień temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 dzéń nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) dni temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" dnie nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) dni temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) dni temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            1 tydzień temu\n          (?=($|"|<))', "$1"+" "+"1 tidzéń nazôd");
  d = r(d, '(^|="|>)\n            (1?[2-4]) tygodnie temu\n          (?=($|"|<))', "$1"+" "+"$2"+" tidzenie nazôd");
  d = r(d, '(^|="|>)\n            1 tydzień temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 tidzeń nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) tygodnie temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" tidzenie nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            1 miesiąc temu\n          (?=($|"|<))', "$1"+" "+"1 miesąc nazôd");
  d = r(d, '(^|="|>)\n            (1?[2-4]) mies\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" miesące nazôd");
  d = r(d, '(^|="|>)\n            (1?[5-9]) mies\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" miesąców nazôd");
  d = r(d, '(^|="|>)\n            ([0-9,]+) mies\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" mies. nazôd");
  d = r(d, '(^|="|>)\n            1 miesiąc temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 miesąc nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) mies\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" miesące nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) mies\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" miesąców nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) mies\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" mies. nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            1 rok temu\n          (?=($|"|<))', "$1"+" "+"łoni");
  d = r(d, '(^|="|>)\n            (1?[2-4]) lata temu\n          (?=($|"|<))', "$1"+" "+"$2"+" lata nazôd");
  d = r(d, '(^|="|>)\n            (1?[5-9]) lata temu\n          (?=($|"|<))', "$1"+" "+"$2"+" lat nazôd");
  d = r(d, '(^|="|>)\n            ([0-9,]+) lata temu\n          (?=($|"|<))', "$1"+" "+"$2"+" lat nazôd");
  d = r(d, '(^|="|>)\n            1 rok temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"łoni, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) lata temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" lata nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) lata temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" lat nazôd, lësta: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) lata temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" lat nazôd, lësta: ");
  d = r(d, '\"Poprzedni film\"', "\"Slôdny film\"");
  d = r(d, '\"Następny film\"', "\"Pòstãpny film\"");
  d = r(d, '\"Włącz autoodtwarzanie\"', "\"Włączë aùtomatné òdmëkanié filmów\"");
  d = r(d, '\"Włącz odtwarzanie losowe\"', "\"Włączë kawlowé òdmëkanié filmów\"");
  d = r(d, '\"Więcej informacji na temat tej playlisty\"', "\"Wicy wiadłów ò ny lësce\"");
  d = r(d, '(^|="|>)\nEdytuj lub usuń tę playlistę\n      (?=($|"|<))', "$1"+"Editëjë abò wëwalë nã lëstã");
  d = r(d, '(^|="|>)\nWięcej informacji na temat tej playlisty\n      (?=($|"|<))', "$1"+"Wicy wiadłów ò ny lësce");
  d = r(d, '(^|="|>)\nWczytaj inną playlistę\n      (?=($|"|<))', "$1"+"Wladëj jinszą lëstã");

// all_comments
  d = r(d, '(^|="|>)Dodano\\:(?=($|"|<))', "$1"+"Dodóné:");
  d = r(d, '(^|="|>)Od\\:(?=($|"|<))', "$1"+"Òd:");
  d = r(d, '(^|="|>)Wyświetlenia\\:(?=($|"|<))', "$1"+"Òdmikóné:");
  d = r(d, '(^|="|>)Sortuj według godziny(?=($|"|<))', "$1"+"Ùłożë wedle czasu");
  d = r(d, '(^|="|>)Sortuj według wątku \\(wersja beta\\)(?=($|"|<))', "$1"+"Ùłożë wedle kategòrie (beta wersjô)");

// channels
  d = r(d, '(^|="|>)Strona główna (?=($|"|<))', "$1"+"Przédnô starna");
  d = r(d, '(^|="|>)Dodaj kanały\n(?=($|"|<))', "$1"+"Dodôj kanałë");
  d = r(d, '(^|="|>)\nNie subskrybujesz żadnych kanałów(?=($|"|<))', "$1"+"Nie subskribùjesz niżódnëch kanałów");
  d = r(d, '(^|="|>)\nSubskrybujesz (.+) kanałów(?=($|"|<))', "$1"+"Subskribùjesz "+"$2"+" kanałów");
  d = r(d, '(^|="|>)\nWprowadzenie\\?\n      (?=($|"|<))', "$1"+"Wprowadzenié?");
  d = r(d, '(^|="|>)Przeglądaj kategorie(.+) i znajduj ciekawe kanały.(?=($|"|<))', "$1"+"Przezérôj kategòrie"+"$2"+" ë nańdze cekawé kanałë.");
  d = r(d, '(^|="|>)Zasubskrybuj kanały(.+) i dodaj je do strony głównej\\.(?=($|"|<))', "$1"+"Zasubskribùj kanałë"+"$2"+" ë dodôj je do przédny starnë.");
  d = r(d, '(^|="|>)(.+)Wyświetl stronę główną(.+)\\, aby zobaczyć aktywność związaną z Twoimi subskrypcjami\\.(?=($|"|<))', "$1"+"Na swòji "+"$2"+"przédny starnie"+"$3"+" òbezdrzisz nowòscë na subskribòwónëch kanałach.");
  d = r(d, '(^|="|>)Wybrane dla Ciebie\n(?=($|"|<))', "$1"+"Bédowóné dlô Ce");
  d = r(d, '(^|="|>)Najpopularniejsze blogi\n(?=($|"|<))', "$1"+"Nôpòpùlarniészé starnë");
  d = r(d, '(^|="|>)Komedie\n(?=($|"|<))', "$1"+"Kòmedie");
  d = r(d, '(^|="|>)Film i rozrywka\n(?=($|"|<))', "$1"+"Filmë ë szpas");
  d = r(d, '(^|="|>)Gry\n(?=($|"|<))', "$1"+"Jigrë");
  d = r(d, '(^|="|>)Motoryzacja\n(?=($|"|<))', "$1"+"Mòtorizacjô");
  d = r(d, '(^|="|>)Gwiazdy i plotki\n(?=($|"|<))', "$1"+"Gwiôzdë ë pludrë");
  d = r(d, '(^|="|>)Sport\n(?=($|"|<))', "$1"+"Spòrt");
  d = r(d, '(^|="|>)Zrób to sam\n(?=($|"|<))', "$1"+"Zrobi to sóm");
  d = r(d, '(^|="|>)Technologie\n(?=($|"|<))', "$1"+"Technologie");
  d = r(d, '(^|="|>)Śmieszne z internetu\n(?=($|"|<))', "$1"+"Smiészné z jinternétë");
  d = r(d, '(^|="|>)Nauka i edukacja\n(?=($|"|<))', "$1"+"Wiédza ë ùczba");

// playlist
  d = r(d, '(^|="|>)Edytuj playlistę(?=($|"|<))', "$1"+"Editëjë lëstã");
  d = r(d, '(^|="|>)\nczas trwania\n        (?=($|"|<))', "$1"+"czas dérowaniô");
  d = r(d, '\"Udostępnij playlistę lub umieść ją na stronie\\.\"', "\"Ùprzestãpni lëstã abò wsadzë ją na starnã.\"");
  d = r(d, '(^|="|>)(.+) – informacje(?=($|"|<))', "$1"+"$2"+" – informacyje");
  d = r(d, '(^|="|>)\n              \n(.+) playlist\n          (?=($|"|<))', "$1"+"$2"+" lëstów");
  d = r(d, '(^|="|>)\nWyświetl wszystkie filmy\n          (?=($|"|<))', "$1"+"Pòkôżë wszëtczé filmë");
  d = r(d, '(^|="|>)\n            \n(.+) wyświetleń\n          (?=($|"|<))', "$1"+"Film òdemkniony "+"$2"+" razë");
  d = r(d, '(^|="|>)\n            \n(.+) wyświetlenia\n          (?=($|"|<))', "$1"+"Film òdemkniony "+"$2"+" razë");
  d = r(d, '(^|="|>)\nLiczba widzów\\: (.+)\n        (?=($|"|<))', "$1"+"Lëczba òbzérôczów: "+"$2");
  d = r(d, '(^|="|>)Polecane playlisty(?=($|"|<))', "$1"+"Bédowóné lëstë");

// results
  d = r(d, '(^|="|>)Filtr (?=($|"|<))', "$1"+"Filter ");
  d = r(d, '(^|="|>)\nLiczba wyników \\(około\\)\\: (?=($|"|<))', "$1"+"Lëczba nalézonëch (kòl): ");
  d = r(d, '(^|="|>)Tłumacz(?=($|"|<))', "$1"+"Dolmaczë");
  d = r(d, '(^|="|>)NOWOŚĆ(?=($|"|<))', "$1"+"NOWÉ");
  d = r(d, '(^|="|>)Liczba widzów\\: (.+)(?=($|"|<))', "$1"+"$2"+" lëczba òbzérôczów");
  d = r(d, '(^|="|>)playlist(?=($|"|<))', "$1"+"lësta");

// user
  d = r(d, '(^|="|>)Ustawienia kanału(?=($|"|<))', "$1"+"Ùstôwë kanału");
  d = r(d, '(^|="|>)Menedżer filmów(?=($|"|<))', "$1"+"Menédżéra filmów");
  d = r(d, '(^|="|>)widzowie(?=($|"|<))', "$1"+"òbzérôczë");
  d = r(d, '(^|="|>)wyświetlenia filmów(?=($|"|<))', "$1"+"òdemkniãca filmów");
  d = r(d, '\"Szukaj w kanale\"', "\"Nalézë w kanale\"");
  d = r(d, '(^|="|>)\n      Polecane\n\n    (?=($|"|<))', "$1"+"Bédowóné");
  d = r(d, '(^|="|>)\n      Filmy\n\n    (?=($|"|<))', "$1"+"Filmë");
  d = r(d, '(^|="|>)\nKomentarze\n          (?=($|"|<))', "$1"+"Dopòwiescë");
  d = r(d, '\"Utwórz nowy post\"', "\"Ùsôdzë nowi wpisënk\"");
  d = r(d, '(^|="|>)\n subskrybuje\\:\n\n\n\n              (?=($|"|<))', "$1"+" subskribùje: ");
  d = r(d, '(^|="|>)\nURL filmu lub playlisty\n  (?=($|"|<))', "$1"+"URL filmù abò lëstë");
  d = r(d, '(^|="|>)\nNajnowsze filmy\n    (?=($|"|<))', "$1"+"Nônowszé filmë");
  d = r(d, '(^|="|>)\nNajnowsze playlisty\n    (?=($|"|<))', "$1"+"Nônowsczé lëstë");
  d = r(d, '\"Dodaj link do polecanego filmu lub playlisty \\(opcjonalnie\\)\"', "\"Dodôj pòwrôzk do bédowónégò filmù abò lëstë (mòże òstac lózé)\"");
  d = r(d, '(^|="|>)\n    --- Wybierz film ---\n  (?=($|"|<))', "$1"+"--- Wëbierzë film ---");
  d = r(d, '(^|="|>)\n    --- Wybierz playlistę ---\n  (?=($|"|<))', "$1"+"--- Wëbierzë lëstã ---");
  d = r(d, '(^|="|>)\n(.+) – informacje\n        (?=($|"|<))', "$1"+"$2"+" – wiadła");
  d = r(d, '(^|="|>)  więcej (?=($|"|<))', "$1"+"wicy ");
  d = r(d, '(^|="|>)  mniej (?=($|"|<))', "$1"+"mni ");
  d = r(d, '(^|="|>)\nautor\\: (?=($|"|<))', "$1"+"ùsôdca: ");
  d = r(d, '(^|="|>)Wyślij wiadomość(?=($|"|<))', "$1"+"Wëslë wiadło");
  d = r(d, '(^|="|>)Ostatnia aktywność(?=($|"|<))', "$1"+"Slôdnô aktiwnota");
  d = r(d, '(^|="|>)Dołączył\\(a\\)(?=($|"|<))', "$1"+"Dołącził(a)");
  d = r(d, '(^|="|>)Kraj(?=($|"|<))', "$1"+"Krôj");
  d = r(d, '(^|="|>)Inne kanały(?=($|"|<))', "$1"+"Jinszé kanałë");
  d = r(d, '(^|="|>)Lokalizacja(?=($|"|<))', "$1"+"Môlëzna");
  d = r(d, '\"URL kanału\"', "\"URL kanału\"");
  d = r(d, '(^|="|>)\nUżywaj tego modułu do polecania innych kanałów\\, które chcesz pokazać\\.\n        (?=($|"|<))', "$1"+"Ùżiwôj negò mòdułu do bédowaniô jinszich kanałów, jaczé chcesz pòkôzac.");
  d = r(d, '(^|="|>)\nUwaga\\: ten moduł jest opcjonalny i nie będzie widoczny dla odbiorców\\, dopóki nie dodasz do niego kanałów\\.\n        (?=($|"|<))', "$1"+"Òpasënk: negò mòduła ni mdą widzelë jinszi, wierã że dodôsz do niégò kanôł.");
  d = r(d, '(^|="|>)Polecane kanały(?=($|"|<))', "$1"+"Bédowóné kanałë");
  d = r(d, '(^|="|>)\n\nUkryj\n      (?=($|"|<))', "$1"+"Schòwôj");
  d = r(d, '(^|="|>)Anuluj (?=($|"|<))', "$1"+"Anëlëjë");
  d = r(d, '(^|="|>)Zastosuj (?=($|"|<))', "$1"+"ùstawi");
  d = r(d, '(^|="|>) ?([0-9,]+) sty ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".stë."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) lut ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".grom."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) mar ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".stë."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) kwi ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".łżë."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) maj ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".môj"+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) cze ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".czer."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) lip ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".lëp."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) sie ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".zél."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) wrz ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".séw."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) paź ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".ruj."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) lis ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".smù."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) gru ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".gòd."+"$3");
  d = r(d, '(^|="|>)\nPolecane oferty sklepu\n        (?=($|"|<))', "$1"+"Bédowóné òfertë krómù");
  d = r(d, '(^|="|>)\nwyświetl wszystko\n          (?=($|"|<))', "$1"+"pòkôżë wszëtkò ");
  d = r(d, '(^|="|>)\n    \n([0-9,]+) filmów\n  (?=($|"|<))', "$1"+"$2"+" filmë");
  d = r(d, '(^|="|>)Odtwórz wszystkie(?=($|"|<))', "$1"+"Òdemkni wszëtczé");
  d = r(d, '(^|="|>)\nautor\\: (.+)\n    (?=($|"|<))', "$1"+"ùsôdca: "+"$2");
  d = r(d, '(^|="|>)\nwyświetl wszystko\n    (?=($|"|<))', "$1"+"pòkôżë wszëtkò ");
  d = r(d, '(^|="|>)\nwidzowie\n  (?=($|"|<))', "$1"+" òbzérôczë");
  d = r(d, '(^|="|>)\n    \nWczytaj jeszcze 10 filmów\n  (?=($|"|<))', "$1"+"Pòkôżë jesz 10 filmów");
  d = r(d, '(^|="|>)Zgłoś (?=($|"|<))', "$1"+"Zgłoszë ");
  d = r(d, '(^|="|>)Zgłoś obraz tła(?=($|"|<))', "$1"+"Zgłoszë òbrôz tła");
  d = r(d, '(^|="|>)Zgłoś miniaturę profilu(?=($|"|<))', "$1"+"Zgłoszë miniaturã profilu");
  d = r(d, '(^|="|>)Zgłoś użytkownika(?=($|"|<))', "$1"+"Zgłoszë brëkòwnika");
  d = r(d, '(^|="|>)autor\\: (.+)(?=($|"|<))', "$1"+"ùsôdca: "+"$2");
  d = r(d, '(^|="|>)\nwyświetleń\n              (?=($|"|<))', "$1"+" òdemkniãców");
  d = r(d, '(^|="|>)\nLiczba wyświetleń\\: ([0-9,]+)\n      (?=($|"|<))', "$1"+"$2"+" lëczba òdemkniãców");
  d = r(d, '(^|="|>)\nOBEJRZANY\n        (?=($|"|<))', "$1"+"ÒBEZDRZÓNÉ");
  d = r(d, '(^|="|>)(1?[2-4]) sek\\. temu(?=($|"|<))', "$1"+" "+"$2"+" sekùndë nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) sek\\. temu(?=($|"|<))', "$1"+" "+"$2"+" sekùndów nazôd");
  d = r(d, '(^|="|>)([0-9,]+) sek\\. temu(?=($|"|<))', "$1"+" "+"$2"+" sek. nazôd");
  d = r(d, '(^|="|>)(1?[2-4]) min\\. temu(?=($|"|<))', "$1"+" "+"$2"+" minutë nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) min\\. temu(?=($|"|<))', "$1"+" "+"$2"+" minutów nazôd");
  d = r(d, '(^|="|>)([0-9,]+) min\\. temu(?=($|"|<))', "$1"+" "+"$2"+" min. nazôd");
  d = r(d, '(^|="|>)1 godzinę temu(?=($|"|<))', "$1"+" "+"1 gòdznã nazôd");
  d = r(d, '(^|="|>)(1?[2-4]) godz\\. temu(?=($|"|<))', "$1"+" "+"$2"+" gòdznë nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) godz\\. temu(?=($|"|<))', "$1"+" "+"$2"+" gòdznów nazôd");
  d = r(d, '(^|="|>)([0-9,]+) godz\\. temu(?=($|"|<))', "$1"+" "+"$2"+" gòdz. nazôd");
  d = r(d, '(^|="|>)1 dzień temu(?=($|"|<))', "$1"+" "+"1 dzéń nazôd");
  d = r(d, '(^|="|>)(1?[2-4]) dni temu(?=($|"|<))', "$1"+" "+"$2"+" dnie nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) dni temu(?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)([0-9,]+) dni temu(?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)1 tydzień temu(?=($|"|<))', "$1"+" "+"1 tidzéń nazôd");
  d = r(d, '(^|="|>)(1?[2-4]) tygodnie temu(?=($|"|<))', "$1"+" "+"$2"+" tidzenie nazôd");
  d = r(d, '(^|="|>)1 miesiąc temu(?=($|"|<))', "$1"+" "+"1 miesąc nazôd");
  d = r(d, '(^|="|>)(1?[2-4]) mies\\. temu(?=($|"|<))', "$1"+" "+"$2"+" miesące nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) mies\\. temu(?=($|"|<))', "$1"+" "+"$2"+" miesąców nazôd");
  d = r(d, '(^|="|>)([0-9,]+) mies\\. temu(?=($|"|<))', "$1"+" "+"$2"+" mies. nazôd");
  d = r(d, '(^|="|>)1 rok temu(?=($|"|<))', "$1"+" "+"łoni");
  d = r(d, '(^|="|>)(1?[2-4]) lata temu(?=($|"|<))', "$1"+" "+"$2"+" lata nazôd");
  d = r(d, '(^|="|>)(1?[5-9]) lata temu(?=($|"|<))', "$1"+" "+"$2"+" lat nazôd");
  d = r(d, '(^|="|>)([0-9,]+) lata temu(?=($|"|<))', "$1"+" "+"$2"+" lat nazôd");
  d = r(d, '(^|="|>)Wczytaj więcej (?=($|"|<))', "$1"+"Wladëjë wicy");
  d = r(d, '(^|="|>)\n      Przesłane filmy\n    (?=($|"|<))', "$1"+"Przesłóné filmë ");
  d = r(d, '(^|="|>)\n      listy odtwarzania\n    (?=($|"|<))', "$1"+"Lëstë òdmikaniô");
  d = r(d, '(^|="|>)Od najnowszego (?=($|"|<))', "$1"+"Òd nônowszégò");
  d = r(d, '(^|="|>)Od najnowszego(?=($|"|<))', "$1"+"Òd nônowszégò");
  d = r(d, '(^|="|>)Od najstarszego (?=($|"|<))', "$1"+"Òd nôstarszégò");
  d = r(d, '(^|="|>)Od najstarszego(?=($|"|<))', "$1"+"Òd nôstarszégò");
  d = r(d, '(^|="|>)Najpopularniejsze (?=($|"|<))', "$1"+"Nôpòpùlarniészé");
  d = r(d, '(^|="|>)Najpopularniejsze(?=($|"|<))', "$1"+"Nôpòpùlarniészé");
  d = r(d, '(^|="|>)\n        \n([0-9,]+) wyświetleń\n      (?=($|"|<))', "$1"+"Òdmikóné "+"$2"+" razë");
  d = r(d, '(^|="|>)\n        \n([0-9,]+) wyświetlenia\n      (?=($|"|<))', "$1"+"Òdmikóné "+"$2"+" razë");
  d = r(d, '(^|="|>)\n        (1?[2-4]) sek\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" sekùndë nazôd");
  d = r(d, '(^|="|>)\n        (1?[5-9]) sek\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" sekùndów nazôd");
  d = r(d, '(^|="|>)\n        ([0-9,]+) sek\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" sek. nazôd");
  d = r(d, '(^|="|>)\n        (1?[2-4]) min\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" minutë nazôd");
  d = r(d, '(^|="|>)\n        (1?[5-9]) min\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" minutów nazôd");
  d = r(d, '(^|="|>)\n        ([0-9,]+) min\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" min. nazôd");
  d = r(d, '(^|="|>)\n        1 godzinę temu\n      (?=($|"|<))', "$1"+" "+"1 gòdznã nazôd");
  d = r(d, '(^|="|>)\n        (1?[2-4]) godz\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" godznë nazôd");
  d = r(d, '(^|="|>)\n        (1?[5-9]) godz\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" godznów nazôd");
  d = r(d, '(^|="|>)\n        ([0-9,]+) godz\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" godz. nazôd");
  d = r(d, '(^|="|>)\n        1 dzień temu\n      (?=($|"|<))', "$1"+" "+"1 dzéń nazôd");
  d = r(d, '(^|="|>)\n        (1?[2-4]) dni temu\n      (?=($|"|<))', "$1"+" "+"$2"+" dnie nazôd");
  d = r(d, '(^|="|>)\n        (1?[5-9]) dni temu\n      (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)\n        ([0-9]) dni temu\n      (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)\n        1 tydzień temu\n      (?=($|"|<))', "$1"+" "+"1 tidzéń nazôd");
  d = r(d, '(^|="|>)\n        (1?[2-4]) tygodnie temu\n      (?=($|"|<))', "$1"+" "+"$2"+" tidzenie nazôd");
  d = r(d, '(^|="|>)\n        1 miesiąc temu\n      (?=($|"|<))', "$1"+" "+"1 miesąc nazôd");
  d = r(d, '(^|="|>)\n        (1?[2-4]) mies\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" miesące nazôd");
  d = r(d, '(^|="|>)\n        (1?[5-9]) mies\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" miesąców nazôd");
  d = r(d, '(^|="|>)\n        ([0-9,]+) mies\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" mies. nazôd");
  d = r(d, '(^|="|>)\n        1 rok temu\n      (?=($|"|<))', "$1"+" "+"łoni");
  d = r(d, '(^|="|>)\n        (1?[2-4]) lata temu\n      (?=($|"|<))', "$1"+" "+"$2"+" lata nazôd");
  d = r(d, '(^|="|>)\n        (1?[5-9]) lata temu\n      (?=($|"|<))', "$1"+" "+"$2"+" lat nazôd");
  d = r(d, '(^|="|>)\n        ([0-9,]+) lata temu\n      (?=($|"|<))', "$1"+" "+"$2"+" lat nazôd");

// my_channel_editor
  d = r(d, '(^|="|>)\nUstawienia kanału\n    (?=($|"|<))', "$1"+"Ùstôwë kanału");
  d = r(d, '(^|="|>)Anuluj(?=($|"|<))', "$1"+"Anëlëjë");
  d = r(d, '(^|="|>)Zmiany gotowe (?=($|"|<))', "$1"+"Zmianë są fardich");
  d = r(d, '(^|="|>)\n      Wygląd\n    (?=($|"|<))', "$1"+"Wëzdrzatk");
  d = r(d, '(^|="|>)\n      Informacje i ustawienia\n    (?=($|"|<))', "$1"+"Wiadła ë ùstôwë");
  d = r(d, '(^|="|>)\nWybierz obraz\\. Obrazy o kształcie innym niż kwadratowy zostaną przycięte\\. Sugerowane wymiary\\: 800 x 800 pikseli\\. Maks\\. rozmiar\\: 1 MB\\.\n        (?=($|"|<))', "$1"+"Wëbierzë òdjimk. Òbrôzczi jinszé jak kwadratowé òstóną przëcãté. Nôlepszô wiôlgòsc: 800 x 800 pikselów ë max. 1 MB.");
  d = r(d, '(^|="|>)\nPrzesyłanie\n  (?=($|"|<))', "$1"+"Przesyłanié");
  d = r(d, '(^|="|>)Wybierz plik (?=($|"|<))', "$1"+"Wëbierzë plik");
  d = r(d, '(^|="|>)Usuń (?=($|"|<))', "$1"+"Wëwalë");
  d = r(d, '(^|="|>)\nTło\n      (?=($|"|<))', "$1"+"Tło");
  d = r(d, '(^|="|>)\nWybierz obraz \\(maks\\. 1 MB\\)\n      (?=($|"|<))', "$1"+"Wëbierzë òbrôz (max. 1 MB)");
  d = r(d, '(^|="|>)\n\nPrzewijane\n          (?=($|"|<))', "$1"+"Przewijané");
  d = r(d, '(^|="|>)\n\nNieruchome\n          (?=($|"|<))', "$1"+"Ùcwiardzoné");
  d = r(d, '(^|="|>)\nBez powtarzania\n  (?=($|"|<))', "$1"+"Bez pòwtórków");
  d = r(d, '(^|="|>)\nPowtarzaj w poziomie\n  (?=($|"|<))', "$1"+"Pòwtôrzôj jeden nad drëdżim");
  d = r(d, '(^|="|>)\nPowtarzaj w pionie\n  (?=($|"|<))', "$1"+"Pòwtôrzôj jeden kòl drëdżégò");
  d = r(d, '(^|="|>)\nPowtórz w poziomie i w pionie\n  (?=($|"|<))', "$1"+"Pòwtôrzôj wszëtkò");
  d = r(d, '\"Podczas przewijania zawartości kanału obraz tła też jest przewijany\\.\"', "\"Przë przewijanim zamkłoscë kanału òbrôz tła téż je przewijóny\"");
  d = r(d, '\"Podczas przewijania zawartości kanału tło nie jest przewijane – pozostaje nieruchome.\\.\"', "\"Przë przewijanim zamkłoscë kanału tło je ùcwiardzoné\"");
  d = r(d, '(^|="|>)\n    Wybierz kolor\n  (?=($|"|<))', "$1"+"Wëbierzë farwã");
  d = r(d, '(^|="|>)Wyczyść wybrany kolor (?=($|"|<))', "$1"+"Wëczëszczë wëbróną farwã");
  d = r(d, '(^|="|>)Ustaw (?=($|"|<))', "$1"+"Ùstawi");
  d = r(d, '(^|="|>)\nInformacje o kanale i ustawienia\n    (?=($|"|<))', "$1"+"Wiadła ò kanale ë ùstôwë");
  d = r(d, '(^|="|>)Opis(?=($|"|<))', "$1"+"Òpis");
  d = r(d, '(^|="|>)\nURL kanału\n      (?=($|"|<))', "$1"+"URL kanału");
  d = r(d, '(^|="|>)\nKarta domyślna\n    (?=($|"|<))', "$1"+"Przédnô starna");
  d = r(d, '(^|="|>)\nKarta Polecane\n  (?=($|"|<))', "$1"+"Bédowóné");
  d = r(d, '(^|="|>)\nKarta Filmy\n  (?=($|"|<))', "$1"+"Filmë");
  d = r(d, '(^|="|>)\nKarta Kanał\n  (?=($|"|<))', "$1"+"Kanôł");
  d = r(d, '(^|="|>)\n\nZawsze kieruj użytkowników subskrybujących na kartę kanału\n    (?=($|"|<))', "$1"+"Wiedno czerëjë subskribùjącëch brëkòwników na kôrtã kanału");
  d = r(d, '(^|="|>)\nUdostępnij moją aktywność\\, gdy\\:\n    (?=($|"|<))', "$1"+"Ùprzëstãpni mòjã aktiwnotã, czej:");
  d = r(d, '(^|="|>)\nMożesz automatycznie udostępniać informacje o swojej aktywności na kanale w YouTube\\. Bez obaw – nigdy nie udostępnimy informacji o aktywności dotyczącej prywatnych filmów\\. Wprowadzone tutaj zmiany zostaną zastosowane również względem przeszłej aktywności\\.\n    (?=($|"|<))', "$1"+"Mòżesz aùtomaticzno ùprzëstãpnic swòjã aktiwnotã w kanale na YouTube. Nie jiscë sã – nigdë nie mdze ùprzëstãpnionô aktiwnota przë priwatnëch filmach.");
  d = r(d, '(^|="|>)\n\n    Spodoba mi się film\n  (?=($|"|<))', "$1"+"  Ùwidzy mie sã film");
  d = r(d, '(^|="|>)\n\n    Skomentuję film\n  (?=($|"|<))', "$1"+"  Dodóm dopòwiesc do filmù");
  d = r(d, '(^|="|>)\n\n    Dodam film do ulubionych\n  (?=($|"|<))', "$1"+"  Dodóm film do lubòtnëch");
  d = r(d, '(^|="|>)\n\n    Zasubskrybuję kanał\n  (?=($|"|<))', "$1"+"  Zasubskribùjã kanôł");
  d = r(d, '(^|="|>)\n\nZezwalaj na komentarze na kanale\n    (?=($|"|<))', "$1"+"Dopùszczë do dodôwaniô dopòwiesców w kanale");
  d = r(d, '(^|="|>)\n\nWyświetlaj automatycznie\n        (?=($|"|<))', "$1"+"  Wëswietlë aùtomaticzno");
  d = r(d, '(^|="|>)\n\nWyświetlaj po zatwierdzeniu\n        (?=($|"|<))', "$1"+"  Wëswietlë pò zacwierdzenim");
  d = r(d, '(^|="|>)\n\n    Polecane\n  (?=($|"|<))', "$1"+"Bédowóné");
  d = r(d, '(^|="|>)Twórca(?=($|"|<))', "$1"+"Ùsôdca");
  d = r(d, '(^|="|>)Polecany film z wybranej playlisty wraz z grupą innych polecanych playlist(?=($|"|<))', "$1"+" Bédowóné filmë z wëbróny lëstë razã z karnã jinëch bédowónëch lëstów");
  d = r(d, '(^|="|>)Blogger(?=($|"|<))', "$1"+"Blogger");
  d = r(d, '(^|="|>)Twoje ostatnio przesłane filmy \\(od najnowszego\\) lub polecana playlista(?=($|"|<))', "$1"+"Twòje nônowszé filmë abò bédowóné lëstë");
  d = r(d, '(^|="|>)Sieć(?=($|"|<))', "$1"+"Neta");
  d = r(d, '(^|="|>)Polecany film z wybranej playlisty wraz z grupą polecanych kanałów(?=($|"|<))', "$1"+"Bédowóny film z wëbróny lëstë razã z karnã bédowónëch kanałów");
  d = r(d, '(^|="|>)Polecany film z wybranej playlisty wraz z grupą innych polecanych playlist i kanałów(?=($|"|<))', "$1"+"Bédowóny film z wëbróny lëstë razã z karnã bédowónëch lëstów ë kanałów");
  d = r(d, '(^|="|>)\nŁadowanie podglądu szablonu\n        (?=($|"|<))', "$1"+"Ładowanié pòdëzdrzeniô szablonu");
  d = r(d, '(^|="|>)\nTylko tryb podglądu\n        (?=($|"|<))', "$1"+"Leno pòdëzdrzeniowi trib");

// my_videos
  d = r(d, '(^|="|>)\n        Menedżer filmów\n    (?=($|"|<))', "$1"+"Menédżéra filmów");
  d = r(d, '(^|="|>)\n        Subskrypcje\n    (?=($|"|<))', "$1"+"Subskripcje");
  d = r(d, '(^|="|>)\n        Skrzynka odbiorcza\n    (?=($|"|<))', "$1"+"Òdbiorczô kasta");
  d = r(d, '(^|="|>)\n        Ustawienia\n    (?=($|"|<))', "$1"+"Ùstôwë");
  d = r(d, '(^|="|>)Prześlij (?=($|"|<))', "$1"+"Przeslë");
  d = r(d, '(^|="|>)Nagraj z kamery internetowej(?=($|"|<))', "$1"+"Nagrôj z jinternetowy kamérë");
  d = r(d, '(^|="|>)Narzędzia dla twórców(?=($|"|<))', "$1"+"Nôrzãdła dlô ùsôdców");
  d = r(d, '(^|="|>)AdWords dla wideo(?=($|"|<))', "$1"+"AdWords dlô filmù");
  d = r(d, '(^|="|>)Przesłane(?=($|"|<))', "$1"+"Przesłóné");
  d = r(d, '(^|="|>)Wyświetl\\:(?=($|"|<))', "$1"+"Pòkôżë:");
  d = r(d, '(^|="|>)Najnowsze(?=($|"|<))', "$1"+"Nônowszé");
  d = r(d, '(^|="|>)Najstarsze(?=($|"|<))', "$1"+"Nôstarszé");
  d = r(d, '(^|="|>)Najczęściej oglądane(?=($|"|<))', "$1"+"Nôwicy òdmëkóné");
  d = r(d, '(^|="|>)Niepubliczne(?=($|"|<))', "$1"+"Niepùbliczné");
  d = r(d, '(^|="|>)Najnowsze (?=($|"|<))', "$1"+"Nônowszé");
  d = r(d, '(^|="|>)Najstarsze (?=($|"|<))', "$1"+"Nôstarszé");
  d = r(d, '(^|="|>)Najczęściej oglądane (?=($|"|<))', "$1"+"Nôwicy òdmëkóné");
  d = r(d, '(^|="|>)Niepubliczne (?=($|"|<))', "$1"+"Niepùbliczné");
  d = r(d, '\"Wyszukaj w przesłanych\"', "\"Nalézë w przesłónëch\"");
  d = r(d, '\"Wyświetl statystyki\"', "\"Pòkôżë statisticzi\"");
  d = r(d, '\"Wszystkie komentarze\"', "\"Wszëtczé dopòwiescë\"");
  d = r(d, '(^|="|>)Informacje i ustawienia(?=($|"|<))', "$1"+"Wiadła ë ùstôwë");
  d = r(d, '(^|="|>)Ulepszenia(?=($|"|<))', "$1"+"Pòprôwienia");
  d = r(d, '(^|="|>)Adnotacje(?=($|"|<))', "$1"+"Dopisczi");
  d = r(d, '(^|="|>)Pobierz w formacie MP4(?=($|"|<))', "$1"+"Scygni jakno MP4");
  d = r(d, '(^|="|>)\n      Przesłane\n    (?=($|"|<))', "$1"+"Przesłóné");
  d = r(d, '(^|="|>)\n      Historia\n    (?=($|"|<))', "$1"+"Historiô");
  d = r(d, '(^|="|>)\n      Historia wyszukiwania\n    (?=($|"|<))', "$1"+"Historiô nańdowaniégò");
  d = r(d, '(^|="|>)\n      Do obejrzenia\n    (?=($|"|<))', "$1"+"Do òbezdrzeniô");
  d = r(d, '(^|="|>)\n      Dodane do ulubionych\n    (?=($|"|<))', "$1"+"Dodóné do lubòtnëch");

// my_videos_upload
  d = r(d, '(^|="|>)Prześlij pliki wideo(?=($|"|<))', "$1"+"Przeslë pliczi wideo");
  d = r(d, '(^|="|>)Inne sposoby dodawania i robienia filmów(?=($|"|<))', "$1"+"Jinszé ôrtë dodôwaniégò ë robieniégò filmów");
  d = r(d, '(^|="|>)Prześlij wiele plików(?=($|"|<))', "$1"+"Przeslë wicy plików narôz");
  d = r(d, '(^|="|>)Wybierz pliki z komputera (?=($|"|<))', "$1"+"Wëbierzë pliczi z kòmpùtra ");
  d = r(d, '(^|="|>)\nAby zaznaczyć kilka plików\\, podczas wybierania przytrzymaj Ctrl\\.\n              (?=($|"|<))', "$1"+"Knypsni ë przëtrzëmi knyps Ctrl, cobë nacéchòwac wicy plików");
  d = r(d, '(^|="|>)\nWyraź siebie\\! Nagraj film i dodaj go na YouTube\\.\n              (?=($|"|<))', "$1"+"Pòkôżë se! Nagrôj film ë przëslë gò na YouTube.");
  d = r(d, '(^|="|>)\nPrzeciągnij na tę stronę filmy\\, które chcesz przesłać\\.\n  (?=($|"|<))', "$1"+"Przecygni na tã starnã filmë, jaczé chcesz przesłac.");
  d = r(d, '(^|="|>)\nPrzesyłaj filmy HD w różnych formatach o długości do 15 minut\\.\n                (?=($|"|<))', "$1"+"Przesyłôj filmë HD w rozmajitëch fòrmatach ò długòscë do 15 minutów. ");
  d = r(d, '(^|="|>)Zwiększ limit.(?=($|"|<))', "$1"+"Zwikszë limit.");
  d = r(d, '\"Trwa wczytywanie\\.\\.\\.\"', "\"Dérëje ładowanié...\"");
  d = r(d, '(^|="|>)\nTrwa wczytywanie\\.\\.\\.\n  (?=($|"|<))', "$1"+"Dérëje ładowanié...");
  d = r(d, '(^|="|>)Trwa wczytywanie\\.\\.\\.(?=($|"|<))', "$1"+"Dérëje ładowanié...");
  d = r(d, '(^|="|>)\nTrwa wczytywanie\\.\\.\\.\n        (?=($|"|<))', "$1"+"Dérëje ładowanié...");
  d = r(d, '(^|="|>)\nUdostępnij moją aktywność w serwisie\\:\n    (?=($|"|<))', "$1"+"Ùprzëstãpni mòjã aktiwnotã na starnie:");
  d = r(d, '(^|="|>)Połącz (?=($|"|<))', "$1"+"Sparłączë");
  d = r(d, '(^|="|>)Ważne\\:(?=($|"|<))', "$1"+"Wôżné:");
  d = r(d, '(^|="|>) musisz posiadać prawa autorskie lub mieć odpowiednie prawa do wszystkich przesyłanych materiałów\\. (?=($|"|<))', "$1"+" brëkùjesz miec ùsôdskòwé prawa abò miec szpecjalné prawa do wszëtczich przesyłónëch materiałów. ");
  d = r(d, '(^|="|>)Więcej informacji(?=($|"|<))', "$1"+"Wicy wiadłów");
  d = r(d, '(^|="|>)Pomoc i propozycje(?=($|"|<))', "$1"+"Pòmòc ë bédënczi");
  d = r(d, '(^|="|>)Pomoc w przesyłaniu(?=($|"|<))', "$1"+"Pòmòc przë przesyłanim");
  d = r(d, '(^|="|>)Pomoc w kodowaniu(?=($|"|<))', "$1"+"Pòmòc przë kòdowanim");
  d = r(d, '(^|="|>)Bezpośrednie przesyłanie z komórek(?=($|"|<))', "$1"+"Bezpòstrzédné przesyłanié z mòbilczi");
  d = r(d, '(^|="|>)\n            \nProblemy z przesyłaniem\\? Wypróbuj (?=($|"|<))', "$1"+"Tôczel z przesyłanim? Spróbùjë... ");
  d = r(d, '(^|="|>)prosty program do przesyłania(?=($|"|<))', "$1"+"prosti program do przesyłaniégò");
  d = r(d, '(^|="|>) \\(działa również w przypadku starszych komputerów i przeglądarek\\)\\.\n    (?=($|"|<))', "$1"+" (dzejô téż przë starszich kòmpùtrach ë przezérnikach). ");
  d = r(d, '(^|="|>)Prześlij opinię(?=($|"|<))', "$1"+"Przeslë swòje zdanié");
  d = r(d, '(^|="|>)Wybierz pliki (?=($|"|<))', "$1"+"Wëbierzë pliczi");
  d = r(d, '(^|="|>)Wybieranie wielu plików(?=($|"|<))', "$1"+"Wëbierzë wile plików za jedną razą");
  d = r(d, '(^|="|>)\nAby zaznaczyć kilka plików\\, podczas wybierania przytrzymaj Ctrl\\.\n       (?=($|"|<))', "$1"+"Knypsni ë przëtrzëmi knyps Ctrl, cobë nacéchòwac wicy plików za jedną razą.");

// my_webcam
  d = r(d, '(^|="|>)Nagraj film z kamery internetowej(?=($|"|<))', "$1"+"Nagrôj film z jinternetowi kamérë");

// my_videos_edit
  d = r(d, '(^|="|>)\n        Informacje i ustawienia\n    (?=($|"|<))', "$1"+"Wiadła ë ùstôwë");
  d = r(d, '(^|="|>)\n        Ulepszenia\n    (?=($|"|<))', "$1"+"Ùbëlniészenia");
  d = r(d, '(^|="|>)\n        Adnotacje\n    (?=($|"|<))', "$1"+"Dopisczi");
  d = r(d, '(^|="|>)Zobacz na stronie odtwarzania(?=($|"|<))', "$1"+"Òbezdrzi na starnie òdmikaniô filmów");
  d = r(d, '\"Zapisano\"', "\"Zapisóné\"");
  d = r(d, '(^|="|>)Informacje o filmie(?=($|"|<))', "$1"+"Wiadła ò filmie");
  d = r(d, '(^|="|>)\nCzas przesłania\\:\n      (?=($|"|<))', "$1"+"Czas przesłaniégò:");
  d = r(d, '(^|="|>)Czas trwania\\:(?=($|"|<))', "$1"+"Czas dérowaniégò:");
  d = r(d, '(^|="|>)Plik źródłowy\\:(?=($|"|<))', "$1"+"Zdrzadłowi lopk:");
  d = r(d, '(^|="|>)Wyświetlenia\\:(?=($|"|<))', "$1"+"Òdmikóné:");
  d = r(d, '(^|="|>)Oceny pozytywne\\:(?=($|"|<))', "$1"+"Pòzytiwné mërczi:");
  d = r(d, '(^|="|>)Komentarze\\:(?=($|"|<))', "$1"+"Dopòwiescë:");
  d = r(d, '(^|="|>)\nURL filmu\\:(?=($|"|<))', "$1"+"URL òd filmù:");
  d = r(d, '(^|="|>)\nUstaw jako miniaturę\n          (?=($|"|<))', "$1"+"Ùstawi jakno miniaturã");
  d = r(d, '(^|="|>)Informacje podstawowe(?=($|"|<))', "$1"+"Spòdlëczné wiadła");
  d = r(d, '(^|="|>)Ustawienia zaawansowane(?=($|"|<))', "$1"+"Zaawansowóné ùstôwë");
  d = r(d, '(^|="|>)\nUstawienia prywatności\n      (?=($|"|<))', "$1"+"Priwatnoscowé ùstôwë");
  d = r(d, '(^|="|>)Prywatność dotyczy sposobu udostępniania filmów znajomym\\, rodzinie i światu\\.\n        (?=($|"|<))', "$1"+"Priwatnota je sparłãczono z ôrã ùprzëstãpniwaniô filmów drëchóm, familie ë swiatu.");
  d = r(d, '(^|="|>)\nWięcej informacji\n        (?=($|"|<))', "$1"+" Wicy wiadłów");
  d = r(d, '(^|="|>)\nNiepubliczny\n  (?=($|"|<))', "$1"+"Niespòlëznowé");
  d = r(d, '(^|="|>)\nFilm mogą wyszukiwać i oglądać wszystkie osoby\n      (?=($|"|<))', "$1"+"Kòżden mòże nalézc ë òbezdrzec nen film");
  d = r(d, '(^|="|>)\nFilm może oglądać każda osoba mająca link\n      (?=($|"|<))', "$1"+"Film mòże òbezdrzec leno nen, chto mô do niégò pòwrózk");
  d = r(d, '(^|="|>)\nFilm mogą oglądać tylko wybrane przez Ciebie osoby\n      (?=($|"|<))', "$1"+"Film mògą òbzérac leno ti, chtërnëch wëbierzesz");
  d = r(d, '(^|="|>)Kategoria(?=($|"|<))', "$1"+"Kategòriô");
  d = r(d, '(^|="|>)Edukacja(?=($|"|<))', "$1"+"Ùczba");
  d = r(d, '(^|="|>)Film i animacja(?=($|"|<))', "$1"+"Film ë animacjô");
  d = r(d, '(^|="|>)Gry(?=($|"|<))', "$1"+"Jigrë");
  d = r(d, '(^|="|>)Motoryzacja(?=($|"|<))', "$1"+"Mòtorizacjô");
  d = r(d, '(^|="|>)Nauka i technika(?=($|"|<))', "$1"+"Naùka ë technika");
  d = r(d, '(^|="|>)Poradniki i styl(?=($|"|<))', "$1"+"Wskôzë ë sztil");
  d = r(d, '(^|="|>)Rozrywka(?=($|"|<))', "$1"+"Szpas");
  d = r(d, '(^|="|>)Społeczne i non-profit(?=($|"|<))', "$1"+"Spòlëznowé ë non-profit");
  d = r(d, '(^|="|>)Sport(?=($|"|<))', "$1"+"Szport");
  d = r(d, '(^|="|>)Śmieszne(?=($|"|<))', "$1"+"Smiészné");
  d = r(d, '(^|="|>)Wiadomości i polityka(?=($|"|<))', "$1"+"Klëka ë pòlitika");
  d = r(d, '(^|="|>)Zwierzęta(?=($|"|<))', "$1"+"Zwiérzãta");
  d = r(d, '\"Niepubliczny\"', "\"Niespòlëznowé\"");
  d = r(d, '(^|="|>)Opis(?=($|"|<))', "$1"+"Òpisënk");
  d = r(d, '(^|="|>)Komentarze i odpowiedzi(?=($|"|<))', "$1"+"Dopòwiescë ë òdpòwiedzë");
  d = r(d, '(^|="|>)\n\nZezwalaj na komentarze\\:\n                  (?=($|"|<))', "$1"+"Pòzwòlë dodôwac dopòwiescë:");
  d = r(d, '(^|="|>)\nWszystkie\n  (?=($|"|<))', "$1"+"Wszëtczé");
  d = r(d, '(^|="|>)\nZatwierdzone\n  (?=($|"|<))', "$1"+"Zacwierdzoné");
  d = r(d, '(^|="|>)\n\nUżytkownicy mogą głosować na komentarze\\.\n                  (?=($|"|<))', "$1"+"Brëkòwnicë mògą wëlowac na dopòwiescë");
  d = r(d, '(^|="|>)\n\nUżytkownicy mogą wyświetlać oceny tego filmu\n                  (?=($|"|<))', "$1"+"Brëkòwnicë mògą òbôczëc mërczi negò filmù");
  d = r(d, '(^|="|>)\n\nZezwalaj na odpowiedzi wideo\\:\n                  (?=($|"|<))', "$1"+"Pòzwòlë na wideo-òdpòwiescë");
  d = r(d, '(^|="|>)\nWszystkie\n  (?=($|"|<))', "$1"+"Wszëtczé");
  d = r(d, '(^|="|>)\nZatwierdzone\n  (?=($|"|<))', "$1"+"Zacwierdzoné");
  d = r(d, '(^|="|>)Dystrybucja(?=($|"|<))', "$1"+"Distribùcjô");
  d = r(d, '(^|="|>)\nWszędzie\n    (?=($|"|<))', "$1"+"Wszãdze");
  d = r(d, '(^|="|>)Umieszcznie(?=($|"|<))', "$1"+"Wrzucywanié");
  d = r(d, '(^|="|>)\n\nWłącz umieszczanie\\.\n                  (?=($|"|<))', "$1"+"Włączë wrzucywanié");
  d = r(d, '(^|="|>)Zezwalaj innym na umieszczanie filmu na ich stronach\\.\n        (?=($|"|<))', "$1"+"Pòzwòlë jinyma wrzëcywac film na jich starnã");
  d = r(d, '(^|="|>)Lokalizacja filmowania(?=($|"|<))', "$1"+"Plac filmòwaniô");
  d = r(d, '(^|="|>)Szukaj (?=($|"|<))', "$1"+"Nalézë");
  d = r(d, '(^|="|>)Data nagrania(?=($|"|<))', "$1"+"Czas nagraniégò");
  d = r(d, '(^|="|>)Dzisiaj (?=($|"|<))', "$1"+"Dzysô");
  d = r(d, '(^|="|>)Film 3D(?=($|"|<))', "$1"+"Film 3D");
  d = r(d, '(^|="|>)\nBrak preferencji\n    (?=($|"|<))', "$1"+"Felëje preferencjów");
  d = r(d, '(^|="|>)\nWyłącz 3D w tym filmie\n  (?=($|"|<))', "$1"+"Wëłączë 3D w nym filmie");
  d = r(d, '(^|="|>)\nPrzekształć ten film w 3D\\.\n  (?=($|"|<))', "$1"+"Zmiéń nen film w 3D");
  d = r(d, '(^|="|>)\nTo już jest film 3D\n  (?=($|"|<))', "$1"+"To ju je film 3D");
  d = r(d, '(^|="|>)Zapisz zmiany (?=($|"|<))', "$1"+"Zapiszë zmianë");

// view_all_playlists
  d = r(d, '(^|="|>)\\+ Nowa playlista (?=($|"|<))', "$1"+"+ Nowô playlësta");
  d = r(d, '(^|="|>)\nTytuł playlisty\n    (?=($|"|<))', "$1"+"Titel playlëstë");
  d = r(d, '(^|="|>)\nOpis playlisty\n    (?=($|"|<))', "$1"+"+ Òpisënk playlëstë");
  d = r(d, '(^|="|>)Utwórz playlistę (?=($|"|<))', "$1"+"Ùsadzë playlëstã");
  d = r(d, '(^|="|>)\nAnuluj\n      (?=($|"|<))', "$1"+"Anëlëjë");

// my_history
  d = r(d, '(^|="|>)Wyczyść całą historię oglądania (?=($|"|<))', "$1"+"Wëczëszczë całą historiã òbzéraniégò");
  d = r(d, '(^|="|>)Wyczyść całą historię oglądania(?=($|"|<))', "$1"+"Wëczëszczë całą historiã òbzéraniégò");
  d = r(d, '(^|="|>)\nCzy na pewno chcesz wyczyścić całą historię oglądania\\? Operacji nie można cofnąć\\.\n            (?=($|"|<))', "$1"+"Jes gwës, że chcesz wëczëszczëc całą historiã òbzéraniô? Tegò sã nie dô copnąc!");
  d = r(d, '(^|="|>)Wstrzymaj historię oglądania (?=($|"|<))', "$1"+"Wstrzëmi historiã òbzéraniô");
  d = r(d, '(^|="|>)Wznów historię oglądania (?=($|"|<))', "$1"+"Włączë nazôd historiã òbzéraniô");
  d = r(d, '\"Wyświetlenia\"', "\"Òdemkniãca\"");
  d = r(d, '\"Oceny pozytywne\"', "\"Pòzytiwné mërczi\"");
  d = r(d, '\"Oceny negatywne\"', "\"Negatiwné mërczi\"");
  d = r(d, '\"Komentarze\"', "\"Dopòwiescë\"");
  d = r(d, '(^|="|>)Wyczyść całą historię wyszukiwania (?=($|"|<))', "$1"+"Wëczëszczë całą historiã nańdowaniégò");
  d = r(d, '(^|="|>)Wyczyść całą historię wyszukiwania(?=($|"|<))', "$1"+"Wëczëszczë całą historiã nańdowaniégò");
  d = r(d, '(^|="|>)\nCzy na pewno chcesz wyczyścić całą historię wyszukiwania\\? Operacji nie można cofnąć\\.\n            (?=($|"|<))', "$1"+"Jes gwës, że chcesz wëczëszczëc całą historiã nańdowaniégò? Tegò sã nie do copnąc!");
  d = r(d, '(^|="|>)Wstrzymaj historię wyszukiwania (?=($|"|<))', "$1"+"Wstrzëmi historiã nańdowaniô");
  d = r(d, '(^|="|>)Wznów historię wyszukiwania (?=($|"|<))', "$1"+"Włączë nazôd historiã nańdowaniô");
  d = r(d, '(^|="|>)Załaduj więcej wyszukiwań (?=($|"|<))', "$1"+"Wladëjë wicy nańdowań");
  d = r(d, '(^|="|>)Moja historia wyszukiwania(?=($|"|<))', "$1"+"Mòja historiô nańdowaniégò");
  d = r(d, '(^|="|>)Historia wyszukiwania jest pusta\\.(?=($|"|<))', "$1"+"Historiô nańdowaniégò je lózô.");
  d = r(d, '(^|="|>)\n    Nie znaleziono filmów wideo\\.\n  (?=($|"|<))', "$1"+"Ni mô nalazłé filmów wideo");

// my_favorites
  d = r(d, '(^|="|>)Odtwórz wszystkie (?=($|"|<))', "$1"+"Òdemkni wszëtczé");

// my_liked_videos
  d = r(d, '(^|="|>)Fajne filmy(?=($|"|<))', "$1"+"Ùwidzoné filmë");

//inbox
  d = r(d, '(^|="|>)Utwórz (?=($|"|<))', "$1"+"Ùsôdzë");
  d = r(d, '(^|="|>)Wiadomości osobiste(?=($|"|<))', "$1"+"Priwatné wiadła");
  d = r(d, '(^|="|>)Udostępniane Tobie(?=($|"|<))', "$1"+"Ùprzëstãpnionô dlô Ce");
  d = r(d, '(^|="|>)Komentarze(?=($|"|<))', "$1"+"Dopòwiescë");
  d = r(d, '(^|="|>)Powiadomienia o kontaktach(?=($|"|<))', "$1"+"Wiadła ò łączbach");
  d = r(d, '(^|="|>)Odpowiedzi wideo(?=($|"|<))', "$1"+"Wideo-òdpòwiescë");
  d = r(d, '(^|="|>)Książka adresowa (.+)(?=($|"|<))', "$1"+"Adresë"+"$2");

// my_subscriptions
  d = r(d, '(^|="|>)Dodaj do (?=($|"|<))', "$1"+"Dodôj do");
  d = r(d, '(^|="|>)Nowe filmy(?=($|"|<))', "$1"+"Nowé filmë");
  d = r(d, '(^|="|>)\n        Nowe filmy\n    (?=($|"|<))', "$1"+" Nowé filmë ");
  d = r(d, '(^|="|>)\n          Nie znaleziono filmów wideo\\.\n        (?=($|"|<))', "$1"+"Ni mô nalazłé filmów wideo");
  d = r(d, '(^|="|>)\nZnajdź więcej kanałów\n    (?=($|"|<))', "$1"+"Nalézë wicy kanałów");
  d = r(d, '(^|="|>)\nKanały wybrane dla Ciebie\n    (?=($|"|<))', "$1"+"Bédowóné kanałë");
  d = r(d, '(^|="|>)\nSortuj według\\:\n\n\n    \n\n    \n    \n\n\n  (?=($|"|<))', "$1"+"Pòkôżë wedlë: ");
  d = r(d, '(^|="|>)\n              autor\\:     (?=($|"|<))', "$1"+" ùsôdzca: ");
  d = r(d, '(^|="|>)\n                Wyświetlenia\\:\n              (?=($|"|<))', "$1"+"Òdemknienia: ");
  d = r(d, '(^|="|>)\n                (1?[2-4]) sek\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" sekùńdë nazôd");
  d = r(d, '(^|="|>)\n                (1?[5-9]) sek\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" sekùńdów nazôd");
  d = r(d, '(^|="|>)\n                ([0-9,]+) sek\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" sekùńd nazôd");
  d = r(d, '(^|="|>)\n                (1?[2-4]) min\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" minutë nazôd");
  d = r(d, '(^|="|>)\n                (1?[5-9]) min\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" minut nazôd");
  d = r(d, '(^|="|>)\n                ([0-9,]+) min\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" minut nazôd");
  d = r(d, '(^|="|>)\n                1 godzinę temu\n\n            (?=($|"|<))', "$1"+" "+"1 gòdznã nazôd");
  d = r(d, '(^|="|>)\n                (1?[2-4]) godz\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" gòdznë nazôd");
  d = r(d, '(^|="|>)\n                (1?[5-9]) godz\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" gòdznów nazôd");
  d = r(d, '(^|="|>)\n                ([0-9,]+) godz\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" gòdznów nazôd");
  d = r(d, '(^|="|>)\n                1 dzień temu\n\n            (?=($|"|<))', "$1"+" "+"1 dzéń nazôd");
  d = r(d, '(^|="|>)\n                ([0-9,]+) dni temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" dniów nazôd");
  d = r(d, '(^|="|>)\n                1 tydzień temu\n\n            (?=($|"|<))', "$1"+" "+"1 tidzéń nazôd");
  d = r(d, '(^|="|>)\n                (1?[2-4]) tygodnie temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" tidznie nazôd");
  d = r(d, '(^|="|>)\n                1 miesiąc temu\n\n            (?=($|"|<))', "$1"+" "+"1 miesąc nazôd");
  d = r(d, '(^|="|>)\n                (1?[2-4]) mies\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" miesące nazôd");
  d = r(d, '(^|="|>)\n                (1?[5-9]) mies\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" miesãcy nazôd");
  d = r(d, '(^|="|>)\n                ([0-9,]+) mies\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" miesãcy nazôd");
  d = r(d, '(^|="|>)\n                1 rok temu\n\n            (?=($|"|<))', "$1"+" "+"łońsczégò rokù");
  d = r(d, '(^|="|>)\n                (1?[2-4]) lata temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" lata dowslôdë");
  d = r(d, '(^|="|>)\n                (1?[5-9]) lata temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" lat dowslôdë");
  d = r(d, '(^|="|>)\n                ([0-9,]+) lata temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" lat dowslôdë");

// account
  d = r(d, '(^|="|>)Ustawienia konta(?=($|"|<))', "$1"+"Ùstôwë dlô kònta");
  d = r(d, '(^|="|>)\nOgólne    (?=($|"|<))', "$1"+"Òglowé");
  d = r(d, '(^|="|>)\nUdostępnianie    (?=($|"|<))', "$1"+"Ùprzëstãpnianié");
  d = r(d, '(^|="|>)\nOdtwarzanie    (?=($|"|<))', "$1"+"Òdmëkanié");
  d = r(d, '(^|="|>)\nGenerowanie przychodu    (?=($|"|<))', "$1"+"Zaróbkòwanié");
  d = r(d, '(^|="|>)\nDomyślne    (?=($|"|<))', "$1"+"Spòdlëczné ùstôwë");
  d = r(d, '(^|="|>)Ogólne\n(?=($|"|<))', "$1"+"Òglowé");
  d = r(d, '(^|="|>)Zapisz (?=($|"|<))', "$1"+"Zapiszë");
  d = r(d, '(^|="|>)Informacje o koncie(?=($|"|<))', "$1"+"Wiadła ò kònce");
  d = r(d, '(^|="|>)Imię i nazwisko(?=($|"|<))', "$1"+"Miono ë nôzwëstkò");
  d = r(d, '(^|="|>)zmień(?=($|"|<))', "$1"+"zmiéń");
  d = r(d, '(^|="|>)Zamknij(?=($|"|<))', "$1"+"Zamkni");
  d = r(d, '(^|="|>)Zmień zdjęcie(?=($|"|<))', "$1"+"Zmieni òdjimk");
  d = r(d, '(^|="|>)Zaawansowane(?=($|"|<))', "$1"+"Zaawansowóné");
  d = r(d, '(^|="|>)Zmień hasło(?=($|"|<))', "$1"+"Zmieni parolã");
  d = r(d, '(^|="|>)Zostaniesz przekierowany na stronę Twojego konta Google(?=($|"|<))', "$1"+"Bãdzesz sczerowóny do swòji starnë z kònta Google");
  d = r(d, '(^|="|>)Przesłane z komórki(?=($|"|<))', "$1"+"Przesłóné z mòbilczi");
  d = r(d, '(^|="|>)\nPrześlij film z telefonu\\, wysyłając e-maila na ten adres\\.\nChcesz mieć inny adres\\?\n          (?=($|"|<))', "$1"+"Przeslë film z mòbilczi, wësyłającë mejla na ną adrésã. Chcesz miec jiną adrésã? ");
  d = r(d, '(^|="|>)Kliknij tutaj(?=($|"|<))', "$1"+"Knypsni tuwò");
  d = r(d, '(^|="|>)Stan konta(?=($|"|<))', "$1"+"Sztatus kònta");
  d = r(d, '(^|="|>)Ma dobrą opinię(?=($|"|<))', "$1"+"Mô bëlné zdanié");
  d = r(d, '(^|="|>)Wytyczne dla społeczności(?=($|"|<))', "$1"+"Doradë dlô spòlëznë");
  d = r(d, '(^|="|>)Ostrzeżenia dotyczące praw autorskich(?=($|"|<))', "$1"+"Òstrzedżi sparłãczoné z ùsôdzkòwima prawama");
  d = r(d, '(^|="|>)Roszczenia dotyczące identyfikacji treści(?=($|"|<))', "$1"+"Ùwôdżi sprałãczoné z zamkłoscą filmù");
  d = r(d, '(^|="|>)\n\n      Zezwalaj na wyświetlanie reklam przy moich filmach\n    (?=($|"|<))', "$1"+"Pòzwòlë na pòkazywanié reklamów przë swòjich filmach");
  d = r(d, '(^|="|>)\n\n      Nie zezwalaj na wyświetlanie reklam przy moich filmach\n    (?=($|"|<))', "$1"+"Nié pòzwòliwôj na pòkazywanié reklamów przë swòjich filmach");
  d = r(d, '(^|="|>)Reklamy będą wyświetlane tylko przy filmach\\, do których masz wszystkie prawa\\. Po wybraniu tej opcji  wszystkie opcje generowania przychodu ustawione dla Twoich filmów zostaną wyłączone\\.(?=($|"|<))', "$1"+"Reklamë mdą pòkazywóné leno przë filmach, do jaczich môsz wszëtczé prawa. Przë włączenim tegò wszëtczé òptacejë sparłãczoné z zaróbkama òstóną wëłączoné!");
  d = r(d, '(^|="|>)Dowiedz się\\, jak promować swoje filmy(?=($|"|<))', "$1"+"Doznôj sã, jak mòżesz promòwac swòje filmë");

// account_sharing
  d = r(d, '(^|="|>)Udostępnianie\n(?=($|"|<))', "$1"+"Ùprzëstãpniwónié");
  d = r(d, '(^|="|>)Połącz swoje konta(?=($|"|<))', "$1"+"Sparłączë swòje kònta");
  d = r(d, '(^|="|>)\nWyłącz udostępnianie aktywności\n              (?=($|"|<))', "$1"+"Wëłączë ùprzëstãpniéwónié twòji aktiwnotë");
  d = r(d, '(^|="|>)\nWłącz udostępnianie aktywności\n              (?=($|"|<))', "$1"+"Włączë ùprzëstãpniéwónié twòji aktiwnotë");
  d = r(d, '(^|="|>)\nOdłącz konto\n              (?=($|"|<))', "$1"+"Òdłączë kònto");
  d = r(d, '(^|="|>)Udostępnij moją aktywność\\, gdy\\:(?=($|"|<))', "$1"+"Ùprzëstãpni mòją aktownotã, czej:");
  d = r(d, '(^|="|>)Na połączonych kontach(?=($|"|<))', "$1"+"Na sparłãczonëch kòntach");
  d = r(d, '(^|="|>)Prześlę film.(?=($|"|<))', "$1"+"Wrzëcã film*");
  d = r(d, '(^|="|>)Dodam film do playlisty..(?=($|"|<))', "$1"+"Dodóm film do playlëstë**");
  d = r(d, '(^|="|>)Dodam film do ulubionych(?=($|"|<))', "$1"+"Dodóm film do ùwidzonëch");
  d = r(d, '(^|="|>)Spodoba mi się film(?=($|"|<))', "$1"+"Ùwidzy mie sã film");
  d = r(d, '(^|="|>)Skomentuję film(?=($|"|<))', "$1"+"Dodóm dopòwiesc do filmù");
  d = r(d, '(^|="|>)Zasubskrybuję kanał(?=($|"|<))', "$1"+"Zasubskribùjã kanôł");
  d = r(d, '(^|="|>)(.+) Przesłane filmy publiczne są zawsze udostępniane w YouTube\\.(?=($|"|<))', "$1"+"$2"+" Przesłoné, spòlëznowé filmë wiedno są ùprzëstãpniwóné na YouTube.");
  d = r(d, '(^|="|>)(.+) Dostępność informacji o dodaniu filmu do playlisty zależy od ustawień prywatności tej playlisty(?=($|"|<))', "$1"+"$2"+" Dostãpnota wiadłów ò dodanim filmù do playlëstë zanôlégò òd ùstôwów priwatnotë ny playlëstë.");

// account_privacy
  d = r(d, '(^|="|>)Wyszukiwanie i kontakty(?=($|"|<))', "$1"+"Nańdowanié ë kòntaktë");
  d = r(d, '(^|="|>)\n\n      Zezwalaj (.+)tylko moim kontaktom(.+) na wysyłanie do mnie wiadomości i udostępnianie filmów\n    (?=($|"|<))', "$1"+"  Pòzwòlë "+"$2"+"leno mòjim kòntaktóm"+"$3"+" wësyłac do mie wiadła ë ùprzëstãpniwac filmë");
  d = r(d, '(^|="|>)\n\n      Zezwalaj osobom, które znają mój adres e-mail, na znajdowanie mojego kanału w YouTube\n    (?=($|"|<))', "$1"+"  Pòzwòlë tim, co znają mòjégò mejla nalézc mie na YouTube");
  d = r(d, '(^|="|>)Reklamy związane z moimi zainteresowaniami(?=($|"|<))', "$1"+"Reklamë sparłãczoné z mòjima zajinteresowaniama");
  d = r(d, '(^|="|>)\n\n      Pokazuj reklamy na interesujące mnie tematy na podstawie moich informacji\n    (?=($|"|<))', "$1"+"Wëswietlë reklamë sparłãczoné z mòjima zajinteresowaniama na spòdlim wiadłów ò mie");
  d = r(d, '(^|="|>)Statystyki i dane(?=($|"|<))', "$1"+"Statisticzi ë wiadła");
  d = r(d, '(^|="|>)\n\n      Domyślnie udostępniaj publicznie statystyki i dane moich filmów\n    (?=($|"|<))', "$1"+"  Domëslnô ùprzëstãpniwôj statisticzi ë wiadła ò mòjich filmach");
  d = r(d, '(^|="|>)\nW sekcji \\„Statystyki i dane\\” widzowie znajdą interesujące informacje na temat każdego Twojego filmu\\. Zmiana ustawienia domyślnego spowoduje zmianę ustawień dla wszystkich Twoich filmów\\.\n  (?=($|"|<))', "$1"+"W môlu \"Statisticzi ë wiadła\" pòkôżë wiadła ò wszëtczich mòjich filmach. Zmiana domëslnëch ùstôwów zmieni ùstôwë dlô wszëtczich filmów.");

// account_notifications
  d = r(d, '(^|="|>)Adres e-mail(?=($|"|<))', "$1"+"Mejlowô adrésa");
  d = r(d, '(^|="|>)\nTwój obecny adres e-mail\\: (?=($|"|<))', "$1"+"Aktualnô mejlowô adrésa: ");
  d = r(d, '(^|="|>)Język używany w e-mailach\\: (.+) Czy chcesz dokonać zmiany na język polski\\?(?=($|"|<))', "$1"+"Brëkòwóny jãzëk w mejlu: "+"$2"+". Chcesz zmienic na kaszëbsczi?");
  d = r(d, '(^|="|>)Zmień na język polski (?=($|"|<))', "$1"+"Zmieni na kaszëbsczi");
  d = r(d, '(^|="|>)Podsumowanie subskrypcji(?=($|"|<))', "$1"+"Pòdrëchòwanié subskripcjów");
  d = r(d, '(^|="|>)\n    Wysyłaj do mnie e-maile z informacją o najnowszych filmach z moich subskrypcji\\:\n  (?=($|"|<))', "$1"+"Wësëli do mie mejle z wiadłama z mòjich subskripców: ");
  d = r(d, '(^|="|>)Raz dziennie(?=($|"|<))', "$1"+"Rôz na dzéń");
  d = r(d, '(^|="|>)Raz w tygodniu(?=($|"|<))', "$1"+"Rôz na tidzéń");
  d = r(d, '(^|="|>)Powiadomienia e-mail(?=($|"|<))', "$1"+"Mejlowé wiadła");
  d = r(d, '(^|="|>)\n\n      Chcę otrzymywać powiadomienia e-mail\\, gdy\\:\n    (?=($|"|<))', "$1"+"Przëslë mie mejla, czej:");
  d = r(d, '(^|="|>)\n\n      Ktoś zasubskrybuje mój kanał\n    (?=($|"|<))', "$1"+"  Chtos zasubskribùje mój kanôł");
  d = r(d, '(^|="|>)\n\n      Ktoś doda nowy komentarz na moim kanale\n    (?=($|"|<))', "$1"+"  Chtos dodô nową dopòwiesc na mòjim kanale");
  d = r(d, '(^|="|>)\n\n      Ktoś skomentuje mój film lub doda odpowiedź wideo\n    (?=($|"|<))', "$1"+"  Chtos dodô dopòwiesc do mòjégò filmù");
  d = r(d, '(^|="|>)\n\n      Otrzymam nową wiadomość prywatną lub ktoś udotępni mi film\n    (?=($|"|<))', "$1"+"  Chtos do mie napisze abò ùprzëstãpni mie film");
  d = r(d, '(^|="|>)\n\n      Powiadomienia o wydarzeniach na żywo w YouTube\n    (?=($|"|<))', "$1"+"  Wiadła ò rozëgracjach na żëwò na YouTube");
  d = r(d, '(^|="|>)\n\n      Nie chcę otrzymywać żadnych e-maili\n    (?=($|"|<))', "$1"+"  Nie chcã dostôwac niżódnëch mejlów");
  d = r(d, '(^|="|>)Newslettery YouTube(?=($|"|<))', "$1"+"Bùlietinë YouTube");
  d = r(d, '(^|="|>)Wybierz newslettery\\, które chcesz co jakiś czas dostawać z YouTube\\:(?=($|"|<))', "$1"+"Wëbierzë czedë chcesz dostôwac bùlietine YouTube:");
  d = r(d, '(^|="|>)\n\n      Wszystkie newslettery YouTube\n    (?=($|"|<))', "$1"+"  Wszëtczé bùlietinë");
  d = r(d, '(^|="|>)\n\n      Comiesięczny newsletter YouTube\n    (?=($|"|<))', "$1"+"  Rôz na miesąc");
  d = r(d, '(^|="|>)\n\n      Comiesięczny newsletter YouTube o filmach\n    (?=($|"|<))', "$1"+"  Rôz na miesąc - leno ò filmach");
  d = r(d, '(^|="|>)\n\n      Comiesięczny newsletter YouTube o muzyce\n    (?=($|"|<))', "$1"+"  Rôz na miesąc - leno ò mùzyce");
  d = r(d, '(^|="|>)\n\n      Comiesięczny newsletter YouTube o polityce\\, edukacji i informacjach ze świata\n    (?=($|"|<))', "$1"+"  Rôz na miesąc - ò pòlitice, ùczbie ë wiadłach ze swiata");

// account_playback
  d = r(d, '(^|="|>)Odtwarzanie\n(?=($|"|<))', "$1"+"Òdmëkanié");
  d = r(d, '(^|="|>)Jakość odtwarzania filmów(?=($|"|<))', "$1"+"Jakòsc òdmëkaniégò filmów");
  d = r(d, '(^|="|>)\n\n      Zawsze wybieraj jak najlepszą jakość na podstawie szybkości łącza i rozmiaru odtwarzacza\n    (?=($|"|<))', "$1"+"  Wiedno wëbierzë nôlepszą jakòsc dlô chùtkòscë jinternétë ë wiôlgòscë òdmëkónégò filmù");
  d = r(d, '(^|="|>)\n\n      Po przełączeniu na pełny ekran zawsze odtwarzaj w jakości HD \\(jeśli jest dostępna\\)\n    (?=($|"|<))', "$1"+"  Jeżlë mdze to mòżebné, wiedno włącziwôj jakòs HD, czej òdemkã film na fùlnym ekranie.");
  d = r(d, '(^|="|>)\n\n      Mam wolne łącze\\. Nigdy nie odtwarzaj filmów w wysokiej jakości\n    (?=($|"|<))', "$1"+"  Ni móm chùtczé jinternétë. Nie òdmikôj filmów w baro bëlny jakòscë.");
  d = r(d, '(^|="|>)\n\n      Pokazuj adnotacje w filmach\n    (?=($|"|<))', "$1"+"  Pòkôżë dopòwiescë w filmach");
  d = r(d, '(^|="|>)\n\n      Zawsze pokazuj napisy\n    (?=($|"|<))', "$1"+"  Wiedno wëswietlë nôdpisë");
  d = r(d, '(^|="|>)\n\n      Wyświetlaj napisy automatyczne z systemu rozpoznawania mowy \\(jeśli są dostępne\\)\n    (?=($|"|<))', "$1"+"  Wëswietlë nôdpisë aùtomaticzno z sëstemù rozpòznôwaniégò mòwë - żlë mdze to mòżebné");

// account_defaults
  d = r(d, '(^|="|>)Domyślne ustawienia przesyłania\n(?=($|"|<))', "$1"+"Domëslné ùstôwë przesyłaniégò");
  d = r(d, '(^|="|>)Ustaw wartości domyślne\\, które będą używane przy przesyłaniu kolejnych filmów\\. Ustawienia te możesz zmienić dla poszczególnych filmów\\.(?=($|"|<))', "$1"+"Ùstawi domëslné ùstôwë, jaczé mdą brëkòwóné przë wrzëcanim pòstãpnëch filmów. Ùstôwë jidze zmienic dlô kòżdégò filmù.");
  d = r(d, '(^|="|>)Kategoria(?=($|"|<))', "$1"+"Kategòriô");
  d = r(d, '(^|="|>)Wybierz kategorię(?=($|"|<))', "$1"+"Wëbierzë kategòriã");
  d = r(d, '(^|="|>)Licencja(?=($|"|<))', "$1"+"Licencjô");
  d = r(d, '(^|="|>)\nStandardowa licencja YouTube\n   (?=($|"|<))', "$1"+"Sztandardowô licencjô YouTube");
  d = r(d, '(^|="|>)\nCreative Commons – uznanie autorstwa\n   (?=($|"|<))', "$1"+"Creative Commons – z pòdaniém ùsôdzcë");

// other
  d = r(d, '(^|="|>)\n            Ten film zawiera treść od partnerów (.+) i (.+). Nie jest on dostępny.\n    (?=($|"|<))', "$1"+"Nen film mô zamkłosc òd "+"$2"+" ë "+"$3"+". Filmù nie jidze òbezdrzëc.");
  d = r(d, '(^|="|>)Przepraszamy za usterki\\.(?=($|"|<))', "$1"+"Wëbôczta za tôczle.");
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


