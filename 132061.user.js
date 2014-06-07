// ==UserScript==
// @name           tieba_hide_someone
// @description    屏蔽某些人的帖子
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/tb*
// @exclude        http://tieba.baidu.com/mo/*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2014.1.19.0
// ==/UserScript==


//黑名单 屏蔽对象
someone = ["坏人甲", "坏人乙"];

//白马甲 不想执行屏蔽的小号名单 比如“文科980195412”就是我的一个小号 我用此小号登录时不想对坏人进行屏蔽，那就象下面这样设置下
whiteUserIds = ["文科980195412", "xyz"];

/*************以下不在随便改动**************/
//今天的日期
var yuy = new Date();
var fulltime = yuy.toLocaleDateString();
var $ = unsafeWindow.$;

//当前用户
var userName = unsafeWindow.PageData.user.name;

var HideToday = JSON.parse((localStorage["HideToday"]) ? localStorage["HideToday"] : "{}");
var frd = (HideToday.userId) ? HideToday.userId : [];

function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
	var animName = "anilanim",
	prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
	eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	if (!noStyle) {
		var css = elCssPath + "{",
		css2 = "";
		forEach(prefixList, function (prefix) {
			css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
			css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
		});
		css += "}" + css2;
		GM_addStyle(css);
	}
	if (handler) {
		var bindedFunc = function (e) {
			var els = document.querySelectorAll(elCssPath),
			tar = e.target,
			match = false;
			if (els.length !== 0) {
				forEach(els, function (el) {
					if (tar === el) {
						if (executeOnce) {
							removeNodeInsertedListener(bindedFunc);
						}
						handler.call(tar, e);
						return;
					}
				});
			}
		};
		forEach(eventTypeList, function (eventType) {
			document.addEventListener(eventType, bindedFunc, false);
		});
		return bindedFunc;
	}
}
//移除精确监听
function removeNodeInsertedListener(bindedFunc) {
	var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	forEach(eventTypeList, function (eventType) {
		document.removeEventListener(eventType, bindedFunc, false);
	});
}


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
					if (HideToday.date != fulltime) {
						HideToday = {};
						frd = [];
					}
					HideToday.date = fulltime;
					HideToday.blackList = someone;
					if (frd.indexOf(userName) == -1) {
						ree = frd.push(userName);
					}
					HideToday.userId = frd;
					localStorage["HideToday"] = JSON.stringify(HideToday);
					console.log(fulltime + " 眼中钉全部屏蔽完毕！");
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
if (whiteUserIds.indexOf(userName) == -1) {
	addNodeInsertedListener(".j_thread_list", function () {
		var Lhtml = $(this).find(".tb_icon_author").attr("title").match(/.*[:：]\s?(.*)/)[1];
		if (someone.indexOf(Lhtml) != -1) {
			$(this).remove();
		}
	});
	addNodeInsertedListener(".feed_item", function () {
		var iUserIdhtml = $(this).find(".atme_user>a,.replyme_user>a").html().match(/(.*)(?=：)/)[1] ;
		if (someone.indexOf(iUserIdhtml) != -1) {
			$(this).remove();
		}
	});
}