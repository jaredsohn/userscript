// ==UserScript==
// @name           Hide Doubaners From You
// @title          豆瓣屏蔽脚本
// @namespace      http://yourui.blogbus.com
// @description    让你在豆瓣上不想看到的人从眼前消失。
// @include        http://*.douban.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://userscript-updater-generator.appspot.com/?id=25280
// @author         isend
// @homepage       http://yourui.blogbus.com/logs/19190217.html
// @copyright      ©2008+, isend
// @license        GPLv3
// @version        1.2.3
/* @reason
2009-08-31 1.2.3
在待处理请求页面实现屏蔽
@end */
// @modified       2009-08-31
// @creation       2008-04-07
// ==/UserScript==

if (!document.title)	return;	// check google ads

var timeStamp = 0;

var people = new Array;
people.toString = function() {
	if (this.length == 0)	return "";
	var str = ele.href(this[0].id);
	for (var i = 1; i < this.length; i++)	str += ("|" + ele.href(this[i].id));
	return str;
};
people.toHtml = function() {
	var html = "";
	for (var i = 0; i < this.length; i++) {
		var userLink = ele.href(this[i].id);
		html += ('<dl class="obu" ><dt><a href="' + userLink + '"><img src="' + this[i].icon + '" class="m_sub_img" alt="' + this[i].title + '"/></a><input type="checkbox" value="' + this[i].id + '"/></dt><dd><a href="' + userLink + '">' + this[i].title + '</a></dd></dl>');
	}
	return html;
};
people.idxOf = function(uid) {
	for (var i in this)	if(this[i].id == uid) return i;
	return -1;
};
people.unserialize = function() {
	var num = GM_getValue("user_num", 0);
	this.length = 0;
	for (var i = 0; i < num; i++) {
		this.push({
			id:		GM_getValue("user_" + i + "_id"),
			title:	GM_getValue("user_" + i + "_title"),
			icon:	GM_getValue("user_" + i + "_icon")
		});
	}
};
people.update = function(set) {	// false: gm=>page, true: page=>gm
	if (set) {
		timeStamp++;	// could never reach INFINITY till human race's extinction. ive calculated it, trust me
		GM_setValue("timeStamp", timeStamp);
	}
	else {
		var gmTimeStamp = GM_getValue("timeStamp", 0);	// console.log(timeStamp+" "+gmTimeStamp);
		if (timeStamp < gmTimeStamp) {
			this.unserialize();
			timeStamp = gmTimeStamp;
		}
	}
};
people.store = function(idx) {
	GM_setValue("user_" + idx + "_id",		this[idx].id);
	GM_setValue("user_" + idx + "_title",	this[idx].title);
	GM_setValue("user_" + idx + "_icon",	this[idx].icon);
};
people.append = function(person) {
	this.update(false);	// synchonization
	if (this.idxOf(person.id) >= 0) return;	// avoid duplication
	var len = this.length;	// console.log(len);
	GM_setValue("user_" + len + "_id",		person.id);
	GM_setValue("user_" + len + "_title",	person.title);
	GM_setValue("user_" + len + "_icon",	person.icon);
	this.push(person);
	GM_setValue("user_num", this.length);	// console.log(this.length);
	this.update(true);	// gm values hav been changed, thus timeStamp needs increasing. any function using GM_setValue should do this 1st
};
people.remove = function(data, uidFunc) {
	this.update(false);
	var uidArray = new Array;
	if ($.isFunction(uidFunc)) {	// here "data" is a jquery object
		data.each(function() {
			uidArray.push(uidFunc.call(this));
		});
	}
	else if (data.id != undefined)	uidArray.push(data.id);	// here "data" is a person
	else							uidArray.push(data.toString());	// here "data" is a uid

	var remain = new Array;	// console.log(this.length);
	for (var i = 0; i < this.length; i++)	if ($.inArray(this[i].id, uidArray) < 0)	remain.push(this[i]);
	if (this.length == remain.length)	return;
	this.length = remain.length;
	for (i = 0; i < this.length; i++) {
		this[i] = remain[i];
		this.store(i);
	}	// console.log(this.length);
	GM_setValue("user_num", this.length);
	this.update(true);
};
people.modify = function(person) {
	this.update(false);
	var i = this.idxOf(person.id);
	if (i < 0) return;
	this[i] = person;
	this.store(i);
	this.update(true);
};

var url		= {
	Location:		function()		{return window.location.href},
	Head:			function(str)	{return "^" + str;},
	Tail:			function(str)	{return str + "$";},
	Wrap:			function(str)	{return this.Head(this.Tail(str));},
	Banned:			function(str)	{return str.replace(/\/people\/\[\\w\\\.-\]\{1,15\}\//, "(" + people.toString() + ")");},
//	Optional:		function(str)	{return "(" + str + ")?";},
	normChar:		function()		{return "[\\w\\.-]";},
	normWord:		function()		{return this.normChar() + "+?";},
	name:			function()		{return this.normChar() + "{1,15}";},	// group name, user name
	aParam:			function()		{return this.normWord() + "=" + this.normWord();},
	params:			function()		{return "(\\?" + this.aParam() + "(&" + this.aParam() + ")*)?";},
	startReal:		function()		{return "\\?start=\\d{2,}(&" + this.aParam() + ")*";},	// start=0 is omitted
	startOpt:		function()		{return "(\\?start=\\d+(&" + this.aParam() + ")*)?";},	// start=0 is allowed & whole start=xxx part is optional
	anchoring:		function()		{return "(#" + this.normWord() + ")?";},
	douban:			function()		{return "http://(www|alpha)\\.douban\\.com/";},
	people:			function()		{return this.douban() + "people/" + this.name() + "/";},
	aPerson:		function()		{return this.people() + this.params();},
	group:			function()		{return this.douban() + "group/";},
	aGroup:			function()		{return this.group() + this.name() + "/";},
	aTopic:			function()		{return this.group() + "topic/\\d+/" + this.params() + this.anchoring();},
	flTopic:		function()		{return this.group() + "topic/\\d+/" + this.startReal() + this.anchoring();},	// this should b tested b4 aTopic, fl: following
	discuss:		function()		{return this.aGroup() + "discussion" + this.startOpt();},
	groupMembers:	function()		{return this.aGroup() + "members" + this.params();},
	bannedMembers:	function()		{return this.aGroup() + "banned_members" + this.params();},
	manageLog:		function()		{return this.aGroup() + "manage_log" + this.params();},
	lockedTopics:	function()		{return this.aGroup() + "locked_topics" + this.startOpt();},
	groupInvite:	function()		{return this.aGroup() + "invite";},
	invitedUsers:	function()		{return this.aGroup() + "invited_users" + this.startOpt();},
	trash:			function()		{return this.aGroup() + "trash" + this.startOpt();},
	ownedNotes:		function()		{return this.people() + "notes" + this.startOpt();},
	aNote:			function()		{return this.douban() + "note/\\d+/" + this.anchoring();},
	ownedPhotos:	function()		{return this.people() + "photos" + this.startOpt();},
	photo:			function()		{return this.douban() + "photos/";},
	anAlbum:		function()		{return this.photo() + "album/\\d+/" + this.startOpt();},
	aPhoto:			function()		{return this.photo() + "photo/\\d+/" + this.anchoring();},
	request:		function()		{return this.douban() + "request/" + this.anchoring();}
};

var ele		= {
	Url2uid:		function(pgUrl)	{return pgUrl.match(/\/people\/([\w\.-]{1,15})\//)[1];},
	IsRecomdIn:		function()		{return people.idxOf(this.Url2uid($(this.recomdLink()).attr("href"))) >= 0},
	contentDiv:		function()		{return "#content";},
	articleDiv:		function()		{return this.contentDiv() + " div.article";},
	asideDiv:		function()		{return "div.aside";},
	authorTd:		function()		{return this.articleDiv() + " td.wrtd";},
	userDiv:		function()		{return "#user";},
	userImg:		function()		{return this.userDiv() + " " + this.imgLink();},
	commentDiv:		function()		{return "#comments";},
	recomdLink:		function()		{return "a:has(img[src=http://t.douban.com/pics/recommend.gif])";},
	href:			function(user)	{return "/people/" + user + "/";},
	aLink:			function()		{return "a:attrEndsWith(href," + people.toString() + ")";},
	imgLink:		function()		{return this.aLink() + ":has(img)";},
	pl2Link:		function()		{return "span.pl2>" + this.aLink();},
	list:			function()		{return this.articleDiv() + " table.olt tr:has(" + this.aLink() + ")";},
	icon:			function()		{return "dl:has(" + this.imgLink() + ")";},
	record:			function()		{return "li[class^=mbt]:has(" + this.aLink() + ")";},
	post:			function()		{return "div.topic-content:has(" + this.imgLink() + ")";},
	reply:			function()		{return "li:has(div.reply-doc):has(" + this.imgLink() + ")";},	// lz's head is the 1st td
	comment:		function()		{return this.commentDiv() + " table:has(" + this.imgLink() + ")";},
	commentIdx:		function()		{return this.asideDiv() + " ul.mbt:has(" + this.imgLink() + ")";}	// doesnt matter whether the same adjacent heads r omitted
};
ele.record.before = function($ban) {
	if ($ban.length > 0)	$ban.hasClass("mbtl") ? $ban.next("li[class^=mbt]").disappear() : $ban.prev("li.mbtl").disappear();
	else					return false;
};
ele.comment.before = function($ban) {
	if ($ban.length > 0)	$ban.next().remove();
	else					return false;
};
ele.commentIdx.before = function($ban) {
	if ($ban.length > 0) {
		$ban.each(function() {
			var $next = $(this).next();
			var $cur;
			while (true) {
				$cur = $next;
				if ($cur.length == 0 || $cur.is(":has(img)"))	break;
				else {
					$next = $cur.next();
					$cur.disappear();
				}
			}
		});
	}
	else	return false;
};

var rule	= [	// in patterns, what comes 1st wud b executed 1st
//	{page: function() {return url.Wrap(url.douban());},						pattern: [""]},
	{page: function() {return url.Wrap(url.aGroup());},						pattern: ["list",		"icon"]},
	{page: function() {return url.Wrap(url.flTopic());},					pattern: ["reply"],
		before: function() {
			$.get(url.Location().replace(/\/topic\/\d+\/\S*$/, $("#content p.pl2 a").attr("href").match(/\/group(\/\S+?\/)/)[1]), function(html) {
				$("div.indent p").each(function() {
					if (people.idxOf(html.match(new RegExp("<a href=\"" + $(this).find("a").attr("href") + "\"[\\s\\S]*?</a></td>[\\s\\S]*?<td nowrap=\"nowrap\"><a href=\"/people/(" + url.name() + ")/\">[\\s\\S]*?</a>"))[1]) > 0)
						$(this).disappear();
				});
			});
	}},
	{page: function() {return url.Wrap(url.aTopic());},						pattern: ["post",		"reply"],
		before: function() {
			$.get(url.Location().replace(/\/topic\/\d+\/\S*$/, $("#content p.pl2 a").attr("href").match(/\/group(\/\S+?\/)/)[1]), function(html) {
				$("div.indent p").each(function() {
					if (people.idxOf(html.match(new RegExp("<a href=\"" + $(this).find("a").attr("href") + "\"[\\s\\S]*?</a></td>[\\s\\S]*?<td nowrap=\"nowrap\"><a href=\"/people/(" + url.name() + ")/\">[\\s\\S]*?</a>"))[1]) > 0)
						$(this).disappear();
				});
			});
	}},
	{page: function() {return url.Wrap(url.discuss());},					pattern: ["list"]},
	{page: function() {return url.Wrap(url.groupMembers());},				pattern: ["icon"]},
	{page: function() {return url.Wrap(url.bannedMembers());},				pattern: ["icon"]},
	{page: function() {return url.Wrap(url.manageLog());},					pattern: ["record"]},
	{page: function() {return url.Wrap(url.lockedTopics());},				pattern: ["list"]},
	{page: function() {return url.Wrap(url.groupInvite());},				pattern: ["icon"]},
	{page: function() {return url.Wrap(url.invitedUsers());},				pattern: ["icon"]},
	{page: function() {return url.Wrap(url.trash());},						pattern: ["list"]},
	{page: function() {return url.Banned(url.Wrap(url.ownedNotes()));},		pattern: ["userImg",	"articleDiv",	"record"]},	// banned comes1st
	{page: function() {return url.Wrap(url.ownedNotes());},					pattern: ["record"]},
	{page: function() {return url.Wrap(url.aNote());},						pattern: ["userImg",	"comment"],
		before: function() {
			if (people.idxOf(ele.Url2uid($("div.aside a[href$=/notes]:contains(的日记)").attr("href"))) >= 0) {	// remove the note's content
				var $content = $(ele.articleDiv() + " div[id^=note-]");
				if ($content.length == 0)	return;
				$content.disappear();
				$(ele.commentDiv()).prev().remove();
			}
	}},
	{page: function() {return url.Banned(url.Wrap(url.ownedPhotos()));},	pattern: ["userImg",	"articleDiv",	"commentIdx"]},
	{page: function() {return url.Wrap(url.ownedPhotos());},				pattern: ["commentIdx"]},
	{page: function() {return url.Wrap(url.anAlbum());},					pattern: ["userImg",	"commentIdx"],
		before: function() {
			if ($(ele.userImg()).length > 0)							$(ele.userDiv()).siblings().disappear();
			else if ($(ele.userDiv()).length == 0 && ele.IsRecomdIn())	$(ele.articleDiv()).disappear();	// a photo of "mine"
	}},
	{page: function() {return url.Wrap(url.aPhoto());},						pattern: ["userImg",	"comment"],
		before: function() {
			if ($(ele.userImg()).length > 0)							$(ele.commentDiv()).prevAll(":not(" + ele.userDiv() + ")").disappear();
			else if ($(ele.userDiv()).length == 0 && ele.IsRecomdIn())	$(ele.commentDiv()).prevAll().disappear();	// a photo of "mine"
	}},
	{page: function() {return url.Wrap(url.request());},					pattern: ["record"]}
];
rule.firstTime = true;
rule.apply = function(bFirstTime) {
	if (bFirstTime != undefined)	this.firstTime = bFirstTime;
	$.each(this, function() {
		var pageRE = this.page();
		if (new RegExp(pageRE, "i").test(url.Location())) {
			GM_log(pageRE);	// console.log(pageRE);	// for debugging
			if ($.isFunction(this.before) && this.before() === false)	return false;
			$.each(this.pattern, function() {
				var eleQuery = ele[this]();
				GM_log(eleQuery);	// console.log(eleQuery);	// for debugging
				var $ban = $(eleQuery);
				if ($.isFunction(ele[this].before) && ele[this].before($ban) === false)	return;
				$ban.disappear();
				if ($.isFunction(ele[this].after) && $ban.length > 0)	ele[this].after();
			});
			if ($.isFunction(this.after))	this.after();
			return false;
		}
	});
};

(function($) {
	$.fn.extend({
		disappear: function() {
			return this.fadeOut(1200, function() {
				$(this).remove();
			});
		},
		recenter: function() {
			var wndWidth	= $(window).width();
			var wndHeight	= $(window).height();
			return this.css({"left":0.45*Math.abs(wndWidth-this.width())+"px","top":0.45*Math.abs(wndHeight-this.height())+"px"});
		}
	});
	
	$.extend($.expr[':'], {	// use it like this: $("a:attrEndsWith(href,/people/Isend/|/people/abc/|/people/1.2_3/)")
		attrEndsWith: function(elem, i, match, array) {
			var result = match[3].match(/\s*([^\s,]+),([^\s\|]+(\|[^\s\|]+)*)\s*/);
			if (result == null)	return false;
			var attribute = $(elem).attr(result[1]);
			if (attribute === undefined)	return false;
			var endValues = result[2].split("|");
			for (var i in endValues)	if (attribute.substr(attribute.length - endValues[i].length) === endValues[i])	return true;
			return false;
		}
	});
})(jQuery);

$(window).resize(function() {
	$("#banned_admin").recenter();
});

$(function() {
	// update data and remove all banned people from page right away
	people.update(false);
	rule.apply();
	
	// add buttons if this page is homepage of a person
	url.Location().replace(new RegExp(url.Wrap(url.aPerson()), "i"), function() {
		$info = $("#profile div.pl:first");
		if ($info.length == 0) return;	// some people r banned by douban, thus their pages r merely nothing but notes showing it
		var user = {
			id:		$info.text().match(new RegExp("id: (" + url.name() + ")"))[1],
			title:	$("title").text(),
			icon:	$("#profile img:first").attr("src").replace(/\/ul/, "/u")
		};
		people.modify(user);
		$info.after($("<a id='btn_ban' class='graybutt ll' href='javascript:void(0)'><span>屏蔽此人</span></a>").click(function() {
				$("#btn_ban,#btn_free").toggle();
				people.append(user);
			})).after($("<a id='btn_free' class='redbutt ll' href='javascript:void(0)'><span>解除屏蔽</span></a>").click(function() {
				$("#btn_ban,#btn_free").toggle();
				people.remove(user);
		}));
		$(people.idxOf(user.id) >= 0 ? "#btn_ban" : "#btn_free").hide();
	});
	
	// bind shortcuts to people's icons for quick banning
	$("a:has(img):visible").filter(function() {
			return (/\/people\/[\w\.-]{1,15}\/$/).test(this.href);
		}).click(function(e) {
			if (e.shiftKey) {
				var $img	= $("img", this);
				people.append({
					id:		ele.Url2uid(this.href),
					title:	$img.attr("alt"),
					icon:	$img.attr("src")
				});
				rule.apply(false);
				return false;
			}
	});
	
	// prepare admin dialog
	$("<div id='banned_admin'><h2>已屏蔽用户   · · · · · ·  </h2><div id='banned_list' class='obss'/><div id='banned_ctrl'>&gt;<a href='javascript:void(0)' id='clear_all'>清空</a>&nbsp;&nbsp;&nbsp;&gt;<a href='javascript:void(0)' id='select_all'>全选</a>&nbsp;&nbsp;&nbsp;&gt;<a href='javascript:void(0)' id='toggle_all'>反选</a><a id='a_cancel' class='colbutt rr' href='javascript:void(0)'><span>退出</span></a><a id='a_free' class='colbutt rr' href='javascript:void(0)'><span>移除</span></a></div></div>")
		.css({"position":"fixed","width":"325px","height":"325px","opacity":"0.97","background-color":"#ffffff","border":"2px solid #000","padding":"15px"})
		.appendTo($("body")).hide();
	$("#banned_list").css({"height":"250px","overflow-y":"auto"});
	$("#banned_ctrl").css({"margin-top":"15px"}).find("a").click(function() {
			this.blur();
		}).end().find("#clear_all").click(function() {
			$("#banned_list :checkbox").attr("checked", false);
		}).end().find("#select_all").click(function() {
			$("#banned_list :checkbox").attr("checked", true);
		}).end().find("#toggle_all").click(function() {
			$("#banned_list :checkbox").each(function() {
				this.checked = !this.checked;
			});
		}).end().find("#a_free").click(function() {
			people.remove($("#banned_list :checkbox:checked").closest("dl").fadeOut("slow").end(), function() {
				return $(this).val();
			});
		}).end().find("#a_cancel").click(function() {
			$("#banned_admin").slideUp();
	});
	GM_registerMenuCommand("管理豆瓣屏蔽名单", function() {
		people.update(false);
		$("#banned_list").html(people.toHtml());
		$("#banned_admin").recenter().slideDown();
	});
});