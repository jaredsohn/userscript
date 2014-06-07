// ==UserScript==
// @name           EZRacer
// @namespace      EZRacer
// @description    Easy StreetRacer(facebook) Calculator
// @include        http://apps.facebook.com/streetrace/race.jsp?*
// ==/UserScript==


// Base car stats array
// Name, top speed, acceleration, handling
var bcs = new Array(); i = 0;

//                   'Name'              TT,  AC,  HA
bcs[i++] = new Array('JohnDeere',        20,  70,  15);
bcs[i++] = new Array('DodgePanel',       40,  25,  25);
bcs[i++] = new Array('BeachBuggy',       30,  20,  50);
bcs[i++] = new Array('36OldsCoupe',      35,  35,  25);
bcs[i++] = new Array('32Ford5W',         45,  15,  30);
bcs[i++] = new Array('FordCoupe',        30,  30,  30);
bcs[i++] = new Array('33FordTudor',      35,  25,  30);
bcs[i++] = new Array('Fiat500',          35,  35,  50);
bcs[i++] = new Array('VWbus',            55,  40,  25);
bcs[i++] = new Array('FordEconoline',    55,  55,  20);
bcs[i++] = new Array('NissanMicra',      65,  40,  50);
bcs[i++] = new Array('ToyotaCorolla',    60,  50,  45);
bcs[i++] = new Array('FordTaunus',       55,  60,  50);
bcs[i++] = new Array('ChevyK30',         70,  55,  40);
bcs[i++] = new Array('PlymouthValiant',  60,  60,  60);
bcs[i++] = new Array('BlueOlds',         70,  70,  60);
bcs[i++] = new Array('HondaCivic',       70,  65,  75);
bcs[i++] = new Array('VWgolf',           75,  75,  60);
bcs[i++] = new Array('Skoda',            70,  75,  75);
bcs[i++] = new Array('PontiacGTO',       90,  75,  75);
bcs[i++] = new Array('Peugeot205',       55,  90, 105);
bcs[i++] = new Array('Calibra',          90,  110, 55);
bcs[i++] = new Array('opalAstra',        80,  90,  85);
bcs[i++] = new Array('Firebird',         80,  105, 80);
bcs[i++] = new Array('Blazer',           80,  130, 55);
bcs[i++] = new Array('peterbuilt',       90,  150, 50);
bcs[i++] = new Array('Nissan200SX',      135, 75,  90);
bcs[i++] = new Array('DodgeTruck',       100, 90,  60);
bcs[i++] = new Array('FordXBute',        120, 120, 80);
bcs[i++] = new Array('PontiacFirebird',  130, 125, 80);
bcs[i++] = new Array('TransAm',          150, 125, 90);
bcs[i++] = new Array('VWIltis',          140, 150, 60);
bcs[i++] = new Array('2005Mustang',      150, 150, 100);
bcs[i++] = new Array('Holden',           140, 140, 120);
bcs[i++] = new Array('chevroletcamaro',  155, 140, 100);
bcs[i++] = new Array('MazdaRX7',         135, 150, 150);
bcs[i++] = new Array('68Cuda',           170, 140, 125);
bcs[i++] = new Array('Merc',             150, 130, 200);
bcs[i++] = new Array('BMW3',             145, 140, 230);
bcs[i++] = new Array('Benz',             140, 175, 215);
bcs[i++] = new Array('JaguarEtype',      225, 175, 125);
bcs[i++] = new Array('DodgeViper',       180, 210, 220);
bcs[i++] = new Array('YellowCorvette',   200, 200, 250);
bcs[i++] = new Array('BlueCorvette',     250, 250, 150);
bcs[i++] = new Array('HummerH2',         250, 280, 150);
bcs[i++] = new Array('RedCorvetteBvdW',  300, 275, 200);
bcs[i++] = new Array('CorvetteWagon',    300, 300, 300);
bcs[i++] = new Array('AudiRS5',          400, 420, 350);
bcs[i++] = new Array('holdenUTE',        280, 500, 260);
bcs[i++] = new Array('CallawayCorvette', 350, 380, 450);

// Pimp items array
// Name, top speed, handling, acceleration, skills
//                     'Name'             TS,  HA,  AC,  SK
var items = new Array(); i = 0;
items[i++] = new Array('tire2',            5,   5,   5,  0);
items[i++] = new Array('tire3',            0,  10,  10,  0);
items[i++] = new Array('tire4',           10,  10,  20,  0);
items[i++] = new Array('tire5',            0,  30,  10,  0);
items[i++] = new Array('tire10',          50,  50,  50,  0);
items[i++] = new Array('shocks1',          0,   5,   0,  0);
items[i++] = new Array('shocks2',          0,  20,   0,  0);
items[i++] = new Array('shocks3',          0,  50,   0,  0);
items[i++] = new Array('shocks4',          0,  75,   0,  0);
items[i++] = new Array('engine1',          5,   0,   0,  0);
items[i++] = new Array('engine2',         10,   0,   5,  0);
items[i++] = new Array('engine3',         14,   0,  20,  0);
items[i++] = new Array('engine4',         25,   0,  30,  0);
items[i++] = new Array('engine5',         50,   0, 100,  0);
items[i++] = new Array('muffler',          0,   0,   8,  0);
items[i++] = new Array('muffler1',         0,   0,  12,  5);
items[i++] = new Array('5_headlight',      0,   5,   0,  0);
items[i++] = new Array('13_headlight',     0,  14,   0,  5);
items[i++] = new Array('6_filter',         0,   0,  25,  0);
items[i++] = new Array('6_disk',           0,   0,   0, 10);
items[i++] = new Array('2_wheel',          0,   0,   0, 20);
items[i++] = new Array('1_disk',           0,   0,   0, 30);
items[i++] = new Array('seat1',            0,   5,   0,  5);
items[i++] = new Array('seat2',            0,  18,   0,  0);
items[i++] = new Array('seat3',            0,  14,   0, 20);
items[i++] = new Array('2_steeringwheel',  0,  20,   0, 10);
items[i++] = new Array('shift1',           0,   0,   8,  0);
items[i++] = new Array('shift2',           0,   0,  20,  0);
items[i++] = new Array('shift3',           0,   0,  35,  0);
items[i++] = new Array('shift4',           0,   0,  50, 10);
items[i++] = new Array('radio',            0,   0,   0,  5);
items[i++] = new Array('bumper2',          0,   0,   0,  5);

////////////////////////////////////////////////////////////////////////

var images = document.getElementsByTagName("img");

var state = 0; // Nothing yet

var car1_stats = null;
var car2_stats = null;

var car1_pimps = new Array(1,1,1,1);
var car2_pimps = new Array(1,1,1,1);
console.debug(car1_pimps);

// Pass over all images and ... erm, analyze em
for(var i=0; i<images.length; i++) {
	className = images[i].className;
	fn = getImageName(images[i]);

	var car = matchCar(fn);
	var item = matchItem(fn, images[i]);
    if(state == 2 && item != null) {
    	for(var j=0; j<car2_pimps.length; j++) {
     		car2_pimps[j] *= (item[j+1] != 0) ? (1 + item[j+1] / 100) : 1;
    	}
    }

    if(state == 1 && item != null) {
    	for(var j=0; j<car1_pimps.length; j++) {
     		car1_pimps[j] *= (item[j+1] != 0) ? (1 + item[j+1] / 100) : 1;
    	}
    }

    if(state == 1 && car != null) {
    	car2_stats = car;
    	state = 2; // Found second car, start looking for items
    }

    if(state == 0 && car != null) {
    	car1_stats = car;
    	state = 1; // Found first car, start looking for items
    }
}

console.debug(car1_pimps);
console.debug(car2_pimps);
var car1_final_stats = calculatePimps(car1_stats, car1_pimps);
var car2_final_stats = calculatePimps(car2_stats, car2_pimps);

var car1_show_pimps = showPimps(car1_pimps);
var car2_show_pimps = showPimps(car2_pimps);
console.debug(car1_show_pimps);
console.debug(car2_show_pimps);

//////////////////////////////////////////

var foundFirst = 0;
var allDivs = document.getElementsByTagName('div');
for(var i=0; i<allDivs.length; i++) {
	if(allDivs[i].className == 'car') {
		if(foundFirst == 0) {
			var car1Info = showFinalCarInfo(car1_final_stats, car1_stats, car1_show_pimps);
			var infoDiv = document.createElement('div');
			infoDiv.innerHTML = car1Info;
           	allDivs[i].appendChild(infoDiv);
			foundFirst = 1;
		} else {
			var car2Info = showFinalCarInfo(car2_final_stats, car2_stats, car2_show_pimps);
		    var infoDiv = document.createElement('div');
			infoDiv.innerHTML = car2Info;
           	allDivs[i].appendChild(infoDiv);
		}
	}
}

function showFinalCarInfo(final_stats, car_stats, pimps_stats) {
    var res = '';
    res += '<br/>Top Speed: <b>'+final_stats[0]+'</b>';
    if(pimps_stats[0] != 0) {
        res += '('+car_stats[1]+' + '+pimps_stats[0]+'%)';
    }
    res += '<br/>Handling : <b>'+final_stats[2]+'</b>';
    if(pimps_stats[1] != 0) {
        res += '('+car_stats[3]+' + '+pimps_stats[1]+'%)';
    }
    res += '<br/>Acceleration : <b>'+final_stats[1]+'</b>';
    if(pimps_stats[2] != 0) {
        res += '('+car_stats[2]+' + '+pimps_stats[2]+'%)';
    }
    res += '<br/>Skills : <b>+'+pimps_stats[3]+'%</b>';
    return res;
}

// Apply pimps to car stats
function calculatePimps(car, pimps) {
	var res = new Array();

    res[0] = Math.round( car[1] * pimps[0] ); // Top speed
    res[1] = Math.round( car[2] * pimps[2] ); // Acceleration
    res[2] = Math.round( car[3] * pimps[1] ); // Handling
	return res;
}

function showPimps(pimps) {
    var res = new Array();
    for(var i=0; i<pimps.length; i++) {
        res[i] = Math.round((pimps[i] - 1) * 1000) / 10;
    }
    return res;
}

// Get car stats, if matched
function matchCar(str) {
	for(var i=0; i<bcs.length; i++) {
		if(bcs[i][0] == str && str != '') {
			return bcs[i];
		}
	}

	return null;
}

// Get item pimps, if matched
// add more usefull titles to images
function matchItem(str, image) {
	for(var i=0; i<items.length; i++) {
		if(items[i][0] == str && str != '') {
            if(image != null) {
                var newTitle = image.getAttribute('title');

                if(items[i][1] != 0) {
                    newTitle += ' TS:'+items[i][1]+'%';
                }
                if(items[i][2] != 0) {
                    newTitle += ' HA:'+items[i][2]+'%';
                }
                if(items[i][3] != 0) {
                    newTitle += ' AC:'+items[i][3]+'%';
                }
                if(items[i][4] != 0) {
                    newTitle += ' SK:'+items[i][4]+'%';
                }

                image.setAttribute('title', newTitle);
            }

			return items[i];
		}
	}

	return null;
}

// Strip image file name
function getImageName(image) {
  fn = /([^\/]+)$/i.exec(image.src)[1];
  return /([a-zA-Z0-9_]*)/i.exec(fn)[1];
}

