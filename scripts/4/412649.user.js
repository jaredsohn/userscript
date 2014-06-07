// ==UserScript==
// @name        Tieba Info Helper
// @namespace   FireAway
// @description  基于@noe132 https://userscripts.org/scripts/source/156203.user.js 修改版 支持统一的消息提示和取消 右下角的红色叹号表示有消息 组合键Crtl+Alt+Shift+Enter可设置刷新延时
// @version    4
// @include     http://*
// @include     https://*
// @exclude http://tieba.baidu.com/*
// @updateURL      https://userscripts.org/scripts/source/412649.meta.js
// @downloadURL    https://userscripts.org/scripts/source/412649.user.js
// @require                http://firebfp.duapp.com/JS/jq.js
// @run-at document-end
// ==/UserScript==
var interval;
var TIH_AJ;
var isContinue = true;
var i = 0;
var time = parseInt(localStorage.getItem('TIH_Delay')) || 5000; //刷新状态间隔

//下一行改成 var log = true; 可以开启中二模式
var log = false;
//上一行改成 var log = true; 可以开启中二模式
var client = function(){
	var UA = navigator.userAgent.toLowerCase();
	if(UA.indexOf("firefox") > -1){
		return "firefox";
	}else {
		return "chrome";
	}
}
var TIH_log = function(e) {
	if (log) {
		console.log(e);
	}
}
initItiebaMessage = function(e) {
	ini.getInfo(e);
}
done = function() {
	TIH_log("成功清除所有消息...继续更新");
	isContinue = true;
	DomUtils.deleteAll();
	ini.clearAll();
	ini.Dom();
}

var DomUtils = {
	domCreator: function(type, id) {
		var obj = DomUtils.domFinder(id) || document.createElement(type);
		obj.id = id;
		return obj;
	},
	domFinder: function(anything) {
		var flag = anything.id || anything.className || anything.tagName || anything;
		var dom = document.getElementById(flag) || document.getElementsByClassName(flag)[0] || document.getElementsByTagName(flag)[0] || false;
		return dom;
	},
	listFinder: function(classOrTag) {
		var domList = document.getElementsByClassName(classOrTag).length == 0 ? document.getElementsByTagName(classOrTag).length == 0 ? [] : document.getElementsByTagName(classOrTag) : document.getElementsByClassName(classOrTag);
		return domList;
	},
	addEvent: function(eventTarget, eventType, eventHandler) {
		if (eventTarget.addEventListener) {
			eventTarget.addEventListener(eventType, eventHandler, false);
		} else {
			if (eventTarget.attachEvent) {
				eventType = "on" + eventType;
				eventTarget.attachEvent(eventType, eventHandler);
			} else {
				eventTarget["on" + eventType] = eventHandler;
			}
		}
	},
	appender: function() {
		var father = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			if (DomUtils.domFinder(arguments[i].id)) {
				try {
					father.removeChild(arguments[i]);
				} catch (e) {
					TIH_log("错误信息" + e);
					TIH_log(father.tagName);
					TIH_log(arguments[i].id);
				}
			}
			father.appendChild(arguments[i]);
		};
	},
	hideAll: function() {
		// DomUtils.domFinder("TIH_hintdiv").className = "hide";
		DomUtils.domFinder("TIH_maindiv").className = "hide";
		DomUtils.domFinder("TIH_info").className = "TIH_info hide";
        isContinue = true;
	},
	showAll: function() {
		// DomUtils.domFinder("TIH_hintdiv").className = "show";
		DomUtils.domFinder("TIH_maindiv").className = "show";
		DomUtils.domFinder("TIH_info").className = "TIH_info show";
	},
	deleteAll: function() {
		// document.body.removeChild(DomUtils.domFinder("TIH_hintdiv"));
		document.body.removeChild(DomUtils.domFinder("TIH_maindiv"));
        isContinue = true;
	},
	clearScript: function() {
		var i = 0;
		TIH_log("清理多余信息中...");
		var scriptList = DomUtils.listFinder("script");
		TIH_log("共有" + scriptList.length + "条信息 检查多余项中");
		for (var i = 0; i < scriptList.length - 1; i++) {
			var src = scriptList[i].src;
			if (src.indexOf("initItiebaMessage") > -1) {
				i++;
				scriptList[i].parentNode.removeChild(scriptList[i]);
			}
		}
		TIH_log("清理完毕...共清理" + i + "条信息");
	}
}

var ini = {
	isIframe: self.frameElement && self.frameElement.tagName == "IFRAME",
	Dom: function() {
		if (isContinue) {
			var url = "http://message.tieba.baidu.com/i/msg/get_data";

			var TIH_Style = DomUtils.domCreator("style", "TIH_Style");
			TIH_Style.innerHTML = ".hide {\
							display: none;\
						}\
						.show {\
							display: block;\
						}\
						#TIH_hintdiv {\
							z-index: 99;\
							font-family: Tahoma;\
							line-height: 23px;\
							position: fixed;\
							bottom: 23px;\
							right: 0px;\
							font-weight: bolder;\
							color: red;\
							text-align: left;\
							margin: 0px 5px;\
							font-size: 17px;\
							text-indent: 7px\
						}\
						.TIH_contentLink {\
							position: fixed;\
							background: -moz-linear-gradient(rgba(234, 236, 239, 0.93), rgba(226, 229, 233, 0.93));\
							background: -webkit-linear-gradient(rgba(234, 236, 239, 0.93), rgba(226, 229, 233, 0.93));\
							background: rgba(235, 235, 235, 0.8);\
							box-shadow: 0 0 3px rgb(153, 153, 153);\
							border: 1px solid rgb(128, 128, 128);\
							height: 25px;\
							width: 140px;\
							margin: 0px 0px 0px -9px;\
							line-height: -15px;\
							padding: 0px 0px 0px 10px;\
							right: -160px;\
							-moz-transition: 0.4s ease all;\
							-webkit-transition: 0.4s ease all;\
							opacity: 0.1;\
						}\
						.TIH_contentLink:hover {\
							background: rgb(255, 255, 170);\
						}\
						#TIH_maindiv:before {\
							content: '!';\
							font-family: Tahoma;\
							line-height: 23px;\
							position: fixed;\
							bottom: 23px;\
							right: 0px;\
							font-weight: bolder;\
							color: rgb(255, 0, 0);\
							margin: 0px 5px;\
							font-size: 17px;\
						}\
						#TIH_maindiv {\
							font-family: Tahoma;\
							height: 27px;\
							position: fixed;\
							bottom: 20px;\
							right: -134px;\
							z-index: 1000;\
							border: 1px solid gray;\
							padding: 0;\
							background: -moz-linear-gradient(rgba(234, 236, 239, 0.93), rgba(226, 229, 233, 0.93));\
							background: -webkit-linear-gradient(rgba(234, 236, 239, 0.93), rgba(226, 229, 233, 0.93));\
							background: rgba(235, 235, 235, 0.8);\
							box-shadow: 0 0 3px #999;\
							width: auto;\
							min-width: 150px;\
							-moz-transition: 0.4s ease all;\
							-webkit-transition: 0.4s ease all;\
							opacity: 0.3;\
						}\
						#TIH_maindiv:hover {\
							min-width: 0px;\
							width: 0px;\
							right: 20px;\
							opacity: 1;\
							border: none;\
							background: none;\
						}\
						#TIH_maindiv:hover .TIH_contentLink {\
							right: 0px;\
							opacity: 1;\
						}\
						#TIH_maindiv:hover #TIH_closebtn {\
							right: 0px;\
							opacity: 1;\
						}\
						.TIH_info {\
							width: 100px;\
							position: relative;\
							top: -22px;\
							height: 27px;\
							line-height: 27px;\
							padding: 0 8px;\
							border-bottom: 1px solid gray;\
							opacity: 1;\
						}\
						.TIH_info:last-child {\
							border: none;\
						}\
						.TIH_info a {\
							bottom: 20px;\
						}\
						.TIH_info a+a {\
							bottom: 48px;\
						}\
						.TIH_info a+a+a {\
							bottom: 76px;\
						}\
						.TIH_info a+a+a+a {\
							bottom: 104px;\
						}\
						.TIH_info a+a+a+a+a {\
							bottom: 132px;\
						}\
						.TIH_info a+a+a+a+a+a {\
							bottom: 160px;\
						}\
						#TIH_maindiv span,\
						#TIH_maindiv a,\
						#TIH_maindiv a span {\
							font-size: 14px;\
							color: #111;\
							height: 27px;\
							line-height: 27px;\
							float: left;\
							text-decoration: none;\
							font-weight: normal;\
						}\
						#TIH_closebtn {\
							cursor: pointer;\
							text-align: center;\
							position: relative;\
							top: 1px;\
							right: -130px;\
							background: none;\
							margin: 0;\
							padding: 0;\
							height: 20px;\
							width: 20px;\
							font-size: 20px;\
							line-height: 18px;\
							font-family: Tahoma;\
							color: #111;\
							z-index: 1;\
						}";

			// var TIH_hintdiv = DomUtils.domCreator("div", "TIH_hintdiv");
			// TIH_hintdiv.innerHTML = "!";

			var TIH_maindiv = DomUtils.domCreator("div", "TIH_maindiv");

			var TIH_closebtn = DomUtils.domCreator("div", "TIH_closebtn");
			TIH_closebtn.innerHTML = "x";

			DomUtils.appender(document.head, TIH_Style);
			DomUtils.appender(document.body, TIH_maindiv);
			// DomUtils.appender(document.body, TIH_hintdiv, TIH_maindiv);
			DomUtils.appender(TIH_maindiv, TIH_closebtn);

			// DomUtils.addEvent(TIH_hintdiv, "mouseover", function() {
			// 	TIH_log("消息查看中...暂停更新");
			// 	isContinue = false;
			// });
			// DomUtils.addEvent(TIH_hintdiv, "mouseout", function() {
			// 	TIH_log("消息查看完毕...继续更新");
			// 	isContinue = true;
			// });
			DomUtils.addEvent(TIH_maindiv, "mouseover", function() {
				TIH_log("消息查看中...暂停更新");
				isContinue = false;
			});
			DomUtils.addEvent(TIH_maindiv, "mouseout", function() {
				TIH_log("消息查看完毕...继续更新");
				isContinue = true;
			});
			DomUtils.addEvent(TIH_closebtn, "click", function() {
				TIH_log("成功清除所有消息...继续更新");
				isContinue = true;
				DomUtils.deleteAll();
				ini.clearAll();
				ini.Dom();
			});

			TIH_log("初始化完成 获取信息中...");
			if (TIH_AJ != "CompatibleMode") {
				ini.startTIH(url);
			} else {
				ini.startCompatibleMode(url);
			}
		}
	},
	startTIH: function(url) {
		TIH_AJ({
			type: "get",
			async: false,
			url: url,
			dataType: "jsonp",
			jsonp: "initItiebaMessage",
			jsonpCallback: "initItiebaMessage",
			success: function(json) {
				TIH_log("成功获取贴吧提醒信息 正在处理...");
				ini.getInfo(json);
			},
			error: function(e) {
				TIH_log("信息处理结束 结果为:"+e.statusText);
                //TIH_log(e);
			}
		});
	},
	startCompatibleMode: function(url) {
		// var TIH_frame = DomUtils.domCreator("iframe", "TIH_frame");
		// TIH_frame.src = "http://message.tieba.baidu.com/i/msg/get_data";
		// var d = DomUtils.domCreator("div", "d");
		// TIH_frame.setAttribute("onload", "");
		// DomUtils.appender(document.body, TIH_frame);
		// TIH_log("iframe搭建完毕");
		// var url = "http://message.tieba.baidu.com/i/msg/get_data";
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(response) {
				var json = response.responseText;
				json = json.replace(/initItiebaMessage/g, "");
				json = json.replace(/;/g, "");
				json = json.replace(/\(/g, "");
				json = json.replace(/\)/g, "");
				json = JSON.parse(json);
				ini.getInfo(json);
			}
		});
	},
	getInfo: function(e) {
		var y = 0;
		for (x in e) {
			y = y + e[x];
			if (e[x] != 0) {
				ini.addinfo(x, e[x]);
			}
		}
		if (parseInt(y) == 0) {
			TIH_log("信息处理完毕 没有新的提醒");
			DomUtils.hideAll();
		} else {
			TIH_log("信息处理完毕 你有新的提醒");
			DomUtils.showAll();
		}
		DomUtils.clearScript();
	},
	addinfo: function(x, num) {
		if (x == 0 || x == 3 || x == 4 || x == 8 || x == 9 || x == 11 || x == 19) {
			x = parseInt(x);
			x = x + 1;
			var TIH_info = DomUtils.domCreator("div", "TIH_info");
			TIH_info.className = "TIH_info";
			TIH_info.setAttribute("type", x);

			var TIH_num = DomUtils.domCreator("span", "TIH_num" + x);
			TIH_num.innerHTML = num + "个";

			var TIH_contentLink = DomUtils.domCreator("a", "TIH_contentLink" + x);
			var TIH_content = DomUtils.domCreator("span", "TIH_content" + x);

			TIH_contentLink.target = "_blank";
			TIH_contentLink.className = "TIH_contentLink";
			// TIH_contentLink.setAttribute("onclick", "this.parentNode.removeChild(this)");
			DomUtils.addEvent(TIH_contentLink,"click",function(e){
				var p = this.parentNode;
				p.removeChild(this);
				if(p.childNodes.length == 0){
					DomUtils.hideAll();
				}
			});

			if (x == 1) {
				TIH_contentLink.setAttribute("type", 1);
				TIH_contentLink.href = "http://tieba.baidu.com/i/sys/jump?&type=fans";
				TIH_content.innerHTML = "新粉丝";
			}
			if (x == 4) {
				TIH_contentLink.setAttribute("type", 4);
				TIH_contentLink.href = "http://tieba.baidu.com/i/sys/jump?&type=replyme";
				TIH_content.innerHTML = "新回复";
			}
			if (x == 5) {
				TIH_contentLink.setAttribute("type", 5);
				TIH_contentLink.href = "http://tieba.baidu.com/i/sys/jump?&type=feature";
				TIH_content.innerHTML = "新精品";
			}
			if (x == 9) {
				TIH_contentLink.setAttribute("type", 9);
				TIH_contentLink.href = "http://tieba.baidu.com/i/sys/jump?&type=atme";
				TIH_content.innerHTML = "@提到我";
			}
			if (x == 10) {
				TIH_contentLink.setAttribute("type", 10);
				TIH_contentLink.href = "http://tieba.baidu.com/i/sys/jump?&type=recycle";
				TIH_content.innerHTML = "回收站提醒";
			}
			if (x == 12) {
				TIH_contentLink.setAttribute("type", 12);
				TIH_contentLink.href = "http://tieba.baidu.com/tbmall/message";
				TIH_content.innerHTML = "T豆商城信息";
			}
			if (x == 20) {
				TIH_contentLink.setAttribute("type", 20);
				TIH_contentLink.href = "http://tieba.baidu.com/i/sys/jump?&type=storethread";
				TIH_content.innerHTML = "收藏贴有更新";
			}

			var TIH_maindiv = DomUtils.domFinder("TIH_maindiv");

			DomUtils.appender(TIH_maindiv, TIH_info);
			DomUtils.appender(TIH_info, TIH_contentLink);
			DomUtils.appender(TIH_contentLink, TIH_num);
			DomUtils.appender(TIH_contentLink, TIH_content);

			// var index = document.getElementsByClassName("TIH_contentLink").length;
			// if (!eval(TIH_contentLink.getAttribute("isExist"))) {
			// 	TIH_contentLink.style.bottom = (((index - 1) * 28) + 20) + "px";
			// 	TIH_contentLink.setAttribute("isExist", "true");
			// }
		}
		TIH_log("处理完毕 提醒已经显示");
	},
	clearAll: function() {
		TIH_AJ({
			type: "get",
			async: false,
			url: "http://message.tieba.baidu.com/i/msg/clear_data?type=1",
			dataType: "jsonp",
			jsonp: "done",
			jsonpCallback: "done",
		});
		TIH_AJ({
			type: "get",
			async: false,
			url: "http://message.tieba.baidu.com/i/msg/clear_data?type=4",
			dataType: "jsonp",
			jsonp: "done",
			jsonpCallback: "done",
		});
		TIH_AJ({
			type: "get",
			async: false,
			url: "http://message.tieba.baidu.com/i/msg/clear_data?type=5",
			dataType: "jsonp",
			jsonp: "done",
			jsonpCallback: "done",
		});
		TIH_AJ({
			type: "get",
			async: false,
			url: "http://message.tieba.baidu.com/i/msg/clear_data?type=9",
			dataType: "jsonp",
			jsonp: "done",
			jsonpCallback: "done",
		});
		TIH_AJ({
			type: "get",
			async: false,
			url: "http://message.tieba.baidu.com/i/msg/clear_data?type=10",
			dataType: "jsonp",
			jsonp: "done",
			jsonpCallback: "done",
		});
		TIH_AJ({
			type: "get",
			async: false,
			url: "http://message.tieba.baidu.com/i/msg/clear_data?type=12",
			dataType: "jsonp",
			jsonp: "done",
			jsonpCallback: "done",
		});
		TIH_AJ({
			type: "get",
			async: false,
			url: "http://message.tieba.baidu.com/i/msg/clear_data?type=20",
			dataType: "jsonp",
			jsonp: "done",
			jsonpCallback: "done",
		});
	}
}

function prepare(){
        var checkJquery = self.setInterval(function() {
        if (!ini.isIframe) {
            TIH_AJ = (typeof jQuery == 'undefined') ? (typeof $ == 'undefined') ? "noJQ" : $.ajax ? $.ajax : "notJQ" : jQuery.ajax;
            i++;
            if (TIH_AJ == "noJQ") {
                TIH_log("无Jquery脚本 新建中...");
                var TIH_jQ = document.createElement("script");
                TIH_jQ.src = "http://firebfp.duapp.com/JS/jq.js";
                document.head.appendChild(TIH_jQ);
            } else if (TIH_AJ == "notJQ") {
                TIH_log("$符号冲突 启动兼容模式");
                TIH_AJ = "CompatibleMode";
                window.clearInterval(checkJquery);
                ini.Dom();
            } else if (i > 50) {
                TIH_log("无Jquery脚本或载入失败 新建中...");
                var TIH_jQ = document.createElement("script");
                TIH_jQ.src = "http://firebfp.duapp.com/JS/jq.js";
                document.head.appendChild(TIH_jQ);
            } else if (TIH_AJ) {
                TIH_log("jQuery载入成功 开始初始化");
                window.clearInterval(checkJquery);

                if(client() == "firefox"){
                    TIH_AJ = "CompatibleMode";
                    TIH_log("检测到浏览器是火狐 启动兼容模式");
                }
                interval = self.setInterval(ini.Dom, time);
                // ini.Dom();
            }
        }
    }, time);
}

document.onreadystatechange = function() {
		if (document.readyState == "complete") {
            TIH_log("当前刷新间隔为:" + (time / 1000) + "秒");
			prepare();
		}
	}

document.onkeydown = function(e) {
	if (e.keyCode == 13 && e.ctrlKey && e.shiftKey && e.altKey) {
		var delay = prompt("请输入要设置的延迟间隔 立即生效 单位是秒 例如:5", 5);
		if (delay != null && delay != "" && parseInt(delay)) {
			delay = parseInt(delay) * 1000;
			localStorage.setItem("TIH_Delay", delay);
		} else {
			localStorage.setItem("TIH_Delay", 5000);
			alert("输入有误 已自动设置为默认值5秒");
		}
		time = parseInt(localStorage.getItem('TIH_Delay')) || 5000; //重设刷新间隔
        TIH_log("当前刷新间隔为:" + (time / 1000) + "秒");
		window.clearInterval(interval);
		prepare();
	}
};
