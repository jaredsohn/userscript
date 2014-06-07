// ==UserScript==
// @name           Aliancia Atlantida
// @namespace      AlianciaAtlantida
// @autor          Ramsesse
// @description    Script na odkazy týkajuce sa našej Aliancie 
// @include        http://s6.ikariam.cz/index.php*
// @include        http://s6.cz.ikariam.com/index.php*
// @exclude        http://s6.cz.ikariam.com/index.php?view=militaryAdvisorDetailedReportView*
// @exclude        http://s6.cz.ikariam.com/index.php?detailedCombat*
// @exclude        http://s6.ikariam.cz/index.php?view=militaryAdvisorDetailedReportView*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @version        1.5
// @date           17/03/2010
// ==/UserScript==

var myContent = document.createElement('div');
myContent.innerHTML = "<a href='http://s6.cz.ikariam.com/index.php?view=allyPage&allyId=881'><img src='http://img705.imageshack.us/img705/4069/62549071.jpg' alt='Externá stránka Aliancie Atlantida [-A-]' title='Externá stránka Aliancie Atlantida [-A-]'></a></div><div align='center' style='padding-top:5px;'><font color='#542C0F'>Bol si už dnes na našom fóre? <br> Ak nie, teraz je pravý čas..<br><br></font></div><div align='center'><a href='http://atlantida.alianceforum.com/forum.htm' class='button' target='_blank'>Fórum -A-</a> <a href='http://www.chat.nedflendrs.eu/' class='button' target='_blank'>Chat</a></div><div align='center'><br><img src='http://img685.imageshack.us/img685/9255/fireshotcapture005ikari.jpg'><a href='http://blueboard.cz/chatboard-ontario.php?id=230933' target='_blank'><font color='#542C0F'>[-A-] </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237559' target='_blank'><font color='#542C0F'>Αα </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237560' target='_blank'><font color='#542C0F'>Ββ </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237561' target='_blank'><font color='#542C0F'>Γγ </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237562' target='_blank'><font color='#542C0F'>Δδ </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237563' target='_blank'><font color='#542C0F'>Εε </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237564' target='_blank'><font color='#542C0F'>Ζζ </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237565' target='_blank'><font color='#542C0F'>Ηη </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237566' target='_blank'><font color='#542C0F'>Θθ </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237567' target='_blank'><font color='#542C0F'>Ιι </font></a><a href='http://blueboard.cz/chatboard-ontario.php?id=237568' target='_blank'><font color='#542C0F'>Κκ </font></a><p><img src='http://s6.cz.ikariam.com/skin/layout/bg_contentBox01_footer.gif' width='200' height='3'><p><font color='#542C0F'>Najpotrebnejšie témy na fóre:<div><p><a href='http://atlantida.alianceforum.com/forum-f17/topic-t211.htm' target='_blank' title='Pravidlá'><font color='#542C0F'>Pravidlá</a>, <a href='http://atlantida.alianceforum.com/forum-f8/topic-t31-60.htm' target='_blank' title='Kultúrne dohody'><font color='#542C0F'>KD</a>, <a href='http://atlantida.alianceforum.com/forum-f20/topic-t77.htm' target='_blank' title='Nahlás neprítomnosť'><font color='#542C0F'>Neprítomnosť</a></div></div><div align='right' style='padding-top:5px;'><a href='http://s6.cz.ikariam.com/index.php?view=sendIKMessage&receiverId=13693'><font color='#542C0F' size='1'> <pre>© Ramsesse   </pre></font></a>  </font></div>";
IkaTools.addInfoBox("Aliancia Atlantida", myContent);

// -- This part has been gathered from "Ocean Fill" GM utility
// -- Author was Victor Exsecrati - victorexsecrati at gmail dot com
// -- In case of rights problems, please, contact me
GM_addStyle("#city #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img252.imageshack.us/img252/5873/bgcontent1.jpg);text-align:left;}");
GM_addStyle("#city #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img252.imageshack.us/img252/3175/bgfooter1.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#island #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img5.imageshack.us/img5/7774/bgcontent.jpg);text-align:left;}");
GM_addStyle("#island #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img5.imageshack.us/img5/2718/bgfooter.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#worldmap_iso #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url(http://img5.imageshack.us/img5/7774/bgcontent.jpg);text-align:left;}");
GM_addStyle("#worldmap_iso #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url(http://img5.imageshack.us/img5/2718/bgfooter.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");
// -- End of "Ocean fill" part --