// ==UserScript==
// @name           e-sim PL
// @namespace      e-sim PL
// @include        http://*.e-sim.org*
// @grant          none
// ==/UserScript==
//Polish translation by Kaszanka

menuLinkReplacements = {
	"work.html"				:["Work","Praca"],
	"train.html"			:["Train","Trening"],
	"equipment.html"		:["Equipment","Ekwipunek"],
	"companies.html"		:["Companies","Firmy"],
	"newspaper.html"		:["Newspaper","Gazeta"],
	"myParty.html"			:["Party","Partia polityczna"],
	"contracts.html"		:["Contracts","Kontrakty"],
	"myShares.html"		    :["Shares","Akcje"],
	"myAuctions.html"		:["Auctions","Aukcje"],
	"inviteFriends.html"	:["Invite friends","Zapro\u015B znajomych"],
	"myMilitaryUnit.html"	:["Military unit","Jednostka Wojskowa"],
	"subscription.html"     :["Premium account","Konto premium"],
	
	"productMarket.html"	:["Product market","Rynek"],
	"jobMarket.html"		:["Job market","Oferty pracy"],
	"monetaryMarket.html"	:["Monetary market","Rynek walutowy"],
	"auctions.html"		    :["Auctions","Aukcje"],
	"stockMarket.html"	    :["Stock market","Gie\u0142da"],
	"companiesForSale.html"	:["Companies for sale","Firmy na sprzeda\u017C"],
	"specialItems.html"		:["Special items","Specjalne itemy"],
	
	"countryStatistics.html"		:["Country statistics","Statystyki kraju"],
	"partyStatistics.html"			:["Party statistics","Statystyki parti"],
	"newspaperStatistics.html"		:["Newspaper statistics","Statystyki gazet"],
	"citizenStatistics.html"		:["Citizen statistics","Statystyki obywateli"],
	"militaryUnitStatistics.html"	:["Military unit stats","Statystyki wojsk"],
	"stockCompanyStatistics.html"	:["Stock market stats","Statystyki gie\u0142dy"],
	"donations.html"                :["Donations","Darowizny"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Najlepsze artyku\u0142y"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Ostatnie artyku\u0142y"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Wydarzenia militarne"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Wydarzenia polit."],
	
	"battles.html"							:["Battles","Bitwy"],
	"countryPoliticalStatistics.html"		:["War and politics","Wojna i polityka"],
	"countryEconomyStatistics.html"			:["Economy","Ekonomia"],
	"countryLaws.html"						:["Laws","Ustawy"],
	"partyElections.html"					:["Party elections","Wybory szefa partii"],
	"congressElections.html"				:["Congress elections","Wybory do Kongresu"],
	"presidentalElections.html"				:["Presidential elections","Wybory prezydenckie"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Obywatelstwo"],
	"googleMap.html"						:["Map","Mapa"]
};

menuTextReplacements = {
	"myPlacesButton":["My places","M\u00F3j obywatel"],
	"marketButton":["Market","Rynek"],
	"statisticsButton":["Statistics","Statystyki"],
	"newsButton":["News","Wydarzenia"],
	"electionsButton":["Country","Kraj"]
};

hpTitleReplacements = {
	"News":["News","Gazety"],
	"Shouts":["Shouts","Shouts"],
	"Battles":["Battles","Bitwy"],
	"Events":["Events","Wydarzenia"]
};

hpTabsReplacements = {
	"#topArticles":["Global","Globalne"],
	"#latestArticles":["Latest","Ostatnie"],
	"#localArticles":["Local","Lokalne"],
	
	"#countryShouts":["Country","Kraj"],
	"#friendsShouts":["Military unit","Jedn. Wojsk."],
	"#myShouts":["Friends","Przyjaciele"],
	
	"#localBattles":["Country","Kraj"],
	"#substidedBattles":["Subsidized","Dofinansowane"],
	"#hotBattles":["Important","Wa\u017Cne"],

	"#localEvents":["Military","Wojsk."],
	"#globalEvents":["Military","Wojsk."],
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Poradnik o rynku walutowym"],
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
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"sekund\u0119 temu");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"minut\u0119 temu");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"godzin\u0119 temu");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"wczoraj");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"miesi\u0105c temu");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 sekund temu");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 minut temu");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 godzin temu");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 dni temu");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 miesi\u0119cy temu");
        }
    }
}

//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"sekund\u0119 temu");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"minut\u0119 temu");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"godzin\u0119 temu");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"wczoraj");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"miesi\u0105c temu");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 sekund temu");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 minut temu");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 godzin temu");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 dni temu");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 miesi\u0119cy temu");
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 sojusznik\u00F3w");
	}
}

function replaceNoAlliesAndOtherInfo() {
	results = getElements(document, "//div[@class='battleDiv']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp=results.snapshotItem(i).children[0];
		if (tmp.innerHTML.match("no allies")) {
			tmp=tmp.childNodes[3];
			tmp.nodeValue=tmp.nodeValue.replace(/no allies/,"bez sojusznik\u00F3w");
		}
		tmp=results.snapshotItem(i).children[2];
		if (tmp.innerHTML.match("no allies")) {
			tmp=tmp.childNodes[3];
			tmp.nodeValue=tmp.nodeValue.replace(/no allies/,"bez sojusznik\u00F3w");
		}

		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Resistance war/,"Powstanie");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Subsidies/,"Dofinansowanie");
		tmp.innerHTML=tmp.innerHTML.replace(/none/g,"Brak");
		tmp.innerHTML=tmp.innerHTML.replace(/for/g,"za");
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
	"Vote":["Vote","G\u0142osuj"],
	"Comment":["Comment","Skomentuj"],
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
		"Show more battles":["Show more battles","Wy\u015Bwietl wi\u0119cej bitew"],
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
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Wi\u0119cej shout\u00F3w"] });
}

//============================================================================
//Menu OK
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	dayInGameReplacement = {
		"./td[3]/table/tbody/tr/td/b[2]"	:[/(day)/,"dzie\u0144"]	
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
		"crossIcon"	:["Logout","Wyloguj"],
		"workIcon"	:["Work","Praca"],
		"fightIcon"	:["Fight","Walcz"],
		"avatarIcon":["Upload avatar","Za\u0142aduj avatar"],
		"voteIcon"	:["Vote","G\u0142osuj"],
	};
	var sideLink2Replacements = {
		"travel.html"	:["Travel","Podr\u00F3\u017C"],
		"pendingCitizenshipApplications.html"	:["change","Zmie\u0144"],
		"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Poradnik o zdrowiu"],
	};

	var sideLink3Replacements = {
		"eatLink"	:["Eat food","Zjedz chleb"],
		"useGiftLink":["Use gifts","U\u017Cyj prezentu"],
		"showCurrencies":["Show more currencies","Pokaz wi\u0119cej walut"]
	};

	var sideLink4Replacements = {
		"eatButton":["Eat Food","Zjedz"],
		"useGiftButton":["Use gift","U\u017Cyj"] 
	};
	
	var sideTextXPathReplacements = {
		"./div[1]/div/h4"	:[/(Your today's tasks)/,"Twoje dzisiejsze zadania"],
		"./div[1]/div[2]/b"	:[/(Level)/,"Poziom"],
		"./div[1]/div[3]/b"	:[/(Rank)/,"Ranga"],
		"./div[2]/h4[1]"	:[/(Your money)/,"Twoje pieni\u0105dze"],	
		"./div[2]/h4[2]"	:[/(Your inventory)/,"Tw\u00F3j ekwipunek"],
		"./div[3]/h4"		:[/(Your messages)/,"Twoje wiadomo\u015Bci"]		
	};
	var sideText2XPathReplacements = {
		"./div[2]/b[1]"		:[/(Next rank)/,"Nast\u0119pna"],
		"./div[3]/b[1]"		:[/(Health:)/,"\u017Bycie: "],
		"./b[1]"			:[/(Economy skill)/,"Skill ekonomiczny"],
		"./b[2]"			:[/(Strength)/,"Si\u0142a"],
		"./b[3]"			:[/(Location)/,"Region"],
		"./b[4]"			:[/(Citizenship)/,"Obywatelstwo"],
		"./b[5]"			:[/(Food limit)/,"Limit chleba"],
		"./b[6]"			:[/(Gift limit)/,"Limit prezent\u00F3w"]
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
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Jako\u015B\u0107 chleba");
		} else if (obj.innerHTML.match("Gift type")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Jako\u015B\u0107 prezent\u00F3w");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/(\d*) left/,"zosta\u0142o $1");
			obj.innerHTML=obj.innerHTML.replace(/(Food)/,"Chleb");
			obj.innerHTML=obj.innerHTML.replace(/(Gift)/,"Prezent");
		} 
	}
}

//============================================================================
//Profile OK
//============================================================================
function doProfile() {
	var citizenProfileReplacements = {
		"./td[2]/div/div[1]/h2"							:[/(Citizen)/,"Obywatel"],
		"./td[2]/div/div[1]/b"							:[/(Online)/,"Pod\u0142\u0105czony"],
		"./td[2]/div/div[1]/b"							:[/(Offline)/,"Niepod\u0142\u0105czony"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[1]"	:[/(Permanently banned)/,"Ban permanentny"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[2]/b"	:[/(Reason)/,"Pow\u00F3d"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[3]/b"	:[/(Banned by)/,"Zbanowany przez "],
		"./td[2]/table/tbody/tr/td[1]"					:[/(Premium account)/,"Konto premium",
														/(None)/,"Brak",
														/(Level)/,"Poziom",
														/(Damage)/,"Obra\u017Cenia",
														/^Rank$/,"Ranga",
														/(Economy skill)/,"Skill ekonomiczny",
														/(Strength)/,"Si\u0142a",
														/(Location)/,"Region",
														/(Citizenship)/,"Obywatelstwo",
														/(Birthday)/,"Urodziny",
														/^Ranks$/,"Rangi",
														/(National by XP)/,"Krajowa wed\u0142ug XP",
														/(National by DMG)/,"Krajowa wed\u0142ug obra\u017Ce\u0144",
														/(Global by XP)/,"Og\u00F3lna wed\u0142ug XP",
														/(Global by DMG)/,"Og\u00F3lna wed\u0142ug obra\u017Ce\u0144",
														/(Military unit)/,"Jednostka wojskowa",
														/(Party)/,"Partia",
														/(Newspaper)/,"Gazeta",
														/(Working at)/,"Pracuje dla",
														/(Owned companies)/,"W\u0142asne firmy",
														/(Political office)/,"Stanowisko polityczne",
														/(No military unit)/,"Nie ma jednostki wojskowej",
														/(No party)/,"Nie ma partii",
														/(No newspaper)/,"Nie ma gazety",
														/(No work)/,"Nie ma pracy",
														/(No companies)/,"Nie ma firm",
														/(No office)/,"Nie ma stanowiska"]
	};

	var mainNode;
	mainNode = document.getElementById('contentRow');
	getAndReplaceNode(mainNode,citizenProfileReplacements);

	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Edytuj profil"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Zmie\u0144 imi\u0119"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","Lista transakcji"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Zg\u0142o\u015B multi"]
	});
	replaceInputByValue({"Report multi":["Report multi","Zg\u0142o\u015B multi"]});

	doShoutsComm();
	
}

//============================================================================
//Battle OK
//============================================================================
function doBattle() {
	var battle1Replacements = {
		"./td[2]/div/div/div[1]"	:[/(Resistance war)/,"Powstanie",/(started by)/,"zacz\u0119te przez"],
		"./td[2]/div/div/div[2]"	:[/(no allies)/,"bez sojusznik\u00F3w",/(\d*)( allies)/,"$1 sojusznik\u00F3w"],
		"./td[2]/div/div/div[4]"	:[/(Round )(\d*)/,"Runda $2"],
		"./td[2]/div/div/div[5]"	:[/(no allies)/,"bez sojusznik\u00F3w",/(\d*)( allies)/,"$1 sojusznik\u00F3w"],
		//"./td[2]/div/div/div[10]"	:[/Rounds won by defender/,"Rundy wygrane przez obro\u0144c\u00F3w"],
		//"./td[2]/div/div/div[11]"	:[/Rounds won by attacker/,"Rundy wygrane przez napastnik\u00F3w"], NOT WORKING WITH PREMIUM
		"./td[2]/div/div/div[8]/b"	:[/(Defenders' total damage)/,"Obra\u017Cenia obro\u0144c\u00F3w"],
		"./td[2]/div/div/div[9]/b"	:[/(Attackers' total damage)/,"Obra\u017Cenia napastnik\u00F3w"],
		"./td[2]/div/div/div[10]/b"	:[/(Total attackers online)/,"Atakuj\u0105cych"],
		"./td[2]/div/div/div[11]/b"	:[/(Total defenders online)/,"Obro\u0144c\u00F3w"],
		"./td[2]/div/div/b"			:[/(Total spectators online)/,"Og\u00F3lna liczba obserwuj\u0105cych"],
		"./td[2]/table[1]" 			:[/(Top defenders)/,"Najlepsi obro\u0144cy",
									/(Top attackers)/,"Najlepsi napastnicy",
									/(\d*)( available)/g,"zosta\u0142o $1",
									/(Select weapon)/,"Wybierz bro\u0144",
									/(Unarmed)/,"Bez broni",
									/(Select your side)/,"Wybierz twoja stron\u0119",
									/(Show round)/,"Poka\u017C rund\u0119",
									/(This round was won by)/,"Ta runda zosta\u0142a wygrana przez",
									/(You can't fight in this battle from your current location)/,"Nie mo\u017Cesz si\u0119 bi\u0107 w tej bitwie z twojego obecnego regionu",
									/(You must travel to the occupant country to participate in the battle)/,"Musisz si\u0119 przenie\u015B\u0107 do kraju okupuj\u0105cego \u017Ceby bi\u0107 w tej bitwie"],		
		"./td[2]/table[2]" 			:[/Recent<br>defenders/,"Ostatni obro\u0144cy",
									/Recent<br>attackers/,"Ostatni napastnicy",
									/(Current round statistics)/,"Obecne statystyki rundy",
									/(Your damage)/,"Zadane obra\u017Cenia",
									/(Top defending countries)/,"Najlepsze pa\u0144stwa w obronie",
									/(Top defending countries)/,"Najlepsze pa\u0144stwa w ataku",
									/(Top defending military units)/,"Najlepsze jednostki wojskowe w obronie",
									/(Top attacking military units)/,"Najlepsze jednostki wojskowe w ataku",
									/(Show overall battle stats)/,"Poka\u017C og\u00F3lne staty bitwy",
									/(Show military units supporting this battle)/,"Poka\u017C jednostki wojskowe wspieraj\u0105ce t\u0105 bitw\u0119"]
	};

	var battleLinks1Replacements = {
		"http://wiki.e-sim.org/index.php/Fighting"		:["Fighting tutorial on wiki","Jak walczy\u0107"],
		"http://wiki.e-sim.org/index.php/Battle"		:["Battle rules","Regu\u0142y bitwy"]
	}
	
	var mainNode;
	mainNode = document.getElementById('contentRow');
	getAndReplaceNode(mainNode,battle1Replacements);
	
	var premiumSpec = document.getElementById("spectatorsLink");
	if (premiumSpec){
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"Poka\u017C szczeg\u00F3\u0142y");
		premiumSpec=document.getElementById("defendersLink");
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"Poka\u017C szczeg\u00F3\u0142y");
		premiumSpec=document.getElementById("attackersLink");
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"Poka\u017C szczeg\u00F3\u0142y");
	}
	replaceInputByValue({"Show round":["Show round","Poka\u017C"]});
	
	replaceLinkByHref(battleLinks1Replacements);
	
}
	
//============================================================================
//Battle Statistics OK
//============================================================================
function doBattleStatistics() {
	var battleStats1Replacements = {
		"./td[2]/div[1]"	:[/(Resistance war)/,"Powstanie",
							/(started by)/,"zacz\u0119te przez",
							/(Back to battle)/,"Powr\u00F3t do bitwy",
							/(no allies)/,"bez sojusznik\u00F3w",
							/(\d*)( allies)/,"$1 sojusznik\u00F3w",
							/(Round )(\d*)/,"Runda $2",
							/(Rounds won by defender)/,"Rundy wygrane przez obro\u0144c\u00F3w",
							/(Rounds won by attacker)/,"Rundy wygrane przez napastnik\u00F3w"],
		"./td[2]/div[2]" 	:[/(Battle statistics)/,"Statystyki bitwy",
							/(Statistics are generated once per 30 minutes)/,"Statystyki s\u0105 od\u015Bwie\u017Cane co 30 sekund",
							/(Your damage)/,"Zadane obra\u017Cenia",
							/(Top defending countries)/,"Najlepsze pa\u0144stwa w obronie",
							/(Top defending countries)/,"Najlepsze pa\u0144stwa w ataku",
							/(Top defending military units)/,"Najlepsze jednostki wojskowe w obronie",
							/(Top attacking military units)/,"Najlepsze jednostki wojskowe w ataku",
							/(Defenders' total damage)/,"Obra\u017Cenia zadane przez obro\u0144c\u00F3w:",
							/(Attackers' total damage)/,"Obra\u017Cenia zadane przez napastnik\u00F3w:"]
	};

	var battleLinks1Replacements = {
		"http://wiki.e-sim.org/index.php/Fighting"		:["Fighting tutorial on wiki","Jak walczy\u0107"],
		"http://wiki.e-sim.org/index.php/Battle"		:["Battle rules","Regu\u0142y bitwy"]
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
		"13":["DS","System Obr."],
		"14":["Hosp.","Szpital"],
		"15":["Est.","Budynek"]
	};
	
	var market1Replacements = {
		"./h1"								:[/(Marketplace)/,"Rynek"],
		"./div[1]/b"							:[/(Show Offers)/,"Poka\u017C oferty"],
		"./div[2]/table/tbody/tr[1]/td[1]"	:[/(Product)/,"Produkt"],
		"./div[2]/table/tbody/tr[1]/td[2]"	:[/(Seller)/,"Sprzedawca"],
		"./div[2]/table/tbody/tr[1]/td[3]"	:[/(Stock)/,"Stock"],
		"./div[2]/table/tbody/tr[1]/td[4]"	:[/(Price)/,"Cena"],
		"./div[2]/table/tbody/tr[1]/td[5]"	:[/(Buy)/,"Kup"]	
	};
	
	var market2Replacements = {
		"."					:[/(Quality)/,"Jako\u015B\u0107",/(Country)/,"Kraj"]		
	};
	
	var mainNode;
	mainNode = document.getElementById('contentRow').children[1];
	getAndReplaceNode(mainNode,market1Replacements);

	var mainNode;
	mainNode = document.getElementById('productMarketViewForm');
	getAndReplaceNode(mainNode,market2Replacements);
	
	replaceInputByValue({"View offers":["View offers","Zobacz oferty"],"Buy":["Buy","Kup"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Poka\u017C moje oferty / Stw\u00F3rz now\u0105 ofert\u0119"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","Produkty"]
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
//Work OK
//============================================================================
function doWork() {
	var work1Replacements = {
		"."					:[/(Work)/,"Pracuj",
							/(You have no job)/,"Nie masz pracy",
							/(Your workplace)/,"Miejsce pracy",
							/(Employer)/,"Pracodawca",
							/(Salary)/,"P\u0142aca",
							/(Leave job)/,"Zrezygnuj",
							/(You have not worked today)/,"Dzisiaj nie pracowa\u0142e\u015B",
							/(You have to stay in company for at least 6 hours before you will be able to resign)/,"Musisz zosta\u0107 przynajmniej 6 godzin w tej firmie zanim bedziesz m\u00F3g\u0142 odej\u015B\u0107",
							/(Today work results)/,"Dzisiejszy wynik pracy"] // not in .attributesTable
	};
	
	var work2Replacements = {
		".//table[contains(@class,'attributesTable')]" 	:[/(Your Gross salary)/,"P\u0142aca brutto",
														/(Your Net salary)/,"P\u0142aca netto",
														/(Income tax paid)/,"Podatek",
														/(Worked at)/,"Pracujesz u",
														/(XP gained )/,"XP zdobyty",
														/(Economy skill gained)/,"Skill ekonomiczny zdobyty",
														/(Working days in a row)/,"Ilo\u015B\u0107 dni przepracowanych",
														/(Your base productivity)/,"Twoja bazowa produktywno\u015B\u0107",
														/(Productivity modifiers)/,"Modyfikatory produktywno\u015Bci",
														/(Total productivity)/,"Ca\u0142kowita produktywno\u015B\u0107",
														/(Units produced)/,"Wyprodukowane jednostki",
														/(Raw company quality)/,"Jako\u015B\u0107 firmy raw"]
	};

	var mainNode;
	mainNode = document.getElementById('contentRow').children[1];
	getAndReplaceNode(mainNode,work1Replacements);

	getAndReplaceNode(mainNode,work2Replacements);
	
	replaceInputByValue({
						"Get a job now!":["Get a job now!","Znajd\u017A sobie prac\u0119 !"], 
						"Work now":["Work now","Pracuj"] 
	});

}

//============================================================================
//Train OK
//============================================================================
function doTrain() {
	var train1Replacements = {
		"."					:[/(Military training)/,"Trening wojskowy",
							/(Training complete. Please come back tomorrow)/,"Trening zako\u0144czony, wr\u00F3\u0107 jutro",
							/(You have already trained today. Please come back tomorrow)/,"Dzisiaj ju\u017C trenowa\u0142e\u015B. Wr\u00F3\u0107 jutro",
							/(Strength gained)/,"Si\u0142a zdobyta",
							/(Equipment Stats)/,"Staty ekwipunku",
							/(Damage)/,"Obra\u017Cenia",
							/(Critical Hit)/,"Cios krytyczny",
							/(Critical Hit chance)/,"Szansa na cios kryt.",
							/(Miss chance)/,"Szansa na niewypa\u0142",
							/(Chance to avoid DMG)/,"Szansa na dodatkowy cios"]
	};
	
	var train2Replacements = {
		".//table[contains(@class,'attributesTable')]" 	:[/(Military details)/,"Szczeg\u00F3\u0142y wojskowe",
														/(Total training sessions:)/,"Og\u00F3lna liczba trening\u00F3w:",
														/(Strength:)/,"Si\u0142a:",
														/(Military rank:)/,"Ranga wojskowa:",
														/(Total damage done:)/,"Og\u00F3lne obra\u017Cenia:",
														/(Damage with no weapon:)/,"Obra\u017Cenia bez broni:",
														/(Damage with Q1 weapon:)/,"Obra\u017Cenia z broni\u0105 Q1:",
														/(Damage with Q2 weapon:)/,"Obra\u017Cenia z broni\u0105 Q2:",
														/(Damage with Q3 weapon:)/,"Obra\u017Cenia z broni\u0105 Q3:",
														/(Damage with Q4 weapon:)/,"Obra\u017Cenia z broni\u0105 Q4:",
														/(Damage with Q5 weapon:)/,"Obra\u017Cenia z broni\u0105 Q5:"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Brak kontrakt\u00F3w")
	tmp.innerHTML=tmp.innerHTML.replace(/offered by/g,"zaproponowany dla");;
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
	
    results = getElements(document, "//TD[@style='text-align: center']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Rynek walutowy")

	allElements = results.snapshotItem(0).children[1]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Obecne oferty")
	allElements = results.snapshotItem(0).children[3]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Poka\u017C oferty")


	document.getElementById("swap2").value = "Zamie\u0144 waluty"
	tmp = allElements.children[3]
	tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Kup walut\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Sprzedaj walut\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Poka\u017C oferty")  

	allElements = results.snapshotItem(0).children[12]
	tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Twoje oferty")

	var results = getElements(document, "//DIV[@class='testDivblue']");
	var divsLength = results.snapshotLength;

	allElements = results.snapshotItem(divsLength-1);
	tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Wy\u015Blij swoj\u0105 ofert\u0119")
	document.getElementById("swap1").value = "Zamie\u0144 waluty"
	tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Zaoferuj walut\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Kup walut\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Kurs wymiany")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Wy\u015Blij swoj\u0105 ofert\u0119")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Zaoferuj")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"po kursie")
	
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
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who registers/,"Golda za ka\u017Cdego obywatela kt\u00F3ry zarejestruje si\u0119");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"i zdob\u0119dzie poziom 7");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"po klikni\u0119ciu na ten link");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"i kolejne");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she gets his\/her/,"Gold kiedy osi\u0105gnie sw\u00F3j");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"pierwszy medal");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Dodatkowo dostajesz");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% z golda otrzymanego przez gracza poprzez medale albo nast\u0119pne poziomy");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"Uwaga, tw\u00F3j przyjaciel dostanie");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7/,"Golda za zapisanie si\u0119 z twojego linka kiedy osi\u0105gnie poziom 7");
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
    tmp.innerHTML = tmp.innerHTML.replace(/Companies production reports/,"Raport z firm")
	
	tmp.innerHTML = tmp.innerHTML.replace(/Stock companies reports/,"Raport z firm sp\u00F3\u0142ek gie\u0142dowych")
	
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"Statystyki z podatk\u00F3w")		
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"Historia transakcji na rynku walutowym")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"Wysy\u0142anie wiadomo\u015Bci do cz\u0142onk\u00F3w jednostki wojskowej")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"Wysy\u0142anie wiadomo\u015Bci do cz\u0142onk\u00F3w partii")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/,"Brak reklam")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"Presti\u017Cowa gwiazda na twoim profilu")	
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="Wy\u015Bwietlanie obywatelstw graczy obserwuj\u0105cych dan\u0105 bitw\u0119 i bior\u0105cych w niej udzia\u0142"
	
        tmp = allElements.children[13].children[7]
	tmp.innerHTML="Dodatkowe narz\u0119dzia do obliczenia produktywno\u015Bci swoich firm"
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="Dostep do raport\u00F3w sp\u00F3\u0142ek gie\u0142dowych"
	
	tmp = allElements.children[13].children[15]
	tmp.innerHTML="Tylko dla prezydenta i kongresmen\u00F3w: dostajesz dost\u0119p do informacji na temat przychod\u00F3w z podatk\u00F3w"

    tmp = allElements.children[13].children[18];
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Statystyki ze skarbca pa\u0144stwa")	
	
	tmp = allElements.children[13].children[19]
	tmp.innerHTML="Tylko dla prezydenta i kongresmen\u00F3w: dostajesz dost\u0119p do informacji na temat skarbca pa\u0144stwa i waluty w obiegu"
	
	tmp = allElements.children[13].children[22]
	tmp.innerHTML="Dost\u0119p do historii transkacji na rynku walutowym dla wszystkich walut. Przydatne dla spekulant\u00F3w"
	tmp = allElements.children[13].children[25]
	tmp.innerHTML="Natychmiastowa wiadomo\u015B\u0107 do czlonkow jednostki wojskowej. Musisz mie\u0107 przywileje <u>commander</u>-a w twojej jednostce wojskowej \u017Ceby z tego skorzysta\u0107"
	
	tmp = allElements.children[13].children[27]
	tmp.innerHTML="Je\u015Bli jeste\u015B szefem partii, mo\u017Cesz wys\u0142ac wiadomo\u015B\u0107 do cz\u0142onk\u00F3w twojej partii"
	
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"P\u0142atno\u015Bci")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"Czas trwania")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Cena")
	tmp.innerHTML = tmp.innerHTML.replace(/One Month (30 days)/,"1 miesi\u0105c (30 dni)")
	tmp = allElements.children[15].children[3].children[0]
	tmp.innerHTML="<b>S\u0105 3 sposoby \u017Ceby zap\u0142aci\u0107 :</b><br>"
	tmp = allElements.children[15].children[3].children[2]
	tmp.innerHTML="<ul><li>Jednorazowa op\u0142ata za 30 dni konta premium</li><li> Zam\u00F3w abonament (op\u0142aty zostan\u0105 od dzisiaj zrobione automatycznie co 30 dni dop\u00F3ki nie anulujesz abonamentu)</li><li> Wydaj <img class=\"currencyFlag\" align=\"absmiddle\" src=\"http://e-sim.home.pl/eworld/img/gold.png\" style=\"border: 0px; height: 14px\"><b>10.00</b> Gold na 1 tydzie\u0144 abonamentu</li></ul>"
	
	document.getElementById('buyNameChangeButton').value = "Kup tydzie\u0144 premium za 10 gold"
	
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
    tmp.innerHTML = tmp.innerHTML.replace(/If you enjoy playing <i>e-sim<\/i> and would like to support development of the game with donation, please use the donate button./,"Je\u015Bli lubisz gra\u0107 w <i>e-sim</i> i chcialby\u015B wspom\u00F3c rozw\u00F3j tej gry poprzez darowizn\u0119, kliknij na przycisk poni\u017Cej")
	tmp.innerHTML = tmp.innerHTML.replace(/Your donation will be visible to everyone on this page/,"Twoja darowizna b\u0119dzie widoczna dla wszystkich na tej stronie")
	tmp.innerHTML = tmp.innerHTML.replace(/Donors, who make 2 EUR donations will receive bonus/,"Darczy\u0144cy, kt\u00F3rzy dadz\u0105 min. 2 EUR dostan\u0105")
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","osi\u0105gni\u0119cie 'Donor'"]});
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
