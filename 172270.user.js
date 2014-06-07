// ==UserScript==
// @name        同去网-松果标记
// @author      瞬移猫
// @version     1.0.0
// @include     http://www.tongqu.me/*
// @exclude     http://www.tongqu.me/act2/*
// @require     http://www.tongqu.me/js/jquery-1.7.1.min.js
// ==/UserScript==
var addButton = function()
{
	setTimeout(function()
	{
		//添加按钮

		if (GM_getValue("auto_unread"))
		{
			$(".timeblock:first").before("<div class=\"timeblock auto\"><div class=\"timebrick yellowbcolor change\"></div><div class=\"timeletter bluecolor\">自动隐藏</div></div>");
		}
		else
		{
			$(".timeblock:first").before("<div class=\"timeblock auto\"><div class=\"timebrick bluebcolor change\"></div><div class=\"timeletter bluecolor\">自动隐藏</div></div>");
		}
		$(".timeblock:first>.timeletter").css("padding-top", "5px");

		$(".timeblock:first").before("<div class=\"timeblock mark\"><div class=\"timebrick yellowbcolor\"></div><div class=\"timeletter bluecolor\">标记已读</div></div>");
		$(".timeblock:first>.timeletter").css("padding-top", "5px");
		$(".timeblock:first>.timebrick").css("background", "#D51007");

		$(".timeblock:first").before("<div class=\"timeblock unread\"><div class=\"timebrick yellowbcolor\"></div><div class=\"timeletter bluecolor\">查看未读</div></div>");
		$(".timeblock:first>.timeletter").css("padding-top", "5px");
		$(".timeblock:first>.timebrick").css("background", "#82cd5c");

		if (GM_getValue("auto_unread") == true)
			unread();



		$(".unread").bind("click", unread);
		$(".mark").bind("click", mark);
		$(".auto").bind("click", function()
		{
			if (GM_getValue("auto_unread") == undefined || GM_getValue("auto_unread") == false)
			{
				GM_setValue("auto_unread", true);
				$(".timebrick.bluebcolor.change").css("background", "#FEB41C");
				unread();
			}
			else
			{
				GM_setValue("auto_unread", false);
				window.location.reload();
			}
		});
	}, 100);

};
var unread = function()
{
	if ($(".enjoy").size() == 0)
		$(".oneclassactcontainer").before("<div class=\"enjoy\">翻找松果ing…</div>").fadeIn("slow");
	setTimeout(function()
	{
		var hide = 0;
		//隐藏所有已读信息
		$(".box_shadow>.mt5ot.ft12>.ntd:even").each(function(index, elem)
		{
			var href = $(elem).attr("href");
			var num = parseInt(href.substring(href.lastIndexOf("/") + 1));
			if (num <= GM_getValue("readed"))
			{
				$(this).parent().parent().fadeOut("slow");
				hide++;
			}
		});
		$(".enjoy").text("").hide();
		if (hide == $(".box_shadow>.mt5ot.ft12>.ntd:even").size())
		{
			$(".enjoy").text("没有新的松果了，下次再来看看吧~").fadeIn("slow");
		}
		else
		{
			$(".enjoy").text("找到新松果了，尽情享用吧~").fadeIn("slow");
		}

	}, 100);

};
var mark = function()
{
	if (!confirm("将现有的所有松果标为旧松果？"))
		return;

	var max = 0;
	$(".box_shadow>.mt5ot.ft12>.ntd:even").each(function(index, elem)
	{
		var href = $(elem).attr("href");
		var num = parseInt(href.substring(href.lastIndexOf("/") + 1));
		if (num > max)
			max = num;
	});
	GM_setValue("readed", max);
	unread();
};
addButton();
$("a").bind("click", addButton);