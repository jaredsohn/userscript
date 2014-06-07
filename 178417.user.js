// ==UserScript==
// @name           [†Академия Миротворцев†] быстрые ссылки
// @namespace      armin4ik 
// @description     †Академия Миротворцев† mod - помощник для  †Академия Миротворцев†
// @version        1.4
// @include        http://*heroeswm.ru/clan_info.php*
// @include        http://178.248.235.15/clan_info.php*
// @include        http://209.200.152.144/clan_info.php*
// @include        http://*.lordswm.com/clan_info.php*
// @include        http://*герои.рф/?15091
// ==/UserScript==


// (c) 2013 + mod, berkut009  ( http://www.heroeswm.ru/pl_info.php?id=1872315 )




var clan_web_offline = document.querySelectorAll("img[src$='clans/offline.gif']");

var web_table = clan_web_offline[0];


 {

while ( web_table.tagName.toLowerCase()!='tr' ) { web_table = web_table.parentNode; }


var web_table_parent = document.querySelector("a[href^='pl_info.php?id=3331552']");
while ( web_table_parent.tagName.toLowerCase()!='tr' ) { web_table_parent = web_table_parent.parentNode; }



var web_table = document.createElement('tr');

var web_hide_parent = web_table_parent.previousSibling.firstChild;




web_table_parent.parentNode.insertBefore(web_table, web_table_parent);




if ( location.search.match('846') ) {
var st_author = '<p align="left"><b>Быстрые ссылки:</b></p>';




var web_table_html = '<td colspan="2" class="wbwhite"><table width="100%" height="100%"><tr><td width="60%" valign="top" style="border-right:1px #5D413A solid;">';


web_table_html += '<table width="100%" cellpadding="5"><tr><td align="left">';

web_table_html += '<p align="center"><b>Помощник с быстрыми ссылками</b><p>';
web_table_html += '<font color="blue"><b>Защита сектора:</b></font>';

web_table_html += '</td></tr><tr><td align="left" style="white-space:nowrap">';

web_table_html += '<b>1.</b> Для участия в защите надо зайти в <a target="_top" style="text-decoration: none;" href="http://ordenmira.ru/forum/index.php?topic=5009.0"><b>квип-чат клана</b></a>.<br><b>2.</b> Следует поставить "<b>+</b>" что покажет вашу готовность к бою.<br><b>3.</b> Если в чате сеть координатор, то ждите пока вас определят в тройку,<br> если нет - составляйте себе тройки сами ( самоорганизация ).<br> <b>4.</b> Все тройки записаны в <a style="text-decoration: none;" href="xmpp:om_academy@conference.qip.ru"><b>Чате</b></a> или в <a target="_top" style="text-decoration: none;" href="sms_clans.php?clan_id=846"><b>Клан рассылке</b></a>.<br> <font color="#FF0000">Важно: Нарушать составленные тройки запрещенно!</font>';

web_table_html += '<br><br><font color="blue"><b>Веселые лица клана:</b></font><br><br> » <a class="pi" href="pl_info.php?id=2502292"><b>lanx</b></a> - Казначей клана и ведущий радио "ГВД"';
web_table_html += '<br> » <a class="pi" href="pl_info.php?id=2682827"><b>Милая_Юля</b></a> - Красивая девушка, Ведущая радио ГВД.';
web_table_html += '<br> » <a class="pi" href="pl_info.php?id=687851"><b>eutanasia</b></a> - Мисс ГВД 2012 "Бронза"';
web_table_html += '<br> » <a class="pi" href="pl_info.php?id=5348396"><b>armin4ik</b></a> -  Создатель скрипта.';

web_table_html += '</td></tr><tr><td>';



web_table_html += '</td></tr></table>';
web_table_html += '</td><td valign="top" height="100%">';

web_table_html += '<table width="100%" height="100%" cellpadding="5"><tr><td align="center">';


web_table_html += '<tr><td valign="top" align="left" >';

web_table_html += '<p align="left"><b>Быстрые ссылки:</b></p>';

web_table_html += '<li><a style="text-decoration: none;" href="sklad_info.php?id=20">Склад клана</a></li>';
web_table_html += '<li><a style="text-decoration: none;" href="forum_messages.php?tid=2003413&page=last">Форум клана</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="clan_info.php?id=18">†Орден Миротворцев†</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href=" http://mw.avesta.tmweb.ru/mapwars/?clan_id=846">Статистика территорий</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://stat.artecbpo.com/salary">Доходность предприятий</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://www.witchhammer.ru/news.php">Молот ведьм</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://lgnd.ru/">lgnd.ru</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://www.ordenmira.ru/">Клановый сайт</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://daily.heroeswm.ru/">HWM DAILY</a></li>';


web_table_html += '<p align="left">Не забываем что клану нужно золото, арты и элементы на развитие клана! ;)</p>';


web_table_html += '</td></tr>';

web_table_html += '<tr><td valign="bottom" align="right" >';


web_table_html += '<tr><td valign="top" align="left" >';
web_table_html += '</td></tr></table></td></tr></table></td>';


web_table.innerHTML = web_table_html;


} 
}




