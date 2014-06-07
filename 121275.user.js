// ==UserScript==
// @author         ein_blue
// @name           e-sim
// @namespace      e-sim
// @include        http://e-sim.org*
// ==/UserScript==

//============================================================================
//属性常量
//============================================================================
//---------------------------------------------------
//菜单
//---------------------------------------------------
//菜单 链接
menuLinkReplacements = {
	"work.html"				:["Work","工　作"],
	"train.html"			:["Train","训　练"],
	"companies.html"		:["Companies","工　厂"],
	"newspaper.html"		:["Newspaper","报　纸"],
	"myParty.html"			:["Party","党　派"],
	"contracts.html"		:["Contracts","合　同"],
	"inviteFriends.html"	:["Invite friends","邀　请"],
	"myMilitaryUnit.html"	:["Military unit","军　团"],
	"subscription.html"		:["Premium account","高级帐号"],
	
	
	"productMarket.html"	:["Product market","商品市场"],
	"jobMarket.html"		:["Job market","人才市场"],
	"monetaryMarket.html"	:["Monetary market","货币市场"],
	"companiesForSale.html"	:["Companies for sale","在售工厂"],
	
	"countryStatistics.html"		:["Country statistics","国家统计"],
	"partyStatistics.html"			:["Party statistics","党派统计"],
	"newspaperStatistics.html"		:["Newspaper statistics","新闻统计"],
	"citizenStatistics.html"		:["Citizen statistics","国民统计"],
	"militaryUnitStatistics.html"	:["Military unit stats","军团统计"],
	
	"news.html\?newsType=TOP_ARTICLES"		:["Top articles","头条新闻"],
	"news.html\?newsType=LATEST_ARTICLES"	:["Latest articles","最新时讯"],
	"news.html\?newsType=MILITARY_EVENTS"	:["Military events","军团时事"],
	"news.html\?newsType=POLITICAL_EVENTS"	:["Political events","外交时事"],
	
	"battles.html"							:["Battles","战　场"],
	"countryPoliticalStatistics.html"		:["War and politics","国家政治"],
	"countryEconomyStatistics.html"			:["Economy","国家经济"],
	"countryLaws.html"						:["Laws","国家法律"],
	"partyElections.html"					:["Party elections","党内竞选"],
	"congressElections.html"				:["Congress elections","议员竞选"],
	"presidentalElections.html"				:["Presidential elections","总统竞选"],
	"pendingCitizenshipApplications.html"	:["Citizenship","移　民"],
	"googleMap.html"						:["Map","地　图"],
};

//菜单 文字
menuTextReplacements = {
	"myPlacesButton":["My places","我的地盘"],
	"marketButton":["Market","市场"],
	"statisticsButton":["Statistics","统计"],
	"newsButton":["News","新闻快讯"],
	"electionsButton":["Country","国家"]
};

//---------------------------------------------------
//侧边链接
//---------------------------------------------------
//侧边链接1 <span class='key' ...>
sideLink1Replacements = {
	"crossIcon"	:["Logout","登　出"],
	"workIcon"	:["Work","工　作"],
	"fightIcon"	:["Fight","战　斗"],
	"avatarIcon":["Upload avatar","上传头像"],
	"voteIcon"	:["Vote","投　票"],
};
//侧边链接2 <a href='key' ...>
sideLink2Replacements = {
	"travel.html"	:["Travel","旅行"],
	"pendingCitizenshipApplications.html"	:["change","移民"],
	"http://wiki.e-sim.org/en/Health"	:["Health tutorial","体力相关教程"],
};
//侧边链接3 <a id='key' href="" ...>
sideLink3Replacements = {
	"eatLink"	:["Eat food","啃面包"],
	"useGiftLink":["Use gifts","YY礼物"]
};
//侧边链接4 <input id='key' value="Eat Food" ...>
sideLink4Replacements = {
	"eatButton":["Eat Food","啃面包"],
	"useGiftButton":["Use gift","YY礼物"]
};

//主页 标题
hpTitleReplacements = {
	"News":["News","新闻"],
	"Shouts":["Shouts","频道"],
	"Battles":["Battles","战场"],
	"Events":["Events","事件"]
};

//主页 tabs All
hpTabsReplacements = {
	"#topArticles":["Global","全球焦点"],
	"#latestArticles":["Latest","新闻快讯"],
	"#localArticles":["Local","新闻热点"],
	
	"#countryShouts":["Country","国家频道"],
	"#friendsShouts":["Military unit","军团频道"],
	"#myShouts":["Friends","好友频道"],
	
	"#localBattles":["Country","本国战场"],
	"#substidedBattles":["Subsidized","赏金战场"],
	"#hotBattles":["Important","重要战场"],

	"#localEvents":["Military","本国军事"],
	"#globalEvents":["Military","全球军事"],
	"#politicalEvents":["Political","本国政治"]
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
//共通函数
//============================================================================
//---------------------------------------------------
//是否是FireFox浏览器
//---------------------------------------------------
var isFF = navigator.userAgent.toLowerCase().match("firefox") ? true : false;
//alert(isFF);


//---------------------------------------------------
//使用evaluate从指定的obj中按照条件k进行检索
//---------------------------------------------------
function getElements(obj, k) {
	return document.evaluate(k, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//---------------------------------------------------
//evaluate的后置处理
//从其检索结果objs中，匹配每个结果的href属性然后进行替换
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
//evaluate的后置处理
//从其检索结果objs中，匹配每个结果的innerHTML直接进行匹配替换
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
//直接从replacements的key中在整个document按照ID进行定位，然后匹配替换
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
//在指定的objs中用evaluate方法检索指定k并匹配替换
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
//在指定的objs中用evaluate方法检索指定k并匹配替换
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
//直接检索下面的类型并匹配替换，
//  <span class='key' ...>  key是唯一的
//---------------------------------------------------
function replaceSpanByClass(replacements) {
	replaceCommon(document, replacements, "//span[@class='", "']");
}

//---------------------------------------------------
//直接检索下面的类型并匹配替换，
//  <a href='key' ...>  key是唯一的
//---------------------------------------------------
function replaceLinkByHref(replacements) {
	replaceCommon(document, replacements, "//a[@href='", "']");
}

//---------------------------------------------------
//直接检索下面的类型并匹配替换，
//  <a href='???' ...>  key直接匹配link文字
//---------------------------------------------------
function replaceLinkSSS(replacements) {
	replaceCommonSSS(document, "" ,replacements, "//a[@href", "]");
}

//---------------------------------------------------
//直接检索下面的类型并匹配替换，
//  <a href='key' ...>  key是复数的
//
//	key="#"
//	{ "Report":["Report","举报"],"More shouts":["More shouts","显示更多发言"] }
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
//直接检索下面的类型并匹配替换，
//  <a style='key' ...>  key是复数的
//
//	key="font-weight: bold"
//	{ "More shouts":["More shouts","显示更多频道发言"]] }
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
//直接检索下面的类型并匹配替换，
//  <a id='key' ...>  key是唯一的
//---------------------------------------------------
function replaceLinkByID(replacements) {
	replaceCommon(document, replacements, "//a[@id='", "']");
}

//---------------------------------------------------
//直接检索下面的类型并匹配替换，
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
//直接检索下面的类型并匹配替换，
//  <input value='key' ...>  key是唯一，但替换对象有复数个
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
//直接检索下面的类型并匹配替换，
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
		obj.nodeValue=obj.nodeValue.replace(/(no allies)/,"无同盟");
	}
}
//function replaceNoAlliesChildren(obj) {
//	if (obj.innerHTML.match("no allies")) {
//		obj=tmp.childNodes[3];
//		obj.nodeValue=tmp.nodeValue.replace(/(no allies)/,"无同盟");
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
//			tmp.nodeValue=tmp.nodeValue.replace(/(no allies)/,"无同盟");
//		}
		tmp=results.snapshotItem(i).children[2];
		replaceNoAlliesComm(tmp);
//		if (tmp.innerHTML.match("no allies")) {
//			tmp=tmp.childNodes[3];
////			alert(tmp.nodeValue);
//			tmp.nodeValue=tmp.nodeValue.replace(/(no allies)/,"无同盟");
//		}
//		alert(results.snapshotItem(i).children[3].innerHTML);
		tmp=results.snapshotItem(i).children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"起义战斗");
		tmp=results.snapshotItem(i).children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/(Subsidies:)/,"赏金：");
//		obj = results.snapshotItem(i);
////		alert(obj.innerHTML);
//		obj.innerHTML=obj.innerHTML.replace(/(no allies)/,"无同盟");
//		obj.innerHTML = obj.innerHTML.replace(/(\d*)( allies)/g,"$1 同盟");
//		obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/,"起义战斗");
//		obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/,"赏金：");
	}
}


//---------------------------------------------------
//replace common
//  battle info
//---------------------------------------------------
function replaceBattleInfo(obj) {
	// no allies  
	obj.innerHTML=obj.innerHTML.replace(/(no allies)/g,"无同盟");
	//12 allies
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( allies)/g,"$1 同盟");
	//Resistance war
	obj.innerHTML=obj.innerHTML.replace(/(Resistance war)/g,"起义战斗");
	//Subsidies:
	obj.innerHTML=obj.innerHTML.replace(/(Subsidies:)/g,"赏金：");
//	//: none
//	allElements.innerHTML=allElements.innerHTML.replace(/(: none)/g,"：无");
//	//: 0.02 USD for 1.000 dmg
//	allElements.innerHTML=allElements.innerHTML.replace(/(: )([0-9.]+) (\w*)( for )/g,"：$2 $3" 每);
}

//---------------------------------------------------
//replace common
//  战场一览时间
//  消息时间
//---------------------------------------------------
function replaceBattleTime(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( second[s]* ago)/g,"$1 秒前");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"$1 分钟前");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"$1 小时前");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( day[s]* ago)/g,"$1 天前");
	obj.innerHTML=obj.innerHTML.replace(/(\d*)( month[s]* ago)/g,"$1 月前");
}

//---------------------------------------------------
//replace common
//  主页 报纸文章发布时间 by
//---------------------------------------------------
function replacNewspaperTimeWithAuthor(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( second[s]* ago by)/g,"投稿于 $2 秒前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"投稿于 $2 分钟前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"投稿于 $2 小时前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"投稿于 $2 天前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"投稿于 $2 月前 ");
}

//---------------------------------------------------
//replace common
//  收到订阅报纸的文章
//---------------------------------------------------
function replacNewspaperTime(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( second[s]* ago)/g,"发表于 $2 秒前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago)/g,"发表于 $2 分钟前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago)/g,"发表于 $2 小时前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( day[s]* ago)/g,"发表于 $2 天前 ");
	obj.innerHTML=obj.innerHTML.replace(/(Posted )(\d*)( month[s]* ago)/g,"发表于 $2 月前 ");
}


//---------------------------------------------------
//replace common
//  battle Statistics
//---------------------------------------------------
function replaceBattleStatistics(obj) {
	obj.innerHTML=obj.innerHTML.replace(/(Recent)/g,"正在输出的");
	obj.innerHTML=obj.innerHTML.replace(/(defenders:)/,"防守者:");
	obj.innerHTML=obj.innerHTML.replace(/(attackers:)/,"进攻者:");
	obj.innerHTML=obj.innerHTML.replace(/(Current round statistics)/,"本回合战斗统计信息");
	obj.innerHTML=obj.innerHTML.replace(/(Defenders' total damage:)/,"防守方伤害累计:");
	obj.innerHTML=obj.innerHTML.replace(/(Attackers' total damage:)/,"进攻方伤害累计:");
	obj.innerHTML=obj.innerHTML.replace(/(Your damage:)/,"个人伤害累计:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending countries:)/,"防守方国家累计伤害排行榜:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking countries:)/,"进攻方国家累计伤害排行榜:");
	obj.innerHTML=obj.innerHTML.replace(/(Top defending military units:)/,"防守方军团累计伤害 TOP 5:");
	obj.innerHTML=obj.innerHTML.replace(/(Top attacking military units:)/,"进攻方军团累计伤害 TOP 5:");
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
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( second[s]* ago)/g,"发言于 $2 秒前");
		} else if (obj.innerHTML.match("minute")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"发言于 $2 分钟前");
		} else if (obj.innerHTML.match("hour")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"发言于 $2 小时前");
		} else if (obj.innerHTML.match("day")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"发言于 $2 天前");
		} else if (obj.innerHTML.match("month")) {
			obj.innerHTML = obj.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"发言于 $2 月前");
		} 
	}
//		alert("1-2");
	replaceLinkByHrefSSS("#", {
		"Report":["Report","举报"],
		"Delete":["Delete","删除"],
		"Edit":["Edit","编辑"],
		"More shouts":["More shouts","显示更多发言"]
	});
	
	
	replaceInputByValue({
		"Report":["Report","举报"],
		"Delete":["Delete","删除"],
		"Edit":["Edit","编辑"]
	});	
	
}





//============================================================================
//全局变量（临时）
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Level: )/,"等级: ");
//	tmp.innerHTML=tmp.innerHTML.replace(/(XP:)/,"经验值:");
	tmp = allElements.children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rank:)/,"军衔:");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/(Next rank:)/,"累计伤害:");
	tmp = allElements.childNodes[25];
	tmp.nodeValue=tmp.nodeValue.replace(/(Economy skill:)/,"工作技能:");
	tmp = allElements.childNodes[29];
	tmp.nodeValue=tmp.nodeValue.replace(/(Strength:)/,"力量:");
	tmp = allElements.childNodes[33];
	tmp.nodeValue=tmp.nodeValue.replace(/(Location:)/,"所在地:");
	tmp = allElements.childNodes[41];
	tmp.nodeValue=tmp.nodeValue.replace(/(Citizenship:)/,"国籍:");
	tmp = allElements.childNodes[47];
	tmp.nodeValue=tmp.nodeValue.replace(/(Food limit:)/,"面包剩余次数:");
	tmp = allElements.childNodes[55];
	tmp.nodeValue=tmp.nodeValue.replace(/(Gift limit:)/,"礼物剩余次数:");

	allElements = document.getElementById('userMenu').children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your money)/,"货 币 资 产");
	allElements.innerHTML=allElements.innerHTML.replace(/(Your inventory)/,"货 物 资 产");
	allElements = document.getElementById('userMenu').children[4];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your messages)/,"消 息 通 知");
	allElements = document.getElementById('contentRow').children[0].children[2];
	allElements.innerHTML=allElements.innerHTML.replace(/(Your today's tasks:)/,"日 常 任 务");
	
	//旅行 移民 体力说明
	replaceLinkByHref(sideLink2Replacements);
	//面包 礼物
	replaceLinkByID(sideLink3Replacements);
	//面包-2 礼物-2
	replaceInputByID(sideLink4Replacements);
	//登出 战斗 工作 训练
	replaceSpanByClass(sideLink1Replacements);
	

	results = getElements(document, "//option[@value]");
//	alert(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i);
		if (obj.innerHTML.match("Current")) {
			obj.innerHTML=obj.innerHTML.replace(/(Current round)/,"战斗中回合");
		} else if (obj.innerHTML.match("Round ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Round )(\d*)/,"第 $2 回合");
		} else if (obj.innerHTML.match("Food ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Food type)/,"选择食物星级");
		} else if (obj.innerHTML.match("Gift ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Gift type)/,"选择礼物星级");
		} else if (obj.innerHTML.match("Unarmed ")) {
			obj.innerHTML=obj.innerHTML.replace(/(Unarmed \()/,"空手开撸 (基础伤害 ");
		} else if (obj.innerHTML.match("Any quality")) {
			obj.innerHTML=obj.innerHTML.replace(/(Any quality)/,"任意星级");
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
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( minute[s]* ago by)/g,"投稿于 $2 分钟前 ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( hour[s]* ago by)/g,"投稿于 $2 小时前 ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( day[s]* ago by)/g,"投稿于 $2 天前 ");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Posted )(\d*)( month[s]* ago by)/g,"投稿于 $2 月前 ");
	}
	
//	alert(1);
	//Shouts content
//	for (kk in hpContentShoutsReplacements) {
//		allElements = document.getElementById(kk);
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( minute[s]* ago)/g,"发言于 $2 分钟前");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( hour[s]* ago)/g,"发言于 $2 小时前");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( day[s]* ago)/g,"发言于 $2 天前");
//		allElements.innerHTML=allElements.innerHTML.replace(/(posted )(\d*)( month[s]* ago)/g,"发言于 $2 月前");
		
//	}
	
//	alert(2);
	replaceAlliesLink();
	replaceAlliesLink2();
	replaceAlliesLinksss();
	
	replaceLinkSSS({
		"Show more battles":["Show more battles","显示更多战场"],
		"Subsidies informations":["Subsidies informations","关于赏金战场的说明"]
	});
	//Battles content
	for (kk in hpContentBattlesReplacements) {
		allElements = document.getElementById(kk);
		
		//"No subsidized battles":["No subsidized battles","无赏金战场"],
		if (allElements.innerHTML.match("No subsidized battles")) {
			allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"无赏金战场");
		}
		if (allElements.innerHTML.match("No battles in your country")) {
			allElements.innerHTML=allElements.innerHTML.replace(/No battles in your country/,"所在地的国家没有任何战场");
		}
		
		
//		replaceBattleInfo(allElements);
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more battles":["Show more battles","显示更多战场"] });
//		allElements.innerHTML=allElements.innerHTML.replace(/(Show more battles)/g,"显示更多战场");
//		allElements.innerHTML=allElements.innerHTML.replace(/(No subsidized battles)/,"无赏金战场");
//		allElements.innerHTML=allElements.innerHTML.replace(/(Subsidies informations)/,"关于赏金战场的说明");
		
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
		tmp.innerHTML=tmp.innerHTML.replace(/Presidential elections .* till 5th to/,"总统选举定于每个月5号举行。<br>你可以在5号之前");
		tmp.innerHTML=tmp.innerHTML.replace(/submit your candidature/,"提交你的候选人申请");
		tmp.innerHTML=tmp.innerHTML.replace(/Today is presidential elections day! You have time till 23:59 to ([\d\D]*?)cast your vote/,"今天是总统大选日！<br>请在游戏时间23:59前$1投出你手中神圣的一票");
		//Party leader elections are scheduled on 15th day each month. You have time till 14th to
		tmp.innerHTML=tmp.innerHTML.replace(/Party leader [^<]*?(<[^>]*>)[^<]*(<[^>]*>).*in your party/,"党首竞选定于每个月15号举行。<br>你可以在14号之前 $1提交你的候选人申请$2 来参加党内竞选。");
	}
	
	//MU
	allElements = document.getElementById('contentRow').children[2].children[0+rowoffset];
	if (allElements.innerHTML.match("Your military unit orders:")) {
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your military unit orders:)/,"军令:");
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/(Fight for:)/,"阵营:");
	}
	
	//Events content
	for (kk in hpContentEventsReplacements) {
		allElements = document.getElementById(kk);
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( minute[s]* ago)/g,"发生在 $1 分钟前");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( hour[s]* ago)/g,"发生在 $1 小时前");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( day[s]* ago)/g,"发生在 $1 天前");
		allElements.innerHTML=allElements.innerHTML.replace(/(\d*)( month[s]* ago)/g,"发生在 $1 月前");
		
		//Bulgaria secured Sumadija in the battle versus Serbia
		allElements.innerHTML=allElements.innerHTML.replace(/( secured )([a-zA-Z ]*)( in the battle versus )/g," 在战斗中成功守住了 $2，敌方是 ");
		//People of started a resistance in Belgrade
		allElements.innerHTML=allElements.innerHTML.replace(/(People of )(<[^>]+>)(  started a resistance in )([^<]*)(<[^>]+>)/g,"$2 国民在 $4 $5 发动了起义");
		//was attacked by Indonesia
		allElements.innerHTML=allElements.innerHTML.replace(/(was attacked by )([^<]*)(<[^>]+>)/g,"遭到了 $2$3 的进攻");
		//President of Poland proposed to declare war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(President of )([^<]*)(<[^>]+>)([ ]*proposed to declare war to )([^<]*)(<[^>]+>)/g,"$2$3 总统提出议案 计划向 $5$6 宣战");
		//Poland  has declared war to Lithuania
		allElements.innerHTML=allElements.innerHTML.replace(/(has declared war to )([^<]*)(<[^>]+>)/g,"发布宣战布告 正式向 $2$3 宣战");
		//Australia conquered Queensland in the battle versus Argentina 
		allElements.innerHTML=allElements.innerHTML.replace(/( conquered )([^<]*)( in the battle versus )/g," 通过战斗成功占领了 $2，敌方是 ");
		
		//replaceInnerHTML(getElements(allElements, "//a[@href]"), { "Show more events":["Show more events","显示更多事件"] });
		allElements.innerHTML=allElements.innerHTML.replace(/(Show more events)/g,"显示更多事件");
	}
	
	//shouts
	allElements = document.getElementById("command");
	//Write a new shout:
	allElements.innerHTML=allElements.innerHTML.replace(/(Write a new shout:)/,"请写下你的发言内容：");
	//
	allDivs = getElements(allElements, "//input[@value='Shout!']");
	allDivs.snapshotItem(0).value="发言"
	//Send to channels: 
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"　　发送频道：");
	} else {
		allElements.innerHTML=allElements.innerHTML.replace(/(Send to channels:)/,"　发送频道：");
	}
	// - Country  -  Military Unit - Friends 
	allElements.innerHTML=allElements.innerHTML.replace(/(\- Country)([^\-]*)(\-  Military Unit)([^\-]*)(\- Friends)/,"- 国家　$2- 军团　$4 - 好友");
	//Characters remaining: 100
	//alert(allElements.innerHTML);
	//allElements.innerHTML=allElements.innerHTML.replace(/(Characters remaining:)/,"还能输入的字数：");
	//alert(allElements.innerHTML);
	
	doShoutsComm();
	
	replaceLinkByStyleSSS("font-weight: bold", { "More shouts":["More shouts","显示更多频道发言"] });
}

//============================================================================
//Job Market
//============================================================================
function doJobMarket() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Job Market)/,"人才市场");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Selection criteria:)/,"工作信息选项:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Country:)/,"国家:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Economic skill:)/,"工作等级:");
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"雇主");
	tmp.innerHTML=tmp.innerHTML.replace(/(Company)/,"工厂");
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"产品");
	tmp.innerHTML=tmp.innerHTML.replace(/(Minimal skill)/,"工作等级要求");
	tmp.innerHTML=tmp.innerHTML.replace(/(Salary)/,"薪水");
	tmp.innerHTML=tmp.innerHTML.replace(/(Apply)/,"申请");
	
	replaceInputByValue({"Apply":["Apply","申请"],"Show":["Show","显示"]});
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
		xxx.innerHTML=xxx.innerHTML.replace(/(You have no job)/,"失业中…");
		replaceInputByValue({"Get a job now!":["Get a job now!","找工作去!"]});
	} else if (allElements.innerHTML.match("Your workplace")) {
		idxoffset = 0;
		if (allElements.innerHTML.match("stay in a country")) {
			tmp = allElements.children[1];
			tmp.innerHTML=tmp.innerHTML.replace(/You need to stay in a country where company is located to work/,"你工作的工厂并不在你所在地的国家境内，你可以移动到工厂所在的国家境内工作，或者重新找一份工作。");
			idxoffset = 2;
		}
		
		tmp = allElements.children[1+idxoffset];
		tmp.innerHTML=tmp.innerHTML.replace(/(Your workplace)/,"工作场所");
		tmp.innerHTML=tmp.innerHTML.replace(/(Employer)/,"雇主");
		tmp.innerHTML=tmp.innerHTML.replace(/(Salary:)/,"薪水:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Leave job)/,"炒老板鱿鱼");
		
		if (allElements.innerHTML.match("You have not worked today")) {
			xxx = document.getElementById('command').parentNode.children[0];
			xxx.innerHTML=xxx.innerHTML.replace(/(You have not worked today)/,"今天尚未工作");
			replaceInputByValue({"Work now":["Work now","立即工作"]});
		} else {
			tmp = allElements.children[4];
			tmp.innerHTML=tmp.innerHTML.replace(/(Today work results)/,"本日工作成果");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Gross salary)/,"税前薪水");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your Net salary)/,"税后净收入");
			tmp.innerHTML=tmp.innerHTML.replace(/(Income tax paid)/,"缴纳个人所得税");
			tmp.innerHTML=tmp.innerHTML.replace(/(Worked at)/,"工作单位");
			tmp.innerHTML=tmp.innerHTML.replace(/(XP gained )/,"获得经验值");
			tmp.innerHTML=tmp.innerHTML.replace(/(Economy skill gained)/,"获得工作技能");
			tmp.innerHTML=tmp.innerHTML.replace(/(Working days in a row)/,"连续工作天数");
			tmp.innerHTML=tmp.innerHTML.replace(/(Your base productivity)/,"基础产量");
			tmp.innerHTML=tmp.innerHTML.replace(/(Productivity modifiers)/,"产量加成");
			tmp.innerHTML=tmp.innerHTML.replace(/(Total productivity)/,"产量合计");
			tmp.innerHTML=tmp.innerHTML.replace(/(Units produced)/,"实际产出");
			//+60% Raw company quality 
			tmp.innerHTML=tmp.innerHTML.replace(/(Raw company quality)/,"该公司基础产量");
		}
	}
}


//============================================================================
//Product Markets
//============================================================================
function doProductMarkets() {
	rr = {
		"1":["Any","任意"],
		"2":["Iron","铁"],
		"3":["Grain","谷物"],
		"4":["Oil","石油"],
		"5":["Stone","石材"],
		"6":["Wood","木材"],
		"7":["Diam.","钻石"],
		"8":["Weap.","武器"],
		"9":["House","房屋"],
		"10":["Gift","礼物"],
		"11":["Food","食物"],
		"12":["Ticket","机票"],
		"13":["DS","防御"],
		"14":["Hosp.","医院"]
	};
	
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Marketplace)/,"商品市场");
	
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace("Show Offers:","显示商品价格:");
	tmp.innerHTML=tmp.innerHTML.replace("Country:","国家:");
	tmp.innerHTML=tmp.innerHTML.replace("Quality:","　品质星级:");
	
	replaceInputByValue({"View offers":["View offers","显示报价单"],"Buy":["Buy","购买"]});
	
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
	replaceLinkByHrefSSS("citizenMarketOffers.html", {"Show my offers":["Show my offers/post new offer","显示在售商品 / 新品上架"]})
	
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/(Product)/,"商品");
	tmp.innerHTML=tmp.innerHTML.replace(/(Seller)/,"卖家");
	tmp.innerHTML=tmp.innerHTML.replace(/(Stock)/,"存货");
	tmp.innerHTML=tmp.innerHTML.replace(/(Price)/,"单价");
	tmp.innerHTML=tmp.innerHTML.replace(/(Buy)/,"购买");
	tmp.innerHTML=tmp.innerHTML.replace(/( items )/g," 个/件　");
	
	replaceLinkByHref({
		"citizenMarketOffers.html":["Show my offers/post new offer","显示在售商品 / 新品上架"],
		"http://wiki.e-sim.org/en/Category:Products":["Products info","商品相关说明"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/(Military training)/,"军事训练");
	
	tmp = allElements.children[1];
	var rowoffset = 0;
	//not train
	if (tmp.innerHTML.match("Training complete. Please come back tomorrow")) {
		replaceInputByValue({"Train":["Train","训练"]});
		tmp.innerHTML=tmp.innerHTML.replace(/(Training complete. Please come back tomorrow)/,"训练结束，请明天再来。");
		rowoffset = 2;
	//already trained
	} else if (tmp.innerHTML.match("You have already trained today^\.")) {
		tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today)/,"今天已经训练过了, 无法再次训练!");
		rowoffset = 2;
	}
	
	tmp = allElements.children[1+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(You have already trained today. Please come back tomorrow.)/,"今天的训练已经结束，请明天再来继续训练。");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength gained:)/,"获得力量:");
	
	tmp = allElements.children[4+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/(Military details)/,"个人军事信息");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total training sessions:)/,"总训练次数:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Strength:)/,"力量:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Military rank:)/,"军衔:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done:)/,"累计伤害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with no weapon:)/,"未装备武器伤害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q1 weapon:)/,"装备Q1武器伤害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q2 weapon:)/,"装备Q2武器伤害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q3 weapon:)/,"装备Q3武器伤害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q4 weapon:)/,"装备Q4武器伤害:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Damage with Q5 weapon:)/,"装备Q5武器伤害:");
	
}

//============================================================================
//Battles List 战场一览
//============================================================================
function doBattlesList() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Battles)/,"战场信息");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/(Country)/,"国家");
	tmp.innerHTML=tmp.innerHTML.replace(/(Sorting:)/,"排序方式:");
	tmp.innerHTML=tmp.innerHTML.replace(/(Only subsidized Battles:)/,"只显示赏金战场:");
	
	replaceInputByValue({"Show battles":["Show battles","显示战场信息"]});
	
	allElements = document.getElementById('battlesTable');
	tmp = allElements.children[0].children[0];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle start)/,"开战时间");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle)/,"战场");
	tmp.innerHTML=tmp.innerHTML.replace(/(defender vs attacker)/,"防守方 vs 进攻方");
	tmp.innerHTML=tmp.innerHTML.replace(/(Score)/,"比分");
	tmp.innerHTML=tmp.innerHTML.replace(/(Total damage done)/,"累计伤害");
	
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
//Battle 具体某场战斗
//============================================================================
function doBattle() {
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//战场信息 时间 回合数等
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
//	var allElements;
//	allElements = document.getElementById('contentRow').children[1];
	allElements = document.getElementById('battleBar').parentNode;
	
//	tmp = allElements.children[1].children[0].children[2];
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/(Resistance war)/,"起义战斗");
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"发动者是");
	
	tmp = allElements.children[4];
	replaceNoAlliesComm(allElements.children[4]);
	replaceNoAlliesComm(allElements.children[7]);
//	alert(allElements.children[7].innerHTML);
	replaceAlliesLink();
	
	tmp = allElements.children[6].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"第 $2 回合");
	
	tmp = allElements.children[11];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"防守方胜利回数");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"进攻方胜利回数");	

	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//战斗信息 Top3
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('topDefender1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top defenders)/,"防守方输出 TOP 3");
	tmp = document.getElementById('topAttacker1').parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/(Top attackers)/,"进攻方输出 TOP 3");
	
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//战斗指令
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	
//	tmp = allElements.children[3];
	allElements = document.getElementById('contentRow').children[1].children[3].children[0].children[0].children[1].children[0];
//	alert(allElements.innerHTML);
	//普通 跨地域无法战斗
	//起义 跨地域无法战斗
	//战斗结束
	//普通战斗
	//起义战斗

	if (allElements.innerHTML.match("occupant country to")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"你在现所在地无法参加该场战斗，");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"只有移动到该场战斗双方国家的任意一方的占有地才能参战。");
	} else if (allElements.innerHTML.match("countries participating")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"你在现所在地无法参加该场战斗，");
		allElements.innerHTML=allElements.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"只有移动到该场战斗双方国家的任意一方的占有地才能参战。");
	} else if (allElements.innerHTML.match("was won by")) {
		allElements.innerHTML=allElements.innerHTML.replace(/(This round was won by:)/g,"本回合胜利方是:");
	} else {
//		if (isFF) {
//			//fight button
//			replaceInputByClassSSS("fightButton", 
//				{
//					"1 hit":["Fight (1 hit)","单次攻击"],
//					"5 hits":["Berserk! (5 hits)","狂暴攻击! (5连击)"]
//				}
//			);
//		}
		
		//text
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"选择武器:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"选择己方阵营:");
		tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"己方阵营:");
	}
	
	
	//回合显示
	if (isFF) {
		allElements.innerHTML=allElements.innerHTML.replace(/(Show round:)/,"显示指定回合信息:");
	}
	replaceInputByValue({"Show round":["Show round","显示回合信息"]});
	
//	tmp.innerHTML=tmp.innerHTML.replace(/(You can't fight in this battle from your current location.)/,"你在现所在地无法参加该场战斗，");
//	tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to the occupant country to participate in the battle.)/,"只有移动到该场战斗双方国家的任意一方的占有地才能参战。");
//	tmp.innerHTML=tmp.innerHTML.replace(/(You must travel to one of the countries participating in the battle.)/,"只有移动到该场战斗双方国家的任意一方的占有地才能参战。");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Show round:)/,"显示指定回合信息:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Current round)/,"战斗中回合");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/g,"第 $2 回合");
//	replaceInputByValue({"Show round":["Show round","显示回合信息"]});
//	tmp.innerHTML=tmp.innerHTML.replace(/(This round was won by:)/g,"本回合胜利方是:");
//	
//	tmp.innerHTML=tmp.innerHTML.replace(/(Select weapon:)/,"选择武器:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Select your side:)/,"选择阵营:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your fighting side:)/,"你的阵营:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Fight (1 hit))/,"单次攻击");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Berserk! (5 hits))/,"狂暴攻击! (5连击)");
//	replaceInputByValue({"Fight (1 hit)":["Fight (1 hit)","单次攻击"],"Berserk! (5 hits)":["Berserk! (5 hits)","狂暴攻击! (5连击)"]});
	
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	//战场统计
	//+++++++++++++++++++++++++++++++++++++++++++++++++++
	tmp = document.getElementById('contentRow').children[1].children[4];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Show overall battle stats)/,"显示该战场所有战斗统计信息");
	tmp.innerHTML=tmp.innerHTML.replace(/(Fighting tutorial on wiki)/,"战斗教程");
	tmp.innerHTML=tmp.innerHTML.replace(/(Battle rules)/,"战场规则");
	
//	allElements = document.getElementById('fightStatus');
//	tmp = allElements.children[0];
//	tmp.innerHTML=tmp.innerHTML.replace(/(Waiting for results...)/,"等待结果返回:");
//	tmp = allElements.children[1];
//	tmp.innerHTML=tmp.innerHTML.replace(/(Damage done:)/,"造成伤害:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(XP gained:)/,"获得经验值:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Health:)/,"体力:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Location bonus:)/,"战场加成:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Fight bonuses)/,"关于战斗加成");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your total damage:)/,"累计伤害:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Damage required for next rank:)/,"军衔升级所需伤害:");
//	tmp.innerHTML=tmp.innerHTML.replace(/(Your health:)/,"当前体力:");
}

//============================================================================
//Battle Statistics 所有战斗统计信息
//============================================================================
function doBattleStatistics() {
	var allElements;
	allElements = document.getElementById('contentRow').children[1];
	
	var tmp;
	tmp = allElements.children[0];
	replaceBattleInfo(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(started by)/,"发动者是");
	tmp.innerHTML=tmp.innerHTML.replace(/(Round )(\d*)/,"第 $2 回合");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by defender)/,"防守方胜利回数");
	tmp.innerHTML=tmp.innerHTML.replace(/(Rounds won by attacker)/,"进攻方胜利回数");
	tmp.innerHTML=tmp.innerHTML.replace(/(Back to battle)/,"返回战斗模式");
	
	tmp = allElements.children[3];
	replaceBattleStatistics(tmp);
	tmp.innerHTML=tmp.innerHTML.replace(/(Statistics are generated once per 30 minutes)/,"统计信息的更新间隔为30分钟");
}


//============================================================================
//Profile
//============================================================================
function doProfile() {
	allElements = document.getElementById('contentRow').children[1];
	
	//name
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizen /,"公民 ");
	//on-off line
	tmp = allElements.children[0].children[1];
	if (tmp.innerHTML.match("Online")) {
		tmp.innerHTML=tmp.innerHTML.replace(/Online/,"在线");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(/Offline/,"离线");
	}
	
	replaceLinkByHrefSSS("editCitizen.html", {
		"Edit profile":["Edit profile","修改个人设置"]
	});
	replaceLinkByHrefSSS("#", {
		"Report multi":["Report multi","举报一人多号"]
	});
	replaceInputByValue({"Report multi":["Report multi","举报一人多号"]});

//	results = getElements(document, "//table[@class='attributesTable']");
//	if (results.snapshotLength > 0) {
//		obj = results.snapshotItem(0);
//		obj.innerHTML=obj.innerHTML.replace(/Level:/,"等级:");
//		obj.innerHTML=obj.innerHTML.replace(/XP:/,"经验值:");
//		obj.innerHTML=obj.innerHTML.replace(/Damage:/,"累计伤害:");
//		obj.innerHTML=obj.innerHTML.replace(/Rank:/,"军衔:");
//		obj.innerHTML=obj.innerHTML.replace(/Economy skill:/,"工作技能:");
//		obj.innerHTML=obj.innerHTML.replace(/Strength:/,"力量:");
//		obj.innerHTML=obj.innerHTML.replace(/location:/,"所在地:");
//		obj.innerHTML=obj.innerHTML.replace(/Citizenship:/,"国籍:");
//	}

	
	allElements = allElements.children[2].children[0].children[0];
	tmp = allElements.children[0].children[0];
	rowoffset = 0;
	if (tmp.innerHTML.match(" banned")) {
		rowoffset = 2;
		tmp.innerHTML=tmp.innerHTML.replace(/Permanently banned/,"该帐号永久封停");
		tmp.innerHTML=tmp.innerHTML.replace(/Temporary banned/,"该帐号暂时封停");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned until:/,"封停期:");
		tmp.innerHTML=tmp.innerHTML.replace(/Reason:/,"原因:");
		tmp.innerHTML=tmp.innerHTML.replace(/Banned by:/,"执行人:");
	}
	
//	alert(allElements.innerHTML);
	tmp = allElements.children[0].children[2+rowoffset];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/Level:/,"等级:");
	tmp.innerHTML=tmp.innerHTML.replace(/XP:/,"经验值:");
	tmp.innerHTML=tmp.innerHTML.replace(/Damage:/,"累计伤害:");
	tmp.innerHTML=tmp.innerHTML.replace(/Rank:/,"军衔:");
	tmp.innerHTML=tmp.innerHTML.replace(/Economy skill:/,"工作技能:");
	tmp.innerHTML=tmp.innerHTML.replace(/Strength:/,"力量:");
	tmp.innerHTML=tmp.innerHTML.replace(/Location:/,"所在地:");
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"国籍:");
	tmp.innerHTML=tmp.innerHTML.replace(/Birthday:/,"诞生日:");
	
	tmp = allElements.children[0].children[5+rowoffset];
	tmp.innerHTML=tmp.innerHTML.replace(/Military unit:/,"军团:");
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"党派:");
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper:/,"报纸:");
	tmp.innerHTML=tmp.innerHTML.replace(/Working at:/,"工作:");
	tmp.innerHTML=tmp.innerHTML.replace(/Owned companies/,"所有工厂");
	tmp.innerHTML=tmp.innerHTML.replace(/Political office:/,"政治职务:");
	//no
	tmp.innerHTML=tmp.innerHTML.replace(/No military unit/,"无");
	tmp.innerHTML=tmp.innerHTML.replace(/No party/,"无");
	tmp.innerHTML=tmp.innerHTML.replace(/No newspaper/,"无");
	tmp.innerHTML=tmp.innerHTML.replace(/No workplace/,"无");
	tmp.innerHTML=tmp.innerHTML.replace(/No companies/,"无");
	tmp.innerHTML=tmp.innerHTML.replace(/No office/,"无");
	
//	allElements = document.getElementById('contentRow').children[2];
//	tmp = allElements.children[0].children[0];
	allElements = getElements(document, "//ul[@style]");
//	alert(allElements.snapshotLength);
	
//	rowoffset = 0;
	if (allElements.snapshotLength > 0) {
		tmp = allElements.snapshotItem(0).parentNode;
		if (tmp.innerHTML.match("Active debts")) {
//			rowoffset += 2;
			tmp.innerHTML=tmp.innerHTML.replace(/Active debts/,"负债一览表");
			//tmp.innerHTML=tmp.innerHTML.replace(/(payback time )(\d*)( game day)/,"距离债务回收期限还有 $2 天");
			tmp.innerHTML=tmp.innerHTML.replace(/(payback time )/g,"债务偿还期限是 ");
			tmp.innerHTML=tmp.innerHTML.replace(/(\d*)( game day)/g,"$1 day");
		}
	}
	
	allElements = document.getElementById('medals');
	tmp = allElements.parentNode.nextElementSibling.nextElementSibling.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Friends/,"好友一览表");
	
	tmp = allElements.parentNode.parentNode.children[0];
	if (tmp.innerHTML.match("This citizen has been inactive for")) {
		tmp.innerHTML=tmp.innerHTML.replace(/This citizen has been inactive for (\d*) days/,"该Citizen已经连续 $1 天未登录了");
	}
	
//	alert(allElements.snapshotItem(0).parentNode.children[0].innerHTML);
	
	
	allElements = document.getElementById('countryShouts');
	allElements.parentNode.children[0].innerHTML=allElements.parentNode.children[0].innerHTML.replace(/Shouts:/,"国家频道发言:");
	
	doShoutsComm();
}


//============================================================================
//Edit Citizen
//============================================================================
function doEditCitizen() {
	allElements = document.getElementById('editCitizenForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Mail:/,"邮箱:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New password:/,"新密码:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/New password repeat:/,"再重复一次:");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Old password:/,"旧密码:");
	tmp = allElements.children[16];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"新头像:");
	tmp = allElements.childNodes[30];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","文件尺寸小于");
	
	replaceInputByValue({"Edit citizen":["Edit citizen","确定编辑"]});
}

//============================================================================
//Travel
//============================================================================
function doTravel() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Travel/,"旅　行");
	tmp = allElements.children[1];
	if (tmp.innerHTML.match("img")) {
		tmp.innerHTML=tmp.innerHTML.replace(/You have moved to /,"你已经到达 ");
		tmp.innerHTML=tmp.innerHTML.replace(/You selected wrong region/,"地区选择错误，或者你已经位于选择地区");
		tmp.innerHTML=tmp.innerHTML.replace(/You have no selected ticket in stock/,"选择使用的机票已经没有库存");
	}
	
	allElements = document.getElementById('citizenTravelForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country/,"国家");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Region:/,"地区:");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace(/Ticket Quality:/,"机票星级:");
	
	replaceInputByValue({"Travel":["Travel","旅行开始"]});
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Traveling":["Traveling tutorial on wiki","旅行相关说明"]
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
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"消息内容");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"时间");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"删除");
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
		"sentMessages.html":["Sent messages","发件箱"],
		"composeMessage.html":["Compose message","新建信息"]
	});
	replaceInputByValue({
		"Delete":["Delete","删除选中"],
		"Quick reply":["Quick reply","快速回复"],
		"Report":["Report","举报"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","举报"],
		"Quick reply":["Quick reply","快速回复"]
	});
	replaceHerf(getElements(document, "//a[@href]"), {
		"composeMessage.html":["Reply","回复"],
		"conversation.html":["Previous messages","历史消息"]
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
		"sentMessages.html":["Sent messages","发件箱"]
	});
	
	allElements = document.getElementById('sendMessageForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Receiver:/,"收信人:");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Title:/,"标题:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"消息正文:");
	
	replaceInputByValue({
		"Send":["Send","发送"],
		"Preview":["Preview","预览"]
	});
}

//============================================================================
//Notifications
//============================================================================
function doNotifications() {
	allElements = document.getElementById('contentRow').children[1];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Notifications/,"系统消息");

	replaceInputByValue({
		"Delete All":["Delete All","删除全部"],
		"Delete":["Delete","删除选择"]
	});
	
//	replaceLinkByHref({
//		"inboxMessages.html":["Inbox messages","收件箱"],
//		"sentMessages.html":["Sent messages","发件箱"]
//	});

	allElements = document.getElementById('command').children[1].children[0];
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Type/,"消息类型");
	tmp.innerHTML=tmp.innerHTML.replace(/Message/,"消息内容");
	tmp.innerHTML=tmp.innerHTML.replace(/Date/,"时间");
	tmp.innerHTML=tmp.innerHTML.replace(/Remove/,"删除");
	
	
	
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
			msg.innerHTML=msg.innerHTML.replace(/(has offered you to sign a)(.*)(contract)(.*)(Please read it carefully before accepting it, make sure that citizen doesn't want to cheat you!)/,"向你发送了$2合同$4请在同意该合同前仔细确认，以免上当受骗! (特别注意陌生人)");
		} else if (obj.innerHTML.match("Citizen")) {
			obj.innerHTML=obj.innerHTML.replace(/Citizen progress alert/,"Citizen 成长");
			msg.innerHTML=msg.innerHTML.replace(/(Your friend)(.*)(has reached level )(\d*)( and you have been awarded with )(.*)(referral bonus)/,"你的好友$2等级升到了 Lv.$4 所以你获得了 $6的推荐奖励");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations! You have been promoted to )(.*)(\. Your further damage will be increased by your new rank\.)/,"恭喜! 军衔升级到了 $2，你的输出伤害将会因此而提高。");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations! You have reached level )(\d*)(\. You have been awarded with )(.*)/,"恭喜! 你的等级升到了 Lv.$2 并获得了 $4 的奖励");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations! You have reached level )(\d*)(\.)/,"恭喜! 你的等级升到了 Lv.$2");
		} else if (obj.innerHTML.match("Monetary")) {
			obj.innerHTML=obj.innerHTML.replace(/Monetary market alert/,"汇市交易");
			msg.innerHTML=msg.innerHTML.replace(/(Your )(.*)(was sold for)(.*)(to citizen)(.*)(on monetary market)/,"你在货币市场挂出的单子，其中 $2 以 $4的价格被 Citizen$6 购买了");
		} else if (obj.innerHTML.match("Military")) {
			obj.innerHTML=obj.innerHTML.replace(/Military Unit/,"军团");
			msg.innerHTML=msg.innerHTML.replace(/(has promoted you to)(.*)(in your military unit)/,"任命你为军团的$2");
			msg.innerHTML=msg.innerHTML.replace(/(has accepted your application to join his\/her military unit)/,"已经审批通过了你的加入军团的申请");
			msg.innerHTML=msg.innerHTML.replace(/(Your military group  donated you)(.*)(Donation reason:)/,"你的军团向你捐赠(D)了$2捐赠理由:");
			msg.innerHTML=msg.innerHTML.replace(/(Your military group  donated you)/,"你的军团向你捐赠(D)了$2");
		} else if (obj.innerHTML.match("Other")) {
			obj.innerHTML=obj.innerHTML.replace(/Other alert/,"其他");
			msg.innerHTML=msg.innerHTML.replace(/(Player)(.*)(proposed you to)(.*)(add you to friends list)(.*)/,"玩家$2向你申请互加好友 $4点此确认$6");
			msg.innerHTML=msg.innerHTML.replace(/(Player)(.*)(has added you to friend list)/,"玩家$2同意了你的互粉申请");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations!)(.*)(Your friend)(.*)(has reached level )(\d*)( and you have been awarded with )/,"恭喜!$2你的好友$4等级升到了 Lv.$6 所以你获得了 ");
			msg.innerHTML=msg.innerHTML.replace(/(has registered using your reflink\.)/,"使用了你的邀请链接并注册成功");
			msg.innerHTML=msg.innerHTML.replace(/(Your have been awarded with additional)(.*)(for  registering from)(.*)(reflink)/,"因为使用了$4的邀请链接 你额外获得了 $2 的奖励");
		} else if (obj.innerHTML.match("Company")) {
			obj.innerHTML=obj.innerHTML.replace(/Company alert/,"工厂");
			msg.innerHTML=msg.innerHTML.replace(/(Your employeer)(.*)(has increased your salary from)(.*)(to)/,"你的雇主$2提高了你的薪水 从$4提高到了");
			msg.innerHTML=msg.innerHTML.replace(/(Your employeer)(.*)(has lowered your salary from)(.*)(to)(.*)(\. If you don't like it, you can leave your job and find a better one on job market. )/,"你的雇主$2降低了你的薪水 从$4降低到了$6。如果对此不满，你可以先炒了你老板的鱿鱼，然后在人才市场上找份更好的工作～");
			msg.innerHTML=msg.innerHTML.replace(/(Unfortunately, you have been fired from )(.*)( by )(.*)(\. Don't worry, you can get another job at)(.*)(job market)/,"很不幸，你被 $4 从 $2 解雇了… 不过不必担心 你很快就能找到新工作的 $6前往人才市场");
		} else if (obj.innerHTML.match("Donation")) {
			obj.innerHTML=obj.innerHTML.replace(/Donation/,"捐赠(D)");
			msg.innerHTML=msg.innerHTML.replace(/(Player)(.*)(donated you)(.*)(Donation reason:)/,"玩家$2向你捐赠了$4捐赠理由:");
			msg.innerHTML=msg.innerHTML.replace(/(Player)(.*)(donated you)/,"玩家$2向你捐赠了");
		} else if (obj.innerHTML.match("Medal")) {
			obj.innerHTML=obj.innerHTML.replace(/Medal alert/,"奖章奖励");
			msg.innerHTML=msg.innerHTML.replace(/(awarded you with)(.*)(Reason:)/,"向你颁发了$2理由:");
			msg.innerHTML=msg.innerHTML.replace(/(Congratulations! You have been awarded with )(.*)(\. You received )(.*)(for your achievement)/,"恭喜! 你获得了 $2 并收到了 $4 作为奖励");
		} else if (obj.innerHTML.match("Subsidy")) {
			obj.innerHTML=obj.innerHTML.replace(/Subsidy alert/,"赏金");
			msg.innerHTML=msg.innerHTML.replace(/(You received )(.*)( from )(.*)( for dealing )(\d*)( damage in battle)/,"你收到了来自 $4 政府的 $2 赏金 贡献伤害是 $6 点");
		} else if (obj.innerHTML.match("Tutorial")) {
			obj.innerHTML=obj.innerHTML.replace(/Tutorial/,"教程");
			msg.innerHTML=msg.innerHTML.replace(/(You have reached level )(\d*)( and you are now allowed to run for presidency in your country!)(.*)/,"你的等级升到了 Lv.$2 现在开始你可以参加本国的总统竞选了!");
			msg.innerHTML=msg.innerHTML.replace(
				/(Congratulations!)(.*)(You have reached)(.*)(You have been awarded with your first)(.*)(You can spend this gold to create a newspaper or a company)(.*)(Citizens at level.*more about elections)(.*)(here)/,
				"恭喜! $2你的等级升到了$4并且获得了你的第一份奖励 $6你可以利用这个启动G来创办份报纸或者创建个工厂$8Citizen等级达到 Lv.7 以后就可以进行各种竞选投票。游戏中有三种竞选：总统竞选、议员竞选和党魁竞选。更多的说明信息可以参考$10这里"
			);
			msg.innerHTML=msg.innerHTML.replace(
				/(Congratulations!)(.*)(You have reached)(.*)(To reach level 5.*experience points\.)(.*)(Keep working.*actions\.)/,
				"恭喜! $2你的等级升到了$4要升级到 Lv.5 还需要20点经验值。$6继续保持工作、训练以及战斗，然后更多的功能会解锁。"
			);
			msg.innerHTML=msg.innerHTML.replace(
				/(Congratulations!)(.*)(You have reached)(.*)(To reach level 4.*experience points\.)(.*)(If.*on health\.)(.*)(To fight more, you need to)(.*)(eat some food)(.*)(using.*avatar\.)(.*)(Everyday you.*depends on quality)(.*)(You can also.*than food!)(.*)(To reach level 4 use food .* additional fights)/,
				"恭喜! $2你的等级升到了$4要升级到 Lv.4 还需要10点经验值。$6如果这是你第一天加入这个游戏，你可能会发现体力不足了。$8为了能够打跟多次枪你需要用侧边栏头像下面的$10啃面包(Eat food)$12来恢复体力。$14每天啃面包有10次限制，每个面包则能够恢复10～50体力(根据面包的星级$16同样你每天也可以使用(?YY)10次礼物。但是要注意的是，礼物比食物贵的多！$18为了能尽快升级到 Lv.4 你需要多啃面包多打枪。"
			);
			msg.innerHTML=msg.innerHTML.replace(
				/(<b>Congratulations!)(.*)(You have reached)(.*)(and you .* a battle\.)(.*)(To reach level 3.* and make some fights to reach level 3\.)/,
				"<b>恭喜!</b> <br><br>你的等级升到了 <b>level 2</b> 现在开始你可以参加战斗了。 <br><br>要升级到 Lv.3 还需要10点经验值。<br>你可以通过战斗获得更多的 <b>经验值(xp)</b> <br><br><br> 在战斗中，每打一次枪(攻击一次)你都可以获得 <b>1点经验值</b> 当然，同时也会减少 <b>10点体力</b>。 <br>如果你的体力降到了0，<b>你将无法继续打枪</b>。 <br>没体力又想继续打枪赚经验的话，你需要通过 <b>啃面包</b> 或者 <b>使用礼物</b> 来恢复体力。<br>食物和礼物需要从其他玩家手上购买，在 <a href=\"productMarket.html\" target=\"_blank\">商品市场</a> 中你所看到的就是其他玩家售卖的物品。<br>另外系统会在游戏换日时间(北京时间早上 6点)恢复你50点体力。<br><br><br>战斗本身也是赚钱的好方法。在一些 <a href=\"battles.html?substidedOnly=true\" target=\"_blank\">赏金战场</a> 里为提供赏金的国家战斗，之后会按照你输出的伤害来付钱。这样一来，有志成为国际雇佣兵的人就可以为高额的赏金而战斗了。<br><br><br>你可以通过使用 <b>面包</b>、<b>礼物</b> 以及 <b>武器</b> 来提高你每天都输出伤害总值。<br><br><br>现在你可以即刻前往 <a href=\"battles.html\" target=\"_blank\">战场</a> 通过打枪来升到 Lv.3。"
			);
//			if (i==14)alert(msg.innerHTML);
			msg.innerHTML=msg.innerHTML.replace(
				/Welcome in .* daychange at 0:00AM\./,
				"欢迎来到 <b>e-sim!</b><br> <br> 左侧边栏就是你的Citizen(公民/角色)的状态。<br> 你可以看到你现在的头像、等级、经验值进度条、军衔、货币财产(钱)和货物资产(物) experience 。 <br> <br>可以看到现在你只有 <b>1点经验值</b> 需要到10点才能升级到等级2并进行之后的教程。 <br><br>现在你可以通过完成在左下方的【日常任务】来升级到Lv.2。 <br>* <b>工作</b> - 5 经验值<br>进入 <a href=\"jobMarket.html\" target=\"_blank\">人才市场</a> 然后任意找份工作。然后点下画面上的 <b>立即工作</b> 的按钮你就能获得经验值和第一份薪水。<br>注意，这些工厂是由其他玩家运营并提供工作的。将来你也可以创建一家工厂，然后雇佣其他的Citizen。<br><br>* <b>训练</b> - 3 经验值<br>进入 <b>训练</b> 画面然后点击 <b>训练</b> 按钮。<br>训练可以提高你的力量。更高的力量则以位置更大的伤害(Damage)。<br><br>* <b>上传头像</b> - 3 经验值<br>进入 <a href=\"editCitizen.html\" target=\"_blank\">修改个人设置</a> 画面然后上传你自己喜欢的头像。<br><br>当你的等级达到 Lv.2 以后，我会说明如何战斗，敬请期待。<br><br>注意，每天只能工作训练各一次！当天日常任务的时间限制是游戏时间换日之前，游戏时间AM 0:00之前，也就是北京时间 AM 6:00。"
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
	tmp.innerHTML=tmp.innerHTML.replace(/Subscriptions/,"订　阅");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		obj = results.snapshotItem(0);
		
		obj.innerHTML=obj.innerHTML.replace(/Subscriptions/,"收到的订阅报纸");
		
		replacNewspaperTime(obj);
	}

	replaceLinkByHref({
		"subscribedNewspapers.html":["List of subscribed newspapers","订阅报纸一览表"]
	});
}

//============================================================================
//Subscribed Newspapers
//============================================================================
function doSubscribedNewspapers() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Subscribed newspapers/,"订阅报纸一览表");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Total subs/,"订阅总数<br>※点击解除订阅");
		tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"报纸");
		tmp.innerHTML=tmp.innerHTML.replace(/Sub\. time/,"订阅时间");
		
		tmp = allElements;
		for (i = 1; i < tmp.children.length - 1; i++) {
			replaceBattleTime(tmp.children[i].children[2]);
		}
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","报纸相关说明"]
	});
}

//============================================================================
//Newspaper
//============================================================================
function doNewspaper() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"报　纸");
	
	results = getElements(document, "//table[@class='dataTable']");
	if (results.snapshotLength > 0) {
		allElements = results.snapshotItem(0).children[0];
		
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Recent articles/,"最新发表文章");
		
		replacNewspaperTime(allElements);
	}
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","修改报纸信息"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","报纸相关说明"]
	});
	replaceInputByValue({
		"Publish":["Publish","发表"],
		"Preview":["Preview","预览"]
	});
	
	//my newspaper
	allElements = document.getElementById('writeArticleForm');
	if (allElements) {
		tmp = allElements.parentNode.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Write new article/,"发表新的文章");
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Publish in country/,"文章发表国家");
		tmp = allElements.children[4];
		tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"文章标题:");
		tmp = allElements.children[10];
		tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"正文:");
		tmp = allElements.children[allElements.children.length-1];
		tmp.innerHTML=tmp.innerHTML.replace(/Please save a copy of your article on a hard disc before submitting it/,"请在文章提交之前在本地保留备份，以防万一。");
	}
}

//============================================================================
//Edit Newspaper
//============================================================================
function doNewspaperEdit() {
	allElements = document.getElementById('editNewspaperForm');
	
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper name:/,"报纸名称:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/New avatar:/,"报纸图标:");
	tmp = allElements.childNodes[9];
	tmp.nodeValue=tmp.nodeValue.replace("max. size","文件尺寸小于");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","修改报纸信息"]
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
		"editArticle.html":["Edit article","编辑修改"]
	});
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","修改报纸信息"]
	});
	replaceLinkByHrefSSS("#", {
		"Report":["Report","举报"],
		"Edit":["Edit","编辑"],
		"Delete":["Delete","删除"]
	});
	replaceInputByValue({
		"Publish":["Publish","回复"],
		"Report":["Report","举报"],
		"Edit":["Edit","编辑"],
		"Delete":["Delete","删除"]
	});
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/New comment/,"发表回复");
	
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"内容:");
}

//============================================================================
//Edit Article
//============================================================================
function doArticleEdit() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Newspaper/,"报　纸");
	
	allElements = document.getElementById('command');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"编辑文章");
	tmp = allElements.children[1];
	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"文章标题:");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"正文:");
	
	replaceLinkByHref({
		"editNewspaper.html":["Edit newspaper","修改报纸信息"],
		"http://wiki.e-sim.org/en/Newspaper":["Newspaper tutorial on wiki","关于报纸"]
	});
	replaceInputByValue({
		"Edit article":["Edit article","编辑提交"]
	});
}

//============================================================================
//Contracts List
//============================================================================
function doContractsList() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Contracts/,"合同一览");
	
	tmp = allElements.children[2].children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Templates/,"合同模板");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace("Proposed contracts (latest 20)","已发送的合同 (最新20份)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"发送给");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"无");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace("Accepted contracts (latest 20)","已完成的合同 (最新20份)");
	tmp.innerHTML=tmp.innerHTML.replace(/offered to/g,"发送给");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"无");
	tmp = allElements.children[8];
	tmp.innerHTML=tmp.innerHTML.replace("Rejected contracts","被拒绝的合同");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by( <img.*<a.*a>)/g,"被$1拒绝");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"无");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace("Failed contracts","失败的合同");
	tmp.innerHTML=tmp.innerHTML.replace(/No contracts/,"无");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace("Your active loans","放贷一览");
	tmp.innerHTML=tmp.innerHTML.replace("Borrower","借款人");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","偿还时限");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","合计");
	tmp.innerHTML=tmp.innerHTML.replace("Cancel debt","已销账");
	tmp.innerHTML=tmp.innerHTML.replace("No loans","无");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace("Your active debts","贷款一览");
	tmp.innerHTML=tmp.innerHTML.replace("Lender","放款人");
	tmp.innerHTML=tmp.innerHTML.replace("Payback time","偿还时限");
	tmp.innerHTML=tmp.innerHTML.replace("Sum","合计");
	tmp.innerHTML=tmp.innerHTML.replace("Pay debt","已还款");
	tmp.innerHTML=tmp.innerHTML.replace("No debt","无");
	
	
	allElements = document.getElementById('command');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace("Template name:","模板名称:");
	
//	allElements = document.getElementById('command');
//	tmp = allElements.parentNode.children[0];
//	tmp.innerHTML=tmp.innerHTML.replace(/Edit article/,"编辑文章");
//	tmp = allElements.children[1];
//	tmp.innerHTML=tmp.innerHTML.replace(/Article title:/,"文章标题:");
//	tmp = allElements.children[6];
//	tmp.innerHTML=tmp.innerHTML.replace(/Message:/,"正文:");
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Contracts":["Contract tutorial","关于合同"],
		"#":["Create new template","创建新的合同模板"]
	});
	replaceInputByValue({
		"Delete":["Delete","删除"],
		"Create template":["Create template","创建新模板"]
	});
	
//	objs = getElements(document, "//input[@value='Delete']");
//	for (var i = 0; i < objs.snapshotLength; i++) {
//		obj = objs.snapshotItem(i);
////		obj.value = obj.value.replace("Delete", "删除");
//		if(i==0){alert(obj.getAttributeNS("contracts.html","getAttributeNS"));}
//	}
}

//============================================================================
//Contract detail
//============================================================================
function replaceContractComm(obj, kbn) {
	if (kbn==1) {
		obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1(甲方) 义务:<");
	} else {
		if (kbn==2) {
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen obligations:/,"某人 (乙方) 义务:")
			obj.innerHTML=obj.innerHTML.replace(/Dummy citizen/g,"某人(乙方)");
		} else {
			obj.innerHTML=obj.innerHTML.replace(/(>[\w ]* )obligations:</,"$1(乙方) 义务:<")
		}
	}
	
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following products:/," 将会立即交易给对方下列物品(双方同意后):");
	obj.innerHTML=obj.innerHTML.replace(/ will instantly donate the following sum of money:/," 将会立即交易给对方下列货币(双方同意后):");
	obj.innerHTML=obj.innerHTML.replace(/ will be charged with following debt:/," 将会背负下列债务(双方同意后):");
	obj.innerHTML=obj.innerHTML.replace(
		/must be paid([\d\D\n\r]*?)by([\D\n\r]*?)(\d*)([ \t\n\r]*?)game day([\D\n\r]*?)\(within (\d*) days since signing the contract \) to/g,
		"必须在$1第$2$3$4个游戏日之前$5(从贷款合同成立开$6天内)付给"
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
	tmp.innerHTML=tmp.innerHTML.replace(/Contract/,"合同名称");
	tmp = allElements.children[6];
	tmp.innerHTML=tmp.innerHTML.replace(/Contract status: /,"合同状态: ");
	tmp.innerHTML=tmp.innerHTML.replace(/Accepted/,"已完成");
	tmp.innerHTML=tmp.innerHTML.replace(/Rejected by (.*)/,"被 $1 拒绝");
	tmp.innerHTML=tmp.innerHTML.replace(/Failed/,"失败");
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
		tmp.innerHTML=tmp.innerHTML.replace(/Add new element to the contract/,"向合同模板中添加新的项目");
		
		allElements = document.getElementById('contractsForm');
		tmp = allElements.children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Side/,"选择要添加交易的合同方");
		tmp = allElements.children[7];
		tmp.innerHTML=tmp.innerHTML.replace(/Item type/,"选择要添加交易的项目类型");
		
		allElements = document.getElementById('offererSide');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Dummy citizen/,"某人(乙方)");
		
		//money
		allElements = document.getElementById('itemTypeList');
		replaceOptionTxt(allElements, {
			"Money":["Money","金钱"],
			"Product":["Product","物品"],
			"Debt":["Debt","债务"]
		});
		
		allElements = document.getElementById('MONEYParameters');
		tmp = allElements.children[0].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"货币种类和金额( ");
		
		//Product
		allElements = document.getElementById('PRODUCTParameters');
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quantity:/,"物品数量:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Product type:/,"物品种类:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"物品星级:");
		
		allElements = document.getElementById('resource');
		replaceOptionTxt(allElements, {
			"Iron":["Iron","铁"],
			"Grain":["Grain","谷物"],
			"Oil":["Oil","石油"],
			"Stone":["Stone","石材"],
			"Wood":["Wood","木材"],
			"Diamonds":["Diamonds","钻石"],
			"Weapon":["Weapon","武器"],
			"House":["House","房屋"],
			"Gift":["Gift","礼物"],
			"Food":["Food","食物"],
			"Ticket":["Ticket","机票"],
			"Defense System":["Defense System","防御"],
			"Hospital":["Hospital","医院"]
		});
		
		//Debt
		allElements = document.getElementById('DEBTParameters');
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Debt/,"债务");
		tmp = allElements.children[3].childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Money \(in /,"货币种类和金额( ");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Payback time:/,"偿还期限:");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Product quality:/,"物品星级:");
		
		//propose
		allElements = document.getElementById('contentRow').children[1].children[5];
		tmp = allElements.children[0];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose contract/,"发送合同");
		tmp = allElements.children[2].children[3];
		tmp.innerHTML=tmp.innerHTML.replace(/Propose to/,"发送对象");
		tmp = allElements.children[5];
		tmp.innerHTML=tmp.innerHTML.replace(/Note:/,"注意:");
		tmp = allElements.childNodes[12];
		tmp.nodeValue=tmp.nodeValue.replace(/you can only propose contract to your friend/,"合同仅能发送给自己的好友");
	}
	
	replaceLinkByHref({
		"profile.html?id=0":["Dummy citizen","某人"],
		"contracts.html":["Go back to contract list","返回合同一览表"]
	});
	replaceInputByValue({
		"Delete":["Delete","删除"],
		"Propose":["Propose","确认发送"],
		"Add item":["Add item","添加项目"]
	});
}


//============================================================================
//Monetary Market
//============================================================================
function doMonetaryMarket() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Monetary Market/,"货币市场");
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Current offers/,"最新卖单");
	
	allElements = document.getElementById('monetaryMarketView');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Show Offers:/,"显示卖单:");
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Buy currency:/,"买入货币:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Sell currency:/,"卖出货币:");
	
	
	allElements = document.getElementById('contentRow').children[2];
	tmp = allElements.children[2];
	tmp.innerHTML=tmp.innerHTML.replace(/Your offers/,"自己的卖单");
	
	allElements = document.getElementById('monetaryOfferPost');
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Post your Offer:/,"提交自己的卖单:");
	tmp = allElements.childNodes[0];
	tmp.nodeValue=tmp.nodeValue.replace(/Offered currency:/,"卖出货币:");
	tmp = allElements.childNodes[4];
	tmp.nodeValue=tmp.nodeValue.replace(/Buy currency:/,"买入货币:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Exchange rate:/,"交易汇率:");
	tmp = allElements.childNodes[13];
	tmp.nodeValue=tmp.nodeValue.replace(/Offer/,"卖出");
	tmp = allElements.childNodes[17];
	tmp.nodeValue=tmp.nodeValue.replace(/at rate/,"汇率是");
	
	
	

	results = getElements(document, "//table[@class='dataTable']");
//	alert(results.snapshotLength);
	for (i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i).children[0].children[0];
//		if (i==0) alert(obj.innerHTML);
		obj.innerHTML=obj.innerHTML.replace(/Seller/,"卖家");
		obj.innerHTML=obj.innerHTML.replace(/Amount/,"数量");
		obj.innerHTML=obj.innerHTML.replace(/Ratio/,"汇率");
		obj.innerHTML=obj.innerHTML.replace(/Buy/,"购买");
//		obj.innerHTML=obj.innerHTML.replace(/Delete/,"删除");

		if (obj.innerHTML.match("Delete")) {
			obj = results.snapshotItem(i).children[0];
			obj.innerHTML=obj.innerHTML.replace(/>Delete</g,">删除<");
		}
		
//		if (i==0) alert(results.snapshotItem(i).children.length);
		obj = results.snapshotItem(i).children[0].children[1];
//		if (i==0) alert(obj.innerHTML);
		if (obj.innerHTML.match("No offers")) {
			obj.innerHTML=obj.innerHTML.replace(/No offers/,"无");
		}
		
	}
	
	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Monetary Market":["Monetary market tutorial","关于货币市场的说明"]
	});
	replaceInputByValue({
		"Post new offer":["Post new offer","提交卖单"],
		"View offers":["View offers","查看指定卖单"],
		"Swap currencies":["Swap currencies","买卖对象转换"]
	});
}

//============================================================================
//Presidental Elections
//============================================================================
function doPresidentalElections() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Presidential Elections/,"总统竞选");
	
	tmp = allElements.children[1];
	if (tmp.innerHTML) {
		tmp.innerHTML=tmp.innerHTML.replace(/Your vote has been casted successfully/,"投票成功");
		tmp.innerHTML=tmp.innerHTML.replace(/You have already casted your vote/,"你已经投票");
	}
	
	allElements = document.getElementById('presidentalElectionsForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Country:/,"国家:");
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Date:/,"时期:");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i).children[0].children[0];
		obj.innerHTML=obj.innerHTML.replace(/Candidate/,"候选人");
		obj.innerHTML=obj.innerHTML.replace(/Presentation/,"竞选演说");
		obj.innerHTML=obj.innerHTML.replace(/Total votes/,"总票数");

		obj = results.snapshotItem(i).children[0];
		obj.innerHTML=obj.innerHTML.replace(/No candidates/,"无候选人");
		obj.innerHTML=obj.innerHTML.replace(/Presentation/,"竞选演说");
		obj.innerHTML=obj.innerHTML.replace(/No presentation/,"无");
		obj.innerHTML=obj.innerHTML.replace(/Your candidate/,"已投票");
	}

	allElements = document.getElementById('command');
	if (allElements && allElements.innerHTML.match("Link to presentation")) {
		tmp = allElements.children[1];
		tmp.innerHTML=tmp.innerHTML.replace(/Link to presentation:/,"演说链接:");
		tmp = allElements.parentNode.childNodes[5];
		tmp.nodeValue=tmp.nodeValue.replace(/Candidating for president costs/,"申请总统候选人需要花费");
	}

	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Presidental elections":["Presidential elections tutorial","关于囧统竞选"]
	});
	replaceInputByValue({
		"Vote":["Vote","投票"],
		"Show":["Show","显示"],
		"Candidate for president":["Candidate for president","提交候选人申请"]
	});
}

//============================================================================
//Party Elections
//============================================================================
function doPartyElections() {
	allElements = document.getElementById('contentRow').children[1];
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Party Elections/,"党内竞选");
	
	tmp = allElements.children[1];
	if (tmp.innerHTML) {
		tmp.innerHTML=tmp.innerHTML.replace(/Your vote has been casted successfully/,"投票成功");
		tmp.innerHTML=tmp.innerHTML.replace(/You have already casted your vote/,"你已经投票");
	}
	
	allElements = document.getElementById('partyElectionsForm');
	tmp = allElements.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Party:/,"党派:");
	tmp = allElements.children[4];
	tmp.innerHTML=tmp.innerHTML.replace(/Date:/,"时期:");
	
	results = getElements(document, "//table[@class='dataTable']");
	for (i = 0; i < results.snapshotLength; i++) {
		obj = results.snapshotItem(i).children[0].children[0];
		obj.innerHTML=obj.innerHTML.replace(/Candidate/,"候选人");
		obj.innerHTML=obj.innerHTML.replace(/Party/,"党派");
		obj.innerHTML=obj.innerHTML.replace(/Presentation/,"竞选演说");
		obj.innerHTML=obj.innerHTML.replace(/Total votes/,"总票数");

		obj = results.snapshotItem(i).children[0];
		obj.innerHTML=obj.innerHTML.replace(/No candidates/,"无候选人");
		obj.innerHTML=obj.innerHTML.replace(/Presentation/,"竞选演说");
		obj.innerHTML=obj.innerHTML.replace(/No presentation/,"无");
		obj.innerHTML=obj.innerHTML.replace(/Your candidate/,"已投票");
	}

	allElements = document.getElementById('command');
	if (allElements && allElements.innerHTML.match("Link to presentation")) {
		tmp = allElements.childNodes[0];
		tmp.nodeValue=tmp.nodeValue.replace(/Submit your candidature for a party leader of:/,"提交所在党派党首竞选候选人申请:");
		tmp = allElements.children[2];
		tmp.innerHTML=tmp.innerHTML.replace(/Link to presentation:/,"演说链接:");
		tmp = allElements.parentNode.childNodes[5];
		tmp.nodeValue=tmp.nodeValue.replace(/Candidating for party leader costs/,"申请党首候选人需要花费");
	}

	replaceLinkByHref({
		"http://wiki.e-sim.org/en/Party elections":["Party elections tutorial","关于党内竞选"]
	});
	replaceInputByValue({
		"Vote":["Vote","投票"],
		"Show":["Show","显示"],
		"Candidate for party leader":["Candidate for party leader","提交候选人申请"]
	});
}

//============================================================================
//Login
//============================================================================
function doLogin() {
	allElements = document.getElementById('userMenu');
	tmp = allElements.children[0].children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/You are not logged in/,"未登录");
	tmp = allElements.children[2].children[1].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Login:/,"<b>※IP+帐号一定不能出问题</b><br><br>用户名:");
	tmp = allElements.children[2].children[1].children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Password:/,"密码:");
	replaceLinkByID({
		"forgotPasswordLink":["Forgot password?","忘记密码？"]
	});
	replaceInputByValue({
		"Login":["Login","登录"]
	});
	
	tmp = document.createElement("br");
	allElements.insertBefore(tmp, allElements.lastChild.nextSibling);
	tmp = document.createElement("div");
	tmp.className="plate";
	tmp.style.width="93%";
	tmp.innerHTML="<div style='text-align: center'><b>★★★游戏备忘★★★</b></div><br>"
		+ "QQ群：70741806 <br>"
		+ "<a href='http://e-sim.org/article.html?id=11149'>汉化插件介绍</a><br>"
		+ "<a href='http://userscripts.org/scripts/show/121275'>汉化插件下载</a><br>"
		+ "<a href='http://e-sim.org/article.html?id=6245'>教育部(新人指导及福利)</a>"
		+ "<br><br><br>"
		+ "<div style='text-align: center'><b>！！！帐号注意事项！！！</b></div><br>"
		+ "本游戏禁止多帐号，审查相当严格，惩罚相当严厉。审查不仅仅包括同IP的审查，还包括上下线非正常经济往来，包括各种正常手续下的异常交易。<br>如果你正在或者曾经有过类型的情况，建议在群里询问，或者直接在游戏里"
		+ "<a href='http://e-sim.org/composeMessage.html?id=31461'>PM我(ein_blue)</a>，我们会很乐意帮助你的。"
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
	tmp.innerHTML=tmp.innerHTML.replace(/free, massive, multiplayer, social browser game/,"一个免费的, 内容丰富的, 玩家众多的, 社交类网页游戏");
	tmp.innerHTML=tmp.innerHTML.replace(
		/is a simulation[\d\D]*? your choice!/,
		"是现实世界的模拟。<br>在这里，你可以成为<b>38个虚拟国家</b>当中的虚拟公民。之后，你就可以在这里大展身手，施展你的<b>政治</b>、<b>军事</b>以及<b>经济</b>才能。<br>你的虚拟公民可以成为一个普通的<b>战士</b>抑或是一个<b>商人</b>，或者是为<b>总统之位</b>而奔走，成为整个国家的领导者！<br><br>在这里，你可以注重于你个人事业的发展，或者全力帮助你的国家<b>赢得战争</b>。你也可以创建自己的<b>私人军队</b>或者投资你的<b>贸易帝国</b>——这一切都取决于你的选择！"
	);
	
	tmp = allElements.parentNode.children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/REGISTER FOR FREE/,"免费注册");
	
	tmp = allElements.children[0].children[0];
	tmp.innerHTML=tmp.innerHTML.replace(/Login:/,"用户名:");
	tmp = allElements.children[0].children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/E-mail:/,"邮箱:");
	tmp = allElements.children[0].children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Password:/,"密码:");
	tmp = allElements.children[0].children[7];
	tmp.innerHTML=tmp.innerHTML.replace(/Repeat password:/,"确认密码:");
	
	tmp = allElements.children[1];
	if (tmp.innerHTML.match("You have been invited to the game by")) {
		tmp.innerHTML=tmp.innerHTML.replace(/You have been invited to the game by/,"你被下面的玩家邀请加入该游戏<br>");
		tmp.innerHTML=tmp.innerHTML.replace(/You will receive bonus(.*)when you reach <b>level 7<\/b>/,"你将会在等级达到 <b>Lv.7</b> 的时候获得<br>$1 的奖励");
	} else {
		tmp.innerHTML=tmp.innerHTML.replace(
			/You can receive bonus([\d\D]*)when you reach [\d\D]*?Inviter name/,
			"如果你在这里输入推荐人的游戏名并成功注册的话，那么在你的等级升到<b>Lv.7</b>之后，你将获得$1的奖励。<br>※如果你看到这段话说明你并没有通过邀请链接过来的，到7级是没有额外奖励的。所以这种情况下建议加入QQ群70741806索取链接，会有很多<b>好人争先恐后</b>地要包养你的，或者直接写上咳血家的ID【ein_blue】，我会负责的！<br> <b>推荐人</b>"
		);
	}
	
	tmp = allElements.children[3];
	tmp.innerHTML=tmp.innerHTML.replace(/Citizenship:/,"选择虚拟公民的国籍:");
	tmp = allElements.children[5];
	tmp.innerHTML=tmp.innerHTML.replace(/Region \(starting location\):/,"地区(游戏开始时所在地):");
	tmp = allElements.children[10];
	tmp.innerHTML=tmp.innerHTML.replace(/Please read/,"注册之前请仔细阅读");
	tmp.innerHTML=tmp.innerHTML.replace(/the rules/,"游戏规则");
	tmp.innerHTML=tmp.innerHTML.replace(/before registering/,"");
	tmp = allElements.children[12];
	tmp.innerHTML=tmp.innerHTML.replace(/Be advised, that owning more than one account is forbidden\./,"游戏禁止多帐号<br><b>★★★判断方式不仅限于相同IP，包括非正常的经济往来★★★</b>");
	tmp = allElements.children[14];
	tmp.innerHTML=tmp.innerHTML.replace(/Playing more than one account will end in/,"某玩家如果有超过一个帐号的话");
	tmp.innerHTML=tmp.innerHTML.replace(/ban of all your accounts\./,"所有帐号都将将会被封停。");
	
	allElements = document.getElementById('registerForm');
	tmp = allElements.parentNode.parentNode.parentNode.children[1];
//	alert(tmp.innerHTML);
	tmp.innerHTML=tmp.innerHTML.replace(/Features/,"游戏特色");
	tmp.innerHTML=tmp.innerHTML.replace(/Join the community of([\d\D]*?)active players/,"成为拥有$1名活跃用户组成的社区的一员");
	tmp.innerHTML=tmp.innerHTML.replace(/Become a[\d\D]*?of the entire country!/,"成为<b>战士</b>、<b>商人</b>或者统领全国的<b>领导人</b>");
	tmp.innerHTML=tmp.innerHTML.replace(/<b>Economy[\d\D]*?run entirely by players/,"完全由玩家所运行的<b>经济系统</b>");
	tmp.innerHTML=tmp.innerHTML.replace(/Balanced [\d\D]*? territories/,"拥有包括38个<a href=\"countryStatistics.html\">国家</a>的228个地区的平衡性良好的<a href=\"googleMap.html\">版图</a>");
	tmp.innerHTML=tmp.innerHTML.replace(/Run for a [\d\D]*?office/,"可以成为<a href=\"congressElections.html\">议员</a>甚至进驻<a href=\"presidentalElections.html\">囧统</a>办公室");
	tmp.innerHTML=tmp.innerHTML.replace(/Participate in [\d\D]*?battles/,"参与<b>战争</b>与<b>战斗");
	tmp.innerHTML=tmp.innerHTML.replace(/Become a part of your country [\d\D]*?community/,"成为你所在国家<b>社区的一部分");
	tmp.innerHTML=tmp.innerHTML.replace(/Trade [\d\D]*? with other players/,"与其他玩家交易<a href=\"productMarket.html\">货物</a>或者<a href=\"monetaryMarket.html\">货币</a>");
	tmp.innerHTML=tmp.innerHTML.replace(/Sign [\d\D]*? to other players/,"与其他玩家签订<b>合同</b>、<b>贷款</b>或者<b>借款</b>");
	tmp.innerHTML=tmp.innerHTML.replace(/Compete with other players in and gain ([\d\D]*?)achievements/,"与其他玩家进行各种竞争并且可以获得不同$1成就");
	tmp.innerHTML=tmp.innerHTML.replace(/Earn money by [\d\D]*?managing companies<\/b>/,"通过<b>工作</b>、<b>战斗</b>或者<b>经营工厂</b>获取财富");
	tmp.innerHTML=tmp.innerHTML.replace(/Team up with your friends and create a ([\d\D]*?)military unit/,"和你的朋友们联合成立$1军团");
	tmp.innerHTML=tmp.innerHTML.replace(/Become a newspaper redactor and gain ([\d\D]*?)subscribers/,"成为一名报纸编辑者并获得他人$1订阅");
	
	tmp.innerHTML=tmp.innerHTML.replace(/Top countries/,"国家 Top 5");
	tmp.innerHTML=tmp.innerHTML.replace(/>Country</,">国家<");
	tmp.innerHTML=tmp.innerHTML.replace(/Total citizens/,"活跃人口");
	
	replaceInputByValue({
		"Register":["Register","注册"]
	});
}


//============================================================================
//Maintenance
//============================================================================
function doMaintenance() {
	tmp = document.getElementById('navigationRow');
	tmp.innerHTML=tmp.innerHTML.replace(/Maintenance/,"维护");
	tmp.innerHTML=tmp.innerHTML.replace(/We are sorry, the game is in maintenance mode/,"游戏正在维护中，请稍等片刻（通常5分钟）");
}

//============================================================================
//Premium account
//============================================================================
function doSubscription() {
	tmp = document.getElementById('contentRow').children[1].children[7];
	tmp.innerHTML="<h2 style='text-align: center'>高级帐号</h2>"
		+ "<i>E-sim</i> 是一款免费的游戏，任何人均可以免费享受该游戏。当然，如果你非常热衷于 <i>E-sim</i> 这款游戏，那么你可以申请加入成为高级会员。<br><br>"
		+ "<u>高级帐号</u> 能够获得一些有趣的游戏信息，以及一些有用的高级功能，比如战场监视功能或者军团成员消息群发功能等。<br>"
		+ "另外，你的个人信息页面里将会有一个<i>星形标识</i>。<br>"
		+ "当然，购买<u>高级帐号</u>的也是对<i>E-sim</i>发展的支持和帮助！"
		+ "<br><br>"
		+ "※非官方说明<br>"
		+ "高级帐号追加了一些有用的功能，不过这些对新人而言却是没什么帮助，虽然对那些游戏开服1个月内的老妖怪们还是挺有吸引力的。"
		+ "高级帐号每个月需要4.99欧元，相当于40+RMB。<br>"
		+ "下面的详细介绍暂时就不汉化了，有兴趣可以来群里询问或者看这里 "
		+ "<a href='http://e-sim.org/article.html?id=11562'>高级帐户预告</a><br>"
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