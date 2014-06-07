// ==UserScript==
// @name        Google-csb
// @namespace   http://userscripts.org/users/477177
// @description Translates Google to Kashubian 
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

// Last updated:   2012-08-02
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
  d = r(d, '(^|="|>)Szukaj w Google(?=($|"|<))', "$1"+"Nalézë w Googlach");
  d = r(d, '(^|="|>)Szczęśliwy traf(?=($|"|<))', "$1"+"Kawlowé szëkanié");
  d = r(d, '(^|="|>)Polska(?=($|"|<))', "$1"+"Kaszëbë");
  d = r(d, '(^|="|>)Wyszukiwarka(?=($|"|<))', "$1"+"Szëkba");
  d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1"+"Wiadła");
  d = r(d, '(^|="|>)Kalendarz(?=($|"|<))', "$1"+"Kalãdôrz");
  d = r(d, '(^|="|>)Więcej(?=($|"|<))', "$1"+"Wicy");
  d = r(d, '(^|="|>)Tłumacz(?=($|"|<))', "$1"+"Dolmaczë");
  d = r(d, '(^|="|>)Na komórki(?=($|"|<))', "$1"+"Na mòbilkã");
  d = r(d, '(^|="|>)Wyszukiwarka(?=($|"|<))', "$1"+"Szëkba");
  d = r(d, '(^|="|>)Książki(?=($|"|<))', "$1"+"Knédżi");
  d = r(d, '(^|="|>)Czytnik(?=($|"|<))', "$1"+"Czëtnica");
  d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1"+"Òdjimczi");
  d = r(d, '(^|="|>)Aplikacje(?=($|"|<))', "$1"+"Aplikacje");
  d = r(d, '(^|="|>)Jeszcze więcej(?=($|"|<))', "$1"+"Jesz wicy");
  d = r(d, '(^|="|>)Jeszcze więcej ', "$1"+"Jesz wicy ");
  d = r(d, '(^|="|>)Udostępnij(?=($|"|<))', "$1"+"Ùprzëstãpnij");
  d = r(d, '(^|="|>)Ustawienia konta(?=($|"|<))', "$1"+"Ùstôwë profilu");
  d = r(d, '(^|="|>)Wyświetl profil(?=($|"|<))', "$1"+"Wëskrzëni profil");
  d = r(d, '(^|="|>)Dodaj konto(?=($|"|<))', "$1"+"Dodôj profil");
  d = r(d, '(^|="|>)Strona ([0-9,]+) z około ', "$1"+"Starna "+"$2"+" z kòl ");
  d = r(d, '(^|="|>)Udostępnij\\.\\.\\.(?=($|"|<))', "$1"+"Ùprzëstãpnij...");
  d = r(d, '(^|="|>)Około ', "$1"+"Kòl ");
  d = r(d, ' wyników(?=($|"|<))', " nalézonëch parolów");
  d = r(d, '(^|="|>)Poprzednia(?=($|"|<))', "$1"+"Nazôd");
  d = r(d, '(^|="|>)Następna(?=($|"|<))', "$1"+"Dali");
  d = r(d, '(^|="|>)Wszystko o Google(?=($|"|<))', "$1"+"Wszëtkò ò Google");
  d = r(d, '(^|="|>)Reklamuj się w Google(?=($|"|<))', "$1"+"Dôj reklama na Google");
  d = r(d, '(^|="|>)Rozwiązania dla firm(?=($|"|<))', "$1"+"Mòżnotë dlô pòdjimôrzów");
  d = r(d, '(^|="|>)Strona główna', "$1"+"Przédnô starna");
  d = r(d, '(^|="|>)Prześlij opinię(?=($|"|<))', "$1"+"Przeslë swòje zdanié");
  d = r(d, '(^|="|>)Zmień zdjęcie(?=($|"|<))', "$1"+"Zmieni òdjimk");
  d = r(d, '(^|="|>)Zmień lokalizację(?=($|"|<))', "$1"+"Zmieni môl");
  d = r(d, '(^|="|>)Szukaj w internecie(?=($|"|<))', "$1"+"Nalézë w jinternéce");
  d = r(d, '(^|="|>)Kopia(?=($|"|<))', "$1"+"Kòpijô");
  d = r(d, '(^|="|>)Tylko język polski(?=($|"|<))', "$1"+"Leno pòlsczé starnë");
  d = r(d, '(^|="|>)Czy chodziło Ci o\\: (?=($|"|<))', "$1"+"A mòże chòdzëło Cë ò: ");
  d = r(d, '(^|="|>)Przetłumaczone strony(?=($|"|<))', "$1"+"Przedolmaczoné starnë");
  d = r(d, '(^|="|>)Więcej narzędzi(?=($|"|<))', "$1"+"Wicy nôrzãdłów");
  d = r(d, '(^|="|>)Mniej narzędzi(?=($|"|<))', "$1"+"Mni nôrzãdłów");
  d = r(d, '(^|="|>)Według trafności(?=($|"|<))', "$1"+"Pòdług kawla");
  d = r(d, '(^|="|>)Według daty(?=($|"|<))', "$1"+"Pòdług datë");
  d = r(d, '(^|="|>)Witryny z grafikami(?=($|"|<))', "$1"+"Starnë z òbrôzkama");
  d = r(d, '(^|="|>)Odwiedzone strony(?=($|"|<))', "$1"+"Òbëzdrzoné starnë");
  d = r(d, '(^|="|>)Jeszcze nieodwiedzone(?=($|"|<))', "$1"+"Jesz nieòbëzdrzoné");
  d = r(d, '(^|="|>)Zresetuj narzędzia(?=($|"|<))', "$1"+"Òdswiéżë nôrzãdła");
  d = r(d, '(^|="|>)Filtrowanie wyłączone(?=($|"|<))', "$1"+"Filtrowónié wëłączoné");
  d = r(d, '(^|="|>)Filtrowanie ścisłe(?=($|"|<))', "$1"+"Krótczé filtrowanié");
  d = r(d, '(^|="|>)Wyłączony(?=($|"|<))', "$1"+"Wëłączony");
  d = r(d, '(^|="|>)Umiarkowany \\(zalecane\\)(?=($|"|<))', "$1"+"Strzédny (ùprzëstãpniony)");
  d = r(d, '(^|="|>)Ścisły(?=($|"|<))', "$1"+"Krótczi");
  d = r(d, '(^|="|>)Więcej informacji o filtrze SafeSearch(?=($|"|<))', "$1"+"Wicy wiédzë ò filtrze SafeSearch");
  d = r(d, '(^|="|>)Opcje(?=($|"|<))', "$1"+"Òptacëje");
  d = r(d, '(^|="|>)Ustawienia wyszukiwania(?=($|"|<))', "$1"+"Ùstôwë szëkbë");
  d = r(d, '(^|="|>)Szukanie zaawansowane(?=($|"|<))', "$1"+"Mésterskô szëkba");
  d = r(d, '(^|="|>)Historia online(?=($|"|<))', "$1"+"Historjô online");
  d = r(d, '(^|="|>)Pomoc dotycząca wyszukiwania(?=($|"|<))', "$1"+"Pòmòc sparłãczonô z szëkbą");
  d = r(d, '(^|="|>)Hasła pokrewne\\:', "$1"+"Szlachùjącé parole:");
  d = r(d, '(^|="|>)Porada\\:', "$1"+"Dorada:");
  d = r(d, '(^|="|>)Szukaj tylko stron w języku (?=($|"|<))', "$1"+"Nalézë starnë leno w jãzëkù: ");
  d = r(d, '(^|="|>)m(?=($|"|<))', "$1"+".");
  d = r(d, '(^|="|>)Ustawienia(?=($|"|<))', "$1"+"Ùstôwë");
  d = r(d, '\\. Możesz określić swój język wyszukiwania w menu (<a [^>]+>)Ùstôwë</a>', " (nie dzejô dlô kaszëbsczégò jãzëka - jesz nie dzejô ;)). Mòżesz wëbrac jãzëk, pòdług jaczégò mdze prowadzonô szëkba w menu "+"$1"+"Ùstôwë"+"</a>");

  d = r(d, '(^|="|>)Kontroluj wyświetlane obrazy\\, zmieniając ustawienia filtra SafeSearch\\.(?=($|"|<))', "$1"+"Zmieni ùstôwë filtra SafeSearch, cobë kòntrolowac jaczé òdjimczi mają sã pòkazywac.");
  d = r(d, '(^|="|>)Obejrzyj krótki film(?=($|"|<))', "$1"+"Òbôczë krótczi fylm");
  d = r(d, '\\, aby dowiedzieć się więcej\\.(?=($|"|<))', ", cobë doznac sã wicy.");
  d = r(d, '(^|="|>)Kiedykolwiek(?=($|"|<))', "$1"+"Czedë le");
  d = r(d, '(^|="|>) Ostatnia godzina(?=($|"|<))', "$1"+" Slôdnô gòdzna");
  d = r(d, '(^|="|>) Ostatnie 24 godziny(?=($|"|<))', "$1"+" Slôdnëch 24 gòdznów");
  d = r(d, '(^|="|>) Ostatni tydzień(?=($|"|<))', "$1"+" Slôdny tidzéń");
  d = r(d, '(^|="|>) Ostatni miesiąc(?=($|"|<))', "$1"+" Slôdny miesąc");
  d = r(d, '(^|="|>) Ostatni rok(?=($|"|<))', "$1"+" Slôdny rok");
  d = r(d, '(^|="|>)Zakres dat\\.\\.\\.(?=($|"|<))', "$1"+"Ùstawi datë òd-do...");
  d = r(d, '(^|="|>)Wszystkie wyniki(?=($|"|<))', "$1"+"Wszëtczé nalézoné parole");
  d = r(d, '(^|="|>)Według tematyki(?=($|"|<))', "$1"+"Pòdług témów");
  d = r(d, '(^|="|>)Dowolny rozmiar(?=($|"|<))', "$1"+"Równo jakô wiôlgòsc");
  d = r(d, '(^|="|>)Wybierz rozmiar\\.\\.\\.(?=($|"|<))', "$1"+"Wëbiérzë wiôlgòsc...");
  d = r(d, '(^|="|>)Duże(?=($|"|<))', "$1"+"Wiôldzé");
  d = r(d, '(^|="|>)Średnie(?=($|"|<))', "$1"+"Strzédnié");
  d = r(d, '(^|="|>)Ikony(?=($|"|<))', "$1"+"Jikonë");
  d = r(d, '(^|="|>)Większe niż\\.\\.\\.(?=($|"|<))', "$1"+"Wikszé jak...");
  d = r(d, '(^|="|>)Dokładnie\\.\\.\\.(?=($|"|<))', "$1"+"Prawie...");
  d = r(d, '(^|="|>)Dowolne kolory(?=($|"|<))', "$1"+"Równo jaczé farwë");
  d = r(d, '(^|="|>)Kolorowe(?=($|"|<))', "$1"+"Farwné");
  d = r(d, '(^|="|>)Czarno-białe(?=($|"|<))', "$1"+"Czôrno-biôłé");
  d = r(d, '(^|="|>)Czerwony(?=($|"|<))', "$1"+"Czerwòny");
  d = r(d, '(^|="|>)Żółty(?=($|"|<))', "$1"+"Zôłti");
  d = r(d, '(^|="|>)Zielony(?=($|"|<))', "$1"+"Zelony");
  d = r(d, '(^|="|>)Niebieski(?=($|"|<))', "$1"+"Mòdri");
  d = r(d, '(^|="|>)Fioletowy(?=($|"|<))', "$1"+"Cemnomòdri");
  d = r(d, '(^|="|>)Różowy(?=($|"|<))', "$1"+"Różëwi");
  d = r(d, '(^|="|>)Biały(?=($|"|<))', "$1"+"Biôłi");
  d = r(d, '(^|="|>)Czarny(?=($|"|<))', "$1"+"Czôrny");
  d = r(d, '(^|="|>)Brązowy(?=($|"|<))', "$1"+"Bróny");
  d = r(d, '(^|="|>)Dowolny typ(?=($|"|<))', "$1"+"Równo jaczi tip");
  d = r(d, '(^|="|>)Twarz(?=($|"|<))', "$1"+"Lico");
  d = r(d, '(^|="|>)Zdjęcie(?=($|"|<))', "$1"+"Òdjimk");
  d = r(d, '(^|="|>)Obiekt clip art(?=($|"|<))', "$1"+"Òbiékt clip art");
  d = r(d, '(^|="|>)Grafika wektorowa(?=($|"|<))', "$1"+"Wektorowé òbrôzczi");
  d = r(d, '(^|="|>)Widok standardowy(?=($|"|<))', "$1"+"Sztandardowi wëzdrzatk");
  d = r(d, '(^|="|>)Pokaż rozmiary(?=($|"|<))', "$1"+"Pòkôżë wiôlgòsc");
  d = r(d, '(^|="|>)Grafika Google – strona główna(?=($|"|<))', "$1"+"Òbrôzczi Google – przédnô starna");
  d = r(d, '(^|="|>)Przełącz na wersję podstawową(?=($|"|<))', "$1"+"Przełączë na spòdlëczną wersjã");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pòmòc");
  d = r(d, '(^|="|>)Witryna z tym zdjęciem(?=($|"|<))', "$1"+"Starna z nym òdjimkã");
  d = r(d, '(^|="|>)Pełny rozmiar(?=($|"|<))', "$1"+"Fùlnô wiôlgòsc");
  d = r(d, '(^|="|>)Wyszukiwanie obrazem(?=($|"|<))', "$1"+"Szëkba òbrôzkama");
  d = r(d, '(^|="|>)Obrazy mogą być objęte prawami autorskimi\\.(?=($|"|<))', "$1"+"Òbrôzczi mògą miec ùsôdzkòwé prawa.");
  d = r(d, '(^|="|>)Taki sam rozmiar(?=($|"|<))', "$1"+"Takô samô wiôlgòsc");

  d = r(d, '(^|="|>)Pokaż trasę(?=($|"|<))', "$1"+"Pòkôżë stegnã");
  d = r(d, '(^|="|>)Moje miejsca(?=($|"|<))', "$1"+"Mòje môle");
  d = r(d, '(^|="|>)Ukryj panel(?=($|"|<))', "$1"+"Wëwalë panel");
  d = r(d, '(^|="|>)Czy chodziło Ci o\\:', "$1"+"A mòże szło Cë ò:");
  d = r(d, '(^|="|>)Szukaj w internecie zapytania ', "$1"+"Nalézë w jinternéce pëtanié ");
  d = r(d, '(^|="|>)Warunki korzystania z usługi(?=($|"|<))', "$1"+"Régle brëkòwnotë z ùbsłudżi");

  d = r(d, '(^|="|>)Najważniejsze artykuły(?=($|"|<))', "$1"+"Nôwôżniészé artiklë");
  d = r(d, '(^|="|>)Sport(?=($|"|<))', "$1"+"Spòrt");
  d = r(d, '(^|="|>)Rozrywka(?=($|"|<))', "$1"+"Szpòrt");
  d = r(d, '(^|="|>)Wydanie Polska(?=($|"|<))', "$1"+"Wersjô Kaszëbë");
  d = r(d, '(^|="|>)Nowości(?=($|"|<))', "$1"+"Nowinë");
  d = r(d, '(^|="|>)Nagłówki(?=($|"|<))', "$1"+"Titlë");
  d = r(d, '(^|="|>)Kompaktowy(?=($|"|<))', "$1"+"Pòdrãczny");
  d = r(d, '(^|="|>)klasyczna(?=($|"|<))', "$1"+"Klasycznô");
  d = r(d, '(^|="|>)Dodaj dowolny temat wiadomości(?=($|"|<))', "$1"+"Dodôj témã wiadła");
  d = r(d, '(^|="|>)Przykłady\\: Astronomia\\, Legia Warszawa\\, Sejm RP(?=($|"|<))', "$1"+"Przëmiórë: Astronomijô, Arka Gdinia, Kaszëbskô Jednota");
  d = r(d, '(^|="|>)Zaawansowane \\»(?=($|"|<))', "$1"+"Zaawansowóné »");
  d = r(d, '(^|="|>)Dostosuj źródła(?=($|"|<))', "$1"+"Ùłożë zdrzadła");
  d = r(d, '(^|="|>)Dostosuj częstotliwość dowolnego źródła wiadomości(?=($|"|<))', "$1"+"Ùłożë wielnosc równo jaczégò zdrzadła dlô wiadłów");
  d = r(d, '(^|="|>)Zapisz(?=($|"|<))', "$1"+"Spamiãtôj");
  d = r(d, '(^|="|>)Najpopularniejsze(?=($|"|<))', "$1"+"Nôbarżi znóné");
  d = r(d, '(^|="|>)Programy reklamowe(?=($|"|<))', "$1"+"Reklamòwé programë");
  d = r(d, '(^|="|>)Inne wersje Google News(?=($|"|<))', "$1"+"Jinszé wersje Google News");
  d = r(d, '(^|="|>)Google News – informacje(?=($|"|<))', "$1"+"Google News  – wiadła");
  d = r(d, '(^|="|>)Kanały – informacje(?=($|"|<))', "$1"+"Kanałë – wiadła");

  d = r(d, '(^|="|>)Z języka\\:(?=($|"|<))', "$1"+"Z jãzëka:");
  d = r(d, '(^|="|>)Na język\\:(?=($|"|<))', "$1"+"Na jãzëk:");
  d = r(d, '(^|="|>)angielski(?=($|"|<))', "$1"+"anielsczi");
  d = r(d, '(^|="|>)polski(?=($|"|<))', "$1"+"pòlsczi");
  d = r(d, '(^|="|>)niemiecki(?=($|"|<))', "$1"+"miemiecczi");
  d = r(d, '(^|="|>)albański(?=($|"|<))', "$1"+"albańśczi");
  d = r(d, '(^|="|>)arabski(?=($|"|<))', "$1"+"arabsczi");
  d = r(d, '(^|="|>)azerski(?=($|"|<))', "$1"+"azersczi");
  d = r(d, '(^|="|>)baskijski(?=($|"|<))', "$1"+"baskijsczi");
  d = r(d, '(^|="|>)bengalski(?=($|"|<))', "$1"+"bengalsczi");
  d = r(d, '(^|="|>)białoruski(?=($|"|<))', "$1"+"biôłorësczi");
  d = r(d, '(^|="|>)bułgarski(?=($|"|<))', "$1"+"bułgarsczi");
  d = r(d, '(^|="|>)chiński \\(tradycyjny\\)(?=($|"|<))', "$1"+"chińsczi (zwëkòwi)");
  d = r(d, '(^|="|>)chiński \\(uproszczony\\)(?=($|"|<))', "$1"+"chińsczi (ùproszczony)");
  d = r(d, '(^|="|>)chorwacki(?=($|"|<))', "$1"+"chòrwacczi");
  d = r(d, '(^|="|>)czeski(?=($|"|<))', "$1"+"czesczi");
  d = r(d, '(^|="|>)duński(?=($|"|<))', "$1"+"dëńsczi");
  d = r(d, '(^|="|>)estoński(?=($|"|<))', "$1"+"estońsczi");
  d = r(d, '(^|="|>)filipiński(?=($|"|<))', "$1"+"filipińsczi");
  d = r(d, '(^|="|>)fiński(?=($|"|<))', "$1"+"fińsczi");
  d = r(d, '(^|="|>)francuski(?=($|"|<))', "$1"+"francësczi");
  d = r(d, '(^|="|>)galicyjski(?=($|"|<))', "$1"+"galicyjsczi");
  d = r(d, '(^|="|>)grecki(?=($|"|<))', "$1"+"grecczi");
  d = r(d, '(^|="|>)gruziński(?=($|"|<))', "$1"+"grëzińsczi");
  d = r(d, '(^|="|>)hebrajski(?=($|"|<))', "$1"+"hebrejsczi");
  d = r(d, '(^|="|>)hiszpański(?=($|"|<))', "$1"+"spańsczi");
  d = r(d, '(^|="|>)holenderski(?=($|"|<))', "$1"+"holendersczi");
  d = r(d, '(^|="|>)indonezyjski(?=($|"|<))', "$1"+"jindonezyjsczi");
  d = r(d, '(^|="|>)irlandzki(?=($|"|<))', "$1"+"jirlandzczi");
  d = r(d, '(^|="|>)islandzki(?=($|"|<))', "$1"+"jislandzczi");
  d = r(d, '(^|="|>)japoński(?=($|"|<))', "$1"+"japòńsczi");
  d = r(d, '(^|="|>)kataloński(?=($|"|<))', "$1"+"katalońsczi");
  d = r(d, '(^|="|>)koreański(?=($|"|<))', "$1"+"kòreańsczi");
  d = r(d, '(^|="|>)kreolski haitański(?=($|"|<))', "$1"+"kreòlsczi hajitańsczi");
  d = r(d, '(^|="|>)litewski(?=($|"|<))', "$1"+"lëtewsczi");
  d = r(d, '(^|="|>)łacina(?=($|"|<))', "$1"+"łacyńsczi");
  d = r(d, '(^|="|>)łotewski(?=($|"|<))', "$1"+"łotewsczi");
  d = r(d, '(^|="|>)macedoński(?=($|"|<))', "$1"+"macedońsczi");
  d = r(d, '(^|="|>)malajski(?=($|"|<))', "$1"+"malajsczi");
  d = r(d, '(^|="|>)maltański(?=($|"|<))', "$1"+"maltańsczi");
  d = r(d, '(^|="|>)norweski(?=($|"|<))', "$1"+"norwesczi");
  d = r(d, '(^|="|>)ormiański(?=($|"|<))', "$1"+"òrmiańsczi");
  d = r(d, '(^|="|>)perski(?=($|"|<))', "$1"+"persczi");
  d = r(d, '(^|="|>)portugalski(?=($|"|<))', "$1"+"pòrtugalsczi");
  d = r(d, '(^|="|>)rosyjski(?=($|"|<))', "$1"+"rësczi");
  d = r(d, '(^|="|>)rumuński(?=($|"|<))', "$1"+"rumùńsczi");
  d = r(d, '(^|="|>)serbski(?=($|"|<))', "$1"+"serbsczi");
  d = r(d, '(^|="|>)słowacki(?=($|"|<))', "$1"+"słowacczi");
  d = r(d, '(^|="|>)słoweński(?=($|"|<))', "$1"+"słoweńśczi");
  d = r(d, '(^|="|>)szwedzki(?=($|"|<))', "$1"+"szwedzczi");
  d = r(d, '(^|="|>)tajski(?=($|"|<))', "$1"+"tajsczi");
  d = r(d, '(^|="|>)tamilski(?=($|"|<))', "$1"+"tamilsczi");
  d = r(d, '(^|="|>)turecki(?=($|"|<))', "$1"+"turecczi");
  d = r(d, '(^|="|>)ukraiński(?=($|"|<))', "$1"+"ùkrajińsczi");
  d = r(d, '(^|="|>)walijski(?=($|"|<))', "$1"+"walijsczi");
  d = r(d, '(^|="|>)węgierski(?=($|"|<))', "$1"+"wãdzérsczi");
  d = r(d, '(^|="|>)wietnamski(?=($|"|<))', "$1"+"wiétnamsczi");
  d = r(d, '(^|="|>)włoski(?=($|"|<))', "$1"+"jitalsczi");
  d = r(d, '(^|="|>)Zamiana języków(?=($|"|<))', "$1"+"Zmieni jãzëk");
  d = r(d, '(^|="|>)Wpisz tekst lub adres witryny albo ', "$1"+"Wpiszë tekst abò adrésã starnë, abò ");
  d = r(d, '(^|="|>)przetłumacz dokument\\.(?=($|"|<))', "$1"+"przedolmaczë dokùmeńt.");
  d = r(d, '(^|="|>)Kliknij słowa powyżej\\, by je edytować i zobaczyć inne tłumaczenia\\.(?=($|"|<))', "$1"+"Knôpsnij słowa wëżi, cobë je zmienic ë òbôczëc jinszé przëmiarë..");
  d = r(d, '(^|="|>)Zamknij(?=($|"|<))', "$1"+"Zamkni");
  d = r(d, '(^|="|>)Tłumacz Google dla Firm\\:(?=($|"|<))', "$1"+"Dolmaczéra Google dlô pòdjimôrzów:");
  d = r(d, '(^|="|>)Narzędzia dla tłumaczy(?=($|"|<))', "$1"+"Nôrzãdła dlô dolmaczérów");
  d = r(d, '(^|="|>)Tłumacz witryn(?=($|"|<))', "$1"+"Dolmaczéra starnów");
  d = r(d, '(^|="|>)Narzędzie analizy rynków(?=($|"|<))', "$1"+"Nôrzãdło analizë rinków");
  d = r(d, '(^|="|>)Tłumacz Google – informacje(?=($|"|<))', "$1"+"Dolmaczéra Google – wiadła");
  d = r(d, '(^|="|>)Na komórkę(?=($|"|<))', "$1"+"Na mòbilkã");

  d = r(d, '(^|="|>)Google dla Twojego telefonu(?=($|"|<))', "$1"+"Google na Twòją mòbilkã");
  d = r(d, '(^|="|>)Inne telefony(?=($|"|<))', "$1"+"Jinszé mòbilczi");
  d = r(d, '(^|="|>)Aplikacje Google dla komórek(?=($|"|<))', "$1"+"Aplikacje Google dlô mòbilków");
  d = r(d, '(^|="|>)Nawigacja (?=($|"|<))', "$1"+"Nawigacjô ");
  d = r(d, '(^|="|>)Nowość\\!(?=($|"|<))', "$1"+"Nowé!");
  d = r(d, '(^|="|>)Współrzędne(?=($|"|<))', "$1"+"Spółrzãdné");
  d = r(d, '(^|="|>)Więcej\\.\\.\\.(?=($|"|<))', "$1"+"Wicy...");
  d = r(d, '(^|="|>)Przeszukaj witrynę(?=($|"|<))', "$1"+"Przesznëkrôj starnã");

  d = r(d, '(^|="|>)Książki Google – informacje(?=($|"|<))', "$1"+"Knédżi Google – wiadła");
  d = r(d, '(^|="|>)Informacje dla wydawców(?=($|"|<))', "$1"+"Wiadła dlô wëdôwców");
  d = r(d, '(^|="|>)Zgłoś problem(?=($|"|<))', "$1"+"Zgłoszë tôczel");
  d = r(d, '(^|="|>)Mapa witryny(?=($|"|<))', "$1"+"Kôrta starnë");

  d = r(d, '(^|="|>)Dowolna długość(?=($|"|<))', "$1"+"Równo jakô długòsc");
  d = r(d, '(^|="|>)Krótki \\(0–4 min\\)(?=($|"|<))', "$1"+"Krótczi (0–4 minutów)");
  d = r(d, '(^|="|>)Średni \\(4–20 min\\)(?=($|"|<))', "$1"+"Strzédny (4–20 minutów)");
  d = r(d, '(^|="|>)Długi \\(ponad 20 min\\)(?=($|"|<))', "$1"+"Dłëdżi (òd 20 minut)");
  d = r(d, '(^|="|>)Ostatnia godzina(?=($|"|<))', "$1"+"Slôdnô gòdzna");
  d = r(d, '(^|="|>)Ostatni miesiąc(?=($|"|<))', "$1"+"Slôdny miesąc");
  d = r(d, '(^|="|>)Dowolna jakość(?=($|"|<))', "$1"+"Równo jakô jakòsc");
  d = r(d, '(^|="|>)Wysoka jakość(?=($|"|<))', "$1"+"Bëlnô jakòsc");
  d = r(d, '(^|="|>)Wszystkie filmy(?=($|"|<))', "$1"+"Wszëtczé fylmë");
  d = r(d, '(^|="|>)Dowolne źródło(?=($|"|<))', "$1"+"Równo jaczé zdrzadło");
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