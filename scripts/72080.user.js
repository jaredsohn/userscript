// ==UserScript==
// @name            OGame Hellenic Translation of Redesign Servers
// @namespace       
// @description     Μετάφραση των redesign ogame server από τα Αγγλικά στα Ελληνικά
// @description     Version 1.6
// @author          Δημιουργήθηκε από τον Dahakaa
// @homepage        http://userscripts.org/scripts/show/72080
// @version         1.6
// @versiontext     1.6 - 11/5/2010 - Βελτιώσεις μεταφράσεων + αναδιαμόρφωση κώδικα
// @versiontext     1.5 - 13/4/2010 - Βελτιώσεις μεταφράσεων + αλλαγή αυτόματης ενημέρωσης
// @versiontext     1.4 - 22/3/2010 - Βελτιώσεις μεταφράσεων + δοκιμή ενημερώσεων
// @versiontext     1.3 - 22/3/2010 - Προσθήκη κώδικα ενημέρωσης script
// @versiontext     1.2 - 22/3/2010 - Βελτιώσεις κώδικα + 
// @versiontext     1.1 - 22/3/2010 - Βελτιώσεις κώδικα
// @versiontext     1.0 - 21/3/2010 - Αρχική έκδοση
// @include         http://*ogame.*
// @include         http://*ogame.org*
// @exclude         http://board*
// @require         http://userscripts.org/scripts/source/57756.user.js
// ==/UserScript==

ScriptUpdater.check(65261, '1.00');  


var strings = {
// English translations
	"*New*" : "*ΝΕΟ*",
// Α
	"Activity" : "Δραστηριότητα",
	"Address Book" : "Βιβλίο Διευθύνσεων",
	"Advanced researches" : "Προχωρημένες έρευνες",
	"Alliance" : "Συμμαχία",
	"Alliance Depot" : "Σταθμός Συμμαχίας",
	"all players" : "όλοι οι παίκτες",
	"ANAX" : "ΑΝΑΞ",
	"ANAX TIMHS ENEKEN" : "ΑΝΑΞ Τιμής Ένεκεν",
	"Answer" : "Απάντηση",
	"Anti-Ballistic Missiles" : "Αντιβαλλιστικοί Πύραυλοι",
	"Applications" : "Αιτήσεις",
	"Armour:" : "Θωράκιση",
	"Armour" : "Θωράκιση",
	"Armour Technology" : "Τεχνολογία Θωράκισης",
	"Astrophysics" : "Αστροφυσική",
	"Attack Strength" : "Ισχύς Επίθεσης",

// Β
	"Back" : "Πίσω",
	"Battlecruiser" : "Θωρηκτό Αναχαίτισης",
	"Battleship" : "Καταδρομικό",
	"Basic Income" : "Βασικό Εισόδημα",
	"Basic research" : "Βασικές έρευνες",
	"Board" : "Φόρουμ",
	"Bomber" : "Βομβαρδιστικό",
	"Buddies" : "Φίλοι",
	"Buddy request" : "Αίτηση φιλίας",
	"BUILDINGS" : "ΚΤΙΡΙΑ",
	"Buildings" : "Κτίρια",
	"Building" : "Κτίρια",
	"buildings" : "κτίρια",
// C
	"Cargo Capacity" : "Χωρητικότητα Φορτίου",
	"Circular message" : "Κυκλικό μήνυμα",
	"Chance of counter-espionage:" : "Πιθανότητα αντικατασκοπείας:",
	"Civil ships" : "Βοηθητικά πλοία",
	"Clock" : "Ρολόι",
	"Colony" : "Αποικία",
	"Colony Ship" : "Σκάφος Αποίκησης",
	"Colonization" : "Αποίκιση",
	"Construction" : "Κατασκευή",
	"Combustion Drive" : "Προώθηση Καύσεως",
	"Combat Report" : "Αναφορά μάχης",
	"Combat research" : "Έρευνες μάχης",
	"Combat at planet" : "Μάχη στον πλανήτη",
	"Combat ships" : "Μαχητικά πλοία",
	"Communication" : "Επικοινωνία",
	"Computer Technology" : "Τεχνλογία υπολογιστών",
	"Coords" : "Συντεταγμένες",
	"Cruiser" : "Καταδιωκτικό",
	"Crystal" : "Κρύσταλλο",
	"Crystal:" : "Κρύσταλλο:",
	"Crystal Mine" : "Ορυχείο Κρυστάλλου",
	"Crystal Storage" : "Αποθήκη Κρυστάλλου",
// D
	"Date:" : "Ημερομηνία:",
	"Defense" : "Άμυνα",
	"delete" : "διαγραφή",
	"Delete this message" : "διαγραφή του μηνύματος",
	"Deuterium" : "Δευτέριο",
	"Deuterium:" : "Δευτέριο:",
	"Deuterium Synthesizer" : "Συνθέτης Δευτέριου",
	"Deuterium Tank" : "Δεξαμενή Δευτέριου",
	"DIAGALAKSIAKH SYNOMOSPONDIA E:" : "Διαγαλαξιακή Συνομοσπονδία Ε",
	"Difference" : "Διαφορά",
	"DRAW" : "Ισοπαλία",
	"DIOIKHTHS MONADWN MAXHS" : "ΔΙΟΙΚΗΤΗΣ ΜΟΝΑΔΩΝ ΜΑΧΗΣ",
	"Drive research:" : "Έρευνες μηχανών",
	"Duration:" : "Διάρκεια",
// E
	"Events" : "Γεγονότα",
	"ELLANIOS" : "ΕΛΛΑΝΙΟΣ",
	"ELLANIOS TIMHS ENEKEN" : "ΕΛΛΑΝΙΟΣ Τιμής Ένεκεν",
	"elefsis_epsilon" : "Έλευσις Έψιλον",
	"Energy" : "Ενέργεια ",
	"Energy:" : "Ενέργεια:",
	"Energy Consumption" : "Κατανάλωση Ενέργειας ",
	"Energy Technology" : "Τεχνολογία ενέργειας",
	"EPSILON" : "ΕΨΙΛΟΝ",
	"Espionage action" : "Δράση κατασκοπείας",
	"Espionage Probe" : "Κατασκοπευτικό Στέλεχος",
	"Espionage Technology" : "Τεχνολογία Κατασκοπείας",
	"External Area" : "Εξωτερική Περιοχή",
	"Expeditions" : "Αποστολές:",
// F
	"Facilities" : "Εγκαταστάσεις",
	"Facility buildings" : "Κτήρια υποστήριξης",
	"Fleet" : "Στόλος",
	"Fleets" : "Στόλοι",
	"fleets" : "Στόλοι",
	"fleet movement" : "μετακίνηση στόλου",
	"Friendly missions:" : "Φιλικές αποστολές: ",
	"From:" : "Από",
	"from:" : "από",
	"Fuel usage (Deuterium)" : "Κατανάλωση καύσιμου (Δευτέριο)",
	"Fusion Reactor" : "Αντιδραστήρας Σύντηξης",
// G
	"Galaxy" : "Γαλαξίας",
	"Gigantic solar arrays are used to generate power for the mines and the deuterium synthesizer. As the solar plant is upgraded, the surface area of the photovoltaic cells covering the planet increases, resulting in a higher energy output across the power grids of your planet." : "Γιγάντια εργοστάσια ηλιακής ενέργειας χρησιμοποιούνται για να τροφοδοτήσουν με ενέργεια τα ορυχεία και το συνθέτη δευτέριου. Καθώς το ηλιακό εργοστάσιο αναβαθμίζεται, η επιφάνεια των φωτοβολταϊκών κυττάρων που καλύπτουν τον πλανήτη αυξάνεται και ως αποτέλεσμα, παράγει περισσότερη ενέργεια. Τα εργοστάσια ηλιακής ενέργειας αποτελούν τη βάση της πλανητικής παροχής ενέργειας.",
	"Gauss Cannon" : "Κανόνι Gauss",
	"Graviton Technology" : "Τεχνολογία Βαρυόνιων",
// H
	"Heavy Fighter" : "Βαρύ Μαχητικό",
	"Heavy Laser" : "Βαρύ Λέιζερ",
	"Highscore" : "Βαθμολογία",
	"Homepage:" : "Αρχική σελίδα:",
	"Hostile missions:" : "Εχθρικές αποστολές: ",
	"HMITHEOS" : "ΗΜΙΘΕΟΣ",
	"HRWAS" : "ΗΡΩΑΣ",
	"HRWAS TIMHS ENEKEN" : "ΗΡΩΑΣ Τιμής Ένεκεν",
	"Help" : "Βοήθεια",
	"Hyperspace Drive" : "Υπερδιαστημική Προώθηση",
	"Hyperspace Technology" : "Υπερδιαστημική Τεχνολογία",
// I
	"Idritis" : "Ιδρυτής",
	"Improve to" : "Βελτίωση σε ",
	"Impulse Drive" : "Ωστική Προώθηση",
	"Inbox" : "Εισερχόμενα",
	"Internal Area" : "Εσωτερική περιοχή",
	"Intergalactic Research Network" : "Διαγαλαξιακό Δίκτυο Έρευνας",
	"Interplanetary Missiles" : "Διαπλανητικοί Πύραυλοι",
	"Ion Cannon" : "Κανόνι Ιόντων",
	"Ion Technology" : "Τεχνολογία Ιόντων",
// J
	"Jump Gate" : "Διαγαλαξιακή Πύλη",
	"Joined" : "Έγινε μέλος",
// K
// L
	"L.Cargo" : "Μεγ. Μεταγωγικό",
	"L.Fighter" : "Ελ. Μαχητικό",
	"Laser Technology" : "Τεχνολογία Λέιζερ",
	"Leave alliance" : "Εγκατέλειψε συμμαχία",
	"Level" : "Επίπεδο",
	"Large Cargo" : "Μεγάλο Μεταγωγικό",
	"Large Shield Dome" : "Μεγάλος Αμυντικός Θόλος",
	"Light Fighter" : "Ελαφρύ Μαχητικό",
	"Light Laser" : "Ελαφρύ Λέιζερ",
	"Lost units:" : "Μονάδες που χάθηκαν:",
	"load" : "φόρτωση...",
	"Loxias" : "Λοχίας",
	"Log out" : "Αποσύνδεση",
	"Lunar Base" : "Σεληνιακή Βάση",
// M
	"Mail text" : "Κείμενο μηνύματος",
	"Management" : "Διαχείρηση",
	"Member:" : "Μέλοι:",
	"Member List" : "Λίστα Μελών",
	"Merchant" : "Έμπορος",
	"Metal" : "Μέταλλο",
	"Metal:" : "Μέταλλο:",
	"Metal Mine" : "Ορυχείο Μετάλλου",
	"Metal Storage" : "Αποθήκη Μετάλλου",
	"Messages" : "Μηνύματα",
	"Message" : "Αποστολή Μηνύματος",
	"Missile Silo" : "Σιλό Πυραύλων",
	"μόνο η βαθμίδα: ANAX" : "Σιλό Πυραύλων",
	"μόνο η βαθμίδα: ANAX TIMHS ENEKEN" : "μόνο η βαθμίδα: ΑΝΑΞ ΤΙΜΉΣ ΈΝΕΚΕΝ",
	"μόνο η βαθμίδα: DIOIKHTHS MONADWN MAXHS" : "μόνο η βαθμίδα:  ΔΙΟΙΚΗΤΉΣ ΜΟΝΑΔΩΝ ΜΑΧΗΣ",
	"μόνο η βαθμίδα: ELLANIOS" : "μόνο η βαθμίδα: ΕΛΛΑΝΙΟΣ",
	"μόνο η βαθμίδα: ELLANIOS TIMHS ENEKEN" : "μόνο η βαθμίδα: ΕΛΛΑΝΙΟΣ ΤΙΜΉΣ ΈΝΕΚΕΝ",
	"μόνο η βαθμίδα: HMITHEOS" : "μόνο η βαθμίδα: ΗΜΙΘΕΟΣ",
	"μόνο η βαθμίδα: HRWAS" : "μόνο η βαθμίδα: ΗΡΩΑΣ",
	"μόνο η βαθμίδα: HRWAS TIMHS ENEKEN" : "μόνο η βαθμίδα: ΗΡΩΑΣ ΤΙΜΉΣ ΈΝΕΚΕΝ",
	"μόνο η βαθμίδα: OLYMPIOS" : "μόνο η βαθμίδα: ΟΛΥΜΠΙΟΣ",
	"μόνο η βαθμίδα: POLEMISTHS" : "μόνο η βαθμίδα: ΠΟΛΕΜΙΣΤΗΣ",
	"μόνο η βαθμίδα: se diakopes" : "μόνο η βαθμίδα: Σε διακοπές",
	"μόνο η βαθμίδα: syndiaxeirisths" : "μόνο η βαθμίδα: Συνδιαχειριστής",
	"μόνο η βαθμίδα: Synidrytis" : "μόνο η βαθμίδα: Συνιδρυτής",
	"μόνο η βαθμίδα: WN" : "μόνο η βαθμίδα: ΩΝ",
	"μόνο η βαθμίδα: YPEYTHINOS DHMOSIWN SXESEWN" : "μόνο η βαθμίδα: ΥΠΕΥΘΥΝΟΣ ΔΗΜΟΣΙΩΝ ΣΧΕΣΕΩΝ",
	"μόνο η βαθμίδα: YPEYTHINOS EPIKOINWNIWN" : "μόνο η βαθμίδα:  	ΥΠΕΥΘΥΝΟΣ ΕΠΙΚΟΙΝΩΝΙΩΝ",
// N
	"Name" : "Όνομα",
	"Name:" : "Όνομα:",
	"Nanite Factory" : "Εργοστάσιο Νανιτών",
	"Next" : "Επόμενο",
	"No fleet movement" : "ΚΑΜΙΑ ΚΙΝΗΣΗ ΣΤΟΛΟΥ",
	"No messages found" : "Δεν βρέθηκαν μηνύματα",
	"No requirements available" : "Δεν υπάρχουν διαθέσιμες απαιτήσεις.",
	"No ships/defense are being built at the moment." : "Δεν κατασκευάζονται πλοία / άμυνες προς το παρόν.",
	"Notes" : "Σημειώσεις",
	"Number of missiles" : "Αριθμός πυραύλων",
// O
	"OLYMPIOS" : "ΟΛΥΜΠΙΟΣ",
	"only rank: Loxias" : "Μόνο η Βαθμίδα: Λοχίας",
	"only rank: Sinidritis" : "Μόνο η Βαθμίδα: Συνιδριτής",
	"only rank: Stratigos" : "Μόνο η Βαθμίδα: Στρατιγός",
	"only rank: Stratiotis" : "Μόνο η Βαθμίδα: Στρατιώτης",
	"Options" : "Επιλογές",
	"Overview" : "Επισκόπηση",
	"Overview -" : "Επισκόπηση -",
	"Own fleet" : "Ο στόλος σας",
	"Own Missions:" : "Δικές σας Αποστολές: ",
// P
	"Planets" : "Πλανήτες",
	"Planet" : "Πλανήτης",
	"planet" : "πλανήτης",
	"Plasma Technology" : "Τεχνολογία Πλάσματος",
	"Plasma Turret" : "Πυργίσκοι Πλάσματος",
	"Player:" : "Παίκτης:",
	"Player: " : "Παίκτης: ",
	"POLEMISTHS" : "ΠΟΛΕΜΙΣΤΗΣ",
	"primary target:" : "Κύριος στόχος",
	"Production duration" : "Διάρκεια παραγωγής",
	"Production " : "Διάρκεια παραγωγής",
	"Production/h" : "Παραγωγή/ώρα",
// Q

// R
	"R.Launcher" : "Εκτ.Ρουκετών",
	"Rank" : "Βαθμός",
	"rank" : "Κατάταξη",
	"Rapidfire from" : "Rapidfire από",
	"Recalculate" : "Επανυπολογισμός",
	"Recycle bin" : "Κάδος ανακύκλωσης",
	"Recycler" : "Ανακυκλωτής",
	"Recruit Officers" : "Λέσχη Αξιοματικών",
	"Required" : "Απαιτείται",
	"Resource buildings" : "Κτήρια πόρων",
	"Resources" : "Πόροι",
	"Resource settings" : "Ρυθμίσεις Πόρων",
	"Research" : "Έρευνα",
	"Research Lab" : "Εργαστήριο Ερευνών",
	"Robotics Factory" : "Εργοστάσιο Ρομποτικής",
	"Rocket Launcher" : "Εκτοξευτής Πυραύλων",
	"Rules" : "Κανόνες",
// S
	"S.Cargo" : "Μικ Μεταγωγικό",
	"se diakopes" : "Σε διακοπές",
	"Search" : "Αναζήτηση",
	"Select mission for target:" : "Αναζήτηση",
	"Send" : "Αποστολή",
	"Send a circular message to all alliance members" : "Στείλτε ένα κυκλικό μήνυμα σε όλα τα μέλη της συμμαχίας",
	"Sender" : "Αποστολέας",
	"Sensor Phalanx" : "Αισθητήρας Φάλαγγας",
	"Shield Strength" : "Ισχύς Ασπίδας",
	"Shielding Technology" : "Τεχνολογία Ασπίδων",
	"Shields" : "Ασπίδες",
	"Shields:" : "Ασπίδες",
	"Ships/Defence:" : "Πλοία/Άμυνες",
	"Shipyard" : "Ναυπηγείο",
	"Small Cargo" : "Μικρό Μεταγωγικό",
	"Small Shield Dome" : "Μικρός Αμυντικός Θόλος",
	"Solar Plant" : "Εργοστάσιο Ηλιακής Ενέργειας",
	"Solar Satellite" : "Ηλιακοί Συλλέκτες",
	"Statistic" : "Στατιστικά",
	"Speed" : "Ταχύτητα",
	"Storage capacity" : "Αποθηκευτική ικανότητα",
	"Stratiotis" : "Στρατιώτης",
	"Structural Integrity" : "Κατασκευαστική Συνοχή",
	"Subject:" : "Θέμα:",
	"Sinidritis" : "Συνιδρυτής",
	"Synidrytis" : "Συνιδρυτής",
	"syndiaxeirisths" : "Συνδιαχειριστής",
	"System" : "Σύστημα",
// T
	"Techinfo" : "Πληροφορίες τεχνολογίας",
	"Techinfo about - Crystal Mine" : "Τεχνικές πληροφορίες για - Ορυχείο Κρυστάλλου",
	"Technical data" : "Τεχνικά στοιχεία",
	"Technology" : "Τεχνολογία",
	"Techtree" : "Τεχνολογίες",
	"The battle ended in a draw, both fleets withdraw to their home planets." : "Η μάχη έληξε ισόπαλη. Οι στόλοι επιστρέφουν στους πλανήτες τους.",
	"There are no buildings in the queue!" : "Δεν υπάρχουν κτήρια στην σειρά κατασκευής!",
	"To:" : "Προς:",
	"Total" : "Σύνολο",
	"Type:" : "Τύπος:",
// U
// V
// W
	"Weapons" : "Όπλα",
	"Weapons Technology" : "Τεχνολογία Όπλων",
	"WN" : "ΩΝ",
// X
// Y
	"Your alliance" : "Η συμμαχία σας",
	"Your Rank:" : "Ο Βαθμός Σας:",
	"Your navigator made a grave error in his computations that caused the expeditions jump to be miscalculated. " : "Ο στόλος θα καθυστερήσει",
	"YPEYTHINOS DHMOSIWN SXESEWN" : "ΥΠΕΥΘΥΝΟΣ ΔΗΜΟΣΙΩΝ ΣΧΕΣΕΩΝ",
	"YPEYTHINOS EPIKOINWNIWN" : "ΥΠΕΥΘΥΝΟΣ ΕΠΙΚΟΙΝΩΝΙΩΝ",
// Z
// English Techinfo translations
//Fleet
	"Once it became apparent that the cruiser was losing ground to the increasing number of defense structures it was facing, and with the loss of ships on missions at unacceptable levels, it was decided to build a ship that could face those same type of defense structures with as little loss as possible. After extensive development, the Battleship was born. Built to withstand the largest of battles, the Battleship features large cargo spaces, heavy cannons, and high hyperdrive speed. Once developed, it eventually turned out to be the backbone of every raiding Emperors fleet." : "Τα καταδρομικά είναι η ραχοκοκαλιά ενός στόλου. Τα βαριά κανόνια τους, η μεγάλη τους ταχύτητα και η μεγάλη χωρητικότητα φορτίου τους, τα κάνει αντίπαλους που δεν πρέπει να παίρνονται στα αστεία.",
	"This ship is one of the most advanced fighting ships ever to be developed, and is particularly deadly when it comes to destroying attacking fleets. With its improved laser cannons on board and advanced Hyperspace engine, the Battlecruiser is a serious force to be dealt with in any attack. Due to the ships design and its large weapons system, the cargo holds had to be cut, but this is compensated for by the lowered fuel consumption.:" : "Το σκάφος αυτό, μια πραγματική τεχνολογική καινοτομία, είναι ένα θανατηφόρο όπλο όταν πρόκειται να καταστρέψει τους επιτιθέμενους στόλους. Με τα βελτιωμένα κανόνια λείζερ και με την εξελιγμένη υπερδιαστημική μηχανή, το σκάφος παρέχει μία κρίσιμη δύναμη για κάθε επίθεση. Χάρη στην ευέλικτη σχεδίαση του και στη τεράστια δύναμη πυρός του, το διαθέσιμο μεταφερόμενο φορτίο του είναι μικρό, αλλά αυτό εξισορροπείται με τη μικρή κατανάλωση καυσίμων.",
	"Your espionage does not show abnormalities in the atmosphere of the planet. There appears to have been no activity on the planet within the last hour." : "Δεν εμφανίζει σημάδια δραστηριότητας την τελευταία ώρα. Ύποπτο ή όχι, εσύ θα το κρίνεις",
	
	
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*)Level 1(\\s*)$"] = "$1 σύμμαχοι";
regexps["^Active wars in (.*)$"] = "Ενεργοί πολέμοι σε $1:";
regexps["^Active resistance wars in (.*)$"] = "Ενεργοί πόλεμοι αντίστασης στην $1:";
regexps["(\\s*)Expires in (\\d*) days"] = "Λήγει σε $2 μέρες";
regexps["(\\s*)Expires in (\\d*) hours"] = "Λήγει σε $2 ώρες";
regexps["^(\\d*) comments$"] = "$1 σχόλια";
regexps["^(\\d*) hours ago$"] = "$1 ώρες πρίν";
regexps["^(\\d*) minutes ago$"] = "$1 λεπτά πρίν";
regexps["^(\\d*) days ago$"] = "$1 μέρες πρίν";
regexps["^(\\d*) months ago$"] = "$1 μήνες πρίν";
regexps["^Regions \\((\\d*)\\)"] = "Περιοχές ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Φίλοι ($1)";
regexps["^(\\d*) months"] = "$1 μήνες";
regexps["^Comments(.*)"] = "Σχόλια $1";
regexps["^Trackbacks(.*)"] = "Συνδέεται $1";


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
    "span":"" , "a":"", "b":"", "h2":"", "h3":"", "ul":"", "li":"", "tr":"","th":"", "td":"", "p":"", "option":"", "strong":"", "div":"", "br":"", "center":"", "input":""
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
  setTimeout(3000, translateWholePage)
}, false);