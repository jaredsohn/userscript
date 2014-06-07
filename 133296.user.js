// ==UserScript==
// @name           e-sim ITA
// @namespace      e-sim ITA
// @include        http://e-sim.org*
// @version	 	 1.0
// ==/UserScript==
//Italian translation by Kurtz Waiser


menuLinkReplacements = {
	"work.html"				:["Work","Lavoro"],
	"train.html"			:["Train","Allenamento"],
	"companies.html"		:["Companies","Aziende"],
	"newspaper.html"		:["Newspaper","Giornale"],
	"myParty.html"			:["Party","Partito Politico"],
	"contracts.html"		:["Contracts","Contratti"],
	"inviteFriends.html"	:["Invite friends","Invita Amici"],
	"myMilitaryUnit.html"	:["Military unit","Unità  Militari"],
	"subscription.html"     :["Premium account","Account Premium"],
	
	"productMarket.html"	:["Product market","Mercato Prodotti"],
	"jobMarket.html"		:["Job market","Mercato del Lavoro"],
	"monetaryMarket.html"	:["Monetary market","Mercato Monetario"],
	"companiesForSale.html"	:["Companies for sale","Aziende in vendita"],
	
	"countryStatistics.html"		:["Country statistics","Statistiche Nazionali"],
	"partyStatistics.html"			:["Party statistics","Partiti"],
	"newspaperStatistics.html"		:["Newspaper statistics","Giornali"],
	"citizenStatistics.html"		:["Citizen statistics","Giocatori"],
	"militaryUnitStatistics.html"	:["Military unit stats","Unità  Militari"],
	"donations.html"                :["Donations","Donazioni"],
        "fundRaising.html?id=4"         :["New modules","Nuovi Moduli"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Articoli Popolari"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Ultimi Articoli"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Eventi Militari"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Eventi Politici"],
	
	"battles.html"							:["Battles","Battaglie"],
	"countryPoliticalStatistics.html"		:["War and politics","Guerra e Politica"],
	"countryEconomyStatistics.html"			:["Economy","Economia"],
	"countryLaws.html"						:["Laws","Leggi"],
	"partyElections.html"					:["Party elections","Elezioni del Partito"],
	"congressElections.html"				:["Congress elections","Elezioni Congressuali"],
	"presidentalElections.html"				:["Presidential elections","Elezioni Presidenziali"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Cittadinanza"],
	"googleMap.html"						:["Map","Mappa"],
};


menuTextReplacements = {
	"myPlacesButton":["My places","I Miei Luoghi"],
	"marketButton":["Market","Mercati"],
	"statisticsButton":["Statistics","Statistiche"],
	"newsButton":["News","Notizie"],
	"electionsButton":["Country","Nazioni"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","Esci"],
	"workIcon"	:["Work","Lavoro"],
	"fightIcon"	:["Fight","Combatti!"],
	"avatarIcon":["Upload avatar","Carica un Avatar"],
	"voteIcon"	:["Vote","Vota"],
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Viaggia"],
	"pendingCitizenshipApplications.html"	:["change","Cambia"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Guida sulla Salute"],
	
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Mangia Cibo"],
	"useGiftLink":["Use gifts","Usa Regali"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Mangia CIbo"],
	"useGiftButton":["Use gift","Usa Regali"] 
};


hpTitleReplacements = {
	"News":["News","Notizie"],
	"Shouts":["Shouts","Shouts"],
	"Battles":["Battles","Battaglie"],
	"Events":["Events","Eventi"]
};


hpTabsReplacements = {
	"#topArticles":["Global","Globali"],
	"#latestArticles":["Latest","Ultime"],
	"#localArticles":["Local","Locali"],
	
	"#countryShouts":["Country","Nazionali"],
	"#friendsShouts":["Military unit","Unità  Militare"],
	"#myShouts":["Friends","Amici"],
	
	"#localBattles":["Country","Nazionali"],
	"#substidedBattles":["Subsidized","Finanziate"],
	"#hotBattles":["Important","Importanti"],

	"#localEvents":["Military","Militari"],
	"#globalEvents":["Military","Militari"],
	"#politicalEvents":["Political","Politici"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Poradnik o rynku walutowym"],
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 alleati");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"Nessun Alleato");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra di Resistenza");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Finanziamento:");
		tmp.innerHTML=tmp.innerHTML.replace(/(for)/,"ogni");
		tmp.innerHTML=tmp.innerHTML.replace(/(dmg)/,"danni");
		tmp.innerHTML=tmp.innerHTML.replace(/(left)/,"rimanenti");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"Nessun Alleato");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 sojusznik");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 alleati");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Finanziamento:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"secondo fa");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"minuti fa");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"ore fa");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"giorni fa");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"mesi fa");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 secondi fa");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 minuti fa");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 ore fa");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 giorni fa");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 mesi fa");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"Pubblicato $2 secondo fa");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"Pubblicato $2 minuti fa");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"Pubblicato $2 ore fa");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"Pubblicato $2 giorni fa");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"Pubblicato $2 mesi fa");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"Pubblicato $2 secondi fa");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"Pubblicato $2 minuti fa");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"Pubblicato $2 ore fa");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"Pubblicato $2 giorni fa");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"Pubblicato $2 mesi fa");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"secondo fa");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"minuti fa");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"ore fa");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"giorni fa");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"mesi fa");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 secondi fa");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 minuto fa");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 ore fa");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 giorni fa");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 mesi fa");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Ultimi");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"difensori:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"attaccanti:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Statistiche Round corrente");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Danno totale difensori:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"danno totale attaccanti:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Tuo danno:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Classifica Stati difensori:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Classifica Stati attaccanti:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Classifica MU difensori:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Classifica MU attaccanti:");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"scritto 1 secondo fa");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"scritto 1 minuto fa");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"scritto 1 ora fa");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"scritto 1 giorno fa");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"scritto 1 mese fa");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"scritto $2 secondi fa");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"scritto $2 minuti fa");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"scritto $2 ore fa");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"scritto $2 giorni fa");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"scritto $2 mesi fa");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Segnala"],
    "Delete":["Delete","Cancella"],
    "Edit":["Edit","Edytuj"],
    "More shouts":["More shouts","Wi\u0119cej shout(s)"]
});
	
	
replaceInputByValue({
    "Report":["Report","Segnala"],
    "Delete":["Delete","Cancella"],
    "Edit":["Edit","Edytuj"]
});	
	




//============================================================================
//Menu
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3]
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"<br>Traduzione Italiana a cura di <a href=\"http://e-sim.org/profile.html?id=7139\">Kurtz Waiser</a><br>Giorno")
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Livello: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Rango:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Pross. Rango");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Skill Economica:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Potenza:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Regione:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Cittadinanza:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Cibo Utilizzabile:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Regali Utilizzabili:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"I tuoi Soldi");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Inventario");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Messaggi");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Compiti Giornalieri:");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Round corrente");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Round $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Scegli tipo");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Scegli tipo");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Disarmato(");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Qualunque");
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
		"Show more battles":["Show more battles","Mostra altre battaglie"],
		"Subsidies informations":["Subsidies informations","Informazioni sui Finanziamenti"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"nessuna battaglia finanziata");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Ordini della tua MU:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Combatti per:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"$1 minuti fa");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"$1 ore fa");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"$1 giorni fa");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"$1 mesi fa");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 minuti fa");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 ore fa");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 giorni fa");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 mesi fa");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"ha difeso $2 nella battaglia contro ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"La popolazione di $2 ha scatenato una Guerra di Resistenza in $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"è stata attaccata da $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Il Presidente $2$3 ha proposto di dichiarare guerra a $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," ha dichiarato guerra a $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," ha conquistato $2, nella battaglia contro");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," ha un nuovo Presidente");
		//Money donation of 1810.0 TRY was accepted 
		allElements.innerHTML=allElements.innerHTML.replace(/( Money donation of)/g,"Una donazione di");
		allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/g,"è¨ stata approvata dal Congresso");
		allElements.innerHTML=allElements.innerHTML.replace(/(was proposed in congress )/g,"è¨ stata proposta al Congresso");
		//President of Turkey proposed to deploy Q3 Defense System in Turkey Black Sea Coast 
		allElements.innerHTML=allElements.innerHTML.replace(/( President of)/g,"Il Presidente di")
		allElements.innerHTML=allElements.innerHTML.replace(/( proposed to deploy)/g,"ha proposto di piazzare un bunker");
		allElements.innerHTML=allElements.innerHTML.replace(/( Defense System in )/g," in ");
		//Lithuania signed MPP with Turkey 
		allElements.innerHTML=allElements.innerHTML.replace(/( signed MPP with)/g,"ha firmato una tregua con")


		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Mostra altri eventi");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"<a href=\"http://cbe003.chat.mibbit.com/?channel=%23e-sim.it&server=rizon.mibbit.org\">CHAT italiana</a> || <a href=\"http://e-sim.org/article.html?id=14050\">Primi passi</a> || <a href=\"http://e-sim.org/article.html?id=11292\">GUIDA completa italiana</a><BR><BR>Scrivi uno shout");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Scrivi"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Scrivi a :");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Scrivi a :");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Nazione | $2  Unità  Militari | $4 Amici");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Shout Vecchi"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Mercato del Lavoro ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Parametri di ricerca:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Nazione:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Skill Economica:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Azienda");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Prodotto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Skill minima");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Stipendio");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Assumiti");
	
	replaceInputByValue({"Apply":["Apply","Assumiti"],"Show":["Show","Mostra"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Lavoro");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Sei disoccupato");
		replaceInputByValue({"Get a job now!":["Get a job now!","Prendi un nuovo lavoro!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Per lavorare devi essere nello Stato dove è¨ situata l'azienda");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Il tuo Posto di Lavoro");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Stipendio:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Licenziati");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Non hai ancora lavorato oggi");
			replaceInputByValue({"Work now":["Work now","Lavora adesso"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Risultati del lavoro di oggi");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Salario Lordo");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Salario Netto");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Tasse Pagate");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Lavorato presso");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained)/,"XP guadagnati");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Skill Economica guadagnata");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Giorni lavorati di fila");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Produttivitè  base");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Modificatori della Produttivitè ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Produttivitè  finale");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Unità  prodotte");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Qualità  dell'azienda raw");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Tutte"],
		"2":["Iron","Ferro"],
		"3":["Grain","Grano"],
		"4":["Oil","Petrolio"],
		"5":["Stone","Pietra"],
		"6":["Wood","Legno"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Armi"],
		"9":["House","Case"],
		"10":["Gift","Regali"],
		"11":["Food","Cibo"],
		"12":["Ticket","Biglietti"],
		"13":["DS","Bunker"],
		"14":["Hosp.","Osped."]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Mercato dei Prodotti");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Mostra Offerte");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Nazione:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Qualità :");
	
	replaceInputByValue({"View offers":["View offers","Vedi Offerte"],"Buy":["Buy","Compra"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Mostra le mie offerte / Aggiungi nuove offerte"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Prodotto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Venditore");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Quantità ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Prezzo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Compra");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," pezzi "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Mostra le mie offerte / Aggiungi nuove offerte"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","Informazioni sui Prodotti"]
	});
}
//============================================================================
//PROVA aziende in vendita
//============================================================================
function docompaniesForSale() {
	rr = {
		"1":["Any","Tutte"],
		"2":["Iron","Ferro"],
		"3":["Grain","Grano"],
		"4":["Oil","Petrolio"],
		"5":["Stone","Pietra"],
		"6":["Wood","Legno"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Armi"],
		"9":["House","Case"],
		"10":["Gift","Regali"],
		"11":["Food","Cibo"],
		"12":["Ticket","Biglietti"],
		"13":["DS","Bunker"],
		"14":["Hosp.","Osped."]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies for sale)/,"Aziende in Vendita");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Mostra Offerte");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Nazione:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Qualità :");
	
	replaceInputByValue({"View offers":["View offers","Vedi Offerte"],"Buy":["Buy","Compra"]});  // BOTTONI
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}

	tmp = allElements;
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Azienda");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Prodotto"); // PERCHè non va?
	tmp.innerHTML=tmp.innerHTML.replace(/(Location)/,"Regione");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Venditore");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Prezzo");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Compra");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Proprietario");

}

//============================================================================
//Train
//============================================================================
function doTrain() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Allenamento Militare");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Trenuj"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Allenamento completato. Torna domani!");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Oggi ti sei già  allenato. Torna domani!");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Oggi ti sei già  allenato. Torna domani!");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Potenza guadagnata:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Informazioni Militari");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Giorni totali di allenamento:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Potenza:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Rango:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Danno totale fatto:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Danno senza arma:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Danno con arma Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Danno con arma Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Danno con arma Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Danno con arma Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Danno con arma Q5:");
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Battaglie");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Nazione");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Ordine:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Solo Battaglie Finanziate:");
	
	replaceInputByValue({"Show battles":["Show battles","Mostra Battaglie"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Inizio");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Battaglie");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"difensore vs attaccante");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Punteggio");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Danno Totale");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Guerra di Resistenza");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"scatenata da");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Round $2");
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Round vinti dai difensori ");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"round vinti dagli attaccanti ");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Migliori Difensori");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Migliori Attaccanti");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Non puoi combattere qui dallo Stato dove ti trovi adesso");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"devi spostarti nello Stato occupante per partecipare");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Non puoi combattere qui dallo Stato dove ti trovi adesso");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Devi spostarti in uno degli Stati coinvolti");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Questo round è¨ stato vinto da:");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Seleziona Arma:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Scegli lo schieramento:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Il tuo schieramento:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Mostra Round:");
	}
	replaceInputByValue({"Show round":["Show round","Mostra Round"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Mostra statistiche complessive della Battaglia");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"Mostra MU che sostengono questa battaglia");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Guida al Combattimento");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Regole di Guerra");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Powr\u00F3t do Battaglie");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Statistiche s\u0105 od\u015Bwie\u017Cane co 30 sekund");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Statistiche Battaglie");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Cittadino ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Connesso");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Non Connesso");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Modifica Profilo"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Cambia Nome"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","Lista dei Trasferimenti"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Segnala Multiaccount"]
	});
	replaceInputByValue({"Report multi":["Report multi","Segnala Multiaccount"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Bannato Permanentemente");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Motivo:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Bannato da:");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Livello:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Danno Totale:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Rango:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Skill Economica:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Potenza:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Regione:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Cittadinanza:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Nascita:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Classifica nazionale per XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Classifica nazionale per danno totale:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Classifica globale per XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Classifica globale per danno totale");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Unità  Militare:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Partito:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Giornale:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Lavora presso:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Aziende possedute");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Incarico Politico:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Nessuna Unità  Militare");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Nessun Partito");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Nessun Giornale");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Disoccupato");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Nessuna Azienda");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Nessun Incarico");
	tmp.innerHTML=tmp.innerHTML.replace(/assets/,"puppamelo");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Debito(i) attivi");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"scadenza: giorno");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Amici");
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	tmp.innerHTML = tmp.innerHTML.replace(/Total achievements/,"Wszystkie osi\u0105gni\u0119cia")
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Top achievements/,"Najwa\u017Cniejsze osi\u0105gni\u0119cia");
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","osi\u0105gni\u0119cie 'Donor'"]});
	replaceLinkSSS({
		"See all achievements":["See all achievements","Poka\u017C wszystkie osi\u0105gni\u0119cia"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Nuova password:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Ripeti la nuova password:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"vecchia password:  :");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nuovo Avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","dimensioni massime; :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Cittadino");
	replaceInputByValue({"Edit citizen":["Edit citizen","Modifica Cittadino"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Viaggia");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Nazione");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Regione:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Qualità  biglietto:");
	
	replaceInputByValue({"Travel":["Travel","Viaggia"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Guida ai Viaggi"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Messaggi Ricevuti: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Messaggi Inviati: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Autore");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Messaggio");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Data");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Cancella");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"Destinatario");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Messaggi Inviati"],
		"composeMessage.html":["Compose message","Scrivi Messaggio"]
	});
	replaceInputByValue({
		"Delete":["Delete","Cancella"],
		"Quick reply":["Quick reply","Risposta veloce"],
		"Report":["Report","Segnala"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Segnala"],
		"Quick reply":["Quick reply","Risposta veloce"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Rispondi"],
		"conversation.html":["Previous messages","Messaggi precedenti"]
	});
	
}


//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Messaggi Ricevuti"],
		"composeMessage.html":["Compose Message","Scrivi"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Nuovo Messaggio");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Messaggi Ricevuti"],
		"sentMessages.html":["Sent messages","Messaggi Inviati"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Destinatario:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Oggetto:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Messaggio:");
	
	replaceInputByValue({
		"Send":["Send","Invia"],
		"Preview":["Preview","Anteprima"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Abbonamenti");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Abbonamenti");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Lista degli abbonamenti"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Abbonamento a Giornali");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Totale abbonati");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Giornale");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Data Abbonamento");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Poradnik o Giornalech"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Giornale");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Ultimi Articoli");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Modifica Giornale"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Poradnik o Giornalech"]
	});
	replaceInputByValue({
		"Publish":["Publish","Pubblica"],
		"Preview":["Preview","Anteprima"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Scrivi Nuovo Articolo");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Pubblica in");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Titolo:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Articolo:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Salva una copia del tuo articolo prima di pubblicarlo!");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Nome del Giornale:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nuovo Avatar:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max dimensioni:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Modifica Giornale"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Modifica Giornale"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Articolo");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Modifica Articolo"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Modifica Giornale"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Segnala"],
		"Edit":["Edit","Modifica"],
		"Delete":["Delete","Cancella"]
	});
	replaceInputByValue({
		"Publish":["Publish","Pubblica"],
		"Report":["Report","Segnala"],
		"Edit":["Edit","Modifica"],
		"Delete":["Delete","Cancella"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Lascia un Commento");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Commento:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Giornale");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Modifica");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Titolo:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Wiadomo\u015B\u0107:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Modifica Giornale"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Poradnik o Giornalech"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Modifica Giornale"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Contratti");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Contratti");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Ultimi 20 Contratti proposti");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"offerto a");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Nessun Contratto");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Ultimi 20 Contratti accettati");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"offerto a");
	tmp.innerHTML=tmp.innerHTML.replace(/offered by/g,"offerto da");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Nessun Contratto");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Contratti rifiutati");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Rifiutato da $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Nessuno Contratto");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Contratti Falliti");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Nessuno Contratto");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Prestiti Attivi");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Destinatario");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Data Limite");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Somma");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Cancella Debito");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Nessun Prestito");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Debiti");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Prestato da");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Data Limite");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Somma");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Paga Debito");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Nessun Debito");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Nome Contratto:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Guida ai Contratti"],
		"#":["Create new template","Crea Nuovo Modello"]
	});
	replaceInputByValue({
		"Delete":["Delete","Cancella"],
		"Create template":["Create template","Crea Modello"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Obblighi di $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Obblighi dell'amico")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Amico");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Obblighi $1")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," donerè  subito i seguenti Prodotti");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," donerè  subito le seguenti somme di Denaro");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," si farè  carico del seguente Debito");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"devono essere pagati entro il giorno $1$3$5 ($6 giorni dopo la firma del contratto) a"
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Contratti");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Contratto");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Stato del Contratto: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Accettato");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Rifiutato da $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Fallito");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Modello");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Aggiungi un nuovo elemento al Contratto");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Da parte di");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Tipo di elemento");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Amico");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Soldi"],
			"Product":["Product","Prodotto"],
			"Debt":["Debt","Debito"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Valuta: (");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Quantitè :");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Tipo di Prodotto:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualità  del Prodotto:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Ferro"],
			"Grain":["Grain","Grano"],
			"Oil":["Oil","Petrolio"],
			"Stone":["Stone","Pietra"],
			"Wood":["Wood","Legno"],
			"Diamonds":["Diamonds","Diamanti"],
			"Weapon":["Weapon","Armi"],
			"House":["House","Case"],
			"Gift":["Gift","Regali"],
			"Food":["Food","Cibo"],
			"Ticket":["Ticket","Biglietti"],
			"Defense System":["Defense System","Bunker"],
			"Hospital":["Hospital","Osped."]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Debito");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Valuta: (");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Data Limite:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Qualità  del Prodotto:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Proponi il Contratto");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Proponi a");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Nota:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Puoi proporre contratti solo ai tuoi amici");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Amico"],
		"contracts.html":["Go back to contract list","Torna alla lista dei Contratti"]
	});
	replaceInputByValue({
		"Delete":["Delete","Cancella"],
		"Propose":["Propose","Proponi"],
		"Add item":["Add item","Aggiungi"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Cancella Proposta")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Cancella Proposta"]});
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
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Mercato Monetario")
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Offerte correnti")
    
    allElements = results.snapshotItem(0).children[4]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Mostra Offerte")

	allElements = results.snapshotItem(0).children[4]
    replaceInputByValue({"Swap currencies":["Swap currencies","Inverti le valute"]})
    
    //allElements = results.snapshotItem(0).children[4]
    //tmp = allElements.children[2]
    //tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Inverti le valute")
	
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Valuta da comprare")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Valuta con cui pagare")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Mostra Offerte")
    
    allElements = results.snapshotItem(0).children[7]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Guida al Mercato Monetario")
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Venditore");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Quantitè ");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Tasso");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Compra");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Quantitè ");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Tasso"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Cancella");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Nessuna Offerta");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Tue Offerte") 
    
    allElements = results.snapshotItem(0).children[5]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Aggiungi nuova offerta")
    
    //tmp = allElements.children[2]
    //tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Inverti le Valute")
	replaceInputByValue({"Swap currencies":["Swap currencies","Inverti le Valute"]})

    
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Valuta in vendita")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Valuta richiesta")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Tasso di cambio")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Aggiungi nuova offerta")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Vendi")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"ad un tasso di ")
    
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
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Mercato Prodotti")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Aggiungi nuova offerta")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Nazione")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Prodotto")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Quantitè ")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Prezzo")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Aggiungi nuova offerta")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Mostra offerte del Mercato");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Magazzino");

    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Twoje oferty na rynku")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Prodotto")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Venditore");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Stock");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Prezzo");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Lordo");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Prezzo");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Netto");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Tassa d'Importazione");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Cancella");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Aziende");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Azienda")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Prodotto")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Regione")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Lavoratori")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Crea una nuova Azienda")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Nome Azienda")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Prodotto")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Avatar Azienda")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Crea Azienda")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Costo di creazione")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"La Azienda verrè  creata nella regione dove ti trovi adesso: ")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Lista delle risorse nelle regioni")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Guida sulle Aziende")
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Politica Nazionale");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Seleziona Nazione");
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Presidente");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"vedi elezioni");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Presidente"]})
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Congresso");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Congresso"]})
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
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Nazioni");
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
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 mesi");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Sojusze"]})
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Invita Amici");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Tuo referrer link");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Dai questo link ad altre persone per guadagnare");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Guadagni");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who registers/,"Gold per ogni cittadino che si registra");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"e raggiunge livello 7");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"cliccando su questo link");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"e altri");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she gets his\/her/,"Gold quando prende");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"la prima medaglia");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"In piè¹ tu guadagni");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"il 10% dei Gold ricevuti dal giocatore quando prende medaglie o aumenta di livello");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"Nota che anche il tuo amico guadagnerè ");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7/,"Gold in piè¹ del normale quando ragigungerè  livello 7 per essersi registrato col tuo referrer link");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Cittadini Invitati");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Elenca per");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Mostra");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Cittadino");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Livello");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Gold ricevuti");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Data Registrazione");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Statistiche");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Click totali sul referrer link");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Click unici sul referrer link");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Totale cittadini registrati");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Cittadini che hanno raggiunto livello 7");
    tmp = allElements.children[14]
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Ultimi click sul link");
    tmp = allElements.children[15]
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Tempo");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Provenienza");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Cittadino");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Non registrato");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Mostra piè¹ click");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"secondo fa");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"minuti fa");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"ore fa");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"giorni fa");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"mesi fa");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 secondi fa");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 minuti fa");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 ore fa");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 giorni fa");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 mesi fa");
            } 
        }
    }
}

function doPremium() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[7];
	tmp.innerHTML="<h2 style='text-align: center'>Account Premium</h2>"
		+ "<i>E-sim</i> è¨ un gioco gratuito e tutti possono giocare senza pagare niente. Tuttavia se sei un fan di E-sim potresti sostenerci trasformando il tuo account in un account Premium<br/><br/>"
		+ "L'<u>Account Premium</u> ti darè  accesso ad alcune informazioni interessanti e funzionalitè  utili come dettagli aggiuntivi nelle battaglie e messaggi di gruppo alla MU o al Partito. In aggiunta gli altri giocatori vedranno una <i>prestigiosa Stella</i> nel tuo profilo<br>"
		+ "Inoltre comprando un <u>Account Premium</u> ci supporti e aiuti lo sviluppo di E-sim!"
		+ "<br><br>";
	tmp = allElements.children[9]
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"Status dell'account")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"Account Gratuito")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"Account Premium")
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"Salta a")
    replaceLinkByHref({
		"#features":["Features","Vantaggi"],
		"#payments":["Payments","Pagamenti"],
		"#faq":["FAQ","Domande"]
	});
	tmp = allElements.children[13]
	tmp.innerHTML = tmp.innerHTML.replace(/Features/,"Dodatki")
	tmp.innerHTML = tmp.innerHTML.replace(/Battle monitor/,"Monitor bitew")
        tmp.innerHTML = tmp.innerHTML.replace(/Companies production reports/,"Raport z firm")
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"Statistiche z podatk\u00F3w")
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"Historia transakcji na rynku walutowym")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"Wysy\u0142anie wiadomo\u015Bci do cz\u0142onk\u00F3w jednostki wojskowej")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"Wysy\u0142anie wiadomo\u015Bci do cz\u0142onk\u00F3w partii")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/,"Brak reklam")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"Presti\u017Cowa gwiazda na twoim profilu")	
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="Wy\u015Bwietlanie obywatelstw graczy obserwuj\u0105cych dan\u0105 bitw\u0119 i bior\u0105cych w niej udzia\u0142"
	
        tmp = allElements.children[13].children[7]
	tmp.innerHTML="Dodatkowe narz\u0119dzia do obliczenia Prodottoywno\u015Bci swoich firm"
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="Tylko dla prezydenta i kongresmen\u00F3w: dostajesz dost\u0119p do informacji na temat przychod\u00F3w z podatk\u00F3w"

        tmp = allElements.children[13].children[14];
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Statistiche ze skarbca pa\u0144stwa")	
	
	tmp = allElements.children[13].children[15]
	tmp.innerHTML="Tylko dla prezydenta i kongresmen\u00F3w: dostajesz dost\u0119p do informacji na temat skarbca pa\u0144stwa i waluty w obiegu"
	
	tmp = allElements.children[13].children[18]
	tmp.innerHTML="Dost\u0119p do historii transkacji na rynku walutowym dla wszystkich walut. Przydatne dla spekulant\u00F3w"
	tmp = allElements.children[13].children[21]
	tmp.innerHTML="Natychmiastowa wiadomo\u015B\u0107 do czlonkow jednostki wojskowej. Musisz mie\u0107 przywileje <u>commander</u>-a w twojej jednostce wojskowej \u017Ceby z tego skorzysta\u0107"
	
	tmp = allElements.children[13].children[23]
	tmp.innerHTML="Je\u015Bli jeste\u015B szefem partii, mo\u017Cesz wys\u0142ac wiadomo\u015B\u0107 do cz\u0142onk\u00F3w twojej partii"
	
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"P\u0142atno\u015Bci")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"Czas trwania")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Prezzo")
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
	tmp.innerHTML="Tak - musisz stworzy\u0107 konto paypal, polaczy\u0107 je z twoja kart\u0105 kredytow\u0105 i zaplaci\u0107 za Account Premium z konta paypal"
	tmp = allElements.children[17].children[3]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Czy mog\u0119 kupi\u0107 Account Premium dla przyjaciela?"
	tmp = allElements.children[17].children[4]
	tmp.innerHTML="Tak, mo\u017Cesz kupi\u0107 Account Premium dla kogo\u015B innego. Musisz tylko podda\u0107 nick jego obywatela przy zam\u00F3wieniu"
	tmp = allElements.children[17].children[5]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Czy strac\u0119 Account Premium je\u015Bli anuluj\u0119 abonament?"
	tmp = allElements.children[17].children[6]
	tmp.innerHTML="Nie natychmiastowo. Anulowanie abonamentu oznacza, \u017Ce pieni\u0105dze nie b\u0119d\u0105 pobierane z twojego konta paypal co 30 dni. Je\u015Bli anulowale\u015B abonament, b\u0119dziesz mia\u0142 Account Premium a\u017C do wyga\u015Bni\u0119cia aktualnej umowy"
	tmp = allElements.children[17].children[7]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Mam inne pytania..."
	tmp = allElements.children[17].children[8]
	tmp.innerHTML="Mo\u017Cesz spyta\u0107 wysy\u0142aj\u0105c  <a href=\"composeMessage.html?id=1\">wiadomo\u015B\u0107</a> albo spyta\u0107 innych graczy na <a target=\"_blank\" href=\"http://forum.e-sim.org/viewforum.php?f=43\">forum</a>"
	
	
}

function doDonations() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[2];
    replaceInputByValue({"Show":["Show","Mostra"]});
	tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/If you enjoy playing <i>e-sim<\/i> and would like to support development of the game with donation, please use the donate button./,"Se ti piace giocare ad E-sim e vorresti aiutare lo sviluppo del gioco con una donazione, usa la funzione Donate")
	tmp.innerHTML = tmp.innerHTML.replace(/Your donation will be visible to everyone on this page/,"La tua donazione sarè  visibile a tutti in questa pagina")
	tmp.innerHTML = tmp.innerHTML.replace(/Donors, who make 2 EUR donations will receive bonus/,"I donatori che daranno almeno 2 EUR riceveranno in premio il successo")
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","Donatore"]});
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
} else if (isTargetHtml("/notifications.html")) {
	doNotifications();
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
} else if (isTargetHtml("/companiesForSale.html")) {
	docompaniesForSale();
}