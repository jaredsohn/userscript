// ==UserScript==
// @name           e-sim Greek 
// @namespace      e-sim Greek 
// @include        http://e-sim.org*
// @include        http://primera.e-sim.org*
// @include        http://secura.e-sim.org*
// @grant          none
// @version        2.7
// @description    Ελληνική μετάφραση του e-sim από τον Darth Mount
// ==/UserScript==
// Ελληνική μετάφραση του e-sim από τον Darth Mount
 

//---------------------------------------------------
//Homepage & Menu replacements
//---------------------------------------------------
menuLinkReplacements = {
	"work.html"				:["Work","ΕΡΓΑΣΙΑ"],
	"train.html"			:["Train","ΕΚΠΑΙΔΕΥΣΗ"],
	"equipment.html"		:["Equipment","ΕΞΟΠΛΙΣΜΟΣ"],
	"companies.html"		:["Companies","ΕΤΑΙΡΙΕΣ"],
	"newspaper.html"		:["Newspaper","ΕΦΗΜΕΡΙΔΑ"],
	"myParty.html"			:["Party","ΚΟΜΜΑ"],
	"contracts.html"		:["Contracts","ΣΥΜΒΟΛΑΙΑ"],
	"myShares.html"			:["Shares","ΜΕΤΟΧΕΣ"],
	"myAuctions.html"		:["Auctions","ΔΗΜΟΠΡΑΣΙΕΣ"],
	"inviteFriends.html"	:["Invite friends","ΠΡΟΣΚΛΗΣΗ ΦΙΛΩΝ"],
	"myMilitaryUnit.html"	:["Military unit","ΣΤΡΑΤΙΩΤΙΚΗ ΜΟΝΑΔΑ"],
	"subscription.html"     :["Premium account","ΣΥΝΔΡΟΜΗ"],
	"goldPurchase.html"     :["Buy gold","ΑΓΟΡΑ ΧΡΥΣΟΥ"],
	
	"productMarket.html"	:["Product market","ΑΓΟΡΑ ΠΡΟΪΟΝΤΩΝ"],
	"jobMarket.html"		:["Job market","ΑΓΟΡΑ ΕΡΓΑΣΙΑΣ"],
	"monetaryMarket.html"	:["Monetary market","ΣΥΝΑΛΛΑΓΜΑ"],
	"auctions.html"			:["Auctions","ΔΗΜΟΠΡΑΣΙΕΣ"],
	"stockMarket.html"		:["Stock market","ΧΡΗΜΑΤΙΣΤΗΡΙΟ"],
	"companiesForSale.html"	:["Companies for sale","ΑΓΟΡΑ ΕΤΑΙΡΙΩΝ"],
	"specialItems.html"		:["Special items","ΕΙΔΙΚΑ ΑΝΤΙΚΕΙΜΕΝΑ"],
	
	"countryStatistics.html"		:["Country statistics","ΣΤΑΤΙΣΤΙΚΑ ΧΩΡΩΝ"],
	"partyStatistics.html"			:["Party statistics","ΣΤΑΤΙΣΤΙΚΑ ΚΟΜΜΑΤΩΝ"],
	"newspaperStatistics.html"		:["Newspaper statistics","ΣΤΑΤΙΣΤΙΚΑ ΕΦΗΜ/ΔΩΝ"],
	"citizenStatistics.html"		:["Citizen statistics","ΣΤΑΤΙΣΤΙΚΑ ΠΟΛΙΤΩΝ"],
	"stockCompanyStatistics.html"	:["Stock market stats","ΣΤΑΤΙΣΤΙΚΑ ΧΡΗΜ/ΡΙΟΥ"],
	"militaryUnitStatistics.html"	:["Military unit stats","ΣΤΑΤΙΣΤΙΚΑ ΣΤΡ. ΜΟΝ."],
	"donations.html"				:["Donations","ΔΩΡΕΕΣ"],
	"fundRaising.html?id=4"			:["New modules","ΝΕΑ ΣΚΕΛΗ"],

	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","ΚΟΡΥΦΑΙΑ ΑΡΘΡΑ"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","ΤΕΛΕΥΤΑΙΑ ΑΡΘΡΑ"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","ΣΤΡΑΤΙΩΤΙΚΑ ΓΕΓΟΝΟΤΑ"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","ΠΟΛΙΤΙΚΑ ΓΕΓΟΝΟΤΑ"],
	
	"battles.html"							:["Battles","ΜΑΧΕΣ"],
	"countryPoliticalStatistics.html"		:["War and politics","ΠΟΛΕΜΟΣ & ΠΟΛΙΤΙΚΗ"],
	"countryEconomyStatistics.html"			:["Economy","ΟΙΚΟΝΟΜΙΑ"],
	"countryLaws.html"						:["Laws","ΝΟΜΟΙ"],
	"partyElections.html"					:["Party elections","ΚΟΜΜΑΤΙΚΕΣ ΕΚΛΟΓΕΣ"],
	"congressElections.html"				:["Congress elections","ΒΟΥΛΕΥΤΙΚΕΣ ΕΚΛΟΓΕΣ"],
	"presidentalElections.html"				:["Presidential elections","ΠΡΟΕΔΡΙΚΕΣ ΕΚΛΟΓΕΣ"],
	"pendingCitizenshipApplications.html"	:["Citizenship","ΥΠΗΚΟΟΤΗΤΑ"],
	"googleMap.html"						:["Map","ΧΑΡΤΗΣ"]
};

menuTextReplacements = {
	"myPlacesButton":["My places","Ο ΧΩΡΟΣ ΜΟΥ"],
	"marketButton":["Market","ΑΓΟΡΑ"],
	"statisticsButton":["Statistics","ΣΤΑΤΙΣΤΙΚΑ"],
	"newsButton":["News","ΝΕΑ"],
	"electionsButton":["Country","ΧΩΡΑ"]
};

sideLink1Replacements = {
	"crossIcon"	:["Logout","ΑΠΟΣΥΝΔΕΣΗ"],
	"workIcon"	:["Work","ΕΡΓΑΣΙΑ"],
	"fightIcon"	:["Fight","ΜΑΧΗ"],
	"avatarIcon":["Upload avatar","ΑΝΕΒΑΣΜΑ ΕΙΚΟΝΑΣ"],
	"voteIcon"	:["Vote","ΕΚΛΟΓΕΣ"]
};

sideLink2Replacements = {
	"travel.html"								:["Travel","Μετακίνηση"],
	"pendingCitizenshipApplications.html"		:["change","Αλλαγή"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Οδηγός υγείας"]
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Κατανάλωση"],
	"useGiftLink":["Use gifts","Χρήση"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Κατανάλωση"],
	"useGiftButton":["Use gift","Χρήση"] 
};

hpTitleReplacements = {
	"News":["News","ΝΕΑ"],
	"Shouts":["Shouts","ΑΝΑΚΟΙΝΩΣΕΙΣ"],
	"Battles":["Battles","ΜΑΧΕΣ"],
	"Events":["Events","ΓΕΓΟΝΟΤΑ"]
};

hpTabsReplacements = {
	"#topArticles":["Global","ΓΕΝΙΚΑ"],
	"#latestArticles":["Latest","ΤΕΛΕΥΤΑΙΑ"],
	"#localArticles":["Local","ΤΟΠΙΚΑ"],
	
	"#countryShouts":["Country","ΧΩΡΑ"],
	"#friendsShouts":["Military unit","ΣΤΡ. ΜΟΝΑΔΑ"],
	"#myShouts":["Friends","ΦΙΛΟΙ"],
	
	"#localBattles":["Country","ΧΩΡΑ"],
	"#substidedBattles":["Subsidized","ΜΕ ΕΠΙΔΟΤΗΣΗ"],
	"#hotBattles":["Important","ΣΗΜΑΝΤΙΚΕΣ"],

	"#localEvents":["Local","ΤΟΠΙΚΑ"],
	"#globalEvents":["Military","ΣΤΡΑΤ/ΚΑ"],
	"#politicalEvents":["Political","ΠΟΛΙΤΙΚΑ"]
};

replaceLinkByHrefSSS("#", {
    "Report":["Report","Αναφορά"],
    "Delete":["Delete","Διαγραφή"],
    "Edit":["Edit","Επεξεργασία"],
    "Vote":["Vote","Μου αρέσει"],
    "Comment":["Comment","Σχολιασμός"],
    "More shouts":["More shouts","Περισσότερες ανακοινώσεις"]
});
		
replaceInputByValue({
    "Report":["Report","Αναφορά"],
    "Delete":["Delete","Διαγραφή"],
    "Edit":["Edit","Επεξεργασία"]
});	


//---------------------------------------------------
//???
//---------------------------------------------------
hpContentArticlesReplacements = {
	"topArticles":"",
	"latestArticles":"",
	"localArticles":""
};

hpContentShoutsReplacements = {
	"countryShouts":"",
	"friendsShouts":"",
	"myShouts":""
};

hpContentBattlesReplacements = {
	"localBattles":"",
	"substidedBattles":"",
	"hotBattles":""
};

hpContentEventsReplacements = {
	"localEvents":"",
	"globalEvents":"",
	"politicalEvents":""
};

MonetaryMarketRemplacement = {
	"http://wiki.e-sim.org/index.php/MonetaryMarket"	:["Monetary market tutorial","Οδηγός αγοράς συναλάγματος"]
};


//---------------------------------------------------
//FireFox
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;


//---------------------------------------------------
//functions definitions
//---------------------------------------------------
function getElements(obj, k) {
	return document.evaluate(k, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function replaceHerf(objs, replacements) {
	var obj;
	for (var i = 0; i < objs.snapshotLength; i++) {
		obj = objs.snapshotItem(i);
		for (k in replacements) {
			if (obj.href.match(k)) {
				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

function replaceInnerHTML(objs, replacements) {
	var obj;
	for (var i = 0; i < objs.snapshotLength; i++) {
		obj = objs.snapshotItem(i);
		for (k in replacements) {
			if (obj.innerHTML.match(k)) {
				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

function replaceInnerHTML2(replacements) {
	var obj;
	for (k in replacements) {
		obj = document.getElementById(k);
		obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
	}
}

function replaceCommon(objs, replacements, pre, aft) {
	for (k in replacements) {
		var results;
		results = getElements(objs, pre + k + aft);
		for (var i = 0; i < results.snapshotLength; i++) {
			var obj;
			obj = results.snapshotItem(i);
			obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
		}
	}
}

function replaceCommonSSS(objs, kk, replacements, pre, aft) {
	results = getElements(objs, pre + kk + aft);
//	alert(pre + kk + aft + "____" + results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		for (k in replacements) {
			if (obj.innerHTML.match(k)) {
				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

function replaceSpanByClass(replacements) {
	replaceCommon(document, replacements, "//span[@class='", "']");
}

function replaceLinkByHref(replacements) {
	replaceCommon(document, replacements, "//a[@href='", "']");
}

function replaceLinkSSS(replacements) {
	replaceCommonSSS(document, "" ,replacements, "//a[@href", "]");
}

function replaceLinkByHrefSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@href='", "']");
}

function replaceLinkByStyleSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@style='", "']");
}

function replaceLinkByID(replacements) {
	replaceCommon(document, replacements, "//a[@id='", "']");
}

function replaceInputByID(replacements) {
	var obj;
	for (k in replacements) {
		obj = document.getElementById(k);
		obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
	}
}

function replaceInputByValue(replacements) {
	var objs, obj;
	for (k in replacements) {
		objs = getElements(document, "//input[@value='" + k + "']");
		for (var i = 0; i < objs.snapshotLength; i++) {
			obj = objs.snapshotItem(i);
			obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
		}
	}
}

function replaceInputByClassSSS(kk, replacements) {
	results = getElements(document, "//input[@class='" + kk + "']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		for (k in replacements) {
			if (obj.value.match(k)) {
				obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

var replaceBerserk = function() {
			//private section
				function getPrime(objTable){
					var exp = [];
					if(objTable.length){
					for(i=0, y=0; i<objTable.length; i++){

						 if(i%2==0){ 	continue; 	} 

						 	else { 
						 		exp[y] = objTable[i]; 
						 		y++;}  
						 	}
					}
				return exp;
				}

				function setID(tbl){
					var num = 0;
					if(tbl.length){
						for(var i=0; i<tbl.length; i++){
							tbl[i].setAttribute('id', 'beserk'+i);
							num = i;
						}
					}
					return num+1;
				}
				function createLabel(ids, idName, wid){
					ids = (!isNaN(ids)) ? Math.round(ids) : 0;
					idName = (idName.length) ? idName : false;

					for(var i=0; i<ids; i++){
						var btn = document.getElementById(idName+i),
							left = 55,
							top = 155,
							par = btn.parentNode,
							newLabel = document.createElement('label');
							btn.style.display='none';

							console.log(top);
							par.setAttribute('style','position: relative');
							newLabel.setAttribute('style', 'position: absolute; display: block; font-weight: bold;	color: #4477ff;	border: 1px solid #468;	background-color: #FFF;	border-radius: 4px;	box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-o-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-webkit-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-moz-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	color: #000; padding: 4px; width: '+wid+'px;'+' top: '+top+'px; '+'left: '+left+'px; z-index:999;');
							
							newLabel.setAttribute('onmouseover','this.style.borderColor= \'#224488\'; this.style.color = \'#224488\'; this.style.background = \'#FFF\';');

							newLabel.setAttribute('onmouseout', 'this.setAttribute("style", "position: absolute; display: block; font-weight: bold;	color: #4477ff;	border: 1px solid #468;	background-color: #FFF;	border-radius: 4px;	box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-o-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-webkit-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	-moz-box-shadow: inset 1px 6px 12px lightblue, inset -1px -10px 5px #7799ff, 0 0 5px rgba(0, 0, 0, 0.6);	color: #000; padding: 4px; width: '+wid+'px;'+' top: '+top+'px; '+' left: '+left+'px; z-index:999;")');

							newLabel.setAttribute('for', idName+i)
							newLabel.innerHTML = 'Αέρααααα! (x 5)';
							par.appendChild(newLabel);
					}
				return true;
				}

				var btn = document.getElementsByName('side');					
					btn = getPrime(btn),
					len = btn[0].clientWidth;
					var exeC = setID(btn);
					var lb = createLabel(exeC, 'beserk',len);

		return btn;		
}


//---------------------------------------------------
//functions replacements
//---------------------------------------------------
function replaceAlliesLinkComm(k) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='" + k + "']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1  Σύμμαχοι");
	}
}

function replaceAlliesLink() {
	replaceAlliesLinkComm("alliesLink");
}

function replaceAlliesLink2() {
	replaceAlliesLinkComm("alliesLink2");
}

function replaceNoAlliesComm(obj) {
	if (obj.innerHTML.match("no allies")) {
		obj=obj.childNodes[3];
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"Χωρίς συμμάχους");
	}
}

function replaceAlliesLinksss() {
	results = getElements(document, "//div[@class='battleDiv']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp=results.snapshotItem(i).children[0];
		replaceNoAlliesComm(tmp);
		tmp=results.snapshotItem(i).children[2];
		replaceNoAlliesComm(tmp);

		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Αντιστασιακός πόλεμος");
		tmp.innerHTML=tmp.innerHTML.replace(/(Civil war)/,"Εμφύλιος πόλεμος");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Επιδότηση:");
		tmp.innerHTML=tmp.innerHTML.replace(/(none)/g,"καμία");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"Χωρίς συμμάχους");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(allies)/g,"Σύμμαχος");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(allies)/g,"Σύμμαχοι");
    }
	//Resistance & Civil war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Αντιστασιακός πόλεμος");
	obj.innerHTML=obj.innerHTML.replace(/(started by)/,"Έναρξη από");
	obj.innerHTML=obj.innerHTML.replace(/(Civil war)/,"Εμφύλιος πόλεμος");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Επιδότηση:");
}


//---------------------------------------------------
//??? battle timestamp ???
//---------------------------------------------------
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"1 δευτερόλεπτο πριν");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"1 λεπτό πριν");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"1 ώρα πριν");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"1 μέρα πριν");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"1 μήνα πριν");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 δευτερόλεπτα πριν ");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 λεπτά πριν ");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 ώρες πριν");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 μέρες πριν");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 μήνες πριν");
        }
    }
}


//---------------------------------------------------
//??? Subs timestamp ???
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"Δημοσιεύτηκε 1 δευτερόλεπτο πριν");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"Δημοσιεύτηκε 1 λεπτό πριν");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"Δημοσιεύτηκε 1 ώρα πριν");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"Δημοσιεύτηκε 1 μέρα πριν");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"Δημοσιεύτηκε 1 μήνα πριν");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"Δημοσιεύτηκε $2 δευτερόλπετα πριν");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"Δημοσιεύτηκε $2 λεπτά πριν");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"Δημοσιεύτηκε $2 ώρες πριν");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"Δημοσιεύτηκε $2 μέρες πριν");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"Δημοσιεύτηκε $2 μήνες πριν");
    }
}


//---------------------------------------------------
//Homepage Articles timestamp
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"Δημοσιεύτηκε 1 δευτερόλεπτο πριν από");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"Δημοσιεύτηκε 1 λεπτό πριν από");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"Δημοσιεύτηκε 1 ώρα πριν από");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"Δημοσιεύτηκε 1 μέρα πριν από");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"Δημοσιεύτηκε 1 μήνα πριν από");
    }
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"Δημοσιεύτηκε $2 δευτερόλπετα πριν από");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"Δημοσιεύτηκε $2 λεπτά πριν από");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"Δημοσιεύτηκε $2 ώρες πριν από");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"Δημοσιεύτηκε $2 μέρες πριν από");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"Δημοσιεύτηκε $2 μήνες πριν από");
    }   
}


//---------------------------------------------------
//Homepage Shouts timestamp
//---------------------------------------------------
function doShoutsComm() {
	results = getElements(document, "//b[@style='color: #222']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match(/[\d\.]+/g)== 1) {		
		    if (obj.innerHTML.match("second")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"1 δευτερόλεπτο πριν");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"1 λεπτό πριν");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"1 ώρα πριν");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"1 μέρα πριν");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"1 μήνα πριν");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"πριν $2 δευτερόλεπτα");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"πριν $2 λεπτά");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"πριν $2 ώρες");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"πριν $2 μέρες");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"πριν $2 μήνες");
                } 
        }
    }
}
	  

//---------------------------------------------------
//Battle page statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	
	results = getElements(document, "//div[@style]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Συν. ζημιά αμυνόμενου:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Συν. ζημιά επιτιθέμενου:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Η ζημιά σου:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Κορυφαίες αμυνόμενες χώρες:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Κορυφαίες επιτιθέμενες χώρες:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Κορυφαίες αμυνόμενες στρατιωτικές μονάδες:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Κορυφαίες επιτιθέμενες στρατιωτικές μονάδες:");
	}
}


//===================================================
//Clock
//===================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[0].children[0].children[3];
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"Μέρα");
}


//===================================================
//Side menu & dropdown lists
//===================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Οι σημερινές μου αποστολές");
	
	allElements = document.getElementById('userName').parentNode.parentNode;
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level)/,"Επίπεδο");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Βαθμός:");
	
	allElements = document.getElementById('stats');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Experience points)/,"Πόντοι Εμπειρίας");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Προαγωγή:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Επόμενος Βαθμός:");
	tmp.innerHTML=tmp.innerHTML.replace(/(your damage)/,"η ζημιά μου");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Health)/,"Υγεία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Health can be increased by eating food or using gifts)/,"Η υγεία μπορεί να αυξηθεί τρώγοντας φαγητό ή χρησιμοποιόντας δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(You restore extra 50 health during day change)/,"Ανακτάτε 50 υγεία κατά την αλλαγή ημέρας");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill:)/,"Οικονομικό επίπεδο:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Δύναμη:");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Location:)/,"Τοποθεσία:");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenship:)/,"Υπηκοότητα:");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Food limit:)/,"Όριο φαγητού:");
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift limit:)/,"Όριο δώρων:");
	tmp = allElements.children[23];
	tmp.innerHTML=tmp.innerHTML.replace(/(Use medkit)/,"Πρώτες βοήθειες ");
	tmp.innerHTML=tmp.innerHTML.replace(/(left)/,"ακόμα");

	allElements = document.getElementById('userMenu').children[1];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Τα χρήματά μου");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Η αποθήκη μου");
	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Τα χρήματά μου");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Η αποθήκη μου");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Τα μηνύματά μου");
	allElements = document.getElementById('userMenu').children[3];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Τα μηνύματά μου");
	
	allElements = document.getElementById('contentRow').children[0].children[2];
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Any country")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any country)/,"Οποιαδήποτε χώρα");
		}
		else if (obj.innerHTML.match("Global")) {
			obj.innerHTML=obj.innerHTML.replace(/(Global)/,"Παγκοσμίως");
		}
		else if (obj.innerHTML.match("International")) {
			obj.innerHTML=obj.innerHTML.replace(/(International)/,"Διεθνώς");
		}			
		else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Οποιαδήποτε ποιότητα");
		}
		else if (obj.innerHTML.match("Food type")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Ποιότητα φαγητού");
		}
		else if (obj.innerHTML.match("Gift type")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Ποιότητα δώρου");
		}
		else if (obj.innerHTML.match("left")) {
			obj.innerHTML=obj.innerHTML.replace(/left/g,"ακόμα");
		}
		else if (obj.innerHTML.match("Any")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any)/,"Οποιοδήποτε");
		}
		else if (obj.innerHTML.match("Poland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Poland)/,"Πολωνία");
		}
		else if (obj.innerHTML.match("Indonesia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Indonesia)/,"Ινδονησία");
		}
		else if (obj.innerHTML.match("Lithuania")) {
			obj.innerHTML=obj.innerHTML.replace(/(Lithuania)/,"Λιθουανία");
		}
		else if (obj.innerHTML.match("Serbia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Serbia)/,"Σερβία");
		}
		else if (obj.innerHTML.match("Bulgaria")) {
			obj.innerHTML=obj.innerHTML.replace(/(Bulgaria)/,"Βουλγαρία");
		}
		else if (obj.innerHTML.match("Israel")) {
			obj.innerHTML=obj.innerHTML.replace(/(Israel)/,"Ισραήλ");
		}
		else if (obj.innerHTML.match("Russia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Russia)/,"Ρωσσία");
		}
		else if (obj.innerHTML.match("Slovenia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Slovenia)/,"Σλοβενία");
		}
		else if (obj.innerHTML.match("Turkey")) {
			obj.innerHTML=obj.innerHTML.replace(/(Turkey)/,"Τουρκία");
		}
		else if (obj.innerHTML.match("Greece")) {
			obj.innerHTML=obj.innerHTML.replace(/(Greece)/,"Ελλάδα");
		}
		else if (obj.innerHTML.match("Italy")) {
			obj.innerHTML=obj.innerHTML.replace(/(Italy)/,"Ιταλία");
		}
		else if (obj.innerHTML.match("China")) {
			obj.innerHTML=obj.innerHTML.replace(/(China)/,"Κίνα");
		}
		else if (obj.innerHTML.match("Romania")) {
			obj.innerHTML=obj.innerHTML.replace(/(Romania)/,"Ρουμανία");
		}
		else if (obj.innerHTML.match("Hungary")) {
			obj.innerHTML=obj.innerHTML.replace(/(Hungary)/,"Ουγγαρία");
		}
		else if (obj.innerHTML.match("Republic of Macedonia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Republic of Macedonia)/,"FYROM");
		}
		else if (obj.innerHTML.match("Croatia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Croatia)/,"Κροατία");
		}
		else if (obj.innerHTML.match("France")) {
			obj.innerHTML=obj.innerHTML.replace(/(France)/,"Γαλλία");
		}
		else if (obj.innerHTML.match("Sweden")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sweden)/,"Σουηδία");
		}
		else if (obj.innerHTML.match("Ukraine")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ukraine)/,"Ουκρανία");
		}
		else if (obj.innerHTML.match("Latvia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latvia)/,"Λετονία");
		}
		else if (obj.innerHTML.match("Spain")) {
			obj.innerHTML=obj.innerHTML.replace(/(Spain)/,"Ισπανία");
		}
		else if (obj.innerHTML.match("Brazil")) {
			obj.innerHTML=obj.innerHTML.replace(/(Brazil)/,"Βραζιλία");
		}
		else if (obj.innerHTML.match("USA")) {
			obj.innerHTML=obj.innerHTML.replace(/(USA)/,"ΗΠΑ");
		}
		else if (obj.innerHTML.match("United Kingdom")) {
			obj.innerHTML=obj.innerHTML.replace(/(United Kingdom)/,"Ηνωμένο Βασίλειο");
		}
		else if (obj.innerHTML.match("Portugal")) {
			obj.innerHTML=obj.innerHTML.replace(/(Portugal)/,"Πορτογαλία");
		}
		else if (obj.innerHTML.match("Argentina")) {
			obj.innerHTML=obj.innerHTML.replace(/(Argentina)/,"Αργεντινή");
		}
		else if (obj.innerHTML.match("India")) {
			obj.innerHTML=obj.innerHTML.replace(/(India)/,"Ινδία");
		}
		else if (obj.innerHTML.match("Netherlands")) {
			obj.innerHTML=obj.innerHTML.replace(/(Netherlands)/,"Ολλανδία");
		}
		else if (obj.innerHTML.match("Bosnia and Herzegovina")) {
			obj.innerHTML=obj.innerHTML.replace(/(Bosnia and Herzegovina)/,"Βοσνία & Ερζεγοβίνη");
		}
		else if (obj.innerHTML.match("Iran")) {
			obj.innerHTML=obj.innerHTML.replace(/(Iran)/,"Ιράν");
		}
		else if (obj.innerHTML.match("Finland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Finland)/,"Φιλανδία");
		}
		else if (obj.innerHTML.match("Germany")) {
			obj.innerHTML=obj.innerHTML.replace(/(Germany)/,"Γερμανία");
		}
		else if (obj.innerHTML.match("Mexico")) {
			obj.innerHTML=obj.innerHTML.replace(/(Mexico)/,"Μεξικό");
		}
		else if (obj.innerHTML.match("Canada")) {
			obj.innerHTML=obj.innerHTML.replace(/(Canada)/,"Καναδάς");
		}
		else if (obj.innerHTML.match("Taiwan")) {
			obj.innerHTML=obj.innerHTML.replace(/(Taiwan)/,"Ταϊβάν");
		}
		else if (obj.innerHTML.match("Ireland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ireland)/,"Ιρλανδία");
		}
		else if (obj.innerHTML.match("Australia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Australia)/,"Αυστραλία");
		}
		else if (obj.innerHTML.match("South Korea")) {
			obj.innerHTML=obj.innerHTML.replace(/(South Korea)/,"Νότια Κορέα");
		}
		else if (obj.innerHTML.match("Colombia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Colombia)/,"Κολομβία");
		}
		else if (obj.innerHTML.match("Chile")) {
			obj.innerHTML=obj.innerHTML.replace(/(Chile)/,"Χιλή");
		}
		else if (obj.innerHTML.match("Pakistan")) {
			obj.innerHTML=obj.innerHTML.replace(/(Pakistan)/,"Πακιστάν");
		}
		else if (obj.innerHTML.match("Malaysia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Malaysia)/,"Μαλαισία");
		}
		else if (obj.innerHTML.match("Belgium")) {
			obj.innerHTML=obj.innerHTML.replace(/(Belgium)/,"Βέλγιο");
		}
		else if (obj.innerHTML.match("Switzerland")) {
			obj.innerHTML=obj.innerHTML.replace(/(Switzerland)/,"Ελβετία");
		}
		else if (obj.innerHTML.match("Peru")) {
			obj.innerHTML=obj.innerHTML.replace(/(Peru)/,"Περού");
		}
		else if (obj.innerHTML.match("Norway")) {
			obj.innerHTML=obj.innerHTML.replace(/(Norway)/,"Νορβηγία");
		}
		else if (obj.innerHTML.match("Austria")) {
			obj.innerHTML=obj.innerHTML.replace(/(Austria)/,"Αυστρία");
		}
		else if (obj.innerHTML.match("Denmark")) {
			obj.innerHTML=obj.innerHTML.replace(/(Denmark)/,"Δανία");
		}
		else if (obj.innerHTML.match("Montenegro")) {
			obj.innerHTML=obj.innerHTML.replace(/(Montenegro)/,"Μαυροβούνιο");
		}
		else if (obj.innerHTML.match("Slovakia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Slovakia)/,"Σλοβακία");
		}
		else if (obj.innerHTML.match("Belarus")) {
			obj.innerHTML=obj.innerHTML.replace(/(Belarus)/,"Λευκορωσία");
		}
		else if (obj.innerHTML.match("Czech Republic")) {
			obj.innerHTML=obj.innerHTML.replace(/(Czech Republic)/,"Τσεχία");
		}
		else if (obj.innerHTML.match("Estonia")) {
			obj.innerHTML=obj.innerHTML.replace(/(Estonia)/,"Εσθονία");
		}
		else if (obj.innerHTML.match("Philippines")) {
			obj.innerHTML=obj.innerHTML.replace(/(Philippines)/,"Φιλιππίνες");
		}
		else if (obj.innerHTML.match("All countries")) {
			obj.innerHTML=obj.innerHTML.replace(/(All countries)/,"Όλες οι χώρες");
		}
		else if (obj.innerHTML.match("Select product...")) {
			obj.innerHTML=obj.innerHTML.replace(/(Select product...)/,"Επιλέξτε προϊόν...");
		}
		else if (obj.innerHTML.match("Iron")) {
			obj.innerHTML=obj.innerHTML.replace(/(Iron)/,"Σίδηρος");
		}
		else if (obj.innerHTML.match("Grain")) {
			obj.innerHTML=obj.innerHTML.replace(/(Grain)/,"Σιτάρι");
		}
		else if (obj.innerHTML.match("Oil")) {
			obj.innerHTML=obj.innerHTML.replace(/(Oil)/,"Πετρέλαιο");
		}
		else if (obj.innerHTML.match("Stone")) {
			obj.innerHTML=obj.innerHTML.replace(/(Stone)/,"Πέτρα");
		}
		else if (obj.innerHTML.match("Wood")) {
			obj.innerHTML=obj.innerHTML.replace(/(Wood)/,"Ξύλο");
		}
		else if (obj.innerHTML.match("Diamonds")) {
			obj.innerHTML=obj.innerHTML.replace(/(Diamonds)/,"Διαμάντια");
		}
		else if (obj.innerHTML.match("Weapon upgrade")) {
			obj.innerHTML=obj.innerHTML.replace(/(Weapon upgrade)/,"Οπλική αναβάθμιση");
		}
		else if (obj.innerHTML.match("Weapon")) {
			obj.innerHTML=obj.innerHTML.replace(/(Weapon)/,"Όπλα");
		}
		else if (obj.innerHTML.match("House")) {
			obj.innerHTML=obj.innerHTML.replace(/(House)/,"Σπίτια");
		}
		else if (obj.innerHTML.match("Gift")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift)/,"Δώρα");
		}
		else if (obj.innerHTML.match("Food")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food)/,"Φαγητό");
		}
		else if (obj.innerHTML.match("Ticket")) {
			obj.innerHTML=obj.innerHTML.replace(/(Ticket)/,"Εισιτήρια");
		}
		else if (obj.innerHTML.match("Defense System")) {
			obj.innerHTML=obj.innerHTML.replace(/(Defense System)/,"Αμυντικά συστήματα");
		}
		else if (obj.innerHTML.match("Hospital")) {
			obj.innerHTML=obj.innerHTML.replace(/(Hospital)/,"Νοσοκομεία");
		}
		else if (obj.innerHTML.match("Estate")) {
			obj.innerHTML=obj.innerHTML.replace(/(Estate)/,"Μέγαρο");
		}
		else if (obj.innerHTML.match("All parties")) {
			obj.innerHTML=obj.innerHTML.replace(/(All parties)/,"Όλα τα κόμματα");
		}
		else if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Τρέχων γύρος");
		}
		else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Γύρος $2 ");
		}
		else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed)/,"Άοπλος");
		}
		else if (obj.innerHTML.match("available")) {
			obj.innerHTML=obj.innerHTML.replace(/available/g,"διαθέσιμα");
		}
	}
}


//===================================================
//Homepage, Shouts, Misc & Events timestamp
//===================================================
function doHP() {
	//hp title
	replaceInnerHTML(getElements(document, "//div[@class='rightTabGrey']"), hpTitleReplacements);
	
	//index tabs
	replaceLinkByHref(hpTabsReplacements);
	
	//Articles content
	for (kk in hpContentArticlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No news")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No news)/,"Δεν υπάρχουν νέα");
		}
		
		replacNewspaperTimeWithAuthor(allElements);
	}

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
	replaceLinkSSS({
		"Show more battles":["Show more battles","Εμφάνισε περισσότερες μάχες"],
		"Subsidies informations":["Subsidies informations","Πληροφορίες επιδότησης"]
	});
	
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Δεν υπάρχουν επιδοτούμενες μάχες");
		}
		if	(allElements.innerHTML.match("No battles in your country")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No battles in your country)/,"Δεν υπάρχουν μάχες στη χώρα σας");
        }	
    }
	
	//Military orders & Elections notice
	allElements = document.getElementById('contentRow').children[2];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders)/,"Εντολές της στρατιωτικής μου μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for)/,"Πολεμήστε για");
	tmp.innerHTML=tmp.innerHTML.replace(/(You need click on activation link, which was sent to you on your e-mail.)/,"Πρέπει να πατήσετε στον σύνδεσμο ενεργοποίησης, ο οποίος στάλθηκε στο e-mail σας.");
	tmp.innerHTML=tmp.innerHTML.replace(/(If you didn't get the e-mail, please click)/,"Εάν δεν λάβατε το e-mail, παρακαλώ πατήστε");
	tmp.innerHTML=tmp.innerHTML.replace(/(here)/,"εδώ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party leader elections are scheduled on 15th day each month. You have time till 14th to)/,"Οι εκλογές για αρχηγό κόμματος είναι προγραμματισμένες για τις 15 κάθε μήνα. Έχετε χρόνο μέχρι τις 14 για να");
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections are scheduled on 25th day each month. You have time till 23rd to )/,"Οι εκλογές για τη Βουλή είναι προγραμματισμένες για τις 25 κάθε μήνα. Έχετε χρόνο μέχρι τις 23 για να ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Tomorrow are congress elections. Today party leaders are allowed to)/,"Αύριο είναι οι βουλευτικές εκλογές. Σήμερα οι αρχηγοί των κομμάτων μπορούν να");
	tmp.innerHTML=tmp.innerHTML.replace(/(edit candidatures)/,"επεξεργαστούν τις υποψηφιότητες");
	tmp.innerHTML=tmp.innerHTML.replace(/(in their parties)/,"στα κόμματά τους");
	tmp.innerHTML=tmp.innerHTML.replace(/(submit candidature)/,"υποβάλλετε υποψηφιότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(in your party)/,"στο κόμμα σας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections are scheduled on 5th day each month You have time till 5th to)/,"Οι προεδρικές εκλογές είναι προγραμματισμένες για τις 5 κάθε μήνα. Έχετε χρόνο μέχρι τις 5 για να");
	tmp.innerHTML=tmp.innerHTML.replace(/(submit your candidature)/,"υποβάλλετε την υποψηφιότητά σας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today is party leader elections day! You have time till)/,"Σήμερα είναι η μέρα εκλογών για αρχηγό κόμματος! Έχετε μέχρι τις");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today is congress elections day! You have time till)/,"Σήμερα είναι η μέρα βουλευτικών εκλογών! Έχετε μέχρι τις");
	tmp.innerHTML=tmp.innerHTML.replace(/(cast your vote)/,"για να ψηφίσετε");
	tmp.innerHTML=tmp.innerHTML.replace(/(proposed the new national referendum)/,"πρότεινε το νέο εθνικό δημοψήφισμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time remaining)/,"Υπολοιπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote now)/,"Ψηφίστε τώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View progress)/,"Εμφάνισε την πρόοδο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Referendum finished)/,"Το δημοψήφισμα τελείωσε");
	tmp.innerHTML=tmp.innerHTML.replace(/( to )/," ");
	tmp.innerHTML=tmp.innerHTML.replace(/(is asking for)/,": Ζητάει υποστήριξη στον εμφύλιο πόλεμο κατά της κυβέρνησης");
	tmp.innerHTML=tmp.innerHTML.replace(/(support in civil war against the government)/,"");
	tmp.innerHTML=tmp.innerHTML.replace(/(View)/,"Εμφάνισε");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Εντολές της στρατιωτικής μου μονάδας:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for)/,"Πολεμήστε για");
	tmp.innerHTML=tmp.innerHTML.replace(/(is asking for)/,": Ζητάει υποστήριξη στον εμφύλιο πόλεμο κατά της κυβέρνησης");
	tmp.innerHTML=tmp.innerHTML.replace(/(support in civil war against the government)/,"");
	tmp.innerHTML=tmp.innerHTML.replace(/(View)/,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Civil war in your country is in progress)/,"Ο εμφύλιος πόλεμος στη χώρα σας είναι σε εξέλιξη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Join)/,"Μπείτε");
	tmp.innerHTML=tmp.innerHTML.replace(/(the battle now)/,"στη μάχη τώρα");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Εντολές της στρατιωτικής μου μονάδας:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for)/,"Πολεμήστε για");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Εντολές της στρατιωτικής μου μονάδας:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for)/,"Πολεμήστε για");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Εντολές της στρατιωτικής μου μονάδας:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fight for)/,"Πολεμήστε για");
	
	//Events timestamp
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"1 λεπτό πριν");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"1 ώρα πριν");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"1 μέρα πριν");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"1 μήνα πριν");
        } 
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 λεπτά πριν");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 ώρες πριν");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 μέρες πριν");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 μήνες πριν");
        }
		
		//Events content
		
		//A new referendum was started in
		allElements.innerHTML=allElements.innerHTML.replace(/A new referendum was started in/g,"Ένα νέο δημοψήφισμα ξεκίνησε στην(-ο)");
		
		//Civil unrest has started in Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/Civil unrest has started in/g,"Κοινωνική αναταραχή ξεκίνησε στην(-ο)");
		
		//Civil unrest in Lithuania has turned into an open rebellion! 
		allElements.innerHTML=allElements.innerHTML.replace(/has turned into an open rebellion/g,"μετατράπηκε σε ανοικτή επανάσταση");
		allElements.innerHTML=allElements.innerHTML.replace(/Civil unrest in/g,"Η κοινωνική αναταραχή στην(-ο)");
		
		//Loyalists have defeated rebels in a civil war in Lithuania! 
		allElements.innerHTML=allElements.innerHTML.replace(/Loyalists have defeated rebels in a civil war in/g,"Οι κυβερνητικοί νίκησαν τους επαναστάτες στον εμφύλιο της(του)");
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"εξασφάλισε την(-ο) $2 στη μάχη απέναντι στην(-ο) ");
		
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Ο λαός της(του) $2 ξεκίνησαν αντίσταση στην(-ο) $5 $4");
		
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"δέχτηκε επίθεση από την(-ο) $2$3");
		
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Ο πρόεδρος της(του) $2 πρότεινε την κήρυξη πολέμου στην(-ο) $5$6 ");
		
		//Poland has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g,"κύρηξε πόλεμο στην(-ο) $2$3 ");
		
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g,"κατέκτησε την(-ο) $2 στη μάχη ενάντια στην(-ο) ");
		
		//Greece has new president
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g,"έχει νέο πρόεδρο");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","Εμφάνισε περισσότερα γεγονότα"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Εμφάνισε περισσότερα γεγονότα");
		
		//Money donation
		allElements.innerHTML=allElements.innerHTML.replace(/(Money donation of)/g,"Η χρηματική δωρεά");
		allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/g,"έγινε αποδεκτή");
		allElements.innerHTML=allElements.innerHTML.replace(/(was proposed in congress)/g,"προτάθηκε στη Βουλή");
		
		//Money issue
		allElements.innerHTML=allElements.innerHTML.replace(/(Issuing)/g,"Η έκδοση");
		allElements.innerHTML=allElements.innerHTML.replace(/(by congress)/g,"από τη Βουλή");
		
		//Hospital deployment
		allElements.innerHTML=allElements.innerHTML.replace(/(Hospital was deployed in)/g,"Ένα νοσοκομείο αναπτύχθηκε στην(-ο):");
		allElements.innerHTML=allElements.innerHTML.replace(/(President of)/g,"Ο πρόεδρος της(του)");
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed to deploy)/g,"πρότεινε την ανάπτυξη");		
		allElements.innerHTML=allElements.innerHTML.replace(/(Hospital in)/g,"ενός νοσοκομείου στην(-ο):");
		
		//DS deployment
		allElements.innerHTML=allElements.innerHTML.replace(/(Defense System was deployed in)/g,"Ένα αμυντικό σύστημα αναπτύχθηκε στην(-ο):");
		allElements.innerHTML=allElements.innerHTML.replace(/(Defense System in)/g,"ενός αμυντικού συστήματος στην(-ο):");
		
		//New taxes
		allElements.innerHTML=allElements.innerHTML.replace(/(New taxes for)/g,"Νέοι φόροι για");
		allElements.innerHTML=allElements.innerHTML.replace(/(Import tax)/g,"Φόρος εισαγωγής");
		allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/g,"έγιναν δεκτοί στην(-ο):");
		
		//Impeachment
		allElements.innerHTML=allElements.innerHTML.replace(/(Impeachment of president of)/g,"Η καθαίρεση του προέδρου της(του)");
		allElements.innerHTML=allElements.innerHTML.replace(/(was proposed)/g,"προτάθηκε στη Βουλή");
		
		//MPP
		allElements.innerHTML=allElements.innerHTML.replace(/(signed MPP with)/g,"υπέγραψε ΜΡΡ με την(-ο):");
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed mutual protection pact to)/g,"πρότεινε συμφωνία αμοιβαίας προστασίας στην(-ο):");
	
		//Peace
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed a peace treaty to)/g,"πρότεινε συνθήκη ειρήνης στην(-ο):");
	}
	
	//Shouts
	allElements = document.getElementById("command");
	
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Γράψε νέα ανακοίνωση:");
	
	//Shout button
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Ανακοίνωση!";
	
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Αποστολή στα κανάλια:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Αποστολή στα κανάλια:");
	}
	
	//Shout to: Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Χώρα $2  Στρατιωτική μονάδα $4 Φίλοι");
	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Περισσότερες ανακοινώσεις"] });
}


//===================================================
//Shouts
//===================================================
function doShouts() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country shouts/,"Ανακοινώσεις");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/View/,"Εμφάνισε");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/posted/g,"");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Work
//===================================================
function doWork() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Εργασία");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already worked)/,"Έχετε ήδη εργαστεί");
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no job and you can't be fired)/,"Δεν έχετε δουλειά και δεν μπορείτε να απολυθείτε");
	tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Πρέπει να είστε στη χώρα στην οποία βρίσκεται η εταιρία για να δουλέψετε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Ο χώρος εργασίας σου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Εργοδότης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Στρατιωτική μονάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Μισθός:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Παραίτηση");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Ο χώρος εργασίας σου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Εργοδότης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Στρατιωτική μονάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Μισθός:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Παραίτηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Σημερινά αποτελέσματα εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Μικτός μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Καθαρός μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Πληρωταίος φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Εργάστηκες στην");
	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Κερδισμένη εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Κερδισμένο οικονομικό επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Συνεχόμενες μέρες εργασίας ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Η βασική παραγωγικότητά σου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Παράγοντες παραγωγικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Συνολική παραγωγικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Μονάδες που παράχθηκαν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Ποιότητα εταιρίας πρώτων υλών");
	tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"κανένας");

	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no job)/,"Είστε άνεργος");
	replaceInputByValue({"Get a job now!":["Get a job now!","Πιάστε δουλειά τώρα!"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(You have not worked today)/,"Δεν έχετε δουλέψει σήμερα");
	replaceInputByValue({"Work now":["Work now","Δουλέψτε τώρα"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Σημερινά αποτελέσματα εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Μικτός μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Καθαρός μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Πληρωταίος φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Εργάστηκες στην");
	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Κερδισμένη εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Κερδισμένο οικονομικό επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Συνεχόμενες μέρες εργασίας ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Η βασική παραγωγικότητά σου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Παράγοντες παραγωγικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Συνολική παραγωγικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Μονάδες που παράχθηκαν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Ποιότητα εταιρίας πρώτων υλών");
	tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"κανένας");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no job)/,"Είστε άνεργος");
	replaceInputByValue({"Get a job now!":["Get a job now!","Πιάστε δουλειά τώρα!"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(You have not worked today)/,"Δεν έχετε δουλέψει σήμερα");
	replaceInputByValue({"Work now":["Work now","Δουλέψτε τώρα"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Σημερινά αποτελέσματα εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Μικτός μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Καθαρός μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Πληρωταίος φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Εργάστηκες στην");
	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Κερδισμένη εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Κερδισμένο οικονομικό επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Συνεχόμενες μέρες εργασίας ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Η βασική παραγωγικότητά σου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Παράγοντες παραγωγικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Συνολική παραγωγικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Μονάδες που παράχθηκαν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Ποιότητα εταιρίας πρώτων υλών");
	tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"κανένας");
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have no job)/,"Είστε άνεργος");
	replaceInputByValue({"Get a job now!":["Get a job now!","Πιάστε δουλειά τώρα!"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(You have not worked today)/,"Δεν έχετε δουλέψει σήμερα");
	replaceInputByValue({"Work now":["Work now","Δουλέψτε τώρα"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Σημερινά αποτελέσματα εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Μικτός μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Καθαρός μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Πληρωταίος φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Εργάστηκες στην");
	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Κερδισμένη εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Κερδισμένο οικονομικό επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/," Συνεχόμενες μέρες εργασίας ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Η βασική παραγωγικότητά σου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Παράγοντες παραγωγικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Συνολική παραγωγικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Μονάδες που παράχθηκαν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Ποιότητα εταιρίας πρώτων υλών");
	tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"κανένας");
}


//===================================================
//Train
//===================================================
function doTrain() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Στρατιωτική εκπαίδευση");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	
	replaceInputByValue({
		"Train":["Train","Εκπαίδευση"]
	});
	
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Η εκπαίδευση ολοκληρώθηκε. Παρακαλώ ελάτε ξανά αύριο");
		rowoffset = 2;
		
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Έχετε ήδη εκπαιδευτεί σήμερα");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Έχετε ήδη εκπαιδευτεί σήμερα. Παρακαλώ ελάτε ξανά αύριο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Κερδισμένη δύναμη:");
	
	tmp = allElements.children[3+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Equipment Stats)/,"Στατιστικά Εξοπλισμού");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage increased bonus)/,"Προσαύξηση ζημιάς");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hit increased bonus)/,"Προσαύξηση χτυπήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/g,"Ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Critical Hit)/,"Καίριο Χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Critical Hit chance)/,"Πιθανότητα K. X.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Miss chance)/,"Πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Chance to avoid DMG)/,"Πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base hit)/,"Βασικό χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your hit)/,"Τελικό χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base critical chance)/,"Βασική πιθανότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total critical chance)/,"Συνολική πιθανότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base miss chance)/,"Βασική πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Overall miss chance)/,"Συνολική πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base chance to avoid DMG)/,"Βασική πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Overall chance to avoid DMG)/,"Συνολική πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your damage is doubled when performing a critical hit)/,"Η ζημιά διπλασιάζεται όταν γίνεται καίριο χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(You deal 0 damage when missing a hit)/,"Κάνετε 0 ζημιά σε περίπτωση αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(You lose weapon and health during a miss)/,"Χάνετε όπλα και ζωή σε περίπτωση αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(however you still gain experience points)/,"όμως εξακολουθείτε να κερδίζετε πόντους εμπειρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(You won't lose health during a fight if you trigger this event)/,"Δεν θα χάσετε υγεία στη μάχη εάν ενεργοποιηθεί αυτό το γεγονός");
	tmp.innerHTML=tmp.innerHTML.replace(/(No item)/g,"Κανένα αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Offhand/,"Βοήθημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Helmet/,"Κράνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Vision/,"Όραση");
	tmp.innerHTML=tmp.innerHTML.replace(/Personal Armor/,"Θωράκιση");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon upgrade/,"Οπλισμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Equipment id/g,"Κωδ. Αντικειμένου");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Στρατιωτικές λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Συνολικές εκπαιδεύσεις:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Δύναμη:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Στρατιωτικός βαθμός:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Συνολική ζημιά:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Ζημιά χωρίς όπλο:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Ζημιά με όπλο Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Ζημιά με όπλο Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Ζημιά με όπλο Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Ζημιά με όπλο Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Ζημιά με όπλο Q5:");
	
	tmp = allElements.children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Στρατιωτικές λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Συνολικές εκπαιδεύσεις:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Δύναμη:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Στρατιωτικός βαθμός:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Συνολική ζημιά:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Ζημιά χωρίς όπλο:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Ζημιά με όπλο Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Ζημιά με όπλο Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Ζημιά με όπλο Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Ζημιά με όπλο Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Ζημιά με όπλο Q5:");
}


//===================================================
//Equipment
//===================================================
function doEquipment() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/My equipment/,"Ο εξοπλισμός μου");
    tmp = allElements.children[1];
    tmp.innerHTML=tmp.innerHTML.replace(/(Equipment Stats)/,"Στατιστικά Εξοπλισμού");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage increased bonus)/,"Προσαύξηση ζημιάς");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hit increased bonus)/,"Προσαύξηση χτυπήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/g,"Ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Critical Hit)/,"Καίριο Χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Critical Hit chance)/,"Πιθανότητα K. X.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Miss chance)/,"Πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Chance to avoid DMG)/,"Πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base hit)/,"Βασικό χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your hit)/,"Τελικό χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base critical chance)/,"Βασική πιθανότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total critical chance)/,"Συνολική πιθανότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base miss chance)/,"Βασική πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Overall miss chance)/,"Συνολική πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base chance to avoid DMG)/,"Βασική πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Overall chance to avoid DMG)/,"Συνολική πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your damage is doubled when performing a critical hit)/,"Η ζημιά διπλασιάζεται όταν γίνεται καίριο χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(You deal 0 damage when missing a hit)/,"Κάνετε 0 ζημιά σε περίπτωση αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(You lose weapon and health during a miss)/,"Χάνετε όπλα και ζωή σε περίπτωση αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(however you still gain experience points)/,"όμως εξακολουθείτε να κερδίζετε πόντους εμπειρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(You won't lose health during a fight if you trigger this event)/,"Δεν θα χάσετε υγεία στη μάχη εάν ενεργοποιηθεί αυτό το γεγονός");
	tmp.innerHTML=tmp.innerHTML.replace(/(No item)/g,"Κανένα αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Offhand/,"Βοήθημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Helmet/,"Κράνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Vision/,"Όραση");
	tmp.innerHTML=tmp.innerHTML.replace(/Personal Armor/,"Θωράκιση");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon upgrade/,"Οπλισμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Equipment id/g,"Κωδ. Αντικειμένου");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Equipment/,"Εξοπλισμός");
	tmp.innerHTML = tmp.innerHTML.replace(/Personal Armor/,"Θωράκιση");
	tmp.innerHTML = tmp.innerHTML.replace(/Weapon upgrade/,"Οπλισμός");
    tmp.innerHTML = tmp.innerHTML.replace(/Helmet/g,"Κράνος");
    tmp.innerHTML = tmp.innerHTML.replace(/Vision/g,"Όραση");
    tmp.innerHTML = tmp.innerHTML.replace(/Armor/,"Θωράκιση");
	tmp.innerHTML = tmp.innerHTML.replace(/Weapon/,"Οπλισμός");
    tmp.innerHTML = tmp.innerHTML.replace(/Offhand/g,"Βοήθημα");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/g,"Αφαίρεση");
	tmp.innerHTML = tmp.innerHTML.replace(/(No item)/g,"Κανένα αντικείμενο");
	tmp.innerHTML = tmp.innerHTML.replace(/Equipment id/g,"Κωδ. Αντικειμένου");
    tmp = allElements.children[5];
    tmp.innerHTML = tmp.innerHTML.replace(/Available equipment/,"Διαθέσιμος εξοπλισμός");
	tmp.innerHTML = tmp.innerHTML.replace(/Equipment/,"Εξοπλισμός");
    tmp.innerHTML = tmp.innerHTML.replace(/Quality/,"Ποιότητα");
    tmp.innerHTML = tmp.innerHTML.replace(/Slot/,"Θέση");
	tmp.innerHTML = tmp.innerHTML.replace(/Equipment id/g,"Κωδ. Αντικειμένου");
    tmp.innerHTML = tmp.innerHTML.replace(/Equip/g,"Χρήση");
    tmp.innerHTML = tmp.innerHTML.replace(/Auction/,"Δημοπρασία");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell on auction/g,"Πώληση σε δημοπρασία");
    tmp.innerHTML = tmp.innerHTML.replace(/No items/,"Κανένα αντικείμενο");
	tmp.innerHTML = tmp.innerHTML.replace(/Offhand/g,"Βοήθημα");
	tmp.innerHTML = tmp.innerHTML.replace(/Helmet/g,"Κράνος");
	tmp.innerHTML = tmp.innerHTML.replace(/Vision/g,"Όραση");
	tmp.innerHTML = tmp.innerHTML.replace(/Personal Armor/g,"Θωράκιση");
	tmp.innerHTML = tmp.innerHTML.replace(/Weapon upgrade/g,"Οπλισμός");
	tmp.innerHTML = tmp.innerHTML.replace(/Merge/,"Συγχώνευση");
	tmp.innerHTML = tmp.innerHTML.replace(/You can convert three items of the same quality into one item of higher quality/,"Μπορείτε να μετατρέψετε 3 αντικείμενα της ίδιας ποιότητας σε 1 υψηλότερης ποιότητας");
	tmp.innerHTML = tmp.innerHTML.replace(/Slot of the new item will be picked from ingredients slots/,"Η θέση του νέου αντικειμένου θα επιλεχθεί από τις θέσεις των συγχωνευμένων αντικειμένων");
	tmp.innerHTML = tmp.innerHTML.replace(/Conversion cost depend of ingredient quality/,"Το κόστος μετατροπής εξαρτάτε από την ποιότητα των συγχωνευμένων αντικειμένων");
	tmp.innerHTML = tmp.innerHTML.replace(/Gold/g,"Χρυσό");
}

//===================================================
//Companies
//===================================================
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Εταιρίες");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Εταιρία");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Προϊόν");
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Τοποθεσία");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Υπάλληλοι");
	tmp.innerHTML = tmp.innerHTML.replace(/No companies/,"Καμία εταιρία");
	
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Δημιουργία νέας εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Όνομα εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Τύπος");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Εικόνα εταιρίας");
	tmp.innerHTML = tmp.innerHTML.replace(/max. size/,"μέγιστο μέγεθος");
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Δημιουργία εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Η δημιουργία εταιρίας κοστίζει");
	tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"Χρυσό");
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"Η εταιρία θα δημιουργηθεί στην τρέχουσα τοποθεσία σας - Περιοχή: ");
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources,/,"Αναζήτηση περιοχών με πόρους:");
	tmp.innerHTML = tmp.innerHTML.replace(/click here/,"Πατήστε εδώ");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Οδηγός εταιριών στο wiki");
}


//===================================================
//Company Details
//===================================================
function doCompanyDetails() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Εταιρία:");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Στρατιωτική μονάδα");
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Εργοδότης");
    tmp.innerHTML = tmp.innerHTML.replace(/Edit company/,"Επεξεργασία εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Show company summary/,"Εμφάνισε σύνοψη της εταιρίας");
    tmp = allElements.children[4];
	tmp.innerHTML = tmp.innerHTML.replace(/Salary in/,"Μισθός σε");
    tmp.innerHTML = tmp.innerHTML.replace(/Production progress/,"Πρόοδος παραγωγής");
    tmp.innerHTML = tmp.innerHTML.replace(/Raw per one product/,"Πρώτες ύλες ανά προϊόν");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Εργαζόμενοι");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees who worked today/,"Εργαζόμενοι που δούλεψαν σήμερα");
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Πολίτης");
    tmp.innerHTML = tmp.innerHTML.replace(/Economy skill/,"Οικονομικό επίπεδο");
    tmp.innerHTML = tmp.innerHTML.replace(/Salary/g,"Μισθός");
	tmp.innerHTML = tmp.innerHTML.replace(/Fire/g,"Απόλυση");
    tmp.innerHTML = tmp.innerHTML.replace(/edit/g,"επεξεργασία");
    tmp.innerHTML = tmp.innerHTML.replace(/view workers productivity/g,"Δείτε την παραγωγικότητα των εργαζόμενων");
	tmp.innerHTML = tmp.innerHTML.replace(/Productivity info/,"Πληροφορίες παραγωγικότητας");
    tmp.innerHTML = tmp.innerHTML.replace(/Upgrade company/,"Αναβάθμιση εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Upgrading company costs/,"Η αναβάθμιση εταιρίας κοστίζει");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold/g,"Χρυσό");
    tmp.innerHTML = tmp.innerHTML.replace(/Downgrade company/,"Υποβάθμιση εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Downgrading company retrieves/,"Η υποβάθμιση εταιρίας αντλεί");
    tmp.innerHTML = tmp.innerHTML.replace(/Job offers/,"Θέσεις εργασίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Min. skill/,"Ελάχ. οικον. επίπεδο");
    tmp.innerHTML = tmp.innerHTML.replace(/Offers/,"Θέσεις");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Αλλαγή");
    tmp.innerHTML = tmp.innerHTML.replace(/Apply/g,"Εφαρμογή");
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Καμία θέση εργασίας");
    tmp.innerHTML = tmp.innerHTML.replace(/View on market/g,"Εμφάνιση στην αγορά");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new job offer/,"Ανάρτηση νέας θέσης εργασίσς");
    tmp.innerHTML = tmp.innerHTML.replace(/Minimal economic skill/,"Ελάχιστο οικονομικό επίπεδο");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Θέσεις");
    tmp.innerHTML = tmp.innerHTML.replace(/Create job offer/,"Δημιουργία θέσης εργασίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell company/,"Πώληση εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Price in Gold/,"Τιμή σε Χρυσό");
    tmp.innerHTML = tmp.innerHTML.replace(/Post sell offer/,"Ανάρτηση προσφοράς");
}


//===================================================
//Edit Company
//===================================================
function doCompanyEdit() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Στρατιωτική μονάδα");
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Εργοδότης");
    tmp.innerHTML = tmp.innerHTML.replace(/You are not owner of this company/,"Δεν είστε ιδιοκτήτης αυτής της εταιρίας");
    tmp = allElements.children[2];
	tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Στρατιωτική μονάδα");
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Εργοδότης");
	tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Όνομα εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/New avatar/,"Νέα εικόνα");
    tmp.innerHTML = tmp.innerHTML.replace(/max. size/,"μέγιστο μέγεθος");
    tmp.innerHTML = tmp.innerHTML.replace(/Edit company/,"Επεξεργασία εταιρίας");
	tmp = allElements.children[4];
	tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Όνομα εταιρίας");
    tmp.innerHTML = tmp.innerHTML.replace(/New avatar/,"Νέα εικόνα");
    tmp.innerHTML = tmp.innerHTML.replace(/max. size/,"μέγιστο μέγεθος");
    tmp.innerHTML = tmp.innerHTML.replace(/Edit company/,"Επεξεργασία εταιρίας");
}


//===================================================
//Company Results
//===================================================
function doCompanyResults() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Εταιρία:");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Στρατιωτική μονάδα");
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Εργοδότης");
    tmp.innerHTML = tmp.innerHTML.replace(/Edit company/,"Επεξεργασία εταιρίας");
    tmp = allElements.children[5];
	tmp.innerHTML = tmp.innerHTML.replace(/Historical work results/,"Ιστορικό αποτελεσμάτων εργασίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Worker/,"Εργαζόμενος");
    tmp.innerHTML = tmp.innerHTML.replace(/Productivity/,"Παραγωγικότητα");
    tmp.innerHTML = tmp.innerHTML.replace(/units produced/,"παραγόμενες μονάδες");
    tmp.innerHTML = tmp.innerHTML.replace(/Skill/,"Οικ. επίπεδο");
    tmp.innerHTML = tmp.innerHTML.replace(/Day/g,"Mέρα");
}


//===================================================
//Company Sumamry
//===================================================
function doCompanySummary() {
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Company summary/,"Σύνοψη εταιρίας");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/List companies/,"Απαρίθμηση εταιριών");
    tmp.innerHTML = tmp.innerHTML.replace(/Calculate prices using latest/,"Υπολόγισμός τιμών βάσει τελευταίων");
    tmp.innerHTML = tmp.innerHTML.replace(/Calculate prices in country/,"Υπολογισμός τιμών βάσει χώρας");
    tmp.innerHTML = tmp.innerHTML.replace(/Period start/,"Αρχή περιόδου");
    tmp.innerHTML = tmp.innerHTML.replace(/Period end/,"Τέλος περιόδου");
    tmp.innerHTML = tmp.innerHTML.replace(/View logs/,"Εμφάνιση αρχείων");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit companies/,"Εταιρίες στρατιωτικής μονάδας");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen companies/,"Εταιρίες πολίτη");
    tmp.innerHTML = tmp.innerHTML.replace(/days/g,"ημερών");
    tmp.innerHTML = tmp.innerHTML.replace(/Game day/g,"Ημέρα παιχνιδιού");
    tmp = allElements.children[6];
	tmp.innerHTML = tmp.innerHTML.replace(/Product pricing/,"Τιμολόγιση προϊόντος");
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Εταιρίες");
    tmp.innerHTML = tmp.innerHTML.replace(/Company/g,"Εταιρία");
    tmp.innerHTML = tmp.innerHTML.replace(/None/g,"Καμία");
    tmp.innerHTML = tmp.innerHTML.replace(/Summary/,"Σύνοψη");
    tmp.innerHTML = tmp.innerHTML.replace(/Production/g,"Παραγωγή");
    tmp.innerHTML = tmp.innerHTML.replace(/Total production/,"Συνολική παραγωγή");
    tmp.innerHTML = tmp.innerHTML.replace(/Raw Usage/g,"Χρήση πρώτων υλών");
    tmp.innerHTML = tmp.innerHTML.replace(/Raw usage/g,"Χρήση πρώτων υλών");
    tmp.innerHTML = tmp.innerHTML.replace(/Total raw usage/,"Συνολική χρήση πρώτων υλών");
    tmp.innerHTML = tmp.innerHTML.replace(/Salaries/g,"Μισθοί");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/net/g,"καθαρά");
	tmp.innerHTML=tmp.innerHTML.replace(/Based on/g,"Βασισμένη σε");
	tmp.innerHTML=tmp.innerHTML.replace(/items traded on/g,"κομμάτια εμπορίου στην");
	tmp.innerHTML=tmp.innerHTML.replace(/market in the last/g,"αγορά τις τελυταίες");
	tmp.innerHTML=tmp.innerHTML.replace(/days/g,"μέρες");
}


//===================================================
//Newspaper
//===================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Εφημερίδα");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Redactor/,"Εκδότης");
	tmp.innerHTML=tmp.innerHTML.replace(/Creating newspaper costs/,"Η δημιουργία εφημερίδας κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/View subs/,"Εμφάνισε συνδρομητές");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Όνομα εφημερίδας:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper Avatar:/,"Εικόνα εφημερίδας:");
	tmp.innerHTML=tmp.innerHTML.replace(/max. size/,"μέγιστο μέγεθος:");
	tmp.innerHTML=tmp.innerHTML.replace(/Create newspaper/,"Δημιουργία εφημερίδας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper tutorial on wiki/,"Οδηγός εφημερίδας στο wiki");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Πρόσφατα άρθρα");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Επεξεργασία εφημερίδας"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Οδηγός εφημερίδας στο wiki"]
	});
	replaceInputByValue({
		"Publish":["Publish","Δημοσίευση"],
		"Preview":["Preview","Προεπισκόπηση"],
	});
	
	//New article
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Συγγραφή νέου άρθρου");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Έκδοση στη χώρα");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Τίτλος άρθρου:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Άρθρο:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Παρακαλώ σώστε ένα αντίγραφο του άρθρου στο σκληρό δίσκο σας πριν το δημοσιεύσετε");
	}
}


//===================================================
//Subs List
//===================================================
function doSubsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Your Subs/,"Οι συνδρομητές σας");	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Total citizens:/,"Συνολικοί πολίτες:");
	tmp.innerHTML=tmp.innerHTML.replace(/Show more/,"Εμφάνισε περισσότερους");
	tmp = allElements.childNodes[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Number/,"Αριθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/User/,"Χρήστης");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
}


//===================================================
//Edit Newspaper
//===================================================
function doNewspaperEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Redactor/,"Εκδότης");
	tmp.innerHTML=tmp.innerHTML.replace(/View subs/,"Εμφάνισε συνδρομητές");
	
	allElements = document.getElementById('editNewspaperForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Όνομα εφημερίδας:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Νέα εικόνα:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","μέγιστο μέγεθος:");
	
		//Not working ?
		replaceLinkByHref({
			"editNewspaper.html":["Edit newspaper","Επεξεργασία εφημερίδας"]
		});
		replaceInputByValue({
			"Delete":["Edit newspaper","Επεξεργασία εφημερίδας"]
		});
	
		//Another way
	allDivs = getElements(allElements, "//input[@value='Edit newspaper']");
	allDivs.snapshotItem(0).value="Επεξεργασία εφημερίδας";
}


//===================================================
//Article
//===================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Άρθρο");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Redactor/,"Εκδότης");
	tmp.innerHTML=tmp.innerHTML.replace(/View subs/,"Εμφάνισε συνδρομητές");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/View votes/,"Εμφάνισε ψήφους");
	tmp.innerHTML=tmp.innerHTML.replace(/Posted/,"Δημοσιεύτηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/by/,"από");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous article/,"Προηγούμενο άρθρο");
	tmp.innerHTML=tmp.innerHTML.replace(/next article/,"Επόμενο άρθρο");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Comments/,"Σχόλια");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
		
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Επεξεργασία άρθρου"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Επεξεργασία εφημερίδας"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Αναφορά"],
		"Edit":["Edit","Επεξεργασία"],
		"Delete":["Delete","Διαγραφή"]
	});
	replaceInputByValue({
		"Publish":["Publish","Δημοσίευση"],
		"Report":["Report","Αναφορά"],
		"Edit":["Edit","Επεξεργασία"],
		"Delete":["Delete","Διαγραφή"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Νέο σχόλιο");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Μήνυμα:");
}


//===================================================
//Votes List
//===================================================
function doVotesList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Your Votes/,"Οι ψήφοι σας");	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Total citizens:/,"Συνολικοί πολίτες:");
	tmp.innerHTML=tmp.innerHTML.replace(/Show more/,"Εμφάνισε περισσότερους");
	tmp = allElements.childNodes[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Number/,"Αριθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/User/,"Χρήστης");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
}


//===================================================
//Edit Article
//===================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Εφημερίδα");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Redactor/,"Εκδότης");
	tmp.innerHTML=tmp.innerHTML.replace(/View subs/,"Εμφάνισε συνδρομητές");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Επεξεργασία άρθρου");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Τίτλος άρθρου:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Άρθρο:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Επεξεργασία εφημερίδας"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Οδηγός εφημερίδας στο wiki"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Επεξεργασία άρθρου"]
	});
}


//===================================================
//Party
//===================================================
function doMyParty() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Party/,"Κόμμα");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/You are not in a party/,"Δεν είστε σε κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Join a party/,"Μπείτε σε κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Party Leader/,"Αρχηγός κόμματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Members/,"Μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/Leave party/,"Αποχώρηση από το κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Edit party/,"Επεξεργασία κόμματος");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Create your own party/,"Δημιουργήστε το δικό σας κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Party name/,"Όνομα κόμματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Short description/,"Σύντομη περιγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/Party Avatar/,"Εικόνα κόμματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Create party/,"Δημιουργία κόμματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Creating a party costs/,"Η δημιουργία κόμματος κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Members/,"Μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/Member/,"Μέλος");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9C%CE%AD%CE%BB%CE%BF%CF%82/,"Member");
	tmp.innerHTML=tmp.innerHTML.replace(/Level\(xp\)/,"Επίπεδο (Εμπειρία)");
	tmp.innerHTML=tmp.innerHTML.replace(/Joined/,"Είσοδος");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Send broadcast message/,"Αποστολή κυκλικού μηνύματος");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Edit Party
//===================================================
function doEditParty() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Party Leader/,"Αρχηγός κόμματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Members/,"Μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/Leave party/,"Αποχώρηση από το κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Party description/,"Περιγραφή κόμματος");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Party name/,"Όνομα κόμματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Short description/,"Σύντομη περιγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar/,"Νέα εικόνα");
	tmp.innerHTML=tmp.innerHTML.replace(/max. size/,"μέγιστο μέγεθος");
	tmp.innerHTML=tmp.innerHTML.replace(/Edit party/,"Επεξεργασία κόμματος");
}


//===================================================
//Party Broadcast
//===================================================
function doPartyBroadcast() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(New broadcast message)/,"Νέο κυκλικό μήνυμα");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Title)/,"Θέμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Message)/,"Μήνυμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send)/,"Αποστολή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Preview)/,"Προεπισκόπηση");
}


//===================================================
//Contracts
//===================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Συμβόλαια");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Πρότυπα");
	tmp.innerHTML=tmp.innerHTML.replace(/No templates/,"Κανένα");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Προτεινόμενα συμβόλαια (τελευταία 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"προσφέρθηκε προς");
	tmp.innerHTML=tmp.innerHTML.replace(/offered by/g,"προσφέρθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Κανένα");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Αποδεχθέντα συμβόλαια (τελευταία 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"προσφέρθηκε προς");
	tmp.innerHTML=tmp.innerHTML.replace(/offered by/g,"προσφέρθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Κανένα");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Απορριφθέντα συμβόλαια");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Απορρίφθηκε από $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"κανένα");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Αποτυχημένα συμβόλαια");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Κανένα");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Τα ενεργά σας δάνεια");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Δανειολήπτης");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Χρόνος αποπληρωμής");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Ακύρωση χρέους");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Κανένα δάνειο");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Τα ενεργά σας χρέη");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Δανειστής");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Χρόονος αποπληρωμής");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Πληρωμή χρέους");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Κανένα χρέος");
	tmp.innerHTML=tmp.innerHTML.replace("Game day","Ημέρα παιχνιδιού");
	tmp.innerHTML=tmp.innerHTML.replace("Gold","Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Αποπληρωμή");
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Όνομα προτύπου:");
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Contracts":["Contract tutorial","Οδηγός συμβολαίων"],
		"#":["Create new template","Δημιουργία νέου προτύπου"]
	});
	replaceInputByValue({
		"Delete":["Delete","Διαγραφή"],
		"Create template":["Create template","Δημιουργία προτύπου"]
	});
}


//===================================================
//Shares
//===================================================
function doShares() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/My shares/,"Οι μετοχές μου");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένων εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned shares/,"Χαρτοφυλάκιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Public company/,"Εισηγμένη εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company/,"Εισηγμένη εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares/,"Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/No stocks/,"Καμία μετοχή");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/My orders/,"Οι εντολές μου");
	tmp.innerHTML=tmp.innerHTML.replace(/Public company/,"Εισηγμένη εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/,"Όγκος");
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Τύπος");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete/,"Διαγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/No orders/,"Καμία εντολή");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/My roles/,"Οι θέσεις μου");
	tmp.innerHTML=tmp.innerHTML.replace(/Public company/,"Εισηγμένη εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Role/,"Θέση");
	tmp.innerHTML=tmp.innerHTML.replace(/No roles/,"Καμία θέση");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Create new public company/,"Δημιουργία νέας εισηγμένης εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Public company name/,"Όνομα εισηγμένης εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Company avatar/,"Εικόνα εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/max. size/,"μέγιστο μέγεθος");
	tmp.innerHTML=tmp.innerHTML.replace(/Create public company/,"Δημιουργία εισηγμένης εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Creating company costs/,"Η δημιουργία εταιρίας κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/starting capital/,"το αρχικό κεφάλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/The stock company will be located in/,"Η εισηγμένη εταιρία θα βρίσκεται στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Be aware that it's illegal to fraud investors' money/,"Προσέχτε ότι είναι παράνομο να εξαπατήσεται τους επενδυτές");
}


//===================================================
//Stock Company
//===================================================
function doStockCompany() {
	allElements = document.getElementById('contentRow').children[2];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company/,"Εισηγμένη εταιρία");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Company statute/,"Εταιρικές αρχές");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock price/g,"Τιμή μετοχής");
	tmp.innerHTML=tmp.innerHTML.replace(/Sell shares/g,"Πώληση μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares Available/g,"Διαθέσιμες μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares will be sold instantly if there is corresponding buy offer on the market/g,"Οι μετοχές θα πωλούνται άμεσα αν υπάρχει αντίστοιχη προσφορά αγοράς στην αγορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Acts/g,"Ενέργειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Type/g,"Τύπος");
	tmp.innerHTML=tmp.innerHTML.replace(/Status/g,"Κατάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/g,"Ώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/g,"Αποδεκτή");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/g,"Αποτυχημένη");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected/g,"Απορρίφθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/In progress/g,"Σε εξέλιξη");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%95%CE%BD%CE%AD%CF%81%CE%B3%CE%B5%CE%B9%CE%B5%CF%82/g,"Acts");
	tmp.innerHTML=tmp.innerHTML.replace(/More acts/g,"Περισσότερες ενέργειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Change nationality/g,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/Issue shares/g,"Έκδοση μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Pay dividend/g,"Πληρωμή μερίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Change company description/g,"Αλλαγή περιγραφής εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Change shares price/g,"Αλλαγή τιμής μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Split shares/g,"Σπάσιμο μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Change name/g,"Αλλαγή ονόματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Propose/g,"Πρόταση");
	tmp.innerHTML=tmp.innerHTML.replace(/Sack/g,"Απόλυση");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder/g,"Μέτοχος");
	tmp.innerHTML=tmp.innerHTML.replace(/Staff member/g,"Μέλος προσωπικού");
	tmp.innerHTML=tmp.innerHTML.replace(/Staff/g,"Προσωπικό");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/g,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Role/g,"Θέση");
	tmp.innerHTML=tmp.innerHTML.replace(/Company manager/g,"Διευθυντής εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Accountant/g,"Λογιστής");
	tmp.innerHTML=tmp.innerHTML.replace(/Supply manager/g,"Διευθυντής προμηθειών");
	tmp.innerHTML=tmp.innerHTML.replace(/Companies/g,"Εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Company/g,"Εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%95%CF%84%CE%B1%CE%B9%CF%81%CE%AF%CE%B1/g,"Company");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%95%CF%84%CE%B1%CE%B9%CF%81%CE%AF%CE%B1%CE%95%CE%BD%CE%AD%CF%81%CE%B3%CE%B5%CE%B9%CE%B5%CF%82/,"CompanyActs");
	tmp.innerHTML=tmp.innerHTML.replace(/Location/g,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/g,"Καμία εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/DS/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp.innerHTML=tmp.innerHTML.replace(/posted/g,"");
	tmp.innerHTML=tmp.innerHTML.replace(/Shouts/g,"Ανακοινώσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/Write a new shout/g,"Γράψτε νέα ανακοίνωση");
	//tmp.innerHTML=tmp.innerHTML.replace(/Shout/g,"Ανακοίνωση");
	tmp.innerHTML=tmp.innerHTML.replace(/More shouts/g,"Περισσότερες ανακοίνωσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%91%CE%BD%CE%B1%CE%BA%CE%BF%CE%B9%CE%BD%CF%8E%CF%83%CE%B5%CE%B9%CF%82/g,"Shouts");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy orders/g,"Εντολές αγοράς ");
	tmp.innerHTML=tmp.innerHTML.replace(/Buyer/g,"Αγοραστής");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy shares/g,"Αγορά μετοχων");
	tmp.innerHTML=tmp.innerHTML.replace(/NOTE/g,"ΣΗΜΕΙΩΣΗ");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares will be bought instantly if there is corresponding sale offer on the market/g,"Οι μετοχές θα αγοράζονται άμεσα εάν υπάρχει αντίστοιχη προσφορά πώλησης στην αγορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Otherwise it/g,"Διαφορετικά θα προστίθεται στο φύλλο εντολών");
	tmp.innerHTML=tmp.innerHTML.replace(/will added/g,"");
	tmp.innerHTML=tmp.innerHTML.replace(/to the orders sheet/g,"");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares market/g,"Χρηματηστήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/Offered shares/g,"Προσφερόμενες μετοχές ");
	tmp.innerHTML=tmp.innerHTML.replace(/Ask/g,"Ζήτηση");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/g,"Όγκος");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/g,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/g,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/stockΕταιρίαAction/g,"stockCompanyAction");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/g,"Καμία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/g,"Αγορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Bid/g,"Προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/showΠροσφοράOffers/g,"showBidOffers");
	tmp.innerHTML=tmp.innerHTML.replace(/Buyer/g,"Αγοραστής");
	tmp.innerHTML=tmp.innerHTML.replace(/Sell/g,"Πώληση");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/more offer\(s\)/g,"ακόμα προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/View previous transactions/g,"Εμφάνιση προηγούμενων συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Post buy order/g,"Ανάρτηση εντολής αγοράς");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholders/g,"Μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Minor shareholders/g,"Ελάσονες μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/g,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/Put buy offer/g,"Προσφορά αγοράς");
	tmp.innerHTML=tmp.innerHTML.replace(/Put on sale/g,"Προσφορά πώλησης");
	tmp.innerHTML=tmp.innerHTML.replace(/Latest transactions/g,"Τελευταίες συναλλαγές");
	tmp.innerHTML=tmp.innerHTML.replace(/View more transactions/g,"Εμφάνισε περισσότερες συναλλαγές");
}


//===================================================
//Stock Company Acts
//===================================================
function doStockCompanyActs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company acts/,"Ενέργειες εισηγμένης εταιρίας");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Acts/,"Ενέργειες");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Τύπος");
	tmp.innerHTML=tmp.innerHTML.replace(/Status/,"Κατάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/Results/,"Αποτελέσματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Yes:No/,"Ναι:Όχι");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Ώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/g,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Pending/g,"Εκκρεμεί");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/g,"Αποδεκτή");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected/g,"Απορρίφθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Issue shares/g,"Έκδοση μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Pay dividend/g,"Πληρωμή μερίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Propose/g,"Πρόταση");
	tmp.innerHTML=tmp.innerHTML.replace(/Sack/g,"Απόλυση");
	tmp.innerHTML=tmp.innerHTML.replace(/Change nationality/g,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/Change company description/g,"Αλλαγή περιγραφής εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Change shares price/g,"Αλλαγή τιμής μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Split shares/g,"Σπάσιμο μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Change name/g,"Αλλαγή ονόματος");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Stock Company Laws
//===================================================
function doStockCompanyLaws() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company law/,"Ενέργεια εισηγμένης εταιρίας");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Act type/,"Τύπος ενέργειας");
	tmp.innerHTML=tmp.innerHTML.replace(/Proposed by/,"Προτάθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Issue shares/,"Έκδοση μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Pay dividend/,"Πληρωμή μερίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Change company description/,"Αλλαγή περιγραφής εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Change shares price/,"Αλλαγή τιμής μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Split shares/g,"Σπάσιμο μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Change name/g,"Αλλαγή ονόματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Propose/,"Πρόταση");
	tmp.innerHTML=tmp.innerHTML.replace(/Sack/,"Απόλυση");
	tmp.innerHTML=tmp.innerHTML.replace(/\?/,";");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to issue and put on sale/,"Συμφωνείτε να εκδοθούν και να πουληθούν");
	tmp.innerHTML=tmp.innerHTML.replace(/shares at price/,"μετοχές με τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/per share/,"ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to pay/,"Συμφωνείτε να πληρωθεί");
	tmp.innerHTML=tmp.innerHTML.replace(/to shareholders/,"στους μετόχους");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to hire/,"Συμφωνείται να προσληφθεί η(ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/as CEO of the company/,"ως Διευθύνων Σύμβουλος της εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to sack the current CEO/,"Συμφωνίται να απολυθεί ο τρέχων Διευθύνων Σύμβουλος");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to change company statute into/,"Συμφωνίται να αλλάξουν οι εταιρικές αρχές σε");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to change the price of issued shares to/,"Συμφωνίται να αλλάξει η τιμή των μετοχών σε");
	tmp.innerHTML=tmp.innerHTML.replace(/NOTE: This act will end prematurely only if at least 75% of shareholders have casted their votes/,"ΠΡΟΣΟΧΗ: Αυτή η ενέργεια θα τελειώσει πρόωρα μόνο αν τουλάχιστον το 75% των μετόχων έχει ψηφίσει");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to perform a/,"Συμφωνείτε να πραγματοποιηθεί ένα");
	tmp.innerHTML=tmp.innerHTML.replace(/shares split/,"σπάσιμο μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to change the name of the company into/,"Συμφωνείτε να αλλάξει το όνομα της εταιρίας σε");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Voting finished/,"Η ψηφοφορία τέλειωσε");
	tmp.innerHTML=tmp.innerHTML.replace(/Remaining time/,"Εναπομείνασας χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Votes casted/,"Καταμετρημένοι ψήφοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Fail reason/,"Λόγος αποτυχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Yes/,"Ναι");
	tmp.innerHTML=tmp.innerHTML.replace(/No/,"Όχι");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporting shareholders/,"Μέτοχοι υπέρ");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholders against/,"Μέτοχοι κατά");
	tmp.innerHTML=tmp.innerHTML.replace(/Nobody/g,"Κανένας");
}


//===================================================
//Stock Company Shouts
//===================================================
function doStockCompanyShouts() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company shouts/,"Ανακοινώσεις εισηγμένης εταιρίας");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder/g,"Μέτοχος");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/g,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Staff member/g,"Προσωπικό");
	tmp.innerHTML=tmp.innerHTML.replace(/posted/g,"");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Stock Company Transactions
//===================================================
function doStockCompanyTransactions() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock Company transaction/,"Συναλλαγές εισηγμένης εταιρίας");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/,"Όγκος");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Ώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Buyer/,"Αγοραστής");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Stock Company Money
//===================================================
function doStockCompanyMoney() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company money accounts/,"Χρηματικοί λογαριασμοί εισηγμένης εταιρίας");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Money accounts/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Χρυσός");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Company offers/,"Εταιρικές προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/,"Αγορά");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Καμία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Stock Company Storage
//===================================================
function doStockCompanyStorage() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company storage/,"Αποθήκη εισηγμένης εταιρίας");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Storage/,"Αποθήκη");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Company offers/,"Εταιρικές προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Product/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock/,"Απόθεμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/g,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Gross/,"Μικτά");
	tmp.innerHTML=tmp.innerHTML.replace(/Net/,"Καθαρά");
	tmp.innerHTML=tmp.innerHTML.replace(/Vat/,"ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/Import tax/,"Φόρος εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Καμία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company/g,"Εισηγμένη εταιρία");
}


//===================================================
//Stock Company Money Donate
//===================================================
function doStockCompanyDonateM() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money to stock company/,"Δωρεά χρημάτων σε εισηγμμένη εταιρία");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Donate to/,"Δωρεά προς");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company/,"Εισηγμενη εταιρία");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Your money accounts/,"Οι χρηματικοί λογαριασμοί μου");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Χρυσός");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Select item to donate/,"Επιλέξτε συνάλλαγμα για δωρεά");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate item/,"Δωρεά συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Sum/,"Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Reason/,"Αιτιολογία");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate/,"Δωρεά");
}


//===================================================
//Stock Company Company Donate
//===================================================
function doStockCompanyDonateC() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select company to transfer)/,"Επιλέξτε εταιρία για μεταφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate company)/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select company)/,"Επιλέξτε εταιρία");
}
	

//===================================================
//Stock Company Logs
//===================================================
function doStockCompanyLog() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company logs/,"Καταγραφές εισηγμένης εταιρίας");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Log type)/,"Τύπος καταγραφής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Importance level)/,"Επίπεδο σημασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/All logs/,"Όλες οι καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/Money donated/,"Δωρεές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product donated/,"Δωρεές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Company bought/,"Αγορές εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Job offer created/,"Δημιουργίες θέσεων εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Job offer edited/,"Επεξεργασίες θέσεων εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Post sell company offer/,"Αναρτήσεις προσφορών πώλησης εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Edit sell company offer/,"Επεξεργασίες προσφορών πώλησης εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Worked fired/,"Απολύσεις εργατών");
	tmp.innerHTML=tmp.innerHTML.replace(/Salary edited/,"Επεξεργασίες μισθών");
	tmp.innerHTML=tmp.innerHTML.replace(/Company upgraded/,"Αναβαθμίσεις εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Company downgraded/,"Υποβαθμίσεις εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete job offer/,"Διαγραφές θέσεων εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Company profile edited/,"Επεξεργασίες εταιρικού προφίλ");
	tmp.innerHTML=tmp.innerHTML.replace(/Dividend transaction/,"Συναλλαγές μερισμάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Dividend paid/,"Πληρωμές μερισμάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares issued/,"Εκδόσεις μετοχων");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change fee/,"Παράβολα αλλαγών εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change/,"Αλλαγές εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/Issued share bought/,"Αγορές εκδιδομένων μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Money bough/,"Αγορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Money sold/,"Πωλήσεις συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Money put on sale/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product bought/,"Αγορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Product put on sale/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Product sold/,"Πωλήσεις προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary offer deleted/,"Διαγραφές προσφορών συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offer deleted/,"Διαγραφές προσφορών προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Name and avatar change/,"Αλλαγές ονόματος και εικόνας");
	tmp.innerHTML=tmp.innerHTML.replace(/Money removed by moderator/,"Αφαιρέσεις συναλλάγματος από διαχειριστή");
	tmp.innerHTML=tmp.innerHTML.replace(/Products removed by moderator/,"Αφαιρέσεις προϊόντων από διαχειριστή");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares removed by moderator/,"Αφαιρέσεις μετοχών από διαχειριστή");
	tmp.innerHTML=tmp.innerHTML.replace(/Company donated/,"Δωρεές εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares split/,"Σπάσιμο μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Important/,"Σημαντικό");
	tmp.innerHTML=tmp.innerHTML.replace(/Moderate/,"Μέτριο");
	tmp.innerHTML=tmp.innerHTML.replace(/Trivial/,"Ασήμαντο");
	tmp.innerHTML=tmp.innerHTML.replace(/All citizens/,"Όλοι οι πολίτες");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Ώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Log/,"Καταγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Τύπος");
	tmp.innerHTML=tmp.innerHTML.replace(/Importance/,"Σημαντικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Money donated/g,"Δωρεές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product donated/g,"Δωρεές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Company bought/g,"Αγορές εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Job offer created/g,"Δημιουργίες θέσεων εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Job offer edited/g,"Επεξεργασίες θέσεων εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Post sell company offer/g,"Αναρτήσεις προσφορών πώλησης εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Edit sell company offer/g,"Επεξεργασίες προσφορών πώλησης εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Worked fired/g,"Απολύσεις εργατών");
	tmp.innerHTML=tmp.innerHTML.replace(/Salary edited/g,"Επεξεργασίες μισθών");
	tmp.innerHTML=tmp.innerHTML.replace(/Company upgraded/g,"Αναβαθμίσεις εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Company downgraded/g,"Υποβαθμίσεις εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete job offer/g,"Διαγραφές θέσεων εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Company profile edited/g,"Επεξεργασίες εταιρικού προφίλ");
	tmp.innerHTML=tmp.innerHTML.replace(/Dividend transaction/g,"Συναλλαγές μερισμάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Dividend paid/g,"Πληρωμές μερισμάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares issued/g,"Εκδόσεις μετοχων");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change fee/g,"Παράβολα αλλαγών εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change/g,"Αλλαγές εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/Issued share bought/g,"Αγορές εκδιδομένων μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Money bough/g,"Αγορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Money sold/g,"Πωλήσεις συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Money put on sale/g,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product bought/g,"Αγορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Product put on sale/g,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Product sold/g,"Πωλήσεις προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary offer deleted/g,"Διαγραφές προσφορών συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offer deleted/g,"Διαγραφές προσφορών προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Name and avatar change/g,"Αλλαγές ονόματος και εικόνας");
	tmp.innerHTML=tmp.innerHTML.replace(/Money removed by moderator/g,"Αφαιρέσεις συναλλάγματος από διαχειριστή");
	tmp.innerHTML=tmp.innerHTML.replace(/Products removed by moderator/g,"Αφαιρέσεις προϊόντων από διαχειριστή");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares removed by moderator/g,"Αφαιρέσεις μετοχών από διαχειριστή");
	tmp.innerHTML=tmp.innerHTML.replace(/Company donated/g,"Δωρεές εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Shares split/g,"Σπάσιμο μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/Important/g,"Σημαντικό");
	tmp.innerHTML=tmp.innerHTML.replace(/Moderate/g,"Μέτριο");
	tmp.innerHTML=tmp.innerHTML.replace(/Trivial/g,"Ασήμαντο");
	tmp.innerHTML=tmp.innerHTML.replace(/has transfered/g,"μετέφερε την");
	tmp.innerHTML=tmp.innerHTML.replace(/into the stock company/g,"στην εισηγμένη εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/The company nationality has been changed from/g,"Η εθνικότητα της εταιρίας έχει αλλάξει από");
	tmp.innerHTML=tmp.innerHTML.replace(/dividend to its shareholders /g,"μέρισμα στους μετόχους της");
	tmp.innerHTML=tmp.innerHTML.replace(/ to /g," σε ");
	tmp.innerHTML=tmp.innerHTML.replace(/has bought/g,"αγόρασε μια");
	tmp.innerHTML=tmp.innerHTML.replace(/company for/g,"εταιρία για");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/has issued/g,"έκδοσε");
	tmp.innerHTML=tmp.innerHTML.replace(/at price/g,"μετοχές σε τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/the company has paid/g,"Η εταιρία πλήρωσε");
	tmp.innerHTML=tmp.innerHTML.replace(/the company has paid/g,"Η εταιρία πλήρωσε");
}


//===================================================
//Stock Company Assets
//===================================================
function doStockCompanyAssets() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company assets/,"Περιουσιακά στοιχεία εισηγμένης εταιρίας");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Asset)/,"Περιουσιακό στοιχείο");
	tmp.innerHTML=tmp.innerHTML.replace(/(value)/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Money value in gold/,"Αξία συναλλάγματος σε χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary offers value in gold/,"Αξια προσφορών αγοράς συναλλάγματος σε χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Products/,"Προιόντα");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers value in gold/,"Αξία προσφορών προϊόντων σε χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Total value/,"Συνολική αξία");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Companies/,"Εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Company/,"Εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Region/,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Occupant/,"Κάτοχος");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Storage/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/Product/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/,"Όγκος");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Products on market/,"Προϊόντα στην αγορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Product/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume/,"Όγκος");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/g,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/gross/,"μικτά");
	tmp.innerHTML=tmp.innerHTML.replace(/net/,"καθαρά");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/Money/g,"Συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσόςς");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/Money on monetary market/,"Συνάλλαγμα στην αγορά συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Money/,"Συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate/,"Ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Κσμία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσόςς");
}


//===================================================
//Stock Company Shareholder panel
//===================================================
function doStockCompanyHolderPanel() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/MM offers/,"Προσφορές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Product offers/,"Προσφορές προϊόντων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate company/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Logs/g,"Καταγραφές");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9A%CE%B1%CF%84%CE%B1%CE%B3%CF%81%CE%B1%CF%86%CE%AD%CF%82/,"Logs");
	tmp.innerHTML=tmp.innerHTML.replace(/Shareholder panel/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/Chairman/,"Πρόεδρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality/,"Εθνικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total Shares/,"Συνολικές Μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value/,"Εκτιμώμενη αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Refresh/,"Ανανέωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Estimated value per share/,"Εκτιμώμεμνη αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily shares trade value/,"Ημερήσια αξία όγκου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shareholders/,"Συνολικοί μέτοχοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Total companies/,"Συνολικές εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company tutorial/,"Οδηγός εισηγμένης εταιρίας");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Shareholder panel)/,"Επιλογές μετόχου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sack)/g,"Πρόταση για απόλυση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose)/g,"Πρόταση για");
	tmp.innerHTML=tmp.innerHTML.replace(/(New)/,"Νέος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/(issuing the law costs)/g,"η πρόταση κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sack)/g,"Απόλυση");
}


//===================================================
//My Auctions
//===================================================
function domyAuctions() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/My auctions/,"Οι δημοπρασίες μου");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/My auctions/,"Οι δημοπρασίες μου");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Top bid/,"Κορυφαία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Item/,"Αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Current price/,"Τρέχουσα τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Bidders/,"Προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/Time remaining/,"Υπολειπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Bid/,"Προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/No auctions/,"Καμία δημοπρασία");

	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/My bids/,"Οι προσφορές μου");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Top bid/,"Κορυφαία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Item/,"Αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Current price/,"Τρέχουσα τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Bidders/,"Προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/Time remaining/,"Υπολειπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Bid/,"Προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/No bid/,"Καμία προσφορά");
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Auctions tutorial/,"Οδηγός δημοπρασιών");
	
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Create auction/g,"Έναρξη δημοπρασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Item/,"Αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Starting price/,"Αρχική τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Auction duration in hours/,"Διάρκεια δημοπρασίας σε ώρες");
	tmp.innerHTML=tmp.innerHTML.replace(/hours/g,"ώρες");
	tmp.innerHTML=tmp.innerHTML.replace(/Creating auction costs 2.0% of initial price/,"Η έναρξη δημοπρασίας κοστίζει το 2.0% της αρχικής τιμής");
	tmp.innerHTML=tmp.innerHTML.replace(/Auction owner pays 1.0% auction fee when the auction is finished/,"Ο ιδιοκτήτης της δημοπρασίας πληρώνει 1.0% τέλος πληστηριασμού όταν τελειώσει η δημοπρασία");
}

	
//===================================================
//Contract details
//===================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Υποχρεώσεις $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Υποχρεώσεις εικονικού πολίτη");
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/g,"Εικονικός πολίτης");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Υποχρεώσεις $1");
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," θα κάνει δωρεά άμεσα τα ακόλουθα προϊόντα");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," θα κάνει δωρεά άμεσα το ακόλουθο χρηματικό ποσό");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," θα χρεωθεί με το ακόλουθο χρέος");
	obj.innerHTML=obj.innerHTML.replace(/Gold/,"Χρυσός");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"πρέπει να πληρωθεί την ημέρα $1$3$5 (μέσα σε $6 μέρες από την υπογραφή του συμβολαίου) στον/στην"
	);
}

function replaceOptionTxt(objs, replacements) {
	for (i = 0; i < objs.children.length; i++) {
		obj = objs.children[i];
		for (k in replacements) {
			if (obj.innerHTML.match(k)) {
				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
			}
		}
	}
}

function doContract() {
	allElements = document.getElementById('contentRow').children[1];
	
	//head
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Συμβόλαια");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Συμβόλαιο");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Κατάσταση συμβολαίου: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Αποδεχθέν");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Απορρίφθηκε από $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Αποτυχημένο");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Πρότυπο");
	
	//list
	allElements = allElements.children[8].children[0].children[0];
	tmp = allElements;
	replaceContractComm(tmp.children[0],1);
	allElements.innerHTML.match("Dummy citizen") ? isDummy=true : isDummy=false;
	replaceContractComm(tmp.children[2],isDummy?2:3);
	
	if (isDummy) {
		
		//add
		allElements = document.getElementById('contentRow').children[1].children[3];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Προσθήκη νέου στοιχείου στο συμβόλαιο");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Πλευρά");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Τύπος αντικειμένου");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Εικονικός πολίτης");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Χρήματα"],
			"Product":["Product","Προϊόντα"],
			"Debt":["Debt","Χρέος"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Αξία (σε ");
		
		allElements = document.getElementById('currencyId');
		replaceOptionTxt(allElements, {
			"Gold":["Gold","Χρυσό"]
		})
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Ποσότητα προϊόντος:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Τύπος προϊόντος:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Ποιότητα προϊόντος:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Σίδηρος"],
			"Grain":["Grain","Σιτάρι"],
			"Oil":["Oil","πετρέλαιο"],
			"Stone":["Stone","Πέτρα"],
			"Wood":["Wood","Ξύλο"],
			"Diamonds":["Diamonds","Διαμάντια"],
			"Weapon":["Weapon","Όπλα"],
			"House":["House","Σπίτια"],
			"Gift":["Gift","Δώρα"],
			"Food":["Food","Φαγητό"],
			"Ticket":["Ticket","Εισιτήρια"],
			"Defense System":["Defense System","Αμυντικά συστήματα"],
			"Hospital":["Hospital","Νοσοκομεία"],
			"Estate":["Estate","Μέγαρο"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Χρέος");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Αξία (σε ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Χρόνος αποπληρωμής:");
		tmp = allElements.children[5];
		
		allElements = document.getElementById('debtCurrencyId');
		replaceOptionTxt(allElements, {
			"Gold":["Gold","Χρυσό"]
		})
		
		allElements = document.getElementById('gameDay');
		replaceOptionTxt(allElements, {
			"in 1 day":["in 1 day","σε 1 μέρα"],
			"in 2 days":["in 2 days","σε 2 μέρες"],
			"in 3 days":["in 3 days","σε 3 μέρες"],
			"in 4 days":["in 4 days","σε 4 μέρες"],
			"in 5 days":["in 5 days","σε 5 μέρες"],
			"in 6 days":["in 6 days","σε 6 μέρες"],
			"in 7 days":["in 7 days","σε 7 μέρες"],
			"in 8 days":["in 8 days","σε 8 μέρες"],
			"in 9 days":["in 9 days","σε 9 μέρες"],
			"in 10 days":["in 10 days","σε 10 μέρες"],
			"in 11 days":["in 11 days","σε 11 μέρες"],
			"in 12 days":["in 12 days","σε 12 μέρες"],
			"in 13 days":["in 13 days","σε 13 μέρες"],
			"in 14 days":["in 14 days","σε 14 μέρες"],
			"in 15 days":["in 15 days","σε 15 μέρες"],
			"in 16 days":["in 16 days","σε 16 μέρες"],
			"in 17 days":["in 17 days","σε 17 μέρες"],
			"in 18 days":["in 18 days","σε 18 μέρες"],
			"in 19 days":["in 19 days","σε 19 μέρες"],
			"in 20 days":["in 20 days","σε 20 μέρες"],
			"in 21 days":["in 21 days","σε 21 μέρες"],
			"in 22 days":["in 22 days","σε 22 μέρες"],
			"in 23 days":["in 23 days","σε 23 μέρες"],
			"in 24 days":["in 24 days","σε 24 μέρες"],
			"in 25 days":["in 25 days","σε 25 μέρες"],
			"in 26 days":["in 26 days","σε 26 μέρες"],
			"in 27 days":["in 27 days","σε 27 μέρες"],
			"in 28 days":["in 28 days","σε 28 μέρες"],
			"in 29 days":["in 29 days","σε 29 μέρες"],
			"in 30 days":["in 30 days","σε 30 μέρες"],
			"in 31 days":["in 31 days","σε 31 μέρες"],
			"in 32 days":["in 32 days","σε 32 μέρες"],
			"in 33 days":["in 33 days","σε 33 μέρες"],
			"in 34 days":["in 34 days","σε 34 μέρες"],
			"in 35 days":["in 35 days","σε 35 μέρες"],
			"in 36 days":["in 36 days","σε 36 μέρες"],
			"in 37 days":["in 37 days","σε 37 μέρες"],
			"in 38 days":["in 38 days","σε 38 μέρες"],
			"in 39 days":["in 39 days","σε 39 μέρες"],
			"in 40 days":["in 40 days","σε 40 μέρες"],
			"in 41 days":["in 41 days","σε 41 μέρες"],
			"in 42 days":["in 42 days","σε 42 μέρες"],
			"in 43 days":["in 43 days","σε 43 μέρες"],
			"in 44 days":["in 44 days","σε 44 μέρες"],
			"in 45 days":["in 45 days","σε 45 μέρες"],
			"in 46 days":["in 46 days","σε 46 μέρες"],
			"in 47 days":["in 47 days","σε 47 μέρες"],
			"in 48 days":["in 48 days","σε 48 μέρες"],
			"in 49 days":["in 49 days","σε 49 μέρες"],
			"in 50 days":["in 50 days","σε 50 μέρες"],
			"in 51 days":["in 51 days","σε 51 μέρες"],
			"in 52 days":["in 52 days","σε 52 μέρες"],
			"in 53 days":["in 53 days","σε 53 μέρες"],
			"in 54 days":["in 54 days","σε 54 μέρες"],
			"in 55 days":["in 55 days","σε 55 μέρες"],
			"in 56 days":["in 56 days","σε 56 μέρες"],
			"in 57 days":["in 57 days","σε 57 μέρες"],
			"in 58 days":["in 58 days","σε 58 μέρες"],
			"in 59 days":["in 59 days","σε 59 μέρες"],
			"in 60 days":["in 60 days","σε 60 μέρες"],
			"in 61 days":["in 61 days","σε 61 μέρες"],
			"in 62 days":["in 62 days","σε 62 μέρες"],
			"in 63 days":["in 63 days","σε 63 μέρες"],
			"in 64 days":["in 64 days","σε 64 μέρες"],
			"in 65 days":["in 65 days","σε 65 μέρες"],
			"in 66 days":["in 66 days","σε 66 μέρες"],
			"in 67 days":["in 67 days","σε 67 μέρες"],
			"in 68 days":["in 68 days","σε 68 μέρες"],
			"in 69 days":["in 69 days","σε 69 μέρες"],
			"in 70 days":["in 70 days","σε 70 μέρες"],
			"in 71 days":["in 71 days","σε 71 μέρες"],
			"in 72 days":["in 72 days","σε 72 μέρες"],
			"in 73 days":["in 73 days","σε 73 μέρες"],
			"in 74 days":["in 74 days","σε 74 μέρες"],
			"in 75 days":["in 75 days","σε 75 μέρες"],
			"in 76 days":["in 76 days","σε 76 μέρες"],
			"in 77 days":["in 77 days","σε 77 μέρες"],
			"in 78 days":["in 78 days","σε 78 μέρες"],
			"in 79 days":["in 79 days","σε 79 μέρες"],
			"in 80 days":["in 80 days","σε 80 μέρες"],
			"in 81 days":["in 81 days","σε 81 μέρες"],
			"in 82 days":["in 82 days","σε 82 μέρες"],
			"in 83 days":["in 83 days","σε 83 μέρες"],
			"in 84 days":["in 84 days","σε 84 μέρες"],
			"in 85 days":["in 85 days","σε 85 μέρες"],
			"in 86 days":["in 86 days","σε 86 μέρες"],
			"in 87 days":["in 87 days","σε 87 μέρες"],
			"in 88 days":["in 88 days","σε 88 μέρες"],
			"in 89 days":["in 89 days","σε 89 μέρες"],
			"in 90 days":["in 90 days","σε 90 μέρες"]
		})		
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Πρόταση συμβολαίου");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Πρόταση προς");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Σημείωση:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Μπορείτε να προτείνετε συμβόλαια μόνο στους φίλους σας");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Εικονικός πολίτης"],
		"contracts.html":["Go back to contract list","Επιστροφή στον κατάλογο συμβολαίων"]
	});
	replaceInputByValue({
		"Delete":["Delete","Διαγραφή"],
		"Propose":["Propose","Πρόταση"],
		"Add item":["Add item","Προσθήκη αντικειμένου"]
	});
	
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1);
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Ακύρωση προσφοράς");
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Ακύρωση πρότασης"]});
	    }   
}


//===================================================
//Invite friends
//===================================================
function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Πρόσκληση φίλων");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Ο σύνδεσμος πρόσκλησης");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Στείλτε αυτόν το σύνδεσμο σε άλλους για να πάρετε επιπλέον");
	tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"Χρυσό");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Κερδίζετε");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who registers/,"Χρυσό για κάθε πολίτη που εγγράφεται");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"και φτάνει στο επίπεδο 7,");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"αφού χρησιμοποιήσει αυτόν το σύνδεσμο");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"και ακόμα");
    tmp.innerHTML = tmp.innerHTML.replace(/when he\/she gets his\/her/,"όταν πάρει");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"το πρώτο μετάλιο");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Επιπλέον πέρνετε");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% από το χρυσό που λαμβάνει ο παίκτης από μετάλια και άνοδο επιπέδων");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"Σημειώστε ότι οι φίλοι σας θα λάβουν επιπλέον");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7/,"Χρυσό επειδή εγγράφηκαν με την πρόσκλησή σας, όταν φτάσουν στο επίπεδο 7");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Πολίτες που προσκαλέσατε");
    tmp = allElements.children[5];
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Κατάταξη κατά");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Εμφάνιση");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Πολίτης");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Επίπεδο");
    tmp.innerHTML = tmp.innerHTML.replace(/XP/,"Εμπειρία");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Κερδισμένος χρυσός");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Χρόνος εγγραφής");
    tmp.innerHTML = tmp.innerHTML.replace(/No citizens/,"Κανένας πολίτης");

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Gold received")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold received)/,"Κερδισμένο χρυσό");
		} else if (obj.innerHTML.match("Register time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Register time)/,"Χρόνο εγγραφής");
		} else if (obj.innerHTML.match("Citizen name")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizen name)/,"Όνομα πολίτη");
		} else if (obj.innerHTML.match("By experience")) {
			obj.innerHTML=obj.innerHTML.replace(/(By experience)/,"Εμπειρία");
		} else if (obj.innerHTML.match("By nationality")) {
			obj.innerHTML=obj.innerHTML.replace(/(By nationality)/,"Εθνικότητα");
    		}
    		}
	
	TimeBasic(allElements,6,0,4);
    
    tmp = allElements.children[11];
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Στατιστικά");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Συνολικές χρήσεις του συνδέσμου πρόσκλησης");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Μοναδικές χρήσεις του συνδέσμου πρόσκλησης");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Συνολικοί πολίτες που εγγράφηκαν");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Πολίτες που έφτασαν το επίπεδο 7");
    tmp = allElements.children[14];
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Τελευταίες χρήσεις του συνδέσμου πρόσκλησης");
    tmp = allElements.children[15];
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Ώρα");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Προέλευση");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Πολίτης");
    
    TimeBasic(allElements,15,0,0);
    
    tmp = allElements.children[15].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3];
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Δεν είναι εγγεγραμένος");
            }        
    }
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Εμφάνισε περισσότερες χρήσεις");   
}


//===================================================
//Referrer Clicks
//===================================================
function doRefClicks() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Clicks on referrer link/,"Χρήσεις του συνδέσμου πρόσκλησης");
    tmp = allElements.children[1];
	tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Ώρα");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Προέλευση");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Πολίτης");
	tmp.innerHTML = tmp.innerHTML.replace(/No citizens/,"Κανένας πολίτης");
	tmp.innerHTML = tmp.innerHTML.replace(/Not registered/g,"Δεν είναι εγγεγραμένος");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Military Unit
//===================================================
function doMilitaryUnit() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Στρατιωτική μονάδα");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are not in any military unit)/,"Δεν είστε σε στρατιωτική μονάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Join existing one)/,"Ενταχθείτε σε μία υπάρχουσα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Create military unit)/,"Δημιουργείστε μία στρατιωτική μονάδα");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(You need to have level)/,"Πρέπει να είστε επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/(to join military unit)/,"για να ενταχθείτε σε στρατιωτική μονάδα");
		
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Description)/,"Περιγραφή");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current orders)/,"Τρέχουσες διαταγές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle:)/,"Μάχη:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Αντιστασιακός πόλεμος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Επιδοτήσεις:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"Πλευρά:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Briefing:)/,"Ενημέρωση:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"Ορατό μόνο στα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/Set orders/,"Έκδοση διαταγών");
	
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	replaceAlliesLinksss();
	
	//for( var i=0; i<2;i++){
	//tmp.innerHTML=tmp.innerHTML.replace(/(: none)/,": κανένας");
	//tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"κανένας σύμμαχος");
	//	}
	
	tmp.innerHTML=tmp.innerHTML.replace(/(battle won by)/,"Η μάχη κερδίθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit orders)/,"Επεξεργασία διαταγών");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Edit)/,"Επεξεργασία");
	tmp.innerHTML=tmp.innerHTML.replace(/(orders)/,"διαταγών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Set today's battle)/,"Ορισμός σημερινής μάχης");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles at this moment)/,"Καμία μάχη αυτή τη στιγμή");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/(View)/,"Εμφάνιση");
	tmp.innerHTML=tmp.innerHTML.replace(/(manage members)/,"Διαχείρηση μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/(No companies)/,"Καμία εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(See all companies)/,"Δείτε όλες τις εταιρίες");

	replaceLinkByHref({
	"http://wiki.e-sim.org/index.php/Military_unit":["Military units tutorial","Οδηγός στρατιωτικών μονάδων"]
	});
}


//===================================================
//Military Unit Edit
//===================================================
function doMUEdit() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Edit military unit/,"Επεξεργασία στρατιωτικής μονάδας");
	
	tmp = allElements.children[5];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[7];
	tmp.innerHTML = tmp.innerHTML.replace(/Edit military unit/g,"Επεξεργασία στρατιωτικής μονάδας");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit name/,"Όνομα στρατιωτικής μονάδας");
    tmp.innerHTML = tmp.innerHTML.replace(/New avatar/,"Νέα εικόνα");
    tmp.innerHTML = tmp.innerHTML.replace(/max. size/,"μέγιστο μέγεθος");
    tmp.innerHTML = tmp.innerHTML.replace(/Description/,"Περιγραφή");
	
	tmp = allElements.children[10];
    tmp.innerHTML = tmp.innerHTML.replace(/Hand over leadership to other player/,"Παράδοση ηγεσίας σε άλλον παίκτη");
    tmp.innerHTML = tmp.innerHTML.replace(/Player/,"Παίκτης");
    tmp.innerHTML = tmp.innerHTML.replace(/Hand over leadership/,"Παράδοση ηγεσίας");
    tmp.innerHTML = tmp.innerHTML.replace(/WARNING: this will leave you without any control on your military unit/,"ΠΡΟΣΟΧΗ: αυτό θα σας αφήσει χωρίς έλεγχο στην στρατιωτική σας μονάδα");
}


//===================================================
//Military Unit Nationality
//===================================================
function doMUNationality() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Edit military unit/,"Αλλαγή εθνικότητας στρατιωτικής μονάδας");
	
	tmp = allElements.children[5];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[9];
	tmp.innerHTML = tmp.innerHTML.replace(/Issue nationality change/,"Έκδοση αλλαγής εθνικότητας");
    tmp.innerHTML = tmp.innerHTML.replace(/New nationality/,"Νέα εθνικότητα");
    tmp.innerHTML = tmp.innerHTML.replace(/Issue chamge/,"Έκδοση αλλαγής");
    tmp.innerHTML = tmp.innerHTML.replace(/Issuing nationality change cost/,"Η έκδοση αλλαγής εθνικότητας κοστίζει");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold and needs to be accepted by congress/,"Χρυσό και πρέπει να εγκριθεί από τη Βουλή");
}


//===================================================
//Military Unit Privilages
//===================================================
function doMUPriv() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit members/,"Προνόμια μελών στρατιωτικής μονάδας");
	
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[6];
	tmp.innerHTML = tmp.innerHTML.replace(/Officers/,"Αξιωματικοί");
    tmp.innerHTML = tmp.innerHTML.replace(/Are allowed to change orders/,"Επιτρέπεται να αλλάζουν διαταγές");
    tmp.innerHTML = tmp.innerHTML.replace(/Add officer/,"Προσθήκη αξιωματικού");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove officer/,"Αφαίρεση αξιωματικού");
    tmp.innerHTML = tmp.innerHTML.replace(/Add/,"Προσθήκη");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/,"Αφαίρεση");
	
	tmp = allElements.children[7];
	tmp.innerHTML = tmp.innerHTML.replace(/Director of personnel/,"Προσωπάρχες");
    tmp.innerHTML = tmp.innerHTML.replace(/Allowed to accept\/decline candidatures/,"Επιτρέπεται να δέχονται/απορρίπτουν υποψήφιους");
    tmp.innerHTML = tmp.innerHTML.replace(/Add director of personnel/,"Προσθήκη προσωπάρχη");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove director of personnel/,"Αφαίρεση προσωπάρχη");
    tmp.innerHTML = tmp.innerHTML.replace(/Add/,"Προσθήκη");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/,"Αφαίρεση");
	
	tmp = allElements.children[10];
	tmp.innerHTML = tmp.innerHTML.replace(/Storage director/,"Σιτιστές/Οπλονόμοι");
    tmp.innerHTML = tmp.innerHTML.replace(/Allowed to send money and items from unit's storage/,"Επιτρέπεται να στέλνουν λεφτά και αντικείμενα από την αποθήκη της μονάδας");
    tmp.innerHTML = tmp.innerHTML.replace(/Add storage director/,"Προσθήκη σιτιστή/οπλονόμου");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove storage director/,"Αφαίρεση σιτιστή/οπλονόμου");
    tmp.innerHTML = tmp.innerHTML.replace(/Add/,"Προσθήκη");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/,"Αφαίρεση");
	
	tmp = allElements.children[11];
	tmp.innerHTML = tmp.innerHTML.replace(/Company Managers/,"Διοικητές εταιριών");
    tmp.innerHTML = tmp.innerHTML.replace(/Are allowed to fire\/hire people in companies/,"Επιτρέπεται να απολύουν/προσλαμβάνουν υπαλλήλους στις εταιρίες");
    tmp.innerHTML = tmp.innerHTML.replace(/Add company manager/,"Προσθήκη διοικητή εταιριών");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove company manager/,"Αφαίρεση διοικητή εταιριών");
    tmp.innerHTML = tmp.innerHTML.replace(/Add/,"Προσθήκη");
    tmp.innerHTML = tmp.innerHTML.replace(/Remove/,"Αφαίρεση");
}


//===================================================
//Military Unit Storage
//===================================================
function doMUStorage() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit donations/,"Αποθήκη στρατιωτικής μονάδας");
	
	tmp = allElements.children[5];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[9];
	tmp.innerHTML = tmp.innerHTML.replace(/Storage/,"Αποθήκη");
	
	tmp = allElements.children[7];
    tmp.innerHTML = tmp.innerHTML.replace(/Batch donate to members/,"Ομαδική δωρεά στα μέλη");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate item/,"Αντικείμενο δωρεάς");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Ποσότητα");
    tmp.innerHTML = tmp.innerHTML.replace(/per one recipient/,"ανά παραλήπτη");
    tmp.innerHTML = tmp.innerHTML.replace(/Reason/,"Λόγος");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate to/,"Δωρεά προς");
    tmp.innerHTML = tmp.innerHTML.replace(/tick recipients/,"σημειώστε τους παραλήπτες");
    tmp.innerHTML = tmp.innerHTML.replace(/Tick all/,"Όλοι");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate/,"Δωρεά");
	
	allElements = document.getElementById('product');
		replaceOptionTxt(allElements, {
			"available":["available","διαθέσιμα"],
		})
}


//===================================================
//Military Unit Money
//===================================================
function doMUMoney() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit donations/,"Χρηματικοί λογαριασμοί στρατιωτικής μονάδας");
	
	tmp = allElements.children[5];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[9];
	tmp.innerHTML = tmp.innerHTML.replace(/Military unit money accounts/,"Χρηματικοί λογαριασμού στρατιωτικής μονάδας");
	
	tmp = allElements.children[7];
    tmp.innerHTML = tmp.innerHTML.replace(/Batch donate to members/,"Ομαδική δωρεά στα μέλη");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate item/,"Αντικείμενο δωρεάς");
    tmp.innerHTML = tmp.innerHTML.replace(/Select money/,"Επιλέξτε συνάλαλγμα");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"Χρυσός");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Ποσότητα");
    tmp.innerHTML = tmp.innerHTML.replace(/per one recipient/,"ανά παραλήπτη");
    tmp.innerHTML = tmp.innerHTML.replace(/Reason/,"Λόγος");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate to/,"Δωρεά προς");
    tmp.innerHTML = tmp.innerHTML.replace(/tick recipients/,"σημειώστε τους παραλήπτες");
    tmp.innerHTML = tmp.innerHTML.replace(/Tick all/,"Όλοι");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate/,"Δωρεά");
}


//===================================================
//Military Unit Donations
//===================================================
function doMUDonations() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit donations/,"Δωρεές στρατιωτικής μονάδας");
	
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[7];
	tmp.innerHTML = tmp.innerHTML.replace(/Storage/,"Αποθήκη");
	
	tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/Money/,"Χρήματα");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"Χρυσός");
    
	tmp = allElements.children[10];
	tmp.innerHTML = tmp.innerHTML.replace(/Donations history/,"Ιστορικό δωρεών");
	tmp.innerHTML = tmp.innerHTML.replace(/Buyer\/Donator/,"Αγοραστής/Δωρητής");
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Ώρα");
    tmp.innerHTML = tmp.innerHTML.replace(/Action/,"Ενέργεια");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate to/,"Δωρεά προς");
    tmp.innerHTML = tmp.innerHTML.replace(/Seller\/Receiver/,"Πωλητής/Παραλήπτης");
    tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/military unit/g,"στρατιωτική μονάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/has sent/g,"έστειλε");
	tmp.innerHTML=tmp.innerHTML.replace(/ to/g," στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
}


//===================================================
//Military Unit Jobs
//===================================================
function doMUJobs() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Job offers/,"Θέσεις εργασίας");
	
	tmp = allElements.children[3];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[5];
	tmp.innerHTML = tmp.innerHTML.replace(/Job offers available for members of/,"Θέσεις εργασίας διαθέσιμες για τα μέλη");
	tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Στρατιωτική μονάδα");
	
 	tmp = allElements.children[8];
    tmp.innerHTML = tmp.innerHTML.replace(/Employer/,"Εργοδότης");
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Εταιρία");
	tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Προϊόν");
	tmp.innerHTML = tmp.innerHTML.replace(/Minimal skill/,"Ελάχιστο οικ. επίπεδο");
    tmp.innerHTML = tmp.innerHTML.replace(/Salary/,"Μισθός");
    tmp.innerHTML = tmp.innerHTML.replace(/Apply/g,"Αίτηση");
	tmp.innerHTML = tmp.innerHTML.replace(/Military unit/g,"Στρατιωτική μονάδα");
}


//===================================================
//Military Unit Recruitment
//===================================================
function doMURecruit() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[2];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[4];
	tmp.innerHTML = tmp.innerHTML.replace(/Recruitment/,"Στρατολόγηση");
	tmp.innerHTML = tmp.innerHTML.replace(/Enable recruitment/,"Ενεργοποίηση στρατολόγησης");
	tmp.innerHTML = tmp.innerHTML.replace(/Recruitment restricted to/,"Η στρατολόγηση είναι περιορισμένη στην(-ο)");
	tmp.innerHTML = tmp.innerHTML.replace(/Recruitment is open to citizens of/,"Η στρατολόγηση είναι ανοικτή στους πολίτες της(του)");
	tmp.innerHTML = tmp.innerHTML.replace(/Recruitment is open/,"Η στρατολόγηση είναι ανοικτή");
    tmp.innerHTML = tmp.innerHTML.replace(/only/,"μόνο");
    tmp.innerHTML = tmp.innerHTML.replace(/Recruitment requirements/,"Απαιτήσεις στρατολόγησης");
	
	tmp = allElements.children[7];
	tmp.innerHTML = tmp.innerHTML.replace(/Pending applications/,"Προϊόν");
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Πολίτης");
    tmp.innerHTML = tmp.innerHTML.replace(/XP/,"Εμπειρία");
    tmp.innerHTML = tmp.innerHTML.replace(/Dmg./,"Ζημιά");
	tmp.innerHTML = tmp.innerHTML.replace(/Submitted/,"Κατατέθηκε");
	tmp.innerHTML = tmp.innerHTML.replace(/Application/,"Αίτηση");
	tmp.innerHTML = tmp.innerHTML.replace(/Decision/,"Απόφαση");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Accept/g,"Αποδοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Decline/g,"Απόρριψη");
}


//===================================================
//Military Unit Logs
//===================================================
function doMULogs() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Military Unit logs/,"Αρχεία στρατιωτικής μονάδας");
	tmp = allElements.children[2];
	tmp.innerHTML = tmp.innerHTML.replace(/Back to military unit/,"Πίσω στην στρατιωτική μονάδα");
	tmp.innerHTML = tmp.innerHTML.replace(/Filter/,"Φίλτρο");
	tmp.innerHTML = tmp.innerHTML.replace(/View logs/,"Εμφάνισε αρχεία");
    tmp.innerHTML = tmp.innerHTML.replace(/All logs/,"Όλα τα αρχεία");
    tmp.innerHTML = tmp.innerHTML.replace(/Orders changed/,"Αλλαγές διαταγών");
    tmp.innerHTML = tmp.innerHTML.replace(/Company put on sale/,"Πωλητήρια εταιριών");
    tmp.innerHTML = tmp.innerHTML.replace(/Company donated/,"Δωρεές εταιριών");
    tmp.innerHTML = tmp.innerHTML.replace(/Job market offer added/,"Προσθήκες θέσεων εργασίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Worker fired/,"Απολύσεις υπαλλήλων");
    tmp.innerHTML = tmp.innerHTML.replace(/Salary changed/,"Αλλαγές μισθών");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate received/,"Ληφθέντες δωρεές");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate send/,"Απεσταλμένες δωρεές");
    tmp.innerHTML = tmp.innerHTML.replace(/Application rejected/,"Απορριφθέντες αιτήσεις");
    tmp.innerHTML = tmp.innerHTML.replace(/Application approved/,"Αποδεχθέντες αιτήσεις");
    tmp.innerHTML = tmp.innerHTML.replace(/Leader changed/,"Αλλαγές ηγεσίας");
    tmp.innerHTML = tmp.innerHTML.replace(/Privilages taken/,"Αφαίρεση προνομίων");
    tmp.innerHTML = tmp.innerHTML.replace(/Privilages given/,"Προσθήκη προνομίων");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit expanded/,"Επεκτάσεις στρατιωτικής μονάδας");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit upgraded/,"Αναβαθμίσεις στρατιωτικής μονάδας");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit downgraded/,"Υποβαθμίσεις στρατιωτικής μονάδας");
		
	tmp = allElements.children[5];
	tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Ώρα");
	tmp.innerHTML = tmp.innerHTML.replace(/Log/,"Αρχείο");
    tmp.innerHTML = tmp.innerHTML.replace(/Type/,"Τύπος");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/the military unit by an additional slot/g,"στρατιωτικής μονάδας κατά μια επιπλέον θέση");
	tmp.innerHTML=tmp.innerHTML.replace(/given leadership to/g,"παρέδωσε την ηγεσία στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Company donated/g,"Δωρεές εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/donated/g,"δώρησε");
	tmp.innerHTML=tmp.innerHTML.replace(/ to/g," στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/No Logs/g,"Καμία καταγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate send/g,"Αποστολή δωρεάς");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate received/g,"Λήψη δωρεάς");
	tmp.innerHTML=tmp.innerHTML.replace(/Leader changed/g,"Αλλαγή ηγεσίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Job market offer added/g,"Προσθήκη θέσεως εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/created job offer for/g,"δημιούργησε θέση εργασίας για");
	tmp.innerHTML=tmp.innerHTML.replace(/skill and/g,"οιοκονομικό επίπεδο και");
	tmp.innerHTML=tmp.innerHTML.replace(/salary in/g,"μισθό στην");
	tmp.innerHTML=tmp.innerHTML.replace(/company/g,"εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Orders changed/g,"Αλλαγές διαταγών");
	tmp.innerHTML=tmp.innerHTML.replace(/has changed order of the military unit/g,"άλλαξε τις διαταγές της στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/the military unit/g,"στρατιωτική μονάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/Application approved/g,"Αποδεχθέντες αιτήσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/accepted/g,"αποδέκτηκε της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/application/g,"την αίτηση");
	tmp.innerHTML=tmp.innerHTML.replace(/Worker fired/g,"Απολύσεις υπαλλήλων");
	tmp.innerHTML=tmp.innerHTML.replace(/fired/g,"απέλυσε");
	tmp.innerHTML=tmp.innerHTML.replace(/from the/g,"από την");
	tmp.innerHTML=tmp.innerHTML.replace(/changed/g,"άλαλξε της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/salary/g,"τον μισθό");
	tmp.innerHTML=tmp.innerHTML.replace(/from/g,"από");
	tmp.innerHTML=tmp.innerHTML.replace(/given leadership to/g,"παρέδωσε την ηγεσία στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Privilages taken/g,"Αφαίρεση προνομίων");
	tmp.innerHTML=tmp.innerHTML.replace(/taken/g,"αφαίρεσε το προνόμιο του");
	tmp.innerHTML=tmp.innerHTML.replace(/privilege/g,"");
	tmp.innerHTML=tmp.innerHTML.replace(/Manage Companies/g,"Διοικητή εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/Warehouse Manager/g,"Σιτιστή/Οπλονόμου");
	tmp.innerHTML=tmp.innerHTML.replace(/Officer/g,"Αξιωματικού");
	tmp.innerHTML=tmp.innerHTML.replace(/Director of personel/g,"Προσωπάρχη");
	tmp.innerHTML=tmp.innerHTML.replace(/Privilages given/g,"Προσθίκη προνομιών");
	tmp.innerHTML=tmp.innerHTML.replace(/given/g,"έδωσε το προνόμιο του");
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit expanded/g,"Επεκτάσεις στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/spent/g,"ξόδεψε");
	tmp.innerHTML=tmp.innerHTML.replace(/expand/g,"επέκταση της");
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit upgraded/,"Αναβαθμίσεις στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/upgraded military unit/,"αναβάθμησε την στρατιωτική μονάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/for/,"για");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Military Unit Members
//===================================================
function doMUMembers() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit members)/,"Μέλη στρατιωτικής μονάδας");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
    tmp = allElements.children[6];
	tmp.innerHTML = tmp.innerHTML.replace(/Members/,"Μέλη: ");
	tmp.innerHTML = tmp.innerHTML.replace(/Sorting/,"Κατάταξη");
	tmp.innerHTML = tmp.innerHTML.replace(/Experience/,"Εμπειρία");
    tmp.innerHTML = tmp.innerHTML.replace(/Login/,"Σύνδεση");
    tmp.innerHTML = tmp.innerHTML.replace(/Total damage/g,"Συνολική ζημιά");
    tmp.innerHTML = tmp.innerHTML.replace(/Damage today/g,"Σημερινή ζημιά");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Εμφάνισε");
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Πολίτης");
	tmp.innerHTML = tmp.innerHTML.replace(/XP/g,"Εμπειρία");
    tmp.innerHTML = tmp.innerHTML.replace(/Operations/,"Αποβολή");
    tmp.innerHTML = tmp.innerHTML.replace(/Kick/g,"Αποβολή");
	tmp.innerHTML = tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML = tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp.innerHTML = tmp.innerHTML.replace(/%CE%95%CE%BC%CF%80%CE%B5%CE%B9%CF%81%CE%AF%CE%B1/g,"XP");
}


//===================================================
//Military Unit Companies
//===================================================
function doMUCompanies() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit companies)/,"Εταιρίες στρατιωτικής μονάδας");
	
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(militaryUnitΑποθήκη)/,"militaryUnitStorage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Επεξεργασία στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Αλλαγή εθνικότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Προνόμια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Χρηματικοί λογαριασμοί");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Προσφορές εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Στρατολόγηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"αιτήσεις σε εκκρεμότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Εμφάνιση καταγραφών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send broadcast message)/,"Αποστολή κυκλικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Στρατιωτικός βαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Μέγιστα μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Συνολική ζημιά στις μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Αρχηγός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Αποθήκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%91%CF%80%CE%BF%CE%B8%CE%AE%CE%BA%CE%B7)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CF%89%CF%81%CE%B5%CE%AD%CF%82)/,"Donations");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Επέκταση ορίου μελών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Αναβάθμιση σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσό");
	replaceInputByValue({"Leave military unit":["Leave military unit","Αποχώρηση από τη στρατιωτική μονάδα"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Location)/,"Τοποθεσία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employees)/,"Εργαζόμενοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"Πλευρά:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Briefing:)/,"Ενημέρωση:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"Ορατό μόνο στα μέλη");
	
	replaceLinkByHref({
	"http://wiki.e-sim.org/index.php/Military_unit":["Military units tutorial","Οδηγός στρατιωτικών μονάδων"]
	});
}


//===================================================
//Donate Money (MU)
//===================================================
function doDonateMoneyMU() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to military unit)/,"Δωρεά χρημάτων σε στρατιωτική μονάδα");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate to)/,"Δωρεά προς");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your money accounts)/,"Οι χρηματικοί λογαριασμοί μου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσός");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate)/,"Επιλέξτε συνάλλαγμα για δωρεά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item)/,"Δωρεά συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sum)/,"Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason)/,"Αιτιολογία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate)/,"Δωρεά");
	
	allElements = document.getElementById('currencyId');
		replaceOptionTxt(allElements, {
			"Gold":["Gold","Χρυσός"],
			"Select money":["Select money","Επιλέξτε συνάλλαγμα"]
		})
}


//===================================================
//Donate Product (MU)
//===================================================
function doDonateProductMU() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate products to military unit)/,"Δωρεά προϊόντων σε στρατιωτική μονάδα");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate to)/,"Δωρεά προς");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your storage)/,"Η αποθήκη μου");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate)/,"Επιλέξτε προϊόν για δωρεά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item)/,"Δωρεά προϊόντος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quantity)/,"Ποσότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason)/,"Αιτιολογία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate)/,"Δωρεά");
	
	allElements = document.getElementById('product');
		replaceOptionTxt(allElements, {
			"available":["available","διαθέσιμα"]
		})
}


//===================================================
//Donate Company (MU)
//===================================================
function doDonateCompanyMU() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate company to military unit)/,"Δωρεά εταιρίας σε στρατιωτική μονάδα");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donating to)/,"Δωρεά προς");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select company to transfer)/,"Επιλέξτε εταιρία για μεταφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate company)/,"Δωρεά εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select company)/,"Επιλέξτε εταιρία");
	//allElements = document.getElementById('citizenMessage').parentnode;
	//tmp = allElements.children[1];
	//tmp.innerHTML=tmp.innerHTML.replace(/(Company transfered to military unit)/,"Η εταιρία μεταφέρθηκε στη στρατιωτική μονάδα");
}


//===================================================
//Military Unit Broadcast
//===================================================
function doMUBroadcast() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(New broadcast message)/,"Νέο κυκλικό μήνυμα");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Title)/,"Θέμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Message)/,"Μήνυμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Send)/,"Αποστολή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Preview)/,"Προεπισκόπηση");
}


//===================================================
//Subscription
//===================================================
function doPremium() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[7];
	tmp.innerHTML="<h2 style='text-align: center'>Προνομιούχος λογαριασμός</h2>"
		+ "Το <i>E-sim</i> είναι ένα δωρεάν παιχνίδι και ο καθένας είαι καλοδεχούμενος να παίξει χωρίς να πληρώσει τίποτα. Παρόλαυτά, αν είστε φανατικός του <i>E-sim</i>, μπορείτε να παραγγέλλετε συνδρομή ενός προνομιούχου λογαριασμού.<br/><br/>"
		+ "Ο <u>προνομιούχος λογαριασμός</u> θα σας δώσει πρόσβαση σε μερικές ενδιαφέρουσες πληροφορίες και χρήσιμα προνόμια, όπως η επίβλεψη μάχης ή η αποστολή μηνυμάτων στα μέλη της στρατιωτικής σας μονάδας.<br>"
		+ "Επιπλέον, οι άλλοι παίκτες θα μπορούν να βλέπουν ένα <i>τιμητικό αστέρι</i> στη σελίδα του προφίλ σας.<br/>"
		+ "Επίσης, αγοράζοντας ένα <u>προνομιούχο λογαριασμό</u> μας υποστηρίζετε και βοηθάτε στην περεταίρω ανάπτυξη του <i>E-sim</i>!"
		+ "<br><br>";
	tmp = allElements.children[9]
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"Ο λογαριασμός σας")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"Δωρεάν")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"Προνομιούχος")
        tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Λήγει")
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"Μετάβαση σε")
    replaceLinkByHref({
		"#features":["Features","Προνόμια"],
		"#payments":["Payments","Πληρωμές"],
		"#faq":["FAQ","FAQ"]
	});
	tmp = allElements.children[13]
	tmp.innerHTML = tmp.innerHTML.replace(/Features/,"Προνόμια")
	tmp.innerHTML = tmp.innerHTML.replace(/Battle monitor/,"Επίβλεψη μάχης")
    tmp.innerHTML = tmp.innerHTML.replace(/Companies production reports/,"Αναφορές εταιρικών παραγωγών")
    tmp.innerHTML = tmp.innerHTML.replace(/Stock companies reports/,"Αναφορές εισηγμένων εταιριών")
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"Στατιστικά φόρου εισοδήματος")
	//tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Στατιστικά χρηματικών αποθεματικών")
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"Ιστορικό συναλλαγών αγοράς συναλάγματος")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"Αποστολή μηνυμάτων στα μέλη στρατιωτικής μονάδας")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"Αποστολή μηνυμάτων στα μέλη κόμματος")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/g,"Χωρίς διαφημίσεις")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"Τιμητικό αστέρι στην εμφάνιση του προφίλ σου")	
	
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="Η εμφάνιση μάχης θα είναι ενισχυμένη με τμήμα, το οποίο θα εμφανίζει την εθνικότητα των πολιτών που παρακολουθούν και συμεμτέχουν στη μάχη."
	
    tmp = allElements.children[13].children[7]
	tmp.innerHTML="Επιπλέον εργαλεία για να υπολογίζεται την κερδοφορία των εταιριών σας."
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="Πρόσβαση σε αναφορές περιουσιακών στοιχείων εισηγμένων εταιριών"
	
	
	tmp = allElements.children[13].children[14]
	tmp.innerHTML = tmp.innerHTML.replace(/You gain access to tax income data of your country \(only visible for presidents and congress members\)/,"Αποκτάτε πρόσβαση στα δεδομένα φόρου εισοδήματος της χώρας σας (ορατά μόνο για τους προέδρους και τα μέλη της Βουλής)")
	
	tmp = allElements.children[13].children[15]
	tmp.innerHTML = tmp.innerHTML.replace(/You gain access to tax income data of your country \(only visible for presidents and congress members\)/,"Αποκτάτε πρόσβαση στα δεδομένα φόρου εισοδήματος της χώρας σας (ορατά μόνο για τους προέδρους και τα μέλη της Βουλής)")
	
	tmp = allElements.children[13].children[17]
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Στατιστικά χρηματικών αποθεματικών")
	
	tmp = allElements.children[13].children[18]
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Στατιστικά χρηματικών αποθεματικών")
	tmp.innerHTML = tmp.innerHTML.replace(/You gain access to money supply of your country \(only visible for presidents and congress members\)/,"Αποκτάτε πρόσβαση στα χρηματικά αποθεματικά της χώρας σας (ορατά μόνο για τους προέδρους και τα μέλη της Βουλής)")
	
	tmp = allElements.children[13].children[19]
	tmp.innerHTML = tmp.innerHTML.replace(/You gain access to money supply of your country \(only visible for presidents and congress members\)/,"Αποκτάτε πρόσβαση στα χρηματικά αποθεματικά της χώρας σας (ορατά μόνο για τους προέδρους και τα μέλη της Βουλής)")
	
	tmp = allElements.children[13].children[21]
	tmp.innerHTML = tmp.innerHTML.replace(/Access to historical transactions on monetary market of all currencies. Very useful for monetary market traders/,"Πρόσβαση στο ιστορικό συναλλαγών της αγοράς συναλλάγματος για όλα τα νομίσματα. Πολύ χρήσιμο για εμπόρους συναλλάγματος")
	
	tmp = allElements.children[13].children[22]
	tmp.innerHTML = tmp.innerHTML.replace(/Access to historical transactions on monetary market of all currencies. Very useful for monetary market traders/,"Πρόσβαση στο ιστορικό συναλλαγών της αγοράς συναλλάγματος για όλα τα νομίσματα. Πολύ χρήσιμο για εμπόρους συναλλάγματος")
	
	tmp = allElements.children[13].children[24]
	tmp.innerHTML = tmp.innerHTML.replace(/Instant broadcast message to all members of your military unit. You need to have/,"Άμεση αποστολή μηνύματος σε όλα τα μέλη της στρατιωτικής σας μονάδας. Πρέπει να έχεται δικαιώματα")
	tmp.innerHTML = tmp.innerHTML.replace(/commander/,"διοικητή")
	tmp.innerHTML = tmp.innerHTML.replace(/privileges in your military unit to use it/,"στη στρατιωτική μονάδα σας για να το χρησιμοποιήσετε")
	
	tmp = allElements.children[13].children[25]
	tmp.innerHTML = tmp.innerHTML.replace(/Instant broadcast message to all members of your military unit. You need to have/,"Άμεση αποστολή μηνύματος σε όλα τα μέλη της στρατιωτικής σας μονάδας. Πρέπει να έχεται δικαιώματα")
	tmp.innerHTML = tmp.innerHTML.replace(/commander/,"διοικητή")
	tmp.innerHTML = tmp.innerHTML.replace(/privileges in your military unit/,"στη στρατιωτική μονάδα σας")
	tmp.innerHTML = tmp.innerHTML.replace(/to use it/,"για να το χρησιμοποιήσετε")
	
	tmp = allElements.children[13].children[26]
	tmp.innerHTML = tmp.innerHTML.replace(/If you are a party leader, you will be able to send instant broadcast messages to all your party members/,"Εάν είστε αρχηγός κόμματος, θα μπορείτε να αποστέλετε άμεσα μηνύματα σε όλα τα μέλη του κόμματός σας")
	
	mp = allElements.children[13].children[27]
	tmp.innerHTML = tmp.innerHTML.replace(/If you are a party leader, you will be able to send instant broadcast messages to all your party members/,"Εάν είστε αρχηγός κόμματος, θα μπορείτε να αποστέλετε άμεσα μηνύματα σε όλα τα μέλη του κόμματός σας")
	
	
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"Πληρωμές")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"Διάρκεια")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Τιμή")
	tmp.innerHTML = tmp.innerHTML.replace(/One Month (30 days)/,"Ένας μήνας (30 μέρες)")
	tmp = allElements.children[15].children[3]
	tmp.innerHTML="<b>Υπάρχουν δύο τρόποι για να κάνετε μια πληρωμή:</b><br>"
			+"<ul>"
			+"<li>Αγοράστε 30 ημέρες προνομιούχου λογαριασμού σε μια μονή πληρωμή</li>"
			+"<li> Παραγγέλετε μια συνδρομή (η πληρωμή θα γίνεται αυτόματα κάθε 30 ημέρες, μέχρι να την ακυρώσετε, ξεκινώντας από σήμερα)</li>"
			+"</ul>"
	
	tmp = allElements.children[15].children[4]
	tmp.innerHTML="<b>Μονή πληρωμή</b>"
	
	tmp = allElements.children[15].children[11]
	tmp.innerHTML="<b>Συνδρομή</b>"
	
	tmp = allElements.children[15].children[23]
	tmp.innerHTML="<b>Ενεργές συνδρομές</b>"
	tmp = allElements.children[15].children[24]
	tmp.innerHTML = tmp.innerHTML.replace(/Id/,"Αρ. Συν.")
	tmp.innerHTML = tmp.innerHTML.replace(/Account/,"Λογαριασμός")
	tmp.innerHTML = tmp.innerHTML.replace(/Signup/,"Εγγραφή")
	tmp.innerHTML = tmp.innerHTML.replace(/Last Payment/,"Τελευταία πληρωμή")
	tmp.innerHTML = tmp.innerHTML.replace(/Next Payment/,"Επόμενη Πληρωμή")
	tmp.innerHTML = tmp.innerHTML.replace(/Status/,"Κατάσταση")
	tmp.innerHTML = tmp.innerHTML.replace(/No active subscriptions/,"Καμία ενεργή συνδρομή")
	
	tmp = allElements.children[15].children[27]
	tmp.innerHTML="<b>Πληρωμές</b>"
	tmp = allElements.children[15].children[28]
	tmp.innerHTML = tmp.innerHTML.replace(/Trans. Id/,"Αρ. Συν.")
	tmp.innerHTML = tmp.innerHTML.replace(/Subs. Id/,"Αρ. Συνδρομής")
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Πολίτης")
	tmp.innerHTML = tmp.innerHTML.replace(/Sum/,"Ποσό")
	tmp.innerHTML = tmp.innerHTML.replace(/Charged time/,"Διάρκεια χρέωσης")
	tmp.innerHTML = tmp.innerHTML.replace(/No payments/,"Καμία πληρωμή")
	
	tmp = allElements.children[15].children[30]
	tmp.innerHTML = tmp.innerHTML.replace(/Payment data are updated once per 5 minutes/,"Τα δεδομένα πληρωμών ενημερώνονται κάθε 5 λεπτά")
	
	tmp = allElements.children[17].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/FAQ/,"FAQ")
	tmp = allElements.children[17].children[1]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Είναι δυνατόν να πληρώσω χρησιμοποιόντας πιστωτική κάρτα;"
	tmp = allElements.children[17].children[2]
	tmp.innerHTML="Ναι - Απλά πρέπει να δημιουργήσεται έναν λογαριασμό paypal, να τον συνδέσετε με την πιστωτική σας κάρτα και να κάνετε μια μια συνηθισμένη πληρωμή χρησιμοποιόντας τπν paypal λογαριασμό σας."
	tmp = allElements.children[17].children[3]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Μπορώ να αγοράσω προνομιούχο λογαριασμό για τον φίλο μου;"
	tmp = allElements.children[17].children[4]
	tmp.innerHTML="Ναι - Μπορείτε να αγοράσετε συνδρομές πολλαπλών λογαριασμών χρησιμοποιόντας τον δικό σας λογαριασμό. Απλά πρέπει να δηλώσετε το όνομα του λογαριασμού του φίλου σας όταν κάνετε τη συνδρομή."
	tmp = allElements.children[17].children[5]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Θα χάσω τον προνομοιούχο λογαριασμό μου εάν ακυρώσω τη συνδρομή;"
	tmp = allElements.children[17].children[6]
	tmp.innerHTML="Όχι αμέσως - Ακύρωση της συνδρομής σημαίνει ότι ο paypal λογαριασμός σας δεν θα χρεώνεται αυτόματα κάθε 30 ημέρες. Εάν ακυρώσετε συνδρομή, θα έχεται ακόμα προνομοιούχο λογαριασμό μέχρι να λήξει."
	tmp = allElements.children[17].children[7]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Έχω άλλη ερώτηση..."
	tmp = allElements.children[17].children[8]
	tmp.innerHTML="Μπορείται να την κάνετε μέσω  <a href=\"composeMessage.html?id=1\">μηνύματος στο παιχνίδι</a> ή να ρωτήσετε δημοσίως στο <a target=\"_blank\" href=\"http://forum.e-sim.org/viewforum.php?f=43\">forum</a>."
}


//===================================================
//Product Market
//===================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Όλα"],
		"2":["Iron","Σίδηρος"],
		"3":["Grain","Σιτάρι"],
		"4":["Oil","Πετρέλαιο"],
		"5":["Stone","Πέτρα"],
		"6":["Wood","Ξύλο"],
		"7":["Diam.","Διαμάντια"],
		"8":["Weap.","Όπλα"],
		"9":["House","Σπίτια"],
		"10":["Gift","Δώρα"],
		"11":["Food","Φαγητό"],
		"12":["Ticket","Εισιτήρια"],
		"13":["DS","Αμυντικά συστήματα"],
		"14":["Hosp.","Νοσοκομεία"],
		"15":["Est.","Μέγαρο"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Αγορά");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Εμφάνισε προσφορές:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Χώρα:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Ποιότητα:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace("Previous","Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace("Next","Επόμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company/g,"Εισηγμένη εταιρία");
	
	replaceInputByValue({"View offers":["View offers","Δείτε προσφορές"],"Buy":["Buy","Αγορά"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Εμφάνισε τις προσφορές μου/Ανάρτησε νέα προσφορά"]});
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Απόθεμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Αγορά");
	tmp.innerHTML=tmp.innerHTML.replace(/(items)/g,"τεμάχια");
	
	// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Εμφάνισε τις προσφορές μου/Ανάρτησε νέα προσφορά"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","Πληροφορίες προϊόντων"]
	});
}


//===================================================
// Citizen market offers
//===================================================
function doCitizenMarketOffers() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Αγορά");
	
    var results;
    var allElements;
    var tmp;
    results = getElements(document, "//TD[@colspan='2']");
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Ανάρτηση νέων προσφορών");
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Χώρα");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Προϊόν");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Ποσότητα");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Τιμή");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Ανάρτηση νέας προσφοράς");
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Εμφάνιση προσφορών στην αγορά");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Η αποθήκη μου");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0);
    tmp = allElements;
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Οι προσφορές μου στην αγορά");
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Προϊόν");
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Πωλητής");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Απόθεμα");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Τιμή");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Μικτά");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Τιμή");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Καθαρά");
	tmp.innerHTML = tmp.innerHTML.replace(/Vat/,"ΦΠΑ");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Φόρος εισαγωγής");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Διαγραφή");
	tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Καμία προσφορά");
    tmp.innerHTML = tmp.innerHTML.replace(/Show on market/g,"Εμφάνισε στην αγορά");
	
	allElements = document.getElementById('resourceInput');
		replaceOptionTxt(allElements, {
			"available":["available","διαθέσιμα"]
		})
}


//===================================================
//Job Market
//===================================================
function doJobMarket() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Αγορά εργασίας");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Επιλογή κριτηρίων:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Χώρα:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Οικονομικό επίπεδο:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Εργοδότης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Ελάχιστο επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Μισθός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Αίτηση");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");
	
	replaceInputByValue({"Apply":["Apply","Αίτηση"],"Show":["Show","Εμφάνισε"],"Go":["Go","Go"]});
}


//===================================================
//Monetary market
//===================================================
function doMonetaryMarket() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary Market/,"Αγορά συναλλάγματος");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Current offers/,"Τρέχουσες προσφορές");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Show Offers/,"Εμφανισε προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/Swap currencies/,"Αντιμετάθεση συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency/,"Αγορά συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Sell currency/,"Πώληση συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/View offers/,"Εμφάνιση προσφορών");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Show transactions archive/,"Εμφάνιση αρχείου συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/,"Αγορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary market tutorial/,"Οδηγός αγοράς συναλλάγματος");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/,"Αγορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary market tutorial/,"Οδηγός αγοράς συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμνη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμνη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp = allElements.children[12];	
	tmp.innerHTML=tmp.innerHTML.replace(/Your offers/,"Οι προσφορές σας");
	tmp = allElements.children[14];	
	tmp.innerHTML=tmp.innerHTML.replace(/Your offers/,"Οι προσφορές σας");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/Offer deleted/,"Η προσφορά διαγράφηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer is no longer available/,"Η προσφορά δεν είναι πλέον διαθέσιμη");
	tmp.innerHTML=tmp.innerHTML.replace(/Post your Offer/,"Ανάρτηση της προσφοράς σας");
	tmp.innerHTML=tmp.innerHTML.replace(/Swap currencies/,"Αντιμετάθεση συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Offered currency/,"Προσφερόμενο συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency/,"Ζητούμενο συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate/,"Ισοτιμία ανταλλαγής");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer /,"Πρόσφερε ");
	tmp.innerHTML=tmp.innerHTML.replace(/at rate/,"με ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Post new offer/,"Ανάρτηση νέας προσφοράς");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/Offer deleted/,"Η προσφορά διαγράφηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer is no longer available/,"Η προσφορά δεν είναι πλέον διαθέσιμη");
	tmp.innerHTML=tmp.innerHTML.replace(/Post your Offer/,"Ανάρτηση της προσφοράς σας");
	tmp.innerHTML=tmp.innerHTML.replace(/Swap currencies/,"Αντιμετάθεση συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Offered currency/,"Προσφερόμενο συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency/,"Ζητούμενο συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate/,"Ισοτιμία ανταλλαγής");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer /,"Πρόσφερε ");
	tmp.innerHTML=tmp.innerHTML.replace(/at rate/,"με ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Post new offer/,"Ανάρτηση νέας προσφοράς");
	tmp = allElements.children[17];
	tmp.innerHTML=tmp.innerHTML.replace(/Post your Offer/,"Ανάρτηση της προσφοράς σας");
	tmp.innerHTML=tmp.innerHTML.replace(/Swap currencies/,"Αντιμετάθεση συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Offered currency/,"Προσφερόμενο συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency/,"Ζητούμενο συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate/,"Ισοτιμία ανταλλαγής");
	tmp.innerHTML=tmp.innerHTML.replace(/Offer /,"Πρόσφερε ");
	tmp.innerHTML=tmp.innerHTML.replace(/at rate/,"με ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Post new offer/,"Ανάρτηση νέας προσφοράς");
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete/g,"Διαγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Καμία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Amount/,"Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete/g,"Διαγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/No offers/,"Καμία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
}


//===================================================
//Monetary market transactions
//===================================================
function doMMTransactions() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary Market Transactions/,"Συναλλαγές αγοράς συναλλάγματος");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Select currencies/,"Επιλέξτε συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Currency/g,"Συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/View Transactions/,"Εμφάνισε συναλλαγές");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Average/g,"Μέση ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/exchange ratio/g,"");
	tmp.innerHTML=tmp.innerHTML.replace(/Daily/g,"Ημερήσιος όγκος");
	tmp.innerHTML=tmp.innerHTML.replace(/volume/g,"");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold\//g,"Χρυσού/");
	tmp.innerHTML=tmp.innerHTML.replace(/\/Gold/g,"/Χρυσού");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Sum bought/,"Αγορασμένη ποσότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Currencies/,"Συναλλάγματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Ώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Ratio/,"Ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Auctions
//===================================================
function doAuctions() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Auctions/,"Δημοπρασίες");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Type of auction/,"Τύπος δημοπρασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Companies/,"Εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Equipment/,"Εξοπλισμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Progress/,"Πρόοδος");
	tmp.innerHTML=tmp.innerHTML.replace(/In progress/,"Σε εξέλιξη");
	tmp.innerHTML=tmp.innerHTML.replace(/Closed/,"Κλειστές");
	tmp.innerHTML=tmp.innerHTML.replace(/Sorting/,"Ταξινόμηση");
	tmp.innerHTML=tmp.innerHTML.replace(/Time remaining/,"Υπολοιπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Total bids/,"Συνολικές προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/View auctions/,"Εμφάνιση δημοπρασιών");
	tmp.innerHTML=tmp.innerHTML.replace(/Quality/g,"Ποιότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/Product/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/Slot/,"Θέση");
	tmp.innerHTML=tmp.innerHTML.replace(/Offhand/,"Βοήθημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Helmet/,"Κράνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Vision/,"Όραση");
	tmp.innerHTML=tmp.innerHTML.replace(/Personal Armor/,"Προσωπική θωράκιση");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Auctions tutorial/,"Οδηγός δημοπρασιών");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Top bidder/,"Κορυφαία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Item/,"Αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Current price/,"Τρέχουσα τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Bidders/,"Προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/See details/g,"Λεπτομέριες");
	tmp.innerHTML=tmp.innerHTML.replace(/Time remaining/,"Υπολοιπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Action/,"Ενέργεια");
	tmp.innerHTML=tmp.innerHTML.replace(/Bid/g,"Προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/None/g,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/Offhand/g,"Βοήθημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Helmet/g,"Κράνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Vision/g,"Όραση");
	tmp.innerHTML=tmp.innerHTML.replace(/Personal Armor/g,"Θωράκιση");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon upgrade/g,"Οπλισμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Equipment id/g,"Κωδ. Αντικειμένου");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Auction details
//===================================================
function doAuction() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Auction/,"Δημοπρασία");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Auctions/,"Δημοπρασίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller/,"Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Top bidder/,"Κορυφαία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Item/,"Αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Current price/,"Τρέχουσα τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Bidders/,"Προσφορές");
	tmp.innerHTML=tmp.innerHTML.replace(/See details/,"Λεπτομέριες");
	tmp.innerHTML=tmp.innerHTML.replace(/Time remaining/,"Υπολοιπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Finished/,"Τελείωσε");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Bid/g,"Προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/None/,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/Offhand/g,"Βοήθημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Helmet/g,"Κράνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Vision/g,"Όραση");
	tmp.innerHTML=tmp.innerHTML.replace(/Personal Armor/g,"Θωράκιση");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon upgrade/g,"Οπλισμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Equipment id/g,"Κωδ. Αντικειμένου");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Auctions tutorial/,"Οδηγός δημοπρασιών");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Bidder/,"Προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Hidden/,"Κρυφή");
	tmp.innerHTML=tmp.innerHTML.replace(/more or equal/,"τουλάχιστον");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Ώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Status/,"Κατάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/Top bid/,"Κουφαία προσφορά");
	tmp.innerHTML=tmp.innerHTML.replace(/Outbid/g,"Εκτός");
	tmp.innerHTML=tmp.innerHTML.replace(/No bids/,"Καμία προσφορά");
}


//===================================================
//Stock Market
//===================================================
function doStockMarket() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Stock market/,"Χρηματιστήριο");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/NOTE/,"ΣΗΜΕΙΩΣΗ");
	tmp.innerHTML=tmp.innerHTML.replace(/This is the moderated list of large and trusted stock companies/,"Αυτή είναι η υπολογιζόμενη λίστα μεγάλων και έμπιστων εισηγμένων εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/You can click/,"Μπορείτε να πατήσετε");
	tmp.innerHTML=tmp.innerHTML.replace(/here/,"εδώ");
	tmp.innerHTML=tmp.innerHTML.replace(/for more opportunities to invest/,"για περισσότερες ευκαιρίες επένδυσης");
	tmp.innerHTML=tmp.innerHTML.replace(/but be aware, that/,"αλλά προσέχετε, καθώς");
	tmp.innerHTML=tmp.innerHTML.replace(/(these investments)/,"αυτές οι επενδύσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/(are much more risky)/,"είναι με περισσσότερο ρίσκο");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Company/,"Εταιρεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Info/,"Πληροφορίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock company/g,"Εισηγμένη εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Total shares/g,"Συνολικές μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Fundamental value per share/g,"Κεφαλαιακή αξία ανά μετοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Fundamental value/g,"Κεφαλαιακή αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Current share price/g,"Τρέχουσα τιμή μετοχής");
	tmp.innerHTML=tmp.innerHTML.replace(/Volume today/g,"Σημερινός όγκος");
}


//===================================================
//Company Market
//===================================================
function doCompMarket() {
	rr = {
		"1":["Any","Όλες"],
		"2":["Iron","Σίδηρος"],
		"3":["Grain","Σιτάρι"],
		"4":["Oil","Πετρέλαιο"],
		"5":["Stone","Πέτρα"],
		"6":["Wood","Ξύλο"],
		"7":["Diam.","Διαμάντια"],
		"8":["Weap.","Όπλα"],
		"9":["House","Σπίτια"],
		"10":["Gift","Δώρα"],
		"11":["Food","Φαγητό"],
		"12":["Ticket","Εισιτήρια"],
		"13":["DS","Αμυντικά συστήματα"],
		"14":["Hosp.","Νοσοκομεία"],
		"15":["Est.","Μέγαρο"]
	};
	
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies for sale)/,"Εταιρίες προς πώληση");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");
	
	
	results = getElements(document, "//label[@for]");
	
	//	alert(results.snapshotLength);
	//	alert(results.snapshotItem(0).htmlFor);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
	
	//		alert(obj.htmlFor);
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
	
	//		alert(obj.innerHTML);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Εμφάνιση προσφορών:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Χώρα:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Ποιότητα:");
	tmp.innerHTML=tmp.innerHTML.replace("No offers","Καμία προσφορά");
	
	replaceInputByValue({"View offers":["View offers","Εμφάνιση προσφορών"],"Buy":["Buy","Αγορά"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Company","Εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace("Product","Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace("Location","Τοποθεσία");
	tmp.innerHTML=tmp.innerHTML.replace("Seller","Πωλητής");
	tmp.innerHTML=tmp.innerHTML.replace("Price","Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace("Buy","Αγορά");
	
	for (var i = 0; i < 10; i++) {
	tmp.innerHTML=tmp.innerHTML.replace("Employer","Εργοδότης");
	}
	
	for (var i = 0; i < 10; i++) {
	tmp.innerHTML=tmp.innerHTML.replace("Gold","Χρυσός");
	}
}


//===================================================
//Special Items
//===================================================
function doSpecial() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Special items/,"Ειδικά αντικείμενα");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Increases damage done by 20% for the next 24 hours. However, decreases damage done by 20% 24-72 hours after using steroids/,"Αυξάνουν τη ζημιά κατά 20% για τις επόμενες 24 ώρες. Όμως, μειώνουν τη ζημιά κατά 20% για 24-72 ώρες μετά τη χρήση των στεροειδών");
	tmp.innerHTML=tmp.innerHTML.replace(/Increases damage done with Q5 weapon by 20%. However, you can't use weapons 24-72 hours after using the tank/,"Αυξάνει τη ζημιά που κάνουν τα Q5 όπλα κατά 20%. Όμως, δεν μπορείτε να χρησιμοποιήσετε όπλα για 24-72 ώρες μετά τη χρρήση του άρματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Instantly restores 10 gift limit. However your gift limit won't be updated during the next day change/,"Άμεσα επαναφέρει το όριο των δώρων στο 10. Όμως, το όριο των δώρων δεν θα ανανεωθεί κατά την επόμενη αλλαγή ημέρας");
	tmp.innerHTML=tmp.innerHTML.replace(/Instantly restores 10 food limit. However your food limit won't be updated during the next day change/,"Άμεσα επαναφέρει το όριο του φαγητού στο 10. Όμως, το όριο του φαγητού δεν θα ανανεωθεί κατά την επόμενη αλλαγή ημέρας");
	tmp.innerHTML=tmp.innerHTML.replace(/You get/g,"Έχετε");
	tmp.innerHTML=tmp.innerHTML.replace(/damage when defending your core region for the next 24 hours. However, decreases damage done by 20% 24-72 hours after usage/,"ζημιά όταν αμύνεστε αρχικά εδάφη για τις επόμενες 24 ώρες. Όμως, μειώνει τη ζημιά κατά 20% για 24-72 ώρες μετά τη χρήση");
	tmp.innerHTML=tmp.innerHTML.replace(/damage when fighting on the resistance side in resistance wars of your home country for the next 24 hours. However, decreases damage done by 20% 24-72 hours after usage/,"ζημιά όταν πολεμάτε με τους αντιστασιακούς σε αντιστασιακούς πολέμους για την πατρίδα σας για τις επόμενες 24 ώρες. Όμως, μειώνει τη ζημιά κατά 20% για 24-72 ώρες μετά τη χρήση");
	tmp.innerHTML=tmp.innerHTML.replace(/Steroids/,"Στεροειδή");
	tmp.innerHTML=tmp.innerHTML.replace(/Tank/,"Άρμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Extra spa/,"Επιπλέον χαλάρωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Extra vacations/,"Επιπλέον διακοπές");
	tmp.innerHTML=tmp.innerHTML.replace(/Bunker/,"Πολυβολείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Sewer guide/,"Οδηγός υπονόμου");
	tmp.innerHTML=tmp.innerHTML.replace(/Buy/g,"Αγοράστε");
	tmp.innerHTML=tmp.innerHTML.replace(/steroids/g,"στεροειδή");
	tmp.innerHTML=tmp.innerHTML.replace(/στεροειδή_big/,"steroids_big");
	tmp.innerHTML=tmp.innerHTML.replace(/tank/g,"άρμα");
	tmp.innerHTML=tmp.innerHTML.replace(/άρμα_big/,"tank_big");
	tmp.innerHTML=tmp.innerHTML.replace(/extra spa/,"επιπλέον χαλάρωση");
	tmp.innerHTML=tmp.innerHTML.replace(/extra vacations/,"επιπλέον διακοπές");
	tmp.innerHTML=tmp.innerHTML.replace(/bunker/g,"πολυβολείο");
	tmp.innerHTML=tmp.innerHTML.replace(/πολυβολείο_big/,"bunker_big");
	tmp.innerHTML=tmp.innerHTML.replace(/sewer guide/,"οδηγό υπονόμου");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/g,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/Can't buy this item before/g,"Δεν μπορείτε να αγοράσετε αυτό το αντικείμενο πριν τις");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Purchase history/,"Ιστορικό αγορών");
	tmp.innerHTML=tmp.innerHTML.replace(/Item/,"Αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/None/,"Καμία");
	tmp.innerHTML=tmp.innerHTML.replace(/Steroids/g,"Στεροειδή");
	tmp.innerHTML=tmp.innerHTML.replace(/Tank/g,"Άρμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Extra spa/g,"Επιπλέον χαλάρωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Extra vacations/g,"Επιπλέον διακοπές");
	tmp.innerHTML=tmp.innerHTML.replace(/Bunker/g,"Πολυβολείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Sewer guide/g,"Οδηγός υπονόμου");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
}


//===================================================
//Country Stats
//===================================================
function doCountryStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country statistics)/,"Στατιστικά χωρών");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Τύπος στατιστικών:");
	replaceInputByValue({"Show":["Show","Εμφάνιση"]});
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total:)/,"Σύνολο:");
	tmp.innerHTML=tmp.innerHTML.replace(/(dmg.)/,"ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(strength)/,"δύναμη");	
	tmp = allElements.children[6];
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Συνδεδεμένοι πολίτες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens)/,"Πολίτες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Συνολική ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"Εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Δύναμη");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Νέοι πολίτες σήμερα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity)/,"Παραγωγικότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(strength)/g,"δύναμη");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/g,"εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(dmg.)/g,"ζημιά");	
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Citizens online")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens online)/,"Συνδεδεμένοι πολίτες");
		} else if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Συνολική ζημιά");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Σημερινή ζημιά");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"Εμπειρία");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Δύναμη");
		} else if (obj.innerHTML.match("New citizens today")) {
			obj.innerHTML=obj.innerHTML.replace(/(New citizens today)/,"Νέοι πολίτες σήμερα");
		} else if (obj.innerHTML.match("Citizens")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens)/,"Πολίτες");
		} else if (obj.innerHTML.match("Productivity")) {
			obj.innerHTML=obj.innerHTML.replace(/(Productivity)/,"Παραγωγικότητα");
		}
	}
}


//===================================================
//Party Stats
//===================================================
function doPartyStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party statistics)/,"Στατιστικά κομμάτων");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	replaceInputByValue({"Show":["Show","Εμφάνιση"]});
	replaceInputByValue({"Leave party":["Leave party","Αποχώρηση από το κόμμα"]});
	replaceInputByValue({"Join":["Join","Είσοδος"]});
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
		tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
		tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Κόμμα");
		tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Μέλη");
		obj = results.snapshotItem(i);
	}
}


//===================================================
//Newspaper Stat
//===================================================
function doNewsStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper statistics)/,"Στατιστικά εφημερίδων");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
		tmp.innerHTML=tmp.innerHTML.replace(/(Redactor)/,"Εκδότης");
		tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper)/,"Εφημερίδα");
		tmp.innerHTML=tmp.innerHTML.replace(/(Subs)/,"Συνδρομές");	
	}
}


//===================================================
//Citizen Stats
//===================================================
function doCitiStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen statistics)/,"Στατιστικά πολιτών");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Τύπος στατιστικών:");
	replaceInputByValue({"Show":["Show","Εμφάνιση"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
		tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Πολίτης");
		tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
		tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/,"Συνολική ζημιά");
		tmp.innerHTML=tmp.innerHTML.replace(/(Today damage)/,"Σημερινή ζημιά");
		tmp.innerHTML=tmp.innerHTML.replace(/(dmg.)/g,"ζημιά");
		tmp.innerHTML=tmp.innerHTML.replace(/(xp)/g,"Εμπειρία");
		tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Δύναμη");
		tmp.innerHTML=tmp.innerHTML.replace(/(strength)/g,"δύναμη");
		tmp.innerHTML=tmp.innerHTML.replace(/(Achievements)/,"Επιτεύγματα");
		obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage)/,"Ζημιά");
		} else if (obj.innerHTML.match("Today damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Today damage)/,"Σημερινή ζημιά");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"Εμπειρία");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Δύναμη");
		} else if (obj.innerHTML.match("Achievements")) {
			obj.innerHTML=obj.innerHTML.replace(/(Achievements)/,"Επιτεύγματα");
		}
	}
}	


//===================================================
//MU Stats
//===================================================
function doMuStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit statistics)/,"Στατιστικά στρατιωτικών μονάδων");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");	
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Τύπος στατιστικών:");
	replaceInputByValue({"Show":["Show","Εμφάνιση"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Μέλη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Name)/,"Όνομα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank)/,"Bαθμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Συνολική ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Σημερινή ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Value)/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Συνολική ζημιά");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Σημερινή ζημιά");
		} else if (obj.innerHTML.match("Total members")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total members)/,"Συνολικά μέλη");
		} else if (obj.innerHTML.match("Gold value")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold value)/,"Αξία σε χρυσό");
		} 
	}
}


//===================================================
//Stock Stats
//===================================================
function doStockStats() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top stock companies)/,"Κορυφαίες εισηγμένες εταιρίες");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type)/,"Είδος στατιστικών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show)/,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total stocks)/,"Συνολικές μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total value)/,"Συνολική αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Daily stock trade volume)/,"Ημερήσιος όγκος συναλλαγών μετοχών");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock Company)/,"Εισηγμένη εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock company)/g,"Εισηγμένη εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total value)/,"Συνολική αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total stocks)/,"Συνολικές μετοχές");
	tmp.innerHTML=tmp.innerHTML.replace(/(Daily stock trade volume)/,"Ημερήσιος όγκος συναλλαγών μετοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	obj = results.snapshotItem(i);
	}
}


//===================================================
//Donations
//===================================================
function doDonations() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/January/,"Ιανουάριος");
	tmp.innerHTML=tmp.innerHTML.replace(/February/,"Φεβρουάριος");
	tmp.innerHTML=tmp.innerHTML.replace(/March/,"Μάρτιος");
	tmp.innerHTML=tmp.innerHTML.replace(/April/,"Απρίλιος");
	tmp.innerHTML=tmp.innerHTML.replace(/May/,"Μάϊος");
	tmp.innerHTML=tmp.innerHTML.replace(/June/,"Ιούνιος");
	tmp.innerHTML=tmp.innerHTML.replace(/July/,"Ιούλιος");
	tmp.innerHTML=tmp.innerHTML.replace(/August/,"Αύγουστος");
	tmp.innerHTML=tmp.innerHTML.replace(/September/,"Σεπτέμβριος");
	tmp.innerHTML=tmp.innerHTML.replace(/October/,"Οκτώβριος");
	tmp.innerHTML=tmp.innerHTML.replace(/November/,"Νοέμβριος");
	tmp.innerHTML=tmp.innerHTML.replace(/December/,"Δεκέμβριος");
	tmp.innerHTML=tmp.innerHTML.replace(/donations/,"- Δωρεές");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/If you enjoy playing/,"Εάν σας αρέσει να παίζετε");
	tmp.innerHTML=tmp.innerHTML.replace(/and would like to support development of the game with donation, please use the donate button/,"και θα θέλατε να υποστηρίξετε την ανάπτυξη του παιχνιδιού με δωρεά, παρακαλώ πατήστε το κουμπί Donate");
	tmp.innerHTML=tmp.innerHTML.replace(/Your donation will be visible to everyone on this page/,"Η δωρεά σας θα είναι ορατή στον καθένα σε αυτή τη σελίδα");
	tmp.innerHTML=tmp.innerHTML.replace(/Donors, who make 2 EUR donations will receive bonus/,"Δωρητές που θα κάνουν δωρεές 2 Ευρώ θα λάβουν δώρο το");
	tmp.innerHTML=tmp.innerHTML.replace(/donor achievement/,"επίτευγμα δωρητή");
	tmp.innerHTML=tmp.innerHTML.replace(/Show donations period/,"Εμφάνιση περιόδου δωρεών");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Εμφάνισε");
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("January")) {
			obj.innerHTML=obj.innerHTML.replace(/(January)/,"Ιανουάριος");
		} else if (obj.innerHTML.match("February")) {
			obj.innerHTML=obj.innerHTML.replace(/(February)/,"Φεβρουάριος");
		} else if (obj.innerHTML.match("March")) {
			obj.innerHTML=obj.innerHTML.replace(/(March)/,"Μάρτιος");
		} else if (obj.innerHTML.match("April")) {
			obj.innerHTML=obj.innerHTML.replace(/(April)/,"Απρίλιος");
		} else if (obj.innerHTML.match("May")) {
			obj.innerHTML=obj.innerHTML.replace(/(May)/,"Μάϊος");
		} else if (obj.innerHTML.match("June")) {
			obj.innerHTML=obj.innerHTML.replace(/(June)/,"Ιούνιος");
		} else if (obj.innerHTML.match("July")) {
			obj.innerHTML=obj.innerHTML.replace(/(July)/,"Ιούλιος");
		} else if (obj.innerHTML.match("August")) {
			obj.innerHTML=obj.innerHTML.replace(/(August)/,"Αύγουστος");
		} else if (obj.innerHTML.match("September")) {
			obj.innerHTML=obj.innerHTML.replace(/(September)/,"Σεπτέμβριος");
		} else if (obj.innerHTML.match("October")) {
			obj.innerHTML=obj.innerHTML.replace(/(October)/,"Οκτώβριος");
		} else if (obj.innerHTML.match("November")) {
			obj.innerHTML=obj.innerHTML.replace(/(November)/,"Νοέμβριος");
		} else if (obj.innerHTML.match("December")) {
			obj.innerHTML=obj.innerHTML.replace(/(December)/,"Δεκέμβριος");
		}		
	}
	
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Recent donations/,"Πρόσφατες δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/Top donors/,"Κορυφαίοι δωρητές");
	tmp.innerHTML=tmp.innerHTML.replace(/Top 10 donors/,"Κορυφαίοι 10 δωρητές");
	tmp.innerHTML=tmp.innerHTML.replace(/this month/,"τρέχων μήνας");
	tmp.innerHTML=tmp.innerHTML.replace(/all time/,"όλοι οι μήνες");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/g,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Sum/g,"Ποσό");
}


//===================================================
//News
//===================================================
function doNews() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(News)/,"Νέα");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");		
	
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show News:)/,"Εμφάνιση νέων:");
	tmp.innerHTML=tmp.innerHTML.replace(/(News Type)/,"Τύπος νέων");
	replaceInputByValue({"View news":["View news"," Εμφάνιση νέων"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");

	var results;
	results = getElements(document, "//table[@class='dataTable paddedTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Top articles)/,"Κορυφαία άρθρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest articles)/,"Τελευταία άρθρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military events)/,"Στρατιωτικά γεγονότα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Political events)/,"Πολιτικά γεγονότα");
		obj = results.snapshotItem(i);
	}
	
		for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	
		allElements = results.snapshotItem(i);
		for (var i = 0; i < 10; i++) {
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute ago)/g,"1 λεπτό πριν");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour ago)/g,"1 ώρα πριν");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day ago)/g,"1 μέρα πριν");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month ago)/g,"1 μήνα πριν");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 λεπτά πριν");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 ώρες πριν");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 μέρες πριν");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 μήνες πριν");
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted)/g,"Αναρτήθηκε");
		
		//A new referendum was started in
		allElements.innerHTML=allElements.innerHTML.replace(/A new referendum was started in/g,"Ένα νέο δημοψήφισμα ξεκίνησε στην(-ο)");
		
		//Civil unrest has started in Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/Civil unrest has started in/g,"Κοινωνική αναταραχή ξεκίνησε στην(-ο)");
		
		//Civil unrest in Lithuania has turned into an open rebellion! 
		allElements.innerHTML=allElements.innerHTML.replace(/has turned into an open rebellion/g,"μετατράπηκε σε ανοικτή επανάσταση");
		allElements.innerHTML=allElements.innerHTML.replace(/Civil unrest in/g,"Η κοινωνική αναταραχή στην(-ο)");
		
		//Loyalists have defeated rebels in a civil war in Lithuania! 
		allElements.innerHTML=allElements.innerHTML.replace(/Loyalists have defeated rebels in a civil war in/g,"Οι κυβερνητικοί νίκησαν τους επαναστάτες στον εμφύλιο της(του)");
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/(secured )([a-zA-Z ]*)(in the battle versus)/g,"εξασφάλισε την(το) $2 στη μάχη ενάντια στην(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(secured)/g,"εξασφάλισε την(το)");
		allElements.innerHTML=allElements.innerHTML.replace(/(in the battle versus)/g,"στη μάχη ενάντια στην(-ο)");
		
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Ο λαός της(του) $2 ξεκίνησε αντίσταση στην(-ο) $5 $4");
		
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"δέχτηκε επίθεση από την(το) $2$3");
		
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"πρότεινε την κήρυξη πολέμου στην(-ο) $5$6");
		
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to)([^<]*)(<[^>]+>)/g,"κήρυξε πόλεμο στην(-ο) $2$3");
		
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/(conquered)/,"κατέκτησε την(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(in the battle versus )/," στη μάχη ενάντια στην(-ο)");
	
		allElements.innerHTML=allElements.innerHTML.replace(/(Money donation of)/,"Η χρηματική δωρεά");
		allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/,"έγινε αποδεκτή");
		allElements.innerHTML=allElements.innerHTML.replace(/(in congress)/,"στη Βουλή");
		allElements.innerHTML=allElements.innerHTML.replace(/(Issuing)/,"Η εκδοση");
		allElements.innerHTML=allElements.innerHTML.replace(/(by congress)/,"από τη Βουλή");
		allElements.innerHTML=allElements.innerHTML.replace(/(Hospital was deployed in)/,"Ένα 	νοσοκομείο αναπτύχθηκε στην(-ο):");
		allElements.innerHTML=allElements.innerHTML.replace(/(Defense System was deployed in)/,"Ένα αμυντικό σύστημα αναπτύχθηκε στην(-ο):");
		allElements.innerHTML=allElements.innerHTML.replace(/(New taxes for)/,"Νέοι φόροι για");
		allElements.innerHTML=allElements.innerHTML.replace(/(President of)/,"Ο πρόεδρος της(του)");
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed to deploy)/,"πρότεινε να αναπτυχθεί");
		allElements.innerHTML=allElements.innerHTML.replace(/(has deployed)/,"ανέπτυξε");
		allElements.innerHTML=allElements.innerHTML.replace(/(Defense System in)/,"αμυντικό σύστημα στην(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(Hospital in)/,"νοσοκομείο στην(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(Impeachment of president of)/,"Η καθαίρεση του προέδρου της(του)");
		allElements.innerHTML=allElements.innerHTML.replace(/(was proposed)/,"προτάθηκε");
		allElements.innerHTML=allElements.innerHTML.replace(/(signed MPP with)/,"υπέγραψε ΜΡΡ με την(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed mutual protection pact to)/,"πρότεινε συμφωνία αμοιβαίας προστασίας στην(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed a peace treaty to)/,"πρότεινε συνθήκη ειρήνης στην(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/,"έγιναν δεκτοί στην(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/,"έγιναν δεκτοί στην(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/,"έχει νέο πρόεδρο");
		allElements.innerHTML=allElements.innerHTML.replace(/(Import tax)/,"Φόρος εισαγωγής");
		allElements.innerHTML=allElements.innerHTML.replace(/(Vat)/,"ΦΠΑ");
		allElements.innerHTML=allElements.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
		allElements.innerHTML=allElements.innerHTML.replace(/(Food)/,"Φαγητό");
		allElements.innerHTML=allElements.innerHTML.replace(/(Gift)/,"Δώρο");
		allElements.innerHTML=allElements.innerHTML.replace(/(Weapon)/,"Όπλα");
		allElements.innerHTML=allElements.innerHTML.replace(/(Ticket)/,"Εισιτήρια");
		allElements.innerHTML=allElements.innerHTML.replace(/(Stone)/,"Πέτρα");
		allElements.innerHTML=allElements.innerHTML.replace(/(Wood)/,"Ξύλο");
		allElements.innerHTML=allElements.innerHTML.replace(/(Grain)/,"Σιτάρι");
		allElements.innerHTML=allElements.innerHTML.replace(/(Iron)/,"Σίδηρος");
		allElements.innerHTML=allElements.innerHTML.replace(/(Oil)/,"Πετρέλαιο");
		allElements.innerHTML=allElements.innerHTML.replace(/(House)/,"Σπίτι");
		allElements.innerHTML=allElements.innerHTML.replace(/(Diamonds)/,"Διαμάντια");
		allElements.innerHTML=allElements.innerHTML.replace(/(Defense System)/,"Αμυντικά συστήματα");
		allElements.innerHTML=allElements.innerHTML.replace(/(were proposed in)/,"προτάθηκαν στην(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(Citizen)/,"O/H πολίτης");
		allElements.innerHTML=allElements.innerHTML.replace(/(proposed a new welcome message )/,"πρότεινε νέο εισαγωγικό μήνυμα");
		}
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Top articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Top articles)/,"Κορυφαία άρθρα");
		} else if (obj.innerHTML.match("Latest articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latest articles)/,"Τελευταάι άρθρα");
		} else if (obj.innerHTML.match("Military events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Military events)/,"Στρατιωτικά γεγονότα");
		} else if (obj.innerHTML.match("Political events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Political events)/,"Πολιτικά γεγονότα");
		} 
	}
}


//===================================================
//Battles List 
//===================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Μάχες");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Έναρξη μάχης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"αμυνόμενος vs επιτιθέμενος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Αποτέλεσμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Συνολική ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles)/,"Καμία μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");

	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Ταξινόμιση:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Μόνο επιδοτούμενες μάχες:");
	
	replaceInputByValue({"Show battles":["Show battles","Εμφάνισε μάχες"]});

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Sorting by start time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by start time)/,"Ταξινόμιση κατά ώρα έναρξης");
		} else if (obj.innerHTML.match("Sorting by subsidy size")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by subsidy size)/,"Ταξινόμιση κατά ύψος επιδότησης");
		} else if (obj.innerHTML.match("Sorting by total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by total damage)/,"Ταξινόμιση κατά συνολική ζημιά");
		}
		}
	
    tmp = allElements.children[4].children[0].children[0];
    var loopz = tmp.children.length;
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	//Needed ???
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Έναρξη μάχης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"αμυνόμενος vs επιτιθέμενος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Αποτέλεσμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Συνολική ζημιά");
	tmp = allElements.children[0].children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles)/,"Καμία μάχη");
	
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
}


//===================================================
//Battle 
//===================================================
function doBattle() {
	// Top3
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Top defenders/,"Κορυφαίοι αμυνόμενοι");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Top attackers/,"Κορυφαίοι επιτιθέμενοι");
	
	// Recent
	tmp = document.getElementById('recentDefenders').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Recent)/,"Πρόσφατοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(defenders)/,"αμυνόμενοι");
	tmp = document.getElementById('recentAttackers').parentNode.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Recent)/,"Πρόσφατοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(attackers)/,"επιτιθέμενοι");
	
	// Current round stats
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current round statistics)/,"Στατιστικά τρέχοντος γύρου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your damage)/,"Η ζημιά σου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defending countries)/,"Κορυφαίες αμυνόμενες χώρες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defending military units)/,"Κορυφαίες αμυνόμενες στρατιωτικές μονάδες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attacking countries)/,"Κορυφαίες επιτιθέμενες χώρες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attacking military units)/,"Κορυφαίες επιτιθέμενες στρατιωτικές μονάδες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Εμφάνισε τα συνολικά στατιστικά της μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"Εμφάνισε τις στρατιωτικές μονάδες που υποστηρίζουν αυτή τη μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Οδηγός πολέμου στο wiki");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Κανόνες μάχης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buildings active during this round)/,"Ενεργά κτήρια σε αυτόν το γύρο");
	
	//Battle information and fight buttons
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];
	
	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Δεν μπορείτε να πολεμήσετε σε αυτή τη μάχη από την τρέχουσα τοποθεσία σας.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Πρέπει να μετακινηθείτε στην κατοχική χώρα για να πάρετε μέρος στη μάχη");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Δεν μπορείτε να πολεμήσετε σε αυτή τη μάχη από την τρέχουσα τοποθεσία σας.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Πρέπει να μετακινηθείτε σε μια από τις χώρες που μετέχουν στη μάχη");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Ο γύρος κερδίθηκε από την(-ο):");
		allElements.innerHTML=allElements.innerHTML.replace(/(has been conquered by)/g,"κατακτήθηκε από την(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(has been secured by)/g,"εξασφαλίστηκε από την(-ο)");
		allElements.innerHTML=allElements.innerHTML.replace(/(Loyalists have won the battle and suppressed the rebellion)/g,"Οι κυβερνητικοί κέρδισαν τη μάχη και κατέστειλαν την επανάσταση");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Επιλέξτε όπλο:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Επιλέξτε πλευρά:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Η πλευρά σας:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side in civil war)/,"Επιλέξτε πλευρά στον εμφύλιο");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/(Loyalists)/,"Κυβερνητικοί");
		tmp = allElements.children[8];
		tmp.innerHTML=tmp.innerHTML.replace(/(Rebels)/,"Επαναστάτες");
		tmp = allElements.children[20];
		replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","Πολέμησε (x 1)"]});
		replaceBerserk()
	}
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round)/g,"Εμφάνιση γύρου");
	}
	
	//Battle Header
	allElements = document.getElementById('battleBar').parentNode;
	replaceAlliesLink();
	tmp = allElements.children[2];
	replaceBattleInfo(tmp);
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"Χωρίς συμμάχους");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Γύρος $2");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"Χωρίς συμμάχους");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Γύρος $2");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Defenders' total damage/,"Συν. ζημιά αμυνόμενου");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Defenders' total damage/,"Συν. ζημιά αμυνόμενου");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Attackers' total damage/,"Συν. ζημιά Επιτιθέμενου");
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/Attackers' total damage/,"Συν. ζημιά Επιτιθέμενου");
	tmp.innerHTML=tmp.innerHTML.replace(/Rounds won by defender/,"Κερδισμένοι γύροι από τον αμυνόμενο ");
	tmp.innerHTML=tmp.innerHTML.replace(/Total defenders online/,"Αμυνόμενοι συνδεδεμένοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Show details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Hide details/,"Απόκρυψη");
	tmp.innerHTML=tmp.innerHTML.replace(/No one/,"Κανένας");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/Rounds won by defender/,"Κερδισμένοι γύροι από τον αμυνόμενο ");
	tmp.innerHTML=tmp.innerHTML.replace(/Total defenders online/,"Αμυνόμενοι συνδεδεμένοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Show details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Hide details/,"Απόκρυψη");
	tmp.innerHTML=tmp.innerHTML.replace(/No one/,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/Rounds won by attacker/,"Κερδισμένοι γύροι από τον επιτιθέμενο ");
	tmp.innerHTML=tmp.innerHTML.replace(/Total attackers online/,"Επιτιθέμενοι συνδεδεμένοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Show details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Hide details/,"Απόκρυψη");
	tmp.innerHTML=tmp.innerHTML.replace(/No one/,"Κανένας");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/Rounds won by attacker/,"Κερδισμένοι γύροι από τον επιτιθέμενο ");
	tmp.innerHTML=tmp.innerHTML.replace(/Total attackers online/,"Επιτιθέμενοι συνδεδεμένοι");
	tmp.innerHTML=tmp.innerHTML.replace(/Show details/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/Hide details/,"Απόκρυψη");
	tmp.innerHTML=tmp.innerHTML.replace(/No one/,"Κανένας");
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Total spectators online/,"Θεατές συνδεδεμένοι");
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/Show details/,"Λεπτομέρειες");
	tmp = allElements.children[22];
	tmp.innerHTML=tmp.innerHTML.replace(/Hide details/,"Απόκρυψη");	
	
	//Bottom Links
	tmp = document.getElementById('contentRow').children[1].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Εμφάνισε τα συνολικά στατιστικά της μάχης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"Εμφάνισε τις στρατιωτικές μονάδες που υποστηρίζουν αυτή τη μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Οδηγός πολέμου στο wiki");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Κανόνες μάχης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buildings active during this round)/,"Ενεργά κτήρια σε αυτόν το γύρο");
}
	
	
//===================================================
//Battle Statistics 
//===================================================
function doBattleStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Γύρος $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Κερδισμένοι γύροι από τον αμυνόμενο ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Κερδισμένοι γύροι από τον επιτιθέμενο ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Επιστροφή στη μάχη");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Τα στατιστική ανανεώνονται κάθε 30 λεπτά");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Στατιστικά μάχης");
}


//===================================================
//Battle MU Statistics 
//===================================================
function doBattleMUStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Γύρος $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Κερδισμένοι γύροι από τον αμυνόμενο ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Κερδισμένοι γύροι από τον επιτιθέμενο ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Επιστροφή στη μάχη");

	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporting military units/,"Στρατιωτικές μονάδες υποστήριξης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defender's supporters)/,"Υποστηρικτές αμυνόμενων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attacker's supporters)/,"Υποστηρικτές επιτιθέμενων");
}


//===================================================
//Country Politics
//===================================================
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Κυβερνητική πολιτική");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Επιλογή χώρας");
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Πρόεδρος");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"Εμφάνιση εκλογών");
    replaceLinkByHref({"http://wiki.e-sim.org/index.php/President":["President","Πρόεδρος"]});
    tmp = allElements.children[9];
    tmp.innerHTML = tmp.innerHTML.replace(/Start civil war/,"Ξεκινήστε εμφύλιο πόλεμο");
    tmp.innerHTML = tmp.innerHTML.replace(/Starting/,"Η έναρξη");
    tmp.innerHTML = tmp.innerHTML.replace(/civil war/,"εμφύλιου πολέμου");
    tmp.innerHTML = tmp.innerHTML.replace(/costs/,"κοστίζει");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold/,"Χρυσό");
	tmp = allElements.children[11];
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Βουλή");
    replaceLinkByHref({"http://wiki.e-sim.org/index.php/Congress":["Congress","Βουλή"]});
    tmp = allElements.children[19];
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Πολέμοι");
    tmp = allElements.children[23];
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Πόλεμος");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Λεπτομέρειες");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Κανένας πόλεμος");
	tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Κανένας πόλεμος");
	tmp.innerHTML = tmp.innerHTML.replace(/allies/g,"σύμμαχοι");
	tmp.innerHTML = tmp.innerHTML.replace(/ally/g,"σύμμαχος");
	tmp.innerHTML = tmp.innerHTML.replace(/no allies/g,"χωρίς συμμάχους");
	tmp.innerHTML = tmp.innerHTML.replace(/Show/g,"Εμφάνισε");
    tmp = allElements.children[24];
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Κανόνες πολέμου");
    tmp = allElements.children[25];
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Συμμαχίες");
    tmp = allElements.children[29];
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Χώρα");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Λήγει σε"); 
	tmp.innerHTML = tmp.innerHTML.replace(/days/g,"μέρες");
    tmp = allElements.children[27].children[0];
    replaceLinkByHref({"http://wiki.e-sim.org/index.php/Alliances":["Alliances","Συμμαχίες"]});
} 


//===================================================
//War Battles
//===================================================
function doWarBattles() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Battles/,"Μάχες");
	tmp = allElements.children[1].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/War/,"Πόλεμος");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/Greece/g,"Ελλάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/Poland/g,"Πολωνία");
	tmp.innerHTML=tmp.innerHTML.replace(/Indonesia/g,"Ινδονησία");
	tmp.innerHTML=tmp.innerHTML.replace(/Lithuania/g,"Λιθουανία");
	tmp.innerHTML=tmp.innerHTML.replace(/Serbia/g,"Σερβία");
	tmp.innerHTML=tmp.innerHTML.replace(/Bulgaria/g,"Βουλγαρία");
	tmp.innerHTML=tmp.innerHTML.replace(/France/g,"Γαλλία");
	tmp.innerHTML=tmp.innerHTML.replace(/Russia/g,"Ρωσσία");
	tmp.innerHTML=tmp.innerHTML.replace(/Slovenia/g,"Σλοβενία");
	tmp.innerHTML=tmp.innerHTML.replace(/Turkey/g,"Τουρκία");
	tmp.innerHTML=tmp.innerHTML.replace(/Italy/g,"Ιταλία");
	tmp.innerHTML=tmp.innerHTML.replace(/China/g,"Κίνα");
	tmp.innerHTML=tmp.innerHTML.replace(/Romania/g,"Ρουμανία");
	tmp.innerHTML=tmp.innerHTML.replace(/Hungary/g,"Ουγγαρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Republic of Macedonia/g,"FYROM");
	tmp.innerHTML=tmp.innerHTML.replace(/Croatia/g,"Κροατία");
	tmp.innerHTML=tmp.innerHTML.replace(/Sweden/g,"Σουηδία");
	tmp.innerHTML=tmp.innerHTML.replace(/Ukraine/g,"Ουκρανία");
	tmp.innerHTML=tmp.innerHTML.replace(/Latvia/g,"Λετονία");
	tmp.innerHTML=tmp.innerHTML.replace(/Spain/g,"Ισπανία");
	tmp.innerHTML=tmp.innerHTML.replace(/Brazil/g,"Βραζιλία");
	tmp.innerHTML=tmp.innerHTML.replace(/USA/g,"ΗΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/United Kingdom/g,"Ηνωμένο Βασίλειο");
	tmp.innerHTML=tmp.innerHTML.replace(/Portugal/g,"Πορτογαλία");
	tmp.innerHTML=tmp.innerHTML.replace(/Argentina/g,"Αργεντινή");
	tmp.innerHTML=tmp.innerHTML.replace(/India/g,"Ινδία");
	tmp.innerHTML=tmp.innerHTML.replace(/Netherlands/g,"Ολλανδία");
	tmp.innerHTML=tmp.innerHTML.replace(/Bosnia and Herzegovina/g,"Βοσνία & Ερζεγοβίνη");
	tmp.innerHTML=tmp.innerHTML.replace(/Iran/g,"Ιράν");
	tmp.innerHTML=tmp.innerHTML.replace(/Finland/g,"Φιλανδία");
	tmp.innerHTML=tmp.innerHTML.replace(/Germany/g,"Γερμανία");
	tmp.innerHTML=tmp.innerHTML.replace(/Mexico/g,"Μεξικό");
	tmp.innerHTML=tmp.innerHTML.replace(/Canada/g,"Καναδάς");
	tmp.innerHTML=tmp.innerHTML.replace(/Taiwan/g,"Ταϊβάν");
	tmp.innerHTML=tmp.innerHTML.replace(/Ireland/g,"Ιρλανδία");
	tmp.innerHTML=tmp.innerHTML.replace(/Australia/g,"Αυστραλία");
	tmp.innerHTML=tmp.innerHTML.replace(/South Korea/g,"Νότια Κορέα");
	tmp.innerHTML=tmp.innerHTML.replace(/Colombia/g,"Κολομβία");
	tmp.innerHTML=tmp.innerHTML.replace(/Chile/g,"Χιλή");
	tmp.innerHTML=tmp.innerHTML.replace(/Pakistan/g,"Πακιστάν");
	tmp.innerHTML=tmp.innerHTML.replace(/Malaysia/g,"Μαλαισία");
	tmp.innerHTML=tmp.innerHTML.replace(/Belgium/g,"Βέλγιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Switzerland/g,"Ελβετία");
	tmp.innerHTML=tmp.innerHTML.replace(/Peru/g,"Περού");
	tmp.innerHTML=tmp.innerHTML.replace(/Norway/g,"Νορβηγία");
	tmp.innerHTML=obj.innerHTML.replace(/(Austria)/,"Αυστρία");
	tmp.innerHTML=obj.innerHTML.replace(/(Denmark)/,"Δανία");
	tmp.innerHTML=obj.innerHTML.replace(/(Montenegro)/,"Μαυροβούνιο");
	tmp.innerHTML=obj.innerHTML.replace(/(Slovakia)/,"Σλοβακία");
	tmp.innerHTML=obj.innerHTML.replace(/(Belarus)/,"Λευκορωσία");
	tmp.innerHTML=obj.innerHTML.replace(/(Czech Republic)/,"Τσεχία");
	tmp.innerHTML=obj.innerHTML.replace(/(Estonia)/,"Εσθονία");
	tmp.innerHTML=obj.innerHTML.replace(/(Philippines)/,"Φιλιππίνες");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Battle/,"Μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/defender vs attacker/,"επιτιθέμενος vs αμυνόμενος");
	tmp.innerHTML=tmp.innerHTML.replace(/Score/,"Αποτέλεσμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total damage done/,"Συνολική ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle start/,"Έναρξη μάχης");
	tmp.innerHTML=tmp.innerHTML.replace(/battle won by/g,"η μάχη κερδίθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
}


//===================================================
//Country Economy
//===================================================
function doCountryEco() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country Economy)/,"Κρατική οικονομία");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Επιλογή χώρας");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Population)/,"Πληθυσμός");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total active citizens)/,"Συνολικοί ενεργοί πολίτες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Συνδεδεμένοι πολίτες");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Νέοι πολίτες σήμερα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total residents)/,"Συνολικοί κάτοικοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Who is online)/,"Ποιοί είναι συνδεδεμένοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Εμφάνιση πληροφοριών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Εμφάνιση πληροφοριών");
	
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Regions)/,"Περιοχές");
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Resources)/,"Πόροι");
		tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Περιοχή");
	for ( var j=0;j < 20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/,"Κανένας πόρος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/,"Πρωτεύουσα της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/,"ΥΨΗΛΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/,"ΜΕΤΡΙΟ");
	}
	obj = results.snapshotItem(i);
	}
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes)/,"Φόροι");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Πόροι");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Import Tax)/,"Φόρος εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income Tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"Πετρέλαιο");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Ξυλο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Σπίτια");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hospital)/,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%A3%CE%AF%CE%B4%CE%B7%CF%81%CE%BF%CF%82.png)/,"Iron.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%A3%CE%B9%CF%84%CE%AC%CF%81%CE%B9.png)/,"Grain.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%A0%CE%B5%CF%84%CF%81%CE%AD%CE%BB%CE%B1%CE%B9%CE%BF.png)/,"Oil.png");	
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%A0%CE%AD%CF%84%CF%81%CE%B1.png)/,"Stone.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%9E%CF%85%CE%BB%CE%BF.png)/,"Wood.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%CE%94%CE%B9%CE%B1%CE%BC%CE%AC%CE%BD%CF%84%CE%B9%CE%B1.png)/,"Diamonds.png");
	}
	
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Θησαυροφυλάκειο");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Θησαυροφυλάκειο");
	}
	
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Απόθεμα κτηρίων");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Κανένα κτήριο");
	}
}


//===================================================
//Citizens online
//===================================================
function doOnlineCitizens() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizens online/,"Συνδεδεμένοι πολίτες");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Select country/,"Επιλέξτε χώρα");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Level/,"Επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/Experience/,"Εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage/,"Ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/Location/,"Τοποθεσία");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//New Citizens
//===================================================
function doNewCitizens() {
	allElements = document.getElementById('contentRow').children[1]
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New Citizens/,"Νέοι Πολίτες");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Select country/,"Επιλέξτε χώρα");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Level/,"Επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/Experience/,"Εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Registered/,"Εγγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/Location/,"Τοποθεσία");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/No citizens/,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
}


//===================================================
//Country Laws ??? premium in correct order ???
//===================================================
function doCountryLaws() {
	//Donate buildings-money
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(You have no buildings in your inventory)/,"Δεν έχετε κτήρια στην αποθήκη σας");
		tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Αμυντικό Σύστημα");
	}
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate:)/,"Επιλέξτε συνάλλαγμα για δωρεά:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Donate item:)/,"Δωρεά συναλλάγματος:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Select money)/,"Επιλέξτε συνάλλαγμα");
		tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσός");
		tmp.innerHTML=tmp.innerHTML.replace(/(Sum:)/,"Ποσότητα:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Reason:)/,"Λόγος:");
		replaceInputByValue({"Donate":["Donate","Δωρεά"]});
	}
	
	//Laws
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Προτάσεις νόμων");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your proposal is being voted in congress right now)/,"Η πρότασή σας βρίσκεται στη Βουλή προς ψήφιση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your proposal is being voted now in your congress)/,"Η πρότασή σας βρίσκεται στη Βουλή προς ψήφιση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Such vote is already in congress)/,"Μια τέτοια ψηφοφορία βρίσκεται ήδη στη Βουλή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your attack was launched successfully)/,"Η επίθεσή σας ξεκίνησε επιτυχώς");
	tmp.innerHTML=tmp.innerHTML.replace(/(You have not enough gold to attack)/,"Δεν έχετε αρκετό χρυσό για την επίθεση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Alliance is being voted now in congress of enemy country. It will be valid if accepted by both countries)/,"Η συμμαχία ψηφίζεται τώρα στη Βουλή της αντίπαλης χώρας. Θα είναι σε ισχύ αν γίνει αποδεκτή και από τις δύο χώρες");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Επιλογή χώρας");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Προτάσεις νόμων");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Επιλογή χώρας");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Προτάσεις νόμων");
	tmp = allElements.children[7];
	replaceLinkByHref({"http://wiki.e-sim.org/index.php/Law proposals":["Law proposals","Προτάσεις νόμου"]});
	tmp = allElements.children[9];
	replaceLinkByHref({"http://wiki.e-sim.org/index.php/Law proposals":["Law proposals","Προτάσεις νόμου"]});
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Type)/,"Τύπος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Status)/,"Κατάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results)/,"Αποτέλεσμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes:No)/,"Ναι:Όχι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Ώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Details)/,"Λεπτομέρειες");
	for(var j=0;j<15;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted)/,"Αποδεκτός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending)/,"Εκκρεμεί");
	tmp.innerHTML=tmp.innerHTML.replace(/(but failed)/,"αλλά απέτυχε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rejected)/,"Απορρίφθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/(seconds ago)/,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(minutes ago)/,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(hours ago)/,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(days ago)/,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(months ago)/,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(second ago)/,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(minute ago)/,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(hour ago)/,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(day ago)/,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(month ago)/,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Εκεχειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"Αλλαγή φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"Καθαίρεση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"Αλλαγή εισαγωγικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Έκδοση χρήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Εκλογή προέδρου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Ανάπτυξη κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Πρόταση ΜΡΡ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Κήρυξη πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose referendum)/,"Πρόταση δημοψηφίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Details)/,"Λεπτομέρειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Nationality change of a military unit )/,"Αλλαγή εθνικότητας στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Nationality change of a stock company)/,"Αλλαγή εθνικότητας εισηγμένης εταιρίας");
		}
	}
	
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Επόμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Προτάσεις νόμων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Δωρεά κτηρίων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidental panel)/,"Προεδρικός έλεγχος");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Προτάσεις νόμων");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidental panel)/,"Προεδρικός έλεγχος");
	tmp = allElements.children[17];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Δωρεά χρημάτων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[18];
	//Congress
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress actions)/,"Βουλευτικές ενέργειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal left)/,"Εναπομείνασες προτάσεις νόμων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Εκεχειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change taxes)/,"Αλλαγή φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeach)/,"Πρόταση καθαίρεσης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose welcome message)/,"Πρόταση εισαγωγικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/g,"Έκδοση χρήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Εκλογή προέδρου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Ανάπτυξη κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Πρόταση ΜΡΡ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Κήρυξη πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Nationality change of a stock company)/,"Αλλαγή εθνικότητας εισηγμένης εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold spent to print money)/,"Χρυσός που θα ξοδευτεί για την έκδοση χρήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Receiver name)/,"Όνομα παραλήπτη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Currency name)/,"Συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose donation)/,"Πρόταση δωρεάς");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat tax)/,"ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Φόρος εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose tax)/,"Πρόταση φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeachment)/,"Πρόταση καθαίρεσης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose president)/,"Πρόταση προέδρου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Message)/,"Μήνυμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose message)/,"Πρόταση μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Preview)/,"Προεπισκόπιση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasure)/,"Κρατικό θησαυροφυλάκιο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Απόθεμα κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Κανένα κτήριο");
	//President
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidental actions)/,"Προεδρικές ενέργειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attack regions)/,"Επίθεση περιοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Manage subsidies)/,"Διαχείρηση επιδοτήσεων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Place buildings)/,"Τοποθέτηση κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Demolish buildings)/,"Κατεδάφιση κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose alliance)/,"Πρόταση συμμαχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/g,"Κήρυξη πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sign peace)/,"Υπογραφή ειρήνης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose referendum)/,"Πρόταση δημοψηφίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasury)/,"Κρατικό θησαυροφυλάκιο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Απόθεμα κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attack region)/,"Επίθεση περιοχής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select region to attack)/,"Επιλέξτε περιοχή για επίθεση");
	tmp.innerHTML=tmp.innerHTML.replace(/(There are no regions to attack right now)/,"Δεν υπάρχουν περιοχές για επίθεση αυτή την στιγμή");
	tmp.innerHTML=tmp.innerHTML.replace(/(attacking region costs)/,"η επίθεση σε περιοχή κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/(of active population in that region \(in gold\))/,"του ενεργού πληθυσμού στην περιοχή (σε χρυσό)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidized battles)/,"Επιδοτούμενες μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money left)/,"Υπόλοιπο επιδότησης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price per)/g,"Τιμή ανά");
	tmp.innerHTML=tmp.innerHTML.replace(/(damage)/g,"ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Delete)/,"Διαγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles)/,"Καμία μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(New subsidy)/,"Νέα επιδότηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select battle)/,"Επιλέξτε μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to deploy a new building)/,"Πρόταση ανάπτυξης νέου κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building type)/,"Τύπος κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quality)/,"Ποιότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round)/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose building)/,"Τοποθέτηση κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to demolish the following building)/,"Πρόταση κατεδάφισης του ακόλουθου κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building)/,"Κτήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Demolish building)/,"Κατεδάφιση κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sign alliance with)/,"Πρόταση υπογραφής συμμαχίας (MPP) με");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose alliance)/,"Πρόταση συμμαχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(signing alliance costs)/,"το κόστος υπογραφής συμμαχίας είναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to declare war to)/,"Πρόταση κήρυξης πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(declaring war costs)/,"το κόστος κήρυξης πολέμου είναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sign peace with)/,"Πρόταση υπογραφής ειρήνης με");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose peace)/,"Πρόταση ειρήνης");
	tmp = allElements.children[20];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress actions)/,"Βουλευτικές ενέργειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal left)/,"Εναπομείνασες προτάσεις νόμων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Εκεχειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change taxes)/,"Αλλαγή φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeach)/,"Πρόταση καθαίρεσης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose welcome message)/,"Πρόταση εισαγωγικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/g,"Έκδοση χρήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Εκλογή προέδρου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Ανάπτυξη κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Πρόταση ΜΡΡ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Κήρυξη πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Nationality change of a stock company)/,"Αλλαγή εθνικότητας εισηγμένης εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold spent to print money)/,"Χρυσός που θα ξοδευτεί για την έκδοση χρήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Receiver name)/,"Όνομα παραλήπτη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Currency name)/,"Συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose donation)/,"Πρόταση δωρεάς");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat tax)/,"ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Φόρος εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose tax)/,"Πρόταση φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeachment)/,"Πρόταση καθαίρεσης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose president)/,"Πρόταση προέδρου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Message)/,"Μήνυμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose message)/,"Πρόταση μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Preview)/,"Προεπισκόπιση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasure)/,"Κρατικό θησαυροφυλάκιο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Απόθεμα κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Κανένα κτήριο");
	replaceInputByValue({"Leave congress":["Leave congress","Αποχώρηση από τη Βουλή"]});
	//President
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidental actions)/,"Προεδρικές ενέργειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attack regions)/,"Επίθεση περιοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Manage subsidies)/,"Διαχείρηση επιδοτήσεων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Place buildings)/,"Τοποθέτηση κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Demolish buildings)/,"Κατεδάφιση κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose alliance)/,"Πρόταση συμμαχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/g,"Κήρυξη πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sign peace)/,"Υπογραφή ειρήνης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose referendum)/,"Πρόταση δημοψηφίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasury)/,"Κρατικό θησαυροφυλάκιο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Απόθεμα κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attack region)/,"Επίθεση περιοχής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select region to attack)/,"Επιλέξτε περιοχή για επίθεση");
	tmp.innerHTML=tmp.innerHTML.replace(/(There are no regions to attack right now)/,"Δεν υπάρχουν περιοχές για επίθεση αυτή την στιγμή");
	tmp.innerHTML=tmp.innerHTML.replace(/(attacking region costs)/,"η επίθεση σε περιοχή κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/(of active population in that region \(in gold\))/,"του ενεργού πληθυσμού στην περιοχή (σε χρυσό)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidized battles)/,"Επιδοτούμενες μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money left)/,"Υπόλοιπο επιδότησης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price per)/g,"Τιμή ανά");
	tmp.innerHTML=tmp.innerHTML.replace(/(damage)/g,"ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Delete)/,"Διαγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles)/,"Καμία μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(New subsidy)/,"Νέα επιδότηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select battle)/,"Επιλέξτε μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to deploy a new building)/,"Πρόταση ανάπτυξης νέου κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building type)/,"Τύπος κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quality)/,"Ποιότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round)/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose building)/,"Τοποθέτηση κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to demolish the following building)/,"Πρόταση κατεδάφισης του ακόλουθου κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building)/,"Κτήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Demolish building)/,"Κατεδάφιση κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sign alliance with)/,"Πρόταση υπογραφής συμμαχίας (MPP) με");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose alliance)/,"Πρόταση συμμαχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(signing alliance costs)/,"το κόστος υπογραφής συμμαχίας είναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to declare war to)/,"Πρόταση κήρυξης πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(declaring war costs)/,"το κόστος κήρυξης πολέμου είναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sign peace with)/,"Πρόταση υπογραφής ειρήνης με");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose peace)/,"Πρόταση ειρήνης");
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Δωρεά κτηρίων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[22];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidental panel)/,"Προεδρικός έλεγχος");
	tmp = allElements.children[23];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Δωρεά κτηρίων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidental panel)/,"Προεδρικός έλεγχος");
	tmp = allElements.children[26];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Δωρεά χρημάτων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[27];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidental actions)/,"Προεδρικές ενέργειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attack regions)/,"Επίθεση περιοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Manage subsidies)/,"Διαχείρηση επιδοτήσεων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Place buildings)/,"Τοποθέτηση κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Demolish buildings)/,"Κατεδάφιση κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose alliance)/,"Πρόταση συμμαχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/g,"Κήρυξη πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sign peace)/,"Υπογραφή ειρήνης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose referendum)/,"Πρόταση δημοψηφίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasury)/,"Κρατικό θησαυροφυλάκιο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Απόθεμα κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attack region)/,"Επίθεση περιοχής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select region to attack)/,"Επιλέξτε περιοχή για επίθεση");
	tmp.innerHTML=tmp.innerHTML.replace(/(There are no regions to attack right now)/,"Δεν υπάρχουν περιοχές για επίθεση αυτή την στιγμή");
	tmp.innerHTML=tmp.innerHTML.replace(/(attacking region costs)/,"η επίθεση σε περιοχή κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/(of active population in that region \(in gold\))/,"του ενεργού πληθυσμού στην περιοχή (σε χρυσό)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidized battles)/,"Επιδοτούμενες μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money left)/,"Υπόλοιπο επιδότησης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price per)/g,"Τιμή ανά");
	tmp.innerHTML=tmp.innerHTML.replace(/(damage)/g,"ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Delete)/,"Διαγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles)/,"Καμία μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(New subsidy)/,"Νέα επιδότηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select battle)/,"Επιλέξτε μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to deploy a new building)/,"Πρόταση ανάπτυξης νέου κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building type)/,"Τύπος κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quality)/,"Ποιότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round)/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose building)/,"Τοποθέτηση κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to demolish the following building)/,"Πρόταση κατεδάφισης του ακόλουθου κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building)/,"Κτήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Demolish building)/,"Κατεδάφιση κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sign alliance with)/,"Πρόταση υπογραφής συμμαχίας (MPP) με");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose alliance)/,"Πρόταση συμμαχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(signing alliance costs)/,"το κόστος υπογραφής συμμαχίας είναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to declare war to)/,"Πρόταση κήρυξης πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(declaring war costs)/,"το κόστος κήρυξης πολέμου είναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sign peace with)/,"Πρόταση υπογραφής ειρήνης με");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose peace)/,"Πρόταση ειρήνης");
	tmp = allElements.children[28];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Δωρεά χρημάτων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[29];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidental actions)/,"Προεδρικές ενέργειες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attack regions)/,"Επίθεση περιοχών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Manage subsidies)/,"Διαχείρηση επιδοτήσεων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Place buildings)/,"Τοποθέτηση κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Demolish buildings)/,"Κατεδάφιση κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose alliance)/,"Πρόταση συμμαχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/g,"Κήρυξη πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sign peace)/,"Υπογραφή ειρήνης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose referendum)/,"Πρόταση δημοψηφίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Χρυσός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasury)/,"Κρατικό θησαυροφυλάκιο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Απόθεμα κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Attack region)/,"Επίθεση περιοχής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select region to attack)/,"Επιλέξτε περιοχή για επίθεση");
	tmp.innerHTML=tmp.innerHTML.replace(/(There are no regions to attack right now)/,"Δεν υπάρχουν περιοχές για επίθεση αυτή την στιγμή");
	tmp.innerHTML=tmp.innerHTML.replace(/(attacking region costs)/,"η επίθεση σε περιοχή κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/(of active population in that region \(in gold\))/,"του ενεργού πληθυσμού στην περιοχή (σε χρυσό)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidized battles)/,"Επιδοτούμενες μάχες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money left)/,"Υπόλοιπο επιδότησης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price per)/g,"Τιμή ανά");
	tmp.innerHTML=tmp.innerHTML.replace(/(damage)/g,"ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Delete)/,"Διαγραφή");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles)/,"Καμία μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(New subsidy)/,"Νέα επιδότηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Select battle)/,"Επιλέξτε μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money to spent)/,"Ποσό επιδότησης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to deploy a new building)/,"Πρόταση ανάπτυξης νέου κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building type)/,"Τύπος κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quality)/,"Ποιότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round)/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose building)/,"Τοποθέτηση κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to demolish the following building)/,"Πρόταση κατεδάφισης του ακόλουθου κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building)/,"Κτήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Demolish building)/,"Κατεδάφιση κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sign alliance with)/,"Πρόταση υπογραφής συμμαχίας (MPP) με");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose alliance)/,"Πρόταση συμμαχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(signing alliance costs)/,"το κόστος υπογραφής συμμαχίας είναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to declare war to)/,"Πρόταση κήρυξης πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(declaring war costs)/,"το κόστος κήρυξης πολέμου είναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose to sign peace with)/,"Πρόταση υπογραφής ειρήνης με");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose peace)/,"Πρόταση ειρήνης");
	tmp = allElements.children[30];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Δωρεά κτηρίων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[35];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Δωρεά χρημάτων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[43];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Δωρεά κτηρίων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[48];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Δωρεά χρημάτων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[45];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Δωρεά κτηρίων στο κρατικό θησαυροφυλάκιο");
	tmp = allElements.children[50];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Δωρεά χρημάτων στο κρατικό θησαυροφυλάκιο");	
	
	//Premium account stuff
	tmp = allElements.children[22];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes statistics)/,"Στατιστικά φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(data from yesterday)/,"δεδομένα από χτες");
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes statistics)/,"Στατιστικά φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(data from yesterday)/,"δεδομένα από χτες");
	tmp = allElements.children[26];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total taxes collected)/,"Συνολικά έσοδα φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat collected)/,"Έσοδα ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax collected)/,"Έσοδα φόρου εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax collected)/,"Έσοδα φόρου εισοδήματος");
	tmp = allElements.children[28];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total taxes collected)/,"Συνολικά έσοδα φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat collected)/,"Έσοδα ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax collected)/,"Έσοδα φόρου εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax collected)/,"Έσοδα φόρου εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Tax income by products)/,"Έσοδα φόρων ανά προϊόν");
	tmp = allElements.children[30];
	tmp.innerHTML=tmp.innerHTML.replace(/(Tax income by products)/,"Έσοδα φόρων ανά προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Φόρος εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total income)/,"Συνολικά έσοδα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp = allElements.children[32];
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax by regions)/,"Φόρος εισοδήματος ανά περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Προϊόν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Φόρος εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total income)/,"Συνολικά έσοδα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp = allElements.children[34];
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax by regions)/,"Φόρος εισοδήματος ανά περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Peloponnese)/,"Πελοπόννησος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Central Greece)/,"Κεντρική Ελλάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Makeonia)/,"Μακεδονία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Crete)/,"Κρήτη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Epirus Thessaly)/,"Ήπειρος/Θεσσαλία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Thrace)/,"Θράκη");
	tmp = allElements.children[36];
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Peloponnese)/,"Πελοπόννησος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Central Greece)/,"Κεντρική Ελλάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Makeonia)/,"Μακεδονία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Crete)/,"Κρήτη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Epirus Thessaly)/,"Ήπειρος/Θεσσαλία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Thrace)/,"Θράκη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money supply)/,"Χρηματικό αποθεματικό");
	tmp = allElements.children[38];
	tmp.innerHTML=tmp.innerHTML.replace(/(Money supply)/,"Χρηματικό αποθεματικό");
	tmp = allElements.children[40];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total money supply)/,"Συνολικό Χ. Α.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in country treasures)/,"Χ. Α. κρατικών ταμείων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in MU's accounts)/,"Χ. Α. λογαριασμών στρ. μον.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in citizen's account)/,"Χ. Α. λογαριασμών πολιτών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money on monetary market)/,"Χ. Α. αγοράς συναλλάγματος");
	tmp = allElements.children[42];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total money supply)/,"Συνολικό Χ. Α.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in country treasures)/,"Χ. Α. κρατικών ταμείων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in MU's accounts)/,"Χ. Α. λογαριασμών στρ. μον.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money in citizen's account)/,"Χ. Α. λογαριασμών πολιτών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money on monetary market)/,"Χ. Α. αγοράς συναλλάγματος");
}


//===================================================
//Law Proposals
//===================================================
function doLaws() {
	//var allElements;
	allElements = document.getElementById('contentRow').children[1];
	//var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposal)/,"Πρόταση νόμου");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already voted in this proposal)/,"Έχετε ήδη ψηφίσει σε αυτή την πρόταση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote casted)/,"Η ψήφος καταμετρήθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal)/,"Πρόταση νόμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Proposed by)/,"Προτάθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Έκδοση χρήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Ανάπτυξη κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Πρόταση ΜΡΡ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"Αλλαγή φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"Αλλαγή εισαγωγικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Εκεχειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Κήρυξη πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"Καθαίρεση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose referendum)/,"Πρόταση δημοψηφίσματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Nationality change of a stock company)/,"Αλλαγή εθνικότητας εισηγμένης εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/\?/,";");
	tmp.innerHTML=tmp.innerHTML.replace(/law.html;id=/,"law.html?id=");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to change nationality of/,"Συμφωνείτε να αλλάξετε την εθνικότητα των");
	tmp.innerHTML=tmp.innerHTML.replace(/into/,"σε");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change of a military unit /,"Αλλαγή εθνικότητας στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to accept)/,"Συμφωνείτε να δεχθείτε την πρόταση της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(proposal to sign MPP \(Mutual Protection Pact\))/,"για υπογραφή MPP (Συμφωνία Αμοιβαίας Προστασίας)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to change current welcome message to the following one)/,"Συμφωνείτε να αλλάξετε το τρέχων εισαγωγικό μήνυμα στο ακόλουθο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to change)/,"Συμφωνείτε να αλλάξετε τη φορολογία");
	tmp.innerHTML=tmp.innerHTML.replace(/(taxes to)/,"σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Φόρος εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/,"των Όπλων");
	tmp.innerHTML=tmp.innerHTML.replace(/House/,"των Σπιτιών");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/,"των Δώρων");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/,"του Φααγητού");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/,"των Εισιτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/Q1 Defense System/,"Q1 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q2 Defense System/,"Q2 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q3 Defense System/,"Q3 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q4 Defense System/,"Q4 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q5 Defense System/,"Q5 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q1 Hospital/,"Q1 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Q2 Hospital/,"Q2 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Q3 Hospital/,"Q3 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Q4 Hospital/,"Q4 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Q5 Hospital/,"Q5 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/,"των Αμυντικών συστημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/,"των Νοσοκομείων");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/,"του Σίδηρου");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/,"του Σιταριού");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/,"του Πετρελαίου");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/,"της Πέτρας");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/,"του Ξύλου");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/,"των Διαμαντιών");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to donate/,"Συμφωνείτε να δωρήσετε");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to spend/,"Συμφωνείτε να ξοδέψετε");
	tmp.innerHTML=tmp.innerHTML.replace(/to print/,"για να τυπώσετε");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to deploy/,"Συμφωνείτε να αναπτύξετε");
	tmp.innerHTML=tmp.innerHTML.replace(/in region/,"στην περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to start new referendum with the following question/,"Συμφωνείτε να ξεκινήσει ένα δημοψήφισμα με την ακόλουθη ερώτηση");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to declare war to/,"Συμφωνείτε να κηρύξετε πόλεμο στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to sign peace with/,"Συμφωνείτε να υπογράψετε ειρήνη με την(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree for an impeachment of president/,"Συμφωνείτε για καθαίρεση της(του) προέδρου");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to elect/,"Συμφωνείτε εκλέξετε την(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/for president/,"για πρόεδρο");
	tmp.innerHTML=tmp.innerHTML.replace(/ to /," στην(-ο) ");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal)/,"Πρόταση νόμου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Proposed by)/,"Προτάθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Έκδοση χρήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Ανάπτυξη κτηρίου");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"Πρόταση ΜΡΡ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"Αλλαγή φόρων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"Αλλαγή εισαγωγικού μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"Καθαίρεση");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/\?/,";");
	tmp.innerHTML=tmp.innerHTML.replace(/law.html;id=/,"law.html?id=");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to change nationality of/,"Συμφωνείτε να αλλάξετε την εθνικότητα των");
	tmp.innerHTML=tmp.innerHTML.replace(/into/,"σε");
	tmp.innerHTML=tmp.innerHTML.replace(/Nationality change of a military unit /,"Αλλαγή εθνικότητας στρατιωτικής μονάδας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to accept)/,"Συμφωνείτε να δεχθείτε την πρόταση της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(proposal to sign MPP \(Mutual Protection Pact\))/,"για υπογραφή MPP (Συμφωνία Αμοιβαίας Προστασίας)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to change current welcome message to the following one)/,"Συμφωνείτε να αλλάξετε το τρέχων εισαγωγικό μήνυμα στο ακόλουθο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Do you agree to change)/,"Συμφωνείτε να αλλάξετε τη φορολογία");
	tmp.innerHTML=tmp.innerHTML.replace(/(taxes to)/,"σε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Φόρος εισαγωγής");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vat)/,"ΦΠΑ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income tax)/,"Φόρος εισοδήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/,"των Όπλων");
	tmp.innerHTML=tmp.innerHTML.replace(/House/,"των Σπιτιών");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/,"των Δώρων");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/,"του Φααγητού");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/,"των Εισιτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/Q1 Defense System/,"Q1 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q2 Defense System/,"Q2 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q3 Defense System/,"Q3 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q4 Defense System/,"Q4 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q5 Defense System/,"Q5 Αμυντικό σύστημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Q1 Hospital/,"Q1 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Q2 Hospital/,"Q2 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Q3 Hospital/,"Q3 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Q4 Hospital/,"Q4 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Q5 Hospital/,"Q5 Νοσοκομείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/,"των Αμυντικών συστημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/,"των Νοσοκομείων");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/,"του Σίδηρου");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/,"του Σιταριού");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/,"του Πετρελαίου");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/,"της Πέτρας");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/,"του Ξύλου");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/,"των Διαμαντιών");
	tmp.innerHTML=tmp.innerHTML.replace(/Estate/g,"Μέγαρο");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to donate/,"Συμφωνείτε να δωρήσετε");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to spend/,"Συμφωνείτε να ξοδέψετε");
	tmp.innerHTML=tmp.innerHTML.replace(/to print/,"για να τυπώσετε");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to deploy/,"Συμφωνείτε να αναπτύξετε");
	tmp.innerHTML=tmp.innerHTML.replace(/in region/,"στην περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to declare war to/,"Συμφωνείτε να κηρύξετε πόλεμο στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to sign peace with/,"Συμφωνείτε να υπογράψετε ειρήνη με την(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree for an impeachment of president/,"Συμφωνείτε για καθαίρεση της(του) προέδρου");
	tmp.innerHTML=tmp.innerHTML.replace(/Do you agree to elect/,"Συμφωνείτε εκλέξετε την(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/for president/,"για πρόεδρο");
	tmp.innerHTML=tmp.innerHTML.replace(/ to /," στην(-ο) ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Remaining time)/,"Υπολοιπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Votes casted)/,"Σύνολο ψήφων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Voting finished)/,"Η ψηφοφορία έληξε");
	tmp.innerHTML=tmp.innerHTML.replace(/(seconds ago)/,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(minutes ago)/,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(hours ago)/,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(days ago)/,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(months ago)/,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(second ago)/,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(minutesago)/,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(hour ago)/,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(day ago)/,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(month ago)/,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fail reason)/,"Λόγος αποτυχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/There is currently an active battle in this region/,"Αυτή τη στιγμή υπάρχει ενεργή μάχη σε αυτή την περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(One of countries has not enough money)/,"Μία από τις χώρες δεν έχει αρκετά χρήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/(There is already war beetwen those countries)/,"Υπάρχει ήδη πόλεμος ανάμεσα σε αυτές τις χώρες");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote YES)/,"Ψηφίστε ΝΑΙ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote NO)/,"Ψηφίστε ΟΧΙ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes)/,"Ναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Όχι");	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Nobody)/g,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Remaining time)/,"Υπολοιπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Votes casted)/,"Σύνολο ψήφων");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes)/,"Ναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Όχι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Supporting congressmen)/,"Βουλευτές υπέρ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Congressmen against)/,"Βουλευτές κατά");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Supporting congressmen)/,"Βουλευτές υπέρ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Congressmen against)/,"Βουλευτές κατά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Nobody)/g,"Κανένας");
}


//===================================================
//Referendum
//===================================================
function doReferendum() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(National Referendum)/,"Εθνικό Δημοψήφισμα");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show archival referendums)/,"Εμφάνισε αρχειοθετημένα δημοψηφίσματα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show)/,"Εμφάνισε");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Referendum)/,"Δημοψήφισμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Proposed by)/,"Προτάθηκε από τον(την)");
	tmp.innerHTML=tmp.innerHTML.replace(/(and)/,"και");
	tmp.innerHTML=tmp.innerHTML.replace(/(accepted by congress)/,"έγινε αποδεκτό από τη Βουλή");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/(Question)/,"Ερώτηση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time remaining)/,"Υπολοιπόμενος χρόνος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Συνολικοί ψήφοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote YES)/,"Ψηφίστε ΝΑΙ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote NO)/,"Ψηφίστε ΟΧΙ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Referendum finished)/,"Το δημοψήφισμα τελείωσε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Votes yes)/,"Ψήφισαν ναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Votes no)/,"Ψήφισαν όχι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your vote)/,"Η ψήφος σας");
	tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Όχι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes)/,"Ναι");
	tmp.innerHTML=tmp.innerHTML.replace(/(This referendum is already closed)/,"Αυτό το δημοψήφισμα έχει ήδη κλείσει");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Archival referendums)/,"Αρχειοθετημένα δημοψηφίσματα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Proposed by)/,"Προτάθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/Status/,"Κατάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/View/g,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/In progress/g,"Σε εξέλιξη");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected/g,"Απορρίφθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/g,"Αποδεκτό");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Archival referendums)/,"Αρχειοθετημένα δημοψηφίσματα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Proposed by)/,"Προτάθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/Status/,"Κατάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/View/g,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/In progress/g,"Σε εξέλιξη");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected/g,"Απορρίφθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/g,"Αποδεκτό");
}


//===================================================
//Party Elections
//===================================================
function doPartyElec() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party Elections)/,"Κομματικές εκλογές");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show)/,"Εμφάνισε");
	replaceOptionTxt(allElements, {
		"January":["January","Ιανουάριος"],
		"February":["February","Φεβρουάριος"],
		"March":["March","Μάρτιος"],
		"April":["April","Απρίλιος"],
		"May":["May","Μάϊος"],
		"June":["June","Ιούνιος"],
		"July":["July","Ιούλιος"],
		"August":["August","Αύγουστος"],
		"September":["September","Σεπτέμβριος"],
		"October":["October","Οκτώβριος"],
		"November":["November","Νοέμβριος"],
		"December":["December","Δεκέμριος"]
	})	
		
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party elections tutorial)/,"Οδηγός κομματικών εκλογών");
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Υποψήφιος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Κόμμα");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Συνολικοί ψήφοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/g,"Παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/g,"Χωρίς παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote)/g,"Ψηφίστε");
	tmp.innerHTML=tmp.innerHTML.replace(/(No candidates)/,"Κανένας υποψήφιος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your candidate)/,"Ο υποψήφιός σας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results will be available tomorrow)/,"Τα αποτελέσματα θα είναι διαθέσιμα αύριο");
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Submit your candidature for a party leader of)/,"Υποβάλετε την υποψηφιότητά σας για αρχηγός του κόμματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Link to presentation)/,"Σύνδεσμος παρουσίασης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate for party leader)/,"Υποψήφιος για αρχηγός κόμματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidating for party leader costs)/,"Η υποψηφιότητα για αρχηγό κόμματος κοσστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσό");
}


//===================================================
//Congress Elections
//===================================================
function doCongressElec() {
	allElements = document.getElementById('date');
		replaceOptionTxt(allElements, {
			"January":["January","Ιανουάριος"],
			"February":["February","Φεβρουάριος"],
			"March":["March","Μάρτιος"],
			"April":["April","Απρίλιος"],
			"May":["May","Μάϊος"],
			"June":["June","Ιούνιος"],
			"July":["July","Ιούλιος"],
			"August":["August","Αύγουστος"],
			"September":["September","Σεπτέμβριος"],
			"October":["October","Οκτώβριος"],
			"November":["November","Νοέμβριος"],
			"December":["December","Δεκέμριος"]
		})
		
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Εμφάνιση"]});
	replaceInputByValue({"Remove from list":["Remove from list","Αφαίρεση από το ψηφοδέλτιο"]});
	replaceInputByValue({"Restore to list":["Restore to list","Επαναφορά στο ψηφοδδέλτιο"]});
	replaceInputByValue({"Vote":["Vote","Ψηφίστε"]});
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress Elections)/,"Βουλευτικές εκλογές");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your vote has been casted successfully)/,"Ο ψήφος σας καταμετρήθηκε επιτυχώς");
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already casted your vote)/,"Έχετε ψηφίσει ήδη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidature was deleted)/,"Η υποψηφιότητα διαγράφηκε");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Οδηγός βουλευτικών εκλογών");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Κόμμα");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Οδηγός βουλευτικών εκλογών");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Elected candidates)/,"Εκλεγμένοι υποψήφιοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Election candidates)/,"Υποψήφιοι εκλογών");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Υποψήφιος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Συνολικοί ψήφοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/g,"Χωρίς παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/g,"Παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidature removed)/g,"Η υποψηφιότητα απορρίφθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/(by party leader)/g,"από τον αρχηγό του κόμματος");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Election candidates)/,"Υποψήφιοι εκλογών");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are a candidate of)/,"Είστε υποψήφιος της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cancel my candidature)/,"Ακύρωση της υποψηφιότητάς μου");
	tmp.innerHTML=tmp.innerHTML.replace(/(You can add your candidature to upcoming congress elections)/,"Μπορείτε να προσθέσετε την υποψηφιότητά σας στις επερχόμενες βουλευτικές εκλογές");
	tmp.innerHTML=tmp.innerHTML.replace(/(You will start from your current party list)/,"Θα είστε υποψήφιος με το τρέχων κόμμα σας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Link to presentation)/,"Σύνδεσμος παρουσίασης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate for congress)/,"Υποψήφιος βουλευτής");
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Υποψήφιος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Συνολικοί ψήφοι");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/g,"Χωρίς παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/g,"Παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(confidential)/g,"εμπιστευτικό");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your vote)/,"Η ψήφος σας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidature removed)/g,"Η υποψηφιότητα απορρίφθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/(by party leader)/g,"από τον αρχηγό του κόμματος");
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Not elected candidates)/,"Μη εκλεγμένοι υποψήφιοι");
	
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are a candidate of)/,"Είστε υποψήφιος της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cancel my candidature)/,"Ακύρωση της υποψηφιότητάς μου");
	
		allElements = document.getElementById('date');
		replaceOptionTxt(allElements, {
			"January":["January","Ιανουάριος"],
			"February":["February","Φεβρουάριος"],
			"March":["March","Μάρτιος"],
			"April":["April","Απρίλιος"],
			"May":["May","Μάϊος"],
			"June":["June","Ιούνιος"],
			"July":["July","Ιούλιος"],
			"August":["August","Αύγουστος"],
			"September":["September","Σεπτέμβριος"],
			"October":["October","Οκτώβριος"],
			"November":["November","Νοέμβριος"],
			"December":["December","Δεκέμριος"]
		})	
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Κόμμα:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Ημερομηνία:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Χώρα");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Υποψήφιος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Κόμμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Συνολικοί ψήφοι");
	for(j=0;j<30;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Χωρίς παρουσίαση");
	}
	for(j=0;j<20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Παρουσίαση");
	}}
	
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Congress elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Οδηγός βουλευτικών εκλογών");
	}
}


//===================================================
//President elections
//===================================================
function doPresiElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential Elections)/,"Προεδρικές εκλογές");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already casted your vote)/,"Έχετε ψηφίσει ήδη");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your vote has been casted successfully)/,"Ο ψήφος σας καταμετρήθηκε επιτυχώς");
	
	replaceInputByValue({"Show":["Show","Εμφάνισε"]});
	replaceInputByValue({"Candidate for president":["Candidate for president","Υποψήφιος για πρόεδρος"]});
	
	allElements = document.getElementById('date');
		replaceOptionTxt(allElements, {
			"January":["January","Ιανουάριος"],
			"February":["February","Φεβρουάριος"],
			"March":["March","Μάρτιος"],
			"April":["April","Απρίλιος"],
			"May":["May","Μάϊος"],
			"June":["June","Ιούνιος"],
			"July":["July","Ιούλιος"],
			"August":["August","Αύγουστος"],
			"September":["September","Σεπτέμβριος"],
			"October":["October","Οκτώβριος"],
			"November":["November","Νοέμβριος"],
			"December":["December","Δεκέμριος"]
		})
		
	var tmp;
	tmp = allElements.children[1]
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Date)/,"Ημερομηνία");
	tmp = allElements.children[2]
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections tutorial)/,"Οδηγός προεδρικών εκλογών");

		allElements = document.getElementById('date');
		replaceOptionTxt(allElements, {
			"January":["January","Ιανουάριος"],
			"February":["February","Φεβρουάριος"],
			"March":["March","Μάρτιος"],
			"April":["April","Απρίλιος"],
			"May":["May","Μάϊος"],
			"June":["June","Ιούνιος"],
			"July":["July","Ιούλιος"],
			"August":["August","Αύγουστος"],
			"September":["September","Σεπτέμβριος"],
			"October":["October","Οκτώβριος"],
			"November":["November","Νοέμβριος"],
			"December":["December","Δεκέμριος"]
		})
		
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Ημερομηνία:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Χώρα");	
	}
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Υποψήφιος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Συνολικοί ψήφοι");	
	for(j=0;j<5;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No candidates)/,"Κανένας υποψήφιος");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Χωρίς παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Presentation)/,"Παρουσίαση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Vote)/,"Ψήφίστε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results will be available tomorrow)/,"Τα αποτελέσματα θα είναι διαθέσιμα αύριο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your candidate)/,"Ο υποψήφιός σας");
	}}
	
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Presidental elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections tutorial)/,"Οδηγός προεδρικών εκλογών");
	}
	
	var allElements;
	allElements = document.getElementById('command');
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Link to presentation)/,"Σύνδεσμος για την παρουσίαση");
	
	//allElements = document.getElementById('command').parentnode;
	//tmp.innerHTML=tmp.innerHTML.replace(/(Candidating for president costs)/,"Η υποψηφιότητα για πρόεδρος κοστίζει");
}


//===================================================
//Citizenship Application
//===================================================
function doCSappli() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Εμφάνισε"]});
	replaceInputByValue({"Apply for citizenship":["Apply for citizenship","Αίτηση υπηκοότητας"]});
	replaceInputByValue({"Accept":["Accept","Αποδοχή"]});
	var tmp;
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending citizenship applications)/,"Εκκρεμείς αιτήσεις υπηκοότητας");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show accepted citizenship)/,"Εμφάνιση δεκτών αιτήσεων υπηκοότητας");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Χώρα:");
	tmp.innerHTML=tmp.innerHTML.replace(/(As a congress member of)/,"Σαν μέλος της Βουλής της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(you are allowed to give)/,"επιτρέπεται να δώσετε");
	tmp.innerHTML=tmp.innerHTML.replace(/(more citizenship)/,"υπηκοότητες ακόμα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your citizenship)/,"Η υπηκοότητά σας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your application for citizenship in)/,"Η αίτησή σας για υπηκοότητα στην(-ο)");	
	tmp.innerHTML=tmp.innerHTML.replace(/(The application will be revised by)/,"Η αίτησή σας θα εξεταστεί από:");		
	tmp.innerHTML=tmp.innerHTML.replace(/(congress members of)/,"Μέλη της Βουλής της(-ου)");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending applications)/,"Εκκρεμείς αιτήσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/(No applications)/,"Καμία αίτηση");	
	tmp.innerHTML=tmp.innerHTML.replace(/(posted)/g,"Κατατέθηκε");	
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	obj=results.snapshotItem(i);
	}
	
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/index.php/Citizenship']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenships on wiki)/,"Υπηκοότητες στο wiki");
	}
}


//===================================================
//Accepted citizenship
//===================================================
function doCSaccepted() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Εμφάνισε"]});
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted citizenship applications)/,"Αποδεχθέντες αιτήσεις υπηκοότητας");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show pending citizenship application)/,"Εμφάνιση εκκρεμών αιτήσεων υπηκοότητας");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Χώρα");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted applications)/,"Αποδεχθέντες αιτήσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted by)/g,"Αποδεκτή από");
	tmp.innerHTML=tmp.innerHTML.replace(/(posted)/g,"Κατατέθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}

//===================================================
//World Map
//===================================================
function doWorldmap() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	var tmp;
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(World map)/,"Χάρτης");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Browse territories)/,"Αναζήτηση περιοχών");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Map Type:)/,"Τύπος χάρτη:");
	//tmp = allElements.children[9];
	//tmp.innerHTML=tmp.innerHTML.replace(/(Political)/,"Πολιτικός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Πολεμικός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Demographics by citizenship)/,"Δημογραφικός κατά υπηκοότητα");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Demographics)/,"Δημογραφικός");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Εταιριών");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Resources)/,"Πόρων");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Defensive buildings)/,"Αμυντικών συστημάτων");
	//tmp.innerHTML=tmp.innerHTML.replace(/(Productivity)/,"Παραγωγικός");
}


//===================================================
//Map
//===================================================
function doMap() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Map/,"Αναζήτηση περιοχών");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Χώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Resource/,"Πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/All resources/,"Όλοι οι πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/Show regions/,"Εμφάνισε περιοχές");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Region/,"Περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/Owner/,"Ιδιοκτήτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Rightful owner/,"Νόμιμος ιδιοκτήτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Resource/,"Πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/Neighbours/,"Γείτονες");
	tmp.innerHTML=tmp.innerHTML.replace(/No resources/g,"Χωρίς πόρους");
	tmp.innerHTML=tmp.innerHTML.replace(/Capital of/g,"Πρωτεύουσα της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/HIGH/g,"ΥΨΗΛΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/MEDIUM/g,"ΜΕΤΡΙΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Region
//===================================================
function doRegion() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Region)/,"Περιοχή:");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current owner)/,"Τρέχων ιδιοκτήτης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rightful owner)/,"Νόμιμος ιδιοκτήτης");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Population)/,"Πληθυσμός");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/,"Πρωτεύουσα της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/,"ΥΨΗΛΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/,"ΜΕΤΡΙΟ");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Start a resistance war)/,"Ξεκινήστε επαναστατικό πόλεμο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Start resistance)/,"Ξεκινήστε επανάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Starting resistance costs)/,"Η έναρξη επανάστασης κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/(Neighbour region)/,"Γειτονική περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/g,"Πρωτεύουσα της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/g,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/g,"ΥΨΗΛΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/g,"ΜΕΤΡΙΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance has started)/,"Η επανάσταση ξεκίνησε");
	tmp.innerHTML=tmp.innerHTML.replace(/(You must be in this region to start resistance)/,"Πρέπει να είστε σε αυτήτ ην περιοχή για να ξεκινήσετε επανάσταση");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Start a resistance war)/,"Ξεκινήστε επαναστατικό πόλεμο");
	tmp.innerHTML=tmp.innerHTML.replace(/(Start resistance)/,"Ξεκινήστε επανάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/(Starting resistance costs)/,"Η έναρξη επανάστασης κοστίζει");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance has started)/,"Η επανάσταση ξεκίνησε");
	tmp.innerHTML=tmp.innerHTML.replace(/(Industry)/,"Βιομηχανία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total companies value)/,"Συνολική αξία εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Company Type/,"Τύπος εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Total/,"Σύνολο");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9D%CE%BF%CF%83%CE%BF%CE%BA%CE%BF%CE%BC%CE%B5%CE%AF%CE%B1/g,"Hospital");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Neighbour region)/,"Γειτονική περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/g,"Πρωτεύουσα της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/g,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/g,"ΥΨΗΛΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/g,"ΜΕΤΡΙΟ");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Free building points/,"Ελέυθεροι πόντοι κτηρίων");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Neighbour region)/,"Γειτονική περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Πόροι");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/g,"Πρωτεύουσα της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/g,"Κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/g,"ΥΨΗΛΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/g,"ΜΕΤΡΙΟ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Industry)/,"Βιομηχανία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total companies value)/,"Συνολική αξία εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Company Type/,"Τύπος εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Total/,"Σύνολο");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9D%CE%BF%CF%83%CE%BF%CE%BA%CE%BF%CE%BC%CE%B5%CE%AF%CE%B1/g,"Hospital");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Industry)/,"Βιομηχανία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total companies value)/,"Συνολική αξία εταιριών");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Company Type/,"Τύπος εταιρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Total/,"Σύνολο");
	tmp.innerHTML=tmp.innerHTML.replace(/Value/,"Αξία");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/%CE%9D%CE%BF%CF%83%CE%BF%CE%BA%CE%BF%CE%BC%CE%B5%CE%AF%CE%B1/g,"Hospital");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρος");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/Free building points/,"Ελέυθεροι πόντοι κτηρίων");
	tmp.innerHTML=tmp.innerHTML.replace(/Building/,"Κτήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/No defensive buildings/,"Κανένα αμυντικό κτήριο");
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/Free building points/,"Ελέυθεροι πόντοι κτηρίων");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/Building/,"Κτήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/No defensive buildings/,"Κανένα αμυντικό κτήριο");	
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/Building/,"Κτήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/Round/,"Γύρος");
	tmp.innerHTML=tmp.innerHTML.replace(/No defensive buildings/,"Κανένα αμυντικό κτήριο");
	
	replaceLinkByHrefSSS("http://wiki.e-sim.org/index.php/Category:Buildings", {
		"Buildings":["Buildings","Κτήρια"]
	});
}


//===================================================
//Profile
//===================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Online/," Συνδεδεμένος");
	tmp.innerHTML=tmp.innerHTML.replace(/Offline/," Αποσυνδεμένος");
	tmp.innerHTML=tmp.innerHTML.replace(/Add to your friends list/,"Προσθήκη στη λίστα φίλων");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove citizen from your friends list/,"Διαγραφή από τη λίστα φίλων");
	tmp.innerHTML=tmp.innerHTML.replace(/Send an ingame message/,"Αποστολή μηνύματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate money/,"Δωρεά χρημάτων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate items/,"Δωρεά προϊόντων");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Premium account/,"Προνομοιούχος");
	//Links
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Επεξεργασία προοφίλ"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Αλλαγή ονόματος"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","Αρχείο συναλλαγών"]
	});
	replaceLinkByHrefSSS("#", {
		"Αναφορά multi":["Αναφορά multi","Αναφορά πολλαπλού λογαριασμού"]
	});
	//Buffs
	tmp.innerHTML=tmp.innerHTML.replace(/Buffs/,"Βοηθήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Debuffs/,"Μειονεκτήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/None/g,"Κανένα");
	tmp.innerHTML=tmp.innerHTML.replace(/Positive effects of/g,"Θετική επίπτωση από");
	tmp.innerHTML=tmp.innerHTML.replace(/Increases damage done by 20% for the next 24 hours/,"Αυξάνει τη ζημιά κατά 20% για τις επόμενες 24 ώρες");
	tmp.innerHTML=tmp.innerHTML.replace(/Increases damage done with Q5 weapon by 20% for the next 24 hours/,"Αυξάνει τη ζημιά με Q5 όπλα κατά 20% για τις επόμενες 24 ώρες");
	tmp.innerHTML=tmp.innerHTML.replace(/Negative effects of/g,"Αρνητική επίπτωση από");
	tmp.innerHTML=tmp.innerHTML.replace(/Your food limit won't be updated during the next day change/,"Το όριο φαγητού σας δεν θα ανανεωθεί στην επόμενη αλλαγή ημέρας");
	//Personal Stats
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Επίπεδο:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"Εμπειρία:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Ζημιά:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Bαθμός:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Οικονομικό επίπεδο:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Δύναμη:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Τοποθεσία:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Υπηκοότητα:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Γενέθλεια:");
	tmp.innerHTML=tmp.innerHTML.replace(/Day/,"Ημέρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Organization/,"Οργανισμός");
	//Ranks
	tmp.innerHTML=tmp.innerHTML.replace(/Ranks/,"Κατατάξεις");
	tmp.innerHTML=tmp.innerHTML.replace(/National by XP:/,"Εθνική κατά εμπειρία:");
	tmp.innerHTML=tmp.innerHTML.replace(/National by DMG:/,"Εθνική κατά ζημιά:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global by XP:/,"Παγκόσμια κατά εμπειρία:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global by DMG:/,"Παγκόσμια κατά ζημιά:");
	//Other info
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Στρατιωτική μονάδα:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Κόμμα:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Εφημερίδα:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Εργασία:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Πολιτική θέση:");
	tmp.innerHTML=tmp.innerHTML.replace(/President of/,"Πρόεδρος της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/Congress member of/,"Βουλευτής της(του)");
	tmp.innerHTML=tmp.innerHTML.replace(/See all companies/,"Δείτε όλες τις εταιρίες");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Καμία");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Κανένα");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Καμία");
	tmp.innerHTML=tmp.innerHTML.replace(/No workplace/,"Καμία");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Καμία");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Καμία");
	//Medals
	tmp.innerHTML=tmp.innerHTML.replace(/Awarded for winning congress elections/,"Απονέμεται όταν εκλέγεστε βουλευτής");
	tmp.innerHTML=tmp.innerHTML.replace(/Awarded for winning the presidential elections/,"Απονέμεται όταν εκλέγεστε πρόεδρος της χώρας");
	tmp.innerHTML=tmp.innerHTML.replace(/The Super soldier medal is awarded for every 30 training sessions/,"Απονέμεται κάθε 30 εκπαιδεύσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/Awarded for Inviting 10 citizens and aiding them to reach level 7/,"Απονέμεται όταν προσκαλέσετε 10 πολίτες και φτάσουν στο επίπεδο 7");
	tmp.innerHTML=tmp.innerHTML.replace(/Awarded for each 100 citizens, who subscribed your newspaper/,"Απονέμεται για κάθε 100 πολίτες που γίνοντε συνδρομητές στην εφημερίδα σας");
	tmp.innerHTML=tmp.innerHTML.replace(/Awarded for working 30 days in a row/,"Απονέμεται κάθε 30 ημέρες συνεχόμενεης εργασίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Awarded for dealing the highest damage in a battle round \(one medal for the top attacker and defender\)/,"Απονέμεται όταν κάνετε την υψηλότερη ζημιά σε ένα γύρο μάχης (ένα μετάλλιο για κάθε πλευρά)");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen has initiated a successful Resistance war which was won by the Resistance force/,"Απονέμεται όταν ξεκινήσετε έναν αντιστασιακό πόλεμο, ο οποίος κερδίθηκε από τους αντιστασιακούς");
	tmp.innerHTML=tmp.innerHTML.replace(/Awarded for reporting bugs, working on wiki and other contributions to e-sim/,"Απονέμεται όταν αναφέρετε bugs, για δουλειά στο wiki και άλλες συνεισφορές στο e-sim");
	//Friends
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Φίλοι ");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	//Achievements
	tmp.innerHTML=tmp.innerHTML.replace(/Top achievements/,"Κορυφαία επιτεύγματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved by/g,"Επιτεύχθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved/g,"Επιτεύχθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/players/g,"παίκτες");
	tmp.innerHTML = tmp.innerHTML.replace(/Total achievements/,"Συνολικά επιτεύγματα")
	tmp.innerHTML = tmp.innerHTML.replace(/ of /g," από ")
	tmp.innerHTML = tmp.innerHTML.replace(/See all achievements/,"Δείτε όλα τα επιτεύγματα")
	//Shouts
	tmp.innerHTML=tmp.innerHTML.replace(/Shouts/,"Ανακοινώσεις");
	//Timestamp
	doShoutsComm();
	//Inactive & banned
	tmp.innerHTML=tmp.innerHTML.replace(/This citizen has been inactive for (\d*) days/,"Αυτό ο πολίτης είναι ανενεργός για $1 μέρες");
	tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Μόνιμα τιμωρημένος");
	tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Λόγος:");
	tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Τιμωρημένος από:");
	//Equipment
	tmp.innerHTML=tmp.innerHTML.replace(/(Equipment Stats)/,"Στατιστικά Εξοπλισμού");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage increased bonus)/,"Προσαύξηση ζημιάς");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hit increased bonus)/,"Προσαύξηση χτυπήματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/g,"Ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Critical Hit)/,"Καίριο Χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Critical Hit chance)/,"Πιθανότητα K. X.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Miss chance)/,"Πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Chance to avoid DMG)/,"Πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base hit)/,"Βασικό χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your hit)/,"Τελικό χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base critical chance)/,"Βασική πιθανότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total critical chance)/,"Συνολική πιθανότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base miss chance)/,"Βασική πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Overall miss chance)/,"Συνολική πιθανότητα αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Base chance to avoid DMG)/,"Βασική πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Overall chance to avoid DMG)/,"Συνολική πιθανότητα άμυνας");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your damage is doubled when performing a critical hit)/,"Η ζημιά διπλασιάζεται όταν γίνεται καίριο χτύπημα");
	tmp.innerHTML=tmp.innerHTML.replace(/(You deal 0 damage when missing a hit)/,"Κάνετε 0 ζημιά σε περίπτωση αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(You lose weapon and health during a miss)/,"Χάνετε όπλα και ζωή σε περίπτωση αστοχίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(however you still gain experience points)/,"όμως εξακολουθείτε να κερδίζετε πόντους εμπειρίας");
	tmp.innerHTML=tmp.innerHTML.replace(/(You won't lose health during a fight if you trigger this event)/,"Δεν θα χάσετε υγεία στη μάχη εάν ενεργοποιηθεί αυτό το γεγονός");
	tmp.innerHTML=tmp.innerHTML.replace(/(No item)/g,"Κανένα αντικείμενο");
	tmp.innerHTML=tmp.innerHTML.replace(/Offhand/,"Βοήθημα");
	tmp.innerHTML=tmp.innerHTML.replace(/Helmet/,"Κράνος");
	tmp.innerHTML=tmp.innerHTML.replace(/Vision/,"Όραση");
	tmp.innerHTML=tmp.innerHTML.replace(/Personal Armor/,"Θωράκιση");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon upgrade/,"Οπλισμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Equipment id/g,"Κωδ. Αντικειμένου");
	//Assets & Debts
	tmp.innerHTML=tmp.innerHTML.replace(/Assets/,"Δάνεια");
	tmp.innerHTML=tmp.innerHTML.replace(/Assets are hidden by the citizen/,"Τα δάνεια είναι απόρρητα από τον πολίτη");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/payback time/g,"αποπληρωμή την");
	tmp.innerHTML=tmp.innerHTML.replace(/game day/g,"ημέρα παιχνιδιού");
	tmp.innerHTML=tmp.innerHTML.replace(/lent to/g,"δάνειο προς:");
	tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Ενεργά χρέη");
}


//===================================================
//Achievements
//===================================================
function doAchievements() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/'s/,"");
	tmp.innerHTML=tmp.innerHTML.replace(/Achievements/,"- Επιτεύγματα");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Achievements/,"Επιτεύγματα");
	tmp.innerHTML=tmp.innerHTML.replace(/ of /g," από ");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank/g,"Κατάταξη");
	tmp.innerHTML=tmp.innerHTML.replace(/Global/,"Παγκοσμίως");
	tmp.innerHTML=tmp.innerHTML.replace(/Recalculate achievements/,"Επανυπολογισμός επιτευγμάτων");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Top achievements/,"Κορυφαία επιτεύγματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved by/g,"Επιτεύχθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved/g,"Επιτεύχθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/players/g,"παίκτες");
	tmp.innerHTML=tmp.innerHTML.replace(/ of /g," από τους ");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Latest achievements/,"Τελευταία επιτεύγματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved by/g,"Επιτεύχθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved/g,"Επιτεύχθηκε");
	tmp.innerHTML=tmp.innerHTML.replace(/players/g,"παίκτες");
	tmp.innerHTML=tmp.innerHTML.replace(/ of /g," από τους ");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Achievements by category/,"Επιτεύγματα ανά κατηγορία");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved by/g,"Επιτεύχθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved:/g,"Επιτεύχθηκε:");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved/g,"Επιτεύχθηκαν");
	tmp.innerHTML=tmp.innerHTML.replace(/players/g,"παίκτες");
	tmp.innerHTML=tmp.innerHTML.replace(/ of /g," από ");
	tmp.innerHTML=tmp.innerHTML.replace(/Category/g,"Κατηγορία");
	tmp.innerHTML=tmp.innerHTML.replace(/Military/,"Στρατιωτικών");
	tmp.innerHTML=tmp.innerHTML.replace(/Medals/,"Μεταλλίων");
	tmp.innerHTML=tmp.innerHTML.replace(/Social/,"Κοινωνίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Show collected achievements/g,"Εμφάνισε τα ολοκληρομένα επιτεύγματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Show not collected achievements/g,"Εμφάνισε τα εκκρεμή επιτεύγματα");
	tmp = allElements.children[9].children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Society/,"Ανάπτυξης");
	tmp.innerHTML=tmp.innerHTML.replace(/builder/,"κοινότητας");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/Note/,"Σημείωση");
	tmp.innerHTML=tmp.innerHTML.replace(/Most achievements are calculated once a day/,"Τα περισσότερα επιτεύγματα υπολογίζονται μια φορά την ημέερα");
}


//===================================================
//Achievement Details
//===================================================
function doAchievement() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Achievement/,"Επίτευγμα:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Category/,"Κατηγορία");
	tmp.innerHTML=tmp.innerHTML.replace(/Military/,"Στρατιωτικών");
	tmp.innerHTML=tmp.innerHTML.replace(/Medals/,"Μεταλλίων");
	tmp.innerHTML=tmp.innerHTML.replace(/Social/,"Κοινωνίας");
	tmp.innerHTML=tmp.innerHTML.replace(/Society/,"Ανάπτυξης");
	tmp.innerHTML=tmp.innerHTML.replace(/builder/,"κοινότητας");
	tmp.innerHTML=tmp.innerHTML.replace(/Show data in country/,"Εμφάνισε δεδομένα χώρας");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/Achieved by/g,"Επιτεύχθηκε από");
	tmp.innerHTML=tmp.innerHTML.replace(/Global/,"Παγκοσμίως");
	tmp.innerHTML=tmp.innerHTML.replace(/ of /g," από τους ");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/First citizens who achieved/,"Οι πρώτοι πολίτες που το πέτυχαν");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Recent citizens who achieved/,"Πρόσφατοι πολίτες που το πέτυχαν");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Donate Money (Player)
//===================================================
function doDonateMoney() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Δωρεά χρημάτων");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate to)/,"Δωρεά προς");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your money accounts)/,"Οι χρηματικοί λογαριασμοί μου");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/,"Χρυσός");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate)/,"Επιλέξτε συνάλλαγμα για δωρεά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item)/,"Δωρεά συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sum)/,"Ποσό");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason)/,"Αιτιολογία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate)/,"Δωρεά");
	
	allElements = document.getElementById('currencyId');
		replaceOptionTxt(allElements, {
			"Gold":["Gold","Χρυσός"],
			"Select money":["Select money","Επιλέξτε συνάλλαγμα"]
		})
}


//===================================================
//Donate Product (Player)
//===================================================
function doDonateProduct() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate products)/,"Δωρεά προϊόντων");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate to)/,"Δωρεά προς");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your storage)/,"Η αποθήκη μου");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate)/,"Επιλέξτε προϊόν για δωρεά");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate item)/,"Δωρεά προϊόντος");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quantity)/,"Ποσότητα");
	tmp.innerHTML=tmp.innerHTML.replace(/(Reason)/,"Αιτιολογία");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate)/,"Δωρεά");
	
	allElements = document.getElementById('product');
		replaceOptionTxt(allElements, {
			"available":["available","διαθέσιμα"]
		})
}


//===================================================
//Edit Citizen
//===================================================
function doEditCitizen() {
	allElements = document.getElementById('contentRow');
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Πολίτης:");
	
	allElements = document.getElementById('editCitizenForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"Email:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Show your money you lent to others in profile view/,"Εμφάνισε τα χρήματα, που δανείζω σε άλλους, στο προφίλ μου");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Νέος κωδικός:");
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Επανάληψη νέου κωδικού:");
	tmp = allElements.children[17];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Παλιός κωδικός:");
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Νέα εικόνα:");
	tmp = allElements.childNodes[38];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","μέγιστο μέγεθος:");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19];
	replaceInputByValue({"Edit citizen":["Edit citizen","Επεξεργασία πολίτη"]});
	
	allElements = document.getElementById('userImage');
	tmp.innerHTML=tmp.innerHTML.replace(/normal%20/,"normal");
}


//===================================================
//Change Name
//===================================================
function doChangeName() {
	allElements = document.getElementById('contentRow');
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Change name/,"Αλλαγή ονόματος");
	tmp.innerHTML=tmp.innerHTML.replace(/To discourage players from changing their nicks, this service is/,"Για να αποθαρρύνουμε τους παίκτες από το να αλλάζουν το όνομά τους, αυτή η υπηρεσία");
	tmp.innerHTML=tmp.innerHTML.replace(/not/,"δεν");
	tmp.innerHTML=tmp.innerHTML.replace(/free /,"είναι δωρεάν");
	tmp.innerHTML=tmp.innerHTML.replace(/Service/,"Υπηρεσία");
	tmp.innerHTML=tmp.innerHTML.replace(/Price/,"Τιμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Single name change/,"Μία αλλαγή ονόματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Remaining changes/,"Εναπομείνασες αλλαγές");
	tmp.innerHTML=tmp.innerHTML.replace(/Change name into/,"Αλλαγή ονόματος σε");
	tmp.innerHTML=tmp.innerHTML.replace(/Retype your current password/,"Εισάγετε τον κωδικό σας");
	tmp.innerHTML=tmp.innerHTML.replace(/Change name/,"Αλλαγή ονόματος");
	tmp.innerHTML=tmp.innerHTML.replace(/After successful name change, please use it as your new login/,"Μετά την επιτυχημένη αλλαγή ονόματος, παρακαλούμε χρησιμοποιήστε το ως το νέο σας όνομα χρήστη");
}


//===================================================
//Transaction Log
//===================================================
function doTransactionsLog() {
	allElements = document.getElementById('contentRow');
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Transactions log/,"Αρχείο συναλλαγών");
	tmp.innerHTML=tmp.innerHTML.replace(/Log type/,"Τύπος αρχείου");
	tmp.innerHTML=tmp.innerHTML.replace(/Period start/,"Αρχή περιόδου");
	tmp.innerHTML=tmp.innerHTML.replace(/Period end/,"Τέλος περιόδου");
	tmp.innerHTML=tmp.innerHTML.replace(/View logs/,"Εμφάνισε αρχείο");
	tmp.innerHTML=tmp.innerHTML.replace(/Company transaction/,"Εταιρικές συναλλαγές");
	tmp.innerHTML=tmp.innerHTML.replace(/Donation/,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary market transaction/,"Συναλλαγές συναλλάγματος");
	tmp.innerHTML=tmp.innerHTML.replace(/Market transaction/,"Συναλλαγές αγοράς");
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Συμβόλαια");
	tmp.innerHTML=tmp.innerHTML.replace(/Debt payment/,"Πληρωμές χρεών");
	tmp.innerHTML=tmp.innerHTML.replace(/Game day/g,"Ημέρα παιχνιδιού");
	tmp.innerHTML=tmp.innerHTML.replace(/Buyer\/Donor/,"Αγοραστής/Δωρητής");
	tmp.innerHTML=tmp.innerHTML.replace(/Time/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/Action/,"Ενέργεια");
	tmp.innerHTML=tmp.innerHTML.replace(/Seller\/Receiver/,"Πωλητής/Λήπτης");
	tmp.innerHTML=tmp.innerHTML.replace(/No Logs/,"Κανένα αρχείο");
	tmp.innerHTML=tmp.innerHTML.replace(/none/g,"κανένας");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/has transfered company/,"μετέφερε την εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/to the military unit/,"στην στρατιωτική μονάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/has bought company/,"αγόρασε την εταιρία");
	tmp.innerHTML=tmp.innerHTML.replace(/has paid debt of/g,"πλήρωσε χρέος");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Χρυσό");
	tmp.innerHTML=tmp.innerHTML.replace(/obligations/g,"υποχρεώσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate/g,"Δωρεά");
	tmp.innerHTML=tmp.innerHTML.replace(/Pay/g,"Πληρωμή");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Φαγητό");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Δώρα");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Όπλα");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Εισιτήρια");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Σπίτια");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Νοσοκομεία");
	tmp.innerHTML=tmp.innerHTML.replace(/Defensive system/g,"Αμυντικά συστήματα");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Σιτάρι");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Σίδηρο");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Διαμάντια");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Πετρέλαιο");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Ξύλο");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Πέτρα");
	tmp.innerHTML=tmp.innerHTML.replace(/from/g,"από");
	tmp.innerHTML=tmp.innerHTML.replace(/has bought/g,"αγόρασε");
	tmp.innerHTML=tmp.innerHTML.replace(/citizen/g,"πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/to/g,"στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/at ratio/g,"με ισοτιμία");
	tmp.innerHTML=tmp.innerHTML.replace(/has sent/g,"έστειλε");
	tmp = allElements.children[1].children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/for/g,"για");
}


//===================================================
//Travel
//===================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Μετακίνηση");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/You have no selected ticket in stock/,"Δεν έχετε το επιλεγμένο εισιτήριο στο απόθεμά σας");
	tmp.innerHTML=tmp.innerHTML.replace(/You have moved to/,"Μετακινηθήκατε στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/You selected wrong region/,"Επιλέξατε λάθος περιοχή");
	tmp.innerHTML=tmp.innerHTML.replace(/You have no health to travel/,"Δεν έχετε υγεία για να ταξιδέψετε");
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Χώρα");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region/,"Περιοχή");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality/,"Ποιότητα εισιτηρίου");
	
	replaceInputByValue({"Travel":["Travel","Μετακίνηση"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Traveling":["Traveling tutorial on wiki","Οδηγός μετακίνησης στο wiki"]
	});
	
	allElements = document.getElementById('ticketQuality');
		replaceOptionTxt(allElements, {
			"wellness to restore":["wellness to restore","υγεία θα καταναλωθεί"],
		})	
}


//===================================================
// Messages
//===================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Εισερχόμενα");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Εξερχόμενα");
	
	allElements = document.getElementById('inboxTable').children[0];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/ To /," Προς ");
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Αποστολέας");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Μήνυμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Διαγραφή");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New/g,"Νέο");
	tmp.innerHTML=tmp.innerHTML.replace(/ To /,"Προς");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Εξερχόμενα"],
		"composeMessage.html":["Compose message","Σύνθεση μηνύματος"]
	});
	replaceInputByValue({
		"Delete":["Delete","Διαγραφή"],
		"Quick reply":["Quick reply","Γρήγορη απάντηση"],
		"Report":["Report","Αναφορά"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Αναφορά"],
		"Quick reply":["Quick reply","Γρήγορη απάντηση"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Απάντηση"],
		"conversation.html":["Previous messages","Προηγούμενα μηνύματα"]
	});
	
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}

function doConversation() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Inbox messages/,"Εισερχόμενα");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Εξερχόμενα");
	tmp.innerHTML=tmp.innerHTML.replace(/Compose Message/,"Σύνθεση μηνύματος");
	
	allElements = document.getElementById('inboxTable').children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Αποστολέας");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Μήνυμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/Reply/g,"Απάντηση");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
}


//===================================================
//Sent Messages
//===================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Εισερχόμενα"],
		"composeMessage.html":["Compose Message","Σύνθεση μηνύματος"]
	});
	
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Notifications
//===================================================
function doNotifications() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Notifications/,"Ειδοποιήσεις");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Filter alerts/,"Φίλτρο");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/Delete All/,"Διαγραφή όλων");
	tmp.innerHTML=tmp.innerHTML.replace(/Donation reason/g,"Λόγος δωρεάς");
	tmp.innerHTML=tmp.innerHTML.replace(/All alerts/,"Όλες οι ειδοποιήσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary market alert/g,"Συνάλλαγμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Company alert/g,"Εταιρίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Subsidy alert/g,"Επιδοτήσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen progress alert/g,"Πρόοδος πολίτη");
	tmp.innerHTML=tmp.innerHTML.replace(/Medal alert/g,"Μετάλια");
	tmp.innerHTML=tmp.innerHTML.replace(/Election alert/g,"Εκλογές");
	tmp.innerHTML=tmp.innerHTML.replace(/Congress alert/g,"Βουλή");
	tmp.innerHTML=tmp.innerHTML.replace(/Other alert/g,"Άλλες ειδοποιήσεις");
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/g,"Συμβόλαια");
	tmp.innerHTML=tmp.innerHTML.replace(/Moderators/g,"Διαχειρηστές");
	tmp.innerHTML=tmp.innerHTML.replace(/Military Unit/g,"Στρατιωτική μονάδα");
	tmp.innerHTML=tmp.innerHTML.replace(/Premium Account/g,"Προνομιούχος λογαριασμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Stock Market/g,"Χρηματιστήριο");
	tmp.innerHTML=tmp.innerHTML.replace(/Equipment/g,"Εξοπλισμός");
	tmp.innerHTML=tmp.innerHTML.replace(/Auctions/g,"Δημοπρασίες");
	tmp.innerHTML=tmp.innerHTML.replace(/Tutorial/g,"Οδηγός");
	tmp.innerHTML=tmp.innerHTML.replace(/Donation/g,"Δωρεές");
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"Τύπος");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Μήνυμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Ημερομηνία");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Αφαίρεση");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/g,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/g,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/g,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/g,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/g,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/g,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/g,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/g,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/g,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/g,"μήνα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/New/g,"Νέο");
	tmp.innerHTML=tmp.innerHTML.replace(/No messages/,"Καμία ειδοποίηση");
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Compose Message
//===================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Νέο μήνυμα");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Only one message per 10 seconds is allowed/,"Μόνο ένα μήνυμα ανά 10 δευτερόλεπτα επιτρέπεται");
	tmp.innerHTML=tmp.innerHTML.replace(/Message or title cannot be empty/,"Το μήνυμα ή το θέμα δεν μπορούν να είναι κενά");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Εισερχόμενα"],
		"sentMessages.html":["Sent messages","Εξερχόμενα"]
	});

	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Παραλήπτης:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Θέμα:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Μήνυμα:");
	
	replaceInputByValue({
		"Send":["Send","Αποστολή"],
		"Preview":["Preview","Προεπισκόπιση"]
	});
}


//===================================================
//Subscriptions
//===================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Συνδρομές");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Συνδρομές");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Κατάλογος συνδρομών σε εφημερίδες"]
	});
	
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Subscribed Newspapers
//===================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Συνδρομές σε εφημερίδες");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Συνολικές συνδρομές");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Εφημερίδα");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Ημερομηνία");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Οδηγός εφημερίδας στο wiki"]
	});
	
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Προηγούμενη");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Επόμενη");
}


//===================================================
//Search
//===================================================
function doSearch() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Search citizen/,"Αναζήτηση πολίτη");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Search/,"Αναζήτηση");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Πολίτης");
	tmp.innerHTML=tmp.innerHTML.replace(/Level/,"Επίπεδο");
	tmp.innerHTML=tmp.innerHTML.replace(/XP/,"Εμπειρία");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage done/,"Συνολική ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/No citizens found/,"Δεν βρέθηκαν πολίτες");
}


//===================================================
//Search e-sim
//===================================================
function doSearchGoogle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Search e-sim/,"Αναζήτηση στο e-sim");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Search for/,"Αναζήτηση για");
	//tmp.innerHTML=tmp.innerHTML.replace(/Search/g,"Αναζήτηση");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Search results/,"Αποτελέσματα αναζήτησης");
	
	replaceInputByValue({
		"Search":["Search","Αναζήτηση"]
	});
}


//===================================================
//Civil War
//===================================================
function doCivil() {
	allElements = document.getElementById('contentRow').children[2];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war/,"Εμφύλιος πόλεμος");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Select civil war/,"Επιλέξτε εμφύλιο πόλεμο");
	tmp.innerHTML=tmp.innerHTML.replace(/Show/,"Εμφάνισε");
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war in/g,"Εμφύλιος πόλεμος στην(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/Won by loyalists/g,"Κέρδισαν οι κυβερνητικοί");
	tmp.innerHTML=tmp.innerHTML.replace(/Won by rebellion/g,"Κέρδισαν οι επαναστάτες");
	tmp.innerHTML=tmp.innerHTML.replace(/Pool in progress/g,"Αναταραχή σε εξέλιξη");
	tmp.innerHTML=tmp.innerHTML.replace(/Pool failed - not enough supporters/g,"H αναταραχή απέτυχε - ανεπαρκής υποστήριξη");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle in progress/g,"Μάχη σε εξέλιξη");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war info/,"Πληροφορίες εμφύλιου πολέμου");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Status/,"Κατάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war leader/,"Αρχηγός εμφύλιου πολέμου");
	tmp.innerHTML=tmp.innerHTML.replace(/The rebellion is gathering supporters/,"Η επανάσταση συγκεντρώννει υποστηρικτές");
	tmp.innerHTML=tmp.innerHTML.replace(/Loyalists forces have defeated rebels in the battle/,"Οι κυβερνητικές δυνάμεις νίκησαν τους επαναστάτες στη μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebellion have been suppressed by the government/,"Η επανάσταση καταστάλθηκε από την κυβέρνηση");
	tmp.innerHTML=tmp.innerHTML.replace(/An open war will start if at least 33.3% participants support the rebellion/,"Ένας ανοκτός πόλεμος θα ξεκινήσει εάν τουλάχιστον 33.3% των συμμετεχώντων υποστηρίξουν την επανάσταση");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebels have failed to gather enough supporters and were suppressed by the government/,"Οι επαναστάτες απέτυχαν να συγκεντρώσουν αρκετούς υποστηρικτές και καταστάλθηκαν από την κυβέρνηση");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebel forces need a support of 33.33% participants to successfully start a civil war/,"Οι επαναστατικές δυνάμεις χρειαζονται την υποστήριξη του 33.33% των συμμετεχόντων για να ξεκινήσουν επιτυχώς έναν εμφύλιο πόλεμο");
	tmp.innerHTML=tmp.innerHTML.replace(/Remaining time to give support/,"Υπολοιπόμενος χρόνος για να δώσετε την υποστήριξή σας");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebel forces have won the civil war/,"Οι επαναστατικές δυνάμεις κέρδισαν τον εμφύλιο πόλεμο");
	tmp.innerHTML=tmp.innerHTML.replace(/has overthrown/,"ανέτρεψε την(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/from president seat/,"από τον προεδρικό θώκο");
	tmp.innerHTML=tmp.innerHTML.replace(/The rebellion has gained control of/,"Η επανάσταση κέρδισε τον έλεγχο");
	tmp.innerHTML=tmp.innerHTML.replace(/seats in congress/,"εδρών στη Βουλή");
	tmp.innerHTML=tmp.innerHTML.replace(/Congress seats won by rebels/,"Βουλευτικές έδρες που κερδίθηκαν από επαναστάτες");
	tmp.innerHTML=tmp.innerHTML.replace(/Congress seats lost by loyalists/,"Βουλευτικές έδρες που χάθηκαν από κυβερνητικούς");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebels are attacking the government forces/,"Οι επαναστάτες επιτίθονται στις κυβερνητικές δυνάμεις");
	tmp.innerHTML=tmp.innerHTML.replace(/Click/,"Πατήστε");
	tmp.innerHTML=tmp.innerHTML.replace(/here/,"εδώ");
	tmp.innerHTML=tmp.innerHTML.replace(/to join the struggle/,"για να συμμετάσχετε στον αγώνα");
	tmp.innerHTML=tmp.innerHTML.replace(/Select your side/,"Διαλέξτε την πλευρά σας");
	tmp.innerHTML=tmp.innerHTML.replace(/Rebels/,"Επαναστάτες");
	tmp.innerHTML=tmp.innerHTML.replace(/Loyalists/,"Κυβερνητικοί");
	tmp.innerHTML=tmp.innerHTML.replace(/Side supported by your citizen/,"Η πλευρά που υποστηρίζετε");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/Supporters/,"Υποστηρικτές");
	tmp.innerHTML=tmp.innerHTML.replace(/Total rebels/,"Συνολικοί επαναστάτες");
	tmp.innerHTML=tmp.innerHTML.replace(/Total loyalists/,"Συνολικοί κυβεερνητικοί");
	tmp.innerHTML=tmp.innerHTML.replace(/Notable rebels/,"Σημαίνοντες επαναστάτες");
	tmp.innerHTML=tmp.innerHTML.replace(/Notable loyalists/,"Σημαίνοντες κυβερνητικοί");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Battle start/,"Έναρξη μάχης");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle/g,"Μάχη");
	tmp.innerHTML=tmp.innerHTML.replace(/Score/,"Αποτέλεσμα");
	tmp.innerHTML=tmp.innerHTML.replace(/Total damage done/,"Συνολική ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/no allies/g,"χωρίς συμμάχους");
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war/,"Εμφύλιος πόλεμος");
	tmp.innerHTML=tmp.innerHTML.replace(/Subsidies/,"Επιδότηση");
	tmp.innerHTML=tmp.innerHTML.replace(/none/,"καμία");
	tmp.innerHTML=tmp.innerHTML.replace(/none/,"καμία");
	tmp.innerHTML=tmp.innerHTML.replace(/battle won by/,"κερδίθηκε από την(-ο)");
	tmp.innerHTML=tmp.innerHTML.replace(/No\./g,"Α/Α");
	tmp.innerHTML=tmp.innerHTML.replace(/Top rebel soldiers/,"Κορυφαίοι επαναστάτες");
	tmp.innerHTML=tmp.innerHTML.replace(/Top loyalists soldiers/,"Κορυφαίοι κυβερνητικοί");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage/g,"Ζημιά");
	tmp.innerHTML=tmp.innerHTML.replace(/seconds ago/,"δευτερόλεπτα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minutes ago/,"λεπτά πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hours ago/,"ώρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/days ago/,"μέρες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/months ago/,"μήνες πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/second ago/,"δευτερόλεπτο πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/minute ago/,"λεπτό πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/hour ago/,"ώρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/day ago/,"μέρα πριν");
	tmp.innerHTML=tmp.innerHTML.replace(/month ago/,"μήνα πριν");
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war module was developed thanks to/,"Το σκέλος του εμφύλιου πολέμου αναπτύχθηκε χάρη στον");
	tmp.innerHTML=tmp.innerHTML.replace(/and/,"και σε");
	tmp.innerHTML=tmp.innerHTML.replace(/other donors/,"ακόμα δωρητές");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/Civil war module was developed thanks to/,"Το σκέλος του εμφύλιου πολέμου αναπτύχθηκε χάρη στον");
	tmp.innerHTML=tmp.innerHTML.replace(/and/,"και σε");
	tmp.innerHTML=tmp.innerHTML.replace(/other donors/,"ακόμα δωρητές");

}


//===================================================
//Timebasic timestamp
//===================================================
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l];
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/," 1 δευτερόλεπτο πριν");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"1 λεπτό πριν");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"1 ώρα πριν");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"1 μέρα πριν");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"1 μήνα πριν");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"πριν $1 δευτερόλεπτα");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"πριν $1 λεπτά");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"πριν $1 ώρες");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"πριν $1 μέρες");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"πριν $1 μήνες");
            } 
        }
    }
}
  
   
//===================================================
//Main
//===================================================
function isTargetHtml(targetHtml) {
	if (window.location.pathname.substring(0,targetHtml.length)==targetHtml) {
		return true;
	} else {
		return false;
	}
}

doMenu();
doSide();

if (window.location.pathname=="/" || isTargetHtml("/index.html")) {
	doHP();
} else if (isTargetHtml("/jobMarket.html")) {
	doJobMarket();
} else if (isTargetHtml("/work.html")) {
	doWork();
} else if (isTargetHtml("/productMarket.html")) {
	doProductMarkets();
} else if (isTargetHtml("/train.html")) {
	doTrain();
} else if (isTargetHtml("/equipment.html")) {
	doEquipment();
} else if (isTargetHtml("/battles.html")) {
	doBattlesList();
} else if (isTargetHtml("/battle.html")) {
	doBattle();
} else if (isTargetHtml("/battleStatistics.html")) {
	doBattleStatistics();
} else if (isTargetHtml("/profile.html")) {
	doProfile();
} else if (isTargetHtml("/citizenAchievements.html")) {
	doAchievements();
} else if (isTargetHtml("/achievement.html")) {
	doAchievement();
} else if (isTargetHtml("/donateMoney.html")) {
	doDonateMoney();
} else if (isTargetHtml("/donateProducts.html")) {
	doDonateProduct();
} else if (isTargetHtml("/editCitizen.html")) {
	doEditCitizen();
} else if (isTargetHtml("/changeName.html")) {
	doChangeName();
} else if (isTargetHtml("/transactionLog.html")) {
	doTransactionsLog();
} else if (isTargetHtml("/travel.html")) {
	doTravel();
} else if (isTargetHtml("/inboxMessages.html")) {
	doInboxMessages();
} else if (isTargetHtml("/conversation.html")) {
	doConversation();
} else if (isTargetHtml("/sentMessages.html")) {
	doSentMessages();
} else if (isTargetHtml("/composeMessage.html")) {
	doComposeMessage();
} else if (isTargetHtml("/subscription.html")) {
	doPremium();
} else if (isTargetHtml("/notifications.html")) {
	doNotifications();
} else if (isTargetHtml("/subs.html")) {
	doSubs();
} else if (isTargetHtml("/subscribedNewspapers.html")) {
	doSubscribedNewspapers();
} else if (isTargetHtml("/newspaper.html")) {
	doNewspaper();
} else if (isTargetHtml("/subList.html")) {
	doSubsList();
} else if (isTargetHtml("/editNewspaper.html")) {
	doNewspaperEdit();
} else if (isTargetHtml("/article.html")) {
	doArticle();
} else if (isTargetHtml("/voteList.html")) {
	doVotesList();
} else if (isTargetHtml("/editArticle.html")) {
	doArticleEdit();
} else if (isTargetHtml("/myParty.html")) {
	doMyParty();
} else if (isTargetHtml("/editParty.html")) {
	doEditParty();
} else if (isTargetHtml("/broadcastToPartyMember.html")) {
	doPartyBroadcast();
} else if (isTargetHtml("/party.html")) {
	doMyParty();	
} else if (isTargetHtml("/contracts.html")) {
	doContractsList();
} else if (isTargetHtml("/contract.html")) {
	doContract();
} else if (isTargetHtml("/stockCompany.html")) {
	doStockCompany();
} else if (isTargetHtml("/stockCompanyActs.html")) {
	doStockCompanyActs();
} else if (isTargetHtml("/stockCompanyAct.html")) {
	doStockCompanyLaws();
} else if (isTargetHtml("/stockCompanyShouts.html")) {
	doStockCompanyShouts();
} else if (isTargetHtml("/stockCompanyTransactions.html")) {
	doStockCompanyTransactions();
} else if (isTargetHtml("/stockCompanyMoney.html")) {
	doStockCompanyMoney();
} else if (isTargetHtml("/stockCompanyProducts.html")) {
	doStockCompanyStorage();
} else if (isTargetHtml("/stockCompanyDonateMoney.html")) {
	doStockCompanyDonateM();
} else if (isTargetHtml("/stockCompanyDonateCompany.html")) {
	doStockCompanyDonateC();
} else if (isTargetHtml("/stockCompanyLogs.html")) {
	doStockCompanyLog();
} else if (isTargetHtml("/shareholderPanel.html")) {
	doStockCompanyHolderPanel();
} else if (isTargetHtml("/myShares.html")) {
	doShares();
} else if (isTargetHtml("/stockCompanyAssets.html")) {
	doStockCompanyAssets();
} else if (isTargetHtml("/myAuctions.html")) {
	domyAuctions();
} else if (isTargetHtml("/inviteFriends.html")) {
	doInviteFriends();
} else if (isTargetHtml("/referrerClicks.html")) {
	doRefClicks();
} else if (isTargetHtml("/myMilitaryUnit.html")) {
	doMilitaryUnit();
} else if (isTargetHtml("/militaryUnit.html")) {
	doMilitaryUnit();
} else if (isTargetHtml("/editMilitaryUnit.html")) {
	doMUEdit();
} else if (isTargetHtml("/changeMUNationality.html")) {
	doMUNationality();
} else if (isTargetHtml("/militaryUnitPrivilages.html")) {
	doMUPriv();
} else if (isTargetHtml("/militaryUnitStorage.html")) {
	doMUStorage();
} else if (isTargetHtml("/militaryUnitMoneyAccount.html")) {
	doMUMoney();
} else if (isTargetHtml("/militaryUnitDonations.html")) {
	doMUDonations();
} else if (isTargetHtml("/militaryUnitJobs.html")) {
	doMUJobs();
} else if (isTargetHtml("/militaryUnitRecrutation.html")) {
	doMURecruit();
} else if (isTargetHtml("/militaryUnitLogs.html")) {
	doMULogs();
} else if (isTargetHtml("/militaryUnitMembers.html")) {
	doMUMembers();
} else if (isTargetHtml("/militaryUnitCompanies.html")) {
	doMUCompanies();
} else if (isTargetHtml("/donateMoneyToMilitaryUnit.html")) {
	doDonateMoneyMU();
} else if (isTargetHtml("/donateProductsToMilitaryUnit.html")) {
	doDonateProductMU();
} else if (isTargetHtml("/donateCompanyToMilitaryUnit.html")) {
	doDonateCompanyMU();
} else if (isTargetHtml("/broadcastToMilitaryUnit.html")) {
	doMUBroadcast();
} else if (isTargetHtml("/citizenMarketOffers.html")) {
	doCitizenMarketOffers();
} else if (isTargetHtml("/monetaryMarket.html")) {
	doMonetaryMarket();
} else if (isTargetHtml("/moneyTransactions.html")) {
	doMMTransactions();
} else if (isTargetHtml("/auctions.html")) {
	doAuctions();
} else if (isTargetHtml("/auction.html")) {
	doAuction();
} else if (isTargetHtml("/stockMarket.html")) {
	doStockMarket();
}else if (isTargetHtml("/companiesForSale.html")) {
	doCompMarket();
} else if (isTargetHtml("/specialItems.html")) {
	doSpecial();
}else if (isTargetHtml("/countryStatistics.html")) {
	doCountryStat();
}else if (isTargetHtml("/partyStatistics.html")) {
	doPartyStat();
}else if (isTargetHtml("/newspaperStatistics.html")) {
	doNewsStat();
}else if (isTargetHtml("/citizenStatistics.html")) {
	doCitiStat();
}else if (isTargetHtml("/stockCompanyStatistics.html")) {
	doStockStats();
}else if (isTargetHtml("/militaryUnitStatistics.html")) {
	doMuStat();
}else if (isTargetHtml("/donations.html")) {
	doDonations();
}else if (isTargetHtml("/news.html")) {
	doNews();
}else if (isTargetHtml("/countryEconomyStatistics.html")) {
	doCountryEco();
}else if (isTargetHtml("/citizensOnline.html")) {
	doOnlineCitizens();
}else if (isTargetHtml("/newCitizens.html")) {
	doNewCitizens();
}else if (isTargetHtml("/countryLaws.html")) {
	doCountryLaws();
}else if (isTargetHtml("/law.html")) {
	doLaws();
}else if (isTargetHtml("/referendum.html")) {
	doReferendum();
}else if (isTargetHtml("/partyElections.html")) {
	doPartyElec();
}else if (isTargetHtml("/congressElections.html")) {
	doCongressElec();
}else if (isTargetHtml("/presidentalElections.html")) {
	doPresiElec();
}else if (isTargetHtml("/pendingCitizenshipApplications.html")) {
	doCSappli();
}else if (isTargetHtml("/acceptedCitizenshipApplications.html")) {
	doCSaccepted();
}else if (isTargetHtml("/googleMap.html")) {
	doWorldmap();
}else if (isTargetHtml("/region.html")) {
	doRegion();
}else if (isTargetHtml("/map.html")) {
	doMap();
}else if (isTargetHtml("/companies.html")) {
	doCompany();
}else if (isTargetHtml("/editCompany.html")) {
	doCompanyEdit();
}else if (isTargetHtml("/company.html")) {
	doCompanyDetails();
}else if (isTargetHtml("/companyWorkResults.html")) {
	doCompanyResults();
}else if (isTargetHtml("/companySummary.html")) {
	doCompanySummary();
}else if (isTargetHtml("/countryPoliticalStatistics.html")) {
	doPoliticalStats();
}else if (isTargetHtml("/battlesByWar.html")) {
	doWarBattles();
}else if (isTargetHtml("/militaryUnitsStats.html")) {
	doBattleMUStatistics();
}else if (isTargetHtml("/civilWar.html")) {
	doCivil();
}else if (isTargetHtml("/shouts.html")) {
	doShouts();
}else if (isTargetHtml("/search.html")) {
	doSearch();
}else if (isTargetHtml("/googleSearch.html")) {
	doSearchGoogle();
}