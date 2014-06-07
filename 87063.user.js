// ==UserScript==
// @name           Ogame Redesign: Estimated Build Available Time
// @namespace      vtr
// @description    **Inspired from AntiGame**. Displays the estimated build-availability time in build windows and max build number in shipyard and defense.
// @version	1.2.2
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Changelog:
/*
4.10.2010 v1.2.2
* Fixed a bug on maximum build numbers.
===============================================

1.10.2010 v1.2.1
+ English language 
+ Maximum build number in defense and shipyard.
===============================================

30.9.2010 v1.1
* Code Rearrrange
+ Works in other languages too but description is still in greek. Working on it...
*/

//Known Bugs:
/*
* Tooltip in max build numbers doesn't appear in black box.
*/



var EstimatedTimeFunc = function() {

    var Lang = {};

    Lang.LabelsEN =
	{
	    lbl_EstimatedBuildTime: 'Update available in',
	    lbl_RequiredEnergy: 'Energy needed',
	    lbl_MaximumProductionNumber: 'Maximum Production Number',
	    lbl_Max: 'max',
	    lbl_Energy: 'energy'
	}
    Lang.LabelsGR =
	{
	    lbl_EstimatedBuildTime: 'Κατασκευή εφικτή σε',
	    lbl_RequiredEnergy: 'Απαιτούμενη ενέργεια',
	    lbl_MaximumProductionNumber: 'Μέγιστος αριθμός παραγωγής',
	    lbl_Max: 'μεγ.',
	    lbl_Energy: 'ενέργεια'
	}
    Lang.TimerGR =
	{
	    Now: 'τώρα',
	    Day: 'η',
	    Hour: 'ω',
	    Minute: 'λ',
	    Second: 'δ'
	}
    Lang.TimerEN =
	{
	    Now: 'now',
	    Day: 'd',
	    Hour: 'h',
	    Minute: 'm',
	    Second: 's'
	}

    // =======================================================================
    // Ogame formulas and functions
    // =======================================================================

    var Ogame =
	{
	    TECH_WEAPONS: 109,
	    TECH_SHIELD: 110,
	    TECH_ARMOUR: 111,
	    TECH_ENERGY: 113,
	    TECH_COMB_DRIVE: 115,
	    TECH_IMPULSE_DRIVE: 117,
	    TECH_HYPER_DRIVE: 118,

	    used_techs: [109, 110, 111, 113, 115, 117, 118],

	    createShip: function(id, name, metal, crystal, drive, speed, capacity, consumption, exp) {
	        var ship = new Object();
	        ship.name = name;
	        ship.metal = metal;
	        ship.crystal = crystal;

	        switch (drive) {
	            case 1: drive = this.TECH_COMB_DRIVE; break;
	            case 2: drive = this.TECH_IMPULSE_DRIVE; break;
	            case 3: drive = this.TECH_HYPER_DRIVE; break;
	            default: drive = this.TECH_COMB_DRIVE; break;
	        }
	        ship.drive = drive;
	        ship.speed = speed;
	        ship.capacity = capacity;
	        ship.consumption = consumption || 0;
	        ship.exp = exp;

	        this.ships[id] = ship;
	    },

	    createDef: function(id, name, metal, crystal) {
	        var def = new Object();
	        def.name = name;
	        def.metal = metal;
	        def.crystal = crystal;

	        this.defs[id] = def;
	    },

	    readTechs: function() {
	        try {
	            this.techs = [];
	            Utils.$('#buttonz a.detail_button').each(
					function() {
					    Ogame.techs[this.getAttribute('ref')] =
							Utils.parseInt(Utils.$(this).find('.level').get(0).lastChild.nodeValue);
					});

	            this.saveTechs();
	        } catch (e) { Utils.log(e) }
	    },

	    readTemperature: function() {
	        // ---------
	        // min t
	        // ---------
	        this.temperature = 0;

	        var node = this.getActivePlanet();
	        if (!node) return;

	        var t = node.title.match(/<br>.*<br>[^\d\-]*([\d\-]+)/i);
	        if (!t) return;

	        this.temperature = parseInt(t[1], 10);
	    },

	    readActivePlanet: function() {
	        try {
	            this.active_planet = null;

	            var nodes = Utils.XPath('//A[contains(@class,"planetlink")][@title]');
	            if (!nodes) return;

	            if (nodes.snapshotLength == 1)
	                this.active_planet = nodes.snapshotItem(0);
	            else
	                for (var i = 0; i < nodes.snapshotLength; i++)
	                if (nodes.snapshotItem(i).className.indexOf('active') > -1) {
	                this.active_planet = nodes.snapshotItem(i);
	                break;
	            }
	        } catch (e) { Utils.log(e) }
	    },

	    getActivePlanet: function() {
	        if (this.active_planet == null) this.readActivePlanet();
	        return this.active_planet;
	    },

	    getCoordsFromPlanet: function(planet) {
	        if (!planet) return { galaxy: 0, system: 0, planet: 0, type: 0, name: '' };

	        var name = Utils.XPathSingle('SPAN[@class="planet-name"]', planet).innerHTML;
	        var coords = Utils.XPathSingle('SPAN[@class="planet-koords"]', planet).innerHTML;
	        var type = 1;
	        coords = coords.replace(/[\[\]]/g, '').split(':');
	        var res = {
	            galaxy: parseInt(coords[0], 10),
	            system: parseInt(coords[1], 10),
	            planet: parseInt(coords[2], 10),
	            type: type,
	            name: name
	        };
	        return res;
	    },

	    getActiveCoords: function() {
	        return this.getCoordsFromPlanet(this.getActivePlanet());
	    },

	    readOfficers: function() {
	        function checkOfficer(i) {
	            return officers.get(i).src.indexOf('_un.gif') == -1;
	        }

	        var officers = Utils.$('#officers a img');
	        this.commander = checkOfficer(0);
	        this.engineer = checkOfficer(2);
	        this.geologist = checkOfficer(3);
	    },

	    getTech: function(id) {
	        if (this.techs == null) this.loadTechs();
	        return this.techs[id];
	    },

	    getTemperature: function() {
	        if (this.temperature == null) this.readTemperature();
	        return this.temperature;
	    },

	    getGeologist: function() {
	        if (this.geologist == null) this.readOfficers();
	        return this.geologist;
	    },

	    getCommander: function() {
	        if (this.commander == null) this.readOfficers();
	        return this.commander;
	    },

	    getEngineer: function() {
	        if (this.engineer == null) this.readOfficers();
	        return this.engineer;
	    },

	    getConsumption: function(id, level) {
	        if (!id || level < 0) return;

	        if (level == 0) return 0;

	        var res = 0;

	        if (id == 12)
	            res = Math.floor(10 * level * Math.pow(1.1, level)) * Options.uni_SpeedFactor;

	        return Math.floor(res);
	    },

	    getProduction: function(id, level) {
	        if (!id || level < 0) return;

	        // solar sat.
	        if (id == 212) {
	            if (Options.uni_reDesigned)
	                return Math.floor((this.getTemperature() + 40) / 4 + 20) * (this.getEngineer() ? 1.1 : 1);
	            else
	                return Math.floor((this.getTemperature() + 40 + 140) / 6) * (this.getEngineer() ? 1.1 : 1);
	        }

	        if (level == 0)
	            return (id == 1) ? 20 * Options.uni_SpeedFactor :
								(id == 2) ? 10 * Options.uni_SpeedFactor : 0;

	        var res = 0;

	        if (id == 1)
	            res = 30 * level * Math.pow(1.1, level);
	        else if (id == 2)
	            res = 20 * level * Math.pow(1.1, level);
	        else if (id == 3)
	            res = 10 * level * Math.pow(1.1, level) * (1.28 - 0.002 * this.getTemperature() * 2);
	        else if (id == 4)
	            res = 20 * level * Math.pow(1.1, level);
	        else if (id == 12)
	            res = 30 * level * Math.pow(1.05 + this.getTech(this.TECH_ENERGY) * 0.01, level);

	        if (id == 1 || id == 2 || id == 3)
	            res = Math.floor(res) * Options.uni_SpeedFactor;

	        if (id <= 3 && this.getGeologist())
	            res = Math.floor(res) * 1.1;
	        else if (id > 3 && this.getEngineer())
	            res = Math.floor(res) * 1.1;


	        return Math.floor(res + this.getProduction(id, 0));

	    },

	    getStorageCapacity: function(id, level) {
	        if (!id || level < 0) return;
	        if (id != 22 && id != 23 && id != 24) return;
	        var res;

	        if (Options.uni_reDesigned)
	            res = 100 + 50 * Math.floor(Math.pow(1.6, level));
	        else {
	            switch (level) {
	                case 0: res = 10; break;
	                case 1: res = 20; break;
	                case 2: res = 40; break;
	                case 3: res = 75; break;
	                case 4: res = 140; break;
	                case 5: res = 255; break;
	                case 6: res = 470; break;
	                case 7: res = 865; break;
	                case 8: res = 1590; break;
	                case 9: res = 2920; break;
	                case 10: res = 5355; break;
	                case 11: res = 9820; break;
	                case 12: res = 18005; break;
	                case 13: res = 33005; break;
	                case 14: res = 60510; break;
	                case 15: res = 110925; break;
	                case 16: res = 203350; break;
	                case 17: res = 372785; break;
	                case 18: res = 683385; break;
	                case 19: res = 1297589; break;
	                case 20: res = 2296600; break;
	                default: res = 0;
	            }

	        }

	        return res * 1000;
	    },

	    loadTechs: function() {
	        try {
	            //if (!Utils.isFirefox) return;
	            //restore saved values

	            this.techs = [];

	            var str = Utils.getValueUni('techs');
	            if (!str) return;

	            str = str.split('&');
	            for (var i = 0; i < str.length; i++) {
	                var pair = str[i].split('=');
	                this.techs[parseInt(pair[0], 10)] = parseInt(pair[1], 10);
	            }
	        } catch (e) { Utils.log(e) }
	    },

	    saveTechs: function() {
	        //if (!Utils.isFirefox) return;

	        var str = '';
	        for (var i in this.used_techs) {
	            var id = this.used_techs[i];
	            if (str) str += '&';
	            str += '' + id + '=' + this.techs[id];
	        }

	        Utils.setValueUni('techs', str);
	    },

	    updateShipSpeed: function() {
	        if (this.getTech(this.TECH_IMPULSE_DRIVE) >= 5) {
	            this.ships[202].speed = 10000;
	            this.ships[202].drive = this.TECH_IMPULSE_DRIVE;
	        }

	        if (this.getTech(this.TECH_HYPER_DRIVE) >= 8) {
	            this.ships[211].speed = 5000;
	            this.ships[211].drive = this.TECH_HYPER_DRIVE;
	        }

	        for (var i in this.ships) {
	            var ship = this.ships[i];
	            var factor = (ship.drive == this.TECH_COMB_DRIVE) ? 0.1 : (ship.drive == this.TECH_IMPULSE_DRIVE) ? 0.2 : 0.3;
	            ship.speed = Math.floor(ship.speed * (10 + this.getTech(ship.drive) * factor * 10) / 10);

	        }

	    },

	    getFleetDistance: function(current, target) {
	        var diffGalaxy = Math.abs(current.galaxy - target.galaxy);
	        var diffSystem = Math.abs(current.system - target.system);
	        var diffPlanet = Math.abs(current.planet - target.planet);

	        if (diffGalaxy != 0) {
	            return diffGalaxy * 20000;
	        }
	        else if (diffSystem != 0) {
	            return diffSystem * 5 * 19 + 2700;
	        }
	        else if (diffPlanet != 0) {
	            return diffPlanet * 5 + 1000;
	        }
	        else {
	            return 5;
	        }
	    },

	    getFleetDuration: function(id, distance, speed) {
	        return Math.round(((35000 / speed * Math.sqrt(distance * 10 / this.ships[id].speed) + 10) / Options.uni_SpeedFactor));
	    },

	    getFleetConsumption: function(id, distance, speed) {
	        var duration = this.getFleetDuration(id, distance, speed);
	        var shipSpeedValue = 35000 / (duration * Options.uni_SpeedFactor - 10) * Math.sqrt(distance * 10 / this.ships[id].speed);
	        var consumption = this.ships[id].consumption * distance / 35000 * ((shipSpeedValue / 10) + 1) * ((shipSpeedValue / 10) + 1);

	        return Math.round(consumption) + 1;
	    },

	    // ships = [ {name:'NN', count:XX}, ... ]
	    getFleetDebris: function(ships, calcDef) {
	        var first = 0, metal = 0, crystal = 0;
	        for (var i = 0; i < ships.length; i++) {
	            var txt = ships[i].name;
	            var cnt = ships[i].count;

	            for (var j in Ogame.ships) {
	                var ship = Ogame.ships[j];
	                var label = Options.Labels['lbl_ship' + ship.name];

	                if (label && txt.indexOf(label) > -1) {
	                    metal += cnt * ship.metal * Options.uni_DFPercent * 0.01;
	                    crystal += cnt * ship.crystal * Options.uni_DFPercent * 0.01;
	                    first = j;
	                    break;
	                }
	            }

	            if (calcDef && Options.uni_DefenseToDF)
	                for (var j in Ogame.defs) {
	                var def = Ogame.defs[j];
	                var label = Options.Labels['lbl_def' + def.name];

	                if (label && txt.indexOf(label) > -1) {
	                    metal += cnt * def.metal * Options.uni_DefenseToDF * 0.01;
	                    crystal += cnt * def.crystal * Options.uni_DefenseToDF * 0.01;
	                    first = j;
	                    break;
	                }
	            }
	        }

	        var recs = Math.ceil((metal + crystal) / 20000);
	        return { metal: metal, crystal: crystal, recs: recs };
	    },

	    Init: function() {
	        this.temperature = this.geologist = this.engineer = this.techs = this.active_planet = null;

	        var str = document.location.href.match(/:\/\/([^\/]+)\//);
	        this.prefix = str ? str[1].toUpperCase().replace(/[\.\-]/g, '') : '';

	        this.ships = [];
	        // id, name, metal, crystal, drive, speed, capacity, consumption, exp.points
	        this.createShip(202, 'SCargo', 2000, 2000, 1, 5000, 5000, 20, 12);
	        this.createShip(203, 'LCargo', 6000, 6000, 1, 7500, 25000, 50, 47);
	        this.createShip(204, 'LFighter', 3000, 1000, 1, 12500, 50, 0, 12);
	        this.createShip(205, 'HFighter', 6000, 4000, 2, 10000, 100, 0, 110);
	        this.createShip(206, 'Cruiser', 20000, 7000, 2, 15000, 800, 0, 47);
	        this.createShip(207, 'Battleship', 45000, 15000, 3, 10000, 1500, 0, 160);
	        this.createShip(208, 'Colonizator', 10000, 20000, 2, 2500, 7500, 0, 30);
	        this.createShip(209, 'Recycler', 10000, 6000, 1, 2000, 20000, 300, 16);
	        this.createShip(210, 'Spy', 0, 1000, 1, 100000000, 0, 0, 1);
	        this.createShip(211, 'Bomber', 50000, 25000, 2, 4000, 500, 0, 75);
	        this.createShip(213, 'Destroyer', 60000, 50000, 3, 5000, 2000, 0, 110);
	        this.createShip(214, 'RIP', 5000000, 4000000, 3, 100, 1000000, 0, 9000);
	        this.createShip(215, 'BCruiser', 30000, 40000, 3, 10000, 750, 0, 70);
	        this.createShip(212, 'Satellite', 0, 2000, 1, 0, 0);

	        this.defs = [];
	        this.createDef(401, 'RLauncher', 2000, 0);
	        this.createDef(402, 'LLaser', 1500, 500);
	        this.createDef(403, 'HLaser', 6000, 2000);
	        this.createDef(404, 'Gauss', 20000, 15000);
	        this.createDef(405, 'Ion', 2000, 6000);
	        this.createDef(406, 'Plasma', 50000, 50000);
	        this.createDef(407, 'SShield', 10000, 10000);
	        this.createDef(408, 'LShield', 50000, 50000);

	        this.updateShipSpeed();
	    }
	}

    var Options =
	{
	    // General
	    language: '',
	    update_check: true,
	    blockAutoComplete: true,

	    // Universe
	    uni_reDesigned: false,

	    Labels: null,
	    Timer: null,


	    getValueType: function(value) {
	        if (!value) return typeof (value);

	        var val = value.toString();

	        if (val.replace(/\d{1,10}/i, '') == '') return 'number';
	        if (val.replace(/#[A-F\d]{6,6}/i, '') == '') return 'color';

	        return 'string';
	    },


	    handleUpdateResponse: function(response) {
	        try {
	            var newversion = response.responseText;

	            if (!newversion) return;

	            Utils.setValue('update_Version', newversion);
	            Utils.setValue('update_LastTS', DateTime.formatDate(new Date(), '[Y][m][d][H][i]'));
	            this.showUpdateMarker();
	        } catch (e) { Utils.log(e) }
	    },

	    copyMissingProperties: function(src, parent, strChild) {
	        var dst = parent[strChild];
	        if (!dst) {
	            parent[strChild] = src;
	            return;
	        }

	        if (src === dst) return;

	        for (i in src) {
	            if (!dst[i] || typeof (src[i]) != typeof (dst[i]))
	                dst[i] = src[i];
	        }
	    },

	    readResLabels: function() {
	        function getValueFromId(id) {
	            var node = document.getElementById(id);
	            if (!node || !node.title) return;

	            return node.title.match(/\|<B>\s*(.+):\s*<\/B>/i)[1];
	        }

	        this.Labels.lbl_metal = getValueFromId('metal_box');
	        this.Labels.lbl_crystal = getValueFromId('crystal_box');
	        this.Labels.lbl_deuterium = getValueFromId('deuterium_box');
	        this.Labels.lbl_energy = getValueFromId('energy_box');
	        this.Labels.lbl_darkmatter = getValueFromId('darkmatter_box');
	    },

	    initLang: function() {
	        if (!this.language) this.language = Utils.server_lang;

	        this.Labels = Lang['Labels' + Utils.server_lang];
	        this.copyMissingProperties(Lang.LabelsEN, this, 'Labels');
	        this.Timer = Lang['Timer' + Utils.server_lang];
	        this.copyMissingProperties(Lang.TimerEN, this, 'Timer');
	        this.readResLabels();
	    },

	    Init: function() {

	        if (Utils.uni_prefix == 'UNI42_ORG') this.uni_SpeedFactor = 2;
	        else if (Utils.uni_prefix == 'ELECTRA_ORG') this.uni_SpeedFactor = 4;
	        else if (Utils.uni_prefix == 'CAPELLA_RU') this.uni_SpeedFactor = 4;

	        this.initLang();
	    }
	}




    // =======================================================================
    // Date/Time functions
    // =======================================================================



    var DateTime =
	{
	    TimeDelta: 0,
	    TimeZoneDelta: 0,
	    InitialServerTime: 0,

	    getTimeDelta: function() {
	        if (Utils.isCurrentPage('showmessage,eventList,phalanx')) {
	            this.TimeZoneDelta = parseInt(Utils.getValueUni('TimeZoneDelta', 0), 10);
	            return;
	        }

	        this.TimeDelta = 0;
	        if (!Utils.script) return;

	        var now = new Date();


	        // timezone correction
	        if (Utils.ogameVersion == '1.2.1') {
	            var script = Utils.script;
	            var starttime = script.innerHTML.match(/currTime\.setTime\(\((\d+)-startServerTime/i);
	            if (!starttime) return;
	            starttime = parseInt(starttime[1], 10);
	            this.InitialServerTime = starttime;

	            this.TimeZoneDelta = -(Utils.unsafeWindow.localTime.getTime() - Utils.unsafeWindow.startServerTime);
	            this.TimeDelta = now.getTime() - starttime;

	        }
	        else { // ogame 1.1

	            this.InitialServerTime = Utils.unsafeWindow.serverTime;

	            if (!this.InitialServerTime) return;
	            this.InitialServerTime = this.InitialServerTime.getTime();


	            // server time (using current timezone) - local time
	            this.TimeDelta = now.getTime() - this.InitialServerTime;


	            this.TimeZoneDelta = -(now.getTimezoneOffset() / 60 + /*Utils.unsafeWindow.TimezoneOffset*/2) * 60 * 60 * 1000;
	        }

	        if (!Utils.isCurrentPage('showmessage,eventList'))
	            Utils.setValueUni('TimeZoneDelta', this.TimeZoneDelta);
	    },

	    LZ: function(x) {
	        return (x < 0 || x > 9 ? "" : "0") + x;
	    },

	    getDatePart: function(date) {
	        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
	    },

	    getFinishTime: function(tick) {
	        var date = new Date();
	        date.setTime(this.InitialServerTime + parseInt(tick) * 1000, 10);
	        return date;
	    },

	    formatTime: function(tick) {
	        var h = Math.floor(tick / 60 / 60);
	        tick -= h * 60 * 60;
	        var m = Math.floor(tick / 60);
	        tick -= m * 60;
	        return this.LZ(h) + ':' + this.LZ(m) + ':' + this.LZ(tick);
	    },

	    formatDate: function(date, format, asis) {
	        var str = "";
	        try {
	            if (!format || format == "") {
	                format = '[H]:[i]:[s]';
	                var now = new Date();

	                if (this.getDatePart(now) != this.getDatePart(date))
	                    format = '[d]/[m] ' + format;
	            }

	            var str = format;
	            var hours = date.getHours();
	            if (!asis && Options.timeAMPM && str.indexOf('[H]') > -1) {
	                str += ' ' + ((hours >= 0 && hours < 12) ? 'AM' : 'PM');

	                if (hours > 12) hours -= 12;
	                else if (hours == 0) hours = 12;
	            }

	            str = str.replace("[d]", this.LZ(date.getDate()));
	            str = str.replace("[m]", this.LZ(date.getMonth() + 1));
	            str = str.replace("[Y]", date.getFullYear());
	            str = str.replace("[y]", date.getFullYear().toString().substr(2, 4));
	            str = str.replace("[H]", this.LZ(hours));
	            str = str.replace("[i]", this.LZ(date.getMinutes()));
	            str = str.replace("[s]", this.LZ(date.getSeconds()));
	        }
	        catch (e) { Utils.log(e); }

	        return str;
	    },

	    formatDate2: function(date, format) {
	        if (Options.timeSetting == 1)
	            return DateTime.formatDate(date, format);
	        else
	            return DateTime.formatDateServer(date, format);
	    },

	    formatDateServer: function(date, format) {
	        if (!format || format == "") {
	            format = '[H]:[i]:[s]';
	            var now = new Date();

	            if (this.getDatePart(now) != this.getDatePart(date))
	                format = '[d]/[m] ' + format;
	        }


	        date.setTime(date.getTime() - this.TimeZoneDelta);
	        return DateTime.formatDate(date, format);
	    },

	    getCountdownTime: function(totalSeconds) {
	        var days = 0;
	        var totalHours = 0;
	        var hours = 0;
	        var totalMinutes = 0;
	        var minutes = 0;
	        var seconds = 0;
	        var str = "";

	        seconds = totalSeconds % 60;
	        totalMinutes = (totalSeconds - seconds) / 60;
	        minutes = totalMinutes % 60;
	        totalHours = (totalMinutes - minutes) / 60;
	        hours = totalHours % 24;
	        days = (totalHours - hours) / 24;

	        if (days > 0)
	            str += days + Options.Timer.Day + " ";
	        if (hours > 0)
	            str += hours + Options.Timer.Hour + " ";
	        if (minutes > 0)
	            str += minutes + Options.Timer.Minute + " ";
	        if (seconds > 0)
	            str += seconds + Options.Timer.Second + " ";
	        if (str == "")
	            str = Options.Timer.Now;
	        return str;
	    },

	    parseTime: function(strTime) {
	        if (!strTime) return 0;

	        strTime = strTime.replace(/[^0-9:]/, '');
	        var parts = strTime.split(':');

	        if (!parts || parts.length != 3) return 0;

	        return (parseInt(parts[0], 10) * 60 * 60 + parseInt(parts[1], 10) * 60 + parseInt(parts[2], 10)) * 1000;
	    },

	    // d = day, m = month, y = year (2 digits), Y = year (4 digits), H = hour (2 digits), i = minutes, s = seconds
	    parse: function(strDate, format) {
	        strDate = strDate.toString();
	        var str = format.match(/\[[dmyYHis]\]/g);

	        if (!str || !str.length) return null;

	        var rx = format;
	        rx = rx.replace(/\./g, '\\.');
	        rx = rx.replace(/\//g, '\\/');
	        rx = rx.replace(/\-/g, '\\-');

	        var index = {};

	        for (var i = 0; i < str.length; i++) {
	            var token = str[i];
	            if (token == '[Y]') rx = rx.replace(token, '(\\d{4,4})');
	            else if (token == '[y]') rx = rx.replace(token, '(\\d{2,2})');
	            else rx = rx.replace(token, '(\\d{1,2})');

	            token = token.substr(1, 1);
	            index[token] = i + 1;
	        }

	        str = strDate.match(new RegExp(rx, ''));


	        if (!str || !str.length) return null;


	        var date = new Date();
	        date.setSeconds(0); date.setMinutes(0); date.setHours(0);

	        if (str[index.s]) date.setSeconds(str[index.s]);
	        if (str[index.i]) date.setMinutes(str[index.i]);
	        if (str[index.H]) date.setHours(str[index.H]);

	        if (str[index.Y]) date.setFullYear(str[index.Y]);
	        else if (str[index.y]) {
	            var year = date.getFullYear();
	            year = Math.floor(year / 100) * 100 + str[index.y];
	            if (year > date.getFullYear()) year -= 100;
	            date.setFullYear(year);
	        }

	        if (str[index.d]) date.setDate(1);
	        if (str[index.m]) date.setMonth(str[index.m] - 1);
	        if (str[index.d]) date.setDate(str[index.d]);

	        return date;
	    },

	    parse2: function(strDate, timeFormat, dateFormat) {
	        if (!strDate) return null;

	        if (!timeFormat) {
	            timeFormat = '[H]:[i]:[s]';
	            dateFormat = '[d].[m].[Y]';
	        }

	        var str = strDate.toString();

	        if (!dateFormat) {
	            return this.parse(str, timeFormat, true);
	        }
	        else {
	            var time = this.parse(str, timeFormat);
	            var date = this.parse(str, dateFormat);

	            if (!date && !time) return null;

	            var newDate = new Date();

	            if (date) {
	                newDate.setFullYear(date.getFullYear());
	                newDate.setMonth(date.getMonth());
	                newDate.setDate(date.getDate());
	            }

	            if (time) {
	                newDate.setHours(time.getHours());
	                newDate.setMinutes(time.getMinutes());
	                newDate.setSeconds(time.getSeconds());
	            }

	            return newDate;
	        }
	    },

	    convertDateServer2Local: function(date) {
	        var newDate = new Date();
	        newDate.setTime(date.getTime() + this.TimeZoneDelta);
	        return newDate;
	    },
	    convertStringServer2Local: function(strDate, timeFormat, dateFormat) {
	        if (!timeFormat) {
	            timeFormat = '[H]:[i]:[s]';
	            dateFormat = '[d].[m].[Y]';
	        }

	        var oldDate = this.parse2(strDate, timeFormat, dateFormat);
	        if (!oldDate) return strDate;

	        var newDate = this.convertDateServer2Local(oldDate);

	        var str = strDate.toString();
	        str = str.replace(this.formatDate(oldDate, timeFormat, true), this.formatDate(newDate, timeFormat));

	        if (dateFormat) str = str.replace(this.formatDate(oldDate, dateFormat), this.formatDate(newDate, dateFormat));

	        return str;
	    },

	    changeOgameClocks2Server: function() {
	        var code;

	        if (Utils.ogameVersion == '1.1') { // ogame 1.1
	            code = ' \
					function UhrzeitAnzeigen() { \
					var Sekunden = serverTime.getSeconds(); \
					serverTime.setSeconds(Sekunden+1); \
					Uhrzeitanzeige = getFormatedDate(serverTime.getTime() - ' + this.TimeZoneDelta + ', "[d].[m].[Y] <span>[H]:[i]:[s]</span>"); \
					if(document.getElementById) \
						document.getElementById("OGameClock").innerHTML = Uhrzeitanzeige; \
					else if(document.all) \
						Uhrzeit.innerHTML = Uhrzeitanzeige; \
					} ';
	        }

	        if (Utils.ogameVersion == '1.2.1') { // ogame 1.2.1
	            var code = ' \
					var func = UhrzeitAnzeigen.toString();\
					func = func.replace(/(getFormatedDate\\(currTime\\.getTime\\(\\))/i,"$1-(' + this.TimeZoneDelta + ')"); \
					eval(func); \
				';
	        }

	        Utils.runScript(code);
	    },

	    changeNodesTime: function(xpath, format, property) {
	        var nodes = Utils.XPath(xpath);
	        property = property || 'innerHTML';

	        for (var i = 0; i < nodes.snapshotLength; i++) {
	            var node = nodes.snapshotItem(i);

	            node[property] = DateTime.convertStringServer2Local(node[property], format);
	        }
	    },

	    showPageStartTime: function() {
	        var clock = document.getElementById('OGameClock');
	        if (!clock) return;
	        var div = document.createElement('div');
	        div.id = 'StartTime';
	        div.setAttribute('style', 'color:#848484; font-size:11px; position:absolute; right:1px; text-align:right; top:16px');
	        //var date = new Date(this.InitialServerTime - (Options.showServerOgameClock?this.TimeZoneDelta:0) );
	        var date = this.InitialServerTime;
	        if (Utils.ogameVersion == '1.1' && Options.showServerOgameClock || Utils.ogameVersion == '1.2.1' && !(Options.timeSetting == 1 && !Options.showServerOgameClock))
	            date -= this.TimeZoneDelta;

	        date = new Date(date);

	        div.innerHTML = this.formatDate(date, '[d].[m].[Y] <span style="font-weight:700">[H]:[i]:[s]</span>');
	        Utils.insertAfter(div, clock);
	    },

	    Init: function() {
	        this.getTimeDelta();

	        if (Utils.ogameVersion == '1.1') { // ogame 1.1
	            if (Options.timeSetting == 2) {
	                var code = 'window.old_getFormatedDate = window.getFormatedDate; window.getFormatedDate = function(date,format) { return window.old_getFormatedDate(date-' + this.TimeZoneDelta + ',format) }';
	                Utils.runScript(code);
	            }

	            if (Options.timeSetting != 2 && Options.showServerOgameClock)
	                this.changeOgameClocks2Server();
	        }

	        if (Utils.ogameVersion == '1.2.1') { // ogame 1.2.1
	            if (Options.timeSetting == 1) {
	                $
	                var code = 'window.old_getFormatedDate = window.getFormatedDate; window.getFormatedDate = function(date,format) { return window.old_getFormatedDate(date+' + this.TimeZoneDelta + ',format) }';
	                Utils.runScript(code);
	            }

	            if (Options.timeSetting == 1 && Options.showServerOgameClock)
	                this.changeOgameClocks2Server();
	        }

	    }
	}

    // =======================================================================
    // misc functions
    // =======================================================================
    var Utils =
	{
	    page: "",
	    unsafeWindow: window,
	    bg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAALHRFWHRDcmVhdGlvbiBUaW1lAHPhYiAzMSBPdXQgMjAwOSAxODoyNjowOSAtMDAwMBvBwloAAAAHdElNRQfZCh8SGy7RbQlkAAAACXBIWXMAAB7BAAAewQHDaVRTAAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpjYGBgmAEAAJ0AmeuxAnUAAAAASUVORK5CYII=",

	    ogameVersion: '1.1',

	    // wrappers for GM functions
	    setValue: function(cookieName, cookieValue) {
	        if (Utils.isFirefox)
	            GM_setValue(cookieName, cookieValue);

	        else {
	            if (!cookieName) { return; }
	            var lifeTime = 31536000;
	            document.cookie = escape(cookieName) + "=" + escape(Utils.getRecoverableString(cookieValue)) +
					";expires=" + (new Date((new Date()).getTime() + (1000 * lifeTime))).toGMTString() + ";path=/";
	        }
	    },

	    getValue: function(cookieName, oDefault) {
	        if (Utils.isFirefox)
	            return GM_getValue(cookieName, oDefault);

	        else {
	            var cookieJar = document.cookie.split("; ");
	            for (var x = 0; x < cookieJar.length; x++) {
	                var oneCookie = cookieJar[x].split("=");
	                if (oneCookie[0] == escape(cookieName)) {
	                    try {
	                        eval('var footm = ' + unescape(oneCookie[1]));
	                    } catch (e) { return oDefault; }
	                    return footm;
	                }
	            }
	            return oDefault;
	        }
	    },

	    deleteValue: function(cookieName) {
	        if (Utils.isFirefox)
	            GM_deleteValue(cookieName);
	        else if (this.getValue(cookieName))
	            document.cookie = escape(cookieName) + "=" + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	    },

	    setValueUni: function(name, value) {
	        Utils.setValue(Utils.uni_prefix + name, value);
	    },

	    getValueUni: function(name, def) {
	        return Utils.getValue(Utils.uni_prefix + name, def);
	    },

	    deleteValueUni: function(name) {
	        Utils.deleteValue(Utils.uni_prefix + name);
	    },

	    log: function(str) {
	        if (Utils.isFirefox)
	            GM_log(str);
	        else if (Utils.isOpera)
	            window.opera.postError(str);
	        else if (Utils.isChrome)
	            console.log('Antigame: ' + str);
	    },

	    dump: function(obj, proplist, showUndefined) {
	        if (typeof (showUndefined) == 'undefined') showUndefined = true;

	        if (typeof (obj) != 'object') {
	            var label = (proplist ? proplist + ': ' : '');
	            Utils.log('' + label + obj);
	        }

	        else if (!proplist) {
	            for (var i in obj)
	                try {
	                if (typeof (obj[i]) != 'function')
	                    Utils.log(i + ': ' + obj[i])
	            } catch (e) { }

	        }
	        else {
	            var props = proplist.split(',');
	            for (var i = 0; i < props.length; i++)
	                try {
	                var prop = props[i];
	                if (showUndefined || typeof (obj[prop]) != 'undefined') Utils.log(prop + ': ' + obj[props[i]])
	            } catch (e) { }
	        }
	    },

	    getRecoverableString: function(oVar, notFirst) {
	        var oType = typeof (oVar);
	        if ((oType == 'null') || (oType == 'object' && !oVar)) {
	            //most browsers say that the typeof for null is 'object', but unlike a real
	            //object, it will not have any overall value
	            return 'null';
	        }
	        if (oType == 'undefined') { return 'window.uDfXZ0_d'; }
	        if (oType == 'object') {
	            //Safari throws errors when comparing non-objects with window/document/etc
	            if (oVar == window) { return 'window'; }
	            if (oVar == document) { return 'document'; }
	            if (oVar == document.body) { return 'document.body'; }
	            if (oVar == document.documentElement) { return 'document.documentElement'; }
	        }
	        if (oVar.nodeType && (oVar.childNodes || oVar.ownerElement)) { return '{error:\'DOM node\'}'; }
	        if (!notFirst) {
	            Object.prototype.toRecoverableString = function(oBn) {
	                if (this.tempLockIgnoreMe) { return '{\'LoopBack\'}'; }
	                this.tempLockIgnoreMe = true;
	                var retVal = '{', sepChar = '', j;
	                for (var i in this) {
	                    if (i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor') { continue; }
	                    if (oBn && (i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString')) { continue; }
	                    j = this[i];
	                    if (!i.match(basicObPropNameValStr)) {
	                        //for some reason, you cannot use unescape when defining peoperty names inline
	                        for (var x = 0; x < cleanStrFromAr.length; x++) {
	                            i = i.replace(cleanStrFromAr[x], cleanStrToAr[x]);
	                        }
	                        i = '\'' + i + '\'';
	                    } else if (window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/)) {
	                        //IE mac does not allow numerical property names to be used unless they are quoted
	                        i = '\'' + i + '\'';
	                    }
	                    retVal += sepChar + i + ':' + getRecoverableString(j, true);
	                    sepChar = ',';
	                }
	                retVal += '}';
	                this.tempLockIgnoreMe = false;
	                return retVal;
	            };
	            Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
	            Array.prototype.toRecoverableString = function() {
	                if (this.tempLock) { return '[\'LoopBack\']'; }
	                if (!this.length) {
	                    var oCountProp = 0;
	                    for (var i in this) { if (i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length') { oCountProp++; } }
	                    if (oCountProp) { return this.toRecoverableObString(true); }
	                }
	                this.tempLock = true;
	                var retVal = '[';
	                for (var i = 0; i < this.length; i++) {
	                    retVal += (i ? ',' : '') + getRecoverableString(this[i], true);
	                }
	                retVal += ']';
	                delete this.tempLock;
	                return retVal;
	            };
	            Boolean.prototype.toRecoverableString = function() {
	                return '' + this + '';
	            };
	            Date.prototype.toRecoverableString = function() {
	                return 'new Date(' + this.getTime() + ')';
	            };
	            Function.prototype.toRecoverableString = function() {
	                return this.toString().replace(/^\s+|\s+$/g, '').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i, 'function () {[\'native code\'];}');
	            };
	            Number.prototype.toRecoverableString = function() {
	                if (isNaN(this)) { return 'Number.NaN'; }
	                if (this == Number.POSITIVE_INFINITY) { return 'Number.POSITIVE_INFINITY'; }
	                if (this == Number.NEGATIVE_INFINITY) { return 'Number.NEGATIVE_INFINITY'; }
	                return '' + this + '';
	            };
	            RegExp.prototype.toRecoverableString = function() {
	                return '\/' + this.source + '\/' + (this.global ? 'g' : '') + (this.ignoreCase ? 'i' : '');
	            };
	            String.prototype.toRecoverableString = function() {
	                var oTmp = escape(this);
	                if (oTmp == this) { return '\'' + this + '\''; }
	                return 'unescape(\'' + oTmp + '\')';
	            };
	        }
	        if (!oVar.toRecoverableString) { return '{error:\'internal object\'}'; }
	        var oTmp = oVar.toRecoverableString();
	        if (!notFirst) {
	            //prevent it from changing for...in loops that the page may be using
	            delete Object.prototype.toRecoverableString;
	            delete Array.prototype.toRecoverableObString;
	            delete Array.prototype.toRecoverableString;
	            delete Boolean.prototype.toRecoverableString;
	            delete Date.prototype.toRecoverableString;
	            delete Function.prototype.toRecoverableString;
	            delete Number.prototype.toRecoverableString;
	            delete RegExp.prototype.toRecoverableString;
	            delete String.prototype.toRecoverableString;
	        }
	        return oTmp;
	    },

	    addSpanMark: function(value, content) {
	        var className = !value ? 'middlemark' : value > 0 ? 'undermark' : 'overmark';
	        content = content || ('(' + ((value > 0) ? '+' : '') + Utils.formatNumber(value) + ')');
	        return '<span class="' + className + '">' + content + '</span>';
	    },

	    blockAutocomplete: function() {
	        var forms = document.getElementsByTagName('form');
	        for (var i = 0; i < forms.length; i++)
	            forms[i].setAttribute('autocomplete', 'off');
	    },

	    checkRedesign: function() {
	        return (this.unsafeWindow.$ || this.isCurrentPage('showmessage')) ? true : false;
	    },

	    createStyleSheet: function() {
	        document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
	        Utils.stylesheet = document.styleSheets[document.styleSheets.length - 1];
	    },

	    formatNumber: function(num) {
	        var separator = ((Options.thousandSeparator == '--') ? this.separator : Options.thousandSeparator) || '';
	        num = '' + num;

	        if (!separator || isNaN(num)) return num;

	        var group, res = '';
	        while (group = num.slice(-3)) {
	            res = (res && group != '-') ? group + separator + res : group + res;
	            num = num.substr(0, num.length - group.length);
	        }

	        return res;
	    },

	    trim: function(str) {
	        return str ? str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1") : null;
	    },

	    getDocScript: function() {
	        var scripts = document.getElementsByTagName('script');
	        this.script = null;

	        var n = 0;

	        for (var i = 0; i < scripts.length; i++)
	            if (!scripts[i].src && !(this.isCurrentPage('messages') && n++ == 0)) {
	            this.script = scripts[i];
	            break;
	        }

	    },

	    insertAfter: function(newElement, targetElement) {
	        if (!newElement || !targetElement) return;

	        var parent = targetElement.parentNode;
	        if (parent.lastchild == targetElement)
	            parent.appendChild(newElement);
	        else
	            parent.insertBefore(newElement, targetElement.nextSibling);
	    },

	    deleteNode: function(node) {
	        if (node) node.parentNode.removeChild(node);
	    },

	    insertCSSRule: function(rule) {
	        Utils.stylesheet.insertRule(rule, 0);
	    },

	    isCurrentPage: function(page) {
	        var pages = page.toLowerCase().split(',');
	        for (var i = 0; i < pages.length; i++)
	            if (pages[i] == this.page)
	            return true;

	        return false;
	    },

	    runScript: function(code) {
	        if (!code || code == "") return;
	        document.location.href = 'javascript:' + code + ';void(0);';
	    },

	    trigger: function(id, event) {

	        var node = ((typeof (id) == 'string') ? document.getElementById(id) : id);
	        if (!node) return;

	        var evt;
	        if (event == 'click' || event == 'mouseup') {
	            evt = document.createEvent("MouseEvents");
	            evt.initMouseEvent(event, true, true, Utils.unsafeWindow, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	        }
	        else if (event == 'change' || event == 'focus') {
	            var evt = document.createEvent("HTMLEvents");
	            evt.initEvent(event, true, false);
	        }
	        else if (event == 'keyup' || event == 'keypress') {
	        }

	        if (evt) node.dispatchEvent(evt);

	    },

	    killCluetips: function(selector) {
	        selector = selector || '.tipsStandard';
	        setTimeout(function() { Utils.$(selector).cluetip('destroy').unbind('mouseover').each(function() { this.title = this.title.replace('|', '') }) }, 0);
	    },

	    XPath: function(path, context, type) {
	        try {
	            if (!context) context = document;
	            mydoc = context.ownerDocument || document;
	            if (!type) type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	            return mydoc.evaluate(path, context, null, type, null)
	        }
	        catch (e) { Utils.log(e); }
	    },

	    XPathSingle: function(path, context) {
	        return this.XPath(path, context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
	    },

	    getElementsByClassName: function(className, context) {
	        var path = '';
	        var classes = className.match(/\S+/gi);
	        for (var i = 0; i < classes.length; i++) {
	            var c = classes[i];
	            if (path) path += ' and ';
	            if (c.substr(0, 1) == '!') {
	                path += 'false=';
	                c = c.substr(1);
	            }

	            path += 'contains(concat(" ", normalize-space(@class), " "), " ' + c + ' ")';
	        }

	        return this.XPath('descendant::*[' + path + ']', context);
	    },

	    getElementByClassName: function(className, context) {
	        return this.getElementsByClassName(className, context).snapshotItem(0);
	    },

	    parseInt: function(str) {
	        if (!str) return null;
	        //str = str.replace(/(\d+)kk/i, '$1'+'000000');
	        return parseInt(str.replace(/[^\d\-]/g, ''), 10);
	    },

	    extractInt: function(str, rx) {
	        if (!str) return null;
	        str = str.toString();

	        if (!rx)
	            return Utils.parseInt(str);

	        str = str.match(rx);
	        if (!str) return null;
	        else return Utils.parseInt(str[1]);
	    },

	    getIntById: function(id, property, rx) {
	        var node = document.getElementById(id);
	        property = property || 'innerHTML';
	        if (!node || !node[property]) return null;
	        return Utils.extractInt(node[property], rx);
	    },

	    getIntByXPath: function(xpath, property, rx) {
	        property = property || 'innerHTML';
	        var node = Utils.XPathSingle(xpath);
	        if (!node) return null;
	        return Utils.extractInt(node[property], rx);
	    },

	    initUni: function() {
	        this.server = "EN";

	        var url = document.location.href;
	        server = url.match(/http:\/\/([^\\\/]+[\\\/])/i);

	        if (server) server = server[1].toUpperCase();
	        server = server.replace(/\\/i, '/');

	        if (server.indexOf('AR.OGAME.ORG/') > -1) this.server = 'AR'; // Argentina
	        else if (server.indexOf('BA.OGAME.ORG/') > -1) this.server = 'BA'; // Balkan countries
	        else if (server.indexOf('BG.OGAME.ORG/') > -1) this.server = 'BG'; // Bulgaria
	        else if (server.indexOf('OGAME.COM.BR/') > -1) this.server = 'BR'; // Brasil
	        else if (server.indexOf('CN.OGAME.ORG/') > -1) this.server = 'CN'; // China
	        else if (server.indexOf('OGAME.CZ/') > -1) this.server = 'CZ'; // Czech Republic
	        else if (server.indexOf('OGAME.DE/') > -1) this.server = 'DE'; // Germany
	        else if (server.indexOf('OGAME.DK/') > -1) this.server = 'DK'; // Denmark
	        else if (server.indexOf('OGAME.COM.ES/') > -1) this.server = 'ES'; // Spain
	        else if (server.indexOf('FI.OGAME.ORG/') > -1) this.server = 'FI'; // Finnland
	        else if (server.indexOf('OGAME.FR/') > -1) this.server = 'FR'; // France
	        else if (server.indexOf('OGAME.GR/') > -1) this.server = 'GR'; // Greece
	        else if (server.indexOf('OGAME.COM.HR/') > -1) this.server = 'HR'; // Croatia
	        else if (server.indexOf('OGAME.HU/') > -1) this.server = 'HU'; // Hungary
	        else if (server.indexOf('OGAME.IT/') > -1) this.server = 'IT'; // Italy
	        else if (server.indexOf('OGAME.JP/') > -1) this.server = 'JP'; // Japan
	        else if (server.indexOf('OGAME2.CO.KR/') > -1) this.server = 'KR'; // Korea
	        else if (server.indexOf('OGAME.LT/') > -1) this.server = 'LT'; // Lithuania
	        else if (server.indexOf('OGAME.LV/') > -1) this.server = 'LV'; // Latvia
	        else if (server.indexOf('MX.OGAME.ORG/') > -1) this.server = 'MX'; // Mexico
	        else if (server.indexOf('OGAME.NL/') > -1) this.server = 'NL'; // Netherlands
	        else if (server.indexOf('OGAME.NO/') > -1) this.server = 'NO'; // Norway
	        else if (server.indexOf('OGAME.PL/') > -1) this.server = 'PL'; // Poland
	        else if (server.indexOf('OGAME.COM.PT/') > -1) this.server = 'PT'; // Portugal
	        else if (server.indexOf('OGAME.RO/') > -1) this.server = 'RO'; // Romania
	        else if (server.indexOf('OGAME.RU/') > -1) this.server = 'RU'; // Russia
	        else if (server.indexOf('OGAME.SE/') > -1) this.server = 'SE'; // Sweden
	        else if (server.indexOf('OGAME.SI/') > -1) this.server = 'SI'; // Slovenia
	        else if (server.indexOf('OGAME.SK/') > -1) this.server = 'SK'; // Slovakia
	        else if (server.indexOf('OGAME.COM.TR/') > -1) this.server = 'TR'; // Turkey
	        else if (server.indexOf('OGAME.TW/') > -1) this.server = 'TW'; // Taiwan
	        else if (server.indexOf('OGAME.US/') > -1) this.server = 'US'; // USA
	        else if (server.indexOf('OGAME.ORG/') > -1) this.server = 'ORG'; // UK

	        this.server_lang = this.server;
	        if (this.server == 'US' || this.server == 'ORG') this.server_lang = 'EN';
	        //else if (this.server == 'AR' || this.server == 'MX') this.server_lang = 'ES';

	        this.uni = url.toUpperCase().match(/:\/\/([a-z0-9]+)\./i);
	        this.uni = this.uni ? this.uni[1] : '0';

	        var uni_server = this.uni + '.' + this.server;

	        this.uni_prefix = uni_server.replace(/[\.\-]/g, '_');

	        this.page = document.body.id.toLowerCase();
	        if (!this.page) {
	            this.page = document.location.search.match(/page=(\w+)/i);
	            this.page = this.page ? this.page[1].toLowerCase() : "";
	        }

	        if (this.unsafeWindow.startServerTime)
	            this.ogameVersion = '1.2.1';
	    },

	    Init: function() {
	        this.createStyleSheet();

	        this.isOpera = (window.opera) ? true : false;
	        this.isFirefox = (window.navigator.userAgent.indexOf('Firefox') > -1) ? true : false;
	        this.isChrome = (window.navigator.userAgent.indexOf('Chrome') > -1) ? true : false;

	        try { this.unsafeWindow = unsafeWindow; }
	        catch (e) { this.unsafeWindow = window; }

	        this.$ = this.unsafeWindow.$;

	        try { this.separator = this.unsafeWindow.LocalizationStrings['thousandSeperator'] || '.' }
	        catch (e) { this.separator = '.' }


	        // server abbr, server language, uni, speedfactor, page name
	        this.initUni();

	        this.getDocScript();

	        if (document.location.href.match(/http:\/\/.+\.ogame\..+\/game\/index\.php\?page=*/i)) this.ogame = true;
	        else this.ogame = false;
	    }
	}

    // =======================================================================
    // Various resources calculation
    // =======================================================================

    var Resources =
	{
	    res_array: ['metal', 'crystal', 'deuterium', 'energy'],
	    res_array_firstcap: ['Metal', 'Crystal', 'Deuterium', 'Energy'],
	    currentRes: {},
	    costRes: {},
	    res_container: null,

	    readMetal: function() {
	        this.Metal = Utils.getIntById("resources_metal");
	    },
	    readCrystal: function() {
	        this.Crystal = Utils.getIntById("resources_crystal");
	    },
	    readDeuterium: function() {
	        this.Deuterium = Utils.getIntById("resources_deuterium");
	    },
	    readEnergy: function() {
	        this.Energy = Utils.getIntById("resources_energy");
	    },

	    readMetalRate: function() {
	        var title = document.getElementById("metal_box").title;

	        var divtitle = document.createElement("div");
	        divtitle.innerHTML = title;
	        var strrate = divtitle.getElementsByTagName("span")[1].innerHTML;

	        this.MetalRate = Utils.parseInt(strrate.substring(2, strrate.length - 1));
	    },

	    readCrystalRate: function() {
	        var title = document.getElementById("crystal_box").title;

	        var divtitle = document.createElement("div");
	        divtitle.innerHTML = title;
	        var strrate = divtitle.getElementsByTagName("span")[1].innerHTML;

	        this.CrystalRate = Utils.parseInt(strrate.substring(2, strrate.length - 1));
	    },

	    readDeuteriumRate: function() {
	        var title = document.getElementById("deuterium_box").title;

	        var divtitle = document.createElement("div");
	        divtitle.innerHTML = title;
	        var strrate = divtitle.getElementsByTagName("span")[1].innerHTML;

	        this.DeuteriumRate = Utils.parseInt(strrate.substring(2, strrate.length - 1));
	    },

	    initCosts: function() {
	        //this.costscount = Utils.getElementsByClassName("metal", document.getElementById("costs")).snapshotLength;
	        //this.costs = new Array();
	        var $ = Utils.$;
	        var res = $("#costs #resources")[0];
	        var costs = Utils.getElementsByClassName("metal", res);
	        this.costMetal = 0;
	        this.costCrystal = 0;
	        this.costDeuterium = 0;
	        this.costEnergy = 0;
	        //document.getElementsByTagName
	        for (var i = 0; i < costs.snapshotLength; i++) {
	            var value = Utils.parseInt(costs.snapshotItem(i).getElementsByTagName("span")[0].innerHTML);
	            var type = costs.snapshotItem(i).getElementsByTagName("img")[0].src;
	            type = type.substring(type.indexOf("ressourcen_") + 11, type.indexOf(".gif"));

	            if (type == "metall") {
	                this.costMetal = value;
	            }
	            if (type == "kristal") {
	                this.costCrystal = value;
	            }
	            if (type == "deuterium") {
	                this.costDeuterium = value;
	            }
	            if (type == "energie") {
	                this.costEnergy = value;
	            }
	        }
	    },
	    getCostMetal: function() {
	        return this.costMetal;
	    },
	    getCostCrystal: function() {
	        return this.costCrystal;
	    },
	    getCostDeuterium: function() {
	        return this.costDeuterium;
	    },
	    getCostEnergy: function() {
	        return this.costEnergy;
	    },
	    getMetal: function() {
	        this.readMetal()
	        return this.Metal;
	    },
	    getCrystal: function() {
	        this.readCrystal()
	        return this.Crystal;
	    },
	    getDeuterium: function() {
	        this.readDeuterium()
	        return this.Deuterium;
	    },
	    getEnergy: function() {
	        this.readEnergy()
	        return this.Energy;
	    },
	    getMetalNeeded: function() {
	        var needed = this.getCostMetal() - this.getMetal();
	        if (needed < 0)
	            needed = 0;
	        return needed;
	    },
	    getCrystalNeeded: function() {
	        var needed = this.getCostCrystal() - this.getCrystal();
	        if (needed < 0)
	            needed = 0;
	        return needed;
	    },
	    getDeuteriumNeeded: function() {
	        var needed = this.getCostDeuterium() - this.getDeuterium();
	        if (needed < 0)
	            needed = 0;
	        return needed;
	    },
	    getEnergyNeeded: function() {
	        var needed = this.getCostEnergy() - this.getEnergy();
	        if (needed < 0)
	            needed = 0;
	        return needed;
	    },
	    getMetalRate: function() {
	        this.readMetalRate()
	        return this.MetalRate;
	    },
	    getCrystalRate: function() {
	        this.readCrystalRate()
	        return this.CrystalRate;
	    },
	    getDeuteriumRate: function() {
	        this.readDeuteriumRate()
	        return this.DeuteriumRate;
	    },

	    addCell: function(key, value) {
	        if (this.html) this.html += ' ';
	        this.html += key + ':<span class="time" style="padding-right: 0px">' + Utils.formatNumber(value) + '</span>';
	    },

	    showEstimatedProduction: function() {
	        try {
	            var id = document.getElementsByName('type')[0];
	            if (!id) return;
	            id = parseInt(id.value, 10);

	            var level = Utils.XPathSingle('//*[@ref="' + id + '"]/descendant::*[@class="level"]');
	            if (!level) return;
	            level = Utils.parseInt(level.lastChild.nodeValue);
	            var str, oldvalue, newvalue;
	            var $ = Utils.$;
	            Resources.initCosts();

	            // estimated production
	            if (!Ogame.getCommander()) {
	                var metalneeded = Resources.getMetalNeeded();
	                var crystalneeded = Resources.getCrystalNeeded();
	                var deuteriumneeded = Resources.getDeuteriumNeeded();
	                var energyneeded = Resources.getEnergyNeeded();
	                var energycost = Resources.getCostEnergy();

	                if (energycost == 0) {

	                    var metalrate = Resources.getMetalRate();
	                    var crystalrate = Resources.getCrystalRate();
	                    var deuteriumrate = Resources.getDeuteriumRate();

	                    var total_seconds = metalneeded / metalrate;
	                    total_seconds = (total_seconds > (crystalneeded / crystalrate)) ? total_seconds : crystalneeded / crystalrate;
	                    total_seconds = (total_seconds > (deuteriumneeded / deuteriumrate)) ? total_seconds : deuteriumneeded / deuteriumrate;
	                    total_seconds = total_seconds * 3600 | 0;

	                    str = '<li>' + Options.Labels.lbl_EstimatedBuildTime + ': <span id="possibleInTime2" class="time">' + DateTime.getCountdownTime(total_seconds) + '</span></li>';
	                    $('#action ul').append(str);
	                    total_seconds = total_seconds - 1;
	                    var possibleInTime2 = document.getElementById("possibleInTime2");

	                    var timerid = setInterval(function() {
	                        possibleInTime2.innerHTML = DateTime.getCountdownTime(total_seconds);
	                        if (total_seconds <= 0)
	                            clearInterval(timerid);
	                        total_seconds = total_seconds - 1;
	                    }, 1000);
	                }
	                else {
	                    str = '<li>' + Options.Labels.lbl_EstimatedBuildTime + ': <span id="possibleInTime2" class="time">' + energyneeded + ' ' + Options.Labels.lbl_Energy + '</span></li>';
	                    $('#action ul').append(str);
	                }


	                if (Utils.isCurrentPage('shipyard,defense')) {
	                    var txtparagraph = $('#costs #resources p')[0];

	                    var metal = Resources.getMetal();
	                    var crystal = Resources.getCrystal();
	                    var deuterium = Resources.getDeuterium();

	                    var costmetal = Resources.getCostMetal();
	                    var costcrystal = Resources.getCostCrystal();
	                    var costdeuterium = Resources.getCostDeuterium();

	                    var maxMetal;
	                    var maxCrystal;
	                    var maxDeuterium;
	                    var maxValue = null;

	                    if (costmetal != 0)
	                        maxMetal = metal / costmetal | 0;
	                    else
	                        maxMetal = null;
	                    if (costcrystal != 0)
	                        maxCrystal = crystal / costcrystal | 0;
	                    else
	                        maxCrystal = null;
	                    if (costdeuterium != 0)
	                        maxDeuterium = deuterium / costdeuterium | 0;
	                    else
	                        maxDeuterium = null;


	                    if (maxMetal != null)
	                        maxValue = maxMetal;
	                    if (maxCrystal != null) {
	                        if (maxValue != null)
	                            maxValue = maxValue < maxCrystal ? maxValue : maxCrystal;
	                        else
	                            maxValue = maxCrystal;
	                    }
	                    if (maxDeuterium != null) {
	                        if (maxValue != null)
	                            maxValue = maxValue < maxDeuterium ? maxValue : maxDeuterium;
	                        else
	                            maxValue = maxDeuterium;
	                    }
	                    if ((maxValue != null) && txtparagraph) {
	                        var str2 = '[<a id="maxlink" class="tipsStandard" ' +
	                    'title="' + Options.Labels.lbl_MaximumProductionNumber + '" href="#" onclick="document.forms[\'form\'].menge.value = ' + maxValue + ';">' +
	                    Options.Labels.lbl_Max + ' ' + maxValue + '</a>]';
	                        txtparagraph.innerHTML += str2;
	                    }
	                }
	            }
	            // if at least 1 line was appended - increase size of the container
	            if (str) $('#action ul').css('padding-top', '0');
	        } catch (e) { Utils.log(e) }

	    },

	    Missing_insertCSSRules: function() {
	        Utils.insertCSSRule(
			'#deficient table tr td, #deficient table tr th {\
				padding: 1px;\
				font-size: 11px;\
				color: white;\
				/*font-family: "Arial";*/ \
				}');

	        Utils.insertCSSRule(
			'#deficient {\
				background: transparent url("' + Utils.bg + '") repeat;\
				position: absolute;\
				bottom: 0;\
				right: 0;\
				}\
				');
	    },

	    Resources_insertCSSRules: function() {
	        var width = 151;
	        Utils.insertCSSRule(
			'.antires {\
				margin: 2px !important;\
				padding: 4px !important;\
				display: block;\
				width: ' + width + 'px !important;\
				height: auto !important;\
				float: left !important;\
				background: #0D1014 !important;\
				border: 1px solid #606060 !important;\
				text-align: center !important;\
				font-size: 10px !important;\
				list-style: none outside !important; \
				}');

	        /*				' +	((Options.showResources == 1) ? 'margin-left: -40px;' : '') + ' \ */

	        Utils.insertCSSRule(
			'.finishtime {\
				color: green;\
				}');

	        Utils.insertCSSRule(
			'#links {\
				overflow: visible;\
				}');

	        if (Options.showResources == 2) {
	            Utils.insertCSSRule(
				'#links {\
					position: relative;\
					}');

	            Utils.insertCSSRule(
				'#antires_cont {\
					position: absolute;\
					top: 0; \
					left: -171px; \
					width: ' + (width + 13) + 'px;\
					}');
	        }

	    },

	    Resources_createContainer: function(ul) {
	        /*$('#links').css('position','relative');
	        $('<ul></ul>').attr('id','ttt').appendTo('#links');
	        $('.antires').appendTo('#ttt');
	        $('#ttt').css({'position':'absolute','top':'0','left':'-135px'});
	        */
	        if (Options.showResources == 1) {
	            var box = document.getElementById('box');
	            if (box) box.style.paddingBottom = '0';
	            this.res_container = document.getElementById('menuTable');
	        }
	        else if (Options.showResources == 2) {
	            var links = document.getElementById('links');
	            if (links) {
	                this.res_container = document.createElement('ul');
	                this.res_container.id = 'antires_cont';
	                links.appendChild(this.res_container);
	            }

	        }
	    },

	    Resources_append: function(node) {
	        if (!this.res_container)
	            this.Resources_createContainer();

	        if (this.res_container)
	            this.res_container.appendChild(node);
	    },

	    Resources_Run: function() {
	        if (!document.getElementById('metal_box')) return;
	        this.Resources_insertCSSRules();


	        for (var i = 0; i < this.res_array.length; i++) {
	            var res = this.res_array[i];
	            var ticker_name = 'resourceTicker' + this.res_array_firstcap[i];
	            var ticker_id = 'antires_' + res;

	            var node = document.createElement('li');
	            node.className = 'antires';

	            var html = document.getElementById(res + '_box').title;
	            html = html.replace('|', '');

	            var rx = new RegExp('([\\d\\' + Utils.separator + ']+)\\/', 'gi');

	            html = html.replace(rx, '<span id="' + ticker_id + '">$1</span> / ');
	            node.innerHTML = html;
	            this.Resources_append(node);

	            if (res != 'energy') {
	                var t = Utils.unsafeWindow[ticker_name];
	                var time_to_fill = t.production ? Math.floor((t.limit[1] - t.available) / t.production) : -1;

	                if (time_to_fill > 0) {
	                    node.innerHTML += '<br/><span class="finishtime">' + DateTime.formatDate2(DateTime.getFinishTime(time_to_fill)) + '</span>';
	                }

	                var script = '\
						var newticker = {};\
						newticker.available = oldticker.available;\
						newticker.limit = oldticker.limit;\
						newticker.production = oldticker.production;\
						newticker.valueElem = ticker_id;\
						if (!vacation) new resourceTicker(newticker);\
					';

	                script = script.replace(/oldticker/g, ticker_name);
	                script = script.replace(/newticker/g, ticker_name + '2');
	                script = script.replace(/ticker_id/g, '"' + ticker_id + '"');

	                setTimeout(script, 0);
	            }

	        }
	    }
	}

    var Buildings =
	{
	    Show: function(e) {
	        if (e.target.id != 'content') return;
	        if (Utils.isCurrentPage('resources,station,station-moon,research,shipyard,defense'))
	            Resources.showEstimatedProduction();
	    },


	    Run: function() {

	        document.getElementById('planet').addEventListener(
				'DOMNodeInserted',
				function(e) {
				    setTimeout(function() { Buildings.Show(e) }, 0)
				},
				false);
	    }
	}


    // functions to create simple table like 
    // 		<title>
    // <label:> <value>
    // <label:> <value>

    var SimpleTable =
	{
	    addCell: function(_key, _value, _value_class, _id) {
	        if (typeof (_key) == 'undefined') _key = '';
	        if (typeof (_value) == 'undefined') _value = '';

	        this.data[this.data.length] = { key: _key, value: _value, value_class: _value_class, id: _id, attr: '' };
	        this.lastCell = this.data[this.data.length - 1];
	    },

	    addHref: function(key, value, id) {
	        if (typeof (key) == 'undefined') key = '';
	        if (typeof (value) == 'undefined') value = '';
	        var str = '<a href="javascript:void(0)" id="' + id + '">' + Utils.formatNumber(value) + '</a>';
	        this.addCell(key, str, this.href_class || '', id);
	    },

	    createTableString: function(values_in_row) {
	        function addAttr(attr, value) {
	            return (value ? attr + '="' + value + '" ' : '');
	        }

	        values_in_row = values_in_row || 1;
	        var str = '';
	        for (var i = 0; i < Math.ceil(this.data.length / values_in_row); i++) {
	            str += '<tr>';
	            for (var j = 0; j < values_in_row; j++) {
	                var cell = this.data[i * values_in_row + j];
	                if (!cell) continue;
	                str += '<td ' + addAttr('class', this.key_class) + '>' + (cell.key ? cell.key + ':' : ' ') + '</td>' +
							'<td ' + addAttr('class', cell.value_class || this.value_class) +
									addAttr('id', cell.id) + ' ' + cell.attr + '>' + Utils.formatNumber(cell.value) + '</td>';
	            }

	            str += '</tr>';
	        }
	        str = '<tbody><tr>' +
						'<th class="' + this.title_class + '" colspan="' + values_in_row * 2 + '">' + this.title + '</th>' +
					'</tr>' + str + '</tbody>';
	        return str;
	    },

	    init: function(title, title_class, key_class, value_class) {
	        this.title = title || '';
	        this.title_class = title_class || '';
	        this.key_class = key_class || '';
	        this.value_class = value_class || '';
	        this.data = new Array();
	    }
	};


    try {

        // REMINDER: these objects should be initialized strictly in the following order:
        // Utils, Options, DateTime
        Utils.Init();
        Options.Init();

        // if not ogame page = just init coordinates processing
        if (!Utils.ogame) {
            return;
        }


        // checking whether we have redesign at this server
        if (!Utils.checkRedesign()) return;
        DateTime.Init();
        Ogame.Init();
        if (Utils.isCurrentPage('resources,station,station-moon,research,shipyard,defense'))
            Buildings.Run();

    }
    catch (e) {
        Utils.log(e);
    }

}

if (window.navigator.userAgent.indexOf('Chrome') > -1 && window.google)
    document.location.href = 'javascript:(' + EstimatedTimeFunc + ')();void(0);';
else
    EstimatedTimeFunc();
