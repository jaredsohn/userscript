// ==UserScript==
// @name 	Ikariam End Time (φασουλάδα)
// @version	001
// @author 	Φασουλάδα development team :)
// @description A script for Ikariam that puts the end time in the countdown. 
// @include     http://m*.ikariam.*/*
// @exclude     http://board.ikariam.*/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require			http://www.betawarriors.com/bin/gm/57756user.js
//
// @history        1.03	Estimated date of arrival of spies.
// @history        1.03	BugFix: With the new version does not calculate date of arrival of the fleet.
// @history        1.03	BugFix: With the new version does not calculate the load time troops.
// @history        1.03	BugFix: Incorrectly calculating the end date research.
// @history        1.02	Trading post: in the table added travel time for each offer.
// @history        1.02	I fixed the calculation of the missions with the new graphics
// @history        1.02	calculating the time to Democracy.
// @history        1.02	calculating the time to buy the next cargo.
// @history        1.02	BugFix: error in reaserch advisor for 0 point in hour.
// @history        1.01	BugFix: round of pillage.
// @history        1.01	BugFix: during loading of the hold, I don't report the arrival time.
// @history        1.01	BugFix: correct code for calculating arrival only in the first row.
// @history        1.00 Czech translation. Mar10 thanks for your help.
// @history        1.00 Removed calculation of the percentage of filling the hold.
// @history        1.00	I changed the calculation time research, for version 0.4.2.4
// @history        1.00	Added the new class 'arrival' for all calculations of time of arrival.
// @history        1.00	I modifiy function getDate().
// @history        1.00	options changed the reference time server time.
// @history        0.98	I changed the position of script options , there are now into 'Game Options'.
// @history        0.98	Update Slovenian and Lithuanian Translation.
// @history        0.98	Adaptations for Ikariam 0.4.2.
// @history        0.97	Update Hebrew, Polish, Spanish, Greek and Turkish Translation.
// @history        0.97	BugFix: modify code for error when player have more 1kk of resource in warehouse.
// @history        0.97	BugFix: modify code for error tomorrow.
// @history        0.97	BugFix: modify code for error 'ET_opt undefined'.
// @history        0.96	BugFix: modify code for error 'string undefined'.
// @history        0.96	BugFix: wrong loading time in the port.
// @history        0.96	Changed saving options of the script.
// @history        0.96	Changed the code to speed up the script.
// @history        0.96	Updated script to version 0.4.1.
// @history        0.96	Added 'Buy 100% increase capacity' in the calculation level warehouses for the building upgrade.
// @history        0.96	In the Options page you can select two methods of calculation the level warehouses: 'Max' if you want to use most spaces of the city. 'Min' if you want to minimize the space used in the city.
// @history        0.95	BugFix: miscalculation of the value given for 'tomorrow'.
// @history        0.95	BugFix: error unsafeWindow.LocalizationStrings.
// @history        0.95	BugFix: error on saving levels of the port, warehouses and dumps.
// @history        0.95	Changed code on the difference between public satisfaction and capacity cities.
// @history        0.94	Modify calculation of the date. Add and change some text.
// @history        0.94	Proper calculation of the warehouses to version 0.4.0 of Ikariam. Added Dump.
// @history        0.94	Rewrote some code with jquery.
// @history        0.94	Estimated time of return of the fleet if you abort the mission.
// @history        0.94	BugFix: Ikariam plus, error in tail development.
// @history        0.94	BugFix: approximation for the excess was removed by the update.
// @history        0.94	BugFix: save port level returned an error.
// @history        0.94	BugFix: error in the academy for missing node experiment.
// @history        0.93	BugFix: wrong date money order.
// @history        0.93	BugFix: Error returned when you wanted to process build a new building.
// @history        0.93	BugFix: In the city did not save the date for the building upgrades.
// @history        0.93	Added date to make new experiment.
// @history        0.93	Improved upgrade code countdown date.
// @history        0.93	Page options I added a reset button to reset the loading time port.
// @history        0.93	Added Romanian translation.
// @history        0.92	Added the date of exhaustion finances when the sum is negative. Thank you for the idea Lauferon.
// @history        0.92	Added calculation of the end date for construction of the next level when a level is under construction (ikariam v0.35).
// @history        0.92	When the upgrade time is expressed in days and hours, you can't know the exact end date, in this case the end date is added 1 hour.
// @history        0.92	Improved viewing levels in the warehouses to be built to upgrade the building.
// @history        0.92	Improved display of start and end date of the buildings, changed some texts.
// @history        0.92	Added Lithuanian translation.
// @history        0.91	Modify code for delete loading cargo.
// @history        0.91	Modify id to save a loading cargo.
// @history        0.91	Page port added countdown in cargo awaiting loading.
// @history        0.91	Added updated date of arrival and departure in calculating the travel.
// @history        0.91	Added updated date in upgrade building.
// @history        0.91 BugFix: german traslation.
// @history		   0.91	Now appear in all missions the dates of each step.
// @history		   0.91	Small graphic improvements.
// @history		   0.91	Add some text. Deleted other old texts.
// @history        0.91	Added Turkish and Bosnian/Croatian translation.
// @history        0.91 BugFix: wrong time calculating in Serbian language. Hour and second have the same letter.

// ==/UserScript==

// FARE CODICE PER INVIO SPIE E VERIFICARE VECCHI CODICI NASCONDIGLIO

const lversion = '1.03';
ScriptUpdater.check(52268, lversion);
// languages
const ltyp = ['ar','ba','cz','de','dk','en','es','fr','gr','hu','il','it','lt','lv','nl','pl','pt','ro','rs','ru','se','si','sk','tr','ua']
const langs = 
{ 	//LANGUAGES
	ar:
	{ // Arabic translate by Samerramez
		text_Upgrade: 	"انتهاء التطوير ",
		msg_Never: 		"ابداً",
		msg_TimeLeft: 	"يمتلئ: ",
		upBuild: 		["تاريخ بدء التمديد","تاريخ انتهاء التطوير",,"end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:      ["بدء محاصرة المرفأ","محاصرة المرفأ","نهاية المحاصرة"],
		txtDfsPrt: 		["بداية الدفاع عن المرفأ","الدفاع عن المرفأ","انتهاء الدفاع عن المرفأ"],
		txtDfsTwn:      ["بداية الدفاع عن المدينة","الدفاع عن المدينة","نهاية الدفاع عن المدينة"],  
		txtBltTwn:      ["بداية المعركة","معركة المدينة","أحتلال"],  
		txtopyTwn:      "أحتلال المدينة",
		transport1: 	"وجهة الوصول",
		transport2: 	"العودة الى المرفأ",
		WhTitle: 		"منزل التخزين",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"انتهاء التحميل ",
		emptyWh: 		"الفارغ في منزل التتخزين",
		month: 			["1","2","3","4","5","6","7","8","9","10","11","12"],
		tomorrow:		"tomorrow",
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
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	ba:
	{ // Bosnian/Croatian translation - latin by Bianced
		text_Upgrade: 	"Kraj nadogradnje ",
		msg_Never: 		"Nikad",
		msg_TimeLeft: 	"Napunjeno za: ",
		upBuild: 		["Datum početka nadogradnje","Datum završetka nadogradnje","end date approximate excess"],
		totalprice: 	"Ukupni mogući dobitak: ",
		resource: 		"Resursi koji nedostaju za sljedeći nivo: ",
		errortxt: 		"End_Time prijavio grešku.\n\n",
		errortxt1: 		" \n\n Da li želiš prijaviti grešku autoru skripte?",
		port: 			"Vrijeme punjenja – Nivo trgovačke luke = ",
		port2: 			"Brzina punjenja: ",
		wait: 			"Luka je zauzeta punjenjem drugog utovara",
		hold: 			"Prostor može biti napunjen drugim ",
		hold2: 			" resursima",
		loadcargo: 		" Teret je pun",
		optiontxt: 		"Izaberi jezik",
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1: 	"Vrijeme dolaska",
		transport2: 	"Vrati se u luku",
		WhTitle: 		"Skladište",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Utovar završava u ",
		emptyWh: 		"Prostor u skladištu",
		month: 			["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
		tomorrow:		"tomorrow",
		abortmission: 	"Opozovi flotu - ",
		predictfull: 	"Puno",
		titletravel: 	"Trajanje putovanja",
		predict: 		"Vrijeme do potpuno naseljenog grada",
		headTime: 		"Izaberi vrijeme:",
		localTime: 		"Lokalno vrijeme",
		serverTime: 	"Vrijeme servera",
		formatTime: 	"Format vremena",
		townhalltitle1: " Stanovništvo će naseliti gradove",
		townhalltitle2: " Stanovništvo",
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	cz:
	{ // Czech translate by Mar10  
		text_Upgrade:   "Konec rozšiřování",  
		msg_Never:      "nikdy",  
		msg_TimeLeft:   "Plno za: ",  
		upBuild:        ["doba začátku rozšiřování","doba konce rozšiřování","doba předpokládaného přebytku"],  
		totalprice:     "Celkový možný příjem: ",  
		resource:       "Chybějící pro úroveň ",  
		errortxt:       "End_Time vygeneroval chybu.\n\n",  
		errortxt1:      " \n\n Chcete upozornit autora na chybu?",  
		port:           "Čas nakládání - úroveň Přístavu = ",  
		port2:          "Rychlost nakládání: ",  
		wait:           "Přístav je zaměstnán nakládání jiného zboží",  
		hold:           "Zásilka bude plná s dalšími ",  
		hold2:          " surovinami",  
		loadcargo:      " zásilka je plná",  
		optiontxt:      "Zvol jazyk",  
		optRstLoad:     "Resetovat nakládací časy",  
		txtBlkPrt:      ["Začátek blokády přístavu","Blokovat přístav","Konec blokády přístavu"],  
		txtDfsPrt:      ["Začátek obrany přístavu","Bránit přístav","Konec bránění přístavu"],  
		txtDfsTwn:      ["Začátek obrany města","Bránit město","Konec obrany města"],  
		txtBltTwn:      ["Začátek bitvy o město","Bitva o město","Rabování"],  
		txtopyTwn:      "Okupovat město",  
		transport1:     "Čas příjezdu do destinace",  
		transport2:     "Návrat do přístavu",  
		WhTitle:        "Skladiště",  
		noWh:           "Nedostatečná kapacita skladišť na další úroveň.",  
		loadport:       "Konec nakládání za ",  
		emptyWh:        "Místo ve skladišti",  
		month:          ["Led","Ún","Bře","Dub","Kvě","Čer","Čec","Srp","Září","Říj","List","Pro"],  
		tomorrow:       "zítra",  
		abortmission:   "Stáhnout flotilu - ",  
		predictfull:    "Plno",  
		titletravel:    "Doba plavby",  
		predict:        "Spočítat čas potřebný k zaplnění města",  
		headTime:       "Zvolte doporučený čas:",  
		localTime:      "Místní čas",  
		serverTime:     "Serverový čas",  
		formatTime:     "Formát času",  
		townhalltitle1: " lidí k zaplnění města",  
		townhalltitle2: " lidí v přebytku",  
		buyCap:         [" Koupit ","Přebytek zboží na konci ","100% zvýšena kapacita"],  
		headWh:         "Kolik stavebních ploch použít pro skladiště",  
		moreWh:         "max",  
		fewWh:          "min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},		
	de:
	{ // German translate by Aristeidis - fixed by TorfDrottel
		text_Upgrade: 	"Ausbau abgeschlossen ",
		msg_Never: 		"nie",
		msg_TimeLeft: 	"Voll in: ",
		upBuild: 		["Zeitpunkt des Baubeginns","Zeitpunkt der Fertigstellung",,"end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Begin Hafenblockade","Hafenblockade","Ende Hafenblockade"],
		txtDfsPrt:		["Beginn Hafenverteidigung","Hafenblockade","Ende Hafenblockade"],
		txtDfsTwn:		["Start Stadt verteidigen","Stadt verteidigen","Ende Stadt verteidigen"],
		txtBltTwn:		["Start Stadtplünderung","Stadt plündern","Ende Stadtplünderung"],
		txtopyTwn:		"Start Stadt besetzen",
		transport1:		"Ankunft am Ziel",
		transport2:		"Rückkehr zum Heimathafen",
		WhTitle: 		"Lagerhaus",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Verladen fertig um ",
		emptyWh: 		"freie Kapazität im Lagerhaus",
		month:			["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
		tomorrow:		"morgen",
		abortmission:	"Flotte zurückziehen - ",
		predictfull: 	"voll",
		titletravel: 	"Dauer des Transports",
		predict: 		"Berechne die Zeit bis die Bevölkerungsgrenze erreicht ist",
		headTime: 		"Wähle die die Bezugszeit:",
		localTime: 		"Lokale Zeit",
		serverTime: 	"Server Zeit",
		formatTime:		"Zeitformat",
		townhalltitle1:	 " Einwohner, um die Stadt zu füllen",
		townhalltitle2:	 " überschüssige Einwohner",
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	dk:
	{ // Danish translate by lovebug & fix by MicCo
		text_Upgrade: 	"Opgradering afsluttet",
		msg_Never: 		"aldrig",
		msg_TimeLeft: 	"Fuld om: ",
		upBuild: 		["dato for starten af opgradering","dato for afslutningen af opgradering","slutdato for omtrentlige afslutning"],
		totalprice: 	"Mulig samlede indkomst:",
		ressource: 		"Manglende for dette niveau",
		errortxt: 		"End_Time har genereret en fejl.\n\n",
		errortxt1: 		"\n\n Ønsker Du at informere om fejlen til forfatteren?",
		port: 			"Lastnings tid - Handels Havn niveau =",
		port2: 			"Laste hastighed: ",
		vent: 			"Havnen er sat til at laste andet gods",
		hold: 			"Lasten vil være fuld sammen med andre",
		hold2: 			"varer",
		loadcargo: 		"lasten er fuld",
		optiontxt: 		"Vælg sprog",
		optRstLoad:		"Reset loading time",
		txtBlkPrt: 		["Start blokker havn","Blokker havn","Slut blokkering"],
		txtDfsPrt: 		["Start forsvare havn","Forsvar havn","Slut forsvare havn"],
		txtDfsTwn: 		["Start forsvare byen","Forsvar by","Slut forsvare byen"],
		txtBltTwn: 		["Start kamp i by","Kamp i by","Plyndring"],
		txtopyTwn: 		"Besæt byen",
		transport1: 	"Destination ankomst",
		transport2: 	"Tilbage til din havn",
		WhTitle: 		"Lagerbygning",
		noWh: 			"Byen har ikke nok plads til at bygge de nødvendige lagerbygninger.",
		loadport: 		"Lastning ender",
		emptyWh: 		"Plads i lageret",
		month: 			["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sept","Okt","Nov","Dec"],
		tomorrow:		"tomorrow",
		abortmission: 	"Tilbagetrække flåder - ",
		predictfull: 	"fulde",
		titletravel: 	"Varighed af rejsen",
		forudsige: 		"Beregn tid for at fylde byen",
		headTime: 		"Vælg reference tid:",
		localtime: 		"Lokal tid",
		serverTime: 	"Server tid",
		formatTime: 	"Tids format",
		townhalltitle1: "folk til at fylde byen",
		townhalltitle2: "mennesker i overskydende",
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	en:
	{ // English translate by Paul93 & myself
		text_Upgrade: 	"End of the upgrading ",
		msg_Never: 		"never",
		msg_TimeLeft: 	"Full in: ",
		upBuild: 		["date of the beginning of the upgrading","date of the end of the upgrading","end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1:		"Destination arrival",
		transport2:		"Return to your port",
		WhTitle: 		"Warehouse",
		noWh:			"Insufficient capacity of the warehouses for the next level.",
		loadport: 		"Loading end at ",
		emptyWh: 		"Space in the warehouse",
		month:			["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
		tomorrow:		"tomorrow",
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
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min Capacity","Max Triton","Min travel"]
	},
	es:
	{ // Spanish translate by Rohcodom & update by Crom
		text_Upgrade:	"Fin de la ampliación ",
		msg_Never: 		"nunca",
		msg_TimeLeft: 	"Lleno en: ",
		upBuild:        ["horario inicial de la ampliación","horario final de la ampliación","margen de finalización"],
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
		optRstLoad:     "Reiniciar tiempo de carga",
		txtBlkPrt:      ["Inicio del bloqueo de puerto","Bloqueo de puerto","Fin del bloqueo de puerto"],
		txtDfsPrt:      ["Inicia defensa del puerto","Defensa del puerto","Finaliza defensa del puerto"],
		txtDfsTwn:      ["Inicia defensa de ciudad","Defensa de ciudad","Finaliza defensa de ciudad"],
		txtBltTwn:      ["Inicia batalla en la ciudad","Batalla en ciudad","Saqueo"],
		txtopyTwn:      "Ocupación de ciudad",
		transport1:		"Llegada al destino",
		transport2:		"Regreso a tu puerto",
		WhTitle: 		"Depósito",
		noWh:           "La ciudad no tiene espacio libre para construir los depósitos necesarios.",
		loadport:		"Fin de la carga en ",
		emptyWh:		"Espacio en el depósito",
		month:			["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
		tomorrow:		"mañana",
		abortmission:   "Retirar flotas - ",
		predictfull:	"lleno",
		titletravel:	"Duración del viaje",
		predict: 		"Calcular el tiempo en el que estará lleno el pueblo",
		headTime: 		"Seleccionar el horario de referencia:",
		localTime: 		"Hora local",
		serverTime:		"Hora del servidor",
		formatTime:		"Formato de hora",
		townhalltitle1:	" habitantes para llenar el pueblo",
		townhalltitle2:	" exceso de habitantes",
		buyCap: 		[" Comprar ","Exceder bienes al final de ","100% capacidad aumentada"],
		headWh: 		"Espacios usados para los depósitos",
		moreWh: 		"máx.",
		fewWh: 			"mín.",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	fr:
	{ // French translate by Shrek
		text_Upgrade: 	"Fin de l'amélioration ",
		msg_Never: 		"Jamais",
		msg_TimeLeft: 	"Complet dans : ",
		upBuild: 		["Date de début de l'amélioration","Date de la fin de l'amélioration","end date approximate excess"],
		totalprice: 	"Revenu total possible: ",
		resource: 		"Manquant pour le niveau ",
		errortxt: 		"End_Time a généré une erreur.\n\n",
		errortxt1: 		" \n\n Voulez-vous signaler cette erreur à l'auteur?",
		port: 			"Temps de chargement - Port commercial niveau = ",
		port2: 			"Vitesse de chargement: ",
		wait: 			"Le port est en train de charger d'autres cargos",
		hold: 			"La cale sera complète avec ",
		hold2: 			" autres marchandises",
		loadcargo: 		" cargos sont pleins",
		optiontxt: 		"Sélection de la langue",
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1: 	"Destination d'arrivée",
		transport2: 	"Retour à votre port",
		WhTitle: 		"Entrepôt",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Fin de chargement à ",
		emptyWh: 		"Place dans l'entrepôt",
		month: 			["Jan","Fev","Mars","Avr","Mai","Juin","Juil","Août","Sept","Oct","Nov","Dec"],
		tomorrow:		"tomorrow",
		abortmission: 	"Retrait des flottes - ",
		predictfull: 	"complet",
		titletravel: 	"Durée du voyage",
		predict: 		"Calcul du temps de remplissage de la ville",
		headTime: 		"Sélection de l'heure de référence :",
		localTime: 		"Heure locale",
		serverTime: 	"Heure du serveur",
		formatTime: 	"Format de l'heure",
		townhalltitle1: " personnes pour compléter la ville",
		townhalltitle2: " personnes en trop",
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	}, 
	gr:
	{ // Greek traslate by Napoleon I & update by rosso_
		text_Upgrade: "Ολοκλήρωση αναβάθμισης ",
		msg_Never: "ποτέ",
		msg_TimeLeft: "Πλήρες σε: ",
		upBuild: ["ημερομηνία έναρξης αναβάθμισης","ημερομηνία λήξης αναβάθμισης","ημερομηνία λήξης με υπερβολική προσέγγιση"],
		totalprice: "Πιθανά συνολικά έσοδα: ",
		resource: "Υπολείπονται για το επίπεδο ",
		errortxt: "Το End_Time έχει πραγματοποιήσει ένα σφάλμα. \n\n",
		errortxt1: " \n\n Θέλεις να αναφέρεις το σφάλμα στο συντάκτη?",
		port: "Χρόνος φόρτωσης - Επίπεδο Εμπορικού Λιμένα = ",
		port2: "Ταχύτητα φόρτωσης: ",
		wait: "Ο Εμπορικός Λιμένας είναι απασχολημένος με τη φόρτωση άλλου φορτίου",
		hold: "Το αμπάρι θα είναι πλήρες με άλλο(-α) ",
		hold2: " αγαθό(-ά)",
		loadcargo: " πλήρες φορτίο",
		optiontxt: "Επιλογή γλώσσας",
		optRstLoad: "Ανανέωση χρόνου",
		txtBlkPrt: ["Εκκίνηση αποκλεισμού λιμανιού","Αποκλεισμός λιμανιού","Λήξη αποκλεισμού λιμανιού"],
		txtDfsPrt: ["Εκκίνηση υπεράσπισης λιμανιού","Υπεράσπιση λιμανιού","Λήξη υπεράσπισης λιμανιού"],
		txtDfsTwn: ["Εκκίνηση υπεράσπισης πόλης","Υπεράσπιση πόλης","Λήξη υπεράσπισης πόλης"],
		txtBltTwn: ["Εκκίνηση μάχης πόλης","Μάχη πόλης","Λεηλασία"],
		txtopyTwn: "Κατέλαβε την πόλη",
		transport1: "Άφιξη στον προορισμό",
		transport2: "Επιστροφή στο λιμάνι σου",
		WhTitle: "Αποθήκη Εμπορευμάτων",
		noWh: "Η πόλη δεν έχει τους απαιτούμενους κενούς χώρους για να χτιστούν οι αποθήκες που χρειάζονται.",
		loadport: "Ολοκλήρωση φόρτωσης στις ",
		emptyWh: "Διαθέσιμος χώρος στην Αποθήκη Εμπορευμάτων",
		month: ["01","02","03","04","05","06","07","08","09","10","11","12"],
		tomorrow: "αύριο",
		abortmission: "Απόσυρση στόλων - ",
		predictfull: "πλήρες",
		titletravel: "Διάρκεια ταξιδιού",
		predict: "Υπολογισμός χρόνου πλήρωσης Δημαρχείου",
		headTime: "Επιλογή ώρας αναφοράς:",
		localTime: "Τοπική ώρα",
		serverTime: "Ώρα Server",
		formatTime: "Μορφή ώρας",
		townhalltitle1: " πολίτες για να γεμίσουν την πόλη",
		townhalltitle2: " πλεόνασμα πολιτών",
		buyCap: [" Αγορά ","Πλεόνασμα υλικών στο τέλους του ","100% αύξησης χωρητικότητας"],
		headWh: "Πόσους χώρους χτισίματος χρησιμοποιείς για τις αποθήκες",
		moreWh: "μέγιστο",
		fewWh: "ελάχιστο",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	hu:
	{ // magyar forditas Robagfalva rb6514@gmail.com
		text_Upgrade: 	"A fejlesztés befejezése ",
		msg_Never: 		"soha",
		msg_TimeLeft: 	"Tele: ",
		upBuild: 		["kezdés ideje","a fejlesztés befejező dátuma","end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1:		"érkezés másik kikötőbe",
		transport2:		"visszatérés a kikötőbe",
		WhTitle: 		"raktár",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"töltés vége ",
		emptyWh: 		"hely a raktárban",
		month:			["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
		tomorrow:		"tomorrow",
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
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	il:
	{ // Hebrew translate by Yaakov תורגם לעברית ע"י יעקב
		text_Upgrade: 	"סיום השידרוג ",
		msg_Never: 		"אף פעם",
		msg_TimeLeft: 	"מלא ב: ",
		upBuild: 		["תאריך ההתחלה ","תאריך סיום השידרוג",",תאריך הסיום המשוער עבר"],
		totalprice: 	"ס''ה הכנסה אפשרית: ",
		resource: 		"חסר לשלב ",
		errortxt: 		"שגיאה בזמן הסיום. \n\n",
		errortxt1: 		" \n\n האם אתה מעונין לדווח על השגיאה למפתח?",
		port: 			"זמן טעינה – שלב נמל = ",
		port2: 			"מהירות טעינה ",
		wait: 			"הנמל עסוק בטעינה אחרת",
		hold: 			"המטען יהיה מלא עם עוד ",
		hold2: 			" משאבים",
		loadcargo: 		" המטען מלא",
		optiontxt: 		"בחר שפה",
		optRstLoad: 	"אפס זמן טעינה",
		txtBlkPrt: 		["התחלת חסימת הנמל","נמל חסום","סיום חסימת הנמל"],
		txtDfsPrt: 		["התחלת הגנת הנמל","נמל מוגן","סיום הגנת הנמל"],
		txtDfsTwn: 		["התחלת הגנת העיר","עיר מוגנת","סיום הגנת העיר"],
		txtBltTwn: 		["התחלת התקפת העיר","עיר מותקפת","שדידה"],
		txtopyTwn: 		"כיבוש עיר",
		transport1: 	"יעד הגעה",
		transport2: 	"חזרה לנמל שלך",
		WhTitle: 		"מחסן",
		noWh: 			"בעיר אין מספיק מקום לבנות את המחסנים הנדרשים.",
		loadport: 		"הטעינה תסתיים ב ",
		emptyWh: 		"מקום פנוי במחסן",
		month: 			["01","02","03","04","05","06","07","08","09","10","11","12"],
		tomorrow: 		"מחר",
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
		buyCap: 		[" קנה ","עודף סחורות בסיום של ","100% קיבולת אחסון כפולה"],
		headWh: 		"כמה מבנים משמשים למחסן",
		moreWh: 		"מקסימום",
		fewWh: 			"מינימום",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	it:
	{ // Italian texts by myself
		text_Upgrade: 	"Fine costruzione ",
		msg_Never: 		"mai",
		msg_TimeLeft: 	"Pieno in : ",
		upBuild: 		["Data di inizio ampliamento","Data di fine ampliamento","La data di fine è approssimata in eccesso",],
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
		optRstLoad:		"Reset tempi caricamento",
		txtBlkPrt:		["Inizio blocco porto","Blocco porto","Fine blocco porto"],
		txtDfsPrt:		["Inizio difesa porto","Difesa porto","Fine difesa porto"],
		txtDfsTwn:		["Inizio difesa città","Difesa città","Fine difesa città"],
		txtBltTwn:		["Inizio assedio città","Assedio città","Saccheggia città"],
		txtopyTwn:		"Città occupata",
		transport1:		"Arrivo a destinazione",
		transport2:		"Rientro nel tuo porto",
		WhTitle: 		"Magazzino",
		noWh:			"Capacità dei magazzini insufficente per il prossimo livello.",
		loadport: 		"Fine caricamento ",
		emptyWh: 		"Spazio nel magazzino",
		month: 			["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],
		tomorrow:		"domani",
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
		buyCap: 		[" Compra ","Esubero materie fine ","Doppia capienza"],
		headWh: 		"Quanti spazi della città usi per i magazzini",
		moreWh: 		"massini",
		fewWh: 			"minimi",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	lt:
	{ // Lithuanian translate by TrueSkillZ
		text_Upgrade: 	"Tobulinimo pabaiga ",
		msg_Never: 		"niekada",
		msg_TimeLeft: 	"Pilna bus už: ",
		upBuild: 		["Tobulinimo pradžios data","Tobulinimo pabaigos data"," Apytikslis resursų kiekis pabaigus tobulinimą"],
		totalprice: 	"Galimos bendros pajamos: ",
		resource: 		"Lygiui trūksta ",
		errortxt: 		"End_Time klaida.\n\n",
		errortxt1: 		" \n\n Norite pranešti apie klaidą autoriui?",
		port: 			"Krovimo laikas – Prekybos uosto lygis = ",
		port2: 			"Krovimo greitis: ",
		wait: 			"Uostas dar krauna kitą krovinį",
		hold: 			"Laivai užsipildys su kitais kroviniais ",
		hold2: 			" prekių",
		loadcargo: 		" laivai yra pilni",
		optiontxt: 		"Pasirinkite kalbą",
		optRstLoad: 	"Atnaujinti krovimo laiką",
		txtBlkPrt: 		["Pradėti blokuoti uostą","Blokuoti uostą","Baigti blokuoti uostą"],
		txtDfsPrt: 		["Pradėti ginti uostą","Ginti uostą","Baigti ginti uostą"],
		txtDfsTwn: 		["Pradėti ginti miestą","Ginti miestą","Baigti ginti miestą"],
		txtBltTwn: 		["Pradėti mūšį mieste","Mūšis mieste","Plėšti"],
		txtopyTwn: 		"Okupuoti miestą",
		transport1: 	"Atvykimo tikslas",
		transport2: 	"Gryžti į savo uostą",
		WhTitle: 		"Sandėlis",
		noWh: 			"Per žemas sandėlio lygis.",
		loadport: 		"Krovimo pabaiga ",
		emptyWh: 		"Sandėlio talpa",
		month: 			["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rugp","Rug","Spa","Lap","Gru"],
		tomorrow: 		"rytoj",
		abortmission: 	"Atšaukti laivus - ",
		predictfull: 	"pilna",
		titletravel: 	"Kelionės trukmė",
		predict: 		"Skaičiuoti laiką kada miestas bus pilnas",
		headTime: 		"Pasirinkite laiką:",
		localTime: 		"Vietinis laikas",
		serverTime: 	"Serverio laikas",
		formatTime: 	"Laiko formatas",
		townhalltitle1: " žmonių užpildyti miestą",
		townhalltitle2: " žmonių perviršis",
		buyCap: 		[" Pirkti ","Bus perteklius už ","100% padidėjęs pajėgumas"],
		headWh: 		"Kiek statybų vietų panaudota sandeliams",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	lv:  
	{ // Latvian translate by ootoo - fixed by Andrejs & jasa2009
		text_Upgrade:   "Celtniecība beigsies ",
		msg_Never:      "nekad",  
		msg_TimeLeft:   "Pilna: ",  
		upBuild:        ["Sākuma datums","Celtniecības beigu datums","aptuvenais beigu datums"],  
		totalprice:     "Kopējie ienākumi: ",  
		resource:       "Pietrūkst līmenim ",  
		errortxt:       "End_Time ir pieļāvis kļūdu.\n\n",  
		errortxt1:      " \n\n Tu vēlies paziņot autoram par kļūdu??",  
		port:           "Iekraušanās laiks - Ostas līmenis = ",  
		port2:          "Iekraušanas ātrums: ",  
		wait:           "Patreiz ostā tiek pildīti citi kuģi",  
		hold:           "Kuģis būs pilns pēc ",  
		hold2:          " materiāliem",  
		loadcargo:      " pilni tirdzniecības kuģi",  
		optiontxt:      "Izvēlēties valodu",  
		optRstLoad:     "Atjaunot iekraušanas laiku",  
		txtBlkPrt:      ["Sāks bloķēt ostu","Bloķēs ostu","Beigs bloķēt ostu"],  
		txtDfsPrt:      ["Sāks aizsargāt ostu","Aizsargās ostu","Beigs aizsargāt ostu"],  
		txtDfsTwn:      ["Sāks aizsargāt pilsētu","Aizsargās pilsētu","Beigs aizsargāt pilsētu"],  
		txtBltTwn:      ["Sāks kauju pilsētā","Kauja pilsētā","Laupīšana"],  
		txtopyTwn:      "Okupēs pilsētu",  
		transport1:     "Pienāks galapunktā",  
		transport2:     "Atgriezīsies jūsu ostā",  
		WhTitle:        "Noliktava",
		noWh:           "Pilsētā nav pietiekami daudz vietas, lai uzbūvētu nepieciešamās noliktavas.",  
		loadport:       "Iekraušana beigsies ",  
		emptyWh:        "Brīva vieta noliktavā",  
		month:          ["Jan","Feb","Mar","Apr","Mai","Jūn","Jūl","Aug","Sept","Okt","Nov","Dec"],
		tomorrow:		"tomorrow",
		abortmission:   "Atsaukt flotes – ",  
		predictfull:    "pilns",  
		titletravel:    "Ceļa ilgums",  
		predict:        "Laiks pilsētas apdzīvošanai",  
		headTime:       "Izvēlēties laiku:",  
		localTime:      "Vietējais laiks",  
		serverTime:     "Servera laiks",  
		formatTime:     "Laika formāts",  
		townhalltitle1: "pietrūkst līdz aizpildīšanai",  
		townhalltitle2: "nepieciešamās dzīvesvietas pieaugumam",
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	nl:
	{ // Dutch translate by Boudewijn
		text_Upgrade: 	"Uitbreiding voltooid: ",
		msg_Never: 		"nooit",
		msg_TimeLeft: 	"Vol in: ",
		upBuild: 		["Begintijdstip","einddatum voltooiing uitbreiding","end date approximate excess"],
		totalprice: 	"Mogelijk totale inkomen: ",
		resource: 		"Ontbrekend voor niveau ",
		errortxt: 		"Er is een fout opgetreden in End_Time.\n\n",
		errortxt1: 		" \n\n Wil je de fout doorgeven aan de auteur?",
		port: 			"Laadtijd - Grootte van de haven: ",
		port2: 			"Snelheid van het laden: ",
		wait: 			"Resterende tijd die wordt gebruikt door de haven om een ander schip te laden",
		hold: 			"Het scheepsruim is vol met nog ",
		hold2: 			" goederen",
		loadcargo: 		" handelsschepen zijn vol",
		optiontxt: 		"Kies taal",
		optRstLoad:		"Reset laadtijd",
		txtBlkPrt:		["Begin havenblokkade","Blokkeer haven","Einde havenblokkade"],
		txtDfsPrt:		["Begin havenverdediging","Verdedig haven","Einde havenverdediging"],
		txtDfsTwn:		["Begin stadsverdediging","Verdedig stad","Einde stadsverdediging"],
		txtBltTwn:		["Begin stadsgevecht","Open gevecht","Plunderen"],
		txtopyTwn:		"Bezet stad",
		transport1:		"Aankomsttijd",
		transport2:		"Terugkomst in de haven",
		WhTitle: 		"Opslagplaats",
		noWh:			"De stad heeft niet genoeg ruimte voor de benodigde opslagplaatsen.",
		loadport: 		"Laden voltooid om ",
		emptyWh: 		"Resterende capaciteit",
		month:			["Jan","Feb","Mrt","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
		tomorrow:		"morgen",
		abortmission:	"Tijdsduur om vloot terug te trekken - Terugkomsttijd: ",
		predictfull: 	"vol",
		titletravel: 	"Reisduur",
		predict: 		"Bereken de tijd totdat de stad vol is",
		headTime: 		"Referentietijd",
		localTime: 		"Plaatselijke tijd",
		serverTime: 	"Servertijd",
		formatTime:		"Tijdsformaat",
		townhalltitle1: " inwoners om de stad vol te maken",
        townhalltitle2: " inwoners in overvloed",
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	pl:
	{ // Tłumaczenie na polski przez Qasq - fix by skiter ;)
		text_Upgrade: 	"Koniec rozbudowy ",
		msg_Never: 		"nigdy",
		msg_TimeLeft: 	"Pełne o: ",
		upBuild: 		["Data rozpoczęcia","Czas ukończenia rozbudowy","Wyliczenie po za zasięgiem"],
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
		optRstLoad: 	"Zresetuj czas ładowania",
		txtBlkPrt: 		["Rozpocznij blokadę portu","Blokuj port","Zakończ blokadę portu"],
		txtDfsPrt: 		["Rozpocznij obronę portu","Broń portu","Zakończ obronę portu"],
		txtDfsTwn: 		["Rozpocznij obronę miasta","Broń miasta","Zakończ obronę miasta"],
		txtBltTwn: 		["Start battle town","Battle town","Pillage"],
		txtopyTwn: 		"Okupuj miasto",
		transport1: 	"Wpływa do docelowego portu",
		transport2: 	"Wraca do twojego portu",
		WhTitle: 		"Magazyn",
		noWh: 			"W mieście nie ma wystarczającej ilości miejsca do budowy potrzebnych magazynów.",
		loadport: 		"Ładowanie zakończy się o ",
		emptyWh: 		"Miejsce w magazynie/ach",
		month: 			["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],
		tomorrow: 		"Jutro",
		abortmission: 	"Wycofanie floty - ",
		predictfull: 	"pełno",
		titletravel: 	"Czas trwania podróży",
		predict: 		"Obliczenie czasu zapełnienia miasta",
		headTime: 		"Wybór czasu referencyjnego:",
		localTime: 		"Czas lokalny",
		serverTime: 	"Czas serwera",
		formatTime: 	"Format czasu",
		townhalltitle1: " ludzi by zapełnić miasto",
		townhalltitle2: " ludzi za dużo",
		buyCap: 		[" Kup ","Nadwyżka towarów na koniec","100% zwiększona pojemość"],
		headWh: 		"Ile wykorzysta miejsc budowlanych dla magazynów",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},	
	pt:
	{ // Portuguese translate by Pescossudo
		text_Upgrade:	"Fim da melhoria ",
		msg_Never: 		"nunca",
		msg_TimeLeft: 	"Cheia em: ",
		upBuild: 		["Data de início da melhoria","Data do fim da melhoria","end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1: 	"Chegada ao destino",
		transport2: 	"Regressar ao porto",
		WhTitle: 		"Armazém",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Carregamento termina em ",
		emptyWh: 		"Espaço no armazém",
		month: 			["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
		tomorrow:		"tomorrow",
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
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	ro:
	{ // Romanian translation by Kaboom
		text_Upgrade:   "Sfarsitul de upgrade ",
		msg_Never:      "niciodata",
		msg_TimeLeft:   "Plin in: ",
		upBuild:        ["data de inceput de upgrade","data terminarii de upgrade","excesul aproximativ la data terminarii"],
		totalprice:     "Venit total posibil: ",
		resource:       "Lipsesc pentru nivelul ",
		errortxt:       "End_Time a generat o eroare.\n\n",
		errortxt1:      " \n\n Vrei sa semnalezi aceasta eroare autorului??",
		port:           "Timp de incarcare – Nivel Port Comercial = ",
		port2:          "Viteza de incarcare: ",
		wait:           "Portul mai incarca alte bunuri",
		hold:           "Nava de transport va fi umpluta cu inca ",
		hold2:          " bunuri",
		loadcargo:      " nave de transport sunt pline",
		optiontxt:      "Alege limba",
		optRstLoad:     "Reseteaza timpul de incarcare",
		txtBlkPrt:      ["Incepe blocarea portului","Blocheaza portul","Sfarsitul blocarii portului"],
		txtDfsPrt:      ["Incepe apararea portului","Apara portul","Sfarsitul apararii portului"],
		txtDfsTwn:      ["Incepe apararea orasului","Apara orasul","Sfarsitul apararii orasului"],
		txtBltTwn:      ["Incepe lupta in oras","Jefuieste","Sfarsitul luptei orasului"],
		txtopyTwn:      "Ocupa orasul",
		transport1:     "Sosirea la destinatie",
		transport2:     "Intoarcere la portul tau",
		WhTitle:        "Magazie",
		noWh:           "Orasul nu are destul spatiu sa construiasca magaziile necesare.",
		loadport:       "Incarcarea se termina la ",
		emptyWh:        "Spatiu in magazie",
		month:          ["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sept","Oct","Nov","Dec"],
		tomorrow:		"tomorrow",
		abortmission:   "Retrage flota - ",
		predictfull:    "plin",
		titletravel:    "Durata de calatorie",
		predict:        "Calculeaza timpul de umplere al populatiei orasului",
		headTime:       "Selecteaza timpul de referinta:",
		localTime:      "Timpul local",
		serverTime:     "Timpul serverului",
		formatTime:     "Formatul timpului",
		townhalltitle1: " oameni pentru umplerea orasului",
		townhalltitle2: " oameni in exces",
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	}, 
	rs:
	{ // Српски превод by Duje F-H
		text_Upgrade: 	"Завршетак надоградње ",
		msg_Never: 		"Никад",
		msg_TimeLeft: 	"Пуно за: ",
		upBuild: 		["Датум почетка надоградње","Датум завршетка надоградње","end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1: 	"Долазак на одредиште",
		transport2: 	"Врати се у луку",
		WhTitle: 		"Складиште",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Loading end at ",
		emptyWh: 		"Простор у складишту",
		month: 			["Јан","Феб","Мар","Апр","Мај","Јун","Јул","Авг","Септ","Окт","Нов","Дец"],
		tomorrow:		"tomorrow",
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
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	ru:
	{ // Russian translation by GrAndAG
		text_Upgrade: 	"Окончание постройки ",
		msg_Never: 		"никогда",
		msg_TimeLeft: 	"Заполнится: ",
		upBuild: 		["дата начала постройки","дата окончания постройки","end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1:		"Прибытие в пункт назначения",
		transport2:		"Возвращение в ваш порт",
		WhTitle: 		"Склад",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Окончание погрузки в ",
		emptyWh: 		"Свободное место на складе",
		month:			["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],
		tomorrow:		"tomorrow",
		abortmission:	"Отзыв флота - ",
		predictfull: 	"полный",
		titletravel: 	"Продолжительность поездки",
		predict: 		"Подсчитывать время до заполнения города",
		headTime: 		"Отображать время относительно:",
		localTime: 		"Местного времени",
		serverTime: 	"Времени сервера",
		formatTime:		"Формат времени",
		townhalltitle1: " людей (уровня довольства) не хватает для заполнения города",
		townhalltitle2: " людей (уровень довольства) в запасе",
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	se:
	{ // Svensk översätning av Theo Gonks II
		text_Upgrade: 	"Utbyggnad klar ",
		msg_Never: 		"Det dröjer",
		msg_TimeLeft: 	"Fullt: ",
		upBuild: 		["utbyggnaden startar","utbyggnaden klar","end date approximate excess"],
		totalprice: 	"Möjlig total inkomst: ",
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1: 	"Ankomsttid",
		transport2: 	"Återvänd till din hamn",
		WhTitle: 		"Lagerlokal",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Lastningen klar ",
		emptyWh: 		"Plats i lagerlokalen",
		month: 			["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sept","Okt","Nov","Dec"],
		tomorrow:		"tomorrow",
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
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	si:
	{ // Slovenian translate by GoldenGuy
		text_Upgrade: 	"Konec nagradnje",
		msg_Never: 		"nikoli",
		msg_TimeLeft: 	"Še: ",
		upBuild: 		["datum začetka nagradnje","datum konca nagradnje","Približni datum konca nagradnje"],
		totalprice: 	"Možnost prihranka: ",
		resource: 		"Primakuje ",
		errortxt: 		"End_Time-u se je zgodila napaka.\n\n",
		errortxt1: 		" \n\n Želiš prijaviti napako avtorju??",
		port: 			"Nalagam - Ladije za trgovanje = ",
		port2: 			"Hitrost nalaganja: ",
		wait: 			"Vsi se ukvarjajo z nalganjem tovora",
		hold: 			"Naloženo bo nadrugo ladijo ",
		hold2: 			" surovine",
		loadcargo: 		" ladje so polne",
		optiontxt: 		"Izberi jezik",
		optRstLoad: 	"Resertiram čas",
		txtBlkPrt: 		["Pošlji blokirati pristanišče","Blokiranje prisatnišče","Konec blokiranje pristanišča"],
		txtDfsPrt: 		["Začni braniti pristanišče","Branjenje pristanišče","Konec branjenje pristanišča"],
		txtDfsTwn: 		["Začni braniti mesto","Branjene mesto","konec branjenja mesta"],
		txtBltTwn: 		["Začni Ropati mesto","Ropaj","Dobiček ropanja"],
		txtopyTwn: 		"Okupacija mesta",
		transport1: 	"Destinacija plovbe",
		transport2: 	"Nazaj domov",
		WhTitle: 		"Skladišče",
		noWh: 			"Nezadostna kapaciteta skadišč.",
		loadport: 		"Konec nalaganje dobrin ",
		emptyWh: 		"Prostor v skladišču",
		month: 			["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
		tomorrow: 		"jutri",
		abortmission: 	"umakni flote - ",
		predictfull: 	"polno",
		titletravel: 	"Trajanje potovanja",
		predict: 		"Izračunaj čas zapolnitve mesta",
		headTime: 		"Izberi referenčni čas:",
		localTime: 		"Lokalni čas",
		serverTime: 	"Čas serverja",
		formatTime: 	"Zapis časa",
		townhalltitle1: " ljudje za zapolnjenje mesta",
		townhalltitle2: " preveč ljudi",
		buyCap: 		[" Kupi ","Presežek surovin ob koncu ","100% polna kapaciteta"],
		headWh: 		"Koliko gradbenih ozemlja uporabim za skladišče",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	sk:
	{ // Slovak translate by TmsK
		text_Upgrade: 	"Koniec aktualizácie",
		msg_Never: 		"Nikdy",
		msg_TimeLeft: 	"Plné za: ",
		upBuild: 		["Dátum začiatku aktualizácie","Dátum ukončenia aktualizácie","end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1: 	"Príchod do miesta určenia",
		transport2: 	"Vrátiť sa do prístavu",
		WhTitle: 		"Sklad",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Nakladanie skončí za ",
		emptyWh: 		"Voľné miesto v sklade",
		month: 			["Jan","Feb","Mar","Apr","Máj","Jún","Júl","Aug","Sept","Okt","Nov","Dec"],
		tomorrow:		"tomorrow",
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
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	tr:
	{ // Turkish translate by Segwarg
		text_Upgrade: 	"Yükseltme Bitiş Zamanı ",
		msg_Never: 		"Hiçbir zaman",
		msg_TimeLeft: 	"Tam Dolu: ",
		upBuild: 		["Başlangıç tarihi","Yükseltme bitiş tarihi","Bitiş tarihi yaklaşık fazlalık"],
		totalprice: 	"Muhtemel Toplam Gelir: ",
		resource: 		"Yükseltme için Eksik Olan",
		errortxt: 		"End_Time bir hatayla karşılaştı.\n\n",
		errortxt1: 		" \n\n Hatayı bildirmek ister misiniz?",
		port: 			"Yükleme Zamanı - Ticaret Limanı Seviyesi = ",
		port2: 			"Yükleme Hızı: ",
		wait: 			"Limanda başka bir kargo yükleniyor.",
		hold: 			"Gemi kapasitesi şu kadar yükle tam dolu olacak: ",
		hold2: 			" mallar",
		loadcargo: 		" Kargolar full",
		optiontxt: 		"Dil Seç",
		optRstLoad:		"Yükeme zamanını sıfırla",
		txtBlkPrt:		["Liman kuşatma başlangıcı","Limanı kuşat","Liman kuşatma sonu"],
		txtDfsPrt:		["Liman kuşatma başlangıcı","Limanı Savun","Şehri Savunma Sonu"],
		txtDfsTwn:		["Şehri savunma başlangıcı","Şehri Savun","Şehri savunma sonu"],
		txtBltTwn:		["Şehirde savaş başlangıcı","Şehirde savaş","Yağmala"],
		txtopyTwn:		"Şehri işgal et",
		transport1:		"Varış yeri",
		transport2:		"Kendi Limanına dönme zamanı",
		WhTitle: 		"Depo",
		noWh:			"Şehirde gerekli depoları inşa edecek boş yer yok.",
		loadport: 		"Yükleme bitiş zamanı ",
		emptyWh: 		"Depoda Kalan boşluk",
		month:			["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
		tomorrow:		"Yarın",
		abortmission:	"Filoları geri çek - ",
		predictfull: 	"dolu",
		titletravel: 	"Seyahat süresi",
		predict: 		"Şehri doldurmak için gereken zamanı hesapla",
		headTime: 		"Referans zamanı seç:",
		localTime: 		"Yerel Zaman",
		serverTime: 	"Sunucu Zamanı",
		formatTime:		"Zaman Formatı",
		townhalltitle1:	" Şehri doldurmak için gereken insan",
       	townhalltitle2:	" Fazla insan",
		buyCap: 		[" Satın al ","Surplus goods at the end of ","100% arttırılmış kapasite"],
		headWh: 		"Depolar için ne kadar inşaa alanı var",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
	ua:
	{ // Ukrainian translate by alkanoid
		text_Upgrade:	"Закінчення будівництва ",
		msg_Never:		"ніколи",
		msg_TimeLeft:	"Заповниться: ",
		upBuild: 		["дата початку будівництва","дата закінчення будівництва","end date approximate excess"],
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
		optRstLoad:		"Reset loading time",
		txtBlkPrt:		["Start block harbour","Block harbour","End block harbour"],
		txtDfsPrt:		["Start defend port","Defend port","End defend port"],
		txtDfsTwn:		["Start defend town","Defend town","End defend town"],
		txtBltTwn:		["Start battle town","Battle town","Pillage"],
		txtopyTwn:		"Occupy town",
		transport1:		"Прибуття в пункт призначення",
		transport2:		"Повернення в ваш порт",
		WhTitle: 		"Склад",
		noWh:			"The city does not have enough space to build the warehouses needed.",
		loadport: 		"Закінчення завантаження в ",
		emptyWh: 		"Вільне місце на складі",
		month:			["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру"],
		tomorrow:		"tomorrow",
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
		buyCap: 		[" Buy ","Surplus goods at the end of ","100% increased capacity"],
		headWh: 		"How many building ground use for warehouses",
		moreWh: 		"max",
		fewWh: 			"min",
		tTravel: 		["Min capacità","Max propulsore","Min viaggio"]
	},
}

var ET_opt, ET_lang, page, ET_unit, curdate;

$(window).ready(function() 
{ 
try
{
	if (!unsafeWindow.IKARIAM) return;
	getOpt();
	ET_lang = getLanguage();
	page = $('body:first').attr('id');
	timeunits();
	curdate = getDate();
	var timeSrv = (ET_opt.refTime == 1)? 0: unsafeWindow.IKARIAM.time.serverTimeDiff*1;
	$('script:contains(getCountdown)').each(function()
	{
		var cnt = $(this).text().split('getCountdown');
		for (var j = 1; j < cnt.length; j++)
		{
			var name = cnt[j].split('el: \"')[1].split('\"')[0]
			var enddate = parseInt(cnt[j].split('enddate: ')[1])*1000 - timeSrv;
					
			if (name == 'cityCountdown') {cityCountdown(name,enddate)}
			else if (name == 'upgradeCountDown') {upgradeCountDown(name,enddate)}	// countdown building 
			else if (name == 'cooldown') {coolDown(name,enddate)}	// countdown miracle
			// countdown transport
			else if (name == 'outgoingOwnCountDown' || name == 'outgoingAlienCountDown') {outgoingOwnCountDown(name,enddate)}	// loding time in the port
			else if (name.indexOf('eta') == 0) {etaMerchantNavy(name,enddate)}
			else if (name.indexOf('ret') == 0) {retMerchantNavy(name,enddate)}
			// countdown troops and fleets
			else if (name.indexOf('fleetRow') == 0) 
			{
				$('#'+ name).prev('td').text(realTimetoDate(enddate,true))
			}
			else if (name.indexOf('SpyCountDown') == 0) {spyCountDownHideOut(name,enddate)}
			else if (name.indexOf('buildCountDown') == 0) {buildCntdwBarShipSafe(name,enddate)}
		}
	});	
	// page Building
	if ($('#buildingUpgrade').length > 0) {predictEndDateBuilding()}	// if you view building 
		
	if (page == 'city')	{pageCity()}							// view town
	else if (page =='buildingGround') {pageBuildingGround()} 	// new building
	else if (page =='townHall') {pageTownHall()} 				// townHall
	else if (page =='researchAdvisor') {pageResearchAdvisor()} 	// researchAdvisor		
	else if (page =='finances') {pageFinances()} 				// Finances
	else if (page =='academy') {pageAcademy()} 					// Academy
	else if (page =='palace'){pagePalace()} 					// Palace	
		
	// page Transport
	else if (page =='merchantNavy') {pageMerchantNavy()}	// How hold are full and number of the cargo required the load
	else if (page =='branchOffice') {pageBranchOffice()}	// How much money you get from the market
	else if (page =='transport') 	{pageTransport()}		// How much time for load cargo
	else if (page =='takeOffer') 	{pageTakeOffer()}		// Buy Goods
	else if (page =='port') 		{pagePort()}			// abort loading cargo
		
	// page Troops and Fleets
	else if (page =='militaryAdvisorMilitaryMovements') pageMilitaryAdvisorMilitaryMovements();	// movements
	else if (page =='blockade') 	pageBlockPort();											// Occupy port
	else if (page =='defendPort')	pageDefendPort(); 											// Defend port
	else if (page =='deployment' && $('#selectArmy').length > 0)	pageDeployArmy();			// Deployment Army
	else if (page =='deployment' && $('#selectFleet').length > 0)	pageDeployFleet();			// Deployment Fleet
	else if (page =='defendCity') 	pageDefendCity();											// Defend Town
	else if (page =='plunder')		pagePlunder();												// Pillage Town
	else if (page =='occupy')		pageOccupy();												// Occupy town
	else if (page =='barracks' || page =='shipyard' || page =='safehouse')	pageBarShipSafe();	// Building troops, fleets or spy
	else if (page =='sendSpy')		pageSendSpy();												// send spy
		
	// other page
	else if (page == 'options' && $('#options_debug').length > 0)
	{ 
		$('#mainview div.content:first').before(
		"<div class='content'>" +
			"<h3>"+
				"<a href='http://userscripts.org/scripts/show/52268' target='_blank'>End_Time v "+ lversion +"</a>"+
				"<span style='font-size:10px;'>  by <a href='http://userscripts.org/users/95943' target='_blank'>Phate72</a></span>"+
			"</h3>"+
			"<table cellpadding='0' cellspacing='0'>"+
				"<tbody>"+
					"<tr>" +
						"<td colspan=3></td>"+
					"</tr>" +
					"<tr>" +
						"<th id='ET_headtime'>"+ ET_lang.headTime +"</th>" +
						"<td><input type='radio' name='ET_refTime' value=0><span id='ET_localtime'> "+ ET_lang.localTime +"</span></td>"+
						"<td><input type='radio' name='ET_refTime' value=1><span id='ET_servertime'> "+ ET_lang.serverTime +"</span></td>"+
					"</tr>" +
					"<tr>" +
						"<th id='ET_headhour'>"+ ET_lang.formatTime +"</th>" +
						"<td><input type='radio' name='ET_typeHour' value=0><span> 24h</span></td>"+
						"<td><input type='radio' name='ET_typeHour' value=1><span> 12h</span></td>"+
					"</tr>" +
					"<tr>" +
						"<td colspan=3></td>"+
					"</tr>" +
					"<tr>" +
						"<th id='ET_headPredict'>"+ ET_lang.predict +"</th>" +
						"<td><input type='checkbox' id='ET_predict'></td>"+
					"</tr>" +
					"<tr>" +
						"<td colspan=3></td>"+
					"</tr>" +
					"<tr>" +
						"<td colspan=3></td>"+
					"</tr>" +
					"<tr>" +
						"<th id='ET_headWarehouse'>"+ ET_lang.headWh +"</th>" +
						"<td><input type='radio' name='ET_calcWh' value=0><span id='ET_moreWh'> "+ ET_lang.moreWh +"</span></td>"+
						"<td><input type='radio' name='ET_calcWh' value=1><span id='ET_fewWh'> "+ ET_lang.fewWh +"</span></td>"+
					"</tr>" +
					"<tr>" +
						"<td colspan=3></td>"+
					"</tr>" +
					"<tr>" +
						"<th>Debug</th>" +
						"<td><input type='checkbox' id='ET_debug'></td>"+
					"</tr>" +
					"<tr>" +
						"<td colspan=3></td>"+
					"</tr>" +
					"<tr>" +
						"<th id='Endlanguage'>"+ ET_lang.optiontxt +"</th>" +
						"<td><select id='End_selectLanguage'></select></td>"+
					"</tr>" +
				"</tbody>"+
			"</table>" +
			'<div class="centerButton">'+
				'<input id="ET_Reset_Loading" class="button" value="'+ ET_lang.optRstLoad +'" type="button" onclick="javascript:resetDate()" >'+
			'</div>'+
			"<div class='footer'></div>" +
		"</div>");
			
		// add language in Select element
		var selLang = document.getElementById('End_selectLanguage');
		for (var l=0; l < ltyp.length; l++)
		{
			 var selOpt = false;
			 if (ltyp[l] == ET_opt.lang){selOpt = true;}
			 selLang.add(new Option(ltyp[l], ltyp[l],false,selOpt),  null)
		}
			
		// add event and update state
		$("input[name='ET_refTime']:radio").click(function(){ET_opt.refTime = $(this).val()}).eq(ET_opt.refTime).attr('checked',true);
		$("input[name='ET_typeHour']:radio").click(function(){ET_opt.typHour = $(this).val()}).eq(ET_opt.typHour).attr('checked',true);
		$("input[name='ET_calcWh']:radio").click(function(){ET_opt.calcWh = $(this).val()}).eq(ET_opt.calcWh).attr('checked',true);
		$('#ET_predict').bind('change',function(){ET_opt.predict = this.checked}).attr('checked',ET_opt.predict);
		$('#ET_debug').bind('change',function(){ET_opt.debug = this.checked}).attr('checked',ET_opt.debug);
		$('#End_selectLanguage').bind('change',function()
			{
				ET_opt.lang = this.value
				ET_lang = getLanguage();
				// change text in option page
				$('#ET_headPredict').text(ET_lang.predict);
				$('#ET_headtime').text(ET_lang.headTime);
				$('#ET_localtime').text(ET_lang.localTime);
				$('#ET_servertime').text(ET_lang.serverTime);
				$('#ET_headhour').text(ET_lang.formatTime);
				$('#ET_headWarehouse').text(ET_lang.headWh);
				$('#ET_moreWh').text(ET_lang.moreWh);
				$('#ET_fewWh').text(ET_lang.fewWh);
				$('#Endlanguage').text(ET_lang.optiontxt);
				$('#ET_Reset_Loading').attr('value',ET_lang.optRstLoad);
			});
		$('#ET_Reset_Loading').click(function(){localStorage.setItem('ET_waitPort', '[]')});
		$(window).unload(function() {setOpt()});
	}
}
catch(er)
	{infoError("function main",er)}
});

function infoError(name,er)	//with error open forum page
{
	if (!ET_opt.debug) return; // exit if you don't want debug script	
	if(confirm(ET_lang.errortxt + name + " " +  er + ET_lang.errortxt1)) {window.open("http://userscripts.org/scripts/show/52268");}
}

function getLanguage()
{
	if (!langs[ET_opt.lang]) 
	{
		alert("End_Time. The language is not supported. The script sets the default language (en). In the options page you can change it.");
		ET_opt.lang ='en';
		setOpt()
	}
	return langs[ET_opt.lang];
}

/** --------------------------*/  
/**     Building library      */
/** --------------------------*/ 

/** COUNTDOWN */
function cityCountdown(name,time) // countdown building upgrade in the town
{ 
try
{
	var endtxt = " - " + realTimetoDate(time,false);	// date of end event
	$('#'+name).after('<span>'+ endtxt +'</span>');
	// Position3 modify class timetofinish in end date is longer
	$('#'+name).parents('li#position3').find('div.timetofinish').css('left','-'+ 5*(endtxt.length-3) +'px');
	saveUpgrade (time);	// save end time of building for predict end time
}
catch(er)
				{infoError("function cityCountdown ",er)}
}

function upgradeCountDown(name,time) // countdown building upgrade in the building page or Tradegood page or resource page
{ 
try
{		
	var endtxt = realTimetoDate(time,false);	// date of end event
	
	if (page != 'tradegood' &&  page != 'resource')
	{
		$('#upgradeInProgress > div.isUpgrading').text(ET_lang.text_Upgrade + endtxt)
		saveUpgrade (time);	// save end time of building for predict end time
	}
	else	$('#'+name).prevAll('div.isUpgrading').text(ET_lang.text_Upgrade + endtxt);
	
}
catch(er)
				{infoError("function upgradeCountDown ",er)}
}

function saveUpgrade (rTime)	// save end time of building for predict end time
{
	localStorage.setItem('ET_UpBld_' + cityIdPath(), String(rTime));
}

function coolDown(name,time) // countdown miracle in the temple
{ 
try
{		
	
	var endtxt = realTimetoDate(time,false);	// date of end event
	$('#'+name).parent().append('<div id="EndcoolDown">'+ endtxt +'</div>');
	$('#EndcoolDown').css({'position':'relative','padding':'5px 5px','font-size':'18px','display':'inline'});
}
catch(er)
				{infoError("function coolDown ",er)}
}

/** ACTION in the PAGE */
function pageCity() // save level of port and warehouse
{ 
try
{
	if ($('#locations').length <=0) return; // exit if page is type message error
	var idcity =parseInt($('#position0 a:first').attr('href').split('id=')[1])	
	getLevel($('ul#locations li.port'),'ET_lvlport'+ idcity);			//port
	getLevel($('ul#locations li.warehouse'),'ET_lvlwarehouse'+ idcity);	//warehouse
	getLevel($('ul#locations li.dump'),'ET_lvldump'+ idcity);			//dump
}
catch(er)
				{infoError("function pageCity ",er)}
}
/** FUNCTION for PAGECITY */
function getLevel(node,keySave) // save level of building
{
	var RE = /\D/g;	//
	var ary = [];
	
	node.each(function(id)
	{
		var lvl = parseInt($(this).find('span:first').text().replace(RE,''));
		if ($(this).find('div.constructionSite').length > 0) {lvl += '+'}
		ary.push(lvl)
	});
	if (ary.length > 1)	ary.sortlvl()			//sort level
	else if (ary.length <= 0) ary=[0]
	localStorage.setItem(keySave,uneval(ary));	// save level
}
/** END FUNCTION for PAGECITY */

function pageTownHall()	 // predict population overfull
{ 
try
{
	if ($('#CityOverview').length <=0 || ET_opt.predict == false) {return;}	// exit
		
	var curP = $('#CityOverview li.space span.occupied').text() *1
	var maxP = $('#CityOverview li.space span.total').text() *1
	var growthP = $('#CityOverview li.growth span.value').text().split(' ')[0] *1
	var satisfP = $('#SatisfactionOverview div.happiness div.value').text() *1	
	var timeLeftEx = 0;	
	if (curP < maxP && (curP + satisfP) > maxP && growthP > 0 ) // town is growing and will fill
	{
		for ( var i = curP; i < maxP; i++) {timeLeftEx = timeLeftEx + 1 / (growthP - 0.02 * (i - curP));}
		var timetxt = RealTimetoCounter(parseInt(timeLeftEx*60)*60,2);
		
	}
	else if (curP == maxP)	// town is full
	{
		timetxt = "<span style='color: red'><strong> " + ET_lang.predictfull + "</strong></span>";
	}
	else // town is growing and will not fill
	{
		for ( i = 1; i < Math.abs(satisfP); i++)	{timeLeftEx = timeLeftEx + 1 / ( Math.abs(growthP) - 0.02 * i);}
		var timetxt = ET_lang.msg_Never;
		var exttime = RealTimetoCounter(parseInt(timeLeftEx*60)*60,2);
		if (exttime != '') {timetxt += " (" + RealTimetoCounter(parseInt(timeLeftEx*60)*60,2)+ ")";}
	}
	var difSatisfaction = maxP - curP - satisfP;
	var Satsf = (difSatisfaction > 0)? 	'<sup style="color: green" title="'+ difSatisfaction + ET_lang.townhalltitle1 +'"> +'+ difSatisfaction +'</sup>': '<sup style="color: red" title="'+ Math.abs(difSatisfaction) + ET_lang.townhalltitle2 +'"> '+ difSatisfaction +'</sup>';
	// add new node for end time growth
	$('<li class="'+ $('#CityOverview li.growth').attr('class') +'">'+
		'<span class="textlabel">'+ET_lang.msg_TimeLeft+'</span>'+
		'<span class="value">'+ timetxt +'</span>'+
	'</li>').appendTo('#CityOverview ul.stats').css({'position':'relative','top':'100px','left':'325px'});
	$('#SatisfactionOverview div.value:last').append(Satsf)
	
}
catch(er) 				
	{infoError("function pageTownHall ",er)}
}

function pageResearchAdvisor() // action with page Research Advisor
{ 
try
{
	var tmpoint = $('ul.researchLeftMenu > li.time').text().replace(/[A-z, ,:]/g,'')*1;
	if (tmpoint > 0)
	{
		$('#currentResearch li.researchPointsDiff').each(function()
		{
			var difpoint = $(this).text().replace(/\D/g,'') *1;
			var datepoint = realTimetoDate(curdate + (difpoint/tmpoint *60*60*1000) ,false);
			$(this).parents('div.researchInfo').find('div.researchButton2').text(datepoint)
				.css({'font-weight':'bold','margin':'4px 8px','padding':'3px 0px 3px 18px','width':'100px'});
		});
	}
}
catch(er)
	{infoError("function pageResearchAdvisor ",er)}
}

function pageAcademy() // countdown negative gold
{ 
try
{	
	if ($('#accelerateResearch p.notice').length > 0)
	{		
		exp = $('#accelerateResearch p.notice').text().split(" ");
		var rtime = CountertoRealTime(exp[exp.length-2] +" "+ exp[exp.length-1]);
		if (rtime>0)	$('#accelerateResearch p.notice').append('<span> - '+ realTimetoDate(rtime*1000 + curdate,false) +'</span>');
	}
}
catch(er)
				{infoError("function pageAcademy ",er)}
}

function pagePalace()
{ 
try
{	
	$('#anarchyCounter').each(function()
	{
		var anarchyTime = CountertoRealTime($(this).text())
		$(this).after('<div>'+  realTimetoDate(curdate + anarchyTime * 1000,false) +'</div>')
	})
}
catch(er)
				{infoError("function pagePalace ",er)}
}

function pageFinances() // countdown negative gold
{ 
try
{	
	var result = $('#mainview table.table01:last tr.result td.hidden').text().replace(/[^\d^-]/g,'') *1;
	if (result < 0)
	{
		var gold = $('table#balance:first td.res:last').text().replace(/\D/g,'')*1;
		var rDate = parseInt(getDate()+ new Date(((gold/Math.abs(result))*60*60)*1000).getTime())
		var date = realTimetoDate(rDate);
		$('#mainview table.table01:last tr.result td.bar').html('<div><span name="ET_cntdw" value='+ rDate +'></span> - '+ date +'</div>').css('color','red');
		$('#mainview table.table01:last tr.result td.bar span').eq(0).css('font-weight','normal')	
		// countdown
		ET_Counter('','',' - ');
		ET_t_cnt = setInterval(ET_Counter,5000,'','',' - ');
		$(window).unload(function() {clearInterval(ET_t_cnt)});	// delete countdown
		localStorage.removeItem('ET_balance');
	}
	else localStorage.setItem('ET_balance',result)
	
}
catch(er)
				{infoError("function pageFinances ",er)}
}

function pageBuildingGround() // new building in town
{ 
try
{
	var auxdate = localStorage.getItem('ET_UpBld_' + cityIdPath())*1;
	$('li.building').each(function ()
	{
		var rtime =  CountertoRealTime($(this).find('li.time').text().split(': ')[1]);	// time to upgrade building
		$(this).find('li.time').append('<span> - '+ dateBuild(rtime*1000,auxdate,false) +'</span>')
		if ($(this).find('p.cannotbuild').length > 0)	{$(this).find('li.time span:last').css('color','red')}	// if you can build
	});
		
	if (auxdate < curdate)	//increase end date
	{
		ET_t_dt = setInterval(ET_Date,5000,false);
		$(window).unload(function() {clearInterval(ET_t_dt)});	// delete increase Date
	}
}
catch(er)
	{infoError("function pageBuildingGround ",er)}
}

function predictEndDateBuilding()	// calculate date of your upgrade building or missing resource
{ 
try
{
	var idcity = cityIdPath();			// id of the city view
	var idresource = $('#citySelect').attr('value');	// id of the city witn the resouce show

	if (idcity != idresource) return;	// Exit if resource isn't of the town
		
	//time
	var addtime="";	// time needed for upgrade
	var node = $('#buildingUpgrade li.time')
	if (node.length>0)	{addtime = node.text().split(': ')[1]}
	else 				{return}	// not upgrade level
		
	var wood = getResourceBuilding('wood',$('#buildingUpgrade li.wood'));
	var wine = getResourceBuilding('wine',$('#buildingUpgrade li.wine'));
	var marble = getResourceBuilding('marble',$('#buildingUpgrade li.marble'));
	var crystal = getResourceBuilding('crystal',$('#buildingUpgrade li.glass'));
	var sulfur = getResourceBuilding('sulfur',$('#buildingUpgrade li.sulfur'));
		
	// compare resource to upgrade witn resource in town
	var chkresources = true;	// flag check resources
	var noupgrade = false;
	var html ="";
	var rtime = 0;
	
	if (wood.diff >= 0 && wine.diff >= 0 && marble.diff >= 0 && crystal.diff >= 0 && sulfur.diff >= 0 ) // if total resource is in town put the end date
	{
		var auxdate = localStorage.getItem('ET_UpBld_' + cityIdPath())*1;
		if (auxdate < curdate)	{noupgrade = true;} // buildings not upgraded in town
		rtime =  CountertoRealTime(addtime);	// time to upgrade building
			
		// when time finish with hour
		var chktime = false;
		if ( (rtime/3600) == parseInt(rtime/3600))
		{
			rtime += 3600;	// add 1 hour if time don't have minutes or second
			chktime = true;
		}
		html += dateBuild(rtime*1000,auxdate,chktime);
	}
	else	// you don't have all resources
	{
		chkresources = false;
		// search upgrading level 
		var lvl = $('#buildingUpgrade h4').eq(0).text().replace(/\D/g,"") *1;
		// compile html text for table of missing resource
		html='<h4>'+ ET_lang.resource + lvl +':</h4><ul class="resources">';
		if (wood.diff < 0)		html += insDifResource(wood.diff,'wood',wood.uptxt);
		if (wine.diff < 0)		html += insDifResource(wine.diff,'wine',wine.uptxt);
		if (marble.diff < 0)	html += insDifResource(marble.diff,'marble',marble.uptxt);
		if (crystal.diff < 0)	html += insDifResource(crystal.diff,'glass',crystal.uptxt);
		if (sulfur.diff < 0)	html += insDifResource(sulfur.diff,'sulfur',sulfur.uptxt);
		html += '</ul>';
	}
	// add new node for resource in less
	$('#buildingUpgrade div.footer:last').before('<div class="content" id="ET_DateBld">'+ html +'</div>');
	// ELIMINARE $('#ET_DateBld li:even').addClass('alt')
		
	// search resources that require max level of the warehouse
	var maxresource=wood.up
	if (wine.up > maxresource){maxresource=wine.up};
	if (marble.up > maxresource){maxresource=marble.up};
	if (crystal.up > maxresource){maxresource=crystal.up};
	if (sulfur.up > maxresource){maxresource=sulfur.up};
		
	var lvlup = Math.ceil((maxresource - 1500)/8000);	// calculate level of warehouse
	//level warehouse
	actWh = eval(localStorage.getItem('ET_lvlwarehouse'+ idcity));	// get level warehouse
	if (actWh==null) actWh=[0];
	var totLvlWh=0;
	for ( var t=0; t< actWh.length; t++)	{totLvlWh += parseInt(actWh[t])}
	//level dump
	actDp = eval(localStorage.getItem('ET_lvldump'+ idcity));		// get level dump
	if (actDp==null) actDp = [0];
	var lvlDp = parseInt(actDp[0])*4
	//control level
	var totLvl= totLvlWh + lvlDp;
	//compare resource to upgrade with space in warehouse
	var qWh = (totLvl * 8000) + 1500;
		
	if (noupgrade && chkresources)	//add increase date if you don't upgrade other bulid in town
	{
		ET_t_dt = setInterval(ET_Date,1000,false);
		$(window).unload(function() {clearInterval(ET_t_dt)});	// delete increase Date
	}
	else if (lvlup > totLvl)
	{	
		// Calculates the amount of free space in the warehouse
		html = '';
		if (wood.up > qWh)		html += insDifResource(qWh - wood.rs,'wood',wood.uptxt);
		if (wine.up > qWh)		html += insDifResource(qWh - wine.rs,'wine',wine.uptxt);
		if (marble.up > qWh)	html += insDifResource(qWh - marble.rs,'marble',marble.uptxt);
		if (crystal.up > qWh)	html += insDifResource(qWh - crystal.rs,'glass',crystal.uptxt);
		if (sulfur.up > qWh)	html += insDifResource(qWh - sulfur.rs,'sulfur',sulfur.uptxt);
		if (html!='') {html = '<h4>'+ ET_lang.emptyWh +':</h4><ul class="resources">'+ html +'</ul>';}
			
		// add new node for level upgraded of the warehouse
		$('#ET_DateBld').before('<div class="footer"></div>'+
								'<div class="content">'+
									'<center>'+
										'<h4>'+ ET_lang.WhTitle +'</h4>'+
										'<div id="ET_input"></div>'+
										'<table id="ET_tableWh"></table>'+
									'</center>'+
								'</div>'+
								'<div class="content">'+ html +'</div>'+
								'<div class="footer"></div>');
		calcCapacity(maxresource,actWh,actDp[0]);
		
		if (qWh*2 != unsafeWindow.IKARIAM.currentCity.maxCapacity.wood * 1)	// if you don't buy 100% increase capacity
		{
			$('#ET_input').html('<input type="checkbox" id="ET_incWh" /><span>'+ ET_lang.buyCap[0] + ET_lang.buyCap[2] +'</span>')
			$('#ET_incWh').click(function(){calcCapacity(maxresource,actWh,actDp[0])});
		}
	}
	if (qWh*2 == unsafeWindow.IKARIAM.currentCity.maxCapacity.wood * 1)	// if you buy 100% increase capacity
	{
		html = '';
		if (wood.rs > qWh)html += insDifResource(qWh - wood.rs,'wood',wood.uptxt);
		if (wine.rs > qWh)html += insDifResource(qWh - wine.rs,'wine',wine.uptxt);
		if (marble.rs > qWh)html += insDifResource(qWh - marble.rs,'marble',marble.uptxt);
		if (crystal.rs > qWh)html += insDifResource(qWh - crystal.rs,'glass',crystal.uptxt);
		if (sulfur.rs > qWh)html += insDifResource(qWh - sulfur.rs,'sulfur',sulfur.uptxt);
		if (html!='') {html = '<div class="content">'+
								'<h4  style="color:green">'+ ET_lang.buyCap[1] + ET_lang.buyCap[2] +'</h4>'+
								'<ul class="resources">'+ html +'</ul>'+
							  '</div>'+
							  '<div class="footer"></div>';}
		
		$('#ET_DateBld').before(html);
	}
}
catch(er) 				
	{infoError("function predictEndDateBuilding ",er)}
}

/** FUNCTION for PREDICTENDDATEBUILDING */
function getResourceBuilding(resouce,upgrade) // get resouce for upgrade building
{
	var RE = /\D/g
	var ary={uptxt:"",up:0,rs:0,diff:0};
	if (upgrade.length > 0)
	{
		ary.up = upgrade.text().replace(RE,'')*1;
		ary.uptxt = upgrade.attr('title');
	}
	else {return ary}
	
	ary.rs = unsafeWindow.IKARIAM.currentCity.resources[resouce]
	ary.diff = ary.rs - ary.up
	return ary
}

function insDifResource(valore,classtxt,titletxt)	// use in function predictEndDateBuilding for show resource
	{ return '<li class='+ classtxt +' title='+ titletxt +'><span class="textLabel">'+ titletxt +'</span><span style=\'color: '+ (valore >= 0? 'green':'red') +'\'> ' + replaceNum(valore) + '</li>'}

function dateBuild(rtime,auxdate,chktime) // new building in town
{ 
try
{		
	var html ="";
	var appx ="";
	var waittime =0;
	var incDtTime = rtime/1000;
		
	// when time finish with hour
	if (chktime)	{appx = '<sup style="color: red; font-size:9px" title="'+ ET_lang.upBuild[2] +'">+1'+ ET_unit.hour +'</sup>';}
		
	// search other upgraded in town
	var starttxt="";
	if (auxdate > curdate) // one building upgraded in town
	{
		//setting start date
		starttxt = realTimetoDate(auxdate,false);
		html += '<span title="'+ ET_lang.upBuild[0] +'">'+ starttxt + '</span><span style="color: green; font-size:16px "> » </span>';
		waittime = auxdate - curdate;
	}
	// calculate end time of building
	rtime +=  waittime + curdate;
	var endtxt = realTimetoDate(rtime,false);
	if (starttxt != "")
	{
		if (starttxt.split(" ")[0] == endtxt.split(" ")[0]) // delete day if the same of start date
			{endtxt = endtxt.split(" ")[1];}
	}
	// setting end date
	html += '<span>';
	var idbld = ""
	if (auxdate <= curdate)	{idbld = " name='ET_incDate' value ="+ incDtTime;}
	html += '<span '+ idbld +' title="'+ ET_lang.upBuild[1] +'">'+ endtxt +'</span>' + appx;
	return html;
}
catch(er)
	{infoError("function dateBuild ",er)}
}

function calcCapacity(res,Wh,tDp) // level warehouse and dump
{ 
try
{
	var htmlWh = "<tbody>";
	var kRs = ($('#ET_incWh').attr('checked'))? 2:1;
	var lvlup = Math.ceil((res - 1500)/(8000 * kRs));	// calculate level of warehouse
	// calculate level of existing warehouse and dump 
	var numWH =	(Wh.length==1 && Wh[0]==0)? 0 : Wh.length;
	var actDp = (parseInt(tDp) == tDp)? parseInt(tDp): parseInt(tDp) + 1;
	var numDP = (actDp>0)? 1 : 0;
								//fewer Warehouses	more Warehouses
	var kWh= (ET_opt.calcWh == 1)? [0,34,40,40,40] : [0,20,25,30,40];
	var kDp= (ET_opt.calcWh == 1)? [0,25,40,40,40] : [0,15,20,30,40];
	//calculates the maximum number of levels with existing warehuose and dump
	var maxlvl = (numWH*kWh[numWH]) +(numDP*4*kDp[numWH])
	var cal = true;
	while (maxlvl < lvlup)
	{
		numWH++;
		if ((numWH==3 && numDP==0 && ET_opt.calcWh==1)||(numWH==4 && numDP==0 && ET_opt.calcWh!=1))
		{
			numDP=1;
			numWH--;
		}
		maxlvl = (numWH*kWh[numWH]) +(numDP*4*kDp[numWH])
		if ( numWH >= 4 && numDP >= 1 && maxlvl < lvlup) 
		{
			htmlWh += "<tr><td colspan=3><center>"+ ET_lang.noWh +"</center><td>";
			cal=false;
			break
		}
	}
	if (cal)	// 5 is max number of warehouses and dump
	{
		if (numDP ==1)
		{
			var lvlDp = Math.ceil((lvlup - (numWH*kWh[numWH]))/4);
			if (lvlDp < actDp) lvlDp = actDp;
			lvlup -= lvlDp*4;
		}
		for (var j=0; j < numWH; j++)
		{
			if (j==3) htmlWh += "</tr><tr>"; // 3 is max number of cells for line
	
			var lvlWh = Math.ceil(lvlup /(numWH - j));	// required warehuose's level
			var actWh = (Wh[j] != null)? Wh[j]:0;
			var upWh = (parseInt(actWh) == actWh)? actWh*1: parseInt(actWh) + 1;
			var txtUp = (upWh == actWh)? "": "<span style='color: green;'>+1</span>";
			htmlWh += "<td><center>"+
						"<img src='skin/img/city/building_warehouse.gif' alt='Warehouse' height='40' width='59'>"+
						parseInt(actWh) + txtUp;	// text actual level of warehouse
			if (lvlWh <= upWh)
			{
				lvlWh = upWh;
				var color = "green";
				var difWh = "-";
			}
			else
			{
				htmlWh +="<span style='color: green; font-size:14px'>»</span>"+ lvlWh;
				color = "red";
				difWh = upWh - lvlWh
			}
			htmlWh += "<div style='color: "+ color +";'>"+ difWh +"</div></center></td>";
			lvlup -= lvlWh;	// other level of warehouses
		}
		if (numDP ==1)
		{
			if (numWH==3) htmlWh += "</tr><tr>"; // 3 is max number of cells for line
			txtUp = (parseInt(tDp) == actDp)? "": "<span style='color: green;'>+1</span>";
			htmlWh += "<td><center>"+
						"<img src='skin/img/city/building_dump.gif' alt='Dump' height='40' width='52'>"+
						parseInt(tDp) + txtUp;	// text actual level of warehouse
			if (lvlDp <= actDp)
			{
				color = "green";
				var difDp = "-";
			}
			else
			{
				htmlWh +="<span style='color: green; font-size:14px'>»</span>"+ lvlDp;
				color = "red";
				difDp = actDp - lvlDp
			}
			htmlWh += "<div style='color: "+ color +";'>"+ difDp +"</div></center></td>";
		}
	}
	htmlWh += "</tr></tbody>";
	$('#ET_tableWh').html(htmlWh)
}
catch(er)
	{infoError("function calcCapacity ",er)}
}

/** END FUNCTION for PREDICTENDDATEBUILDING */

/** --------------------------*/  
/**     Transport library     */
/** --------------------------*/ 

/** COUNTDOWN */
function outgoingOwnCountDown(name,time) // countdown loading cargo in the port
{ 
try
{
	var nodeCnt = document.getElementById(name);
	var endtxt = realTimetoDate(time,false);	// date of end event
	nodeCnt.parentNode.lastChild.textContent = ET_lang.loadport + endtxt;
	
	// add id event
	var lnk = $('#'+ name).parents('tr').find('td:last a')
	if (lnk.length <= 0) return;
		
	var idcity = cityIdPath();
	var cargo = parseInt($('#'+ name).parents('tr').find('td').eq(1).html().split('</div>')[1]);
	wait = READLoadingTime(true);
		
	for (var j = 0; j < wait.length ; j++)
	{
		if(idcity == wait[j].cityLoad && cargo == wait[j].nCargo)
		{
				wait[j].eventId = parseInt(lnk.attr('href').split('eventId=')[1]);
				lnk.bind('click',function(){deleteMission(idcity,parseInt($(this).attr('href').split('eventId=')[1]))});
				break;
		}
	}
	// save loading time
	localStorage.setItem('ET_waitPort', uneval(wait));
}
catch(er) 				
	{infoError("function outgoingOwnCountDown ",er)}
}

function etaMerchantNavy(name,time) // countdown mission in Merchant Navy
{ 
try
{	
	var nodeCnt = $('#'+ name).parent();
	var column = 3;
	var col ='target'
	
	if (nodeCnt.find('td.returning').length >0 || (nodeCnt.find('td.gotoown').length >0 &&  nodeCnt.find('td.actions > a > img').length < 1)) 	{col ='source'}	// transport mission aborting	
	nodeCnt.find('td.'+ col).append('<span title="'+ ET_lang.transport1 +'"> '+ realTimetoDate(time,false) +'<span>');
}
catch(er) 				
	{infoError("function etaMerchantNavy ",er)}
}

function retMerchantNavy(name,time) // countdown mission in Merchant Navy
{ 
try
{	
	if (time > curdate)	// calculate arrival destination
		{$('#'+ name).parent().find('td.source').append('<span title="'+ ET_lang.transport2 +'"> '+ realTimetoDate(time,false) +'<span>')}
}
catch(er) 				
	{infoError("function retMerchantNavy ",er)}
}

/** ACTION in the PAGE */
function pageMerchantNavy()	//calculate full of hold and cntdw loading cargo
{ 
try
{
	//check time in table
	var wait = READLoadingTime(false);
	if (wait.length <=0) return;	// exit if no loading time 
	var nTable = $('#mainview table:has(td.eta)').length;
	var chkIndex = [];
	$('#mainview table:has(td.eta)').each(function(id)	// for each table
	{
		var typ='';
		if (nTable == 2) 
		{	
			if (id == 1) {typ = 't'}
			if (id == 2) {typ = 'g'}
		}
		
		var eta = $(this).find('td.eta')
		for (var j= eta.length -1 ; j >= 0 ; j--)		// for each row of table
		{
			var line = eta.eq(j).parent()
			if (line.find('td.actions a').length > 0)	// cell Actions have abbandon mission
			{
				var cargo = parseInt(line.find('td.transports').text());
				var idsr = line.find('td.source a').attr('href').split('cityId=')[1];
				var idtg = line.find('td.target a').attr('href').split('cityId=')[1];
				for (var jj = wait.length-1; jj >= 0; jj--)	// search loading time in array
				{
					//		same town source		same town of destination		same number of cargo		same type of mission				not used in list
					if (wait[jj].cityLoad == idsr && wait[jj].cityDest == idtg && wait[jj].nCargo == cargo && (wait[jj].typ == typ || typ == '') && $.inArray(jj,chkIndex) < 0)
					{
						if (eta.eq(j).text().replace(/\D/g,'').length == 0)	//Add countdown in loading cargo
						{
							eta.eq(j).append('<div name="ET_cntdw" value="'+ wait[jj].dateLoad +'"></div>')
								.css('text-align','center')
								.attr('title', ET_lang.loadport + realTimetoDate(wait[jj].dateLoad,false));
							eta.eq(j).prevAll('td.target').append('<span title="'+ ET_lang.transport1 +'"> '+ realTimetoDate(wait[jj].dateDest,false) +'<span>');
						}
						else												//Add time if you abort mission
						{
							$('<div name=ET_incTm value='+ wait[jj].dateLoad +'></div>')
								.appendTo(line.find('td.source'))
								.bind('mouseenter',function()
								{
									curdate = getDate();
									dif = curdate - ($(this).attr('value') *1);
									if( dif > 0) $(this).attr('title', ET_lang.abortmission + realTimetoDate(dif + curdate,false))
								});
						}
						// add event id for abort mission
						wait[jj].eventId = parseInt(line.find('td.actions a').attr('href').split('eventId=')[1]);
						line.find('td.actions a').bind('click',function()
						{
							deleteMission(parseInt($(this).parents('tr').find('td.source a').attr('href').split('cityId=')[1]),
								parseInt($(this).attr('href').split('eventId=')[1]))
						});
						chkIndex.push(jj);
						break;
					}
						
				}
			}
		}
	});
	//save loading time
	localStorage.setItem('ET_waitPort', uneval(wait));
	// countdown for loading time
	ET_Counter('','',' - ');
	ET_t_cnt = setInterval(ET_Counter,1000,'','',' - ');
	$(window).unload(function() {clearInterval(ET_t_cnt)});	// delete countdown
	// increase time fo abort mission
	ET_Increase()
	ET_t_inc = setInterval(ET_Increase,1000);
	$(window).unload(function() {clearInterval(ET_t_inc)});	// delete countdown

}
catch(er) 				
	{infoError("function pageMerchantNavy ",er)}
}

function pageBranchOffice()	// how much money you get from the market and save level of harbour if you trade it
{ 
try
{
	//adds the level of the port in the link exchange goods 
	$('table.tablekontor tr').find('td:last a[href*=type=444]').each(function()
	{
		var lvlport= parseInt($(this).parents('tr').find('td').eq(1).text())
		if (!isNaN(lvlport))
		{
			$(this).attr('value',lvlport).bind('click',function() {localStorage.setItem('ET_tradePort',$(this).attr('value'))});
		}
	});	
	//how much money you get from the market
	$('#reservedGold').parent().before('<p>'+ ET_lang.totalprice +'<span id=ET_totPrice></span> <img src="skin/resources/icon_gold.gif"></p>')
	money()
	$('table.tablekontor:last select, table.tablekontor:last input').bind('change',function(){money()});
	
	$('table.tablekontor td:has(a)').prev().each(function(){
		var dist= parseInt($(this).text())
		dist = dist>0? dist:0.5;
		var travel = (1200/60)* dist *60;
		var max = RealTimetoCounter(travel,2)
		var qta = RealTimetoCounter(travel/1.664,2)
		var prop = RealTimetoCounter(travel/4,2)
		var min = RealTimetoCounter(travel/5.664,2)
		$(this).append('<p title="'+ ET_lang.tTravel[0] +' ~'+ qta +' / '+ ET_lang.tTravel[1] +' ~'+ prop +' / '+ ET_lang.tTravel[2] +' ~'+ min +'">~'+ max +'</p>')
	});
	$('table.tablekontor p').css('font-size','9px')
}
catch(er) 				
	{infoError("function pageBranchOffice ",er)}
}
/** FUNCTION for PAGEBRANCHOFFICE */
function money()	// how much money you get from the market
{ 
try
{
	var gold =0;
	$('table.tablekontor:last select[value="444"]').each(function()
		{gold += $(this).parents('tr').find('input:first').val() * $(this).parents('tr').find('input:last').val()});
	$('#ET_totPrice').text(gold);
}
catch(er) 				
	{infoError("function money ",er)}
}
/** END FUNCTION for PAGEBRANCHOFFICE */

function pageTakeOffer() // with a branchOffice take an offer
{ 
try
{
	hideSlider('mainview');
	var typ = $('input[name=type]').val();	// type of mission - 444=buy 333=sell
	var loadMyPort = '';
	var typload = (typ == 444)? false:true;
	var load = calcuPort(typload);
	if (typ == 444)		// type research 'I am looking for'
	{
		nodeReturn('li.journeyTarget');
		$('#missionSummary li.journeyTarget').after(
		"<li class='ET_loadTime' title='"+ ET_lang.port + load.txt +" / "+ ET_lang.port2 + load.speed +"'>"+
			"<span id='loadTime' name='ET_incDate'></span>"+
		"</li>");
		$('#missionSummary li.ET_loadTime').css({'background':'url("/skin/relatedCities/trade_ship_20.gif") no-repeat scroll left top transparent','padding-left':'36px'});
			
		$('#journeyTime').attr('title',ET_lang.titletravel)
		$('#arrival').attr('name','ET_incDate')
		$('#missionSummary li.arrival').attr('title',ET_lang.transport1)
	}
	else if(typ == 333)	// type research 'I offer'
	{
		nodeReturn('li.journeyTarget');
		$('#journeyTime').attr('title',ET_lang.titletravel)
			.attr('style','font-weight: normal')
			.before("<span  id='waitTime' name='ET_cntdw' title='"+ ET_lang.wait +"' style='font-weight: normal'></span>"+
				"<span  id='loadTime' title='"+ ET_lang.port + load.txt +" / "+ ET_lang.port2 + load.speed +"' style='font-weight: normal'></span>")
			.after( "<span style='font-weight: normal'> = </span>"+
				"<span  id='totalTime' style='font-weight: bold'>" + $('#journeyTime').text() + "</span>");
		$('#arrival').attr('name','ET_incDate')
		$('#missionSummary li.arrival').attr('title',ET_lang.transport1)
		if (load.wait > curdate) 
		{
			$('#waitTime').val(load.wait);
			ET_Counter('',' + ',' - ');
			ET_t_cnt = setInterval(ET_Counter,1000,'',' + ',' - ');
			$(window).unload(function() {clearInterval(ET_t_cnt)});	// delete countdown
		}
	}
	// add event for loading time
	$('table.offerTable td.input input:text').keyup(function(){loadOffer(load,typ)});
	$('table.offerTable td.input a').click(function(){loadOffer(load,typ)});
	$('#sliderbg_capacity , #slider_capacity_min , #slider_capacity_max').click(function() {loadOffer(load,typ)});	
	//add event with submit form, save loading time
	$('#mainview form:first').submit(function(){SAVELoadingTime(load,'g')});
}
catch(er) 				
	{infoError("function pageTakeOffer ",er)}
}
/** FUNCTION for PAGETAKEOFFER */
function loadOffer(load,typmis)	// calculate time to load cargo	SISTEMARE
{
try
{
	curdate = getDate();
	var totRs = 0;
	$('table.offerTable td.input input:text').each(function() 
	{
		var qta = $(this).attr('value')*1;
		totRs += isNaN(qta)? 0: qta;
	});
	// calcu travel time	
	var journey= $('#journeyTime').text();
	if (!journey)	journey = '-';
	var traveltime = CountertoRealTime(journey);
	$('#journeyTime').attr('value',traveltime);
	// calcu loading time
	var loadingtime = 0;		
	if (totRs > 0) loadingtime = parseInt(totRs / load.speed*60);	// time unit second
	var loadtxt = RealTimetoCounter(loadingtime,2);
	var totaltime = traveltime;
	var returntime = traveltime *2 + loadingtime;
	
	if (typmis == 333)
	{
		var waitdate = $('#waitTime').attr('value');
		var waittime = waitdate > curdate? (waitdate - curdate)/1000: 0;
		if (loadtxt != "") loadtxt += " + ";	// if load cargo in your port
		totaltime += waittime + loadingtime;	// Calculate total time
		returntime += waittime;
	}
	
	$('#loadTime').text(loadtxt).attr('value',loadingtime);	// loading time	
	// Calculate arrive transport date	
	$('#arrival').text(realTimetoDate(totaltime*1000 + curdate,false))
		.attr('value',totaltime);	
	$('#totalTime').text(RealTimetoCounter(totaltime,2));	// total time
	// calculate return time
	$('#returnDate').text(realTimetoDate(returntime*1000 + curdate,false))
		.attr('value',returntime)
}
catch(er) 				
	{infoError("function loadOffer ",er)}
}
/** END FUNCTION for PAGETAKEOFFER */

function pageTransport() // how much time for load cargo
{ 
try
{
	if ($('#journeyTime').length < 1) return	// exit for error page
	
	hideSlider('transportGoods');
	var load = calcuPort(true);	// load level port
	// Make sure the adjust functions is called when the ammount of resources changes
	if (unsafeWindow.swood) { unsafeWindow.swood.subscribe( "change", function(){loadGoods(load)})}			//change wood
	if (unsafeWindow.smarble) { unsafeWindow.smarble.subscribe( "change", function() {loadGoods(load)})}	//change marble
	if (unsafeWindow.swine) { unsafeWindow.swine.subscribe( "change", function() {loadGoods(load)})}		//change wine
	if (unsafeWindow.ssulfur) { unsafeWindow.ssulfur.subscribe( "change", function() {loadGoods(load)})}	//change sulfur
	if (unsafeWindow.sglass) { unsafeWindow.sglass.subscribe("change", function() {loadGoods(load)})}		//change crystal
	$('#sliderbg_capacity , #slider_capacity_min , #slider_capacity_max').click(function() {loadGoods(load)});
	$('#sliderbg_jet , #slider_jet_min , #slider_jet_max').click(function() {loadGoods(load)});
	$('#transport').submit(function() {SAVELoadingTime(load,'g')});		//press button trasport		
		
	$('#journeyTime').attr('title',ET_lang.titletravel)
		.attr('style','font-weight: normal')
		.before("<span  id='waitTime' name='ET_cntdw' title='"+ ET_lang.wait +"' style='font-weight: normal'></span>"+
				"<span  id='loadTime' title='"+ ET_lang.port + load.txt +" / "+ ET_lang.port2 + load.speed +"' style='font-weight: normal'></span>")
		.after( "<span style='font-weight: normal'> = </span>"+
				"<span  id='totalTime' style='font-weight: bold'>" + $('#journeyTime').text() + "</span>");
	$('#arrival').attr('name','ET_incDate')
	$('#missionSummary li.arrival').attr('title',ET_lang.transport1)
	
	// check if you must calculate return time
	if ($('#citySelect option[value='+ $('form#transport input[name=destinationCityId]').val() +']').length <= 0) nodeReturn();
		
	// empty hold
	$('#missionSummary ul.routeInfo').append("<li id='ET_hold' style='font-weight: normal'>"+ ET_lang.hold +"<span id='emptyhold' style='font-weight: bold'>0</span>"+ ET_lang.hold2 +"</li>");
	$('#ET_hold').hide()
	
	// countdown time for loading other cargo
	if (load.wait > curdate) 
	{
		$('#waitTime').attr('value',load.wait);
		ET_Counter('',' + ',' - ');
		ET_t_cnt = setInterval(ET_Counter,1000,'',' + ',' - ');
		$(window).unload(function() {clearInterval(ET_t_cnt)});	// delete countdown
	}
	else
	{	// increase Date
		clearInterval(ET_t_dt);
		ET_t_dt = setInterval(ET_Date,1000,true);
		$(window).unload(function() {clearInterval(ET_t_dt)});	// delete increase Date
	}
	
}
catch(er) 				
	{infoError("function pageTransport ",er)}
}

/** FUNCTION for PAGETRANSPORT */
function loadGoods(load)	// calculate time to load cargo
{
try
{
	// Get total ammount of resources that will be sent
	curdate = getDate();
	var totRs =0;
	$('#transportGoods ul.resourceAssign input.textfield').each(function() 
	{
		var qta = $(this).attr('value')*1;
		totRs += isNaN(qta)? 0: qta;
	});
	var journey= $('#journeyTime').text();
	if (!journey)	journey = '-';
	var waitdate = $('#waitTime').attr('value');
	var waittime = waitdate > curdate? (waitdate - curdate)/1000: 0;
	var loadingtime = 0;
	// Calculate empty hold trasport
	if (totRs > 0)
	{
		var ships = parseInt($('#transporterCount').attr('value'));
		var capacity = $('#textfield_capacity').val()*100;
		if(isNaN(capacity)) capacity=500;
		var empty = ships * capacity - totRs;
		if (empty > 0)
		{
			$('#emptyhold').text(empty);
			$('#ET_hold').show();
		}
		else $('#ET_hold').hide();
		
		// Calculate wait time if port is occupated in other loading
		loadingtime = parseInt(totRs / load.speed*60);	// time unit second
	}
	else $('#ET_hold').hide();
		
	// if load cargo in your port
	var loadtxt = RealTimetoCounter(loadingtime,2);
	if (loadtxt != "") loadtxt += " + ";
	$('#loadTime').text(loadtxt).attr('value',loadingtime);
		
	// Calculate total time
	var traveltime = CountertoRealTime(journey);
	$('#journeyTime').attr('value',traveltime);
	var totaltime = waittime + loadingtime + traveltime;
	var totaltxt = RealTimetoCounter(totaltime,2);
	$('#totalTime').text(totaltxt);
		
	// Calculate arrive transport date
	$('#arrival').attr('value', totaltime)
		
	// calculate return time
	var rtnDate = $('#returnDate')
	if (rtnDate.length > 0)
	{
		rtnDate.text(realTimetoDate( curdate + (totaltime + traveltime)*1000,true))
			.attr('value',loadingtime + (traveltime*2))
	}
}
catch(er) 				
	{infoError("function loadGoods ",er)}
}
/** END FUNCTION for PAGETRANSPORT */

function hideSlider(idSection) // hide slider Capacity and Propulsion
{ 
try
{
	// hide Capacity ship session
	$('#'+ idSection +' div.transportersCapacity div, #'+ idSection +' div.transportersCapacity p').hide()
	$('#'+ idSection +' div.transportersCapacity h4').append('<img id="closeCapacity" src="skin/layout/down-arrow.gif" style="position:absolute; right:30px">')
	$('#closeCapacity').click(function(){
		if ($(this).attr('src') == "skin/layout/down-arrow.gif")
		{
				$(this).attr('src',"skin/layout/up-arrow.gif")
				$('#'+ idSection +' div.transportersCapacity div, #'+ idSection +' div.transportersCapacity p').show()
		}
		else
		{
				$(this).attr('src',"skin/layout/down-arrow.gif")
				$('#'+ idSection +' div.transportersCapacity div, #'+ idSection +' div.transportersCapacity p').hide()
		}
	});

	// hide propulsion session
	$('#setPremiumJetPropulsion div, #setPremiumJetPropulsion p').hide()
	$('#setPremiumJetPropulsion h4').append('<img id="closePropulsion" src="skin/layout/down-arrow.gif" style="position:absolute; right:30px">')
	$('#closePropulsion').click(function(){
		if ($(this).attr('src') == "skin/layout/down-arrow.gif")
		{
				$(this).attr('src',"skin/layout/up-arrow.gif")
				$('#setPremiumJetPropulsion div, #setPremiumJetPropulsion p').show()
		}
		else
		{
				$(this).attr('src',"skin/layout/down-arrow.gif")
				$('#setPremiumJetPropulsion div, #setPremiumJetPropulsion p').hide()
		}
	});
}
catch(er) 				
	{infoError("function hideSlider ",er)}
}

function nodeReturn(typNode) // return time node
{
	$('#missionSummary '+ typNode).after(
		"<li class='ET_return' title='"+ ET_lang.transport2 +"'>"+
			"<span id='returnDate' name='ET_incDate'></span>"+
		"</li>");
	$('#missionSummary li.ET_return').css({'background':'url("/skin/buildings/x40_y40/port.gif") no-repeat scroll left top transparent','padding-left':'44px'});
}	
function nodeAction(typNode,imgAct,titleAct) // return time node
{
	$('#missionSummary '+ typNode).after(
		"<li class='ET_action' title='"+ titleAct +"'>"+
			"<span id='endDate' name='ET_incDate'></span>"+
		"</li>");
	$('#missionSummary li.ET_action').css({'background':'url('+ imgAct +') no-repeat scroll left top','background-size':'contain','padding-left':'44px'});
}	

function pagePort() // if you want delete loading cargo and Add waiting time
{ 
try
{
	var result = localStorage.getItem('ET_balance');
	if (result>0)
	{
		var buyShip = $('div.buyTransporter div.forminput strong').text().replace(/\D/g,'')*1;
		if (buyShip>0) $('div.buyTransporter div.forminput').append('<div><strong>'+ realTimetoDate(curdate +(buyShip/result*3600*1000),false) +'</strong></div>');
	}

	var tab = $('#mainview div.master:first table.table01:not(:has(div#outgoingOwnCountDown,td.empty))');
	if (tab.length < 1) return;	// exit if you don't have loading cargo
		
	var idcity = cityIdPath();
	wait = READLoadingTime(true);
	var lastItem = wait.length-1
	for (var j = tab.length-1; j >= 0 ; j--)
	{
		var cargo = parseInt(tab.eq(j).find('td').eq(1).html().split('</div>')[1]);
		for (var jj = lastItem; jj >= 0; jj--)	// search loading time in array
		{
			if(idcity == wait[jj].cityLoad && cargo == wait[jj].nCargo)
			{
				lastItem = jj-1;
				wait[jj].eventId = parseInt(tab.eq(j).find('td:last a').attr('href').split('eventId=')[1]);
				var rtime = parseInt((wait[jj].dateLoad - curdate)/1000);	// calculate loading time
				tab.eq(j).find('td').eq(tab.eq(j).find('td').length-2)
					.append('<div name="ET_cntdw" '+
								'title="'+ ET_lang.loadport + realTimetoDate(wait[jj].dateLoad,false) +'" '+
								'value='+wait[jj].dateLoad +'>'+
									RealTimetoCounter(rtime,4) +
							'</div>')
					.css('text-align','center');
				tab.eq(j).find('td:last a').bind('click',function(){deleteMission(idcity,parseInt($(this).attr('href').split('eventId=')[1]))});
				break;
			}
		}
	}
	// save loading time
	localStorage.setItem('ET_waitPort', uneval(wait));
	// countdown loading time
	ET_Counter('','',' - ');
	ET_t_cnt = setInterval(ET_Counter,1000,'','',' - ');
	$(window).unload(function() {clearInterval(ET_t_cnt)});	// delete countdown
}
catch(er) 				
	{infoError("function pagePort ",er)}
}

/** --------------------------*/  
/**    Army & Fleet library   */
/** --------------------------*/ 

/** COUNTDOWN */
function pageSendSpy() // send spy
{ 
try
{
	var time = CountertoRealTime($('#totalTime').text())
	$('#totalTime')
		.append('<div><span name="ET_incDate" value="'+ time +'">'+ realTimetoDate(time*1000 + curdate,true) +'</span></div>')
		.css('margin-top','6px');
	// increase Date
	ET_t_dt = setInterval(ET_Date,1000,true);
	$(window).unload(function() {clearInterval(ET_t_dt)});		// delete countdown	
}
catch(er) 				
	{infoError("function pageSendSpy ",er)}
}

function spyCountDownHideOut(name,time) // add end time at countdown spy report
{ 
try
{
	$('#'+ name)
		.after('<div title="'+ ET_lang.transport1 +'">'+ realTimetoDate(time,true) +'</div>')
		.css('display','inline');
	$('#'+ name).next('div').css({'display':'inline','margin-left':'10px','padding-left':'36px','background':'url("/skin/img/icon_arrival.gif") no-repeat scroll 0px -10px transparent'})
}
catch(er) 				
	{infoError("function spyCountDownHideOut ",er)}
}


function buildCntdwBarShipSafe(name,time) // add end time at countdown recruit unit
{ 
try
{
	//Add Date for recuit unit
	$('<div>'+ realTimetoDate(time,false) +'</div>')
		.appendTo($('#'+ name).parent())
		.css({'font-weight':'bold','text-align':'center'})
	//Add Date for waiting recuit unit	
	$('#unitConstructionList div.time:not(:first)').each(function(id)
	{
		$(this).find('span:last').remove();	//Hide node with text
		$('<div>'+  realTimetoDate(curdate +(CountertoRealTime($(this).html().split('<span')[0]) * 1000),false) +'</div>')
		.appendTo($(this))
	});
}
catch(er) 				
	{infoError("function buildCntdwBarShipSafe ",er)}
}

/** ACTION in the PAGE */
function pageMilitaryAdvisorMilitaryMovements() // fleet movements add percent of load in the cargo and how many cargo are full
{ 
try
{
	// if you don't have the direction arrows and you have the link to abort the mission, then this is a loading port! I think
	var row = $('table.locationEvents tr:not(:has(td img[src*=arrow]))').find('td:last a').parents('tr');
	if (row.length<=0) return
	var wait = READLoadingTime(false);
	if (wait.length<=0) return
	var chkIndex = [];
	for( var j = row.length-1; j >= 0; j--)
	{
		
		var cargo = parseInt(row.eq(j).find('td').eq(2).html());
		var source = parseInt(row.eq(j).find('a:first').attr('href').split('cityId=')[1]);
		var target = parseInt(row.eq(j).find('a').eq(1).attr('href').split('cityId=')[1]);
		for( var i = wait.length-1; i >= 0; i--)
		{
			if (wait[i].cityLoad == source && wait[i].cityDest == target && wait[i].nCargo == cargo && $.inArray(i,chkIndex) < 0)
			{

				wait[i].eventId = parseInt(row.eq(j).find('td:last a').attr('href').split('eventId=')[1]);
				//Event if you want abort mission
				row.eq(j).find('td:last a').bind('click',function()
				{
					deleteMission(parseInt($(this).parents('tr').find('a:first').attr('href').split('cityId=')[1]),
					parseInt($(this).attr('href').split('eventId=')[1]));
				});
				chkIndex.push(i);
				break;
			}
		}
	}
	//save loading time
	localStorage.setItem('ET_waitPort', uneval(wait));
}
catch(er) 				
	{infoError("function pageMilitaryAdvisorMilitaryMovements ",er)}
}

function pageBarShipSafe() // page Barrak Ship Safe
{ 
try
{	
	//Add events for army training
	$('ul#units input.textfield').bind('keyup',function(){recruitTime()});
	$('ul#units div.sliderbg, ul#units a.setMin, ul#units a.setMax').bind('click',function(){recruitTime()});
	//Add node for Recruit date
	if (page == 'safehouse') $('#units li.time').append('<span> - </span><span id="ET_recruit"></span>')
}
catch(er) 				
	{infoError("function pageBarShipSafe ",er)}
}

/** FUNCTION for PAGEBARSHIPSAFE */
function recruitTime()	// Add time and End time for unit recruit
{ 
try
{	
	var addtime =0;
	// Add time of other recruit
	var actRecruit = $('#unitConstructionList div.time:last')
	if (actRecruit.length > 0)	addtime = CountertoRealTime(actRecruit.text())
		
	var date = curdate + addtime*1000
	var timeUnt = 0;
	var recruit
		
	if (page == 'safehouse')	timeUnt = CountertoRealTime($('#units li.time').text())* parseInt($('input#textfield_spy').val())
	else 						
	{
		timeUnt = CountertoRealTime($('#accumulatedUnitCosts li.time').text().split(': ')[1])
		$('#accumulatedUnitCosts li.time').append('<span> - </span><span id="ET_recruit"></span>')
	}
		
	if (timeUnt > 0)
	{
		$('#ET_recruit').text(realTimetoDate(date + timeUnt * 1000,false));
		if (addtime == 0) 
		{
			$('#ET_recruit').attr('name','ET_incDate').attr('value',timeUnt);
			ET_t_dt = setInterval(ET_Date,5000,false);
			$(window).unload(function() {clearInterval(ET_t_dt)});	// delete increase Date
		}
	}
}
catch(er) 				
	{infoError("function recruitTime ",er)}
}
/** END FUNCTION for PAGEBARSHIPSAFE */

function pageDeployArmy()	// Calculate end time of transport Army
{ 
try
{
	var load = calcuPort(true);
	// Add new node
	if ($('#journeyTime').length < 1) return	// exit for error page
	$('#journeyTime').hide()
		.after( "<span id='ET_Time'>"+
					"<div>"+
						"<span id='waitTime' name='ET_cntdw' title='"+ ET_lang.wait +"'></span>"+
						"<span id='loadTime' title='"+ ET_lang.port + load.txt +" / "+ ET_lang.port2 + load.speed +"'></span>"+
						"<span id='travelTime' title='"+ ET_lang.titletravel +"'> - </span>"+
						"<span> = </span>"+
						"<span  id='totalTime' style='font-weight: bold'> - </span>"+
					"</div>"+
				"</span>");
	$('li.journeyTime').after(	"<li class='arrival' style='margin-left:10px' title='"+ ET_lang.transport1 +"'>"+
									"<span id='startDate' name='ET_incDate'>-</span>"+
								"</li>");
	// countdown time for loading other cargo
	$('#waitTime').attr('value',load.wait);
	ET_Counter('',' + ','');
	ET_t_cnt = setInterval(ET_Counter,1000,'',' + ','');
	$(window).unload(function(){clearInterval(ET_t_cnt);});	// delete countdown
	// increase Date
	ET_t_dt = setInterval(ET_Date,1000,true);
	$(window).unload(function() {clearInterval(ET_t_dt)});		// delete countdown
	// add event
	$('#selectArmy div.sliderbg, #selectArmy a').click(function(){deployment(load)});
	$('#selectArmy :text').keyup(function(){deployment(load)});
	$('#deploymentForm').bind('submit', function() {SAVELoadingTime(load,'t')});	//press button of the mission
}
catch(er) 				
	{infoError("function pageDeployArmy ",er)}
}

function pageDeployFleet()	// Calculate end time of transport Fleet
{ 
try
{		
	var load = {id: 0, txt: '', speed: 0, wait: 0};
	// Add new node
	if ($('#journeyTime').length < 1) return	// exit for error page
	$('#journeyTime')
		.after('<span> </span>')
		.attr('title',ET_lang.titletravel);
	$('li.journeyTime').after(	"<li class='arrival' style='margin-left:10px' title='"+ ET_lang.transport1 +"'>"+
									"<span id='startDate' name='ET_incDate'>-</span>"+
								"</li>");
	// increase Date
	ET_t_dt = setInterval(ET_Date,1000,true);
	$(window).unload(function() {clearInterval(ET_t_dt)});		// delete countdown
	// add event
	$('#selectFleet div.sliderbg, #selectFleet a').click(function(){deployment(load)});
	$('#selectFleet :text').keyup(function(){deployment(load)});
}
catch(er) 				
	{infoError("function pageDeployFleet ",er)}
}
/** FUNCTION for PAGEDEPLOYARMY PAGEDEPLOYFLEET */
function deployment(load)	// Calculate travel of Army or Fleet
{ 
try
{
	curdate = getDate();
	var employed = parseInt($('#sumTransporter').text()) > 0? timeTroops() : 0;
	var waittime = (load.wait > curdate && employed > 0)? (load.wait - curdate)/1000: 0;
	var loadingtime = employed > 0? parseInt((employed / load.speed)*60): 0;	// time unit second
		
	if (loadingtime > 0) 
		$('#loadTime')
			.attr('value',loadingtime)
			.text(RealTimetoCounter(loadingtime,2) +" + ")
	else	
		$('#loadTime')
			.attr('value',0)
			.text('')
	
	var journey = $('#journeyTime').text();
	var traveltime = CountertoRealTime(journey);
	$('#travelTime').text(journey)
		.attr('value',traveltime);
	$('#journeyTime').attr('value',traveltime);	// for SAVEloadingTime

	var totaltime = waittime + loadingtime + traveltime;
	$('#totalTime').text(totaltime>0? RealTimetoCounter(totaltime,2) : ' -');
	
	// Calculate arrive transport date
	
	$('#startDate').text(realTimetoDate(curdate + totaltime*1000,true))
		.attr('value',waittime <= 0? totaltime: 0);	// time for increase date
}
catch(er) 				
	{infoError("function deployment ",er)}
}

function timeTroops()	// calculate the employment of the hold
{ 
try
{
	var troops = 0;
	$('#selectArmy ul.assignUnits :text').each(function(){
		if ($(this).val()>0)
		{
			var troop = $(this).parent().find('div.weight:first').text().replace(/\D/g,'') * $(this).val()
			troops += !isNaN(troop)? troop : 0;
		}
	});
	return troops
}
catch(er) 				
	{infoError("function timeTroops ",er)}
}
/** END FUNCTION for PAGEDEPLOYARMY PAGEDEPLOYFLEET */

function pageBlockPort() // page Occupy port
{ 
try
{	
	$('div.journeyTime').attr('id','ET_Time');
	$('#journeyTime').attr('title',ET_lang.titletravel)
	$('#missionSummary li.journeyTime').after("<li class='arrival'>"+
					"<span id='startDate' name='ET_incDate' title='"+ ET_lang.txtBlkPrt[0] +"'></span>"+
				"</li>");
	if (unsafeWindow.jDC) 
	{
		curdate = getDate();
		unsafeWindow.jDC.subscribe( "change", function()
		{
			var journey= $('#journeyTime').text();
			if (!journey)	journey = '-';
			var traveltime = CountertoRealTime(journey);
			$('#startDate').text(realTimetoDate(curdate + traveltime*1000,false))
				.attr('value',traveltime);	// time for increase date
		})
	}

	// increase Date
	clearInterval(ET_t_dt);
	ET_t_dt = setInterval(ET_Date,1000,true);
	$(window).unload(function() {clearInterval(ET_t_dt)});		// delete countdown
	$('#ET_Time img').css('margin','0px 3px');
}
catch(er)
				{infoError("function pageBlockPort ",er)}
}

function pageDefendPort() // page Defend port
{ 
try
{	
	if (unsafeWindow.jDC) { unsafeWindow.jDC.subscribe( "change", function(){calcDefend()})}
	$('#time').change(function() {calcDefend()});
	//new node
	$('#journeyTime').attr('title',ET_lang.titletravel)
	nodeReturn('li.journeyTime')
	nodeAction('li.journeyTime','skin/actions/defend_port.gif',ET_lang.txtDfsPrt[2])
	$('#missionSummary li.journeyTime').after( 
		"<li class='arrival'>"+
			"<span id='startDate' name='ET_incDate' title='"+ ET_lang.txtDfsPrt[0] +"'></span>"+
		"</li>");
	$('#missionSummary li').css({'line-height':'26px','background-position':'left center','padding-right':'15px'})
	// increase Date
	clearInterval(ET_t_dt);
	ET_t_dt = setInterval(ET_Date,1000,true);
	$(window).unload(function() {clearInterval(ET_t_dt)});		// delete countdown
}
catch(er)
				{infoError("function pageDefendPort ",er)}
}
/** FUNCTION for PAGEDEFENDPORT */
function calcDefend() // calculate travel for Defend port
{ 
try
{	
	curdate = getDate();
	var journey= $('#journeyTime').text();
	if (!journey)	journey = '-';
	var traveltime = CountertoRealTime(journey);
	$('#startDate').text(realTimetoDate(traveltime*1000 + curdate,true))
		.attr('value',traveltime);	// time for increase date
	var defend = parseInt($('#time').attr('value')) + traveltime;
	$('#endDate').text(realTimetoDate(defend*1000 + curdate,true))
		.attr('value',defend);	// time for increase date
	$('#returnDate').text(realTimetoDate((defend + traveltime)*1000 + curdate,true))
		.attr('value',defend + traveltime)
}
catch(er)
				{infoError("function calcDefend ",er)}
}
/** END FUNCTION for PAGEDEFENDPORT */

function pageDefendCity()	// Calculate end time of Defend town
{ 
try
{
	if ($('#defendForm').length <= 0) return;	// if return error
			
	var load = calcuPort(true);	
	$('#journeyTime')
		.attr('title',ET_lang.titletravel)
		.css('font-weight','normal')
		.before("<span id='waitTime' name='ET_cntdw' title='"+ ET_lang.wait +"' style='font-weight: normal'></span>"+
				"<span id='loadTime' title='"+ ET_lang.port + load.txt +" / "+ ET_lang.port2 + load.speed +"' style='font-weight: normal'></span>")
		.after(	"<span> = </span>"+
				"<span  id='totalTime'> - </span>");
	$('#missionSummary ul.plunderInfo').css('height','52px')
	$('#missionSummary div.transporters > span').attr('class','textLabel')
		
	nodeReturn('li.journeyTime')
	nodeAction('li.journeyTime','skin/actions/defend_port.gif',ET_lang.txtDfsTwn[2])
	$('#missionSummary li.journeyTime').after( 
		"<li class='arrival'>"+
			"<span id='startDate' name='ET_incDate' title='"+ ET_lang.txtDfsTwn[0] +"'></span>"+
		"</li>");
	$('#missionSummary li').css({'line-height':'26px','background-position':'left center','padding-right':'15px'})
	// countdown time for loading other cargo
	$('#waitTime').attr('value',load.wait);
	ET_Counter('',' + ','');
	ET_t_cnt = setInterval(ET_Counter,1000,'',' + ','');
	$(window).unload(function(){clearInterval(ET_t_cnt);});	// delete countdown
	// increase Date
	ET_t_dt = setInterval(ET_Date,1000,true);
	$(window).unload(function() {clearInterval(ET_t_dt)});		// delete countdown	
	// add event
	$('#selectArmy div.sliderbg, #selectArmy a').click(function(){defendCity(load)});
	$('#selectArmy :text').keyup(function(){defendCity(load)});
	$('#time').change(function() {defendCity(load)});
	$('#defendForm').bind('submit', function() {SAVELoadingTime(load,'t')});	//press button of the mission
}
catch(er) 				
	{infoError("function pageDefendCity ",er)}
}

function pagePlunder()	// Calculate end time of Pillage town
{ 
try
{
	if ($('#plunderForm').length <= 0) return;	// if return error
			
	var load = calcuPort(true);	
	//new node
	$('#missionSummary div.plunderInfo')
		.after( "<div id='ET_Time' style='margin: 5px 0px 5px 150px'>"+
					"<div class='journeyTime'>"+
						"<span id='waitTime' name='ET_cntdw' title='"+ ET_lang.wait +"'  style='font-weight: normal'></span>"+
						"<span id='loadTime' title='"+ ET_lang.port + load.txt +" / "+ ET_lang.port2 + load.speed +"'  style='font-weight: normal'></span>"+
						"<span id='travelTime' title='"+ ET_lang.titletravel +"'  style='font-weight: normal'> - </span>"+
						"<span> = </span>"+
						"<span  id='totalTime'> - </span>"+
					"</div>"+
					"<ul class='arrival'>"+
						"<li id='startDate' name='ET_incDate' title='"+ ET_lang.txtBltTwn[0] +"'/>"+
						"<select id='time' title='"+ ET_lang.txtBltTwn[1] +"'>"+
							"<option value='0' > 1Rd</option>"+
							"<option value='900' > 2Rd</option>"+
							"<option value='1800' > 3Rd</option>"+																
							"<option value='2700' selected='selected'> 4Rd</option>"+																
							"<option value='3600' > 5Rd</option>"+																
							"<option value='4500' > 6Rd</option>"+																
							"<option value='5400' > 7Rd</option>"+																
							"<option value='6300' > 8Rd</option>"+
							"<option value='7200' > 9Rd</option>"+
							"<option value='8100' >10Rd</option>"+																
						"</select>"+
						"<li id='endDate' name='ET_incDate' title='"+ ET_lang.txtBltTwn[2] +"'/>"+
					"</ul>"+
				"</div>");
	nodeReturn('ul.arrival li:last') 
	$('#missionSummary li.ET_return').css({'padding':'8px 15px 8px 44px'});
	$('#time').css({'background':'url(skin/actions/plunder.gif) no-repeat scroll left top','background-size':'contain','padding-left':'35px'});
	$('#missionSummary ul.arrival li').css({'padding-right':'15px','display':'inline'});
		
		
	// countdown time for loading other cargo
	$('#waitTime').attr('value',load.wait);
	ET_Counter('',' + ','');
	ET_t_cnt = setInterval(ET_Counter,1000,'',' + ','');
	$(window).unload(function(){clearInterval(ET_t_cnt);});	// delete countdown
	// increase Date
	ET_t_dt = setInterval(ET_Date,1000,true);
	$(window).unload(function() {clearInterval(ET_t_dt)});		// delete countdown	
	// add event
	$('#selectArmy div.sliderbg, #selectArmy a').click(function(){defendCity(load)});
	$('#selectArmy :text').keyup(function(){defendCity(load)});
	$('#time').change(function() {defendCity(load)});
	$('#plunderForm').bind('submit', function() {SAVELoadingTime(load,'t')});	//press button of the mission
		
}
catch(er) 				
	{infoError("function pageDfsPlgOcy ",er)}
}

function pageOccupy()	// Calculate end time of transport troops in mission Transport, Pillage, Occupacy and defend
{ 
try
{	
	if ($('#plunderForm').length <= 0) return;	// if return error
			
	var load = calcuPort(true);	
	//new node
	$('#missionSummary div.plunderInfo')
		.after( "<div id='ET_Time' style='margin: 5px 0px 5px 150px'>"+
					"<div class='journeyTime'>"+
						"<span id='waitTime' name='ET_cntdw' title='"+ ET_lang.wait +"'></span>"+
						"<span id='loadTime' title='"+ ET_lang.port + load.txt +" / "+ ET_lang.port2 + load.speed +"'></span>"+
						"<span id='travelTime' title='"+ ET_lang.titletravel +"'> - </span>"+
						"<span> = </span>"+
						"<span  id='totalTime' style='font-weight: bold'> - </span>"+
					"</div>"+
					"<div class='arrival'>"+
						"<span id='startDate' name='ET_incDate' title='"+ ET_lang.txtBltTwn[0] +"'></span>"+
						"<img src='skin/actions/plunder.gif' title='"+ ET_lang.txtBltTwn[1] +"' style='height:12px; width:18px'>"+
						"<select id='time'>"+
							"<option value='0' selected='selected'> 1Rd</option>"+
							"<option value='900' > 2Rd</option>"+
							"<option value='1800' > 3Rd</option>"+																
							"<option value='2700' > 4Rd</option>"+																
							"<option value='3600' > 5Rd</option>"+																
							"<option value='4500' > 6Rd</option>"+																
							"<option value='5400' > 7Rd</option>"+																
							"<option value='6300' > 8Rd</option>"+
							"<option value='7200' > 9Rd</option>"+
							"<option value='8100' >10Rd</option>"+																
						"</select>"+
						"<span id='endDate' name='ET_incDate' title='"+ ET_lang.txtopyTwn +"'></span>"+
						"<img src='skin/actions/occupy.gif' title='"+ ET_lang.txtopyTwn +"' style='height:12px; width:18px'>"+
					"</div>"+
				"</div>");
	$('#missionSummary div.arrival img').css('margin','0px 3px');
	// countdown time for loading other cargo
	$('#waitTime').attr('value',load.wait);
	ET_Counter('',' + ','');
	ET_t_cnt = setInterval(ET_Counter,1000,'',' + ','');
	$(window).unload(function(){clearInterval(ET_t_cnt);});	// delete countdown
	// increase Date
	ET_t_dt = setInterval(ET_Date,1000,true);
	$(window).unload(function() {clearInterval(ET_t_dt)});		// delete countdown	
	// add event
	$('#selectArmy div.sliderbg, #selectArmy a').click(function(){defendCity(load)});
	$('#selectArmy :text').keyup(function(){defendCity(load)});
	$('#time').change(function() {defendCity(load)});
	$('#plunderForm').bind('submit', function() {SAVELoadingTime(load,'t')});	//press button of the mission
	
	// css End Time
	$('#ET_Time img').css('margin','0px 3px');
}
catch(er) 				
	{infoError("function pageOccupy ",er)}
}
/** FUNCTION for PAGEDEFENDCITY PAGEPLUNDER PAGEOCCUPY*/
function defendCity(load)	// Calculate travel of Defend town
{ 
try
{
	curdate = getDate();
	var employed = $('#sumTransporter').text() > 0? timeTroops() : 0;
	var waittime = (load.wait > curdate && employed > 0)? (load.wait - curdate)/1000: 0;
	var loadingtime = employed > 0? parseInt((employed / load.speed)*60): 0;	// time unit second
		
	if (loadingtime > 0) 
		$('#loadTime')
			.attr('value',loadingtime)
			.text(RealTimetoCounter(loadingtime,2) +" + ")
	else	
		$('#loadTime')
			.attr('value',0)
			.text('')
	
	var journey = $('#journeyTime').text();
	var traveltime = CountertoRealTime(journey);
	$('#travelTime').text(journey)
		.attr('value',traveltime);

	var totaltime = waittime + loadingtime + traveltime;
	$('#totalTime').text(totaltime>0? RealTimetoCounter(totaltime,2) : ' -');
	
	// Calculate arrive transport date
	$('#startDate').text(realTimetoDate(curdate + totaltime*1000,true))
		.attr('value',waittime <= 0? totaltime: 0);	// time for increase date
	var defend = parseInt($('#time').attr('value')) + totaltime;
	$('#endDate').text(realTimetoDate(defend*1000 + curdate,true))
		.attr('value',defend);	// time for increase date
	$('#returnDate').text(realTimetoDate((defend + traveltime)*1000 + curdate,true))
		.attr('value',defend + traveltime)
}
catch(er) 				
	{infoError("function deployment ",er)}
}
/** END FUNCTION for PAGEDEFENDCITY  PAGEPLUNDER PAGEOCCUPY*/

/** --------------------------*/  
/**   Miscellaneous library   */
/** --------------------------*/

function getOpt()	// get option parameter
{
	ET_opt = eval(localStorage.getItem('ET_opt'));//options
	if (ET_opt == null) 	// Init parameter
	{
		ET_opt = {};
		ET_opt.refTime = 1;
		ET_opt.typHour = 0;
		ET_opt.predict = true;
		ET_opt.calcWh = 0;
		ET_opt.debug = false;
		ET_opt.lang = window.navigator.language.split('-')[0].toLowerCase();
		setOpt()
	}
}

function setOpt() 		// save option parameter
{
	localStorage.setItem("ET_opt",uneval(ET_opt));
}


function timeunits() // get time variable from the page
{ 
try
{
	ET_unit = eval(localStorage.getItem('ET_unit'));
	if (ET_unit == null)
	{
		if(unsafeWindow.LocalizationStrings != undefined) 
		{
			ET_unit = unsafeWindow.LocalizationStrings.timeunits.short
			ET_unit.separator =  unsafeWindow.LocalizationStrings.thousandSeperator;
			localStorage.setItem('ET_unit',uneval(ET_unit));
		}
		else	ET_unit = {day:"D", hour:"h", minute:"m", second:"s", separator:","};	
	}
}
catch(er) 				
	{infoError("function timeunits ",er)}
}

function getDate() // get current Date
{ 
	var rdate = (new Date()).getTime()
	if (ET_opt.refTime == 1)	
	{
		rdate += unsafeWindow.IKARIAM.time.serverTimeDiff
		if (rdate == null) alert('error data');
	}
	return rdate;
}

function CountertoRealTime(string)	// convert string "2h 40m 23s" in time 'second'
{ 
try
{
	var addtime=0;
	if (string != null && string != undefined)
	{
		var tms = string.split(' ');
		for (var j = 0 ; j < (tms.length) ; j++)
		{
			if (tms[j].indexOf(ET_unit.second) >= 0  && j == tms.length-1) {addtime += parseInt(tms[j]);}	//Second
			else if (tms[j].indexOf(ET_unit.minute) >= 0) {addtime += parseInt(tms[j])*60;}				//Minutes
			else if (tms[j].indexOf(ET_unit.hour) >= 0) {addtime += parseInt(tms[j])*60*60;}			//Hour
			else if (tms[j].indexOf(ET_unit.day) >= 0) {addtime += parseInt(tms[j])*60*60*24}			//Day
		}
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
		string = day + ET_unit.day + ' ';
		t++;
	}
	if (hour > 0) 
	{
		string += hour + ET_unit.hour + ' ';
		t++;
	}
	if (min > 0 && trimtime > t) 
	{
		string += min + ET_unit.minute + ' ';
		t++;
	}
	if (sec > 0 && trimtime > t) {string += sec + ET_unit.second + ' ';}
	
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
		if ( newDate.getDate() == (today.getDate()+1) && newDate.getMonth() == today.getMonth() && newDate.getYear() == today.getYear()) endtxt = ET_lang.tomorrow
		else
		{
			endtxt = newDate.getDate() + "." + ET_lang.month[newDate.getMonth()] ;	// Add Day and Month
			if (newDate.getFullYear() != today.getFullYear()) endtxt += "." + newDate.getFullYear();	// Add Year
		}
		endtxt+=" ";
	}
		
	// type of hour 12h or 24h (24h =0 and 12h =1)
	var hour = newDate.getHours()
	var ampm ='';
	if (ET_opt.typHour == 1)
	{
		ampm = (hour > 12)? 'pm':'am';
		hour = (hour > 12)? hour-12: hour;
	}
	endtxt += hour;
		
	var min = newDate.getMinutes();
	if (min < 10) {min= "0" + min;}
	endtxt += ":" + min;	// Add Minites
		
	if (secOn == true)
	{
		var sec = newDate.getSeconds();
		if (sec < 10) {sec = "0" + sec;}
		endtxt += ":" + sec;	// Add Second
	}
	endtxt += ampm;	// Add PM or AM for 12h
	
	return endtxt
}
catch(er) 				
	{infoError("function realTimetoDate ",er)}
}

function cityIdPath() // ID city by path of the city view
{
	if (page == 'city')	var idcity = parseInt($('#position0 a:first').attr('href').split('id=')[1])
	else	idcity=parseInt($('#breadcrumbs a[href*=?view=city]').attr('href').split('id=')[1])
	return idcity
}

/**   CONVERSION NUMBER   */
function replaceNum(num) // Parses an int of format 123456 to an string in format 123,456 
{
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
		{string = string.substring(0 , j) + ET_unit.separator + string.substring(j , string.length)}
	return sign + string + multi;
}

/** FUNCTION for LOADING TIME of the PORT
	Store loading time
	
	'ET_waitPort'
		{
			{cityLoad: 45380, dateLoad: 12345678, cityDest: 97342, dateDest: 12578954, nCargo: 30, typ: 'g', eventId:45897623},
			{cityLoad: 67321, dateLoad: 12348756, cityDest: 54087, dateDest: 56324620, nCargo: 20, typ: 't', eventId:45897624}
		}
*/

Array.prototype.sortlvl = function ()	//sort level 
	{
		if (this.length <= 1) {return;}
		for (j=0 ; j < this.length-1 ; j++)
		{
			for (jj=j+1 ; jj< this.length ; jj++)
			{
				if (parseInt(this[j]) < parseInt(this[jj]))
				{
					tmp = this[jj];
					this[jj] = this[j];
					this[j] = tmp
				}
			}
		}
	}

Array.prototype.sortDate = function ()	//from smallest to largest
	{
		if (this.length <= 2) {return;}
		for (j=0 ; j < this.length-1 ; j++)
		{
			for (jj=j+1 ; jj< this.length ; jj++)
			{
				if (this[j].dateLoad > this[jj].dateLoad)
				{
					tmp = this[jj];
					this[jj] = this[j];
					this[j] = tmp
				}
			}
		}
	}

function lastLoadingTime(idcity) // last loading time
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
	wait = eval(localStorage.getItem('ET_waitPort'));
	if (wait == null) wait=[];
	$(wait).each(function(id){if (this.dateDest < curdate) wait.splice(id,1)})	// delete old mission
	localStorage.setItem('ET_waitPort', uneval(wait));	//save	
	if (ctrldate) $(wait).each(function(id){if (this.dateLoad < curdate) wait.splice(id,1)});	// filter for loading date
	return wait;
}
catch(er)
	{infoError("function READLoadingTime ",er)}
}

function SAVELoadingTime(load,typ) // save loading time
{ 
try
{
	var loadingtime = $('#loadTime').attr('value');	//loading time
	if (loadingtime > 0)	// continue for valid loading time
	{
		curdate = getDate()
		var iddest = $('input:hidden[name = destinationCityId]').val()
			
		// Calculate loading date
		//var mis = {};	// save date and type of mission
		var actdate = load.wait < curdate? curdate: load.wait;
		var loadingdate = actdate + loadingtime * 1000;
			
		// Calculate travel date
		var traveltime = $('#journeyTime').attr('value');	//travel time
		// Calculate number of cargo
		var cargo= $('#sumTransporter').text() > 0? $('#sumTransporter').text() : 0;
		if ($('#transporterCount').attr('value')>0) cargo = $('#transporterCount').attr('value');
			
		var mis = {cityLoad: load.id, dateLoad: loadingdate, cityDest: iddest, dateDest: (loadingdate + traveltime * 1000), nCargo: cargo, typ: typ}
		var wait = READLoadingTime(true);	// read date
		wait.push(mis);			// add new date of loading cargo
		wait.sortDate;
		localStorage.setItem('ET_waitPort', uneval(wait));
	}
}
catch(er)
	{infoError("function SAVELoadingTime ",er)}
}

function deleteMission(idcity,nEvent) // erase loading mission
{ 
try
{
	curdate = getDate()
	var wait = READLoadingTime(false);
	for(var jj=0; jj< wait.length; jj++)
	{
		if (wait[jj].eventId == nEvent)
		{
			var datedif = wait[jj].dateLoad - curdate;	// difference in time to the date cleared
			// search date in storege loading time
			for(var j= 0; j < wait.length; j++)
			{
				if (idcity == wait[j].cityLoad)
				{	
					if (jj > j){datedif = wait[jj].dateLoad - wait[j].dateLoad;}	// search other loading cargo before deleting mission
					if (jj < j){wait[j].dateLoad = wait[j].dateLoad - datedif;}		// recalculate freight loading times
				}
			}
			wait.splice(jj,1);			// delete mission
			localStorage.setItem('ET_waitPort', uneval(wait));
			return;
		}
	}
}
catch(er) 				
	{infoError("function deleteMission ",er)}
}

/** FUNCTION for CALCULATE TIME TAVEL */
function calcuPort(mycity)	// Array with idcity + level port + loading speed + wait date
{ 
try
{
	var waitdate = 0;
	var idcity ='';
	if (mycity)	// my port
	{
		idcity = $('#citySelect').attr('value');// Get id of source city
		var lvlport = eval(localStorage.getItem('ET_lvlport'+ idcity));
		if (!lvlport) lvlport = [0];
		waitdate = lastLoadingTime(idcity);
	}
	else		// other port
	{
		lvlport = localStorage.getItem('ET_tradePort')*1;
		localStorage.removeItem('ET_tradePort');
		if (isNaN(lvlport)) lvlport = 0;
	}
			
	// Calculate loading times	   0	 		   5				   10				   15					  20					   25					    30						 35						   40
	const loadingspeed = new Array(10,30,60,93,129,169,213,261,315,373,437,508,586,672,766,869,983,1108,1246,1398,1565,1748,1950,2172,2416,2685,2980,3305,3663,4056,4489,4965,5488,6064,6698,7394,8161,9004,9931,10951,12073,13308);
	// Calculate wait time if port is occupated in other loading
	var lvltot="";
	var loadSp = 0;
	if ($.isArray(lvlport))	// type array is my port - number is other port
	{
		var lvltxt ='';
		var speed = 0;
		$(lvlport).each(function(index, value) { 
			lvltxt += value + '+';
			if (value > 0 && value <= 41) speed += loadingspeed[value]
			else if (value > 41) speed += loadingspeed[41]
		});
		lvltxt = lvltxt.replace(/[+]$/,'');
	}
	else
	{
		speed = lvlport;
		lvltxt = 'xx';
	}
	return {id: idcity, txt: lvltxt, speed: speed, wait: waitdate}
}
catch(er) 				
	{infoError("function calcuPort ",er)}
}

/** COUNTDOWN */
// Countdown of string type '2h 23m 12s'
var ET_t_cnt;
function ET_Counter(pretxt,posttxt,nvrtxt)
{
	var node = document.getElementsByName('ET_cntdw')
	curdate = getDate();
		
	for (var j=0; j< node.length; j++)
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

// Increase time of string type '2h 23m 12s'
var ET_t_inc;
function ET_Increase()
{
	curdate = getDate();
	$('div[name=ET_incTm]').each(function()
	{
		dif = curdate - ($(this).attr('value') *1);
		if( dif > 0)	$(this).text(RealTimetoCounter(dif/1000,2))
	});
}

// Increase Date of string type date '1.gen.2010 22:15'
var ET_t_dt;
function ET_Date(sec) 
{
	curdate = getDate();
	$('span[name=ET_incDate]').each(function()
	{
		var time = $(this).attr('value') *1;
		if(time > 0)	$(this).text(realTimetoDate( curdate + (time*1000),sec))
	});
}