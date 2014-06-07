// ==UserScript==
// @author		ThomasRed (source : Angel Vladov). Modifications by exactiond7
// @name        Condor DO Report Script by exactiond7
// @namespace   eRepublikDOBattlesReporter_VEN_basedinBelgiansParas
// @version		2.3.0
// @uso:version 2.3.0
// @include		http://*erepublik.com/*/military/battlefield/*
// @description    eRepublik DO Reporting Condor
// ==/UserScript==

var VERSION = "2.3.0";
var PAGE_BATTLEFIELD = "/military/battlefield/";
var jQuery = null;
var $ = null;
var military_unit = null;
var bazookas = null;
var bars = null;

var UMs_full = ['P.M.C. El Condor Guardian'];
var UMs_abrev = ['CONDOR'];

var FORM_URL_MU = ["https://spreadsheets.google.com/spreadsheet/formResponse?hl=en_US&formkey=dEw2eWR4TWpEOEJESHhYT2tsNFpLb1E6MA&ifq"];


if(window.location.href.indexOf(PAGE_BATTLEFIELD) > 0) {	
	/***********************************************************************************/
	/***** Coonstants. If someone wants to reuse this script - change values here *****/
	/***********************************************************************************/
	var FORM_URL = "https://docs.google.com/spreadsheet/viewform?formkey=dEw2eWR4TWpEOEJESHhYT2tsNFpLb1E6MA#gid=0";
	var FORM_FIELDS = {
				eday: "entry.0.single",
                name: "entry.2.single",
				UM:  "entry.18.single",
                round: "entry.4.single",
                damage: "entry.6.single",
                DO: "entry.17.single",
                dq6hit: "entry.14.single",
                battle: "entry.8.single",
                wall: "entry.10.single",
                donate: "entry.12.single",
				Bazookas: "entry.19.single",
				Bars: "entry.20.single"
                /*version: "entry.8.single"*/
        };
	
	var LOCALE = {
		en:function() {
			return {
				locale: "en_US",
				no_damage: "You must deal at least 1 damage before sending a report.",
				no_DO: "You must fulfill the Daily Order before sending a report",
				send_report: "Do you want to send a report?",
				button_send: "Enviar Reporte",
				round_end: "Ha Finalizado la Ronda. Quieres Enviar El Reporte?",
				damage: "Daño",
				DO_status: "DO estado",
				report: "Reportar la DO",
				report_title: "Enviar Reporte",
				report_failed: "Un error desconocido. Por favor, intenta de nuevo enviar el Reporte"
			};
		},
		bg: function() {
			return {
				locale: "bg_BG",
				no_damage: "?????? ? 0 ?? ????? ?? ????? ?????????. ?? ?? ?????? ?? ?????? ???? ??? ?????",
				no_DO: "?????? ? 0 ?? ????? ?? ????? ?????????. ?? ?? ?????? ?? ?????? ???? ??? ?????",
				send_report: "??????? ?? ?? ????????? ????? ??????",
				button_send: "??????? ?????",
				round_end: "?????? ? ??????? ? ?????? ?? ??????? ??????",
				damage: "????",
				do_status: "????",
				report: "??????",
				report_title: "????????? ?? ?????",
				report_failed: "???????? ?????? ??? ??????????? ?? ?????? ??. ????, ???????? ??????."
			};
		}
	};
	
	String.prototype.endsWith = function(str) { return this.match(str + "$") == str; };
	String.prototype.startsWith = function(str) { return this.match("^" + str) == str; };
	String.prototype.trim = function(){return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""); };
	
	var formatString = function() {
		var s = arguments[0];
		for (var i = arguments.length - 1; i >= 0; i--) {
			s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
		}
		
		return s;
	};
	
	var resource = (function() { // Read locale
		var href = window.location.href;
		var startIndex = href.indexOf(".com/") + 5;
		var endIndex = href.indexOf("/", startIndex + 1);
		var localeCode = href.substring(startIndex, endIndex);
		var result = LOCALE[localeCode];
		return result != null ? result() : LOCALE["en"]();
	})();
	
	(function() { // Update form fields
		if(FORM_URL.startsWith("https://docs.google.com/")) {
			var lastIndex = FORM_URL.lastIndexOf("#");
			var formKey = FORM_URL.substring(FORM_URL.lastIndexOf("formkey=") + 8, (lastIndex > 0 ? lastIndex : FORM_URL.length));
			FORM_URL = "https://spreadsheets.google.com/spreadsheet/formResponse?hl=en_US&formkey=" + formKey + "&ifq";
		}
	})();

	// Setup and find jQuery instance.
	jQuery = $ = (function(unsafeWindow) {
		if(window.navigator.vendor.match(/Google/)) {
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			unsafeWindow = div.onclick();
		}
		
		return unsafeWindow.jQuery;
	})(unsafeWindow);
	
	// Selects the first 
	function selectFirst(/*...args*/) {
		for(var i = 0; i < arguments.length; i++) {
			var result = $(arguments[i]);
			if(result.length) return result;
		}
		
		return null;
	}
	
	function PopupManager() {
		var self = this;
		var $mask = null;
		
		this.initialize = function() {
			$mask = $("#bs_DO_popups_mask").click(function() { self.hide(); });
		}
		
		this.show = function(popup) {
			$popup = $(popup);
			
			// Set the popup window to center
			$popup.css("top",  ($(window).height() - $popup.height()) / 2);
			$popup.css("left", ($(document).width() - $popup.width()) / 2);
		 
			// Transition effect
			$popup.fadeIn(1000);
			$mask.fadeIn(1000); 
			
			return $popup;
		}
		
		this.hide = function(popup) {
			$mask.hide();
			$(".bs_window").hide();
			if(popup) return $(popup);
		}
	}
	
	function BattlePage() {
		// private properties:
		var self = this;
		var customCss = null;
		
		// Mapping to form input names
		var fieldsMap = {
				eday: "entry.0.single",
                name: "entry.2.single",
				UM:  "entry.18.single",
                round: "entry.4.single",
                damage: "entry.6.single",
                DO: "entry.17.single",
                dq6hit: "entry.14.single",
                battle: "entry.8.single",
                wall: "entry.10.single",
                donate: "entry.12.single",
				Bazookas: "entry.19.single",
				Bars: "entry.20.single"
                /*version: "entry.8.single"*/
        };
		
		// public properties:
		// private methods:
		function addStyle(selector, properties) {
			var newStyle = selector + "{";
	
			for(var property in properties)  {
				newStyle += (property + ":" + properties[property].toString() + ";");
			}
			
			newStyle += "}";
			customCss.innerHTML += newStyle;
		}
		
		var onReportFail = function() {
			alert(resource.report_failed);
		};

		// public methods:
		this.initialize = function() {
			customCss = document.createElement("style");
			customCss.setAttribute("type", "text/css");			
			
			// Create required CSS
			addStyle(".bs_DO_last_report", {
				"position": "relative",
				"cursor": "pointer",
				"left": "240px",
				"top": "65px"
			});
			
			addStyle(".bs_DO_last_report:hover", {
				"font-weight": "bold"
			});
			
			addStyle(".bs_DO_report_button", {
				"text-transform": "uppercase",
				"background-color": "#5F594C",
				"border-radius": "5px 5px 5px 5px",
				"color": "#FFFFFF",
				"font-size": "11px",
				"font-weight": "bold",
				"padding": "5px 10px 6px 8px",
				
				"text-shadow": "rgba(0, 0, 0, 0.2) 0 -1px 0",
				"margin-left": "10px",
				"display": "block",
				"top": "-62px",
			});
			
			addStyle(".bs_DO_report_button:hover", {
				"background-color": "#333333"
			});
			
			addStyle("#bs_DO_popups_mask", {
				"margin": "0",
				"z-index": "30000",
				"background-color": "#000",
				"display": "none",
				"opacity": "0.8",
				"-moz-opacity": ".80",
				"position": "fixed",
				"top": "0px",
				"left": "0px",
				"width": "100%",
				"height": "100%",
				"text-align": "center",
				"vertical-align": "middle"
			});
			
			addStyle("#bs_DO_popup_report", {
				"position": "fixed",
				"display": "none",
				"z-index": "30100",
				"font-size": "14px",
				"font-weight": "bold",
				
				"height": "240px",
				"-webkit-border-radius": "10px",
				"-moz-border-radius": "10px",
				"border-radius": "10px",
				"background-position": "-12px -6px",
				"width": "372px"
			});
			
			addStyle("#bs_DO_report_pop_send", {
				"margin-left": "26px"
			});
			
			addStyle("#bs_DO_close_report", {
				"cursor": "pointer",
				"position": "absolute",
				"top": "-8px",
				"right": "-8px"
			});
					
			// Append CSS to document
			document.head.appendChild(customCss);
		};
		
		this.createReportObject = function() {
			var userLink = $("#large_sidebar .user_section .user_avatar");
			var profileUrl = userLink.attr("href");
			var path=parent.document.location.pathname.toString();
			var rankar={"Recruit":1, "Private":2, "Private *":3, "Private **":4, "Private ***":5,
                                "Corporal":6, "Corporal *":7, "Corporal **":8, "Corporal ***":9, "Sergeant":10,
                                "Sergeant *":11, "Sergeant **":12, "Sergeant ***":13, "Lieutenant":14, "Lieutenant *":15,
                                "Lieutenant **":16, "Lieutenant ***":17, "Captain":18, "Captain *":19, "Captain **":20,
                                "Captain ***":21, "Major":22, "Major *":23, "Major **":24, "Major ***": 25,
                                "Commander":26, "Commander *":27, "Commander **":28, "Commander ***":29, "Lt Colonel":30,
                                "Lt Colonel *":31, "Lt Colonel **":32, "Lt Colonel ***":33, "Colonel":34, "Colonel *":35,
                                "Colonel **":36, "Colonel ***":37, "General":38, "General *":39, "General **":40,
                                "General ***":41, "Field Marshal":42, "Field Marshal *":43, "Field Marshal **":44, "Field Marshal ***":45,
                                "Supreme Marshal":46, "Supreme Marshal *":47, "Supreme Marshal **":48, "Supreme Marshal ***":49, "National Force":50,
                                "National Force *":51, "National Force **":52, "National Force ***":53, "World Class Force":54, "World Class Force *":55,
                                "World Class Force **":56, "World Class Force ***":57, "Legendary Force":58, "Legendary Force *":59, "Legendary Force **":60,
                                "Legendary Force ***":61, "God of War":62, "God of War *":63, "God of War **":64, "God of War ***": 65 };
			var str,
					ranks = $('#rank_icon').attr('title');
					str = parseFloat($('#fighter_skill').text().trim().replace(/,/g,''));
			if (typeof ranks == 'undefined' || ranks.length == 0) {
					ranks = $('#rank_icon').attr('original-title').substr(15).trim();
			} else {
					ranks = ranks.substr(15).trim();
			}
			var rankl=rankar[ranks];
			var dmg=parseInt($("#total_damage strong").text().replace(/[^\d.]/g, "")); //innerHTML
			var dmgq6=Math.floor(Math.floor((parseInt(rankl)+5)*(parseFloat(str)+400)*0.005)*2.2);
			var dmgq6hit=Math.floor(dmg/dmgq6);
			var battleid=$("#pvp_header h2").text()+' ('+path.split('/')[4]+')';

			
			$.ajax({
				type : "GET",
				url : 'http://www.erepublik.com/en/citizen/profile/' + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
				dataType : "html",
				async: false,
				success: function(data) {
					var raw = $(data).find(".one_newspaper span").html();								
					var test = UMs_full.indexOf(raw);
				
					if (test == -1)	{
						military_unit = raw;
					} else {
						military_unit = UMs_abrev[test];
						FORM_URL = FORM_URL_MU[test];
					}			
				
					$(".heading h2").text(resource.report_title + " for " + military_unit);
				}
			});
			
			$.ajax({
				type : 'GET',
				url : 'http://www.erepublik.com/en/economy/inventory',
				dataType : 'html',
				async: false,
				success: function(data) {
					var bazooka_disarmed=999999;
				
					$(data).find(".b_parts strong").each(function() {						
						if (bazooka_disarmed > (parseInt($(this).text()))) {
							bazooka_disarmed = parseInt($(this).text());
						}
					});
					
					var bazooka_armed = parseInt($(data).find(".bazooka .item strong").text());
					
					if (isNaN(bazooka_armed)) bazooka_armed = 0;
					
					bazookas = bazooka_armed + bazooka_disarmed;
					
					bars = parseInt($(data).find("#stock_1_10").text());
					
				}
			});
					
        var data = {
                name: userLink.attr("title"),
				UM : military_unit,
				Bazookas : bazookas,
				Bars : bars,
                damage: dmg,
				DO: $("#dailyTracker").text().split(" / ")[0],
                dq6hit: dmgq6hit,
                battle: battleid,
                eday: $("#header .header_info .eday strong").text().replace("," , ""),
                time: $("#battle_countdown").text(),
                wall: selectFirst("#blue_domination_f", "#blue_domination").text(),
                donate: "http://www.erepublik.com/en/economy/donate-items/" + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
                round: parseInt((parseInt($("#left_campaign_points strong").text()) + parseInt($("#right_campaign_points strong").text()))/11)+1,
                version: VERSION
        };
                               
        $("#pvp_header .crowns").each(function() {
                data.round += parseInt($(this).attr("class").split(" ")[1].substr(2));
        });
       
        return data;
		};
		
		this.isDamageValid = function(reportObject) {
			return !isNaN(reportObject.damage) > 0;
		};
		
		this.sendReportObject = function(data) {
			if(data == null) data = self.createReportObject();
			
			if(!self.isDamageValid(data)) {
				alert(resource.no_damage);
				return false;
			}
			
			var report = {pageNumber: "0", backupCache: "", submit: "Submit"};
			for(var fieldName in fieldsMap) {
				report[fieldsMap[fieldName]] = data[fieldName];
			}
			
			var headers = {"Content-Type": "application/x-www-form-urlencoded"};
			GM_xmlhttpRequest({method: "POST", url: FORM_URL, data: $.param(report), headers: headers, onerror: onReportFail});
			return true;
		};
	}
	
	var lastReport = null;
	var $reportButton = null;
	var battlePage = null;
	var popUpManager = new PopupManager();
	
	var reportHandler = function() {		
		lastReport = battlePage.createReportObject();
		
		if(battlePage.isDamageValid(lastReport)) {
			popUpManager.show("#bs_DO_popup_report").find("#bs_DO_report_pop_DO").text(lastReport.DO);
		}
		else {
			alert(resource.no_damage);
		}
		
		return false;
	};
	
	var reportEndHandler = function() {	
		if(confirm(resource.round_end)) {
			reportHandler();
		}
		
		return false;
	};
	
	var sendLastReport = function() {
		if(battlePage.sendReportObject(lastReport)) {
			$reportButton.css("display", "none");
		}
		
		popUpManager.hide();
	};
	
	function createReportDialog() {
		var $reportDialog = $('<div id="bs_DO_popup_report" class="pop enemy_defeated bs_window"> \
			<div class="heading">																										   \
				<img id="bs_DO_close_report" alt="Close window" src="http://www.erepublik.com/images/modules/pvp/close_button.png">		   \
				<h2>' + resource.report_title + '</h2>																					   \
			</div>                                                                                                                         \
			<div class="content" style="margin-left: 30px">                                                                                \
				<div>                                                                                                                      \
					<img alt="" src="http://www.erepublik.com/images/modules/pvp/war_effort.png" class="symbol">                           \
					<strong>' + resource.DO_status + ': </strong><big id="bs_DO_report_pop_DO"></big>										   \
				</div>                                                                                                                     \
			</div> 																														   \
			<div style="clear: both; height: 1.5em"></div>																				   \
			<a title="' + resource.button_send + '" href="#" id="bs_DO_report_pop_send">' + resource.button_send + '</a>					   \
		</div>');
		
		$("body").append($reportDialog).append('<div id="bs_DO_popups_mask"></div>');
		$("#bs_DO_close_report").click(function() { 
			popUpManager.hide(); 
			return false;
		});
		
		// Add listener this way because with jQuery the context will change and GM functions will stop working.
		document.getElementById("bs_DO_report_pop_send").addEventListener("click", sendLastReport, false);
	}
	
	function createReportButtons() {
		// Report button on battle page
		$reportButton = $('<a class="bs_DO_report_button" href="#">' + resource.report + '!</a>');
		$reportButton.appendTo($(".damage_aligner tr").append('<td id="bs_DO_report_td"></td>')).bind("click", reportHandler);
			
		// Battle loading after round handling
		var lastButton = '<a class="bs_DO_last_report" href="#">&lt;&lt; ' + resource.report + ' &gt;&gt;</a>';
		$([$("#battle_end"), $("#battle_loader")]).each(function() {
			$(this).append(lastButton).find(".bs_DO_last_report").bind("click", reportEndHandler);
		});
	}
	
	$(document).ready(function() {
		createReportDialog();
				
		battlePage = new BattlePage();
		battlePage.initialize();
		popUpManager.initialize();
			
		createReportButtons();
	});
}