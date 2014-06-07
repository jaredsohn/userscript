// ==UserScript==
// @name                        Vista de Tabla
// @namespace                   Lord Script
// @description                 Based on Overview and old Alarm And Overview Table.
// @author                      Lord1982
// ==/UserScript==

// 更新 城鎮畫面 資料
function updateCityView(res, root) {
	// 目前正在建設
	var node = $x("//div[@class='constructionSite']/following-sibling::a[contains(@href, 'view=')]", root);
	if (node.length == 1) {
		res.underConstruction = node[0].title;
		res.underConstructionLevel = parseInt(/([0-9]+)/.exec(res.underConstruction)[1])+1;
		res.underConstructionName = node[0].parentNode.getAttribute("class");
		res.underConstructionPosition = /position=([0-9]+)/.exec(node[0].href)[1];
		var script = node[0].parentNode.getElementsByTagName("script")[0];
		if (script != undefined) {
			var enddate = 0;
			var currentdate = 0;
			if (/enddate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
				enddate = parseFloat(RegExp.$1) * 1000;
			}
			if (/currentdate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
				currentdate = parseFloat(RegExp.$1) * 1000;
			}
			if (enddate != 0 && currentdate != 0) {
				res.underConstruction += ","+(enddate - currentdate + new Date().getTime());
				res.underConstructionTime = (enddate - currentdate + new Date().getTime());
			}
		}
	} else if ( node.length > 1) {
		console.log("Construction Site error");
	} else {
		var cityView = $x("//li[@id='position0']");
		if (cityView.length > 0) {
			res.underConstruction = "-";
			res.underConstructionName = "";
			res.underConstructionTime = "";
			res.underConstructionLevel = "";
			res.underConstructionPosition = -1;
		}
	}
	var nodes = $x("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]", root);
	if (nodes.length > 0) {
		// 先設定建築物不存在
		for (var name in res.buildings) {
			res.buildings[name].exist = false;
		}
		for(var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			var li = node.parentNode;
			var level = "-";
			if (/([0-9]+)/.exec(node.title) != null) {
				level = RegExp.$1;
			}
			var name = li.getAttribute("class");
			var item = {};
			item.count = 1;
			item.level = level;
			item.link = node.href;
			item.position = /position=([0-9]+)/.exec(node.href)[1];
			item.exist = true;
			if (res.buildings[name] == undefined || !res.buildings[name].exist) {
				res.buildings[name] = item;
				res.buildings[name].list = [];
			} else {
				res.buildings[name].count++;
			}
			res.buildings[name].list.push(item);
		}
		// 將不存在的建築物資料刪除掉
		for (var name in res.buildings) {
			if (res.buildings[name].exist == false) {
				delete res.buildings[name];
			}
		}
	}
	if (INLINESCORE && root == undefined) {
		var info = $x("//div[@id='information']//li[@class='owner']");
		if (info != undefined) {
			ScoreInformation();
		}
	}
}

// 更新島嶼畫面資料
function updateIslandView(res, root) {
	var id = urlParse("id");
	if (res.island_id == island_id) {
		var wood = $X("id('islandfeatures')/li[contains(@class,'wood level')]");
		res.woodlevel = wood.className.replace(/[^\d.-]+/g, "");
		var tradegood = $X("id('islandfeatures')/li[not(contains(@class, 'wood')) and not(@id)]");
		res.tradegoodlevel = tradegood.className.replace(/[^\d.-]+/g, "");
	}
	if (TABLE_PLAYERS || INLINESCORE) {
		var cities = $x("//li[contains(@id, 'cityLocation')]/ul[@class='cityinfo']");
		for (var i=0; i<cities.length; i++) {
			var c = cities[i];
			var destid = c.parentNode.getElementsByTagName("a")[0].id.replace(/city_/,"");
			var playername = c.childNodes[5].childNodes[1].textContent.Trim();
			var a = c.parentNode.getElementsByTagName("a")[0];
			if (INLINESCORE) {
				a.addEventListener('click', ScoreInformation, false);
			}
			if (TABLE_PLAYERS) {
   				var infos = c.getElementsByTagName("li");
   				var citytype = c.parentNode.getElementsByTagName("a")[0].childNodes[1].getElementsByTagName("span").length;
   				var citystatus = "";
    			switch(citytype) {
   					case 4:
   						citystatus = "vacation";
   						break;
   					case 3:
   						citystatus = "inactivity";
   						break;
    				case 1:
   						citystatus = "banned";
   						break;
   				}
   				var data = new Object();
    			for(var j = 0; j < infos.length; j++) {
   	  				var info = infos[j];
     				var s = info.innerHTML.TrimHTML();
     				var arr = s.split(":");
      				if (arr.length > 1) {
        				var key = arr[0].Trim();
	        			var value = arr[1].Trim();
    	    			data[j] = value;
      				}
    			}
    			var playername = data[2];
	    		if (destid > 0) {
    	  			try {
        				players.playersCities[players.cities[destid][2]].cities[destid] = false;
	      			} catch (e) {
    	  			}
      				if (players.playersCities[playername] == undefined) {
	        			players.playersCities[playername] = new Object();
    	  			}
      				if (players.playersCities[playername].cities == undefined) {
        				players.playersCities[playername].cities = new Object();
      				}
      				players.playersCities[playername].cities[destid] = true;
	      			players.playersCities[playername].alliance = data[4];
   	  				players.playersCities[playername].score = data[3];
   					players.playersCities[playername].citystatus = citystatus;
   					players.cities[destid] = {name: data[0], size: data[1], player: playername, island_id: island_id};
      				players.islands[island_id] = {coord: city_coord};
   				}
			}
		}
	}
}
// 更新 市政府畫面 資料
function updatetownHall(res, root) {
	res.gold = Number($X("//div[@id='CityOverview']//li[contains(@class,'incomegold')]//span[@class='value']", root).textContent);
	log("gold:"+res.gold);
	res.corruption = $X("//div[@id='CityOverview']//li[@class='corruption']//span[contains(@class,'value')]//span", root).textContent;
	log("corruption:"+res.corruption);
	res.woodworkers = $X("//div[@id='PopulationGraph']//div[@class='woodworkers']//span[@class='count']", root).textContent;
	log("woodworkers:"+res.woodworkers);
	res.specialworkers = $X("//div[@id='PopulationGraph']//div[@class='specialworkers']//span[@class='count']", root).textContent;
	log("specialworkers:"+res.specialworkers);
	res.bonusspace = Number($X("//span[@class='value total']", root).textContent) - townHallSpaces[getArrValue(res.buildings["townHall"], "level")];
	log("bonusspace:"+res.bonusspace);
	res.happiness  = Number($X("//div[contains(@class, 'happiness ')]/div[@class='value']", root).textContent) + res.population;
	log("happiness:"+res.happiness);
	var wineUsage = $X("//div[@class='serving']//span", root);
	if (wineUsage != undefined) {
		var winusage_basic = (gameVersion()<"0.3.0") ? 80 : 60;
		res.wineUsage = tavernWineUsage[Number(wineUsage.textContent)/winusage_basic];
	}
	log("wineUsage:"+res.wineUsage);
	res.scientists = Number($X("//div[@id='PopulationGraph']//div[@class='scientists']//span[@class='count']", root).textContent);
	log("scientists:"+res.scientists);
	res.efficiency = Number($X("//div[@id='PopulationGraph']//div[@class='scientists']//*[@class='production']/child::text()", root).textContent);
	log("efficiency:"+res.efficiency);
}

// 更新 兵營和船埠資料
function updateArmyFleet(res, type, root) {
	var idx = 0;
	if (type == "shipyard") {
		idx = 13;
	}
	if (config["unitnames"] == undefined) {
		config["unitnames"] = {};
	}
	if (config["unitpoints"] == undefined) {
		config["unitpoints"] = {};
	}
	if (res.units == undefined) {
		res.units = {};
	}
	var names = $x("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/h4", root);
	var counts = $x("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/div[@class='unitcount']", root);
	if (names.length == counts.length) {
		for(var i = 0; i < names.length; i++) {
			var node = names[i];
			var n = node.innerHTML;
			n = n.replace(/\([0-9]+\/[0-9]+\)/g, "");
			var cost;
        	try {
          		unit_id = node.parentNode.parentNode.getAttribute("class");
          		cost = $x("//ul[@id='units']/li[@class='"+unit_id+"']/div[@class='costs']/ul[@class='resources']/li", root);
        	} catch (e) {
        	}
        	config["unitnames"][unit_id] = n;
        	var c = counts[i];
        	var cnt = getIntValue(c.innerHTML.replace(/<.+>/g, ""), 0);
        	if (res.units[unit_id] == undefined) {
          		res.units[unit_id] = {};
        	}
        	res.units[unit_id].count = cnt;
			if (cost != undefined) {
				config["unitpoints"][unit_id] = 0;
				for(var j = 0; j < cost.length; j++) {
					var c = cost[j];
					var cl = c.getAttribute("class");
            		if (unitScoreBasePoints[cl] != undefined) {
            		//	console.log(unit_cost[unit_id][unitScoreBaseIndex[cl]]);
              			//if (gameVersion()>="0.3.0")
              				config["unitpoints"][unit_id] += unit_cost[unit_id][unitScoreBaseIndex[cl]] * unitScoreBasePoints[cl];
              			//else
              			//	config["unitpoints"][unit_id] += getIntValue(c.innerHTML) * unitScoreBasePoints[cl];
            		}
          		}
        	}
		}
	}
}

// 更新間諜屋資料
function updateHideout(res, root) {
	var node = $X("//input[@id='spyCount']", root);
	if (node != undefined)
		res.spy = node.value;
}
// 更新酒館資料
function updateTavern(res, root) {
	function storeWineUsage() {
		try {
			var n = $X("//*[@id='wineAmount']");
			var rescityid = getNode_value("//form[@id='wineAssignForm']/input[@type='hidden' and @name='id']");
			var city = getCity(rescityid);
			city.wineUsage = tavernWineUsage[n.selectedIndex];
			saveConfig();
		} catch (e) {
			log("Hiba: "+e);
		}
	}
	if (root == undefined) {
		var n = $X("//form[@id='wineAssignForm']//*[@type='submit']");
		n.addEventListener("click", storeWineUsage, false);
	}
	var n = $X("//*[@id='wineAmount']", root);
	res.wineUsage = tavernWineUsage[n.selectedIndex];
}
// 更新港口資料
function updatePort(res, root) {
	if(config["destinations"] != undefined && root == undefined) {
		for(var dest in config["destinations"]) {
			var n = document.createElement("li");
			n.innerHTML = "<a href='"+config["destinations"][dest].link+"'>"+config["destinations"][dest].name+"</a>";
			function removeDestination() {
				if(confirm(texts["removeDestnConfirm"]))
				if(config["destinations"][dest] != undefined)
					delete config["destinations"][dest];
				setVar("config", serialize(config));
				location.replace(window.location);
			}
			var b = document.createElement('input');
			b.type = "button";
			b.value = texts["removeDestn"];
			b.setAttribute("class", "button");
			b.setAttribute("style", "display: inline; width: auto;");
			b.addEventListener("click", removeDestination, false);
			n.appendChild(b);
			var node = $X("//div[@class='contentBox01h'][2]/div/ul");
			node.appendChild(n);
		}
	}
	res.incomingTransporters = [];
	function getRes(rak) {
		rak = rak.replace(/<img [^>]*\/icon_([^>]+).gif[^0-9]*([0-9.,]+)/g, ";$1:$2;");
		rak = rak.replace(/^[^<]*/, "");
		rak = rak.replace(/>[^>]*$/, ">");
		rak = rak.replace(/<[^>]*>/g, "");
		var arr = rak.split(";");
		var r = {"wood":0,"wine":0,"marble":0,"glass":0,"sulfur":0};
		for (key in arr) {
			if (arr[key].indexOf(":") >= 0) {
				var a = arr[key].split(":");
				r[a[0]] = getIntValue(a[1]);
			}
		}
		return r;
	}
	//record load ship
	var transporters = $x("//div[@class='contentBox01h'][3]//table[@class='table01']/tbody/tr", root);
	if (transporters.length>0) {
		for(var i = 0; i<transporters.length; i++) {
			var Itemnode = transporters[i].childNodes;
			var transporter = {};
			transporter.startcity = "-";
			transporter.endcity = Itemnode[1].textContent;
			if (gameVersion()<"0.3.0") {
				transporter.res = getRes(Itemnode[3].getAttribute("onmouseover"));
			}
			else {
				transporter.res = {"wood":0,"wine":0,"marble":0,"glass":0,"sulfur":0};
				var unit = $x("//div[@class='contentBox01h'][3]//table[@class='table01']/tbody/tr["+(i+1)+"]//td[@class='unit']", root);
				var count = $x("//div[@class='contentBox01h'][3]//table[@class='table01']/tbody/tr["+(i+1)+"]//td[@class='count']", root);
				for(var j=0; j<unit.length; j++) {
					var key = unit[j].innerHTML.replace(/<img [^>]*\/icon_([^>]+).gif.*/g, "$1");
					transporter.res[key] = getIntValue(count[j].textContent);
				}
			}
			var totaltime = 0;
			var script = Itemnode[7].getElementsByTagName("script");
			if (script.length > 0) {
				transporter.mission = texts["Loading"];
				var starttime = 0;
				if (/enddate:\s([0-9]+)/.exec(script[0].innerHTML) != null)
					arrivetime = RegExp.$1*1000;
				if (/currentdate:\s([0-9]+)/.exec(script[0].innerHTML) != null)
					starttime = RegExp.$1*1000;
				totaltime = getLocalTime(arrivetime-starttime);
			}
			else {
				transporter.mission = Itemnode[7].innerHTML;
			}
			transporter.arriveTime = totaltime;
			res.incomingTransporters.push(transporter);
		}
	}
	//record arriving ship
	var transporters = $x("//div[@class='contentBox01h'][4]//table[@class='table01']/tbody/tr", root);
	if (transporters.length>1) {
		for(var i = 1; i<transporters.length; i++) {
			var Itemnode = transporters[i].childNodes;
			var transporter = {};
			transporter.startcity = Itemnode[5].textContent;
			transporter.endcity = "-";
			transporter.mission = Itemnode[9].textContent;
			transporter.arriveTime = getLocalTime(getDuration(Itemnode[11].textContent));
			if (gameVersion()<"0.3.0") {
				transporter.res = getRes(Itemnode[7].getAttribute("onmouseover"));
			}
			else {
				transporter.res = {"wood":0,"wine":0,"marble":0,"glass":0,"sulfur":0};
				var unit = $x("//div[@class='contentBox01h'][4]//table[@class='table01']/tbody/tr["+(i+1)+"]//td[@class='unit']", root);
				var count = $x("//div[@class='contentBox01h'][4]//table[@class='table01']/tbody/tr["+(i+1)+"]//td[@class='count']", root);
				for(var j=0; j<unit.length; j++) {
					var key = unit[j].innerHTML.replace(/<img [^>]*\/icon_([^>]+).gif.*/g, "$1");
					transporter.res[key] = getIntValue(count[j].textContent);
				}
			}
			res.incomingTransporters.push(transporter);
		}
	}
}
// 更新 檢視軍隊 資料
function updateCityMilitary(res, type, root) {
    var tab = (type == "army") ? "tab1" : "tab2";
    var idx = (type == "fleet") ? 13 : 0;
    if (config["unitnames"] == undefined) {
      config["unitnames"] = {};
    }
    if (res.units == undefined) {
      res.units = {};
    }
    var names = $x("//div[@id='"+tab+"']//table/tbody/tr/th", root);
    var counts = $x("//div[@id='"+tab+"']//table/tbody/tr[@class='count']/td", root);
    if (names.length == counts.length) {
      for(var i = 0; i < names.length; i++) {
        var n = names[i].title;
        var unit_id = unitsAndShipsIndexesR[i + idx];
        config["unitnames"][unit_id] = n;
        var c = counts[i];
        var cnt = getIntValue(c.innerHTML, 0);
        if (res.units[unit_id] == undefined) {
          res.units[unit_id] = {};
        }
        res.units[unit_id].count = cnt;
      }
    }
}
// 更新學院畫面
function updateAcademyView(res, root) {
	function storeResearchStatic() {
		try {
			var scientists = document.getElementById("inputScientists").value;
			var n = document.getElementById("valueResearch").innerHTML;
			n = n.substring(1, n.length);
			var city_id = getNode_value("//form[@id='setScientists']//input[@type='hidden' and @name='cityId']");
			var res = getCity(city_id);
			res.scientists = scientists;
			res.efficiency = n;
			setVar("config", serialize(config));
		} catch (e) {
			log("academy: "+e);
		}
	}
	try {
		if (root == undefined) {
			var n = getNode("//form[@id='setScientists']//*[@type='submit']");
			n.addEventListener("click", storeResearchStatic, false);
		}
		var scientists = $X("//*[id='inputScientists']", root).value;
		var n = $X("//*[id='valueResearch']").innerHTML;
		n = n.substring(1, n.length);
		res.scientists = scientists;
		res.efficiency = n;
	} catch (e) {
		log("academy: "+e);
	}
}
// 運輸畫面
function updateTransport(res, root) {
	function saveDestination() {
		var destId = getNode_value("//form[@id='transport']/input[@type='hidden' and @name='destinationCityId']");
		var destName = getNodeValue("//div[@class='journeyTarget']/text()");
		var journeyTime = getNodeValue("//div[@class='journeyTime']/text()");
		if(destName.indexOf(" — ")>0)
			destName = destName.substring(0, destName.indexOf(" — "));
		if((journeyTime.indexOf(" + ") > 0) && (journeyTime.indexOf(" = ") > 0))
			journeyTime = journeyTime.substring(journeyTime.indexOf(" + ") + 3, journeyTime.indexOf(" = "));
		var addname = prompt(texts["appendDestnName"],destName+"["+journeyTime+"]");
		if((addname.length == 0) || (addname.search(/\|/) != -1) || (addname.search(/;/) != -1)) {
			alert(texts["NameLabelError"]); exit;
		}
		var addlocation = window.location;
		if(config["destinations"][destId] == undefined)
			config["destinations"][destId] = {};
		config["destinations"][destId].link = addlocation+"";
		config["destinations"][destId].name = addname;
		setVar("config", serialize(config));
		location.replace(window.location);
	}
	function removeDestination() {
		var destId = getNode_value("//form[@id='transport']/input[@type='hidden' and @name='destinationCityId']");
		if(confirm(texts["removeDestnConfirm"]))
			if(config["destinations"][destId] != undefined)
				delete config["destinations"][destId];
		setVar("config", serialize(config));
		location.replace(window.location);
	}
	
	var t = document.getElementById('missionSummary').parentNode;
	if (config["destinations"] == undefined) {
		config["destinations"] = {};
	}
	var destId = getNode_value("//form[@id='transport']/input[@type='hidden' and @name='destinationCityId']");
	if(config["destinations"][destId] == undefined) {
		//save button
		var n = document.createElement('input');
		n.type = "button";
		n.value = texts["appendDestn"];
		n.setAttribute("class", "button");
		n.addEventListener("click", saveDestination, false);
		t.appendChild(n);
	} else {
		//remove button
		var n = document.createElement('input');
		n.type = "button";
		n.value = texts["removeDestn"];
		n.setAttribute("class", "button");
		n.addEventListener("click", removeDestination, false);
		t.appendChild(n);
	}
}
// 運輸船畫面
function updateMerchantNavy(res, root) {
	var item = $x("//div[@id='mainview']//div[@id='plunderingTransports' or @class='contentBox']//div[@class='pulldown']//div[@class='content']", root);
	for(var i=0; i<item.length; i++) {
		item[i].style.height = "auto";
	}
}
// 正在更新建築物畫面
function updateUnderConstruction(res, root) {
	var n = $x("//*[@id='buildingUpgrade']//*[@class='nextLevel']//text()");
	if (n[1] != undefined) {
		n = n[1];
		var level  = n.textContent;
		var script = n.parentNode.parentNode.getElementsByTagName("script")[0];
		if (script != undefined) {
			var enddate = 0;
			var currentdate = 0;
			if (/enddate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
				enddate = parseFloat(RegExp.$1) * 1000;
			}
			if (/currentdate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
				currentdate = parseFloat(RegExp.$1) * 1000;
			}
			if (enddate != 0 && currentdate != 0) {
				res.underConstructionName = $X("//body", root).id;
				res.underConstructionLevel = level;
				res.underConstructionTime = (enddate - currentdate + new Date().getTime());
				position = getArrValue(res.buildings[res.underConstructionName],"position", -1);
				res.underConstructionPosition = position;
			}
		}
	}
}

// 排名畫面
function updateHighscore(res, root) {
	var ownAlly = getCfgValue("ownAlly", '');
	var friendlyAllies = getCfgValue("friendlyAllies", '');
	if (friendlyAllies != "") {
		friendlyAllies = friendlyAllies.split(",");
	} else {
		friendlyAllies = [];
	}
	var hostileAllies = getCfgValue("hostileAllies", '');
	if (hostileAllies != "") {
		hostileAllies = hostileAllies.split(",");
	} else {
		hostileAllies = [];
	}
	function displayHighscoreColor(alliance, colorClass) {
		if (alliance != undefined && alliance != "" && colorClass != undefined && colorClass != "") {
			var res = $x("//tr[@class!='own']/td[@class='allytag']/a[text()='"+alliance+"']", root);
			for(var i = 0; i < res.length; i++) {
				var n = res[i];
				var tr = n.parentNode.parentNode;
				if (tr != undefined && tr != null) {
					tr.setAttribute("class", colorClass+" "+tr.getAttribute("class"));
				} else {
					log("tr is undefined! n: "+n);
				}
			}
		}
	}
	if (ownAlly != "" || friendlyAllies.length > 0 || hostileAllies.length > 0) {
		displayHighscoreColor(ownAlly, "hs_ownally");
		for(var i = 0; i < friendlyAllies.length; i++) {
			displayHighscoreColor(friendlyAllies[i], "hs_friendlyally");
		}
		for(var i = 0; i < hostileAllies.length; i++) {
			displayHighscoreColor(hostileAllies[i], "hs_hostileally");
		}
	}
}