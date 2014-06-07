// ==UserScript==
// @name           e-sim TR
// @namespace      e-sim TR
// @include        http://*.e-sim.org*
// @grant          none

// ==/UserScript==
//Turkish translation by HMK
//Added new functions by HMK

menuLinkReplacements = {
	"work.html"				:["Work","\u0130\u015F Yeri"],
	"train.html"			:["Train","Antreman Alan\u0131"],
	"companies.html"		:["Companies","\u015Eirketler"],
	"newspaper.html"		:["Newspaper","Gazete"],
	"myParty.html"			:["Party","Parti"],
	"contracts.html"		:["Contracts","\u015E\u00F6zle\u015Fme"],
	"myShares.html"		    :["Shares","Hisseler"],
	"inviteFriends.html"	:["Invite friends","Arkada\u015Flar\u0131n\u0131 davet et"],
	"myMilitaryUnit.html"	:["Military unit","Askeri grup"],
	"subscription.html"     :["Premium account","Premium hesap"],
	
	"productMarket.html"	:["Product market","\u00DCr\u00FCn marketi"],
	"jobMarket.html"		:["Job market","\u0130\u015F teklifleri"],
	"monetaryMarket.html"	:["Monetary market","Para piyasas\u0131"],
	"stockMarket.html"	    :["Stock market","Borsa"],
	"companiesForSale.html"	:["Companies for sale","Sat\u0131l\u0131k \u015Firketler"],
	
	"countryStatistics.html"		:["Country statistics","\u00DClke istatistikleri"],
	"partyStatistics.html"			:["Party statistics","Parti istatistikleri"],
	"newspaperStatistics.html"		:["Newspaper statistics","Gazete istatistikleri"],
	"citizenStatistics.html"		:["Citizen statistics","Vatanda\u015F istatistikleri"],
	"militaryUnitStatistics.html"	:["Military unit stats","Askeri grup ist."],
	"stockCompanyStatistics.html"	:["Stock market stats","Borsa istatistikleri"],
	"donations.html"                :["Donations","Ba\u011F\u0131\u015Flar"],
    "fundRaising.html?id=4"              :["New modules","Yeni mod\u00FCller"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","En iyi makaleler"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Son \u00e7\u0131kan makaleler"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Askeri olaylar"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Siyasi olaylar"],
	
	"battles.html"							:["Battles","Sava\u015Flar"],
	"countryPoliticalStatistics.html"		:["War and politics","Sava\u015f ve Politika"],
	"countryEconomyStatistics.html"			:["Economy","Ekonomi"],
	"countryLaws.html"						:["Laws","Yasalar"],
	"partyElections.html"					:["Party elections","Parti se\u00e7mleri"],
	"congressElections.html"				:["Congress elections","Milletvekilli\u011fi se\u00e7imleri"],
	"presidentalElections.html"				:["Presidential elections","Ba\u015fkanl\u0131k se\u00e7imler"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Vatanda\u015fl\u0131k"],
	"googleMap.html"						:["Map","Harita"]
};


menuTextReplacements = {
	"myPlacesButton":["My places","Yerlerim"],
	"statisticsButton":["Statistics","\u0130statistikler"],
	"newsButton":["News","Haberler"],
	"electionsButton":["Country","\u00dclke"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","\u00c7\u0131k\u0131\u015f yap"],
	"workIcon"	:["Work","\u00c7al\u0131\u015f"],
	"fightIcon"	:["Fight","Sava\u015f"],
	"avatarIcon":["Upload avatar","Profil resmi y\u00fckle"],
	"voteIcon"	:["Vote","Oyla"],
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Ta\u015f\u0131n"],
	"pendingCitizenshipApplications.html"	:["change","De\u011fi\u015ftir"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Sa\u011fl\u0131k e\u011fitimi"],
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Ekmek ye"],
	"useGiftLink":["Use gifts","Hediye kullan"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Ekmek ye"],
	"useGiftButton":["Use gift","Hediye kullan"] 
};


hpTitleReplacements = {
	"News":["News","Haberler"],
	"Shouts":["Shouts","Seslenmeler"],
	"Battles":["Battles","Sava\u015flar"],
	"Events":["Events","Olaylar"]
};


hpTabsReplacements = {
	"#topArticles":["Global","K\u00fcresel"],
	"#latestArticles":["Latest","Son \u00e7\u0131kan"],
	"#localArticles":["Local","Yerel"],
	
	"#countryShouts":["Country","\u00dclke"],
	"#friendsShouts":["Military unit","Askeri grup"],
	"#myShouts":["Friends","Arkada\u015flar"],
	
	"#localBattles":["Country","\u00dclke"],
	"#substidedBattles":["Subsidized","Paral\u0131"],
	"#hotBattles":["Important","\u00d6nemli"],

	"#localEvents":["Military","Askeri"],
	"#globalEvents":["Military","Askeri"],
	"#politicalEvents":["Political","Politikal"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Para piyasas\u0131 e\u011fitimi"],
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 m\u00fcttefik");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"m\u00fcttefik yok");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"\u0130syan sava\u015f\u0131");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Paral\u0131");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"m\u00fcttefik yok");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 m\u00fcttefik");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 m\u00fcttefik");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"\u0130syan sava\u015f\u0131");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Paral\u0131:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"1 saniye \u00f6nce");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"1 dakika \u00f6nce");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"1 saat \u00f6nce");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"1 g\u00fcn \u00f6nce");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"1 ay \u00f6nce");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 saniye \u00f6nce");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 dakika \u00f6nce");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 saat \u00f6nce");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 g\u00fcn \u00f6nce");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 ay \u00f6nce");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"1 saniye \u00f6nce");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"1 dakika \u00f6nce");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"1 saat \u00f6nce");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"1 g\u00fcn \u00f6nce");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"1 ay \u00f6nce");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 saniye \u00f6nce");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 saniye \u00f6nce");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 saat \u00f6nce");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 g\u00fcn \u00f6nce");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 ay \u00f6nce");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"1 saniye \u00f6nce");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"1 dakika \u00f6nce");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"1 saat \u00f6nce");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"1 g\u00fcn \u00f6nce");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"1 ay \u00f6nce");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 saniye \u00f6nce");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 dakika \u00f6nce");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 saat \u00f6nce");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 g\u00fcn \u00f6nce");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 ay \u00f6nce");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"En son");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"savunanlar:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"sald\u0131ranlar:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"\u015eimdiki raundun istatistikleri");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Savunanlar\u0131n toplam hasar\u0131:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Sald\u0131ranlar\u0131n toplam hasar\u0131:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Senin verdi\u011fin hasar:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"En iyi savunan \u00fclkeler:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"En iyi sald\u0131ran \u00fclkeler:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"En iyi savunan askeri gruplar:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"En iyi sald\u0131ran askeri gruplar:");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"1 saniye \u00f6nce");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"1 dakika \u00f6nce");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"1 saat \u00f6nce");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"1 g\u00fcn \u00f6nce");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"1 ay \u00f6nce");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 saniye \u00f6nce");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 dakika \u00f6nce");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 saat \u00f6nce");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 g\u00fcn \u00f6nce");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 ay \u00f6nce");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Rapor et"],
    "Delete":["Delete","Sil"],
    "Edit":["Edit","D\u00fczenle"],
    "More shouts":["More shouts","Daha fazla"]
});
	
	
replaceInputByValue({
    "Report":["Report","Rapor et"],
    "Delete":["Delete","Sil"],
    "Edit":["Edit","D\u00fczenle"]
});	
	




//============================================================================
//Menu
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3]
    //alert(allElements.innerHTML);
	allElements.innerHTML=allElements.innerHTML.replace(/day/,"g\u00fcn")
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Seviye: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"R\u00fctbe:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Sonraki r\u00fctbe:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Ekonomik yetenek:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"G\u00fc\u00e7: ");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Bulundu\u011fun b\u00f6lge:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Vatanda\u015fl\u0131k:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Ekmek hakk\u0131n:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Hediye hakk\u0131n:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Paran");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Envanterin");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Mesajlar\u0131n");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Bug\u00fcnki g\u00f6revin:");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"\u015eimdiki raund");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Raund $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Ekmek kalitesi");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Hediye kalitesi");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Silahs\u0131 (");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Herhangi bir kalite");
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
		"Show more battles":["Show more battles","Daha fazla sava\u015f g\u00f6ster"],
		"Subsidies informations":["Subsidies informations","Para bilgileri"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Paral\u0131 sava\u015f yok");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Askeri grubunun sava\u015f emirleri:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Sava\u015faca\u011f\u0131n taraf:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"1 dakika \u00f6nce");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"1 saat \u00f6nce");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"1 g\u00fc \u00f6nce");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"1 ay \u00f6nce");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 dakika \u00f6nce");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 saat \u00f6nce");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 g\u00fcn \u00f6nce");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 ay \u00f6nce");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,", $2 b\u00f6lgesini savundu from");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 halk\u0131, $4 $5 b\u00f6lgesinde isyan sava\u015f\u0131 ba\u015flatt\u0131");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g," b\u00f6lgesine $2$3 taraf\u0131ndan sald\u0131r\u0131ld\u0131");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"$2$3 ba\u015fkan\u0131, $5'a$6 kar\u015f\u0131 sava\u015f teklifi yasas\u0131 sundu");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g,", $2'a$3 kar\u015f\u0131 sava\u015f ilan etti");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g,", $2 b\u00f6lgesini ele ge\u00e7irdi from ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," yeni ba\u015fkan\u0131n\u0131 se\u00e7ti");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Daha fazla olay g\u00f6ster");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Yeni bir yaz\u0131 yaz:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Seslen!"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"\u015funlara g\u00f6nder: ");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"\u015funlara g\u00f6nder: ");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/,"\u00dclke | $2  Askeri grup | $4 Arkada\u015flar");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Daha fazla g\u00f6ster"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"\u0130\u015f Teklifleri ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Kr\u0131terler:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"\u00dclke:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Ekonomik yetenek:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"\u0130\u015f veren");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"\u015eirket");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"\u00dcr\u00fcn");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"En d\u00fc\u015f\u00fck yetenek");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Maa\u015f");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Ba\u015fvur");
	
	replaceInputByValue({"Apply":["Apply","Ba\u015fvur"],"Show":["Show","G\u00f6ster"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"\u0130\u015f yeri");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Herhangi bir \u015firkette \u00e7al\u0131\u015fmv131yorsun");
		replaceInputByValue({"Get a job now!":["Get a job now!","\u0130\u015f bul!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"\u00c7al\u0131\u015fmak i\u00e7in \u015firketin bulundu\u00fclkede olman laz\u0131m");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"\u00e7al\u0131\u015fma alan\u0131n");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"\u0130\u015f veren");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Maa\u015f:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"\u0130\u015ften ayr\u0131l");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Bug\u00fcn \u00e7al\u0131\u015fmad\u0131n");
			replaceInputByValue({"Work now":["Work now","\u015fimdi \u00e7al\u0131\u015f"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Bug\u00fcnki \u00e7al\u0131\u015fman\u0131n sonucu");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Br\u00fct maa\u015f\u0131n");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Net maa\u015f\u0131n");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"\u00d6denen gelir vergisi");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"\u00c7al\u0131\u015ft\u0131\u011f\u0131n yer");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"Kazan\u0131lan XP");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Kazan\u0131lan ekonomik yetenek");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Ardarda \u00e7al\u0131\u015ft\u0131\u011f\u0131n g\u00fcn say\u0131s\u0131");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Temel \u00fcretim");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"\u00dcretim etkenleri");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Toplam \u00fcretim");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"\u00dcretilen mam\u00fcl");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Hammadde \u015firketinin kalitesi");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Hi\u00e7 biri"],
		"2":["Iron","Demir"],
		"3":["Grain","Tah\u0130l"],
		"4":["Oil","Petrol"],
		"5":["Stone","Ta\u015f"],
		"6":["Wood","Kereste"],
		"7":["Diam.","Elmas"],
		"8":["Weap.","Silah"],
		"9":["House","Ev"],
		"10":["Gift","Hediye"],
		"11":["Food","Ekmek"],
		"12":["Ticket","Bilet"],
		"13":["DS","Savunma sistemi"],
		"14":["Hosp.","Hastane"],
		"15":["Est.","Konak"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"\u00dcr\u00fcn marketi");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Teklifleri g\u00f6ster:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","\u00dclke:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Kalite:");
	
	replaceInputByValue({"View offers":["View offers","Teklifleri g\u00f6r\u00fcnt\u00fcle"],"Buy":["Buy","Sat\u0131n al"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Tekliflerimi g\u00f6ster / Yeni teklif sun"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"\u00dcr\u00fcn");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Sat\u0131c\u0131");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Stok");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Fiyat");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Sat\u0131n al");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," adet "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Tekliflerimi g\u00f6ster / Yeni teklif sun"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","\u00dcr\u00fcnler hakk\u0131nda"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Askeri e\u011fitim");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Antreman tamamland\u0131. L\u00fctfen yar\u0131n tekrar gel.")) {
		replaceInputByValue({"Train":["Train","Antreman"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Antreman tamamland\u0131. L\u00fctfen yar\u0131n tekrar gel.");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Bug\u00fcn zaten antreman yapt\u0131n");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Bug\u00fcn zaten antreman yapt\u0131n. L\u00fctfen yar\u0131n tekrar gel.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Kazan\u0131lan g\u00fc\u00e7:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Askeri detaylar");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Toplam yap\u0131lan antreman say\u0131s\u0131:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"G\u00fc\u00e7:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Askeri r\u00fctbe:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Verilen toplam hasar:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Silahs\u0131z hasar:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Q1 silah hasar\u0131:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Q2 silah hasar\u0131:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Q3 silah hasar\u0131:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Q4 silah hasar\u0131:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Q5 silah hasar\u0131:");
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Sava\u015flar");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"\u00dclke");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"S\u0131ralama:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Sadece paral\u0131 sava\u015flar:");
	
	replaceInputByValue({"Show battles":["Show battles","Sava\u015flar\u0131 g\u00f6ster"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Sava\u015f ba\u015flang\u0131c\u0131");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Sava\u015f");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"savunan vs sald\u0131ran");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Skor");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Yap\u0131lan toplam hasar");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"\u0130syan sava\u015f\u0131");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"ba\u015flatan");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Raund $2");
	
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Raundu savunan taraf kazand\u0131");
	tmp = allElements.children[15];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Raundu sald\u0131ran taraf kazand\u0131");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"En \u00e7ok savunanlar");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"En \u00e7ok sald\u0131ranlar");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"\u015eu an bulundu\u011fun b\u00f6lgeden bu sava\u015fa kat\u0131lamazs\u0131n.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Sava\u015f\u0131n oldu\u011fu b\u00f6lgeye ta\u015f\u0131nmak zorundas\u0131n.");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"\u015eu an bulundu\u011fun b\u00f6lgeden bu sava\u015fa kat\u0131lamazs\u0131n.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Sava\u015f\u0131n oldu\u011fu \u00fclkeye ta\u015f\u0131nmak zorundas\u0131n.");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Raund kazanan :");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Silah se\u00e7:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Vuraca\u011f\u0131n taraf\u0131 se\u00e7:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Sava\u0131aca\u011f\u0131n taraf:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Raundu g\u00f6ster:");
	}
	replaceInputByValue({"Show round":["Show round","Raundu g\u00f6ster"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Genel sava\u015f istatistikleri");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Sava\u015f e\u011fitimi");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Sava\u015f kurallar\u0131");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"ba\u015flatan");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Raund $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Raundu savunan taraf kazand\u0131");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Raundu sald\u0131ran taraf kazand\u0131");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"Sava\u015fa geri d\u00f6n");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"\u0130statistikler 30 dakikada bir g\u00fcncellenmektedir");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Sava\u015f istatistikleri");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Vatanda\u015f ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"\u00c7evrimi\u00e7i");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"\u00c7evrimd\u0131\u015f\u0131");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Profili d\u00fczenle"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","\u0130smi de\u011fi\u015ftir"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","\u0130\u015flem hareketleri"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","\u00c7oklu hesab\u0131 \u015fikayet et"]
	});
	replaceInputByValue({"Report multi":["Report multi","\u00c7oklu hesab\u0131 \u015f,kayet et"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"S\u00fcresiz uzakla\u015ft\u0131r\u0131ld\u0131");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Sebebi:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Banlayan :");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Level:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Hasar:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"R\u00fctbe:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Ekonomik yetenek:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"G\u00fc\u00e7:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Bulundu\u011fun B\u00f6lge:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Vatanda\u015fl\u0131k:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Kay\u0131t tarihin:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"XP'e g\u00f6 ulusal s\u0131ralama:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Hasara g\u00f6re ulusal s\u0131ralama:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"XP'e g\u00f6re k\u00fcresel s\u0131ralama:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Hasara g\u00f6re k\u00fcresel s\u0131ralama");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Askeri grup:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Parti:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Gazete:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"\u00c7al\u0131\u015ft\u0131\u011f\u0131n \u015firket:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Sahip oldu\u011fun \u015firketler");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Siyasi durum:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Ba\u011fl\u0131 bulundu\u011f bir askeri grup yok");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Parti yok");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Gazete yok");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"\u00c7al\u0131\u015ft\u0131\u011f\u0131n \u015firket yok");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"\u015eirketin yok");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Siyasi g\u00f6revin yok");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Aktif bor\u00e7");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"\u00d6deme zaman\u0131");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1. oyun g\u00fcn\u00fc");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Arkada\u015flar");
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
	tmp.innerHTML = tmp.innerHTML.replace(/Total achievements/,"Toplam ba\u015ar\u0131")
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Top achievements/,"En \u00e7ok kazan\u0131lan ba\u015far\u0131lar");
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","osi\u0105gni\u0119cie 'Donor'"]});
	replaceLinkSSS({
		"See all achievements":["See all achievements","T\u00fcm ba\u015far\u0131mlar\u0131 g\u00f6r"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Yeni \u015fifre:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Tekrar yeni \u015fifre:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Eski \u015fifre:  :");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Yeni avatar:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max. boyut :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Vatanda\u015f");
	replaceInputByValue({"Edit citizen":["Edit citizen","Profil d\u00fczenle"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Ta\u015f\u0131n");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"\u00dclke");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"B\u00f6lge:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Bilet kalitesi:");
	
	replaceInputByValue({"Travel":["Travel","Ta\u015f\u0131n"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Ta\u015f\u0131nma e\u011fitimi"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Gelen mesajlar: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"G\u00f6nderilen mesajlar: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Yazan");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Mesaj");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Tarih");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Kald\u0131r");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"Kime");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","G\u00f6nderilen mesajlar"],
		"composeMessage.html":["Compose message","Mesaj yaz"]
	});
	replaceInputByValue({
		"Delete":["Delete","Sil"],
		"Quick reply":["Quick reply","H\u0131zl\u0131 cevap"],
		"Report":["Report","\u0153ikayet et"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","\u015eikayet et"],
		"Quick reply":["Quick reply","H\u0131zl\u0131 cevap"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Cevap yaz"],
		"conversation.html":["Previous messages","\u00d6nceki mesajlar"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Gelen Mesajlar"],
		"composeMessage.html":["Compose Message","Mesaj yaz"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Yeni mesaj");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Gelen mesajlar"],
		"sentMessages.html":["Sent messages","G\u00f6nderilen mesajlar"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Al\u0131c\u0131:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Ba\u015fl\u0131k:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mesaj:");
	
	replaceInputByValue({
		"Send":["Send","G\u00f6nder"],
		"Preview":["Preview","\u00d6n izle"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Abonelikler");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Abonelikler");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Abone olunan gazetelerin listesi"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Abone olunan gazeteler");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Toplam aboneler");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Gazete");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Abone olma zaman\u0131");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Gazete e\u011fitimi"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Gazete");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Son \u00e7\u0131kan makaleler");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Gazeteyi d\u00fczenle"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Gazete e\u011fitimi"]
	});
	replaceInputByValue({
		"Publish":["Publish","Yay\u0131nla"],
		"Preview":["Preview","\u00d6n izle"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Yeni makale yaz");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Yay\u0131nlanacak \u00fclke");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Makale ba\u015fl\u0131\u011f\u0131:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mesaj:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Yay\u0131nlamadan \u00f6nce makalenin kopyas\u0131n\u0131 kaydet!");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Gazete ismi:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Yeni avatar:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","max. boyut :");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Gazeteyi d\u00fczenle"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Gazeteyi d\u00fczenle"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Makale");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Makaleyi d\u00fczenle"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Gazeteyi d\u00fczenle"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","\u015eikayet et"],
		"Edit":["Edit","D\u00fczenle"],
		"Delete":["Delete","Sil"]
	});
	replaceInputByValue({
		"Publish":["Publish","Yay\u0131nla"],
		"Report":["Report","\u015eikayet et"],
		"Edit":["Edit","D\u00fczenle"],
		"Delete":["Delete","Sil"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Yeni yorum");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mesaj:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Gazete");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Makaleyi d\u00fczenle");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Makale ba\u015fl\u0131\u011f\u0131:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Mesaj:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Gazeteyi d\u00fczenle"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Gazete e\u011fitimi"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Makaleyi d\u00fczenle"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"S\u00f6zle\u015fme");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"\u015eablon");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Sunulan s\u00f6zle\u015fmeler (en son 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"sunulan ki\u015fi ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"S\u00f6zle\u015fme yok");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Kabul edilen s\u00f6zle\u015fme (en son 20)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"sunulan ki\u015fi");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"S\u00f6zle\u015fme yok");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Reddedilen s\u00f6zle\u015fme");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Reddeden $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"S\u00f6zle\u015fme");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Ba\u015far\u0131s\u0131z s\u00f6zle\u015fme");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"S\u00f6zle\u015fme yok");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Aktif verdi\u015fin borclar");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Bor\u00e7 alan");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","\u00d6deme zaman\u0131");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","\u00d6zet");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Borcu iptal et");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Verdi\u011fin bor\u00e7 yok");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Aktif bor\u00e7lar\u0131n ");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Bor\u00e7 veren");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","\u00d6deme zaman\u0131");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","\u00d6zet");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Borcu \u00f6de");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Bor\u00e7 yok");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","\u015eablon ismi:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","S\u00f6zle\u015fme e\u011fitimi"],
		"#":["Create new template","Yeni \u015fablon olu\u015ftur"]
	});
	replaceInputByValue({
		"Delete":["Delete","Sil"],
		"Create template":["Create template","\u015eablon olu\u015ftur"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1's seneti");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Kar\u015f\u0131 taraf\u0131n seneti")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Kar\u015f\u0131 taraf");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"$1's seneti")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," a\u015fa\u011f\u0131daki \u00fcr\u00fcnleri g\u00f6nderecek");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," a\u015fa\u011f\u0131daki toplam para miktar\u0131n\u0131 g\u00f6nderecek");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/,"'dan/den a\u015fa\u011f\u0131daki bor\u00e7 tahsil edilecektir");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		" $1$3$5. oyun g\u00fcn\u00fcnde \u00f6denmelidir (s\u00f6zle\u015fmenin imzalanmas\u0131ndan $6 g\u00fcn sonra) \u00d6deyece\u011fin ki\u015fi: "
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"S\u00f6zle\u015fme");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"S\u00f6zle\u015fme");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"S\u00f6zle\u015fme durumu: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Kabul edildi");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"$1 taraf\u0131ndan reddedildi");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Ba\u015fr\u0131s\u0131z");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"\u015fablon");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"S\u00f6zle\u015fmeye yeni bir \u00f6ge ekle");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Taraf");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"\u0130tem tipi");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Kar\u015f\u0131 taraf");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Para"],
			"Product":["Product","\u00dcr\u00fcn"],
			"Debt":["Debt","Bor\u00e7"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Para ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"\u00dcr\u00fcn adedi:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"\u00dcr\u00fcn:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"\u00dcr\u00fcn kalitesi:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Demir"],
			"Grain":["Grain","Tah\u0131l"],
			"Oil":["Oil","Petrol"],
			"Stone":["Stone","Ta\u015f"],
			"Wood":["Wood","Kereste"],
			"Diamonds":["Diamonds","Elmas"],
			"Weapon":["Weapon","Silah"],
			"House":["House","Ev"],
			"Gift":["Gift","Hediye"],
			"Food":["Food","Ekmek"],
			"Ticket":["Ticket","Bilet"],
			"Defense System":["Defense System","Savunma sistemi"],
			"Hospital":["Hospital","Hastane"],
			"Estate":["Estate","Konak"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Bor\u00e7");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Para ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"\u00d6deme zaman\u0131:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"\u00dcr\u00fcn kalitesi:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"S\u00f6zle\u015fme teklif et");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Teklif edilecek ki\u015fi");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Not:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Sadece arkada\u015flar\u0131na s\u00f6zle\u015fme teklif edebilirsin");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Kar\u015f taraf"],
		"contracts.html":["Go back to contract list","S\u00f6zle\u015fme listesine geri d\u00f6n"]
	});
	replaceInputByValue({
		"Delete":["Delete","Sil"],
		"Propose":["Propose","Teklif et"],
		"Add item":["Add item","\u0130tem ekle"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"S\u00f6zle\u015fmeyi iptal et")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","\u0130tal teklifi"]});
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
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Para Piyasas\u0131")

	allElements = results.snapshotItem(0).children[1]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"\u015eu anki teklifler")
	allElements = results.snapshotItem(0).children[3]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Teklifleri g\u00f6ster")


	document.getElementById("swap2").value = "Para birimlerini yer de\u011fi\u015ftir"
	tmp = allElements.children[3]
	tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Para birimini al")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Para birimini sat")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Teklifleri g\u00f6r\u00fcnt\u00fcle")  

	allElements = results.snapshotItem(0).children[12]
	tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Senin tekliflerin")

	var results = getElements(document, "//DIV[@class='testDivblue']");
	var divsLength = results.snapshotLength;

	allElements = results.snapshotItem(divsLength-1);
	tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Teklifini sun")
	document.getElementById("swap1").value = "Para birimlerini yer de\u011fi\u015ftir"
	tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Sunulan para birimi")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Para birimini al")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"D\u00f6n\u00fc\u015f\u00fcm oran\u0131")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Yeni teklif sun")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Teklif")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"oran")
	
	results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Sat\u0131c\u0131");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Miktar");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Oran");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Sat\u0131n al");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Miktar");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Oran"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Sil");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Teklif yok"); 
    
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
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/," ")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Yeni teklif sun")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"\u00dclke")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"\u00dcr\u00fcn")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Miktar")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Fiyat")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Yeni teklifi sun")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Market tekliflerini g\u00f6ster");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Envanterin");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Markette ki teklifin")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"\u00dcr\u00fcn")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Sat\u0131c\u0131");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Stok");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Fiyat");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Br\u00fct");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Fiyat");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Net");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"\u0130thalat vergisi");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Sil");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"\u015eirketler");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"\u015eirket")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"\u00dcr\u00fcn")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"B\u00f6lge")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"\u0130\u015f\u00e7iler")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Yeni \u015firket olu\u015ftur")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"\u015eirket ismi")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"\u00dcr\u00fcn")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"\u015eirket avatar\u0131")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"\u015eirketi olu\u015ftur")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"\u015eirket a\u00e7ma \u00fccreti")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"\u01e3irket senin bulundu\u011fun b\u00f6lgede olu\u015fturulacakt\u0131r")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"B\u00f6lgelerin kaynaklar\u0131n\u0131 g\u00f6r\u00fcnt\u00fcle")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"\u015eirket e\u011fitimi")
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"\u00dclke politikas\u0131");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"\u00dclke se\u00e7");
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Ba\u015fkan");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"se\u00e7imleri g\u00f6r\u00fcnt\u00fcle");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Ba\u015fkan"]})
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Milletvekilleri");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Milletvekilleri"]})
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Sava\u015flar");
    tmp = allElements.children[21]
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Sava\u015f");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Detaylar");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"Sava\u015f yok");
    tmp = allElements.children[22]
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Sava\u015f kurallar\u0131");
    tmp = allElements.children[23]
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"M\u00fcttefikler");
    tmp = allElements.children[27]
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"\u00dclke");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Kalan tarih"); 
    tmp = allElements.children[27].children[0]
    var loopz = tmp.children.length   
    
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Arkada\u015flar\u0131n\u0131 davet et");
   
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Davet etti\u011fin vatanda\u015flar");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"S\u0131ralama \u015fekli");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"G\u00f6ster");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Vatanda\u015f");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Level");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Kazan\u0131lan alt\u0131n");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Kay\u0131t tarihi");
    
    //TimeBasic(allElements,6,0,4)
    
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
    
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Kay\u0131t olan yok");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Daha fazla t\u0131klayanlar\u0131 g\u00f6ster");
    
    
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

$(document).ready(function(){
	// İşlemler buraya
		
	var link = document.URL;
	
	// Reklamları Kaldırmak icin
	$("#aswift_0_anchor").remove();
	$("#aswift_1_anchor").remove();
	$(".embedFooter").remove();	
	
	$('<div id = "info"><b><center><a style= "color:  rgb(55, 135, 234); font-size: 15px;" target = _blank href="http://secura.e-sim.org/profile.html?id=2836" target = _blank >HMK</a></center></b></div>').insertAfter("div#userMenu");

		// Savas Ekranına Uyarı
	savasEkraniUyari();
	var secura = link.indexOf('secura');
	
	if(secura > 0){
	// Duyuru
	$('<div id = "duyuru" style = "position: absolute; top:-20px; left: 300px;"><iframe src="http://pastebin.com/embed_iframe.php?i=uMt5SvvL" style="border:none;width:480px; height:128px;"></iframe></div>').insertAfter('tr#headerRow');
	
	// Yararlı Makaleler ve Chat Sayfası icin
	$('<div id = "duyuru"><a style= "color:  rgb(55, 135, 234); font-size: 15px;" target = _blank href="http://cbe005.chat.mibbit.com/?server=rizon.mibbit.org&channel=%23securaTR" target = _blank >Chat kanalina girmek icin tiklayin</a></div>').insertAfter('div#topArticles.newsTab');	
	
	}else
	{
	$('<div id = "duyuru"><a style= "color:  rgb(55, 135, 234); font-size: 15px;" target = _blank href="http://cbe005.chat.mibbit.com/?server=rizon.mibbit.org&channel=%23esim.tr" target = _blank >Chat kanalina girmek icin tiklayin</a></div>').insertAfter('div#topArticles.newsTab');	
	}
	
	

	});
	
	
	// Savas Ekranına Uyarı
	function savasEkraniUyari(){
	var link = document.URL;
	var savasLinki = link.indexOf('/battle.html');
	
	if(savasLinki > 0){
		$('<div style = "color:red;font-size: 13px;" >Hangi Tarafta Vurdugunuza Dikkat Edin</div>').insertAfter('#weaponQuality');
		
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
