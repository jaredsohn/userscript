// Vendetta Global Meter
// version 0.3 
// 2007-04-24
// Copyright (c) 2005, Davide Consonni
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name          Vendetta Vista Globale 0.31
// @author        hellview, Al_Caponazzo
// @description   Better global view.
// @include       http://s*.vendetta1923.it/vendetta/*
// ==/UserScript==

	function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}

	function formatNumber ( n, c, d, t ) {
		var m = ( c = Math.abs( c ) + 1 ? c : 2, d = d || ",", t = t || ".", /(\d+)(?:(\.\d+)|)/.exec( n + "" ) ), x = m[1].length % 3;
		return ( x ? m[1].substr( 0, x ) + t : "" ) + m[1].substr( x ).replace( /(\d{3})(?=\d)/g, "$1" + t ) + ( c ? d + ( +m[2] ).toFixed( c ).substr( 2 ) : "" );
	};

	function getColor(perc) {
		if (perc == 0) { return '#F00';}
		if (perc >0 && perc <= 10) {return '#3F3';}
		if (perc >10 && perc <= 30) {return '#090';}
		if (perc >30 && perc <= 50) {return '#000';}
		if (perc >50 && perc <= 70) {return '#08F';}
		if (perc >70 && perc < 100) {return '#01F';}
		if (perc >= 100) { return '#E0F';}
	}

	function getColorRainbow(perc) {
		if (perc < 10) { return '#280cce'; }
		if (perc >=10 && perc < 20) {return '#0c52ce';}
		if (perc >=20 && perc < 30) {return '#0c8fce';}
		if (perc >=30 && perc < 40) {return '#0cce12';}
		if (perc >=40 && perc < 50) {return '#afdf08';}
		if (perc >=50 && perc < 60) {return '#f9ff00';}
		if (perc >=60 && perc < 70) {return '#ffd200';}
		if (perc >=70 && perc < 80) {return '#ff9f00';}
		if (perc >=80 && perc < 90) {return '#ff6600';}
		if (perc >=90) { return '#ff0f00'; }
		return '#000';
	}
		
	if (location.pathname.search('empire.php') != -1 ) {		
		addGlobalStyle('.mag td { white-space: nowrap; font-size: 0.8em; text-align: right; font-family: Verdana; }');

		var values = document.getElementsByTagName("th");
		for (var i = 0; i < values.length; i++) {
			var text = values[i].childNodes[0].nodeValue || values[i].childNodes[0].childNodes[0].nodeValue;
				if (text.search('max')!=-1) {

					// get th values and parse
					text = text.replace("(max.","").replace(")","").replace( /[\.,;!#\$\/:\?'\(\)\[\]_\-\\]/g, "");
					var currentValue = text.split("  ")[0];
					var maxValue = text.split("  ")[1];
					var perc = (currentValue / maxValue )*100;

					// new th value
					values[i].innerHTML = 
						"<table class='mag' style='color: "+getColor(perc)+"'>"+
							"<tr><td></td><td style='font-weight: normal;'>"+formatNumber(currentValue, 0, '.', '.')+"</td></tr>"+
							"<tr><td></td><td>"+formatNumber(maxValue, 0, '.', '.')+"</td></tr>"+
							"<tr><td></td><td>"+Math.round(perc)+"%</td></tr>"+
						"</table>";
				}
		}
	}