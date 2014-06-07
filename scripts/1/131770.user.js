// ==UserScript==
// @name           BBCode Generator
// @namespace      Inselk0enig
// @description    BBCode generation for Grepolis 2.0
// @include        http://*.grepolis.*/game*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        1.2
// @updateURL      http://userscripts.org/scripts/source/131770.user.js
// ==/UserScript==

var uW = (typeof unsafeWindow === 'object' ? unsafeWindow : window);
if (typeof $ == "undefined") {
	var $ = uW.jQuery
}

Function.prototype.inherits = function(F) {
	this.prototype = new F;
	this.prototype.constructor = this;
	this.prototype.parent = F.prototype;
};

(function() {
	var uW = (typeof unsafeWindow === 'object' ? unsafeWindow : window);
	$(function() {
		var a = $('<div id="mgt" />').appendTo("body");
		a.GameData = uW.GameData;
		a.HidesOverview = uW.HidesOverview;
		a.server = /([a-zA-Z0-9]*)\./.exec(document.location.href)[1];
		a.GPWM = uW.GPWindowMgr;
		a.GPL = uW.Layout;
		
		a.GPEvents = uW.GPEvents;
		a.GPEvents.global.overviews.bbcode_refresh="bbcode_refresh";
		a.GPEvents.global.overviews.bbcode_refresh_place="bbcode_refresh_place";
		a.GPEvents.global.overviews.bbcode_refresh_cmd_overview="bbcode_refresh_cmd_overview";
		a.GPEvents.global.overviews.bbcode_refresh_conquest="bbcode_refresh_conquest";
		
		a.Debug = false;
		a.DebugContent = new Array;
		a.DebugRefresh = function() {
			if (!a.Debug)
				return;
			var b = a.GPWM.getOpenFirst(a.GPL.wnd.TYPE_CUSTOM);
			if (!b) {
				a.GPL.wnd.Create(a.GPL.wnd.TYPE_CUSTOM);
				b = a.GPWM.getOpenFirst(a.GPL.wnd.TYPE_CUSTOM)
			}
			if (a.DebugContent.length == 10)
				a.DebugContent.shift();
			var c = "";
			for ( var d = 0; d < a.DebugContent.length; d++)
				c += a.DebugContent[d];
			b.setContent(c)
		};
		a.DebugWrite = function(b) {
			a.DebugContent.push((new Date).toString() + ":<br>" + b
					+ "<br><br>");
			a.DebugRefresh()
		};
		if (a.Debug) {
			window.setTimeout(a.DebugRefresh, 3e3)
		}
		a.ajaxSuccess(function(b, c, d) {
			var e = d.url.split(/&/)[0];
			a.DebugWrite(e);
			var g;
			if (d.data != undefined) {
				g = $.parseJSON(unescape(d.data).replace(/json=/, ""));
			}
		});

		a.WndHandlerBBCodeCollector = function(wndhandle) {
			this.wnd = wndhandle;
		}
		
		a.WndHandlerBBCodeCollector.inherits(uW.WndHandlerDefault);
		a.WndHandlerBBCodeCollector.prototype.getDefaultWindowOptions = function() {
			var ret = {
					position : [ 'center', 'center' ],
					height : 480,
					width : 640,
			        minimizable: true,
   				    resizable : true,
					title : 'BBCode Collector'
			};
			return ret;
		}
		
		a.WndHandlerBBCodeCollector.prototype.registerEventListeners = function() {
			var that = this;
			a.GPEvents.global.bind(a.GPEvents.global.town.units_changed
					+ '.WndHandlerBBCodeCollector' + this.wnd.getID(),
					function(e) {
				that.handleEvents(e, that);
			});
			a.GPEvents.global.bind(a.GPEvents.global.overviews.bbcode_refresh
					+ '.WndHandlerBBCodeCollector' + this.wnd.getID(),
					function(e) {
				that.handleEvents(e, that);
			});
			a.GPEvents.global.bind(a.GPEvents.global.overviews.bbcode_refresh_place
					+ '.WndHandlerBBCodeCollector' + this.wnd.getID(),
					function(e) {
				that.handleEvents(e, that);
			});
			a.GPEvents.global.bind(a.GPEvents.global.overviews.bbcode_refresh_cmd_overview
					+ '.WndHandlerBBCodeCollector' + this.wnd.getID(),
					function(e) {
				that.handleEvents(e, that);
			});
			a.GPEvents.global.bind(a.GPEvents.global.overviews.bbcode_refresh_conquest
					+ '.WndHandlerBBCodeCollector' + this.wnd.getID(),
					function(e) {
				that.handleEvents(e, that);
			});

			// uW.GPEvents.global.bind(uW.GPEvents.global.town.town_switch
			// + '.WndHandlerBBCodeCollector' + this.wnd.getID(),
			// function(e) {
			// that.handleEvents(e, that);
			// });
		};
		
		a.WndHandlerBBCodeCollector.prototype.unregisterEventListeners = function() {
			uW.GPEvents.global.unbind('.WndHandlerBBCodeCollector'
					+ this.wnd.getID());
		};
		
		a.WndHandlerBBCodeCollector.prototype.handleEvents = function(event,
				that) {
			error_log("handleEvents: event.type="+event.type);
			if (event.type == uW.GPEvents.global.town.town_switch
					|| event.type == uW.GPEvents.global.overviews.bbcode_refresh
					|| event.type == uW.GPEvents.global.town.units_changed) {
				that.acquireContent();
			} else if (event.type == uW.GPEvents.global.overviews.bbcode_refresh_place) {
				that.acquireAgoraDefense();
			} else if (event.type == uW.GPEvents.global.overviews.bbcode_refresh_cmd_overview) {
				that.acquireCommandOverwiev();
			} else if (event.type == uW.GPEvents.global.overviews.bbcode_refresh_conquest) {
				that.acquireConquest();
			}
		};

		a.WndHandlerBBCodeCollector.prototype.onInit = function(title, UIopts) {
			a.DebugWrite("onInit");
			this.renderContent();
			this.registerEventListeners();
			this.acquireContent();
			return true;
		};
		
		a.WndHandlerBBCodeCollector.prototype.renderContent = function() {
			function renderPart(id, header, val) {
				return '<div id="' + id + '" class="game_inner_box BBCode">'
				+ '<div class="game_border">'
				+ '<div class="game_border_top"></div><div class="game_border_bottom"></div><div class="game_border_left"></div><div class="game_border_right"></div>'
				+ '<div class="game_border_corner corner1"></div><div class="game_border_corner corner2"></div><div class="game_border_corner corner3"></div><div class="game_border_corner corner4"></div>'
				+ '<div class="game_header bold">'+ header + '</div>'
				+ '<div><textarea id="' + id + 'Content" class="BBCodeContent" style="height: 90%; width: 99%;">'+val+'</textarea></div>'
				+ '<div class="game_list_footer"></div>' 
				+ '</div>' 
				+ '</div>';
			}
			a.DebugWrite("renderContent");
			var content = renderPart("BBTown", "Stadt", this.acquireTown());
			content += renderPart("BBCmdOverview", "Befehlsübersicht", this.acquireCommandOverwiev());
			content += renderPart("BBConquest", "Eroberung", this.acquireConquest());
			content += renderPart("BBDefense", "Verteidigung", this.acquireAgoraDefense());
			this.wnd.setContent2(content);
		};
		
		a.WndHandlerBBCodeCollector.prototype.onClose = function() {
			this.unregisterEventListeners();
			return true;
		};
		
		a.WndHandlerBBCodeCollector.prototype.acquireContent = function(title, UIopts) {
			a.DebugWrite("acquireContent");
			this.acquireTown();
			this.acquireCommandOverwiev();
			this.acquireConquest();
			this.acquireAgoraDefense();
		};
		
		a.WndHandlerBBCodeCollector.prototype.acquireTown = function() {
			var bbf = "[*]";
			var bba = "[*]";
			var doit = false;
			var output = "";
			a.DebugWrite("acquireTown");

			$("#units_sidebar .unit")
			.each(
					function(i) {
						var name = $(this).attr("name");
						var count = $(this).find(".bold").html();
						doit = true;

						bbf += "[img]http://cdn.grepolis.com/images/game/units/"
							+ name + "_40x40.png[/img][|]";
						bba += "[center]" + count + "[/center][|]";
					});

			if (doit) {
				bbf = bbf.substr(0, bbf.length - 3);
				bba = bba.substr(0, bba.length - 3);
				bbf += "[/*]";
				bba += "[/*]";
				output = "[town]" + parseInt(uW.Game.townId)
				+ "[/town]:\n[table]" + bbf + bba + "[/table]";
			}
			$("#BBTownContent").val(output);
			return output;
		};
		
		a.WndHandlerBBCodeCollector.prototype.acquireCommandOverwiev = function() {
			var output = "";
			var movements = new Array();
			a.DebugWrite("acquireCommandOverwiev");
			
			$("#command_overview .place_command")
			.not(":hidden")
			.each(
					function(i) {
						var title = $(this).find(".command_type").attr(
						"title");
						var outgoing = $(this).find(
						".overview_outgoing").length;
						var srcPlayer = $(this).find(".gp_player_link")
						.html();
						var arrivalTime = $(this).find(
						".troops_arrive_at").html();
						arrivalTime = arrivalTime.substr(1,
								arrivalTime.length - 2);

						var towns = new Array();
						$(this).find(".gp_town_link").each(function(i) {
							var b64 = $(this).attr("href");
							var json = atob(b64.substring(1));
							var info = eval('(' + json + ')');
							;
							towns[i] = info["id"];
						});

						if (outgoing > 0) {
							if (towns[0] != undefined
									&& towns[1] != undefined) {
								var bbcode = title
								+ " [town]"
								+ towns[0]
								+ "[/town]([player]"
								+ srcPlayer
								+ "[/player]) [img]http://forum.de.grepolis.com/grepolis/misc/navbit-arrow-right.png[/img] [town]"
								+ towns[1] + "[/town] "
								+ arrivalTime;
								movements.push(bbcode);
							}
						}
					});

			if (movements.length > 0) {
				var count = 1;
				var textAreas = 1;
				var coTitle = $("#place_defense .game_header").html();
				output += "[font=sansserif]\n";

				for ( var i = 0; i < movements.length; i++) {
					if (count + 8 > 500 - 1) {
						textAreas++;
						output += "[/font]\n------ " + coTitle + " ("
						+ textAreas + ")\n[font=sansserif]";
						count = 1;
					}
					output += movements[i] + "\n";
					count += 8;
				}

				output += "[/font]";
			}
			$("#BBCmdOverviewContent").val(output);
			return output;
		};
		
		a.WndHandlerBBCodeCollector.prototype.acquireAgoraDefense = function() {
			var doAgora = false;
			var outputAgora = "";
			a.DebugWrite("acquireAgoraDefense");

			$("#place_defense .place_units").each(
					function(i) {
						var srcTown = $(this).find("h4").html();
						var b64 = $(this).find(".gp_town_link").attr("href");
						if (b64) {
							var json = atob(b64.substring(1));
							var info = eval('(' + json + ')');
							;
							srcTown = info["id"];
						}
						var bbf = "[*]";
						var bba = "[*]";
						var doit = false;
						$(this).find(".unit").each(
								function(i) {
									var img = $(this).css("background-image")
									.substr(5);
									img = img.substr(0, img.length - 2);
									var count = $(this).find(".bold").html();
									doit = true;

									bbf += "[img]" + img + "[/img][|]";
									bba += "[center]" + count + "[/center][|]";
								});
						doAgora |= doit;
						if (doit) {
							bbf = bbf.substr(0, bbf.length - 3);
							bba = bba.substr(0, bba.length - 3);
							bbf += "[/*]";
							bba += "[/*]";
							outputAgora += "[town]" + srcTown
							+ "[/town]:\n[table]" + bbf + bba
							+ "[/table]";
						}
					});
			$("#BBDefenseContent").val(outputAgora);
			return outputAgora;
		};

		a.WndHandlerBBCodeCollector.prototype.acquireConquest = function() {
			var doAgora = false;
			var output = "";
			a.DebugWrite("acquireConquest");

			$("#conqueror_units_in_town").each(
					function(i) {
						var targetTown = "";
						var b64 = $(this).find(".gp_town_link").attr("href");
						if (b64) {
							var json = atob(b64.substring(1));
							var info = eval('(' + json + ')');						
							targetTown = info["id"];
						}
						var bbf = "[*]";
						var bba = "[*]";
						var doit = false;
						$(this).find(".unit").each(
								function(i) {
									var img = $(this).css("background-image")
									.substr(5);
									img = img.substr(0, img.length - 2);
									var count = $(this).find("span").html();
									doit = true;

									bbf += "[img]" + img + "[/img][|]";
									bba += "[center]" + count + "[/center][|]";
								});
						doAgora |= doit;
						if (doit) {
							bbf = bbf.substr(0, bbf.length - 3);
							bba = bba.substr(0, bba.length - 3);
							bbf += "[/*]";
							bba += "[/*]";
							output += "[town]" + targetTown
							+ "[/town]:\n[table]" + bbf + bba
							+ "[/table]";
						}
					});
			$("#unit_movements li").each(
					function(i) {
						var town = "";
						var b64 = $(this).find(".gp_town_link").attr("href");
						if (b64) {
							var json = atob(b64.substring(1));
							var info = eval('(' + json + ')');						
							town = info["id"];
						}
						var commandType = $(this).find(".command_type").attr("src");
						var time = $(this).find(".eta").html();
						output += "[img]"+commandType+"[/img] "+time+" [town]"+town+"[/town]\n";
						});
			$("#BBConquestContent").val(output);
			return output;
		};

		a.GPWM.addWndType('BBCODE_COLLECTOR', 'TODO',
				a.WndHandlerBBCodeCollector, 1);
	});

	//console log function
	var error_log = function (msg) {
	  try {
	    uW.console.log(msg);
	    if (typeof GM_log !== 'undefined') {
	      GM_log (msg);
	    } else {
	      if (typeof opera.postError !== 'undefined') {
	        opera.postError(msg);
	      }
	      else {
	        uW.console.log(msg);
	      }
	    }
	  } catch (e) {;}
	}

	uW.WndHandlerTownOverviews.prototype.onRcvDataBBCollector = uW.WndHandlerTownOverviews.prototype.onRcvData;
	uW.WndHandlerTownOverviews.prototype.onRcvData = function (data, controller, action) {
		error_log("WndHandlerTownOverviews.onRcvData: action="+action+", controller="+controller);
		this.onRcvDataBBCollector(data, controller, action);
        if (controller == "town_overviews" && action == "command_overview") {
          uW.GPEvents.global.trigger(uW.GPEvents.global.overviews.bbcode_refresh_cmd_overview);
        }
	}

	uW.WndHandlerBuilding.prototype.onRcvDataBBCollector = uW.WndHandlerBuilding.prototype.onRcvData;
	uW.WndHandlerBuilding.prototype.onRcvData = function (data, controller, action) {
		error_log("WndHandlerBuilding.onRcvData: action="+action+", controller="+controller);
		this.onRcvDataBBCollector(data, controller, action);
        if (controller == "building_place" && action == "index") {
          uW.GPEvents.global.trigger(uW.GPEvents.global.overviews.bbcode_refresh_place);
        }
	}

	uW.WndHandlerAtkCommand.prototype.onRcvDataBBCollector = uW.WndHandlerAtkCommand.prototype.onRcvData;
	uW.WndHandlerAtkCommand.prototype.onRcvData = function (data) {
		error_log("WndHandlerAtkCommand.onRcvData");
		this.onRcvDataBBCollector(data);
        uW.GPEvents.global.trigger(uW.GPEvents.global.overviews.bbcode_refresh_conquest);
	}

	uW.WndHandlerConqueror.prototype.onRcvDataBBCollector = uW.WndHandlerConqueror.prototype.onRcvData;
	uW.WndHandlerConqueror.prototype.onRcvData = function (data) {
		error_log("WndHandlerConqueror.onRcvData");
		this.onRcvDataBBCollector(data);
        uW.GPEvents.global.trigger(uW.GPEvents.global.overviews.bbcode_refresh_conquest);
	}

	$('#bottom_ornament').click(
			function() {
				var win = uW.Layout.wnd
				.getOpenFirst(uW.Layout.wnd.TYPE_BBCODE_COLLECTOR)
				if (!win) {
					uW.Layout.wnd.Create(uW.Layout.wnd.TYPE_BBCODE_COLLECTOR);
					win = uW.Layout.wnd
					.getOpenFirst(uW.Layout.wnd.TYPE_BBCODE_COLLECTOR)
				}
			});
}());
