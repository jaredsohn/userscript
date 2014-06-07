// ==UserScript==
// @name           e-sim RU
// @namespace      e-sim RU
// @include        http://*.e-sim.org*
// @grant          none
// ==/UserScript==
//Russian translation by StRussian
//Script by Kasazanka

menuLinkReplacements = {
	"work.html"				:["Work","Работа"],
	"train.html"			:["Train","Тренировка"],
	"equipment.html"		:["Equipment","Обмудирование"],
	"companies.html"		:["Companies","Фирмы"],
	"newspaper.html"		:["Newspaper","Газета"],
	"myParty.html"			:["Party","Моя партия"],
	"contracts.html"		:["Contracts","Контракты"],
	"myShares.html"		    :["Shares","Акции"],
	"myAuctions.html"		:["Auctions","Аукционы"],
	"inviteFriends.html"	:["Invite friends","Позвать друзей"],
	"myMilitaryUnit.html"	:["Military unit","Военный отряд"],
	"subscription.html"     :["Premium account","VIP аккунт"],
    "goldPurchase.html"     :["Buy gold","Купить золото"],
	
	"productMarket.html"	:["Product market","Рынок"],
	"jobMarket.html"		:["Job market","Предложения работы"],
	"monetaryMarket.html"	:["Monetary market","Валютный рынок"],
	"auctions.html"		    :["Auctions","Аукционы"],
	"stockMarket.html"	    :["Stock market","Рынок акций"],
	"companiesForSale.html"	:["Companies for sale","Фирмы на продажу"],
	"specialItems.html"		:["Special items","Бонусы для битв"],
	
	"countryStatistics.html"		:["Country statistics","Статистика страны"],
	"partyStatistics.html"			:["Party statistics","Статистика партий"],
	"newspaperStatistics.html"		:["Newspaper statistics","Статистика газет"],
	"citizenStatistics.html"		:["Citizen statistics","Статистика жителей"],
	"militaryUnitStatistics.html"	:["Military unit stats","Статиска отрядов"],
	"stockCompanyStatistics.html"	:["Stock market stats","Статистика ОАО"],
	"donations.html"                :["Donations","Донаты"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","Топ статей"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","Последние статьи"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","Военные события"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","Полит. события"],
	
	"battles.html"							:["Battles","Битвы"],
	"countryPoliticalStatistics.html"		:["War and politics","Война и Политика"],
	"countryEconomyStatistics.html"			:["Economy","Экономика"],
	"countryLaws.html"						:["Laws","Законы"],
	"partyElections.html"					:["Party elections","Выборы лидеров партий"],
	"congressElections.html"				:["Congress elections","Выборы в конгресс"],
	"presidentalElections.html"				:["President elections","Выборы през'а"],
	"pendingCitizenshipApplications.html"	:["Citizenship","Получение гражданства"],
	"googleMap.html"						:["Map","Карта"],
    "newMap.html"						:["New map","Новая Карта"]
};

menuTextReplacements = {
	"myPlacesButton":["My places","Мои заведения"],
	"marketButton":["Market","Рынок"],
	"statisticsButton":["Statistics","Статистика"],
	"newsButton":["News","Новости"],
	"electionsButton":["Country","Страна"]
};

hpTitleReplacements = {
	"News":["News","Газеты"],
	"Shouts":["Shouts","Сообщения"],
	"Battles":["Battles","Битвы"],
	"Events":["Events","События"]
};

hpTabsReplacements = {
	"#topArticles":["Global","Мировой"],
	"#latestArticles":["Latest","Последние"],
	"#localArticles":["Local","Страны"],
	
	"#countryShouts":["Country","Страна"],
	"#friendsShouts":["Military unit","Воен. Отряд"],
	"#myShouts":["Friends","Друзья"],
	
	"#localBattles":["Country","Страна"],
	"#substidedBattles":["Subsidized","Субсидируемые"],
	"#hotBattles":["Important","Важные"],

	"#localEvents":["Local","Местные"],
	"#globalEvents":["Military","Военные"],
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
	"http://wiki.e-sim.org/en/MonetaryMarket"	:["Monetary market tutorial","Обучение по валютному рынку"],
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

//============================================================================
//Menu OK
//============================================================================
function doMenu() {
	replaceLinkByHref(menuLinkReplacements);
	replaceInnerHTML2(menuTextReplacements);
	dayInGameReplacement = {
		"./td[3]/table/tbody/tr/td/b[2]"	:[/(day)/,"дней"]	
	};
	var mainNode;
	mainNode = document.getElementById('headerRow');
	getAndReplaceNode(mainNode,dayInGameReplacement);
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
