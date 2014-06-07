// ==UserScript==
// @name           eRepublik - Popoln prevod v slovenščino
// @namespace      
// @description    Prevod 
// @version        1
// @include        http://*.erepublik.com/*
// ==/UserScript==

var strings = {
// translations
        "Health Kit" : "Paket Zdravja"
        "Total cost:" : "Cena:"
        "Your account" : "Tvoj račun"
        "Health:" : "Zdravje:"
        "Track your gold bonus" : "Poglej svoj bonus zlata"
        "Citizen name" : "Ime državljana"
        "Experience level" : "Stopnja"
        "Collected Gold" : "Zbrano zlato"
        "Invite your friends" : "Povabi svoje prijatelje"
        "Treasure Maps are awarded for:" : "Zemljevidi zakladov se dobijo za:"
        "Use a Treasure Map" : "Uporabi zemljevid zakladov"
        "no maps" : "ni zemljevidov"
        "Go to eRepublik" : "Pojdi na eRepublik"
        "My places" : "Moja mesta"
        "Market" : "Trg"
        "Info" : "Informacije"
        "Community" : "Skupnost"
        "Gold and Extras" : "Zlato ter Dodatki"
        "Country stats" : "Status države"
        "World map" : "Zemljevid sveta"
        "Shouts" : "Vzkliki"
        "Shout" : "Vzklikni"
        "Uptown" : "Predmestje"
        "Downtown" : "Center"
        "Company" : "Podjetje"
        "Training grounds" : "Trening"
        "Library" : "Knjižnica"
        "Residential district" : "Stanovanjska četrt"
        "Party" : "Stranka"
        "Newspaper" : "Časopis"
        "Organization" : "Organizacija"
        "Chat rooms" : "Klepetalnice"
        "Report shout" : "Prijavi vzklik"
        "What others are saying about eRepublik" : "Kaj drugi pravijo o eRepubliku"
	"+20 Wellness / 2 Gold" : "+10 Zdravja / 2 Zlatnika",
	"% of votes" : "% glasov",
	"6-30 characters max" : "6-30 znakov",
	"A newspaper is an efficient way to communicate your news to the Erepublik world. Read more on the Erepublik wiki. Create your own newspaper." : "Časopisi so učinkovit način komunikacije z eRepublik svetom. Preberite več na Wiki straneh eRepublike. Ustvarite svoj časopis.",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Časopisi so učinkovit način komunikacije z eRepublik svetom. Preberite več na Wiki straneh eRepublike. Ustvarite svoj časopis.",
	"ACCEPTED" : "SPREJET",
	"Accepted" : "Sprejet",
	"Accounts" : "Račun",
	"Achievements" : "Dosežki",
	"active battles " : "aktivnih bitk",
	"Active wars list" : "Spisek aktivnih vojn",
	"Add a job offer" : "Dodaj ponudbo za službo",
	"Add as a friend" : "Dodaj kot prijatelja",
	"Administration" : "Administracija",
	"ADMINISTARATION CENTER" : "CENTER",
	"Advanced 5 strength levels" : "Napredoval 5 nivojev moči",
	"Advertising Department" : "Oglasi",
	"Affiliates" : "Sodelavci",
	"Alerts" : "Opozorila",
	"All accounts" : "Vse valute",
	"All Alliances" : "Vsa zavezništva",
	"All countries" : "Vse države",
	"All donations" : "Vse donacije",
	"all donations" : "vse donacije",
	"All employees" : "Zaposleni",
	"All levels" : "Vsi nivoji",
	"All regions" : "Vse regije",
	"All resistance wars" : "Vsi odporniški boji",
	"All skills" : "Vsi nivoji",
	"All wars" : "Vse vojne",
	"Alliance" : "Zavezništvo",
	"Alliances" : "Zavezništva",
	"Amazing fight" : "Neverjeten boj",
	"Amazing fight, Private!" : "Neverjeten boj, vojak!",
	"Amazing fight, Corporal!" : "Neverjeten boj, desetnik!",
	"Amazing fight, Sergeant!" : "Neverjeten boj, vodnik!",
	"Amazing fight, Lieutenant!" : "Neverjeten boj, poročnik!",
	"Amazing fight, Captain!" : "Neverjeten boj, stotnik!",
	"Amazing fight, Colonel!" : "Neverjeten boj, polkovnik!",
	"Amazing fight, General!" : "Neverjeten boj, general!",
	"Amazing fight, Field Marshall!" : "Neverjeten boj, feldmaršal!",
	"Ambassador" : "Veleposlanik",
	"Amount" : "Količina",
	"Amount to buy" : "Količina za nakup",
	"Anarchist" : "Anarhist",
	"Apply" : "Sprejmi",
	"Approved" : "Odobreno",
	"Approved on" : "Odobreno dne",
	"Approved by" : "Odobril",
	"Argentina" : "Argentina",
	"Army" : "Vojska",
	"Article" : "Članek",
	"Article RSS" : "RSS članek",
	"Assets" : "Imetje",
	"Attackable on President's decision" : "Lahko se napade po ukazu predsednika",
	"Attention: NO VAT tax for Raw materials" : "Pozor: ni DDV na surovine",
	"August" : "Avgust ",
	"Australia" : "Avstralija",
	"Austria" : "Avstrija",
	"Average" : "Povprečna",
	"Average Citizen level" : "Povprečni nivo eDržavljana",
	"Average citizen level" : "Povprečni nivo eDržavljana",
	"Average strength" : "Povprečna moč",
	"Back" : "Nazaj",
	"Back to army" : "Nazaj",
	"Back to battlefield" : "Na bojišče",
	"Barbaric fight, Private!" : "Barbarski boj, vojak!",
	"Barbaric fight, Corporal!" : "Barbarski boj, desetnik!",
	"Barbaric fight, Sergeant!" : "Barbarski boj, vodnik!",
	"Barbaric fight, Lieutenant!" : "Barbarski boj, poročnik!",
	"Barbaric fight, Captain!" : "Barbarski boj, stotnik!",
	"Barbaric fight, Colonel!" : "Barbarski boj, polkovnik!",
	"Barbaric fight, General!" : "Barbarski boj, general!",
	"Barbaric fight, Field Marshall!" : "Divlja borba, feldmaršal!",
	"Basic damage" : "Osnovna škoda",
	"Battle Hero" : "Heroj bitke",
	"Battle History" : "Zgodovina bitke",
	"Battle history" : "Zgodovina bitke",
	"Belgium" : "Belgija",
	"Bio" : "Življenjepis",
	"Bolivia" : "Bolivija",
	"BORDER AREA" : "MEJNO OBMOČJE",
	"Bosnia and Herzegovina" : "Bosna in Hercegovina",
	"Brazil" : "Brazilija",
	"Bulgaria" : "Bolgarija",
	"Buy" : "Kupi",
	"Buy Constructions" : "Kupi zgradbe",
	"Buy Constructions: Defense System" : "Kupi zgradbo: Obrambni sistem",
	"Buy Constructions: Hospital" : "Kupi zgradbo: Bolnišnica",
	"Buy export license" : "Kupi izvozno licenco",
	"Buy extra storage" : "Kupi dodatni prostor",
	"Buy from market" : "Kupi podjetje",
	"Buy market license" : "Kupi licenco za trg",
	"Buy raw materials" : "Kupi surovine",
	"Buy wellness" : "Kupi zdravje",
	"Buy Wellness Box" : "Kupi paket zdravja",
	"Canada" : "Kanada",
	"Candidate" : "Kandidat",
	"CAPITAL" : "PRESTOLNICA",
	"Captain" : "Stotnik",
	"CAPTURED" : "OSVOJENO",
	"Career" : "Kariera",
	"Career path" : "Razvoj kariere",
	"Center" : "Centralna",
	"Change" : "Spremeni",
	"Change the location of your newspaper" : "Spremeni lokacijo časopisa",
	"Change password" : "Spremeni geslo",
	"Change residence" : "Spremeni prebivališče",
	"Check your unlocked features" : "Preglej odklenjene možnosti",
	"Chile" : "Čile",
	"China" : "Kitajska",
	"Citizen" : "Državljan",
	"Citizen Avatar" : "Podoba",
	"Citizen fee" : "Denar za začetnike",
	"Citizen permanently suspended for multiple accounts." : "Državljan trajno suspendiran zaradi večih računov.",
	"Citizens" : "Državljani",
	"Citizenship" : "Državljanstvo",
	"Citizenship applications" : "Prošnje za državljanstvo",
	"Citizenship requests" : "Zahtevhi za državljanstvo",
	"CITY" : "MESTO",
	"Collect" : "Poberi",
	"Colombia" : "Kolumbija", 
	"Colonel" : "Polkovnik",
	"Come back tomorrow." : "Vrni se jutri.",
	"Companies" : "Podjetja",
	"Companies for sale" : "Podjetja na prodaj",
	"Company" : "Podjetje", 
	"Company accounts" : "Imetje podjetja", 
	"Company details" : "Podatki o podjetju",
	"Company page" : "Stran podjetja",
	"Company market" : "Podjetja na prodaj",
	"Company logo" : "Logotip podjetja",
	"Company name" : "Ime podjetja",
	"Community" : "Skupnost",
	"Conquer" : "Osvojeno",
	"Congress" : "Kongres",
	"Congress Elections" : "Kongresne volitve",
	"Congress Member" : "Kongresnik",
	"Congress member candidates" : "Kandidati za kongres",
	"Constructions": "Gradbeništvo",
	"Contact": "Kontakt",
	"Copyright" : "Pravice",
	"Corporal" : "Desetnik",
	"Corporate career" : "Zaposlitev",
	"Cost" : "Cena", 
	"Countries" : "Države",
	"Country" : "Država",
	"Country - Society" : "Država - Družba",
	"Country Administration" : "Administracija države",
	"Country administration" : "Administracija države",
	"Country Presidency" : "Predsedstvo države",
	"Country presidency" : "Predsedstvo države",
	"Country President" : "Predsednik države",
	"Country trading embargoes" : "Trgovski embargi države",
	"Create" : "Kreiraj",
	"Create company" : "Odpri novo podjetje",
	"Create new" : "Odpri novo",
	"Create new company" : "Odpri novo podjetje",
	"Croatia" : "Hrvaška",
	"Current location" : "Trenutno prebivališče",
	"Current password" : "Trenutno geslo",
	"Czech Republic" : "Češka republika",
	"Day" : "Dan ",
	"days ago" : "dni od",
	"Daily salary" : "Dnevna plača",
	"Dead citizen" : "Mrtev državljan",
	"Debate Area" : "Razprava na temo",
	"December" : "December",
	"Declare War" : "Napovej vojno",
	"Defense Points" : "Obrambne točke",
	"Defense System" : "Obrambni sistem",
	"Defense system" : "Obrambni sistem",
	"defense system" : "Obrambni sistem",
	"Delete" : "Izbriši",
	"Denmark" : "Danska",
	"details" : "podrobnosti",
	"Diamonds" : "Diamanti",
	"diamonds" : "diamanti",
	"Disscusion area" : "Domača stran",
	"Donate" : "Doniraj",
	"Donate Gold" : "Doniraj zlato",
	"Donate raw materials" : "Doniraj surovine",
	"Donation" : "Donacija",
	"Donations list" : "Spisek donacij",
	"Drag and drop items from your inventory to the donation area" : "Povleči predmete iz skladišča v prostor za donacije.",
	"Economic stats" : "Gospodarski podatki",
	"Economical orientation" : "Gospodarska usmeritev",
	"Economy" : "Gospodarstvo",
	"Edit" : "Uredi",
	"Edit details" : "Uredi podrobnosti",
	"Edit newspaper details" : "Uredi podatke o časopisu",
	"edit profile" : "uredi profil",
	"Edit profile" : "Uredi profil",
	"Edit Profile" : "Uredi Profil",
	"Election results" : "Rezultati volitev",
	"Election" : "Volitve",
	"Elections" : "Volitve",
	"Email must be valid for registration, so do not cheat" : "E-mail mora biti veljaven za registracijo...brez goljufanja!",
	"Employee" : "Zaposlen",
	"Employees" : "Zaposleni",
	"eRepublik Birthday" : "eRepublik rojstni dan",
	"Erepublik Age" : "eRepublik starost",
	"eRepublik Laws" : "eRepublik zakoni",
	"Estonia" : "Estonija",
	"Everyone" : "Vsi",
	"Exchange rate" : "Tečaj",
	"Experience" : "Izkušnje",
	"Experience points" : "Točke izkušenj",
	"Expires tomorrow" : "Poteče jutri",
	"Field Marshal" : "Feldmaršal",
	"Field Marshall" : "Feldmaršal",
	"Fight" : "Boj",
	"Fights" : "Boji",
	"Fight Again" : "Ponovi boj",
	"Fight bonus" : "Bonus v boju",
	"Finances" : "Finance",
	"Final Results" : "Finančni rezultat",
	"Find out more" : "Preberi več",
	"Finland" : "Finska",
	"Follow us" : "Spremljajte nas na",
	"Food" : "Hrana",
	"food" : "hrana",
	"For the law to be considered accepted it needs 66% of the Congress votes" : "Da bi bil zakon sprejet sta potrebni 2/3 glasov kongresnikov",
	"for 10 shouts/day and more" : "za 10 ali več vzklikov na dan",
	"Force" : "Moč",
	"Forfeit Points:" : "Kazenske točke:",
	"Forfeit points" : "Kazenske točke",
	"forum" : "forum",
	"Forum" : "Forum",
	"France" : "Francija",
	"Friends" : "Prijatelji",
	"From" : "Od",
	"General" : "General",
	"General Manager" : "Direktor",
	"Germany" : "Nemčija",
	"Get Extra Storage" : "Dokupi prostor",
	"Get Gold" : "Kupi zlato",
	"Get gold & extras" : "Kupi zlato in dodatke",
	"Get Gold & Extras" : "Kupi zlato in dodatke",
	"Gift" : "Darilo",
	"gift" : "darilo",
	"Go to Battlefield" : "Na bojišče",
	"Go to marketplace" : "Na tržnico",
	"GOLD" : "ZLATA",
	"Gold" : " Zlato",
	"Good fight, Private!" : "Dober boj, vojak!",
	"Good fight, Corporal!" : "Dober boj, desetnik!",
	"Good fight, Sergeant!" : "Dober boj, vodnik!",
	"Good fight, Lieutenant!" : "Dober boj, poročnik!",
	"Good fight, Captain!" : "Dober boj, stotnik!",
	"Good fight, Colonel!" : "Dober boj, polkovnik!",
	"Good fight, General!" : "Dober boj, general!",
	"Good fight, Field Marshall!" : "Dober boj, feldmaršal!",
	"Grain" : "Žito",
	"grain" : "žito",
	"Great fight" : "Odličen boj",
	"Greece" : "Grčija",
	"Gross domestic product (GDP)" : "Bruto Domači Produkt (BDP)",
	"Guest" : "Gost",
	"Hard Worker" : "Priden delavec",
	"Heal" : "Zdravi",
	"Hero" : "Junak",
	"High": "Visoko",
	"Home" : "Domov",
	"Hospital" : "Bolnišnica",
	"hospital" : "bolnišnica",
	"hours ago" : "ur",
	"House" : "Hiše",
	"house" : "hiše",
	"Job Market" : "Trg dela",
	"Hungary" : "Madžarska",
	"I have nothing more to say at the moment" : "Trenutno nimam kaj za reči.",
	"Import Tax" : "Carina",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Za prijavo v vašo organizacijio se morate odjaviti kot eDržavljan in ponovno prijaviti z geslom organizacije.",
	"Inbox" : "Prejeta pošta",
	"Income Tax" : "Davek na dohodek",
	"India" : "Indija",
	"Indonesia" : "Indonezija",
	"Industry" : "Panoga",
	"Inflation" : "Inflacija",
	"International" : "Mednarodni",
	"Inventory" : "Zaloga",
	"Invest" : "Vloži",
	"Invite friends" : "Povabi prijatelje",
	"Invite 10 people to eRepublik and help them reach level 6" : "Povabi 10 oseb v eRepublik in jim pomagaj priti do 6. nivoja.",
	"Impressive fight, Private!" : "Navdušujoč boj, vojak!",
	"Impressive fight, Corporal!" : "Navdušujoč boj, kapdesetniklare!",
	"Impressive fight, Sergeant!" : "Navdušujoč boj, vodnik!",
	"Impressive fight, Lieutenant!" : "Navdušujoč boj, poročnik!",
	"Impressive fight, Captain!" : "Navdušujoč boj, stotnik!",
	"Impressive fight, Colonel!" : "Navdušujoč boj, polkovnik!",
	"Impressive fight, General!" : "Navdušujoč boj, general!",
	"Impressive fight, Field Marshall!" : "Navdušujoč boj, feldmaršal!",
	"Iran" : "Iran",
	"Ireland" : "Irska",
	"Iron" : "Železo",
	"iron" : "železo",
	"Israel" : "Izrael",
	"Issue Money" : "Tiskaj denar",
	"Italy" : "Italija",
	"Items" : "Predmeti",
	"items" : "predmeti",
	"Japan" : "Japonska",
	"Job market" : "Trg dela",
	"Jobs" : "Službe",
	"Jobs available in this company" : "Odprta delovna mesta v podjetju",
	"Join" : "Pristopi",
	"Join a party" : "Včlani se v stranko",
	"Jul" : "Julij ",
	"Land" : "Surovine",
	"Last presence" : "Delal",
	"Latest" : "Zadnji",
	"Latest Events" : "Zadnji dogodki",
	"Latvia" : "Latvija",
	"Law proposals" : "Predlagani zakoni",
	"Level 1" : "Nivo 1",
	"Level" : "Nivo",
	"Level 2" : "Nivo 2",
	"Level 3" : "Nivo 3",
	"Level 4" : "Nivo 4",
	"Level 5" : "Nivo 5",
	"Lithuania" : "Litva",
	"Lieutenant" : "Poročnik",
	"Location" : "Prebivališče",
	"Login" : "Prijava",
	"Logout" : "Odjava",
	"logout" : "Odjava",
	"Make changes" : "Shrani spremembe",
	"Malaysia" : "Malеzija",
	"Manufacturing" : "Proizvodnja",
	"Market" : "Tržišče",
	"Markets" : "Tržišča",
	"Market offers" : "Ponudbe na trgu",
	"Market place" : "Tržnica",
	"Marketplace" : "Tržnica",
	"Media career" : "Medijska kariera",
	"Media Mogul" : "Medijski magnat",
	"Medium" : "Srednje",
	"Member of" : "Član",
	"Members"  : "Člani",
	"My places > Army"  : "Vojska",
	"Mexico" : "Mehika",
	"Military" : "Vojska",
	"Military achievements" : "Bojni dosežki",
	"Military career" : "Vojaška kariera",
	"Military force" : "Vojaška moč",
	"Military rank" : "Vojaški rang",
	"Military stats" : "Vojaški podatki",
	"Minimum" : "Minimalna",
	"Minimum country wage :" : "Minimalna plača v državi",
	"Minimum skill" : "Minimalna spretnost",
	"Minimum Skill" : "Minimalna spretnost",
	"Minimum Wage" : "Minimalna plača",
	"Moldavia" : "Moldavija",
	"Monetary market" : "Denarni trg",
	"Monetary Market" : "Denarni trg",
	"Money" : "Denar",
	"Month/Year" : "Mesec/Leto",
	"Monthly exports" : "Mesečni izvoz",
	"Monthly imports" : "Mesečni uvoz",
	"more events" : "več dogodkov",
	"more news" : "več novic",
	"more than a year" : "več kot 1 leto",
	"Moving Tickets" : "Vozovnice",
	"moving tickets" : "vozovnice",
	"Mutual Protection Pact" : "Sporazum o medsebojni obrambi",
	"My Organizations" : "Moje organizacije",
	"My places" : "Moj meni",
	"Name" : "Ime",
	"National" : "Domači",
	" National Rank" : " Rang v državi",
	"National Rank" : "Rang v državi",
	"Neighbors" : "Sosedje",
	"Netherlands" : "Nizozemska",
	"New" : "Novo",
	"new article" : "nov članek",
	"New Citizen Fee" : "Znesek za nove državljane",
	"New Citizen Message" : "Pozdravno sporočilo",
	"New Citizens today" : "Novih državljanov danes",
	"New citizens today" : "Novih državljanov danes",
	"New location:" : "Novo prebivališče:",
	"New password" : "Novo geslo",
	"New password again" : "Ponovi geslo",
	"news" : "novice",
	"News" : "Novice",
	"Newspaper" :"Časopis",
	"Newspaper logo" :"Logotip časopisa",
	"Newspaper details" :"Podrobnosti časopisa",
	"Newspaper name" :"Ime časopisa",
	"Newspapers" : "Časopisi",
	"Next" : "Naslednji",
	"Next elections" : "Naslednje volitve",
	"No" : "Ne",
	"No." : "Št.",
	"no active battles " : "brez aktivnih bitk",
	"No activity" : "Brez aktivnosti",
	"no allies" : "brez zaveznikov",
	"NO MAN'S LAND" : "NIKOGARŠNJE OZEMLJE",
	"No. of votes" : "Glasovi",
	"No political activity" : "Brez aktivnosti",
	"No products in this market" : "Brez ponudbe na trgu",
	"No shouts posted by this Citizen yet" : "Ta državljan še ni poslal vzklikov",
	"No presentation" : "Brez predstavitve",
	"North Korea" : "Severna Koreja",
	"Norway" : "Norveška",
	"Not qualified" : "Nekvalificirani",
	"November" : "November",
	"Now you can visit the " : "Lahko obiščete ",
	"October" : "Oktoear ",
	"of the New World" : " Novega sveta",
	"Offer a gift" : "Obdaruj",
	"Office" : "Pisarna",
	"Official" : "Uradni",
	"Official candidates" : "Uradni kandidati",
	"Oil"  : "Nafta",
	"oil"  : "nafta",
	"Ok, thanks, next tip" : "Ok, naslednji nasvet prosim",
	"Old"  : "Staro",
	"On the Map" : "Na zemljevidu",
	"one hour ago" : "pred 1 uro",
	"one minute ago" : "pred 1 minuto",
	"one month ago" : "pred 1 mesecem",
	"online": "prisotni",
	"Online now": "Trenutno prisotni",
	"only ": "samo ", " pictures allowed": " slike",
	"only .jpeg pictures allowed": "samo .jpeg slike",
	"only JPG files allowed": "dovoljen samo JPG format",
	"Only congressmen and country presidents have the right to vote" : "Samo predsednik države in kongresniki imajo pravico glasovanja",
	" or read the  " : " ali preberi  ",
	"Organization Avatar": "Logotip organizacije",
	"Organizations created by you:" : "Tvoje organizacije",
	"Organizations" : "Organizacije",
	"Orientation" : "Orientacija",
	"Pakistan" : "Pakistan",
	"Paraguay" : "Paragvaj",
	"Parties" : "Stranke",
	"Party" : "Stranka",
	"Party details" : "Podrobnosti stranke",
	"Party Elections" : "Strankarske volitve",
	"Party logo" : "Logotip stranke",
	"Party name" : "Ime stranke",
	"Party Member" : "Član stranke",
	"Party presidency" : "Predsedstvo stranke",
	"Party President" : "Predsednik stranke",
	"Peace Proposal" : "Mirovni predlog",
	"Pending" : "Na čakanju",
	"Philippines" : "Filipini",
	"Picture" : "Slika",
	"Place your Congress candidature" : "Kandidiraj za kongres",
	"Please choose a country you want to live in." : "Izberi državo v kateri želiš živeti.",
	"Please choose the region you want to live in" : "Izberi regijo v kateri želiš živeti.",
	"Please choose the country you want to live in" : "Izberi državo v kateri želiš živeti.",
	"Please select an Industry to see the marketplace offers" : "Izberi panogo za katero želiš videti ponudbe",
	"Please type your old password" : "Vpiši staro geslo",
	"Poland" : "Poljska",
	"Politic stats" : "Politični podatki",
	"Political career" : "Politična kariera",
	"Political stats" : "Politični podatki",
	"Politics" : "Politika",
	"Population": "Prebivalstvo",
	"Portugal" : "Portugalska",
	"Post" : "Pošlji",
	"Post a comment" : "Vpiši komentar",
	"Post new offer" : "Nova ponudba",
	"Post new offers" : "Nove ponudbe",
	"Presence:" : "Prisotnost:",
	"Presence:  " : "Prisotnost:  ",
	"President" : "Predsednik",
	"President Elections" : "Predsedniške volitve",
	"President Impeachment" : "Odpoklic predsednika",
	"Presidential candidates" : "Predsedniški kandidati",
	"Press" : "Tisk",
	"Press director" : "Urednik",
	"Prev" : "Predhodni",
	"Presentation" : "Predstavitev",
	"Price" : "Cena",
	"Price with taxes" : "Cena z davki",
	"Privacy" : "Zasebnost",
	"Private" : "Vojak",
	"Productivity" : "Produktivnost",
	"Products" : "Proizvodi",
	"Profile":"Profil",
	"Proposed by":"Predlagatelj: ",
	"Provider" : "Prodajalec",
	"Publish" : "Objavi",
	"Quality" : "Kakovost",
	"Quality Level" : "Nivo kakovosti",
	"Rank" : "Čin",
	"Rankings" : "Statistike",
	"Raw materials" : "Surovine",
	"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Surovine lahko kupiš le s podjetjem (izberi podjetje v zgornjem desnem kotu) ali če si prijavljen kot organizacija",
	"Reach 1000 subscribers to your newspaper" : "Pridobi 1000 naročnikovna svoj časopis",
	"Reach the highest total damage in one battle" : "Naredi največ škode v eni bitki",
	"Reached 1000 subscribers to your newspaper" : "Časopis pridobil 1000 naročnikov",
	"Reached strength level 5" : "Dosežen 5. nivo moči",
	"Reached the highest total damage in one battle" : "Naredil največ škode v eni bitki",
	"Rec exchange rate" : "Priporočen tečaj",
	"Region" : "Regija",
	"REJECTED" : "ZAVRNJEN",
	"Rejected" : "Zavrnjen",
	"Remove" : "Odstrani",
	"Remove friend" : "Odstrani s spiska prijateljev",
	"Report abuse" : "Prijavi zlorabo",
	"report abuse" : "prijavi zlorabo",
	"Represent your country (or eNation) in the real world" : "Predstavi svoju eDržavo realnemu svetu",
	"Requirements" : "Zahteve",
	"Resign" : "Odstopi",
	"Resistance Hero" : "Junak odporniške vojne",
	"Resistance War" : "Odporniška vojna",
	"Resistance War Active" : "Aktivna odporniška vojna",
	"Romania" : "Romunija",
	"Run for congress" : "Kandidiraj za kongres",
	"RURAL AREA" : "PODEŽELJE",
	"Russia" : "Rusija",
	"Salary" : "Plača",
	"Save" : "Shrani",
	"See all donations" : "Vse donacije",
	"See all employees" : "Vsi zaposleni",
	"See all law proposals" : "Vsi predlagani zakoni",
	"See all members" : "Vsi člani",
	"see finished battles" : "končane bitke",
	"See results" : "Rezultati",
	"Select" : "Izberi",
	"Secure" : "Osvojeno",
	"Sell" : "Prodaj",
	"Sell company" : "Prodaj podjetje",
	"Sell products here" : "Prodaj na tem trgu",
	"Send message" : "Pošlji sporočilo",
	"Sent" : "Poslano",
	"September" : "September",
	"Serbia" : "Srbija",
	"Sergeant" : "Vodnik",
	"Shop" : "Trgovina",
	"Shout" : "Pošlji",
	"Shout something:" : "Vzklikni",
	"Show active wars" : "Aktivne vojne",
	"show all accounts" : "prikaži vse valute",
	"Show all members" : "Prikaži vse člane",
	"Show all donations" : "Prikaži donacije",
	"Show all employees" : "Prikaži zaposlene",
	"Show candidate list:" : "Prikaži spisek kandidatov",
	"Show candidate list" : "Prikaži spisek kandidatov",
	"Show candidates list" : "Prikaži spisek kandidatov",
	"show finished battles" : "prikaži končane bitke",
	"show less" : "skrij",
	"Show my offers" : "Moje ponudbe",
	"Show proposed members" : "Prikaži kandidate ",
	"of congress" : "za kongres",
	"Show results" : "Prikaži rezultate",
	"Singapore" : "Singapur",
	"Skill" : "Spretnost",
	"Skill level" : "Nivo spretnosti",
	"Skills:" : "Spretnosti",
	"Skills" : "Spretnosti",
	"Slovakia" : "Slovaška",
	"Slovenia" : "Slovenija",
	"Social orientation" : "Družbena usmeritev",
	"Social stats" : "Družbeni podatki",
	"Society" : "Družba",
	"Society Builder" : "Družbeni graditelj",
	"South Africa" : "Južnoafriška Republika",
	"South Korea" : "Južna Koreja",
	"Spain" : "Španija",
	"Start a resistance war and liberate that region" : "Začni odporniško vojno in osvobodi regijo",
	"Started a resistance war and liberated " : "Odporniška vojna začeta in osvobojenih ",  " regions." : " regij.",
	"Started by" : "Začel:",
	"started by" : "začel: ",
	"started on" : "začeto",
	"Still active " : "še aktiven",
	"Stock" : "Zaloga",
	"Strength" : "Moč",
	"Subscribe" : "Naroči se",
	"Subscribe to comments" : "Spremljaj komentare",
	"Subscriptions" : "Naročeno",
	"SUBURBIA" : "PREDMESTJE",
	"Super Soldier" : "Super Vojak",
	"supported by" : "podpirajo ga",
	"Supporting parties" : "Kandidat strank",
	"Sweden" : "Švedska",
	"Switzerland" : "Švica",
	"Tax change: Defense System" : "Sprememba davka: Obrambni Sistem",
	"Tax change: Diamonds" : "Sprememba davka: Diamanti",
	"Tax change: Food" : "Sprememba davka: Hrana",
	"Tax change: Gift" : "Sprememba davka: Darila",
	"Tax change: Grain" : "Sprememba davka: Žito",
	"Tax change: Hospital" : "Sprememba davka: Bolnišnica",
	"Tax change: House" : "Sprememba davka: Hiše",
	"Tax change: Iron" : "Sprememba davka: Železo",
	"Tax change: Moving Tickets" : "Sprememba davka: Vozovnice",
	"Tax change: Weapon" : "Sprememba davka: Orožje",
	"Tax change: Wood" : "Sprememba davka: Les",
	"Taxes" : "Davki",
	"Terms of Service" : "Pogoji",
	"Thailand" : "Tajska",
	"The company offers no products in this market" : "Podjetje nima ponudb na tem trgu",
	"The law voting process takes 24 hours." : "Proces glasovanja traja 24 ur.",
	"There are no active battles in this war" : "V tej vojni ni aktivnih bitk",
	"There are no discovered resources in this region yet" : "Ta regija je brez surovin",
	"There are no pending citizenship applications." : "Ni odprtih zahtevkov.",
	"There are no resistance wars in this country." : "V tej državi ni odporniških vojn.",
	"This citizen does not have any donations sent or received." : "Ta državljan še ni pošiljal ali prejema donacij.",
	"This country can trade with any other country in eRepublik." : "Ta država lahko trguje z vsemi državami v eRepubliki.",
	"To" : "Za",
	"Title" : "Naslov",
	" to stay in touch with what happens on eRepublik." : " da ostanete na tekočem z dogajanjem v eRepubliki.",
	"today" : "danes",
	"Today" : "danes",
	"Tools" : "Orodja",
	"Top Rated" : "Najbolj brano",
	"Top rated" : "Najbolj brano",
	"Total Citizens" : "Skupaj državljanov",
	"Total citizens" : "Skupaj državljanov",
	"Total damage:" : "Skupaj škoda:",
	"Total damage" : "Skupaj škoda",
	"Total votes: " : "Skupaj glasov ",
	"Total votes:" : "Skupaj glasov",
	"Train" : "Treniraj",
	"Train bonus" : "Trening bonus",
	"Training" : "Trening",
	"Treasury" : "Zakladnica",
	"Turkey" : "Turčija",
	"Tutorials" : "Navodila",
	"Ukraine" : "Ukrajina",
	"UNDERGROUND" : "PODZEMLJE",
	"Unemployed" : "Brezposeln",
	"United Kingdom" : "Velika Britanija",
	"Unsubscribe" : "Prekliči naročnino",
	"Unsubscribe to comments" : "Ne spremljaj komentarjev",
	"until the region can be occupied or secured" : "dokler regija ni okupirana ali ubranjena",
	"Update" : "osveži",
	"Upgrade quality level" : "Dvigni kakovost",
	"Uruguay" : "Urugvaj",
	"USA" : "ZDA",
	"Value added tax (VAT)" : "Davek na dodano vrednost (DDV)",
	"VAT" : "DDV",
	"Venezuela" : "Veneczela",
	"Vicious fight, Private!" : "Divji boj, vojak!",
	"Vicious fight, Corporal!" : "Divji boj, desetnik!",
	"Vicious fight, Sergeant!" : "Divji boj, vodnik!",
	"Vicious fight, Lieutenant!" : "Divji boj, poročnik!",
	"Vicious fight, Captain!" : "Divji boj, stotnik!",
	"Vicious fight, Colonel!" : "Divji boj, polkovnik!",
	"Vicious fight, General!" : "Divji boj, general!",
	"Vicious fight, Field Marshall!" : "Divji boj, feldmaršal!",
	"View requests" : "Preglej vloge",
	"View all comments" : "Vsi komentarji",
	"Vote" : "Glasuj",
	"War" : "Vojna",
	"Wars" : "Vojne",
	"Wars list" : "Spisek vojn",
	"Weak fight, Private!" : "Slab boj, vojak!",
	"Weak fight, Corporal!" : "Slab boj, desetnik!",
	"Weak fight, Sergeant!" : "Slab boj, vodnik!",
	"Weak fight, Lieutenant!" : "Slab boj, poročnik!",
	"Weak fight, Captain!" : "Slab boj, stotnik!",
	"Weak fight, Colonel!" : "Slab boj, polkovnik!",
	"Weak fight, General!" : "Slab boj, general!",
	"Weak fight, Field Marshall!" : "Slab boj, feldmaršal!",
	"Weapon" : "Orožje",
	"weapon" : "orožje",
	"Weapon quality" : "Kakovost orožja",
	"Wellness" : "Zdravje",
	"Winner" : "Zmagovalec",
	"Who" : "Kdo",
	"Wildcards" : "Dodatni",
	"Win the Congress elections": "Zmagaj na kongresnih volitvah",
	"Won the Congress elections": "Zmagal na kongresnih volitvah",
	"Win the Presidential elections": "Zmagaj na predsedniških volitvah",
	"Won the Presidential elections": "Zmagal na predsedniških volitvah",
	"Wood" : "Les",
	"wood" : "les",
	"Worked 30 days in a row" : "delal 30 zni zapored",
	"World" : "Svet",
	"Write article" : "Napiši članek",
	" xp points " : " točk izkušenj ",
	"Yes" : "Da",
	"yesterday" : "včeraj",
	"You are not a member of a party" : "Nisi član stranke",
	"You are not a president or a congress member in this country" : "Nisi predsednik ali kongresnik v tej državi",
	"You are not a President or a Congress Member in this country" : "Nisi predsednik ali kongresnik v tej državi",
	"You can exchange money at the" : "Valute lahko zamenjaš na: ",
	"You can get wellness from:" : "Zdravje lahko dobiš:",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "MoStranki se lahko pridružiš na njeni strani, ali ustanoviš svojo, če ti ne ustreza nobena od obstoječih . Članstvo v stranki ti omogoča mesto v kongresu, ali celo predsedstvo.",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "V tej regiji ni možna odporniška vojna, ker že pripada prvotni državi",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "V tej regiji ni možna odporniška vojna, ker že pripada prvotni državi",
	"You cannot trade with this country as you are at war with it" : "Ne moreš trgovati s to državo ker si z njo v vojni",
	"You didn't specify the amount of products you wish to buy" : "Nisi navedel količine za nakup",
	"You do not own a moving ticket. You can buy moving tickets from Marketplace" : "Nimaš vozovnice. Kupiš jo lahko na tržnici.",
	"You do not have a newspaper" : "Nimaš časopisa",
	"You don't have a newspaper" : "Nimaš časopisa",
	"You don't have any active job offers" : "Ni odprtih delovnih mest",
	"You do not have any active job offers" : "Ni odprtih delovnih mest",
	"You have already worked today." : "Danes si že delal.",
	"You have not trained today" : "Nisi še treniral",
	"You have succesfully edited your profile" : "Profil uspešno spremenjen",
	"You have trained today. You can train again tomorrow." : "Danes si že treniral. Ponovno lahko treniraš jutri.",
	"Your account" : "Moj račun",
	"Your accounts" : "Moji računi",
	"Your birthday" : "Moj rojstni dan",
	"Your comment" : "Moj komentar",
	"Your companies" : "Moja podjetja",
	"Your email here" : "Email",
	"Your inventory" : "Inventar",
	"Your offer has been updated" : "Vaša ponudba je obnovljena",


};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 zaveznikov";
regexps["^Active wars in (.*)$"] = "Aktivne vojne v $1:";
regexps["^Active resistance wars in (.*)$"] = "Aktivnodporniške vojne v $1:";
regexps["(\\s*)Expires in (\\d*) days"] = "poteče čez $2 dni";
regexps["^(\\d*) comments$"] = "$1 komentarjev";
regexps["^(\\d*) hours ago$"] = "pred $1 urami";
regexps["^(\\d*) minutes ago$"] = "pred $1 minutami";
regexps["^(\\d*) days ago$"] = "pred $1 dnevi";
regexps["^(\\d*) months ago$"] = "pred $1 meseci";
regexps["^Regions \\((\\d*)\\)"] = "Regije ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Prijatelji ($1)";
regexps["^(\\d*) months"] = "$1 mesecev";
regexps["^Comments(.*)"] = "Кomentarji$1";
regexps["^Trackbacks(.*)"] = "Povezano$1";


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