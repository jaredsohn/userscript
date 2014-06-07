// ==UserScript==
// @name           e-sim LT
// @namespace      e-sim LT
// @include        http://e-sim.org*
// ==/UserScript==
//Copyright XerTaLT

menuLinkReplacements = {
	"work.html"				:["Work","Dirbti"],
	"train.html"			:["Train","Treniruotis"],
	"companies.html"		:["Companies","Kompanijos"],
	"newspaper.html"		:["Newspaper","Laikraštis"],
	"myParty.html"			:["Party","Politinė partija"],
	"contracts.html"		:["Contracts","Kontraktai"],
	"inviteFriends.html"	:["Invite friends","Kviesti draugus"],
	"myMilitaryUnit.html"	:["Military unit","Karinis būrys"],
	"subscription.html"     :["Premium account","Premijinė žaidėjo sąskaita"],
	
	"productMarket.html"	:["Product market","Produktų rinka"],
	"jobMarket.html"		:["Job market","Darbo birža"],
	"monetaryMarket.html"	:["Monetary market","Valiutų rinka"],
	"companiesForSale.html"	:["Companies for sale","Įmonių rinką"],
	
	"countryStatistics.html"		:["Country statistics","Šalių statistika"],
	"partyStatistics.html"			:["Party statistics","Partijų statistika"],
	"newspaperStatistics.html"		:["Newspaper statistics","Laikraščių statistika"],
	"citizenStatistics.html"		:["Citizen statistics","Gyventojų statistika"],
	"militaryUnitStatistics.html"	:["Military unit stats","Karinių būrių statistika"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Top Straipsniai"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Naujausi straipsniai"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Kariniai įvykiai"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Politiniai įvykiai"],
	
	"battles.html"							:["Battles","Mūšiai"],
	"countryPoliticalStatistics.html"		:["War and politics","Karas ir politika"],
	"countryEconomyStatistics.html"			:["Economy","Ekonomika"],
	"countryLaws.html"						:["Laws","Įstatymai"],
	"partyElections.html"					:["Party elections","Partijos prezidento rinkimai"],
	"congressElections.html"				:["Congress elections","Kongreso rinkimai"],
	"presidentalElections.html"				:["Presidential elections","Prezidento rinkimai"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Pilietybė"],
	"googleMap.html"						:["Map","Žemėlapis"],
};


menuTextReplacements = {
	"myPlacesButton":["My places","Žaidėjo panelė"],
	"marketButton":["Market","Rinka"],
	"statisticsButton":["Statistics","Statistika"],
	"newsButton":["News","Naujienos"],
	"electionsButton":["Country","Šalis"]
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
	"pendingCitizenshipApplications.html"	:["change","Keisti"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","Gyvybių pradžiamokslis"],
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Valgyti"],
	"useGiftLink":["Use gifts","Naudoti dovanas"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Valgyti"],
	"useGiftButton":["Use gift","Naudoti dovanas"] 
};


hpTitleReplacements = {
	"News":["News","Naujienos"],
	"Shouts":["Shouts","Rėksniadėžė"],
	"Battles":["Battles","Mūšiai"],
	"Events":["Events","Įvykiai"]
};


hpTabsReplacements = {
	"#topArticles":["Global","Pasaulinės"],
	"#latestArticles":["Latest","Naujausios"],
	"#localArticles":["Local","Vietinės"],
	
	"#countryShouts":["Country","Šalis"],
	"#friendsShouts":["Military unit","Karinis būrys"],
	"#myShouts":["Friends","Draugai"],
	
	"#localBattles":["Country","Šalies"],
	"#substidedBattles":["Subsidized","Subsidijuojamos"],
	"#hotBattles":["Important","Svarbios"],

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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Valiutų rinkos pradžiamokslis"],
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 sąjungininkai");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"sąjungininkų nėra");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Pasipriešinimo karas");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Subsidijos:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"sąjungininkų nėra");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 sąjungininkas");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 sąjungininkai");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Pasipriešinimo karas");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Subsidijos:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"sekundė po");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"minutė po");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"valanda po");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"diena po");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"mėnuo po");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 sekundės po");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 minutės po");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 valandos po");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 dienos po");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 mėnesiai po");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"sekundė po");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"minutė po");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"valanda po");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"diena po");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"mėnuo po");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 sekundės po");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 minutės po");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 valandos po");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 dienos po");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 mėnesiai po");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"sekund\u0119 temu");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"minut\u0119 temu");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"godzin\u0119 temu");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"wczoraj");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"miesi\u0105c temu");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 sekund temu");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 minut temu");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 godzin temu");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 dni temu");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 miesi\u0119cy temu");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Ostatni");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"obro\u0144cy:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"napastnicy:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Statystyki obecnej rundy");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Obra\u017Cenia zadane przez obro\u0144c\u00F3w:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Obra\u017Cenia zadane przez napastnik\u00F3w:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Zadane obra\u017Cenia:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Najlepsze kraje w obronie:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Najlepsze kraje w ataku:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Najlepsze jednostki wojskowe w obronie:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Najlepsze jednostki wojskowe w ataku:");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"sekund\u0119 temu");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"minut\u0119 temu");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"godzin\u0119 temu");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"wczoraj");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"miesi\u0105c temu");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 sekund temu");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 minut temu");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 godzin temu");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 dni temu");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 miesi\u0119cy temu");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Zg\u0142o\u015B"],
    "Delete":["Delete","Usu\u0144"],
    "Edit":["Edit","Edytuj"],
    "More shouts":["More shouts","Wi\u0119cej shout(s)"]
});
	
	
replaceInputByValue({
    "Report":["Report","Zg\u0142o\u015B"],
    "Delete":["Delete","Usu\u0144"],
    "Edit":["Edit","Edytuj"]
});	
	




//============================================================================
//Menu
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3]
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"dzie\u0144")
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Poziom: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Ranga:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Nast\u0119pna:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Skill ekonomiczny:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Si\u0142a");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Region:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Obywatelstwo:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Limit chleba:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Limit prezent\u00F3w:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Twoje pieni\u0105dze");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Tw\u00F3j ekwipunek");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Twoje wiadomo\u015Bci");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Twoje dzisiejsze zadania");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Obecna runda");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Runda $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Jako\u015B\u0107 chleba");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Jako\u015B\u0107 prezent\u00F3w");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Bez broni (");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Dowolna");
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
		"Show more battles":["Show more battles","Wy\u015Bwietl wiecej bitew"],
		"Subsidies informations":["Subsidies informations","Poradnik o dofinansowaniach"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Nie ma dofinansowanych bitew");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Rozkazy twojej jednostki wojskowej :");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Walczy\u0107:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"minut\u0119 temu");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"godzin\u0119 temu");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"wczoraj");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"miesi\u0105c temu");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 minut temu");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 godzin temu");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 dni temu");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 miesi\u0119cy temu");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"zabezpieczy\u0142a $2,w bitwie przeciwko ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Obywatele $2 wywo\u0142ali powstanie w $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"zosta\u0142a zaatakowana przez $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Prezydent $2$3 proponuje wypowiedzie\u0107 wojn\u0119 $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," wypowiedzia\u0142a wojn\u0119 $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," zdoby\u0142a $2, w bitwie przeciwko ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," ma nowego prezydenta");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Wi\u0119cej wydarze\u0144");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Napisz nowego shouta:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Wy\u015Blij"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Wy\u015Blij do :");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Wy\u015Blij do :");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Kraj | $2  Jednostka wojskowa | $4 Przyjaciele");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Wiecej shout\u00F3w"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Oferty pracy ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Kryteria wyboru:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Kraj:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Skill ekonomiczny:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Pracodawca");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Firma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produkt");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Skill minimalny");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"P\u0142aca");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Zg\u0142o\u015B si\u0119");
	
	replaceInputByValue({"Apply":["Apply","Zglo\u015B si\u0119"],"Show":["Show","Wy\u015Bwietl"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Pracuj");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Nie masz pracy");
		replaceInputByValue({"Get a job now!":["Get a job now!","Znajd\u017A sobie prac\u0119 !"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Musisz by\u0107 w kraju, w kt\u00F3rym znajduje si\u0119 firma \u017Ceby w niej pracowa\u0107");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Miejsce pracy");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Pracodawca");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"P\u0142aca:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Zrezygnuj");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Dzisiaj nie pracowa\u0142e\u015B");
			replaceInputByValue({"Work now":["Work now","Pracuj"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Dzisiejszy wynik pracy");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"P\u0142aca brutto");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"P\u0142aca netto");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Podatek");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Pracujesz u");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"XP zdobyty");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Skill ekonomiczny zdobyty");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Ilo\u015B\u0107 dni przepracowanych");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Twoja bazowa produktywno\u015B\u0107");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Modyfikatory produktywno\u015Bci");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Ca\u0142kowita produktywno\u015B\u0107");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Wyprodukowane jednostki");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Jako\u015B\u0107 firmy raw");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Wszystko"],
		"2":["Iron","\u017Belazo"],
		"3":["Grain","Ziarna"],
		"4":["Oil","Ropa"],
		"5":["Stone","Kamie\u0144"],
		"6":["Wood","Drewno"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Bro\u0144"],
		"9":["House","Dom"],
		"10":["Gift","Prezent"],
		"11":["Food","Chleb"],
		"12":["Ticket","Bilet"],
		"13":["DS","Syst. Obr."],
		"14":["Hosp.","Szpital"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Rynek");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Poka\u017C Oferty:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Kraj:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Jako\u015B\u0107:");
	
	replaceInputByValue({"View offers":["View offers","Zobacz oferty"],"Buy":["Buy","Kup"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Poka\u017C moje oferty / Stw\u00F3rz now\u0105 ofert\u0119"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produkt");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Sprzedawca");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Stock");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Cena");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Kup");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," sztuk "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Poka\u017C moje oferty / Stw\u00F3rz now\u0105 ofert\u0119"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","Info o produkcie"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Trening wojskowy");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Trenuj"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Trening zako\u0144czony, wr\u00F3\u0107 jutro");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Dzisiaj ju\u017C trenowa\u0142e\u015B");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Dzisiaj ju\u017C trenowa\u0142e\u015B");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Si\u0142a zdobyta:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Szczeg\u00F3\u0142y wojskowe");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Og\u00F3lna liczba trening\u00F3w:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Si\u0142a:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Ranga wojskowa:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Og\u00F3lne obra\u017Cenia:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Obra\u017Cenia bez broni:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Obra\u017Cenia z broni\u0105 Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Obra\u017Cenia z broni\u0105 Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Obra\u017Cenia z broni\u0105 Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Obra\u017Cenia z broni\u0105 Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Obra\u017Cenia z broni\u0105 Q5:");
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Bitwy");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Kraj");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Sortowanie:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Tylko bitwy dofinansowane:");
	
	replaceInputByValue({"Show battles":["Show battles","Poka\u017C bitwy"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Pocz\u0105tek");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Bitwa");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"obro\u0144cy vs napastnicy");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Wynik");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Ca\u0142kowite obra\u017Cenia");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Powstanie");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"zacz\u0119te przez");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Runda $2");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rundy wygrane przez obro\u0144c\u00F3w");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rundy wygrane przez napastnik\u00F3w");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Najlepsi obro\u0144cy");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Najlepsi napastnicy");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Nie mo\u017Cesz si\u0119 bi\u0107 w tej bitwie z twojego obecnego regionu");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Musisz si\u0119 przenie\u015B\u0107 do kraju okupuj\u0105cego \u017Ceby bi\u0107 w tej bitwie");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Nie mo\u017Cesz bi\u0107 w tej bitwie z twojego obecnego regionu");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Musisz si\u0119 uda\u0107 do jednego z kraj\u00F3w uczestnicz\u0105cych w tej bitwie ");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Ta runda zosta\u0142a wygrana przez :");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Wybierz bro\u0144:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Wybierz twoja stron\u0119:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Walczysz dla:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Poka\u017C rund\u0119:");
	}
	replaceInputByValue({"Show round":["Show round","Poka\u017C"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Poka\u017C statystyki ca\u0142ej bitwy");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Poradnik o walce");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Regu\u0142y bitwy");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"zacz\u0119te przez");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Runda $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Rundy wygrane przez obro\u0144c\u00F3w");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Rundy wygrane przez napastnik\u00F3w");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Powr\u00F3t do bitwy");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Statystyki s\u0105 od\u015Bwie\u017Cane co 30 sekund");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Statystyki bitwy");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Obywatel ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Pod\u0142\u0105czony");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Niepod\u0142\u0105czony");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Edytuj profil"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Zmie\u0144 imi\u0119"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Zg\u0142o\u015B multi"]
	});
	replaceInputByValue({"Report multi":["Report multi","Zg\u0142o\u015B multi"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Ban permanentny");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Pow\u00F3d:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Zbanowany przez :");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Poziom:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Obra\u017Cenia:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Ranga:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Skill ekonomiczny:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Si\u0142a:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Region:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Obywatelstwo:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Urodziny:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Klasyfikacja krajowa wed\u0142ug XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Klasyfikacja krajowa wed\u0142ug obra\u017Ce\u0144:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Klasyfikacja og\u00F3lna wed\u0142ug XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Klasyfikacja og\u00F3lna wed\u0142ug obra\u017Ce\u0144");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Jednostka wojskowa:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Partia:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Gazeta:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Pracuje dla:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"W\u0142asne firmy");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Stanowisko polityczne:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Nie ma jednostki wojskowej");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Nie ma partii");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Nie ma gazety");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Nie ma pracy");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Nie ma firm");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Nie ma stanowiska");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"D\u0142ug(i) do sp\u0142acenia");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"do dnia");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Przyjaciele");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Nowe has\u0142o:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Potwierd\u017A has\u0142o:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Poprzednie has\u0142o:  :");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nowy avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max. wielkosc; :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Obywatel");
	replaceInputByValue({"Edit citizen":["Edit citizen","Edytuj obywatela"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Podr\u00F3\u017C");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Kraj");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Region:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Jako\u015B\u0107 biletu:");
	
	replaceInputByValue({"Travel":["Travel","Podr\u00F3\u017Cuj"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Poradnik o podr\u00F3\u017Cach"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Wiadomo\u015B\u0107 od: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Wiadomo\u015B\u0107 wys\u0142ane: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Autor");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Wiadomo\u015B\u0107");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Usu\u0144");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"do");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Wys\u0142ane wiadomo\u015B\u0107"],
		"composeMessage.html":["Compose message","Napisz"]
	});
	replaceInputByValue({
		"Delete":["Delete","Usu\u0144"],
		"Quick reply":["Quick reply","Szybka odpowied\u017A"],
		"Report":["Report","Zg\u0142o\u015B"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Zg\u0142o\u015B"],
		"Quick reply":["Quick reply","Szybka odpowied\u017A"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Odpowied\u017A"],
		"conversation.html":["Previous messages","Poprzednia wiadomo\u015B\u0107"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Odebrane"],
		"composeMessage.html":["Compose Message","Napisz"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nowa wiadomo\u015B\u0107");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Skrzynka odbiorcza"],
		"sentMessages.html":["Sent messages","Wiadomo\u015B\u0107 wys\u0142ane"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Odbiorca:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Tytu\u0142:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Wiadomo\u015B\u0107:");
	
	replaceInputByValue({
		"Send":["Send","Wy\u015Blij"],
		"Preview":["Preview","Podgl\u0105d"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Subskrypcje");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Subskrypcje");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Lista subskrypcji"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Gazety subskrybowane");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Ca\u0142kowite subskrypcje");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Gazeta");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Czas subskrypcji");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Poradnik o gazetach"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Gazeta");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Ostatnie artyku\u0142y");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Edytuj gazete"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Poradnik o gazetach"]
	});
	replaceInputByValue({
		"Publish":["Publish","Opublikuj"],
		"Preview":["Preview","Podgl\u0105d"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Napisz nowy artyku\u0142");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Opublikuj w kraju");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Tytu\u0142 artyku\u0142u:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Wiadomo\u015B\u0107:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Zapisz artyku\u0142 na dysku zanim go wy\u015Blesz!!!!");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Nazwa gazety:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nowy avatar:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max. wielkosc; :");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Edytuj gazet\u0119"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Edytuj gazet\u0119"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Artyku\u0142");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Edytuj artyku\u0142"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Edytuj gazet\u0119"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Zg\u0142o\u015B"],
		"Edit":["Edit","Edytuj"],
		"Delete":["Delete","Usu\u0144"]
	});
	replaceInputByValue({
		"Publish":["Publish","Opublikuj"],
		"Report":["Report","Zg\u0142o\u015B"],
		"Edit":["Edit","Edytuj"],
		"Delete":["Delete","Usu\u0144"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Nowy komentarz");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Wiadomo\u015B\u0107:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Gazeta");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Edytuj");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Tytu\u0142 artyku\u0142u:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Wiadomo\u015B\u0107:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Edytuj gazet\u0119"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Poradnik o gazetach"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Edytuj gazet\u0119"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Kontrakty");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Model");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Kontrakty zaproponowane(20 ostatnich)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"zaproponowany dla ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Brak kontrakt\u00F3w");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Kontrakty zaakceptowane (20 ostatnich)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"zaproponowany dla");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Brak kontrakt\u00F3w");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Kontrakty odrzucone");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Odrzucony przez $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Brak kontrakt\u00F3w");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Zerwane kontrakty");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Brak kontrakt\u00F3w");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Twoje aktywne po\u017Cyczki");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Po\u017Cyczaj\u0105cy");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Data zwrotu");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Suma");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Anuluj d\u0142ug");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Brak po\u017Cyczek");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Twoje aktywne d\u0142ugi ");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Po\u017Cyczkodawca");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Data sp\u0142aty");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Suma");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Sp\u0142a\u0107 d\u0142ug");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Brak d\u0142ugu");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Nazwa modelu:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Poradnik o kontraktach"],
		"#":["Create new template","Stw\u00F3rz nowy model"]
	});
	replaceInputByValue({
		"Delete":["Delete","Usu\u0144"],
		"Create template":["Create template","Stw\u00F3rz model"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Zobowi\u0105zania $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Zobowi\u0105zania drugiego obywatela")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Drugi obywatel");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Zobowi\u0105zania $1")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," odda natychmiastowo nast\u0119puj\u0105ce produkty");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," odda natychmiastowo nast\u0119puj\u0105ca sum\u0119 pieni\u0119dzy");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," zostanie obcia\u017Cony nast\u0119puj\u0105cym d\u0142ugiem");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"musi zosta\u0107 sp\u0142acony $1$3$5 dnia gry ($6 dni po podpisaniu kontraktu) dla"
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Kontrakty");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Kontrakt");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Status kontraktu: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Zaakceptowany");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Odrzucony przez $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Zerwany");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Model");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Dodaj nowy element do kontraktu");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Strona");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Rodzaj produktu");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Drugi obywatel");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Pieni\u0105dze"],
			"Product":["Product","Produkt"],
			"Debt":["Debt","D\u0142ug"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Pieniadze w  ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Sztuk:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Rodzaj produktu:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Jako\u015B\u0107 produktu:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","\u017Belazo"],
			"Grain":["Grain","Ziarna"],
			"Oil":["Oil","Ropa"],
			"Stone":["Stone","Kamie\u0144"],
			"Wood":["Wood","Drewno"],
			"Diamonds":["Diamonds","Diamenty"],
			"Weapon":["Weapon","Bro\u0144"],
			"House":["House","Dom"],
			"Gift":["Gift","Prezent"],
			"Food":["Food","Chleb"],
			"Ticket":["Ticket","Bilet"],
			"Defense System":["Defense System","System obronny"],
			"Hospital":["Hospital","Szpital"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"D\u0142ug");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Pieni\u0105dze w ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Data sp\u0142aty:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Jako\u015B\u0107 produktu:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Zaproponuj kontrakt");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Zaproponuj dla");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Uwaga:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Mo\u017Cesz proponowa\u0107 kontrakty tylko swoim przyjaciolom");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Drugi obywatel"],
		"contracts.html":["Go back to contract list","Powr\u00F3t do listy kontrakt\u00F3w"]
	});
	replaceInputByValue({
		"Delete":["Delete","Usu\u0144"],
		"Propose":["Propose","Zaproponuj"],
		"Add item":["Add item","Dodaj"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Usu\u0144 propozycj\u0119")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Usu\u0144 propozycj\u0119"]});
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
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Rynek walutowy")
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Obecne oferty")
    
    allElements = results.snapshotItem(0).children[4]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Poka\u017C oferty")
    
    allElements = results.snapshotItem(0).children[4]
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Zamie\u0144 waluty")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Kup walut\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Sprzedaj walut\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Poka\u017C oferty")
    
    allElements = results.snapshotItem(0).children[7]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Poradnik o rynku walutowym")
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Sprzedawca");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Ilo\u015B\u0107");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Stosunek");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Kup");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Ilo\u015B\u0107");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Stosunek"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Usu\u0144");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Brak ofert");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Twoje oferty") 
    
    allElements = results.snapshotItem(0).children[5]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Wy\u015Blij swoj\u0105 ofert\u0119")
    
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Zamie\u0144 waluty")
    
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Zaoferuj walut\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Kup walut\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Kurs wymiany")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Wy\u015Blij swoj\u0105 ofert\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Zaoferuj")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"po kursie")
    
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
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Rynek")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Wy\u015Blij swoj\u0105 ofert\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Kraj")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produkt")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Sztuk")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Cena")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Wy\u015Blij swoj\u0105 ofert\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Poka\u017C oferty na rynku");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Tw\u00F3j magazyn");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Twoje oferty na rynku")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produkt")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Sprzedawca");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Stock");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Cena");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Brutto");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Cena");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Netto");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Podatek importowy");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Usu\u0144");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Firmy");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Firma")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Produkt")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Region")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Pracownicy")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Stw\u00F3rz now\u0105 firm\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Nazwa firmy")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Produkt")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Avatar firmy")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Stw\u00F3rz firm\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Stworzenie firmy kosztuje")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"Firma zostanie stworzona w obecnej lokalizacji-regionie")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Lista region\u00F3w z zasobami")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Poradnik o firmach")
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Polityka krajowa");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Wybierz kraj");
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Prezydent");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"zobacz wybory");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Prezydent"]})
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Kongres");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Kongres"]})
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Wojny");
    tmp = allElements.children[21]
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Wojna");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Szczeg\u00F3\u0142y");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Nie ma wojen");
    tmp = allElements.children[22]
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Regu\u0142y wojny");
    tmp = allElements.children[23]
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Sojusze");
    tmp = allElements.children[27]
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Kraj");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Wygasa"); 
    tmp = allElements.children[27].children[0]
    var loopz = tmp.children.length   
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1]
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"sekund\u0119 ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"minut\u0119 ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"godzin\u0119 ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"dzie\u0144 ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"miesi\u0105c ");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 sekund ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 minut ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 godzin ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 dni ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 miesi\u0119cy ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Sojusze"]})
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Zapro\u015B znajomych");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Tw\u00F3j referrer link");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Wy\u015Blij ten link do innych ludzi \u017Ceby zdoby\u0107 dodatkowy");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Zyskujesz");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"Golda za ka\u017Cdego obywatela kt\u00F3ry zarejestruje si\u0119");
    tmp.innerHTML = tmp.innerHTML.replace(/and earn level 7/,"i zdob\u0119dzie poziom 7");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"po klikni\u0119ciu na ten link");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"i kolejne");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she get his\/her/,"Gold kiedy osi\u0105gnie sw\u00F3j");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"pierwszy medal");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Dodatkowo dostajesz");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% z golda otrzymanego przez gracza poprzez medale albo nast\u0119pne poziomy");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive additional/,"Uwaga, tw\u00F3j przyjaciel dostanie");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering from your invitation when he reach level 7/,"Golda za zapisanie si\u0119 z twojego linka kiedy osi\u0105gnie poziom 7");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Zaproszeni obywatele");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Sortuj wed\u0142ug");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Poka\u017C");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Obywatel");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Poziom");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Zdobyty gold");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Data rejestracji");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Statystyki");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Ca\u0142kowita liczba klikni\u0119\u0107 na link");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Unikalne klikni\u0119cia na link");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Ca\u0142kowita liczba zarejestrowanych z linka");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Obywatele, kt\u00F3rzy zdobyli poziom 7");
    tmp = allElements.children[14]
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Ostatnie klikni\u0119cia na link");
    tmp = allElements.children[15]
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Czas");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Strona odsy\u0142aj\u0105ca");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Obywatel");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Nie zarejestrowany");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Poka\u017C wi\u0119cej klikni\u0119\u0107");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"sekund\u0119 temu");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"minut\u0119 temu");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"godzin\u0119 temu");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"dzie\u0144 temu");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"miesi\u0105c temu");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 sekund temu");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 minut temu");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 godziny temu");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 dni temu");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 miesi\u0119cy temu");
            } 
        }
    }
}

function doPremium() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[7];
	tmp.innerHTML="<h2 style='text-align: center'>Konto premium</h2>"
		+ "<i>E-sim</i> jest gr\u0105 darmow\u0105 i wszyscy mog\u0105 w ni\u0105 gra\u0107 bez wydawania pieni\u0119dzy. Je\u015Bli jeste\u015B jednak fanem <i>E-sim</i>, mo\u017Cesz zam\u00F3wi\u0107 abonament na konto premium.<br/><br/>"
		+ "<u>Konto premium</u> da ci dost\u0119p do kilku ciekawych informacji i u\u017Cytecznych dodatk\u00F3w takich jak monitor bitew lub wysy\u0142anie wiadomo\u015Bci do wszystkich cz\u0142onk\u00F3w jednostki wojskowej<br>"
		+ "Dodatkowo inni gracze b\u0119d\u0105 widzie\u0107 <i>presti\u017Cowa gwiazd\u0119</i> na twoim profilu.<br/>"
		+ "Kupuj\u0105c <u>konto premium</u> r\u00F3wniez pomagasz nam w rozwoju <i>E-sim</i>!."
		+ "<br><br>";
	tmp = allElements.children[9]
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"Status Konta")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"Konto darmowe")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"Konto premium")
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"Przejd\u017A do")
    replaceLinkByHref({
		"#features":["Features","Dodatki"],
		"#payments":["Payments","P\u0142atno\u015B\u0107"],
		"#faq":["FAQ","Pytania"]
	});
	tmp = allElements.children[13]
	tmp.innerHTML = tmp.innerHTML.replace(/Features/,"Dodatki")
	tmp.innerHTML = tmp.innerHTML.replace(/Battle monitor/,"Monitor bitew")
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"Statystyki z podatk\u00F3w")
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Statystyki ze skarbca pa\u0144stwa")
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"Historia transakcji na rynku walutowym")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"Wysy\u0142anie wiadomo\u015Bci do cz\u0142onk\u00F3w jednostki wojskowej")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"Wysy\u0142anie wiadomo\u015Bci do cz\u0142onk\u00F3w partii")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/,"Brak reklam")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"Presti\u017Cowa gwiazda na twoim profilu")	
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="Wy\u015Bwietlanie obywatelstw graczy obserwuj\u0105cych dan\u0105 bitw\u0119 i bior\u0105cych w niej udzia\u0142"
	
    tmp = allElements.children[13].children[7]
	tmp.innerHTML="Tylko dla prezydenta i kongresmen\u00F3w: dostajesz dost\u0119p do informacji na temat przychod\u00F3w z podatk\u00F3w"
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="Tylko dla prezydenta i kongresmen\u00F3w: dostajesz dost\u0119p do informacji na temat skarbca pa\u0144stwa i waluty w obiegu"
	
	tmp = allElements.children[13].children[14]
	tmp.innerHTML="Dost\u0119p do historii transkacji na rynku walutowym dla wszystkich walut. Przydatne dla spekulant\u00F3w"
	
	tmp = allElements.children[13].children[17]
	tmp.innerHTML="Natychmiastowa wiadomo\u015B\u0107 do czlonkow jednostki wojskowej. Musisz mie\u0107 przywileje <u>commander</u>-a w twojej jednostce wojskowej \u017Ceby z tego skorzysta\u0107"
	tmp = allElements.children[13].children[19]
	tmp.innerHTML="Je\u015Bli jeste\u015B szefem partii, mo\u017Cesz wys\u0142ac wiadomo\u015B\u0107 do cz\u0142onk\u00F3w twojej partii"
	
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"P\u0142atno\u015Bci")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"Czas trwania")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Cena")
	tmp.innerHTML = tmp.innerHTML.replace(/One Month (30 days)/,"1 miesi\u0105c (30 dni)")
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
}