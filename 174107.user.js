// ==UserScript==
// @name           tieba_filter_someone
// @description    贴吧循环封
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/tb*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.8.6.0
// ==/UserScript==


//脚本的实际运行条件：
//1、只在你指定的贴吧执行；
//2、你的登录ID与脚本里指定的吧主ID一致，才会执行；
//3、日期与上次执行时不同，才会执行；（确保在黑名单没有改动的情况下，每天只执行一次）
//4、脚本中的黑名单与上一次执行的名单不一致时，再次执行。（方便你随时添加和更改）
//所以，脚本中的示例，即使不作修改也不会造成任何负担，因为你的登录ID与其不符，所以它不会执行。
//这样设计的目的，就是避免脚本在不符合条件的贴吧里执行，毕竟对任何人来说，在绝大多数的贴吧里我们都不是吧主。


//这里是修改区，请按相同格式修改或添加即可
someOne = {
	"雨滴在心头" : { //此为贴吧名
		"BaZhu_ID" : "坐怀则乱", //吧主ID
		"blackList" : ["jstester", "度娘节操"] //黑名单
	}, //这里的逗号用于隔开两个吧的数据，很重要，如果要添加更多的吧，同样要用逗号隔开，不能漏掉
	"firefox" : { //此为贴吧名
		"BaZhu_ID" : "文科980195412", //吧主ID
		"blackList" : ["文科", "ABC"] //黑名单
	}
};




//*********!!!!以下部分，请不要修改!!!!*********


//今天的日期
var yuy = new Date();
var fulltime = yuy.toLocaleString().replace(/\s.*/, "");

//当前用户
var userName = unsafeWindow.PageData.user.name;

//当前吧的Fid和Fname
var forum_id = unsafeWindow.PageData.forum.forum_id;
var forum_name = unsafeWindow.PageData.forum.forum_name;

//读取localStorage
var filterToday = JSON.parse((localStorage["filterToday"]) ? localStorage["filterToday"] : "{}");
if (!filterToday[forum_name]) {
	filterToday[forum_name] = {};
	filterToday[forum_name].blackList = [];
	filterToday[forum_name].BaZhu_ID = "";
}

//逐一屏蔽函数
function goFilterOneByOne(nn, lp) {
	var postData = "cm=filter_forum_user&user_name=" + someOne[forum_name].blackList[nn] + "&ban_days=1&word=" + forum_name + "&fid=" + forum_id + "&ie=utf-8";
	var urll = "http://tieba.baidu.com/bawu/cm";
	setTimeout(function () {
		GM_xmlhttpRequest({
			method : 'POST',
			synchronous : false,
			headers : {
				"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
				"cookie" : document.cookie
			},
			url : urll,
			data : encodeURI(postData),
			onload : function (reText) {
				var reTextTxt = JSON.parse(reText.responseText);
				if (reTextTxt.error.errmsg == "") {
					console.log(fulltime + " 封禁 " + someOne[forum_name].blackList[nn] + " 成功!");
				} else {
					console.log(fulltime + " 封禁 " + someOne[forum_name].blackList[nn] + " 不成功!");
				}
				if (nn == lp) {
					filterToday.date = fulltime;
					filterToday[forum_name].BaZhu_ID = userName;
					filterToday[forum_name].blackList = someOne[forum_name].blackList;
					localStorage["filterToday"] = JSON.stringify(filterToday);
					console.log(fulltime + " 坏蛋全部封禁完毕！");
				} else {
					ns = nn + 1;
					goFilterOneByOne(ns, lp); //自调用，顺序循环
				}
			}
		})
	}, 1000);
}

if (someOne[forum_name] && someOne[forum_name].BaZhu_ID == userName && (filterToday.date != fulltime || filterToday[forum_name].blackList.toString() != someOne[forum_name].blackList.toString())) {
	goFilterOneByOne(0, someOne[forum_name].blackList.length - 1);
}
