// ==UserScript==
// @name           eRepublik Polish
// @description    Polskie tlumaczenie eRepublik
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Strona główna",
	"Donate" : "Dotacja",
	"May" : "Maj",
	"June" : "Czerwiec",
	"July" : "Lipiec",
	"Day" : "Dzień",
	"Day " : "Dzień ",
	"days" : "dni",
	"days " : "dni ",
	"of the New World" : " nowego świata",
	"Rank"   : "Ranking",
	"Company" : "Firma", 
	"Profile" : "Profil", 
	"Party" : "Partia", 
	"Newspaper" : "Gazeta",
	"Army" : "Armia",
	"Country administration" : "Administracja kraju",
        "Organizations" : "Organizacje",
        "Advertising Department" : "Biuro Reklamy",
	"Market" : "Market",
	"Monetary market" : "Giełda Pieniędzy",
	"Job market" : "Biuro pracy",
        "Companies for sale" : "Firmy na sprzedaż",
        "Get Gold &amp; Extras" : "Kup pieniądze GOLD",
	"Rankings" : "Ranking",
	"Social stats" : "Statystyki socjalne",
	"Economic stats" : "Statystyki ekonomiczne",
	"Political stats" : "Statystyki polityczne",
	"Military stats" : "Statystyki militarne",
	"Tutorials" : "Przewodniki",
	"Tools" : "Narzędzia",
	"Forum" : "Forum",
	"News" : "Wiadomości",
	"Invite friends" : "Zaproś znajomych",
	"eRepublik Shop" : "eRepublik sklep",
	"Career path" : "Ścieżka kariery",
	"Ok, thanks, next tip" : "Ok, dzięki, następna porada",
	"I have nothing more to say at the moment" : "Nie mam więcej porad w tym momencie",
	"Select" : "Wybierz",
	"Top rated news" : "Najwyżej oceniane newsy",
	"Latest news" : "Ostatnie wiadomości",
        "Latest events" : "Ostatnie wydarzenie",
		"News" : "Wiadomość",
        "More events" : "Więcej wydarzeń",
        "more events" : "więcej wydarzeń",
        "More news" : "Więcej wiadomości",
		"more news" : "więcej wiadomości",
	"Marketplace" : "Sklep",
	"Wars" : "Wojny",
        "My Places" : "Moje Miejsca",
        "Info" : "Info",
        "Community" : "Społeczność",
        "Day of the new world" : "dni nowego świata",
        "National" : "Narodowe",
        "International" : "Międzynarodowe",
		"Latest Events" : "Ostatnie wydarzenia",
        "Shouts" : "Shouts",
        "Shout" : "Shout",
        "Official" : "Oficjalny",
        "Everyone" : "każdy",
        "Latest" : "Ostatni",
        "Search citizen" : "Szukaj obywatela",
	"Shout" : "Shout",
	"Latest" : "Ostatni",
	"one minute ago" : "minutę temu",
	" for 10 shouts/day and more" : " dla 10 shoutów dziennie lub więcej",
	"for 10 shouts/day and more" : "dla 10 shoutów dziennie lub więcej",
	"No more shouts for today" : "Nie więcej shoutów dziś ",
	"Top rated" : "Najlepsze",
	"Go to next page" : "Idź do następnej strony",
	"Experience points" : "Punkty doświadczenia",
	"Name" : "Nazwa",
	"Companies" : "Firmy",
	"Newspapers" : "Gazety",
	"Countries" : "Kontynenty",
	"Parties" : "Partie",


// country page
	"On the Map" : "Na mapie",
	"Total citizens" : "Łącznie obywateli",
	"New citizens today" : "Nowych obywateli dziś",
	"Average citizen level" : "Średni lvl obywateli",
	"Online now": "Online",
	"Citizen fee" : "Cena obywatela",
	"Citizens" : "Obywatele",
	"Who" : "Kto",
	"details" : "Szczegóły",
	"Society" : "Społeczność",
	"Economy" : "Ekonomia",
	"Politics" : "Polityka",
	"Military" : "Militaria",
	"Administration" : "Administracja",
	
// countries
	"Argentina" : "Argentyna",
	"Australia" : "Australia",
	"Austria" : "Austria°",
	"Belgium" : "Belgia°",
	"Bolivia" : "Boliwia°",
	"Bosnia and Herzegovina" : "Bośnia i Hercegowina",
	"Brazil" : "Brazylia",
	"Bulgaria" : "Bułgaria",
	"Chile" : "Chile",
	"China" : "Chiny",
	"Colombia" : "Kolumbia",
	"Croatia" : "Chorwacja",
	"Canada" : "Kanada",
	"Czech Republic" : "Czeska Republika",
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
	"Israel" : "Izreal",
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
	"Peru" : "Peru",
	"Philippines" : "Filipiny",
	"Poland" : "Polska",
	"Portugal" : "Portugalia",
	"Romania" : "Rumunia",
	"Serbia" : "Serbia",
	"Singapore" : "Singapur",
	"South Africa" : "Południowa Afryka",
	"South Korea" : "Korea Południowa",
	"Slovakia" : "Słowacja",
	"Slovenia" : "Słowenia",
	"Switzerland" : "Szwajcaria",
	"Spain" : "Hiszpania",
	"Sweden" : "Szwecja",
	"Russia" : "Rosja",
	"Thailand" : "Tajlandia",
	"United Kingdom" : "Zjednoczone Królestwo",
	"Ukraine" : "Ukraina",
	"Uruguay" : "Urugwaj",
	"USA" : "USA",
	"Turkey" : "Turcja",
	"Venezuela" : "Wenezuela",
	"World" : "Świat",
	"All countries" : "Wszystkie państwa",
// economy
	"GOLD" : "GOLD",
	"Gold" : "Gold",
	"Treasury" : "Skarb Państwa",
	"All accounts" : "Wszystkie konta",
	"Country trading embargoes" : "Państwa z emargo",
	"This country can trade with any other country in eRepublik." : "Ten kraj może handlować z każdym innym Państwem w eRepublik",
	"Income Tax" : "Podatek od dochodu",
	"Import Tax" : "Podatek od importu",
	"VAT" : "VAT",
	"Taxes" : "Podatki",
	"food" : "jedzenie",
	"gift" : "podarek",
	"weapon" : "broń",
	"moving tickets" : "bilety",
	"grain" : "grain",
	"diamonds" : "diament",
	"iron" : "iron",
	"oil"  : "olej",
	"wood" : "drewno",
	"house" : "dom",
	"hospital" : "szpital",
	"defense system" : "system obrony",
	"Defense system" : "System obrony",


	"Salary" : "Pensja",
	"Minimum" : "Minimum",
	"Average" : "Średnia",

	"Gross domestic product (GDP)" : "Produkt krajowy brytto (PKB)",
	"Monthly exports" : "Miesięczne eksporty",
	"Monthly imports" : "Miesięczne importy",
	"Inflation" : "Inflacja",
// company
	"Office" : "Biuro",
	"You have already worked today." : "Pracowałeś już dziś",
	"Come back tomorrow." : "Wróć jutro.",
	"Resign" : "Rezygnuj",
	"Employees" : "Pracownicy",
	"Raw materials" : "Surowe materiały",
	"Show all employees" : "Pokaż wszystkich pracowników",
	"Show all donations" : "Pokaż wszystkie dotacje",
	"Go to marketplace" : "Idź do sklepu",
	"Products" : "Produkty",
	"The company cannot trade with this country due to a trade embargo." : "Ta firma nie może handlować z tym krajem w związku z embargiem",
	"Jobs available in this company" : "Oferty pracy w tej firmie",
	"Minimum Skill" : "Minimalny skill",
	"You do not have any active job offers" : "Brak ofert pracy",
	"Apply" : "Ubiegaj się",
	"The company offers no products in this market" : "Ta firma nie oferuje produktów w tym markecie",
	"Amount" : "Ilość",
	"Price" : "Cena",
	"Price with taxes" : "Cena z podatkiem",
	"Company page" : "Strona firmy",
	"Today" : "Dziś",
	"Yesterday" : "Wczoraj",
	"All employees" : "Wszyscy pracownicy",
	"Skill" : "Skill",
	"Daily salary" : "Dzienna pensja",
	"Last presence" : "Ostatnia obecność",
	"Minimum country wage :" : "Minimalna krajowa : ",

	"Grain" : "Ziarno",
	"Food" : "Jedzenie",
	"Gift" : "Prezenty",
	"Weapon" : "Broń",
	"Moving Tickets" : "Bilety",
	"Diamonds" : "Diamenty",
	"Iron" : "Iron",
	"Oil"  : "Olej",
	"Wood" : "Drewno",
	"House" : "Dom",
	"Hospital" : "Szpital",
	"Defense System" : "System obronny",
	"All industries" : "Wszystkie branże",
	"Country" : "Kraj",
	"Create new company" : "Utwórz nową firmę",


// market
	"Quality Level" : "Poziom jakości",
	"All levels" : "Wszystkie poziomy",
	"Level 1" : "Poziom 1",
	"Level 2" : "Poziom 2",
	"Level 3" : "Poziom 3",
	"Level 4" : "Poziom 4",
	"Level 5" : "Poziom 5",

	"Provider" : "Dostawca",
	"Quality" : "Jakość",
	"Stock" : "Stan",
	"Buy" : "Kup",
	"Market" : "Sklep",

	"Market offers" : "Sklepowe oferty",
	"Amount" : "Liczba",
	"Price" : "Cena",
	"Next" : "Następny",
	"Prev" : "Poprzedni",
	"No products in this market" : "Brak produktów w tym sklepie",
	"Go to marketplace" : "Idź do sklepu",
	"Jobs available in this company" : "Praca dostępna w tej firmie",
	"You don't have any active job offers" : "Brak ofert pracy",
	"You didn't specify the amount of products you wish to buy" : 
		"Musisz wpisać liczbę produktów które chcesz kupić",
	"You cannot trade with this country as you are at war with it" :
		"Nie możesz handlować z krajem będącym w stanie wojny",


// job market
	"Industry" : "Branża",
	"Minimum skill" : "Minimalny skill",


// region
	"Citizens" : "Mieszkańcy",
	"Country - Society" : "Państwo - Społeczność",
        "Heal" : "Heal",
	"Constructions": "Konstrukcje",
	"Population": "Populacja",
	"Productivity" : "Produktywność",
	"Resistance War" : "Opór w wojnie",
	"Resistance War Active" : "Opór w aktynwej wojnie",
	"You can't start a resistance war in this region because it already belongs to its original owner  country" : "Nie możesz rozpocząć wojny w tym regionie ponieważ on już należy do swojego oryginalnego państwa",
	"Medium" : "Średni",
	"High": "Wysoki",
	"Neighbors" : "Sąsiad",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Wybierz profesję aby zobaczyć oferty",
	"Skill Level" : "Skill",
	"All skills" : "Wszystkie skille",
	"All" : "Wszystko",
// politics
	"Country Administration" : "Administracja Państwa",
	"Accepted" : "Zaakceptowane",
	"Rejected" : "Odrzucone",
	"Pending" : "Głosowanie",
	"Congress" : "Kongres",
	"Issue Money" : "Wydawanie pieniędzy",
	"Law proposals" : "Propozycje radnych",
	"Minimum Wage" : "Minimalna płaca",
	"Mutual Protection Pact" : "Wzajemny pakt ochronny",
	"Alliance" : "Sojusz",
	"New Citizen Fee" : "Opłata nowego obywatela",
	"Peace Proposal" : "Propozycja pokoju",
	"President" : "Prezydent",
	"Yes" : "Tak",
	"No" : "Nie",
	"Show all law proposals" : "Pokaż pozostałe głosowania",
	"The law voting process takes 24 hours." : "Głosowanie radnych potrwa 24 godziny.",
	"Only congress members and country presidents have the right to vote." : "Tylko kongres oraz prezydent kraju ma prawo głosować.",
	"You are not a president or a congress member in this country." : "Nie jesteś prezydentem ani członkiem kongresu w tym państwie.",
// wars
	"no allies" : "brak aliantów",
	"All wars" : "Wszystkie wojny",
	"Active resistance wars in " : "Aktywny opór w wojnach w ",
	"All resistance wars" : "Wszystkie wojny ",
	"All Alliances" : "Wszystkie sojusze",
	"Alliances" : "Sojusze",
	"Military force" : "Militarna siła",
	"Average strength" : "Średnia siła",
	"War > Battlefield" : "Wojna > Pole bitwy",
	"Basic damage" : "Podstawowe zniszczenia",
	"Weapon quality" : "Jakość broni",
	"Wellness" : "Wellness",
	"Rank" : "Ranking",
	"Total damage" : "Łączne zniszczenia",
	
// army
	"You have trained today. You can train again tomorrow." : "Trenowałeś już dziś. Możesz trenować ponownie jutro.",
	"Force" : "Siła",
	"Military rank" : "Wojskowy ranking",
	"Military achievements" : "Wojskowe osiągnięcia",
	"Active wars list" : "Lista aktywnych wojen",
	"Field Marshall" : "Field Marshall",
	"General" : "Generalnie",
	"Colonel" : "Pułkownik",
	"Captain" : "Kapitan",
	"Lieutenant" : "Porucznik",
	"Sergeant" : "Sierżant",
	"Corporal" : "Kapral",
	"Private" : "Prywatny",
	"Show active wars" : "Pokaż aktywne wojny",
	"Start a Resistance War" : "Rozpocznij wojnę",
	"You do not have the necessary amount of Gold to start a resistance war." : "Masz za mało Gold'ów aby rozpocząć wojnę.",
	"You cannot join this fight because your country is not involved in the war" : "Nie możesz dołączyć do tej walki ponieważ twój kraj nie jest w nią zaangażowany",
	"There are no resistance wars in this country." : "Brak wojen domowych w tym kraju.",
	"until the region can be occupied or secured" : "podczas gdy region może być okupywany lub chroniony",
	"Attackable on President's decision" : "Atakowalny decyzją prezydenta",
	"Defense Points" : "Punkty obrony",
	"Go to Battlefield" : "Idź na pole walki",
	"started on" : "start ",
	"see finished battles" : "zobacz ukończone walki",
	"show finished battles" : "pokaż ukończone walki",
	"fights" : "walki",
	"Still active" : "Pozostają aktywne",
	"Wars list" : "Lista wojen",
	"War" : "Wojba",
	"Battle history" : "Historia walki",
	"Fight" : "Walka",
	"Hero" : "Bohater",
	"Started by" : "Rozpoczęta przez ",
	"started by" : "rozpoczęta przez ",
	"active battles" : "aktywne walki",
	//"Fight for resistance" : "",
	//"Fight for defenders" : "",
// party
	"All donations": "Wszystkie dotacje",
	"Get more" : "Zdobądź więcej",
	"Country presidency" : "Prezydentura kraju",
	"Winner" : "Zwycięzca",
	"Next election in" : "Następne wybory za ",
	"Next elections in" : "Następne wybory za ",
	"No candidate proposed" : "Brak proponowanych kandydatów",
	"candidates" : "kandydaci",
	"Candidate" : "Kandydat",
	"days" : "dni",
	//"GOLD" : "GOLD",
	"Show results" : "Pokaż wyniki",
	"Show candidate list" : "Pokaż listę kandydatów",
	"Show candidates list" : "Pokaż listę kandydatów",
	"You are not a member of a party" : "Nie jesteś członkiem partii",
	"Join a party" : "Dołącz do partii",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Możesz dołączyć do partii z jej strony prezentacyjnej lub stworzyć własną partię jeśli nie możesz znaleźć odpowiedniej dla siebie. Bycie członkiem partii może dać tobie szansę bycia członkiem kongresu lub nawet prezydentem.",
	"Create new" : "Utwórz nową",
	"congress members" : " członków kongresu",
	"of Congress" : " z całego kongresu",
	"Show proposed members of congress" : "Pokaż proponowanych członków do kongresu",
	"Run for congress" : "Idź na kongres",
	"Join" : "Dołącz",
	"See all members" : "Pokaż wszystkich członków",
	"Donate Gold" : "Wspomóż GOLD'em",
	"Members"  : "Członkowie",
	"Orientation" : "Lokalizacja",
	"Show all members" : "Pokaż członków",

	"Center" : "Centrum",
	"Anarchist" : "Anarchista",
	"Accounts" : "Konta",
	"Elections" : "Wybory",
	"Election results" : "Wyniki wyborów",
	"Next elections" : "Następne wybory",

	"Country Presidency" : "Prezydent kraju",
	"Party presidency" : "Prezydentura partii",
	"Party President" : "Prezydent partii",
	"See results" : "Zobacz wyniki",
	"Expires tomorrow" : "Wygasa jutro",
	"No. of votes" : "Liczba głosów",
	"% of votes" : "% głosów",
	"No data available yet" : "Brak dostępnych danych",
	"Total votes" : "Razem głosów: ",
	"Presence" : "Obecność: ",
	"Election" : "Głosowanie",
	"Presidential elections" : "Wybory prezydenckie",
	"Congressional elections" : "Wybory kongresowe",
	"Party elections" : "Wybory partyjne",
	"Month/Year" : "Miesiąc/Rok",
/*

// articles
	"Report abuse" : "ĐźŃ€Đ¸Ń�Đ°Đ˛Đ¸ Đ·Đ»ĐľŃ�ĐżĐľŃ‚Ń€ĐµĐ±Ń�",
	"today" : "Đ´Đ°Đ˝ĐµŃ�",
	"yesterday" : "Ń�Ń�Ń‚Ń€Đ°",
	"one hour ago" : "ĐżŃ€Đµ Ń�ĐµĐ´Đ°Đ˝ Ń�Đ°Ń‚",
	"Unsubscribe" : "ĐźĐľĐ˝Đ¸Ń�Ń‚Đ¸ ĐżŃ€ĐµŃ‚ĐżĐ»Đ°Ń‚Ń�",
	"Subscribe" : "ĐźŃ€ĐµŃ‚ĐżĐ»Đ°Ń‚Đ¸ Ń�Đµ",
	"Article RSS" : "RSS-ĐľĐ˛Đ¸",
	"Your comment" : "Đ˘Đ˛ĐľŃ� ĐşĐľĐĽĐµĐ˝Ń‚Đ°Ń€",
	"View all comments" : "ĐźŃ€Đ¸ĐşĐ°Đ¶Đ¸ Ń�Đ˛Đµ ĐşĐľĐĽĐµĐ˝Ń‚Đ°Ń€Đµ",
	"Subscribe to comments" : "ĐźŃ€ĐµŃ‚ĐżĐ»Đ°Ń‚Đ¸ Ń�Đµ Đ˝Đ° ĐşĐľĐĽĐµĐ˝Ń‚Đ°Ń€Đµ",
	"Unsubscribe to comments" : "ĐźĐľĐ˝Đ¸Ń�Ń‚Đ¸ ĐżŃ€ĐµŃ‚ĐżĐ»Đ°Ń‚Ń� Đ·Đ° ĐşĐľĐĽĐµĐ˝Ń‚Đ°Ń€Đµ",
	"Post a comment" : "ĐžŃ�Ń‚Đ°Đ˛Đ¸ ĐşĐľĐĽĐµĐ˝Ń‚Đ°Ń€",


// news
	"You do not have a newspaper" : "ĐťĐµĐĽĐ°Ń� Đ˝Đ¸Ń�ĐµĐ´Đ°Đ˝ Ń‡Đ»Đ°Đ˝Đ°Đş",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the  eRepublik Wiki. Create your own newspaper." : "ĐťĐľĐ˛Đ¸Đ˝Đµ Ń�Ń� ĐµŃ„Đ¸ĐşĐ°Ń�Đ°Đ˝ Đ˝Đ°Ń‡Đ¸Đ˝ Đ·Đ° ĐşĐľĐĽŃ�Đ˝Đ¸Ń†Đ¸Ń€Đ°Ń�Ń� Đ˝Đ° ĐµĐ ĐµĐżŃ�Đ±Đ»Đ¸Đş Ń�Đ˛ĐµŃ‚Ń�. ĐźŃ€ĐľŃ‡Đ¸Ń‚Đ°Ń� Đ˛Đ¸Ń�Đµ Đ˝Đ° ĐµĐ ĐµĐżŃ�Đ±Đ»Đ¸ĐşĐ° Đ’Đ¸ĐşĐ¸. ĐťĐ°ĐżŃ€Đ°Đ˛Đ¸ Ń�Đ˛ĐľŃ�Đµ Đ˝ĐľĐ˛Đ¸Đ˝Đµ.",


// profiles
	"Send message" : "ĐźĐľŃ�Đ°Ń™Đ¸ ĐżĐľŃ€Ń�ĐşŃ�",
	"Remove friend" : "ĐžĐ±Ń€Đ¸Ń�Đ¸ ĐżŃ€Đ¸Ń�Đ°Ń‚ĐµŃ™Đ°",
	"Offer a gift" : "ĐźĐľŃ�Đ°Ń™Đ¸ ĐżĐľĐşĐ»ĐľĐ˝",
	"Friends" : "ĐźŃ€Đ¸Ń�Đ°Ń‚ĐµŃ™Đ¸",
	"Fights" : "Đ‘ĐľŃ€Đ±Đµ",
	"National Rank" : "ĐťĐ°Ń†Đ¸ĐľĐ˝Đ°Đ»Đ˝Đ¸ Ń€Đ°Đ˝Đł",
	"Forfeit Points" : "ĐšĐ°Đ·Đ˝ĐµĐ˝Đ¸ ĐżĐľĐµĐ˝Đ¸",
	"ShareThis" : "ĐźĐľĐ´ĐµĐ»Đ¸",
	"Assets" : "ĐźĐľŃ�ĐµĐ´",
	"Press director" : "Đ“Đ»Đ°Đ˛Đ˝Đ¸ Ń�Ń€ĐµĐ´Đ˝Đ¸Đş",
	"Inventory" : "Đ—Đ°Đ»Đ¸Ń…Đµ",
	"Get Gold" : "ĐšŃ�ĐżĐ¸ Đ·Đ»Đ°Ń‚Đľ",
	"Career" : "ĐšĐ°Ń€Đ¸Ń�ĐµŃ€Đ°",
	"Bio" : "Đ‘Đ¸ĐľĐłŃ€Đ°Ń„Đ¸Ń�Đ°",
	"Employee" : "Đ Đ°Đ´Đ¸ Ń�",
	"No political activity" : "ĐťĐ¸Ń�Đµ Ń‡Đ»Đ°Đ˝ ĐżĐ°Ń€Ń‚Đ¸Ń�Đµ",
	"Wellness" : "Đ—Đ´Ń€Đ°Đ˛Ń™Đµ",
	"Level" : "ĐťĐ¸Đ˛Đľ",
	"xp points" : "ĐżĐľĐµĐ˝Đ¸",
	"Strength" : "ĐˇĐ¸Đ»Đ°",
	"Experience" : "Đ�Ń�ĐşŃ�Ń�Ń‚Đ˛Đľ",
	"Skills" : "ĐˇĐşĐ¸Đ»",
	"Land" : "Đ›ĐµĐ˝Đ´",
	"Manufacturing" : "ĐśĐ°Đ˝Ń�Ń„Đ°ĐşŃ‚Ń�Ń€Đ¸Đ˝Đł",
	"eRepublik Birthday" : "Đ”Đ°Đ˝ Ń�Ń‡Đ»Đ°ŃšĐµŃšĐ°",
	"Get Extra Storage" : "Đ�ĐľŃ� ĐżŃ€ĐľŃ�Ń‚ĐľŃ€Đ°",
	"Party Member" : "Đ§Đ»ĐµĐ˝ ĐżĐ°Ń€Ń‚Đ¸Ń�Đµ",
	"No activity" : "ĐťĐµĐĽĐ° Đ˝ĐľĐ˛Đ¸Đ˝Đµ",
	"Total damage:" : "ĐŁĐşŃ�ĐżĐ˝Đ° Ń�Ń‚ĐµŃ‚Đ°:",
	"Hard Worker" : "Đ’Ń€ĐµĐ´Đ°Đ˝ Ń€Đ°Đ´Đ˝Đ¸Đş",
	"Work for 30 days in a row" : "ĐźĐľŃ�Đ°Đľ Đ·Đ° 30 Đ´Đ°Đ˝Đ° Đ·Đ° Ń€ĐµĐ´ĐľĐĽ",
	"Congress Member" : "ĐťĐ°Ń€ĐľĐ´Đ˝Đ¸ ĐżĐľŃ�Đ»Đ°Đ˝Đ¸Đş",
	"Country President" : "ĐźŃ€ĐµĐ´Ń�ĐµĐ´Đ˝Đ¸Đş Đ´Ń€Đ¶Đ°Đ˛Đµ",
	"Win the Presidential elections" : "ĐźĐľĐ±ĐµĐ´Đ˝Đ¸Đş Đ˝Đ° ĐżŃ€ĐµĐ´Ń�ĐµĐ´Đ˝Đ¸Ń‡ĐşĐ¸ĐĽ Đ¸Đ·Đ±ĐľŃ€Đ¸ĐĽĐ°",
	"Media Mogul" : "ĐśĐµĐ´Đ¸Ń�Đ¸",
	"Reach 1000 subscribers to your newspaper" : "ĐŁĐşŃ�ĐżĐ˝Đľ 1000 ĐżŃ€ĐµŃ‚ĐżĐ»Đ°Ń‚Đ° Đ˝Đ° Ń‚Đ˛ĐľŃ�Đµ Đ˝ĐľĐ˛Đ¸Đ˝Đµ",
	"Battle Hero" : "ĐĄĐµŃ€ĐľŃ�",
	"Reach the highest total damage in one battle" : "ĐťĐ°Đ˝ĐµŃ�Đ¸ Đ˝Đ°Ń�Đ˛ĐµŃ›Ń� Ń�Ń‚ĐµŃ‚Ń� Ń� Đ±Đ¸Ń‚Ń†Đ¸",
	"Resistance Hero" : "ĐĄĐµŃ€ĐľŃ� ĐľŃ‚ĐżĐľŃ€Đ°",
	"Start a resistance war and liberate that region" : "Đ—Đ°ĐżĐľŃ‡Đ˝Đ¸ Ń€ĐµĐ˛ĐľĐ»Ń�Ń†Đ¸Ń�Ń� Đ¸ ĐľŃ�Đ»ĐľĐ±ĐľĐ´Đ¸ Ń€ĐµĐłĐ¸ĐľĐ˝",
	"Super Soldier" : "ĐˇŃ�ĐżĐµŃ€ Đ˛ĐľŃ�Đ˝Đ¸Đş",
	"Advanced 5 strength levels" : "ĐťĐ°ĐżŃ€ĐµĐ´Đ°Đ˝ Đ˝Đ¸Đ˛Đľ Ń�Đ°Ń‡Đ¸Đ˝Đµ 5",
	"Society Builder" : "Đ“Ń€Đ°Đ´Đ¸Ń‚ĐµŃ™",
	"Invite 10 people to eRepublik and help them reach level 6" : "ĐźĐľĐ·ĐľĐ˛Đ¸ 10 ĐżŃ€Đ¸Ń�Đ°Ń‚ĐµŃ™Đ° Đ¸ ĐżĐľĐĽĐľĐ·Đ¸ Đ¸ĐĽ Đ´Đ° Đ´ĐľŃ�Ń‚Đ¸ĐłĐ˝Ń� Đ˝Đ¸Đ˛Đľ 6",
	"Check your unlocked features" : "Đ’Đ¸Đ´Đ¸ ĐľŃ‚ĐşŃ™Ń�Ń‡Đ°Đ˝Đµ ĐĽĐľĐłŃ�Ń›Đ˝ĐľŃ�Ń‚Đ¸",
	"Get Wellness" : "ĐšŃ�ĐżĐ¸ Đ·Đ´Ń€Đ°Đ˛Ń™Đµ",
	"Achievements" : "Đ”ĐľŃ�Ń‚Đ¸ĐłĐ˝Ń�Ń›Đ°",
	"Edit profile" : "ĐŁŃ€ĐµĐ´Đ¸ ĐżŃ€ĐľŃ„Đ¸Đ»",
	"Edit Profile" : "ĐŁŃ€ĐµĐ´Đ¸ ĐżŃ€ĐľŃ„Đ¸Đ»",
	"Change residence" : "ĐźŃ€ĐµŃ�ĐµĐ»Đ¸ Ń�Đµ",
	"Donations list" : "Đ›Đ¸Ń�Ń‚Đ° Đ´ĐľĐ˝Đ°Ń†Đ¸Ń�Đ°",
	
	"Your email here" : "Đ˘Đ˛ĐľŃ� e-mail",
	"Your birthday" : "Đ”Đ°Ń‚Ń�ĐĽ Ń€ĐľŃ’ĐµŃšĐ°",
	"Citizen Avatar" : "Đ�Đ˛Đ°Ń‚Đ°Ń€",
	"Change password" : "ĐźŃ€ĐľĐĽĐµĐ˝Đ¸ Đ»ĐľĐ·Đ¸Đ˝ĐşŃ�",

	"Worked 30 days in a row" : "Đ Đ°Đ´Đ¸Đľ Ń�Đ¸ 30 Đ´Đ°Đ˝Đ° Đ·Đ° Ń€ĐµĐ´ĐľĐĽ",
	"Win the Congress elections": "ĐźĐľĐ±ĐµĐ´Đ° Đ˝Đ° Đ¸Đ·Đ±ĐľŃ€Đ¸ĐĽĐ° Đ·Đ° ĐżĐľŃ�Đ»Đ°Đ˝Đ¸ĐşĐµ",
// fight
	"Back to battlefield" : "Đ’Ń€Đ°Ń‚Đ¸ Ń�Đµ Ń� Đ±Đ¸Ń‚ĐşŃ�",
	"Fight Again" : "Đ‘ĐľŃ€Đ¸ Ń�Đµ Ń�ĐľŃ� Ń�ĐµĐ´Đ˝ĐľĐĽ",
	"Fight bonus" : "Đ‘ĐľĐ˝Ń�Ń�",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in  again with your organization username and password." : "Đ”Đ° Ń�Đµ ĐżŃ€Đ¸Ń�Đ°Đ˛Đ¸Ń� ĐşĐ°Đľ ĐľŃ€ĐłĐ°Đ˝Đ¸Đ·Đ°Ń†Đ¸Ń�Đ°, ĐżŃ€Đ˛Đľ ĐĽĐľŃ€Đ°Ń� Đ´Đ° Ń�Đµ  ĐľĐ´Ń�Đ°Đ˛Đ¸Ń� Đ¸ Đ´Đ° Ń�Đµ ĐżŃ€Đ¸Ń�Đ°Đ˛Đ¸Ń� Ń�Đ° Đ¸ĐĽĐµĐ˝ĐľĐĽ Đ¸ Đ»ĐľĐ·Đ¸Đ˝ĐşĐľĐĽ ĐľŃ€ĐłĐ°Đ˝Đ¸Đ·Đ°Ń†Đ¸Ń�Đµ.",
	"If your citizen account represents an organization (SO) created in the eRepublik beta version,  please send us a message using the Contact form (category: Others) so that we can officially change it to an  organization." : "",
	"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake  accounts and will be banned." : "",
	"My Organizations" : "ĐśĐľŃ�Đµ ĐľŃ€ĐłĐ°Đ˝Đ¸Đ·Đ°Ń†Đ¸Ń�Đµ",
	"Logout" : "ĐžĐ´Ń�Đ°Đ˛Đ¸ Ń�Đµ",
	"Organizations created by you:" : "Đ˘Đ˛ĐľŃ�Đµ ĐľŃ€ĐłĐ°Đ˝Đ¸Đ·Đ°Ń†Đ¸Ń�Đµ:",
	"You have not created any organization yet." : "ĐťĐµĐĽĐ°Ń‚Đµ Đ˝Đ¸Ń�ĐµĐ´Đ˝Ń� ĐľŃ€ĐłĐ°Đ˝Đ¸Đ·Đ°Ń†Đ¸Ń�Ń�.",


// career-path
	"General manager" : "ĐśĐµĐ˝Đ°ŃźĐµŃ€",
	"Hard worker" : "Đ’Ń€ĐµĐ´Đ°Đ˝ Ń€Đ°Đ´Đ˝Đ¸Đş",


// ranking
	"No." : "Đ‘Ń€ĐľŃ�",
	"Hard worker" : "Đ’Ń€ĐµĐ´Đ°Đ˝ Ń€Đ°Đ´Đ˝Đ¸Đş",


// messages
        "Inbox" : "ĐźŃ€Đ¸ĐĽŃ™ĐµĐ˝Đµ",
	"Sent" : "ĐźĐľŃ�Đ»Đ°Ń‚Đµ",
	"Alerts" : "Đ�Đ·Đ˛ĐµŃ�Ń‚Đ°Ń�Đ¸",
	"Subscriptions" : "ĐźŃ€ĐµŃ‚ĐżĐ»Đ°Ń‚Đµ",
	"new article" : "ĐťĐľĐ˛ Ń‡Đ»Đ°Đ˝Đ°Đş",
	"Write article" : "ĐťĐ°ĐżĐ¸Ń�Đ¸ Ń‡Đ»Đ°Đ˝Đ°Đş",
	"Edit newspaper details" : "ĐŁŃ€ĐµĐ´Đ¸ Đ´ĐµŃ‚Đ°Ń™Đµ Đ˝ĐľĐ˛Đ¸Đ˝Đ°",
	"Edit" : "ĐŁŃ€ĐµĐ´Đ¸",
	"Delete" : "Đ�Đ·Đ±Ń€Đ¸Ń�Đ¸",
	"Read Message" : "ĐźŃ€ĐľŃ‡Đ¸Ń‚Đ°Ń�",
	"Reply" : "ĐžĐ´ĐłĐľĐ˛ĐľŃ€Đ¸",
	"From" : "ĐžĐ´",
	"Back" : "Đ’Ń€Đ°Ń‚Đ¸ Ń�Đµ",
	"Picture" : "ĐˇĐ»Đ¸ĐşĐ°",
	"only JPG files allowed" : "Đ”ĐľĐ·Đ˛ĐľŃ™ĐµĐ˝Đµ Ń�Ń� Ń�Đ°ĐĽĐľ JPG Ń�Đ»Đ¸ĐşĐµ",
	"Publish" : "ĐžĐ±Ń�Đ°Đ˛Đ¸",
	"of" : " ĐľĐ´ ",
	"Select all" : "ĐžĐ·Đ˝Đ°Ń‡Đ¸ Ń�Đ˛Đµ",
	"Select All" : "ĐžĐ·Đ˝Đ°Ń‡Đ¸ Ń�Đ˛Đµ",
	"Delete" : "Đ�Đ·Đ±Ń€Đ¸Ń�Đ¸",
	"Older" : "ĐˇŃ‚Đ°Ń€Đ¸Ń�Đµ",
	"Newer" : "ĐťĐľĐ˛Đ¸Ń�Đµ",
	"After 5 days the alerts are automatically deleted" : "ĐźĐľŃ�Đ»Đµ 5 Đ´Đ°Đ˝Đ° Ń�Đ˛Đµ ĐżĐľŃ€Ń�ĐşĐµ Ń›Đµ Đ±Đ¸Ń‚Đ¸ Đ°Ń�Ń‚ĐľĐĽĐ°Ń‚Ń�ĐşĐ¸ ĐľĐ±Ń€Đ¸Ń�Đ°Đ˝Đµ",
	"Unsubscribe" : "ĐžŃ‚ĐşĐ°Đ¶Đ¸ ĐżŃ€ĐµŃ‚ĐżĐ»Đ°Ń‚Ń�",
	"Weekly news" : "ĐťĐµĐ´ĐµŃ™Đ˝Đµ Đ˛ĐµŃ�Ń‚Đ¸",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in  eRepublik" : "ĐťĐµĐ´ĐµŃ™Đ˝Đµ ĐżĐľŃ€Ń�ĐşĐµ Đ˝Đ°Ń�Đ±ĐľŃ™Đµ ĐľŃ†ĐµŃšĐµĐ˝Đ¸Ń… Đ˛ĐµŃ�Ń‚Đ¸, Đ°ĐşŃ‚Đ¸Đ˛Đ˝Đ¸ Ń€Đ°Ń‚ĐľĐ˛Đ¸, Đ˛ĐľŃ�Đ˝Đ¸ Đ´ĐľĐłĐ°Ń’Đ°Ń�Đ¸ Đ¸ Ń‚ĐľĐż ĐżĐµŃ‚ Đ·ĐµĐĽĐ°Ń™Đ° ĐµĐ ĐµĐżŃ�Đ±Đ»Đ¸ĐşĐµ",
	"show example" : "ĐżŃ€Đ¸ĐĽĐµŃ€",
	"Turn OFF" : "Đ�Ń�ĐşŃ™Ń�Ń‡Đ¸",
	"Turn ON" : "ĐŁĐşĐ»Ń�Ń‡Đ¸",


// flash menu
	"My places > Army" : "Đ’ĐľŃ�Ń�ĐşĐ°",
	"My places > Party" : "ĐźĐ°Ń€Ń‚Đ¸Ń�Đ°",
	"My places > Newspaper" : "ĐťĐľĐ˛Đ¸Đ˝Đµ",
	"My places > Organizations" : "ĐžŃ€ĐłĐ°Đ˝Đ¸Đ·Đ°Ń†Đ¸Ń�Đµ",
	"My places > Advertising Department" : "Đ ĐµĐşĐ»Đ°ĐĽĐ¸Ń€Đ°ŃšĐµ",
	"Create party" : "ĐžŃ�Đ˝Ń�Ń� ĐżĐ°Ń€Ń‚Đ¸Ń�Ń�",
	"Monetary Market" : "ĐśĐµŃšĐ°Ń‡Đ˝Đ¸Ń†Đ°",
	"Company market" : "Đ¤Đ¸Ń€ĐĽĐµ Đ˝Đ° ĐżŃ€ĐľĐ´Đ°Ń�Ń�",
	"Create company" : "ĐžŃ�Đ˝Ń�Ń� ĐşĐľĐĽĐżĐ°Đ˝Đ¸Ń�Ń�",
	"Top Citizens" : "ĐťĐ°Ń�Đ±ĐľŃ™Đ¸ Đ¸ĐłŃ€Đ°Ń‡Đ¸",
	"Compose message" : "ĐťĐľĐ˛Đ° ĐżĐľŃ€Ń�ĐşĐ°",
	"Shout something" : "Đ�Đ·Ń�Đ°Đ˛Đ¸ Đ˝ĐµŃ�Ń‚Đľ",


// compose message
	"To" : "Đ”Đľ: ",
	"Subject" : "ĐťĐ°Ń�Đ»ĐľĐ˛",
	"Message" : "ĐźĐľŃ€Đ°ĐşĐ°",
	"Send" : "ĐźĐľŃ�Đ°Ń™Đ¸",


// new company
	"Company details" : "Đ”ĐµŃ‚Đ°Ń™Đ¸ Ń„Đ¸Ń€ĐĽĐµ",
	"Company name" : "Đ�ĐĽĐµ Ń„Đ¸Ń€ĐĽĐµ",
	"Company logo" : "Đ›ĐľĐłĐľ Ń„Đ¸Ń€ĐĽĐµ",
	"Disscusion area" : "ĐžĐ±Đ»Đ°Ń�Ń‚ Đ´Đ¸Ń�ĐşŃ�Ń�Đ¸Ń�Đµ",
	"Create" : "ĐžŃ�Đ˝Ń�Ń�",
	"Choose industry" : "ĐžĐ´Đ±ĐµŃ€Đ¸ Đ¸Đ˝Đ´Ń�Ń�Ń‚Ń€Đ¸Ń�Ń�",
	"Please choose the industry" : "ĐžĐ´Đ±ĐµŃ€Đ¸ Đ¸Đ˝Đ´Ń�Ń�Ń‚Ń€Đ¸Ń�Ń�.",


// monetary market
	"Exchange rate" : "ĐšŃ�Ń€Ń�",
	"Amount to buy" : "ĐšĐľĐ»Đ¸Ń‡Đ¸Đ˝Đ°",
	"Rec exchange rate" : "ĐźŃ€ĐµĐżĐľŃ€Ń�Ń‡ĐµĐ˝ ĐşŃ�Ń€Ń�",
	"Sell" : "ĐźŃ€ĐľĐ´Đ°Ń�",
	"Show my offers" : "ĐśĐľŃ�Đµ ĐżĐľĐ˝Ń�Đ´Đµ",
	"Post new offer" : "ĐťĐľĐ˛Đ° ĐżĐľĐ˝Ń�Đ´Đ°",

// partija
	"Your account" : "Đ˘Đ˛ĐľŃ� Ń€Đ°Ń‡Ń�Đ˝: ",
	"Requirements" : "Đ—Đ°Ń…Ń‚ĐµĐ˛Đ¸",
	"Cost" : "Đ¦ĐµĐ˝Đ°",
	"Party details" : "Đ”ĐµŃ‚Đ°Ń™Đ¸ Đ·Đ° ĐżĐ°Ń€Ń‚Đ¸Ń�Ń�",
	"Party name" : "Đ�ĐĽĐµ ĐżĐ°Ń€Ń‚Đ¸Ń�Đµ",
	"Economical orientation" : "Đ•ĐşĐľĐ˝ĐľĐĽŃ�ĐşĐ° ĐľŃ€Ń�ĐµĐ˝Ń‚Đ°Ń†Đ¸Ń�Đ°",
	"Social orientation" : "ĐˇĐľŃ†Đ¸Ń�Đ°Đ»Đ˝Đ° ĐľŃ€Ń�ĐµĐ˝Ń‚Đ°Ń†Đ¸Ń�Đ°",
	"Party logo" : "Đ›ĐľĐłĐľ ĐżĐ°Ń€Ń‚Đ¸Ń�Đµ",
	"Disscusion area " : "ĐžĐ±Đ»Đ°Ń�Ń‚ Đ·Đ° Đ´Đ¸Ń�ĐşŃ�Ń�Đ¸Ń�Ń�",
	"Create" : "ĐžŃ�Đ˝Ń�Ń� ĐżĐ°Ń€Ń‚Đ¸Ń�Ń�",
	"6-30 characters max" : "ĐľĐ´ 6 Đ´Đľ 30 Đ·Đ˝Đ°ĐşĐľĐ˛Đ°",
	"Please choose your party`s economical orientation" : "ĐžĐ´Đ±ĐµŃ€Đ¸Ń‚Đµ ĐµĐşĐľĐ˝ĐľĐĽŃ�ĐşŃ� ĐľŃ€Đ¸ĐµĐ˝Ń‚Đ°Ń†Đ¸Ń�Ń� ĐżĐ°Ń€Ń‚Đ¸Ń�Đµ",
	"Please choose your party`s social orientation" : "ĐžĐ´Đ±ĐµŃ€Đ¸Ń‚Đµ Ń�ĐľŃ†Đ¸Ń�Đ°Đ»Đ˝Ń� ĐľŃ€Đ¸ĐµĐ˝Ń‚Đ°Ń†Đ¸Ń�Ń� ĐżĐ°Ń€Ń‚Đ¸Ń�Đµ",
	"Far-left" : "Đ Đ°Đ´Đ¸ĐşĐ°Đ»Đ˝Đ° Đ»ĐµĐ˛Đ¸Ń†Đ°",
	"Center-left" : "Đ›ĐµĐ˛Đľ ĐľĐ´ Ń†ĐµĐ˝Ń‚Ń€Đ°",
	"Center" : "Đ¦ĐµĐ˝Ń‚Đ°Ń€",
	"Center-right" : "Đ”ĐµŃ�Đ˝Đľ ĐľĐ´ Ń†ĐµĐ˝Ń‚Ń€Đ°",
	"Far-right" : "Đ Đ°Đ´Đ¸ĐşĐ°Đ»Đ˝Đ° Đ´ĐµŃ�Đ˝Đ¸Ń†Đ°",
	"Totalitarian" : "Đ˘ĐľŃ‚Đ°Đ»Đ¸Ń‚Đ°Ń€Đ˝Đ°",
	"Authoritarian" : "Đ�Ń�Ń‚ĐľŃ€Đ¸Ń‚Đ°Ń‚Đ¸Đ˛Đ˝Đ°",
	"Libertarian" : "Đ›Đ¸Đ±ĐµŃ€Đ°Đ»Đ˝Đ°",
	"Anarchist" : "Đ�Đ˝Đ°Ń€Ń…Đ¸Ń�Ń‚Đ¸Ń‡ĐşĐ°",


// invitations
	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Đ”ĐľĐ±Đ¸Ń›ĐµŃ� ĐżĐľ 5 Đ·Đ»Đ°Ń‚Đ˝Đ¸ĐşĐ° Đ·Đ° Ń�Đ˛Đ°ĐşĐľĐł ĐżŃ€Đ¸Ń�Đ°Ń‚ĐµŃ™Đ° ĐşĐľĐł ĐżĐľĐ·ĐľĐ˛ĐµŃ� Đ¸ ĐżĐľĐĽĐľĐłĐ˝ĐµŃ� ĐĽŃ� Đ´Đ° Đ´ĐľŃ�Ń‚Đ¸ĐłĐ˝Đµ Đ˝Đ¸Đ˛Đľ 6. ",
	"Your personal invitation link" : "Đ˘Đ˛ĐľŃ� Đ»Đ¸Ń‡Đ˝Đ¸ Đ»Đ¸Đ˝Đş Đ·Đ° ĐżĐľĐ·Đ¸Đ˛Đ˝Đ¸Ń†Đµ",
	"Post this link on forums, blogs, messenger status or send it by yourself via email. People that  register using your personal link will get you 5 Gold when they reach level 6." : "ĐšĐľŃ€Đ¸Ń�Ń‚Đ¸ Ń�Đ˛ĐľŃ� Đ»Đ¸Đ˝Đş Đ˝Đ° Ń„ĐľŃ€Ń�ĐĽĐ¸ĐĽĐ°, Đ±Đ»ĐľĐłĐľĐ˛Đ¸ĐĽĐ°, ĐżŃ€ĐľĐłŃ€Đ°ĐĽĐ¸ĐĽĐ° Đ·Đ° Ń‡ĐµŃ‚ĐľĐ˛Đ°ŃšĐµ Đ¸Đ»Đ¸ ĐżĐľŃ�Đ°Ń™Đ¸ ĐłĐ° ĐżŃ€ĐµĐşĐľ email-Đ°.",
	"Send email invite" : "ĐźĐľŃ�Đ°Ń™Đ¸ ĐżĐľĐ·Đ¸Đ˛Đ˝Đ¸Ń†Ń� email-ĐľĐĽ",
	"Your name:" : "Đ˘Đ˛ĐľŃ�Đµ Đ¸ĐĽĐµ: ",
	"Your friend's email:" : "Email ĐżŃ€Đ¸Ń�Đ°Ń‚ĐµŃ™Đ°: ",
	"Use commas to separate multiple email addresses" : "ĐšĐľŃ€Đ¸Ń�Ń‚Đ¸Ń‚Đµ Đ·Đ°Ń€ĐµĐ·Đµ Đ´Đ° Đ±Đ¸Ń�Ń‚Đµ ĐľĐ´Đ˛ĐľŃ�Đ¸Đ»Đ¸ Đ˛Đ¸Ń�ĐµŃ�Ń‚Ń€Ń�ĐşĐµ Đ°Đ´Ń€ĐµŃ�Đµ ",
	"Invites status" : "ĐˇŃ‚Đ°Ń‚Ń�Ń� ĐżĐľĐ·Đ¸Đ˛Đ˝Đ¸Ń†Đµ",
	"View the status of your invites and bonuses" : "Đ’Đ¸Đ´Đ¸ Ń�Ń‚Đ°Ń‚Ń�Ń� Ń‚Đ˛ĐľŃ�Đ¸Ń… ĐżĐľĐ·Đ¸Đ˛Đ˝Đ¸Ń†Đ° Đ¸ Đ±ĐľĐ˝Ń�Ń�Đµ",
	"Track invites" : "Đ’Đ¸Đ´Đ¸ ĐżĐľĐ·Đ¸Đ˛Đµ",
	"Send invitation" : "ĐźĐľŃ�Đ°Ń™Đ¸ ĐżĐľĐ·Đ¸Đ˛",
	"Add from address book" : "Đ”ĐľĐ´Đ°Ń� Ń� Đ°Đ´Ń€ĐµŃ�Đ°Ń€",
	"Add from adressbook" : "Đ”ĐľĐ´Đ°Ń� Ń� Đ°Đ´Ń€ĐµŃ�Đ°Ń€",
	"Yahoo username" : "ĐšĐľŃ€Đ¸Ń�Đ˝Đ¸Ń‡ĐşĐľ Đ¸ĐĽĐµ Đ˝Đ° Yahoo",
	"Yahoo password" : "Đ›ĐľĐ·Đ¸Đ˝ĐşĐ° Đ˝Đ° Yahoo",
	"GMail username" : "ĐšĐľŃ€Đ¸Ń�Đ˝Đ¸Ń‡ĐşĐľ Đ¸ĐĽĐµ Đ˝Đ° GMail",
	"GMail password" : "Đ›ĐľĐ·Đ¸Đ˝ĐşĐ° Đ˝Đ° GMail",
	"MSN username" : "ĐšĐľŃ€Đ¸Ń�Đ˝Đ¸Ń‡ĐşĐľ Đ¸ĐĽĐµ Đ˝Đ° MSN",
	"MSN password" : "Đ›ĐľĐ·Đ¸Đ˝ĐşĐ° Đ˝Đ° MSN",
	"AOL username" : "ĐšĐľŃ€Đ¸Ń�Đ˝Đ¸Ń‡ĐşĐľ Đ¸ĐĽĐµ Đ˝Đ° AOL",
	"AOL password" : "Đ›ĐľĐ·Đ¸Đ˝ĐşĐ° Đ˝Đ° AOL",
	"Get contacts" : "Đ”ĐľĐ´Đ°Ń� Đ·Đ° ĐżŃ€Đ¸Ń�Đ°Ń‚ĐµŃ™Đ°",
	"* Your username and password will not be stored on this server." : "* ĐšĐľŃ€Đ¸Ń�Đ˝Đ¸Ń‡ĐşĐľ Đ¸ĐĽĐµ Đ¸ Đ»ĐľĐ·Đ¸Đ˝ĐşĐ° ĐľĐ´ email Ń�ĐµŃ€Đ˛Đ¸Ń�Đ° Đ˝ĐµŃ›Đµ Đ±Đ¸Ń‚Đ¸ Ń�Đ°Ń‡Ń�Đ˛Đ°Đ˝Đ¸ Đ˝Đ° ĐľĐ˛ĐľĐĽ Ń�ĐµŃ€Đ˛ĐµŃ€Ń�.",
	"Privacy" : "ĐźĐľĐ»Đ¸Ń�Đ° Đ·Đ° ĐżŃ€Đ¸Đ˛Đ°Ń‚Đ˝ĐľŃ�Ń‚",
	"Close" : "Đ—Đ°Ń‚Đ˛ĐľŃ€Đ¸",


// menu	
	"Find out more" : "ĐˇĐ°Đ·Đ˝Đ°Ń� Đ˛Đ¸Ń�Đµ",
	"logout" : "ĐžĐ´Ń�Đ°Đ˛Đ°",


// tools
	"Badges" : "Đ‘ĐµŃźĐµĐ˛Đ¸",
	"Size:" : "Đ”Đ¸ĐĽĐµĐ˝Đ·Đ¸Ń�Đµ:",
	"Code:" : "ĐšĐľĐ´:",
	"Vectorial logo is available in the" : "Đ’ĐµĐşŃ‚ĐľŃ€Ń�ĐşĐ¸ Đ»ĐľĐłĐľ Ń�Đµ Đ´ĐľŃ�Ń‚Ń�ĐżĐ°Đ˝ Đ·Đ° ",
	"Press" : "ĐźĐµŃ‡Đ°Ń‚",
	"section" : "",
	"Latest shouts" : "ĐźĐľŃ�Đ»ĐµĐ´ŃšĐµ Đ¸Đ·Ń�Đ°Đ˛Đµ",
	"Latest alliances" : "ĐźĐľŃ�Đ»ĐµĐ´ŃšĐ¸ Ń�Đ°Đ˛ĐµĐ·Đ¸",
	"Latest wars" : "ĐźĐľŃ�Đ»ĐµĐ´ŃšĐ¸ Ń€Đ°Ń‚ĐľĐ˛Đ¸",
	"Latest military events" : "ĐźĐľŃ�Đ»ĐµĐ´ŃšĐ¸ Đ˛ĐľŃ�Đ˝Đ¸ Đ´ĐľĐłĐ°Ń’Đ°Ń�Đ¸",


// dolno meni
	"Blog" : "Đ‘Đ»ĐľĐł",
	"Shop" : "ĐźŃ€ĐľĐ´Đ°Đ˛Đ˝Đ¸Ń†Đ°",
	"Contact" : "ĐšĐľĐ˝Ń‚Đ°ĐşŃ‚",
	"Jobs" : "Đ Đ°Đ´Đ˝Đ° ĐĽĐµŃ�Ń‚Đ°",
	"Affiliates" : "ĐźĐ°Ń€Ń‚Đ˝ĐµŃ€Đ¸",
	"eRepublik Laws" : "Đ—Đ°ĐşĐľĐ˝Đ¸ Đ˝Đ° ĐµĐ ĐµĐżŃ�Đ±Đ»Đ¸ĐşĐ°",


// extras
	"from" : "ĐľĐ´",
	"2 Gold" : "2 Đ·Đ»Đ°Ń‚Đľ",
	"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to  buy additional features within eRepublik." : "Đ—Đ»Đ°Ń‚Đľ Ń� ĐµĐ ĐµĐżŃ�Đ±Đ»Đ¸ĐşĐ° Ń�Đµ ĐłĐ»Đ°Đ˛Đ˝Đ° Ń€ĐµŃ„ĐµŃ€ĐµĐ˝Ń‚Đ˝Đ° Đ˛Đ°Đ»Ń�Ń‚Đ° Đ·Đ° Ń�Đ˛Đµ Đ˛Đ¸Ń€Ń‚Ń�ĐµĐ»Đ˝Đµ Đ»ĐľĐşĐ°Đ»Đ˝Đµ Đ˛Đ°Đ»Ń�Ń‚Đµ Đ¸ ĐşĐľŃ€Đ¸Ń�Ń‚Đ¸ Ń�Đµ Đ·Đ° Đ´ĐľĐ´Đ°Ń‚Đ˝Đµ ĐĽĐľĐłŃ�Ń›Đ˝ĐľŃ�Ń‚Đ¸ Ń� Đ¸ĐłŃ€Đ¸.",
	"Select amount" : "ĐžĐ´Đ±ĐµŃ€Đ¸ ĐşĐľĐ»Đ¸Ń‡Đ¸Đ˝Ń�",
	"Payments can be done in USD as well." : "ĐŁĐżĐ»Đ°Ń‚Ń� ĐĽĐľĐ¶ĐµŃ‚Đµ Đ¸Đ·Đ˛Ń€Ń�Đ¸Ń‚Đ¸ Đ¸ Ń� Đ°ĐĽĐµŃ€Đ¸Ń‡ĐşĐ¸ĐĽ Đ´ĐľĐ»Đ°Ń€Đ¸ĐĽĐ°.",
	"is a fictional currency used only in the eRepublik World." : " Ń�Đµ Đ¸Đ·ĐĽĐ¸Ń�Ń™ĐµĐ˝Đ° Đ˛Đ°Đ»Ń�Ń‚Đ° ĐşĐľŃ�Đ° Ń�Đµ ĐşĐľŃ€Đ¸Ń�Ń‚Đ¸ Ń�Đ°ĐĽĐľ Ń� ĐľĐ˛ĐľĐĽ Đ˛Đ¸Ń€Ń‚Ń�ĐµĐ»Đ˝ĐľĐĽ Ń�Đ˛ĐµŃ‚Ń�.",
	"I have read and agree with the" : " ĐźŃ€ĐľŃ‡Đ¸Ń‚Đ°Đľ Ń�Đ°ĐĽ Đ¸ Ń�Đ»Đ°Đ¶ĐµĐĽ Ń�Đµ Ń� Ń‚Đ¸ĐĽ ",
	"You must read and agree with the Terms of service in order to complete your order." : "Đ”Đ° Đ±Đ¸ ĐżŃ€Đ¸ĐĽĐ¸Đ»Đ¸ Đ˛Đ°Ń�Ń� ĐżĐľŃ€Ń�ŃźĐ±Đ¸Đ˝Ń� ĐĽĐľŃ€Đ°Ń‚Đµ Đ´Đ° Ń�Đµ Ń�Đ»ĐľĐ¶Đ¸Ń‚Đµ Ń�Đ° ĐżŃ€Đ°Đ˛Đ¸Đ»Đ¸ĐĽĐ° ĐşĐľŃ€Đ¸Ń�Ń‚ĐµŃšĐ°.",
	"Terms of Service" : "ĐźŃ€Đ°Đ˛Đ¸Đ»Đ° ĐşĐľŃ€Đ¸Ń�Ń‚ĐµŃšĐ°",
	"Go to eRepublik" : "Đ’Ń€Đ°Ń‚Đ¸ Ń�Đµ Đ˝Đ° ĐµĐ ĐµĐżŃ�Đ±Đ»Đ¸Đş"*/
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
//regexps["^(\\d*) allies(\\s*)$"] = "$1 ";
regexps["^Active wars in (.*)$"] = "Aktywne wojny w $1";
//regexps["^Active resistance wars in (.*)$"] = "$1";
regexps["(\\s*)Expires in (\\d*) days"] = "Wygasa za: $2 dni";
//regexps["^(\\d*) days$"] = "$1 dni";
regexps["^(\\d*) comments$"] = "$1 komentarzy";
regexps["^(\\d*) hour ago$"] = "$1 godzinę temu";
regexps["^(\\d*) hours ago$"] = "$1 godziny temu";
regexps["^(\\d*) minutes ago$"] = "$1 minut(y) temu";
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
    "span":"", "select":"", "option":"", "input":"", "a":"", "h2":"", "th":"", "td":"", "p":"", "strong":"",  "div":"", "embed":""
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



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('tbody, .dotted, .core { font-size: 12px ! important; }');
addGlobalStyle('.quarterhead { font-size: 11px ! important; }');
addGlobalStyle('.x { font-size: 24px ! important; }');
addGlobalStyle('#menu ul li#menu1 a, #menu ul li#menu2 a, #menu ul li#menu3 a, #menu ul li#menu4 a, #menu ul  li#menu5 a, #logo a { background-image: url(http://img33.imageshack.us/img33/5638/maperepubliklogged.png); }');
addGlobalStyle('.btnGetExtraStorage { font-size: 10px; }');



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(3000, translateWholePage)
}, false);