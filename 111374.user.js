// ==UserScript==
// @name           WarStats
// @namespace      VSOPGW (редакция sp3ctr3)
// @description    Показывает число побед, поражений и ничьих на странице логов боев
// @include        *ganjawars.ru/info.warstats.php*
// @include        *ganjawars.ru/syndicate.log.php*
// ==/UserScript==

(function() {
	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

    if(root.location.href.indexOf('info.warstats') >= 0)
        a_player = /Список завершенных боёв для <a href="(.*?)"><b>(.*?)<\/b>/i.exec(root.document.body.innerHTML);
    else if(root.location.href.indexOf('warstats=1') >= 0)
        a_player = /Протокол боев синдиката <a href="(.*?)">/i.exec(root.document.body.innerHTML);

	player_href = 'http://www.ganjawars.ru' + a_player[1];
	
	var alist = root.document.getElementsByTagName('a');
	wins = 0;
	losses = 0;
	draws = 0;
	for (var i = 0, l = alist.length; i < l; i++) 
	{
		if(alist[i].href == player_href)
		{
			color = alist[i].style.color;
			if (color == 'red')
				wins++;
			else if	(color == 'blue')
				losses++;
			else if (color == 'green')
				draws++;
		}
	}

	var c = root.document.getElementsByTagName('center')[1];

	s = root.document.createElement('div');
	s.innerHTML = '<br><br><nobr><font color=red><b>&nbsp;&nbsp;Побед: ' + wins + '</b></font>, <font color=blue><b>поражений: ' + losses + 
		'</b></font>, <font color=green><b>ничьих: ' + draws + '</b></font></nobr>';

	br = c.nextSibling;
	root.document.body.insertBefore(s, br);

})();