// ==UserScript==
// @name           Aliancia Atlantida
// @namespace      AlianciaAtlantida
// @autor          Ramsesse
// @description    Script na odkazy týkajuce sa našej Aliancie 
// @include        http://s4.ikariam.sk/index.php*
// @include        http://s4.sk.ikariam.com/index.php*
// @exclude        http://s4.sk.ikariam.com/index.php?view=militaryAdvisorDetailedReportView*
// @exclude        http://s4.sk.ikariam.com/index.php?detailedCombat*
// @exclude        http://s4.ikariam.sk/index.php?view=militaryAdvisorDetailedReportView*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @version        1.5
// @date           17/03/2010
// ==/UserScript==

var myContent = document.createElement('div');
myContent.innerHTML = "<p class="centerButton"> <a href="http://s4.sk.ikariam.com/index.php?view=allyPage&allyId=36&oldView=island&id=88" class="button">Externá stránka</a></p></center><p class="centerButton"> <a href="http://s4.sk.ikariam.com/index.php?view=sendIKMessage&msgType=51&allyId=36" class="button">Poslať obežník</a></p></center><center><p class="centerButton"> <a href="?view=embassyTreaties&oldView=embassy&id=3554&position=7&type=51" class="button">Aliančné zmluvy</a></p></center>
IkaTools.addInfoBox("Aliancia Bojovníci", myContent);

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