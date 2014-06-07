// ==UserScript==
// @name        Google-prg
// @namespace   http://userscripts.org/users/477177
// @description Translates Google to Revived Prussian 
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

// Last updated:   2013-06-24
// Translations:   Pīteris Sasnīns - www.prusaspira.org/polska; via: Grzegorz Kulik - www.poslunsku.eu

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
  d = r(d, '(^|="|>)Szukaj w Google(?=($|"|<))', "$1"+"Laukīs en Google");
  d = r(d, '(^|="|>)Szczęśliwy traf(?=($|"|<))', "$1"+"Deiwūts prēipalis");
  d = r(d, '(^|="|>)Polska(?=($|"|<))', "$1"+"Prūsa");
  d = r(d, '(^|="|>)Wyszukiwarka(?=($|"|<))', "$1"+"Laukisnā");
  d = r(d, '(^|="|>)Wiadomości(?=($|"|<))', "$1"+"Nawwiniskwas");
  d = r(d, '(^|="|>)Kalendarz(?=($|"|<))', "$1"+"Kalēndars");
  d = r(d, '(^|="|>)Więcej(?=($|"|<))', "$1"+"Tūls");
  d = r(d, '(^|="|>)Tłumacz(?=($|"|<))', "$1"+"Tulki");
  d = r(d, '(^|="|>)Na komórki(?=($|"|<))', "$1"+"Per mōbilfōnan");
  d = r(d, '(^|="|>)Wyszukiwarka(?=($|"|<))', "$1"+"Laukisnā");
  d = r(d, '(^|="|>)Książki(?=($|"|<))', "$1"+"Laiskāi");
  d = r(d, '(^|="|>)Czytnik(?=($|"|<))', "$1"+"Skaitātajs");
  d = r(d, '(^|="|>)Zdjęcia(?=($|"|<))', "$1"+"Auīmsenei");
  d = r(d, '(^|="|>)Aplikacje(?=($|"|<))', "$1"+"Aplikaciōnis");
  d = r(d, '(^|="|>)Jeszcze więcej(?=($|"|<))', "$1"+"Dabber tūls");
  d = r(d, '(^|="|>)Jeszcze więcej ', "$1"+"Dabber tūls ");
  d = r(d, '(^|="|>)Udostępnij(?=($|"|<))', "$1"+"Preiēimininais");
  d = r(d, '(^|="|>)Ustawienia konta(?=($|"|<))', "$1"+"Rekkenas ensadīnsnas");
  d = r(d, '(^|="|>)Wyświetl profil(?=($|"|<))', "$1"+"Waidinnais prōfilin");
  d = r(d, '(^|="|>)Dodaj konto(?=($|"|<))', "$1"+"Preidāis rekkenan");
  d = r(d, '(^|="|>)Strona ([0-9,]+) z około ', "$1"+"Pāusan "+"$2"+" iz zūrgi ");
  d = r(d, '(^|="|>)Udostępnij\\.\\.\\.(?=($|"|<))', "$1"+"Preiēimininais...");
  d = r(d, '(^|="|>)Około ', "$1"+"Zūrgi ");
  d = r(d, ' wyników(?=($|"|<))', " ōbjaktai");
  d = r(d, '(^|="|>)Poprzednia(?=($|"|<))', "$1"+"Pirzdauman");
  d = r(d, '(^|="|>)Następna(?=($|"|<))', "$1"+"Ripīnti");
  d = r(d, '(^|="|>)Wszystko o Google(?=($|"|<))', "$1"+"Wissan ezze Google");
  d = r(d, '(^|="|>)Reklamuj się w Google(?=($|"|<))', "$1"+"Reklāmis en Google");
  d = r(d, '(^|="|>)Rozwiązania dla firm(?=($|"|<))', "$1"+"Per fīrmans");
  d = r(d, '(^|="|>)Strona główna', "$1"+"Galwas pāusan");
  d = r(d, '(^|="|>)Prześlij opinię(?=($|"|<))', "$1"+"Tenginnais presnans");
  d = r(d, '(^|="|>)Zmień zdjęcie(?=($|"|<))', "$1"+"Kitawīdinais auīmsenin");
  d = r(d, '(^|="|>)Zmień lokalizację(?=($|"|<))', "$1"+"Kitawīdinais lokalizaciōnin");
  d = r(d, '(^|="|>)Szukaj w internecie(?=($|"|<))', "$1"+"Laukīs en tīnklu");
  d = r(d, '(^|="|>)Kopia(?=($|"|<))', "$1"+"Kōpija");
  d = r(d, '(^|="|>)Tylko język polski(?=($|"|<))', "$1"+"Tēr pōliskan");
  d = r(d, '(^|="|>)Czy chodziło Ci o\\: (?=($|"|<))', "$1"+"Ēit tebbei ezze: ");
  d = r(d, '(^|="|>)Przetłumaczone strony(?=($|"|<))', "$1"+"Pratulkautai pausāi");
  d = r(d, '(^|="|>)Więcej narzędzi(?=($|"|<))', "$1"+"Tūls pagaptin");
  d = r(d, '(^|="|>)Mniej narzędzi(?=($|"|<))', "$1"+"Mazzais pagaptin");
  d = r(d, '(^|="|>)Według trafności(?=($|"|<))', "$1"+"Pa tēmas taūwiskwan");
  d = r(d, '(^|="|>)Według daty(?=($|"|<))', "$1"+"Pa dātan");
  d = r(d, '(^|="|>)Witryny z grafikami(?=($|"|<))', "$1"+"Pausāi sen grāfikins");
  d = r(d, '(^|="|>)Odwiedzone strony(?=($|"|<))', "$1"+"Kāimalukitai pausāi");
  d = r(d, '(^|="|>)Jeszcze nieodwiedzone(?=($|"|<))', "$1"+"Nikāimalukitai");
  d = r(d, '(^|="|>)Zresetuj narzędzia(?=($|"|<))', "$1"+"Naikinnais pagaptins");
  d = r(d, '(^|="|>)Filtrowanie wyłączone(?=($|"|<))', "$1"+"Šlāit filtrīsnan");
  d = r(d, '(^|="|>)Filtrowanie ścisłe(?=($|"|<))', "$1"+"Tikriska filtrisnā");
  d = r(d, '(^|="|>)Wyłączony(?=($|"|<))', "$1"+"Izklaūtan");
  d = r(d, '(^|="|>)Umiarkowany \\(zalecane\\)(?=($|"|<))', "$1"+"Mattawingis (rekōmanditan)");
  d = r(d, '(^|="|>)Ścisły(?=($|"|<))', "$1"+"Tikriskas");
  d = r(d, '(^|="|>)Więcej informacji o filtrze SafeSearch(?=($|"|<))', "$1"+"Tūls infōrmaciōnin ezze fīlterin SafeSearch");
  d = r(d, '(^|="|>)Opcje(?=($|"|<))', "$1"+"Opciōnis");
  d = r(d, '(^|="|>)Ustawienia wyszukiwania(?=($|"|<))', "$1"+"Laukīsnas ensadīnsnas");
  d = r(d, '(^|="|>)Szukanie zaawansowane(?=($|"|<))', "$1"+"Ēmpirsin treppusi laukisnā");
  d = r(d, '(^|="|>)Historia online(?=($|"|<))', "$1"+"Istōrija online");
  d = r(d, '(^|="|>)Pomoc dotycząca wyszukiwania(?=($|"|<))', "$1"+"Laukīsnas pagalba");
  d = r(d, '(^|="|>)Hasła pokrewne\\:', "$1"+"Gintawai wirdāi:");
  d = r(d, '(^|="|>)Porada\\:', "$1"+"Rāda:");
  d = r(d, '(^|="|>)Szukaj tylko stron w języku (?=($|"|<))', "$1"+"Laukīs tēr ēn: ");
  d = r(d, '(^|="|>)m(?=($|"|<))', "$1"+".");
  d = r(d, '(^|="|>)Ustawienia(?=($|"|<))', "$1"+"Ensadīnsnas");
  d = r(d, '\\. Możesz określić swój język wyszukiwania w menu (<a [^>]+>)Ustawienia</a>', "Tū mazzi ensadīntun swajjan billin, en kawīdsei Tū laukijja, en meņū"+"$1"+"Ensadīnsnas"+"</a>");

  d = r(d, '(^|="|>)Kontroluj wyświetlane obrazy\\, zmieniając ustawienia filtra SafeSearch\\.(?=($|"|<))', "$1"+"Kontrōlis tīnkantins bildins, kitawīdinantei SafeSearch fīlteres ensadīnsnans.");
  d = r(d, '(^|="|>)Obejrzyj krótki film(?=($|"|<))', "$1"+"Ebdirēis īnsan filman");
  d = r(d, '\\, aby dowiedzieć się więcej\\.(?=($|"|<))', ", kāi waīdlai tūls.");
  d = r(d, '(^|="|>)Kiedykolwiek(?=($|"|<))', "$1"+"Kadāi tēr");
  d = r(d, '(^|="|>) Ostatnia godzina(?=($|"|<))', "$1"+" Panzdauma stūndi");
  d = r(d, '(^|="|>) Ostatnie 24 godziny(?=($|"|<))', "$1"+" Panzdauma deinānakts");
  d = r(d, '(^|="|>) Ostatni tydzień(?=($|"|<))', "$1"+" Panzdauma sawaīti");
  d = r(d, '(^|="|>) Ostatni miesiąc(?=($|"|<))', "$1"+" Panzdaums mīnss");
  d = r(d, '(^|="|>) Ostatni rok(?=($|"|<))', "$1"+" Panzdauman mettan");
  d = r(d, '(^|="|>)Zakres dat\\.\\.\\.(?=($|"|<))', "$1"+"Dēinas ezze - ērgi...");
  d = r(d, '(^|="|>)Wszystkie wyniki(?=($|"|<))', "$1"+"Wisāi rezultatāi");
  d = r(d, '(^|="|>)Według tematyki(?=($|"|<))', "$1"+"Pa temātikin");
  d = r(d, '(^|="|>)Dowolny rozmiar(?=($|"|<))', "$1"+"Wisāi debāi");
  d = r(d, '(^|="|>)Wybierz rozmiar\\.\\.\\.(?=($|"|<))', "$1"+"Etrīnkais debban...");
  d = r(d, '(^|="|>)Duże(?=($|"|<))', "$1"+"Debīkan");
  d = r(d, '(^|="|>)Średnie(?=($|"|<))', "$1"+"Sirdan");
  d = r(d, '(^|="|>)Ikony(?=($|"|<))', "$1"+"Ikōnis");
  d = r(d, '(^|="|>)Większe niż\\.\\.\\.(?=($|"|<))', "$1"+"Mūisesan nikāi...");
  d = r(d, '(^|="|>)Dokładnie\\.\\.\\.(?=($|"|<))', "$1"+"Akrāts...");
  d = r(d, '(^|="|>)Dowolne kolory(?=($|"|<))', "$1"+"Wissas bārwis");
  d = r(d, '(^|="|>)Kolorowe(?=($|"|<))', "$1"+"Wūpjainan");
  d = r(d, '(^|="|>)Czarno-białe(?=($|"|<))', "$1"+"Kīrsnai-gaīlin");
  d = r(d, '(^|="|>)Czerwony(?=($|"|<))', "$1"+"Wūrmin");
  d = r(d, '(^|="|>)Żółty(?=($|"|<))', "$1"+"Geltaīnan");
  d = r(d, '(^|="|>)Zielony(?=($|"|<))', "$1"+"Zallin");
  d = r(d, '(^|="|>)Niebieski(?=($|"|<))', "$1"+"Galīmban");
  d = r(d, '(^|="|>)Fioletowy(?=($|"|<))', "$1"+"Lilowy");
  d = r(d, '(^|="|>)Różowy(?=($|"|<))', "$1"+"Rōziskan");
  d = r(d, '(^|="|>)Biały(?=($|"|<))', "$1"+"Gaīlin");
  d = r(d, '(^|="|>)Czarny(?=($|"|<))', "$1"+"Kīrsnan");
  d = r(d, '(^|="|>)Brązowy(?=($|"|<))', "$1"+"Brūnan");
  d = r(d, '(^|="|>)Dowolny typ(?=($|"|<))', "$1"+"Wisāi tīpai");
  d = r(d, '(^|="|>)Twarz(?=($|"|<))', "$1"+"Prusna");
  d = r(d, '(^|="|>)Zdjęcie(?=($|"|<))', "$1"+"Bildin");
  d = r(d, '(^|="|>)Obiekt clip art(?=($|"|<))', "$1"+"Clip art");
  d = r(d, '(^|="|>)Grafika wektorowa(?=($|"|<))', "$1"+"Wektōriska grāfiki");
  d = r(d, '(^|="|>)Widok standardowy(?=($|"|<))', "$1"+"Stāndardas wīds");
  d = r(d, '(^|="|>)Pokaż rozmiary(?=($|"|<))', "$1"+"Waidinnais debban");
  d = r(d, '(^|="|>)Grafika Google – strona główna(?=($|"|<))', "$1"+"Google Grāfiki – galwas pāusan");
  d = r(d, '(^|="|>)Przełącz na wersję podstawową(?=($|"|<))', "$1"+"Perklaūjais en bāziskan wersiōnin");
  d = r(d, '(^|="|>)Pomoc(?=($|"|<))', "$1"+"Pagalba");
  d = r(d, '(^|="|>)Witryna z tym zdjęciem(?=($|"|<))', "$1"+"Pāusan sen šin bildin");
  d = r(d, '(^|="|>)Pełny rozmiar(?=($|"|<))', "$1"+"Pilnan debban");
  d = r(d, '(^|="|>)Wyszukiwanie obrazem(?=($|"|<))', "$1"+"Laukisnā sen bildin");
  d = r(d, '(^|="|>)Obrazy mogą być objęte prawami autorskimi\\.(?=($|"|<))', "$1"+"Bildāi mazzi turītun autōras tikrōmiskwan");
  d = r(d, '(^|="|>)Taki sam rozmiar(?=($|"|<))', "$1"+"Stawīdan pat debban");

  d = r(d, '(^|="|>)Pokaż trasę(?=($|"|<))', "$1"+"Waidinnais pintin");
  d = r(d, '(^|="|>)Moje miejsca(?=($|"|<))', "$1"+"Majāi deiktāi");
  d = r(d, '(^|="|>)Ukryj panel(?=($|"|<))', "$1"+"Aukliptinnais panellin");
  d = r(d, '(^|="|>)Czy chodziło Ci o\\:', "$1"+"Ēit Tebbei ezze:");
  d = r(d, '(^|="|>)Szukaj w internecie zapytania ', "$1"+"Laukīs en tīnklu");
  d = r(d, '(^|="|>)Warunki korzystania z usługi(?=($|"|<))', "$1"+"Tērpausnas āudairas");

  d = r(d, '(^|="|>)Najważniejsze artykuły(?=($|"|<))', "$1"+"Ukaswarewīngeišai artīkelai");
  d = r(d, '(^|="|>)Sport(?=($|"|<))', "$1"+"Spōrts");
  d = r(d, '(^|="|>)Rozrywka(?=($|"|<))', "$1"+"Enwesselinsna");
  d = r(d, '(^|="|>)Wydanie Polska(?=($|"|<))', "$1"+"Prūsas Perlazīnsna");
  d = r(d, '(^|="|>)Nowości(?=($|"|<))', "$1"+"Nawwiniskwas");
  d = r(d, '(^|="|>)Nagłówki(?=($|"|<))', "$1"+"Tītelai");
  d = r(d, '(^|="|>)Kompaktowy(?=($|"|<))', "$1"+"Kōmpaktan");
  d = r(d, '(^|="|>)klasyczna(?=($|"|<))', "$1"+"klassiskan");
  d = r(d, '(^|="|>)Dodaj dowolny temat wiadomości(?=($|"|<))', "$1"+"Preidāis ebwīrpan nawwiniskwas tēman");
  d = r(d, '(^|="|>)Przykłady\\: Astronomia\\, Legia Warszawa\\, Sejm RP(?=($|"|<))', "$1"+"Perwaidīnsnas: Astronōmija, Alnāsteini, Prūsa");
  d = r(d, '(^|="|>)Zaawansowane \\»(?=($|"|<))', "$1"+"Ēmpirsin treppušai »");
  d = r(d, '(^|="|>)Dostosuj źródła(?=($|"|<))', "$1"+"Ensadinnais appuns");
  d = r(d, '(^|="|>)Dostosuj częstotliwość dowolnego źródła wiadomości(?=($|"|<))', "$1"+"Ensadinnais ebwīrpas nawwiniskwan appus deznan");
  d = r(d, '(^|="|>)Zapisz(?=($|"|<))', "$1"+"Enminīs");
  d = r(d, '(^|="|>)Najpopularniejsze(?=($|"|<))', "$1"+"Ukapōpularaišai");
  d = r(d, '(^|="|>)Programy reklamowe(?=($|"|<))', "$1"+"Rēklamisnas prōgramai");
  d = r(d, '(^|="|>)Inne wersje Google News(?=($|"|<))', "$1"+"Kitāi Google Nawwiniskwas wersiōnis");
  d = r(d, '(^|="|>)Google News – informacje(?=($|"|<))', "$1"+"Google Nawwiniskwas  – infōrmaciōnis");
  d = r(d, '(^|="|>)Kanały – informacje(?=($|"|<))', "$1"+"Kanālai – infōrmaciōnis");

  d = r(d, '(^|="|>)Z języka\\:(?=($|"|<))', "$1"+"Iz billin:");
  d = r(d, '(^|="|>)Na język\\:(?=($|"|<))', "$1"+"En billin:");
  d = r(d, '(^|="|>)angielski(?=($|"|<))', "$1"+"ēngliskan");
  d = r(d, '(^|="|>)polski(?=($|"|<))', "$1"+"pōliskan");
  d = r(d, '(^|="|>)niemiecki(?=($|"|<))', "$1"+"miksiskan");
  d = r(d, '(^|="|>)albański(?=($|"|<))', "$1"+"albāniskan");
  d = r(d, '(^|="|>)arabski(?=($|"|<))', "$1"+"arābiskan");
  d = r(d, '(^|="|>)azerski(?=($|"|<))', "$1"+"azēriskan");
  d = r(d, '(^|="|>)baskijski(?=($|"|<))', "$1"+"baskiskan");
  d = r(d, '(^|="|>)bengalski(?=($|"|<))', "$1"+"bengāliskan");
  d = r(d, '(^|="|>)białoruski(?=($|"|<))', "$1"+"krēiwiskan");
  d = r(d, '(^|="|>)bułgarski(?=($|"|<))', "$1"+"bulgāriskan");
  d = r(d, '(^|="|>)chiński \\(tradycyjny\\)(?=($|"|<))', "$1"+"kīniskan (tradiciōnalin)");
  d = r(d, '(^|="|>)chiński \\(uproszczony\\)(?=($|"|<))', "$1"+"kīniskan (prastintan)");
  d = r(d, '(^|="|>)chorwacki(?=($|"|<))', "$1"+"kruātiskan");
  d = r(d, '(^|="|>)czeski(?=($|"|<))', "$1"+"čekkiskan");
  d = r(d, '(^|="|>)duński(?=($|"|<))', "$1"+"dāniskan");
  d = r(d, '(^|="|>)estoński(?=($|"|<))', "$1"+"estiskan");
  d = r(d, '(^|="|>)filipiński(?=($|"|<))', "$1"+"filipiniskan");
  d = r(d, '(^|="|>)fiński(?=($|"|<))', "$1"+"sōmiskan");
  d = r(d, '(^|="|>)francuski(?=($|"|<))', "$1"+"prancōziskan");
  d = r(d, '(^|="|>)galicyjski(?=($|"|<))', "$1"+"galicīskan");
  d = r(d, '(^|="|>)grecki(?=($|"|<))', "$1"+"grēkiskan");
  d = r(d, '(^|="|>)gruziński(?=($|"|<))', "$1"+"geōrgiskan");
  d = r(d, '(^|="|>)hebrajski(?=($|"|<))', "$1"+"ebrājiskan");
  d = r(d, '(^|="|>)hiszpański(?=($|"|<))', "$1"+"špāniskan");
  d = r(d, '(^|="|>)holenderski(?=($|"|<))', "$1"+"ullandiskan");
  d = r(d, '(^|="|>)indonezyjski(?=($|"|<))', "$1"+"indōneziskan");
  d = r(d, '(^|="|>)irlandzki(?=($|"|<))', "$1"+"ēiriskan");
  d = r(d, '(^|="|>)islandzki(?=($|"|<))', "$1"+"īslandiskan");
  d = r(d, '(^|="|>)japoński(?=($|"|<))', "$1"+"japāniskan");
  d = r(d, '(^|="|>)kataloński(?=($|"|<))', "$1"+"katalōniskan");
  d = r(d, '(^|="|>)koreański(?=($|"|<))', "$1"+"kōreiskan");
  d = r(d, '(^|="|>)kreolski haitański(?=($|"|<))', "$1"+"haītiskan (kreōliskan)");
  d = r(d, '(^|="|>)litewski(?=($|"|<))', "$1"+"laītawiskan");
  d = r(d, '(^|="|>)łacina(?=($|"|<))', "$1"+"latīniskan");
  d = r(d, '(^|="|>)łotewski(?=($|"|<))', "$1"+"lattawiskan");
  d = r(d, '(^|="|>)macedoński(?=($|"|<))', "$1"+"macedōniskan");
  d = r(d, '(^|="|>)malajski(?=($|"|<))', "$1"+"malaīskan");
  d = r(d, '(^|="|>)maltański(?=($|"|<))', "$1"+"maltiskan");
  d = r(d, '(^|="|>)norweski(?=($|"|<))', "$1"+"nōrwigiskan");
  d = r(d, '(^|="|>)ormiański(?=($|"|<))', "$1"+"armēniskan");
  d = r(d, '(^|="|>)perski(?=($|"|<))', "$1"+"pērsiskan");
  d = r(d, '(^|="|>)portugalski(?=($|"|<))', "$1"+"pōrtugaliskan");
  d = r(d, '(^|="|>)rosyjski(?=($|"|<))', "$1"+"mackāliskan");
  d = r(d, '(^|="|>)rumuński(?=($|"|<))', "$1"+"rumāniskan");
  d = r(d, '(^|="|>)serbski(?=($|"|<))', "$1"+"sērbiskan");
  d = r(d, '(^|="|>)słowacki(?=($|"|<))', "$1"+"slōwakiskan");
  d = r(d, '(^|="|>)słoweński(?=($|"|<))', "$1"+"slōweniskan");
  d = r(d, '(^|="|>)szwedzki(?=($|"|<))', "$1"+"šwēdiskan");
  d = r(d, '(^|="|>)tajski(?=($|"|<))', "$1"+"taīskan");
  d = r(d, '(^|="|>)tamilski(?=($|"|<))', "$1"+"tamils");
  d = r(d, '(^|="|>)turecki(?=($|"|<))', "$1"+"turkiskan");
  d = r(d, '(^|="|>)ukraiński(?=($|"|<))', "$1"+"ukrāiniskan");
  d = r(d, '(^|="|>)walijski(?=($|"|<))', "$1"+"welsiskan");
  d = r(d, '(^|="|>)węgierski(?=($|"|<))', "$1"+"ungriskan");
  d = r(d, '(^|="|>)wietnamski(?=($|"|<))', "$1"+"wietnāmiskan");
  d = r(d, '(^|="|>)włoski(?=($|"|<))', "$1"+"wālkiskan");
  d = r(d, '(^|="|>)Zamiana języków(?=($|"|<))', "$1"+"Billas kitawidinsnā");
  d = r(d, '(^|="|>)Wpisz tekst lub adres witryny albo ', "$1"+"Enpeisāis tekstan, pāusas adressin adder");
  d = r(d, '(^|="|>)przetłumacz dokument\\.(?=($|"|<))', "$1"+"tulkaus dōkumentan");
  d = r(d, '(^|="|>)Kliknij słowa powyżej\\, by je edytować i zobaczyć inne tłumaczenia\\.(?=($|"|<))', "$1"+"Sprākstinais wīrdans ūnzai, kāi redigīlai tennans be widālai kittans tulkausenins...");
  d = r(d, '(^|="|>)Zamknij(?=($|"|<))', "$1"+"Auwerreis");
  d = r(d, '(^|="|>)Tłumacz Google dla Firm\\:(?=($|"|<))', "$1"+"Google Tulki per fīrmans:");
  d = r(d, '(^|="|>)Narzędzia dla tłumaczy(?=($|"|<))', "$1"+"Pagaptis per tulkins");
  d = r(d, '(^|="|>)Tłumacz witryn(?=($|"|<))', "$1"+"Pāusan tulkis");
  d = r(d, '(^|="|>)Narzędzie analizy rynków(?=($|"|<))', "$1"+"Ekonōmijan analizīsnas pagaptis");
  d = r(d, '(^|="|>)Tłumacz Google – informacje(?=($|"|<))', "$1"+"Google tulkis – infōrmaciōnis");
  d = r(d, '(^|="|>)Na komórkę(?=($|"|<))', "$1"+"Per mōbilfōnan");

  d = r(d, '(^|="|>)Google dla Twojego telefonu(?=($|"|<))', "$1"+"Google per Twāise mōbilfōnan");
  d = r(d, '(^|="|>)Inne telefony(?=($|"|<))', "$1"+"Kitāi telafōnai");
  d = r(d, '(^|="|>)Aplikacje Google dla komórek(?=($|"|<))', "$1"+"Googlas aplikaciōnis per mōbilfōnans");
  d = r(d, '(^|="|>)Nawigacja (?=($|"|<))', "$1"+"Nawigaciōni");
  d = r(d, '(^|="|>)Nowość\\!(?=($|"|<))', "$1"+"Nawwinisku!");
  d = r(d, '(^|="|>)Współrzędne(?=($|"|<))', "$1"+"Koōrdinatai");
  d = r(d, '(^|="|>)Więcej\\.\\.\\.(?=($|"|<))', "$1"+"Tūls...");
  d = r(d, '(^|="|>)Przeszukaj witrynę(?=($|"|<))', "$1"+"Pralaukīs pāusan");

  d = r(d, '(^|="|>)Książki Google – informacje(?=($|"|<))', "$1"+"Google Laiskāi – infōrmaciōnis");
  d = r(d, '(^|="|>)Informacje dla wydawców(?=($|"|<))', "$1"+"Infōrmaciōnis per perlazīntajans");
  d = r(d, '(^|="|>)Zgłoś problem(?=($|"|<))', "$1"+"Pagērdaus prōblaman");
  d = r(d, '(^|="|>)Mapa witryny(?=($|"|<))', "$1"+"Pāusas schēman");

  d = r(d, '(^|="|>)Dowolna długość(?=($|"|<))', "$1"+"Ebwīrpan ilgan");
  d = r(d, '(^|="|>)Krótki \\(0–4 min\\)(?=($|"|<))', "$1"+"Īnsan (0–4 min)");
  d = r(d, '(^|="|>)Średni \\(4–20 min\\)(?=($|"|<))', "$1"+"Sirdan (4–20 min)");
  d = r(d, '(^|="|>)Długi \\(ponad 20 min\\)(?=($|"|<))', "$1"+"Ilgan (ezze 20 min)");
  d = r(d, '(^|="|>)Ostatnia godzina(?=($|"|<))', "$1"+"Panzdauma stūndi");
  d = r(d, '(^|="|>)Ostatni miesiąc(?=($|"|<))', "$1"+"Panzdaums mīnss");
  d = r(d, '(^|="|>)Dowolna jakość(?=($|"|<))', "$1"+"Ebwīrpa kawīdisku");
  d = r(d, '(^|="|>)Wysoka jakość(?=($|"|<))', "$1"+"Labā kawīdisku");
  d = r(d, '(^|="|>)Wszystkie filmy(?=($|"|<))', "$1"+"Wisāi filmai");
  d = r(d, '(^|="|>)Dowolne źródło(?=($|"|<))', "$1"+"Ebwīrps aps");
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