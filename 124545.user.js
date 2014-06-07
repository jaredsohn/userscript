// ==UserScript==
// @name           e-sim UA
// @namespace      e-sim UA
// @include        http://e-sim.org*
// ==/UserScript==
//Ukrainian translation by Garbage

menuLinkReplacements = {
	"work.html"				:["Work","Робота"],
	"train.html"			:["Train","Тренувати"],
	"companies.html"		:["Companies","Компанії"],
	"newspaper.html"		:["Newspaper","Газета"],
	"myParty.html"			:["Party","Політична партія"],
	"contracts.html"		:["Contracts","Контракти"],
	"inviteFriends.html"	:["Invite friends","Запросити друзів"],
	"myMilitaryUnit.html"	:["Military unit","Військова частина"],
	"subscription.html"     :["Premium account","Преміум-аккаунт"],
	
	"productMarket.html"	:["Product market","Ринок товарів"],
	"jobMarket.html"		:["Job market","Біржа праці"],
	"monetaryMarket.html"	:["Monetary market","Валютний ринок"],
	"companiesForSale.html"	:["Companies for sale","Компанії на продаж"],
	
	"countryStatistics.html"		:["Country statistics","По країнам"],
	"partyStatistics.html"			:["Party statistics","По партіям"],
	"newspaperStatistics.html"		:["Newspaper statistics","По газетам"],
	"citizenStatistics.html"		:["Citizen statistics","По громадянам"],
	"militaryUnitStatistics.html"	:["Military unit stats","По війск. част."],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Найважливіші статті"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Останні статті"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Військові події"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Політичні події"],
	
	"battles.html"							:["Battles","Битви"],
	"countryPoliticalStatistics.html"		:["War and politics","Війна і політика"],
	"countryEconomyStatistics.html"			:["Economy","Економіка"],
	"countryLaws.html"						:["Laws","Законодавство"],
	"partyElections.html"					:["Party elections","Вибори до партії"],
	"congressElections.html"				:["Congress elections","Вибори до конгресу"],
	"presidentalElections.html"				:["Presidential elections","Вибори президента"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Громадянство"],
	"googleMap.html"						:["Map","Мапа"]
};


menuTextReplacements = {
	"myPlacesButton":["My places","Мій громадянянин"],
	"marketButton":["Market","Ринок"],
	"statisticsButton":["Statistics","Статистика"],
	"newsButton":["News","Новини"],
	"electionsButton":["Country","Країна"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","Вихід"],
	"workIcon"	:["Work","Робота"],
	"fightIcon"	:["Fight","Боротьба"],
	"avatarIcon":["Upload avatar","Завантажити аватар"],
	"voteIcon"	:["Vote","Голосувати"]
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Подорож"],
	"pendingCitizenshipApplications.html"	:["change","Змінити"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","Довідник: Здоров'я"]
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","З'їсти букли"],
	"useGiftLink":["Use gifts","Використати подарунки"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","З'їсти"],
	"useGiftButton":["Use gift","Використати"] 
};


hpTitleReplacements = {
	"News":["News","Новини"],
	"Shouts":["Shouts","Вигуки"],
	"Battles":["Battles","Битви"],
	"Events":["Events","Події"]
};


hpTabsReplacements = {
	"#topArticles":["Global","Загальні"],
	"#latestArticles":["Latest","Останні"],
	"#localArticles":["Local","Місцеві"],
	
	"#countryShouts":["Country","Країна"],
	"#friendsShouts":["Military unit","Війск. част."],
	"#myShouts":["Friends","Друзі"],
	
	"#localBattles":["Country","Країна"],
	"#substidedBattles":["Subsidized","Субсидовані"],
	"#hotBattles":["Important","Важливі"],

	"#localEvents":["Military","Військові"],
	"#globalEvents":["Military","Військові"],
	"#politicalEvents":["Political","Політичні"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Довідник: Валютний ринок"]
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 союзників");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"без союзників");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Повстання");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Субсидії:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"без союзників");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 союзник");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 союзників");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Повстання");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Субсидії:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"секунду тому");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"хвилину тому");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"годину тому");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"вчора");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"місяць тому");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 секунд тому");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 хвилин тому");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 годин тому");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 днів тому");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 місяців тому");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"секунду тому");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"хвилину тому");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"годину тому");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"вчора");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"місяць тому");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 секунд тому");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 хвилин тому");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 годин тому");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 днів тому");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 місяців тому");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"секунду тому");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"хвилину тому");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"годину тому");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"вчора");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"місяць тому");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 секунд тому");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 хвилин тому");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 годин тому");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 днів тому");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 місяців тому");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Недавні");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"захисники:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"нападники:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Статистика поточного раунду");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Загальна кількість пошкоджень захисниками:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Загальна кількість пошкоджень нападниками:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Ви нанесли пошкоджень:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Найкращі країни в обороні:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Найкращі країни в нападі:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Найкращі військові частини в обороні:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Найкращі військові частини в нападі:");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"секунду тому");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"хвилину тому");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"годину тому");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"вчора");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"місяць тому");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 секунд тому");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 хвилин тому");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 годин тому");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 днів");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 місяців тому");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Поскаржитись"],
    "Delete":["Delete","Видалити"],
    "Edit":["Edit","Редагувати"],
    "More shouts":["More shouts","Ще вигуків"]
});
	
	
replaceInputByValue({
    "Report":["Report","Поскаржитись"],
    "Delete":["Delete","Видалити"],
    "Edit":["Edit","Редагувати"]
});	
	




//============================================================================
//Menu
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	allElements = document.getElementById('headerRow').children[2].children[0].children[0].children[1].children[1].children[3];
    allElements.innerHTML=allElements.innerHTML.replace(/day/,"день");
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Рівень: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Звання:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Наст. звання:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Економічні навички:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Сила");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Регіон:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Громадянство:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Ліміт булок:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Ліміт подарунків:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Ваші гроші");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Ваш інвентар");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Ваші повідомлення");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Ваші завдання на сьогодні");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Поточний раунд");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Раунд $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Тип булок");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Тип подарунків");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Без зброї");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"Будь-яка");
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
		"Show more battles":["Show more battles","Показати більше боїв"],
		"Subsidies informations":["Subsidies informations","Довідник: Субсидії"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Немає субсидованих боїв");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"Ваші військомі накази :");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Боротись за:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"хвилину тому");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"годину тому");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"вчора");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"місяць тому");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 хвилин тому");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 годин тому");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 днів тому");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 місяців тому");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"захистила $2,в битві проти ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Громадяни $2 розпочали повстання у $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"піддалась нападу $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Президент $2$3 пропонує оголосити війну $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," оголосила війну $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," завоювала $2, у битві проти ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," має нового президента");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Показати більше подій");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Написати новий вигук:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Вигук!";
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Надіслати до :");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Надіслати до :");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Країна | $2  Військова частина | $4 Друзі");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Ще вигуки"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Біржа праці ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Критерії вибору:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Країна:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Економічний навик:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Роботодавець");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Компанія");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Продукт");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Мінімальний навик");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Зарплата");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Зголоситись");
	
	replaceInputByValue({"Apply":["Apply","Зголоситись"],"Show":["Show","Відобразити"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Робота");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Немає місця праці");
		replaceInputByValue({"Get a job now!":["Get a job now!","Знайти роботу !"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Ви повинні залишитися в країні, де знаходиться компанія для того, щоб працювати");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Місце роботи");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Роботодавець");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Зарплата:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Звільнитись");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Сьогодні ви не працювали");
			replaceInputByValue({"Work now":["Work now","Працювати зараз"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Сьогоднішні результати роботи");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Ваш валовий дохід");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Ваш чистий оклад");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Податок");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Працювали у");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"XP здобуто");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Економічного навику здобуто");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Робочі дні в ряд");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Ваша базова продуктивність");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Модифікатори продуктивності");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Загальна продуктивність");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Одиниць вироблено");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Якість компанії");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Будь-який"],
		"2":["Iron","Залізо"],
		"3":["Grain","Зерно"],
		"4":["Oil","Нафта"],
		"5":["Stone","Камінь"],
		"6":["Wood","Дерево"],
		"7":["Diam.","Діамант"],
		"8":["Weap.","Зброя"],
		"9":["House","Дім"],
		"10":["Gift","Подарунок"],
		"11":["Food","Булка"],
		"12":["Ticket","Квитки"],
		"13":["DS","О.С."],
		"14":["Hosp.","Шпиталь"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Ринок");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Пропозиції:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Країна:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Якість:");
	
	replaceInputByValue({"View offers":["View offers","Пропозиції"],"Buy":["Buy","Купити"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Мої пропозиції / додати пропозицію"]});
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Продукт");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Продавець");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"Запас");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Ціна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Купити");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," шт. "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Мої пропозиції / додати пропозицію"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","Довідник: Продукція"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Віськова підготовка");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Trenuj"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Тренування закінчено, повертайтесь завтра");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Ви вже проводили тренування сьогодні");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Ви вже проводили тренування сьогодні, повертайтесь завтра");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Сили здобуто:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Військові подробиці");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Всього тренінгів:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Сила:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Військове звання:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Пошкоджень загалом:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Пошкодження, без зброї:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Пошкоджень зі зброєю Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Пошкоджень зі зброєю Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Пошкоджень зі зброєю Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Пошкоджень зі зброєю Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Пошкоджень зі зброєю Q5:");
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Битви");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Сортування:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Тільки субсидовані битви:");
	
	replaceInputByValue({"Show battles":["Show battles","Показати битви"]});
	
    tmp = allElements.children[4].children[0].children[0];
    var loopz = tmp.children.length;
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Початок битви");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Битва");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"оборона vs напад");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Рахунок");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Пошкоджень загалом");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Повстання");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"розпочате");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Раунд $2");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Раундів виграно захисниками");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Раундів виграно нападниками");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Найкращі оборонці");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Найкращі нападники");
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Ви не можете воювати в цій битві з вашого поточного місця розташування.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Ви повинні поїхати в країну-окупант для участі у битві.");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Ви не можете воювати в цій битві з вашого поточного місця розташування.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Ви повинні поїхати в одну з країн, що беруть участь у битві.");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"У цьому раунді перемога :");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Обрати зброю:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Обрати сторону:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Ви воюєте за:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Показати раунд:");
	}
	replaceInputByValue({"Show round":["Show round","Показати"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Показати загальну статистику битви");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Довідник: Битви");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Правила битви");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"розпочато");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Райнд $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Раунди виграні захисником");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Раунди виграні нападником");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"повернутись до битви");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"SСтатистика формується один раз в 30 хвилин");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Статистика битви");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Громадянин ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Присутній");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Відсутній");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Редагувати профіль"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Змінити ім'я"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Доповісти про мульта"]
	});
	replaceInputByValue({"Report multi":["Report multi","Доповісти про мульта"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Вічний бан");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Причина:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Ким забанений :");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Рівень:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Пошкодження:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Звання:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Економічний навик:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Сила:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Регіон:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Громадянство:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"День народження:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Національний ранг по XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Національний ранг по пошкодженням:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Глобальний ранг по XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Глобальний ранг по пошкодженням:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Військова частина:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Партія:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Газета:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Працюєте на:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Власні компанії");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Політична посада:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Немає військової частини");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Немає партії");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Немає газети");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Немає роботи");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Немає компаній");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Немає політичної посади");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Активні борги");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"день повернення");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Друзі");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Новий пароль:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Повторіть новий пароль:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Старий пароль:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Новий аватар:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","макс. розмір:");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Громадянин");
	replaceInputByValue({"Edit citizen":["Edit citizen","Редагувати громадянина"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Подорож");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Країна");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Регіон:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Якість квитка:");
	
	replaceInputByValue({"Travel":["Travel","Подорож"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","Довідник: Подорожі"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Повідомлення від: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Надіслані повідомлення: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Автор");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Повідомлення");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Дата");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Усунути");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"до");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Надіслані повідомлення"],
		"composeMessage.html":["Compose message","Написати"]
	});
	replaceInputByValue({
		"Delete":["Delete","Usu\u0144"],
		"Quick reply":["Quick reply","Швидка відповідь"],
		"Report":["Report","Поскаржитись"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Поскаржитись"],
		"Quick reply":["Quick reply","Швидка відповідь"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Відповісти"],
		"conversation.html":["Previous messages","Попередні повідомлення"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Вхідні повідомлення"],
		"composeMessage.html":["Compose Message","Написати"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Нове повідомлення");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Вхідні повідомлення"],
		"sentMessages.html":["Sent messages","Надіслати"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Одержувач:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Заголовок:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Повідомлення:");
	
	replaceInputByValue({
		"Send":["Send","Надіслати"],
		"Preview":["Preview","Попередній перегляд"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Підписки");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Підписки");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Перелік підписок"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Підписки на газети");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Кількість підписок");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Газета");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Час підп.");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Довідник: Газета"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Газета");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Останні статті");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Редагувати газету"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Довідник: Газета"]
	});
	replaceInputByValue({
		"Publish":["Publish","Публікувати"],
		"Preview":["Preview","Перегляд"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Написати нову статтю");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Опублікувати в країні");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Назва статті:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Повідомлення:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Будь ласка, збережіть копію статті на жорсткий диск (комп'ютері) перед відправкою!!!");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Назва газети:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Новий аватар:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","макс. розмір:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Редагувати газету"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Редагувати газету"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Стаття");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Редагувати статтю"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Редагувати газету"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Поскаржитись"],
		"Edit":["Edit","Редагувати"],
		"Delete":["Delete","Видалити"]
	});
	replaceInputByValue({
		"Publish":["Publish","Публікувати"],
		"Report":["Report","Поскаржитись"],
		"Edit":["Edit","Редагувати"],
		"Delete":["Delete","Видалити"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Новий коментар");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Повідомлення:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Газета");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Редагувати статтю");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Назва статті:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Повідомлення:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Редагувати газету"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","Довідник: Газета"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Редагувати статтю"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Контракти");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Шаблони");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Запропоновані контракти(20 останніх)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"запропонований ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Немає контрактів");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Прийняті контракти (20 останніх)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"запропонований ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Немає контрактів");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Відхилені контракти");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Відхилено $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Немає контрактів");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Невдалі контракти");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Немає контрактів");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Ваші активні кредити");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Позичальник");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Дата повернення");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Сума");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Скасувати борг");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Немає боргів");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Ваші активні позики");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Кредитор");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Дата повернення");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Сума");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Оплатити борг");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Немає боргів");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Назва шаблону:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Довідник: Контракти"],
		"#":["Create new template","Створити новий шаблон"]
	});
	replaceInputByValue({
		"Delete":["Delete","Видалити"],
		"Create template":["Create template","Створити шаблон"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"зобов'язання $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Зобов'язання шаблонного громадянина");
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Шаблонний громадянин");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"зобов'язання $1");
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," негайно пожертвувати наступні продукти");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," негайно пожертвувати таку суму");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," буде пред'явлено звинувачення в боргу");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"повинні бути оплачені $1$3$5 день гри ($6 днів з моменту підписання контракту "
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Контракти");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Контракт");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Статус контракту: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Прийнятий");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Відхилений $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Зірваний");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"Шаблон");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Додати новий елемент у контракті");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Сторона");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Тип елемента");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Шаблонний громадянин");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Гроші"],
			"Product":["Product","Продукт"],
			"Debt":["Debt","Борг"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Гроші в  ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Штук:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Тип продукту:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Якість продукту:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Залізо"],
			"Grain":["Grain","Зерно"],
			"Oil":["Oil","Нафта"],
			"Stone":["Stone","Камінь"],
			"Wood":["Wood","Дерево"],
			"Diamonds":["Diamonds","Діаманти"],
			"Weapon":["Weapon","Зброя"],
			"House":["House","Дім"],
			"Gift":["Gift","Подарунок"],
			"Food":["Food","Булки"],
			"Ticket":["Ticket","Квиток"],
			"Defense System":["Defense System","Оборонна система"],
			"Hospital":["Hospital","Шпиталь"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Борг");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Гроші в ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Дата оплати:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Якість продукту:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Запропонувати контракт");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Запропонувати для");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Примітка:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Ви можете пропонувати контракти тільки своїм друзям");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Шаблонний громадянин"],
		"contracts.html":["Go back to contract list","Повернутись до списку контрактів"]
	});
	replaceInputByValue({
		"Delete":["Delete","Видалити"],
		"Propose":["Propose","Запропонувати"],
		"Add item":["Add item","Додати"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1);
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Відхилити пропозицію");
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Відхилити пропозицію"]});
	    }   
}
//================================================================================
// Monetary market
//================================================================================
function doMonetaryMarket() {
    var results;
    var allElements;
    results = getElements(document, "//TD[@width='410']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Валютний ринок");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Актуальні пропозиції");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Показати пропозиції");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Заміна валют");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Купити валюту");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency/,"Продати валюту");
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Переглянути пропозиції");
    
    allElements = results.snapshotItem(0).children[7];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Довідник: Валютний ринок");
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Продавець");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Кількість");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Співвідношення");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Купити");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Кількість");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Співвідношення"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Видалити");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Немає пропозицій");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Ваші пропозиції") ;
    
    allElements = results.snapshotItem(0).children[5];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Додати пропозицію");
    
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Заміна валют");
    
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Запропоновані валюти");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Купити валюту");
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"обмінний курс");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Додати нову пропозицію");
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Пропозиція");
    tmp.innerHTML = tmp.innerHTML.replace(/at rate/,"по курсу");
    
}
//=============================================================================
// Citizen market offers
//=============================================================================
function doCitizenMarketOffers() {
    var results;
    var allElements;
    var tmp;
    results = getElements(document, "//TD[@colspan='2']");
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Ринок");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Додати нові пропозиції");
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Країна");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Продукт");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Кількість");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Ціна");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Додати нову пропозицію");
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Показати пропозиції ринку");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Ваш склад");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0);
    tmp = allElements;
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Ваші пропозиції на ринку");
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Продукт");
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Продавець");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Запас");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Ціна");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Брутто");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Ціна");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Нетто");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Податок на імпорт");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Видалити");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Компанії");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Компанія");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Продукт");
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Регіон");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Працівники");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Створити нову компанію");
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Назва компанії");
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Тип продукту");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Аватар компанії");
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Створити компанію");
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Створення компанії коштує");
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"Компанія буде створена в поточному місцезнаходженні - регіоні");
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Перегляд областей з ресурсами");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Довідник: Компанії");
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Політика країни");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Обрати країну");
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Президент");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"переглянути вибори");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Президент"]});
    tmp = allElements.children[9];
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Kongres");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Конгрес"]});
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Війни");
    tmp = allElements.children[21];
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Війна");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Деталі");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"немає воєн");
    tmp = allElements.children[22];
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Правила війни");
    tmp = allElements.children[23];
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Союзники");
    tmp = allElements.children[27];
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Країна");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Закінчується"); 
    tmp = allElements.children[27].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1];
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"секунду ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"хвилину ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"годину ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"день ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"місяць ");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 секунд ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 хвилин ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 годин ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 днів ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 місяців ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Союзники"]});
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Запросити друзів");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Ваше посилання для рефералів");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Надішліть це посилання іншим людям, щоб отримати додатково");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Ви заробили");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"Золото за кожного громадянина, що зареєструвався");
    tmp.innerHTML = tmp.innerHTML.replace(/and earn level 7/,"і здобув 7 рівень");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"по цьому посиланню");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"і ще");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she get his\/her/,"Золота коли він\вона отримає");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"першу медаль");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Додатково отримаєте");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% золота від отриманих гравцем за медалі та рівні");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive additional/,"Зверніть увагу, що ваші друзі також отримають додаткові");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering from your invitation when he reach level 7/,"Золота за реєстрацію по вашому запрошенню, коли він досягне 7-го рівня");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Запрошені громадяни");
    tmp = allElements.children[5];
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Сортувати за");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Показати");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Громадянин");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Рівень");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Отримано золота");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Дата реєстрації");
    
    TimeBasic(allElements,6,0,4);
    
    tmp = allElements.children[11];
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Статистика");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Усього кліків за посиланням");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Унікальних кліків за посиланням");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Всього зареєстрованих громадян");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Громадяни, які досягли рівня 7");
    tmp = allElements.children[14];
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Останні кліки на посилання");
    tmp = allElements.children[15];
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Час");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Сторінка з якої перейшли");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Громадянин");
    
    TimeBasic(allElements,15,0,0);
    
    tmp = allElements.children[15].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3];
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Не зареєстровані");
            }        
    }
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Показати більше кліків");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l];
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"секунду тому");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"хвилину тому");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"годину тому");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"день тому");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"місяць тому");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 секунд тому");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 хвилин тому");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 годин тому");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 днів тому");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 місяців тому");
            } 
        }
    }
}
/*
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
*/
  
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