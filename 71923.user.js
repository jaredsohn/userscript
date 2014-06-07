// ==UserScript==
// @name           Aliancia Atlantida
// @namespace      AlianciaAtlantida
// @autor          Ramsesse
// @description    Script na odkazy týkajuce sa našej Aliancie 
// @include        http://s6.ikariam.cz/index.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @version        0.51
// @date           20/03/2010
// ==/UserScript==

var myContent = document.createElement('div');
myContent.innerHTML = "<a href='http://s6.ikariam.cz/index.php?view=allyPage&allyId=881'><img src='http://img705.imageshack.us/img705/4069/62549071.jpg' alt='Alianční stránka aliance Atlantida [-A-]' title='Alianční stránka aliance Atlantida [-A-]'></a></div><div class='centerButton'><a href='http://atlantida.alianceforum.com/forum.htm' class='button' target='_blank'>Fórum Aliancie Atlantida</a></div><div class='centerButton' style='padding-top:5px;'><a href='http://www.chat.nedflendrs.eu/' class='button' target='_blank'>Chat - rozcestník</a></div>";
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
