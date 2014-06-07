// ==UserScript==
// @name           e-sim IR
// @namespace      e-sim IR
// @description    e-Sim in Nightmare language
// @version        0.1
// @include        http://*.e-sim.org*
// @icon 		   http://e-sim.home.pl/testura/img/favicon.png
// @grant          none
// ==/UserScript==
//Persian translation by IMAN :P
//

menuLinkReplacements = {
	"work.html"				:["Work","کار"],
	"train.html"			:["Train","Train for fight"],
	"equipment.html"		:["Equipment","Fighting tools"],
	"companies.html"		:["Companies","Co"],
	"newspaper.html"		:["Newspaper","gossip"],
	"myParty.html"			:["Party","Party"],
	"contracts.html"		:["Contracts","Contract"],
	"myShares.html"		    :["Shares","Share"],
	"myAuctions.html"		:["Auctions","sell your hunted item"],
        "inviteFriends.html"	:["Invite friends","lie to some friends"],
	"myMilitaryUnit.html"	:["Military unit","NighTmaRe"],
	"subscription.html"     :["Premium account","str x1.5"],
	
	"productMarket.html"	:["Product market","بازار محصولات"],
	"jobMarket.html"		:["Job market","بازار کار"],
	"monetaryMarket.html"	:["Monetary market","بازار ارز"],

	"auctions.html"		    :["Auctions","مزایده"],
	"stockMarket.html"	    :["Stock market","بورس"],
	"companiesForSale.html"	:["Companies for sale","کمپانی برای فروش"],
	"specialItems.html"		:["Special items","آیتم مخصوص"],
	
	"countryStatistics.html"		:["Country statistics","آمار کشور"],
	"partyStatistics.html"			:["Party statistics","آمار حزب"],
	"newspaperStatistics.html"		:["Newspaper statistics","آمار روزنامه"],
	"citizenStatistics.html"		:["Citizen statistics","آمار شهروند"],
	"militaryUnitStatistics.html"	:["Military unit stats","آمار يگان نظامي"],
        "stockCompanyStatistics.html"	:["stock market stats","بازار بورس"],
	"donations.html"                :["Donations","دوناتها"],
	
"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Top spams"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Read some spams"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","اتفاقات نظامی"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Check kids work"],
	
	"battles.html"							:["Battles","TANKING"],
	"countryPoliticalStatistics.html"		:["War and politics","war+pilitics"],
	"countryEconomyStatistics.html"			:["Economy","Economy"],
	"countryLaws.html"						:["Laws","laws"],
	"partyElections.html"					:["Party elections","انتخابات احزاب"],
	"congressElections.html"				:["Congress elections","انتخابات مجلس"],
	"presidentElections.html"				:["Presidential elections","انتخابات رياست جمهوري"],
	"pendingCitizenshipApplications.html"	:["Citizenship","مليت"],
	"googleMap.html"						:["Map","find bonus place"],

};

menuTextReplacements = {
	"myPlacesButton":["My places","Makan :P"],
	"marketButton":["Market","بازار"],
	"statisticsButton":["Statistics","آمار"],
	"newsButton":["News","doroogh"],
	"electionsButton":["Country","kharabshode"]
};

hpTitleReplacements = {
	"News":["News","doroogh"],
	"Shouts":["Shouts","spam"],
	"Battles":["Battles","money of us"],
	"Events":["Events","che khabar?!"]
};

hpTabsReplacements = {
	"#topArticles":["Global","jahuni"],
	"#latestArticles":["Latest","last"],
	"#localArticles":["Local","too keshvar"],
	
	"#countryShouts":["Country","کشور"],
	"#friendsShouts":["Military unit","ارتش"],
	"#myShouts":["Friends","دوستان"],
	
	"#localBattles":["Country","کشور"],
	"#substidedBattles":["Subsidized","يارانه"],
	"#hotBattles":["Important","مهم"],

	"#localEvents":["Military","نظامي"],
	"#globalEvents":["Military","نظامي"],
	"#politicalEvents":["Political","سياسي"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","آموزش بازار ارز"],
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
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"ثانیه قبل");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"یک دقیقه پیش");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"یک ساعت پیش");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"دیروز");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"ماه پیش");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 ثانیه قبل");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 دقیقه قبل");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 ساعت قبل");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 روز قبل");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 ماه قبل");
        }
    }
}

//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"ثانیه قبل");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"یک دقیقه پیش");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"یک ساعت پیش");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"دیروز");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"ماه پیش");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 ثانیه قبل");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 دقیقه قبل");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 ساعت قبل");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 روز قبل");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 ماه قبل");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"یک ثانیه پیش");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"یک دقیقه پیش");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"یک ساعت پیش");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"دیروز");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"ماه پیش");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 ثانیه پیش");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 دقیقه پیش");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 ساعت پیش");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 روز پیش");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 ماه پیش");
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 متحدان");
	}
}

function replaceNoAlliesAndOtherInfo() {
	results = getElements(document, "//div[@class='battleDiv']");
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp=results.snapshotItem(i).children[0];
		if (tmp.innerHTML.match("no allies")) {
			tmp=tmp.childNodes[3];
			tmp.nodeValue=tmp.nodeValue.replace(/no allies/,"بدون متحد");
		}
		tmp=results.snapshotItem(i).children[2];
		if (tmp.innerHTML.match("no allies")) {
			tmp=tmp.childNodes[3];
			tmp.nodeValue=tmp.nodeValue.replace(/no allies/,"بدون متحد");
		}

		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Resistance war/,"انقلاب");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Subsidies/,"یارانه");
		tmp.innerHTML=tmp.innerHTML.replace(/none/g,"هیچ");
		tmp.innerHTML=tmp.innerHTML.replace(/for/g,"برای");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"ثانیه قبل");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"دقیقه قبل");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"یک ساعت پیش");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"روز قبل");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"ماه قبل");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 ثانیه قبل");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 دقیقه قبل");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 ساعت قبل");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 روز قبل");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 ماه قبل");
                } 
        }
    }
}   

replaceLinkByHrefSSS("#", {
    "Report":["Report","گزارش"],
    "Delete":["Delete","حذف"],
    "Edit":["Edit","ویرایش"],
	"Vote":["Vote","رای"],
	"Comment":["Comment","نظر"],
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
		"Show more battles":["Show more battles","نمایش جنگها"],
		"Subsidies informations":["Subsidies informations","اطلاعات یارانه جنگ"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"جنگ بدون یارانه");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"دستور نظامی ارتش :");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"بجنگید برای:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"یک دقیقه پیش");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"یک ساعت پیش");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"دیروز");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"ماه پیش");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 دقیقه پیش");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 ساعت پیش");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 روز پیش");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 ماه پیش");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"منطقه را حفظ میکند در جنگ مقابل");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"مردم $2 انقلابی شروع کردن در  $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"مورد حمله قرار گرفت توسط $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"رییس جمهور $2$3 اعلام جنگ میکند به $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," اعلام جنگ کرد به $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," فتح میکند $2,  در جنگ مقابل ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," رییس جمهور جدیدی دارد");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"نمایش وقایع بیشتر");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"شات جدید بده اما اسپم نکن:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="شات"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"بفرست به کانالهای :");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"بفرست به کانالهای :");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," کشور | $2  ارتش | $4 دوستان");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","شاتهای بیشتر"] });
}

//============================================================================
//Menu OK
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	dayInGameReplacement = {
		"./td[3]/table/tbody/tr/td/b[2]"	:[/(day)/,"روز"]	
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
		"crossIcon"	:["Logout","خروج"],
		"workIcon"	:["Work","کار"],
		"fightIcon"	:["Fight","جنگ"],
		"avatarIcon":["Upload avatar","آپلود تصویر"],
		"voteIcon"	:["Vote","رای"],
	};
	var sideLink2Replacements = {
		"travel.html"	:["Travel","سفر کردن"],
		"pendingCitizenshipApplications.html"	:["change","تغییر"],
		"http://e-sim-center.ir/post/3"	:["Health tutorial","آموزش سلامتی"],
	};

	var sideLink3Replacements = {
		"eatLink"	:["Eat food","مصرف غذا"],
		"useGiftLink":["Use gifts","مصرف هدیه"],
		"showCurrencies":["Show more currencies","نمایش ارز بیشتر"]
	};

	var sideLink4Replacements = {
		"eatButton":["Eat Food","مصرف غذا"],
		"useGiftButton":["Use gift","مصرف هدیه"] 
	};
	
	var sideTextXPathReplacements = {
		"./div[1]/div/h4"	:[/(Your today's tasks)/,"وظایف امروز"],
		"./div[1]/div[2]/b"	:[/(Level)/,"سطح"],
		"./div[1]/div[3]/b"	:[/(Rank)/,"رنک"],
		"./div[2]/h4[1]"	:[/(Your money)/,"پول"],	
		"./div[2]/h4[2]"	:[/(Your inventory)/,"انبار"],
		"./div[3]/h4"		:[/(Your messages)/,"پیام"]		
	};
	var sideText2XPathReplacements = {
		"./div[2]/b[1]"		:[/(Next rank)/,"رنک بعدی"],
		"./div[3]/b[1]"		:[/(Health:)/,"سلامتی: "],
		"./b[1]"			:[/(Economy skill)/,"مهارت اقتصادی"],
		"./b[2]"			:[/(Strength)/,"قدرت نظامی"],
		"./b[3]"			:[/(Location)/,"مکان"],
		"./b[4]"			:[/(Citizenship)/,"ملیت"],
		"./b[5]"			:[/(Food limit)/,"محدودیت غذا"],
		"./b[6]"			:[/(Gift limit)/,"محدودیت هدیه"]
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
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"نوع غذا");
		} else if (obj.innerHTML.match("Gift type")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"نوع هدیه");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/(\d*) left/,"باقی مانده $1");
			obj.innerHTML=obj.innerHTML.replace(/(Food)/,"غذا");
			obj.innerHTML=obj.innerHTML.replace(/(Gift)/,"هدیه");
		} 
	}
}

//============================================================================
//Profile OK
//============================================================================
function doProfile() {
	var citizenProfileReplacements = {
		"./td[2]/div/div[1]/h2"							:[/(Citizen)/,"شهروند"],
		"./td[2]/div/div[1]/b"							:[/(Online)/,"آنلاین"],
		"./td[2]/div/div[1]/b"							:[/(Offline)/,"آفلاین"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[1]"	:[/(Permanently banned)/,"مسدودیت دائمی"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[2]/b"	:[/(Reason)/,"علت"],
		"./td[2]/table/tbody/tr/td[1]/div[1]/div[3]/b"	:[/(Banned by)/,"مسدود شده توسط "],
		"./td[2]/table/tbody/tr/td[1]"					:[/(Premium account)/,"اکانت ویژه",
														/(None)/,"hichi",
														/(Level)/,"LVL",
														/(Damage)/,"Your power",
														/^Rank$/,"رنک",
														/(Economy skill)/,"e-skill",
														/(Strength)/,"zoor",
														/(Location)/,"ja",
														/(Citizenship)/,"ملیت",
														/(Birthday)/,"تولد",
														/^Ranks$/,"military power",
														/(National by XP)/,"رنک کشوری XP",
														/(National by DMG)/,"رنک کشوری نظامی",
														/(Global by XP)/,"رنک جهانی XP",
														/(Global by DMG)/,"رنک جهانی نظامی",
														/(Military unit)/,"NighTmaRe",
														/(Party)/,"حزب",
														/(Newspaper)/,"روزنامه",
														/(Working at)/,"محل کار",
														/(Owned companies)/,"کمپانی ها",
														/(Political office)/,"مقام سیاسی",
														/(No military unit)/,"بدون ارتش",
														/(No party)/,"بدون حزب",
														/(No newspaper)/,"بدون روزنامه",
														/(No work)/,"بیکار",
														/(No companies)/,"بدون کمپانی",
														/(No office)/,"بدون مقام"]
	};

	var mainNode;
	mainNode = document.getElementById('contentRow');
	getAndReplaceNode(mainNode,citizenProfileReplacements);

	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","ویرایش پروفایل"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","تغییر نام کاربری"]
	});
	replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","لیست تراکنشها"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","گزارش مولتی"]
	});
	replaceInputByValue({"Report multi":["Report multi","گزارش مولتی"]});

	doShoutsComm();
	
}

//============================================================================
//Battle OK
//============================================================================
function doBattle() {
	var battle1Replacements = {
		"./td[2]/div/div/div[1]"	:[/(Resistance war)/,"انقلاب",/(started by)/,"شروع شده توسط"],
		"./td[2]/div/div/div[2]"	:[/(no allies)/,"بدون متحد",/(\d*)( allies)/,"$1 متحدان"],
		"./td[2]/div/div/div[4]"	:[/(Round )(\d*)/,"راند $2"],
		"./td[2]/div/div/div[5]"	:[/(no allies)/,"بدون متحد",/(\d*)( allies)/,"$1 متحدان"],
		//"./td[2]/div/div/div[10]"	:[/Rounds won by defender/,"راندهای پیروز شده توسط مدافع"],
		//"./td[2]/div/div/div[11]"	:[/Rounds won by attacker/,"راندهای پیروز شده توسط مهاجم"], NOT WORKING WITH PREMIUM
		"./td[2]/div/div/div[8]/b"	:[/(Defenders' total damage)/,"مجموع تخریب مدافعین"],
		"./td[2]/div/div/div[9]/b"	:[/(Attackers' total damage)/,"مجموع تخریب مهاجمین"],
		"./td[2]/div/div/div[10]/b"	:[/(Total attackers online)/,"تعداد افراد آنلاین مهاجم"],
		"./td[2]/div/div/div[11]/b"	:[/(Total defenders online)/,"تعداد افراد آنلاین مدافع"],
		"./td[2]/div/div/b"			:[/(Total spectators online)/,"کسانی که به صفحه جنگ نگاه میکنند"],
		"./td[2]/table[1]" 			:[/(Top defenders)/,"برترین مدافعین",
									/(Top attackers)/,"برترین مهاجمین",
									/(\d*)( available)/g,"فعال $1",
									/(Select weapon)/,"اسلحه",
									/(Unarmed)/,"بدون اسلحه",
									/(Select your side)/,"سمت خود را اتخاب کنید",
									/(Show round)/,"نمایش راند",
									/(This round was won by)/,"این راند به پایان رسید با پیروزی",
									/(You can't fight in this battle from your current location)/,"از موقعیت فعلی خود نمیتوانید در این جنگ شرکت کنید",
									/(You must travel to the occupant country to participate in the battle)/,"شما باید به یکی از کشورهای دخیل در جنگ سفر کنید"],		
		"./td[2]/table[2]" 			:[/Recent<br>defenders/,"مدافعین",
									/Recent<br>attackers/,"مهاجمین",
									/(Current round statistics)/,"آمار این راند",
									/(Your damage)/,"تخریب شما ",
									/(Top defending countries)/,"کشورهای مدافع برتر",
									/(Top attacking countries)/,"کشورهای مهاجم برتر",
									/(Top defending military units)/,"ارتشهای مدافع برتر",
									/(Top attacking military units)/,"ارتشهای مهاجم برتر",
									/(Show overall battle stats)/,"مجموع آمار جنگ",
									/(Show military units supporting this battle)/,"ارتشهای شرکت کننده در این جنگ"]
	};

	var battleLinks1Replacements = {
		"http://wiki.e-sim.org/index.php/Fighting"		:["Fighting tutorial on wiki","آموزش جنگیدن"],
		"http://wiki.e-sim.org/index.php/Battle"		:["Battle rules","قوانین جنگ"]
	}
	
	var mainNode;
	mainNode = document.getElementById('contentRow');
	getAndReplaceNode(mainNode,battle1Replacements);
	
	var premiumSpec = document.getElementById("spectatorsLink");
	if (premiumSpec){
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"نمایش اطلاعات");
		premiumSpec=document.getElementById("defendersLink");
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"نمایش اطلاعات");
		premiumSpec=document.getElementById("attackersLink");
		premiumSpec.innerHTML = premiumSpec.innerHTML.replace(/Show details/,"نمایش اطلاعات");
	}
	replaceInputByValue({"Show round":["Show round","نمایش راند"]});
	
	replaceLinkByHref(battleLinks1Replacements);
	
}
	
//============================================================================
//Battle Statistics OK
//============================================================================
function doBattleStatistics() {
	var battleStats1Replacements = {
		"./td[2]/div[1]"	:[/(Resistance war)/,"انقلاب",
							/(started by)/,"شروع شده توسط",
							/(Back to battle)/,"بازگشت به جنگ",
							/(no allies)/,"بدون اتحاد",
							/(\d*)( allies)/,"$1 متحذان",
							/(Round )(\d*)/,"راند $2",
							/(Rounds won by defender)/,"راندهای پیروز شده توسط مدافعین",
							/(Rounds won by attacker)/,"راندهای پیروز شده توسط مهاجمین"],
		"./td[2]/div[2]" 	:[/(Battle statistics)/,"آمار جنگ",
							/(Statistics are generated once per 30 minutes)/,"آمار هر نیم ساعت به روز میشود",
							/(Your damage)/,"تخریب شما ",
							/(Top defending countries)/,"کشورهای مدافع برتر",
							/(Top defending countries)/,"کشورهای مهاجم برتر",
							/(Top defending military units)/,"ارتشهای مدافع برتر",
							/(Top attacking military units)/,"ارتشهای مهاجم برتر",
							/(Defenders' total damage)/,"تخریب کل مدافعین:",
							/(Attackers' total damage)/," تخریب کل مهاجمین:"]
	};

	var battleLinks1Replacements = {
		"http://wiki.e-sim.org/index.php/Fighting"		:["Fighting tutorial on wiki","آموزش جنگیدن"],
		"http://wiki.e-sim.org/index.php/Battle"		:["Battle rules","قوانین جنگیدن"]
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
		"1":["Any","همه"],
		"2":["Iron","آهن"],
		"3":["Grain","گندم"],
		"4":["Oil","نفت"],
		"5":["Stone","سنگ"],
		"6":["Wood","چوب"],
		"7":["Diam.","الماس"],
		"8":["Weap.","اسلحه"],
		"9":["House","خانه"],
		"10":["Gift","هدیه"],
		"11":["Food","غذا"],
		"12":["Ticket","بلیط"],
		"13":["DS","سیستم دفاعی"],
		"14":["Hosp.","بیمارستان"],
		"15":["Est.","استیت"]
	};
	
	var market1Replacements = {
		"./h1"								:[/(Marketplace)/,"بازار محصولات"],
		"./div[1]/b"							:[/(Show Offers)/,"نمایش پیشنهادات"],
		"./div[2]/table/tbody/tr[1]/td[1]"	:[/(Product)/,"محصول"],
		"./div[2]/table/tbody/tr[1]/td[2]"	:[/(Seller)/,"فروشنده"],
		"./div[2]/table/tbody/tr[1]/td[3]"	:[/(Stock)/,"موجودی"],
		"./div[2]/table/tbody/tr[1]/td[4]"	:[/(Price)/,"قیمت"],
		"./div[2]/table/tbody/tr[1]/td[5]"	:[/(Buy)/,"خرید"]	
	};
	
	var market2Replacements = {
		"."					:[/(Quality)/,"کیفیت",/(Country)/,"کشور"]		
	};
	
	var mainNode;
	mainNode = document.getElementById('contentRow').children[1];
	getAndReplaceNode(mainNode,market1Replacements);

	var mainNode;
	mainNode = document.getElementById('productMarketViewForm');
	getAndReplaceNode(mainNode,market2Replacements);
	
	replaceInputByValue({"View offers":["View offers","مشاهده پیشنهادات"],"Buy":["Buy","خرید"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","مشاهده پیشنهادات من / پیشنهاد دادن"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","آموزش محصولات"]
	});
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"بازار کار ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"انتخاب کنید:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"کشور:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"مهارت اقتصادی:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"کارفرما");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"کمپانی");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"محصول");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"حداقل مهارت");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"حقوق");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"قبول کار");
	
	replaceInputByValue({"Apply":["Apply","قبول کار"],"Show":["Show","نمایش"]});
}

//============================================================================
//Work OK
//============================================================================
function doWork() {
	var work1Replacements = {
		"."					:[/(Work)/,"کار کن",
							/(You have no job)/,"شما بیکار هستید",
							/(Your workplace)/,"محل کار شما",
							/(Employer)/,"کارفرما",
							/(Salary)/,"حقوق",
							/(Leave job)/,"ترک شغل",
							/(You have not worked today)/,"شما امروز کار نکرده اید",
							/(You have to stay in company for at least 6 hours before you will be able to resign)/,"شما باید حداقل 6 ساعت در کمپانی بمانید سپس خارج شوید",
							/(Today work results)/,"نتیجه کار امروز"] // not in .attributesTable
	};
	
	var work2Replacements = {
		".//table[contains(@class,'attributesTable')]" 	:[/(Your Gross salary)/,"حقوق ناخالص",
														/(Your Net salary)/,"حقوق خالص",
														/(Income tax paid)/,"مالیات بر درآمد",
														/(Worked at)/,"محل کار شما در",
														/(XP gained )/,"تجربه اضافه شده به شما",
														/(Economy skill gained)/,"میزان افزایش مهارت اقتصادی شما",
														/(Working days in a row)/,"تعداد روزهایی که پشت هم کار کرده اید",
														/(Your base productivity)/,"تولید پایه شما",
														/(Productivity modifiers)/,"پیراینده تولید",
														/(Total productivity)/,"تولید کل",
														/(Units produced)/,"تعداد جنس تولید شده",
														/(Raw company quality)/,"کیفیت کمپانی مواد اولیه"]
	};

	var mainNode;
	mainNode = document.getElementById('contentRow').children[1];
	getAndReplaceNode(mainNode,work1Replacements);

	getAndReplaceNode(mainNode,work2Replacements);
	
	replaceInputByValue({
						"Get a job now!":["Get a job now!","شغلی پیدا کن !"], 
						"Work now":["Work now","کار کن"] 
	});

}

//============================================================================
//Train OK
//============================================================================
function doTrain() {
	var train1Replacements = {
		"."					:[/(Military training)/,"تمرین نظامی",
							/(Training complete. Please come back tomorrow)/,"تمرین امروز تموم شد. فردا حتما برگرد! ",
							/(You have already trained today. Please come back tomorrow)/,"امروز قبلا تمرین کردی ، فردا برگرد",
							/(Strength gained)/,"قدرت نظامی دریافت شده",
							/(Equipment Stats)/,"اطلاعات ابزار جنگی",
							/(Damage)/,"تخریب",
							/(Critical Hit)/,"قدرت تخریب دوبرابر",
							/(Critical Hit chance)/,"شانس",
							/(Miss chance)/,"شانس از دست دادن تخریب",
							/(Chance to avoid DMG)/,"شانس آسیب ندیدن"]
	};
	
	var train2Replacements = {
		".//table[contains(@class,'attributesTable')]" 	:[/(Military details)/,"اطلاعات نظامی",
														/(Total training sessions:)/,"تعداد تمرینات نظامی انجام شده:",
														/(Strength:)/,"قدرت نظامی:",
														/(Military rank:)/,"رنک نظامی:",
														/(Total damage done:)/,"کل تخریب انجام شده:",
														/(Damage with no weapon:)/,"تخریب بدون اسلحه:",
														/(Damage with Q1 weapon:)/,"تخریب با اسلحه کیفیت یک:",
														/(Damage with Q2 weapon:)/,"تخریب با اسلحه کیفیت دو:",
														/(Damage with Q3 weapon:)/,"تخریب با اسلحه کیفیت سه:",
														/(Damage with Q4 weapon:)/,"تخریب با اسلحه کیفیت چهار:",
														/(Damage with Q5 weapon:)/,"تخریب با اسلحه کیفیت پنج:"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"نبردها");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"کشور");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"مرتب کردن:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"فقط جنگهای یارانه ای:");
	
	replaceInputByValue({"Show battles":["Show battles","نمایش نبردها"]});
	
    tmp = allElements.children[4].children[0].children[0]
    var loopz = tmp.children.length
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"شروع جنگ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"جنگ");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"مهاجم در مقابل مدافع");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"امتیاز");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"کل تخریب انجام شده");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"ایمیل:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"پسورد جدید:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"تکرار پسورد جدید:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"پسورد قدیمی  :");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"آواتار جدید:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","حداکثر سایز :");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19]
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"شهروند");
	replaceInputByValue({"Edit citizen":["Edit citizen","ویرایش شهروند"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"سفر کردن");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"کشور");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"منطقه:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"کیفیت بلیط:");
	
	replaceInputByValue({"Travel":["Travel","سفر کردن"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","آموزش سفر کردن"]
	});
}

//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"پیام از طرف: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"پیامهای فرستاده شده: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"فرستنده");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"پیام");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"تاریخ");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"حذف");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"به");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","پیام های فرستاده شده"],
		"composeMessage.html":["Compose message","نوشتن پیام"]
	});
	replaceInputByValue({
		"Delete":["Delete","حذف کردن"],
		"Quick reply":["Quick reply","پاسخ سریع"],
		"Report":["Report","گزارش"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","گزارش"],
		"Quick reply":["Quick reply","پاسخ سریع"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","پاسخ"],
		"conversation.html":["Previous messages","پیام های قبلی"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","پیامها"],
		"composeMessage.html":["Compose Message","نوشتن پیام"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"پیام جدید");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","پیامها"],
		"sentMessages.html":["Sent messages","پیام های فرستاده شده"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"دریافت کننده:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"عنوان :");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"پیام:");
	
	replaceInputByValue({
		"Send":["Send","فرستادن"],
		"Preview":["Preview","مشاهده"]
	});
}

//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"اشتراک");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"اشتراک");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","لیست روزنامه های مشترک شده"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"روزنامه های مشترک شده");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"مجموع اشتراکها");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"روزنامه");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"زمان اشتراک");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","آموزش روزنامه"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"روزنامه");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"آخرین مقالات");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","ویرایش روزنامه"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","آموزش روزنامه"]
	});
	replaceInputByValue({
		"Publish":["Publish","انتشار"],
		"Preview":["Preview","مشاهده"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"نوشتن مقاله جدید");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"چاپ در کشور");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"عنوان مقاله:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"پیام:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"فارسی شده توسط سهند - script made by Sahand");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"نام روزنامه:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"آواتار جدید:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","بیشترین سایز :");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","ویرایش روزنامه"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","ویرایش روزنامه"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"مقاله");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","ویرایش مقاله"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","ویرایش روزنامه"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","گزارش"],
		"Edit":["Edit","ویرایش"],
		"Delete":["Delete","حذف"]
	});
	replaceInputByValue({
		"Publish":["Publish","انتشار"],
		"Report":["Report","گزارش"],
		"Edit":["Edit","ویرایش"],
		"Delete":["Delete","حذف"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"نظر جدید");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"متن پیام:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"روزنامه");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"ویرایش مقاله");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"عنوان مقاله:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"پیام:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","ویرایش روزنامه"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","آموزش روزنامه"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","ویرایش مقاله"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"قرارداد");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"الگو");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","قرارداد های پیشنهاد شده");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"پیشنهاد شده به ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"بدون قرارداد");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","قراردادهای قبول شده");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"پیشنهاد شده به");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"بدون قرارداد")
	tmp.innerHTML=tmp.innerHTML.replace(/offered by/g,"پیشنهاد شده توسط");;
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","قراردادهای رد شده");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"رد شده توسط $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"بدون قرارداد");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","قراردادهای قبول نشده");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"بدون قرارداد");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","وام های فعال شما");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","قرض دهنده");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","تاریخ پس دادن");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","جمع");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","کنسل کردن بدهی");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","بدون وام");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","بدهی های فعال شما ");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","قرض دهنده");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","زمان پس دادن");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","جمع");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","پرداخت بدهی");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","بدون بدهی");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","نام الگو:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","آموزش قرارداد"],
		"#":["Create new template","ساخت الگو جدید"]
	});
	replaceInputByValue({
		"Delete":["Delete","حذف"],
		"Create template":["Create template","ساخت الگو"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"وظیفه $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"وظایف شهروند مقابل")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"شهروند مقابل");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"وظایف $1")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," این اجناس را انتقال خواهد داد");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," این مقدار پول را واریز خواهد کرد");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," این مقدار بدهی به او اضافه خواهد شد");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"باید بپردازد $1$3$5 این مقدار را ($6 از زمان امضای قرارداد) "
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"قراردادها");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"قرارداد");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"وضعیت قرارداد: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"قبول شده");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"رد شده $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"قبول نشده");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"الگو");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"اضافه کردن المان جدید به قرارداد");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"سمت");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"نوع آیتم");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"شهروند مقابل");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","پول"],
			"Product":["Product","جنس"],
			"Debt":["Debt","قرض"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"پول در( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"تعداد:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"نوع جنس:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"کیفیت جنس:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","آهن"],
			"Grain":["Grain","گندم"],
			"Oil":["Oil","نفت"],
			"Stone":["Stone","سنگ"],
			"Wood":["Wood","چوب"],
			"Diamonds":["Diamonds","الماس"],
			"Weapon":["Weapon","اسلحه"],
			"House":["House","خانه"],
			"Gift":["Gift","هدیه"],
			"Food":["Food","غذا"],
			"Ticket":["Ticket","بلیط"],
			"Defense System":["Defense System","سیستم دفاعی"],
			"Hospital":["Hospital","بیمارستان"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"بدهی");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"پول در ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"تاریخ بازپرداخت:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"کیفیت جنس:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"پیشنهاد قرارداد");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"پیشنهاد شده به");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"مهم:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"قرارداد را فقط برای دوستان خود میتوانید بفرستید");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","شهروند مقابل"],
		"contracts.html":["Go back to contract list","بازگشت به لیست قرارداد"]
	});
	replaceInputByValue({
		"Delete":["Delete","حذف"],
		"Propose":["Propose","پیشنهاد شده"],
		"Add item":["Add item","اضافه کردن آیتم"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1)
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"کنسل کردن پیشنهاد")
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","کنسل کردن پیشنهاد"]});
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
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"بازار ارز")

	allElements = results.snapshotItem(0).children[1]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"پیشنهادات جاری")
	allElements = results.snapshotItem(0).children[3]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"نمایش پیشنهادات")


	document.getElementById("swap2").value = "جا به جا کردن"
	tmp = allElements.children[3]
	tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"خرید ارز")
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"فروش ارز")
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"مشاهده پیشنهادات")  

	allElements = results.snapshotItem(0).children[12]
	tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"پیشنهادات شما")

	var results = getElements(document, "//DIV[@class='testDivblue']");
	var divsLength = results.snapshotLength;

	allElements = results.snapshotItem(divsLength-1);
	tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"پست پیشنهاد جدید")
	document.getElementById("swap1").value = "جا به جایی"
	tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"ارزهای پیشنهاد شده")
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"خرید ارز")
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"مظنه‌ء‌ ارز")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"درج پیشنهاد جدید")
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"پیشنهاد")
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"به نرخ ")
	
	results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"فروشنده");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"مقدار");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"نرخ");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"خرید");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"مقدار");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"نرخ"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"حذف");
    
    allElements = results.snapshotItem(1).children[0]
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"بدون پیشنهاد"); 
    
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
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"بازار")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"درج پیشنهاد جدید")
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"کشور")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"محصول")
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"تعداد")
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"قیمت")
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"درج پیشنهاد جدید")
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"نمایش پیشنهادات بازار");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"انبار شما");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0)
    tmp = allElements
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"پیشنهادات شما در بازار")
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0]
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"محصول")
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"فروشنده");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"موجودی");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"قیمت");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"ناخالص");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"قیمت");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"خالص");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"مالیات واردات");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"حذف");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"کمپانی ها");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"کمپانی")
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"محصول")
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"موقعیت")
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"کارگران")
    tmp = allElements.children[3]
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"ساخت کمپانی جدید")
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"نام کمپانی")
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"نوع محصول")
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"آواتار کمپانی")
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"ساخت کمپانی")
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"قیمت ایجاد کمپانی")
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"کمپانی در همان کشور و منطقه ای که هستید ساخته خواهد شد")
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"لیست مناطق و معادن در آنها")
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"آموزش کمپانی")
}
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"سیاست کشور");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"انتخاب کشور");
    tmp = allElements.children[2]
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"رییس جمهور");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"مشاهده انتخابات");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","رییس جمهور"]})
    tmp = allElements.children[9]
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"مجلس");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","مجلی"]})
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"جنگهای کشور");
    tmp = allElements.children[21]
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"جنگ");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"جزییات");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"بدون جنگ");
    tmp = allElements.children[22]
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"قوانین جنگ");
    tmp = allElements.children[23]
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"متحدان");
    tmp = allElements.children[27]
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"کشور");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"تاریخ اتمام"); 
    tmp = allElements.children[27].children[0]
    var loopz = tmp.children.length   
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1]
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"ثانیه ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"دقیقه ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"ساعت ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"روز ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"ماه ");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 ثانیه ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 دقیقه ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 ساعت ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 روز ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 ماه  ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","متحد ها"]})
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0]
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"دعوت دوستان");
    tmp = allElements.children[1]
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"لینک دعوت شما");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"برای گرفتن طلای اضافه ین لینک را به دوستان خود بدهید");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"شما دریافت خواهید کرد");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who registers/,"طلا برای هر شهروندی که ثبت نام کند");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"و به سطح هفت برسد");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"بعد از کلیک کردن روی لینک");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"و دیگری");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she gets his\/her/,"طلا زمانی که او بگیرد");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"اولین مدالش را");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"به اضافه شما خواهید گرفت");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"ده درصد از گلدایی که بازیکنان دعوت شده توسط شما جهت مدال یا بالا رفتن سطح میگیرند ، خواهید گرفت");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"همچنین دوست شما هم جایزه ای خواهد گرفت");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7/,"طلا برای ثبت نام کردن از طریق لینک شما زمانی که به سطح 7 میرسد");
    tmp = allElements.children[4]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"شهروندان دعوت شده توسط شما");
    tmp = allElements.children[5]
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"نوع نمایش");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"نمایش");
    tmp = allElements.children[6]
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"شهروند");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"سطح");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"طلای دریافت شده");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"تاریخ ثبت نام");
    
    TimeBasic(allElements,6,0,4)
    
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"امار");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"تعداد کل کلیکهای روی لینک شما");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"تعداد کلیک منحصر به فرد روی لینک شما");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"کل شهروندان ثبت نام کرده");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"شهروندانی که به سطح 7 رسیده اند");
    tmp = allElements.children[14]
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"آخرین کلیک ها روی لینک شما");
    tmp = allElements.children[15]
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"زمان");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"دعوت کننده");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"شهروند");
    
    TimeBasic(allElements,15,0,0)
    
    tmp = allElements.children[15].children[0]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3]
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"ثبت نام نکرده");
            }        
    }
    tmp = allElements.children[17]
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"نمایش کلیکهای بیشتر");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j]
    var loopz = tmp.children.length
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l]
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"ثانیه قبل");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"یک دقیقه قبل");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"یک ساعت پیش");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"دیروز");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"ماه پیش");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 ثانیه قبل");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 دقیقه قبل");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 ساعت قبل");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 روز قبل");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 ماه قبل");
            } 
        }
    }
}

function doPremium() {
     allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[7];
	tmp.innerHTML="<h2 style='text-align: center'>اسکریپت فارسی ساز</h2>"
		+ "<i>اسکریپت فارسی سازای-سیم</i> NIGHTMARE IS HERE  <br/><br/>"
		+ "<u>اسکریپت فارسی ساز ای-سیم </u>  کد نویسی و ترجمه شده توسط سهند - Made by Sahand<br>"
		+ "<br><br>";
	tmp = allElements.children[9]
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"وضعیت اکانت شما")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"اکانت معمولی")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"اکانت ویژه")
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"پرش به")
    replaceLinkByHref({
		"#features":["Features","ویژگی ها"],
		"#payments":["Payments","پرداختها"],
		"#faq":["FAQ","سوالات پرتکرار"]
	});
	tmp = allElements.children[13]
	tmp.innerHTML = tmp.innerHTML.replace(/Features/,"ویژگیها")
	tmp.innerHTML = tmp.innerHTML.replace(/Battle monitor/,"مانیتور کردن جنگ")
    tmp.innerHTML = tmp.innerHTML.replace(/Companies production reports/,"گزارش تولیدات کمپانی ها")
	
	tmp.innerHTML = tmp.innerHTML.replace(/Stock companies reports/,"گزارش بازار بورس")
	
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"گزارش مالیات بر درآمد")		
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"تراکنشات بازار ارز")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"ارسال پیام عمومی به ارتش")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"ارسال پیام عمومی به اعضای حزب")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/,"حذف تبلیغات")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"علامت ستاره در کنار پروفایل شما")	
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="برای بزرگ شدن عکس روی آن کلیک کنید"
	
        tmp = allElements.children[13].children[7]
	tmp.innerHTML="برای بزرگ شدن عکس روی آن کلیک کنید"
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="برای بزرگ شدن عکس روی آن کلیک کنید"
	
	tmp = allElements.children[13].children[15]
	tmp.innerHTML="برای بزرگ شدن عکس روی آن کلیک کنید"

    tmp = allElements.children[13].children[18];
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"برای بزرگ شدن عکس روی آن کلیک کنید")	
	
	tmp = allElements.children[13].children[19]
	tmp.innerHTML="برای بزرگ شدن عکس روی آن کلیک کنید"
	
	tmp = allElements.children[13].children[22]
	tmp.innerHTML="برای بزرگ شدن عکس روی آن کلیک کنید"
	tmp = allElements.children[13].children[25]
	tmp.innerHTML="برای بزرگ شدن عکس روی آن کلیک کنید"
	
	tmp = allElements.children[13].children[27]
	tmp.innerHTML="برای بزرگ شدن عکس روی آن کلیک کنید"
	
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"پرداختها")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"مدت")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"قیمت")
	tmp.innerHTML = tmp.innerHTML.replace(/One Month (30 days)/,"15 روز")
	tmp = allElements.children[15].children[3].children[0]
	tmp.innerHTML="<b>دو راه برای خرید وجود دارد :</b><br>"
	tmp = allElements.children[15].children[3].children[2]
	tmp.innerHTML="<ul><li>با پرداخت 15 روزه</li><li> قبل از خرید از تصمیم خود اطمینان پیدا کنید !</li><li> پرداخت<img class=\"currencyFlag\" align=\"absmiddle\" src=\"http://e-sim.home.pl/eworld/img/gold.png\" style=\"border: 0px; height: 14px\"><b>20.00</b> طلا برای یک هفته</li></ul>"
	
	document.getElementById('buyNameChangeButton').value = "با پرداخت 20 گلد یک هفته اکانت ویژه بگیرید"
	
	tmp = allElements.children[17].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/FAQ/,"اطلاعات اضافه")
	tmp = allElements.children[17].children[1]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">چگونه به روند ساخت این اسکریپت کمک کنیم ؟"
	tmp = allElements.children[17].children[2]
	tmp.innerHTML=" در صورتی که از استفاده این اسکریپت رایگان لذت بردید و قصد کمک جهت ایجاد انگیزه ساخت اسکریپتهای جدید و آپدیت مداوم این اسکریپت را دارید. دوناتهای خودتون رو میتونید به یکی از لینکهای زیر بفرستید"
	tmp = allElements.children[17].children[3]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">لینک محل فرستادن دوناتها"
	tmp = allElements.children[17].children[4]
	tmp.innerHTML="<a href=\"http://primera.e-sim.org/donateMoney.html?id=239\">linke aval</a>"
	tmp = allElements.children[17].children[5]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\""
	tmp = allElements.children[17].children[6]
	tmp.innerHTML="<a target=\"_blank\" href=\"http://secura.e-sim.org/donateMoney.html?id=3015\">linke dovom</a>"
	tmp = allElements.children[17].children[7]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Translated by Sahand"
	tmp = allElements.children[17].children[8]
	tmp.innerHTML=" ya "
	
}

function doDonations() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[2];
    replaceInputByValue({"Show":["Show","نمایش"]});
	tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/If you enjoy playing <i>e-sim<\/i> and would like to support development of the game with donation, please use the donate button./,"اگر از بازی ای-سیم خوشت اومده و دوست داری به بازی کمک مالی کنی روی دکمه دونات کلیک کن")
	tmp.innerHTML = tmp.innerHTML.replace(/Your donation will be visible to everyone on this page/,"دونات شما برای همه در این صفحه به نمایش در خواهد آمد")
	tmp.innerHTML = tmp.innerHTML.replace(/Donors, who make 2 EUR donations will receive bonus/,"کسانی که 2 یورو یا بیشتر کمک کنند جایزه ای دریافت خواهند کرد")
	replaceLinkByHref({"achievement.html?type=DONATOR":["donor achievement","دستاورد دونور"]});
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