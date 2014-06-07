// ==UserScript==
// @name        Gold Meter
// @namespace   http://www.ismailceylan.com.tr
// @description Dinamik altın sayacı
// @include     http://s*.ikariam.com/*
// @version     1.0.0
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
var timer_DataHunter = timer_Counter = 0;

timer_DataHunter = window.setInterval(function(){
	$("td.sigma").each(function(){
		var target = $(this).parent().find('td.res:last');
		var income = $("td.bold:last");

		target.css({
			"font-size": "28px",
			"font-family": "Segoe UI, verdana, tahoma, arial",
			"font-weight": "bold",
			"letter-spacing": "1px"
		});

		if(this.innerHTML == "Altın miktarı"){
			sessionStorage.setItem("total_golds", target.html().replace(/(,)/g, ''));
			sessionStorage.setItem("hourly_income", income.html().replace(/(,)/g, ''));

			timer_Counter = window.setInterval(function(){
				var c  = parseInt( sessionStorage.getItem("total_golds"), 10) + 1,
				    x1 = (c+'').substring(0, 2),
				    x2 = (c+'').substring(2,5),
				    x3 = (c+'').substring(5,8);

				target[0].innerHTML = x1 + ',' + x2 + ',' + x3;
				sessionStorage.setItem("total_golds", c);
			}, 3600000 / Math.round(sessionStorage.getItem("hourly_income")) );

			window.clearInterval( timer_DataHunter );
		}
	});
}, 5000);