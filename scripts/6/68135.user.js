// ==UserScript==
// @name           polskie tlumaczenie eRepublik
// @description    polskie tlumaczenie eRepublik

// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Strona główna",
	"Donate" : "Przekaż",
	"Rank"   : "Ranking",
	"Company" : "Firma", 
	"Profile" : "Profil",
	"Training grounds" : "Szkolenie",
	"Party" : "Partia", 
	"Newspaper" : "Gazeta",
	"Chat rooms" : "Czaty",
	"Army" : "Armia",
	"Country administration" : "Administracja krajowa",
        "Organizations" : "Organizacje",
	"Market place" : "Rynek",
	"Monetary market" : "Rynek walutowy",
	"Job market" : "Rynek pracy",
	"Advertising Department" : "Panel Reklamy",
        "Companies for sale" : "Firmy na sprzedaż",
        "Get gold &amp; extras" : "Gold i Dodatki",
	"Country stats" : "Statystyki kraju",
	"Tutorials" : "Poradniki",
	"World Map" : "Mapa świata",
	"Rankings" : "Ranking",
	"News" : "Informacje",
	"Top rated news" : "Najlepiej oceniane",
	"Latest news" : "Najnowsze wieści",
	"Latest events" : "Najnowsze wydarzenia",
	"Social stats" : "Statystyki socjalne",
	"Economic stats" : "Statystyki ekonomiczne",
	"Political stats" : "Statystyki polityczne",
	"Military stats" : "Statystyki militarne",
	"Tools" : "Narzędzia",
	"Forum" : "Forum",
	"Invite friends" : "Zaproś znajomych",
	"eRepublik Shop" : "Sklep eRepublik ",
	"Career path" : "Ścieżka kariery",
	"Ok, thanks, next tip" : "Dzięki, proszę o następną wskazówkę ",
	"I have nothing more to say at the moment" : "W tej chwili nie mam nic do powiedzenia",
	"Select" : "Wybierz",
	"Marketplace" : "Rynek",
	"Wars" : "Wojny",
	"Back" : "Powrót",
	"Day" : "Dzień ",
	"of the New World" : " Nowego Świata",

// Ranking
	"Name" : "Nazwa",
	"Country" : "Kraj",
	"Experience points" : "Punkty doświadczenia",
	"Citizens" : "Obywatele",
	"Countries" : "Kraje",
	"Companies" : "Firmy",
	"Newspapers" : "Gazety",
	"Parties" : "Partie",
	"Sales" : "Sprzedaż",
	"Sort by" : "Sortuj według",
	"No. of Employees" : "Liczba pracowników",
	"Subscribers" : "Prenumeratorzy",
	"( Average Experience )" : "Średnie doświadczenie",
	"Population number" : "Liczba mieszkańców",
	"Unemployment rate" : "Stopa bezrobocia",
	"Average strenght" : "Średnia siła",
	"GDP" : "PKB",
	"Exports" : "Eksport",
	"Imports" : "Import",
	"No. of companies" : "Liczba firm",
	"No. of newspapers" : "Liczba gazet",
	"No. of chatrooms" : "Nr czatów",
	"No." : "Nr",
	" rooms" : " pokoi",
	"Average military strength" : "Średnia siła militarna",
	"Gross Domestic Product" : "Produkt Krajowy Brutto",
	"Join National Chatroom" : "Dołącz do czatu narodowego",
	"Sales" : "Sprzedaż",
	"All regions" : "Wszystkie regiony",
	"Select industry" : "Wybierz branżę",
	"All industries" : "Wszystkie branże",
	"Defense systems" : "Systemy obronne",
	"Diamonds" : "Diamenty",
	"Food" : "Żywność",
	"Gift" : "Prezenty",
	"Grain" : "Zboże",
	"Hospital" : "Szpital",
	"House" : "Domy",
	"Iron" : "Żelazo",
	"Moving tickets" : "Bilety",
	"Oil" : "Ropa",
	"Weapon" : "Bronie",
	"Wood" : "Drewno",
	"Top Companies" : "Najlepsze firmy",
	"Top Parties" : "Najlepsze partie",
	"Top Countries" : "Najlepsze kraje",
	"Top Citizens" : "Najlepsi Obywatele",
	"Top News" : "Najlepsze gazety",
	"Top Chat Rooms" : "Top czaty",
	"Rankings" : "Rankingi",
	"Chat room" : "Czat",
	"Owner" : "Posiadacz",
	"Description" : "Opis",
	"Favorites" : "Ulubione",

// Homepage
	"Become a citizen" : "Zostań obywatelem",
	"What's happening in eRepublik?" : "Co się dzieje w eRepublik?",
	"Forum discussions" : "Dyskusje na forum",
	"Enter the new world" : "Wejdź do Nowego Świata",
	"Citizen name" : "Imię obywatela",
	"Password" : "Hasło",
	"Top countries in eRepublik" : "Najludniejsze kraje w eRepublik",
	"It's 100% free and" : "Jest to w 100% darmowe",
	"only takes a minute or two" : "i zajmuje tylko 1-2 minuty",
	"Provide the email adress you used for registration in order to reset your password." : "Wpisz adres email, który użyłeś podczas rejestracji, aby zresetować swoje hasło",
	"Remember me" : "Zapamiętaj mnie",
	"Forgot password?" : "Zapomniałeś hasła?",
	"National" : "Krajowe",
	"International" : "Międzynarodowe",
	"Top rated" : "Najw. oceniane",
	"Latest" : "Najnowsze",
	"Official" : "Oficjalne",
	"Everyone" : "Wszyscy",
	"Latest Events" : "Najnowsze wydarzenia",
	"Go to eRepublik" : "Idź do eRepublik",
	"Shouts" : "Wiadomości",
	"Shout something:" : "Wykrzycz coś:",
	"Report shout" : "Raportuj",
	"You\'ve reached adulthood. Remember, no-one is prosperous without effort:" : "Jesteś już dojrzały! Ale pamiętaj, nigdy nie będziesz zamożny bez wysiłku:",
	"more events" : "więcej wydarzeń",
	"more news" : "więcej nowości",
	"Shop" : "Sklep",
	"Press" : "Prasa",
	"Contact" : "Kontakt",
	"Jobs" : "Praca",
	"Terms of Service" : "Zasady korzystania",
	"Privacy" : "Prywatność",
	"Affiliates" : "Filie",
	"eRepublik Laws" : "Prawa eRepublik",

// country page
	"On the Map" : "Na mapie",
	"Total citizens" : "Wszyscy obywatele",
	"New citizens today" : "Nowi obywatele dziś",
	"Citizenship requests" : "Prośby o obywatelstwo",
	"View requests" : "Zobacz prośby",
	"Average citizen level" : "Średni poziom obywatela",
	"This country is not involved in any war." : "Kraj nie jest włączony w żadną wojnę",
	"This country has no allies." : "Kraj nie ma sojuszników",
	"Online now": "Teraz online",
	"Citizens" : "Obywatele",
	"Who" : "Kto",
	"details" : "szczegóły",
	"National Chat Room" : "Czat narodowy",
	"Join" : "Dołącz",
	"National Goals" : "Cele narodowe",
	"Regions" : "Regiony",
	"Society" : "Społeczeństwo",
	"Economy" : "Ekonomia",
	"Politics" : "Polityka",
	"Military" : "Wojsko",
	"Administration" : "Administracja",
	"Citizen fee" : "Zasiłek początkowy",
	"This country can trade with any other country in eRepublik." : "Kraj może handlować ze wszystkimi innymi krajami w eRepublik",
	"Income Tax" : "Podatek dochodowy",
	"Import Tax" : "Podatek importowy",
	
// countries
	"Argentina" : "Argentyna",
	"Australia" : "Australia",
	"Austria" : "Austria",
	"Belgium" : "Belgia",
	"Bosnia and Herzegovina" : "Bośnia i Hercegowina",
	"Brazil" : "Brazylia",
	"Bulgaria" : "Bułgaria",
	"Bolivia" : "Boliwia",
	"China" : "Chiny",
	"Croatia" : "Chorwacja",
	"Canada" : "Kanada",
	"Czech Republic" : "Czechy",
	"Colombia" : "Kolumbia",
	"Denmark" : "Dania",
	"Estonia" : "Estonia",
	"Finland" : "Finlandia",
	"France" : "Francja",
	"Germany" : "Niemcy",
	"Greece" : "Grecja",
	"Hungary" : "Węgry",
	"India" : "Indie",
	"Indonesia" : "Indonezja",
	"Ireland" : "Irlandia",
	"Israel" : "Izrael",
	"Italy" : "Włochy",
	"Iran" : "Iran",
	"Japan" : "Japonia",
	"Latvia" : "Łotwa",
	"Lithuania" : "Litwa",
	"Malaysia" : "Malezja",
	"Mexico" : "Meksyk",
	"Moldavia" : "Mołdawia",
	"Netherlands" : "Holandia",
	"North Korea" : "Korea Północna",
	"Norway" : "Norwegia",
	"Pakistan" : "Pakistan",
	"Paraguay" : "Paragwaj",
	"Philippines" : "Filipiny",
	"Poland" : "Polska",
	"Portugal" : "Portugalia",
	"Romania" : "Rumunia",
	"Serbia" : "Serbia",
	"Singapore" : "Singapur",
	"South Africa" : "RPA",
	"South Korea" : "Korea Południowa",
	"Slovakia" : "Słowacja",
	"Slovenia" : "Słowenia",
	"Switzerland" : "Szwajcaria",
	"Spain" : "Hiszpania",
	"Sweden" : "Szwecja",
	"Russia" : "Rosja",
	"Thailand" : "Tajlandia",
	"United Kingdom" : "Wielka Brytania",
	"Ukraine" : "Ukraina",
	"Uruguay" : "Urugwaj",
	"USA" : "USA",
	"Turkey" : "Turcja",
	"World" : "Świat",
	"Venezuela" : "Wenezuela",

// economy
	"GOLD" : "GOLD",
	"Gold" : "Gold",
	"Treasury" : "Skarbiec",
	"All accounts" : "Wszystkie waluty",
	"Country trading embargoes" : "Embarga handlowe kraju",
	"Taxes" : "Podatki",
	"food" : "żywność",
	"gift" : "prezenty",
	"weapon" : "bronie",
	"moving tickets" : "bilety",
	"grain" : "zboże",
	"diamonds" : "diamenty",
	"iron" : "żelazo",
	"oil"  : "ropa",
	"wood" : "drewno",
	"house" : "domy",
	"hospital" : "szpital",
	"defense system" : "systemy obronne",
	"Salary" : "Pensja",
	"Minimum" : "Minimalna",
	"Average" : "Średnia",
	"Gross domestic product (GDP)" : "Produkt Krajowy Brutto (PKB)",
	"Monthly exports" : "Miesięczny eksport",
	"Monthly imports" : "Miesięczny import",
	"Inflation" : "Inflacja",

// nationalgoles
	"Current national goals" : "Obecne cele narodowe",
	"Monuments achieved" : "Osiągnięcia",
	"The elected president has not set any national goals for this month." : "Obecny prezydent nie określił żadnych celów narodowych na ten miesiąc.",

// forum
	"Topics" : "Tematy",
	"Posts" : "Posty",
	"Last Message" : "Ostatnia wiadomość",
	"Debates concerning economic activities." : "Dyskusje dotyczące działalności gospodarczej.",
	"Sharing opinions concerning social interactions." : "Opinie dotyczące interakcji społecznych.",
	"The place for those who are interested in political activities." : "Miejsce dla tych, którzy są zainteresowani działanością polityczną",
	"Keeping in touch with other citizens regarding the eRepublik warfare." : "Pozostań w kontakcie z innymi obywatelami w zakresie działań zbrojnych w eRepublik",
	"The New World" : "Nowy Świat",
	"Discussions" : "Dyskusje",
	"Help" : "Pomoc",
	"Asking other citizens questions that are not answered by Wiki or FAQ." : "Zadawanie pytań, na które nie ma odpowiedzi w Wiki lub FAQ",
	"The Official Wiki of eRepublik - a tool for everyone." : "Oficjalna Wiki eRepublik - narzędzie dla wszystkich",
	"Contracts" : "Kontrakty",
	"Official agreements between citizens, companies, countries, regions, parties or newspapers." : "Oficjalne umowy pomiędzy obywatelami, firmami, państwami, regionami lub gazetami",
	"Content unrelated to eRepublik (that does not offend other citizens)." : "Zawartość niepowiązana z eRepublik",
	"Rules" : "Zasady",
	"Guidelines for a better New World." : "Wytyczne dla lepszego Nowego Świata",
	"Suggestions" : "Sugestie",
	"Imagination is the only limit for changing the future." : "Wyobraźnia jest jedynym ograniczeniem dla zmian w przyszłości",
	"Updates" : "Aktualizacje",
	"New features, improvements and solved major issues will be announced and debated in this area." : "Nowe funkcje, usprawnienia i rozwiązania poważnych problemów będą ogłaszane i dyskutowane w tym dziale",
	"Open letters" : "Otwarte listy",
	"Public messages for the eRepublik Staff." : "Publiczne wiadomości dla ekipy eRepublik",
	"Contests" : "Konkursy",
	"Announcements" : "Ogłoszenia",
	"Buy or sell companies" : "Kup lub sprzedaj firmę",
	"Minimum requirements: country, domain and quality" : "Minimalne wymagania: kraj, branża oraz jakość",
	"Buy or sell hospitals and defense system" : "Kup lub sprzedaj szpital lub system obronny",
	"Minimum requirements: quality and price" : "Minimalne wymagania : jakość i cena",
	"Shares, investments and partnerships" : "Akcje, inwestycje i partnerstwa",
	"Business ideas and loan notices" : "Pomysły na biznes",
	"Companies looking for workers" : "Firmy poszukujące pracowników",
	"Minimum requirements: country, domain, quality, how many positions and, of course, salary." : "Minimalne wymagania: kraj, branża, jakość, ilość miejsc pracy oraz płaca",
	"Other announcements" : "Inne ogłoszenia",
	"New offers or decisions? Post your ad here." : "Nowe oferty lub decyzje? Umieść tutaj swoją reklamę.",
	
// company
	"Office" : "Biuro",
	"Resign" : "Rezygnuj",
	"Employees" : "Pracownicy",
	"Raw materials" : "Surowce",
	"Show all employees" : "Zobacz wszystkich pracowników",
	"Show all donations" : "Zobacz darowizny",
	"Amount" : "Ilość",
	"Create new company" : "Załóż nową firmę",
	"Create company" : "Stwórz firmę",
	"Your account" : "Twoje konto:",
	"Requirements" : "Wymagania",
	"Cost" : "Koszt",
	"Company details" : "Dane firmy",
	"Company name" : "Nazwa firmy",
	"6-30 characters max" : "od 6 do 30 znaków",
	"Company logo" : "Logo firmy",
	"only" : "tylko rozszerzenie ",
	"You are now an employee of this company" : "Od teraz jesteś pracownikiem tej firmy",
	"pictures allowed" : " obrazków jest dozwolone",
	"Discussion area" : "Miejsce dyskusji",
	"The company cannot trade with this country due to a trade embargo." : "Firma nie może handlować z tym krajem z powodu embarga handlowego",
	"Price" : "Cena",
	"Price with taxes" : "Cena z podatkiem",
	"Buy raw materials" : "Kup surowce",
	"Upgrade quality level" : "Podnieś poziom jakości",
	"Sell products here" : "Sprzedaj tutaj produkty",
	"Donate raw materials" : "Przekaż surowce",
	"Add a job offer" : "Dodaj ofertę pracy",
	"Sell products here" : "Sprzedaj tutaj produkty",
	"Buy market license" : "Kup licencję na rynek",
	"Edit details" : "Edytuj właściwości",
	"Sell company" : "Sprzedaj firmę",
	"Set on sale" : "Na sprzedaż",
	"Selling Price" : "Cena sprzedaży",
	"Jobs available in this company" : "Oferty pracy w tej firmie",
	"The company offers no products in this market" : "Firma nie oferuje żadnego produktu na tym rynku",
	"Go to marketplace" : "Pójdź na rynek",
	"Enter a price between 1 - 5000 Gold" : "Wpisz cenę pomiędzy 1 i 5000 Gold",
	"Products" : "Produkty",
	"Market offers" : "Oferty na rynku",
	"Grain" : "Zboże",
	"Food" : "Żywność",
	"Gift" : "Prezenty",
	"Weapon" : "Bronie",
	"Moving Tickets" : "Bilety",
	"Diamonds" : "Diamenty",
	"Iron" : "Żelazo",
	"Oil"  : "Ropa",
	"Wood" : "Drewno",
	"Finances" : "Finanse",
	"House" : "Dom",
	"Hospital" : "Szpital",
	"Defense System" : "Systemy obronne",
	"You have not worked today." : "Dzisiaj nie pracowałeś",
	"Work" : "Pracuj",
	"Company account" : "Konto firmy",
	"Edit company details" : "Edytuj dane firmy",
	"Buy from market" : "Kup na rynku",
	"Your companies" : "Twoje firmy",
	"Market offers" : "Oferty na rynku",
	"Go to marketplace" : "Idź na rynek",
	"Jobs available in this company" : "Praca dostępna w tej firmie",
	"You do not have any active job offers" : "Nie ma żadnych aktywnych ofert pracy",
	"Today" : "Dzisiaj",
	"Yesterday" : "Wczoraj",
	"Employees details" : "Szczegóły pracowników",
	"Skill" : "Umiejętność",
	"Daily salary" : "Dzienna płaca",
	"Last presence" : "Ostatnia aktywność",
	"Minimum country wage" : "Minimalna krajowa płaca",
	"Company page" : "Strona firmy",
	"Basic productivity" : "Podst. produkcja",
	"Work Bonus" : "Bonus do pracy",
	"Days until" : "Ilość dni do medalu",
	"'Hard Worker' medal" : "\'Rzetelny Pracownik\'",
	"Land skill" : "Rolnictwo",
	"Back to company" : "Powrót do firmy",
	"Total productivity" : "Całkowita produkcja",
	"Some products need more productivity units than others in order to be completed" : "Niektóre produkty potrzebują więcej punktów pracy niż pozostałe aby mogły zostać ukończone",
	"until you receive a \'Hard Worker\' Medal." : "a otrzymasz medal \'Rzetelny Pracownik\'.",
	"You are on your way to become a Super Soldier! Please prove you are not a machine." : "Jesteś na najlepszej drodze aby uzyskać medal \'Super Żołnierz\'! Udowodnij proszę że jesteś człowiekiem.",
	"Good job! You are on the way to a Hardworker Medal. Please prove you are human." : "Jesteś na najlepszej drodze aby uzyskać medal \'Rzetelny Pracownik\'! Udowodnij proszę że jesteś człowiekiem.",
	"Report company" : "Raportuj firmę",
	"Company for sale" : "Firmy na sprzedaż",
	"Report" : "Raportuj",
	"You cannot work today because the company does not have enough money to pay you. We have just sent an alert to the general manager about this issue." : "Nie możesz obecnie pracować, ponieważ firma nie ma wystarczającej ilości pieniędzy aby ci zapłacić. Właśnie wysłaliśmy wiadomość do właściciela firmy o zaistniałej sytuacji.",
	"My places > Company" : "Moje miejsca > Firma",
	"You do not have a job" : "Nie masz pracy",
	"Find a job or own a company. Having a job will allow you to get a salary each day you go to work (don\'t worry, in eRepublik it is much more fun and faster to go to work than in real life)." : "Znajdź pracę lub załóż własną firmę. Mając pracę będziesz zarabiał każdego dnia w którym pójdziesz do pracy (nie martw się, w eRepublik praca jest o wiele szybsza i przyjemniejsza niż w prawdziwym świecie).",
	"Find a job" : "Znajdź pracę",
	"Own a company" : "Stwórz firmę",
	"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees\' salaries so that you don\'t go bankrupt." : "Posiadanie własnej firmy może być głównym źródłem zysków, lecz najpiew musisz się upewnić, czy masz wystarczająco pieniędzy dla pensji swoich przyszłych pracowników.",

// market
	"Quality Level" : "Poziom jakości",
	"All levels" : "Wszystkie poziomy jakości",
	"Level 1" : "jakość 1",
	"Level 2" : "jakość 2",
	"Level 3" : "jakość 3",
	"Level 4" : "jakość 4",
	"Level 5" : "jakość 5",
	"Provider" : "Sprzedawca",
	"Exchange rate" : "Kurs wymiany",
	"Amount to buy" : "Ilość do kupienia",
	"Rec exchange rate" : "Zalecany kurs wymiany",
	"Minimum skill" : "Minimalny poziom umiejętności",
	"Quality" : "Jakość",
	"Stock" : "Magazyn",
	"Buy" : "Kup",
	"Market" : "Rynek",
	"Industry" : "Dziedzina",
	"Market offers" : "Oferty na rynku",
	"Amount" : "Ilość",
	"Price" : "Cena",
	"Next" : "Następn.",
	"Prev" : "Poprz.",
	"No products in this market" : "Na rynku nie ma produktów z wybranej dziedziny",
	"Go to marketplace" : "Idź na rynek",
	"Jobs available in this company" : "Praca dostępna w tej firmie",
	"You don't have any active job offers" : "Nie ma żadnych aktywnych ofert pracy",
	"You didn't specify the amount of products you wish to buy" : "Nie podałeś, jaką ilość produktów chcesz kupić",
	"You cannot trade with this country as you are at war with it" : "Nie możesz handlować z tym krajem, ponieważ jesteś z nim w stanie wojny",
	"There are not enough products on the market." : "Nie ma wystarczającej ilości produktów na rynku.",

// elections
	"Presidential elections" : "Wybory prezydenckie",
	"Congressional elections" : "Wybory parlamentarne",
	"Party elections" : "Wybory partyjne",
	"Supporting parties" : "Popierające partie",
	"No. of votes" : "Liczba głosów",
	"% votes" : "% głosów",
	"Election" : "Wybory",
	"Month/Year" : "Miesiąc/Rok",
	"Goals" : "Cele",
	"no goals selected" : "brak celów",
	"Total votes:" : "Wszystkich głosów: ",
	"Presence:" : "Frekwencja: ",
	"Final Results" : "Ostateczne wyniki",
	"Official candidates&nbsp;" : "Oficjalni kandydaci&nbsp;",
	"Member of" : "Członek",
	"Wildcards&nbsp;" : "Dzikie Karty&nbsp;",
	"Not qualified&nbsp;" : "Niezakwalifikowani&nbsp;",
	"President election day. Vote for your favorite!" : "Dzień wyborów prezydenckich. Głosuj na swojego faworyta!",

// region
        "Country - Society" : "Kraj - Społeczeństwo",
        "Citizens" : " Obywatele",
        "You can get wellness from:" : "Możesz poprawić zdrowie w: ",
        "Heal" : "Ulecz się",
	"Constructions": "Konstrukcje",
	"Population": "Populacja",
	"Productivity" : "Produktywność",
	"Resistance War" : "Powstanie",
	"Resistance War Active" : "Powstanie trwa",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Nie możesz rozpocząć powstania w tym regionie, ponieważ należy już on do oryginalnego właściciela.",
	"Medium" : "Średnia dostępność",
	"High" : "Wysoka dostępność",
	"Cost:" : "Koszt: ",
	"Neighbors" : "Sąsiedzi",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Nie możesz wzniecić powstania w tym regionie ponieważ należy on do prawowitego właściciela tych ziem.",
	"Current location" : "Obecna lokalizacja",
	"New location:" : "Nowa lokalizacja",
	"Please choose a country you want to live in." : "Wybierz kraj w którym chcesz zamieszkać.",
	"Please choose the region you want to live in" : "Wybierz region w którym chcesz zamieszkać.",
	"Do you wish to apply for citizenship in your new country?" : "Czy chcesz złożyć podanie o przyznanie obywatelstwa w nowym kraju?",
	"Apply for citizenship" : "Złóż podanie",
	"No, thanks" : "Nie, dziękuję",

// marketplace
	"Please select an Industry to see the marketplace offers" : "Proszę wybrać branżę, aby zobaczyć oferty na rynku",
	"Skill level" : "Poziom umiejętności",
	"All skills" : "Wszystkie skille",
	"Apply" : "Zastosuj",
	"All" : "Wszystkie",
	"All Skills" : "Wszystkie branże",
	"All industries" : "Wszystkie branże",
	"Monetary Market" : "Rynek walutowy",
	"Company market" : "Firmy na sprzedaż",

// politics
	"Country Administration" : "Administracja Krajowa",
	"Accepted" : "Zaakceptowana",
	"Rejected" : "Odrzucona",
	"Pending" : "Oczekuje",
	"Congress" : "Parlament",
	"New Citizen Message" : "Nowa wiadomość powitalna",
	"Issue Money" : "Drukowanie pieniędzy",
	"Law proposals" : "Zaproponowane ustawy",
	"Minimum Wage" : "Minimalna Płaca",
	"Mutual Protection Pact" : "Pakt wzajemnej obrony",
	"Peace Proposal" : "Propozycja pokoju",
	"Alliance" : "Sojusz",
	"Tax change: Weapon" : "Zmiana podatków na broń",
	"Tax change: Moving Tickets" : "Zmiana podatków na bilety",
	"Tax change: Hospital" : "Zmiana podatków na szpitale",
	"Tax change: Defense system" : "Zmiana podatków na systemy obronne",
	"Tax change: Gifts" : "Zmiana podatków na prezenty",
	"Tax change: Grain" : "Zmiana podatków na zboże",
	"Tax change: Food" : "Zmiana podatków na żywność",
	"Tax change: Iron" : "Zmiana podatków na żelazo",
	"Tax change: Oil" : "Zmiana podatków na ropę",
	"Tax change: Wood" : "Zmiana podatków na drewno",
	"Tax change: House" : "Zmiana podatków na domy",
	"Tax change: Diamonds" : "Zmiana podatków na diamenty",
	"President Impeachment" : "Odwołanie prezydenta",
	"New Citizen Fee" : "Nowa stawka zasiłku",
	"Buy Constructions" : "Zakup konstrukcji",
	"Debate Area" : "Debata",
	"President" : "Prezydent",
	"one month ago" : "miesiąc temu",
	"Declare War" : "Deklaracja wojny",
	"Yes" : "Tak",
	"No" : "Nie",
	"Show all law proposals" : "Zobacz wszystkie zaproponowane ustawy",
	"The law voting process takes 24 hours." : "Proces głosowania trwa 24 godziny.",
	"Only congress members and country presidents have the right to vote." : "Tylko posłowie oraz prezydent mają prawo do głosu.",
	"You are not a president or a congress member in this country." : "Nie jesteś prezydentem ani posłem w tym kraju.",
	"The proposal for a minimum wage change was rejected" : "Propozycja zmiany płacy minimalnej została odrzucona",
	"A new minimum wage was proposed" : "Nowa płaca minimalna została zaproponowana",
	"A new citizen fee was proposed" : "Nowa stawka zasiłku została zaproponowana",
	"The proposal for a new citizen fee was rejected" : "Propozycja nowej stawki zasiłku została odrzucona",
	"The proposal for a new welcoming message for new citizens was rejected." : "Propozycja nowej wiadomości powitalnej dla nowych obywateli została odrzucona.",
	"The president impeachment proposal has been rejected" : "Propozycja odwołania prezydenta została odrzucona",

// wars
	"no allies" : "brak sojuszników",
	"All wars" : "Wszystkie wojny",
	"War types" : "Typy wojen",
	"Conquest wars" : "Podboje",
	"Resistance wars" : "Powstania",
	"War status" : "Status wojny",
	"Active wars" : "Aktywne wojny",
	"Ended wars" : "Zakończone wojny",
	"Countries involved" : "Kraje uczestniczące",
	"All countries" : "Wszystkie kraje",
	"started by" : "rozpoczęte przez ",
	"fights" : " walk",
	"All resistance wars" : "Wszystkie powstania",
	"All Alliances" : "Wszystkie sojusze",
	"Alliances" : "Sojusze",
	"Military force" : "Siła militarna",
	"Average strength" : "Średnia siła",
	"show finished battles" : "zobacz zakończone bitwy",
	"show active battles" : "zobacz aktywne bitwy",
	"Legendary fight, Field Marshal!" : "Legendarna walka, Marszałku Polowy!",
	"Barbaric fight, Field Marshal!" : "Barbarzyńska walka, Marszałku Polowy!",
	"Vicious fight, Field Marshal!" : "Okrutna walka, Marszałku Polowy!",
	"Impressive fight, Field Marshal!" : "Imponująca walka, Marszałku Polowy!",
	"Great fight, Field Marshal!" : "Wspaniała walka, Marszałku Polowy!",
	"Total damage" : "Całkowite obrażenia",

// army
	"You have trained today. You can train again tomorrow." : "Dzisiaj już trenowałeś. Możesz trenować ponownie jutro.",
	"My places > Training grounds" : "Moje miejsca > Szkolenie",
	"You have not trained today" : "Jeszcze dziś nie ćwiczyłeś.",
	"Choose a training program" : "Wybierz program treningu",
	"Your strength:" : "Twoja siła: ",
	"Hi" : "Hej ",
	"! I'm Lana and I'm going to make sure you get stronger every day you train. If you want to have a greater training effect and advance faster, book a strategy session and learn from historic military masters." : "! Jestem Lana i jestem tu, aby upewnić się że każdego dnia treningu będziesz silniejszy. Jeśli chcesz zwiększyć efekt szkolenia i uczynić to szybciej, zajrzyj do książki o strategii i ćwicz razem z wielkimi mistrzami sztuki wojennej.",
	"Standard" : "Tylko standardowy",
	"training only" : "trening",
	"Advanced Training &amp; Strategy" : "Zaawansowany trening i strategia",
	"Training effect" : "Efekt treningu",
	"Strength gained" : "Przyrost siły",
	"Standard Training effect" : "Bonus treningu podstawowego",
	"Experience gain" : "Zdobyte doświadczenie",
	"Wellness loss" : "Stracone zdrowie",
	"Battles you can fight in" : "Bitwy, w których możesz walczyć",
	"Well done," : "Bardzo dobrze, ",
	"Force" : "Siła",
	"Military rank" : "Stopień wojskowy",
	"Military achievements" : "Wyróżnienia wojskowe",
	"Active wars list" : "Lista aktywnych wojen",
	"Private" : "Szeregowy",
	"Sergeant" : "Sierżant",
	"Corporal" : "Kapral",
	"Lieutenant" : "Porucznik",
	"Captain" : "Kapitan",
	"Colonel" : "Pułkownik",
	"General" : "Generał",
	"Fights" : "Liczba Walk",
	"Field Marshal" : "Marszałek Polowy",
	"Show active wars" : "Pokaż trwające wojny",
	"Start a resistance war" : "Rozpocznij powstanie",
	"You cannot join this fight because your country is not involved in the war" : "Nie możesz dołączyć do walki, ponieważ twój kraj nie jest włączony w wojnę",
	"There are no resistance wars in this country." : "Nie ma powstań w tym kraju.",
	"until the region can be occupied or secured" : "dopóki region zostanie okupowany lub obroniony",
	"Attackable on President's decision" : "Możliwy do zaatakowania na wniosek prezydenta",
	"Defense Points" : "Punkty obronne",
	"Go to Battlefield" : "Idź na pole bitwy",
	"see finished battles" : "zobacz zakończone walki",
	"Wars list" : "Lista wojen",
	"War" : "Wojna",
	"Stats" : "Wojna",
	"Battle history" : "Historia bitwy",
	"Fight" : "Walcz!",
	"Hero" : "Bohater",
	"Started by" : "Rozpoczęte przez",

// party
	"You are not a member of a party" : "Nie należysz do żadnej partii",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Do partii możesz dołączyć poprzez stronę z prezentacjami lub możesz utworzyć własną partię jeśli nie znalazłeś zgodnej z Twoimi poglądami. Członkowstwo w partii daje Ci możliwość kandydowania do Kongresu a nawet zostania Prezydentem!",
	"Join a party" : "Dołącz do partii",
	"Create new" : "Załóż nową",
	"Join" : "Dołącz",
	"See all members" : "Zobacz wszystkich członków",
	"Donate Gold" : "Podaruj Gold",
	"Members"  : "Członkowie",
	"Orientation" : "Orientacja",
	"Center-right" : "Centroprawicowa",
	"Center-left" : "Centrolewicowa",
	"Party Presidency" : "Prezydent partii",
	"Show all members" : "Zobacz wszystkich członków",
	"Center" : "Centrowa",
	"Anarchist" : "Anarchistyczna",
	"Accounts" : "Konta",
	"Elections" : "Wybory",
	"Election results" : "Wyniki wyborów",
	"Next elections" : "Następne wybory",
	"Country Presidency" : "Prezydenta Kraju",
	"Party presidency" : "Szef Partii",
	"Party President" : "Szef Partii",
	"See results" : "Zobacz wyniki",
	"Expires tomorrow" : "Wygasa jutro",
	"Show results" : "Zobacz wyniki",
	"Show candidate list" : "Zobacz kandydatów",
	"Candidate" : "Kandydat",
	"Party candidates" : "Partyjni kandydaci",
	"Party page" : "Strona partii",
	"Country presidency" : "Prezydent kraju",
	"Winner" : "Zwycięzca",
	"No candidate proposed" : "Brak zaproponowanego kandydata",
	"Show candidates list" : "Zobacz kandydatów",
	"No candidates applied yet" : "Żaden kandydat nie został jeszcze zatwierdzony",
	"Create party" : "Stwórz partię",
	"Party details" : "Szczegóły partii",
	"Party name" : "Nazwa partii",
	"Economical orientation" : "Orientacja ekonomiczna",
	"Social orientation" : "Orientacja społeczna",
	"Party logo" : "Logo partii",
	"Disscusion area" : "Miejsce dyskusji",
	"Next elections in" : "Następne wybory za ",
	"Next election in " : "Następne wybory za ",
	" candidates " : " kandydat/ów",
	"congress member" : " członek kongresu",
	"of Congress" : " kongresu",
	"Our next candidate" : "Nasza następna kandydatura",
	"One" : "Jeden",
	"Join party" : "Dołącz do partii",
	"Show proposed members" : "Zobacz proponowanych",
	"of congress" : "posłów",
	"Election day" : "Dzień wyborów",
	"Party members" : "Lista członków",
	"Report party" : "Raportuj partię",
	"Vote" : "Głosuj",
	"Keep current regions" : "Utrzymać obecne regiony",
	"Keep current regions:" : "Utrzymać obecne regiony:",

// articles
	"Report abuse" : "Zgłoś nadużycie",
	"today" : "dzisiaj",
	"yesterday" : "wczoraj",
	"one hour ago" : "godzinę temu",
	"Unsubscribe" : "Nie prenumeruj",
	"Subscribe" : "Prenumeruj",
	"Article RSS" : "RSS artykułu",
	"Your comment" : "Twój komentarz",
	"View all comments" : "Zobacz wszystkie komentarze",
	"Subscribe to comments" : "Obserwuj komentarze",
	"Unsubscribe to comments" : "Nie obserwuj komentarzy",
	"Post a comment" : "Zamieść komentarz",

// news
	"You do not have a newspaper" : "Nie masz własnej gazety",
	"Write article" : "Napisz artykuł",
	"Edit" : "Edytuj",
	"Post a comment" : "Umieść komentarz",
	"Edit newspaper details" : "Zmień właściwości gazety",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Gazeta jest skutecznym sposobem na komunikację ze światem eRepublik. Czytaj więcej na Wiki Republik. Załóż własną gazetę.",
	"Newspaper details" : "Szczegóły gazety",
	"Newspaper name" : "Nazwa gazety",
	"Newspaper Avatar" : "Awatar gazety",
	"6-25 characters max" : "od 6 do 25 znaków",
	"only JPG files allowed" : "dozwolone tylko pliki JPG",
	"Create newspaper" : "Załóż gazetę",

// profiles
	"Friends" : "Przyjaciele",
	"Assets" : "Majątek",
	"General manager" : "Prezes firmy",
	"Recruit" : "Rekrut",
	"Soldier" : "Żołnierz",
	"Party founder" : "Założyciel partii",
	"Voter" : "Wyborca",
	"Resistance hero" : "Bohater powstania",
	"Press director" : "Redaktor gazety",
	"Inventory" : "Inwentarz",
	"Your inventory" : "Twój plecak",
	"Donation" : "Przekazanie",
	"Items" : "Przedmioty",
	"Money" : "Pieniądze",
	"Drag and drop items from your inventory to the donation area" : "Chwyć i przeciąg przedmioty z twojego plecaka do części przekazanie",
	"Get Gold" : "Kup Gold",
	"Career" : "Kariera",
	"Employee" : "Pracownik",
	"Unemployed" : "Bezrobotny",
	"No shouts posted by this citizen yet" : "Obywatel nie wysyłał jeszcze żadnych wiadomości",
	"Your friendship request has been sent." : "Twoja prośba o dodanie do przyjaciół została wysłana.",
	"No political activity" : "Brak aktywności",
	"Wellness" : "Zdrowie",
	"Level" : "Poziom",
	"Strength" : "Siła",
	"Send message" : "Wyślij wiadomość",
	"Add as a friend" : "Dodaj jako przyjaciela",
	"Offer a gift" : "Wyślij prezent",
	"Remove friend" : "Usuń z przyjaciół",
	"Experience" : "Doświadczenie",
	"Skills" : "Umiejętności:",
	"eRepublik Birthday" : "Data urodzenia w eRepublik",
	"Land" : "Rolnictwo",
	"Manufacturing" : "Produkcja",
	"Erepublik Age" : "Wiek w eRepublik",
	"Get Extra Storage" : "Kup Extra Storage",
	"Party Member" : "Członek Partii",
	"No activity" : "Brak aktywności",
	"Total damage:" : "Suma obrażeń:",
	"Congress Member" : "Poseł",
	"Country President" : "Prezydent",
	"Win the Presidential elections" : "Wygraj wybory prezydenckie",
	"Media Mogul" : "Media Mogul",
	"Reach 1000 subscribers to your newspaper" : "Zdobądź 1000 osób prenumerujących twoją gazetę",
	"Battle Hero" : "Bohater Bitwy",
	"Reach the highest total damage in one battle" : "Zadaj największe obrażenia podczas jednej bitwy",
	"Resistance Hero" : "Bohater Powstania",
	"Start a resistance war and liberate that region" : "Rozpocznij powstanie i wyzwól region",
	"Super Soldier" : "Super Żołnierz",
	"Advanced 5 strength levels" : "Osiągnął 5 poziom siły",
	"Society Builder" : "Budowniczy Społeczności",
	"Invite 10 people to eRepublik and help them reach level 6" : "Zaproś 10 osób do eRepublik i pomóż im osiągnąć 6 poziom",
	"Check your unlocked features" : "Sprawdż odblokowane funkcje",
	"Achievements" : "Osiągnięcia",
	"edit profile" : "edytuj profil",
	"Hard Worker" : "Rzetelny Pracownik",
	"Worked 30 days in a row" : "Pracował 30 dni pod rząd",
	"Won the Congress elections" : "Wygrał wybory do parlamentu",
	"Edit Profile" : "Edytuj profil",
	"Change residence" : "Zmień miejsce zamieszkania",
	"Donations list" : "Lista darowizn",
	"Your email here" : "Twój email",
	"Work for 30 days in a row" : "Pracuj 30 dni bez przerwy",
	"Win the Congress elections" : "Wygraj wybory do parlamentu",
	"Advance 5 strength levels" : "Osiągnij 5 poziom siły",
	"Reached 1000 subscribers to your newspaper" : "Zdobył 1000 osób prenumerujących gazetę",
	"Your birthday" : "Twoja data urodzin",
	"Citizen Avatar" : "Avatar",
	"Change password" : "Zmień hasło",
	"Email must be valid for registration, so do not cheat" : "Email musi być prawidłowy abyś mógł zakończyć rejestrację, więc nie oszukuj",
	"Change" : "Zmień",
	"Location" : "Miejsce",
	"Citizenship" : "Obywatelstwo",
	"National Rank" : "Ranking narodowy",
	"Forfeit points" : "Punkty karne",
	"All donations" : "Wszystkie przelewy",
	"all donations" : "wszystkie przelewy",
	"show all accounts" : "pokaż wszystkie konta ",
	"show less" : "pokaż mniej",
	"Won the Presidential elections" : "Wygrał wybory prezydenckie",
	"Reached the highest total damage in one battle" : "Osiągnął największą sumę obrażeń podczas jednej bitwy",
	"Invited 10 people to eRepublik and helped them reach level 6" : "Zaprosił 10 osób do eRepublik i pomógł im osiągnąć 6 poziom",

// fight
	"Back to battlefield" : "Wróć na pole bitwy",
	"Fight Again" : "Walcz ponownie",
	"Conquer" : "Podbity",
	"Secure" : "Obroniony",
	"Basic damage" : "Podst. obrażenia",
	"Fight bonus" : "Bonus walki",
	"Weapon quality" : "Jakość broni",
	"Defense system" : "System obronny",
	"You do not have the necessary amount of Gold to start a resistance war." : "Nie masz wystarczającej ilości Gold, aby rozpocząć powstanie",
	"Start a Resistance War" : "Rozpocznij powstanie",
	"Rank" : "Ranga",
 
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Aby zalogować się jako organizacja musisz wylogować się z konta swojego obywatela i zalogować ponownie przy użyciu nazwy swojej organizacji i jej hasła.",
	"My Organizations" : "Moje organizacje",
	"Logout" : "Wyloguj",
	"Organizations created by you:" : "Organizacje utworzone przez ciebie:",
	"If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that we can officially change it to an organization." : "Jeśli Twoje konto obywatela reprezentuje organizację (SO) stworzoną w wersji beta eRepublik, proszę wyślij nam wiadomość używając formularza kontaktowego (kategoria: Inne), abyśmy mogli oficjalnie zmienić je na organizację.",
	"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned." : "Po 15 Grudnia 2008 wszystkie SO nie zmienione w Organizacje zostaną uznane za fałszywe konta i zostaną zbanowane.",
	"Create organization" : "Załóż organizację",
	"Organization details" : "Dane organizacji",
	"Organization name" : "Nazwa organizacji",
	"4-30 characters max" : "Od 4 do 30 znaków",
	"Your email address:" : "Twój adres e-mail:",
	"Minimum number of characters is 6" : "Minimalna ilość znaków to 6",
	"Retype password" : "Powtórz hasło",
	"Organization logo" : "Logo organizacji",
	"Complete the challenge:" : "Wypełnij test:",

// featured-rooms
	"Featured rooms" : "Polecane pokoje",
	"Join another featured room" : "Dołącz do polecanego pokoju",
	"Select room" : "Wybierz czat",
	"No chat rooms" : "Brak czatów",
	"Chat rooms created by you" : "Pokoje stworzone przez ciebie",
	"Be a chat room owner" : "Stwórz czat",
	"Having your own chat room allows you to administrate the discussions, assign moderators and provide an environment where citizens can socialize, interact and discuss upon the interesting topics of the New World." : "Posiadanie własnego pokoju umożliwia Ci zarządzanie dyskusją, moderację i kontrolę nad jakością rozmów.",
	"Create chat room" : "Stwórz czat",
	"My favorite rooms" : "Moje ulubione czaty",
	"You have no favorite chat rooms" : "Nie masz ulubionych czatów",
	"Once you join a room and click the \"add as favorite\" icon, that specific room will be added to the list of favorite chat rooms. This way it will be easier for you to access a specific room you are interested in." : "Jak już dołączysz do pokoju i klikniesz na ikonę \"Dodaj do ulubionych\" pokój zostanie dodany do listy ulubionych. W ten sposób będziesz miał szybki dostęp do wybranych czatów.",
	"Make sure you check the rankings and see what user generated rooms are \"on fire\"." : "Upewnij się, że sprawdziłeś ranking pokoi i kto jest aktualnie \"na topie\"",
	"Check rankings" : "Sprawdź ranking",
	"Chat room details" : "Szczegóły pokoju",
	"Room name" : "Nazwa pokoju",
	"6-30 characters" : "6-30 znaków",
	"255 characters" : "255 znaków",
	"Room type" : "Typ pokoju",
	"My Chat Rooms" : "Moje czaty",

// invite-friends
	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Otrzymasz 5 Gold za każdego zaproszonego przez Ciebie obywatela, który osiągnie 6 poziom.",
	"Your personal invitation link" : "Twój osobisty link zapraszający",
	"Post this link on forums, blogs, messenger status or send it by yourself via email. People that register using your personal link will get you 5 Gold when they reach level 6." : "Publikuj ten link na forach, blogach, w statusach komunikatorów albo rozsyłaj wśród znajomych poprzez e-mail. Za każdego, kto dołączy i osiągnie 6 poziom doświadczenia otrzymasz 5 sztuk złota.",
	"Send via :" : "Wyślij poprzez: ",
	"Invites status" : "Status zaproszeń",
	"View the status of your invites and bonuses" : "Sprawdź status swoich zaproszeń oraz bonusów",
	"Track invites" : "Śledź zaproszenia",
	"Send email invite" : "Wyślij zaproszenie email",
	"You are allowed to create and administrate ONLY one eRepublik citizen." : "Dozwolone jest stworzenie i zarządzanie tylko jednym obywatelem eRepublik.",
	"Breaking this rule you will face the risk of having all your citizen accounts suspended." : "Łamiąc tą zasadę ryzykujesz blokadą wszystkich swoich kont.",
	"Your name:" : "Twoje imię:",
	"Add contacts:" : "Dodaj kontakt:",
	"Add from address book" : "Dodaj z książki adresowej",
	"Invitations left:" : "Pozostałych zaproszeń: ",
	"Emails to be invited:" : "Email do zaproszenia: ",
	"All invites" : "Wszystkie",
	"Status" : "Status",
	"Accepted invites" : "Zaakceptowane",
	"Pending invites" : "Oczekujące",
	"Date sent" : "Data wysłania",
	"Invites" : "Zaproszenia",
	"Email" : "Email",
	"Experience level" : "Poziom doświadczenia",
	"If an invite has not been received, you may want to consider the following:" : "Jeśli zaproszenie nie dotarło, czytaj dalej:",
	"Provide them with your personal invitation link, you can send it by email/messenger or other method" : "Wyślij im link referujący przez email albo komunikator.",
	"Make sure your friend checks their spam folder" : "Poinformuj znajomych o sprawdzeniu folderu spam w skrzynce.",
	"If you’ve sent an invitation to a Yahoo! email address, please note that we are currently experiencing difficulties with Yahoo! email delivery" : "Jeśli wysłałeś zaproszenie na domenę Yahoo!, musisz liczyć się z tym, że nie dojdzie.",
	"Bonus" : "Bonus",
	"Not yet a citizen" : "Nie jest obywatelem",

// career-path
	"General manager" : "Prezes firmy",
	"Hard worker" : "Rzetelny Pracownik",

// messages
        "Compose message" : "Utwórz wiadomość",
        "To" : "Do",
        "Subject" : "Temat",
        "Message" : "Tekst wiadomości",
        "Inbox" : "Skrzynka",
	"Sent" : "Wysłane",
	"Alerts" : "Komunikaty",
	"Subscriptions" : "Prenumeraty",
	"new article" : "nowy artykuł",
	"Delete" : "Usuń",
	"Read Message" : "Czytaj Wiadomość",
	"Reply" : "Odpowiedz",
	"From" : "Od",
	"Select all" : "Zaznacz wszystkie",
	"Newer" : "Nowsze",
	"Older" : "Starsze",
	"No messages found." : "Nie znaleziono wiadomości.",

// flash menu
	"My places > Army" : "Wojsko",
	"My places > Newspaper" : "Gazeta",
	"My places > Organizations" : "Organizacje",

// errors
	"Oops, something went wrong." : "Ups, coś poszło nie tak!",
	"The server is apparently unavailable for the moment. We\'re doing everything we can to correct the problem. Please try again later." : "Serwer jest chwilowo niedostępny. Robimy wszystko co w naszej mocy aby naprawić ten problem. Proszę spróbować za chwilę.",
	"Page not found" : "Strony nie odnaleziono ",
	"The page you are looking for has not been found. However, if you believe that life isn't fair and the page should be at this address, you can" : "Strona którą próbujesz odwiedzić nie została odnaleziona. Jednakże, jeżeli wierzysz że życie nie jest sprawiedliwe a strona powinna być pod tym adresem, możesz",
	"try again" : " spróbować ponownie",
	"whenever you wish." : " kiedy tylko chcesz.",
	"Go to homepage" : "Wróć do strony głównej",
	"Maintenance. We'll be back soon." : "Maintenance. Wkrótce powrócimy.",
	"There are just a few things we have to check from time to time to make your experience in eRepublik more pleasant." : "Jest kilka rzeczy które musimy sprawdzić od czasu do czasu aby wasze przygody z eRepublik były jeszcze przyjemniejsze.",

// menu	
	"Find out more" : "Dowiedz się więcej",
	"logout" : "wyloguj",
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 sojuszników";
regexps["^Active wars in (.*)$"] = "Aktywne wojny w  $1";
regexps["^Active resistance wars in (.*)$"] = "Aktywne powstania w  $1";
regexps["^Chat Rooms owned by (.*)$"] = "Czaty prowadzone przez $1";
regexps["^(.*) has not yet created any chat rooms"] = "$1 nie utworzył jeszcze żadnych czatów";
regexps["^You have worked today. You have (\\d*) more days until you receive a \'Hard Worker\' Medal."] = "Dzisiaj już pracowałeś. Musisz jeszcze pracować $1 dni aby otrzymać medal \'Rzetelny Pracownik\'.";
regexps["^You have not worked today. You have (\\d*) more days"] = "Dzisiaj jeszcze nie pracowałeś. Pracuj jeszcze $1 dni";
regexps["^You worked (\\d*) days in a row.You have (\\d*) more days until you receive a \'Hard Worker\' Medal"] = "Pracowałeś już $1 dni pod rząd. Pracuj jeszcze $2 dni aby otrzymać medal \'Rzetelny Pracownik\'.";
regexps["^You received (.*) wellness from hospital."] = "Otrzymałeś $1 zdrowia ze szpitala.";
regexps["^! Come back tomorow! You need \'(.*)\' Strength points to achieve Super Soldier Medal!"] = "! Przyjdź jutro! Potrzebujesz tylko \'$1\' punktów siły, by zdobyć medal \'Super Żołnierz\'!";
regexps["^(.*)&nbsp;Citizens"] = "$1&nbsp;Obywateli";
regexps["^A resistance has started in (.*)$"] = "Powstanie zostało wzniecone w $1";
regexps["^(.*) was secured by (.*) in the war versus the Resistance Force"] = "$1 zostało zabezpieczone przez $2 w wojnie przeciwko powstańcom";
regexps["^(.*) was secured by (.*) in the war versus (.*)"] = "$1 zostało zabezpieczone przez $2 w wojnie przeciwko $3";
regexps["^(.*) was conquered by (.*) in the war versus (.*)"] = "$1 zostało podbite przez $2 w wojnie przeciwko $3";
regexps["^(.*) attacked (.*), (.*)"] = "$1 zaatakowało $2, $3";
regexps["^. Fight for your ally \((.*)\)!"] = ". Walcz za swojego sojusznika ($1)!";
regexps["^(.*) made a donation to (.*)"] = "$1 zrobiło przelew do $2";
regexps["^A money issuing of (.*) was proposed"] = "Emisja pieniądza $1 została zaproponowana";
regexps["^(.*) issued (.*)"] = "$1 wydrukowało $2";
regexps["^President of (.*) proposed an alliance with (.*)"] = "Prezydent $1 zaproponował sojusz z $2";
regexps["^(.*) signed an alliance with (.*)"] = "$1 podpisało sojusz z $2";
regexps["^(.*) signed a peace treaty with (.*)"] = "$1 podpisało traktat pokojowy z $2";
regexps["^The proposed peace treaty between (.*) and (.*) was rejected"] = "Zaproponowany traktat pokojowy pomiędzy $1 i $2 został odrzucony";
regexps["^(.*) proposed peace in the war against (.*)"] = "$1 zaproponowało pokój w wojnie przeciwko $2";
regexps["^Tax proposal of tax changes for (.*) were rejected"] = "Propozycja podatkowa zmiany podatku na $1 została odrzucona";
regexps["^A congress donation to (.*) was proposed"] = "Przelew do $1 został zaproponowany";
regexps["^New taxes for (.*) were proposed"] = "Zaproponowano nowy podatek na $1";
regexps["^Taxes for (.*) changed"] = "Podatek na $1 zmieniony";
regexps["^(.*) has a new minimum wage"] = "$1 ma teraz nową płacę minimalną";
regexps["^(.*) now has a new citizen fee"] = "$1 ma teraz nową stawkę zasiłku";
regexps["^President of (.*) proposed a new welcome message for new citizens."] = "Prezydent $1 zaproponował nową wiadomość powitalną dla nowych obywateli.";
regexps["^The proposal of issuing (.*) was rejected"] = "Propozycja emisji $1 została odrzucona";
regexps["^The proposal for a congress donation to (.*) was rejected"] = "Propozycja przelewu do $1 została odrzucona";
regexps["^A new hospital was bought in (.*)."] = "Nowy szpital został zbudowany w $1.";
regexps["^A deployment of a new hospital was proposed in (.*)."] = "Zaproponowano dostarczenie nowego szpitala do $1.";
regexps["^A president impeachment against (.*) was proposed"] = "Zaproponowano odwołanie prezydenta $1";
regexps["^The President of (.*), (.*), was impeached"] = "Prezydent $1, $2, został odwołany";
regexps["^(.*) stopped trading with (.*)"] = "$1 zaprzestało handlu z $1";
regexps["^President of (.*) proposed to stop the trade with (.*)"] = "Prezydent $1 zaproponował embargo handlowe z $2";
regexps["^Successfuly transfered (\\d*) item\(s\) to (.*)."] = "Pomyślnie przesłano $1 produkt\(ów\) do $2.";
regexps["^You have succesfully bought (.*) product for (.*)"] = "Pomyślnie zakupiono $1 produkt za $2";
regexps["^You have succesfully bought (.*) products for (.*)."] = "Pomyślnie zakupiono $1 produktów za $2";
regexps["^You have successfuly offered a quality (.*) gift."] = "Pomyślnie podarowano prezent o jakości $1.";
regexps["^This user cannot accept gifts higher than Quality (.*)"] = "Ten obywatel nie może otrzymać prezentu o jakości większej niż $1.";
regexps["^You have bought (.*) for (.*). This offer will be back on market in a minute!"] = "Kupiłeś $1 za $2. Ta oferta pojawi się znów na rynku za chwilę!";
regexps["^You have successfully moved to (.*), (.*)."] = "Pomyślnie przeniosłeś się do $1, $2.";
regexps["(\\s*)Expires in (\\d*) days"] = "Wygasa za $2 dni";
regexps["^(.*) has been secured by (.*)"] = "$1 zostało zabezpieczone przez $2";
regexps["^(\\d*) comments$"] = "$1 komentarzy";
regexps["^(\\d*) hours ago$"] = "$1 godzin temu";
regexps["^(\\d*) minutes ago$"] = "$1 minut temu";
regexps["^(\\d*) days ago$"] = "$1 dni temu";
regexps["^Regions \\((\\d*)\\)"] = "Regiony ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Przyjaciele ($1)";
regexps["^(\\d*) months"] = "$1 miesięcy";
regexps["^Comments(.*)"] = "Komentarze $1";


matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};


var allTrans = {
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};


militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}


translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);