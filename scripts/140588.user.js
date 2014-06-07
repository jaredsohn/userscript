// ==UserScript==
// @name        YouTube-szl
// @namespace   http://userscripts.org/users/477177
// @description Translates YouTube to Silesian 
// @include     http*://*.youtube.*/*
// @include     http*://youtube.*/*

// @version     0.1
// ==/UserScript==

// Last updated:   2012-07-30
// Translations:   Grzegorz Kulik - www.poslunsku.eu

/*
 *  Copyright 2012 Kevin Scannell, Grzegorz Kulik
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
  d = r(d, '\"Strona główna YouTube\"', "\"Przodniŏ strōna ôd YouTube\"");
  d = r(d, '(^|="|>)Zaloguj się(?=($|"|<))', "$1"+"Zaloguj sie");
  d = r(d, '(^|="|>)Przeglądaj(?=($|"|<))', "$1"+"Poszukowuj");
  d = r(d, '(^|="|>)Prześlij film(?=($|"|<))', "$1"+"Prziślij film");
  d = r(d, '(^|="|>) Reklama (?=($|"|<))', "$1"+"Werbōng");
  d = r(d, '(^|="|>)    Kategorie YouTube\n(?=($|"|<))', "$1"+"Kategoryje ôd YouTube");
  d = r(d, '(^|="|>)\nZaloguj się\\, by dodać kanały do strony głównej\n      (?=($|"|<))', "$1"+"Zaloguj sie, coby dodać kanały do przodnij strōny");
  d = r(d, '(^|="|>)Szukaj(?=($|"|<))', "$1"+"Szukej");
  d = r(d, '(^|="|>)Zaloguj się (?=($|"|<))', "$1"+"Zaloguj sie");
  d = r(d, '(^|="|>)Załóż konto (?=($|"|<))', "$1"+"Złōnacz kōnto");
  d = r(d, '(^|="|>)\nKategorie YouTube\n          (?=($|"|<))', "$1"+"Kategoryje ôd YouTube");
  d = r(d, '(^|="|>)\n          Trendy\n      (?=($|"|<))', "$1"+"Tryndy");
  d = r(d, '(^|="|>)\n          Rozrywka\n      (?=($|"|<))', "$1"+"Szpas");
  d = r(d, '(^|="|>)\n          Sport\n      (?=($|"|<))', "$1"+"Szport");
  d = r(d, '(^|="|>)\n          Śmieszne\n      (?=($|"|<))', "$1"+"Śmiyszne");
  d = r(d, '(^|="|>)\n          Film i animacja\n      (?=($|"|<))', "$1"+"Film i animacyjŏ");
  d = r(d, '(^|="|>)\n          Gry\n      (?=($|"|<))', "$1"+"Szpile");
  d = r(d, '(^|="|>)zobacz wszystko(?=($|"|<))', "$1"+"ôbezdrzij wszyjsko");
  d = r(d, '(^|="|>)\nWybrane dla Ciebie »\n      (?=($|"|<))', "$1"+"Ôbrane dlŏ ciebie");
  d = r(d, '(^|="|>)\nPolecane\n    (?=($|"|<))', "$1"+"Rekōmandowane");
  d = r(d, '(^|="|>)\n przesłał\\(a\\) film\n\n\n\n              (?=($|"|<))', "$1"+" przisłoł(ała) wideo");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pōmoc");
  d = r(d, '(^|="|>)Informacje(?=($|"|<))', "$1"+"Ô YouTube");
  d = r(d, '(^|="|>)Centrum prasowe(?=($|"|<))', "$1"+"Cyntrōm cajtōngowe");
  d = r(d, '(^|="|>)Prawa autorskie(?=($|"|<))', "$1"+"Autoske prawa");
  d = r(d, '(^|="|>)Twórcy i partnerzy(?=($|"|<))', "$1"+"Autōry i partnery");
  d = r(d, '(^|="|>)Reklamy(?=($|"|<))', "$1"+"Werbōng");
  d = r(d, '(^|="|>)Programiści(?=($|"|<))', "$1"+"Programisty");
  d = r(d, '(^|="|>)Bezpieczeństwo(?=($|"|<))', "$1"+"Bezpiyczność");
  d = r(d, '(^|="|>)Zgłoś błąd(?=($|"|<))', "$1"+"Dej znać ô błyndzie");
  d = r(d, '(^|="|>)Spróbuj czegoś nowego\\!(?=($|"|<))', "$1"+"Sprōbuj cosik nowygo!");
  d = r(d, '(^|="|>)\nJęzyk\\:\n          \n  (?=($|"|<))', "$1"+"Mŏwa: ");
  d = r(d, '(^|="|>)Polski (?=($|"|<))', "$1"+"Ślōnskŏ ");
  d = r(d, '(^|="|>)\nLokalizacja\\:\n          \n  (?=($|"|<))', "$1"+"Lokalizacyjŏ: ");
  d = r(d, '(^|="|>)Czechy (?=($|"|<))', "$1"+"Czeskŏ republika");
  d = r(d, '(^|="|>)\nTryb bezpieczny\\:\n          \n  (?=($|"|<))', "$1"+"Bezpiyczność: ");
  d = r(d, '(^|="|>)Wyłączony\n (?=($|"|<))', "$1"+"Niy");
  d = r(d, '(^|="|>)Włączony\n (?=($|"|<))', "$1"+"Ja");
  d = r(d, '(^|="|>)\n            Tryb bezpieczny jest teraz włączony\\.\n    (?=($|"|<))', "$1"+"Ino bezpieczny skłŏd je widzialny.");
  d = r(d, '(^|="|>)\n            Tryb bezpieczny został wyłączony\n    (?=($|"|<))', "$1"+"Cŏłki skłŏd YouTube je widzialny.");
  d = r(d, '(^|="|>)\nwięcej\n              (?=($|"|<))', "$1"+"wiyncyj");
  d = r(d, '(^|="|>)\nmniej\n              (?=($|"|<))', "$1"+"mynij");
  d = r(d, '(^|="|>)\nSubskrypcje\n            (?=($|"|<))', "$1"+"Abōniyrowane");
  d = r(d, '(^|="|>)Przeglądaj kanały (?=($|"|<))', "$1"+"Podszukowuj kanały ");
  d = r(d, '(^|="|>)\n            Uaktualnij konto\n          (?=($|"|<))', "$1"+"Uaktualnij kōnto");
  d = r(d, '(^|="|>)Mój kanał(?=($|"|<))', "$1"+"Mōj kanał");
  d = r(d, '(^|="|>)Moje filmy(?=($|"|<))', "$1"+"Moje wideo");
  d = r(d, '\"Filmy przesłane przez Ciebie\"', "\"Wideo przisłane ôd ciebie\"");
  d = r(d, '(^|="|>)Lubiane(?=($|"|<))', "$1"+"Poprzōne");
  d = r(d, '\"Filmy wskazane przez Ciebie jako lubiane\"', "\"Wideo poprzōne ôd ciebie\"");
  d = r(d, '(^|="|>)Historia(?=($|"|<))', "$1"+"Gyszichta");
  d = r(d, '\"Filmy obejrzane przez Ciebie\"', "\"Wideo ôbezdrzane ôd ciebie\"");
  d = r(d, '(^|="|>)Do obejrzenia(?=($|"|<))', "$1"+"Do ôbezdrzyniŏ");
  d = r(d, '\"Filmy dodane do Twojej listy Do obejrzenia\"', "\"Raja wideo, kere chcesz ôbezdrzeć\"");
  d = r(d, '(^|="|>)\nSubskrypcje\n      (?=($|"|<))', "$1"+"Abōniyrowane");
  d = r(d, '(^|="|>)Subskrypcje\\: ([0-9,]+)\n(?=($|"|<))', "$1"+"Abōniyrowanych: "+"$2");
  d = r(d, '(^|="|>)\n\nPokaż tylko przesłane filmy\n  (?=($|"|<))', "$1"+"Pokŏż ino przisłane widea");
  d = r(d, '(^|="|>)Widok (?=($|"|<))', "$1"+"Pokazuj");
  d = r(d, '(^|="|>)Najważniejsze wydarzenia(?=($|"|<))', "$1"+"Nŏjważniyjsze przitrefiynia");
  d = r(d, '(^|="|>)Wszystko(?=($|"|<))', "$1"+"Wszyjsko");
  d = r(d, '(^|="|>)\n    \n([0-9,]+) wyświetleń\n  (?=($|"|<))', "$1"+"$2"+" razy grane");
  d = r(d, '(^|="|>)\n    \n([0-9,]+) wyświetlenia\n  (?=($|"|<))', "$1"+"$2"+" razy grane");
  d = r(d, '(^|="|>)\n lubi ten film\n\n\n\n\n              (?=($|"|<))', "$1"+"przaje tymu wideo");
  d = r(d, '(^|="|>)\n\n\nprzesłał\\(a\\)    \\•\n\n        (?=($|"|<))', "$1"+"przisłoł(ała) • ");
  d = r(d, '(^|="|>)\ndodał\\(a\\) do (?=($|"|<))', "$1"+"dodoł(ała) do ");
  d = r(d, '(^|="|>)\n\n\nprzesłał\\(a\\)    \\•\n(?=($|"|<))', "$1"+"przisłoł(ała) • ");
  d = r(d, '(^|="|>)skomentował\\(a\\)(?=($|"|<))', "$1"+"skōmyntowoł(ała)");
  d = r(d, '(^|="|>)\n dodał\\(a\\) \n1 film do (?=($|"|<))', "$1"+" dodoł(ała) 1 wideo do ");
  d = r(d, '(^|="|>)\ndodał\\(a\\) \n([0-9,]+) filmy do (?=($|"|<))', "$1"+" dodoł(ała) "+"$2"+" wideo do ");
  d = r(d, '(^|="|>)\ndodał\\(a\\) \n([0-9,]+) filmów do (?=($|"|<))', "$1"+" dodoł(ała) "+"$2"+" wideo do ");
  d = r(d, '(^|="|>)    \\•\ndodał\\(a\\) do listy   (?=($|"|<))', "$1"+" • dodoł(ała) do listy ");
  d = r(d, '(^|="|>)Ulubione(?=($|"|<))', "$1"+"Wertowne");
  d = r(d, '(^|="|>)\n    \\•\nlubi\n\n              (?=($|"|<))', "$1"+" • przaje ");
  d = r(d, '(^|="|>)\nOdtwórz wszystkie\n      (?=($|"|<))', "$1"+"Grej wszyjske");
  d = r(d, '(^|="|>)wyświetl całą playlistę \\(\n([0-9,]+) filmy\\)(?=($|"|<))', "$1"+"Pokŏż cŏłkõ playlistã ("+"$2"+" filmy)");
  d = r(d, '(^|="|>)\n dodał\\(a\\) film\\(y\\) do playlisty   (?=($|"|<))', "$1"+" dodoł(ała) wideo do playlisty ");
  d = r(d, '(^|="|>)wyświetl playlistę \\(\n(1?[2-4]) filmów\\)(?=($|"|<))', "$1"+"Pokŏż playlistã ("+"$2"+" filmy)");
  d = r(d, '(^|="|>)wyświetl playlistę \\(\n(1?[5-9]) filmów\\)(?=($|"|<))', "$1"+"Pokŏż playlistã ("+"$2"+" filmōw)");
  d = r(d, '(^|="|>)wyświetl playlistę \\(\n([0-9,]+) filmów\\)(?=($|"|<))', "$1"+"Pokŏż playlistã ("+"$2"+" filmōw)");
  d = r(d, '(^|="|>)\nWczytaj więcej\n  (?=($|"|<))', "$1"+"Laduj wiyncyj");
  d = r(d, '(^|="|>)\n    (1?[2-4]) sek\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" sekōndy do zadku");
  d = r(d, '(^|="|>)\n    (1?[5-9]) sek\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)\n    ([0-9,]+) sek\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)\n    (1?[2-4]) min\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" minuty do zadku");
  d = r(d, '(^|="|>)\n    (1?[5-9]) min\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)\n    ([0-9,]+) min\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)\n    1 godzinę temu\n  (?=($|"|<))', "$1"+" "+"1 godzinã do zadku");
  d = r(d, '(^|="|>)\n    (1?[2-4]) godz\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" godziny do zadku");
  d = r(d, '(^|="|>)\n    (1?[5-9]) godz\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)\n    ([0-9,]+) godz\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)\n    1 dzień temu\n  (?=($|"|<))', "$1"+" "+"1 dziyń do zadku");
  d = r(d, '(^|="|>)\n    ([0-9,]+) dni temu\n  (?=($|"|<))', "$1"+" "+"$2"+" dni do zadku");
  d = r(d, '(^|="|>)\n    1 tydzień temu\n  (?=($|"|<))', "$1"+" "+"1 tydziyń do zadku");
  d = r(d, '(^|="|>)\n    (1?[2-4]) tygodnie temu\n  (?=($|"|<))', "$1"+" "+"$2"+" tydnie do zadku");
  d = r(d, '(^|="|>)\n    1 miesiąc temu\n  (?=($|"|<))', "$1"+" "+"1 miesiōnc do zadku");
  d = r(d, '(^|="|>)\n    (1?[2-4]) mies\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" miesiōnce do zadku");
  d = r(d, '(^|="|>)\n    (1?[5-9]) mies\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)\n    ([0-9,]+) mies\\. temu\n  (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)\n    1 rok temu\n  (?=($|"|<))', "$1"+" "+"1 rok do zadku");
  d = r(d, '(^|="|>)\n    (1?[2-4]) lata temu\n  (?=($|"|<))', "$1"+" "+"$2"+" lata do zadku");
  d = r(d, '(^|="|>)\n    (1?[5-9]) lata temu\n  (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");
  d = r(d, '(^|="|>)\n    ([0-9,]+) lata temu\n  (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");
  d = r(d, '(^|="|>)\nWygląda na to\\, że jeszcze nie masz żadnych subskrypcji\\.\n      (?=($|"|<))', "$1"+"Zdŏ sie, że niy abōniyrujesz jeszcze nic.");
  d = r(d, '(^|="|>)\nZacznij od dodania kanałów\\.\n      (?=($|"|<))', "$1"+"Zacznij ôd dopisaniŏ kanałōw");
  d = r(d, '(^|="|>)\nMój kanał\n        (?=($|"|<))', "$1"+"Mōj kanał");
  d = r(d, '(^|="|>)\nMenedżer filmów\n        (?=($|"|<))', "$1"+"Mynedżer wideo");
  d = r(d, '(^|="|>)\nUstawienia YouTube\n        (?=($|"|<))', "$1"+"Nasztalowania ôd YouTube");
  d = r(d, '(^|="|>)\nKonto Google\n    (?=($|"|<))', "$1"+"Kōnto Google");
  d = r(d, '(^|="|>)\nWyloguj się\n            (?=($|"|<))', "$1"+"Wyloguj sie");

// videos
  d = r(d, '(^|="|>)\n        Na żywo\n    (?=($|"|<))', "$1"+"Bezpostrzednio");
  d = r(d, '(^|="|>)\n        Edukacja\n    (?=($|"|<))', "$1"+"Edukacyjŏ");
  d = r(d, '(^|="|>)\n        Wiadomości\n    (?=($|"|<))', "$1"+"Nowiny");
  d = r(d, '(^|="|>)\n          Wszystkie kategorie\n        (?=($|"|<))', "$1"+"Wszyjske kategoryje");
  d = r(d, '(^|="|>)\n          Wybrane dla Ciebie\n        (?=($|"|<))', "$1"+"Ôbrane dlŏ ciebie");
  d = r(d, '(^|="|>)\n          Motoryzacja\n        (?=($|"|<))', "$1"+"Motoryzacyjŏ");
  d = r(d, '(^|="|>)\n          Śmieszne\n        (?=($|"|<))', "$1"+"Śmiyszne");
  d = r(d, '(^|="|>)\n          Rozrywka\n        (?=($|"|<))', "$1"+"Szpas");
  d = r(d, '(^|="|>)\n          Film i animacja\n        (?=($|"|<))', "$1"+"Film i animacyjŏ");
  d = r(d, '(^|="|>)\n          Gry\n        (?=($|"|<))', "$1"+"Szpile");
  d = r(d, '(^|="|>)\n          Poradniki i styl\n        (?=($|"|<))', "$1"+"Dorady i styl");
  d = r(d, '(^|="|>)\n          Społeczne i non-profit\n        (?=($|"|<))', "$1"+"Aktywizmus i niyzyskowne");
  d = r(d, '(^|="|>)\n          Zwierzęta\n        (?=($|"|<))', "$1"+"Zwiyrzynta");
  d = r(d, '(^|="|>)\n          Nauka i technika\n        (?=($|"|<))', "$1"+"Wiydza i technologijŏ");
  d = r(d, '(^|="|>)\n          Sport\n        (?=($|"|<))', "$1"+"Szport");
  d = r(d, '(^|="|>)\n          Podróże i wydarzenia\n        (?=($|"|<))', "$1"+"Rajzy i przitrefiynia");
  d = r(d, '(^|="|>)\nOdtwórz wszystkie\n  (?=($|"|<))', "$1"+"Grej wszyjske");
  d = r(d, '(^|="|>)Wybrane dla Ciebie \\»(?=($|"|<))', "$1"+"Ôbrane dlŏ ciebie »");
  d = r(d, '(^|="|>)Najpopularniejsze \\»(?=($|"|<))', "$1"+"Nŏjpopularniyjsze »");
  d = r(d, '(^|="|>)Motoryzacja \\»(?=($|"|<))', "$1"+"Motoryzacyjŏ »");
  d = r(d, '(^|="|>)Śmieszne \\»(?=($|"|<))', "$1"+"Śmiyszne »");
  d = r(d, '(^|="|>)Rozrywka \\»(?=($|"|<))', "$1"+"Szpas »");
  d = r(d, '(^|="|>)Film i animacja \\»(?=($|"|<))', "$1"+"Film i animacyjŏ »");
  d = r(d, '(^|="|>)Gry \\»(?=($|"|<))', "$1"+"Szpile »");
  d = r(d, '(^|="|>)Poradniki i styl \\»(?=($|"|<))', "$1"+"Dorady i styl »");
  d = r(d, '(^|="|>)Społeczne i non-profit \\»(?=($|"|<))', "$1"+"Aktywizmus i niyzyskowne »");
  d = r(d, '(^|="|>)Zwierzęta \\»(?=($|"|<))', "$1"+"Zwiyrzynta »");
  d = r(d, '(^|="|>)Nauka i technika \\»(?=($|"|<))', "$1"+"Wiydza i technologijŏ »");
  d = r(d, '(^|="|>)Sport \\»(?=($|"|<))', "$1"+"Szport »");
  d = r(d, '(^|="|>)Podróże i wydarzenia \\»(?=($|"|<))', "$1"+"Rajzy i przitrefiynia »");
  d = r(d, '(^|="|>)\n              Utworzona automatycznie przez YouTube\n            (?=($|"|<))', "$1"+"Złōnaczōne automatyczniy ôd YouTube");
  d = r(d, '(^|="|>)\n              autor\\: (.+)\n            (?=($|"|<))', "$1"+"autōr: "+"$2");
  d = r(d, '(^|="|>)\n(.+) wyświetleń(?=($|"|<))', "$1"+"Grane "+"$2"+" razy");
  d = r(d, '(^|="|>)\n(.+) wyświetlenia(?=($|"|<))', "$1"+"Grane "+"$2"+" razy");
  d = r(d, '(^|="|>)\nMój kanał\n            (?=($|"|<))', "$1"+"Mōj kanał");
  d = r(d, '(^|="|>)\nMenedżer filmów\n            (?=($|"|<))', "$1"+"Mynedżer wideo");
  d = r(d, '(^|="|>)Subskrypcje(?=($|"|<))', "$1"+"Abōniyrowane");
  d = r(d, '(^|="|>)Skrzynka odbiorcza(?=($|"|<))', "$1"+"Ôdybrane");
  d = r(d, '(^|="|>)\nUstawienia\n            (?=($|"|<))', "$1"+"Nasztalowania");
  d = r(d, '(^|="|>)\nPrzełącz konto\n              (?=($|"|<))', "$1"+"Inksze kōnto");
  d = r(d, '(^|="|>)\nWyloguj się(?=($|"|<))', "$1"+"Wyloguj sie");

// watch
  d = r(d, '(^|="|>)Subskrybuj(?=($|"|<))', "$1"+"Abōniyruj");
  d = r(d, '(^|="|>)Subskrybujesz(?=($|"|<))', "$1"+"Abōniyrujesz");
  d = r(d, '(^|="|>)Anuluj subskrypcję(?=($|"|<))', "$1"+"Niy abōniyruj");
  d = r(d, '(^|="|>)\n(.+) filmów (?=($|"|<))', "$1"+"$2"+" wideo");
  d = r(d, '(^|="|>)Trwa wczytywanie\\.\\.\\.(?=($|"|<))', "$1"+"Ladujã...");
  d = r(d, '(^|="|>)autor\\: (?=($|"|<))', "$1"+"autōr: ");
  d = r(d, '\"Podoba mi się\"', "\"Mōm rŏd/rada\"");
  d = r(d, '\"Nie podoba mi się\"', "\"Niy mōm rŏd/rada\"");
  d = r(d, '(^|="|>)Dodaj do(?=($|"|<))', "$1"+"Dodej do");
  d = r(d, '\"Dodaj do ulubionych lub playlisty\"', "\"Dodej do wertownych abo playlisty\"");
  d = r(d, '(^|="|>)Udostępnij (?=($|"|<))', "$1"+"Rekōmanduj ");
  d = r(d, '\"Udostępnij film lub umieść go na stronie\"', "\"Rekōmanduj wideo kamratōm abo pokŏż je na strōnie\"");
  d = r(d, '\"Zgłoś naruszenie zasad\"', "\"Dej znać ô złōmaniu warōnkōw\"");
  d = r(d, '\"Pokaż statystyki filmu\"', "\"Pokŏż statystyki ôd tego filmu\"");
  d = r(d, '(^|="|>)\n        \nPrzesłane przez     (?=($|"|<))', "$1"+"Przisłane ôd ");
  d = r(d, '(^|="|>)\n        \nOpublikowane w dniu (?=($|"|<))', "$1"+"Ôpublikowane ");
  d = r(d, '(^|="|>) przez użytkownika     (?=($|"|<))', "$1"+" ôd ");
  d = r(d, '(^|="|>)\n    Sklep wykonawcy\n  (?=($|"|<))', "$1"+"Sklep ôd artysty");
  d = r(d, '(^|="|>)Pokaż więcej (?=($|"|<))', "$1"+"Pokŏż wiyncyj");
  d = r(d, '(^|="|>)Pokaż mniej (?=($|"|<))', "$1"+"Pokŏż mynij");
  d = r(d, '(^|="|>)\nKategoria:\n    (?=($|"|<))', "$1"+"Kategoryjŏ: ");
  d = r(d, '(^|="|>)Licencja\\:(?=($|"|<))', "$1"+"Licyncyjŏ:");
  d = r(d, '(^|="|>)\nStandardowa licencja YouTube\n  (?=($|"|<))', "$1"+"Ańfachowŏ licyncyjŏ ôd YouTube");
  d = r(d, '(^|="|>) głosów na tak\\, (?=($|"|<))', "$1"+" ludziōm sie to podobŏ, ");
  d = r(d, '(^|="|>) głosów na nie\n  (?=($|"|<))', "$1"+" sie niy podobŏ, ");
  d = r(d, '(^|="|>) głosy na tak\\, (?=($|"|<))', "$1"+" ludziōm sie to podobŏ, ");
  d = r(d, '(^|="|>) głosy na nie\n  (?=($|"|<))', "$1"+" sie niy podobŏ, ");
  d = r(d, '(^|="|>)Odpowiedzi wideo(?=($|"|<))', "$1"+"Wideoôdpedzi");
  d = r(d, '(^|="|>)\nzobacz wszystko\n      (?=($|"|<))', "$1"+"pokŏż wszyjsko");
  d = r(d, '(^|="|>)\nWszystkie komentarze\n          (?=($|"|<))', "$1"+"Wszyjske kōmyntŏrze ");
  d = r(d, '(^|="|>)\nzobacz wszystkie\n          (?=($|"|<))', "$1"+"pokŏż wszyjske");
  d = r(d, '(^|="|>)Odpowiedz na ten film\\.\\.\\.(?=($|"|<))', "$1"+"Napisz cosik ô tym wideo...");
  d = r(d, '(^|="|>)\nPozostało znaków\\: (?=($|"|<))', "$1"+"Ôstało znakōw: ");
  d = r(d, '(^|="|>)\nMożesz ponownie opublikować za (?=($|"|<))', "$1"+"Możesz jeszcze rŏz napisać za ");
  d = r(d, '(^|="|>)Utwórz odpowiedź wideo(?=($|"|<))', "$1"+"Złōnacz wideoôdpedź");
  d = r(d, '(^|="|>)\&nbsp\;lub\&nbsp\;(?=($|"|<))', "$1"+" abo ");
  d = r(d, '(^|="|>)Opublikuj (?=($|"|<))', "$1"+"Ôpublikuj");
  d = r(d, '(^|="|>)Pokaż nowe komentarze\\: (.+)\\.(?=($|"|<))', "$1"+"Pokŏz nowe kōmytŏrze: "+"$2"+".");
  d = r(d, '(^|="|>)Aktualizuj automatycznie(?=($|"|<))', "$1"+"Automatyczniy ôdnowiej");
  d = r(d, '(^|="|>)Odpowiedz (?=($|"|<))', "$1"+"Ôdpedź");
  d = r(d, '(^|="|>)Udostępnij(?=($|"|<))', "$1"+"Rekōmanduj");
  d = r(d, '(^|="|>)Zgłoś jako spam(?=($|"|<))', "$1"+"Dej znać, że to spam");
  d = r(d, '(^|="|>)Zablokuj użytkownika(?=($|"|<))', "$1"+"Zablokuj używŏcza");
  d = r(d, '(^|="|>)Odblokuj użytkownika(?=($|"|<))', "$1"+"Ôdblokuj używŏcza");
  d = r(d, '(^|="|>)Usuń(?=($|"|<))', "$1"+"Wyciep");
  d = r(d, '(^|="|>)Komentarz oznaczony jako spam(?=($|"|<))', "$1"+"Kōmyntŏrz bōł ôznŏczōny jako spam.");
  d = r(d, '(^|="|>)pokaż(?=($|"|<))', "$1"+"pokŏż");
  d = r(d, '(^|="|>)ukryj(?=($|"|<))', "$1"+"skryj");
  d = r(d, '(^|="|>)Nie spam (?=($|"|<))', "$1"+"To niyma spam");
  d = r(d, '(^|="|>)Komentarz został usunięty(?=($|"|<))', "$1"+"Kōmyntŏrz bōł wyciepniynty");
  d = r(d, '(^|="|>)\nAutor zablokowany\n          (?=($|"|<))', "$1"+"Autōr zablokowany");
  d = r(d, '(^|="|>)\\« Poprzednia(?=($|"|<))', "$1"+"« Przōdzij");
  d = r(d, '(^|="|>)Następna \\»(?=($|"|<))', "$1"+"Dalij »");
  d = r(d, '(^|="|>)\n            (1?[2-4]) sek\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" sekōndy do zadku");
  d = r(d, '(^|="|>)\n            (1?[5-9]) sek\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)\n            ([0-9,]+) sek\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)\n            (1?[2-4]) sek\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" sekōndy do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) sek\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) sek\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) min\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" minuty do zadku");
  d = r(d, '(^|="|>)\n            (1?[5-9]) min\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)\n            ([0-9,]+) min\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)\n            (1?[2-4]) min\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" minuty do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) min\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) min\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            1 godzinę temu\n          (?=($|"|<))', "$1"+" "+"1 godzinã do zadku");
  d = r(d, '(^|="|>)\n            (1?[2-4]) godz\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" godziny do zadku");
  d = r(d, '(^|="|>)\n            (1?[5-9]) godz\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)\n            ([0-9,]+) godz\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)\n            1 godzinę temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 godzinã do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) godz\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" godzina do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) godz\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) godz\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            1 dzień temu\n          (?=($|"|<))', "$1"+" "+"1 dziyń do zadku");
  d = r(d, '(^|="|>)\n            ([0-9,]+) dni temu\n          (?=($|"|<))', "$1"+" "+"$2"+" dni do zadku");
  d = r(d, '(^|="|>)\n            1 dzień temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 dziyń do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) dni temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" dni do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            1 tydzień temu\n          (?=($|"|<))', "$1"+" "+"1 tydziyń do zadku");
  d = r(d, '(^|="|>)\n            (1?[2-4]) tygodnie temu\n          (?=($|"|<))', "$1"+" "+"$2"+" tydnie do zadku");
  d = r(d, '(^|="|>)\n            1 tydzień temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 tydziyń do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) tygodnie temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" tydnie do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            1 miesiąc temu\n          (?=($|"|<))', "$1"+" "+"1 miesiōnc do zadku");
  d = r(d, '(^|="|>)\n            (1?[2-4]) mies\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" miesiōnce do zadku");
  d = r(d, '(^|="|>)\n            (1?[5-9]) mies\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)\n            ([0-9,]+) mies\\. temu\n          (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)\n            1 miesiąc temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 miesiōnc do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) mies\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" miesiōnce do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) mies\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) mies\\. temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            1 rok temu\n          (?=($|"|<))', "$1"+" "+"1 rok do zadku");
  d = r(d, '(^|="|>)\n            (1?[2-4]) lata temu\n          (?=($|"|<))', "$1"+" "+"$2"+" lata do zadku");
  d = r(d, '(^|="|>)\n            (1?[5-9]) lata temu\n          (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");
  d = r(d, '(^|="|>)\n            ([0-9,]+) lata temu\n          (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");
  d = r(d, '(^|="|>)\n            1 rok temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"1 rok do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[2-4]) lata temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" lata do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            (1?[5-9]) lata temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku, playlista: ");
  d = r(d, '(^|="|>)\n            ([0-9,]+) lata temu\nplaylista\\: (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku, playlista: ");
  d = r(d, '\"Poprzedni film\"', "\"Przudzij\"");
  d = r(d, '\"Następny film\"', "\"Dalij\"");
  d = r(d, '\"Włącz autoodtwarzanie\"', "\"Autograniy\"");
  d = r(d, '\"Włącz odtwarzanie losowe\"', "\"Miyszej\"");
  d = r(d, '\"Więcej informacji na temat tej playlisty\"', "\"Dalsze informacyje ô tyj playliście\"");
  d = r(d, '(^|="|>)\nEdytuj lub usuń tę playlistę\n      (?=($|"|<))', "$1"+"Edytuj abo wyciep tã playlistã");
  d = r(d, '(^|="|>)\nWięcej informacji na temat tej playlisty\n      (?=($|"|<))', "$1"+"Dalsze informacyje ô tyj playliście");
  d = r(d, '(^|="|>)\nWczytaj inną playlistę\n      (?=($|"|<))', "$1"+"Zaladuj inkszõ playlistã");

// all_comments
  d = r(d, '(^|="|>)Dodano\\:(?=($|"|<))', "$1"+"Dodane:");
  d = r(d, '(^|="|>)Od\\:(?=($|"|<))', "$1"+"Ôd:");
  d = r(d, '(^|="|>)Wyświetlenia\\:(?=($|"|<))', "$1"+"Grane:");
  d = r(d, '(^|="|>)Sortuj według godziny(?=($|"|<))', "$1"+"Wedle czasu");
  d = r(d, '(^|="|>)Sortuj według wątku \\(wersja beta\\)(?=($|"|<))', "$1"+"Wedle tymatōw (wersyjŏ beta)");

// channels
  d = r(d, '(^|="|>)Strona główna (?=($|"|<))', "$1"+"Przodniŏ strōna");
  d = r(d, '(^|="|>)Dodaj kanały\n(?=($|"|<))', "$1"+"Dodej kanały");
  d = r(d, '(^|="|>)\nNie subskrybujesz żadnych kanałów(?=($|"|<))', "$1"+"Niy abōniyrujesz zŏdnych kanałōw");
  d = r(d, '(^|="|>)\nSubskrybujesz (.+) kanałów(?=($|"|<))', "$1"+"Abōniyrujesz "+"$2"+" kanałōw");
  d = r(d, '(^|="|>)\nWprowadzenie\\?\n      (?=($|"|<))', "$1"+"Zaczynōmy?");
  d = r(d, '(^|="|>)Przeglądaj kategorie(.+) i znajduj ciekawe kanały.(?=($|"|<))', "$1"+"Podszukowuj kategoryje"+"$2"+" i znŏjduj gyszpant kanały.");
  d = r(d, '(^|="|>)Zasubskrybuj kanały(.+) i dodaj je do strony głównej\\.(?=($|"|<))', "$1"+"Abōniyruj kanały"+"$2"+" i dodej je do przodnij strōny.");
  d = r(d, '(^|="|>)(.+)Wyświetl stronę główną(.+)\\, aby zobaczyć aktywność związaną z Twoimi subskrypcjami\\.(?=($|"|<))', "$1"+"Na swojij "+"$2"+"przodnij strōnie"+"$3"+" ôbezdrzisz nowości na abōniyrowanych kanałach.");
  d = r(d, '(^|="|>)Wybrane dla Ciebie\n(?=($|"|<))', "$1"+"Może ci sie spodobać");
  d = r(d, '(^|="|>)Najpopularniejsze blogi\n(?=($|"|<))', "$1"+"Nŏjpopularniyjsze blogi");
  d = r(d, '(^|="|>)Komedie\n(?=($|"|<))', "$1"+"Komedyje");
  d = r(d, '(^|="|>)Film i rozrywka\n(?=($|"|<))', "$1"+"Filmy i szpas");
  d = r(d, '(^|="|>)Gry\n(?=($|"|<))', "$1"+"Szpile");
  d = r(d, '(^|="|>)Motoryzacja\n(?=($|"|<))', "$1"+"Motoryzacyjŏ");
  d = r(d, '(^|="|>)Gwiazdy i plotki\n(?=($|"|<))', "$1"+"Gwiŏzdy i klachy");
  d = r(d, '(^|="|>)Sport\n(?=($|"|<))', "$1"+"Szport");
  d = r(d, '(^|="|>)Zrób to sam\n(?=($|"|<))', "$1"+"Zrōb to sōm");
  d = r(d, '(^|="|>)Technologie\n(?=($|"|<))', "$1"+"Technologije");
  d = r(d, '(^|="|>)Śmieszne z internetu\n(?=($|"|<))', "$1"+"Śmiyszne z internetu");
  d = r(d, '(^|="|>)Nauka i edukacja\n(?=($|"|<))', "$1"+"Wiydza i edukacyjŏ");

// playlist
  d = r(d, '(^|="|>)Edytuj playlistę(?=($|"|<))', "$1"+"Edytuj playlistã");
  d = r(d, '(^|="|>)\nczas trwania\n        (?=($|"|<))', "$1"+"dugość");
  d = r(d, '\"Udostępnij playlistę lub umieść ją na stronie\\.\"', "\"Rekōmanduj tã playlistã abo skŏż ja na strōnã\"");
  d = r(d, '(^|="|>)(.+) – informacje(?=($|"|<))', "$1"+"$2"+" – informacyje");
  d = r(d, '(^|="|>)\n              \n(.+) playlist\n          (?=($|"|<))', "$1"+"$2"+" playlistōw");
  d = r(d, '(^|="|>)\nWyświetl wszystkie filmy\n          (?=($|"|<))', "$1"+"Pokŏż wszyjske wideo");
  d = r(d, '(^|="|>)\n            \n(.+) wyświetleń\n          (?=($|"|<))', "$1"+"Wideo grane "+"$2"+" razy");
  d = r(d, '(^|="|>)\n            \n(.+) wyświetlenia\n          (?=($|"|<))', "$1"+"Wideo grane "+"$2"+" razy");
  d = r(d, '(^|="|>)\nLiczba widzów\\: (.+)\n        (?=($|"|<))', "$1"+"Abōnynty: "+"$2");
  d = r(d, '(^|="|>)Polecane playlisty(?=($|"|<))', "$1"+"Rekōmandowane playlisty");

// results
  d = r(d, '(^|="|>)Filtr (?=($|"|<))', "$1"+"Filter ");
  d = r(d, '(^|="|>)\nLiczba wyników \\(około\\)\\: (?=($|"|<))', "$1"+"Wielość znŏleziōnych (wele): ");
  d = r(d, '(^|="|>)Tłumacz(?=($|"|<))', "$1"+"Tuplikuj");
  d = r(d, '(^|="|>)NOWOŚĆ(?=($|"|<))', "$1"+"NOWE");
  d = r(d, '(^|="|>)Liczba widzów\\: (.+)(?=($|"|<))', "$1"+"$2"+" abōnyntōw");
  d = r(d, '(^|="|>)playlist(?=($|"|<))', "$1"+"playlista");

// user
  d = r(d, '(^|="|>)Ustawienia kanału(?=($|"|<))', "$1"+"Nasztalowania ôd kanału");
  d = r(d, '(^|="|>)Menedżer filmów(?=($|"|<))', "$1"+"Mynedżer wideo");
  d = r(d, '(^|="|>)widzowie(?=($|"|<))', "$1"+"abōnyntōw");
  d = r(d, '(^|="|>)wyświetlenia filmów(?=($|"|<))', "$1"+"razy grane filmy");
  d = r(d, '\"Szukaj w kanale\"', "\"Szukej w kanale\"");
  d = r(d, '(^|="|>)\n      Polecane\n\n    (?=($|"|<))', "$1"+"Rekōmandowane");
  d = r(d, '(^|="|>)\n      Filmy\n\n    (?=($|"|<))', "$1"+"Wideo");
  d = r(d, '(^|="|>)\nKomentarze\n          (?=($|"|<))', "$1"+"Kōmyntŏrze");
  d = r(d, '\"Utwórz nowy post\"', "\"Złōnacz nowy post\"");
  d = r(d, '(^|="|>)\n subskrybuje\\:\n\n\n\n              (?=($|"|<))', "$1"+" abōniyruje: ");
  d = r(d, '(^|="|>)\nURL filmu lub playlisty\n  (?=($|"|<))', "$1"+"URL ôd widea abo ôd playlisty");
  d = r(d, '(^|="|>)\nNajnowsze filmy\n    (?=($|"|<))', "$1"+"Nŏjnowsze widea");
  d = r(d, '(^|="|>)\nNajnowsze playlisty\n    (?=($|"|<))', "$1"+"Nŏjnowsze playlisty");
  d = r(d, '\"Dodaj link do polecanego filmu lub playlisty \\(opcjonalnie\\)\"', "\"Link do widea abo playlisty (mogesz ôstawić puste)\"");
  d = r(d, '(^|="|>)\n    --- Wybierz film ---\n  (?=($|"|<))', "$1"+"--- Ôbiyr wideo ---");
  d = r(d, '(^|="|>)\n    --- Wybierz playlistę ---\n  (?=($|"|<))', "$1"+"--- Ôbiyr playlistã ---");
  d = r(d, '(^|="|>)\n(.+) – informacje\n        (?=($|"|<))', "$1"+"$2"+" – informacyje");
  d = r(d, '(^|="|>)  więcej (?=($|"|<))', "$1"+"wiyncyj ");
  d = r(d, '(^|="|>)  mniej (?=($|"|<))', "$1"+"mynij ");
  d = r(d, '(^|="|>)\nautor\\: (?=($|"|<))', "$1"+"autōr: ");
  d = r(d, '(^|="|>)Wyślij wiadomość(?=($|"|<))', "$1"+"Wyślij wiadōmość");
  d = r(d, '(^|="|>)Ostatnia aktywność(?=($|"|<))', "$1"+"Ôstatniŏ aktywność");
  d = r(d, '(^|="|>)Dołączył\\(a\\)(?=($|"|<))', "$1"+"Datōm rejestracyje");
  d = r(d, '(^|="|>)Kraj(?=($|"|<))', "$1"+"Krej");
  d = r(d, '(^|="|>)Inne kanały(?=($|"|<))', "$1"+"Inksze kanały");
  d = r(d, '(^|="|>)Lokalizacja(?=($|"|<))', "$1"+"Lokalizacyjŏ");
  d = r(d, '\"URL kanału\"', "\"URL ôd kanału\"");
  d = r(d, '(^|="|>)\nUżywaj tego modułu do polecania innych kanałów\\, które chcesz pokazać\\.\n        (?=($|"|<))', "$1"+"Używej tego modułu do rekōmandowaniŏ inkszych kanałōw, kere chcesz pokŏzać.");
  d = r(d, '(^|="|>)\nUwaga\\: ten moduł jest opcjonalny i nie będzie widoczny dla odbiorców\\, dopóki nie dodasz do niego kanałów\\.\n        (?=($|"|<))', "$1"+"Pozōr: tyn moduł niy bydzie widzialny dlŏ inkszych, podwiela niy dodŏsz do niygo kanałōw.");
  d = r(d, '(^|="|>)Polecane kanały(?=($|"|<))', "$1"+"Rekōmandowane kanały");
  d = r(d, '(^|="|>)\n\nUkryj\n      (?=($|"|<))', "$1"+"Skryj");
  d = r(d, '(^|="|>)Anuluj (?=($|"|<))', "$1"+"Ôdciep");
  d = r(d, '(^|="|>)Zastosuj (?=($|"|<))', "$1"+"Spamiyntej");
  d = r(d, '(^|="|>) ?([0-9,]+) sty ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".01."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) lut ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".02."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) mar ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".03."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) kwi ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".04."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) maj ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".05."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) cze ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".06."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) lip ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".07."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) sie ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".08."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) wrz ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".09."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) paź ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".10."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) lis ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".11."+"$3");
  d = r(d, '(^|="|>) ?([0-9,]+) gru ([0-9,]+)(?=($|"|<))', "$1"+"$2"+".12."+"$3");
  d = r(d, '(^|="|>)\nPolecane oferty sklepu\n        (?=($|"|<))', "$1"+"Rekōmandowane oferty we sklepie");
  d = r(d, '(^|="|>)\nwyświetl wszystko\n          (?=($|"|<))', "$1"+"pokŏż wszyjsko ");
  d = r(d, '(^|="|>)\n    \n([0-9,]+) filmów\n  (?=($|"|<))', "$1"+"$2"+" wideo");
  d = r(d, '(^|="|>)Odtwórz wszystkie(?=($|"|<))', "$1"+"Grej wszyjske");
  d = r(d, '(^|="|>)\nautor\\: (.+)\n    (?=($|"|<))', "$1"+"autōr: "+"$2");
  d = r(d, '(^|="|>)\nwyświetl wszystko\n    (?=($|"|<))', "$1"+"pokŏż wszyjsko ");
  d = r(d, '(^|="|>)\nwidzowie\n  (?=($|"|<))', "$1"+" abōnyntōw");
  d = r(d, '(^|="|>)\n    \nWczytaj jeszcze 10 filmów\n  (?=($|"|<))', "$1"+"Pokŏż 10 wideo wiyncyj");
  d = r(d, '(^|="|>)Zgłoś (?=($|"|<))', "$1"+"Dej znać ");
  d = r(d, '(^|="|>)Zgłoś obraz tła(?=($|"|<))', "$1"+"Dej znać ô zadnim ôbrŏzku");
  d = r(d, '(^|="|>)Zgłoś miniaturę profilu(?=($|"|<))', "$1"+"Dej znać ô profilowym ôbrŏzku");
  d = r(d, '(^|="|>)Zgłoś użytkownika(?=($|"|<))', "$1"+"Dej znać ô używŏczu");
  d = r(d, '(^|="|>)autor\\: (.+)(?=($|"|<))', "$1"+"autōr: "+"$2");
  d = r(d, '(^|="|>)\nwyświetleń\n              (?=($|"|<))', "$1"+" razy grane");
  d = r(d, '(^|="|>)\nLiczba wyświetleń\\: ([0-9,]+)\n      (?=($|"|<))', "$1"+"$2"+" razy grane");
  d = r(d, '(^|="|>)\nOBEJRZANY\n        (?=($|"|<))', "$1"+"ÔBEZDRZANE");
  d = r(d, '(^|="|>)(1?[2-4]) sek\\. temu(?=($|"|<))', "$1"+" "+"$2"+" sekōndy do zadku");
  d = r(d, '(^|="|>)(1?[5-9]) sek\\. temu(?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)([0-9,]+) sek\\. temu(?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)(1?[2-4]) min\\. temu(?=($|"|<))', "$1"+" "+"$2"+" minuty do zadku");
  d = r(d, '(^|="|>)(1?[5-9]) min\\. temu(?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)([0-9,]+) min\\. temu(?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)1 godzinę temu(?=($|"|<))', "$1"+" "+"1 godzinã do zadku");
  d = r(d, '(^|="|>)(1?[2-4]) godz\\. temu(?=($|"|<))', "$1"+" "+"$2"+" godziny do zadku");
  d = r(d, '(^|="|>)(1?[5-9]) godz\\. temu(?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)([0-9,]+) godz\\. temu(?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)1 dzień temu(?=($|"|<))', "$1"+" "+"1 dziyń do zadku");
  d = r(d, '(^|="|>)([0-9,]+) dni temu(?=($|"|<))', "$1"+" "+"$2"+" dni do zadku");
  d = r(d, '(^|="|>)1 tydzień temu(?=($|"|<))', "$1"+" "+"1 tydziyń do zadku");
  d = r(d, '(^|="|>)(1?[2-4]) tygodnie temu(?=($|"|<))', "$1"+" "+"$2"+" tydnie do zadku");
  d = r(d, '(^|="|>)1 miesiąc temu(?=($|"|<))', "$1"+" "+"1 miesiōnc do zadku");
  d = r(d, '(^|="|>)(1?[2-4]) mies\\. temu(?=($|"|<))', "$1"+" "+"$2"+" miesiōnce do zadku");
  d = r(d, '(^|="|>)(1?[5-9]) mies\\. temu(?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)([0-9,]+) mies\\. temu(?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)1 rok temu(?=($|"|<))', "$1"+" "+"1 rok do zadku");
  d = r(d, '(^|="|>)(1?[2-4]) lata temu(?=($|"|<))', "$1"+" "+"$2"+" lata do zadku");
  d = r(d, '(^|="|>)(1?[5-9]) lata temu(?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");
  d = r(d, '(^|="|>)([0-9,]+) lata temu(?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");
  d = r(d, '(^|="|>)Wczytaj więcej (?=($|"|<))', "$1"+"Zaladuj wiyncyj");
  d = r(d, '(^|="|>)\n      Przesłane filmy\n    (?=($|"|<))', "$1"+"Przisłane wideo ");
  d = r(d, '(^|="|>)\n      listy odtwarzania\n    (?=($|"|<))', "$1"+"Playlisty");
  d = r(d, '(^|="|>)Od najnowszego (?=($|"|<))', "$1"+"Ôd nŏjnowszygo");
  d = r(d, '(^|="|>)Od najnowszego(?=($|"|<))', "$1"+"Ôd nŏjnowszygo");
  d = r(d, '(^|="|>)Od najstarszego (?=($|"|<))', "$1"+"Ôd nŏjstarszygo");
  d = r(d, '(^|="|>)Od najstarszego(?=($|"|<))', "$1"+"Ôd nŏjstarszygo");
  d = r(d, '(^|="|>)Najpopularniejsze (?=($|"|<))', "$1"+"Nŏjpopularniyjsze");
  d = r(d, '(^|="|>)Najpopularniejsze(?=($|"|<))', "$1"+"Nŏjpopularniyjsze");
  d = r(d, '(^|="|>)\n        \n([0-9,]+) wyświetleń\n      (?=($|"|<))', "$1"+"Grane "+"$2"+" razy");
  d = r(d, '(^|="|>)\n        \n([0-9,]+) wyświetlenia\n      (?=($|"|<))', "$1"+"Grane "+"$2"+" razy");
  d = r(d, '(^|="|>)\n        (1?[2-4]) sek\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" sekōndy do zadku");
  d = r(d, '(^|="|>)\n        (1?[5-9]) sek\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)\n        ([0-9,]+) sek\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)\n        (1?[2-4]) min\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" minuty do zadku");
  d = r(d, '(^|="|>)\n        (1?[5-9]) min\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)\n        ([0-9,]+) min\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)\n        1 godzinę temu\n      (?=($|"|<))', "$1"+" "+"1 godzinã do zadku");
  d = r(d, '(^|="|>)\n        (1?[2-4]) godz\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" godziny do zadku");
  d = r(d, '(^|="|>)\n        (1?[5-9]) godz\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)\n        ([0-9,]+) godz\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)\n        1 dzień temu\n      (?=($|"|<))', "$1"+" "+"1 dziyń do zadku");
  d = r(d, '(^|="|>)\n        ([0-9,]+) dni temu\n      (?=($|"|<))', "$1"+" "+"$2"+" dni do zadku");
  d = r(d, '(^|="|>)\n        1 tydzień temu\n      (?=($|"|<))', "$1"+" "+"1 tydziyń do zadku");
  d = r(d, '(^|="|>)\n        (1?[2-4]) tygodnie temu\n      (?=($|"|<))', "$1"+" "+"$2"+" tydnie do zadku");
  d = r(d, '(^|="|>)\n        1 miesiąc temu\n      (?=($|"|<))', "$1"+" "+"1 miesiōnc do zadku");
  d = r(d, '(^|="|>)\n        (1?[2-4]) mies\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" miesiōnce do zadku");
  d = r(d, '(^|="|>)\n        (1?[5-9]) mies\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)\n        ([0-9,]+) mies\\. temu\n      (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)\n        1 rok temu\n      (?=($|"|<))', "$1"+" "+"1 rok do zadku");
  d = r(d, '(^|="|>)\n        (1?[2-4]) lata temu\n      (?=($|"|<))', "$1"+" "+"$2"+" lata do zadku");
  d = r(d, '(^|="|>)\n        (1?[5-9]) lata temu\n      (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");
  d = r(d, '(^|="|>)\n        ([0-9,]+) lata temu\n      (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");

// my_channel_editor
  d = r(d, '(^|="|>)\nUstawienia kanału\n    (?=($|"|<))', "$1"+"Nasztalowania ôd kanału");
  d = r(d, '(^|="|>)Anuluj(?=($|"|<))', "$1"+"Ôdciep");
  d = r(d, '(^|="|>)Zmiany gotowe (?=($|"|<))', "$1"+"Fertich");
  d = r(d, '(^|="|>)\n      Wygląd\n    (?=($|"|<))', "$1"+"Wyglōnd");
  d = r(d, '(^|="|>)\n      Informacje i ustawienia\n    (?=($|"|<))', "$1"+"Informacyje i nasztalowania");
  d = r(d, '(^|="|>)\nWybierz obraz\\. Obrazy o kształcie innym niż kwadratowy zostaną przycięte\\. Sugerowane wymiary\\: 800 x 800 pikseli\\. Maks\\. rozmiar\\: 1 MB\\.\n        (?=($|"|<))', "$1"+"Wkludź ôbrŏzek. Ôbrŏzki inksze aniżeli kwadratowe bydōm przitniynte. Nŏjlepszŏ srogość: 800 x 800 pikselōw i maks. 1 MB.");
  d = r(d, '(^|="|>)\nPrzesyłanie\n  (?=($|"|<))', "$1"+"Przisyłaniy");
  d = r(d, '(^|="|>)Wybierz plik (?=($|"|<))', "$1"+"Ôbiyr zbiōr");
  d = r(d, '(^|="|>)Usuń (?=($|"|<))', "$1"+"Wyciep");
  d = r(d, '(^|="|>)\nTło\n      (?=($|"|<))', "$1"+"Zadek");
  d = r(d, '(^|="|>)\nWybierz obraz \\(maks\\. 1 MB\\)\n      (?=($|"|<))', "$1"+"Ôbiyr ôbrŏzek (maks. 1 MB)");
  d = r(d, '(^|="|>)\n\nPrzewijane\n          (?=($|"|<))', "$1"+"Niyprzikuplowany");
  d = r(d, '(^|="|>)\n\nNieruchome\n          (?=($|"|<))', "$1"+"Przikuplowany");
  d = r(d, '(^|="|>)\nBez powtarzania\n  (?=($|"|<))', "$1"+"Pokŏż ino rŏz");
  d = r(d, '(^|="|>)\nPowtarzaj w poziomie\n  (?=($|"|<))', "$1"+"Jedyn nad drugim");
  d = r(d, '(^|="|>)\nPowtarzaj w pionie\n  (?=($|"|<))', "$1"+"Jedyn kole drugigo");
  d = r(d, '(^|="|>)\nPowtórz w poziomie i w pionie\n  (?=($|"|<))', "$1"+"Kachle");
  d = r(d, '\"Podczas przewijania zawartości kanału obraz tła też jest przewijany\\.\"', "\"Przi przwijaniu zadni ôbrŏzek tyż bydzie przewijany\"");
  d = r(d, '\"Podczas przewijania zawartości kanału tło nie jest przewijane – pozostaje nieruchome.\\.\"', "\"Przi przwijaniu zadni ôbrŏzek niy bydzie przewijany\"");
  d = r(d, '(^|="|>)\n    Wybierz kolor\n  (?=($|"|<))', "$1"+"Ôbiyr farbã");
  d = r(d, '(^|="|>)Wyczyść wybrany kolor (?=($|"|<))', "$1"+"Resetuj farbã");
  d = r(d, '(^|="|>)Ustaw (?=($|"|<))', "$1"+"Spamiyntej");
  d = r(d, '(^|="|>)\nInformacje o kanale i ustawienia\n    (?=($|"|<))', "$1"+"Informacyje ô kanale i nasztalowania");
  d = r(d, '(^|="|>)Opis(?=($|"|<))', "$1"+"Ôpis");
  d = r(d, '(^|="|>)\nURL kanału\n      (?=($|"|<))', "$1"+"URL ôd kanału");
  d = r(d, '(^|="|>)\nKarta domyślna\n    (?=($|"|<))', "$1"+"Przŏdniŏ karta");
  d = r(d, '(^|="|>)\nKarta Polecane\n  (?=($|"|<))', "$1"+"Rekōmandowane");
  d = r(d, '(^|="|>)\nKarta Filmy\n  (?=($|"|<))', "$1"+"Wideo");
  d = r(d, '(^|="|>)\nKarta Kanał\n  (?=($|"|<))', "$1"+"Kanał");
  d = r(d, '(^|="|>)\n\nZawsze kieruj użytkowników subskrybujących na kartę kanału\n    (?=($|"|<))', "$1"+"Dycki kludź abōnyntōw na kartã ôd kanału");
  d = r(d, '(^|="|>)\nUdostępnij moją aktywność\\, gdy\\:\n    (?=($|"|<))', "$1"+"Pokŏż mojõ aktywność, kej:");
  d = r(d, '(^|="|>)\nMożesz automatycznie udostępniać informacje o swojej aktywności na kanale w YouTube\\. Bez obaw – nigdy nie udostępnimy informacji o aktywności dotyczącej prywatnych filmów\\. Wprowadzone tutaj zmiany zostaną zastosowane również względem przeszłej aktywności\\.\n    (?=($|"|<))', "$1"+"Możesz automatyczniy pokŏzywać aktywność ôd ciebie na kanale w YouTube. Niy trŏp sie – nigdy niy bydzie widać aktywności przi prywatnych wideach.");
  d = r(d, '(^|="|>)\n\n    Spodoba mi się film\n  (?=($|"|<))', "$1"+"  Mōm rŏd abo rada jakeś wideo");
  d = r(d, '(^|="|>)\n\n    Skomentuję film\n  (?=($|"|<))', "$1"+"  Skōmyntujã wideo");
  d = r(d, '(^|="|>)\n\n    Dodam film do ulubionych\n  (?=($|"|<))', "$1"+"  Dodōm wideo do wertownych");
  d = r(d, '(^|="|>)\n\n    Zasubskrybuję kanał\n  (?=($|"|<))', "$1"+"  Zaaboniyrujã kanał");
  d = r(d, '(^|="|>)\n\nZezwalaj na komentarze na kanale\n    (?=($|"|<))', "$1"+"Zwōl kōmyntować kanał");
  d = r(d, '(^|="|>)\n\nWyświetlaj automatycznie\n        (?=($|"|<))', "$1"+"  Przijmuj wszyjske kōmyntŏrze");
  d = r(d, '(^|="|>)\n\nWyświetlaj po zatwierdzeniu\n        (?=($|"|<))', "$1"+"  Nŏjprzōd weryfikuj");
  d = r(d, '(^|="|>)\n\n    Polecane\n  (?=($|"|<))', "$1"+"Rekōmandowane");
  d = r(d, '(^|="|>)Twórca(?=($|"|<))', "$1"+"Autōr");
  d = r(d, '(^|="|>)Polecany film z wybranej playlisty wraz z grupą innych polecanych playlist(?=($|"|<))', "$1"+"Rekōmandowane wideo z ôbranyj playlisty spōlniy ze skupinōm inkszych rekōmandowanych playlist");
  d = r(d, '(^|="|>)Blogger(?=($|"|<))', "$1"+"Bloger");
  d = r(d, '(^|="|>)Twoje ostatnio przesłane filmy \\(od najnowszego\\) lub polecana playlista(?=($|"|<))', "$1"+"Przisłane widea ôd ciebie ôd nŏjnowszego abo rekōmandowanŏ playlista");
  d = r(d, '(^|="|>)Sieć(?=($|"|<))', "$1"+"Nec");
  d = r(d, '(^|="|>)Polecany film z wybranej playlisty wraz z grupą polecanych kanałów(?=($|"|<))', "$1"+"Rekōmandowane wideo z ôbranyj playlisty spōlniy ze skupinōm rekōmandowanych kanałōw");
  d = r(d, '(^|="|>)Polecany film z wybranej playlisty wraz z grupą innych polecanych playlist i kanałów(?=($|"|<))', "$1"+"Rekōmandowane wideo z ôbranyj playlisty spōlniy ze skupinōm inkszych rekōmandowanych playlist i kanałōw");
  d = r(d, '(^|="|>)\nŁadowanie podglądu szablonu\n        (?=($|"|<))', "$1"+"Ladujã podglōnd");
  d = r(d, '(^|="|>)\nTylko tryb podglądu\n        (?=($|"|<))', "$1"+"Ino podglōnd");

// my_videos
  d = r(d, '(^|="|>)\n        Menedżer filmów\n    (?=($|"|<))', "$1"+"Mynedżer filmōw");
  d = r(d, '(^|="|>)\n        Subskrypcje\n    (?=($|"|<))', "$1"+"Abōniyrowane");
  d = r(d, '(^|="|>)\n        Skrzynka odbiorcza\n    (?=($|"|<))', "$1"+"Brifkastla");
  d = r(d, '(^|="|>)\n        Ustawienia\n    (?=($|"|<))', "$1"+"Nasztalowania");
  d = r(d, '(^|="|>)Prześlij (?=($|"|<))', "$1"+"Prziślij");
  d = r(d, '(^|="|>)Nagraj z kamery internetowej(?=($|"|<))', "$1"+"Nagrej z kamery");
  d = r(d, '(^|="|>)Narzędzia dla twórców(?=($|"|<))', "$1"+"Nŏczynia dlŏ autorōw");
  d = r(d, '(^|="|>)AdWords dla wideo(?=($|"|<))', "$1"+"AdWords dlŏ wideo");
  d = r(d, '(^|="|>)Przesłane(?=($|"|<))', "$1"+"Przisłane");
  d = r(d, '(^|="|>)Wyświetl\\:(?=($|"|<))', "$1"+"Pokŏż:");
  d = r(d, '(^|="|>)Najnowsze(?=($|"|<))', "$1"+"Nŏjnowsze");
  d = r(d, '(^|="|>)Najstarsze(?=($|"|<))', "$1"+"Nŏjstarsze");
  d = r(d, '(^|="|>)Najczęściej oglądane(?=($|"|<))', "$1"+"Nŏjwiyncyj grane");
  d = r(d, '(^|="|>)Niepubliczne(?=($|"|<))', "$1"+"Niypubliczne");
  d = r(d, '(^|="|>)Najnowsze (?=($|"|<))', "$1"+"Nŏjnowsze");
  d = r(d, '(^|="|>)Najstarsze (?=($|"|<))', "$1"+"Nŏjstarsze");
  d = r(d, '(^|="|>)Najczęściej oglądane (?=($|"|<))', "$1"+"Nŏjwiyncyj grane");
  d = r(d, '(^|="|>)Niepubliczne (?=($|"|<))', "$1"+"Niypubliczne");
  d = r(d, '\"Wyszukaj w przesłanych\"', "\"Znŏjdź w przisłanych\"");
  d = r(d, '\"Wyświetl statystyki\"', "\"Pokŏż statystyki\"");
  d = r(d, '\"Wszystkie komentarze\"', "\"Wszyjske kōmyntŏrze\"");
  d = r(d, '(^|="|>)Informacje i ustawienia(?=($|"|<))', "$1"+"Informacyje i nasztalowania");
  d = r(d, '(^|="|>)Ulepszenia(?=($|"|<))', "$1"+"Ulepszynia");
  d = r(d, '(^|="|>)Adnotacje(?=($|"|<))', "$1"+"Dopiski");
  d = r(d, '(^|="|>)Pobierz w formacie MP4(?=($|"|<))', "$1"+"Symnij we formacie MP4");
  d = r(d, '(^|="|>)\n      Przesłane\n    (?=($|"|<))', "$1"+"Przisłane");
  d = r(d, '(^|="|>)\n      Historia\n    (?=($|"|<))', "$1"+"Gyszichta");
  d = r(d, '(^|="|>)\n      Historia wyszukiwania\n    (?=($|"|<))', "$1"+"Gyszichta szukaniŏ");
  d = r(d, '(^|="|>)\n      Do obejrzenia\n    (?=($|"|<))', "$1"+"Do ôbezdrzyniŏ");
  d = r(d, '(^|="|>)\n      Dodane do ulubionych\n    (?=($|"|<))', "$1"+"Dodane do wertownych");

// my_videos_upload
  d = r(d, '(^|="|>)Prześlij pliki wideo(?=($|"|<))', "$1"+"Prziślij zbiory wideo");
  d = r(d, '(^|="|>)Inne sposoby dodawania i robienia filmów(?=($|"|<))', "$1"+"Inksze cesty do dodawaniŏ i robiyniŏ wideo");
  d = r(d, '(^|="|>)Prześlij wiele plików(?=($|"|<))', "$1"+"Prziślij wiyncyj zbiorōw");
  d = r(d, '(^|="|>)Wybierz pliki z komputera (?=($|"|<))', "$1"+"Wkludź zbiory z kōmputra ");
  d = r(d, '(^|="|>)\nAby zaznaczyć kilka plików\\, podczas wybierania przytrzymaj Ctrl\\.\n              (?=($|"|<))', "$1"+"Prziciś i trzimej knefel Ctrl, coby zaznaczyć wiyncyj zbiorōw");
  d = r(d, '(^|="|>)\nWyraź siebie\\! Nagraj film i dodaj go na YouTube\\.\n              (?=($|"|<))', "$1"+"Pokŏż sie! Nagrej wideo i wciepnij je na YouTube.");
  d = r(d, '(^|="|>)\nPrzeciągnij na tę stronę filmy\\, które chcesz przesłać\\.\n  (?=($|"|<))', "$1"+"Przeciōng sam wideo, kere chcesz przisłać.");
  d = r(d, '(^|="|>)\nPrzesyłaj filmy HD w różnych formatach o długości do 15 minut\\.\n                (?=($|"|<))', "$1"+"Przisyłej wideo HD w roztomajtych formatach do 15 minut dugich. ");
  d = r(d, '(^|="|>)Zwiększ limit.(?=($|"|<))', "$1"+"Powiynksz limit.");
  d = r(d, '\"Trwa wczytywanie\\.\\.\\.\"', "\"Ladujã...\"");
  d = r(d, '(^|="|>)\nTrwa wczytywanie\\.\\.\\.\n  (?=($|"|<))', "$1"+"Ladujã...");
  d = r(d, '(^|="|>)Trwa wczytywanie\\.\\.\\.(?=($|"|<))', "$1"+"Ladujã...");
  d = r(d, '(^|="|>)\nTrwa wczytywanie\\.\\.\\.\n        (?=($|"|<))', "$1"+"Ladujã...");
  d = r(d, '(^|="|>)\nUdostępnij moją aktywność w serwisie\\:\n    (?=($|"|<))', "$1"+"Pokŏż mojõ aktywność na:");
  d = r(d, '(^|="|>)Połącz (?=($|"|<))', "$1"+"Podkupluj");
  d = r(d, '(^|="|>)Ważne\\:(?=($|"|<))', "$1"+"Pozōr:");
  d = r(d, '(^|="|>) musisz posiadać prawa autorskie lub mieć odpowiednie prawa do wszystkich przesyłanych materiałów\\. (?=($|"|<))', "$1"+" musisz mieć autorske prawa abo ôdpednie prawa do wszyjskich przisyłanych matyriŏłōw. ");
  d = r(d, '(^|="|>)Więcej informacji(?=($|"|<))', "$1"+"Wiyncyj informacyjōw");
  d = r(d, '(^|="|>)Pomoc i propozycje(?=($|"|<))', "$1"+"Pōmoc i forszlagi");
  d = r(d, '(^|="|>)Pomoc w przesyłaniu(?=($|"|<))', "$1"+"Pōmoc przi przisyłaniu");
  d = r(d, '(^|="|>)Pomoc w kodowaniu(?=($|"|<))', "$1"+"Pōmoc przi kodowaniu");
  d = r(d, '(^|="|>)Bezpośrednie przesyłanie z komórek(?=($|"|<))', "$1"+"Bezpostrzednie przisyłaniy z mobilniŏkōw");
  d = r(d, '(^|="|>)\n            \nProblemy z przesyłaniem\\? Wypróbuj (?=($|"|<))', "$1"+"Niyprzileżytości przi przisyłaniu? Użyj ");
  d = r(d, '(^|="|>)prosty program do przesyłania(?=($|"|<))', "$1"+"ańfachowygo nŏczyniŏ do przisyłaniŏ");
  d = r(d, '(^|="|>) \\(działa również w przypadku starszych komputerów i przeglądarek\\)\\.\n    (?=($|"|<))', "$1"+" (działŏ tyż na starszych kōmputrach i przeglōndarkach). ");
  d = r(d, '(^|="|>)Prześlij opinię(?=($|"|<))', "$1"+"Prziślij numerã");
  d = r(d, '(^|="|>)Wybierz pliki (?=($|"|<))', "$1"+"Ôbiyr zbiory");
  d = r(d, '(^|="|>)Wybieranie wielu plików(?=($|"|<))', "$1"+"Przisyłaniy wielu zbiorōw");
  d = r(d, '(^|="|>)\nAby zaznaczyć kilka plików\\, podczas wybierania przytrzymaj Ctrl\\.\n       (?=($|"|<))', "$1"+"Prziciś i trzimej knefel Ctrl, coby zaznaczyć wiyncyj zbiorōw");

// my_webcam
  d = r(d, '(^|="|>)Nagraj film z kamery internetowej(?=($|"|<))', "$1"+"Nagrej wideo z kamery");

// my_videos_edit
  d = r(d, '(^|="|>)\n        Informacje i ustawienia\n    (?=($|"|<))', "$1"+"Informacyje i nasztalowania");
  d = r(d, '(^|="|>)\n        Ulepszenia\n    (?=($|"|<))', "$1"+"Ulepszynia");
  d = r(d, '(^|="|>)\n        Adnotacje\n    (?=($|"|<))', "$1"+"Dopiski");
  d = r(d, '(^|="|>)Zobacz na stronie odtwarzania(?=($|"|<))', "$1"+"Ôbezdrzij na strōnie graniŏ");
  d = r(d, '\"Zapisano\"', "\"Spamiyntane\"");
  d = r(d, '(^|="|>)Informacje o filmie(?=($|"|<))', "$1"+"Informacyje ô wideo");
  d = r(d, '(^|="|>)\nCzas przesłania\\:\n      (?=($|"|<))', "$1"+"Datōm przisłaniŏ:");
  d = r(d, '(^|="|>)Czas trwania\\:(?=($|"|<))', "$1"+"Dugość:");
  d = r(d, '(^|="|>)Plik źródłowy\\:(?=($|"|<))', "$1"+"Zdrzōdłowy zbiōr:");
  d = r(d, '(^|="|>)Wyświetlenia\\:(?=($|"|<))', "$1"+"Grane:");
  d = r(d, '(^|="|>)Oceny pozytywne\\:(?=($|"|<))', "$1"+"Pozytywne nōmery:");
  d = r(d, '(^|="|>)Komentarze\\:(?=($|"|<))', "$1"+"Kōmyntŏrze:");
  d = r(d, '(^|="|>)\nURL filmu\\:(?=($|"|<))', "$1"+"URL ôd widea:");
  d = r(d, '(^|="|>)\nUstaw jako miniaturę\n          (?=($|"|<))', "$1"+"Nasztaluj jako ôbrŏzek");
  d = r(d, '(^|="|>)Informacje podstawowe(?=($|"|<))', "$1"+"Piyrsze informacyje");
  d = r(d, '(^|="|>)Ustawienia zaawansowane(?=($|"|<))', "$1"+"Rozwiniynte nasztalowania");
  d = r(d, '(^|="|>)\nUstawienia prywatności\n      (?=($|"|<))', "$1"+"Nasztalowania ôd prywatności");
  d = r(d, '(^|="|>)Prywatność dotyczy sposobu udostępniania filmów znajomym\\, rodzinie i światu\\.\n        (?=($|"|<))', "$1"+"We prywatności idzie ô to, kōmu pokŏżesz wideo - kamratōm, familiji, abo światowi.");
  d = r(d, '(^|="|>)\nWięcej informacji\n        (?=($|"|<))', "$1"+" Wiyncyj informacyjōw");
  d = r(d, '(^|="|>)\nNiepubliczny\n  (?=($|"|<))', "$1"+"Niypubliczny");
  d = r(d, '(^|="|>)\nFilm mogą wyszukiwać i oglądać wszystkie osoby\n      (?=($|"|<))', "$1"+"Kŏżdy może znŏlyź i ôbezdrzeć to wideo");
  d = r(d, '(^|="|>)\nFilm może oglądać każda osoba mająca link\n      (?=($|"|<))', "$1"+"Wideo może ôbezdrzeć ino tyn, fto mŏ link");
  d = r(d, '(^|="|>)\nFilm mogą oglądać tylko wybrane przez Ciebie osoby\n      (?=($|"|<))', "$1"+"Wideo mogōm ôbezdrzeć perzōny ôbrane ôd ciebie");
  d = r(d, '(^|="|>)Kategoria(?=($|"|<))', "$1"+"Kategoryjŏ");
  d = r(d, '(^|="|>)Edukacja(?=($|"|<))', "$1"+"Edukacyjŏ");
  d = r(d, '(^|="|>)Film i animacja(?=($|"|<))', "$1"+"Film i animacyjŏ");
  d = r(d, '(^|="|>)Gry(?=($|"|<))', "$1"+"Szpile");
  d = r(d, '(^|="|>)Motoryzacja(?=($|"|<))', "$1"+"Motoryzacyjŏ");
  d = r(d, '(^|="|>)Nauka i technika(?=($|"|<))', "$1"+"Wiedza i technika");
  d = r(d, '(^|="|>)Poradniki i styl(?=($|"|<))', "$1"+"Dorady i styl");
  d = r(d, '(^|="|>)Rozrywka(?=($|"|<))', "$1"+"Szpas");
  d = r(d, '(^|="|>)Społeczne i non-profit(?=($|"|<))', "$1"+"Aktywizmus i niyzyskowne");
  d = r(d, '(^|="|>)Sport(?=($|"|<))', "$1"+"Szport");
  d = r(d, '(^|="|>)Śmieszne(?=($|"|<))', "$1"+"Śmiyszne");
  d = r(d, '(^|="|>)Wiadomości i polityka(?=($|"|<))', "$1"+"Informacyje i polityka");
  d = r(d, '(^|="|>)Zwierzęta(?=($|"|<))', "$1"+"Zwierzynta");
  d = r(d, '\"Niepubliczny\"', "\"Niypubliczny\"");
  d = r(d, '(^|="|>)Opis(?=($|"|<))', "$1"+"Podpis");
  d = r(d, '(^|="|>)Komentarze i odpowiedzi(?=($|"|<))', "$1"+"Kōmyntŏrze i ôdpedzi");
  d = r(d, '(^|="|>)\n\nZezwalaj na komentarze\\:\n                  (?=($|"|<))', "$1"+"Zwolej na kōmyntŏrze:");
  d = r(d, '(^|="|>)\nWszystkie\n  (?=($|"|<))', "$1"+"Wszyjske");
  d = r(d, '(^|="|>)\nZatwierdzone\n  (?=($|"|<))', "$1"+"Weryfikowane");
  d = r(d, '(^|="|>)\n\nUżytkownicy mogą głosować na komentarze\\.\n                  (?=($|"|<))', "$1"+"Używŏcze mogōm nōmerować kōmyntŏrze");
  d = r(d, '(^|="|>)\n\nUżytkownicy mogą wyświetlać oceny tego filmu\n                  (?=($|"|<))', "$1"+"Używŏcze mogōm ôglōndać nōmery ôd tego widea");
  d = r(d, '(^|="|>)\n\nZezwalaj na odpowiedzi wideo\\:\n                  (?=($|"|<))', "$1"+"Zwolej na wideoôdpedzi");
  d = r(d, '(^|="|>)\nWszystkie\n  (?=($|"|<))', "$1"+"Wszyjske");
  d = r(d, '(^|="|>)\nZatwierdzone\n  (?=($|"|<))', "$1"+"Weryfikowane");
  d = r(d, '(^|="|>)Dystrybucja(?=($|"|<))', "$1"+"Dystrybucyjŏ");
  d = r(d, '(^|="|>)\nWszędzie\n    (?=($|"|<))', "$1"+"Wszyndy");
  d = r(d, '(^|="|>)Umieszcznie(?=($|"|<))', "$1"+"Dzielyniy sie");
  d = r(d, '(^|="|>)\n\nWłącz umieszczanie\\.\n                  (?=($|"|<))', "$1"+"Zwōl dzielić sie");
  d = r(d, '(^|="|>)Zezwalaj innym na umieszczanie filmu na ich stronach\\.\n        (?=($|"|<))', "$1"+"Zwōl inkszym wkludzać wideo na strōnach ôd nich");
  d = r(d, '(^|="|>)Lokalizacja filmowania(?=($|"|<))', "$1"+"Plac kamerowaniŏ");
  d = r(d, '(^|="|>)Szukaj (?=($|"|<))', "$1"+"Szukej");
  d = r(d, '(^|="|>)Data nagrania(?=($|"|<))', "$1"+"Datōm spamiyntaniŏ");
  d = r(d, '(^|="|>)Dzisiaj (?=($|"|<))', "$1"+"Dzisiej");
  d = r(d, '(^|="|>)Film 3D(?=($|"|<))', "$1"+"Wideo 3D");
  d = r(d, '(^|="|>)\nBrak preferencji\n    (?=($|"|<))', "$1"+"Niynasztalowane");
  d = r(d, '(^|="|>)\nWyłącz 3D w tym filmie\n  (?=($|"|<))', "$1"+"To wideo niyma w 3D");
  d = r(d, '(^|="|>)\nPrzekształć ten film w 3D\\.\n  (?=($|"|<))', "$1"+"Zmiyń to wideo w 3D");
  d = r(d, '(^|="|>)\nTo już jest film 3D\n  (?=($|"|<))', "$1"+"To już je wideo 3D");
  d = r(d, '(^|="|>)Zapisz zmiany (?=($|"|<))', "$1"+"Spamiyntej zmiany");

// view_all_playlists
  d = r(d, '(^|="|>)\\+ Nowa playlista (?=($|"|<))', "$1"+"+ Nowŏ playlista");
  d = r(d, '(^|="|>)\nTytuł playlisty\n    (?=($|"|<))', "$1"+"Tytuł ôd playlisty");
  d = r(d, '(^|="|>)\nOpis playlisty\n    (?=($|"|<))', "$1"+"+ Ôpis ôd playlisty");
  d = r(d, '(^|="|>)Utwórz playlistę (?=($|"|<))', "$1"+"Złōnacz playlistã");
  d = r(d, '(^|="|>)\nAnuluj\n      (?=($|"|<))', "$1"+"Ôdciep");

// my_history
  d = r(d, '(^|="|>)Wyczyść całą historię oglądania (?=($|"|<))', "$1"+"Wyciep cŏłkõ gyszichtã ôbezdrzanych wideo");
  d = r(d, '(^|="|>)Wyczyść całą historię oglądania(?=($|"|<))', "$1"+"Wyciep cŏłkõ gyszichtã ôbezdrzanych wideo");
  d = r(d, '(^|="|>)\nCzy na pewno chcesz wyczyścić całą historię oglądania\\? Operacji nie można cofnąć\\.\n            (?=($|"|<))', "$1"+"Na isto chcesz wyciepnōńć cŏłkõ gyszichtã? Niy bydzie jij szło wrōcić.");
  d = r(d, '(^|="|>)Wstrzymaj historię oglądania (?=($|"|<))', "$1"+"Zastŏw gyszichtã ôbezdrzanych wideo");
  d = r(d, '(^|="|>)Wznów historię oglądania (?=($|"|<))', "$1"+"Włōncz gyszichtã ôbezdrzanych wideo");
  d = r(d, '\"Wyświetlenia\"', "\"Ôbezdrzane\"");
  d = r(d, '\"Oceny pozytywne\"', "\"Pozytywne nōmery\"");
  d = r(d, '\"Oceny negatywne\"', "\"Negatywne nōmery\"");
  d = r(d, '\"Komentarze\"', "\"Kōmyntŏrze\"");
  d = r(d, '(^|="|>)Wyczyść całą historię wyszukiwania (?=($|"|<))', "$1"+"Wyciep cŏłkõ gyszichtã szukaniŏ");
  d = r(d, '(^|="|>)Wyczyść całą historię wyszukiwania(?=($|"|<))', "$1"+"Wyciep cŏłkõ gyszichtã szukaniŏ");
  d = r(d, '(^|="|>)\nCzy na pewno chcesz wyczyścić całą historię wyszukiwania\\? Operacji nie można cofnąć\\.\n            (?=($|"|<))', "$1"+"Na isto chcesz wyciepnōńć cŏłkõ gyszichtã? Niy bydzie jij szło wrōcić.");
  d = r(d, '(^|="|>)Wstrzymaj historię wyszukiwania (?=($|"|<))', "$1"+"Zastŏw gyszichtã szukaniŏ");
  d = r(d, '(^|="|>)Wznów historię wyszukiwania (?=($|"|<))', "$1"+"Włōncz gyszichtã szukaniŏ");
  d = r(d, '(^|="|>)Załaduj więcej wyszukiwań (?=($|"|<))', "$1"+"Zaladuj wiyncyj");
  d = r(d, '(^|="|>)Moja historia wyszukiwania(?=($|"|<))', "$1"+"Moja gyszichta szukaniŏ");
  d = r(d, '(^|="|>)Historia wyszukiwania jest pusta\\.(?=($|"|<))', "$1"+"Gyszichta szukaniŏ je pustŏ.");
  d = r(d, '(^|="|>)\n    Nie znaleziono filmów wideo\\.\n  (?=($|"|<))', "$1"+"Niy ma sam zŏdnych wideo");

// my_favorites
  d = r(d, '(^|="|>)Odtwórz wszystkie (?=($|"|<))', "$1"+"Grej wszyjske");

// my_liked_videos
  d = r(d, '(^|="|>)Fajne filmy(?=($|"|<))', "$1"+"Fajne wideo");

//inbox
  d = r(d, '(^|="|>)Utwórz (?=($|"|<))', "$1"+"Złōnacz");
  d = r(d, '(^|="|>)Wiadomości osobiste(?=($|"|<))', "$1"+"Prywatne wiadōmości");
  d = r(d, '(^|="|>)Udostępniane Tobie(?=($|"|<))', "$1"+"Dzielōne z tobōm");
  d = r(d, '(^|="|>)Komentarze(?=($|"|<))', "$1"+"Kōmyntŏrze");
  d = r(d, '(^|="|>)Powiadomienia o kontaktach(?=($|"|<))', "$1"+"Informacyje ô kōntaktach");
  d = r(d, '(^|="|>)Odpowiedzi wideo(?=($|"|<))', "$1"+"Wideoôdpedzi");
  d = r(d, '(^|="|>)Książka adresowa (.+)(?=($|"|<))', "$1"+"Adresowŏ ksiōnżka "+"$2");

// my_subscriptions
  d = r(d, '(^|="|>)Dodaj do (?=($|"|<))', "$1"+"Dodej do");
  d = r(d, '(^|="|>)Nowe filmy(?=($|"|<))', "$1"+"Nowe wideo");
  d = r(d, '(^|="|>)\n        Nowe filmy\n    (?=($|"|<))', "$1"+" Nowe wideo ");
  d = r(d, '(^|="|>)\n          Nie znaleziono filmów wideo\\.\n        (?=($|"|<))', "$1"+"Niy ma sam żŏdnych wideo");
  d = r(d, '(^|="|>)\nZnajdź więcej kanałów\n    (?=($|"|<))', "$1"+"Znŏjdź wiyncyj kanałōw");
  d = r(d, '(^|="|>)\nKanały wybrane dla Ciebie\n    (?=($|"|<))', "$1"+"Forszlagowane kanały");
  d = r(d, '(^|="|>)\nSortuj według\\:\n\n\n    \n\n    \n    \n\n\n  (?=($|"|<))', "$1"+"Pokŏż wedle: ");
  d = r(d, '(^|="|>)\n              autor\\:     (?=($|"|<))', "$1"+" autōr: ");
  d = r(d, '(^|="|>)\n                Wyświetlenia\\:\n              (?=($|"|<))', "$1"+"Ôbezdrzane ôd: ");
  d = r(d, '(^|="|>)\n                (1?[2-4]) sek\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" sekōndy do zadku");
  d = r(d, '(^|="|>)\n                (1?[5-9]) sek\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)\n                ([0-9,]+) sek\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" sekōnd do zadku");
  d = r(d, '(^|="|>)\n                (1?[2-4]) min\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" minuty do zadku");
  d = r(d, '(^|="|>)\n                (1?[5-9]) min\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)\n                ([0-9,]+) min\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" minut do zadku");
  d = r(d, '(^|="|>)\n                1 godzinę temu\n\n            (?=($|"|<))', "$1"+" "+"1 godzinã do zadku");
  d = r(d, '(^|="|>)\n                (1?[2-4]) godz\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" godziny do zadku");
  d = r(d, '(^|="|>)\n                (1?[5-9]) godz\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)\n                ([0-9,]+) godz\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" godzin do zadku");
  d = r(d, '(^|="|>)\n                1 dzień temu\n\n            (?=($|"|<))', "$1"+" "+"1 dziyń do zadku");
  d = r(d, '(^|="|>)\n                ([0-9,]+) dni temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" dni do zadku");
  d = r(d, '(^|="|>)\n                1 tydzień temu\n\n            (?=($|"|<))', "$1"+" "+"1 tydziyń do zadku");
  d = r(d, '(^|="|>)\n                (1?[2-4]) tygodnie temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" tydnie do zadku");
  d = r(d, '(^|="|>)\n                1 miesiąc temu\n\n            (?=($|"|<))', "$1"+" "+"1 miesiōnc do zadku");
  d = r(d, '(^|="|>)\n                (1?[2-4]) mies\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" miesiōnce do zadku");
  d = r(d, '(^|="|>)\n                (1?[5-9]) mies\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)\n                ([0-9,]+) mies\\. temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" miesiyncy do zadku");
  d = r(d, '(^|="|>)\n                1 rok temu\n\n            (?=($|"|<))', "$1"+" "+"1 rok do zadku");
  d = r(d, '(^|="|>)\n                (1?[2-4]) lata temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" lata do zadku");
  d = r(d, '(^|="|>)\n                (1?[5-9]) lata temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");
  d = r(d, '(^|="|>)\n                ([0-9,]+) lata temu\n\n            (?=($|"|<))', "$1"+" "+"$2"+" lŏt do zadku");

// account
  d = r(d, '(^|="|>)Ustawienia konta(?=($|"|<))', "$1"+"Nasztalowania ôd kōnta");
  d = r(d, '(^|="|>)\nOgólne    (?=($|"|<))', "$1"+"Ôgōlne");
  d = r(d, '(^|="|>)\nUdostępnianie    (?=($|"|<))', "$1"+"Dzielyniy sie");
  d = r(d, '(^|="|>)\nOdtwarzanie    (?=($|"|<))', "$1"+"Graniy");
  d = r(d, '(^|="|>)\nGenerowanie przychodu    (?=($|"|<))', "$1"+"Zarŏbianiy");
  d = r(d, '(^|="|>)\nDomyślne    (?=($|"|<))', "$1"+"Wychodne");
  d = r(d, '(^|="|>)Ogólne\n(?=($|"|<))', "$1"+"Ôgōlne");
  d = r(d, '(^|="|>)Zapisz (?=($|"|<))', "$1"+"Spamiyntej");
  d = r(d, '(^|="|>)Informacje o koncie(?=($|"|<))', "$1"+"Informacyje ô kōncie");
  d = r(d, '(^|="|>)Imię i nazwisko(?=($|"|<))', "$1"+"Miano");
  d = r(d, '(^|="|>)zmień(?=($|"|<))', "$1"+"zmiyń");
  d = r(d, '(^|="|>)Zamknij(?=($|"|<))', "$1"+"Zawrzij");
  d = r(d, '(^|="|>)Zmień zdjęcie(?=($|"|<))', "$1"+"Zmiyń bild");
  d = r(d, '(^|="|>)Zaawansowane(?=($|"|<))', "$1"+"Rozwiniynte");
  d = r(d, '(^|="|>)Zmień hasło(?=($|"|<))', "$1"+"Zmiyń hasło");
  d = r(d, '(^|="|>)Zostaniesz przekierowany na stronę Twojego konta Google(?=($|"|<))', "$1"+"Bydziesz przekludzōny na strōnã kōnta Google ôd ciebie");
  d = r(d, '(^|="|>)Przesłane z komórki(?=($|"|<))', "$1"+"Przisłane z mobilniŏka");
  d = r(d, '(^|="|>)\nPrześlij film z telefonu\\, wysyłając e-maila na ten adres\\.\nChcesz mieć inny adres\\?\n          (?=($|"|<))', "$1"+"Coby przisłać wideo z mobilniŏka, użyj tyj adresy. Chcesz mieć inkszõ? ");
  d = r(d, '(^|="|>)Kliknij tutaj(?=($|"|<))', "$1"+"Kliknij sam");
  d = r(d, '(^|="|>)Stan konta(?=($|"|<))', "$1"+"Status kōnta");
  d = r(d, '(^|="|>)Ma dobrą opinię(?=($|"|<))', "$1"+"Mŏ dobrõ nōmerã");
  d = r(d, '(^|="|>)Wytyczne dla społeczności(?=($|"|<))', "$1"+"Dorady dlŏ społeczności");
  d = r(d, '(^|="|>)Ostrzeżenia dotyczące praw autorskich(?=($|"|<))', "$1"+"Naruszynia autorskich praw");
  d = r(d, '(^|="|>)Roszczenia dotyczące identyfikacji treści(?=($|"|<))', "$1"+"Idyntyfikacyjŏ skłŏdu");
  d = r(d, '(^|="|>)\n\n      Zezwalaj na wyświetlanie reklam przy moich filmach\n    (?=($|"|<))', "$1"+"Zwōl na werbōngi w moich wideo");
  d = r(d, '(^|="|>)\n\n      Nie zezwalaj na wyświetlanie reklam przy moich filmach\n    (?=($|"|<))', "$1"+"Niy zwolej na werbōngi w moich wideo");
  d = r(d, '(^|="|>)Reklamy będą wyświetlane tylko przy filmach\\, do których masz wszystkie prawa\\. Po wybraniu tej opcji  wszystkie opcje generowania przychodu ustawione dla Twoich filmów zostaną wyłączone\\.(?=($|"|<))', "$1"+"Werbōngi bydōm pokazywane ino przi wideo, do kerych mŏsz wszyjske prawa. Po zastŏwiyniu werbōngōw cŏłke zarŏbianiy na twoich wideo bydzie wyłōnczōne.");
  d = r(d, '(^|="|>)Dowiedz się\\, jak promować swoje filmy(?=($|"|<))', "$1"+"Przewiedź sie jak werbować do ôglōndaniŏ wideo ôd ciebie");

// account_sharing
  d = r(d, '(^|="|>)Udostępnianie\n(?=($|"|<))', "$1"+"Dzielyniy sie");
  d = r(d, '(^|="|>)Połącz swoje konta(?=($|"|<))', "$1"+"Skupluj z inkszymi kōntami");
  d = r(d, '(^|="|>)\nWyłącz udostępnianie aktywności\n              (?=($|"|<))', "$1"+"Niy pokazuj aktywności");
  d = r(d, '(^|="|>)\nWłącz udostępnianie aktywności\n              (?=($|"|<))', "$1"+"Pokazuj aktywność");
  d = r(d, '(^|="|>)\nOdłącz konto\n              (?=($|"|<))', "$1"+"Ôdkupluj kōnto");
  d = r(d, '(^|="|>)Udostępnij moją aktywność\\, gdy\\:(?=($|"|<))', "$1"+"Pokazuj aktywność ódy mie, jak:");
  d = r(d, '(^|="|>)Na połączonych kontach(?=($|"|<))', "$1"+"Na podkuplowanych kōntach");
  d = r(d, '(^|="|>)Prześlę film.(?=($|"|<))', "$1"+"Prziślã wideo*");
  d = r(d, '(^|="|>)Dodam film do playlisty..(?=($|"|<))', "$1"+"Dodōm wideo do playlisty**");
  d = r(d, '(^|="|>)Dodam film do ulubionych(?=($|"|<))', "$1"+"Dodōm wideo do wertownych");
  d = r(d, '(^|="|>)Spodoba mi się film(?=($|"|<))', "$1"+"Mōm rŏd abo rada jakeś wideo");
  d = r(d, '(^|="|>)Skomentuję film(?=($|"|<))', "$1"+"Skōmyntujã wideo");
  d = r(d, '(^|="|>)Zasubskrybuję kanał(?=($|"|<))', "$1"+"Abōniyrujã kanał");
  d = r(d, '(^|="|>)(.+) Przesłane filmy publiczne są zawsze udostępniane w YouTube\\.(?=($|"|<))', "$1"+"$2"+" Przisłane publiczne wideo sōm dycki widzialne we YouTube.");
  d = r(d, '(^|="|>)(.+) Dostępność informacji o dodaniu filmu do playlisty zależy od ustawień prywatności tej playlisty(?=($|"|<))', "$1"+"$2"+" Widzialność informacyji ô dodaniu wideo do playlisty znoleży na nasztalowania prywatności ôd niyj.");

// account_privacy
  d = r(d, '(^|="|>)Wyszukiwanie i kontakty(?=($|"|<))', "$1"+"Szukaniy i kōntakty");
  d = r(d, '(^|="|>)\n\n      Zezwalaj (.+)tylko moim kontaktom(.+) na wysyłanie do mnie wiadomości i udostępnianie filmów\n    (?=($|"|<))', "$1"+"  Zwōl "+"$2"+"ino kōntaktōm ôdy mie"+"$3"+" na wysyłaniy dō mie wiadōmości i dzielyniy sie wideo");
  d = r(d, '(^|="|>)\n\n      Zezwalaj osobom, które znają mój adres e-mail, na znajdowanie mojego kanału w YouTube\n    (?=($|"|<))', "$1"+"  Zwōl ludziōm, kerzy znajōm e-mail ôdy mie znŏlyź mōj kanał w YouTube");
  d = r(d, '(^|="|>)Reklamy związane z moimi zainteresowaniami(?=($|"|<))', "$1"+"Werbōngi wedle moich ôbmiyłowań");
  d = r(d, '(^|="|>)\n\n      Pokazuj reklamy na interesujące mnie tematy na podstawie moich informacji\n    (?=($|"|<))', "$1"+"Korzystej z moich informacyjōw przi pokazywaniu werbōngōw");
  d = r(d, '(^|="|>)Statystyki i dane(?=($|"|<))', "$1"+"Statystyki i dalsze");
  d = r(d, '(^|="|>)\n\n      Domyślnie udostępniaj publicznie statystyki i dane moich filmów\n    (?=($|"|<))', "$1"+"  Wychodnie pokazuj publiczne statystyki i daty wideo ôdy mie");
  d = r(d, '(^|="|>)\nW sekcji \\„Statystyki i dane\\” widzowie znajdą interesujące informacje na temat każdego Twojego filmu\\. Zmiana ustawienia domyślnego spowoduje zmianę ustawień dla wszystkich Twoich filmów\\.\n  (?=($|"|<))', "$1"+"Sekcyjŏ \"Statystyki i dalsze\" pokaże informacyje ô kŏżdym filmie ôd ciebie. Zmiana wychodnygo nasztalowaniŏ zmiyni wszyjske wideo.");

// account_notifications
  d = r(d, '(^|="|>)Adres e-mail(?=($|"|<))', "$1"+"E-mailowŏ adresa");
  d = r(d, '(^|="|>)\nTwój obecny adres e-mail\\: (?=($|"|<))', "$1"+"Aktualnŏ E-mailowŏ adresa ôd ciebie: ");
  d = r(d, '(^|="|>)Język używany w e-mailach\\: (.+) Czy chcesz dokonać zmiany na język polski\\?(?=($|"|<))', "$1"+"Mŏwa E-maili: "+"$2"+". Chcesz zmiynić na... Hm... Polskõ?");
  d = r(d, '(^|="|>)Zmień na język polski (?=($|"|<))', "$1"+"Zmiyń na polskõ godkã...");
  d = r(d, '(^|="|>)Podsumowanie subskrypcji(?=($|"|<))', "$1"+"Przeglōnd abōniyrowanych kanałōw");
  d = r(d, '(^|="|>)\n    Wysyłaj do mnie e-maile z informacją o najnowszych filmach z moich subskrypcji\\:\n  (?=($|"|<))', "$1"+"Przisyłej mi E-maile z przeglōndym nŏjnowszych wideo z kanałōw, kere abōniyrujã: ");
  d = r(d, '(^|="|>)Raz dziennie(?=($|"|<))', "$1"+"Jedyn na dziyń");
  d = r(d, '(^|="|>)Raz w tygodniu(?=($|"|<))', "$1"+"Jedyn na tydziyń");
  d = r(d, '(^|="|>)Powiadomienia e-mail(?=($|"|<))', "$1"+"Wiadōmości e-mail");
  d = r(d, '(^|="|>)\n\n      Chcę otrzymywać powiadomienia e-mail\\, gdy\\:\n    (?=($|"|<))', "$1"+"Przisyłej mi E-mail z wiadōmościōm, kej:");
  d = r(d, '(^|="|>)\n\n      Ktoś zasubskrybuje mój kanał\n    (?=($|"|<))', "$1"+"  Ftoś abōniyruje mōj kanał");
  d = r(d, '(^|="|>)\n\n      Ktoś doda nowy komentarz na moim kanale\n    (?=($|"|<))', "$1"+"  Ftoś skōmyntuje na moim kanale");
  d = r(d, '(^|="|>)\n\n      Ktoś skomentuje mój film lub doda odpowiedź wideo\n    (?=($|"|<))', "$1"+"  Ftoś abōniyruje mōj kanał");
  d = r(d, '(^|="|>)\n\n      Otrzymam nową wiadomość prywatną lub ktoś udotępni mi film\n    (?=($|"|<))', "$1"+"  Dostanã nowõ prywatnõ wiadōmość abo ftoś podzieli sie zy mnōm wideo");
  d = r(d, '(^|="|>)\n\n      Powiadomienia o wydarzeniach na żywo w YouTube\n    (?=($|"|<))', "$1"+"  Wiadōmości ô przitrefiyniach na żywo w YouTube");
  d = r(d, '(^|="|>)\n\n      Nie chcę otrzymywać żadnych e-maili\n    (?=($|"|<))', "$1"+"  Niy przisyłej mi żŏdnych E-mailōw");
  d = r(d, '(^|="|>)Newslettery YouTube(?=($|"|<))', "$1"+"Biuletyny ôd YouTube");
  d = r(d, '(^|="|>)Wybierz newslettery\\, które chcesz co jakiś czas dostawać z YouTube\\:(?=($|"|<))', "$1"+"Ôbiyr biuletyny, kere chcesz dostŏwać ôd YouTube:");
  d = r(d, '(^|="|>)\n\n      Wszystkie newslettery YouTube\n    (?=($|"|<))', "$1"+"  Wszyjske biuletyny ôd YouTube");
  d = r(d, '(^|="|>)\n\n      Comiesięczny newsletter YouTube\n    (?=($|"|<))', "$1"+"  Miesiynczny biuletyn ôd YouTube");
  d = r(d, '(^|="|>)\n\n      Comiesięczny newsletter YouTube o filmach\n    (?=($|"|<))', "$1"+"  Miesiynczny filmowy biuletyn ôd YouTube");
  d = r(d, '(^|="|>)\n\n      Comiesięczny newsletter YouTube o muzyce\n    (?=($|"|<))', "$1"+"  Miesiynczny muzyczny biuletyn ôd YouTube");
  d = r(d, '(^|="|>)\n\n      Comiesięczny newsletter YouTube o polityce\\, edukacji i informacjach ze świata\n    (?=($|"|<))', "$1"+"  Miesiynczny biuletyn Youtube ô polityce, edukacyji i wiadōmościach ze świata");

// account_playback
  d = r(d, '(^|="|>)Odtwarzanie\n(?=($|"|<))', "$1"+"Graniy");
  d = r(d, '(^|="|>)Jakość odtwarzania filmów(?=($|"|<))', "$1"+"Jakość granych wideo");
  d = r(d, '(^|="|>)\n\n      Zawsze wybieraj jak najlepszą jakość na podstawie szybkości łącza i rozmiaru odtwarzacza\n    (?=($|"|<))', "$1"+"  Dycki ôbiyrej nŏjlepszõ jakość wedle szybkości necu i srogości ôdgrywŏcza");
  d = r(d, '(^|="|>)\n\n      Po przełączeniu na pełny ekran zawsze odtwarzaj w jakości HD \\(jeśli jest dostępna\\)\n    (?=($|"|<))', "$1"+"  Dycki używej HD przi graniu na cŏłkim ekranie (jeli dostympne)");
  d = r(d, '(^|="|>)\n\n      Mam wolne łącze\\. Nigdy nie odtwarzaj filmów w wysokiej jakości\n    (?=($|"|<))', "$1"+"  Mōm wolny nec. Niy grej wideo w wysokij jakości");
  d = r(d, '(^|="|>)\n\n      Pokazuj adnotacje w filmach\n    (?=($|"|<))', "$1"+"  Pokazuj dopiski w wideo");
  d = r(d, '(^|="|>)\n\n      Zawsze pokazuj napisy\n    (?=($|"|<))', "$1"+"  Dycki pokazuj napisy");
  d = r(d, '(^|="|>)\n\n      Wyświetlaj napisy automatyczne z systemu rozpoznawania mowy \\(jeśli są dostępne\\)\n    (?=($|"|<))', "$1"+"  Pokazuj napisy z pōmocōm systymu rozpoznawaniŏ mŏwy (jeli dostympne)");

// account_defaults
  d = r(d, '(^|="|>)Domyślne ustawienia przesyłania\n(?=($|"|<))', "$1"+"Wychodne nasztalowania przisyłaniŏ");
  d = r(d, '(^|="|>)Ustaw wartości domyślne\\, które będą używane przy przesyłaniu kolejnych filmów\\. Ustawienia te możesz zmienić dla poszczególnych filmów\\.(?=($|"|<))', "$1"+"Nasztaluj wychodne wartości, kere bydōm używane przi przisyłaniu dalszych wideo. Te nasztalowania możesz zmiynić tyż dlŏ kŏżdygo wideo.");
  d = r(d, '(^|="|>)Kategoria(?=($|"|<))', "$1"+"Kategoryjŏ");
  d = r(d, '(^|="|>)Wybierz kategorię(?=($|"|<))', "$1"+"Ôbiyr kategoryjõ");
  d = r(d, '(^|="|>)Licencja(?=($|"|<))', "$1"+"Licyncyjŏ");
  d = r(d, '(^|="|>)\nStandardowa licencja YouTube\n   (?=($|"|<))', "$1"+"Standardowŏ licyncyjŏ ôd YouTube");
  d = r(d, '(^|="|>)\nCreative Commons – uznanie autorstwa\n   (?=($|"|<))', "$1"+"Creative Commons – ukŏzaniy zdrzōdła");

// other
  d = r(d, '(^|="|>)\n            Ten film zawiera treść od partnerów (.+) i (.+). Nie jest on dostępny.\n    (?=($|"|<))', "$1"+"Je sam skłŏd ôd "+"$2"+" i "+"$3"+". Wideo niyma dostympne.");
  d = r(d, '(^|="|>)Przepraszamy za usterki\\.(?=($|"|<))', "$1"+"Wybŏczcie niyprzileżytości.");
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