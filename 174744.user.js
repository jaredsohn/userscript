// ==UserScript==
// @name           CTBUtieba
// @description    CTBU贴吧专用
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/tb*
// @icon           
// @author         雕哩
// @version        2013.8.1
// ==/UserScript==


//黑名单 屏蔽对象
someone = ["小山的受"];

//白马甲 不想执行屏蔽的小号名单 比如“CTBU”就是我的一个小号
whiteUserIds = ["CTBU"];



/*************以下不在随便改动**************/
//今天的日期
var yuy = new Date();
var fulltime = yuy.toLocaleString().replace(/\s.*/, "");

//当前用户
var userName = unsafeWindow.PageData.user.name;

var HideToday = JSON.parse((localStorage["HideToday"]) ? localStorage["HideToday"] : "{}");
var frd = (HideToday.userId) ? HideToday.userId : [];

//逐一屏蔽函数
function goHideOneByOne(nn, lp) {
	var postData = "type=1&hide_un=" + someone[nn] + "&ie=utf-8";
	var urll = "http://tieba.baidu.com/tphide/add";
	setTimeout(function () {
		GM_xmlhttpRequest({
			method : 'POST',
			synchronous : false,
			headers : {
				"Accept" : "application/json, text/javascript",
				"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
				"cookie" : document.cookie
			},
			url : urll,
			data : encodeURI(postData),
			onload : function (reText) {
				var reTextTxt = JSON.parse(reText.responseText);
				console.log(fulltime + " 屏蔽 " + someone[nn] + " " + reTextTxt.msg);
				if (nn == lp) {
					HideToday.date = fulltime;
					HideToday.blackList = someone;
					if (frd.indexOf(userName) == -1) {
						ree = frd.push(userName);
					}
					HideToday.userId = frd;
					localStorage["HideToday"] = JSON.stringify(HideToday);
					console.log(fulltime + " 眼中钉全部屏蔽完毕！");
					window.location = window.location.href;
				} else {
					ns = nn + 1;
					goHideOneByOne(ns, lp); //自调用，顺序循环
				}
			}
		})
	}, 1000);
}

if (whiteUserIds.indexOf(userName) == -1 && (HideToday.date != fulltime || HideToday["blackList"].toString() != someone.toString() || frd.indexOf(userName) == -1)) {
	goHideOneByOne(0, someone.length - 1);
}
