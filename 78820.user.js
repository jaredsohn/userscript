// ==UserScript==
// @name           AntiGam_lang_gr
// @namespace      antikiller
// @description    AntiGame translation - Greek
// @Author         Stealth | sparda-x@hotmail.com
// @version	   1.23.0
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsGR =
	{

		lbl_missAttack: 'Επίθεση',
		lbl_missColony: 'Αποίκιση',
		lbl_missDeploy: 'Παράταξη',
		lbl_missDestroy: 'Καταστροφή Φεγγαριού',
		lbl_missEspionage: 'Κατασκοπεία',
		lbl_missExpedition: 'Αποστολή',
		lbl_missFederation: 'Επίθεση ACS',
		lbl_missHarvest: 'Ανακυκλώστε το πεδίο συντριμμιών',
		lbl_missHold: 'Άμυνα ACS',
		lbl_missTransport: 'Μεταφορά',
		
		lbl_shipSCargo: 'Μικρό Μεταγωγικό',
		lbl_shipLCargo: 'Μεγάλο Μεταγωγικό',
		lbl_shipLFighter: 'Ελαφρύ Μαχητικό',
		lbl_shipHFighter: 'Βαρύ Μαχητικό',
		lbl_shipCruiser: 'Καταδιωκτικό',
		lbl_shipBattleship: 'Καταδρομικό',
		lbl_shipColonizator: 'Σκάφος Αποικιοποίησης',
		lbl_shipRecycler: 'Ανακυκλωτής',
		lbl_shipSpy: 'Κατασκοπευτικό Στέλεχος',
		lbl_shipBomber: 'Βομβαρδιστικό',
		lbl_shipDestroyer: 'Destroyer',
		lbl_shipRIP: 'Deathstar',
		lbl_shipBCruiser: 'Θωρηκτό Αναχαίτισης',
		lbl_shipSatellite: 'Ηλιακοί Συλλέκτες',
		
		lbl_defRLauncher: 'Εκτοξευτής Πυραύλων',
		lbl_defLLaser: 'Ελαφρύ Λέιζερ',
		lbl_defHLaser: 'Βαρύ Λέιζερ',
		lbl_defGauss: 'Κανόνι Gauss',
		lbl_defIon: 'Κανόνι Ιόντων',
		lbl_defPlasma: 'Πυργίσκοι Πλάσματος',
		lbl_defSShield: 'Μικρός Αμυντικός Θόλος',
		lbl_defLShield: 'Μεγάλος Αμυντικός Θόλος',

		lbl_RequiredEnergy: 'Χρειάζεται ενέργεια:',
		
		rx_sendMail: /συγγραφή μηνύματος (.+)\./
		
	}
	
	AntiGame_lang.InterfaceGR =
	{
		opt_languageName: 'Ελληνικά',
	
		opt_title: 'AntiGame Επιλογές',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Άκυρο',
		opt_btnDefault: 'Default',

		opt_language: 'Γλώσσα',
		opt_update_check: 'Έλεγχος για ενημερώσεις',
		opt_thousandSeparator: 'Διαχωριστής πλήθους αριθμών',
		opt_blockAutoComplete: 'Σταμάτημα αυτόματης ολοκλήρωσης στον Firefox',
		
		opt_showDeficient: 'Εμφάνιση πόρων που λείπουν',
		opt_showResources: 'Εμφάνιση εκτεταμένων πληροφοριών πόρων',
		opt_showNames: 'Εμφάνιση ονομάτων από διαστημόπλοια/κτήρια/έρευνες πάνω από τις εικόνες',
		opt_nameColorOn: 'Χρώμα ονόματος: Διαθέσιμο',
		opt_nameColorOff: 'Χρώμα ονόματος: Μη διαθέσιμο',
		opt_nameColorDisabled: 'Χρώμα ονόματος: Δεν υπάρχουν αρκετοί πόροι',
		opt_showConstructionTitle: 'Εμφάνιση κατασκευών στην επισκόπηση',
		opt_shortHeader: 'Απόκρυψη εικόνας πλανήτη',

		opt_uni_SpeedFactor: 'Ταχύτητα του σύμπαντος',
		opt_uni_DFPercent: 'Ποσοστό αξίας στόλου σε πεδίο συντριμμιών',
		opt_uni_DefenseToDF: 'Ποσοστό αξίας άμυνας σε πεδίο συντριμμιών',
		
		opt_timeSetting: 'Ρυθμίσεις ώρας',
		opt_showServerOgameClock: 'Χρήση ρυθμίσεων ώρας του server (πάνω δεξιά)',
		opt_showServerPhalanx: 'Χρήση ρυθμίσεων ώρας για την Φάλαγγα',
		opt_showPageStartTime: 'Εμφάνισε το χρόνο της τελευταίας ανανέωσης σελίδας',
		opt_timeAMPM: 'Χρήση 12ωρου αντί 24ωρου',
		
		opt_timeDontChange: 'Καμία άλλαγή - Αρχικές ρυθμίσεις',
		opt_timeLocal: 'Ρύθμιση σε τοπική ζώνη ώρας',
		opt_timeServer: 'Ρύθμιση με βάση την ώρα του server',

		opt_killTips: 'Να μην εμφανίζονται tooltips',

		opt_showEventList: 'Εμφάνιση των γεγονότων ως λίστα στην επισκόπηση',
		opt_evt_showOnTop: 'Θέση της λίστας με τα γεγονότα',
		opt_evt_showReduced: 'Περιορισμένη λίστα Γεγονότων',
		opt_evt_TimeMode: 'Ώρα/Αντίστροφη Μέτρηση στην περιορισμένη λίστα Γεγονότων',
		opt_evt_noScroll: 'Απενεργοποίηση κύλισης των πλαισίων στα tooltips',
		opt_phalanx_showDebris: 'Εμφάνιση θεωρητικών συντριμμιών στη Φάλαγγα',
		
		opt_galaxyShowRank: 'Εμφάνιση επιπέδων παίκτη/συμμαχίας στον γαλαξία',
		opt_galaxyRankColor: 'Χρώμα των επιπέδων παίκτη/συμμαχίας',
		opt_galaxyDebrisMin: 'Ελάχιστο μέγεθος από συντρίμμια για επισήμανση (0 για να απενεργοποιηθεί)',
		opt_galaxyDebrisColor: 'Χρώμα των επισημανόμενων συντριμμιών',
		opt_galaxyHideMoon: 'Κρύψε την φωτογραφία του φεγγαριού (δείξε το μέγεθος του φεγγαριού αντί της φωτογραφίας)',
		opt_galaxy_Players: 'Επισήμανε τους εξής παίκτες',
		opt_galaxy_PlayerColors: 'Χρώματα για την επισήμανση των παικτών',
		opt_galaxy_Allys: 'Επισήμανε τις εξής συμμαχίες',
		opt_galaxy_AllyColors: 'Χρώματα για την επισήμανση των συμμαχιών',
		opt_galaxy_keepTipsPlanets: 'Διατήρηση tooltips για τους πλανήτες και τα φεγγάρια',
		opt_galaxy_keepTipsDebris: 'Διατήρηση tooltips για τα πεδία των συντριμμιών',
		
		opt_msg_PlunderThreshold: 'Ελάχιστο όριο για λεηλάτηση (x1000)',
		opt_msg_DebrisThreshold: 'Ελάχιστο όριο για συντρίμμια (x1000)',
		opt_msg_foldSmallPlunder: 'Μην ενημερώσεις σχετικά με λεηλάτηση ή συντρίμμια χαμηλότερα από το όριο',
		opt_msg_showPlunder: 'Συμπεριέλαβε την λεηλασία στις αναφορές σχετικά με κατασκοπεία',
		opt_msg_addButtons: 'Πρόσθετα κουμπιά στα μηνύματα',
		opt_msg_fixColors: 'Αλλαγή χρωμάτων στις αναφορές μάχης',
		
		opt_fleet_showCapacity: 'Εμφάνιση χωρητικότητας και ταχύτητας διαστημοπλοίων',
		opt_fleet1_showResCalc: 'Εμφάνιση υπολογιστή πόρων',
		opt_uni_maxPlayerScore: 'Ο δυνατότερος παίκτης έχει πάνω από 5M βαθμούς',
		opt_autocopyCoords: 'Αυτόματη αντιγραφή συντεταγμένων',
		opt_fleet2_setTargetDF: 'Θέσε τον στόχο σε DF αν ο στόλος περιλαμβάνει Ανακυκλωτές',
		opt_fleet2_fixLayout: 'Δημιουργία έκθεσης πληροφοριών πτήσης (σελίδα 2)',
		opt_fleet2_ShortLinks: 'Μικροσύνδεσμοι στόχων (σελίδα 2)',
		opt_fleet2_MoonColor: 'Χρωματισμός φεγγαριών στη λίστα συντομεύσεων',
		opt_fleet2_MoonsToEnd: 'Μετακίνηση φεγγαριών στο τέλος της λίστας συντομεύσεων',
		opt_fleet2_checkProbeCapacity: 'Έλεγχος χωρητικότητας πριν την αναχώρηση',
		
		opt_missionPriority: 'Προτεραιότητα αποστολής',
		
		opt_mvmt_expandFleets: 'Εμφάνισε τα διαστημόπλοια του στόλου και τα φορτία',
		opt_mvmt_showReversal: 'Εμφάνισε τον χρόνο επιστροφής του στόλου',
		
		opt_missAttack: 'Χρώμα αποστολής: Επίθεση',
		opt_missColony: 'Χρώμα αποστολής: Αποίκιση',
		opt_missDeploy: 'Χρώμα αποστολής: Παράταξη',
		opt_missDestroy: 'Χρώμα αποστολής: Καταστροφή',
		opt_missEspionage: 'Χρώμα αποστολής: Κατασκοπεία',
		opt_missExpedition: 'Χρώμα αποστολής: Εκστρατεία',
		opt_missFederation: 'Χρώμα αποστολής: Επίθεση ACS',
		opt_missHarvest: 'Χρώμα αποστολής: Συγκομιδή',
		opt_missHold: 'Χρώμα αποστολής: Άμυνα ΑCS',
		opt_missTransport: 'Χρώμα αποστολής: Μεταφορά',
		opt_msg_addSimButton: 'Πρόσθεση κουμπιών για υποβολή των αναφορών κατασκοπείας στο WebSim',
		
		lbl_missAttack: 'Επίθεση',
		lbl_missColony: 'Αποίκιση',
		lbl_missDeploy: 'Παράταξη',
		lbl_missDestroy: 'Καταστροφή φεγγαριού',
		lbl_missEspionage: 'Κατασκοπεία',
		lbl_missExpedition: 'Εκστρατεία',
		lbl_missFederation: 'Επίθεση ACS',
		lbl_missHarvest: 'Συγκομιδή',
		lbl_missHold: 'Άμυνα ACS',
		lbl_missTransport: 'Μεταφορά',

		lbl_sectionGeneral: 'Γενικές Ρυθμίσεις',
		lbl_sectionUniverse: 'Σύμπαν',
		lbl_sectionTime: 'Ρυθμίσεις ώρας',
		lbl_sectionEventList: 'Λίστα γεγονότων',
		lbl_sectionGalaxy: 'Γαλαξίας',
		lbl_sectionMessages: 'Μηνύματα',
		lbl_sectionFleetDispatch: 'Αποστολή στόλου',
		lbl_sectionFleetMovement: 'Μετακίνηση στόλου',
		
		lbl_optionsNote1: 'Η επιλογή έχει αποθηκευτεί για το συγκεκριμένο σύμπαν',
		
		lbl_resetCoords: 'Επαναφορά - ',
		
		lbl_TotalCapacity: 'Συνολική χωρητικότητα',
		lbl_MinSpeed: 'Ελάχιστη ταχύτητα',
		lbl_ExPoints: 'Βαθμοί Αποστολής',
		lbl_mvmt_Return: 'Ε',
		
		lbl_resources: 'Πόροι',
		lbl_debris: 'Συντρίμμια',
		lbl_total: 'Συνολικά',
		lbl_loot: 'Λάφυρα',
		lbl_metal: 'Μέταλλο',
		lbl_crystal: 'Κρύσταλλο',
		
		lbl_shipSCargoAlt: 'Μικρό Μεταγωγικό',
		lbl_shipLCargoAlt: 'Μεγάλο Μεταγωγικό',
		lbl_shipRecyclerAlt: 'Ανακυκλωτής',
		lbl_shipSatelliteAlt: 'Η.Σ.',
		
		lbl_deficientRes: 'Έλλειψη πόρων',
		lbl_Production: 'Παραγωγή',
		lbl_ArrivalACS: 'Άφιξη ACS',
		
		lbl_btnMarkReadAll: 'Σημείωσε όλα τα μηνύματα ως διαβασμένα',
		lbl_btnDeleteSmallPlunder: 'Διαγραφή κατασκοπευτικών αναφορών με λάφυρα < $plunder και συντρίμμια < $debris',
		
		lbl_Moon: 'φεγγάρι',
		
		lbl_onTop: 'Στην κορυφή της σελίδας',
		lbl_onBottom: 'Στο τέλος της σελίδας',
		lbl_onLeft: 'Στα αριστερά',

		lbl_installNewVersion: 'Κάντε κλικ για εγκατάσταση νέας έκδοσης',
		lbl_Save: 'Αποθήκευση',
		lbl_Clear: 'Καθαρισμός',
		lbl_Quantity: 'Ποσότητα',
		lbl_Duration: 'Διάρκεια',
		lbl_Consumption: 'Κατανάλωση',
		
		lbl_tmTime: 'Χρόνος',
		lbl_tmCountdown: 'Αντίστροφη μέτρηση'
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