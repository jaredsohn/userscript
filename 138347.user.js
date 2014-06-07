// JavaScript Document
// ==UserScript==
// @name           plunder logger ("mobile" version)
// @autor          roselan
// @version        0.1.3
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    logs plunder activiy for combat reports and displays loot info in city page 
// @include        http://m*.*.ikariam.*/*view=island*
// @include        http://m*.*.ikariam.*/*view=militaryAdvisorReportView*
// @include        http://m*.*.ikariam.*/*view=tradeAdvisor*
// @include        http://m*.*.ikariam.*/index.php
// @exclude        http://board.ikariam.*/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==
	

$(document).ready(function(){
	console.time('plunderLogger');
	
	PlunderLogger.init();
	//PlunderLogger.purge();
	
	console.timeEnd('plunderLogger');
});
	


var PlunderLogger = (function () {
	
	var scriptId = 'plunderLogger.'+window.location.host;
		
	String.prototype.parseIkariamDate = function() {
		var a = this.replace(' ', '.').replace(/\:/g, '.').split('.');
		if (a.length == 5) a.push(0);
		return new Date(a[2], a[1]-1, a[0], a[3], a[4], a[5]).valueOf();                
	}

	String.prototype.toIkariamStringDate = function () {
		var dt = new Date(this)
		return dt.getDate().toString()
			+'.'+(dt.getMonth()+1)
			+'.'+dt.getFullYear().toString()
			+' '+dt.getHours()
			+':'+(dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes()
			+':'+(dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
	}
			
	// can't use Object.prototype.sortedFor as the function will be added to each object, and saved by localstorage...
	var sortedFor = function(obj, callBack, sortFunction) {
		var keys = [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) keys.push(key);
		}
		keys.sort(sortFunction);
		for (var i = 0; i < keys.length; i++) {
			callBack(keys[i], this[ keys[i] ]);
		}
	}

	var formatNumber = function (x) {
			while (x.match(/^\d\d{3}/)){
			   x = x.replace(/(\d)(\d{3}(\.|,|$))/, '$1,$2');
			}
			return x;
		}
		
		
	// Language specific section
	var getLangData = function()	{
		var urlParts = window.location.host.split('.'),	
			lang = urlParts[urlParts.length - 1];
		if (lang == 'com' && urlParts.length == 4) lang = urlParts[1]; //for example: http://s1.ba.ikariam.com
		if (lang == 'net' && urlParts.length == 3) lang = 'tr'; //for example: http://s1.ikariam.net/
		
		switch (lang) {
			
			// French
			case 'fr': return {tradesGoodRepelledPrefix: 'Votre transport de troupes est arrivé à', repelled: 'repoussé'}; break;
				
			// German
			case 'de': return {tradesGoodRepelledPrefix: '???', repelled: 'abgestoßen'}; break;
			
			// Russian
			case 'ru': return {tradesGoodRepelledPrefix: '???', repelled: 'отталкивало'}; break;
			
			// English default
			default : return {tradesGoodRepelledPrefix: '???', repelled: 'repelled'}; 
		}	
		return {};
	}
	
	// ** display loots in island info box for each city **
	var displayLootInfo = function (cities, $city) {
		var lang = getLangData(),
			cityId = 	$city.find('a').attr('id').split('_').pop(),
			reports = cities[cityId],
			$info = $('#information tbody'),
			$tooltip,
			$row,
			i=0,
			alt='';
		
		sortedFor(reports, function (dt) {
			var resources = 0,
				strDate = dt.toIkariamStringDate();
			if (reports[dt]) {
				$tooltip = $('<div class="tooltip2" style="display: none; "><h5 style="width: 300px">'+strDate+'</h5></div>');
				for (var res in reports[dt]) {
					resources += reports[dt][res]-0;
					$tooltip.append('<div class="unitBox" title="'+res+'"><div class="iconSmall" style="height: 21px"><img src="skin/resources/icon_'+res+'.png"></div><div class="count">'+reports[dt][res]+'</div></div>');
						
				}
				resources = formatNumber(''+resources);
			}
			else if (reports[dt] === 0) resources = '0';
			else resources = lang['repelled'];
			alt = ++i % 2 == 0 ? ' alt' : '';
			$row = $('<tr class="plunderlog score sub'+alt+'"><td class="nameValue" colspan="2" style="cursor: pointer">'+strDate.split(' ')[0]+'</td><td class="scoreValue" colspan="2">'+resources+'</td></tr>');
			$row.find('td.nameValue').append($tooltip);		
			$info.append($row);
			
		},
		function (a, b) { 
			return b-a;
		});
	}

	// ** read loot report and save data**
	var initLootReport = function () {
				
		var $report = $('#troopsReport');
		
		// only log finished reports
		if ( $report.find('div.winners').length ) {
			
			var cityId = $report.find('div.defender b a').attr('href').split('=').pop(),
				dt = $report.find('h3 span.date').text().replace('(', '').replace(')', '').parseIkariamDate(), // 13.07.2012 17:12:00 // 11.07.2012 0:13:04
				resources = {},
				cities = JSON.parse(localStorage.getItem(scriptId)) || {},
				reports = cities[cityId] || {};
			
			if ( $report.find('ul.resources').length ) {
				$report.find('ul.resources li').each( function () {
					var $this = $(this),
						resource = $this.attr('class')
						quantity = $this.text().split(':').pop().trim();
						resources[resource] = quantity;
				});
			}
			else resources = 0;
			
			reports[dt] = resources;
			cities[cityId] = reports;
			localStorage.setItem(scriptId, JSON.stringify(cities));
		}
	}

	// ** read trade advisor page for plunders pushed back by fleets, and save it **
	var initTradeAdvisor = function () {
		
		var cities = JSON.parse(localStorage.getItem(scriptId)),
			lang = getLangData(),
			save = false;
			
		$('#inboxCity tbody tr').each( function () {
			var $this = $(this);
			
			if ( $this.find('td.subject').text().indexOf(lang.tradesGoodRepelledPrefix) == 0)  {
				var cityId = $this.find('td.subject a').attr('href').split('=').pop(),
					reports = cities[cityId] || {},
					dt = $this.find('td.date').text().parseIkariamDate(); //13.07.2012 0:57
				reports[dt]  = false;
				cities[cityId] = reports;
				save = true;
			}				
		});
		if ( save ) localStorage.setItem(scriptId, JSON.stringify(cities));	

	}

	// ** island view: display info **
	var initIslandView = function () {
	
		var $city = 	$('ul#cities li.city.selected'),
			cities = JSON.parse(localStorage.getItem(scriptId));
		
		if ($city.length && cities) displayLootInfo(cities, $city);
		
		$('#cities').on('click', 'li.city', function () {
			displayLootInfo(cities, $(this));
		});			
		
		$('#information')
			.on('mouseover', 'tr.plunderlog td.nameValue', function () {
				$(this).find('div.tooltip2').show();
			})
			.on('mouseout', 'tr.plunderlog td.nameValue', function () {
				$(this).find('div.tooltip2').hide();
			});		
	
	}
	
	// public function.
	return {
		init: function() {
			//localStorage.removeItem(scriptId);
			var page = $('body').attr('id');
			
			switch (page) {
				case 'militaryAdvisorReportView':	initLootReport(); 	break;
				case 'tradeAdvisor':				initTradeAdvisor(); break;
				case 'island':						initIslandView(); 	break;
			}
		} /*,
		purge: function () {
			var cities = JSON.parse(localStorage.getItem(scriptId)),
				newCities = {},
				time = 15*60*1000,
				isEmpty = function(map) {
				   for(var key in map) {
					  if (map.hasOwnProperty(key))  return false;
				   }
				   return true;
				};
			
			for (var r in cities) {
				var report = cities[r];
					//prevReport = false;
					
				newCities[r] = {};
			
				sortedFor(report, function (dt) {
					
					var d = dt-0-time;
					
					if ( report[d] === undefined || !isEmpty(report[dt]) ) newCities[r][dt] = cities[r][dt];					
					else console.log(report[d], report[dt]);
					
				},
				function (a, b) { 
					return b-a;
				});
				
			}
			
			localStorage.setItem(scriptId, JSON.stringify(newCities));
			console.log(cities, newCities);
		}*/
	}
})(PlunderLogger);
