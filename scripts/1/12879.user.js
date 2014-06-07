// ==UserScript==
// @name            Lista de baneados
// @namespace       http://uni11.ogame.com.es/game/pranger.php?from=00
// @description     Muestra la lista de Baneados
// @author          jjcobos
// ==/UserScript==

if (document.URL.indexOf("game/index.php") > -1)
{
	var as = document.getElementsByTagName('a');
	for (var i = 0; i < as.length; i ++)
	{
		var cur_a = as[i];
		/*if (cur_a.href.indexOf('/game/index.php?page=messages&') > -1 && cur_a.parentNode.tagName == 'FONT' &&
			cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')*/
		if ((cur_a.href.indexOf('http://impressum.gameforge.de/') > -1 || cur_a.href.indexOf('http://ogame.com.tw/portal/') > -1) && cur_a.parentNode.tagName == 'FONT' &&
			cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')
		{
			var msg_tr = cur_a.parentNode.parentNode.parentNode.parentNode;
			var menu_table = msg_tr.parentNode;

			var ban_tr = document.createElement('tr');
			var ban_td = document.createElement('td');
			ban_td.innerHTML = '<div align="center"><font color="#FF0000"><a target="_blank" href="http://uni11.ogame.com.es/game/pranger.php?from=00">Baneados</a></font></div>';
			ban_tr.appendChild(ban_td);
			menu_table.appendChild(ban_tr);
			//menu_table.insertBefore(ban_tr, msg_tr);

			break;
		}
	}
}

