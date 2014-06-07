// ==UserScript==
// @name           Imperion Scanner
// @author	   Powind3h
// @namespace      Powind3h
// @version 	1.0
// @description	   Scan local solar systems, output .CSV formatted information about local players. (Imperion)
// @include        http://*.imperion.*/map/*
// @exclude        http://forum.imperion.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


/*		
		Instructions:

		Go to your map screen. Press the button in the bottom left-hand corner
		of the navigation bar. An alert will come up with information about the
		nearest player planets, sorted by distance.

		Ctrl+A will highlight all information in the alert box, Ctrl+C will
		copy it to the clipboard. Open a new text document, then Ctrl+V (paste).

		Save it as a .CSV file. CSV = "Comma Separated Value" = a very simple
		type of spreadsheet. You can then upload this file into any common
		spreadsheet program (Excel, OpenOffice, etc). 

		This spreadsheet can be used to track local players over time, to see
		what alliances are nearby, or simply to generate a raid sheet.			*/




/* 					default variables and helper functions			*/


	var galaxyNr = 1;
	var mapData = unsafeWindow.mapData;
	
	var evilButton = 	'<td style="padding-top: 3px; width: 70px; float: left; display: inline;">' +
				'<a class="buttonStd interface_forms_buttons_standart evilevil"' +
				' onclick="this.blur();" href="#"><span ' + 
				'class="interface_forms_buttons_standart"></span>!!!</a></td>';

	function xy_from_id(id) {
    		id -= 1 + (galaxyNr-1) * (801*801);
		var x = (id % 801) - 400;
		var y = 400 - (id - x - 400) / 801;

		return { x:x, y:y }
		}

	function distance(c1, c2) {
		return Math.sqrt(
        	Math.pow(c2.x - c1.x, 2) +
        	Math.pow(c2.y - c1.y, 2)
        	   );
		}

	function createAlert() {

		var thisHref = 'http://' + document.domain;

		var outputString = 'Player Name, Planet Name, Distance, X, Y, Alliance, Population, Raid Link \n';
		var strlen = players.length;
		for ( var i=0; i < strlen; i++ ) {

			var addRow = '' + players[i].playername + ', ';
			addRow += '' + players[i].planetname + ', ';
			addRow += '' + players[i].distance + ', ';
			addRow += '' + players[i].x + ', ';
			addRow += '' + players[i].y + ', ';
			addRow += '' + players[i].alliancename + ', ';
			addRow += '' + players[i].population + ', ';
			addRow += thisHref + '/fleetBase/mission/1/planetId/' + players[i].id + '/ \n';

			outputString += addRow;
			}

		return outputString;
		}


/*					okay, let's establish that we're in the map		*/


    if (location.pathname.match(/^\/map\//)) {


	galaxyNr = document.getElementsByName('galaxyId')[0].value;
	var players = [];

		var xVal = $('#x4').text();
		var yVal = $('#y3').text();

	var myCoords = {
		x: xVal,
		y: yVal }

/*					here we parse mapData for the information we want	*/

	for (p in mapData) {

		if ( mapData[p][1] ) {		
			var system = mapData[p][1];
			
		for (s in system) {
			if (system[s][4]) {
				var player = new Object();
				var c = xy_from_id(p);
				player.distance = distance(c, myCoords).toFixed(2);
				player.x = c.x;
				player.y = c.y;
				player.id = system[s][2];
				player.planetname = system[s][3];
				player.playername = system[s][4];
				player.alliancename = system[s][5];
				player.playerrace = system[s][8];
				player.population = system[s][10];

				if (typeof player.alliancename == 'undefined') player.alliancename = '';
				if (!system[s][15]) players.push(player);
				}
			 }
			}

		}

		players.sort( function( a, b ) {
			return a.distance - b.distance;
			});

/* 					add our evil button to the map interface		*/


	var fixButton =	$('#submitButton');
	var buttonStr = fixButton.html().replace(/OK/,'');
	$('#submitButton').html(buttonStr);
	$('#submitButton span').text('OK').css( { 'padding-left':'20px' } );

	$('#mapToolbarForm tbody tr').prepend(evilButton);
	$('.evilevil').click( function () {

		mapData = unsafeWindow.mapData;
		xVal = $('#x4').text();
		yVal = $('#y3').text();

	myCoords = {
		x: xVal,
		y: yVal }


		var outputTable = createAlert(myCoords);
		alert(outputTable);
		});


		}
