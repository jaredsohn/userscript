// ==UserScript==
// @name       e-sim UA
// @namespace  олол
// @version    0.982
// @description  перевод игры на русский
// @include        http://e-sim.org/*
// @copyright  Powered by DeathEater/remaded by WebdaemoN	
// ==/UserScript==
//Russian translation by WebdademoN. Поередньому перекладачу - двійка з української


menuLinkReplacements = {
	"work.html"				:["Work","Работа"],
	"train.html"			:["Train","Тренировка"],
	"companies.html"		:["Companies","Мои предприятия"],
	"newspaper.html"		:["Newspaper","Моя газета"],
	"myParty.html"			:["Party","Политическая партия"],
	"contracts.html"		:["Contracts","Контракты"],
	"inviteFriends.html"	:["Invite friends","Пригласить друзей"],
	"myMilitaryUnit.html"	:["Military unit","Воинское подразделение"],
	"subscription.html"     :["Premium account","Премиум-аккаунт"],
	
	"productMarket.html"	:["Product market","Товарный рынок"],
	"jobMarket.html"		:["Job market","Биржа труда"],
	"monetaryMarket.html"	:["Monetary market","Валютный рынок"],
	"companiesForSale.html"	:["Companies for sale","Компании на продажу"],
	
	"countryStatistics.html"		:["Country statistics","По странам"],
	"partyStatistics.html"			:["Party statistics","По партиям"],
	"newspaperStatistics.html"		:["Newspaper statistics","По газетам"],
	"citizenStatistics.html"		:["Citizen statistics","По гражданам"],
	"militaryUnitStatistics.html"	:["Military unit stats","По воинск. подразд."],
    "donations.html"	            :["Donations","Помощь проекту"],
    "fundRaising.html?id=4"         :["New modules","Новые игровые молдули"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Лучшие статьи"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Новые статьи"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Военные события"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Политические события"],
	
	"battles.html"							:["Battles","Битвы"],
	"countryPoliticalStatistics.html"		:["War and politics","Война и политика"],
	"countryEconomyStatistics.html"			:["Economy","Экономика"],
	"countryLaws.html"						:["Laws","Законы"],
	"partyElections.html"					:["Party elections","Выборы главы партии"],
	"congressElections.html"				:["Congress elections","Выборы в конгресс"],
	"presidentalElections.html"				:["Presidential elections","Выборы президента"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Гражданство"],
	"googleMap.html"						:["Map","Карта"]
};


menuTextReplacements = {
	"myPlacesButton":["My places","Мои места"],
	"marketButton":["Market","Рынок"],
	"statisticsButton":["Statistics","Статистика"],
	"newsButton":["News","Новости"],
	"electionsButton":["Country","Страна"]
};


sideLink1Replacements = {
	"crossIcon"	:["Logout","Выход"],
	"workIcon"	:["Work","Работа"],
	"fightIcon"	:["Fight","Воевать"],
	"avatarIcon":["Upload avatar","Загрузить аватар"],
	"voteIcon"	:["Vote","Голосувать"]
};

sideLink2Replacements = {
	"travel.html"	:["Travel","Путешествовать"],
	"pendingCitizenshipApplications.html"	:["change","Сменить"],
	"http://wiki.e-sim.org/index.php/Health"	:["Health tutorial","Справочник: Здоровье"]
};

sideLink3Replacements = {
	"eatLink"	:["Eat food","Съесть еду"],
	"useGiftLink":["Use gifts","Использовать подарок"]
};

sideLink4Replacements = {
	"eatButton":["Eat Food","Съесть еду"],
	"useGiftButton":["Use gift","Использовать подарок"] 
};


hpTitleReplacements = {
	"News":["News","Новости"],
	"Shouts":["Shouts","Шауты"],
	"Battles":["Battles","Битвы"],
	"Events":["Events","События"],
};


hpTabsReplacements = {
	"#topArticles":["Global","Мировые"],
	"#latestArticles":["Latest","Последние"],
	"#localArticles":["Local","Местные"],
	
	"#countryShouts":["Country","Страна"],
	"#friendsShouts":["Military unit","Подразделение"],
	"#myShouts":["Friends","Друзья"],
	
	"#localBattles":["Country","Страна"],
	"#substidedBattles":["Subsidized","Оплачиваемые"],
	"#hotBattles":["Important","Важные"],

	"#localEvents":["Military","В стране"],
	"#globalEvents":["Military","В мире"],
	"#politicalEvents":["Political","Политические"]
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Справочник: Валютный рынок"]
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
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Восстание");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"Субсидии:");
	}
}

function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"без союзников");
	//12 allies
	if (obj.innerHTML.match("1 ally")) {
	    obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"1 союзник");
    } else {
        obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 союзников");
    }
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"Восстание");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"Субсидии:");
}

//Test, other ways possible
function replaceBattleTime(obj) {
    if (obj.innerHTML.match(/[\d\.]+/g)== 1) {
        if (obj.innerHTML.match("second ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) second ago/g,"секунду назад");
        } 
        if (obj.innerHTML.match("minute ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minute ago/g,"минуту назад");
        }  
        if (obj.innerHTML.match("hour ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hour ago/g,"часов назад");
        }  
        if (obj.innerHTML.match("day ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) day ago/g,"вчора");
        }  
        if (obj.innerHTML.match("month ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) month ago/g,"месяц назад");
        }
    } else { 
        if (obj.innerHTML.match("seconds ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) seconds ago/g,"$1 секунд назад");
        }  
        if (obj.innerHTML.match("minutes ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) minutes ago/g,"$1 минут назад");
        }  
        if (obj.innerHTML.match("hours ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) hours ago/g,"$1 часов назад");
        }  
        if (obj.innerHTML.match("days ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) days ago/g,"$1 дней назад");
        }  
        if (obj.innerHTML.match("months ago")) {
            obj.innerHTML = obj.innerHTML.replace(/(\d*) months ago/g,"$1 месяцев назад");
        }
    }
}
//---------------------------------------------------
//Top, Latest, Local Art
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) second ago by/g,"секунду назад");
    } 
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minute ago by/g,"минуту назад");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hour ago by/g,"часов назад");
    }  
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) day ago by/g,"вчера");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) month ago by/g,"месяц назад");
    }
 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) seconds ago by/g,"$2 секунд назад");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) minutes ago by/g,"$2 минут назад");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) hours ago by/g,"$2 часов назад");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) days ago by/g,"$2 дней назад");
    }  
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*) months ago by/g,"$2 месяцев назад");
    }   
}

//---------------------------------------------------
//Subs 
//---------------------------------------------------
function replacNewspaperTime(obj) {
    if (obj.innerHTML.match("second ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( second ago)/g,"секунду назад");
    }  
    if (obj.innerHTML.match("minute ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minute ago)/g,"минуту назад");
    }  
    if (obj.innerHTML.match("hour ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hour ago)/g,"час назад");
    } 
    if (obj.innerHTML.match("day ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( day ago)/g,"вчера");
    }  
    if (obj.innerHTML.match("month ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( month ago)/g,"месяц назад");
    } 
    if (obj.innerHTML.match("seconds ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( seconds ago)/g,"$2 секунд назад");
    }  
    if (obj.innerHTML.match("minutes ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( minutes ago)/g,"$2 минут назад");
    }  
    if (obj.innerHTML.match("hours ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( hours ago)/g,"$2 часов назад");
    }  
    if (obj.innerHTML.match("days ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( days ago)/g,"$2 дней назад");
    } 
    if (obj.innerHTML.match("months ago")) {
        obj.innerHTML = obj.innerHTML.replace(/(Posted )(\d*)( months ago)/g,"$2 месяцев назад");
    }
    
}


//---------------------------------------------------
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"Недавние");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"защитники:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"атакующие:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"Статистика текущего раунда");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"Общий урон защитниками:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"Общий урон атакующими:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"Ваш дамаг:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"Лучшие страны в обороне:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"Лучшие страны в атаке:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"Лучшие воинские подразделения в обороне:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"Лучшие воинские подразделения в атаке:");
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
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"секунду назад");
		    } else if (obj.innerHTML.match("minute")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"минуту назад");
		    } else if (obj.innerHTML.match("hour")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"часову назад");
		    } else if (obj.innerHTML.match("day")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"вчора");
		    } else if (obj.innerHTML.match("month")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"месяц назад");
		    } 
	    } else {
            if (obj.innerHTML.match("seconds")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"$2 секунд назад");
            } else if (obj.innerHTML.match("minutes")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"$2 минут назад");
	        } else if (obj.innerHTML.match("hours")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"$2 часов назад");
	        } else if (obj.innerHTML.match("days")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"$2 дней");
	        } else if (obj.innerHTML.match("months")) {
			    obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"$2 месяцев назад");
                } 
        }
    }
}
	    
replaceLinkByHrefSSS("#", {
    "Report":["Report","Жалоба"],
    "Delete":["Delete","Удалить"],
    "Edit":["Edit","Редактировать"],
    "More shouts":["More shouts","Предыдущие сообщения"]
});
	
	
replaceInputByValue({
    "Report":["Report","Пожаловаться"],
    "Delete":["Delete","Удалить"],
    "Edit":["Edit","Редактировать"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"Уровень: ");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"Звание:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"Шкала звания:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"Экономический уровень: – ");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"Сила: – ");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"Регион:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"Гражданство:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"Лимит булок:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"Лимит подарков:");


	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"Деньги");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"Склад");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"Ваши сообщения");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"Ваши задания на сегодня");
	
	
	replaceLinkByHref(sideLink2Replacements);
	
	replaceLinkByID(sideLink3Replacements);
	
	replaceInputByID(sideLink4Replacements);
	
	replaceSpanByClass(sideLink1Replacements);
	

		results = getElements(document, "//option[@value]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"Текущий раунд");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"Раунд $2 ");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"Тип булок");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"Тип подарков");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"Без оружия..... (");
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
			obj.innerHTML=obj.innerHTML.replace(/(Show round\()/,"Бей");
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
		"Show more battles":["Show more battles","Показать больше битв"],
		"Subsidies informations":["Subsidies informations","Справочник: Субсидии"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"Нет субсидироованых битв");
        }	
    }
	
	
	allElements = document.getElementById('contentRow').children[2].children[0];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders: )/,"Ваши воинские приказы:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"Бить за:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);	
        if (allElements.innerHTML.match("1 minute ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minute ago)/g,"минуту назад");
        }  
        if (allElements.innerHTML.match("1 hour ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hour ago)/g,"час назад");
        }  
        if (allElements.innerHTML.match("1 day ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( day ago)/g,"вчера");
        }  
        if (allElements.innerHTML.match("1 month ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( month ago)/g,"месяц назад");
        } 
        
        if (allElements.innerHTML.match("[^1] minutes ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( minutes ago)/g,"$1 минут назад");
        } 
        if (allElements.innerHTML.match("[^1] hours ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( hours ago)/g,"$1 часов назад");
        }  
        if (allElements.innerHTML.match("[^1] days ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( days ago)/g,"$1 дней назад");
        }  
        if (allElements.innerHTML.match("[^1] months ago")) {
            allElements.innerHTML = allElements.innerHTML.replace(/(\d*)( months ago)/g,"$1 месяцев назад");
        }
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z- ]*)( in the battle versus )/g,"защитила $2,в битве против ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"Граждане $2 начали восстание в $4 $5 ");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"поддалась атаке $2$3");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"Президент $2$3 предлагает начать войну с $5$6 ");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g," объявила войну $2$3 ");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," завоевала $2, у битве против ");
		allElements.innerHTML=allElements.innerHTML.replace(/(has new president)/g," має нового президента");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","??????"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"Показать больше проишествий");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"Написать новое сообщение:");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="Отправить!";
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Послать в каналы:");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"Послать в каналы:");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/," Страна | $2  Воинское подразделение | $4 Друзья");

	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","Больше сообщений"] });
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"Биржа труда");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"Критери вибора:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"Страна:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"Экономический навык:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Работодатель");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"Компания");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Фирма");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"Мин. навык");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"Зарплата");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"Устроиться");
	
	replaceInputByValue({"Apply":["Apply","Влаштуватись"],"Show":["Show","Показать"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"Работа");
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"Не трудоустроен");
		replaceInputByValue({"Get a job now!":["Get a job now!","Найти работу!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"Вы должны находиться в стране, где расположена компания для того, чтобы работать");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"Место работи:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"Работодатель");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"Зарплата:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"Увольться");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"Вы не работали сегодня");
			replaceInputByValue({"Work now":["Work now","Працювати зараз"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"Результаты труда сегодня:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"Валовый доход:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"Чистая прибыль:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"Налог:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"Работали в:");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained: )/,"Очков опыта(XP) получено:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"Получено экономического навыка:");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"Отработано дней подряд: ");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"Базовая производительность");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"Модификаторы производительности");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"Результирующая производительность");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"Единиц продукта произведено");
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"Уровень компании");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","Все"],
		"2":["Iron","Железо"],
		"3":["Grain","Зерно"],
		"4":["Oil","Нефть"],
		"5":["Stone","Камень"],
		"6":["Wood","Дерево"],
		"7":["Diam.","Алмазы"],
		"8":["Weap.","Оружие"],
		"9":["House","Дом"],
		"10":["Gift","Подарки"],
		"11":["Food","Хлеб"],
		"12":["Ticket","Билеты"],
		"13":["DS","Защитные сооружения"],
		"14":["Hosp.","Госпиталя"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"Рынок");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","Предложения:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","Страна:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","Качество:");
	
	replaceInputByValue({"View offers":["View offers","Предложения"],"Buy":["Buy","Купить"]});
	
	results = getElements(document, "//label[@for]");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		
		if (obj.htmlFor.match("resource")) {
			idx = obj.htmlFor.substring(8,obj.htmlFor.length);
			obj.innerHTML = obj.innerHTML.replace(rr[idx][0], rr[idx][1]);
		}
	}
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","Мои предложения / Добавить предложение"]});
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"Продукт");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"Продавец");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"На складе");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"Цена");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"Купить");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," шт. "); 
// check	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","Мои предложения / Добавить предложения"],
		"http://wiki.e-sim.org/index.php/Category:Products":["Products info","Справочник: Продукция"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"Военная подготовка");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","Trenuj"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"Тренировка окончена, возвращайтесь завтра");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"Вы уже тренировались сегодня");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"Вы уже тренировались сегодня, возвращайтесь завтра");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"Силы приобретено:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"Детальнее:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"Всего тренировок:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"Сила:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"Воинское званние:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"Суммарний нанесенный урон:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"Урон без оружия:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"Урон с оружием Q1:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"Урон с оружием Q2:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"Урон с оружием Q3:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"Урон с оружием Q4:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"Урон с оружием Q5:");
	
}

//===========================================================================
//Battles List 
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"Битвы");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"Страна");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"Сортировка:");
    tmp.innerHTML=tmp.innerHTML.replace(/(All countries)/,"Все страны");
    tmp.innerHTML=tmp.innerHTML.replace(/(Sorting by start time)/,"Показать по времени начала");
     tmp.innerHTML=tmp.innerHTML.replace(/(Sorting by subsidy size)/,"Показать по оплате боев");
     tmp.innerHTML=tmp.innerHTML.replace(/(Sorting by total damage)/,"Показать по общему урону");
    
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"Только субсидированные битвы:");
	
	replaceInputByValue({"Show battles":["Show battles","Показать битвы"]});
  
	
    tmp = allElements.children[4].children[0].children[0];
    var loopz = tmp.children.length;
    for (i = 1; i < loopz; i++) {
        obj = tmp.children[i].children[3];
        replaceBattleTime(obj);
    }
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"Начало битвы");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"Битва");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"обороняющийся vs атакующий");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"Счет");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"Урона нанесено всего:");
	
	

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
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"Восстание");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"начато");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Раунд $2");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Раундов взято обороняющимися");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Раундов взято атакующими");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	// Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"Лучшие защитники");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"Лучшие атакующие");
   
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Вы не можете воевать в этой битвы из места вашего текущего расположения.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"Вы должны перелететь в стану-оккупант, чтобы принять участие в битве.");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"Вы не можете воевать в этой битвы из места вашего текущего расположения.");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"Вы должны перелететь в одну из воюющих стран, чтобы принять участие в битве.");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"В этом раунде победа за:");
	} else {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"Выбрать оружие:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"Выбрать сторону:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"Вы воюете за:");
	}
	
	
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"Показать раунд:");
	}
	replaceInputByValue({"Show round":["Show round","Показать"]});
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"Показать общую статистику битвы");
    tmp.innerHTML=tmp.innerHTML.replace(/(Show military units supporting this battle)/,"ВП, выставившие приказ бить в этой битве");
  	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"Справочник: Битвы");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"Правила битвы");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"начат");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"Раунд $2 ");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"Раундов выиграно обороняющимися");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"Раундов выиграно атакующими");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"вернуться к битве");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"Статистика формируется каждые 30 минут");
	tmp.innerHTML=tmp.innerHTML.replace(/Battle statistics/,"Статистика битвы:");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"Гражданин ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"Онлайн");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"Оффлайн");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","Редактировать профиль"]
	});
	replaceLinkByHrefSSS("changeName.html", {
		"Change name":["Change name","Сменить имя"]
	});
    replaceLinkByHrefSSS("transactionLog.html", {
		"Transactions log":["Transactions log","Логи"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","Пожаловаться на мульта"]
	});
	replaceInputByValue({"Report multi":["Report multi","Пожаловаться на мульта"]});

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match("Permanently")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"Забанен навсегда");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"Причина:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"Забаненый :");
	}
	

	tmp = allElements.children[0].children[2+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"Уровень:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"Очки опыта:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"Урон:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"Звание:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"Экон. навык:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"Сила:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"Регион:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"Гражданство:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"День рожнеия:");
	
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by XP:/,"Нац. ранг по XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/National rank by damage:/,"Нац. ранг по урону:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by XP:/,"Мировой ранг по XP:");
	tmp.innerHTML=tmp.innerHTML.replace(/Global rank by damage:/,"Мировой ранг по дамагу:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"Воинское подразделение:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"Партия:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"Газета:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"Работаете на:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"Собственные компании");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"Политическая должность:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"Без воинского подразделения");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"Безпартийный");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"Нет газеты");
	tmp.innerHTML=tmp.innerHTML.replace(/No work/,"Нет работи");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"Нет компаний");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"Без политической должности");
	
	allElements = getElements(document, "//ul[@style]");
	
	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
			rowoffset = 2;
			
            tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"Активные долги");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"день возврата");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g," $1");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"Друзья");
	
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
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"Новый пароль:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"Повторите новый пароль:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"Старый пароль:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Новый аватар:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","макс. размер:");
	
    allElements = document.getElementsByTagName('TD');
    tmp = allElements[19];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen/,"Граждане");
	replaceInputByValue({"Edit citizen":["Edit citizen","Редактировать гражданина"]});
}



//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"Путешествие");
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"Страна");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"Регион:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"Уровень билета:");
	
	replaceInputByValue({"Travel":["Travel","Путешествие"]});
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Traveling":["Traveling tutorial on wiki","Справочник: Путешествия"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"Сообщение от: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Sent messages/,"Отправленные сообщения: ");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"Автор");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"Сообщение");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"Дата");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"Флаг");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"к");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","Отправленные сообщения"],
		"composeMessage.html":["Compose message","Написать"]
	});
	replaceInputByValue({
		"Delete":["Delete","Usu\u0144"],
		"Quick reply":["Quick reply","Быстрый ответ"],
		"Report":["Report","Жалоба"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Жалоба"],
		"Quick reply":["Quick reply","Быстрый ответ"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","Ответить"],
		"conversation.html":["Previous messages","Более ранние сообщения"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Входящие сообщения"],
		"composeMessage.html":["Compose Message","Написать"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"Новое сообщение");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","Входящие сообщения"],
		"sentMessages.html":["Sent messages","Послать"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"Получатель:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"Заголовок:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Сообщение:");
	
	replaceInputByValue({
		"Send":["Send","Послать"],
		"Preview":["Preview","Предварительный просмотр"]
	});
}


//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"Подписки");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"Подписки");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","Список подписок"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"Подписки на газети");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"Количество подписок");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"Газета");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"Время подписки");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Справочник: Газета"]
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
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"Последние статьи");
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Редактировать газету"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Справочник: Газета"]
	});
	replaceInputByValue({
		"Publish":["Publish","Опубликовать"],
		"Preview":["Preview","Предпросмотр"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"Написать новую статью");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"Опубликовать в стране");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Назва статьи:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Сообщение:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"Пожалуйста, сохраните копию вашей статьи на компьютере перед публикацией!!!");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"Название газеты:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"Новый аватар:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","макс. размер:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Редактировать газету"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","Редактировать газету"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"Статья");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","Редактировать статью"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Редактировать газету"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","Жалоба"],
		"Edit":["Edit","Редактировать"],
		"Delete":["Delete","Удалить"]
	});
	replaceInputByValue({
		"Publish":["Publish","Опубликовать"],
		"Report":["Report","Жалоба"],
		"Edit":["Edit","Редактировать"],
		"Delete":["Delete","Удалить"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"Новый комментарий");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Сообщение:");
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
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"Редактировать статью");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"Название статьи:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"Сообщение:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","Редактировать газету"],
		"http://wiki.e-sim.org/index.php/Newspaper":["Newspaper tutorial on wiki","Справочник: Газета"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","Редактировать статью"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Контракты");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"Шаблоны");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","Предложенные контракты (20 последних)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"предложен ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Нет контрактов");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","Принятые контракты (20 последних)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"предложен ");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Нет контрактов");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","Отклоненные контракты");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"Отклонено $1");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Нет контрактов");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","Неудачные контракты");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"Нет контрактов");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","Ваши активные кредиты");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","Кредитор");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Дата возврата");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Сумма");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","Отменить долг");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","Нет долгов");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","Ваши активные дебеты");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","Дебитор");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","Дата возврата");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","Сумма");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","Оплатить долг");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","Нет долгов");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","Название шаблона:");
	

	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","Справочник: Контракты"],
		"#":["Create new template","Создать новый шаблон"]
	});
	replaceInputByValue({
		"Delete":["Delete","Удалить"],
		"Create template":["Create template","Создать шаблон"]
	});
	
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"обязательства $1");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations/,"обязательства подставного гражданина");
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/,"Подставной гражданин");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/([\w ]*)obligations/,"обязательства $1");
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products/," немедленно пожертвовать следующие продукты");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money/," немедленно пожертвовать такую сумму");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt/," будет предъявлено обвинение в невыплате долга");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"должны быть оплачены $1$3$5 день игри ($6 дней с момента подписания контракта "
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"Контракты");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"Контракт");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"Статус контракта: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"Прийнятий");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"Отклонен $1 ");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"Сорван");
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"Добавить новый элемент контракта");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"Сторона");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"Тип элемента");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"Другая сторона");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","Гроші"],
			"Product":["Product","Продукт"],
			"Debt":["Debt","Борг"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Деньги в  ( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"Штук:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"Тип продукта:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Уровень продукта:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","Железо"],
			"Grain":["Grain","Зерно"],
			"Oil":["Oil","Нефть"],
			"Stone":["Stone","Камень"],
			"Wood":["Wood","Дерево"],
			"Diamonds":["Diamonds","Алмазы"],
			"Weapon":["Weapon","Оружие"],
			"House":["House","Дом"],
			"Gift":["Gift","Подарки"],
			"Food":["Food","Булки"],
			"Ticket":["Ticket","Билет"],
			"Defense System":["Defense System","Оборонительное сооружение"],
			"Hospital":["Hospital","Госпиталь"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"Долг");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"Деньги в ( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"Дата оплаты:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"Уровень продукта:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"Предложить контракт");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"Предложить для");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"Пометка:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"Можно предлагать контракты только своим друзьям");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","Подставной гражданин"],
		"contracts.html":["Go back to contract list","Вернуться к списку контрактов"]
	});
	replaceInputByValue({
		"Delete":["Delete","Удалить"],
		"Propose":["Propose","Предложить"],
		"Add item":["Add item","Добавить"]
	});
	//cancel contract
	check = getElements(document, "//b[@class='biggerFont']");
    check = check.snapshotItem(1);
	if (check.innerHTML.match("Cancel proposal")) {
	    check.innerHTML = check.innerHTML.replace(/Cancel proposal/,"Отмена предложения");
	    replaceInputByValue({"Cancel proposition":["Cancel proposition","Отменить предложение"]});
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
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary Market/,"Валютный рынок");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Current offers/,"Актуальные предложения");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Show Offers/,"Показать предложения");
    
    allElements = results.snapshotItem(0).children[4];
    tmp = allElements.children[2];
    
        tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Поменять местами");
    tmp = allElements.children[0];
    
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency:/,"Купить валюту");
    tmp.innerHTML = tmp.innerHTML.replace(/Sell currency:/,"Продать валюту");
    tmp.innerHTML = tmp.innerHTML.replace(/View offers/,"Просмотреть предложения");
    
    allElements = results.snapshotItem(0).children[7];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Monetary market tutorial/,"Справочник: Валютный рынок");
    
    results = getElements(document, "//table[@class='dataTable']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Продавец");
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Количество");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Соотношение");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy/,"Купить");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Amount/,"Количество");
    tmp.innerHTML = tmp.innerHTML.replace(/Ratio/,"Соотношение"); 
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Удалить");
    
    allElements = results.snapshotItem(1).children[0];
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/No offers/,"Нет предложений");  
    
    results = getElements(document, "//TD[@style='border-left: 2px dashed #aaa']");
    
    allElements = results.snapshotItem(0).children[2];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers/,"Ваши предложения") ;
    
    allElements = results.snapshotItem(0).children[5];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Post your Offer/,"Разместить предложение");
    
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/Swap currencies/,"Поменять местами");
    
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Offered currency/,"Предложенные валюты");
    tmp.innerHTML = tmp.innerHTML.replace(/Buy currency/,"Купить валюту");
    tmp.innerHTML = tmp.innerHTML.replace(/Exchange rate/,"Курс обмена");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Разместить новое предложение");
    tmp.innerHTML = tmp.innerHTML.replace(/Offer/,"Предложение");
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
    
    tmp.innerHTML = tmp.innerHTML.replace(/Marketplace/,"Рынок");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offers/,"Разместить новые предложения");
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Страна");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Продукт");
    tmp.innerHTML = tmp.innerHTML.replace(/Quantity/,"Количество");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Цена");
    tmp.innerHTML = tmp.innerHTML.replace(/Post new offer/,"Разместить новое предложение");
    tmp.innerHTML = tmp.innerHTML.replace(/Show market offers/,"Показать рыночные предложения");
    tmp.innerHTML = tmp.innerHTML.replace(/Your storage/,"Ваш склад");
    
    results = getElements(document, "//h3[@style='text-align: center']");
    allElements = results.snapshotItem(0);
    tmp = allElements;
    tmp.innerHTML = tmp.innerHTML.replace(/Your offers on market/,"Ваши предложения на ринке");
    
    results = getElements(document, "//table[@style='width: 680px; margin-left: auto; margin-right: auto;']");
    allElements = results.snapshotItem(0).children[0];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Продукт");
    tmp.innerHTML = tmp.innerHTML.replace(/Seller/,"Продавец");
    tmp.innerHTML = tmp.innerHTML.replace(/Stock/,"Запас");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Цена");
    tmp.innerHTML = tmp.innerHTML.replace(/Gross/,"Брутто");
    tmp.innerHTML = tmp.innerHTML.replace(/Price/,"Цена");
    tmp.innerHTML = tmp.innerHTML.replace(/Net/,"Нетто");
    tmp.innerHTML = tmp.innerHTML.replace(/Import tax/,"Налог на импорт");
    tmp.innerHTML = tmp.innerHTML.replace(/Delete/,"Удалить");
    
}
// NEW
function doCompany() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Companies/,"Компании");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Company/,"Компания");
    tmp.innerHTML = tmp.innerHTML.replace(/Product/,"Продукт");
    tmp.innerHTML = tmp.innerHTML.replace(/Location/,"Регион");
    tmp.innerHTML = tmp.innerHTML.replace(/Employees/,"Работники");
    tmp = allElements.children[3];
    tmp.innerHTML = tmp.innerHTML.replace(/Create new company/,"Создать новую компанию");
    tmp.innerHTML = tmp.innerHTML.replace(/Company name/,"Название компании");
    tmp.innerHTML = tmp.innerHTML.replace(/Product type/,"Тип продукта");
    tmp.innerHTML = tmp.innerHTML.replace(/Company avatar/,"Аватар компании");
    tmp.innerHTML = tmp.innerHTML.replace(/Create company/,"Создать компанию");
    tmp.innerHTML = tmp.innerHTML.replace(/Creating company costs/,"Создание компании стоит");
    tmp.innerHTML = tmp.innerHTML.replace(/The company will be created in your current location - region /,"Компания будет создана в текущем местоположении - регионе");
    tmp.innerHTML = tmp.innerHTML.replace(/To browse regions with resources/,"Просмотр областей с ресурсами");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Company tutorial on wiki/,"Справочник: Компании");
}
    
    
function doPoliticalStats() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Country Politics/,"Политика страны");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Select country/,"Выбрать страну");
    tmp = allElements.children[2];
    tmp.innerHTML = tmp.innerHTML.replace(/President/,"Президент");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/view elections/,"просмор выборов");
    replaceLinkByHref({"http://wiki.e-sim.org/en/President":["President","Президент"]});
    tmp = allElements.children[9];
    tmp.innerHTML = tmp.innerHTML.replace(/Congress/,"Конгресс");
    replaceLinkByHref({"http://wiki.e-sim.org/en/Congress":["Congress","Конгресс"]});
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Wars/,"Войны");
    tmp = allElements.children[21];
    tmp.innerHTML = tmp.innerHTML.replace(/War/,"Война");
    tmp.innerHTML = tmp.innerHTML.replace(/Details/,"Детали");
    tmp.innerHTML = tmp.innerHTML.replace(/No wars/,"нет войн");
    tmp = allElements.children[22];
    tmp.innerHTML = tmp.innerHTML.replace(/War rules/,"Правила войн");
    tmp = allElements.children[23];
    tmp.innerHTML = tmp.innerHTML.replace(/Alliances/,"Союзники");
    tmp = allElements.children[27];
    tmp.innerHTML = tmp.innerHTML.replace(/Country/,"Страна");
    tmp.innerHTML = tmp.innerHTML.replace(/Expires/,"Заканчивается"); 
    tmp = allElements.children[27].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[27].children[0].children[k].children[1];
    
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second)/g,"секунду ");
	        } else if (tmp.innerHTML.match("minute")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute)/g,"минуту ");
            } else if (tmp.innerHTML.match("hour")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour)/g,"час ");
	        } else if (tmp.innerHTML.match("day")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day)/g,"день ");
            } else if (tmp.innerHTML.match("month")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month)/g,"месяц ");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds)/g,"$1 секунд ");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes)/g,"$1 минут ");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours)/g,"$1 часов ");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days)/g,"$1 дней ");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months)/g,"$1 месяцев ");
            } 
        }
    }
    
    replaceLinkByHref({"http://wiki.e-sim.org/en/Alliances":["Alliances","Союзники"]});
    
} 

function doInviteFriends() {
    allElements = document.getElementById('contentRow').children[1];
    tmp = allElements.children[0];
    tmp.innerHTML = tmp.innerHTML.replace(/Invite friends/,"Пригласить друзей");
    tmp = allElements.children[1];
    tmp.innerHTML = tmp.innerHTML.replace(/Your referrers link/,"Ваша реферальная ссылка");
    tmp.innerHTML = tmp.innerHTML.replace(/Send this link to other people to get additional/,"Пошлите эту ссылку, чтобы дополнительно получить");
    tmp.innerHTML = tmp.innerHTML.replace(/You earn/,"Вы заработали");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for each citizen, who register/,"Золото за каждого зарегистрировавшегося гражданина");
    tmp.innerHTML = tmp.innerHTML.replace(/and earn level 7/,"и достиг 7 уровня");
    tmp.innerHTML = tmp.innerHTML.replace(/after clicking this link/,"по этой ссылке");
    tmp.innerHTML = tmp.innerHTML.replace(/and another/,"а также");
    
    tmp.innerHTML = tmp.innerHTML.replace(/Gold when he\/she get his\/her/,"Золота, которое он\она получит");
    tmp.innerHTML = tmp.innerHTML.replace(/first medal/,"первую медаль");
    tmp.innerHTML = tmp.innerHTML.replace(/Additionally you get/,"Дополнительно получите");
    tmp.innerHTML = tmp.innerHTML.replace(/10% of gold received by player from medals and level ups/,"10% золота от полученного игроком за медали и уровни");
    tmp.innerHTML = tmp.innerHTML.replace(/Note, that your friends will also receive additional/,"Обратите внимание, что ваши друзья тоже получат дополнительно");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold for registering from your invitation when he reach level 7/,"Золота за регистрацию по вашему приглашению, по достижению 7го уровня");
    tmp = allElements.children[4];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens you invited/,"Приглашенные граждане");
    tmp = allElements.children[5];
    tmp.innerHTML = tmp.innerHTML.replace(/Sorting type/,"Сортировать по");
    tmp.innerHTML = tmp.innerHTML.replace(/Show/,"Показать");
    tmp = allElements.children[6];
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Гражданин");
    tmp.innerHTML = tmp.innerHTML.replace(/Level/,"Уровень");
    tmp.innerHTML = tmp.innerHTML.replace(/Gold received/,"Получено золота");
    tmp.innerHTML = tmp.innerHTML.replace(/Register time/,"Дата регистрации");
    
    TimeBasic(allElements,6,0,4);
    
    tmp = allElements.children[11];
    tmp.innerHTML = tmp.innerHTML.replace(/Statistics/,"Статистика");
    tmp.innerHTML = tmp.innerHTML.replace(/Total clicks on referral link/,"Всего кликов по ссылке");
    tmp.innerHTML = tmp.innerHTML.replace(/Unique clicks on referral link/,"Уникальных кликов по ссылке");
    tmp.innerHTML = tmp.innerHTML.replace(/Total citizens registered/,"Всего зарегистрированных граждан");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizens who reached level 7/,"Граждане достигшие 7 уровня");
    tmp = allElements.children[14];
    tmp.innerHTML = tmp.innerHTML.replace(/Latest clicks on referrer link/,"Последние клики по ссылке");
    tmp = allElements.children[15];
    tmp.innerHTML = tmp.innerHTML.replace(/Time/,"Время");
    tmp.innerHTML = tmp.innerHTML.replace(/Referrer/,"Страница, с которой перешли");
    tmp.innerHTML = tmp.innerHTML.replace(/Citizen/,"Гражданин");
    
    TimeBasic(allElements,15,0,0);
    
    tmp = allElements.children[15].children[0];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[15].children[0].children[k].children[3];
        if (tmp.innerHTML.match(/Not registered/)) {		
            tmp.innerHTML = tmp.innerHTML.replace(/Not registered/,"Не зарегистрировавшиеся");
            }        
    }
    tmp = allElements.children[17];
    tmp.innerHTML = tmp.innerHTML.replace(/Show more clicks/,"Показать больше кликов");
    
    
}
//Ulepszyc
function TimeBasic(allElements,i,j,l) {
    tmp = allElements.children[i].children[j];
    var loopz = tmp.children.length;
    for (var k = 1; k < loopz; k = k+1) {
        tmp = allElements.children[i].children[j].children[k].children[l];
        if (tmp.innerHTML.match(/[\d\.]+/g)== 1) {		
            if (tmp.innerHTML.match("second")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( second ago)/,"секунду назад");
            } else if (tmp.innerHTML.match("minute")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minute ago)/,"минуту назад");
            } else if (tmp.innerHTML.match("hour")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hour ago)/,"часову назад");
            } else if (tmp.innerHTML.match("day")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( day ago)/,"день назад");
            } else if (tmp.innerHTML.match("month")) {
                tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( month ago)/,"месяц назад");
            } 
        } else {
            if (tmp.innerHTML.match("seconds")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( seconds ago)/,"$1 секунд назад");
            } else if (tmp.innerHTML.match("minutes")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( minutes ago)/,"$1 минут назад");
	        } else if (tmp.innerHTML.match("hours")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( hours ago)/,"$1 часов назад");
	        } else if (tmp.innerHTML.match("days")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( days ago)/,"$1 дней назад");
	        } else if (tmp.innerHTML.match("months")) {
	            tmp.innerHTML = tmp.innerHTML.replace(/(\d*)( months ago)/,"$1 месяцев назад");
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
	tmp.innerHTML = tmp.innerHTML.replace(/Your account status/,"Состояние аккаунта")
	if (tmp.innerHTML.match(/Free account/)) {
        tmp.innerHTML = tmp.innerHTML.replace(/Free account/,"Бесплатный аккаунт")
    } else {
        tmp.innerHTML = tmp.innerHTML.replace(/Premium account/,"Премиум-аккаунт")
    }
    tmp = allElements.children[11]
    tmp.innerHTML = tmp.innerHTML.replace(/Jump to/,"Переезд\u017A в")
    replaceLinkByHref({
		"#features":["Features","Дополнения"],
		"#payments":["Payments","P\u0142atno\u015B\u0107"],
		"#faq":["FAQ","Вопросы"]
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