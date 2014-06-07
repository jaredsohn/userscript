// ==UserScript==
        // @name                        Tabla de Tabla
        // @namespace                   Lord Script
        // @description                 Based on Overview and old Alarm And Overview Table.
        // @author                      Lord1982
        // ==/UserScript==
        
        function renderTables() {
        	langtype           = getLangtype();
        	language           = setLanguage();
        	buildings          = getBuildingsTexts();
        	texts              = getLocalizedTexts();
        	ALERT_SOUNDS       = getCfgValue("ALERT_SOUNDS", false); 
        	WARNING_VOLUME     = getCfgValue("WARNING_VOLUME", "50");
        	ALERT_VOLUME       = getCfgValue("ALERT_VOLUME", "100");
        	
        	AUTO_REFRESH       = getCfgValue("AUTO_REFRESH", false); 
        	AUTO_R_MIN         = getCfgValue("AUTO_REFRESH_MIN_SECS", 300);
        	AUTO_R_MAX         = getCfgValue("AUTO_REFRESH_MAX_SECS", 600);
        	
        	DEBUG_LOG          = getCfgValue("DEBUG_LOG", false); 
        	PROGRESS_BAR_MODE  = getCfgValue("PROGRESS_BAR_MODE", "time");
        	SETTING_EXPANDED   = getCfgValue("SETTING_EXPANDED", true);
        	PREMIUM_VIEW       = getCfgValue("PREMIUM_VIEW", true);
        	INLINESCORE        = getCfgValue("INLINESCORE", true);
        	RESOURCE_COUNTER   = getCfgValue("RESOURCE_COUNTER", true);
        	
        	TECH_LETTERCHUTE   = getCfgValue("TECH_LETTERCHUTE", true);
        	TECH_PULLEY        = getCfgValue("TECH_PULLEY", true);
        	TECH_GEOMETRY      = getCfgValue("TECH_GEOMETRY", true);
        	TECH_SPIRITLEVEL   = getCfgValue("TECH_SPIRITLEVEL", true);
        	
               	TABLE_RESOURCES    = getCfgValue("TABLE_RESOURCES", true);
        	TABLE_CITIES       = getCfgValue("TABLE_CITIES", true);
        	TABLE_BUILDINGS    = getCfgValue("TABLE_BUILDINGS", true);
        	TABLE_ARMYFLEET    = getCfgValue("TABLE_ARMYFLEET", true);
        	TABLE_RESEARCH     = getCfgValue("TABLE_RESEARCH", true);
        	TABLE_TRANSPORTERS = getCfgValue("TABLE_TRANSPORTERS", false);
        	TABLE_PLAYERS      = getCfgValue("TABLE_PLAYERS", false);
        	
        	PLAYERS_NORMAL     = getCfgValue("PLAYERS_NORMAL", false);
        	PLAYERS_INACTIVITY = getCfgValue("PLAYERS_INACTIVITY", false);
        	PLAYERS_BANNED     = getCfgValue("PLAYERS_BANNED", false);
        	PLAYERS_VACATION   = getCfgValue("PLAYERS_VACATION", false);
        	
        	GM_addStyle(getCfgValueNonEmpty("CSS", default_style));
        
        	var s = "";
            log("TABLE: "+(new Date().getTime() - _startTime)+" msec");
        	if (TABLE_RESOURCES) {
        		s += ResourcesTable();
        	}
        	log("TABLE_RESOURCES: "+(new Date().getTime() - _startTime)+" msec");
        	if (TABLE_CITIES) {
        		s += CitiesTable();
        	}
        	log("TABLE_CITIES: "+(new Date().getTime() - _startTime)+" msec");
        	if (TABLE_BUILDINGS) {
        		s += BuildingsTalbe();
        	}
        	log("TABLE_BUILDINGS: "+(new Date().getTime() - _startTime)+" msec");
        	if (TABLE_ARMYFLEET) {
        		if (config["unitnames"] != undefined) {
        			s += ArmyTable();
        		}
        	}
        	log("TABLE_ARMYFLEET: " + (new Date().getTime() - _startTime)+" msec");
        	if(TABLE_RESEARCH) {
        		s += ResearchTable();
        	}
        	log("TABLE_RESEARCH: " + (new Date().getTime() - _startTime)+" msec");
        	if(TABLE_TRANSPORTERS) {
        		s += TransportersTable();
        	}
        	log("TABLE_TRANSPORTERS: "+(new Date().getTime() - _startTime)+" msec");
        	
        	if (TABLE_PLAYERS) {
        		s += PlayersTable();
        	}
        	log("TABLE_PLAYERS: "+(new Date().getTime() - _startTime)+" msec");
        
        	// Overview Table start
        	var body = getNode("//body");
        	var table_mode = "new_table";
        	var span = document.getElementById("overview__table");
        	if (span == null) {
        		span = document.createElement('div');
        		span.id = "overview__table";
        		span.align = "center";
        		span.setAttribute("style", "clear: left;");
        		span.innerHTML = s;
        		body.appendChild(span);
        	} else {
        		span.innerHTML = s;
        		table_mode = "refresh_table";
        	}
        
        	// Resources Table
        	addResourceEvent();
        		
        	// Buildings Table
        	if (TABLE_BUILDINGS) {
        		addUpgradeBuildingEvent();
        	}
        	// Players table
        	if (TABLE_PLAYERS) {
        		addDeletePlayersEvent()
        	}
        	
        	log("TABLE_EVENT: "+(new Date().getTime() - _startTime)+" msec");
        
        	// Settings table
        	var t = document.createElement('table');
        	t.id = "table_settings";
        	t.setAttribute("style", "display: none; border-style: dotted; border-width: 1px; width:auto;");
        	t.setAttribute("align", "center");
        	
        	
            t.appendChild(createTitleRow(texts["SETTINGS_TITLE_STYLE"]));
        	t.appendChild(createRowChk(texts["INLINESCORE"]+":", "INLINESCORE", INLINESCORE));
        	t.appendChild(createRowChk(texts["PREMIUM_VIEW"]+":", "PREMIUM_VIEW", PREMIUM_VIEW));
            t.appendChild(createRowChk(texts["SETTING_EXPANDED"]+":", "SETTING_EXPANDED", SETTING_EXPANDED));
            t.appendChild(createRowChk(texts["RESOURCE_COUNTER"]+":", "RESOURCE_COUNTER", RESOURCE_COUNTER));
            t.appendChild(createRowSlct(texts["PROGRESS_BAR_MODE"]+":", "PROGRESS_BAR_MODE", PROGRESS_BAR_MODE, {off: texts["off"], time: texts["time"], percent: texts["percent"]}));
            t.appendChild(createRowSlct(texts["LANGUAGE"]+":", "LANGUAGE", language, langList));
            t.appendChild(createRowTxtr("CSS:", "CSS", getCfgValueNonEmpty("CSS", default_style), 5, 40));
            
            t.appendChild(createTitleRow(texts["SETTINGS_TITLE_TABLE"]));
            t.appendChild(createRowChk(texts["TABLE_RESOURCES"]+":", "TABLE_RESOURCES", TABLE_RESOURCES));
            t.appendChild(createRowChk(texts["TABLE_CITIES"]+":", "TABLE_CITIES", TABLE_CITIES));
            t.appendChild(createRowChk(texts["TABLE_BUILDINGS"]+":", "TABLE_BUILDINGS", TABLE_BUILDINGS));
            t.appendChild(createRowChk(texts["TABLE_ARMYFLEET"]+":", "TABLE_ARMYFLEET", TABLE_ARMYFLEET));
            t.appendChild(createRowChk(texts["TABLE_RESEARCH"]+":", "TABLE_RESEARCH", TABLE_RESEARCH));
            t.appendChild(createRowChk(texts["TABLE_TRANSPORT"]+":", "TABLE_TRANSPORTERS", TABLE_TRANSPORTERS));
            t.appendChild(createRowChk(texts["TABLE_PLAYERS"]+":", "TABLE_PLAYERS", TABLE_PLAYERS));
            
            t.appendChild(createTitleRow(texts["SETTINGS_TITLE_TECH"]));
            t.appendChild(createRowChk(texts["TECH_LETTERCHUTE"]+":", "TECH_LETTERCHUTE", TECH_LETTERCHUTE));
            t.appendChild(createRowChk(texts["TECH_PULLEY"]+":", "TECH_PULLEY", TECH_PULLEY));
            t.appendChild(createRowChk(texts["TECH_GEOMETRY"]+":", "TECH_GEOMETRY", TECH_GEOMETRY));
            t.appendChild(createRowChk(texts["TECH_SPIRITLEVEL"]+":", "TECH_SPIRITLEVEL", TECH_SPIRITLEVEL));
            
            
            t.appendChild(createTitleRow(texts["SETTINGS_TITLE_OPTIONS"]));
        	t.appendChild(createRowChk(texts["ALERT_SOUNDS"]+":", "ALERT_SOUNDS", ALERT_SOUNDS));
            t.appendChild(createRowInput(texts["ALERT_VOLUME"]+" (0 - 100):", "ALERT_VOLUME", ALERT_VOLUME));
            t.appendChild(createRowInput(texts["WARNING_VOLUME"]+" (0 - 100):", "WARNING_VOLUME", WARNING_VOLUME));
            t.appendChild(createRowChk(texts["AUTO_REFRESH"]+":", "AUTO_REFRESH", AUTO_REFRESH));
            t.appendChild(createRowInput(texts["AUTO_REFRESH_MIN_SECS"]+":", "AUTO_REFRESH_MIN_SECS", AUTO_R_MIN));
            t.appendChild(createRowInput(texts["AUTO_REFRESH_MAX_SECS"]+":", "AUTO_REFRESH_MAX_SECS", AUTO_R_MAX));
            
            t.appendChild(createTitleRow(texts["SETTINGS_PLAYERS_OPTIONS"]));
            t.appendChild(createRowChk(texts["PLAYERS_NORMAL"]+":", "PLAYERS_NORMAL", PLAYERS_NORMAL));
            t.appendChild(createRowChk(texts["PLAYERS_INACTIVITY"]+":", "PLAYERS_INACTIVITY", PLAYERS_INACTIVITY));
            t.appendChild(createRowChk(texts["PLAYERS_BANNED"]+":", "PLAYERS_BANNED ", PLAYERS_BANNED));
            t.appendChild(createRowChk(texts["PLAYERS_VACATION"]+":", "PLAYERS_VACATION", PLAYERS_VACATION));
        
            t.appendChild(createRowInput(texts["ownAlly"]+":", "ownAlly", getCfgValue("ownAlly", "")));
            t.appendChild(createRowInput(texts["friendlyAllies"]+":", "friendlyAllies", getCfgValue("friendlyAllies", "")));
            t.appendChild(createRowInput(texts["hostileAllies"]+":", "hostileAllies", getCfgValue("hostileAllies", "")));
            
        
            t.appendChild(createRowChk(texts["DEBUG_LOG"]+":", "DEBUG_LOG", DEBUG_LOG));
            
            var tr = document.createElement('tr');
            t.appendChild(tr);
            var td = document.createElement('td');
            tr.appendChild(td);
            td.setAttribute("colspan", "2");
            var buttonsPanel = document.createElement('div');
            td.appendChild(buttonsPanel);
            
            //save button
            var n = document.createElement('input');
            n.type = "button";
            n.value = texts["Refresh_table"];
            n.setAttribute("class", "button");
            n.setAttribute("style", "display: inline !important;");
            n.addEventListener("click", renderTables, false);
            buttonsPanel.appendChild(n);
        
            //reset button
            var n = document.createElement('input');
            n.type = "button";
            n.value = texts["Reset_all_data"];
            n.setAttribute("class", "button");
            n.setAttribute("style", "display: inline !important;");
            n.addEventListener("click", reset_all_data, false);
            buttonsPanel.appendChild(n);
        
            //reset button
            var n = document.createElement('input');
            n.type = "button";
            n.value = texts["Reset_players_data"];
            n.setAttribute("class", "button");
            n.setAttribute("style", "display: inline !important;");
            n.addEventListener("click", reset_players_data, false);
            buttonsPanel.appendChild(n);
        
            if (table_mode == "new_table") {
        		function show_hide_table() {
        			var n = document.getElementById("table_settings");
        			if (n.style.display == 'none') {
        				n.style.display = 'table';
        				this.value = texts["hide_settings"];
        			} else {
        				n.style.display = 'none';
        				this.value = texts["show_settings"];
        			}
        		}
              
        		var n = document.createElement('input');
        		n.type = "button";
        		n.value = texts["show_settings"];
        		n.setAttribute("class", "button");
        		n.addEventListener("click", show_hide_table, false);
        		body.appendChild(n);
        		body.appendChild(t);
        	}
        	TimeCounter();
        	TimeResourceCounter();
        	WineTime();
        }
        
        // è¨ˆç®—å»ºç¯‰æ‰€éœ€è³‡æºé‡
        function BuildingExpansionNeeds(name, level, res) {
        	if (costs[name]==undefined) return {};
        	var needs = costs[name][level];
        	var value = {};
        	var factor = 1.00;
        	if (TECH_PULLEY) factor -= 0.02; // Pulley
        	if (TECH_GEOMETRY) factor -= 0.04; // Geometry
        	if (TECH_SPIRITLEVEL) factor -= 0.08; // Spirit Level
        	var otherfactor = { "w":1.00, "W":1.00, "M":1.00, "C":1.00, "S":1.00 };
        	var otherbasicfactor = { "w":0.01, "W":0.01, "M":0.01, "C":0.01, "S":0.01 };
        	var otherbuild = { "w": "carpentering", "W": "vineyard", "M": "architect", "C": "optician", "S": "fireworker" };
        	if (gameVersion() >= "0.3.0") {
        		for(var key in otherbuild) {
        			if (res.buildings[otherbuild[key]]!=undefined) {
        				otherfactor[key] = otherfactor[key] - otherbasicfactor[key] * res.buildings[otherbuild[key]].level;
        			}
        		}
        	}
        	for (var r in needs)
        		switch (r) {
        			case "t": // no time discount
        				value[r] = needs[r];
        				break;
        			default:
        				value[r] = Math.floor(needs[r] * factor * otherfactor[r]);
        		}
        	return value;
        
        }
        // æª¢æŸ¥è³‡æºæ˜¯å¦å¯ä»¥æ›´æ–°
        function haveEnoughToUpgrade(cost, res) {
          have = currentResources(res);
          for (var resource in cost) {
            if (resource != "t" && have[resource] < cost[resource]) {
              return false;
            }
          }
          return true;
        }
        // æ•´ç†è³‡æºæ ¼å¼
        function currentResources(res) {
          return {
            p: res.freeworkers,
            P: res.population,
            g: res.gold,
            w: res.wood,
            W: res.wine,
            M: res.marble,
            G: res.glass,
            S: res.sulfur
          };
        }
        // å°‡å„è³‡æºè½‰æˆHTML
        function NeedsToStriing(cost) {
        	function replace(m, icon) {
        		icon = createImg(icons[icon]);
        		return icon;
        	}
        	if (isObject(cost)) {
        		var name = { g: "gold", p: "citizens", u: "upkeep", a: "attack", d: "defend", v: "speed",
                             w: "wood", M: "marble", C: "glass", W: "wine", S: "sulfur", t: "time" };
        		var html = []
        		for (var id in cost) {
        			var count = cost[id];
        			if (count < 0 && opt.nonegative)
        				count = 0;
        			if (name[id]) {
        				var str = "$"+ name[id]+" "+ count + ((name[id]=="upkeep") ? "<br>" : "");
        				html.push(str);
        			}
        		}
        		cost = html.join(" \xA0 ");
        	}
        	return cost.replace(/\$([a-z]{4,11})/g, replace);
        }
        
        // æ›´æ–°ç”¨é…’æ™‚é–“
        function WineTime() {
        	function countdown(td, s) {
        		var time = secsToDHMS(s, 0);
        		if (time != td.innerHTML) {
        			td.innerHTML = createTooltip(time, texts["empty"]+":"+resolveTime(s, 1));
        		}
        		var wait = s < 61 ? 1 : s % 60 + 1;
        		setTimeout(countdown, wait * 1e3, td, s - wait);
        	}
        	function wineConsumptionTime(total, rate) {
        		total = getIntValue(total);
        		rate = Math.abs(getFloatValue(rate));
        		if (!rate) return Infinity;
        		return Math.floor(3600 * total / rate);
        	}
        	function wineLasts(td) {
        		if (td.textContent) return;
        		var total = $X('preceding-sibling::td[2]', td).textContent;
        		var rate = $X('preceding-sibling::td[1]', td).textContent;
        		if (rate) {
        			var left = wineConsumptionTime(total, rate);
        			if (!isFinite(rate)) return;
        				countdown(td, left);
        		}
        	}
        	var td = $x('id("overview__table")/table[@class="resources_table"]/tbody/tr[not(@class="table_footer")]/td[@name="wine"]'); // W
        	if (td) td.map(wineLasts);
        }
        
        // åˆ‡æ›åŸŽéŽ®
        function changeCity(city_id) {
        	var postdata = getFormInput("//form[@id='changeCityForm']//input");
            postdata = postdata + "&cityId="+city_id+"&view=city";
        	var xmlhttp;
        	if(window.XMLHttpRequest){
            	xmlhttp = new XMLHttpRequest();
        	}
        	xmlhttp.open('POST','http://' + location.host + '/index.php',false);
        	xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
        	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        	xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
        	xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
        	xmlhttp.setRequestHeader('Cookie',document.cookie);
        	xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
        	xmlhttp.send(postdata);
        	var node = getDocument(xmlhttp.responseText);
        	return node.getElementsByTagName("input")[2].value;
        }
        
        function CheckMainCity(cityid) {
        	return (parseInt(city_id) == parseInt(cityid)) ? " current_city_highlight" : "";
        }
        
        function SumformatInt(value) {
        	value = parseInt(value);
        	return (value+"" != "NaN") ? value : 0;
        }
        
        
        // ç”¢ç”ŸåŸŽéŽ®ç¸½è¦½è¡¨
        function CitiesTable() {
        	var s = "";
        	var nodes = $x("//select[@id='citySelect']/option");
        	s += "<table border=1 class='resources_table'>";
        	s += "<tr class='table_header'>";
        	s += "<th class='table_header_city' colspan='1'>"+texts["cityName"]+"</th>";
        	s += "<th colspan=1 class='table_header "+langtype+"'>"+texts["Coordinate"]+"</th>";
        	s += "<th colspan=2 class='table_header "+langtype+"'>"+texts["Resource"]+"</th>";
        	s += "<th colspan=1 class='table_header "+langtype+"'>"+createTooltip(createImg(title_icons["ActionPoints"], "", 20),texts["ActionPoints"])+"</th>";
        	s += "<th colspan=2 class='table_header "+langtype+"'>"+createTooltip(createImg(title_icons["Population"], "", 20),texts["Population"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["FreeWorkers"], "", 20),texts["FreeWorkers"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["Woodworkers"], "", 20),texts["Woodworkers"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["Specialworkers"], "", 20),texts["Specialworkers"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["spy"], "", 20),texts["spy"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["scientists"], "", 20),texts["scientists"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["Happiness"], "", 20),texts["Happiness"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["Growth"], "", 20),texts["Growth"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["Incomegold"], "", 20),texts["Incomegold"])+"</th>";
        	s += "<th colspan=1 class='table_header'>"+createTooltip(createImg(title_icons["Corruption"], "", 20),texts["Corruption"])+"</th>";
        	s += "<th colspan=3 class='table_header "+langtype+"'>"+texts["currentlyBuilding"]+"</th>";
        	s += "</tr>";
        	
        	var sumres = {"actions":0, "population":0, "totalspace":0, "freeworkers":0, "woodworkers":0, "specialworkers":0,
        		          "spy":0, "scientists":0, "happiness":0, "gold":0,};
        
        	var currenttime = new Date().getTime();
        	for(var i = 0; i < nodes.length; i++) {
        		var city = nodes[i];
        		var res = getCity(city.value);
        		var happiness = res.happiness;
        		var population = parseInt(res.population);
        		var bonusspace = parseInt(res.bonusspace);
        		var townHallLevel = getArrValue(res.buildings["townHall"], "level", "-");
        		var spacetotal = townHallSpaces[townHallLevel];
        		if (happiness != "?") {
        			population = getEstimatedPopulation(population, res.prodtime, currenttime, happiness - population);
        			if (population > spacetotal + bonusspace) {
        				population = spacetotal + bonusspace;
        			}
        			happiness -= population;
        		}
        		// è¨ˆç®—äººå£æ»¿çš„æ™‚é–“
        		var growth = (happiness != "?") ? floatFormat(0.02 * happiness, 2, true) : "?";
        		var growthRemainingHours = "&#8734; "+texts["h"];  // é è¨­ç‚º âˆž é€™ç¬¦è™Ÿ
        		if (happiness != "?" && happiness > 0 && bonusspace != "?") {
        			growthRemainingHours = getGrowthRemainingHours(population, spacetotal + bonusspace, currenttime, happiness);
        		}
        		// è¨­å®šäººå£æ»¿æ™‚æ¨£å¼
        		var townHallStyle = (population >= spacetotal + bonusspace) ? " populationfull" : "";
        		
        		var cs = CheckMainCity(city.value);
        		var lfcs = langtype + CheckMainCity(city.value);
        		var spacetotal_title = (res.bonusspace != "?")
                                     ? spacetotal_title = mynumberformat(spacetotal + bonusspace)+ " ("+mynumberformat(spacetotal) + "+" + mynumberformat(bonusspace)+")"
                                     : spacetotal_title = mynumberformat(spacetotal) + " + ?";
                var strhappiness = "("+texts["Happiness"]+":"+happiness+" "+texts["Growth"]+":"+growth+" "+texts["full"]+":"+growthRemainingHours+")";
        		s += "<tr>";
        		s += "<td class='"+cs+"' align='left' style='font-weight: bold; padding-left: 3px;'>"+createLastUpdateAsTooltip(createLinkToCity(getCityName(city.innerHTML), city.value, i), res.prodtime) +"</td>";
        		s += "<td class='"+lfcs+"'>"+createLinkToForeignCity(res.city_coord, res.island_id, city.value)+"</td>";
        		s += "<td class='"+lfcs+"'>";
        			s += createLinkToResource(createImg(icons["wood"], "", 16), res.island_id, city.value, i)+" ";
        			s += createLinkToResource(res.woodlevel, res.island_id, city.value, i);
        		s += "</td>";
        		s += "<td class='"+cs+"'>";
        			s += createLinkToTradegoodCond(true, createImg(icons[res.type], "", 16), res.island_id, city.value, i)+" ";
        			s += createLinkToTradegoodCond(true, res.tradegoodlevel, res.island_id, city.value, i);
        		s += "</td>";
        		s += "<td class='"+lfcs+"'>"+createTooltip(res.actions, texts["ActionPoints"])+"</td>";
        		s += "<td class='"+lfcs+townHallStyle+"'>"+createTooltip(mynumberformat(population), "Max:"+spacetotal_title)+"</td>";
        		s += "<td class='"+cs+townHallStyle+"'>"+mynumberformat(spacetotal + bonusspace)+"</td>";
        		s += "<td class='"+cs+townHallStyle+"'>"+createTooltip(res.freeworkers, texts["FreeWorkers"]+strhappiness)+"</td>";
        		s += "<td class='"+cs+"'>"+createTooltip(res.woodworkers, texts["Woodworkers"])+"</td>";
        		s += "<td class='"+cs+"'>"+createTooltip(res.specialworkers, texts["Specialworkers"])+"</td>";
        		s += "<td class='"+cs+"'>"+createTooltip(res.spy, texts["spy"])+"</td>";
        		s += "<td class='"+cs+"'>"+createTooltip(res.scientists, texts["scientists"])+"</td>";
        		s += "<td class='"+cs+"'>"+createTooltip(happiness, texts["Happiness"])+"</td>";
        		s += "<td class='"+cs+"'>"+createTooltip(growth, growthRemainingHours)+"</td>";
        		s += "<td class='"+cs+"'>"+createTooltip(res.gold, texts["Growth"])+"</td>";
        		s += "<td class='"+cs+"'>"+createTooltip(res.corruption, texts["Corruption"])+"</td>";
        		s += "<td class='"+lfcs+"'>"+createTooltip(createImg(title_icons[res.underConstructionName], "", 16), (buildings[res.underConstructionName]!=undefined)?buildings[res.underConstructionName][1]:"")+"</td>";
        		s += "<td class='"+cs+"'>"+res.underConstructionLevel+"</td>";
        		s += "<td class='"+cs+"'>"+createTimeCounter(res.underConstructionTime)+"</td>";
        		s += "</tr>";
        		sumres.actions += SumformatInt(res.actions);   // è¡Œå‹•é»žæ•¸åŠ ç¸½
        		sumres.population += SumformatInt(population); // äººå£åŠ ç¸½
        		sumres.totalspace += SumformatInt(spacetotal + bonusspace); // æˆ¿å±‹ç¸½ç©ºé–“
        		sumres.freeworkers += SumformatInt(res.freeworkers); // ç©ºé–’äººå£
        		sumres.woodworkers += SumformatInt(res.woodworkers); // ä¼æœ¨äººå£
        		sumres.specialworkers += SumformatInt(res.specialworkers); // ç‰¹ç”¢äººå£
        		sumres.spy += SumformatInt(res.spy); // ç‰¹ç”¢äººå£
        		sumres.scientists += SumformatInt(res.scientists); // ç‰¹ç”¢äººå£
        		sumres.happiness += SumformatInt(happiness);   // æ°‘æ„åŠ ç¸½
        		sumres.gold += SumformatInt(res.gold);   // æ”¶å…¥åŠ ç¸½
        	}
            s += "<tr class='table_footer'>";
            s += "<td class='table_footer'>"+texts["summary"]+"</td>";
            s += "<td class='table_footer "+langtype+"'>"+"</td>";
            s += "<td class='table_footer "+langtype+"' colspan=2>"+"</td>"
            s += "<td class='table_footer "+langtype+"'>"+ sumres.actions +"</td>";
            s += "<td class='table_footer "+langtype+"'>"+sumres.population+"</td>";
            s += "<td class='table_footer'>"+sumres.totalspace+"</td>";
            s += "<td class='table_footer'>"+sumres.freeworkers+"</td>";
            s += "<td class='table_footer'>"+sumres.woodworkers+"</td>";
            s += "<td class='table_footer'>"+sumres.specialworkers+"</td>";
            s += "<td class='table_footer'>"+sumres.spy+"</td>";
            s += "<td class='table_footer'>"+sumres.scientists+"</td>";
            s += "<td class='table_footer'>"+sumres.happiness+"</td>";
            s += "<td class='table_footer'>"+floatFormat(0.02 * sumres.happiness, 2, true)+"</td>";
            s += "<td class='table_footer'>"+sumres.gold+"</td>";
            s += "<td class='table_footer'>"+"-"+"</td>";
            //s += "<td class='table_footer "+langtype+"' colspan=3>"+"</td>"
        	s += "<td class='table_footer "+langtype+"' colspan=3>"+createLink("<strong>Lord1982 Overview Table</strong>", scriptsite, "target='_blank'")+"</td>";
            s += "</tr>";
        	s += "</table>";
        	s += "<br>";
        	return s;
        }
        
        // ç”¢ç”Ÿè³‡æºç¸½è¦½è¡¨
        function ResourcesTable() {
        	var s = "";
        	var nodes = $x("//select[@id='citySelect']/option");
        	s += "<table border=1 class='resources_table'>";
        	s += "<tr class='table_header'>";
        	s += "<th class='table_header_city'>"+texts["cityName"]+"</th>";
        	s += "<th colspan=3 class='table_header "+langtype+"'>"+createTooltip(createImg(title_icons["wood"], "", 20), texts["wood"])+"</th>";
        	s += "<th colspan=3 class='table_header "+langtype+"'>"+createTooltip(createImg(title_icons["wine"], "", 20), texts["wine"])+"</th>";
        	s += "<th colspan=3 class='table_header "+langtype+"'>"+createTooltip(createImg(title_icons["marble"], "", 20), texts["marble"])+"</th>";
        	s += "<th colspan=3 class='table_header "+langtype+"'>"+createTooltip(createImg(title_icons["crystal"], "", 20), texts["crystal"])+"</th>";
        	s += "<th colspan=3 class='table_header "+langtype+"'>"+createTooltip(createImg(title_icons["sulfur"], "", 20), texts["sulfur"])+"</th>";
        	s += "<th colspan=1 class='table_header "+langtype+"'>"+texts["Action"]+"</th>";
            s += "</tr>";
            
        	var sumres = { "wood":0, "wine":0, "marble":0, "glass":0, "sulfur":0 };
        	var sumProd = { "wood":0, "wine":0, "marble":0, "glass":0, "sulfur":0, "wineUsage":0 };
        
        	var currenttime = new Date().getTime();
        	for(var i = 0; i < nodes.length; i++) {
        		var city = nodes[i];
        		var res = getCity(city.value);
        		// è¨ˆç®—ç”¨é…’é‡
        		var wineinfo = CalculateWineUsage(res);
        		var wineRemaining = wineinfo.usage - wineinfo.saving;
        		var wineRemainingHours = (wineRemaining > 0) ? floatFormat(getCurrentResourceAmount(currenttime, res.prodtime, res.wine, res.prodwine - wineRemaining) / wineRemaining, 1) + " "+ texts["h"] : "" ;
        		wineRemainingHours = wineRemainingHours + ((wineinfo.saving > 0) ? "<br> "+texts["Original"]+":"+wineinfo.usage+", "+texts["Saving"]+":"+wineinfo.saving : "");
        		var wineUsageHtml = (wineRemaining > 0) ? createProd(-1 * wineRemaining, wineRemainingHours, 2) : "";
        		// è¨ˆç®—å€‰åº«æœ€å¤§å€¼
        		var warehouseMax = CalculateWarehose(res);
        
        		var buttonenabled = (parseInt(city_id) != parseInt(city.value)) ? true: false;
        		var cs = CheckMainCity(city.value);
        		var lfcs = langtype + CheckMainCity(city.value);
        
        		s += "<tr>";
        		s += "<td class='"+cs+"' align='left' style='font-weight: bold; padding-left: 3px;'>"+createLastUpdateAsTooltip(createLinkToCity(getCityName(city.innerHTML), city.value, i), res.prodtime) +"</td>";
        		s += "<td class='"+lfcs+"'>"+createLinkToResource( createCounter(res.prodtime, res.wood, res.prodwood, false, warehouseMax.wood, ""), res.island_id, city.value, i) +"</td>";
        			s += "<td class='"+cs+"'>"+createProd(res.prodwood)+"</td>";
                	s += "<td class='"+cs+"'>"+createFillageTimes(res.prodwood, res.wood, warehouseMax.wood)+"</td>";
        		s += "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.type == "wine", createCounter(res.prodtime, res.wine, res.prodwine - wineRemaining, false, warehouseMax.other, ""), res.island_id, city.value, i) +"</td>";
        			s += "<td class='"+cs+"'>"+wineUsageHtml+"</td>";
        			s += "<td class='"+cs+"' name='wine'>"+createProd(res.prodwine)+"</td>";
        		s += "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.type == "marble", createCounter(res.prodtime, res.marble, res.prodmarble, false, warehouseMax.other, ""), res.island_id, city.value, i)+"</td>";
        			s += "<td class='"+cs+"'>"+createProd(res.prodmarble)+"</td>";
        			s += "<td class='"+cs+"'>"+createFillageTimes(res.prodmarble, res.marble, warehouseMax.other)+"</td>";
        		s += "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.type == "glass", createCounter(res.prodtime, res.glass, res.prodglass, false, warehouseMax.other, ""), res.island_id, city.value, i) +"</td>";
        			s += "<td class='"+cs+"'>"+createProd(res.prodglass)+"</td>";
        			s += "<td class='"+cs+"'>"+createFillageTimes(res.prodglass, res.glass, warehouseMax.other)+"</td>";
        		s += "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.type == "sulfur", createCounter(res.prodtime, res.sulfur, res.prodsulfur, false, warehouseMax.other, ""), res.island_id, city.value, i) +"</td>";
        			s += "<td class='"+cs+"'>"+createProd(res.prodsulfur)+"</td>";
        			s += "<td class='"+cs+"'>"+createFillageTimes(res.prodsulfur, res.sulfur, warehouseMax.other)+"</td>";
        		s += "<td class='"+lfcs+"'>";
        			s += createTooltip(createIconLink("transport", city.value, buttonenabled), texts["Transport"]);
        			s += createTooltip(createIconLink("move_army", city.value, buttonenabled), texts["DeploymentArmy"]);
        			s += createTooltip(createIconLink("move_fleet", city.value, buttonenabled), texts["DeploymentFleet"]);
        		s += "</td>";
        		s += "</tr>";
        		sumres.wood += getCurrentResourceAmount(currenttime, res.prodtime, res.wood, res.prodwood);
        		sumres.wine += getCurrentResourceAmount(currenttime, res.prodtime, res.wine, res.prodwine - wineRemaining);
        		sumres.marble += getCurrentResourceAmount(currenttime, res.prodtime, res.marble, res.prodmarble);
        		sumres.glass += getCurrentResourceAmount(currenttime, res.prodtime, res.glass, res.prodglass);
        		sumres.sulfur += getCurrentResourceAmount(currenttime, res.prodtime, res.sulfur, res.prodsulfur);
        		sumProd.wood += res.prodwood;
        		sumProd.wine += res.prodwine;
        		sumProd.marble += res.prodmarble;
        		sumProd.glass += res.prodglass;
        		sumProd.sulfur += res.prodsulfur;
        		sumProd.wineUsage += wineRemaining;
        	}
            s += "<tr class='table_footer'>";
            s += "<td class='table_footer'>"+texts["summary"]+"</td>";
            s += "<td class='table_footer "+langtype+"'>"+createCounter(currenttime, sumres.wood, sumProd.wood)+"</td>";
        	s += "<td class='table_footer'>"+createProd(sumProd.wood)+"</td>";
        	s += "<td class='table_footer'></td>";
        	s += "<td class='table_footer "+langtype+"'>"+createCounter(currenttime, sumres.wine, sumProd.wine - sumProd.wineUsage, true)+"</td>";
        	s += "<td class='table_footer'>"+createProd(-1 * sumProd.wineUsage)+"</td>";
        	s += "<td class='table_footer'>"+createProd(sumProd.wine)+"</td>";
        	s += "<td class='table_footer "+langtype+"'>"+createCounter(currenttime, sumres.marble, sumProd.marble)+"</td>";
        	s += "<td class='table_footer'>"+createProd(sumProd.marble)+"</td>";
        	s += "<td class='table_footer'></td>";
        	s += "<td class='table_footer "+langtype+"'>"+createCounter(currenttime, sumres.glass, sumProd.glass)+"</td>";
        	s += "<td class='table_footer'>"+createProd(sumProd.glass)+"</td>";
        	s += "<td class='table_footer'></td>";
        	s += "<td class='table_footer "+langtype+"'>"+createCounter(currenttime, sumres.sulfur, sumProd.sulfur)+"</td>";
        	s += "<td class='table_footer'>"+createProd(sumProd.sulfur)+"</td>";
        	s += "<td class='table_footer'></td>";
        	s += "<td class='table_footer "+langtype+"' colspan=1 style='font-weight: normal;'>"+createLink("<strong>Lord1982 Overview Table</strong>", scriptsite, "target='_blank'")+"</td>";
         	s += "</tr>";
            s += "</table>";
            s += "<br>";
        	return s;
        }
        
        // ç”¢ç”Ÿå»ºç¯‰ç¸½è¦½è¡¨
        function BuildingsTalbe() {
        	var s = "";
        	var nodes = $x("//select[@id='citySelect']/option");
        	var usedIndexes = [];
        	var buildingsCount = [];
        	for(var i = 0; i < nodes.length; i++) {
        		var city = nodes[i];
        		var res = getCity(city.value);
        		for(key in buildings) {
        			var level = getArrValue(res.buildings[key], "level", "-");
        			var link = getArrValue(res.buildings[key], "link", "-");
        			var count = getArrValue(res.buildings[key], "count", "0");
        			if (level != "-") {
        				usedIndexes[key] = true;
        				if (buildingsCount[key] == undefined || buildingsCount[key] < count) {
        					buildingsCount[key] = count;
        				}
        			}
        		}
        	}
        	s += "<table border=1 class='buildings_table'>";
        	s += "<tr class='table_header'><th class='table_header_city'>"+texts["cityName"]+"</th>";
        	var firstStyle = langtype;
        	var body_id = $X("//body").id;
        	for(key in buildings) {
        		if (usedIndexes[key]) {
        			var currentBuildingStyle = "";
        			if (key == body_id) {
        				currentBuildingStyle = " current_building";
        			}
        			for (var i=0; i<buildingsCount[key]; i++) {
        				s += "<th colspan='2' class='"+firstStyle+currentBuildingStyle+" table_header'>"+createTooltip(createImg(title_icons[key], "", 40), buildings[key][0])+"</th>";
        			}
        			firstStyle = "";
        		}
        	}
        	s += "</tr>";
        	for(var i = 0; i < nodes.length; i++) {
        		var city = nodes[i];
        		var res = getCity(city.value);
        		var cs = CheckMainCity(city.value);
        		var lfcs = langtype + CheckMainCity(city.value);
        		cs = (city_idmainView > 0) ? ((parseInt(city_idmainView) == parseInt(city.value)) ? "current_city_highlight" : "") : cs;
        		s += "<td class='"+cs+"' align='left' style='font-weight: bold; padding-left: 3px;'>"+createLastUpdateAsTooltip(createLinkToCity(getCityName(city.innerHTML), city.value, i), res.prodtime) +"</td>";
        		var firstStyle = langtype;
        		for(key in buildings) {
        			if (usedIndexes[key]) {
        				list = getArrValue(res.buildings[key], "list", []);
        				for(var j=0; j<buildingsCount[key]; j++) {
        					s += createBuildingItem(res, key, list[j], firstStyle, city, cs);
        					firstStyle = "";
        				}
        			}
        		}
        		s += "</tr>";
        	}
            s += "</table>";
            s += "<br>";
        	return s;
        }
        
        // ç”¢ç”Ÿè»éšŠç¸½è¦½è¡¨
        function ArmyTable() {
        	var s = "";
        	var nodes = $x("//select[@id='citySelect']/option");
        	
        	var names = config["unitnames"];
        	var usedIndexes = [];
        	var usedIndexesCount = 0;
        	for(var i = 0; i < nodes.length; i++) {
        		var city = nodes[i];
        		var res = getCity(city.value);
        		for(key in names) {
        			if (parseInt(getArrValue(getArrValue(res.units, key), "count", 0)) > 0) {
        				usedIndexes[key] = 1;
        				usedIndexesCount++;
        			}
        		}
        	}
        	if (usedIndexesCount > 0) {
        		s += "<table border=1 class='army_table'>";
        		s += "<tr class='table_header'><th class='table_header_city'>"+texts["cityName"]+"</th>";
        		for(key in names) {
        			var name = names[key];
        			if (usedIndexes[key] == 1) {
        				var info = name+"<br>"+NeedsToStriing(unit_cost[key]);
        				s += "<th colspan=2 class='table_header "+langtype+"'>"+createTooltip(createImg(title_icons[key]), info, texts["unitInfo"])+"</th>";
        			}
        		}
        		s += "<th colspan=2 class='table_header "+langtype+"'>"+texts["summary"]+"</th>";
        		s += "</tr>";
        		var sum = [];
        		var sumPoint = [];
        		for(var i = 0; i < nodes.length; i++) {
        			var city = nodes[i];
        			var res = getCity(city.value);
        			s += "</tr>";
        			var cs = CheckMainCity(city.value);
        			cs = (city_idmainView > 0) ? ((parseInt(city_idmainView) == parseInt(city.value)) ? "current_city_highlight" : "") : cs;
        			s += "<td class='"+cs+"' align='left' style='font-weight: bold; padding-left: 3px;'>"+createLastUpdateAsTooltip(createLinkToCity(getCityName(city.innerHTML), city.value, i), res.prodtime) +"</td>";
        			var citySum = 0;
        			var citySumPoint = 0;
        			for(key in names) {
        				if (usedIndexes[key] == 1) {
        					var level = getIntValue(getArrValue(getArrValue(res.units, key), "count", "0"), 0);
        					if (level == 0) {
        						level = "-";
        					} else {
        						sum[key] = (sum[key] == undefined) ? level : sum[key] + level;
        						citySum += level;
        					}
        					var pointPerUnit = getArrValue(config["unitpoints"], key, "0");
        					var point = "";
        					if (pointPerUnit == 0 || level == "-") {
        					} else {
        						point = pointPerUnit * level;
        						sumPoint[key] = (sumPoint[key] == undefined) ? point : sumPoint[key] + point;
        						citySumPoint += point;
        						point = createTooltip(mynumberformat(point), level + " * " + mynumberformat(pointPerUnit) + " "+texts["Point"]);
        					}
        					s += "<td class='"+cs+" "+langtype+"'>"+mynumberformat(level)+"</td>";
        					s += "<td class='"+cs+"'>"+point+"</td>";
        				}
        			}
        			s += "<td class='lf table_footer "+cs+"'>"+(citySum != 0 ? mynumberformat(citySum) : "-")+"</td>";
        			s += "<td class='table_footer "+cs+"'>"+(citySumPoint != 0 ? mynumberformat(citySumPoint) : "-")+"</td>";
        			s += "</tr>";
        		}
        		s += "<tr class='table_footer'>";
        		s += "<td class='table_footer'>"+texts["summary"]+"</td>";
        		var citySum = 0;
        		var citySumPoint = 0;
        		for(key in names) {
        			if (usedIndexes[key] == 1) {
        				s += "<td class='table_footer "+langtype+"'>"+mynumberformat(sum[key])+"</td>";
        				s += "<td class='table_footer'>"+mynumberformat(sumPoint[key])+"</td>";
        				citySum += sum[key];
        				citySumPoint += sumPoint[key];
        			}
        		}
        		s += "<td class='table_footer "+langtype+"'>"+mynumberformat(citySum)+"</td>";
        		s += "<td class='table_footer'>"+mynumberformat(citySumPoint)+"</td>";
        		s += "</tr>";
        		s += "</table>";
        		s += "<br>";
        	}
            s += "</table>";
            s += "<br>";
        	return s;
        }
        
        // ç”¢ç”Ÿç ”ç©¶ç¸½è¦½è¡¨
        function ResearchTable() {
        	var s = "";
        	var nodes = $x("//select[@id='citySelect']/option");
        	s += "<table border=1 class='research_table'>";
        	s += "<tr class='table_header'>";
        	s += "<th class='table_header_city'>"+texts["cityName"]+"</th>";
        	s += "<th class='table_header "+langtype+"'>"+texts["constructionLevel"]+"</th>";
        	s += "<th colspan=2 class='table_header "+langtype+"'>"+texts["scientists"]+"</th>";
            s += "<th class='table_header "+langtype+"'>"+texts["production"]+"</th>";
        	s += "<th class='table_header "+langtype+"'>"+texts["costs"]+"</th>";
        	s += "<th class='table_header "+langtype+"'></th>";
            s += "</tr>";
            var sSum=0,sMaxSum=0,eSum=0;
        	for(var i = 0; i < nodes.length; i++) {
        		var city = nodes[i];
        		var res = getCity(city.value);
        		s += "<tr>";
        		var cs = CheckMainCity(city.value);
        		var lfcs = langtype + CheckMainCity(city.value);
        		var level = getArrValue(res.buildings["academy"], "level", "-");
        		var link = getArrValue(res.buildings["academy"], "link", "-");
        		var linkText = (level!="-"&&link!="-") ? createLink(level, link) : level;
        		var scientists = getIntValue(res.scientists, 0);
        		var scientistText = (scientistText != 0) ? scientists : "-";
        		var efficiency = getIntValue(res.efficiency, 0);
        		var currentMax = (level!='-') ? currentMax = academyCapacities[level]: 0;
        		var cost = (TECH_LETTERCHUTE) ? 7 :8;
              	var linkGoText = (link!='-') ? createLink(texts["goTo"]+buildings["academy"][1], link) : "";
        
        		s += "<td class='"+cs+"' align='left' style='font-weight: bold; padding-left: 3px;'>"+createLastUpdateAsTooltip(createLinkToCity(getCityName(city.innerHTML), city.value, i), res.prodtime) +"</td>";
        		s += "<td class='"+cs+" "+langtype+"'>"+linkText+"</td>";
        		s += "<td class='"+lfcs+"'>"+scientistText+"</td>";
        		s += "<td class='"+cs+"'>"+currentMax+"</td>";
        		s += "<td class='"+lfcs+"'>"+createProd(efficiency)+"</td>";
        		s += "<td class='"+lfcs+"'>"+createProd(-cost*scientists)+"</td>";
        		s += "<td class='"+lfcs+"'>"+linkGoText+"</td>";
        		s += "</tr>";
        		sSum += scientists;
        		sMaxSum += currentMax
        		eSum += efficiency;
        	}
        	s += "<tr class='table_footer'>";
        	s += "<td class='table_footer'>"+texts["summary"]+"</td>";
        	s += "<td class='table_footer "+langtype+"'></td>";
        	s += "<td class='table_footer "+langtype+"'>"+sSum+"</td>";
        	s += "<td class='table_footer'>"+sMaxSum+"</td>";
        	s += "<td class='table_footer "+langtype+"'>"+createProd(eSum)+"</td>";
        	s += "<td class='table_footer "+langtype+"'>"+createProd(-cost*sSum)+"</td>";
        	s += "<td class='table_footer "+langtype+"'></td>";
        	s += "</tr>";
            s += "</table>";
            s += "<br>";
        	return s;
        }
        
        // ç”¢ç”Ÿé‹è¼¸ç¸½è¦½è¡¨
        function TransportersTable() {
        	var s = "";
        	var nodes = $x("//select[@id='citySelect']/option");
        
        	s += "<table border=1 class='transporters_table'>";
        	s += "<tr class='table_header'>";
        	s += "<th class='table_header_city'>"+texts["cityName"]+"</th>";
        	s += "<th class='table_header "+langtype+"'>"+texts["StartCity"]+"</th>";
        	s += "<th class='table_header "+langtype+"'>"+texts["DestinationCity"]+"</th>";
        	s += "<th class='table_header "+langtype+"'>"+texts["wood"]+"</th>";
        	s += "<th class='table_header'>"+texts["wine"]+"</th>";
        	s += "<th class='table_header'>"+texts["marble"]+"</th>";
        	s += "<th class='table_header'>"+texts["crystal"]+"</th>";
        	s += "<th class='table_header'>"+texts["sulfur"]+"</th>";
        	s += "<th class='table_header "+langtype+"'>"+texts["Mission"]+"</th>";
        	s += "<th class='table_header "+langtype+"'>"+texts["FinishTime"]+"</th>";
            s += "</tr>";
        	for(var i = 0; i < nodes.length; i++) {
        		var city = nodes[i];
        		var res = getCity(city.value);
        		var lastship={"wood":0,"wine":0,"marble":0,"glass":0,"sulfur":0};
        		var tavernLevel = getArrValue(res.buildings["tavern"], "level", "-");
        		var wineUsage = (res.wineUsage != undefined) ? res.wineUsage : (tavernLevel > 0 ? tavernWineUsage[tavernLevel] : 0);
        		var lastship={"wood":0,"wine":0,"marble":0,"glass":0,"sulfur":0};
        		var cs = CheckMainCity(city.value);
        		var lfcs = langtype + CheckMainCity(city.value);
        
        		if(res.incomingTransporters == undefined)
        			res.incomingTransporters = [];
        		for(var j = 0; j < res.incomingTransporters.length; j++) {
        			var transporter = res.incomingTransporters[j];
        			lastship["wood"] += transporter.res["wood"];
        			lastship["wine"] += transporter.res["wine"];
        			lastship["marble"] += transporter.res["marble"];
        			lastship["glass"] += transporter.res["glass"];
        			lastship["sulfur"] += transporter.res["sulfur"];
        			s += "<tr>";
        			if(j == 0)
        				s += "<td class='"+cs+"' rowspan='"+res.incomingTransporters.length+"' align='left' style='font-weight: bold; padding-left: 3px;'>"+createLastUpdateAsTooltip(createLinkToCity(getCityName(city.innerHTML), city.value, i), res.prodtime) +"</td>";
        			s += "<td class='"+lfcs+"'>"+transporter.startcity+"</td>";
        			s += "<td class='"+lfcs+"'>"+transporter.endcity+"</td>";
        			if (transporter.arriveTime>0) {
        				s += "<td class='"+lfcs+"'>"+createTooltip(transporter.res["wood"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["wood"]+res.wood, res.prodwood))+"</td>";
        				s += "<td class='"+cs+"'>"+createTooltip(transporter.res["wine"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["wine"] + res.wine, res.prodwine - wineUsage))+"</td>";
        				s += "<td class='"+cs+"'>"+createTooltip(transporter.res["marble"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["marble"] + res.marble, res.prodmarble))+"</td>";
        				s += "<td class='"+cs+"'>"+createTooltip(transporter.res["glass"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["glass"] + res.glass, res.prodglass))+"</td>";
        				s += "<td class='"+cs+"'>"+createTooltip(transporter.res["sulfur"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["sulfur"] + res.sulfur, res.prodsulfur))+"</td>";
        				s += "<td class='"+lfcs+"'>"+transporter.mission+"</td>";
        				s += "<td class='"+lfcs+"'>"+createTimeCounter(transporter.arriveTime)+"</td>";
        			} else {
        				s += "<td class='"+lfcs+"'>"+transporter.res["wood"]+"</td>";
        				s += "<td class='"+cs+"'>"+transporter.res["wine"]+"</td>";
        				s += "<td class='"+cs+"'>"+transporter.res["marble"]+"</td>";
        				s += "<td class='"+cs+"'>"+transporter.res["glass"]+"</td>";
        				s += "<td class='"+cs+"'>"+transporter.res["sulfur"]+"</td>";
        				s += "<td class='"+lfcs+"'>"+transporter.mission+"</td>";
        				s += "<td class='"+lfcs+"'>"+createTimeCounter(transporter.arriveTime)+"</td>";
        			}
        			s += "</tr>";
        		}
        	}
        	s += "</tr>";
            s += "</table>";
            s += "<br>";
        	return s;
        }
        
        // ç”¢ç”ŸçŽ©å®¶ç¸½è¦½è¡¨
        function PlayersTable() {
        	var s = "";
        	s += "<table border=1 class='players_table'>";
        	s += "<tr class='table_header'>";
        	s += "<th class='table_header' colspan=2 >"+texts["Players"]+"</th>";
        	s += "<th class='table_header'>"+texts["Alliance"]+"</th>";
        	s += "<th class='table_header'>"+texts["Score"]+"</th>";
        	s += "<th class='table_header_city "+langtype+"' colspan=3>"+texts["cityName"]+"</th>";
        	s += "<th class='table_header "+langtype+"' >"+texts["Action"]+"</th>";
        	s += "</tr>";
        	var select_cityid = getSelectCity();
        	var playerNames = [];
        	for(plname in players.playersCities) {
        		var itm = { name: plname, score: players.playersCities[plname].score };
        		playerNames[playerNames.length] = itm;
        	}
        	playerNames.sort( function(a,b){
        		var c = getIntValue(a.score);
        		var d = getIntValue(b.score);
        		return (c > d) ? -1 : ((c < d) ? 1 : 0);
        	});
        	var maxCityNum = 0;
            for(idx in playerNames) {
        		var plname = playerNames[idx].name;
        		var city_ids = players.playersCities[plname].cities;
        		var citystatus = players.playersCities[plname].citystatus;
        		if (citystatus == undefined) citystatus = "";
        		if (!PLAYERS_NORMAL && citystatus == "") continue;
        		if (!PLAYERS_INACTIVITY && citystatus == "inactivity") continue;
        		if (!PLAYERS_BANNED && citystatus == "banned") continue;
        		if (!PLAYERS_VACATION && citystatus == "vacation") continue;
        		var i=0;
        		for(id in city_ids) {
        			if (city_ids[id]) i++;
        		}
        		maxCityNum = (i>maxCityNum) ? i :maxCityNum;
        	}
            for(idx in playerNames) {
        		var plname = playerNames[idx].name;
        		var city_ids = players.playersCities[plname].cities;
        		var citystatus = players.playersCities[plname].citystatus;
        		if (citystatus == undefined) citystatus = "";
        		if (!PLAYERS_NORMAL && citystatus == "") continue;
        		if (!PLAYERS_INACTIVITY && citystatus == "inactivity") continue;
        		if (!PLAYERS_BANNED && citystatus == "banned") continue;
        		if (!PLAYERS_VACATION && citystatus == "vacation") continue;
        		var banner = (citystatus == "banned") ? "<img src=skin/icons/player_banned_14x14.gif>" : "";
        		var strattr = "class='deleteplayer' playername='"+plname+"' ";
        		var deletebutton = createImg("skin/advisors/military/icon_close_small.gif", strattr, 16);
        		var citystatushtml = (citystatus != "") ? citystatushtml = " class='"+citystatus+"' " : "";
        		var vacationenabled = (citystatus == "vacation") ? false: true;
        		var inactivityenabled = (citystatus == "vacation" || citystatus == "inactivity") ? false: true;
        		var ss = "";
        		var citynum = 0;
        		for(id in city_ids) {
        			if (city_ids[id]) {
        				var city = players.cities[id];
        				if (citynum!=0) ss += "<tr"+citystatushtml+">";
        				ss += "<td align='left' style='font-weight: bold; padding-left: 3px;' class='"+langtype+"'>"+createLinkToForeignCity(createTooltip(city.name, players.islands[city.island_id].coord), city.island_id, id)+"</td>";
        				ss += "<td>"+createLinkToForeignCity(players.islands[city.island_id].coord, city.island_id, id)+"</td>";
        				ss += "<td>"+city.size+"</td>";
        				ss += "<td class='"+langtype+"' align='left' style='font-weight: bold; padding-left: 3px;'>";
        				ss += createTooltip(createIconLink("transport", id, vacationenabled), texts["Transport"]);
        				ss += createTooltip(createIconLink("plunder", id, vacationenabled), texts["Plunder"]);
        				ss += createTooltip(createIconLink("blockade", id, vacationenabled), texts["Blockade"]);
        				ss += createTooltip(createIconLink("espionage", id, true, "", city.island_id), texts["Espionage"]);
        				ss += createTooltip(createIconLink("defend", id, inactivityenabled), texts["DefendCity"]);
        				ss += createTooltip(createIconLink("defend_port", id, inactivityenabled), texts["DefendPort"]);
        				ss += "</td>";
        				if (citynum!=0)
        					ss += "</tr>";
        				citynum++;
        			}
        		}
        		var rowspan = (citynum != 1) ? " rowspan='"+citynum+"' " : "";
        		s += "<tr"+citystatushtml+">";
        		s += "<td"+rowspan+" width='16px'>"+deletebutton+"</td>";
        		s += "<td"+rowspan+">"+banner+plname+"</td>";
        		s += "<td"+rowspan+">" + players.playersCities[plname].alliance + "</td>";
        		s += "<td"+rowspan+">" + players.playersCities[plname].score + "</td>";
        		s += ss;
        		s += "</tr>";
        	}
        	s += "</tr>";
            s += "</table>";
            s += "<br>";
        	return s;
        }
        
        // åŠ å…¥è³‡æºå ´äº‹ä»¶
        function addResourceEvent() {
        	var nodes = $x("//table[contains(@class, '_table')]//a[@class='AutoChange']");
        	for(var i=0; i<nodes.length; i++) {
        		if (city_idmainView != nodes[i].getAttribute("cityid"))
        			nodes[i].addEventListener('click', change_resourcetradegood, false);
        	}
        }
        
        // åˆ‡æ›è³‡æºå ´äº‹ä»¶
        function change_resourcetradegood(e) {
        	var obj = e.srcElement ? e.srcElement:e.target;
        	var city_id = obj.getAttribute("cityid");
        	if (obj.tagName=="FONT")
        		city_id = obj.parentNode.parentNode.getAttribute("cityid");
        	if (obj.tagName=="IMG")
        		city_id = obj.parentNode.getAttribute("cityid");
        	actioncode = changeCity(city_id);
        }
        
        // å¢žåŠ å‡ç´šæŒ‰éˆ•äº‹ä»¶
        function addUpgradeBuildingEvent() {
        	var nodes = $x("//table[@class='buildings_table']//img");
        	for(var i=0; i<nodes.length; i++) {
        		if (nodes[i].getAttribute("class") == "upgradelink") {
        			nodes[i].addEventListener('click', upgrade_building, false);
        		}
        	}
        }
        
        // å‡ç´šæŒ‰éˆ•äº‹ä»¶
        function upgrade_building(e) {
        	if (confirm(texts["Upgrade"] +":"+e.target.getAttribute("confirm")+"\n"+texts["UpgradeConfirm"])) {
        		var city_id = e.target.getAttribute("cityid");
        		actioncode = changeCity(city_id);
        		location.href = e.target.getAttribute("href")+"&actionRequest="+actioncode;
        	}
        }
        
        // å¢žåŠ åˆªé™¤çŽ©å®¶æŒ‰éˆ•äº‹ä»¶
        function addDeletePlayersEvent() {
        	var nodes = $x("//table[@class='players_table']//img");
        	for(var i=0; i<nodes.length; i++) {
        		if (nodes[i].getAttribute("class") == "deleteplayer") {
        			nodes[i].setAttribute("style", "cursor: pointer; display: block;");
        			nodes[i].addEventListener('click', delete_players, false);
        		}
        	}
        }
        
        // è™•ç†åˆªé™¤çŽ©å®¶äº‹ä»¶
        function delete_players(e) {
        	var name = e.target.getAttribute("playername");
        	if (confirm(texts["DeleteConfirm"].replace(/%s/, texts["Players"]+":"+name))) {
        		delete players.playersCities[name];
        		savePlayers();
        		renderTables();
        	}
        }
        
        function reset_all_data() {
        	var answer = confirm(texts["RESET_DATA_CONFIRM"]);
        	if (answer) {
        		setVar("config", "");
        		setVar("players", "");
        		window.location.href = window.location.href;
        	}
        }
        
        function reset_players_data() {
        	var answer = confirm(texts["RESET_PLAYERS_CONFIRM"]);
        	if (answer) {
        		setVar("players", "");
        		window.location.href = window.location.href;
        	}
        }
        
        function myChkEventHandler() {
        	this.value = (this.value == '1' ? '0' : '1');
        	config.cfg[this.lang] = (this.value == '1');
        	log(this.lang+" set to "+config.cfg[this.lang]);
        	saveConfig();
        }
        function myChgEventHandler() {
        	config.cfg[this.lang] = this.value;
        	log(this.lang+" set to "+config.cfg[this.lang]);
        	saveConfig();
        }
        function createChk(propertyName, propertyValue) {
        	var btn = document.createElement('input');
        	btn.type = "checkbox";
        	btn.lang = propertyName;
        	btn.setAttribute("style", "vertical-align:middle;width:15;height:15;");
        	btn.value = (propertyValue == true ? '1' : '0');
        	if (propertyValue == true) {
        		btn.checked = "checked";
        	}
        	btn.addEventListener('click', myChkEventHandler, false);
        	return btn;
        }
        function createInp(propertyName, propertyValue) {
        	var btn = document.createElement('input');
        	btn.setAttribute("style", "height: 11px; valign: middle; font-size: 9px;");
        	btn.type = "text";
        	btn.lang = propertyName;
        	btn.value = propertyValue;
        	btn.addEventListener('change', myChgEventHandler, false);
        	return btn;
        }
        function createTxtr(propertyName, propertyValue, rows, cols) {
        	var btn = document.createElement('textarea');
        	btn.cols = (cols != undefined) ? cols : 50;
        	btn.rows = (rows != undefined) ? rows : 15;
        	btn.lang = propertyName;
        	btn.value = propertyValue;
        	btn.addEventListener('change', myChgEventHandler, false);
        	return btn;
        }
        function createSlct(propertyName, propertyValue, items) {
        	var btn = document.createElement('select');
        	btn.lang = propertyName;
        	for(key in items) {
        		var o = document.createElement("option");
        		o.value = key;
        		o.text = items[key];
        		btn.add(o, null);
        	}
        	btn.value = propertyValue;
        	btn.addEventListener('change', myChgEventHandler, false);
        	return btn;
        }
        function createRow(title, input) {
        	var tr = document.createElement('tr');
        	var td = document.createElement('td');
        	if (langtype == "lf")
        		td.setAttribute("align", "left");
        	else
        		td.setAttribute("align", "right");
        	td.setAttribute("style", "border-style: dotted; border-width: 1px; padding: 2px; background-color: #F0D597;");
        	td.innerHTML = title;
        	tr.appendChild(td);
        	var td = document.createElement('td');
        	if (langtype == "lf")
        		td.setAttribute("align", "left");
        	else
        		td.setAttribute("align", "right");
        	td.setAttribute("style", "border-style: dotted; border-width: 1px; padding: 2px; background-color: #F6EBBC;");
        	td.appendChild(input);
        	tr.appendChild(td);
        	return tr;
        }
        function createTitleRow(title, input) {
        	var tr = document.createElement('tr');
        	var td = document.createElement('td');
        	td.setAttribute("colspan", "2");
        	td.setAttribute("align", "center");
        	td.setAttribute("style", "border-style: dotted; border-width: 1px; padding: 3px; font-weight: bold; background-image: url('http://www.imagehost.ro/pict/28121633488d8e712c8fd.png'); background-repeat: repeat-x;");
        	td.innerHTML = title;
        	tr.appendChild(td);
        	
        	return tr;
        }
        function createRowChk(title, propertyName, propertyValue) {
        	return createRow(title, createChk(propertyName, propertyValue));
        }
        function createRowInput(title, propertyName, propertyValue) {
        	return createRow(title, createInp(propertyName, propertyValue));
        }
        function createRowTxtr(title, propertyName, propertyValue, rows, cols) {
        	return createRow(title, createTxtr(propertyName, propertyValue, rows, cols));
        }
        function createRowSlct(title, propertyName, propertyValue, items) {
        	return createRow(title, createSlct(propertyName, propertyValue, items));
        }
        function createBuildingItem(res, key, item, firstStyle, city, cs) {
        	var s = "";
        	var body_id = $X("//body").id;
        	var level = getArrValue(item, "level", "-");
        	var link = getArrValue(item, "link", "-");
        	var position = getArrValue(item, "position", -1);
        	var isUpgrade = (res.underConstructionPosition == position && position != -1);
        	if (level == undefined || level == "") {
        		level = "-";
        	} else if (isUpgrade) {
        		firstStyle += " upgrading";
        		//
        		  n1 = parseInt(level);                    // convert to integer type
                  n2 = parseFloat("1");                  // convert to floating point type
                  sum = n1 + n2;
        		  level = level + " ("+sum+")";		  
                  level = createTooltip(level, texts["currentlyBuilding"]);
        		// level = createTooltip(level, texts["currentlyBuilding"]);
        	}
        	var currentBuildingStyle = (key == body_id) ? " current_building" : "";
        	var upgradelink = "&nbsp\;";
        	var upgradetext = "&nbsp\;";
        	var levellink = level;
        	if(level!="-"&&link!="-") {
        		levellink = createLink(level, link);
        		if (!isUpgrade) {
        			upgradelink = link.replace(/view=(.+)\&id=/,"action=CityScreen&function=upgradeBuilding&id=");
        			upgradelink = upgradelink+"&level=" +level;
        			var cost = BuildingExpansionNeeds(key, level, res);
        			var strattr = "";
        			var strimg = "-off";
        			if (haveEnoughToUpgrade(cost, res)) {
        				strimg = "";
        				strattr = "class='upgradelink' href='"+upgradelink+"' cityid='"+city.value+"' ";
        			}
        			var strconfirm = "confirm='"+getCityName(city.innerHTML)+" "+ buildings[key][0] + " "+texts["Level"] + ":" + (++level) +"'" + " style='cursor: pointer; display: block;'";
        			upgradetext = createImg("/skin/upgrade/btn_upgrade"+strimg+".jpg", strattr+strconfirm, 15, 15);
        			var tooltip = NeedsToStriing(cost);
        			upgradetext = createTooltip(upgradetext, tooltip, texts["ResourceNeeds"]+" "+texts["Upgrade"]+":"+level);			//
        			levellink = createTooltip(levellink, tooltip, texts["ResourceNeeds"]+" "+texts["Upgrade"]+":"+level);
        		}
        	}
        	s += "<td class='"+cs+" "+firstStyle+currentBuildingStyle+"'>"+levellink+"</td>";
        	s += "<td width='15px'class='"+cs+currentBuildingStyle+"'>"+upgradetext+"</td>";
        	return s;
        }
        
        function CalculateWineUsage(res) {
        	var tavernLevel = getArrValue(res.buildings["tavern"], "level", "-");
        	var vineyardLevel = getArrValue(res.buildings["vineyard"], "level", "-");
        	var wineUsage = (res.wineUsage != undefined) ? res.wineUsage : (tavernLevel > 0 ? tavernWineUsage[tavernLevel] : 0);
        	var wineSaving = (vineyardLevel > 0) ? 0.01*vineyardLevel*wineUsage: 0;
        	return {"usage": wineUsage, "saving": wineSaving};
        }
        
        function CalculateWarehose(res) {
        	var warehouseLevel = getArrValue(res.buildings["warehouse"], "level", "0");
        	var warehouseCount = getArrValue(res.buildings["warehouse"], "count", "0");
        	var ret = {wood:0, other:0};
        	if (gameVersion()>="0.3.0") {
        		ret = {wood:3000, other:1500};
        		list = getArrValue(res.buildings["warehouse"], "list", []);
        		for(var j=0; j<list.length; j++) {
        			for(key in ret) 
        				ret[key] += list[j].level*8000;
        		}
        	} else {
        		ret = {wood:3000, other:1500};
        		for(key in ret)
        			ret[key] += Capacities[key][warehouseLevel];
        	}
        	return ret;
        }