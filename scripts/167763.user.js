// ==UserScript==
// @name           魔友老黄历v1 for tieba by jimoFC
// @description    魔友老黄历v1 for tieba by jimoFC
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/i/*
// @exclude        http://tieba.baidu.com/f/like*
// @exclude        http://tieba.baidu.com/club/*
// @exclude        http://tieba.baidu.com/shipin/*
// @exclude        http://tieba.baidu.com/bakan*
// @exclude        http://tieba.baidu.com/daquan*
// @exclude        http://tieba.baidu.com/f/tupian*
// @exclude        http://tieba.baidu.com/tb/*
// @exclude        http://tieba.baidu.com/*postBrowserBakan*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         Jimo
// @version        0.0.1
// ==/UserScript==


var inputElement,timerid,e,f,g,button;
var ms = 0;	
var state = 0;			
var ks,km,kms;
var keyc;
var testm = 0;
var testInputDiv;

function addMtimer() {
			 testInputDiv = document.getElementById('sign_mod');
	            f2 = document.createElement("table");
		f2.style.border="1"; 
		f2.align="center";
var object1 = testInputDiv.appendChild(f2);
f2.style.background="#c2c2c2";//背景颜色设置
f2.style.color="#ffffff"; //字体颜色设置

	var txtNode1=document.createTextNode('魔友老黄历 v1'); 
f2.insertRow(); 
f2.rows[0].insertCell(); 
f2.rows[0].cells[0].appendChild(txtNode1); 



		
	            f3 = document.createElement("table");
		f3.style.border="1"; 
		f3.align="center";
var object1 = testInputDiv.appendChild(f3);
f3.style.background="#ffffff";//背景颜色设置
f3.style.color="#000000"; //字体颜色设置
	var txtNode1=document.createTextNode(getTodayString()); 
f3.insertRow(); 
f3.rows[0].insertCell(); 
f3.rows[0].cells[0].appendChild(txtNode1); 




	    f = document.createElement("table");
		f.style.border="1"; 
		f.align="center";
var object1 = testInputDiv.appendChild(f);
f.style.background="#fff68f";//背景颜色设置
f.style.color="#000000"; //字体颜色设置

	var txtNode1=document.createTextNode('_____________宜_____________'); 
f.insertRow(); 

f.rows[ms].insertCell(); 
f.rows[ms].cells[0].appendChild(txtNode1); 
f.rows[ms].cells[0].align='center';
f.rows[ms].cells[0].style.fontWeight='bold';
ms+=1;

 
	    f5 = document.createElement("table");
		f5.style.border="1"; 
		f5.align="center";
var object2 = testInputDiv.appendChild(f5);
f5.style.background="#ffb6c1";//背景颜色设置
f5.style.color="#000000"; //字体颜色设置

	var txtNode2=document.createTextNode('____________不宜____________'); 
f5.insertRow(); 

f5.rows[testm].insertCell(); 
f5.rows[testm].cells[0].appendChild(txtNode2); 
f5.rows[testm].cells[0].align='center';
f5.rows[testm].cells[0].style.fontWeight='bold';
testm+=1;


	    f6 = document.createElement("table");
		f6.style.border="1"; 
		f6.align="center";
var object3 = testInputDiv.appendChild(f6);
f6.style.background="#ffffff";//背景颜色设置
f6.style.color="#000000"; //字体颜色设置
//f6.style.fontWeight='bold';

	var txtNode3=document.createTextNode('座位朝向:面向' + directions[random(iday, 2) % directions.length] + '练魔方,POP概率最小'); 
f6.insertRow(); 
f6.rows[state].insertCell(); 
f6.rows[state].cells[0].appendChild(txtNode3); 
state+=1;

	var txtNode3=document.createTextNode('今日宜饮:' + pickRandom(drinks,2).join()); 
f6.insertRow(); 
f6.rows[state].insertCell(); 
f6.rows[state].cells[0].appendChild(txtNode3); 
state+=1;

	var txtNode3=document.createTextNode('女神亲近指数:' + random(iday, 6) % 50 / 10.0); 
f6.insertRow(); 
f6.rows[state].insertCell(); 
f6.rows[state].cells[0].appendChild(txtNode3); 
state+=1;

	//$('.date').html(getTodayString());
	//$('.direction_value').html(directions[random(iday, 2) % directions.length]);
	//$('.drink_value').html(pickRandom(drinks,2).join());
	//$('.goddes_value').html(random(iday, 6) % 50 / 10.0);

}



function random(dayseed, indexseed) {
	var n = dayseed % 11117;
	for (var i = 0; i < 100 + indexseed; i++) {
		n = n * n;
		n = n % 11117;   // 11117 是个质数
	}
	return n;
}

var today = new Date();
var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

var weeks = ["日","一","二","三","四","五","六"];
var directions = ["北方","东北方","东方","东南方","南方","西南方","西方","西北方"];
var activities = [
	{name:"测速", good:"你会OP连跳，大破PB",bad:"你会POP中轴"},
	{name:"洗澡", good:"你几天没洗澡了？",bad:"会把刚背的公式洗掉"},
	{name:"垮阶虐", good:"帮助新朋友提高的同时自己也体验PK的乐趣和激情",bad:"估计会遇到四阶比你三阶还快的。。。"},
	{name:"锻炼一下身体", good:"更好的体能意味着更强的专注力与持久力",bad:"健身完洗澡会被丢♂肥♂皂"},
	{name:"为灾区人民祈福", good:"任何人的死亡，都是我的减少，作为人类的一员，我与生灵共老。", bad:"你无须号召大家集中在广场点蜡烛、在树上挂祝福、在河边放灯船、在网上发祝福帖，干这种劳命伤财便宜商家而灾区人民落实不到一点实质帮助的事。别以为这样就会激励灾区人民，想帮忙请捐钱捐衣物，不想捐那么请向往常一样做好自己手中的事，心中默默地祈愿足矣。"},
	{name:"吧务会", good:"为了清静蓝色的地球！",bad:"吃棱块吧权限汪！"},
	{name:"爆手速", good:"手速是魔方技术里面一个很重要的部分，你需要这样的训练",bad:"棱块发射成功，进入同步轨道～"},
	{name:"发帖", good:"骗得一手好经验",bad:"你的帖子会秒沉"},
	{name:"练习盲拧", good:"今天状态好的出奇，并且不会遇到奇偶校验",bad:"每一把都DNF"},
	{name:"蹲坑时玩魔方", good:"打发时间的好方式",bad:"心情复杂的看着便便上的棱块……"},
	{name:"发测速成绩", good:"被颜♂射/经验/脸熟/膜拜/支援，另有小几率成为大神",bad:"被战帖/卖萌贴/月经贴/爆照贴/骗经贴/晒妹贴击沉"},
	{name:"打磨", good:"魔方会更好用",bad:"一锉铸成千古恨"},
	{name:"使用全亮贴纸", good:"你看起来更有品位",bad:"你会被闪瞎狗眼"},
	{name:"换贴纸", good:"你的观察能力强化百分之二十",bad:"贴纸会贴歪，并且全是气泡"},
	{name:"收徒", good:"你遇到有潜力的徒弟的可能性大大增加",bad:"你只会招到一两个混饭吃的外行"},
	{name:"拔轴", good:"你会完美拔轴",bad:"你会短轴/断螺丝/断中心块"},
	{name:"四阶盲拧", good:"生活失去意义时，试试四阶盲拧吧",bad:"呵呵。。。"},
	{name:"背新公式", good:"你完美的适应了新公式，平均成绩提高0.5秒",bad:"你会和现在的公式弄混，成绩倒退0.5秒"},
	{name:"练习单拧", good:"单手帅呆了",bad:"你的小指会抽筋"},
	{name:"练习PLL连拧", good:"晚上是爆发手速的时候",bad:"你会发现自己是手残"},
	{name:"在妹子面前表演魔方", good:"改善你矮穷挫的形象",bad:"会被妹子反虐"},
	{name:"撸管", good:"避免容错不足",bad:"小撸怡情，大撸伤身，强撸灰飞烟灭"},
	{name:"浏览成人网站", good:"重拾对生活的信心",bad:"你会心神不宁"},
	{name:"使用\"%v\"魔方", good:"",bad:""},
	{name:"发技术贴", good:"会被大家膜拜，有望成为大神",bad:"太长不看，因此秒沉"},
	{name:"开马甲挑战权限汪", good:"你能获得自游皿煮和置顶Play",bad:"被识破后小黑屋10天副本循环"},
	{name:"发帖每楼超过%l字", good:"你的帖子详细且很有营养，有很高几率被颜♂射",bad:"枯燥无味太长没人看"},
	{name:"签名审核", good:"秒审核",bad:"连金砖银砖都再版了，你的签名还没通过审核"},
	{name:"回帖", good:"存在感大大增加",bad:"不小心挖坟，被小黑屋"},
	{name:"爆照", good:"经验增长破百",bad:"吧友只会回复“已撸”"},
	{name:"删不合规格的贴", good:"维护贴吧的正常秩序，你会得到吧友的理解",bad:"会被各种吧友开贴点艹，最后触发地图炮死伤无数"},
	{name:"和魔友PK", good:"你将有如神助",bad:"你会被虐的很惨"},
	{name:"练习高阶", good:"你看起来会很逆天",bad:"你会暴表"},
	{name:"购买魔方", good:"你会买到心仪的魔方",bad:"魔界哥的炒米送完了"},
	{name:"保养魔方", good:"魔方的顺滑度大大增加",bad:"一不小心，扳断角块"},
	{name:"和另一半一起玩魔方", good:"双人速拧，惊羡众人",bad:"另一半把角块扳断了，你把她骂了一顿，她把你JJ扳断了"},
	{name:"手滑购入新藏品", good:"降价促销，眼缘",bad:"入手后各种无爱、后悔，后续补款无力，欠一屁股债，卖肾卖血，家破人亡"},
	{name:"上课刷贴吧", good:"今天发生的事不能错过",bad:"会被老师看到"},
	{name:"上课玩魔方", good:"还需要理由吗？",bad:"魔方太吵而被老师发现然后没收"}
];

var specials = [
	{date:20130221, type:'good', name:'防核演习', description:'万一哪个疯子丢颗核弹过来...'}
];

var tools = ["Eclipse写程序", "MSOffice写文档", "记事本写程序", "Windows8", "Linux", "MacOS", "IE", "Android设备", "iOS设备"];

var varNames = ["展翅", "点盛", "孤鸿", "V-cube", "圣手", "东贤", "Z-cube", "X-cube", "麦菲特", "封三", "智途", "大吧四", "甲五", "轮回", "方是"];

var drinks = ["水","茶","红茶","绿茶","咖啡","奶茶","可乐","牛奶","小丸号","果汁","果味汽水","D39","运动饮料","酸奶","酒","Lubix","Z-lube"];

function getTodayString() {
	return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + weeks[today.getDay()];
}

// 生成今日运势
function pickTodaysLuck() {
	var numGood = random(iday, 98) % 3 + 2;
	var numBad = random(iday, 87) % 3 + 2;
	var eventArr = pickRandomActivity(numGood + numBad);
	
	var specialSize = pickSpecials();
	
	for (var i = 0; i < numGood; i++) {
		addToGood(eventArr[i]);
	}
	
	for (var i = 0; i < numBad; i++) {
		addToBad(eventArr[numGood + i]);
	}
	
	
}

// 添加预定义事件
function pickSpecials() {
	var specialSize = [0,0];
	
	for (var i = 0; i < specials.length; i++) {
		var special = specials[i];
		
		if (iday == special.date) {
			if (special.type == 'good') {
				specialSize[0]++;
				addToGood({name: special.name, good: special.description});
			} else {
				specialSize[1]++;
				addToBad({name: special.name, bad: special.description});
			}
		}
	}
	
	return specialSize;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(size) {
	var picked_events = pickRandom(activities, size);
	
	for (var i = 0; i < picked_events.length; i++) {
		picked_events[i] = parse(picked_events[i]);
	}
	
	return picked_events;
}

// 从数组中随机挑选 size 个
function pickRandom(array, size) {
	var result = [];
	
	for (var i = 0; i < array.length; i++) {
		result.push(array[i]);
	}
	
	for (var j = 0; j < array.length - size; j++) {
		var index = random(iday, j) % result.length;
		result.splice(index, 1);
	}
	
	return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
	var result = {name: event.name, good: event.good, bad: event.bad};  // clone
	
	if (result.name.indexOf('%v') != -1) {
		result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
	}
	
	if (result.name.indexOf('%t') != -1) {
		result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length]);
	}
	
	if (result.name.indexOf('%l') != -1) {
		result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
	}
	
	return result;
}

// 添加到“宜”
function addToGood(event) {


	var txtNode1=document.createTextNode(event.name); 
f.insertRow(); 
f.rows[ms].insertCell(); 
f.rows[ms].cells[0].appendChild(txtNode1); 
f.rows[ms].cells[0].align='left';
f.rows[ms].cells[0].style.fontWeight='bold';
ms+=1


	var txtNode1=document.createTextNode(event.good); 
f.insertRow(); 
f.rows[ms].insertCell(); 
f.rows[ms].cells[0].appendChild(txtNode1); 
f.rows[ms].cells[0].align='right';

ms+=1

	//f.value = f.value + event.name  + event.good ;
}

// 添加到“不宜”
function addToBad(event) {


	var txtNode2=document.createTextNode(event.name); 
f5.insertRow(); 
f5.rows[testm].insertCell(); 
f5.rows[testm].cells[0].appendChild(txtNode2); 
f5.rows[testm].cells[0].align='left';
f5.rows[testm].cells[0].style.fontWeight='bold';
testm+=1

	var txtNode2=document.createTextNode(event.good); 
f5.insertRow(); 
f5.rows[testm].insertCell(); 
f5.rows[testm].cells[0].appendChild(txtNode2); 
f5.rows[testm].cells[0].align='right';
testm+=1

}

$(function(){
	pickTodaysLuck();
});





addMtimer();