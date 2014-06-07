	var metadata = <>
// ==UserScript==
// @name           [HWM]Custom Menu
// @namespace      [HWM]Custom Menu by Alex_2oo8
// @homepage       http://userscripts.org/scripts/show/107024
// @description    Даёт возможность пользователю изменить меню.
// @author         Alex_2oo8
// @version        1.1.07
// @include        http://www.heroeswm.ru/*
// @exclude        http://www.heroeswm.ru/warlog.php*
// @exclude        http://www.heroeswm.ru/battlechat.php*
// @exclude        http://www.heroeswm.ru/battle.php*
// @exclude        http://www.heroeswm.ru/war.php*
// @exclude        http://www.heroeswm.ru/brd.php*
// @exclude        http://www.heroeswm.ru/rightcol.php*
// @exclude        http://www.heroeswm.ru/ch_box.php*
// @exclude        http://www.heroeswm.ru/chatonline.php*
// @exclude        http://www.heroeswm.ru/chat_line.php*
// @exclude        http://www.heroeswm.ru/chatpost.php*
// @exclude        http://www.heroeswm.ru/chat.php*
// @exclude        http://www.heroeswm.ru/ticker.php*
// @exclude        http://www.heroeswm.ru/cgame.php*
// @exclude        http://www.heroeswm.ru/
// ==/UserScript==
	</>.toString();
	checkForUpdates( metadata );
	

	if ( GM_getValue('CustomMenu', 'undefined') == 'undefined' )
	{
		setDefault();
		GM_setValue('CustomMenu', 'defined');
		showHint();
	}
	addMenuCommands();
	updateMenus();
	
	function setDefault()
	{
		if ( GM_getValue('CustomMenu', 'undefined') == 'undefined' || confirm('\u0412\u044b \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043b\u044c\u043d\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0432\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u043e\u043c\u0443 \u043c\u0435\u043d\u044e?') )
		{
			GM_setValue('CustomMenu' + 'menusCount', 8);
			GM_setValue('CustomMenu' + 'menu1', true);
			GM_setValue('CustomMenu' + 'menu1name', '\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u0436');
			GM_setValue('CustomMenu' + 'menu1URL', 'http://www.heroeswm.ru/home.php');
			GM_setValue('CustomMenu' + 'menu1submenusCount', 10);
			GM_setValue('CustomMenu' + 'menu1submenu1name', '\u0418\u043d\u0432\u0435\u043d\u0442\u0430\u0440\u044c');
			GM_setValue('CustomMenu' + 'menu1submenu1URL', 'http://www.heroeswm.ru/inventory.php');
			GM_setValue('CustomMenu' + 'menu1submenu2name', '\u041c\u0430\u0433\u0430\u0437\u0438\u043d \u0430\u0440\u0442\u0435\u0444\u0430\u043a\u0442\u043e\u0432');
			GM_setValue('CustomMenu' + 'menu1submenu2URL', 'http://www.heroeswm.ru/shop.php');
			GM_setValue('CustomMenu' + 'menu1submenu3name', '\u0420\u044b\u043d\u043e\u043a');
			GM_setValue('CustomMenu' + 'menu1submenu3URL', 'http://www.heroeswm.ru/auction.php');
			GM_setValue('CustomMenu' + 'menu1submenu4name', 'hr');
			GM_setValue('CustomMenu' + 'menu1submenu4URL', '');
			GM_setValue('CustomMenu' + 'menu1submenu5name', '\u041d\u0430\u0431\u043e\u0440 \u0430\u0440\u043c\u0438\u0438');
			GM_setValue('CustomMenu' + 'menu1submenu5URL', 'http://www.heroeswm.ru/army.php');
			GM_setValue('CustomMenu' + 'menu1submenu6name', '\u0417\u0430\u043c\u043e\u043a');
			GM_setValue('CustomMenu' + 'menu1submenu6URL', 'http://www.heroeswm.ru/castle.php');
			GM_setValue('CustomMenu' + 'menu1submenu7name', '\u041d\u0430\u0432\u044b\u043a\u0438');
			GM_setValue('CustomMenu' + 'menu1submenu7URL', 'http://www.heroeswm.ru/skillwheel.php');
			GM_setValue('CustomMenu' + 'menu1submenu8name', 'hr');
			GM_setValue('CustomMenu' + 'menu1submenu8URL', '');
			GM_setValue('CustomMenu' + 'menu1submenu9name', '\u041b\u0438\u0447\u043d\u0430\u044f \u043f\u043e\u0447\u0442\u0430');
			GM_setValue('CustomMenu' + 'menu1submenu9URL', 'http://www.heroeswm.ru/sms.php');
			GM_setValue('CustomMenu' + 'menu1submenu10name', '\u041f\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u0440\u0435\u0441\u0443\u0440\u0441\u043e\u0432');
			GM_setValue('CustomMenu' + 'menu1submenu10URL', 'http://www.heroeswm.ru/transfer.php');
			GM_setValue('CustomMenu' + 'menu2', true);
			GM_setValue('CustomMenu' + 'menu2name', '\u041a\u0430\u0440\u0442\u0430');
			GM_setValue('CustomMenu' + 'menu2URL', 'http://www.heroeswm.ru/map.php');
			GM_setValue('CustomMenu' + 'menu2submenusCount', 4);
			GM_setValue('CustomMenu' + 'menu2submenu1name', '\u0414\u043e\u0431\u044b\u0447\u0430');
			GM_setValue('CustomMenu' + 'menu2submenu1URL', 'http://www.heroeswm.ru/map.php?st=mn');
			GM_setValue('CustomMenu' + 'menu2submenu2name', '\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430');
			GM_setValue('CustomMenu' + 'menu2submenu2URL', 'http://www.heroeswm.ru/map.php?st=fc');
			GM_setValue('CustomMenu' + 'menu2submenu3name', '\u041f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u043e');
			GM_setValue('CustomMenu' + 'menu2submenu3URL', 'http://www.heroeswm.ru/map.php?st=sh');
			GM_setValue('CustomMenu' + 'menu2submenu4name', '\u0414\u043e\u043c\u0430');
			GM_setValue('CustomMenu' + 'menu2submenu4URL', 'http://www.heroeswm.ru/map.php?st=hs');
			GM_setValue('CustomMenu' + 'menu3', true);
			GM_setValue('CustomMenu' + 'menu3name', '\u0411\u0438\u0442\u0432\u044b');
			GM_setValue('CustomMenu' + 'menu3URL', 'http://www.heroeswm.ru/bselect.php');
			GM_setValue('CustomMenu' + 'menu3submenusCount', 4);
			GM_setValue('CustomMenu' + 'menu3submenu1name', '\u0414\u0443\u044d\u043b\u0438');
			GM_setValue('CustomMenu' + 'menu3submenu1URL', 'http://www.heroeswm.ru/one_to_one.php');
			GM_setValue('CustomMenu' + 'menu3submenu2name', '\u0413\u0440\u0443\u043f\u043f\u043e\u0432\u044b\u0435 \u0431\u043e\u0438');
			GM_setValue('CustomMenu' + 'menu3submenu2URL', 'http://www.heroeswm.ru/group_wars.php');
			GM_setValue('CustomMenu' + 'menu3submenu3name', '\u0413\u0438\u043b\u044c\u0434\u0438\u044f \u0422\u0430\u043a\u0442\u0438\u043a\u043e\u0432');
			GM_setValue('CustomMenu' + 'menu3submenu3URL', 'http://www.heroeswm.ru/pvp_guild.php');
			GM_setValue('CustomMenu' + 'menu3submenu4name', '\u0422\u0443\u0440\u043d\u0438\u0440\u044b');
			GM_setValue('CustomMenu' + 'menu3submenu4URL', 'http://www.heroeswm.ru/tournaments.php');
			GM_setValue('CustomMenu' + 'menu4', true);
			GM_setValue('CustomMenu' + 'menu4name', '\u0422\u0430\u0432\u0435\u0440\u043d\u0430');
			GM_setValue('CustomMenu' + 'menu4URL', 'http://www.heroeswm.ru/tavern.php');
			GM_setValue('CustomMenu' + 'menu4submenusCount', 0);
			GM_setValue('CustomMenu' + 'menu5', true);
			GM_setValue('CustomMenu' + 'menu5name', '\u0420\u0443\u043b\u0435\u0442\u043a\u0430');
			GM_setValue('CustomMenu' + 'menu5URL', 'http://www.heroeswm.ru/roulette.php');
			GM_setValue('CustomMenu' + 'menu5submenusCount', 2);
			GM_setValue('CustomMenu' + 'menu5submenu1name', '\u041f\u0440\u043e\u0448\u043b\u0430\u044f \u0438\u0433\u0440\u0430');
			GM_setValue('CustomMenu' + 'menu5submenu1URL', 'http://www.heroeswm.ru/inforoul.php?id=/*curRGameId*/');
			GM_setValue('CustomMenu' + 'menu5submenu2name', '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0438\u0433\u0440');
			GM_setValue('CustomMenu' + 'menu5submenu2URL', 'http://www.heroeswm.ru/allroul.php');
			GM_setValue('CustomMenu' + 'menu6', true);
			GM_setValue('CustomMenu' + 'menu6name', '\u0420\u0435\u0439\u0442\u0438\u043d\u0433');
			GM_setValue('CustomMenu' + 'menu6URL', 'http://www.heroeswm.ru/plstats.php');
			GM_setValue('CustomMenu' + 'menu6submenusCount', 2);
			GM_setValue('CustomMenu' + 'menu6submenu1name', '\u0420\u0435\u0439\u0442\u0438\u043d\u0433 \u043e\u0445\u043e\u0442\u043d\u0438\u043a\u043e\u0432');
			GM_setValue('CustomMenu' + 'menu6submenu1URL', 'http://www.heroeswm.ru/plstats_hunters.php');
			GM_setValue('CustomMenu' + 'menu6submenu2name', '\u041b\u0438\u0447\u043d\u044b\u0435 \u0434\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u044f');
			GM_setValue('CustomMenu' + 'menu6submenu2URL', 'http://www.heroeswm.ru/pl_hunter_stat.php?id=/*curPlId*/');
			GM_setValue('CustomMenu' + 'menu7', true);
			GM_setValue('CustomMenu' + 'menu7name', '\u0424\u043e\u0440\u0443\u043c');
			GM_setValue('CustomMenu' + 'menu7URL', 'http://www.heroeswm.ru/forum.php');
			GM_setValue('CustomMenu' + 'menu7submenusCount', 5);
			GM_setValue('CustomMenu' + 'menu7submenu1name', '\u041e\u0431\u0449\u0438\u0439 \u0438\u0433\u0440\u043e\u0432\u043e\u0439');
			GM_setValue('CustomMenu' + 'menu7submenu1URL', 'http://www.heroeswm.ru/forum_thread.php?id=2');
			GM_setValue('CustomMenu' + 'menu7submenu2name', '\u0412\u043e\u043f\u0440\u043e\u0441\u044b \u0438 \u043f\u043e\u043c\u043e\u0449\u044c \u0432 \u0438\u0433\u0440\u0435');
			GM_setValue('CustomMenu' + 'menu7submenu2URL', 'http://www.heroeswm.ru/forum_thread.php?id=10');
			GM_setValue('CustomMenu' + 'menu7submenu3name', '\u0422\u043e\u0440\u0433\u043e\u0432\u044b\u0439 \u0444\u043e\u0440\u0443\u043c');
			GM_setValue('CustomMenu' + 'menu7submenu3URL', 'http://www.heroeswm.ru/forum.php#t1');
			GM_setValue('CustomMenu' + 'menu7submenu4name', 'hr');
			GM_setValue('CustomMenu' + 'menu7submenu4URL', '');
			GM_setValue('CustomMenu' + 'menu7submenu5name', '\u041e\u0431 \u0438\u0433\u0440\u0435');
			GM_setValue('CustomMenu' + 'menu7submenu5URL', 'http://www.heroeswm.ru/help.php');
			GM_setValue('CustomMenu' + 'menu8', true);
			GM_setValue('CustomMenu' + 'menu8name', '\u0427\u0430\u0442');
			GM_setValue('CustomMenu' + 'menu8URL', 'http://www.heroeswm.ru/frames.php');
			GM_setValue('CustomMenu' + 'menu8submenusCount', 9);
			GM_setValue('CustomMenu' + 'menu8submenu1name', '\u041a\u043e\u043c\u043d\u0430\u0442\u0430 \u0432\u043e\u043f\u0440\u043e\u0441\u043e\u0432');
			GM_setValue('CustomMenu' + 'menu8submenu1URL', 'http://www.heroeswm.ru/frames.php?room=0');
			GM_setValue('CustomMenu' + 'menu8submenu2name', '\u041e\u0431\u0449\u0430\u044f \u043a\u043e\u043c\u043d\u0430\u0442\u0430');
			GM_setValue('CustomMenu' + 'menu8submenu2URL', 'http://www.heroeswm.ru/frames.php?room=1');
			GM_setValue('CustomMenu' + 'menu8submenu3name', '\u0422\u043e\u0440\u0433\u043e\u0432\u0430\u044f \u043f\u0430\u043b\u0430\u0442\u0430');
			GM_setValue('CustomMenu' + 'menu8submenu3URL', 'http://www.heroeswm.ru/frames.php?room=2');
			GM_setValue('CustomMenu' + 'menu8submenu4name', '\u041e\u0445\u043e\u0442\u043d\u0438\u0447\u044c\u044f \u043a\u043e\u043c\u043d\u0430\u0442\u0430');
			GM_setValue('CustomMenu' + 'menu8submenu4URL', 'http://www.heroeswm.ru/frames.php?room=3');
			GM_setValue('CustomMenu' + 'menu8submenu5name', '\u0420\u0443\u043b\u0435\u0442\u043a\u0430');
			GM_setValue('CustomMenu' + 'menu8submenu5URL', 'http://www.heroeswm.ru/frames.php?room=4');
			GM_setValue('CustomMenu' + 'menu8submenu6name', '\u0422\u0430\u0432\u0435\u0440\u043d\u0430, \u043a\u0430\u0440\u0442\u044b');
			GM_setValue('CustomMenu' + 'menu8submenu6URL', 'http://www.heroeswm.ru/frames.php?room=5');
			GM_setValue('CustomMenu' + 'menu8submenu7name', '\u0414\u0443\u044d\u043b\u0438');
			GM_setValue('CustomMenu' + 'menu8submenu7URL', 'http://www.heroeswm.ru/frames.php?room=6');
			GM_setValue('CustomMenu' + 'menu8submenu8name', '\u0413\u0440\u0443\u043f\u043f\u043e\u0432\u044b\u0435 \u0431\u043e\u0438');
			GM_setValue('CustomMenu' + 'menu8submenu8URL', 'http://www.heroeswm.ru/frames.php?room=7');
			GM_setValue('CustomMenu' + 'menu8submenu9name', 'VIP \u0437\u0430\u043b');
			GM_setValue('CustomMenu' + 'menu8submenu9URL', 'http://www.heroeswm.ru/frames.php?room=8');
			if ( GM_getValue('CustomMenu') == 'defined' )
			{
				updateMenus();
				alert('\u0413\u043e\u0442\u043e\u0432\u043e');
			}
		}
	}
	
	function addMenuCommands()
	{
		GM_registerMenuCommand( '[HWM]Custom Menu: \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043c\u0435\u043d\u044e', addMenu );
		GM_registerMenuCommand( '[HWM]Custom Menu: \u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043c\u0435\u043d\u044e', deleteMenu );
		GM_registerMenuCommand( '[HWM]Custom Menu: \u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0434\u043c\u0435\u043d\u044e', addSubmenu );
		GM_registerMenuCommand( '[HWM]Custom Menu: \u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043f\u043e\u0434\u043c\u0435\u043d\u044e', deleteSubmenu );
		GM_registerMenuCommand( '[HWM]Custom Menu: \u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043a \u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u043e\u043c\u0443 \u043c\u0435\u043d\u044e', setDefault );
		GM_registerMenuCommand( '[HWM]Custom Menu: \u041e \u0441\u043a\u0440\u0438\u043f\u0442\u0435', showHint );
		GM_registerMenuCommand( '[HWM]Custom Menu: \u041e\u0442\u0431\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u0438\u0442\u044c \u0430\u0432\u0442\u043e\u0440\u0430', redirect );
	}
	
	function showHint()
	{
		var meta = toMetadata( metadata );
		var ver = meta['version'];
		alert('	[HWM]Custom Menu\n	Version: ' + ver + '\n	Created by: Alex_2oo8 ( id=315834 )\n\n\u0421\u0440\u0438\u043f\u0442 \u0434\u0430\u00eb\u0442 \u0441\u043e\u0437\u043c\u043e\u0436\u043d\u043e\u0441\u0442\u044c \u0438\u0433\u0440\u043e\u043a\u0443 \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043c\u0435\u043d\u044e\n\u0414\u043b\u044f \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043c\u0435\u043d\u044e \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0437\u0430\u0439\u0442\u0438 \u0432 \u043c\u0435\u043d\u044e \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430:\nTools->GreaseMonkey->User Script Commands...\n\n\n\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0433\u043e \u043c\u0435\u043d\u044e:\n\u0414\u043b\u044f \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043d\u043e\u0432\u043e\u0433\u043e \u043c\u0435\u043d\u044e \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0443\u043d\u043a\u0442 "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043c\u0435\u043d\u044e", \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0438 \u043f\u043e\u043b\u043d\u0443\u044e\n\u0441\u0441\u044b\u043b\u043a\u0443 (\u043e\u043d\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 \u043d\u0430\u0447\u0438\u043d\u0430\u0442\u044c\u0441\u044f \u0441 http://), \u0437\u0430\u0442\u0435\u043c \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u044b\u0431\u0440\u0430\u0442\u044c \u043c\u0435\u0441\u0442\u043e, \u0433\u0434\u0435 \u0431\u0443\u0434\u0435\u0442\n\u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u043e \u043d\u043e\u0432\u043e\u0435 \u043c\u0435\u043d\u044e (\u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u043f\u0438\u0441\u0430\u0442\u044c \u0446\u0438\u0444\u0440\u0443 \u0438\u043b\u0438 \u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0441\u043b\u043e\u0432\u043e last).\n\n\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043c\u0435\u043d\u044e:\n\u0414\u043b\u044f \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f \u043c\u0435\u043d\u044e \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0443\u043d\u043a\u0442 "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043c\u0435\u043d\u044e" \u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0440\u044f\u0434\u043a\u043e\u0432\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u044d\u0442\u043e\u0433\u043e\n\u043c\u0435\u043d\u044e \u0438\u0437 \u0432\u044b\u0434\u0430\u043d\u043d\u043e\u0433\u043e \u0441\u043f\u0438\u0441\u043a\u0430.\n\n\u0414\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u0434\u043c\u0435\u043d\u044e:\n\u0414\u043b\u044f \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043d\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u0434\u043c\u0435\u043d\u044e \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0443\u043d\u043a\u0442 "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u0434\u043c\u0435\u043d\u044e", \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u0435\u043d\u044e, \u0432\n\u043a\u043e\u0442\u043e\u0440\u043e\u0435 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u043f\u043e\u0434\u043c\u0435\u043d\u044e, \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u0435\u0441\u0442\u043e, \u043a\u0443\u0434\u0430 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u043d\u043e\u0432\u043e\u0435 \u043f\u043e\u0434\u043c\u0435\u043d\u044e\n(\u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u043f\u0438\u0441\u0430\u0442\u044c \u0446\u0438\u0444\u0440\u0443 \u0438\u043b\u0438 \u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0441\u043b\u043e\u0432\u043e last), \u0437\u0430\u0442\u0435\u043c \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0438\u043b\u0438 \u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435\nhr \u0434\u043b\u044f \u0440\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u0435\u043b\u044f (\u0433\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u043e\u0439 \u0447\u0435\u0440\u0442\u044b) \u0438 \u043f\u043e\u043b\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443 (\u043e\u043d\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 \u043d\u0430\u0447\u0438\u043d\u0430\u0442\u044c\u0441\u044f \u0441\nhttp://)\n\n\u0423\u0434\u0430\u043b\u0435\u043d\u0438\u0435 \u043f\u043e\u0434\u043c\u0435\u043d\u044e:\n\u0414\u043b\u044f \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f \u043f\u043e\u0434\u043c\u0435\u043d\u044e \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u0443\u043d\u043a\u0442 "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043f\u043e\u0434\u043c\u0435\u043d\u044e", \u0432\u044b\u0431\u0435\u0440\u0438\u0435\u0442 \u043c\u0435\u043d\u044e, \u0438\u0437 \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e\n\u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043b\u0435\u043d\u043e \u043f\u043e\u0434\u043c\u0435\u043d\u044e \u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u0440\u044f\u0434\u043a\u043e\u0432\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u044d\u0442\u043e\u0433\u043e \u043f\u043e\u0434\u043c\u0435\u043d\u044e \u0438\u0437 \u0432\u044b\u0434\u0430\u043d\u043d\u043e\u0433\u043e \u0441\u043f\u0438\u0441\u043a\u0430.\n\n\u0414\u0438\u043d\u0430\u043c\u0438\u0447\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0432 \u0441\u0441\u044b\u043b\u043a\u0430\u0445:\n\u0414\u043e\u0441\u0442\u0443\u043f\u043d\u044b 2 \u0434\u0438\u043d\u0430\u043c\u0438\u0447\u043d\u044b\u0445 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0432 \u0441\u0441\u044b\u043b\u043a\u0430\u0445:\n1) /*curPlId*/ \u2500 id \u0442\u0435\u043a\u0443\u0449\u0435\u0433\u043e \u0438\u0433\u0440\u043e\u043a\u0430 (\u0437\u0430 \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u0412\u044b \u0432 \u0438\u0433\u0440\u0435)\n2) /*curRGameId*/ \u2500 id \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0439 \u0438\u0433\u0440\u044b \u0432 \u0440\u0443\u043b\u0435\u0442\u043a\u0435\n\u041a \u043f\u0440\u0438\u043c\u0435\u0440\u0443: \u0441\u0441\u044b\u043b\u043a\u0430 http://www.heroeswm.ru/pl_info.php?id=/*curPlId*/ , \u043a\u043e\u0433\u0434\u0430 \u0432\u044b \u0437\u0430\u0448\u043b\u0438 \u0437\u0430\n\u043e\u0441\u043d\u043e\u0432\u0443 - \u0431\u0443\u0434\u0435\u0442 \u0432\u0435\u0441\u0442\u0438 \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0443, \u0430 \u043a\u043e\u0433\u0434\u0430 \u0437\u0430 \u0434\u043e\u043f\u0430 - \u043d\u0430 \u0434\u043e\u043f\u0430.\n*\u0412\u0441\u0435 \u0434\u0438\u043d\u0430\u043c\u0438\u0447\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u043d\u0430\u0447\u0438\u043d\u0430\u044e\u0442\u044c\u0441\u044f \u0441 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 /* \u0438 \u0437\u0430\u043a\u0430\u043d\u0447\u0438\u0432\u0430\u044e\u0442\u0441\u044f \u0441\u0438\u043c\u0432\u043e\u043b\u0430\u043c\u0438 */\n\n\n\u0412\u041d\u0418\u041c\u0410\u041d\u0418\u0415! \u041f\u0440\u0438 \u0432\u044b\u0431\u043e\u0440\u0435 \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u0434\u043b\u044f \u043d\u043e\u0432\u043e\u0433\u043e (\u043f\u043e\u0434)\u043c\u0435\u043d\u044e \u0438\u043b\u0438 \u043f\u0440\u0438 \u0432\u044b\u0431\u043e\u0440\u0435 \u043d\u043e\u043c\u0435\u0440\u0430\n(\u043f\u043e\u0434)\u043c\u0435\u043d\u044e \u0434\u043b\u044f \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0432\u043f\u0438\u0441\u044b\u0432\u0430\u0442\u044c \u0422\u041e\u041b\u042c\u041a\u041e \u0447\u0438\u0441\u043b\u043e \u0431\u0435\u0437 \u0441\u043a\u043e\u0431\u043e\u0447\u0435\u043a, \u0442\u043e\u0447\u0435\u043a \u0438\n\u043f\u0440\u043e\u0431\u0435\u043b\u043e\u0432!\n\n\n\u0412\u044b\u0441\u043b\u0443\u0448\u0430\u044e \u0412\u0430\u0448\u0438 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438, \u043f\u043e\u0436\u0435\u043b\u0430\u043d\u0438\u044f \u043f\u043e \u0443\u043b\u0443\u0447\u0448\u0435\u043d\u0438\u044e \u0441\u043a\u0440\u0438\u043f\u0442\u0430 \u0438 \u0432\u043e\u0437\u043c\u043e\u0436\u043d\u044b\u0445\n\u0431\u0430\u0433\u0430\u0445/\u043d\u0435\u0434\u043e\u0440\u043e\u0431\u043e\u0442\u043a\u0430\u0445 \u0432 \u041b\u041f:\nhttp://www.heroeswm.ru/sms-create.php?mailto=Alex_2oo8\n\n\n\u041f\u0440\u0438\u044f\u0442\u043d\u043e\u0439 \u0438\u0433\u0440\u044b!\n');
	}

	function redirect()
	{
		location.href = 'http://www.heroeswm.ru/transfer.php?nick=Alex_2oo8';
	}
	
	function addMenu()
	{
		var name = prompt('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435');
		if ( name )
		{
			var URL = prompt('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u043b\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443\n\n\u0414\u0438\u043d\u0430\u043c\u0438\u0447\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0432 \u0441\u0441\u044b\u043b\u043a\u0435:\n1) /*curPlId*/ \u2500 id \u0442\u0435\u043a\u0443\u0449\u0435\u0433\u043e \u0438\u0433\u0440\u043e\u043a\u0430 (\u0437\u0430 \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u0412\u044b \u0432 \u0438\u0433\u0440\u0435)\n2) /*curRGameId*/ \u2500 id \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0439 \u0438\u0433\u0440\u044b \u0432 \u0440\u0443\u043b\u0435\u0442\u043a\u0435\n\n*\u0412\u0441\u0435 \u0434\u0438\u043d\u0430\u043c\u0438\u0447\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u043d\u0430\u0447\u0438\u043d\u0430\u044e\u0442\u044c\u0441\u044f \u0441 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 /* \u0438 \u0437\u0430\u043a\u0430\u043d\u0447\u0438\u0432\u0430\u044e\u0442\u0441\u044f \u0441\u0438\u043c\u0432\u043e\u043b\u0430\u043c\u0438 */', 'http://');
			if ( URL && URL.substring(0, 7) == 'http://' )
			{
				var place = 'last';
				if ( GM_getValue('CustomMenu' + 'menusCount') > 0 )
				{
					var m = '';
					for ( var i = 1; i <= GM_getValue('CustomMenu' + 'menusCount'); i++ )
					{
						m = m + ' (' + i + ') ' + GM_getValue('CustomMenu' + 'menu' + i + 'name');
					}
					m = m + ' (last)';
					var place = prompt('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u0435\u0441\u0442\u043e \u0434\u043b\u044f \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u043d\u043e\u0432\u043e\u0433\u043e \u043c\u0435\u043d\u044e:\n\n' + m, 'last');
				}
				if ( place && ( GM_getValue('CustomMenu' + 'menu' + place, false) || place == 'last' ) )
				{
					var menusCount = GM_getValue('CustomMenu' + 'menusCount');
					GM_setValue( 'CustomMenu' + 'menusCount', (menusCount + 1) );
					if ( place == 'last' )
					{
						GM_setValue( 'CustomMenu' + 'menu' + (menusCount + 1), true );
						GM_setValue( 'CustomMenu' + 'menu' + (menusCount + 1) + 'disabled', false );
						GM_setValue( 'CustomMenu' + 'menu' + (menusCount + 1) + 'name', name );
						GM_setValue( 'CustomMenu' + 'menu' + (menusCount + 1) + 'URL', URL );
						GM_setValue( 'CustomMenu' + 'menu' + (menusCount + 1) + 'submenusCount', 0 );
					}
					else
					{
						for ( var i = GM_getValue('CustomMenu' + 'menusCount'); i > place; i = i - 1 )
						{
							var prev = i - 1;
							GM_setValue('CustomMenu' + 'menu' + i, true);
							GM_setValue('CustomMenu' + 'menu' + i + 'name', GM_getValue('CustomMenu' + 'menu' + prev + 'name'));
							GM_setValue('CustomMenu' + 'menu' + i + 'URL', GM_getValue('CustomMenu' + 'menu' + prev + 'URL'));
							for ( var j = 1; j <= GM_getValue('CustomMenu' + 'menu' + prev + 'submenusCount'); j++ )
							{
								GM_setValue('CustomMenu' + 'menu' + i + 'submenu' + j + 'name', GM_getValue('CustomMenu' + 'menu' + prev + 'submenu' + j + 'name'));
								GM_setValue('CustomMenu' + 'menu' + i + 'submenu' + j + 'URL', GM_getValue('CustomMenu' + 'menu' + prev + 'submenu' + j + 'URL'));
							}
							GM_setValue('CustomMenu' + 'menu' + i + 'submenusCount', GM_getValue('CustomMenu' + 'menu' + prev + 'submenusCount'));
						}
						GM_setValue( 'CustomMenu' + 'menu' + place, true );
						GM_setValue( 'CustomMenu' + 'menu' + place + 'name', name );
						GM_setValue( 'CustomMenu' + 'menu' + place + 'URL', URL );
						GM_setValue( 'CustomMenu' + 'menu' + place + 'submenusCount', 0 );
					}
					updateMenus();
					alert('\u041c\u0435\u043d\u044e \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e!');
				}
			}
		}
	}
		
	function deleteMenu()
	{
		var m = '';
		for ( var i = 1; i <= GM_getValue('CustomMenu' + 'menusCount'); i++ )
		{
			m = m + '\n' + i + '. ' + GM_getValue('CustomMenu' + 'menu' + i + 'name');
		}
		var id = prompt('\u0412\u0432\u0435\u0434\u0438\u0435\u0442 \u043f\u043e\u0440\u044f\u0434\u043a\u043e\u0432\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u043c\u0435\u043d\u044e \u0434\u043b\u044f \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f\n\n\u041f\u043e\u0440\u044f\u0434\u043a\u043e\u0432\u044b\u0435 \u043d\u043e\u043c\u0435\u0440\u0430 \u043c\u0435\u043d\u044e:' + m);
		if ( id && id <= GM_getValue('CustomMenu' + 'menusCount') )
		{
			if ( confirm('\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043c\u0435\u043d\u044e: ' + id + '. ' + GM_getValue('CustomMenu' + 'menu' + id + 'name') + '?') )
			{
				GM_setValue('CustomMenu' + 'menu' + id, false);
				GM_setValue('CustomMenu' + 'menu' + id + 'name', 'undefined');
				GM_setValue('CustomMenu' + 'menu' + id + 'URL', 'undefined');
				for ( var i = 1; i <= GM_getValue('CustomMenu' + 'menu' + id + 'submenusCount'); i++ )
				{
					GM_setValue('CustomMenu' + 'menu' + id + 'submenu' + i + 'name', 'undefined');
					GM_setValue('CustomMenu' + 'menu' + id + 'submenu' + i + 'URL', 'undefined');
				}
				GM_setValue('CustomMenu' + 'menu' + id + 'submenusCount', 'undefined');
				if ( GM_getValue('CustomMenu' + 'menusCount') == id )
					GM_setValue('CustomMenu' + 'menusCount', id - 1);
				else
				{
					for ( var i = id; i < GM_getValue('CustomMenu' + 'menusCount'); i++ )
					{
						var next = (Number(i) + 1);
						GM_setValue('CustomMenu' + 'menu' + i, true);
						GM_setValue('CustomMenu' + 'menu' + i + 'name', GM_getValue('CustomMenu' + 'menu' + next + 'name'));
						GM_setValue('CustomMenu' + 'menu' + i + 'URL', GM_getValue('CustomMenu' + 'menu' + next + 'URL'));
						for ( var j = 1; j <= GM_getValue('CustomMenu' + 'menu' + next + 'submenusCount'); j++ )
						{
							GM_setValue('CustomMenu' + 'menu' + i + 'submenu' + j + 'name', GM_getValue('CustomMenu' + 'menu' + next + 'submenu' + j + 'name'));
							GM_setValue('CustomMenu' + 'menu' + i + 'submenu' + j + 'URL', GM_getValue('CustomMenu' + 'menu' + next + 'submenu' + j + 'URL'));
						}
						GM_setValue('CustomMenu' + 'menu' + i + 'submenusCount', GM_getValue('CustomMenu' + 'menu' + next + 'submenusCount'));
					}
					GM_setValue('CustomMenu' + 'menu' + GM_getValue('CustomMenu' + 'menusCount'), false);
					GM_setValue('CustomMenu' + 'menusCount', GM_getValue('CustomMenu' + 'menusCount') - 1);
				}
				updateMenus();
				alert('\u041c\u0435\u043d\u044e \u0443\u0434\u0430\u043b\u0435\u043d\u043e!');
			}
		}
	}
	
	function addSubmenu()
	{
		var m = '';
		for ( var i = 1; i <= GM_getValue('CustomMenu' + 'menusCount'); i++ )
		{
			m = m + '\n' + i + '. ' + GM_getValue('CustomMenu' + 'menu' + i + 'name');
		}
		var menu = prompt('\u0412\u044b\u0431\u0435\u0440\u0438\u0435\u0442 \u043c\u0435\u043d\u044e, \u0432 \u043a\u043e\u0442\u043e\u0440\u043e\u0435 \u0431\u0443\u0434\u0435\u0442 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e \u043f\u043e\u0434\u043c\u0435\u043d\u044e\n' + m);
		if ( menu && menu <= GM_getValue('CustomMenu' + 'menusCount') )
		{
			var place = 'first';
			if ( GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount', 0) > 0 )
			{
				var sm = '';
				for ( var i = 1; i <= GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount'); i++ )
				{
					sm = sm + ' (' + i + ') ' + GM_getValue('CustomMenu' + 'menu' + menu + 'submenu' + i + 'name');
				}
				sm = sm + ' (last)';
				var place = prompt( '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043c\u0435\u0441\u0442\u043e \u0434\u043b\u044f \u0440\u0430\u0441\u043f\u043e\u043b\u043e\u0436\u0435\u043d\u0438\u044f \u043d\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u0434\u043c\u0435\u043d\u044e:\n' + sm, 'last' );
			}
			if ( place && ( place <= GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount', 0) || (place == 'first' && GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount', 0) == 0) || place == 'last' ) )
			{
				var name = prompt('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0438\u043b\u0438 hr \u0434\u043b\u044f \u0440\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u0435\u043b\u044f (\u0433\u043e\u0440\u0438\u0437\u0430\u043d\u0442\u0430\u043b\u044c\u043d\u043e\u0439 \u0447\u0435\u0440\u0442\u044b)', 'hr');
				if ( name )
				{
					var URL = false;
					if ( name != 'hr')
						URL = prompt('\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043f\u043e\u043b\u043d\u0443\u044e \u0441\u0441\u044b\u043b\u043a\u0443\n\n\u0414\u0438\u043d\u0430\u043c\u0438\u0447\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u0432 \u0441\u0441\u044b\u043b\u043a\u0435:\n1) /*curPlId*/ \u2500 id \u0442\u0435\u043a\u0443\u0449\u0435\u0433\u043e \u0438\u0433\u0440\u043e\u043a\u0430 (\u0437\u0430 \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u0412\u044b \u0432 \u0438\u0433\u0440\u0435)\n2) /*curRGameId*/ \u2500 id \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0439 \u0438\u0433\u0440\u044b \u0432 \u0440\u0443\u043b\u0435\u0442\u043a\u0435\n\n*\u0412\u0441\u0435 \u0434\u0438\u043d\u0430\u043c\u0438\u0447\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f \u043d\u0430\u0447\u0438\u043d\u0430\u044e\u0442\u044c\u0441\u044f \u0441 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432 /* \u0438 \u0437\u0430\u043a\u0430\u043d\u0447\u0438\u0432\u0430\u044e\u0442\u0441\u044f \u0441\u0438\u043c\u0432\u043e\u043b\u0430\u043c\u0438 */', 'http://');
					if ( ( URL || ( name == 'hr' && !URL ) ) && ( GM_getValue('CustomMenu' + 'menu' + menu, false) && name != '' && ( name == 'hr' || URL.substring(0,7) == 'http://' ) ) )
					{
						switch(place)
						{
							case 'first':
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenusCount', 1);
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + 1 + 'name', name);
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + 1 + 'URL', URL);
								break;
							case 'last':
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenusCount', (GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount') + 1));
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount') + 'name', name);
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount') + 'URL', URL);
								break;
							default:
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenusCount', (GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount') + 1));
								for ( var i = GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount'); i > place; i = i - 1 )
								{
									var prev = i - 1;
									GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + i + 'name', GM_getValue('CustomMenu' + 'menu' + menu + 'submenu' + prev + 'name') );
									GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + i + 'URL', GM_getValue('CustomMenu' + 'menu' + menu + 'submenu' + prev + 'URL') );
								}
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + place + 'name', name);
								GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + place + 'URL', URL);
								break;
						}
						updateMenus();
						alert('\u041f\u043e\u0434\u043c\u0435\u043d\u044e \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u043e!');
					}
				}
			}
		}
	}
	
	function deleteSubmenu()
	{
		var m = '';
		for ( var i = 1; i <= GM_getValue('CustomMenu' + 'menusCount'); i++ )
		{
			if ( GM_getValue('CustomMenu' + 'menu' + i + 'submenusCount', 0) > 0 )
				m = m + '\n' + i + '. ' + GM_getValue('CustomMenu' + 'menu' + i + 'name');
		}
		var menu = prompt('\u0412\u044b\u0431\u0435\u0440\u0438\u0435\u0442 \u043c\u0435\u043d\u044e, \u0438\u0437 \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043b\u0435\u043d\u043e \u043f\u043e\u0434\u043c\u0435\u043d\u044e\n' + m);
		if ( menu && menu <= GM_getValue('CustomMenu' + 'menusCount') )
		{
			var sm = '';
			for ( var i = 1; i <= GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount'); i++ )
			{
				sm = sm + '\n' + i + '. ' + GM_getValue('CustomMenu' + 'menu' + menu + 'submenu' + i + 'name');
			}
			var id = prompt('\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043f\u043e\u0440\u044f\u0434\u043a\u043e\u0432\u044b\u0439 \u043d\u043e\u043c\u0435\u0440 \u043f\u043e\u0434\u043c\u0435\u043d\u044e \u0434\u043b\u044f \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f\n' + sm);
			if ( id && GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount', 0) >= id && confirm('\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043b\u0438\u0442\u044c \u043f\u043e\u0434\u043c\u0435\u043d\u044e: ' + id + '. ' + GM_getValue('CustomMenu' + 'menu' + menu + 'submenu' + id + 'name')) )
			{
				if ( GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount', 0) == id )
				{
					GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + id + 'name', 'undefined' );
					GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + id + 'URL', 'undefined' );
				}
				else
				{
					for ( var i = id; i < GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount'); i++ )
					{
						var next = (Number(i) + 1);
						GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + i + 'name', GM_getValue('CustomMenu' + 'menu' + menu + 'submenu' + next + 'name') );
						GM_setValue('CustomMenu' + 'menu' + menu + 'submenu' + i + 'URL', GM_getValue('CustomMenu' + 'menu' + menu + 'submenu' + next + 'URL') );
					}
				}
				GM_setValue('CustomMenu' + 'menu' + menu + 'submenusCount', GM_getValue('CustomMenu' + 'menu' + menu + 'submenusCount') - 1);
				updateMenus();
				alert('\u041f\u043e\u0434\u043c\u0435\u043d\u044e \u0443\u0434\u0430\u043b\u0435\u043d\u043e!');
			}
		}
	}
	
	function updateMenus()
	{
		var tb_arr = document.getElementsByTagName('table');
		for (var i = 0; i < tb_arr.length; i++)
		{
			var elem = tb_arr[i];
			if ( elem.style.background.indexOf('top/line/t_bkg.jpg') != -1 )
			{
				ny = false;
				var im_s_m = elem.style.background.match( /(http:\/\/.*\/)top\/line\/t_bkg\.jpg/ );
				im_s = im_s_m[1];
				break;
			}
			else if ( elem.style.background.indexOf('top_ny_rus/line/t_bkg_.jpg') != -1 )
			{
				ny = true;
				var im_s_m = elem.style.background.match( /(http:\/\/.*\/)top_ny_rus\/line\/t_bkg_\.jpg/ );
				im_s = im_s_m[1];
				break;
			}
		}
		check( elem );
		while ( elem.firstChild )
			elem.removeChild(elem.firstChild);
		var tbody = document.createElement('tbody');
		elem.appendChild(tbody);
		var tr = document.createElement('tr');
		elem.getElementsByTagName('tbody')[0].appendChild(tr);
		elem = elem.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
		for ( var i = 1; i <= GM_getValue('CustomMenu' + 'menusCount'); i++ )
		{
			elem.innerHTML += '<td align="center" valign="middle"></td>';
			if ( GM_getValue('CustomMenu' + 'battle') )
				var color = '255, 0, 0';
			else
			{
				if ( i % 2 == 1 )
					var color = '245, 193, 55';
				else
					var color = '255, 216, 117';
			}
			var icon = '';
			if ( GM_getValue('CustomMenu' + 'menu' + i + 'URL').indexOf('home.php') != -1 && GM_getValue( 'CustomMenu' + 'newMsg' ) )
			{
				icon = '<td><a href="' + GM_getValue('CustomMenu' + 'msgLink') + '"><img height="12" border="0" align="absmiddle" width="12" alt="\u0414\u043b\u044f \u0412\u0430\u0441 \u0435\u0441\u0442\u044c \u043d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435!" title="\u0414\u043b\u044f \u0412\u0430\u0441 \u0435\u0441\u0442\u044c \u043d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435!" src="' + im_s + 'top/line/pismo.gif"></a></td>';
			}
			if ( GM_getValue('CustomMenu' + 'menu' + i + 'URL').indexOf('bselect.php') != -1 && GM_getValue( 'CustomMenu' + 'duel' ) )
			{
				icon = '<td><a href="one_to_one.php"><img height="12" border="0" align="absmiddle" width="12" alt="\u0412\u0430\u0441 \u0432\u044b\u0437\u0432\u0430\u043b\u0438 \u043d\u0430 \u0434\u0443\u044d\u043b\u044c!" title="\u0412\u0430\u0441 \u0432\u044b\u0437\u0432\u0430\u043b\u0438 \u043d\u0430 \u0434\u0443\u044d\u043b\u044c!" src="' + im_s + 'top/line/mech.gif"></a></td>';
			}
			if ( GM_getValue('CustomMenu' + 'menu' + i + 'URL').indexOf('tavern.php') != -1 && GM_getValue( 'CustomMenu' + 'cgame' ) )
			{
				icon = '<td><a href="tavern.php"><img height="12" border="0" align="absmiddle" width="12" alt="\u0412\u0430\u0441 \u0432\u044b\u0437\u0432\u0430\u043b\u0438 \u043d\u0430 \u0434\u0443\u044d\u043b\u044c!" title="\u0412\u0430\u0441 \u0432\u044b\u0437\u0432\u0430\u043b\u0438 \u043d\u0430 \u0434\u0443\u044d\u043b\u044c!" src="' + im_s + 'top/line/cards.gif"></a></td>';
			}
			if ( GM_getValue('CustomMenu' + 'menu' + i + 'URL').indexOf('bselect.php') != -1 && GM_getValue( 'CustomMenu' + 'hunt' ) )
			{
				icon = '<td><a href="group_wars.php?filter=hunt"><img height="12" border="0" align="absmiddle" width="12" alt="\u041e\u0445\u043e\u0442\u043d\u0438\u043a\u0443 \u043d\u0443\u0436\u043d\u0430 \u043f\u043e\u043c\u043e\u0449\u044c!" title="\u041e\u0445\u043e\u0442\u043d\u0438\u043a\u0443 \u043d\u0443\u0436\u043d\u0430 \u043f\u043e\u043c\u043e\u0449\u044c!" src="' + im_s + 'top/line/lapa.gif"></a></td>';
			}
			elem.lastChild.innerHTML = '<table border="0" cellspacing="0" cellpadding="0" bgcolor="#6b6b69"><tbody><tr><td height="3" style="background: url(' + im_s + ( !ny ? 'top/' : 'top_ny_rus/' ) + 'line/t_top_bkg' + ( ny ? '_' : '' ) + '.jpg);"></td></tr><tr><td height="18" align="center" valign="middle" style="background: url(' + im_s + ( !ny ? 'top/' : 'top_ny_rus/' ) + 'line/t_com_bkg' + ( ny ? '_' : '' ) + '.jpg);"><table width="100%" border="0" align="center" valign="middle" cellspacing="0" cellpadding="0"><tbody><tr><td valign="middle" align="center"><div id="breadcrumbs"><ul><li class="subnav"><nobr>&nbsp;<a href="' + GM_getValue('CustomMenu' + 'menu' + i + 'URL').replace( '/*curPlId*/', GM_getValue('CustomMenu' + 'curPlId', '') ).replace( '/*curRGameId*/', GM_getValue('CustomMenu' + 'curRGameId', '') ) + '" style="text-decoration: none; color: rgb(' + color + ');"><b>' + GM_getValue('CustomMenu' + 'menu' + i + 'name') + '</b></a>&nbsp;</nobr></li></ul></div></td>' + icon + '</tr></tbody></table></td></tr></tbody></table>';
			var tbody = elem.lastChild.lastChild.lastChild;
			var li = elem.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.lastChild.firstChild.lastChild.lastChild.lastChild;
			if ( GM_getValue('CustomMenu' + 'menu' + i + 'submenusCount', 0) > 0 )
			{
				li.innerHTML += '<ul></ul>';
				var ul = li.lastChild;
				for ( var j = 1; j <= GM_getValue('CustomMenu' + 'menu' + i + 'submenusCount'); j++ )
				{
					ul.innerHTML += '<li></li>';
					var li = ul.lastChild;
					var a = document.createElement('a');
					if ( GM_getValue('CustomMenu' + 'menu' + i + 'submenu' + j + 'name') != 'hr' )
					{
						a.href = GM_getValue('CustomMenu' + 'menu' + i + 'submenu' + j + 'URL').replace( '/*curPlId*/', GM_getValue('CustomMenu' + 'curPlId', '') ).replace( '/*curRGameId*/', GM_getValue('CustomMenu' + 'curRGameId', '') );
						a.innerHTML = GM_getValue('CustomMenu' + 'menu' + i + 'submenu' + j + 'name');
						li.appendChild(a);
					}
					else
					{
						li.innerHTML = '<hr>';
					}
				}
			}
			tbody.innerHTML += '<tr><td height="5" width="100%" align="center" style="background: url(' + im_s + ( !ny ? 'top/' : 'top_ny_rus/' ) + 'line/t_bot_bkg' + ( ny ? '_' : '' ) + '.jpg);"><img src="http://www.heroeswm.ru/i/' + ( !ny ? 'top/' : 'top_ny_rus/' ) + 'line/t_center' + ( ny ? '_' : '' ) + '.jpg" width="17" height="5" alt=""></td></tr>';
			var td = tbody.lastChild.lastChild;
			if ( i < GM_getValue('CustomMenu' + 'menusCount') )
			{
				elem.innerHTML += '<td width="9"><img src="' + im_s + ( !ny ? 'top/' : 'top_ny_rus/' ) + 'line/t_end' + ( ny ? '_' : '' ) + '.jpg" width="9" height="26" alt=""></td>'
			}
		}
	}
		
	function check( elem )
	{
		var a_arr = elem.getElementsByTagName('a');
		var br = 0;
		for ( var i = 0; i < a_arr.length; i++ )
		{
			if ( a_arr[i].href.indexOf('inforoul.php?id=') != -1 )
			{
				var rGameId = a_arr[i].href.substring( a_arr[i].href.indexOf('inforoul.php?id=') + 'inforoul.php?id='.length );
				GM_setValue( 'CustomMenu' + 'curRGameId', rGameId );
				br++;
			}
			if ( a_arr[i].href.indexOf('pl_hunter_stat.php?id=') != -1 )
			{
				var plId = a_arr[i].href.substring( a_arr[i].href.indexOf('pl_hunter_stat.php?id=') + 'pl_hunter_stat.php?id='.length );
				GM_setValue( 'CustomMenu' + 'curPlId', plId );
				br++;
			}
			if ( br == 2 )
				break;
		}
		var img_arr = elem.getElementsByTagName('img');
		var br = 0;
		var newMsg = false;
		var duel = false;
		var cgame = false;
		var hunt = false;
		for ( var i = 0; i < img_arr.length; i++ )
		{
			if ( img_arr[i].src.indexOf(im_s + 'top/line/pismo.gif') != -1 )
			{
				var link = img_arr[i].parentNode.href;
				GM_setValue('CustomMenu' + 'msgLink', link);
				newMsg = true;
				br++;
			}
			if ( img_arr[i].src.indexOf(im_s + 'top/line/mech.gif') != -1 )
			{
				duel = true;
				br++;
			}
			if ( img_arr[i].src.indexOf(im_s + 'top/line/cards.gif') != -1 )
			{
				cgame = true;
				br++;
			}
			if ( img_arr[i].src.indexOf(im_s + 'top/line/lapa.gif') != -1 )
			{
				hunt = true;
				br++;
			}
			if ( br == 4 )
				break;
		}
		GM_setValue( 'CustomMenu' + 'newMsg', newMsg );
		GM_setValue( 'CustomMenu' + 'duel', duel );
		GM_setValue( 'CustomMenu' + 'cgame', cgame );
		GM_setValue( 'CustomMenu' + 'hunt', hunt );
		var battle = false;
		if ( elem.getElementsByTagName('nobr')[0].getElementsByTagName('a')[0].style.color == 'rgb(255, 0, 0)' )
			battle = true;
		GM_setValue('CustomMenu' + 'battle', battle);
	}
	
	function checkForUpdates( metadata )
	{
		var date = new Date();
		var today = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
		var lastDay = GM_getValue('lastDate', '');
		if ( today != lastDay )
		{
			GM_setValue('lastDate', today);
			var metadata = toMetadata( metadata );
			var homepage = metadata['homepage'];
			var script_id = homepage.substring( homepage.indexOf('/scripts/show/') + '/scripts/show/'.length );
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/' + script_id + '.meta.js',
				headers:
				{
					'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.8.1)',
					'Accept': 'text /xml,application/xml,application/xhtml+xml,text/html',
					'Content-type': 'application/x-www-form-urlencoded'
				},
				onload: function(resp)
				{
					var newMetadata = toMetadata( resp.responseText );
					if ( 'version' in newMetadata && metadata['version'] != newMetadata['version'] && confirm(metadata['name'] + ': \u0414\u043e\u0441\u0442\u0443\u043f\u043d\u043e \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435 \u0441\u043a\u0440\u0438\u043f\u0442\u0430!\n\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0441\u043a\u0440\u0438\u043f\u0442?') )
					{
						location.href = 'http://userscripts.org/scripts/source/' + script_id + '.user.js';
					}
				}
			});
		}
	}
	
	function toMetadata( string )
	{
		var m_arr = string.split('\n');
		var metadata_arr = new Array();
		for ( var i = 0; i < m_arr.length; i++ )
		{
			if ( /\/\/ @\w*\s*.*/.test(m_arr[i]) )
			{
				var metadata = m_arr[i].match(/\/\/ @(\w*)\s*(.*)/);
				metadata_arr[metadata[1]] = metadata[2];
			}
		}
		return metadata_arr;
	}