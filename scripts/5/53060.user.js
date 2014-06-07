// ==UserScript==
// @name           Copy Topic for Douban
// @title          豆瓣转帖脚本
// @namespace      http://yourui.blogbus.com
// @description    方便在豆瓣发帖、改帖、看帖时转帖到其他组。自动保存载入选项设定；搜索框为空时在框内按空格开启/关闭按空格直接选中/取消的功能；脚本访问豆瓣时间间隔不短于0.1秒，最长1分39秒。
// @include        http://*.douban.com/group/*/new_topic
// @include        http://*.douban.com/group/topic/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://userscript-updater-generator.appspot.com/?id=53060
// @author         isend
// @homepage       http://yourui.blogbus.com/logs/41910114.html
// @copyright      ©2009+, isend
// @license        GPLv3
// @version        1.0.10
/* @reason
2009-08-19 1.0.10
修正了页面地址包含"start=0"时无法显示“转载”链接的bug
@end */
// @modified       2009-08-19
// @creation       2009-06-30
// ==/UserScript==

if (!document.title)	return;	// check google ads

var domain			= "http://www.douban.com";
var loaded			= false;
var groupImg		= "";
var groupId			= "";
var groupName		= "";
var authorName		= "";
var authorUrl		= "";
var topicUrl		= "";
var ck				= "";
var title			= "";
var content			= "";
var capTxt			= null;
var capId			= null;
var $curChk			= null;
var timeout			= null;
var $matches		= null;
var matchIdx		= 0;
var searchText		= "";
var lastSearch		= "";
var isBlocked		= false;
var sendRequired	= false;

var data = {
	set:		function(name, val) {
		this[name] = val;
		GM_setValue(name, val); 
	},
	ifTitle:	function() {
		return this.titleAddon.length > 0;
	},
	ifContent:	function() {
		return this.ifAuthor || this.ifGroup;
	},
	minDelay:	GM_getValue("minDelay",		1000),
	maxDelay:	GM_getValue("maxDelay",		3000),
	titleSel:	GM_getValue("titleSel",		0),
	titleAddon:	GM_getValue("titleAddon",	"【转载】"),
	contentSel:	GM_getValue("contentSel",	0),
	ifGroup:	GM_getValue("ifGroup",		true),
	ifAuthor:	GM_getValue("ifAuthor",		true),
	splitSel:	GM_getValue("splitSel",		1),
	ifSpace:	GM_getValue("ifSpace",		true)
};

var PGTYPE = {
	NEW:	0,
	EDIT:	1,
	TOPIC:	2
};
var pageType = -1;

function selfOwned() {
	return pageType == PGTYPE.NEW || pageType == PGTYPE.EDIT;
}

function delayTime() {
	return Math.random() * (data.maxDelay - data.minDelay) + data.minDelay;
}

function hasMatch(num) {
	return $matches != null && $matches.length > (num === undefined ? 0 : num);
}

function adaptSize() {
	var wndWidth	= $(window).width();
	var wndHeight	= $(window).height();
	$("#float_bgd").css({"left":"0px","top":"0px","width":wndWidth+"px","height":wndHeight+"px"});
	$("#float_div").css({"left":0.08*wndWidth+"px","top":0.16*wndHeight+"px","width":0.8*wndWidth+"px","height":0.6*wndHeight+"px"});
	$("#float_captcha").css({"left":0.475*Math.abs(wndWidth-400)+"px","top":0.475*Math.abs(wndHeight-100)+"px","width":"400px","height":"100px"});
}

function disappear() {
	if (timeout != null)	window.clearTimeout(timeout);
	showCaptcha(false);
	$("#float_div").hide();
	$("#float_bgd").hide();
	$("#execute").attr("disabled", false);
	$("#group_list dl").css("opacity", 1.0);
}

function finish(success) {
	disappear();
	if (success) {
		switch (pageType) {
			case PGTYPE.NEW:	window.location.href = domain + "/group/" + groupId + "/";	break;	// redirect2the group page, like its submitted with a form
			case PGTYPE.EDIT:	$("#content :submit[name=rev_submit]").click();				break;
			case PGTYPE.TOPIC:	break;
		}
	}
	else	$("#content :submit[name=rev_submit]").click();	// let douban tell the user what is missing
}

function msgBox(message, button, hideAll, afterClick) {
	showCaptcha(true,
				'<div class="pl2" style="margin-top:' + (21 - Math.floor(0.036 * message.length) * 10) + 'px">' + message
				+ '</div><p><input type="button" id="msg_ok" value="' + button + '"/></p>');
	$("#float_captcha").css("background-color", "#fff6ee").find("#msg_ok").click(function() {
		hideAll ? disappear() : showCaptcha(false);
		$("#float_captcha").css("background-color", "#eff6ff");
		if ($.isFunction(afterClick))	afterClick();
	}).focus();
}

function showCaptcha(show, html) {
	if (show) {
		$("#float_captcha").html(html).fadeIn("slow");
		$("#float_bgd").css("z-index","6002");
	}
	else {
		$("#float_captcha").hide();
		$("#float_bgd").css("z-index","6000");
	}
}

function getCaptcha() {
	capTxt = $("#float_captcha :text").val();
	showCaptcha(false);
	sendTopic();
}

function checkCaptcha(html) {
	var result = html.match(/<p>([\s\S]*?<input[\s\S]*?name=\"captcha-id\"[\s\S]*?value=\"(\S+?)\"[\s\S]*?\/>[\s\S]*?)<\/p>/);
	if (result == null) {
		result = html.match(/\"\/misc\/sorry\">([\s\S]*?<input[\s\S]*?name=\"captcha-id\"[\s\S]*?value=\"(\S+?)\"[\s\S]*?\/>)/);
		if (result == null)	return false;
		else				isBlocked = true;
	}
	capId = result[2];
	showCaptcha(true, result[1]);
	var btnVal = isBlocked ? "我真的不是程序" : "直接按回车键继续";
	$("#float_captcha").append($("<input type='button' id='captcha' value='" + btnVal + "'/>")).find("#captcha").click(getCaptcha).end()
		.find(":text").keydown(function(e) {
			if (e.keyCode == 13) {
				getCaptcha();
				return false;
			}
	}).focus();
	return true;
}

function invalidTopic() {
	if (selfOwned()) {
		var newTitle	= $("#content :text[name=rev_title]").val();
		var newContent	= $("#content :input[name=rev_text]").val();
		sendRequired	= pageType == PGTYPE.NEW && (topicUrl.length == 0 || authorUrl.length == 0 || title != newTitle || content != newContent);
		title			= newTitle;
		content			= newContent;
	}
	else {
		title	= $("#content h1:first").text();
		content	= $("<p>" + $("div.topic-doc p:first").html().replace(/\n/g, "").replace(/<br\/?>/g, "\n") + "</p>").text();
	}	// every "\n" posted to server will be turned into <br>, and all tags should be removed
	
	return title.length == 0 || content.length < 3;
}

function finalizeTopic() {
	if (data.ifTitle())	title = data.titleSel == 0 ? data.titleAddon + title : title + data.titleAddon;
	if (data.ifContent()) {
		var contentAddon = (data.ifGroup ? "转自"+groupName+"小组，原帖地址 "+topicUrl+"\n" : "") + (data.ifAuthor ? "作者"+authorName+"，个人页面 "+authorUrl+"\n" : "");
		var splitChar = data.splitSel == 0 ? " " : $("#split_sel").val();
		var splitCount = [50, 120, 70, 70, 40, 40, 170, 100];
		var contentSplit = "\n";
		for (var i = 0; i < splitCount[data.splitSel]; i++)	contentSplit += splitChar;
		contentSplit += "\n\n";
		content = data.contentSel == 0 ? contentAddon + contentSplit + content : content + contentSplit + contentAddon;
	}
}

function postTopic(gid) {
	var params;
	var postUrl = domain + "/group/" + gid + "/new_topic";
	
	if (capId == null) {
		params = {
			"ck":           ck,
			"rev_title":    title,
			"rev_text":     content,
			"rev_submit":   "好了，发言"
		};
	}
	else if (isBlocked) {
		postUrl = domain + "/misc/sorry";
		params = {
			"ck":           	ck,
			"captcha-solution": capTxt,
			"captcha-id":		capId,
		};
	}
	else {
		params = {
			"ck":           	ck,
			"rev_title":    	title,
			"rev_text":     	content,
			"captcha-solution": capTxt,
			"captcha-id":		capId,
			"rev_submit":   	"好了，发言"
		};
	}
	
	$.ajax({
		type:		"POST",
		url:		postUrl,
		data:		params,
		success:	function(html) {
			if (!checkCaptcha(html)) {
				capId = null;
				if (html.indexOf("<title>发表文章</title>") >= 0 && html.indexOf("<h1>文章审核</h1>") >= 0) {
					msgBox("您提交的内容因为莫须有的原因被豆瓣审核，暂时不能发表。您既不知道什么时候能发表，也不知道到底能不能发表，更不知道为什么不能发表。因此郑重建议您检查修改敏感词后重试。", "我无条件自愿服从豆瓣的“社区指导原则”", true);
					return;
				}
				if (isBlocked)	isBlocked = false;
				else if (sendRequired) {	// its hard2write whole regexp n slow2use load method. so a trade off is pulled off
					var $tr		= $("<div/>").html(html.match(/<table class=\"olt\">[\s\S]*?<\/table>/)[0])
								.find("tr:has(a[title=" + title + "]):has(a:exact(" + authorName + ")):first");
					topicUrl	= domain + $tr.find("a:first").attr("href");
					authorUrl	= domain + $tr.find("a:last").attr("href");
					finalizeTopic();	// finally wa can do this after we get both topicUrl&authorUrl
					sendRequired = false;
				}
				else	$curChk.attr("checked", false).closest("dl").removeClass("current");
				timeout = window.setTimeout(sendTopic, delayTime());
			}
		},
		error:		function(xhr, textStatus) {
			if (xhr.status >= 300) {
				$.ajax({
					type:	"GET",
					url:	domain + "/misc/sorry",
					complete:	function(xhr, textStatus) {
						checkCaptcha(xhr.responseText);
					}
				});
			}
		}
	});
}

function sendTopic()
{
	if (sendRequired)	postTopic(groupId);	// post the topic4selfOwned situ, get both authorUrl&topicUrl4new situ, get only authorUrl4edit situ.
	else {
		$curChk = $("#group_list :checkbox:checked:first");
		if ($curChk.length == 0) {
			finish(true);
			return;
		}
		var $curDl = $curChk.closest("dl");
		$("#group_list").scrollTo($curDl);
		$curDl.css("opacity", 1.0).addClass("current");
		$("#group_list dl:not(.current)").fadeTo("slow", 0.2);
		var gid = $curChk.prev().attr("href").match(/\/group\/(\S+?)\//)[1];
		postTopic(gid);
	}
}

function copyTopic() {
	if (invalidTopic())	{
		finish(false);
		return false;	// for "#" link
	}
	$("#float_bgd").fadeIn(2000);
	if (!loaded) {
		$("#float_div").html("<h2>正在载入小组列表，请稍候   · · · · · ·          </h2>").show().load(domain+"/group/mine div.article", function() {
			$("#float_div").find("div.article").attr("id", "group_list").css({"height":"87.5%","overflow-y":"auto"}).end()
				.find("dl:has(img[src="+groupImg+"])").remove().end()
				.find("dl:has(a[href*=/group/"+groupId+"/])").remove().end()
				.find("dt").append($('<input type="checkbox"/>')).end()
				.append($('<div align="center" style="margin-top:20px"><span>转帖间隔<input type="text" id="min_delay" size="2"/>~<input type="text" id="max_delay" size="2"/>毫秒</span><span>标题<select id="title_sel"><option>前</option><option>后</option></select>加上<input type="text" id="title_addon" size="4"/>&nbsp;&nbsp;&nbsp;内容<select id="content_sel"><option>前</option><option>后</option></select>注明<input type="checkbox" id="if_group"/>来源<input type="checkbox" id="if_author"/>作者，分隔线<select id="split_sel"><option>无</option><option>-</option><option>~</option><option>_</option><option>—</option><option>…</option><option>.</option><option>*</option></select></span><span>搜索组名<input type="text" id="quick_search" size="10"/></span><span><a href="#" id="clear_all">清空</a>&nbsp;&nbsp;&nbsp;<a href="#" id="select_all">全选</a>&nbsp;&nbsp;&nbsp;<a href="#" id="toggle_all">反选</a></span><input type="button" id="execute" value="好了，转载"/></div>'))
				.find("div:last span").css("margin-right", "20px").end()
				.find("#min_delay").val(data.minDelay).blur(function() {
					var num = Number($(this).val());
					if ($(this).val().match(/^\d+$/) == null || num > data.maxDelay || num < 100) {
						$(this).val(data.minDelay);
						return false;
					}
					else	data.set("minDelay", Number($(this).val()));
				}).end().find("#max_delay").val(data.maxDelay).blur(function() {
					var num = Number($(this).val());
					if ($(this).val().match(/^\d+$/) == null || num < data.minDelay || num >= 100000) {
						$(this).val(data.maxDelay);
						return false;
					}
					else	data.set("maxDelay", Number($(this).val()));
				}).end().find("#title_sel").attr({selectedIndex: data.titleSel, disabled: !data.ifTitle()}).change(function() {
					data.set("titleSel", $(this).attr("selectedIndex"));
				}).end().find("#title_addon").val(data.titleAddon).blur(function() {
					data.set("titleAddon", $(this).val());
					$("#title_sel").attr("disabled", !data.ifTitle());
				}).end().find("#content_sel").attr({selectedIndex: data.contentSel, disabled: !data.ifContent()}).change(function() {
					data.set("contentSel", $(this).attr("selectedIndex"));
				}).end().find("#if_group").attr("checked", data.ifGroup).click(function() {
					data.set("ifGroup", $(this).is(":checked"));
					$("#content_sel").attr("disabled", !data.ifContent());
					$("#split_sel").attr("disabled", !data.ifContent());
				}).end().find("#if_author").attr("checked", data.ifAuthor).click(function() {
					data.set("ifAuthor", $(this).is(":checked"));
					$("#content_sel").attr("disabled", !data.ifContent());
					$("#split_sel").attr("disabled", !data.ifContent());
				}).end().find("#split_sel").attr({selectedIndex: data.splitSel, disabled: !data.ifContent()}).change(function() {
					data.set("splitSel", $(this).attr("selectedIndex"));
				}).end().find("#quick_search").keydown(function(e) {
					if (e.keyCode == 32) {
						searchText = $(this).val();
						if (searchText.length == 0)	return false;
						else if (data.ifSpace && hasMatch()) {
							var $chkbox = $($matches[matchIdx]).find(":checkbox");
							$chkbox.attr("checked", !$chkbox.is(":checked"));
						}
						return !data.ifSpace;	// prevent any space char from appearing if space key is used to select/deselect group
					}
					return true;
				}).keyup(function(e) {	// it doesnt matter if u return true or false, char wont b canceled. so just return naturally
					searchText = $(this).val();
					var clearHighlight = function() {
						if (hasMatch()) {	// remove special effect always. will b put on ag later if needed. so dont return in the middle
							var $lastA = $($matches[matchIdx]).css("background-color", "#ffffff").find("dd a");
							$lastA.html($lastA.text());
						}
					}
					if (searchText.length == 0)	{	// if empty, none should be selected and everything should go back2the initial status
						clearHighlight();
						$matches = null;
						if (e.keyCode == 32 && !(e.altKey || e.metaKey || e.shiftKey)) {	// switch the functionality of space key
							data.set("ifSpace", !data.ifSpace);
							msgBox("现在您在搜索框内" + (data.ifSpace ? "按空格键可以直接选中/取消当前高亮的小组" : "输入的空格将作为搜索字符串的一部分"),
								"直接按空格键继续", false, function() {
									$("#quick_search").focus();
							});
						}
					}
					else if	(searchText != lastSearch) {
						var $newMatches = $("#group_list dl:has(a:containsCI(" + searchText + "))");
						if (hasMatch() && $newMatches[0] != $matches[matchIdx])	clearHighlight();	// avoid blinking
						$matches = $newMatches;
						matchIdx = 0;
					}
					else if (e.keyCode == 13 && hasMatch(1)){
						clearHighlight();
						matchIdx = (matchIdx + 1) % $matches.length;
					}
					if (hasMatch()) {
						var $curMatch = $($matches[matchIdx]).css("background-color", "#fff6ee");
						$("#group_list").scrollTo($curMatch);
						var $aTag = $curMatch.find("dd a");
						$aTag.html($aTag.text().replace(new RegExp("(" + searchText +")", "gi"), "<b><font style='background-color: yellow'>$1</font></b>"));
					}
					lastSearch = searchText;	// update lastSearch to cur Search
				}).end().find("#clear_all").click(function() {
					$("#group_list :checkbox").attr("checked", false);
					this.blur();
					return false;
				}).end().find("#select_all").click(function() {
					$("#group_list :checkbox").attr("checked", true);
					this.blur();
					return false;
				}).end().find("#toggle_all").click(function() {
					$("#group_list :checkbox").each(function() {
						this.checked = !this.checked;
					});
					this.blur();
					return false;
				}).end().find("#execute").click(function() {
					if ($("#group_list :checkbox:checked:first").length == 0)	return;
					$(this).attr("disabled", true);
					if (!sendRequired)	finalizeTopic();	// the original post shouldnt b modified
					sendTopic();
			});
		});
		loaded = true;
	}
	else	$("#float_div").fadeIn("fast");
	return false;	// for "#" link
}

(function($) {
	$.fn.extend({
		scrollTo: function($target){ // $target has2b inside $(this)
			return this.each(function(){
				var realTop = $(this).scrollTop() + $target.position().top;
				$(this).scrollTop(realTop - $target.height() * 0.25);
			});
		}
	});
	
	$.extend($.expr[':'], {
		exact: function(elem, i, match, array) {
			return (elem.textContent || elem.innerText || "") == match[3];
		},
		containsCI: function(elem, i, match, array) {
			return (elem.textContent || elem.innerText || "").toLowerCase().indexOf(match[3].toLowerCase()) >= 0;
		}
	});
})(jQuery);

$(window).resize(adaptSize);

$(function() {
	var statusHtml = $("#status").html();
	var result = statusHtml.match(/<a href=\"[\w:\/\.]*?\/logout\?ck=(\S+?)\">/);
	if (result == null)	return;	// not logged in
	ck = result[1];
	result = statusHtml.match(/<a href=\"[\w:\/\.]*?\/settings\/\">([\s\S]+?)的设置<\/a>/);
	if (result != null)	authorName = result[1];
	
	var wndWidth	= $(window).width();
	var wndHeight	= $(window).height();
	$("<div id='float_bgd'/>").css({"z-index":"6000","position":"fixed","background-color":"#000","opacity":"0.44"})
		.click(disappear).appendTo($("body")).hide();
	$("<div id='float_div'/>").css({"z-index":"6001","position":"fixed","background-color":"#ffffff","border":"5px solid #000","padding":"20px"})
		.appendTo($("body")).hide();
	$("<div id='float_captcha' align='center'/>").css({"z-index":"6003","position":"fixed","background-color":"#eff6ff","padding":"15px"})
		.appendTo($("body")).hide();
	adaptSize();
		
	var url	= window.location.href;
	groupId	= $("#content p.pl2 a").attr("href").match(/\/group\/(\S+?)\//)[1];
	if (url.indexOf("new_topic")  == url.length - "new_topic".length) {	// start a new topic
		pageType = PGTYPE.NEW;
		$("#content tr:last td:last").html('<input name="rev_submit" type="submit" value="好了，发言"/>&nbsp;&nbsp;&nbsp;'
		/* hav2do this ugly only bcuz sbdb*/ + '<input id="copy_topic" type="button" value="发言并转载"/>&nbsp;&nbsp;&nbsp;'
		/* uses ugly "&nbsp;&nbsp;&nbsp;"*/	 + '<input name="rev_cancel" type="submit" value="撤消"/>')
			.find("#copy_topic").click(copyTopic);
	}
	else if (url.indexOf("edit") == url.length - "edit".length) {	// edit a topic
		pageType = PGTYPE.EDIT;
		topicUrl = url.slice(0, - 4);
		$.get(topicUrl, function(html) {
			var result = html.match(/<a href=\"[\w:\/\.]*?(\/people\/[\w\.-]{1,15}\/)\">/);	// only return the1st one
			if (result != null)	authorUrl = domain + result[1];
		});
		$("#content td:last").html('<input type="submit" value="好了，改吧" name="rev_submit"/>&nbsp;&nbsp;&nbsp;'
									+ '<input type="button" value="修改并转载" id="copy_topic"/>&nbsp;&nbsp;&nbsp;'
									+ '<input type="submit" value="撤消" name="rev_cancel"/>')
			.find("#copy_topic").click(copyTopic);
	}
	else {	// view a topic
		pageType	= PGTYPE.TOPIC;
		if (/start=[1-9]/.test(url))	return;	// start=0 is ok
		topicUrl	= url.slice(0, url.lastIndexOf("/") + 1);	// this is to omit possible url-params such as "?remove=ok" or "?post=ok#last"
		var $author	= $("div.article span.pl20:first a");
		authorName	= $author.text();
		authorUrl	= domain + $author.attr("href");
		$('<span class="fleft">&gt;&nbsp;<a href="#">转载</a></span>').click(copyTopic).prependTo($("#content div.topic-opt"));
	}
	
	$.get(domain + "/group/" + groupId + "/", function(html) {
		var result = html.match(/<img[\s\S]*?class=\"pil groupicon\"[\s\S]*?src=\"(\S+?)\"[\s\S]*?\/>/);
		if (result != null)	groupImg = result[1];
		result = html.match(/<h1>([\s\S]+?)<\/h1>/);
		if (result != null)	groupName = result[1];
	});
});