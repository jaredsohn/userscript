// ==UserScript==
// @name		Skip GK comments
// @namespace	GK
// @description	Skip GK comments 2.1.2
// @include	http://govnokod.ru/*
// ==/UserScript==

(function(){
//============================================================================================================
$ = unsafeWindow.jQuery;

function processComments(pattern, method, vote)
	//обработка комментариев по шаблону имени автора
	{
	//поиск имен авторов
	$("strong[class='entry-author'] > a").each( function (index, Element) {
		commentAuthorLink = $(Element);
		author = commentAuthorLink.html();
		res = pattern.exec(author); //сверяем имя автора с шаблоном
		if (res)
			{ //совпало
			//GM_log('Processing comment by "'+author+'" - match!');
			//скрываем по выбранному методу
			switch (method)
				{
				case '0':commentAuthorLink
					.parents("li[class='hcomment']:eq(0)")
						.hide()
					;break;
				case '1':commentAuthorLink
					.parents("div[class='entry-comment-wrapper']:eq(0)")
						.hide()
					;break;
				case '2':commentAuthorLink
					.parents("div[class='entry-comment-wrapper']:eq(0)")
						.addClass('entry-comment-hidden')
						.find("span[class='comment-text']")
							.before('<span class="hidden-text"><a class="ajax" href="#">'+options['message']+'</a></span>')
					;break;
				case '3': {
					var text = commentAuthorLink
						.parents("div[class='entry-comment-wrapper']:eq(0)")
							.find("span[class='comment-text']");
					text.css('color', text.css('background-color'));
					}; break;
				case '4': ;break;
				}
			//если разрешено голосование - голосуем.
			if (vote)
				commentAuthorLink
					.parents("div[class='entry-comment-wrapper']:eq(0)")
						.find("a[class='comment-vote-against']")
							.click();
			}
		else
			{
			//GM_log('Processing comment by "'+author+'" - no match.');
			}
		});
	}

function processPosts(pattern, method, vote) 
	{
	$("p[class='author'] > a:nth-child(2)").each( function (index, Element) {
		postAuthorLink = $(Element);
		author = postAuthorLink.html();
		res = pattern.exec(author); //сверяем имя автора с шаблоном
		if (res)
			{ //совпало
			//GM_log('Processing post by "'+author+'" - match!');
			//скрываем по выбранному методу
			switch (method)
				{
				case '1':postAuthorLink
					.parents("li[class='hentry']:eq(0)")
						.hide()
					;break;
				case '2':postAuthorLink
					.parents("li[class='hentry']:eq(0)")
						.find("div[class='entry-content']")
							.hide()
					;break;
				case '3': ;break;
				}
			//если разрешено голосование - голосуем.
			if (vote)
				postAuthorLink
					.parents("li[class='hentry']:eq(0)")
						.find("a[class='vote-against']")
							.click();
			}
		else
			{
			//GM_log('Processing post by "'+author+'" - no match.');
			}
		});
	}
//============================================================================================================

function setUsernamePattern()
	//задаем шаблон автора
	{
	var hide = GM_getValue('hide', options['default']);
	hide = prompt('Enter username pattern (regular expression):', hide);
	if (hide)
		{
		GM_setValue('hide', hide);
		location.reload();
		}
	}

function setHideMethod()
	//задаем метод скрытия 
	{
	var method = GM_getValue('method', options['defaultmethod']);
	method = prompt('Choose hiding method:\n0 - hide entire thread\n1 - hide comment\n2 - hide comment under spoiler\n3 - "white on white"\n4 - vote down only (with voting enabled)', method);
	if (typeof(method) != null)
		{
		GM_setValue('method', method);
		location.reload();
		}
	}
	
function setPostMethod()
	//задаем метод скрытия 
	{
	var method = GM_getValue('postsmethod', options['defaultmethod']);
	method = prompt('Choose post hiding method:\n0 - do not process\n1 - hide entire post\n2 - hide post content only\n3 - vote down only (with voting enabled)', method);
	if (typeof(method) != null)
		{
		GM_setValue('postsmethod', method);
		location.reload();
		}
	}
	
function setVoting()
	{
	//разрешаем/запрещаем автоголосование
	var enable = GM_getValue('vote', 0);
	enable = prompt('Enable autovoting?\n0 - no\n1 - yes', enable);
	if (typeof(enable) != null)
		{
		GM_setValue('vote', (enable)?1:0);
		}
	}

//============================================================================================================
function newCommentsLoad(aElemTrigger)
	{
    var commentsLoadUrl = aElemTrigger.attr("href");
    var commentsHolder = aElemTrigger.parent();
    aElemTrigger.replaceWith(document.createTextNode(aElemTrigger.text()));
    var preloader = $("<img src=\"" + unsafeWindow.commentsPreloader.src + "\" alt=\"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\" title=\"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043F\u0438\u0441\u043A\u0430 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432\u2026\" />");
    commentsHolder.append(preloader);
    $.ajax({url: commentsLoadUrl, data: {onlyComments: true}, success: function (msg) {commentsHolder.fadeOut(0);commentsHolder.html(msg);commentsHolder.fadeIn(300);if (typeof hljs == "object") {commentsHolder.find("pre code").each(function () {hljs.highlightBlock(this);});}/*Post-processing*/processComments(options['regexp'], options['method'], options['vote']);/*End of post-processing*/}, error: function (XMLHttpRequest, textStatus, errorThrown) {preloader.remove();alert("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0441\u043F\u0438\u0441\u043A\u0430 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432!\n\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0438 \u043F\u043E\u043F\u044B\u0442\u0430\u0439\u0442\u0435\u0441\u044C \u0435\u0449\u0435 \u0440\u0430\u0437");}});
	}
	
function hijackComments()
	{
	options['old_loader'] = unsafeWindow.comments['load'];
	//GM_log(options['old_loader']);
	unsafeWindow.comments['load'] = newCommentsLoad;
	}

//============================================================================================================
	
options = new Object();
options['default'] = 'Uebok';
//шаблон для скрытия по умолчанию. регулярка.

options['defaultmethod'] = '2';
//метод скрытия по умолчанию

options['message'] = 'показать всё, что скрыто';
//сообщение спойлера

options['enablevote'] = true;
//защита от дурака^W младенца-имбецила.

//регистрируем пользовательские команды
GM_registerMenuCommand('Set username pattern', setUsernamePattern);
GM_registerMenuCommand('Set comment hiding method', setHideMethod);
GM_registerMenuCommand('Set post hiding method', setPostMethod);
if (options['enablevote'])
	GM_registerMenuCommand('Enable voting', setVoting);

//делаем дело
options['regexp'] = new RegExp(GM_getValue('hide', options['default']), 'i');
options['method'] = GM_getValue('method', options['defaultmethod']);
options['vote'] = GM_getValue('vote', false) && options['enablevote'];
options['postsmethod'] = GM_getValue('postsmethod', options['defaultmethod']);

processComments(options['regexp'], options['method'], options['vote']);
if (options['postsmethod']!=0)
	processPosts(options['regexp'], options['postsmethod'], options['vote']);
hijackComments();
})();