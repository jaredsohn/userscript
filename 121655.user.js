// ==UserScript==
// @author		Angel Vladov
// @revised		Juli
// @name        Reporte Individual 1.1
// @version		1.0.7
// @uso:version	1.0.7
// @include		http://*erepublik.com/*
// @description    Reporte Individual
// ==/UserScript==

var FORM_URL = "https://docs.google.com/spreadsheet/viewform?hl=en_US&formkey=dHZQYjJLRjhzTGNGNVU2MDFmaFJfb0E6MQ#gid=0";
var FORM_KEY = FORM_URL.substring(FORM_URL.lastIndexOf("formkey=") + 8, FORM_URL.lastIndexOf("#"));
var PAGE_BATTLEFIELD = "/military/battlefield/";

var LOCALE = {
	en:function() {
		return {
			locale: "en_US",
			no_damage: "You must deal at least 1 damage before sending a report. Press F5 if the counter is bugged.",
			send_report: "Do you want to send a report?",
			report_sent: "You report is being sent. Please, don't close the new window until it has finished loading!",
			round_end: "Round has finished. Do you want to send a report? (if you don't, it will be lost!)",
			report: "Reportar !"
		};
	},
	bg: function() {
		return {
			locale: "es_ES",
			no_damage: "Tenes que hacer daño antes de enviar un reporte. Apreta F5 si el contador esta buggeado.",
			send_report: "Estas listo para enviar el reporte?",
			report_sent: "El reporte se esta enviando. Por favor, no cierres la ventana hasta que se termine de cargar!",
			round_end: "La ronda termino. Queres enviar tu reporte? (si no, se pierde!)",
			report: "Reportar !"
		};
	}
};

if(window.location.href.indexOf(PAGE_BATTLEFIELD) > 0) {

/*************************************************************************************/
/***** Convenience methods and DOM wrappers to get rid of browsers differencies. *****/
/*************************************************************************************/

String.prototype.endsWith = function(str) { return this.match(str + "$") == str; };
String.prototype.startsWith = function(str) { return this.match("^" + str) == str; };
String.prototype.trim = function(){return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""); };

// If this was a normal page we will use window.$ = ...
var $ = null;
var resource = null;

(function() {
	var href = window.location.href;
	var startIndex = href.indexOf(".com/") + 5;
	var endIndex = href.indexOf("/", startIndex + 1);
	var localeCode = href.substring(startIndex, endIndex);
	
	resource = LOCALE[localeCode];
	
	if(!resource) {
		resource = LOCALE["en"];
	}
	
	resource = resource();
}());

(function() {
	var emptyElement = null;
	
	// We use this to wrap DOM handlers. This will allow us to fix problems at one place only.
	function PageElement(els) {
		var self = this;
		if(els.length == null) els = [els];
		
		this.text = function() { return els[0].innerHTML; };
		this.attr = function(name) { return els[0].getAttribute(name); };
		this.classes = function() { return els[0].classList; };
		this.length = function() { return els.length; };
		this.append = function(content) { els[0].innerHTML += content; return self; };
		this.bind = function(eventType, handler) { els[0].addEventListener(eventType, handler, false); return self; };
		this.each = function(func) { 
			for(var i = 0; i < els.length; i++) func.call(els[i], i); 	
			return self;
		};
		
		// Returns PageElement with all the found elements
		this.find = function(selector) {
			var sels = selector.split(" ");
			var element = els[0];
			var match = null;
			
			for(var i = 0; i < sels.length; i++) {
				var sel = sels[i].trim();
				match = null;
				
				switch(sel.charAt(0)) {
					case "#":
						element = element.getElementById(sel.substr(1));
						break;
						
					case ".":
						match = element.getElementsByClassName(sel.substr(1));
						element = match.length ? match[0] : null;
						break;
						
					default:
						match = element.getElementsByTagName(sel);
						element = match.length ? match[0] : null;
				}
				
				if(!element) return emptyElement;
			}
			
			return new PageElement(match ? match : element);
		};
	};
	
	emptyElement = new PageElement(document.createElement("div"));
	emptyElement.length = function() { return 0; };
	emptyElement.each = function() { };
	
	var topLevel = new PageElement(document);
	var page = function(els) { return new PageElement(els) };
	page.find = topLevel.find;
	
	$ = page;
}());

// Selects the first 
function selectFirst(/*...args*/) {
	for(var i = 0; i < arguments.length; i++) {
		var result = $.find(arguments[i]);
		
		if(result.length()) {
			return result;
		}
	}
	
	return null;
}

/*************************************/
/***** Battlefield page handling *****/
/*************************************/
function BattlePage() {
	// private properties:
	var self = this;
	var customCss = null;
	var reportForm = null;
	var submitButton = null;
	
	// Mapping to form input names
	var fieldsMap = {
		eday: "entry.0.single",
		name: "entry.1.single",
		round: "entry.2.single",
		damage: "entry.3.single",
		battle: "entry.4.single",
		wall: "entry.5.single",
		donate: "entry.6.single"
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
	
	function initializeForm() {
		reportForm = document.createElement("form");
		reportForm.method = "POST";
		reportForm.action = "https://spreadsheets.google.com/formResponse?hl=en_US&formkey=" + FORM_KEY + "&ifq";
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
		addStyle(".bs_last_report:hover", {
			"cursor": "pointer",
			"font-weight": "bold"
		});
		
		// http://www.erepublik.com/images/modules/sidebar/sidebar_buttons_wide.png?1321873582
		addStyle(".bs_report_button", {
			"background-color": "#5F594C",
	    	"border-radius": "5px 5px 5px 5px",
	    	"color": "#FFFFFF",
	    	"float": "left",
	    	"font-size": "11px",
	    	"font-weight": "bold",
	    	"left": "225px",
	    	"padding": "6px 10px 6px 8px",
	    	"position": "absolute",

			"display": "block",
			"top": "-62px",
			"z-index": 100
		});
		
		addStyle(".bs_report_button:hover", {
			"background-color": "#333333"
		});
		
		
		// Append CSS to document
		document.head.appendChild(customCss);
		
		initializeForm();
	};
	
	this.createReportObject = function() {
		var userLink = $.find("#large_sidebar .user_section .user_avatar");
		var profileUrl = userLink.attr("href");
		
		var data = {
			name: userLink.attr("title"),
			damage: parseInt($.find("#total_damage strong").text()), //innerHTML
			battle: $.find(".regionLink").attr("title"),
			eday: $.find("#clock .eday strong").text(),
			time: $.find("#battle_countdown").text(),
			wall: selectFirst("#blue_domination_f", "#blue_domination").text(),
			donate: "http://www.erepublik.com/en/economy/donate-items/" + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
			round: 1
		};
		
		if(!data.battle) {
			data.battle = $.find("#pvp_header h2").text();
		}
		
		$.find("#pvp_header .crowns").each(function() {
			data.round += parseInt($(this).classes()[1].substr(2));
		});
		
		return data;
	};
	
	this.sendReportObject = function(data) {
		if(data == null) {
			data = self.createReportObject();
		}
		
		if(isNaN(data.damage) || data.damage < 1) {
			alert(resource.no_damage);
			return false;
		}
		else if(confirm(resource.send_report)) {
			for(var inputName in fieldsMap) {
				fieldsMap[inputName].value = data[inputName];
			}
			
			alert(resource.report_sent);
			submitButton.click();
			return true;
		}
		
		return false;
	};
}

var lastReport = null;
var reportButton = null;
var battlePage = null;

var reportHandler = function() {		
	lastReport = battlePage.createReportObject();
	
	if(battlePage.sendReportObject(lastReport)) {
		reportButton.style.display = "none";
	}
};

var reportEndHandler = function() {	
	if(confirm(resource.round_end)) {
		if(battlePage.sendReportObject()) {
			reportButton.style.display = "none";		
		}
	}
};

var sendLastReport = function() {
	reportButton.style.display = "none";
	battlePage.sendReportObject();
}

var main = function() {
	battlePage = new BattlePage();
	battlePage.initialize();
	
	$.find("#logo").append(
		'<div style="margin-left: 50px; margin-top: 10px; float: left">' +
		'<div><b><u>Reporte Individual</u></b></div>' +
		'<b>Autor: </b>Juli<br />' +
		'<div style="color: #555555; padding-top: 1em">' +
		'<i>Idea de <b>Peter Denev</b> Earmy script.</i>' +
		'</div></div>'
	);
		
	reportButton = document.createElement('a');		  
	reportButton.setAttribute("class", "bs_report_button");
	reportButton.setAttribute("href", "javascript:;");
	reportButton.innerHTML = resource.report.toUpperCase() + "!";	
	reportButton.addEventListener("click", reportHandler, false);
	document.getElementsByClassName('action_holder')[0].appendChild(reportButton);
	
	// Battle end handling
	var newReportEnd = document.createElement('a');	
	newReportEnd.setAttribute('class','bs_last_report');
	newReportEnd.setAttribute('href','javascript:;');	
	newReportEnd.setAttribute('style','position: relative; left: 240px; top: 65px;');	
	newReportEnd.innerHTML = "&lt;&lt; " + resource.report + " &gt;&gt;";		
	newReportEnd.addEventListener('click', reportEndHandler, false);
	document.getElementById('battle_end').appendChild(newReportEnd);
	
	// Battle loading after round handling
	var newReportEndNext = newReportEnd.cloneNode(true);		
	newReportEndNext.setAttribute('href','javascript:;');	
	newReportEndNext.addEventListener('click', reportEndHandler, false);		
	document.getElementById('battle_loader').appendChild(newReportEndNext);
	
	// Confirmation popup
	/*$.find("#content").append('\
	<div class="pop enemy_defeated" style="display: none; font-size: 14px; font-weight: bold; height: 280px" id="bs_report_pop">   \
		<div class="heading">                                                                                                      \
		<h2>Reportar</h2>                                                                                                \
	</div>                                                                                                                         \
	<div class="content">                                                                                                          \
		<div>                                                                                                                      \
			<img alt="" src="http://www.erepublik.com/images/modules/pvp/war_effort.png" class="symbol">                           \
			<strong>Influencia: <span id="bs_report_pop_dmg"></span></strong>                                                            \
		</div>                                                                                                                     \
		<span style="height: 160px; float: left; display: block">                                                                  \
			<p style="padding-top: 1em">El reporte se esta enviando.</p>                                                           \
			<p style="padding-top: 1em">Por favor, no cierres la ventana hasta que se termine de cargar!</p>                                          \
		</span>                                                                                                                    \
	</div>                                                                                                                         \
	<a title="Reportar" href="javascript:;" id="bs_report_pop_send">Reportar</a>                                         \
	</div>').find("#bs_report_pop_send").bind("click", sendLastReport);*/
}

setTimeout(main, 1000);
}