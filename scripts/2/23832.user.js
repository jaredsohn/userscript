// ==UserScript==
// @name           Greek Facebook
// @namespace      http://www.thanosideas.com
// @description    Translate Facebook into Greek
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @author         Thanasis Tsapanoglou
// ==/UserScript==

// Last updated    2008-03-12


// Notes:
// Enter longer search strings BEFORE shorter ones
// Enter <> brackets into the search (and replace) strings whenever possible


// Replace the search string with the translated string
function r(dd, s, t) {
	if (s == t) {
		return (dd);
	} else {
		var RegExpr = new RegExp(s, "g");
		return (dd.replace(RegExpr, t));
		//document.body.innerHTML = document.body.innerHTML.replace(RegExpr, t);
	}
}


d = document.body.innerHTML;
//document.body.dir = "rtl";
//alert(document.innerHTML);
//document.innerHTML = r(document.innerHTML, '<body ', '<body dir="rtl" ');


// Main menu
d = r(d, '>Profile<', '>Προφίλ<');
d = r(d, '>edit<', '>διόρθωση<');
d = r(d, '>Friends<', '>Φίλοι<');
d = r(d, '>Networks<', '>Δίκτυα<');
d = r(d, '>Inbox<', '>Εισερχόμενα<');
d = r(d, '>home<', '>αρχική<');
d = r(d, '>account<', '>λογαριασμός<');
d = r(d, '>Privacy<', '>Απόρρητο<');
d = r(d, '>privacy<', '>απόρρητο<');
d = r(d, '>logout<', '>έξοδος<');
d = r(d, '>About<', '>Σχετικά<');

d = r(d, '>Message<', '>Μήνυμα<');
d = r(d, '>Poke<', '>Τσίγκλησμα<');


// Sub-menus
d = r(d, '>Message Inbox<', '>Εισερχόμενα Μηνύματα<');
d = r(d, '>Sent Messages<', '>Απεσταλμένα Μηνύματα<');
d = r(d, '>Notifications<', '>Ειδοποιήσεις<');
d = r(d, '>Updates<', '>Ενημερώσεις<');
d = r(d, '>Compose Message<', '>Δημιουργία Μηνύματος<');
d = r(d, '>Browse All Networks<', '>Αναζήτηση Δικτύων<');
d = r(d, '>Join a Network<', '>Σύνδεση σε Δίκτυο<');
d = r(d, '>Status Updates<', '>Ενημερώσεις Κατάστασης<');
d = r(d, '>Online Now<', '>Συνδεδεμένοι Τώρα<');
d = r(d, '>Recently Updated<', '>Ενημερώθηκαν Πρόσφατα<');
d = r(d, '>Recently Added<', '>Προστέθηκαν Πρόσφατα<');
d = r(d, '>All Friends<', '>Όλοι Οι Φίλοι<');
d = r(d, '>Invite Friends<', '>Πρόσκληση Φίλων<');
d = r(d, '>Find Friends<', '>Αναζήτηση Φίλων<');

// Left column
d = r(d, '>Search<', '>Αναζήτηση<');
d = r(d, '>Applications<', '>Εφαρμογές<');
d = r(d, '>more<', '>περισσότερα<');
d = r(d, '>Less<', '>Λιγότερα<');
d = r(d, '>Photos<', '>Φωτογραφίες<');
d = r(d, '>Groups<', '>Ομάδες<');
d = r(d, '>Events<', '>Γεγονότα<');
d = r(d, '>Marketplace<', '>Αγορές<');
d = r(d, '>My Questions<', '>Οι Ερωτήσεις Μου<');
d = r(d, '>Developer<', '>Προγραμματιστής<');
d = r(d, '>Posted Items<', '>Καταχωρημένα Αντικείμενα<');
d = r(d, ' of <', ' από <');
d = r(d, 'posted items<', 'καταχωρημένα αντικείμενα<');
d = r(d, '>Notes<', '>Σημειώσεις<');
d = r(d, '>Video<', '>Βίντεο<');

d = r(d, '>Page Manager<', '>Διαχείριση Σελίδων<');
d = r(d, '>Friends For Sale!<', '>Φίλοι Προς Πώληση!<');
d = r(d, '>Be a Billionaire!<', '>Γίνε Εκατομμυριούχος!<');
d = r(d, '>about<', '>σχετικά<');

d = r(d, '>Online Friends<', '>Συνδεδεμένοι Φίλοι<');

// Right column
d = r(d, '>hide friend updates<', '>απόκρυψη ενημερώσεων φίλων<');
d = r(d, '>show friend updates<', '>εμφάνιση ενημερώσεων φίλων<');
d = r(d, '>Birthdays<', '>Γενέθλια<');
d = r(d, '>Invite Your Friends<', '>Πρόσκληση Φίλων<');
d = r(d, '>New Stuff<', '>Νέα Αντικείμενα<');
d = r(d, '>The Next Step<', '>Το Επόμενο Βήμα<');
d = r(d, '>Find Your Friends<', '>Αναζήτηση Φίλων<');
d = r(d, '>see all<', '>εμφάνιση όλων<');
d = r(d, '>hide<', '>απόκρυψη<');
d = r(d, '>close<', '>κλείσιμο<');

// Bottom line
d = r(d, '>About Facebook<', '>Σχετικά<');
d = r(d, '>Facebook<', '>Facebook<');
d = r(d, '>Advertisers<', '>Διαφημιστές<');
d = r(d, '>Businesses<', '>Επιχειρήσεις<');
d = r(d, '>Developers<', '>Προγραμματιστές<');
d = r(d, '>Terms<', '>Όροι<');
d = r(d, '>Help<', '>Βοήθεια<');
d = r(d, '>Remove from Friends<', '>Αφαίρεση από τους Φίλους<');

// Networks page
d = r(d, '>Network Info<', '>Πληροφορίες Δικτύου<');
d = r(d, '>Members:<', '>Μέλη:<');
d = r(d, '>Friends:<', '>Φίλοι:<');
d = r(d, '>Type:<', '>Τύπος:<');
d = r(d, '>People in ', '>Άνθρωποι στην ');
d = r(d, '>Upcoming Events<', '>Επερχόμενα Γεγονότα<');
d = r(d, '>Popular in ', '>Διάσημα στον/στην ');
d = r(d, '>Browse<', '>Εξερεύνηση<');
d = r(d, '>Discussion Board<', '>Χώρος Συζητήσεων<');
d = r(d, ' discussion topics', ' θέματα');
d = r(d, ' Updated ', ' Ενημερώθηκε ');
d = r(d, ' about a ', ' περίπου ένα ');
d = r(d, ' about an ', ' περίπου μία ');
d = r(d, '>Leave this Network<', '>Αποχώρηση από το Δίκτυο<');
d = r(d, ' people<', ' άνθρωποι<');

// Friends page
d = r(d, '>Everyone<', '>Όλοι<');
d = r(d, '>More...<', '>Περισσότερα...<');
d = r(d, '>Friend Lists<', '>Λίστες Φίλων<');

// Profile page
d = r(d, '>Updated just a moment ago<', '>Μόλις ενημερώθηκε<');
d = r(d, '>Networks:<', '>Δίκτυα:<');
d = r(d, '>Hello ', '>Γειά σου ');
d = r(d, '>Hometown:<', '>Τόπος Κατοικίας:<');
d = r(d, '>Political Views:<', '>Πολιτικές Απόψεις:<');
d = r(d, '>Religious Views:<', '>Θρησκευτικές Απόψεις:<');
d = r(d, '>Send<', '>Αποστολή<');
d = r(d, '>Cancel<', '>Ακύρωση<');
d = r(d, '>Today<', '>Σήμερα<');
d = r(d, '>Yesterday<', '>Χτες<');
d = r(d, '>Sex:<', '>Φύλο:<');
d = r(d, '>Relationship Status:<', '>Οικογεν. Κατάσταση:<');
d = r(d, '>Married', '>Παντρεμένος/η');
d = r(d, '> to <', '> με τον/την <');
d = r(d, '>Looking For:<', '>Ψάχνει Για:<');
d = r(d, '>Birthday:<', '>Γενέθλια:<');
d = r(d, '>Interested In:<', '>Ενδιαφέρεται Για:<');
d = r(d, ' years old,', ' χρονών,');

d = r(d, 'Show More Profile Boxes<', 'Εμφάνιση Περισσότερων Κουτιών<');

d = r(d, '>Male<', '>Άντρας<');
d = r(d, '>Female<', '>Γυναίκα<');
d = r(d, '>Men<', '>Άντρες<');
d = r(d, '>Women<', '>Γυναίκες<');

// Astrological signs
d = r(d, 'Aries', 'Κριός');
d = r(d, 'Taurus', 'Ταύρος');
d = r(d, 'Gemini', 'Δίδυμος');
d = r(d, 'Cancer', 'Καρκίνος');
d = r(d, 'Leo', 'Λέων');
d = r(d, 'Virgo', 'Παρθένος');
d = r(d, 'Libra', 'Ζυγός');
d = r(d, 'Scorpio', 'Σκορπιός');
d = r(d, 'Sagittarius', 'Τοξότης');
d = r(d, 'Capricorn', 'Αιγόκερως');
d = r(d, 'Aquarius', 'Υδροχόος');
d = r(d, 'Pisces', 'Ιχθείς');

d = r(d, '>Mini-Feed<', '>Σύντομη Ενημέρωση<');
d = r(d, '>Displaying ', '>Εμφάνιση ');
d = r(d, ' stories<', ' ιστορίες<');
d = r(d, ' wrote on the wall for the group ', ' έγραψε στον τοίχο για την ομάδα ');
d = r(d, ' joined the group ', ' συνδέθηκε στο δίκτυο ');
d = r(d, ' wrote on the wall for the event ', ' έγραψε στον τοίχο για το γεγονός ');
d = r(d, ' and ', ' και ');
d = r(d, ' are now friends.', ' είναι τώρα φίλοι');
d = r(d, '  has received a new ', ' έλαβε ένα νέο ');
d = r(d, ' commented on ', ' σχολίασε στο ');

d = r(d, '>See All<', '>Εμφάνιση Όλων<');
d = r(d, '>Updated on ', '>Ενημερώθηκε το/τη ');
d = r(d, '>Updated ', '>Ενημερώθηκε ');
d = r(d, 'seconds ago', 'δευτερόλεπτα πριν');
d = r(d, 'hours ago', 'ώρες πριν');
d = r(d, 'hour ago', 'ώρα πριν');
d = r(d, 'minutes ago', 'λεπτά πριν');
d = r(d, 'minute ago', 'λεπτό πριν');
d = r(d, 'just a moment ago', 'πριν από λίγο');
d = r(d, '> is (?=[??????????????????????])', '> ');
d = r(d, '>Information<', '>Πληροφορίες<');
d = r(d, '>Contact Info<', '>Στοιχεία Επικοινωνίας<');
d = r(d, '>Email:<', '>Email:<');
d = r(d, '>Current Town:<', '>Τωρινή Πόλη:<');
d = r(d, '>Website:<', '>Ιστοσελίδα:<');
d = r(d, '>Personal Info<', '>Προσωπικές Πληροφορίες:<');
d = r(d, '>Activities<', '>Δραστηριότητες<');
d = r(d, '>You are online now.<', '>Είστε συνδεδεμένος τώρα.<');

d = r(d, '>Friends in Other Networks<', '>Φίλοι σε Άλλα Δίκτυα<');
d = r(d, '>Networks with the most friends<', '>Δίκτυα με τους περισσότερους φίλους<');
d = r(d, '>Networks you belong to<', '>Δίκτυα στα οποία ανήκετε<');
d = r(d, '>Show All Networks<', '>Εμφάνιση Όλων Των Δικτύων<');
d = r(d, '>View All Friends<', '>Εμφάνιση Όλων Των Φίλων<');
d = r(d, '> Friends<', '> Φίλοι<');
d = r(d, ' friends<', ' φίλοι<');

d = r(d, '>Mutual Friends<', '> Κοινοί Φίλοι<');
d = r(d, '> in common.<', '> κοινοί.<');

d = r(d, '>Education and Work<', '>Εκπαίδευση και Εργασία<');
d = r(d, '>Education Info<', '>Πληροφορίες Εκπαίδευσης<');
d = r(d, '>Grad Schools:<', '>Σχολεία Αποφοίτησης:<');
d = r(d, '>Work Info<', '>Πληροφορίες Εργασίας<');
d = r(d, '>Employer:<', '>Εργοδότης:<');
d = r(d, '>Position:<', '>Θέση:<');
d = r(d, '>Time Period:<', '>Χρονικό Διάστημα:<');
d = r(d, '>Description:<', '>Περιγραφή:<');
d = r(d, ' groups<', ' ομάδες<');

d = r(d, '>Feedheads<', '>Επικεφαλίδες Ενημερώσεων<');
d = r(d, '>your shared items<', '>τα μοιρασμένα αντικείμενα<');
d = r(d, '>Update Shared Items<', '>Ενημέρωση Μοιρασμένα Αντικείμενα<');
d = r(d, '>App Profile<', '>Προφίλ Εφαρμογής<');
d = r(d, '>Top Shared<', '>Ανώτατα Μοιρασμένα<');

d = r(d, '>Gifts<', '>Δώρα<');

// Photos
d = r(d, '>Created ', '>Δημιουργήθηκε ');
d = r(d, '>Back to Album', '>Πίσω στο Άλμπουμ');
d = r(d, '>From the album:', '>Από το άλμπουμ');

// Wall
d = r(d, '>Back to %s\'s profile', '>Πίσω στο προφίλ του %s');
d = r(d, '>Displaying the only post.<', '>Εμφάνιση της μοναδικής καταχώρησης.<');
d = r(d, '>Delete<', '>Διαγραφή<');

d = r(d, '>Previous<', '>Προηγούμενο<');
d = r(d, '>Next<', '>Επόμενο<');

// News feed
d = r(d, '>News Feed<', '>Ενημέρωση Νέων<');
d = r(d, '>Preferences<', '>Προτιμήσεις<');
d = r(d, '>I like this<', '>Μ\' αρέσει αυτό<');
d = r(d, '>I don\'t like this<', '>Δεν μ\' αρέσει αυτό<');
d = r(d, ' is attending ', ' συμμετέχει ');
d = r(d, ' attended ', ' συμμετείχε ');

d = r(d, '>You ignored a request from ', '>Αγνοήσατε το αίτημα από τον/την  ');
d = r(d, '>Updated:', '>Ενημερώθηκε:');
d = r(d, ' of your ', ' από ');
d = r(d, ' added the ', ' πρόσθεσε το ');
d = r(d, ' application.<', ' εφαρμογή.<');


d = r(d, 'Athens', 'Αθήνα');
d = r(d, 'Greece', 'Ελλάδα');


// Mail page
d = r(d, '>next<', '>επόμενο<');
d = r(d, '>From: ', '>Από: ');

d = r(d, 'Facebook', 'Facebook');

// Months
d = r(d, 'January', 'Ιανουάριος');
d = r(d, 'February', 'Φεβρουάριος');
d = r(d, 'March', 'Μάρτιος');
d = r(d, 'April', 'Απρίλιος');
d = r(d, 'May', 'Μάϊος');
d = r(d, 'June', 'Ιούνιος');
d = r(d, 'July', 'Ιούλιος');
d = r(d, 'August', 'Αύγουστος');
d = r(d, 'September', 'Σεπτέμβριος');
d = r(d, 'October', 'Οκτώβριος');
d = r(d, 'November', 'Νοέμβριος');
d = r(d, 'December', 'Δεκέμβριος');

// Days
d = r(d, 'Monday', 'Δευτέρα');
d = r(d, 'Tuesday', 'Τρίτη');
d = r(d, 'Wednesday', 'Τετάρτη');
d = r(d, 'Thursday', 'Πέμπτη');
d = r(d, 'Friday', 'Παρασκευή');
d = r(d, 'Saturday', 'Σάββατο');
d = r(d, 'Sunday', 'Κυριακή');

document.body.innerHTML = d;
