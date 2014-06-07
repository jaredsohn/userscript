// ==UserScript==
// @name           [Паутина] быстрые ссылки для руководства
// @namespace      berkut009
// @description    Паутина mod - помощник для руководства
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


var web_table_html = '<td colspan="2" bgcolor="#f9f1f1"><table width="100%" height="100%"><tr><td width="60%" valign="top" ">';



web_table_html += '<center><a class="pi" href="clan_members.php?id=1180">Состав клана</a>&nbsp;|&nbsp;<a class="pi" href="clan_invites.php?id=1180">Приглашения</a>&nbsp;|&nbsp;<a class="pi" href="clan_balance.php?id=1180">Счет клана</a>&nbsp;|&nbsp;<a class="pi" href="clan_broadcast.php?id=1180">Рассылка по клану</a>&nbsp;|&nbsp;<a class="pi" href="sklad_info.php">Клановый склад</a>&nbsp;|&nbsp;<a class="pi" href="forum_messages.php?tid=926425&page=last">Форум клана</a>&nbsp;|&nbsp;<a target="_blank" class="pi" href="http://bizzle.ru/hwm/mapwars/?clan_id=1180&show_clans=zZ^8">Статистика клана</a></center>';

web_table_html += '</td></tr><tr><td>';




web_table.innerHTML = web_table_html;


} 
}




