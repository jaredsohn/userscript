// ==UserScript==
// @name        Google-szl
// @namespace   http://userscripts.org/users/477177
// @description Translates Google to Silesian 
// @include     http*://*.google.*/*
// @include     http*//google.*/*
// @exclude     http*://drive.google.com/*
// @exclude     http*://mail.google.com/*
// @exclude     http*://plus.google.com/*
// @exclude     http*://play.google.com/*
// @exclude     http*://docs.google.com/*
// @exclude     http*://google.*/reader/*
// @exclude     http*://*.google.*/reader/*
// @version     0.4
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
  d = r(d, '(^|="|>)Szukaj w Google(?=($|"|<))', "$1"+"Szukej w Google");
  d = r(d, '(^|="|>)Szczęśliwy traf(?=($|"|<))', "$1"+"Mōm szczyńściy");
  d = r(d, '(^|="|>)Polska(?=($|"|<))', "$1"+"Ślōnsk");
  d = r(d, '(^|="|>)Wyszukiwarka(?=($|"|<))', "$1"+"Szukaniy");
  d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1"+"Nowiny");
  d = r(d, '(^|="|>)Kalendarz(?=($|"|<))', "$1"+"Kalyndŏrz");
  d = r(d, '(^|="|>)Więcej(?=($|"|<))', "$1"+"Wiyncyj");
  d = r(d, '(^|="|>)Tłumacz(?=($|"|<))', "$1"+"Tuplikowaniy");
  d = r(d, '(^|="|>)Na komórki(?=($|"|<))', "$1"+"Na mobilniŏk");
  d = r(d, '(^|="|>)Wyszukiwarka(?=($|"|<))', "$1"+"Szukaniy");
  d = r(d, '(^|="|>)Książki(?=($|"|<))', "$1"+"Ksiōnżki");
  d = r(d, '(^|="|>)Czytnik(?=($|"|<))', "$1"+"Reader");
  d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1"+"Bildy");
  d = r(d, '(^|="|>)Aplikacje(?=($|"|<))', "$1"+"Aplikacyje");
  d = r(d, '(^|="|>)Jeszcze więcej(?=($|"|<))', "$1"+"Jeszcze wiyncyj");
  d = r(d, '(^|="|>)Jeszcze więcej ', "$1"+"Jeszcze wiyncyj ");
  d = r(d, '(^|="|>)Udostępnij(?=($|"|<))', "$1"+"Rekōmanduj");
  d = r(d, '(^|="|>)Ustawienia konta(?=($|"|<))', "$1"+"Nasztalōwania kōnta");
  d = r(d, '(^|="|>)Wyświetl profil(?=($|"|<))', "$1"+"Pokŏż profil");
  d = r(d, '(^|="|>)Dodaj konto(?=($|"|<))', "$1"+"Dodej kōnto");
  d = r(d, '(^|="|>)Strona ([0-9,]+) z około ', "$1"+"Strōna "+"$2"+" z kole ");
  d = r(d, '(^|="|>)Udostępnij\\.\\.\\.(?=($|"|<))', "$1"+"Rekōmanduj...");
  d = r(d, '(^|="|>)Około ', "$1"+"Kole ");
  d = r(d, ' wyników(?=($|"|<))', " obiektōw");
  d = r(d, '(^|="|>)Poprzednia(?=($|"|<))', "$1"+"Przōdzij");
  d = r(d, '(^|="|>)Następna(?=($|"|<))', "$1"+"Dalij");
  d = r(d, '(^|="|>)Wszystko o Google(?=($|"|<))', "$1"+"Wszyjsko ô Google");
  d = r(d, '(^|="|>)Reklamuj się w Google(?=($|"|<))', "$1"+"Werbuj u Google");
  d = r(d, '(^|="|>)Rozwiązania dla firm(?=($|"|<))', "$1"+"Możności dlŏ firm");
  d = r(d, '(^|="|>)Strona główna', "$1"+"Przodniŏ strōna");
  d = r(d, '(^|="|>)Prześlij opinię(?=($|"|<))', "$1"+"Prziślij nōmer");
  d = r(d, '(^|="|>)Zmień zdjęcie(?=($|"|<))', "$1"+"Zmiyń bild");
  d = r(d, '(^|="|>)Zmień lokalizację(?=($|"|<))', "$1"+"Zmiyń plac");
  d = r(d, '(^|="|>)Szukaj w internecie(?=($|"|<))', "$1"+"Szukej w internecie");
  d = r(d, '(^|="|>)Kopia(?=($|"|<))', "$1"+"Kopijŏ");
  d = r(d, '(^|="|>)Tylko język polski(?=($|"|<))', "$1"+"Ino polskŏ gŏdka");
  d = r(d, '(^|="|>)Czy chodziło Ci o\\: (?=($|"|<))', "$1"+"Niy szło Ci ô: ");
  d = r(d, '(^|="|>)Przetłumaczone strony(?=($|"|<))', "$1"+"Przełozōne strōny");
  d = r(d, '(^|="|>)Więcej narzędzi(?=($|"|<))', "$1"+"Wiyncyj nŏczyniōw");
  d = r(d, '(^|="|>)Mniej narzędzi(?=($|"|<))', "$1"+"Mynij nŏczyniōw");
  d = r(d, '(^|="|>)Według trafności(?=($|"|<))', "$1"+"Po bliskości tymatu");
  d = r(d, '(^|="|>)Według daty(?=($|"|<))', "$1"+"Wedle daty");
  d = r(d, '(^|="|>)Witryny z grafikami(?=($|"|<))', "$1"+"Place z grafikami");
  d = r(d, '(^|="|>)Odwiedzone strony(?=($|"|<))', "$1"+"Strōny ôglōndane");
  d = r(d, '(^|="|>)Jeszcze nieodwiedzone(?=($|"|<))', "$1"+"Strōny niyôglōndane");
  d = r(d, '(^|="|>)Zresetuj narzędzia(?=($|"|<))', "$1"+"Resetuj nŏczynia");
  d = r(d, '(^|="|>)Filtrowanie wyłączone(?=($|"|<))', "$1"+"Bez filtrowaniŏ");
  d = r(d, '(^|="|>)Filtrowanie ścisłe(?=($|"|<))', "$1"+"Siylne filtrowaniy");
  d = r(d, '(^|="|>)Wyłączony(?=($|"|<))', "$1"+"Wyłōnczōny");
  d = r(d, '(^|="|>)Umiarkowany \\(zalecane\\)(?=($|"|<))', "$1"+"Strzedni (rekōmandowany)");
  d = r(d, '(^|="|>)Ścisły(?=($|"|<))', "$1"+"Siylny");
  d = r(d, '(^|="|>)Więcej informacji o filtrze SafeSearch(?=($|"|<))', "$1"+"Wiyncyj informacyjōw ô filtrze SafeSearch");
  d = r(d, '(^|="|>)Opcje(?=($|"|<))', "$1"+"Nasztalowania");
  d = r(d, '(^|="|>)Ustawienia wyszukiwania(?=($|"|<))', "$1"+"Nasztalowania szukaniŏ");
  d = r(d, '(^|="|>)Szukanie zaawansowane(?=($|"|<))', "$1"+"Szukaniy rozwiniynte");
  d = r(d, '(^|="|>)Historia online(?=($|"|<))', "$1"+"Gyszichta onlajn");
  d = r(d, '(^|="|>)Pomoc dotycząca wyszukiwania(?=($|"|<))', "$1"+"Pōmoc przi szukaniu");
  d = r(d, '(^|="|>)Hasła pokrewne\\:', "$1"+"Podane hasła:");
  d = r(d, '(^|="|>)Porada\\:', "$1"+"Dorada:");
  d = r(d, '(^|="|>)Szukaj tylko stron w języku (?=($|"|<))', "$1"+"Szukej ino w gŏdce: ");
  d = r(d, '(^|="|>)m(?=($|"|<))', "$1"+".");
  d = r(d, '(^|="|>)Ustawienia(?=($|"|<))', "$1"+"Nasztalowania");
  d = r(d, '\\. Możesz określić swój język wyszukiwania w menu (<a [^>]+>)Nasztalowania</a>', " (we ślōnskij gŏdce bydzie szło jak sie spomiarkujymy, że takŏ je). Możesz nasztalować swojõ gŏdkã wedle keryj szukŏsz w myni "+"$1"+"Nasztalowania"+"</a>");

  d = r(d, '(^|="|>)Kontroluj wyświetlane obrazy\\, zmieniając ustawienia filtra SafeSearch\\.(?=($|"|<))', "$1"+"Zmiyniej nasztalowania filtra SafeSearch, coby kōntrolować, kere ôbrŏzy majōm sie pokŏzywać.");
  d = r(d, '(^|="|>)Obejrzyj krótki film(?=($|"|<))', "$1"+"Ôbezdrzij krōtki film");
  d = r(d, '\\, aby dowiedzieć się więcej\\.(?=($|"|<))', ", coby sie wiyncyj przewiedzieć.");
  d = r(d, '(^|="|>)Kiedykolwiek(?=($|"|<))', "$1"+"Bele kedy");
  d = r(d, '(^|="|>) Ostatnia godzina(?=($|"|<))', "$1"+" Ôstatniŏ godzina");
  d = r(d, '(^|="|>) Ostatnie 24 godziny(?=($|"|<))', "$1"+" Ôstatniŏ doba");
  d = r(d, '(^|="|>) Ostatni tydzień(?=($|"|<))', "$1"+" Ôstatni tydziyń");
  d = r(d, '(^|="|>) Ostatni miesiąc(?=($|"|<))', "$1"+" Ôstatni miesiōnc");
  d = r(d, '(^|="|>) Ostatni rok(?=($|"|<))', "$1"+" Ôstatni rok");
  d = r(d, '(^|="|>)Zakres dat\\.\\.\\.(?=($|"|<))', "$1"+"Daty ôd-do...");
  d = r(d, '(^|="|>)Wszystkie wyniki(?=($|"|<))', "$1"+"Wszyjske wyniki");
  d = r(d, '(^|="|>)Według tematyki(?=($|"|<))', "$1"+"Wedle tymatyki");
  d = r(d, '(^|="|>)Dowolny rozmiar(?=($|"|<))', "$1"+"Srogość egal");
  d = r(d, '(^|="|>)Wybierz rozmiar\\.\\.\\.(?=($|"|<))', "$1"+"Ôbier srogość...");
  d = r(d, '(^|="|>)Duże(?=($|"|<))', "$1"+"Sroge");
  d = r(d, '(^|="|>)Średnie(?=($|"|<))', "$1"+"Strzednie");
  d = r(d, '(^|="|>)Ikony(?=($|"|<))', "$1"+"Ikōny");
  d = r(d, '(^|="|>)Większe niż\\.\\.\\.(?=($|"|<))', "$1"+"Srogsze aniżeli...");
  d = r(d, '(^|="|>)Dokładnie\\.\\.\\.(?=($|"|<))', "$1"+"Akuratniy...");
  d = r(d, '(^|="|>)Dowolne kolory(?=($|"|<))', "$1"+"Bele jake farby");
  d = r(d, '(^|="|>)Kolorowe(?=($|"|<))', "$1"+"Bōnte");
  d = r(d, '(^|="|>)Czarno-białe(?=($|"|<))', "$1"+"Czŏrno-biŏłe");
  d = r(d, '(^|="|>)Czerwony(?=($|"|<))', "$1"+"Czerwōny");
  d = r(d, '(^|="|>)Żółty(?=($|"|<))', "$1"+"Żōłty");
  d = r(d, '(^|="|>)Zielony(?=($|"|<))', "$1"+"Zielōny");
  d = r(d, '(^|="|>)Niebieski(?=($|"|<))', "$1"+"Modry");
  d = r(d, '(^|="|>)Fioletowy(?=($|"|<))', "$1"+"Lilowy");
  d = r(d, '(^|="|>)Różowy(?=($|"|<))', "$1"+"Rōżowy");
  d = r(d, '(^|="|>)Biały(?=($|"|<))', "$1"+"Biŏły");
  d = r(d, '(^|="|>)Czarny(?=($|"|<))', "$1"+"Czŏrny");
  d = r(d, '(^|="|>)Brązowy(?=($|"|<))', "$1"+"Brōnŏtny");
  d = r(d, '(^|="|>)Dowolny typ(?=($|"|<))', "$1"+"Bele jaki typ");
  d = r(d, '(^|="|>)Twarz(?=($|"|<))', "$1"+"Gzicht");
  d = r(d, '(^|="|>)Zdjęcie(?=($|"|<))', "$1"+"Bild");
  d = r(d, '(^|="|>)Obiekt clip art(?=($|"|<))', "$1"+"Clip art");
  d = r(d, '(^|="|>)Grafika wektorowa(?=($|"|<))', "$1"+"Wektorowŏ grafika");
  d = r(d, '(^|="|>)Widok standardowy(?=($|"|<))', "$1"+"Standardowy wyglōnd");
  d = r(d, '(^|="|>)Pokaż rozmiary(?=($|"|<))', "$1"+"Pokŏż srogość");
  d = r(d, '(^|="|>)Grafika Google – strona główna(?=($|"|<))', "$1"+"Grafika Google – przodniŏ strōna");
  d = r(d, '(^|="|>)Przełącz na wersję podstawową(?=($|"|<))', "$1"+"Starŏ wersyjŏ szukaniŏ grafik");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pōmoc");
  d = r(d, '(^|="|>)Witryna z tym zdjęciem(?=($|"|<))', "$1"+"Plac z tym bildym");
  d = r(d, '(^|="|>)Pełny rozmiar(?=($|"|<))', "$1"+"Połnŏ srogość");
  d = r(d, '(^|="|>)Wyszukiwanie obrazem(?=($|"|<))', "$1"+"Szukaniy wedle ôbrŏzu");
  d = r(d, '(^|="|>)Obrazy mogą być objęte prawami autorskimi\\.(?=($|"|<))', "$1"+"Tyn ôbrŏz może wymŏgać zwolyniŏ na użyciy.");
  d = r(d, '(^|="|>)Taki sam rozmiar(?=($|"|<))', "$1"+"Takŏ samŏ srogość");

  d = r(d, '(^|="|>)Pokaż trasę(?=($|"|<))', "$1"+"Pokŏż cestã");
  d = r(d, '(^|="|>)Moje miejsca(?=($|"|<))', "$1"+"Place ôdy mie");
  d = r(d, '(^|="|>)Ukryj panel(?=($|"|<))', "$1"+"Skryj panel");
  d = r(d, '(^|="|>)Czy chodziło Ci o\\:', "$1"+"Niy szło Ci ô:");
  d = r(d, '(^|="|>)Szukaj w internecie zapytania ', "$1"+"Szukej w internecie ");
  d = r(d, '(^|="|>)Warunki korzystania z usługi(?=($|"|<))', "$1"+"Warōnki korzystaniŏ z usugi");

  d = r(d, '(^|="|>)Najważniejsze artykuły(?=($|"|<))', "$1"+"Nŏjważniyjsze artikle");
  d = r(d, '(^|="|>)Sport(?=($|"|<))', "$1"+"Szport");
  d = r(d, '(^|="|>)Rozrywka(?=($|"|<))', "$1"+"Szpas");
  d = r(d, '(^|="|>)Wydanie Polska(?=($|"|<))', "$1"+"Wydaniy Ślōnsk");
  d = r(d, '(^|="|>)Nowości(?=($|"|<))', "$1"+"Nowiny");
  d = r(d, '(^|="|>)Nagłówki(?=($|"|<))', "$1"+"Tytuły");
  d = r(d, '(^|="|>)Kompaktowy(?=($|"|<))', "$1"+"Kōmpaktowy");
  d = r(d, '(^|="|>)klasyczna(?=($|"|<))', "$1"+"Klasyczny");
  d = r(d, '(^|="|>)Dodaj dowolny temat wiadomości(?=($|"|<))', "$1"+"Dodej bele jaki tymat nowiny");
  d = r(d, '(^|="|>)Przykłady\\: Astronomia\\, Legia Warszawa\\, Sejm RP(?=($|"|<))', "$1"+"Przikłŏdy: Astronōmijŏ, Szōmbierki Bytōm, Syjmik autonōmicznego wojewōdztwa gōrnoślōnskigo");
  d = r(d, '(^|="|>)Zaawansowane \\»(?=($|"|<))', "$1"+"Rozwiniynte »");
  d = r(d, '(^|="|>)Dostosuj źródła(?=($|"|<))', "$1"+"Dostosuj zdrzōdła");
  d = r(d, '(^|="|>)Dostosuj częstotliwość dowolnego źródła wiadomości(?=($|"|<))', "$1"+"Dopasuj czynstość kŏżdygo zdrzōdła nowin");
  d = r(d, '(^|="|>)Zapisz(?=($|"|<))', "$1"+"Pamiyntej");
  d = r(d, '(^|="|>)Najpopularniejsze(?=($|"|<))', "$1"+"Nŏjpopularniyjsze");
  d = r(d, '(^|="|>)Programy reklamowe(?=($|"|<))', "$1"+"Programy werbōngowe");
  d = r(d, '(^|="|>)Inne wersje Google News(?=($|"|<))', "$1"+"Inksze wersyje Google News");
  d = r(d, '(^|="|>)Google News – informacje(?=($|"|<))', "$1"+"Google News  – informacyje");
  d = r(d, '(^|="|>)Kanały – informacje(?=($|"|<))', "$1"+"Kanały – informacyje");

  d = r(d, '(^|="|>)Z języka\\:(?=($|"|<))', "$1"+"Z gŏdki:");
  d = r(d, '(^|="|>)Na język\\:(?=($|"|<))', "$1"+"Na gŏdkã:");
  d = r(d, '(^|="|>)angielski(?=($|"|<))', "$1"+"ynglickŏ");
  d = r(d, '(^|="|>)polski(?=($|"|<))', "$1"+"polskŏ");
  d = r(d, '(^|="|>)niemiecki(?=($|"|<))', "$1"+"niymiyckŏ");
  d = r(d, '(^|="|>)albański(?=($|"|<))', "$1"+"albańskŏ");
  d = r(d, '(^|="|>)arabski(?=($|"|<))', "$1"+"arabskŏ");
  d = r(d, '(^|="|>)azerski(?=($|"|<))', "$1"+"azerskŏ");
  d = r(d, '(^|="|>)baskijski(?=($|"|<))', "$1"+"baskijskŏ");
  d = r(d, '(^|="|>)bengalski(?=($|"|<))', "$1"+"byngalskŏ");
  d = r(d, '(^|="|>)białoruski(?=($|"|<))', "$1"+"białoruskŏ");
  d = r(d, '(^|="|>)bułgarski(?=($|"|<))', "$1"+"bułgarskŏ");
  d = r(d, '(^|="|>)chiński \\(tradycyjny\\)(?=($|"|<))', "$1"+"chińskŏ (tradycyjnŏ)");
  d = r(d, '(^|="|>)chiński \\(uproszczony\\)(?=($|"|<))', "$1"+"chińskŏ (uproszczōnŏ)");
  d = r(d, '(^|="|>)chorwacki(?=($|"|<))', "$1"+"chorwackŏ");
  d = r(d, '(^|="|>)czeski(?=($|"|<))', "$1"+"czeskŏ");
  d = r(d, '(^|="|>)duński(?=($|"|<))', "$1"+"dōńskŏ");
  d = r(d, '(^|="|>)estoński(?=($|"|<))', "$1"+"estōńskŏ");
  d = r(d, '(^|="|>)filipiński(?=($|"|<))', "$1"+"filipińskŏ");
  d = r(d, '(^|="|>)fiński(?=($|"|<))', "$1"+"fińskŏ");
  d = r(d, '(^|="|>)francuski(?=($|"|<))', "$1"+"francuskŏ");
  d = r(d, '(^|="|>)galicyjski(?=($|"|<))', "$1"+"galicyjskŏ");
  d = r(d, '(^|="|>)grecki(?=($|"|<))', "$1"+"greckŏ");
  d = r(d, '(^|="|>)gruziński(?=($|"|<))', "$1"+"gruzińskŏ");
  d = r(d, '(^|="|>)hebrajski(?=($|"|<))', "$1"+"hebrajskŏ");
  d = r(d, '(^|="|>)hiszpański(?=($|"|<))', "$1"+"hiszpańskŏ");
  d = r(d, '(^|="|>)holenderski(?=($|"|<))', "$1"+"niskoziymskŏ");
  d = r(d, '(^|="|>)indonezyjski(?=($|"|<))', "$1"+"indonyzyjskŏ");
  d = r(d, '(^|="|>)irlandzki(?=($|"|<))', "$1"+"irlandzkŏ");
  d = r(d, '(^|="|>)islandzki(?=($|"|<))', "$1"+"islandzkŏ");
  d = r(d, '(^|="|>)japoński(?=($|"|<))', "$1"+"japōńskŏ");
  d = r(d, '(^|="|>)kataloński(?=($|"|<))', "$1"+"katalōńskŏ");
  d = r(d, '(^|="|>)koreański(?=($|"|<))', "$1"+"koreańskŏ");
  d = r(d, '(^|="|>)kreolski haitański(?=($|"|<))', "$1"+"kryjolskŏ hajitańskŏ");
  d = r(d, '(^|="|>)litewski(?=($|"|<))', "$1"+"litewskŏ");
  d = r(d, '(^|="|>)łacina(?=($|"|<))', "$1"+"łacińskŏ");
  d = r(d, '(^|="|>)łotewski(?=($|"|<))', "$1"+"łotewskŏ");
  d = r(d, '(^|="|>)macedoński(?=($|"|<))', "$1"+"macedōńskŏ");
  d = r(d, '(^|="|>)malajski(?=($|"|<))', "$1"+"malajskŏ");
  d = r(d, '(^|="|>)maltański(?=($|"|<))', "$1"+"maltańskŏ");
  d = r(d, '(^|="|>)norweski(?=($|"|<))', "$1"+"norweskŏ");
  d = r(d, '(^|="|>)ormiański(?=($|"|<))', "$1"+"ormiańskŏ");
  d = r(d, '(^|="|>)perski(?=($|"|<))', "$1"+"perskŏ");
  d = r(d, '(^|="|>)portugalski(?=($|"|<))', "$1"+"portugalskŏ");
  d = r(d, '(^|="|>)rosyjski(?=($|"|<))', "$1"+"ruskŏ");
  d = r(d, '(^|="|>)rumuński(?=($|"|<))', "$1"+"rōmōńskŏ");
  d = r(d, '(^|="|>)serbski(?=($|"|<))', "$1"+"serbskŏ");
  d = r(d, '(^|="|>)słowacki(?=($|"|<))', "$1"+"słowackŏ");
  d = r(d, '(^|="|>)słoweński(?=($|"|<))', "$1"+"słowyńskŏ");
  d = r(d, '(^|="|>)szwedzki(?=($|"|<))', "$1"+"szwedzkŏ");
  d = r(d, '(^|="|>)tajski(?=($|"|<))', "$1"+"tajskŏ");
  d = r(d, '(^|="|>)tamilski(?=($|"|<))', "$1"+"tamilskŏ");
  d = r(d, '(^|="|>)turecki(?=($|"|<))', "$1"+"tureckŏ");
  d = r(d, '(^|="|>)ukraiński(?=($|"|<))', "$1"+"ukraińskŏ");
  d = r(d, '(^|="|>)walijski(?=($|"|<))', "$1"+"walijskŏ");
  d = r(d, '(^|="|>)węgierski(?=($|"|<))', "$1"+"wyngerskŏ");
  d = r(d, '(^|="|>)wietnamski(?=($|"|<))', "$1"+"wiytnamskŏ");
  d = r(d, '(^|="|>)włoski(?=($|"|<))', "$1"+"italskŏ");
  d = r(d, '(^|="|>)Zamiana języków(?=($|"|<))', "$1"+"Ciupaniy gŏdek");
  d = r(d, '(^|="|>)Wpisz tekst lub adres witryny albo ', "$1"+"Wkludź tekst, adresã placu abo ");
  d = r(d, '(^|="|>)przetłumacz dokument\\.(?=($|"|<))', "$1"+"tuplikuj dokumynt.");
  d = r(d, '(^|="|>)Kliknij słowa powyżej\\, by je edytować i zobaczyć inne tłumaczenia\\.(?=($|"|<))', "$1"+"Kliknij słowa wyżyj, coby je edytować i ôbezdrzeć inksze przekłŏdy..");
  d = r(d, '(^|="|>)Zamknij(?=($|"|<))', "$1"+"Zawrzij");
  d = r(d, '(^|="|>)Tłumacz Google dla Firm\\:(?=($|"|<))', "$1"+"Tuplikowaniy Google dlŏ firm:");
  d = r(d, '(^|="|>)Narzędzia dla tłumaczy(?=($|"|<))', "$1"+"Nŏczynia dlŏ tuplikŏrzy");
  d = r(d, '(^|="|>)Tłumacz witryn(?=($|"|<))', "$1"+"Tuplikŏrz placōw");
  d = r(d, '(^|="|>)Narzędzie analizy rynków(?=($|"|<))', "$1"+"Nŏczyniy do analizy rynkōw");
  d = r(d, '(^|="|>)Tłumacz Google – informacje(?=($|"|<))', "$1"+"Tuplikowaniy Google – informacyje");
  d = r(d, '(^|="|>)Na komórkę(?=($|"|<))', "$1"+"Na mobilniŏk");

  d = r(d, '(^|="|>)Google dla Twojego telefonu(?=($|"|<))', "$1"+"Google na mobilniŏk ôd Ciebie");
  d = r(d, '(^|="|>)Inne telefony(?=($|"|<))', "$1"+"Inksze telefōny");
  d = r(d, '(^|="|>)Aplikacje Google dla komórek(?=($|"|<))', "$1"+"Aplikacyje ôd Google dlŏ mobilniŏkōw");
  d = r(d, '(^|="|>)Nawigacja (?=($|"|<))', "$1"+"Nawigacyjŏ ");
  d = r(d, '(^|="|>)Nowość\\!(?=($|"|<))', "$1"+"Nowe!");
  d = r(d, '(^|="|>)Współrzędne(?=($|"|<))', "$1"+"Spōłrzyndne");
  d = r(d, '(^|="|>)Więcej\\.\\.\\.(?=($|"|<))', "$1"+"Wiyncyj...");
  d = r(d, '(^|="|>)Przeszukaj witrynę(?=($|"|<))', "$1"+"Przeszukej plac");

  d = r(d, '(^|="|>)Książki Google – informacje(?=($|"|<))', "$1"+"Ksiōnżki Google – informacyje");
  d = r(d, '(^|="|>)Informacje dla wydawców(?=($|"|<))', "$1"+"Informacyje dlŏ wydawcōw");
  d = r(d, '(^|="|>)Zgłoś problem(?=($|"|<))', "$1"+"Zgłoś niyprzileżytość");
  d = r(d, '(^|="|>)Mapa witryny(?=($|"|<))', "$1"+"Mapa placu");

  d = r(d, '(^|="|>)Dowolna długość(?=($|"|<))', "$1"+"Dugość egal");
  d = r(d, '(^|="|>)Krótki \\(0–4 min\\)(?=($|"|<))', "$1"+"Krōtki (0–4 min)");
  d = r(d, '(^|="|>)Średni \\(4–20 min\\)(?=($|"|<))', "$1"+"Strzedni (4–20 min)");
  d = r(d, '(^|="|>)Długi \\(ponad 20 min\\)(?=($|"|<))', "$1"+"Dugi (ôd 20 min)");
  d = r(d, '(^|="|>)Ostatnia godzina(?=($|"|<))', "$1"+"Ôstatniŏ godzina");
  d = r(d, '(^|="|>)Ostatni miesiąc(?=($|"|<))', "$1"+"Ôstatni miesiōnc");
  d = r(d, '(^|="|>)Dowolna jakość(?=($|"|<))', "$1"+"Jakość egal");
  d = r(d, '(^|="|>)Wysoka jakość(?=($|"|<))', "$1"+"Dobrŏ jakość");
  d = r(d, '(^|="|>)Wszystkie filmy(?=($|"|<))', "$1"+"Wszyjske filmy");
  d = r(d, '(^|="|>)Dowolne źródło(?=($|"|<))', "$1"+"Zdrzōdło egal");
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

obj.open('GET','ajax_call.php?recid='+recid+'&z='+
 new Date().getTime(),true);