// ==UserScript==
// @name LIFE Evren Haritası
// @namespace http://userscripts.org/users/life
// @description LIFE Evren Haritası (Yeni Evren)
// @version 4.1.5
// @date 2012-06-30
// @creator LIFE
// @include http://*.ogame.*/game/index.php?page=galaxy*
// @include http://*.ogame.*/game/index.php?page=search*
// @run-at document-end
// ==/UserScript==

var strFunc = (function(){
	var groupCoordsInGalaxy = true;

	var cachedPlayers = {};

	var sort_planets = function(a,b) {
		/(\d*):(\d*):(\d*)/.exec(a.coords);
		var galaxy1 = parseInt(RegExp.$1);
		var system1 = parseInt(RegExp.$2);
		var planet1 = parseInt(RegExp.$3);
		/(\d*):(\d*):(\d*)/.exec(b.coords);
		var galaxy2 = parseInt(RegExp.$1);
		var system2 = parseInt(RegExp.$2);
		var planet2 = parseInt(RegExp.$3);
		if (galaxy1 > galaxy2) return 1;
		else if (galaxy1 < galaxy2) return -1;
		if (system1 > system2) return 1;
		else if (system1 < system2) return -1;
		if (planet1 > planet2) return 1;
		else if (planet1 < planet2) return -1;
		return 0;
	}

	var doRequest = function(playerId,param) {
		cachedPlayers[playerId] = {};
		var url = "/api/playerData.xml?id="+playerId;
		$.ajax({
			dataType:"xml",
			cache:false,
			url:url,
			success: function (xml) {
				var playerData = $(xml).find("playerData").eq(0);
				var player = {};
				player.timestamp = playerData.attr("timestamp");
				player.planets = [];
				playerData.find("planets>planet").each(function(){
					var planet = {};
					planet.name = $(this).attr("name");
					planet.coords = $(this).attr("coords");
					if (player.planets.length == 0) {
						planet.isHome = true;
					}
					var moon = $(this).find("moon").eq(0);
					if (moon.length > 0) {
						planet.moon = {};
						planet.moon.name = moon.attr("name");
					}
					player.planets.push(planet);
				});
				player.planets.sort(sort_planets);
				cachedPlayers[playerId] = player;
				displayResult(param,player);
			},
			error: function (xhr,status,exception) {
				delete cachedPlayers[playerId];
				throw new Error(exception + " (" + url + ")");
			}
		});
	}

	if (document.location.href.indexOf("page=galaxy") != -1) {
		var ngalaxy;
		var nsystem;

		var displayResult = function(sel,player) {
			if (!player.planets) return;
			var tips = document.querySelectorAll(sel);
			for (var i = 0; i < tips.length; i++) {
				var list = tips[i].getElementsByClassName("ListLinks")[0];
				if (list.getElementsByClassName("coordinates").length > 0) continue;
				var prevGalaxy = 0;
				var prevSystem = 0;
				for (var j = 0; j < player.planets.length; j++) {
					/(\d*):(\d*):(\d*)/.exec(player.planets[j].coords);
					var galaxy = RegExp.$1;
					var system = RegExp.$2;
					var planet = RegExp.$3;
					if (system != prevSystem || galaxy != prevGalaxy || !groupCoordsInGalaxy) {
						var planetsList = [ planet ];
						var hasMoon = !!player.planets[j].moon;
						var item = document.createElement("li");
						item.className = "coordinates";
						var anchor = document.createElement("a");
						anchor.href = "javascript:void(0);";
						anchor.textContent = "[" + galaxy + ":" + system + ":" + planet + "]" + (hasMoon?" M":"");
						if (galaxy == ngalaxy && system == nsystem) {
							anchor.style.color = "#848484";
						} else {
							anchor.setAttribute("onclick","$(document).trigger('hideCluetip');galaxy=" + galaxy + ";system=" + system + ";canLoadContent(" + galaxy + "," + system + ");");
						}
						item.appendChild(anchor);
						list.appendChild(item);
					} else {
						planetsList.push(planet);
						if (player.planets[j].moon) {
							hasMoon = true;
						}
						anchor.innerHTML = "[" + galaxy + ":" + system +"] <span title='" + planetsList.join(", ") + "'>(" + planetsList.length + ")</span>" + (hasMoon?" M":"");
					}
					prevGalaxy = galaxy;
					prevSystem = system;
				}
			}
		}

		$("#galaxyContent").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=galaxyContent") == -1) return;

			ngalaxy = settings.data.replace(/^.*galaxy=(\d*).*$/,"$1");
			nsystem = settings.data.replace(/^.*system=(\d*).*$/,"$1");

			$("#galaxytable td.playername a.tipsGalaxy").each(function(){
				var rel = $(this).attr("rel");
				var player_id = rel.replace("#player","");
				if (!isNaN(parseInt(player_id))) {
					var player = cachedPlayers[player_id];
					if (player) {
						displayResult(rel,player);
					} else {
						var eventType = undefined;
						for (var type in $(this).data("events")) {
							if (type == "mouseover" || type == "click") {
								var events = $(this).data("events")[type];
								for (var i = 0; i < events.length; i++) {
									if (events[i].namespace == "cluetip") {
										eventType = events[i].origType;
										break;
									}
								}
								if (eventType) break;
							}
						}
						if (eventType) {
							$(this).bind(eventType,function(){
								player = cachedPlayers[player_id];
								if (!player) {
									doRequest(player_id,rel);
								}
							});
						}
					}
				}
			});
		});
	}

	if (document.location.href.indexOf("page=search") != -1) {
		var time = Math.round(Date.now()/1000);
		var t0 = parseInt(document.querySelector("meta[name=ogame-timestamp]").getAttribute("content"));
		var deltaT = time - t0;

		var ajaxContent = document.getElementById("ajaxContent");

		var hishscores = {};
		hishscores["0"] = { name: "Total" };
		hishscores["1"] = { name: "Economy" };
		hishscores["2"] = { name: "Research" };
		hishscores["3"] = { name: "Military" };
		//hishscores["5"] = { name: "Military Built" };
		//hishscores["6"] = { name: "Military Destroyed" };
		//hishscores["4"] = { name: "Military Lost" };
		//hishscores["7"] = { name: "Honor" };
		for (var id in hishscores) {
			$.get(
				"/api/highscore.xml",
				{ category:"1", type:id },
				function (xml) {
					hishscores[xml.getElementsByTagName("highscore")[0].getAttribute("type")].xml = xml;
				},
				"xml"
			);
		}

		var processAlly = function(rows) {
			for (var i = 0; i < rows.length; i++) {
				var cellPoints = rows[i].querySelector("td.allyPoints");
				if (!cellPoints) continue;
				var linkPoints = cellPoints.getElementsByTagName("a")[0];
				var ally_id = linkPoints.href.replace(/^.*searchRelId=(\d*).*$/,"$1");
				var content = getContentForAlly(ally_id,true);
				if (content.length > 0) {
					var cellMembers = rows[i].getElementsByClassName("allyMembers")[0];
					var linkAlly = document.createElement("a");
					linkAlly.href = "javascript:void(0);";
					linkAlly.title = "|" + content;
					linkAlly.innerHTML = cellMembers.innerHTML;
					cellMembers.innerHTML = "";
					cellMembers.appendChild(linkAlly);
					$(linkAlly).cluetip("destroy").cluetip({splitTitle:"|",showTitle:false,width:150,sticky:true,closeText:"",delayedClose:500,mouseOutClose:true,hoverIntent:false});
				}
			}
		}

		var playersXml;
		var cachedAlliances = {};

		var sort_players = function(a,b) {
			return a.toLowerCase().localeCompare(b.toLowerCase());
		}

		var getContentForAlly = function(allyId,doSearch) {
			var content = "";
			var names = cachedAlliances[allyId];
			if (!names && doSearch) {
				names = [];
				var players = playersXml.querySelectorAll("player[alliance='"+allyId+"']");
				for (var i = 0; i < players.length; i++) {
					var name = players[i].getAttribute("name");
					names.push(name);
				}
				names.sort(sort_players);
				cachedAlliances[allyId] = names;
			}
			if (names) {
				for (var i = 0; i < names.length; i++) {
					content += "<span style='cursor:pointer;' onclick='$(document).trigger(\"hideCluetip\");$(\"#searchText\").val(\"" + names[i] + "\");$(\"#2\").trigger(\"click\");'>" + names[i] + "</span><br />";
				}
			}
			return content;
		}

		$("a.tab").click(function(){
			if ($(this).attr("id") == "4" && !playersXml) {
				$.get(
					"/api/players.xml",
					function (xml) {
						playersXml = xml;
						var table = ajaxContent.getElementsByClassName("searchresults")[0];
						if (table) {
							var rows = table.getElementsByTagName("tr");
							processAlly(rows);
						}
					},
					"xml"
				);
			}
			$("#searchText").focus();
		});

		var addDots = function(nb) {
			nb = nb + "";
			while (/\d{4}/.test(nb)) {
				nb = nb.replace(/(\d+)(\d{3})/,"$1.$2");
			}
			return nb;
		}

		var displayResult = function(index,player) {
			var table = ajaxContent.getElementsByTagName("table")[0];
			if (!player.planets || !table) return;
			var row = table.getElementsByTagName("tr")[index];
			var cellHome = row.getElementsByClassName("home")[0];
			var cellPosition = row.getElementsByClassName("position")[0];
			var homeHTML = "";
			var positionHTML = "";
			for (var i = 0; i < player.planets.length; i++) {
				/(\d*):(\d*):(\d*)/.exec(player.planets[i].coords);
				var galaxy = RegExp.$1;
				var system = RegExp.$2;
				homeHTML +=
					(player.planets[i].isHome?"<span style='color:#6F9FC8;'>":"") +
					player.planets[i].name +
					(player.planets[i].isHome?"</span>":"") + "<br />";
				positionHTML +=
					"<a target='_parent' href='index.php?page=galaxy&galaxy=" + galaxy + "&system=" + system + "'>" +
					"[" + player.planets[i].coords + "]" + "</a>" +
					(player.planets[i].moon?"<span style='display:inline-block;width:0px;overflow:visible;'>&nbsp;<a href='javascript:void(0);' title=\"" + player.planets[i].moon.name + "\">M</a></span>":"") + "<br />";
			}
			cellHome.innerHTML = homeHTML;
			cellPosition.innerHTML = positionHTML;
			time = Math.round(Date.now()/1000) - deltaT;
			var diff = time - player.timestamp;
			if (diff < 0) diff = 0;
			var t = {};
			t.day = Math.floor(diff/86400);
			t.hour = Math.floor(diff/3600) % 24;
			t.min = Math.floor(diff/60) % 60;
			t.sec = diff % 60;
			var up = "";
			if (t.day != 0) up += t.day + "d ";
			if (t.hour != 0 || up != "") up += t.hour + "h ";
			if (t.min != 0 || up != "") up += t.min + "m ";
			up += t.sec + "s ";
			up = "updated " + up + "ago";
			cellHome.title = up;
		}

		$("#ajaxContent").ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=search") == -1) return;
			var method = settings.data.replace(/^.*method=([\d-]*).*$/,"$1");

			var table = ajaxContent.getElementsByClassName("searchresults")[0];
			var rows = table.getElementsByTagName("tr");

			if (method == "2") {
				ajaxContent.style.overflow = "auto";

				for (var i = 0; i < rows.length; i++) {
					var cellHighscore = rows[i].querySelector("td.highscore");
					if (!cellHighscore) continue;
					var player_id = undefined;
					var linkHighscore = cellHighscore.getElementsByTagName("a")[0];
					if (linkHighscore) {
						player_id = linkHighscore.href.replace(/^.*searchRelId=(\d*).*$/,"$1");
					} else {
						var cellMessage = rows[i].getElementsByClassName("action")[0];
						var linkMessage = cellMessage.getElementsByTagName("a")[0];
						if (linkMessage) {
							player_id = linkMessage.getAttribute("onclick").replace(/^.*to=(\d*).*$/,"$1");
						}
					}
					if (!isNaN(parseInt(player_id))) {
						var player = cachedPlayers[player_id];
						if (player) {
							displayResult(i,player);
						} else {
							doRequest(player_id,i);
						}
						if (linkHighscore) {
							var content = "";
							var plHS = {};
							for (var id in hishscores) {
								var xml = hishscores[id].xml;
								if (xml) {
									var playerEl = xml.querySelector("player[id='"+player_id+"']");
									if (playerEl) {
										var position = playerEl.getAttribute("position");
										var score = parseInt(playerEl.getAttribute("score"));
										switch (id) {
											case "0":
												plHS.total = score;
												break;
											case "1":
												plHS.economy = score;
												break;
											case "2":
												plHS.research = score;
												break;
											case "3":
												plHS.military = score;
												plHS.ships = playerEl.getAttribute("ships") || "0";
												break;
											default :
												break;
										}
										content += hishscores[id].name + ": " + (id == "3"?"<span title='Ships: " + addDots(plHS.ships) + "'>":"") + addDots(score) + (id == "3"?"</span>":"") + " #" + position + "<br />";
									}
								}
							}
							if (plHS.total > 0 && plHS.economy != undefined && plHS.research != undefined && plHS.military != undefined) {
								plHS.defense = Math.max(plHS.economy + plHS.research + plHS.military - plHS.total,0);
								plHS.economy = Math.max(plHS.economy - plHS.defense,0);
								plHS.military = Math.max(plHS.military - plHS.defense,0);
								content =
									hishscores["0"].name + ": " + addDots(plHS.total) + "<br />" +
									"<span title='Without defense'>" + hishscores["1"].name + "</span>: " + addDots(plHS.economy) + " (" + Math.round(1000*plHS.economy/plHS.total)/10 + "%)<br />" +
									hishscores["2"].name + ": " + addDots(plHS.research) + " (" + Math.round(1000*plHS.research/plHS.total)/10 + "%)<br />" +
									"<span title='Without defense'>" + hishscores["3"].name + "</span>: <span title='Ships: " + addDots(plHS.ships) + "'>" + addDots(plHS.military) + "</span> (" + Math.round(1000*plHS.military/plHS.total)/10 + "%)<br />" +
									"Defense: " + addDots(plHS.defense) + " (" + Math.round(1000*plHS.defense/plHS.total)/10 + "%)";
							}
							if (content.length > 0) {
								var div = document.createElement("div");
								div.id = "highscore" + player_id;
								div.style.textAlign = "left";
								div.style.display = "inline-block";
								div.innerHTML = content;
								ajaxContent.appendChild(div);
								var width = div.offsetWidth;
								linkHighscore.rel = "#highscore" + player_id;
								$(linkHighscore).cluetip("destroy").cluetip({local:true,hideLocal:true,showTitle:false,width:width,sticky:true,closeText:"",delayedClose:500,mouseOutClose:true,hoverIntent:false});
							}
						}
					}
					if (playersXml) {
						var cellAlly = rows[i].getElementsByClassName("allyName")[0];
						var	linkAlly = cellAlly.getElementsByTagName("a")[0];
						if (linkAlly) {
							var ally_id = linkAlly.href.replace(/^.*allianceId=(\d*).*$/,"$1");
							if (!isNaN(parseInt(ally_id))) {
								var content = getContentForAlly(ally_id,false);
								if (content.length > 0) {
									linkAlly.title = "|" + content;
									$(linkAlly).cluetip("destroy").cluetip({splitTitle:"|",showTitle:false,width:150,sticky:true,closeText:"",delayedClose:500,mouseOutClose:true,hoverIntent:false});
								}
							}
						}
					}
				}
			} else if (method == "4") {
				if (!playersXml) return;

				processAlly(rows);
			}
		});
	}
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);