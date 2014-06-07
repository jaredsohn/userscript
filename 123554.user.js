// ==UserScript==
// @name           e-sim Si
// @namespace      e-sim Si
// @include        http://e-sim.org*
// ==/UserScript==
//Translated to Slovenian language by Matevzs1
{
menuLinkReplacements = {
	"work.html"				:["Work","Služba"],
	"train.html"			:["Train","Trening"],
	"companies.html"		:["Companies","Podjetja"],
	"newspaper.html"		:["Newspaper","Časopis"],
	"myParty.html"			:["Party","Stranka"],
	"contracts.html"		:["Contracts","Pogodbe"],
	"inviteFriends.html"	:["Invite friends","Povabi prijatelje"],
	"myMilitaryUnit.html"	:["Military unit","Vojaška enota"],
	
	"productMarket.html"	:["Product market","Trgovina"],
	"jobMarket.html"		:["Job market","Ponudbe služb"],
	"monetaryMarket.html"	:["Monetary market","Denarni trg"],
	"companiesForSale.html"	:["Companies for sale","Podjetja na prodaj"],
	
	"countryStatistics.html"		:["Country statistics","Državna statistika"],
	"partyStatistics.html"			:["Party statistics","Stranskarka statistika"],
	"newspaperStatistics.html"		:["Newspaper statistics","Časopisna statistika"],
	"citizenStatistics.html"		:["Citizen statistics","Statistika igralcev"],
	"militaryUnitStatistics.html"	:["Military unit stats","Statistika vojaških enot"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Najbolši članki"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Zadnji članki"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Vojaški dogodki"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Politični dogodki"],
	
	"battles.html"							:["Battles","Vojne"],
	"countryPoliticalStatistics.html"		:["War and politics","Vojna in politika"],
	"countryEconomyStatistics.html"			:["Economy","Ekonomija"],
	"countryLaws.html"						:["Laws","Zakoni"],
	"partyElections.html"					:["Party elections","Strankarske volitve"],
	"congressElections.html"				:["Congress elections","Kongresne volitve"],
	"presidentalElections.html"				:["Presidential elections","Predsedniške volitve"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Državljanstva"],
	"googleMap.html"						:["Map","Zemljevid"],
};


//? ??
menuTextReplacements = {
	"myPlacesButton":["My places","Moji prostori"],
	"marketButton":["Market","Market"],
	"statisticsButton":["Statistics","Statistika"],
	"newsButton":["News","Novice"],
	"electionsButton":["Country","Država"]
};

//---------------------------------------------------
//????
//---------------------------------------------------
//????1 <span class='key' ...>
sideLink1Replacements = {
	"crossIcon"	:["Logout","Odjava"],
	"workIcon"	:["Work","Služba"],
	"fightIcon"	:["Fight","Borba"],
	"avatarIcon":["Upload avatar","Naloži avatar"],
	"voteIcon"	:["Vote","Glasuj"],
};
//????2 <a href='key' ...>
sideLink2Replacements = {
	"travel.html"	:["Travel","Potuj"],
	"pendingCitizenshipApplications.html"	:["change","Spremeni"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","Vodič za zdravje"],
};
//????3 <a id='key' href="" ...>
sideLink3Replacements = {
	"eatLink"	:["Eat food","Jej hrano"],
	"useGiftLink":["Use gifts","Uporabi darila"]
};
//????4 <input id='key' value="Eat Food" ...>
sideLink4Replacements = {
	"eatButton":["Eat Food","Jej hrano"],
	"useGiftButton":["Use gift","Uporabi darila"] 
};

//?? ??
hpTitleReplacements = {
	"News":["News","Novice"],
	"Shouts":["Shouts","Shouti"],
	"Battles":["Battles","Vojne"],
	"Events":["Events","Dogodki"]
};

//?? tabs All
hpTabsReplacements = {
	"#topArticles":["Global","Globalno"],
	"#latestArticles":["Latest","Zadnjo"],
	"#localArticles":["Local","Lokalno"],
	
	"#countryShouts":["Country","Državni"],
	"#friendsShouts":["Military unit","Vojaška enota"],
	"#myShouts":["Friends","Prijatelji"],
	
	"#localBattles":["Country","Državne"],
	"#substidedBattles":["Subsidized","Plačane"],
	"#hotBattles":["Important","Pomembne"],

	"#localEvents":["Military","Vojska"],
	"#globalEvents":["Military","Vojska"],
	"#politicalEvents":["Political","Politika"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Vodič za denarni trg"],
};



//============================================================================
//????
//============================================================================
//---------------------------------------------------
//???FireFox???
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;
//alert(isFF);


//---------------------------------------------------
//??evaluate????obj?????k????
//---------------------------------------------------
function getElements(obj, k) {
	return document.evaluate(k, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//---------------------------------------------------
//evaluate?????
//??????objs?,???????href????????
//---------------------------------------------------
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

//---------------------------------------------------
//evaluate?????
//??????objs?,???????innerHTML????????
//---------------------------------------------------
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

//---------------------------------------------------
//???replacements?key????document??ID????,??????
//  key=???????ID
//---------------------------------------------------
function replaceInnerHTML2(replacements) {
	var obj;
	for (k in replacements) {
		obj = document.getElementById(k);
		obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
	}
}

//---------------------------------------------------
//private
//objs evaluate,k
//---------------------------------------------------
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

//---------------------------------------------------
//private
//????objs??evaluate k
//---------------------------------------------------
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

//---------------------------------------------------
//  <span class='key' ...>  key
//---------------------------------------------------
function replaceSpanByClass(replacements) {
	replaceCommon(document, replacements, "//span[@class='", "']");
}

//---------------------------------------------------
//  <a href='key' ...>  key
//---------------------------------------------------
function replaceLinkByHref(replacements) {
	replaceCommon(document, replacements, "//a[@href='", "']");
}

//---------------------------------------------------
//  <a href='???' ...>  keylink
//---------------------------------------------------
function replaceLinkSSS(replacements) {
	replaceCommonSSS(document, "" ,replacements, "//a[@href", "]");
}
//---------------------------------------------------
function replaceLinkByHrefSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@href='", "']");
}

//---------------------------------------------------
//  <a style='key' ...>  key
//
//	key="font-weight: bold"
//	{ "More shouts":["More shouts",""]] }
//---------------------------------------------------
function replaceLinkByStyleSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@style='", "']");
}

//---------------------------------------------------,
//  <a id='key' ...>  key
//---------------------------------------------------
function replaceLinkByID(replacements) {
	replaceCommon(document, replacements, "//a[@id='", "']");
}

//---------------------------------------------------
//  <input id='key' value="Eat Food" ...>  key
//---------------------------------------------------
function replaceInputByID(replacements) {
//	replaceCommon(document, replacements, "//input[@id='", "']");
	var obj;
	for (k in replacements) {
		obj = document.getElementById(k);
		obj.value = obj.value.replace(replacements[k][0], replacements[k][1]);
	}
}

//---------------------------------------------------
//  <input value='key' ...>  key
//---------------------------------------------------
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


//---------------------------------------------------
//  <input value="key" class="kk">
//
//	key="fightButton"
//	{ "Fight (1 hit)":["Fight (1 hit)","xxxx"]] }
//---------------------------------------------------
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

//---------------------------------------------------
//replace common
//  Allies link
//---------------------------------------------------
function replaceAlliesLinkComm(k) {
	var results;
	var obj;
	results = getElements(document, "//a[@class='" + k + "']");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 sojusznik\u00F3w");
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
//		alert(obj.nodeValue);
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"brez zaveznikov");
	}
}

function replaceAlliesLinksss() {
	results = getElements(document, "//div[@class='battleDiv']");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp=results.snapshotItem(i).children[0];
		replaceNoAlliesComm(tmp);
		tmp=results.snapshotItem(i).children[2];
		replaceNoAlliesComm(tmp);

		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Upor");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Plačano:");
	}
}
//---------------------------------------------------
//replace common
//  battle info
//---------------------------------------------------
function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"Brez zaveznikov");
	//12 allies
	if (obj.innerHTML.match("1 ally{
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 zaveznik
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 zaveznikov
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Upor
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Plačano
}

//---------------------------------------------------
//replace common
//---------------------------------------------------
//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"sekund/nazaj");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"minut\nazaj");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"ur\nazaj");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"dni/nazaj");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"mesecev\nazaj");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 sekund nazaj");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 minut nazaj");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 ur nazaj");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 dni nazaj");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 mesecev nazaj");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"sekund nazaj");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"minut nazaj");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"ur nazaj");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"dni nazaj");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"mesecev nazaj");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 sekund nazaj");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 minut nazaj");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 ur nazaj");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 dni nazaj");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 mesecev nazaj");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"sekund nazaj");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"minut nazaj");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"ur nazaj");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"dni nazaj");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"mesecev nazaj");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 sekund nazaj");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 minut nazaj");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 ur nazaj");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 dni nazaj");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 mesecev nazaj");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Zadnji");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"branilci:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"napadalci:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Statistika trenutne runde");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Skupna škoda branilcev:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Skupna škoda napadalcev:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Tvoja škoda:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Najbolše branilske države:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Najbolše napadalske države:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Najbolše branilske vojaške enote:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Najbolše napadalske vojaške enote:");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"sekund nazaj");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"minut nazaj");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"ur nazaj");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"dni nazaj");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"mesecev nazaj");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 sekund nazaj");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 minut nazaj");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 ur nazaj");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 dni nazaj");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 mesecev nazaj");
                } 
        }
    }
}
	    
//		alert("1-2");
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Poročilo"],
		"Delete":["Delete","Izbriši"],
		"Edit":["Edit","Uredi"],
		"More shouts":["More shouts","Več shoutov"]
	});
	
	
	replaceInputByValue({
		"Report":["Report","Prijavi"],
		"Delete":["Delete","Izbriši"],
		"Edit":["Edit","Uredi"]
	});	
	
}



//============================================================================
//Menu
//============================================================================
function doMenu() {
	//menu link
	replaceLinkByHref(menuLinkReplacements);
	//menu text
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3]
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"dan")
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Level: ");
	//	tmp.innerHTML=tmp.innerHTML.replace(/(XP:)/,"XP:");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Rank:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Naslednji rank:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Ekonomski skill:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Moč:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Lokacija:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Državljanstvo:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Limit hrane:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Limit daril:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Tvoj denar");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Tvoje skladišče");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Tvoja sporočila");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Tvoje današnje naloge:");
	
	//?? ?? ????
	replaceLinkByHref(sideLink2Replacements);
	//?? ??
	replaceLinkByID(sideLink3Replacements);
	//??-2 ??-2
	replaceInputByID(sideLink4Replacements);
	//?? ?? ?? ??
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Trenutna runda");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Runda $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Kvaliteta kruha");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Kvalitega daril ");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Brez orožja (");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Vse kvalitete");
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
		"Show more battles":["Show more battles","Pokaži več bitk],
		"Subsidies informations":["Subsidies informations","Informacije o plačilu"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		//"No subsidized battles":["No subsidized battles","?????"],
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Ni plačanih bitk");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Ukazi tvoje voaške enote:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Bori se za:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"minuto nazaj");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"uro nazaj");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"včeraj");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"mesec nazaj");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 minut nazaj");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 ur nazaj");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 dni nazaj");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 mesecev nazaj");
        }
		
		//Slovenia secured Tuscany in the battle versus Italy
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g,"v bitki proti ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Ljudje so se uprli v $4 $5 ");
		//was attacked by Slovenia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"je bila napadena iz $2$3");
		//President of Slovenia proposed to declare war to Italy
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Predsednik $2$3 je predlagal napoved vojne ");
		//Slovenia  has declared war to Italy
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," je napovedla vojno $2$3 ");
		//Slovenia conquered Central Italy in the battle versus Italy 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," je zavzela $2, v bitki proti ");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","Prikaži več dogodkov"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Prikaži več dogodkov");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Napiši nov shout:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Objavi"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Pošlji na :");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Pošlji na :");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Država | $2  Vojaška enota | $4 Prijatelji");
	
    //Characters remaining: 100
	allElements.innerHTML=allElements.innerHTML.replace(/(Characters remaining:)/,"Preostali znaki:");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Več shoutov"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Ponudbe služb ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Kriteriji:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Država:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Ekonomski skill:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Delodajalec");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Podjetje");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Izdelek");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Minimalni skill");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Plača");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Sprejmi");
	
	replaceInputByValue({"Apply":["Apply","Sprejmi"],"Show":["Show","Prikaži]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Služba");
	
	
//	tmp = allElements.children[4];
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Nimaš službe");
		replaceInputByValue({"Get a job now!":["Get a job now!","Dobi službo!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Da lahko delaš moraš biti v državi v kateri je podjetje");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Tvoje delovno mesto");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Delodajalec");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Plača:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Daj odpoved");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Danes še nisi delal");
			replaceInputByValue({"Work now":["Work now","Delaj zdaj"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Delovni uspeh");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Bruto plača");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Neto plača");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"plačilo davka");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Delal si pri");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Dobljeni XPji");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Dobljen ekonomski skill");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Dnevi dela brez prekinitve");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Tvoja produktivnost");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Produktivi členi");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Končna produktivnost");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Naredil si/produktov");
			//+60% Raw company quality 
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Surovnska kvaliteta podjetja");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Vse"],
		"2":["Iron","Železo"],
		"3":["Grain","Žito"],
		"4":["Oil","Olje"],
		"5":["Stone","Kamenje"],
		"6":["Wood","Les"],
		"7":["Diam.","Diam."],
		"8":["Weap.","Orožje"],
		"9":["House","Hiše"],
		"10":["Gift","Darila"],
		"11":["Food","Hrana"],
		"12":["Ticket","Karte"],
		"13":["DS","OS"],
		"14":["Hosp.","Bolnica"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Trg");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Pokaži ponudbe:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Država:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Kvaliteta:");
	
	replaceInputByValue({"View offers":["View offers","Pokaži ponudbe"],"Buy":["Buy","Kupi"]});
	
	results = getElements(document, "//label[@for]");
//	alert(results.snapshotLength);
//	alert(results.snapshotItem(0).htmlFor);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
//		alert(obj.htmlFor);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
//			alert(obj.innerHTML);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Pokaži moje ponudb / Naredi novo ponudbo"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Izdelek");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Prodajalec");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Količina");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Cena");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Kupi");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," stvari "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Pokaži moje ponudbe / Pošlji novo ponudbo"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","Info. o izdelkih"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Vojaški trening");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Trenuj"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Trening končan, wrvrni se jutri");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Danes si že treniral");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Danes si že trenural, vrni se jutri");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Dobljena moč:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Vojaše podrobnosti");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Skupaj treningov:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Moč:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Vojaški rank:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Skupna narejena škoda:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Škoda brez orožja:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Škoda z Q1 orožjem:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/," Škoda z Q2 orožjem:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/," Škoda z Q3 orožjem:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/," Škoda z Q4 orožjem:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/," Škoda z Q5 orožjem:");
	
}

//============================================================================
//Battles List ????
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Bitke");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Država");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Sortiranje:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Samo plačane bitke:");
	
	replaceInputByValue({"Show battles":["Show battles","Pokaži bitke"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Začetek bitke");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Bitka");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"branilec proti napadalcu");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Rezultat");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Skupaj narejena škoda");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Upor");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"začel jo je");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Runda $2");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Runde zmagane od branilcev");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Runde zmagane od napadalcev");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Najbolši branilci");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Najboljši napadalci");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"V bitki se nemoreš boriti ker nisi a pravi lokaciji!");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Preseliti se moraš v okupirano državo za sodelovanje v tej bitki");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"S svoje trenutne lokacije se nemorete boriti v tej bitki");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Preseliti se morate v eno izmed držav, ki so delujejo v bitki ");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Ta runda je bila zmagana od :");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Izberi orožje:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Izberi svojo stran:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Tvoja stran:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Pokaži rundo:");
	}
	replaceInputByValue({"Show round":["Show round","Pokaži rundo"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Pokaži statistiko celotne bitke");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Vodič o borjenju");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Vojna pravila");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"začeta od");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Runda $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Bithe zmagane od branilcev");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Bithe zmagane od napadalcev");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Nazaj na bitko");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Statistika se osveži vsakih 30 sekund");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Statistika bitke");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Igralec ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Prijavljen");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Odjaljen");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Uredi profil"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Prijavi račun"]
	});
	replaceInputByValue({"Report multi":["Report multi","Prijavi račun"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Trajno banan");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Razlog:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Banal ga je :");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Level:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Škoda:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Rank:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Ekonomski skill:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Moč:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Lokacija:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Državljanstvo:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Dan rojstva:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Vojaška enota:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Stranka:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Časopis:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Dela pri:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Lastniška podjetja");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Politična pozicija:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Ni vojaške enote");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Ni član stranke");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Nima časopisa");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Nima službe");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Nima svojih podjetij");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Brez položaja");
	
//	allElements = document.getElementById('contentRow').children[2];
//	tmp = allElements.children[0].children[0];
	allElements = getElements(document, "//ul[@style]");
//	alert(allElements.snapshotLength);
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Aktivni dolgovi");
			//tmp.innerHTML=tmp.innerHTML.replace(/(payback time )(\d*)( game day)/,"Dan plačila $2 dan");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"Čas plačila");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1 dan");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Prijatelji");
	
//	alert(allElements.snapshotItem(0).parentNode.children[0].innerHTML);
	
	//
	//allElements = document.getElementById('countryShouts');
	//allElements.parentNode.children[0].innerHTML=allElements.parentNode.children[0].innerHTML.replace(/Shouts:/,"Shouts:");
	//
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
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Novo geslo:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Ponovno vpišite novo geslo:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Staro geslo:  :");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nov avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max. velikost; :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Igralec");
	replaceInputByValue({"Edit citizen":["Edit citizen","Uredi profil"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Potuj");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Država");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Regija:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Kvaliteta karte:");
	
	replaceInputByValue({"Travel":["Travel","Potuj"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Vodiš o potovanju"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Sporočilo od: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Poslana sporočila: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Avtor");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Sporočilo");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Datum");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Odstrani");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"Do");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
//		alert(i);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Poslana sporočila"],
		"composeMessage.html":["Compose message","Napiši sporočilo"]
	});
	replaceInputByValue({
		"Delete":["Delete","Izbriši"],
		"Quick reply":["Quick reply","Hiter odgovor"],
		"Report":["Report","Prijavi"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Prijavi"],
		"Quick reply":["Quick reply","Hiter odgovor"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Odgovori"],
		"conversation.html":["Previous messages","PrejšnjA sporočila"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
//
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Prejeta sporočila"],
		"composeMessage.html":["Compose Message","Napiši sporočilo"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Novo sporočilo");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Prejeta spoočila"],
		"sentMessages.html":["Sent messages","Poslana sporočila"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Prejemnik:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Naslov:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Sporočilo:");
	
	replaceInputByValue({
		"Send":["Send","Pošlji"],
		"Preview":["Preview","Predogled"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Naročnine");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Naročnine");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Lista noročnin"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Naročeni časopisi");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Skupaj naročnin");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Časopis");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Čas naročnin");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Vodič o časopisih"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Časopis");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Zadnji članki");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Uredi časopis"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Vodič o časopisih"]
	});
	replaceInputByValue({
		"Publish":["Publish","Objavi"],
		"Preview":["Preview","Predogled"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Napiši nov članek");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Opublikuj Objavi v državi");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Naslov članka:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Vsebina:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Prosimo, da si shraniš članek na dik preden klikneš bjavi zaradi varnostnih razlogov!");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Ime časoisa:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Nov logotip:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max. velikost; :");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Uredi časopis"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Uredi časopis"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Članek");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Uredi članek"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Uredi časopis"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Prijavi"],
		"Edit":["Edit","Edit"],
		"Delete":["Delete","Izbiši"]
	});
	replaceInputByValue({
		"Publish":["Publish","Objavi"],
		"Report":["Report","Prijavi"],
		"Edit":["Edit","Uredi"],
		"Delete":["Delete","Izbriši"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Nov komentar");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Sporočilo:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Časopis");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Uredi");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Naslov članka:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Vsebina:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Uredi časopis"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Vodič o časopisih"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Uredi članek"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Pogodbe");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Predloga");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Predlagane pogodbe(zadnjih 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"ponujena ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Ni pogodb");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Sprejete pogodbe (zadnjih 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"ponujena");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Ni pogodb");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Zavrnjene pogodbe");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Zarnil jo je $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Ni pogodb");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Neuspešne pogodbe");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Ni pogodb");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Tvoja aktivna posojila");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Izposojitelj");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Datum vrnitve");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Skupaj");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Prekliči dolg");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Ni dolgov");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Tvoji aktivni dolgovi");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Posojitelj");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Datum vračila");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Skupaj");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Plačaj dolg");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Ni dolgov");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Ime predloge:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Vodič o pogodbah"],
		"#":["Create new template","Naredi novo predlogo"]
	});
	replaceInputByValue({
		"Delete":["Delete","Izbriši"],
		"Create template":["Create template","Naredi predlogo"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Razlog $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Prijatelj")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Prijatelj");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"razlog $1")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," bo doniral naslednje izdelke, ");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," bo doniral količino denarja");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," bo sprejel dolg");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"$1$3$5 more plačati dolg $6 dni po podpisani pogodbi"
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Pogodbe");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Pogodba");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Status pogodbe: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Sprejeta");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Zavrnjena od $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Neuspešna");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Predloga");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Dodaj nov element v pogodbo");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Stran");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Vrsta izdelka");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Prijatelj");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Denar"],
			"Product":["Product","Idelek"],
			"Debt":["Debt","Dolg"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Denar ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Kvaliteta:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Rodzaj Vrsta izdelka:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Kvaliteta:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Železo"],
			"Grain":["Grain","Žito"],
			"Oil":["Oil","Olje"],
			"Stone":["Stone","Kamenje"],
			"Wood":["Wood","Les"],
			"Diamonds":["Diamonds","Diamanti"],
			"Weapon":["Weapon","Orožje"],
			"House":["House","Hiša"],
			"Gift":["Gift","Darilo"],
			"Food":["Food","Hrana"],
			"Ticket":["Ticket","Karta"],
			"Defense System":["Defense System","Varnostni sistem"],
			"Hospital":["Hospital","Bolnica"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Dolg");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Denar v ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Datum vračila:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Kvaliteta izdelka:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Predlagaj pogodbo");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Predlagaj igralcu");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Obvestilo:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Pogodbo lahko predlagaš samo prijatelju");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Prijatelj"],
		"contracts.html":["Go back to contract list","Nazaj na listo pogodb"]
	});
	replaceInputByValue({
		"Delete":["Delete","Izbriši"],
		"Propose":["Propose","Predlagaj"],
		"Add item":["Add item","Dodaj"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Calcel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Zavrni ponudbo")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Zavrni ponudbo"]});
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
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Denarni trg")
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Trenutne ponudbe")
    
    allElements = results.snapshotItem(0).children[4]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Pokaži ponudbe")
    
    allElements = results.snapshotItem(0).children[4]
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Obrni valute")
    
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Kupi denar")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Prodaj denar")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Pokaži ponudbe")
    
    allElements = results.snapshotItem(0).children[7]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Vodiš o MM trgu")
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Prodajalec");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Količina");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Menjalni tečaj");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Kupi");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Količina");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Menjalni tečaj"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Izbriši");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Ni ponudb");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Tvoje poudbe") 
    
    allElements = results.snapshotItem(0).children[5]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Objavi svojo ponudbo")
    
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Zamenjaj valute")
    
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Ponujen denar")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Kupi denar")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Menjalni tečaj")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Objavi novo ponudbo")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Ponudba")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"po menjalnem tečaju")
    
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
    
    //var x = document.getElementsByTagName("TD");
    //tmp = x[19]
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Trg")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Objavi novo ponudbo")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Država")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Izdelek")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Kvaliteta")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Cena")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Objavi novo ponudbo")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Pokaži ponudbe na trgu");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Tvoje skladišče");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Tvoje ponudbe na trgu")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Izdelek")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Prodajalec");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Skladišče");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Cena");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Bruto");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Cena");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Neto");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Uvozni davek");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Izbriši");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Podjetja");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Podjetje")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Izdelek")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Regija")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Zaposleni")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Naredi novo podjetje")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Ime podjetja")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Izdeloval boš")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Logotip podjetja")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Ustvari podjetje")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Ustanovitev podjetja stane")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"Podjetje bo ustvarjeno na lokaciji v kateri trenutno prebivaš")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Izbira regije z surovinami")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"vodič o podjetjih")
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Državna politika");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Izberi državo");
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Predsednik");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"ogled volitev");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Predsednik"]})
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Kongres");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Kongres"]})
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Vojne");
    tmp = allElements.children[21]
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Vojna");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Podrobnosti");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Ni vojn");
    tmp = allElements.children[22]
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Pravila vojn");
    tmp = allElements.children[23]
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Zavezniki");
    tmp = allElements.children[27]
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Država");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Poteče"); 
    tmp = allElements.children[27].children[0]
    var loopz = tmp.children.length   
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1]
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"sekund ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"minut ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"ur ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"dni ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"mesecev ");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 sekund ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 minut ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 ur ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 dni ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 mesecev ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Zavezniki"]})
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Povabi prijatelje");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Tvoj reffer link");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Pošlji ta link prijateljem, da dodatno zaslužiš!");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Zaslužiš");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"Golda za za vsakega, ki se registrira preko tvojega reff linka");
    tmp.innerHTML = tmp.innerHTML.replace(/and earn level 7/,"in pride do levela 7");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"kliku na ta link");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"in druge");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she get his\/her/,"Gold dobiš za");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"prvo medaljo");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Dodatno pa ");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% vsega golda ki ga zasluži.");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive additional/,"Tvoj prijatelj bo tudi zaslužil!");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering from your invitation when he reach level 7/,"Zaslužil bo gold za level 7 in tvoje povabilo.");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Igralci, ki si jih povabil");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Sortiranje");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Prikaži");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Igralec");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Level");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Prejet gold");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Datum registracije");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Statistika");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Skupaj klikov na tvoj reff link");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Unikatnih klikov na tvoj reff link");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"CaSkupaj registriranih igralcev reko tvojega reff linka");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Igralci, ki so dosegli level 7");
    tmp = allElements.children[14]
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Zadnji kliki na tvoj reff link");
    tmp = allElements.children[15]
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Čas");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Vabitelj");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Igralec");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Ni registriran");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Pokaži več klikov");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"sekund nazaj");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"minut nazaj");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"ur nazaj");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"dni nazaj");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"mesecev nazaj");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 sekund nazaj");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 minut nazaj");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 ur nazaj");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 dni nazaj");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 mesecev nazaj");
            } 
        }
    }
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
}