// ==UserScript==
// @name           [Паутина] быстрые ссылки
// @namespace      berkut009
// @description    Паутина mod - помощник для паучков
// @version        1.4
// @homepage       http://userscripts.org/scripts/show/173761
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


var web_table_parent = document.querySelector("a[href^='pl_info.php?id=372083']");
while ( web_table_parent.tagName.toLowerCase()!='tr' ) { web_table_parent = web_table_parent.parentNode; }



var web_table = document.createElement('tr');

var web_hide_parent = web_table_parent.previousSibling.firstChild;




web_table_parent.parentNode.insertBefore(web_table, web_table_parent);




if ( location.search.match('1180') ) {
var st_author = '<p align="left"><b>Быстрые ссылки:</b></p>';




var web_table_html = '<td colspan="2" class="wbwhite"><table width="100%" height="100%"><tr><td width="60%" valign="top" style="border-right:1px #5D413A solid;">';


web_table_html += '<table width="100%" cellpadding="5"><tr><td align="left">';

web_table_html += '<p align="center"><b>Помощник с быстрыми ссылками</b><p>';
web_table_html += '<font color="blue"><b>Защита сектора:</b></font>';

web_table_html += '</td></tr><tr><td align="left" style="white-space:nowrap">';

web_table_html += '<b>1.</b> Для участия в защите надо зайти в <a target="_top" style="text-decoration: none;" href="http://www.heroeswm.ru/frames.php?room=-1180"><b>чат клана</b></a>.<br><b>2.</b> Следует поставить "<b>+</b>" что покажет вашу готовность к бою.<br><b>3.</b> Если в чате сеть координатор, то ждите пока вас определят в тройку,<br> если нет - составляйте себе тройки сами ( самоорганизация ).<br> <b>4.</b> Все тройки записаны на <a style="text-decoration: none;" href="http://www.heroeswm.ru/sklad_info.php?id=12"><b>складе</b></a> или на <a target="_top" style="text-decoration: none;" href="http://www.heroeswm.ru/forum_messages.php?tid=926425&page=last"><b>форуме клана</b></a>.<br> <font color="#FF0000">Важно: Нарушать составленные тройки запрещенно!</font>';

web_table_html += '<br><br> Премии за защиту будут выданные на следующий день.<br> Т.е. если вы сыграли бои с <i>00.00 12.07.13 до 23.59 12.07.13</i>, то премию стоит<br> ждать на следующий день.';

web_table_html += '<br><br><font color="blue"><b>Веселые лица клана:</b></font><br><br> » <a class="pi" href="pl_info.php?id=757757"><b>ali-Hazard</b></a> - гном-флудер, не обижать, кусается.';
web_table_html += '<br> » <a class="pi" href="pl_info.php?id=2329740"><b>demonn696</b></a> - демон, любит делать всем замечания.';
web_table_html += '<br> » <a class="pi" href="pl_info.php?id=1781932"><b>я_злючка</b></a> - злючка, вы даже не заметите, как на вас накинуться зомбики.';
web_table_html += '<br> » <a class="pi" href="pl_info.php?id=1872315"><b>berkut009</b></a> -  этому парню лучше не флудить в лп.';

web_table_html += '</td></tr><tr><td>';



web_table_html += '</td></tr></table>';
web_table_html += '</td><td valign="top" height="100%">';

web_table_html += '<table width="100%" height="100%" cellpadding="5"><tr><td align="center">';


web_table_html += '<tr><td valign="top" align="left" >';

web_table_html += '<p align="left"><b>Быстрые ссылки:</b></p>';

web_table_html += '<li><a style="text-decoration: none;" href="sklad_info.php?id=12">Склад клана</a></li>';
web_table_html += '<li><a style="text-decoration: none;" href="forum_messages.php?tid=926425&page=last">Форум клана</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="clan_info.php?id=3695">Боевая академия Паутины</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://hwmguide.ru/services/clan_stats/1180">Статистика на гайде</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://bizzle.ru/hwm/mapwars/?clan_id=1180&show_clans=zZ^8">Статистика территорий</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://stat.artecbpo.com/salary">Доходность предприятий</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://www.witchhammer.ru/news.php">Молот ведьм</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://lgnd.ru/">lgnd.ru</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://web-spider.clan.su/">Клановый сайт</a></li>';
web_table_html += '<li><a style="text-decoration: none;" target="_blank" href="http://daily.heroeswm.ru/">HWM DAILY</a></li>';




web_table_html += '<p align="left">» <b>Кузнецы клана:</b></p>';
web_table_html += '<li><a style="text-decoration: none;" href="pl_info.php?id=641808">Виктсиль</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span align="right"> <b>90%</b> за <b><font color="blue">100%</font></b></span></li>';
web_table_html += '<li><a style="text-decoration: none;" href="pl_info.php?id=480018">Дед-Моро3</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span align="right"> <b>90%</b> за <b><font color="blue">100%</font></b></span></li>';


web_table_html += '<p align="left">Не забываем что клану нужны элементы на крафт ;)</p>';


web_table_html += '</td></tr>';

web_table_html += '<tr><td valign="bottom" align="right" >';


web_table_html += '<tr><td valign="top" align="left" >';
web_table_html += '</td></tr></table></td></tr></table></td>';


web_table.innerHTML = web_table_html;


} 
}




