// ==UserScript==
// @name           BiteFight: Keyboard Shortcuts
// @description    Assigns keyboard shortcuts to various game functions
// @namespace      Asiman
// @version        1.5
// @date           2011-09-22
// @author         Vesselin Bontchev, edited Asiman
// @include        http://s*.ru.bitefight.gameforge.com/*
// ==/UserScript==

(function ()
{
	var theHref = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	var unsafe = window;
	try
	{
		unsafe = unsafeWindow
	}
	catch (e)
	{
	}
	var $ = unsafe.$;
	if (! $)
		return;
	function badTarget (e)
	{
		var targ;
		if (! e)
			var e = window.event;
		if (e.target)
			targ = e.target;
		else if (e.srcElement)
			targ = e.srcElement;
		if (targ.nodeType == 3) // defeat Safari bug
			targ = targ.parentNode;
		if ((targ.nodeName == "INPUT") || (targ.nodeName == "TEXTAREA"))
			return true;
		return false;
	}


	$ (document).keydown (function (e)
	{
		if ( ((theHref.indexOf ("/user/login") >= 0) ||
        (theHref.indexOf ("/user/lostpw") >= 0) ||
        (theHref.indexOf ("/user/register") >= 0) ||
        (theHref.indexOf ("/user/search") >= 0) ||
        (theHref.indexOf ("/profile/player/") >= 0) ||
        (theHref.indexOf ("/buddy/buddyrequest/") >= 0) ||
        (theHref.indexOf ("/clan/create") >= 0) ||
        (theHref.indexOf ("/clan/memberrights") >= 0) ||
        (theHref.indexOf ("/change/description") >= 0) ||
        (theHref.indexOf ("/change/homepage") >= 0) ||
        (theHref.indexOf ("/change/clantag") >= 0) ||
        (theHref.indexOf ("/change/clanname") >= 0) ||
        (theHref.indexOf ("/profile/index") >= 0) ||
        (theHref.indexOf ("/msg/index") >= 0) ||
        (theHref.indexOf ("/msg/folders") >= 0) ||
        (theHref.indexOf ("/city/shop") >= 0) ||
        (theHref.indexOf ("/city/market") >= 0) ||
        (theHref.indexOf ("/city/counterfeiter") >= 0) ||
        (theHref.indexOf ("/robbery/index") >= 0) ||
        (theHref.indexOf ("/clan/index") >= 0) ||
        (theHref.indexOf ("/buddy/show") >= 0) ||
        (theHref.indexOf ("/user/notes") >= 0) ||
        (theHref.indexOf ("/user/settings") >= 0) ||
        (theHref.indexOf ("/user/search") >= 0) ||
        (theHref.indexOf ("/msg/read") >= 0) ||
        (theHref.indexOf ("/msg/clanmail")) >= 0) && badTarget (e) )
			return;
		switch (e.keyCode)
		{
			case 79:	// "o" Обзор
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='profile/index']").attr ("href");
				return false;
				break;

			case 77:	// "m" Рынок и Сообщения
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "market");
				else
					window.location = $ ("a[href*='msg/index']").attr ("href");
				return false;
				break;

			case 72:	// "h" Храм и Тайник
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "church");
				else
					window.location = $ ("a[href*='hideout/index']").attr ("href");
				return false;
				break;

			case 67:	// "c" Библиотека и Город
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='city/counterfeiter']").attr ("href");
				else
					window.location = $ ("a[href*='city/index']").attr ("href");
				return false;
				break;

			case 82:	// "r" Охота
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='robbery/index']").attr ("href");
				return false;
				break;

			case 80:	// "p" Настройки и Клан
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='user/settings']").attr ("href");
				else
					window.location = $ ("a[href*='clan/index']").attr ("href");
				return false;
				break;

			case 66:	// "b" Контакты
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='buddy/show']").attr ("href");
				return false;
				break;

			case 78:	// "n" Новости и Блокнот
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='main/news']").attr ("href");
				else
					window.location = $ ("a[href*='user/notes']").attr ("href");
				return false;
				break;

			case 83:	// "s" Поиск и Торговец
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='user/search']").attr ("href");
				else
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "shop");
				return false;
				break;

			case 84:	// "t" ТОП-лист и Таверна
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='user/highscore']").attr ("href");
				else
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "taverne");
				return false;
				break;

			case 71:	// "g" Кладбище и Пещера
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "graveyard");
				else
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "grotte");
				return false;
				break;

			case 73:	// "i" Начало истории
				if (e.ctrlKey || e.altKey)
				    break;
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "adventure");
				return false;
				break;

			case 81:	// "q" Миссии
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "missions");
				return false;
				break;

			case 36:	// Home Дом Боли
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "arena");
				return false;
				break;

			case 87:	// "w" Начать клановый чат и Отправить общее сообщение клану
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='clan/index']").attr ("href").replace ("clan/index", "shoutbox");
				else
					window.location = $ ("a[href*='clan/index']").attr ("href").replace ("clan/index", "msg/clanmail");
				return false;
				break;

			case 68:	// "d" Посмотреть пожертвования клану
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='clan/index']").attr ("href").replace ("index", "donationlist");
				return false;
				break;

			case 49:	// "1" Входящие
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/msg/index") > -1){
					window.location = $ ("a[href*='msg/read/?folder=0']").attr ("href");
                }
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/weapons/']").attr ("href");
                }
                if ((theHref.indexOf ("/city/grotte") > -1) || (theHref.indexOf ("/grotte") > -1)) {
                    $ ("input[name=difficulty]").val ("Легкий").click ();
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/1");
                }
				return false;
				break;

			case 50:	// "2" Исходящие
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/msg/index") > -1){
					window.location = $ ("a[href*='msg/read/?folder=100']").attr ("href");
                }
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/potions/']").attr ("href");
                }
                if ((theHref.indexOf ("/city/grotte") > -1) || (theHref.indexOf ("/grotte") > -1)) {
                    $ ("input[name=difficulty]").val ("Средний").click ();
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/2");
                }
				return false;
				break;

			case 51:	// "3"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/helmets/']").attr ("href");
                }
                if ((theHref.indexOf ("/city/grotte") > -1) || (theHref.indexOf ("/grotte") > -1)) {
                    $ ("input[name=difficulty]").val ("Сложный").click ();
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/3");
                }
				return false;
				break;

			case 52:	// "4"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/armor/']").attr ("href");
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/4");
                }
				return false;
				break;

			case 53:	// "5"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/stuff/']").attr ("href");
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/5");
                }
				return false;
				break;

			case 54:	// "6"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/gloves/']").attr ("href");
                }
				return false;
				break;

			case 55:	// "7"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/shoes/']").attr ("href");
                }
				return false;
				break;

			case 56:	// "8"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/shields/']").attr ("href");
                }
				return false;
				break;

			case 57:	// "9"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/totems/']").attr ("href");
                }
				return false;
				break;

		}
		return true;
	});

var replacements, regex, key, textnodes, node, s;

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
            {




            s = node.data;
            if (theHref.indexOf ("/city/shop") > -1)
                {
                s = s.replace("Оружие", "Оружие 1");
                s = s.replace("Зелья", "Зелья 2");
                s = s.replace("Шлемы", "Шлемы 3");
                s = s.replace("Доспехи", "Доспехи 4");
                s = s.replace("Предметы", "Предметы 5");
                s = s.replace("Перчатки", "Перчатки 6");
                s = s.replace("Ботинки", "Ботинки 7");
                s = s.replace("Щиты", "Щиты 8");
                s = s.replace("Тотемы", "Тотемы 9");
                }
            node.data = s;
            }
}
}
) ();
