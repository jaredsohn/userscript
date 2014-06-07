// ==UserScript==
// @name        Civ Clicker/Autoclicker
// @author      Nighteyez07
// @namespace   *
// @description Grant resources with the click of a mouse
// @match      http://dhmholley.co.uk/civclicker.html
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// ==/UserScript==

var civClickAuto = {
    init: function() {
		civClickAuto.loadSettings();
		civClickAuto.menu();
		civClickAuto.applyStyles();
        civClickAuto.expandCollapse();
		civClickAuto.dragit();
		civClickAuto.giveFood();civClickAuto.giveMaxFood();
		civClickAuto.giveWood();civClickAuto.giveMaxWood();
		civClickAuto.giveStone();civClickAuto.giveMaxStone();
	},
	options: {
	    version: 1.0
		,left: 0
		,top: 0
	},
	menu: function() {
		var menu = '<div id="autoclickerMenu">';
		menu += '<div id="autoclickerMenuTitle">';
		menu += 'Civ Clicker Auto Clicker v'+civClickAuto.options.version;
		menu += '<span id="autoclickerMenuTitleExpandCollapse" class="autoclickerShow">&#43;</span>';
		menu += '</div>';
		menu += '<div id="autoclickerMenuContent">';
		menu += '<strong>Gimme</strong><br />';
		menu += '<input type="text" id="foodAmtCCA" name="foodAmtCCA" style="width: 50px;" /> ';
		menu += '<input type="button" name="foodBtnCCA" id="foodBtnCCA" value="Food" class="autoclickerButton" />';
		menu += '<input type="button" name="foodMaxBtnCCA" id="foodMaxBtnCCA" value="Max Food" class="autoclickerButton" /><br />';
		menu += '<input type="text" id="woodAmtCCA" name="woodAmtCCA" style="width: 50px;" /> ';
		menu += '<input type="button" name="woodBtnCCA" id="woodBtnCCA" value="Wood" class="autoclickerButton" />';
		menu += '<input type="button" name="woodMaxBtnCCA" id="woodMaxBtnCCA" value="Max Wood" class="autoclickerButton" /><br />';		
		menu += '<input type="text" id="stoneAmtCCA" name="stoneAmtCCA" style="width: 50px;" /> ';
		menu += '<input type="button" name="stoneBtnCCA" id="stoneBtnCCA" value="Stone" class="autoclickerButton" />';
		menu += '<input type="button" name="stoneMaxBtnCCA" id="stoneMaxBtnCCA" value="Max Stone" class="autoclickerButton" /><br />';
		menu += '</div>';
		menu += '</div>';
		
		$("body").append(menu);
	},
	giveFood: function() {
		$("#foodBtnCCA").click(function() {
		    var runAmt = parseInt($("#foodAmtCCA").val());
			if(!isNaN(runAmt)) {
				civClickAuto.runThis(food, runAmt);
			} else {
				alert(runAmt + ' is not a number!');
			}
		});
	},
	giveMaxFood: function() {
		$("#foodMaxBtnCCA").click(function() {
			runAmt = (200 + ((barn.total + (barn.total * upgrades.granaries)) * 200)) - food.total;
			civClickAuto.runThis(food, runAmt);
		});
	},
	giveWood: function() {
		$("#woodBtnCCA").click(function() {
		    var runAmt = parseInt($("#woodAmtCCA").val());
			
			if(!isNaN(runAmt)) {
				civClickAuto.runThis(wood, runAmt);
			} else {
				alert(runAmt + ' is not a number!');
			}
		});
	},
	giveMaxWood: function() {
		$("#woodMaxBtnCCA").click(function() {
			runAmt = (200 + (woodstock.total * 200)) - wood.total;
			civClickAuto.runThis(wood, runAmt);
		});
	},
	giveStone: function() {
		$("#stoneBtnCCA").click(function() {
		    var runAmt = parseInt($("#stoneAmtCCA").val());
			if(!isNaN(runAmt)) {
				civClickAuto.runThis(stone, runAmt);
			} else {
				alert(runAmt + ' is not a number!');
			}
		});
	},
	giveMaxStone: function() {
		$("#stoneMaxBtnCCA").click(function() {
			runAmt = (200 + (200 * stonestock.total)) - stone.total;
			civClickAuto.runThis(stone, runAmt);
		});
	},
	runThis: function(type, runCount) {
		for(var i = 0; i < runCount; i++) {
			increment(type);
		}
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
	dragit: function() {
		$("#autoclickerMenu").draggable({ 
		    distance: 20 
			,stop: function(event, ui) {
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
				
				civClickAuto.setCookie("autoclicker_left", left);
				civClickAuto.setCookie("autoclicker_top", top);
			}
		});
	},
    applyStyles: function() {
		$("#autoclickerMenu").css({
			"z-index": 999
			,"width": "300px"
			,"position" : "fixed"
			,"border" : "4px solid #C3C3C3"
			,"border-radius" : "8px"
			,"left" : civClickAuto.options.left+"px"
			,"top" : civClickAuto.options.top+"px"
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
			,"width":"90px"
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
	loadSettings: function() {
		//load settings from cookie if exists. If exists, then set as default. It not exist, then use default setting.
		var left = civClickAuto.getCookie("autoclicker_left");
		if(left.length && !isNaN(left)) {
			civClickAuto.options.left = left;
		}
		var top = civClickAuto.getCookie("autoclicker_top");
		if(top.length && !isNaN(top)) {
			civClickAuto.options.top = top;
		}
	},
}

$(document).ready(civClickAuto.init);