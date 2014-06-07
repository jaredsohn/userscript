// ==UserScript==
// @name        Mr. Mine/Autoclicker
// @author      Nighteyez07 (Anonimal is the original author)
// @namespace   *
// @description Clica automaticamente nos baús
// @include     http://*.mrmine.com/*
// @include     http://mrmine.com/*
// @version     2.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// ==/UserScript==

var mrMine = {
	init: function() {
		mrMine.loadSettings();
		mrMine.menu();
		mrMine.applyStyles();
		mrMine.expandCollapse();
		mrMine.startPauseResume();
		mrMine.dragit();
		mrMine.saveSettings();
	},
	options: {
		left: 0
		,top: 0
		,depthCounter: 0
		,depthMax: 199
		,clickWorkerInterval: 100
		,clickWorkerIntervalId: null
		,sellAllInterval: 120000
		,sellAllIntervalId: null
		,chestHandlingInterval: 0
		,chestHandlingIntervalId: null
		,state: 0
		,stateOptions: ["Start","Pause","Resume"]
		,version: 2.1
		,ore: [
			{
				"label":"Coal"
				,"id": "#SB2"
				,"state": 1
			},{
				"label":"Copper"
				,"id": "#SB3"
				,"state": 1
			},{
				"label":"Silver"
				,"id": "#SB4"
				,"state": 1
			},{
				"label":"Gold"
				,"id": "#SB5"
				,"state": 1
			},{
				"label":"Platinum"
				,"id": "#SB6"
				,"state": 1
			},{
				"label":"Diamond"
				,"id": "#SB7"
				,"state": 1
			},{
				"label":"Coltan"
				,"id": "#SB8"
				,"state": 1
			},{
				"label":"Painite"
				,"id": "#SB9"
				,"state": 1
			},{
				"label":"Black_Opal"
				,"id": "#SB10"
				,"state": 1
			},{
				"label":"Red_Diamond"
				,"id": "#SB11"
				,"state": 1
			},{
				"label":"Obsidian"
				,"id": "#SB12"
				,"state": 1
			},{
				"label":"Californium"
				,"id": "#SB13"
				,"state": 1
			}
		]
	},
	menu: function() {
		var menu = '<div id="autoclickerMenu">';
		menu += '<div id="autoclickerMenuTitle">';
		menu += '<a href="#" id="autoclickerButton" class="autoclickerButton">Start</a>';
		menu += 'Mr. Mine Auto Clicker v'+mrMine.options.version;
		menu += '<span id="autoclickerMenuTitleExpandCollapse" class="autoclickerShow">&#43;</span>';
		menu += '</div>';
		menu += '<div id="autoclickerMenuContent">';
		menu += '<label for="autoclickerDepthLimit">Depth Limit:</label>';
		menu += '<input type="text" id="autoclickerDepthLimit" name="autoclickerDepthLimit" style="width: 50px;" value="'+mrMine.options.depthMax+'" /> km<br />';
		menu += '<label for="autoclickerSellInterval">Sell All Interval:</label>';
		menu += '<input type="text" id="autoclickerSellInterval" name="autoclickerSellInterval" style="width: 50px;" value="'+(mrMine.options.sellAllInterval/1000)+'" /> seconds<br />';
		menu += '<label>Ores to Sell</label>';
		menu += '<ul style="list-style-type: none; padding-left: 5px;">';
		for(var i = 0; i < mrMine.options.ore.length; i++) {
			var checked = '';
			if(mrMine.options.ore[i].state === 1) {
				checked = ' checked="checked"';
			}
			menu += '<li><input type="checkbox" id="autoclickerOre_'+mrMine.options.ore[i].label+'" value="'+mrMine.options.ore[i].label+'"'+checked+' /> '+mrMine.options.ore[i].label+'</li>';
		}
		menu += '</ul>';
		menu += '<a href="#" id="autoclickerSave" class="autoclickerButton">Save</a>';
		menu += '</div>';
		menu += '</div>';
		
		$("body").append(menu);
		
	},
	applyStyles: function() {
		$("#autoclickerMenu").css({
			"z-index": 999
			,"width": "300px"
			,"position" : "fixed"
			,"border" : "4px solid #C3C3C3"
			,"border-radius" : "8px"
			,"left" : mrMine.options.left+"px"
			,"top" : mrMine.options.top+"px"
		});
		$("#autoclickerMenuTitle").css({
			"background-color": "#C9D6DC"
			,"font-size": "16px"
			,"font-weight": "bold"
			,"line-height": "30px"
			,"padding-left": "5px"
		});
		$("#autoclickerMenuTitleExpandCollapse").css({
			"cursor": "pointer"
			,"display": "inline-block"
			,"font-size": "20px"
			,"line-height": "30px"
			,"position": "absolute"
			,"right": "0"
			,"text-align": "center"
			,"width": "30px"
		});
		$("#autoclickerMenuContent").css({
            "background-color": "#FFFFFF"
			,"padding": "5px"
			,"display": "none"
		});
		$(".autoclickerButton").css({
			"-moz-box-shadow":"inset 0px 1px 0px 0px #bee2f9"
			,"-webkit-box-shadow":"inset 0px 1px 0px 0px #bee2f9"
			,"box-shadow":"inset 0px 1px 0px 0px #bee2f9"
			,"background":"-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #63b8ee), color-stop(1, #468ccf) )"
			,"background":"-moz-linear-gradient( center top, #63b8ee 5%, #468ccf 100% )"
			,"filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr='#63b8ee', endColorstr='#468ccf')"
			,"background-color":"#63b8ee"
			,"-webkit-border-top-left-radius":"6px"
			,"-moz-border-radius-topleft":"6px"
			,"border-top-left-radius":"6px"
			,"-webkit-border-top-right-radius":"6px"
			,"-moz-border-radius-topright":"6px"
			,"border-top-right-radius":"6px"
			,"-webkit-border-bottom-right-radius":"6px"
			,"-moz-border-radius-bottomright":"6px"
			,"border-bottom-right-radius":"6px"
			,"-webkit-border-bottom-left-radius":"6px"
			,"-moz-border-radius-bottomleft":"6px"
			,"border-bottom-left-radius":"6px"
			,"text-indent":"0"
			,"border":"1px solid #3866a3"
			,"display":"inline-block"
			,"color":"#14396a"
			,"font-family":"Arial"
			,"font-size":"15px"
			,"font-weight":"bold"
			,"font-style":"normal"
			,"height":"25px"
			,"line-height":"25px"
			,"margin-right":"10px"
			,"width":"70px"
			,"text-decoration":"none"
			,"text-align":"center"
			,"text-shadow":"1px 1px 0px #7cacde"
		});
		
		$("#autoclickerMenuContent label").css({
			"display":"inline-block"
			,"font-weight":"bold"
			,"width":"150px"
		});
	},
	expandCollapse: function() {
		$("#autoclickerMenuTitleExpandCollapse").click(function() {
			if($(this).hasClass("autoclickerShow")) {
				$("#autoclickerMenuContent").show();
				$(this).removeClass("autoclickerShow").addClass("autoclickerHide").html("&#45;");
			} else {
				$("#autoclickerMenuContent").hide();
				$(this).removeClass("autoclickerHide").addClass("autoclickerShow").html("&#43;");
			}
		});
	},
	startPauseResume: function() {
		$("#autoclickerButton").click(function(event) {
			event.preventDefault();//keep the click from trying to update the page
			switch(mrMine.options.state) {
				case 0:
					mrMine.options.state = 1;
					$(this).text("Pause");
					mrMine.run();
				break;
				
				case 1:
					mrMine.options.state = 2;
					$(this).text("Resume");
					mrMine.pause();
				break;
				
				case 2:
					mrMine.options.state = 1;
					$(this).text("Pause");
					mrMine.run();
				break;
			}
		});
	},
	dragit: function() {
		$("#autoclickerMenu").draggable({ distance: 20 });
	},
	getCookie: function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if(c.indexOf(name)==0) {
				return c.substring(name.length, c.length);
			}
		}
		
		return "";
	},
	setCookie: function(name, value) {
		var date = new Date();
		date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));//30 days out
		var expires = "; expires=" + date.toGMTString();
		document.cookie = name + "=" + value + expires + "; path=/";
	},
	loadSettings: function() {
		//load settings from cookie if exists. If exists, then set as default. It not exist, then use default setting.
		var left = mrMine.getCookie("autoclicker_left");
		if(left.length && !isNaN(left)) {
			mrMine.options.left = left;
		}
		var top = mrMine.getCookie("autoclicker_top");
		if(top.length && !isNaN(top)) {
			mrMine.options.top = top;
		}
		var depthOption = mrMine.getCookie("autoclicker_depthMax");
		if(depthOption.length && !isNaN(depthOption)) {
			mrMine.options.depthMax = depthOption;
		}
		var sellOption = mrMine.getCookie("autoclicker_sellAllInterval");
		if(sellOption.length && !isNaN(sellOption)) {
			mrMine.options.sellAllInterval = sellOption;
		}
		for(var i = 0; i < mrMine.options.ore.length; i++) {
			var ore = mrMine.getCookie("autoclicker_"+mrMine.options.ore[i].label);
			if(ore.length) {
				ore = parseInt(ore);
				if(ore === 1 || ore === 0) {
					mrMine.options.ore[i].state = ore;
				}
			}
		}
	},
	saveSettings: function() {
		//save the settings to a cookie
		$("#autoclickerSave").click(function(event) {
			event.preventDefault();//keep the click from trying to update the page
			var position = $("#autoclickerMenu").position();
			//add a check to not allow negative values, so the window isn't lost on an OOPS
			var left = position.left;
			if(left < 0) {
				left = 0;
			}
			var top = position.top;
			if(top < 0) {
				top = 0;
			}
			
			mrMine.setCookie("autoclicker_left", left);
			mrMine.setCookie("autoclicker_top", top);
			
			var depthMax = parseInt($("#autoclickerDepthLimit").val());
			mrMine.setCookie("autoclicker_depthMax", depthMax);//set Depth preference
			mrMine.options.depthMax = depthMax;
			
			var sellInterval = parseInt($("#autoclickerSellInterval").val());
			if(!isNaN(sellInterval)) {
				mrMine.setCookie("autoclicker_sellAllInterval", (sellInterval*1000));//set Sell All Interval preference
				mrMine.options.sellAllInterval = sellInterval*1000;
			}
			
			for(var i = 0; i < mrMine.options.ore.length; i++) {
				var selected = 0;
				if($("#autoclickerOre_"+mrMine.options.ore[i].label).is(":checked")) {
					selected = 1;
				}
				mrMine.options.ore[i].state = selected; // set the current session
				mrMine.setCookie("autoclicker_"+mrMine.options.ore[i].label, selected);//set Ore selling preference
			}
		});
	},
	run: function() {
        $("#UPALLB").click();//start at the top, always
		mrMine.options.clickWorkerIntervalId = window.setInterval(mrMine.clickWorker, mrMine.options.clickWorkerInterval);
		mrMine.options.sellAllIntervalId = window.setInterval(mrMine.sellAll, mrMine.options.sellAllInterval);
		mrMine.options.chestHandlingIntervalId = window.setInterval(mrMine.chestHandling, mrMine.options.chestHandlingInterval);
	},
	pause: function() {
		mrMine.options.depthCounter = 0;
		window.clearInterval(mrMine.options.clickWorkerIntervalId);
		window.clearInterval(mrMine.options.sellAllIntervalId);
		window.clearInterval(mrMine.options.chestHandlingIntervalId);
	},
	clickWorker: function() {
		if(mrMine.options.depthCounter < mrMine.options.depthMax) {
			for(var i=1; i < 6; ++i){
				$("#L"+i+"a, #L"+i+"b, #L"+i+"c, #L"+i+"d, #L"+i+"e, #L"+i+"f, #L"+i+"g, #L"+i+"h, #L"+i+"i, #L"+i+"j").click(); 
			} 
			$("#DOWNB").click();
			mrMine.options.depthCounter++;
		}
	},
	sellAll: function() {
		$("#UPALLB").click();
		$("#PLACE1").click();
		for(var i = 0; i < mrMine.options.ore.length; i++) {
			if(mrMine.options.ore[i].state === 1) {
				//only sell enabled Ores
				$(mrMine.options.ore[i].id).click();
			}
		}
		$("#CLOSEs").click();
		mrMine.options.depthCounter = 0;
	},
	chestHandling: function() {
		$("#chestclosed").click();
		$("#chestopen").click();
		$("#CHEST").click();
		$("#CHESTD").click();
		$("#OPENIT").click();
		$("#BUY").click();
		$("#foundt").click();
	}
	
}
$(document).ready(mrMine.init);