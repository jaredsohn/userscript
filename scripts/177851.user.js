// ==UserScript==
// @name           Troop Filter
// @author         Dale McKay 
// @namespace      TW
// @description    Gives you the ability to filter troops from / Overviews->Combined Screen / Overviews->Production Screen / Overviews->Troops Screen
// @include        http://ae*.tribalwars.ae/game.php?*&screen=overview_villages*
// @include        http://us*.tribalwars.us/game.php?*&screen=overview_villages*
// @version        1.0
// ==/UserScript==

/* 
	Author	: Dale McKay
	Email	: dalesmckay@gmail.com
	Notes	: thanks to slowtarget for some initial ideas/functions
	
	TODO	:
		* Apply Field Sorting
		* Perform validation on Popup Filter Criteria values
		* See if possible to combine with Overviews->Troops screen to get armies that may be out of the village
		* Import/Export Filter(s)
		* Persist Filter(s)
		* Add a TotalHaul column
		
	BUGS	:
		* Overviews->Troops does not handle Defenses and Support properly (sub-row issue)


	######################
	Client Launcher (live):
	######################
	
javascript:(window.main||self).$.getScript('http://dl.dropbox.com/u/25377948/twscripts/table_filter.js');void(0);

OR

javascript:(window.main||self).$.getScript('http://crosstrigger.com/tw/v7/table_filter.js');void(0);

____________________________________________________________

Copyright (C) 2010 Dale McKay, all rights reserved
version 1.0, 8 April 2010

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________

*/

	
var script={
	id:'81564259-EA9A-44C1-94D9-06166430968B',
	name:'Table Filter Script',
	version:7.7,
	minGameVersion:7.00,
	author:{
		name:'dalesmckay',
		email:'dalesmckay@gmail.com',
		url:'http://www.crosstrigger.com',
	},
	credit:'(Based on the original Sort Script concept by: <span style="color:blue;">SlowTarget</span>)',
	runOnce:true
};

function fnPrint(msg){$("body").append("<span>"+msg+"</span><br/>");}

// sendMethod = "GET" || "POST", params = json, type = xml,json,text
function fnAjaxRequest(url,sendMethod,params,type){
	var error=null,payload=null;

	$.ajax({
		"async":false,
		"url":url,
		"data":params,
		"dataType":type,
		"type":String(sendMethod||"GET").toUpperCase(),
		"error":function(req,status,err){error="ajax: " + status;},
		"success":function(data,status,req){payload=data;}
	});

	if(error){
		throw(error);
	}

	return payload;
}

function fnCreateConfig(name){return $(fnAjaxRequest("/interface.php","GET",{"func":name},"xml")).find("config");}
function fnCreateBuildingConfig(){return fnCreateConfig("get_build_info");}
function fnCreateUnitConfig(){return fnCreateConfig("get_unit_info");}
function fnCreateWorldConfig(){return fnCreateConfig("get_config");}

function fnHasArchers(){return (parseInt(win.game_data.worldConfig.find("game archer").text()||"0",10)>0);}
function fnHasChurch(){return (parseInt(win.game_data.worldConfig.find("game church").text()||"0",10)>0);}
function fnHasNotebook(){return ($('[src*="note.png"],[class*="note-icon"]').length>0);}
function fnHasPaladin(){return (parseInt(win.game_data.worldConfig.find("game knight").text()||"0",10)>0);}
function fnHasMilitia(){return (win.game_data.unitConfig.find("militia").length>0);}

function fnPrintVersion(){
	var authorURL=script.author.url?('<a href="'+script.author.url+'" target="_blank">'+script.author.name+'</a>'):script.author.name;
		
	fnPrint("");
	fnPrint("=========================");
	fnPrint(authorURL + "'s " + script.name + ": v" + script.version.toFixed(2) + (script.credit?('<br/>'+script.credit):''));
	fnPrint("=========================");
	fnPrint($.trim($('.server_info').text().match(/\|\s*(.+)/)[1]));
	fnPrint("Account: "+win.game_data.player.name);
	fnPrint("Premium: "+(win.game_data.isPremium?"yes":"no"));
	fnPrint("Church : "+(fnHasChurch()?"yes":"no"));
	fnPrint("Statue : "+(fnHasPaladin()?"yes":"no"));
	fnPrint("Archer : "+(fnHasArchers()?"yes":"no"));
	fnPrint("Militia: "+(fnHasMilitia()?"yes":"no"));
	fnPrint("Notes  : "+(fnHasNotebook()?"yes":"no"));
	fnPrint("Sitter : "+((parseInt(win.game_data.player.sitter_id||'0',10)>0)?("yes - "+win.game_data.player.sitter_id):"no"));
	fnPrint("=========================");
	fnPrint("Version: "+win.game_data.version);
	fnPrint("World  : "+win.game_data.world);
	fnPrint("Screen : "+win.game_data.screen);
	fnPrint("Mode   : "+win.game_data.mode);
	fnPrint("URL    : "+win.location.href);
	fnPrint("Browser: "+navigator.userAgent);
	fnPrint("=========================");
	
	return true;
}

function fnRefreshVillageCount(){
	var villageCount=$('table.overview_table tr td a:[href*="screen=overview"]').length;
	var $hdr=$('table.overview_table tr:eq(0) th:eq('+(fnHasNotebook()?1:0)+')');
	//$hdr.html(($hdr.html()||'').replace(/(\w+\s*\()\d+/,'$1'+villageCount));
	$hdr.text(($hdr.text()||'').replace(/\d+/,villageCount));
}

function fnCreateCombinedFilterCriteriaPopup(){
	var unitDesc = {
		"spear":"Spear fighter",
		"sword":"Swordsman",
		"axe":"Axeman",
		"archer":"Archer",
		"spy":"Scout",
		"light":"Light cavalry",
		"marcher":"Mounted archer",
		"heavy":"Heavy cavalry",
		"ram":"Ram",
		"catapult":"Catapult",
		"knight":"Paladin",
		"snob":"Nobleman",
		"militia":"Militia"
	};
	
	var popupHeight = 650;
	if(fnHasArchers()){
		popupHeight += 25*2;
	}
	if(fnHasPaladin()){
		popupHeight += 25;
	}
	if(fnHasMilitia()){
		popupHeight += 25;
	}

	var docSource = "";
	docSource += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n";
	docSource += "<html>\n";
	docSource += "\t<head>\n";
	docSource += "\t\t<title>" + script.author.name + "'s - " + script.name + "</title>\n";
	docSource += "\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>\n";				

	//docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + window.location.hostname + "/style.php?type=game&amp;stamm_new_menu&amp;stamm&amp;overview&amp;1273236925\"/>\n";
	docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + window.location.hostname + "/merged/game.css\"/>\n";

	docSource += "\t</head>\n";
	docSource += "\n";
	docSource += "\t<body onBeforeUnload=\"self.opener.popupFilterCriteria=null;\" onBlur=\"self.close();\">\n";
	docSource += "\t\t<table align=\"center\"><tr><td>\n";
	docSource += "\t\t\t<table class=\"content-border\"><tr><td>\n";
	docSource += "\t\t\t\t<table class=\"main\" width=\"100%\" align=\"center\">\n";
	docSource += "\t\t\t\t\t<tr>\n";
	docSource += "\t\t\t\t\t\t<td id=\"content_value\">\n";
	docSource += "\t\t\t\t\t\t\t<h2>" + script.name + " <sup><span style=\"font-size:small;\">v" + script.version.toFixed(2) + "</span></sup><sub><span style=\"font-weight:bold;font-style:italic;text-decoration:none;font-size:x-small;\"><a href=\"" + script.author.url + "\" target=\"_blank\"> by " + script.author.name + "</a></span></sub></h2>\n";
	docSource += "\t\t\t\t\t\t\t<hr>\n";

	docSource += "\t\t\t\t\t\t\t<table align=\"center\">\n";
	docSource += "\t\t\t\t\t\t\t\t<tr style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<th>Column</th><th>Min</th><th>Max</th>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	
	
	// Create Unit Content.
	var count=0;
	$(win.game_data.unitConfig).children().each(function(i,e){
		var unit = e.nodeName;
		docSource += "\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\" style=\"white-space:nowrap;\">\n";
		docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/unit/unit_" + unit + ".png?1\" alt=\"\"/><span>" + unitDesc[unit] + "</span></td>\n";
		docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_" + unit + "\" id=\"min_" + unit + "\" size=\"5\" maxlength=\"5\"/></td>\n";
		docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_" + unit + "\" id=\"max_" + unit + "\" size=\"5\" maxlength=\"5\"/></td>\n";
		docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	});
	
	// Create a Separator.
	docSource += "\t\t\t\t\t\t\t\t<tr><td colspan=\"3\"><hr></td></tr>\n";
	
	// Create Continent Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><span>Village Name</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td colspan=\"2\"><input type=\"text\" name=\"village_name\" id=\"village_name\" size=\"12\" maxlength=\"32\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><span>Continent</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_continent\" id=\"min_continent\" size=\"5\" maxlength=\"2\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_continent\" id=\"max_continent\" size=\"5\" maxlength=\"2\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	// Create a Separator.
	docSource += "\t\t\t\t\t\t\t\t<tr><td colspan=\"3\"><hr></td></tr>\n";
	
	// Create Haul Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/max_loot/1.png?1\" alt=\"\"/><span>Haul</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_haul\" id=\"min_haul\" size=\"5\" maxlength=\"8\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_haul\" id=\"max_haul\" size=\"5\" maxlength=\"8\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	// Create a Separator.
	docSource += "\t\t\t\t\t\t\t\t<tr><td colspan=\"3\"><hr></td></tr>\n";
	
	// Create Farm Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/farm.png?1\" alt=\"\"/><span>Farm (avail)</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_farm\" id=\"min_farm\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_farm\" id=\"max_farm\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/farm.png?1\" alt=\"\"/><span>Farm (level)</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_farm_lvl\" id=\"min_farm_lvl\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_farm_lvl\" id=\"max_farm_lvl\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	
	// Create Market Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/market.png?1\" alt=\"\"/><span>Market (avail)</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_market\" id=\"min_market\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_market\" id=\"max_market\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/market.png?1\" alt=\"\"/><span>Market (total)</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_market_tot\" id=\"min_market_tot\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_market_tot\" id=\"max_market_tot\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	
	docSource += "\t\t\t\t\t\t\t</table>\n";
	docSource += "\t\t\t\t\t\t\t<br/>\n";
	docSource += "\t\t\t\t\t\t\t<hr>\n";
	docSource += "\t\t\t\t\t\t\t<div align=\"right\"><input type=\"button\" name=\"filter\" value=\"Apply Filter\" style=\"font-size:10pt;\" onClick=\"self.opener.fnFilterCombined();self.close();\"></div>\n";
	docSource += "\t\t\t\t\t\t\t<br/>\n";

	docSource += "\t\t\t\t\t\t</td>\n";
	docSource += "\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t</table>\n";
	docSource += "\t\t\t</table>\n";
	docSource += "\t\t</table>\n";					
	docSource += "\t</body>\n";
	docSource += "</html>\n";


	var popup=window.open('about:blank','dalesmckay_tw_troopfilter','width=320,height=' + popupHeight + ',scrollbars=yes');
	popup.document.open('text/html','replace');
	popup.document.write(docSource);
	popup.document.close();
	
	if (!popup.opener){
		popup.opener = self;
	}

	return popup;
}

function fnCreateProductionFilterCriteriaPopup(){
	var popupHeight = 550;
	if(fnHasArchers()){
		popupHeight += 25*2;
	}
	if(fnHasPaladin()){
		popupHeight += 25;
	}
	if(fnHasMilitia()){
		popupHeight += 25;
	}

	var docSource = "";
	docSource += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n";
	docSource += "<html>\n";
	docSource += "\t<head>\n";
	docSource += "\t\t<title>" + script.author.name + "'s - " + script.name + "</title>\n";
	docSource += "\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>\n";				

	//docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + window.location.hostname + "/style.php?type=game&amp;stamm_new_menu&amp;stamm&amp;overview&amp;1273236925\"/>\n";
	docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + window.location.hostname + "/merged/game.css\"/>\n";

	docSource += "\t</head>\n";
	docSource += "\n";
	docSource += "\t<body onBeforeUnload=\"self.opener.popupFilterCriteria=null;\" onBlur=\"self.close();\">\n";
	docSource += "\t\t<table align=\"center\"><tr><td>\n";
	docSource += "\t\t\t<table class=\"content-border\"><tr><td>\n";
	docSource += "\t\t\t\t<table class=\"main\" width=\"100%\" align=\"center\">\n";
	docSource += "\t\t\t\t\t<tr>\n";
	docSource += "\t\t\t\t\t\t<td id=\"content_value\">\n";
	docSource += "\t\t\t\t\t\t\t<h2>" + script.name + " <sup><span style=\"font-size:small;\">v" + script.version.toFixed(2) + "</span></sup><sub><span style=\"font-weight:bold;font-style:italic;text-decoration:none;font-size:x-small;\"><a href=\"" + script.author.url + "\" target=\"_blank\"> by " + script.author.name + "</a></span></sub></h2>\n";
	docSource += "\t\t\t\t\t\t\t<hr>\n";

	docSource += "\t\t\t\t\t\t\t<table align=\"center\">\n";
	docSource += "\t\t\t\t\t\t\t\t<tr style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<th>Column</th><th>Min</th><th>Max</th>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	// TODO: Support Churches & Statues, etc...

	// Create Points Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><span>Points</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_points\" id=\"min_points\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_points\" id=\"max_points\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	// Create a Separator.
	docSource += "\t\t\t\t\t\t\t\t<tr><td colspan=\"3\"><hr></td></tr>\n";
	
	// Create Resources Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/holz.png?1\" alt=\"\"/><span>Wood</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_wood\" id=\"min_wood\" size=\"5\" maxlength=\"6\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_wood\" id=\"max_wood\" size=\"5\" maxlength=\"6\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/lehm.png?1\" alt=\"\"/><span>Clay</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_clay\" id=\"min_clay\" size=\"5\" maxlength=\"6\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_clay\" id=\"max_clay\" size=\"5\" maxlength=\"6\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/eisen.png?1\" alt=\"\"/><span>Iron</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_iron\" id=\"min_iron\" size=\"5\" maxlength=\"6\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_iron\" id=\"max_iron\" size=\"5\" maxlength=\"6\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	// Create a Separator.
	docSource += "\t\t\t\t\t\t\t\t<tr><td colspan=\"3\"><hr></td></tr>\n";
	
	// Create Warehouse Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/storage.png?1\" alt=\"\"/><span>Warehouse</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_warehouse\" id=\"min_warehouse\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_warehouse\" id=\"max_warehouse\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	// Create a Separator.
	docSource += "\t\t\t\t\t\t\t\t<tr><td colspan=\"3\"><hr></td></tr>\n";

	// Create Market Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/market.png?1\" alt=\"\"/><span>Market (avail)</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_market\" id=\"min_market\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_market\" id=\"max_market\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/market.png?1\" alt=\"\"/><span>Market (total)</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_market_tot\" id=\"min_market_tot\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_market_tot\" id=\"max_market_tot\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	// Create Farm Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/farm.png?1\" alt=\"\"/><span>Farm (used)</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_farm\" id=\"min_farm\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_farm\" id=\"max_farm\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/farm.png?1\" alt=\"\"/><span>Farm (total)</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_farm_lvl\" id=\"min_farm_lvl\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_farm_lvl\" id=\"max_farm_lvl\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	docSource += "\t\t\t\t\t\t\t</table>\n";
	docSource += "\t\t\t\t\t\t\t<br/>\n";
	docSource += "\t\t\t\t\t\t\t<hr>\n";
	docSource += "\t\t\t\t\t\t\t<div align=\"right\"><input type=\"button\" name=\"filter\" value=\"Apply Filter\" style=\"font-size:10pt;\" onClick=\"self.opener.fnFilterProduction();self.close();\"></div>\n";
	docSource += "\t\t\t\t\t\t\t<br/>\n";

	docSource += "\t\t\t\t\t\t</td>\n";
	docSource += "\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t</table>\n";
	docSource += "\t\t\t</table>\n";
	docSource += "\t\t</table>\n";					
	docSource += "\t</body>\n";
	docSource += "</html>\n";


	var popup=window.open('about:blank','dalesmckay_tw_troopfilter','width=320,height=' + popupHeight + ',scrollbars=yes');
	popup.document.open('text/html','replace');
	popup.document.write(docSource);
	popup.document.close();
	
	if (!popup.opener){
		popup.opener = self;
	}

	return popup;
}

function fnCreateTroopsFilterCriteriaPopup(){
	var unitDesc = {
		"spear":"Spear fighter",
		"sword":"Swordsman",
		"axe":"Axeman",
		"archer":"Archer",
		"spy":"Scout",
		"light":"Light cavalry",
		"marcher":"Mounted archer",
		"heavy":"Heavy cavalry",
		"ram":"Ram",
		"catapult":"Catapult",
		"knight":"Paladin",
		"snob":"Nobleman",
		"militia":"Militia"
	};
	
	var popupHeight = 465;
	if(fnHasArchers()){
		popupHeight += 25*2;
	}
	if(fnHasPaladin()){
		popupHeight += 25;
	}
	if(fnHasMilitia()){
		popupHeight += 25;
	}

	var docSource = "";
	docSource += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n";
	docSource += "<html>\n";
	docSource += "\t<head>\n";
	docSource += "\t\t<title>" + script.author.name + "'s - " + script.name + "</title>\n";
	docSource += "\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>\n";				

	//docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + window.location.hostname + "/style.php?type=game&amp;stamm_new_menu&amp;stamm&amp;overview&amp;1273236925\"/>\n";
	docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + window.location.hostname + "/merged/game.css\"/>\n";

	docSource += "\t</head>\n";
	docSource += "\n";
	docSource += "\t<body onBeforeUnload=\"self.opener.popupFilterCriteria=null;\" onBlur=\"self.close();\">\n";
	docSource += "\t\t<table align=\"center\"><tr><td>\n";
	docSource += "\t\t\t<table class=\"content-border\"><tr><td>\n";
	docSource += "\t\t\t\t<table class=\"main\" width=\"100%\" align=\"center\">\n";
	docSource += "\t\t\t\t\t<tr>\n";
	docSource += "\t\t\t\t\t\t<td id=\"content_value\">\n";
	docSource += "\t\t\t\t\t\t\t<h2>" + script.name + " <sup><span style=\"font-size:small;\">v" + script.version.toFixed(2) + "</span></sup><sub><span style=\"font-weight:bold;font-style:italic;text-decoration:none;font-size:x-small;\"><a href=\"" + script.author.url + "\" target=\"_blank\"> by " + script.author.name + "</a></span></sub></h2>\n";
	docSource += "\t\t\t\t\t\t\t<hr>\n";

	if((eleDoc.location.search.search("units_type")<0)||(eleDoc.location.search.search("units_type=complete")>=0)){
		docSource += "\n";
		docSource += "\t\t\t\t\t\t\t<span style=\"font-weight: bold;\">Location: </span><select id=\"locationSelector\" name=\"locationSelector\">\n";
		docSource += "\t\t\t\t\t\t\t\t<option>Your own</option>\n";
		docSource += "\t\t\t\t\t\t\t\t<option>In the village</option>\n";
		docSource += "\t\t\t\t\t\t\t\t<option>Outwards</option>\n";
		docSource += "\t\t\t\t\t\t\t\t<option>In transit</option>\n";
		docSource += "\t\t\t\t\t\t\t</select>\n";
		docSource += "\t\t\t\t\t\t\t<br/><br/>\n";
		
		popupHeight+=20;
	}

	docSource += "\t\t\t\t\t\t\t<table align=\"center\">\n";
	docSource += "\t\t\t\t\t\t\t\t<tr style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<th>Unit</th><th>Min</th><th>Max</th>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	
	
	// Create Unit Content.
	var count=0;
	$(win.game_data.unitConfig).children().each(function(i,e){
		var unit = e.nodeName;
		docSource += "\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\" style=\"white-space:nowrap;\">\n";
		docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/unit/unit_" + unit + ".png?1\" alt=\"\"/><span>" + unitDesc[unit] + "</span></td>\n";
		docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_" + unit + "\" id=\"min_" + unit + "\" size=\"5\" maxlength=\"5\"/></td>\n";
		docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_" + unit + "\" id=\"max_" + unit + "\" size=\"5\" maxlength=\"5\"/></td>\n";
		docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	});

	// Create a Separator.
	docSource += "\t\t\t\t\t\t\t\t<tr><td colspan=\"3\"><hr></td></tr>\n";
	
	// Create Haul Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/max_loot/1.png?1\" alt=\"\"/><span>Haul</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_haul\" id=\"min_haul\" size=\"5\" maxlength=\"8\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_haul\" id=\"max_haul\" size=\"5\" maxlength=\"8\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	docSource += "\t\t\t\t\t\t\t</table>\n";
	docSource += "\t\t\t\t\t\t\t<br/>\n";
	docSource += "\t\t\t\t\t\t\t<hr>\n";
	docSource += "\t\t\t\t\t\t\t<div align=\"right\"><input type=\"button\" name=\"filter\" value=\"Apply Filter\" style=\"font-size:10pt;\" onClick=\"self.opener.fnFilterTroops();self.close();\"></div>\n";
	docSource += "\t\t\t\t\t\t\t<br/>\n";

	docSource += "\t\t\t\t\t\t</td>\n";
	docSource += "\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t</table>\n";
	docSource += "\t\t\t</table>\n";
	docSource += "\t\t</table>\n";					
	docSource += "\t</body>\n";
	docSource += "</html>\n";


	var popup=window.open('about:blank','dalesmckay_tw_troopfilter','width=320,height=' + popupHeight + ',scrollbars=yes');
	popup.document.open('text/html','replace');
	popup.document.write(docSource);
	popup.document.close();
	
	if (!popup.opener){
		popup.opener = self;
	}

	return popup;
}

function fnCreateBuildingsFilterCriteriaPopup(){
	var popupHeight = 630;
	if(fnHasArchers()){
		popupHeight += 25*2;
	}
	if(fnHasPaladin()){
		popupHeight += 25;
	}

	var docSource = "";
	docSource += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n";
	docSource += "<html>\n";
	docSource += "\t<head>\n";
	docSource += "\t\t<title>" + script.author.name + "'s - " + script.name + "</title>\n";
	docSource += "\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>\n";				

	//docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + window.location.hostname + "/style.php?type=game&amp;stamm_new_menu&amp;stamm&amp;overview&amp;1273236925\"/>\n";
	docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + window.location.hostname + "/merged/game.css\"/>\n";

	docSource += "\t</head>\n";
	docSource += "\n";
	docSource += "\t<body onBeforeUnload=\"self.opener.popupFilterCriteria=null;\" onBlur=\"self.close();\">\n";
	docSource += "\t\t<table align=\"center\"><tr><td>\n";
	docSource += "\t\t\t<table class=\"content-border\"><tr><td>\n";
	docSource += "\t\t\t\t<table class=\"main\" width=\"100%\" align=\"center\">\n";
	docSource += "\t\t\t\t\t<tr>\n";
	docSource += "\t\t\t\t\t\t<td id=\"content_value\">\n";
	docSource += "\t\t\t\t\t\t\t<h2>" + script.name + " <sup><span style=\"font-size:small;\">v" + script.version.toFixed(2) + "</span></sup><sub><span style=\"font-weight:bold;font-style:italic;text-decoration:none;font-size:x-small;\"><a href=\"" + script.author.url + "\" target=\"_blank\"> by " + script.author.name + "</a></span></sub></h2>\n";
	docSource += "\t\t\t\t\t\t\t<hr>\n";

	docSource += "\t\t\t\t\t\t\t<table align=\"center\">\n";
	docSource += "\t\t\t\t\t\t\t\t<tr style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<th>Column</th><th>Min</th><th>Max</th>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	

	// TODO: Support Churches & Statues, etc...
	// TODO: Refactor

	// Create Points Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><span>Points</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_points\" id=\"min_points\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_points\" id=\"max_points\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";

	// Create Buildings Content.
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_a\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/main.png?1\" alt=\"\"/><span>Headquarters</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_headquarters\" id=\"min_headquarters\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_headquarters\" id=\"max_headquarters\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/barracks.png?1\" alt=\"\"/><span>Barracks</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_barracks\" id=\"min_barracks\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_barracks\" id=\"max_barracks\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/stable.png?1\" alt=\"\"/><span>Stable</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_stable\" id=\"min_stable\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_stable\" id=\"max_stable\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/garage.png?1\" alt=\"\"/><span>Workshop</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_workshop\" id=\"min_workshop\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_workshop\" id=\"max_workshop\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/snob.png?1\" alt=\"\"/><span>Academy</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_academy\" id=\"min_academy\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_academy\" id=\"max_academy\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/smith.png?1\" alt=\"\"/><span>Smithy</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_smithy\" id=\"min_smithy\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_smithy\" id=\"max_smithy\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/place.png?1\" alt=\"\"/><span>Rally point</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_rallypoint\" id=\"min_rallypoint\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_rallypoint\" id=\"max_rallypoint\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/market.png?1\" alt=\"\"/><span>Market</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_market\" id=\"min_market\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_market\" id=\"max_market\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/wood.png?1\" alt=\"\"/><span>Timber camp</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_wood\" id=\"min_wood\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_wood\" id=\"max_wood\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/stone.png?1\" alt=\"\"/><span>Clay pit</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_clay\" id=\"min_clay\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_clay\" id=\"max_clay\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/iron.png?1\" alt=\"\"/><span>Iron mine</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_iron\" id=\"min_iron\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_iron\" id=\"max_iron\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/farm.png?1\" alt=\"\"/><span>Farm</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_farm\" id=\"min_farm\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_farm\" id=\"max_farm\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/storage.png?1\" alt=\"\"/><span>Warehouse</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_warehouse\" id=\"min_warehouse\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_warehouse\" id=\"max_warehouse\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/hide.png?1\" alt=\"\"/><span>Hiding place</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_hidingplace\" id=\"min_hidingplace\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_hidingplace\" id=\"max_hidingplace\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t\t\t\t\t<tr class=\"row_b\" style=\"white-space:nowrap;\">\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><img src=\"http://" + window.location.hostname + "/graphic/buildings/wall.png?1\" alt=\"\"/><span>Wall</span></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"min_wall\" id=\"min_wall\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t\t<td><input type=\"text\" name=\"max_wall\" id=\"max_wall\" size=\"5\" maxlength=\"5\"/></td>\n";
	docSource += "\t\t\t\t\t\t\t\t</tr>\n";
	
	docSource += "\t\t\t\t\t\t\t</table>\n";
	docSource += "\t\t\t\t\t\t\t<br/>\n";
	docSource += "\t\t\t\t\t\t\t<hr>\n";
	docSource += "\t\t\t\t\t\t\t<div align=\"right\"><input type=\"button\" name=\"filter\" value=\"Apply Filter\" style=\"font-size:10pt;\" onClick=\"self.opener.fnFilterBuildings();self.close();\"></div>\n";
	docSource += "\t\t\t\t\t\t\t<br/>\n";

	docSource += "\t\t\t\t\t\t</td>\n";
	docSource += "\t\t\t\t\t</tr>\n";
	docSource += "\t\t\t\t</table>\n";
	docSource += "\t\t\t</table>\n";
	docSource += "\t\t</table>\n";					
	docSource += "\t</body>\n";
	docSource += "</html>\n";


	var popup=window.open('about:blank','dalesmckay_tw_troopfilter','width=320,height=' + popupHeight + ',scrollbars=yes');
	popup.document.open('text/html','replace');
	popup.document.write(docSource);
	popup.document.close();
	
	if (!popup.opener){
		popup.opener = self;
	}

	return popup;
}

function fnFilterCombined(){
	try{
		var ii;
		var startIndex=(fnHasNotebook())?1:0;
		var cellOffset=((fnHasChurch())?8:7)+startIndex;
		var criteriaArray=[],criteria,value;
		var eleInputArray=popupFilterCriteria.document.getElementsByTagName("input");
		
		// Ignore the Filter Button.
		var index = 0;	
		criteriaArray[index] = {min:-1,max:-1,mask:""};
		for(ii=0;ii<(eleInputArray.length-1);ii++){
			if(eleInputArray[ii].name.match(/min\_/i)){
				if(eleInputArray[ii].value){
					criteriaArray[index].min = parseInt(eleInputArray[ii].value,10);
				}
			}
			else{
				if(eleInputArray[ii].name.match(/max\_/i)&&eleInputArray[ii].value){
					criteriaArray[index].max = parseInt(eleInputArray[ii].value,10);
				}
				else if(eleInputArray[ii].value){
					criteriaArray[index].mask = eleInputArray[ii].value;
				}

				if(ii<(eleInputArray.length-1-1)){
					index++;
					criteriaArray[index] = {min:-1,max:-1,mask:""};
				}
			}
		}

		var eleTable=eleDoc.getElementById("combined_table");
		var row,cell,eleRow,eleCell,strData,totalHaul;
		for(row=eleTable.rows.length-1; row>0; row--){
			eleRow=eleTable.rows[row];
			
			// Filter by Farm Level Criteria.
			criteria = criteriaArray[criteriaArray.length - 3];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[cellOffset-1];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)\s*\((\d+)/)[2],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}
			
			// Filter by Farm Available Criteria.
			criteria = criteriaArray[criteriaArray.length - 4];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[cellOffset-1];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)\s*\((\d+)/)[1],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}

			// Filter by Market Total Criteria.
			criteria = criteriaArray[criteriaArray.length - 1];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[eleRow.cells.length-1];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)\/(\d+)/)[2],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}	
				
			// Filter by Market Available Criteria.
			criteria = criteriaArray[criteriaArray.length - 2];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[eleRow.cells.length-1];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)\/(\d+)/)[1],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}

			// Filter by Continent Criteria.
			criteria = criteriaArray[criteriaArray.length - 6];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[startIndex+0];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/\)\s*K(\d+)/i)[1],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}
			
			// Filter by Village Name Criteria.
			criteria = criteriaArray[criteriaArray.length - 7];
			if(criteria.mask){
				eleCell=eleRow.cells[startIndex+0];
				strData=$(eleCell).text();
				if(criteria.mask && !strData.match(criteria.mask)){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}
			
			// Filter by Unit Criteria.
			totalHaul = 0;
			for(cell=cellOffset;cell<(eleRow.cells.length-1);cell++){
				criteria=criteriaArray[cell-cellOffset];			
				eleCell=eleRow.cells[cell];
				strData=$(eleCell).text();
				value=parseInt(strData,10);
				totalHaul += value * unitCapacity[cell-cellOffset];
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					eleRow = null; // Ensure Filter by Haul Criteria is ignored.
					break;
				}
			}

			// Filter by Haul Criteria
			if(eleRow){
				criteria = criteriaArray[criteriaArray.length - 5];
				if(((criteria.min >= 0) && (totalHaul < criteria.min)) || ((criteria.max >= 0) && (totalHaul > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					//continue;
				}
			}
		}
		
		fnRefreshVillageCount();
		
		var strFilter = "";
		criteriaArray.forEach(function(item,index,array){strFilter += "{" + item.min + "," + item.max + "," + item.mask + "} ";}); // criteriaArray.join(",")
		fnPrint("Filter applied: " + strFilter);
		//fnPrint("Filter applied: " + JSON.stringify(criteriaArray));
	}
	catch(objError){
		fnPrint("ERROR: " + String(objError.message||objError));
	}
}

function fnFilterProduction(){
	try{
		var ii;
		var startIndex=(fnHasNotebook())?1:0;
		var cellOffset=startIndex + 1;
		var criteriaArray=[],criteria,value;
		var eleInputArray=popupFilterCriteria.document.getElementsByTagName("input");
		
		// Ignore the Filter Button.
		var index = 0;	
		for(ii=0;ii<(eleInputArray.length-1);ii += 2){
			criteriaArray[index] = {min:-1,max:-1};
			
			if(eleInputArray[ii+0].value){
				criteriaArray[index].min = parseInt(eleInputArray[ii+0].value,10);
			}
			
			if(eleInputArray[ii+1].value){
				criteriaArray[index].max = parseInt(eleInputArray[ii+1].value,10);
			}	
				
			index++;
		}
		
		var eleTable=eleDoc.getElementById("production_table");
		var row,cell,eleRow,eleCell,strData;
		for(row=eleTable.rows.length-1; row>0; row--){
			eleRow=eleTable.rows[row];
			
			// Filter by Farm Total Criteria.
			criteria = criteriaArray[criteriaArray.length - 1];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[startIndex+5];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)\/(\d+)/)[2],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}
			
			// Filter by Farm Used Criteria.
			criteria = criteriaArray[criteriaArray.length - 2];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[startIndex+5];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)/)[1],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}
			
			// Filter by Market Total Criteria.
			criteria = criteriaArray[criteriaArray.length - 3];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[startIndex+4];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)\/(\d+)/)[2],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}

			// Filter by Market Available Criteria.
			criteria = criteriaArray[criteriaArray.length - 4];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[startIndex+4];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)/)[1],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}
			
			// Filter by Warehouse Criteria.
			criteria = criteriaArray[criteriaArray.length - 5];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[startIndex+3];
				strData=$(eleCell).text();
				value=parseInt(strData.match(/(\d+)/)[1],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					continue;
				}
			}
			
			// Filter by Resource Criteria.
			eleCell=eleRow.cells[startIndex+2];
			strData=$(eleCell).text();
			value=strData.replace(/\./ig,"").match(/\d+/g);
			value[0] = parseInt(value[0],10);
			value[1] = parseInt(value[1],10);
			value[2] = parseInt(value[2],10);
			if((((criteriaArray[1].min >= 0) && (value[0] < criteriaArray[1].min)) || ((criteriaArray[1].max >= 0) && (value[0] > criteriaArray[1].max))) ||
			   (((criteriaArray[2].min >= 0) && (value[1] < criteriaArray[2].min)) || ((criteriaArray[2].max >= 0) && (value[1] > criteriaArray[2].max))) ||
			   (((criteriaArray[3].min >= 0) && (value[2] < criteriaArray[3].min)) || ((criteriaArray[3].max >= 0) && (value[2] > criteriaArray[3].max)))){
				eleRow.parentNode.removeChild(eleRow);
				continue;
			}

			// Filter by Points Criteria.
			criteria = criteriaArray[0];
			if((criteria.min >= 0) || (criteria.max >= 0)){
				eleCell=eleRow.cells[startIndex+1];
				strData=$(eleCell).text();
				value=parseInt(strData.replace(/\./ig,"").match(/(\d+)/)[1],10);
				if(((criteria.min >= 0) && (value < criteria.min)) || ((criteria.max >= 0) && (value > criteria.max))){
					eleRow.parentNode.removeChild(eleRow);
					//continue;
				}
			}
		}
		
		fnRefreshVillageCount();
		
		var strFilter = "";
		criteriaArray.forEach(function(item,index,array){strFilter += "{" + item.min + "," + item.max + "} ";}); // criteriaArray.join(",")
		fnPrint("Filter applied: " + strFilter);
		//fnPrint("Filter applied: " + JSON.stringify(criteriaArray));
	}
	catch(objError){
		fnPrint("ERROR: " + String(objError.message||objError));
	}
}

function fnFilterTroops(){
	try{
		var ii;
		var showCombo=(eleDoc.location.search.search("units_type")<0)||(eleDoc.location.search.search("units_type=complete")>=0);
		var isDefenseOrSupport=(eleDoc.location.search.search(/units_type=support_detail|units_type=away_detail/)>=0);
		var rowOffset=(showCombo)?5:(isDefenseOrSupport)?1:2;
		var cellOffset=(isDefenseOrSupport)?2:1;
		
		var criteriaArray=[];
		var eleInputArray=popupFilterCriteria.document.getElementsByTagName("input");

		// Ignore the Filter Button.
		var index = 0;	
		for(ii=0;ii<(eleInputArray.length-1);ii += 2){
			criteriaArray[index] = {min:-1,max:-1};
			
			if(eleInputArray[ii+0].value){
				criteriaArray[index].min = parseInt(eleInputArray[ii+0].value,10);
			}
			
			if(eleInputArray[ii+1].value){
				criteriaArray[index].max = parseInt(eleInputArray[ii+1].value,10);
			}	
				
			index++;
		}
			
		var comboIndex=(showCombo?popupFilterCriteria.document.getElementById("locationSelector").selectedIndex:0);


		// Number of Columns - VillageColumn - ActionColumn.
		var colCount = $("#units_table thead th").length - 2;
				
		$("#units_table tbody").each(function(row,eleRow){
			var totalHaul = 0;
			var removeRow = false;
			
			$(eleRow).find("td:not(:has(>a)):gt("+(colCount*comboIndex+1)+"):lt("+(colCount-1)+")").each(function(cell,eleCell){
				// Filter by Unit Criteria.
				var strData=$(eleCell).text();
				var troopCount=parseInt(strData,10);
				totalHaul += troopCount * unitCapacity[cell];
				var criteria=criteriaArray[cell];
				if(((criteria.min >= 0) && (troopCount < criteria.min)) || ((criteria.max >= 0) && (troopCount > criteria.max))){
					removeRow = true;
				}
			});

			// Filter by Haul Criteria
			criteria = criteriaArray[criteriaArray.length - 1];
			if(((criteria.min >= 0) && (totalHaul < criteria.min)) || ((criteria.max >= 0) && (totalHaul > criteria.max))){
				removeRow = true;
			}

			if(removeRow){
				eleRow.parentNode.removeChild(eleRow);
			}
		});

		fnRefreshVillageCount();

		var unitsType={"own_home":"Your own","there":"In the village","away":"Outwards","moving":"In transit","support_detail":"Defenses","away_detail":"Support"};
		var location=(showCombo)?popupFilterCriteria.document.getElementById("locationSelector")[comboIndex].value:unitsType[eleDoc.location.search.match(/units_type\=(.*)/)[1]];

		var strFilter = "";
		criteriaArray.forEach(function(item,index,array){strFilter += "{" + item.min + "," + item.max + "} ";}); // criteriaArray.join(",")
		fnPrint("Filter applied: " + strFilter + " (" + location + ")");
		//fnPrint("Filter applied: " + JSON.stringify(criteriaArray) + " (" + location + ")");
	}
	catch(objError){
		fnPrint("ERROR: " + String(objError.message||objError||"unKnown"));
	}
}

function fnFilterBuildings(){
	try{
		alert("Under Construction\nComing Soon...\nmost probably");
	}
	catch(objError){
		fnPrint("ERROR: " + String(objError.message||objError));
	}
}


try{
	var win=(window.main||self),$=win.$;



	// Check Permissions.
	if(win.game_data.world=='zz2'){
		if([16467].indexOf(parseInt(win.game_data.player.id,10))<0){
			throw('Hi '+win.game_data.player.name+'!\n\nYour scripts have been disabled by dalesmckay\nSend him a mail if you wish to help with testing');
		}
	}




	var eleDoc=win.document;
		
	var scrape;
	var isMobileVersion=((scrape=$("head").html())?scrape.match(/type\=game&amp;(mobile)/i)!==null:false);
	if(isMobileVersion){
		throw('Mobile version not currently supported');
	}

	var hasGameDataSupport=(typeof(win.game_data)!="undefined");
	if(!hasGameDataSupport){
		win.game_data={};
		win.game_data.versionDumped=false;

		win.game_data.mode=(scrape=eleDoc.location.href.match(/&mode\=(\w+)/i))?scrape[1]:null;
		win.game_data.screen=(scrape=eleDoc.location.href.match(/&screen\=(\w+)/i))?scrape[1]:null;
		win.game_data.world=(scrape=eleDoc.location.href.match(/\/\/(\w+)\./i))?scrape[1]:null;

		win.game_data.version=(isMobileVersion)?"Mobile, Version=unKnown":"unKnown";
	}
	
	// HACK: fix null mode.
	if(!win.game_data.mode){
		var vmode=$('#overview_menu td[class="selected"] a').attr("href").match(/mode\=(\w*)/i);
		if(vmode){
			win.game_data.mode=vmode[1];
		}
	}
		
	win.game_data.isMobileVersion=isMobileVersion;
	win.game_data.isPremium=($("#quickbar_outer").length>0);

	if(typeof(win.game_data.worldConfig)=="undefined"){
		win.game_data.worldConfig=fnCreateWorldConfig();
	}

	if(typeof(win.game_data.unitConfig)=="undefined"){
		win.game_data.unitConfig=fnCreateUnitConfig();
	}

	if(typeof(win.game_data.versionDumped)=="undefined"){
		win.game_data.versionDumped=fnPrintVersion();
	}
	
	var unitCapacity=[];
	$(win.game_data.unitConfig).children().each(function(i,e){
		unitCapacity.push(parseInt($(e).find('carry').text()||'0',10));
	});
		
	var popupFilterCriteria=null;
	
	switch((win.game_data.mode||'').toLowerCase()){
		case 'combined':
			popupFilterCriteria=fnCreateCombinedFilterCriteriaPopup();
			break;
			
		case 'prod':
			popupFilterCriteria=fnCreateProductionFilterCriteriaPopup();
			break;
			
		case 'units':
			popupFilterCriteria=fnCreateTroopsFilterCriteriaPopup();
			break;
			
		case 'buildings':
			popupFilterCriteria=fnCreateBuildingsFilterCriteriaPopup();
			break;
			
		default:
			throw("This script must be run from:\n\t* Overviews->Combined Screen\n\t* Overviews->Production Screen\n\t* Overviews->Troops Screen");
	}
	
	void(0);
}
catch(objError){
	var dbgMsg='Error: ' + String(objError.message||objError);
	fnPrint(dbgMsg);
	alert(dbgMsg);
}