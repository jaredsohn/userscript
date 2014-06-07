// ==UserScript==
// @name        Resources in Flight (by Eleria)
// @namespace   -
// @description    Shows summary of all resources on movement-page
// @include     http://*.ogame.*/game/index.php?*page=*
// @version     1.0.8.0
// @require        http://userscripts.org/scripts/source/118453.user.js
// @updateURL      http://userscripts.org/scripts/source/175701.meta.js
// @downloadURL    https://userscripts.org/scripts/source/175701.user.js
// ==/UserScript==

oGameVersionCheck('Resources in Flight (by Eleria)','5.6.3.99','http://userscripts.org/scripts/show/175701');

(function(){
	if (document.location.href.indexOf('movement') > -1) {

		var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
		var $ = unsafe.jQuery;
		if ( !$ ) return;
		
		var inhalt = $('#inhalt');
		var gesamt = { met: 0, kris: 0, deut: 0 };
		var ziele  = new Array();
		var planets = new Array();
		
		var activePlanetRess = {
			met: parseInt($('span#resources_metal').text().replace(/\./g,''), 10),
			kris: parseInt($('span#resources_crystal').text().replace(/\./g,''), 10),
			deut: parseInt($('span#resources_deuterium').text().replace(/\./g,''), 10)
		};
		
		// Eigene Planeten
		$('#planetList .smallplanet').each(function(){
			var planetCoords = ($(this).find('.planetlink .planet-koords').html() || '').replace(/\[/,'').replace(/\]/,'');
			var planetName = $(this).find('.planetlink .planet-name').html().trim();
			var planetActive = false;
			var planetMoon = false;
			
			$(this).find('a').each(function(){
				if ($(this).hasClass('planetlink')) {
					planetActive = $(this).hasClass('active');
					planetMoon = false;
					planets.push({
						coords:planetCoords,
						name:planetName,
						active:planetActive,
						moon:planetMoon
					});
				}
				if ($(this).hasClass('moonlink')) {
					planetActive = $(this).hasClass('active');
					planetMoon = true;
					planets.push({
						coords:planetCoords,
						name:planetName,
						active:planetActive,
						moon:planetMoon
					});
				}
			});
		});
		
		// Alle Flotten
		inhalt.find('.fleetDetails').each(function(){
			var dataReturnFlight = false;
			if ($(this).attr('data-return-flight') == 'true') dataReturnFlight = true;
			
			var originMoon = ($(this).find('.originData .originPlanet figure').hasClass('moon') || false);
			var originCoords = ($(this).find('.originData .originCoords a').html() || '').replace(/\[/,'').replace(/\]/,'');
			var originPlanet = ($(this).find('.originData .originPlanet').text() || '').trim();
			var destinationCoords = ($(this).find('.destinationData .destinationCoords a').html() || '').replace(/\[/,'').replace(/\]/,'');
			var destinationMoon = ($(this).find('.destinationData .destinationPlanet figure').hasClass('moon') || false);
			var destinationPlanet = ($(this).find('.destinationData .destinationPlanet span:nth-child(1)').text() || '').trim();
			if ($(this).find('.destinationData .destinationPlanet span:nth-child(1) span:nth-child(1)').length > 0) {
				destinationPlanet = ($(this).find('.destinationData .destinationPlanet span:nth-child(1) span:nth-child(1)').text() || '').trim();
			}
			
			var tooltipRelSelector = $(this).find('.fleetDetailButton a').attr('href');
			var fleetinfo = $(tooltipRelSelector).find('table.fleetinfo');
			
			var anzahlZeilen = fleetinfo.find('tr').length;
			var metall = parseInt(fleetinfo.find('tr').eq(anzahlZeilen - 3).find('td').eq(1).html().trim().replace(/\./g,''), 10);
			var kristall = parseInt(fleetinfo.find('tr').eq(anzahlZeilen - 2).find('td').eq(1).html().trim().replace(/\./g,''), 10);
			var deuterium = parseInt(fleetinfo.find('tr').eq(anzahlZeilen - 1).find('td').eq(1).html().trim().replace(/\./g,''), 10);
			
			gesamt.met += metall;
			gesamt.kris += kristall;
			gesamt.deut += deuterium;
			
			if (metall > 0 || kristall > 0 || deuterium > 0) {
				var target = destinationCoords;
				var planetName = destinationPlanet;
				var planetMoon = destinationMoon;
				if (dataReturnFlight) {
					target = originCoords;
					planetName = originPlanet;
					planetMoon = originMoon;
				}
				
				var ziel = { coords: target, name:planetName, moon:planetMoon, met: metall, kris: kristall, deut: deuterium };
				var erledigt = false;
				for (var i = 0; i < ziele.length; i++) {
					if (ziele[i].coords == ziel.coords && ziele[i].moon == ziel.moon) {
						ziele[i].met += ziel.met;
						ziele[i].kris += ziel.kris;
						ziele[i].deut += ziel.deut;
						erledigt = true;
					}
				}
				if (!erledigt) ziele.push(ziel);
			}
		});
		
		if (ziele.length > 0) {
			var div = $('<div>').insertAfter(inhalt.find('.fleetStatus'));
			div.css({
				background: 'none repeat scroll 0% 0% rgb(13, 16, 20)',
				margin: '5px auto 0',
				width: '656px',
				overflow: 'hidden',
				position: 'relative',
				border: '1px solid rgb(0, 0, 0)',
				color: 'rgb(124, 142, 154)',
				font: '10px/24px Verdana,Arial,Helvetica,sans-serif'
			});
			var table = $('<table>').appendTo(div);
			table.attr('border', '0');
			table.attr('style', 'border-collapse: collapse;');
			table.width('100%');
			
			var header1 = $('<tr>').appendTo(table);
			header1.append($('<th>').attr('colspan','6').css({'text-align':'center', 'font-weight':'bold', 'font-size':'1.4em'}).text('Resources in Flight'));
			
			var header2 = $('<tr>').appendTo(table);
			header2.append($('<th>').width('16%').css('padding-left','3px').css('font-weight', 'bold').text('Destination'));
			header2.append($('<th>').width('20%').css('padding-left','3px').css('font-weight', 'bold').text('Planet-Name'));
			header2.append($('<th>').width('16%').css('padding-left','3px').css('font-weight', 'bold').text('Metal'));
			header2.append($('<th>').width('16%').css('padding-left','3px').css('font-weight', 'bold').text('Crystal'));
			header2.append($('<th>').width('16%').css('padding-left','3px').css('font-weight', 'bold').text('Deuterium'));
			header2.append($('<th>').width('16%').css('padding-left','3px').css('font-weight', 'bold').text('Summary'));
			
			for (var i = 0; i < ziele.length; i++) {
				var ownPlanet = false;
				var activeOwnPlanet = false;
				var moonOwnPlanet = false;
				for (var t = 0; t < planets.length; t++) {
					if (ziele[i].coords == planets[t].coords && ziele[i].moon == planets[t].moon) {
						ownPlanet = true;
						if (planets[t].active) activeOwnPlanet = true;
						if (planets[t].moon) moonOwnPlanet = true;
						break;
					}
				}
				var row = $('<tr>').appendTo(table);
				if (activeOwnPlanet) {
					row.append($('<td>').css({'padding-left':'3px', 'color':'#FFCC00'}).text(ziele[i].coords + (moonOwnPlanet ? ' M' : '') + (ownPlanet ? ' (own)' : '')));
					row.append($('<td>').css({'padding-left':'3px', 'color':'#FFCC00'}).text(ziele[i].name));
					var m = ziele[i].met + activePlanetRess.met;
					row.append($('<td>').css({'padding-left':'3px', 'color':'#FFCC00', 'cursor':'help'}).attr('title','Added to Planet: ' + unsafe.tsdpkt(m)).addClass('tooltipLeft').text(unsafe.tsdpkt(ziele[i].met)));
					var k = ziele[i].kris + activePlanetRess.kris;
					row.append($('<td>').css({'padding-left':'3px', 'color':'#FFCC00', 'cursor':'help'}).attr('title','Added to Planet: ' + unsafe.tsdpkt(k)).addClass('tooltipLeft').text(unsafe.tsdpkt(ziele[i].kris)));
					var d = ziele[i].deut + activePlanetRess.deut;
					row.append($('<td>').css({'padding-left':'3px', 'color':'#FFCC00', 'cursor':'help'}).attr('title','Added to Planet: ' + unsafe.tsdpkt(d)).addClass('tooltipLeft').text(unsafe.tsdpkt(ziele[i].deut)));
				} else {
					row.append($('<td>').css('padding-left','3px').text(ziele[i].coords + (moonOwnPlanet ? ' M' : '') + (ownPlanet ? ' (own)' : '')));
					row.append($('<td>').css('padding-left','3px').text(ziele[i].name));
					row.append($('<td>').css('padding-left','3px').text(unsafe.tsdpkt(ziele[i].met)));
					row.append($('<td>').css('padding-left','3px').text(unsafe.tsdpkt(ziele[i].kris)));
					row.append($('<td>').css('padding-left','3px').text(unsafe.tsdpkt(ziele[i].deut)));
				}
				row.append($('<td>').css('padding-left','3px').text(unsafe.tsdpkt(ziele[i].met + ziele[i].kris + ziele[i].deut)));
				
			}
			
			var footer = $('<tr>').appendTo(table);
			footer.append($('<td>').attr('colspan','2').css('padding-left','3px').css('font-weight', 'bold').text('Summary'));
			footer.append($('<td>').css('padding-left','3px').css('font-weight', 'bold').text(unsafe.tsdpkt(gesamt.met)));
			footer.append($('<td>').css('padding-left','3px').css('font-weight', 'bold').text(unsafe.tsdpkt(gesamt.kris)));
			footer.append($('<td>').css('padding-left','3px').css('font-weight', 'bold').text(unsafe.tsdpkt(gesamt.deut)));
			footer.append($('<td>').css('padding-left','3px').css('font-weight', 'bold').text(unsafe.tsdpkt(gesamt.met + gesamt.kris + gesamt.deut)));
		}
	
	}
})();