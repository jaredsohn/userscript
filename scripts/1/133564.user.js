// ==UserScript==
// @name           Halo Waypoint 中文化
// @namespace      http://snake570.pixnet.net
// @description    瀏覽 Halo Waypoint 時，將大部分英文資料繁體中文化！
// @include        http://halo.xbox.com/*
// @include        https://halo.xbox.com/*
// @exclude        http://userscripts.org/scripts/review/*
// @copyright      JoeSimmons
// @version        1.0.51
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
//範例：'被替換的字' : '要顯示的字',
////////////頁尾//////////////
"English" : "繁體中文/英文",
"Français" : "法文",
"Español" : "西班牙文",
"Deutsch" : "德文",
"Privacy Statement" : "隱私聲明",
"Terms of Use" : "使用條款",
"Code of Conduct" : "行為守則",
"343 Jobs" : "343工作機會！",
"ALL RIGHTS RESERVED" : "保留所有權利",
"May contain content inappropriate for children" : "可能含有兒童不宜的內容",
"Visit www.esrb.org for rating information" : "前往 www.esrb.org 了解更多分級資訊",
///////////挑戰///////////
"Dedication/Time" : "奉獻/時間",
"Fire When Ready" : "準備開火",
"Heroic Killagruntjaro" : "英雄殺無赦",
"It was the Winter" : "總算熬過寒冬了",
"Katanarama" : "劍僧",
"Light Fare" : "芝麻小事",
"Put Your Quarter Up" : "毅然決然",
"T-Hug It Out" : "死亡擁抱",
"There Are Many Like" : "一槍斃命",
//////////挑戰內容////////
"Complete 10 Daily Challenges this week" : "完成本週的10場每日挑戰",
"Kill 6 enemies with close quarters combat in a Multiplayer Matchmaking game" : "在多人配對遊戲中以近距離戰鬥的方式殺死6個敵人",
"Complete Winter Contingency on Legendary without dying" : "活著在傳奇模式完成「寒冬告急」",
"Kill 1 enemies using the Energy Sword in Firefight Matchmaking" : "在槍林彈雨配對遊戲中使用能量劍殺死1個敵人",
"Kill 50 enemies in Multiplayer Matchmaking" : "在多人配對遊戲中殺死50個敵人",
//////////自訂挑戰////////
"You may have up to five active challenges at any given time" : "您可以在任何時間建立最多5種挑戰",
"ACTIVE CHALLENGES" : "進行中的自訂挑戰",
"Accept or decline your current challenge invitations" : "接受或拒絕您目前的挑戰邀請",
"CHALLENGE INVITATIONS" : "受邀請的挑戰",
"PENDING" : "等待中邀請",
"CHALLENGE HISTORY" : "挑戰紀錄",
"View your past challenges" : "檢視您過去的挑戰",
"1ST PLACE" : "第一名",
"2ND PLACE" : "第二名",
"3RD PLACE" : "第三名",
"If you would like to attempt or create a new challenge and currently have all five slots occupied" : "而如果已經設定好5種挑戰後還需要建立挑戰",
"you will need to Turn In or Forfeit a challenge first" : "那麼您得先將已完成的挑戰獎勵轉入個人資料或是放棄某個挑戰",
"or wait for one to end" : "或是等到某個挑戰時間結束",
"CREDITS" : "挑戰獎勵",
"GOAL" : "目標",
"Kills" : "殺人數",
"TIME REMAINING" : "剩餘時間",
"CREATE A CHALLENGE" : "　　　建立挑戰　　　",
"CREATE CHALLENGE" : "建立挑戰",
"CANCEL" : "取消",
"NAME CHELLENGE" : "挑戰名稱",
"Enter name for challenge here" : "在此輸入想要的挑戰名稱",
"CHALLENGE TYPE" : "挑戰類型",
"Custom Challenges" : "自訂挑戰",
"Custom" : "自訂遊戲",
"Matchmaking Firefight" : "槍林彈雨配對",
"Matchmaking Multiplayer" : "多人遊戲配對",
"Back to Dashboard" : "回上一頁",
"FAILED" : "失敗",
"Total Challenges" : "已完成挑戰",
///////////統計資料///////////
"ALL GAMES" : "所有遊戲",
"The Arena" : "競技場",
"ARENA" : "競技場",
"COMPETITIVE" : "多人配對",
"INVASION" : "入侵",
"FIREFIGHT" : "槍林彈雨",
"Looking for" : "要尋找",
"Playlist or Map" : "遊戲清單或地圖的",
"To view map or playlist statistics" : "如果要檢視地圖或遊戲清單統計資料",
"select a map or playlist by using the left-hand panel" : "請使用畫面左下方的控制台來選擇地圖或遊戲清單",
///////////星期///////////
"Sunday" : "星期日",
"Monday" : "星期一",
"Tuesday" : "星期二",
"Wednesday" : "星期三",
"Thursday" : "星期四",
"Friday" : "星期五",
"Saturday" : "星期六",
///////////////////////////////
///////////月份///////////
"January" : "一月",
"February" : "二月",
"March" : "三月",
"April" : "四月",
"May" : "五月",
"June" : "六月",
"July" : "七月",
"August" : "八月",
"September" : "九月",
"October" : "十月",
"November" : "十一月",
"December" : "十二月",
"Holiday" : "特殊節日",
//////////////////////////////
///////////難度///////////
"Easy Difficulty" : "簡單難度",
"Easy" : "簡單",
"Normal Difficulty" : "正常難度",
"Normal" : "正常",
"Heroic Difficulty" : "英雄難度",
"Heroic" : "英雄",
"Legendary Difficulty" : "傳奇難度",
"Legendary" : "傳奇",
///////////官階///////////
"Hero" : "英雄",
"Legend" : "傳奇",
//////////////////////////////

//HALO4//
"is the next blockbuster installment in the iconic franchise that's shaped entertainment history and defined a decade of gaming. Set in the aftermath of " : "為遊戲史上創下劃時代娛樂方式的「最後一戰」最新作品。新遊戲背景將設定在",
"returns to confront his own destiny and face an ancient evil that threatens the fate of the entire universe." : "士官長回來面對他自己的命運，以及威脅宇宙的古老敵人，繼續展開全新的冒險劇情。",
"Halo 3, Master Chief returns to confront his own destiny and face an ancient evil that threatens the fate of the entire universe" : "「最後一戰3」之後",
"Halo 4 marks the start of a new trilogy that begins with its release in 2012" : "「最後一戰 4」即將在2012上市，屆時勢必再次掀起「最後一戰」遊戲的另一波熱潮。",
//HALO4//
//Question//
"Awards are earned by unlocking specific sets of Halo Achievements" : "勳章可透過解開特定的最後一戰成就來獲得",
"For example, the Vehicle Specialist Award is tied to Vehicle related Achievements across Halo Games" : "例如：想要獲得「載具專家」勳章，就得要解開與載具相關的成就。",
"Total number of Achievements earned across Halo Games" : "所有最後一戰遊戲之成就的數量",
"This is the total Gamerscore earned by unlocking Halo Achievements" : "所有最後一戰遊戲之成就分數的加總",
"Campaign stats summary for Halo 3, Halo 3: ODST, Halo Wars, Halo: Reach and Halo: Anniversary" : "最後一戰3、最後一戰3：ODST、星環戰役、最後一戰：瑞曲之戰及最後一戰：復刻板的遊戲資料加總",
"Multiplayer stats summary for Halo 2, Halo 3, Halo Wars and Halo: Reach, including Halo: Anniversary multiplayer maps" : "最後一戰2、最後一戰3、星環戰役及最後一戰：瑞曲之戰的遊戲資料加總，包含最後一戰：復刻板多人遊戲地圖包。",
"Kills and K/D data does not include Halo Wars" : "殺敵數及K/D值不包含星環戰役",
"Battle Proficiency Rating" : "戰術評價",
"is a number between" : "是指最後一戰：瑞曲之戰的多人遊戲個人技術，",
"1 and 100" : "該數值範圍為1至100，",
"representing a" : "來表示您的等級",
"This rating tracks your Kills, Wins, Assists, Deaths, and Betrayals across all matches played." : "此戰術評價追蹤你的殺敵、獲勝、助攻、死亡及背叛數，",
"You must play at least 10 Invasion, Arena or Competitive games for this number to be calculated." : "您至少需遊玩10場的入侵、競技場、或是任何多人對戰模式，這個數值才會被加總計算。",

//Question//
///////////勳章起始///////////
"Vehicle Specialist" : "載具專家",
"Special Weapon" : "特殊武器",
"Deadliest Unit" : "人間凶器",
"Team Player" : "合作夥伴",
"High Rating" : "好分數",
"Explorer" : "探險家",
"Warrior" : "戰士",
"Distinguished Service" : "尊貴服務",
"Heroism" : "英雄主義者",
"Field Ops" : "戰場指揮",
"Campaign Veteran, Elite" : "菁英退伍軍人",
"Joint Service" : "聯合服務",
"Date Earned" : "已獲得",
/////////////////////////////
"REACH CHALLENGES" : "挑戰",
"Weekly" : "每週挑戰",
"Daily" : "每日挑戰",
"COMPLETED" : "已完成",
"Total Games" : "已完成遊戲",
"Gamerscore" : "成就分數",
"HALO STATS SUMMARY" : "歷代統計資料",
"to milestone" : "成就解除後，就可到達里程碑",
"more Halo" : "  ",
"Check out your Halo Career and stats summary" : "查看您的Halo生涯及統計資料",
"SPARTAN" : "斯巴達戰士",
"Why sign in to Halo Waypoint" : "還不快加入Halo Waypoint",
"You'll have instant access to your game stats" : "您可查詢您的即時遊戲資料",
"Halo Career, and more" : "Halo生涯, 以及更多功能 ",
"SIGN IN" : "登入",
"Sign Out" : "登出",
"search Gamertag" : "搜尋Xbox Live玩家代號",
"SEARCH" : "搜尋",
"Welcome to Waypoint" : "歡迎來到Waypoint",
"Welcome Back" : "歡迎回到Waypoint",
"EXPLORE" : "探索",
"Your Halo Career" : "您的Halo生涯",
"TWITTER FEED" : "推特資訊",
"Halo NEWS" : "新聞",
///////////遊戲區///////////
"UPCOMING GAMES" : "未上市遊戲",
"RELEASED GAMES" : "已發售遊戲",
"Release Date" : "發售日期",
////////////////////////////////
///////////選單區///////////
"NEWS" : "最新消息",
"GAMES" : "遊戲",
"HALO 4" : "最後一戰4",
"HALO: ANNIVERSARY" : "最後一戰：復刻板",
"HALO: REACH" : "最後一戰：瑞曲之戰",
"HALO 3: ODST" : "最後一戰3：ODST",
"HALO WARS" : "星環戰役",
"HALO 3" : "最後一戰3",
"HALO 2" : "最後一戰2",
"HALO: COMBAT EVOLVED" : "最後一戰：戰鬥進化",
"UNIVERSE" : "世界觀",
"SHIPS" : "船艦",
"VEHICLES" : "載具",
"WEAPONS" : "武器",
"FACTIONS" : "種族 & 派別",
"CHARACTERS" : "角色",
"EVENTS" : "事件 & 活動",
"LOCATIONS" : "場景 & 地區",
"TECHNOLOGY" : "科技",
"COMMUNITY" : "社群",
"SPOTLIGHT" : "焦點",
"CREATIONS" : "來點創意",
"STORE" : "商店",
"TOYS" : "玩具",
"COLLECTIBLES" : "收藏",
"APPAREL" : "配件",
"COSTUMES" : "服飾",
"MEDIA" : "影音串流",
"AVATAR GEAR" : "虛擬人偶套件",
"MAP PACKS" : "地圖包",
"THEMES" : "主題",
"PICS" : "玩家圖示包",
"FORUMS" : "討論區",
///////////上方玩家下拉選單///////////
"VIEW CAREER OVERVIEW" : "檢視生涯概況",
"CAREER OVERVIEW" : "生涯概況",
"CAREER" : "生涯",
"OVERVIEW" : "概況",
"VIEW CAREER OVERVIEW" : "檢視生涯概況",
"VIEW SERVICE RECORD" : "檢視服役記錄",
"SERVICE RECORD" : "服役紀錄",
"VIEW STATS" : "檢視統計資料",
"VIEW CHALLENGES" : "檢視挑戰",
"CHALLENGES" : "挑戰",
//////////////////////////////////////////
///////////服役紀錄/////////////////
"Co-op" : "合作模式",
"Last Played" : "最後遊玩",
"Player Since" : "開始遊玩",
"COMMENDATIONS" : "獎賞",
"ALL MEDALS" : "所有獎章",
"Not Qualified Yet" : "尚未取得資料",
"Last season" : "上季等級",
"Armory Completion" : "軍火庫完成度",
"Commendation Completion" : "獎賞完成度",
///////////生涯概況///////////////////
"GAME HISTORY" : "遊戲歷程",
"CHANGE GAME" : "更換遊戲",
"Total Kills" : "殺敵數",
"Campaign" : "戰役",
"Multiplayer" : "多人遊戲",
"K/D Ratio" : "K/D值",
"Achievements" : "成就",
"What are Awards" : "什麼是勳章",
"AWARDS" : "勳章",
"Choose a title" : "選取一款遊戲",
////////////////雜區//////////////////
"Select" : "選擇挑戰",
"FEATURED CONTENT" : "精選內容",
"SUBMIT NEWS" : "發表新聞",
"VIEW ALL" : "觀看全部",
"Halo Waypoint for" : "Halo Waypoint",
"ON Mobile Devices" : "行動平台",
"Mobile Devices" : "行動平台",
"MORE INFO" : "更多細節",
"LANGUAGE" : "語言",
"PLATFORMS" : "支援平台",
"DOWNLOAD NOW" : "立刻下載",
"FEATURES" : "特色",
"ATLAS" : "戰術輔助系統",
"FILTER" : "排序",
"All" : "全部",
"Headlines" : "焦點新聞",
"Blog Posts" : "部落格",
"BLOG ENTRY" : "部落格",
"HEADLINE" : "焦點新聞",
"CLOSE" : "關閉",
"STATS" : "統計資料",
"Hour" : "小時",
"Deaths" : "死亡數",
"Spread" : "饗宴",
"Enemies" : "敵人",
"Next" : "下一個等級",

///////////////////////////////////////////////////////
"":""};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}

$('#domain').change(function() {

    if (!this.sendToServer) { // some expando property I made up
    	var that = this;
    	this.sendToServer = setTimeout(function(that) {
    		// use "that" as a reference to your element that fired the onchange.
    		// Do your AJAX call here
    		that.sendToServer = undefined;
    	}, yourTimeoutTimeInMillis)
    }
    else {
    	clearTimeout(this.sendToServer);
    }
});

