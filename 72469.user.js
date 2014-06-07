// ==UserScript==



// @name           AntiGam_lang_it



// @namespace      http://userscripts.org/scripts/show/72469



// @description    Traduzione Italiana di Antigame (da far eseguire PRIMA di AntiGame)



// @version	   1.26



// @include        http://*.ogame.*/game/index.php?page=*



// ==/UserScript==







(function () {



	var AntiGame_lang = {};







	AntiGame_lang.LabelsIT =

	{

		lbl_missAttack: 'Attacco',

		lbl_missColony: 'Colonizzazione',

		lbl_missDeploy: 'Schieramento',

		lbl_missDestroy: 'Distruzione Luna',

		lbl_missEspionage: 'Spionaggio',

		lbl_missExpedition: 'Spedizione',

		lbl_missFederation: 'Attacco Federale',

		lbl_missHarvest: 'Riciclaggio',

		lbl_missHold: 'Difesa Federale',

		lbl_missTransport: 'Trasporto',

		

		lbl_shipSCargo: 'Cargo Leggero',

		lbl_shipLCargo: 'Cargo Pesante',

		lbl_shipLFighter: 'Caccia Leggero',

		lbl_shipHFighter: 'Caccia Pesante',

		lbl_shipCruiser: 'Incrociatore',

		lbl_shipBattleship: 'Nave da Battaglia',

		lbl_shipColonizator: 'Colonizzatrice',

		lbl_shipRecycler: 'Riciclatrice',

		lbl_shipSpy: 'Sonda Spia',

		lbl_shipBomber: 'Bombardiere',

		lbl_shipDestroyer: 'Corazzata',

		lbl_shipRIP: 'Morte Nera',

		lbl_shipBCruiser: 'Incrociatore da Battaglia',

		lbl_shipSatellite: 'Satellite Solare',

                lbl_shipSatelliteAlt: 'Sat.',

		

		lbl_defRLauncher: 'Lanciamissili',

		lbl_defLLaser: 'Laser Leggero',

		lbl_defHLaser: 'Laser Pesante',

		lbl_defGauss: 'Cannone di Gauss',

		lbl_defIon: 'Cannone Ionico',

		lbl_defPlasma: 'Cannone al Plasma',

		lbl_defSShield: 'Cupola Scudo',

		lbl_defLShield: 'Cupola Scudo Potenziata',



		lbl_RequiredEnergy: 'Energia necessaria',

		

		rx_sendMail: /Send a message to (.+)\./

		

	}



	AntiGame_lang.InterfaceIT =

	{

		opt_languageName: 'Italiano',

	

		opt_title: 'Opzioni di AntiGame',

		opt_btnOk: 'OK',

		opt_btnCancel: 'Annulla',

		opt_btnDefault: 'Default',



		opt_language: 'Lingua',

		opt_update_check: 'Controllo automatico aggiornamenti',

		opt_thousandSeparator: 'Separatore delle migliaia',

		opt_blockAutoComplete: 'Blocca l\'autocompletamento in Firefox',

		

		opt_showDeficient: 'Mostra le risorse mancanti',

		opt_showResources: 'Mostra informazioni estese sulle risorse',

		opt_showNames: 'Mostra i nomi di navi/costruzioni/ricerche sulle immagini',

		opt_nameColorOn: 'Colore per: disponibile',

		opt_nameColorOff: 'Colore per: non disponibile',

		opt_nameColorDisabled: 'Colore per: risorse insufficienti',

		opt_showConstructionTitle: 'Mostra il nome della costruzione nella lista pianeti',

		opt_shortHeader: 'Riduci sempre l\'immagine dei pianeti',

		opt_misc_scrollTitle: 'Mostra l\'orario del prossimo evento nel titolo della finestra',



		opt_uni_reDesigned: 'Vecchio universo con il re-design installato',

		opt_uni_SpeedFactor: 'Fattore di velocità di questo universo',

		opt_uni_DFPercent: 'Percentuale di flotta nel Campo Detriti',

		opt_uni_DefenseToDF: 'Percentuale di difese nel Campo Detriti',

		

		opt_timeSetting: 'Cambia le impostazioni dell\'orario (solo per le ore)',

		opt_showServerOgameClock: 'Mantieni l\'ora del server nell\'orologio in alto a destra di Ogame',

		opt_showServerPhalanx: 'Mantieni l\'ora del server nella visuale Falange',

		opt_showPageStartTime: 'Mostra l\'orario in cui la pagina è stata aggiornata l\'ultima volta',

		opt_timeAMPM: 'Usa il formato 12 ore (AM/PM) al posto di quello 24 ore',

		

		opt_timeDontChange: 'Non cambiare l\'orario',

		opt_timeLocal: 'Imposta sempre il fuso orario locale',

		opt_timeServer: 'Imposta sempre il fuso orario del server',



		opt_killTips: 'Nascondi i suggerimenti',



		opt_showEventList: 'Mostra la lista eventi nel Riepilogo',

		opt_evt_showOnTop: 'Posizione della lista eventi sullo schermo',

		opt_evt_showReduced: 'Lista eventi ridotta',

		opt_evt_TimeMode: 'Orario o conto alla rovescia di default nella Lista Eventi ridotta',

		opt_evt_noScroll: 'Nascondi le barre di scorrimento quando sono visualizzati i suggerimenti',

                opt_phalanx_showDebris: 'Mostra i detriti teorici nella vista Falange',

		opt_evt_expandFleetsEvt: 'Mostra la composizione di flotta e le risorse trasportate (Lista Eventi)',

		opt_evt_expandFleetsPhal: 'Mostra la composizione di flotta e le risorse trasportate (Falange)',

		

		opt_galaxyShowRank: 'Mostra la posizione in classifica del giocatore/alleanza nella visuale galassia',

		opt_galaxyRankColor: 'Colore della posizione in classifica del giocatore/alleanza',

		opt_galaxyDebrisMin: 'Dimensione minima del campo detriti da evidenziare (0 per disabilitarlo)',

		opt_galaxyDebrisColor: 'Colore del campo detriti evidenziato',

		opt_galaxyHideMoon: 'Nascondi l\'immagine della Luna (mostra la dimensione al suo posto)',

		opt_galaxy_Players: 'Evidenzia i seguenti giocatori',

		opt_galaxy_PlayerColors: 'Colori da usare per evidenziare i giocatori',

		opt_galaxy_Allys: 'Evidenzia le seguenti alleanze',

		opt_galaxy_AllyColors: 'Colori da usare per evidenziare le alleanze',

		opt_galaxy_keepTipsPlanets: 'Mantieni i suggerimenti per pianeti e lune',

		opt_galaxy_keepTipsDebris: 'Mantieni i suggerimenti per i campi detriti',

		

		opt_msg_PlunderThreshold: 'Valore minimo per il saccheggio teorico (x1000)',

		opt_msg_DebrisThreshold: 'Valore minimo per i detriti teorici (x1000)',

		opt_msg_foldSmallPlunder: 'Elimina i rapporti con saccheggio e campo detriti inferiori al minimo',

		opt_msg_showPlunder: 'Mostra il saccheggio nei rapporti di spionaggio',

		opt_msg_addButtons: 'Pulsanti aggiuntivi nei messaggi',

		opt_msg_fixColors: 'Correggi i colori dei rapporti di combattimento',

		

		opt_fleet_showCapacity: 'Mostra la stiva e la velocità delle navi',

		opt_fleet1_showResCalc: 'Mostra il calcolatore di risorse',

		opt_uni_maxPlayerScore: 'Il giocatore più forte ha più di 5M punti',

		opt_autocopyCoords: 'Copia automatica delle coordinate',

		opt_autocopyGlobal: 'Memorizza le coordinate da qualunque pagina (non solo dalla scheda del corrente universo di Ogame)',

		opt_fleet2_setTargetDF: 'Imposta l\'obiettivo a Campo detriti se la flotta include riciclatrici',

		opt_fleet2_fixLayout: 'Correggi l\'impostazione delle informazioni di volo (pagina 2)',

		opt_fleet2_ShortLinks: 'Collegamento rapido all\'obiettivo (pagina 2)',

                opt_fleet2_MoonsToEnd: 'Sposta le lune alla fine della lista scorciatoie',

                opt_fleet2_expandLists: 'Espandi i menu a tendina (Velocità, Scorciatoie, ACS)',

		opt_fleet2_MoonColor: 'Colore delle lune nella lista scorciatoie',

		opt_fleet2_checkProbeCapacity: 'Verifica la capacità delle sonde spia prima dell\'invio (pagina 2)',

		

		opt_missionPriority: 'Priorità della missione',

		

		opt_mvmt_expandFleets: 'Mostra le navi della flotta',

		opt_mvmt_showReversal: 'Mostra il conto alla rovescia per le flotte',

		

		opt_missAttack: 'Colore della missione: Attacco',

		opt_missColony: 'Colore della missione: Colonizzazione',

		opt_missDeploy: 'Colore della missione: Schieramento',

		opt_missDestroy: 'Colore della missione: Distruzione',

		opt_missEspionage: 'Colore della missione: Spionaggio',

		opt_missExpedition: 'Colore della missione: Spedizione',

		opt_missFederation: 'Colore della missione: Federazione',

		opt_missHarvest: 'Colore della missione: Riciclaggio',

		opt_missHold: 'Colore della missione: Stazionamento',

		opt_missTransport: 'Colore della missione: Trasporto',

		opt_msg_addSimButton: 'Aggiungi i pulsanti per inviare il rapporto di spionaggio a WebSim',

		

		lbl_missAttack: 'Attacco',

		lbl_missColony: 'Colonizzazione',

		lbl_missDeploy: 'Schieramento',

		lbl_missDestroy: 'Distruzione Luna',

		lbl_missEspionage: 'Spionaggio',

		lbl_missExpedition: 'Spedizione',

		lbl_missFederation: 'Attacco Federale',

		lbl_missHarvest: 'Riciclaggio',

		lbl_missHold: 'Difesa Federale',

		lbl_missTransport: 'Trasporto',



		lbl_sectionGeneral: 'Generale',

		lbl_sectionUniverse: 'Universo',

		lbl_sectionTime: 'Impostazioni orario',

		lbl_sectionEventList: 'Lista Eventi',

		lbl_sectionGalaxy: 'Galassia',

		lbl_sectionMessages: 'Messaggi',

		lbl_sectionFleetDispatch: 'Invio della flotta',

		lbl_sectionFleetMovement: 'Movimenti di flotta',

		

		lbl_optionsNote1: 'L\'opzione viene memorizzata solo per questo universo',

		

		lbl_resetCoords: 'Annulla - ',

		

		lbl_TotalCapacity: 'Capacità Totale',

		lbl_MinSpeed: 'Velocità minima',

		lbl_ExPoints: 'Punti spedizione',

		lbl_mvmt_Return: 'R',

		

		lbl_resources: 'Risorse',

		lbl_debris: 'Detriti',

		lbl_total: 'Totale',

		lbl_loot: 'Bottino',

		lbl_metal: 'Metallo',

		lbl_crystal: 'Cristallo',

		

		lbl_shipSCargoAlt: 'CL',

		lbl_shipLCargoAlt: 'CP',

		lbl_shipRecyclerAlt: 'Recy',

		

		lbl_deficientRes: 'Risorse mancanti',

		lbl_Production: 'Produzione',

		lbl_ArrivalACS: 'Arrivo (ACS)',

		

		lbl_btnMarkReadAll: 'Segna tutti i messaggi visualizzati come letti',

		lbl_btnDeleteSmallPlunder: 'Cancella i rapporti di spionaggio con saccheggio < di $plunder e detriti < di $debris',

		

		lbl_Moon: 'Luna',

		

		lbl_onTop: 'In alto',

		lbl_onBottom: 'In basso',

		lbl_onLeft: 'A sinistra',

		

		lbl_installNewVersion: 'Clicca per installare la nuova versione',

		lbl_Save: 'Salva',

		lbl_Clear: 'Azzera',

		lbl_Quantity: 'Quantità',

		lbl_Duration: 'Durata',

		lbl_Consumption: 'Consumo',

		

		lbl_tmTime: 'Orario',

		lbl_tmCountdown: 'Conto alla rovescia'

	}

	



	// -------------------------------



	// Don't modify the code below







	var mywindow;



	try { mywindow = unsafeWindow; }



	catch (e) { mywindow = window; }



	



	if (!mywindow.AntiGame_lang)



		mywindow.AntiGame_lang = AntiGame_lang;



	else



		for (var i in AntiGame_lang)



			mywindow.AntiGame_lang[i] = AntiGame_lang[i];







}) ()