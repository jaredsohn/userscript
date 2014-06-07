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


/*

4 scripts (Buildungs and Menu icons and Fullscreen, The West Bag info) from Czech The West Help Group & TheWest++ 
(Translated for The West.ru) & Best Items by Storan
(Thanks guys for excelent work)

4 СЃРєСЂРёРїС‚Р° РѕС‚ С‡РµС…РѕРІ (Р’РµСЃС‚ РЅР° РІРµСЃСЊ СЌРєСЂР°РЅ, РёРєРѕРЅРєРё Р·РґР°РЅРёР№ РіРѕСЂРѕРґР° Рё РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РїСѓРЅРєС‚С‹ РјРµРЅСЋ Рё  TW Bag Info - РџРѕР»РЅР°СЏ РёРЅС„Р° РїРѕ Р±Р°РіР°Р¶Сѓ)
1 СЃРєСЂРёРїС‚ TheWest++ (РїСЂРєР°Р·С‹РІР°РµС‚ СЃС‚РѕРёРјРѕСЃС‚СЊ Р±Р°РіР°Р¶Р°)
РђРґР°РїС‚РёСЂРѕРІР°РЅРѕ РїРѕРґ Р СѓСЃСЃРєРёР№ Р’РµСЃС‚
1 СЃРєСЂРёРїС‚ Best Items by Storan - РїРѕРґР±РѕСЂ РІРµС‰РµР№ РґР»СЏ СЂР°Р±РѕС‚

РЎСЃС‹Р»РєСѓ РЅР°С€РµРіРѕ С„РѕСЂСѓРјР° Рё РРЅС„РѕСЂРјРµСЂР° РјРѕР¶РЅРѕ РёР·РјРµРЅРёС‚СЊ РЅР° РѕСЂРёРіРёРЅР°Р»
*/
// The West Buildings Shortcut Icons
// version 0.2 beta
// Copyright (C) 2009 The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// ---------------------------------------------------------------------------------


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
	inv_TotalSellPrice.innerHTML = '<span style=\"padding-left:40px;\">Р’СЃРµРіРѕ:&nbsp;<strong>'+total+' $</strong>, РѕРґРµС‚Рѕ:&nbsp;<strong>'+equipworth+' $</strong>, Р±Р°РіР°Р¶:&nbsp;<strong>'+bagworth+' $</strong><br>&nbsp;(РїСЂРѕРґСѓРєС‚С‹:&nbsp;<strong>'+productworth+' $</strong>, РґСЂСѓРіРѕРµ:&nbsp;<strong>'+otherworth+' $</strong>)</span>';
}

/*

LAT

inv_TotalSellPrice.innerHTML = '<span style=\"padding-left:40px;\">Bcero:&nbsp;<strong>'+total+'$</strong>, ogemo:&nbsp;<strong>'+equipworth+'$</strong>, B CyMke:&nbsp;<strong>'+bagworth+'$</strong><br>&nbsp;(npogykmbI:&nbsp;<strong>'+productworth+'$</strong>, gpygoe:&nbsp;<strong>'+otherworth+'$</strong>)</span>';


RUS

inv_TotalSellPrice.innerHTML = '<span style=\"padding-left:40px;\">Р’СЃРµРіРѕ:&nbsp;<strong>'+total+'$</strong>, РѕРґРµС‚Рѕ:&nbsp;<strong>'+equipworth+'$</strong>, Р±Р°РіР°Р¶:&nbsp;<strong>'+bagworth+'$</strong><br>&nbsp;(РїСЂРѕРґСѓРєС‚С‹:&nbsp;<strong>'+productworth+'$</strong>, РґСЂСѓРіРѕРµ:&nbsp;<strong>'+otherworth+'$</strong>)</span>';

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
function addFooterIcon(mylink,idname) {
    var head, style;
    footer_menu_left = document.getElementById('footer_menu_left');
    if (!footer_menu_left) {return;}
    var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
    footer_menu_left.appendChild(iconlink);
}

addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall');
addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon');

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


//========================================== FULLSCREEN ============================================


//Р Р°СЃРєРѕРјРјРµРЅС‚РёСЂРѕРІР°РЅРёРµ СЃРґРµР»Р°РµС‚ РѕРєРЅРѕ Р’РµСЃС‚Р° РЅР° РІРµСЃСЊ СЌРєСЂР°РЅ

// РЎС‚РѕРёС‚ Р»РёС€СЊ СѓР±СЂР°С‚СЊ С‚РµРі /* Рё  */  РІРЅР°С‡Р°Р»Рµ Рё РєРѕРЅС†Рµ СЂР°Р·РґРµР»Р°

    
  
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
 // ================================BEST ITEMS 2 ===========================
 
 /*

//С€РёСЂРёРЅР° РѕРєРѕРЅ.
unsafeWindow.bi2_w0=350;
unsafeWindow.bi2_w1=900;
// РћР±С‹С‡РЅС‹Р№ РІРµСЃС‚, 1024  



unsafeWindow.bi2_l0 = (window.innerWidth) ? (window.innerWidth-unsafeWindow.bi2_w0)/2 : (1024-unsafeWindow.bi2_w0) /2 ;
unsafeWindow.bi2_t0=-5;
unsafeWindow.bi2_l1 = (window.innerWidth) ? (window.innerWidth-unsafeWindow.bi2_w1)/2 : (1024-unsafeWindow.bi2_w1) /2 ;
unsafeWindow.bi2_t1=140;


//РІС‹СЃРѕС‚Р° РѕРєРѕРЅ
unsafeWindow.bi2_title_h_min=25;
unsafeWindow.bi2_title_h_mid=70;
unsafeWindow.bi2_title_h_max=275;
unsafeWindow.bi2_window_h_min=25;
unsafeWindow.bi2_window_h_max=400;



unsafeWindow.bi2_tlink=' style=\"color:white; display:block; width:25px; height:20px; float:left;\" ';
unsafeWindow.bi2_vblock=' style=\"border:1px solid black; padding:1px; marging:1px;\" ';
unsafeWindow.bi2_title_flag=0;
unsafeWindow.bi2_title_flag2=1;
unsafeWindow.bi2_window_flag2=1;

bi2_code='';

bi2_code += "\
bi2_zaschitato=20;\
bi2_import=false;\
bi2_khlam=false;\
ezda=false;\
zaschita=null;\
bi2_millioner=false;\
bi2_process=false;\
\
einfo='';\
winfo='';\
\
bi2_types=['right_arm', 'left_arm', 'head', 'body', 'foot', 'neck', 'animal', 'yield'];\
nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer'];\
\
bi2_predmetov = {};\
bi2_uchet=[];\
bi2_aktiv=[];\
bi2_nenuzhnoe=[];\
irabota=0;\
bi2_inv_imported=false;\
bi2_slots={};\
";



bi2_code += "\
items=[];\
\
items[0] = {item_id:0, nshort:'nothing', name:'Р·Р°РіР»СѓС€РєР°', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};\
\
items[1] = {item_id:1, nshort:'clayjug', name:'Р Р°Р·Р±РёС‚С‹Р№ РіР»РёРЅСЏРЅС‹Р№ РєСѓРІС€РёРЅ', type:'right_arm', level:2, price:16, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[2] = {item_id:2, nshort:'winebottle', name:'Р Р°Р·Р±РёС‚Р°СЏ РІРёРЅРЅР°СЏ Р±СѓС‚С‹Р»РєР°', type:'right_arm', level:5, price:26, image:'images/items/right_arm/winebottle.png', image_mini:'images/items/right_arm/mini/winebottle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[3] = {item_id:3, nshort:'whiskeybottle', name:'Р Р°Р·Р±РёС‚Р°СЏ Р±СѓС‚С‹Р»РєР° РІРёСЃРєРё', type:'right_arm', level:7, price:40, image:'images/items/right_arm/whiskeybottle.png', image_mini:'images/items/right_arm/mini/whiskeybottle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[4] = {item_id:4, nshort:'rotty_club', name:'Р“РЅРёР»Р°СЏ РґСѓР±РёРЅРєР°', type:'right_arm', level:7, price:26, image:'images/items/right_arm/rotty_club.png', image_mini:'images/items/right_arm/mini/rotty_club.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[5] = {item_id:5, nshort:'club', name:'Р”СѓР±РёРЅРєР°', type:'right_arm', level:10, price:63, image:'images/items/right_arm/club.png', image_mini:'images/items/right_arm/mini/club.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[6] = {item_id:6, nshort:'nail_club', name:'Р”СѓР±РёРЅРєР° СЃ С€РёРїРѕРј', type:'right_arm', level:13, price:125, image:'images/items/right_arm/nail_club.png', image_mini:'images/items/right_arm/mini/nail_club.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[7] = {item_id:7, nshort:'rusty_razor', name:'Р Р¶Р°РІР°СЏ Р±СЂРёС‚РІР°', type:'right_arm', level:12, price:64, image:'images/items/right_arm/rusty_razor.png', image_mini:'images/items/right_arm/mini/rusty_razor.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[8] = {item_id:8, nshort:'razor', name:'Р‘СЂРёС‚РІР°', type:'right_arm', level:15, price:146, image:'images/items/right_arm/razor.png', image_mini:'images/items/right_arm/mini/razor.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[9] = {item_id:9, nshort:'sharp_razor', name:'РћСЃС‚СЂР°СЏ Р±СЂРёС‚РІР°', type:'right_arm', level:18, price:354, image:'images/items/right_arm/sharp_razor.png', image_mini:'images/items/right_arm/mini/sharp_razor.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10] = {item_id:10, nshort:'figaros_razor', name:'Р‘СЂРёС‚РІР° Р¤РёРіР°СЂРѕ', type:'right_arm', level:25, price:1740, image:'images/items/right_arm/figaros_razor.png', image_mini:'images/items/right_arm/mini/figaros_razor.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, aim:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[11] = {item_id:11, nshort:'rusty_skewer', name:'Р Р¶Р°РІС‹Р№ РєРёРЅР¶Р°Р»', type:'right_arm', level:17, price:122, image:'images/items/right_arm/rusty_skewer.png', image_mini:'images/items/right_arm/mini/rusty_skewer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[12] = {item_id:12, nshort:'skewer', name:'РљРёРЅР¶Р°Р»', type:'right_arm', level:20, price:384, image:'images/items/right_arm/skewer.png', image_mini:'images/items/right_arm/mini/skewer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[13] = {item_id:13, nshort:'sharp_skewer', name:'РћСЃС‚СЂС‹Р№ РєРёРЅР¶Р°Р»', type:'right_arm', level:23, price:554, image:'images/items/right_arm/sharp_skewer.png', image_mini:'images/items/right_arm/mini/sharp_skewer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[15] = {item_id:15, nshort:'rusty_bowie', name:'Р Р¶Р°РІС‹Р№ РЅРѕР¶', type:'right_arm', level:27, price:450, image:'images/items/right_arm/rusty_bowie.png', image_mini:'images/items/right_arm/mini/rusty_bowie.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[16] = {item_id:16, nshort:'bowie', name:'РќРѕР¶', type:'right_arm', level:30, price:850, image:'images/items/right_arm/bowie.png', image_mini:'images/items/right_arm/mini/bowie.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[17] = {item_id:17, nshort:'sharp_bowie', name:'РћСЃС‚СЂС‹Р№ РЅРѕР¶', type:'right_arm', level:33, price:1220, image:'images/items/right_arm/sharp_bowie.png', image_mini:'images/items/right_arm/mini/sharp_bowie.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[19] = {item_id:19, nshort:'rusty_foil', name:'Р Р¶Р°РІР°СЏ СЂР°РїРёСЂР°', type:'right_arm', level:32, price:730, image:'images/items/right_arm/rusty_foil.png', image_mini:'images/items/right_arm/mini/rusty_foil.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20] = {item_id:20, nshort:'foil', name:'Р Р°РїРёСЂР°', type:'right_arm', level:35, price:1134, image:'images/items/right_arm/foil.png', image_mini:'images/items/right_arm/mini/foil.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[21] = {item_id:21, nshort:'sharp_foil', name:'РћСЃС‚СЂР°СЏ СЂР°РїРёСЂР°', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/sharp_foil.png', image_mini:'images/items/right_arm/mini/sharp_foil.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[23] = {item_id:23, nshort:'rusty_machete', name:'Р Р¶Р°РІС‹Р№ РјР°С‡РµС‚Рµ', type:'right_arm', level:37, price:940, image:'images/items/right_arm/rusty_machete.png', image_mini:'images/items/right_arm/mini/rusty_machete.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[24] = {item_id:24, nshort:'machete', name:'РњР°С‡РµС‚Рµ', type:'right_arm', level:40, price:1560, image:'images/items/right_arm/machete.png', image_mini:'images/items/right_arm/mini/machete.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[25] = {item_id:25, nshort:'sharp_machete', name:'РћСЃС‚СЂС‹Р№ РјР°С‡РµС‚Рµ', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/sharp_machete.png', image_mini:'images/items/right_arm/mini/sharp_machete.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Р Р¶Р°РІС‹Р№ РјРµС‡ РєРѕРЅРєРёСЃС‚Р°РґРѕСЂР°', type:'right_arm', level:47, price:1710, image:'images/items/right_arm/rusty_conquistador.png', image_mini:'images/items/right_arm/mini/rusty_conquistador.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[28] = {item_id:28, nshort:'conquistador', name:'РњРµС‡ РєРѕРЅРєРёСЃС‚Р°РґРѕСЂР°', type:'right_arm', level:50, price:2560, image:'images/items/right_arm/conquistador.png', image_mini:'images/items/right_arm/mini/conquistador.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[29] = {item_id:29, nshort:'sharp_conquistador', name:'РћСЃС‚СЂС‹Р№ РјРµС‡ РєРѕРЅРєРёСЃС‚Р°РґРѕСЂР°', type:'right_arm', level:53, price:3370, image:'images/items/right_arm/sharp_conquistador.png', image_mini:'images/items/right_arm/mini/sharp_conquistador.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[30] = {item_id:30, nshort:'henandos_conquistador', name:'РњРµС‡ Р­СЂРЅР°РЅРґРѕ', type:'right_arm', level:50, price:8700, image:'images/items/right_arm/henandos_conquistador.png', image_mini:'images/items/right_arm/mini/henandos_conquistador.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Р Р¶Р°РІС‹Р№ РўРѕРјР°РіР°РІРє', type:'right_arm', level:57, price:2900, image:'images/items/right_arm/rusty_tomahawk.png', image_mini:'images/items/right_arm/mini/rusty_tomahawk.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[32] = {item_id:32, nshort:'tomahawk', name:'РўРѕРјР°РіР°РІРє', type:'right_arm', level:60, price:3800, image:'images/items/right_arm/tomahawk.png', image_mini:'images/items/right_arm/mini/tomahawk.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'РћСЃС‚СЂС‹Р№ С‚РѕРјР°РіР°РІРє', type:'right_arm', level:63, price:4900, image:'images/items/right_arm/sharp_tomahawk.png', image_mini:'images/items/right_arm/mini/sharp_tomahawk.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[35] = {item_id:35, nshort:'rusty_axe', name:'Р Р¶Р°РІС‹Р№ С‚РѕРїРѕСЂ Р»РµСЃРѕСЂСѓР±Р°', type:'right_arm', level:62, price:3400, image:'images/items/right_arm/rusty_axe.png', image_mini:'images/items/right_arm/mini/rusty_axe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[36] = {item_id:36, nshort:'axe', name:'РўРѕРїРѕСЂ Р»РµСЃРѕСЂСѓР±Р°', type:'right_arm', level:65, price:4400, image:'images/items/right_arm/axe.png', image_mini:'images/items/right_arm/mini/axe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[37] = {item_id:37, nshort:'sharp_axe', name:'РћСЃС‚СЂС‹Р№ С‚РѕРїРѕСЂ Р»РµСЃРѕСЂСѓР±Р°', type:'right_arm', level:68, price:5600, image:'images/items/right_arm/sharp_axe.png', image_mini:'images/items/right_arm/mini/sharp_axe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[39] = {item_id:39, nshort:'rusty_sabre', name:'Р Р¶Р°РІР°СЏ РєР°РІР°Р»РµСЂРёР№СЃРєР°СЏ СЃР°Р±Р»СЏ', type:'right_arm', level:67, price:4200, image:'images/items/right_arm/rusty_sabre.png', image_mini:'images/items/right_arm/mini/rusty_sabre.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[43] = {item_id:43, nshort:'screwdriver', name:'РћС‚РІС‘СЂС‚РєР°', type:'right_arm', level:10, price:114, image:'images/items/right_arm/screwdriver.png', image_mini:'images/items/right_arm/mini/screwdriver.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[44] = {item_id:44, nshort:'spanner', name:'Р“Р°РµС‡РЅС‹Р№ РєР»СЋС‡', type:'right_arm', level:21, price:628, image:'images/items/right_arm/spanner.png', image_mini:'images/items/right_arm/mini/spanner.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{build:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[45] = {item_id:45, nshort:'crowbar', name:'Р¤РѕРјРєР°', type:'right_arm', level:36, price:1594, image:'images/items/right_arm/crowbar.png', image_mini:'images/items/right_arm/mini/crowbar.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[46] = {item_id:46, nshort:'whips', name:'РљРЅСѓС‚', type:'right_arm', level:30, price:594, image:'images/items/right_arm/whips.png', image_mini:'images/items/right_arm/mini/whips.png', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[101] = {item_id:101, nshort:'bow_rusty', name:'РўСЂСѓС…Р»СЏРІС‹Р№ Р»СѓРє', type:'left_arm', level:5, price:400, image:'images/items/left_arm/bow_rusty.png', image_mini:'images/items/left_arm/mini/bow_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[102] = {item_id:102, nshort:'bow_normal', name:'Р›СѓРє', type:'left_arm', level:10, price:650, image:'images/items/left_arm/bow_normal.png', image_mini:'images/items/left_arm/mini/bow_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[103] = {item_id:103, nshort:'bow_best', name:'РўРѕС‡РЅС‹Р№ Р»СѓРє', type:'left_arm', level:13, price:1275, image:'images/items/left_arm/bow_best.png', image_mini:'images/items/left_arm/mini/bow_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[104] = {item_id:104, nshort:'crossbow_rusty', name:'РўСЂСѓС…Р»СЏРІС‹Р№ Р°СЂР±Р°Р»РµС‚', type:'left_arm', level:10, price:520, image:'images/items/left_arm/crossbow_rusty.png', image_mini:'images/items/left_arm/mini/crossbow_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[105] = {item_id:105, nshort:'crossbow_normal', name:'РђСЂР±Р°Р»РµС‚', type:'left_arm', level:20, price:755, image:'images/items/left_arm/crossbow_normal.png', image_mini:'images/items/left_arm/mini/crossbow_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[106] = {item_id:106, nshort:'crossbow_best', name:'РўРѕС‡РЅС‹Р№ Р°СЂР±Р°Р»РµС‚', type:'left_arm', level:23, price:1600, image:'images/items/left_arm/crossbow_best.png', image_mini:'images/items/left_arm/mini/crossbow_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Р Р¶Р°РІР°СЏ РїРёС‰Р°Р»СЊ', type:'left_arm', level:18, price:684, image:'images/items/left_arm/arkebuse_rusty.png', image_mini:'images/items/left_arm/mini/arkebuse_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[108] = {item_id:108, nshort:'arkebuse_normal', name:'РџРёС‰Р°Р»СЊ', type:'left_arm', level:30, price:1070, image:'images/items/left_arm/arkebuse_normal.png', image_mini:'images/items/left_arm/mini/arkebuse_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[109] = {item_id:109, nshort:'arkebuse_best', name:'РўРѕС‡РЅР°СЏ РїРёС‰Р°Р»СЊ', type:'left_arm', level:33, price:2444, image:'images/items/left_arm/arkebuse_best.png', image_mini:'images/items/left_arm/mini/arkebuse_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Р Р¶Р°РІРѕРµ РѕС…РѕС‚РЅРёС‡СЊРµ СЂСѓР¶СЊС‘', type:'left_arm', level:20, price:775, image:'images/items/left_arm/blunderbuss_rusty.png', image_mini:'images/items/left_arm/mini/blunderbuss_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'РћС…РѕС‚РЅРёС‡СЊРµ СЂСѓР¶СЊС‘', type:'left_arm', level:35, price:1300, image:'images/items/left_arm/blunderbuss_normal.png', image_mini:'images/items/left_arm/mini/blunderbuss_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[112] = {item_id:112, nshort:'blunderbuss_best', name:'РўРѕС‡РЅРѕРµ РѕС…РѕС‚РЅРёС‡СЊРµ СЂСѓР¶СЊС‘', type:'left_arm', level:38, price:2950, image:'images/items/left_arm/blunderbuss_best.png', image_mini:'images/items/left_arm/mini/blunderbuss_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[113] = {item_id:113, nshort:'musket_rusty', name:'Р Р¶Р°РІС‹Р№ РјСѓС€РєРµС‚', type:'left_arm', level:25, price:920, image:'images/items/left_arm/musket_rusty.png', image_mini:'images/items/left_arm/mini/musket_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[114] = {item_id:114, nshort:'musket_normal', name:'РњСѓС€РєРµС‚', type:'left_arm', level:40, price:1580, image:'images/items/left_arm/musket_normal.png', image_mini:'images/items/left_arm/mini/musket_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[115] = {item_id:115, nshort:'musket_best', name:'РўРѕС‡РЅС‹Р№ РјСѓС€РєРµС‚', type:'left_arm', level:43, price:3850, image:'images/items/left_arm/musket_best.png', image_mini:'images/items/left_arm/mini/musket_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[116] = {item_id:116, nshort:'flint_rusty', name:'Р Р¶Р°РІС‹Р№ РґСЂРѕР±РѕРІРёРє', type:'left_arm', level:35, price:1350, image:'images/items/left_arm/flint_rusty.png', image_mini:'images/items/left_arm/mini/flint_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[117] = {item_id:117, nshort:'flint_normal', name:'Р”СЂРѕР±РѕРІРёРє', type:'left_arm', level:50, price:2440, image:'images/items/left_arm/flint_normal.png', image_mini:'images/items/left_arm/mini/flint_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[118] = {item_id:118, nshort:'flint_best', name:'РўРѕС‡РЅС‹Р№ РґСЂРѕР±РѕРІРёРє', type:'left_arm', level:53, price:6300, image:'images/items/left_arm/flint_best.png', image_mini:'images/items/left_arm/mini/flint_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[120] = {item_id:120, nshort:'shotgun_normal', name:'Р’РёРЅС‚РѕРІРєР°', type:'left_arm', level:55, price:3000, image:'images/items/left_arm/shotgun_normal.png', image_mini:'images/items/left_arm/mini/shotgun_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[121] = {item_id:121, nshort:'shotgun_best', name:'РўРѕС‡РЅР°СЏ РІРёРЅС‚РѕРІРєР°', type:'left_arm', level:58, price:7000, image:'images/items/left_arm/shotgun_best.png', image_mini:'images/items/left_arm/mini/shotgun_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[122] = {item_id:122, nshort:'percussion_rusty', name:'Р Р¶Р°РІС‹Р№ РєР°СЂР°Р±РёРЅ', type:'left_arm', level:45, price:2000, image:'images/items/left_arm/percussion_rusty.png', image_mini:'images/items/left_arm/mini/percussion_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[123] = {item_id:123, nshort:'percussion_normal', name:'РљР°СЂР°Р±РёРЅ', type:'left_arm', level:60, price:3800, image:'images/items/left_arm/percussion_normal.png', image_mini:'images/items/left_arm/mini/percussion_normal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[124] = {item_id:124, nshort:'percussion_best', name:'РўРѕС‡РЅС‹Р№ РєР°СЂР°Р±РёРЅ', type:'left_arm', level:63, price:8800, image:'images/items/left_arm/percussion_best.png', image_mini:'images/items/left_arm/mini/percussion_best.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
\
items[200] = {item_id:200, nshort:'band_red', name:'РљСЂР°СЃРЅР°СЏ Р±Р°РЅРґР°РЅР°', type:'head', level:1, price:4, image:'images/items/head/band_red.png', image_mini:'images/items/head/mini/band_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[201] = {item_id:201, nshort:'band_green', name:'Р—РµР»С‘РЅР°СЏ Р±Р°РЅРґР°РЅР°', type:'head', level:2, price:4, image:'images/items/head/band_green.png', image_mini:'images/items/head/mini/band_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, dodge:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[202] = {item_id:202, nshort:'band_blue', name:'РЎРёРЅСЏСЏ Р±Р°РЅРґР°РЅР°', type:'head', level:2, price:4, image:'images/items/head/band_blue.png', image_mini:'images/items/head/mini/band_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[203] = {item_id:203, nshort:'band_yellow', name:'Р–С‘Р»С‚Р°СЏ Р±Р°РЅРґР°РЅР°', type:'head', level:2, price:4, image:'images/items/head/band_yellow.png', image_mini:'images/items/head/mini/band_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[204] = {item_id:204, nshort:'band_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ Р±Р°РЅРґР°РЅР°', type:'head', level:3, price:18, image:'images/items/head/band_brown.png', image_mini:'images/items/head/mini/band_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, health:2, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[205] = {item_id:205, nshort:'band_black', name:'Р§С‘СЂРЅР°СЏ Р±Р°РЅРґР°РЅР°', type:'head', level:3, price:18, image:'images/items/head/band_black.png', image_mini:'images/items/head/mini/band_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2, repair:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'РЎРµСЂР°СЏ РєРµРїРєР°', type:'head', level:3, price:46, image:'images/items/head/slouch_cap_grey.png', image_mini:'images/items/head/mini/slouch_cap_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ РєРµРїРєР°', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_brown.png', image_mini:'images/items/head/mini/slouch_cap_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Р§С‘СЂРЅР°СЏ РєРµРїРєР°', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_black.png', image_mini:'images/items/head/mini/slouch_cap_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3, pitfall:3, leadership:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Р—РЅР°С‚РЅР°СЏ РєРµРїРєР°', type:'head', level:6, price:520, image:'images/items/head/slouch_cap_fine.png', image_mini:'images/items/head/mini/slouch_cap_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, aim:4, tactic:4, reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[210] = {item_id:210, nshort:'cap_grey', name:'РЎРµСЂР°СЏ С€Р°РїРєР°', type:'head', level:4, price:90, image:'images/items/head/cap_grey.png', image_mini:'images/items/head/mini/cap_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[211] = {item_id:211, nshort:'cap_red', name:'РљСЂР°СЃРЅР°СЏ С€Р°РїРєР°', type:'head', level:5, price:175, image:'images/items/head/cap_red.png', image_mini:'images/items/head/mini/cap_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[212] = {item_id:212, nshort:'cap_green', name:'Р—РµР»С‘РЅР°СЏ С€Р°РїРєР°', type:'head', level:5, price:175, image:'images/items/head/cap_green.png', image_mini:'images/items/head/mini/cap_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[213] = {item_id:213, nshort:'cap_blue', name:'РЎРёРЅСЏСЏ С€Р°РїРєР°', type:'head', level:5, price:175, image:'images/items/head/cap_blue.png', image_mini:'images/items/head/mini/cap_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[214] = {item_id:214, nshort:'cap_yellow', name:'Р–С‘Р»С‚Р°СЏ С€Р°РїРєР°', type:'head', level:5, price:175, image:'images/items/head/cap_yellow.png', image_mini:'images/items/head/mini/cap_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[215] = {item_id:215, nshort:'cap_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ С€Р°РїРєР°', type:'head', level:6, price:300, image:'images/items/head/cap_brown.png', image_mini:'images/items/head/mini/cap_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[216] = {item_id:216, nshort:'cap_black', name:'Р§С‘СЂРЅР°СЏ С€Р°РїРєР°', type:'head', level:6, price:300, image:'images/items/head/cap_black.png', image_mini:'images/items/head/mini/cap_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, tactic:4, finger_dexterity:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[217] = {item_id:217, nshort:'cap_fine', name:'Р—РЅР°С‚РЅР°СЏ С€Р°РїРєР°', type:'head', level:8, price:1100, image:'images/items/head/cap_fine.png', image_mini:'images/items/head/mini/cap_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, shot:5, animal:5, tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'РЎРµСЂР°СЏ РїР°РЅР°РјР°', type:'head', level:7, price:220, image:'images/items/head/slouch_hat_grey.png', image_mini:'images/items/head/mini/slouch_hat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ РїР°РЅР°РјР°', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_brown.png', image_mini:'images/items/head/mini/slouch_hat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, punch:5, dodge:4}, attributes:{}}, set:{key:'set_farmer', name:'РќР°Р±РѕСЂ С„РµСЂРјРµСЂР°'}, shop:'shop'};\
items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Р§С‘СЂРЅР°СЏ РїР°РЅР°РјР°', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_black.png', image_mini:'images/items/head/mini/slouch_hat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, tactic:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Р—РЅР°С‚РЅР°СЏ РїР°РЅР°РјР°', type:'head', level:12, price:1920, image:'images/items/head/slouch_hat_fine.png', image_mini:'images/items/head/mini/slouch_hat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, endurance:6, leadership:6, reflex:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[222] = {item_id:222, nshort:'bowler_grey', name:'РЎРµСЂС‹Р№ РєРѕС‚РµР»РѕРє', type:'head', level:10, price:420, image:'images/items/head/bowler_grey.png', image_mini:'images/items/head/mini/bowler_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[223] = {item_id:223, nshort:'bowler_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Р№ РєРѕС‚РµР»РѕРє', type:'head', level:12, price:808, image:'images/items/head/bowler_brown.png', image_mini:'images/items/head/mini/bowler_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, build:6, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[224] = {item_id:224, nshort:'bowler_black', name:'Р§С‘СЂРЅС‹Р№ РєРѕС‚РµР»РѕРє', type:'head', level:12, price:808, image:'images/items/head/bowler_black.png', image_mini:'images/items/head/mini/bowler_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}}, set:{key:'set_quackery', name:'Р—РЅР°С…Р°СЂСЃРєР°СЏ СѓС‚РІР°СЂСЊ'}, shop:'shop'};\
items[225] = {item_id:225, nshort:'bowler_fine', name:'Р—РЅР°С‚РЅС‹Р№ РєРѕС‚РµР»РѕРє', type:'head', level:15, price:1850, image:'images/items/head/bowler_fine.png', image_mini:'images/items/head/mini/bowler_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, tough:6, repair:5, ride:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'РЁР»СЏРїР° РёР· СЃРµСЂРѕРіРѕ С„РµС‚СЂР°', type:'head', level:14, price:655, image:'images/items/head/cloth_hat_grey.png', image_mini:'images/items/head/mini/cloth_hat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:10, aim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'РЁР»СЏРїР° РёР· РєРѕСЂРёС‡РЅРµРІРѕРіРѕ С„РµС‚СЂР°', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_brown.png', image_mini:'images/items/head/mini/cloth_hat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:13, aim:7, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[228] = {item_id:228, nshort:'cloth_hat_black', name:'РЁР»СЏРїР° РёР· С‡С‘СЂРЅРѕРіРѕ С„РµС‚СЂР°', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_black.png', image_mini:'images/items/head/mini/cloth_hat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:7, aim:13, appearance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Р—РЅР°С‚РЅР°СЏ С„РµС‚СЂРѕРІР°СЏ С€Р»СЏРїР°', type:'head', level:22, price:3900, image:'images/items/head/cloth_hat_fine.png', image_mini:'images/items/head/mini/cloth_hat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:9, aim:9, dodge:8, tactic:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[230] = {item_id:230, nshort:'cylinder_grey', name:'РЎРµСЂС‹Р№ С†РёР»РёРЅРґСЂ', type:'head', level:18, price:1270, image:'images/items/head/cylinder_grey.png', image_mini:'images/items/head/mini/cylinder_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:14, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[231] = {item_id:231, nshort:'cylinder_red', name:'РљСЂР°СЃРЅС‹Р№ С†РёР»РёРЅРґСЂ', type:'head', level:24, price:1900, image:'images/items/head/cylinder_red.png', image_mini:'images/items/head/mini/cylinder_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, leadership:10, finger_dexterity:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[232] = {item_id:232, nshort:'cylinder_green', name:'Р—РµР»С‘РЅС‹Р№ С†РёР»РёРЅРґСЂ', type:'head', level:24, price:1900, image:'images/items/head/cylinder_green.png', image_mini:'images/items/head/mini/cylinder_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, leadership:10, finger_dexterity:9}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[233] = {item_id:233, nshort:'cylinder_blue', name:'РЎРёРЅРёР№ С†РёР»РёРЅРґСЂ', type:'head', level:24, price:1900, image:'images/items/head/cylinder_blue.png', image_mini:'images/items/head/mini/cylinder_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Р–С‘Р»С‚С‹Р№ С†РёР»РёРЅРґСЂ', type:'head', level:24, price:1900, image:'images/items/head/cylinder_yellow.png', image_mini:'images/items/head/mini/cylinder_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[235] = {item_id:235, nshort:'cylinder_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Р№ С†РёР»РёРЅРґСЂ', type:'head', level:25, price:2700, image:'images/items/head/cylinder_brown.png', image_mini:'images/items/head/mini/cylinder_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}, attributes:{}}, set:{key:'set_gentleman', name:'Р”Р¶РµРЅС‚Р»СЊРјРµРЅСЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
items[236] = {item_id:236, nshort:'cylinder_black', name:'Р§С‘СЂРЅС‹Р№ С†РёР»РёРЅРґСЂ', type:'head', level:25, price:2700, image:'images/items/head/cylinder_black.png', image_mini:'images/items/head/mini/cylinder_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[237] = {item_id:237, nshort:'cylinder_fine', name:'Р¦РёР»РёРЅРґСЂ Р›РёРЅРєРѕР»СЊРЅР°', type:'head', level:27, price:5400, image:'images/items/head/cylinder_fine.png', image_mini:'images/items/head/mini/cylinder_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:12, build:9, ride:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[238] = {item_id:238, nshort:'leather_hat_grey', name:'РЎРµСЂР°СЏ С€Р»СЏРїР°', type:'head', level:24, price:2000, image:'images/items/head/leather_hat_grey.png', image_mini:'images/items/head/mini/leather_hat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[239] = {item_id:239, nshort:'leather_hat_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ С€Р»СЏРїР°', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_brown.png', image_mini:'images/items/head/mini/leather_hat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, punch:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[240] = {item_id:240, nshort:'leather_hat_black', name:'Р§С‘СЂРЅР°СЏ С€Р»СЏРїР°', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_black.png', image_mini:'images/items/head/mini/leather_hat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, repair:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Р—РЅР°С‚РЅР°СЏ С€Р»СЏРїР°', type:'head', level:30, price:4100, image:'images/items/head/leather_hat_fine.png', image_mini:'images/items/head/mini/leather_hat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:15, animal:14, tough:9, aim:8}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[242] = {item_id:242, nshort:'stetson_grey', name:'РЎРµСЂС‹Р№ СЃС‚РµС‚СЃРѕРЅ', type:'head', level:30, price:2555, image:'images/items/head/stetson_grey.png', image_mini:'images/items/head/mini/stetson_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[243] = {item_id:243, nshort:'stetson_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Р№ СЃС‚РµС‚СЃРѕРЅ', type:'head', level:33, price:4500, image:'images/items/head/stetson_brown.png', image_mini:'images/items/head/mini/stetson_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, dodge:12}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[244] = {item_id:244, nshort:'stetson_black', name:'Р§С‘СЂРЅС‹Р№ СЃС‚РµС‚СЃРѕРЅ', type:'head', level:33, price:4500, image:'images/items/head/stetson_black.png', image_mini:'images/items/head/mini/stetson_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, leadership:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[245] = {item_id:245, nshort:'stetson_fine', name:'Р—РЅР°С‚РЅС‹Р№ СЃС‚РµС‚СЃРѕРЅ', type:'head', level:36, price:7100, image:'images/items/head/stetson_fine.png', image_mini:'images/items/head/mini/stetson_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:16, health:16, trade:9, swim:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[246] = {item_id:246, nshort:'xmas_hat', name:'Р РѕР¶РґРµСЃС‚РІРµРЅСЃРєРёР№ РєРѕР»РїР°Рє', type:'head', level:1, price:50, image:'images/items/head/xmas_hat.png', image_mini:'images/items/head/mini/xmas_hat.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[247] = {item_id:247, nshort:'southcap', name:'Р¤СѓСЂР°Р¶РєР°', type:'head', level:20, price:800, image:'images/items/head/southcap.png', image_mini:'images/items/head/mini/southcap.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{punch:11, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[248] = {item_id:248, nshort:'adventurerhat', name:'РЁР»СЏРїР° Р°РІР°РЅС‚СЋСЂРёСЃС‚Р°', type:'head', level:22, price:2980, image:'images/items/head/adventurerhat.png', image_mini:'images/items/head/mini/adventurerhat.png', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3, dexterity:3}}, set:{key:null, name:null}, shop:'quest'};\
\
items[250] = {item_id:250, nshort:'feather_hat_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ С€Р»СЏРїР° СЃ РїРµСЂРѕРј', type:'head', level:18, price:1460, image:'images/items/head/feather_hat_brown.png', image_mini:'images/items/head/mini/feather_hat_brown.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'quest'};\
\
items[253] = {item_id:253, nshort:'indian_hat', name:'РРЅРґРµР№СЃРєРѕРµ РѕРїРµСЂРµРЅРёРµ', type:'head', level:51, price:3200, image:'images/items/head/indian_hat.png', image_mini:'images/items/head/mini/indian_hat.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, appearance:11}, attributes:{charisma:2}}, set:{key:'set_indian', name:'РРЅРґРµР№СЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
items[254] = {item_id:254, nshort:'mexican_sombrero', name:'РЎРѕРјР±СЂРµСЂРѕ', type:'head', level:30, price:1270, image:'images/items/head/mexican_sombrero.png', image_mini:'images/items/head/mini/mexican_sombrero.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, health:6, shot:6}, attributes:{}}, set:{key:'set_mexican', name:'РќР°Р±РѕСЂ РјРµРєСЃРёРєР°РЅС†Р°'}, shop:'shop'};\
\
items[256] = {item_id:256, nshort:'pilger_cap', name:'РњРѕРЅР°С€РµСЃРєРёР№ С‡РµРїРµС†', type:'head', level:37, price:1270, image:'images/items/head/pilger_cap.png', image_mini:'images/items/head/mini/pilger_cap.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:10, leadership:6, repair:6}, attributes:{}}, set:{key:'set_pilgrim_female', name:'РњРѕРЅР°С€РµСЃРєРёР№ СЃРєР°СЂР±'}, shop:'shop'};\
items[257] = {item_id:257, nshort:'pilger_hat', name:'РЁР»СЏРїР° РїР°СЃС‚РѕСЂР°', type:'head', level:37, price:1270, image:'images/items/head/pilger_hat.png', image_mini:'images/items/head/mini/pilger_hat.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{trade:6, repair:6, health:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'РЎРєР°СЂР± РїСЂРѕРїРѕРІРµРґРЅРёРєР°'}, shop:'shop'};\
items[259] = {item_id:259, nshort:'dancer_hat', name:'РџРµСЂРѕ', type:'head', level:42, price:2500, image:'images/items/head/dancer_hat.png', image_mini:'images/items/head/mini/dancer_hat.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{pitfall:8, tactic:10, aim:9}, attributes:{flexibility:1}}, set:{key:'set_dancer', name:'РўСѓР°Р»РµС‚ С‚Р°РЅС†РѕРІС‰РёС†С‹'}, shop:'shop'};\
items[299] = {item_id:299, nshort:'band_grey', name:'РЎРµСЂР°СЏ Р±Р°РЅРґР°РЅР°', type:'head', level:1, price:8, image:'images/items/head/band_grey.png', image_mini:'images/items/head/mini/band_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
\
items[300] = {item_id:300, nshort:'tatter_grey', name:'РЎРµСЂС‹Рµ Р»РѕС…РјРѕС‚СЊСЏ', type:'body', level:1, price:2, image:'images/items/body/tatter_grey.png', image_mini:'images/items/body/mini/tatter_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[301] = {item_id:301, nshort:'tatter_red', name:'РљСЂР°СЃРЅС‹Рµ Р»РѕС…РјРѕС‚СЊСЏ', type:'body', level:1, price:12, image:'images/items/body/tatter_red.png', image_mini:'images/items/body/mini/tatter_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, build:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[302] = {item_id:302, nshort:'tatter_green', name:'Р—РµР»С‘РЅС‹Рµ Р»РѕС…РјРѕС‚СЊСЏ', type:'body', level:1, price:12, image:'images/items/body/tatter_green.png', image_mini:'images/items/body/mini/tatter_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[303] = {item_id:303, nshort:'tatter_blue', name:'РЎРёРЅРёРµ Р»РѕС…РјРѕС‚СЊСЏ', type:'body', level:1, price:12, image:'images/items/body/tatter_blue.png', image_mini:'images/items/body/mini/tatter_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[304] = {item_id:304, nshort:'tatter_yellow', name:'Р–С‘Р»С‚С‹Рµ Р»РѕС…РјРѕС‚СЊСЏ', type:'body', level:1, price:12, image:'images/items/body/tatter_yellow.png', image_mini:'images/items/body/mini/tatter_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, leadership:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[305] = {item_id:305, nshort:'tatter_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Рµ Р»РѕС…РјРѕС‚СЊСЏ', type:'body', level:2, price:38, image:'images/items/body/tatter_brown.png', image_mini:'images/items/body/mini/tatter_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, reflex:2, punch:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[306] = {item_id:306, nshort:'tatter_black', name:'Р§С‘СЂРЅС‹Рµ Р»РѕС…РјРѕС‚СЊСЏ', type:'body', level:2, price:38, image:'images/items/body/tatter_black.png', image_mini:'images/items/body/mini/tatter_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3, tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[307] = {item_id:307, nshort:'poncho_grey', name:'РЎРµСЂРѕРµ РїРѕРЅС‡Рѕ', type:'body', level:3, price:38, image:'images/items/body/poncho_grey.png', image_mini:'images/items/body/mini/poncho_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[308] = {item_id:308, nshort:'poncho_red', name:'РљСЂР°СЃРЅРѕРµ РїРѕРЅС‡Рѕ', type:'body', level:4, price:80, image:'images/items/body/poncho_red.png', image_mini:'images/items/body/mini/poncho_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[309] = {item_id:309, nshort:'poncho_green', name:'Р—РµР»С‘РЅРѕРµ РїРѕРЅС‡Рѕ', type:'body', level:4, price:80, image:'images/items/body/poncho_green.png', image_mini:'images/items/body/mini/poncho_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[310] = {item_id:310, nshort:'poncho_blue', name:'РЎРёРЅРµРµ РїРѕРЅС‡Рѕ', type:'body', level:4, price:80, image:'images/items/body/poncho_blue.png', image_mini:'images/items/body/mini/poncho_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, aim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[311] = {item_id:311, nshort:'poncho_yellow', name:'Р–С‘Р»С‚РѕРµ РїРѕРЅС‡Рѕ', type:'body', level:4, price:80, image:'images/items/body/poncho_yellow.png', image_mini:'images/items/body/mini/poncho_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[312] = {item_id:312, nshort:'poncho_brown', name:'РљРѕСЂРёС‡РЅРµРІРѕРµ РїРѕРЅС‡Рѕ', type:'body', level:5, price:174, image:'images/items/body/poncho_brown.png', image_mini:'images/items/body/mini/poncho_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:6, endurance:4}, attributes:{}}, set:{key:'set_mexican', name:'РќР°Р±РѕСЂ РјРµРєСЃРёРєР°РЅС†Р°'}, shop:'shop'};\
items[313] = {item_id:313, nshort:'poncho_black', name:'Р§РµСЂРЅРѕРµ РїРѕРЅС‡Рѕ', type:'body', level:5, price:174, image:'images/items/body/poncho_black.png', image_mini:'images/items/body/mini/poncho_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, animal:4, shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[314] = {item_id:314, nshort:'poncho_fine', name:'РџРѕРЅС‡Рѕ РљР»РёРЅС‚Р°', type:'body', level:6, price:800, image:'images/items/body/poncho_fine.png', image_mini:'images/items/body/mini/poncho_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7, build:5, pitfall:4, appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[315] = {item_id:315, nshort:'clothes_grey', name:'РЎРµСЂС‹Р№ РєРѕСЃС‚СЋРј', type:'body', level:7, price:138, image:'images/items/body/clothes_grey.png', image_mini:'images/items/body/mini/clothes_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[316] = {item_id:316, nshort:'clothes_red', name:'РљСЂР°СЃРЅС‹Р№ РєРѕСЃС‚СЋРј', type:'body', level:8, price:260, image:'images/items/body/clothes_red.png', image_mini:'images/items/body/mini/clothes_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[317] = {item_id:317, nshort:'clothes_green', name:'Р—РµР»С‘РЅС‹Р№ РєРѕСЃС‚СЋРј', type:'body', level:14, price:260, image:'images/items/body/clothes_green.png', image_mini:'images/items/body/mini/clothes_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, hide:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[318] = {item_id:318, nshort:'clothes_blue', name:'РЎРёРЅРёР№ РєРѕСЃС‚СЋРј', type:'body', level:8, price:260, image:'images/items/body/clothes_blue.png', image_mini:'images/items/body/mini/clothes_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, finger_dexterity:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[319] = {item_id:319, nshort:'clothes_yellow', name:'Р–С‘Р»С‚С‹Р№ РєРѕСЃС‚СЋРј', type:'body', level:8, price:260, image:'images/items/body/clothes_yellow.png', image_mini:'images/items/body/mini/clothes_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[320] = {item_id:320, nshort:'clothes_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Р№ РєРѕСЃС‚СЋРј', type:'body', level:8, price:425, image:'images/items/body/clothes_brown.png', image_mini:'images/items/body/mini/clothes_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, swim:5, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[321] = {item_id:321, nshort:'clothes_black', name:'Р§С‘СЂРЅС‹Р№ РєРѕСЃС‚СЋРј', type:'body', level:8, price:425, image:'images/items/body/clothes_black.png', image_mini:'images/items/body/mini/clothes_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:5}, attributes:{}}, set:{key:'set_farmer', name:'РќР°Р±РѕСЂ С„РµСЂРјРµСЂР°'}, shop:'shop'};\
items[322] = {item_id:322, nshort:'clothes_fine', name:'Р’РѕСЃРєСЂРµСЃРЅС‹Р№ РєРѕСЃС‚СЋРј', type:'body', level:10, price:1650, image:'images/items/body/clothes_fine.png', image_mini:'images/items/body/mini/clothes_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, endurance:6, reflex:6, finger_dexterity:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[323] = {item_id:323, nshort:'shirt_grey', name:'РЎРµСЂР°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:12, price:310, image:'images/items/body/shirt_grey.png', image_mini:'images/items/body/mini/shirt_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[324] = {item_id:324, nshort:'shirt_red', name:'РљСЂР°СЃРЅР°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:13, price:560, image:'images/items/body/shirt_red.png', image_mini:'images/items/body/mini/shirt_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[325] = {item_id:325, nshort:'shirt_green', name:'Р—РµР»С‘РЅР°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:13, price:560, image:'images/items/body/shirt_green.png', image_mini:'images/items/body/mini/shirt_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, ride:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[326] = {item_id:326, nshort:'shirt_blue', name:'РЎРёРЅСЏСЏ СЂСѓР±Р°С€РєР°', type:'body', level:13, price:560, image:'images/items/body/shirt_blue.png', image_mini:'images/items/body/mini/shirt_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, aim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[327] = {item_id:327, nshort:'shirt_yellow', name:'Р–С‘Р»С‚Р°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:13, price:560, image:'images/items/body/shirt_yellow.png', image_mini:'images/items/body/mini/shirt_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[328] = {item_id:328, nshort:'shirt_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:14, price:800, image:'images/items/body/shirt_brown.png', image_mini:'images/items/body/mini/shirt_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, reflex:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[329] = {item_id:329, nshort:'shirt_black', name:'Р§С‘СЂРЅР°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:14, price:800, image:'images/items/body/shirt_black.png', image_mini:'images/items/body/mini/shirt_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[330] = {item_id:330, nshort:'shirt_fine', name:'Р—РЅР°С‚РЅР°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:15, price:1305, image:'images/items/body/shirt_fine.png', image_mini:'images/items/body/mini/shirt_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'РЎРµСЂР°СЏ РєР»РµС‚С‡Р°С‚Р°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:15, price:560, image:'images/items/body/plaid_shirt_grey.png', image_mini:'images/items/body/mini/plaid_shirt_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'РљСЂР°СЃРЅР°СЏ РєР»РµС‚С‡Р°С‚Р°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_red.png', image_mini:'images/items/body/mini/plaid_shirt_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Р—РµР»С‘РЅР°СЏ РєР»РµС‚С‡Р°С‚Р°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_green.png', image_mini:'images/items/body/mini/plaid_shirt_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, swim:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'РЎРёРЅСЏСЏ РєР»РµС‚С‡Р°С‚Р°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_blue.png', image_mini:'images/items/body/mini/plaid_shirt_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Р–С‘Р»С‚Р°СЏ РєР»РµС‚С‡Р°С‚Р°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_yellow.png', image_mini:'images/items/body/mini/plaid_shirt_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ РєР»РµС‚С‡Р°С‚Р°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_brown.png', image_mini:'images/items/body/mini/plaid_shirt_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12, ride:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Р§С‘СЂРЅР°СЏ РєР»РµС‚С‡Р°С‚Р°СЏ СЂСѓР±Р°С€РєР°', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_black.png', image_mini:'images/items/body/mini/plaid_shirt_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:7, repair:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Р СѓР±Р°С…Р° Р»РµСЃРѕСЂСѓР±Р°', type:'body', level:19, price:3900, image:'images/items/body/plaid_shirt_fine.png', image_mini:'images/items/body/mini/plaid_shirt_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:13, animal:8, hide:8, pitfall:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[339] = {item_id:339, nshort:'vest_grey', name:'РЎРµСЂР°СЏ Р¶РёР»РµС‚РєР°', type:'body', level:16, price:900, image:'images/items/body/vest_grey.png', image_mini:'images/items/body/mini/vest_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:11, shot:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[340] = {item_id:340, nshort:'vest_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ Р¶РёР»РµС‚РєР°', type:'body', level:20, price:1800, image:'images/items/body/vest_brown.png', image_mini:'images/items/body/mini/vest_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:9, shot:7, health:8}, attributes:{flexibility:1}}, set:{key:'set_quackery', name:'Р—РЅР°С…Р°СЂСЃРєР°СЏ СѓС‚РІР°СЂСЊ'}, shop:'shop'};\
items[341] = {item_id:341, nshort:'vest_black', name:'Р§С‘СЂРЅР°СЏ Р¶РёР»РµС‚РєР°', type:'body', level:20, price:1800, image:'images/items/body/vest_black.png', image_mini:'images/items/body/mini/vest_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7, shot:9, leadership:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[342] = {item_id:342, nshort:'vest_fine', name:'Р—РЅР°С‚РЅР°СЏ Р¶РёР»РµС‚РєР°', type:'body', level:20, price:5200, image:'images/items/body/vest_fine.png', image_mini:'images/items/body/mini/vest_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:10, shot:10, endurance:9, trade:8}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[343] = {item_id:343, nshort:'coat_grey', name:'РЎРµСЂР°СЏ РєСѓСЂС‚РєР°', type:'body', level:20, price:1300, image:'images/items/body/coat_grey.png', image_mini:'images/items/body/mini/coat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13, pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[344] = {item_id:344, nshort:'coat_red', name:'РљСЂР°СЃРЅР°СЏ РєСѓСЂС‚РєР°', type:'body', level:20, price:2000, image:'images/items/body/coat_red.png', image_mini:'images/items/body/mini/coat_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[345] = {item_id:345, nshort:'coat_green', name:'Р—РµР»С‘РЅР°СЏ РєСѓСЂС‚РєР°', type:'body', level:20, price:2000, image:'images/items/body/coat_green.png', image_mini:'images/items/body/mini/coat_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, hide:8}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[346] = {item_id:346, nshort:'coat_blue', name:'РЎРёРЅСЏСЏ РєСѓСЂС‚РєР°', type:'body', level:20, price:2000, image:'images/items/body/coat_blue.png', image_mini:'images/items/body/mini/coat_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[347] = {item_id:347, nshort:'coat_yellow', name:'Р–С‘Р»С‚Р°СЏ РєСѓСЂС‚РєР°', type:'body', level:20, price:2000, image:'images/items/body/coat_yellow.png', image_mini:'images/items/body/mini/coat_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, leadership:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[348] = {item_id:348, nshort:'coat_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ РєСѓСЂС‚РєР°', type:'body', level:21, price:2500, image:'images/items/body/coat_brown.png', image_mini:'images/items/body/mini/coat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8, swim:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[349] = {item_id:349, nshort:'coat_black', name:'Р§С‘СЂРЅР°СЏ РєСѓСЂС‚РєР°', type:'body', level:21, price:2500, image:'images/items/body/coat_black.png', image_mini:'images/items/body/mini/coat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11, animal:9}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[350] = {item_id:350, nshort:'coat_fine', name:'Р—РЅР°С‚РЅР°СЏ РєСѓСЂС‚РєР°', type:'body', level:22, price:6300, image:'images/items/body/coat_fine.png', image_mini:'images/items/body/mini/coat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:11, appearance:9, dodge:9}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[351] = {item_id:351, nshort:'jacket_grey', name:'РЎРµСЂС‹Р№ РїРёРґР¶Р°Рє', type:'body', level:20, price:1850, image:'images/items/body/jacket_grey.png', image_mini:'images/items/body/mini/jacket_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[352] = {item_id:352, nshort:'jacket_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Р№ РїРёРґР¶Р°Рє', type:'body', level:25, price:3500, image:'images/items/body/jacket_brown.png', image_mini:'images/items/body/mini/jacket_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[353] = {item_id:353, nshort:'jacket_black', name:'Р§С‘СЂРЅС‹Р№ РїРёРґР¶Р°Рє', type:'body', level:25, price:3500, image:'images/items/body/jacket_black.png', image_mini:'images/items/body/mini/jacket_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, aim:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[354] = {item_id:354, nshort:'jacket_fine', name:'Р—РЅР°С‚РЅС‹Р№ РїРёРґР¶Р°Рє', type:'body', level:27, price:7200, image:'images/items/body/jacket_fine.png', image_mini:'images/items/body/mini/jacket_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:13, reflex:13, punch:9, aim:9}, attributes:{charisma:1, flexibility:1}}, set:{key:'set_gentleman', name:'Р”Р¶РµРЅС‚Р»СЊРјРµРЅСЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
items[355] = {item_id:355, nshort:'leather_coat_grey', name:'РЎРµСЂР°СЏ РєРѕР¶Р°РЅРєР°', type:'body', level:25, price:2700, image:'images/items/body/leather_coat_grey.png', image_mini:'images/items/body/mini/leather_coat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:12}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[356] = {item_id:356, nshort:'leather_coat_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ РєРѕР¶Р°РЅРєР°', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_brown.png', image_mini:'images/items/body/mini/leather_coat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:13}, attributes:{strength:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[357] = {item_id:357, nshort:'leather_coat_black', name:'Р§РµСЂРЅР°СЏ РєРѕР¶Р°РЅРєР°', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_black.png', image_mini:'images/items/body/mini/leather_coat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:12, hide:11, repair:12, leadership:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Р—РЅР°С‚РЅР°СЏ РєРѕР¶Р°РЅРєР°', type:'body', level:30, price:9000, image:'images/items/body/leather_coat_fine.png', image_mini:'images/items/body/mini/leather_coat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:16, hide:15, finger_dexterity:9, appearance:10}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[359] = {item_id:359, nshort:'greatcoat_grey', name:'РЎРµСЂРѕРµ РїР°Р»СЊС‚Рѕ', type:'body', level:33, price:3500, image:'images/items/body/greatcoat_grey.png', image_mini:'images/items/body/mini/greatcoat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[360] = {item_id:360, nshort:'greatcoat_brown', name:'РљРѕСЂРёС‡РЅРµРІРѕРµ РїР°Р»СЊС‚Рѕ', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_brown.png', image_mini:'images/items/body/mini/greatcoat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:13, shot:13, ride:13, health:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Р—РЅР°С‚РЅРѕРµ РїР°Р»СЊС‚Рѕ', type:'body', level:45, price:9500, image:'images/items/body/greatcoat_fine.png', image_mini:'images/items/body/mini/greatcoat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, shot:16, endurance:9, ride:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[362] = {item_id:362, nshort:'uniform', name:'Р¤РѕСЂРјР°', type:'body', level:20, price:800, image:'images/items/body/uniform.png', image_mini:'images/items/body/mini/uniform.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{hide:4, appearance:2}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
\
items[364] = {item_id:364, nshort:'greatcoat_black', name:'Р§С‘СЂРЅРѕРµ РїР°Р»СЊС‚Рѕ', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_black.png', image_mini:'images/items/body/mini/greatcoat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[365] = {item_id:365, nshort:'adventurerjacket', name:'Р–Р°РєРµС‚ Р°РІР°РЅС‚СЋСЂРёСЃС‚Р°', type:'body', level:40, price:1100, image:'images/items/body/adventurerjacket.png', image_mini:'images/items/body/mini/adventurerjacket.png', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[367] = {item_id:367, nshort:'shirt_canvas', name:'РҐРѕР»С‰РѕРІР°СЏ СЂСѓР±Р°С…Р°', type:'body', level:8, price:425, image:'images/items/body/shirt_canvas.png', image_mini:'images/items/body/mini/shirt_canvas.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[368] = {item_id:368, nshort:'dancer_dress', name:'РџР»Р°С‚СЊРµ С‚Р°РЅС†РѕРІС‰РёС†С‹', type:'body', level:45, price:7500, image:'images/items/body/dancer_dress.png', image_mini:'images/items/body/mini/dancer_dress.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:8, shot:8, finger_dexterity:11, animal:10}, attributes:{charisma:2}}, set:{key:'set_dancer', name:'РўСѓР°Р»РµС‚ С‚Р°РЅС†РѕРІС‰РёС†С‹'}, shop:'shop'};\
items[369] = {item_id:369, nshort:'indian_jacket', name:'РРЅРґРµР№СЃРєРѕРµ РїР»Р°С‚СЊРµ', type:'body', level:55, price:7500, image:'images/items/body/indian_jacket.png', image_mini:'images/items/body/mini/indian_jacket.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, hide:9, pitfall:8}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_indian', name:'РРЅРґРµР№СЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
\
items[372] = {item_id:372, nshort:'pilger_dress', name:'РџР»Р°С‚СЊРµ РјРѕРЅР°С€РєРё', type:'body', level:38, price:2500, image:'images/items/body/pilger_dress.png', image_mini:'images/items/body/mini/pilger_dress.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}}, set:{key:'set_pilgrim_female', name:'РњРѕРЅР°С€РµСЃРєРёР№ СЃРєР°СЂР±'}, shop:'shop'};\
items[373] = {item_id:373, nshort:'pilger_jacket', name:'Р СѓР±Р°С…Р° РїР°СЃС‚РѕСЂР°', type:'body', level:38, price:2500, image:'images/items/body/pilger_jacket.png', image_mini:'images/items/body/mini/pilger_jacket.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}}, set:{key:'set_pilgrim_male', name:'РЎРєР°СЂР± РїСЂРѕРїРѕРІРµРґРЅРёРєР°'}, shop:'shop'};\
\
\
items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'РЎРµСЂС‹Рµ СЃС‚РѕРїС‚Р°РЅРЅС‹Рµ Р±Р°С€РјР°РєРё', type:'foot', level:1, price:4, image:'images/items/foot/ripped_shoes_grey.png', image_mini:'images/items/foot/mini/ripped_shoes_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Рµ СЃС‚РѕРїС‚Р°РЅРЅС‹Рµ Р±Р°С€РјР°РєРё', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_brown.png', image_mini:'images/items/foot/mini/ripped_shoes_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Р§С‘СЂРЅС‹Рµ СЃС‚РѕРїС‚Р°РЅРЅС‹Рµ Р±Р°С€РјР°РєРё', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_black.png', image_mini:'images/items/foot/mini/ripped_shoes_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, leadership:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[403] = {item_id:403, nshort:'light_grey', name:'РЎРµСЂС‹Рµ РјР°С‚РµСЂС‡Р°С‚С‹Рµ Р±РѕС‚РёРЅРєРё', type:'foot', level:5, price:70, image:'images/items/foot/light_grey.png', image_mini:'images/items/foot/mini/light_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[404] = {item_id:404, nshort:'light_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Рµ РјР°С‚РµСЂС‡Р°С‚С‹Рµ Р±РѕС‚РёРЅРєРё', type:'foot', level:9, price:170, image:'images/items/foot/light_brown.png', image_mini:'images/items/foot/mini/light_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, hide:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[405] = {item_id:405, nshort:'light_black', name:'Р§С‘СЂРЅС‹Рµ РјР°С‚РµСЂС‡Р°С‚С‹Рµ Р±РѕС‚РёРЅРєРё', type:'foot', level:9, price:170, image:'images/items/foot/light_black.png', image_mini:'images/items/foot/mini/light_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, trade:5, shot:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[406] = {item_id:406, nshort:'light_fine', name:'Р—РЅР°С‚РЅС‹Рµ РјР°С‚РµСЂС‡Р°С‚С‹Рµ Р±РѕС‚РёРЅРєРё', type:'foot', level:11, price:1500, image:'images/items/foot/light_fine.png', image_mini:'images/items/foot/mini/light_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:4, appearance:6, reflex:6, pitfall:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[407] = {item_id:407, nshort:'working_grey', name:'РЎРµСЂС‹Рµ СЂР°Р±РѕС‡РёРµ Р±РѕС‚РёРЅРєРё', type:'foot', level:9, price:660, image:'images/items/foot/working_grey.png', image_mini:'images/items/foot/mini/working_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[408] = {item_id:408, nshort:'working_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Рµ СЂР°Р±РѕС‡РёРµ Р±РѕС‚РёРЅРєРё', type:'foot', level:13, price:1200, image:'images/items/foot/working_brown.png', image_mini:'images/items/foot/mini/working_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, endurance:7, ride:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[409] = {item_id:409, nshort:'working_black', name:'Р§С‘СЂРЅС‹Рµ СЂР°Р±РѕС‡РёРµ Р±РѕС‚РёРЅРєРё', type:'foot', level:13, price:1200, image:'images/items/foot/working_black.png', image_mini:'images/items/foot/mini/working_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, tactic:7}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'РќР°Р±РѕСЂ С„РµСЂРјРµСЂР°'}, shop:'shop'};\
items[410] = {item_id:410, nshort:'working_fine', name:'Р—РЅР°С‚РЅС‹Рµ СЂР°Р±РѕС‡РёРµ Р±РѕС‚РёРЅРєРё', type:'foot', level:15, price:4300, image:'images/items/foot/working_fine.png', image_mini:'images/items/foot/mini/working_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:11, trade:8, dodge:8, punch:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[411] = {item_id:411, nshort:'spur_grey', name:'РЎРµСЂС‹Рµ Р±РѕС‚РёРЅРєРё СЃРѕ С€РїРѕСЂР°РјРё', type:'foot', level:14, price:1400, image:'images/items/foot/spur_grey.png', image_mini:'images/items/foot/mini/spur_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[412] = {item_id:412, nshort:'spur_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Рµ Р±РѕС‚РёРЅРєРё СЃРѕ С€РїРѕСЂР°РјРё', type:'foot', level:17, price:2450, image:'images/items/foot/spur_brown.png', image_mini:'images/items/foot/mini/spur_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[413] = {item_id:413, nshort:'spur_black', name:'Р§С‘СЂРЅС‹Рµ Р±РѕС‚РёРЅРєРё СЃРѕ С€РїРѕСЂР°РјРё', type:'foot', level:17, price:2450, image:'images/items/foot/spur_black.png', image_mini:'images/items/foot/mini/spur_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[414] = {item_id:414, nshort:'spur_fine', name:'Р—РЅР°С‚РЅС‹Рµ Р±РѕС‚РёРЅРєРё СЃРѕ С€РїРѕСЂР°РјРё', type:'foot', level:20, price:6230, image:'images/items/foot/spur_fine.png', image_mini:'images/items/foot/mini/spur_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, shot:10, health:8, swim:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[415] = {item_id:415, nshort:'boots_grey', name:'РЎРµСЂС‹Рµ СЃР°РїРѕРіРё', type:'foot', level:16, price:3000, image:'images/items/foot/boots_grey.png', image_mini:'images/items/foot/mini/boots_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[416] = {item_id:416, nshort:'boots_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Рµ СЃР°РїРѕРіРё', type:'foot', level:20, price:5100, image:'images/items/foot/boots_brown.png', image_mini:'images/items/foot/mini/boots_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, tough:12, dodge:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[417] = {item_id:417, nshort:'boots_black', name:'Р§С‘СЂРЅС‹Рµ СЃР°РїРѕРіРё', type:'foot', level:20, price:5100, image:'images/items/foot/boots_black.png', image_mini:'images/items/foot/mini/boots_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:11}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[418] = {item_id:418, nshort:'boots_fine', name:'Р—РЅР°С‚РЅС‹Рµ СЃР°РїРѕРіРё', type:'foot', level:22, price:8870, image:'images/items/foot/boots_fine.png', image_mini:'images/items/foot/mini/boots_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, endurance:8, hide:8}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[419] = {item_id:419, nshort:'rider_grey', name:'РЎРµСЂС‹Рµ РєРѕРІР±РѕР№СЃРєРёРµ СЃР°РїРѕРіРё', type:'foot', level:30, price:2600, image:'images/items/foot/rider_grey.png', image_mini:'images/items/foot/mini/rider_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[420] = {item_id:420, nshort:'rider_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Рµ РєРѕРІР±РѕР№СЃРєРёРµ СЃР°РїРѕРіРё', type:'foot', level:33, price:6200, image:'images/items/foot/rider_brown.png', image_mini:'images/items/foot/mini/rider_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[421] = {item_id:421, nshort:'rider_black', name:'Р§С‘СЂРЅС‹Рµ РєРѕРІР±РѕР№СЃРєРёРµ СЃР°РїРѕРіРё', type:'foot', level:33, price:6200, image:'images/items/foot/rider_black.png', image_mini:'images/items/foot/mini/rider_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:13, animal:14}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[422] = {item_id:422, nshort:'rider_fine', name:'Р—РЅР°С‚РЅС‹Рµ РєРѕРІР±РѕР№СЃРєРёРµ СЃР°РїРѕРіРё', type:'foot', level:35, price:9500, image:'images/items/foot/rider_fine.png', image_mini:'images/items/foot/mini/rider_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:11, punch:10, appearance:8, aim:8}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Рµ Р±РѕС‚РёРЅРєРё РїСЂРѕРїРѕРІРµРґРЅРёРєР°', type:'foot', level:15, price:1530, image:'images/items/foot/pilgrim_shoes_brown.png', image_mini:'images/items/foot/mini/pilgrim_shoes_brown.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Р—РЅР°С‚РЅС‹Рµ Р±Р°С€РјР°РєРё', type:'foot', level:45, price:5600, image:'images/items/foot/gentleman_shoes.png', image_mini:'images/items/foot/mini/gentleman_shoes.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}}, set:{key:'set_gentleman', name:'Р”Р¶РµРЅС‚Р»СЊРјРµРЅСЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
items[428] = {item_id:428, nshort:'mexican_shoes', name:'РЎР°РЅРґР°Р»РёРё', type:'foot', level:28, price:2650, image:'images/items/foot/mexican_shoes.png', image_mini:'images/items/foot/mini/mexican_shoes.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, aim:6, dodge:8, health:8}, attributes:{}}, set:{key:'set_mexican', name:'РќР°Р±РѕСЂ РјРµРєСЃРёРєР°РЅС†Р°'}, shop:'shop'};\
items[429] = {item_id:429, nshort:'mokassins', name:'РњРѕРєР°СЃРёРЅС‹', type:'foot', level:45, price:5600, image:'images/items/foot/mokassins.png', image_mini:'images/items/foot/mini/mokassins.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, endurance:9, hide:9}, attributes:{flexibility:2}}, set:{key:'set_indian', name:'РРЅРґРµР№СЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
\
items[431] = {item_id:431, nshort:'pilger_boots', name:'РњРѕРЅР°С€РµСЃРєРёРµ С‚СѓС„Р»Рё', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_boots.png', image_mini:'images/items/foot/mini/pilger_boots.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{build:7, hide:6, finger_dexterity:8, shot:8}, attributes:{}}, set:{key:'set_pilgrim_female', name:'РњРѕРЅР°С€РµСЃРєРёР№ СЃРєР°СЂР±'}, shop:'shop'};\
items[432] = {item_id:432, nshort:'pilger_shoes', name:'РўСѓС„Р»Рё РјРѕРЅР°С…Р°', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_shoes.png', image_mini:'images/items/foot/mini/pilger_shoes.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{build:7, tough:6, leadership:8, reflex:8}, attributes:{}}, set:{key:'set_pilgrim_male', name:'РЎРєР°СЂР± РїСЂРѕРїРѕРІРµРґРЅРёРєР°'}, shop:'shop'};\
items[433] = {item_id:433, nshort:'dancer_boots', name:'РЎР°РїРѕР¶РєРё РЅР° РєР°Р±Р»СѓРєР°С…', type:'foot', level:41, price:4000, image:'images/items/foot/dancer_boots.png', image_mini:'images/items/foot/mini/dancer_boots.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}}, set:{key:'set_dancer', name:'РўСѓР°Р»РµС‚ С‚Р°РЅС†РѕРІС‰РёС†С‹'}, shop:'shop'};\
\
items[435] = {item_id:435, nshort:'quackery_shoes', name:'Р—РЅР°С…Р°СЂСЃРєРёРµ Р±Р°С€РјР°РєРё', type:'foot', level:45, price:5600, image:'images/items/foot/quackery_shoes.png', image_mini:'images/items/foot/mini/quackery_shoes.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}}, set:{key:'set_quackery', name:'Р—РЅР°С…Р°СЂСЃРєР°СЏ СѓС‚РІР°СЂСЊ'}, shop:'shop'};\
\
items[500] = {item_id:500, nshort:'neckband_grey', name:'РЎРµСЂС‹Р№ С€Р°СЂС„', type:'neck', level:null, price:10, image:'images/items/neck/neckband_grey.png', image_mini:'images/items/neck/neckband_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[501] = {item_id:501, nshort:'neckband_red', name:'РљСЂР°СЃРЅС‹Р№ С€Р°СЂС„', type:'neck', level:null, price:14, image:'images/items/neck/neckband_red.png', image_mini:'images/items/neck/neckband_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[502] = {item_id:502, nshort:'neckband_green', name:'Р—РµР»С‘РЅС‹Р№ С€Р°СЂС„', type:'neck', level:null, price:14, image:'images/items/neck/neckband_green.png', image_mini:'images/items/neck/neckband_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[503] = {item_id:503, nshort:'neckband_blue', name:'РЎРёРЅРёР№ С€Р°СЂС„', type:'neck', level:null, price:14, image:'images/items/neck/neckband_blue.png', image_mini:'images/items/neck/neckband_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[504] = {item_id:504, nshort:'neckband_yellow', name:'Р–С‘Р»С‚С‹Р№ С€Р°СЂС„', type:'neck', level:null, price:14, image:'images/items/neck/neckband_yellow.png', image_mini:'images/items/neck/neckband_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[505] = {item_id:505, nshort:'neckband_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Р№ С€Р°СЂС„', type:'neck', level:null, price:20, image:'images/items/neck/neckband_brown.png', image_mini:'images/items/neck/neckband_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[506] = {item_id:506, nshort:'neckband_black', name:'Р§С‘СЂРЅС‹Р№ С€Р°СЂС„', type:'neck', level:null, price:20, image:'images/items/neck/neckband_black.png', image_mini:'images/items/neck/neckband_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, tactic:1, shot:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[507] = {item_id:507, nshort:'indian_chain_grey', name:'РЎРµСЂРѕРµ РёРЅРґРµР№СЃРєРѕРµ РѕР¶РµСЂРµР»СЊРµ', type:'neck', level:null, price:35, image:'images/items/neck/indian_chain_grey.png', image_mini:'images/items/neck/indian_chain_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[508] = {item_id:508, nshort:'indian_chain_red', name:'РљСЂР°СЃРЅРѕРµ РёРЅРґРµР№СЃРєРѕРµ РѕР¶РµСЂРµР»СЊРµ', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_red.png', image_mini:'images/items/neck/indian_chain_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, endurance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[509] = {item_id:509, nshort:'indian_chain_green', name:'Р—РµР»С‘РЅРѕРµ РёРЅРґРµР№СЃРєРѕРµ РѕР¶РµСЂРµР»СЊРµ', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_green.png', image_mini:'images/items/neck/indian_chain_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[510] = {item_id:510, nshort:'indian_chain_blue', name:'РЎРёРЅРµРµ РёРЅРґРµР№СЃРєРѕРµ РѕР¶РµСЂРµР»СЊРµ', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_blue.png', image_mini:'images/items/neck/indian_chain_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, finger_dexterity:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Р–С‘Р»С‚РѕРµ РёРЅРґРµР№СЃРєРѕРµ РѕР¶РµСЂРµР»СЊРµ', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_yellow.png', image_mini:'images/items/neck/indian_chain_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Р—РѕР»РѕС‚РѕРµ РёРЅРґРµР№СЃРєРѕРµ РѕР¶РµСЂРµР»СЊРµ', type:'neck', level:null, price:660, image:'images/items/neck/indian_chain_fine.png', image_mini:'images/items/neck/indian_chain_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, hide:4, punch:4, pitfall:3}, attributes:{}}, set:{key:'set_indian', name:'РРЅРґРµР№СЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
items[513] = {item_id:513, nshort:'loop_grey', name:'РЎРµСЂР°СЏ РїРѕРІСЏР·РєР°', type:'neck', level:null, price:125, image:'images/items/neck/loop_grey.png', image_mini:'images/items/neck/loop_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[514] = {item_id:514, nshort:'loop_red', name:'РљСЂР°СЃРЅР°СЏ РїРѕРІСЏР·РєР°', type:'neck', level:null, price:240, image:'images/items/neck/loop_red.png', image_mini:'images/items/neck/loop_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[515] = {item_id:515, nshort:'loop_green', name:'Р—РµР»С‘РЅР°СЏ РїРѕРІСЏР·РєР°', type:'neck', level:null, price:240, image:'images/items/neck/loop_green.png', image_mini:'images/items/neck/loop_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[516] = {item_id:516, nshort:'loop_blue', name:'РЎРёРЅСЏСЏ РїРѕРІСЏР·РєР°', type:'neck', level:null, price:240, image:'images/items/neck/loop_blue.png', image_mini:'images/items/neck/loop_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[517] = {item_id:517, nshort:'loop_yellow', name:'Р–С‘Р»С‚Р°СЏ РїРѕРІСЏР·РєР°', type:'neck', level:null, price:240, image:'images/items/neck/loop_yellow.png', image_mini:'images/items/neck/loop_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[518] = {item_id:518, nshort:'loop_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ РїРѕРІСЏР·РєР°', type:'neck', level:null, price:385, image:'images/items/neck/loop_brown.png', image_mini:'images/items/neck/loop_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, dodge:4, endurance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[519] = {item_id:519, nshort:'loop_black', name:'Р§С‘СЂРЅР°СЏ РїРѕРІСЏР·РєР°', type:'neck', level:null, price:385, image:'images/items/neck/loop_black.png', image_mini:'images/items/neck/loop_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, appearance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[520] = {item_id:520, nshort:'fly_grey', name:'РЎРµСЂР°СЏ Р±Р°Р±РѕС‡РєР°', type:'neck', level:null, price:282, image:'images/items/neck/fly_grey.png', image_mini:'images/items/neck/fly_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[521] = {item_id:521, nshort:'fly_red', name:'РљСЂР°СЃРЅР°СЏ Р±Р°Р±РѕС‡РєР°', type:'neck', level:null, price:446, image:'images/items/neck/fly_red.png', image_mini:'images/items/neck/fly_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[522] = {item_id:522, nshort:'fly_green', name:'Р—РµР»С‘РЅР°СЏ Р±Р°Р±РѕС‡РєР°', type:'neck', level:null, price:446, image:'images/items/neck/fly_green.png', image_mini:'images/items/neck/fly_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[523] = {item_id:523, nshort:'fly_blue', name:'РЎРёРЅСЏСЏ Р±Р°Р±РѕС‡РєР°', type:'neck', level:null, price:446, image:'images/items/neck/fly_blue.png', image_mini:'images/items/neck/fly_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, aim:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[524] = {item_id:524, nshort:'fly_yellow', name:'Р–С‘Р»С‚Р°СЏ Р±Р°Р±РѕС‡РєР°', type:'neck', level:null, price:446, image:'images/items/neck/fly_yellow.png', image_mini:'images/items/neck/fly_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, animal:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[525] = {item_id:525, nshort:'fly_brown', name:'РљРѕСЂРёС‡РЅРµРІР°СЏ Р±Р°Р±РѕС‡РєР°', type:'neck', level:null, price:650, image:'images/items/neck/fly_brown.png', image_mini:'images/items/neck/fly_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:10, hide:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[526] = {item_id:526, nshort:'fly_black', name:'Р§С‘СЂРЅР°СЏ Р±Р°Р±РѕС‡РєР°', type:'neck', level:null, price:650, image:'images/items/neck/fly_black.png', image_mini:'images/items/neck/fly_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, trade:4, pitfall:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[527] = {item_id:527, nshort:'fly_fine', name:'Р—РЅР°С‚РЅР°СЏ Р±Р°Р±РѕС‡РєР°', type:'neck', level:null, price:2200, image:'images/items/neck/fly_fine.png', image_mini:'images/items/neck/fly_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, repair:6, dodge:6, tactic:5}, attributes:{strength:1}}, set:{key:'set_quackery', name:'Р—РЅР°С…Р°СЂСЃРєР°СЏ СѓС‚РІР°СЂСЊ'}, shop:'shop'};\
items[528] = {item_id:528, nshort:'cross_bronze', name:'Р–РµР»РµР·РЅС‹Р№ РєСЂРµСЃС‚', type:'neck', level:null, price:730, image:'images/items/neck/cross_bronze.png', image_mini:'images/items/neck/cross_bronze.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:1, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_female', name:'РњРѕРЅР°С€РµСЃРєРёР№ СЃРєР°СЂР±'}, shop:'shop'};\
items[529] = {item_id:529, nshort:'cross_silver', name:'РЎРµСЂРµР±СЂСЏРЅС‹Р№ РєСЂРµСЃС‚', type:'neck', level:null, price:1200, image:'images/items/neck/cross_silver.png', image_mini:'images/items/neck/cross_silver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:2, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_male', name:'РЎРєР°СЂР± РїСЂРѕРїРѕРІРµРґРЅРёРєР°'}, shop:'shop'};\
items[530] = {item_id:530, nshort:'cross_gold', name:'Р—РѕР»РѕС‚РѕР№ РєСЂРµСЃС‚', type:'neck', level:null, price:3400, image:'images/items/neck/cross_gold.png', image_mini:'images/items/neck/cross_gold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[531] = {item_id:531, nshort:'cravat_grey', name:'РЎРµСЂС‹Р№ РіР°Р»СЃС‚СѓРє', type:'neck', level:null, price:820, image:'images/items/neck/cravat_grey.png', image_mini:'images/items/neck/cravat_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[532] = {item_id:532, nshort:'cravat_red', name:'РљСЂР°СЃРЅС‹Р№ РіР°Р»СЃС‚СѓРє', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_red.png', image_mini:'images/items/neck/cravat_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[533] = {item_id:533, nshort:'cravat_green', name:'Р—РµР»С‘РЅС‹Р№ РіР°Р»СЃС‚СѓРє', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_green.png', image_mini:'images/items/neck/cravat_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, reflex:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[534] = {item_id:534, nshort:'cravat_blue', name:'РЎРёРЅРёР№ РіР°Р»СЃС‚СѓРє', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_blue.png', image_mini:'images/items/neck/cravat_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[535] = {item_id:535, nshort:'cravat_yellow', name:'Р–С‘Р»С‚С‹Р№ РіР°Р»СЃС‚СѓРє', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_yellow.png', image_mini:'images/items/neck/cravat_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[536] = {item_id:536, nshort:'cravat_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Р№ РіР°Р»СЃС‚СѓРє', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_brown.png', image_mini:'images/items/neck/cravat_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:9, dodge:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[537] = {item_id:537, nshort:'cravat_black', name:'Р§С‘СЂРЅС‹Р№ РіР°Р»СЃС‚СѓРє', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_black.png', image_mini:'images/items/neck/cravat_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9, health:8, finger_dexterity:6}, attributes:{charisma:1}}, set:{key:'set_gentleman', name:'Р”Р¶РµРЅС‚Р»СЊРјРµРЅСЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
items[538] = {item_id:538, nshort:'cravat_fine', name:'Р—РЅР°С‚РЅС‹Р№ РіР°Р»СЃС‚СѓРє', type:'neck', level:null, price:4400, image:'images/items/neck/cravat_fine.png', image_mini:'images/items/neck/cravat_fine.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, health:10, swim:8, pitfall:7}, attributes:{strength:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[539] = {item_id:539, nshort:'bullet_metal', name:'РЎРІРёРЅС†РѕРІР°СЏ РїСѓР»СЏ', type:'neck', level:null, price:1800, image:'images/items/neck/bullet_metal.png', image_mini:'images/items/neck/bullet_metal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[540] = {item_id:540, nshort:'bullet_silver', name:'РЎРµСЂРµР±СЂСЏРЅР°СЏ РїСѓР»СЏ', type:'neck', level:null, price:3350, image:'images/items/neck/bullet_silver.png', image_mini:'images/items/neck/bullet_silver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[541] = {item_id:541, nshort:'bullet_gold', name:'Р—РѕР»РѕС‚Р°СЏ РїСѓР»СЏ', type:'neck', level:null, price:6750, image:'images/items/neck/bullet_gold.png', image_mini:'images/items/neck/bullet_gold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[542] = {item_id:542, nshort:'kerchief_grey', name:'РЎРµСЂС‹Р№ РїР»Р°С‚РѕРє', type:'neck', level:null, price:2500, image:'images/items/neck/kerchief_grey.png', image_mini:'images/items/neck/kerchief_grey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[543] = {item_id:543, nshort:'kerchief_red', name:'РљСЂР°СЃРЅС‹Р№ РїР»Р°С‚РѕРє', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_red.png', image_mini:'images/items/neck/kerchief_red.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, build:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[544] = {item_id:544, nshort:'kerchief_green', name:'Р—РµР»С‘РЅС‹Р№ РїР»Р°С‚РѕРє', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_green.png', image_mini:'images/items/neck/kerchief_green.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, ride:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[545] = {item_id:545, nshort:'kerchief_blue', name:'РЎРёРЅРёР№ РїР»Р°С‚РѕРє', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_blue.png', image_mini:'images/items/neck/kerchief_blue.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, appearance:13}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\
items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Р–С‘Р»С‚С‹Р№ РїР»Р°С‚РѕРє', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_yellow.png', image_mini:'images/items/neck/kerchief_yellow.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[547] = {item_id:547, nshort:'kerchief_brown', name:'РљРѕСЂРёС‡РЅРµРІС‹Р№ РїР»Р°С‚РѕРє', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_brown.png', image_mini:'images/items/neck/kerchief_brown.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, punch:10, hide:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[548] = {item_id:548, nshort:'kerchief_black', name:'Р§С‘СЂРЅС‹Р№ РїР»Р°С‚РѕРє', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_black.png', image_mini:'images/items/neck/kerchief_black.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[549] = {item_id:549, nshort:'bullchain_metal', name:'Р–РµР»РµР·РЅС‹Р№ Р±РёР·РѕРЅ', type:'neck', level:null, price:2400, image:'images/items/neck/bullchain_metal.png', image_mini:'images/items/neck/bullchain_metal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[550] = {item_id:550, nshort:'bullchain_silver', name:'РЎРµСЂРµР±СЂСЏРЅС‹Р№ Р±РёР·РѕРЅ', type:'neck', level:null, price:4490, image:'images/items/neck/bullchain_silver.png', image_mini:'images/items/neck/bullchain_silver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[551] = {item_id:551, nshort:'bullchain_gold', name:'Р—РѕР»РѕС‚РѕР№ Р±РёР·РѕРЅ', type:'neck', level:null, price:8300, image:'images/items/neck/bullchain_gold.png', image_mini:'images/items/neck/bullchain_gold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[552] = {item_id:552, nshort:'talisman', name:'РўР°Р»РёСЃРјР°РЅ', type:'neck', level:null, price:1000, image:'images/items/neck/talisman.png', image_mini:'images/items/neck/talisman.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'unk'};\
items[553] = {item_id:553, nshort:'stonechain', name:'РљР°РјРµРЅРЅС‹Р№ РјРµРґР°Р»СЊРѕРЅ', type:'neck', level:null, price:1000, image:'images/items/neck/stonechain.png', image_mini:'images/items/neck/stonechain.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[554] = {item_id:554, nshort:'southcross', name:'РњРµРґР°Р»СЊ Р·Р° РјСѓР¶РµСЃС‚РІРѕ', type:'neck', level:null, price:650, image:'images/items/neck/southcross.png', image_mini:'images/items/neck/southcross.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:8, appearance:7, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[555] = {item_id:555, nshort:'aztecchains', name:'РћР¶РµСЂРµР»СЊРµ Р°С†С‚РµРєРѕРІ', type:'neck', level:null, price:1200, image:'images/items/neck/aztecchains.png', image_mini:'images/items/neck/aztecchains.png', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:9, ride:10, tough:8}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[557] = {item_id:557, nshort:'bone_necklace', name:'РљРѕСЃС‚СЏРЅРѕРµ РѕР¶РµСЂРµР»СЊРµ', type:'neck', level:null, price:1700, image:'images/items/neck/bone_necklace.png', image_mini:'images/items/neck/bone_necklace.png', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{appearance:3}, attributes:{strength:5}}, set:{key:null, name:null}, shop:'quest'};\
\
items[561] = {item_id:561, nshort:'mexican_neck', name:'РњРµРєСЃРёРєР°РЅСЃРєРёР№ С€Р°СЂС„', type:'neck', level:28, price:600, image:'images/items/neck/mexican_neck.png', image_mini:'images/items/neck/mexican_neck.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:17}, attributes:{}}, set:{key:'set_mexican', name:'РќР°Р±РѕСЂ РјРµРєСЃРёРєР°РЅС†Р°'}, shop:'shop'};\
items[566] = {item_id:566, nshort:'dance_neck', name:'Р–РµРјС‡СѓР¶РЅРѕРµ РѕР¶РµСЂРµР»СЊРµ', type:'neck', level:43, price:1800, image:'images/items/neck/mexican_neck.png', image_mini:'images/items/neck/mexican_neck.png', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{pitfall:6, leadership:8, trade:9}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'РўСѓР°Р»РµС‚ С‚Р°РЅС†РѕРІС‰РёС†С‹'}, shop:'quest'};\
\
\
items[600] = {item_id:600, nshort:'donkey', name:'РћСЃС‘Р»', type:'animal', level:1, price:250, image:'images/items/animal/donkey.png', image_mini:'images/items/animal/mini/donkey.png', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'РќР°Р±РѕСЂ РјРµРєСЃРёРєР°РЅС†Р°'}, shop:'shop'};\
items[601] = {item_id:601, nshort:'pony', name:'РџРѕРЅРё', type:'animal', level:1, price:500, image:'images/items/animal/pony.png', image_mini:'images/items/animal/mini/pony.png', characterClass:null, characterSex:null, speed:0.666, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[602] = {item_id:602, nshort:'mustang', name:'РњСѓСЃС‚Р°РЅРі', type:'animal', level:1, price:850, image:'images/items/animal/mustang.png', image_mini:'images/items/animal/mini/mustang.png', characterClass:null, characterSex:null, speed:0.571, bonus:{skills:{}, attributes:{}}, set:{key:'set_indian', name:'РРЅРґРµР№СЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'shop'};\
items[603] = {item_id:603, nshort:'berber', name:'Р С‹СЃР°Рє', type:'animal', level:1, price:1250, image:'images/items/animal/berber.png', image_mini:'images/items/animal/mini/berber.png', characterClass:null, characterSex:null, speed:0.5, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[604] = {item_id:604, nshort:'araber', name:'РђСЂР°Р±СЃРєРёР№ СЃРєР°РєСѓРЅ', type:'animal', level:1, price:2000, image:'images/items/animal/araber.png', image_mini:'images/items/animal/mini/araber.png', characterClass:null, characterSex:null, speed:0.444, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[605] = {item_id:605, nshort:'quarter', name:'РљРІР°С‚РµСЂС…РѕСЂСЃ', type:'animal', level:1, price:2800, image:'images/items/animal/quarter.png', image_mini:'images/items/animal/mini/quarter.png', characterClass:null, characterSex:null, speed:0.4, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
\
items[700] = {item_id:700, nshort:'ham', name:'РЎРІРёРЅРёРЅР°', type:'yield', level:null, price:10, image:'images/items/yield/ham.png', image_mini:'images/items/yield/ham.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[701] = {item_id:701, nshort:'cereals', name:'Р—РµСЂРЅРѕ', type:'yield', level:null, price:3, image:'images/items/yield/cereals.png', image_mini:'images/items/yield/cereals.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[702] = {item_id:702, nshort:'tabacco', name:'РўР°Р±Р°Рє', type:'yield', level:null, price:5, image:'images/items/yield/tabacco.png', image_mini:'images/items/yield/tabacco.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[703] = {item_id:703, nshort:'sugar', name:'РЎР°С…Р°СЂ', type:'yield', level:null, price:8, image:'images/items/yield/sugar.png', image_mini:'images/items/yield/sugar.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[704] = {item_id:704, nshort:'cotton', name:'РҐР»РѕРїРѕРє', type:'yield', level:null, price:6, image:'images/items/yield/cotton.png', image_mini:'images/items/yield/cotton.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[705] = {item_id:705, nshort:'trout', name:'Р¤РѕСЂРµР»СЊ', type:'yield', level:null, price:4, image:'images/items/yield/trout.png', image_mini:'images/items/yield/trout.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[706] = {item_id:706, nshort:'berrys', name:'РЇРіРѕРґС‹', type:'yield', level:null, price:4, image:'images/items/yield/berrys.png', image_mini:'images/items/yield/berrys.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[707] = {item_id:707, nshort:'shearings', name:'РЁРµСЂСЃС‚СЊ', type:'yield', level:null, price:8, image:'images/items/yield/shearings.png', image_mini:'images/items/yield/shearings.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[708] = {item_id:708, nshort:'copper_pyrites', name:'РџРёСЂРёС‚', type:'yield', level:null, price:16, image:'images/items/yield/copper_pyrites.png', image_mini:'images/items/yield/copper_pyrites.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[709] = {item_id:709, nshort:'turkey', name:'РРЅРґРµР№РєР°', type:'yield', level:null, price:14, image:'images/items/yield/turkey.png', image_mini:'images/items/yield/turkey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[710] = {item_id:710, nshort:'beef', name:'Р“РѕРІСЏР¶РёР№ Р±РёС„С€С‚РµРєСЃ', type:'yield', level:null, price:24, image:'images/items/yield/beef.png', image_mini:'images/items/yield/beef.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[711] = {item_id:711, nshort:'planks', name:'Р”РµСЂРµРІРѕ', type:'yield', level:null, price:16, image:'images/items/yield/planks.png', image_mini:'images/items/yield/planks.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[712] = {item_id:712, nshort:'leather', name:'РљРѕР¶Р°', type:'yield', level:null, price:16, image:'images/items/yield/leather.png', image_mini:'images/items/yield/leather.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[714] = {item_id:714, nshort:'beaver', name:'Р‘РѕР±СЂРѕРІС‹Р№ РјРµС…', type:'yield', level:null, price:36, image:'images/items/yield/beaver.png', image_mini:'images/items/yield/beaver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[715] = {item_id:715, nshort:'fabric', name:'Р СѓР»РѕРЅ СЃСѓРєРЅР°', type:'yield', level:null, price:22, image:'images/items/yield/fabric.png', image_mini:'images/items/yield/fabric.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[716] = {item_id:716, nshort:'stone', name:'РљР°РјРЅРё', type:'yield', level:null, price:10, image:'images/items/yield/stone.png', image_mini:'images/items/yield/stone.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[717] = {item_id:717, nshort:'grund', name:'Р›РѕСЃРѕСЃСЊ', type:'yield', level:null, price:14, image:'images/items/yield/grund.png', image_mini:'images/items/yield/grund.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[718] = {item_id:718, nshort:'coyote', name:'Р—СѓР± РєРѕР№РѕС‚Р°', type:'yield', level:null, price:42, image:'images/items/yield/coyote.png', image_mini:'images/items/yield/coyote.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[719] = {item_id:719, nshort:'cigar', name:'РЎРёРіР°СЂС‹', type:'yield', level:null, price:24, image:'images/items/yield/cigar.png', image_mini:'images/items/yield/cigar.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[720] = {item_id:720, nshort:'gems', name:'Р”СЂР°РіРѕС†РµРЅРЅС‹Рµ РєР°РјРЅРё', type:'yield', level:null, price:70, image:'images/items/yield/gems.png', image_mini:'images/items/yield/gems.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[721] = {item_id:721, nshort:'coal', name:'РЈРіРѕР»СЊ', type:'yield', level:null, price:20, image:'images/items/yield/coal.png', image_mini:'images/items/yield/coal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[722] = {item_id:722, nshort:'meal', name:'Р“РѕСЂСЏС‡Р°СЏ Р·Р°РєСѓСЃРєР°', type:'yield', level:null, price:14, image:'images/items/yield/meal.png', image_mini:'images/items/yield/meal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[723] = {item_id:723, nshort:'ring', name:'РљРѕР»СЊС†Рѕ', type:'yield', level:null, price:160, image:'images/items/yield/ring.png', image_mini:'images/items/yield/ring.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_female', name:'РњРѕРЅР°С€РµСЃРєРёР№ СЃРєР°СЂР±'}, shop:'drop'};\
items[724] = {item_id:724, nshort:'buffalo', name:'РЁРєСѓСЂР° Р±РёР·РѕРЅР°', type:'yield', level:null, price:40, image:'images/items/yield/buffalo.png', image_mini:'images/items/yield/buffalo.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[725] = {item_id:725, nshort:'silver', name:'РЎРµСЂРµР±СЂРѕ', type:'yield', level:null, price:200, image:'images/items/yield/silver.png', image_mini:'images/items/yield/silver.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[726] = {item_id:726, nshort:'indiangold', name:'Р—РѕР»РѕС‚Рѕ Р°С†С‚РµРєРѕРІ', type:'yield', level:null, price:290, image:'images/items/yield/indiangold.png', image_mini:'images/items/yield/indiangold.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[727] = {item_id:727, nshort:'medal', name:'РњРµРґР°Р»СЊ Р·Р° РѕС‚РІР°РіСѓ', type:'yield', level:null, price:500, image:'images/items/yield/medal.png', image_mini:'images/items/yield/medal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[730] = {item_id:730, nshort:'necklet', name:'РЈРєСЂР°С€РµРЅРёСЏ', type:'yield', level:null, price:230, image:'images/items/yield/necklet.png', image_mini:'images/items/yield/necklet.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[731] = {item_id:731, nshort:'grizzly', name:'РўСЂРѕС„РµР№', type:'yield', level:null, price:150, image:'images/items/yield/grizzly.png', image_mini:'images/items/yield/grizzly.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[734] = {item_id:734, nshort:'slicer', name:'Р СѓР±Р°РЅРѕРє', type:'yield', level:null, price:44, image:'images/items/yield/slicer.png', image_mini:'images/items/yield/slicer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[736] = {item_id:736, nshort:'spade', name:'Р›РѕРїР°С‚Р°', type:'yield', level:null, price:40, image:'images/items/yield/spade.png', image_mini:'images/items/yield/spade.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[737] = {item_id:737, nshort:'dynamite', name:'Р”РёРЅР°РјРёС‚', type:'yield', level:null, price:80, image:'images/items/yield/dynamite.png', image_mini:'images/items/yield/dynamite.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[739] = {item_id:739, nshort:'fence', name:'РљРѕР»СЋС‡Р°СЏ РїСЂРѕРІРѕР»РѕРєР°', type:'yield', level:null, price:36, image:'images/items/yield/fence.png', image_mini:'images/items/yield/fence.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[740] = {item_id:740, nshort:'horn', name:'РљРѕСЂРѕРІРёР№ СЂРѕРі', type:'yield', level:null, price:78, image:'images/items/yield/horn.png', image_mini:'images/items/yield/horn.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[741] = {item_id:741, nshort:'pitcher', name:'РљСѓРІС€РёРЅ', type:'yield', level:null, price:24, image:'images/items/yield/pitcher.png', image_mini:'images/items/yield/pitcher.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[742] = {item_id:742, nshort:'saw', name:'РџРёР»Р°', type:'yield', level:null, price:40, image:'images/items/yield/saw.png', image_mini:'images/items/yield/saw.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[743] = {item_id:743, nshort:'poster', name:'РџР»Р°РєР°С‚', type:'yield', level:null, price:4, image:'images/items/yield/poster.png', image_mini:'images/items/yield/poster.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[744] = {item_id:744, nshort:'newspaper', name:'Р“Р°Р·РµС‚Р°', type:'yield', level:null, price:6, image:'images/items/yield/newspaper.png', image_mini:'images/items/yield/newspaper.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[745] = {item_id:745, nshort:'flour', name:'РњСѓРєР°', type:'yield', level:null, price:5, image:'images/items/yield/flour.png', image_mini:'images/items/yield/flour.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[746] = {item_id:746, nshort:'beans', name:'Р¤Р°СЃРѕР»СЊ', type:'yield', level:null, price:6, image:'images/items/yield/beans.png', image_mini:'images/items/yield/beans.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[747] = {item_id:747, nshort:'hammer', name:'РњРѕР»РѕС‚РѕРє', type:'yield', level:null, price:22, image:'images/items/yield/hammer.png', image_mini:'images/items/yield/hammer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[748] = {item_id:748, nshort:'corn', name:'РљСѓРєСѓСЂСѓР·Р°', type:'yield', level:null, price:4, image:'images/items/yield/corn.png', image_mini:'images/items/yield/corn.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[749] = {item_id:749, nshort:'rope', name:'Р›Р°СЃСЃРѕ', type:'yield', level:null, price:32, image:'images/items/yield/rope.png', image_mini:'images/items/yield/rope.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[750] = {item_id:750, nshort:'nippers', name:'РќР°СЂСѓС‡РЅРёРєРё', type:'yield', level:null, price:58, image:'images/items/yield/nippers.png', image_mini:'images/items/yield/nippers.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[751] = {item_id:751, nshort:'pipe', name:'РўСЂСѓР±РєР° РјРёСЂР°', type:'yield', level:null, price:72, image:'images/items/yield/pipe.png', image_mini:'images/items/yield/pipe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[752] = {item_id:752, nshort:'oil', name:'РќРµС„С‚СЊ', type:'yield', level:null, price:76, image:'images/items/yield/oil.png', image_mini:'images/items/yield/oil.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[753] = {item_id:753, nshort:'pick', name:'РљРёСЂРєР°', type:'yield', level:null, price:44, image:'images/items/yield/pick.png', image_mini:'images/items/yield/pick.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[754] = {item_id:754, nshort:'horseshoe', name:'РџРѕРґРєРѕРІР°', type:'yield', level:null, price:30, image:'images/items/yield/horseshoe.png', image_mini:'images/items/yield/horseshoe.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[755] = {item_id:755, nshort:'flag', name:'Р¤Р»Р°Р¶РѕРє', type:'yield', level:null, price:32, image:'images/items/yield/flag.png', image_mini:'images/items/yield/flag.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[756] = {item_id:756, nshort:'toolbox', name:'РЇС‰РёРє СЃ РёРЅСЃС‚СЂСѓРјРµРЅС‚Р°РјРё', type:'yield', level:null, price:110, image:'images/items/yield/toolbox.png', image_mini:'images/items/yield/toolbox.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[757] = {item_id:757, nshort:'feather', name:'РџРµСЂРѕ РІРѕСЂРѕРЅР°', type:'yield', level:null, price:8, image:'images/items/yield/feather.png', image_mini:'images/items/yield/feather.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[758] = {item_id:758, nshort:'flag_north', name:'РЎРѕСЋР·РЅС‹Р№ С„Р»Р°Рі', type:'yield', level:null, price:86, image:'images/items/yield/flag_north.png', image_mini:'images/items/yield/flag_north.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[759] = {item_id:759, nshort:'ticket', name:'Р–РµР»РµР·РЅРѕРґРѕСЂРѕР¶РЅС‹Р№ Р±РёР»РµС‚', type:'yield', level:null, price:34, image:'images/items/yield/ticket.png', image_mini:'images/items/yield/ticket.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[760] = {item_id:760, nshort:'map', name:'РљР°СЂС‚Р°', type:'yield', level:null, price:32, image:'images/items/yield/map.png', image_mini:'images/items/yield/map.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[761] = {item_id:761, nshort:'sledgehammer', name:'РљСѓРІР°Р»РґР°', type:'yield', level:null, price:52, image:'images/items/yield/sledgehammer.png', image_mini:'images/items/yield/sledgehammer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[762] = {item_id:762, nshort:'flag_south', name:'Р¤Р»Р°Рі РєРѕРЅС„РµРґРµСЂР°С†РёРё', type:'yield', level:null, price:86, image:'images/items/yield/flag_south.png', image_mini:'images/items/yield/flag_south.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[763] = {item_id:763, nshort:'wolf', name:'Р‘СЂР°СЃР»РµС‚ РёР· Р·СѓР±РѕРІ', type:'yield', level:null, price:44, image:'images/items/yield/wolf.png', image_mini:'images/items/yield/wolf.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[764] = {item_id:764, nshort:'shackle', name:'РљР°РЅРґР°Р»С‹', type:'yield', level:null, price:62, image:'images/items/yield/shackle.png', image_mini:'images/items/yield/shackle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[765] = {item_id:765, nshort:'sickle', name:'РЎРµСЂРї', type:'yield', level:null, price:44, image:'images/items/yield/sickle.png', image_mini:'images/items/yield/sickle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[766] = {item_id:766, nshort:'water', name:'РЎС‚Р°РєР°РЅ РІРѕРґС‹', type:'yield', level:null, price:6, image:'images/items/yield/water.png', image_mini:'images/items/yield/water.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[767] = {item_id:767, nshort:'string', name:'РљР°С‚СѓС€РєР° РїСЂРѕРІРѕР»РѕРєРё', type:'yield', level:null, price:34, image:'images/items/yield/string.png', image_mini:'images/items/yield/string.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[768] = {item_id:768, nshort:'hymnal', name:'РџСЃР°Р»С‚С‹СЂСЊ', type:'yield', level:null, price:48, image:'images/items/yield/hymnal.png', image_mini:'images/items/yield/hymnal.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_male', name:'РЎРєР°СЂР± РїСЂРѕРїРѕРІРµРґРЅРёРєР°'}, shop:'drop'};\
items[769] = {item_id:769, nshort:'empty_bottle', name:'РџСѓСЃС‚Р°СЏ Р±СѓС‚С‹Р»РєР°', type:'yield', level:null, price:2, image:'images/items/yield/empty_bottle.png', image_mini:'images/items/yield/empty_bottle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[771] = {item_id:771, nshort:'trap', name:'РљР°РїРєР°РЅ РЅР° Р±РѕР±СЂР°', type:'yield', level:null, price:50, image:'images/items/yield/trap.png', image_mini:'images/items/yield/trap.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[773] = {item_id:773, nshort:'paper1', name:'РћР±СЂС‹РІРѕРє (I С‡Р°СЃС‚СЊ)', type:'yield', level:null, price:1400, image:'images/items/yield/paper1.png', image_mini:'images/items/yield/paper1.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[774] = {item_id:774, nshort:'paper2', name:'РћР±СЂС‹РІРѕРє (II С‡Р°СЃС‚СЊ)', type:'yield', level:null, price:590, image:'images/items/yield/paper2.png', image_mini:'images/items/yield/paper2.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[779] = {item_id:779, nshort:'post_horn', name:'РџРѕС‡С‚РѕРІС‹Р№ СЂРѕР¶РѕРє', type:'yield', level:null, price:60, image:'images/items/yield/post_horn.png', image_mini:'images/items/yield/post_horn.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[778] = {item_id:778, nshort:'cooking_pot', name:'РљР°СЃС‚СЂСЋР»СЏ', type:'yield', level:null, price:22, image:'images/items/yield/cooking_pot.png', image_mini:'images/items/yield/cooking_pot.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[780] = {item_id:780, nshort:'rounds', name:'РџР°С‚СЂРѕРЅС‹', type:'yield', level:null, price:50, image:'images/items/yield/rounds.png', image_mini:'images/items/yield/rounds.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[781] = {item_id:781, nshort:'documents', name:'Р”РѕРєСѓРјРµРЅС‚С‹', type:'yield', level:null, price:120, image:'images/items/yield/documents.png', image_mini:'images/items/yield/documents.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[782] = {item_id:782, nshort:'angle', name:'РЈРґРѕС‡РєР°', type:'yield', level:null, price:42, image:'images/items/yield/angle.png', image_mini:'images/items/yield/angle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[783] = {item_id:783, nshort:'gold_sculpture', name:'Р—РѕР»РѕС‚Р°СЏ СЃС‚Р°С‚СѓСЌС‚РєР°', type:'yield', level:null, price:144, image:'images/items/yield/gold_sculpture.png', image_mini:'images/items/yield/gold_sculpture.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[784] = {item_id:784, nshort:'nails', name:'Р“РІРѕР·РґРё', type:'yield', level:null, price:8, image:'images/items/yield/nails.png', image_mini:'images/items/yield/nails.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[787] = {item_id:787, nshort:'saddle', name:'РЎРµРґР»Рѕ', type:'yield', level:null, price:80, image:'images/items/yield/saddle.png', image_mini:'images/items/yield/saddle.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[788] = {item_id:788, nshort:'bell', name:'РљРѕСЂР°Р±РµР»СЊРЅС‹Р№ РєРѕР»РѕРєРѕР»', type:'yield', level:null, price:130, image:'images/items/yield/bell.png', image_mini:'images/items/yield/bell.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[789] = {item_id:789, nshort:'coin', name:'РњРѕРЅРµС‚Р°', type:'yield', level:null, price:2, image:'images/items/yield/coin.png', image_mini:'images/items/yield/coin.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[790] = {item_id:790, nshort:'iron', name:'Р–РµР»РµР·Рѕ', type:'yield', level:null, price:36, image:'images/items/yield/iron.png', image_mini:'images/items/yield/iron.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[791] = {item_id:791, nshort:'orange', name:'РђРїРµР»СЊСЃРёРЅС‹', type:'yield', level:null, price:8, image:'images/items/yield/orange.png', image_mini:'images/items/yield/orange.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[792] = {item_id:792, nshort:'tequila', name:'РўРµРєРёР»Р°', type:'yield', level:null, price:24, image:'images/items/yield/tequila.png', image_mini:'images/items/yield/tequila.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'РќР°Р±РѕСЂ РјРµРєСЃРёРєР°РЅС†Р°'}, shop:'drop'};\
items[793] = {item_id:793, nshort:'tomato', name:'РџРѕРјРёРґРѕСЂ', type:'yield', level:null, price:6, image:'images/items/yield/tomato.png', image_mini:'images/items/yield/tomato.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[794] = {item_id:794, nshort:'potion', name:'Р­Р»РёРєСЃРёСЂ', type:'yield', level:null, price:360, image:'images/items/yield/potion.png', image_mini:'images/items/yield/potion.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_quackery', name:'Р—РЅР°С…Р°СЂСЃРєР°СЏ СѓС‚РІР°СЂСЊ'}, shop:'drop'};\
items[795] = {item_id:795, nshort:'peg', name:'РљРѕР»С‹С€РµРє', type:'yield', level:null, price:15, image:'images/items/yield/peg.png', image_mini:'images/items/yield/peg.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[797] = {item_id:797, nshort:'pitchfork', name:'Р’РёР»С‹', type:'yield', level:null, price:32, image:'images/items/yield/pitchfork.png', image_mini:'images/items/yield/pitchfork.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_farmer', name:'РќР°Р±РѕСЂ С„РµСЂРјРµСЂР°'}, shop:'drop'};\
\
\
items[800] = {item_id:800, nshort:'stone_pebble', name:'Р“Р°Р»СЊРєР°', type:'right_arm', level:2, price:15, image:'images/items/right_arm/stone_pebble.png', image_mini:'images/items/right_arm/mini/stone_pebble.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[801] = {item_id:801, nshort:'stone_flint', name:'РљСЂРµРјРµРЅСЊ', type:'right_arm', level:5, price:26, image:'images/items/right_arm/stone_flint.png', image_mini:'images/items/right_arm/mini/stone_flint.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[802] = {item_id:802, nshort:'stone_granite', name:'Р“СЂР°РЅРёС‚', type:'right_arm', level:8, price:46, image:'images/items/right_arm/stone_granite.png', image_mini:'images/items/right_arm/mini/stone_granite.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[803] = {item_id:803, nshort:'crutch_rusty', name:'РџРѕС‚СЂС‘РїР°РЅРЅР°СЏ СЂРѕРіР°С‚РєР°', type:'right_arm', level:7, price:26, image:'images/items/right_arm/crutch_rusty.png', image_mini:'images/items/right_arm/mini/crutch_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[804] = {item_id:804, nshort:'crutch', name:'Р РѕРіР°С‚РєР°', type:'right_arm', level:10, price:63, image:'images/items/right_arm/crutch.png', image_mini:'images/items/right_arm/mini/crutch.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[805] = {item_id:805, nshort:'crutch_accurate', name:'РўРѕС‡РЅР°СЏ СЂРѕРіР°С‚РєР°', type:'right_arm', level:13, price:148, image:'images/items/right_arm/crutch_accurate.png', image_mini:'images/items/right_arm/mini/crutch_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Р РѕРіР°С‚РєР° Р“РµРєР° Р¤РёРЅРЅР°', type:'right_arm', level:20, price:1360, image:'images/items/right_arm/crutch_huckeberry.png', image_mini:'images/items/right_arm/mini/crutch_huckeberry.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Р Р¶Р°РІС‹Р№ РєСЂРµРјРЅС‘РІС‹Р№ РїРёСЃС‚РѕР»РµС‚', type:'right_arm', level:17, price:124, image:'images/items/right_arm/leadshot_rusty.png', image_mini:'images/items/right_arm/mini/leadshot_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[808] = {item_id:808, nshort:'leadshot', name:'РљСЂРµРјРЅС‘РІС‹Р№ РїРёСЃС‚РѕР»РµС‚', type:'right_arm', level:20, price:384, image:'images/items/right_arm/leadshot.png', image_mini:'images/items/right_arm/mini/leadshot.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[809] = {item_id:809, nshort:'leadshot_accurate', name:'РўРѕС‡РЅС‹Р№ РєСЂРµРјРЅС‘РІС‹Р№ РїРёСЃС‚РѕР»РµС‚', type:'right_arm', level:23, price:550, image:'images/items/right_arm/leadshot_accurate.png', image_mini:'images/items/right_arm/mini/leadshot_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Р Р¶Р°РІРѕРµ РґСѓР»СЊРЅРѕР·Р°СЂСЏРґРЅРѕРµ СЂСѓР¶СЊС‘', type:'right_arm', level:22, price:326, image:'images/items/right_arm/muzzleloader_rusty.png', image_mini:'images/items/right_arm/mini/muzzleloader_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[812] = {item_id:812, nshort:'muzzleloader', name:'Р”СѓР»СЊРЅРѕР·Р°СЂСЏРґРЅРѕРµ СЂСѓР¶СЊС‘', type:'right_arm', level:25, price:545, image:'images/items/right_arm/muzzleloader.png', image_mini:'images/items/right_arm/mini/muzzleloader.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'РўРѕС‡РЅРѕРµ РґСѓР»СЊРЅРѕР·Р°СЂСЏРґРЅРѕРµ СЂСѓР¶СЊС‘', type:'right_arm', level:28, price:940, image:'images/items/right_arm/muzzleloader_accurate.png', image_mini:'images/items/right_arm/mini/muzzleloader_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[815] = {item_id:815, nshort:'deringer_rusty', name:'Р Р¶Р°РІС‹Р№ РґРµСЂСЂРёРЅРґР¶РµСЂ', type:'right_arm', level:32, price:730, image:'images/items/right_arm/deringer_rusty.png', image_mini:'images/items/right_arm/mini/deringer_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[816] = {item_id:816, nshort:'deringer', name:'Р”РµСЂСЂРёРЅРґР¶РµСЂ', type:'right_arm', level:35, price:1280, image:'images/items/right_arm/deringer.png', image_mini:'images/items/right_arm/mini/deringer.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[817] = {item_id:817, nshort:'deringer_accurate', name:'РўРѕС‡РЅС‹Р№ РґРµСЂСЂРёРЅРґР¶РµСЂ', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/deringer_accurate.png', image_mini:'images/items/right_arm/mini/deringer_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Р Р¶Р°РІС‹Р№ РјРЅРѕРіРѕСЃС‚РІРѕР»СЊРЅС‹Р№ СЂРµРІРѕР»СЊРІРµСЂ', type:'right_arm', level:37, price:940, image:'images/items/right_arm/pepperbox_rusty.png', image_mini:'images/items/right_arm/mini/pepperbox_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[820] = {item_id:820, nshort:'pepperbox', name:'РњРЅРѕРіРѕСЃС‚РІРѕР»СЊРЅС‹Р№ СЂРµРІРѕР»СЊРІРµСЂ', type:'right_arm', level:40, price:1440, image:'images/items/right_arm/pepperbox.png', image_mini:'images/items/right_arm/mini/pepperbox.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'РўРѕС‡РЅС‹Р№ РјРЅРѕРіРѕСЃС‚РІРѕР»СЊРЅС‹Р№ СЂРµРІРѕР»СЊРІРµСЂ', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/pepperbox_accurate.png', image_mini:'images/items/right_arm/mini/pepperbox_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[823] = {item_id:823, nshort:'smith_rusty', name:'Р Р¶Р°РІС‹Р№ РЎРјРёС‚-Р’РµСЃСЃРѕРЅ в„–1', type:'right_arm', level:47, price:1650, image:'images/items/right_arm/smith_rusty.png', image_mini:'images/items/right_arm/mini/smith_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[824] = {item_id:824, nshort:'smith', name:'РЎРјРёС‚-Р’РµСЃСЃРѕРЅ в„–1', type:'right_arm', level:50, price:2350, image:'images/items/right_arm/smith.png', image_mini:'images/items/right_arm/mini/smith.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[825] = {item_id:825, nshort:'smith_accurate', name:'РўРѕС‡РЅС‹Р№ РЎРјРёС‚-Р’РµСЃСЃРѕРЅ в„–1', type:'right_arm', level:53, price:3180, image:'images/items/right_arm/smith_accurate.png', image_mini:'images/items/right_arm/mini/smith_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[827] = {item_id:827, nshort:'remington_rusty', name:'Р Р¶Р°РІС‹Р№ Р°СЂРјРµР№СЃРєРёР№ СЂРµРІРѕР»СЊРІРµСЂ', type:'right_arm', level:52, price:2150, image:'images/items/right_arm/remington_rusty.png', image_mini:'images/items/right_arm/mini/remington_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[828] = {item_id:828, nshort:'remington', name:'РђСЂРјРµР№СЃРєРёР№ СЂРµРІРѕР»СЊРІРµСЂ', type:'right_arm', level:55, price:2950, image:'images/items/right_arm/remington.png', image_mini:'images/items/right_arm/mini/remington.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[829] = {item_id:829, nshort:'remington_accurate', name:'РўРѕС‡РЅС‹Р№ Р°СЂРјРµР№СЃРєРёР№ СЂРµРІРѕР»СЊРІРµСЂ', type:'right_arm', level:58, price:3940, image:'images/items/right_arm/remington_accurate.png', image_mini:'images/items/right_arm/mini/remington_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Р Р¶Р°РІС‹Р№ РєРѕР»СЊС‚ В«РјРёСЂРѕС‚РІРѕСЂРµС†В»', type:'right_arm', level:62, price:3380, image:'images/items/right_arm/peacemaker_rusty.png', image_mini:'images/items/right_arm/mini/peacemaker_rusty.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[832] = {item_id:832, nshort:'peacemaker', name:'РљРѕР»СЊС‚ В«РјРёСЂРѕС‚РІРѕСЂРµС†В»', type:'right_arm', level:65, price:4570, image:'images/items/right_arm/peacemaker.png', image_mini:'images/items/right_arm/mini/peacemaker.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'РўРѕС‡РЅС‹Р№ РєРѕР»СЊС‚ \"РњРёСЂРѕС‚РІРѕСЂРµС†\"', type:'right_arm', level:68, price:5400, image:'images/items/right_arm/peacemaker_accurate.png', image_mini:'images/items/right_arm/mini/peacemaker_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[837] = {item_id:837, nshort:'schofield_accurate', name:'РўРѕС‡РЅС‹Р№ РЎРєРѕС„РёР»Рґ', type:'right_arm', level:73, price:6400, image:'images/items/right_arm/schofield_accurate.png', image_mini:'images/items/right_arm/mini/schofield_accurate.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[840] = {item_id:840, nshort:'buntline', name:'Р‘Р°РЅС‚Р»Р°Р№РЅ', type:'right_arm', level:75, price:6250, image:'images/items/right_arm/buntline.png', image_mini:'images/items/right_arm/mini/buntline.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[854] = {item_id:854, nshort:'elixier', name:'РљРёСЃР»РѕС‚Р°', type:'right_arm', level:42, price:1500, image:'images/items/right_arm/elixier.png', image_mini:'images/items/right_arm/mini/elixier.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:'set_quackery', name:'Р—РЅР°С…Р°СЂСЃРєР°СЏ СѓС‚РІР°СЂСЊ'}, shop:'shop'};\
\
\
items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Р¤РѕСЂРјР°', type:'body', level:20, price:800, image:'images/items/body/uniform_perfect.png', image_mini:'images/items/body/mini/uniform_perfect.png', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:3, hide:4}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1706] = {item_id:1706, nshort:'letter', name:'РџРёСЃСЊРјРѕ', type:'yield', level:null, price:1, image:'images/items/yield/letter.png', image_mini:'images/items/yield/letter.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1708] = {item_id:1708, nshort:'whiskey', name:'Р’РёСЃРєРё', type:'yield', level:null, price:10, image:'images/items/yield/whiskey.png', image_mini:'images/items/yield/whiskey.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1715] = {item_id:1715, nshort:'cane', name:'РўСЂРѕСЃС‚СЊ', type:'yield', level:42, price:2800, image:'images/items/yield/cane.png', image_mini:'images/items/yield/cane.png', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_gentleman', name:'Р”Р¶РµРЅС‚Р»СЊРјРµРЅСЃРєРёР№ РЅР°Р±РѕСЂ'}, shop:'quest'};\
items[1716] = {item_id:1716, nshort:'letter', name:'Р›РёС‡РЅРѕРµ РїРёСЃСЊРјРѕ', type:'yield', level:null, price:2, image:'images/items/yield/letter.png', image_mini:'images/items/yield/letter.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
";


bi2_code += "\
raboty = [];\
raboty[1] = {rus_name:'Р’С‹РїР°СЃ СЃРІРёРЅРµР№', name:'swine', malus:1, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};\
raboty[2] = {rus_name:'РџСЂРёСЃРјРѕС‚СЂ Р·Р° РїРѕР»РµРј', name:'scarecrow', malus:0, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};\
raboty[3] = {rus_name:'Р Р°СЃРєР»РµР№РєР° РїР»Р°РєР°С‚РѕРІ', name:'wanted', malus:0, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};\
raboty[4] = {rus_name:'РЎР±РѕСЂ С‚Р°Р±Р°РєР°', name:'tabacco', malus:0, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};\
raboty[5] = {rus_name:'РЎР±РѕСЂ С…Р»РѕРїРєР°', name:'cotton', malus:1, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};\
raboty[6] = {rus_name:'РЎР±РѕСЂ СЃР°С…Р°СЂРЅРѕРіРѕ С‚СЂРѕСЃС‚РЅРёРєР°', name:'sugar', malus:3, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};\
raboty[7] = {rus_name:'Р С‹Р±Р°Р»РєР°', name:'angle', malus:2, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};\
raboty[8] = {rus_name:'Р–Р°С‚РІР°', name:'cereal', malus:10, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};\
raboty[9] = {rus_name:'РЎР±РѕСЂ СЏРіРѕРґ', name:'berry', malus:15, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};\
raboty[10] = {rus_name:'Р’С‹РїР°СЃ РѕРІРµС†', name:'sheeps', malus:11, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};\
raboty[11] = {rus_name:'РџСЂРѕРґР°Р¶Р° РїСЂРµСЃСЃС‹', name:'newspaper', malus:8, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};\
raboty[12] = {rus_name:'РЎРµРЅРѕРєРѕСЃ', name:'cut', malus:21, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};\
raboty[13] = {rus_name:'РџРѕРјРѕР» Р·РµСЂРЅР°', name:'grinding', malus:24, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};\
raboty[14] = {rus_name:'РЎР±РѕСЂ РєСѓРєСѓСЂСѓР·С‹', name:'corn', malus:22, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};\
raboty[15] = {rus_name:'РЎР±РѕСЂ С„Р°СЃРѕР»Рё', name:'beans', malus:22, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};\
raboty[16] = {rus_name:'РћС…СЂР°РЅР° С„РѕСЂС‚Р°', name:'fort_guard', malus:24, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};\
raboty[17] = {rus_name:'Р”СѓР±Р»РµРЅРёРµ РєРѕР¶Рё', name:'tanning', malus:39, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};\
raboty[18] = {rus_name:'РџРѕРёСЃРє Р·РѕР»РѕС‚Р°', name:'digging', malus:30, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17}}};\
raboty[19] = {rus_name:'Р—Р°С…РѕСЂРѕРЅРµРЅРёРµ', name:'grave', malus:75, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};\
raboty[20] = {rus_name:'РћС…РѕС‚Р° РЅР° РёРЅРґРµР№РєСѓ', name:'turkey', malus:42, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};\
raboty[21] = {rus_name:'РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ Р¶РµР»РµР·РЅРѕР№ РґРѕСЂРѕРіРё', name:'rail', malus:44, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};\
raboty[22] = {rus_name:'Р’С‹РїР°СЃ РєРѕСЂРѕРІ', name:'cow', malus:38, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};\
raboty[23] = {rus_name:'Р РµРјРѕРЅС‚ Р·Р°Р±РѕСЂР°', name:'fence', malus:35, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};\
raboty[24] = {rus_name:'Р›РµСЃРѕРїРёР»РєР°', name:'saw', malus:63, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};\
raboty[25] = {rus_name:'Р’С‹СЂР°Р±РѕС‚РєР° РєР°РјРЅСЏ', name:'stone', malus:52, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};\
raboty[26] = {rus_name:'РЎРїСЂСЏРјР»РµРЅРёРµ СЂСѓСЃР»Р°', name:'straighten', malus:84, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};\
raboty[27] = {rus_name:'Р›РµСЃРѕРїРѕРІР°Р»', name:'wood', malus:47, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};\
raboty[28] = {rus_name:'РћСЂРѕС€РµРЅРёРµ', name:'irrigation', malus:44, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};\
raboty[29] = {rus_name:'РљР»РµР№РјРµРЅРёРµ СЃРєРѕС‚Р°', name:'brand', malus:49, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};\
raboty[30] = {rus_name:'РћРіСЂР°Р¶РґРµРЅРёРµ РїР°СЃС‚Р±РёС‰Р°', name:'wire', malus:57, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};\
raboty[31] = {rus_name:'РџСЂРѕСЂС‹РІ РїР»РѕС‚РёРЅС‹', name:'dam', malus:53, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};\
raboty[32] = {rus_name:'Р”РѕР±С‹С‡Р° СЃР°РјРѕС†РІРµС‚РѕРІ', name:'gems', malus:74, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};\
raboty[33] = {rus_name:'Р Р°Р·РјРµС‚РєР° РїСЂРёРёСЃРєРѕРІ', name:'claim', malus:56, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};\
raboty[34] = {rus_name:'Р РµРјРѕРЅС‚ РїРѕРІРѕР·РѕРє', name:'chuck_wagon', malus:133, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};\
raboty[35] = {rus_name:'РћР±СЉРµР·Рґ Р»РѕС€Р°РґРµР№', name:'break_in', malus:71, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};\
raboty[36] = {rus_name:'РўРѕСЂРіРѕРІР»СЏ', name:'trade', malus:84, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};\
raboty[37] = {rus_name:'РџСЂРѕРєР»Р°РґРєР° С‚РµР»РµРіСЂР°С„РЅРѕР№ Р»РёРЅРёРё', name:'mast', malus:74, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};\
raboty[38] = {rus_name:'Р С‹С‚СЊС‘ РєРѕР»РѕРґС†Р°', name:'spring', malus:102, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};\
raboty[39] = {rus_name:'РћС…РѕС‚Р° РЅР° Р±РѕР±СЂР°', name:'beaver', malus:119, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};\
raboty[40] = {rus_name:'Р”РѕР±С‹С‡Р° СѓРіР»СЏ', name:'coal', malus:85, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};\
raboty[41] = {rus_name:'РўРёРїРѕРіСЂР°С„РёСЏ', name:'print', malus:82, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};\
raboty[42] = {rus_name:'Р С‹Р±РЅР°СЏ Р»РѕРІР»СЏ', name:'fishing', malus:90, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};\
raboty[43] = {rus_name:'РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РІРѕРєР·Р°Р»Р°', name:'trainstation', malus:112, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};\
raboty[44] = {rus_name:'РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РІРµС‚СЂСЏРЅРѕР№ РјРµР»СЊРЅРёС†С‹', name:'windmeel', malus:163, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};\
raboty[45] = {rus_name:'Р РµРєРѕРіРЅРѕСЃС†РёСЂРѕРІРєР°', name:'explore', malus:111, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};\
raboty[46] = {rus_name:'РЎРїР»Р°РІ Р»РµСЃР°', name:'float', malus:137, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};\
raboty[47] = {rus_name:'РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РјРѕСЃС‚Р°', name:'bridge', malus:107, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};\
raboty[48] = {rus_name:'РћС‚Р»РѕРІ Р»РѕС€Р°РґРµР№', name:'springe', malus:134, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};\
raboty[49] = {rus_name:'РР·РіРѕС‚РѕРІР»РµРЅРёРµ РіСЂРѕР±РѕРІ', name:'coffin', malus:118, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};\
raboty[50] = {rus_name:'Р”РѕСЃС‚Р°РІРєР° Р°РјСѓРЅРёС†РёРё', name:'dynamite', malus:144, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};\
raboty[51] = {rus_name:'РћС…РѕС‚Р° РЅР° РєРѕР№РѕС‚РѕРІ', name:'coyote', malus:140, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};\
raboty[52] = {rus_name:'РћС…РѕС‚Р° РЅР° Р±РёР·РѕРЅР°', name:'buffalo', malus:178, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};\
raboty[53] = {rus_name:'РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РѕСЃРѕР±РЅСЏРєР°', name:'fort', malus:224, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};\
raboty[54] = {rus_name:'РўРѕСЂРіРѕРІР»СЏ СЃ РёРЅРґРµР№С†Р°РјРё', name:'indians', malus:223, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};\
raboty[55] = {rus_name:'Р’С‹СЂСѓР±РєР° Р»РµСЃР°', name:'clearing', malus:178, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};\
raboty[56] = {rus_name:'Р”РѕР±С‹С‡Р° СЃРµСЂРµР±СЂР°', name:'silver', malus:193, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};\
raboty[57] = {rus_name:'РћС…СЂР°РЅР° РґРёР»РёР¶Р°РЅСЃР°', name:'diligence_guard', malus:403, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};\
raboty[58] = {rus_name:'РћС…РѕС‚Р° РЅР° РІРѕР»РєРѕРІ', name:'wolf', malus:207, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};\
raboty[59] = {rus_name:'РћС…СЂР°РЅР° РєР°СЂР°РІР°РЅР°', name:'track', malus:212, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};\
raboty[60] = {rus_name:'РљРѕРЅРѕРєСЂР°РґСЃС‚РІРѕ', name:'ox', malus:237, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};\
raboty[61] = {rus_name:'РћС…СЂР°РЅР° С‚СЋСЂСЊРјС‹', name:'guard', malus:221, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};\
raboty[62] = {rus_name:'РњРёСЃСЃРёРѕРЅРµСЂСЃС‚РІРѕ', name:'bible', malus:235, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:1}}};\
raboty[63] = {rus_name:'РџРѕРЅРё-СЌРєСЃРїСЂРµСЃСЃ', name:'ponyexpress', malus:225, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:45, vezenie:51, boom:44, produkty:{779:5}}};\
raboty[64] = {rus_name:'РўРѕСЂРіРѕРІР»СЏ РѕСЂСѓР¶РёРµРј СЃ РёРЅРґРµР№С†Р°РјРё', name:'weapons', malus:257, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{0:100}}};\
raboty[65] = {rus_name:'РњР°СЂРѕРґС‘СЂСЃС‚РІРѕ', name:'dead', malus:265, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{0:100}}};\
raboty[66] = {rus_name:'РћС…РѕС‚Р° РЅР° РіСЂРёР·Р»Рё', name:'grizzly', malus:280, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};\
raboty[67] = {rus_name:'Р”РѕР±С‹С‡Р° РЅРµС„С‚Рё', name:'oil', malus:294, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};\
raboty[68] = {rus_name:'РџРѕРёСЃРєРё РєР»Р°РґР°', name:'treasure_hunting', malus:293, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};\
raboty[69] = {rus_name:'РЎР»СѓР¶Р±Р° РІ Р°СЂРјРёРё', name:'army', malus:298, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};\
raboty[70] = {rus_name:'РњРµР»РєРѕРµ РІРѕСЂРѕРІСЃС‚РІРѕ', name:'steal', malus:371, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{0:100}}};\
raboty[71] = {rus_name:'РЎР»СѓР¶Р±Р° РЅР°С‘РјРЅРёРєРѕРј', name:'mercenary', malus:331, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:100}}};\
raboty[72] = {rus_name:'РџСЂРµСЃР»РµРґРѕРІР°РЅРёРµ Р±Р°РЅРґРёС‚РѕРІ', name:'bandits', malus:384, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{0:100}}};\
raboty[73] = {rus_name:'РќР°РїР°РґРµРЅРёРµ РЅР° РїРѕРІРѕР·РєСѓ', name:'aggression', malus:421, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{0:100}}};\
raboty[74] = {rus_name:'РќР°РїР°РґРµРЅРёРµ РЅР° РґРёР»РёР¶Р°РЅСЃ', name:'diligence_aggression', malus:475, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{0:100}}};\
raboty[75] = {rus_name:'РћС…РѕС‚Р° Р·Р° РїСЂРµСЃС‚СѓРїРЅРёРєР°РјРё', name:'bounty', malus:425, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{0:100}}};\
raboty[76] = {rus_name:'РџРµСЂРµРІРѕР·РєР° Р·Р°РєР»СЋС‡С‘РЅРЅС‹С…', name:'captured', malus:437, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:100}}};\
raboty[77] = {rus_name:'РќР°РїР°РґРµРЅРёРµ РЅР° РїРѕРµР·Рґ', name:'train', malus:505, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{0:100}}};\
raboty[78] = {rus_name:'РљСЂР°Р¶Р° СЃРѕ РІР·Р»РѕРјРѕРј', name:'burglary', malus:517, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{0:100}}};\
raboty[79] = {rus_name:'Р—РЅР°С…Р°СЂСЃС‚РІРѕ', name:'quackery', malus:315, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};\
raboty[80] = {rus_name:'РџР°СЂР»Р°РјРµРЅС‚С‘СЂСЃС‚РІРѕ', name:'peace', malus:366, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{0:100}}};\
raboty[82] = {rus_name:'Р РµС‡РЅС‹Рµ РїРµСЂРµРІРѕР·РєРё', name:'ship', malus:347, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};\
raboty[83] = {rus_name:'РљРѕРЅС‚СЂР°Р±Р°РЅРґР°', name:'smuggle', malus:410, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{0:100}}};\
raboty[84] = {rus_name:'РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ СЂР°РЅС‡Рѕ', name:'ranch', malus:220, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};\
raboty[85] = {rus_name:'Р”РѕР±С‹С‡Р° Р¶РµР»РµР·Р°', name:'iron', malus:176, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};\
raboty[86] = {rus_name:'РЎР±РѕСЂ Р°РіР°РІС‹', name:'agave', malus:152, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};\
raboty[87] = {rus_name:'РЎР±РѕСЂ РїРѕРјРёРґРѕСЂРѕРІ', name:'tomato', malus:42, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};\
raboty[88] = {rus_name:'РќР°Р±РёРІРєР° РїРѕРґРєРѕРІ', name:'horseshoe', malus:92, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{0:22}}};\
raboty[90] = {rus_name:'РўСѓС€РµРЅРёРµ РїРѕР¶Р°СЂР°', name:'fire', malus:228, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};\
raboty[91] = {rus_name:'РЎР±РѕСЂ Р°РїРµР»СЊСЃРёРЅРѕРІ', name:'orange', malus:66, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};\
raboty[92] = {rus_name:'Р§РёСЃС‚РєР° С…Р»РµРІР°', name:'muck_out', malus:7, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};\
raboty[93] = {rus_name:'Р§РёСЃС‚РєР° РѕР±СѓРІРё', name:'shoes', malus:0, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};\
\
raboty[101] = {rus_name:'РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РІ РіРѕСЂРѕРґРµ/С„РѕСЂС‚Рµ', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[105] = {rus_name:'Р¤РѕСЂС‚. РђС‚Р°РєР°', name:'attack', malus:0, navyki:{aim:1,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[106] = {rus_name:'Р¤РѕСЂС‚. РђС‚Р°РєР° (РјРµС‚. Рё СѓРІС‘СЂС‚. РїРѕ 0,5)', name:'attack', malus:0, navyki:{aim:0.5,dodge:0.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[107] = {rus_name:'Р¤РѕСЂС‚. Р—Р°С‰РёС‚Р°', name:'defend', malus:0, navyki:{aim:1,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[108] = {rus_name:'Р¤РѕСЂС‚. Р—Р°С‰РёС‚Р° (РјРµС‚. Рё СѓРІС‘СЂС‚. РїРѕ 0,5)', name:'defend', malus:0, navyki:{aim:0.5,dodge:0.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
\
\
raboty[111] = {rus_name:'РџРµСЂРµРґРІРёР¶РµРЅРёРµ', name:'moving', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[121] = {rus_name:'РЎС‚СЂРµР»РѕРє vs СЃС‚СЂРµР»РѕРє Р°С‚Р°РєР°', name:'sh_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[122] = {rus_name:'РЈРґР°СЂРЅРёРє vs СЃС‚СЂРµР»РѕРє Р°С‚Р°РєР°', name:'me_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[123] = {rus_name:'РЎС‚СЂРµР»РѕРє vs СЃС‚СЂРµР»РѕРє Р·Р°С‰РёС‚Р°', name:'sh_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[124] = {rus_name:'РЈРґР°СЂРЅРёРє vs СЃС‚СЂРµР»РѕРє Р·Р°С‰РёС‚Р°', name:'me_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[125] = {rus_name:'РЎС‚СЂРµР»РѕРє vs СѓРґР°СЂРЅРёРє Р°С‚Р°РєР°', name:'sh_vs_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[126] = {rus_name:'РЈРґР°СЂРЅРёРє vs СѓРґР°СЂРЅРёРє Р°С‚Р°РєР°', name:'me_vs_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[127] = {rus_name:'РЎС‚СЂРµР»РѕРє vs СѓРґР°СЂРЅРёРє Р·Р°С‰РёС‚Р°', name:'sh_vs_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[128] = {rus_name:'РЈРґР°СЂРЅРёРє vs СѓРґР°СЂРЅРёРє Р·Р°С‰РёС‚Р°', name:'me_vs_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[129] = {rus_name:'РЎС‚СЂРµР»РѕРє vs РІСЃРµ Р·Р°С‰РёС‚Р°', name:'sh_vs_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.5,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[130] = {rus_name:'РЈРґР°СЂРЅРёРє vs РІСЃРµ Р·Р°С‰РёС‚Р°', name:'me_vs_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.5,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[131] = {rus_name:'РЎС‚СЂРµР»РѕРє vs2 СЃС‚СЂРµР»РѕРє Р°С‚Р°РєР°', name:'sh_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[132] = {rus_name:'РЈРґР°СЂРЅРёРє vs2 СЃС‚СЂРµР»РѕРє Р°С‚Р°РєР°', name:'me_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[133] = {rus_name:'РЎС‚СЂРµР»РѕРє vs2 СЃС‚СЂРµР»РѕРє Р·Р°С‰РёС‚Р°', name:'sh_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[134] = {rus_name:'РЈРґР°СЂРЅРёРє vs2 СЃС‚СЂРµР»РѕРє Р·Р°С‰РёС‚Р°', name:'me_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[135] = {rus_name:'РЎС‚СЂРµР»РѕРє vs2 СѓРґР°СЂРЅРёРє Р°С‚Р°РєР°', name:'sh_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[136] = {rus_name:'РЈРґР°СЂРЅРёРє vs2 СѓРґР°СЂРЅРёРє Р°С‚Р°РєР°', name:'me_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[137] = {rus_name:'РЎС‚СЂРµР»РѕРє vs2 СѓРґР°СЂРЅРёРє Р·Р°С‰РёС‚Р°', name:'sh_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[138] = {rus_name:'РЈРґР°СЂРЅРёРє vs2 СѓРґР°СЂРЅРёРє Р·Р°С‰РёС‚Р°', name:'me_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[139] = {rus_name:'РЎС‚СЂРµР»РѕРє vs2 РІСЃРµ Р·Р°С‰РёС‚Р°', name:'sh_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.5,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[140] = {rus_name:'РЈРґР°СЂРЅРёРє vs2 РІСЃРµ Р·Р°С‰РёС‚Р°', name:'me_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.5,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
";



bi2_code += "\
komplekty={};\
\
komplekty.set_farmer=[];\
komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2].raboty[8]=10;komplekty.set_farmer[2].raboty[12]=10;komplekty.set_farmer[2].raboty[13]=10;\
komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[3].raboty[8]=10;komplekty.set_farmer[3].raboty[12]=10;komplekty.set_farmer[3].raboty[13]=10;\
komplekty.set_farmer[3].raboty[88]=20;komplekty.set_farmer[3].raboty[30]=20;komplekty.set_farmer[3].raboty[22]=20;\
komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[4].raboty[8]=10;komplekty.set_farmer[4].raboty[12]=10;komplekty.set_farmer[4].raboty[13]=10;\
komplekty.set_farmer[4].raboty[88]=20;komplekty.set_farmer[4].raboty[30]=20;komplekty.set_farmer[4].raboty[22]=20;\
komplekty.set_farmer[4].raboty[48]=40;komplekty.set_farmer[4].raboty[84]=40;komplekty.set_farmer[4].raboty[44]=40;\
komplekty.set_farmer[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_indian=[];\
komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:0.8696, raboty:[]};\
komplekty.set_indian[2].raboty[51]=30;\
komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:0.7692, raboty:[]};\
komplekty.set_indian[3].raboty[51]=30;komplekty.set_indian[3].raboty[52]=40;\
komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:0.6944, raboty:[]};\
komplekty.set_indian[4].raboty[51]=30;komplekty.set_indian[4].raboty[52]=40;komplekty.set_indian[4].raboty[58]=50;\
komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:0.625, raboty:[]};\
komplekty.set_indian[5].raboty[51]=30;komplekty.set_indian[5].raboty[52]=40;komplekty.set_indian[5].raboty[58]=50;;komplekty.set_indian[5].raboty[66]=60;\
komplekty.set_indian[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_mexican=[];\
komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:0.8929, raboty:[]};\
komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:0.8065, raboty:[]};\
komplekty.set_mexican[3].raboty[86]=60;\
komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:0.7353, raboty:[]};\
komplekty.set_mexican[4].raboty[86]=60;komplekty.set_mexican[4].raboty[67]=70;\
komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:0.6757, raboty:[]};\
komplekty.set_mexican[5].raboty[86]=60;komplekty.set_mexican[5].raboty[67]=70;komplekty.set_mexican[5].raboty[83]=80;\
komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:0.625, raboty:[]};\
komplekty.set_mexican[6].raboty[86]=60;komplekty.set_mexican[6].raboty[67]=70;komplekty.set_mexican[6].raboty[83]=80;komplekty.set_mexican[6].raboty[50]=90;\
\
komplekty.set_quackery=[];\
komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, speed:null, raboty:[]};\
komplekty.set_quackery[2].raboty[79]=30;\
komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, speed:null, raboty:[]};\
komplekty.set_quackery[3].raboty[79]=60;\
komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, speed:null, raboty:[]};\
komplekty.set_quackery[4].raboty[79]=90;\
komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, speed:null, raboty:[]};\
komplekty.set_quackery[5].raboty[79]=120;\
komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, speed:null, raboty:[]};\
komplekty.set_quackery[6].raboty[79]=120;\
\
komplekty.set_pilgrim_male=[];\
komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2].raboty[101]=5;\
komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[3].raboty[101]=15;\
komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[4].raboty[101]=30;\
komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[5].raboty[101]=50;komplekty.set_pilgrim_male[5].raboty[62]=150;\
komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_pilgrim_female=[];\
komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2].raboty[101]=5;\
komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[3].raboty[101]=15;\
komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[4].raboty[101]=30;\
komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[5].raboty[101]=50;komplekty.set_pilgrim_female[5].raboty[62]=150;\
komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_gentleman=[];\
komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_gentleman[2].raboty[i]=5};komplekty.set_gentleman[2].raboty[101]=5;\
komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_gentleman[3].raboty[i]=15};komplekty.set_gentleman[3].raboty[101]=15;\
komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_gentleman[4].raboty[i]=30};komplekty.set_gentleman[4].raboty[101]=30;\
komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_gentleman[5].raboty[i]=50};komplekty.set_gentleman[5].raboty[101]=50;\
komplekty.set_gentleman[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_dancer=[];\
komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_dancer[2].raboty[i]=10};komplekty.set_dancer[2].raboty[101]=10;\
komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_dancer[3].raboty[i]=25};komplekty.set_dancer[3].raboty[101]=25;\
komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:10}}, speed:null, raboty:[]};\
for (i=1;i<94;++i) {komplekty.set_dancer[4].raboty[i]=45};komplekty.set_dancer[4].raboty[101]=45;\
komplekty.set_dancer[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
";



bi2_code += "\
bi2_vse_navyki=['build' ,'punch' ,'tough' ,'endurance' ,'health' ,'ride' ,'reflex' ,'dodge' ,'hide' ,'swim' ,'aim' ,'shot' ,'pitfall' ,'finger_dexterity' ,'repair' ,'leadership' ,'tactic' ,'trade' ,'animal' ,'appearance'];\
bi2_vse_kharakteristiki=['strength', 'flexibility', 'dexterity', 'dexterity'];\
";
unsafeWindow.assign_citem = function (tid, obj){
	unsafeWindow.items[tid] = {item_id:tid, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};
    for (zz = unsafeWindow.bi2_vse_navyki.length-1;zz >=0;--zz){
        ss = unsafeWindow.bi2_vse_navyki[zz];
	    if (obj.bonus.skills[ss])
	        unsafeWindow.items[tid].bonus.skills[ss]=obj.bonus.skills[ss];
	}
    for (zz = unsafeWindow.bi2_vse_kharakteristiki.length-1;zz >=0;--zz){
        aa = unsafeWindow.bi2_vse_kharakteristiki[zz];
        if (obj.bonus.attributes[aa])
	        unsafeWindow.items[tid].bonus.attributes[aa]=obj.bonus.attributes[aa];
	}
	if (obj.set){
	    unsafeWindow.items[tid].set.key = obj.set.key;
	    unsafeWindow.items[tid].set.name = obj.set.name;
	}
}

unsafeWindow.compare_citem = function (tid, item){
	soft = true;
	hard = true;
	if (unsafeWindow.items[tid].item_id!=item.item_id) return;
	if (unsafeWindow.items[tid].nshort!=item.short){hard=false;unsafeWindow.items[tid].nshort=item.short};
	if (unsafeWindow.items[tid].name!=item.name){soft=false;unsafeWindow.items[tid].name=item.name};
	if (unsafeWindow.items[tid].type!=item.type){hard=false;unsafeWindow.items[tid].type=item.type}
	if (unsafeWindow.items[tid].level!=item.level){hard=false;unsafeWindow.items[tid].level=item.level}
	if (unsafeWindow.items[tid].price!=item.price){hard=false;unsafeWindow.items[tid].price=item.price}
	if (unsafeWindow.items[tid].image!=item.image){hard=false;unsafeWindow.items[tid].image=item.image}
	if (unsafeWindow.items[tid].image_mini!=item.image_mini){hard=false;unsafeWindow.items[tid].image_mini=item.image_mini}
	if (unsafeWindow.items[tid].characterClass!=item.characterClass){hard=false;unsafeWindow.items[tid].characterClass=item.characterClass}
	if (unsafeWindow.items[tid].characterSex!=item.characterSex){hard=false;unsafeWindow.items[tid].characterSex=item.characterSex}
	if (unsafeWindow.items[tid].speed!=item.speed){hard=false;unsafeWindow.items[tid].speed=item.speed}
    
    for (zz = unsafeWindow.bi2_vse_navyki.length-1;zz >=0;--zz){
        num_index = unsafeWindow.bi2_vse_navyki[zz];
        if (item.bonus.skills[num_index]&&unsafeWindow.items[tid].bonus.skills[num_index]){
            if (item.bonus.skills[num_index]!=unsafeWindow.items[tid].bonus.skills[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.skills[num_index]||unsafeWindow.items[tid].bonus.skills[num_index]){
            hard=false;
            break;
        }
    }    
    for (zz = unsafeWindow.bi2_vse_kharakteristiki.length-1;zz >=0;--zz){
        num_index = unsafeWindow.bi2_vse_kharakteristiki[zz];
        if (item.bonus.attributes[num_index]&&unsafeWindow.items[tid].bonus.attributes[num_index]){
            if (item.bonus.attributes[num_index]!=unsafeWindow.items[tid].bonus.attributes[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.attributes[num_index]||unsafeWindow.items[tid].bonus.attributes[num_index]){
            hard=false;
            break;
        }
    }    
    
	if (!item.set){
	    if (unsafeWindow.items[tid].set.key){ hard=false;}
	}
	else{
	    if (item.set.key!=unsafeWindow.items[tid].set.key){
	        hard=false;
	    }
	    if (item.set.name!=unsafeWindow.items[tid].set.name){
	        soft=false;
	    }
	}
	res={h:hard,s:soft};
	return res;
}

unsafeWindow.print_citem = function (tid){
	result='';
	result += 'unsafeWindow.items[' + unsafeWindow.items[tid].item_id + '] = {item_id:' + unsafeWindow.items[tid].item_id + ', nshort:\'' + unsafeWindow.items[tid].nshort;
	result += '\', name:\'' + unsafeWindow.items[tid].name + '\', type:\'' + unsafeWindow.items[tid].type + '\', level:' + unsafeWindow.items[tid].level;
	result += ', price:' + unsafeWindow.items[tid].price + ', image:\'' + unsafeWindow.items[tid].image + '\', image_mini:\'' + unsafeWindow.items[tid].image_mini + '\', characterClass:';
	cc = unsafeWindow.items[tid].characterClass ? '\'' + unsafeWindow.items[tid].characterClass + '\'' : null;
	result += cc + ', characterSex:';
	cs = unsafeWindow.items[tid].characterSex ? '\'' + unsafeWindow.items[tid].characterSex + '\'' : null;
	result += cs + ', speed:' + unsafeWindow.items[tid].speed;
	if (unsafeWindow.items[tid].bonus) {
		result += ', bonus:{skills:';
		ww = false;
		for (zz = unsafeWindow.bi2_vse_navyki.length-1; zz >=0; --zz ){
		    if (unsafeWindow.items[tid].bonus.skills[unsafeWindow.bi2_vse_navyki[zz]]) {
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += unsafeWindow.bi2_vse_navyki[zz] + ':' + unsafeWindow.items[tid].bonus.skills[unsafeWindow.bi2_vse_navyki[zz]];
			}
		}
		if (ww){
   			result += '}, '
		}
		else {
			result += '{}, ';
		}
		result += 'attributes:';
		ww = false;
		for (zz = unsafeWindow.bi2_vse_kharakteristiki.length-1; zz >=0; --zz ){
		    if (unsafeWindow.items[tid].bonus.attributes[unsafeWindow.bi2_vse_kharakteristiki[zz]]){
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += unsafeWindow.bi2_vse_kharakteristiki[zz] + ':' + unsafeWindow.items[tid].bonus.attributes[unsafeWindow.bi2_vse_kharakteristiki[zz]];
			}
		}
		if (ww){
		    result += '}'
		}
		else {
			result += '{}';
		}
		result += '}, ';
	}
	else {
		result += '{skills:{}, attributes:{}}, '
	}
	if (unsafeWindow.items[tid].set.key) {
		result += 'set:{key:\'' + unsafeWindow.items[tid].set.key + '\', name:\'' + unsafeWindow.items[tid].set.name + '\'}'
	}
	else {
		result += 'set:{key:null, name:null}'
	}
	result += ', shop:\''+unsafeWindow.items[tid].shop+'\'};';
	return result;
}

bi2_code += "\
komp_rab = {};\
komp_zas = {};\
komp_skor = {};\
komp_fort = {};\
for (i=0;i < nabory.length;++i){\
	komp_rab[nabory[i]] = [];\
	komp_zas[nabory[i]] = [];\
	komp_skor[nabory[i]]= [];\
	komp_fort[nabory[i]]= [];\
};\
\
vyborka={};\
vyborka_z={};\
vyborka_r={};\
for (ii = bi2_types.length; ii >= 0; --ii) {\
	vyborka[bi2_types[ii]] = {};\
	vyborka[bi2_types[ii]].simple = {};\
	vyborka[bi2_types[ii]].simple.spisok = [];\
	vyborka_z[bi2_types[ii]] = {};\
	vyborka_z[bi2_types[ii]].simple = {};\
	vyborka_z[bi2_types[ii]].simple.spisok = [];\
	vyborka_r[bi2_types[ii]] = {};\
	vyborka_r[bi2_types[ii]].simple = {};\
	vyborka_r[bi2_types[ii]].simple.spisok = [];\
};\
\
resultaty=[];\
resultaty_z=[];\
resultaty_r=[];\
zaschita=null;\
ezda = false;\
rabnavyki=[];\
rabnavyki_z=[];\
rabnavyki_r=[];\
\
bi2_htmlrab=[];\
bi2_sortrab=[];\
bi2_hiderab=[];\
bi2_bezto=0;\
\
bi2_predmetov = {};\
bi2_khochuka = [];\
bi2_uchet=[];\
bi2_aktiv=[];\
porabotaj=[];\
bi2_slots={};\
for (i=0;i<bi2_types.length;++i){\
	bi2_slots[bi2_types[i]]=true;\
};\
irabota=0;\
samoe_ono={};\
deneg_ushlo = 0;\
bablo = 0;\
\
i_slot_max=[];\
i_slot=[];\
\
ic_obj = [];\
ic_objr = [];\
ic_objr = [];\
ii_rekur=0;\
rekurs_delay = 100;\
rekurs_step = 0;\
rekurs_time = 25000;\
rekurs_up = true;\
bi2_to=0;\
bi2_zas=0;\
bi2_ride=0; \
pers={};\
bi2_speed=1.0;\
ezda=false;\
bi2_onesk_rabot = false;\
";



unsafeWindow.bi2_iimport = function(){
	bagazh=unsafeWindow.Bag.getInstance();
	odezhda=unsafeWindow.Wear.wear;
	for(vv in bagazh.items){
    	unsafeWindow.bi2_inv_imported=true;
		cobj = bagazh.items[vv].obj;
		tid = cobj.item_id;
		if (!unsafeWindow.bi2_uchet[tid]){
		    unsafeWindow.bi2_uchet[tid]=true;
	    	if (unsafeWindow.items[tid]){
				var cres={h:null,s:null};
				cres=unsafeWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					unsafeWindow.einfo+='Р§Р°СЃС‚СЊ РґР°РЅРЅС‹С… Рѕ РїСЂРµРґРјРµС‚Рµ РЅРµРІРµСЂРЅР°:\n';
					unsafeWindow.assign_citem(tid, cobj);
					unsafeWindow.einfo+=unsafeWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					unsafeWindow.winfo+='РќРµРїСЂР°РІРёР»СЊРЅРѕРµ РЅР°Р·РІР°РЅРёРµ Сѓ РїСЂРµРґРјРµС‚Р°:\n';
					unsafeWindow.assign_citem(tid, cobj);
					unsafeWindow.winfo+=unsafeWindow.print_citem(tid)+'\n';
				}
			}
			else{
				unsafeWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Р—Р°РіР»СѓС€РєР°', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				unsafeWindow.assign_citem(tid, cobj);
				unsafeWindow.einfo+='РћС‚СЃСѓС‚СЃС‚РІСѓРµС‚ РѕРїРёСЃР°РЅРёРµ РїСЂРµРґРјРµС‚Р°:\n';
				unsafeWindow.einfo+=unsafeWindow.print_citem(tid)+'\n';
			}
		}
    }
    for(vv in unsafeWindow.Wear.wear){
		if (!unsafeWindow.Wear.wear[vv])
			continue;
		cobj = unsafeWindow.Wear.wear[vv].obj;
		tid = cobj.item_id;
		if (!unsafeWindow.bi2_uchet[tid]){
		    unsafeWindow.bi2_uchet[tid]=true;
	    	if (unsafeWindow.items[tid]){
				var cres={h:null,s:null};
				cres=unsafeWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					unsafeWindow.einfo+='Р§Р°СЃС‚СЊ РґР°РЅРЅС‹С… Сѓ РїСЂРµРґРјРµРЅС‚Р° РЅРµРІРµСЂРЅР°:\n';
					unsafeWindow.assign_citem(tid, cobj);
					unsafeWindow.einfo+=unsafeWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					unsafeWindow.winfo+='РќРµРїСЂР°РІРёР»СЊРЅРѕРµ РЅР°Р·РІР°РЅРёРµ Сѓ РїСЂРµРґРјРµС‚Р°:\n';
					unsafeWindow.assign_citem(tid, cobj);
					unsafeWindow.winfo+=unsafeWindow.print_citem(tid)+'\n';
				}
			}
			else{
				unsafeWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Р—Р°РіР»СѓС€РєР°', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				unsafeWindow.assign_citem(tid, cobj);
				unsafeWindow.einfo+='РћС‚СЃСѓС‚СЃС‚РІСѓРµС‚ РѕРїРёСЃР°РЅРёРµ РїСЂРµРґРјРµС‚Р°:\n';
				unsafeWindow.einfo+=unsafeWindow.print_citem(tid)+'\n';
			}
		}
    }
}

unsafeWindow.bi2_mimport = function(){
	magaz=unsafeWindow.TraderInventory.getInstance('bi2',0);
	if (!magaz) return;
	for(vv in magaz.items){
		cobj = magaz.items[vv].obj;
		tid = cobj.item_id;
		if (!unsafeWindow.bi2_khochuka[tid]){
		    if (!unsafeWindow.bi2_uchet[tid]){
		        unsafeWindow.bi2_khochuka[tid]=true;
		    }
	    	if (unsafeWindow.items[tid]){
				var cres={h:null,s:null};
				cres=unsafeWindow.compare_citem(tid, cobj);
			 if(!cres.s){
					unsafeWindow.winfo+='РќРµРїСЂР°РІРёР»СЊРЅРѕРµ РЅР°Р·РІР°РЅРёРµ Сѓ РїСЂРµРґРјРµС‚Р°:\n';
					unsafeWindow.assign_citem(tid, cobj);
					unsafeWindow.winfo+=unsafeWindow.print_citem(tid)+'\n';
				}
			}
			else{
				unsafeWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Р—Р°РіР»СѓС€РєР°', type:'yield', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				unsafeWindow.assign_citem(tid, cobj);
				unsafeWindow.einfo+='РћС‚СЃСѓС‚СЃС‚РІСѓРµС‚ РѕРїРёСЃР°РЅРёРµ РїСЂРµРґРјРµС‚Р°:\n';
				unsafeWindow.einfo+=unsafeWindow.print_citem(tid)+'\n';
			}
		}
    }
}


unsafeWindow.bi2_podschet = function  (vse_veschi, iz_magazinov, plus_level, pers){
	unsafeWindow.bi2_aktiv=null;
	unsafeWindow.bi2_aktiv=[];
	for (vv in unsafeWindow.items){
		vesch=unsafeWindow.items[vv];
		check=true;
		if (vesch.characterSex&&(vesch.characterSex!=pers.characterSex)) check=false;
		if (vesch.characterClass&&(vesch.characterClass!=pers.characterClass)) check=false;
		if (!unsafeWindow.bi2_uchet[vesch.item_id]&&!unsafeWindow.bi2_khochuka[vesch.item_id])
		{
			if (!vse_veschi){
				if (!iz_magazinov)
					check=false;
				else{
					if(vesch.shop!='shop')
						check=false;
				}
			}
			if ((vesch.shop=='shop')&&(vesch.price > unsafeWindow.bablo)) check=false;
		}
		lit = pers.level+ plus_level+parseInt(pers.itemLevelRequirementDecrease[vesch.type],10)+pers.itemLevelRequirementDecrease.all;
		if (vesch.level > lit) check=false;
		if (!unsafeWindow.bi2_slots[vesch.type]) check=false;
		if (check) unsafeWindow.bi2_aktiv.push(vesch.item_id);
	}
}

unsafeWindow.bi2_ocenka_khlama = function(){
    unsafeWindow.bi2_nenuzhnoe=[];
    if (!unsafeWindow.bi2_khlam)
        return;
    ispolz=[];
    for (irab=200; irab>0;irab--){
        if (unsafeWindow.raboty[irab]){
            if (unsafeWindow.resultaty[irab]){
                for (ee = 0; ee < unsafeWindow.bi2_types.length; ++ee){
                    sid = unsafeWindow.resultaty[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (unsafeWindow.resultaty_z[irab]){
                for (ee = 0; ee < unsafeWindow.bi2_types.length; ++ee){
                    sid = unsafeWindow.resultaty_z[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (unsafeWindow.resultaty_r[irab]){
                for (ee = 0; ee < unsafeWindow.bi2_types.length; ++ee){
                    sid = unsafeWindow.resultaty_r[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
        }
    }
    
    for (tid in unsafeWindow.bi2_uchet){
        if ((tid < 600)&&(tid >=200)&&(!ispolz[tid])){
            unsafeWindow.bi2_nenuzhnoe[tid]=true;
        }
    }
}

unsafeWindow.bi2_res2html = function (){
    count_rab=0;
    unsafeWindow.bi2_htmlrab=[];
    while (count_rab < 255){
        if (!(unsafeWindow.porabotaj[count_rab]&&unsafeWindow.resultaty[count_rab])){
            ++count_rab;
            continue;
        }
        ihtm = '';
        ihtm += '<tr>';
        rabota = unsafeWindow.raboty[count_rab];
        ihtm += '<td rowspan=\"6\">';
        ihtm += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 120)&&(count_rab <= 140)){
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if (count_rab == 111){
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<img style=\"float:left;\" src=\"images/fingerboard/fingerboard.png\"';
            ihtm += ' alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        }
        else{
            ihtm += '<tr><td><a href=\"javascript:bi2_show_shmot('+ count_rab +');\" >';
            ihtm += '<img style=\"float:left;\" src=\"';
            if (count_rab<=101){
                ihtm += 'images/jobs/';
            }
            else if (count_rab<111){
                ihtm += 'images/fort/battle/button_';
            }
            ihtm +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };
        rres = rabota.resultaty;
        for (ri in rres.produkty){
            ihtm+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            ihtm+='title=\"'+unsafeWindow.items[ri].name+'\" alt=\"'+unsafeWindow.items[ri].name+'\" ';
            ihtm+='src=\"'+unsafeWindow.items[ri].image_mini+'\" /></div><div class=\"jy_bi2\">'+rres.produkty[ri]+'%</div>';
            ihtm+='</div>';
        }
        ihtm += '</td></tr>';
        ihtm += '<tr><td>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/dollar.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        ihtm += '<span>Р—Р°СЂР°Р±РѕС‚РѕРє:'+rres.dengi+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/experience.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        ihtm += '<span>РћРїС‹С‚:'+rres.opyt+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/luck.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        ihtm += '<span>РЈРґР°С‡Р°:'+rres.vezenie+'</span></td></tr></table></a>';
        ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img src=\"images/job/danger.png\" /></td>';
        ihtm += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        ihtm += '<span>РћРїР°СЃРЅРѕСЃС‚СЊ:'+rres.boom+'</span></td></tr></table></a>';
        ihtm += '</td></tr></tbody></table>';

        ihtm += '</td><td>';

        if (count_rab!=111){
            ihtm += '<span title=\"РћС‡РєРё РѕС‚ РЅР°РІС‹РєРѕРІ\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += (unsafeWindow.resultaty[count_rab].to+unsafeWindow.raboty[count_rab].malus-unsafeWindow.resultaty[count_rab].ton)+'</span></span>';
            ihtm += '<span title=\"РћС‡РєРё РѕС‚ РєРѕРјРїР»РµРєС‚РѕРІ\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+unsafeWindow.resultaty[count_rab].ton+'</span></span>';
		    ihtm += '<span title=\"РЎР»РѕР¶РЅРѕСЃС‚СЊ СЂР°Р±РѕС‚С‹\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		ihtm += '<span class="skill_box_value" style="text-align:center;">'+unsafeWindow.raboty[count_rab].malus+'</span></span>';
	    	ihtm += '<span title=\"РўРћ\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    ihtm += '<span class="skill_box_value" style="text-align:center; color:';
    		ihtm += (unsafeWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
	    	ihtm += '">'+unsafeWindow.resultaty[count_rab].to+'</span></span>';
	    }
	    else{
            ihtm += '<span title=\"РЎРєРѕСЂРѕСЃС‚СЊ РѕС‚ РєРѕРјРїР»РµРєС‚РѕРІ\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	ihtm += '<span class="skill_box_value green_text" style="text-align:center;">С…'+unsafeWindow.resultaty[count_rab].ton+'</span></span>';
	    	ihtm += '<span title=\"РЎРєРѕСЂРѕСЃС‚СЊ\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    ihtm += '<span class="skill_box_value" style="text-align:center; ">'+unsafeWindow.resultaty[count_rab].to+'%</span></span>';
	    }
        ihtm += '</td><td>';
            

        brbr = 0;
        ihtm += '<table><tbody><tr>';
        for (jj in unsafeWindow.rabnavyki[count_rab]){
            for (aa = unsafeWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                ihtm += '<td><a class=\"tt3\" href=\"#\" ><span>'+unsafeWindow.pers.skill_titles[jj]+':'+unsafeWindow.rabnavyki[count_rab][jj].znach+'</span>';
                ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+unsafeWindow.bi2_s2a[jj];
                ihtm += '.png) repeat scroll '+unsafeWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                ihtm += unsafeWindow.rabnavyki[count_rab][jj].znach+'</div>';
                ihtm += '</a></td>';
            }
        }
        ihtm += '</tr></tbody></table>';
        ihtm += '</td></tr><tr><td colspan=\"2\">';
        
        for (ee = 0; ee < unsafeWindow.bi2_types.length; ++ee){
            sid = unsafeWindow.resultaty[count_rab].items[ee].tid;
            if (sid){
                ihtm+='<div style=\"display:inline; float:left;\">';
                vesch = unsafeWindow.items[sid];
                ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+unsafeWindow.resultaty[count_rab].items[ee].bon;
                if (vesch.set.key){
                    ihtm += '<br /><em>'+vesch.set.name+'</em>';
                }
                for (ind in vesch.bonus.attributes){
                    ihtm += unsafeWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    ihtm += unsafeWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
                }
                ihtm += '</span>'
                ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+unsafeWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                ihtm+='</a>'
                if (unsafeWindow.resultaty[count_rab].items[ee].price > 0){
                    ihtm+='<br />';
                    ihtm +='<span style=\"text-align:center;\">'+unsafeWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</span>';
                }
                ihtm +='</div>';
            }
        }
        ihtm += '</td></tr>';
        
        if (unsafeWindow.resultaty_z[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+РЅР°РІС‹РєРё\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += unsafeWindow.resultaty_z[count_rab].zas+'</span></span>';
    		ihtm += '<span title=\"РўРћ\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (unsafeWindow.resultaty_z[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+unsafeWindow.resultaty_z[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in unsafeWindow.rabnavyki_z[count_rab]){
                for (aa = unsafeWindow.rabnavyki_z[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+unsafeWindow.pers.skill_titles[jj]+':'+unsafeWindow.rabnavyki_z[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+unsafeWindow.bi2_s2a[jj];
                    ihtm += '.png) repeat scroll '+unsafeWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += unsafeWindow.rabnavyki_z[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';
            for (ee = 0; ee < unsafeWindow.bi2_types.length; ++ee){
                sid = unsafeWindow.resultaty_z[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
                    vesch = unsafeWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+unsafeWindow.resultaty_z[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += unsafeWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += unsafeWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+unsafeWindow.resultaty_z[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (unsafeWindow.resultaty_z[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+unsafeWindow.resultaty_z[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
        
        if (unsafeWindow.resultaty_r[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+РЅР°РІС‹РєРё\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += unsafeWindow.resultaty_r[count_rab].speed+'%</span></span>';
    		ihtm += '<span title=\"РўРћ\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (unsafeWindow.resultaty_r[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+unsafeWindow.resultaty_r[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in unsafeWindow.rabnavyki_r[count_rab]){
                for (aa = unsafeWindow.rabnavyki_r[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+unsafeWindow.pers.skill_titles[jj]+':'+unsafeWindow.rabnavyki_r[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; background: transparent url(/images/skill/skills_'+unsafeWindow.bi2_s2a[jj];
                    ihtm += '.png) repeat scroll '+unsafeWindow.bi2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += unsafeWindow.rabnavyki_r[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';
            for (ee = 0; ee < unsafeWindow.bi2_types.length; ++ee){
                sid = unsafeWindow.resultaty_r[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
                    vesch = unsafeWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+unsafeWindow.resultaty_r[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += unsafeWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += unsafeWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+unsafeWindow.resultaty_r[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (unsafeWindow.resultaty_r[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+unsafeWindow.resultaty_r[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }

        
        unsafeWindow.bi2_htmlrab[count_rab]=ihtm;
        ++count_rab;
    }
}

unsafeWindow.bi2_sortir = function (tip, minto){
    ind_arr = 0;
    unsafeWindow.bi2_sortrab = [];
    for (irab in unsafeWindow.bi2_htmlrab){
        if (unsafeWindow.bi2_vse_raboty&&(unsafeWindow.resultaty[irab].to <= -minto))
            continue;
        unsafeWindow.bi2_sortrab[ind_arr] = {};
        unsafeWindow.bi2_sortrab[ind_arr].index = irab;
        switch (tip){
        case 'd0':
            unsafeWindow.bi2_sortrab[ind_arr].ves = -unsafeWindow.raboty[irab].resultaty.dengi;
            break;
        case 'o0':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.raboty[irab].resultaty.opyt;
            break;
        case 'v0':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'boom':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.raboty[irab].resultaty.boom;
            break;
        case 'name':
            unsafeWindow.bi2_sortrab[ind_arr].ves= (irab > 100) ? 'СЏ ' : '';
            unsafeWindow.bi2_sortrab[ind_arr].ves += unsafeWindow.raboty[irab].rus_name;
            break;
        case 'malus':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.raboty[irab].malus;
            break;
        case 'to':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.resultaty[irab].to;
            break;
        case 'do':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.raboty[irab].resultaty.dengi - unsafeWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dv':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.raboty[irab].resultaty.dengi - unsafeWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'ov':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.raboty[irab].resultaty.vezenie - unsafeWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dov':
            unsafeWindow.bi2_sortrab[ind_arr].ves = 0-unsafeWindow.raboty[irab].resultaty.dengi - unsafeWindow.raboty[irab].resultaty.opyt - unsafeWindow.raboty[irab].resultaty.vezenie;
            break;
        default:
            unsafeWindow.bi2_sortrab[ind_arr].ves = irab;
        }
        ++ind_arr;
    }
    unsafeWindow.qsort(unsafeWindow.bi2_sortrab,0,ind_arr);
    unsafeWindow.bi2_reporter2();
}

//unsafeWindow.bi2_setbezto = function(checked){
    //unsafeWindow.bi2_bezto = !checked;
//}

unsafeWindow.bi2_reporter2 = function(){
    grgr = '';
    unsafeWindow.bi2_process=false;
    new unsafeWindow.HumanMessage('РќР°С‡РёРЅР°РµРј РІС‹РІРѕРґ РґР°РЅРЅС‹С…', {type: 'success'});



    grsort = '<table><tbody><tr>';
    grsort += '</td><strong>РЎРїРѕСЃРѕР± СЃРѕСЂС‚РёСЂРѕРІРєРё: </strong></td>';
    grsort += '<td style=\"width:10px; \" />';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'name\', bi2_bezto);\">РќР°Р·РІР°РЅРёРµ</a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'malus\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/task_points/minus.png\" title=\"РЎР»РѕР¶РЅРѕСЃС‚СЊ СЂР°Р±РѕС‚С‹\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'to\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/task_points/equal.png\" title=\"РљРѕР»РёС‡РµСЃС‚РІРѕ РўРћ\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'d0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" title=\"Р—Р°СЂР°Р±РѕС‚РѕРє\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'o0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/experience.png\" title=\"РћРїС‹С‚\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'v0\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\" title=\"РЈРґР°С‡Р°\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a href=\"javascript:bi2_sortir(\'boom\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/danger.png\" title=\"РћРїР°СЃРЅРѕСЃС‚СЊ\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a title=\"Р—Р°СЂР°Р±РѕС‚РѕРє Рё РѕРїС‹С‚\" href=\"javascript:bi2_sortir(\'do\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a title=\"Р—Р°СЂР°Р±РѕС‚РѕРє Рё СѓРґР°С‡Р°\" href=\"javascript:bi2_sortir(\'dv\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a title=\"РћРїС‹С‚ Рё СѓРґР°С‡Р°\" href=\"javascript:bi2_sortir(\'ov\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/experience.png\" /><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><a title=\"Р—Р°СЂР°Р±РѕС‚РѕРє, РѕРїС‹С‚ Рё СѓРґР°С‡Р°\" href=\"javascript:bi2_sortir(\'dov\', bi2_bezto);\"><img style=\"width:23px; height:23px;\" src=\"images/job/dollar.png\" /><img style=\"width:23px; height:23px; margin-left:-5px;\" src=\"images/job/experience.png\" /><img style=\"width:23px; height:23px;\" src=\"images/job/luck.png\"" /></a></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
    grsort += '<td><span title=\"Р”РµР№СЃС‚РІСѓС‚ РїСЂРё СЃР»РµРґСѓСЋС‰РµРј РІС‹Р±РѕСЂРµ СЃРѕСЂС‚РёСЂРѕРІРєРё! Р—РґРµСЃСЊ СѓРєР°Р·С‹РІР°РµС‚СЃСЏ С‚Рѕ РЅРµРґРѕСЃС‚Р°СЋС‰РµРµ (Р»РёР±Рѕ РёР·Р±С‹С‚РѕС‡РЅРѕРµ) РєРѕР»РёС‡РµСЃС‚РІРѕ РўРћ, РїСЂРё РєРѕС‚РѕСЂРѕРј СЂР°Р±РѕС‚С‹ РІСЃС‘ РµС‰С‘ Р±СѓРґСѓС‚ РїРѕРєР°Р·С‹РІР°С‚СЊСЃСЏ (С‚Р°Рє Р·РЅР°С‡РµРЅРёРµ 15 РІРєР»СЋС‡РёС‚ РІ СЃРїРёСЃРѕРє РѕС‚РѕР±СЂР°Р¶Р°РµРјС‹С…, РІСЃРµ СЂР°Р±РѕС‚С‹ СЃ РўРћ Р±РѕР»СЊС€Рµ С‡РµРј -15; Р·РЅР°С‡РµРЅРёРµ -10 СѓР±РµСЂС‘С‚ РёР· СЃРїРёСЃРєР° РІСЃРµ СЂР°Р±РѕС‚С‹ СЃ РўРћ РѕС‚ 10 Рё РЅРёР¶Рµ.)\"><input type=\"text\" size=\"4\" value=\"'+unsafeWindow.bi2_bezto+'\" ';
    grsort += 'onchange=\"javascript:bi2_bezto=parseInt(value, 10);\">&laquo;РќРµС…РІР°С‚РєР°&raquo; РўРћ</span></td>';
    grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';

    grsort += '</tr></tbody></table>';
    grgr += grsort;

    if (unsafeWindow.bi2_khochuka.length > 0){
        chislo_rabot = 0;
        chislo_rabot_to = 0;
        khoroshi = [];
        khoroshi_to = [];
        for (kh in unsafeWindow.bi2_khochuka){
            khoroshi[kh] = 0;
            khoroshi_to[kh] = 0;
        }
        for (rr in unsafeWindow.porabotaj){
            if(unsafeWindow.resultaty[rr]){
                ++chislo_rabot;
                if (unsafeWindow.resultaty[rr].to > 0) ++chislo_rabot_to;
                for (ii = unsafeWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in unsafeWindow.bi2_khochuka){
                        if (unsafeWindow.resultaty[rr].items[ii].tid == kh){
                            khoroshi[kh] += 1;
                            if (unsafeWindow.resultaty[rr].to > 0) khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(unsafeWindow.resultaty_z[rr]){
                ++chislo_rabot;
                ++chislo_rabot_to;
                for (ii = unsafeWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in unsafeWindow.bi2_khochuka){
                        if (unsafeWindow.resultaty_z[rr].items[ii].tid == kh){
                            khoroshi[kh] += 1;
                            khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(unsafeWindow.resultaty_r[rr]){
                ++chislo_rabot;
                ++chislo_rabot_to;
                for (ii = unsafeWindow.bi2_types.length-1; ii >= 0; --ii){
                    for (kh in unsafeWindow.bi2_khochuka){
                        if (unsafeWindow.resultaty_r[rr].items[ii].tid == kh){
                            khoroshi[kh] += 1;
                            khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
        }
        grgr += '<a href=\"javascript:bi2_hideraboty(0);\">Р’РµСЂРЅСѓС‚СЊ РІСЃРµ СЂР°Р±РѕС‚С‹</a><br />';
        for (kh in unsafeWindow.bi2_khochuka){
            grgr += '<table><tr><td>';
            grgr+='<div style=\"display:inline; float:left;\">';
            vesch = unsafeWindow.items[kh];
            grgr+='<a class=\"tt2\" href=\"javascript:bi2_hideraboty('+kh+');\" ><span><b>'+vesch.name+':</b>';
            if (vesch.set.key){
                grgr += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                grgr += unsafeWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += unsafeWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a>'
            grgr +='</div>';
            rere = ((kh < 400) || (kh >= 500)) ? '&raquo; РїСЂРёРјРµРЅСЏРµС‚СЃСЏ ' : '&raquo; РїСЂРёРјРµРЅСЏСЋС‚СЃСЏ ';
            grgr +='Р’СЃРµРіРѕ РґРѕСЃС‚СѓРїРЅС‹С…  СЂР°Р±РѕС‚:' + chislo_rabot_to + '; &laquo;'+vesch.name+rere+ khoroshi_to[kh] +' СЂР°Р·.<br />';
            grgr +='Р’СЃРµРіРѕ СЂР°Р±РѕС‚:' + chislo_rabot + '; &laquo;'+vesch.name+rere+ khoroshi[kh] +' СЂР°Р·.';
            grgr += '</td></tr></table>';
        }
        grgr += '<hr>';
    }

    grgr +='<table>';
    for (ii = 0; ii < unsafeWindow.bi2_sortrab.length; ++ii){
        if (!unsafeWindow.bi2_hiderab[unsafeWindow.bi2_sortrab[ii].index]){
            if (ii>0) grgr+='<tr><td colspan=\"3\"><hr></td></tr>';
            grgr += unsafeWindow.bi2_htmlrab[unsafeWindow.bi2_sortrab[ii].index];
        }
    }
    grgr += '</table>';

    if (unsafeWindow.bi2_khlam){
        grgr+='<hr><table><tbody><tr><th colspan=\"8\" style=\"text-align:center;\">РџСЂРµРґРїРѕР»РѕР¶РёРј, С‡С‚Рѕ СЌС‚Рё РІРµС‰Рё РјРѕР¶РЅРѕ СЃРјРµР»Рѕ РїСЂРѕРґР°С‚СЊ РІ РјР°РіР°Р·РёРЅР°С…</th></tr><tr>';
        babosy=0;
        tdcount=0;
        for (tid in unsafeWindow.bi2_nenuzhnoe){
            grgr+='<td>';
            vesch = unsafeWindow.items[tid];
            grgr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+'</b>';
            for (ind in vesch.bonus.attributes){
                grgr += unsafeWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += unsafeWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" style="margin-right:30px;"><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a></td>';
            if (++tdcount==8){
                grgr+='</tr><tr>';
                tdcount=0;
            }
            babosy += vesch.price;
        }
        grgr+='</tr><tr><th colspan=\"8\" style=\"text-align:center;\">';
        grgr +='РњРёРЅРёРјСѓРј РґРµРЅРµРі СЃ РїСЂРѕРґР°Р¶Рё: '+babosy / 2+'$';
        grgr+='</th></tr></tbody></table>';
    }
    document.getElementById('bi2_window_content').innerHTML=grgr;
    unsafeWindow.bi2_process=false;
}


unsafeWindow.bi2_reporter = function () {
//    new unsafeWindow.HumanMessage('РќР°С‡РёРЅР°РµРј РІС‹РІРѕРґ РїРѕР»СѓС‡РµРЅРЅС‹С… РґР°РЅРЅС‹С…', {type: 'success'});
    grgr='';
    unsafeWindow.bi2_ocenka_khlama();
    count_rab=0;
    unsafeWindow.bi2_show_window();
    unsafeWindow.bi2_res2html();
    
    unsafeWindow.bi2_process=false;
    unsafeWindow.bi2_sortir('name', unsafeWindow.bi2_bezto);
}


bi2_code += "\
bi2_s2a =\
{build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',\
ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',\
aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity',\
leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};\
";

bi2_code += "\
bi2_s2px =\
{build:0, punch:220, tough:165, endurance:110, health:55,\
ride:0, reflex:220, dodge:165, hide:110, swim:55,\
aim:0, shot:220, pitfall:165, finger_dexterity:110, repair:55,\
leadership:0, tactic:220, trade:165, animal:110, appearance:55};\
";

bi2_code += "\
bi2_s2f_bonus = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1;\
    if (value < 10) return 2;\
    if (value < 23) return 3;\
    if (value < 43) return 4;\
    if (value < 71) return 5;\
    if (value < 108) return 6;\
    if (value < 155) return 7;\
    if (value < 211) return 8;\
    return 9;\
};\
";

unsafeWindow.bi2_hideraboty = function(tid){
    unsafeWindow.bi2_hiderab=[];
    vtype = unsafeWindow.items[tid].type;
    kk = 0;
    for (; vtype != unsafeWindow.bi2_types[kk]; ++kk) {};
    for (irab in unsafeWindow.porabotaj){
        nea = true;
        if (unsafeWindow.resultaty[irab]&&(unsafeWindow.resultaty[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (unsafeWindow.resultaty_z[irab]&&(unsafeWindow.resultaty_z[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (unsafeWindow.resultaty_r[irab]&&(unsafeWindow.resultaty_r[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (nea){
            unsafeWindow.bi2_hiderab[irab]=true;
        }
    }
    unsafeWindow.bi2_reporter2();
}


unsafeWindow.bi2_s_print = function(nav, val){
    
    result='<div>'+unsafeWindow.pers.skill_titles[nav]+':'+val+'</div>';
    return result;
}
unsafeWindow.bi2_a_print = function(kha, val){

    result = '<div style=\"font-weight:bold;\" >'+unsafeWindow.pers.attribute_titles[kha]+':'+val+'</div>';
    return result;
}

bi2_code += "\
qsort = function (ar, li, ri){\
	if ((li+1)>=ri) return;\
	var tmp;\
	if (ri-li<10){\
		for (ii=li;ii<ri-1;++ii)\
			for (jj=ii+1;jj<ri;++jj)\
				if(ar[ii].ves>ar[jj].ves){\
					tmp=ar[ii];\
					ar[ii]=ar[jj];\
					ar[jj]=tmp;\
				}\
	}\
	else{\
		mi=parseInt((li+ri)/2,10);\
		if (ar[li].ves>ar[ri-1].ves){\
			tmp=ar[li];\
			ar[li]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		if (ar[li].ves>ar[mi].ves){\
			tmp=ar[li];\
			ar[li]=ar[mi];\
			ar[mi]=tmp;\
		}\
		if (ar[mi].ves>ar[ri-1].ves){\
			tmp=ar[mi];\
			ar[mi]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		em=ar[mi].ves;\
		cl=li;\
		cr=ri-1;\
		while(cl<cr){\
			while((cl<ri)&&(ar[cl].ves<=em)) ++cl;\
			while((cr>li)&&(ar[cr].ves>=em)) --cr;\
			if (cl<cr){\
				tmp=ar[cl];\
				ar[cl]=ar[cr];\
				ar[cr]=tmp;\
			}\
		}\
		if (cr < ri -1)\
		    qsort(ar,li,cr+1);\
		qsort(ar,cl,ri);\
	}\
};\
";


bi2_code += "\
summa_ochkov = function (bonus, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(bonus.skills[num_index]){\
			och+=bonus.skills[num_index]*nuzhnye_navyki[num_index];\
		}\
		if(bonus.attributes[bi2_s2a[num_index]]){\
			och+=bonus.attributes[bi2_s2a[num_index]]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

bi2_code += "\
summa_ochkov2 = function (skills, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(skills[num_index]){\
			och+=skills[num_index]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

bi2_code += "\
summa_ochkov3 = function (bonus, ind_navyk){\
	och=0;\
	if(bonus.skills[ind_navyk]){\
		och+=bonus.skills[ind_navyk];\
	}\
	if(bonus.attributes[bi2_s2a[ind_navyk]]){\
		och+=bonus.attributes[bi2_s2a[ind_navyk]];\
	}\
	return och;\
};\
";

bi2_code += "\
bi2_vybzap_f = function () {\
	for (irabota in porabotaj) {\
		if ((irabota <= 102)||(irabota > 110))\
		    continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[bi2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[bi2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[bi2_types[ii]].simple.spisok[jj]=null;\
			vyborka[bi2_types[ii]].simple.n = 1;\
			vyborka[bi2_types[ii]].simple.spisok[0] = {price:0, tid:0, navyki:{}, health:0};\
			for (oo in rabota.navyki){\
			    vyborka[bi2_types[ii]].simple.spisok[0].navyki[oo] = 0;\
			}\
		}\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = 0;\
			cnavyki = {};\
			for (oo in rabota.navyki){\
			    cnavyki[oo] = summa_ochkov3(vesch.bonus, oo);\
			    ochki += cnavyki[oo];\
			}\
			chealth = summa_ochkov3(vesch.bonus, 'health');\
			ochki += chealth;\
			tsena = (bi2_uchet[cid]|| bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={navyki:{}, price:tsena, tid:cid, health:chealth};\
    			for (oo in rabota.navyki){\
	    		    vyborka[ctype][vesch.set.key].navyki[oo] = cnavyki[oo];\
			    }\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	for (oo in rabota.navyki){\
    			    	if (vyborka[ctype].simple.spisok[kk].navyki[oo] < cnavyki[oo]) {ib++}\
	    			    else {if (vyborka[ctype].simple.spisok[kk].navyki[oo] > cnavyki[oo]) {im++}};\
			    	}\
			    	if (vyborka[ctype].simple.spisok[kk].health < chealth) {ib++}\
    			    else {if (vyborka[ctype].simple.spisok[kk].health > chealth) {im++}};\
    			    \
				    if (!bi2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].health = chealth;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka[ctype].simple.spisok[nn].navyki={};\
		    		for (oo in rabota.navyki){\
		    		    vyborka[ctype].simple.spisok[nn].navyki[oo] = cnavyki[oo];\
		    		}\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].health = vyborka[ctype].simple.spisok[kk+1].health;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
				            	vyborka[ctype].simple.spisok[kk].navyki={};\
            		    		for (oo in rabota.navyki){\
		                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = vyborka[ctype].simple.spisok[kk+1].navyki[oo];\
		                		}\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].health = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
           		    		for (oo in rabota.navyki){\
	                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = null;\
	                		}\
	    		    	    vyborka[ctype].simple.spisok[kk].navyki = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[bi2_types[ii]][nabory[jj]]){\
					dvazhdy = -1;\
					sid = vyborka[bi2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[bi2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[bi2_types[ii]].simple.n;\
						vyborka[bi2_types[ii]].simple.spisok[nn] = {};\
						vyborka[bi2_types[ii]].simple.spisok[nn].health = vyborka[bi2_types[ii]][nabory[jj]].health;\
						vyborka[bi2_types[ii]].simple.spisok[nn].price = vyborka[bi2_types[ii]][nabory[jj]].price;\
						vyborka[bi2_types[ii]].simple.spisok[nn].tid = vyborka[bi2_types[ii]][nabory[jj]].tid;\
						vyborka[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[bi2_types[ii]].simple.spisok[nn].navyki = {};\
       		    		for (oo in rabota.navyki){\
                		    vyborka[bi2_types[ii]].simple.spisok[nn].navyki[oo] = vyborka[bi2_types[ii]][nabory[jj]].navyki[oo];\
                 		}\
						vyborka[bi2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
        for (ii=bi2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[bi2_types[ii]].simple.n;\
        }\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii)\
			bi2_predmetov[nabory[ii]] = 0;\
   		bi2_tonavyki = {};\
   		for (oo in rabota.navyki){\
    	    bi2_tonavyki[oo] = pers.skills[oo];\
		}\
		bi2_tohealth = pers.skills.health;\
		samoe_ono.to = 0;\
		samoe_ono.price=-1;\
		samoe_ono.health = 0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 6; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				komp_fort[nabory[ii]][jj] = {};\
				komp_fort[nabory[ii]][jj].navyki={};\
				for (oo in rabota.navyki){\
				    komp_fort[nabory[ii]][jj].navyki[oo] = summa_ochkov3(t_nab.bonus, oo);\
				}\
				komp_fort[nabory[ii]][jj].health = summa_ochkov3(t_nab.bonus, 'health');\
			}\
		}\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(bi2_rekurs_f, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false)\
			porabotaj[irabota] = true;\
	}\
    bi2_reporter();\
};\
";



bi2_code += "\
bi2_rekurs_f = function (){\
    if (rekurs_time>15000) rekurs_time=10000;\
    nn = bi2_types.length;\
    rabota=raboty[irabota];\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 20000;\
            ++rekurs_step;\
           	new HumanMessage('РџРµСЂРµР±РѕСЂ РІРµС‰РµР№ РїСЂРѕРґРѕР»Р¶Р°РµС‚СЃСЏ, С€Р°Рі в„–'+rekurs_step, {type: 'success'});\
            window.setTimeout(bi2_rekurs_f, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            bi2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                bi2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[bi2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			bi2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
 		    bi2_tohealth += ic_obj[ii].health;\
       		for (oo in rabota.navyki){\
	            bi2_tonavyki[oo] += ic_obj[ii].navyki[oo];\
	        }\
		    if (++ii == nn){\
    			ton = {};\
    			ton.navyki={};\
    			ton.health=0;\
    			for (oo in rabota.navyki){\
    			    ton.navyki[oo]=0;\
    			}\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\
			    		ton.health += komp_fort[nabory[inabor]][bi2_predmetov[nabory[inabor]]].health;\
			    		for (oo in rabota.navyki){\
			    		    ton.navyki[oo] += komp_fort[nabory[inabor]][bi2_predmetov[nabory[inabor]]].navyki[oo];\
			    		}\
				    }\
    			\
    			bi2_tohealth += ton.health;\
    			for (oo in rabota.navyki){\
    			    bi2_tonavyki[oo] += ton.navyki[oo]\
    			}\
    			cto = 0;\
    			for (oo in rabota.navyki){\
    			    cto += bi2_s2f_bonus(bi2_tonavyki[oo])*rabota.navyki[oo];\
    			}\
	    		if ((samoe_ono.to < cto)||((samoe_ono.to == cto)&&(samoe_ono.health<bi2_tohealth))) {\
		    		samoe_ono.to = cto;\
				    samoe_ono.price=deneg_ushlo;\
				    samoe_ono.health = bi2_tohealth;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\
				    }\
    			}\
    			bi2_tohealth -= ton.health;\
    			for (oo in rabota.navyki){\
    			    bi2_tonavyki[oo] -= ton.navyki[oo]\
    			}\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            bi2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                bi2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
		resultaty[irabota] = {};\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = 0;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
		for (i = 0; i < bi2_types.length; ++i) {\
			vvv = vyborka[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
            rabnavyki[irabota]={};\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = bi2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
            }\
            temp_n = {};\
            temp_n.health=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            temp_u = {};\
            for (ee = bi2_types.length-1;ee>=0;--ee){\
                sid = resultaty[irabota].items[ee].tid;\
                if (sid > 0){\
                    val+=summa_ochkov(items[sid].bonus,temp_n);\
                    temp_k = items[sid].set.key;\
                    if (temp_k){\
                        if (temp_u[temp_k])\
                            temp_u[temp_k]+=1;\
                        else\
                            temp_u[temp_k]=1;\
                    }\
                }\
            } \
            for (uu = nabory.length - 1; uu>=0; --uu){\
                if (temp_u[nabory[uu]]>1){\
                    bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                    val+=summa_ochkov(bn,temp_n);\
                }\
            }\
            rabnavyki[irabota].health={};\
            rabnavyki[irabota].health.name=pers.skill_titles.health;\
            rabnavyki[irabota].health.znach = val;\
            rabnavyki[irabota].health.mul = 1;\
	}\
	else{\
		resultaty[irabota] = null;\
	}\
    bi2_vybzap_f();\
};\
";


bi2_code += "\
bi2_vybzap = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>102)&&(irabota<120))\
		    continue;\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[bi2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[bi2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[bi2_types[ii]].simple.spisok[jj]=null;\
			vyborka[bi2_types[ii]].simple.n = 1;\
			vyborka[bi2_types[ii]].simple.spisok[0] = {bon:0, price:0, tid:0};\
		}\
		\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={bon:ochki, price:tsena, tid:cid};\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka[ctype].simple.spisok[kk].bon > ochki) {im++}}\
				    if (!bi2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if ((im==0)&&(ib==0)){\
						v2=items[vyborka[ctype].simple.spisok[kk].tid];\
						def2=summa_ochkov(v2.bonus, all_def.navyki);\
						def1=summa_ochkov(vesch.bonus, all_def.navyki);\
						if (def1>def2) ++ib;\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].bon = vyborka[ctype].simple.spisok[kk+1].bon;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].bon = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[bi2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka[bi2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[bi2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[bi2_types[ii]].simple.n;\
						vyborka[bi2_types[ii]].simple.spisok[nn] = {};\
						vyborka[bi2_types[ii]].simple.spisok[nn].bon = vyborka[bi2_types[ii]][nabory[jj]].bon;\
						vyborka[bi2_types[ii]].simple.spisok[nn].price = vyborka[bi2_types[ii]][nabory[jj]].price;\
						vyborka[bi2_types[ii]].simple.spisok[nn].tid = vyborka[bi2_types[ii]][nabory[jj]].tid;\
						vyborka[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[bi2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			bi2_predmetov[nabory[ii]] = 0;\
		bi2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus;\
		samoe_ono.to= bi2_to;\
		samoe_ono.price=-1;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 6; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
			}\
		}\
        for (ii=bi2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[bi2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(bi2_rekurs, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    bi2_vybzap_z();\
};\
";


bi2_code += "\
bi2_vybzap_z = function () {\
	for (irabota in porabotaj) {\
	    if (!zaschita)  continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota>102)&&(irabota<120))\
		    continue;\
		if (!resultaty[irabota]){\
		    resultaty_z[irabota]=null;\
		    continue;\
		}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_z[bi2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_z[bi2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_z[bi2_types[ii]].simple.spisok[jj]=null;\
			vyborka_z[bi2_types[ii]].simple.n = 1;\
			vyborka_z[bi2_types[ii]].simple.spisok[0] = {bon:0, zas:0, price:0, tid:0};\
		}\
		if (resultaty[irabota].to >= zaschita.to){\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			zas = summa_ochkov(vesch.bonus, zaschita.navyki);\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_z[ctype][vesch.set.key]={bon:ochki, zas:zas, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(zas > 0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_z[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_z[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_z[ctype].simple.spisok[kk].zas < zas) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].zas > zas) {im++}}\
				    if (!bi2_millioner){\
				        if (vyborka_z[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_z[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_z[ctype].simple.n;\
					vyborka_z[ctype].simple.spisok[nn] = {};\
    				vyborka_z[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_z[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_z[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_z[ctype].simple.spisok[nn].zas = zas;\
					vyborka_z[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_z[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_z[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_z[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_z[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_z[ctype].simple.spisok[kk].bon = vyborka_z[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_z[ctype].simple.spisok[kk].price = vyborka_z[ctype].simple.spisok[kk+1].price;\
				            	vyborka_z[ctype].simple.spisok[kk].tid = vyborka_z[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_z[ctype].simple.spisok[kk].zas = vyborka_z[ctype].simple.spisok[kk+1].zas;\
	        			    }\
			        		kk = vyborka_z[ctype].simple.n - 1;\
        					vyborka_z[ctype].simple.spisok[kk].bon = null;\
                			vyborka_z[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].zas = null;\
	        		    	vyborka_z[ctype].simple.spisok[kk] = null;\
			        	    vyborka_z[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_z[bi2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_z[bi2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_z[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_z[bi2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_z[bi2_types[ii]].simple.n;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn] = {};\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].bon = vyborka_z[bi2_types[ii]][nabory[jj]].bon;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].price = vyborka_z[bi2_types[ii]][nabory[jj]].price;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].tid = vyborka_z[bi2_types[ii]][nabory[jj]].tid;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].zas = vyborka_z[bi2_types[ii]][nabory[jj]].zas;\
						vyborka_z[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_z[bi2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_z[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			bi2_predmetov[nabory[ii]] = 0;\
		bi2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus - zaschita.to;\
		bi2_zas=0;\
		samoe_ono.to= bi2_to;\
		samoe_ono.price=-1;\
		samoe_ono.zas=bi2_zas;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 6; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				zan = summa_ochkov(t_nab.bonus, zaschita.navyki);\
				komp_zas[nabory[ii]][jj] = zan;\
			}\
		}\
        for (ii=bi2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_z[bi2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(bi2_rekurs_z, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    bi2_vybzap_r();\
};\
";

bi2_code += "\
bi2_vybzap_r = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		if (((irabota>102)||(!ezda))&&(irabota!=111))\
		    continue;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota!=111)&&(!resultaty[irabota])){\
		    resultaty_r[irabota]=null;\
		    continue;\
		}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_r[bi2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_r[bi2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_r[bi2_types[ii]].simple.spisok[jj]=null;\
			vyborka_r[bi2_types[ii]].simple.n = 1;\
			vyborka_r[bi2_types[ii]].simple.spisok[0] = {bon:0, ride:0, speed:1.0, price:0, tid:0};\
		}\
		if ((irabota==111)||(resultaty[irabota].to > 0)){\
		for (i = bi2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = bi2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			ride = summa_ochkov3(vesch.bonus, 'ride');\
			speed = (vesch.speed)?vesch.speed:1.0;\
			tsena = (bi2_uchet[cid] || bi2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_r[ctype][vesch.set.key]={bon:ochki, ride:ride, speed:speed, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(ride > 0)||(speed<1.0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_r[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_r[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_r[ctype].simple.spisok[kk].ride < ride) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].ride > ride) {im++}}\
			        if (vyborka_r[ctype].simple.spisok[kk].speed > speed) {ib++}\
			        else {if (vyborka_r[ctype].simple.spisok[kk].speed < speed) {im++}}\
				    if (!bi2_millioner){\
				        if (vyborka_r[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_r[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_r[ctype].simple.n;\
					vyborka_r[ctype].simple.spisok[nn] = {};\
    				vyborka_r[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_r[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_r[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_r[ctype].simple.spisok[nn].ride = ride;\
		    		vyborka_r[ctype].simple.spisok[nn].speed = speed;\
					vyborka_r[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_r[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_r[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_r[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_r[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_r[ctype].simple.spisok[kk].bon = vyborka_r[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_r[ctype].simple.spisok[kk].price = vyborka_r[ctype].simple.spisok[kk+1].price;\
				            	vyborka_r[ctype].simple.spisok[kk].tid = vyborka_r[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_r[ctype].simple.spisok[kk].ride = vyborka_r[ctype].simple.spisok[kk+1].ride;\
				            	vyborka_r[ctype].simple.spisok[kk].speed = vyborka_r[ctype].simple.spisok[kk+1].speed;\
	        			    }\
			        		kk = vyborka_r[ctype].simple.n - 1;\
        					vyborka_r[ctype].simple.spisok[kk].bon = null;\
                			vyborka_r[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].ride = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].speed = null;\
	        		    	vyborka_r[ctype].simple.spisok[kk] = null;\
			        	    vyborka_r[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = bi2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_r[bi2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_r[bi2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_r[bi2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_r[bi2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_r[bi2_types[ii]].simple.n;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn] = {};\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].bon = vyborka_r[bi2_types[ii]][nabory[jj]].bon;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].price = vyborka_r[bi2_types[ii]][nabory[jj]].price;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].tid = vyborka_r[bi2_types[ii]][nabory[jj]].tid;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].ride = vyborka_r[bi2_types[ii]][nabory[jj]].ride;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].speed = vyborka_r[bi2_types[ii]][nabory[jj]].speed;\
						vyborka_r[bi2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_r[bi2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_r[bi2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			bi2_predmetov[nabory[ii]] = 0;\
		bi2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus;\
		bi2_ride=0;\
		bi2_speed=1.0;\
		samoe_ono.to= bi2_to;\
		samoe_ono.price=-1;\
		samoe_ono.ride=bi2_ride;\
		samoe_ono.speed=100.0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 6; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				komp_skor[nabory[ii]][jj] = {};\
				komp_skor[nabory[ii]][jj].ride = summa_ochkov3(t_nab.bonus, 'ride');\
				komp_skor[nabory[ii]][jj].speed = t_nab.speed?t_nab.speed:1.0;\
				\
			}\
		}\
        for (ii=bi2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_r[bi2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(bi2_rekurs_r, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    bi2_vybzap_f();\
};\
";



bi2_code += "\
bi2_rekurs = function (){\
    nn = bi2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('РџРµСЂРµР±РѕСЂ РІРµС‰РµР№ РїСЂРѕРґРѕР»Р¶Р°РµС‚СЃСЏ, С€Р°Рі в„–'+rekurs_step, {type: 'success'});\
            window.setTimeout(bi2_rekurs, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
                bi2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[bi2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			bi2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
		    bi2_to += ic_obj[ii].bon;\
		    if (++ii == nn){\
    			ton = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]]\
				    }\
    			bi2_to += ton;\
	    		if (samoe_ono.to < bi2_to) {\
		    		samoe_ono.to = bi2_to;\
			    	samoe_ono.ton = ton;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    bi2_to -= ton;\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
                bi2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	bi2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
		resultaty[irabota] = {};\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = samoe_ono.ton;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
		for (i = 0; i < bi2_types.length; ++i) {\
			vvv = vyborka[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = vvv.bon;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
            rabnavyki[irabota]={};\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = bi2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
            }\
	}\
	else{\
		resultaty[irabota] = null;\
	}\
    bi2_vybzap();\
};\
";


bi2_code += "\
bi2_rekurs_z = function (){\
    nn = bi2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('РџРµСЂРµР±РѕСЂ РІРµС‰РµР№ РїСЂРѕРґРѕР»Р¶Р°РµС‚СЃСЏ, С€Р°Рі в„–'+rekurs_step, {type: 'success'});\
            window.setTimeout(bi2_rekurs_z, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                bi2_to -= ic_objr[ii].bon;\
                bi2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_z[bi2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			bi2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    bi2_to += ic_objr[ii].bon;\
		    bi2_zas += ic_objr[ii].zas;\
		    if (++ii == nn){\
    			ton = 0;\
    			zan = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\
			    		zan += komp_zas[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\
				    }\
    			bi2_to += ton;\
    			bi2_zas += zan;\
	    		if ((samoe_ono.zas < bi2_zas)&&(bi2_to >= 0)) {\
		    		samoe_ono.to = bi2_to;\
			    	samoe_ono.ton = ton;\
                    samoe_ono.zas = bi2_zas;\
                    samoe_ono.zan = zan;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    bi2_to -= ton;\
			    bi2_zas -= zan;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                bi2_to -= ic_objr[ii].bon;\
                bi2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
		resultaty_z[irabota] = {};\
		resultaty_z[irabota].to = samoe_ono.to+zaschita.to;\
		resultaty_z[irabota].ton = samoe_ono.ton;\
		resultaty_z[irabota].price = samoe_ono.price;\
		resultaty_z[irabota].zas = samoe_ono.zas;\
		resultaty_z[irabota].zan = samoe_ono.zan;\
		resultaty_z[irabota].items = [];\
		for (i = 0; i < bi2_types.length; ++i) {\
			vvv = vyborka_z[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
			resultaty_z[irabota].items[i] = {};\
			resultaty_z[irabota].items[i].tid = vvv.tid;\
			resultaty_z[irabota].items[i].bon = vvv.bon;\
			resultaty_z[irabota].items[i].price = vvv.price;\
			resultaty_z[irabota].items[i].zas = vvv.zas;\
		}\
            rabnavyki_z[irabota]={};\
            for (num_index in zaschita.navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = bi2_types.length-1;ee>=0;--ee){\
                    sid = resultaty_z[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki_z[irabota][num_index]={};\
                rabnavyki_z[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki_z[irabota][num_index].znach = val;\
                rabnavyki_z[irabota][num_index].mul = zaschita.navyki[num_index];\
            }\
	}\
	else{\
		resultaty_z[irabota] = null;\
	}\
    bi2_vybzap_z();\
};\
";

bi2_code += "\
bi2_rekurs_r = function (){\
    nn = bi2_types.length;\
    rr = 6;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('РџРµСЂРµР±РѕСЂ РІРµС‰РµР№ РїСЂРѕРґРѕР»Р¶Р°РµС‚СЃСЏ, С€Р°Рі в„–'+rekurs_step, {type: 'success'});\
            window.setTimeout(bi2_rekurs_r, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                bi2_to -= ic_objr[ii].bon;\
                bi2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_r[bi2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			bi2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    bi2_to += ic_objr[ii].bon;\
		    bi2_ride += ic_objr[ii].ride;\
		    if (++ii == nn){\
    			ton = 0;\
    			rin = 0;\
    			speen = 1.0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (bi2_predmetov[nabory[inabor]] > 1) {\
			    		ton += komp_rab[nabory[inabor]][bi2_predmetov[nabory[inabor]]];\
			    		rin += komp_skor[nabory[inabor]][bi2_predmetov[nabory[inabor]]].ride;\
			    		speen *= komp_skor[nabory[inabor]][bi2_predmetov[nabory[inabor]]].speed;\
				    }\
    			bi2_to += ton;\
    			bi2_ride += rin;\
    			bi2_speed = 100;\
    			if (ic_objr[rr].speed < 1.0){\
    			    bi2_speed = 100.0 / ic_objr[rr].speed + bi2_ride;\
    			}\
    			bi2_speed /= speen;\
    			bi2_speed /= pers.default_speed;\
	    		if ((samoe_ono.speed < bi2_speed)&&(bi2_to > 0)) {\
		    		samoe_ono.to = bi2_to;\
			    	samoe_ono.ton = speen;\
                    samoe_ono.ride = bi2_ride;\
                    samoe_ono.speed = bi2_speed;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[bi2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    bi2_to -= ton;\
			    bi2_ride -= rin;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                bi2_to -= ic_objr[ii].bon;\
                bi2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	bi2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
        if (irabota==111){\
    		resultaty[irabota] = {};\
	    	resultaty[irabota].to = Math.round(samoe_ono.speed);\
		    resultaty[irabota].ton = (1.0/samoe_ono.ton).toFixed(2);\
		    resultaty[irabota].price = samoe_ono.price;\
		    resultaty[irabota].items = [];\
    		for (i = 0; i < bi2_types.length; ++i) {\
	    		vvv = vyborka_r[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
		    	resultaty[irabota].items[i] = {};\
			    resultaty[irabota].items[i].tid = vvv.tid;\
    			resultaty[irabota].items[i].bon = vvv.ride;\
	    		resultaty[irabota].items[i].price = vvv.price;\
		    }\
            rabnavyki[irabota]={};\
            rabnavyki[irabota].ride={};\
            rabnavyki[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki[irabota].ride.mul = 1.0;\
            resultaty_r[irabota] = null;\
            rabnavyki_r[irabota] = null;\
        }\
        else{\
		    resultaty_r[irabota] = {};\
		    resultaty_r[irabota].to = samoe_ono.to;\
		    resultaty_r[irabota].ton = samoe_ono.ton;\
		    resultaty_r[irabota].price = samoe_ono.price;\
		    resultaty_r[irabota].ride = samoe_ono.ride;\
		    resultaty_r[irabota].speed = samoe_ono.speed;\
		    resultaty_r[irabota].items = [];\
		    for (i = 0; i < bi2_types.length; ++i) {\
			    vvv = vyborka_r[bi2_types[i]].simple.spisok[samoe_ono[bi2_types[i]]];\
			    resultaty_r[irabota].items[i] = {};\
			    resultaty_r[irabota].items[i].tid = vvv.tid;\
			    resultaty_r[irabota].items[i].bon = vvv.bon;\
			    resultaty_r[irabota].items[i].price = vvv.price;\
			    resultaty_r[irabota].items[i].ride = vvv.ride;\
			    resultaty_r[irabota].items[i].speed = vvv.speed;\
		    }\
            rabnavyki_r[irabota]={};\
            rabnavyki_r[irabota].ride={};\
            rabnavyki_r[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki_r[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki_r[irabota].ride.mul = 1.0;\
		}\
	}\
	else{\
		resultaty_r[irabota] = null;\
	}\
    bi2_vybzap_r();\
};\
";
	

unsafeWindow.bi2_minimize_title = function(){
	if (unsafeWindow.bi2_title_flag2 == 1) {
    	unsafeWindow.bi2_title_flag2 = 0;
		document.getElementById('bi2_title_content_row').style.display = 'none';
		document.getElementById('bi2_title_cap').style.display = 'none';
		document.getElementById('bi2_form0').style.width = '100px';
	}
	else {
		unsafeWindow.bi2_title_flag2 = 1;
		document.getElementById('bi2_title_content_row').style.display = 'table-row';
		document.getElementById('bi2_title_cap').style.display = 'inline';
		document.getElementById('bi2_form0').style.width = unsafeWindow.bi2_w0+'px';
	}
}

unsafeWindow.bi2_stretch_title = function(){
    var nv;
    if (unsafeWindow.bi2_title_flag == 1) {
        unsafeWindow.bi2_title_flag = 0;
        nv = unsafeWindow.bi2_title_h_mid + 'px';
    }
    else {
        unsafeWindow.bi2_title_flag = 1
        nv = unsafeWindow.bi2_title_h_max + 'px';
    }
    document.getElementById('bi2_title_content').style.height = nv;
}


unsafeWindow.bi2_close_title = function(){
	document.getElementById('bi2_title').style.display='none';
}

unsafeWindow.bi2_close_shmot = function(){
    rm = document.getElementById('bi2_shmot');
    document.body.removeChild(rm);
}

unsafeWindow.bi2_vselect = function (chk){
	if (chk) {
		document.getElementById('bi2_vselect').innerHTML=unsafeWindow.bi2_mulselect+unsafeWindow.bi2_conselect;
		
	}
	else{
		document.getElementById('bi2_vselect').innerHTML=unsafeWindow.bi2_simselect+unsafeWindow.bi2_conselect;
	
	}
}

unsafeWindow.bi2_minimize_window = function(){
	if (unsafeWindow.bi2_window_flag2 == 1) {
		unsafeWindow.bi2_window_flag2 = 0;
		document.getElementById('bi2_window_content_row').style.display = 'none';
		document.getElementById('bi2_window_cap').style.display = 'none'
		document.getElementById('bi2_win1').style.width = '100px';
	}
	else {
		unsafeWindow.bi2_window_flag2 = 1;
		document.getElementById('bi2_win1').style.width = unsafeWindow.bi2_w1+'px';
		document.getElementById('bi2_window_content_row').style.display = 'table-row';
		document.getElementById('bi2_window_cap').style.display = 'inline';
	}
}

unsafeWindow.bi2_close_window = function(){
	document.getElementById('bi2_window').style.display='none';
}

unsafeWindow.bi2_error_window = function(err){
	document.getElementById('bi2_window_content').style.height = parseInt((unsafeWindow.bi2_window_h_max*3)/5, 10) + 'px';
	bi2_err = document.getElementById('bi2_window_error');
	bi2_err.style.height = parseInt((unsafeWindow.bi2_window_h_max*2)/5, 10) + 'px';
	bi2_err.style.display='block';
	htm = '<hr><div style=\"font-weight:bold; color:black; text-align:center;\" >Р­С‚Рё РґР°РЅРЅС‹Рµ РЅСѓР¶РЅРѕ РѕС‚РїСЂР°РІРёС‚СЊ Р°РІС‚РѕСЂСѓ СЃРєСЂРёРїС‚Р°, РґР»СЏ Р·Р°РїРѕР»РЅРµРЅРёСЏ Р±Р°Р·С‹ РІРµС‰РµР№<br />'; 
	htm += '<textarea style=\"margin: 5px;\" readonly=\"readonly\" cols=\"96\" rows=\"6\">';
	htm += err;
	htm += '</textarea></div>';
	bi2_err.innerHTML = htm;
}

unsafeWindow.bi2_worker = function(){
    unsafeWindow.bi2_process=true;
    unsafeWindow.resultaty=[];
    unsafeWindow.resultaty_z=[];
    unsafeWindow.resultaty_r=[];
    unsafeWindow.zaschita=null;
    unsafeWindow.ezda = false;
    unsafeWindow.rabnavyki=[];
    unsafeWindow.rabnavyki_z=[];
    unsafeWindow.bi2_khochuka = [];

	vse_rab = document.getElementById('bi2_skol_rabot_v').checked;
	nesk_rab = document.getElementById('bi2_skol_rabot_n').checked;
	unsafeWindow.bi2_vse_raboty = vse_rab;
	vyb_rab = document.getElementById('bi2_rabota');
	unsafeWindow.porabotaj=null;
	unsafeWindow.porabotaj=[];
	if (vse_rab){
		for (r in unsafeWindow.raboty){
			if ((r>0)&&(r<=111))
				unsafeWindow.porabotaj[r]=true;
		}
	}
	else{
		for (r in vyb_rab.options){
			if (vyb_rab.options[r].selected){
				if (vyb_rab.options[r].value > 0) {
					unsafeWindow.porabotaj[vyb_rab.options[r].value] = true;
				}
			}
		}
	}
	test_vesch = document.getElementById('bi2_khochuka').checked;
	test_svoi_magaziny = document.getElementById('bi2_smo_mag').checked;
	if (test_vesch){
	    vyb_vesch = document.getElementById('bi2_dobavim_veschi');
	    for (v in vyb_vesch.options){
	        if (vyb_vesch.options[v].selected){
	            if (vyb_vesch.options[v].value > 0){
	                unsafeWindow.bi2_khochuka[vyb_vesch.options[v].value] = true;
	            }
	        }
	    }
	}
	unsafeWindow.bi2_khlam = document.getElementById('bi2_khlam').checked;
	iz_magazinov = document.getElementById('bi2_pokupka').checked;
	vse_veschi= document.getElementById('bi2_vse_vse').checked;
	unsafeWindow.bablo = parseInt(document.getElementById('bi2_bablo').value,10);
	unsafeWindow.bi2_millioner = document.getElementById('bi2_milion').checked;
	if (unsafeWindow.bi2_millioner)
	    unsafeWindow.bablo=1000000;
	plus_level = parseInt(document.getElementById('bi2_uroven').value,10);
	unsafeWindow.ezda = document.getElementById('bi2_skorost').checked
	s_zaschitoj=document.getElementById('bi2_zaschita').checked;
	e_nov_rabota=document.getElementById('bi2_navyki').checked;
	nov_index=unsafeWindow.raboty.length;
	if (e_nov_rabota){
		nr_malus = parseInt(document.getElementById('bi2_malus').value,10);
		nov_rabota={};
		nr_rabota_res=null;
		
		nvn_build=parseFloat(document.getElementById('bi2_build').value);
		nvn_punch=parseFloat(document.getElementById('bi2_punch').value);
		nvn_tough=parseFloat(document.getElementById('bi2_tough').value);
		nvn_endurance=parseFloat(document.getElementById('bi2_endurance').value);
		nvn_health=parseFloat(document.getElementById('bi2_health').value);
		nvn_ride=parseFloat(document.getElementById('bi2_ride').value);
		nvn_reflex=parseFloat(document.getElementById('bi2_reflex').value);
		nvn_dodge=parseFloat(document.getElementById('bi2_dodge').value);
		nvn_hide=parseFloat(document.getElementById('bi2_hide').value);
		nvn_swim=parseFloat(document.getElementById('bi2_swim').value);
		nvn_aim=parseFloat(document.getElementById('bi2_aim').value);
		nvn_shot=parseFloat(document.getElementById('bi2_shot').value);
		nvn_pitfall=parseFloat(document.getElementById('bi2_pitfall').value);
		nvn_finger_dexterity=parseFloat(document.getElementById('bi2_finger_dexterity').value);
		nvn_repair=parseFloat(document.getElementById('bi2_repair').value);
		nvn_leadership=parseFloat(document.getElementById('bi2_leadership').value);
		nvn_tactic=parseFloat(document.getElementById('bi2_tactic').value);
		nvn_trade=parseFloat(document.getElementById('bi2_trade').value);
		nvn_animal=parseFloat(document.getElementById('bi2_animali').value);
		nvn_appearance=parseFloat(document.getElementById('bi2_appearance').value);
		unsafeWindow.raboty[nov_index] = {rus_name:'РљРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ', name:'constructor', malus:nr_malus, navyki:{build:nvn_build, punch:nvn_punch, tough:nvn_tough, endurance:nvn_endurance, health:nvn_health, ride:nvn_ride, reflex:nvn_reflex, dodge:nvn_dodge, hide:nvn_hide, swim:nvn_swim, aim:nvn_aim, shot:nvn_shot, pitfall:nvn_pitfall, finger_dexterity:nvn_finger_dexterity, repair:nvn_repair, leadership:nvn_leadership, tactic:nvn_tactic, trade:nvn_trade, animal:nvn_animal, appearance:nvn_appearance}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, producty:null}};
	}
	if (s_zaschitoj){
		unsafeWindow.zaschita=null;
		unsafeWindow.zaschita={};
		unsafeWindow.zaschita.to = parseInt(document.getElementById('bi2_zaschitato').value,10);
		if (document.getElementById('bi2_zaschita_vm').checked){
			unsafeWindow.zaschita.navyki={punch:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vr').checked){
			unsafeWindow.zaschita.navyki={shot:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vd').checked){
			unsafeWindow.zaschita.navyki={tough:0.5,health:1,reflex:0.5,dodge:1,tactic:1};
		}
		else if (document.getElementById('bi2_zaschita_vk').checked){
			unsafeWindow.zaschita.navyki=unsafeWindow.raboty[nov_index].navyki;
			e_nov_rabota=false;
		}
		else{
			unsafeWindow.zaschita.navyki={dodge:1};
		}
	}
	else{
		unsafeWindow.zaschita=null;
	}
	if (e_nov_rabota){
		if (vse_rab || nesk_rab) {
			unsafeWindow.porabotaj[nov_index] = true;
		}
		else{
			unsafeWindow.porabotaj=[];
			unsafeWindow.porabotaj[nov_index] = true;
		}
	}

	sslot=document.getElementById('bi2_sloty').checked;
	if (sslot){
		unsafeWindow.bi2_slots={};
		unsafeWindow.bi2_slots.head =document.getElementById('bi2_head').checked;
		unsafeWindow.bi2_slots.body =document.getElementById('bi2_body').checked;
		unsafeWindow.bi2_slots.foot =document.getElementById('bi2_foot').checked;
		unsafeWindow.bi2_slots.neck =document.getElementById('bi2_neck').checked;
		unsafeWindow.bi2_slots.rigth_arm =document.getElementById('bi2_rigth_arm').checked;
		unsafeWindow.bi2_slots.left_arm =document.getElementById('bi2_left_arm').checked;
		unsafeWindow.bi2_slots.yield =document.getElementById('bi2_yield').checked;
		unsafeWindow.bi2_slots.animal =document.getElementById('bi2_animal').checked;
	}
	else{
		for (ss = unsafeWindow.bi2_types.length - 1; ss >= 0; --ss){
			unsafeWindow.bi2_slots[unsafeWindow.bi2_types[ss]]=true;
		}
	}
	if (!unsafeWindow.bi2_inv_imported){
	    unsafeWindow.bi2_iimport();
	    if (!unsafeWindow.bi2_inv_imported){
	        new unsafeWindow.HumanMessage('РџСЂРµРґРІР°СЂРёС‚РµР»СЊРЅРѕ РЅРµРѕР±С…РѕРґРёРјРѕ РёРјРїРѕСЂС‚РёСЂРѕРІР°С‚СЊ Р±Р°РіР°Р¶. РћС‚РєСЂРѕР№С‚Рµ, Рё РґРѕР¶РґРёС‚РµСЃСЊ Р·Р°РіСЂСѓР·РєРё.<br />РџРѕСЃР»Рµ РїРѕР»РЅРѕР№ Р·Р°РіСЂСѓР·РєРё Р±Р°РіР°Р¶Р°, РµРіРѕ РјРѕР¶РЅРѕ СЃРІРµСЂРЅСѓС‚СЊ РёР»Рё Р·Р°РєСЂС‹С‚СЊ.');
	        unsafeWindow.bi2_process=false;
	        return;
	    }
	}
	if (test_vesch&&test_svoi_magaziny){
	    unsafeWindow.bi2_mimport();
	}
	unsafeWindow.pers = unsafeWindow.Character;
	if (unsafeWindow.bi2_inv_imported)
	{
        unsafeWindow.bi2_podschet(vse_veschi, iz_magazinov, plus_level, unsafeWindow.pers);
    }
       
    if (unsafeWindow.einfo!=''){
        unsafeWindow.bi2_show_window();
        unsafeWindow.bi2_error_window(unsafeWindow.einfo+'\n'+unsafeWindow.winfo);
    }
    else if (unsafeWindow.winfo!=''){
        unsafeWindow.bi2_show_window();
        unsafeWindow.bi2_error_window(unsafeWindow.winfo);
    }
    
    unsafeWindow.all_def={navyki:{}};
	if (unsafeWindow.zaschita){
		for (z in unsafeWindow.zaschita.navyki) unsafeWindow.all_def.navyki[z]=unsafeWindow.zaschita.navyki[z];
	}
	else	unsafeWindow.all_def.navyki = {aim:2,dodge:2,tactic:2,tough:1,reflex:1,health:1};
	unsafeWindow.rekurs_time = 50000;
	unsafeWindow.rekurs_step = 0;
    unsafeWindow.bi2_vybzap();
}


unsafeWindow.bi2_simselect='<select style=\"background-color: rgb(232, 218, 179); font-size: 13px;\" id=\"bi2_rabota\" size=\"1\" onchange=\"javascript:$(\'bi2_skol_rabot_o\').checked=true;\">';
unsafeWindow.bi2_mulselect='<select title=\"Р’С‹Р±РѕСЂ РЅРµСЃРєРѕР»СЊРєРё СЂР°Р±РѕС‚ &mdash; СЃ РЅР°Р¶Р°С‚РѕР№ РєР»Р°РІРёС€РµР№ Ctrl\" style=\"background-color: rgb(232, 218, 179); font-size: 13px;\" multiple=\"multiple\" id=\"bi2_rabota\" size=\"6\" onchange=\"javascript:$(\'bi2_skol_rabot_n\').checked=true;\">';
unsafeWindow.bi2_conselect='\
<option value=\"0\">	Р’С‹Р±РѕСЂ СЂР°Р±РѕС‚С‹:	</option>\
<option value=\"22\">	Р’С‹РїР°СЃ РєРѕСЂРѕРІ	</option>\
<option value=\"10\">	Р’С‹РїР°СЃ РѕРІРµС†	</option>\
<option value=\"1\">	Р’С‹РїР°СЃ СЃРІРёРЅРµР№	</option>\
<option value=\"25\">	Р’С‹СЂР°Р±РѕС‚РєР° РєР°РјРЅСЏ	</option>\
<option value=\"55\">	Р’С‹СЂСѓР±РєР° Р»РµСЃР°	</option>\
<option value=\"85\">	Р”РѕР±С‹С‡Р° Р¶РµР»РµР·Р°	</option>\
<option value=\"67\">	Р”РѕР±С‹С‡Р° РЅРµС„С‚Рё	</option>\
<option value=\"32\">	Р”РѕР±С‹С‡Р° СЃР°РјРѕС†РІРµС‚РѕРІ	</option>\
<option value=\"56\">	Р”РѕР±С‹С‡Р° СЃРµСЂРµР±СЂР°	</option>\
<option value=\"40\">	Р”РѕР±С‹С‡Р° СѓРіР»СЏ	</option>\
<option value=\"50\">	Р”РѕСЃС‚Р°РІРєР° Р°РјСѓРЅРёС†РёРё	</option>\
<option value=\"17\">	Р”СѓР±Р»РµРЅРёРµ РєРѕР¶Рё	</option>\
<option value=\"8\">	Р–Р°С‚РІР°	</option>\
<option value=\"19\">	Р—Р°С…РѕСЂРѕРЅРµРЅРёРµ	</option>\
<option value=\"79\">	Р—РЅР°С…Р°СЂСЃС‚РІРѕ	</option>\
<option value=\"49\">	РР·РіРѕС‚РѕРІР»РµРЅРёРµ РіСЂРѕР±РѕРІ	</option>\
<option value=\"29\">	РљР»РµР№РјРµРЅРёРµ СЃРєРѕС‚Р°	</option>\
<option value=\"60\">	РљРѕРЅРѕРєСЂР°РґСЃС‚РІРѕ	</option>\
<option value=\"83\">	РљРѕРЅС‚СЂР°Р±Р°РЅРґР°	</option>\
<option value=\"78\">	РљСЂР°Р¶Р° СЃРѕ РІР·Р»РѕРјРѕРј	</option>\
<option value=\"24\">	Р›РµСЃРѕРїРёР»РєР°	</option>\
<option value=\"27\">	Р›РµСЃРѕРїРѕРІР°Р»	</option>\
<option value=\"65\">	РњР°СЂРѕРґС‘СЂСЃС‚РІРѕ	</option>\
<option value=\"70\">	РњРµР»РєРѕРµ РІРѕСЂРѕРІСЃС‚РІРѕ	</option>\
<option value=\"62\">	РњРёСЃСЃРёРѕРЅРµСЂСЃС‚РІРѕ	</option>\
<option value=\"88\">	РќР°Р±РёРІРєР° РїРѕРґРєРѕРІ	</option>\
<option value=\"74\">	РќР°РїР°РґРµРЅРёРµ РЅР° РґРёР»РёР¶Р°РЅСЃ	</option>\
<option value=\"73\">	РќР°РїР°РґРµРЅРёРµ РЅР° РїРѕРІРѕР·РєСѓ	</option>\
<option value=\"77\">	РќР°РїР°РґРµРЅРёРµ РЅР° РїРѕРµР·Рґ	</option>\
<option value=\"35\">	РћР±СЉРµР·Рґ Р»РѕС€Р°РґРµР№	</option>\
<option value=\"30\">	РћРіСЂР°Р¶РґРµРЅРёРµ РїР°СЃС‚Р±РёС‰Р°	</option>\
<option value=\"28\">	РћСЂРѕС€РµРЅРёРµ	</option>\
<option value=\"48\">	РћС‚Р»РѕРІ Р»РѕС€Р°РґРµР№	</option>\
<option value=\"75\">	РћС…РѕС‚Р° Р·Р° РїСЂРµСЃС‚СѓРїРЅРёРєР°РјРё	</option>\
<option value=\"52\">	РћС…РѕС‚Р° РЅР° Р±РёР·РѕРЅР°	</option>\
<option value=\"39\">	РћС…РѕС‚Р° РЅР° Р±РѕР±СЂР°	</option>\
<option value=\"58\">	РћС…РѕС‚Р° РЅР° РІРѕР»РєРѕРІ	</option>\
<option value=\"66\">	РћС…РѕС‚Р° РЅР° РіСЂРёР·Р»Рё	</option>\
<option value=\"20\">	РћС…РѕС‚Р° РЅР° РёРЅРґРµР№РєСѓ	</option>\
<option value=\"51\">	РћС…РѕС‚Р° РЅР° РєРѕР№РѕС‚РѕРІ	</option>\
<option value=\"57\">	РћС…СЂР°РЅР° РґРёР»РёР¶Р°РЅСЃР°	</option>\
<option value=\"59\">	РћС…СЂР°РЅР° РєР°СЂР°РІР°РЅР°	</option>\
<option value=\"61\">	РћС…СЂР°РЅР° С‚СЋСЂСЊРјС‹	</option>\
<option value=\"16\">	РћС…СЂР°РЅР° С„РѕСЂС‚Р°	</option>\
<option value=\"80\">	РџР°СЂР»Р°РјРµРЅС‚С‘СЂСЃС‚РІРѕ	</option>\
<option value=\"76\">	РџРµСЂРµРІРѕР·РєР° Р·Р°РєР»СЋС‡С‘РЅРЅС‹С…	</option>\
<option value=\"18\">	РџРѕРёСЃРє Р·РѕР»РѕС‚Р°	</option>\
<option value=\"68\">	РџРѕРёСЃРєРё РєР»Р°РґР°	</option>\
<option value=\"13\">	РџРѕРјРѕР» Р·РµСЂРЅР°	</option>\
<option value=\"63\">	РџРѕРЅРё-СЌРєСЃРїСЂРµСЃСЃ	</option>\
<option value=\"72\">	РџСЂРµСЃР»РµРґРѕРІР°РЅРёРµ Р±Р°РЅРґРёС‚РѕРІ	</option>\
<option value=\"2\">	РџСЂРёСЃРјРѕС‚СЂ Р·Р° РїРѕР»РµРј	</option>\
<option value=\"11\">	РџСЂРѕРґР°Р¶Р° РїСЂРµСЃСЃС‹	</option>\
<option value=\"37\">	РџСЂРѕРєР»Р°РґРєР° С‚РµР»РµРіСЂР°С„РЅРѕР№ Р»РёРЅРёРё	</option>\
<option value=\"31\">	РџСЂРѕСЂС‹РІ РїР»РѕС‚РёРЅС‹	</option>\
<option value=\"33\">	Р Р°Р·РјРµС‚РєР° РїСЂРёРёСЃРєРѕРІ	</option>\
<option value=\"3\">	Р Р°СЃРєР»РµР№РєР° РїР»Р°РєР°С‚РѕРІ	</option>\
<option value=\"45\">	Р РµРєРѕРіРЅРѕСЃС†РёСЂРѕРІРєР°	</option>\
<option value=\"23\">	Р РµРјРѕРЅС‚ Р·Р°Р±РѕСЂР°	</option>\
<option value=\"34\">	Р РµРјРѕРЅС‚ РїРѕРІРѕР·РѕРє	</option>\
<option value=\"82\">	Р РµС‡РЅС‹Рµ РїРµСЂРµРІРѕР·РєРё	</option>\
<option value=\"7\">	Р С‹Р±Р°Р»РєР°	</option>\
<option value=\"42\">	Р С‹Р±РЅР°СЏ Р»РѕРІР»СЏ	</option>\
<option value=\"38\">	Р С‹С‚СЊС‘ РєРѕР»РѕРґС†Р°	</option>\
<option value=\"86\">	РЎР±РѕСЂ Р°РіР°РІС‹	</option>\
<option value=\"91\">	РЎР±РѕСЂ Р°РїРµР»СЊСЃРёРЅРѕРІ	</option>\
<option value=\"14\">	РЎР±РѕСЂ РєСѓРєСѓСЂСѓР·С‹	</option>\
<option value=\"87\">	РЎР±РѕСЂ РїРѕРјРёРґРѕСЂРѕРІ	</option>\
<option value=\"6\">	РЎР±РѕСЂ СЃР°С…Р°СЂРЅРѕРіРѕ С‚СЂРѕСЃС‚РЅРёРєР°	</option>\
<option value=\"4\">	РЎР±РѕСЂ С‚Р°Р±Р°РєР°	</option>\
<option value=\"15\">	РЎР±РѕСЂ С„Р°СЃРѕР»Рё	</option>\
<option value=\"5\">	РЎР±РѕСЂ С…Р»РѕРїРєР°	</option>\
<option value=\"9\">	РЎР±РѕСЂ СЏРіРѕРґ	</option>\
<option value=\"12\">	РЎРµРЅРѕРєРѕСЃ	</option>\
<option value=\"69\">	РЎР»СѓР¶Р±Р° РІ Р°СЂРјРёРё	</option>\
<option value=\"71\">	РЎР»СѓР¶Р±Р° РЅР°С‘РјРЅРёРєРѕРј	</option>\
<option value=\"46\">	РЎРїР»Р°РІ Р»РµСЃР°	</option>\
<option value=\"26\">	РЎРїСЂСЏРјР»РµРЅРёРµ СЂСѓСЃР»Р°	</option>\
<option value=\"44\">	РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РІРµС‚СЂСЏРЅРѕР№ РјРµР»СЊРЅРёС†С‹	</option>\
<option value=\"43\">	РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РІРѕРєР·Р°Р»Р°	</option>\
<option value=\"21\">	РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ Р¶РµР»РµР·РЅРѕР№ РґРѕСЂРѕРіРё	</option>\
<option value=\"47\">	РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РјРѕСЃС‚Р°	</option>\
<option value=\"53\">	РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РѕСЃРѕР±РЅСЏРєР°	</option>\
<option value=\"84\">	РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ СЂР°РЅС‡Рѕ	</option>\
<option value=\"41\">	РўРёРїРѕРіСЂР°С„РёСЏ	</option>\
<option value=\"36\">	РўРѕСЂРіРѕРІР»СЏ	</option>\
<option value=\"64\">	РўРѕСЂРіРѕРІР»СЏ РѕСЂСѓР¶РёРµРј СЃ РёРЅРґРµР№С†Р°РјРё	</option>\
<option value=\"54\">	РўРѕСЂРіРѕРІР»СЏ СЃ РёРЅРґРµР№С†Р°РјРё	</option>\
<option value=\"90\">	РўСѓС€РµРЅРёРµ РїРѕР¶Р°СЂР°	</option>\
<option value=\"93\">	Р§РёСЃС‚РєР° РѕР±СѓРІРё	</option>\
<option value=\"92\">	Р§РёСЃС‚РєР° С…Р»РµРІР°	</option>\
<option value=\"101\">	РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ РІ РіРѕСЂРѕРґРµ/С„РѕСЂС‚Рµ	</option>\
<option value=\"111\">	РџРµСЂРµРґРІРёР¶РµРЅРёРµ	</option>\
<option value=\"105\">	РђС‚Р°РєР° С„РѕСЂС‚Р°	</option>\
<option value=\"106\">	РђС‚Р°РєР° С„РѕСЂС‚Р° (РјРµС‚Рє. Рё СѓРІС‘СЂС‚. РїРѕ 1/2)	</option>\
<option value=\"107\">	Р—Р°С‰РёС‚Р° С„РѕСЂС‚Р°	</option>\
<option value=\"108\">	Р—Р°С‰РёС‚Р° С„РѕСЂС‚Р° (РјРµС‚Рє. Рё СѓРІС‘СЂС‚. РїРѕ 1/2)	</option>\
<option value=\"121\">	РЎС‚СЂРµР»РѕРє vs СЃС‚СЂРµР»РѕРє Р°С‚Р°РєР°	</option>\
<option value=\"125\">	РЎС‚СЂРµР»РѕРє vs СѓРґР°СЂРЅРёРє Р°С‚Р°РєР°	</option>\
<option value=\"123\">	РЎС‚СЂРµР»РѕРє vs СЃС‚СЂРµР»РѕРє Р·Р°С‰РёС‚Р°	</option>\
<option value=\"127\">	РЎС‚СЂРµР»РѕРє vs СѓРґР°СЂРЅРёРє Р·Р°С‰РёС‚Р°	</option>\
<option value=\"129\">	РЎС‚СЂРµР»РѕРє vs РІСЃРµ Р·Р°С‰РёС‚Р°	</option>\
<option value=\"131\">	РЎС‚СЂРµР»РѕРє vs2 СЃС‚СЂРµР»РѕРє Р°С‚Р°РєР°	</option>\
<option value=\"135\">	РЎС‚СЂРµР»РѕРє vs2 СѓРґР°СЂРЅРёРє Р°С‚Р°РєР°	</option>\
<option value=\"133\">	РЎС‚СЂРµР»РѕРє vs2 СЃС‚СЂРµР»РѕРє Р·Р°С‰РёС‚Р°	</option>\
<option value=\"137\">	РЎС‚СЂРµР»РѕРє vs2 СѓРґР°СЂРЅРёРє Р·Р°С‰РёС‚Р°	</option>\
<option value=\"139\">	РЎС‚СЂРµР»РѕРє vs2 РІСЃРµ Р·Р°С‰РёС‚Р°	</option>\
<option value=\"122\">	РЈРґР°СЂРЅРёРє vs СЃС‚СЂРµР»РѕРє Р°С‚Р°РєР°	</option>\
<option value=\"126\">	РЈРґР°СЂРЅРёРє vs СѓРґР°СЂРЅРёРє Р°С‚Р°РєР°	</option>\
<option value=\"124\">	РЈРґР°СЂРЅРёРє vs СЃС‚СЂРµР»РѕРє Р·Р°С‰РёС‚Р°	</option>\
<option value=\"128\">	РЈРґР°СЂРЅРёРє vs СѓРґР°СЂРЅРёРє Р·Р°С‰РёС‚Р°	</option>\
<option value=\"130\">	РЈРґР°СЂРЅРёРє vs РІСЃРµ Р·Р°С‰РёС‚Р°	</option>\
<option value=\"132\">	РЈРґР°СЂРЅРёРє vs2 СЃС‚СЂРµР»РѕРє Р°С‚Р°РєР°	</option>\
<option value=\"136\">	РЈРґР°СЂРЅРёРє vs2 СѓРґР°СЂРЅРёРє Р°С‚Р°РєР°	</option>\
<option value=\"134\">	РЈРґР°СЂРЅРёРє vs2 СЃС‚СЂРµР»РѕРє Р·Р°С‰РёС‚Р°	</option>\
<option value=\"138\">	РЈРґР°СЂРЅРёРє vs2 СѓРґР°СЂРЅРёРє Р·Р°С‰РёС‚Р°	</option>\
<option value=\"140\">	РЈРґР°СЂРЅРёРє vs2 РІСЃРµ Р·Р°С‰РёС‚Р°	</option>\
</select>\
';


unsafeWindow.bi2_ovselect = function(){
    vyb_vesch_options = document.getElementById('bi2_dobavim_veschi').options;
    for (v in vyb_vesch_options){
        vyb_vesch_options[v].selected = false;
    }
}

unsafeWindow.bi2_show_shmot = function(irab){
    vv = null;
    if (unsafeWindow.resultaty_r[irab]){
        vv = unsafeWindow.resultaty_r[irab];
    }
    else if (unsafeWindow.resultaty_z[irab]){
        vv = unsafeWindow.resultaty_z[irab];
    }
    else if (unsafeWindow.resultaty[irab]){
        vv = unsafeWindow.resultaty[irab];
    }
    if (!vv) return;
    hti = '<table>';
    for (ii = 0; ii < vv.items.length; ++ii){
        sid = vv.items[ii].tid;
        if (sid){
            vesch = unsafeWindow.items[sid];
            hti+='<tr><td><a class=\"tt2\" href=\"#\" ><span><strong>'+vesch.name+'</strong>';
            if (vesch.set.key){
                hti += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                hti += unsafeWindow.bi2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                hti += unsafeWindow.bi2_s_print(ind, vesch.bonus.skills[ind]);
            }
            hti += '</span>';
            hti+='<div class=\"bag_item\" ><img src=\"'+ vesch.image_mini +'\" /></div>';
            hti+='</a></td></tr>';
        }
    }
    hti += '</table>';

    bi2_shmot_old = document.getElementById('bi2_shmot');
    bi2_shmot = null;
    html2='';
    
    if (!bi2_shmot){
		html2 += '<div id=\"bi2_shmo2\" style=\"width:' + 90 + 'px;\">\n';
        html2 += '<div style=\"background-color:#302010; text-align:center; font-weight:bold; color:red;\">';
		html2 += '<span>';
		html2 += '<a href=\"javascript:bi2_close_shmot();\"' + unsafeWindow.bi2_tlink + ' title=\"Р—Р°РєСЂС‹С‚СЊ\">&nbsp;*&nbsp;</a>&nbsp;';
		html2 += '</span>';
		html2 += '<span id=\"bi2_shmot_cap\">Р’РµС‰Рё</span>';
		html2 += '</div>'
		html2 += '<div id=\"bi2_shmot_content\">';

        html2 += hti;
        html2 += '</div>'        		
        
		html2 += '</div>';
		bi2_shmot = document.createElement('div');
		bi2_shmot.id = 'bi2_shmot';
		bi2_shmot.innerHTML = html2;
		bi2_shmot.setAttribute('style', 'position: absolute; right: ' + 20 + 'px; top: ' + 10 + 'px; z-index:251');
	}
	if (bi2_shmot_old)
	    document.body.replaceChild(bi2_shmot, bi2_shmot_old);
	else
	    document.body.appendChild(bi2_shmot);
	bi2_shmot.style.display = 'block';

}

unsafeWindow.bi2_show_window = function(){
    bi2_window = document.getElementById('bi2_window');
    html1='';
    
    if (!bi2_window){
		html1 += '<div id=\"bi2_win1\" style=\"width:' + unsafeWindow.bi2_w1 + 'px; text-align:left;\">\n';
		html1 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html1 += '<tr>';
		html1 += '<td class=\"gran_vl\" />\n';
		html1 += '<td class=\"gran_v\" />\n';
		html1 += '<td class=\"gran_vp\" />\n';
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html1 += '<span>';
		html1 += '<a href=\"javascript:bi2_minimize_window();\"' + unsafeWindow.bi2_tlink + ' title=\"РЎРІРµСЂРЅСѓС‚СЊ\">&nbsp;_&nbsp;</a>&nbsp;';
		html1 += '<a href=\"javascript:bi2_stretch_window();\"' + unsafeWindow.bi2_tlink + ' title=\"-\">&nbsp;^&nbsp;</a>&nbsp;';
		html1 += '<a href=\"javascript:bi2_close_window();\"' + unsafeWindow.bi2_tlink + ' title=\"Р—Р°РєСЂС‹С‚СЊ\">&nbsp;*&nbsp;</a>&nbsp;';
		html1 += '</span>';
		html1 += '<span id=\"bi2_window_cap\">Р РµР·СѓР»СЊС‚Р°С‚С‹</span>';
		html1 += '</td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr id=\"bi2_window_content_row\">\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td id=\"bi2_window_content0\" class=\"shadow_content\" style=\"width:' + (unsafeWindow.bi2_w1 - 12) + 'px;\" >';
		html1 += '<div id=\"bi2_window_content\" style=\"overflow: auto; height: ' + unsafeWindow.bi2_window_h_max + 'px;\">';
		
		html1 += '</div><div id=\"bi2_window_error\" style=\"border: 2px; overflow: auto; display: none; \">';
		html1 += '</div></td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_nl\" />\n';
		html1 += '<td class=\"gran_n\" />\n';
		html1 += '<td class=\"gran_np\" />\n';
		html1 += '</tr></tbody>\n';
		html1 += '</table>\n';
		html1 += '</div>';
		bi2_window = document.createElement('div');
		bi2_window.id = 'bi2_window';
		bi2_window.innerHTML = html1;
		
		bi2_window.setAttribute('style', 'position: absolute; left: ' + unsafeWindow.bi2_l1 + 'px; top: ' + unsafeWindow.bi2_t1 + 'px; z-index:250');
		document.body.appendChild(bi2_window);
	}
	bi2_window.style.display = 'block';
	if (unsafeWindow.bi2_window_flag2 == 0){
	    unsafeWindow.bi2_minimize_window();
	}
}

unsafeWindow.bi2_show_panel = function(){
	bi2_title = document.getElementById('bi2_title');
	html0 = '';
	
	if (!bi2_title) {
		html0 += '<div id=\"bi2_form0\" style=\"width:' + unsafeWindow.bi2_w0 + 'px; text-align:left;\">\n';
		html0 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html0 += '<tr>';
		html0 += '<td class=\"gran_vl\" />\n';
		html0 += '<td class=\"gran_v\" />\n';
		html0 += '<td class=\"gran_vp\" />\n';
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html0 += '<span>';
		html0 += '<a href=\"javascript:bi2_minimize_title();\"' + unsafeWindow.bi2_tlink + ' title=\"РЎРІРµСЂРЅСѓС‚СЊ\">&nbsp;_&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:bi2_stretch_title();\"' + unsafeWindow.bi2_tlink + ' title=\"Р Р°Р·РІРµСЂРЅСѓС‚СЊ\">&nbsp;^&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:bi2_close_title();\"' + unsafeWindow.bi2_tlink + ' title=\"Р—Р°РєСЂС‹С‚СЊ\">&nbsp;*&nbsp;</a>&nbsp;';
		html0 += '</span>';
		html0 += '<span id=\"bi2_title_cap\" style=\"font-size:11px;\">РџРѕРёСЃРє&nbsp;&laquo;Р»СѓС‡С€РёС…&raquo;&nbsp;РІРµС‰РµР№</span>';
		html0 += '<input type=\"button\" value=\"РџРѕРµС…Р°Р»Рё\" style=\"float:right; font-weight:bold\" onclick=\"javascript:bi2_worker()\"/>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr id=\"bi2_title_content_row\">\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td id=\"bi2_title_content0\" class=\"shadow_content\" style=\"width:' + (unsafeWindow.bi2_w0 - 12) + 'px;\" >';
		html0 += '<div id=\"bi2_title_content\" style=\"overflow: auto; height: ' + unsafeWindow.bi2_title_h_mid + 'px;\">';
		
		html0 += '\
<form id=\"bi2_form\">\
	<div id=\"bi2_vselect\">';
		html0 += unsafeWindow.bi2_simselect;
		html0 += unsafeWindow.bi2_conselect;
		
		html0 += '</div>\
	<div' + unsafeWindow.bi2_vblock + '>\
	<input id=\"bi2_skol_rabot_v\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"v\" style\"margin:auto 5px;\" />Р’СЃРµ&nbsp;СЂР°Р±РѕС‚С‹<br />\
	<input id=\"bi2_skol_rabot_n\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"n\" style\"margin:auto 5px;\" onchange=\"javascript:bi2_vselect(true);void(0)\" />РќРµСЃРєРѕР»СЊРЅРѕ&nbsp;СЂР°Р±РѕС‚ (РЅР°&nbsp;РІС‹Р±РѕСЂ)<br />\
	<input id=\"bi2_skol_rabot_o\" name=\"bi2_skol_rabot\" type=\"radio\" value=\"o\" checked=\"checked\" style\"margin:auto 5px;\" onchange=\"javascript:bi2_vselect(false);void(0)\" />РћРґРЅР°&nbsp;СЂР°Р±РѕС‚Р°\
	</div>\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\">Р’СЃРµ&nbsp;СЂР°Р±РѕС‚С‹</div>-->\
		<span title=\"РџРѕСЃР»Рµ РїРµСЂРµР±РѕСЂР° РІСЃРµС… СЂР°Р±РѕС‚, СЃРєСЂРёРїС‚ РјРѕР¶РµС‚ РѕР±РЅР°СЂСѓР¶РёС‚СЊ РІРµС‰Рё, РєРѕС‚РѕСЂС‹Рµ РЅРµ РёСЃРїРѕР»СЊР·РѕРІР°Р»РёСЃСЊ; Рё РїРѕРґСЃС‡РёС‚Р°С‚СЊ РїСЂРѕРґР°Р¶РЅСѓСЋ СЃС‚РѕРёРјРѕСЃС‚СЊ СЌС‚РёС… РІРµС‰РµР№ (РІ РґР°РЅРЅРѕР№ РІРµСЂСЃРёРё РµС‰С‘ СЃР»Р°Р±Рѕ СЂРµР°Р»РёР·РѕРІР°РЅРѕ). РџСЂРё РЅРµС…РІР°С‚РєРµ РЅР°Р»РёС‡РЅРѕСЃС‚Рё РѕС‚ РЅРёС… СЌС‚Рё РІРµС‰Рё РјРѕР¶РЅРѕ Р±РµР·Р±РѕСЏР·РЅРµРЅРЅРѕ СЃР±С‹С‚СЊ.\"><input id=\"bi2_khlam\" type=\"checkbox\" style=\"margin:auto 24px auto 27px;\" />\
		РџРѕРёСЃРє РЅРµРёСЃРїРѕР»СЊР·СѓРµРјС‹С… РІРµС‰РµР№<br /></span>\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\"><span id=\"bi2_sk_rabot\">РћРґРЅР°&nbsp;СЂР°Р±РѕС‚Р°&nbsp;&nbsp;&nbsp;&nbsp;</span>\
	</div>-->\
		<span title=\"Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅРѕ РёС‰РµС‚СЃСЏ РЅР°Р±РѕСЂ РїСЂРµРґРјРµС‚РѕРІ СЃ РјР°РєСЃРёРјР°Р»СЊРЅРѕР№ СЃРєРѕСЂРѕСЃС‚СЊСЋ РґРІРёР¶РµРЅРёСЏ Рё РґРѕСЃС‚СѓРїРЅРѕСЃС‚СЋ РІС‹Р±СЂР°РЅРЅРѕР№ СЂР°Р±РѕС‚С‹. РџРѕР»РµР·РЅРѕ РґР»СЏ РѕС‚РїСЂР°РІРєРё Рє СѓРґР°Р»С‘РЅРЅС‹Рј СЂР°Р±РѕС‚Р°Рј, СЃ РїРѕСЃР»РµРґСѓСЋС‰РёРј СЃСЂР°Р·Сѓ РїРѕСЃР»Рµ СЌС‚РѕРіРѕ РїРµСЂРµРѕРґРµРІР°РЅРёРµРј РІ РЅРѕСЂРјР°Р»СЊРЅС‹Рµ СЂР°Р±РѕС‡РёРµ РІРµС‰Рё.\">\
		<input id=\"bi2_skorost\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />\
		Р‘С‹СЃС‚СЂРµР№С€РµРµ&nbsp;РїРµСЂРµРґРІРёР¶РµРЅРёРµ Рє&nbsp;СЂР°Р±РѕС‚Рµ?<br /></span>\
	<div' + unsafeWindow.bi2_vblock + '>\
		<span id=\"sp_tst_st3456\" title=\"РҐРѕС‡РµС‚СЊСЃСЏ РїРѕСЂР°Р±РѕС‚Р°С‚СЊ РЅРѕ РЅРµ С…РІР°С‚Р°РµС‚ РЅРµРјРЅРѕРіРѕ РўРћ? РќРµ Р±РµРґР°, Р·Р° РґРµРЅСЊРіРё РјРѕР¶РЅРѕ РЅР°Р№С‚Рё РІРµС‰Рё, РєРѕС‚РѕСЂС‹Рµ СЃРґРµР»Р°СЋС‚ РґРѕСЃС‚СѓРїРЅС‹РјРё РЅСѓР¶РЅСѓСЋ СЂР°Р±РѕС‚Сѓ.\">\
		<input id=\"bi2_pokupka\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_bablo\').style.display=\'block\'}else{$(\'bi2_ukr_bablo\').style.display=\'none\'};void(0)\" />&nbsp;Р”РѕРєСѓРїР°РµРј РІРµС‰Рё РїРѕР»СѓС‡С€Рµ?<br /></span>\
		<div id=\"bi2_ukr_bablo\" style=\"display:none;\">\
		<span title=\"РЎСЂРµРґСЃС‚РІР°, РєРѕС‚РѕСЂС‹Рµ РІС‹ РіРѕС‚РѕРІС‹ Р·Р°РїР»Р°С‚РёС‚СЊ Р·Р° РґРѕСЃС‚СѓРї Рє СЂР°Р±РѕС‚Р°Рј. Р”Р»СЏ СЃР°РјС‹С… Р±РѕРіР°С‚С‹С… Р±СѓСЂР°С‚РёРЅ РµСЃС‚СЊ РїСѓРЅРєС‚ РїРѕРЅРёР¶Рµ.\">\
		<input id=\"bi2_bablo\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />\
		&nbsp;РРјРµРµС‚СЃСЏ&nbsp;РґРµРЅРµРі&nbsp;РЅР°&nbsp;Р·Р°РєСѓРїРєРё<br /></span>\
		<span title=\"Р’С‹ РіРѕС‚РѕРІС‹ С‚СЂР°С‚РёС‚СЊ, Рё С‚СЂР°С‚РёС‚СЊ Р»СЋР±С‹Рµ СЃСѓРјРјС‹, РЅР° СЌРєРёРїРёСЂРѕРІР°РЅРёРµ СЃРµР±СЏ Р»СЋР±РёРјРѕРіРѕ. РЎРєСЂРёРїС‚ РІР°Рј РїРѕРјРѕР¶РµС‚, РїСЂРёС‡С‘Рј СЌС‚РѕС‚ С„Р»Р°Р¶РѕРє Р·РЅР°С‡РёС‚РµР»СЊРЅРѕ СѓСЃРєРѕСЂРёС‚ РїРѕРёСЃРє РЅРµРѕР±С…РѕРґРёРјРѕР№ &laquo;Р»СѓС‡С€РµР№&raquo; РІРµС‰Рё.\">\
		<input id=\"bi2_milion\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" />&nbsp;Р”РµРЅРµРі&nbsp;Р±РµР·&nbsp;СЃС‡С‘С‚Р° <strong>:)</strong><br /></span>\
		</div>\
		<span title=\"РўСЂРѕСЃС‚СЊ, РіР°РµС‡РЅС‹Р№ РєР»СЋС‡ Рё Р±РѕС‚РёРЅРєРё СЃРѕ С€РЅСѓСЂРєР°РјРё. Р­С‚РёС…, РёР»Рё РїРѕРґРѕР±РЅС‹С… РІРµС‰РµР№ РЅРµС‚Сѓ РІ РІР°С€РµРј РіР°СЂРґРµСЂРѕР±Рµ, РЅРѕ РїСЂРµРґСЃС‚Р°РІРёС‚СЊ РєР°Рє РёР·РјРµРЅРёР»Р°СЃСЊ Р±С‹ РІР°С€Р° Р¶РёР·РЅСЊ РµСЃР»Рё Р± РѕРЅРё РїРѕСЏРІРёР»РёСЃСЊ С‚Р°Рє С…РѕС‡РµС‚СЃСЏ? &mdash; РЅРµ Р±РµРґР°, СЃРєСЂРёРїС‚ РїРѕРјРѕР¶РµС‚. Р’РѕС‚ РїСЂР°РІРґР° РІРµС‰Рё РґР»СЏ РґСЂСѓРіРѕРіРѕ РєР»Р°СЃСЃР° Рё РїРѕР»Р° РїСЂРёРѕРґРµС‚СЊ РІСЃС‘ СЂР°РІРЅРѕ РЅРµ РїРѕР»СѓС‡РёС‚СЊСЃСЏ, РЅРѕ РІСЃС‘ С‡С‚Рѕ РїРѕРґС…РѕРґРёС‚ Р±СѓРґРµС‚ РїСЂРёРЅСЏС‚Рѕ РІРѕ РІРЅРёРјР°РЅРёРµ РїСЂРё СЂР°СЃС‡С‘С‚Р°С….\">\
		<input id=\"bi2_vse_vse\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" />&nbsp;РњРµС‡С‚Р°РµРј&nbsp;Рѕ&nbsp;РєРІРµСЃС‚РѕРІС‹С…&nbsp;Рё&nbsp;РґСЂРѕРїРµ?<br /></span>\
		<div' + unsafeWindow.bi2_vblock + '>\
		<span title=\"Р—РґРµСЃСЊ РјРѕР¶РЅРѕ РІС‹Р±СЂР°С‚СЊ РѕРїСЂРµРґРµР»С‘РЅРЅСѓСЋ РІРµС‰СЊ (РІРµС‰Рё), Рё РїРѕСЃРјРѕС‚СЂРµС‚СЊ, РЅР° СЃРєРѕР»СЊРєРёС…, Рё РєР°РєРёС… СЂР°Р±РѕС‚Р°С… РѕРЅР° Р±СѓРґРµС‚ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊСЃСЏ.\">\
		<input id=\"bi2_khochuka\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_khochuka\').style.display=\'block\'}else{$(\'bi2_ukr_khochuka\').style.display=\'none\';bi2_ovselect();};void(0)\" />РџРѕР»РµР·РЅРѕСЃС‚СЊ РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‰РёС… РІРµС‰РµР№</span>\
		<div id=\"bi2_ukr_khochuka\" style=\"display:none;\">\
		<span title=\"РџСЂРё РІС‹Р±РѕСЂРµ СЌС‚РѕРіРѕ РїСѓРЅРєС‚Р°, РІ СЂР°СЃС‡С‘С‚ Р±СѓРґСѓС‚ РїСЂРёРЅСЏС‚С‹ РІСЃРµ РІРёРґРёРјС‹Рµ РІРµС‰Рё РёР· СЂР°РЅРµРµ РѕС‚РєСЂС‹РІР°РІС€РёС…СЃСЏ РјР°РіР°Р·РёРЅРѕРІ\">\
		<input id=\"bi2_smo_mag\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" >РРјРїРѕСЂС‚РёСЂРѕРІР°С‚СЊ РІРµС‰Рё РёР· РјР°РіР°Р·РёРЅР°(-РѕРІ).</span>\
		<select title=\"Р’С‹Р±РѕСЂ РЅРµСЃРєРѕР»СЊРєРёС… РІРµС‰РµР№ &mdash; СЃ РЅР°Р¶Р°С‚РѕР№ РєР»Р°РІРёС€РµР№ Ctrl\" style=\"background-color: rgb(232, 218, 179); font-size: 13px;\" multiple=\"multiple\" id=\"bi2_dobavim_veschi\" size=\"5\">;';
		
    for (vv = 200; vv < 700; ++vv){
        if (vv == 200) {html0+='<optgroup title=\"Р“РѕР»РѕРІРЅС‹Рµ СѓР±РѕСЂС‹\" label=\"Р“РѕР»РѕРІРЅС‹Рµ СѓР±РѕСЂС‹\" style=\"background-color:#443; color:white;\">'}
        if (vv == 300) {html0+='<optgroup title=\"РћРґРµР¶РґР°\" label=\"РћРґРµР¶РґР°\" style=\"background-color:#443; color:white;\">'}
        if (vv == 400) {html0+='<optgroup title=\"РћР±СѓРІСЊ\" label=\"РћР±СѓРІСЊ\" style=\"background-color:#443; color:white;\">'}
        if (vv == 500) {html0+='<optgroup title=\"РЁРµР№РЅС‹Рµ РїРѕРІСЏР·РєРё\" label=\"РЁРµР№РЅС‹Рµ РїРѕРІСЏР·РєРё\" style=\"background-color:#443; color:white;\">'}
        if (vv == 600) {html0+='<optgroup title=\"Р–РёРІРѕС‚РЅС‹Рµ\" label=\"Р–РёРІРѕС‚РЅС‹Рµ\" style=\"background-color:#443; color:white;\">'}
        if (unsafeWindow.items[vv]){
            html0 +='<option value=\"'+vv+'\" style=\"background-color:rgb(232, 218, 179); color:black;\">	'+unsafeWindow.items[vv].name+'	</option>';
        }
    }
    html0 += '</optgroup><optgroup title=\"РћСЃС‚Р°С‚РєРё РєРѕРјРїР»РµРєС‚РѕРІ\" label=\"РћСЃС‚Р°С‚РєРё РєРѕРјРїР»РµРєС‚РѕРІ\" style=\"background-color:#443; color:white;\">';
    // РґРѕР±Р°РІРёРј СЃРµС‚РѕРІС‹С… СЂСѓС‡РєР°РјРё
    html0 += '<option value=\"792\" style=\"background-color:rgb(232, 218, 179); color:black;\">	'+unsafeWindow.items[792].name+'	</option>';
    html0 += '<option value=\"794\" style=\"background-color:rgb(232, 218, 179); color:black;\">	'+unsafeWindow.items[794].name+'	</option>';
    html0 += '<option value=\"797\" style=\"background-color:rgb(232, 218, 179); color:black;\">	'+unsafeWindow.items[797].name+'	</option>';
    html0 += '<option value=\"768\" style=\"background-color:rgb(232, 218, 179); color:black;\">	'+unsafeWindow.items[768].name+'	</option>';
    html0 += '<option value=\"723\" style=\"background-color:rgb(232, 218, 179); color:black;\">	'+unsafeWindow.items[723].name+'	</option>';
    html0 += '<option value=\"1715\" style=\"background-color:rgb(232, 218, 179); color:black;\">	'+unsafeWindow.items[1715].name+'	</option>';
    html0 += '<option value=\"854\" style=\"background-color:rgb(232, 218, 179); color:black;\">	'+unsafeWindow.items[854].name+'	</option>';		
    html0 += '</optgroup>';
html0 += '</select></div></div>\
		<span title=\"РќРµ Р¶РёРІС‘С‚Рµ СЃРµРіРѕРґРЅСЏС€РЅРёРј РґРЅС‘Рј, Рё Р·Р°РґСѓРјС‹РІР°РµС‚РµСЃСЊ Рѕ Р±СѓРґСѓС‰РµРј? РўРѕРіРґР° РјРѕР¶РЅРѕ РїРѕСЃРјРѕС‚СЂРµС‚СЊ, РєР°РєРёРµ РІРµС‰Рё Р±СѓРґСѓС‚ РЅРµРѕР±С…РѕРґРёРјС‹ Рё РїРѕР»РµР·РЅС‹ СѓСЂРѕРІРЅРµР№ С‡РµСЂРµР· 5. РЈРІРµР»РёС‡РёРІР°РµС‚ РѕС‚СЃРµС‡РєСѓ РїРѕ СѓСЂРѕРІРЅСЋ, РЅР° Р·Р°РґР°РЅРЅРѕРµ С‡РёСЃР»Рѕ. РќР°РІС‹РєРё Рё С…Р°СЂР°РєС‚РµСЂРёСЃС‚РёРєРё РїСЂРёРјРµРЅСЏСЋС‚СЃСЏ С‚РµРєСѓС‰РёРјРё.\"><input id=\"bi2_uroven\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if(isNaN(value))value=0;void(0)\" />\
		&nbsp;&laquo;РїСЂРёР±Р°РІРєР°&raquo;&nbsp;СѓСЂРѕРІРЅСЏ<br /></span>\
	<div' +
		unsafeWindow.bi2_vblock +
		'>\
		<span title=\"РџСЂРё РІС‹Р±РѕСЂРµ СЌС‚РѕРіРѕ С„Р»Р°Р¶РєР° СЃРєСЂРёРїС‚ РёС‰РµС‚ РІРµС‰Рё РЅРµ СЃ РЅР°РёР±РѕР»СЊС€РёРј РўРћ, Р° СЃ РўРћ РЅРµ РјРµРЅСЊС€РёРјРё Р·Р°РґР°РЅРЅРѕРіРѕ, РЅРѕ СЃ РјР°РєСЃРёРјР°Р»СЊРЅС‹РјРё Р±РѕРµРІС‹РјРё РЅР°РІС‹РєР°РјРё\"><input id=\"bi2_zaschita\" type=\"checkbox\" style=\"margin:auto 21px auto 23px;\" onchange=\"javascript:if (checked) {$(\'bi2_ukr_zaschita\').style.display=\'block\'}else{$(\'bi2_ukr_zaschita\').style.display=\'none\'};void(0)\" />&nbsp;РЎРѕРїСЂРѕС‚РёРІР»СЏРµРјСЃСЏ&nbsp;РЅР°РїР°РґР°СЋС‰РёРј?<br /></span>\
	<div id=\"bi2_ukr_zaschita\" style=\"display:none;\">\
		<span title=\"Р‘РѕРµРІС‹Рµ РЅР°РІС‹РєРё: СѓРґР°СЂ, РјРµС‚РєРѕСЃС‚СЊ, СѓРІС‘СЂС‚Р»РёРІРѕСЃС‚СЊ, С‚Р°РєС‚РёРєР°, Р·РґРѕСЂРѕРІСЊРµ (СЃ РІРµСЃРѕРј РІ 0,5 СЂРµС„Р»РµРєСЃ Рё СЃС‚РѕР№РєРѕСЃС‚СЊ)\"><input id=\"bi2_zaschita_vm\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"m\" style\"margin:auto 5px;\" />&nbsp;РЈРґР°СЂРЅРёРє&nbsp;</span>\
		<span title=\"Р‘РѕРµРІС‹Рµ РЅР°РІС‹РєРё: СЃС‚СЂРµР»СЊР±Р°, РјРµС‚РєРѕСЃС‚СЊ, СѓРІС‘СЂС‚Р»РёРІРѕСЃС‚СЊ, С‚Р°РєС‚РёРєР°, Р·РґРѕСЂРѕРІСЊРµ (СЃ РІРµСЃРѕРј РІ 0,5 СЂРµС„Р»РµРєСЃ Рё СЃС‚РѕР№РєРѕСЃС‚СЊ)\"><input id=\"bi2_zaschita_vr\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"r\" style\"margin:auto 5px;\" />&nbsp;РЎС‚СЂРµР»РѕРє&nbsp;</span>\
		<span title=\"Р‘РѕРµРІС‹Рµ РЅР°РІС‹РєРё: СѓРІС‘СЂС‚Р»РёРІРѕСЃС‚СЊ, С‚Р°РєС‚РёРєР°, Р·РґРѕСЂРѕРІСЊРµ (СЃ РІРµСЃРѕРј РІ 0,5 СЂРµС„Р»РµРєСЃ Рё СЃС‚РѕР№РєРѕСЃС‚СЊ)\"><input id=\"bi2_zaschita_vd\" name=\"bi2_zaschita_v\" type=\"radio\" checked=\"checked\" value=\"d\" style\"margin:auto 5px;\" />&nbsp;&laquo;Р’С‹Р¶РёС‚СЊ&nbsp;Р±С‹&raquo;<br /></span>\
		<span title=\"Р‘РѕРµРІС‹Рµ РЅР°РІС‹РєРё: Р±РµСЂСѓС‚СЊСЃСЏ РёР· РєРѕРЅСЃС‚СЂСѓРєС‚РѕСЂР° (РЅРёР¶Рµ) РІСЃРµ РЅР°РІС‹РєРё СЃ Р·Р°СЏРІР»РµРЅРЅС‹РјРё РІРµСЃР°РјРё\"><input id=\"bi2_zaschita_vk\" name=\"bi2_zaschita_v\" type=\"radio\" value=\"k\" style\"margin:auto 5px;\" />&nbsp;РСЃРїРѕР»СЊР·СѓРµРј&nbsp;РЅР°РІС‹РєРё&nbsp;РёР·&nbsp;РєРѕРЅСЃС‚СЂСѓРєС‚РѕСЂР°<br /></span>\
		<span title=\"Р”Р»СЏ Р·Р°РґР°РЅРЅРѕР№ СЂР°Р±РѕС‚С‹(СЂР°Р±РѕС‚) РўРћ Р±СѓРґРµС‚ РЅРµ РјРµРЅСЊС€Рµ СѓРєР°Р·Р°РЅРЅРѕРіРѕ. Р’СЃРµ &laquo;РёР·Р»РёС€РєРё&raquo; СЃРєСЂРёРїС‚ РїРѕРїС‹С‚Р°РµС‚СЃСЏ РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РЅР° Р±РѕРµРІС‹Рµ РЅР°РІС‹РєРё\"><input id=\"bi2_zaschitato\" type=\"text\" value=\"' +
		unsafeWindow.bi2_zaschitato +
		'\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />&nbsp;РњРёРЅРёРјСѓРј&nbsp;РўРћ&nbsp;(СЂР°Р±РѕС‡РёС…)&nbsp;<br /></span>\
		</div></div>\
		\
	<div' +
		unsafeWindow.bi2_vblock +
		'>\
		<span title=\"Р—РґРµСЃСЊ РјРѕР¶РЅРѕ РІС‹Р±СЂР°С‚СЊ СЃР»РѕС‚С‹ (С‡Р°СЃС‚Рё С‚РµР»Р°) РєРѕС‚РѕСЂС‹Рµ Р±СѓРґСѓС‚ РѕСЃС‚Р°РІР°С‚СЊСЃСЏ РїСѓСЃС‚С‹РјРё, С‚Рѕ РµСЃС‚СЊ СЃРєСЂРёРїС‚ РЅРµ Р±СѓРґРµС‚ РїРѕРґР±РёСЂР°С‚СЊ РїСЂРµРґРјРµС‚С‹, РґР»СЏ РЅРµ РѕС‚РјРµС‡РµРЅРЅС‹С… С‡Р°СЃС‚РµР№\"><input id=\"bi2_sloty\" value=\"bi2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'bi2_sloty_content\').style.display=\'block\'}else{$(\'bi2_sloty_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 23px auto 23px;\" />РќРµ&nbsp;СѓС‡РёС‚С‹РІР°РµРј <strong>РЅРµ&nbsp;РІС‹Р±СЂР°РЅРЅС‹Рµ</strong>&nbsp;СЃР»РѕС‚С‹:<br /></span>\
		<div id=\"bi2_sloty_content\" style=\"display:none; \">\
	<div' +
		unsafeWindow.bi2_vblock +
		'>\
		<input id=\"bi2_head\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Р“РѕР»РѕРІРЅРѕР№ СѓР±РѕСЂ<br />\
		<input id=\"bi2_neck\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />РЁРµР№РЅР°СЏ РїРѕРІСЏР·РєР°<br />\
		<input id=\"bi2_body\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />РћРґРµР¶РґР°<br />\
		<input id=\"bi2_rigth_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Р”СѓСЌР»СЊРЅРѕРµ РѕСЂСѓР¶РёРµ<br />\
		<input id=\"bi2_left_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Р¤РѕСЂС‚РѕРІРѕРµ РѕСЂСѓР¶РёРµ<br />\
		<input id=\"bi2_foot\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />РћР±СѓРІСЊ<br />\
		<input id=\"bi2_animal\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Р’РµСЂС…РѕРІРѕРµ Р¶РёРІРѕС‚РЅРѕРµ<br />\
		<input id=\"bi2_yield\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />РџСЂРѕРґСѓРєС‚<br />\
		</div></div></div>\
	<div' +
		unsafeWindow.bi2_vblock +
		'>\
		<span title=\"Р—РґРµСЃСЊ РјРѕР¶РЅРѕ СЃРѕСЃС‚Р°РІРёС‚СЊ РїСЂРѕРёР·РІРѕР»СЊРЅСѓСЋ &laquo;СЂР°Р±РѕС‚Сѓ&raquo; Р·Р°РґР°РІ СЃР»РѕР¶РЅРѕСЃС‚СЊ СЂР°Р±РѕС‚С‹, Рё Р»СЋР±С‹Рµ РЅРµРѕР±С…РѕРґРёРјС‹Рµ РЅР°РІС‹РєРё СЃ &laquo;СЃРёР»РѕР№&raquo; РѕС‚ 0 РґРѕ 5 (РјРѕР¶РЅРѕ РїСЂРёРјРµРЅСЏС‚СЊ РґСЂРѕР±РЅС‹Рµ С‡РёСЃР»Р° РІРёРґР° 1.375).\n РСЃРїРѕР»СЊР·СѓСЏ РѕРіСЂР°РЅРёС‡РµРЅРёРµ РїРѕ СЃР»РѕС‚Р°Рј Рё РІС‹Р±СЂР°РЅРЅС‹Р№ РЅР°РІС‹Рє СЃ РІРµСЃРѕРј 1 РјРѕР¶РЅРѕ РїРѕРґР±РёСЂР°С‚СЊ РІРµС‰Рё РґР»СЏ РєРІРµСЃС‚РѕРІ РІРёРґР° {РјРµС‚РєРѕСЃС‚СЊ = 27 СЃ Р±РѕРЅСѓСЃРѕРј, РїСЂРёС…РѕРґРё РІ С‡С‘СЂРЅС‹С… Р»РѕС…РјРѕС‚СЊСЏС… Рё СЃРµСЂС‹С… Р±РѕС‚РёРЅРєР°С…}.\n Р›РёР±Рѕ РµСЃР»Рё Р·Р°РґРµР№СЃС‚РІРѕРІР°РЅР° Р·Р°С‰РёС‚Р° Рё СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‰РёР№ РІС‹Р±РѕСЂ РєРѕРЅСЃС‚СЂСѓРєС‚РѕСЂР° - РґР°РЅРЅС‹Рµ РЅР°РІС‹РєРё СЂР°СЃСЃРјР°С‚СЂРёРІР°СЋС‚СЃСЏ РєР°Рє Р±РѕРµРІС‹Рµ Рё Р·Р°РјРµРЅСЏСЋС‚ РїСЂРµРґСѓСЃС‚Р°РЅРѕРІРєРё"><input id=\"bi2_navyki\" value=\"bi2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'bi2_navyki_content\').style.display=\'block\'}else{$(\'bi2_navyki_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 23px;\" />\
		РљРѕРЅСЃС‚СЂСѓРєС†РёСЏ&nbsp;РїСЂРѕРёР·РІРѕР»СЊРЅС‹С…&nbsp;РЅР°РІС‹РєРѕРІ<br /></span>\
		<div id=\"bi2_navyki_content\" style=\"display:none; \">\
	<div' +
		unsafeWindow.bi2_vblock +
		'>\
		<input id=\"bi2_malus\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value< -32767)||(value>32767)||isNaN(value))value=0;void(0)\" />&nbsp;&laquo;РЎР»РѕР¶РЅРѕСЃС‚СЊ СЂР°Р±РѕС‚С‹&raquo;<br />\
	<div style=\"color:red; font-weight:bold;\">\
		<input id=\"bi2_build\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РЎС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ<br />\
		<input id=\"bi2_punch\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РЈРґР°СЂ<br />\
		<input id=\"bi2_tough\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РЎС‚РѕР№РєРѕСЃС‚СЊ<br />\
		<input id=\"bi2_endurance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Р’С‹РЅРѕСЃР»РёРІРѕСЃС‚СЊ<br />\
		<input id=\"bi2_health\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Р—РґРѕСЂРѕРІСЊРµ<br />\
	</div><div style=\"color:green; font-weight:bold;\">\
		<input id=\"bi2_ride\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Р’РµСЂС…РѕРІР°СЏ РµР·РґР°<br />\
		<input id=\"bi2_reflex\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Р РµР°РєС†РёСЏ<br />\
		<input id=\"bi2_dodge\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РЈРІС‘СЂС‚Р»РёРІРѕСЃС‚СЊ<br />\
		<input id=\"bi2_hide\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РњР°СЃРєРёСЂРѕРІРєР°<br />\
		<input id=\"bi2_swim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РџР»Р°РІР°РЅСЊРµ<br />\
	</div><div style=\"color:blue; font-weight:bold;\">\
		<input id=\"bi2_aim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РњРµС‚РєРѕСЃС‚СЊ<br />\
		<input id=\"bi2_shot\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РЎС‚СЂРµР»СЊР±Р°<br />\
		<input id=\"bi2_pitfall\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РЈСЃС‚Р°РЅРѕРІРєР° Р»РѕРІСѓС€РµРє<br />\
		<input id=\"bi2_finger_dexterity\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РџСЂРѕРІРѕСЂСЃС‚РІРѕ<br />\
		<input id=\"bi2_repair\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Р РµРјРѕРЅС‚<br />\
	</div><div style=\"color:#960; font-weight:bold;\">\
		<input id=\"bi2_leadership\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Р›РёРґРµСЂСЃС‚РІРѕ<br />\
		<input id=\"bi2_tactic\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РўР°РєС‚РёРєР°<br />\
		<input id=\"bi2_trade\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РўРѕСЂРіРѕРІР»СЏ<br />\
		<input id=\"bi2_animali\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;РћР±СЂР°С‰РµРЅРёРµ&nbsp;СЃ&nbsp;Р¶РёРІРѕС‚РЅС‹РјРё<br />\
		<input id=\"bi2_appearance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Р‘Р»РµС„<br />\
	</div>\
		</div></div></div>\
	</div>\
</form>';
		
		html0 += '</div>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_nl\" />\n';
		html0 += '<td class=\"gran_n\" />\n';
		html0 += '<td class=\"gran_np\" />\n';
		html0 += '</tr></tbody>\n';
		html0 += '</table>\n';
		html0 += '</div>';
		
		bi2_title = document.createElement('div');
		bi2_title.id = 'bi2_title';
		bi2_title.innerHTML = html0;
		
		bi2_title.setAttribute('style', 'position: absolute; left: ' + unsafeWindow.bi2_l0 + 'px; top: ' + unsafeWindow.bi2_t0 + 'px; z-index:202');
		document.body.appendChild(bi2_title);
		}
	bi2_title.style.display = 'block';
		
}



var bi2_body, bi2_script, bi2_style, bi2_head; 
bi2_body = document.getElementsByTagName('body')[0];

bi2_script = document.createElement('script');
bi2_script.type = 'text/javascript';
bi2_script.innerHTML = bi2_code;
bi2_body.appendChild(bi2_script);

bi2_stext=''
bi2_stext+='.tt:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:10px;\n';
bi2_stext+='left:15px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:20;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2 span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt2:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:40px;\n';
bi2_stext+='left:-70px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:21;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='font-weight:normal;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3:hover{\n';
bi2_stext+='position:relative;\n';
bi2_stext+='z-index:23;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3 span{\n';
bi2_stext+='display:none;\n';
bi2_stext+='}\n';
bi2_stext+='.tt3:hover span{\n';
bi2_stext+='display:block;\n';
bi2_stext+='position:absolute;\n';
bi2_stext+='top:40px;\n';
bi2_stext+='left:-100px;\n';
bi2_stext+='background:#b6ab92;\n';
bi2_stext+='border:2px solid #000;\n';
bi2_stext+='color:#000;\n';
bi2_stext+='opacity:0.8;\n';
bi2_stext+='z-index:21;\n';
bi2_stext+='padding:5px;\n';
bi2_stext+='font-size:12px;\n';
bi2_stext+='cursor:pointer;\n';
bi2_stext+='text-decoration:none;\n';
bi2_stext+='}\n';

bi2_stext+='\
.jy_bi {\
	width:43px;\
	height:43px;\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 11px;\
	font-weight: bold;\
	font-style: normal;\
	background-image:url(../images/inventory/yield.png);\
	background-repeat: no-repeat;\
}';
bi2_stext+='\
.jy_bi img {\
	width:43px;\
	height:43px;\
}';
bi2_stext+='\
.jy_bi2 {\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 10px;\
	font-weight: bold;\
	text-align: center;\
	font-style: normal;\
}';

bi2_stext+='\
.gran_vl {\
    background: transparent url(images/border/edge_tl_small.png) no-repeat scroll 0% 0%; height: 6px; padding:0;\
}';
bi2_stext+='\
.gran_v {\
    background: transparent url(images/border/border_t.png) repeat-x scroll 0% 0%; padding:0;\
}';
bi2_stext+='\
.gran_vp {\
    background: transparent url(images/border/edge_tr_small.png) no-repeat scroll 0% 0%; padding:0; width: 6px; height: 6px;\
}';
bi2_stext+='\
.gran_l {\
    background: transparent url(images/border/border_l.png) repeat-y scroll 0% 0%; width: 6px; padding:0;\
}';
bi2_stext+='\
.gran_p {\
    background: transparent url(images/border/border_r.png) repeat-y scroll right center; padding:0; width: 6px;\
}';
bi2_stext+='\
.gran_nl {\
    background: transparent url(images/border/edge_bl.png) no-repeat scroll 0% 0%; height: 6px; width: 6px; padding:0;\
}';
bi2_stext+='\
.gran_n {\
    background: transparent url(images/border/border_b.png) repeat-x scroll 0% 0%; padding:0;\
}';
bi2_stext+='\
.gran_np {\
    background: transparent url(images/border/edge_br.png) no-repeat scroll 0% 0%; padding:0; height: 6px; width: 6px;\
}';



bi2_head = document.getElementsByTagName('head')[0];
bi2_style = document.createElement('style');
bi2_style.type = 'text/css';
if (bi2_style.styleSheet) {
     bi2_style.styleSheet.cssText = bi2_stext;
} else {
    if (bi2_style.innerText == '') {
	bi2_style.innerText = bi2_stext;
    } else {
	bi2_style.innerHTML = bi2_stext;
    }
}
bi2_head.appendChild(bi2_style);

var bi2_fml = document.getElementById('footer_menu_left');



if (bi2_fml) {
	var bi2_link = document.createElement('a');
	bi2_link.setAttribute('href', 'javascript:bi2_show_panel();void(0)');
	bi2_link.innerHTML = '<img id=\"' + 'bi2_footer_link' + '\" src=\"images/transparent.png\"/ style=\"width:36px; height:36px; background-position: 0px 0px 0px 0px; background-image:url(data:image/png;base64,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%3D%3D);\" title=\"РћС‚РєСЂС‹С‚СЊ РѕРєРЅРѕ РЅР°СЃС‚СЂРѕРµРє РґР»СЏ Р·Р°РїСѓСЃРєР° РїРѕРёСЃРєР° РЅСѓР¶РЅС‹С… РІРµС‰РµР№\">';
	bi2_fml.appendChild(bi2_link);
}


   */