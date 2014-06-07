// ==UserScript==
// @name           Trukz.com Spolszczenie
// @namespace      Trukz
// @description    Trukz Translate For Polish/Tłumaczenie na polski
// @include        http://www.trukz.com/*
// @copyright      Code from serkanay , tłumaczenie na polski VanTHomaS
// @version        0.9.5
// @license        Freeware
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
'Trukz - A Trucking Simulation Game' : 'Trukz Symulacja ciężarówki - Polski',


// Okno logowania

'Please login' : 'Zaloguj się',
'account below or' : 'konto lub',
'a new account' : 'zacznij rejestracje nowego',
'proceed.' : 'gry.',
'You must have cookies enabled' : 'Musisz włączyć cookie',
'use this site. Some' : 'użycia na tej stronie.',
'Some InterZyskfirewWszystkies or' : 'Niektóre firewalle lub ustawienia',
'settings may prevent you from doing certain functions' : 'mogą blokować funkcje',
'Remember me:' : 'Pamiętaj:',
'User ID:' : 'ID użytkowania:',
'Password:' : 'Hasło:',
'Enter the code exactly' : 'Wpisz hasło',
'as you see it:' : 'z obrazka:',


//Pasek boczny

'My Menu' : 'Menu',
'Home' : 'Strona startowa',
'About Trukz' : 'O Trukz',
'Forums' : 'Forum ',
'My Inbox' : 'Poczta',
'Sent Messages' : 'Wyślij wiadomość',
'Logout' : 'Wyloguj',
'Driver Menu' : 'Menu kierowcy',
'Donate (for in-game cash)' : 'Podaruj kasę',
'Purchase Truck' : 'Kup ciężarówkę',
'start a new route' : 'zacząć nową trasę',
'Select A Route' : 'Wybór trasy',
'Route Dashboard' : 'Przegląd trasy',
'My Driver' : 'Mój kierowca',
'Driver Achievements' : 'Osiągnięcia',
'Purchase Items' : 'Tuning',
'CB Radio' : 'CB Radio',
'Edit Mój kierowca' : 'Ustawienia',
'View My Company' : 'Przegląd firmy',
'Company Achievements' : 'Osiągnięcia firmy',
'Company Contracts' : 'Kontrakt',
'My Company Paychecks' : 'Wypłata',
'Banking' : 'Bank',
'Newspaper' : 'Prasa',
'Saved Drivers' : 'Zapamiętani kierowcy',
'View All Drivers' : 'Wszyscy kierowcy',
'View All Companies' : 'Wszystkie firmy',
'Game Statistics' : 'Statystyki',
'Get Trukz Toolbar' : 'Pobierz Toolbar',
'Support' : 'Wsparcie',
'Report a bug' : 'Zgłoś błąd',
'Privacy' : 'Prywatność',
'Terms' : 'Regulamin',
'Beta 1.0' : 'Trukz Beta 1.0, spolszczenie v0.9.5, od VanTHomaS',


// Przegląd trasy - Route Dashboard

'Enter MPH:' : 'Wprowadź prędkość:',
'Route Information' : 'Informacja o trasie',
'Game Time:' : 'Czas w grze:',
'Speed Limit' : 'Ograniczenie prędkości:',
'Top Truck Speed:' : 'Maksymalna prędkość:',
'Top Weather Speed:' : 'Możliwości pogodowe:',
'Truck Condition:' : 'Kondycja:',
'Max Truck Condition:' : 'Maksymalna kondycja:',
'Miles Per Gallon:' : 'Spalanie/mila:',
'Cargo Type:' : 'Rodzaj ładunku:',
'Cargo weight:' : 'Ciężar ładunku:',
'Current Temperature:' : 'Obecna temperatura:',
'Current Weather:' : 'Obecna pogoda:',
'Origin City:' : 'Miasto startowe:',

'Destination:' : 'Cel:',
'Departed Date:' : 'Data wyjazdu:',
'Expected Arrival:' : 'Termin przybycia:',
'You are feeling:' : 'Samopoczucie:',
'Fatigue Points' : 'Czas pracy',
'Fuel Costs:' : 'Cena paliwa:',
'Fuel Level:' : 'Poziom paliwa:',
'Estimated Trip Legs:' : 'Przypuszczalny czas:',
'Route Legs Taken:' : 'Przejechane godziny:',
'Route Distance:' : 'Dystans trasy:',
'Route Odometer:' : 'Przejechane:',
'Miles To Go:' : 'Pozostało:',
'Cash on hand:' : 'Kasa w ręku:',
'Ticket Fines:' : 'Mandat:',
'Collect on time:' : 'Zapłata o czasie:',
'Late penalty:' : 'Kara za spóźnienie:',
'Last Activity:' : 'Ostatnia aktywność:',
'Gallons' : 'galonów',
'Miles' : 'mil',
'Daily' : 'na dobę',
'Hours' : 'godz.',
'Refuel NOW!' : 'Zatankuj teraz!',
'PPG' : '/galon',

'Fine' : 'pogodny',
'Tired' : 'znudzony',
'Fatigued' : 'zmęczony',
'Sleepy' : 'śpiący',
'Rested and ready to go.' : 'Gotowy i wypoczęty.',
'Exhausted!' : 'wykończony!!!',


'Clear with' : 'Przejrzysto z',
'Clear and' : 'Przejrzysto i',
'Significant' : 'ze znacznym',
'Tailwind' : 'wiatrem od tyłu',
'Moderate' : 'umiarkowanym',
'Headwind' : 'przeciwnym wiatrem',
'Sleet' : 'Deszcz ze śniegiem',
'Slight' : 'niewielkim',
'Calm' : 'spokojnie',
//'Heavy ' : 'Ulewny ',
//' Snow' : ' śnieg',
'Thick Fog' : 'Gęsta mgła',
'Freezing' : 'Marznące',
'Light rain' : 'Lekki deszcz',
'Light Fog' : 'Lekkie zamglenie',
'Light Snow' : 'Drobny śnieg',
'Heavy Rain' : 'Ulewny deszcz',
'Heavy Snow' : 'Snieżyca',
//' Rain' : ' deszcz',
'Drizzle' : 'Mżawka',

'Mini CB Radio' : 'Małe CB Radio',
'New Message:' : 'Nowa wiadomość:',
'Currently talking on CB Channel' : 'Jesteś na kanale',
'Obecnie talking on CB Channel' : 'Jesteś na kanale',
'Click the CB Icon to change your CB Channel.' : 'Kliknij na ikone, żeby zmienić kanał.',


//Mój kierowca - My driver

'General Announcements' : 'Ogłoszenia ogólne',
'Your' : 'Twój',
'is exhausted' : 'jest wykończony',
'It is about time' : 'Czas na odpoczynek.',
'do take a break from the game' : 'Zrób sobie przerwe od gry',
'You currently do not own a truck. You must' : 'Nie masz ciężarówki. Kliknij',
'before driving new routes.' : 'zanim ruszysz w drogę.',
'a Truck' : 'trucka',
' in ' : ' w ',

'Driver Display' : 'Kierowca',
'Driver ID:' : 'ID kierowcy:',
'Nick Name:' : 'Przezwisko:',
'Created:' : 'Zarejestrowany:',
'Days Old' : 'dni temu',
'Days of Seniority' : 'dni w firmie',
'Company' : 'Firma',
'Joined' : 'W',
'Member Title:' : 'Stanowisko:',
'Member Wage:' : 'Wynagrodzenie:',
'Rating' : 'Klasyfikacja',
'Driver Rank:' : 'Pozycja kierowcy:',
'Ranked' : 'Pozycja',
'drivers.' : 'na kierowców.',
'Efficiency' : 'Efektywność',
'Current City:' : 'Obecnie w:',
'Money:' : 'Pieniądze:',
'(Pocket)' : '(Portfel)',
'(Total)' : '(Razem)',
'(Bank)' : '(Bank)',
'Driver Odometer:' : 'Przebieg kierowcy:',
'Tons Hauled:' : 'Przewiózł ładunku:',
'Tons' : 'Ton',
'mil Logged ' : 'mil.',
'Gameplay Style' : 'Styl gry',
'Dashboard Graphics' : 'Deska rozdzielcza',
'Driver Items:' : 'Akcesoria:',
'CB Channel:' : 'Kanał CB:',
'Truck Details' : 'Informacje o pojeździe',
'Truck Image:' : 'Wygląd:',
'Date Purchased:' : 'Data zakupu:',
'Year:' : 'Rocznik:',
'Make:' : 'Marka:',
'Model:' : 'Typ:',
'Purchase Cost:' : 'Koszt zakupu:',
'Current Value:' : 'Obecna wartość:',
'Odometer:' : 'Przebieg:',
'Legal Load Limit:' : 'Dopuszczalna ładowność:',
'Truck Load Limit:' : 'Maksymalna ładowność:',
'Current Max Truck Condition' : 'Obecna maksymalna kondycja',
'Overhaul Truck Condition' : 'Kondycja po remoncie',
'Current Truck Condition' : 'Obecna kondycja',
'Top Speed:' : 'Maks. prędkość:',
'mil Per Gallon' : 'Mile na galonie:',
'Fuel Capacity:' : 'Pojemność zbiornika:',
'Obecna Fuel:' : 'Obecny stan:',
'Refuel Option:' : 'Ustawienie tankowania:',
'Refuels' : 'tankowania.',
'Per Gallon' : 'za galon.',
'(Maximum hauling weight before penalties)' : '(Maksymalnie bez ryzyka otrzymania mandatu)',
'(Maximum hauling weight for truck)' : '(Maksymalny uciąg trucka)',
'(best overhaul condition)' : '(Maksymalna kondycja po remoncie generalnym)',
'(for standard repairs)' : '(Kondycja po naprawie zwykłej)',
'Logged' : '      ',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',

'View Routes' : 'Przegląd tras',
'Recent 30 Day Routes' : 'Bilans z ostatnich 30 dni',
'Number of Routes:' : 'Liczba wykonanych tras:',
'30 Day Route Earnings:' : 'Zarobek z 30 dni:',
'Average Route Earnings:' : 'Średni zarobek:',
'Driver 30 Day Route History' : 'Historia z ostatnich 30 dni',
'Dates' : 'data',
'Cities' : 'Miasta',
'Cargo' : 'ładunek',
'COD On Time' : 'Zapłata',
'Completed' : 'Wykonane',
'On Time' : 'o czasie',

'View Tickets' : 'Przegląd mandatów',
'Driver 90 Day Ticket Information' : 'Informacja o mandatach z 90 dni',
'Number of Tickets:' : 'Liczba otrzymanych mandatów:',
'Driver 90 Day Ticket History' : '90 dniowa historia mandatów',
'Date' : 'Data',
'Reason' : 'Powód',
'Driving beyond allowed HOS at a fatigue level of' : 'Jazda powyżej dozwolonego czasu pracy. Godzina',
'Speeding at' : 'Przekroczenie prędkości',
'in a' : 'z',
'zone.' : 'możliwych.',
'' : '',
'Achievements' : 'Osiągnięcia ',
'What are' : 'Jakie posiadasz',
'status' : 'detale',
'mil Driven' : 'Przejechał',
'Road Warrior' : 'Uliczny wojownik',
'Destinations Visited' : 'Zwiedzanie',
'Money Earned' : 'Zarobek',
'Game activity' : 'Aktywność',
'Knows The Locals' : 'Zna teren',
'Legendary' : 'Legenda',
'Everything' : 'Wszystko',
'City name' : 'Miasto',
'Driver Name' : 'Kierowca',
'Continent' : 'Kontynent',
'Search' : 'Szukaj',
'For:' : 'Kto lub co:',
'More' : 'więcej',
'North America' : 'Ameryka',
'Europe' : 'Europa',
'Food and Drink' : 'Artykuły spożywcze',
'Technology' : 'Technologiczne',
'Natural' : 'Surowce naturalne',
'Green' : 'Biodegradalne',
'Construction (' : 'Budowlane (',
'Aid (' : 'Pierwszej pomocy (',


// Tuning - Purchache items

'GPS Navigation' : 'nawigacja GPS',
'Radar Detector' : 'antyradar',
'Tool Box' : 'narzędzia',
'New Air Filter' : 'nowy filtr powietrza',
'New Fuel Filter' : 'nowy filtr paliwa',
'New Fuel Injectors' : 'nowe wtryski',
'Warning Lights' : 'lampy ostrzegawcze',
'Tire Chains' : 'łańcuchy',
'Fog Lights' : 'światła przeciwmgielne',
'New Tires' : 'nowe opony',
'Turbo Charger' : 'turbina',
'Super Charger' : 'kompresor',
'Inter Cooler' : 'intercooler',
'Aluminum Wheels' : 'aluminiowe felgi',
'Extra Fuel Tank' : 'dodatkowy zbiornik',
'Geometry Charger' : 'turbina o zmiennej geometrii',
'Frequent Flyer Discount' : 'upust lotniczy',
'Renew' : 'Odnowienie licencji na',
'Trailer Endorsement' : 'przyczepa',
'Double ' : 'podwójna ',
'Triple' : 'potrójna ',
'Oversized Load Endorsement' : 'ładunki wielogabarytowe',
'Lowboy Endorsement' : 'niskopodwoziowe',
'Expires on' : 'Wygasa',
'Item stays with driver' : 'Część zostaje z kierowcą',
'Enables CB Radio chat in-game' : 'Aktywuje CB',
'overweight Mandats' : '. Mandat',
'Enables maps on the' : 'Włącza widok mapy w',
' for the majority of the' : ', pokazując trasę i',
'May slow down page load on slower computers and connections' : 'Może spowolnić ładowanie strony',
'in the game' : 'w grze',
'cost of repairs' : 'koszty napraw',
'fuel economy' : 'oszczędność paliwa',
'Paliwo economy' : 'oszczędność paliwa',
'Item sells with truck' : 'Sprzedaż razem z truckiem',
'the speed that you can drive in winter weather' : 'prędkość w zimę',
'top speed' : 'prędkość', 
'bad weather' : 'złą pogodę',
'- Reduced' : '- Zmniejsza', 
'- Reduces' : '- Zmniejsza',
'. Reduces' : '. Zmniejsza',
'chances' : 'ryzyko',
'- Increases' : '- Zwiększa',
'. Increases' : '. Zwiększa',
'- Decreases' : '- Zmniejsza',
'of speeding' : 'za prędkość',
'overweight' : 'i przeciążenie',



'expensive.' : 'kosztuje.',
'of bad weather accidents' : 'wypadku w złą pogodę',
'of bad weather accidents -' : 'wypadku w złą pogodę -',


'Improves charger items' : 'Zwiększa moc silnika',
'the weight of your truck thereby' : 'ciężar trucka,',
'increasing your maximum legal haul weight' : 'zwiększa dopuszczalną ładowność',
'over the legal limit.' : 'dodaje do legalnego limitu.',
'your trucks top fuel level' : 'poziom paliwa',
'. Fuel tank sells empty.' : 'Sprzedawany pusty.',
'If item is sold with fuel' : 'Jeśli zbiornik sprzedaż z paliwem',
'tank that fuel will be removed with the fuel tank.' : ', zostanie opróżniony.',
'your trucks load limit' : 'moc silnika',
'(not the legal load limit)' : '(nie zwiększa dopuszczalnej ładowności)',
'the top speed of your truck' : 'maksymalną prędkość',
'Low Gear Ratio' : 'Niskie przełożenie',
'High Gear Ratio' : 'Wysokie przełożenie',
'Provides a' : 'Zmniejsza o',
'discount on airline tickets across' : 'koszty lotnicze przy przekraczaniu',
'Kontynents.' : 'kontynentu.',
'Good until' : 'Ważna do',
'Allows you to drive routes with' : 'Pozwolenie na ciągnięcie',
'trailers thereby' : 'przyczepa',
'increasing your maximum legal haul weight' : ', zwiększa dopuszczalną ładowność',


// Edit my driver -ustawienia

'Manage Twój Driver Profile' : 'Profil kierowcy',
'Change Password:' : 'Zmień hasło',
'Old Password' : 'Stare hasło',
'New Password' : 'Nowe hasło',
'Confirm' : 'Potwierdź',
'Address' : 'adres',
'E-Poczta' : 'E-mail',
'Driver BIO:' : 'Opis kierowcy',
'RePaliwo' : 'Tankowanie',
'Change my' : 'Zmień mój',
'Quick Refuel' : 'Szybkie',
'Specify Amount' : 'Określone',
'RePaliwo Percent' : 'Do ilu tankować',
'Strona startowatown City' : 'miasto domowe',
'You are currently in-route and cannot change your' : 'Jesteś w trasie, nie możesz zmienić',
'You are Obecnie in-route and cannot change your' : 'Jesteś w trasie, nie możesz zmienić',
'Currently in route.' : 'Obecnie w trasie.',
'Obecnie in route.' : 'Obecnie w trasie.',
'Gameplay Style' : 'Styl gry',
'Channel' : 'Kanał',
'Dashboard Display Option:' : 'Opcje deski rozdzielczej:',
'Show Full Deska rozdzielcza' : 'Pokaż pulpit',
'Do Not Show Deska rozdzielcza' : 'Nie pokazuj pulpitu',
'You are currently in-route and cannot change Twój Miasto domowe.' : 'Gdy jesteś w trasie, nie możesz zmienić miasta domowego.',
'You are Obecnie in-route and cannot change Twój Miasto domowe.' : 'Gdy jesteś w trasie, nie możesz zmienić miasta domowego.',
'(Twój Profile Has Been Updatad)' : '(Twój profil został zaaktualizowany)',

'Clock Type:' : 'Typ zegara:',
'Display dynamic clock' : 'Pokaż dynamiczny',
'Display static clock' : 'Pokaż statyczny',


// My Company - Firma

'Main Display' : 'Widok główny',
'Applicants' : 'Kadry',
'Terminals' : 'Terminale',
'Ledger' : 'Księgowość',
'Bulletin' : 'Biuletyn',
'Items' : 'Dodatki',
'Edit' : 'Ustawienia',
'Firma Details' : 'Inforamacje o firmie',
'Full Member Views' : 'Widok zatrudnionych',
'Firma Name:' : 'Nazwa firmy:',
'Firma CEO:' : 'Właściciel:',
'Firma Bio:' : 'Opis:',
'Preferred ładunek:' : 'Ulubiony ładunek:',
'Collection Percentage:' : 'Pobory:',
'Repair Assistance:' : 'Upust na naprawy:',
'Fuel Assistance:' : 'Upust na paliwo:',
'Ticket Assistance:' : 'Zwrot za mandat:',
'Members:' : 'Pracownicy:',
'Contracts Wykonane:' : 'Wykonane kontrakty:',
'Firma Dodatki' : 'Firmowe dodatki',
'Total,' : 'wszyscy,',
'Active' : ' aktywni',
'Total Tons' : 'T.',
'Senior Firma Members' : 'Kadra kierownicza',
'Activity' : 'Aktywny',
'Title' : 'Stanowisko',
'Collect' : 'Pobory',
'Repair' : 'Naprawa',
'Fuel' : 'Paliwo',
'Ticket' : 'Mandat',
'Wage' : 'Zarobek',
'Member Position' : 'Stanowisko',
'Current City' : 'Obecne miasto',
'CEO' : 'Właściciel',
'Vice President' : 'Z-ca prezesa',
'Contract Manager' : 'Dyspozytor',
'Communications Manager' : 'Rzecznik prasowy',
'HR Manager' : 'Kadrowy',
'Finance Manager' : 'Księgowy',
'Driver' : 'kierowca',
'None' : '-',
'Specify Other' : 'Inny',
'Total Ton' : 'Wszystkich ton',
'Money' : 'Kasa',
'Member View' : 'Lista',
'Zarobeks View' : 'Finansowy',
'Dispatch View' : 'Miejsce pobytu',
'Serving' : '',
'Miejsce pobytu For' : 'Miejsce pobytu pracowników',
'Kierowcas' : 'kierowców',
'Fatigue' : 'Zmęczenie',
'Destination' : 'Cel',
'stands for mil. To Go.' : 'Mile do celu.',
'There are currently no pending applications for' : 'Nie ma teraz chętnych do',
'There are Obecnie no pending applications for' : 'Nie ma teraz chętnych do',
'City' : 'Miasto',
'State' : 'Stan',
'Country' : 'Kraj',
// 'Purchased' : 'Stworzony',
'Sell' : 'Sprzedaj',
'Paliwo Purchase Discount,' : 'Zniżka na paliwo,',
'Naprawa Fees Discount,' : 'Zniżka na naprawy,',
'Item Purchase Discount,' : 'Zniżka na części,',

'Firma Księgowość Summary' : 'Księgowość',
'All Rekord' : 'Wszystkie',
'Member Ledgers' : 'Tylko pracownicy',
'Wage Payouts' : 'Wypłaty',
'Income' : 'Przychód',
'Expenses' : 'Wydatki',
'Net ' : 'Zysk',
'Day: ' : 'Dni:',
'14 Day Firma Księgowość' : '14 ostatnich dni',
'Amount' : 'Kwota',
'Displaying' : 'Wyświetlone',
'Księgowość Records' : 'wpisów',
'Assistance' : 'upust',
'End Route Poboryion' : 'Pobór za dowóz towaru',
'There are no Firma Biuletyns for' : 'Nie ma żadnych wiadomości w',
'Firma Biuletyn Records' : 'wpisów',
'Create New Firma Biuletyn' : 'Stwórz nowy biuletyn',
'Create A' : 'Tworzenie wiadomości',
'Message Stanowisko' : 'Tytuł:',
'Message To Team:' : 'Tekst wiadomości:',

'Truck Purchase Discount' : 'Zniżka na zakup',
'Paliwo Discounts' : 'Zniżka na paliwo',
'Naprawa Discounts' : 'Zniżka naprawcza',
'Item Purchase Discounts' : 'Zniżka na części',
'purchases for all Firma members.' : 'dla wszystkich pracowników.',
'Firma wide discount on Paliwo purchases for all Firma members.' : '',
'Firma wide discount on truck' : 'koszt zakupu trucka',
'Firma wide discount on Paliwo' : 'koszty paliwa',
'Firma wide discount on Naprawa fees for all Firma members.' : 'koszty napraw dla wszystkich pracowników',
'Firma wide discount for all Kierowca item' : 'koszt zakupu dodatków',
'Firma Cash Available:' : 'Kasa firmy',
'One change every 2 days.' : 'Zmiana możliwa co drugi dzień.',
'Headquarters Miasto:' : 'Baza firmy:',
'One change every 14 days.' : 'Zmiana co 14 dni.',
'Member Upust na naprawy:' : 'Upust naprawczy:',
'Member Upust na paliwo:' : 'Zniżka paliwowa:',
'Member Zwrot za mandat:' : 'Zwrot z mandatu:',
'Właściciel Firma Zarobek:' : 'Wypłata właściciela:',
'on member applications' : 'z wnioskiem od pracowników',
'gets PM' : 'dostaje PM',
'Avatar:' : 'Godło:',
'Change Avatar' : 'Zmień',
'Delete Avatar' : 'Skasuj',
'Forum URL:' : 'Adres Forum:',
'Enter offsite forum URL here' : 'Wprowadź adres swojego forum tutaj',


// Kontrakty

'Open Contracts Up For Bid' : 'Otwarte licytacje kontraktów',
'Open' : 'Otwarte',
'Saved' : 'Zapisane',
'All' : 'Wszystkie',
' to ' : ' do ',

'aktywni Members' : 'aktywni kierowcy',
'ton Required' : 'Wymagana ilość ton',
'(Approx.' : '(Około',
'Loads)' : 'ładunków)',
'Current Low Bid:' : 'Obecna oferta:',
'Current Low Bidder:' : 'Firma licytująca:',
'Reward:' : 'Nagroda:',
'Penalty:' : 'Kara:',
'Required:' : 'wymaganych:',
'Only Firma Właściciels, Z-ca prezesas, and Dyspozytors' : 'Tylko właściciel, z-ca prezesa i dyspozytorzy',
'may bid on contracts.' : 'mogą licytować kontrakty.',
'New contracts are generated' : 'Nowe są generowane raz',
'game time.' : 'czasu gry.',
'The lowest bidder' : 'Najniższa oferta',
'will be awarded the' : 'zapewnia przyznanie',
'contract after' : 'kontrakt po',
'. See the ' : ' Zobacz temat ',
'topic in the' : 'na',
'information.' : 'informacji.',
'Unlimited aktywni kierowcy' : 'nieograniczona ilość kierowców',
'Loads Left)' : 'do przewiezienia)',
'aktywni Contracts For' : 'Aktywne kontrakty dla',
'Wszystkie aktywni & Wykonane Contracts in the Past 60 Days' : 'Lista wszystkich z 60 dni',
'Currently' : 'Obecnie',
'Working' : 'w trakcie',
'Wykonane and Rewarded' : 'Wykonane, zapłacone',
'Incomplete and Penalized' : 'Niekompletny, ukarany',
'PPM Bids' : 'Oferta',
'Contract data:' : 'Termin kontraktu',
'Firma Size:' : 'wielkość firmy',



// Wypłata

'30 Day Kierowca Paycheck Księgowość' : 'Historia wypłat 30 dni',
'Księgowość Entry' : 'Wpis księgowy',
'Pobór za dowóz dowaru from the Kierowca' : 'Wypłata za dowóz towaru przez',
'You have earned a total of' : 'Zarobiłeś w całości',
'through Firma member Zarobek payouts.' : 'dzięki pracy pracowników',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',


// Bank

'Bank Account' : 'Konto bankowe',
'Manage Loans' : 'Kredyty',
'Request Loan' : 'Weź kredyt',
'Banks are locations where you can store away' : 'Bank to miejsce w którym możesz trzymać',
'z safe place.' : 'w bezpiecznym miejscu,',
'You will' : 'bedziesz',
'earn' : 'miał',
'interest on Kasa' : 'kasy',
'stored in your bank' : 'zdeponowanej na koncie',
'weekly on' : 'tygodniowo w każdy',
'do make a deposit in the bank' : 'Aby wpłacić pieniądze do banku,',
'from Twój available pocket Kasa' : 'z portfela',
'enter a' : 'wpisz',
'number' : 'liczbę',
'positive ' : 'prawidłową',
'in the form below.' : 'w oknie transakcji.',
'do make a withdrawal from the bank' : 'Aby wypłacić',
'negative' : 'ujemną',
'Account liczbę:' : 'Numer konta:',
'Account Balance:' : 'Saldo:',
'Kierowca Pocket Pieniądze:' : 'Portfel:',
'Deposit or withdraw transaction: ' : 'Transakcja:',
'Kierowca Pieniądze:' : 'Portfel:',
'liczbę of Loans:' : 'Liczba wziętych kredytów:',
'New Loan:' : 'Nowy kredyt:',
'Request New Loan' : 'Podanie o kredyt',
'Kierowca Loan Information' : 'Informacje o kredytach',
'Kierowca Loan Hisdory' : 'Historia kredytowa',
'Loan data' : 'Data kredytu',
'Loan Kwota' : 'Kwota kredytu',
'Interest' : 'Odsetki',
'Paid' : 'Spłacone',
'Owed' : 'Dług',
'Payments' : 'Spłata',
'Days' : 'dni',
'ReSpłacone On' : 'Spłacone',
'Take Out A Loan' : 'Weź kredyt',
'Kierowca Klasyfikacja:' : 'Klasyfikacja:',
'Current Cash Available:' : 'Portfel:',
'Odsetki Rate:' : 'Odsetki:',
'Per Week' : 'co tydzień',
'You have already taken out a loan doday. Please come back domorrow.' : 'Dzisiaj brałeś kredyt, przyjdź jutro.',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',


// zapamiętani, wszyscy kierowcy, firmy

'Creation data' : 'Data stworzenia',
'Last Aktywny' : 'Ostatnio widziany',
'Actions' : 'Akcja',
'Created' : 'Utworzony',
'Wszystkie kierowców Display ' : 'Spis kierowców',
'Page:' : 'Strona:',
'Pages)' : 'stron)',
'Jump do Strona:' : 'Skocz do strony:',
'Application Pending' : 'Prośba o przyjęcie',
'Companies' : 'Firm',
'Name' : 'Nazwa',
'Contracts' : 'Kontrakty',

'Wszystkie Firm Display' : 'Lista firm',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',


// Statystyki

'Please click on a link below' : 'Kliknięcie powoduje',
'access the' : 'wejście',
'statistics screen of your choice.' : 'danej kategorii.',
'Main Statystyki Screen' : 'Lista statystyk',
'ładunek Statistics' : 'Ładunki',
'A breakdown of Wszystkie the ładunek types na desce rozdzielczej.' : 'Lista wszystkich ładunków.',
'. These are the ładunek types that kierowców can deliver when selecting a route.' : 'Tutaj możesz sprawdzić, gdzie co i za ile.',
'Europaan ładunek' : 'Europejskie',
'Amerykan ładunek' : 'Amerykańskie',
'Australian ładunek' : 'Australijskie',
'Wszystkie ładunek' : 'Wszystkie',
'ładunek Type' : 'Typ',
'Supply' : 'Produkcja',
'Demand' : 'Potrzeba',
'Late Fees' : 'Kara',
'PPM' : '$/mile',
'Bonus' : 'Premia',

// ładunki

'Appliances' : 'AGD',
'Automobiles' : 'Auta',
'Audomobiles' : 'Auta',
'Beer' : 'Piwo',
'Books' : 'Książki',
'Cardboard' : 'Tektura',
'Clothing' : 'Ubrania',
'Construction Equipment' : 'Budowlane',
'Cotdon' : 'Bawełna',
'Cotton' : 'Bawełna',
'Electronics' : 'Elektronika',
'Fruit' : 'Owoce',
'Furniture' : 'Meble',
'Gasoline' : 'Paliwo',
'Gems' : 'Biżuteria',
'General Merchandise' : 'Towar ogólny',
'Glass' : 'Szkło',
'Grain' : 'Ziarno',
'Groceries' : 'Spożywcze',
'Hazardous Waste' : 'Odpady niebezpieczne',
'Iron Ore' : 'Ruda',
'Livesdock' : 'Zwierzęta',
'Livestock' : 'Zwierzęta',
'Lumber' : 'Budulec',
'Mail' : 'Poczta',
'Medical Supplies' : 'Lekarstwa',
'Milk' : 'Mleko',
'Mobile Strona startowas' : 'Mobilne domy',
'Nuclear Waste' : 'Odpady radioaktywne',
'NuPrzejrzysto Waste' : 'Odpady radioaktywne',
'Oil' : 'Olej',
'Paper' : 'Papier',
'Plastic' : 'Tworzywa',
'Rock' : 'Kamień',
'Sea Food' : 'Owoce morza',
'Steel' : 'Stal',
'Timber' : 'Deski',
'Tires' : 'Opony',
'Vegetables' : 'Warzywa',


// bez ładunków

//'Audomobiles' : 'Automobiles',
//'Cotdon' : 'Cotton',
//'Mobile Strona stardowas' : 'Mobile Homes',
//'NuPrzejrzysto Waste' : 'Nuclear Waste',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',

'Miasto Statistics' : 'Miasta w grze',
'Details on Wszystkie the Miasta in Trukz.' : 'Lista wszystkich miastach w grze.',
'These are the Miasta where kierowców deliver their routes do and from.' : 'Informacje o pogodzie, produkcji, potrzebach.',
'Europaan Miasta' : 'Europejskie',
'Amerykan Miasta' : 'Amerykańskie',
'Australian Miasta' : 'Australijskie',
'Wszystkie Miasta' : 'Wszystkie',
'Miasto odległość Calculator' : 'Kalkulator odległości',
'Select two' : 'Wybierz dwa',
'do determine the' : 'i policz',
'distance' : 'odległość',
'between' : 'pomiędzy nimi',
'Flekki Cost Calculador' : 'Kalkulator lotów',

'Please Select One...' : 'Wybierz...',
'Starting' : 'Startowe',
'Cel Miasto:' : 'Miasto docelowe:',
'Miasto odległość Spreadsheet' : 'Lista odległości',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'Flight Cost Calculador' : 'Koszty lotnicze',
'cost do fly.' : 'Koszt lotu.',

'Game Map' : 'Mapa gry',
//'A view of Wszystkie the Miasta w grze with info markers indicating what that Miasto supplies and Potrzebas. Za to dostajesz not be able do start new routes from this screen.' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',

'Truck Lot' : 'Park maszynowy',
'A list of' : 'Lista',
'Wszystkie the trucks' : 'wszystkich ciężarówek',
'This screen is for browsing only.' : 'Strona poglądowa. Nie',
'not be able do Kup ciężarówkęs here.' : 'kupić tutaj.',
'Available Trucks' : 'z możliwych',
'Condition:' : 'Kondycja:',
'MPG:' : 'Spalanie/mile',
'Load Limit:' : 'Maks. ładowność:',
'Game Default Price:' : 'Cena domyślna:',
'If Firma Discount:' : 'Upust dla firm:',
'Total Owners:' : 'Ilość właścicieli:',
'Ownership Percent:' : 'Posiadacze:',
'Location:' : 'Dostępność:',
'Any ' : 'Wszędzie',

'most' : 'Top',
'dop Rated kierowców' : 'Toplista kierowców',
'the dop' : 'Top',
'sorted by' : 'posortowanych według',
'Most mil' : 'Top według przebiegu',
'odometer.' : 'przebiegu.',

'Most ton Hauled' : 'Top ilości ton',
'ton hauled' : 'przewiezionych ton',
'Most Kasa' : 'według kasy',
'Game Demographics' : 'Demografia w grze',
'histories.' : 'historie.',
'Item Purchase Stats' : 'Statystyka części',
'Statistics on Kierowca item purchases' : 'Statystyka części',
'' : '',
'An updata log of' : 'Log Wersji.',
'major changes made do the game recently.' : 'zmiany w grze.',
'A detailed guide do help new players get started' : 'Poradnik pomocy dla nowych start',


// Komunikaty

'You successfully drove' : 'Przejechałeś szczęśliwie',
'with no issues' : 'bez problemów',
'on Twój last leg.' : 'w ostatniej godzinie.',
'been on the road for a while.' : 'Jesteś już w drodze od jakiegoś czasu.',
'You are getting ready for some rest.' : 'Przydałby się jakiś odpoczynek.',
'Route Wykonane' : 'Trasa zakończona',
'You have' : 'Masz',
'Masz Wykonane' : 'Zakończyłeś', 
'Twój Trasa ' : 'trasę ',
'You Poboryed' : 'Zarobiłeś',
'of which' : 'z tego',
'Poboryed $' : 'pobiera $',
'from that total' : 'swój procent z zarobku,',
'Twój kierowca Klasyfikacja is now' : 'Klasyfikacja wzrosła do',
'to leave you with a total' : '',
'Poboryion of' : 'więc dostajesz tylko',
'You may' : 'Możesz',
'at this time or view Twój ' : 'teraz lub idż do',
'Kierowca profile' : 'profil kierowcy',
'for więcej details.' : 'po więcej informacji.',
'Having trouble with the map? Select' : 'Masz problem z wyświetlaniem mapy ? Wybierz',
'the drop down below.' : 'okienku poniżej.',
'Select Miasto docelowe:' : 'Wybierz cel:',
'Select A Miasto' : 'Wybierz miasto',
'Twój ładunek of' : 'Ładunek o nazwie',
'Twój truck and is ready for delivery' : 'Twojej ciężarówki i gotowy dostarczyć',
'is attached' : 'jest załadowany',
're getting' : 're Zaczynasz być',
'about time do pull off the road and get some rest.' : 'To znak do zjazdu z drogi na odpoczynek.',
'You are exhausted and alTop beyond Twój HOS.' : 'Jesteś wykończony i osiągnąłeś maksymum czasu pracy. ',
'do fWszystkie asleep at the wheel and/or get a Mandat for driving beyond Twój HOS.' : 'zasnąć i/lub dostać mandat za przekroczenie czasu pracy.',
'do fWszystkie asleep at the wheel or get a Mandat for driving beyond Twój HOS.' : 'zasnąć i/lub dostać mandat za przekroczenie czasu pracy.',
'If you ton' : 'Jeśli nie ',
't pull over soon you are going' : ' zjedziesz, wkrótce możesz',
'Lmiał więcej about' : 'Więcej o w',
'You fell asleep on the wheel and crashed' : 'Zasnąłeś za kółkiem i rozbiłeś',
'Twój truck on' : 'swoją ciężarówkę',
'Twój last leg.' : 'w ostaniej godzinie.',
'is now at' : 'ma teraz',
'condition.' : 'kondycji.',
'You are exhausted and beyond Twój HOS.' : 'Jesteś wykończony i skończył Ci się czas pracy.',
'Twój truck is alTop out of Paliwo.' : ' Kończy Ci się paliwo.',
'Sdop for Paliwo now.' : 'Zatrzymaj się na najbliższej stacji.',
'has had a random mechanical failure beyond normal wear and tear.' : 'uległ losowej usterce w normalnym użytkowaniu.',
'do take a break from the game do rest Twój kierowca.' : 'Zrób sobie przerwę od gry.',
'It takes one hour of real world inAktywny' : 'Jedna gozdzina nieaktywności, to jedna godzina odpoczynku w grze.',
'from the game do regain one Zmęczenie level for Twój kierowca.' : 'To znaczy, że zmęczenie kierowcy zmniejszy się.',
'will be fully rested by' : 'będzie w pełni wypoczęty',
'We see that Masz not yet taken advantage of the' : 'Zauważyliśmy, że nie dałeś żadnego datku w',
'this month.' : 'w tym miesiącu.',
'Help Wsparcie the site and get an in-game cash reward for Twój kierowca by making a donation.' : 'W pomocy technicznej dowiesz się jak to zrobić.',
'Twój truck is low on Paliwo. You' : 'Kończy się paliwo. ',
'll need do rePaliwo soon.' : ' Musisz zatankować.',





'Configure' : 'Konfiguruj',
'Hauling' : 'Ciągniesz',
'pounds of' : 'ładunku',
'from' : 'z',
'If you are late you will be fined' : 'Jeśli się spóźnisz, zapłacisz',
'will earn your driver' : 'zapłata wynosi',
'per mile, a total of ' : 'za mile, razem będzie',
'for the entire route.' : 'za całą trasę.',
'per day that you are late.' : 'za każdy dzień spóźnienia.',
'Details' : 'Szczegóły',
'Points:' : ':',
'Trip' : 'podróż',
'Increase:' : 'wzrost:',

'Origin Miasto Supplies:' : 'Produkcja w mieście:',
'Origin Miasto Temperature:' : 'Temperatura w mieście:',
'Origin Miasto Precipitation:' : 'Opady:',
'Cel Miasto Potrzebas:' : 'Potrzeby w mieście docelowym:',
'Cel Miasto Temperature:' : 'Temperatura w mieście:',
'Cel Miasto Precipitation:' : 'Opady:',
'Cel Terminal Premia:' : 'Premia:',
'kierowca Points' : 'punktów',
'Expected' : 'Oczekiwane',
'Arrival:' : 'przybycie:',


// Poczta

'Trukz Private Message System ' : 'Skrzynka wiadomości',
'NO Wyślij wiadomość' : 'NIE MA ŻADNYCH WIADOMOŚCI',


// Literówki błedne


'Ostatnia aktywNieść:' : 'Ostatnia aktywność:',
'StaNiewisko:' : 'Stanowisko',
'Nieść' : 'ność',
'Kierowca Upusty:' : 'Dodatkowe części:',
'Current Paliwo:' : 'Stan paliwa:',

'BrittWszędzie' : 'Brittany ',
'in-game Premia' : 'premi w grze',
'PLEASE NOTE:' : 'UWAGA:',
'donations are limited do a maximum of $60 per month from' : 'Dotacja jest ograniczona do $60 na miesiąc',
'Twój game account.' : 'na Twoim koncie.',
'trukzbilling@Wsparcie.joltonline.com' : 'trukzbilling@support.joltonline.com',
'donation Kwota' : 'Kwota',
'Fresh Opony,' : 'świerze opony,',
'Paliwo Filter,' : 'nowy filtr paliwa,',
'kierowca Dodatki:' : 'Dodatki:',
'Page Top' : 'Do góry',
'current visitors.' : 'odwiedzających.',
'RePaliwo' : 'Tankowanie',

'Percent' : 'procent',
'Gameplay' : 'Granie',
'Style' : 'styl',
'Option' : 'opcja',
'E-poczta' : 'E-mail',
'Zmień mój ePoczta adres' : 'Zmień mój adres E-mail',
'Switch Kanał CB:' : 'Zmień kanał CB:',
'Euro cWszystkie n haul' : 'Euro call n haul',
'legs' : '',
'Estimated Trip' : 'Szacowana podróż',
'Route' : 'Trasa',
'Taken:' : 'wykonana:',
'Last donation' : 'Ostatnia dotacja',
'No donations on record.' : 'Nie zarejestrowano dotacji.',
'W Firma:' : 'W firmie od:',
'Purchased:' : 'kupna:',

'kierowca Dodatki:' : 'Dodatkowe części:',
'Purchase' : 'Zakup',
'Cost:' : 'koszt:',
'Lista For' : 'Lista dla',
'Muddy VWszystkieey Trucking' : 'Muddy Valley Trucking',
'Ustawienia Twój Firma' : 'Ustawienia Twojej firmy',
'Notify Właściciel:' : 'Powiadom właściciela:',
'Firma Biuletyn' : 'Biuletyn firmy',
'Subject:' : 'Temat:',
'From:' : 'Od:',
'Message:' : 'Wiadomość:',
'Firma member Zarobek payout on Trasa zakończona by' : 'Wypłata za zakończenie trasy od',
'Zakupd' : 'Zakup',
'kierowca Notepad' : 'Notatnik kierowcy',
'Use the notatnik kierowcy do keep track of Twój notes as you play the game.' : 'Użyj notatnika do zapisu notatek.',
'Estimated' : 'Przypuszczalna',
'You are at' : 'Jesteś',
'Twój Firma ' : 'w Twojej firmie',
'headquarters' : 'czyli bazie domowej',
'RePaliwo and Naprawa' : 'Tankowanie i naprawa',
'costs are Obecnie reduced by 25%.' : 'kosztują 25% mniej.',
'Consider taking advantage of this discount before you start Twój next Trasa.' : 'Wykorzystaj to przed następną trasą.',
'Position' : 'pozycja',
'Firma Default' : 'Domyślnie',
'Default is' : 'Domyślnie jest',
'Firma Zarobek:' : 'Wypłata:',
'w Twojej firmiemanagers have Utworzony' : 'Jeden z menadżerów utworzył nowy',
'of Twój Zakup Dodatki or endorsements are nearing their expiration Data.' : 'z Twoich części kończy się termin ważności.',
'Please take care not do incur penalties as a result!' : 'Uważaj żeby z powodu tego nie narazić się na kary.',
'Click' : 'Kliknij',
'do Zakup/Odnowienie licencji na Dodatki and endorsements.' : 'w celu zakupu/odnowienia części.',
'here' : 'tutaj',
'Thank you for logging in' : 'Dzięki za zalogowanie',
'Attention Firma Leader:' : 'Uwaga dla lidera firmy:',
'are special awards that you can win' : 'to specjalne nagrody, które można wygrać',
'by accomplishing a własny set of tasks as a Firma.' : 'realizując zadania.',
'Each time you hit a goal, you' : 'Za każdym razem, kiedy zdobędziesz jakiś, ',
'll get an Firma Achievement Badge in Twój public profile.' : ' pojawi się na Twoim profilu.',
'(Doin' : '(Robić',
'It For The Love)' : 'to dla miłości)',
'w Twojej firmiedoes not have enough Kasa to Zakup a terminal at this time.' : 'Twoja firma nie ma tyle kasy, na zakup terminala.',
'Zakup A Terminal' : 'Zakup Terminala',
'Firma Assets Available:' : 'Dostępna kasa:',
'Terminale koszt:' : 'Koszt terminala:',
'Firma Assets After Zakup:' : 'Kasa po zakupie',
'Terminal Miasto:' : 'Miasto:',
'You have received an error trying do view a page. tutaj is the detailed error code:' : 'Przy próbie otwarcia strony wystąpił błąd. Kod błędu to:',
'You cannot Sprzedaj' : 'Nie możesz sprzedać',
'at this time because you are Obecnie in-Trasa.' : 'ponieważ jesteś w trasie.',
'to go back.' : 'by wrócić.',
'kierowca 90 Day Mandat History' : '90 dniowa historia mandatów',
'SmWszystkie Cap' : 'Mała czapka',
'We deliver...' : 'Dostarczamy',
'Highway Patrol' : 'Patrol Autostradowy',
'Hauled' : 'przewiezione',
'Last tonation' : 'Ostatnia dotacja',
'No tonations on record.' : 'Brak zarejestrowanych dotacji.',
'Trasa.' : 'trasie.',
'An application has been submitted by' : 'Wniosek został złożony przez',
'become part of' : 'przyjęcia',
'. This' : '. Ten',
'will not' : 'nie będzie',
'until you approve their application via their' : ' dopóki nie zaaprobujesz jego prośby w',
'page.' : 'stronie',
'Message Szczegóły' : 'Szczegóły wiadomości',
'Application do Join Firma' : 'Aplikacja przyjęcia do firmy',
'You recently changed Twój Firma' : 'Zmienił się firmowy ',
's preferred' : ' preferowany', 
'and you must wait until' : 'więc musisz zaczekać do',
'do change Twój preferred Typ again.' : 'aby zmienić ponownie.',
'Manage Firma kierowca pozycja' : 'Ustawienia kierowcy',
'Cancelled Application OR Member Leave' : 'Aplikacja anulowana lub odszedł',
'or was already a member has left Twój Firma.' : 'lub odszedł z firmy.',
'The kierowca' : 'Ten kierowca',
'that had either requested do' : 'nie skorzystał z',
'Reply' : 'Odpowiedź',
'Delete' : 'Skasuj',
'If you don' : ' Jeśli nie ',
'kierowca Dodatki:' : 'Części dodatkowe:',
'DWszystkieas' : 'Dallas',
'Kamieńhampton' : 'Rockhampton',
'New York Miasto' : 'New York City',
'Kansas Miasto' : 'Kansas City',
'Salt Lake Miasto' : 'Salt Lake City',
'Mexico Miasto' : 'Mexico City',
'Panama Miasto' : 'Panama City',
'reached a new achievement!' : 'zdobył odznakę!',
'Congratulations!' : 'Gratulacje!',
'reached an' : 'zdobył za',
'reached a' : 'zdobył za',
'Achievement of' : 'odznakę',
'You can view the' : 'Możesz zobaczyć',
'Twój achievement page' : 'Osiągnięcia',
'Twój Osiągnięcia page' : 'Osiągnięcia',
'I Get Spłacone For This?' : 'Zapłaciłem za to?',
'Rookie' : 'Rekrut',
'Casual' : 'Dorywczo',
'Air Filter,' : 'nowy filtr powietrza,',
'Paliwo Injector,' : 'nowe wtryski,',
'Late' : 'po czasie',
'Seen some places' : ' Widział parę miejsc',
'Cels' : 'Cele',
'Tourist' : 'Turysta',
'Will Drive For Cash' : 'Jeżdże dla kasy',
'Getting Serious' : 'Poważny',
'Marznące Rain' : 'Marznący deszcz',
'Travellin' : 'Podróżnik ',
'Buying The Drinks' : 'Kupuje drinki',
'new private message w Twój' : 'nową wiadomość w',
'inbox' : 'skrzynce',
'. Check Twój skrzynce do read and Odpowiedź do private messages.' : '. Sprawdź, przeczytaj i odpowiedź.',
'Knows The Shortcuts' : 'Znawca skrótów',
'Serious Truckin' : 'Poważny Trucker',
'will need Naprawa soon.' : 'potrzebuje naprawy.',
'Masz Wykonane Twój Trasa' : 'Zakończyłeś trasę',
'Reliable' : 'Solidny',
'Reputable' : 'Renomowany',
'Semi-Pro' : 'Średnio-zaawansowany',
'has failed on you' : 'zepsuł się totalnie',
'need do hire a tow truck for' : 'Musisz ściągnąć pomoc drogową za',
'$200 and' : '$200.',
'before moving on.' : 'musi zostać wykonana przed dalszą drogą.',
'needs Naprawa immediately.' : 'wymaga natychmiast naprawy.',
'. You' : '. ',
'll M' : ' M',
'new private messages w Twój' : 'nowych wiadomości w',
'Bidding Closed' : 'Licytacja zamknięta',
'NO INCOMING MESSAGES' : 'Brak nowych wiadomości',
' Private Message System' : ': Prywatna skrzynka pocztowa',
'As the leader of a Firma' : 'Jako lider firmy',
'you are responsible for' : 'jesteś odpowiedzialny za',
'Too SmWszystkie' : 'za mała',
'Contract Filter opcjas:' : 'Filtr kontraktów:',
'Tier' : 'Wielkość',
'No Firmowe dodatki Zakup.' : 'Nie zakopiono żadnych zniżek.',


















///////////////////////////////////////////////////////
'':''};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
var ok = true;
var badTags = new Array('pre','blockquote','code','input','button','textarea');
for each(var badTag in badTags) if(tag==badTag) ok=false;
return ok;
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
regexs.push(new RegExp(word.prepareRegex().replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}

var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0; x<regexs.length; x++) text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
//Google Reklam kaldır.

(function() {

	// First we get rid of Google Toolbar Ad..

    var searchTable = document.evaluate("//a[contains(@href,'http://toolbar.google.com/')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    if (searchTable.snapshotLength > 0)
    {
        var innerTable = searchTable.snapshotItem(searchTable.snapshotLength - 1);


        innerTable.parentNode.removeChild(innerTable);}
	
	// ..and now from Google Desktop Search Ad
	
	var searchTable = document.evaluate("//a[contains(@href,'http://desktop.google.com/')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    if (searchTable.snapshotLength > 0)
    {
        var innerTable = searchTable.snapshotItem(searchTable.snapshotLength - 1);


        innerTable.parentNode.removeChild(innerTable);}
	
	// Finally we remove the infamous Google AdSense Ads
	
	var RemoveGoogleAds =
    {
        checkPage: function()
        {
            currentDoc = document;

            try {
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(/google_ads_frame/i))
                {
                    this.injectCSS("iframe[name='google_ads_frame'] { display: none; }");
                }
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(pagead))
                {
                    currentDoc.getElementsByTagName("body")[0].innerHTML.match(pagead).style.display='none'
                    // this.injectCSS("script[src='http://pagead2.googlesyndication.com/pagead/show_ads.js'] { display: none; }");
                }
            }
            catch(e) {}
        },


        injectCSS: function(css)
        {
            head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    RemoveGoogleAds.checkPage();

})();

//
//
//
//
//
//
//

