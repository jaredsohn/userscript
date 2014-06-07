// ==UserScript==
// @name       e-sim UA
// @namespace  олол
// @version    0.98
// @description  переклад гри українською мовою
// @include        http://*.e-sim.org*
// @copyright  Powered be DeathEater
// ==/UserScript==
//Ukrainian translation by DeathEater


menuLinkReplacements = {
	"work.html"				:["Work","Робота"],
	"train.html"			:["Train","Тренування"],
	"companies.html"		:["Companies","Мої підприємства"],
	"newspaper.html"		:["Newspaper","Моя газета"],
	"myParty.html"			:["Party","Політична партія"],
	"contracts.html"		:["Contracts","Контракти"],
    "myShares.html"		    :["Shares","Мої акції"],
	"inviteFriends.html"	:["Invite friends","Запросити друзів"],
	"myMilitaryUnit.html"	:["Military unit","Військ. підрозділ"],
	"subscription.html"     :["Premium account","Преміум-аккаунт"],
	
	"productMarket.html"	:["Product market","Ринок товарів"],
	"jobMarket.html"		:["Job market","Біржа праці"],
	"monetaryMarket.html"	:["Monetary market","Валютний ринок"],
	"companiesForSale.html"	:["Companies for sale","Компанії на продаж"],
	
	"countryStatistics.html"		:["Country statistics","По країнам"],
	"partyStatistics.html"			:["Party statistics","По партіям"],
	"newspaperStatistics.html"		:["Newspaper statistics","По газетам"],
	"citizenStatistics.html"		:["Citizen statistics","По громадянам"],
    "stockCompanyStatistics.html"  :["Stock market stats","Статистика по АТ"],
	"militaryUnitStatistics.html"	:["Military unit stats","По війск. підрозд."],
    "donations.html"	            :["Donations","Допомога проекту"],
    "fundRaising.html?id=4"         :["New modules","Нові модулі гри"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Кращі статті"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Останні статті"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Військові події"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Політичні події"],
	
	"battles.html"							:["Battles","Битви"],
	"countryPoliticalStatistics.html"		:["War and politics","Війна і політика"],
	"countryEconomyStatistics.html"			:["Economy","Економіка"],
	"countryLaws.html"						:["Laws","Законодавство"],
	"partyElections.html"					:["Party elections","Вибори лідера партії"],
	"congressElections.html"				:["Congress elections","Вибори до конгресу"],
	"presidentalElections.html"				:["Presidential elections","Вибори президента"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Громадянство"],
	"googleMap.html"						:["Map","Мапа"]
};


menuTextReplacements = {
	"myPlacesButton":["My places","Мої дані"],
	"marketButton":["Market","Ринок"],
	"statisticsButton":["Statistics","Статистика"],
	"newsButton":["News","Новини"],
	"electionsButton":["Country","Країна"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","Вихід"],
	"workIcon"	:["Work","Робота"],
	"fightIcon"	:["Fight","Воювати"],
	"avatarIcon":["Upload avatar","Завантажити аватар"],
	"voteIcon"	:["Vote","Голосувати"]
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Летіти"],
	"pendingCitizenshipApplications.html"	:["change","Змінити"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Довідник: Здоров'я"]
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Використати"],
	"useGiftLink":["Use gifts","Використати"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","З'їсти"],
	"useGiftButton":["Use gift","З'їсти"] 
};


hpTitleReplacements = {
	"News":["News","Новини"],
	"Shouts":["Shouts","Писанина"],
	"Battles":["Battles","Битви"],
	"Events":["Events","Події"],
};


hpTabsReplacements = {
	"#topArticles":["Global","Світові"],
	"#latestArticles":["Latest","Останні"],
	"#localArticles":["Local","Місцеві"],
	
	"#countryShouts":["Country","Країна"],
	"#friendsShouts":["Military unit","Підрозділ"],
	"#myShouts":["Friends","Друзі"],
	
	"#localBattles":["Country","Країна"],
	"#substidedBattles":["Subsidized","Оплачувані"],
	"#hotBattles":["Important","Важливі"],

	"#localEvents":["Military","В країні"],
	"#globalEvents":["Military","В світі"],
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 allies");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"no allies");
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
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"годин тому");
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
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"годин тому");
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
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Ваш дамаг:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Найкращі країни в обороні:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Найкращі країни в нападі:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Найкращі військові підрозділи в обороні:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Найкращі військові підрозділи в нападі:");
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
    "Report":["Report","Скарга"],
    "Delete":["Delete","Видалити"],
    "Edit":["Edit","Редагувати"],
    "More shouts":["More shouts","Попередні повідомлення"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Шкала звання:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Економічний рівень: – ");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Сила: – ");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Регіон:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Громадянство:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Ліміт булок:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Ліміт гіфтів:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Гроші");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Склад");
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
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Без зброї..... (");
		} 
        else if (obj.innerHTML.match("Q1 ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Q1 \()/,"Q1.....(");
		} 
        
                
        else if (obj.innerHTML.match("Q2 ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Q2 \()/,"Q2.....(");
		} 
        
        else if (obj.innerHTML.match("Q3 ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Q3 \()/,"Q3.....(");
		} 
        
        else if (obj.innerHTML.match("Q4 ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Q4 \()/,"Q4.....(");
		} 
        
        else if (obj.innerHTML.match("Q5 ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Q5 \()/,"Q5.....(");
		} 
        
        else if (obj.innerHTML.match("Show round")) {
			obj.innerHTML=obj.innerHTML.replace(/(Show round\()/,"Лупаш");
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders: )/,"Військовий наказ:");
       	tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Бити за:");
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
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Написати нове повідомлення:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Відправити!";
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Надіслати до :");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Надіслати до :");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Країна | $2  Військовий підрозділ | $4 Друзі");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Попередні повідомлення"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Фірма");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Мін. скіл");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Зарплата");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Влаштуватись");
	
	replaceInputByValue({"Apply":["Apply","Влаштуватись"],"Show":["Show","Показати"]});
}
//============================================================================
//Shares
//============================================================================
function doShares() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(My shares)/,"Мої акції");
  	
    allElements = document.getElementById('contentRow').children[1];
      tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Owned shares/,"Власні акції");
    tmp.innerHTML=tmp.innerHTML.replace(/(Public company)/,"Акціонерна компанія");
    tmp.innerHTML=tmp.innerHTML.replace(/(Shares)/,"Акції");
    tmp.innerHTML=tmp.innerHTML.replace(/(Estimated value)/,"Вартість");
    tmp.innerHTML=tmp.innerHTML.replace(/(No stocks)/,"Акції відсутні");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock company tutorial/,"Довідник: Акціонерні Компанії");
      
  tmp = allElements.children[3];
  tmp.innerHTML = tmp.innerHTML.replace(/My orders/,"Мої пропозиції");
  tmp.innerHTML=tmp.innerHTML.replace(/(Public company)/,"Акціонерна компанія");
  tmp.innerHTML=tmp.innerHTML.replace(/(Volume)/,"Обсяг");
  tmp.innerHTML=tmp.innerHTML.replace(/(Type)/,"Тип");
  tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Ціна");
  tmp.innerHTML=tmp.innerHTML.replace(/(Delete)/,"Видалити");
  tmp.innerHTML=tmp.innerHTML.replace(/(No orders)/,"Пропозиції відсутні");

  tmp = allElements.children[5];
  tmp.innerHTML = tmp.innerHTML.replace(/My roles/,"Посада");
  tmp.innerHTML=tmp.innerHTML.replace(/(Public company)/,"Акціонерна компанія");
  tmp.innerHTML=tmp.innerHTML.replace(/(Role)/,"Бред");
  tmp.innerHTML=tmp.innerHTML.replace(/(No roles)/,"Посад не займаю");

    tmp = allElements.children[7];
    tmp.innerHTML=tmp.innerHTML.replace(/(Public company name:)/,"Назва:");
    tmp.innerHTML=tmp.innerHTML.replace(/(Create new public company:)/,"Створити акціонерну компанію:");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Логотип компанії");
    tmp.innerHTML = tmp.innerHTML.replace(/Create public company/,"Створити акціонерну компанію");
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Створення компанії коштує");
    tmp.innerHTML = tmp.innerHTML.replace(/Starting capital in gold/,"Стартовий капітал ");
    tmp.innerHTML = tmp.innerHTML.replace(/(min. 50 Gold)/,"мін. 50 Gold");
    tmp.innerHTML = tmp.innerHTML.replace(/(max. size 200Kb)/,"мах. розмір 200 Кб");
    tmp.innerHTML = tmp.innerHTML.replace(/(starting capital)/,"стартовий капітал");

    tmp.innerHTML = tmp.innerHTML.replace(/The stock company will be located in /,"Акціонерна компанія буде створена в ");
    tmp.innerHTML = tmp.innerHTML.replace(/Be aware that it's illegal to fraud investors' money!/,"Майте на увазі що викрадення грошей інвесторів є незаконним");
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
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Не працевлаштований");
		replaceInputByValue({"Get a job now!":["Get a job now!","Знайти роботу !"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Ви повинні знаходитись в країні, де знаходиться компанія для того, щоб працювати");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Місце роботи:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Роботодавець");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Зарплата:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Звільнитись");
        tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Військовий підрозділ");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Сьогодні ви не працювали");
			replaceInputByValue({"Work now":["Work now","Працювати зараз"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Сьогоднішні результати роботи:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Ваш валовий дохід:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Ваш чистий оклад:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Податок:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Працювали в");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained: )/,"Очків досвіду(XP) здобуто:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Приріст економічного навику");
   			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Відпрацьовані дні підряд ");
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
		"1":["Any","Всі"],
		"2":["Iron","Залізо"],
		"3":["Grain","Зерно"],
		"4":["Oil","Нафта"],
		"5":["Stone","Камінь"],
		"6":["Wood","Дерево"],
		"7":["Diam.","Діамант"],
		"8":["Weap.","Зброя"],
		"9":["House","Дім"],
		"10":["Gift","Гіфти"],
		"11":["Food","Хліб"],
		"12":["Ticket","Квитки"],
		"13":["DS","Захисна споруда"],
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
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Мої пропозиції / Додати пропозицію"]});
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Продукт");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Продавець");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"На складі");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Ціна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Купити");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," шт. "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Мої пропозиції / Додати пропозицію"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","Довідник: Продукція"]
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
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Ви вже тренувались сьогодні");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Ви вже тренувались сьогодні, повертайтесь завтра");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Приріст сили:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Детальніше:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Всього тренувань:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Сила:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Військове звання:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Сумарний дамаг:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Дамаг без зброї:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Дамаг зі зброєю Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Дамаг зі зброєю Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Дамаг зі зброєю Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Дамаг зі зброєю Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Дамаг зі зброєю Q5:");
	
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
    tmp.innerHTML=tmp.innerHTML.replace(/(All countries)/,"Всі країни");
    tmp.innerHTML=tmp.innerHTML.replace(/(Sorting by start time)/,"Відобразити за часом початку");
     tmp.innerHTML=tmp.innerHTML.replace(/(Sorting by subsidy size)/,"Відобразити за оплатою боїв");
     tmp.innerHTML=tmp.innerHTML.replace(/(Sorting by total damage)/,"Відобразити за сумарним дамагом");
    
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Сумарний дамаг");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Найкращі захисники");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Найкращі нападники");
   
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Ви не можете воювати в цій битві з вашого поточного місця розташування.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Ви повинні перелетіти в країну-окупант для участі у битві.");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Ви не можете воювати в цій битві з вашого поточного місця розташування.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Ви повинні перелетіти в одну з країн, що беруть участь у битві.");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"Перемогув раунді здобули :");
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
    tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"МЮ що встановили накази на битву");
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
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Статистика битви:");
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
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Онлайн");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Оффлайн");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Редагувати профіль"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Змінити ім'я"]
	});
    replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","Логи"]
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
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Забанений :");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Рівень:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"Очки досвіду:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Дамаг:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Звання:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Екон. навик:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Сила:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Регіон:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Громадянство:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"Днюха:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Нац. ранг по XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Нац. ранг по дамагу:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Світовий ранг по XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Світовий ранг по дамагу:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Військовий підрозділ:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Партія:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Газета:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Працюєте на:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Власні компанії");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Політична посада:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Без військового підрозділу");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Безпартійний");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Немає газети");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Немає роботи");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Немає компаній");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Без політичної посади");
	
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
//===================================================
//Country Stats
//===================================================
function doCountryStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country statistics)/,"Статистика по країнам:");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Тип статистики:");
	replaceInputByValue({"Show":["Show","Відобразити"]});
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/(Total:)/,"Всьогo:");
	tmp.innerHTML=tmp.innerHTML.replace(/(dmg.)/,"дамагу");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"очків досвіду");
	tmp.innerHTML=tmp.innerHTML.replace(/(strength)/,"сили");	
	tmp = allElements.children[6];
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"Nr.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens online)/,"Гравців онлайн");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Citizens)/,"Гравців");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Загальний дамаг");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Дамаг сьогодні");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/,"Очків досвіду");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength)/,"Сила");
	tmp.innerHTML=tmp.innerHTML.replace(/(New citizens today)/,"Нових громадян сьогодні");
	tmp.innerHTML=tmp.innerHTML.replace(/(Productivity)/,"Продуктивність");
	tmp.innerHTML=tmp.innerHTML.replace(/(strength)/g,"сили");
	tmp.innerHTML=tmp.innerHTML.replace(/(xp)/g,"Очків досвіду");
	tmp.innerHTML=tmp.innerHTML.replace(/(dmg.)/g,"дамагу");	
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	if (obj.innerHTML.match("Citizens online")) {
	obj.innerHTML=obj.innerHTML.replace(/(Citizens online)/,"Гравців онлайн");
	} else if (obj.innerHTML.match("Total damage")) {
	obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Загальний дамаг");
	} else if (obj.innerHTML.match("Damage today")) {
	obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Дамаг сьогодні");
	} else if (obj.innerHTML.match("xp")) {
	obj.innerHTML=obj.innerHTML.replace(/(xp)/,"Очки досвіду");
	} else if (obj.innerHTML.match("Strength")) {
	obj.innerHTML=obj.innerHTML.replace(/(Strength)/,"Сила");
	} else if (obj.innerHTML.match("New citizens today")) {
	obj.innerHTML=obj.innerHTML.replace(/(New citizens today)/,"Нових громадян сьогодні");
	} else if (obj.innerHTML.match("Citizens")) {
	obj.innerHTML=obj.innerHTML.replace(/(Citizens)/,"Гравців Всього");
	} else if (obj.innerHTML.match("Productivity")) {
	obj.innerHTML=obj.innerHTML.replace(/(Productivity)/,"Продуктивність");
	}
	}
}

//===================================================
//Party Stats
//===================================================
function doPartyStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party statistics)/,"Статистика по партіям");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	replaceInputByValue({"Show":["Show","Відобразити"]});
	replaceInputByValue({"Leave party":["Leave party","Покинути партію"]});
	replaceInputByValue({"Join":["Join","Приєднатись"]});
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"No.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Партія");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Членів");
	obj = results.snapshotItem(i);
	}
}
//===================================================
//Newspaper Stat
//===================================================
function doNewsStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper statistics)/,"Статискика по газетам");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Попередні");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Наступні");
	
	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"No.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Redactor)/,"Редактор");
	tmp.innerHTML=tmp.innerHTML.replace(/(Newspaper)/,"Газета");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subs)/,"Підписок");	
	}
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
		"http://wiki.e-sim.org/index.php/Traveling":["Traveling tutorial on wiki","Довідник: Подорожі"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Прапорець");
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
		"Report":["Report","Скарга"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Скарга"],
		"Quick reply":["Quick reply","Швидка відповідь"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Відповісти"],
		"conversation.html":["Previous messages","Попередні повід."]
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
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Довідник: Газета"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper(){
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
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Довідник: Газета"]
       	});
	replaceInputByValue({
		"Publish":["Publish","Публікувати"],
		"Preview":["Preview","Перегляд"]
	});
	//tmp.innerHTML=tmp.innerHTML.replace(/Redactor/,"Редактор");
	
    //my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Написати нову статтю:");
        tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Опублікувати в країні");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Назва статті:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Текст:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Будь ласка, збережіть копію статті на жорсткий диск (комп'ютер) перед публікацією!!!");
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
		"Report":["Report","Скарга"],
		"Edit":["Edit","Редагувати"],
		"Delete":["Delete","Видалити"]
	});
	replaceInputByValue({
		"Publish":["Publish","Публікувати"],
		"Report":["Report","Скарга"],
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
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Довідник: Газета"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Шаблони:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Запропоновані контракти(20 останніх)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"запропонований ");
    tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Немає контрактів");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Прийняті контракти (20 останніх)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"запропоновано ");
    tmp.innerHTML=tmp.innerHTML.replace(/offered by/,"отримано від");
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
		"http://wiki.e-sim.org/index.php/Contracts":["Contract tutorial","Довідник: Контракти"],
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
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"Зобов'язання $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"Зобов'язання шаблонного громадянина");
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Шаблонний громадянин");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"зобов'язання $1");
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," негайно передає наступні продукти");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," негайно переказує таку суму");
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
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Інша сторона");
		
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
			"House":["House","Будинок"],
			"Gift":["Gift","Подарунки"],
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
		"profile.html?id=0":["Dummy citizen","Ігша сторона"],
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
    tmp = allElements.children[0];
    
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency:/,"Купити валюту");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency:/,"Продати валюту");
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
    tmp.innerHTML = tmp.innerHTML.replace(/No companies/,"Компанії відсутні");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Створити нову компанію");
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Назва компанії");
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Тип продукту");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Логотип компанії");
    tmp.innerHTML = tmp.innerHTML.replace(/(max. size 200Kb)/,"мах. розмір 200 Кб");
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
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Ваше реферальне посилання");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Надішліть це посилання іншим людям, щоб отримати додатково");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Ви отримаєте");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"Gold за кожного громадянина, що зареєструвавс");
    tmp.innerHTML = tmp.innerHTML.replace(/s/,"я");
    tmp.innerHTML = tmp.innerHTML.replace(/and reaches level 7/,"і здобув 7 рівень");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"по цьому посиланню");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"і ще");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she gets his\/her/,"Gold коли він отримає");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"першу медаль");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Додатково отримаєте");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% золота отриманих рефералом від медалей та рівнів");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive an additional/,"Зверніть увагу, що ваші друзі також отримають додатково");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering through your game invitation link when they reach level 7./,"Золота за реєстрацію по вашому запрошенню при досягненні 7-го рівня");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Запрошені громадяни(реферали):");
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
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Усього кліків посилання");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Унікальних кліків посилання");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Всього зареєстрованих громадян");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Громадяни, які досягли рівня 7");
    tmp = allElements.children[14];
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Останні кліки посилання");
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

function doPremium() {
    allElements = document.getElementById('contentRow').children[1]
    tmp = allElements.children[7];
	tmp.innerHTML="<h2 style='text-align: center'>Преміум аккаунт</h2>"
		+ "<i>E-sim</i>  безкоштовна гра, запрошуємо грати кожного без сплачування коштів. Однак, якщо ви є шанувальником <i>E-sim</i>,  ви можете замовити передплату на преміум-аккаунт..<br/><br/>"
		+ "<u>Преміум аккаунт</u> надасть Вам доступ до цікавої інформації та корисних функцій, таких як моніторинг бою або відправка повідомлень всім бійцям війського підрозділу.<br>"
		+ "Крім того, інші гравці зможуть побачити престижну зірку на сторінці вашого профілю.<br/>"
		+ "Купивши <u>Преміум аккаунт</u> Ви також підтримаєте нас і допоможете у подальшому розвитку <i>E-sim</i>!."
		+ "<br><br>";
  
  	tmp = allElements.children[9]
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"Стутус аккаунта")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"Безкоштовний аккаунт")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"Преміум аккаунт")
            
                                 
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"Перейти до")
    replaceLinkByHref({
		"#features":["Features","Особливості"],
		"#payments":["Payments","Оплата"],
		"#faq":["FAQ","FAQ"]
	});
    
         
	tmp = allElements.children[13]
	tmp.innerHTML = tmp.innerHTML.replace(/Features/,"Особливості")
	tmp.innerHTML = tmp.innerHTML.replace(/Battle monitor/,"Монітор битв")
	tmp.innerHTML = tmp.innerHTML.replace(/Tax income statistics/,"Статистика по податкам")
	tmp.innerHTML = tmp.innerHTML.replace(/Money supply statistics/,"Статистика грошової маси")
	tmp.innerHTML = tmp.innerHTML.replace(/Historical Monetary Market transactions/,"Історія валютних операцій ринку")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to military unit members/,"Розсилання повідомлення всіх членам військового підрозділу")
    tmp.innerHTML = tmp.innerHTML.replace(/Stock companies reports/,"Статистика по акціонерним компаніям")
	tmp.innerHTML = tmp.innerHTML.replace(/Broadcast messages to party members/,"Розсилання повідомлення всіх членам політичної партії")
	tmp.innerHTML = tmp.innerHTML.replace(/Removed ads/,"Прибрана реклама")
	tmp.innerHTML = tmp.innerHTML.replace(/Prestigious star icon on your profile view /,"Матимете престижну зірку на сторінці вашого профілю")
    tmp.innerHTML = tmp.innerHTML.replace(/Companies production reports/,"Статистика про виробництво компаній")
	tmp = allElements.children[13].children[4]
	tmp.innerHTML="Огляд битви буде доповнено компонентами відображення національності спостерігачів та осіб що приймають участь в битві "
	
    tmp = allElements.children[13].children[7]
	tmp.innerHTML="Додаткові інструменти для розрахунку прибутковості Вашої компанії"
	
	tmp = allElements.children[13].children[11]
	tmp.innerHTML="Доступ до статистики активів акціонерних товариств"
	
	tmp = allElements.children[13].children[15]
	tmp.innerHTML="Ви отримаєте доступ до даних податкового доходу вашої країни (відображається лише для президента і членів Конгресу)"
        
	tmp = allElements.children[13].children[18]
	tmp.innerHTML="    Статистика грошової маси" 
	
	tmp = allElements.children[13].children[19]
	tmp.innerHTML="Ви отримаєте статистику про розмір грошової маси у вашій країні (відображається лише для президента і членів Конгресу)"
        
    tmp = allElements.children[13].children[22]
	tmp.innerHTML="Доступ до історій операцій на грошовому ринку за всіма валютами. Дуже корисно для трейдерів грошового ринку."
        
    tmp = allElements.children[13].children[25]
        tmp.innerHTML="Миттєве мовлення(розсилка повідомлень) для всіх членів вашого військового підрозділу. Примітка: Ви повинні буди командиром для використання цього модуля."
	
    tmp = allElements.children[13].children[27]
	tmp.innerHTML="Якщо ви є лідером партії, ви зможете відправляти миттєві повідомлення всім членам партії."
        
                   
	tmp = allElements.children[15].children[0]
	tmp.innerHTML = tmp.innerHTML.replace(/Payments/,"Платежі")
	tmp = allElements.children[15].children[1]
	tmp.innerHTML = tmp.innerHTML.replace(/Duration/,"Термін")
	tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Ціна")
	tmp.innerHTML = tmp.innerHTML.replace(/One Month/,"1 місяць")
    tmp.innerHTML = tmp.innerHTML.replace(/(30 days)/,"30 днів")
        
	tmp = allElements.children[15].children[3]
	tmp.innerHTML="<b>Є два способи зробити оплату::</b><br>"
			+"<ul>"
			+"<li>Купити Преміум-аккаунт на 30 днів разовим платежем</li>"
			+"<li> Замовтити підписку (оплата буде проводитися автоматично кожні 30 днів до відміни, починаючи з сьогоднішнього дня)</li>"
			+"</ul>"
        tmp = allElements.children[15].children[4]
        tmp.innerHTML = tmp.innerHTML.replace(/Single payment/,"Разовий платіж")
        tmp = allElements.children[15].children[11]
        tmp.innerHTML = tmp.innerHTML.replace(/Subscription/,"Підписка")
        tmp = allElements.children[15].children[25]
        tmp.innerHTML = tmp.innerHTML.replace(/Payments will be automatically charged every 30 days (starting today) till you cancel the subscription./,"лоло")
                
        tmp.innerHTML = tmp.innerHTML.replace(/Active subscriptions/,"Підписка")
        tmp.innerHTML = tmp.innerHTML.replace(/Citizen Name*/,"Ваш Нік")
        tmp.innerHTML = tmp.innerHTML.replace(/You can make a payment for your own or your friend's account/,"іаіав")
            tmp.innerHTML = tmp.innerHTML.replace(/Account/,"іаііваав")
                tmp.innerHTML = tmp.innerHTML.replace(/Payment data are updated once per 5 minutes/,"іаіівавававаавіаваав")
                    
        
                     
                
	tmp = allElements.children[17].children[0]
        tmp.innerHTML = tmp.innerHTML.replace(/FAQ/,"Типові питання:")
	tmp = allElements.children[17].children[1]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Чи можна платити за допомогою кредитної картки?"
	tmp = allElements.children[17].children[2]
	tmp.innerHTML="Так - Вам просто потрібно створити PayPal-аккаунт, зв'язати його з вашою кредитною карткою та зробити звичайний платіж за допомогою системи PayPal."
	tmp = allElements.children[17].children[3]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Чи можу я придбати Преміум-аккаунт для мого друга?"
	tmp = allElements.children[17].children[4]
	tmp.innerHTML="Так, ви можете придбати підписку для декількох аккаунтів за допомогою вашого облікового запису. Вам просто потрібно вказати нік Вашого друга, роблячи підписку"
	tmp = allElements.children[17].children[5]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Чи втрачу Преміум-аккаунт, якщо я скасую підписку?"
	tmp = allElements.children[17].children[6]
	tmp.innerHTML="Ні. Скасування підписки означає, що з вашого Paypal рахунку не стягуватимуться кошти автоматично кожні 30 днів. Якщо ви скасуєте підписку, вам всерівно матимете Преміум-аккаунт до закінчення терміну його дії"
	tmp = allElements.children[17].children[7]
	tmp.innerHTML="<img valign=\"middle\" src=\"http://e-sim.home.pl/eworld/img/question.png\">Маю інше питання ..."
	tmp = allElements.children[17].children[8]
	tmp.innerHTML="Ви можете задати його за допомогою  <a href=\"composeMessage.html?id=1\">повідомлення в грі</a> або попросити про це публічно на <a target=\"_blank\" href=\"http://forum.e-sim.org/viewforum.php?f=43\">форумі</a>"
	           
}
//============================================================================
//Party
//============================================================================
	function doParty() {
var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Party)/,"Партія");
    tmp = allElements.children[1];
    tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Членів");
    tmp.innerHTML=tmp.innerHTML.replace(/Leave party/,"Покинути партію");
    tmp.innerHTML=tmp.innerHTML.replace(/Party Leader/,"Лідер партії");



}

//===================================================
//Mu Stats
//===================================================
function doMuStat() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit statistics)/,"Статистика по військовим підрозділам");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/(Previous)/,"Попередні");
	tmp.innerHTML=tmp.innerHTML.replace(/(Next)/,"Наступні");	
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type:)/,"Тип статискики:");
	replaceInputByValue({"Show":["Show","Відобразити"]});
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"No.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Членів");
	tmp.innerHTML=tmp.innerHTML.replace(/(Name)/,"Назва");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank)/,"Ранг");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage)/,"Загальний дамаг");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage today)/,"Дамаг сьогодні");
	tmp.innerHTML=tmp.innerHTML.replace(/(Value)/,"Вартість");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Gold");
	obj = results.snapshotItem(i);
	}
	
	results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
	obj = results.snapshotItem(i);
	 if (obj.innerHTML.match("Total damage")) {
	obj.innerHTML=obj.innerHTML.replace(/(Total damage)/,"Загальний дамаг");
	} else if (obj.innerHTML.match("Damage today")) {
	obj.innerHTML=obj.innerHTML.replace(/(Damage today)/,"Дамаг сьогодні");
	} else if (obj.innerHTML.match("Total members")) {
	obj.innerHTML=obj.innerHTML.replace(/(Total members)/,"Кількість членів");
	} else if (obj.innerHTML.match("Gold value")) {
	obj.innerHTML=obj.innerHTML.replace(/(Gold value)/,"Вартість");
	} 
	}
}

 //===================================================
//Military Unit Members
//===================================================
function doMUMembers() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit members)/,"Бійці військового підрозділу");
	tmp = allElements.children[4];
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Перекази)/,"");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Редагувати");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Змінити національність");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Привілегії");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Гроші");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Пропозиції роботи");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Набір");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"Заявки");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Перегляд логу");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Військовий ранг");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Всього бійців");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Максимум бійців");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Загальний дамаг");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Дамаг сьогодні");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Лідер");
	
	
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Розширити підрозділ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Покращити до");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Gold");
	replaceInputByValue({"Leave military unit":["Leave military unit","Дезертирувати"]});
	
    tmp = allElements.children[6];
	tmp.innerHTML = tmp.innerHTML.replace(/Members/,"Бійці: ");
	tmp.innerHTML = tmp.innerHTML.replace(/Sorting/,"Сортувати");
	tmp.innerHTML = tmp.innerHTML.replace(/Experience/,"Досвід");
    tmp.innerHTML = tmp.innerHTML.replace(/Login/,"Логін");
    tmp.innerHTML = tmp.innerHTML.replace(/Total damage/g,"Загальний дамаг");
    tmp.innerHTML = tmp.innerHTML.replace(/Damage today/g,"Дамаг сьогодні");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Відобразити");
	tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Боєць");
	tmp.innerHTML = tmp.innerHTML.replace(/XP/g,"Очки досвіду");
    tmp.innerHTML = tmp.innerHTML.replace(/Operations/,"Операції");
    tmp.innerHTML = tmp.innerHTML.replace(/Kick/g,"Видалити");
	tmp.innerHTML = tmp.innerHTML.replace(/Previous/,"Попередні");
	tmp.innerHTML = tmp.innerHTML.replace(/Next/,"Наступні");
	tmp.innerHTML = tmp.innerHTML.replace(/%CE%95%CE%BC%CF%80%CE%B5%CE%B9%CF%81%CE%AF%CE%B1/g,"Очки досвіду");
}

//===================================================
//Military Unit Logs
//===================================================
function doMULogs() {
	var allElements;
    allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Military Unit logs/,"Логи");
	tmp = allElements.children[2];
	tmp.innerHTML = tmp.innerHTML.replace(/Back to military unit/,"Поаернутись до МЮ");
	tmp.innerHTML = tmp.innerHTML.replace(/Filter/,"Фільтр");
	tmp.innerHTML = tmp.innerHTML.replace(/View logs/,"Переглянути логи");
    tmp.innerHTML = tmp.innerHTML.replace(/All logs/,"Всі логи");
    tmp.innerHTML = tmp.innerHTML.replace(/Orders changed/,"Накази змінено");
    tmp.innerHTML = tmp.innerHTML.replace(/Company put on sale/,"Компанії на продаж");
    tmp.innerHTML = tmp.innerHTML.replace(/Company donated/,"Трансфери компаній");
    tmp.innerHTML = tmp.innerHTML.replace(/Job market offer added/,"Пропозиції роботи додані");
    tmp.innerHTML = tmp.innerHTML.replace(/Worker fired/,"Працівник звільнений");
    tmp.innerHTML = tmp.innerHTML.replace(/Salary changed/,"з/п змінено");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate received/,"Отримав");
    tmp.innerHTML = tmp.innerHTML.replace(/Donate send/,"Надіслав");
    tmp.innerHTML = tmp.innerHTML.replace(/Application rejected/,"Заявка відхилена");
    tmp.innerHTML = tmp.innerHTML.replace(/Application approved/,"Заявка прийнята");
    tmp.innerHTML = tmp.innerHTML.replace(/Leader changed/,"Зміна Лідера");
    tmp.innerHTML = tmp.innerHTML.replace(/Privilages taken/,"Привілегії надані");
    tmp.innerHTML = tmp.innerHTML.replace(/Privilages given/,"Привілегії надані");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit expanded/,"Підрозділ розширений");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit upgraded/,"Підрозділ покращений");
    tmp.innerHTML = tmp.innerHTML.replace(/Military unit downgraded/,"Підрозділ понижено");
	
	tmp = allElements.children[5];
	tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Час");
	tmp.innerHTML = tmp.innerHTML.replace(/Log/,"Лог");
    tmp.innerHTML = tmp.innerHTML.replace(/Type/,"Тип");
	if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"секунд тому");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"хвилин тому");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"годин тому");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"днів тому");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"місяця тому");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"секунд тому");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"хвилин тому");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"годин тому");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"днів тому");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"місяця тому");
    } 
	tmp.innerHTML=tmp.innerHTML.replace(/the military unit by an additional slot/g,"підрозділ на додатковий слот:");
	tmp.innerHTML=tmp.innerHTML.replace(/given leadership to/g,"передати Лідера");
	tmp.innerHTML=tmp.innerHTML.replace(/Company donated/g,"Компанія надіслана");
	tmp.innerHTML=tmp.innerHTML.replace(/donated/g,"Надіслано");
	tmp.innerHTML=tmp.innerHTML.replace(/ to/g," ");
	tmp.innerHTML=tmp.innerHTML.replace(/Weapon/g,"Зброя");
	tmp.innerHTML=tmp.innerHTML.replace(/House/g,"Будинок");
	tmp.innerHTML=tmp.innerHTML.replace(/Gift/g,"Гіфтів");
	tmp.innerHTML=tmp.innerHTML.replace(/Food/g,"Булок");
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket/g,"Білетів");
	tmp.innerHTML=tmp.innerHTML.replace(/Defense System/g,"Зах. Споруд");
	tmp.innerHTML=tmp.innerHTML.replace(/Hospital/g,"Госпіталей");
	tmp.innerHTML=tmp.innerHTML.replace(/Iron/g,"Заліза");
	tmp.innerHTML=tmp.innerHTML.replace(/Grain/g,"Зерна");
	tmp.innerHTML=tmp.innerHTML.replace(/Oil/g,"Нафти");
	tmp.innerHTML=tmp.innerHTML.replace(/Stone/g,"Каменю");
	tmp.innerHTML=tmp.innerHTML.replace(/Wood/g,"Дерева");
	tmp.innerHTML=tmp.innerHTML.replace(/Diamonds/g,"Діамантів");
	tmp.innerHTML=tmp.innerHTML.replace(/Gold/g,"Gold");
	tmp.innerHTML=tmp.innerHTML.replace(/No Logs/g,"Логи відсутні");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate send/g,"Переказ надіслано");
	tmp.innerHTML=tmp.innerHTML.replace(/Donate received/g,"Переказ прийнято");
	tmp.innerHTML=tmp.innerHTML.replace(/Leader changed/g,"Лідер змінений");
	tmp.innerHTML=tmp.innerHTML.replace(/Job market offer added/g,"Пропозиція роботи додана");
	tmp.innerHTML=tmp.innerHTML.replace(/created job offer for/g,"створити пропозицію для");
	tmp.innerHTML=tmp.innerHTML.replace(/skill and/g,"скіл");
	tmp.innerHTML=tmp.innerHTML.replace(/salary in/g,"з/п");
	tmp.innerHTML=tmp.innerHTML.replace(/company/g,"компанія");
	tmp.innerHTML=tmp.innerHTML.replace(/Orders changed/g,"Наказ змінено");
	tmp.innerHTML=tmp.innerHTML.replace(/has changed order of the military unit/g,"Змінив наказ");
	tmp.innerHTML=tmp.innerHTML.replace(/the military unit/g,"військовий підрозділ");
	tmp.innerHTML=tmp.innerHTML.replace(/Application approved/g,"Заявка відхилена");
	tmp.innerHTML=tmp.innerHTML.replace(/accepted/g,"прийнята");
	tmp.innerHTML=tmp.innerHTML.replace(/application/g,"заявка");
	tmp.innerHTML=tmp.innerHTML.replace(/Worker fired/g,"Працівний звільнений");
	tmp.innerHTML=tmp.innerHTML.replace(/fired/g,"звільзнений");
	tmp.innerHTML=tmp.innerHTML.replace(/from the/g,"з");
	tmp.innerHTML=tmp.innerHTML.replace(/changed/g,"змінено");
	tmp.innerHTML=tmp.innerHTML.replace(/salary/g,"з/п");
	tmp.innerHTML=tmp.innerHTML.replace(/from/g,"з");
	tmp.innerHTML=tmp.innerHTML.replace(/given leadership to/g,"Передати лідера");
	tmp.innerHTML=tmp.innerHTML.replace(/Privilages taken/g,"Привілегії надано");
	tmp.innerHTML=tmp.innerHTML.replace(/taken/g,"надано");
	tmp.innerHTML=tmp.innerHTML.replace(/privilegij/g,"привілегії");
	tmp.innerHTML=tmp.innerHTML.replace(/Manage Companies/g,"Управляти компаніями");
	tmp.innerHTML=tmp.innerHTML.replace(/Warehouse Manager/g,"Завідувач складом");
	tmp.innerHTML=tmp.innerHTML.replace(/Officer/g,"Офіцер");
	tmp.innerHTML=tmp.innerHTML.replace(/Director of personel/g,"Керівник персоналу");
	tmp.innerHTML=tmp.innerHTML.replace(/Privilages given/g,"Привілегії надано");
	tmp.innerHTML=tmp.innerHTML.replace(/given/g,"надано");
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit expanded/g,"Підрозділ розширено");
	tmp.innerHTML=tmp.innerHTML.replace(/spent/g,"відпрацьовано");
	tmp.innerHTML=tmp.innerHTML.replace(/expand/g,"розширити");
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit upgraded/,"Підрозділ покращено");
	tmp.innerHTML=tmp.innerHTML.replace(/upgraded military unit/,"покращено підрозділ");
	tmp.innerHTML=tmp.innerHTML.replace(/for/,"до");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Previous/,"Попередні");
	tmp.innerHTML=tmp.innerHTML.replace(/Next/,"Наступні");
}
//===================================================
//Military Unit
//===================================================
function doMilitaryUnit() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military unit)/,"Військовий підрозділ");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(You are not in any military unit)/,"Ви не маєте військового підрозділу");
	tmp.innerHTML=tmp.innerHTML.replace(/(Join existing one)/,"Долучитись");
	tmp.innerHTML=tmp.innerHTML.replace(/(Create military unit)/,"Створити військовий підрозділ");
   
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(You need to have level)/,"Ви повинні мати рівнеь");
	tmp.innerHTML=tmp.innerHTML.replace(/(to join military unit)/,", для вступу в війстковий підрозділ");
	
	tmp = allElements.children[4];
	for( var i=0; i<2;i++)
	
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit military unit)/,"Редагувати");
	tmp.innerHTML=tmp.innerHTML.replace(/(Change nationality)/,"Змінити національність");
	tmp.innerHTML=tmp.innerHTML.replace(/(Privileges)/,"Привілегії");
	tmp.innerHTML=tmp.innerHTML.replace(/(Money account)/,"Гроші");
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Offers)/,"Пропозиції роботи");
	tmp.innerHTML=tmp.innerHTML.replace(/(Recruitment)/,"Набір");
	tmp.innerHTML=tmp.innerHTML.replace(/(pending applications)/,"заявки");
	tmp.innerHTML=tmp.innerHTML.replace(/(View logs)/,"Перегляд логів");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank)/,"Військовий ранг");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total members)/,"Всього бійців");
	tmp.innerHTML=tmp.innerHTML.replace(/((Max. members))/,"Максимум бійців");
	tmp.innerHTML=tmp.innerHTML.replace(/((Total damage in battles))/,"Загальний дамаг");
	tmp.innerHTML=tmp.innerHTML.replace(/((Damage today))/,"Дамаг сьогодні");
	tmp.innerHTML=tmp.innerHTML.replace(/((Leader))/,"Лідер");
	
	tmp.innerHTML=tmp.innerHTML.replace(/(Expand members limit)/,"Розширити підрозділ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Upgrade to)/,"Покращити до");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Gold");
	replaceInputByValue({"Leave military unit":["Leave military unit","Дезертирувати"]});
	
               
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/(Description)/,"Опис");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Current orders)/,"Поточний наказ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle:)/,"Битва:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Повстання");
	tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Субсидії:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Side:)/,"Сторона:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Briefing:)/,"Засідання:");
	tmp.innerHTML=tmp.innerHTML.replace(/(visible for members only)/,"видно тільки для бійців");
	tmp.innerHTML=tmp.innerHTML.replace(/Set orders/,"Встановити наказ");
	
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	replaceAlliesLinksss();
	
	//for( var i=0; i<2;i++){
	//tmp.innerHTML=tmp.innerHTML.replace(/(: none)/,": nra");
	//tmp.innerHTML=tmp.innerHTML.replace(/(no allies)/,"be sj.");
	//	}
	
	tmp.innerHTML=tmp.innerHTML.replace(/(battle won by)/,"Битва виграна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Edit)/,"Редагувати");
	tmp.innerHTML=tmp.innerHTML.replace(/(orders)/,"накази");
	tmp.innerHTML=tmp.innerHTML.replace(/(Set today's battle)/,"Встановити битву");
	tmp.innerHTML=tmp.innerHTML.replace(/(No battles at this moment)/,"Битви відсутні");
	
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Members)/,"Бійці");
	tmp.innerHTML=tmp.innerHTML.replace(/(View)/,"Перегляд");
	tmp.innerHTML=tmp.innerHTML.replace(/(manage members)/,"управління бійцями");
	tmp.innerHTML=tmp.innerHTML.replace(/(Companies)/,"Компанії");
	tmp.innerHTML=tmp.innerHTML.replace(/(No companies)/,"Компанії відсутні");
	tmp.innerHTML=tmp.innerHTML.replace(/(See all companies)/,"Переглянути компанії");

	replaceLinkByHref({
        "http://wiki.e-sim.org/index.php/Military_unit":["Military units tutorial","Довідник: Військовий підрозділ"]
	});
}

//===================================================
//Stock Stats
//===================================================
function doStockStats() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top stock companies)/,"Акціонерні товариства");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistic type)/,"Тип статистики");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Show)/,"Відобразити");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total stocks)/,"Всього акцій");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total value)/,"Загальна вартість");
	tmp.innerHTML=tmp.innerHTML.replace(/(Daily stock trade volume)/,"Щоденний обсяг торгівлі акціями");

	var results;
	results = getElements(document, "//table[@class='dataTable']");
	for (var i = 0; i < results.snapshotLength; i++) {
	tmp = results.snapshotItem(i);
	tmp.innerHTML=tmp.innerHTML.replace(/(No.)/,"No.");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock Company)/,"Акціонерне товариство");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock company)/g,"Akcin bendrov");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Країна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total value)/,"Загальна вартість");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total stocks)/,"Всього акцій");
	tmp.innerHTML=tmp.innerHTML.replace(/(Daily stock trade volume)/,"Щоденний обсяг торгівлі акціями");
	tmp.innerHTML=tmp.innerHTML.replace(/(Gold)/g,"Gold");
	obj = results.snapshotItem(i);
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
} else if (isTargetHtml("/subscription.html")) {
	doPremium();
}
else if (isTargetHtml("/myShares.html")) {
	doShares();
    }
else if (isTargetHtml("/myParty.html")) {
	doParty();
    }
else if (isTargetHtml("/countryStatistics.html")) {
	doCountryStat();
    }
else if (isTargetHtml("/partyStatistics.html")) {
	doPartyStat();
    }
else if (isTargetHtml("/newspaperStatistics.html")) {
	doNewsStat();
    }

else if (isTargetHtml("/militaryUnitStatistics.html")) {
	doMuStat();
}
 else if (isTargetHtml("/militaryUnitMembers.html")) {
	doMUMembers();
}

 else if (isTargetHtml("/militaryUnitLogs.html")) {
	doMULogs();
}
else if (isTargetHtml("/myMilitaryUnit.html")) {
	doMilitaryUnit();
} else if (isTargetHtml("/militaryUnit.html")) {
	doMilitaryUnit();}
else if (isTargetHtml("/stockCompanyStatistics.html")) {
	doStockStats();}





