/* -----


4 scripts (Buildungs and Menu icons and Fullscreen, The West Bag info) from Czech The West Help Group & TheWest++ 
(Translated for The West.ru) & Best Items by Storan
(Thanks guys for excelent work)

4 скрипта от чехов (Вест на весь экран, иконки зданий города и дополнительные пункты меню и  TW Bag Info - Полная инфа по багажу)
1 скрипт TheWest++ (прказывает стоимость багажа)
Адаптировано под Русский Вест
1 скрипт Best Items by Storan - подбор вещей для работ

Ссылку нашего форума и Информера можно изменить на оригинал
*/
// The West Buildings Shortcut Icons
// version 0.2 beta
// Copyright (C) 2009 The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// ---------------------------------------------------------------------------------

// ==UserScript==
// @name           JST 6 in 1 (The West.ru)
// @namespace      www.the-west.sk
// @namespace      www.the-west.ru
// @description    Buildings, Menu Shortcut Icons for the west, Fullscreen window
// @description    and TheWest++ (inventory coast) script. Translated in Russian.
// @description    and The West Bag Info
// @description    and Best Items by Storan. (select best items for work, Translated in Russian)
// @description    JST 6 in 1 creators: Jest and Evgenatrix
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*     
// ==/UserScript==

//======================================== INVENTORY (TheWest++) ====================================

function inv_updateTotalSellPrice (inv)
{
    var inv_TotalSellPrice = document.getElementById("inv_TotalSellPrice");
	if (!inv_TotalSellPrice)
	{
		inv_TotalSellPrice = document.createElement('div');
		inv_TotalSellPrice.setAttribute('id','inv_TotalSellPrice');
		inv.appendChild(inv_TotalSellPrice);
	}
	var equipworth=0;
	var bagworth=0; 
	var productworth=0; 
	var otherworth=0; 
	var bagInstance = unsafeWindow.Bag.getInstance();
	for(var p in bagInstance.items) 
	{ 
		var v = bagInstance.items[p].get_sell_price() * bagInstance.items[p].get_count_value();
		bagworth = bagworth + v;
		if (bagInstance.items[p].get_type()=='yield')
			productworth = productworth + v;
		else
			otherworth = otherworth + v;
	} 
	var w = unsafeWindow.Wear.wear;
	if (w.head) equipworth = equipworth + w .head.get_sell_price();
	if (w .body) equipworth = equipworth + w .body.get_sell_price();
	if (w .neck) equipworth = equipworth + w .neck.get_sell_price();
	if (w .right_arm) equipworth = equipworth + w .right_arm.get_sell_price();
	if (w .foot) equipworth = equipworth + w .foot.get_sell_price();
	if (w .yield) equipworth = equipworth + w .yield.get_sell_price();
	if (w .animal) equipworth = equipworth + w .animal.get_sell_price();

	if (w .yield) productworth = productworth + w .yield.get_sell_price();
	
	var total = equipworth + bagworth;
	inv_TotalSellPrice.innerHTML = '<span style=\"padding-left:40px;\">Всего:&nbsp;<strong>'+total+' $</strong>, одето:&nbsp;<strong>'+equipworth+' $</strong>, багаж:&nbsp;<strong>'+bagworth+' $</strong><br>&nbsp;(продукты:&nbsp;<strong>'+productworth+' $</strong>, другое:&nbsp;<strong>'+otherworth+' $</strong>)</span>';
}

/*

LAT

inv_TotalSellPrice.innerHTML = '<span style=\"padding-left:40px;\">Bcero:&nbsp;<strong>'+total+'$</strong>, ogemo:&nbsp;<strong>'+equipworth+'$</strong>, B CyMke:&nbsp;<strong>'+bagworth+'$</strong><br>&nbsp;(npogykmbI:&nbsp;<strong>'+productworth+'$</strong>, gpygoe:&nbsp;<strong>'+otherworth+'$</strong>)</span>';


RUS

inv_TotalSellPrice.innerHTML = '<span style=\"padding-left:40px;\">Всего:&nbsp;<strong>'+total+'$</strong>, одето:&nbsp;<strong>'+equipworth+'$</strong>, багаж:&nbsp;<strong>'+bagworth+'$</strong><br>&nbsp;(продукты:&nbsp;<strong>'+productworth+'$</strong>, другое:&nbsp;<strong>'+otherworth+'$</strong>)</span>';

*/


function checkWindows_ToAddFeatures ( )
{
  var inv = document.getElementById("window_inventory_content");
  if (inv)
  {
	inv_updateTotalSellPrice(inv);	
  }  
  
  setTimeout ( checkWindows_ToAddFeatures, 2000 );
}

//start up
setTimeout ( checkWindows_ToAddFeatures, 2000 );


// ============================= BUILDINGS MENU ======================================= 
function addFooterIcon(mylink,idname,tipname) {
    var head, style;
    footer_menu_left = document.getElementById('footer_menu_left');
    if (!footer_menu_left) {return;}
    var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" title=\""+tipname+"\" src=\"images/transparent.png\"/>";
    footer_menu_left.appendChild(iconlink);
}

addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith','Оружейник');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor','Портной');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general','Магазин');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel','Отель');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank','Банк');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church','Церковь');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician','Могильщик');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall','Мэрия');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon','Салун&nbsp;&nbsp;&nbsp;(своего города)!');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#abdorment_middle {display:none;}');
addGlobalStyle('#footer_menu_left #footer_building_gunsmith, #footer_menu_left #footer_building_tailor,#footer_menu_left #footer_building_general,#footer_menu_left #footer_building_hotel,#footer_menu_left #footer_building_bank,#footer_menu_left #footer_building_church,#footer_menu_left #footer_building_mortician ,#footer_menu_left #footer_building_cityhall,#footer_menu_left #footer_building_saloon {background-image:url(data:image/png;base64,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%3D);}');
addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');
addGlobalStyle('.homeless #footer_building_gunsmith {background-position:0px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_tailor {background-position:-37px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_general {background-position:-74px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_saloon {background-position:-111px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_mortician {background-position:-148px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_bank {background-position:-185px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_church {background-position:-222px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_hotel {background-position:-259px 37px; cursor:default;}');
addGlobalStyle('.homeless #footer_building_cityhall {background-position:-296px 37px; cursor:default;}');

function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}

addEndDiv('\
	if (Character.home_town == null) {\
		var footer_menu_left = document.getElementById(\'footer_menu_left\');\
		footer_menu_left.setAttribute(\'class\',\'homeless\');\
	}\
;');




// -------Monkey Updater ---------

function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_63', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_63', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=63&version=0.2';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();




//======================================= MENU =====================================



var actual_world = window.location.host.substr(0,3);
var actual_region = window.location.host.substr(0,2);

var twhelp_link = document.createElement("li");
twhelp_link.id="twhelp_link";
switch(actual_region){
case "ru":
language="ru";
break;
case "en":
language="en";
break;
case "ru":
language="ru";
break;
default:
language="en";
break;
}
	twhelp_link.innerHTML = '<a style="background:url(http://s52.radikal.ru/i136/0906/71/cb0ad060d2e7.png) no-repeat" href="http://dinaburg.ucoz.com" target="_blank"></a>';

// twhelp_link.innerHTML (РѕСЂРёРіРёРЅР°Р» СЃСЃС‹Р»РєРё РЅР° "tw-help.ic.cz", РІРјРµСЃС‚Рѕ Р”РёРЅР°Р±СѓСЂРіР°)

//	twhelp_link.innerHTML = '<a style="background:url(http://tw-help.ic.cz/img/tw-helpgm.png) no-repeat" href="http://tw-help.ic.cz?lang='+language+'" target="_blank"></a>';



var weststats_link = document.createElement("li");
weststats_link.id="weststats_link";
if(actual_region=="en"){
weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0301/weststats.jpg) no-repeat" href="http://www.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';
}
else
{
weststats_link.innerHTML = '<a style="background:url(http://g.imagehost.org/0301/weststats.jpg) no-repeat" href="http://'+actual_region+'.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';
}






var publish_duel = document.createElement("li");
publish_duel.id="publish_duel";

publish_duel.innerHTML='<a style="background:url(http://s07.radikal.ru/i180/0907/d9/08ec15051456.png) no-repeat" href="http://forum.the-west.ru/showthread.php?t=9703" target="_blank"></a>';




  /*

 var sfw_link = document.createElement("li");
sfw_link.id="sfw_link";

 sfw_link.innerHTML = '<a style="background:url(http://s58.radikal.ru/i161/0906/e9/87fc43463a51.png) no-repeat" href="http://forum.the-west.ru/showthread.php?t=9703" target="_blank"></a>';
    */
      


 /*
var publish_duel = document.createElement("li");
publish_duel.id="publish_duel";

publish_duel.innerHTML='<a href="javascript: var remoteScript=new Element(\'script\', {\'type\': \'text/javascript\', \'src\': \'http://tw-help.ic.cz/vytah.js\'});document.body.appendChild(remoteScript);void(0);"><img src="http://s58.radikal.ru/i161/0906/e9/87fc43463a51.png" alt="Publish_duel"></a>';
  
   */


//  publish_duel.innerHTML (РѕСЂРёРіРёРЅР°Р» СЃСЃС‹Р»РєРё РєР°СЂС‚РёРЅРєРё РґСѓСЌР»СЊРЅРѕР№ РєРЅРѕРїРєРё РјРµРЅСЋ)

// http://tw-help.ic.cz/img/publikdgm.png

var inv_val = document.createElement("li");
inv_val.id="inv_val";

inv_val.innerHTML = '<a style="background:url(http://s47.radikal.ru/i116/0906/26/a650eecf0f72.png) no-repeat" href="http://west-informer.ucoz.ru" target="_blank"></a>';






//inv_val.innerHTM (РІСЃС‚СЂРѕРµРЅРЅС‹Р№ С‡РµС€СЃРєРёР№ РєР°Р»СЊРєСѓР»СЏС‚РѕСЂ РёРЅРІРµРЅС‚Р°СЂСЏ. РќРµ РїРѕР»РЅС‹Р№. Р—Р°РјРµРЅС‘РЅ РЅР° РёРЅРІРµРЅС‚Р°СЂСЊ TheWest++)

/*

  inv_val.innerHTML = '<a style="background:url(http://tw-help.ic.cz/img/invvalgm.png) no-repeat" href="javascript:var sell_value_equipped = 0, equipped = Wear.wear, inventory_value = 0, inventory = Bag.getInstance().items; if($defined(equipped.animal)) sell_value_equipped += equipped.animal.get_sell_price(); if($defined(equipped.body)) sell_value_equipped += equipped.body.get_sell_price(); if($defined(equipped.foot)) sell_value_equipped += equipped.foot.get_sell_price(); if($defined(equipped.head)) sell_value_equipped += equipped.head.get_sell_price(); if($defined(equipped.neck)) sell_value_equipped += equipped.neck.get_sell_price(); if($defined(equipped.right_arm)) sell_value_equipped += equipped.right_arm.get_sell_price(); if($defined(equipped.yield)) sell_value_equipped += equipped.yield.get_sell_price(); for(var p in inventory) {inventory_value += inventory[p].get_sell_price() * inventory[p].get_count_value();} alert(&#34;Inventarj: &#34; + inventory_value + &#34;$&#92nOdeto: &#34; + sell_value_equipped + &#34;$&#92nvsego: &#34; + (sell_value_equipped + inventory_value) + &#34;$&#34;); end();"></a>';

*/


  /*
var menu_settings = document.getElementById('menu_settings');
var menu_duel = document.getElementById('menu_duel');

if (menu_settings) {
	menu_settings.parentNode.insertBefore(inv_val, menu_settings.nextSibling);
	menu_settings.parentNode.insertBefore(publish_duel, menu_settings.nextSibling);
}
if (menu_duel) {
	menu_duel.parentNode.insertBefore(weststats_link, menu_duel.nextSibling);
	menu_duel.parentNode.insertBefore(twhelp_link, menu_duel.nextSibling);
}

*/
var menu_settings = document.getElementById('menu_settings');
if (!document.getElementById('menu_forts')){
	var menu_forts = document.createElement('li');
	menu_forts.id = 'menu_forts';
	menu_forts.innerHTML = '<a href="javascript:AjaxWindow.show(\'fort_overview\');"><span>Форты</span></a>';
}
else{
	menu_forts = null;
}
if (menu_settings) {
	if (menu_forts){menu_settings.parentNode.insertBefore(menu_forts, menu_settings.nextSibling)}
}


//========================================== FULLSCREEN ============================================


//Раскомментирование сделает окно Веста на весь экран

// Стоит лишь убрать тег /* и  */  вначале и конце раздела

    
  
 function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('body {padding:0;}');
addGlobalStyle('#map_wrapper {top:130px; left:-50px; right:-50px; bottom:0px; margin-bottom:-100px; position:absolute; width:auto; height:auto; overflow:hidden;}');
addGlobalStyle('#map {width:100%; height:100%;}');
addGlobalStyle('#map_mover {width:100%; height:100%; z-index:5;}');
addGlobalStyle('#fade_div {width:100%; height:100%;}');
addGlobalStyle('#map_arrows {width:100%; height:100%; position:absolute; z-index:8px; display:none;}');
addGlobalStyle('#map_place {top:0px; left:0px; right:0px; bottom:-130px; padding:0; margin:0; position:absolute; width:auto; height:auto;"}');
addGlobalStyle('#main_container {width:100%; position:absolute; height:100%; margin:0; top:0; left:0; background:none; padding:0; overflow:hidden; z-index:auto;}');
addGlobalStyle('#footer {width:100%; position:absolute; margin:0; top:100px; left:0; z-index:5;}');
addGlobalStyle('#footer_menu_left {z-index:6;}');
addGlobalStyle('#footer_menu_right {z-index:6;}');
addGlobalStyle('#head_container {width:100%; padding:0px;  background:none;}');
addGlobalStyle('#head_background {width:100%; background-position:top center; background-repeat:repeat-x; margin:0; position:absolute; height:100px; z-index:4;}');
addGlobalStyle('#border_cap {display:none;}');
addGlobalStyle('#abdorments {display:none;}');
addGlobalStyle('#left_menu {left:0;}');
addGlobalStyle('#right_menu {right:0;}');
addGlobalStyle('#menus {z-index:12;}');
addGlobalStyle('#map_scroll_bottom {left:50%; margin-left:-10px; bottom:0px; top:auto; z-index:7; position:absolute;}');
addGlobalStyle('#map_scroll_top {left:50%; margin-left:-10px; top:130px; z-index:7; position:absolute;}');
addGlobalStyle('#map_scroll_left {left:0; top:200px; z-index:7; position:absolute;}');
addGlobalStyle('#map_scroll_right {right:0; top:200px; z-index:7; position:absolute;}');
addGlobalStyle('#footer_menu_left {z-index:6;}');
addGlobalStyle('#current_task {height:auto;}');
addGlobalStyle('#window_bar {z-index:6; width:auto; bottom:0px; left:0px; margin:0px; height:auto;}');
addGlobalStyle('#forum_list {margin-top:10px;}');

var footer = document.getElementById('footer');
footer.style.position = 'absolute';

var footer_menu_left = document.getElementById('footer_menu_left');
footer_menu_left.style.left = '130px';
var footer_menu_right = document.getElementById('footer_menu_right');
footer_menu_right.style.right = '130px';

var footer_server_time = document.getElementById('footer_server_time');
footer_server_time.style.position = 'absolute';
footer_server_time.style.top = '70px';
footer_server_time.style.left = '50%';
footer_server_time.style.color = 'black';
footer_server_time.style.width = '200px';
footer_server_time.style.textAlign = 'center';
footer_server_time.style.zIndex = '10';
footer_server_time.style.margin = '0 0 0 -100px';

function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}

addEndDiv('WMap.initialize();');

 
 
 //==============================  FULL INVENTORY INFO  ===================================
 
 
 // The West Bag Info
// version 0.1 beta
// Copyright (C) 2009 The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Bag Info
// @namespace      www.the-west.sk
// @description    Calculate inventory buy/sell price. Detailed statistic.
// @include        http://*.the-west.*
// @include        http://*.innogames.*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }

	function numberFormat(num) {
		var cislo = '';
		num += '';
		while (num.length > 3) {
			cislo = num.substring(num.length - 3) + ' ' + cislo;
			num = num.substring(0,num.length - 3);
		}
		return num + ' ' + cislo;
	}
	
	function convertBagInfo(div) {

		var sell_value = new Array();
		sell_value['neck'] = 0;
		sell_value['head'] = 0;
		sell_value['right_arm'] = 0;
		sell_value['left_arm'] = 0;
		sell_value['body'] = 0;
		sell_value['yield'] = 0;
		sell_value['foot'] = 0;
		sell_value['animal'] = 0;
		sell_value['total'] = 0;
		
		var sell_value_equipped = 0;
		equipped = unsafeWindow.Wear.wear;
		inventory_value = 0;
		inventory = unsafeWindow.Bag.getInstance().items;
		if (equipped.animal) sell_value['animal'] += equipped.animal.get_sell_price();
		if (equipped.body) sell_value['body'] += equipped.body.get_sell_price();
		if (equipped.foot) sell_value['foot'] += equipped.foot.get_sell_price();
		if (equipped.head) sell_value['head'] += equipped.head.get_sell_price();
		if (equipped.neck) sell_value['neck'] += equipped.neck.get_sell_price();
		if (equipped.left_arm) sell_value['left_arm'] += equipped.left_arm.get_sell_price();
		if (equipped.right_arm) sell_value['right_arm'] += equipped.right_arm.get_sell_price();
		if (equipped.yield) sell_value['yield'] += equipped.yield.get_sell_price();
		for (var p in inventory) {
			sell_value[inventory[p].get_type()] += inventory[p].get_sell_price() * inventory[p].get_count_value();
		}
		sell_value['total'] = sell_value['neck'] + sell_value['head'] + sell_value['right_arm'] + sell_value['body'] + sell_value['yield'] + sell_value['foot'] + sell_value['animal'];

		code = '\
			<style type="text/css">\
				table.inventary {\
					padding:0px;\
					margin:10px;\
				}\
				table.inventary td {\
					text-align: right;\
					vertical-align: middle;\
					padding-bottom: 12px;\
					padding:0px;\
				}\
				table.inventary td.hr {\
					height:4px;\
					background:url(data:image/jpeg;base64,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);\
				}\
				table.inventary .type {\
					background:url(data:image/jpeg;base64,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%3D%3D);\
					width:80px;\
					height:50px;\
				}\
				table.inventary th.icon {\
					width:37px;\
				}\
				table.inventary .typebuyown {background-position:-85px 0px;}\
				table.inventary .typesell {background-position:85px 0px;}\
				table.inventary .icon {\
					width:37px;\
					height:40px;\
					background:url(data:image/jpeg;base64,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%3D);\
				}\
				table.inventary .sum {\
					height:30px;\
					font-weight:bold;\
				}\
				table.inventary .iconneck {background-position:0px -40px;}\
				table.inventary .iconhead {background-position:0px -80px;}\
				table.inventary .iconright_arm {background-position:0px -160px;}\
				table.inventary .iconleft_arm {background-position:0px -280px;}\
				table.inventary .iconbody {background-position:0px -240px;}\
				table.inventary .iconfoot {background-position:0px -200px;}\
				table.inventary .iconanimal {background-position:0px -120px;}\
				table.inventary .iconyield {background-position:0px 0px;}\
			</style>\
			<table border="0" cellspacing="0" cellpadding="0" class="inventary">\
				<tr>\
					<th class="iconheader"></th>\
					<th class="type typebuy"></th>\
					<th class="type typebuyown"></th>\
					<th class="type typesell"></th>\
				</tr>\
				<tr>\
					<td></td>\
					<td class="sum">' + numberFormat(sell_value['total']*8) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']*2) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconneck"></td>\
					<td>' + numberFormat(sell_value['neck']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['neck']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['neck']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconhead"></td>\
					<td>' + numberFormat(sell_value['head']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['head']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['head']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconright_arm"></td>\
					<td>' + numberFormat(sell_value['right_arm']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['right_arm']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['right_arm']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconleft_arm"></td>\
					<td>' + numberFormat(sell_value['left_arm']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['left_arm']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['left_arm']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconbody"></td>\
					<td>' + numberFormat(sell_value['body']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['body']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['body']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconfoot"></td>\
					<td>' + numberFormat(sell_value['foot']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['foot']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['foot']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconanimal"></td>\
					<td>' + numberFormat(sell_value['animal']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['animal']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['animal']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td class="icon iconyield"></td>\
					<td>' + numberFormat(sell_value['yield']*8) + ' $</td>\
					<td>' + numberFormat(sell_value['yield']*2) + ' $</td>\
					<td>' + numberFormat(sell_value['yield']) + ' $</td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td colspan="4" class="hr"></td>\
				</tr>\
				<tr>\
					<td></td>\
					<td class="sum">' + numberFormat(sell_value['total']*8) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']*2) + ' $</td>\
					<td class="sum">' + numberFormat(sell_value['total']) + ' $</td>\
				</tr>\
				<tr>\
					<td class=""></th>\
					<td class="type typebuy"></th>\
					<td class="type typebuyown"></th>\
					<td class="type typesell"></th>\
				</tr>\
			</table>';
		bag = document.getElementById('bag');
		if (document.getElementById('calc')) {
			if (bag.style.display=='none') {
				bag.style.display = 'block';
				calc = document.getElementById('calc');
				calc.style.display = 'none';
			} else {
				bag.style.display = 'none';
				calc = document.getElementById('calc');
				calc.innerHTML = code;
				calc.style.display = 'block';
			}
		} else {
			bag.style.display = 'none';
			bagparent = bag.parentNode;
		    calc = document.createElement('div');
		    calc.innerHTML = code;
			calc.setAttribute('id','calc');
			calc.style.width = '330px';
			calc.style.height = '294px';
			calc.style.overflow = 'auto';
			calc.style.float = 'left';
			calc.style.padding = '5px 0 0 5px';
			calc.style.background = 'url(../images/bgdark.png)';
			bagparent.appendChild(calc);
		}
		calcbutton = document.getElementById('calcbutton');
		if (calcbutton.style.backgroundPosition!='37px 0px') calcbutton.style.backgroundPosition = '37px 0px';
		else calcbutton.style.backgroundPosition = '0px 0px';
	}
	
	function hookInventory(div) {
		if (!document.getElementById('window_inventory')) return;
		div = document.getElementById('window_inventory_content');
		titleRow = div.getElementsByTagName('h2')[0];
	    button = document.createElement('a');
		button.setAttribute('id','calcbutton');
		button.style.background = 'url(data:image/jpeg;base64,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)';
		button.style.width = '37px';
		button.style.height = '37px';
		button.style.position = 'absolute';
		button.style.top = '0px';
		button.style.right = '0px';
		button.style.cursor = 'pointer';
		button.style.display = 'block';
		titleRow.appendChild(button);
		button.addEventListener("click", function() { convertBagInfo(button); }, false);
	}
	
	//
	// Start up
	//
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookInventory(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_68', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_68', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=68&version=0.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();