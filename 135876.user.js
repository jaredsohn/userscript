// ==UserScript==
// @name           e-sim LT
// @namespace      e-sim LT
// @include        http://e-sim.org*
// ==/UserScript==
//Lithuanian translation by shvo + Voldemortas

menuLinkReplacements = {
	"work.html"				:["Work","Darbovietė"],
	"train.html"			:["Train","Treniruotės"],
	"companies.html"		:["Companies","Įmonės"],
	"newspaper.html"		:["Newspaper","Laikraštis"],
	"myParty.html"			:["Party","Politinė partija"],
	"contracts.html"		:["Contracts","Kontraktai"],
  "myShares.html"     :["Shares","Akcijų birža"],
	"inviteFriends.html"	:["Invite friends","Kviesti draugus"],
	"myMilitaryUnit.html"	:["Military unit","Karinis būrys"],
	"subscription.html"     :["Premium account","Premium vartotojas"],
	
	"productMarket.html"	:["Product market","Produktų rinka"],
	"jobMarket.html"		:["Job market","Darbo pasiūla"],
	"monetaryMarket.html"	:["Monetary market","Valiutos keitykla"],
	"companiesForSale.html"	:["Companies for sale","Parduodamos įmonės"],
	
	"countryStatistics.html"		:["Country statistics","Valstybių statistika"],
	"partyStatistics.html"			:["Party statistics","Partijų statistika"],
	"newspaperStatistics.html"		:["Newspaper statistics","Laikraščių statistika"],
	"citizenStatistics.html"		:["Citizen statistics","Piliečių statistika"],
	"militaryUnitStatistics.html"	:["Military unit stats","Būrių statistika"],
	"donations.html"                :["Donations","Pervedimai"],
        "fundRaising.html?id=4"         :["New modules","Nauji moduliai"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Geriausi straipsniai"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Naujausi straipsniai"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Kariniai įvykiai"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Politiniai įvykiai"],
	
	"battles.html"							:["Battles","Mūšiai"],
	"countryPoliticalStatistics.html"		:["War and politics","Karai ir politika"],
	"countryEconomyStatistics.html"			:["Economy","Ekonomika"],
	"countryLaws.html"						:["Laws","Įstatymai"],
	"partyElections.html"					:["Party elections","Partijų rinkimai"],
	"congressElections.html"				:["Congress elections","Kongreso rinkimai"],
	"presidentalElections.html"				:["Presidential elections","Prezidento rinkimai"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Pilietybė"],
	"googleMap.html"						:["Map","Žemėlapis"],
};


menuTextReplacements = {
	"myPlacesButton":["My places","Mano galimybės"],
	"marketButton":["Market","Rinka"],
	"statisticsButton":["Statistics","Statistika"],
	"newsButton":["News","Naujienos"],
	"electionsButton":["Country","Valstybė"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","Atsijungti"],
	"workIcon"	:["Work","Dirbti"],
	"fightIcon"	:["Fight","Kovoti"],
	"avatarIcon":["Upload avatar","Įkelti avatarą"],
	"voteIcon"	:["Vote","Balsuoti"],
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Keliauti"],
	"pendingCitizenshipApplications.html"	:["change","keisti"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Sveikatos instrukcija"],
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Valgyti maistą"],
	"useGiftLink":["Use gifts","Vartoti dovanas"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Valgyti"],
	"useGiftButton":["Use gift","Vartoti"] 
};


hpTitleReplacements = {
	"News":["News","Naujienos"],
	"Shouts":["Shouts","Šūksniai"],
	"Battles":["Battles","Mūšiai"],
	"Events":["Events","Įvykiai"]
};


hpTabsReplacements = {
	"#topArticles":["Global","Globalios"],
	"#latestArticles":["Latest","Naujos"],
	"#localArticles":["Local","Vietinės"],
	
	"#countryShouts":["Country","Valstybė"],
	"#friendsShouts":["Military unit","Karinis būrys"],
	"#myShouts":["Friends","Draugai"],
	
	"#localBattles":["Country","Valstybiniai"],
	"#substidedBattles":["Subsidized","Subidijuojami"],
	"#hotBattles":["Important","Svarbūs"],

	"#localEvents":["Military","Kariniai"],
	"#globalEvents":["Military","Kariniai"],
	"#politicalEvents":["Political","Politiniai"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Valiutos keityklos instrukcija"],
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 sąj.");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"be sąj.");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Sukilimas");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Subsidijos:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"be sąj.");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 sąj.");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 sąj.");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Sukilimas");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Subsidijos:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"prieš sekundę");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"prieš minutę");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"prieš valandą");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"vakar");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"prieš mėnesį");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"prieš $1 sek.");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"prieš $1 min.");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"pieš $1 val.");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"prieš $1 d.");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"prieš $1 mėn.");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"prieš sekundę");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"prieš minutę");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"prieš valandą");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"prieš mėnesį");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"prieš $2 sek.");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"prieš $2 d.");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"prieš $2 mėn.");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"prieš sekundę");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"prieš minutę");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"prieš valandą");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"vakar");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"prieš mėnesį");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"prieš $2 sek. ");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"prieš $2 min.");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"prieš $2 val.");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"prieš $2 d.");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"prieš $2 mėn.");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Paskutiniai");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"besiginantys:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"atakuojantys:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Vykstančio roundo statistika");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Besiginančių žala: ");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Atakuojančių žala: ");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Tavo žala:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Geriausiai besiginančios valstybės:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Geriausiai atakuojančios valstybės:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Geriausiai besiginantys būriai:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Geriausiai atakuojantys būriai:");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"sek. prieš");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"min. prieš");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"val. prieš");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"dien. prieš");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"mėn. prieš");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"prieš $2 sek.");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"prieš $2 min.");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"prieš $2 val.");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"prieš $2 d.");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"prieš $2 mėn.");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Raportuoti"],
    "Delete":["Delete","Ištrinti"],
    "Edit":["Edit","Koreguoti"],
    "More shouts":["More shouts","Daugiau šūksnių"]
});
	
	
replaceInputByValue({
    "Report":["Report","Raportuoti"],
    "Delete":["Delete","Ištrinti"],
    "Edit":["Edit","Koreguoti"]
});	
	




//============================================================================
//Menu
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3]
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"diena")
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Lygis : ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Laipsnis:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Kitas laipsnis:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Ekonominis pajėgumas:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Galia");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Regionas:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Pilietybė:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Maisto limitas:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Dovanų limitas:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Tavo pinigai");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Tavo inventorius");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Tavo žinutės");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Tavo užduotys:");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Vykstantis roundas");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/," $2 roundas");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Maisto rūšis");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Dovanų rūšis");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Beginklis (");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Bet kokia kokybė");
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
		"Show more battles":["Show more battles","Rodyti daugiau mūšių"],
		"Subsidies informations":["Subsidies informations","Subsidijų infomacija"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Subsidijuojamų mūšių nėra");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Tavo karinio būrio nurodymai :");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Kovoti už:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"prieš minutę");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"prieš valandą");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"prieš dieną");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"prieš mėnesį");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"prieš $1 min.");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"prieš $1 val.");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"prieš $1 dien.");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"prieš $1 mėn.");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"apgynė $2,mūšyje prieš ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 piliečiai pradėjo sukilmą $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"buvo užpulta $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"$2$3 prezidentas pasiūlė paskelbti karą $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," paskelbė karą $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," užkariavo $2, mūšyje prieš ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," ma nowego prezydenta");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Rodyti daugiau įvykių");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Rašyti naują šūksnį:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Šaukti"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Siųsti į kanalus :");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Siųsti į kanalus :");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Valstybė | $2  Karinis būrys | $4 Draugai");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Daugiau šūksnių"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Darbo pasiūla ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Pasirinmimo kriterijai:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Valstybė:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Ekonominis pajėgumas:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Darbdavys");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Įmonė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produkcija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Minimalus pajėgumas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Atlyginimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Dirbti");
	
	replaceInputByValue({"Apply":["Apply","Dirbti"],"Show":["Show","Rodyti"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Darbovietė");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Nesi įsidarbinęs");
		replaceInputByValue({"Get a job now!":["Get a job now!","Gauk naują darbą dabar!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Norėdamas dirbti, privalai būti toje pačioje pačioje valstybėje, kaip ir įmonė, kurioje esi įsidarbinęs");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Tavo darbovietė");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Darbdavys");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Atlyginimas:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Išeiti iš darbo");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Šiandien dar nedirbote");
			replaceInputByValue({"Work now":["Work now","Dirbti dabar"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Šiandienos darbo rezultatai");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Atlyginimas (brutto)");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Atlyginimas (netto)");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Sumokėta mokesčių");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Dirbta");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Gauta XP");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Ekonominis pajėgumas padidėjo");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Dirbta dienų iš eilės");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Tavo produktyvumas");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Produktyvumo modifikatoriai ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Bendras produktyvumas");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Pagaminta produkcijos");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Žaliavų įmonės lygis");
			tmp.innerHTML=tmp.innerHTML.replace(/(High )/,"Nuo aukšto ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Iron )/,"geležies ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Grain )/,"grūdų ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds )/,"deimantų ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Stone )/,"akmens ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Wood )/,"medžio ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Oil )/,"naftos ");
			tmp.innerHTML=tmp.innerHTML.replace(/(region owned by country)/,"regiono, kurį valdo šalis");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"nuo įmonės kokybės");
			tmp.innerHTML=tmp.innerHTML.replace(/(none)/,"jokie");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Visi"],
		"2":["Iron","Geležis"],
		"3":["Grain","grūdai"],
		"4":["Oil","Nafta"],
		"5":["Stone","Akmuo"],
		"6":["Wood","Mediena"],
		"7":["Diam.","Deimant."],
		"8":["Weap.","Ginklai"],
		"9":["House","Namai"],
		"10":["Gift","Dovanos"],
		"11":["Food","Maistas"],
		"12":["Ticket","Bilietai"],
		"13":["DS","Gyn. S."],
		"14":["Hosp.","Ligoninės"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Produktų rinka");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Rodyti pasiūlymus:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Valstybė:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Kokybė:");
	
	replaceInputByValue({"View offers":["View offers","Žiūrėti pasiūlymus"],"Buy":["Buy","Pirkti"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Rodyti mano pasiūlymus / Įdėti naują pasiūlymą"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produktas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Pardavėjas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Kiekis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Pirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," kiekis "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Rodyti mano pasiūlymus / Įdėti naują pasiūlymą"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","Produktų informacija"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Karinės treniruotės");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Treniruotis"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Treniruotė baigta. Grįžkite rytoj");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Šiandien jau treniravotės");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Šiandien jau treniravotės. Grįžkite rytoj.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Galios padidėjimas:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Karinė informacija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Treniruočių skaičius:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Galia:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Karinis laipsnis:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Bendra padaryta žala:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Žala be ginklo:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Žala naudojant Q1 ginklą:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Žala naudojant Q2 ginklą:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Žala naudojant Q3 ginklą:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Žala naudojant Q4 ginklą:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Žala naudojant Q5 ginklą:");
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Mūšiai");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Valstybė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Rūšiavimas:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Tik subsidijuojami mūšiai:");
	
	replaceInputByValue({"Show battles":["Show battles","Rodyti mūšius"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Mūšio pradžia");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Mūšis");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"besiginantys prieš atakuojančius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Rezultatas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Viso padaryta žalos");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Sukilimas");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"sukėlė");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2 roundas");
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Besiginančiųjų pergalių skaičius");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Atakuojančiųjų pergalių skaičius");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Geriausiai besiginantys");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Geriausiai atakuojantys");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Negalite kovoti šiame mūšyje iš regiono, kuriame esate.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Privalote keliauti į valstybę okupantę, jei norite kovoti šiame mūšyje.");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Negalite kovoti šiame mūšyje iš regiono, kuriame esate.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Turite keliauti į vieną iš mūšyje dalyvaujančių valstybių, jei norite kovoti. ");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Šį roundą laimėjo:");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Pasirinkite ginklą:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Pasirinkite pusę:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Kovojate už:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Rodyti roundą:");
	}
	replaceInputByValue({"Show round":["Show round","Rodyti roundą"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Rodyti viso mūšio statistiką");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Kovojimo instrukcija");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Kovojimo taisyklės");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"sukėlė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"$2 roundas ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Besiginančiųjų pergalių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Atakuojančiųjų pergalių skaičius");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Atgal į mūšį");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Statistika perskaičiuojama kas 30 minučių");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Mūšio statistika");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Pilietis ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Prisijungęs");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Neprisijungęs");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Redaguoti profilį"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Keisti vardą"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","Pervedimų sąrašas"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Raportuoti multi"]
	});
	replaceInputByValue({"Report multi":["Report multi","Raportuoti multi"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Užblokuotas visam laikui");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Priežastis:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Užblokavo:");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Lygis:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Žala:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Laipsnis:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Ekonominis pajėgumas:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Galia:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Regionas:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Pilietybė:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Gimtadienis:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Nacionalinis reitingas pagal XP ");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Nacionalinis reitingas pagal žalą:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Tarptautinis reitingas pagal XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Tarptautinis reitingas pagal žalą");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Karinis būrys:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Partija:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Laikraštis:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Darbovietė:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Valdomos įmonės");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Politinės pareigos:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Nepriklauso kariniam būriui");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Neįstojęs į partiją");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Laikraščio neturi");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Nedirba");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Įmonių neturi");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Pareigų neturi");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Aktyvios paskolos");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"grąžinimo data");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( žaidimo diena)/g," $1");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Draugai");
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	tmp.innerHTML = tmp.innerHTML.replace(/Total achievements/,"Viso pasiekimų")
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Top achievements/,"Geriausi pasiekimai");
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","'Rėmėjo' pasiekimas"]});
	replaceLinkSSS({
		"See all achievements":["See all achievements","Žiūrėti visus pasiekimus"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Naujas slaptažodis:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Pakartokite naują slaptažodį:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Senas slaptažodis:  :");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Naujas avataras:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","maks. dydis; :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Pilietis");
	replaceInputByValue({"Edit citizen":["Edit citizen","Redaguoti pilietį"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Keliauti");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Valstybė");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Regionas:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Bilieto kokybė:");
	
	replaceInputByValue({"Travel":["Travel","Keliauti"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Keliavimo instrukcija wiki"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"gautos žinutės: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Išsiųstos žinutės: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Autorius");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Žinutė");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Pašalinti");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"Kam");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Išsiųstos žinutės"],
		"composeMessage.html":["Compose message","Sukurti žinutę"]
	});
	replaceInputByValue({
		"Delete":["Delete","Ištrinti"],
		"Quick reply":["Quick reply","Greitas atskymas"],
		"Report":["Report","Raportuoti"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Raportuoti"],
		"Quick reply":["Quick reply","Greitas atsakymas"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Atsakyti"],
		"conversation.html":["Previous messages","Ankstesnės žinutės"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Gautos žinutės"],
		"composeMessage.html":["Compose Message","Kurti žinutę"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nauja žinutė");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Gautos žinutės"],
		"sentMessages.html":["Sent messages","Išsiųstos žinutės"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Gavėjas:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Tema:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Žinutė:");
	
	replaceInputByValue({
		"Send":["Send","Siųsti"],
		"Preview":["Preview","Peržiūrėti"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Prenumeratos");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Prenumeratos");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Prenumeruojamų laikraščių sąrašas"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Prenumeruojami laikraščiai");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Prenum. skaičius");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Laikraštis");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Prenumeracijos laikas");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Laikraščių instrukcija"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Laikraštis");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Naujausi straipsniai");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Redaguoti laikraštį"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Laikraščių instrukcija"]
	});
	replaceInputByValue({
		"Publish":["Publish","Publikuoti"],
		"Preview":["Preview","Peržiūrėti"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Rašyti naują straipsnį");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Publikuoti savo šalyje");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Straipsnio pavadinimas:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Žinutė:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Išsaugokite straipsnio kopiją kompiuteryje prieš jį publikuodmi");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Laikraščio pavadinimas:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Naujas avataras:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","maks. dydis; :");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Redaguoti laikraštį"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Redaguoti laikraštį"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Straipsnis");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Redaguoti straipsnį"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Redaguoti laikraštį"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Raportuoti"],
		"Edit":["Edit","Redaguoti"],
		"Delete":["Delete","Trinti"]
	});
	replaceInputByValue({
		"Publish":["Publish","Publikuoti"],
		"Report":["Report","Raportuoti"],
		"Edit":["Edit","Redaguoti"],
		"Delete":["Delete","Trinti"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Naujas komentaras");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Žinutė:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Laikraštis");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Redaguoti straipsnį");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Straipsnio pavadinimas:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Žinutė:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Redaguoti laikraštį"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Laikraščio instrukcija"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Redaguoti straipsnį"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Kontraktai");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Model");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Pasiūlyti kontraktai (20 paskutinių)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"pasiūlyta žaidėjui ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Kontraktų nėra");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Priimti kontraktai (20 paskutinių)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"pasiūlyta žaidėjui");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Kontraktų nėra");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Atmesti kontraktai");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Atšaukė $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Kontraktų nėra");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Nepavykę kontraktai");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Kontraktų nėra");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Tavo galiojančios paskolos");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Skolininkas");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Grąžinimo data");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Suma");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Atšaukti paskolą");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Paskolų nėra");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Tavo aktyvios skolos ");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Skolintojas");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Grąžinimo data");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Suma");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Sumokėti skolą");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Skolų nėra");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Ruošinio pavadinimas:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Kontraktų instrukcija"],
		"#":["Create new template","Sukurti naują ruošinį"]
	});
	replaceInputByValue({
		"Delete":["Delete","Trinti"],
		"Create template":["Create template","Sukurti ruošinį"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1 įsipareigojimai");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Kito piliečio įsirageigojimai")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Kitas pilietis");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1 įsipareigojimai")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," tuojau pat atsiųs šiuos produktus");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," tuojau pat atsiųst šią sumą pinigų");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," paskola kainuos");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"turi būti sumokėta iki $1$3$5 žaidimo dienos ( praėjus $6 dienoms nuo kontakto pasirašymo) "
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Kontraktai");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Kontraktas");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Kontrakto būsena: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Priimtas");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Atmestas žaidėjo $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Nepavykęs");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Ruošinys");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Pridėti naują poziciją kontraktui");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Pusė");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Produkto tipas");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Kitas pilietis");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Pinigai"],
			"Product":["Product","Produktas"],
			"Debt":["Debt","Skola"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Pinigai  ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Kiekis:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Produkto rūšis:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Produktų kiekis:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Geležis"],
			"Grain":["Grain","Grūdai"],
			"Oil":["Oil","Nafta"],
			"Stone":["Stone","Akmuo"],
			"Wood":["Wood","Mediena"],
			"Diamonds":["Diamonds","Deimantai"],
			"Weapon":["Weapon","Ginklai"],
			"House":["House","Namas"],
			"Gift":["Gift","Dovanos"],
			"Food":["Food","Maistas"],
			"Ticket":["Ticket","Bilietas"],
			"Defense System":["Defense System","Gynybinė sistema"],
			"Hospital":["Hospital","Ligoninė"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Paskola");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Pinigai ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Grąžinimo data:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Produkto kokybė:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Pasiūlyti kontraktą");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Pasiūlyti žaidėjui");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Pastaba:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Kontraktus galima siųlyti tik draugams");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Kitas pilietis"],
		"contracts.html":["Go back to contract list","Grįžti į kontraktų sąrašą"]
	});
	replaceInputByValue({
		"Delete":["Delete","Trinti"],
		"Propose":["Propose","Siūlyti"],
		"Add item":["Add item","Pridėti"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Atšaukti pasiūlymą")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Atšaukti pasiūlymą"]});
	    }   
}
//================================================================================
// Monetary market
//================================================================================
function doMonetaryMarket() {
    var results
    var allElements
	
    results = getElements(document, "//TD[@style='text-align: center']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Valiutos keitykla")

	allElements = results.snapshotItem(0).children[1]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Esami pasiūlymai")
	allElements = results.snapshotItem(0).children[3]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Rodyti pasiūlymus")


	document.getElementById("swap2").value = "Sukeisti valiutas"
	tmp = allElements.children[3]
	tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Pirkti valiutą")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Parduoti valiutą")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Žiūrėti pasiūlymus")  

	allElements = results.snapshotItem(0).children[12]
	tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Tavo pasiūlymai")

	var results = getElements(document, "//DIV[@class='testDivblue']");
	var divsLength = results.snapshotLength;

	allElements = results.snapshotItem(divsLength-1);
	tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Įdėti pasiūlymą")
	document.getElementById("swap1").value = "Sukeisti valiutas"
	tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Siūloma valiuta")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Pirkti valiutą")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Keitimo kursas")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Įdėti naują pasiūlymą")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Siūlyti")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"kursu")
	
	results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Pardavėjas");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Kiekis");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Kursas");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Pirkti");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Kiekis");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Kursas"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Trinti");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Pasiūlymų nėra"); 
    
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
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Produktų inka")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Įdėti naujus pasiūlymus")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Vasltybė")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produktas")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Kiekis")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Kaina")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Įdėti naują pasiūlymą")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Rodyti turgaus pasiūlymus");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Tavo nuosavybė");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Tavo pasiūlymai produktų rinkoje")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produktas")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Pardavėjas");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Kiekis");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Kaina");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Brutto");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Kaina");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Netto");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Importo mokestis");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Trinti");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Įmonės");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Įmonė")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produktas")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Regionas")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Darbuotojai")
    tmp.innerHTML = tmp.innerHTML.replace(/No companies/,"Įmonių neturite")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Įkurti naują įmonę")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Įmonės pavadinimas")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Produkcijos rūšis")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Įmonės avataras")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Įkurti įmonę")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Naujos įmonės įkūrimas kainuoja")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"Įmonė bus įkurta regione, kuriame dabar esate")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources,/,"")
    tmp.innerHTML = tmp.innerHTML.replace(/click here/,"Rodyti regionus, turinčius resursų")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Įmonių instrukcija wiki")
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Valstybės politika");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Pasirinkite valstybę");
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Prezidentas");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"žiūrėti rinkimų rezultatus");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Prezidentas"]})
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Kongresas");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Kongresas"]})
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Karai");
    tmp = allElements.children[21]
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Karas");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Išsamiau");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Karų nėra");
    tmp = allElements.children[22]
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"karų taisyklės");
    tmp = allElements.children[23]
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Sąjungininkai");
    tmp = allElements.children[27]
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Valstybė");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Liko laiko"); 
    tmp = allElements.children[27].children[0]
    var loopz = tmp.children.length   
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1]
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"sekundė ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"minutė ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"valanda ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"diena ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"mėnuo ");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 sekundės ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 minutės ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 valandos ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 dienos ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 mėnesiai ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Sąjungininkai"]})
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Kviesti draugus");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Tavo pakvietimo nuoroda");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Siųskite šią nuorodą draugams ir gausite papildomo");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Uždirbsite");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who registers/,"aukso už kiekvieną pakvietą žaidėją, kuris prisiregistruos ");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"ir pasieks 7 lygį");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"naudojantis tavo nuorodo");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"ir dar ");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she gets his\/her/,"aukso, kada jis/ji gaus savo ");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"pirmajį medalį");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Papildomai gausite ");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% nuo sumos, kurią Tavo pakvietas žaidėjas gavo už naujus medalius ar naujai pasiektą lygį");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"pakviesti draugai taip pat gaus papildomo");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7/,"ausko, užsiregistravę naudojantis Tavo nuoroda ir pasiekę 7 lygį");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Pakviesti piliečiai");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Rūšiavimas pagal");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Rodyti");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Pilietis");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Lygis");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Gauta aukso");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Registracijos data");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Statistika");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Nuorodos paspaudimų skaičius");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Unikalių paspaudimų skaičius");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Prisiregistravusių žaidėjų");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"7 lygį pasiekę žaidėjai");
    tmp = allElements.children[14]
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Naujausi nuorodos paspaudimai");
    tmp = allElements.children[15]
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Laikas");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Kvietėjas");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Pilietis");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Neregistruotas");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Rodyti daugiau paspaudimų");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"prieš sekundę");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"prieš minutę");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"prieš valandą");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"prieš dieną");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"prieš mėnesį");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"prieš $1 sek. ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"prieš $1 min.");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"prieš $1 val. ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"prieš $1 d. ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"prieš $1 mėn. ");
            } 
        }
    }
}

function doPremium() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[7];
	tmp.innerHTML="<h2 style='text-align: center'>Premium vartotojas</h2>"
		+ "<i>E-sim</i> jest gr\u0105 darmow\u0105 i wszyscy mog\u0105 w ni\u0105 gra\u0107 bez wydawania pieni\u0119dzy. Je\u015Bli jeste\u015B jednak fanem <i>E-sim</i>, mo\u017Cesz zam\u00F3wi\u0107 abonament na konto premium.<br/><br/>"
		+ "<u>Konto premium</u> da ci dost\u0119p do kilku ciekawych informacji i u\u017Cytecznych dodatk\u00F3w takich jak monitor bitew lub wysy\u0142anie wiadomo\u015Bci do wszystkich cz\u0142onk\u00F3w jednostki wojskowej<br>"
		+ "Dodatkowo inni gracze b\u0119d\u0105 widzie\u0107 <i>presti\u017Cowa gwiazd\u0119</i> na twoim profilu.<br/>"
		+ "Kupuj\u0105c <u>konto premium</u> r\u00F3wniez pomagasz nam w rozwoju <i>E-sim</i>!."
		+ "<br><br>";
	tmp = allElements.children[9]
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"Vartotojo būsena")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"Nemokamas vartotojas")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"Premium vartotojas")
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"Eiti į")
    replaceLinkByHref({
		"#features":["Features","Ypatybės"],
		"#payments":["Payments","Mokėjimai"],
		"#faq":["FAQ","DUK"]
	});
	tmp = allElements.children[13]
	tmp.innerHTML = tmp.innerHTML.replace(/Features/,"Ypatybės")
	tmp.innerHTML = tmp.innerHTML.replace(/Battle monitor/,"Mūšio monitoringas")
        tmp.innerHTML = tmp.innerHTML.replace(/Companies production reports/,"Įmonių produkcijos išklotinės")
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"Mokesčių statistika")
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"Valiutos keityklos istorijos išklotinė")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"Patogesnė galimybė perduoti nurodymus žinutėmis karinio būrio nariams")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"Patogesnė galimybė perduoti nurodymus žinutėmis partijos nariams")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/,"Pašalinta reklama")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"Prestižnė žaidgždutė vartotojo profilyje")	
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="Wy\u015Bwietlanie obywatelstw graczy obserwuj\u0105cych dan\u0105 bitw\u0119 i bior\u0105cych w niej udzia\u0142"
	
        tmp = allElements.children[13].children[7]
	tmp.innerHTML="Dodatkowe narz\u0119dzia do obliczenia produktywno\u015Bci swoich firm"
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="Tylko dla prezydenta i kongresmen\u00F3w: dostajesz dost\u0119p do informacji na temat przychod\u00F3w z podatk\u00F3w"

        tmp = allElements.children[13].children[14];
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Pingų judėjimo statistika")	
	
	tmp = allElements.children[13].children[15]
	tmp.innerHTML="Tylko dla prezydenta i kongresmen\u00F3w: dostajesz dost\u0119p do informacji na temat skarbca pa\u0144stwa i waluty w obiegu"
	
	tmp = allElements.children[13].children[18]
	tmp.innerHTML="Dost\u0119p do historii transkacji na rynku walutowym dla wszystkich walut. Przydatne dla spekulant\u00F3w"
	tmp = allElements.children[13].children[21]
	tmp.innerHTML="Natychmiastowa wiadomo\u015B\u0107 do czlonkow jednostki wojskowej. Musisz mie\u0107 przywileje <u>commander</u>-a w twojej jednostce wojskowej \u017Ceby z tego skorzysta\u0107"
	
	tmp = allElements.children[13].children[23]
	tmp.innerHTML="Je\u015Bli jeste\u015B szefem partii, mo\u017Cesz wys\u0142ac wiadomo\u015B\u0107 do cz\u0142onk\u00F3w twojej partii"
	
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"Mokėjimai")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"Trukmė")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Kaina")
	tmp.innerHTML = tmp.innerHTML.replace(/One Month (30 days)/,"Mėnuo (30 dienų)")
	tmp = allElements.children[15].children[3]
	tmp.innerHTML="<b>S\u0105 2 sposoby \u017Ceby zap\u0142aci\u0107 :</b><br>"
			+"<ul>"
			+"<li>Jednorazowa op\u0142ata za 30 dni konta premium</li>"
			+"<li> Zam\u00F3w abonament (op\u0142aty zostan\u0105 od dzisiaj zrobione automatycznie co 30 dni dop\u00F3ki nie anulujesz abonamentu)</li>"
			+"</ul>"
	
	tmp = allElements.children[17].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/FAQ/,"Cz\u0119sto zadawane pytania")
	tmp = allElements.children[17].children[1]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Czy mo\u017Cna zap\u0142aci\u0107 kart\u0105 kredytow\u0105?"
	tmp = allElements.children[17].children[2]
	tmp.innerHTML="Tak - musisz stworzy\u0107 konto paypal, polaczy\u0107 je z twoja kart\u0105 kredytow\u0105 i zaplaci\u0107 za konto premium z konta paypal"
	tmp = allElements.children[17].children[3]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Czy mog\u0119 kupi\u0107 konto premium dla przyjaciela?"
	tmp = allElements.children[17].children[4]
	tmp.innerHTML="Tak, mo\u017Cesz kupi\u0107 konto premium dla kogo\u015B innego. Musisz tylko podda\u0107 nick jego obywatela przy zam\u00F3wieniu"
	tmp = allElements.children[17].children[5]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Czy strac\u0119 konto premium je\u015Bli anuluj\u0119 abonament?"
	tmp = allElements.children[17].children[6]
	tmp.innerHTML="Nie natychmiastowo. Anulowanie abonamentu oznacza, \u017Ce pieni\u0105dze nie b\u0119d\u0105 pobierane z twojego konta paypal co 30 dni. Je\u015Bli anulowale\u015B abonament, b\u0119dziesz mia\u0142 konto premium a\u017C do wyga\u015Bni\u0119cia aktualnej umowy"
	tmp = allElements.children[17].children[7]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Mam inne pytania..."
	tmp = allElements.children[17].children[8]
	tmp.innerHTML="Mo\u017Cesz spyta\u0107 wysy\u0142aj\u0105c  <a href=\"composeMessage.html?id=1\">wiadomo\u015B\u0107</a> albo spyta\u0107 innych graczy na <a target=\"_blank\" href=\"http://forum.e-sim.org/viewforum.php?f=43\">forum</a>"
	
	
}

function doDonations() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[2];
    replaceInputByValue({"Show":["Show","Poka\u017C"]});
	tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/If you enjoy playing <i>e-sim<\/i> and would like to support development of the game with donation, please use the donate button./,"Jei mėgaujatės žaisdami <i>e-sim</i>, galite paremti šį žaidimą tolimesnei plėtrai paspaudį šį mygtuką ")
	tmp.innerHTML = tmp.innerHTML.replace(/Your donation will be visible to everyone on this page/,"Tavo parama bus matoma visiems šiame puslapyje")
	tmp.innerHTML = tmp.innerHTML.replace(/Donors, who make 2 EUR donations will receive bonus/,"Rėmėjai, paaukoję daugiau nei 2 EU, gaus papildomą ")
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","pasiekimą 'Rėmėjas'"]});
} 
  
//Kūrė Voldemortas
////////////////////////////////////
//Partija
///////////////////////////////////
function doMyParty() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Party/,"Partija");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/You are not in a party/,"Jūs nepriklausote jokiai partijai")
    tmp.innerHTML = tmp.innerHTML.replace(/Join a party/,"Prisijunkti prie partijos")
    tmp.innerHTML = tmp.innerHTML.replace(/Party Leader/,"Partijos vadas")
    tmp.innerHTML = tmp.innerHTML.replace(/Members/,"Nariai")
    tmp.innerHTML = tmp.innerHTML.replace(/Leave party/,"Palikti partiją")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create your own party/,"Naujos partijos sukūrimas")
    tmp.innerHTML = tmp.innerHTML.replace(/Party name/,"Partijos pavadinimas")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Produkcijos rūšis")
    tmp.innerHTML = tmp.innerHTML.replace(/Short description/,"Trumpas aprašymas")
    tmp.innerHTML = tmp.innerHTML.replace(/Characters remaining/,"Liko simbolių")
    tmp.innerHTML = tmp.innerHTML.replace(/Party Avatar/,"Avataras partijai")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating a party costs/,"Partijos sukūrimas kainuoja")
}
////////////////////////////////////
//MU
///////////////////////////////////
function doMilitaryUnit() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit/,"Karinis būrys (MU)");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Donate money/,"Siųsti pinigus");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate product/,"Siųsti daiktus");
    tmp.innerHTML = tmp.innerHTML.replace(/Transfer company/,"Pervesti įmonę");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Pilietybė")
    tmp.innerHTML = tmp.innerHTML.replace(/Military rank/,"Būrio lygis")
    tmp.innerHTML = tmp.innerHTML.replace(/Total members/,"Viso narių")
    tmp.innerHTML = tmp.innerHTML.replace(/Max. members/,"Max. narių")
    tmp.innerHTML = tmp.innerHTML.replace(/Total damage in battles/,"Visa žala padaryta mūšiuose")
    tmp.innerHTML = tmp.innerHTML.replace(/Damage today/,"Šiandienos žala")
    tmp.innerHTML = tmp.innerHTML.replace(/Leader/,"Vadas")
    tmp.innerHTML = tmp.innerHTML.replace(/Edit military unit/,"Keisti MU nustatymus")
    tmp.innerHTML = tmp.innerHTML.replace(/Change nationality/,"Keisti pilietybę")
    tmp.innerHTML = tmp.innerHTML.replace(/Privileges/,"Privilegijos")
    tmp.innerHTML = tmp.innerHTML.replace(/Money account/,"Iždas")
    tmp.innerHTML = tmp.innerHTML.replace(/Job Offers/,"Darbo pasiūlymai")
    tmp.innerHTML = tmp.innerHTML.replace(/Recruitment/,"Naujų narių priėmimas")
    tmp.innerHTML = tmp.innerHTML.replace(/pending applications/,"tapimo nariu prašymų")
    tmp.innerHTML = tmp.innerHTML.replace(/View logs/,"Visi logai")
    tmp.innerHTML = tmp.innerHTML.replace(/Upgrade to/,"Pakelti lygį iki")
    tmp.innerHTML = tmp.innerHTML.replace(/Expand members limit/,"Praplėsti max narių limitą")
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Description/,"Aprašymas")
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Current orders/,"Nurodymai")
    tmp.innerHTML = tmp.innerHTML.replace(/Battle/,"Mūšis")
    tmp.innerHTML = tmp.innerHTML.replace(/no allies/,"be sąj.")
    tmp.innerHTML = tmp.innerHTML.replace(/allies/,"sąj.")
    tmp.innerHTML = tmp.innerHTML.replace(/Resistance war/,"Sukilimas (RW)")
    tmp.innerHTML = tmp.innerHTML.replace(/Subsidies/,"Subsidijos")
    tmp.innerHTML = tmp.innerHTML.replace(/none/,"jokių")
    tmp.innerHTML = tmp.innerHTML.replace(/Side/,"Pusė")
    tmp.innerHTML = tmp.innerHTML.replace(/Briefing: (visible for members only)/,"Šiaip teksto (matoma tik nariams)")
    tmp = allElements.children[7]
    tmp.innerHTML = tmp.innerHTML.replace(/Allowed to manage companies/,"Gali valdyti įmones")
    tmp.innerHTML = tmp.innerHTML.replace(/Allowed to change orders/,"Gali keisti nurodymus")
    tmp.innerHTML = tmp.innerHTML.replace(/Allowed to accept\/decline recruitment applications/,"Gali priimti\/atmesti naujus tapimo nariu prašymus")
    tmp.innerHTML = tmp.innerHTML.replace(/Allowed to use unit's storage/,"Gali valdyti iždą ir sandėlį")
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen is online/,"Žaidėjas yra prisijungęs")
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen is offline/,"Žaidėjas nėra prisijungęs")
    tmp.innerHTML = tmp.innerHTML.replace(/Members/,"Nariai")
    tmp.innerHTML = tmp.innerHTML.replace(/View\/manage members/,"Valdyti narius")
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Įmonės")
    tmp.innerHTML = tmp.innerHTML.replace(/See all companies/,"Parodyti būrio įmones")
}

function docompaniesForSale(){
 rr = {
		"1":["Any","Visi"],
		"2":["Iron","Geležis"],
		"3":["Grain","grūdai"],
		"4":["Oil","Nafta"],
		"5":["Stone","Akmuo"],
		"6":["Wood","Mediena"],
		"7":["Diam.","Deimant."],
		"8":["Weap.","Ginklai"],
		"9":["House","Namai"],
		"10":["Gift","Dovanos"],
		"11":["Food","Maistas"],
		"12":["Ticket","Bilietai"],
		"13":["DS","Gyn. S."],
		"14":["Hosp.","Ligoninės"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies for sale)/,"Parduodamos įmonės");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Rodyti pasiūlymus:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Valstybė:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Kokybė:");
	
	replaceInputByValue({"View offers":["View offers","Žiūrėti pasiūlymus"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}

	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produktas");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Įmonė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Location)/,"Vietovė");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Kaina");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Pirkti");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Pardavėjas"); 
// check	

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
}else if (isTargetHtml("/myParty.html")) {
	doMyParty();
}else if (isTargetHtml("/myMilitaryUnit.html") || isTargetHtml("/militaryUnit.html")) {
	doMilitaryUnit();
}
else if (isTargetHtml("/companiesForSale.html")) {
	docompaniesForSale();
}