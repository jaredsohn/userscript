// ==UserScript==
// @name           e-sim DE
// @namespace      e-sim DE
// @include        http://*.e-sim.org*
// @grant          none
// ==/UserScript==
//Deutsche Übersetzung von LordMcMoney

menuLinkReplacements = {
	"work.html"				:["Work","Arbeiten"],
	"train.html"			:["Train","Trainieren"],
	"equipment.html"		:["Equipment","Ausrüstung"],
	"companies.html"		:["Companies","Firmen"],
	"newspaper.html"		:["Newspaper","Zeitung"],
	"myParty.html"			:["Party","Partei"],
	"contracts.html"		:["Contracts","Verträge"],
	"myShares.html"		    :["Shares","Aktien"],
	"myAuctions.html"		:["Auctions","Auktionen"],
	"inviteFriends.html"	:["Invite friends","Freunde einladen"],
	"myMilitaryUnit.html"	:["Military unit","Militäreinheit"],
	"subscription.html"     :["Premium account","Premiumkonto"],
	
	"productMarket.html"	:["Product market","Warenmarkt"],
	"jobMarket.html"		:["Job market","Arbeitsmarkt"],
	"monetaryMarket.html"	:["Monetary market","Währungsmarkt"],
	"auctions.html"		    :["Auctions","Auktionen"],
	"stockMarket.html"	    :["Stock market","Aktienmarkt"],
	"companiesForSale.html"	:["Companies for sale","Firmenmarkt"],
	"specialItems.html"		:["Special items","Extra Items"],
	
	"countryStatistics.html"		:["Country statistics","Länderstatistiken"],
	"partyStatistics.html"			:["Party statistics","Parteistatistiken"],
	"newspaperStatistics.html"		:["Newspaper statistics","Zeitungsstatistiken"],
	"citizenStatistics.html"		:["Citizen statistics","Bürgerstatistiken"],
	"militaryUnitStatistics.html"	:["Military unit stats","Militärstatistiken"],
	"stockCompanyStatistics.html"	:["Stock market stats","Aktienmarktstatistiken"],
	"donations.html"                :["Donations","Spenden"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Top Artikel"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Neueste Artikel"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Militärische Ereignisse"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Politische Ereignisse"],
	
	"battles.html"							:["Battles","Schlachten"],
	"countryPoliticalStatistics.html"		:["War and politics","Krieg und Politik"],
	"countryEconomyStatistics.html"			:["Economy","Wirtschaft"],
	"countryLaws.html"						:["Laws","Gesetze"],
	"partyElections.html"					:["Party elections","Parteiwahlen"],
	"congressElections.html"				:["Congress elections","Kongresswahlen"],
	"presidentalElections.html"				:["Presidential elections","Präsidentswahlen"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Staatsbürgerschaften"],
	"googleMap.html"						:["Map","Weltkarte"]
};

menuTextReplacements = {
	"myPlacesButton":["My places","Mein eSim"],
	"marketButton":["Market","Märkte"],
	"statisticsButton":["Statistics","Statistiken"],
	"newsButton":["News","Nachrichten"],
	"electionsButton":["Country","Staatsangelegenheiten"]
};

hpTitleReplacements = {
	"News":["News","Nachrichten"],
	"Shouts":["Shouts","Kurznachricht"],
	"Battles":["Battles","Schlachten"],
	"Events":["Events","Ereignisse"]
};

hpTabsReplacements = {
	"#topArticles":["Global","Global"],
	"#latestArticles":["Latest","Neueste"],
	"#localArticles":["Local","Lokal"],
	
	"#countryShouts":["Country","Staat"],
	"#friendsShouts":["Military unit","Militäreinheit"],
	"#myShouts":["Friends","Freunde"],
	
	"#localBattles":["Country","Staat"],
	"#substidedBattles":["Subsidized","Söldner"],
	"#hotBattles":["Important","Wichtige"],

	"#localEvents":["Military","Militärisch"],
	"#globalEvents":["Military","Militärisch"],
	"#politicalEvents":["Political","Polit."]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Währungsmarkt Tutorial"],
};

//---------------------------------------------------
//FireFox
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;

function getElements(obj, k) {
	return document.evaluate(k, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getAndReplaceNode(startNode,textToReplaceList){
	var currentNode;
	for (xpath in textToReplaceList) {
		currentNode = document.evaluate(xpath, startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
		if(currentNode!=null){
			for (var i = 0; i<textToReplaceList[xpath].length; i+=2){		
				currentNode.innerHTML = currentNode.innerHTML.replace(textToReplaceList[xpath][i],textToReplaceList[xpath][i+1]);
			}
		}
	}
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

function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"vor einer Sekunde");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"vor einer Minute");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"vor einer Stunde");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"gestern");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"letzten Monat");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"vor $1 Sekunden");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"vor $1 Minuten");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"vor $1 Stunden");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"vor $1 Tagen");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"vor $1 Monaten");
        }
    }
}

//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"vor einer Sekunde");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"vor einer Minute");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"vor einer Stunde");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"gestern");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"letzten Monat");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"vor $2 Sekunden");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"vor $2 Minuten");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"vor $2 Stunden");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"vor $2 Tagen");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"vor $2 Monaten");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"vor einer Sekunde");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"vor einer Minute");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"vor einer Stunde");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"gestern");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"letzen Monat");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"vor $2 Sekunden");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"vor $2 Minuten");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"vor $2 Stunden");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"vor $2 Tagen");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"vor $2 Monaten");
    }
    
}

function replaceBattleTab() {
	replaceAlliesList("alliesLink");
	replaceAlliesList("alliesLink2");
	replaceNoAlliesAndOtherInfo();
}

function replaceAlliesList(k) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='" + k + "']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 Allianzen");
	}
}

function replaceNoAlliesAndOtherInfo() {
	results = getElements(document, "//div[@class='battleDiv']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp=results.snapshotItem(i).children[0];
		if (tmp.innerHTML.match("no allies")) {
			tmp=tmp.childNodes[3];
			tmp.nodeValue=tmp.nodeValue.replace(/no allies/,"keine Allianzen");
		}
		tmp=results.snapshotItem(i).children[2];
		if (tmp.innerHTML.match("no allies")) {
			tmp=tmp.childNodes[3];
			tmp.nodeValue=tmp.nodeValue.replace(/no allies/,"keine Allianzen");
		}

		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Resistance war/,"Widerstandsschlacht");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Subsidies/,"Sold");
		tmp.innerHTML=tmp.innerHTML.replace(/none/g,"keine");
		tmp.innerHTML=tmp.innerHTML.replace(/for/g,"für");
	}
}

//---------------------------------------------------
//  Shouts
//---------------------------------------------------
function doShoutsComm() {
	results = getElements(document, "//b[@style='color: #222']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match(/[\d\.]+/g)== 1) {		
		    if (obj.innerHTML.match("second")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"vor einer Sekunde");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"vor einer Minute");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"vor einer Stunde");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"gestern");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"letzen Monat");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"vor $2 Sekunden");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"vor $2 Minuten");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"vor $2 Stunden");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"vor $2 Tagen");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"vor $2 Monaten");
                } 
        }
    }
}   

replaceLinkByHrefSSS("#", {
    "Report":["Report","Melden"],
    "Delete":["Delete","Löschen"],
    "Edit":["Edit","Bearbeiten"],
	"Vote":["Vote","Voten"],
	"Comment":["Comment","Kommentieren"],
});
 
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
	
	replaceBattleTab();
	
	replaceLinkSSS({
		"Show more battles":["Show more battles","Mehr Schlachten anzeigen"],
		"Subsidies informations":["Subsidies informations","Söldnerinformationen"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Keine Soldschlachten");
        }	
    }
	
	//ToDO
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Deine Kampfbefehle:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Kämpfe für:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"vor einer Minute");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"vor einer Stunde");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"gestern");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"letzen Monat");
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
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"sicherte $2 in der Schlacht gegen");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Die Bevölkerung von $2 startete einen Wiederstandkrieg in $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"wurde von $2$3 angegriffen");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Der Präsident von $2$3 hat einen Krieg mit $5$6 vorgeschlagen");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," hat $2$3 den Krieg erklärt");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," eroberte $2 in dem Krieg gegen");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," hat einen neuen Präsidenten");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Mehr Ereignisse anzeigen");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Kurznachricht schreiben:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Abschicken"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Kanäle:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Kanäle:");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Staat | $2  Militäreinheit | $4 Freunde");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Mehr Kurznachrichten"] });
}

//============================================================================
//Menu OK
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	dayInGameReplacement = {
		"./td[3]/table/tbody/tr/td/b[2]"	:[/(day)/,"Tag"]	
	};
	var mainNode;
	mainNode = document.getElementById('headerRow');
	getAndReplaceNode(mainNode,dayInGameReplacement);
}

//============================================================================
//Side OK
//============================================================================
function doSide() {
	var sideLink1Replacements = {
		"crossIcon"	:["Logout","Ausloggen"],
		"workIcon"	:["Work","Arbeiten"],
		"fightIcon"	:["Fight","Kämpfen"],
		"avatarIcon":["Upload avatar","Avatar hochladen"],
		"voteIcon"	:["Vote","Voten"],
	};
	var sideLink2Replacements = {
		"travel.html"	:["Travel","Reisen"],
		"pendingCitizenshipApplications.html"	:["change","wechseln"],
		"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Gesundheittut."],
	};

	var sideLink3Replacements = {
		"eatLink"	:["Eat food","Essen"],
		"useGiftLink":["Use gifts","Geschenke benutzen"],
		"showCurrencies":["Show more currencies","Alle Währungen anzeigen"]
	};

	var sideLink4Replacements = {
		"eatButton":["Eat Food","Essen"],
		"useGiftButton":["Use gift","Geschenk benutzen"] 
	};
	
	var sideTextXPathReplacements = {
		"./div[1]/div/h4"	:[/(Your today's tasks)/,"Deine heutigen Aufgaben"],
		"./div[1]/div[2]/b"	:[/(Level)/,"Level"],
		"./div[1]/div[3]/b"	:[/(Rank)/,"Rang"],
		"./div[2]/h4[1]"	:[/(Your money)/,"Dein Geld"],	
		"./div[2]/h4[2]"	:[/(Your inventory)/,"Dein Inventar"],
		"./div[3]/h4"		:[/(Your messages)/,"Deine Nachrichten"]		
	};
	var sideText2XPathReplacements = {
		"./div[2]/b[1]"		:[/(Next rank)/,"Nächster Rang"],
		"./div[3]/b[1]"		:[/(Health:)/,"Gesundheit: "],
		"./b[1]"			:[/(Economy skill)/,"Arbeitsskill"],
		"./b[2]"			:[/(Strength)/,"Stärke"],
		"./b[3]"			:[/(Location)/,"Region"],
		"./b[4]"			:[/(Citizenship)/,"Staatsbürgerschaft"],
		"./b[5]"			:[/(Food limit)/,"Essenslimit"],
		"./b[6]"			:[/(Gift limit)/,"Geschenklimit"]
	};
	
	var mainNode;
	mainNode = document.getElementById('userMenu');
	getAndReplaceNode(mainNode,sideTextXPathReplacements);

	mainNode = document.getElementById('stats');
	getAndReplaceNode(mainNode,sideText2XPathReplacements);
	
	replaceSpanByClass(sideLink1Replacements);
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Food type")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Essenstyp");
		} else if (obj.innerHTML.match("Gift type")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Geschenktyp");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/(\d*) left/,"vorhanden: $1");
			obj.innerHTML=obj.innerHTML.replace(/(Food)/,"Essen");
			obj.innerHTML=obj.innerHTML.replace(/(Gift)/,"Geschenk");
		} 
	}
}

//============================================================================
//Profile OK
//============================================================================
function doProfile() {
	var citizenProfileReplacements = {
		"./td[2]/div/div[1]/h2"							:[/(Citizen)/,"Bürger"],
		"./td[2]/div/div[1]/b"							:[/(Online)/,"Online"],
		"./td[2]/div/div[1]/b"							:[/(Offline)/,"Offline"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[1]"	:[/(Permanently banned)/,"Dauerhaft gebannt"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[2]/b"	:[/(Reason)/,"Grund"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[3]/b"	:[/(Banned by)/,"Gebannt von"],
		"./td[2]/table/tbody/tr/td[1]"					:[/(Premium account)/,"Premiumaccount",
														/(None)/,"Keine",
														/(Level)/,"Level",
														/(Damage)/,"Schaden",
														/^Rank$/,"rang",
														/(Economy skill)/,"Arbeitsskill",
														/(Strength)/,"Stärke",
														/(Location)/,"Region",
														/(Citizenship)/,"Staatsbürgerschaft",
														/(Birthday)/,"Geburtstag",
														/(Ranks)/,"Ränge",
														/(National by XP)/,"Nationaler Rang nach XP",
														/(National by DMG)/,"Nationaler Rang nach DMG",
														/(Global by XP)/,"Globaler Rang nach XP",
														/(Global by DMG)/,"Globaler Rang nach DMG",
														/(Military unit)/,"Militäreinheit",
														/(Party)/,"Partei",
														/(Newspaper)/,"Zeitung",
														/(Working at)/,"Arbeitet bei",
														/(Owned companies)/,"Firmen im Besitz",
														/(Political office)/,"Politisches Amt",
														/(No military unit)/,"Keine Militäreinheit",
														/(No party)/,"Keine Partei",
														/(No newspaper)/,"Keine Zeitung",
														/(No work)/,"Keine Arbeit",
														/(No companies)/,"Keine Firmen",
														/(No office)/,"Kein Amt"]
	};

	var mainNode;
	mainNode = document.getElementById('contentRow');
	getAndReplaceNode(mainNode,citizenProfileReplacements);

	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Profil ändern"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Name ändern"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","Handelslog"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Multi melden"]
	});
	replaceInputByValue({"Report multi":["Report multi","Multi melden"]});

	doShoutsComm();
	
}

//============================================================================
//Battle OK
//============================================================================
function doBattle() {
	var battle1Replacements = {
		"./td[2]/div/div/div[1]"	:[/(Resistance war)/,"Widerstandskrieg",/(started by)/,"gestartet von"],
		"./td[2]/div/div/div[2]"	:[/(no allies)/,"keine Allianzen",/(\d*)( allies)/,"$1 Allianzen"],
		"./td[2]/div/div/div[4]"	:[/(Round )(\d*)/,"Runde $2"],
		"./td[2]/div/div/div[5]"	:[/(no allies)/,"keine Allianzen",/(\d*)( allies)/,"$1 Allianzen"],
		//"./td[2]/div/div/div[10]"	:[/Rounds won by defender/,"Rundy wygrane przez obro\u0144c\u00F3w"],
		//"./td[2]/div/div/div[11]"	:[/Rounds won by attacker/,"Rundy wygrane przez napastnik\u00F3w"], NOT WORKING WITH PREMIUM
		"./td[2]/div/div/div[8]/b"	:[/(Defenders' total damage)/,"Gesammtschaden Verteidiger"],
		"./td[2]/div/div/div[9]/b"	:[/(Attackers' total damage)/,"Gesammtschaden Angreifer"],
		"./td[2]/div/div/div[10]/b"	:[/(Total attackers online)/,"Angreifer online"],
		"./td[2]/div/div/div[11]/b"	:[/(Total defenders online)/,"Verteidiger online"],
		"./td[2]/div/div/b"			:[/(Total spectators online)/,"Zuschauer online"],
		"./td[2]/table[1]" 			:[/(Top defenders)/,"Beste Verteidiger",
									/(Top attackers)/,"Beste Angreifer",
									/(\d*)( available)/g,"$1 vorhanden",
									/(Select weapon)/,"Waffe auswählen",
									/(Unarmed)/,"waffenlos",
									/(Select your side)/,"Wähle deine Seite aus",
									/(Show round)/,"Zeige Runde",
									/(This round was won by)/,"Diese Runde wurde gewonnen von:",
									/(You can't fight in this battle from your current location)/,"Du kannst von deiner momentanen Postion aus nicht an dieser Schlacht teilnehmen",
									/(You must travel to the occupant country to participate in the battle)/,"Du musst in das land des Besetzers reisen um ander Schlacht teizunehmen"],		
		"./td[2]/table[2]" 			:[/Recent<br>defenders/,"Momentane Verteidiger",
									/Recent<br>attackers/,"Momentane Angreifer",
									/(Current round statistics)/,"Statistiken der aktuellen Runde",
									/(Your damage)/,"Dein Schaden",
									/(Top defending countries)/,"Beste verteidigene Länder",
									/(Top attacing countries)/,"Beste angreifende Länder",
									/(Top defending military units)/,"Beste verteidigene Militäreinheiten",
									/(Top attacking military units)/,"Beste angreifende Militäreinheiten",
									/(Show overall battle stats)/,"Statistiken der gesammten Schlacht",
									/(Show military units supporting this battle)/,"Zeige die partiziepierenden Militäreinheiten an"]
	};

	var battleLinks1Replacements = {
		"http://wiki.e-sim.org/index.php/Fighting"		:["Fighting tutorial on wiki","Kampftutorial"],
		"http://wiki.e-sim.org/index.php/Battle"		:["Battle rules","Schlachtregeln"]
	}
	
	var mainNode;
	mainNode = document.getElementById('contentRow');
	getAndReplaceNode(mainNode,battle1Replacements);
	
	var premiumSpec = document.getElementById("spectatorsLink");
	if (premiumSpec){
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"Zeige Details an");
		premiumSpec=document.getElementById("defendersLink");
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"Zeige Details an");
		premiumSpec=document.getElementById("attackersLink");
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"Zeige Details an");
	}
	replaceInputByValue({"Show round":["Show round","Zeige Runde an"]});
	
	replaceLinkByHref(battleLinks1Replacements);
	
}
	
//============================================================================
//Battle Statistics OK
//============================================================================
function doBattleStatistics() {
	var battleStats1Replacements = {
		"./td[2]/div[1]"	:[/(Resistance war)/,"Widerstandskrieg",
							/(started by)/,"gestartet von",
							/(Back to battle)/,"Zurück zur Schlacht",
							/(no allies)/,"keine Allianzen",
							/(\d*)( allies)/,"$1 Allianzen",
							/(Round )(\d*)/,"Runde $2",
							/(Rounds won by defender)/,"gewonnende Runden vom Verteidiger",
							/(Rounds won by attacker)/,"gewonnende Runden vom Angreifer"],
		"./td[2]/div[2]" 	:[/(Battle statistics)/,"Schlachtstatistiken",
							/(Statistics are generated once per 30 minutes)/,"Statistiken werden alle 30 min generiert",
							/(Your damage)/,"Dein Schaden",
							/(Top defending countries)/,"Beste verteidigene Länder",
							/(Top attacing countries)/,"Beste angreifende Länder",
							/(Top defending military units)/,"Beste verteidigene Militäreinheiten",
							/(Top attacking military units)/,"Beste angreifende Militäreinheiten",
							/(Defenders' total damage)/,"Gesammtschaden der Verteidiger",
							/(Attackers' total damage)/,"Gesammtschaden der Angreifer"]
	};

	var battleLinks1Replacements = {
		"http://wiki.e-sim.org/index.php/Fighting"		:["Fighting tutorial on wiki","Kampftutorial"],
		"http://wiki.e-sim.org/index.php/Battle"		:["Battle rules","Schlachtregeln"]
	}
	var mainNode;
	mainNode = document.getElementById('contentRow');
	getAndReplaceNode(mainNode,battleStats1Replacements);

}

//============================================================================
//Product Markets OK
//============================================================================
function doProductMarkets() {
	var rr = {
		"1":["Any","Alle"],
		"2":["Iron","Eisen"],
		"3":["Grain","Getreide"],
		"4":["Oil","Öl"],
		"5":["Stone","Stein"],
		"6":["Wood","Holz"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Waffen"],
		"9":["House","Haus"],
		"10":["Gift","Geschenke"],
		"11":["Food","Essen"],
		"12":["Ticket","Tickets"],
		"13":["DS","Verteid. Sys."],
		"14":["Hosp.","Krankenhaus"],
		"15":["Est.","Tresor"]
	};
	
	var market1Replacements = {
		"./h1"								:[/(Marketplace)/,"Warenmarkt"],
		"./div[1]/b"							:[/(Show Offers)/,"Angebote anzeigen"],
		"./div[2]/table/tbody/tr[1]/td[1]"	:[/(Product)/,"Produkt"],
		"./div[2]/table/tbody/tr[1]/td[2]"	:[/(Seller)/,"Verkäufer"],
		"./div[2]/table/tbody/tr[1]/td[3]"	:[/(Stock)/,"Bestand"],
		"./div[2]/table/tbody/tr[1]/td[4]"	:[/(Price)/,"Preis"],
		"./div[2]/table/tbody/tr[1]/td[5]"	:[/(Buy)/,"Kaufen"]	
	};
	
	var market2Replacements = {
		"."					:[/(Quality)/,"Qualität",/(Country)/,"Land"]		
	};
	
	var mainNode;
	mainNode = document.getElementById('contentRow').children[1];
	getAndReplaceNode(mainNode,market1Replacements);

	var mainNode;
	mainNode = document.getElementById('productMarketViewForm');
	getAndReplaceNode(mainNode,market2Replacements);
	
	replaceInputByValue({"View offers":["View offers","Angebote anzeigen"],"Buy":["Buy","Kaufen"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Zeige meine Angebote / Neues Angebot erstellen"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","Produkt Infos"]
	});
	
}

//============================================================================
//Job Market Working but needs to be changed
//============================================================================
function doJobMarket() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Arbeitsmarkt");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Auswahlkriterien");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Land:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Arbeitsskill:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Arbeitsgeber");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Firma");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produkt");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Minimumskill");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Gehalt");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"");
	
	replaceInputByValue({"Apply":["Apply","Anfangen"],"Show":["Show","Anzeigen"]});
}

//============================================================================
//Work OK
//============================================================================
function doWork() {
	var work1Replacements = {
		"."					:[/(Work)/,"Arbeit",
							/(You have no job)/,"Du hast keinen Job",
							/(Your workplace)/,"Dein Arbeitsplatz",
							/(Employer)/,"Arbeitgeber",
							/(Salary)/,"Gehalt",
							/(Leave job)/,"Kündigen",
							/(You have not worked today)/,"Du hast heute noch nicht gearbeitet",
							/(You have to stay in company for at least 6 hours before you will be able to resign)/,"Du musst mindestens 6 Stunden in der Firma verbleiben bevor du kündigen kannst",
							/(Today work results)/,"Dein heutiges Arbeitsresultat"] // not in .attributesTable
	};
	
	var work2Replacements = {
		".//table[contains(@class,'attributesTable')]" 	:[/(Your Gross salary)/,"Bruttogehalt",
														/(Your Net salary)/,"Nettogehalt",
														/(Income tax paid)/,"Einkommenssteuer",
														/(Worked at)/,"Gearbeitet bei",
														/(XP gained)/,"XP bekommen",
														/(Economy skill gained)/,"Erhaltener Arbeitsskill",
														/(Working days in a row)/,"Arbeitstage in einer Reihe",
														/(Your base productivity)/,"Deine Basisproduktivität",
														/(Productivity modifiers)/,"Produktivitätsmodifizierer",
														/(Total productivity)/,"Gesammtproduktivität",
														/(Units produced)/,"Einheiten produziert",
														/(Raw company quality)/,"Stufe der Rohstofffirma"]
	};

	var mainNode;
	mainNode = document.getElementById('contentRow').children[1];
	getAndReplaceNode(mainNode,work1Replacements);

	getAndReplaceNode(mainNode,work2Replacements);
	
	replaceInputByValue({
						"Get a job now!":["Get a job now!","Such dir einen Job!"], 
						"Work now":["Work now","Arbeiten"] 
	});

}

//============================================================================
//Train OK
//============================================================================
function doTrain() {
	var train1Replacements = {
		"."					:[/(Military training)/,"training",
							/(Training complete. Please come back tomorrow)/,"Training beendet. Bitte komme morgen wieder",
							/(You have already trained today. Please come back tomorrow)/,"Du hast heute bereits trainiert. Bitte komme morgen wieder",
							/(Strength gained)/," Stärke erhalten",
							/(Equipment Stats)/,"Ausrüstungswerte",
							/(Damage)/,"Schaden",
							/(Critical Hit)/,"Kritischer Schaden",
							/(Critical Hit chance)/,"Chance für Krits",
							/(Miss chance)/,"Fehlrate",
							/(Chance to avoid DMG)/,"Chance zum HPErhalt"]
	};
	
	var train2Replacements = {
		".//table[contains(@class,'attributesTable')]" 	:[/(Military details)/,"Schadensdetails",
														/(Total training sessions:)/,"Anzahl Trainingssessions:",
														/(Strength:)/,"Stärke:",
														/(Military rank:)/,"Militärrang:",
														/(Total damage done:)/,"Bisheriger Gesammtschaden:",
														/(Damage with no weapon:)/,"Schaden ohne Waffen:",
														/(Damage with Q1 weapon:)/,"Schaden mit Q1 Waffen:",
														/(Damage with Q2 weapon:)/,"Schaden mit Q2 Waffen:",
														/(Damage with Q3 weapon:)/,"Schaden mit Q3 Waffen:",
														/(Damage with Q4 weapon:)/,"Schaden mit Q4 Waffen:",
														/(Damage with Q5 weapon:)/,"Schaden mit Q5 Waffen:"]
	};

	var mainNode;
	mainNode = document.getElementById('contentRow').children[1];
	getAndReplaceNode(mainNode,train1Replacements);

	getAndReplaceNode(mainNode,train2Replacements);
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Schlachten");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Sortierung:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Nur besoldete Schalchten:");
	
	replaceInputByValue({"Show battles":["Show battles","Zeige Schlachten"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Schlachtbeginn");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Schlacht");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"Verteidiger vs Angreifer");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Wertung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Gesammtschaden");
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Sorting by total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by total damage)/,"Sortiert nach Totalschaden");
		} else if (obj.innerHTML.match("Sorting by start time")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by start time)/,"Sortiert nach Startzeit");
		} else if (obj.innerHTML.match("Sorting by subsidy size")) {
			obj.innerHTML=obj.innerHTML.replace(/(Sorting by subsidy size)/,"Sortiert nach Subventionsgröße");
		} 
		
	}

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
}

//============================================================================
//Edit Citizen
//============================================================================
function doEditCitizen() {

	allElements = document.getElementById('editCitizen');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"Email:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Neues Passwort:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Wiederholung Passwort:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Altes Passwort:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Neuer Avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max. Größe:");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Bürger");
	replaceInputByValue({"Edit citizen":["Edit citizen","Ändern"]});
	
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Reisen");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Land");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Region:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Ticketqualität:");
	
	replaceInputByValue({"Travel":["Travel","Reisen"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Reisetutorial"]
	});
}

//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Nachrichten von");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Author");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Nachricht");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Datum");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Löschen");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"zu");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
//		alert(i);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Gesendete Nachrichten"],
		"composeMessage.html":["Compose message",""]
	});
	replaceInputByValue({
		"Delete":["Delete","Löschen"],
		"Quick reply":["Quick reply","Schnelle Antwort"],
		"Report":["Report","Melden"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Melden"],
		"Quick reply":["Quick reply","Schnelle Antwort"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Antworten"],
		"conversation.html":["Previous messages","vorherige Nachrichten"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
//
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","eingeganende Nachrichten"],
		"composeMessage.html":["Compose Message","Neue Nachricht schreiben"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Neue Nachricht");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","eingegangende Nachrichten"],
		"sentMessages.html":["Sent messages","gesendete Nachrichten"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Empfänger:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Titel:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Nachricht:");
	
	replaceInputByValue({
		"Send":["Send","Senden"],
		"Preview":["Preview","Vorschau"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Abonierte Zeitungen");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Abonierte Zeitungen");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Liste der abonierten Zeitungen"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Zeitung abonieren");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Gesamtzahl Abonierungen");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Zeitung");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Abonierungszeitpunkt");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length - 1; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Zeitungstutorial"]
	});
}
//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Zeitung");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Aktuelle Artikel");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Zeitung bearbeiten"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Zeitungstutorial"]
	});
	replaceInputByValue({
		"Publish":["Publish","Veröffentlichen"],
		"Preview":["Preview","Vorschau"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Neuen Artikel schreiben");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Veröffentlichen in");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Titel:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Nachricht:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Bitte sichere eine Kopie deines Artikels auf der Festplatte, bevor du ihn veröffentlichst!");
	}
}
//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Zeitungsname:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Neuen Avatar:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","Maximale Größe:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Zeitung ändern"]
	});
	replaceInputByValue({"Edit newspaper":["Edit newspaper","Zeitung ändern"]});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Article");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Artikel editieren"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Zeitung editierenl"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Melden"],
		"Edit":["Edit","Ändern"],
		"Delete":["Delete","Löschen"]
	});
	replaceInputByValue({
		"Publish":["Publish","Veröffentlichen"],
		"Report":["Report","Melden"],
		"Edit":["Edit","Ändern"],
		"Delete":["Delete","Löschen"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Neuer Kommentar");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Nachricht:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Zeitung");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Ändern");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Artikeltitel:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Nachricht:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Zeitung ändern"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Zeitungtutorial"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Artikel ändern"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Verträge");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Vorschläge");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Vorgeschlagene Verträge(die letzen 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"angeboten an ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Keine Verträge");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Akzeptierte Verträge(die letzen 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"angeboten an");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Keine Verträge")
	tmp.innerHTML=tmp.innerHTML.replace(/offered by/g,"angeboten von");;
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Abgewiesene Verträge");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Zurückgewiesen von $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Keine Verträge");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Fehlerhafte Verträge");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Keine Verträge");
	tmp = allElements.children[13];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Deine aktive Darlehen");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Leiher");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Rückzahlungsdatum");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Summe");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Darlehen beenden");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Keine Darlehen vergeben");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Deine aktive Kredite");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Verleiher");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Rückzahlungsdatum");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Summe");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Kredit zahlen");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Kein Kredit aufgenommen");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Vertragsname");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Contracts":["Contract tutorial","Vertragstutorial"],
		"#":["Create new template","Neuen Vertragsvorschlag erstellen"]
	});
	replaceInputByValue({
		"Delete":["Delete","Löschen"],
		"Create template":["Create template","Vertragsvorschlag erstellen"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1 Verpflichtung(en):<");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations:/,"Verpflichtungen des Dummys:")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/g,"Default Bürger");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1 Verpflichtung(en):<")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products:/," wird unverzüglich folgende Produkte versenden:");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money:/," wird unverzüglich folgende Geldmengen versenden:");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt:/," zahlt folgenden Kredit:");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"muss bis zum $1$3$5. Tag bezahlt werden ($6 Tag(e) nachdem der Vertag angenommen wurde). Gezahlt wird an:"
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Verträge");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Vertrag");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Vertragsstatus: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Akzeptiert");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Zurückgewiesen von $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Gescheitert");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Vorlage");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Dem Vertrag einen neuen Gegenstand hinzufügen");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Seite");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Gegenstandstpy");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Defaultbürger");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Geld"],
			"Product":["Product","Produkt"],
			"Debt":["Debt","Kredit"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Geld in ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Produktmenge:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Produkttyp:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Produktqualität:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Eisen"],
			"Grain":["Grain","Getreide"],
			"Oil":["Oil","Öl"],
			"Stone":["Stone","Steine"],
			"Wood":["Wood","Holz"],
			"Diamonds":["Diamonds","Diamanten"],
			"Weapon":["Weapon","Waffen"],
			"House":["House","Haus"],
			"Gift":["Gift","Geschenke"],
			"Food":["Food","Essen"],
			"Ticket":["Ticket","Ticket"],
			"Defense System":["Defense System","Verteidigungssystem"],
			"Hospital":["Hospital","Krankenhaus"],
			"Estate":["Estate","Tresor"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Kredit");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Geld in( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Rückzahlungszeitraum:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Produktqualität:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Vertrag vorschlagen");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Vorschlagen an");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Bemerkung:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Du kannst Verträge nur deinen Freunden vorschlagen");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Defaultbürger"],
		"contracts.html":["Go back to contract list","Zurück zur Vertragsliste"]
	});
	replaceInputByValue({
		"Delete":["Delete","Löschen"],
		"Propose":["Propose","Vorschlagen"],
		"Add item":["Add item","Objekt hinzufügen"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Vorlage abbrechen")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Vorlage abbrechen"]});
	    }   
}

//================================================================================
// Monetary market
//================================================================================
function doMonetaryMarket() {
   var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Monetary Market)/,"Devisenmarkt");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current offers)/,"Momentane Angebote");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Monetary market tutorial)/,"Devisenmarkttutorial");
	
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show Offers:)/,"Angebote zeigen:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy currency:)/,"Zu kaufende Währung:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sell currency:)/,"Zu verkaufende Währung:");
	replaceInputByValue({"Swap currencies":["Swap currencies","Währungen tauschen"]});
	replaceInputByValue({"View offers":["View offers","Angebote zeigen"]});

	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Verkäufer");
	tmp.innerHTML=tmp.innerHTML.replace(/(Amount)/,"Menge");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ratio)/,"Wechselkurs");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Kaufen");
	tmp.innerHTML=tmp.innerHTML.replace(/(No offers)/,"Keine Angebote");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);

	tmp.innerHTML=tmp.innerHTML.replace(/(Post your Offer:)/,"Dein Angebot veröffentlichen:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Offered currency)/,"Angebotende Währung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy currency)/,"zu erhaltende Währung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Exchange rate:)/,"Wechselkurs:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Offer )/,"Biete");
	tmp.innerHTML=tmp.innerHTML.replace(/(at rate)/,"zu folgendem Kurs an:");
	replaceInputByValue({"Post new offer":["Post new offer","Angebot erstellen"]});
	}
	results = getElements(document, "//TD[@valign='top']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Your offers)/,"Deine Angebote");
	}
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Amount)/,"Menge");
		tmp.innerHTML=tmp.innerHTML.replace(/(Ratio)/,"Wechselkurs");
		tmp.innerHTML=tmp.innerHTML.replace(/(Delete)/,"Löschen");
		tmp.innerHTML=tmp.innerHTML.replace(/(Delete)/,"Löschen");
		tmp.innerHTML=tmp.innerHTML.replace(/(No offers)/,"Keine Angebote");
	}
}
//============================================================================
//InviteFriends
//============================================================================


function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Freunde einladen");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Dein Werbelink");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Sende diesen Link an andere Leute um als Bonus zusätzliches");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold./,"Gold zu erhalten.<");
	tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Du bekommst");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who registers/,"Gold für jeden Bürger, der sich registriert");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"und Level 7 erreicht.");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"Dies muss über deinen Link geschehen.");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"Weitere");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she gets his\/her/,"Gold erhälst du wenn er/sie seine/ihre");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/," erste Medalie erhält");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Dazu bekommst du");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% vom Goldwert von Levelups oder Medalien die der geworbene Spieler erhält");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"Denk dran, der geworbene Spieler erhält weitere");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7/,"Gold, wenn er Level 7 erreicht");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"bürger die du eingeladen hast");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Sortierung");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Anzeigen");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Bürger");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Level");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Gold erhalten");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Registrierungsdatum");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics)/,"Statistik");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total clicks on referral link:)/,"Gesamtzahl an Klicks:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Unique clicks on referral link:)/,"Einzigartige Klicks");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total citizens registered:)/,"Registrierte Bürger:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens who reached level 7:)/,"Bürger, die Level 7 erreicht haben:");
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest clicks on referrer link)/,"Die letzten Klicks auf den Werbelink");
	
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Zeit");
	tmp.innerHTML=tmp.innerHTML.replace(/(Referrer)/,"Werbeseite");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Bürger");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Nicht registriert");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Mehr Klicks anzeigen");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"vor einer Sekunde");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"vor einer Minute");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"vor einer Stunde");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"gestern");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"letzen Monat");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"vor $1 Sekunden");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"vor $1 Minuten");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"vor $1 Stunden");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"vor $1 Tagen");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"vor $1 Wochen");
            } 
        }
    }
}

//============================================================================
//MilitaryUnit
//============================================================================

function doMilitaryUnit() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Militäreinheit");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are not in any military unit)/,"Du bist in keiner Militäreinheit");
	tmp.innerHTML=tmp.innerHTML.replace(/(Join existing one)/,"Einer beitreten");
	tmp.innerHTML=tmp.innerHTML.replace(/(Create military unit)/,"Eine Militäreinheit gründen");
	//tmp = allElements.children[5];
	//tmp.innerHTML=tmp.innerHTML.replace(/(You need to have level)/,"Du brauchst Level");
	//tmp.innerHTML=tmp.innerHTML.replace(/(to join military unit)/,"um einer Militäreinheit beizutreten");
		
	tmp = allElements.children[3];
	for( var i=0; i<2;i++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Storage)/,"Lager");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donations)/,"Transfers");
	}
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Konto");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Arbeitsangebote");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Rekrutierung");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"Bewerbungen");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Militärrang");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Mitglieder");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Max. Mitglieder");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Gesamtschaden in Schlachten");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Heutiger Schaden");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"General");
	tmp.innerHTML=tmp.innerHTML.replace(/(Lager)/,"Storage");
	tmp.innerHTML=tmp.innerHTML.replace(/(Transfers)/,"Donations");
	replaceInputByValue({"Leave military unit":["Leave military unit","Militäreinheit verlassen"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Mitglieder");
	tmp.innerHTML=tmp.innerHTML.replace(/(View\/manage members)/,"Mitglieder verwalten");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Firmen");
	tmp.innerHTML=tmp.innerHTML.replace(/(No companies)/,"Keine Firmen vorhanden");
	tmp.innerHTML=tmp.innerHTML.replace(/(See all companies)/,"Alle Firmen anzeigen");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Description)/,"Beschreibung");
	
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current orders)/,"Momentane Kampfanweisungen");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle:)/,"Schlacht:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Wiederstandskrieg");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Sold:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"Seite:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"nur für Mitglieder sichtbar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Bearbeiten orders)/,"Anweisungen ändern");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(battle won by)/,"Schlacht gewonnen von");
	
	
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();

}
//============================================================================
//CitizenMarketOffer
//============================================================================

function doCitMarketOffers() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Warenmarkt");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Post new offers:)/,"Neues Angebot erstellen:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Land:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product:)/,"Produkt:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Quantity:)/,"Anzahl:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price:)/,"Preis:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Your storage:)/,"Dein Lager");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show market offers)/,"Marktangebote zeigen");
    replaceInputByValue({"Post new offer":["Post new offer","Angebot erstellen"]});
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Your offers on market)/,"Deine Angebote auf dem Markt");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Produkt");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Verkäufer");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Anzahl");
	tmp.innerHTML=tmp.innerHTML.replace("Price (Gross)","Bruttopreis");
	tmp.innerHTML=tmp.innerHTML.replace("Price (Net)","Nettopreis");
	tmp.innerHTML=tmp.innerHTML.replace(/(Import tax)/,"Importsteuer");
	tmp.innerHTML=tmp.innerHTML.replace(/(Delete)/,"");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show on market)/,"Auf dem Markt zeigen"); 	
	replaceInputByValue({"Delete":["Delete","Löschen"]});
}
//============================================================================
//CompanyMarket
//============================================================================

function doCompMarket() {
	var allElements;

	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies for sale)/,"Firmenmarkt");
	
	rr = {
		"1":["Any","Alles"],
		"2":["Iron","Eisen"],
		"3":["Grain","Getrei."],
		"4":["Oil","Öl"],
		"5":["Stone","Steine"],
		"6":["Wood","Holz"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Waff."],
		"9":["House","Haus"],
		"10":["Gift","Gesch."],
		"11":["Food","Essen"],
		"12":["Ticket","Ticket"],
		"13":["DS","DS"],
		"14":["Hosp.","Krankh."],
		"15":["Est.","Tresor"]
	};
	results = getElements(document, "//label[@for]");

	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Angebote:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Land:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Qualität:");
	
	replaceInputByValue({"View offers":["View offers","Angebote anzeigen"],"Buy":["Buy","Kaufen"]});
	
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Company","Firma");
	tmp.innerHTML=tmp.innerHTML.replace("Product","Produkt");
	tmp.innerHTML=tmp.innerHTML.replace("Location","Region");
	tmp.innerHTML=tmp.innerHTML.replace("Seller","Verkäufer");
	tmp.innerHTML=tmp.innerHTML.replace("Price","Preis");
	tmp.innerHTML=tmp.innerHTML.replace("Buy","Kaufen");
	for (var i = 0; i < 10; i++) {
	tmp.innerHTML=tmp.innerHTML.replace("Employer","Firmeneigner");
	}
	
	obj = allElements.children[6];
   }
//============================================================================
//LaenderStatistik
//============================================================================

function doCountryStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country statistics)/,"Länderstatistiken");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Statistiktyp:");
	replaceInputByValue({"Show":["Show","zeigen"]});
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total:)/,"Insgesamt:");
	tmp = allElements.children[6];
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nr");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens)/,"Bürger");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Gesamtschaden");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Schaden heute");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"XP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Stärke");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"heutige neue Bürger");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity)/,"Produktivität");
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Citizens")) {
			obj.innerHTML=obj.innerHTML.replace(/(Citizens)/,"Bürger");
		} else if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Gesamtschaden");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Schaden heute");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"XP");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Stärke");
		} else if (obj.innerHTML.match("New citizens today")) {
			obj.innerHTML=obj.innerHTML.replace(/(New citizens today)/,"heutige neue Bürger");
		}else if (obj.innerHTML.match("Productivity")) {
			obj.innerHTML=obj.innerHTML.replace(/(Productivity)/,"Produktivität");
		}
		}
}
//============================================================================
//PartyStatistik
//============================================================================

function doPartyStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party statistics)/,"Parteistatistiken");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");
	replaceInputByValue({"Show":["Show","zeigen"]});
	replaceInputByValue({"Leave party":["Leave party","Partei verlassen"]});
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nr");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partei");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Mitglieder");
	obj = results.snapshotItem(i);
	
}
	
}
//============================================================================
//ZeitungStatistik
//============================================================================

function doNewsStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper statistics)/,"Zeitungsstatistiken");
	
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nr");
	tmp.innerHTML=tmp.innerHTML.replace(/(Redactor)/,"Redakteur");
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper)/,"Zeitung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subs)/,"Abos");

	
	}
	}
//============================================================================
//CitiStatistik
//============================================================================

function doCitiStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen statistics)/,"Einwohnerstatistiken");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Statistiktyp:");
	replaceInputByValue({"Show":["Show","zeigen"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nr");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizen)/,"Einwohner");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage)/,"Gesamtschaden");
	tmp.innerHTML=tmp.innerHTML.replace(/(Today damage)/,"Schaden heute");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"XP");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Stärke");
	tmp.innerHTML=tmp.innerHTML.replace(/(strength)/,"Stärke");
	obj = results.snapshotItem(i);
	
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage)/,"Gesamtschaden");
		} else if (obj.innerHTML.match("Today damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Today damage)/,"Schaden heute");
		} else if (obj.innerHTML.match("xp")) {
			obj.innerHTML=obj.innerHTML.replace(/(xp)/,"XP");
		} else if (obj.innerHTML.match("Strength")) {
			obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Stärke");
		} 
		
	}
}	
//============================================================================
//MuStatistik
//============================================================================

function doMuStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit statistics)/,"Militäreinheitenstatistiken");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Statistiktyp:");
	replaceInputByValue({"Show":["Show","zeigen"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No)/,"Nr");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Mitglieder");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Gesamtschaden");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Schaden heute");
	tmp.innerHTML=tmp.innerHTML.replace(/(Value)/,"Wert");

	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Total damage")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Gesamtschaden");
		} else if (obj.innerHTML.match("Damage today")) {
			obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Schaden heute");
		} else if (obj.innerHTML.match("Total members")) {
			obj.innerHTML=obj.innerHTML.replace(/(Total members)/,"Mitgliederanzahl");
		} else if (obj.innerHTML.match("Gold value")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gold value)/,"Goldwert");
		} 
		
	}
}
//============================================================================
//News
//============================================================================

function doNews() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(News)/,"Nachrichten");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show News:)/,"Nachrichten zeigen:");
	tmp.innerHTML=tmp.innerHTML.replace(/(News Type)/,"Nachrichtentyp");
	replaceInputByValue({"View news":["View news"," Nachrichten zeigen"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");

	var results;
	results = getElements(document, "//table[@class='dataTable paddedTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Top articles)/,"Top-Artikel");
	tmp.innerHTML=tmp.innerHTML.replace(/(Latest articles)/,"Neueste Artikel");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military events)/,"Militärereignisse");
	tmp.innerHTML=tmp.innerHTML.replace(/(Political events)/,"Politikereignisse");

		
		obj = results.snapshotItem(i);
	
	Landertausch1(50);
	Landertausch3(30);
		
	
	
	
	}
		for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	
		allElements = results.snapshotItem(i);
		for (var i = 0; i < 10; i++) {
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"Vor $1 Minute(n)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"Vor $1 Stunde(n)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day[s]* ago)/g,"Vor $1 Tag(e)");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month[s]* ago)/g,"Vor $1 Monat(en)");
		allElements.innerHTML=allElements.innerHTML.replace(/(Posted)/g," ");
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g,"sicherte $2 gegen ");
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )/g,"sicherte ");
		allElements.innerHTML=allElements.innerHTML.replace(/( in the battle versus )/g," gegen ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Die Bevölkerung von $2 hat einen Wiederstandskrieg in $4 $5 gestartet");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"wurde von  $2$3 angegriffen");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Der President von $2$3 hat vorgeschlagen $5$6 den Krieg zu erklären");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," hat $2$3 den Krieg erklärt ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )/," eroberte ");
	allElements.innerHTML=allElements.innerHTML.replace(/( in the battle versus )/,"  in der Schlacht gegen ");
	allElements.innerHTML=allElements.innerHTML.replace(/(Money donation of)/,"Der Geldtransfer in Höhe von");
	allElements.innerHTML=allElements.innerHTML.replace(/(was accepted)/,"wurde akzeptiert");
	allElements.innerHTML=allElements.innerHTML.replace(/(wurde vorgeschlagen in congress)/,"wurde im Kongress vorgeschlagen");
	allElements.innerHTML=allElements.innerHTML.replace(/(Issuing)/,"Der Vorschlag Geld in Höhe von  ");
	allElements.innerHTML=allElements.innerHTML.replace(/(wurde akzeptiert by congress)/,"zu drucken wurde vom Kongress akzeptiert");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital was deployed in)/,"Krankenhaus wurde errichtet in:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System was deployed in)/,"Verteidigungssystem wurde errichtet in:");
	allElements.innerHTML=allElements.innerHTML.replace(/(New taxes for)/,"Neue Steuern auf");
	allElements.innerHTML=allElements.innerHTML.replace(/(were proposed in)/,"wurden vorgeschlagen in:");
	allElements.innerHTML=allElements.innerHTML.replace(/(President of)/,"Der President von");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed to deploy)/,"hat vorgeschlagen, ein");
	allElements.innerHTML=allElements.innerHTML.replace(/(Defense System in)/,"Verteidigungssystem in folgender Region zu errichten:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Hospital in)/,"Krankenhaus in folgender Region zu errichten:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Impeachment of president of)/,"Die Amtsenthebung des Presidenten von");
	allElements.innerHTML=allElements.innerHTML.replace(/(was proposed)/,"wurde vorgeschlagen");
	allElements.innerHTML=allElements.innerHTML.replace(/(signed MPP with)/,"unterzeichnete ein MPP mit:");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed mutual protection pact to)/,"hat einen MPP geschickt an:");
	allElements.innerHTML=allElements.innerHTML.replace(/(proposed a peace treaty to)/,"hat einen Friedensvertrag geschickt an:");
	allElements.innerHTML=allElements.innerHTML.replace(/(were accepted in)/,"wurden akzeptiert in:");
	allElements.innerHTML=allElements.innerHTML.replace(/(Import tax)/,"Importsteuer");
	allElements.innerHTML=allElements.innerHTML.replace(/(Food)/,"Nahrung");
	allElements.innerHTML=allElements.innerHTML.replace(/(Gift)/,"Geschenke");
	allElements.innerHTML=allElements.innerHTML.replace(/(Weapon)/,"Waffen");
	allElements.innerHTML=allElements.innerHTML.replace(/(Ticket)/,"Tickets");
	allElements.innerHTML=allElements.innerHTML.replace(/(Stone)/,"Steine");
	allElements.innerHTML=allElements.innerHTML.replace(/(Wood)/,"Holz");
	allElements.innerHTML=allElements.innerHTML.replace(/(Grain)/,"Getreide");
	allElements.innerHTML=allElements.innerHTML.replace(/(Iron)/,"Eisen");
	allElements.innerHTML=allElements.innerHTML.replace(/(Oil)/,"Öl");
	allElements.innerHTML=allElements.innerHTML.replace(/(House)/,"Häuser");
	allElements.innerHTML=allElements.innerHTML.replace(/(Diamonds)/,"Diamanten");
	}
	}
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		 if (obj.innerHTML.match("Top articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Top articles)/,"Topartikel");
		} else if (obj.innerHTML.match("Latest articles")) {
			obj.innerHTML=obj.innerHTML.replace(/(Latest articles)/,"Neueste Artikel");
		} else if (obj.innerHTML.match("Military events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Military events)/,"Militärereignisse");
		} else if (obj.innerHTML.match("Political events")) {
			obj.innerHTML=obj.innerHTML.replace(/(Political events)/,"Politikereignisse");
		} 
		
	}
	
}
//============================================================================
//CountryPolitics
//============================================================================

function doCountryPolitics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country Politics)/,"Staatspolitik");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Länderauswahl");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(President)/,"Präsident");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(view elections)/,"letzte Wahl");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress)/,"Kongress");
	tmp = allElements.children[17];
	tmp.innerHTML=tmp.innerHTML.replace(/(Wars)/,"Kriege");
	

	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Non-party)/,"Parteilos");
	}
	results = getElements(document, "//p[@class='section']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Alliances)/,"Allianzen");
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Land");
	tmp.innerHTML=tmp.innerHTML.replace(/(Expires)/,"Läuft aus in");
	tmp.innerHTML=tmp.innerHTML.replace(/(No alliances)/,"keine Allianzen");
	obj = results.snapshotItem(i);
	Landertausch1(20);
	Landertausch3(20);
	for (var j = 0; j <20; j++) {
	tmp.innerHTML=tmp.innerHTML.replace(/( days)/," Tagen");
	} 
	}
	results = getElements(document, "//a[@target='_blank']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(President)/,"Präsident");
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress)/,"Kongress");
	tmp.innerHTML=tmp.innerHTML.replace(/(War rules)/,"Kriegsregeln");
	tmp.innerHTML=tmp.innerHTML.replace(/(Alliances)/,"Allianzen");
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(War)/,"Kriege");
	for (var j = 0; j <5; j++) {
	tmp.innerHTML=tmp.innerHTML.replace(/(Show)/,"zeigen");
	tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"keine Allianzen");
	}
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	replaceAlliesLinksss();
	}
	
	
	
}
//============================================================================
//CountryEco
//============================================================================

function doCountryEco() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country Economy)/,"Staatswirtschaft");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Länderauswahl");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Population)/,"Bevölkerung");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total active citizens)/,"Aktive Spieler");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Spieler online");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Neue Bürger(heute)");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total residents)/,"Bürger in den Regionen");
	tmp.innerHTML=tmp.innerHTML.replace(/(Who is online)/,"Wer ist online");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Details zeigen");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show details)/,"Details zeigen");
	
	
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Regions)/,"Regionen");
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Resources)/,"Resourcen");
	for ( var j=0;j < 20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No resources)/,"Keine Resource");
	tmp.innerHTML=tmp.innerHTML.replace(/(Capital of)/,"Hauptstadt von");
	tmp.innerHTML=tmp.innerHTML.replace(/(HIGH)/,"HOCH");
	tmp.innerHTML=tmp.innerHTML.replace(/(MEDIUM)/,"MITTEL");
	}
	obj = results.snapshotItem(i);
	Landertausch1(14);
	Landertausch3(14);
	}
	
	
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Taxes)/,"Steuern");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Resource)/,"Ware");
	tmp.innerHTML=tmp.innerHTML.replace(/(Waren)/,"Resource");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Import Tax)/,"Importsteuer");
	tmp.innerHTML=tmp.innerHTML.replace(/(Income Tax)/,"Einkommenssteuer");
	tmp.innerHTML=tmp.innerHTML.replace(/(Iron)/,"Eisen");
	tmp.innerHTML=tmp.innerHTML.replace(/(Grain)/,"Getreide");
	tmp.innerHTML=tmp.innerHTML.replace(/(Oil)/,"Öl");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Stone)/,"Steine");
	tmp.innerHTML=tmp.innerHTML.replace(/(Wood)/,"Holz");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamonds)/,"Diamanten");
	tmp.innerHTML=tmp.innerHTML.replace(/(Weapon)/,"Waffen");
	tmp.innerHTML=tmp.innerHTML.replace(/(House)/,"Häuser");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Gift)/,"Geschenke");
	tmp.innerHTML=tmp.innerHTML.replace(/(Food)/,"Nahrung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Ticket)/,"Tickets");
	tmp.innerHTML=tmp.innerHTML.replace(/(Defense System)/,"Verteidigungssysteme");
	tmp.innerHTML=tmp.innerHTML.replace(/(Hospital)/,"Krankenhäuser");
	tmp.innerHTML=tmp.innerHTML.replace(/(Eisen.png)/,"Iron.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(Getreide.png)/,"Grain.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(%C3%96l.png)/,"Oil.png");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Steine.png)/,"Stone.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(Holz.png)/,"Wood.png");
	tmp.innerHTML=tmp.innerHTML.replace(/(Diamanten.png)/,"Diamonds.png");
	}
	
	tmp = allElements.children[19];
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Staatsvermögen");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Treasury)/,"Staatsvermögen");
	
	}
	tmp = allElements.children[24];
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Gebäudelager");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"keine Gebäude");
	}
	
	
}
//============================================================================
//CountryLaws
//============================================================================

function doCountryLaws() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Gesetzesabstimmungen");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Select country)/,"Länderauswahl");
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Gesetzesabstimmungen");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Type)/,"Art");
	tmp.innerHTML=tmp.innerHTML.replace(/(Results)/,"Ergebnisse");
	tmp.innerHTML=tmp.innerHTML.replace(/(Yes:No)/,"Ja:Nein");
	tmp.innerHTML=tmp.innerHTML.replace(/(Time)/,"Zeitpunkt");
	for(var j=0;j<15;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(Accepted)/,"Angenommen");
	tmp.innerHTML=tmp.innerHTML.replace(/(but failed)/,"aber gescheitert");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rejected)/,"Zurückgewiesen");
	tmp.innerHTML=tmp.innerHTML.replace(/(hours ago)/,"Stunden zurück");
	tmp.innerHTML=tmp.innerHTML.replace(/(days ago)/,"Tage zurück");
	tmp.innerHTML=tmp.innerHTML.replace(/(months ago)/,"Monate zurück");
	tmp.innerHTML=tmp.innerHTML.replace(/(hour ago)/,"Stunde zurück");
	tmp.innerHTML=tmp.innerHTML.replace(/(day ago)/,"Tag zurück");
	tmp.innerHTML=tmp.innerHTML.replace(/(month ago)/,"Monat zurück");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Geldtransferierung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Friedensschließung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change tax)/,"Steueränderung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Impeach)/,"Amtenthebung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change welcome message)/,"Willkommensnachrichtenänderung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Geld drucken");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Präsidentswahl");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Gebäude errichten");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"MMP Vorschlag");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Kriegserklärung");
	
	}
	}
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Law Proposals)/,"Gesetzesabstimmungen");
	tmp = allElements.children[18];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress actions)/,"Gesetzesvorschläge");
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposal left )/,"Vorhandene Einbringungsmöglichkeiten");
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money)/,"Geldtransferierung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Cease Fire)/,"Friedensschließung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change taxes)/,"Steueränderung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose impeach)/,"Amtenthebung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Propose welcome message)/,"Willkommensnachrichtenänderung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Print money)/,"Geld drucken");
	tmp.innerHTML=tmp.innerHTML.replace(/(Elect president)/,"Präsidentswahl");
	tmp.innerHTML=tmp.innerHTML.replace(/(Deploy building)/,"Gebäude errichten");
	tmp.innerHTML=tmp.innerHTML.replace(/(MPP proposal)/,"MMP Vorschlag");
	tmp.innerHTML=tmp.innerHTML.replace(/(Declare war)/,"Kriegserklärung");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country treasure)/,"Staatsvermögen");
	tmp.innerHTML=tmp.innerHTML.replace(/(Building stock)/,"Gebäudelager");
	tmp.innerHTML=tmp.innerHTML.replace(/(No buildings)/,"Keine Gebäude vorhanden");
	replaceInputByValue({"Leave congress":["Leave congress","Kongress verlassen"]});
	
	tmp = allElements.children[21];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate buildings to national treasury)/,"Gebäude an den Staat spenden");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(You have no buildings in your inventory)/,"Du hast keine Gebäude in deinem Lager");
	}
	
	tmp = allElements.children[26];
	tmp.innerHTML=tmp.innerHTML.replace(/(Donate money to national treasury)/,"Geld an den Staat spenden");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp = results.snapshotItem(i);
		tmp.innerHTML=tmp.innerHTML.replace(/(Select item to donate:)/,"Währung auswählen:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Donate item:)/,"Währung:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Sum:)/,"Summe:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Reason:)/,"Grund:");
		replaceInputByValue({"Donate":["Donate","Spenden"]});
	}
	results = getElements(document, "//a[@target='_blank']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Law proposals)/,"Gesetzesvorschläge");
	}
}
//============================================================================
//Partyelections
//============================================================================

function doPartyElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party Elections)/,"Parteiwahlen");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partei:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Datum:");	
	replaceInputByValue({"Show":["Show","Zeigen"]});
	}replaceInputByValue({"Vote":["Vote","Wählen"]});
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandidat");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partei");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Stimmen");
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Keine Presentation");
	}
}
//============================================================================
//Congresselections
//============================================================================

function doCongressElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Zeigen"]});
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress Elections)/,"Kongresswahlen");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Elected candidates)/,"Gewählte Kandidaten");
	tmp = allElements.children[9];
	tmp.innerHTML=tmp.innerHTML.replace(/(Not elected candidates)/,"Nicht gewählte Kandidaten");
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partei:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Datum:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Land");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandidat");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partei");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Stimmen");
	for(j=0;j<20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Keine Presentation");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Congress elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Congress elections tutorial)/,"Kongresswahlen");
	
	}
}
//============================================================================
//Präsielections
//============================================================================

function doPresiElec() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Zeigen"]});
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential Elections)/,"Präsidentswahlen");
	tmp = allElements.children[5];
	
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Party:)/,"Partei:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Date:)/,"Datum:");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Land");	
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandidat");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partei");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Stimmen");
	for(j=0;j<20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Keine Presentation");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Presidental elections']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Presidential elections tutorial)/,"Präsidentenwahl");
	
	}
}
//============================================================================
//CSaplication
//============================================================================

function doCSappli() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	replaceInputByValue({"Show":["Show","Zeigen"]});
	replaceInputByValue({"Apply for citizenship":["Apply for citizenship","Bewerbung abschicken"]});
	var tmp;
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending citizenship applications)/,"Staatbürgerschaftsanträge");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Show accepted citizenship)/,"Akzeptierte Staatbürgerschaftsanträge zeigen");
	var results;
	results = getElements(document, "//div[@class='testDivblue']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Your application for citizenship in)/,"Deine Bewerbung für eine Staatsbürgerschaft in");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Your citizenship)/,"Deine Staatsbürgerschaft");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Land:");
	tmp.innerHTML=tmp.innerHTML.replace(/(The application will be revised by)/,"Die Bewerbung wird überprüft werden von:");		
	tmp.innerHTML=tmp.innerHTML.replace(/(congress members of)/,"Kongressmitglieder von");	
	tmp.innerHTML=tmp.innerHTML.replace(/(Pending applications)/,"Zu überprüfende Anträge");	
	obj=results.snapshotItem(i);
	Landertausch1(3);
	Landertausch3(1);
	}
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Candidate)/,"Kandidat");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Partei");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Total votes)/,"Stimmen");
	for(j=0;j<20;j++){
	tmp.innerHTML=tmp.innerHTML.replace(/(No presentation)/,"Keine Presentation");
	}}
	results = getElements(document, "//a[@href='http://wiki.e-sim.org/en/Citizenship']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenships on wiki)/,"Staatsbürgerschaften");
	
	}
}
//============================================================================
//Worldmap
//============================================================================

function doWorldmap() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	var tmp;
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/(World map)/,"Weltkarte");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Browse territories)/,"Regionenübersicht");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Map Type:)/,"Kartentyp:");
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizenship:)/,"Staatsbürgerschaft:");

	
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
} else if (isTargetHtml("/inviteFriends.html")) {
	doInviteFriends();
} else if (isTargetHtml("/myMilitaryUnit.html")) {
	doMilitaryUnit();
}else if (isTargetHtml("/militaryUnit.html")) {
	doMilitaryUnit();
}else if (isTargetHtml("/citizenMarketOffers.html")) {
	doCitMarketOffers();
}else if (isTargetHtml("/companiesForSale.html")) {
	doCompMarket();
}else if (isTargetHtml("/countryStatistics.html")) {
	doCountryStat();
}else if (isTargetHtml("/partyStatistics.html")) {
	doPartyStat();
}else if (isTargetHtml("/newspaperStatistics.html")) {
	doNewsStat();
}else if (isTargetHtml("/citizenStatistics.html")) {
	doCitiStat();
}else if (isTargetHtml("/militaryUnitStatistics.html")) {
	doMuStat();
}else if (isTargetHtml("/news.html")) {
	doNews();
}else if (isTargetHtml("/countryPoliticalStatistics.html")) {
	doCountryPolitics();
}else if (isTargetHtml("/countryEconomyStatistics.html")) {
	doCountryEco();
}else if (isTargetHtml("/countryLaws.html")) {
	doCountryLaws();
}else if (isTargetHtml("/partyElections.html")) {
	doPartyElec();
}else if (isTargetHtml("/congressElections.html")) {
	doCongressElec();
}else if (isTargetHtml("/presidentalElections.html")) {
	doPresiElec();
}else if (isTargetHtml("/pendingCitizenshipApplications.html")) {
	doCSappli();
}else if (isTargetHtml("/googleMap.html")) {
	doWorldmap();
}
