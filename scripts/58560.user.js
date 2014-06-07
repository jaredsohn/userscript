scr_meta=<><![CDATA[ 
// ==UserScript==
// @name 	Travian AutoTask
// @namespace   Travian
// @author 	congxz6688,deFox,Tuga
// @version 	1.2.4.6
// @description Functions: AutoResourceUpgrade, AutoTransport, AutoNewBuild, AutoDemolish, AutoAttack, AutoTrain, CustomTransport, AutoParty. Languages Pt/Br/Fr/Vn/Ru/Uk/Au/Ba/Ir/Ae/It/Se/Us/Tr/Pl/De/Rs.
// @license 	GNU General Public License
// @include 	http://*.travian*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==
]]></>.toString();

var crtVersion="Ver 1.2.4.6";

/**
 * Date:
 *   30 Jun 2009 - 27 Sep 2009
 * Authors:
 *   Original version by congxz6688.
 *   Some modifications and fixups by deFox.
 *   Translations integration by Tuga.
 * Copying and copyrights:
 *     This program is free software; you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation; either version 2 of the License, or
 *     (at your option) any later version.
 * Changelog:
 *   01 Oct 2009, deFox:
 *     - Fixed some names in all languages
 *     - Replaced auto-login code with more complex one
 *     - Prepared to unify XPath requests
 *   30 Sep 2009, Tuga:
 *     - Added "mx,cl,net" servers support
 *   30 Sep 2009, deFox:
 *     - Added "rs" servers support
 *     - Fixed bug in "send troops" attack type
 *   27 Sep 2009, deFox:
 *     - Added LohoC's german language support
 *     - Modified Xlang variable names to be more unique
 *     - Some cosmetic changes in code
 *   25 Sep 2009, deFox:
 *     - Fixed troops sending code due to Travian T3.5 update
 *   Earlier changes log: http://userscripts.org/scripts/show/58560
 */

// Basic constants
const XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
const XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
const XPOrdList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
const XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
const XPOrdItert = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
const XPNumber = XPathResult.NUMBER_TYPE;
const XPAny = XPathResult.ANY_TYPE;
const XPSnap = 6;//XPathResult.UNORDERED_SNAPSHOT_TYPE;
const XPOrdSnap = 7;//XPathResult.ORDERED_SNAPSHOT_TYPE;
const XPString = XPathResult.STRING_TYPE;
const XPBool = XPathResult.BOOLEAN_TYPE;

// Configuration

// Determines if the script should automatically 'press' login button if logged out
var autoLogin = true;
// Logging - for debugging purposes.
var logDebugMesages = true;

// Selecting language
Xlang="com";
checkLang();

// Preparing visual style for script's GUI
var cssStyle = "";
cssStyle += "table#tasklisttable th {border:0px !important;font-weight:bolder; margin:10px;padding-top:8px; }";
cssStyle += "table#tasklisttable tr td,table#mytablee tr td{border:0px !important;margin:20px;}";
cssStyle += ".floatClose {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
cssStyle += "#closeautran {position:relative;top:1px;left:150px}"
cssStyle += "#autoResdiv,#translimit,#resremain {padding:0px 3px; }";
cssStyle += "#createnewurl {margin: 0px 0px 0px 0px; position:relative; top:6px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#createUrl,#partylnk {margin: 0px 0px 0px 0px; position:relative; top:-5px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#partylnk { position:relative; top:-1px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#autotransbtn,#attackbtn,#trainlnk,#customtransbtn {margin: 0px 0px 0px  20px; position:relative; top:-4px; border-style: ridge; border-width:2px; color:green;}";
cssStyle += "#autotransbtn:active,#attackbtn:active,#demolishlnk:active,#createUrl:active,#createnewurl:active,#trainlnk:active,#customtransbtn:active,#partylnk:active {border-style: groove; border-width:3px; }";
cssStyle += "#updataform, #printmsg,#transform,#translimitform,#demolistform,#attackform,#trainform,#customtransform,#resremainform,#partyform {padding:10px 30px; }";
cssStyle += "#resremain {padding:0px 3px 15px 3px;}";
cssStyle += "#mytablee {margin:10px 0px 10px 0px;}";
cssStyle += "#crtvill,#hero {margin:0px 0px 10px 0px;}";
cssStyle += "#demolishdiv {padding:10px 3px 3px 3px;}";
cssStyle += "#taskForm_wrapper,#MSG_wrapper,#tranForm_wrapper,#tranlmtform_wrapper,#demolistform_wrapper,#attackform_wrapper,#trainform_wrapper,#customtransform_wrapper,#resremainform_wrapper,#partyform_wrapper {position:fixed; max-width:900px !important; min-width:260px !important; min-height:50px !important; background-color:RGB(225, 255, 225); margin:0; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#tasklisttable_wrapper {position:fixed; padding:10px 20px 10px 20px;min-width:260px !important; min-height:50px !important; background-color:RGB(180, 220, 220); margin:0; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += ".handle {cursor: move;}";
cssStyle +="#autoResform1,#changeit,#changeit2,#deletealltask,#clicktostart,#verdisp {color:green;}";
cssStyle +="#autoResform2,#clicktopause {color:DarkGoldenRod;}";
cssStyle +="#demolishlnk {color:red;border-style: ridge; border-width:2px;}";
GM_addStyle(cssStyle);

// Definitions of images
var deleteBtn = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";
var movedownBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAIAAABbzbuTAAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACXklEQVR42p2S20vTYRjH%2FTuCiEBLWwepoC4kLSWdxZrImBeri7IjokS6eaFikGCZHaxBB5DWPNVwREKm2GSz1FKHXghFsYFaJnP%2B3Obv9B6ep3ezgsKbenkv3ovv5%2F0%2Bz%2Fd50vAfT9p%2FARwRgHPKASmg%2FdZQY%2FuHGmfAfn%2F4Skt%2Fb2BBp2tCw1BFDn8AjAPh6BqRL7S%2BPX97vKJt%2FM7Lrx7%2FHGHyxgBloFG8ObBqaRq1NgfLmt%2FXdnx55gtTrmwAADBhIQBHz%2FzxhjFjfbC4fuzio9keX3hjh9%2BAEBXWvjtin8y3%2B22tY52Dn%2F920IQWOCMqIbJCFdvd2QOXBnMqRw9d9p%2B4Nu4eCQMhqCmUIVCeclAlVYcE4CrHmI6lTVM7T3r3nHq193RfQc2bdv%2FiMkcJMMqRMzkJgK5OhyN55W2mmtcWe8BcN2mwegyW3l1lvXkVQ6bq4eLq%2FlJH91Wnh2KqJAYYB%2BybiRQ7BjaXeDPNXZnm7vW7zdSZWeI5XBU41%2FBCJZigqcEBEd1IVI8%2F9s4UVPnSC93pRU%2B2H3NlGF0ZRe59Zzz5lc9VikiiMvBfKXEmnNYAG53e%2FWf9Weanu00Pth51Zlm92UV1UV1kmBDpiFrSfqaKYsq6iEsGtFa6cmxdm3Ifbim4l21uiWrJmpFzBE7Xd4kgUmEBmhiDpqnilVt6Y4fJbTBe%2F7SoMK4AASESRVDUUz0kd46rlMTi0tL8XOjjdGAilH6w3NkxPBGcCoVmI0uRRFxlVCApACkBjgSAUE5kRqm2EpOicenb9%2FnlpYWVhKKQpIKLjxn8ABAenc7LXVdbAAAAAElFTkSuQmCC";
var moveupBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAIAAADdWck9AAAABmJLR0QAAAAAAAD5Q7t%2FAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACbElEQVR42pVT70tTURj2f4joexGrT0XfggqGrabUIrLol4FiOiiwMCxZzQyMROzDqMD8gShCiLQNdQi2cc1tZrrmls1i1lzLLFzzunbv7r3nx9u5Zw360Jdd7j3ncN7nOe97n%2Bc9ZVDiU1Y6gRI2Uf6yL5fbyGHoHhbSEs3kRAoEA%2BBitJhBh1OdSQhDj05F4yJ09npEzDeBFKC0kIFT2UGIYoIw9UbWfXGp6dns2JJ8xzGGCA9ixCb8D4Ew9KYC75KZ0ZDY4JirfrxgfRpxL%2BOO%2FilRBU3T8%2BDiP7A1wQQ%2BpdV7g4GLDwTL%2FZljbcGqzojFLjhjuNcVUhA%2FFAjPkJcVTVtH5OYT4VJ7qKI1YLLNmO2zZnuQrc0t4%2B3OzPD0SlZDNC%2FqhDyGtErqWp22odSNgbX6nsRxW8B463X57elznYt1PcvW59GWvmA4kVZ4TWUYlNjKdyGUmpj%2F6gonr%2FWnDjf6jE3BQ43eK45YlzsxFln1vF32BZdQUdYMgEQJxpTKCFm7Px%2BoGd9fPbmv2n2%2BYyGwKCuACdW4FyonEF1WShVCqapAreODoWpk75nxPWdHTrf5%2FXMIQZ5QmYmKQCmq9FcpYLuX26OGkwMGy9DuE%2F2nmv3CQjYPTJ%2BcPmD4D%2BHC3cjOo327TINsrLg%2B7XvzQ2UhKgF3nMvK7GcaU8yagBEqmye3Gx%2FtMHZtO%2FLw4NUXr%2FxfkE6QQYdRTtDNp5qm%2FM7KP9e3ymtcphpPZb3XVOupbPC8nJgVJVHTcgyGeHPoJbFqVDW%2FtSX92pDDH1fno8m5SDIUS72Pf1vbUDezaVWR9O4pOF3qffgDH4Xh0bQHBfwAAAAASUVORK5CYII%3D";
var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";

// Xlang specific declarations
var aLangAllBuildWithId, aLangAllResInDorf1, aLangAddTaskText, aLangTaskKind, maxlevel;
var aLangGameText, aLangRaceName, aLangTaskOfText, aLangErrorText, aLangOtherText;
var allsourceString, aLangResources, allbuildString, aLangAttackType;
var aLangTroops = new Array(3);

switch (Xlang) {
	case "cn":
		aLangAllBuildWithId = ["伐木场", "黏土矿", "铁矿场", "农场", "", "木材厂", "砖块厂", "铸造厂", "磨坊", "面包房", "仓库", "粮仓", "铁匠铺", "军械库", "竞技场", "村中心大楼", "集结点", "市场", "大使馆", "兵营", "马厩", "工场", "研发所", "山洞", "市政厅", "行宫", "皇宫", "宝库", "交易所", "大兵营", "大马厩", "罗马城墙", "日尔曼城墙", "高卢城墙", "石匠铺", "酿酒厂", "陷阱机", "英雄园", "大仓库", "大粮仓", "世界奇观", "饮马槽"];
		aLangAllResInDorf1=["伐木场", "黏土矿", "铁矿场", "农场"];
		aLangAddTaskText = ["添加任务", "任务类型", "所在村", "任务对象", "目标", "模式", "支援建设", "资源集中", "上移", "下移", "删除", "任务内容", "移动", "清除所有任务"];
		aLangTaskKind = ["升级", "新建", "攻击", "研发", "训练", "运输", "活动", "拆除", "定制运输"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["等级", "商人", "坑号", "主村", "执行时间", "此时间设置目前无效", "到", "村庄", "运送", "回来", "向", "来自于", "从", "资源", "建筑", "建造新的建筑", "空", "等级"];
		aLangRaceName = ["罗马人", "日尔曼人", "高卢人"];
		aLangTaskOfText = ["预定升级", "预定新建", "资源自动升级", "尚未开启", "马上开启", "已经开启", "点击关闭", "该村资源田分布", "自动运输", "自动运输尚未设定", "已设定", "运送成功", "任务列表", "资源输入限额", "默认", "更改", "木/泥/铁", "粮食", "预定拆除",
			"预定发兵", "攻击类型", "到达所需时间", "重复次数", "间隔时间", "00:00:00", "投石目标", "随机", "未知", "次", "月", "日", "部队已发出","预定训练","训练设施","训练任务已执行","定制运输","设定页面刷新间隔","页面刷新的间隔时间，是指隔多久执行一次页面的自动载入。\n此时间过短，会增加被系统侦测到的危险，过长则影响任务执行的效率。\n默认为20分钟，请输入新的时间间隔：\n\n","资源输出保留","预定活动","小型活动","大型活动","资源集中模式的运输间隔",
			"分钟","暂停中","开启中","开启","暂停","预定改良","改良攻击","改良防御"];
		aLangErrorText = ["资源不足", "已经有建筑在建造中", "建造完成", "将马上开始全部建造", "在开发中", "建造所需资源超过仓库容量上限,请先升级你的仓库", "建造所需资源超过粮仓容量上限,请先升级你的粮仓", "资源何时充足时间提示","粮食产量不足: 需要先建造一个农场","一个活动正在举行中"];
		aLangOtherText = ["重要提示", "只有主村的资源田可以升级到20，<br/>目前主村尚未识别，点击个人资料<br/>页面可以解决这一问题", "五星级传送门^_^", "已经设置完成", "已经取消", "开始执行任务", "升级成功", "已顺利执行", "种族尚未确认，兵种也就无法确定，<br/>请点击个人资料页面，以便侦测种族", "然后，请顺便访问英雄园，以便确认<br/>英雄的种类和速度。<br/>"];
		allsourceString = "伐木场黏土矿铁矿场农场";
		aLangResources=["木材","泥土","铁块","粮食"];
		allbuildString = "木材厂砖块厂铸造厂磨坊面包房仓库粮仓铁匠铺军械库竞技场中心大楼集结点市场大使馆兵营马厩工场研发所山洞市政厅行宫皇宫宝库交易所大兵营大马厩罗马城墙日尔曼城墙高卢城墙石匠铺酿酒厂陷阱机英雄园大仓库大粮仓世界奇观饮马槽";
		aLangTroops[0] = ["古罗马步兵", "禁卫兵", "帝国兵", "使节骑士", "帝国骑士", "将军骑士", "冲撞车", "火焰投石器", "参议员", "拓荒者", "英雄"];
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧头兵", "侦察兵", "圣骑士", "日耳曼骑兵", "冲撞车", "投石器", "执政官", "拓荒者", "英雄"];
		aLangTroops[2] = ["方阵兵", "剑士", "探路者", "雷法师", "德鲁伊骑兵", "海顿圣骑士", "冲撞车", "投石器", "首领", "拓荒者", "英雄"];
		aLangAttackType = ["支援", "攻击", "抢夺"];
		break;
		
	case "hk": // 感谢sean3808
		aLangAllBuildWithId = ["伐木場", "泥坑", "鐵礦場", "農場","", "鋸木廠", "磚廠", "鋼鐵鑄造廠", "麵粉廠", "麵包店", "倉庫", "穀倉", "鐵匠", "盔甲廠", "競技場", "村莊大樓", "集結點", "市場", "大使館", "兵營", "馬棚", "工場", "研究院", "山洞", "村會堂", "行宮", "皇宮", "寶物庫", "交易所", "大兵營", "大馬棚", "城牆", "土牆", "木牆", "石匠鋪", "釀酒廠", "陷阱機", "英雄宅", "大倉庫", "大穀倉", "世界奇觀", "放牧水槽"];
		aLangAllResInDorf1=["伐木場", "泥坑", "鐵礦場", "農場"]
		aLangAddTaskText = ["添加任務", "任務類型", "所在村", "任務對象", "目標", "模式", "支援建設", "資源集中", "上移", "下移", "刪除", "任務內容", "移動", "清除所有任務"];
		aLangTaskKind = ["升級", "新建", "攻擊", "研發", "訓練", "運輸", "平倉", "拆除", "活動"];
		maxlevel = ["10", "10", "10", "10", "10", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["等級", "商人", "坑號", "主村", "執行時間", "該時間設置尚未啟用", "到", "村莊", "運送", "回來", "運輸到", "從", "由", "資源", "建築", "建造新的建築物", "empty", "等級"];
		aLangRaceName = ["羅馬人", "條頓人", "高盧人"];
		aLangTaskOfText = ["預定升級", "預定建築", "資源自動升級", "尚未開啟", "馬上開啟", "已經開啟", "點擊關閉", "該村資源分布", "自動運輸", "自動運輸尚未設定", "已設定", "運送成功", "任務列表", "資源輸入限額", "默認", "更改", "木/磚/鐵", "穀物", "預定拆除",
			"預定發兵", "攻擊類型", "到達所需時間", "重複次數", "間隔時間", "00:00:00", "投石目標", "隨機", "未知", "次", "月", "日", "部隊已發出","預定訓練","訓練設施","訓練任務已執行","定制運輸","設定頁面刷新間隔","頁面刷新的間隔時間，是指隔多久執行一次頁面的自動載入。\n此時間過短，會增加被系統偵測到的危險，過長則影響任務執行的效率。\n默認為20分鐘，請輸入新的時間間隔：\n\n","資源輸出保留","預定活動","小型活動","大型活動","資源集中模式的間隔時間",
			"分鐘","暫停中","開啟中","開啟","暫停","預定改良","改良攻擊","改良防御"];
		aLangErrorText = ["資源不足", "工作者已經在工作", "完全地開發", "將馬上開始全部建造", "在開發中", "倉庫需要升級", "糧倉需要升級", "資源何時充足時間提示","粮食产量不足: 需要先建造一个农场","派對進行中"];
		aLangOtherText = ["重要提示", "只有主村的資源田可以升級到20，<br/>目前主村尚未識別，點擊個人資料<br/>頁面可以解決這一問題", "五星級傳送門^_ ^", "已經設置完成", "已經取消", "開始執行任務", "升級成功", "已順利執行", "種族尚未確認，兵種也就無法確定，<br/>請點擊個人資料頁面，以便偵測種族", "然後，請順便訪問英雄園，以便確認<br/>英雄的種類和速度。<br/>"];
		allsourceString = "伐木場泥坑鐵礦場農場";
		aLangResources=["木材","磚塊","鋼鐵","穀物"];
		allbuildString = "鋸木廠磚廠鋼鐵鑄造廠麵粉廠麵包店倉庫穀倉鐵匠盔甲廠競技場村莊大樓集結點市場大使館兵營馬棚工場研究院山洞城鎮廳行宮皇宮寶物庫交易所大兵營大馬棚城牆土牆木牆石匠鋪釀酒廠陷阱機英雄宅大倉庫大穀倉世界奇觀放牧水槽";
		aLangTroops[0] = ["古羅馬步兵", "禁衛兵", "帝國兵", "使者騎士", "帝國騎士", "將軍騎士", "衝撞車", "火焰投石機", "參議員", "開拓者", "英雄"];
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧頭兵", "偵察兵", "遊俠", "條頓騎士", "衝撞車", "投石車", "司令官", "開拓者", "英雄"];
		aLangTroops[2] = ["方陣兵", "劍士", "探路者", "雷法師", "德魯伊騎兵", "海頓聖騎", "衝撞車", "投石車", "族長", "開拓者", "英雄"];
		aLangAttackType = ["支援", "攻擊", "搶奪"];
		break;

	case "tw": // 感谢adobe、魎皇鬼、ieyp
		aLangAllBuildWithId = ["伐木場", "泥坑", "鐵礦場", "農場", "農田", "鋸木廠", "磚廠", "鋼鐵鑄造廠", "麵粉廠", "麵包店", "倉庫", "穀倉", "鐵匠", "盔甲廠", "競技場", "村莊大樓", "集結點", "市場", "大使館", "兵營", "馬廄", "工場", "研究院", "山洞", "村會堂", "行宮", "皇宮", "寶物庫", "交易所", "大兵營", "大馬廄", "城牆", "土牆", "木牆", "石匠舖", "釀酒廠", "陷阱機", "英雄宅", "大倉庫", "大穀倉", "世界奇觀", "放牧水槽"];
		aLangAllResInDorf1=["伐木場", "泥坑", "鐵礦場", "農場"]
		aLangAddTaskText = ["添加任務", "任務類型", "所在村", "任務對象", "目標", "模式", "支援建設", "資源集中", "上移", "下移", "刪除", "任務內容", "移動", "清除所有任務"];
		aLangTaskKind = ["升級", "新建", "攻擊", "研發", "訓練", "運輸", "平倉", "拆除", "活動"];
		maxlevel = ["10", "10", "10", "10", "10", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["等級", "商人", "坑號", "主村", "執行時間", "該時間設置尚未啟用", "到", "村莊", "運送", "回來", "運送到", "從", "由", "資源", "建築", "建造新的建築物", "empty", "等級"];
		aLangRaceName = ["羅馬人", "條頓人", "高盧人"];
		aLangTaskOfText = ["預定升級", "預定建築", "資源自動升級", "尚未開啟", "馬上開啟", "已經開啟", "點擊關閉", "該村資源分布", "自動運輸", "自動運輸尚未設定", "已設定", "運送成功", "任務列表", "資源輸入限額", "默認", "更改", "木/磚/鐵", "穀物", "預定拆除",
			"預定發兵", "攻擊類型", "到達所需時間", "重複次數", "間隔時間", "00:00:00", "投石目標", "隨機", "未知", "次", "月", "日", "部隊已發出","預定訓練","訓練設施","訓練任務已執行","定制運輸","設定頁面刷新間隔","頁面刷新的間隔時間，是指隔多久執行一次頁面的自動載入。\n此時間過短，會增加被系統偵測到的危險，過長則影響任務執行的效率。\n默認為20分鐘，請輸入新的時間間隔：\n\n","資源輸出保留","預定活動","小型活動","大型活動","資源集中模式的間隔時間",
			"分鐘","暫停中","開啟中","開啟","暫停","預定改良","改良攻擊","改良防御"];
		aLangErrorText = ["資源不足", "已經有建築在建造中", "建造完成", "將馬上開始全部建造", "在開發中", "建造所需資源超過倉庫容量上限,請先升級你的倉庫", "建造所需資源超過糧倉容量上限,請先升級你的糧倉", "資源何時充足時間提示","粮食产量不足: 需要先建造一个农场","派對進行中"];
		aLangOtherText = ["重要提示", "只有主村的資源田可以升級到20，<br/>目前主村尚未識別，點擊個人資料<br/>頁面可以解決這一問題", "五星級傳送門^_ ^", "已經設置完成", "已經取消", "開始執行任務", "升級成功", "已順利執行", "種族尚未確認，兵種也就無法確定，<br/>請點擊個人資料頁面，以便偵測種族", "然後，請順便訪問英雄園，以便確認<br/>英雄的種類和速度。<br/>"];
		allsourceString = "伐木場泥坑鐵礦場農場";
		aLangResources=["木材","磚塊","鋼鐵","穀物"];
		allbuildString = "鋸木廠磚廠鋼鐵鑄造廠麵粉廠麵包店倉庫穀倉鐵匠盔甲廠競技場村莊大樓集結點市場大使館兵營馬棚工場研究院山洞城鎮廳行宮皇宮寶物庫交易所大兵營大馬廄城牆土牆木牆石匠舖釀酒廠陷阱機英雄宅大倉庫大穀倉世界奇觀放牧水槽";
		aLangTroops[0] = ["古羅馬步兵", "禁衛兵", "帝國兵", "使者騎士", "帝國騎士", "將軍騎士", "衝撞車", "火焰投石機", "參議員", "開拓者", "英雄"];
		aLangTroops[1] = ["棍棒兵", "矛兵", "斧頭兵", "偵察兵", "遊俠", "條頓騎士", "衝撞車", "投石車", "司令官", "開拓者", "英雄"];
		aLangTroops[2] = ["方陣兵", "劍士", "探路者", "雷法師", "德魯伊騎兵", "海頓聖騎", "衝撞車", "投石車", "族長", "開拓者", "英雄"];
		aLangAttackType = ["支援", "攻擊", "搶奪"];
		break;

	case "fi": // thanks Christer82
		aLangAllBuildWithId = ["Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto", "", "Saha", "Tiilitehdas", "Rautavalimo", "Mylly", "Leipomo", "Varasto", "Viljasiilo", "Aseseppä", "Haarniskapaja", "Turnausareena", "Päärakennus", "Kokoontumispiste", "Tori", "Lähetystö", "Kasarmi", "Talli", "Työpaja", "Akatemia", "Kätkö", "Kaupungintalo", "Virka-asunto", "Palatsi", "Aarrekammio", "Kauppavirasto", "Suuri kasarmi", "Suuri talli", "Kaupungin muuri", "Maamuuri", "Paaluaita", "Kivenhakkaaja", "Panimo", "Ansoittaja","Sankarin kartano", "Suuri varasto", "Suuri viljasiilo", "Maailmanihme", "Hevostenjuottoallas"];
		aLangAllResInDorf1=["Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto"]
		aLangAddTaskText = ["Lisää tehtävä", "Tyyli", "Kohdistettu kylä", "Tehtävän kohde", "Minne:", "Tyyppi", "Rakennustuki", "Resurssien keskittäminen", "Siirry ylös", "Siirry alas", "Poista", "&#160;&#160;&#160;Tehtävän sisältö", "Siirry ", "Poista kaikki tehtävät"];
		aLangTaskKind = ["Päivitä", "Uusi rakennus", "Hyökkäys", "Tutkimus", "Koulutus", "Kuljetus", "NPC", "Hajotus", "Juhla"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Taso", "Kauppiaat", "ID", "Pääkaupunki", "Aloitusaika", "Tätä aika-asetusta ei voi nyt käyttää.", "minne:", "Kylä", "kuljetus", "mistä", "Kuljeta kylään", "Kuljeta kylästä", "Palaa kylästä", "Resurssit", "rakennus", "Rakenna uusi rakennus", "tyhjä", "taso"];
		aLangRaceName = ["Roomalaiset", "Teutonit", "Gallialaiset"];
		aLangTaskOfText = ["Aseta kentän päivitys", "Aseta uusi rakennuskohde", "Automaattinen resurssipäivitys", "Ei toimintaa", "Aloita", "Aloitettu", "Keskeytä", "Tämän kylän resurssikenttien jakauma on ", "Automaattikuljetus", "automaattikuljetusta ei ole avattu", "Avattu", "Kuljetus onnistui", "Tehtäväluettelo", "Trans_In_limit", "Perusasetus", "Muokkaa", "Puu/Savi/Rauta", "vilja", "Tehtävälistan poisto",
			"Schedule attack", "Hyökkäystyyppi", "Kuljetusaika", "toistokerrat", "Hyökkäysaikaväli","00:00:00","Katapultin kohde","Satunnainen", "Tuntematon", "kertaa", "Kuukausi", "Päivä", "Joukot on lähetetty","Aseta koulutustehtävä","Koulutuskohde","Koulutustehtävä suoritettu","waitForTranslate","setup Hyökkäysaikaväli of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration",
			"minutes","pausing","running","run","pause","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Liian vähän resursseja", "Työntekijät ovat jo töissä.", "Rakennuskohde valmis", "Aloitetaan rakentaminen", "Työ kesken", "Varastosi on liian pieni. Suurenna varastoa aloittaaksesi rakentamisen", "Viljasiilosi on liian pieni. Suurenna viljasiiloa aloittaaksesi rakentamisen", "Riittävästi resursseja"];
		aLangOtherText = ["Tärkeä huomautus", "Vain pääkaupungin resurssikenttiä voidaan <br/>päivittää tasolle 20. Nyt pääkaupunkia<br/> ei voida todentaa. Päivitä profiiliasi, kiitos.", "Pikalinkki tähän ^_^", "Asennus valmis", "Peruttu", "Aloita tehtävät", "Päivitys valmis", "Tehty onnistuneesti", "Heimosi on määrittämätön, siksi joukkojesi tyyppiä <br/>Päivitä profiiliasi heimon määrittämiseksi.<br/>", "Käy Sankarin kartanossa määrittääksesi<br/> sankarisi tyypin ja nopeuden."];
		allsourceString = "PuunhakkaajaSavimonttuRautakaivosviljapelto"
		aLangResources=["waitTranslate","waitTranslate","waitTranslate","waitTranslate"];
		allbuildString = "SahaTiilitehdasRautavalimoMyllyLeipomoVarastoViljasiiloAseseppäHaarniskapajaTurnausareenaPäärakennusKokoontumispisteToriLähetystöKasarmiTalliTyöpajaAkatemiaKätköKaupungintaloVirka-asuntoPalatsiAarrekammioKauppavirastoSuuri kasarmiSuuri talliKaupungin muuriMaamuuriPaaluaitaKivenhakkaajaPanimoAnsoittajaSankarin kartanoSuuri varastoSuuri viljasiiloMaailmanihmeHevostenjuottoallas"
		aLangTroops[0] = ["Legioonalainen", "Pretoriaani", "Imperiaani", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Muurinmurtaja", "Tulikatapultti", "Senaattori", "Uudisasukas", "Sankari"];
		aLangTroops[1] = ["Nuijamies", "Keihäsmies", "Kirvessoturi", "Tiedustelija", "Paladiini", "Teutoniritari", "Muurinmurtaja", "Katapultti", "Päällikkö", "Uudisasukas", "Sankari"];
		aLangTroops[2] = ["Falangi", "Miekkasoturi", "Tunnustelija", "Teutateksen salama", "Druidiratsastaja", "Haeduaani", "Muurinmurtaja", "Heittokone", "Päällikkö", "Uudisasukas", "Sankari"];
		aLangAttackType = ["Vahvistus", "Hyökkäys", "Ryöstö"];
		break;

	case "us":
	case "au":	
	case "uk":	
	case "in": // thanks Abhi J
	case "com": // thanks  ieyp
	default:
		aLangAllBuildWithId = ["Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper","Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Pool"];
		aLangAllResInDorf1 = ["Woodcutter", "Clay Pit", "Iron Mine", "Cropland"];
		aLangAddTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "&#160;&#160;&#160;Task contents", "Move ", "Delete all the tasks"];
		aLangTaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Merchants", "ID", "Capital", "Start time", "this timeseting is unuseful now.", "to", "Village", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Construct new building", "empty", "level"];
		aLangRaceName = ["Romans", "Teutons", "Gauls"];
		aLangTaskOfText = ["Schedule Upgrade", "Schedule NewBuild", "Auto ResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Trans In limit", "Default", "Modify", "Wood/Clay/Iron", "Crop", "Schedule demolition",
			"Schedule attack", "Attack type", "Travel time", "repeat times", "interval time","00:00:00","Catapult target","Random", "Unknown", "times", "Month", "Day", "Troops sent",
			"Schedule Train", "Train site", "TrainTask done", "customTransport", "setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans Out Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration",
			"minutes", "pausing", "running", "run", "pause","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Too few resources.", "The workers are already at work.", "Construction completed", "Starting construction", "In development", "Your Warehouse is too small. Please upgrade your Warehouse to continue your construction", "Your Granary is too small. Please upgrade your Granary to continue your construction", "Enough resources","Lack of food: extend cropland first!","There is already a celebration going on"];
		aLangOtherText = ["Important note", "Only the resource fields of the capital can <br/>be upgraded to level 20. Now your capital<br/> is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup completed", "Cancelled", "Start the tasks", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. <br/>Visit your Profile to determine your race.<br/>", "Please also visit your Hero's Mansion to determine<br/> the speed and the type of your hero."];
		allsourceString = "WoodcutterClay PitIron MineCropland";
		aLangResources=["lumber","clay","iron","crop"];
		allbuildString = "SawmillBrickyardIron FoundryGrain MillBakeryWarehouseGranaryBlacksmithArmouryTournament SquareMain BuildingRallypointMarketplaceEmbassyBarracksStableWorkshopAcademyCrannyTown HallResidencePalaceTreasuryTrade OfficeGreat BarracksGreat StableCity WallEarth WallPalisadeStonemason's LodgeBreweryTrapperHero's MansionGreat WarehouseGreat GranaryWonderHorse Drinking Pool";
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];
		aLangAttackType = ["Reinforce", "Attack", "Raid"];
		break;

	case "pl": // partial translation by deFox
		aLangAllBuildWithId = ["Las", "Kopalnia gliny", "Kopalnia żelaza", "Pole zboża", "", "Tartak", "Cegielnia", "Huta stali", "Młyn", "Piekarnia", "Magazyn surowców", "Spichlerz", "Zbrojownia", "Kuźnia", "Plac turniejowy", "Główny budynek", "Miejsce zbiórki", "Rynek", "Ambasada", "Koszary", "Stable", "Workshop", "Academy", "Cranny", "Town Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason's Lodge", "Brewery", "Trapper","Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder Of The World", "Horse Drinking Pool"];
		aLangAllResInDorf1 = ["Las", "Kopalnia gliny", "Kopalnia żelaza", "Pole zboża"];
		aLangAddTaskText = ["Add task", "Style", "Active village", "Task target", "To", "Mode", "Construction support", "Resources concentration", "Move up", "Move down", "Del", "&#160;&#160;&#160;Task contents", "Move ", "Delete all the tasks"];
		aLangTaskKind = ["Upgrade", "NewBuild", "Attack", "Research", "Train", "Transport", "NPC", "Demolish", "Celebration"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Merchants", "ID", "Capital", "Start time", "this timeseting is unuseful now.", "to", "Village", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Construct new building", "empty", "level"];
		aLangRaceName = ["Rzymianie", "Germanie", "Galowie"];
		aLangTaskOfText = ["Zaplanuj Upgrade", "Zaplanuj Budowę", "Auto ResUpD", "Not_run", "Start", "Started", "Suspend", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Lista zadań", "Trans In limit", "Domyśl.", "Zmień", "Drewno/Glina/Żelazo", "Zboże", "Schedule demolition",
			"Zaplanuj atak", "Typ Ataku", "Czas podróży", "repeat times", "odstęp czasu", "00:00:00","Cel dla katapult", "Losowy", "Nieznany", "times", "Mies.", "Dzień", "Troops sent",
			"Zaplanuj szkolenie", "Train site", "TrainTask done", "customTransport", "setup interval time of reload","this is the interval of page reload,\n default is 20 minutes, please insert new time:\n\n","Trans Out Rmn","ScheduleParty","small party","big party","setInterval of Resources concentration",
			"minut", "pausing", "running", "run", "pause","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Zbyt mało surowców.", "The workers are already at work.", "Construction completed", "Starting construction", "In development", "Your Warehouse is too small. Please upgrade your Warehouse to continue your construction", "Your Granary is too small. Please upgrade your Granary to continue your construction", "Enough resources","Lack of food: extend cropland first!","There is already a celebration going on"];
		aLangOtherText = ["Ważna wiadomość", "Tylko w stolicy można rozbudować teren do poz. 20.<br/>Aktywna wioska nie została rozpoznana jako stolica.<br/>Wejdź w Ustawienia by wywołać aktualizację.", "Szybki link ^_^", "Setup completed", "Cancelled", "Start the tasks", "Upgrade successfully", "Run successfully", "Nie udało się określić twojej rasy, stąd typy jednostek<br/>nie są znane. Wejdź w Ustawienia by skrypt wykrył twoją rasę.<br/>", "Please also visit your Hero's Mansion to determine<br/> the speed and the type of your hero."];
		allsourceString = "LasKopalnia glinyKopalnia żelazaPole zboża";
		aLangResources = ["drewno", "glina", "żelazo", "zboże"];
		allbuildString = "SawmillBrickyardIron FoundryGrain MillBakeryWarehouseGranaryBlacksmithArmouryTournament SquareMain BuildingRallypointMarketplaceEmbassyBarracksStableWorkshopAcademyCrannyTown HallResidencePalaceTreasuryTrade OfficeGreat BarracksGreat StableCity WallEarth WallPalisadeStonemason's LodgeBreweryTrapperHero's MansionGreat WarehouseGreat GranaryWonderHorse Drinking Pool"
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];
		aLangTroops[2] = ["Falanga", "Miecznik", "Tropiciel", "Grom Teutatesa", "Jeździec druidzki", "Haeduan", "Taran", "Trebusz", "Herszt", "Osadnicy", "Bohater"];
		aLangAttackType = ["Posiłki", "Atak normalny", "Grabież"];
		break;

	case "ua":
		aLangAllBuildWithId = ["Лісоповал", "Глиняний кар'єр", "Залізна копальня", "Ферма", "", "Деревообробний завод", "Цегляний завод", "Чавуноливарний завод", "Млин", "Пекарня", "Склад", "Зернова комора", "Кузня зброї", "Кузня обладунків", "Арена", "Головна будівля", "Пункт збору", "Ринок", "Посольство", "Казарма", "Стайня", "Майстерня", "Академія", "Схованка", "Ратуша", "Резиденція", "Палац", "Скарбниця", "Торгова палата", "Велика казарма", "Велика стайня", "Міська стіна", "Земляний вал", " Огорожа", "Каменяр", "Пивна", "Капканщик","Таверна", "Великий склад", "Велика Зернова комора", "Чудо світу", "Водопій"];
		aLangAllResInDorf1=["Лісоповал", "Глиняний кар'єр", "Залізна копальня", "Ферма"]
		aLangAddTaskText = ["Додати завдання", "Спосіб", "Активне поселення", "Ціль завдання", "| Ціль", "Тип", "Підтримка будівництва", "Концентрація ресурсів", "Вверх", "Вниз", "", "", "", "Видалити усі завдання"];
		aLangTaskKind = ["Покращити:", "Нове завдання:", "Атакувати:", "Розвідати:", " наняти:", "Відправити ресурси:", "NPC:", "Зруйнувати:", "Урочистість:"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = [" Рівень ", "Торговці", "ID", "Столиця", "Час початку", "(тимчасово не працює)", "в", "Поселення", "Транспортування", "з", "Транспортування в", "Транспортування из", "Повернення з", "ресурси", "будівля", "Побудувати нову будівлю", "пусто", "рівень"];
		aLangRaceName = ["Римляни", "Тевтонці", "Галли"];
		aLangTaskOfText = ["Запланувати удосконалення", "Запланувати нове завдання", "Качати реурси", "Викл", "Старт", "Вкл", "стоп", "Розполілення полів в поселенні: ", "Автовідправлення", "Автовідправлення викл.", "Вкл.", "Успішно відправленно", "* Задачі *", "Обмеження ввозу", "Ні", "Змінити ", "Дерево/Глина/Залізо", "Зерно", "Запланувати зруйнування",
			"Запланувати атаку", "Тип атаки", "Час в дорозі", "повтори", "проміжок","00:00:00","Ціль катов","Випадково", "Невідомо", " раз", "/", " :дата/час: ", "Війска",
			"Запланувати найм","Train site","Навчання військ завершено","цілеве відправлення","Інтервал оновлення","Це інтервал оновлення сторінки ,\n по замовчуванню - 20 хвилин, Введіть новоий час:\n\n","Обмеження вивозу","Запланувати святкування","Малий праздник","Великий праздник","Встановлення інтервала концентрації ресурсів",
			"хвилини","зупинено","працює","старт","пауза","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Недостатньо сировини", "Всі будівельники зараз зайняті", "Це завдання зупинено повністю", "Починаю будівництво", "Процес розвитку", "Недостатня місткість складу", "Недостатня місткість Зернової комори", "Достатньо ресурсів","","Проводится урочистість"];
		aLangOtherText = ["Важливі замітки", "Тільки в столиці поля можуть бути до рівня 20. Столиця не визначена.Зайдіть в профіль будьласка", "Ссилка тут ^_^", "Настройка завершена", "Відмінено", "Почати завдання", "Удосконалення пройшло успішно", "Успішно", "Ваш народ невизначений.Будьласка зайдіть в профіль.", "Також будьласка зайдіть в таверну для визначення типу та скорості героя"];
		allsourceString = "ЛісоповалГлиняний кар'єрЗалізна копальняФерма"
		aLangResources=["Деревина","Глина","Залізо","Зерно"];
		allbuildString = "Деревообробний заводЦегляний заводЧавуноливарний заводМлинПекарняСкладЗернова комораКузня зброїКузня обладунківАренаГоловна будівляПункт зборуРинокПосольствоКазармаСтайняМайстерняАкадеміяСхованкаРатушаРезиденціяПалацСкарбницяТоргова палатаВелика казармаВелика стайняМіська стінаЗемляний валОгорожаКаменярПивнаКапканщикТавернаВеликий складВелика Зернова комораЧудо світуВодопій"
		aLangTroops[0] = ["Легіонер", "Преторіанець", "Імперіанець", "Кінний розвідник", "Кіннота імператора", "Кіннота Цезаря", "Таран", "Вогняна катапульта", "Сенатор", "Поселенець", "Герой"];
		aLangTroops[1] = ["Дубинник", "Списник", "Сокирник", "Скаут", "Паладин", "Тевтонський вершник", "Стінобитне знаряддя", "Катапульта", "Ватажок", "Поселенець", "Герой"];
		aLangTroops[2] = ["Фаланга", "Мечник", "Слідопит", "Тевтацький грім", "Друїд-вершник", "Едуйська кіннота", "Таран", "Катапульта", "Лідер", "Поселенець", "Герой"];
		aLangAttackType = ["Підкріплення", "Напад", "Набіг"];
		break;

	case "tr": // by karambol
		aLangAllBuildWithId = ["Orman", "Tuğla Ocağı", "Demir Madeni", "Tarla", "", "Marangozhane", "Tuğla Fırını", "Demir Dökümhanesi", "Değirmen", "Ekmek Fırını", "Hammadde Deposu", "Tahıl Ambarı", "Silah Dökümhanesi", "Zırh Dökümhanesi", "Turnuva Yeri", "Merkez Binası", "Askeri Üs", "Pazar", "Elçilik", "Kışla", "Ahır", "Tamirhane", "Akademi", "Sığınak", "Belediye", "Köşk", "Saray", "Hazine", "Ticari Merkez", "Büyük Kışla", "Büyük Ahır", "Sur", "Toprak Siper", "Çit", "Taşçı", "İçecek Fabrikası", "Tuzakçı","Kahraman Kışlası", "Büyük Hammadde Deposu", "Büyük Tahıl Ambarı", "Dünya Harikası", "Yalak"];
		aLangAllResInDorf1=["Orman", "Tuğla Ocağı", "Demir Madeni", "Tarla"];
		aLangAddTaskText = ["Görev Ekle", "Stil", "Aktif Köy", "Görev Hedefi", "To", "Mode", "Construction support", "Hammadde karışımı", "Yukarı Çık", "Aşağı İn", "Sil", "&nbsp;&nbsp;&nbsp;Görev içeriği", "İlerle ", "Bütün görevleri sil"];
		aLangTaskKind = ["Güncelle", "Yeni Bina", "Hücum", "Araştır", "Eğit", "Gönder", "NPC", "Yık", "Festival"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Seviye", "Tüccar", "ID", "Başkent", "Başlangıç zamanı", "bu zaman ayarı kullanılamaz.", "buraya", "köy", "gönder", "buradan", "Gönderiliyor", "Gönderildi", "Dönüş", "hammadde", "bina", "Yeni bina kur", "boş", "seviye"];
		aLangRaceName = ["Romalılar", "Cermenler", "Galyalılar"];
		aLangTaskOfText = ["Güncellemeye zamanla", "Schedule Yeni Bina", "Otomatik hammadde güncelle", "Not_run", "Başlat", "Başladı", "Durdu", "Bu köyün kaynak alanları dağılımıdır ", "Otomatik Gönderme", "Otomatik gönderme açılmadı", "Açıldı", "Gönderme Tamamladı", "Görev listesi", "Gönderme limiti", "Varsayılan", "Değiştir", "odun/tuğla/demir", "tahıl", "Yıkım zamanla",
			"Hücum zamanla", "Hücum türü", "Varış zamanı", "tekrar zamanı", "aralık süresi","00:00:00","Mancınık hedef","Rasgele", "Bilinmeyen", "zaman", "Ay", "Gün", "Asker gönder", "Eğitim zamanla","Train site","Eğitim görevi tamamlandı","customTransport","setup interval time of reload","sayfa aralığı yeniden ,\n varsayılan olarak 20 dakikadır, Lütfen yeni zamanı girin:\n\n","Trans Out Rmn","Festivalzamanla","Küçük festival","Büyük festival","konsantrasyon Aralığı Kaynakları kümesi",
			"dakikalar","bekliyor","çalışıyor","çalış","bekle","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Çok az kaynak.", "Işçi zaten iş başında.", "İnşaat tamamlandı", "İnşaat başlatılıyor", "Araştırma yapılıyor", "Hammadde Deposu çok küçük. Hammadde Deposunu geliştirip öyle devam edin inşaata", "Tahıl Ambarın çok küçük. Tahıl Ambarını geliştirip öyle devam edin inşaata", "Yeterli hammadde","Gıda eksikliği: önce Tarlanı geliştir!","Şu anda bir festival yapılıyor zaten"];
		aLangOtherText = ["Önemli not", "Sadece başkent için hammadde üretebilirsiniz <br/>be Güncellendi seviye 20. Şimdi Başkentin<br/> tesbit edilemedi. Profilinizi ziyaret edin önce.", "Buraya kısa yol ^_^", "Kurulum tamamlandı", "Vazgeçildi", "Görevleri başlat", "Güncelleme tamamlandı", "Çalışma tamam", "Irkınız bilinmediğinden asker tütünüz belilenemedi <br/>Profilinizi ziyaret edip ırkınızı belirleyin<br/>", "Ayrıca kahraman kışlasınıda ziyaret edin<br/> Kahramanınızın hızı ve tipi."];
		allsourceString = "OrmanTuğla OcağıDemir MadeniTarla";
		aLangResources=["odun","tuğla","demir","tahıl"];
		allbuildString = "MarangozhaneTuğla FırınıDemir DökümhanesiDeğirmenEkmek FırınıHammadde DeposuTahıl AmbarıSilah DökümhanesiZırh DökümhanesiTurnuva YeriMerkez BinasıAskeri ÜsPazarElçilikKışlaAhırTamirhaneAkademiSığınakBelediyeKöşkSarayHazineTicari MerkezBüyük KışlaBüyük AhırSurToprak SiperPalisadeTaşçıİçecek FabrikasıTuzakçıKahraman KışlasıBüyük Hammadde DeposuBüyük Tahıl AmbarıDünya HarikasıYalak"
		aLangTroops[0] = ["Lejyoner", "Pretoryan", "Emperyan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Koçbaşı", "Ateş Mancınığı", "Senatör", "Göçmen", "Kahraman"];
		aLangTroops[1] = ["Tokmak Sallayan", "Mızrakçı", "Balta Sallayan", "Casus", "Paladin", "Toyton", "Koçbaşı", "Mancınık", "Reis", "Göçmen", "Kahraman"];
		aLangTroops[2] = ["Phalanx", "Kılıçlı", "Casus", "Toytatın Şimşeği", "Druyid", "Heduan", "Koçbaşı", "Mancınık", "Kabile Reisi", "Göçmen", "Kahraman"];
		aLangAttackType = ["Destek", "Saldırı: Normal", "Saldırı: Yağma"];
		break;
		
	case "br":
		aLangAllBuildWithId = ["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "", "Serraria", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de torneios", "Edifício principal", "Ponto de reunião militar", "Mercado", "Embaixada", "Quartel", "Cavalaria", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Tesouraria", "Companhia do Comércio", "Grande Quartel", "Grande Cavalaria", "Muralha", "Barreira", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas","Mansão do Herói", "Grande armazém", "Grande Celeiro", "Maravilha do Mundo", "Bebedouro para cavalos"];
		aLangAllResInDorf1=["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereal"]
		aLangAddTaskText = ["Adicionar tarefa", "Estilo", "Aldeia Activa", "Alvo", "Para", "Modo", "Ajuda na Construção", "Quantidade de recursos", "Mover para cima", "Mover para baixo", "Apagar", "&#160;&#160;&#160;Tarefas", "Mover ", "Eliminar todas as tarefas"];
		aLangTaskKind = ["Evolução", "Novo construção", "Ataque", "Pesquisa", "Treino", "Transporte", "NPC", "Demolição", "Celebração"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Mercadores", "Identificação", "Capital", "Inicio", "this timeseting is unuseful now.", "Para", "Aldeia", "Transporte", "de", "Transporte para", "Transporte de", "A regressar de", "Recursos", "Edificio", "Construir novo edifício", "Vazio", "Nivel"];
		aLangRaceName = ["Romanos", "Teutões", "Gauleses"];
		aLangTaskOfText = ["Agendar Evolução", "Agendar nova construção", "ResourcesUpD", "OFF", "Iniciar", "ON", "Parar", "A distribuição dos campos desta aldeia é ", "Autotransporte", "Autotransporte não está aberto", "Aberto", "Transporte com sucesso", "Lista de agendamento", "Limit", "Default", "Alterar", "madeira/barro/ferro", "cereal", "Agendamento de demolição",
			"Agendamento de ataque", "Tipo de ataque", "Tempo de viagem", "Repetir número de vezes", "Tempo de intervalo","00:00:00","Alvo catapulta","Aleatório", "Desconhecido", "Vezes", " Mês", " Dia", "Tropas enviadas",
			"Agendamento de treino","localização de tropas","Agendamento de treino feito","Transporte personalizado","Setup Interval Time of Reload","This is the interval of page reload ,\n default são 20 minutos, Insira novo tempo:\n\n","Remain","Agendar Celebração","pequena celebração","grande celebração","Set Interval of Resources concentration",
			"minutos","parado","ligado","ligar","parar","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Poucos recursos.", "Os trabalhadores já estão a trabalhar.", "Construção completa", "Inicio da construção", "Em desenvolvimento", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"];
		aLangOtherText = ["Nota importante", "Apenas os campos de recursos da capital <br/>podem ser elevados a nivel 20 . A sua capital <br/> nao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Instalação concluída", "Cancelado", "Iniciar as tarefas", "Upgrade com sucesso", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também. <br/>Visite o seu perfil para determinar as raça.<br/>", "Por favor visite a sua mansão do heroi para determinar<br/> a velocidade e o tipo de heroi."];
		allsourceString = "BosquePoço de BarroMina de FerroCampo de Cereais"
		aLangResources=["Madeira","Barro","Ferro","Cereais"];
		allbuildString = "SerrariaAlvenariaFundiçãoMoinhoPadariaArmazémCeleiroFerreiroFábrica de ArmadurasPraça de torneiosEdifício principalPonto de reunião militarMercadoEmbaixadaQuartelCavalariaOficinaAcademiaEsconderijoCasa do PovoResidênciaPalácioTesourariaCompanhia do ComércioGrande QuartelGrande CavalariaMuralhaBarreiraPaliçadaPedreiroCervejariaFábrica de ArmadilhasMansão do HeróiGrande ArmazémGrande CeleiroMaravilha do MundoBebedouro para cavalos"
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador", "Heroi"];
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador", "Heroi"];
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador", "Heroi"];
		aLangAttackType = ["Reforço", "Ataque", "Assalto"];
		break;

	case "pt": // thanks RASCO and Tuga
		aLangAllBuildWithId = ["Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "", "Serração", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de torneios", "Edifício principal", "Ponto de reunião militar", "Mercado", "Embaixada", "Quartel", "Cavalariça", "Oficina ", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Tesouraria", "Companhia do Comércio", "Grande Quartel", "Grande Cavalariça", "Muralha", "Barreira", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas","Mansão do Herói", "Grande armazém", "Grande Celeiro", "Maravilha do Mundo", "Bebedouro para cavalos"];
		aLangAllResInDorf1=["Bosque", "Poço de barro", "Mina de ferro", "Campo de cereais"]
		aLangAddTaskText = ["Adicionar tarefa", "Estilo", "Aldeia Activa", "Alvo", "Para", "Modo", "Ajuda na Construção", "Quantidade de recursos", "Mover para cima", "Mover para baixo", "Apagar", "&#160;&#160;&#160;Tarefas", "Mover ", "Eliminar todas as tarefas"];
		aLangTaskKind = ["Evolução", "Novo construção", "Ataque", "Pesquisa", "Treino", "Transporte", "NPC", "Demolição", "Celebração"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Mercadores", "Identificação", "Capital", "Inicio", "this timeseting is unuseful now.", "Para", "Aldeia", "Transporte", "de", "Transporte para", "Transporte de", "A regressar de", "Recursos", "Edificio", "Construir novo edifício", "Vazio", "Nivel"];
		aLangRaceName = ["Romanos", "Teutões", "Gauleses"];
		aLangTaskOfText = ["Agendar Evolução", "Agendar nova construção", "ResourcesUpD", "OFF", "Iniciar", "ON", "Parar", "A distribuição dos campos desta aldeia é ", "Autotransporte", "Autotransporte não está aberto", "Aberto", "Transporte com sucesso", "Lista de agendamento", "Limit", "Default", "Alterar", "madeira/barro/ferro", "cereal", "Agendamento de demolição",
			"Agendamento de ataque", "Tipo de ataque", "Tempo de viagem", "Repetir número de vezes", "Tempo de intervalo","00:00:00","Alvo catapulta","Aleatório", "Desconhecido", "Vezes", " Mês", " Dia", "Tropas enviadas", "Agendamento de treino","localização de tropas","Agendamento de treino feito","Transporte personalizado","Setup Interval Time of Reload","This is the interval of page reload ,\n default são 20 minutos, Insira novo tempo:\n\n","Remain","Agendar Celebração","pequena celebração","grande celebração","Set Interval of Resources concentration",
			"minutos","parado","ligado","ligar","parar","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Poucos recursos.", "Os trabalhadores já estão a trabalhar.", "Construção completa", "Inicio da construção", "Em desenvolvimento", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"];
		aLangOtherText = ["Nota importante", "Apenas os campos de recursos da capital <br/>podem ser elevados a nivel 20 . A sua capital <br/> nao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Instalação concluída", "Cancelado", "Iniciar as tarefas", "Upgrade com sucesso", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também. <br/>Visite o seu perfil para determinar as raça.<br/>", "Por favor visite a sua mansão do heroi para determinar<br/> a velocidade e o tipo de heroi."];
		allsourceString = "BosquePoço de BarroMina de FerroCampo de Cereais"
		aLangResources = ["Madeira","Barro","Ferro","Cereais"];
		allbuildString = "SerraçãoAlvenariaFundiçãoMoinhoPadariaArmazémCeleiroFerreiroFábrica de ArmadurasPraça de torneiosEdifício principalPonto de reunião militarMercadoEmbaixadaQuartelCavalariçaOficinaAcademiaEsconderijoCasa do PovoResidênciaPalácioTesourariaCompanhia do ComércioGrande QuartelGrande CavalariçaMuralhaBarreiraPaliçadaPedreiroCervejariaFábrica de ArmadilhasMansão do HeróiGrande ArmazémGrande CeleiroMaravilha do MundoBebedouro para cavalos"
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador", "Heroi"];
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador", "Heroi"];
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador", "Heroi"];
		aLangAttackType = ["Reforço", "Ataque", "Assalto"];
		break;

	case "cl":
	case "mx":
	case "net": // thanks Renzo
		aLangAllBuildWithId = ["Leñador", "Barrera", "Mina de Hierro", "Granja", "", "Serrería", "Ladrillar", "Fundición de Hierro", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de Torneos", "Edificio Principal", "Plaza de Reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Palacio", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplén", "Empalizada", "Cantero", "Cervecería", "Trampero","Hogar del Héroe", "Almacén Grande", "Granero Grande", "Maravilla", "Abrevadero"];
		aLangAllResInDorf1 = ["Leñador", "Barrera", "Mina de Hierro", "Granja"];
		aLangAddTaskText = ["Añadir tarea", "Estilo", "Aldea activa", "Objetivo de Tarea", "Para", "Modo", "Soporte de Construcción", "Concentración de Recursos", "Ir arriba", "Ir abajo", "Borrar", "   Contenido de tarea", "Mover ", "Borrar todas las tareas"];
		aLangTaskKind = ["Subir", "Nueva Construcción", "Atacar", "Mejorar", "Entrenar", "Transportar", "NPC", "Demoler", "Fiesta"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Nivel", "Comerciantes", "ID", "Capital", "Tiempo de Inicio", "esta prueba de tiempo no es útil.", "para", "Aldea", "transportar", "de", "Transportar a", "Transporte de", "Regreso de", "recursos", "edificio", "Construir nuevo edificio", "vacío", "nivel"];
		aLangRaceName = ["Romanos", "Germanos", "Galos"];
		aLangTaskOfText = ["Programar subida", "Programar nueva Construcción", "AutoResUpD", "Not_run", "Empezar", "Empezado", "Suspender", "La distribución de campos de recursos de esta aldea es ", "Autotransporte", "Autotransporte no está abierto", "Abierto", "Transporte exitoso", "Lista de Tareas", "Trans_In_limit", "Por Defecto", "Modificar", "Madera/Barro/Hierro", "Cereal", "Programar demolición",
			"Programar ataque", "Tipo de Ataque", "Tiempo de Viaje", "Número de Repeticiones", "Tiempo de intervalo","00:00:00","Objetivo de Catapulta","Al Azar", "Desconocido", "Veces", "Mes", "Día", "Tropas enviadas", "Programar Cadena","Sitio de Cadena","Tarea de Cadena completada","Transporte Custom","Establecer tiempo de intervalo de la recarga","este es el tiempo de intervalo entre cada recarga de la página,\n Por defecto es 20 minutos, por favor introduza el nuevo tiempo:\n\n","Trans_Out_Rmn","Programar Fiesta","fiesta pequeña","fiesta grande","Establecer intervalo de concentración de recursos",
			"minutos","pausando","ejecutando", "ejecutar", "pausar", "Programar Mejora", "Mejorar Ataque", "Mejorar Defensa"];
		aLangErrorText = ["Muy pocos recursos.", "Los aldeanos ya están trabajando.", "Construcción completa", "Empezando construcción", "En desarrollo", "Su almacén es muy pequeño. Por favor amplíe su almacén para continuar su construcción", "Su almacén es muy pequeño. Por favor amplíe su almacén para continuar su construcción", "Suficientes Recursos","Falta de Alimento: Amplíe una granja primero!","Ya hay una fiesta en progreso","Ya hay una exploración en progreso"];
		aLangOtherText = ["Nota importante", "Solo los campos de recurso de la capital pueden ser ampliados a nivel 20. Su capital no ha sido detectada. Por favor visite su perfil.", "Atajo aquí ^_^", "Configuración completada", "Cancelado", "Empezar tareas", "Mejora Exitosa", "Ejecución exitosa", "Su raza es desconocida, asimismo su tipo de tropas. Visite su Perfil para determinar su raza.", "Por favor visite su Hogar del Heroe para determinar la velocidad y tipo de su heroe."];
		allsourceString = "WoodcutterClay PitIron MineCropland";
		aLangResources = ["madera", "barro", "hierro", "cereal"];
		allbuildString = "SerreríaLadrillarFundición de HierroMolinoPanaderíaAlmacénGraneroHerreríaArmeríaPlaza de TorneosEdificio PrincipalPlaza de ReunionesMercadoEmbajadaCuartélEstabloTallerAcademiaEsconditeAyuntamientoResidenciaPalacioTesoroOficina de ComercioCuartél GrandeEstablo GrandeMurallaTerraplénEmpalizadaCanteroCerveceríaTramperoHogar del HéroeAlmacén GrandeGranero GrandeMaravillaAbrevadero";
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Carnero", "Catapulta de Fuego", "Senador", "Colono", "Héroe"];
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Emisario", "Paladín", "Jinete Teutón", "Ariete", "Catapulta", "Cabecilla", "Colono", "Héroe"];
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Batidor", "Rayo de Teutates", "Jinete Druida", "Jinete Eduo", "Ariete", "Catapulta de Guerra", "Cacique", "Colono", "Héroe"];
		aLangAttackType = ["Refuerzo", "Ataque", "Atraco"];
		break;

	case "se": // thanks to Arias
		aLangAllBuildWithId = ["Skogshuggare", "Lergrop", "Järngruva", "Vetefält", "", "Sågverk", "Murbruk", "Järngjuteri", "Vetekvarn", "Bageri", "Magasin", "Silo", "Smedja", "Vapenkammare", "Tornerplats", "Huvudbyggnad", "Samlingsplats", "Marknadsplats", "Ambassad", "Baracker", "Stall", "Verkstad", "Akademi", "Grotta", "Stadshus", "Residens", "Palats", "Skattkammare", "Handelskontor", "Stor barack", "Stort stall", "Stadsmur", "Jordvall", "Palisad", "Stenmurare", "Bryggeri", "Fälla", "Hjältens egendom", "Stort magasin", "Stor silo", "Världsunder", "Vattenbrunn"];
		aLangAllResInDorf1 = ["Skogshuggare", "Lergrop", "Järngruva", "Vetefält"];
		aLangAddTaskText = ["Lägg till uppgift", "Stil", "Aktiv by", "Task target", "Till", "Läge", "Kontruktions stöd", "Råvaro koncentration", "Flytta upp", "Flytta ner", "Radera", "Uppgifter", "Flytta ", "Radera alla uppgifterna"];
		aLangTaskKind = ["Uppgradering:", "Ny byggnad:", "Attack:", "Forskning:", "Träning:", "Transport:", "NPC:", "Demolish:", "Celebration:"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Nivå ", "Handel", "ID", "Capital", "Start time", "this timesetting is unuseful now.", "till", "By", "Transport", "från", "Transport till", "Transport från", "Återvänder från", "Råvaror", "Byggnad", "Konstruera en ny byggnad", "Tom", "Nivå"];
		aLangRaceName = ["Romare", "Germaner", "Galler"];
		aLangTaskOfText = ["Schemalägg uppgradering", "Schemalägg ny byggnad", "Uppgradera fält", "Ej Aktiv", "Starta", "Startad", "Avbryt", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport lyckades", "Uppgifter", "Trans_In_limit", "Standard", "Ändra ", "Trä/Lera/Järn", "Vete", "Schemalägg demolition",
			"Schemalägg attack", "Attack type", "Res tid", "antal upprepningar", "interval time","00:00:00","Catapult target","Random", "Okänd", "times", "Månad", "Dag", "Trupper skickade", "Schemalägg Träning","Tränings plats","Träningen klar","Anpassad transport","Sätt intervallen för omladdning av sidan","Detta är intevallen för omladdning av sida,\n standard är 20 minuter, vänligen ange ny intervall:\n\n","Trans_Out_Rmn","Schemalägg fest","Liten fest","Stor fest","Sätt intervall av råvarukoncentration",
			"minuter","Pausad","Kör","Aktivera","Inaktivera","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["För få råvaror", "Dina arbetare är redan ute på jobb", "Byggnad klar", "Påbörjar byggnad", "Under utveckling", "Ditt magasin är för litet. Vänligen uppgradera ditt magasin för att fortsätta ditt byggnadsarbete.", "Din silo är för liten. Vänligen uppgradera din silo för att fortsätta ditt byggnadsarbete.", "Tillräckligt med resurser", "Brist på mat: utöka vetefälten först!", "En fest pågår redan."];
		aLangOtherText = ["Important note", "Only the resource fields of the capital can <br/>be upgraded to level 20. Now your capital<br/> is not detected. Visit your Profile please.", "Shortcut here ^_^", "Setup klar", "Avbruten", "Starta uppgifterna", "Upgrade successfully", "Run successfully", "Your race is unknown, therefore your troop type. <br/>Visit your Profile to determine your race.<br/>", "Please also visit your Hero's Mansion to determine<br/> the speed and the type of your hero."];
		allsourceString = "SkogshuggareLergropJärngruvaVetefält";
		aLangResources=["Trä","Lera","Järn","Vete"];
		allbuildString = "SkogshuggareLergropJärngruvaVetefältSågverkMurbrukJärngjuteriVetekvarnBageriMagasinSiloSmedjaVapenkammareTornerplatsHuvudbyggnadSamlingsplatsMarknadsplatsAmbassadBarackerStallVerkstadAkademiGrottaStadshusResidens PalatsSkattkammareHandelskontorStor barackStort stallStadsmurJordvallPalissadStenhuggareBryggeriFällaHjältens egendom";
		aLangTroops[0] = ["Legionär", "Praetorian", "Imperiesoldat", "Spårare", "Imperieriddare", "Ceasarriddare", "Murbräcka", "Eld Katapult", "Senator", "Nybyggare", "Hjälte"];
		aLangTroops[1] = ["Klubbman", "Spjutman", "Yxman", "Scout", "Paladin", "Germansk Knekt", "Murbräcka", "Katapult", "Stamledare", "Nybyggare", "Hjälte"];
		aLangTroops[2] = ["Falanx", "Svärdskämpe", "Spårare", "Theutates Blixt", "Druidryttare", "Haeduan", "Murbräcka", "Krigskatapult", "Hövding", "Nybyggare", "Hjälte"];
		aLangAttackType = ["Förstärkning", "Normal", "Plundring"];
		break;

	case "it": // thanks Hamkrik 
		aLangAllBuildWithId = ["Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano", "", "Falegnameria", "Fabbrica di Mattoni", "Fonderia", "Mulino", "Forno", "Magazzino", "Granaio", "Fabbro", "Armeria", "Arena", "Centro del villaggio", "Caserma", "Mercato", "Ambasciata", "Campo d'addestramento", "Scuderia", "Officina", "Accademia", "Deposito Segreto", "Municipio", "Residence", "Castello", "Camera del tesoro", "Ufficio commerciale", "Grande caserma", "Grande scuderia", "Mura Cittadine", "Fortificazioni", "Palizzata", "Genio civile", "Birrificio", "Esperto di trappole", "Circolo degli eroi", "Grande Magazzino", "Grande Granaio", "Meraviglia", "Fonte Equestre"]; 
		aLangAllResInDorf1=["Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano"] 
		aLangAddTaskText = ["Aggiungere Compito", "Stilo", "Villaggio Attivo", "Obiettivo del Compito", "Alla", "Mode", "Supporto di Costruzione", "Resource concentration", "SU", "JU", "Cancella", "   Contenuto di Compito", "Movere", "Cancella tutti i Compiti"]; 
		aLangTaskKind = ["Amplia", "Nuovo Edificio", "Attacco", "Ricerca", "Addestra", "Trasporto", "NPC", "Demolire", "Festa"]; 
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"]; 
		aLangGameText = ["Livelo", "Mercanti", "ID", "Capitala", "Tempo di Inizio", "questa impostazione di timpo non si usa.", "alla", "Villaggio", "transporto", "dalla", "Transporto alla", "Transporto dalla", "Retorno dalla", "risorse", "edifici", "Costruisci nuovo edificio", "vuoto", "livelo"]; 
		aLangRaceName = ["Romani", "Teutoni", "Galli"]; 
		aLangTaskOfText = ["Programma Ampliamento", "Programma Nuovo Efificio", "AutoResUpD", "Non_attivo", "Start", "Iniziato", "Sospeso", "The resource fields distribution of this village is ", "Autotransporto", "Autotransporto non e aperto", "Aperto", "Transportato successo", "Lista Compiti", "Trans_In_limit", "Default", "Modificare", "Legno/Argilla/Ferro", "Grano", "Demolire",
			"Programma Attacco", "Tipo Attacco", "Tempo Percorso", "ripeti", "intervalo di tempo","00:00:00","Obiettivo Catapulta", "Random", "Scunosciuto", "volte", "Mese", "Giorno", "Truppe Inviate", "Programma Addestramento", "Addestra site", "Addestramento Finito","Transporto Diverso","ripeti numero volte","questo è intervalo di ricarica pagina,\n default è 20 minute, per favore inserisce nuovo tempo:\n\n","Trans_Out_Rmn","Programma la Festa","festa picola","festa grande","Imposta il Intervalo di Concentrazione di Resurse",
			"minute","in attesa","corrente","fare","pausa","Schedule Improve","Improve Attack","Improve defence"]; 
		aLangErrorText = ["Mancano le resurce.", "I Lavoratori Sono Pronti per Lavorare", "Edificio Completo", "Inizia Edificio", "Nella Ricerca", "Il tuo Magazzino e Picolo. Per favore Amplia il Magazzino per continuare la costructione", "Il tuo Granaio e Picolo. Per favore Amplia il Granaio per continuare la costructione", "Resurse sufficientemente","Mancanza di Cibo: Amplia Campo di grano!","Pronta la Fiesta"]; 
		aLangOtherText = ["Nota Importante ", "Solo i Campi della Capitale possono essere ampliate al livelo 20. La tua capitale non è determinata. Visita il tuo Profile per favore.", "Shortcut here ^_^", "Setup compiuto", "Cancellato", "Inizia i Compiti", "Ampliamento con successo", "Iniziato con successo", "La tua rasa è sconosciuta, anche il tipo di truppe.Visita il tuo Profile per determinare la rasa.", "Per favore visita Circolo degli eroi per determinare la velocita e tipo di eroe."];
		allsourceString = "SegheriaPozzo d'argillaMiniera di ferroCampo di grano" 
		aLangResources=["legno","argilla","ferro","grano"]; 
		allbuildString = "FalegnameriaFabbrica di MattoniFonderiaMulinoFornoMagazzinoGranaioFabbroArmeriaArenaCentro del villaggioCasermaMercatoAmbasciataCampo d'addestramentoScuderiaOfficinaAccademiaDeposito SegretoMunicipioResidenceCastelloCamera del tesoroUfficio commercialeGrande casermaGrande scuderiaMura CittadineFortificazioniPalizzataGenio civileBirrificioEsperto di trappoleCircolo degli eroiGrande MagazzinoGrande GranaioMeravigliaFonte Equestre" 
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperiano", "Legionario a cavallo", "Imperiano a cavallo", "Cavalleria Romana", "Ariete da sfondamento", "Catapulta", "Senatore", "Decurione", "Eroe"]; 
		aLangTroops[1] = ["Combattente", "Lanciere", "Combattente con ascia", "Esploratore", "Paladino", "Cavalleria Teutonica", "Ariete", "Catapulta", "Comandante", "Decurione", "Eroe"]; 
		aLangTroops[2] = ["Lanciere", "Combattente con spada", "Esploratore", "Cavalleria Gallica", "Cavalleria di difesa", "Cavalleria avanzata", "Ariete", "Catapulta", "Capo tribù", "Decurione", "Eroe"]; 
		aLangAttackType = ["Rinforzi", "Attacco", "Raid"];
		break;
                
	case "fr": // thanks Tuga
		aLangAllBuildWithId = ["Bûcherons", "Carrière de terre", "Mine de fer", "Ferme", "", "Scierie", "Usine de poteries", "Fonderie", "Moulin", "Boulangerie", "Dépôt de ressources", "Silo de céréales", "Armurerie", "Usine d'armures", "Place de tournois", "Bâtiment principal", "Place de rassemblement", "Place du Marché", "Ambassade", "Caserne", "Ecurie", "Atelier", "Académie", "Cachette", "Hôtel de ville", "Résidence", "Palais", "Chambre aux trésors", "Comptoir de commerce", "Grande Caserne", "Grande Écurie", "Mur d'enceinte", "Mur de terre", "Palissade", "Tailleur de Pierres", "Brasserie", "Fabricant de pièges","Manoir du héros", "Grand dépôt de ressources", "Grand silo de céréales", "Merveille du monde", "Abreuvoir"];
		aLangAllResInDorf1=["Bûcheron", "Carrière de Terre", "Mine de fer", "Ferme de céréales"]
		aLangAddTaskText = ["Ajouter tache", "stile", "Village actif", "Cible", "Vers", "Mode", "Aide a la construction", "Quantité de ressources", "Bouger vers le haut", "bouger vers le bas", "Effacer", "&#160;&#160;&#160;Taches", "Bouger ", "Eleminer toutes les taches"];
		aLangTaskKind = ["Évolution ", "Nouvelle construction ", "Attaque", "Recherche", "Entreiner", "Transport", "NPC", "Démolition", "Fête"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Niveau", "Marchands", "Identification", "Capitale", "Inicio", "this timeseting is unuseful now.", "Vers", "Village", "Transport", "de", "Transport vers", "Transport de", "Retour de", "Ressources", "Bâtiment", "Construire un nouveau bâtiment", "Vazio", "Niveau"];
		aLangRaceName = ["Romains", "Germains","Gaulois"];
		aLangTaskOfText = ["Planifier evolution", "Planifier nouvelle construction", "ResourcesUpD", "OFF", "Comencer", "ON", "Arreter", "La distribution des champs de ce village est ", "Autotransport", "Auto transport n est pas ouvert", "Ouvert", "Transport avec succès", "Liste de planification", "Limit", "Defaut", "Modifier", "Bois/Terre/Fer", "Céréales", "Planification de demolition",
			"Planification d´un attaque", "Type d´attaque", "Temps de voyage", "Repeter numero de fois", "Temps de intervales","00:00:00","Cible catapulte","Aléatoire", "Inconnu", "Fois", " Mois", " Jour", "Troupes envoyées", "Planification d´entrainement","Train ubication","Planification d´entrainement fini","Transport personaliser","Setup Interval Time of Reload","This is the interval of page reload ,\n default sont 20 minutes, Insérer nouveau temps:\n\n","Remain","Planifier fête","petite fête","grande fête","Set Interval of Resources concentration",
			"minutes","arrêté","lié","lier","arrêter","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Pas assez de ressources", "Les ouvriers sont déjà au travail", "Construction complète", "Début de la construction", "Dans développement", "Son Dépôt de ressources est petit. Évolue son Dépôt de ressources pour continuer sa construction", "Son silo de céréales est petit. Évolue son Silo de céréales pour continuer sa construction", "Ressources suffisantes","Une fête est déjà organisée"];
		aLangOtherText = ["Il remarque important", "Seulement les champs de ressources du capitale <br/>peuvent être élevés à niveau 20. Son capital <br/> n'est pas décelable. S'il vous plaît il visite son profil.", "Raccourci ici ^_^", "Installation conclue", "Annulé", "Initier les tâches", "Upgrade avec succès", "Exécuter avec succès", "Sa race est inconnue, et son type de troupe aussi. <br/>Il visite son profil pour déterminer la race.<br/>", "S'il vous plaît il visite sa Manoir du héros pour déterminer<br/>la vitesse et le type de héros."];
		allsourceString = "BûcheronCarrière de TerreMine de ferFerme de céréales"
		aLangResources=["Bois","Terre","Fer","Céréales"];
		allbuildString = "ScierieUsine de poteriesFonderieMoulinBoulangerieDépôt de ressourcesSilo de céréalesArmurerieUsine d'armuresPlace de tournoisBâtiment principalPlace de rassemblementPlace du MarchéAmbassadeCaserneEcurieAtelierAcadémieCachetteHôtel de villeRésidencePalaisChambre aux trésorsComptoir de commerceGrande CaserneGrande ÉcurieMur d'enceinteMur de terrePalissadeTailleur de PierresBrasserieFabricant de piègesManoir du hérosGrand dépôt de ressourcesGrand silo de céréalesMerveille du mondeAbreuvoir"
		aLangTroops[0] = ["Légionnaire", "Prétorien", "Impérian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Bélier", "Catapulte de feu", "Sénateur", "Colon", "Héros"];
		aLangTroops[1] = ["Combattant au gourdin", "Combattant à la lance", "Combattant à la hache", "Eclaireur", "Paladin", "Cavalier Teuton", "Bélier", "Catapulte", "Chef de tribu", "Colon", "Héros"];
		aLangTroops[2] = ["Phalange", "Combattant à l'épée", "Eclaireur", "Eclair de Toutatis", "Cavalier druide", "Hédouin", "Bélier", "Catapulte de Guerre", "Chef", "Colon", "Héros"];
		aLangAttackType = ["Assistance", "Attaque", "Pillage"];
		break;
		
	case "si": // thanks Bananana and Tuga
		aLangAllBuildWithId = ["Gozdar", "Glinokop", "Rudnik železa", "Žitno polje", "", "Žaga", "Opekarna", "Talilnica železa", "Mlin", "Pekarna", "Skladišče", "Žitnica", "Izdelovalec orožja", "Izdelovalec oklepov", "Vadbišče", "Gradbeni ceh", "Zbirališče", "Tržnica", "Ambasada", "Barake", "Konjušnica", "Izdelovalec oblegovalnih naprav", "Akademija", "Špranja", "Mestna hiša", "Rezidenca", "Palača", "Zakladnica", "Trgovski center", "Velike barake", "Velika konjušnica", "Mestno obzidje", "Zemljen zid", "Palisada", "Kamnosek", "Pivnica", "Postavljalec pasti", "Herojeva rezidenca", "Veliko skladišče", "Velika žitnica", "Čudež sveta"];
		aLangAllResInDorf1=["Gozdar", "Glinokop", "Rudnik železa", "Žitno polje"];
		aLangAddTaskText = ["Dodaj nalogo", "Style", "Aktivna vas", "Nadgradi", "Na", "Mode", "Construction support", "Resources concentration", "Prestavi gor", "Prestavi dol", "Izbriši", "   Naloge", "Premakni ", "Izbriši vse naloge"];
		aLangTaskKind = ["Nadgradi", "Zazidljiva parcela", "Napad", "Razišči", "Uri", "Transport", "NPC", "Demolish", "Festival"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Stopnja", "Merchants", "ID", "Prestolnica", "Začetek ob", "Nastavitev časa ni pomembna.", "to", "Vas", "transport", "from", "Transport to", "Transport from", "Return from", "resources", "building", "Postavi nov objekt", "empty", "level"];
		aLangRaceName = ["Rimljani", "Tevtoni", "Galci"];
		aLangTaskOfText = ["Nadgradi kasneje", "Postavi nov objekt", "Surovine gor", "Pauza", "Začetek", "Začeto", "Prekliči", "The resource fields distribution of this village is ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Naloge", "Trans_In_limit", "Osnovno", "Spremeni", "Les/Glina/Železo", "Crop", "Podri kasneje",
			"Napadi kasneje", "Tip napada", "Do napada", "Ponovi", "Vrnitev čez","00:00:00","Tarča katapultov","Naključno", "Unknown", "times", "Month", "Day", "Enote poslane", "Uri kasneje","Mesto urjenja","Urjenje končano","customTransport","setup interval time of reload","this is the interval of page reload ,\n default is 20 minutes, please insert new time:\n\n","Trans_Out_Rmn","ScheduleParty","mali festival","veliki festival","setInterval of Resources concentration",
			"minute","Pavza","Vklopljeno","Vklop","Pavza","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Primankljaj surovin.", "Delavci so že na delu.", "Zgrajeno", "Začnem z gradnjo", "V razvoju", "Seu Armazém é pequeno. Evolua o seu armazém para continuar a sua construção", "Seu Celeiro é pequeno. Evolua o seu Celeiro para continuar a sua construção", "Recursos suficientes","Já se encontra uma celebração em curso"];
		aLangOtherText = ["Pomembno!", "Samo polja v prestolnicigredo do stopnje 20 . A sua capitalnao está detectavel. Por favor visite o seu perfil.", "Atalho aqui ^_^", "Naloga uspešno dodana", "Preklicano", "Začni z nalogo", "Uspešno nadgrajeno", "Executar com sucesso", "Sua raça é desconhecida, e o seu tipo de tropa também.Visite o seu perfil para determinar as raça.", "Por favor visite a sua mansão do heroi para determinara velocidade e o tipo de heroi."];
		allsourceString = "GozdarGlinokopRudnik železaŽitno polje";
		aLangResources=["Les","Glina","Železo","Žito"]; 
		allbuildString = "ŽagaOpekarnaTalilnica železaMlinPekarnaSkladiščeŽitnicaIzdelovalec orožjaIzdelovalec oklepovVadbiščeGradbeni cehZbirališčeTržnicaAmbasadaBarakeKonjušnicaAkademijaŠpranjaMestna hišaRezidencaPalačaZakladnicaTrgovski centerVelikebarakeVelika konjušnicaMestno obzidjeZemljeni zidPalisardaKamnosekPivovarnaPostavljalec pastiHerojeva rezidencaVeliko skladiščeVelika žitnicaČudež svetaNapajališče" 
		aLangTroops[0] = ["Legionar", "Praetorijan", "Imperijan", "Izvidnik", "Equites Imperatoris", "Equites Caesaris", "Oblegovalni oven", "Ognjeni katapult", "Senator", "Kolonist", "Heroj"];
		aLangTroops[1] = ["Gorjačar", "Suličar", "Metalec sekir", "Skavt", "Paladin", "Tevtonski vitez", "Oblegovalni oven", "Mangonel", "Vodja", "Kolonist", "Heroj" ];
		aLangTroops[2] = ["Falanga", "Mečevalec", "Stezosledec", "Theutatesova Strela", "Druid", "Haeduan", "Oblegovalni oven", "Trebušet", "Poglavar", "Kolonist", "Heroj"];
		aLangAttackType = ["Okrepitev", "Napad", "Ropanje"];
		break;
		
	case "vn": // thanks Tuga
		aLangAllBuildWithId = ["Tiều Phu", "Mỏ Đất Sét", "Mỏ sắt", "Ruộng lúa", "", "Xưởng Gỗ", "Lò Gạch", "Lò Rèn", "Nhà Xay Lúa", "Lò Bánh", "Nhà Kho", "Kho Lúa", "Thợ Rèn", "Lò Luyện Giáp", "Võ Đài", "Nhà Chính", "Binh Trường", "Chợ", "Đại Sứ Quán", "Trại Lính", "Chuồng Ngựa", "Xưởng", "Học Viện", "Hầm Ngầm", "Tòa Thị Chính", "Lâu Đài", "Cung Điện", "Kho Bạc", "Phòng Thương Mại", "Doanh Trại Lớn", "Trại Ngựa", "Tường Thành", "Tường Đất", "Tường Rào", "Thợ Xây Đá", "Quán bia", "Hố Bẫy","Lâu đài tướng", "Nhà Kho Lớn", "Kho Lúa Lớn", "Kỳ Quan", "Tàu ngựa"];
		aLangAllResInDorf1=["Tiều phu", "Mỏ Đất Sét", "Mỏ sắt", "Ruộng Lúa"]
		aLangAddTaskText = ["Thêm nhiệm vụ", "Loại", "Tại làng", "Mục tiêu", "Tới", "Phương thức", "Tự động", "Tùy chỉnh", "Di chuyển lên", "Di chuyển xuống", "Xóa", "&#160;&#160;&#160;Nội dung công việc", "Di chuyển", "Xóa tất cả danh mục"];
		aLangTaskKind = ["Nâng cấp", "Kiến Trúc Mới", "Tấn công", "Nghiên cứu", "Huấn luyện", "Vận chuyển", "NPC", "Phá hủy", "ăn mừng"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Cấp ", "Lái Buôn", "Tại vị trí", "Thủ đô", "Bắt đầu tại", "Chưa dùng được chức năng này.", "đến", "Làng", "vận chuyển", "từ", "Vận chuyển đến", "Vận chuyển từ", "Trở về từ", "Tài nguyên", "Kiến trúc", "Xây Kiến Trúc Mới", "không có gì", "Cấp"];
		aLangRaceName = ["Tộc Romans", "Tộc Teutons", "Tộc Gauls"];
		aLangTaskOfText = ["Lên lịch nâng cấp kiến trúc này", "Lên lịch xây kiến trúc này", "Tự động nâng cấp các mỏ", "Chưa kích hoạt", "Kích hoạt", "Đã kích hoạt", "Hủy", "Đây là làng loại ", "Tự động gửi tài nguyên", "Tự động gửi tài nguyên chưa được kích hoạt", "Đã được kích hoạt", "Gủi thành công", "Danh mục", "Tài nguyên bạn muốn nhận", "Mặc định", "Tùy chỉnh ", "Gỗ/Đất sét/Sắt", "Lúa", "Lên lịch phá hủy công trình",
			"Lên lịch tấn công làng này", "Loại tấn công", "Thời gian để đến nơi", "Số lần lặp lại", "Khoảng cách giữa các lần lặp lại","00:00:00","Mục tiêu cata","Ngẫu nhiên", "Chưa biết", "Giờ", "Tháng", "Ngày", "Đã gửi lính", "Lên lịch huấn luyện lính này","Train ubication","Lính đang được huấn luyện","Tùy chỉnh gửi tài nguyên","Thiết lập thời gian tải lại trang web","Đây là khoảng thởi gian tải lại trang web ,\n Mặc định là 20 phút, hãy điền vào số phút bạn muốn thay đổi:\n\n","Tài nguyên bạn muốn chừa lại","Lên lịch ăn mừng","Ăn mừng nhỏ","Ăn mừng lớn","Thiết lập khoảng thời gian bạn muốn gửi tài nguyên",
			"Phút","Đang tạm dừng","Đang thi hanh","Thi hành","Tạm dừng","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Quá ít tài nguyên.", "Công nhân đang làm nhiệm vụ khác.", "Kiến trúc đã hoàn thiên", "Bắt đầu xây dựng", "Đang xây dựng", "Nhà kho quá nhỏ. Hãy nâng cấp nhà kho mới xây dựng được kiến trúc", "Kho lúa quá nhỏ. Hãy nâng cấp kho lúa mới xây được kiến trúc", "Quá ít tài nguyên","","Hiện đang có buổi lễ ăn mừng"];
		aLangOtherText = ["Chú thích quan trọng", "Chỉ thủ đô mới có thể<br/>nâng cấp các mỏ lên level 20. THủ đô của bạn<br/> chưa thấy. hãy vào phần hồ sơ của bạn.", "Click vào đây", "Cài đặt hoàn tất", "Đã hủy", "Bắt đầu công việc", "Nâng cấp thành công", "Kích hoạt thành công", "CHưa biết bạn thuộc tộc nào. <br/>Vì vậy bạn nên vào hồ sơ để cập nhật thông tin.<br/>", "Bạn cũng nên vào Lâu Đài Tướng để cập nhật<br/> tốc đọ và loại tướng."];
		allsourceString = "TiềuPhuMỏ Đất SétMỏ SắtRuộng Lúa"
		aLangResources=["Gỗ","Đất sét","Sắt","Lúa"];
		allbuildString = "Xưởng GỗLò GạchLò RènNhà Xay LúaLò BánhNhà KhoKho LúaThợ RènLò Luyện GiápVõ ĐàiNhà ChínhBinh TrườngChợĐại Sứ QuánTrại LínhChuồng NgựaXưởngHọc ViệnHầm NgầmTòa Thị ChínhLâu ĐàiCung ĐiệnKho BạcPhòng Thương MạiDoanh Trại LớnTrại NgựaTường ThànhTường ĐấtTường RàoThợ Xây ĐáQuán biaHố BẫyLâu đài tướngNhà Kho LớnKho Lúa LớnKỳ QuanTàu ngựa"
		aLangTroops[0] = ["Lính Lê Dương", "Thị Vệ", "Chiến Binh Tinh Nhuệ", "Kỵ Binh Do Thám", "Kỵ Binh", "Kỵ Binh Tinh Nhuệ", "Xe Công Thành", "Máy Phóng Lửa", "Nguyên Lão", "Dân Khai Hoang", "Tướng"];
		aLangTroops[1] = ["Lính Chùy", "Lính Giáo", "Lính Rìu", "Do Thám", "Hiệp Sĩ Paladin", "Kỵ Sĩ Teutonic", "Đội Công Thành", "Máy Bắn Đá", "Thủ Lĩnh", "Dân Khai Hoang", "Tướng"];
		aLangTroops[2] = ["Lính Pha Lăng", "Kiếm Sĩ", "Do Thám", "Kỵ Binh Sấm Sét", "Tu Sĩ", "Kỵ Binh", "Máy Nện", "Máy Bắn Đá", "Tù Trưởng", "Dân Khai Hoang", "Tướng"];
		aLangAttackType = ["Tiếp viện", "Tấn công", "Cướp bóc"];
		break;

	case "ru":
		aLangAllBuildWithId = ["Лесопилка", "Глиняный карьер", "Железный рудник", "Ферма", "", "Лесопильный завод", "Кирпичный завод", "Чугунолитейный завод", "Мукомольная мельница", "Пекарня", "Склад", "Амбар", "Кузница оружия", "Кузница доспехов", "Арена", "Главное здание", "Пункт сбора", "Рынок", "Посольство", "Казарма", "Конюшня", "Мастерская", "Академия", "Тайник", "Ратуша", "Резиденция", "Дворец", "Сокровищница", "Торговая палата", "Большая казарма", "Большая конюшня", "Городская стена", "Земляной вал", " Изгородь", "Каменотес", "Пивная", "Капканщик","Таверна", "Большой склад", "Большой амбар", "Чудо света", "Водопой"];
		aLangAllResInDorf1=["Лесопилка", "Глиняный карьер", "Железный рудник", "Ферма"]
		aLangAddTaskText = ["Добавить задание", "Способ", "Активная деревня", "Цель задания", "| Цель", "Тип", "Поддержка строительства", "Концентрация ресурсов", "Вверх", "Вниз", "", "", "", "Удалить все задания"];
		aLangTaskKind = ["Улучшить:", "Новое здание:", "Атаковать:", "Исследовать:", " нанять:", "Отправить ресурсы:", "NPC:", "Разрушить:", "Торжество:"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = [" Уровень ", "Торговцы", "ID", "Столица", "Время начала", "(временно не работает)", "в", "Деревня", "Транспортировка", "из", "Транспортировка в", "Транспортировка из", "Возвращение из", "ресурсы", "здание", "Построить новое здание", "пусто", "уровень"];
		aLangRaceName = ["Римляне", "Германцы", "Галлы"];
		aLangTaskOfText = ["Запланировать улучшение", "Запланировать новое здание", "Качать ресурсы", "Выкл", "Старт", "Вкл", "стоп", "Распределение полей в деревне: ", "Автоотправка", "Автоотправка выкл.", "Вкл.", "Успешно отправлено", "* Задания *", "Ограничение ввоза", "Нет", "Изменить ", "Дерево/Глина/Железо", "Зерно", "Запланировать разрушение",
			"Запланировать атаку", "Тип атаки", "Време в пути", "повторы", "промежуток","00:00:00","Цель катов","Случайно", "Неизвестно", " раз", "/", " :дата/время: ", "Войска", "Запланировать найм","Train site","Обучение войск завершено","целевая отправка","Интревал обновления","Это интервал обновления страницы ,\n по умолчанию - 20 минут, Введите новое время:\n\n","Ограничение вывоза","Запланировать празднование","Малый праздник","Большой праздник","Установка интервала концентрации ресов",
			"минуты", "остановлено", "работает", "старт", "пауза","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Недостаточно сырья", "Все строители сейчас заняты", "Это здание отстроено полностью", "Начинаю строительство", "Процесс развития", "Недостаточна вместимость склада", "Недостаточна вместимость амбара", "Достаточно ресурсов","","Проводится торжество"];
		aLangOtherText = ["Важные заметки", "Только в столице поля могут быть до уровня 20. Столица не определена.Зайдите в профиль пожалуйста", "Ссылка тут ^_^", "Настройка закончена", "Отменено", "Начать задачи", "Улучшение прошло успешно", "Успешно", "Ваш народ неопределен.Пожалуйста зайдите в профиль.", "Также пожалуйста зайдите в таверну для определения типа и скорости героя"];
		allsourceString = "ЛесопилкаГлиняный карьерЖелезный рудникФерма";
		aLangResources=["Древесина","Глина","Железо","Зерно"];
		allbuildString = "Лесопильный заводКирпичный заводЧугунолитейный заводМукомольная мельницаПекарняСкладАмбарКузница оружияКузница доспеховАренаГлавное зданиеПункт сбораРынокПосольствоКазармаКонюшняМастерскаяАкадемияТайникРатушаРезиденцияДворецСокровищницаТорговая палатаБольшая казармаБольшая конюшняГородская стенаЗемляной валИзгородьКаменотесПивнаяКапканщикТавернаБольшой складБольшой амбарЧудо светаВодопой"
		aLangTroops[0] = ["Легионер", "Преторианец", "Империанец", "Конный разведчик", "Конница императора", "Конница Цезаря", "Таран", "Огненная катапульта", "Сенатор", "Поселенец", "Герой"];
		aLangTroops[1] = ["Дубинщик", "Копьеносец", "Топорщик", "Скаут", "Паладин", "Тевтонская конница", "Стенобитное орудие", "Катапульта", "Вождь", "Поселенец", "Герой"];
		aLangTroops[2] = ["Фаланга", "Мечник", "Следопыт", "Тевтатский гром", "Друид-всадник", "Эдуйская конница", "Таран", "Требушет", "Предводитель", "Поселенец", "Герой"];
		aLangAttackType = ["Подкрепление", "Нападение", "Набег"];
		break;  

	case "rs": // by  rsinisa
		aLangAllBuildWithId = ["Дрвосеча", "Рудник глине", "Рудник гвожђа", "Њива", "", "Пилана", "Циглана", "Ливница гвожђа", "Млин", "Пекара", "Складиште", "Силос", "Ковачница оружја", "Ковачница оклопа", "Витешка арена", "Главна зграда", "Место окупљања", "Пијаца", "Амбасада", "Касарна", "Штала", "Радионица", "Академија", "Склониште", "Општина", "Резиденција", "Палата", "Ризница", "Трговачки центар", "Велика касарна", "Велика штала", "Градски зид", "Земљани зид", "Палисада", "Каменорезац", "Пивница", "Постављач замки","Дворац хероја", "Велико складиште", "Велики силос", "Светско чудо", "Појилиште"];
		aLangAllResInDorf1 = ["Дрвосеча", "Рудник глине", "Рудник гвожђа", "Њива"];
		aLangAddTaskText = ["Додај задатак", "Начин", "Активна села", "Задата мета", "Према", "Мод", "Подршка изградње", "Концентрација ресурса", "Помери горе", "Помери доле", "Бриши", "   Списак задатака", "Помери ", "Обриши све задатке"];
		aLangTaskKind = ["Надогради", "Нова градња", "Напад", "Истраживање", "Обучи", "Транспорт", "НПЦ", "Рушити", "Забава"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Ниво", "Трговци", "ID", "Главни град", "Време почетка", "ово временско подешавање је бескорисно", "према", "Село", "транспорт", "из", "Пребацивање према", "Пребацивање из", "повратак из", "ресурси", "изградња", "Направи нову зграду", "празно", "ниво"];
		aLangRaceName = ["Римљани", "Тевтовци", "Гали"];
		aLangTaskOfText = ["Распоред за надоградњу", "Направи нови распоред", "АутоРесУпД", "Нот_рун", "Покрени", "Покренуто", "Заустави", "Дистрибуција ресурсних поља овог села је ", "Аутотранспорт", "Аутотранспорт није отворен", "Отворен", "Транспорт успешан", "Листа задатака", "Транспорт са лимитом", "Подразумевано", "Измени", "Дрво/Гллина/Гвожђе", "Њива", "Листа рушења",
			"Листа напада", "Врста напада", "Време превоза", "број понављања", "Временски интервал","00:00:00","Мета катапулта","Насумично", "Непознат", "времена", "Месец", "Дан", "Слање трупа", "Листа обуке","Место обуке","Тренинг задатак урадити","прилагођен транспорт","подеси време поновног учитавања "," ово је интервал поновног учитавања стране, \n подраѕзумевана вредност је 20 минута, молимо Вас убаците ново време:\n \n","Trans_Out_Rmn","Листа забава","мала забава","велика забава"," Подесите интервал концентрације ресурса ",
			"минути", "заустављање", "покреће се", "покрени", "пауза","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Премало ресурса.", "Радници су већ на послу.", "Изградња завршена", "Покретање изградње", "У изградњи", "Складиште је премало. Проширите складиште како би наставили са изградњом", "Силос је премали. Проширите силос како би наставили са изградњом", "Довољно ресурса","Премало жита: прошири прво њиве","Прослава је већ у току"];
		aLangOtherText = ["Важна напомена", "Само у главном граду ресурсна поља<br/>могу бити проширена на ниво 20. Твој главни град<br/>није детектован, погледај свој профил.", "Пречица овде ^_^", "Подешавања готова", "Отказано", "Покрени задатке", "Надоградња успешна", "Покретање успешно", "Ваше племе је непознато, стога и врста трупа. Погледајте<br/>свој профил да видите који сте народ.<br/>","Такође посетите дворац хероја да сазнате<br/>брзину и тип свог хероја "];
		allsourceString = "ДрвосечаРудник ГлинеРудник ГвожђаЊива";
		aLangResources=["дрво","глина","гвожђе","жито"];
		allbuildString = "ПиланаЦигланаЛивница гвожђаМлинПекараСкладиштеСилосКовачница ОружјаКовачница ОклопаВитешка АренаМесто ОкупљањаПијацаАмбасадаКасарнаШталаРадионицаАкадемијаСклоништеОпштинаРезиденцијаПалатаРизницаТрговачки ЦентарВелика КасарнаВелика ШталаГрадски ЗидЗемљани ЗидПалисадаКаменорезацПивницаЗамкаДворац ХеројаВелико СкладиштеВеликиСилосСветско ЧудоПојилиште"
		aLangTroops[0] = ["Легионар", "Преторијанац", "Империјанац", "Извиђач", "Императорова коњица", "Цезарева коњица", "Ован", "Ватрени катапулт", "Сенатор", "Насељеник", "Херој"];
		aLangTroops[1] = ["Батинар", "Копљаник", "Секираш", "Извиђач", "Паладин", "Тевтонски витез", "Ован", "Катапулт", "Поглавица", "Насељеник", "Херој"];
		aLangTroops[2] = ["Фаланга", "Мачевалац", "Извиђач", "Галски витез", "Друид", "Коњаник", "Ован", "Катапулт", "Старешина", "Насељеник", "Херој"];
		aLangAttackType = ["Појачање", "Нормалан", "Пљачка"];
		break;

	case "ba": // thanks  ieyp
		aLangAllBuildWithId = ["Drvosječa", "Rudnik gline", "Rudnik željeza", "Poljoprivredno imanje", "", "Pilana", "Ciglana", "Livnica", "Mlin", "Pekara", "Skladište", "Silos", "Oruzarnica", "Kovacnica oklopa", "Mejdan", "Glavna zgrada", "Mesto okupljanja", "Pijaca", "Ambasada", "Kasarna", "Stala", "Radionica", "Akademija", "Skloniste", "Opstina", "Rezidencija", "Palata", "Riznica", "Trgovacki centar", "Velika kasarna", "Velika stala", "Gradski zid", "Zemljani zid", "Taraba", "Kamenorezac", "Pivnica", "Zamkar","Dvorac heroja", "Veliko skladiste", "Veliki silos", "WW", "Pojiliste"];
		aLangAllResInDorf1 = ["Drvosječa", "Rudnik gline", "Rudnik željeza", "Poljoprivredno imanje"]
		aLangAddTaskText = ["Dodaj zadatak", "Nacin", "Aktivna sela", "Zadata meta", "Prema", "Mod", "Podrska izgradnje", "Koncentracija resursa", "Pomeri gore", "Pomeri dole", "Del", "&#160;&#160;&#160;Task contents", "Pomeri ", "Obrisi sve zadatke"];
		aLangTaskKind = ["Unapredi", "Nova izgradnja", "Napad", "Istrazivanje", "Obuci", "Transport", "NPC", "Rusiti", "Zabava"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["Lvl", "Trgovci", "ID", "Glavni grad", "Vreme pocetka", "ovo vremensko podesavanje je beskorisno", "prema", "Selo", "transport", "iz", "Prebacivanje prema", "Prebacivanje iz", "povratak iz", "resursi", "izgradnja", "Napravi novu zgradu", "prazno", "nivo"];
		aLangRaceName = ["Rimljani", "Teutonci", "Gali"];
		aLangTaskOfText = ["Raspored za nadogradnju", "Napravi novi raspored", "AutoResUpD", "Not_run", "Pokreni", "Pokrenuto", "Zaustavi", "Distribucija resursnih polja ovog sela je ", "Autotransport", "Autotransport is not opened", "Opened", "Transport successfully", "Task list", "Transport sa limitom", "Podrazumevano", "Izmeni", "Drvo/Glina/Gvozdje", "Njiva", "Lista rusenja",
			"Lista napada", "Vrsta napada", "Vreme prevoza", "broj ponavljanja", "Vremenski interval","00:00:00","Meta katapulta","Nasumicno", "Nepoznat", "times", "Mesec", "Dan", "Slanje trupa", "Lista obuke","Mesto obuke","TreningZadatak uraditi","prilagodenTransport","podesi vreme ponovnog ucitavanja "," ovo je interval ponovnog ucitavanja strane, \n podrazumevan vrednost je 20 minuta, molimo vas ubacite novo vreme:\n  \n","Trans_Out_Rmn","Lista zabava","mala zabava","velika zabava"," Podesite interval koncentracie resursa ",
			"minuti", "zaustavljanje", "pokrece se", "pokreni", "pauza","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Premalo resursa. Buahaha :D", "Radnici su vec na poslu :P", "Izgradnja zavrsena", "Pokretanje izgradnje", "U izgradnji", "Skladiste je premalo. Prosirite skladiste kako bi nastavili sa izgradnjom", "Silos je malecak. Prosirite silos kako bi nastavili sa izgradnjom", "Dovoljno resursa","Premalo zita, prvo prosiri njive!","Proslava je u toku"];
		aLangOtherText = ["Vazna napomena", "Samo u glavnom gradu mozete <br/> prosiriti resursna polja preko nivoa 10. Tvoj glavni grad <br/> nije otkriven, poseti svoj profil.", "Precica ovde ^^", "Podesavanja gotova", "Otkazano", "Pokreni zadatke", "Nadogradnja uspesna", "Pokretanje uspesno", "Vase pleme je nepoznato, stoga I tip trupa. Posetite <br/> svoj profil da vidite pleme. <br/>","Posetite dvorac heroja da saznate <br/> brzinu I tip svog heroja "];
		allsourceString = "DrvosecaRudnik glineRudnik gvozjdaNjiva"
		aLangResources=["drvo","glina","gvozdje","zito"];
		allbuildString = "PilanaCiglanaLivnica GvozdjaMlin PekaraSkladišteSilosOruzarnicaKovancina OklopaMejdan ZgradaMesto OkupljanjaPijacaAmbasadaKasarnaStalaRadionicaAkademijaSklonisteOpstinaRezidencijaPalataRiznicaTrgovacki CentarVelika KasarnaVelika StalaGradski ZidZemljani ZidTarabaKamenorezacPivnicaZamkarDvorac HerojaVeliko SkladisteVeliki SilosWWPojiliste"
		aLangTroops[0] = ["Legionar", "Pretorijanac", "Imperijanac", "Izvidjac", "Imperatorova konjica", "Cezareva konjica", "Ovan", "Vatreni katapult", "Senator", "Naseljenik", "Heroj"];
		aLangTroops[1] = ["Batinar", "Kopljanik", "Sekiras", "Izvidjac", "Paladin", "Tetutonski vitez", " Ovan ", "Katapult", "Poglavica", "Naseljenik", "Heroj"];
		aLangTroops[2] = ["Falanga", "Macevalac", "Izvidjac", "Teutateov grom", "Druid", "Heduan", " Ovan ", "Katapult", "Staresina", "Naseljenik", "Heroj"];
		aLangAttackType = ["Pojacanje", "Normalan", "Pljacka"];
		break;

	case "org":
	case "de": // by LohoC
		aLangAllBuildWithId = ["Holzfäller","Lehmgrube","Eisenmine","Getreidefarm","","Sägewerk","Lehmbrennerei","Eisengießerei","Getreidemühle","Bäckerei","Rohstofflager","Kornspeicher","Waffenschmiede","Rüstungsschmiede","Turnierplatz","Hauptgebäude","Versammlungsplatz","Marktplatz","Botschaft","Kaserne","Stall","Werkstatt","Akademie","Versteck","Rathaus","Residenz","Palast","Schatzkammer","Handelskontor","Große Kaserne","Großer Stall","Stadtmauer","Erdwall","Palisade","Steinmetz","Brauerei","Fallensteller","Heldenhof","Großes Rohstofflager","Großer Kornspeicher","Weltwunder","Pferdetränke"];
		aLangAllResInDorf1 = ["Holzfäller","Lehmgrube","Eisenmine","Getreidefarm"];
		aLangAddTaskText = ["Aufgabe hinzufügen","Style","Aktives Dorf","Aufgaben Ziel","nach","Modus","Baubetreuung","Ressourcenkonzentration","Rauf","Runter","Entfernen","   Aufgaben Inhalte","Bewegen ","alle Aufgaben Löschen"];
		aLangTaskKind = ["Upgrade","Neues Gebäude","Angriff","Forschung","ausbilden","Transport","NPC","Zerstören","Fest"];
		maxlevel = ["10","10","10","10","0","5","5","5","5","5","20","20","20","20","20","20","20","20","20","20","20","20","20","10","20","20","20","20","20","20","20","20","20","20","20","10","20","20","20","20","100","20"];
		aLangGameText = ["Lvl","Händler","ID","Hauptdorf","Startzeit","diese Zeiteinstellung ist nicht sinnvoll.","nach","Dorf","Transport","von","Transport nach","Transport von","Zurück von","Rohstoffe","Gebäude","Neues Gebäude bauen","leer","Stufe"];
		aLangRaceName = ["Römer","Germane","Gallier"];
		aLangTaskOfText = ["Zeitplan Upgrade","Zeitplan Neu Bauen","AutoResRauf","Pausiert","Start","Laufend","Unterbrechen","Es wird Gebaut ","Autotransport","Autotransport ist nicht An","AN","Transport Erfolgreich","Aufgabenliste","Transportlimit (-)","Vorgabe","Ändern ","Holz/Lehm/Eisen","G3D","Zeitplan Abriss",
			"Zeitplan Angriff","Angriffsart","Laufzeit","Wiederholungen","Intervalzeit","00:00:00","Katapultziel","Zufall","Unbekannt","mal","Monat","Tag","Truppen senden","Zeitplan Ausbildung","Ausbildungsseite","Ausbildungsauftrag abgeschlossen","Manueller Transport","Setzte Intervalzeit für Reload","Dies ist der Interval zum Seitenreload ,\n Standard sind 20 Minuten, Bitte trage eine neue ein:\n\n","Transportlimit (+)","Partyplanung","Kleine Party","Große Party","Setzte den Interval der Ressourcenkonzentration",
			"Minuten","Pausiert","Laufend","Start","Pause","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["Zuwenig Ressourcen.","Die Arbeiter sind bereits auf Arbeit.","Konstruktion abgeschlossen","Starte Konstruktion","In Entwicklung","Dein Rohstofflager ist zu klein. Bitte baue zuerst das Rohstofflager aus um die Konstruktion fortzusetzten.","Dein Kornspeicher ist zu klein. Bitte baue zuerst das Kornspeicher aus um die Konstruktion fortzusetzten.","Genug Ressourcen","Zuwenig Nahrung: Erweitere deine Getreideproduktion!","Es wird bereits gefeiert."];
		aLangOtherText = ["Wichtige Notiz","Nur die Ressourcenfelder der Hauptstadt können<br/>bis Stufe 20 ausgebaut werden. Zur zeit ist deine Hauptstadt<br/>nicht identifiziert. Bitte besuche dein Profil.","Shortcut here ^_^","Setup fertiggestellt","Abgebrochen","Starte die Aufgaben","Upgrade war erfolgreich","Starten war erfolgreich","Deine Rasse ist unbekannt.<br/>Bitte besuche dein Profil.<br/>","Bitte besuche auch deinen Heldenhof um<br/>die Geschwindigkeit und die Art deines Helden zu bestimmen."];
		allsourceString = "HolzfällerLehmgrubeEisenmineGetreidefarm";
		aLangResources = ["Holz","Lehm","Eisen","Getreide"];
		allbuildString = "SägewerkLehmbrennereiEisengießereiGetreidemühleBäckereiRohstofflagerKornspeicherWaffenschmiedeRüstungsschmiedeTurnierplatzHauptgebäudeVersammlungsplatzMarktplatzBotschaftKaserneStallWerkstattAkademieVersteckRathausResidenzPalastSchatzkammerHandelskontorGroße KaserneGroßer StallStadtmauerErdwallPalisadeSteinmetzBrauereiFallenstellerHeldenhofGroßes RohstofflagerGroßer KornspeicherWeltwunderPferdetränke";
		aLangTroops[0] = ["Legionär","Prätorianer","Imperianer","Equites Legati","Equites Imperatoris","Equites Caesaris","Ramme","Feuerkatapult","Senator","Siedler","Held"];
		aLangTroops[1] = ["Keulenschwinger","Speerkämpfer","Axtkämpfer","Kundschafter","Paladin","Teutonenreiter","Ramme","Katapult","Stammesführer","Siedler","Held"];
		aLangTroops[2] = ["Phalanx","Schwertkämpfer","Späher","Theutates Blitz","Druidenreiter","Haeduaner","Ramme","Kriegskatapult","Häuptling","Siedler","Held"];
		aLangAttackType = ["Unterstützung","Angriff: Normal","Angriff: Raubzug"];
		break;

	case "ir": // nekooee
		aLangAllBuildWithId = ["هیزم شکن", "آجرسازی", "معدن آهن", "گندم زار", "", "چوب بری", "آجر پزی", "ذوب آهن", "آسیاب", "نانوایی", "انبار", "انبار غذا", "اسلحه سازی", "زره سازی", "میدان تمرین", "ساختمان اصلی", "اردوگاه", "بازار", "سفارتخانه", "سربازخانه", "اصطبل", "کارگاه", "دارالفنون", "مخفیگاه", "تالار شهر", "اقامتگاه", "قصر", "خزانه", "دفتر تجارت", "سربازخانه بزرگ", "اصطبل بزرگ", "دیوار شهر", "دیوار گلی", "پرچین", "سنگتراشی", "آبجوسازی", "تله ساز","عمارت قهرمان", "انبار بزرگ", "انبار غذای بزگ", "عمارت جادو", "آبخوری اسب ها"];
		aLangAllResInDorf1=["گندم زار", "معدن آهن", "آجر سازی", "هیزم شکن"]
		aLangAddTaskText = ["اضافه کردن وظیفه", "شیوه", "دهکده فعال", "هدف کاری", "به سوی", "روش", "پشتیبانی از سازه ها", "ارسال معمولی (تمرکز منابع)", "بالا بردن", "پایین آوردن", "حذف", "&#160;&#160;&#160;محتوای وظیفه", "حرکت کردن", "پاک کردن تمام وظایف"];
		aLangTaskKind = ["ارتقاء دادن", "بنای جدید", "حمله", "تحقیق", "تربیت کردن", "انتقال دادن", "تعدیل منابع", "تخریب کردن", "برگزاری جشن"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["سطح", "بازرگانان", "شماره", "رئیس", "زمان شروع", "این تنظیم زمان در حال حاضر بی فایده است.", "به سوی", "دهکده", "انتقال دادن", "از", "انتقال به", "انتقال از", "بازگشت از", "منابع", "ساخنمان", "بنای ساختمان جدید", "خالی کردن", "سطح"];
		aLangRaceName = ["رومی ها" ,"توتن ها" ,"گول ها"];
		aLangTaskOfText = ["برنامه ارتقاء", "برنامه ساختمان جدید", "آپدیت اتوماتیک منابع", "در حال اجرا نمی باشد", "شروع", "شروع شده", "معلق کردن", "جدول توزیع منابع در این روستا هست ", "ارسال خودکار منابع", "حمل و نقل خودکار باز نمی باشد", "باز شده", "حمل و نقل با موفقیت", "لیست وظایف", "محدودیت انتقال", "پیشفرض", "اصلاح کردن", "چوب/خشت/آهن", "گندم", "برنامه تخریب",
			"برنامه حمله", "نوع حمله", "زمان سفر", "زمان تکرار", "فاصله زمانی","00:00:00","هدف منجنیق","تصادفی", "نامعلوم", "زمان", "ماه", "روز", "سربازان فرستاده شدند", "برنامه آموزش","محل آموزش","وظیفه آموزش انجام شد","ارسال سفارشی منابع"," فاصله زمانی از زمان راه اندازی مجدد"," این فاصله زمانی از صفحه بارگذاری شده است,\n پیشفرض 20 دقیقه می باشد, لطفا مقدار جدید را وارد کنید زمان:\n\n","Trans_Out_Rmn","برنامه جشن","جشن کوچک","جشن بزرگ"," تنظیم فاصله زمانی حمل معمولی در قسمت ارسال خودکار",
			"دقیقه", "در حال مکث", "در حرکت", "ادامه دادن", "مکث","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["کمبود منابع.", "کارگران مشغول کار می باشند.", "ساخت و ساز پایان یافته", "ساخت و ساز شروع شد", "در حال توسعه", "انبار شما کوچک است لطفا انبار را ارتقاء دهید تا ساخت و ساز ادامه پیدا کند", "انبار غذای شما کوچک است لطفا انبار غذا را ارتقاء دهید تا ساخت و ساز ادامه یابد", "منابع کافی","کمبود مواد غذایی: ابتدا گندم زار را ارتقاء دهید!","در حال حاضر یک جشن در حال برگذاری است"];
		aLangOtherText = ["توجه داشته باشید", "فقط منابع در دهکده پایتخت می توانند <br/>تا سطح 20 ارتقاء یابند. اکنون پایتخت شما<br/> تشخیص داده نشده است. لطفا از پروفایل خود دیدن کنید.", "دسترسی آسان در اینجا ^_^", "تنظیمات کامل شد", "لغو شد", "وظیفه آغاز شد", "ارتقاء با موفقیت انجام شد", "حرکت با موفقیت انجام شد", "نژاد شما معلوم نیست, بنابراین نوع لشکرتون مشخص نیست. <br/>برای مشخص شدن نژادتون از پروفایل خود دیدن کنید.<br/>", "همچنین لطفا دیدن کنید از عمارت قهرمان برای مشخص شدن <br/> سطح و نوع آن."];
		allsourceString = "هیزم شکن آجر سازی معدن آهن گندم زار"
		aLangResources=["گندم","آهن","خشت","چوب"];
		allbuildString = "چوب بری آجرپزی ذوب آهن آسیاب نانوایی انبار انبار غذا اسلحه سازی زره سازی میدان تمرین ساختمان اصلی اردوگاه بازار سفارت سربازخانه اصطبل کارگاه دارالفنون مخفیگاه اقامتگاه قصر خزانه دفتر تجارت سرباز خانه بزرگ اصطبل بزگ دیوار شهر دیوار گلی پرچین سنگ تراشی آبجو سازی تله ساز عمارت قهرمان انبار بزرگ انبار غذای بزرگ عمارت جادو آبخوری اسب ها"
		aLangTroops[0] = ["لژیونر", "محافظ", "شمشیرزن", "خبرچین", "شوالیه", "شوالیه سزار", "دژکوب", "منجنیق آتشین", "سناتور", "مهاجر", "قهرمان"];
		aLangTroops[1] = ["گرزدار", "نیزه دار", "تبرزن", "جاسوس", "دلاور", "شوالیه توتن", "دژکوب", "منجنیق", "رئیس", "مهاجر", "قهرمان"];
		aLangTroops[2] = ["سرباز پیاده", "شمشیرزن", "ردیاب", "رعد", "کاهن سواره", "شوالیه گول", "دژکوب", "منجنیق", "رئیس قبیله", "مهاجر", "قهرمان"];
		aLangAttackType = ["پشتیبانی", "حمله عادی", "حمله غارت"];
		break;

	case "ae": // By Dream1
		aLangAllBuildWithId =  ["الحطاب", "حفرة الطين", "منجم حديد", "حقل القمح", "", "معمل النشارة", "مصنع الطوب", "حديد مسبك", "المطاحن", "مخبز", "المخزن", "مخزن الحبوب", "الحداد", "مستودع الاسلحة", "ساحة البطولة", "المبنى الرئيسي", "نقطة التجمع", "السوق", "السفارة", "الثكنه", "الإسطبل", "المصانع الحربية", "الاكاديميه الحربية", "المخبأ", "البلدية", "السكن", "القصر", "الخزنة", "المكتب التجاري", "الثكنة الكبيرة", "الإسطبل الكبير", "حائط المدينة", "الحائط الأرضي", "الحاجز", "الحجّار", "المعصرة", "الصياد","قصر الأبطال", "المخزن الكبير", "مخزن الحبوب الكبير", "معجزة العالم", "ساقية الخيول"];
		aLangAllResInDorf1=["الحطاب", "حفرة الطين", "منجم حديد", "حقل القمح"]
		aLangAddTaskText = ["أضافة مهمة", "النمط", "القرية النشطة", "المهمة المستهدفة", "الى", "نمط", "دعم للبناء", "تكثيف الموارد", "تحريك للاعلى", "تحريك للاسفل", "حذف", "&#160;&#160;&#160;محتوى المهمه", "تحريك ", "حذف جميع المهام"];
		aLangTaskKind = ["تطوير", "تشييد مبنى", "هجوم", "بحث", "تدريب", "نقل", "تاجر المبادله", "هدم", "الاحتفال"];
		maxlevel = ["10", "10", "10", "10", "0", "5", "5", "5", "5", "5", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "20", "10", "20", "20", "20", "20", "100", "20"];
		aLangGameText = ["مستوى", "التجار", "المعرف", "العاصمة", "بداية الوقت", "هذا الاعداد في الوقت الحالي عديم الفائدة.", " إلى", "القرية", "نقل", "من", "نقل الى", "نقل من", "العودة من", "الموارد", "المباني", "تشييد مبنى جديد", "فارغ", "المستوى"];
		aLangRaceName = ["الرومان", "الجرمان", "الإغريق"];
		aLangTaskOfText = ["الجدول الزمني للترقية", "الجدول الزمني لبناء جديد", "التطوير التلقائي", "لايعمل", "بدأ", "أبتداء", "توقف مؤقتا", "الحقول / المباني توزيع لقرية ", "النقل التلقائي", "لم يتم فتح النقل التلقائي", "فتح", "تم النقل بنجاح", "قائمة المهام", "Trans_In_limit", "أفتراضي", "تعديل", "خشب/طين/حديد", "قمح", "الجدول الزمني للهدم",
			"الجدول الزمني للهجوم", "نوع الهجوم", "وقت الذهاب", "عدد مرات التكرار", "الفاصل الزمني","00:00:00","هدف المقاليع","عشوائي", "غير معروف", "مرات", "شهر", "يوم", "القوات ارسلت", "الجدول الزمني للتدريب","مكان تدريب","مهمة التدريب تمت","الجدول الزمني للنقل","إعداد الفاصل الزمني للتحديث","هذا هو الفاصل الزمني لتحديث الصفحة ,\n الافتراضي هو 20 دقيقة,يرجى وضع فاصل زمني جديد:\n\n","Trans_Out_Rmn","الجدول الزمني للإحتفال","إحتفال صغير","إحتفال كبير","تعيين الفاصل الزمني لتركيز الموارد",
			"دقائق", "متوقف", "يعمل", "تشغيل", "أيقاف","Schedule Improve","Improve Attack","Improve defence"];
		aLangErrorText = ["الموارد قليلة جداً.", "العمال مشغولون الآن.", "البناء منجز", "بدء البناء", "في التطوير", "يجب رفع مستوى المخزن أولاً ", "يجب رفع مستوى مخزن الحبوب أولاً ", "الموارد كافية","","يوجد احتفال جارية بالفعل"];
		aLangOtherText = ["ملاحظات هامه", "فقط حقول الموارد في العاصمة <br/>يتم ترقيتهم الى مستوى 20 .<br/> لم يتم معرفة العاصمه. يرجاء زيارة بطاقة العضويه.", "الاختصار هنا ^_^", "أكتمال الإعدادات", "ألغي", "بدء المهام", "تم التطوير بنجاح", "تم التشغيل بنجاح", "القبيلة غير معروفه, لابد من معرفة نوع القوات. <br/>يرجاء زيارة بطاقة العضويه لتحديد نوع القبيله.<br/>", "يرجاء ايضاً زيارة قصر الابطال<br/> لتحديد سرعة ونوع بطلك."];
		allsourceString = "الحطابحفرةالطينمنجمحديدحقلالقمح";
		aLangResources=["الخشب","الطين","الحديد","القمح"];
		allbuildString = "الحطابحفرةالطينمنجمحديدحقلالقمحمعملالنشارةمصنعالطوبحديدمسبكالمطاحنمخبزالمخزنمخزنالحبوبالحدادمستودعالاسلحةساحةالبطولةالمبنىالرئيسينقطةالتجمعالسوقالسفارةالثكنهالإسطبلالمصانعالحربيةالاكاديميهالحربيةالمخبأالبلديةالسكنالقصرالخزنةالمكتبالتجاريالثكنةالكبيرةالإسطبلالكبيرحائطالمدينةالحائطالأرضيالحاجزالحجّارالمعصرةالصيادقصرالأبطالالمخزنالكبيرمخزنحبوبكبيرمعجزةالعالمساقيةالخيول";
		aLangTroops[0] = ["جندي أول", " حراس الإمبراطور", "جندي مهاجم", "فرقة تجسس", "سلاح الفرسان", "فرسان القيصر", "الكبش", "المقلاع الناري", "حكيم", "مستوطن", "البطل"]; //الرومان
		aLangTroops[1] = ["مقاتل بهراوة", "مقاتل برمح", "مقاتل بفأس", "الكشاف", "مقاتل القيصر", "فرسان الجرمان", "محطمة الأبواب", "المقلاع", "الزعيم", "مستوطن", "البطل"]; //الجرمان
		aLangTroops[2] = ["الكتيبة", "مبارز", "المستكشف", "رعد الجرمان", "فرسان السلت", "فرسان الهيدوانر", "محطمة الأبواب الخشبية", "المقلاع الحربي", "رئيس", "مستوطن", "البطل"]; //الإغريق
		aLangAttackType = ["مساندة", "هجوم: كامل", "هجوم: للنهب"];
		break;

}
allString = allsourceString + allbuildString;

// Setting game parameters which are not language-specific
var troopspeed = new Array(3);
troopspeed[0] = ["6", "5", "7", "16", "14", "10", "4", "3", "4", "5", ""];
troopspeed[1] = ["7", "7", "6", "9", "10", "9", "4", "3", "4", "5", ""];
troopspeed[2] = ["7", "6", "17", "19", "16", "13", "4", "3", "5", "5", ""];
var mts = new Array(3);
mts[0]	= 16;
mts[1]	= 12;
mts[2]	= 24;
myhost = "http://" + window.location.hostname;

  // Auto login code
  if (autoLogin)
    loginCheck(document);

  getSingleVillageNum();
  if (!GM_getValue(myacc() + "_doing")) {
    GM_setValue(myacc() + "_doing", "1");
    TS_debug("can't find doing, set doing = 1");
  }
  var taskdoing = GM_getValue(myacc() + "_doing");
  if (!GM_getValue(myacc() + "_option")) {
    GM_setValue(myacc() + "_option", "");
  }
  getTaskCookies();
	
  var pagefreshInterval = GM_getValue(myacc() + "_FreshInterval","20");
  var transsInterval = GM_getValue(myacc() + "_TransInterval", "30");
	
  var mybar = document.createElement("div");
  mybar.style.width = "100%";
  mybar.style.backgroundColor = "silver";
  mybar.style.position = "fixed";
  mybar.style.bottom = "0";
  mybar.style.textAlign = "center";
  document.body.insertBefore(mybar, document.body.lastChild.nextSibling);
	
/***************** Functions adopted from "Travian: Antifarm\Troop saver" script **************************/

  /**
   * XPath wrapper - simplifies searching for items in the document.
   */
  function find(xpath, xpres, startnode)
  {
    if (!startnode) {startnode = document;}
    var ret = document.evaluate(xpath, startnode, null, xpres, null);
    if (ret == null) return null;
    return  xpres == XPFirst ? ret.singleNodeValue : ret;
  }

  /**
   * A function to log debug mesages into Javascript console.
   */
  function TS_debug(text)
  {
    if (logDebugMesages)
      GM_log(text);
  }

  function getFormHidVal(doc, name)
  {
    var ex = ".//input[@type='hidden'][@name='" + name + "']";
    var tag = find(ex, XPFirst, doc);
    if (tag == null)
      return 0;
    return(tag.value);
  }

  /**
   * Returns XPath node of the first form on page, or null if no form.
   */
  function getFormNode(doc)
  {
    var tag;
    tag = find(".//form", XPFirst, doc);
    if (tag == null)
      return null;
    return tag;
  }

  /**
   * Sends given 'post' request, with given callback function and data.
   */
  function TS_postRequest(reqUrl,reqData,reqCallback,p1,p2,p3,p4)
  {
    TS_debug("POST: "+reqUrl+" "+reqData);
    GM_xmlhttpRequest({
      method: "POST",
      url: reqUrl,
      headers:{'Content-type':'application/x-www-form-urlencoded',
        },
      data:encodeURI(reqData),
      onload: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      },
      onerror: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      }
    });
  }

  /**
   * Sends given 'get' request, with given callback function.
   */
  function TS_getRequest(reqUrl,reqCallback,p1,p2,p3,p4)
  {
    TS_debug("GET: "+reqUrl);
    GM_xmlhttpRequest({
      method: "GET",
      url: reqUrl,
      headers: {'Accept': 'application/atom+xml,application/xml,text/xml',
        },
      onload: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      },
      onerror: function(responseDetails) 
      {
        var pulled;
        pulled = document.createElement("div");
        pulled.innerHTML = responseDetails.responseText;
        reqCallback(pulled,p1,p2,p3,p4);
      }
    });
  }

/*
 * Checks if the player is in login screen.
 * If so, and there's field for name and password, then 'clicks' login button.
 */
function loginCheck(doc)
{
  var loginButton,passButton;
  loginButton = find(".//input[@value='login']", XPFirst, doc);
  passButton = find(".//input[@type='password' and contains(@value, '*')]", XPFirst, doc);
  if((loginButton != null) && (passButton != null))
  {
    TS_debug("loginCheck: login screen detected");
    loginButton.click();
  } else
  {
    TS_debug("loginCheck: not in login screen");
  }
}

/******************* End of "Travian: Antifarm\Troop saver" adoption **************************/

/**
 * Updates the Xlang variable, which is used in language initialization.
 */	
function checkLang()
{
  var host = window.location.hostname;
  hosts = host.split(".");
  Xlang = hosts[hosts.length-1];
}

	function $(id) {
		return document.getElementById(id);
	}
	
	function h1in() {
		return document.getElementsByTagName("h1")[0];
	}
		
	function herere() {
		return currentServer() + "_" + getuid() + "_" + currentID();
	}
	
	function myacc() {
		return currentServer() + "_" + getuid();
	}
	
	function currentID() {
		var theboys = document.evaluate("//table[@id='vlist']/descendant::td[@class='dot hl']", document, null, XPFirst, null);
		if (theboys.singleNodeValue != null) {
			theUrl = theboys.singleNodeValue.nextSibling.innerHTML.match(/newdid=\d{1,}/);
			getit = theUrl.toString().match(/\d{1,}/);
			return getit;
		} else
		{
			return GM_getValue(myacc() + '_singleTownNEWDID');
		}
	}
	

/**
 * Returns name of the active village.
 */	
function currentVillageName()
{
  var theVillageName = find("//table[@id='vlist']/descendant::a[contains(@href,"+ currentID()+")]", XPFirst);
  if (theVillageName != null)
  {
    return theVillageName.innerHTML;
  } else
  {
    return GM_getValue(myacc() + "_mainvillageName");
  }
}
	
function getuid()
{
  var tag;
  tag = find("id('side_navi')/descendant::a[contains(@href,'spieler')]", XPFirst);
  if (tag == null)
    tag = find("id('sleft')/descendant::a[contains(@href,'spieler')]", XPFirst);
  return tag.href.split("uid=")[1];
}

function getAllVillageNewdids()
{
  var allNewdids = new Array();
  var allvillages = find("id('vlist')/descendant::a[@href]", XPSnap);
  if (allvillages.snapshotLength > 0)
  { //multi-villages
    for (var i = 0; i < allvillages.snapshotLength; i++)
    {
      if (allvillages.snapshotItem(i).href.indexOf("newdid") != -1)
      {
        newdiddd = allvillages.snapshotItem(i).href.match(/\d{3,}(?!\.)/);
        thenewlength = allNewdids.push(newdiddd); //+ ":" + thevillagenum;
      }
    }
  } else
  { // single village
    allNewdids[0] = (GM_getValue(myacc() + '_singleTownNEWDID')) ? GM_getValue(myacc() + '_singleTownNEWDID') : "";
  }
  return allNewdids;
}

function getSingleVillageNum()
{
  if (!GM_getValue(myacc() + '_singleTownNEWDID')) {
  GM_xmlhttpRequest({
				method: 'GET',
				url: myhost + "/dorf3.php",
				onload: function(result){
					var theString = result.responseText.match(/newdid=\d{1,}/);
					var villageNum = theString.toString().match(/\d{1,}/);
					GM_setValue(myacc() + '_singleTownNEWDID', villageNum.toString());
				}
			});
  }
}
	
	
	
function getErrorInfor()
{
  var errors = GM_getValue(herere() + "_currentError");
  return errors;
}
	
	
	
	
	
	
	function getthebuildUrl(vil, task) {
		TS_debug("getthebuildUrl: Starting, task = "+task);
		var url = myhost + "/build.php?newdid=" + vil + "&id=" + task[1];
		var getbuildurl = new XMLHttpRequest();
		getbuildurl.open('GET', url, false);
		getbuildurl.onreadystatechange = callback;
		getbuildurl.send(null);
		function callback() {
			if (getbuildurl.readyState == 4) {
				if (getbuildurl.status == 200) {
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement("div");
					aElem.innerHTML = getbuildurl.responseText;
					aDoc.appendChild(aElem);
					
					switch (task[0]) { // 0_id_level_time_name   upgrade
						case "0":
							var leee=aDoc.getElementsByTagName("h1")[0].innerHTML.split(" ");
							level = leee[leee.length-1];
							GM_setValue(myacc() + "_" + vil + "_crtBuildlevel", level);
							var allanchors = aDoc.evaluate('id("content")//a[contains(@href,"?a=")]', aElem, null, XPFirst, null);
							if (allanchors.singleNodeValue) {
								TS_debug("i get the url ,it is " + allanchors.singleNodeValue.href);
								return allanchors.singleNodeValue.href;
							}
							else {
								var errors = aDoc.evaluate('//*[@class="none"]', aElem, null, XPFirst, null); 
								GM_setValue(herere() + "_currentError",errors.singleNodeValue.innerHTML);
								TS_debug("oh No! I can't get the upgrade url, but i get the error info");
								return false;
							}
							break;
						case "1": // 1_id_level_gid_time_name   newbuild
							var newbdurl = aDoc.evaluate('id("content")//a[contains(@href,"?a='+task[3]+'")]', aElem, null, XPFirst, null);
							if (newbdurl.singleNodeValue) {
								TS_debug("i get the newbuild url ,it is " + newbdurl.singleNodeValue.href);
								return newbdurl.singleNodeValue.href;
							}
							else {
								var h1i = aDoc.getElementsByTagName("h1")[0].innerHTML;
								if (h1i == aLangGameText[15]) {
									var errors = aDoc.evaluate('//*[@class="none"]', aElem, null, XPFirst, null);
									GM_setValue(herere() + "_currentError", errors.singleNodeValue.innerHTML);
									TS_debug("oh No! I can't get the newbuild url, but i get the error info");
									return false;
								}
								else{
									GM_setValue(herere() + "_currentError", "newBuild can't run, something is here.");
									TS_debug("oh No! newBuild can't run, something is here.")
									return false;
								}
							}
							break;
					}
				}
			}
		}
		return callback();
	}
	
	
	function getcrtlevel() {
		var theTitle = h1in().innerHTML.split(" ");
		if (theTitle.length>2) {
			return theTitle[theTitle.length-1];
		}
	}
	
	
	
	function currentServer() {
		var serverr = window.location.hostname.replace(/\.travian\./, "");
		return serverr;
	}
	
	
	
	function getMainVillageid() {
		if (window.location.href.split("?uid=")[1] == getuid()) {
			if (window.location.href.indexOf("spieler.php") != -1) {
				var mainvi = document.evaluate('//table[@id="villages"]/descendant::span[@class="none3"]', document, null, XPFirst, null);
				themainv = mainvi.singleNodeValue.parentNode.firstChild.innerHTML;
				mainpos = mainvi.singleNodeValue.parentNode.firstChild.href.match(/\d{2,}(?=&)/);
				GM_setValue(myacc() + "_mainvillageName", themainv);
				GM_setValue(myacc() + "_mainvillageId", getDidFromVillage(themainv));
				for (oo in aLangRaceName) {
					therace = new RegExp(aLangRaceName[oo]);
					if (document.getElementsByTagName("body")[0].innerHTML.match(therace)) {
						GM_setValue(myacc() + "_raceID", oo.toString());
						break;
					}
				}
				coordx=mainvi.singleNodeValue.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.match(/\(-?\d{1,3}/g)[0].match(/-?\d{1,3}/);
				coordy=mainvi.singleNodeValue.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML.match(/-?\d{1,3}\)/g)[0].match(/-?\d{1,3}/);
				GM_setValue(myacc() + "_mainVillageCoord", coordx+"/"+coordy);
				GM_setValue(myacc() + "_mainVillagePosition", mainpos.toString());
				GM_deleteValue(myacc() + "_undefined_WarehouseCap");
				GM_deleteValue(myacc() + "_undefined_ResourceNow");
				GM_deleteValue(myacc() + "_undefined_GranaryCap");
			}
		}
	}
	
	function getResourceCap() {
		resource = [$("l4").innerHTML.split("/")[0], $("l3").innerHTML.split("/")[0], $("l2").innerHTML.split("/")[0], $("l1").innerHTML.split("/")[0]]
		resstring = resource.join("/")
		WarehouseCap = $("l4").innerHTML.split("/")[1];
		GranaryCap = $("l1").innerHTML.split("/")[1];
		GM_setValue(herere() + "_WarehouseCap", WarehouseCap);
		GM_setValue(herere() + "_GranaryCap", GranaryCap);
		GM_setValue(herere() + "_ResourceNow", resstring);
	}

	function HttpRequire(url, v, ta, k, l){
		TS_debug("come into HttpRequire(), at "+getvillagefromdid(v)+" to build "+ta[ta.length-1]);
		if (url) {
			nurl=url.split(".php?")[0]+".php?newdid="+v+"&"+url.split(".php?")[1];
			GM_xmlhttpRequest({
				method: 'GET',
				url: nurl,
				headers: "",
				onload: function(){
					switch (k) {
						case "0"://resource updata
							GM_deleteValue(myacc() + "_" + v + "_ResourceUpdataTime");
							GM_setValue(myacc() + "_" + v + "_autoResourceDone", ta[1]);
							if (l >= ta[2]) {
								deleteTaskFromCookie(v, ta);
							}
							break;
						case "1"://build task
							GM_deleteValue(myacc() + "_" + v + "_BuildingUpdataTime");

							switch (ta[0]) {
								case "0"://build updata
									if (l >= ta[2]) {
										deleteTaskFromCookie(v, ta);
									}
									break;
								case "1"://new build
									if (l >= ta[2]) {
										deleteTaskFromCookie(v, ta);
									}
									else {//new build 1_id_level_gid_time_name  to  Updata 0_id_level_time_name
										var changeToUP=new Array();
										changeToUP[0]="0";
										changeToUP[1]=ta[1];
										changeToUP[2]=ta[2];
										changeToUP[3]=ta[4];
										changeToUP[4]=ta[5];
										deleteTaskFromCookie(v, ta,changeToUP);
									}
									break;
							}
						
							break;
						case "2":
							GM_deleteValue(myacc() + "_" + v + "_UpdataTime");
							GM_setValue(myacc() + "_" + v + "_autoResourceDone", ta[1]);

							switch (ta[0]) {
								case "0":
									if (l >= ta[2]) {
										deleteTaskFromCookie(v, ta);
									}
									break;
								case "1":
									if (l >= ta[2]) {
										deleteTaskFromCookie(v, ta);
									}
									else {//new build 1_id_level_gid_time_name  to  Updata 0_id_level_time_name
										var changeToUP=new Array();
										changeToUP[0]="0";
										changeToUP[1]=ta[1];
										changeToUP[2]=ta[2];
										changeToUP[3]=ta[4];
										changeToUP[4]=ta[5];
										deleteTaskFromCookie(v, ta,changeToUP);
									}
									break;
							}
							break;
					}
					calldoing1()
					printMSG(aLangGameText[7] + getvillagefromdid(v) + aLangOtherText[6]);
					window.location.href=myhost + "/dorf1.php";
					TS_debug("built ok!");
				},
			})
		}
		else {
			var nextt = new Date();
			tt = nextt.getTime()+1800000;
			nextt.setTime(tt);
			switch (k){
				case "0":
					GM_setValue(myacc() + "_" + v + "_ResourceUpdataTime",nextt);
					break;
				case "1":
					GM_setValue(myacc() + "_" + v + "_BuildingUpdataTime",nextt);
					break;
				case "2":
					GM_setValue(myacc() + "_" + v + "_UpdataTime",nextt);
					break;
			}
			calldoing1()
		}
	}
	
	
	
	function setTaskCookies() { // 1_25_1_undefined_1248453089000_Hero
		taskkindss = $("taskkindss").value;
		crtvillagee = $("crtvillagee").value;
		buildnamee = $("buildNamee").value;
		bidid = $("bidid").value;
		levelselect = $("levelselect").value;
		taskTimee = $("userSetTime").value;
		todday = new Date(taskTimee)
		userSetTime = todday.getTime()
		
		switch (taskkindss) {
			case "0":
				thisTask = taskkindss + "_" + bidid + "_" + levelselect + "_" + userSetTime+"_"+buildnamee
				
				break;
			case "1":
				thisTask = taskkindss + "_" + bidid + "_" + levelselect + "_" + getGidFromName(buildnamee) + "_" + userSetTime+"_"+buildnamee
				break;
		}
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
		document.body.removeChild($("taskForm_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
	}
	
	
	
	/****************************************************************************/
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;
	
	
	function setOption(key, value){
		var options = GM_getValue(myacc() + "_option");
		if (options & options != '' & options != null) {
			options = options.split(",");
		}
		else {
			GM_setValue(myacc() + "_option", "");
			options = new Array();
		}
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			options.push(key);
			options.push(value);
		}
		else {
			options[myOption + 1] = value;
		}
		options = options.join(",");
		GM_setValue(myacc() + "_option", options);
	}
	
	function getOption(key, defaultValue, type) {
		var options = GM_getValue(myacc() + "_option");
		options = options.split(",");
		var myOption = options.indexOf(key);
		if (myOption < 0) {
			return defaultValue;
		}
		switch (type) {
			case "boolean":
				var myOption = (options[myOption + 1] == "true") ? true : false;
				break;
			case "integer":
				var myOption = parseInt(options[myOption + 1]);
				break;
			case "string":
			default:
				var myOption = options[myOption + 1];
				break;
		}
		return myOption;
	}
	
	function mouseCoords(ev) {
		return {
			x: ev.pageX,
			y: ev.pageY
		};
	}
	
	function makeClickable(object) {
		object.onmousedown = function() {
			dragObject = this;
		}
	}
	
	function getMouseOffset(target, ev) {
		var docPos = getPosition(target);
		var mousePos = mouseCoords(ev);
		return {
			x: mousePos.x - docPos.x,
			y: mousePos.y - docPos.y
		};
	}
	
	function getPosition(e){
		var left = 0;
		var top = 0;
		while (e.offsetParent) {
			left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
			top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
			e = e.offsetParent;
		}
		left += e.offsetLeft + (e.currentStyle ? (parseInt(e.currentStyle.borderLeftWidth)).NaN0() : 0);
		top += e.offsetTop + (e.currentStyle ? (parseInt(e.currentStyle.borderTopWidth)).NaN0() : 0);
		return {
			x: left,
			y: top
		};
	}
	
	function mouseMove(ev) {
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		
		if (dragObject) {
			dragObject.style.position = 'fixed';
			dragObject.style.top = (mousePos.y - mouseOffset.y) + "px";
			dragObject.style.left = (mousePos.x - mouseOffset.x) + "px";
		}
		lMouseState = iMouseDown;
		return false;
	}
	
	function mouseUp(ev) { //
		if (dragObject) {
			switch (dragObject.id) {
				case "demolistform_wrapper":
					var key = "DEMOLISH_POSITION";
					break;
				case "tranlmtform_wrapper":
					var key = "TRANLMT_POSITION";
					break;
				case "tasklisttable_wrapper":
					var key = "TASKLIST_POSITION";
					break;				
				case "taskForm_wrapper":
					var key = "FORM_POSITION";
					break;
				case "tranForm_wrapper":
					var key = "TRAN_POSITION";
					break;
				case "MSG_wrapper":
					var key = "MSG_POSITION";
					break;
				default:
					var key = "LIST_POSITION";
					break;
			}
			setOption(key, dragObject.style.top + "_" + dragObject.style.left);
		}
		dragObject = null;
		iMouseDown = false;
	}
	
	function mouseDown(ev) {
		var mousePos = mouseCoords(ev);
		var target = ev.target;
		iMouseDown = true;
		if (target.getAttribute('DragObj')) {
			return false;
		}
	}
	
	
	function makeDraggable(item) {
		if (!item) 
			return;
		item.addEventListener("mousedown", function(ev){
			dragObject = this.parentNode;
			mouseOffset = getMouseOffset(this.parentNode, ev);
			return false;
		}, false);
	}
	
	document.addEventListener("mousemove", mouseMove, false);
	document.addEventListener("mousedown", mouseDown, false);
	document.addEventListener("mouseup", mouseUp, false);


	/****************************************************************************/

	function createDemolishlnk() {
		var nposi=$("contract");
		var errors = document.evaluate('//p[@class="none"]', document, null, XPFirst, null);
		nextposition=(nposi)?nposi:errors.singleNodeValue;
		var demolishdiv=document.createElement("div");
		demolishdiv.id="demolishdiv";
		var demolishlnk=document.createElement("a");
		demolishlnk.id="demolishlnk";
		demolishlnk.href="#";
		demolishlnk.innerHTML="&#160;&#160;"+aLangTaskOfText[18] +"&#160;&#160;";
		demolishlnk.addEventListener("click", createDemolishFloat, false);
		demolishdiv.appendChild(demolishlnk);
		nextposition.parentNode.insertBefore(demolishdiv,nextposition);
	}
	
	
	
	function createNewbuildLnk() {
		crtvillagedid = currentID();
		buildnextlevel="1";
		buildidss = window.location.href.match(/[^d]id=\d{1,2}/);
		buildidid = buildidss.toString().match(/\d{1,2}/);		
		var allnewbuilds = document.evaluate('//div[@id="build"]/table[@class="new_building"]', document, null, XPSnap, null);
		for (var i = 0; i < allnewbuilds.snapshotLength; i++) {
			buildName=allnewbuilds.snapshotItem(i).previousSibling.previousSibling.innerHTML;
			buildName=(buildName.indexOf(aLangAllBuildWithId[10])!=-1)?aLangAllBuildWithId[10]:((buildName.indexOf(aLangAllBuildWithId[11])!=-1)?aLangAllBuildWithId[11]:buildName)
			buildgid=getGidFromName(buildName);
			buildmaxlevel = parseInt(maxlevel[buildgid],10);
			theposition = allnewbuilds.snapshotItem(i).lastChild;
			
			var createUrl = document.createElement("a");
			createUrl.id = "createnewurl";
			createUrl.href = "#";
			createUrl.innerHTML = "&#160;&#160;" + aLangTaskOfText[1]+"&#160;&#160;" ;
			createUrl.setAttribute("crtvillage", crtvillagedid);
			createUrl.setAttribute("buildName", buildName);
			createUrl.setAttribute("buildnextlevel", buildnextlevel);
			createUrl.setAttribute("buildmaxlevel", buildmaxlevel);
			createUrl.setAttribute("buildgid", buildgid);
			createUrl.setAttribute("buildidid", buildidid);
			createUrl.addEventListener("click", createUpdateFloat, false);
			theposition.appendChild(createUrl);
		}
	}

	
	function createbuildlink() {
		crtvillagedid = currentID();
		mainv1 = GM_getValue(myacc() + "_mainvillageId");
		h1inner = h1in().innerHTML.split(" ");
		crtlevel = parseInt(h1inner[h1inner.length-1]);
		switch (h1inner.length) {
			case 3:
				buildName = h1inner[0];
				break;
			case 4:
				buildName = h1inner[0] + " " + h1inner[1];
				break;
			case 5:
				buildName = h1inner[0] + " " + h1inner[1] + " " + h1inner[2];
				break;
			case 6:
				buildName = h1inner[0] + " " + h1inner[1] + " " + h1inner[2] + " " + h1inner[3];
				break;
		}
		for (yyy in aLangAllBuildWithId) {
			if (buildName == aLangAllBuildWithId[yyy]) {
				buildmaxlevel = parseInt(maxlevel[yyy]);
				if ((crtvillagedid == mainv1) && (yyy < 5)) {
					buildmaxlevel *= 2; //mainvillage resource level 20
				}
			}
		}
		if (crtlevel < buildmaxlevel) {
			buildnextlevel = crtlevel + 1;
			if (window.location.href.indexOf("&gid=17") != -1) {
				var rere = document.evaluate('id("textmenu")/descendant::a[@href]', document, null, XPFirst, null);
				buildidid = rere.singleNodeValue.href.split("id=")[1]
			}
			else {
				buildidss = window.location.href.match(/[^dg]id=\d{1,2}/);
				buildidid = buildidss.toString().match(/\d{1,2}/);
			}
			
			if ($("contract")) {
				theposition = $("contract").nextSibling;
				var createUrl = document.createElement("a");
				createUrl.id = "createUrl";
				createUrl.href = "#";
				createUrl.innerHTML = "&#160;&#160;" + aLangTaskOfText[0] + "&#160;&#160;";
				createUrl.setAttribute("crtvillage", crtvillagedid);
				createUrl.setAttribute("buildName", buildName);
				createUrl.setAttribute("buildnextlevel", buildnextlevel);
				createUrl.setAttribute("buildmaxlevel", buildmaxlevel);
				createUrl.setAttribute("buildidid", buildidid);
				createUrl.addEventListener("click", createUpdateFloat, false);
				theposition.parentNode.insertBefore(createUrl, theposition.nextSibling);
			}
		}
	}
	
	/*
	 * Creates a floating GUI box with demolition parameters.
	 */
	function createDemolishFloat()
	{
		var options=document.evaluate('//select[@name="abriss"]/descendant::option', document, null, XPSnap, null);
		myoptions="";
		for (var i=0; i<options.snapshotLength; i++) {
			if(options.snapshotItem(i).innerHTML.indexOf(aLangGameText[16]) != -1) { continue; }
			myoptions+="<option value='"+options.snapshotItem(i).innerHTML+"'>"+options.snapshotItem(i).innerHTML+"</option>"
		}
		var DemoListForm=document.createElement("form");
		DemoListForm.id="demolistform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"demolistform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		DemoListForm.innerHTML = floatClose;
		DemoListForm.innerHTML += "<br/>" + aLangTaskOfText[18].big() +"<br/><br/>";
		DemoListForm.innerHTML+=  aLangGameText[7] + ":  <select id='crtvillagee' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/><br/>";
		DemoListForm.innerHTML+=aLangTaskOfText[18]+": <select id='selecteddemo'>"+myoptions+"</select><br/><br/>"

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setDemoCookies, true);
		DemoListForm.appendChild(tSubmitBtn);
		
		var doWrapper = document.createElement("div");
		doWrapper.id = "demolistform_wrapper";
		doWrapper.appendChild(DemoListForm);
		
		var formCoords = getOption("DEMOLISH_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		doWrapper.style.top = formCoords[0];
		doWrapper.style.left = formCoords[1];
		
		document.body.appendChild(doWrapper);
		makeDraggable($("demolistform"));		
	}
	
	function createPartylnk()
	{
		var thePosi=document.getElementsByClassName("gid24")[0];
		var Partylnk = document.createElement("a");
		Partylnk.id = "partylnk";
		Partylnk.href = "#";
		Partylnk.innerHTML = "&#160;&#160;" + aLangTaskOfText[39] + "&#160;&#160;";
		Partylnk.addEventListener("click", createPartyFloat, false);
		thePosi.appendChild(Partylnk);
	}
	
	function createPartyFloat()
	{
		var partyForm = document.createElement("form");
		partyForm.id = "partyform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"partyform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		partyForm.innerHTML = floatClose;

		var partyid=document.getElementsByTagName("input")[0].value;
		var h1inn = h1in().innerHTML.split(" ");
		bblevel = h1inn[h1inn.length - 1];

		partyForm.innerHTML += "<br/>" + aLangTaskOfText[39].big() + "<br/><br/>";
		partyForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvv' disabled=true><option value='" + partyid + "'>" + currentVillageName() + "</option></select><br/>";

		if (parseInt(bblevel)<10){
			partyForm.innerHTML += aLangAddTaskText[1] + ":<select id='partykind'  disabled=true><option value='1'>" + aLangTaskOfText[40] + "</option>";
		}
		else{
			partyForm.innerHTML += aLangAddTaskText[1] + ":<select id='partykind' ><option value='1'>" + aLangTaskOfText[40] + "</option><option value='2'>" + aLangTaskOfText[41] + "</option>";
		}

		partyForm.innerHTML +="</select><br/><br/>";
		
		tod = new Date();
		ye = tod.getFullYear();
		mon = tod.getMonth() + 1;
		dat = tod.getDate();
		hou = tod.getHours();
		if (hou < 10) {
			hou = "0" + hou;
		}
		minu = tod.getMinutes();
		if (minu < 10) {
			minu = "0" + minu;
		}
		sec = tod.getSeconds();
		if (sec < 10) {
			sec = "0" + sec;
		}
		nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec;
		partyForm.innerHTML += aLangGameText[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br/>";
		partyForm.innerHTML += aLangTaskOfText[22] + ":&#160;<input type='text' id='repeat' style='width:30px' value='0' /><br/><br/>";
		
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setPartyCookies, true);
		partyForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "partyform_wrapper";
		tWrapper.appendChild(partyForm);
		
		var formCoords = getOption("PARTY_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("partyform"));
	}
	
	
	function setPartyCookies(){
		partyid=$("crtvv").value;
		partykind =$("partykind").value;
		repeat=$("repeat").value;
		var startt=new Date($("startime").value);
		startTime=startt.getTime();
	//------------------------------------------------		//6_1_1000_1245413194000_id
		thisTask = "6_" + partykind + "_" + repeat + "_"+ startTime+"_"+partyid;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("partyform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
		msg = aLangTaskOfText[39].bold() + " " + aLangOtherText[3];
		printMSG(msg);
	}
	
function createImprovelink() // class="none"
{
  if ($("contract"))
  {
    theposition = $("contract").nextSibling;
  } else
  {
    theposition = find("//p[@class='none']", XPFirst);
  }
  var createImprove = document.createElement("a");
  createImprove.id = "createImprove";
  createImprove.href = "#";
  createImprove.innerHTML = "&#160;&#160;" + aLangTaskOfText[48] + "&#160;&#160;";
  createImprove.addEventListener("click", createImproveFloat, false);
  theposition.parentNode.insertBefore(createImprove, theposition.nextSibling);
}
	
	
	function createImproveFloat(){
		var h1innI = h1in().innerHTML.split(" ");
		switch (h1innI.length) {
			case 3:
				ibName = h1innI[0];
				break;
			case 4:
				ibName = h1innI[0] + " " + h1innI[1];
				break;
			case 5:
				ibName = h1innI[0] + " " + h1innI[1] + " " + h1innI[2];
				break;
			case 6:
				ibName = h1innI[0] + " " + h1innI[1] + " " + h1innI[2] + " " + h1innI[3];
				break;
		}
		iblevel=h1innI[h1innI.length-1]

		var ImproveForm = document.createElement("form");
		ImproveForm.id = "improveform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"improveform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		ImproveForm.innerHTML = floatClose;
		
		ImproveForm.innerHTML += "<br/>" + aLangTaskOfText[48].big() + "<br/><br/>";
		ImproveForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtv' disabled=true><option value='crtv'>" + currentVillageName() + "</option></select><br/><br/>";

		switch (ibName){
			case aLangAllBuildWithId[12]:
				ImproveForm.innerHTML += aLangAddTaskText[1] + ":<select id='improvekind'  disabled=true><option value='1'>" + aLangTaskOfText[49] + "</option></select><br/><br/>";
			break;
			case aLangAllBuildWithId[13]:
				ImproveForm.innerHTML += aLangAddTaskText[1] + ":<select id='improvekind'  disabled=true><option value='2'>" + aLangTaskOfText[50] + "</option></select><br/><br/>";
			break;
		}
		
		ImproveForm.innerHTML += aLangAddTaskText[3] + ":  " + getImproveTroops(iblevel)+"<br/><br/>";
		ImproveForm.innerHTML += aLangAddTaskText[4] + ":  " + levelselect(1, iblevel)+"<br/><br/><br/>";

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setImproveCookies, true);
		ImproveForm.appendChild(tSubmitBtn);
		
		var iWrapper = document.createElement("div");
		iWrapper.id = "improveform_wrapper";
		iWrapper.appendChild(ImproveForm);
		
		var formCoords = getOption("IMPRO_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		iWrapper.style.top = formCoords[0];
		iWrapper.style.left = formCoords[1];
		
		document.body.appendChild(iWrapper);
		makeDraggable($("improveform"));
	}
	
	function setImproveCookies(){
		idss = window.location.href.match(/[^dg]id=\d{1,2}/);
		idid = idss.toString().match(/\d{1,2}/);
		imkind=$("improvekind").value;
		troopkindSN=$("improveTroops").value;
		impTarget=$("levelselect").value;
		var sotime=new Date();
		
		thisTask = "3_" + imkind +"_" + idid + "_" + troopkindSN + "_" +impTarget+"_"+sotime.getTime();
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
		document.body.removeChild($("improveform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList()
		getTaskCookies()
	}
	
	function getImproveTroops(maxlvl) {
		var gettroops=document.evaluate('//td[@class="desc"]', document, null, XPSnap, null);
		var myRace1=Number(GM_getValue(myacc() + "_raceID"));
		var troopsSelect="<select id='improveTroops'>";
			for (var i=0; i<gettroops.snapshotLength; i++) {
				var troopname=gettroops.snapshotItem(i).firstChild.nextSibling.innerHTML;
				var trooplevel=gettroops.snapshotItem(i).firstChild.nextSibling.nextSibling.nextSibling.innerHTML.split(" ")[1].split(")")[0];
				if (trooplevel==maxlvl) { continue; }
				for (mr in aLangTroops[myRace1]){
					if (aLangTroops[myRace1][mr]==troopname){
						troopsSelect += "<option  value='"+troopname+"_"+ (Number(mr)+1) +"'>"+troopname+"</option>";
						break;
					}
				}
			}
			troopsSelect+="</select>";
		return troopsSelect;
	}
	
	function setDemoCookies() {
		selecteddemo = $("selecteddemo").value;
		theID=selecteddemo.split(". ")[0];
		adesa=selecteddemo.split(". ")[1].split(" ");
		crtlevel=adesa[adesa.length-1];
		regexp11=new RegExp(" "+crtlevel);
		theBuild=selecteddemo.split(". ")[1].replace(regexp11,"");
		thisTask = "7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
		document.body.removeChild($("demolistform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
	}
	
	function getGidFromName(name){
		for (i in aLangAllBuildWithId) {
			if (aLangAllBuildWithId[i] == name) {
				return i;
			}
		}		
	}
	
	
	function createAutoResLink(){
		var producee = $("production");
		var autoResDiv = document.createElement("div");
		autoResDiv.id = "autoResdiv";
		autoResDiv.innerHTML = aLangTaskOfText[2].bold() + ":&#160;&#160;";
		producee.parentNode.insertBefore(autoResDiv, producee.nextSibling);

		
		var autoResStatus = GM_getValue(herere() + "_autoResource", "0");
		if (autoResStatus == "0") {
			autoResDiv.innerHTML += aLangTaskOfText[3].fontcolor("gray") + "&#160;&#160;";
			var autoResLnk = document.createElement("a");
			autoResLnk.id = "autoResform1";
			autoResLnk.href = "#";
			autoResLnk.innerHTML = aLangTaskOfText[4];
			autoResLnk.addEventListener("click", createAutoResFloat, false);
		}
		else {
			autoResDiv.innerHTML += aLangTaskOfText[5].fontcolor("green") + "&#160;&#160;";
			var autoResLnk = document.createElement("a");
			autoResLnk.id = "autoResform2";
			autoResLnk.href = "#";
			autoResLnk.innerHTML = aLangTaskOfText[6];
			autoResLnk.addEventListener("click", closeAutoRes, false);
		}
		autoResDiv.appendChild(autoResLnk);

/********************************** transport limit here **************************************************/
		var transLimit=document.createElement("div");
		transLimit.id="translimit";
		transLimit.innerHTML=aLangTaskOfText[13].bold() + ":&#160;&#160;";
		autoResDiv.parentNode.insertBefore(transLimit, autoResDiv.nextSibling);
		
		var userTranSetup = GM_getValue(herere() + "_userTranSetup", "false");
		transLimit.innerHTML+=(userTranSetup=="false")?aLangTaskOfText[14]:userTranSetup;
		transLimit.innerHTML+="&#160;&#160;";
		
		var changeIt=document.createElement("a");
		changeIt.id="changeit";
		changeIt.href="#";
		changeIt.innerHTML=aLangTaskOfText[15];
		changeIt.addEventListener("click", createTranLimitFlt, false);
		transLimit.appendChild(changeIt);
/***********************************transport limit here***************************************************/
/***********************************transport remain here***************************************************/
		var resRemain=document.createElement("div");
		resRemain.id="resremain";
		resRemain.innerHTML=aLangTaskOfText[38].bold() + ":&#160;&#160;";
		autoResDiv.parentNode.insertBefore(resRemain, transLimit.nextSibling);
		
		var userRemainSetup = GM_getValue(herere() + "_userRemainSetup", "false");
		resRemain.innerHTML += (userRemainSetup=="false")?aLangTaskOfText[14]:userRemainSetup;
		resRemain.innerHTML += "&#160;&#160;";
		
		var changeIt2=document.createElement("a");
		changeIt2.id="changeit2";
		changeIt2.href="#";
		changeIt2.innerHTML=aLangTaskOfText[15];
		changeIt2.addEventListener("click", createResRemainFlt, false);
		resRemain.appendChild(changeIt2);
/***********************************transport remain here***************************************************/
	} 
	
	function createResRemainFlt(){
		var userRemainSetup = GM_getValue(herere() + "_userRemainSetup", "false");
		usersetup2=(userRemainSetup=="false")?aLangTaskOfText[14]:userRemainSetup;
		var resRemainForm = document.createElement("form");
		resRemainForm.id = "resremainform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"resremainform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		resRemainForm.innerHTML = floatClose;
		resRemainForm.innerHTML += "<br/>" + aLangTaskOfText[15].big() +aLangTaskOfText[38].big()+"<br/><br/>";
		resRemainForm.innerHTML += aLangGameText[7] + ":  <select id='crtvi'><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/><br/>";
		resRemainForm.innerHTML += aLangTaskOfText[38]+":  <select id='crtremain'><option value='" + usersetup2 + "'>" + usersetup2 + "</option></select><br/><br/>";
		resRemainForm.innerHTML += aLangTaskOfText[15]+aLangGameText[6]+":  <select id='resrrremain'>"+resLimitOption() + "</select>";
		resRemainForm.innerHTML += "  "+"<select id='cropremain'>"+cropLimitOption() + "</select><br/><br/>";

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setResRmnCookies, true);
		resRemainForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "resremainform_wrapper";
		tWrapper.appendChild(resRemainForm);
		
		var formCoords = getOption("RESREMAIN_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("resremainform"));		
	}
	
	function setResRmnCookies(){
		var userSet = new Array()
		userSet[0] = $("resrrremain").value;
		userSet[1] = $("cropremain").value;
		if (userSet[0] == "default" || userSet[1] == "default") {
			GM_deleteValue(herere() + "_userRemainSetup")
		}
		else {
			GM_setValue(herere() + "_userRemainSetup", userSet.join("/"))
		}
		document.body.removeChild($("resremainform_wrapper"));
		$("autoResdiv").parentNode.removeChild($("autoResdiv"))
		$("translimit").parentNode.removeChild($("translimit"))
		$("resremain").parentNode.removeChild($("resremain"))
		createAutoResLink()
		msg = aLangTaskOfText[38].bold() + " " + aLangOtherText[3];
		printMSG(msg)
	}
	
	function createTranLimitFlt() {
		var userTranSetup = GM_getValue(herere() + "_userTranSetup", "false");
		usersetup=(userTranSetup=="false")?aLangTaskOfText[14]:userTranSetup;
		var TransLimitForm = document.createElement("form");
		TransLimitForm.id="translimitform"
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"tranlmtform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		TransLimitForm.innerHTML = floatClose;
		TransLimitForm.innerHTML += "<br/>" + aLangTaskOfText[15].big() +aLangTaskOfText[13].big()+"<br/><br/>";
		TransLimitForm.innerHTML += aLangGameText[7] + ":  <select id='crtvillagee'><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/><br/>";
		TransLimitForm.innerHTML += aLangTaskOfText[13]+":  <select id='crtlimit'><option value='" + usersetup + "'>" + usersetup + "</option></select><br/><br/>";
		TransLimitForm.innerHTML += aLangTaskOfText[15] + aLangGameText[6] + ":  <select id='reslimitto'>"+resLimitOption() + "</select>";
		TransLimitForm.innerHTML += "  "+"<select id='croplimitto'>"+cropLimitOption() + "</select><br/><br/>";

		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setTranLmtCookies, true);
		TransLimitForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "tranlmtform_wrapper";
		tWrapper.appendChild(TransLimitForm);
		
		var formCoords = getOption("TRANLMT_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("translimitform"));		
	}
	
	function setTranLmtCookies(){
		var userSet = new Array()
		userSet[0] = $("reslimitto").value;
		userSet[1] = $("croplimitto").value;
		if (userSet[0] == "default" || userSet[1] == "default") {
			GM_deleteValue(herere() + "_userTranSetup")
		}
		else {
			GM_setValue(herere() + "_userTranSetup", userSet.join("/"))
		}
		document.body.removeChild($("tranlmtform_wrapper"));
		$("autoResdiv").parentNode.removeChild($("autoResdiv"));
		$("translimit").parentNode.removeChild($("translimit"));
		$("resremain").parentNode.removeChild($("resremain"));
		createAutoResLink()
		msg = aLangTaskOfText[13].bold() + " " + aLangOtherText[3];
		printMSG(msg)
	}
	
	function resLimitOption(){
		var WareCap = GM_getValue(herere() + "_WarehouseCap");
		WareCap=parseInt(WareCap)
		var string="<option value='"+WareCap*0.8+"'>"+aLangTaskOfText[16]+"</option><option value='default'>"+aLangTaskOfText[14]+"</option>";
		for(i=10; i<101; i=i+10){
			cnm=(WareCap*i/100).toString();
			string += "<option value='" + cnm + "'>" + cnm + "</option>";
		}
		return string;
	}
	
	
	function cropLimitOption(){
		var GranCap = GM_getValue(herere() + "_GranaryCap");
		GranCap=parseInt(GranCap)
		var string="<option value='"+GranCap*0.8+"'>"+aLangTaskOfText[17]+"</option><option value='default'>"+aLangTaskOfText[14]+"</option>"
		for(i=10;i<101;i=i+10){
			rpy=(GranCap*i/100).toString()
			string += "<option value='" + rpy + "'>" + rpy + "</option>"
		}
		return string
	}
	
	/**
	 * Creates a floating GUI box for sheduling attack.
	 */
	function createAttackFloat()
	{
		// Create the form
		var AttackForm = document.createElement("form");
		AttackForm.id = "attackform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"attackform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		AttackForm.innerHTML = floatClose;

		var tag,subTag;
		if (!GM_getValue(myacc() + "_raceID")) { 
			AttackForm.innerHTML += "<br/>" + aLangOtherText[0].big() + "!!!<br/><br/>" + aLangOtherText[8] + "<br/><br/>";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee;
			AttackForm.innerHTML += aLangOtherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br/><br/>";
			AttackForm.innerHTML += aLangOtherText[9] + "<br/><br/>";
		} else
		{
			AttackForm.innerHTML += "<br/>" + aLangTaskOfText[19].big() + "<br/><br/>";
			AttackForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/>";
			AttackForm.innerHTML += aLangAddTaskText[4] + ": &#160;&#160;X:&#160;<input type='text' style='width:40px' id='xcoord' value='" + document.getElementsByName("x")[0].value + "' />&#160;Y:&#160;<input type='text' style='width:40px' id='ycoord' value='" + document.getElementsByName("y")[0].value + "'/><br/>"

			// Create attack type selection field
			var attackTse = null;
			var attacktypes = document.evaluate('//table[@ id="coords"]/descendant::input[@type="radio"]', document, null, XPSnap, null);
			for (var i = 0; i < attacktypes.snapshotLength; i++) {
				if (attacktypes.snapshotItem(i).checked) {
					attackTse = i + 2;
				}
			}
			if ((document.getElementsByName("t8")[0].value != "") && (attackTse == 4)) {
				attackTse = 3;
			}
			AttackForm.innerHTML += aLangTaskOfText[20] + ": ";
			tag = document.createElement("select");
			tag.setAttribute("id", "attacktype");
			for (var i = 0; i < attacktypes.snapshotLength; i++) {
				subTag = document.createElement("option");
				subTag.innerHTML = aLangAttackType[i];
				if (attacktypes.snapshotItem(i).checked)
				{
					subTag.setAttribute("value", attackTse);
					subTag.setAttribute("selected", "selected");
				} else {
					subTag.setAttribute("value", (i+2));
				}
				tag.appendChild(subTag);
			}
			AttackForm.appendChild(tag);
			ra = GM_getValue(myacc() + "_raceID");
			ra = parseInt(ra);
			var mytable = document.createElement("table");
			mytable.id = "mytablee"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][0] + "</td><td><input type='text' id='tt1' style='width:40px' value='" + document.getElementsByName("t1")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][1] + "</td><td><input type='text' id='tt2' style='width:40px' value='" + document.getElementsByName("t2")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][2] + "</td><td><input type='text' id='tt3' style='width:40px' value='" + document.getElementsByName("t3")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][3] + "</td><td><input type='text' id='tt4' style='width:40px' value='" + document.getElementsByName("t4")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][4] + "</td><td><input type='text' id='tt5' style='width:40px' value='" + document.getElementsByName("t5")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][5] + "</td><td><input type='text' id='tt6' style='width:40px' value='" + document.getElementsByName("t6")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][6] + "</td><td><input type='text' id='tt7' style='width:40px' value='" + document.getElementsByName("t7")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][7] + "</td><td><input type='text' id='tt8' style='width:40px' value='" + document.getElementsByName("t8")[0].value + "' ></td></tr>"
			mytable.innerHTML += "<tr><td>" + aLangTroops[ra][8] + "</td><td><input type='text' id='tt9' style='width:40px' value='" + document.getElementsByName("t9")[0].value + "' ></td><td>&#160;&#160;" + aLangTroops[ra][9] + "</td><td><input type='text' id='tt10' style='width:40px' value='" + document.getElementsByName("t10")[0].value + "' /></td></tr>"
			if(document.getElementsByName("t8")[0].value!="" && (attackTse != 2)){
				mytable.innerHTML += "<tr><td colspan='4'><hr/></td>"
				mytable.innerHTML += "<tr><td colspan='2'>" + aLangTaskOfText[25] + ":</td><td colspan='2'>&#160;&#160;" + aLangTaskOfText[25] + ":</td></tr>"
				mytable.innerHTML += "<tr><td colspan='2'><select id='firetarget1'>" + getFireTarget() + "</select></td><td colspan='2'>&#160;&#160;<select id='firetarget2'><option value='0'>"+aLangGameText[16]+"</option>" + getFireTarget() + "</select></td></tr>"
				mytable.innerHTML += "<tr><td colspan='4'><hr/></td>"
			}
			AttackForm.appendChild(mytable);
			
			if (document.getElementsByName("t11").length>0 && document.getElementsByName("t11")[0].value!="") {
				AttackForm.innerHTML += aLangTroops[ra][10] + "&#160;&#160;<select id='hero'><option value='0'>No</option><option value='1' selected='selected'>Yes</option></select><br/>"
			}
			else {
			AttackForm.innerHTML += aLangTroops[ra][10] + "&#160;&#160;<select id='hero'><option value='0'>No</option><option value='1' >Yes</option></select><br/>"
			}
			
			if(document.getElementsByName("x")[0].value!=""&&document.getElementsByName("y")[0].value!=""){
				AttackForm.innerHTML += aLangTaskOfText[21]+":&#160;&#160;<input type='text' id='troopstime' style='width:120px' readOnly= 'true' value='"+getTroopsTime()+"' /><br/>"
			}
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth()+1;
			dat = tod.getDate();
			hou = tod.getHours();
			if(hou<10){hou="0"+hou}
			minu = tod.getMinutes();
			if(minu<10){minu="0"+minu}
			sec = tod.getSeconds();
			if(sec<10){sec="0"+sec}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
			AttackForm.innerHTML += aLangGameText[4]+":&#160;&#160;<input type='text' id='startime' style='width:146px' value='"+nowtime+"' /><br/>"
			
			AttackForm.innerHTML += aLangTaskOfText[22]+":&#160;<input type='text' id='repeat' style='width:30px' value='0' />&#160;&#160;"+aLangTaskOfText[23]+":&#160;<input type='text' id='interval' style='width:60px' value='"+aLangTaskOfText[24]+"' /><br/><br/>"
			
			var tSubmitBtn = document.createElement("input");
			tSubmitBtn.name = "submitBtn";
			tSubmitBtn.value = "OK";
			tSubmitBtn.type = "button";
			tSubmitBtn.addEventListener('click', setAttackCookies, true);
			AttackForm.appendChild(tSubmitBtn);
		}
		var aWrapper = document.createElement("div");
		aWrapper.id = "attackform_wrapper";
		aWrapper.appendChild(AttackForm);
		
		var formCoords = getOption("ATTACK_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		aWrapper.style.top = formCoords[0];
		aWrapper.style.left = formCoords[1];
		
		document.body.appendChild(aWrapper);
		makeDraggable($("attackform"));
		if($("troopstime")){
			$("interval").value=doublee($("troopstime").value)
		}
	}
	
	
	function doublee(t){
		if (t == aLangTaskOfText[27]) {
			return aLangTaskOfText[27];
		}
		hh=Number(t.split(":")[0]);
		mm=Number(t.split(":")[1]);
		ss=Number(t.split(":")[2]);
		all=hh*3600000+mm*60000+ss*1000;
		aTime=all*2+10000;
		hh=Math.floor(aTime/3600000);
		if(hh<10){hh="0"+hh}
		mm=Math.floor((aTime-hh*3600000)/60000);
		if(mm<10){mm="0"+mm}
		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);
		if(ss<10){ss="0"+ss}
		return hh+":"+mm+":"+ss		
	}
	
	function getFireTarget(){
		var thetarget="<option value='99'>"+aLangTaskOfText[26]+"</option>";
		for (i in aLangAllBuildWithId){
			if (i==4){continue;}
			thetarget+="<option value='"+i+"'>"+aLangAllBuildWithId[i]+"</option>";
		}
		return thetarget;
	}
	
	function getTroopsTime(){
		theSlow = 30;
		for (u = 0; u < 10; u++) {
			x = u + 1;
			if (document.getElementsByName("t" + x)[0].value == "") {
				continue;
			}
			theSlow = Math.min(theSlow, parseInt(troopspeed[ra][u]))
		}
		if (document.getElementsByName("t11").length >0 && document.getElementsByName("t11")[0].value!="") {
			herosp = GM_getValue(myacc() + "_heroSpeed", "false")
			if (herosp != "false") {
				theSlow = Math.min(theSlow, parseInt(herosp))
			}
			else {
				printMSG(aLangOtherText[9] + "<br/><br/>")
			}
		}
		if(theSlow==30){
			return aLangTaskOfText[27]
		}
		
		posi1 = getPosFromVill(currentVillageName()); 
		sx1 = getXfromCoord(posi1)
		sy1 = getYfromCoord(posi1)
		sx2 = document.getElementsByName("x")[0].value
		sy2 = document.getElementsByName("y")[0].value

		qDist = getDistance(sx1, sy1, sx2, sy2)
		var aTime = Math.round(qDist * 3600000 / theSlow);
		hh=Math.floor(aTime/3600000);
		if(hh<10){hh="0"+hh}
		mm=Math.floor((aTime-hh*3600000)/60000);
		if(mm<10){mm="0"+mm}
		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);
		if(ss<10){ss="0"+ss}
		return hh+":"+mm+":"+ss
	}
	
	
	function getHeroSpeed(){
		if (h1in().innerHTML.indexOf(aLangAllBuildWithId[37])!=-1){
			var myhero=document.evaluate('//table[@id="distribution"]/descendant::span[@class="info"]', document, null, XPFirst, null);
			var herokind=myhero.singleNodeValue.innerHTML.split("(")[1].split(")")[0]
			
			var ra=GM_getValue(myacc() + "_raceID");
			ra = parseInt(ra);
			for(i in aLangTroops[ra]){
				if (aLangTroops[ra][i]==herokind){
					GM_setValue(myacc() + "_heroSpeed",troopspeed[ra][i])
					break;
				}
			}
		}
	}

	/**
	 * Creates a cookie entry with sheduled attack parameters. Takes values from floating form.
	 */
	function setAttackCookies() { //2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2
		taskkindss = "2";
	//------------------------------------------------		
		cX = $("xcoord").value;
		cY = $("ycoord").value;
		targetPosition = getCoordfromXY(cX,cY);
	//------------------------------------------------		
		attackkind = $("attacktype").value;
	//------------------------------------------------	
		repeat = $("repeat").value;
	//------------------------------------------------	
		var startt=new Date($("startime").value);
		startTime=startt.getTime();
	//------------------------------------------------		
		interv = $("interval").value;
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0]
			mm=interv.split(":")[1]
			ss=interv.split(":")[2]
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000
		} else
		{
			interval=0;
		}
	//------------------------------------------------		2_241654_3_0_1245413194000_50922000_0,0,21,9,0,12,1,40,0,0,0_99_0
		var troopss=new Array()
			troopss[0]=($("tt1").value=="")?"0":$("tt1").value;
			troopss[1]=($("tt2").value=="")?"0":$("tt2").value;
			troopss[2]=($("tt3").value=="")?"0":$("tt3").value;
			troopss[3]=($("tt4").value=="")?"0":$("tt4").value;
			troopss[4]=($("tt5").value=="")?"0":$("tt5").value;
			troopss[5]=($("tt6").value=="")?"0":$("tt6").value;
			troopss[6]=($("tt7").value=="")?"0":$("tt7").value;
			troopss[7]=($("tt8").value=="")?"0":$("tt8").value;
			troopss[8]=($("tt9").value=="")?"0":$("tt9").value;
			troopss[9]=($("tt10").value=="")?"0":$("tt10").value;
			troopss[10]=($("hero").value=="")?"0":$("hero").value;
		troopsoo=troopss.join(",");
	//------------------------------------------------
		kata1=($("firetarget1"))? $("firetarget1").value : "0"
		kata2=($("firetarget2"))? $("firetarget2").value : "0"
	//---------------------------------------------------------------------------------------------------------------
		thisTask = taskkindss + "_" + targetPosition + "_" + attackkind + "_" + repeat + "_" + startTime + "_" + interval + "_" + troopsoo + "_" + kata1 + "_" +kata2;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("attackform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList()
		getTaskCookies()
		msg = aLangTaskOfText[19].bold() + " " + aLangOtherText[3];
		printMSG(msg)
	}
	
	function createAttackBtn() {
		var bposition = document.evaluate('id("btn_ok")', document, null, XPFirst, null);
		AttackBtn = document.createElement("a");
		AttackBtn.id = "attackbtn";
		AttackBtn.href = "#";
		AttackBtn.innerHTML = "&#160;&#160;"+aLangTaskOfText[19]+"&#160;&#160;";
		AttackBtn.addEventListener("click", createAttackFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(AttackBtn);
	}
	
	function createTrainLnk() {
		var bposition = document.evaluate('id("btn_train")', document, null, XPFirst, null);
		if (bposition.singleNodeValue) {
			TrainLnk = document.createElement("a");
			TrainLnk.id = "trainlnk";
			TrainLnk.href = "#";
			TrainLnk.innerHTML = "&#160;&#160;" + aLangTaskOfText[32] + "&#160;&#160;";
			TrainLnk.addEventListener("click", createTrainFloat, false);
			bposition.singleNodeValue.parentNode.appendChild(TrainLnk);
		}
	}
	
	function createTrainFloat(){
		var trainForm = document.createElement("form");
		trainForm.id = "trainform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"trainform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		trainForm.innerHTML = floatClose;
		var buidd=document.getElementsByName("id")[0].value
		var h1inn = h1in().innerHTML.split(" ")
		switch (h1inn.length) {
			case 3:
				bbName = h1inn[0];
				break;
			case 4:
				bbName = h1inn[0] +" "+ h1inn[1]
				break;
		}

		if (!GM_getValue(myacc() + "_raceID")) {
			trainForm.innerHTML += "<br/>" + aLangOtherText[0].big() + "!!!<br/><br/>" + aLangOtherText[8] + "<br/><br/>";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			trainForm.innerHTML += aLangOtherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br/><br/>";
		}
		else {
			ra = GM_getValue(myacc() + "_raceID");
			ra = parseInt(ra);
			trainForm.innerHTML += "<br/>" + aLangTaskOfText[32].big() + "<br/><br/>";
			trainForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/>";
			trainForm.innerHTML += aLangTaskOfText[33]+":<select id='trainid' disabled=true><option value='" + buidd + "'>" + bbName + "</option></select><br/>";
			trainForm.innerHTML += getTraintable()
			
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth() + 1;
			dat = tod.getDate();
			hou = tod.getHours();
			if (hou < 10) {
				hou = "0" + hou
			}
			minu = tod.getMinutes();
			if (minu < 10) {
				minu = "0" + minu
			}
			sec = tod.getSeconds();
			if (sec < 10) {
				sec = "0" + sec
			}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
			trainForm.innerHTML += aLangGameText[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br/>"
			trainForm.innerHTML += aLangTaskOfText[22]+":&#160;<input type='text' id='repeat' style='width:30px' value='0' />&#160;&#160;"+aLangTaskOfText[23] + ":&#160;<input type='text' id='interval' style='width:60px' value='" + aLangTaskOfText[24] + "' /><br/><br/>"
			
			var tSubmitBtn = document.createElement("input");
			tSubmitBtn.name = "submitBtn";
			tSubmitBtn.value = "OK";
			tSubmitBtn.type = "button";
			tSubmitBtn.addEventListener('click', setTrainCookies, true);
			trainForm.appendChild(tSubmitBtn);
		}
		var tWrapper = document.createElement("div");
		tWrapper.id = "trainform_wrapper";
		tWrapper.appendChild(trainForm);
		
		var formCoords = getOption("TRAIN_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("trainform"));
	}
	
	
	function getTraintable(){
		ra = GM_getValue(myacc() + "_raceID");
		ra = parseInt(ra);
		stainstring = "<table id = 'mytablee'><tr><td>"+aLangTaskKind[4]+":</td><td>&#160;</td></tr><tr><td colspan='2'><hr/></td></tr>"
		switch (ra) {
			case 0:
				switch (bbName){
					case aLangAllBuildWithId[19]:
					case aLangAllBuildWithId[29]:
						stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[20]:
					case aLangAllBuildWithId[30]:
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[25]:
					case aLangAllBuildWithId[26]:
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[0][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break;
			case 1:
				switch (bbName){
					case aLangAllBuildWithId[19]:
					case aLangAllBuildWithId[29]:
						stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[20]:
					case aLangAllBuildWithId[30]:
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[25]:
					case aLangAllBuildWithId[26]:
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[1][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break;
			case 2:
				switch (bbName){
					case aLangAllBuildWithId[19]:
					case aLangAllBuildWithId[29]:
						stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][0]+"</td><td><input type='text' id='t1' style='width:40px' value='"+ document.getElementsByName("t1")[0].value+"'</td></tr>";
						if(document.getElementsByName("t2").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][1]+"</td><td><input type='text' id='t2' style='width:40px' value='"+ document.getElementsByName("t2")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[20]:
					case aLangAllBuildWithId[30]:
						if(document.getElementsByName("t3").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][2]+"</td><td><input type='text' id='t3' style='width:40px' value='"+ document.getElementsByName("t3")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t4").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][3]+"</td><td><input type='text' id='t4' style='width:40px' value='"+ document.getElementsByName("t4")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t5").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][4]+"</td><td><input type='text' id='t5' style='width:40px' value='"+ document.getElementsByName("t5")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t6").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][5]+"</td><td><input type='text' id='t6' style='width:40px' value='"+ document.getElementsByName("t6")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[21]:
						if(document.getElementsByName("t7").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][6]+"</td><td><input type='text' id='t7' style='width:40px' value='"+ document.getElementsByName("t7")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t8").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][7]+"</td><td><input type='text' id='t8' style='width:40px' value='"+ document.getElementsByName("t8")[0].value+"'</td></tr>";
						}
						break;
					case aLangAllBuildWithId[25]:
					case aLangAllBuildWithId[26]:
						if(document.getElementsByName("t9").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][8]+"</td><td><input type='text' id='t9' style='width:40px' value='"+ document.getElementsByName("t9")[0].value+"'</td></tr>";
						}
						if(document.getElementsByName("t10").length>0){
							stainstring+="<tr><td style='width:80px'>"+aLangTroops[2][9]+"</td><td><input type='text' id='t10' style='width:40px' value='"+ document.getElementsByName("t10")[0].value+"'</td></tr>";
						}
						break;
				}
				break
		}
		stainstring +="<tr><td colspan='2'><hr/></td></tr></table>"
		return stainstring
	}
	
	
	function setTrainCookies(){
		taskkindss = "4"
	//------------------------------------------------	
		trainid=$("trainid").value
	//------------------------------------------------	
		var trooss=new Array();
		trooss[0]=($("t1"))?$("t1").value:"0";
		trooss[1]=($("t2"))?$("t2").value:"0";
		trooss[2]=($("t3"))?$("t3").value:"0";
		trooss[3]=($("t4"))?$("t4").value:"0";
		trooss[4]=($("t5"))?$("t5").value:"0";
		trooss[5]=($("t6"))?$("t6").value:"0";
		trooss[6]=($("t7"))?$("t7").value:"0";
		trooss[7]=($("t8"))?$("t8").value:"0";
		trooss[8]=($("t9"))?$("t9").value:"0";
		trooss[9]=($("t10"))?$("t10").value:"0";
		troopses=trooss.join(",");
	//------------------------------------------------	
		repeat=$("repeat").value;
	//------------------------------------------------	
		var startt=new Date($("startime").value);
		startTime=startt.getTime();
	//------------------------------------------------		
		interv=$("interval").value
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0];
			mm=interv.split(":")[1];
			ss=interv.split(":")[2];
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000;
		}
		else{
			interval=0;
		}
	//------------------------------------------------	
		TrainBuild=bbName;
	//------------------------------------------------	
		thisTask = taskkindss + "_" + trainid + "_" +repeat+ "_" +startTime+ "_" +interval+ "_" + troopses + "_" + TrainBuild;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
	//------------------------------------------------	
		document.body.removeChild($("trainform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
		msg = aLangTaskOfText[32].bold() + " " + aLangOtherText[3];
		printMSG(msg);
	}
	
	function createAutoTransBtn(){
		var bposition = document.evaluate('id("btn_ok")', document, null, XPFirst, null);
		AutoTransBtn = document.createElement("a");
		AutoTransBtn.id = "autotransbtn";
		AutoTransBtn.href = "#";
		AutoTransBtn.innerHTML = "&#160;&#160;"+aLangTaskOfText[8] +"&#160;&#160;";
		AutoTransBtn.addEventListener("click", createAutoTransFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(AutoTransBtn);
		
		customTransBtn= document.createElement("a");
		customTransBtn.id = "customtransbtn";
		customTransBtn.href = "#";
		customTransBtn.innerHTML = "&#160;&#160;"+aLangTaskOfText[35] +"&#160;&#160;";
		customTransBtn.addEventListener("click", customTransFloat, false);
		bposition.singleNodeValue.parentNode.appendChild(customTransBtn);
	}
	
	function customTransFloat(){
		var customTransForm = document.createElement("form");
		customTransForm.id = "customtransform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"customtransform_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		customTransForm.innerHTML = floatClose;
		
		customTransForm.innerHTML += "<br/>" + aLangTaskOfText[35].big() + "<br/><br/>";
		customTransForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvill' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/>";
		
		
		var targetPosition = getCoordfromXY(document.getElementsByName("x")[0].value, document.getElementsByName("y")[0].value);
		found = "0";
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",");
		for (i in allVillagePos) {
			if (allVillagePos[i].split(":")[1] == targetPosition) {
				customTransForm.innerHTML += aLangAddTaskText[4] + ":  <select id='targetPosition' disabled=true><option value='" + targetPosition + "'>" + allVillagePos[i].split(":")[0] + "</option></select><br/>"
				found = "1";
				break;
			}
		}
		if (found == "0") {
			customTransForm.innerHTML += aLangAddTaskText[4] + ": &#160;&#160;X:&#160;<input type='text' style='width:40px' id='xcoord' value='" + document.getElementsByName("x")[0].value + "' />&#160;Y:&#160;<input type='text' style='width:40px' id='ycoord' value='" + document.getElementsByName("y")[0].value + "' /><br/>";
		}
		var mytable = document.createElement("table");
		mytable.id = "mytablee";
		mytable.innerHTML += "<tr><td style='width:60px'>" + aLangResources[0] + ":</td><td><input type='text' id='rr1' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r1")[0].value + "' ></td></tr>";
		mytable.innerHTML += "<tr><td style='width:60px'>" + aLangResources[1] + ":</td><td><input type='text' id='rr2' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r2")[0].value + "' ></td></tr>";
		mytable.innerHTML += "<tr><td style='width:60px'>" + aLangResources[2] + ":</td><td><input type='text' id='rr3' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r3")[0].value + "' ></td></tr>";
		mytable.innerHTML += "<tr><td style='width:60px'>" + aLangResources[3] + ":</td><td><input type='text' id='rr4' onclick='this.value=\"\"' style='width:60px' value='" + document.getElementsByName("r4")[0].value + "' ></td></tr>";
		
		customTransForm.appendChild(mytable);
		
		tod = new Date();
		ye = tod.getFullYear();
		mon = tod.getMonth() + 1;
		dat = tod.getDate();
		hou = tod.getHours();
		if (hou < 10) { hou = "0" + hou; }
		minu = tod.getMinutes();
		if (minu < 10) { minu = "0" + minu; }
		sec = tod.getSeconds();
		if (sec < 10) { sec = "0" + sec; }
		nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec;
		customTransForm.innerHTML += aLangGameText[4] + ":&#160;&#160;<input type='text' id='startime' style='width:146px' value='" + nowtime + "' /><br/>";
		
		
		if (document.getElementsByName("x")[0].value != "" && document.getElementsByName("y")[0].value != "") {
			aTime = getMerchanTime(currentID(), targetPosition);
			hh = Math.floor(aTime / 3600000);
			if (hh < 10) { hh = "0" + hh; }
			mm = Math.floor((aTime - hh * 3600000) / 60000);
			if (mm < 10) {	mm = "0" + mm;	}
			ss = Math.ceil((aTime - hh * 3600000 - mm * 60000) / 1000);
			if (ss < 10) { ss = "0" + ss; }
			totime=hh + ":" + mm + ":" + ss;
			MerchanTime = doublee(totime);
		}
		else {
			MerchanTime = aLangTaskOfText[24];
		}
		customTransForm.innerHTML += aLangTaskOfText[22] + ":&#160;<input type='text' id='repeat' style='width:30px' value='0' />&#160;&#160;" + aLangTaskOfText[23] + ":&#160;<input type='text'  id='interval' style='width:60px' value='" + MerchanTime + "' /><br/><br/>";
		
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setCustomTranCookies, true);
		customTransForm.appendChild(tSubmitBtn);
		
		var aWrapper = document.createElement("div");
		aWrapper.id = "customtransform_wrapper";
		aWrapper.appendChild(customTransForm);
		
		var formCoords = getOption("CUSTOMTRAN_POSITION", "118px_468px");
		formCoords = formCoords.split("_");
		aWrapper.style.top = formCoords[0];
		aWrapper.style.left = formCoords[1];
		
		document.body.appendChild(aWrapper);
		makeDraggable($("customtransform"));
	}
	
	
	function setCustomTranCookies(){
		targetPosition = ($("targetPosition"))?$("targetPosition").value:getCoordfromXY($("xcoord").value,$("ycoord").value)

		repeat=$("repeat").value

		var startt=new Date($("startime").value)
		startTime=startt.getTime()

		interv=$("interval").value
		if(interv.split(":")[2]!=null){
			hh=interv.split(":")[0];
			mm=interv.split(":")[1];
			ss=interv.split(":")[2];
			interval=Number(hh)*60*60*1000+Number(mm)*60*1000+Number(ss)*1000;
		}
		else{
			interval=0;
		}
	//------------------------------------------------		//8_241654_500,500,500,500_0_1245413194000_interval
		var res=new Array()
			res[0]=($("rr1").value=="")?"0":$("rr1").value;
			res[1]=($("rr2").value=="")?"0":$("rr2").value;
			res[2]=($("rr3").value=="")?"0":$("rr3").value;
			res[3]=($("rr4").value=="")?"0":$("rr4").value;
		resourcessss=res.join(",");
	//---------------------------------------------------------------------------------------------------------------
		thisTask = "8_" + targetPosition + "_" + resourcessss + "_" + repeat + "_" + startTime + "_" + interval;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask;
		GM_setValue(herere() + "_waitTask", allTask);
	//---------------------------------------------------------------------------------------------------------------
		document.body.removeChild($("customtransform_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList();
		getTaskCookies();
		msg = aLangTaskOfText[35].bold() + " " + aLangOtherText[3];
		printMSG(msg);
	}
	
	
	function createAutoTransFloat(){
		var TransForm = document.createElement("form");
		TransForm.id = "transform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"tranForm_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		TransForm.innerHTML = floatClose;
		TransForm.innerHTML += "<br/>" + aLangAddTaskText[0].big() + "<br/><br/>";
		TransForm.innerHTML += aLangAddTaskText[1] + ":  <select id='taskkindss' disabled=true><option value='5'>" + aLangTaskKind[5] + "</option></select><br/><br/>";
		TransForm.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvillagee' disabled=true><option value='" + currentID() + "'>" + currentVillageName() + "</option></select><br/><br/>";
		TransForm.innerHTML += aLangAddTaskText[5] + ":  <select id='tranmodel'><option value='0'>" + aLangAddTaskText[6] + "</option><option value='1'>" + aLangAddTaskText[7] + "</option></select><br/><br/>"
		TransForm.innerHTML += aLangAddTaskText[3] + ":  <select id='villageposition'>" + VillagePosOption() + "</select><br/><br/>";
		
		var tSubmitBtn = document.createElement("input");
		tSubmitBtn.name = "submitBtn";
		tSubmitBtn.id = "submitBtn";
		tSubmitBtn.value = "OK";
		tSubmitBtn.type = "button";
		tSubmitBtn.addEventListener('click', setTranCookies, true);
		TransForm.appendChild(tSubmitBtn);
		
		var tWrapper = document.createElement("div");
		tWrapper.id = "tranForm_wrapper";
		tWrapper.appendChild(TransForm);
		
		var formCoords = getOption("TRAN_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		tWrapper.style.top = formCoords[0];
		tWrapper.style.left = formCoords[1];
		
		document.body.appendChild(tWrapper);
		makeDraggable($("transform"));
	}
	
	function setTranCookies(){
		taskkindss = "5";
		tranmodel = $("tranmodel").value;
		villageposition = $("villageposition").value;
		targetVid = getVillFromPos(villageposition);
		
		thisTask = taskkindss + "_" + tranmodel + "_" + targetVid + "_" + villageposition;
		allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + thisTask : thisTask
		GM_setValue(herere() + "_waitTask", allTask)
		allTarget = (GM_getValue(herere() + "_autoTransTo")) ? GM_getValue(herere() + "_autoTransTo") + "|" + targetVid : targetVid;
		GM_setValue(herere() + "_autoTransTo", allTarget);
		document.body.removeChild($("tranForm_wrapper"));
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"));
		}
		showTaskList();
		getTaskCookies();
		msg = aLangTaskOfText[8].bold() + " " + aLangOtherText[3];
		printMSG(msg);
	}
	
	
	function VillagePosOption(){
		string = "";
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
		for (i = 0; i < allVillagePos.length; i++) {
			if (allVillagePos[i].split(":")[0] == currentVillageName()) {
				continue;
			}
			name = allVillagePos[i].split(":")[0];
			position = allVillagePos[i].split(":")[1];
			string += "<option value='" + position + "'>" + name + "</option>"
		}
		return string
	}
	
	
	function getallVillagePos(){
		if (window.location.href.indexOf("spieler.php?") < 0) {
			allposition = new Array();
			var allX = document.getElementsByClassName("cox");
			var allY = document.getElementsByClassName("coy");
			var allN = document.evaluate('id("vlist")/descendant::a[contains(@href,"newdid")]', document, null, XPSnap, null);
			if (allN.snapshotLength > 0) {
				for (i in allX) {
					xx = (allX[i].innerHTML.split("(")[1]) ? allX[i].innerHTML.split("(")[1] : allX[i].nextSibling.innerHTML
					yy = (allY[i].innerHTML.split(")")[0]) ? allY[i].innerHTML.split(")")[0] : allY[i].previousSibling.innerHTML
					na = allN.snapshotItem(i).innerHTML + ":" + getCoordfromXY(xx, yy)
					gugaga = allposition.push(na)
				}
			}
			else {
				allposition[0] = GM_getValue(myacc() + "_mainvillageName") + ":" + GM_getValue(myacc() + "_mainVillagePosition")
			}
			GM_setValue(myacc() + "_allVillagePos", allposition.join())
		}
	}
	
	
	function getVillFromPos(position){
		allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
		for (i = 0; i < allVillagePos.length; i++) {
			if (allVillagePos[i].split(":")[1] == position) {
				return getDidFromVillage(allVillagePos[i].split(":")[0]);
				break;
			}
		}
	}
	
	function getPosFromVill(vi){
		if (!$("vlist")&&GM_getValue(myacc() + "_mainvillageName")==vi) {
			return GM_getValue(myacc() + "_mainVillagePosition")
		}
		else {
			allVillagePos=GM_getValue(myacc() + "_allVillagePos").split(",")
			for (i = 0; i < allVillagePos.length; i++) {
				if (allVillagePos[i].split(":")[0] == vi) {
					return allVillagePos[i].split(":")[1];
					break;
				}
			}
		}
	}
	
	
	
	function getCoordfromXY(x, y){
		x = parseInt(x);
		y = parseInt(y);
		var coordZ = (x + 401) + ((400 - y) * 801);
		return coordZ;
	}
	
	function getXfromCoord(z){
		z = parseInt(z);
		var x = ((z - 1) % 801) - 400;
		return x;
	}
	
	function getYfromCoord(z){
		z = parseInt(z);
		var y = 400 - (parseInt(((z - 1) / 801)));
		return y;
	}
	
	
	function createAutoResFloat(){
		var nowtaskstring = GM_getValue(herere() + "_waitTask", "false");
		var autoTask = "0_50_100"
		if (GM_getValue(myacc() + "_mainvillageId", "false") == "false") {
			msg0 = aLangOtherText[0].big() + "!!!<br/><br/>" + aLangOtherText[1] + "<br/><br/>";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			msg0 += aLangOtherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br/><br/>";
			printMSG(msg0);
		}
		else {
			var msg1 = aLangGameText[7].bold() + ":&#160;&#160;" + currentVillageName() + "<br/><br/>" + aLangTaskOfText[2].bold() + ":&#160;&#160;" + aLangOtherText[3] + "<br/><br/>" ;
			if (nowtaskstring != "false" && nowtaskstring.indexOf(autoTask) != -1) {
				GM_setValue(herere() + "_autoResource", "1")
				if ($("tasklisttable_wrapper")) {
					document.body.removeChild($("tasklisttable_wrapper"))
				}
				showTaskList()
				$("autoResdiv").parentNode.removeChild($("autoResdiv"))
				$("translimit").parentNode.removeChild($("translimit"))
				$("resremain").parentNode.removeChild($("resremain"))
				createAutoResLink()
				printMSG(msg1);
			}
			else {
				autoResT = autoTask + "_" + "00000000"
				allTask = (GM_getValue(herere() + "_waitTask")) ? GM_getValue(herere() + "_waitTask") + "|" + autoResT : autoResT
				GM_setValue(herere() + "_waitTask", allTask)
				GM_setValue(herere() + "_autoResource", "1")
				if ($("tasklisttable_wrapper")) {
					document.body.removeChild($("tasklisttable_wrapper"))
				}
				showTaskList()
				$("autoResdiv").parentNode.removeChild($("autoResdiv"))
				$("translimit").parentNode.removeChild($("translimit"))
				$("resremain").parentNode.removeChild($("resremain"))
				createAutoResLink()
				printMSG(msg1);
			}
		}
	}
	
	function closeAutoRes(){
		var msg = aLangGameText[7].bold() + ":&#160;&#160;" + currentVillageName() + "<br/><br/>" + aLangTaskOfText[2].bold() + ":&#160;&#160;" + aLangOtherText[4] + "<br/>";
		villaa = currentID();
		Task = new Array();
		Task[0] = "0";
		Task[1] = "50";
		Task[2] = "100";
		Task[3] = "00000000";
		GM_deleteValue(herere() + "_autoResource");
		GM_deleteValue(herere() + "_CorpRemain");
		GM_deleteValue(herere() + "_minLevelId");
		GM_deleteValue(herere() + "_minLevelCropId");
		GM_deleteValue(herere() + "_ResourceUpdataTime");
		deleteTaskFromCookie(villaa, Task)
		if ($("tasklisttable_wrapper")) {
			document.body.removeChild($("tasklisttable_wrapper"))
		}
		showTaskList() 
		printMSG(msg);
	}

	
	function printMSG(msg){
		var printmsg = document.createElement("form");
		printmsg.id = "printmsg";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"MSG_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		printmsg.innerHTML = floatClose;
		printmsg.innerHTML += "<br/>";
		printmsg.innerHTML += msg + "<br/><br/>";
		
		var mWrapper = document.createElement("div");
		mWrapper.id = "MSG_wrapper";
		mWrapper.appendChild(printmsg);
		
		var formCoords = getOption("MSG_POSITION", "300px_500px");
		formCoords = formCoords.split("_");
		mWrapper.style.top = formCoords[0];
		mWrapper.style.left = formCoords[1];
		
		document.body.appendChild(mWrapper);
		makeDraggable($("printmsg"));
	}
	
	
	function createUpdateFloat(eventt){ //this eventt is the "click" on the TaskUrl. it is a event object.
		myUrl = eventt.target; //by this method, define the event object and get the <a> that call this function. 
		crtvillagee = myUrl.getAttribute("crtvillage");//then the Attributes of the <a> are usable.
		buildNamee = myUrl.getAttribute("buildName");
		bnextlevel = parseInt(myUrl.getAttribute("buildnextlevel"));
		bmaxlevel = parseInt(myUrl.getAttribute("buildmaxlevel"));
		buildgid=(myUrl.getAttribute("buildgid"))?myUrl.getAttribute("buildgid"):"";
		bidid = myUrl.getAttribute("buildidid");
		
		var taskKindUp=(buildgid=="")?"0":"1"
		var updataform = document.createElement("form");
		updataform.id = "updataform";
		var floatClose = "<a href='#' onclick='document.body.removeChild($(\"taskForm_wrapper\"));' class='floatClose'><img src='" + sCloseBtn + "' alt='X' /></a>";
		updataform.innerHTML = floatClose;
		if ((bidid < 19) && !GM_getValue(myacc() + "_mainvillageId")) {
			updataform.innerHTML += "<br/>" + aLangOtherText[0].big() + "!!!<br/><br/>" + aLangOtherText[1] + "<br/><br/>";
			var privateee = document.evaluate('id("sleft")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			var privatee = document.evaluate('id("side_navi")/descendant::a[contains(@href,"spieler")]', document, null, XPFirst, null);
			privateeee=(privateee.singleNodeValue)?privateee:privatee
			updataform.innerHTML += aLangOtherText[2] + ":    <a href='" + privateeee.singleNodeValue.href + "'>&#160;&#160;&#160;&#160;&#160;" + privateeee.singleNodeValue.innerHTML + "</a><br/><br/>";
		}
		else {
			updataform.innerHTML += "<br/>" + aLangAddTaskText[0].big() + "<br/><br/>";
			updataform.innerHTML += aLangAddTaskText[1] + ":  <select id='taskkindss' disabled=true><option value='" + taskKindUp + "'>" + aLangTaskKind[taskKindUp] + "</option></select><br/><br/>";
			updataform.innerHTML += aLangAddTaskText[2] + ":  <select id='crtvillagee' disabled=true><option value='" + crtvillagee + "'>" + getvillagefromdid(crtvillagee) + "</option></select><br/><br/>";
			updataform.innerHTML += aLangAddTaskText[3] + ':  <select id="buildNamee" disabled=true><option value=\"' + buildNamee + "\">" + buildNamee + "</option></select><br/><br/>";
			updataform.innerHTML += aLangGameText[2] + ":  <select id='bidid' disabled=true><option value='" + bidid + "'>" + bidid + "</option></select>&#160;&#160;&#160;";
			updataform.innerHTML += aLangAddTaskText[4] + ":  " + levelselect(bnextlevel, bmaxlevel) + "<br/><br/>";
			tod = new Date();
			ye = tod.getFullYear();
			mon = tod.getMonth()+1;
			dat = tod.getDate();
			hou = tod.getHours();
			minu = tod.getMinutes();
			sec = tod.getSeconds();
			if(hou<10){hou="0"+hou}
			if(minu<10){minu="0"+minu}
			if(sec<10){sec="0"+sec}
			nowtime = ye + "/" + mon + "/" + dat + " " + hou + ":" + minu + ":" + sec
			updataform.innerHTML += aLangGameText[4] + ":  <input type='text' id='userSetTime' readOnly= 'true' style='width:130px' value='" + nowtime + "' /><br/>";
			updataform.innerHTML += "(" + aLangGameText[5] + ")<br/><br/>"
			
			
			var oSubmitBtn = document.createElement("input");
			oSubmitBtn.name = "submitBtn";
			oSubmitBtn.id = "submitBtn";
			oSubmitBtn.value = "OK";
			oSubmitBtn.type = "button";
			oSubmitBtn.addEventListener('click', setTaskCookies, true);
			//			oSubmitBtn.addEventListener('click', addToTasklist, true);
			updataform.appendChild(oSubmitBtn);
		}
		var oWrapper = document.createElement("div");
		oWrapper.id = "taskForm_wrapper";
		oWrapper.appendChild(updataform);
		
		var formCoords = getOption("FORM_POSITION", "218px_468px");
		formCoords = formCoords.split("_");
		oWrapper.style.top = formCoords[0];
		oWrapper.style.left = formCoords[1];
		
		document.body.appendChild(oWrapper);
		makeDraggable($("updataform"));
	}
	
	
	function getvillagefromdid(did){
		var getitit = document.evaluate('id("vlist")//a[contains(@href,"' + did + '")]', document, null, XPFirst, null);
		return (getitit.singleNodeValue) ? getitit.singleNodeValue.innerHTML : GM_getValue(myacc() + "_mainvillageName")
	}
	
	
	function getDidFromVillage(vil){
		var getfoots = document.evaluate('id("vlist")/descendant::a[@href]', document, null, XPSnap, null);
		if (getfoots.snapshotLength > 0) {
			for (var i = 0; i < getfoots.snapshotLength; i++) {
				if (getfoots.snapshotItem(i).innerHTML==vil) {
					longstring = getfoots.snapshotItem(i).href.match(/newdid=\d{3,}/);
					break;
				}
			}
			return longstring.toString().match(/\d{3,}/).toString()
		}
		else {
			return GM_getValue(myacc() + '_singleTownNEWDID')
		}
	}
	
	
	function levelselect(min, max){
		var levelsel = '<select id="levelselect" name="levelselect">'
		for (min; min <= max; min++) {
			levelsel += '<option value="' + min + '">'  + ' ' + aLangGameText[0] + ' ' + min + '</option>'
		}
		levelsel += '</select>';
		return levelsel
	}
	
	
	function getTaskCookies(){
		for (e in getAllVillageNewdids()) { //check all villages task cookies
			whatever = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_waitTask", "false");
			if (whatever != "false"&&taskdoing=="1") {
				allTasks = whatever.split("|");
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_");
					
					switch (thisTask[0]) {
					
						case "0":// 0 is update
							var buildTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_BuildingUpdataTime", "false")
							var resourceTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_ResourceUpdataTime", "false")
							var updataTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_UpdataTime", "false")
							if (GM_getValue(myacc() + "_raceID") == "0") { //Romans double build
								if (thisTask[1] < 19) {//resource
									if (resourceTimepoint == "false") {
										calldoing0()
										taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allsourceString, thisTask)
										TS_debug("the taskTime return from startBuildOrSetTime is " + taskTime)
										calldoing1()
									}
								}
								else 
									if (thisTask[1] > 18 && thisTask[1] < 42) { //build in village
										if (buildTimepoint == "false") {
											calldoing0()
											taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allbuildString, thisTask)
											TS_debug("the taskTime return from startBuildOrSetTime is " + taskTime)
											calldoing1()
										}
									}
									else {//if >=42, it is autoResourceModel
										if (resourceTimepoint == "false") {
											calldoing0()
											taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allsourceString, thisTask)
											TS_debug("the taskTime return from startBuildOrSetTime is " + taskTime)
											calldoing1()
										}
									}
							}
							else {// others race single build
								if (updataTimepoint == "false") {
									calldoing0()
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allString, thisTask)
									TS_debug("the taskTime return from startBuildOrSetTime is " + taskTime)
									calldoing1()
								}
							}
							break;
							
							
						case "1"://"1" is new building 
							var buildTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_BuildingUpdataTime", "false")
							var updataTimepoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_UpdataTime", "false")
							if (GM_getValue(myacc() + "_raceID") == "0") { //Romans double build
								if (buildTimepoint == "false") {
									calldoing0()
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allbuildString, thisTask)
									TS_debug("the taskTime return from startBuildOrSetTime is " + taskTime)
									calldoing1()
								}
							}
							else {// others race single build
								if (updataTimepoint == "false") {
									calldoing0()
									taskTime = startBuildOrSetTime(getAllVillageNewdids()[e], allString, thisTask)
									TS_debug("the taskTime return from startBuildOrSetTime is " + taskTime)
									calldoing1()
								}
							}
							break;
							
							
						case "2":
					 		break;
							
							
/*					 case aLangTaskKind[3]:
					 break;*/
					
					
					 	case "4"://4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_兵营
					 		break;
							
							
							
						case "5"://"5" is auto transport  5_model_toid_toposition//5_2_0_241654_500,500,500,500_0_1245413194000_interval
							var hereRemain=GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_userRemainSetup","0/0")
							var hereResource = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_ResourceNow", "false")
							var tarResource = GM_getValue(myacc() + "_" + thisTask[2] + "_ResourceNow", "false")
							var resTraning = GM_getValue(myacc() + "_" + thisTask[2] + "_ResourceTraning", "0/0/0/0")
							var userTranSetup = GM_getValue(myacc() + "_" + thisTask[2] + "_userTranSetup", "false")
							var WareCap = GM_getValue(myacc() + "_" + thisTask[2] + "_WarehouseCap", "false");
							var GranCap = GM_getValue(myacc() + "_" + thisTask[2] + "_GranaryCap", "false");
							var tranTimePoint = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_to_" + thisTask[3] + "_autoTransTime", "false")
							if (tarResource == "false" || WareCap == "false" || GranCap == "false") {
								window.location.replace(myhost + "/dorf2.php?newdid=" + thisTask[2])
							}
							if (hereResource == "false") {
								window.location.replace(myhost + "/dorf2.php?newdid=" + getAllVillageNewdids()[e])
							}
							var WareCap = parseInt(WareCap)
							var GranCap = parseInt(GranCap)
							var resnow = tarResource.split("/");
							resnow[0] = parseInt(resnow[0])
							resnow[1] = parseInt(resnow[1])
							resnow[2] = parseInt(resnow[2])
							resnow[3] = parseInt(resnow[3])
							var restran = resTraning.split("/");
							restran[0] = parseInt(restran[0])
							restran[1] = parseInt(restran[1])
							restran[2] = parseInt(restran[2])
							restran[3] = parseInt(restran[3])
							var reshere = hereResource.split("/");
							reshere[0] = parseInt(reshere[0])
							reshere[1] = parseInt(reshere[1])
							reshere[2] = parseInt(reshere[2])
							reshere[3] = parseInt(reshere[3])
							var hereremainn=hereRemain.split("/")
							hereremainn[0]=parseInt(hereremainn[0])
							hereremainn[1]=parseInt(hereremainn[1])
							if (tranTimePoint == "false") {
								if (userTranSetup == "false") {
									switch (thisTask[1]) {
										case "0"://building surport model.
											if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
												var transtarget1 = WareCap * 0.8
												var transtarget2 = GranCap * 0.8
											}
											else {//15000 and 16000 remain
												var transtarget1 = 15000;
												var transtarget2 = 16000;
											}
											break;
											
										case "1":
											var transtarget1 = WareCap * 0.9
											var transtarget2 = GranCap * 0.9
											break;
									}
								}
								else {
									var transtarget1 = parseInt(userTranSetup.split("/")[0]);
									var transtarget2 = parseInt(userTranSetup.split("/")[1]);
								}
								
								if ((resnow[0] + restran[0] + 200) < transtarget1 && (reshere[0] - hereremainn[0]) > 500 || (resnow[1] + restran[1] + 200) < transtarget1 && (reshere[1] - hereremainn[0]) > 500 || (resnow[2] + restran[2] + 200) < transtarget1 && (reshere[2] - hereremainn[0]) > 500 || (resnow[3] + restran[3] + 200) < transtarget2 && (reshere[3] - hereremainn[1]) > 500) {
									calldoing0()
									trantime = startTransOrSetTime(getAllVillageNewdids()[e], thisTask)
									TS_debug("the autotrantime back from startTransOrSetTime() is " + trantime)
									calldoing1()
								}
							}
						break;
							
					/*	
					 case aLangTaskKind[6]:
					 break;*/
					
					
					 case "7"://"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
					 	var demoTime = GM_getValue(myacc() + "_" + getAllVillageNewdids()[e] + "_demolishTime", "false");
						if(demoTime=="false"){
							calldoing0()
							demotimee=startDemoOrSetTime(getAllVillageNewdids()[e], thisTask)
							TS_debug("the demotime back from startDemoOrSetTime() is " + demotimee)
							calldoing1()
						}
						 break;
					 
					 
					 case "8":
					 	break;
					/* case aLangTaskKind[9]:
					 break;　　*/
					}
				}
			}
		}
	}
	
	function startDemoOrSetTime(vi){
		TS_debug("come into startDemoOrSetTime() at " + getvillagefromdid(vi) )
		var turl= myhost + "/build.php?newdid=" + vi + "&gid=15"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					TS_debug("here is startDemoOrSetTime callback function")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					
					var ddg=new Date();
					if(aDoc.getElementById("demolish")){
						gettime=aDoc.getElementById("demolish").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
						demot = gettime.toString().split(":")
						endt = ddg.getTime() + Number(demot[0]) * 60 * 60 * 1000 + Number(demot[1]) * 60 * 1000 + Number(demot[2]) * 1000+30000;
						ddg.setTime(endt)
						TS_debug("some demolish is doing, next demo start at "+ddg)
						GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
						return endt
					}
					else{
						endt = ddg.getTime() +30000;
						ddg.setTime(endt)
						TS_debug("No demolish is doing, next demo start soon, just at "+ddg)
						GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
						return endt
					}
				}
			}
		}
		return callback()
	}

	
	function startTransOrSetTime(vi, tTask) {
		TS_debug("come into startTransOrSetTime() from " + getvillagefromdid(vi) + " to " + getvillagefromdid(tTask[2]))
		var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					TS_debug("here is startTransOrSetTime callback function")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					
					resource = [aDoc.getElementById("l4").innerHTML.split("/")[0], aDoc.getElementById("l3").innerHTML.split("/")[0], aDoc.getElementById("l2").innerHTML.split("/")[0], aDoc.getElementById("l1").innerHTML.split("/")[0]]
					resstring = resource.join("/")
					GM_setValue(myacc() + "_" + vi + "_ResourceNow", resstring);
					resource[0] = parseInt(resource[0])
					resource[1] = parseInt(resource[1])
					resource[2] = parseInt(resource[2])
					resource[3] = parseInt(resource[3])
					var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0")
					var hereremainn = hereRemain.split("/")
					hereremainn[0] = parseInt(hereremainn[0])
					hereremainn[1] = parseInt(hereremainn[1])
					
					var ma = "0"//this is just a mark,if transing is found ,it is "1", else "0".
					var transing = [0, 0, 0, 0]
					var Transtime = 1500000000000;
					var gugagaa = new Date()
					var reg111 = aLangGameText[10]; //to
					var reg222 = aLangGameText[12]; //back from
					var alltranTo = aDoc.evaluate('//table//a[contains(@href,"php?d=' + tTask[3] + '")]', aElem, null, XPSnap, null);
					if (alltranTo.snapshotLength > 0) {
						for (var z = 0; z < alltranTo.snapshotLength; z++) {
							if (alltranTo.snapshotItem(z).innerHTML.indexOf(reg111) != -1) {
								var ma = "1"
								ress = alltranTo.snapshotItem(z).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
								
								transing[0] += parseInt(ress[0].split(">")[1])
								transing[1] += parseInt(ress[1].split(">")[1])
								transing[2] += parseInt(ress[2].split(">")[1])
								transing[3] += parseInt(ress[3].split(">")[1])
								
								resttt = alltranTo.snapshotItem(z).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								restttttt = resttt.toString().split(":")
								gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
								Transtime = Math.min(Transtime, gobacktime)
							}
						}
						if (ma == "0") {
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
						}
						lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", lastTrantime.toString())
						var oioi = new Date(lastTrantime)
						TS_debug("the traning will arrive at " + oioi)
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", transing.join("/"))
						TS_debug("all resources on transporting are " + transing.join("/"))
					}
					else {
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
					}
					
					var tarResource = GM_getValue(myacc() + "_" + tTask[2] + "_ResourceNow")
					var WareCap = GM_getValue(myacc() + "_" + tTask[2] + "_WarehouseCap");
					var GranCap = GM_getValue(myacc() + "_" + tTask[2] + "_GranaryCap");
					var userTranSetup = GM_getValue(myacc() + "_" + tTask[2] + "_userTranSetup", "false")
					
					var WareCap = parseInt(WareCap)
					var GranCap = parseInt(GranCap)
					var resnow = tarResource.split("/");
					resnow[0] = parseInt(resnow[0])
					resnow[1] = parseInt(resnow[1])
					resnow[2] = parseInt(resnow[2])
					resnow[3] = parseInt(resnow[3])
					
					var comm = [0, 0]
					var pp = getDelayTime.responseText.match(/<b>\d{3,4}<\/b>/)
					comm[1] = pp.toString().match(/\d{3,4}/)
					var qq = aDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', aElem, null, XPFirst, null);
					comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0];
					TS_debug("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1]);
					comm[0] = parseInt(comm[0])
					comm[1] = parseInt(comm[1])
					if (userTranSetup == "false") {
						switch (tTask[1]) {
							case "0"://building surport model.
								if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
									var transtarget1 = WareCap * 0.8
									var transtarget2 = GranCap * 0.8
								}
								else {//15000 and 16000 remain
									var transtarget1 = 15000;
									var transtarget2 = 16000;
								}
								break;
								
							case "1":
								var transtarget1 = WareCap * 0.9
								var transtarget2 = GranCap * 0.9
								break;
						}
					}
					else {//user setup
						var transtarget1 = parseInt(userTranSetup.split("/")[0]);
						var transtarget2 = parseInt(userTranSetup.split("/")[1]);
					}
					
					var ddg = new Date();
					if (((resnow[0] + transing[0] + 200) < transtarget1 && (resource[0] - 500) > hereremainn[0]) || ((resnow[1] + transing[1] + 200) < transtarget1 && (resource[1] - 500) > hereremainn[0]) || ((resnow[2] + transing[2] + 200) < transtarget1 && (resource[2] - 500) > hereremainn[0]) || ((resnow[3] + transing[3] + 200) < transtarget2 && (resource[3] - 500) > hereremainn[1])) {
						if (comm[0] > 0) {
							Tasktime = ddg.getTime() + 10000
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime", Tasktime.toString())
							var d = new Date(Tasktime)
							TS_debug("next transport begin from " + d)
							return Tasktime
						}
						else {
							var waitTimee = 1500000000000;
							var allback = aDoc.evaluate('//table//a[contains(@href,"php?d=")]', aElem, null, XPSnap, null);
							if (allback.snapshotLength > 0) {
								for (var j = 0; j < allback.snapshotLength; j++) {
									if (allback.snapshotItem(j).innerHTML.indexOf(reg111) != -1) {
										ttt = allback.snapshotItem(j).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
										tttar = ttt.toString().split(":")
										gotime = Number(tttar[0]) * 60 * 60 * 1000 + Number(tttar[1]) * 60 * 1000 + Number(tttar[2]) * 1000
										alltimeback = gotime + getMerchanTime(vi, tTask[3])
										waitTimee = Math.min(waitTimee, alltimeback)
										TS_debug("the transout will came back after " + waitTimee)
									}
									else 
										if (allback.snapshotItem(j).innerHTML.indexOf(reg222) != -1) {
											ttt = allback.snapshotItem(j).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
											tttar = ttt.toString().split(":")
											gotime = Number(tttar[0]) * 60 * 60 * 1000 + Number(tttar[1]) * 60 * 1000 + Number(tttar[2]) * 1000
											waitTimee = Math.min(waitTimee, gotime)
											TS_debug("the comebacks will come back after..." + waitTimee)
										}
								}
							}
							Tasktime = ddg.getTime() + waitTimee + 10000;
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime", Tasktime.toString())
							var d = new Date(Tasktime)
							TS_debug("next transport begin from " + d)
							return Tasktime
						}
					}
					else {
						return "1500000000000"
						GM_deleteValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_autoTransTime")
						TS_debug("resource is enough, delete _autoTransTime in startTransOrSetTime")
					}
				}
			}
		}
		return callback()
	}
	
	
	function fleshTraning(vi, tTask){
		TS_debug("come into fleshTraning in " + getvillagefromdid(vi) + "; to " + getvillagefromdid(tTask[2]))
		var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					TS_debug("transporting flesh Require callback here")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					var ma = "0"
					var transing = [0, 0, 0, 0]
					var Transtime = 1500000000000;
					var gugagaa = new Date()
					var reg111 = aLangGameText[10]; // to
					var reg222 = aLangGameText[12]; // back from
					var alltranTo = aDoc.evaluate('//table//a[contains(@href,"php?d=' + tTask[3] + '")]', aElem, null, XPSnap, null);
					
					if (alltranTo.snapshotLength > 0) {
						for (var g = 0; g < alltranTo.snapshotLength; g++) {
							if (alltranTo.snapshotItem(g).innerHTML.indexOf(reg111) != -1) {
								var ma = "1"
								ress = alltranTo.snapshotItem(g).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
								transing[0] += parseInt(ress[0].split(">")[1])
								transing[1] += parseInt(ress[1].split(">")[1])
								transing[2] += parseInt(ress[2].split(">")[1])
								transing[3] += parseInt(ress[3].split(">")[1])
								
								resttt = alltranTo.snapshotItem(g).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								restttttt = resttt.toString().split(":")
								gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
								Transtime = Math.min(Transtime, gobacktime)
							}
						}
						if (ma == "0") {
							TS_debug("some transport on road, but no out just back...")
							GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
							GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", "0/0/0/0")
						}
						lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", lastTrantime.toString())
						var ggr = new Date(lastTrantime)
						TS_debug("next reflesh start at " + ggr)
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", transing.join("/"))
						TS_debug("all resources on transporting are " + transing.join("/"))
						getTargetResource(tTask[2])
						return Transtime
					}
					else {
						TS_debug("No transport at all...")
						GM_setValue(myacc() + "_" + vi + "_to_" + tTask[3] + "_TraningTime", "1500000000000")
						GM_setValue(myacc() + "_" + tTask[2] + "_ResourceTraning", "0/0/0/0")
						getTargetResource(tTask[2])
						return "1500000000000"
					}
				}
			}
		}
		return callback()
	}
	
	function getTargetResource(vi){
		TS_debug("come into getTargetResource at "+getvillagefromdid(vi))
		url = myhost + "/build.php" + "?newdid=" + vi
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: "",
			onload: function(response){
				TS_debug("getTargetResource Require callback here")
				var auDoc = document.implementation.createDocument("", "", null);
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
				auDoc.appendChild(auElem);
				
				resource = [auDoc.getElementById("l4").innerHTML.split("/")[0], auDoc.getElementById("l3").innerHTML.split("/")[0], auDoc.getElementById("l2").innerHTML.split("/")[0], auDoc.getElementById("l1").innerHTML.split("/")[0]]
				resstring = resource.join("/")
				WarehouseCap = auDoc.getElementById("l4").innerHTML.split("/")[1];
				GranaryCap = auDoc.getElementById("l1").innerHTML.split("/")[1];
				GM_setValue(myacc() + "_" + vi + "_WarehouseCap", WarehouseCap);
				GM_setValue(myacc() + "_" + vi + "_GranaryCap", GranaryCap);
				GM_setValue(myacc() + "_" + vi + "_ResourceNow", resstring);
				TS_debug("refleshCOOKIE  in getTargetResource() to " + resstring)
				calldoing1()
			}
		})
	}
	
	function getMerchanTime(vi, positionnum){
		xRace = GM_getValue(myacc() + "_raceID")
		posi1 = getPosFromVill(getvillagefromdid(vi));
		sx1 = getXfromCoord(posi1)
		sy1 = getYfromCoord(posi1)
		sx2 = getXfromCoord(positionnum)
		sy2 = getYfromCoord(positionnum)
		qDist = getDistance(sx1, sy1, sx2, sy2)
		xRace=parseInt(xRace);
		var aTime = Math.round(qDist * 3600000 / mts[xRace]);
		return aTime;
	}
	
	
	function getDistance(sx1, sy1, sx2, sy2){
		var x1 = parseInt(sx1);
		var y1 = parseInt(sy1);
		var x2 = parseInt(sx2);
		var y2 = parseInt(sy2);
		var dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
		var dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		return dist;
	}
	
	
	function startBuildOrSetTime(Villageid, str, task){
		TS_debug("come into startBuildOrSetTime() at "+getvillagefromdid(Villageid))
		var turl = myhost + "/dorf1.php?newdid=" + Villageid
		var getDelayTime = new XMLHttpRequest();
		getDelayTime.open('GET', turl, false);
		getDelayTime.onreadystatechange = callback;
		getDelayTime.send(null);
		function callback(){
			if (getDelayTime.readyState == 4) {
				if (getDelayTime.status == 200) {
					TS_debug("startBuildOrSetTime callback here!");
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getDelayTime.responseText;
					aDoc.appendChild(aElem);
					if (task[0] == "0" && task[1] > 42) {//autoResource date get from here
						var CorpRemain = aDoc.evaluate("id('res')/descendant::td", aElem, null, XPSnap, null);
						hehe = CorpRemain.snapshotLength - 1
						corpcost = CorpRemain.snapshotItem(hehe).innerHTML.split("/")[0]
						corpprod = CorpRemain.snapshotItem(hehe).innerHTML.split("/")[1]
						GM_setValue(myacc() + "_" + Villageid + "_CorpRemain", (corpprod - corpcost))
						
						var mainVI = GM_getValue(myacc() + "_mainvillageId");
						var maxreslevel = (mainVI == Villageid) ? 20 : 10
						var doneID = GM_getValue(myacc() + "_" + Villageid + "_autoResourceDone", "20")
						var allRess = aDoc.evaluate('id("rx")//area[contains(@href,"build.php?id=")]', aElem, null, XPSnap, null);
						var numm = 20;
						var numm2 = 20;
						for (var i = 0; i < allRess.snapshotLength; i++) {//get the min level 
							temppp = allRess.snapshotItem(i).title.split(" ")
							ddq = parseInt(temppp[temppp.length - 1])
							numm = Math.min(numm, ddq);
						}
						sounttt = "0";//this is just a mark....found XXX, change to "1", no found remain "0"
						for (j = 0; j < allRess.snapshotLength; j++) {
							temppp = allRess.snapshotItem(j).title.split(" ")
							if (parseInt(temppp[temppp.length - 1]) == numm && allRess.snapshotItem(j).href.split("id=")[1].toString() != doneID) {
								myid = allRess.snapshotItem(j).href.split("id=")[1];
								GM_setValue(myacc() + "_" + Villageid + "_minLevelId", myid)
								sounttt = "1";
								break;
							}
						}
						if (sounttt == "0") {//the min level is onbuilding one, ok, i search for a higher level one
							if (numm >= maxreslevel - 1) {//all resources updats are finished
								closeAutoRes();
							}
							else {
								for (n = 0; n < allRess.snapshotLength; n++) {
									temppp = allRess.snapshotItem(n).title.split(" ")
									if (parseInt(temppp[temppp.length - 1]) == (numm + 1) && allRess.snapshotItem(n).href.split("id=")[1].toString() != doneID) {
										myid = allRess.snapshotItem(n).href.split("id=")[1];
										GM_setValue(myacc() + "_" + Villageid + "_minLevelId", myid)
										break;
									}
								}
							}
						}
						
						for (k = 0; k < allRess.snapshotLength; k++) {//collect all Crop level ,find the lowest one
							temsps = allRess.snapshotItem(k).title.split(" ")
							switch (temsps.length) {
								case 3:
									resNa = temsps[0]
									break;
								case 4:
									resNa = temsps[0] + " " + temsps[1]
									break;
								case 5:
									resNa = temsps[0] + " " + temsps[1] + " " + temsps[2]
									break;
								case 6:
									resNa = temsps[0] + " " + temsps[1] + " " + temsps[2] + " " + temsps[3]
									break;
							}
							if (resNa == aLangAllResInDorf1[3]) {
								ffq = parseInt(temsps[temsps.length - 1])
								numm2 = Math.min(numm2, ffq);
							}
						}
						mouu = "0"//this is a mark too, to find the minlevel crop
						for (l = 0; l < allRess.snapshotLength; l++) {
							temspp = allRess.snapshotItem(l).title.split(" ")
							switch (temspp.length) {
								case 3:
									resNaa = temspp[0]
									break;
								case 4:
									resNaa = temspp[0] + " " + temspp[1]
									break;
								case 5:
									resNaa = temspp[0] + " " + temspp[1] + " " + temspp[2]
									break;
								case 6:
									resNaa = temspp[0] + " " + temspp[1] + " " + temspp[2] + " " + temspp[3]
									break;
							}
							if (parseInt(temspp[temspp.length - 1]) == numm2 && resNaa == aLangAllResInDorf1[3] && allRess.snapshotItem(l).href.split("id=")[1].toString() != doneID) {
								myids = allRess.snapshotItem(l).href.split("id=")[1];
								GM_setValue(myacc() + "_" + Villageid + "_minLevelCropId", myids)
								mouu = "1";
								break;
							}
						}
						if (mouu == "0") {//the min level is onbuilding one, ok, i search for a higher level one
							if (numm2 < maxreslevel - 1) {
								for (m = 0; m < allRess.snapshotLength; m++) {
									temspsp = allRess.snapshotItem(m).title.split(" ")
									switch (temspsp.length) {
										case 3:
											resNasa = temspsp[0]
											break;
										case 4:
											resNasa = temspsp[0] + " " + temspsp[1]
											break;
										case 5:
											resNasa = temspsp[0] + " " + temspsp[1] + " " + temspsp[2]
											break;
										case 6:
											resNasa = temspsp[0] + " " + temspsp[1] + " " + temspsp[2] + " " + temspsp[3]
											break;
									}
									if (parseInt(temspsp[temspsp.length - 1]) == (numm2 + 1) && resNasa == aLangAllResInDorf1[3] && allRess.snapshotItem(m).href.split("id=")[1].toString() != doneID) {
										myids = allRess.snapshotItem(m).href.split("id=")[1];
										GM_setValue(myacc() + "_" + Villageid + "_minLevelCropId", myids)
										break;
									}
								}
							}
						}
					}//autoResouce data end here
					
					var aValue = aDoc.evaluate('id("building_contract")/descendant::td', aElem, null, XPSnap, null);
					if (aValue.snapshotLength > 0) {
						var testttt = "0"//this is a mark for search result, default is 0 ,if found ,change to 1
						for (var i = 0; i < aValue.snapshotLength; i++) {
							thestring = aValue.snapshotItem(i).innerHTML.split(" (")[0]
							if (thestring!=null &&str.indexOf(thestring) != -1) {//index resource name from the resourcestring
								TS_debug("which in building is " + thestring)
								testttt = "1"
								var tt = aValue.snapshotItem(i).parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
								TS_debug("i get the building time "+tt)
								ttar = tt.toString().split(":")
								arriveTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 +  6000
								ddg = new Date()
								Tasktime = ddg.getTime() + arriveTime

								switch (str) {
									case allsourceString:
										GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
										TS_debug("startBuildOrSetTime(Villageid):resource is building, will return milsec=" + Tasktime.toString())
										var d = new Date(Tasktime)
										TS_debug("next task begin from " + d)
										return Tasktime
										break;
									case allbuildString:
										GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
										TS_debug("startBuildOrSetTime(Villageid):building is building, will return milsec=" + Tasktime.toString())
										var d = new Date(Tasktime)
										TS_debug("next task begin from " + d)
										return Tasktime
										break;
									case allString:
										GM_setValue(myacc() + "_" + Villageid + "_UpdataTime", Tasktime.toString())
										TS_debug("startBuildOrSetTime(Villageid):something is building, will return milsec=" + Tasktime.toString())
										var d = new Date(Tasktime)
										TS_debug("next task begin from " + d)
										return Tasktime
										break;
								}
							}
						}
						if (testttt == "0") {//another kinds of building is building
							TS_debug("oh,another kinds of building is building, i can updata immediately")
							ddg = new Date()
							Tasktime = ddg.getTime() + 6000 //10 seconds later start build.
							switch (str) {
								case allsourceString:
									GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
									TS_debug("startBuildOrSetTime(Villageid):resource will build soon, will return milsec=" + Tasktime.toString())
									return Tasktime
									break;
								case allbuildString:
									GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
									TS_debug("startBuildOrSetTime(Villageid):building will build soon, will return milsec=" + Tasktime.toString())
									return Tasktime
									break;
								case allString: //it is impossible.
									TS_debug("only if allsourceString or allbuildString is wrong, this will be displayed.")
									break;
							}
						}
					}
					else {
						TS_debug("now,i find no build is building")
						ddg = new Date()
						Tasktime = ddg.getTime() + 5000
						switch (str) {
							case allsourceString:
								GM_setValue(myacc() + "_" + Villageid + "_ResourceUpdataTime", Tasktime.toString())
								TS_debug("startBuildOrSetTime(Villageid):resource will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
							case allbuildString:
								GM_setValue(myacc() + "_" + Villageid + "_BuildingUpdataTime", Tasktime.toString())
								TS_debug("startBuildOrSetTime(Villageid):building will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
							case allString:
								GM_setValue(myacc() + "_" + Villageid + "_UpdataTime", Tasktime.toString())
								TS_debug("startBuildOrSetTime(Villageid):something will build soon, will return milsec=" + Tasktime.toString())
								return Tasktime
								break;
						}
					}
				}
			}
		}
		return callback()
	}
	
	
	function startBuildnow(vill, kind){
		TS_debug("come into startBuildnow() at " + getvillagefromdid(vill))
		whatever = GM_getValue(myacc() + "_" + vill + "_waitTask", "false")
		allTasks = whatever.split("|")
		switch (kind) {
			case "0"://Romans Resource
				var t = "0"
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "0" && thisTask[1] < 19) {
						t = "1";
						b = getthebuildUrl(vill, thisTask);
						if (b) {
							buildurl = myhost + "/" + b
							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							TS_debug("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else 
							if (getErrorInfor() == aLangErrorText[8]) {
								GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
								calldoing1()
								window.location.href = myhost + "/dorf1.php"
								break;
							}
							else 
								if (getErrorInfor().indexOf(aLangErrorText[2]) != -1) {
									GM_deleteValue(myacc() + "_" + vill + "_BuildingUpdataTime")
									deleteTaskFromCookie(vill, thisTask)
									calldoing1()
									break;
								}
								else {
									var dtime = new Date();
									delaytime = dtime.getTime() + 1800000;
									dtime.setTime(delaytime);
									GM_setValue(myacc() + "_" + vill + "_ResourceUpdataTime", delaytime.toString())
									TS_debug(getErrorInfor() + ", updata delay 30 minutes")
									calldoing1()
									window.location.href = myhost + "/dorf1.php"
									break;
								}
					}
					else 
						if (thisTask[0] == "0" && thisTask[1] > 42) {//Romans autoResource
							t = "1";
							thisTask[1] = getAutoResourceId(vill);
							b = getthebuildUrl(vill, thisTask);
							if (b) {
								buildurl = myhost + "/" + b
								thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
								TS_debug("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;//greasemonkey.scriptvals.userscripts.org/Travian AutoTask.s7cn_23311_116685_minLevelCropId
							}
							else 
								if (getErrorInfor().indexOf(aLangErrorText[2]) != -1) {
									GM_deleteValue(myacc() + "_" + vill + "_autoResourceDone")
									GM_deleteValue(myacc() + "_" + vill + "_minLevelId")
									GM_deleteValue(myacc() + "_" + vill + "_minLevelCropId")
									GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
									calldoing1()
								}
								else 
									if (getErrorInfor() == aLangErrorText[5]) {
										GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
										calldoing1()
										addtaskbefore(vill, "10", kind);
									}
									else 
										if (getErrorInfor() == aLangErrorText[6]) {
											calldoing1()
											GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
											addtaskbefore(vill, "11", kind);
										}
										else 
											if ((getErrorInfor() == aLangErrorText[0]) || (getErrorInfor().indexOf(aLangErrorText[7]) != -1)) {
												var dtime = new Date();
												delaytime = dtime.getTime() + 1800000;
												dtime.setTime(delaytime);
												GM_setValue(myacc() + "_" + vill + "_ResourceUpdataTime", delaytime.toString())
												TS_debug(getErrorInfor() + ", updata delay 30 minutes")
												calldoing1()
												window.location.href = myhost + "/dorf1.php"
												break;
											}
							break;
						}
				}
				if (t == "0") {
					GM_deleteValue(myacc() + "_" + vill + "_ResourceUpdataTime")
					TS_debug("No resource updata task found, delete ResourceUpdataTime in startBuildnow()")
					calldoing1()
					window.location.href = myhost + "/dorf1.php"
				}
				break;
			case "1"://Romans building
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "0" && thisTask[1] > 18 && thisTask[1] < 42) {
						b = getthebuildUrl(vill, thisTask);
						if (b) {
							buildurl = myhost + "/" + b
							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							TS_debug("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else 
							if (getErrorInfor().indexOf(aLangErrorText[2]) != -1) {
								GM_deleteValue(myacc() + "_" + vill + "_BuildingUpdataTime")
								deleteTaskFromCookie(vill, thisTask)
								calldoing1()
								break;
							}
							else {
								var dtime = new Date();
								delaytime = dtime.getTime() + 1800000;
								dtime.setTime(delaytime);
								GM_setValue(myacc() + "_" + vill + "_BuildingUpdataTime", delaytime.toString())
								TS_debug(getErrorInfor() + ", updata delay 30 minutes")
								calldoing1()
								window.location.href = myhost + "/dorf1.php"
								break;
							}
					}
					else 
						if (thisTask[0] == "1") { // Romans new build
							b = getthebuildUrl(vill, thisTask);
							if (b) {
								buildurl = myhost + "/" + b
								thislevel = 1
								TS_debug("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else 
								if (getErrorInfor() == "newBuild can't run, something is here.") {
									var changeToUP = new Array();
									changeToUP[0] = "0"
									changeToUP[1] = thisTask[1]
									changeToUP[2] = thisTask[2]
									changeToUP[3] = thisTask[4]
									changeToUP[4] = thisTask[5]
									TS_debug("newBuild can't run, something is here. change to upgrade")
									deleteTaskFromCookie(vill, thisTask, changeToUP)
									calldoing1()
									window.location.href = myhost + "/dorf1.php"
									break;
								}
								else {
									var dtime = new Date();
									delaytime = dtime.getTime() + 1800000;
									dtime.setTime(delaytime);
									GM_setValue(myacc() + "_" + vill + "_BuildingUpdataTime", delaytime.toString())
									TS_debug(getErrorInfor() + ", updata delay 30 minutes")
									calldoing1()
									window.location.href = myhost + "/dorf1.php"
									break;
								}
						}
				}
				break;
			case "2"://other race every updata
				var t = "0"
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_");
					if (thisTask[0] == "0" && thisTask[1] < 42) {
						t = "1";
						b = getthebuildUrl(vill, thisTask);
						if (b) {
							buildurl = myhost + "/" + b
							thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
							TS_debug("start Require now")
							HttpRequire(buildurl, vill, thisTask, kind, thislevel)
							break;
						}
						else {
							var dtime = new Date();
							delaytime = dtime.getTime() + 1800000;
							dtime.setTime(delaytime);
							GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString())
							TS_debug(getErrorInfor() + ", updata delay 30 minutes")
							calldoing1()
							window.location.href = myhost + "/dorf1.php"
							break;
						}
					}
					else 
						if (thisTask[0] == "0" && thisTask[1] > 41) {//autoResource
							t = "1";
							thisTask[1] = getAutoResourceId(vill);
							b = getthebuildUrl(vill, thisTask);
							if (b) {
								buildurl = myhost + "/" + b
								thislevel = parseInt(GM_getValue(myacc() + "_" + vill + "_crtBuildlevel")) + 1
								TS_debug("start Require now")
								HttpRequire(buildurl, vill, thisTask, kind, thislevel)
								break;
							}
							else 
								if (getErrorInfor() == aLangErrorText[5]) {
									GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
									calldoing1()
									addtaskbefore(vill, "10", kind);
								}
								else 
									if (getErrorInfor() == aLangErrorText[6]) {
										GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
										calldoing1()
										addtaskbefore(vill, "11", kind);
									}
									else 
										if (getErrorInfor() == aLangErrorText[0] || getErrorInfor().indexOf(aLangErrorText[7]) != -1) {
											var dtime = new Date();
											delaytime = dtime.getTime() + 1800000;
											dtime.setTime(delaytime);
											GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString())
											TS_debug(getErrorInfor() + ", updata delay 30 minutes")
											calldoing1()
											window.location.href = myhost + "/dorf1.php"
											break;
										}
										else {
											GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
											TS_debug("No updata task found, delete UpdataTime in startBuildnow()")
											calldoing1()
											window.location.href = myhost + "/dorf1.php"
											break;
										}
						}
						else 
							if (thisTask[0] == "1") {//new build
								t = "1";
								b = getthebuildUrl(vill, thisTask);
								if (b) {
									buildurl = myhost + "/" + b;
									thislevel = 1;
									TS_debug("start Require now");
									HttpRequire(buildurl, vill, thisTask, kind, thislevel);
									break;
								}
								else 
								if (getErrorInfor() == "newBuild can't run, something is here.") {
									var changeToUP = new Array();
									changeToUP[0] = "0";
									changeToUP[1] = thisTask[1];
									changeToUP[2] = thisTask[2];
									changeToUP[3] = thisTask[4];
									changeToUP[4] = thisTask[5];
									TS_debug("newBuild can't run, something is here. change to upgrade");
									deleteTaskFromCookie(vill, thisTask, changeToUP)
									calldoing1()
									window.location.href = myhost + "/dorf1.php"
									break;
								}
								else {
									var dtime = new Date();
									delaytime = dtime.getTime() + 1800000;
									dtime.setTime(delaytime);
									GM_setValue(myacc() + "_" + vill + "_UpdataTime", delaytime.toString());
									TS_debug(getErrorInfor() + ", updata delay 30 minutes");
									calldoing1();
									window.location.href = myhost + "/dorf1.php";
									break;
								}
							}
				}
				if (t == "0") {
					GM_deleteValue(myacc() + "_" + vill + "_UpdataTime")
					TS_debug("No updata task found, delete UpdataTime in startBuildnow()")
					calldoing1()
					window.location.href = myhost + "/dorf1.php"
				}
				break;
		}
	}
	
	/**
	 * Starts an attack task.
	 */
	function startAttackNow(vi, ATask) { // 2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2
		TS_debug("startAttackNow: begin at " + getvillagefromdid(vi));
		var reqUrl = myhost + "/a2b.php" + "?newdid=" + vi;
		TS_getRequest(reqUrl, startAttackNPrepare, vi, ATask);
	}
	
	/**
	 * Attack task phase function.
	 */
	function startAttackNPrepare(a2b_doc, vi, ATask) { // 2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2
		var reqData;
		if (ATask == undefined)
		{ TS_debug("startAttackNPrepare: Error - parameter definition missing!"); return; }
		formTag = getFormNode(a2b_doc);
		if (formTag == null)
		{ TS_debug("startAttackNPrepare: Error - no form in the answer area"); return; }
		TS_debug("startAttackNPrepare: Callback starting");
		var reqUrl = myhost + "/a2b.php" + "?newdid=" + vi;
		// Other values stored in form
		var timestamp = getFormHidVal(formTag, "timestamp");
		var timestamp_checksum = getFormHidVal(formTag, "timestamp_checksum");
		// For unknown purposes, a mouse position over button is sent with the form
		var s1xPos = Math.floor(46*Math.random())+1;
		var s1yPos = Math.floor(19*Math.random())+1;
		// Target
		var targetPos = new Array();
		targetPos[0] = getXfromCoord(ATask[1]);
		targetPos[1] = getYfromCoord(ATask[1]);
		// Troop amounts
		var troo = ATask[6].split(",");
		var kata = ATask[7];
		var kata2 = ATask[8];
		// Two versions - with katapults and without them
		if (kata > 0) {
			reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum + "&b=" + 1 + "&c=" + ATask[2] + "&kid=" + ATask[1]
			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]
			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]
			 + "&kata=" + kata + "&kata2=" + kata2
			 + "&dname=&x=" + targetPos[0] + "&y=" + targetPos[1] + "&s1.x=" + s1xPos + "&s1.y=" + s1yPos + "&s1=ok&attacks=&cords=";
		}
		else {
			reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum + "&b=" + 1 + "&c=" + ATask[2] + "&kid=" + ATask[1]
			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]
			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]
			 + "&dname=&x=" + targetPos[0] + "&y=" + targetPos[1] + "&s1.x=" + s1xPos + "&s1.y=" + s1yPos + "&s1=ok&attacks=&cords=";
		}
                TS_postRequest(reqUrl,reqData,startAttackNAccept, vi, ATask);
	}

	/**
	 * Attack task phase function.
	 */
	function startAttackNAccept(a2b_doc, vi, ATask) {
		var reqData, formTag;
		if (ATask == undefined)
		{ TS_debug("startAttackNAccept: Error - parameter definition missing!"); return; }
		formTag = getFormNode(a2b_doc);
		if (formTag == null)
		{ TS_debug("startAttackNAccept: Error - no form in the answer area"); return; }
		TS_debug("startAttackNAccept: Callback starting");
		var reqUrl = myhost + "/a2b.php" + "?newdid=" + vi;
		// Other values stored in form
		var timestamp = getFormHidVal(formTag, "timestamp");
		var timestamp_checksum = getFormHidVal(formTag, "timestamp_checksum");
		// For unknown purposes, a mouse position over button is sent with the form
		var s1xPos = Math.floor(46*Math.random())+1;
		var s1yPos = Math.floor(19*Math.random())+1;
		// The other parameters from the previous a2b form
		idVal = getFormHidVal(formTag, "id");
		aVal = getFormHidVal(formTag, "a");
		cVal = getFormHidVal(formTag, "c"); // This value determines attack type
		kidVal = getFormHidVal(formTag, "kid");
		if ((formTag.innerHTML.indexOf("m\x65\x66i\x73\x74o") > 0) && (cVal != 2))
		{ startAttackNFinish(a2b_doc, vi, ATask); return; };
		var troo = ATask[6].split(",");
		kata = ATask[7];
		kata2 = ATask[8];
		if (kata > 0)
		{
			reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum + "&id=" + idVal + "&a=" + aVal + "&c=" + cVal + "&kid=" + kidVal
			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]
			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]
			 + "&kata=" + kata + "&kata2=" + kata2
			 + "&s1.x=" + s1xPos + "&s1.y=" + s1yPos + "&s1=ok&attacks=&cords=";
		} else
		{
			reqData = "timestamp=" + timestamp + "&timestamp_checksum=" + timestamp_checksum + "&id=" + idVal + "&a=" + aVal + "&c=" + cVal + "&kid=" + kidVal
			 + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5]
			 + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9] + "&t11=" + troo[10]
			 + "&s1.x=" + s1xPos + "&s1.y=" + s1yPos + "&s1=ok&attacks=&cords=";
		}
                TS_postRequest(reqUrl, reqData, startAttackNFinish, vi, ATask);
	}
	
	/**
	 * Attack task finalization function.
	 */
	function startAttackNFinish(a2b_doc, vi, ATask) {
		TS_debug("startAttackNFinish: Callback starting");
		if (ATask[3] == "0") {
			deleteTaskFromCookie(vi, ATask);
		} else
		{
			randominter=Math.ceil(Math.random()*300000)
			var newTask = new Array(); // |2_241654_3_0_1248014400000_0_0,0,0,0,0,5,0,0,0,0,0_0_0
			var nowt=new Date();
			newTask[0] = ATask[0];
			newTask[1] = ATask[1];
			newTask[2] = ATask[2];
			temp = Number(ATask[3]) - 1
			newTask[3] = temp.toString();
			if (ATask[5] == "0") {
				temp2 = nowt.getTime() + 24 * 60 * 60 * 1000 + randominter;
			}
			else {
				temp2 = nowt.getTime() + Number(ATask[5]) + randominter;
			}
			newTask[4] = temp2.toString();
			newTask[5] = ATask[5];
			newTask[6] = ATask[6];
			newTask[7] = ATask[7];
			newTask[8] = ATask[8];
			
			deleteTaskFromCookie(vi, ATask,newTask);
		}
		calldoing1();
		printMSG(aLangTaskOfText[31]);
		window.location.replace("dorf1.php?newdid=" + vi);
	}

	function getTrainData(vi, task){
		TS_debug("come into getTrainData(vi,idd), at " + getvillagefromdid(vi))
		var url = myhost + "/build.php?newdid=" + vi + "&id=" + task[1];
		var getbuildurl = new XMLHttpRequest();
		getbuildurl.open('GET', url, false);
		getbuildurl.onreadystatechange = callback;
		getbuildurl.send(null);
		function callback(){
			if (getbuildurl.readyState == 4) {
				if (getbuildurl.status == 200) {
					TS_debug("here is getTrainData() callback function")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getbuildurl.responseText; // 4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_兵营
					aDoc.appendChild(aElem);
					
					troo=task[5].split(",");
					var maxx = aDoc.getElementsByClassName("max");
					var texts= aDoc.getElementsByClassName("text");

					for(i in texts){
						maxNum = maxx[i].innerHTML.split("(")[1].split(")")[0];
						maxNum = Number(maxNum);
						troNum = Number(texts[i].name.split("t")[1])-1;
						troo[troNum]=(troo[troNum]<maxNum)?troo[troNum]:maxNum;
					}
					
					var input = aDoc.getElementsByTagName("input");
					for (var m = 0; m < input.length; m++) {
						if (input[m].getAttribute("name") == "z") {
							z = input[m].getAttribute("value");
							break;
						}
					}
					trainstring = "id="+task[1]+"&z="+z+"&a=2" + "&t1=" + troo[0] + "&t2=" + troo[1] + "&t3=" + troo[2] + "&t4=" + troo[3] + "&t5=" + troo[4] + "&t6=" + troo[5] + "&t7=" + troo[6] + "&t8=" + troo[7] + "&t9=" + troo[8] + "&t10=" + troo[9];
					return trainstring;
				}
			}
		}
		return callback()
	}
	
	function startTrainNow(vi,tTask) { // 4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_兵营
		TS_debug("come into startTrainNow(), at " + getvillagefromdid(vi))
		url = myhost + "/build.php" + "?newdid=" + vi
		daa =getTrainData(vi,tTask)
		dataa = encodeURI(daa)
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				TS_debug("startTrainNow(vi,tTask) Require callback here")
				if (tTask[2] == "0") {
					deleteTaskFromCookie(vi, tTask)
				}
				else {
					var newTask = new Array();//4_25_10_1250261897000_600000_0,0,10,0,0,0,0,0,0,0_兵营
					var nowt=new Date();
					newTask[0] = tTask[0];
					newTask[1] = tTask[1];
					temp = Number(tTask[2]) - 1
					newTask[2] = temp.toString();
					if (tTask[4] == "0") {
						temp2 = nowt.getTime() + 3 * 60 * 60 * 1000
					}
					else {
						temp2 = nowt.getTime() + Number(tTask[4])
					}
					newTask[3] = temp2.toString();
					newTask[4] = tTask[4];
					newTask[5] = tTask[5];
					newTask[6] = tTask[6];
					
					deleteTaskFromCookie(vi, tTask,newTask)
				}
				calldoing1()
				printMSG(aLangTaskOfText[34])
				window.location.replace("dorf1.php?newdid=" + vi)
			}
		})
	}

function startCustomTranNow(vi, task){//8_241654_500,500,500,500_0_1245413194000_interval
	TS_debug("come into startCustomTranNow() at " + getvillagefromdid(vi))
	var turl = myhost + "/build.php?newdid=" + vi + "&gid=17"
	GM_xmlhttpRequest({
		method: 'GET',
		url: turl,
		headers: "",
		onload: function(responseDetails){
			TS_debug("here is startCustomTranNow callback function")
			var ssDoc = document.implementation.createDocument("", "", null);
			var ssElem = document.createElement('DIV');
			ssElem.innerHTML = responseDetails.responseText;
			ssDoc.appendChild(ssElem);
			
			resource = [ssDoc.getElementById("l4").innerHTML.split("/")[0], ssDoc.getElementById("l3").innerHTML.split("/")[0], ssDoc.getElementById("l2").innerHTML.split("/")[0], ssDoc.getElementById("l1").innerHTML.split("/")[0]]
			resource[0] = parseInt(resource[0])
			resource[1] = parseInt(resource[1])
			resource[2] = parseInt(resource[2])
			resource[3] = parseInt(resource[3])
			
			var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0")
			var hereremainn = hereRemain.split("/")
			hereremainn[0] = parseInt(hereremainn[0])
			hereremainn[1] = parseInt(hereremainn[1])
			
			var ids = ssDoc.evaluate('//div[@id="textmenu"]/a', ssElem, null, XPFirst, null);
			theid = ids.singleNodeValue.href.split("id=")[1]
			var ddg = new Date();
			comm = ["", ""]
			var pp = ssDoc.evaluate('//table[@id="send_select"]/descendant::td[@class="max"]/a', ssElem, null, XPFirst, null);
			comm[1] = pp.singleNodeValue.innerHTML.match(/\d{3,4}/)
			var qq = ssDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', ssElem, null, XPFirst, null);
			comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
			TS_debug("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
			comm[0] = parseInt(comm[0])
			comm[1] = parseInt(comm[1])
			
			if ((resource[0] - hereremainn[0]) > 500 || (resource[1] - hereremainn[0]) > 500 || (resource[2] - hereremainn[0]) > 500 || (resource[3] - hereremainn[1]) > 500) {
				if (comm[0] > 0) {
					balance = task[2].split(",")
					balance[0] = Number(balance[0])
					balance[1] = Number(balance[1])
					balance[2] = Number(balance[2])
					balance[3] = Number(balance[3])
					baalaa = getTranAmount(balance, resource, hereremainn)
					autoTranRequire(task, baalaa, vi, theid)
				}
				else {
					if (task[3] == "0") {
						calldoing1()
						deleteTaskFromCookie(vi, task)
						TS_debug("No merchant now, deleted the autoTransTime in startTrannow()")
					}
					else {
						var newTask = new Array();
						newTask[0] = task[0];
						newTask[1] = task[1];
						newTask[2] = task[2];
						temp = Number(task[3]) - 1
						newTask[3] = temp.toString();
						if (task[5] == "0") {
							temp2 = ddg.getTime() + 6 * 60 * 60 * 1000
						}
						else {
							temp2 = ddg.getTime() + Number(task[5])
						}
						newTask[4] = temp2.toString();
						newTask[5] = task[5];
						
						calldoing1()
						deleteTaskFromCookie(vi, task, newTask)
						TS_debug("No merchant now, delay Transport")
					}
					window.location.href = myhost + "/dorf1.php"
				}
			}
			else {
				var newTask = new Array();
				newTask[0] = task[0];
				newTask[1] = task[1];
				newTask[2] = task[2];
				temp = Number(task[3]) - 1
				newTask[3] = temp.toString();
				if (task[5] == "0") {
					temp2 = ddg.getTime() + 6 * 60 * 60 * 1000;
				}
				else {
					temp2 = ddg.getTime() + Number(task[5]);
				}
				newTask[4] = temp2.toString();
				newTask[5] = task[5];
				
				calldoing1();
				deleteTaskFromCookie(vi, task, newTask);
				TS_debug("No enough resource, delay Transport");
			}
		}
	});
}

function startImproNow(vi, Task) { // 3_2_27_古罗马步兵_1_11_1251616724168
	TS_debug("come into startImproNow() at "+getvillagefromdid(vi))
	var improveurl=getImproveUrl(vi,Task);
	if (improveurl&&Number(improveurl)<Number(Task[5])){
		url = myhost + "/build.php" + "?newdid=" + vi+"&id="+Task[2]+"&a="+Task[4]
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: "",
			onload: function(responseDetails){
				TS_debug("here is startImproNow callback function")
				var ssDoc = document.implementation.createDocument("", "", null);
				var ssElem = document.createElement('DIV');
				ssElem.innerHTML = responseDetails.responseText;
				ssDoc.appendChild(ssElem);	

				finiTime=ssDoc.getElementsByClassName("dur")[0].innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
					ttar = finiTime.toString().split(":")
					finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 +  180000
					ddg = new Date()
					Tasktime = ddg.getTime() + finTime

						var newTask = new Array()//3_2_27_帝国骑士_5_14_1251299622897
						newTask[0] = Task[0];
						newTask[1] = Task[1];
						newTask[2] = Task[2];
						newTask[3] = Task[3];
						newTask[4] = Task[4];
						newTask[5] = Task[5];
						newTask[6] = Tasktime.toString();
						TS_debug("Improve now ok!");
						deleteTaskFromCookie(vi, Task, newTask)
	
				calldoing1()
				printMSG(aLangTaskOfText[48]+aLangTaskOfText[5])
				window.location.replace("build.php?newdid=" + vi+"&id="+Task[2])
			}
		})		
	}
	else if(improveurl&&improveurl==Task[5]){
		deleteTaskFromCookie(vi, Task)
		calldoing1()
	}
	else{
		calldoing1()
	}
}


function getImproveUrl(vi,Task){//3_2_27_古罗马步兵_1_11_1251616724168
	TS_debug("come into getImproveUrl() at " + getvillagefromdid(vi))
	switch (Task[1]) {
		case "1":
			var url = myhost + "/build.php?newdid=" + vi + "&gid=12";
			break;
		case "2":
			var url = myhost + "/build.php?newdid=" + vi + "&gid=13";
			break;
	}

	var getbuildurl = new XMLHttpRequest();
	getbuildurl.open('GET', url, false);
	getbuildurl.onreadystatechange = callback;
	getbuildurl.send(null);
	function callback(){
		if (getbuildurl.readyState == 4) {
			if (getbuildurl.status == 200) {
				TS_debug("here is getImproveUrl callback function")
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = getbuildurl.responseText;
				aDoc.appendChild(aElem);
				
				var gettroops = aDoc.evaluate('//td[@class="desc"]', aElem, null, XPSnap, null);
				var myRace1 = Number(GM_getValue(myacc() + "_raceID"));
				TS_debug("myacc="+myRace1)
				for (var i = 0; i < gettroops.snapshotLength; i++) {
					var troopname = gettroops.snapshotItem(i).firstChild.nextSibling.innerHTML
					var trooplevel = gettroops.snapshotItem(i).firstChild.nextSibling.nextSibling.nextSibling.innerHTML.split(" ")[1].split(")")[0]
					if (troopname == Task[3]) {
						theposs = gettroops.snapshotItem(i).nextSibling.nextSibling.firstChild
						if (theposs.href) {
							return trooplevel
						}
						else {
							var ddg=new Date()
							var improveError = theposs.innerHTML
							if (improveError == aLangErrorText[4]) {
								TS_debug("at " + getvillagefromdid(vi) + "; " + aLangErrorText[4] + ", improve delay to endTime")
								finiTime = aDoc.getElementById("timer1").innerHTML
								ttar = finiTime.split(":")
								finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 + 180000
								Tasktime = ddg.getTime() + finTime
							}
							else{
								TS_debug("at " + getvillagefromdid(vi) + ", some error here , improve delay 3 hours")
								Tasktime = ddg.getTime() + 3 * 60 * 60 * 1000
							}
							var newTask = new Array();
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
							newTask[3] = Task[3];
							newTask[4] = Task[4];
							newTask[5] = Task[5];
							newTask[6] = Tasktime.toString();
							TS_debug("Improve geturl ok!");
							deleteTaskFromCookie(vi, Task, newTask);
							return false;
						}
						break;
					}
				}
			}
		}
	}
	return callback();
}

function startPartyNow(vi, Task) { // 6_1_1000_1245413194000_id
	TS_debug("come into startPartyNow() at "+getvillagefromdid(vi))
	var partyurl=getPartyUrl(vi,Task);
	if (partyurl){
		url = myhost + "/build.php" + "?newdid=" + vi+"&id="+Task[4]+"&a="+Task[1]
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: "",
			onload: function(responseDetails){
				TS_debug("here is startPartyNow callback function")
				var ssDoc = document.implementation.createDocument("", "", null);
				var ssElem = document.createElement('DIV');
				ssElem.innerHTML = responseDetails.responseText;
				ssDoc.appendChild(ssElem);	

				finiTime=ssDoc.getElementsByClassName("dur")[0].innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
					ttar = finiTime.toString().split(":")
					finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 +  180000
					ddg = new Date()
					Tasktime = ddg.getTime() + finTime
				
					if (Task[2] == "0") {
						deleteTaskFromCookie(vi, Task)
					}
					else {
						var newTask = new Array(); // 6_1_1000_1245413194000_id
						newTask[0] = Task[0];
						newTask[1] = Task[1];
						temp = Number(Task[2]) - 1
						newTask[2] = temp.toString();
						newTask[3] = Tasktime.toString();
						newTask[4] = Task[4];
						TS_debug("Party hold ok!");
						deleteTaskFromCookie(vi, Task, newTask)
					}
				calldoing1()
				printMSG(aLangTaskOfText[39]+aLangTaskOfText[5])
				window.location.replace("build.php?newdid=" + vi+"&id="+Task[4])
			}
		})		
	}
}


function getPartyUrl(vi, Task) { // 6_1_1000_1245413194000_id
	TS_debug("come into getPartyUrl() at " + getvillagefromdid(vi))
	var url = myhost + "/build.php?newdid=" + vi + "&gid=24";
	var getbuildurl = new XMLHttpRequest();
	getbuildurl.open('GET', url, false);
	getbuildurl.onreadystatechange = callback;
	getbuildurl.send(null);
	function callback(){
		if (getbuildurl.readyState == 4) {
			if (getbuildurl.status == 200) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = getbuildurl.responseText;
				aDoc.appendChild(aElem);
				
				theinner = aDoc.getElementsByClassName("act")
				var ddg=new Date()
				switch (Task[1]) {
					case "1":
						if (theinner[0].firstChild.href) {
							TS_debug("i get the smallParty url ,it is " + theinner[0].firstChild.href)
							return theinner[0].firstChild.href
						}
						else {
							partyError = theinner[0].firstChild.innerHTML
							switch (partyError) {
								case aLangErrorText[9]:
									TS_debug("at "+ getvillagefromdid(vi) + "; "+aLangErrorText[9]+", smallparty delay to endTime")
									finiTime = aDoc.getElementById("timer1").innerHTML
									ttar = finiTime.split(":")
									finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 + 180000
									Tasktime = ddg.getTime() + finTime
									break;
								case aLangErrorText[0]:
									TS_debug("at "+ getvillagefromdid(vi) + "; "+aLangErrorText[0]+", smallparty delay 3 hours")
									Tasktime = ddg.getTime() + 3 * 60 * 60 * 1000
									break;
							}
							var newTask = new Array(); // 6_1_1000_1245413194000_id
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
							newTask[3] = Tasktime.toString();
							newTask[4] = Task[4];
							
							deleteTaskFromCookie(vi, Task, newTask)
							calldoing1()
							return false
						}
						break;
					case "2":
						if (theinner[1].firstChild.href) {
							TS_debug("i get the bigParty url ,it is " + theinner[1].firstChild.href)
							return theinner[1].firstChild.href
						}
						else {
							partyError = theinner[1].firstChild.innerHTML
							switch (partyError) {
								case aLangErrorText[9]:
									TS_debug("at "+ getvillagefromdid(vi) + "; "+aLangErrorText[9]+", bigparty delay to endTime");
									finiTime = aDoc.getElementById("timer1").innerHTML;
									ttar = finiTime.split(":");
									finTime = Number(ttar[0]) * 60 * 60 * 1000 + Number(ttar[1]) * 60 * 1000 + Number(ttar[2]) * 1000 + 180000;
									Tasktime = ddg.getTime() + finTime;
									break;
								case aLangErrorText[0]:
									TS_debug("at "+ getvillagefromdid(vi) + "; "+aLangErrorText[0]+", bigparty delay 3 hours")
									Tasktime = ddg.getTime() + 3 * 60 * 60 * 1000
									break;
							}
							var newTask = new Array(); // 6_1_1000_1245413194000_id
							newTask[0] = Task[0];
							newTask[1] = Task[1];
							newTask[2] = Task[2];
							newTask[3] = Tasktime.toString();
							newTask[4] = Task[4];
							
							deleteTaskFromCookie(vi, Task, newTask)
							calldoing1()
							return false
						}
						break;
				}
			}
		}
	}
	return callback()
}
	
	
function startTrannow(vi, tranTask) { // 8_241654_500,500,500,500_0_1245413194000_interval
	TS_debug("come into startTrannow() at " + getvillagefromdid(vi));
	var turl = myhost + "/build.php?newdid=" + vi + "&gid=17";
	var tarResource = GM_getValue(myacc() + "_" + tranTask[2] + "_ResourceNow", "false");
	var WareCap = GM_getValue(myacc() + "_" + tranTask[2] + "_WarehouseCap", "false");
	var GranCap = GM_getValue(myacc() + "_" + tranTask[2] + "_GranaryCap", "false");
	var userTranSetup = GM_getValue(myacc() + "_" + tranTask[2] + "_userTranSetup", "false");
	var WareCap = parseInt(WareCap);
	var GranCap = parseInt(GranCap);
	var resnow = tarResource.split("/");
	resnow[0] = parseInt(resnow[0]);
	resnow[1] = parseInt(resnow[1]);
	resnow[2] = parseInt(resnow[2]);
	resnow[3] = parseInt(resnow[3]);
	var hereRemain = GM_getValue(myacc() + "_" + vi + "_userRemainSetup", "0/0");
	var hereremainn = hereRemain.split("/");
	hereremainn[0] = parseInt(hereremainn[0]);
	hereremainn[1] = parseInt(hereremainn[1]);
	GM_xmlhttpRequest({
		method: 'GET',
		url: turl,
		headers: "",
		onload: function(responseDetails){
			TS_debug("here is startTrannow callback function")
			var ssDoc = document.implementation.createDocument("", "", null);
			var ssElem = document.createElement('DIV');
			ssElem.innerHTML = responseDetails.responseText;
			ssDoc.appendChild(ssElem);
			
			resource = [ssDoc.getElementById("l4").innerHTML.split("/")[0], ssDoc.getElementById("l3").innerHTML.split("/")[0], ssDoc.getElementById("l2").innerHTML.split("/")[0], ssDoc.getElementById("l1").innerHTML.split("/")[0]]
			TS_debug("resource=" + resource)
			
			var transing = [0, 0, 0, 0]
			var reg111 = aLangGameText[10]; // to
			var reg222 = aLangGameText[12]; // back from
			var alltranTo = ssDoc.evaluate('//table//a[contains(@href,"php?d=' + tranTask[3] + '")]', ssElem, null, XPSnap, null);
			if (alltranTo.snapshotLength > 0) {
				for (var i = 0; i < alltranTo.snapshotLength; i++) {
					if (alltranTo.snapshotItem(i).innerHTML.indexOf(reg111) != -1) {
						ress = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
						transing[0] += parseInt(ress[0].split(">")[1])
						transing[1] += parseInt(ress[1].split(">")[1])
						transing[2] += parseInt(ress[2].split(">")[1])
						transing[3] += parseInt(ress[3].split(">")[1])
						TS_debug("in startTrannow(vi,tranTask), transing=" + transing)
					}
				}
			}
			
			var ids = ssDoc.evaluate('//div[@id="textmenu"]/a', ssElem, null, XPFirst, null);
			theid = ids.singleNodeValue.href.split("id=")[1]
			var ddg = new Date();
			comm = ["", ""]
			var pp = ssDoc.evaluate('//table[@id="send_select"]/descendant::td[@class="max"]/a', ssElem, null, XPFirst, null);
			comm[1] = pp.singleNodeValue.innerHTML.match(/\d{3,4}/)
			var qq = ssDoc.evaluate('//table[@id="target_select"]/descendant::td[@class="mer"]', ssElem, null, XPFirst, null);
			comm[0] = qq.singleNodeValue.innerHTML.split(" ")[1].split("/")[0]
			TS_debug("now Merchants at home is " + comm[0] + ", and each Merchants can load " + comm[1])
			comm[0] = parseInt(comm[0])
			comm[1] = parseInt(comm[1])
			
			if (userTranSetup == "false") {
				switch (tranTask[1]) {
					case "0"://building surport model.
						if (WareCap < 18000 || GranCap < 18000) {//  80%warehouse remain
							var transtarget1 = WareCap * 0.8
							var transtarget2 = GranCap * 0.8
						}
						else {//15000 and 16000 remain
							var transtarget1 = 15000;
							var transtarget2 = 16000;
						}
						break;
						
					case "1":
						var transtarget1 = WareCap * 0.9
						var transtarget2 = GranCap * 0.9
						break;
				}
			}
			else {//user setup
				var transtarget1 = parseInt(userTranSetup.split("/")[0]);
				var transtarget2 = parseInt(userTranSetup.split("/")[1]);
			}
			if (((resnow[0] + transing[0] + 200) < transtarget1 && (resource[0] - 500) > hereremainn[0]) || ((resnow[1] + transing[1] + 200) < transtarget1 && (resource[1] - 500) > hereremainn[0]) || ((resnow[2] + transing[2] + 200) < transtarget1 && (resource[2] - 500) > hereremainn[0]) || ((resnow[3] + transing[3] + 200) < transtarget2 && (resource[3] - 500) > hereremainn[1])) {
				if (comm[0] > 0) {
					balance = [0, 0, 0, 0]
					balance[0] = ((transtarget1 - (resnow[0] + transing[0])) > 0) ? (transtarget1 - (resnow[0] + transing[0])) : 0
					balance[1] = ((transtarget1 - (resnow[1] + transing[1])) > 0) ? (transtarget1 - (resnow[1] + transing[1])) : 0
					balance[2] = ((transtarget1 - (resnow[2] + transing[2])) > 0) ? (transtarget1 - (resnow[2] + transing[2])) : 0
					balance[3] = ((transtarget2 - (resnow[3] + transing[3])) > 0) ? (transtarget2 - (resnow[3] + transing[3])) : 0
					
					baalaa = getTranAmount(balance, resource, hereremainn)
					autoTranRequire(tranTask, baalaa, vi, theid)
				}
				else {
					calldoing1()
					GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
					TS_debug("No merchant now, deleted the autoTransTime in startTrannow()")
					window.location.href = myhost + "/dorf1.php"
				}
			}
			else {
				calldoing1()
				GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
				TS_debug("resource is enough, deleted the autoTransTime in startTrannow()")
				window.location.href = myhost + "/dorf1.php"
			}
		}
	});
}

	
	function startDemonow(vi, demotask){//"7_" + theID +"_" + crtlevel + "_" + currentID() + "_" + theBuild;
		TS_debug("come into startDemonow at "+getvillagefromdid(vi) +", to demolish "+demotask[4]);
		var turl = myhost + "/build.php?newdid=" + vi;
		demodate = "&gid=15&a=" + vi + "&abriss=" + demotask[1];
		dataa = encodeURI(demodate);
		GM_xmlhttpRequest({
			method: 'POST',
			url: turl,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				TS_debug("startDemonow Require callback here")
				var auDoc = document.implementation.createDocument("", "", null);
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
				auDoc.appendChild(auElem);
				
				var newdemoTask = new Array();
				if (parseInt(demotask[2]) > 1) {
					newdemoTask[0] = demotask[0]
					newdemoTask[1] = demotask[1]
					newdemoTask[2] = (parseInt(demotask[2])-1).toString()
					newdemoTask[3] = demotask[3]
					newdemoTask[4] = demotask[4]
					deleteTaskFromCookie(vi, demotask, newdemoTask)
					
					var ddg = new Date();
					gettime = auDoc.getElementById("demolish").innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
					demot = gettime.toString().split(":")
					endt = ddg.getTime() + Number(demot[0]) * 60 * 60 * 1000 + Number(demot[1]) * 60 * 1000 + Number(demot[2]) * 1000 + 30000;
					ddg.setTime(endt)
					TS_debug("some demolish is doing, next demo start at " + ddg)
					GM_setValue(myacc() + "_" + vi + "_demolishTime", endt.toString());
				}
				else {
					GM_deleteValue(myacc() + "_" + vi + "_demolishTime");
					deleteTaskFromCookie(vi, demotask)
				}
				calldoing1()
				printMSG(aLangTaskKind[7]+" "+demotask[4]+" "+ aLangOtherText[7]+"!");
				window.location.href=myhost + "/dorf1.php"
			},
		})
	}
	
	
	function getWholeNumber(resArray){
		for(xx in resArray){
			resArray[xx]=Math.floor(resArray[xx]/100)*100;
		}
		return resArray;
	}
	
	function getTranAmount(bala,resource,hereremainn){
		TS_debug("come into getTranAmount(),bala=" + bala);
		resource[0] = (parseInt(resource[0])>hereremainn[0])?(parseInt(resource[0])-hereremainn[0]):0;
		resource[1] = (parseInt(resource[1])>hereremainn[0])?(parseInt(resource[1])-hereremainn[0]):0;
		resource[2] = (parseInt(resource[2])>hereremainn[0])?(parseInt(resource[2])-hereremainn[0]):0;
		resource[3] = (parseInt(resource[3])>hereremainn[1])?(parseInt(resource[3])-hereremainn[1]):0;
		bala[0] = (resource[0] >= bala[0]) ? bala[0] : resource[0];
		bala[1] = (resource[1] >= bala[1]) ? bala[1] : resource[1];
		bala[2] = (resource[2] >= bala[2]) ? bala[2] : resource[2];
		bala[3] = (resource[3] >= bala[3]) ? bala[3] : resource[3];
		all = bala[0] + bala[1] + bala[2] + bala[3];
		if (all < comm[0] * comm[1]) {
			return getWholeNumber(bala);
		}
		else {
			balaa = [0, 0, 0, 0];
			maxer = Math.max(bala[0], bala[1], bala[2], bala[3]); // 1st maxer
			if (maxer >= comm[0] * comm[1]) {
				for (i = 0; i < 4; i++) {
					if (bala[i] == maxer) {
						balaa[i] = comm[0] * comm[1];
						break;
					}
				}
				return getWholeNumber(balaa);
			}
			else {
				for (d = 0; d < 4; d++) {
					if (bala[d] == maxer) {
						balaa[d] = bala[d];
						bala[d] = 0;
						remain = comm[0] * comm[1] - balaa[d];
						break;
					}
				}
				maxer = Math.max(bala[0], bala[1], bala[2], bala[3]); // 2th maxer
				if (maxer >= remain) {
					for (j = 0; j < 4; j++) {
						if (bala[j] == maxer) {
							balaa[j] = remain;
							break;
						}
					}
					return getWholeNumber(balaa)
				}
				else {
					for (s = 0; s < 4; s++) {
						if (bala[s] == maxer) {
							balaa[s] = bala[s];
							bala[s] = 0;
							remain = remain - balaa[s]
							break;
						}
					}
					maxer = Math.max(bala[0], bala[1], bala[2], bala[3])//3th maxer
					if (maxer >= remain) {
						for (k = 0; k < 4; k++) {
							if (bala[k] == maxer) {
								balaa[k] = remain;
								break;
							}
						}
						return getWholeNumber(balaa)
					}
					else {
						for (n = 0; n < 4; n++) {
							if (bala[n] == maxer) {
								balaa[n] = bala[n];
								bala[n] = 0;
								remain = remain - balaa[n];
								break;
							}
						}
						maxer = Math.max(bala[0], bala[1], bala[2], bala[3])
						for (l = 0; l < 4; l++) {
							if (bala[l] == maxer) {
								balaa[l] = remain;
								break;
							}
						}
						return getWholeNumber(balaa)
					}
				}
			}
		}
	}
	
	
	function getRequireData(tranTask, resArray, vi, id){//8_241654_500,500,500,500_0_1245413194000_interval
		TS_debug("come into getRequireData() " + "resArray=" + resArray);
		switch (tranTask[0]) {
			case "5":
				var param = "&id=" + id + "&r1=" + resArray[0] + "&r2=" + resArray[1] + "&r3=" + resArray[2] + "&r4=" + resArray[3] + "&dname=&x=" + getXfromCoord(tranTask[3]) + "&y=" + getYfromCoord(tranTask[3]);
				break;
			case "8":
				var param = "&id=" + id + "&r1=" + resArray[0] + "&r2=" + resArray[1] + "&r3=" + resArray[2] + "&r4=" + resArray[3] + "&dname=&x=" + getXfromCoord(tranTask[1]) + "&y=" + getYfromCoord(tranTask[1]);
				break;
		}
		TS_debug("in getRequireData:   " + param);
		data = encodeURI(param);
		url = myhost + "/build.php" + "?newdid=" + vi;
		var getTranData = new XMLHttpRequest();
		getTranData.open('POST', url, false);
		getTranData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		getTranData.setRequestHeader("Content-length", data.length);
		getTranData.setRequestHeader("Connection", "close");
		getTranData.onreadystatechange = callback;
		getTranData.send(data);

		function callback() {
			if (getTranData.readyState == 4) {
				if (getTranData.status == 200) {
					TS_debug("getRequireData callback here!");
					
					var abDoc = document.implementation.createDocument("", "", null);
					var abElem = document.createElement('DIV');
					abElem.innerHTML = getTranData.responseText;
					abDoc.appendChild(abElem);
					
					var aR = new Array()
					sid = ""
					a = ""
					sz = ""
					kid = ""
					
					var input = abDoc.getElementsByTagName("input")
					for (var m = 0; m < input.length; m++) {
						if (input[m].getAttribute("name") == "id") {
							sid = input[m].getAttribute("value");
						}
						else 
							if (input[m].getAttribute("name") == "a") {
								a = input[m].getAttribute("value");
							}
							else 
								if (input[m].getAttribute("name") == "sz") {
									sz = input[m].getAttribute("value");
								}
								else 
									if (input[m].getAttribute("name") == "kid") {
										kid = input[m].getAttribute("value");
									}
									else 
										if (input[m].getAttribute("name") == "r1") {
											aR[0] = input[m].getAttribute("value");
										}
										else 
											if (input[m].getAttribute("name") == "r2") {
												aR[1] = input[m].getAttribute("value");
											}
											else 
												if (input[m].getAttribute("name") == "r3") {
													aR[2] = input[m].getAttribute("value");
												}
												else 
													if (input[m].getAttribute("name") == "r4") {
														aR[3] = input[m].getAttribute("value");
													}
					}
					var paramm = "id=" + sid + "&a=" + a + "&sz=" + sz + "&kid=" + kid + "&r1=" + aR[0] + "&r2=" + aR[1] + "&r3=" + aR[2] + "&r4=" + aR[3];
					TS_debug(paramm);
					return paramm;
				}
			}
		}
		return callback()
	}
	
	
	function autoTranRequire(tranTask, resArray, vi, id) {
		TS_debug("come into autoTranRequire(), the resArray=" + resArray);
		url = myhost + "/build.php" + "?newdid=" + vi;
		dataa = encodeURI(getRequireData(tranTask, resArray, vi, id));
		GM_xmlhttpRequest({
			method: 'POST',
			url: url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: dataa,
			onload: function(response){
				TS_debug("autoTranRequire Require callback here")
				var auDoc = document.implementation.createDocument("", "", null);
				var auElem = document.createElement('div');
				auElem.innerHTML = response.responseText;
				auDoc.appendChild(auElem);

				var gugagaa = new Date()				
				switch (tranTask[0]) {
					case "5":
						var ma = "0"
						var transing = [0, 0, 0, 0]
						var Transtime = 1500000000000;
						var reg111 = aLangGameText[10]; // to
						var alltranTo = auDoc.evaluate('//table//a[contains(@href,"php?d=' + tranTask[3] + '")]', auElem, null, XPSnap, null);
						if (alltranTo.snapshotLength > 0) {
							for (var i = 0; i < alltranTo.snapshotLength; i++) {
								if (alltranTo.snapshotItem(i).innerHTML.indexOf(reg111) != -1) {
									var ma = "1"
									ress = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/>\d{1,}(?![:(\d:)])/g)
									transing[0] += parseInt(ress[0].split(">")[1])
									transing[1] += parseInt(ress[1].split(">")[1])
									transing[2] += parseInt(ress[2].split(">")[1])
									transing[3] += parseInt(ress[3].split(">")[1])
									
									resttt = alltranTo.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.innerHTML.match(/\d{1,2}:\d{2}:\d{2}/)
									restttttt = resttt.toString().split(":")
									gobacktime = gugagaa.getTime() + Number(restttttt[0]) * 60 * 60 * 1000 + Number(restttttt[1]) * 60 * 1000 + Number(restttttt[2]) * 1000;
									Transtime = Math.min(Transtime, gobacktime)
								}
							}
							if (ma == "0") {
								GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", "1500000000000")
							}
							lastTrantime = (Transtime == 1500000000000) ? 1500000000000 : Transtime + 5000
							var yyyu = new Date()
							yyyu.setTime(lastTrantime)
							
							GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", lastTrantime.toString())
							TS_debug("the traning will arrive after " + lastTrantime + ", at " + yyyu)
							GM_setValue(myacc() + "_" + tranTask[2] + "_ResourceTraning", transing.join("/"))
							TS_debug("all resources on transporting are " + transing.join("/"))
						}
						else {
							GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_TraningTime", "1500000000000")
						}
						
						okk = aLangTaskOfText[8].big() + "<br/><br/>" + aLangGameText[12] + " " + getvillagefromdid(vi) + " " + aLangGameText[6] + " " + getvillagefromdid(tranTask[2]) + "<br/><br/>" + aLangTaskOfText[11] + "!"
						printMSG(okk)
						switch (tranTask[1]) {
						
							case "0":
								GM_deleteValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime")
								break;
								
							case "1":
								var saspa = new Date();
								nextTime = saspa.getTime() + Number(transsInterval)*60*1000;
								GM_setValue(myacc() + "_" + vi + "_to_" + tranTask[3] + "_autoTransTime", nextTime.toString())
								saspa.setTime(nextTime)
								TS_debug("next transport start at "+saspa)
								break;
						}
						break;
					case "8"://8_241654_500,500,500,500_0_1245413194000_interval
						if (tranTask[3] == "0") {
							deleteTaskFromCookie(vi, tranTask)
						}
						else {
							var newTask = new Array();
							newTask[0] = tranTask[0];
							newTask[1] = tranTask[1];
							newTask[2] = tranTask[2];
							temp = Number(tranTask[3]) - 1
							newTask[3] = temp.toString();
							if (tranTask[5] == "0") {
								temp2 = gugagaa.getTime() + 6 * 60 * 60 * 1000
							}
							else {
								temp2 = gugagaa.getTime() + Number(tranTask[5])
							}
							newTask[4] = temp2.toString();
							newTask[5] = tranTask[5];
							
							deleteTaskFromCookie(vi, tranTask, newTask)
						}
						okk = aLangTaskOfText[35].bold() + " " + aLangTaskOfText[11] + "!"
						printMSG(okk)
						break;
				}
				calldoing1()
				window.location.replace("dorf1.php")
			}
		})
	}


	function showTaskList(){
		TS_debug("come into showTaskList()");
		tasks = GM_getValue(herere() + "_waitTask", "false");
		if (tasks != "false") {
			aTable = createTaskListTable();
			var tlWrapper = document.createElement("div");
			tlWrapper.id = "tasklisttable_wrapper";
			tlWrapper.appendChild(aTable);
			
			var formCoords = getOption("TASKLIST_POSITION", "120px_930px");
			formCoords = formCoords.split("_");
			tlWrapper.style.top = formCoords[0];
			tlWrapper.style.left = formCoords[1];
			
			document.body.appendChild(tlWrapper);
			makeDraggable($("tasklisttable"));
		}
	}

	
	function createTaskListTable(){
		taskss = GM_getValue(herere() + "_waitTask", "false")
		if (taskss != "false") {
			tasks = taskss.split("|")
			var taskListTable = document.createElement("table");
			taskListTable.id = "tasklisttable";
			taskListTable.border = "0"
			taskListTable.innerHTML += "<caption>" + aLangGameText[7].big() + ":  " + currentVillageName().big() + "&#160;&#160;&#160;" + aLangTaskOfText[12].big() + "</caption>"
			taskListTable.innerHTML += "<tr><th colspan='2'>" + aLangAddTaskText[12] + "</th><th>" + aLangAddTaskText[11] + "</th><th>" + aLangAddTaskText[10] + "</th></tr>"
			taskListTable.innerHTML += "<tr><td colspan='4'><hr/></td></tr>"
			for (i in tasks) {
				thisTask = tasks[i].split("_");
				aTr = document.createElement("tr");
				taskListTable.appendChild(aTr);
				
				aTd1 = document.createElement("td");
				aTd1.width = "18px"
				if (i == 0) {
					aTd1.innerHTML = "&#160;"
				}
				else 
					if (i > 0) {
						taskup = document.createElement("a");
						taskup.href = "#"
						taskup.title = aLangAddTaskText[8]
						nimg = document.createElement("img");
						nimg.setAttribute("src", moveupBtn);
						taskup.appendChild(nimg);
						aTd1.appendChild(taskup);
						taskup.addEventListener('click', moveTask(currentID(), i, -1), false);
					}
				aTr.appendChild(aTd1);
				
				aTd2 = document.createElement("td");
				aTd2.width = "28px"
				if (i < tasks.length - 1) {
					taskdown = document.createElement("a");
					taskdown.href = "#"
					taskdown.title = aLangAddTaskText[9] 
					mimg = document.createElement("img")
					mimg.setAttribute("src", movedownBtn);
					taskdown.appendChild(mimg);
					aTd2.appendChild(taskdown);
					taskdown.addEventListener('click', moveTask(currentID(), i, 1), false);
				}
				else 
					if (i == tasks.length - 1) {
						aTd2.innerHTML = "&#160;"
					}
				aTr.appendChild(aTd2);
				
				
				aTd3 = document.createElement("td");
				taskStr = "";
				switch (thisTask[0]) {
					case "0": // 0_id_level_time_name
						if (thisTask[1] < 19) {
							taskStr = aLangTaskKind[0] +"&#160;"+ thisTask[4] + "&#160;&#160;" + aLangGameText[2] + ":" + thisTask[1] + "&#160;&#160;" + aLangAddTaskText[4] + ":" + aLangGameText[0] + thisTask[2];
						}
						else 
							if (thisTask[1] > 18 && thisTask[1] < 42) {
								taskStr = aLangTaskKind[0] +"&#160;"+ thisTask[4] + "&#160;&#160;" + aLangGameText[2] + ":" + thisTask[1] + "&#160;&#160;" + aLangAddTaskText[4] + ":" + aLangGameText[0] + thisTask[2];
							}
							else {
								taskStr = aLangTaskOfText[2]
							}
						break;
					case "1": // 1_id_level_gid_time_name
						taskStr = aLangTaskKind[1] +"&#160;" +aLangAllBuildWithId[parseInt(thisTask[3])] + "&#160;&#160;" + aLangGameText[2] + ":" + thisTask[1] + "&#160;&#160;" + aLangAddTaskText[4] + ":" + aLangGameText[0] + thisTask[2];
						break;
					case "2": // 2_targetPosition_kind_repeat_startTime_interval_troops_kata1_kata2    
						targetcoord="(" + getXfromCoord(thisTask[1])+"|"+getYfromCoord(thisTask[1])+")";
						var starttime= new Date(Number(thisTask[4]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com") {
							taskStr = aLangAttackType[thisTask[2] - 2] + targetcoord + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[3]) + 1) + aLangTaskOfText[28];
						}
						else {
							taskStr = aLangAttackType[thisTask[2] - 2] + targetcoord + "&#160;&#160;" + month + aLangTaskOfText[29] + days + aLangTaskOfText[30] + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[3]) + 1) + aLangTaskOfText[28];
						}
						var troopse=thisTask[6].split(",")
						troopsss="";
						ra = GM_getValue(myacc() + "_raceID");
						ra = parseInt(ra);
						for(w in troopse){
							if(troopse[w]=="0"){continue;}
							troopsss+=aLangTroops[ra][w]+troopse[w]+" ";
						}
						aTd3.title=troopsss;
						break;
					case "3": // 3_kind_id_troop_SN_target//3_2_27_古罗马步兵_1_11_1251616724168
						takind=(thisTask[1]=="1")? aLangTaskOfText[49] : aLangTaskOfText[50]
						taskStr=thisTask[3]+"&#160;&#160;"+ takind +"&#160;&#160;"+ aLangGameText[6]+"&#160;" + aLangGameText[0]+ thisTask[5];
						var starttime= new Date(Number(thisTask[6]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com"||Xlang=="fi") {
							titleTime =starttime.toDateString()+" "+starttime.toLocaleTimeString();
						}
						else {
							titleTime = month + aLangTaskOfText[29] + days + aLangTaskOfText[30] + starttime.toLocaleTimeString();
						}
						aTd3.title=titleTime;
						break;
					case "4": // 4_25_0_1248341858000_0_54,21,42,0,0,0,0,0,0,0_兵营
						var starttime = new Date(Number(thisTask[3]));
						month = starttime.getMonth()+1;
						days = starttime.getDate();
						if ((Xlang == "com") || (Xlang == "fi")) {
							taskStr =aLangTaskKind[4] +" in "+ thisTask[6] + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[2]) + 1) + aLangTaskOfText[28];
						}
						else {
							taskStr = thisTask[6] + aLangTaskKind[4] + "&#160;&#160;" + month + aLangTaskOfText[29] + days + aLangTaskOfText[30] + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[2]) + 1) + aLangTaskOfText[28];
						}
						var troopse = thisTask[5].split(",");
						troopsss="";
						ra = GM_getValue(myacc() + "_raceID");
						ra = parseInt(ra);
						for(w in troopse){
							if(troopse[w]=="0") continue;
							troopsss += aLangTroops[ra][w]+troopse[w]+" ";
						}
						aTd3.title = troopsss;
						break;
					case "5":
						switch(thisTask[1]){
							case "0":
								taskStr = aLangTaskOfText[8] + " " + aLangGameText[6] + " " + getvillagefromdid(thisTask[2]) + "&#160;&#160;" + aLangAddTaskText[5] + ":" + aLangAddTaskText[6];
								break;
							case "1":
								taskStr = aLangTaskOfText[8] + " " + aLangGameText[6] + " " + getvillagefromdid(thisTask[2]) + "&#160;&#160;" + aLangAddTaskText[5] + ":" + aLangAddTaskText[7];
								aTd3.title=aLangTaskOfText[23]+":"+transsInterval+aLangTaskOfText[43];
								break;
						}
						break;
					case "6": // 6_1_1000_1245413194000
						var taskname=(thisTask[1]=="1")?aLangTaskOfText[40]:aLangTaskOfText[41]
						var starttime= new Date(Number(thisTask[3]))
						month=starttime.getMonth()+1;
						days=starttime.getDate()
						if (Xlang == "com"||Xlang=="fi") {
							taskStr =taskname + "&#160;&#160;" + starttime.toDateString()+" "+starttime.toLocaleTimeString()+ "&#160;&#160;" + (Number(thisTask[2]) + 1) + aLangTaskOfText[28];
						}
						else {
							taskStr = taskname + "&#160;&#160;" + month + aLangTaskOfText[29] + days + aLangTaskOfText[30] +"&#160;"+ starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[2]) + 1) + aLangTaskOfText[28];
						}
						break;
					case "7": // "7_" + theID +"_" + crtlevel + "_" + currentID() + "_" +theBuild
						taskStr=aLangTaskKind[7]+" "+thisTask[4]+"&#160;&#160;&#160;&#160;"+aLangGameText[17]+thisTask[2]+"&#160;&#160;"+aLangGameText[6]+"&#160;&#160;"+aLangGameText[17]+"0"
						break;
					case "8": // 8_241654_500,500,500,500_0_1245413194000_interval
						tarVil="("+getXfromCoord(thisTask[1])+"/"+getYfromCoord(thisTask[1])+")";
						var starttime= new Date(Number(thisTask[4]));
						month=starttime.getMonth()+1;
						days=starttime.getDate();
						taskStr = aLangTaskOfText[35] + " " + aLangGameText[6] + " " + tarVil +  "&#160;&#160;"  + starttime.toLocaleTimeString() + "&#160;&#160;" + (Number(thisTask[3]) + 1) + aLangTaskOfText[28];
						
						var asTime = parseInt(thisTask[5]);
						hh=Math.floor(asTime/3600000);
						if(hh<10){hh="0"+hh}
						mm=Math.floor((asTime-hh*3600000)/60000);
						if(mm<10){mm="0"+mm}
						ss=Math.ceil((asTime-hh*3600000-mm*60000)/1000);
						if(ss<10){ss="0"+ss}
						intervalt= hh+":"+mm+":"+ss;
						aTd3.title=thisTask[2]+" | "+aLangTaskOfText[23]+" "+intervalt;
						break;
				}
				aTd3.innerHTML = taskStr
				aTr.appendChild(aTd3);
				
				aTd4 = document.createElement("td");
				aTd4.width = "28px"
				aTd4.align="right"
				deleteTaskk = document.createElement("a");
				deleteTaskk.setAttribute("title", aLangAddTaskText[10]);
				deleteTaskk.href = "#"
				limg = document.createElement("img")
				limg.setAttribute("src", deleteBtn);
				deleteTaskk.appendChild(limg);
				deleteTaskk.addEventListener("click", deleteTaskCookie(i), false);
				aTd4.appendChild(deleteTaskk);
				aTr.appendChild(aTd4);
			}
			aTr6 = document.createElement("tr");
			aTd6 = document.createElement("td");
			aTd6.setAttribute("colspan", "4");
			aTd6.innerHTML="<hr/>"
			aTr6.appendChild(aTd6);
			taskListTable.appendChild(aTr6)

			aTr5 = document.createElement("tr");
			aTd5 = document.createElement("td");
			aTd5.setAttribute("colspan", "4");
			
				var enderTable = document.createElement("table");	

				aTr8 = document.createElement("tr");
				aTd8 = document.createElement("td");
				aTd8.align="left"
				deleteAllTask = document.createElement("a");
				deleteAllTask.href = "#"
				deleteAllTask.id="deletealltask"
				deleteAllTask.title = aLangAddTaskText[13]
				deleteAllTask.innerHTML = " "+aLangAddTaskText[13]+"&#160;&#160;"
				aTd8.appendChild(deleteAllTask);
				aTr8.appendChild(aTd8)
				
				aTd9 = document.createElement("td");
				aTd9.align="center"
				pausekey=document.createElement("a");
				pausekey.href = "#"
				switch (taskdoing){
					case "0":
						aTd9.innerHTML="&#160;"+aLangTaskOfText[44].fontcolor("red") +"&#160;"
						pausekey.id="clicktostart"
						pausekey.innerHTML=aLangTaskOfText[46]+"&#160;"
					break;
					case "1":
						aTd9.innerHTML="&#160;"+aLangTaskOfText[45].fontcolor("green")+"&#160;"
						pausekey.id="clicktopause"
						pausekey.innerHTML=aLangTaskOfText[47]+"&#160;"
					break;
				}
				aTd9.appendChild(pausekey);
				aTr8.appendChild(aTd9)

				aTd7 = document.createElement("td");
				aTd7.align="right"
				aTd7.innerHTML="&#160;&#160;"+"<a href='http://userscripts.org/scripts/show/54964' id='verdisp'  target='_blank'>"+crtVersion+"</a>"
				aTr8.appendChild(aTd7);

				enderTable.appendChild(aTr8)

			aTd5.appendChild(enderTable)
			aTr5.appendChild(aTd5);
			taskListTable.appendChild(aTr5)
			deleteAllTask.addEventListener('click', deleteAllTasks, true);
			pausekey.addEventListener("click", pauseandstart, false)
		}
		return taskListTable
	}
	
	function pauseandstart(){
		if ($("clicktostart")) {
			calldoing1()
		}
		if ($("clicktopause")) {
			calldoing0()
		}
		document.body.removeChild($("tasklisttable_wrapper"))
		showTaskList()
	}
	
	function deleteTaskCookie(j){
		return function(){
			taskss = GM_getValue(herere() + "_waitTask");
			thisTask = taskss.split("|")[j].split("_")
			switch (thisTask[0]) {
				
				case "0":
					if (thisTask[1] < 42) {
						GM_deleteValue(herere() + "_ResourceUpdataTime")
						GM_deleteValue(herere() + "_BuildingUpdataTime")
						GM_deleteValue(herere() + "_UpdataTime")
					}
					else {//autoResource
						GM_deleteValue(herere() + "_autoResource");
						GM_deleteValue(herere() + "_CorpRemain");
						GM_deleteValue(herere() + "_minLevelId");
						GM_deleteValue(herere() + "_minLevelCropId");
					}
					break;
					
				case "1"://new build
					GM_deleteValue(herere() + "_BuildingUpdataTime")
					GM_deleteValue(herere() + "_UpdataTime")
					break;
					
				case "5"://auto transport
					GM_deleteValue(herere() + "_to_" + thisTask[3] + "_TraningTime")
					GM_deleteValue(herere() + "_to_" + thisTask[3] + "_autoTransTime")
					auTranTo=GM_getValue(herere() + "_autoTransTo")
					auTrans=auTranTo.split("|")
					if (auTrans.length > 1) {
						for (a in auTrans) {
							if (auTrans[a] == thisTask[2]) {
								auTrans.splice(a, 1)
								break;
							}
						}
						GM_setValue(herere() + "_autoTransTo",auTrans.join("|"))
					}
					else {
						GM_deleteValue(herere() + "_autoTransTo")
					}
					break;
					
				case "7"://demolish
					GM_deleteValue(herere() + "_demolishTime");
					break;
					
			}
			deleteTaskFromCookie(currentID(), thisTask)
		}
	}




	function deleteAllTasks(){
		GM_deleteValue(herere() + "_waitTask")
		GM_deleteValue(herere() + "_BuildingUpdataTime")
		GM_deleteValue(herere() + "_ResourceUpdataTime")
		GM_deleteValue(herere() + "_UpdataTime")
		GM_deleteValue(herere() + "_autoTransTime")
		GM_deleteValue(herere() + "_TraningTime")
		GM_deleteValue(herere() + "_autoTransTo")
		GM_deleteValue(herere() + "_autoResource")
		GM_deleteValue(herere() + "_demolishTime")
		GM_setValue(myacc() + "_doing", "1");
		TS_debug("set doing to 1");
		document.body.removeChild($("tasklisttable_wrapper"))
	}
	
	function addtaskbefore(vi, gid, ki){
		//ki="0" is Romans autoResource, ki="2" is other race autoResource
		thebuildid = getbuildfromdorf2(vi, gid)
		addtask = "0_" + thebuildid + "_000000000"
		newTaskstring = addtask + "|" + GM_getValue(myacc() + "_" + vi + "_waitTask");
		GM_setValue(myacc() + "_" + vi + "_waitTask", newTaskstring);
		switch (ki) {
			case "0":
				GM_deleteValue(myacc() + "_" + vi + "_BuildingUpdataTime");
				break;
			case "2":
				GM_deleteValue(myacc() + "_" + vi + "_UpdataTime");
				break;
		}
		window.location.href=myhost + "/dorf1.php";
	}
	
	
	function getbuildfromdorf2(vil, gid){
		var turl = myhost + "/dorf2.php?newdid=" + vil
		var getsomeid = new XMLHttpRequest();
		getsomeid.open('GET', turl, false);
		getsomeid.onreadystatechange = callback;
		getsomeid.send(null);
		function callback(){
			if (getsomeid.readyState == 4) {
				if (getsomeid.status == 200) {
					TS_debug("getbuildfromdorf2_callback is here")
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = getsomeid.responseText;
					aDoc.appendChild(aElem);
					
					var thebuild = aDoc.evaluate('id("map2")//area[contains(@title,"' + aLangAllBuildWithId[gid] + '")]', aElem, null, XPFirst, null);
					temmp=thebuild.singleNodeValue.title.split(" ")
					level = parseInt(temmp[temmp.length-1]) + 1
					return thebuild.singleNodeValue.href.split("id=")[1] + "_" + level.toString();
				}
			}
		}
		return callback()
	}
	
	
	
	function getAutoResourceId(vi){
		corpremain = GM_getValue(myacc() + "_" + vi + "_CorpRemain")
		minlevelid = GM_getValue(myacc() + "_" + vi + "_minLevelId")
		minlevelcropid = GM_getValue(myacc() + "_" + vi + "_minLevelCropId")
		if (GM_getValue(myacc() + "_" + vi + "_ResourceRate")== "1:1:1:15") {
			TS_debug("in 15corps mainvillage, just upgrade corpfield, so return id is " + minlevelcropid)
			return minlevelcropid
		}
		else {
			TS_debug("come into getAutoResourceId(vi) and corpremain=" + corpremain)
			if (corpremain < 20) {
				TS_debug("because of corpremain<20, return id is " + minlevelcropid)
				return minlevelcropid
			}
			else {
				TS_debug("because of corpremain>=20, return id is " + minlevelid)
				return minlevelid
			}
		}
	}
	
	
	 function getResourceRate(){
	 	if (window.location.href.indexOf("dorf1") != -1) {
	 		mydiv = $("rx");
	 		rate = new Array();
	 		for (i = 0; i < 4; i++) {
	 			reg = new RegExp(aLangAllResInDorf1[i], "g");
	 			mysearch = mydiv.innerHTML.match(reg);
				if (mysearch != null)
		 			newlength = rate.push(mysearch.length);
	 		}
	 		GM_setValue(herere()+ "_ResourceRate", rate.join(":"));
	 	}
	 }
	
	
	function deleteTaskFromCookie(Vii, Taa,newTa){
		TS_debug("come into deleteTaskFromCookie(Vii, Taa)")
		taskcook = GM_getValue(myacc() + "_" + Vii + "_waitTask")
		tasks = taskcook.split("|")
		taaa = Taa.join("_")
		for (x in tasks) {
			if (tasks[x] == taaa) {
				if (newTa) {
					newTa=newTa.join("_")
					tasks.splice(x, 1, newTa)
					break;
				}
				else{
					tasks.splice(x, 1)
					break;					
				}
			}
		}
		if (tasks.length > 0) {
			newCook = tasks.join("|")
			GM_setValue(myacc() + "_" + Vii + "_waitTask", newCook)
			TS_debug("ok,i delete a task")
			if ($("tasklisttable_wrapper")) {
				document.body.removeChild($("tasklisttable_wrapper"))
			}
			showTaskList()
		}
		else {
			GM_deleteValue(myacc() + "_" + Vii + "_waitTask")
			if (GM_getValue(myacc() + "_" + Vii + "_ResourceUpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_ResourceUpdataTime")
			if (GM_getValue(myacc() + "_" + Vii + "_BuildingUpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_BuildingUpdataTime")
			if (GM_getValue(myacc() + "_" + Vii + "_UpdataTime", "flase") != "false") 
				GM_deleteValue(myacc() + "_" + Vii + "_UpdataTime")
			TS_debug("ok I delete the whole cookie")
			if ($("tasklisttable_wrapper")) {
				document.body.removeChild($("tasklisttable_wrapper"))
			}
			showTaskList()
		}
	}
	
	
	function moveTask(vi, i, updown){
		return function(){
			updown=parseInt(updown)
			i=parseInt(i)
			var ubC = GM_getValue(myacc() + "_" + vi + "_waitTask");
			var arrUbC = ubC.split("|");
			var tmpUb = arrUbC[i + updown];
			arrUbC[i + updown] = arrUbC[i];
			arrUbC[i] = tmpUb;
			ubC = arrUbC.join("|");
			GM_setValue(myacc() + "_" + vi + "_waitTask", ubC)
			document.body.removeChild($("tasklisttable_wrapper"))
			showTaskList()
		}
	}

	function promptFreshInterval(){
		curentSetup = GM_getValue(myacc() + "_FreshInterval", "20")
		var newSetup = prompt(aLangTaskOfText[37],curentSetup);
		GM_setValue(myacc() + "_FreshInterval", newSetup)
	}

	function promptTranInterval(){
		curentSetup2 = GM_getValue(myacc() + "_TransInterval", "30")
		var newSetup2 = prompt(aLangTaskOfText[42],curentSetup2);
		GM_setValue(myacc() + "_TransInterval", newSetup2)
	}

	function calldoing1(){
		taskdoing = "1"
		GM_setValue(myacc() + "_doing", "1");
		TS_debug("set doing to 1");
	}

	function calldoing0(){
		taskdoing = "0"
		GM_setValue(myacc() + "_doing", "0");
		TS_debug("set doing to 0");
	}

	ccclock = 0;
	function eachTimedo(){
		ccclock = ccclock + 6000
		if (ccclock > Number(pagefreshInterval)*60*1000) {
			TS_debug("reload in eachTimedo() ,  each "+pagefreshInterval+" minutes")
			GM_deleteValue(myacc() + "_doing");
			window.location.replace(myhost + "/dorf1.php")
		}
		
		var now = new Date();
		nowmillse = now.getTime();
		
		for (v in getAllVillageNewdids()) {
			whatever = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_waitTask", "false")
			if (whatever != "false"&&taskdoing=="1") {
				allTasks = whatever.split("|")
				allTran = new Array();
				TranT = new Array();
				TraningT = new Array();
				for (nnn in allTasks) {
					thisTask = allTasks[nnn].split("_")
					if (thisTask[0] == "5") {
							ll = allTran.push(thisTask)	
					}
					if(thisTask[0] == "2"){
						attackT=Number(thisTask[4])
						remainA=attackT- nowmillse;
						if((remainA < 1000) && (taskdoing=="1")){
							calldoing0()
							startAttackNow(getAllVillageNewdids()[v],thisTask)
						}
					}
					if(thisTask[0] == "4"){
						TrainT=Number(thisTask[3])
						remainT=TrainT- nowmillse;
						if(remainT<1000&&taskdoing=="1"){
							calldoing0()
							startTrainNow(getAllVillageNewdids()[v],thisTask)
						}
					}
					if(thisTask[0] == "8"){//8_241654_500,500,500,500_0_1245413194000_interval
						customTransT=Number(thisTask[4])
						remainCu=customTransT- nowmillse;
						if(remainCu<1000&&taskdoing=="1"){
							calldoing0()
							startCustomTranNow(getAllVillageNewdids()[v], thisTask)
						}
					}
					if (thisTask[0] == "6"){//6_1_1000_1245413194000
						partyT=Number(thisTask[3])
						remainPa=partyT- nowmillse;
						if(remainPa<1000&&taskdoing=="1"){
							calldoing0()
							startPartyNow(getAllVillageNewdids()[v], thisTask)
						}
					}
					if (thisTask[0] == "3"){//3_kind_id_troop_SN_target//3_2_27_古罗马步兵_1_11_1251616724168
						improveT=Number(thisTask[6])
						remainIm=improveT- nowmillse;
						if(remainIm<1000&&taskdoing=="1"){
							calldoing0()
							startImproNow(getAllVillageNewdids()[v], thisTask)
						}
					}
				}
				if (allTran.length > 0) {
					for (i in allTran) {
						TranT[i] = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_to_" + allTran[i][3] + "_autoTransTime", "1500000000000");
						TraningT[i] = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_to_" + allTran[i][3] + "_TraningTime", "1500000000000")
						
						if ((parseInt(TranT[i]) - nowmillse) < 1000&&taskdoing=="1") {
							calldoing0()
							startTrannow(getAllVillageNewdids()[v], allTran[i])
						}
						if ((parseInt(TraningT[i]) - nowmillse) < 1000&&taskdoing=="1") {
							calldoing0()
							ki = fleshTraning(getAllVillageNewdids()[v], allTran[i])
							TS_debug("here is eachTimedo(), return from Fleshtraning is " + ki)
						}
					}
				}
				
				resT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_ResourceUpdataTime", "false");
				buiT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_BuildingUpdataTime", "false");
				upT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_UpdataTime", "false");
				DemoT = GM_getValue(myacc() + "_" + getAllVillageNewdids()[v] + "_demolishTime", "false");
		
				
				if (resT != "false") {
					remainTime1 = parseInt(resT) - nowmillse
					if (remainTime1 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "0")
						break;
					}
				}
				if (buiT != "false") {
					remainTime2 = parseInt(buiT) - nowmillse
					if (remainTime2 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "1")
						break;
					}
				}
				if (upT != "false") {
					remainTime3 = parseInt(upT) - nowmillse
					if (remainTime3 < 1000&&taskdoing=="1") {
						calldoing0()
						startBuildnow(getAllVillageNewdids()[v], "2")
						break;
					}
				}
				if (DemoT != "false") {
					remainTime4 = parseInt(DemoT) - nowmillse;
					for (lk in allTasks) {
						mytask = allTasks[lk].split("_");
						if (mytask[0] == "7" && remainTime4 < 1000&&taskdoing=="1") {
							calldoing0()
							startDemonow(getAllVillageNewdids()[v], mytask);
							break;
						}
					}
				}
			}
		}
	}

	
	
	
	function cleartime(){
		ccclock = 0;
	}
	
/*************************************** main function start **********************************************/

	GM_registerMenuCommand(aLangTaskOfText[36], promptFreshInterval);
	GM_registerMenuCommand(aLangTaskOfText[42], promptTranInterval);

	// Check if we know what race we're playing
	if (GM_getValue(myacc() + "_raceID", "false") == "false") {
		// If race is unset, then reload to player's preferences to detect it
		// But first check if we're not already in prefences page
		if (window.location.href.indexOf("spieler.php") < 0) {
			window.location.replace(myhost + "/spieler.php?uid=" + getuid());
		}
	}

	showTaskList()
	getMainVillageid()
	getResourceCap()
	getResourceRate()
	
	if (window.location.href.indexOf("&s=4") == -1) {
		getallVillagePos()
	}
	
	if((window.location.href.indexOf("a2b.php") != -1) && (window.location.href.match(/[\?&]d=/)==null)){
		createAttackBtn();
	}

	var h1innerr=h1in().innerHTML.split(" ")
	switch (h1innerr.length){
		case 3:
			bName=h1innerr[0];
		break;
		case 4:
			bName=h1innerr[0]+" "+h1innerr[1];
		break;
		case 5:
			bName=h1innerr[0]+" "+h1innerr[1]+" "+h1innerr[2];
		break;
		case 6:
			bName=h1innerr[0]+" "+h1innerr[1]+" "+h1innerr[2]+" "+h1innerr[3];
		break;
		default:
		bName=""
		break;
	}
	if (bName==aLangAllBuildWithId[24]) {
		createPartylnk();
	}
	
	if ((bName==aLangAllBuildWithId[12]||bName==aLangAllBuildWithId[13])&& window.location.href.match(/[^gd]id/) != null){
		createImprovelink();
	}
	
	if(h1in().innerHTML.indexOf(aLangAllBuildWithId[15])!=-1&&h1innerr[h1innerr.length-1]>9&&(!$("demolish"))) {
		createDemolishlnk();
	}
	
	if (bName==aLangAllBuildWithId[19]||bName==aLangAllBuildWithId[20]||bName==aLangAllBuildWithId[21]||bName==aLangAllBuildWithId[25]||bName==aLangAllBuildWithId[26]||bName==aLangAllBuildWithId[29]||bName==aLangAllBuildWithId[30]){
		createTrainLnk();
	}

	if ((window.location.href.indexOf("build") != -1) && (window.location.href.match(/[^gd]id/) != null) && !isNaN(h1innerr[h1innerr.length-1]) && window.location.href.indexOf("&t=") == -1) {
		createbuildlink();
	}
	
	if(h1in().innerHTML == aLangGameText[15]) {
		createNewbuildLnk();
	}
	
	if (window.location.href.indexOf("dorf1") != -1) {
		createAutoResLink();
	}
	
	if (bName == aLangAllBuildWithId[17] && window.location.href.indexOf("t=") == -1) {
		createAutoTransBtn();
	}
	
	if (h1in().innerHTML.indexOf(aLangAllBuildWithId[37])!=-1) {
		getHeroSpeed();
	}
	window.addEventListener("keydown", cleartime, false);
	window.addEventListener("mousemove", cleartime, false);
	
	myower = setInterval(eachTimedo, 6000);
	
//mybar.innerHTML=getImproveTroops("18");
