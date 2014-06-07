// ==UserScript==
// @author         Glorious Lord
// @name           e-simTraditional
// @namespace      e-simTraditional
// @include        http://e-sim.org*
// ==/UserScript==

//============================================================================
//屬性常量
//============================================================================
//---------------------------------------------------
//菜單
//---------------------------------------------------
//菜單 鏈接
menuLinkReplacements = {
	"work.html"				:["Work","工　作"],
	"train.html"			:["Train","訓　練"],
	"companies.html"		:["Companies","工　廠"],
	"newspaper.html"		:["Newspaper","報　紙"],
	"myParty.html"			:["Party","政　黨"],
	"contracts.html"		:["Contracts","合　同"],
	"inviteFriends.html"	:["Invite friends","邀請朋友"],
	"myMilitaryUnit.html"	:["Military unit","軍　團"],
	"subscription.html"		:["Premium account","高級帳號"],
	
	
	"productMarket.html"	:["Product market","商品市場"],
	"jobMarket.html"		:["Job market","工作市場"],
	"monetaryMarket.html"	:["Monetary market","貨幣市場"],
	"companiesForSale.html"	:["Companies for sale","在售工廠"],
	
	"countryStatistics.html"		:["Country statistics","國家統計"],
	"partyStatistics.html"			:["Party statistics","政黨統計"],
	"newspaperStatistics.html"		:["Newspaper statistics","新聞統計"],
	"citizenStatistics.html"		:["Citizen statistics","國民統計"],
	"militaryUnitStatistics.html"	:["Military unit stats","軍團統計"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","頭條新聞"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","最新時訊"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","軍事事件"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","政治事件"],
	
	"battles.html"							:["Battles","戰　場"],
	"countryPoliticalStatistics.html"		:["War and politics","國家政治"],
	"countryEconomyStatistics.html"			:["Economy","國家經濟"],
	"countryLaws.html"						:["Laws","國家法律"],
	"partyElections.html"					:["Party elections","黨內競選"],
	"congressElections.html"				:["Congress elections","議員競選"],
	"presidentalElections.html"				:["Presidential elections","總統競選"],
	"pendingCitizenshipApplications.html"	:["Citizenship","移　民"],
	"googleMap.html"						:["Map","地　圖"],
};

//菜單 文字
menuTextReplacements = {
	"myPlacesButton":["My places","我的場所"],
	"marketButton":["Market","市場"],
	"statisticsButton":["Statistics","統計"],
	"newsButton":["News","新聞快訊"],
	"electionsButton":["Country","國家"]
};

//---------------------------------------------------
//側邊鏈接
//---------------------------------------------------
//側邊鏈接1 <span class='key' ...>
sideLink1Replacements = {
	"crossIcon"	:["Logout","登　出"],
	"workIcon"	:["Work","工　作"],
	"fightIcon"	:["Fight","戰　鬥"],
	"avatarIcon":["Upload avatar","上傳頭像"],
	"voteIcon"	:["Vote","投　票"],
};
//側邊鏈接2 <a href='key' ...>
sideLink2Replacements = {
	"travel.html"	:["Travel","移動"],
	"pendingCitizenshipApplications.html"	:["change","改變國籍"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","體力相關教程"],
};
//側邊鏈接3 <a id='key' href="" ...>
sideLink3Replacements = {
	"eatLink"	:["Eat food","吃食物"],
	"useGiftLink":["Use gifts","使用禮物"]
};
//側邊鏈接4 <input id='key' value="Eat Food" ...>
sideLink4Replacements = {
	"eatButton":["Eat Food","吃食物"],
	"useGiftButton":["Use gift","使用禮物"]
};

//主頁 標題
hpTitleReplacements = {
	"News":["News","新聞"],
	"Shouts":["Shouts","留言"],
	"Battles":["Battles","戰場"],
	"Events":["Events","事件"]
};

//主頁 tabs All
hpTabsReplacements = {
	"#topArticles":["Global","全球焦點"],
	"#latestArticles":["Latest","新聞快訊"],
	"#localArticles":["Local","新聞熱點"],
	
	"#countryShouts":["Country","國家頻道"],
	"#friendsShouts":["Military unit","軍團頻道"],
	"#myShouts":["Friends","好友頻道"],
	
	"#localBattles":["Country","本國戰場"],
	"#substidedBattles":["Subsidized","資助戰場"],
	"#hotBattles":["Important","重要戰場"],

	"#localEvents":["Military","本國軍事"],
	"#globalEvents":["Military","全球軍事"],
	"#politicalEvents":["Political","本國政治"]
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




//============================================================================
//共通函數
//============================================================================
//---------------------------------------------------
//是否是FireFox瀏覽器
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;
//alert(isFF);


//---------------------------------------------------
//使用evaluate從指定的obj中按照條件k進行檢索
//---------------------------------------------------
function getElements(obj, k) {
	return document.evaluate(k, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//---------------------------------------------------
//evaluate的後置處理
//從其檢索結果objs中，匹配每個結果的href屬性然後進行替換
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
//evaluate的後置處理
//從其檢索結果objs中，匹配每個結果的innerHTML直接進行匹配替換
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
//直接從replacements的key中在整個document按照ID進行定位，然後匹配替換
//  key=可以定位的唯一ID
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
//在指定的objs中用evaluate方法檢索指定k並匹配替換
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
//在指定的objs中用evaluate方法檢索指定k並匹配替換
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
//直接檢索下面的類型並匹配替換，
//  <span class='key' ...>  key是唯一的
//---------------------------------------------------
function replaceSpanByClass(replacements) {
	replaceCommon(document, replacements, "//span[@class='", "']");
}

//---------------------------------------------------
//直接檢索下面的類型並匹配替換，
//  <a href='key' ...>  key是唯一的
//---------------------------------------------------
function replaceLinkByHref(replacements) {
	replaceCommon(document, replacements, "//a[@href='", "']");
}

//---------------------------------------------------
//直接檢索下面的類型並匹配替換，
//  <a href='???' ...>  key直接匹配link文字
//---------------------------------------------------
function replaceLinkSSS(replacements) {
	replaceCommonSSS(document, "" ,replacements, "//a[@href", "]");
}

//---------------------------------------------------
//直接檢索下面的類型並匹配替換，
//  <a href='key' ...>  key是復數的
//
//	key="#"
//	{ "Report":["Report","舉報"],"More shouts":["More shouts","顯示更多發言"] }
//---------------------------------------------------
function replaceLinkByHrefSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@href='", "']");
//	results = getElements(document, "//a[@href='" + kk + "']");
//	for (var i = 0; i < results.snapshotLength; i++) {
//		obj = results.snapshotItem(i);
//		for (k in replacements) {
//			if (obj.innerHTML.match(k)) {
//				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
//			}
//		}
//	}
}

//---------------------------------------------------
//直接檢索下面的類型並匹配替換，
//  <a style='key' ...>  key是復數的
//
//	key="font-weight: bold"
//	{ "More shouts":["More shouts","顯示更多頻道發言"]] }
//---------------------------------------------------
function replaceLinkByStyleSSS(kk, replacements) {
	replaceCommonSSS(document, kk, replacements, "//a[@style='", "']");
//	results = getElements(document, "//a[@href='" + kk + "']");
//	for (var i = 0; i < results.snapshotLength; i++) {
//		obj = results.snapshotItem(i);
//		for (k in replacements) {
//			if (obj.innerHTML.match(k)) {
//				obj.innerHTML = obj.innerHTML.replace(replacements[k][0], replacements[k][1]);
//			}
//		}
//	}
}

//---------------------------------------------------
//直接檢索下面的類型並匹配替換，
//  <a id='key' ...>  key是唯一的
//---------------------------------------------------
function replaceLinkByID(replacements) {
	replaceCommon(document, replacements, "//a[@id='", "']");
}

//---------------------------------------------------
//直接檢索下面的類型並匹配替換，
//  <input id='key' value="Eat Food" ...>  key是唯一的
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
//直接檢索下面的類型並匹配替換，
//  <input value='key' ...>  key是唯一，但替換對像有復數個
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
//直接檢索下面的類型並匹配替換，
//  <input value="key" class="kk">
//
//	key="fightButton"
//	{ "Fight (1 hit)":["Fight (1 hit)","xxxx"]] }
//---------------------------------------------------
function replaceInputByClassSSS(kk, replacements) {
	results = getElements(document, "//input[@class='" + kk + "']");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
//		alert(obj.value);
		for (k in replacements) {
//				alert(obj.value);
//				alert(k);
//				alert(obj.value.match("hit"));
			if (obj.value.match(k)) {
//				alert(obj.value);
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
		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/,"$1 同盟");
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"無同盟");
	}
}
//function replaceNoAlliesChildren(obj) {
//	if (obj.innerHTML.match("no allies")) {
//		obj=tmp.childNodes[3];
//		obj.nodeValue=tmp.nodeValue.replace(/(no allies)/,"無同盟");
//	}
//}
function replaceAlliesLinksss() {
	results = getElements(document, "//div[@class='battleDiv']");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		tmp=results.snapshotItem(i).children[0];
		replaceNoAlliesComm(tmp);
//		if (tmp.innerHTML.match("no allies")) {
//			tmp=tmp.childNodes[3];
////			alert(tmp.nodeValue);
//			tmp.nodeValue=tmp.nodeValue.replace(/(no allies)/,"無同盟");
//		}
		tmp=results.snapshotItem(i).children[2];
		replaceNoAlliesComm(tmp);
//		if (tmp.innerHTML.match("no allies")) {
//			tmp=tmp.childNodes[3];
////			alert(tmp.nodeValue);
//			tmp.nodeValue=tmp.nodeValue.replace(/(no allies)/,"無同盟");
//		}
//		alert(results.snapshotItem(i).children[3].innerHTML);
		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"起義戰鬥");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"資助：");
//		obj = results.snapshotItem(i);
////		alert(obj.innerHTML);
//		obj.innerHTML=obj.innerHTML.replace(/(no allies)/,"無同盟");
//		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/g,"$1 同盟");
//		obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/,"起義戰鬥");
//		obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/,"資助：");
	}
}


//---------------------------------------------------
//replace common
//  battle info
//---------------------------------------------------
function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"無同盟");
	//12 allies
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 同盟");
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"起義戰鬥");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"資助：");
//	//: none
//	allElements.innerHTML=allElements.innerHTML.replace(/(: none)/g,"：無");
//	//: 0.02 USD for 1.000 dmg
//	allElements.innerHTML=allElements.innerHTML.replace(/(: )([0-9.]+) (\w*)( for )/g,"：$2 $3" 每);
}

//---------------------------------------------------
//replace common
//  戰場一覽時間
//  消息時間
//---------------------------------------------------
function replaceBattleTime(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( second[s]* ago)/g,"$1 秒前");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"$1 分鐘前");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"$1 小時前");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( day[s]* ago)/g,"$1 天前");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( month[s]* ago)/g,"$1 月前");
}

//---------------------------------------------------
//replace common
//  主頁 報紙文章發布時間 by
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( second[s]* ago by)/g,"投稿於 $2 秒前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"投稿於 $2 分鐘前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"投稿於 $2 小時前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"投稿於 $2 天前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"投稿於 $2 月前 ");
}

//---------------------------------------------------
//replace common
//  收到訂閱報紙的文章
//---------------------------------------------------
function replacNewspaperTime(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( second[s]* ago)/g,"發表於 $2 秒前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago)/g,"發表於 $2 分鐘前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago)/g,"發表於 $2 小時前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( day[s]* ago)/g,"發表於 $2 天前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( month[s]* ago)/g,"發表於 $2 月前 ");
}


//---------------------------------------------------
//replace common
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"正在輸出的");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"防守者:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"進攻者:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"本回合戰鬥統計信息");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"防守方傷害累計:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"進攻方傷害累計:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"個人傷害累計:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"防守方國家累計傷害排行榜:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"進攻方國家累計傷害排行榜:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"防守方軍團累計傷害 TOP 5:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"進攻方軍團累計傷害 TOP 5:");
}





//---------------------------------------------------
//replace common
//  battle Statistics
//---------------------------------------------------
function doShoutsComm() {
	results = getElements(document, "//b[@style='color: #222']");
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("second")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"發言於 $2 秒前");
		} else if (obj.innerHTML.match("minute")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"發言於 $2 分鐘前");
		} else if (obj.innerHTML.match("hour")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"發言於 $2 小時前");
		} else if (obj.innerHTML.match("day")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"發言於 $2 天前");
		} else if (obj.innerHTML.match("month")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"發言於 $2 月前");
		} 
	}
//		alert("1-2");
	replaceLinkByHrefSSS("#", {
		"Report":["Report","舉報"],
		"Delete":["Delete","刪除"],
		"Edit":["Edit","編輯"],
		"More shouts":["More shouts","顯示更多發言"]
	});
	
	
	replaceInputByValue({
		"Report":["Report","舉報"],
		"Delete":["Delete","刪除"],
		"Edit":["Edit","編輯"]
	});	
	
}





//============================================================================
//全局變量（臨時）
//============================================================================

//alert(window.location.href);
//alert(window.location.host);
//alert(window.location.pathname);

//var allElements;
//var allLinks, thisLink;
//var tmp;
//var allDivs;


//============================================================================
//Menu
//============================================================================
function doMenu() {
	//menu link
	replaceLinkByHref(menuLinkReplacements);
	//menu text
	replaceInnerHTML2(menuTextReplacements);
}

//============================================================================
//Side
//============================================================================
function doSide() {
	var allElements;
	var tmp;
	
	allElements = document.getElementById('userMenu').children[0];
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"等級: ");
//	tmp.innerHTML=tmp.innerHTML.replace(/(XP:)/,"經驗值:");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"軍銜:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"累計傷害:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"工作技能:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"力量:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"所在地:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"國籍:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"食物剩餘次數:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"禮物剩餘次數:");

	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"貨 幣 資 產");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"貨 物 資 產");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"消 息 通 知");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"每 日 任 務");
	
	//移動 移民 體力說明
	replaceLinkByHref(sideLink2Replacements);
	//食物 禮物
	replaceLinkByID(sideLink3Replacements);
	//食物-2 禮物-2
	replaceInputByID(sideLink4Replacements);
	//登出 戰鬥 工作 訓練
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"戰鬥中回合");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"第 $2 回合");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"選擇食物");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"選擇禮物");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"空手 (基礎傷害 ");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"任何Quality");
		}
	}
}

//============================================================================
//Homepage
//============================================================================
function doHP() {
	//hp title
//	allElements = document.getElementById('contentRow');
	replaceInnerHTML(getElements(document, "//div[@class='rightTabGrey']"), hpTitleReplacements);
	
	//index tabs
	replaceLinkByHref(hpTabsReplacements);
	
	//Articles content
	for (kk in hpContentArticlesReplacements) {
		allElements = document.getElementById(kk);
		replacNewspaperTimeWithAuthor(allElements);
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"投稿於 $2 分鐘前 ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"投稿於 $2 小時前 ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"投稿於 $2 天前 ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"投稿於 $2 月前 ");
	}
	
//	alert(1);
	//Shouts content
//	for (kk in hpContentShoutsReplacements) {
//		allElements = document.getElementById(kk);
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"發言於 $2 分鐘前");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"發言於 $2 小時前");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"發言於 $2 天前");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"發言於 $2 月前");
		
//	}
	
//	alert(2);
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
	replaceLinkSSS({
		"Show more battles":["Show more battles","顯示更多戰場"],
		"Subsidies informations":["Subsidies informations","關於資助戰場的說明"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		//"No subsidized battles":["No subsidized battles","無資助戰場"],
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"無資助戰場");
		}
		if (allElements.innerHTML.match("No battles in your country")) {
			allElements.innerHTML=allElements.innerHTML.replace(/No battles in your country/,"所在地的國家沒有任何戰場");
		}
		
		
//		replaceBattleInfo(allElements);
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more battles":["Show more battles","顯示更多戰場"] });
//		allElements.innerHTML=allElements.innerHTML.replace(/(Show more battles)/g,"顯示更多戰場");
//		allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"無資助戰場");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Subsidies informations)/,"關於資助戰場的說明");
		
	}
	
	rowoffset = 0
	//Election
	allElements = document.getElementById('contentRow').children[2].children[0];
//	alert(allElements.innerHTML);
	if (allElements.innerHTML.match("elections")) {
		rowoffset = 2;
		tmp = allElements;
//		alert(tmp.innerHTML);
		//Presidential elections are scheduled on 5th day each month. You have time till 5th to <submit your candidature>
		tmp.innerHTML=tmp.innerHTML.replace(/Presidential elections .* till 5th to/,"總統選舉定於每個月5號舉行。<br>你可以在5號之前");
		tmp.innerHTML=tmp.innerHTML.replace(/submit your candidature/,"提交你的候選人申請");
		tmp.innerHTML=tmp.innerHTML.replace(/Today is presidential elections day! You have time till 23:59 to ([\d\D]*?)cast your vote/,"今天是總統大選日！<br>請在遊戲時間23:59前$1投出你手中神聖的一票");
		//Party leader elections are scheduled on 15th day each month. You have time till 14th to
		tmp.innerHTML=tmp.innerHTML.replace(/Party leader [^<]*?(<[^>]*>)[^<]*(<[^>]*>).*in your party/,"黨主席競選定於每個月15號舉行。<br>你可以在14號之前 $1提交你的候選人申請$2 來參加黨內競選。");
	}
	
	//MU
	allElements = document.getElementById('contentRow').children[2].children[0+rowoffset];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"軍令:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"陣營:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"發生在 $1 分鐘前");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"發生在 $1 小時前");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day[s]* ago)/g,"發生在 $1 天前");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month[s]* ago)/g,"發生在 $1 月前");
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g," 在戰鬥中成功守住了 $2，敵方是 ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 國民在 $4 $5 發動了起義");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"遭到了 $2$3 的進攻");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"$2$3 總統提出議案 計劃向 $5$6 宣戰");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g,"發布宣戰布告 正式向 $2$3 宣戰");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," 通過戰鬥成功占領了 $2，敵方是 ");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","顯示更多事件"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"顯示更多事件");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"請寫下你的發言內容：");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="發言"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"　　發送頻道：");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"　發送頻道：");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/,"- 國家　$2- 軍團　$4 - 好友");
	//Characters remaining: 100
	//alert(allElements.innerHTML);
	//allElements.innerHTML=allElements.innerHTML.replace(/(Characters remaining:)/,"還能輸入的字數：");
	//alert(allElements.innerHTML);
	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","顯示更多頻道發言"] });
}

//============================================================================
//Job Market
//============================================================================
function doJobMarket() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"工作市場");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"工作信息選項:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"國家:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"工作等級:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"僱主");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"工廠");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"產品");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"工作等級要求");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"薪水");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"申請");
	
	replaceInputByValue({"Apply":["Apply","申請"],"Show":["Show","顯示"]});
}

//============================================================================
//Work
//============================================================================
function doWork() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Work)/,"工　作");
	
	
//	tmp = allElements.children[4];
	
	if (allElements.innerHTML.match(/You have no job^\./)) {
		xxx = document.getElementById('command').parentNode.children[0];
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"失業中…");
		replaceInputByValue({"Get a job now!":["Get a job now!","找工作去!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"你工作的工廠並不在你所在地的國家境內，你可以移動到工廠所在的國家境內工作，或者重新找一份工作。");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"工作場所");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"僱主");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"薪水:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"離職");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"今天尚未工作");
			replaceInputByValue({"Work now":["Work now","立即工作"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"本日工作成果");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"稅前薪水");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"稅後淨收入");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"繳納個人所得稅");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"工作於");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"獲得經驗值");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"獲得工作技能");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"連續工作天數");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"基礎產量");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"產量加成");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"產量合計");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"實際產出");
			//+60% Raw company quality 
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"該公司基礎產量");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","任意"],
		"2":["Iron","鐵材"],
		"3":["Grain","小麥"],
		"4":["Oil","石油"],
		"5":["Stone","石材"],
		"6":["Wood","木材"],
		"7":["Diam.","鑽石"],
		"8":["Weap.","武器"],
		"9":["House","房屋"],
		"10":["Gift","禮物"],
		"11":["Food","食物"],
		"12":["Ticket","機票"],
		"13":["DS","防禦"],
		"14":["Hosp.","醫院"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"商品市場");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","顯示商品價格:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","國家:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","　品質星級:");
	
	replaceInputByValue({"View offers":["View offers","顯示報價單"],"Buy":["Buy","購買"]});
	
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
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","顯示在售商品 / 新品上架"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"商品");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"賣家");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"存貨");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"單價");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"購買");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," 個/件　");
	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","顯示在售商品 / 新品上架"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","商品相關說明"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"軍事訓練");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","訓練"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"訓練結束，請明天再來。");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"今天已經訓練過了, 無法再次訓練!");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"今天的訓練已經結束，請明天再來繼續訓練。");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"獲得力量:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"個人軍事信息");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"總訓練次數:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"力量:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"軍銜:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"累計傷害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"未裝備武器傷害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"裝備Q1武器傷害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"裝備Q2武器傷害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"裝備Q3武器傷害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"裝備Q4武器傷害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"裝備Q5武器傷害:");
	
}

//============================================================================
//Battles List 戰場一覽
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"戰場信息");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"國家");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"排序方式:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"只顯示資助戰場:");
	
	replaceInputByValue({"Show battles":["Show battles","顯示戰場信息"]});
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"開戰時間");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"戰場");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"防守方 vs 進攻方");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"比數");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"累計傷害");
	
	tmp = allElements.children[0];
//	alert(tmp.children.length);
	
	for (i = 1; i < tmp.children.length; i++) {
		obj = tmp.children[i].children[3];
		replaceBattleTime(obj);
	}
//	replaceBattleInfo(tmp);
//	replaceBattleTime(tmp);

	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
}

//============================================================================
//Battle 具體某場戰鬥
//============================================================================
function doBattle() {
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//戰場信息 時間 回合數等
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
//	var allElements;
//	allElements = document.getElementById('contentRow').children[1];
	allElements = document.getElementById('battleBar').parentNode;
	
//	tmp = allElements.children[1].children[0].children[2];
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"起義戰鬥");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"發動者是");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
//	alert(allElements.children[7].innerHTML);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"第 $2 回合");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"防守方勝利回數");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"進攻方勝利回數");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//戰鬥信息 Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"防守方輸出 TOP 3");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"進攻方輸出 TOP 3");
	
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//戰鬥指令
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	
//	tmp = allElements.children[3];
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];
//	alert(allElements.innerHTML);
	//普通 跨地域無法戰鬥
	//起義 跨地域無法戰鬥
	//戰鬥結束
	//普通戰鬥
	//起義戰鬥

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"你在現所在地無法參加該場戰鬥，");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"只有移動到該場戰鬥雙方國家的任意一方的占有地才能參戰。");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"你在現所在地無法參加該場戰鬥，");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"只有移動到該場戰鬥雙方國家的任意一方的占有地才能參戰。");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"本回合勝利方是:");
	} else {
//		if (isFF) {
//			//fight button
//			replaceInputByClassSSS("fightButton", 
//				{
//					"1 hit":["Fight (1 hit)","單次攻擊"],
//					"5 hits":["Berserk! (5 hits)","狂暴攻擊! (5連擊)"]
//				}
//			);
//		}
		
		//text
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"選擇武器:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"選擇己方陣營:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"己方陣營:");
	}
	
	
	//回合顯示
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"顯示指定回合信息:");
	}
	replaceInputByValue({"Show round":["Show round","顯示回合信息"]});
	
//	tmp.innerHTML=tmp.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"你在現所在地無法參加該場戰鬥，");
//	tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"只有移動到該場戰鬥雙方國家的任意一方的占有地才能參戰。");
//	tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"只有移動到該場戰鬥雙方國家的任意一方的占有地才能參戰。");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Show round:)/,"顯示指定回合信息:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Current round)/,"戰鬥中回合");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/g,"第 $2 回合");
//	replaceInputByValue({"Show round":["Show round","顯示回合信息"]});
//	tmp.innerHTML=tmp.innerHTML.replace(/(This round was won by:)/g,"本回合勝利方是:");
//	
//	tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"選擇武器:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"選擇陣營:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"你的陣營:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Fight (1 hit))/,"單次攻擊");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Berserk! (5 hits))/,"狂暴攻擊! (5連擊)");
//	replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","單次攻擊"],"Berserk! (5 hits)":["Berserk! (5 hits)","狂暴攻擊! (5連擊)"]});
	
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//戰場統計
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"顯示該戰場所有戰鬥統計信息");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"戰鬥教程");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"戰場規則");
	
//	allElements = document.getElementById('fightStatus');
//	tmp = allElements.children[0];
//	tmp.innerHTML=tmp.innerHTML.replace(/(Waiting for results...)/,"等待結果返回:");
//	tmp = allElements.children[1];
//	tmp.innerHTML=tmp.innerHTML.replace(/(Damage done:)/,"造成傷害:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained:)/,"獲得經驗值:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Health:)/,"體力:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Location bonus:)/,"戰場加成:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Fight bonuses)/,"關於戰鬥加成");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your total damage:)/,"累計傷害:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Damage required for next rank:)/,"軍銜升級所需傷害:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your health:)/,"當前體力:");
}

//============================================================================
//Battle Statistics 所有戰鬥統計信息
//============================================================================
function doBattleStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"發動者是");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"第 $2 回合");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"防守方勝利回數");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"進攻方勝利回數");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"返回戰鬥模式");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"統計信息的更新間隔為30分鐘");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"國民 ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"在線");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"離線");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","修改個人設置"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","舉報一人多號"]
	});
	replaceInputByValue({"Report multi":["Report multi","舉報一人多號"]});

//	results = getElements(document, "//table[@class='attributesTable']");
//	if (results.snapshotLength > 0) {
//		obj = results.snapshotItem(0);
//		obj.innerHTML=obj.innerHTML.replace(/Level:/,"等級:");
//		obj.innerHTML=obj.innerHTML.replace(/XP:/,"經驗值:");
//		obj.innerHTML=obj.innerHTML.replace(/Damage:/,"累計傷害:");
//		obj.innerHTML=obj.innerHTML.replace(/Rank:/,"軍銜:");
//		obj.innerHTML=obj.innerHTML.replace(/Economy skill:/,"工作技能:");
//		obj.innerHTML=obj.innerHTML.replace(/Strength:/,"力量:");
//		obj.innerHTML=obj.innerHTML.replace(/location:/,"所在地:");
//		obj.innerHTML=obj.innerHTML.replace(/Citizenship:/,"國籍:");
//	}

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match(" banned")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"該帳號永久封停");
		tmp.innerHTML=tmp.innerHTML.replace(/Temporary banned/,"該帳號暫時封停");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned until:/,"封停期:");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"原因:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"執行人:");
	}
	
//	alert(allElements.innerHTML);
	tmp = allElements.children[0].children[2+rowoffset];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"等級:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"經驗值:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"累計傷害:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"軍銜:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"工作技能:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"力量:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"所在地:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"國籍:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"誕生日:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"軍團:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"政黨:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"報紙:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"工作:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"所有工廠");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"政治職務:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"無");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"無");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"無");
	tmp.innerHTML=tmp.innerHTML.replace(/No workplace/,"無");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"無");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"無");
	
//	allElements = document.getElementById('contentRow').children[2];
//	tmp = allElements.children[0].children[0];
	allElements = getElements(document, "//ul[@style]");
//	alert(allElements.snapshotLength);
	
//	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
//			rowoffset += 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"負債一覽表");
			//tmp.innerHTML=tmp.innerHTML.replace(/(payback time )(\d*)( game day)/,"距離債務回收期限還有 $2 天");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"債務償還期限是 ");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g,"$1 day");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"好友一覽表");
	
	tmp = allElements.parentNode.parentNode.children[0];
	if (tmp.innerHTML.match("This citizen has been inactive for")) {
		tmp.innerHTML=tmp.innerHTML.replace(/This citizen has been inactive for (\d*) days/,"該Citizen已經連續 $1 天未登錄了");
	}
	
//	alert(allElements.snapshotItem(0).parentNode.children[0].innerHTML);
	
	
	allElements = document.getElementById('countryShouts');
	allElements.parentNode.children[0].innerHTML=allElements.parentNode.children[0].innerHTML.replace(/Shouts:/,"國家頻道發言:");
	
	doShoutsComm();
}


//============================================================================
//Edit Citizen
//============================================================================
function doEditCitizen() {
	allElements = document.getElementById('editCitizenForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"郵箱:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"新密碼:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"再重復一次:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"舊密碼:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"新頭像:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","文件尺寸小於");
	
	replaceInputByValue({"Edit citizen":["Edit citizen","確定編輯"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"移　動");
	tmp = allElements.children[1];
	if (tmp.innerHTML.match("img")) {
		tmp.innerHTML=tmp.innerHTML.replace(/You have moved to /,"你已經到達 ");
		tmp.innerHTML=tmp.innerHTML.replace(/You selected wrong region/,"地區選擇錯誤，或者你已經位於選擇地區");
		tmp.innerHTML=tmp.innerHTML.replace(/You have no selected ticket in stock/,"選擇使用的機票已經沒有庫存");
	}
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"國家");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"地區:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"機票星級:");
	
	replaceInputByValue({"Travel":["Travel","移動"]});
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","移動相關說明"]
	});
}


//============================================================================
//Inbox Messages
//============================================================================
function doMessagesComm() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Messages from/,"收　件　箱");
	allElements = document.getElementById('inboxTable').children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Author/,"送信人");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"消息內容");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"時間");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"刪除");
	tmp.innerHTML=tmp.innerHTML.replace(/To/,"收信人");
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		replaceBattleTime(tmp.children[i].children[2]);
//		alert(i);
	}
}

function doInboxMessages() {
	doMessagesComm();

	replaceLinkByHref({
		"sentMessages.html":["Sent messages","發件箱"],
		"composeMessage.html":["Compose message","新建信息"]
	});
	replaceInputByValue({
		"Delete":["Delete","刪除選中"],
		"Quick reply":["Quick reply","快速回復"],
		"Report":["Report","舉報"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","舉報"],
		"Quick reply":["Quick reply","快速回復"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","回復"],
		"conversation.html":["Previous messages","歷史消息"]
	});
	
}

//============================================================================
//Sent Messages
//============================================================================
function doSentMessages() {
	doMessagesComm();
//
	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","收件箱"],
		"composeMessage.html":["Compose Message","新建信息"]
	});
}

//============================================================================
//Compose Message
//============================================================================
function doComposeMessage() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/New message/,"新建消息");

	replaceLinkByHref({
		"inboxMessages.html":["Inbox messages","收件箱"],
		"sentMessages.html":["Sent messages","發件箱"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"收信人:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"標題:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"消息正文:");
	
	replaceInputByValue({
		"Send":["Send","發送"],
		"Preview":["Preview","預覽"]
	});
}

//============================================================================
//Notifications
//============================================================================
function doNotifications() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Notifications/,"系統消息");

	replaceInputByValue({
		"Delete All":["Delete All","刪除全部"],
		"Delete":["Delete","刪除選擇"]
	});
	
//	replaceLinkByHref({
//		"inboxMessages.html":["Inbox messages","收件箱"],
//		"sentMessages.html":["Sent messages","發件箱"]
//	});

	allElements = document.getElementById('command').children[1].children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"消息類型");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"消息內容");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"時間");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"刪除");
	
	
	
	tmp = allElements;
	for (i = 1; i < tmp.children.length - 1; i++) {
		//time
		obj = tmp.children[i].children[2];
		replaceBattleTime(obj);
		//type + message
		obj = tmp.children[i].children[0];
		msg = tmp.children[i].children[1];
		
		if (obj.innerHTML.match("Contracts")) {
			obj.innerHTML=obj.innerHTML.replace(/Contracts/,"合同");
			msg.innerHTML=msg.innerHTML.replace(/(has accepted your)(.*)(contract)(.*)/,"接受了你的$2合同$4");
			msg.innerHTML=msg.innerHTML.replace(/(has offered you to sign a)(.*)(contract)(.*)(Please read it carefully before accepting it, make sure that citizen doesn't want to cheat you!)/,"向你發送了$2合同$4請在同意該合同前仔細確認，以免上當受騙! (特別注意陌生人)");
		} else if (obj.innerHTML.match("Citizen")) {
			obj.innerHTML=obj.innerHTML.replace(/Citizen progress alert/,"Citizen 成長");
			msg.innerHTML=msg.innerHTML.replace(/(Your friend)(.*)(has reached level )(\d*)( and you have been awarded with )(.*)(referral bonus)/,"你的好友$2等級升到了 Lv.$4 所以你獲得了 $6的推薦獎勵");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations! You have been promoted to )(.*)(\. Your further damage will be increased by your new rank\.)/,"恭喜! 軍銜升級到了 $2，你的輸出傷害將會因此而提高。");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations! You have reached level )(\d*)(\. You have been awarded with )(.*)/,"恭喜! 你的等級升到了 Lv.$2 並獲得了 $4 的獎勵");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations! You have reached level )(\d*)(\.)/,"恭喜! 你的等級升到了 Lv.$2");
		} else if (obj.innerHTML.match("Monetary")) {
			obj.innerHTML=obj.innerHTML.replace(/Monetary market alert/,"匯市交易");
			msg.innerHTML=msg.innerHTML.replace(/(Your )(.*)(was sold for)(.*)(to citizen)(.*)(on monetary market)/,"你在貨幣市場掛出的單子，其中 $2 以 $4的價格被 Citizen$6 購買了");
		} else if (obj.innerHTML.match("Military")) {
			obj.innerHTML=obj.innerHTML.replace(/Military Unit/,"軍團");
			msg.innerHTML=msg.innerHTML.replace(/(has promoted you to)(.*)(in your military unit)/,"任命你為軍團的$2");
			msg.innerHTML=msg.innerHTML.replace(/(has accepted your application to join his\/her military unit)/,"已經審批通過了你的加入軍團的申請");
			msg.innerHTML=msg.innerHTML.replace(/(Your military group  donated you)(.*)(Donation reason:)/,"你的軍團向你捐贈(D)了$2捐贈理由:");
			msg.innerHTML=msg.innerHTML.replace(/(Your military group  donated you)/,"你的軍團向你捐贈(D)了$2");
		} else if (obj.innerHTML.match("Other")) {
			obj.innerHTML=obj.innerHTML.replace(/Other alert/,"其他");
			msg.innerHTML=msg.innerHTML.replace(/(Player)(.*)(proposed you to)(.*)(add you to friends list)(.*)/,"玩家$2向你申請互加好友 $4點此確認$6");
			msg.innerHTML=msg.innerHTML.replace(/(Player)(.*)(has added you to friend list)/,"玩家$2同意了你的互粉申請");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations!)(.*)(Your friend)(.*)(has reached level )(\d*)( and you have been awarded with )/,"恭喜!$2你的好友$4等級升到了 Lv.$6 所以你獲得了 ");
			msg.innerHTML=msg.innerHTML.replace(/(has registered using your reflink\.)/,"使用了你的邀請鏈接並注冊成功");
			msg.innerHTML=msg.innerHTML.replace(/(Your have been awarded with additional)(.*)(for  registering from)(.*)(reflink)/,"因為使用了$4的邀請鏈接 你額外獲得了 $2 的獎勵");
		} else if (obj.innerHTML.match("Company")) {
			obj.innerHTML=obj.innerHTML.replace(/Company alert/,"工廠");
			msg.innerHTML=msg.innerHTML.replace(/(Your employeer)(.*)(has increased your salary from)(.*)(to)/,"你的僱主$2提高了你的薪水 從$4提高到了");
			msg.innerHTML=msg.innerHTML.replace(/(Your employeer)(.*)(has lowered your salary from)(.*)(to)(.*)(\. If you don't like it, you can leave your job and find a better one on job market. )/,"你的僱主$2降低了你的薪水 從$4降低到了$6。如果對此不滿，你可以先離職，然後在工作市場上找份更好的工作～");
			msg.innerHTML=msg.innerHTML.replace(/(Unfortunately, you have been fired from )(.*)( by )(.*)(\. Don't worry, you can get another job at)(.*)(job market)/,"很不幸，你被 $4 從 $2 解僱了… 不過不必擔心 你很快就能找到新工作的 $6前往工作市場");
		} else if (obj.innerHTML.match("Donation")) {
			obj.innerHTML=obj.innerHTML.replace(/Donation/,"捐贈(D)");
			msg.innerHTML=msg.innerHTML.replace(/(Player)(.*)(donated you)(.*)(Donation reason:)/,"玩家$2向你捐贈了$4捐贈理由:");
			msg.innerHTML=msg.innerHTML.replace(/(Player)(.*)(donated you)/,"玩家$2向你捐贈了");
		} else if (obj.innerHTML.match("Medal")) {
			obj.innerHTML=obj.innerHTML.replace(/Medal alert/,"獎章獎勵");
			msg.innerHTML=msg.innerHTML.replace(/(awarded you with)(.*)(Reason:)/,"向你頒發了$2理由:");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations! You have been awarded with )(.*)(\. You received )(.*)(for your achievement)/,"恭喜! 你獲得了 $2 並收到了 $4 作為獎勵");
		} else if (obj.innerHTML.match("Subsidy")) {
			obj.innerHTML=obj.innerHTML.replace(/Subsidy alert/,"資助");
			msg.innerHTML=msg.innerHTML.replace(/(You received )(.*)( from )(.*)( for dealing )(\d*)( damage in battle)/,"你收到了來自 $4 政府的 $2 資助 貢獻傷害是 $6 點");
		} else if (obj.innerHTML.match("Tutorial")) {
			obj.innerHTML=obj.innerHTML.replace(/Tutorial/,"教程");
			msg.innerHTML=msg.innerHTML.replace(/(You have reached level )(\d*)( and you are now allowed to run for presidency in your country!)(.*)/,"你的等級升到了 Lv.$2 現在開始你可以參加本國的總統競選了!");
			msg.innerHTML=msg.innerHTML.replace(
				/(Congratulations!)(.*)(You have reached)(.*)(You have been awarded with your first)(.*)(You can spend this gold to create a newspaper or a company)(.*)(Citizens at level.*more about elections)(.*)(here)/,
				"恭喜! $2你的等級升到了$4並且獲得了你的第一份獎勵 $6你可以利用這個啟動G來創辦份報紙或者創建個工廠$8Citizen等級達到 Lv.7 以後就可以進行各種競選投票。遊戲中有三種競選：總統競選、議員競選和黨主席競選。更多的說明信息可以參考$10這裡"
			);
			msg.innerHTML=msg.innerHTML.replace(
				/(Congratulations!)(.*)(You have reached)(.*)(To reach level 5.*experience points\.)(.*)(Keep working.*actions\.)/,
				"恭喜! $2你的等級升到了$4要升級到 Lv.5 還需要20點經驗值。$6繼續保持工作、訓練以及戰鬥，然後更多的功能會解鎖。"
			);
			msg.innerHTML=msg.innerHTML.replace(
				/(Congratulations!)(.*)(You have reached)(.*)(To reach level 4.*experience points\.)(.*)(If.*on health\.)(.*)(To fight more, you need to)(.*)(eat some food)(.*)(using.*avatar\.)(.*)(Everyday you.*depends on quality)(.*)(You can also.*than food!)(.*)(To reach level 4 use food .* additional fights)/,
				"恭喜! $2你的等級升到了$4要升級到 Lv.4 還需要10點經驗值。$6如果這是你第一天加入這個遊戲，你可能會發現體力不足了。$8為了能夠打跟多次槍你需要用側邊欄頭像下面的$10吃食物(Eat food)$12來恢復體力。$14每天吃食物有10次限制，每個食物則能夠恢復10～50體力(根據食物的星級$16同樣你每天也可以使用(?YY)10次禮物。但是要注意的是，禮物比食物貴的多！$18為了能盡快升級到 Lv.4 你需要多吃食物多戰鬥。"
			);
			msg.innerHTML=msg.innerHTML.replace(
				/(<b>Congratulations!)(.*)(You have reached)(.*)(and you .* a battle\.)(.*)(To reach level 3.* and make some fights to reach level 3\.)/,
				"<b>恭喜!</b> <br><br>你的等級升到了 <b>level 2</b> 現在開始你可以參加戰鬥了。 <br><br>要升級到 Lv.3 還需要10點經驗值。<br>你可以通過戰鬥獲得更多的 <b>經驗值(xp)</b> <br><br><br> 在戰鬥中，每打一次槍(攻擊一次)你都可以獲得 <b>1點經驗值</b> 當然，同時也會減少 <b>10點體力</b>。 <br>如果你的體力降到了0，<b>你將無法繼續戰鬥</b>。 <br>沒體力又想繼續戰鬥賺經驗的話，你需要通過 <b>吃食物</b> 或者 <b>使用禮物</b> 來恢復體力。<br>食物和禮物需要從其他玩家手上購買，在 <a href=\"productMarket.html\" target=\"_blank\">商品市場</a> 中你所看到的就是其他玩家售賣的物品。<br>另外系統會在遊戲換日時間(香港時間早上 6點)恢復你50點體力。<br><br><br>戰鬥本身也是賺錢的好方法。在一些 <a href=\"battles.html?substidedOnly=true\" target=\"_blank\">資助戰場</a> 裡為提供資助的國家戰鬥，之後會按照你輸出的傷害來付錢。這樣一來，有志成為國際雇佣兵的人就可以為高額的資助而戰鬥了。<br><br><br>你可以通過使用 <b>食物</b>、<b>禮物</b> 以及 <b>武器</b> 來提高你每天都輸出傷害總值。<br><br><br>現在你可以即刻前往 <a href=\"battles.html\" target=\"_blank\">戰場</a> 通過戰鬥來升到 Lv.3。"
			);
//			if (i==14)alert(msg.innerHTML);
			msg.innerHTML=msg.innerHTML.replace(
				/Welcome in .* daychange at 0:00AM\./,
				"歡迎來到 <b>e-sim!</b><br> <br> 左側邊欄就是你的Citizen(國民/角色)的狀態。<br> 你可以看到你現在的頭像、等級、經驗值進度、軍銜、貨幣財產(錢)和貨物資產(物) experience 。 <br> <br>可以看到現在你只有 <b>1點經驗值</b> 需要到10點才能升級到等級2並進行之後的教程。 <br><br>現在你可以通過完成在左下方的【日常任務】來升級到Lv.2。 <br>* <b>工作</b> - 5 經驗值<br>進入 <a href=\"jobMarket.html\" target=\"_blank\">工作市場</a> 然後任意找份工作。然後點下畫面上的 <b>立即工作</b> 的按鈕你就能獲得經驗值和第一份薪水。<br>注意，這些工廠是由其他玩家運營並提供工作的。將來你也可以創建一家工廠，然後僱用其他的Citizen。<br><br>* <b>訓練</b> - 3 經驗值<br>進入 <b>訓練</b> 畫面然後點擊 <b>訓練</b> 按鈕。<br>訓練可以提高你的力量。更高的力量則以位置更大的傷害(Damage)。<br><br>* <b>上傳頭像</b> - 3 經驗值<br>進入 <a href=\"editCitizen.html\" target=\"_blank\">修改個人設置</a> 畫面然後上傳你自己喜歡的頭像。<br><br>當你的等級達到 Lv.2 以後，我會說明如何戰鬥，敬請期待。<br><br>注意，每天只能工作訓練各一次！當天日常任務的時間限制是遊戲時間換日之前，遊戲時間AM 0:00之前，也就是香港時間 AM 6:00。"
			);
		}
	}
	
	
}

//============================================================================
//Subscriptions
//============================================================================
function doSubs() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"訂　閱");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"收到的訂閱報紙");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","訂閱報紙一覽表"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"訂閱報紙一覽表");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"訂閱總數<br>※點擊解除訂閱");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"報紙");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"訂閱時間");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length - 1; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","報紙相關說明"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"報　紙");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"最新發表文章");
		
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","修改報紙信息"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","報紙相關說明"]
	});
	replaceInputByValue({
		"Publish":["Publish","發表"],
		"Preview":["Preview","預覽"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"發表新的文章");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"文章發表國家");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"文章標題:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"正文:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"請在文章提交之前在本地保留備份，以防萬一。");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"報紙名稱:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"報紙圖標:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","文件尺寸小於");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","修改報紙信息"]
	});
	replaceInputByValue({
		"Delete":["Edit newspaper","修改提交"]
	});
}

//============================================================================
//Article
//============================================================================
function doArticle() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Article/,"文　章");
	
	replaceHerf(getElements(document, "//a[@href]"), {
		"editArticle.html":["Edit article","編輯修改"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","修改報紙信息"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","舉報"],
		"Edit":["Edit","編輯"],
		"Delete":["Delete","刪除"]
	});
	replaceInputByValue({
		"Publish":["Publish","回復"],
		"Report":["Report","舉報"],
		"Edit":["Edit","編輯"],
		"Delete":["Delete","刪除"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"發表回復");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"內容:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"報　紙");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"編輯文章");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"文章標題:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"正文:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","修改報紙信息"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","關於報紙"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","編輯提交"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"合同一覽");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"合同模板");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","已發送的合同 (最新20份)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"發送給");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"無");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","已完成的合同 (最新20份)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"發送給");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"無");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","被拒絕的合同");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"被$1拒絕");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"無");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","失敗的合同");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"無");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","放貸一覽");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","借款人");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","償還時限");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","合計");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","已銷賬");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","無");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","貸款一覽");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","放款人");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","償還時限");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","合計");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","已還款");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","無");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","模板名稱:");
	
//	allElements = document.getElementById('command');
//	tmp = allElements.parentNode.children[0];
//	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"編輯文章");
//	tmp = allElements.children[1];
//	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"文章標題:");
//	tmp = allElements.children[6];
//	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"正文:");
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","關於合同"],
		"#":["Create new template","創建新的合同模板"]
	});
	replaceInputByValue({
		"Delete":["Delete","刪除"],
		"Create template":["Create template","創建新模板"]
	});
	
//	objs = getElements(document, "//input[@value='Delete']");
//	for (var i = 0; i < objs.snapshotLength; i++) {
//		obj = objs.snapshotItem(i);
////		obj.value = obj.value.replace("Delete", "刪除");
//		if(i==0){alert(obj.getAttributeNS("contracts.html","getAttributeNS"));}
//	}
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1(甲方) 義務:<");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations:/,"某人 (乙方) 義務:")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/g,"某人(乙方)");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1(乙方) 義務:<")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products:/," 將會立即交易給對方下列物品(雙方同意後):");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money:/," 將會立即交易給對方下列貨幣(雙方同意後):");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt:/," 將會背負下列債務(雙方同意後):");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"必須在$1第$2$3$4個遊戲日之前$5(從貸款合同成立開$6天內)付給"
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

function doContract() {
	allElements = document.getElementById('contentRow').children[1];
	//head
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"合　同");
	allElements = allElements.children[1];
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"合同名稱");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"合同狀態: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"已完成");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"被 $1 拒絕");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"失敗");
	tmp.innerHTML=tmp.innerHTML.replace(/Template/,"模板做成/修改");
	
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"向合同模板中添加新的項目");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"選擇要添加交易的合同方");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"選擇要添加交易的項目類型");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"某人(乙方)");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","金錢"],
			"Product":["Product","物品"],
			"Debt":["Debt","債務"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"貨幣種類和金額( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"物品數量:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"物品種類:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"物品星級:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","鐵"],
			"Grain":["Grain","谷物"],
			"Oil":["Oil","石油"],
			"Stone":["Stone","石材"],
			"Wood":["Wood","木材"],
			"Diamonds":["Diamonds","鑽石"],
			"Weapon":["Weapon","武器"],
			"House":["House","房屋"],
			"Gift":["Gift","禮物"],
			"Food":["Food","食物"],
			"Ticket":["Ticket","機票"],
			"Defense System":["Defense System","防御"],
			"Hospital":["Hospital","醫院"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"債務");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"貨幣種類和金額( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"償還期限:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"物品星級:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"發送合同");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"發送對像");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"注意:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"合同僅能發送給自己的好友");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","某人"],
		"contracts.html":["Go back to contract list","返回合同一覽表"]
	});
	replaceInputByValue({
		"Delete":["Delete","刪除"],
		"Propose":["Propose","確認發送"],
		"Add item":["Add item","添加項目"]
	});
}


//============================================================================
//Monetary Market
//============================================================================
function doMonetaryMarket() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary Market/,"貨幣市場");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Current offers/,"最新賣單");
	
	allElements = document.getElementById('monetaryMarketView');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Show Offers:/,"顯示賣單:");
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency:/,"買入貨幣:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Sell currency:/,"賣出貨幣:");
	
	
	allElements = document.getElementById('contentRow').children[2];
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Your offers/,"自己的賣單");
	
	allElements = document.getElementById('monetaryOfferPost');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Post your Offer:/,"提交自己的賣單:");
	tmp = allElements.childNodes[0];
	tmp.nodeValue=tmp.nodeValue.replace(/Offered currency:/,"賣出貨幣:");
	tmp = allElements.childNodes[4];
	tmp.nodeValue=tmp.nodeValue.replace(/Buy currency:/,"買入貨幣:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate:/,"交易匯率:");
	tmp = allElements.childNodes[13];
	tmp.nodeValue=tmp.nodeValue.replace(/Offer/,"賣出");
	tmp = allElements.childNodes[17];
	tmp.nodeValue=tmp.nodeValue.replace(/at rate/,"匯率是");
	
	
	

	results = getElements(document, "//table[@class='dataTable']");
//	alert(results.snapshotLength);
	for (i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i).children[0].children[0];
//		if (i==0) alert(obj.innerHTML);
		obj.innerHTML=obj.innerHTML.replace(/Seller/,"賣家");
		obj.innerHTML=obj.innerHTML.replace(/Amount/,"數量");
		obj.innerHTML=obj.innerHTML.replace(/Ratio/,"匯率");
		obj.innerHTML=obj.innerHTML.replace(/Buy/,"購買");
//		obj.innerHTML=obj.innerHTML.replace(/Delete/,"刪除");

		if (obj.innerHTML.match("Delete")) {
			obj = results.snapshotItem(i).children[0];
			obj.innerHTML=obj.innerHTML.replace(/>Delete</g,">刪除<");
		}
		
//		if (i==0) alert(results.snapshotItem(i).children.length);
		obj = results.snapshotItem(i).children[0].children[1];
//		if (i==0) alert(obj.innerHTML);
		if (obj.innerHTML.match("No offers")) {
			obj.innerHTML=obj.innerHTML.replace(/No offers/,"無");
		}
		
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Monetary Market":["Monetary market tutorial","關於貨幣市場的說明"]
	});
	replaceInputByValue({
		"Post new offer":["Post new offer","提交賣單"],
		"View offers":["View offers","查看指定賣單"],
		"Swap currencies":["Swap currencies","買賣對像轉換"]
	});
}

//============================================================================
//Presidental Elections
//============================================================================
function doPresidentalElections() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Presidential Elections/,"總統競選");
	
	tmp = allElements.children[1];
	if (tmp.innerHTML) {
		tmp.innerHTML=tmp.innerHTML.replace(/Your vote has been casted successfully/,"投票成功");
		tmp.innerHTML=tmp.innerHTML.replace(/You have already casted your vote/,"你已經投票");
	}
	
	allElements = document.getElementById('presidentalElectionsForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country:/,"國家:");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Date:/,"時期:");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i).children[0].children[0];
		obj.innerHTML=obj.innerHTML.replace(/Candidate/,"候選人");
		obj.innerHTML=obj.innerHTML.replace(/Presentation/,"競選演說");
		obj.innerHTML=obj.innerHTML.replace(/Total votes/,"總票數");

		obj = results.snapshotItem(i).children[0];
		obj.innerHTML=obj.innerHTML.replace(/No candidates/,"無候選人");
		obj.innerHTML=obj.innerHTML.replace(/Presentation/,"競選演說");
		obj.innerHTML=obj.innerHTML.replace(/No presentation/,"無");
		obj.innerHTML=obj.innerHTML.replace(/Your candidate/,"已投票");
	}

	allElements = document.getElementById('command');
	if (allElements && allElements.innerHTML.match("Link to presentation")) {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Link to presentation:/,"演說鏈接:");
		tmp = allElements.parentNode.childNodes[5];
		tmp.nodeValue=tmp.nodeValue.replace(/Candidating for president costs/,"申請總統候選人需要花費");
	}

	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Presidental elections":["Presidential elections tutorial","關於總統競選"]
	});
	replaceInputByValue({
		"Vote":["Vote","投票"],
		"Show":["Show","顯示"],
		"Candidate for president":["Candidate for president","提交候選人申請"]
	});
}

//============================================================================
//Party Elections
//============================================================================
function doPartyElections() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Party Elections/,"黨內競選");
	
	tmp = allElements.children[1];
	if (tmp.innerHTML) {
		tmp.innerHTML=tmp.innerHTML.replace(/Your vote has been casted successfully/,"投票成功");
		tmp.innerHTML=tmp.innerHTML.replace(/You have already casted your vote/,"你已經投票");
	}
	
	allElements = document.getElementById('partyElectionsForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"政黨:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Date:/,"時期:");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i).children[0].children[0];
		obj.innerHTML=obj.innerHTML.replace(/Candidate/,"候選人");
		obj.innerHTML=obj.innerHTML.replace(/Party/,"政黨");
		obj.innerHTML=obj.innerHTML.replace(/Presentation/,"競選演說");
		obj.innerHTML=obj.innerHTML.replace(/Total votes/,"總票數");

		obj = results.snapshotItem(i).children[0];
		obj.innerHTML=obj.innerHTML.replace(/No candidates/,"無候選人");
		obj.innerHTML=obj.innerHTML.replace(/Presentation/,"競選演說");
		obj.innerHTML=obj.innerHTML.replace(/No presentation/,"無");
		obj.innerHTML=obj.innerHTML.replace(/Your candidate/,"已投票");
	}

	allElements = document.getElementById('command');
	if (allElements && allElements.innerHTML.match("Link to presentation")) {
		tmp = allElements.childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Submit your candidature for a party leader of:/,"提交所在政黨黨首競選候選人申請:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Link to presentation:/,"演說鏈接:");
		tmp = allElements.parentNode.childNodes[5];
		tmp.nodeValue=tmp.nodeValue.replace(/Candidating for party leader costs/,"申請黨首候選人需要花費");
	}

	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Party elections":["Party elections tutorial","關於黨內競選"]
	});
	replaceInputByValue({
		"Vote":["Vote","投票"],
		"Show":["Show","顯示"],
		"Candidate for party leader":["Candidate for party leader","提交候選人申請"]
	});
}

//============================================================================
//Login
//============================================================================
function doLogin() {
	allElements = document.getElementById('userMenu');
	tmp = allElements.children[0].children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/You are not logged in/,"未登錄");
	tmp = allElements.children[2].children[1].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Login:/,"<b>※IP+帳號一定不能出問題</b><br><br>用戶名:");
	tmp = allElements.children[2].children[1].children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Password:/,"密碼:");
	replaceLinkByID({
		"forgotPasswordLink":["Forgot password?","忘記密碼？"]
	});
	replaceInputByValue({
		"Login":["Login","登錄"]
	});
	
	tmp = document.createElement("br");
	allElements.insertBefore(tmp, allElements.lastChild.nextSibling);
	tmp = document.createElement("div");
	tmp.className="plate";
	tmp.style.width="93%";
	tmp.innerHTML="<div style='text-align: center'><b>★★★遊戲備忘★★★</b></div><br>"
		+ "QQ群：70741806 <br>"
		+ "<a href='http://e-sim.org/article.html?id=11149'>漢化插件介紹</a><br>"
		+ "<a href='http://userscripts.org/scripts/show/121275'>漢化插件下載</a><br>"
		+ "<a href='http://e-sim.org/article.html?id=6245'>教育部(新人指導及福利)</a>"
		+ "<br><br><br>"
		+ "<div style='text-align: center'><b>！！！帳號注意事項！！！</b></div><br>"
		+ "本遊戲禁止多帳號，審查相當嚴格，懲罰相當嚴厲。審查不僅僅包括同IP的審查，還包括上下線非正常經濟往來，包括各種正常手續下的異常交易。<br>如果你正在或者曾經有過類型的情況，建議在群裡詢問，或者直接在遊戲裡"
		+ "<a href='http://e-sim.org/composeMessage.html?id=31461'>PM我(ein_blue)</a>，我們會很樂意幫助你的。"
		;
	allElements.insertBefore(tmp, allElements.lastChild.nextSibling);
}

//============================================================================
//Regist
//============================================================================
function doRegist() {
	allElements = document.getElementById('registerForm');
	tmp = allElements.parentNode.parentNode.children[0];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/free, massive, multiplayer, social browser game/,"一個免費的, 內容豐富的, 玩家眾多的, 社交類網頁遊戲");
	tmp.innerHTML=tmp.innerHTML.replace(
		/is a simulation[\d\D]*? your choice!/,
		"是現實世界的模擬。<br>在這裡，你可以成為<b>38個虛擬國家</b>當中的虛擬國民。之後，你就可以在這裡大展身手，施展你的<b>政治</b>、<b>軍事</b>以及<b>經濟</b>才能。<br>你的虛擬國民可以成為一個普通的<b>戰士</b>抑或是一個<b>商人</b>，或者是為<b>總統之位</b>而奔走，成為整個國家的領導者！<br><br>在這裡，你可以注重於你個人事業的發展，或者全力幫助你的國家<b>贏得戰爭</b>。你也可以創建自己的<b>私人軍隊</b>或者投資你的<b>貿易帝國</b>——這一切都取決於你的選擇！"
	);
	
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/REGISTER FOR FREE/,"免費注冊");
	
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Login:/,"用戶名:");
	tmp = allElements.children[0].children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/E-mail:/,"郵箱:");
	tmp = allElements.children[0].children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Password:/,"密碼:");
	tmp = allElements.children[0].children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Repeat password:/,"確認密碼:");
	
	tmp = allElements.children[1];
	if (tmp.innerHTML.match("You have been invited to the game by")) {
		tmp.innerHTML=tmp.innerHTML.replace(/You have been invited to the game by/,"你被下面的玩家邀請加入該遊戲<br>");
		tmp.innerHTML=tmp.innerHTML.replace(/You will receive bonus(.*)when you reach <b>level 7<\/b>/,"你將會在等級達到 <b>Lv.7</b> 的時候獲得<br>$1 的獎勵");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(
			/You can receive bonus([\d\D]*)when you reach [\d\D]*?Inviter name/,
			"如果你在這裡輸入推薦人的遊戲名並成功注冊的話，那麼在你的等級升到<b>Lv.7</b>之後，你將獲得$1的獎勵。<br>※如果你看到這段話說明你並沒有通過邀請鏈接過來的，到7級是沒有額外獎勵的。所以這種情況下建議加入QQ群70741806索取鏈接，會有很多<b>好人爭先恐後</b>地要包養你的，或者直接寫上咳血家的ID【ein_blue】，我會負責的！<br> <b>推薦人</b>"
		);
	}
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"選擇虛擬國民的國籍:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Region \(starting location\):/,"地區(遊戲開始時所在地):");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/Please read/,"注冊之前請仔細閱讀");
	tmp.innerHTML=tmp.innerHTML.replace(/the rules/,"遊戲規則");
	tmp.innerHTML=tmp.innerHTML.replace(/before registering/,"");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Be advised, that owning more than one account is forbidden\./,"遊戲禁止多帳號<br><b>★★★判斷方式不僅限於相同IP，包括非正常的經濟往來★★★</b>");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/Playing more than one account will end in/,"某玩家如果有超過一個帳號的話");
	tmp.innerHTML=tmp.innerHTML.replace(/ban of all your accounts\./,"所有帳號都將將會被封停。");
	
	allElements = document.getElementById('registerForm');
	tmp = allElements.parentNode.parentNode.parentNode.children[1];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/Features/,"遊戲特色");
	tmp.innerHTML=tmp.innerHTML.replace(/Join the community of([\d\D]*?)active players/,"成為擁有$1名活躍用戶組成的社區的一員");
	tmp.innerHTML=tmp.innerHTML.replace(/Become a[\d\D]*?of the entire country!/,"成為<b>戰士</b>、<b>商人</b>或者統領全國的<b>領導人</b>");
	tmp.innerHTML=tmp.innerHTML.replace(/<b>Economy[\d\D]*?run entirely by players/,"完全由玩家所運行的<b>經濟系統</b>");
	tmp.innerHTML=tmp.innerHTML.replace(/Balanced [\d\D]*? territories/,"擁有包括38個<a href=\"countryStatistics.html\">國家</a>的228個地區的平衡性良好的<a href=\"googleMap.html\">版圖</a>");
	tmp.innerHTML=tmp.innerHTML.replace(/Run for a [\d\D]*?office/,"可以成為<a href=\"congressElections.html\">議員</a>甚至進駐<a href=\"presidentalElections.html\">總統</a>辦公室");
	tmp.innerHTML=tmp.innerHTML.replace(/Participate in [\d\D]*?battles/,"參與<b>戰爭</b>與<b>戰鬥");
	tmp.innerHTML=tmp.innerHTML.replace(/Become a part of your country [\d\D]*?community/,"成為你所在國家<b>社區的一部分");
	tmp.innerHTML=tmp.innerHTML.replace(/Trade [\d\D]*? with other players/,"與其他玩家交易<a href=\"productMarket.html\">貨物</a>或者<a href=\"monetaryMarket.html\">貨幣</a>");
	tmp.innerHTML=tmp.innerHTML.replace(/Sign [\d\D]*? to other players/,"與其他玩家簽訂<b>合同</b>、<b>貸款</b>或者<b>借款</b>");
	tmp.innerHTML=tmp.innerHTML.replace(/Compete with other players in and gain ([\d\D]*?)achievements/,"與其他玩家進行各種競爭並且可以獲得不同$1成就");
	tmp.innerHTML=tmp.innerHTML.replace(/Earn money by [\d\D]*?managing companies<\/b>/,"通過<b>工作</b>、<b>戰鬥</b>或者<b>經營工廠</b>獲取財富");
	tmp.innerHTML=tmp.innerHTML.replace(/Team up with your friends and create a ([\d\D]*?)military unit/,"和你的朋友們聯合成立$1軍團");
	tmp.innerHTML=tmp.innerHTML.replace(/Become a newspaper redactor and gain ([\d\D]*?)subscribers/,"成為一名報紙編輯者並獲得他人$1訂閱");
	
	tmp.innerHTML=tmp.innerHTML.replace(/Top countries/,"國家 Top 5");
	tmp.innerHTML=tmp.innerHTML.replace(/>Country</,">國家<");
	tmp.innerHTML=tmp.innerHTML.replace(/Total citizens/,"活躍人口");
	
	replaceInputByValue({
		"Register":["Register","注冊"]
	});
}


//============================================================================
//Maintenance
//============================================================================
function doMaintenance() {
	tmp = document.getElementById('navigationRow');
	tmp.innerHTML=tmp.innerHTML.replace(/Maintenance/,"維護");
	tmp.innerHTML=tmp.innerHTML.replace(/We are sorry, the game is in maintenance mode/,"遊戲正在維護中，請稍等片刻（通常5分鐘）");
}

//============================================================================
//Premium account
//============================================================================
function doSubscription() {
	tmp = document.getElementById('contentRow').children[1].children[7];
	tmp.innerHTML="<h2 style='text-align: center'>高級帳號</h2>"
		+ "<i>E-sim</i> 是一款免費的遊戲，任何人均可以免費享受該遊戲。當然，如果你非常熱衷於 <i>E-sim</i> 這款遊戲，那麼你可以申請加入成為高級會員。<br><br>"
		+ "<u>高級帳號</u> 能夠獲得一些有趣的遊戲信息，以及一些有用的高級功能，比如戰場監視功能或者軍團成員消息群發功能等。<br>"
		+ "另外，你的個人信息頁面裡將會有一個<i>星形標識</i>。<br>"
		+ "當然，購買<u>高級帳號</u>的也是對<i>E-sim</i>發展的支持和幫助！"
		+ "<br><br>"
		+ "※非官方說明<br>"
		+ "高級帳號追加了一些有用的功能，不過這些對新人而言卻是沒什麼幫助，雖然對那些遊戲開服1個月內的老妖怪們還是挺有吸引力的。"
		+ "高級帳號每個月需要4.99歐元，相當於40+RMB。<br>"
		+ "下面的詳細介紹暫時就不漢化了，有興趣可以來群裡詢問或者看這裡 "
		+ "<a href='http://e-sim.org/article.html?id=11562'>高級帳戶預告</a><br>"
		;
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

//alert(window.location.href);
//alert(window.location.host);
//alert(window.location.pathname);
//var u;
//u=window.location.pathname

doMenu();

if (document.getElementById('contentRow').children[0].innerHTML.match("You are not logged in")) {
	doLogin();
} else {
	doSide();
}

if (document.getElementById('registerForm')) {
	doRegist();
} else if (window.location.pathname=="/" || isTargetHtml("/index.html")) {
	doHP();
}

if (isTargetHtml("/jobMarket.html")) {
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
} else if (isTargetHtml("/presidentalElections.html")) {
	doPresidentalElections();
} else if (isTargetHtml("/partyElections.html")) {
	doPartyElections();
} else if (isTargetHtml("/maintenance.html")) {
	doMaintenance();
} else if (isTargetHtml("/subscription.html")) {
	doSubscription();
}



//alert(navigator.userAgent.toLowerCase());
//if (!navigator.userAgent.toLowerCase().match("firefox")){alert(navigator.userAgent);}
//else{alert(navigator.userAgent);}
//obj="resource11"
//alert(obj.substring(8,obj.length));