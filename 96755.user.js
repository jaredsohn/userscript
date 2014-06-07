// JavaScript Document
// ==UserScript==
// @name           swan song for "mobile" version
// @autor          roselan
// @version        0.1.8
// @icon           http://s3.amazonaws.com/uso_ss/icon/96755/large.jpg?1349550351
// @downloadURL    https://userscripts.org/scripts/source/96755.user.js
// @updateURL      https://userscripts.org/scripts/source/96755.meta.js
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    tries to improve new and stupid ikariam 0.4.2+ spies
// @include        http://m*.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://code.jquery.com/jquery-1.8.2.min.js
// @grant          none
// ==/UserScript==

$(document).ready(function(){

    SwanSong.init();

});

var Timer = (function () {
    var timers = {};
    return {
        start: function(name) {
            if (timers[name]) timers[name].push(new Date().getTime());
            else timers[name] = [new Date().getTime()];
        },
        stop: function(name) {
            var timer = timers[name],
                pos = timer.length-1,
                last = timer[pos],
                diff = (new Date()).getTime() - last;

            timers[name][pos] = diff;
        },
        log: function(name, callback) {
    		this.start(name);
            var x = callback.call();
            this.stop(name);
            return x;
        },
        print: function() {
            var name;
            for ( name in timers ) {
                var total = 0,
                    a = timers[name],
                    i = a.length - 1;
                for ( ; i >= 0; i--) {
                    total += a[i];
                }
                console.log(name+': '+total+'ms');
            }

        }
    };
})(Timer);


var SwanSong = (function () {

	var host = window.location.host,
		scriptId = 'SwanSong.'+host,
		langData,
		timeIt = false;

	var formatNumber = function (x) {
		while (x.match(/^\d\d{3}/)){
			x = x.replace(/(\d)(\d{3}(\.|,|$))/, '$1,$2');
		}
		return x;
	};

    var parseIkariamDate = function(strDate) {
        var a = strDate.replace(' ', '.').replace(/\:/g, '.').split('.');
		if (a.length == 5) a.push(0);
		return new Date(a[2], a[1]-1, a[0], a[3], a[4], a[5]).valueOf();
    };


	// Language
	var getLangData = function () {
		var urlParts = host.split('.');
		var lang = urlParts[urlParts.length - 1];
		if (lang == 'com' && urlParts.length == 4) { //for example: http://s1.ba.ikariam.com
			lang = urlParts[1];
		}
		if (lang == 'net' && urlParts.length == 3) { //for example: http://s1.ikariam.net/
			lang = 'tr';
		}

		switch (lang) {

		// French
		case 'fr': return {job: 'Espionner l`entrepôt', wall: 'Mur', warehouses: 'Entrepôts', ships_active: 'Bateaux si actif', ships_inactive: 'Bateaux si inactif', mortars: 'mortiers'};

		// german
		case 'de': return {job: 'Lagerstand inspizieren', wall: 'Mauer', warehouses: 'Lagerhaus', ships_active: 'HS für aktive', ships_inactive: 'HS für inaktive', mortars: 'Mörser'};

		// Russian
		case 'ru': return {job: 'Шпионаж складов', wall: 'Стена', warehouses: 'Склады', ships_active: 'Сухогрузов', ships_inactive: 'Сухогрузов (Ишка)', mortars: 'миномёт'};

		// English default
		default  : return {job: 'Spy the warehouse', wall: 'Wall', warehouses: 'Warehouses', ships_active: 'Ships if active', ships_inactive: 'Ships if inactive', mortars: 'mortars'};
		}

		return;
	};


	// add info to each resource report
	var improveSpyReport = function (city, $detailsRow) {
		var lootInactive = 0,
			lootActive	= 0,
			safeInactive = 17,
			safeActive = 100,
			safeLevelInactive = 80,
			safeLevelActive = 480,
			minMortars = 0,
			resources = $detailsRow.find('#resources td.count');

		// compute safe resources
		city.warehouses.sort(function(a,b){return b - a;});
		for (var i = 0; i < city.warehouses.length && i < 4; i++) {
			safeInactive += city.warehouses[i] * safeLevelInactive;
			safeActive += city.warehouses[i] * safeLevelActive;
		}

		// compute lootable resources
		if (resources) {
			$(resources).each( function () {
				var quantity = $(this).text().replace(',', '');
				lootInactive += Math.max(quantity - safeInactive, 0);
				lootActive   += Math.max(quantity - safeActive, 0);
			});
		}

		// compute min mortars needed for 1 section of wall
		minMortars = city.wall ? Math.ceil((50*city.wall+100)/(273-4*city.wall)) : 0;

		// update detailed report
		$detailsRow.find('#resources')
			.append('<tr><td>'+langData.wall+'</td><td class="minMortars">'+city.wall+' ('+minMortars+' '+langData.mortars+')</td></tr>')
			.append('<tr><td>'+langData.warehouses+'</td><td>'+city.warehouses+'</td></tr>')
			.append('<tr><td>'+langData.ships_active+'</td><td>'+Math.ceil(lootActive / 500)+'</td></tr>')
			.append('<tr><td>'+langData.ships_inactive+'</td><td class="lootInactive">'+Math.ceil(lootInactive / 500)+'</td></tr>');

		// update main report
		$detailsRow.prev().find('td.subject').html( '<span class=lootInactive>'+Math.ceil(lootInactive / 500)+'</span><span class=separator> / </span><span class=minMortars>'+minMortars+'</span>');

		// linkify owner and city
		if (city.cityId) {
			var url = 'index.php?view=plunder&destinationCityId=' + city.cityId,
				$cityTd = $detailsRow.prev().find('td.targetCity'),
				$ownerTd = $detailsRow.prev().find('td.targetOwner');
			$cityTd.html('<a href="'+url+'">'+$cityTd.text()+'</a>');
			$ownerTd.html('<a href="'+url+'">'+$ownerTd.text()+'</a>');
		}
	};

    // save last report to get hourly production
	// TODO compute things by resource so that lootable quantity can be computed.
    var saveHourlyProduction = function(city, $detailsRow) {
        var thisReport = {},
            lastReport = city.lastReport || {},
            resources = $detailsRow.find('#resources td.count'),
			thisHourlyProd,
			lastHourlyProd,
            save = false;

        // get this report quantity and date
        thisReport.time = parseIkariamDate($detailsRow.prev().find('td.date').text());
        thisReport.quantity = 0;
        if (resources) {
            $(resources).each( function () {
                thisReport.quantity += $(this).text().replace(',', '')-0;
            });
        }

        if ( Object.keys(lastReport).length ) {
            // check if thisReport.date > lastReport.date
            if ( thisReport.time > lastReport.time ) {
				// compute quantity and diff with lastReport
                thisReport.deltaTime = thisReport.time - lastReport.time;
                thisReport.deltaQuantity = thisReport.quantity - lastReport.quantity;
                thisHourlyProd = thisReport.deltaQuantity / thisReport.deltaTime;
				lastHourlyProd = lastReport.deltaQuantity / lastReport.deltaTime || 0;
				// if higher save maxHourlyProd, save thisRerport as lastReport
                // recently inactive players will see their pop shrink, and so their workers and prod -> define time limit or way to reinit (max) hourlyProd
                if ( thisHourlyProd > lastHourlyProd ) {
                    city.lastReport = thisReport;
                    save = true;
                }
            }
        }
        else {
            // save thisReport as lastReport
            city.lastReport = thisReport;
            save = true;
        }

        return save;
    };


	// ** spy center: add target resource and quantity estimation **
	var handleSpyCenter = function() {
		if ( $('body[id=safehouse]').length ) {
			if (timeIt) console.time('SwanSong handleSpyCenter assignations');

			if (timeIt) console.time('SwanSong handleSpyCenter assign citites');
			var cities = JSON.parse(localStorage.getItem(scriptId)) || {};
			if (timeIt) console.timeEnd('SwanSong handleSpyCenter assign citites');
			if (timeIt) console.time('SwanSong handleSpyCenter assign spyCities');
			var	$spyCities = $('div.spyinfo');
			if (timeIt) console.timeEnd('SwanSong handleSpyCenter assign spyCities');
			if (timeIt) console.timeEnd('SwanSong handleSpyCenter assignations');

            var	citiesById = {},
                i,
                $city,
                $status,
                cityId,
                good,
                title,
                lastReport,
                prodRate,
                estimatedQuantity = 0,
                now,
                deltaTime;


			// rebuild an object with cityId as key as player name is not available here
			// so that the cities obj can be accessed directly.
			if (timeIt) console.time('SwanSong handleSpyCenter rebuild cities obj');
			for (i in cities) {
				citiesById[cities[i].cityId] = cities[i];
				citiesById[cities[i].cityId].id = i;
			}
			if (timeIt) console.timeEnd('SwanSong handleSpyCenter rebuild cities obj');

			if (timeIt) console.time('SwanSong handleSpyCenter update loop');
			$spyCities.each( function () {

				if (timeIt) Timer.start('SwanSong handleSpyCenter assignations');
				$city = $(this).find('li.city');
				if ( $city.find('a[title]').length ) {
					cityId = $city.find('a').first().attr('href').split('=').pop().trim() ;
					good = citiesById[cityId] && citiesById[cityId].good || 'wood';
					title = citiesById[cityId] && citiesById[cityId].good || 'Please visit the city island!';
					if (timeIt) Timer.stop('SwanSong handleSpyCenter assignations');

					// add precious resource
					if (timeIt) Timer.start('SwanSong handleSpyCenter append');
					$city.append('<span> - <span><img src="/skin/resources/icon_' + good + '.png" title="' + title + '">');
					if (timeIt) Timer.stop('SwanSong handleSpyCenter append');

					// add quantity estimaton from last report
					if ( citiesById[cityId] && citiesById[cityId].lastReport && citiesById[cityId].lastReport.deltaTime ) {
						lastReport = citiesById[cityId].lastReport;
						$status = $(this).find('li.status');
						now = new Date().valueOf();
						deltaTime = now - lastReport.time;
						prodRate = lastReport.deltaQuantity / lastReport.deltaTime;
						estimatedQuantity = Math.round(lastReport.quantity + prodRate*deltaTime);
						//console.log(lastReport.quantity, prodRate, deltaTime, lastReport.deltaTime);
						$status.html('Quantity estimation: ' + formatNumber(estimatedQuantity+'') + ' (+' + formatNumber(Math.round(prodRate*3600000)+'') + ' r/h) | <span class=delete>[x]</span>');
					}
				}

			});
			
			
			$spyCities
				.on('hover', 'span.delete', function() {
					$(this).css('color', 'red').css('cursor', 'pointer');
				})
				.on('click', 'span.delete', function () {
					var $this = $(this),
						$city,
						cityId,
						id;
					$city = $this.closest('div.spyinfo');
					cityId = $city.find('a').first().attr('href').split('=').pop().trim();
					
					id = citiesById[cityId].id;					
					cities[id].lastReport = {};
					localStorage.setItem(scriptId, JSON.stringify(cities));
					$this.closest('li.status').text('Quantity estimation deleted');
				});
			
			
			Timer.print();

			if (timeIt) console.timeEnd('SwanSong handleSpyCenter update loop');

		}
	};


	// **spy mission page**
	var handleSpyMissionPage = function () {
		if ($('#spyMissions').length) {
			// hide useless shit
			$('#missionForm > div.missionWrapper').eq(1).hide();
			$('#missionDescription').hide();

			// select warehouse as default action
			$('#missionSelect option[value="5"]')[0].selected = true;

			// set max number of spies
			$('div.realMission a.setMax').click();
		}
	};

	// **improve reports**
	var handleSpyReports = function () {
		var $reports = $('#espionageReports'),
            save = false;

		if ($reports.length) {

			// display last report
			$reports.find('tbody tr.report').eq(0).css('display', '');

			langData = getLangData();

			// compute and display ships
			var cities = JSON.parse(localStorage.getItem(scriptId));
			$reports.find('tr.entry td.money').closest('tr').each( function () {
			//$('#espionageReports > tbody > tr.report').each( function () {
				var $this = $(this),
					$detailsRow = $this.next(),
					player = $this.find('td.targetOwner').text().trim(),
					name = $this.find('td.targetCity').text().trim(),
					city = {};

				if (cities[player+name]) {
					improveSpyReport(cities[player+name], $detailsRow);
					if (saveHourlyProduction(cities[player+name], $detailsRow)) {
						save = true;
					}
				}
				else {
					$this.find('td.subject').text('please visit the city');
				}                
			});

            if (save) {
                localStorage.setItem(scriptId, JSON.stringify(cities));
            }

			// add select fail reports
			$reports.find('td.footerText').first().append(' | <a id="markFail" href="javascript:;">Fail</a>');
			$('#markFail').click(function() {
				$reports.find('tbody > tr.entry').each( function() {
					var $this = $(this),
						$checkbox = $this.find('td.deletionCheckBox input');
					if ($checkbox.length) $checkbox[0].checked = $this.find('td.resultImage img').attr('src') == 'skin/buttons/no.png';
				});
			});

			$reports.find('td.footerText').first().append(' | <a id="markCrumb" href="javascript:;">Crumb</a>');
			$('#markCrumb').click(function() {
				$reports.find('tbody > tr.entry').each( function() {
					var $this = $(this),
						$checkbox = $this.find('td.deletionCheckBox input');
					if ($checkbox.length) $checkbox[0].checked = $this.find('span.lootInactive').text()-0 < 30;
				});
			});
		}
	};

	// saves cities... to better plunder them
	var saveCities = function () {
		if ($('#city').length && $('#information div.missionButton a').length) {
			var	cities = JSON.parse(localStorage.getItem(scriptId)) || {},
				player = $('#information li.owner').text().split(':').pop().trim(),
				name = $('#information > h3.header').text().trim(),
				cityId = $('#information div.missionButton a').attr('href').split('=').pop().trim(),
				wall = $('#locations > li.wall > a').attr('title').split(' ').pop().trim()-0 || 0,
				warehouses = [];

			$('#locations > li.warehouse').each( function () {
				warehouses.push($(this).find('a').attr('title').split(' ').pop().trim());
			});

			// don't use city id as key because when a city needs to be looked up (in spy Reports), there is no city id
			cities[player+name] = cities[player+name] || {};
			cities[player+name].cityId = cityId;
			cities[player+name].wall = wall;
			cities[player+name].warehouses = warehouses;
			localStorage.setItem(scriptId, JSON.stringify(cities));

		}
	};

	var saveIslandTradegood = function() {
		var $cities = $('#cities');

		if ( $cities.find('tr.spy').length ) {
			var tradegood = $('#tradegood ').attr('class').split(' ')[0],
				/*$spiedCities = $cities.find('li').filter( function () {
					return $(this).find('tr.spy').length > 0;
				});*/
				$spiedCities = $cities.find('li tr.spy').closest('li'); // 4x faster

			if ( $spiedCities.length )	{
				var cities = JSON.parse(localStorage.getItem(scriptId)) || {},
					save = false;

				$spiedCities.each(function () {
					var $city = $(this),
						cityId = $city.find('a').first().attr('id').split('_')[1],
						player = $city.find('tr.owner td').eq(1).text().trim(),
						name = $city.find('tr.name td').eq(1).text().split('(').slice(0, -1).join('(').trim(); // handles "(" in name.

					if (!cities[player+name] || !cities[player+name].good) save = true;
					cities[player+name] = cities[player+name] || {};
					cities[player+name].cityId = cityId;
					cities[player+name].good = tradegood;
				});
				console.log(cities, save);
				if (save) localStorage.setItem(scriptId, JSON.stringify(cities));
			}
		}
	};

	return {
		init: function() {

			if (timeIt) console.time('SwanSong');

			if (timeIt) console.time('SwanSong handleSpyCenter');
			handleSpyCenter();
			if (timeIt) console.timeEnd('SwanSong handleSpyCenter');

			if (timeIt) console.time('SwanSong handleSpyMissionPage');
			handleSpyMissionPage();
			if (timeIt) console.timeEnd('SwanSong handleSpyMissionPage');

			if (timeIt) console.time('SwanSong handleSpyReports');
			handleSpyReports();
			if (timeIt) console.timeEnd('SwanSong handleSpyReports');

			if (timeIt) console.time('SwanSong saveCities');
			saveCities();
			if (timeIt) console.timeEnd('SwanSong saveCities');

			if (timeIt) console.time('SwanSong saveIslandTradegood');
			saveIslandTradegood();
			if (timeIt) console.timeEnd('SwanSong saveIslandTradegood');

			if (timeIt) console.timeEnd('SwanSong');

		}
	};

})(SwanSong);