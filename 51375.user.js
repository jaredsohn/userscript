// ==UserScript==
// @name           eRepublik Srpski prevod (latinica)
// @namespace      http://www.erepublik.com/en/citizen/profile/1340210
// @description    eRepublik preveden na srpski / Serbian translation for eRepublik
// @version        1.0
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// translations
	"+10 Wellness / 2 Gold" : "+10 Zdravlja / 2 Zlatnika",
	"% of votes" : "% glasova",
	"6-30 characters max" : "6-30 karaktera",
	"A newspaper is an efficient way to communicate your news to the Erepublik world. Read more on the Erepublik wiki. Create your own newspaper." : "Novine su efikasan način komunikacije sa eRepublik zajednicom. Pročitajte više na eRepublik Wiki-ju. Otvorite svoje novine.",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Novine su efikasan način komunikacije sa eRepublik zajednicom. Pročitajte više na eRepublik Wiki-ju. Otvorite svoje novine.",
	"ACCEPTED" : "PRIHVAĆENO",
	"Accepted" : "Prihvaćeno",
	"Accounts" : "Imovina",
	"Achievements" : "Dostignuća",
	"active battles " : "aktivne bitke",
	"Active wars list" : "Lista aktivnih ratova",
	"Add a job offer" : "Dodaj ponudu za posao",
	"Add as a friend" : "Dodaj za prijatelja",
	"Administration" : "Administracija",
	"ADMINISTARATION CENTER" : "CENTAR",
	"Advanced 5 strength levels" : "Napredovao/la 5 nivoa snage",
	"Advertising Department" : "Reklamno odeljenje",
	"Affiliates" : "Saradnici",
	"Alerts" : "Upozorenja",
	"All accounts" : "Sve valute",
	"All Alliances" : "Svi savezi",
	"All countries" : "Sve države",
	"All donations" : "Sve donacije",
	"All employees" : "Spisak zaposlenih",
	"All levels" : "Svi nivoi",
	"All resistance wars" : "Svi oslobodilački ratovi",
	"All skills" : "Svi nivoi",
	"All wars" : "Svi ratovi",
	"Alliance" : "Savez",
	"Alliances" : "Savezi",
	"Amazing fight" : "Zapanjujuća borba",
	"Ambassador" : "Ambasador",
	"Amount" : "Količina",
	"Amount to buy" : "Količina za kupovinu",
	"Anarchist" : "Anarhista",
	"Apply" : "Uzmi",
	"Argentina" : "Argentina",
	"Army" : "Vojska",
	"Article RSS" : "RSS članka",
	"Assets" : "Svojina",
	"Attackable on President's decision" : "Može se napasti na predlog predsednika",
	"Attention: NO VAT tax for Raw materials" : "Pažnja: Nema poreza na sirovine",
	"August" : "Avgust ",
	"Australia" : "Australija",
	"Austria" : "Austrija",
	"Average" : "Prosečno",
	"Average Citizen level" : "Prosečni nivo eGrađana",
	"Average citizen level" : "Prosečni nivo eGrađana",
	"Average strength" : "Prosečna snaga",
	"Back" : "Nazad",
	"Back to battlefield" : "Na bojno polje",
	"Basic damage" : "Osnovna šteta",
	"Battle Hero" : "Heroj bitke",
	"Battle History" : "Istorija Bitke",
	"Battle history" : "Istorija bitke",
	"Belgium" : "Belgija",
	"Bio" : "Biografija",
	"Bolivia" : "Bolivija",
	"BORDER AREA" : "GRANIČNA OBLAST",
	"Bosnia and Herzegovina" : "Bosna i Hercegovina",
	"Brazil" : "Brazil",
	"Bulgaria" : "Bugarska",
	"Buy" : "Kupi",
	"Buy Constructions" : "Kupi građevine",
	"Buy Constructions: Defense System" : "Kupi građevinu: Odbrambeni sistem",
	"Buy Constructions: Hospital" : "Kupi građevinu: Bolnica",
	"Buy export license" : "Kupi dozvolu za izvoz",
	"Buy extra storage" : "Kupi dodatni prostor",
	"Buy from market" : "Kupi sa tržišta",
	"Buy market license" : "Kupi dozvolu za tržište",
	"Buy raw materials" : "Kupi sirovine",
	"Buy wellness" : "Kupi zdravlje",
	"Buy Wellness Box" : "Kupi paket zdravlja",
	"Canada" : "Kanada",
	"Candidate" : "Kandidat",
	"CAPITAL" : "GLAVNI",
	"CAPTURED" : "OSVOJENO",
	"Career" : "Karijera",
	"Career path" : "Razvoj karijere",
	"Center" : "Centralna",
	"Change password" : "Promeni lozinku",
	"Change residence" : "Promeni prebivalište",
	"Check your unlocked features" : "Pregledaj otvorene mogućnosti",
	"Chile" : "Čile",
	"China" : "Kina",
	"Citizen Avatar" : "Avatar",
	"Citizen fee" : "Početni džeparac",
	"Citizens" : "Građani",
	"CITY" : "GRAD",
	"Collect" : "Pokupi",
	"Colombia" : "Kolumbija",
	"Come back tomorrow." : "Vrati se sutra.",
	"Companies" : "Kompanije",
	"Companies for sale" : "Kompanije na prodaju",
	"Company" : "Kompanija", 
	"Company accounts" : "Imovina kompanije", 
	"Company page" : "Stranica kompanije",
	"Community" : "Zajednica",
	"Conquer" : "Osvojeno",
	"Congress" : "Kongres",
	"Congress Elections" : "Kongresni izbori",
	"Congress Member" : "Kongresmen",
	"Constructions": "Građevine",
	"Contact": "Kontakt",
	"Copyright" : "Prava",
	"Corporal" : "Corporal",
	"Corporate career" : "Zaposlenje",
	"Cost" : "Cena", 
	"Countries" : "Države",
	"Country" : "Država",
	"Country - Society" : "Država - Društvo",
	"Country Administration" : "Administracija države",
	"Country administration" : "Administracija države",
	"Country Presidency" : "Vođstvo države",
	"Country President" : "Predsednik države",
	"Country trading embargoes" : "Države kojima smo stavili embargo",
	"Create" : "Napravi",
	"Create new" : "Napravi novu",
	"Create new company" : "Napravi novu kompaniju",
	"Croatia" : "Hrvatska",
	"Current location" : "Trenutno prebivalište",
	"Czech Republic" : "Češka",
	"Day" : "Dan ",
	"Daily salary" : "Dnevna plata",
	"Debate Area" : "Rasprava na temu",
	"December" : "Decembar",
	"Declare War" : "Objavi rat",
	"Defense Points" : "Odbrambeni poeni",
	"Defense System" : "Odbrambeni sistem",
	"Defense system" : "Odbrambeni sistem",
	"defense system" : "Odbrambeni sistem",
	"Delete" : "Izbriši",
	"Denmark" : "Danska",
	"details" : "detalji",
	"Diamonds" : "Dijamanti",
	"diamonds" : "dijamanti",
	"Disscusion area" : "Diskusija",
	"Donate" : "Doniraj",
	"Donate Gold" : "Doniraj zlato",
	"Donate raw materials" : "Doniraj sirovine",
	"Donation" : "Donacija",
	"Donations list" : "Lista donacija",
	"Drag and drop items from your inventory to the donation area" : "Prevuci predmete iz svog inventara u prostor za donacije.",
	"Economic stats" : "Ekonomski podaci",
	"Economical orientation" : "Ekonomska orijentacija",
	"Economy" : "Ekonomija",
	"Edit details" : "Izmeni detalje",
	"Edit profile" : "Izmeni profil",
	"Edit Profile" : "Izmeni Profil",
	"Election results" : "Rezultati izbora",
	"Election" : "Izbor",
	"Elections" : "Izbori",
	"Email must be valid for registration, so don't cheat" : "Email adresa mora biti ispravna zbog registracije, zato unesite ispravnu email adresu",
	"Employee" : "Zaposleni",
	"Employees" : "Zaposleni",
	"eRepublik Birthday" : "eRepublik rođendan",
	"Erepublik Age" : "eRepublik starost",
	"eRepublik Laws" : "eRepublik pravila",
	"Estonia" : "Estonija",
	"Everyone" : "Svi",
	"Exchange rate" : "Kurs",
	"Experience" : "Iskustvo",
	"Experience points" : "Iskustveni poeni",
	"Expires tomorrow" : "Ističe sutra",
	"Field Marshal" : "Field Marshal",
	"Fight" : "Borba",
	"Fights" : "Borbe",
	"Fight Again" : "Bori se opet",
	"Fight bonus" : "Bonus u borbi",
	"Finances" : "Finansije",
	"Final Results" : "Zvanični rezultati",
	"Find out more" : "Otkrij više",
	"Finland" : "Finska",
	"Follow us" : "Pratite nas na",
	"Food" : "Hrana",
	"food" : "hrana",
	"For the law to be considered accepted it needs 66% of the Congress votes" : "Da bi zakon bio prihvaćen neophodno je 2/3 glasova odbornika",
	"for 10 shouts/day and more" : "za 10 izjava po danu",
	"Force" : "Sila",
	"Forfeit Points:" : "Kazneni poeni",
	"forum" : "forum",
	"Forum" : "Forum",
	"France" : "Francuska",
	"Friends" : "Prijatelji",
	"General Manager" : "Upravnik",
	"Germany" : "Nemačka",
	"Get Extra Storage" : "Kupi dodatni prostor",
	"Get Gold" : "Kupi zlato",
	"Get gold & extras" : "Kupi zlato & dodatke",
	"Gift" : "Poklon",
	"gift" : "poklon",
	"Go to Battlefield" : "Na bojno polje",
	"Go to marketplace" : "Na pijacu",
	"GOLD" : "ZLATO",
	"Gold" : "Zlato",
	"Grain" : "Žito",
	"grain" : "žito",
	"Great fight" : "Odlična borba",
	"Greece" : "Grčka",
	"Gross domestic product (GDP)" : "Bruto Domaći Proizvod (BDP)",
	"Guest" : "Gost",
	"Hard Worker" : "Vredni radnik",
	"Heal" : "Leči",
	"Hero" : "Heroj",
	"High": "Visoko",
	"Home" : "Početna",
	"Hospital" : "Bolnica",
	"hospital" : "bolnica",
	"House" : "Kuća",
	"house" : "kuća",
	"Job Market" : "Berza rada",
	"Hungary" : "Mađarska",
	"I have nothing more to say at the moment" : "Zamislite, nemam više predloga.",
	"Import Tax" : "Porez na uvoz",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Da biste se ulogovali na vašu organizaciju, morate se izlogovati sa naloga eGrađana.",
	"Inbox" : "Primljena pošta",
	"Income Tax" : "Porez na prihod",
	"India" : "Indija",
	"Indonesia" : "Indonezija",
	"Industry" : "Industrija",
	"Inflation" : "Inflacija",
	"International" : "Internacionalne",
	"Inventory" : "Inventar",
	"Invest" : "Uloži",
	"Invite friends" : "Pozovi prijatelje",
	"Invite 10 people to eRepublik and help them reach level 6" : "Pozovi 10 osoba u eRepublik i postaraj se da dođu do nivoa 6",
	"Iran" : "Iran",
	"Ireland" : "Irska",
	"Iron" : "Gvožđe",
	"iron" : "gvožđe",
	"Israel" : "Izrael",
	"Issue Money" : "Štampaj novac",
	"Italy" : "Italija",
	"Items" : "Predmeti",
	"items" : "predmeti",
	"Japan" : "Japan",
	"Job market" : "Tržište rada",
	"Jobs" : "Poslovi",
	"Jobs available in this company" : "Otvorena radna mesta u ovoj kompaniji",
	"Join" : "Pristupi",
	"Join a party" : "Pristupi stranci",
	"Jul" : "Juli ",
	"Land" : "Ratarstvo/Rudarstvo",
	"Last presence" : "Radio/la",
	"Latest" : "Najnovije",
	"Latest Events" : "najnoviji događaji",
	"Latvia" : "Letonija",
	"Law proposals" : "Predlozi zakona",
	"Level 1" : "Nivo 1",
	"Level" : "Nivo",
	"Level 2" : "Nivo 2",
	"Level 3" : "Nivo 3",
	"Level 4" : "Nivo 4",
	"Level 5" : "Nivo 5",
	"Lithuania" : "Litvanija",
	"Login" : "Uloguj se",
	"logout" : "Izloguj se",
	"Make changes" : "Zapamti promene",
	"Malaysia" : "Malеzija",
	"Manufacturing" : "Manufaktura",
	"Market" : "Tržište",
	"Markets" : "Tržišta",
	"Market offers" : "Ponude na tržištu",
	"Market place" : "Pijaca",
	"Marketplace" : "Pijaca",
	"Media career" : "Medijska aktivnost",
	"Media Mogul" : "Medija Mogul",
	"Medium" : "Srednje",
	"Member of" : "Član",
	"Members"  : "Članovi",
	"Mexico" : "Meksiko",
	"Military" : "Vojska",
	"Military achievements" : "Vojna dostignuća",
	"Military career" : "Vojna aktivnost",
	"Military force" : "Vojna sila",
	"Military rank" : "Vojni rank",
	"Military stats" : "Vojni podaci",
	"Minimum" : "Minimum",
	"Minimum country wage :" : "Minimalna plata u državi",
	"Minimum skill" : "Tražena veština",
	"Minimum Wage" : "Minimalna plata",
	"Moldavia" : "Moldavija",
	"Monetary market" : "Berza",
	"Money" : "Novac",
	"Month/Year" : "Mesec/Godina",
	"Monthly exports" : "Mesečni izvoz",
	"Monthly imports" : "Mesečni uvoz",
	"more events" : "još događaja",
	"more news" : "još vesti",
	"more than a year" : "više od godine",
	"Moving Tickets" : "Karte",
	"moving tickets" : "karte",
	"Mutual Protection Pact" : "Pakt o međusobnoj zaštiti",
	"My Organizations" : "Moje organizacije",
	"My places" : "Moj meni",
	"Name" : "Ime",
	"National" : "Nacionalne",
	" National Rank" : " Nacionalni Rank",
	"Neighbors" : "Susedi",
	"Netherlands" : "Holandija",
	"New" : "Novo",
	"new article" : "novi članak",
	"New Citizen Fee" : "Iznos za novoregistrovane igrače",
	"New Citizen Message" : "Pozdravna poruka",
	"New Citizens today" : "Novih stanovnika danas",
	"New citizens today" : "Novih eGrađana danas",
	"New location:" : "Novo prebivalište:",
	"news" : "novine",
	"News" : "Vesti",
	"Newspaper" :"Novine",
	"Newspaper Avatar" :"Avatar novina",
	"Newspaper details" :"Podaci novina",
	"Newspaper name" :"Naziv novina",
	"Newspapers" : "Novine",
	"Next" : "Sledeći",
	"Next elections" : "Naredni izbori",
	"No" : "Ne",
	"No." : "Br.",
	"no active battles " : "nema aktivnih bitaka",
	"No activity" : "Bez aktivnosti",
	"no allies" : "bez saveznika",
	"NO MAN'S LAND" : "NIČIJA ZEMLJA",
	"No. of votes" : "Glasova",
	"No political activity" : "Bez aktivnosti",
	"No products in this market" : "Nema proizvoda na ovom tržištu",
	"No shouts posted by this Citizen yet" : "Ovaj građanin još uvek nije pisao izjave",
	"North Korea" : "Severna Koreja",
	"Norway" : "Norveška",
	"Not qualified" : "Nekvalifikovani",
	"November" : "Novembar",
	"Now you can visit the " : "Možete posetiti ",
	"October" : "Oktobar ",
	"of the New World" : " Novog Sveta",
	"Offer a gift" : "Pokloni",
	"Office" : "Kancelarija",
	"Official" : "Zvanični",
	"Official candidates" : "Zvanični kandidat",
	"Oil"  : "Nafta",
	"oil"  : "nafta",
	"Ok, thanks, next tip" : "U redu, sledeći savet",
	"Old"  : "Staro",
	"On the Map" : "Na mapi",
	"one hour ago" : "pre sat vremena",
	"one minute ago" : "pre minut",
	"one month ago" : "pre mesec dana",
	"online": "prisutni",
	"Online now": "trenutno priustan/na",
	"only ": "samo ", " pictures allowed": " slike dozvoljene",
	"only .jpeg pictures allowed": "samo .jpeg slike dozvoljene",
	"Only congressmen and country presidents have the right to vote" : "Samo predsednik države i kongresmeni imaju pravo glasa",
	" or read the  " : " ili pročitati  ",
	"Organization Avatar": "Avatar organizacije",
	"Organizations created by you:" : "Vaše organizacije",
	"Organizations" : "Organizacije",
	"Orientation" : "Orijentacija",
	"Pakistan" : "Pakistan",
	"Paraguay" : "Paragvaj",
	"Parties" : "Stranke",
	"Party" : "Stranka",
	"Party details" : "Detalji o stranci",
	"Party Elections" : "Stranački izbori",
	"Party logo" : "Logo stranke",
	"Party name" : "Ime stranke",
	"Party Presidency" : "Predsedništvo stranke",
	"Party President" : "Predsednik stranke",
	"Peace Proposal" : "Predlog mira",
	"Pending" : "Na čekanju",
	"Philippines" : "Filipini",
	"Place your Congress candidature" : "Postavi svoju kandidaturu za kongres",
	"Please choose a country you want to live in." : "Odaberi državu u kojoj želiš da živiš.",
	"Please choose the region you want to live in." : "Odaberi oblast u kojoj želiš da živiš.",
	"Please choose the country you want to live in." : "Odaberi državu u kojoj želiš da živiš.",
	"Please select an Industry to see the marketplace offers" : "Odaberi granu proizvodnje da bi video/la ponudu na pijaci",
	"Poland" : "Poljska",
	"Politic stats" : "Politički podaci",
	"Political career" : "Politička aktivnost",
	"Political stats" : "Politički podaci",
	"Politics" : "Politika",
	"Population": "Stanovništvo",
	"Portugal" : "Portugal",
	"Post" : "Stavi",
	"Post a comment" : "Ostavi komentar",
	"Post new offers" : "Postavi ponudu",
	"Presence:" : "Prisutnost",
	"President" : "Predsednik",
	"President Elections" : "Predsednički izbori",
	"President Impeachment" : "Svrgavanje predsednika",
	"Press" : "Novine",
	"Press director" : "Urednik novina",
	"Prev" : "Prethodni",
	"Price" : "Cena",
	"Price with taxes" : "Cena sa porezom",
	"Privacy" : "Privatnost",
	"Private" : "Private",
	"Productivity" : "Produktivnost",
	"Products" : "Proizvodi",
	"Profile":"Profil",
	"Proposed by":"Predložio/la: ",
	"Provider" : "Proizvođač",
	"Quality" : "Kvalitet",
	"Quality Level" : "Nivo kvaliteta",
	"Rank" : "Čin",
	"Rankings" : "Statistike",
	"Raw materials" : "Sirovine",
	"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Sirovine mogu da se kupe samo preko naloga kompanije (odaberite kompaniju u desnom gornjem uglu) ili ako ste ulogovani kao organizacija",
	"Reach 1000 subscribers to your newspaper" : "Dostigni 1000 pretplatnika na svoje novine",
	"Reach the highest total damage in one battle" : "Načini najviše štete u jednoj bitci",
	"Reached 1000 subscribers to your newspaper" : "Novine dostigle 1000 pretplatnika",
	"Reached strength level 5" : "Postignuta snaga 5",
	"Reached the highest total damage in one battle" : "Načinio najviše štete u jednoj bitci",
	"Rec exchange rate" : "Preporučeni kurs",
	"REJECTED" : "ODBIJEN",
	"Rejected" : "Odbijen",
	"Remove" : "Ukloni",
	"Remove friend" : "(Ne)prijatelj",
	"Report abuse" : "Prijavi zloupotrebu",
	"Represent your country (or eNation) in the real world" : "Predstavi svoju eNaciju stvarnom svetu",
	"Requirements" : "Zahtevi",
	"Resign" : "Otkaz",
	"Resistance Hero" : "Heroj oslobodilačkog rata",
	"Resistance War" : "Oslobodilački rat",
	"Resistance War Active" : "Aktivni oslobodlilački rat",
	"Romania" : "Rumunija",
	"RURAL AREA" : "RURALNA OBLAST",
	"Russia" : "Rusija",
	"Salary" : "Plata",
	"See all donations" : "Sve donacije",
	"See all employees" : "Svi zaposleni",
	"See all law proposals" : "Svi predloženi zakoni",
	"See all members" : "Svi članovi",
	"see finished battles" : "završene bitke",
	"See results" : "Rezultati",
	"Select" : "Odaberi",
	"Secure" : "Bezbedno",
	"Sell" : "Prodaj",
	"Sell company" : "Prodaj kompaniju",
	"Send message" : "Pošalji poruku",
	"Sent" : "Poslato",
	"September" : "Septembar",
	"Serbia" : "Srbija",
	"Sergeant" : "Sergeant",
	"Shop" : "Prodavnica",
	"Shout" : "Pošalji",
	"Shout something:" : "Izjavi nešto",
	"Show active wars" : "Aktivni ratovi",
	"Show all donations" : "Prikaži donacije",
	"Show all employees" : "Prikaži zaposlene",
	"show finished battles" : "prikaži završene bitke",
	"Show my offers" : "Moje ponude",
	"Singapore" : "Singapur",
	"Skill" : "Veština",
	"Skill level" : "Nivo veštine",
	"Skills:" : "Veštine",
	"Skills" : "Veštine",
	"Slovakia" : "Slovačka",
	"Slovenia" : "Slovenija",
	"Social orientation" : "Društvena orijentacija",
	"Social stats" : "Društveni podaci",
	"Society" : "Društvo",
	"Society Builder" : "Graditelj zajednice",
	"South Africa" : "Južna Afrika",
	"South Korea" : "Južna Koreja",
	"Spain" : "Španija",
	"Start a resistance war and liberate that region" : "Započni oslobodilački rat i oslobodi oblast",
	"Started a resistance war and liberated " : "Započet oslobodilački rat i oslobeđena ",  " regions." : " oblast.",
	"Started by" : "Započeo/la:",
	"started by" : "započeo/la: ",
	"started on" : "počeo",
	"Still active " : "još uvek aktivan",
	"Stock" : "Zaliha",
	"Strength" : "Snaga",
	"Subscribe" : "Pretplati se",
	"Subscribe to comments" : "Prati komentare",
	"Subscriptions" : "Pretplata",
	"SUBURBIA" : "PREDGRAĐE",
	"Super Soldier" : "Super Vojnik",
	"supported by" : "podržavaju ga",
	"Supporting parties" : "Ispred stranke",
	"Sweden" : "Švedska",
	"Switzerland" : "Švajcarska",
	"Tax change: Diamonds" : "Promena poreza: Dijamanti",
	"Tax change: Food" : "Promena poreza: Hrana",
	"Tax change: Gift" : "Promena poreza: Pokloni",
	"Tax change: Grain" : "Promena poreza: Žito",
	"Tax change: House" : "Promena poreza: Kuće",
	"Tax change: Iron" : "Promena poreza: Gvožđe",
	"Tax change: Moving Tickets" : "Promena poreza: Karte",
	"Tax change: Weapon" : "Promena poreza: Oružje",
	"Tax change: Wood" : "Promena poreza: Drvo",
	"Taxes" : "Porezi",
	"Terms of Service" : "Uslovi",
	"Thailand" : "Tajland",
	"The company offers no products in this market" : "Kompanija nema ponuda na ovom tržištu",
	"The law voting process takes 24 hours." : "Proces glasanja traje 24 sata.",
	"There are no resistance wars in this country." : "U ovoj državi nema oslobodilačkih ratova.",
	"This citizen does not have any donations sent or received." : "Ova/j građanin/ka nije ni primio ni slao donacije.",
	"This country can trade with any other country in eRepublik. " : "Ova država može da trguje sa svim državama u eRepubliku.",
	" to stay in touch with what happens on eRepublik." : " da biste ostali u toku sa dešavanjima u eRepubliku.",
	"today" : "danas",
	"Today" : "danas",
	"Tools" : "Alati",
	"Top Rated" : "Najčitanije",
	"Total Citizens" : "Ukupno građana",
	"Total citizens" : "Ukupno eGrađana",
	"Total damage:" : "Ukupna šteta:",
	"Total votes:" : "Ukupno glasova",
	"Treasury" : "Kasa",
	"Turkey" : "Turska",
	"Tutorials" : "Uputstva",
	"Ukraine" : "Ukrajina",
	"UNDERGROUND" : "PODZEMLJE",
	"Unemployed" : "Nezaposlen/a",
	"United Kingdom" : "Velika Britanija",
	"Unsubscribe" : "Otkaži pretplatu",
	"Unsubscribe to comments" : "Prestani da pratiš komentare",
	"until the region can be occupied or secured" : "dok oblast ne bude oslobođena ili osigurana",
	"Update" : "obnovi",
	"Upgrade quality level" : "Unapredi kvalitet",
	"Uruguay" : "Urugvaj",
	"USA" : "USA",
	"Value added tax (VAT)" : "Porez na dodatu vrednost (PDV)",
	"Venezuela" : "Venecuela",
	"View all comments" : "Svi komentari",
	"Vote" : "Glasaj",
	"War" : "Rat",
	"Wars" : "Ratovi",
	"Wars list" : "Lista ratova",
	"Weapon" : "Oružje",
	"weapon" : "oružje",
	"Weapon quality" : "Kvalitet oružja",
	"Wellness" : "Zdravlje",
	"Who" : "Ko",
	"Wildcards" : "Dodatni",
	"Win the Congress elections": "Pobedi na izborima za kongresmene",
	"Won the Congress elections": "Izabran/a na izborima za kongresmene",
	"Win the Presidential elections": "Pobedi na izborima za predsednika",
	"Won the Presidential elections": "Izabran/a na predsedničkim izborima",
	"Wood" : "Drvo",
	"wood" : "drvo",
	"Worked 30 days in a row" : "radio/la 30 dana uzastopno",
	"World" : "Svet",
	" xp points " : " iskustveni poeni ",
	"Yes" : "Da",
	"yesterday" : "juče",
	"You are not a member of a party" : "Nisi član stranke",
	"You are not a president or a congress member in this country" : "Nisi predsednik/ca ni kongresmen/ka u ovoj državi",
	"You are not a President or a Congress Member in this country" : "Nisi predsednik/ca ni kongresmen/ka u ovoj državi",
	"You can exchange money at the" : "Možeš razmeniti valute na: ",
	"You can get wellness from:" : "Zdravlje možeš dobiti:",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Možeš se priključiti stranci na stranici same stranke ili kreirati sopstvenu stranku ukoliko ti se nijedna od postojećih ne dopada. Članstvo u stranci ti omogućuje da postaneš kongresmen ili čak predsednik.",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Ne možeš pokrenuti oslobodilački rat u ovoj oblasti, jer već pripada originalnoj državi",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Ne možeš pokrenuti oslobodilački rat u ovoj oblasti, jer već pripada originalnoj državi",
	"You cannot trade with this country as you are at war with it" : "Ne možeš trgovati sa ovom državom - u ratu ste",
	"You didn't specify the amount of products you wish to buy" : "Nisi naveo/la količinu koju želiš da kupiš",
	"You do not own a moving ticket. You can buy moving tickets from Marketplace" : "Nemaš kartu. Kartu možeš kupiti na Pijaci.",
	"You do not have a newspaper" : "Nemaš novine",
	"You don't have a newspaper" : "Nemaš novine",
	"You don't have any active job offers" : "Nemaš otvorenih radnih mesta",
	"You do not have any active job offers" : "Nemaš otvorenih radnih mesta",
	"You have already worked today." : "Već si radio/la danas.",
	"You have succesfully edited your profile" : "Profil uspešno izmenjen",
	"You have trained today. You can train again tomorrow." : "Trenirao/la si danas. Sutra možeš opet trenirati",
	"Your account" : "Moj nalog",
	"Your accounts" : "Moja imovina",
	"Your birthday" : "Moj rođendan",
	"Your comment" : "Moj komentar",
	"Your companies" : "Moje kompanije",
	"Your email here" : "Email",
	"Your inventory" : "Inventar",
	"Your offer has been updated" : "Vaša ponuda je obnovljena",


};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 saveznika";
regexps["^Active wars in (.*)$"] = "$1 aktivni ratovi u";
regexps["^Active resistance wars in (.*)$"] = "$1 aktivni oslobodliački ratovi u";
regexps["(\\s*)Expires in (\\d*) days"] = "$2 ističe za";
regexps["^(\\d*) comments$"] = "$1 komentari";
regexps["^(\\d*) hours ago$"] = "pre $1 sata";
regexps["^(\\d*) minutes ago$"] = "pre $1 minuta";
regexps["^(\\d*) days ago$"] = "pre $1 dana";
regexps["^(\\d*) months ago$"] = "pre $1 meseca";
regexps["^Regions \\((\\d*)\\)"] = "Oblasti ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Prijatelji ($1)";
regexps["^(\\d*) months"] = "$1 meseca";
regexps["^Comments(.*)"] = "Кomentari$1";
regexps["^Trackbacks(.*)"] = "Linkovano$1";


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