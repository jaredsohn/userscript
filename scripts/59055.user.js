// ==UserScript==
// @name           eRepublik italian DF 1.3
// @author          darkforge
// @description    eRepublik italian DF 1.3
// @include         http://*.erepublik.com/en*
// ==/UserScript==

// server where you added translated images
//var imgServer = "http://www.darkforge.it/erepublik/";


// strings to translate - have to insert whole text or use regular expression
var strings = {
// first page, login
  "Take the " : "Nel tour a ",
  "4 step" : "4 passi",
  " tour and find out why it's such a great game" : " scopri il successo del gioco",
  "It's " : "E' ",
  " and" : " e",
  "only takes a minute or two" : "richiede un minuto o due",
  "Language:" : "Lingua:",
  "English" : "Italiano",
  "citizens" : "cittadini",
  "\"eRepublik creates multiplayer global strategy game\"" : "\"eRepublik crea un gioco mulpigiocatore di strategia globale\"",
  "\"eRepublik offers a real second life\"" : "\"eRepublik offre una vera seconda vita\"",
  "\"eRepublik takes strategy games to the Web\"" : "\"eRepublik porta i giochi di strategia sul Web\"",
  "Ambient on/off" : "Sfondo On/Off",
  "Enter the new world" : "Entra nel nuovo mondo",
  "Citizen name" : "Nome cittadino",
  "Login" : "Accedi",
  // doesn't work "Not a citizen yet?" : "Non ancora registrato",
  "Take the tour" : "Fatti un giro",
  "Join now" : "Inizia ora",
  "It's free" : "E' gratis",
  "Forgot password?" : "Dimenticato la password?",
  "Remember me" : "Ricordami",
  "What's happening in eRepublik?" : "Cosa accade su eRepublik?",
  "Forum discussions" : "Discussioni nel forum",
  "Top countries in eRepublik" : "I più popolosi",
  "more discussions" : "Più discussioni",
  "top countries in eRepublik" : "Lista completa",
//Registrazione
  "Become a citizen" : "Diventa un cittadino",
  "Citizen Name" : "Nome cittadino",
  "Retype" : "Riscrivi",
  "4-30 characters" : "4-30 caratteri",
  "Please select a country" : "Seleziona una Nazione",
  "Please select a region" : "Seleziona una Regione",
  "Email must be valid for registration, so do not cheat. Please avoid Yahoo! email addresses as you may not receive your confirmation email." : "Email necessaria per la registrazione, quindi ATTENZIONE. Evitate email Yahoo! perchè potreste non ricevere le email di conferma.",
  "Birthday" : "Data di nascita",
  "Month" : "Mese",
       "January" : "Gennaio",
       "February" : "Febbraio",
       "March" : "Marzo",
       "April" : "Aprile",
       "May" : "Maggio",
       "June" : "Giugno",
       "July" : "Luglio",
       "August" : "Agosto",
       "September" : "Settembre",
       "October" : "Ottobre",
       "November" : "Novembre",
       "December" : "Dicembre",
  "Year" : "Anno",
  "Gender" : "Genere",
    "Male" : "Maschio",
    "Female" : "Femmina",
  "I agree with the" : "Accetto i ",
  "Sign up for the weekly newsletter" : "Iscriviti alla nostra newsletter settimanale",
  
// menu
	"Home" : "Home page",
	"Donate" : "Dona",
	"Send message" : "Invia messaggio",
	"Add as a friend" : "Aggiungi agli amici",
	"Remove friend" : "Rimuovi da amico",
	"Offer a gift" : "Offri un gift",
	"Day" : "Giorno ",
	"of the New World" : " del Nuovo Mondo",
	"Rank"   : "Rank ",
	"Company" : "Azienda", 
	"Profile":"Profilo", 
	"Party" : "Partito", 
	"Newspaper" :"Giornale",
	"Army" : "Esercito",
	"Country administration" : "Governo",
  "Organizations" : "Organizzazioni",
  "Advertising Department" : "Gestione banner pubblicitari",
	"Market" : "Mercato",
	"Monetary market" : "Mercato monetario",
	"monetary market" : "mercato monetario",
	"Monetary Market" : "Mercato monetario",
	"Job market" : "Mercato del lavoro",
  "Companies for sale" : "Aziende in vendita",
  "Get Gold & Extras" : "Compra extra",
	"Rankings" : "Classifiche",
	"Social stats" : "Statistiche sociali",
	"Economic stats" : "Statistiche economiche",
	"Political stats" : "Statistiche politiche",
	"Military stats" : "Statistiche militari",
	"Tutorials" : "Guide",
	"Tools" : "Strumenti",
	"Forum" : "Forum",
	"News" : "Notizie",
	"news" : "notizie",
	"Invite friends" : "Invita amici",
	"eRepublik Shop" : "eRepublik Shop",
	"Career path" : "Carriera",
	"Buy food!" : "Compra del cibo!",
	"No food means starvation. Hurry up and buy some." : "Senza cibo morirai. Sbrigati a comprarlo!",
	"You are in the right place at the right time to take advantage of your opportunities." : "Sei nel momento giusto al posto giusto",
  "Vote" : "Vota",
  "Your vote is important as it can make a difference." : "Il tuo voto è importante perchè può fare la differenza",
  "You should work today" : "Devi ancora lavorare oggi",
  "You have become a Super Soldier. The future of your nation lies in your hands." : "Sei diventato un Super soldato. Il futuro della tua nazione è nelle tue mani.",
  "It will help you increase both your skill and savings."  : "Guadagnerai lo stipendio e aumenterà la tua abilità",
  "You should train today" : "Devi ancora allenarti oggi",
  "Your strength can make you a hero on the battlefield." : "La tua forza può farti diventare eroe in battaglia.",
  //"Now you can visit the forum or read the news to stay in touch with what happens on eRepublik." : "Adesso puoi visitare il forum e leggere le notizie per rimanere in contatto con il mondo di eRepublik.",
  "Skip" : "Salta",
	"Ok, thanks, next tip" : "Grazie, il prossimo consiglio",
	"You are now officially known as a Hard Worker. Dreams create realities, through hard work." : "Sei conosciuto come un Gran lavoratore. I sogni si realizzano con il duro lavoro.",
	"I have something to say" : "Ho qualcosa da dire",
	"I have nothing more to say at the moment" : "Non ho altro da dire al momento",
	"Now you can visit the" : "Visita il ",
	"or read the" : " o leggi le ",
	"to stay in touch with what happens on eRepublik." : " per rimanere aggiornato su quello che accade su eRepublik",
	"Select" : "Scegli",
        "Latest events" : "Ultimi eventi",
	//	"News" : "Notizie",
        "More events" : "Più eventi",
        "more events" : "Più eventi",
        "More news" : "Più notizie",
		"more news" : "Più notizie",
	"Marketplace" : "Mercato",
	"marketplace" : "mercato",
	"Wars" : "Guerre",
        "My places" : "Link personali",
        "Info" : "Info",
        "Community" : "Comunità",
        "Day of the new world" : "Giorno del nuovo mondo",
        "National" : "Nazionali",
        "International" : "Internazionali",
		"Latest Events" : "Ultimi Eventi",
        "Shouts" : "Urli",
        "Shout something" : "Grida qualcosa",
        "Shout" : "Grida",
        "Official" : "Ufficiale",
        "Everyone" : "Tutti",
        "Lates" : "Piu tardi",
        "Search citizen" : "Ricerca cittadino",
        "No citizens found that match your criteria." : "Nessun cittadino trovato",
	"Shout" : "Urla",
	"Latest" : "Ultimi",
	"one minute ago" : "un minuto fa",
	"for 10 shouts/day and more" : " per 10 urli al giorno e altro",
	"No more shouts for today" : "Nessun altro urlo per oggi ",
	"Top Rated" : "Più letti",
	"Top rated" : "Più letti",

//eRep MAP
  "Go to eRepublik" : "Torna indietro",

// country page
	"On the Map" : "Sulla mappa",
	"Total citizens" : "Cittadini totali",
	"New citizens today" : "Cittadini iscritti oggi",
	"Citizenship requests" : "Richieste cittadinanza",
	"View requests" : "Vedi richieste",
	"Average citizen level" : "Livello medio dei cittadini",
	"Online now" : "Connessi al momento",
	"Citizen fee" : "Incentivo di nascita",
	"citizen fee" : "incentivo di nascita",
	"Citizens" : "Cittadini",
	"Who" : "Chi",
	"details" : "Dettagli",
	"Society" : "Società",
	"Economy" : "Economia",
	"Politics" : "Politica",
	"Military" : "Militare",
	"Administration" : "Amministrazione",
	
// countries
  "All countries" : "Tutti",
	"Argentina" : "Argentina",
	"Australia" : "Australia",
	"Belgium" : "Belgio",
	"Bosnia and Herzegovina" : "Bosnia-Erzegovina",
	"Brazil" : "Brasile",
	"Bulgaria" : "Bulgaria",
	"Chile" : "Cile",
	"China" : "Cina",
	"Croatia" : "Croazia",
	"Canada" : "Canada",
	"Czech Republic" : "Repubblica Ceca",
	"Denmark" : "Danimarca",
	"Estonia" : "Estonia",
	"Finland" : "Finlandia",
	"France" : "Francia",
	"Germany" : "Germania",
	"Greece" : "Grecia",
	"Hungary" : "Ungheria",
	"Indonesia" : "Indonesia",
	"Ireland" : "Irlanda",
	"Israel" : "Israele",
	"Italy" : "Italia",
	    //Regions
	    "Aosta Valley" : "Valle d'aosta",
	    "Apulia" : "Puglia",
	    "Lombardy" : "Lombardia",
	    "Emilia-Romagna" : "Emilia Romagna",
	    "Friuli-Venezia Giulia" : "Friuli Venezia Giulia",
	    "Piedmont" : "Piemonte",
	    "Sardinia" : "Sardegna",
	    "Sicily" : "Sicilia",
	    "Trentino-South Tyrol" : "Trentino Alto Adige",
	    "Tuscany" : "Toscana",

	"Iran" : "Iran",
	"Japan" : "Giappone",
	"Latvia" : "Lattonia",
	"Lithuania" : "Lituania",
	"Malaysia" : "Malesia",
	"Mexico" : "Messico",
	"Moldavia" : "Moldavia",
	"Netherlands" : "Olanda",
	"North Korea" : "Corea del Nord",
	"Norway" : "Norvegia",
	"Pakistan" : "Pakistan",
	"Philippines" : "Filippine",
	"Poland" : "Polonia",
	"Portugal" : "Portogallo",
	"Romania" : "Romania",
	"Serbia" : "Serbia",
	"Singapore" : "Singapore",
	"South Africa" : "Sud Africa",
	"South Korea" : "Corea del Sud",
	"Slovakia" : "Slovacchia",
	"Slovenia" : "Slovenia",
	"Switzerland" : "Svizzera",
	"Spain" : "Spagna",
	"Sweden" : "Svezia",
	"Russia" : "Russia",
	"Thailand" : "Thailandia",
	"United Kingdom" : "Regno Unito",
	"Ukraine" : "Ucraina",
	"USA" : "USA",
	"Turkey" : "Turchia",
	"World" : "Mondo",
	"Resistance Force" : "Forza di reistenza",
        "the Resistance Force" : "La forza di resistenza",

// economy
	"GOLD" : "ORO",
	"Gold" : "Oro",
	"Treasury" : "Cassa",
	"All accounts" : "Budget completo",
	"Country trading embargoes" : "Embarghi commerciali tra paesi",
	"This country can trade with any other country in eRepublik." : "Questo paese può commerciare con ogni paese in eRepublik",
	"Taxes" : "Tasse",
	"food" : "cibo",
	"gift" : "gift",
	"weapon" : "armi",
	"moving tickets" : "biglietti",
	"grain" : "grano",
	"diamonds" : "diamanti",
	"iron" : "ferro",
	"oil"  : "petrolio",
	"wood" : "legno",
	"house" : "casa",
	"hospital" : "ospedale",
	"defense system" : "sistema di difesa",
	"Defense system" : "Sistema di difesa",


	"Salary" : "Salario",
	"Minimum" : "Minimo",
	"Average" : "Medio",

	"Gross domestic product (GDP)" : "Prodotto Interno Lordo (PIL)",
	"Monthly exports" : "Esportazioni mensili",
	"Monthly imports" : "Importazioni mensili",
	"Inflation" : "Inflazione",
// Company
  "You do not have a job" : "Non hai un lavoro",
  "Find a job or own a company. Having a job will allow you to get a salary each day you go to work (don't worry, in eRepublik it is much more fun and faster to go to work than in real life)." : "Trova un lavoro o prendi un azienda. Avendo un lavoro ti permetterà di avere uno stipendio lavorando ogni giorno (non preoccuparti, in eRepublik è molto più facile e veloce che nella vita reale).",
  "Own a company" : "Un'azienda tutta tua",
  "Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt." : "Avere un'azienda tutta tua potrebbe fruttarti molti guadagni, ma prima controlla di avere abbastanza soldi per pagarti tutte le spese per non andare in bancarotta.",
  "Create company" : "Crea azienda",
  "Company details" : "Dettagli azienda",
  "Company name" : "Nome azienda",
  "Company logo" : "Logo azienda",
  "Disscusion area" : "Link alla discussione",
  "Create" : "Crea",
  "only " : "solo immagini ",
  " pictures allowed" : "",
  "Choose industry" : "Scegli tipologia",
  "You have not worked today." : "Non hai ancora lavorato oggi",
  "You are now an employee of this company" : "Sei ora assunto in questa azienda",
  "Your companies" : "Le tue aziende",
  "Buy from market" : "Compra",
  "Finances" : "Finanze",
  "Transfers" : "Trasferimenti",
  "Account balance" : "Bilancio",
  "Sales history" : "Cronologia vendite",
  "There were no sales within the selected week" : "Non ci sono vendite in questa settimana",
  "Edit details" : "Modifica dettagli",
  "Sell company" : "Vendi azienda",
  "Upgrade quality level" : "Aumenta livello qualità",
  "Buy raw materials" : "Compra materie prime",
  "Donate raw materials" : "Dona materie prime",
  "The company cannot trade with this country due to a trade embargo." : "Impossibile commerciare con questo paese a causa dell'embargo.",
  "Sell products here" : "Vendi prodotti qui",
  "Buy market license" : "Compra licenza estera",
  "Add a job offer" : "Crea posti di lavoro",
	"Office" : "Ufficio",
	"You have already worked today." : "Hai già lavorato oggi.",
	"You cannot work today because the company does not have enough raw materials for products. We have just sent an alert to the general manager about this issue." : "Non puoi lavorare perchè l'azienda ha esaurito le materie prime. L'amministratore generale le comprerà al più presto.", 
	"Come back tomorrow." : "Ritorna domani.",
	"Work" : "Lavora",
	"Total productivity" : "Produttività totale",
	"Basic productivity" : "Produttività base",
	"Work Bonus" : "Bonus",
	"Manufacturing skill" : "Manifattura",
	"Land skill" : "Coltivazione",
	"Constructions skill" : "Costruzione",
	"Back to company" : "Torna indietro",
	"Resign" : "Dimettiti",
	"Employees" : "Impiegati",
	"Raw materials" : "Materie prime",
	"Show all employees" : "Mostra tutti gli impiegati",
	"Show all donations" : "Mostra le donazioni",
	"Go to marketplace" : "Vai al mercato",
	"Products" : "Prodotti",
	"Jobs available in this company" : "Lavori disponibili in questa azienda",
  "Your job offer has been successfully updated" : "La tua proposta di lavoro è stata aggiornata con successo",
  "The salary cannot be lower than the minimum wage" : "Il salario è inferiore allo stipendio minimo",
  "Your job offer has been successfully posted" : "La tua proposta di lavoro è stata inserita con successo",
  "Your job offer has been successfully removed" : "La tua proposta di lavoro è stata rimossa con successo",
  "Please enter a correct number of jobs and/or salary" :"Inserisci un numero corretto per i posti di lavoro/stipendio",
	"You don't have any active job offers" : "Non hai offerte di lavoro attive",
	"You do not have any active job offers" : "Non hai nessuna offerta di lavoro attiva",
	"Minimum Skill" : "Abilità minima",
	"Save" : "Salva",
	"Cancel" : "Cancella",
	"The company offers no products in this market" : "Quest'azienda non offre prodotti in questo mercato",
	"Amount" : "Quantità",
	"Price" : "Prezzo",
	"Price with taxes" : "Prezzo con tasse",
	"Company Page" : "Pagina dell'azienda",
	"Today" : "Oggi",
	"Yesterday" : "Ieri",
	"All employees" : "Tutti gli impiegati",
	"Skill" : "Abilità",
	"Daily salary" : "Salario giornaliero",
	"Last presence" : "Ultima presenza",
	"Minimum country wage" : "Salario minimo nel paese",
	
	"Employees details" : "Dettagli dipendenti",
	"Fire" : "Licenzia",
	"Mo" : "Lu",
	"Tu" : "Ma",
	"We" : "Me",
	"Th" : "Gi",
	"Fr" : "Ve",
	"Sa" : "Sa",
	"Su" : "Do",
	"Company page" : "Pagina azienda",

	"Grain" : "Grano",
	"Food" : "Cibo",
	"Gift" : "Gift",
	"Weapon" : "Armi",
	"Moving Tickets" : "Biglietti",
	"Diamonds" : "Diamanti",
	"Iron" : "Ferro",
	"Oil"  : "Petrolio",
	"Wood" : "Legno",
	"House" : "Casa",
	"Hospital" : "Ospedale",
	"Defense System" : "Sistema di difesa",
// market
	"Quality Level" : "Livello di qualità",
	"All levels" : "Tutti i livelli",
	"Level 1" : "Livello 1",
	"Level 2" : "Livello 2",
	"Level 3" : "Livello 3",
	"Level 4" : "Livello 4",
	"Level 5" : "Livello 5",
// monetary market
  "The offer had been saved successfully! It will appear on the market in a minute!" : "Offerta salvata! Apparirà tra le offerte tra un minuto!",
  "Show all offers" : "Mostra offerte",
	"Provider" : "Produttore",
	"Quality" : "Qualità",
	"Stock" : "Quantità",
	"Buy" : "Compra",
	"Sell" : "Vendi",
  "Show my offers" : "Tue offerte",
  "Post new offer" : "Crea offerta",
	"Exchange rate" : "Tasso di scambio",
	"Amount to buy" : "Quantità da comprare",
	"Market" : "Mercato",
//Company market
  "Company market" : "Aziende in vendita",
  "Create new company" : "Crea una nuova azienda",
  "All industries" : "Tutte",

	"Post" : "Invia",
	"Market offers" : "Offerte di mercato",
	"Amount" : "Quantità",
	"Price" : "Prezzo",
	"Next" : "Avanti",
	"Prev" : "Preced",
	"No products in this market" : "Non ci sono prodotti in questo mercato",
// Mercato del LAVORO
  "Industry" : "Industria",
  "Minimum skill" : "Abilità minima",
  "Apply" : "Applica",

//	"Go to marketplace" : "Vai al mercato",
	"You didn't specify the amount of products you wish to buy" : 
		"Non hai specificato la quantità di prodotto che vuoi comprare",
	"You cannot trade with this country as you are at war with it" :
		"Non puoi commerciare con questo paese fin quando non finisca la guerra",

// region
	"Country - Society" : "Paese - Società",
        "Heal" : "Cura",
	"Constructions": "Costruzioni",
	"Population": "Popolazione",
	"Productivity" : "Produttività",
	"Resistance War" : "Guerra di resistenza",
	"Resistance War Active" : "Guerra di resistenza attiva",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Non puoi iniziare una guerra di resistenza in questa regione perché appartiene già al suo paese originario",
	"Medium" : "Medio",
	"High": "Alto",
	"Neighbors" : "Confinanti",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Scegli una categoria industriale per vedere le offerte del mercato",
	"Skill Level" : "Livello di abilità",
	"Skill level" : "Livello di abilità",
	"All skills" : "Tutte le abilità",
	"All" : "Tutto",
// politics
  "President Impeachment" : "Destituzione del Presidente",
	"Country Administration" : "Governo",
	"Accepted" : "Accettato",
	"ACCEPTED" : "ACCETTATO",
	"Rejected" : "Respinto",
	"REJECTED" : "RESPINTO",
  "Pending" : "In corso",
	"Congress" : "Parlamento",
  "Tax change" : "Variazione tassa",
	"Alliance" : "Alleanza",
	"New Citizen Message" : "Nuovo messaggio benvenuto",
	"New Citizen Fee" : "Nuovo incentivo di nascita",
	"new citizen message" : "nuovo messaggio benvenuto",
	"new citizen fee" : "nuovo incentivo di nascita",
	"minimum wage change" : "cambio salario minimo",
	"new minimum wage" : "nuovo salario minimo",
	"Buy Constructions" : "Compra costruzione",
	"Issue Money" : "Movimento di denaro",
	"Law proposals" : "Proposte di legge",
	"Proposed by" : "Proposta da ",
	"Minimum Wage" : "Retribuzione minima",
	"Mutual Protection Pact" : "Patto di mutua protezione",
	"Peace Proposal" : "Proposta di pace",
	"President" : "Presidente",
	"Yes" : "Si",
	"No" : "No",
	"Show all law proposals" : "Mostra le proposte",
	"The law voting process takes 24 hours." : "Il processo di votazione delle leggi dura 24 ore.",
	"Only congress members and country presidents have the right to vote." : "Solo i deputati e il presidente hanno il diritto di votare.",
	"You are not a president or a congress member in this country." : "Non sei il presidente o un parlamentare in questo paese.",
// wars
	"no allies" : "nessun alleato",
	"All wars" : "Tutte le guerre",
	"All resistance wars" : "Tutte le guerre di resistenza",
	"All Alliances" : "Tutte le alleanze",
	"Alliances" : "Alleanze",
	"Military force" : "Forze militari",
	"Average strength" : "Forza media",
	"War > Battlefield" : "Guerra > Campo di battaglia",
	"Basic damage" : "Danno di base",
	"Weapon quality" : "Qualità dell'arma",
	"Wellness" : "Salute",
	"xp points" : " punti exp",
	"War types" : "Tipologia di guerre",
	"Conquest wars" : "Guerre di conquista",
	"Resistance wars" : "Guerre di resistenza",
	"War status" : "Stato delle guerre",
	"Active wars" : "Guerre attive",
	"Ended wars" : "Guerre concluse",
	"Countries involved" : "Nazione coinvolta",
	"no active battles" : "Nessuna attiva",
	"1 active battles" : "1 battaglia attiva",
	"2 active battles" : "2 battaglia attiva",
	"3 active battles" : "3 battaglia attiva",
	"4 active battles" : "4 battaglia attiva",
	"5 active battles" : "5 battaglia attiva",
//	"Rank" : "Grado",
	"Total damage" : "Danno totale",
	
// army
	"You have not trained today" : "Non ti sei ancora allenato oggi",
	"Train" : "Allenati",
	"Strength gained" : "Forza ottenuta",
	"Training" : "Allenamento",
	"Train bonus" : "Bonus",
	"Back to army" : "Torna indietro",
	"You have trained today. You can train again tomorrow." : "Ti sei già allenato oggi. Potrai allenarti nuovamente domani.",
	"Force" : "Forza",
	"Military rank" : "Grado militare",
	"Military achievements" : "Conquiste militari",
	"Active wars list" : "Elenco delle guerre in corso",
	"Private" : "Recluta",
	"Corporal" : "Caporale",
	"Sergeant" : "Sergente",
	"Lieutenant" : "Tenente",
	"Captain" : "Capitano",
	"Colonel" : "Colonnello",
	"General" : "Generale",
	"Field Marshal" : "Feldmaresciallo",		
	"Show active wars" : "Mostra guerre attive",
	"Start a Resistance War" : "Avvia una guerra di resistenza",
	"You do not have the necessary amount of Gold to start a resistance war." : "Non hai l'oro necessario per poter cominciare una Guerra di Resistenza",
	"You cannot join this fight because your country is not involved in the war" : "Non puoi unirti al combattimento perché il tuo paese non è coinvolto nella guerra",
	"Organizations cannot participate in a battle." : "Le organizzazioni non possono partecipare alle guerre",
	"There are no resistance wars in this country." : "Non ci sono guerre di resistenza in questo paese.",
	"until the region can be occupied or secured" : "all'occupazione/liberazione della regione",
	"Attackable on President's decision" : "Attaccabile su decisione del Presidente",
	"Defense Points" : "Punti di difesa",
	"show finished battles" : "mostra battaglie finite",
	"There are no active battles in this war" : "Nessuna battaglia attiva in questa guerra",
	"Go to Battlefield" : "Vai al campo di battaglia",
	"see finished battles" : "Guarda le battaglie terminate",
	"Wars list" : "Elenco delle Guerre",
	"War" : "Guerra",
	"You can get wellness from:" : "Puoi curarti all'",
	"Battle history" : "Cronologia delle battaglie",
	"Fight" : "Combatti",
	"Hero" : "Eroe",
	"Started by" : "Iniziata da ",
	"started by" : "Iniziata da ",
	"Fight for resistance" : "Combatti per la resistenza",
	"Fight for defenders" : "Combatti per i difensori",
// party
  "Congratulations, you are now a party member!" : "Congratulazione, sei un membro del partito!",
  "one day" : "un giorno",
  "My places > Party" : "My places > Partito",
  "You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Puoi unirti ad un partito in base alle loro idee e alla pagina di presentazione, o puoi crearne uno se non ne trovi uno. Essere un membro di un partito può permetterti di essere un Parlamentare o il Presidente della tua nazione.",
	"Get more" : "Di più",
	"Country presidency" : "Presidenza del paese",
	"Winner" : "Vincitore",
	"Next election in" : "Prossime elezioni tra ",
	"Next elections in" : "Prossime elezioni tra ",
	"No candidate proposed" : "Nessun candidato proposto",
	"candidates" : "candidati",
	"Candidate" : "Candidati",
	"days" : "giorni",
	"GOLD" : "ORO",
	"Show results" : "Mostra risultati",
	"Show candidate list" : "Mostra candidati",
	"Show candidates list" : "Mostra candidati",
	"You are not a member of a party" : "Non sei membro di alcun partito",
	"Join a party" : "Unisciti ad un partito",
	"Create new" : "Crea nuovo",
	"congress members" : " membri del Parlamento",
	"of Congress" : " del Parlamento",
	"Show proposed members" : "Mostra i candidati",
	" of congress" : " al Parlamento",
	"Run for congress" : "Candidati",
	"Join" : "Unisciti",
	"See all members" : "Guarda tutti i membri",
	"Donate Gold" : "Dona dell'oro",
	"Members"  : "Membri",
	"Orientation" : "Orientamento",
	"Show all members" : "Mostra tutti i membri",

	"Join party" : "Iscriviti",
	"Center" : "Centro",
	"Center-left" : "Centro-Sinistra",
	"Center-right" : "Centro-Destra",
	"Far-left" : "Estrema-Sinistra",
	"Far-right" : "Estrema-Destra",
	"Anarchist" : "Anarchico",
	"Totalitarian" : "Totalitario",
	"Libertarian" : "Liberale",
	"Authoritarian" : "Autoritario",
	"Accounts" : "Denaro",
	"Elections" : "Elezioni",
	"Election results" : "Risultati delle elezioni",
	"Next elections" : "Prossime elezioni",
  "Our next candidate" : "Il nostro prossimo candidato",

	"Country Presidency" : "Presidenza del Paese",
	"Party presidency" : "Presidenza del Partito",
	"Party President" : "Presidente partito",
	"See results" : "Guarda i risultati",
	"Expires tomorrow" : "Scade domani",
	//Election
	"Election" : "Elezioni",
	"Presidential elections" : "Presidenziali",
	"Congressional elections" : "Congressuali",
	"Party elections" : "Presidente partito",
	"Month/Year" : "Mese/Anno",
	"Supporting parties" : "Partiti sponsor",
	"No. of votes" : "Nr. di voti",
	"% of votes" : "% di voti",
	"Total votes:" : "Voti totali:",
	"Presence:" : "Presenza:",

// INFO menu
  "Top Citizens" : "Classifica cittadini",
  "Name" : "Nome",
  "Country" : "Nazione",
  "Experience points" : "Punti esperienza",
  "Companies" : "Aziende",
  "Newspapers" : "Giornali",
  "Countries" : "Nazioni",
  "Parties" : "Partiti",

// INFO Community
  "You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Riceverai 5 gold per ogni cittadino invitato che raggiungerà il livello 6.",
  "Your personal invitation link" : "Il tuo link personale degli inviti",
  "Post this link on forums, blogs, messenger status or send it by yourself via email. People that register using your personal link will get you 5 Gold when they reach level 6." :
  "Metti questo link nei forum, blog, messenger, o invialo per email. Le persone che si registreranno usando questo link ti faranno guadagnare 5 gold arrivati al livello 6.",
  "Send email invite" : "Invia invito email",
  "Due to the high number of abusers, we've limited the number of email invitations to 2,000. However, this limit doesn't apply to the personal invitation link, please feel free to use it instead." :
  "A causa di molti abusi, abbiamo limitato gli inviti diretti a 2,000. Questo limite non si applica al link per gli inviti, quindi ti consigliamo di usarlo.",
  "Your name:" : "Il tuo nome:",
  "Add contacts:" : "Aggiungi contatti:",
  "Add from address book" : "Consulta rubrica",
  "Invitations left:" : "Inviti rimanente:",
  "Emails to be invited:" : "Email da invitare:",
  "Invites status" : "Stato degli inviti",
  "View the status of your invites and bonuses" : "Controlla lo stato dei tuoi inviti",
  "Track invites" : "Traccia inviti",
  "Top rated news" : "Articoli più letti",
  "Latest news" : "Articoli più recenti",

// articles
	"Report abuse" : "Segnala abuso",
	"report abuse" : "Segnala abuso",
	"today" : "oggi",
	"yesterday" : "ieri",
	"one hour ago" : "un'ora fa",
	"Unsubscribe" : "Rimuovi",
	"Subscribe" : "Abbonati",
	"Article RSS" : "Articolo RSS",
	"Your comment" : "Tuo commento",
	"View all comments" : "Guarda tutti i commenti",
	"Subscribe to comments" : "Iscriviti ai commenti",
	"Unsubscribe to comments" : "Rimuovi la tua iscrizione dai commenti",
	"Post a comment" : "Lascia un commento",

// news
	"You do not have a newspaper" : "Non possiedi un giornale",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Un giornale è un modo efficiente di comunicare le tue notizie nel mondo di eRepublik. Leggi altre informazioni sulla Wiki di eRepublik. Crea il tuo giornale.",
  "Create newspaper" : "Crea giornale",
  "Your account" : "Il tuo account",
  "Requirements" : "Prerequisiti",
  "Cost" : "Costo",
  "Newspaper details" : "Dettagli giornale",
  "Newspaper name" : "Nome giornale",
  "6-30 characters max" : "6-30 caratteri max",
  "Newspaper Avatar" : "Avatar giornale",

// profiles
  "Your friendship request has been sent." : "La tua richiesta di amicizia è stata inviata.",
  " has accepted your friendship request" : " ha accettato la tua richiesta di amicizia",
  " has accepted your friendship request										" : " ha accettato la tua richiesta di amicizia",
  "Drag and drop items from your inventory to the donation area" : "Seleziona e trascina gli oggetti dall'inventario all'area donazioni",
  "Your inventory" : "Il tuo inventario",
  "Donation" : "Donazione",
	"Friends" : "Amici",
	"Fights" : "Combattimenti",
	"Location" : "Località",
	"Citizenship" : "Cittadinanza",
	"National Rank" : "Classifica nazionale",
	"Forfeit points" : "Punti forfeit",
	"all donations" : "Mostra donazioni",
	"All donations" : "Mostra donazioni",
	"show all accounts" : "Mostra le valute",
  "Change" : "Cambia",
  "Items" : "Oggetti",
  "Money" : "Denaro",
	"ShareThis" : "Condividi",
	"Shout something:" : "Urla qualcosa:",
	"Assets" : "Risorse",
	"Press director" : "Direttore giornale",
	"Inventory" : "Inventario",
	"Get Gold" : "Compra Oro",
	"Career" : "Carriera",
	"World Map" : "Mappa mondiale",
	"Bio" : "Bio",
	"Employee" : "Impiegato",
	"Unemployed" : "Disoccupato",
	"No political activity" : "Nessuna attività",
	"wellness" : "salute",
	"Level" : "Livello",
	"Strength" : "Forza",
	"Experience" : "Esperienza",
	"Skills:" : "Abilità",
	"Skills" : "Abilità",
	"Land" : "Coltivazione",
	"Manufacturing" : "Manifattura",
	"Erepublik Age" : "Età su eRepublik",
	"Get Extra Storage" : "Compra spazio",
	"Party Member" : "Membro del partito",
	"No activity" : "Nessuna attività",
	"Total damage:" : "Danno totale:",
	"Hard Worker" : "Gran lavoratore",
	"Work for 30 days in a row" : "Lavora per 30 giorni senza interruzione",
	"Worked 30 days in a row" : "Ha lavorato per 30 giorni senza interruzione",
	"Congress Member" : "Parlamentare",
	"Won the Congress elections": "Ha vinto le elezioni per il Parlamento",
	"Win the Congress elections": "Vinci le elezioni per il Parlamento",
	"Country President" : "Presidente paese",
	"Won the Presidential elections" : "Ha vinto le elezioni presidenziali",
	"Win the Presidential elections" : "Vinci le elezioni presidenziali",
	"Media Mogul" : "Media Mogul",
	"Reach 1000 subscribers to your newspaper" : "Raggiungi i 1000 abbonati al giornale",
	"Reached 1000 subscribers to your newspaper" : "Ha raggiunto i 1000 abbonati al giornale",
	"Battle Hero" : "Eroe di guerra",
	"Reach the highest total damage in one battle" : "Raggiungi il danno totale più alto in una battaglia",
	"Reached the highest total damage in one battle" : "Ha raggiunto il danno totale più alto in una battaglia",
	"Resistance Hero" : "Eroe della Resistenza",
	"Start a resistance war and liberate that region" : "Inizia una guerra di resistenza e libera la regione coinvolta",
	"Started a resistance war and liberated" : "Ha iniziato la guerra di resistenza e liberato ",
	" regions." : " regione/i.",
	"Super Soldier" : "Super Soldato",
	"Advanced 5 strength levels" : "Avanza di 5 livelli di Forza",
	"Society Builder" : "Costruttore di società",
	"Invite 10 people to eRepublik and help them reach level 6" : "Invita 10 persone in eRepublik e aiutale a raggiungere il livello 6",
	"Invited 10 people to eRepublik and helped them reach level 6" : "Ha invitato 10 persone in eRepublik e hanno raggiunto il livello 6",
	"Check your unlocked features" : "Controlla le tue caratteristiche sbloccate",
	"Achievements" : "Conquiste",
	"eRepublik Birthday" : "Compleanno eRepubblicano",
	"edit profile" : "Modifica profilo",
	"Edit profile" : "Modifica profilo",
	"Edit Profile" : "Modifica profilo",
	"Change residence" : "Cambia residenza",
	"You have successfully moved to" : "Ti sei trasferito con successo in ",
	"Do you wish to apply for citizenship in your new country?" : "Vuoi richiedere la cittadinanza in questo stato?",
	"Apply for citizenship" : "Richiedi cittadinanza",
	"No, thanks" : "No, grazie",
	"Current location" : "Residenza attuale",
	"New location:" : "Nuova residenza:",
	"Please choose a country you want to live in." : "Scegli la nazione dove vuoi vivere.",
	"Please choose the region you want to live in" : "Scegli la regione dove vuoi vivere",
	"Move" : "Applica",
	"Donations list" : "Elenco delle donazioni",
	
	"Your email here" : "La tua e-mail",
	"Your birthday" : "La tua data di nascita",
	"Citizen Avatar" : "Avatar del cittadino",
	"Change password" : "Cambia password",
	"Email must be valid for registration, so do not cheat" : "l'email deve essere valida per la registrazione, quindi attento",
	"Make changes" : "Applica cambiamenti",

// fight
	"Back to battlefield" : "Ritorna al campo di battaglia",
	"Fight Again" : "Combatti di nuovo",
	"Buy Wellness Box" : "Compra Salute   ",
	"Fight bonus" : "Bonus",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Per effettuare il login come Organizzazione devi prima sloggarti con il tuo account da cittadino e rifare il login con gli username e password della tua Organizzazione.",
	"If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that we can officially change it to an organization." : "",
  "After 15. of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned." : "",
	"My Organizations" : "Mie Organizzazioni",
	"Logout" : "Esci",
	"Organizations created by you:" : "Organizzazioni create da te:",
	"You have not created any organization yet." : "Non hai ancora creato alcuna organizzazione.",
// career-path
	"General manager" : "Direttore Generale",
	"Hard worker" : "Gran Lavoratore",
// ranking
	"No." : "Numero",
	"Hard worker" : "Gran Lavoratore",
// messages & alert
  "Place your Congress candidature" : "Presenta la tua candidatura al congresso",
  "to post a new offer." : " per creare una nuova offerta.",
  "No new alerts." : "Non ci sono messaggi",
  "You cannot work today because the company does not have enough money to pay you. We have just sent an alert to the general manager about this issue." : "Non puoi lavorare perchè l'azienda non ha soldi per pagarti. Abbiamo inviato un avvertimento al direttore, prova più tardi.",
  "Your employees cannot work because your company" : "I tuoi operai non possono lavorare perchè la tua azienda ",
  "does not have enough money to pay their salaries." : " non ha abbastanza soldi per pagare gli stipendi. ",
  "does not have raw materials in its inventory. Please buy raw materials from the" : " non ha più materie prime. Comprale al più presto nel ",
  "Add more funds" : "Aggiungi altri soldi",
  "in your company or sell company's stock." : " nell'azienda, oppure vendi un po' di oggetti in magazzino.",
  "now" : "adesso",
  "President election day" : "Oggi elezioni Presidenziali",
        "Inbox" : "In arrivo",
	"Sent" : "Inviati",
	"Alerts" : "Notifiche",
	"Unfortunately, you have been removed by" : "Sei stato rimosso dalla lista amici di ",
	"has rejected your friendship request" : " ha rifiutato la tua richiesta di amicizia",
	" from his friends list.										" : ".",
	" from his friends list." : ".",
	"We are sorry to inform you that the General Manager of" : "Spiacente ma sei stato licenziato dall'azienda ",
	"has decided to fire you! But don't worry, you can" : ". Ma non preoccuparti, puoi ",
	"get a new job" : "trovarti un nuovo lavoro",
	"or you can even" : " o puoi anche ",
	"buy a company" : "comprarti un'azienda",
	"has transfered several raw materials to" : " ha trasferito diverse materie prime a ",
	"wants to add you to his friends list. Will you accept?" : " ti vuole aggiungere alla sua lista amici. Accetti? ",
	"wants to add you to her friends list. Will you accept?" : " ti vuole aggiungere alla sua lista amici. Accetti? ",
	"There is no more food in your inventory. Without food to eat your Citizen loses 4 wellness each day until he dies. To avoid death by starvation we advise you to buy food from the" : "Non hai più cibo nell'inventario. Senza cibo da mangiare il tuo Cittadino perde 4 punti di salute ogni giorno fino alla morte. Per evitare la morte e la denutrizione ti consigliamo di comprare cibo nel ",
	"After 5 days the alerts are automatically deleted" : "Dopo 5 giorni gli avvisi vengono cancellati automaticamente",
	"donations list" : "lista donazioni",
	"Subscriptions" : "Abbonamenti",
	"Select all" : "Seleziona tutti",
	"Select All" : "Seleziona tutti",
	"Newer" : "Recenti",
	"Older" : "Vecchi",
	"Weekly news" : "Notizie settimanali",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in eRepublik" : "Settimanalmente aggiornami sugli articoli più letti, guerre attive, eventi militari e i migliori 5 stati di eRepublik, ",
	"show example" : "mostra esempio",
	"Turn ON" : "Attiva",
	"new article" : "nuovo articolo",
	"Write article" : "Nuovo articolo",
	"Edit newspaper details" : "Modifica dettagli giornale",
	"Edit" : "Mod",
	"Delete" : "Canc",
	"Report" : "Segnala",
	"Read Message" : "Leggi messaggi",
	"Reply" : "Rispondi",
	"From" : "Da",
	"To" : "A",
	"Back" : "Indietro",
	"Picture" : "Immagine",
	"only JPG files allowed" : "Ammessi solo files JPG",
	"Publish" : "Pubblica",
// flash menu
	"My places > Army" : "Esercito",
	"My places > Newspaper" : "Giornale",
	"My places > Organizations" : "Organizzazioni",
	"My places > Company" : "Azienda",

// menu	
	"Find out more" : "Scopri di più",
	"logout" : "Esci",
	
// Career-path
  "Apply for a job and get your daily salary." : "Lavora per guadagnare il tuo salario giornaliero",
  "A taste of what you can do in eRepublik" : "Un assaggio di quello che puoi fare su eRepublik",
  "Unlock Features" : "Sblocca funzioni",
  "Continue" : "Continua",
  "Experience level:" : "Livello esperienza:",
  "Find a job" : "Trova il lavoro",
  "Earn some money and work your way up to the top." : "Guadagna un po di soldi e aumenta la tua abilità",
  "Super soldier" : "Super soldato",
  "Become an outstanding employee and achieve the 'Hard worker' medal" : "Diventa un lavoratore modello e colleziona le medaglie Gran lavoratore",
  "Become an entrepreneur!" : "Diventa un imprenditore!",
  "You can buy a company or create a new one." : "Puoi comprare o creare un'azienda.",
  "Minimum 1 day of work" : "Minimo 1 giorno di lavoro",
  "Create a company" : "Crea un'azienda",
  "Become a very well trained Soldier." : "Diventa un buon soldato",
  "Be a hero in the battlefields and your" : "Diventa un eroe sui campi di battaglia e il",
  "name will be mentioned in history books." : "tuo nome sarà menzionato nei libri di storia",
  "Recruit" : "Allenamento",
  "Increase your strength for future battles." : "Aumenta la tua forza per le future battaglie.",
  "Become a soldier" : "Diventa soldato",
  "Soldier" : "Soldato",
  "Fight on the battlefield for your country" : "Combatti per la tua nazione o come mercenario.",
  "or as a mercenary." : "",
  "Minimum 1 fight" : "Minimo 1 combattimento",
  "Resistance" : "Resistenza",
  "Start a resistance war in a conquered region." : "Avvia una guerra di resistenza",
  "hero" : "eroe",
  "Liberate a region from enemy occupation." : "Libera una regione dall'occupazione nemica",
  "Fight in many battles and become an" : "Combatti in molte battaglie e diventa",
  "army officer." : "un ufficiale dell'esercito",
  "Receive Gold for getting your friends" : "Ricevi Oro in cambio di amici",
  "involved in eRepublik." : "invitati su eRepublik",
  "Become an official expander of the" : "Diventa un fondatore della società eRepubblicana",
  "eRepublik WORLD/COMMUNITY" : "invitando 10 amici",
  "Create a newspaper and publish your" : "Crea un giornale e pubblica i tuoi",
  "articles in the New World." : "articoli nel nuovo mondo.",
  "Win the appreciation of  readers from" : "Vinci l'apprezzamento dei tuoi lettori di tutto il",
  "all over the New World." : "mondo arrivando a 1000 sottoscrizioni",
  "Voter" : "Elettore",
  "Express your choices in the party," : "Esprimi la tua preferenza nel partito,",
  "congressional and general elections." : "al congresso, e in generale.",
  "Join a party that shares your ideas." : "Unisciti ad un partito che condivide le tue idee.",
  "candidate" : "candidato",
   "one" : "un ",
   "two" : "due ",
   "three" : "tre ",
   "four" : "quattro ",
   "five" : "cinque ",
  "Enter the elections for a congressional seat." : "Competi per una poltrona al congresso",
  "Propose and vote for laws in your country." : "Proponi e vota le leggi del tuo stato.",
  "Party president" : "Presidente partito",
  "Enter the elections for your party presidency." : "Competi nelle elezioni per il presidente di partito.",
  "Party founder" : "Fondatore di un partito",
  "You have ideas that are not shared by any party." : "Hai una filosofia non condivisa con nessun partito",
  "Create your own party." : "Creane uno tutto tuo.",
  "Status:" : "Stato:",
  " Former party member" : "Fondatore del partito",
  "Create a party" : "Crea un partito",
  "Become the Leader of your party." : "Diventa il leader del tuo partito.",
  "Win the support of your party for" : "Guadagnati il supporto del tuo partito per",
  "the general elections." : "le elezioni generali",
  "Become the ruler of your country." : "Divetta il legislatore del tuo stato",  

// barra di footer
  "Shop" : "Negozio",
  "Contact" : "TICKET di Supporto",
  "Jobs" : "Lavori",
  "Terms of Service" : "Termini del Servizio",
  "eRepublik Laws" : "Leggi di eRepublik"
};


// regular expressions
var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 alleati\\i";
regexps["^Active wars in (.*)$"] = "Guerre attive in |$1";
regexps["^Active resistance wars in (.*)$"] = "Guerre di resistenza attive in |$1";
regexps["(\\s*)Expires in (\\d*) days"] = "Scade tra $2 giorni";
regexps["^(\\d*) comments$"] = "$1 commenti";
regexps["^(\\d*) fights$"] = "$1 combattimenti";
regexps["^(\\d*) Citizenss$"] = "$1 cittadini";
regexps["(.*)characters max"] = "$1 caratteri massimi";
regexps["^(\\d*) new messages$"] = "$1 nuovi messaggi";
regexps["(.*) hours ago$"] = "$1 ore fa";
regexps["^(\\d*) minutes ago$"] = "$1 minuti fa";
regexps[",(.*)days ago"] = ", $1 giorni fa";
regexps["(.*)days ago"] = "$1 giorni fa";
regexps["(.*)months ago"] = "$1 mesi fa";
regexps["(.*) month ago"] = "$1| mese fa";
regexps["You worked (.*) days in a row.You have (.*) more days until you receive a 'Hard Worker' Medal"] = "Hai lavorato |$1| giorno/i di continuo. Devi lavorare |$2| giorno/i ancora per la medaglia 'Gran lavoratore'.";
regexps["You have worked for (.*) days in a row and you are now known as a Hard Worker. An amount of 5 Gold was added to your account as a reward for your achievement."] = "Hai lavorato per |$1| giorni con continuità, ora sei noto come un Gran lavoratore. 5 Ori sono stati aggiunti nel tuo inventario come premio";
regexps["(.*)days"] = " $1 giorni";
regexps["^Regions \\((\\d*)\\)"] = "Regioni ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Amici ($1)";
regexps["^(\\d*) months"] = "$1 mesi ";
regexps["^Comments(.*)"] = "Commenti $1";
regexps["^Trackbacks(.*)"] = "Trackbacks $1";
regexps["^supported by(.*)parties"] = "Supportato da $1 partiti";
regexps["Day(.*)of the New World"] = "Giorno $1 del Nuovo Mondo";
regexps["started on(.*)"] = "avviata il $1";
regexps["(.*)yesterday"] = "$1 ieri";
regexps["(.*) signed a peace treaty with (.*)"] = "$1| ha stabilito un trattato di pace con |$2";
regexps["(.*) signed an alliance with (.*)"] = "$1| ha stipulato un'alleanza con |$2";
regexps["A deployment of a new (.*) was proposed in (.*)."] = "Proposta la costruzione di un nuovo |$1| in |$2";
regexps["New taxes for (.*) were proposed"] = "E' stata proposta una nuova tassa per |$1";
regexps["Taxes for (.*) changed"] = "Nuova tassa per |$1| approvata";
regexps["Tax proposal of tax changes for (.*) were rejected"] = "Proposta di variazione della tassa per |$1| bocciata";
regexps["(.*) now has a new welcoming message for new citizens."] = "$1| ha un nuovo messaggio di benvenuto ai cittadini";
regexps["President of (.*) proposed a new welcome message for new citizens."] = "Il presidente de |$1| ha un nuovo messaggio di benvenuto";
regexps["(.*) proposed peace in the war against (.*)"] = "$1| ha proposto la pace nella guerra contro |$2";
regexps["President of (.*) proposed a peace in the war against (.*)."] = "Il presidente de |$1| ha proposto la pace nella guerra contro |$2";
regexps["The proposed peace treaty between (.*) and (.*) was rejected"] = "Proposta di pace tra |$1| e |$2| bocciata";
regexps["A president impeachment against (.*) was proposed"] = "Proposta la destituzione del presidente |$1";
regexps["A money issuing of (.*) was proposed"] = "Proposta la stampa di |$1";
regexps["The proposal of issuing (.*) was rejected"] = "Proposta di stampa di |$1| bocciata";
regexps["(.*) issued (.*)"] = "$1| ha stampato |$2";
regexps["A congress donation to (.*) was proposed"] = "Donazione a $1 proposta";
regexps["The proposal for a congress donation to (.*) was rejected"] = "Proposta di donazione a $1 bocciata";
regexps["(.*) made a donation to (.*)"] = "$1| ha effettuato una donazione a |$2";
regexps["A (.*) was proposed"] = "Proposto |$1";
regexps["The proposal for a (.*) was rejected"] = "Proposta per |$1| bocciata";
regexps["A new (.*) was bought in (.*)."] = "Un nuovo |$1| è stato comprato in $2";
regexps["President of (.*) proposes to stop the trade with (.*)"] = "Il presidente de |$1| ha proposto un embargo contro |$2";
regexps["(.*) stopped trading with (.*)"] = "$1| ha avviato un embargo contro |$2";

//Alerts  regexps[""] = "";
regexps["For this law to be considered accepted it needs (.*) of the Congress votes"] = "Necessita del |$1| dei voti per essere approvata.";
regexps["Your monetary exchange offer consisting in (.*) of (.*) at exchange rate of (.*) has expired and the money have returned into your account. Visit again the"] = "La tua offerta nel mercato monetario di |$1| |$2| al tasso di |$3| è scaduta e la valuta è stata rimessa nel tuo inventario. Visita ancora il ";
regexps["has transfered (.*) products to your inventory. Check your"] = "ha trasferito $1 prodotto/i nel tuo inventario. Controlla la tua";
regexps["We inform you that (.*) have been sold for (.*) from the company account using the offer posted on the"] = "Ti informiamo che $1 sono stati venduti per $2 dall'account aziendale usando il ";
regexps["has transfered (.*) products/raw materials to your inventory. Check your"] = "ha trasferito $1 prodotti/materie prime al tuo inventario. Controlla la tua ";
regexps["applied for your job (.*) and now works for"] = "ha accettato la tua proposta di lavoro |$1| e lavora in ";
regexps["(.*) has transfered (.*) to your account."] = "$1| ha trasferito |$2| al tuo account.";
regexps["You have received (.*) gift of quality (.*) from"] = "Hai ricevuto $1 gift di qualità $2 da ";
regexps["Your wellness has been increased with (.*)"] = "La tua salute è aumentata di $1";
regexps["You cannot resign from your job until (.*)."] = "Non puoi licenziarti dal tuo lavoro fino al |$1|";
regexps["Congratulations, you have reached experience level (.*) and you have received as a reward 5 Gold. To reach level (.*) you need (.*) experience points."] = "Congratulazioni, hai raggiunto il livello |$1| e sei stato premiato con 5 Ori. Per raggiungere il livello |$2| necessiti di altri |$3| punti di esperienza";
regexps["(.*)Citizens"] = "$1|Cittadini";
regexps["You received (.*) wellness from hospital."] = "Hai ricevuto |$1| punti di salute dall'ospedale";

regexps["(.*) declared war to (.*)"] = "$1| ha dichiarato guerra a |$2";
regexps["President of (.*) proposed an alliance with (.*)\."] = "Il presidente de |$1| ha proposto un'alleanza con |$2";
regexps["A resistance has started in (.*)"] = "Resistenza avviata in |$1";
regexps["(.*) was secured by (.*) in the war versus (.*)"] = "$1| messa in sicurezza da |$2| nella guerra contro |$3";
regexps["(.*) was conquered by (.*) in the war versus (.*)"] = "$1| conquistata da |$2| nella guerra contro |$3";
regexps["(.*) attacked (.*), (.*)"] = "$1| ha attaccato |$2|, |$3";
regexps["President of (.*) proposed a mutual protection pact with (.*)"] = "Il presidente de |$1| ha proposto un patto di mutua protezione con |$2";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)"] = "Dai il consenso a trasferire |$1| dall'account del paese a |$2";
regexps["Do you agree that (.*) should buy a (.*) of quality (.*) from (.*) company at the price of (.*) for (.*)\?"] = "Accetti che |$1| compri |$2| di qualità $3 dall'azienda $4 al prezzo di $5 per |$6|?";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD?"] = "Accetti la proposta di stampare $1 per $2 Gold?";
regexps["Minimum wage change from (.*) to (.*)"] = "Salario minimo passa da $1 a $2";
regexps["Citizen fee change from (.*) to (.*)"] = "Incentivo di nascita passa da $1 a $2";
regexps["Do you want the current president of (.*) to end this office?"] = "Vuoi far dimettere l'attuale presidente de |$1|?";
regexps["The President of (.*) demanded a sum of offer (.*) from your National Treasury in return to a peace treaty with (.*)\\."] = "Il presidente de |$1| ha richiesto una somma di $2 dal tesoro nazionale come compenso per il trattato di pace con |$3|.";
regexps["Do you agree on the text used by the president to welcome new Citizens in your country\\?(.*)"]
 = "Accetti il nuovo messaggio di benvenuto del presidente ai nuovi cittadini del tuo paese? $1";
regexps["(\\d+)st"] = "$1.";
regexps["(\\d+)nd"] = "$1.";
regexps["(\\d+)th"] = "$1.";
regexps["(.*)Still active"] = "$1Ancora attivo";
// months
regexps["Jan(\\d+)"] = "$1 Gen";
regexps["Feb(\\d+)"] = "$1 Feb";
regexps["Mar(\\d+)"] = "$1 Mar";
regexps["Apr(\\d+)"] = "$1 Apr";
regexps["May(\\d+)"] = "$1 Mag";
regexps["Jun(\\d+)"] = "$1 Giu";
regexps["Jul(\\d+)"] = "$1 Lug";
regexps["Aug(\\d+)"] = "$1 Ago";
regexps["Sep(\\d+)"] = "$1 Set";
regexps["Oct(\\d+)"] = "$1 Ott";
regexps["Nov(\\d+)"] = "$1 Nov";
regexps["Dec(\\d+)"] = "$1 Dic";
regexps["of January(.*)"] = "di Gennaio ";
regexps["of February(.*)"] = "di Febbraio ";
regexps["of March(.*)"] = "di Marzo ";
regexps["of April(.*)"] = "di Aprile ";
regexps["of May(.*)"] = "di Maggio ";
regexps["of June(.*)"] = "di Giugno ";
regexps["of July(.*)"] = "di Luglio ";
regexps["of August(.*)"] = "di Agosto ";
regexps["of September(.*)"] = "di Settembre ";
regexps["of October(.*)"] = "di Ottobre ";
regexps["of November(.*)"] = "di Novembre ";
regexps["of December(.*)"] = "di Decembre ";
// hope dies last!
regexps["(.*), (.*)"] = "$1|, |$2";
regexps["(.*):(.*)"] = "$1|:|$2";


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
//var imgtypes = {};
//imgtypes["^(.*)btn_buy.gif"] = imgServer+"btn_kup.gif";

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
//  replaceImgs();
  // change menu image
//  addGlobalStyle('#menu ul li#menu1 a, #menu ul li#menu2 a, #menu ul li#menu3 a, #menu ul li#menu4 a, #menu ul li#menu5 a  { background-image: url('+imgServer+'menu.png); } #menu ul li#menu1 a{background-position: 0px 0px;}  #menu ul li#menu2 a{background-position: -190px 0px;}  #menu ul li#menu3 a{background-position: -381px 0px;}  #menu ul li#menu4 a{background-position: -572px 0px;}  #menu ul li#menu5 a{background-position: -763px 0px;}  #menu ul li#menu1 a:hover{background-position: 0px -48px;}  #menu ul li#menu2 a:hover{background-position: -190px -48px;}  #menu ul li#menu3 a:hover{background-position: -381px -48px;}  #menu ul li#menu4 a:hover{background-position: -572px -48px;}  #menu ul li#menu5 a:hover{background-position: -763px -48px;}');
  // fix flash
  fixFlash();
  
}, true);