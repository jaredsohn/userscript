// ==UserScript==
// @name            PCBETA.COM@friends
// @namespace       http://i.pcbeta.com/space-uid-93460.html
// @description     添加@朋友按钮
// @author          CONAN影
// @require         http://static.pb.pbcdn.com/data/cache/jquery.js
// @include         http://bbs.pcbeta.com/*
// @grant           none
// @updateURL       http://userscripts.org/scripts/source/175332.user.js
// @downloadURL     http://userscripts.org/scripts/source/175332.user.js
// @version         0.2
// ==/UserScript==

jQuery(function ($) {
	$("body").append("<style>#fastpostat_menu{width:150px;max-height:250px;position:absolute;top:100px;left:100px;display:none;z-index:999}#fastpostat_menu ul{max-height:200px;overflow:auto}#fastpostat_menu li{cursor:pointer;padding:5px}#fastpostat_menu li:hover{background:#009ad9;color:#fff}#fastpostat_menu li.loading,#fastpostat_menu li.loading:hover{color:gray;background:#fff;text-align:center}#fastpostat_menu input{width:113px;margin:0 4px 4px 0;vertical-align:top}#fastpostat_menu button{width:23px;font-weight:700;text-align:center;margin:0;vertical-align:top}#fastpostat,.simpleedt #e_at{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAilBMVEX////////5+/z5+fr1+fn29/fv+Pj19fXw9vfz8/Py8/ry8vLz8vDj7vrg7u7U6PrU4u654vfP2+PD3OzF1ta41emmyuapxtyVwt6iu9SeudJ+vumEstt0s9iJrsp6pc1um8RbnchHmMk/kc5biMNKiboshr4VgsIzebJAdagderYlc6wrbqQzZpnxVOWcAAAAAXRSTlMAQObYZgAAAKpJREFUCNdNj20TgiAQhLlDQyuNJIHIypcUkfr/fy+kpun5dDt7s7dHSCRnjJEfKW6EKJB+PSp6GxjqJF81ans9ABbaynWD1lZi3V1KfbRlCMFBJ9L2zdBhrylhfClhmjJYNHarFgsI39DCCxxlGnyfCX+Duwc1b8IBmBU+/NjO41PFfON4ZhTwcxUL5dg6wwG4cVXszNC4V6Dl6afwniI/VYB/HzG23cXhDRXZDRXqtca/AAAAAElFTkSuQmCC') no-repeat 50%}#e_at{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAMAAABVyG9ZAAAAxlBMVEX////////5+/z5+fr1+fn99/P29/fv+Pj19fXw9vfz8/Py8/rz8vDs8/Tv7+/j7vrm7u7g7u7m5ubc6enU6Pre5vDU4u7e3t7E4/jP2+PD3OzW1tXF1ta41enMzMy9zt63y+LFxcWmyuapxty9vb2Vwt6+ubaeudK1tbV+vumtra2EstuTrM10s9iJrsplq+R6pc1pp89Tot5um8Rbnchkk7lHmMk/kc5biMNKiboshr4VgsIzebJAdagderYlc6wrbqQzZpmPTjxYAAAAAXRSTlMAQObYZgAAAbhJREFUKM9tkn97kzAQgPOjo4FNWqKSNVmZQJHqxLWTltHAJXz/L2Wg03aPvn/Aw73hOO4OoSuYI0D/4hG8kFLOCWXvBSXZs55oKkmuJJutG33heU7/Glq5wD67xxjfZy/uzXh2NsFoXhYfk1Spr5uEy5M+zs85aaF1xVNB10Wx+MCwiE/6282ULtJQiYTFjQZ9+lTrSmRw8se/oBU0c+XFJ4Cmhr2GLMSg5ZgRA2QCkSNAFfACACLm11C4IpkE8EMvA6h5mi4Ajh4iTnmuCwW0FJG9ASnGc+aJTYqO9Zl6hnAHHUEhfTKwZnfYGPetO88pgtxD7aGAtMZgNMuNGSv0cuMSOtViRF2sDjy/NbuxdhYbGzHyy9gcy66zrb9sbeeHUzNaWxIm7UQ+XbuYT30KS9tHHs97a3spfjpzWKrw3F2/ty0LlS9XTAmxlJ/57dvAAr6yQy/DZJNuBUo2yi9t/OZCkQ922D1iSgjB8Y9+6L/8mbMQq35wvB4Or+P9EF0WQKnbcpKOfvfAE3VZLLFVLHosHQ83It3w640Kk+3WzV+p9Hsi0LtlDIKAK5UkLv4fAnf2enl/A2sfROwu18uxAAAAAElFTkSuQmCC') no-repeat 50% 0}#postsml{animation:nodeInserted 0.001s;-moz-animation:nodeInserted 0.001s;-webkit-animation:nodeInserted 0.001s}@keyframes nodeInserted{from{clip:rect(1px,auto,auto,auto)}to{clip:rect(0px,auto,auto,auto)}}@-moz-keyframes nodeInserted{from{clip:rect(1px,auto,auto,auto)}to{clip:rect(0px,auto,auto,auto)}}@-webkit-keyframes nodeInserted{from{clip:rect(1px,auto,auto,auto)}to{clip:rect(0px,auto,auto,auto)}}</style>");

	var fastMode = $("#fastpostmessage").length > 0,
		advanceMode = $("#e_textarea").length > 0,
		menuHidden = 1,
		friends = [],
		$friends = [];

	var atMenu = $("<div class='p_pof' id='fastpostat_menu'></div>").appendTo($("body")),
		atKeyword = $("<input type='text' id='atkeyword' class='px' placeholder='请输入用户名…' />").appendTo(atMenu),
		atRefresh = $("<button id='at_refresh' class='pn pnc'>&#8634;</button>").appendTo(atMenu),
		atList = $("<ul id='at_menu'><li class='loading'>获取中…</li></ul>").appendTo(atMenu);

	function netFriends(page) {
		page = page || 1;
		atList.html("<li class='loading'>获取中…</li>");
		$.get("home.php?mod=spacecp&ac=friend&op=getinviteuser&inajax=1&page=" + page + "&gid=-1&" + Math.random(), function (xml) {
			var data = eval("(" + $(xml).text() + ")"),
				userdata = data["userdata"],
				singlenum = parseInt(data["singlenum"]);

			for (id in userdata) {
				friends.push(userdata[id].username);
			};

			if (singlenum && singlenum == 20) {
				netFriends(++page);
			} else {
				localStorage["friends"] = friends.join(" ");
				$friends = $("<li>" + friends.join("</li><li>") + "</li>");
				atList.empty().append($friends);
			};
		}, "xml");
	};

	atKeyword.bind("input", function () {
		$friends.each(function () {
			var item = $(this),
				text = item.text(),
				patt = new RegExp(atKeyword.val(), "i");
			patt.test(text) ? item.html(text.replace(patt, "<b>$&</b>")).show() : item.hide();
		});
	}).keypress(function (e) {
		if (e.keyCode == 13) $friends.filter(":visible").eq(0).click();
	});

	atRefresh.click(function () {
		atKeyword.val("");
		netFriends();
	});

	if (localStorage && localStorage["friends"]) {
		friends = localStorage["friends"].split(" ");
		$friends = $("<li>" + friends.join("</li><li>") + "</li>");
		atList.empty().append($friends);
	} else {
		netFriends();
	};

	function hideMenu(e) {
		var target = $(e.target);
		if (atMenu.has(target).length < 1 && !target.hasClass("fat")) {
			$("body").unbind("click", hideMenu);
			atKeyword.val("");
			$friends.each(function () {
				var item = $(this);
				item.text(item.text()).show();
			});
			atMenu.hide();
			menuHidden = 1;
		};
	};

	function reg(icon, textarea, key) {
		var icon = $("<a id='fastpostat' href='javascript:;' title='@朋友' class='fat'>@朋友</a>").insertAfter(icon);
		icon.click(function () {
			if (menuHidden) {
				var offset = icon.offset();
				atMenu.css({
					"top": offset.top + 20 + "px",
					"left": offset.left + "px"
				}).show();
				atKeyword.focus();
			} else {
				atKeyword.val("");
				atMenu.hide();
			};
			menuHidden = !menuHidden;

			setTimeout(function () {
				$("body").bind("click", hideMenu);
			}, 0)
		});

		textarea.keydown(function (e) {
			if (e.shiftKey && e.keyCode == 50) {
				textarea.one("keypress.c", function (e) {
					menuHidden && icon.click() && e.preventDefault();
				});
			} else {
				textarea.unbind("keypress.c");
			};
		});

		atList.bind("click", "li", function (e) {
			seditor_insertunit(key, "@" + $(e.target).text() + " ", "");
		});
	};

	if (fastMode) {
		reg($("#fastpostsml"), $("#fastpostmessage"), "fastpost");
	} else if (advanceMode) {
		var icon = $("<a id='e_at' title='@好友和关注的人' href='javascript:;'>@朋友</a>").appendTo($("#e_adv_s1"));

		icon.click(function () {
			var offset = icon.offset();
			atMenu.css({
				"top": offset.top + ($(".simpleedt").length ? 20 : 42) + "px",
				"left": offset.left + "px"
			}).show();
			atKeyword.focus();
		});

		atList.bind("click", "li", function (e) {
			var str = "@" + $(e.target).text() + " ";
			checkFocus();
			insertText(str, str.length, 0, false, getSel());
		});
	};

	function insertListener(e) {
		if (e.animationName == "nodeInserted") reg($("#postsml"), $("#postmessage"), "post");
	};
	document.addEventListener("animationstart", insertListener, false);
	document.addEventListener("webkitAnimationStart", insertListener, false);
});