// ==UserScript==
// @name           Bonus nocny (Eta)
// @author         Wszechmogący
// @include        http://*.grepolis.*/game/map*
// @description    Skrypt pokazuje podczas ataku czy wojsko dotrze podczas bonusu nocnego. Jeśli godzina dotarcia będzie na czerwono oznacza to, że będzie bonus nocny, jeśli na zielono to go nie będzie. 
// ==/UserScript== 
(function () {
	//access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}

	//get jQuery
	var $ = uW.jQuery;

	//add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function () {
			return false;
		};
	}
	//Object.create() by Douglas Crockford
	if(typeof Object.create !== 'function'){
		Object.create = function (o) {
			var F = function () {};
			F.prototype = o;
			return new F();
		};
	} 
	
	var NightBonus = (function () {
		var TownInfo;
		var bindDurationCounter_old;
		var Start = new Date();
		Start.setHours(23);
		Start.setMinutes(0);
		Start.setSeconds(0);
		var End = new Date();
		End.setHours(6);
		End.setMinutes(0);
		End.setSeconds(0);
		
		var calc = function () {
			var ArrivalTime = $("#arrival_time");
			if (ArrivalTime.html() == "") {
				window.setTimeout(calc, 100);
				return;
			}
			var SplitedTime = ArrivalTime.html().split("~");
			var temp = SplitedTime[0];
			if(temp == "")
			{
				temp = SplitedTime[1];
			}
			var Time = temp.split(":");
			var Arrival = new Date();
			Arrival.setHours(parseInt(Time[0]));
			Arrival.setMinutes(parseInt(Time[1]));
			Arrival.setSeconds(parseInt(Time[2]));
			ArrivalTime.css("font-weight", "bold");
			if(Arrival > End && Arrival < Start)
			{
				// no night bonus
				ArrivalTime.css("color", "#00b000");
			}
			else
			{
				// night bonus
				ArrivalTime.css("color", "#b00000");
			}
		};
		
		var bindDurationCounter_new = function () {
			
			$('.index_unit').bind('click', calc);
			$('.unit_input').bind('keyup', calc);
			return bindDurationCounter_old.apply(TownInfo, arguments);
		};
		
		return function () {
			if (document.URL.indexOf("game/map") != -1) 
			{
				TownInfo = uW.TownInfo;
				bindDurationCounter_old = TownInfo.bindDurationCounter;
				TownInfo.bindDurationCounter = bindDurationCounter_new;
			}
		};
	}());
	
	NightBonus();
}());