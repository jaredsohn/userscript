// ==UserScript==
// @name           OGame Redesign: Easy Transport
// @namespace      RiV-easytransport
// @description    Provides links to easily transport the resources needed for a building/research
// @version        1.7.4
// @updateURL      http://userscripts.org/scripts/source/106689.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/106689.user.js
// @include        http://*.ogame.*/game/index.php?*page=resources*
// @include        http://*.ogame.*/game/index.php?*page=station*
// @include        http://*.ogame.*/game/index.php?*page=research*
// @include        http://*.ogame.*/game/index.php?*page=fleet*
// @include        http://*.ogame.*/game/index.php?*page=preferences*
// ==/UserScript==

(function() {
	var $ = window.jQuery;
	try {
		$ = unsafeWindow.jQuery;
	} catch(e) { }

    if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
        this.GM_getValue=function (key,def) {
            return localStorage[key] || def;
        };
        this.GM_setValue=function (key,value) {
            return localStorage[key]=value;
        };
        this.GM_deleteValue=function (key) {
        return delete localStorage[key];
        };
    }
    
    var setValue = function(name, value) {
        GM_setValue(name + '|' + uni, JSON.stringify(value));
    }
    
    var getValue = function(name, defaultValue) {
        var val = GM_getValue(name + '|' + uni);
        if(val == undefined) return defaultValue;
        return JSON.parse(val);
    }

    // get an element via its class name | thx @ marshen for the code
    function getElementsByClass (cName, domNode) {
        if (cName == undefined || cName.length == 0) return;
            if (domNode == undefined) domNode = document;
        
        if (domNode.getElementsByClassName)
            return domNode.getElementsByClassName(cName);
        
        // browser doesn't support getElementsByClassName
        cName = " " + cName + " "; // add spaces here so that we won't find class "a" in className == "abc"
        var elements = domNode.getElementsByTagName('*');
        var res = new Array();
        for (var i = 0; i < elements.length; i++) {
            var className = " " + elements[i].className + " ";
            if (className.indexOf(cName) > -1) {
                res.push(elements[i]);
            }
        }

        return res;
    }

    // thanks to Antigame author Tarja for code
    function runScript(code) {
        if (!code || code=="") return;
		var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.innerHTML = code;

        document.body.appendChild(script);
        setTimeout(function(){script.parentNode.removeChild(script)}, 0);
    }

    // thanks to Antigame author Tarja for code
    function trigger(id, event) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, false);

        if (evt) document.getElementById(id).dispatchEvent(evt);
    }
	
	function page(str) {
		var strURL = document.URL;
		if (strURL.match(str))
			return true;
		else
			return false;
	}
		
	function inArray(obj,arr) {
		var res;
		
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == obj)
				res = i;
		}
		
		if(res >= 0) return res;
		else return -1;
	}
	
	function getTitle(node) {
		return (node && node.getAttribute) ? node.getAttribute('title') || $(node).data('tipped_restore_title') || '' : '';
	}

    document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
    var stylesheet = document.styleSheets[document.styleSheets.length-1];
	
	stylesheet.insertRule('#easyDiv { \
                          margin: 3px 0; \
                          margin-left: 15px; \
                          padding: 1px 0 0 5px; \
                          background-color: #13181D; \
                          border: 3px double black; \
                          width: 628px; \
                          font-size: 11px; \
						  float: left; \
						  position: relative; \
						  z-index: 100; \
                          }', 0);
						  
	stylesheet.insertRule('#easyDiv table { width: 600px; border-spacing: 3px 2px; }', 0);
	stylesheet.insertRule('#easyDiv td { text-align: center; }', 0);
	stylesheet.insertRule('#easyDiv td, #easyDiv th { border: 1px solid grey; padding: 5px 10px; }', 0);
	stylesheet.insertRule('#easyDiv th { font-weight: bold; }', 0);
	stylesheet.insertRule('#easyDiv a { text-decoration: none; }', 0);
						  
	stylesheet.insertRule('span.metal { color: #FF8800; }', 0);
	stylesheet.insertRule('span.crystal { color: #55B4DD; }', 0);
	stylesheet.insertRule('span.deuterium { color: #99ABCC; }', 0);
	stylesheet.insertRule('span.easyErr { color: #FF0000; }', 0);
	
	stylesheet.insertRule('div.easyMerge { \
						  width: 17px; \
						  height: 17px; \
						  display: block; \
						  float: right; \
						  background-image: url("http://gf1.geo.gfsrv.net/cdnfc/b325cc0170e184ee4c4417acd6a17a.png"); \
						  }', 0);
	stylesheet.insertRule('div.easyMergeBlue { background-position: -51px center; }', 0);
	stylesheet.insertRule('div.easyMergeGrey { background-position: -68px center; }', 0);
	stylesheet.insertRule('div.easyMergeRed { background-position: -17px center; }', 0);
	stylesheet.insertRule('div.easyMergeGreen { background-position: -34px center; }', 0);
	stylesheet.insertRule('.easyOptions { float: right; margin-right: 13px; margin-top: 3px; height: 17px; }', 0);
	stylesheet.insertRule('.easyOptions a:link, .easyOptions a:visited, .easyOptions a:hover, .easyOptions a:active { color: rgb(255,255,255); }', 0);
	stylesheet.insertRule('span.easyOptSpan { float: right; padding: 0px 5px; }', 0);
	stylesheet.insertRule('.easyTooltip { text-align: center; margin: 2px; }', 0);
	
	stylesheet.insertRule('.easyLinkDiv { width: auto; float: left; position: relative; top: -8px; left: 3px; z-index: 100; }', 0);
	
	stylesheet.insertRule('.easyLink a:link, .easyLink a:visited, .easyLink a:hover, .easyLink a:active { color: rgb(255,255,255); text-decoration: none; }', 0);
	stylesheet.insertRule('.easyLink { margin-left: 0px; padding-top: 4px; }', 0);
	
	stylesheet.insertRule('.easyTotal { width: auto; float: left; margin-left: 17px; margin-top: 3px; margin-bottom: 5px; }', 0);
	
	stylesheet.insertRule('.easyHidden { display: none; }', 0);
	
	stylesheet.insertRule('.easyPlusDiv { \
                          margin: 5px 0px 0px 5px; \
                          padding: 3px 3px 3px 3px; \
                          background-color: #13181D; \
                          border: 3px double black; \
                          width: 150px; \
                          font-size: 11px; \
						  float: left; \
						  text-align: center; \
						  position: absolute; \
						  z-index: 101; \
                          }', 0);
	

    var metaUniverse = document.getElementsByName('ogame-universe')[0].content;
	var metaCoords = document.getElementsByName('ogame-planet-coordinates')[0].content;
	var metaPlanetType = document.getElementsByName('ogame-planet-type')[0].content;
	var metaLang = document.getElementsByName('ogame-language')[0].content;
	var metaOGameVer = document.getElementsByName('ogame-version');
    var uniSpeed = parseInt(document.getElementsByName('ogame-universe-speed').item(0).content);
	
	var oldVersion = false;
	if (metaOGameVer && (metaOGameVer.length > 0)) {
		var versionParts = metaOGameVer[0].content.split ('.');
		if (parseInt(versionParts[0]) < 5)
			oldVersion = true;
	} else
		oldVersion = true;
	
    var uni = metaUniverse.split('.')[0] + metaUniverse.split('.')[2];

	var isMoon = false;
	if(metaPlanetType == 'moon')
		isMoon = true;


	/* User variables, change if you wish */

	// speed factor of the flight; 1 = 100%, 0.5 = 50% etc.
	var speedFactor = 1;

	/* End of user variables */

	//setValue('firstRun150712', true);
	if(getValue('firstRun150712', true)) {
		setValue('transportBuild', []);
		setValue('transportLevel', []);
		setValue('transportMet', []);
		setValue('transportCrys', []);
		setValue('transportDeut', []);
		setValue('transportGala', []);
		setValue('transportSolSys', []);
		setValue('transportPos', []);
		setValue('transportMoon', []);
		setValue('transportDetails', []);
		setValue('MergeIDs', []);
		setValue('easyTransport', false);
		setValue('firstRun150712', false);
	}
	
	var strBuild = '';
	var strLevel = '';
	var strGala = '';
	var strSolSys = '';
	var strPos = '';
	var transportBuild = getValue('transportBuild');
	var transportLevel = getValue('transportLevel');
	var transportMet = getValue('transportMet');
	var transportCrys = getValue('transportCrys');
	var transportDeut = getValue('transportDeut');
	var transportGala = getValue('transportGala');
	var transportSolSys = getValue('transportSolSys');
	var transportPos = getValue('transportPos');
	var transportMoon = getValue('transportMoon');
	var transportDetails = getValue('transportDetails');
	var MergeIDs = getValue('MergeIDs');
	var CombDrive = parseInt(getValue('CombDrive', 0));
	var ImpDrive = parseInt(getValue('ImpDrive', 0));
	var easyTransport = getValue('easyTransport', false);
	var easyID = getValue('easyID');

	initLang();

	function initLang() {
		langTransport = 'Transport';
		langAll = 'all';
		langMissing = 'missing';
		langDelete = 'delete';
		//langTransportLink = strBuild + ' ' + strLevel + ' to [' + strGala + ':' + strSolSys + ':' + strPos + ']';
		langNotEnoughRes = 'Not enough resources!';
		langNotEnoughShips = 'Not enough ships!';
		langPartDelivery = 'Partial delivery possible.';
		langCancel = 'Cancel';
		//langMoon = 'Moon';
		langStillMissing = 'Still missing';
		langSC = 'SCs';
		langLC = 'LCs';
		langNeeded = 'Needs';
		langTotal = 'Total';
		langMerge = 'Merge';
		langCancel = 'cancel';
		langApply = 'apply';
		langPackage = 'Transport package';
		langContains = 'Contains';
		langMet = 'Metal';
		langCrys = 'Crystal';
		langDeut = 'Deuterium';
		langLevel = 'Level';
	
		if(metaLang == 'de') {
			langTransport = 'Transport';
			langAll = 'alle';
			langMissing = 'fehlende';
			langDelete = 'löschen';
			//langTransportLink = strBuild + ' ' + strLevel + ' nach [' + strGala + ':' + strSolSys + ':' + strPos + ']';
			langNotEnoughRes = 'Nicht genügend Rohstoffe!';
			langNotEnoughShips = 'Nicht genügend Schiffe!';
			langPartDelivery = 'Teillieferung möglich.';
			langCancel = 'Abbrechen';
			//langMoon = 'Mond';
			langStillMissing = 'Noch fehlend';
			langSC = 'KTs';
			langLC = 'GTs';
			langNeeded = 'Benötigt';
			langTotal = 'Gesamt';
			langMerge = 'Fusion';
			langCancel = 'abbrechen';
			langApply = 'anwenden';
			langPackage = 'Transport-Packet';
			langContains = 'Beinhaltet';
			langMet = 'Metall';
			langCrys = 'Kristall';
			langDeut = 'Deuterium';
			langLevel = 'Stufe';
		}
	}
	
	var baseCosts = new Array();
	baseCosts[1] =   [40,     10,     0,      1.5];		//Metal Mine
	baseCosts[2] =   [30,     15,     0,      1.6];		//Crystal Mine
	baseCosts[3] =   [150,    50,     0,      1.5];		//Deuterium Synthesizer
	
	baseCosts[4] =   [50,     20,     0,      1.5];		//Solar Plant
	baseCosts[12] =  [500,    200,    100,    1.8];		//Fusion Reactor
	
	baseCosts[22] =  [500,    0,      0,      2.0];		//Metal Storage
	baseCosts[23] =  [500,    250,    0,      2.0];		//Crystal Storage
	baseCosts[24] =  [500,    500,    0,      2.0];		//Deuterium Tank
	
	baseCosts[25] =  [1150,   0,      0,      2.3];		//Shielded Metal Den
	baseCosts[26] =  [1150,   575,    0,      2.3];		//Underground Crystal Den
	baseCosts[27] =  [1150,   1150,   0,      2.3];		//Seabed Deuterium Den
	
	
	baseCosts[14] =  [200,    60,     100,    2.0];		//Robotics Factory
	baseCosts[21] =  [200,    100,    50,     2.0];		//Shipyard
	baseCosts[31] =  [100,    200,    100,    2.0];		//Research Lab
	baseCosts[44] =  [10000,  10000,  500,    2.0];		//Missile Silo
	baseCosts[15] =  [500000, 250000, 50000,  2.0];		//Nanite Factory
	baseCosts[33] =  [0,      25000,  50000,  2.0];		//Terraformer
	baseCosts[34] =  [10000,  20000,  0,      2.0];		//Alliance Depot
	
	baseCosts[41] =  [10000,  20000,  10000,  2.0];		//Lunar Base
	baseCosts[42] =  [10000,  20000,  10000,  2.0];		//Sensor Phalanx
	baseCosts[43] =  [1000000,2000000,1000000,2.0];		//Jump Gate
	
	
	baseCosts[113] = [0,      400,   200,    2.0];		//Energy Technology
	baseCosts[120] = [100,    50,    0,      2.0];		//Laser Technology
	baseCosts[121] = [500,    150,   50,     2.0];		//Ion Technology
	baseCosts[114] = [0,      2000,  1000,   2.0];		//Hyperspace Technology
	baseCosts[122] = [1000,   2000,  500,    2.0];		//Plasma Technology
	
	baseCosts[115] = [200,   0,      300,    2.0];		//Combustion Drive
	baseCosts[117] = [1000,  2000,   300,    2.0];		//Impulse Drive
	baseCosts[118] = [5000,  10000,  3000,   2.0];		//Hyperspace Drive
	
	baseCosts[106] = [100,   500,    100,    2.0];		//Espionage Technology
	baseCosts[108] = [0,     200,    300,    2.0];		//Computer Technology
	baseCosts[124] = [100,   100,    100,    1.75];		//Astrophysics
	baseCosts[123] = [120000,200000, 80000,  2.0];		//Intergalactic Research Network
	baseCosts[199] = [0,     0,      0,      2.0];		//Graviton Technology
	
	baseCosts[109] = [400,   100,    0,      2.0];		//Weapons Technology
	baseCosts[110] = [100,   300,    0,      2.0];		//Shielding Technology
	baseCosts[111] = [500,   0,      0,      2.0];		//Armour Technology

	
	
	function removeSeparator(str) {
		if (!str) return null;
		return parseInt(str.replace(/\D/g, ''));
	}
	
	function formatNumber(num) {
		var separator = '.';
		var res = '';
		num = ''+num;

		while(num.length > 3) {
			res = separator + num.slice(-3) + res;
			num = num.substr(0, num.length - 3);
		}

		res = num + res;
		return res;
	}
	
	function sumArray(array) {
		var res = 0;
		for(var i = 0; i < array.length; i++)
			res = res + array[i];
			
		return res;
	}

	function getBuildingInfo() {
		var buildID = document.getElementsByName('type')[0].value;
		var res = new Array();

		res.Name = document.getElementById('content').innerHTML;
		res.Name = res.Name.split('<h2>')[1];
		res.Name = res.Name.split('<')[0];
    
		res.Level = getElementsByClass('level', document.getElementById('content'))[0].innerHTML;
		res.Level = parseInt(res.Level.match(/\d+/)[0]) + 1;

		res.Met = baseCosts[buildID][0];
		res.Crys = baseCosts[buildID][1];
		res.Deut = baseCosts[buildID][2];
		res.Mod = baseCosts[buildID][3];

		return res;
	}
	
	function getPlanetInfo(ress) {
		var res = document.getElementById ("resources_" + ress).textContent;
		res = removeSeparator(res);
		return parseInt(res);
	}

	function getDistance(Gala, SolSys, Pos, id) {
		if (Gala == transportGala[id] && SolSys == transportSolSys[id] && Pos == transportPos[id]) 
			res = 5;
		else if (Gala == transportGala[id] && SolSys == transportSolSys[id]) 
			res = Math.abs(Pos - transportPos[id]) * 5 + 1000;
		else if (Gala == transportGala[id])
			res = Math.abs(SolSys - transportSolSys[id]) * 95 + 2700;
		else
			res = Math.abs(Gala - transportGala[id]) * 20000;

		return parseInt(res);
	}

	function getFlightTime(dist, velo) {
		var res = ((3500 / speedFactor) * Math.pow((dist * 10 / velo), 0.5) + 10) / uniSpeed;
		return parseInt(res);
	}

	function getShipInfo(info, ship) {
		if(ship == 'sc') {
			if(info == 'id') res = '202';
			if(info == 'velocity') {
				if(ImpDrive >= 5) res = 10000 + 10000 * 0.2 * ImpDrive;
				else res = 5000 + 5000 * 0.1 * CombDrive;
			}
			if(info == 'baseconsumption') {
				if(ImpDrive >= 5) res = 20;
				else res = 10;
			}
			if(info == 'capacity') res = 5000;
		} else if(ship == 'lc') { 
			if(info == 'id') res = '203';
			if(info == 'velocity') res = 7500 + 7500 * 0.1 * CombDrive;
			if(info == 'capacity') res = 25000;
			if(info == 'baseconsumption') res = 50;
		}

		return res;
	}

	function getConsumption(fTime, dist, velo, bCons) {
		var value = 35000 / (fTime * uniSpeed - 10) * Math.pow((dist * 10 / velo), 0.5);
		var res = bCons * dist / 35000 * Math.pow((value / 10 + 1), 2);

		return parseInt(res);
	}

	function getNeededShipCount(id, ship) {
		var res = {};
		var startGala = metaCoords.split(':')[0];
		var startSolSys = metaCoords.split(':')[1];
		var startPos = metaCoords.split(':')[2];

		var Velocity = getShipInfo('velocity', ship);
		var Distance = getDistance(startGala, startSolSys, startPos, id);
		var flightTime = getFlightTime(Distance, Velocity);
		var baseConsumption = getShipInfo('baseconsumption', ship);
		var Capacity = getShipInfo('capacity', ship);

		var Consumption = getConsumption(flightTime, Distance, Velocity, baseConsumption) + 1;

		res.total = Math.ceil((transportMet[id] + transportCrys[id] + transportDeut[id]) / (Capacity - Consumption));
		
		var Metal = getPlanetInfo('metal');
		var Crystal = getPlanetInfo('crystal');
		var Deuterium = getPlanetInfo('deuterium');
		
		Metal = (Metal > transportMet[id]) ? transportMet[id] : Metal;
		Crystal = (Crystal > transportCrys[id]) ? transportCrys[id] : Crystal;
		Deuterium = (Deuterium > transportDeut[id]) ? transportDeut[id] : Deuterium;
		res.possible = Math.ceil((Metal + Crystal + Deuterium) / (Capacity - Consumption));

		return res;
	}

	function getShipCount(ship) {
		var shipID = getShipInfo('id', ship);
		var res = document.getElementById('button' + shipID);
		res = res.innerHTML;
		res = res.substring(res.indexOf('(')+1, res.indexOf(')'));

		return removeSeparator(res);
	}

	function addToQueue(bld, lvl, met, cry, deu, gal, sol, pos, moon, det) {
		var i = transportBuild.length;
		transportBuild[i] = bld;
		transportLevel[i] = lvl;
		transportMet[i] = met;
		transportCrys[i] = cry;
		transportDeut[i] = deu;
		transportGala[i] = gal;
		transportSolSys[i] = sol;
		transportPos[i] = pos;
		transportMoon[i] = moon; 
		transportDetails[i] = det;
    
		setValue('transportBuild', transportBuild);
		setValue('transportLevel', transportLevel);
		setValue('transportMet', transportMet);
		setValue('transportCrys', transportCrys);
		setValue('transportDeut', transportDeut);
		setValue('transportGala', transportGala);
		setValue('transportSolSys', transportSolSys);
		setValue('transportPos', transportPos);
		setValue('transportMoon', transportMoon);
		setValue('transportDetails', transportDetails);
	}

	function setResources(start,end,allmiss) {
		var buildingInfo = getBuildingInfo();
		var Build = buildingInfo.Name;
		var Level = start + ' - ' + end;
		if(start == end) Level = start;
		var Cycles = end-start+1;
		
		var totalMet = 0;
		var totalCrys = 0;
		var totalDeut = 0;
		
		if(document.getElementsByName('type')[0].value == 124) {
			for(var i = 0; i < Cycles; i++) {
				totalMet += Math.floor(100 * Math.floor(0.5 + 40 * Math.pow(1.75, start+i-1)));
				totalCrys += Math.floor(100 * Math.floor(0.5 + 80 * Math.pow(1.75, start+i-1)));
				totalDeut += Math.floor(100 * Math.floor(0.5 + 40 * Math.pow(1.75, start+i-1)));
			}
		} else {
			for(var i = 0; i < Cycles; i++) {
				totalMet += Math.floor(buildingInfo.Met * Math.pow(buildingInfo.Mod, start+i));
				totalCrys += Math.floor(buildingInfo.Crys * Math.pow(buildingInfo.Mod, start+i));
				totalDeut += Math.floor(buildingInfo.Deut * Math.pow(buildingInfo.Mod, start+i));
			}
		}
		
		var Met, Crys, Deut;
		if(allmiss == 'all') {
			Met = totalMet;
			Crys = totalCrys;
			Deut = totalDeut;
		} else if(allmiss == 'miss') {
			var Metal = getPlanetInfo('metal');
			var Crystal = getPlanetInfo('crystal');
			var Deuterium = getPlanetInfo('deuterium');
			Met = ((totalMet-Metal) > 0) ? (totalMet-Metal) : 0;
			Crys = ((totalCrys-Crystal) > 0) ? (totalCrys-Crystal) : 0;
			Deut = ((totalDeut-Deuterium) > 0) ? (totalDeut-Deuterium) : 0;
		}
		
		Gala = metaCoords.split(':')[0];
		SolSys = metaCoords.split(':')[1];
		Pos = metaCoords.split(':')[2];
    
		addToQueue(Build, Level, Met, Crys, Deut, Gala, SolSys, Pos, isMoon, '');
		
		if(transportBuild.length == 1) evt = '';
		else evt = 'change';
		showLink(evt);
	}
	
	function transportPlus(e) {	
		var parentNode = document.getElementsByTagName('body')[0];
		
		if(document.getElementById('easyPlusDiv'))
			parentNode.removeChild(document.getElementById('easyPlusDiv'))
		
		var easyPlus = document.createElement('div');
		easyPlus.className = 'easyPlusDiv';
		easyPlus.id = 'easyPlusDiv';
		easyPlus.style.left = e.clientX + 'px';
		easyPlus.style.top = e.clientY + 'px';
		easyPlus.innerHTML = '<p class="easyLink" style="position:absolute; top:-2px; left: 147px; padding-top:0px;"><a href="javascript:void(0);" id="closePlus">x</a></p>' + langLevel + ' <input style="width: 25px; text-align:center; font-size: 11px;" id="plusLevelMin" value="' + (getBuildingInfo().Level-1) + '"> - <input style="width: 25px; text-align:center; font-size: 11px;" id="plusLevel" value="' + getBuildingInfo().Level + '">';
		parentNode.appendChild(easyPlus);
		document.getElementById('plusLevel').focus();
		document.getElementById('plusLevel').select();
		
		document.getElementById('closePlus').addEventListener('click', function(e) { parentNode.removeChild(document.getElementById('easyPlusDiv')); }, false);
	}

	function insertText(e) {
		if(e.target.id != 'content') return;
		
		if(document.getElementById('easyPlusDiv'))
			document.getElementsByTagName('body')[0].removeChild(document.getElementById('easyPlusDiv'))
		
		stylesheet.insertRule('#costs ul#resources li { width: 60px; }', 0);

		var parentNode = document.getElementById('costs');
		
		var easyLinks = document.createElement('div');
		easyLinks.className = 'easyLinkDiv';
		easyLinks.innerHTML = '<p class="easyLink" style="float: left; color: rgb(122,168,54); margin-left: 0px; font-weight: bold;">Transport (<a href="javascript:void(0);" id="transportPlus">+</a>):</p><p style="clear: both;" class="easyLink"><a href="javascript:void(0);" id="all_res">' + langAll + '</a> | <a href="javascript:void(0);" id="missing_res">' + langMissing + '</a></p></div>';
		parentNode.appendChild(easyLinks);

		document.getElementById('all_res').addEventListener('click', 		function(e) { 
																				if(document.getElementById('plusLevel')) 
																					setResources(parseInt(document.getElementById('plusLevelMin').value)+1, document.getElementById('plusLevel').value, 'all'); 
																				else 
																					setResources(getBuildingInfo().Level, getBuildingInfo().Level, 'all'); 
																					
																				if(document.getElementById('easyPlusDiv')) 
																					document.getElementsByTagName('body')[0].removeChild(document.getElementById('easyPlusDiv'));  }, false);

		document.getElementById('missing_res').addEventListener('click', 	function(e) { 
																				if(document.getElementById('plusLevel')) 
																					setResources(parseInt(document.getElementById('plusLevelMin').value)+1, document.getElementById('plusLevel').value, 'miss'); 
																				else 
																					setResources(getBuildingInfo().Level, getBuildingInfo().Level, 'miss'); 
																					
																				if(document.getElementById('easyPlusDiv')) 
																					document.getElementsByTagName('body')[0].removeChild(document.getElementById('easyPlusDiv')); }, false);
																					
		document.getElementById('transportPlus').addEventListener('click', transportPlus, false);
	}

	function deleteTransport(e, ID) {
		var id;
		var doDelete = false;
		
		if(e != '') {
			if(e.target.id == '') {
				setValue('tempMet', removeSeparator(document.getElementById('metal').value));
				setValue('tempCrys', removeSeparator(document.getElementById('crystal').value));
				setValue('tempDeut', removeSeparator(document.getElementById('deuterium').value));
			
				id = easyID;
				transportMet[id] = transportMet[id] - getValue('tempMet');
				transportCrys[id] = transportCrys[id] - getValue('tempCrys');
				transportDeut[id] = transportDeut[id] - getValue('tempDeut');
			} else 
				id = e.target.id.split('delete_transport')[1];
				
			if(transportMet[id] == 0 && transportCrys[id] == 0 && transportDeut[id] == 0)
				doDelete = true;
				
			if(e.target.id.match(/delete_transport/))
				doDelete = true;
		} else {
			id = ID;
			doDelete = true;
		}

		if(doDelete) {
			transportBuild.splice(id, 1);
			transportLevel.splice(id, 1);
			transportMet.splice(id, 1);
			transportCrys.splice(id, 1);
			transportDeut.splice(id, 1);
			transportGala.splice(id, 1);
			transportSolSys.splice(id, 1);
			transportPos.splice(id, 1);
			transportMoon.splice(id, 1);
			transportDetails.splice(id, 1);
		}
    
		setValue('transportBuild', transportBuild);
		setValue('transportLevel', transportLevel);
		setValue('transportMet', transportMet);
		setValue('transportCrys', transportCrys);
		setValue('transportDeut', transportDeut);
		setValue('transportGala', transportGala);
		setValue('transportSolSys', transportSolSys);
		setValue('transportPos', transportPos);
		setValue('transportMoon', transportMoon);
		setValue('transportDetails', transportDetails);
		setValue('easyTransport', false);

		showLink('change');
	}

	function fillIn(e) {
		if(page('fleet1')) {
			var id = e.target.id.match(/\d+/);
			setValue('easyID', id);
			
			if(e.target.id.match(/easytrsc/)) ship = 'sc';
			else if(e.target.id.match(/easytrlc/)) ship = 'lc';
			var shipID = getShipInfo('id', ship);
			//var Capacity = getShipInfo('capacity', ship);
			var Count = getNeededShipCount(id, ship).possible;
			
			/* if(Count > getShipCount(ship)) {
				var restCount = (transportMet[id] + transportCrys[id] + transportDeut[id]) - (getShipCount(ship) * Capacity);
			} */

			setValue('easyTransport', true);
			
			var arrayShipIDs = [204, 205, 206, 207, 215, 211, 213, 214, 202, 203, 208, 209, 210];
			for(var i = 0; i < arrayShipIDs.length; i++)
				document.getElementById('ship_' + arrayShipIDs[i]).value = '';
				
			document.getElementById('ship_' + shipID).value = Count;
			
			trigger('ship_' + shipID, 'change');
		}
	}
	
	function applyMerge(e) {
		MergeIDs = getValue('MergeIDs');
		var sumID = MergeIDs[0];
		MergeIDs.sort(function(a,b){return a-b;});
		
		if(sumID != undefined) {
			var sumMet = 0;
			var sumCrys = 0;
			var sumDeut = 0;
			var sumDetails = '<b>' + langContains + ':</b><br>';
		
			for(var i = 0; i < MergeIDs.length; i++) {
				sumMet += transportMet[MergeIDs[i]];
				sumCrys += transportCrys[MergeIDs[i]];
				sumDeut += transportDeut[MergeIDs[i]];
				sumDetails += transportBuild[MergeIDs[i]] + ' ' + transportLevel[MergeIDs[i]] + '<br>';
			}
			sumDetails += '<br>';
		
			addToQueue(langPackage, ' ', sumMet, sumCrys, sumDeut, transportGala[sumID], transportSolSys[sumID], transportPos[sumID], transportMoon[sumID], sumDetails);
		
			for(var i = MergeIDs.length - 1; i > -1; i--) {
				deleteTransport('', MergeIDs[i]);
			}
		}
		
		showLink('change');
	}
	
	function cancelMerge(e) {
		setValue('MergeIDs', []);
		showLink('change');
	}
	
	function markForMerge(e) {
		var id = e.target.id.match(/\d+/);
		MergeIDs = getValue('MergeIDs');
		var arrayPt = inArray(String(id), MergeIDs);
		
		if(arrayPt != -1) {
			MergeIDs.splice(arrayPt, 1);
			setValue('MergeIDs', MergeIDs);
			document.getElementById('easyMergeCell' + id).className = 'easyMerge easyMergeRed';
		} else {
			MergeIDs[MergeIDs.length] = id;
			setValue('MergeIDs', MergeIDs);
			document.getElementById('easyMergeCell' + id).className = 'easyMerge easyMergeGreen';
		}
		
		if(getValue('MergeIDs') != '') {
			for(var i = 0; i < transportBuild.length; i++) {
				var coords1 = transportGala[i] + ':' + transportSolSys[i] + ':' + transportPos[i] + ' ' + transportMoon[i];
				var coords2 = transportGala[id] + ':' + transportSolSys[id] + ':' + transportPos[id] + ' ' + transportMoon[id];
		
				if(coords1 != coords2) {
					document.getElementById('easyTblDel' + i).innerHTML = '<div id="easyMergeCell' + i + '" class="easyMerge easyMergeGrey" style="float: none; margin-left: auto; margin-right: auto;"></div></a>';
				}
			}
		} else {
			showMergeIcons();
		}
	}
	
	function showMergeIcons(e) {	
		setValue('MergeIDs', []);
		document.getElementById('easyOptions').innerHTML = '<a href="javascript:void(0);" id="easyMergeApply">\n' +
														   '	<span class="easyOptSpan">' + langApply + '</span>\n' +
														   '	<div class="easyMerge easyMergeGreen"></div>\n' +
														   '</a>\n' +
														   '<a href="javascript:void(0);" id="easyMergeCancel">\n' +
														   '	<span class="easyOptSpan">' + langCancel + '</span>\n' +
														   '	<div class="easyMerge easyMergeRed"></div>\n' +
														   '</a>\n';
														   
		document.getElementById('easyMergeApply').addEventListener('click', applyMerge, false);
		document.getElementById('easyMergeCancel').addEventListener('click', cancelMerge, false);
		
		for(var i = 0; i < transportBuild.length; i++) {
			document.getElementById('easyTblDel' + i).innerHTML = '<a href="javascript:void(0);" id="easyMergeLink' + i + '"><div id="easyMergeCell' + i + '" class="easyMerge easyMergeRed" style="float: none; margin-left: auto; margin-right: auto;"></div></a>';
			document.getElementById('easyTblCoords' + i).innerHTML += '';
			
			document.getElementById('easyMergeLink' + i).addEventListener('click', markForMerge, false);
		}
	}
	
	function toggleTopBot(e) {
		if(getValue('prefTopBot', 'top') == 'top') {
			setValue('prefTopBot', 'bot');
		} else {
			setValue('prefTopBot', 'top');
		}
		
		showLink('toggleTopBot');
	}
	
	function toggleMinMax(e) {
		if(getValue('prefMinMax', 'max') == 'max') {
			setValue('prefMinMax', 'min');
		} else {
			setValue('prefMinMax', 'max');
		}
		
		showLink('change');
	}

	function showLink(evt) {	
		if(page('fleet1') && !getElementsByClass('allornonewrap')[0]) return;
		
		if(getValue('prefTopBot', 'top') == 'bot')		
			var parentNode = document.getElementById('inhalt');
		else
			var parentNode = document.getElementById('contentWrapper');
		
		if(evt == 'toggleTopBot') {
			if(getValue('prefTopBot', 'top') == 'bot')
				document.getElementById('contentWrapper').removeChild(document.getElementById('easyDiv'));
			else
				document.getElementById('inhalt').removeChild(document.getElementById('easyDiv'));
		}
		
		if(evt == 'change') parentNode.removeChild(document.getElementById('easyDiv'));
		
		if(transportBuild.length > 0) {
			var transportLinkCont = document.createElement('div');
			transportLinkCont.id = 'easyDiv';
			transportLinkCont.align = 'center';
			transportLinkCont.innerHTML = '';

			var strMoon = '';

			var transportLink = document.createElement('span');
			transportLink.id = 'transportLink';
			transportLink.innerHTML = '';

			var Metal = getPlanetInfo('metal');
			var Crystal = getPlanetInfo('crystal');
			var Deut = getPlanetInfo('deuterium');

			var easyTbl = '';
			easyTbl = '<table id="easyTbl" align="center">\n';
			//easyTbl += '<tr><td colspan="5" style="align: right;"><div class="easyMerge"></div>test</td></tr>\n';
			for(var i = 0; i < transportBuild.length; i++) {
				strBuild = transportBuild[i];
				strLevel = transportLevel[i];
				strGala = transportGala[i];
				strSolSys = transportSolSys[i];
				strPos = transportPos[i];
			
				if(transportMoon[i] == true) strMoon = 'M';
				else strMoon = '';
			
				var strError = '';
				var Metal = getPlanetInfo('metal');
				var Crystal = getPlanetInfo('crystal');
				var Deuterium = getPlanetInfo('deuterium');
			
				if(Metal < transportMet[i] || Crystal < transportCrys[i] || Deuterium < transportDeut[i])
					strError += '<br><br><span class=easyErr>' + langNotEnoughRes + '</span>';
				
				if(strError != '') 
					strError += '<br><br><span class=easyErr>' + langPartDelivery + '</span>';
					
				transportDetails[i] = (transportDetails[i] != undefined) ? transportDetails[i] : '';

				if(!oldVersion) {
					easyTbl += '	<tr>\n';
					easyTbl += '		<th><a class="tooltipBottom" title="<div class=easyTooltip>' + transportDetails[i] + '<b>' + langStillMissing + ':</b><br>' + langMet + ': <span class=metal>' + formatNumber(transportMet[i]) + '</span><br>' + langCrys + ': <span class=crystal>' + formatNumber(transportCrys[i]) + '</span><br>' + langDeut + ': <span class=deuterium>' + formatNumber(transportDeut[i]) + '</span>' + strError + '</div>" href="javascript:void(0);" id="easytransport' + i + '">' + strBuild + ' ' + strLevel + '</a></td>\n';
					easyTbl += '		<td id="easyTblCoords' + i + '">[' + strGala + ':' + strSolSys + ':' + strPos + '] ' + strMoon + '</td>\n';
					easyTbl += '		<td><a class="tooltipBottom" title="' + getNeededShipCount(i, 'sc').total + ' (' + getNeededShipCount(i, 'sc').possible + ')" href="javascript:void(0);" id="easytrsc' + i + '">' + langSC + '</a></td>\n';
					easyTbl += '		<td><a class="tooltipBottom" title="' + getNeededShipCount(i, 'lc').total + ' (' + getNeededShipCount(i, 'lc').possible + ')" href="javascript:void(0);" id="easytrlc' + i + '">' + langLC + '</a></td>\n';
					easyTbl += '		<td id="easyTblDel' + i + '"><a href="javascript:void(0);" id="delete_transport' + i + '">' + langDelete + '</a></td>\n';
					easyTbl += '	</tr>\n';
				} else {		
					easyTbl += '	<tr>\n';
					easyTbl += '		<th><a class="tipsStandard" title="|' + transportDetails[i] + langStillMissing + ':<br><br>' + langMet + ': <span class=metal>' + formatNumber(transportMet[i]) + '</span><br>' + langCrys + ': <span class=crystal>' + formatNumber(transportCrys[i]) + '</span><br>' + langDeut + ': <span class=deuterium>' + formatNumber(transportDeut[i]) + '</span>' + strError + '" href="javascript:void(0);" id="easytransport' + i + '">' + strBuild + ' ' + strLevel + '</a></td>\n';
					easyTbl += '		<td id="easyTblCoords' + i + '">[' + strGala + ':' + strSolSys + ':' + strPos + '] ' + strMoon + '</td>\n';
					easyTbl += '		<td><a class="tipsStandard" title="|' + langNeeded + ': ' + getNeededShipCount(i, 'sc').total + ' (' + getNeededShipCount(i, 'sc').possible + ')" href="javascript:void(0);" id="easytrsc' + i + '">' + langSC + '</a></td>\n';
					easyTbl += '		<td><a class="tipsStandard" title="|' + langNeeded + ': ' + getNeededShipCount(i, 'lc').total + ' (' + getNeededShipCount(i, 'lc').possible + ')" href="javascript:void(0);" id="easytrlc' + i + '">' + langLC + '</a></td>\n';
					easyTbl += '		<td id="easyTblDel' + i + '"><a href="javascript:void(0);" id="delete_transport' + i + '">' + langDelete + '</a></td>\n';
					easyTbl += '	</tr>\n';
				}
			}
			easyTbl += '</table>\n';
			easyTbl += '<div class="easyTotal">' + langTotal + ': <span class="metal">' + formatNumber(sumArray(transportMet)) + ' ' + langMet + '</span>, <span class="crystal">' + formatNumber(sumArray(transportCrys)) + ' ' + langCrys + '</span>, <span class="deuterium">' + formatNumber(sumArray(transportDeut)) + ' ' + langDeut + '</span></div>';
			transportLink.innerHTML += easyTbl;
			
			var strTopBot;
			if(getValue('prefTopBot', 'top') == 'top')
				strTopBot = 'bot';
			else
				strTopBot = 'top';
				
			var strMinMax;
			if(getValue('prefMinMax', 'max') == 'max')
				strMinMax = 'min';
			else
				strMinMax = 'max';
			
			var easyOpts = '';
			easyOpts += '<div id="easyOptions" class="easyOptions">\n' +
						'	<span class="easyOptSpan"><a href="javascript:void(0);" id="easyMinMax">' + strMinMax + '</a></span>\n' +
						'	<span class="easyOptSpan">|</span>\n' +
						'	<span class="easyOptSpan"><a href="javascript:void(0);" id="easyTopBot">' + strTopBot + '</a></span>\n';						
			if(getValue('prefMinMax', 'max') == 'max') easyOpts += '	<span class="easyOptSpan">|</span>\n';
			easyOpts += '	<a href="javascript:void(0);" id="easyMergeLink" class="easyLink">\n' +
						'		<span class="easyOptSpan">' + langMerge + '</span>\n' +
						'		<div class="easyMerge easyMergeBlue"></div>\n' +
						'	</a>\n' +
						'</div>';
			
			transportLink.innerHTML += easyOpts;
									  
		
			transportLinkCont.appendChild(transportLink);
			
			if(getValue('prefTopBot', 'top') == 'bot')
				parentNode.appendChild(transportLinkCont);
			else
				parentNode.insertBefore(transportLinkCont, document.getElementById('inhalt'));
				
			if(getValue('prefMinMax', 'max') == 'min') {
				document.getElementById('easyTbl').className = 'easyHidden';
				document.getElementById('easyMergeLink').className = 'easyHidden';
			}
    
			for(var i = 0; i < transportBuild.length; i++) {
				document.getElementById('delete_transport' + i).addEventListener('click', deleteTransport, false);
				document.getElementById('easytrsc' + i).addEventListener('click', fillIn, false);
				document.getElementById('easytrlc' + i).addEventListener('click', fillIn, false);
			}
			
			document.getElementById('easyMergeLink').addEventListener('click', showMergeIcons, false);
			document.getElementById('easyTopBot').addEventListener('click', toggleTopBot, false);
			document.getElementById('easyMinMax').addEventListener('click', toggleMinMax, false);
		}
	}

	if(page('resources') || page('station') || page('research'))
		document.getElementById('planet').addEventListener('DOMNodeInserted', insertText, false);

	if(page('fleet1') || page('resources') || page('station') || page('research')) {
		setValue('easyTransport', false);
		if(transportBuild.length > 0) {
			showLink('');
		}
	}

	if(page('fleet2') && easyTransport) {
		document.getElementById('galaxy').value = transportGala[easyID];
		document.getElementById('system').value = transportSolSys[easyID];
		document.getElementById('position').value = transportPos[easyID];

		if(transportMoon[easyID]) trigger('mbutton', 'click');
		else trigger('pbutton', 'click');

		trigger('galaxy', 'change');
	}

	if(page('fleet3') && easyTransport) {
		document.getElementById('metal').value = transportMet[easyID];
		document.getElementById('crystal').value = transportCrys[easyID];
		document.getElementById('deuterium').value = transportDeut[easyID];

		trigger('missionButton3', 'click');

		runScript("setTimeout(function(){checkRessourceByType('metal');checkRessourceByType('crystal');checkRessourceByType('deuterium');updateVariables();},0)");
		
		/* document.getElementById('metal').addEventListener('change', function() { setValue('tempMet', removeSeparator(document.getElementById('metal').value)) }, false);
		document.getElementById('crystal').addEventListener('change', function() { setValue('tempCrys', removeSeparator(document.getElementById('crystal').value)) }, false);
		document.getElementById('deuterium').addEventListener('change', function() { setValue('tempDeut', removeSeparator(document.getElementById('deuterium').value)) }, false); */
		
		document.getElementById('start').addEventListener('click', deleteTransport, false);
	}

	if(page('research')) {
		var CombDrive = document.getElementById('inhalt').innerHTML.split('details115')[1];
		CombDrive = CombDrive.match(/\d+/)[0];
		setValue('CombDrive', CombDrive);

		var ImpDrive = document.getElementById('inhalt').innerHTML.split('details117')[1];
		ImpDrive = ImpDrive.match(/\d+/)[0];
		setValue('ImpDrive', ImpDrive);
	}
}) ()