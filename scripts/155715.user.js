// ==UserScript==
// @name        NotificationSMSSender
// @namespace   NotificationSMSSender
// @description Send notifications provided by web pages to your phone via Fetion Service.
// @include     http://web.qq.com/
// @include     http://*.renren.com/*
// @version     1.5.2
// @grand       unsafeWindow
// @grand       GM_xmlhttpRequest
// @grand       GM_getValue
// @grand       GM_setValue
// @grand       GM_deleteValue
// ==/UserScript==

var username = GM_getValue("username");
var password = GM_getValue("password");

if (!username) {
	GM_setValue("username", username = prompt("手机号："));
}
if (!password) {
	GM_setValue("password", password = prompt("飞信密码："));
}


var isJustMessageSent = false;

var messages = [];

setInterval(function () {
	isJustMessageSent = false;
	if (messages.length > 0) {
		fx.sendMessageToMyself(messages.join("-----") + "(" + document.domain + ")");
		messages.length = 0;
	}
}, 5000);

var fx;

(function (targetObj, obj) {
	for (var name in obj) {
		targetObj[name] = obj[name];
	}
})(unsafeWindow.webkitNotifications = unsafeWindow.webkitNotifications || { }, {
	requestPermission: function () {
		console.log("requestPermission invoked");
	},

	checkPermission: function () {
		return 0;
	},

	createNotification: function (icon, title, body) {
		var titleText = title;
		var bodyText = body;

		return {
			show: function () {
				messages.push(titleText + ": " + bodyText);			
			}
		};
	}
});


var Fetion = (function () {

	var Fetion_headers = {
		"Referer": "http://f.10086.cn/im5/login/login.action",
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
	};

	function Fetion(userName, pass) {
		this.username = userName;
		this.password = pass;
		this.isLoggedIn = false;
	}
	
	Fetion.prototype.login = function (callback) {
		if (GM_getValue("loggedIn")) {
			this.userId = GM_getValue("userId");
			if (callback) {
				callback(responseJSON);
			}
			return;
		}
	
		var thisObj = this;
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://f.10086.cn/im5/login/loginHtml5.action",
			data: "m=" + encodeURIComponent(this.username) + "&pass=" + encodeURIComponent(this.password) + "&captchaCode=&checkCodeKey=null",
			headers: Fetion_headers,
			onload: function (response) {
				var responseJSON;
				try {
					responseJSON = JSON.parse(response.responseText);
					thisObj.userId = responseJSON["idUser"];
					thisObj.isLoggedIn = (thisObj.userId.length > 0);
					if (thisObj.isLoggedIn) {
						GM_setValue("loggedIn", true);
						GM_setValue("userId", thisObj.userId);
					}
				}
				catch (e) {
					thisObj.isLoggedIn = false;
				}
				
				if (callback) {
					callback(responseJSON);
				}
			}
		});
	};
	
	Fetion.prototype.sendMessageToMyself = function (text, callback) {
		var content = text.replace(/\n/g, ';').replace(/\r/g, '');
		var postData = "msg=" + encodeURIComponent(content) + "&touserid=," + encodeURIComponent(this.userId);
		var thisObj = this;
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://f.10086.cn/im5/chat/sendNewGroupShortMsg.action",
			data: postData,
			headers: Fetion_headers,
			onload: function(response) {
				try {
					JSON.parse(response.responseText);
				}
				catch (e) {
					GM_setValue("loggedIn", false);
					thisObj.login(function () {
						thisObj.sendMessageToMyself(content, callback);
					});
					return;
				}
				if (callback) {
					callback();
				}
			}
		});
	};
	return Fetion;
})();

fx = new Fetion(username, password);
fx.login(function () {
	if (!fx.isLoggedIn) {
		GM_deleteValue("username");
		GM_deleteValue("password");
		alert("登录失败，请确保你的手机号已开通飞信并且密码正确。将不会发送短信通知。刷新网页可重新登录");
	}
});

