// ==UserScript==
// @name OGame: Moon Spy and Recycler
// @namespace http://userscripts.org/users/36331
// @description OGame: directly spy a moon and send recyclers from galaxy view
// @version 5.4
// @creator Black Cat
// @include http://*.ogame.gameforge.com/game/index.php?page=galaxy*
// @require http://userscripts.org/scripts/source/163042.user.js
// @run-at document-end
// ==/UserScript==

var strFunc = (function(){
	var language = document.querySelector("meta[name=ogame-language]").getAttribute("content");
	var messages = {
		"600_1": "Send espionage probe to:",
		"600_2": "Send recycler to:",
		"601": "An error has occurred",
		"602": "Error, there is no moon",
		"603": "Error, player can't be approached because of newbie protection",
		"604": "Player is too strong to be attacked",
		"605": "Error, player is in vacation mode",
		"606": "No fleets can be sent from vacation mode!",
		"610": "Error, not enough ships available, send maximum number:",
		"611": "Error, no ships available",
		"612": "Error, no free fleet slots available",
		"613": "Error, you don't have enough deuterium",
		"614": "Error, there is no planet there",
		"615": "Error, not enough cargo capacity",
		"616": "Multi-alarm",
		"617": "Admin or GM",
		"618": "Attack ban until 01.01.1970 01:00:00"
	};
	switch (language) {
		case "de":
			messages["600_1"] = "Sende Spionagesonden nach:";
			messages["600_2"] = "Sende Recycler nach:";
			messages["601"] = "Ein Fehler ist aufgetreten.";
			messages["611"] = "Fehler, keine Schiffe vorhanden";
			messages["612"] = "Fehler, keine freien Flottenslots";
			messages["613"] = "Fehler, du hast nicht genug Deuterium.";
			messages["615"] = "Fehler, die Ladekapazität reicht nicht aus.";
			break;
		case "es":
			messages["600_1"] = "Enviar sonda de espionaje a:";
			messages["600_2"] = "Enviar reciclador a:";
			messages["601"] = "Ha ocurrido un error";
			messages["611"] = "Error, no hay naves disponibles";
			messages["612"] = "Error, no hay espacio para más flotas";
			messages["613"] = "Error, no tienes suficiente deuterio";
			messages["615"] = "Error, no hay suficiente espacio de carga";
			break;
		case "fr":
			messages["600_1"] = "Expédier des sondes d'espionnage vers:";
			messages["600_2"] = "Expédier des recycleurs vers:";
			messages["601"] = "Une erreur s'est produite";
			messages["611"] = "Erreur! pas de vaisseaux disponibles";
			messages["612"] = "Erreur! pas de slots de flotte libre";
			messages["613"] = "Erreur! pas assez de deutérium disponible";
			messages["615"] = "Erreur! La capacité de chargement n'est pas suffisante";
			break;
		default:
			break;
	}

	var sendFleet = function() {
		var step = 0;
		var shipSent = 0;
		var recyclerSent = 0;
		var probeSent = 0;
		var recyclerValue = 0;
		var probeValue = 0;
		var slotUsed = 0;
		var slotTotal = 0;
		this.data;
		var that = this;

		this.canStart = function() {
			return (shipsendingDone == 1);
		}

		this.reset = function() {
			shipsendingDone = 1;
			step = 0;
			shipSent = 0;
			recyclerSent = 0;
			probeSent = 0;
			delete this.data;
		}

		var displayOk = function() {
			slotUsed++;
			recyclerValue -= recyclerSent;
			probeValue -= probeSent;
			var missileValue = document.getElementById("missileValue").textContent;
			var type = 0;
			if (that.data.mission == 6) {
				type = 1;
			} else if (that.data.mission == 8) {
				type = 2;
			}
			var response = {
				message:messages["600_"+type],
				type:type,
				slots:slotUsed,
				probes:probeValue,
				recyclers:recyclerValue,
				missiles:missileValue,
				shipsSent:shipSent,
				coordinates:{galaxy:that.data.galaxy, system:that.data.system, position:that.data.position},
				planetType:that.data.type,
				success:true
			};
			displayMiniFleetMessage(response);
		}

		var displayKo = function(code) {
			if (!code) {
				code = "601";
			}
			var response = {
				message:messages[code],
				coordinates:{galaxy:that.data.galaxy, system:that.data.system, position:that.data.position},
				success:false
			};
			displayMiniFleetMessage(response);
		}

		this.process = function(html,id) {
			if (shipsendingDone == 1) return;
			step++;
			var page;
			var method = "POST";
			var pData = {};
			switch (step) {
				case 1:
					page = document.querySelector("#menuTable a[href*='fleet1']").href;
					method = "GET";
					break;
				case 2:
					if (id != "fleet1") {
						displayKo();
						this.reset();
						return;
					}
					var fleets = $(html).find("#slots span.advice").eq(0).text();
					/(\d*)\/(\d*)/.exec(fleets);
					slotUsed = parseInt(RegExp.$1);
					slotTotal = parseInt(RegExp.$2);
					recyclerValue = parseInt($(html).find("#button209 span.level").eq(0).text().replace(/\D/g, ""));
					if (isNaN(recyclerValue)) recyclerValue = 0;
					probeValue = parseInt($(html).find("#button210 span.level").eq(0).text().replace(/\D/g, ""));
					if (isNaN(probeValue)) probeValue = 0;
					$("#slotUsed").html(tsdpkt(slotUsed));
					setShips("probeValue", tsdpkt(probeValue));
					setShips("recyclerValue", tsdpkt(recyclerValue));
					if ((this.data.mission == 6 && probeValue == 0)
							|| (this.data.mission == 8 && recyclerValue == 0)) {
						displayKo("611");
						this.reset();
						return;
					} else if (slotUsed == slotTotal) {
						displayKo("612");
						this.reset();
						return;
					}
					var form = $(html).find("form[name='shipsChosen']");
					page = form.attr("action");
					form.find("input,select").each(function(){
						if (this.name) pData[this.name] = this.value;
					});
					for (var i in this.data) {
						if (/^am\d{3}$/.test(i)) {
							pData[i] = this.data[i];
						}
					}
					break;
				case 3:
					if (id != "fleet2") {
						displayKo();
						this.reset();
						return;
					}
					var form = $(html).find("form[name='details']");
					page = form.attr("action");
					form.find("input,select").each(function(){
						if (this.name) pData[this.name] = this.value;
						if (/^am\d{3}$/.test(this.name)) {
							shipSent += parseInt(this.value);
							if (this.name == "am209") {
								recyclerSent = parseInt(this.value);
							} else if (this.name == "am210") {
								probeSent = parseInt(this.value);
							}
						}
					});
					pData.galaxy = this.data.galaxy;
					pData.system = this.data.system;
					pData.position = this.data.position;
					pData.type = this.data.type;
					break;
				case 4:
					if (id != "fleet3") {
						displayKo();
						this.reset();
						return;
					}
					var consumption = parseInt($(html).find("#consumption").text().replace(/\D/g, ""));
					var deuterium = parseInt($(html).find("#resources_deuterium").text().replace(/\D/g, ""));
					if (consumption > deuterium) {
						displayKo("613");
						this.reset();
						return;
					}
					var maxresources = parseInt($(html).find("#maxresources").text().replace(/[^0-9-]/g, ""));
					if (maxresources < 0) {
						displayKo("615");
						this.reset();
						return;
					}
					var form = $(html).find("form[name='sendForm']");
					page = form.attr("action");
					form.find("input,select").each(function(){
						if (this.name) pData[this.name] = this.value;
					});
					pData.mission = this.data.mission;
					break;
				default:
					if (id == "movement") {
						displayOk();
					} else {
						displayKo();
					}
					this.reset();
					return;
					break;
			}
			$.ajax({
				dataType:"html",
				url:page,
				data:pData,
				type:method,
				timeout:5000,
				success: function (html) {
					/<body id="([^"]*)"/.exec(html);
					var id = RegExp.$1;
					that.process($.parseHTML(html),id);
				},
				error: function (xhr,status,exception) {
					addToTable(exception, "error");
					that.reset();
				}
			});
		}

		this.start = function() {
			if (typeof this.data != 'undefined') {
				shipsendingDone = 0;
				this.process();
			}
		}
	}

	var fleetSender = new sendFleet();

	var sendProbes = function(e) {
		if (fleetSender.canStart()) {
			fleetSender.data = $(e.target).data();
			fleetSender.data.mission = "6";
			fleetSender.data.type = "3";
			fleetSender.start();
		}
	}

	var sendRecyclers = function(e) {
		if (fleetSender.canStart()) {
			fleetSender.data = $(e.target).data();
			fleetSender.data.mission = "8";
			fleetSender.data.type = "2";
			fleetSender.start();
		}
	}

	var espionageName = "Espionage";
	var locData = localStorage.getItem("localization.data");
	if (locData) {
		locData = JSON.parse(locData);
		espionageName = locData.missions["6"];
	}

	$(document).ajaxSuccess(function(e,xhr,settings){
		if (settings.url.indexOf("page=galaxyContent") == -1) return;

		var rows = document.querySelectorAll("#galaxytable tr.row");
		for (var i = 0; i < rows.length; i++) {
			var moon = rows[i].querySelector("td.moon");
			if (moon) {
				if (isMobile) {
					if (!($(moon).hasClass("js_no_action"))) {
						var links = rows[i].querySelector("td.action").getElementsByTagName("a");
						for (var j = 0; j < links.length; j++) {
							var clickAttr = links[j].getAttribute("onclick") || "";
							clickAttr = clickAttr.replace(/\s*([(,)])\s*/g,"$1");
							if (clickAttr.indexOf("(6,") > -1) {
								var content = document.getElementsByClassName("js_detailRowMoon" + (i+1))[0].getElementsByClassName("active_row_details_content")[0];
								var nodes = content.childNodes;
								for (var k = nodes.length-1; k >= 0; k--) {
									if (nodes[k].nodeType == 3) {
										content.removeChild(nodes[k]);
									}
								}
								var spy_link = document.createElement("a");
								var expression = /\(\d*,(\d*),(\d*),(\d*),\d*,(\d*)\)/;
								expression.exec(clickAttr);
								$(spy_link).data("galaxy",RegExp.$1);
								$(spy_link).data("system",RegExp.$2);
								$(spy_link).data("position",RegExp.$3);
								$(spy_link).data("am210",RegExp.$4);
								spy_link.className = "dark_highlight_tablet";
								spy_link.onclick = sendProbes;
								spy_link.href = "javascript:void(0);";
								spy_link.innerHTML = "<span class='icon icon_espionage float_left'></span>" + espionageName;
								content.appendChild(spy_link);
								break;
							}
						}
					}
				} else {
					var ul = moon.getElementsByClassName("ListLinks")[0];
					if (ul) {
						var items = rows[i].querySelectorAll(".ListLinks>li");
						for (var j = 0; j < items.length; j++) {
							if (items[j].innerHTML.indexOf("(6,") > -1) {
								var li = items[j].cloneNode(true);
								var spy_link = li.getElementsByTagName("a")[0];
								var expression = /\(\d*,(\d*),(\d*),(\d*),\d*,(\d*)\)/;
								expression.exec(spy_link.getAttribute("onclick"));
								$(spy_link).data("galaxy",RegExp.$1);
								$(spy_link).data("system",RegExp.$2);
								$(spy_link).data("position",RegExp.$3);
								$(spy_link).data("am210",RegExp.$4);
								spy_link.onclick = sendProbes;
								spy_link.href = "javascript:void(0);";

								if (moon.getElementsByClassName("activity").length > 0) {
									ul.insertBefore(li,ul.getElementsByTagName("li")[0].nextSibling);
								} else {
									ul.insertBefore(li,ul.firstChild);
								}
								break;
							}
						}
					}
				}
			}
			var debris = rows[i].querySelector("td.debris");
			if (debris) {
				if (isMobile) {
					if (!($(debris).hasClass("js_no_action"))) {
						var content = document.getElementsByClassName("js_detailRowDebris" + (i+1))[0].getElementsByClassName("active_row_details_content")[0];
						var link = content.getElementsByTagName("a")[0];
						if (link) {
							var pos = content.getElementsByClassName("coords")[0];
							var expression = /(\d*):(\d*):(\d*)/;
							expression.exec(pos.textContent);
							$(link).data("galaxy",RegExp.$1);
							$(link).data("system",RegExp.$2);
							$(link).data("position",RegExp.$3);
							var total = 0;
							var res = content.getElementsByClassName("debris_res");
							for (var j = 0; j < res.length; j++) {
								total += parseInt(res[j].textContent.replace(/\D/g, ""));
							}
							$(link).data("am209",Math.ceil(total/20000));
							link.onclick = sendRecyclers;
							link.href = "javascript:void(0);";
						}
					}
				} else {
					var pos = debris.querySelector("#pos-debris");
					if (pos) {
						var recyclers = debris.getElementsByClassName("debris-recyclers")[0];
						var link = debris.querySelector(".ListLinks>li>a");
						if (recyclers && link) {
							var expression = /(\d*):(\d*):(\d*)/;
							expression.exec(pos.textContent);
							$(link).data("galaxy",RegExp.$1);
							$(link).data("system",RegExp.$2);
							$(link).data("position",RegExp.$3);
							$(link).data("am209",recyclers.textContent.replace(/\D/g, ""));
							link.onclick = sendRecyclers;
							link.href = "javascript:void(0);";
						}
					}
				}
			}
		}
	});
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = "(" + strFunc + ")();";
document.body.appendChild(script);

