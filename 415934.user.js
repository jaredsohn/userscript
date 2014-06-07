// ==UserScript==
// @name         Tieba To Pan
// @description  为贴吧名片添加网盘分享主页链接
// @author       陌百百<feng_zilong@163.com>
// @include      http://tieba.baidu.com/*
// @version      2.0
// ==/UserScript==

(function() {

	var $, _, hook, UK, MutationObserver;

	GM_addStyle("\
		.card_userinfo_title > .icon_wrap {\
				 display : none!important;\
		}\
		.link_pan, .link_xiangce {\
				position : relative;\
					 top : -2px;\
			padding-left : 3px;\
			   font-size : 12px;\
		}\
	");

	$ = unsafeWindow.$;
	_ = unsafeWindow._;

	hook = function(e, t, n) {
		var o;
		e && (o = e[t]) && (o.hooked || (e[t] = function() {
			var e, t, n = this,
				o = arguments,
				i = o.callee,
				r = void 0,
				a = !1;
			for (i.hookStop = function() {
				a = !0
			}, t = 0; t < i.hook_before.length; t++) if (r = i.hook_before[t].apply(n, [i, o]), a) return r;
			for (r = i.hook_func.apply(n, o), t = 0; t < i.hook_after.length; t++) if (e = i.hook_after[t].apply(n, [i, r, o]), void 0 !== e && (r = e), a) return r;
			return r
		}, e[t].hook_func = o, o = e[t], o.hooked = !0, o.hook_after = [], o.hook_before = []), e = o.hook_after, (t = n.after) && (t.concat ? o.hook_after = e.concat(t) : e.push(t)), e = o.hook_before, (t = n.before) && (t.concat ? o.hook_before = e.concat(t) : e.push(t)))
	};

	//extend GM.get into jQuery
	$.GM = {
		get: function() {
			var args, fn, url, data;

			args = Array.prototype.slice.call(arguments);
			fn = args.pop();

			if (typeof(fn) !== "function") {
				throw new TypeError("The Object is not callable");
			}

			url = args.shift();
			data = args.shift();
			
			(typeof(data) === "undefined") && (data = {});
			(typeof(data) !== "string") && (data = $.param(data));

			GM_xmlhttpRequest({
				method: "GET",
				synchronous: false,
				url: url + (data !== "" ? "?" : "") + data,
				onload: function(res) {
					return fn.call(null, res);
				}
			});
		}
	};

	UK = {
		get: function(un, callback) {
			$.GM.get("http://pan.baidu.com/inbox/friend/queryuser", {
				query_uname: "{\"" + un + "\":0}"
			}, function(res) {
				var userInfo, uk;
				userInfo = $.parseJSON(res.responseText);
				uk = userInfo.user_list[0].uk;
				isPanUser = userInfo.user_list[0].wangpan_user;
				if (isPanUser === 1) {
					callback(uk);
				}
			});
		}
	};

	addPanBtn = function() {
		var userCard = this._j_card;
		
		setTimeout(function() {
			var userInfoTitle = userCard.find('.card_userinfo_title').eq(0);
			
			if (userInfoTitle.length) {
				userInfoTitle.append($("<a class=\"link_pan\" target=\"_blank\">(盘)</a>")).append($("<a class=\"link_xiangce\" target=\"_blank\">(册)</a>"));
				UK.get(($.parseJSON(userCard.get(0).getAttribute("data-field"))).un, function(uk) {
					$(".link_pan", userCard).attr("href", "http://yun.baidu.com/share/home?uk=" + uk);
					$(".link_xiangce", userCard).attr("href", "http://xiangce.baidu.com/u/" + uk);
				});
			}
		}, 0);


	};

	_.Module.use("ihome/widget/UserVisitCard", {}, function(b) {
		hook(b.__proto__, 'buildVisitCard', {
			before: function() {
				hook(this._visit_card, 'setContent', {
					after: addPanBtn
				});
			}
		});
	});

})();