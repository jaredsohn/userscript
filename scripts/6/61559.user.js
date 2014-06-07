// ==UserScript==
// @name           eRepublik Slovak Translation
// @author          Bajzik
// @description   Slovenský preklad eRepublik
// @include         http://www.erepublik.com/*
// ==/UserScript==

// server where you added translated images
var imgServer = "http://nicneumel.zaridi.to/";


// strings to translate - have to insert whole text or use regular expression
var strings = {
// menu
  "Home" : "Domov",
  "Donate" : "Pošli peníze",
  "May" : "Květen",
  "June" : "Červen",
  "July" : "Červenec",
  "Day" : "Den ",
  "of the New World" : " nového světa",
  "Rank" : "Hodnocení",
  "Company" : "Firma",
  "Profile": "Profil",
  "Party" : "Strana",
  "Newspaper" : "Noviny",
  "Army" : "Armáda",
  "Country administration" : "Správa země",
  "Organizations" : "Organizace",
  "Market" : "Obchod",
  "Monetary market" : "Směnárna",
  "Monetary Market" : "Směnárna",
  "Job market" : "Trh práce",
  "Companies for sale" : "Firmy na prodej",
  "Get Gold & Extras" : "Získej zlato a bonusy",
  "Rankings" : "Statistiky",
  "Social stats" : "Sociální statistiky",
  "Economic stats" : "Ekonomické statistiky",
  "Political stats" : "Politické statistiky",
  "Military stats" : "Vojenské statistiky",
  "Tutorials" : "Tutoriály",
  "Tools" : "Nástroje",
  "Forum" : "Forum",
  "Wiki" : "Wiki",
  "Blog" : "Blog",
  "News" : "Noviny",
  "Invite friends" : "Pozvi přátele",
  "eRepublik Shop" : "eRepublik shop",
  "Shop" : "Obchod",
  "Press" : "Tisk",
  "Contact" : "Kontakt",
  "Jobs" : "Práce",
  "Terms of Service" : "Podmínky provozu",
  "Privacy" : "Soukromí",
  "Affiliates" : "Pobočky",
  "eRepublik Laws" : "Zákony eRepublik",
  "Career path" : "Kariérní postup",
  "You should work today" : "Dnes bys měl jít do práce",
  "It will help you increase both your skill and savings."  : "Pomůže ti to zlepšit tvoje  dovednosti a finanční situaci",
  "You should train today" : "Měl bys dnes trénovat",
  "Your strength can make you a hero on the battlefield." : "Tvá sílá z tebe může udělat bitevního hrdinu.",
  "Now you can visit the forum or read the news to stay in touch with what happens on eRepublik." : "Nyní můžeš navštívit forum, přečíst si, co se stalo nového a zůstat v kontaktu s děním na eRepublik.",
  "Skip" : "Další",
  "Ok, thanks, next tip" : "Děkuji, další radu",
  "I have nothing more to say at the moment" : "Nemám ti teď co dál říct",
  "Select" : "Vyber si",
  "Latest events" : "Nejnovější události",
  "News" : "Novinky",
  "More events" : "Více událostí",
  "more events" : "více událostí",
  "More news" : "Více zpráv",
  "more news" : "více zpráv",
  "Marketplace" : "Obchod",
  "Wars" : "Války",
  "My places" : "Moje miesta",
  "Markets" : "Obchody",
  "Info" : "Info",
  "Community" : "Komunita",
  "Day of the new world" : "Den z nového světa",
  "National" : "Domácí",
  "International" : "Mezinárodní",
  "Latest Events" : "Nejnovější události",
  "Shouts" : "Vzkazy",
  "Shout something:" : "Vzkaž něco",
  "Shout" : "Vzkaž",
  "Official" : "Oficiální",
  "Everyone" : "Všichni",
  "Latest" : "Nejnovější",
  "Search citizen" : "Najdi občana",
  "Shout" : "Vzkaz",
  "Latest" : "Nejnovější",
  "one minute ago" : "před minutou",
  "for 10 shouts/day and more" : "pro 10 vzkazů/den a víc",
  "No more shouts for today" : "Pro dnešek už žádné další vzkazy",
  "Top rated" : "Nejlepší",

// country page
  "On the Map" : "Na mapě",
  "Total citizens" : "Občanů celkem",
  "New citizens today" : "Nový občané během dneška",
  "Average citizen level" : "Průměrný level občanů",
  "Online now": "Občané on-line",
  "Citizens" : "Občané",
  "Who" : "Kdo",
  "details" : "detaily",
  "Society" : "Společnost",
  "Economy" : "Ekonomika",
  "Politics" : "Politika",
  "Military" : "Armáda",
  "Administration" : "Administrace",
	
// countries
  "Argentina" : "Argentína",
  "Australia" : "Austrálie",
  "Austria" : "Rakousko",
  "Belgium" : "Belgie",
  "Bolivia" : "Bolívie",
  "Bosnia and Herzegovina" : "Bosna a Hercegovina",
  "Brazil" : "Brazílie",
  "Bulgaria" : "Bulharsko",
  "China" : "Čína",
  "Colombia" : "Kolumbie",
  "Croatia" : "Chorvatsko",
  "Canada" : "Kanada",
  "Czech Republic" : "Česká republika",
  "Chile" : "Chile",
  "Denmark" : "Dánsko",
  "Estonia" : "Estonsko",
  "Finland" : "Finsko",
  "France" : "Francie",
  "Germany" : "Německo",
  "Greece" : "Řecko",
  "Hungary" : "Maďarsko",
  "India" : "Indie",
  "Indonesia" : "Indonésie",
  "Ireland" : "Irsko",
  "Israel" : "Izrael",
  "Italy" : "Itálie",
  "Iran" : "Irán",
  "Japan" : "Japonsko",
  "Latvia" : "Lotyšsko",
  "Lithuania" : "Litva",
  "Malaysia" : "Malajsie",
  "Mexico" : "Mexiko",
  "Moldavia" : "Moldavsko",
  "Netherlands" : "Nizozemsko",
  "Norway" : "Norsko",
  "Pakistan" : "Pákistán",
  "Philippines" : "Filipíny",
  "Poland" : "Polsko",
  "Portugal" : "Portugalsko",
  "Romania" : "Rumunsko",
  "Serbia" : "Srbsko",
  "Singapore" : "Singapur",
  "South Africa" : "JAR",
  "South Korea" : "Jižní Korea",
  "Slovakia" : "Slovensko",
  "Slovenia" : "Slovinsko",
  "Switzerland" : "Švýcarsko",
  "Spain" : "Španělsko",
  "Sweden" : "Švédsko",
  "Russia" : "Rusko",
  "Thailand" : "Thajsko",
  "United Kingdom" : "Velká Británie",
  "Ukraine" : "Ukrajina",
  "USA" : "USA",
  "Turkey" : "Turecko",
  "Venezuela" : "Venezuela",
  "North Korea" : "KLDR",
  "World" : "Svět",
  "Resistance Force" : "Odboj",
  "the Resistance Force" : "Odboj",

// economy
  "GOLD" : "ZLATO",
  "Gold" : "Zlato",
  "Treasury" : "Finační zásoby",
  "All accounts" : "Všechny účty",
  "Country trading embargoes" : "Země na které je uvaleno obchodní embargo",
  "Taxes" : "Daně",
  "food" : "jídlo",
  "gift" : "dárek",
  "weapon" : "zbraň",
  "moving tickets" : "letenka",
  "grain" : "obilí",
  "diamonds" : "diamanty",
  "iron" : "železo",
  "oil" : "ropa",
  "wood" : "dřevo",
  "house" : "domy",
  "hospital" : "nemocnice",
  "defense system" : "obranný systém",
  "Defense system" : "Obranný systém",
  
  
  "Salary" : "mzda",
  "Minimum" : "Minimální",
  "Average" : "Průměrná",
  
  "Gross domestic product (GDP)" : "Hrubý domácí produkt (HDP)",
  "Monthly exports" : "Měsíční export",
  "Monthly imports" : "Měsíční import",
  "Inflation" : "Inflace",

// company
  "Office" : "Kancelář",
  "You have already worked today." : "Už jste dnes pracovali.",
  "Come back tomorrow." : "Vraťte se zítra",
  "Resign" : "Odejít",
  "Employees" : "Zaměstnanci",
  "Raw materials" : "Suroviny",
  "Show all employees" : "Ukaž zaměstnance",
  "Show all donations" : "Ukaž dotace",
  "Go to marketplace" : "Nakup",
  "Products" : "Zboží",
  "Jobs available in this company" : "Pracovní pozice dostupné v této firmě",
  "You do not have any active job offers" : "Nemáte žádné aktivní nabídky práce",
  "The company offers no products in this market" : "Firma nenabízí žádné produkty na tomto trhu",
  "Amount" : "Množství",
  "Price" : "Cena",
  "Price with taxes" : "Cena+daně",
  "Company Page" : "Stránka firmy",
  "Today" : "Dnes",
  "Yesterday" : "Včera",
  "All employees" : "Všichni zaměstnanci",
  "Skill" : "Pracovní výkon",
  "Daily salary" : "Denní mzda",
  "Last presence" : "Naposledy v práci",
  "Minimum country wage" : "Minimální mzda v zemi",
  "Minimum country wage :" : "Minimální mzda v zemi :",
  
  "Grain" : "Obilí",
  "Food" : "Jídlo",
  "Gift" : "Dárek",
  "Weapon" : "Zbraň",
  "Moving Tickets" : "Letenka",
  "Diamonds" : "Diamanty",
  "Iron" : "Železo",
  "Oil" : "Ropa",
  "Wood" : "Dřevo",
  "House" : "Dům",
  "Hospital" : "Nemocnice",
  "Defense System" : "Obranný systém",

// market
  "Quality Level" : "Kvalita",
  "All levels" : "Všechny kvality",
  "Level 1" : "nejhorší",
  "Level 2" : "horší",
  "Level 3" : "střední",
  "Level 4" : "lepší",
  "Level 5" : "nejlepší",
  
  "Provider" : "Prodejce",
  "Quality" : "Kvalita",
  "Stock" : "Zásoby",
  "Buy" : "Kup",
  "Market" : "Obchod",
  
  "Market offers" : "Nabídky na trhu",
  "Amount" : "Množství",
  "Price" : "Cena",
  "Next" : "Další",
  "Prev" : "Předchozí",
  "No products in this market" : "Žádné produkty již nejsou k prodeji",
  "Go to marketplace" : "Jdi do obchodu",
  "Jobs available in this company" : "Pracovní pozice dostupné ve firmě",
  "You don't have any active job offers" : "Nemáte žádné aktivní nabídky práce",
  "You didn't specify the amount of products you wish to buy" : "Neurčili jste množství zboží, které chcete koupit",
  "You cannot trade with this country as you are at war with it" : "Nemůžete obchodovat s touto zemí, protože jste s ní ve válce",

// region
  "Citizens" : "Občané",
  "Country - Society" : "Země-společnost",
  "Heal" : "Uzdravit se",
  "Constructions": "Stavby",
  "Population": "Populace",
  "Productivity" : "Produktivita",
  "Resistance War" : "Osvobozenecká válka",
  "Resistance War Active" : "Aktivní osvobozenecká válka",
  "You can't start a resistance war in this region because it already belongs to its original owner country" : "Nemůžete zde započít osvobozeneckou válku, neboť region náležípůvodnímu majiteli",
  "Medium" : "Střední",
  "High": "Vysoká",
  "Neighbors" : "Sousedé",

// marketplace
  "Please select an Industry to see the marketplace offers" : "Vyberte odvětví, ve kterém chcete vidět nabídky na trhu",
  "Skill Level" : "Úroveň pracovních dovedností",
  "All skills" : "Všechny úrovně",
  "All" : "Všechno",

// politics
  "Country Administration" : "Správa země",
  "Accepted" : "Odsouhlaseno",
  "Rejected" : "Zamítnuto",
  "Pending" : "Hlasuje se",
  "Congress" : "Kongres",
  "Issue Money" : "Natisknout peníze",
  "Law proposals" : "Návrhy zákonů",
  "Minimum Wage" : "Minimální mzda",
  "Mutual Protection Pact" : "MPP",
  "Peace Proposal" : "Mírová smlouva",
  "President" : "Prezident",
  "Yes" : "Ano",
  "No" : "Ne",
  "Show all law proposals" : "Ukaž všechny návrhy zákona",
  "The law voting process takes 24 hours." : "Schvalovací proces u tohoto zákona trvá 24 hodin.",
  "Only congress members and country presidents have the right to vote." : "Pouze kongresmani a prezidenti mají právo volit.",
  "You are not a president or a congress member in this country." : "Nejste prezidentem nebo kongresmanem v této zemi.",

// wars
  "no allies" : "žádní spojenci",
  "All wars" : "Všechny války",
  "All resistance wars" : "Všechny osvobozenecké války",
  "All Alliances" : "Všechna spojenectví",
  "Alliances" : "Spojenectví",
  "Military force" : "Vojenská síla",
  "Average strength" : "Průmerná síla",
  "War > Battlefield" : "Válka > Bojiště",
  "Basic damage" : "Základní útok",
  "Weapon quality" : "Kvalita zbraní",
  "Wellness" : "Zdraví",
  "Rank" : "Hodnost",
  "Total damage" : "Celkový útok",
  "You cannot join this fight because your wellness must be at least 40. You can get wellness from" : "Nemůžete bojovat ve válce, protože vaše zdraví je nižší než 40. Můžete získat zdraví z",

// army
  "Train" : "Trénuj",
  "You have trained today. You can train again tomorrow." : "Už jste dnes trénovali, zítra můžete zas.",
  "Force" : "Jednotka",
  "Military rank" : "Vojenská hodnost",
  "Military achievements" : "Vojenská vyznamenání",
  "Active wars list" : "Seznam aktivních válek",
  "Sergeant" : "Seržant",
  "Corporal" : "Desátník",
  "Private" : "Vojín",
  "Colonel" : "Plukovník",
  "General" : "Generál",
  "Marshal" : "Maršál",
  "Sergeant!" : "Seržante!",
  "Corporal!" : "Desátníku!",
  "Private!" : "Vojíne!",
  "Colonel!" : "Plukovníku!",
  "General!" : "Generále!",
  "Marshal!" : "Maršále!",  
  "Show active wars" : "Ukaž aktivní války",
  "Start a resistance war" : "Začni osvobozeneckou válku",
  "You do not have the necessary amount of Gold to start a resistance war." : "Nemáte dostačné množství goldů, aby jste mohli začít válku.",
  "You cannot join this fight because your country is not involved in the war" : "Nemůžete bojovat, protože vaše země není zapojená ve válce.",
  "There are no resistance wars in this country." : "V této zemí neprobíhají žádné osvobozenecké války.",
  "until the region can be occupied or secured" : "dokud nebude region dobyt nebo ubráněn",
  "Attackable on President's decision" : "Útokoschopnost na prezidentovo rozhodnutí",
  "Defense Points" : "Obranné body",
  "Go to Battlefield" : "Jdi do bitvy",
  "see finished battles" : "podívej se na skončené bitvy",
  "Wars list" : "Seznam válek",
  "War" : "Válka",
  "Battle history" : "Historie bitev",
  "Fight" : "Bojuj",
  "Hero" : "Hrdina",
  "Started by" : "Započatá",
  "started by" : "započatá",
  "Fight for resistance" : "Bojuj za nezávislost",
  "Fight for defenders" : "Bojuj za obránce",

// party
  "Get more" : "Více",
  "Country presidency" : "Prezident",
  "Winner" : "Vítěz",
  "Next election in" : "Další volby za",
  "Next elections in" : "Další volby za",
  "No candidate proposed" : "Nebyl navrhnut žádný kandidát",
  "candidates" : "kandidáti",
  "Candidate" : "Kandidát",
  "days" : "dny",
  "GOLD" : "ZLATO",
  "Show results" : "Ukaž výsledky",
  "Show candidate list" : "Ukaž seznam kandidátů",
  "Show candidates list" : "Ukaž seznam kandidátů",
  "You are not a member of a party" : "Nejste členem strany",
  "Join a party" : "Vstup do strany",
  "Create new" : "Vytvořit novou",
  "congress members" : "členové kongresu",
  "Party Member , Congress Member" : "Člen strany , Člen kongresu",
  "of Congress" : "z kongresu",
  "Show proposed members of congress" : "Ukaž navrhované kongresmany",
  "Run for congress" : "Kandiduj do kongresu",
  "Join" : "Přidej se",
  "See all members" : "Ukaž seznam všech členů",
  "Donate Gold" : "Pošli zlato",
  "Members" : "Členové",
  "Orientation" : "Orientace",
  "Show all members" : "Ukaž všechny členy",
  
  "Center" : "Středová",
  "Anarchist" : "Anarchistická",
  "Accounts" : "Účty",
  "Elections" : "Volby",
  "Election results" : "Výsledky voleb",
  "Next elections" : "Další volby",
  
  "Country Presidency" : "Prezident",
  "Party presidency" : "Předseda strany",
  "Party President" : "Předseda strany",
  "See results" : "Ukaž výsledky",
  "Expires tomorrow" : "Projde zítra",

// articles
  "Report abuse" : "Oznam porušení pravidel",
  "today" : "dnes",
  "yesterday" : "včera",
  "one hour ago" : "před hodinou",
  "Unsubscribe" : "Zrušit předplatné",
  "Subscribe" : "Předplať",
  "Article RSS" : "RSS článku",
  "Your comment" : "Tvůj komentář",
  "View all comments" : "Ukaž všechny komentáře",
  "Subscribe to comments" : "Předplať si komentáře",
  "Unsubscribe to comments" : "Zruš předplatné komentářů",
  "Post a comment" : "Odešli komentář",

// news
  "You do not have a newspaper" : "Nevlastníte noviny",
  "A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Noviny jsou způsob jak komunikovat s eRepublik světem. Přečti si víc na eRepublik Wiki. Vytvoř si svoje vlastní noviny.",

// profiles
  "National Rank" : " Národní hodnocení ",
  "Forfeit Points" : "Přestupkové body",
  "Online" : "Online",
  "Send message" : "Odešli zprávu",
  "Remove friend" : "Odstraň z přátel",
  "Add as a friend" : "Přidej do přátel",
  "Offer a gift" : "Daruj dárek",
  "Friends" : "Přátelé",
  "Fights" : "Souboje",
  "ShareThis" : "Sdílej to",
  "Shout something:" : "Vzkaž něco:",
  "Assets" :  "Majetek",
  "Press director" : "Šéfredaktor",
  "Inventory" : "Inventář",
  "IRR" : "IRR",
  "Get Gold" : "Získej zlato",
  "Career" : "Kariéra",
  "Bio" : "Bio",
  "Employee" : "Zaměstnanec",
  "No political activity" : "Nestraník",
  "Wellness" : "Zdraví",
  "Level" : "Úroveň",
  "Strength" : "Síla",
  "Experience" : "Zkušenosti",
  "Skills:" : "Pracovní dovednosti",
  "Skills" : "Pracovní dovednosti",
  "Land" : "Zemědělství",
  "Manufacturing" : "Výroba",
  "Erepublik Age" : "eRepublik věk",
  "Get Extra Storage" : "Získej víc místa ",
  "Party Member" : "Člen strany",
  "No activity" : "Žádná aktivita",
  "Total damage:" : "Celkem zranění:",
  "Hard Worker" : "Zasloužilý pracovník",
  "Work for 30 days in a row" : "Pracuj po 30 dní v kuse",
  "Congress Member" : "Kongresmen",
  "Won the Congress elections" : "Vyhraj volby do kongresu",
  "Country President" : "Prezident",
  "Win the Presidential elections" : "Vítěz v prezidentských volbách",
  "Media Mogul" : "Mediální magnát",
  "Reach 1000 subscribers to your newspaper" : "Sežeň 1000 předplatitelů pro svoje noviny",
  "Battle Hero" : "Bitevní hrdina",
  "Reach the highest total damage in one battle" : "Dosáhni nejvyššího celkového útoku v bitvě",
  "Resistance Hero" : "Osvobozenecký hrdina",
  "Start a resistance war and liberate that region" : "Začni osvobozeneckou válku a osvoboď region",
  "Super Soldier" : "Supervoják",
  "Advanced 5 strength levels" : "Dosáhni síly levelu 5",
  "Society Builder" : "Budovatel společnosti",
  "Invite 10 people to eRepublik and help them reach level 6" : "Pozvi 10 občanů a pomoz jim dosáhnout levelu 6",
  "Ambassador" : "Velvyslanec",
  "Represent your country (or eNation) in the real world" : "Reprezentuj svou zemi (nebo eNárod) v reálném světě",
  "Check your unlocked features" : "Vyzkoušej neodemčené nástroje",
  "Achievements" : "Vyznamenání",
  "Edit profile" : "Uprav profil",
  "Edit Profile" : "Uprav profil",
  "Change residence" : "Změň bydliště",
  "Donations list" : "Seznam darů",
  
  "Your email here" : "E-mail",
  "Your birthday" : "Narozeniny",
  "Citizen Avatar" : "Občanův avatar",
  "Change password" : "Změna hesla",
  
  
  "Worked 30 days in a row" : "Pracoval 30 dní v kuse",
  "Win the Congress elections": "Vyhrál volby do kongresu",

// fight
  "Back to battlefield" : "Zpět do bitvy",
  "Fight Again" : "Bojuj znovu",
  "Fight bonus" : "Bojový bonus",

// organizations
  "In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "V případě přihlášení se jako organizace, odhlašte svůj občanský účet a přihlaště se jako organizace s vaším uživatelským jménem a heslem",
  "My Organizations" : "Moje organizace",
  "Logout" : "Odhlásit se",
  "Organizations created by you:" : "Vámi vytvořené organizace",
  "You have not created any organization yet." : "Ještě nemáte vytvořenou organizaci",

// career-path
  "General manager" : "Ředitel podniku",
  "Hard worker" : "Zasloužilý pracovník",

// ranking
  "No." : "Č.",
  "Hard worker" : "Zasloužilý pracovník",

// Forums
  "Help" : "Nápověda",
  "Contracts" : "Smlouvy",
  "Off-Topic" : "Offtopic",
  "Rules" : "Pravidla",
  "Suggestions" : "Požadavky",
  "Updates" : "Updaty",
  "Open letters" : "Otevřené dopisy",
  "Contests" : "Soutěže",
  "Buy or sell companies" : "Kup nebo prodej firmu",
  "Buy or sell hospitals and defense system" : "Kup nebo prodej nemocnici a defense system",
  "Shares, investments and partnerships" : "Akcie, investice a partnerství",
  "Companies looking for workers" : "Firmy hledající zaměstnance",
  "Other announcements" : "Ostatní oznámení",
  "Forum index" : "Hlavní strana fora",
  "The New World" : "Nový svět",
  "Topics" : "Témata",
  "Posts" : "Příspěvky",
  "Discussions" : "Diskuze",
  "Last Message" : "Poslední Zpráva",
  "Announcements" : "Oznámení",
  "Replies" : "Odpovědí",
  "Views" : "Vidělo",
  "New topic" : "Nové téma",
  "(last page)" : "(poslední stránka)",
  "Topic" : "Téma",

// messages
  "Inbox" : "Příchozí",
  "Sent" : "Odeslané",
  "Alerts" : "Výstrahy",
  "Subscriptions" : "Zapsání",
  "Select all" : "Vybrat vše",
  "Unsubscribe" : "Odzapsat",
  "Weekly news" : "Týdenní novinky",
  "Turn On" : "Zapnout",
  "new article" : "nový článek",
  "Write article" : "Napsat článek",
  "Edit newspaper details" : "Upravit detaily u novin",
  "Edit" : "Upravit",
  "Delete" : "Smazat",
  "Read Message" : "Přečíst Zprávu",
  "Reply" : "Odpovědět",
  "From" : "Od",
  "Back" : "Zpět",
  "Picture" : "Obrázek",
  "only JPG files allowed" : "jsou povoleny pouze JPG soubory",
  "Publish" : "Publikovat",

// flash menu
  "My places > Army" : "Moje miesta > Armáda",
  "My places > Party" : "Moje místa > Strana",
  "My places > Newspaper" : "Moje místa > Noviny",
  "My places > Organizations" : "Moje místa > Organizace",

// menu
  "Find out more" : "Zjistit víc",
  "logout" : "odhlásit",
  "Follow us" : "Sledujte nás",
  
  
// moje přídavky
  "Translate" : "Přelož",
  "Undo translate" : "Vrať překlad",
  "read more" : "více ...",
  "You are now officially known as a Hard Worker. Dreams create realities, through hard work." : "Jsi teď oficiálně známý jako Tvrdý Dříč. Sny se stávají realitou skrz těžkou práci.",
  "Online Strategy Game" : "Online Strategická Hra",
  "new events" : "nové události",
  "Get Wellness" : "Získej zdraví",
  "eRepublik Birthday" : "Narozeniny",
  "Select quality level" : "Vyberte kvalitu",
  "Indispensable for surviving in the New World. Each day, automatic consume will increase citizen's wellness." : "Nejpotřebnější pro přežití v Novém Světě. Každý den se automaticky spotřebuje a zvýší zdraví občana.",
  "Offering gifts to other citizens will increase their wellness." : "Nabídnutím dárku jinému občanovi zvýšíte jejich zdraví.",
  "Every fight will consume the highest quality weapon from the inventory, improving the citizen's damage." : "Každý boj spotřebuje zbraň nejvyšší kvality z inventáře, vylepšujíc tak poškození způsobené občanem.",
  "Required for changing residence. Its quality determines how the move will affect the citizen's wellness." : "Potřebné pro změnu bydliště. Kvalite rozhoduje jaký bude mít přesun efekt na zdraví občana.",
  "Raw material nedeed to produce food." : "Surovina potřebná pro výrobu jídla.",
  "Raw material nedeed to produce gifts." : "Surovina potřebná pro výrobu dárků.",
  "Raw material needed to produce weapons." : "Surovina potřebná pro výrobu zbraní.",
  "Raw material nedeed to produce moving tickets." : "Surovina potřebná pro výrobu letenek.",
  "Raw material nedeed to construct houses, hospitals and defense systems." : "Surovina potřebná pro stavbu domů, nemocnic a obranných systémů.",
  "Each day, the highest quality house from the inventory increases citizen's wellness." : "Každý den zvyšuje dům nejvyšší kvality v inventáři zdraví občana.",
  "Soldiers living in a region that has an hospital can benefit from its healing capabilities." : "Vojáci žijící v regionu, který má nemocnici, mohou využívat možnosti léčení zranění.",
  "The fortifications are enhanced in a region where a defense system has been installed." : "V regionech, kde je postaven obranný systém, je vylepšené opevnění.",
  "All industries" : "Všechny odvětví",
  "Create new company" : "Vytvořit novou firmu",
  "Minimum Skill" : "Minimální skill",
  "Minimum skill" : "Minimální skill",
  "Industry" : "Průmysl",
  "Interactive Map" : "Interaktivní Mapa",
  "Sell" : "Prodej",
  "Show my offers" : "Moje nabídky",
  "Show all offers" : "Všechny nabídky",
  "Post new offer" : "Nová nabídka",
  "Exchange rate" : "Kurz výměny",
  "Amount to buy" : "Kolik koupit",
  "Rec exchange rate" : "Doporučený kurz ",
  "Apply" : "Žádej",
  
  "If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that we can officially change it to an organization." : "",
  "After 15th of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned." : "",
  "Your friendship request has been sent." : "Tvá žádost o přátelství byla odeslána",
  "Congratulations on winning the elections! May wisdom be bestowed upon your administration!"  : "Gratulujeme k vítězství ve volbách, nejspíše byli doceněny vaše zásluhy na správě země.",
  "You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Dostanete 5 goldů za každého pozvaného občana, který dosáhne levelu 6",
  "Your personal invitation link" : "Tvůj osobní zvací odkaz",
  "Post this link on forums, blogs, messenger status or send it by yourself via email. People that register using your personal link will get you 5 Gold when they reach level 6." : "Pošli tento odkaz na fora, blogy, do statusů, nebo je odešli někomu jako e-mail. Lidé, kteří se zaregistrují přez tvůj osobní zvací odkaz a dosáhnou levelu 6 ti dodají 5 goldů.",
  "Your friend´s email" : "E-mail tvého kamaráda",
  "Use commas to separate multiple email addresses" : "Používejte čárky k oddělení více e-mailových adres",
  "Add from address book" : "Přidej z adresáře",
  "Invites status" : "Stav pozvánek",
  "View the status of your invites and bonuses" : "Podívej se na stav tvých pozvánek a bonusů",
  "Track Invites" : "Stav pozvánek",
  "All invites" : "Všechny pozvánky",
  "Accepted invites" : "Přijaté pozvánky",
  "Pending invites" : "Pozvánky čekající na přijetí",
  "Invites" : "Pozvánky",
  "Date sent" : "Datum odeslání",
  "Email" : "E-mail",
  "Citizen name" : "Jméno občana",
  "Experience level" : "Zkušenostní level",
  "There are no invites matching the selected criteria." : "Nejsou zde žádné pozvánky, které by splňovali tato kritéria",
  "Debates concerning economic activities." : "Debaty soustřeďující se na ekonomické otázky.",
  "Sharing opinions concerning social interactions." : "Výměny názorů na společenské otázky",
  "The place for those who are interested in political activities." : "Místo pro ty, kteří se zajímají o politcké dění.",
  "Keeping in touch with other citizens regarding the eRepublik warfare." : "Zůstaň v kontaktu s jinými občany, kteří se zajímají o vojenské dění.",
  "Editors' playground (event coverages & wacky articles)." : "Novinářské hřiště (zajímavé akce & praštěné články).",
  "You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Můžeš vstoupit do strany skrze její úvodní stránku, nebo si můžete vytvořit stranu vlastní. Vstup do strany ti dává možnost se stát kongresmanem a dokonce i prezidentem",
  "Asking other citizens questions that are not answered by Wiki or FAQ." : "Zeptej se jiných občanů na otázky, které nejsou odpovězeny v FAQ a nebo na wiki.",
  "The Official Wiki of eRepublik - a tool for everyone." : "Oficiální eRepublik wiki-nástroj pro všechno.",
  "Official agreements between citizens, companies, countries, regions, parties or newspapers." : "Oficiální dohody mezi občany, firmami, zeměmi, krajemi, stranami nebo novinami.",
  "Content unrelated to eRepublik (that does not offend other citizens)." : "Věci, které se netýkají eRepublik (to, co neuráží ostatní občany).",
  "Guidelines for a better New World." : "Pravidla pro lepší Nový svět.",
  "Imagination is the only limit for changing the future." : "Představivost je jedinou překážkou pro lepší budoucnost.",
  "New features, improvements and solved major issues will be announced and debated in this area." : "Nové funkce, vylepšení a ostatní důležité záležitosti budou oznamovány na tomto místě",
  "Public messages for the eRepublik Staff." : "Veřejné zprávy pro provozovatele eRepublik.",
  "eRepublik Arena" : "eRepublik hřiště",
  "Minimum requirements: country, domain and quality" : "Minimální požadavky: země, obor a kvalita.",
  "Minimum requirements: quality and price" : "Minimální požadavky: kvalita a cena",
  "Business ideas and loan notices" : "Nápady do podnikání a žádosti o půjčku.",
  "Minimum requirements: country, domain, quality, how many positions and, of course, salary." : "Minimální požadavky: země, doména, kvalita, počet míst, a samozřejmě mzda.",
  "New offers or decisions? Post your ad here." : "Nové nabídky a nebo rozhodnutí. Sdělujte je zde.",
  "topics" : "témat",
  "messages" : "zpráv",
  "The skill of gathering raw materials like grains, wood, diamonds, and oil. " : "Schopnost zpracovávat suroviny jako je pšenice, dřevo, diamanty a olej.",
  "The skill of producing food, weapons, gifts and moving tickets." : "Schopnost vyrábět jídlo, zbraně, dárky a letenky.",
  "The skill of building houses, hospitals and defense systems." : "Schopnost stavět domy, nemocnice a obranné systémy.",
  "Training improves your strenght, thus increasing your basic damage." : "Trénování zlepšuje tvojí sílu, tudíž zvyšuje tvůj základní útok.",
  "Each level unlock new features and rewards for the citizen." : "Každý level odemyká občanovi nové funkce a odměny.",
  "Wellness influences citizen´s productivity and basic damage." : "Zdraví ovlivňuje občanovu produktivitu a základní útok.",
  "Citizens are rewarded for every battle in which they have scored the highest total damage." : "Občané jsou odměňovány za každou bitvu, ve které dosáhnou nejvyššího celkového útoku.",
  "Proving valor on the batterfield by damaging enemies will increase the military rank." : "Prokázání odvahy v bitvě útočením na nepřátele ti zvýší tvojí vojenskou hodnost.",
  "Your account" : "Tvůj účet",
  "Location" : "Umístění",
  "Newspaper logo" : "Logo novin",
  "Cost" : "Cena",
  "Make changes" : "Uložit změny",
  "Send a message to us via the contact form if you want to transfer your newspaper to another organization or citizen, please understand that it may take a few days" : "Pokud chceš převéct svoje noviny na jiného občana a nebo organizaci, napiš nám přez kontaktní formulář zprávu, měj ale porozumnění, že to bude trvat i několik dní.",
  "1-80 charactesr max" : "maximálně 1-80 znaků",
  "Email must be valid for registration, so do not cheat" : "E-mail musí být pravý pro registraci, takže nepodvádějte",
  "Current password" : "Součastné heslo",
  "New password" : "Nové heslo",
  "New password again" : "Znovu nové heslo",
  "Market offers" : "Nabídky na trhu",
  "Jobs avaible in this company" : "Pracovní pozice dostupné v této firmě",
  "You do not have any active job offers" : "Nemáte žádné aktivní nabídky práce",
  "Please type your old password" : "Prosím napište vaše staré heslo",
  "Password" : "Heslo",
  "Forgot password?" : "Zapomněl jsi heslo?",
  "Remember me" : "Zapamatovat",
  "Login" : "Přihlásit",
  "Enter the new world" : "Vstup do nového světa",
  "Become a citizen" : "Staň se občanem",
  "It's 100% free and only takes a minute or two" : "je to zdarma",
  "Citizen Name" : "Vaše nové jméno",
  "Retype" : "Heslo znovu",
  "Gender" : "Pohlaví",
  "Month" : "Měsíc",
  "Year" : "Rok",
  "Male" : "Muž",
  "Female" : "Žena",
  "Please select a country" : "Vyber si zemi",
  "Please select a region" : "Vyber si kraj",
  "Select your eRepublik region" : "Vyber si kraj",
  "Moravia" : "Morava",
  "Northern Bohemia" : "Severní Čechy",
  "Southern Bohemia" : "Jižní čechy",
  "Birthday" : "Narozeniny",
  "I agree with the" : "Souhlasím s",
  "Sign up for the weekly newsletter" : "Tohle odškrtni, jinak ti bude chodit spam v angličtině",
  "only" : "Povoleny pouze ",
  "pictures allowed" : " soubory",
  "Now you can visit the" : "Nyní můžete navštívit ",
  "forum" : "fórum",
  "or read the" : ", nebo si přečíst ",
  "news" : "noviny",
  "to stay in touch with what happens on eRepublik." : ", aby jste věděli, co se děje v eRepublik.",
  "Damage" : "Poškození",
  "Join party" : "Přidat se",
  "Requirements" : "Požadavky",
  "Party details" : "Detaily o straně",
  "Disscusion area" : "Místo pro diskuzi",
  "Party name" : "Název strany",
  "Economical orientation" : "Ekonomická orientace",
  "Choose economical orientation" : "Vyber Ekonomickou orientaci",
  "Social orientation" : "Sociální orientace",
  "Choose social orientation" : "Vyber Sociální orientaci",
  "Party logo" : "Logo strany",
  "Far-left" : "Krajně levicová",
  "Center-left" : "Středně levicová",
  "Center-right" : "Středně pravicová",
  "Far-right" : "Krajně pravicová",
  "Totalitarian" : "Totalitní",
  "Authoritarian" : "Autoritativní",
  "Libertarian" : "Liberální",
  "Please choose your party`s economical orientation" : "Prosím vyberne ekonomickou orientaci vaší strany",
  "Please choose your party`s social orientation" : "Prosím vyberne sociální orientaci vaší strany",
  "Country" : "Stát",
  "Name" : "Jméno",
  "Show proposed members" : "Ukaž navržené",
  "of congress" : "členy kongresu",
  "Supporting parties" : "Podporují strany",
  "No. of votes" : "Počet hlasů",
  "% of votes" : "% hlasů",
  "Total votes:" : "Celkem hlasů:",
  "Presence:" : "Účast:",
  "Select domain" : "Zvolte období",
  "Select country" : "Vyberte stát",
  "Select election" : "Vyberte volby",
  "Party elections" : "Stranické volby",
  "Party Elections" : "Stranické volby",
  "Presidential elections" : "Prezidentské volby",
  "President Elections" : "Prezidentské volby",
  "Congressional elections" : "Volby do kongresu",
  "Congress Elections" : "Volby do kongresu",
  "Election" : "Volby",
  "Month/Year" : "Měsíc / rok",
  "Party members" : "Členové strany",
  "Party page" : "Stránka strany",
  "one month ago" : "před měsícem",
  "Select party" : "Vyber stranu",
  "Party candidates" : "Kandidáti za stranu",
  "Newspaper name" : "Název novin",
  "Change the location of your newspaper" : "Pro změnu umístění vašich novin",
  "Send a message to us via the" : "Pošli nám zprávu přes ",
  "contact form" : "kontaktní formulář",
  "if you want to transfer your newspaper to another organization or citizen, please understand that it may take a few days" : " pokud chceš převést své noviny na jiného občana, nebo organizaci. Prosíme o pochopení, protože to může trvat několik dnů.",
  "Title" : "Název",
  "Article" : "Článek",
  "Link" : "Odkaz",
  "Bold" : "Tučně",
  "Italic" : "Kurzíva",
  "Underline" : "Podtrženě",
  "Size" : "Výška",
  "Image" : "Obrázek",
  "Alliance" : "Spojenectví",
  "Debate Area" : "Prostor pro debatu",
  "ACCEPTED" : "PŘIJATO",
  "REJECTED" : "ZAMÍTNUTO",
  "Proposed by" : "Navrhnul ",
  "Buy Constructions" : "Nákup infrastruktury",
  "Tax change" : "Změna daně",
  "New" : "Nový",
  "Old" : "Starý",
  "Import Tax" : "Dovozní daň",
  "Income Tax" : "Daň z příjmu",
  "Value added tax (VAT)" : "Daň z přidané hodnoty (DPH)",
  "President Impeachment" : "Sesazení Prezidenta",
  "Do you agree?" : "Souhlasíte?",
  "New Citizen Fee" : "Platba novým občanům",
  "New Citizen Message" : "Zpráva pro nové občany",
  "Select min skill level" : "Vyber minimální dovednostní level",
  "Top Parties" : "Nejlepší strany",
  "Top Citizens" : "Nejlepší občané",
  "Top Companies" : "Nejlepší firmy",
  "Top Countries" : "Nejlepší země",
  "Top News" : "Nejlepší noviny",
  "Companies" : "Firmy",
  "Countries" : "Země",
  "Parties" : "Strany",
  "Newspapers" : "Noviny",
  "Select region" : "Vyberte kraj",
  "All regions" : "Všechny kraje",
  "Select filter" : "Vyberte filtr",
  "Sort by" : "Řadit dle",
  "Sales" : "Prodejů",
  "No. of Employees" : "Počtu zaměstnanců",
  "Experience points" : "Zkušenostní body",
  "Population number" : "Velikost populace",
  "Unemployment rate" : "Nezaměstnanosti",
  "GDP" : "HDP",
  "Exports" : "Export",
  "Imports" : "Import",
  "No. of companies" : "Počet firem",
  "No. of newspapers" : "Počet novin",
  "Send email invite" : "Pošli pozvánku emailem",
  "Your name" : "Tvoje jméno",
  "Your friend's email" : "Email tvých přátel",
  "Badges" : "Označení",
  "Third Party Tools" : "Utility (ENG)",
  "National Pages and Forums" : "Stránky a fóra zemí",
  "Plus Settings" : "Nastavení Plus",
  "show finished battles" : "ukaž ukončené bitvy",
  "Amazing fight" : "Skvělý boj",
  "Weak fight" : "Dost slabý",
  "You can get wellness from" : "Můžeš si obnovit zdraví v",
  "You cannot start a resistance war in this region because it already belongs to its original owner country." : "Nemůžeš začít odboj v tomto kraji, protože už patří své původní zemi.",

  "January" : "Leden",
  "February" : "Únor",
  "March" : "Březen",
  "April" : "Duben",
  "May" : "Květen",
  "June" : "Červen",
  "July" : "Červenec",
  "August" : "Srpen",
  "September" : "Září",
  "October" : "Říjen",
  "November" : "Listopad",
  "December" : "Prosinec",
  "Jan" : "Leden",
  "Feb" : "Únor",
  "Mar" : "Březen",
  "Apr" : "Duben",
  "May" : "Květen",
  "Jun" : "Červen",
  "Jul" : "Červenec",
  "Aug" : "Srpen",
  "Sep" : "Září",
  "Oct" : "Říjen",
  "Nov" : "Listopad",
  "Dec" : "Prosinec",
  
  //erepublik plus translation
  "Swap currencies" : "Prohodit měny",
  "Reset saved links" : "Vymazat uložené odkazy",
  "Save Links" : " Ukládat odkazy",
  "Wellness shown on All employees page" : " Zobrazovat zdraví na stránce Všichni zaměstnanci",
  "Unit price of Products and Raw Materials" : " Jednotkovou cenu za produkt",
  "Monetary market \"Swap currencies\" link" : " Odkaz \"Prohodit měny\" ve směnárně",
  "Job market filtering" : " Filtrování na trhu práce",
  "Army page displays damage with various quality of weapon" : " Na stránce Armády je zobrazeno poškození s různými typy zbraní",
  "Newspaper and Forum Article Editor" : " Editor článků pro noviny a příspěvky na fóru",
  "Wellness calculator on your profile" : " Kalkulátor zdraví na tvém profilu",
  "\"Third Party Tools\" and \"National Pages and Forums\"" : " Zobrazit - Utility a Stránky a fóra zemí",
  "News description" : " Popis novin",
  "All comments and Translate to" : " Všechny komentáře překládat do",
  "Quick Links" : " Rychlé odkazy",
  "Num" : "Č.",
  "Caption" : "Popis",
  "New window" : "Otevřít v novém okně",
};

// regular expressions
var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 spojenci\\i";
regexps["^Active wars in (.*)$"] = "Aktivní války v |$1";
regexps["^Active resistance wars in (.*)$"] = "Aktivní odbojové války v |$1";
regexps["(\\s*)Expires in (\\d*) days"] = "Vyprší za $2 dny";
regexps["^(\\d*) comments$"] = "$1 komentářů";
regexps["^(\\d*) fights$"] = "$1 bojů";
regexps["^(\\d*) Citizenss$"] = "$1 občanů";
regexps["(.*)characters max"] = "$1 znaků maximálně";
regexps["^(\\d*) new messages$"] = "$1 nových zpráv";
regexps["^(\\d*) hours ago$"] = "před $1 hodinami";
regexps["^(\\d*) minutes ago$"] = "před $1 minutami";
regexps[",(.*)days ago"] = ", před $1 dny";
regexps["(.*)days ago"] = "před $1 dny";
regexps["(.*)days"] = " $1 dnů";
regexps["^Regions \\((\\d*)\\)"] = "Regiony $1";
regexps["^Friends \\((\\d*)\\)"] = "Přátelé $1";
regexps["^(\\d*) months"] = "$1 měsíců ";
regexps["^Comments(.*)"] = "Komentáře $1";
regexps["^Trackbacks(.*)"] = "Odkazováno $1";
regexps["^supported by(.*)parties"] = "Podporuje $1 stran";
regexps["Day(.*)of the New World"] = "Den $1 Nového světa";
regexps["started on(.*)"] = "začalo $1";
regexps["(.*)yesterday"] = "$1 včera";
regexps["(.*) signed a peace treaty with (.*)"] = "$1| podepsala spojenectví s |$2";
regexps["(.*) signed an alliance with (.*)"] = "$1| podepsala spojenectví s |$2";
regexps["(.*) declared war to (.*)"] = "$1| vyhlásilo válku |$2";
regexps["President of (.*) proposed an alliance with (.*)\."] = "Prezident |$1| navrhnul spojenectví s |$2";
regexps["A resistance has started in (.*)"] = "V |$1| začal boj o osvobození.";
regexps["(.*) was secured by (.*) in the war versus (.*)"] = "$1| byl zabezpečen silami |$2| ve válce proti |$3";
regexps["(.*) was conquered by (.*) in the war versus (.*)"] = "$1| byl zabezpečen silami |$2| ve válce proti |$3";
regexps["(.*) attacked (.*), (.*)"] = "$1| zaútočil |$2|, |$3";
regexps["President of (.*) proposed a mutual protection pact with (.*)"] = "Prezident |$1| navrhnul vzájemnou ochranu s |$2";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)"] = "Souhlasíte s přesunem |$1| z účtu vaší země do |$2";
regexps["Do you agree that (.*) should buy a (.*) of quality (.*) from (.*) company at the price of (.*) for (.*)\?"] = "Souhlasíte s tím, aby |$1| koupila |$2| kvality $3 od společnosti $4 za cenu $5. Do regionu |$6|";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD?"] = "Souhlasíte s návrhem na vytisknutí $1 za $2 Zlata?";
regexps["Minimum wage change from (.*) to (.*)"] = "Změna minimální mzdy z $1 na $2";
regexps["Citizen fee change from (.*) to (.*)"] = "Změna platby novým občanům z $1 na $2";
regexps["Do you want the current president of (.*) to end this office?"] = "Chcete, aby byl současný prezident |$1| sesazen ze své funkce?";
regexps["The President of (.*) demanded a sum of offer (.*) from your National Treasury in return to a peace treaty with (.*)\\."] = "Prezident |$1| nabízí $2 ze státní poklady za podepsání mírové smlouvy s |$3|.";
regexps["Do you agree on the text used by the president to welcome new Citizens in your country\\?(.*)"] = "Souhlasíte s novým textem, kterým prezident vítá nové občany Vaší země? $1";
regexps["(\\d+)st"] = "$1.";
regexps["(\\d+)nd"] = "$1.";
regexps["(\\d+)th"] = "$1.";
regexps["(.*)Still active"] = "$1Stále aktivní";
// months
regexps["Jan(\\d+)"] = "$1. ledna";
regexps["Feb(\\d+)"] = "$1. února";
regexps["Mar(\\d+)"] = "$1. března";
regexps["Apr(\\d+)"] = "$1. dubna";
regexps["May(\\d+)"] = "$1. května";
regexps["Jun(\\d+)"] = "$1. června";
regexps["Jul(\\d+)"] = "$1. července";
regexps["Aug(\\d+)"] = "$1. srpna";
regexps["Sep(\\d+)"] = "$1. září";
regexps["Oct(\\d+)"] = "$1. října";
regexps["Nov(\\d+)"] = "$1. listopadu";
regexps["Dec(\\d+)"] = "$1. prosince";
regexps["of January(.*)"] = "ledna ";
regexps["of February(.*)"] = "února ";
regexps["of March(.*)"] = "března ";
regexps["of April(.*)"] = "dubna ";
regexps["of May(.*)"] = "května ";
regexps["of June(.*)"] = "června ";
regexps["of July(.*)"] = "července ";
regexps["of August(.*)"] = "srpna ";
regexps["of September(.*)"] = "září ";
regexps["of October(.*)"] = "října ";
regexps["of November(.*)"] = "listopadu ";
regexps["of December(.*)"] = "prosince ";
// hope dies last!
regexps["(.*), (.*)"] = "$1|, |$2";
regexps["(.*):(.*)"] = "$1|, |$2";


// try split translated regular expression and continue translation of parts
trySpliting = function(key) {
  var keyS = key.split("|");
  var result = "";
  for (var i=0;i<keyS.length;i++) {
    var translation = translate(keyS[i]);
    if (translation!==undefined) {
      keyS[i] = translation;
    }
    result += keyS[i];     
  }
  
  return result;
}

// translate using regular expresions
matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}

	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
		if (result!==null) {
			return trySpliting(key.replace(rrrr,regexps[reg]));
		}
	}
	return undefined;
};

// trim string
trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

// translate only using strings
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

// call when you want translation
translateWithRegexp = function(key) {
  var translation = translate(key);
	if (translation!==undefined) {
	    return translation;
	} 
	
	return matchRegexps(key);
};

// provide translation of node and all child nodes - recursive
function posttranslate(node) {
  for (var i=0;i<node.childNodes.length;i++) {
    // if this is element -> recurse
    if (node.childNodes[i].nodeType==1) {
      // if element has title -> translate
      if (node.childNodes[i].title != "") {
        translation = translateWithRegexp(node.childNodes[i].title);
        if (translation!==undefined) {
          node.childNodes[i].title = translation;
        }
      }
      // if element has value -> tanslate
      else if (node.childNodes[i].value !== undefined && node.childNodes[i].value != ""  && node.childNodes[i].value != "-1") {
        translation = translateWithRegexp(node.childNodes[i].value);
        if (translation!==undefined) {
          node.childNodes[i].value = translation;
        }
      }
        // and finally recurse :)      
        posttranslate(node.childNodes[i]);    
    }
    // if this is attribute or text -> translate
    else if (node.childNodes[i].nodeType==2 || node.childNodes[i].nodeType==3) {
      if (node.childNodes[i].nodeValue != "") {
       translation = translateWithRegexp(node.childNodes[i].nodeValue);
       if (translation!==undefined) {
          node.childNodes[i].nodeValue = translation;

        }
      }
    }
  }
}

// replace img buttons
var imgtypes = {};
imgtypes["^(.*)btn_buy.gif"] = imgServer+"btn_kup.gif";

function replaceImgs() {
  var imgs = document.getElementsByTagName('img');
  for (var i=0; i<imgs.length; i++) {
  	for (var reg in imgtypes) {
		  var rrrr = new RegExp(reg);
		  var imgsrc = imgs[i].src;
		  var result = imgsrc.match(rrrr);
		  if (result!==null) {
			 imgs[i].src = imgsrc.replace(rrrr,imgtypes[reg]);
		  }
    }    
  }     
}

// some flash fix I don't know
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

// this is for modifying css - (change menu image)
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// here are ajax refreshed elements with translation refresh
// could have better trigger, but which one? :)

if (document.getElementById('latest_events')!=null) {
  document.getElementById('latest_events').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('latest_events'));
  }, false);
}

if (document.getElementById('article_ajax')!=null) {
  document.getElementById('article_ajax').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('article_ajax'));
  }, false);
}

if (document.getElementById('shouts_container')!=null) {
  document.getElementById('shouts_container').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('shouts_container'));
  }, false);
}

if (document.getElementById('market_offers')!=null) {
  document.getElementById('market_offers').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('market_offers'));
  }, false);
}

if (document.getElementById('job_offers')!=null) {
  document.getElementById('job_offers').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('job_offers'));
  }, false);
}

if (document.getElementById('populateOffers')!=null) {
  document.getElementById('populateOffers').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('populateOffers'));
      replaceImgs();
  }, false);
}

if (document.getElementById('populateSelectors')!=null) {
  document.getElementById('populateSelectors').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('populateSelectors'));
  }, false);
}

if (document.getElementById('region_list')!=null) {
  document.getElementById('region_list').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('region_list'));
  }, false);
}

if (document.getElementById('advisor_ajax')!=null) {
  document.getElementById('advisor_ajax').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('advisor_ajax'));
  }, false);
}

if (document.getElementById('friends_tab_content')!=null) {
  document.getElementById('friends_tab_content').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('friends_tab_content'));
  }, false);
}

if (document.getElementById('dateSelectDiv')!=null) {
  document.getElementById('dateSelectDiv').addEventListener('DOMNodeInserted', function(e) {
      posttranslate(document.getElementById('dateSelectDiv'));
  }, false);
}

// main translation
window.addEventListener("load", function(e) { 
  // translate document
  posttranslate(document.body);
  // fix img buttons
  replaceImgs();
  // change menu image
  addGlobalStyle('#menu ul li#menu1 a, #menu ul li#menu2 a, #menu ul li#menu3 a, #menu ul li#menu4 a, #menu ul li#menu5 a  { background-image: url('+imgServer+'menu.png); } #menu ul li#menu1 a{background-position: 0px 0px;}  #menu ul li#menu2 a{background-position: -190px 0px;}  #menu ul li#menu3 a{background-position: -381px 0px;}  #menu ul li#menu4 a{background-position: -572px 0px;}  #menu ul li#menu5 a{background-position: -763px 0px;}  #menu ul li#menu1 a:hover{background-position: 0px -48px;}  #menu ul li#menu2 a:hover{background-position: -190px -48px;}  #menu ul li#menu3 a:hover{background-position: -381px -48px;}  #menu ul li#menu4 a:hover{background-position: -572px -48px;}  #menu ul li#menu5 a:hover{background-position: -763px -48px;}');
  // fix flash
  fixFlash();
  
}, true);