// ==UserScript==
// @name           Ikariam Unit cost calculator
// @namespace      userscripts.org
// @description    Calculates the required amount of resources and citizens for a specific unit or ship
// @include        http://s*.ikariam.*/index.php?view=barracks*
// @include        http://s*.ikariam.*/index.php?view=shipyard*
// @include        http://s*.ikariam.*/index.php?view=finances*
// @version        1.3b
// ==/UserScript==

//Load prototype
var head = document.getElementsByTagName("HEAD")[0];
var jquery_src = document.createElement("SCRIPT");
jquery_src.type = "text/javascript";
jquery_src.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js";
head.appendChild(jquery_src);
		
var jquery_src = document.createElement("SCRIPT");
jquery_src.type = "text/javascript";
jquery_src.src = "http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js";
head.appendChild(jquery_src);

var observedInputs = {};

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined' || typeof unsafeWindow.jQuery.toJSON == 'undefined') { window.setTimeout(GM_wait,100); }
	else { 
		$ = unsafeWindow.jQuery;
		jQuery = unsafeWindow.jQuery;
		init(); 
	}
}
GM_wait();

function init() {
	if (window.location.href.match("view=finances")) {
		goldTimeLeft();
	}else {
		$(".textfield").bind('keyup', triggerCalculate);
		$(".textfield").bind('change', triggerCalculate);
			
		observeInputs();	
	}
}

function goldTimeLeft() {
	var income 	= $('.result').find('td:last').html() + '';
	var total 	= $('.result:last').find('td:last').html() + '';
	income 		= parseInt(income.replace(',', ''));
	total 		= parseInt(total.replace(',', ''));
	
	if (income < 0) {
		timeLeft 	= calculateTimeLeft(-(total / income));
		$('.result:last').find('td:last').html($('.result:last').find('td:last').html()+"<br />(~"+timeLeft+")");
	}
}

function calculateTimeLeft(hoursLeft) {
	
	var t = hoursLeft*60*60;
	var days = parseInt(t/86400);
	t = t-(days*86400);
	var hours = parseInt(t/3600);
	t = t-(hours*3600);
	var minutes = parseInt(t/60);
	t = t-(minutes*60);
	var content = "";
	if(days)content+=days+" "+unsafeWindow.LocalizationStrings['timeunits']['short']['day'];
	if(hours||days){ if(content)content+=", "; content+=hours+" "+unsafeWindow.LocalizationStrings['timeunits']['short']['hour']; }
	if(content)content+=", "; content+=minutes+" "+unsafeWindow.LocalizationStrings['timeunits']['short']['minute'];
	var timeLeft = content;
	
	return timeLeft;
}

function observeInputs(unit) {
	$(".textfield").each(function () {
		var input = $(this).val();
		var unit = $(this).attr('id');
		var elem = $(this)[0];
		
		if (typeof observedInputs[unit] != 'undefined') {
			if (observedInputs[unit] != input) {
				calculate(input, $(elem.parentNode.parentNode).find(".resources"));
			}
		}
		
		observedInputs[unit] = input;
	});
	setTimeout(observeInputs, 100);
}

var triggerCalculateSlide = function () {
	var textField = document.getElementById(this.textfield);
	var parent = $(textField.parentNode.parentNode).find(".resources");
	
	var count = this.actualValue;
	alert(count);
	
	calculate(count, parent);
}

var triggerCalculate = function () {
	//alert('calc');
	var parent = $(this.parentNode.parentNode).find(".resources");
	
	var count = $(this).val();
	
	if (Number(count) == 'NaN') {
		return false;
	}
	
	calculate(count, parent);
}

function formatNumber(num,dec,thou,pnt,curr1,curr2,n1,n2) {var x = Math.round(num * Math.pow(10,dec));if (x >= 0) n1=n2='';var y = (''+Math.abs(x)).split('');var z = y.length - dec; if (z<0) z--; for(var i = z; i < 0; i++) y.unshift('0'); if (z<0) z = 1; y.splice(z, 0, pnt); if(y[0] == pnt) y.unshift('0'); while (z > 3) {z-=3; y.splice(z,0,thou);}var r = curr1+n1+y.join('')+n2+curr2;return r;}
	
function calculate(count, parent) {	
	var citizens_holder = parent.find(".citizens");
	var citizens = citizens_holder[0].childNodes[1].nodeValue;
	if (citizens_holder.attr("lang") != '') citizens = citizens_holder.attr("lang");
	citizens_holder.attr("lang", citizens);
	
	if (count == 0 && citizens_holder.attr("lang") != '') {
		citizens_holder[0].childNodes[1].nodeValue = citizens;
	}else if (count > 0) {
		citizens_holder[0].childNodes[1].nodeValue = count * citizens;
	}
	
	citizens_holder[0].childNodes[1].nodeValue = formatNumber(citizens_holder[0].childNodes[1].nodeValue,0,',','','','','');
	
	var wood_holder = parent.find(".wood");
	if (typeof wood_holder[0] != 'undefined') {
		var wood = wood_holder[0].childNodes[1].nodeValue.replace(/[^0-9]/, '');
		if (wood_holder.attr("lang") != '') wood = wood_holder.attr("lang");
		wood_holder.attr("lang", wood);
		
		if (count == 0 && wood_holder.attr("lang") != '') {
			wood_holder[0].childNodes[1].nodeValue = wood;
		}else if (count > 0) {
			wood_holder[0].childNodes[1].nodeValue = count * wood;
		}
		
		wood_holder[0].childNodes[1].nodeValue = formatNumber(wood_holder[0].childNodes[1].nodeValue,0,',','','','','');
	}
	
	var sulfur_holder = parent.find(".sulfur");
	if (typeof sulfur_holder[0] != 'undefined') {
		var sulfur = sulfur_holder[0].childNodes[1].nodeValue.replace(/[^0-9]/, '');
		if (sulfur_holder.attr("lang") != '') sulfur = sulfur_holder.attr("lang");
		sulfur_holder.attr("lang", sulfur);
		
		if (count == 0 && sulfur_holder.attr("lang") != '') {
			sulfur_holder[0].childNodes[1].nodeValue = sulfur.replace(/[^0-9]/, '');
		}else if (count > 0) {
			sulfur_holder[0].childNodes[1].nodeValue = count * sulfur;
		}
		
		sulfur_holder[0].childNodes[1].nodeValue = formatNumber(sulfur_holder[0].childNodes[1].nodeValue,0,',','','','','');
	}
	
	var wine_holder = parent.find(".wine");
	if (typeof wine_holder[0] != 'undefined') {
		var wine = wine_holder[0].childNodes[1].nodeValue.replace(/[^0-9]/, '');
		if (wine_holder.attr("lang") != '') wine = wine_holder.attr("lang");
		wine_holder.attr("lang", wine);
		
		if (count == 0 && wine_holder.attr("lang") != '') {
			wine_holder[0].childNodes[1].nodeValue = wine;
		}else if (count > 0) {
			wine_holder[0].childNodes[1].nodeValue = count * wine;
		}
		
		wine_holder[0].childNodes[1].nodeValue = formatNumber(wine_holder[0].childNodes[1].nodeValue,0,',','','','','');
	}
	
	var glass_holder = parent.find(".glass");
	if (typeof glass_holder[0] != 'undefined') {
		var glass = glass_holder[0].childNodes[1].nodeValue.replace(/[^0-9]/, '');
		if (glass_holder.attr("lang") != '') wine = glass_holder.attr("lang");
		glass_holder.attr("lang", glass);
		
		if (count == 0 && glass_holder.attr("lang") != '') {
			glass_holder[0].childNodes[1].nodeValue = glass;
		}else if (count > 0) {
			glass_holder[0].childNodes[1].nodeValue = count * glass;
		}
		
		glass_holder[0].childNodes[1].nodeValue = formatNumber(glass_holder[0].childNodes[1].nodeValue,0,',','','','','');
	}
	
	var upkeep_holder = parent.find(".upkeep");
	var upkeep = upkeep_holder[0].childNodes[1].nodeValue.replace(/[^0-9]/, '');
	if (upkeep_holder.attr("lang") != '') upkeep = upkeep_holder.attr("lang");
	upkeep_holder.attr("lang", upkeep);
	
	if (count == 0 && upkeep_holder.attr("lang") != '') {
		upkeep_holder[0].childNodes[1].nodeValue = upkeep;
	}else if (count > 0) {
		upkeep_holder[0].childNodes[1].nodeValue = count * upkeep;
	}
	
	upkeep_holder[0].childNodes[1].nodeValue = formatNumber(upkeep_holder[0].childNodes[1].nodeValue,0,',','','','','');
	
	
	//alert(upkeep);
	//alert($(this).val());
}