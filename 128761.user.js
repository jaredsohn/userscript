// ==UserScript==
// @name           e-sim HU
// @namespace      e-sim HU
// @include        http://e-sim.org*
// ==/UserScript==
//Hungarian translation by Campari

menuLinkReplacements = {
	"work.html"				:["Work","Munka"],
	"train.html"			:["Train","Edzés"],
	"companies.html"		:["Companies","Cégek"],
	"newspaper.html"		:["Newspaper","Újság"],
	"myParty.html"			:["Party","Párt"],
	"contracts.html"		:["Contracts","Szerződések"],
	"inviteFriends.html"	:["Invite friends","Barát meghívása"],
	"myMilitaryUnit.html"	:["Military unit","Katonai Egység"],
	"subscription.html"     :["Premium account","Prémium felhasználó"],
	
	"productMarket.html"	:["Product market","Piac"],
	"jobMarket.html"		:["Job market","Állás Börze"],
	"monetaryMarket.html"	:["Monetary market","Pénz piac"],
	"companiesForSale.html"	:["Companies for sale","Eladó cégek"],
	
	"countryStatistics.html"		:["Country statistics","Ország statisztika"],
	"partyStatistics.html"			:["Party statistics","Párt statisztika"],
	"newspaperStatistics.html"		:["Newspaper statistics","Újság statisztika"],
	"citizenStatistics.html"		:["Citizen statistics","Lakossági statisztika"],
	"militaryUnitStatistics.html"	:["Military unit stats","Katonai statisztika"],
	"donations.html"                :["Donations","Adományok"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Legjobb cikkek"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Legútóbbi cikkek"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Katonai események"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Politikai események"],
	
	"battles.html"							:["Battles","Csaták"],
	"countryPoliticalStatistics.html"		:["War and politics","Háború és politika"],
	"countryEconomyStatistics.html"			:["Economy","Gazdaság"],
	"countryLaws.html"						:["Laws","Törvények"],
	"partyElections.html"					:["Party elections","Párti választás"],
	"congressElections.html"				:["Congress elections","Kongresszusi választás"],
	"presidentalElections.html"				:["Presidential elections","Elnök választás"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Állampolgárság"],
	"googleMap.html"						:["Map","Térkép"],
};


menuTextReplacements = {
	"myPlacesButton":["My places","Saját"],
	"marketButton":["Market","Piac"],
	"statisticsButton":["Statistics","Statisztika"],
	"newsButton":["News","Hírek"],
	"electionsButton":["Country","Ország"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","Kilépés"],
	"workIcon"	:["Work","Munka"],
	"fightIcon"	:["Fight","Harc"],
	"avatarIcon":["Upload avatar","Avatar feltöltés"],
	"voteIcon"	:["Vote","Szavazás"],
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Utazás"],
	"pendingCitizenshipApplications.html"	:["change","váltás"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Egészség bemutatás"],
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Evés"],
	"useGiftLink":["Use gifts","Ajándék felhasz."]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Evés"],
	"useGiftButton":["Use gift","Ajándék felhasz."] 
};


hpTitleReplacements = {
	"News":["News","Hírek"],
	"Shouts":["Shouts","Shouts"],
	"Battles":["Battles","Csaták"],
	"Events":["Events","Események"]
};


hpTabsReplacements = {
	"#topArticles":["Global","Globális"],
	"#latestArticles":["Latest","Legkés."],
	"#localArticles":["Local","Helyi"],
	
	"#countryShouts":["Country","Ország"],
	"#friendsShouts":["Military unit","Katonai egy."],
	"#myShouts":["Friends","Barátok"],
	
	"#localBattles":["Country","Ország"],
	"#substidedBattles":["Subsidized","Subok"],
	"#hotBattles":["Important","Fontos"],

	"#localEvents":["Military","Katonai"],
	"#globalEvents":["Military","Katonai"],
	"#politicalEvents":["Political","Politikai"]
};

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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Pénz piac bemutatása"],
};




//---------------------------------------------------
//FireFox
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;


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

function replaceAlliesLinkComm(k) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='" + k + "']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 szöv.");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"Nincs szöv.");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Felkelés");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Támogatók:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"nincs szöv.");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 szöv.");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 szöv.");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Felkelés");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Támogatók:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"1 másodperce");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"1 perce");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"1 órája");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"1 napja");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"1 hónapja");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 másodperce");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 perce");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 órája");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 napja");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 hónapja");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"1 mádosperce");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"1 perce");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"1 órája");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"1 napja");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"1 hónapja");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 másodperce");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 perce");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 órája");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 napja");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 hónapja");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"1 másodperce");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"1 perce");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"1 órája");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"1 napja");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"1 hónapja");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 másodperce");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 perce");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 órája");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 napja");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 hónapja");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Útolsó");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"Védők:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"Támadók:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Kör statisztika");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Védők összes sebzése:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Támadók összes sebzése:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Te sebzésed:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Legjobb védő országok:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Legjobb támadó országok:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Legjobb védő egységek:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Legjobb támadó egységek:");
}





//---------------------------------------------------
//  Shouts
//---------------------------------------------------

//OK
function doShoutsComm() {
	results = getElements(document, "//b[@style='color: #222']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match(/[\d\.]+/g)== 1) {		
		    if (obj.innerHTML.match("second")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"másodperce");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"perce");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"órája");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"napja");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"Hónapja");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 Másodperce");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 perce");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 órája");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 napja");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 hónapja");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Jelentés"],
    "Delete":["Delete","Törlés"],
    "Edit":["Edit","Szerk."],
    "More shouts":["More shouts","Több shout(s)"]
});
	
	
replaceInputByValue({
    "Report":["Report","Jelentés"],
    "Delete":["Delete","Törlés"],
    "Edit":["Edit","Szerk."],
});	
	




//============================================================================
//Menu
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3]
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"nap")
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Szint: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Rang:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Köv. rang:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Gazd. szint:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Erő:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Régió:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Állampolgárság:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Kaja limit:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Ajándék limit:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Pénzed:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Raktárad");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Üzeneteid");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Napi feladatok:");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Ez a kör");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"$2 kör ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Kaja típus");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Ajándék típus");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Kézzel (");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Bármilyen szint");
		}
	}
}

//============================================================================
//Homepage
//============================================================================
function doHP() {
	//hp title
	replaceInnerHTML(getElements(document, "//div[@class='rightTabGrey']"), hpTitleReplacements);
	
	//index tabs
	replaceLinkByHref(hpTabsReplacements);
	
	//Articles content
	for (kk in hpContentArticlesReplacements) {
		allElements = document.getElementById(kk);
		replacNewspaperTimeWithAuthor(allElements);
	}

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
	replaceLinkSSS({
		"Show more battles":["Show more battles","Többi csata"],
		"Subsidies informations":["Subsidies informations","Támogatási informátió"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Nincs támogatott csata");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Katonai egységed parancsa:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Harcolj:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"1 perce");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"1 órája");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"1 napja");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"1 hónapja");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 perce");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 órája");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 napja");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 hónapja");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g," $2-t elfoglalta ,az utolsó csatában tőlük : ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"A $2 lakosság felkelést indított itt $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"megtámadták a $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g," $2$3 elnöke háborút kezdeményezett velük: $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," háborút kezdeményezett velük $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," $2-t elfoglalták, a csatában ellenük ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g,"új elnöket van");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Mutasd a többi eseményt");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Írj új shoutot:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Küldés!"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Küldés ide:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Küldés ide:");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Ország | $2  Katonai egység | $4 Barátok");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Több shout"] });
}

//============================================================================
//Job Market
//============================================================================
function doJobMarket() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Állás Börze ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Kritériumok:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Ország:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Gazdasági szint:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Főnök");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Cég");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Termék");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Minimum szint");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Fizetség");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Jelentkezés");
	
	replaceInputByValue({"Apply":["Apply","Jelentkezés"],"Show":["Show","Mutasd"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Munka");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Nincs munkád");
		replaceInputByValue({"Get a job now!":["Get a job now!","Szerezz munkát most !"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Abban az országban kell tartózkodnod ahol a cég működik");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Munka helyed");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Főnök");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Fizetés:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Kilépés");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Nem dolgoztál még ma");
			replaceInputByValue({"Work now":["Work now","Dolgozz"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Mai munka eredménye");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Bruttó");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Nettó");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Adó");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Itt dolgoztál");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Szerzett XP");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Gazdasági szinted:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Munka egyhuzamban:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Termelékenységed");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Termelékenység változtatások");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Végeleges termelékenység");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Késztermék:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Előállító cég típusa");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Mind"],
		"2":["Iron","\Vas"],
		"3":["Grain","Búza"],
		"4":["Oil","Olaj"],
		"5":["Stone","Kő"],
		"6":["Wood","Fa"],
		"7":["Diam.","Gyém."],
		"8":["Weap.","Fegyv."],
		"9":["House","Ház"],
		"10":["Gift","Ajándék"],
		"11":["Food","Kaja"],
		"12":["Ticket","Jegy"],
		"13":["DS","Véd. Rendsz."],
		"14":["Hosp.","Korház"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Piac");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Poka\u017C Oferty:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Ország:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Mínőség:");
	
	replaceInputByValue({"View offers":["View offers","Keres"],"Buy":["Buy","Megvesz"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Ajánlataim/ Új ajánlat "]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Termék");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Eladó");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Készlet");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Ár");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Megvesz");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," darab "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Ajánlataim/ Új ajánlat"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","Termék információ"]
	});
}

//============================================================================
//Train
//============================================================================
function doTrain() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Katonai Edzés");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Trenuj"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Edzés kész, gyere vissza holnap");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Ma már edzettél");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Ma már edzettél, gyere vissza holnap");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Kapott erő:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Katonai részletek");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Összes edzés:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Erő:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Katonai rang:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Összes sebzés:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Sebzés kézzel:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Sebzés Q1-gyel:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Sebzés Q2-gyel:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Sebzés Q3-gyel:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Sebzés Q4-gyel:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Sebzés Q5-gyel:");
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Csaták");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Ország");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Szortírozás:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Csak támogatott csaták:");
	
	replaceInputByValue({"Show battles":["Show battles","Mutasd a csatákat"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Csata kezdés");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Csata");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"Védekező vs Támadó");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Pont");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Összes sebzés");
	
	

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
}

//============================================================================
//Battle 
//============================================================================
function doBattle() {
	allElements = document.getElementById('battleBar').parentNode;
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Felkelés");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"Kezdte:");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2 Kör");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"A kört a védekezők nyerték");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"A kört a támadók nyerték");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Legjobb védők");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Legjobb támadók");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Nem harcolhatsz a jelenlegi tartózkodási helyedről.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"El kell utaznod a megszált országba h részt vehess.");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Nem harcolhatsz a jelenlegi tartózkodási helyedről.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"El kell utaznod a megszált országba h részt vehess.");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"A kört nyerte:");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Válasz fegyvert:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Válasz oldalt:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"A te oldalad:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Mutasd ezt a kört:");
	}
	replaceInputByValue({"Show round":["Show round","Poka\u017C"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Egész csata");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Harci útmutató");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Csata szabályok");
	
	}
	
//============================================================================
//Battle Statistics 
//============================================================================
function doBattleStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"Kezdte");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2 Kör");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"A kört a védekezők nyerték");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"A kört a támadók nyerték");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Vissza a csatához");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"30 percenként frissül a statisztika");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Csata statisztika");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Polgár ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Online");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Offline");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Profil szerkesztés"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Név csere"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","Tranzakciós lista"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Multi jelentése"]
	});
	replaceInputByValue({"Report multi":["Report multi","Multi jelentése"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Véglegesen kitíltották");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Oka:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Kitíltotta :");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Szint:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Sebzés:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Rang:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Gazdasági szint:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Erő:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Régió:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Állampolgárság:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Születésnap:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Nemzeti rang XP alapján:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Nemzeti rang sebzés alapján:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Világ rang XP alapján:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Világ rang sebzés alapján:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Katonai egység:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Párt:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Újság:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Munkahely:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Cégei:");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Politikai tisztség:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Nincs egysége");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Nem párt tag");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Nincs újságja");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Nincs munkahelye");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Nincs cége");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Nincs tisztsége");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Tartozása van");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"Vissza fizetési idő");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Barátok");
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	tmp.innerHTML = tmp.innerHTML.replace(/Total achievements/,"Összes Teljesítmény")
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Top achievements/,"Legjobb Teljesítmények");
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","Donor Teljesítmény"]});
	replaceLinkSSS({
		"See all achievements":["See all achievements","Nézd meg az össze Teljesítményét"]
	});
	
	doShoutsComm();
	
}


//============================================================================
//Edit Citizen
//============================================================================
function doEditCitizen() {
	allElements = document.getElementById('editCitizenForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"Email:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Új jelszó:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Ismétlés:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Régi jelszó:  :");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Új avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","Max. méret; :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Polgár");
	replaceInputByValue({"Edit citizen":["Edit citizen","Polgár szerkesztése"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Utazás");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Ország");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Régió:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Jegy mínősége:");
	
	replaceInputByValue({"Travel":["Travel","Utazás"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Utazási útmutató"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Feladó: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Üzenet elküldése: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Szerző");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Üzenet");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Dátum");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Viszavon");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"Címzett");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Üzenet elküldése"],
		"composeMessage.html":["Compose message","Üzenet összeálítás"]
	});
	replaceInputByValue({
		"Delete":["Delete","Törlés"],
		"Quick reply":["Quick reply","Gyors válasz"],
		"Report":["Report","Jelentés"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","jelentés"],
		"Quick reply":["Quick reply","Gyors válasz"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Válasz"],
		"conversation.html":["Previous messages","Elöző üzenet"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Bejövő üzenetek"],
		"composeMessage.html":["Compose Message","Üzenet Írás"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Új üzenet");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Bejövő üzenetek"],
		"sentMessages.html":["Sent messages","Üzenet elküldése"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Címzett:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Cím:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Üzenet:");
	
	replaceInputByValue({
		"Send":["Send","Küldés"],
		"Preview":["Preview","Előnézet"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Előfizetések");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Előfizetések");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Előfizetett újságok listája"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Előfizetett újságok");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Összes előfiz.");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Újság");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Előfiz. ideje");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Újság útmutató"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Újság");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Friss cikkek");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Szerkesztés"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Újság útmutató"]
	});
	replaceInputByValue({
		"Publish":["Publish","Közétesz"],
		"Preview":["Preview","Előnézet"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Új cikk írás");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Kiadási ország");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Cikk címe:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Üzenet:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Kérlek mentsd el a cikkek a gépedre mielött közzétennéd");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Újság neve:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Új avatar:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max. méret :");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Újság szerkesztése"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Újság szerkesztése"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Cikk");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Cikk szerkesztése"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Újság szerkesztése"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Jelentés"],
		"Edit":["Edit","Szerkesztés"],
		"Delete":["Delete","Törlés"]
	});
	replaceInputByValue({
		"Publish":["Publish","Közzététel"],
		"Report":["Report","Jelentés"],
		"Edit":["Edit","Szerkesztés"],
		"Delete":["Delete","Törlés"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Új hozzászólás");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Üzenet:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Újság");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Cikk szerkesztése");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Cikk címe:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Üzenet:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Újság szerkesztése"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Újság útmutató"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Cikk szerkesztése"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Szerződések");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Sablonok");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Javasolt szerződések(útolsó 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"Felajánlotta");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Nincs szerződés");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Elfogadott szerződések(útolsó 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"Felajánlotta");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Nincs szerződés");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Visszautasított szerződések");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Vissza utasította $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Nincs szerződés");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Sikertelen szerződés");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Nincs szeződés");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Aktív Kölcsöneid");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Kölcsönvevő");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Határidő");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Össz");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Adóság bezárása");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Nincs kölcsön");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Aktív tartozásaid");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Kölcsönadó");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Határidő");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Össz");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Adóság Fizetés");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Nincs adóság");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Sablon név:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Szerződési útmutató"],
		"#":["Create new template","Új sablon"]
	});
	replaceInputByValue({
		"Delete":["Delete","Törlés"],
		"Create template":["Create template","Új sablon"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1 Kötelezettségei");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Másikfél kötelezettségei")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Másikfél");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1 kötelezttségei")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," azonnal átutalja a következő termékeket");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," azonnal átutalja a következő összeget");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," tartozni fog ezzel");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"-ot kell fizetnie $1$3$5-ig napig($6 napon belül) neki:"
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
//======================================================================
// Contract Single
//======================================================================
function doContract() {
	allElements = document.getElementById('contentRow').children[1];
	//head
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Szerződések");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Szerződés");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Szerződés állapota: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Elfogadva");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"$1 vissza utasította ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Elutasítva");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Sablon");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Új elem hozzáadása a szerződéshez ");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Oldal");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Típus");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Dummy polgár");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Pénz"],
			"Product":["Product","Termék"],
			"Debt":["Debt","Adósság"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Péznnem :  ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Termék mennyisége:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Termék típusa:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Termék mínősége:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","\Vas"],
			"Grain":["Grain","Búza"],
			"Oil":["Oil","Olaj"],
			"Stone":["Stone","Kő"],
			"Wood":["Wood","Fa"],
			"Diamonds":["Diamonds","Gyémánt"],
			"Weapon":["Weapon","FEgyver"],
			"House":["House","Ház"],
			"Gift":["Gift","Ajándék"],
			"Food":["Food","Kaja"],
			"Ticket":["Ticket","Jegy"],
			"Defense System":["Defense System","Védelmi rendszer"],
			"Hospital":["Hospital","Kórház"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Adóság");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Pénznem: ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Visszafizetési határidő:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Termék mínősége:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Szerződés javasolása");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Neki");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Megjegyzés:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Csak a barátaiddal köthetsz szerződést");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Dummy polgár"],
		"contracts.html":["Go back to contract list","Vissza a szerződésekhez"]
	});
	replaceInputByValue({
		"Delete":["Delete","Törlés"],
		"Propose":["Propose","Ajánlás"],
		"Add item":["Add item","Elem hozzáadása"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Javaslat visszavonása")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Ajánlat visszavonása"]});
	    }   
}
//================================================================================
// Monetary market
//================================================================================
function doMonetaryMarket() {
    var results
    var allElements
    results = getElements(document, "//TD[@width='410']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Pénz piac")
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Jelenlegi ajánlatok")
    
    allElements = results.snapshotItem(0).children[4]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Keresés")
	
	allElements = results.snapshotItem(0).children[4]
    replaceInputByValue({"Swap currencies":["Swap currencies","Csere"]})
    
    //allElements = results.snapshotItem(0).children[4]
    //tmp = allElements.children[2]
    //tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Zamie\u0144 waluty")
	
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Valuta vétel")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Valuta eladás")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Nézd meg az ajánlatokat")
    
    allElements = results.snapshotItem(0).children[7]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Pénzpiaci útmutató")
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Eladó");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Összeg");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Arány");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Megvesz");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Összeg");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Arány"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Törlés");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Nincs ajánat");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Ajánlataid") 
    
    allElements = results.snapshotItem(0).children[5]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Ajánlat tevés")
    
    //tmp = allElements.children[2]
    //tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Zamie\u0144 waluty")
	replaceInputByValue({"Swap currencies":["Swap currencies","Csere"]})
    
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Felajánlott valuta")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Valuta vétel")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Váltási arány")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Új ajánlat készíté")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Ajánlat")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"ennyiért")
    
}
//=============================================================================
// Citizen market offers
//=============================================================================
function doCitizenMarketOffers() {
    var results
    var allElements
    var tmp
    results = getElements(document, "//TD[@colspan='2']");
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Piac")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Új ajánlat")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Ország")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Termék")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Mennyiség")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Ár")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Új ajánlat")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Mutasd a piacot");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"A raktárad");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Ajánltaid a piacon")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Termék")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Eladó");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Készlet");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Ár");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Bruttó");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Ár");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Nettó");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Vám");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Törlés");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Cégek");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Cég")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Termék")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Régió")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Munkások")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Új cég alapítás")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Neve")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Tremék")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Cég avatar")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Alapítás")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Ára")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"A cég a jelenlegi tartózkodási helyeden lesz meglapítva")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Régió bónuszok keresése")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Cégezési útmutató")
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Ország politika");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Válasz országot");
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Elnök");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"választások");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Elnök"]})
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Kongres");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Kongresszus"]})
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Háborúk");
    tmp = allElements.children[21]
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Háború");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Részletek");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Nincs háború");
    tmp = allElements.children[22]
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Háború szabályok");
    tmp = allElements.children[23]
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Szövetségekes");
    tmp = allElements.children[27]
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Ország");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Lejár"); 
    tmp = allElements.children[27].children[0]
    var loopz = tmp.children.length   
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1]
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"1 másodperc ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"1 perc ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"1 óra ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"1 nap ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"1 hónap");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 másodperc ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 perc ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 óra ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 nap");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 hónap ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Szövetségesek"]})
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Barát meghívás");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Meghívó linked");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Küld el ezt a linket másoknak mégtöbb");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"kapj");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who registers/,"Aranyat kapsz minden regisztrálóért");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"aki eléri a 7. szintet");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"Miután rákatintott erre a linkre");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"és másik");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she gets his\/her/,"Aranyat amikor eléri az ");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"első medálját");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Továbbá");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10%-ot kapsz minden medáljáért és szintlépésért");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"A meghívottad is kap");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7/,"aranyat amikor eléri a 7. szintet ");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Akiket meghívtál");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Keresési feltétel");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Mutasd");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Polgár");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Szint");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Szerzett arany");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Reg. ideje");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Statisztika");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Összes kattintás a linkeden");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Egyedi kattintás");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Összes regisztrált polgár");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Akik elérték a 7. szintet");
    tmp = allElements.children[14]
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Utolsó kattintások");
    tmp = allElements.children[15]
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Idő");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Ajánló");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Polgár");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Nem regisztrált");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Mutasd a többit");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"1 másodperce");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"1 perce");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"1 órája");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"1 napja");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"1 hónapja");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 másodperce");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 perce");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 órája");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 napja");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 hónapja");
            } 
        }
    }
}

function doPremium() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[7];
	tmp.innerHTML="<h2 style='text-align: center'>Konto premium</h2>"
		+ "<i>E-sim</i> egy ingyenes játék és senkinek nem kell fizetnie érte.De ha szereted az E-simet akkor lehetőséged van prémium számlát vásárolni<br/><br/>"
		+ "<u>Prémium számla</u> néhány érdekes pluszt ad mint pl. csata monitor vagy üzenet küldés a katonaiegységed tagjainak<br>"
		+ "A többi játkos pedig egy csillagot fog látni a profilodon ami jelzi hogy prémium felhasználó vagy.<br/>"
		+ "Azzal hogy prémium számlát veszel segíted a játék működését!."
		+ "<br><br>";
	tmp = allElements.children[9]
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"Számlád típusa")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"Ingyenes számla")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"Prémium számla")
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"Ugorj a ")
    replaceLinkByHref({
		"#features":["Features","Előnyök"],
		"#payments":["Payments","Fizetés"],
		"#faq":["FAQ","GYIK"]
	});
	tmp = allElements.children[13]
	tmp.innerHTML = tmp.innerHTML.replace(/Features/,"Előnyök")
	tmp.innerHTML = tmp.innerHTML.replace(/Battle monitor/,"Csata monitor")
        tmp.innerHTML = tmp.innerHTML.replace(/Companies production reports/,"Cégek termelési jelentése")
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"Adó statisztika")
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"Pénz piaci tranzakciók listája")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"Üzenet küldés a katonai egységed tagjainak")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"Üzenet küldés a pártod tagjainak")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/,"Reklám mentesség")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"Csillag a profilodon")	
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="A csata kép megváltozik azzal hogy látod a küzdő felek nemzetiségét"
	
        tmp = allElements.children[13].children[7]
	tmp.innerHTML="Hasznos eszköz hogy kiszámold a cégeid jövedelmeit"
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="Engedéjt kapsz hogy lásd az ország adó bevételeit, csak az elnök és a kongresszusi tagoknak ."

        tmp = allElements.children[13].children[14];
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Statystyki ze skarbca pa\u0144stwa")	
	
	tmp = allElements.children[13].children[15]
	tmp.innerHTML="Engedélyt kapsz hogy lásd az ország vagyonát, csak az elnök és a kongresszusi tagoknak."
	
	tmp = allElements.children[13].children[18]
	tmp.innerHTML="Egy listát kapsz az összes tranzakciódról, ez hasznos lehet egy kereskedő számára"
	tmp = allElements.children[13].children[21]
	tmp.innerHTML="Azonnali üzenet küldés az egységed összes tagjának(parancsonak kell lenned)"
	
	tmp = allElements.children[13].children[23]
	tmp.innerHTML="Párt vezér ként azonnali üzenet küldés a tagoknak"
	
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"Fizetések")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"Hossza")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Ára")
	tmp.innerHTML = tmp.innerHTML.replace(/One Month (30 days)/,"1 hónap (30 nap)")
	tmp = allElements.children[15].children[3]
	tmp.innerHTML="<b>Két féle képpen fizethetsz:</b><br>"
			+"<ul>"
			+"<li>Egyszeri kifizetéssel veszel egy 30 napos prémiumot</li>"
			+"<li> Feliratkozol és minden 30. napban AUTOMATIKUSAN megvételre kerül a prémium</li>"
			+"</ul>"
	
	tmp = allElements.children[17].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/FAQ/,"GYIK")
	tmp = allElements.children[17].children[1]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Lehetséges hitelkártyával fizetni ?"
	tmp = allElements.children[17].children[2]
	tmp.innerHTML="Igen - Csak egy paypal számlára van szükséged"
	tmp = allElements.children[17].children[3]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Barátaimnak tudok prémiumot venni ?"
	tmp = allElements.children[17].children[4]
	tmp.innerHTML="Igen, csak a megrendelésnél a barátod polgárának nevét kell beírnod"
	tmp = allElements.children[17].children[5]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Elvesztem a prémiumot ha felmondom az előfizetést ?"
	tmp = allElements.children[17].children[6]
	tmp.innerHTML="Nem azonnal. A felmondás csak annyit jelent hogy nem lesz automatikusan levonva az összeg a paypal számládról, de a prémiumod megmarad amíg le nem jár."
	tmp = allElements.children[17].children[7]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Más kérdésem van..."
	tmp = allElements.children[17].children[8]
	tmp.innerHTML="Kérdésed felteheted  <a href=\"composeMessage.html?id=1\">privát üzenetben</a>vagy a  <a target=\"_blank\" href=\"http://forum.e-sim.org/viewforum.php?f=43\">forumon</a>"
	
	
}

function doDonations() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[2];
    replaceInputByValue({"Show":["Show","Mutasd"]});
	tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/If you enjoy playing <i>e-sim<\/i> and would like to support development of the game with donation, please use the donate button./,"Ha szereted játszani az e-simet akkor segítehted a fejlesztőket azzal hogy támogatod őket.")
	tmp.innerHTML = tmp.innerHTML.replace(/Your donation will be visible to everyone on this page/,"Támogatásodat mindenki látni fogja ezen az oldalon")
	tmp.innerHTML = tmp.innerHTML.replace(/Donors, who make 2 EUR donations will receive bonus/,"Azok az adományozók akik 2 Eurót fizetnek bónuszt kapnak")
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","Támogató teljesítmény"]});
} 
  
//============================================================================
//Main
//============================================================================
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
} else if (isTargetHtml("/battles.html")) {
	doBattlesList();
} else if (isTargetHtml("/battle.html")) {
	doBattle();
} else if (isTargetHtml("/battleStatistics.html")) {
	doBattleStatistics();
} else if (isTargetHtml("/profile.html")) {
	doProfile();
} else if (isTargetHtml("/editCitizen.html")) {
	doEditCitizen();
} else if (isTargetHtml("/travel.html")) {
	doTravel();
} else if (isTargetHtml("/inboxMessages.html")) {
	doInboxMessages();
} else if (isTargetHtml("/sentMessages.html")) {
	doSentMessages();
} else if (isTargetHtml("/composeMessage.html")) {
	doComposeMessage();
//} else if (isTargetHtml("/notifications.html")) {
//	doNotifications(); TODO
} else if (isTargetHtml("/subs.html")) {
	doSubs();
} else if (isTargetHtml("/subscribedNewspapers.html")) {
	doSubscribedNewspapers();
} else if (isTargetHtml("/newspaper.html")) {
	doNewspaper();
} else if (isTargetHtml("/editNewspaper.html")) {
	doNewspaperEdit();
} else if (isTargetHtml("/article.html")) {
	doArticle();
} else if (isTargetHtml("/editArticle.html")) {
	doArticleEdit();
} else if (isTargetHtml("/contracts.html")) {
	doContractsList();
} else if (isTargetHtml("/contract.html")) {
	doContract();
} else if (isTargetHtml("/monetaryMarket.html")) {
	doMonetaryMarket();
} else if (isTargetHtml("/citizenMarketOffers.html")) {
	doCitizenMarketOffers();
} else if (isTargetHtml("/companies.html")) {
	doCompany();
} else if (isTargetHtml("/countryPoliticalStatistics.html")) {
	doPoliticalStats();
} else if (isTargetHtml("/inviteFriends.html")) {
	doInviteFriends();
} else if (isTargetHtml("/subscription.html")) {
	doPremium();
} else if (isTargetHtml("/donations.html")) {
	doDonations();
}