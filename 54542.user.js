// ==UserScript==
// @name OGame: Search players
// @namespace http://userscripts.org/users/36331
// @description OGame: Displays players' info in the search page
// @version 5.4
// @creator Black Cat
// @include http://*.ogame.gameforge.com/game/index.php?*
// @run-at document-end
// ==/UserScript==

var strFunc = (function(){
	var groupCoordsInGalaxy = true;

	var language = document.querySelector("meta[name=ogame-language]").getAttribute("content");
	var loca = {};
	switch (language) {
		case "fr":
			loca = {
				moon: {text: "L", d_unit: "km"},
				update: {before: "mis à jour il y a ", after: "", day: "j ", hour: "h ", minute: "m ", second: "s "},
				highscores: {total: "Total : ", economy: "Economie : ", research: "Recherche : ", military: "Militaire : ", defense: "Défense : ", ships: "Vaisseaux : ", nodef: "Sans défense"}
			};
			break;
		default:
			loca = {
				moon: {text: "M", d_unit: "km"},
				update: {before: "updated ", after: "ago", day: "d ", hour: "h ", minute: "m ", second: "s "},
				highscores: {total: "Total: ", economy: "Economy: ", research: "Research: ", military: "Military: ", defense: "Defense: ", ships: "Ships: ", nodef: "Without defense"}
			};
			break;
	}

	var cachedPlayers = {};

	var time = Math.round(Date.now()/1000);
	var t0 = parseInt(document.querySelector("meta[name=ogame-timestamp]").getAttribute("content"));
	var deltaT = time - t0;

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

	var doRequest = function(playerId,displayResult,param) {
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
						planet.moon.size = moon.attr("size");
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

		var displayResultGalaxy = function(sel,player) {
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
						anchor.textContent = "[" + galaxy + ":" + system + ":" + planet + "]" + (hasMoon?" "+loca.moon.text:"");
						if (galaxy == ngalaxy && system == nsystem) {
							anchor.style.color = "#848484";
						} else {
							anchor.setAttribute("onclick","galaxy=" + galaxy + ";system=" + system + ";canLoadContent(" + galaxy + "," + system + ");");
						}
						item.appendChild(anchor);
						list.appendChild(item);
					} else {
						planetsList.push(planet);
						if (player.planets[j].moon) {
							hasMoon = true;
						}
						anchor.innerHTML = "[" + galaxy + ":" + system +"] <span title='" + planetsList.join(", ") + "'>(" + planetsList.length + ")</span>" + (hasMoon?" "+loca.moon.text:"");
					}
					prevGalaxy = galaxy;
					prevSystem = system;
				}
				Tipped.refresh(tips[i]);
			}
		}

		var displayResultGalaxyMobile = function(index,player) {
			var content = $(".js_detailRowPlayer" + index + " .active_row_details_content")[0];
			if (!player.planets || !content) return;
			if (content.getElementsByClassName("coordinates").length > 0) return;
			var nodes = content.childNodes;
			for (var i = nodes.length-1; i >= 0; i--) {
				if (nodes[i].nodeType == 3) {
					content.removeChild(nodes[i]);
				}
			}
			var galaxy = 0;
			var system = 0;
			for (var i = 0; i < player.planets.length; i++) {
				/(\d*):(\d*):(\d*)/.exec(player.planets[i].coords);
				var curGalaxy = RegExp.$1;
				var curSystem = RegExp.$2;
				if (i == 0 || curGalaxy > ngalaxy || (curGalaxy == ngalaxy && curSystem > nsystem)) {
					galaxy = curGalaxy;
					system = curSystem;
					if (i > 0) break;
				}
			}
			if (galaxy != ngalaxy || system != nsystem) {
				var anchor = document.createElement("a");
				anchor.className = "coordinates dark_highlight_tablet";
				anchor.href = "javascript:void(0);";
				anchor.textContent = "[" + galaxy + ":" + system + "]";
				anchor.setAttribute("onclick","galaxy=" + galaxy + ";system=" + system + ";canLoadContent(" + galaxy + "," + system + ");");
				content.appendChild(anchor);
			}
		}

		$(document).ajaxSuccess(function(e,xhr,settings){
			if (settings.url.indexOf("page=galaxyContent") == -1) return;

			ngalaxy = settings.data.replace(/^.*galaxy=(\d*).*$/,"$1");
			nsystem = settings.data.replace(/^.*system=(\d*).*$/,"$1");

			$("#galaxytable td.playername a.tooltipRel").each(function(){
				var rel = $(this).attr("rel");
				var player_id = rel.replace("player","");
				if (!isNaN(parseInt(player_id)) && parseInt(player_id) > 0) {
					if (isMobile) {
						var index = $(this).parent().attr("class").replace(/\n/g,"").replace(/^.*js_playerName(\d*).*$/,"$1");
					}
					var player = cachedPlayers[player_id];
					if (player) {
						if (isMobile) {
							displayResultGalaxyMobile(index,player);
						} else {
							displayResultGalaxy("#"+rel,player);
						}
					} else {
						if (isMobile) {
							$(this).parent().bind("click",function(){
								player = cachedPlayers[player_id];
								if (player) {
									displayResultGalaxyMobile(index,player);
								} else {
									doRequest(player_id,displayResultGalaxyMobile,index);
								}
							});
						} else {
							$(this).bind("mouseover",function(){
								player = cachedPlayers[player_id];
								if (!player) {
									doRequest(player_id,displayResultGalaxy,"#"+rel);
								}
							});
						}
					}
				}
			});
		});
	}

	var highscores = {};
	highscores["0"] = { name: loca.highscores.total };
	highscores["1"] = { name: loca.highscores.economy };
	highscores["2"] = { name: loca.highscores.research };
	highscores["3"] = { name: loca.highscores.military };
	//highscores["5"] = { name: "Military Built" };
	//highscores["6"] = { name: "Military Destroyed" };
	//highscores["4"] = { name: "Military Lost" };
	//highscores["7"] = { name: "Honor" };

	var playersXml;
	var cachedAlliances = {};

	$(document).ajaxSuccess(function(e,xhr,settings){
		if (settings.url.indexOf("page=search") == -1) return;

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
					content += "<span style='cursor:pointer;' onclick='var el = Tipped.findElement(this);var content = $(el).parents(\".ui-dialog\").find(\".overlayDiv\");content.find(\"#searchText\").val(\"" + names[i] + "\");content.find(\"#2\").trigger(\"click\");'>" + names[i] + "</span><br />";
				}
			}
			return content;
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
					linkAlly.className = "tooltipCustom tooltipRight js_hideTipOnMobile";
					linkAlly.title = content;
					linkAlly.innerHTML = cellMembers.innerHTML;
					cellMembers.innerHTML = "";
					cellMembers.appendChild(linkAlly);
				}
			}
		}

		if (settings.url.indexOf("ajax=1") != -1) {
			if (isMobile) return;
			$(".overlayDiv > .searchLayer").each(function(){
				var ajaxContent = this.getElementsByClassName("ajaxContent")[0];

				$(this).find("a.tab").click(function(){
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
					$(this).parents(".contentz").find("#searchText").focus();
				});

				if ($(this).hasClass("search-players")) return;
				$(this).addClass("search-players");

				for (var id in highscores) {
					$.get(
						"/api/highscore.xml",
						{ category:"1", type:id },
						function (xml) {
							highscores[xml.getElementsByTagName("highscore")[0].getAttribute("type")].xml = xml;
						},
						"xml"
					);
				}
			});
		} else {
			var addDots = function(nb) {
				nb = nb + "";
				while (/\d{4}/.test(nb)) {
					nb = nb.replace(/(\d+)(\d{3})/,"$1.$2");
				}
				return nb;
			}

			Array.prototype.sum = function() {
				var sum = 0;
				for (var i=0; i<this.length; i++)
					sum += this[i];
				return sum;
			}

			var displayResultSearch = function(row,player) {
				if (!player.planets) return;
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
						"<a class='dark_highlight_tablet' href='index.php?page=galaxy&galaxy=" + galaxy + "&system=" + system + "'>" +
						"[" + player.planets[i].coords + "]" +
						(player.planets[i].moon?"&nbsp;<span title=\"" + player.planets[i].moon.name + "<br />" + player.planets[i].moon.size + " " + loca.moon.d_unit + "\" class='tooltipCustom tooltipRight js_hideTipOnMobile'>" + loca.moon.text + "</span>":"") + "</a>" + (!isMobile?"<br />":"");
				}
				if (isMobile) {
					cellHome.style.lineHeight = "44px";
				}
				cellHome.innerHTML = homeHTML;
				cellPosition.innerHTML = positionHTML;
				if (!isMobile) {
					time = Math.round(Date.now()/1000) - deltaT;
					var diff = time - player.timestamp;
					if (diff < 0) diff = 0;
					var t = {};
					t.day = Math.floor(diff/86400);
					t.hour = Math.floor(diff/3600) % 24;
					t.min = Math.floor(diff/60) % 60;
					t.sec = diff % 60;
					var up = "";
					if (t.day != 0) up += t.day + loca.update.day;
					if (t.hour != 0 || up != "") up += t.hour + loca.update.hour;
					if (t.min != 0 || up != "") up += t.min + loca.update.minute;
					up += t.sec + loca.update.second;
					up = loca.update.before + up + loca.update.after;
					cellHome.title = up;
					$(cellHome).addClass("tooltip js_hideTipOnMobile");
				}
			}

			var method = settings.data.replace(/^.*method=([\d-]*).*$/,"$1");

			$(".overlayDiv > .searchLayer .searchresults").each(function(){
				var selTab = $(this).parents(".contentz").find("li.ui-tabs-active a").attr("id");
				if (method != selTab) return;

				if ($(this).hasClass("search-players")) return;
				$(this).addClass("search-players");

				var table = this;
				var rows = table.getElementsByTagName("tr");

				if (method == "2") {
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
								player_id = linkMessage.href.replace(/^.*to=(\d*).*$/,"$1");
							}
						}
						if (!isNaN(parseInt(player_id))) {
							var player = cachedPlayers[player_id];
							if (player) {
								displayResultSearch(rows[i],player);
							} else {
								doRequest(player_id,displayResultSearch,rows[i]);
							}
							if (linkHighscore) {
								var content = "";
								var plHS = {};
								for (var id in highscores) {
									var xml = highscores[id].xml;
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
											content += highscores[id].name + (id == "3"?"<span title='" + loca.highscores.ships + addDots(plHS.ships) + "'>":"") + addDots(score) + (id == "3"?"</span>":"") + " #" + position + "<br />";
										}
									}
								}
								if (plHS.total != undefined && plHS.total > 0 && plHS.economy != undefined && plHS.research != undefined && plHS.military != undefined) {
									plHS.defense = Math.max(plHS.economy + plHS.research + plHS.military - plHS.total,0);
									plHS.economy = Math.max(plHS.economy - plHS.defense,0);
									plHS.military = Math.max(plHS.military - plHS.defense,0);
									var scale = 1;
									var mult = Math.pow(10,scale);
									var cal_p = [100*mult*plHS.economy/plHS.total,100*mult*plHS.research/plHS.total,100*mult*plHS.military/plHS.total,100*mult*plHS.defense/plHS.total];
									var cal_r = [];
									var cal_e = [];
									for (var k = 0; k < cal_p.length; k++) {
										cal_r[k] = Math.round(cal_p[k]);
										cal_e[k] = cal_p[k] - cal_r[k];
									}
									var total_error = Math.round(cal_e.sum()); //number of jots by which the answer is too low
									if (total_error != 0) {
										var sign = (total_error<0?-1:1);
										total_error *= sign; //absolute value
										var sorted_e = [];
										for (var k = 0; k < cal_p.length; k++) {
											sorted_e[k] = { i:k, v:cal_e[k] };
										}
										sorted_e.sort(function(a,b){var av=Math.abs(a.v);var bv=Math.abs(b.v);return bv-av});
										for (var k = 0; k < cal_p.length; k++) {
											if (cal_e[sorted_e[k].i] * sign <= 0) continue; //error goes the wrong way
											cal_r[sorted_e[k].i] += sign; //adjust value
											total_error--;
											if (total_error == 0) break;
										}
									}
									for (var k = 0; k < cal_p.length; k++) {
										cal_r[k] /= mult; 
									}
									content =
										highscores["0"].name + addDots(plHS.total) + "<br />" +
										"<span title='" + loca.highscores.nodef + "'>" + highscores["1"].name + "</span>" + addDots(plHS.economy) + " (" + cal_r[0] + "%)<br />" +
										highscores["2"].name + addDots(plHS.research) + " (" + cal_r[1] + "%)<br />" +
										"<span title='" + loca.highscores.nodef + "'>" + highscores["3"].name + "</span><span title='" + loca.highscores.ships + addDots(plHS.ships) + "'>" + addDots(plHS.military) + "</span> (" + cal_r[2] + "%)<br />" +
										loca.highscores.defense + addDots(plHS.defense) + " (" + cal_r[3] + "%)";
								}
								if (content.length > 0) {
									linkHighscore.title = content;
									$(linkHighscore).addClass("tooltipCustom tooltipRight js_hideTipOnMobile");
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
										linkAlly.title = content;
										$(linkAlly).addClass("tooltipCustom tooltipRight js_hideTipOnMobile");
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
	});
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);

