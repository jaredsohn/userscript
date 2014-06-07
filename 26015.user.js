// ==UserScript==
// @name           LOR report message
// @description    Add a 'Cast moderator' button to linux.org.ru
// @version        0.5.3
// @license        GPL-2
// @namespace      http://infoman.name/userscripts
// @include        http://www.linux.org.ru/view-message.jsp*
// @include        http://www.linux.org.ru/view-vote.jsp*
// ==/UserScript==

// The following function is taken from http://wiki.greasespot.net/index.php?title=0.7.20080121.0_compatibility&oldid=2542
function GM_wrap(f)
{
	return function()
	{
		setTimeout.apply(window, [f, 0].concat([].slice.call(arguments, 1)));
	};
}

$ = unsafeWindow.jQuery.noConflict();

$.GMReport = {
	topicnum: null
}

GMReportFunctions = {
	// Save topic number in cache
	savetopicnum: GM_wrap(function()
	{
		GM_setValue("topicnum", $.GMReport.topicnum);
		GM_setValue("topictime", new Date().getTime().toString());
	}),

	fetchtopicnum: function()
	{
		$.GMReport.topicnum = -1;
		var req = new XMLHttpRequest();
		req.open('GET', 'http://www.linux.org.ru/group.jsp?group=4068', true);
		req.onreadystatechange = function (e) {
			if (req.readyState == 4) {
				if(req.status == 200)
				{
					$(req.responseText).find("img[alt='Прикреплено']").each(function()
					{
						var link = $(this).next("a");
						if (/Ссылки.*некор/i.test(link.html()))
						{
							$.GMReport.topicnum = /msgid=(\d+)/.exec(link.attr("href"))[1];
							GMReportFunctions.savetopicnum();
						}
					});
				}
				else
				{
					alert("Cannot get reports topic number");
				}
			}
		}
		req.send(null);
	},

	// Get topic number for sending reports
	gettopicnum: function()
	{
		if ($.GMReport.topicnum == null)
		{
			var num = GM_getValue("topicnum", null);
			var time = new Number(GM_getValue("topictime", 0));
			var cur = new Date().getTime();
			if ((num != null) && ((cur - time) < 7200000))
			{
				$.GMReport.topicnum = num;
			}
			else
			{
				GMReportFunctions.fetchtopicnum();
			}
		}
		if ($.GMReport.topicnum == -1)
		{
			window.setTimeout(GMReportFunctions.gettopicnum, 100);
		}
		if ($.GMReport.topicnum > 0)
		{
			GMReportFunctions.addbuttons();
		}
	},

	// Add Report buttons to page
	addbuttons: function()
	{
		$("div.title").each(function()
		{
			var div = $(this);
			if (/^[^Ответ]/.test(div.html()))
			{
				div.append("[<a class='lor-report-msg' href='javascript:{/*Сообщить модератору (страница не будет перезагружена)*/}'>Настучать</a>]");
			}
		});

		$("a.lor-report-msg").click(function()
		{
			var comment = window.prompt("Please provide a comment about this message", "5.1")
			if (comment === null)
			{
				return false;
			}

			// Constructing message for posting
			var msgtext = null;
			var reportlink = $(this);
			reportlink.parent().children("a").each(function()
			{
				if ($(this).html() == "#")
				{
					msgtext = this.href + "\n\n" + comment;
				}
			});
			var message = {
				session: /JSESSIONID=(\w+)/.exec(document.cookie)[1],
				topic:    $.GMReport.topicnum,
				title:    "Полуавтоматическое уведомление",
				msg:      msgtext,
				mode:     "quot",
				autourl:  1,
				texttype: 0
			}
			$.post("http://www.linux.org.ru/add_comment.jsp", message, function(data)
			{
				var allmsgs = $(data).find("div.msg");
				var reportnum = /\d+/.exec(allmsgs.eq(allmsgs.length - 1).attr("id"))[0];
				reportlink.unbind().attr("href", "http://www.linux.org.ru/jump-message.jsp?msgid=" + $.GMReport.topicnum + "&cid=" + reportnum).html("Просмотреть");
			})

		});
	}
}
GMReportFunctions.gettopicnum();
