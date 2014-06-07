// ==UserScript==
// @name 	Ikariam: Zaman sayaçları
// @version	0.9
// @author 	Phate
// @description    	wwww.ikariam.forumm.biz daha çok eklenti için ziyaret edin. 
// @include       	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// @require			http://userscripts.org/scripts/source/64854.user.js
// @require			http://userscripts.org/scripts/source/64855.user.js
// @require			http://userscripts.org/scripts/source/64856.user.js
// @require			http://userscripts.org/scripts/source/57756.user.js
//
// @history        0.9	Updated calculation warehouses for upgrade buildings for Ikariam v0.3.4
// @history        0.9	Modify the calculation filling Town for Ikariam v0.3.4
// @history        0.9	Added Serbian and Slovak translation.
// @history        0.9	Calculation end date training troops and fleets to version 0.3.4 of Ikariam
// @history        0.9 	The script calculates loading time with port at level 40.
// @history        0.81	Added in TownHall, calculating oversupply or less of the population in the city. you can see him putting the mouse over the date of the end of growth
// @history        0.81	Small changes in graphics and cleanups.
// @history        0.81	Added Arabic, Danish, French and Ukraine translation.
// @history        0.81	Exclusion debugging not working.
// @history        0.8	Adapted the script to do it live with Ikariam Search.
// @history        0.8	Options page in improved language selection.
// @history        0.8  Added Russian translation.
// @history        0.8  Rewritten code to calculate the loadings at the port.
// @history        0.8  Added in the page to plunder mission, a tooltip which calculates the travel back to the round than facts.
// @history        0.8  BugFix: Loading troops, incorrect calculation of carrying capacity occupied.
// @history        0.8  BugFix: Deployment or Pillage, not calculated if the port was busy with other cargo.
// @history        0.8  BugFix: view city, in position 3, you don't see the end date if it is longer.
// @history        0.8  Update German translate.
// @history        0.8  Added Sweden translation.
// @history        0.8  Added calculation of travel in occupied city.
// @history        0.72 Bugfix: In Research Advisor the script twice the estimated date.
// @history        0.71 Bugfix: the script miscalculation with the point as thousands separator.
// @history        0.71 The script calculates loading time with port at level 35.
// @history        0.71 Added the translation into Dutch and German.
// ==/UserScript==

ScriptUpdater.check(52268, '0.9');

/**
// Changelog:
//	v0.9	Aggiornato calcolo termine addestramento truppe, flotta e spie per Ikariam 0.3.4
//			Modificato calcolo magazzini.
//			Traduzione Serba e Slovena.
//			Calcolo del tempo di caricamento fino al livello 40 del porto.
//
//	v0.81	Aggiunto nel municipio il calcolo dell'esubero o meno della popolazione nella città.
//			Piccole modifiche grafiche e pulizia del codice.
//			Aggiunta traduzione Araba, danese, francese e Ukraina.
//			BugFix: non si poteva escludere il debug.
//
//	v0.8	Modificato il codice per usarlo assieme a Ikariam Search.
//			Modificata la selezione della lingua nelle opzioni.
//			Aggiunta traduzione in Russo.
//			Migliorato il codice per il calcolo del caricamento navi.
//			Nell'invio truppe per saccheggiare ho inserito tooltip con tempi di rientro a seconda dei rounds di guerra fatti.
//			BugFix: errato calcolo dell'occupazione stiva nel caricamento truppe.
//			BugFix: nel caricamento truppe per spostamento o attacco non veniva calcolato il tempo in cui il porto era occupato per altri carichi.
//			BugFix. nella pagina citta' in posizione 3 se la data è troppo lunga non è visibile.
//			Aggiunto calcolo di viaggio per l'occupazione di una città.
//			bugFix: milgiorata la traduzione in Tedesco.
//			Aggiunto calcolo di viaggio per truppe inviate da una citta' occupata.
//			Aggiunta traduzione svedese
//
//	v0.72	BugFix: Nelle ricerche lo script inserisce 2 volte la data.
//
//	v0.71	BugFix: calcoli errati con '.' come sepatatore centinaia.
//			Calcolo del tempo di carico merci fino al livello 35 del porto.
//			Aggiunta traduzione in tedescho ed olandese.
//
//	v0.7	Modificato calcolo costruzione magazzini
//			Modificato salvataggio livelli porto e magazzino
//			Features: Adesso è possibile annullare il caricamento merci nella pagina della flotta mercantile.
//
//	v0.6.2	Aggiunta lingua greca.
//			Aggiunta lingua portoghese.
//			BugFix; Nel mercato lo script restituisce un errore se mancano le materie prime.
//			Features: Inserita la possibilità di selezionare nelle Opzioni il formato dell'ora (12h o 24h).
//
//	v0.6.1	BugFix: errore di cella2 inesistente nei movimenti flotta.
//			BugFix: errore funzione cityIdButtonTroops. Modificato codice ed eliminato funzione.
//			BugFix: lo script restituisce un errore se la pagina schiera truppe/flotte restiruisce un errore. Intercettato l'errore.
//			Completata la traduzione in polacco (era parziale).
//
//	v0.6	Completamente rivisitato il codice di tutto lo script, adesso i timer cercano i tempi nei countdown del gioco (conteggi piu' precisi).
//			Features: Pagina nuove costruzione non mette più l'ora di fine costruzione se non si hanno le risorse.
//			BugFix: corretto l'errato calcolo dell'occupazione stiva nella pagina delle movimentazione truppe.
//			Inserito abbreviazioni mesi per ogni lingua.
//			Features: Calcolo rientro mercantili per interruzione missione di tipo scambio merci e attacco citta' nella pagina Flotta mercantili.
//			Features: Inserito calcolo del tempo in cui il porto e' occupato a caricare altre navi. Attualmente il calcolo e' giusto solo se le missioni di
//						caricamento vengono annullate nel porto. Non si possono considerare gli eventuali caricamenti di navi per acquisto merci.
//			Features: Inserito data di fime ampliamento cava/miniera/vigna.
//			Features: Inserito nella previsione del riempimento città la scritta 'pieno' quando si raggiunge la capienza massima della città.
//			Features: Inserito nella pagina Flotta mercantili il countdown e la data di arrivo a destinazione quando la missione e in fase di caricamento merci 
//						o truppe nel porto.
//			Request: Inserito i secondi nel calcolo della data nelle movimentazioni truppe.
//			Request: Possibilita' di escludere la previsione di citta' piena nella pagina delle opzioni.
//			Adeguato lo script alla versione 0.3.2 di ikariam.
//			Features: Nella pagina dell'Advisor ricerche viene inserita la data in cui si avranno abbastanza punti per acquistare la ricerca.
//			Features: Inserito il tempo di caricamento merci, quando si compra merce nel mercato, con la ver0.3.2 di ikariam e' noto il livello del porto del venditore.
//			Features: Nelle pagine della baracca e del Cantiere navale viene calcolato il tempo necessario e la data di fine reclutamento o costruzione.
//			Aggiornato l'occupazione stiva delle truppe alla versione 0.3.2 di Ikariam (cambiano gli spazi occupati dalle varie truppe, aggiunta nuova unita').
//			Aggiunto lingua lettone.
//			Request: Possibilita' di selezionare come orario di riferimento l'ora locale o quella del server di ikariam.
//			Features: Nel mercato quando si spedisce della merce di una richiesta viene calcolato il tempo di carico e data di andata e ritorno dei mercantili.
//			Inserito data nel conto all'arrovescia per la fine del miracolo.
//
//	v0.5.1	Aggiunta lingua Polacca, Israeliana e Ungherese.
//
//	v0.5	Feature: Nel tempo di caricamento vengono conteggiati anche i secondi.
//			BugFix: nei trasporti non calcolava il tempo di carico se uno dei valori risorse non era un numero.
//			BugFix: errato calcolo dei tempi di costruzione se si visualizza una citta differente da quella selezionata nella sezione NavCity.
//			Feature: Nel riepilogo mercantile inserita la percentuale di stiva piena.
//			Feature: Inserito nelle opzioni la possibilità di cambiare lingua e di togliere il controllo degli errori.
//			Feature: Una volta al giorno c'e il controllo di nuove versioni.
//			Feature: Aggiunto file Army.js, che contiene tutte le funzioni dell'esercito e della flotta.
//			Feature: Nella spedizione blocca porto inserita la data di inizio e fine blocco e l'ora di rientro della flotta nel proprio porto.
//			Feature: Aggiunto file trasport.js, che contiene tutte le funzioni inerenti al trasporto merci.
//			Feature: Nella pagina dell'invio mercantili per comprare merce adesso è possibile sapere l'ora di arrivo e l'ora dopo la quale può arrivare la merce.
//			Feature: Nella pagina del trasporto merci addesso riconosce se è un trasporto interno oppure uno scambio, in quest'ultimo caso calcola anche l'ora di rientro dei mercantili.
//			BugFix: Migliorato il conteggio del rientro mercantili dalle missioni di compra merce.
//			Feature: Nel riepilogo dei movimenti flotta nella prima colonna è presente l'ora d'arrivo e nella tabella di carico sotto il numero dei mercantili c'è la percentuale di stiva piena.
//			BugFix: Migliorata la conversione dei countdown, adesso per comparare i dati si usano le variabili di tempo usate dagli script GameForge.
//			Feature: Nel calcolo della mancanza risorse delle costruzioni adesso controlla che ci sia un livello adeguato del magazzino ed informa sulla capienza del magazzino attuale.
//			Feature: Nel porto durante il caricamento merci c'è l'orario in cui termina.
//			Feature: Quando si inviano o rientrano spie viene notificata l'ora di fine operazione.
//			Aggiunta traduzione in spagnolo. Grazie a Rohcodom
//			Feature: Aggiunto data di fine costruzione nell'elenco dei nuovi edifici, quando si vuol creare una nuova costruzione in uno spazio edificabile.
//
// 	v0.4	BugFix: corretto l'inversione delle date di fine costruzione e fine ricerca nell'accademia.
//			Nella pagina trasporto inserito come tooltip del tempo di caricamento, il livello del porto su cui è stato fatto il calcolo.
//			Nella pagina del trasporto viene calcolata quanta merce è possibile stivare ancora senza dover aggiungere navi.
//			BugFix: script genera errore se una costruzione arriva al suo massimo livello.
//
//	v0.3	Negli edifici controllo delle risorse necessarie a costruirlo, se ci sono tutte le risorse, mette la data e l'ora di fine costruzione, 
//				altrimenti visualizza le risorse mancanti.
//
//	v0.2	Previsione di Data fine costruzione, quando si entra in qualsiasi edificio. Nel caso in cui nella citta
//				si stia gia costruendo un edificio, verra visualizzato anche la data di inizio costruzione.
//			Nella pagina di un edificio in costruzione visualizza la ora e data di fine upgrade.
//			Nella pagina della Flotta mercantile vengono inseriti l'ora di arrivo e di rientro.
//			Nella pagina di Trasporto viene inserito il tempo di caricamento e l'ora di arrivo del carico.
//			Nella pagina del mercato viene inserito il totale del guadagno ottenuto dalle possibili vendite.
//			Avvertimento se esiste una versione nuova.
//
//	v0.1	Data fine costruzione della pagina della citta
//			Data fine ricerca nella pagina dell'accademia e in quella dele ricercatore
//			Integrato script Ikariam predict
*/

// Featurs:
// 	Inserire setInteval anche per le date di arrivo per l'aggiornamento continuo.
//	Controllare countdown attese caricamento porto non funzionano.

// languages
const lversion = "0.9";
const ltyp = ['ar','de','dk','en','es','fr','gr','hu','il','it','lv','nl','pl','pt','rs','ru','se','sk','ua']
const langs = 
{ 	//LANGUAGES
	ar:
	{ // Arabic translate by Samerramez
		text_Upgrade: 	"انتهاء التطوير ",
		msg_Never: 		"ابداً",
		msg_TimeLeft: 	"يمتلئ: ",
		msg_Titile1: 	"تاريخ انتهاء التطوير",
		msg_Titile2: 	"(تاريخ البداية) تاريخ انتهاء التطوير",
		totalprice: 	"احتمال الدخل : ",
		resource: 		"ناقص للمستوى ",
		errortxt: 		"End_Time تبين انه هنالك خطأ.\n\n",
		errortxt1: 		" \n\n هل تريد ارسال الخطأ الى صانع السكربت?",
		port: 			"وقت التحميل - مستوى المرفأ = ",
		port2: 			"سرعة التحميل: ",
		wait: 			"المرفأ يقوم بالتحميل الآن",
		hold: 			"تسطيع تحميل بنفس عدد السفن كمان ",
		hold2: 			" الموارد",
		loadcargo: 		" السفن ممتلئة",
		optiontxt:		"اختيار اللغة",
		block1: 		"بداية محاصرة المرفأ",
		block2: 		"انتهاء محاصرة المرفأ",
		block3: 		"عودة الأسطول",
		blockico: 		"محاصرة المرفأ",
		transport1: 	"وجهة الوصول",
		transport2: 	"العودة الى المرفأ",
		WhTitle: 		"منزل التخزين",
		txtWh1: 		"يجب عليك بناء اخر ",
		txtWh2: 		" المستويات",
		loadport: 		"انتهاء التحميل ",
		emptyWh: 		"الفارغ في منزل التتخزين",
		month: 			"1,2,3,4,5,6,7,8,9,10,11,12",
		abortmission: 	"سحب الأساطيل - ",
		predictfull: 	"ممتلئ",
		titletravel: 	"مدة الرحلة",
		predict: 		"حساب الوقت لملء المدينة",
		headTime:		"اختيار اعدادات الوقت:",
		localTime: 		"الوقت المحلي",
		serverTime: 	"توقيت السيرفر",
		formatTime: 	"صيغة الوقت",
		townhalltitle1: " الناس لتملأ المدينة",
		townhalltitle2: " الناس الموجودة",
	},
	de:
	{ // German translate by Aristeidis - fixed by TorfDrottel
		text_Upgrade: 	"Ausbau abgeschlossen ",
		msg_Never: 		"nie",
		msg_TimeLeft: 	"Voll in: ",
		msg_Titile1: 	"Zeitpunkt der Fertigstellung",
		msg_Titile2: 	"(Zeitpunkt des Baubeginns) Zeitpunkt der Fertigstellung",
		totalprice: 	"Mögliches Gesamteinkommen: ",
		resource: 		"Fehlend für Stufe ",
		errortxt: 		"End_Time hat einen Fehler verursacht.\n\n",
		errortxt1: 		" \n\n Möchtest du den Fehler dem Autor melden?",
		port: 			"Verladezeit - Handelshafen Stufe = ",
		port2: 			"Verladegeschwindigkeit : ",
		wait: 			"Der Hafen ist mit dem Verladen anderer Waren beschäftigt",
		hold: 			"Der Laderaum wäre voll mit weiteren ",
		hold2: 			" Waren",
		loadcargo: 		" Handelsschiffe sind voll",
		optiontxt: 		"Sprache wählen ",
		block1:			"Beginn der Hafenblockade",
		block2:			"Ende der Hafenblockade",
		block3:			"Rückkehr der Flotte",
		blockico:		"Hafen blockieren",
		transport1:		"Ankunft am Ziel",
		transport2:		"Rückkehr zum Heimathafen",
		WhTitle: 		"Lagerhaus",
		txtWh1: 		"Du musst noch 20 ",
		txtWh2: 		" Stufen ausbauen",
		loadport: 		"Verladen fertig um ",
		emptyWh: 		"freie Kapazität im Lagerhaus",
		month:			"Jan,Feb,Mrz,Apr,Mai,Jun,Jul,Aug,Sep,Okt,Nov,Dez",
		abortmission:	"Flotte zurückziehen - ",
		predictfull: 	"voll",
		titletravel: 	"Dauer des Transports",
		predict: 		"Berechne die Zeit bis die Bevölkerungsgrenze erreicht ist",
		headTime: 		"Wähle die die Bezugszeit:",
		localTime: 		"Lokale Zeit",
		serverTime: 	"Server Zeit",
		formatTime:		"Zeitformat",
		townhalltitle1:	 " Einwohner, um die Stadt zu füllen",
		townhalltitle2:	 " überschüssige Einwohner"
	},
	dk:
	{// Danish translate by lovebug
		text_Upgrade: "End of the opgradering",
		msg_Never: "aldrig",
		msg_TimeLeft: "Fuld i:",
		msg_Titile1: "dato for afslutningen af den opgradering",
		msg_Titile2: "(datoen for starten), datoen for afslutningen af den opgradering",
		totalprice: "Possible samlede indkomst:",
		ressource: "Missing for niveau",
		errortxt: "End_Time har genereret en fejl. \ n \ n",
		errortxt1: "\ n \ n Du ønsker at signalere fejl til forfatteren?",
		port: "Loading time - Trading port niveau =",
		port2: "Henter hastighed:",
		vente: "Porten er engageret til at indlæse andre last",
		hold: "De hold vil være fuld med andre",
		hold2: "varer",
		loadcargo: "laster er fuld",
		optiontxt: "Vælg sprog",
		block1: "Start blokere port",
		block2: "End blokere port",
		block3: "Return of the flåde",
		blockico: "Block havn",
		transport1: "Destination ankomst",
		transport2: "Vend tilbage til din port",
		WhTitle: "lager",
		txtWh1: "Du skal bygge andre",
		txtWh2: "niveauer",
		loadport: "Henter ende på",
		emptyWh: "Rummet i lageret",
		month: "Jan,Feb,Mar,Apr,Maj,Jun,Jul,Aug,Sept,Okt,Nov,Dec",
		abortmission: "Udbetaling flåder -",
		predictfull: "fulde",
		titletravel: "Varighed af rejsen",
		forudsige: "Beregn den tid til at fylde byen",
		headTime: "Vælg den reference tid:",
		localtime: "Lokal tid",
		servertime: "Server tid",
		formatTime: "Time format",
		townhalltitle1: "folk til at fylde byen",
		townhalltitle2: "folk i overskydende",
	},
	en:
	{ // English translate by Paul93
		text_Upgrade: 	"End of the upgrading ",
		msg_Never: 		"never",
		msg_TimeLeft: 	"Full in: ",
		msg_Titile1: 	"date of the end of the upgrading",
		msg_Titile2: 	"(date of the beginning) date of the end of the upgrading",
		totalprice: 	"Possible total income: ",
		resource: 		"Missing for the level ",
		errortxt: 		"End_Time has generated an error.\n\n",
		errortxt1: 		" \n\n You want to signal the error to the author?",
		port: 			"Loading time - Trading port level = ",
		port2: 			"Loading speed: ",
		wait: 			"The port is engaged to load other cargo",
		hold: 			"The hold will be full with other ",
		hold2: 			" goods",
		loadcargo: 		" cargos are full",
		optiontxt: 		"Select language",
		block1:			"Start block port",
		block2:			"End block port",
		block3:			"Return of the fleet",
		blockico:		"Block port",
		transport1:		"Destination arrival",
		transport2:		"Return to your port",
		WhTitle: 		"Warehouse",
		txtWh1: 		"You should build other ",
		txtWh2: 		" levels",
		loadport: 		"Loading end at ",
		emptyWh: 		"Space in the warehouse",
		month:			"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sept,Oct,Nov,Dec",
		abortmission:	"Withdraw fleets - ",
		predictfull: 	"full",
		titletravel: 	"Duration of journey",
		predict: 		"Calculate the time to fill the town",
		headTime: 		"Select the reference time:",
		localTime: 		"Local time",
		serverTime: 	"Server time",
		formatTime:		"Time format",
		townhalltitle1:	" people to fill up the town",
        townhalltitle2:	" people in excess",
	},
	es:
	{ // Spanish translate by Rohcodom
		text_Upgrade:	"Fin de la ampliación ",
		msg_Never: 		"nunca",
		msg_TimeLeft: 	"Lleno en: ",
		msg_Titile1: 	"fecha del final de la ampliación",
		msg_Titile2: 	"(fecha del inicio) fecha del final de la ampliación",
		totalprice: 	"Total de ganancias posibles: ",
		resource: 		"Faltantes para el nivel ",
		errortxt: 		"End_Time ha generado un error.\n\n",
		errortxt1: 		" \n\n ¿Deseas informar del error al autor?",
		port: 			"Tiempo de carga - Tamaño del puerto = ",
		port2: 			"Velocidad de carga: ",
		wait: 			"El puerto está ocupado cargando otros barcos mercantes",
		hold: 			"El barco mercante estará lleno con ",
		hold2: 			" bienes",
		loadcargo: 		" barcos mercantes están llenos",
		optiontxt: 		"Selecciona el idioma",
		block1:			"Inicio del bloqueo del puerto",
		block2:			"Fin del bloqueo del puerto",
		block3:			"Regreso de la flota",
		blockico:		"Bloquear puerto",
		transport1:		"Llegada al destino",
		transport2:		"Regreso a tu puerto",
		WhTitle: 		"Depósito",
		txtWh1: 		"Debes construir otros ",
		txtWh2: 		" niveles",
		loadport:		"Fin de la carga en ",
		emptyWh:		"Espacio en el depósito",
		month:			"Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic",
		abortmission:	"REtirar flotas - ",
		predictfull:	"lleno",
		titletravel:	"Duración del viaje",
		predict: 		"Calcular el tiempo en el que estará lleno el pueblo",
		headTime: 		"Seleccionar el horario de referencia:",
		localTime: 		"Hora local",
		serverTime:		"Hora del servidor",
		formatTime:		"Formato de hora",
		townhalltitle1:	" habitantes para llenar el pueblo",
		townhalltitle2:	" exceso de habitantes",
	},
	fr:
	{ // French translate by Shrek
		text_Upgrade: "Fin de l'amélioration ",
		msg_Never: "Jamais",
		msg_TimeLeft: "Complet dans : ",
		msg_Titile1: "Date de la fin de l'amélioration",
		msg_Titile2: "(date de début) date de la fin de l'amélioration",
		totalprice: "Revenu total possible: ",
		resource: "Manquant pour le niveau ",
		errortxt: "End_Time a généré une erreur.\n\n",
		errortxt1: " \n\n Voulez-vous signaler cette erreur à l'auteur?",
		port: "Temps de chargement - Port commercial niveau = ",
		port2: "Vitesse de chargement: ",
		wait: "Le port est en train de charger d'autres cargos",
		hold: "La cale sera complète avec ",
		hold2: " autres marchandises",
		loadcargo: " cargos sont pleins",
		optiontxt: "Sélection de la langue",
		block1: "Débuter blocage du port",
		block2: "Fin blocage du port",
		block3: "Retour de la flotte",
		blockico: "Blocage du port",
		transport1: "Destination d'arrivée",
		transport2: "Retour à votre port",
		WhTitle: "Entrepôt",
		txtWh1: "Vous devriez construire ",
		txtWh2: " autres niveaux",
		loadport: "Fin de chargement à ",
		emptyWh: "Place dans l'entrepôt",
		month: "Jan,Fev,Mars,Avr,Mai,Juin,Juil,Août,Sept,Oct,Nov,Dec",
		abortmission: "Retrait des flottes - ",
		predictfull: "complet",
		titletravel: "Durée du voyage",
		predict: "Calcul du temps de remplissage de la ville",
		headTime: "Sélection de l'heure de référence :",
		localTime: "Heure locale",
		serverTime: "Heure du serveur",
		formatTime: "Format de l'heure",
		townhalltitle1: " personnes pour compléter la ville",
		townhalltitle2: " personnes en trop",
	}, 
	gr:
	{ // Greek traslate by Napoleon I
		text_Upgrade:	"Ολοκλήρωση αναβάθμισης ",
		msg_Never: 		"ποτέ",
		msg_TimeLeft: 	"Πλήρες σε: ",
		msg_Titile1: 	"ημερομηνία λήξης αναβάθμισης",
		msg_Titile2: 	"(ημερομηνία έναρξης) ημερομηνία λήξης αναβάθμισης",
		totalprice: 	"Πιθανά συνολικά έσοδα: ",
		resource: 		"Υπολείπονται για το επίπεδο ",
		errortxt: 		"Το End_Time έχει πραγματοποιήσει ένα σφάλμα. \n\n",
		errortxt1: 		" \n\n Θέλεις να αναφέρεις το σφάλμα στο συντάκτη?",
		port: 			"Χρόνος φόρτωσης - Επίπεδο Εμπορικού Λιμένα = ",
		port2: 			"Ταχύτητα φόρτωσης: ",
		wait: 			"Ο Εμπορικός Λιμένας είναι απασχολημένος με τη φόρτωση άλλου φορτίου",
		hold: 			"Το αμπάρι θα είναι πλήρες με άλλο(-α) ",
		hold2: 			" αγαθό(-ά)",
		loadcargo: 		" πλήρες φορτίο",
		optiontxt: 		"Επιλογή γλώσσας",
		block1:			"Έναρξη αποκλεισμού λιμανιού",
		block2:			"Λήξη αποκλεισμού λιμανιού",
		block3:			"Επιστροφή στόλου",
		blockico:		"Αποκλεισμός λιμανιού",
		transport1:		"Άφιξη στον προορισμό",
		transport2:		"Επιστροφή στο λιμάνι σου",
		WhTitle: 		"Αποθήκη Εμπορευμάτων",
		txtWh1: 		"Πρέπει να αναβαθμίσεις άλλο(-α) ",
		txtWh2: 		" επίπεδο(-α)",
		loadport: 		"Ολοκλήρωση φόρτωσης στις ",
		emptyWh: 		"Διαθέσιμος χώρος στην Αποθήκη Εμπορευμάτων",
		month:			"01  ,02  ,03  ,04  ,05  ,06  ,07  ,08  ,09  ,10  ,11  ,12  ",
		abortmission:	"Απόσυρση στόλων - ",
		predictfull: 	"πλήρες",
		titletravel: 	"Διάρκεια ταξιδιού",
		predict: 		"Υπολογισμός χρόνου πλήρωσης Δημαρχείου",
		headTime: 		"Επιλογή ώρας αναφοράς:",
		localTime: 		"Τοπική ώρα",
		serverTime: 	"Ώρα Server",
		formatTime:		"Μορφή ώρας",
		townhalltitle1: " πολίτες για να γεμίσουν την πόλη",
		townhalltitle2:	" πλεόνασμα πολιτών",
	},
	hu:
	{ // magyar forditas Robagfalva rb6514@gmail.com **Parzial
		text_Upgrade: 	"A fejlesztés befejezése ",
		msg_Never: 		"soha",
		msg_TimeLeft: 	"Tele: ",
		msg_Titile1: 	"a fejlesztés befejező dátuma",
		msg_Titile2: 	"(kezdés ideje) és befejezése",
		totalprice: 	"eladásból származó bevétel: ",
		resource: 		"A következő szinthez szükséges ",
		errortxt: 		"probléma a scripttel.\n\n",
		errortxt1: 		" \n\n jelented a hibát a szerzőnek",
		port: 			"Kikötő szint = ",
		port2: 			"Töltési sebesség: ",
		wait: 			"a kikötöben lévő egyébb rakomány",
		hold: 			"Hogy teli legyen, kell még ",
		hold2: 			" nyersanyag",
		loadcargo: 		" szállitok teli",
		optiontxt: 		"Válasz nyelvet",
		block1:			"kezdés a kikötőben",
		block2:			"zárás a kikötőben",
		block3:			"hajok visszaérnek",
		blockico:		"kikötő zárva",
		transport1:		"érkezés másik kikötőbe",
		transport2:		"visszatérés a kikötőbe",
		WhTitle: 		"raktár",
		txtWh1: 		"Épiteni kell még ",
		txtWh2: 		" szintet",
		loadport: 		"töltés vége ",
		emptyWh: 		"hely a raktárban",
		// english
		month:			"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sept,Oct,Nov,Dec",
		abortmission:	"Withdraw fleets - ",
		predictfull: 	"full",
		titletravel: 	"Duration of journey",
		predict: 		"Calculates the time needed for population growth",
		headTime: 		"Select the reference time:",
		localTime: 		"Local time",
		serverTime: 	"Server time",
		formatTime:		"Time format",
		townhalltitle1:	" people to fill up the town",
        townhalltitle2:	" people in excess",
	},
	il:
	{ // Hebrew translate by Yaakov תורגם לעברית ע"י יעקב
		text_Upgrade: 	"סיום השידרוג ",
		msg_Never: 		"אף פעם",
		msg_TimeLeft: 	"מלא ב: ",
		msg_Titile1: 	"תאריך סיום השידרוג",
		msg_Titile2: 	"(תאריך ההתחלה) תאריך סיום השידרוג",
		totalprice: 	"ס''ה הכנסה אפשרית: ",
		resource: 		"חסר לשלב ",
		errortxt: 		"שגיאה בזמן הסיום. \n\n",
		errortxt1: 		" \n\n האם אתה מעונין לדווח על השגיאה למפתח?",
		update: 		"קיימת גירסה חדשה ",
		port: 			"זמן טעינה – שלב נמל = ",
		port2: 			"מהירות טעינה ",
		wait: 			"הנמל עסוק בטעינה אחרת",
		hold: 			"המטען יהיה מלא עם עוד ",
		hold2: 			" משאבים",
		loadcargo: 		" המטען מלא",
		optiontxt: 		"בחר שפה",
		block1: 		"התחלת חסימת הנמל",
		block2: 		"סיום חסימת הנמל",
		block3: 		"שעת החזרה של הצי",
		blockico: 		"נמל חסום",
		transport1: 	"יעד הגעה",
		transport2: 	"חזרה לנמל שלך",
		WhTitle: 		"מחסן",
		txtWh1: 		"צריך לבנות עוד ",
		txtWh2: 		" שלבים",
		loadport: 		"הטעינה תסתיים ב ",
		emptyWh: 		"מקום פנוי במחסן",
		month: 			"01,02,03,04,05,06,07,08,09,10,11,12",
		abortmission: 	"הסג צי - ",
		predictfull: 	"מלא",
		titletravel: 	"משך המשימה",
		predict: 		"חישוב זמן לעיר מלאה",
		headTime: 		"בחר את התיחסות השעה:",
		localTime: 		"שעה מקומית",
		serverTime: 	"שעת השרת",
		formatTime: 	"תבנית השעה",
		townhalltitle1: " אזרחים לעיר מלאה",
		townhalltitle2: "אזרחים מיותרים",
	},
	it:
	{ // Italian texts by myself:
		text_Upgrade: 	"Fine costruzione ",
		msg_Never: 		"mai",
		msg_TimeLeft: 	"Pieno in : ",
		msg_Titile1: 	"Data di Fine costruzione",
		msg_Titile2: 	"(Data di Inizio) Data di Fine costruzione",
		totalprice: 	"Possibile reddito totale: ",
		resource: 		"Mancano per il livello ",
		errortxt: 		"End_Time ha generato un errore.\n\n",
		errortxt1: 		" \n\n Vuoi segnalare l'errore all'autore?",
		port: 			"Tempo di Carico - Livello del porto = ",
		port2: 			"Velocità di caricamento: ",
		wait: 			"Il porto è impegnato a caricare altri mercantili",
		hold: 			"La stiva sarà piena con ",
		hold2: 			" merci",
		loadcargo: 		" mercantili a stiva piena",
		optiontxt: 		"Seleziona la lingua",
		block1:			"Inizio del blocco al porto",
		block2:			"Fine del blocco al porto",
		block3:			"Rientro della flotta",
		blockico:		"Blocco porto",
		transport1:		"Arrivo a destinazione",
		transport2:		"Ritorno nel tuo porto",
		WhTitle: 		"Magazzino",
		txtWh1: 		"Dovresti costruire altri ",
		txtWh2: 		" livelli",
		loadport: 		"Fine caricamento ",
		emptyWh: 		"Spazio nel magazzino",
		month: 			"Gen,Feb,Mar,Apr,Mag,Giu,Lug,Ago,Set,Ott,Nov,Dic",
		abortmission: 	"Ritiro flotta - ",
		predictfull: 	"pieno",
		titletravel: 	"Tempo di Viaggio",
		predict: 		"Calcola il tempo di riempimento Città",
		headTime:		"Seleziona l'orario di riferimento:",
		localTime: 		"Orario locale",
		serverTime: 	"Ora del server",
		formatTime:		"Formato Ora",
		townhalltitle1:	" cittadini per riempire la città",
		townhalltitle2:	" cittadini in eccesso",
	},
	lv:
	{ // Latvian translate by ootoo - fixed by Andrejs & jasa2009
		text_Upgrade: 	"Celtniecība beigsies ",
		msg_Never: 		"nekad",
		msg_TimeLeft: 	"Pilna: ",
		msg_Titile1: 	"Celtniecības beigu datums",
		msg_Titile2: 	"Sākuma datums",
		totalprice: 	"Kopējie ienākumi: ",
		resource: 		"Pietrūkst līmenim ",
		errortxt: 		"End_Time ir pieļāvis kļūdu.\n\n",
		errortxt1: 		" \n\n Tu vēlies paziņot autoram par kļūdu??",
		port: 			"Iekraušanās laiks - Ostas līmenis = ",
		port2: 			"Iekraušanas ātrums: ",
		wait: 			"Patreiz ostā tiek pildīti citi kuģi",
		hold: 			"Kuģis būs pilns pēc ",
		hold2: 			" materiāliem",
		loadcargo: 		" pilni tirdzniecības kuģi",
		optiontxt: 		"Izvēlēties valodu",
		txtlng:			"lv",
		block1:			"Sāk blokādi",
		block2:			"Blokādes beigas",
		block3:			"Flote atgriežās mājās",
		blockico:		"Osta bloķēta",
		transport1:		"Pienāks galapunktā",
		transport2:		"Atgriezīsies jūsu ostā",
		WhTitle: 		"Noliktava",
		txtWh1: 		"Tev vajadzētu uzbūvēt vairāk",
		txtWh2: 		" līmeņus",
		loadport: 		"Iekraušana beigsies ",
		emptyWh: 		"Brīva vieta noliktavā",
		month: 			"Jan,Feb,Mar,Apr,Mai,Jūn,Jūl,Aug,Sept,Okt,Nov,Dec",
		abortmission: 	"Atsaukt flotes – ",
		predictfull: 	"pilns",
		titletravel: 	"Ceļa ilgums",
		predict: 		"Laiks pilsētas apdzīvošanai",
		headTime: 		"Izvēlēties laiku:",
		localTime: 		"Vietējais laiks",
		serverTime: 	"Servera laiks",
		formatTime: 	"Laika formāts",
		townhalltitle1:	"pietrūkst līdz aizpildīšanai",
		townhalltitle2:	"nepieciešamās dzīvesvietas pieaugumam",
	},
	nl:
	{ // Dutch translate by Boudewijn
		text_Upgrade: 	"Uitbreiding voltooid:  ",
		msg_Never: 		"nooit",
		msg_TimeLeft: 	"Vol in: ",
		msg_Titile1: 	"einddatum voltooiing uitbreiding",
		msg_Titile2: 	"(Begintijdstip) Eindtijdstip",
		totalprice: 	"Mogelijk totale inkomen: ",
		resource: 		"Nodig voor level ",
		errortxt: 		"Er is een fout opgetreden in End_Time.\n\n",
		errortxt1: 		" \n\n Wil je de fout doorgeven aan de auteur?",
		port: 			"Laadtijd - Handelshaven level = ",
		port2: 			"Laadsnelheid: ",
		wait: 			"De haven wordt gebruikt om een ander schip te laden",
		hold: 			"Het scheepsruim is vol met nog ",
		hold2: 			" goederen",
		loadcargo: 		" handelsschepen zijn vol",
		optiontxt: 		"Kies taal",
		block1:			"Begin havenblokkade",
		block2:			"Eind havenblokkade",
		block3:			"Terugkomst van de vloot",
		blockico:		"Blokkeer haven",
		transport1:		"Aankomsttijd",
		transport2:		"Terugkomst in de haven",
		WhTitle: 		"Opslagplaats",
		txtWh1: 		"Je moet bouwen tot ",
		txtWh2: 		" levels",
		loadport: 		"Laden voltooid om ",
		emptyWh: 		"Ruimte in de opslagplaats",
		month:			"Jan,Feb,Mrt,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec",
		abortmission:	"Terugtrekken vloot - ",
		predictfull: 	"vol",
		titletravel: 	"Duur van de reis",
		predict: 		"Bereken de tijdsduur om de maximale stadscapaciteit te halen",
		headTime: 		"Kies de referentie tijd:",
		localTime: 		"Plaatselijke tijd",
		serverTime: 	"Server tijd",
		formatTime:		"Tijdsformaat",
		townhalltitle1: " inwoners om de stad vol te maken",
        townhalltitle2: " inwoners in overvloed",
	},
	pl:
	{ // Tłumaczenie na polski przez Qasq **Partial
		text_Upgrade: 	"Koniec rozbudowy ",
		msg_Never: 		"nigdy",
		msg_TimeLeft: 	"Pełne o: ",
		msg_Titile1: 	"Czas ukończenia rozbudowy",
		msg_Titile2: 	"(Data rozpoczęcia) data końca rozbudowy",
		totalprice: 	"Złoto możliwe do zarobienia na tych transakcjach: ",
		resource: 		"Brakuje do tego poziomu ",
		errortxt: 		"Skrypt napotkał błąd.\n\n",
		errortxt1: 		" \n\n Chcesz zgłosić problem do autora?",
		port: 			"Poziom twojego portu = ",
		port2: 			"Prędkość załadunku: ",
		wait: 			"W porcie ładowane jest inne zamówienie",
		hold: 			"Ten transport ma jeszcze tyle wolnej przestrzeni ",
		hold2: 			" dobra",
		loadcargo: 		" statki są pełne",
		optiontxt: 		"Wybierz język",
		block1:			"Zacznij blokować port",
		block2:			"Skończ blokować port",
		block3:			"Zawróć flotę",
		blockico:		"Zacznij blokować port",
		transport1:		"Wpływa do docelowego portu",
		transport2:		"Wraca do twojego portu",
		WhTitle: 		"Magazyn",
		txtWh1: 		"Rozbuduj do ",
		txtWh2: 		" poziomu",
		loadport: 		"Ładowanie zakńczy się o ",
		emptyWh: 		"Miejsce w magazynie/ach",
		month:			"Sty,Lut,Mar,Kwi,Maj,Cze,Lip,Sie,Wrz,Paź,Lis,Gru",
		abortmission:	"Wycofanie floty - ",
		predictfull: 	"pełno",
		titletravel: 	"Czas trwania podróży",
		predict: 		"Obliczenie czasu zapełnienia miasta",
		headTime: 		"Wybór czasu referencyjnego:",
		localTime: 		"Czas lokalny",
		serverTime: 	"Czas serwera",
		formatTime:		"Time format",
		townhalltitle1:	" people to fill up the town",
        townhalltitle2:	" people in excess",
	},	
	pt:
	{ // Portuguese translate by Pescossudo **Partial
		text_Upgrade:	"Fim da melhoria ",
		msg_Never: 		"nunca",
		msg_TimeLeft: 	"Cheia em: ",
		msg_Titile1: 	"Data do fim da melhoria",
		msg_Titile2: 	"(data de início) data do fim da melhoria",
		totalprice: 	"Renda total possível: ",
		resource: 		"Falta para o nível ",
		errortxt: 		"End_Time gerou um erro.\n\n",
		errortxt1: 		" \n\n Você quer enviar o erro para o autor?",
		port: 			"Tempo de carregamento - o nível do porto de troca = ",
		port2: 			"Velocidade carregamento: ",
		wait: 			"O porto é contratado para carregar outras cargas",
		hold: 			"Faltam ",
		hold2: 			" mercadorias para completar a carga.",
		loadcargo: 		" carga está completa",
		optiontxt: 		"Selecione linguagem",
		block1: 		"Inicia bloqueio do porto",
		block2: 		"Fim bloqueio do porto",
		block3: 		"Retorno da frota",
		blockico: 		"Bloquear porto",
		transport1: 	"Chegada ao destino",
		transport2: 	"Regressar ao porto",
		WhTitle: 		"Armazém",
		txtWh1: 		"Você deve melhorar ", 
		txtWh2: 		" níveis",
		loadport: 		"Carregamento termina em ",
		emptyWh: 		"Espaço no armazém",
		month: 			"Jan,Fev,Mar,Abr,Mai,Jun,Jul,Ago,Set,Out,Nov,Dez",
		abortmission: 	"Retirar frotas - ",
		predictfull: 	"Cheia",
		titletravel: 	"Duração ",
		predict: 		"Calcule o tempo para encher a cidade",
		headTime: 		"Selecione hora referência:",
		localTime: 		"Hora local",
		serverTime: 	"Hora servidor",
		formatTime:		"Time format",
		townhalltitle1:	" people to fill up the town",
        townhalltitle2:	" people in excess",
	},
	rs:
	{ // Српски превод by Duje F-H
		text_Upgrade: 	"Завршетак надоградње ",
		msg_Never: 		"Никад",
		msg_TimeLeft: 	"Пуно за: ",
		msg_Titile1: 	"Датум завршетка надоградње",
		msg_Titile2: 	"(Датум почетка) Датум почетка надоградње",
		totalprice: 	"Укупни могући добитак: ",
		resource: 		"НЕдостаје за следећи ниво: ",
		errortxt: 		"End_Time је генерисао грешку.\n\n",
		errortxt1: 		" \n\n Желиш ли да пријавиш аутору скрипте?",
		port: 			"Време пуњења – Ниво трговачке луке = ",
		port2: 			"Брзина пуњења: ",
		wait: 			"Лука је заузета пуњењем другог товара",
		hold: 			"Простор може бити напуњен другим ",
		hold2: 			" добрима",
		loadcargo: 		" Терет је пун",
		optiontxt: 		"Изабери језик",
		block1: 		"Почетак блокирања луке",
		block2: 		"Завршетак блокирања луке",
		block3: 		"Врати флоту",
		blockico: 		"Блокирај луку",
		transport1: 	"Долазак на одредиште",
		transport2: 	"Врати се у луку",
		WhTitle: 		"Складиште",
		txtWh1: 		"Требало би да саградиш још ",
		txtWh2: 		" нивоа",
		loadport: 		"Loading end at ",
		emptyWh: 		"Простор у складишту",
		month: 			"Јан,Феб,Мар,Апр,Мај,Јун,Јул,Авг,Септ,Окт,Нов,Дец",
		abortmission: 	"Опзови флоту - ",
		predictfull: 	"пуно",
		titletravel: 	"Трајање путовања",
		predict: 		"Време до попуњавања града",
		headTime: 		"Изабери времене:",
		localTime: 		"Локално време",
		serverTime: 	"Време сервера",
		formatTime: 	"Формат времена",
		townhalltitle1: " становништво ће попунити градове",
		townhalltitle2: " становништво у претеку",
	},
	ru:
	{ // Russian translation by GrAndAG **Partial
		text_Upgrade: 	"Окончание постройки ",
		msg_Never: 		"никогда",
		msg_TimeLeft: 	"Заполнится: ",
		msg_Titile1: 	"дата окончания постройки",
		msg_Titile2: 	"(дата начала) дата окончания постройки",
		totalprice: 	"Возможный доход: ",
		resource: 		"Не хватает до уровня ",
		errortxt: 		"End_Time вызвал ошибку.\n\n",
		errortxt1: 		" \n\n Хотите сообщить об ошибке автору?",
		port: 			"Время погрузки - Уровень порта = ",
		port2: 			"Скорость погрузки: ",
		wait: 			"Порт занят погрузкой других транспортов",
		hold: 			"Транспорт будет полон если погрузить ещё ",
		hold2: 			" товаров",
		loadcargo: 		" сухогрузов заполнено",
		optiontxt: 		"Выберите язык",
		block1:			"Начало блокады залива",
		block2:			"Окончание блокады залива",
		block3:			"Возвращение флота",
		blockico:		"Блокада залива",
		transport1:		"Прибытие в пункт назначения",
		transport2:		"Возвращение в ваш порт",
		WhTitle: 		"Склад",
		txtWh1: 		"Нужно улучшить ещё на ",
		txtWh2: 		" уровней",
		loadport: 		"Окончание погрузки в ",
		emptyWh: 		"Свободное место на складе",
		month:			"Янв,Фев,Мар,Апр,Май,Июн,Июл,Авг,Сен,Окт,Ноя,Дек",
		abortmission:	"Отзыв флота - ",
		predictfull: 	"полный",
		titletravel: 	"Продолжительность поездки",
		predict: 		"Подсчитывать время до заполнения города",
		headTime: 		"Отображать время относительно:",
		localTime: 		"Местного времени",
		serverTime: 	"Времени сервера",
		formatTime:		"Формат времени",
		townhalltitle1:	" people to fill up the town",
        townhalltitle2:	" people in excess",
	},
	se:
	{ // Svensk översätning av Theo Gonks II **Partial
		text_Upgrade: 	"Utbyggnad klar ",
		msg_Never: 		"Det dröjer",
		msg_TimeLeft: 	"Fullt: ",
		msg_Titile1: 	"utbyggnaden klar",
		msg_Titile2: 	"(utbyggnaden startar) utbyggnaden klar",
		totalprice: 	"Möjlig total inkomst: ", //change
		resource: 		"Saknas för nivå ",
		errortxt: 		"End_Time har genererat ett fel.\n\n",
		errortxt1: 		" \n\n Vill du påtala felet till konstruktören?",
		port: 			"Lasttid - Hamnens nivå = ",
		port2: 			"Lastningshastighet: ",
		wait: 			"Hamnen är upptagen med att lasta annat gods",
		hold: 			"Lastutrymmet blir fullt med ",
		hold2: 			" annat gods",
		loadcargo: 		" lastutrymme fullt",
		optiontxt: 		"Välj språk",
		block1: 		"Börjar blockera hamnen",
		block2: 		"Slutar blockera hamnen",
		block3: 		"Flottan återkommer",
		blockico: 		"Blockera hamn",
		transport1: 	"Ankomsttid",
		transport2: 	"Återvänd till din hamn",
		WhTitle: 		"Lagerlokal",
		txtWh1: 		"Du bör uppgradera ",
		txtWh2: 		" nivåer",
		loadport: 		"Lastningen klar ",
		emptyWh: 		"Plats i lagerlokalen",
		month: 			"Jan,Feb,Mar,Apr,Maj,Jun,Jul,Aug,Sept,Okt,Nov,Dec",
		abortmission: 	"Återkalla flottor - ",
		predictfull: 	"fullt",
		titletravel: 	"Restiden är",
		predict: 		"Beräknad tid att fylla staden",
		headTime: 		"Välj referenstid:",
		localTime: 		"Lokal tid",
		serverTime: 	"Servertid",
		formatTime: 	"Tidsformat",
		townhalltitle1:	" people to fill up the town",
        townhalltitle2:	" people in excess",
	}, 
	sk:
	{ // Slovak translate by TmsK
		text_Upgrade: 	"Koniec aktualizácie",
		msg_Never: 		"Nikdy",
		msg_TimeLeft: 	"Plné za: ",
		msg_Titile1: 	"Dátum ukončenia aktualizácie",
		msg_Titile2: 	"(Dátum začiatku) Dátum ukončenia aktualizácie",
		totalprice: 	"Možné celkové príjmy: ",
		resource: 		"Chýbajúce suroviny pre level ",
		errortxt: 		"End_Time hlási chybu.\n\n",
		errortxt1: 		" \n\n Chceš poslať správu o chybe autorovi?",
		port: 			"Loading time - Trading port level = ",
		port2: 			"Rýchlosť nakladnia: ",
		wait: 			"Práve sa nakladá iná loď",
		hold: 			"Držte sa bude plne s ostatnými",
		hold2: 			" Tovar",
		loadcargo: 		" Náklad je plný",
		optiontxt: 		"Vybrať jazyk",
		block1: 		"Začať blokovanie prístavu",
		block2: 		"Ukončiť blokovanie prístavu",
		block3: 		"Návrat flotily",
		blockico: 		"Blokovať prístav",
		transport1: 	"Príchod do miesta určenia",
		transport2: 	"Vrátiť sa do prístavu",
		WhTitle: 		"Sklad",
		txtWh1: 		"Mal by si dostaviať ",
		txtWh2: 		" levelov",
		loadport: 		"Nakladanie skončí za ",
		emptyWh: 		"Voľné miesto v sklade",
		month: 			"Január,Február,Marec,Apríl,Máj,Jún,Júl,August,September,Október,November,December",
		abortmission: 	"Zrušiť flotilu - ",
		predictfull: 	"plný",
		titletravel: 	"Doba trvania cesty",
		predict: 		"Vypočítavam čas naplnenia radnice",
		headTime: 		"Vybrať referenčný čas",
		localTime: 		"Lokálny čas",
		serverTime: 	"Čas serveru",
		formatTime: 	"Formát času",
		townhalltitle1: " ľudí do naplnenia radnice",
		townhalltitle2: " ľudia nad limit",
	},
	ua:
	{ // Ukrainian translate by alkanoid
		text_Upgrade:	"Закінчення будівництва ",
		msg_Never:		"ніколи",
		msg_TimeLeft:	"Заповниться: ",
		msg_Titile1:	"дата закінчення будівництва",
		msg_Titile2:	"(дата початку) дата закінчення будівництва",
		totalprice:		"Можливий дохід: ",
		resource: 		"Не вистачає до рівня ",
		errortxt: 		"End_Time викликав помилку.\n\n",
		errortxt1: 		" \n\n Хочете повідомити про помилку автору?",
		port: 			"Час навантаження - Рівень порту = ",
		port2: 			"Швидкість завантаження: ",
		wait: 			"Порт зайнятий навантаженням інших транспортів",
		hold: 			"Транспорт буде повний, якщо завантажити ще ",
		hold2: 			" товарів",
		loadcargo: 		" торгових суден заповнено",
		optiontxt: 		"Виберіть мову",
		block1:			"Початок блокади затоки",
		block2:			"Закінчення блокади затоки",
		block3:			"Повернення флоту",
		blockico:		"Блокада затоки",
		transport1:		"Прибуття в пункт призначення",
		transport2:		"Повернення в ваш порт",
		WhTitle: 		"Склад",
		txtWh1: 		"Потрібно покращити ще на ",
		txtWh2: 		" рівнів",
		loadport: 		"Закінчення завантаження в ",
		emptyWh: 		"Вільне місце на складі",
		month:			"Січ,Лют,Бер,Кві,Тра,Чер,Лип,Сер,Вер,Жов,Лис,Гру",
		abortmission:	"Відкликання флоту - ",
		predictfull:	"повний",
		titletravel:	"Тривалість поїздки",
		predict: 		"Підраховувати час до заповнення міста",
		headTime: 		"Відображати час відносно:",
		localTime: 		"Місцевого часу",
		serverTime:		"Часу сервера",
		formatTime:		"Формат часу",
		townhalltitle1:	" людей, щоб заповнити місто",
		townhalltitle2: " людей у надлишку",
	},
}
// Calculate loading times	   0	 		   5				   10				   15					  20					   25					    30						 35						   40
const loadingspeed = new Array(10,30,60,93,129,169,213,261,315,373,437,508,586,672,766,869,983,1108,1246,1398,1565,1748,1950,2172,2416,2685,2980,3305,3663,4056,4489,4965,5488,6064,6698,7394,8161,9004,9931,10951,12073);
var url=String(window.location).split('?')[0];
var uId = (url.split('//')[1]).split('.')[0] + (url.split('.')[2]).split('/')[0]

var lang = getLanguage();
var page = document.getElementsByTagName('body')[0].id;
var unit = {};
unit = timeunits();
var curdate = getDate();


window.addEventListener('load',  function() 
{ 
try
{	
	var scriptCnt = document.getElementsByTagName('script');
	for(var j=0 ; j< scriptCnt.length; j++)
	{
		if (scriptCnt[j].innerHTML.indexOf('getCountdown') >= 0)	// search script with countdown
		{
			var cntdw = scriptCnt[j].innerHTML.split('getCountdown');
			for (var jj = 1; jj < cntdw.length; jj++)
			{
				var name = cntdw[jj].split('"')[1];	// check ID of countdown
				var timediff = (parseInt(cntdw[jj].split("enddate: ")[1]) - parseInt(cntdw[jj].split("currentdate: ")[1]))*1000;	// time of countdow
				
				// countdown bulding
				if (name == 'cityCountdown') {cityCountdown(name,curdate + timediff)}
				else if (name == 'upgradeCountDown') {upgradeCountDown(name,curdate + timediff)}	// countdown building
				else if (name == 'cooldown') {coolDown(name,curdate + timediff)}	// countdown miracle
				
					
				// countdown transport
				else if (name == 'outgoingOwnCountDown' || name == 'outgoingAlienCountDown') {outgoingOwnCountDown(name,curdate + timediff)}	// loding time in the port
				else if (name.indexOf('eta') == 0) {etaMerchantNavy(name,curdate + timediff)}
				else if (name.indexOf('ret') == 0) {retMerchantNavy(name,curdate + timediff)}
					
				// countdown troops and fleets
				else if (name.indexOf('fleetRow') == 0) {fleetRowMilitaryMovements(name,curdate + timediff)}
				else if (name.indexOf('SpyCountDown') == 0) {spyCountDownHideOut(name,curdate + timediff)}
				else if (name.indexOf('buildCountDown') == 0) {buildCountDownBarracks(name,curdate + timediff)}
					
				//not countdown included
				//else{confirm(name +' | '+ timediff);}
			}
		}
	}
		
	// page Building
	if (document.getElementById('buildingUpgrade') != null && document.getElementById('upgradeCountDown') == null)	// if you view building and the building not upgraded
			{predictEndDateBuilding()}
		
	if (page == 'city')	{pageCity()}	// if you view town
	else if (page =='buildingGround') {pageBuildingGround()} 	// new building
	else if (page =='townHall') {pageTownHall()} 				// townHall
	else if (page =='researchAdvisor') {pageResearchAdvisor()} 	// researchAdvisor
		
	// page Transport
	else if (page =='merchantNavy') 	{pageMerchantNavy()}	// How hold are full and number of the cargo required the load
	else if (page =='branchOffice') 	{pageBranchOffice()}	// How much money you get from the market
	else if (page =='transport') 	{pageTransport()}		// How much time for load cargo
	else if (page =='takeOffer') 	{pageTakeOffer()}		// Buy Goods
	else if (page =='port') 			{pagePort()}			// abort loading cargo
		
	// page Troops and Fleets
	else if (page =='militaryAdvisorMilitaryMovements') {pageMilitaryAdvisorMilitaryMovements()}	// fleets movements
	else if (page =='blockade')		{pageBlockade()} 												// Block port
	else if (page =='deployment' || page =='plunder' || page =='occupy')	{pageDlyPlgOcy()}		// transport, pillage and occupy your troops or fleets
	else if (page =='barracks' || page =='shipyard' || page =='safehouse')	{pageBarracks()} 		// Building troops, fleets or spy
		
	// other page
	else if (page == 'options')
	{
		var newElement = document.createElement("form");
		newElement.setAttribute('id','optionEndTime');
		newElement.innerHTML = 
			"<div class='contentBox01h'>" +
				"<h3 class='header'>"+
					"<a href='http://userscripts.org/scripts/show/52268' target='_blank'>End_Time v "+ lversion +"</a>"+
					"<span style='font-size:10px;'>  by <a href='http://userscripts.org/users/95943' target='_blank'>Phate72</a></span>"+
				"</h3>"+
				"<div class='content'>" +
					"<table cellpadding='0' cellspacing='0'>"+
						"<tbody>"+
							"<tr>" +
								"<th id='ET_headtime'>"+ lang.headTime +"</th>" +
								"<td><input type='radio' id='radio0' name='CurrentDate'><span id='ET_localtime'>"+ lang.localTime +"</span></td>"+
								"<td><input type='radio' id='radio1' name='CurrentDate'><span id='ET_servertime'>"+ lang.serverTime +"</span></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='ET_headhour'>"+ lang.formatTime +"</th>" +
								"<td><input type='radio' id='ET_hour0' name='ET_typeHour'><span>24h</span></td>"+
								"<td><input type='radio' id='ET_hour1' name='ET_typeHour'><span>12h</span></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='End_Time_head_predict'>"+ lang.predict +"</th>" +
								"<td><input type='checkbox' id='End_Time_predict'></td>"+
							"</tr>" +
							"<tr>" +
								"<th>Debug</th>" +
								"<td><input type='checkbox' id='End_Time_debug'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='Endlanguage'>"+ lang.optiontxt +"</th>" +
								"<td><select id='End_selectLanguage'></select></td>"+
							"</tr>" +
						"</tbody>"+
					"</table>" +
				"</div>"+
                "<div class='footer'></div>" +
			"</div>";
			
		
		document.getElementById("mainview").insertBefore(newElement, document.getElementById("vacationMode"));
			
		// add language in Select element
		var savelang = GM_getValue('End_TimeLang');
		var selLang = document.getElementById('End_selectLanguage');
		for (var l=0; l < ltyp.length; l++)
		{
			 var selOpt = false;
			 if (ltyp[l] == savelang){selOpt = true;}
			 selLang.add(new Option(ltyp[l], ltyp[l],false,selOpt),  null)
		}
			
		// add event
		document.getElementById('radio0').addEventListener('click',function(){GM_setValue('ET_enblLocTime',0);},true);
		document.getElementById('radio1').addEventListener('click',function(){GM_setValue('ET_enblLocTime',1);},true);
		document.getElementById('ET_hour0').addEventListener('click',function(){GM_setValue('ET_typeHour',0);},true);
		document.getElementById('ET_hour1').addEventListener('click',function(){GM_setValue('ET_typeHour',1);},true);
		document.getElementById('End_Time_predict').addEventListener('change',function(){GM_setValue('ET_predict', document.getElementById('End_Time_predict').checked);},true);
		document.getElementById('End_Time_debug').addEventListener('change',function(){GM_setValue('ET_debug', document.getElementById('End_Time_debug').checked);},true);
		document.getElementById('End_selectLanguage').addEventListener('change',function(){changeLanguage(this.value);},true);
		
		
		// controll state of chekbox
		setChekbox('ET_debug','End_Time_debug');
		setChekbox('ET_predict','End_Time_predict');
		// controll state of radio
		savevalue = GM_getValue('ET_enblLocTime',0);
		document.getElementsByName('CurrentDate')[savevalue].checked = true;
		savevalue = GM_getValue('ET_typeHour',0);
		document.getElementsByName('ET_typeHour')[savevalue].checked = true;
	}
}
catch(er)
				{infoError("function main",er)}
},true);

function setChekbox(idsave,id)	// control state of the checkbox
{
		var savevalue = GM_getValue(idsave,true);
		if (savevalue == false) document.getElementById(id).checked = false;
		else document.getElementById(id).checked = true;
}

function infoError(name,er)	//with error open forum page
{ 
try
{
	var debug = GM_getValue('ET_debug',true);
	var lang = getLanguage();
	
	if (debug != true ) return; // exit if you don't want debug script
	
	if(confirm(lang.errortxt + name + " " +  er + lang.errortxt1))
	{
		window.open("http://userscripts.org/scripts/show/52268");
	}
}
catch(er1) 				
	{confirm(er1);}
}

function changeLanguage(newLang)
{ 
try
{	
	GM_setValue('End_TimeLang',newLang);
	lang = getLanguage();
		
	// change text to option page
	document.getElementById('End_Time_head_predict').textContent = lang.predict;
	document.getElementById('ET_headtime').textContent = lang.headTime;
	document.getElementById('ET_localtime').textContent = lang.localTime;
	document.getElementById('ET_servertime').textContent = lang.serverTime;
	document.getElementById('ET_headhour').textContent = lang.formatTime;
	document.getElementById('Endlanguage').textContent = lang.optiontxt;
}
catch(er)
				{infoError("function changeLanguage",er)}
}

function getLanguage()
{ 
try
{
	var langstyp = GM_getValue('End_TimeLang',navigator.language)	// check storage language
		
	if (typeof(langs[langstyp]) == 'undefined') 
	{
		alert("The Language is not supported");
		langstyp ='en';
	}
	GM_setValue('End_TimeLang',langstyp);
	return langs[langstyp];
}
catch(er)
				{infoError("function getLanguage",er)}
}

/** --------------------------*/  
/**   Miscellaneous library   */
/** --------------------------*/ 

function timeunits() // get time variable from the page
{ 
try
{
	if (unsafeWindow.LocalizationStrings == null){return}
	unt = new Array(6);
	unt['day'] =  unsafeWindow.LocalizationStrings['timeunits']['short']['day'];
	unt['hour'] = unsafeWindow.LocalizationStrings['timeunits']['short']['hour'];
	unt['min'] =  unsafeWindow.LocalizationStrings['timeunits']['short']['minute'];
	unt['sec'] =  unsafeWindow.LocalizationStrings['timeunits']['short']['second'];
	
	//unt['decimal'] =  unsafeWindow.LocalizationStrings['decimalPoint'];
	unt['separator'] =  unsafeWindow.LocalizationStrings['thousandSeperator'];

	return unt
}
catch(er) 				
	{infoError("function timeunits ",er)}
}

function getDate() // get current Date
{ 
	var rdate = new Date();
	var enableloctime = GM_getValue('ET_enblLocTime',0);
	if (enableloctime == 1)	
	{
		txtsrvtime = document.getElementById('servertime').textContent
		txtdate = (txtsrvtime.split(' ')[0]).split('.');
		txttime = (txtsrvtime.split(' ')[1]).split(':');
		// set server date
		rdate.setDate(parseInt(txtdate[0]));
		rdate.setMonth(parseInt(txtdate[1]));
		rdate.setFullYear(parseInt(txtdate[2]));
		rdate.setHours(parseInt(txttime[0]));
		rdate.setMinutes(parseInt(txttime[1]));
		rdate.setSeconds(parseInt(txttime[2])); 
	}
	return rdate.getTime();
}

function CountertoRealTime(string)	// convert string "2h 40m 23s" in time 'second'
{ 
try
{
	var tms = string.split(' ');
	var addtime=0;
	
	for (var j = 0 ; j < (tms.length) ; j++)
	{
		if (tms[j].indexOf(unit['day']) >= 0) {addtime += parseInt(tms[j])*60*60*24}	//Day
		if (tms[j].indexOf(unit['hour']) >= 0) addtime += parseInt(tms[j])*60*60;		//Hour
		if (tms[j].indexOf(unit['min']) >= 0) addtime += parseInt(tms[j])*60;			//Minutes
		if (tms[j].indexOf(unit['sec']) >= 0) addtime += parseInt(tms[j]);				//Second
	}
	return addtime;
}
catch(er) 				
	{infoError("function CountertoRealTime ",er)}
}

function RealTimetoCounter(rtime, trimtime)	// convert time 'second' in string "2h 40m 23s"
{ 
try
{
	// value of trimtime are 2,3,4
	
	// calculate Day Hour Minutes and second
	var day = parseInt(rtime/(24*60*60));
	rtime -= day *24*60*60;
	var hour = parseInt(rtime/(60*60));
	rtime -= hour *60*60;
	var min = parseInt(rtime/60);
	rtime -= min *60;
	var sec = parseInt(rtime);
	
	// create string time
	var t =0;
	var string ='';
	if (day > 0) 
	{
		string = day + unit['day'] + ' ';
		t++;
	}
	if (hour > 0) 
	{
		string += hour + unit['hour'] + ' ';
		t++;
	}
	if (min > 0 && trimtime > t) 
	{
		string += min + unit['min'] + ' ';
		t++;
	}
	if (sec > 0 && trimtime > t) {string += sec + unit['sec'] + ' ';}
	
	return string
}
catch(er) 				
	{infoError("function RealTimetoCounter ",er)}
}

function realTimetoDate(rdate,secOn)	// date of the end event
{ 
try
{
	var endtxt = "";		
	var today = new Date (curdate);	// Today
	var newDate = new Date (rdate)	// date of the end event
	
	if ( (newDate.getDate() != today.getDate()) || (newDate.getMonth() != today.getMonth()) )	// Add month
	{	
		endtxt = newDate.getDate() + "." + lang.month.split(',')[newDate.getMonth()] ;	// Add Day and Month
		if (newDate.getFullYear() != today.getFullYear()) endtxt += "." + newDate.getFullYear();	// Add Year
	}
	if (endtxt != ""){endtxt += " "}
	
	// type of hour 12h or 24h
	var typHour	= GM_getValue('ET_typeHour',0);	// 24h =0 and 12h =1
	var hour = newDate.getHours()
	if (typHour == 1 && hour>12)	{endtxt += (hour-12); ampm='pm';}	// Add Hour
	else							{endtxt += hour; ampm='am';}
		
	var min = newDate.getMinutes();
	if (min < 10) {min= "0" + min;}
	endtxt += ":" + min;	// Add Minites
		
	if (secOn == true)
	{
		var sec = newDate.getSeconds();
		if (sec < 10) {sec = "0" + sec;}
		endtxt += ":" + sec;	// Add Second
	}
	
	if (typHour == 1)	{endtxt += ampm;}	// Add PM or AM for 12h
	
	return endtxt
}
catch(er) 				
	{infoError("function realTimetoDate ",er)}
}

function insElement(mainNode,idNewE,typ,txt) // insert html elements
{ 
try
{	
	var newE = document.createElement(typ);
	newE.setAttribute('id',idNewE);
	newE.innerHTML = txt
	mainNode.appendChild(newE);
}
catch(er)
	{infoError("function insElement ",er)}
}

function cityIdSelect() // ID city by selector of the city
{return document.getElementById('citySelect').value;}

function cityIdPath() // ID city by path of the city view
{return parseInt(document.getElementById('breadcrumbs').innerHTML.split('city&amp;id=')[1])}

function saveBuildingLvl(name,idcity) // save building level
{ 
try
{		
	var positions = document.getElementById('locations');
	if (positions == null) return; // exit if page is type message error
		
	lvl = new Array();
		
	for (var i = 0; i < positions.childNodes.length; i++)	// search building in the city
	{
		
		if (positions.childNodes[i].className == name) 
		{
			var txt = positions.childNodes[i].getElementsByTagName('a')[0].title.split(" ");
			lvl.push(parseInt(txt[txt.length-1]));
		}
	}
		
	// sort level
	if (lvl.length>1)
	{
		var mj = 0;
		for (var j=0 ; j < lvl.length-1 ; j++)
		{
			for (jj=mj ; jj< lvl.length ; jj++)
			{
				if (lvl[jj] > lvl[mj])
				{
					tmp = lvl[mj];
					lvl[mj] = lvl[jj];
					lvl[jj] = tmp;
				}
			}
			mj++;
		}
	}
		
	GM_setValue('ET_'+ name +'_lvl_'+ idcity + '_' + uId,uneval(lvl));	// save building level
}
catch(er)
				{infoError("function saveBuildingLvl ",er)}
}

/**   CONVERSION NUMBER   */
function toInt(string)	// Parses a string of format 123,456 to an int in format 123456
{
	if (unit['separator'] == '.')	{num = parseInt(string.replace(/\./g,""));}
	else						{num = parseInt(string.replace(/\,/g,""));}
	return num;
}

function replaceNum(num) // Parses an int of format 123456 to an string in format 123,456 
{
	var string = String(num);
	var temp = "";
	var lentxt = string.length - ((String(Math.abs(num))).length) ; // different length between String and number 
	
	for ( j=string.length ; j > lentxt; j = j-3)
	{
		if (j-3 <= lentxt ) {temp = string.substring(0 , j) + temp}
		else				{temp = unit['separator'] + string.substr(j-3, 3) + temp}
	}
	return temp;
}

/** FUNCTION for LOADING TIME of the PORT
	Store loading time
	
	'ET_waitPort_'+uId
		{
			{cityLoad: 45380, dateLoad: 12345678, cityDest: 97342, dateDest: 12578954, nCargo: 30, typ: 'g'},
			{cityLoad: 67321, dateLoad: 12348756, cityDest: 54087, dateDest: 56324620, nCargo: 20, typ: 't'}
		}
*/

Array.prototype.sortDate = function ()	//from smallest to largest
	{
		 if (this.length < 2) {return;}
		
		var less = 1;
		for (j=0 ; j < this.length-1 ; j++)
		{
			for (jj=less ; jj< this.length ; jj++)
			{
				if (this[j].dateLoad > this[jj].dateLoad)
				{
					tmp = this[jj];
					this[jj] = this[j];
					this[j] = tmp
				}
			}
			less++;
		}
	}

var idFilter;	// Indice dei dati array filtrati

Array.prototype.filter = function (idFlt,valueFlt)
	{
		if (this.length <= 0) {return;}
			
		tmp = [];
		idFilter = [];	// List Index main Array
		var idx=0;		// index idFilter
		for (j= 0 ; j < this.length; j++)	
		{
			if (this[j][idFlt] == valueFlt)
			{
				tmp.push(this[j]);
				idFilter[idx] = j;
				idx++
			}
		}
		return tmp;
	}

function lastLoadingTime(idcity) // read loading time
{ 
try
{		
	var wait = READLoadingTime(false);	// read date		
	for (var j = wait.length-1; j>=0; j--)	
		{if (wait[j].cityLoad == idcity) {return wait[j].dateLoad;}}

	return 0;
}
catch(er)
	{infoError("function lastLoadingTime ",er)}
}

function READLoadingTime(ctrldate) // read loading time
{ 
try
{
	var tmp = GM_getValue('ET_waitPort_'+uId)
	if (tmp == void(0)) {tmp = "[]";}
	var wait = eval(tmp); // read date	
	if (ctrldate == true)	// delete old date of loading
	{
		for (var j = 0; j < wait.length; j++)		// Control valid date time
		{			
			if (wait[0].dateLoad > curdate)	{break;}	// exit if loading time is valid
			wait.shift();	// delete
			j--;
		}
		GM_setValue('ET_waitPort_'+uId, uneval(wait) );	//save
	}
	return wait;
}
catch(er)
	{infoError("function READLoadingTime ",er)}
}

function SAVELoadingTime(idcity,cargo,typ) // save loading time
{ 
try
{
	curdate = getDate()
	var loadingtime = document.getElementById('loadTime').getAttribute('value');	//loading time
		
	if (loadingtime > 0)	// continue for valid loading time
	{
		curdate = getDate()
		var iddest = document.getElementsByName('destinationCityId')[0].value
		//var cargo = document.getElementById(idcargo).value;
		
			
		// Calculate loading date
		var load = {};	// save date and type of mission
		var actdate = lastLoadingTime(idcity);
		if(actdate < curdate){actdate = curdate};
		var loadingdate = actdate + loadingtime * 1000;
			
		// Calculate travel date
		var traveltime = document.getElementById('journeyTime').getAttribute('value');	//travel time
			
		load = {cityLoad: idcity, dateLoad: loadingdate, cityDest: iddest, dateDest: (loadingdate + traveltime * 1000), nCargo: cargo, typ: typ}
			
		var wait = READLoadingTime(true);	// read date
		wait.push(load);			// add new date of loading cargo
		wait.sortDate;
			
		GM_setValue('ET_waitPort_'+uId, uneval(wait) );
	}
	
	
}
catch(er)
	{infoError("function SAVELoadingTime ",er)}
}

function abortLoadingTime(id,indexdate) // delete loading mission
{ 
try
{
	curdate = getDate()
	wait = READLoadingTime(false);						// search other loading cargo in the port
	var datedif = wait[indexdate].dateLoad - curdate;	// difference in time to the date cleared
		
	// search date in storege loading time
	for(var j= 0; j < wait.length; j++)
	{
		if (id == wait[j].cityLoad)
		{	
			if (indexdate > j){datedif = wait[indexdate].dateLoad - wait[j].dateLoad;}	// search other loading cargo before deleting mission
			if (indexdate < j){wait[j].dateLoad = wait[j].dateLoad - datedif;}			// recalculate freight loading times
			
		}
	}
	wait.splice(indexdate,1);			// delete mission
	GM_setValue('ET_waitPort_'+ uId, uneval(wait) );
}
catch(er) 				
	{infoError("function abortLoadingTime ",er)}
}

/** FUNCTION for CALCULATE TIME TAVEL */

function addTravelNode(hidetime)	// Add node for tavel information
{ 
	if (document.getElementById('journeyTime') == null) {return;}	// exit for error page
	
	// hide journeyTime Node	
	if (hidetime == false) {GM_addStyle('#ET_Time {position:relative; left:180px;}');}
	else {GM_addStyle('#journeyTime {display:none;}');}
		
	var journey = document.getElementById('journeyTime').innerHTML.split(': </span>');	
	var timejourney= journey[journey.length-1];
	if (timejourney == undefined ){timejourney = '-'}
	
	// Add new node
	var travelnode = document.createElement("div");
	travelnode.setAttribute('id','ET_Time');
	travelnode.setAttribute('class','journeyTime');
	if (hidetime == false) 	{document.getElementById('missionSummary').insertBefore(travelnode,document.getElementById('journeyTime').parentNode.parentNode);}
	else 				{document.getElementById('journeyTime').parentNode.insertBefore(travelnode,document.getElementById('journeyTime'));}
	
	// html node ET_Time
	document.getElementById('ET_Time').innerHTML = 	"<span  id='waitTime' class='ET_cntdw' title='"+ lang.wait +"'></span><span  id='loadTime'>"+
														"</span><span  id='trvlTime' title='"+ lang.titletravel +"'>" + timejourney + "</span> = "+
														"<strong><span  id='totalTime'>" + timejourney + "</span></strong>"+
														"<span  id='endDate'></span>"+
														"<span  id='returnDate'></span>";
}

function calculateTravel(lvlport,total_res,ctrlreturn,bLoad)	// Calculate travel of mission
{ 
try
{
	if (total_res < 1) {return;}	// no load in hold
	
	curdate = getDate();
	var idcity = cityIdSelect()	;// Get id of source city
		
	var waitdate = document.getElementById('waitTime').getAttribute('value');
	if (waitdate == null){waitdate = 0;}
	
	// journey time
	var journey = document.getElementById('journeyTime').textContent;
	if (journey.indexOf(': ')>0){journey = journey.split(': ')[1];}
	document.getElementById('trvlTime').textContent= journey;
		
	var waittime = 0;
	var loadingtime = 0;
	var loadtxt = "";
	
	if (bLoad == false)	// not calculate loadtime and waittime if transport is over land
	{
		// Calculate wait time if port is occupated in other loading
		if (waitdate > curdate)	{waittime = (waitdate - curdate)/1000;}
			
		lvlport = parseInt(lvlport);
		if (lvlport < 0 || isNaN(lvlport)) {lvlport = 0;}	// min level of trading port is 0 for calculate time
		if (lvlport > 40) {lvlport = 40;}					// max level of trading port is 40 for calculate time
		loadingtime = parseInt((total_res *1 / loadingspeed[lvlport])*60);	// time unit second
		var loadtxt = RealTimetoCounter(loadingtime,2);	
	}
		
	if (loadtxt != "")	// if load cargo minor of 1 second
	{
		document.getElementById('loadTime').textContent = loadtxt + " + ";
		document.getElementById('loadTime').setAttribute('title',lang.port + lvlport +' / '+ lang.port2 + loadingspeed[lvlport]);
		document.getElementById('loadTime').setAttribute('value',loadingtime);
	}
	else	
	{
		document.getElementById('loadTime').textContent = "";
		document.getElementById('loadTime').setAttribute('value',0);
	}
		
	// Calculate total time
	var traveltime = CountertoRealTime(journey);
	document.getElementById('journeyTime').setAttribute('value',traveltime);
	var totaltime = waittime + loadingtime + traveltime;
	var totaltxt = RealTimetoCounter(totaltime,2);
	document.getElementById('totalTime').textContent= totaltxt;
		
	// Calculate end trasport date
	var enddate = realTimetoDate(curdate + totaltime*1000,false);	
	document.getElementById('endDate').innerHTML = " <img src='skin/icons/stage_gotoforeign.gif' height='10' width='10' /><span> "+ enddate +" </span>";
	document.getElementById('endDate').setAttribute('title',lang.transport1);

	// if town isn't yours calculate return time
	if (ctrlreturn == true)
	{	
		GM_addStyle('#returnDate span span {display:none; padding:0px 5px; margin-left:1px; font-size:11px;}');
		GM_addStyle('#returnDate:hover span span{display:inline; position:absolute; z-index:299; background:#fafdcc; color:#000000; border:1px solid #000000;}');
			
		var returndate = realTimetoDate( curdate + (totaltime + traveltime)*1000,false);
		var tooltiptxt = '<div>'+ lang.transport2 +'</div>';
			
		if(page == 'plunder') // calculate round time
		{
			var tooltiptxt = '<div>'+ lang.transport2 +'</div>';
			for(var j=0; j<=6;j++)
			{
				var rddate = realTimetoDate( curdate + (totaltime + traveltime)*1000 + j*20*60*1000 ,false);
				tooltiptxt += '<div>'+ j +"rd "+ rddate +'</div>';
			}
		}
		
		document.getElementById('endDate').setAttribute('title',lang.transport1);
		document.getElementById('returnDate').innerHTML = "<img src='skin/icons/stage_returning.gif' height='10' width='10'><span> "+ returndate +"<span> "+ tooltiptxt +"</span></span>";
	}
}
catch(er) 				
	{infoError("function calculateTravel ",er)}
}

/** COUNTDOWN */
// Variables countdown of string type '2h 23m 12s'
var ET_t_cnt;

function ET_Counter(typNode,pretxt,posttxt,nvrtxt)	// Countdown of string type '2h 23m 12s'
{
	var node = document.getElementById('mainview').getElementsByTagName(typNode);
	curdate = getDate();
		
	for (var j=0; j< node.length; j++)
	{
		if(node[j].getAttribute('class')=='ET_cntdw')
		{
			dateend = node[j].getAttribute('value')
			if (dateend !=null && dateend > curdate)
			{
				var time = RealTimetoCounter((dateend-curdate)/1000,2)
				node[j].textContent = pretxt + time + posttxt;
			}
			else if(dateend <= curdate)
			{
				node[j].textContent = nvrtxt;
			}
		}
	}
}
