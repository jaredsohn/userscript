// ==UserScript==
// @name        dld
// @author      flyhigher
// @encoding    utf-8
// @namespace   http://userscripts.org/scripts/show/185929
// @updateURL   https://userscripts.org/scripts/source/185929.meta.js
// @downloadURL https://userscripts.org/scripts/source/185929.user.js
// @require     http://code.jquery.com/jquery-1.8.3.js
// @include     http://fight.pet.qq.com/*
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// @version     1.2.1
// ==/UserScript==

var currentUser;
var i = 0;
var isFirst = true;
var arr;
var url;
var basicData = {
		"productArr" : ["3020","3021","3022"],
//		"productArr" : ["3022"],
		
		"bagArr" : ["3180","3044","3045","3061","3062","3063","3068","3069","3182","3213","3030"],
		
		"shareArr" : [ "2", "4", "6", "8", "10", "7", "5", "3", "9", "1" ],
		"852980788" : {
			"employeeArr" : [ "6154", "6154", "6154", "6153", "6153" ],
			"preArr" : [ "21837726", "86062487" ],
			"firstObj" : "21837726",
			"friendArr" : [ "puin=21837726", "puin=279261737","puin=1780218571", "puin=2287030693", "puin=86062487", "puin=81250726","puin=1971296335" ],
			"callArr" : [ "562726884","454255129","83647982","83647982","83647982"],
			"offerId" :"3089",
			"strangerArr1" : ["475331962","512623796","651742970","1428655530","1320318113","373212648","5205663","619293889","407763640","1728932546"],
			"strangerArr2" : ["695001049","676239521","17901478", "1197939485", "465608627", "914883568", "1220038383", "1140313881", "136606427", "7446894"],
			"strangerArr3" : ["1771815503", "241537255", "2511363302", "381275000", "1263256750", "136639560", "358434036", "956688105", "572394043", "652707902"],
			"strangerArr4" : ["775740997", "2373425151", "232036862", "545364553", "270959039", "1106419617", "447517302", "674767058", "173503336", "994129819"],
			"strangerArr5" : ["806707248", "303036700", "754303907", "304576612", "571118579", "892662969", "1409685854", "843800345", "286074094", "1438104334"],
			"strangerArr6" : ["5909278", "97250235", "592006616", "837425628", "154462068", "466358815", "530087116", "64115", "1172495635", "1034139328"],
			"strangerArr7" : ["12655331","79749611","1548792582","546077031"]
		},
		"81250726" : {
			"employeeArr" : [ "6134", "6134", "6134", "6133", "6133" ],
			"preArr" : [ "852980788", "21837726" ],
			"firstObj" : "10142812",
			"friendArr" : [ "puin=852980788", "puin=86062487", "puin=21837726","puin=1971296335", "puin=2839985319", "puin=706760579" ],
			"callArr" : [ "706760579", "706760579", "706760579" ],
			"offerId" :"3089",
			"strangerArr1" : ["475331962","512623796","651742970","1428655530","1320318113","373212648","5205663","619293889","407763640","1728932546"],
			"strangerArr2" : ["695001049","676239521","17901478", "1197939485", "465608627", "914883568", "1220038383", "1140313881", "136606427", "7446894"],
			"strangerArr3" : ["1771815503", "241537255", "2511363302", "381275000", "1263256750", "136639560", "358434036", "956688105", "572394043", "652707902"],
			"strangerArr4" : ["775740997", "2373425151", "232036862", "545364553", "270959039", "1106419617", "447517302", "674767058", "173503336", "994129819"],
			"strangerArr5" : ["806707248", "303036700", "754303907", "304576612", "571118579", "892662969", "1409685854", "843800345", "286074094", "1438104334"],
			"strangerArr6" : ["5909278", "97250235", "592006616", "837425628", "154462068", "466358815", "530087116", "64115", "1172495635", "1034139328"],
			"strangerArr7" : ["12655331","79749611","1548792582","546077031"]
		},
		"86062487" : {
			"employeeArr" : [ "6134", "6134", "6134", "6133", "6133" ],
			"preArr" : [ "852980788", "81250726" ],
			"firstObj" : "10142812",
			"friendArr" : [ "puin=852980788", "puin=81250726", "puin=21837726","puin=1971296335","puin=1525656214",
					"puin=1747040314" ],
			"callArr" : [],
			"offerId" :"3089",
			"strangerArr1" : ["475331962","512623796","651742970","1428655530","1320318113","373212648","5205663","619293889","407763640","1728932546"],
			"strangerArr2" : ["695001049","676239521","17901478", "1197939485", "465608627", "914883568", "1220038383", "1140313881", "136606427", "7446894"],
			"strangerArr3" : ["1771815503", "241537255", "2511363302", "381275000", "1263256750", "136639560", "358434036", "956688105", "572394043", "652707902"],
			"strangerArr4" : ["775740997", "2373425151", "232036862", "545364553", "270959039", "1106419617", "447517302", "674767058", "173503336", "994129819"],
			"strangerArr5" : ["806707248", "303036700", "754303907", "304576612", "571118579", "892662969", "1409685854", "843800345", "286074094", "1438104334"],
			"strangerArr6" : ["5909278", "97250235", "592006616", "837425628", "154462068", "466358815", "530087116", "64115", "1172495635", "1034139328"],
			"strangerArr7" : ["12655331","79749611","1548792582","546077031"]
		},
		"21837726" : {
			"employeeArr" : [ "6134", "6134", "6134", "6133", "6133" ],
			"preArr" : [ "86062487", "81250726" ],
			"firstObj" : "10142812",
			"friendArr" : [ "puin=852980788", "puin=86062487", "puin=81250726", "puin=1971296335", "uin=83647982", "puin=506245870" ],
			"callArr" : [],
			"offerId" :"3089",
			"strangerArr1" : ["475331962","512623796","651742970","1428655530","1320318113","373212648","5205663","619293889","407763640","1728932546"],
			"strangerArr2" : ["695001049","676239521","17901478", "1197939485", "465608627", "914883568", "1220038383", "1140313881", "136606427", "7446894"],
			"strangerArr3" : ["1771815503", "241537255", "2511363302", "381275000", "1263256750", "136639560", "358434036", "956688105", "572394043", "652707902"],
			"strangerArr4" : ["775740997", "2373425151", "232036862", "545364553", "270959039", "1106419617", "447517302", "674767058", "173503336", "994129819"],
			"strangerArr5" : ["806707248", "303036700", "754303907", "304576612", "571118579", "892662969", "1409685854", "843800345", "286074094", "1438104334"],
			"strangerArr6" : ["5909278", "97250235", "592006616", "837425628", "154462068", "466358815", "530087116", "64115", "1172495635", "1034139328"],
			"strangerArr7" : ["12655331","79749611","1548792582","546077031"]
		},
		"towerArr" : [ "7", "3", "4", "1" ],
		"stoveArr" : [ "852980788", "21837726", "86062487", "81250726", "454255129","1254900411","1538764740","1067152273" ],
		"bossArr" : [ "10", "2", "3", "151", "7", "9", "11", "12", "17", "18", "153","13", "15", "152" ],
		"visitArr":[ "454255129", "21837726", "10142812", "83647982", "86062487", "81250726","1971296335" ]
	};

function ajaxRequest(url,time,func,info){
//	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=view&kind=1&sub=3&selfuin=852980788";
//	time = 5000;
	$.ajax({
		url: url,
		async:false
	}).done(function(){
		if (info != "") {
			showInfo(info);
		}
		if (func != null) {
			setTimeout(func, time);
		}else{
			showInfo("本次操作完成！");
		}
	});
}

function showInfo(info) {
	$("#infoSpan").html($("#infoSpan").html()+"<br/>"+info);
}

function clearScreen() {
	$("#infoSpan").html("");
}


var begin = function(){
	if(confirm("使用道具吗？")){
		useProduct();
	}else{
		if(confirm("不使用道具，继续吗？")){
			useContributionWater();
		}
	}
};
//使用道具风之息、迅捷珠、大力丸
var useProduct = function () {
	arr = basicData.productArr;
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=use&selfuin=" + currentUser + "&id=" + arr[i++];
		ajaxRequest(url,2000,useProduct,"");
	} else {
		i = 0;
		showInfo("成功使用道具！");
		useContributionWater();
	}
};

//使用贡献药水
var useContributionWater = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=use&selfuin=" + currentUser + "&id=3038";
	ajaxRequest(url,2000,fightBoss,"成功使用贡献药水！");
};

//挑战boss
var fightBoss = function() {
	arr = basicData.bossArr;
	if (i < arr.length) {
		if (i < 3) {
			url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&uin=" + arr[i++];
			ajaxRequest(url,1000,fightBoss,"");
		}else{
			url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&puin=" + arr[i++];
			ajaxRequest(url,1000,fightBoss,"");
		}
	} else {
		i = 0;
		showInfo("成功挑战所有boss！");
		winFirst();
	}
};

//获得首胜
var winFirst = function() {
	var qq = basicData[currentUser].firstObj;
	if (currentUser == "852980788") {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&puin=" + qq;
	} else if (currentUser == "21837726") {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&puin=" + qq;
	} else if (currentUser == "86062487") {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&uin=" + qq;
	} else if (currentUser == "81250726") {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&uin=" + qq;
	}
	
	ajaxRequest(url,500,viewWish,"成功获得首胜！");
};

//查看许愿结果
var viewWish = function(){
	if(i < 3){
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=wish&sub=3";
		ajaxRequest(url,1000,viewWish,"");
	}else{
		i = 0;
		showInfo("成功获得许愿结果！");
		getDailyAward();
	}
};

//领取每日奖励
var getDailyAward = function() {
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=award&op=1&type=0";
	ajaxRequest(url,2000,getExp,"成功领取每日奖励！");
};

//领取经验
var getExp = function() {
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=getexp";
	ajaxRequest(url,500,reinforceStove,"成功领取经验！");
};

//强化丹炉
var reinforceStove= function() {
	arr = basicData.stoveArr;
	
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=alchemy&subtype=4&qquin=" + arr[i++];
		ajaxRequest(url,500,reinforceStove,"");
	} else {
		i = 0;
		showInfo("强化完成！");
		callFriendBack();
	}
};

//召唤好友
var callFriendBack = function() {
	
	arr = basicData[currentUser].callArr;
	
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=callback&subtype=2&opuin=" + arr[i++];
		ajaxRequest(url,500,callFriendBack,"");
	} else {
		i = 0;
		showInfo("成功召唤好友！");
		getEmployee();
	}
};

//获得佣兵
var getEmployee = function() {
	arr = basicData[currentUser].employeeArr;
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=mappush&type=1&npcid=" + arr[i++];
		ajaxRequest(url,500,getEmployee,"");
	} else {
		i = 0;
		showInfo("成功获得佣兵！");
		offer();
	}
};

//帮派供奉
var offer = function() {
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=feeddemo&id="+basicData[currentUser].offerId;
	ajaxRequest(url,500,fightTower,"成功供奉！");
};

//挑战斗神塔
var fightTower = function() {
	
	arr = basicData.towerArr;
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=towerfight&type=" + arr[i++];
		ajaxRequest(url,1000,fightTower,"");
	} else {
		i = 0;
		showInfo("成功挑战斗神塔！");
		fightPre();
	}
};

//挑战副本
var fightPre = function() {
	arr = basicData[currentUser].preArr;
	if(i < 1){
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=pve&sub=1&tuin2=" + arr[0] + "&tuin1=" + arr[1];
		ajaxRequest(url,1000,fightPre,"");
	}else{
		i = 0;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=pve&sub=2";
		ajaxRequest(url,500,makeWish,"成功挑战副本！");
	}
};

//许愿
var makeWish = function() {
	if( i < 3){
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=wish&sub=2";
		ajaxRequest(url,500,makeWish,"");
	}else{
		i =0;
		showInfo("成功许愿！");
		useBag();
	}
};

//使用锦囊
var useBag = function() {
	arr = basicData.bagArr;
	
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=use&selfuin=" + currentUser + "&id=" + arr[i++];
		ajaxRequest(url,500,useBag,"");
		
	} else {
		i = 0;
		showInfo("成功使用锦囊！");
		share();
	}
};

//分享
var share = function() {
	arr = basicData.shareArr;
	
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=shareinfo&subtype=1&shareinfo=" + arr[i++];
		ajaxRequest(url,1000,share,"");
	} else {
		i = 0;
		showInfo("成功分享！");
		getLiveness();
	}
};

//获取活跃度
var getLiveness = function() {
	if(i < 1){
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=liveness&giftbagid=1&action=1";
		ajaxRequest(url,500,getLiveness,"");
	}else{
		i = 0;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=liveness&giftbagid=2&action=1";
		ajaxRequest(url,500,getKungFu,"成功领取活跃度！");
	}
};

//传功
var getKungFu = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=intfmerid&sub=15";
	ajaxRequest(url,500,null,"成功传功！");
};	
//=================================

var fightFriend = function() {
	
	arr = basicData[currentUser].friendArr;
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&" + arr[i++];
		ajaxRequest(url,500,fightFriend,"");
	} else {
		i = 0;
		showInfo("成功乐斗好友！");
		showInfo("本次操作结束！");
	}	
};

//=================================
var isFindMaster = false;
var nextMaster = "";
var prepareForce = function(){
	arr = ["9000","9001","9002","9003","9004"];
	if (!isFindMaster) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=intfmerid&master="+arr[i++]+"&sub=4";
	}else{
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=intfmerid&master="+nextMaster+"&sub=4";
	}
	
	$.ajax({
		url:url,
		async:false,
		dataType:"json"
	}).done(function(data){
		if (data.result == 0 && !isFindMaster) {
			i = 0;
			isFindMaster = true;
			nextMaster = data.next_master;
			setTimeout(prepareForce, 500);
		}else if (data.result == 0) {
			nextMaster = data.next_master;
			setTimeout(prepareForce, 500);
		}else if(!isFindMaster && i < 5){
			setTimeout(prepareForce, 500);
		}else{
			showInfo("内力准备完毕！");
			getForceArr();
		}
	});
	
};

//获得要注入的内力数组，并开始注入
var getForceArr = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=intfmerid&sub=3";
	$.ajax({
		url: url,
		async:false,
		dataType:"json"
	}).done(function(data){
		arr = data.intf_array;
		getOneForce();
	});
};
//拾取一个内力
var getOneForce = function(){
	if (i < arr.length) {
		var id = arr[i].intfid;
		var cult = arr[i++].cur_cult;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=intfmerid&cult="+cult+"&id="+id+"&sub=6";
		ajaxRequest(url,500,injectOneForce,"");
	} else {
		i = 0;
		showInfo("成功注入内力！");
	}
};
//注入一个内力
var injectOneForce = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=intfmerid";
	$.ajax({
		url: url,
		async:false,
		dataType:"json"
	}).done(function(data){
		var injectArr = data.intf_array;
		var param = "&id="+injectArr[0].intfid+"&cult="+injectArr[0].cur_cult+"&idx=0&beid="+injectArr[1].intfid+"&beidx=1&becult="+injectArr[1].cur_cult;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=intfmerid&sub=1"+param;
		ajaxRequest(url,500,getOneForce,"");
	});
};
//==========================
//挑战陌生人
var groupNo = 6;
var fightStranger = function() {
	arr = basicData[currentUser]["strangerArr"+groupNo]; 
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fight&type=4&puin=" + arr[i++];
		ajaxRequest(url,300,fightStranger,"");
	} else {
		i = 0;
		showInfo("成功乐斗第"+groupNo+"组陌生人！");
	}
};
//===============================
//刷丹药
//http://fight.pet.qq.com/cgi-bin/petpk?cmd=alchemy&subtype=7
//http://fight.pet.qq.com/cgi-bin/petpk?cmd=alchemy&subtype=1&qquin=852980788
var prepareRefreshDanYao = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=alchemy&subtype=1&qquin="+currentUser;
	ajaxRequest(url, 500, refreshDanYao, "准备刷丹药！");
};
var subtype = 2;
var refreshDanYao = function(){
	if (i < 10) {
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=alchemy&subtype="+subtype; 
		$.ajax({
			url:url,
			async:false
			//dataType:"json"
		}).done(function(data){
			var dataStr = data;
			showInfo("第"+i+"次");
			showInfo(dataStr);
			data = $.parseJSON(data);
			var isHasPerfect = false;
			arr = data.allelixir;
			for ( var j in arr) {
				if (arr[j].name.indexOf("完美") > -1) {
					showInfo("成功在第"+i+"次刷出丹药！");
					isHasPerfect = true;
					i = 0;
					showInfo("本次操作结束！");
					break;
				}
			}
			
			if (!isHasPerfect) {
				if (data.reflefttime != 0) {
					subtype = 7;
				}else{
					subtype = 2;
				}
				showInfo("第"+(i+1)+"次开始");
				setTimeout(refreshDanYao, 500);
			}
		});
	} else {
		i = 0;
		showInfo("尚未刷出丹药！");
		showInfo("本次操作结束！");
	}
};
//===============================
//查看好友或帮友资料
var visitFriends = function(){
	arr = basicData.visitArr;
	if (i < arr.length) {
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=visit&puin="+arr[i++]+"&kind=1";
		ajaxRequest(url,500,visitFriends,"");
	} else {
		i = 0;
		showInfo("成功查看好友或帮友资料！");
		showInfo("本次操作结束！");
	}
};
//===============================
//完成任务
var getTask = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=task&sub=1&page=0&selfuin="+currentUser;
	$.ajax({
		url: url,
		async : false,
		dataType:"json"
	}).done(function(data){
		arr = [];
		var tempArr = data.tasklist;
		for ( var j in tempArr) {
			if (tempArr[j].status == 2) {
				arr.push(tempArr[j]);
			}
		}
		for ( var j in tempArr) {
			if (tempArr[j].status == 3) {
				arr.push(tempArr[j]);
			}
		}
		finishTask();
	});
};
var finishTask = function(){
	if (i < arr.length) {
		var task = arr[i++];
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=task&sub=4&id="+task.id+"&selfuin="+currentUser;
		ajaxRequest(url,300,finishTask,"");
	} else {
		i = 0;
		showInfo("成功完成任务！");
		viewWar();
	}
};

//查看帮战
var viewWar = function(){
	if (i == 0) {
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=facwarrsp&id=1";
		ajaxRequest(url,300,viewWar,"");
	} else if(i == 1){
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=facwarshow&id=1070301";
		ajaxRequest(url,300,viewWar,"");
	}else{
		i = 0;
		showInfo("成功查看帮战！");
		viewContribution();
	}
};

//查看帮贡
var viewContribution = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factiontask&sub=3";
	ajaxRequest(url,500,viewMine,"成功查看帮贡！");
};

//查看矿洞
var viewMine = function(){
	if (i == 0) {
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=facbless&subtype=4";
		ajaxRequest(url,500,viewMine,"");
	} else if(i == 1){
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factionbigboss&type=1";
		ajaxRequest(url,500,viewMine,"");
	}else{
		i = 0;
		showInfo("成功查看矿洞！");
		finishBangTask();
	}
};

//帮派修炼
//var bangPractice = function(){
//	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factiontrain&type=2&id=2389&times=1";
//	ajaxRequest(url,500,finishBangTask,"成功帮派修炼！");
//};


//完成帮派任务
var finishBangTask = function(){
	if (i == 0) {
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factiontask&sub=1";
		$.ajax({
			url:url,
			async:false,
			dataType:"json"
		}).done(function(data){
			arr = data.array;
			url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factiontrain&type=2&id=2389&times=1";
			ajaxRequest(url, 500, finishBangTask, "成功修炼！");
		});
	} else if(i < arr.length + 1){
		var j = i++ - 1;
		if(arr[j].state == 1){
			url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factiontask&taskid="+arr[j].id+"&sub=2";
			ajaxRequest(url, 500, finishBangTask, "["+arr[j].desc+"]");
		}else{
			setTimeout(finishBangTask, 500);
		}
	}else{
		i = 0;
		showInfo("成功完成帮派任务！");
		showInfo("本次操作结束！");
	}
};

//===============================
//保卫矿洞
//http://fight.pet.qq.com/cgi-bin/petpk?cmd=factionbigboss&npcid=1003&type=2
//http://fight.pet.qq.com/cgi-bin/petpk?cmd=factionbigboss&npcid=1003&type=2
var defendMine = function(){
	if (i < 5) {
		i++;
		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factionbigboss&npcid=1011&type=2";
//		url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factionbigboss&npcid=1003&type=2";
		ajaxRequest(url,60000,defendMine,"保卫了"+i+"次");
	} else {
		i = 0;
		showInfo("成功保卫矿洞！");
		showInfo("本次操作结束！");
	}
};
//===============================
//http://fight.pet.qq.com/cgi-bin/petpk?cmd=element&subtype=6

var getLuckyStone = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=element&subtype=6";
	$.ajax({
		url:url,
		async:false,
		dataType:"json"
	}).done(function(data){
		if (data.achievment <= 500) {
			showInfo("本次获取幸运石操作结束，剩余战功为："+data.achievment);
		}else if(data.result != -1){
			showInfo("剩余战功为："+data.achievment+"--"+data.msg);
			setTimeout(getLuckyStone, 4000);
		}else{
//			
//			http://fight.pet.qq.com/cgi-bin/petpk?cmd=element&subtype=5
			url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=element&gameType=1&subtype=9"; 
			$.ajax({
				url:url,
				async:false
			}).done(function(){
				setTimeout(getLuckyStone, 4000);
			});
			
		}
	});
	
};
//===============================
//获得陌生人
var getStrangers = function(){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=view&kind=1&sub=3&selfuin="+currentUser;
	$.ajax({
		url: url,
		async : false,
		dataType:"json"
	}).done(function(data){
		var info = data.info;
		for(var j in info){
			var user = info[j];
			getStrangerInfo(user.uin);
		}		
	});
};

var getStrangerInfo = function(qq){
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=visit&puin="+qq+"&kind=1";
	$.ajax({
		url: url,
		async :false,
		dataType:"json"
	}).done(function(data){
		
		//没有帮派
		if(data.baseinfo.factionid == 0){
			showInfo("\""+qq+"\",");
		};
		
		//根据战斗力
//		var combat = data.baseinfo.combat/10;
//		if(combat > 100 && combat < 190){
//			showInfo("\""+qq+"\",");
//		}
	});
};

//验证陌生人数据是否有重复
function verifyRepeat(){
	var testArr = [];
	for(var i=1; i<=6; i++){
		testArr = testArr.concat(basicData["strangerArr"+i]);	
	}
	var len = testArr.length;
	for(var j=0;j<len;j++){
		var count = 0;
		for(var k=0;k<len;k++){
			if(testArr[j] == testArr[k]){
				count++;
			}
		}
		if(count > 1){
			showInfo(testArr[j]+":"+count);
		}
	}
}

//换账号
var interval;
var changeAccount = function(){
	var url = "http://ui.ptlogin2.qq.com/cgi-bin/login?link_target=self&qtarget=self&appid=37000201&hide_title_bar=1&s_url=http%3A%2F%2Ffight.pet.qq.com/login.html&f_url=loginerroralert&target=self&qlogin_jumpname=jump&qlogin_param=u1%3Dhttp%3A%2F%2Ffight.pet.qq.com/login.html";
	$("#myFrame").attr("src",url).show();
	interval = setInterval(function(){
		var html =  $("#myFrame").contents().find("body").html().replace(/\s*/,"");
		if(html == ""){
			clearInterval(interval);
			window.location.reload();
		}
	}, 500);
};



//===============================

var testUrl = function(){
//	获取问题
//	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=question&sub=1";
//	回答问题
//	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=question&sub=2&question_id=162&option_id=3";
//	传功
//	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=intfmerid&master=9000&sub=4";
	
//	查看被动经验
//	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=fengyun2&gb_id=23";
	
//	保卫矿洞
//	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=factionbigboss&npcid=1011&type=2";
	
	url = "http://fight.pet.qq.com/cgi-bin/petpk?cmd=element&subtype=5";
	
	$.ajax({
		url:url,
		async:false
	}).done(function(data){
		showInfo(data);
	});
};

//===============================

$(function(){

	var cookieStr = document.cookie;
	var cookieArr = cookieStr.split("; ");
	for(var i=0;i < cookieArr.length;i++){
		var arr = cookieArr[i].split("=");
		if(arr[0] == "pt2gguin"){
			currentUser = arr[1].replace(/o00/,"").replace(/o0/,"");
		} 
	}
	
	//temp
//	$("body").attr("id","1").css("background","url(http://d.pcs.baidu.com/thumbnail/2ef26bcf75c262179c9a8fc3f7c7f09d?fid=2199888009-250528-3898628377&time=1386894129&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-Do2ARzrCT1CAOYR6GhylRyEEPmw%3D&expires=8h&prisign=amMwnVibYf88f2TB/V4FApSN5rJwOqzRd3VKNKTQ53AEKBJxWcpoynuTla4JYtT5jp7AQaNVV5Lqj2Vc4+cIcc2I5eL0EqjxyWhMpwg9WvNnnDAJu2izIY/fe9aSmqP0AC5A8VviSQvcyUtxR5NKO1Yzjf5gFxQ1N9Q8kzHrwbi8FYay9s9KpA==&r=795583056&size=c10000_u10000&quality=100)");
//	document.title= "my javascript";
	
    var fightmain = $("#fightmain");
    var petfightmain = $("#petfightmain");
    
	fightmain.append("<div id='myDiv'></div>");
	var div = $("#myDiv");
	
	//temp
//	petfightmain.css("display","none");   
//	fightmain.css("background","url(http://c.hiphotos.bdimg.com/album/w%3D1600%3Bq%3D90/sign=6c907df70d2442a7ae0ef9a3e173963a/faf2b2119313b07e3841177c0ed7912396dd8cc2.jpg)");
	
	
	
	div.css({top:10,left:1100,position:"absolute","z-index":1000});
    div.append("<input type='button' value=' 开  始 ' id='btnBegin' />&nbsp;&nbsp;&nbsp;");
    div.append("<input type='button' value='乐斗好友' id='btnFight' /><br/><br/>");
    div.append("<input type='button' value='完成任务' id='btnGetTask' />&nbsp;&nbsp;&nbsp;");
    div.append("<input type='button' value='刷新丹药' id='btnRefreshDanYao' />");
    
    div.append("<br/><br/><br/>");
    
    div.append("<input type='button' value='查看资料' id='btnVisitFriends'/>&nbsp;&nbsp;&nbsp;");
    div.append("<input type='button' value='挑战生人' id='btnFightStr'/><br/><br/>");
    div.append("<input type='button' value='夺宝奇兵' id='btnGetLuckyStone'/>&nbsp;&nbsp;&nbsp;");
    
    div.append("<br/><br/><br/>");
    
    div.append("<input type='button' value='保卫矿洞' id='btnDefendMine'/>&nbsp;&nbsp;&nbsp;");
    div.append("<input type='button' value='注入内力' id='btnInject'/><br/><br/>");
    div.append("<input type='button' value='获取生人' id='btnStranger' />&nbsp;&nbsp;&nbsp;");
    div.append("<input type='button' value='测试按钮' id='btnTestUrl'/>");
    
    div.append("<br/><br/><br/>");
    div.append("<input type='button' value='清屏' id='btnClearScreen' />&nbsp;&nbsp;&nbsp;");
    div.append("<input type='button' value='换账号' id='btnChangeAccount'/><br/><br/>");
    
    div.append("<span style='color: blue;font: bold;' id='infoSpan'></span>");
    
    div.append("<iframe id='myFrame' name='myFrame' style='display:none;' width='30%' ></iframe>");
    
    
	var btCss = {"background":"url(http://fightimg.pet.qq.com/images/mercenary_btns.jpg)  repeat scroll 0 0 rgba(0, 0, 0, 0)", "height":23,"width":80 };
    $("input[id^=btn]").css(btCss);
    $("#btnBegin").click(begin);
    $("#btnFight").click(fightFriend);
    $("#btnFightStr").click(fightStranger);
    $("#btnGetLuckyStone").click(getLuckyStone);
    $("#btnChangeAccount").click(changeAccount);
//    $("#btnInject").click(getForceArr);
    $("#btnInject").click(prepareForce);
    $("#btnVisitFriends").click(visitFriends);
    $("#btnStranger").click(getStrangers);
    $("#btnDefendMine").click(defendMine);
    $("#btnGetTask").click(getTask);
    $("#btnRefreshDanYao").click(prepareRefreshDanYao);
    $("#btnTestUrl").click(testUrl);
    
    $("#btnClearScreen").click(clearScreen);
    

});



