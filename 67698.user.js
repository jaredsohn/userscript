// ==UserScript==
// @name            eRepublik MaxiHellas Greek/Hellenic Translation
// @author          Δημιουργήθηκε από τον TEObest1
// @description     Εάν σας άρεσε η το βρήκατε χρήσιμο διαδώστε το στους eRepublik MaxiHellas φίλους σας!
// @version         2 (beta version) - Revision:1
// @homepage        http://userscripts.org/scripts/show/67698
// @include         http://erep.maxihellas.com/*
// @require         http://userscripts.org/scripts/source/57756.user.js
// ==/UserScript==

ScriptUpdater.check(67698, '2 (beta version) - Revision:1');  

var strings = {
// translations
"Important News" : "Σημαντικά Νέα",
"Welcome" : "Καλωσήρθατε!",
"Welcome to eRepublik Maxihellas stats website. " : "Καλωσήρθατε στην ιστοσελίδα του eRepublik Maxihellas stats.",
"Support this project! Make a donation by clicking " : "Υποστήριξε αυτό το site! Κάνε μια δωρεά κάνοντας κλικ ",
"here" : "ΕΔΩ!",
"Join eReublik" : "Παίξε στο eRepublik",
"Click to the image to become a citizen of the New World. A citizen of eRepublik! " : "Κάνε κλικ στην εικόνα για να γίνεις πολίτης του κόσμου του eRepublik! ",
"Partner tools " : "Εργαλεία Συνεργατών",
"See the stats of all eRepublik Market. Product prices, Job Finder tool, Currency info and many valuable info at this amazing website." : "Δες τα στατιστικά απ'όλες τις αγορές του eRepublik. Τιμές προϊόντων, Εύρεση Εργασίας, Συνναλάγματα και πολλά άλλα!",
"Ads" : "Διαφημίσεις",
"Contact Info" : "Επικοινωνία",
"Tall_Niki's in game Inbox" : "Στείλε μήνυμα",
"Welcome to eRepublik MaxiHellas" : "Καλωσήρθες στο eRepublik MaxiHellas!",
"Welcome to eRepublik MaxiHellas." : "Η ιστοσελίδα μεταφράστηκε από τον TEObest1.",
"The new site with eRepublik Statistics" : "ΓΛΩΣΣΑ: Ελληνικά, ΕΚΔΟΣΗ: 0.1",
"Enjoy!!!!!!!" : "Απόλαυσέ το!",
"Version 0.1" : "Έκδοση 0.1",
"Disclaimer" : "Αποποίηση Ευθυνών",
"Copyright &copy; 2010 Tall_Niki. All Rights Reserved." : "",
"Home" : "Στατιστικά...",
"Fighters Stats" : "...Μαχητών",
"Best Fighters" : "Καλύτεροι Μαχητές",
"Biggest Influence per Fight" : "Μεγαλύτερη επιρροή ανά μάχη",
"Military Medals" : "Στρατιωτικά Μετάλλια",
"V2 (OLD Version) Stats" : "...Παλαιάς Έκδοσης (V2)",
"View" : "Δες",
"User" : "Χρήστης",
"Search" : "Αναζήτηση",
"Active Battles" : "Ενεργές Μάχες",
"View Active Battles" : "Δες ενεργές μάχες",
"Medals" : "Μετάλλια",
"Citizens Stats" : "...Πολιτών",
"Countries Stats" : "...Χωρών",
"Best Country Fighters" : "Καλύτεροι Μαχητές Χώρας",
"World Stats" : "...Κόσμου",
"New Players per Day" : "Νέοι παίκτες ανά μέρα",
"Best Countries" : "Καλύτερες Χώρες",
"Active Battles List" : "Λίστα Ενεργών Μαχών",
"Search User Stats" : "Αναζήτηση Στοιχείων Χρήστη",
"Help" : "Βοήθεια",
"Search eRepublik.com" : "Αναζήτηση στο eRepublik.com",
"Search at all eRepublik official websites (game's site, wiki, blog, forum etc) with this customized Google Search Engine." : "Αναζητά σε όλες τις επίσημες ιστοσελίδες του eRepublik (όπως ιστοσελίδα παιχνιδιού,φόρουμ,βοήθειας κτλ) με την μηχανή αναζήτησης της Google.",
"User ID:" : "ID Χρήστη:",
"User Name:" : "Όνομα Χρήστη:",
"or" : "ή",
"Info" : "Πληροφορίες",
"World's Stats" : "Στατιστικά Κόσμου",
"Recorded Users" : "Εγγεγραμμένοι Χρήστες",
"Search User Stats" : "Αναζήτηση Στοιχείων Χρήστη",
"More Updates!" : "Περισσότερες Ενημερώσεις!",
"Here you can search and see the stats of any user that you want by making the appropiate search. You can sort the data by clicking at the desired column name." : "Εδώ μπορείς να αναζητήσεις και να δεις τα στατιστικά από όλους τους χρήστες που θες, κάνοντας την κατάλληλη αναζήτηση. Μπορείς να κατατάξεις τα δεδομένα αν πατήσεις πάνω στη στήλη Όνομα.",
"There would be more updates in this page in the near future!" : "Θα υπάρξουν περισσότερες ενημερώσεις σ'αυτή τη σελίδα στο μέλλον!",
"Active Users" : "Ενεργοί Χρήστες (ΕΧ)",
"Active Fighters" : "Ενεργοί Πολεμηστές (ΕΠ)",
"Average Level" : "Μέσο Επίπεδο",
"Total XP (Active Users)" : "Συνολικοί ΠΕ (ΕΧ)",
"Average XP (Active Users)" : "Μέσοι ΠΕ (ΕΧ)",
"Total Strength (Active Users)" : "Συνολική Δύναμη (ΕΧ)",
"Average Strength (Active Users)" : "Μέση Δύναμη (ΕΧ)",
"Total Strength (Active Fighters)" : "Συνολική Δύναμη (ΕΠ)",
"Average Strength (Active Fighters)" : "Μέση Δύναμη (ΕΠ)",
"Total Rank Points (Active Users)" : "Συνολικοί Στρατιωτικοί Πόντοι (ΕΧ)",
"Average Rank Points (Active Users)" : "Μέσοι Στρατιωτικοί Πόντοι (ΕΧ)",
"Battles Info" : "Πληροφορίες Μάχης",
"Total Battles" : "Συνολικές Μάχες",
"There would be more updates in this page in the near future!" : "Θα υπάρξουν περισσότερες ενημερώσεις σ'αυτή τη σελίδα στο μέλλον!",
"Battle ID" : "ID Μάχης",
"War ID" : "ID Πολέμου",
"Attacker" : "Επιτεθόμενος",
"Defender" : "Αμυνόμενος",
"Region Name" : "Όνομα Περιοχής",
"Started at" : "Ξέκισε...",
"Fight" : "Πολέμησε",
"Go to battlefield" : "Πήγαινε στη μάχη",
"Most Medals" : "Περισσότερα μετάλλια",
"2nd Most Medals" : "2α Περισσότερα μετάλλια",
"3rd Most Medals" : "3α Περισσότερα μετάλλια",
"Medals" : "Μετάλλια",
"Avatar" : "Φωτογραφία",
"Citizenship" : "Υπηκοότητα",
"Hard Worker" : "Σκληρός Εργάτης",
"Congress Member" : "Μέλος Κογγρέσου",
"Country President" : "Πρόεδρος Χώρας",
"Media Mogul" : "Δημοφιλής Δημοσιογράφος",
"Battle Hero" : "Ήρωας Μάχης",
"Campaign Hero" : "Ήρωας Πολέμου",
"Resistance Hero" : "Ήρωας Επανάστασης",
"Super Soldier" : "Υπερστρατιώτης",
"Society Builder" : "Κτίστης Κοινωνίας",
"Total Medals" : "Συνολικά Μετάλλια",
"Country:" : "Χώρα:",
"Best Fighter" : "Καλύτερος Μαχητής",
"2nd Best Fighter" : "2ος Καλύτερος Μαχητής",
"3rd Best Fighter" : "3ος Καλύτερος Μαχητής",
"Strength" : "Δύναμη",
"Military Rank" : "Στρατιωτικό Επίπεδο",
"Military Rank Points" : "Πόντοι Στρατιωτικού Επιπέδου",
"1st Update Day" : "1η Μέρα Ενημέρωσης",
"Latest Update Day" : "Τελευταία Μέρα Ενημέρωσης",
"Days" : "Μέρες",
"Average Influence per Day" : "Μέση Επιρροή ανά μέρα",
"Influence Made" : "Επιρροή που έγινε",
"Best Country" : "Καλύτερη Χώρα",
"Country" : "Χώρα",
"Fighters" : "Πολεμιστές",
"Average XP" : "Μέσοι ΠΕ",
"Average Strength" : "Μέση Δύναμη",
"Average Rank Points" : "Μέσοι Πόνοι Επιπέδου",
"Total Rank Points" : "Συνολικοί Πόντοι Επιπέδου",
"Influence Made (From 23-12-2010)" : "Επιρροή που έγινε (Από 23/12/2010)",
"Best Country" : "Καλύτερη Χώρα",
"2nd Best Country" : "2η Καλύτερη Χώρα",
"3rd Best Country" : "3η Καλύτερη Χώρα",
"Here you can see how many new players each country had at the selected date. The stats are being updated every minute and only citizens with wellness over 0 is projected. You can sort the data by clicking at the desired column name." : "Εδώ μπορείς να δεις πόσοι είναι οι νέοι παίκτες από κάθε χώρα από την επιλεγμένη ημερομηνία. Τα στατιστικά ενημερώνονται κάθε λεπτό και δεν εμφανίζονται πολίτες με υγεία 0. Μπορείς να κατατάξεις τα δεδομένα κάνοντας κλικ στην επιθυμητή στήλη.",
"World's Fighters Stats" : "Στατιστικά Παγκόσμιων Πολεμιστών",
"Level" : "Επίπεδο",
"XP" : "Πόντοι Εμπειρίας (ΠΕ)",
"Strength" : "Δύναμη",
"Most Military Rank Points" : "Περισσότεροι Πόντοι Στρατιωτικού Επιπέδου",
"Biggest Strength" : "Μεγαλύτερη Δύναμη",
"Military Rank" : "Στρατιωτικό Επίπεδο",
"Military Rank Points" : "Πόντοι Στρατιωτικού Επιπέδου",
"Influence (Fight without weapon)" : "Επιρροή (Μάχη χωρίς όπλο)",
"Influence (Fight with Q5 weapon)" : "Επιρροή (Μάχη με Q5 όπλο)",
"Order by:" : "Ταξινόμηση κατά:",
"Most Campaign Hero Medals" : "Περισσότερα Ήρωας Πολέμου Μετάλλια",
"Most Battle Hero Medals" : "Περισσότερα Ήρωας Μάχης Μετάλλια",
"Most Resistance Hero Medals" : "Περισσότερα Ήρωας Επανάστασης Μετάλλια",
"Most Super Soldier Medals" : "Περισσότερα Σουστρατιώτης Μετάλλια",
"Most Military Medals" : "Περισσότερα Στρατιωτικά Μετάλλια",
"Number of Citizens" : "Νούμερο Πολιτών",
"Date:" : "Ημερομηνία:",
"Most New Players Today" : "Περισσότεροι Νέοι Παίκτες Σήμερα",
"2nd Most New Players Today" : "2οι Περισσότεροι Νέοι Παίκτες Σήμερα",
"3rd Most New Players Today" : "3οι Περισσότεροι Νέοι Παίκτες Σήμερα",
"" : "",



	
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["Free counters!"] = "Free counters!";



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