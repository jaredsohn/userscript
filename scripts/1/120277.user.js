// ==UserScript==
// @author		Angel Vladov
// @name        eRepublik DamageCivs
// @namespace   eRepublikBattlesReporter
// @version		1.2.7
// @uso:version 1.2.7
// @include		http://*erepublik.com/*/military/battlefield/*
// @description    eRepublik Damage Reporting script for Bulgarian civillians
// ==/UserScript==

// Changelog:
// ===============================================================================
// v1.2.0
// - Fixed compatibility issues with eRepublik Advanced
// - Added jQuery usage
// - Skinned popup for sending reports
// ===============================================================================
// v1.2.1
// - Fixed no damage alert
// ===============================================================================
// v1.2.2
// - Instead of loading jQuery the script uses eRepublik instance
// ===============================================================================
// v1.2.3
// - No new window open on report. Script now uses GM_xmlhttpRequest instead of forms.
// - Damage report popup scaled to be with the same size as its content
// ===============================================================================
// v1.2.4
// - Fixed battle end popup report button
// - Added close button to reporting window
// ===============================================================================
// v1.2.5
// - Chrome compatibility fix
// ===============================================================================
// v1.2.6
// - Day getter fixed
// - Changes in report window
// ===============================================================================
// v1.2.7
// - Fixed battle end reporting

var VERSION = "1.2.7";
var PAGE_BATTLEFIELD = "/military/battlefield/";
var jQuery = null;
var $ = null;

if(window.location.href.indexOf(PAGE_BATTLEFIELD) > 0) {	
	/***********************************************************************************/
	/***** Coonstants. If someone wants to reuse this script - change values here *****/
	/***********************************************************************************/
	var FORM_URL = "https://docs.google.com/spreadsheet/viewform?hl=en_US&formkey=dExFdE1Dai1KU2cyTkRuekZfeFJVREE6MQ#gid=0";
	var FORM_FIELDS = {
		eday: "entry.0.single",
		name: "entry.2.single",
		round: "entry.3.single",
		damage: "entry.4.single",
		battle: "entry.5.single",
		wall: "entry.6.single",
		donate: "entry.7.single"
		/*version: "entry.8.single"*/
	};
	
	var LOCALE = {
		en:function() {
			return {
				locale: "en_US",
				no_damage: "You must deal at least 1 damage before sending a report.",
				send_report: "Do you want to send a report?",
				button_send: "Send Report",
				round_end: "Round has finished. Do you want to send a report?",
				damage: "Damage",
				report: "Report",
				report_title: "Send Report",
				report_failed: "Unknow error occured. Please, try sending your report again."
			};
		},
		bg: function() {
			return {
				locale: "bg_BG",
				no_damage: "Отчети с 0 не могат да бъдят изпратени. Що не вземеш да удариш един два пъти?",
				send_report: "Желаете ли да изпратите Вашия отчет?",
				button_send: "Изпрати отчет",
				round_end: "Рундът е свършил и искате да пратите отчет?",
				damage: "Щета",
				report: "Отчети",
				report_title: "Изпращане на отчет",
				report_failed: "Възникна грешка при изпращането на отчета Ви. Моля, опитайте отново."
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
			$mask = $("#bs_popups_mask").click(function() { self.hide(); });
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
			round: "entry.3.single",
			damage: "entry.4.single",
			battle: "entry.5.single",
			wall: "entry.6.single",
			donate: "entry.7.single"
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
			addStyle(".bs_last_report", {
				"position": "relative",
				"cursor": "pointer",
				"left": "240px",
				"top": "65px"
			});
			
			addStyle(".bs_last_report:hover", {
				"font-weight": "bold"
			});
			
			addStyle(".bs_report_button", {
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
			
			addStyle(".bs_report_button:hover", {
				"background-color": "#333333"
			});
			
			addStyle("#bs_popups_mask", {
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
			
			addStyle("#bs_popup_report", {
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
			
			addStyle("#bs_report_pop_send", {
				"margin-left": "26px"
			});
			
			addStyle("#bs_close_report", {
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
			
			var data = {
				name: userLink.attr("title"),
				damage: parseInt($("#total_damage strong").text().replace(/[^\d.]/g, "")), //innerHTML
				battle: $(".regionLink").attr("title"),
				eday: $("#header .header_info .eday strong").text(),
				time: $("#battle_countdown").text(),
				wall: selectFirst("#blue_domination_f", "#blue_domination").text(),
				donate: "http://www.erepublik.com/en/economy/donate-items/" + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
				round: 1,
				version: VERSION
			};
			
			if(!data.battle) {
				data.battle = $("#pvp_header h2").text();
			}
			
			$("#pvp_header .crowns").each(function() {
				data.round += parseInt($(this).attr("class").split(" ")[1].substr(2));
			});
			
			return data;
		};
		
		this.isDamageValid = function(reportObject) {
			return !isNaN(reportObject.damage) && reportObject.damage > 0;
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
			popUpManager.show("#bs_popup_report").find("#bs_report_pop_dmg").text(lastReport.damage);
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
		var $reportDialog = $('<div id="bs_popup_report" class="pop enemy_defeated bs_window"> \
			<div class="heading">																										   \
				<img id="bs_close_report" alt="Close window" src="http://www.erepublik.com/images/modules/pvp/close_button.png">		   \
				<h2>' + resource.report_title + '</h2>																					   \
			</div>                                                                                                                         \
			<div class="content" style="margin-left: 30px">                                                                                \
				<div>                                                                                                                      \
					<img alt="" src="http://www.erepublik.com/images/modules/pvp/war_effort.png" class="symbol">                           \
					<strong>' + resource.damage + ': </strong><big id="bs_report_pop_dmg"></big>										   \
				</div>                                                                                                                     \
			</div> 																														   \
			<div style="clear: both; height: 1.5em"></div>																				   \
			<a title="' + resource.button_send + '" href="#" id="bs_report_pop_send">' + resource.button_send + '</a>					   \
		</div>');
		
		$("body").append($reportDialog).append('<div id="bs_popups_mask"></div>');
		$("#bs_close_report").click(function() { 
			popUpManager.hide(); 
			return false;
		});
		
		// Add listener this way because with jQuery the context will change and GM functions will stop working.
		document.getElementById("bs_report_pop_send").addEventListener("click", sendLastReport, false);
	}
	
	function createLogoLabel() {
		$("#logo").append('\
			<div style="margin-left: 50px; margin-top: 10px; float: left">                                   \
			<div style="font-weight: bold"><u>eRepublik DamageCivs</u> ' + VERSION + '</div>   				 \
			<b>Authors: </b>wazaabg, zap6<br />                                                              \
			<div style="color: #555555; padding-top: 1em">                                                   \
			<i>Idea from <b>Peter Denev</b> Earmy script.</i>                                                \
			</div></div>'
		);
	}
	
	function createReportButtons() {
		// Report button on battle page
		$reportButton = $('<a class="bs_report_button" href="#">' + resource.report + '!</a>');
		$reportButton.appendTo($(".damage_aligner tr").append('<td id="bs_report_td"></td>')).bind("click", reportHandler);
			
		// Battle loading after round handling
		var lastButton = '<a class="bs_last_report" href="#">&lt;&lt; ' + resource.report + ' &gt;&gt;</a>';
		$([$("#battle_end"), $("#battle_loader")]).each(function() {
			$(this).append(lastButton).find(".bs_last_report").bind("click", reportEndHandler);
		});
	}
	
	$(document).ready(function() {
		createReportDialog();
		createLogoLabel();
		
		battlePage = new BattlePage();
		battlePage.initialize();
		popUpManager.initialize();
			
		createReportButtons();
	});
}