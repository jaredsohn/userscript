// ==UserScript==
// @name           Darwin's Load
// @namespace      Darwin's Load
// @description    Carga de Darwin's.
// @author         Monkey
// ==/UserScript==

var city_coord, island_coord, city_nam, island_id, city_id, city_idmainView;
var actioncode = getActionCode();

function overview_table() {
	VersionUpdate();
	if (ALERT_SOUNDS) AlertSounds();
	if (AUTO_REFRESH) AutoRefresh();
	if (PREMIUM_VIEW) showPremiumView();

	city_id = getCityId();
	island_coord = getIslandCoord();
	
	city_idmainView = getCityMainView();
	
	var city_coord_node = getNode("//div[@id='breadcrumbs']/*[@class='island' and contains(text(), '[')]", "");
	if (city_coord_node == null) {
  		city_coord_node = getNode("//a[contains(@href, '?view=island')]/span[contains(text(), '[')]", "");
  		if (city_coord_node != null) {
    	city_coord_node = city_coord_node.parentNode;
		}
	}
	island_id = "";
	city_coord = "";
	if (city_coord_node != null) {
		if (/(\[[0-9:]+\])/.exec(city_coord_node.innerHTML)) {
			city_coord = RegExp.$1;
			if (/[?&]id=([0-9]+)/.exec(city_coord_node.href) != null) {
				island_id = RegExp.$1;
			}
		}
	}
	if (island_id == "" && (/view=island&id=([0-9]+)/.exec(document.URL) != null)) { 
		island_id = RegExp.$1;
	}
	var body_id = $X("//body").id;
	log("server:"+server+", language:"+language+", city_id:"+city_id+", city_idmainView:"+city_idmainView+", city_coord:"+city_coord+", island_id:"+island_id + ", bodyid:"+body_id);
	log("time0: "+(new Date().getTime() - _startTime)+" msec");

	var res = getCity(city_id);
	res.wood   = getIntValue(getNodeValue("id('value_wood')"));
	res.wine   = getIntValue(getNodeValue("id('value_wine')"));
	res.marble = getIntValue(getNodeValue("id('value_marble')"));
	res.glass  = getIntValue(getNodeValue("id('value_crystal')"));
	res.sulfur = getIntValue(getNodeValue("id('value_sulfur')"));
	digProducedResources(res);

	var strpopulation = getNodeValue("//span[@id='value_inhabitants']");
	if (/\(([0-9,.]+)/.exec(strpopulation) != null) {
		res.population = getIntValue(strpopulation.match(/\(([\d,.]+)/)[1]);
		res.freeworkers = getIntValue(strpopulation.match(/^[\d,.]+/)[0]);
	} else {
		res.population = 0;
	}
	res.actions = getNodeValue("//span[@id='value_maxActionPoints']");
	if (city_idmainView > 0) {
		var res = getCity(city_idmainView);
		log("res.city_coord:"+city_coord);
		if (city_coord != "") {
			res.city_coord = city_coord;
		}
		if (island_id != "") {
			res.island_id = island_id;
		}
		if (body_id == "city" || /view=city/.test(document.URL)) {
			updateCityView(res);
		}
		// 市政府畫面
		if (body_id == "townHall" || /view=townHall/.test(document.URL)) {
			updatetownHall(res);
			predictPopulationOverfull();
		}
		// 檢視軍隊畫面
		if (/view=cityMilitary-(army|fleet)/.exec(document.URL) != null) {
			updateCityMilitary(res, RegExp.$1);
		}
		// 兵營、船埠
		if (/view=(barracks|shipyard)/.exec(document.URL) != null) {
			updateArmyFleet(res, RegExp.$1);
		}
		// 學院
		if(body_id=="academy" || /view=academy/.test(document.URL)) {
			updateAcademyView(res);
		}
		// 酒館
		if (body_id=="tavern" || /view=tavern/.test(document.URL)) {
			updateTavern(res);
		}
		// 港口畫面
		if(body_id=="port" || /view=port/.test(document.URL)) {
			updatePort(res);
		}


		// 目前升級的建築物
		if (true) {
			updateUnderConstruction(res);
		}
	} else {
		// 排名畫面
		if (body_id == "highscore" || /view=highscore/.test(document.URL)) {
			updateHighscore();
		}
	}
	// 島嶼畫面
	if(/view=island/.test(document.URL) || body_id == "island") {
		updateIslandView(res);
	}

	// Double map
	if(getCfgValue("DOUBLE_MAP", false) == true && (body_id=="worldmap_iso" || /view=worldmap_iso/.test(document.URL))) {
		var default_style2 = <><![CDATA[
			#worldmap_iso #scrollcover {height: 840px !important;}
			#worldmap_iso #dragHandlerOverlay {height: 900px !important;}
]]></>.toXMLString();
	   GM_addStyle(default_style2);
	}


	saveRes(res);
	
	renderTables();
		
	if (gameVersion()>="0.3.0") {
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = "/js/wz_tooltip.js";
		var body = getNode("//head");
		body.appendChild(script);
	}

	window.setInterval(TimeCounter, 1000);
	if (RESOURCE_COUNTER)
		window.setInterval(TimeResourceCounter, 1000);

	var time = new Date().getTime();
	saveConfig();
	log("time serialize: "+(new Date().getTime() - time)+" msec");
	if (getCfgValue("TABLE_PLAYERS", false) == true) {
  		var time = new Date().getTime();
  		savePlayers();
  		log("time uneval: "+(new Date().getTime() - time)+" msec");
	}

	var _endTime = new Date().getTime();
	log("total time: "+(_endTime - _startTime)+" msec");
}