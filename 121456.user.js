// ==UserScript==
// @name            7th Platoon
// @namespace       http://userscripts.org/users/424220/scripts
// @author          SUPERGADGET
// @version         2.2
// @uso:version     2.2
// @include         http://www.erepublik.com/*/military/battlefield/*
// @description     Damage reporting script
// ==/UserScript==

if(location.href.match(/http:\/\/www.erepublik.com\/.+\/military\/battlefield/)) {
	var VERSION = "2.2";
	var $ = null;

	var FORM_URL = "https://docs.google.com/spreadsheet/viewform?formkey=dDNBdVRBbUFQTlNBbmRESE45ZUxwaGc6MA#gid=164";

	var LOCALE = {
		en:function() {
			return {
				locale: "en_US",
				to_the_form: "Go to the report form",
				no_damage: "You must deal at least 1 damage before sending a report.",
				report_sending: "Your report will be sent.",
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
				to_the_form: "Към формуляра за отчитане",
				no_damage: "Отчети с 0 не могат да бъдят изпратени. Що не вземеш да удариш един-два пъти?",
				report_sending: "Отчетът Ви ще бъде изпратен.",
				button_send: "Изпрати отчет",
				round_end: "Рундът е свършил и искате да пратите отчет?",
				damage: "Щета",
				report: "Отчети",
				report_title: "Изпращане на отчет",
				report_failed: "Възникна грешка при изпращането на отчета Ви. Моля, опитайте отново."
			};
		}
	};

	var ranks =
	{
	'Recruit':					1,
	'Private':					2,
	'Private *':				3,
	'Private **':				4,
	'Private ***':				5,
	'Corporal':					6,
	'Corporal *':				7,
	'Corporal **':				8,
	'Corporal ***':				9,
	'Sergeant':					10,
	'Sergeant *':				11,
	'Sergeant **':				12,
	'Sergeant ***':				13,
	'Lieutenant':				14,
	'Lieutenant *':				15,
	'Lieutenant **':			16,
	'Lieutenant ***':			17,
	'Captain':					18,
	'Captain *':				19,
	'Captain **':				20,
	'Captain ***':				21,
	'Major':					22,
	'Major *':					23,
	'Major **':					24,
	'Major ***':				25,
	'Commander':				26,
	'Commander *':				27,
	'Commander **':				28,
	'Commander ***':			29,
	'Lt Colonel':				30,
	'Lt Colonel *':				31,
	'Lt Colonel **':			32,
	'Lt Colonel ***':			33,
	'Colonel':					34,
	'Colonel *':				35,
	'Colonel **':				36,
	'Colonel ***':				37,
	'General':					38,
	'General *':				39,
	'General **':				40,
	'General ***':				41,
	'Field Marshal':			42,
	'Field Marshal *':			43,
	'Field Marshal **':			44,
	'Field Marshal ***':		45,
	'Supreme Marshal':			46,
	'Supreme Marshal *':		47,
	'Supreme Marshal **':		48,
	'Supreme Marshal ***':		49,
	'National Force':			50,
	'National Force *':			51,
	'National Force **':		52,
	'National Force ***':		53,
	'World Class Force':		54,
	'World Class Force *':		55,
	'World Class Force **':		56,
	'World Class Force ***':	57,
	'Legendary Force':			58,
	'Legendary Force *':		59,
	'Legendary Force **':		60,
	'Legendary Force ***':		61,
	'God of War':				62,
	'God of War *':				63,
	'God of War **':			64,
	'God of War ***':			65
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
			FORM_URL2 = "https://spreadsheets.google.com/spreadsheet/formResponse?hl=en_US&formkey=" + formKey + "&ifq";
		}
	})();

	var p;

	// Setup and find jQuery instance.
	if(window.opera || window.navigator.vendor.match(/Google/)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		p = div.onclick();
	}
	else
	{
		p = unsafeWindow;
	}

	$ = p.jQuery;

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
		var submitButton = null;

		// Mapping to form input names
		var fieldsMap = {
			eday: "entry.6.single",
			name: "entry.0.single",
			round: "entry.1.single",
			damage: "entry.2.single",
			battle: "entry.5.single",
			side: "entry.9.single",
			time: "entry.11.single",
			wall: "entry.10.single",
			strength: "entry.12.single",
			rank: "entry.13.single",
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

		//helper function to add elements to the form
		function createInput(inputForm, elementName, elementValue, type){
			var newElement = document.createElement("input");
			newElement.type = type ? type : "hidden";
			newElement.name = elementName;
			newElement.value = elementValue;

			inputForm.appendChild(newElement);
			return newElement;
		}

		// Changes fields name to input html elements
		function createAllMapFields(inputForm) {
			for(var key in fieldsMap) {
				fieldsMap[key] = createInput(inputForm, fieldsMap[key], "");
			}
		}

		this.initializeForm = function() {
			reportForm = document.createElement("form");
			reportForm.method = "POST";
			reportForm.action = FORM_URL2;
			reportForm.target = "blank";

			createInput(reportForm, "pageNumber", "0");
			createInput(reportForm, "backupCache", "");
			createAllMapFields(reportForm);

			submitButton = createInput(reportForm, "submit", "submit", "submit");
			reportForm.style.display = "none";
			document.body.appendChild(reportForm);
		}

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
			var data = {
				name: $("#large_sidebar .user_section .user_avatar").attr("title"),
				damage: parseInt($("#total_damage strong").text().replace(/[^\d.]/g, "")), //innerHTML
				battle: $(".regionLink").attr("title"),
				eday: parseInt($(".eday strong").text().replace(/[^\d.]/g, "")),
				time: $("#battle_countdown").text(),
				wall: selectFirst("#blue_domination_f", "#blue_domination").text(),
				round: parseInt((parseInt($("#left_campaign_points strong").text()) + parseInt($("#right_campaign_points strong").text()))/11)+1,
				side: $("#pvp_header .country div h3:first").text(),
				strength: $("#fighter_skill").text(),
				rank: $("#rank_icon").attr('title'),
			};

			if(!data.battle) {
				data.battle = $("#pvp_header h2").text();
			}

			data.battle += " - " + document.location.href.match(/[0-9]+/)[0];

			if(!data.time) {
				data.time = "02:00:00";
			}

			if(!data.rank) {
				data.rank = $("#rank_icon").attr('original-title');
			}

			data.rank = ranks[data.rank.split(':')[1].trim()];

			return data;
		};

		this.isDamageValid = function(reportObject) {
			return !isNaN(reportObject.damage) && reportObject.damage > 0;
		};

		this.sendReportObject = function(data) {
			if(data == null) data = self.createReportObject();

			this.initializeForm();

			if(!self.isDamageValid(data)) {
				alert(resource.no_damage);
				return false;
			}
			else {
				for(var inputName in fieldsMap) {
					fieldsMap[inputName].value = data[inputName];
				}

				submitButton.click();
				return true;
			}

			return false;
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
			if(battlePage.sendReportObject()) {
				$reportButton.css("display", "none");
			}
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
		var $reportDialog = $('<div id="bs_popup_report" class="pop enemy_defeated bs_window">										\
			<div class="heading">																									\
				<img id="bs_close_report" alt="Close window" src="http://www.erepublik.com/images/modules/pvp/close_button.png">	\
				<h2>' + resource.report_title + '</h2>																				\
			</div>																													\
			<div class="content" style="margin-left: 30px">																			\
				<div>																												\
					<img alt="" src="http://www.erepublik.com/images/modules/pvp/war_effort.png" class="symbol">					\
					<strong>' + resource.damage + ': </strong><big id="bs_report_pop_dmg"></big>									\
				</div>																												\
				<span style="float: left; display: block">																			\
					<p style="padding-top: 0.5em">' + resource.report_sending +'</p>												\
				</span>																												\
			</div> 																													\
			<div style="clear: both"></div>																							\
			<a title="' + resource.button_send + '" href="#" id="bs_report_pop_send">' + resource.button_send + '</a>				\
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
			<div style="margin-left: 50px; margin-top: 10px; float: left"><div style="font-weight: bold">												\
				<a style="background:white; width: auto; height:auto" href="' + FORM_URL + '" target="_blank" title="' + resource.to_the_form + '">		\
					<u>7th Platoon</u> v' + VERSION + '																									\
				</a>																																	\
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