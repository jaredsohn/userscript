// ==UserScript==
// @name          Planets.nu Tax Assistant
// @description   Provides more native tax information, quick links for common tax levels
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.12
// ==/UserScript==

/*------------------------------------------------------------------------------
version 0.5 adds automation
version 0.8 update for .nu V4, don't show table if natives are amporphous
version 0.9 fix for hang in new version, add/improve autotax models
------------------------------------------------------------------------------*/


function wrapper () { // wrapper for injection

vgaPlanets.prototype.setupAddOn = function (addOnName) {
        if (vgaPlanets.prototype.addOns == null) vgaPlanets.prototype.addOns = {};
        vgaPlanets.prototype.addOns[addOnName] = {};
        var settings = localStorage.getItem(addOnName + ".settings");
        if (settings != null)
            vgaPlanets.prototype.addOns[addOnName].settings = JSON.parse(settings);
        else
            vgaPlanets.prototype.addOns[addOnName].settings = {};
        vgaPlanets.prototype.addOns[addOnName].saveSettings = function () {
            localStorage.setItem(addOnName + ".settings", JSON.stringify(vgaPlanets.prototype.addOns[addOnName].settings));
        }
        vgaPlanets.prototype.addOns[addOnName].current = {};
    };
vgaPlanets.prototype.setupAddOn("vgapTaxAssistant");

// Set to -USERSCRIPT_ID to try and prevent note type collisions
vgaPlanets.prototype.addOns.vgapTaxAssistant.notetype = -138637;

// END Add-On Header

// Note Storage/Retrieval functions
vgaPlanets.prototype.saveObjectAsNote = function (id, type, obj) {
        var note = this.getNote(id, type);
        if (note == null)
            note = this.addNote(id, type);
        note.changed = 1;
        note.body = JSON.stringify(obj);
    };
    
vgaPlanets.prototype.getObjectFromNote = function (id, type) {
        var note = this.getNote(id, type);
        if (note != null && note.body != "")
            return JSON.parse(note.body);
        else
            return null;
    };

// End Note Storage/Retrieval functions

vgaPlanets.prototype.addOns.vgapTaxAssistant.ntaxstrats = [
    {id: 1, name: "Beefer Tax", func: "beefertax"},
    {id: 2, name: "Growth Tax", func: "growthtax"},
    {id: 3, name: "Chunk Tax",  func: "chunktax"},
    {id: 4, name: "Helmet Tax", func: "helmettax"}
];

vgaPlanets.prototype.addOns.vgapTaxAssistant.taxModels = {};
vgaPlanets.prototype.popGrowthTime = function (startclans, finishclans, growthpercent) {
        var turns = 0;
        if (startclans <= 66000 && finishclans >= 66000) {
            turns = Math.ceil( Math.log(66000/startclans) / growthpercent );
            startclans = startclans * Math.pow(Math.E, growthpercent * turns);
            growthpercent = growthpercent / 2;
        }
        turns += Math.ceil( Math.log(finishclans/startclans) / growthpercent );
        return turns;
        
    };


vgapPlanetScreen.prototype.showTaxAssistInfo = function () {
        
        var planet = this.planet;
        var html = "";
        
        var colGrowth = this.colPopGrowth();
        if (colGrowth > 0) {
            html = " (" + (colGrowth/planet.clans*100).toFixed(1) + "%)";
            $("#Colony td.head:contains('Colonists')").next().next().append(html);
        }
        
        var colMax = this.maxPop(false);
        /*
        if (vgap.getPlayer(this.planet.ownerid).raceid == 7) {
            //crystal like it hot
            colMax = planet.temp * 1000;
        }
        else {
            colMax = Math.round(Math.sin(3.14 * (100 - planet.temp) / 100) * 100000);
        }
        */
        
        html =  "<tr>";
        html += "<td class='head'>Growth Limit:</td>";
        html += "<td class='val' style='font-size: 10px;'>" + addCommas(colMax*100) + "</td>";
        html += "<td class='valsup'>" + (colGrowth > 0 ? "(" + vgap.popGrowthTime(planet.clans, colMax, colGrowth/planet.clans) + " Turns)" : "") +"</td>";
        html += "</tr>";
        $("#Colony td.head:contains('Colonists')").parent().after(html);        
        
        if (planet.nativeclans <= 0) return;
        
        var nativeGrowth = this.nativePopGrowth();
        if (nativeGrowth > 0) {
            html = " (" + (nativeGrowth/planet.nativeclans*100).toFixed(1) + "%)";
            $("#Colony td.head:contains('Population')").next().next().append(html);
        }
        
        if (planet.nativetype == 9) {
            //siliconoid like it hot
            nativeMax = planet.temp * 1000;
        }
        else {
            nativeMax = Math.round(Math.sin(3.14 * (100 - planet.temp) / 100) * 150000);
        }
        
        html =  "<tr>";
        html += "<td class='head'>Growth Limit:</td>";
        html += "<td class='val' style='font-size: 10px;'>" + addCommas(nativeMax*100) + "</td>";
        html += "<td class='valsup'>" + (nativeGrowth > 0 ? "(" + vgap.popGrowthTime(planet.nativeclans, nativeMax, nativeGrowth/planet.nativeclans) + " Turns)" : "") +"</td>";
        html += "</tr>";
        $("#Colony td.head:contains('Population')").parent().after(html);
        
        if (planet.nativetype == 5) return;
        
        //Autotax
        html =  "<div> AutoTax Model: <select id='TaxModelSelect' onchange='vgap.addOns.vgapTaxAssistant.setNativeAutoTax(vgap.getPlanet(" + planet.id + "), parseInt($(\"#TaxModelSelect\").val()));'>";
        html += "<option value='-1' " + (current == null ? "selected" : "") +">None</option>";
        
        var current = vgap.addOns.vgapTaxAssistant.getNativeAutoTax(planet);
        var strats = vgap.addOns.vgapTaxAssistant.ntaxstrats;
        for (var i=0; i<strats.length; i++) {
            var strat = strats[i];
            html += "<option value='" + strat.id + "' " + (current == strat.id ? "selected" : "") +">" + strat.name + "</option>";
        }
        html += "</select><a onclick='vgap.addOns.vgapTaxAssistant.applyAutoTaxModel(" + planet.id + ");vgap.planetScreen.reloadColony();return true;'>Apply</a></div>";
        
        //Tax Table
        html += "<table width='100%'>";
        html += "<tr><th align='left'>Rate</th><th align='right'>MC</th><th align='left'>(poss)</th><th align='right'>Hap</th><th align='left'>(chng)</th><th align='left'>Growth</th></tr>";
        taxlinks = [];
        taxlinks[0] = vgap.getNativeTaxScenario(planet, 0);
        taxlinks[1] = vgap.getNativeTaxScenario(planet, 1);
        taxlinks.push( vgap.getNativeTaxForHappyChange(planet, 0) );
        taxlinks.push( vgap.getNativeTaxForHappyChange(planet, -(taxlinks[0].happinesschange)) );
        if (planet.nativehappypoints >= 70) 
            taxlinks.push( vgap.getNativeTaxForHappyChange(planet, 70 - planet.nativehappypoints) );
        var chunk = 70 - taxlinks[0].happinesschange;
        if (planet.nativehappypoints >= chunk) 
            taxlinks.push( vgap.getNativeTaxForHappyChange(planet, chunk - planet.nativehappypoints) );        
        taxlinks.push(vgap.getNativeTaxScenario(planet, planet.nativetaxrate));
        
        val = planet.clans;

        //player tax rate (fed bonus)
        var taxbonus = 1;
        if (vgap.advActive(2))
            taxbonus = 2;
        val = val * taxbonus;

        //insectoid bonus
        if (planet.nativetype == 6)
            val = val * 2;

        if (val > 5000)
            val = 5000;
        maxincome = vgap.getNativeTaxForIncome(planet, val);
        if (maxincome.taxrate > 100) {
            taxlinks.push(vgap.getNativeTaxScenario(planet, 100));
        }
        else {
            taxlinks.push(maxincome);
            if (maxincome.megacredits != maxincome.mcpossible)
                taxlinks.push(vgap.getNativeTaxScenario(planet, maxincome.taxrate-1));
        }
        //taxlinks.push( vgap.getNativeTaxForIncome(planet, 5000) );
        //taxlinks.push( vgap.getNativeTaxForHappyChange(planet, 40 - planet.nativehappypoints) );
        
        taxlinks.sort( function(a, b) {return a.taxrate - b.taxrate;} );
        
        console.log(taxlinks);
        
        for (i=taxlinks.length-1; i>0; i--) {
            if (taxlinks[i].taxrate == taxlinks[i-1].taxrate) {
                taxlinks.splice(i, 1);
            }
        }
        
        for (i=0; i<taxlinks.length; i++) {
            r = taxlinks[i];
            html += "<tr onclick='vgap.planetScreen.setNativeTax(" + r.taxrate + ");'" + (r.nativegrowth <= 0 ? " style='background-color: yellow;'" : "") + ">";
            html += "<td>" + r.taxrate + "%" + (r.taxrate == planet.nativetaxrate ? "    -+-" : "") + "</td>";
            html += "<td align='right'>" + r.megacredits + "</td>";
            html += "<td>" + ( (r.megacredits != r.mcpossible) ? "(" + r.mcpossible + ")" : "" ) + "</td>";
            html += "<td align='right'>" + r.newhappiness + "</td>";
            html += "<td>(" + r.happinesschange + ")</td>";
            html += "<td>" + r.nativegrowthpercent.toFixed(2) + "%</td>";
            html += "</tr>";
        }
        html += "</table>";
        $("#Colony").append(html);
        
        
        /*
        this.colony.empty();
        var planet = this.planet;

        var max = this.maxPop(false);
        var colPop = "";
        if (max < 10000)
            colPop = "/" + addCommas(max * 100);

        var growth = this.colPopGrowth();
        if (growth != 0)
            colPop += " " + this.changeText(growth * 100);

        var colonists = addCommas(planet.clans * 100);
        if (growth < 0)
            colonists = "<span class='BadText'>" + colonists + "</span>";
        else if (planet.clans > max)
            colonists = "<span class='WarnText'>" + colonists + "</span>";

        //<tr><td class='head'>Happiness:</td><td class='val'>" + planet.colonisthappypoints + "</td><td class='valsup'>(down 1)</td></tr>
        if (planet.clans > 0) {
            $("<table width='100%'><tr><td class='colpic'><img src='http://library.vgaplanets.nu/races/1.jpg'/></td><td><table width='100%'><tr><td class='head'  style='cursor:pointer' onclick='assist.showtopic(\"colonists\");'>Colonists:</td><td class='val'>" + colonists + "</td><td class='valsup'>" + colPop + "</td></tr><tr><td class='head' style='cursor:pointer' onclick='assist.showtopic(\"tax\");'>Tax Rate:</td><td class='val'>" + planet.colonisttaxrate + "%</td><td class='valsup'>" + this.mcText(this.colonistTaxAmount()) + "</td></tr><tr><td class='head'>Happiness:</td><td class='val'>" + planet.colonisthappypoints + "</td><td class='valsup'>" + this.taxChangeText(vgap.colonistTaxChange(this.planet)) + "</td></tr></table><div class='SepSummary'>" + this.happyText("Colonists are", this.planet.colonisthappypoints) + "</div></td></tr></table>").appendTo("#Colony");
        }
        //<tr><td class='head'>Happiness:</td><td class='val'>" + planet.nativehappypoints + "</td></tr>
        if (planet.nativeclans > 0) {
            $("<table width='100%'>
            <tr><td class='colpic'><img src='http://library.vgaplanets.nu/natives/" + planet.nativetype + ".gif'/></td><td><table width='100%'>
            <tr><td class='head'  style='cursor:pointer' onclick='assist.showtopic(\"native races\");'>Native Race:</td><td colspan='2' >" + "<font style='cursor:pointer' onclick='assist.showtopic(\"" + planet.nativeracename.toLowerCase() + "\");'>" + planet.nativeracename + "</font>" + " - " + planet.nativegovernmentname + "</td></tr>
            <tr><td class='head'  style='cursor:pointer' onclick='assist.showtopic(\"tax\");'>Population:</td><td class='val'>" + addCommas(planet.nativeclans * 100) + "</td><td class='valsup'>" + this.changeText(this.nativePopGrowth() * 100) + "</td></tr>
            <tr><td class='head'  style='cursor:pointer' onclick='assist.showtopic(\"tax\");'>Tax Rate:</td><td class='val'>" + planet.nativetaxrate + "%</td><td class='valsup'>" + this.mcText(this.nativeTaxAmount()) + "</td></tr>
            <tr><td class='head'>Happiness:</td><td class='val'>" + planet.nativehappypoints + "</td><td class='valsup'>" + this.taxChangeText(vgap.nativeTaxChange(this.planet)) + "</td></tr></table><div class='SepSummary'>" + this.happyText("Natives are", this.planet.nativehappypoints) + "</div></td> </tr></table>").appendTo("#Colony");
        }


        // vgap.action added for the assistant (Alex):
        //    vgap.action();
        */
    };


if (vgap.version < 3) {
    
    vgaPlanets.prototype.addOns.vgapTaxAssistant.old_loadColony = vgapPlanetScreen.prototype.loadColony; 
    vgapPlanetScreen.prototype.loadColony = function () {
    
            vgaPlanets.prototype.addOns.vgapTaxAssistant.old_loadColony.apply(this, arguments);
            vgap.planetScreen.showTaxAssistInfo();
            
    }
}
else {

    vgaPlanets.prototype.addOns.vgapTaxAssistant.old_load = vgapPlanetScreen.prototype.load; 
    vgapPlanetScreen.prototype.load = function (planet) {
    
            vgaPlanets.prototype.addOns.vgapTaxAssistant.old_load.apply(this, arguments);
            vgap.planetScreen.showTaxAssistInfo();
            
    }

/*
    var plugin = {};
    plugin.loadplanet = function() {
        vgap.planetscreen.showTaxAssistInfo();
    }
    vgap.plugins.push(plugin);
*/
}
    
vgaPlanets.prototype.getNativeTaxScenario = function(planet, taxrate) {
        var result = {};
        result.taxrate = taxrate;
        
        /////////////////////////////////
        var nativetaxrate = taxrate;
        var player = vgap.getPlayer(planet.ownerid);
        
        //cyborg max 20%
        if (player != null) {
            if (player.raceid == 6 && nativetaxrate > 20)
                nativetaxrate = 20;
        }

        var val = Math.round(nativetaxrate * planet.nativegovernment * 20 / 100 * planet.nativeclans / 1000);
        var val_poss = val;
        if (val > planet.clans)
            val = planet.clans;

        //player tax rate (fed bonus)
        var taxbonus = 1;
        if (vgap.advActive(2))
            taxbonus = 2;
        val = val * taxbonus;

        //insectoid bonus
        if (planet.nativetype == 6)
            val = val * 2;

        if (val > 5000)
            val = 5000;

        result.megacredits = val;
        
        if (val_poss <= planet.clans) {
            result.mcpossible = result.megacredits;
        }
        else {
            val = val_poss;

            //player tax rate (fed bonus)
            var taxbonus = 1;
            if (vgap.advActive(2))
                taxbonus = 2;
            val = val * taxbonus;
    
            //insectoid bonus
            if (planet.nativetype == 6)
                val = val * 2;
    
            if (val > 5000)
                val = 5000;
    
            result.mcpossible = val;
        }
        
        /////////////////////////////////
		//Hiss
		var change=0;
		var ships = vgap.shipsAt(planet.x, planet.y);
        for (var i = 0; i < ships.length; i++) {
            if (ships[i].ownerid!=2 || ( ships[i].ownerid!=vgap.player.id && !ships[i].allyupdate ) || ships[i].mission != 8) continue;
			change+=5;
		}
		change = Math.min(change, 100-planet.nativehappypoints);
		//End Hiss
		
        change += Math.truncate((1000 - Math.sqrt(planet.nativeclans) - (taxrate * 85) - Math.truncate((planet.factories + planet.mines) / 2) - (50 * (10 - planet.nativegovernment))) / 100);

        if (planet.nativetype == 4) //avian
            change += 10;

        if (vgap.getNebulaIntensity(planet.x, planet.y) >= 80) //50ly visibility
            change += 5;

        // vgap.action added for the assistant (Alex):
        //      vgap.action();

        result.happinesschange = change;
        result.newhappiness = planet.nativehappypoints + change;
        if (result.newhappiness > 100) result.newhappiness = 100;
        
        /////////////////////////////////
        var nativeGrowth = 0;
        var nativeMax = 0;
        if (result.newhappiness >= 70 && planet.nativeclans > 0 && planet.clans > 0) {
            if (planet.nativetype == 9) {
                //siliconoid like it hot
                nativeMax = planet.temp * 1000;
                nativeGrowth = nativeGrowth + Math.round(((planet.temp / 100) * (planet.nativeclans / 25) * (5 / (taxrate + 5))));
            }
            else {
                nativeMax = Math.round(Math.sin(3.14 * (100 - planet.temp) / 100) * 150000);
                nativeGrowth = nativeGrowth + Math.round(Math.sin(3.14 * ((100 - planet.temp) / 100)) * (planet.nativeclans / 25) * (5 / (taxrate + 5)));
            }
            //slows down over 6,600,000
            if (planet.nativeclans > 66000)
                nativeGrowth = Math.round(nativeGrowth / 2);

            //check max
            if (planet.nativeclans > nativeMax)
                nativeGrowth = 0;

        }
        result.nativegrowth = nativeGrowth;
        result.nativegrowthpercent = nativeGrowth / planet.nativeclans * 100;

        return result;
    };

vgaPlanets.prototype.getNativeTaxForHappyChange = function(planet, happychange) {        
        if (planet.nativetype == 4) //avian
            happychange -= 10;

        if (vgap.getNebulaIntensity(planet.x, planet.y) >= 80) //50ly visibility
            happychange -= 5;
            
        tr = -((happychange * 100) - 1000 + Math.sqrt(planet.nativeclans) + Math.truncate((planet.factories + planet.mines) / 2) + (50 * (10 - planet.nativegovernment))) / 85;
        tl = vgap.getNativeTaxScenario(planet, Math.ceil(tr));
        th = vgap.getNativeTaxScenario(planet, Math.ceil(tr)+1);
        
        if (th.happinesschange == happychange)
            return th;
        else
            return tl;
    };
    
vgaPlanets.prototype.getNativeTaxForIncome = function(planet, income) {
    
        var taxbonus = 1;
        if (vgap.advActive(2))
            taxbonus = 2;
        income /= taxbonus;

        //insectoid bonus
        if (planet.nativetype == 6)
            income /= 2;
            
        tr = income / (planet.nativeclans / 100) / (planet.nativegovernment / 5) * 10;
        tl = vgap.getNativeTaxScenario(planet, Math.ceil(tr));
        th = vgap.getNativeTaxScenario(planet, Math.ceil(tr)+1);
        
        return tl;
    };
    
vgapPlanetScreen.prototype.setNativeTax = function(taxrate) {

        this.planet.nativetaxrate = taxrate;

        this.reloadColony();

        this.planet.nativehappychange = vgap.nativeTaxChange(this.planet);

    };
    
vgapPlanetScreen.prototype.reloadColony = function() {
        if (vgap.version < 3) this.loadColony();
        else this.load(this.planet);        
    };
    
var old_processLoad = vgaPlanets.prototype.processLoad;
vgaPlanets.prototype.processLoad = function(result) {
        old_processLoad.apply(this, arguments);
        if (!result.success) return;
        
        var config = vgap.getObjectFromNote(0, vgap.addOns.vgapTaxAssistant.notetype);
        if (config == null) config = {planets: []};
        vgap.addOns.vgapTaxAssistant.config = config;
        vgap.addOns.vgapTaxAssistant.autotaxrunning = false;
        vgap.addOns.vgapTaxAssistant.updateAutoTaxWidget();        
        if (config.turn == null || config.turn != vgap.game.turn) {
            // Autotax not marked as run this turn, so do so
            // vgap.addOns.vgapTaxAssistant.runAutoTax();
        }
    };
        
vgaPlanets.prototype.addOns.vgapTaxAssistant.runAutoTax = function () {
        var ta = vgap.addOns.vgapTaxAssistant;
        ta.autotaxrunning = true;
        ta.autotaxindex = 0;
        ta.runNextAutoTax();
        
    };
    

vgaPlanets.prototype.addOns.vgapTaxAssistant.runNextAutoTax = function () {       
        
        var ta = vgap.addOns.vgapTaxAssistant;
        var planets = ta.config.planets;
        if (!ta.autotaxrunning) return;
        if (ta.autotaxindex >= planets.length) {
            ta.autotaxrunning = false;
            ta.config.turn = vgap.game.turn;
            vgap.saveObjectAsNote(0, ta.notetype, ta.config);
            ta.updateAutoTaxWidget();
			vgap.save();
            return;
        }
        
        //else
        console.log(vgap.addOns.vgapTaxAssistant.autotaxindex);
        var id = planets[ta.autotaxindex].id;
        ta.updateAutoTaxWidget();
        ta.applyAutoTaxModel(id);
        ta.autotaxindex++;
        if (vgap.getPlanet(id).changed > 0) {
            vgap.save();
        } else {
            ta.runNextAutoTax();
        }

    };
    
vgaPlanets.prototype.addOns.vgapTaxAssistant.applyAutoTaxModel = function (planetid) {
        var ta = vgap.addOns.vgapTaxAssistant;
        var cplanets = ta.config.planets;
        var config = vgap.getArray(cplanets, planetid);
        if (config == null) return; // No tax model set, nothing to do.
        var planet = vgap.getPlanet(planetid);
        if (planet.ownerid != vgap.player.id) // Not one of my planets, remove from config
            ta.setNativeAutoTax(planet, null);
        else {
            var oldtax = planet.nativetaxrate;
            planet.nativetaxrate = ta.taxModels[vgap.getArray(ta.ntaxstrats, config.n).func](planet); // 1 ugly line
            if (oldtax != planet.nativetaxrate) {
                planet.nativehappychange = vgap.nativeTaxChange(planet);
                planet.changed = 1;
            }
        }   
            
        
    };
  
var old_processSave = vgaPlanets.prototype.processSave;  
vgaPlanets.prototype.processSave = function (result) {
        old_processSave.apply(this, arguments);
        if (!result.success) return;
        
        if (vgap.addOns.vgapTaxAssistant.autotaxrunning) {
            vgap.addOns.vgapTaxAssistant.runNextAutoTax();
        }
    };
    
vgaPlanets.prototype.addOns.vgapTaxAssistant.setNativeAutoTax = function (planet, stratid) {
        var planets = vgap.addOns.vgapTaxAssistant.config.planets;
        if (stratid == null || stratid < 0) {
            for (var i = 0; i < planets.length; i++) {
                if (planets[i].id == planet.id) planets.splice(i, 1);
            }
        }
        else {
            var cplan = vgap.getArray(planets, planet.id);
            if (cplan == null) {
                planets.push( {id: planet.id, n: stratid} );
            }
            else {
                cplan.n = stratid;
            }
        }
        vgap.saveObjectAsNote(0, vgap.addOns.vgapTaxAssistant.notetype, vgap.addOns.vgapTaxAssistant.config);
        vgap.addOns.vgapTaxAssistant.updateAutoTaxWidget();
    };
    
vgaPlanets.prototype.addOns.vgapTaxAssistant.getNativeAutoTax = function (planet) {
        var cplan = vgap.getArray(vgap.addOns.vgapTaxAssistant.config.planets, planet.id);
        if (cplan == null) {
            return null;
        }
        else {
            return cplan.n;
        }

    };
    
var old_summary = vgapDashboard.prototype.summary;
vgapDashboard.prototype.summary = function () {
        old_summary.apply(this, arguments);
        
        var ta = vgap.addOns.vgapTaxAssistant;       
        var html = "<li><div id='AutoTaxUpdate'></div></li>";
        $("#TurnSummary ul").append(html);
        ta.updateAutoTaxWidget();
        
    };
    
vgaPlanets.prototype.addOns.vgapTaxAssistant.updateAutoTaxWidget = function () {
        $("#AutoTaxUpdate").empty();
        var ta = vgap.addOns.vgapTaxAssistant; 
        var html = "<table>";
        html += "<tr><td colspan='2'>AUTO TAX STATUS</td></tr>";
        if (ta.config) {
            if (ta.autotaxrunning) {
                html += "<tr><td colspan='2'>*** RUNNING ***</td></tr>";
                var planet = vgap.getPlanet(ta.config.planets[ta.autotaxindex].id);
                html += "<tr><td colspan='2'>" + planet.id + ": " + planet.name + "</td></tr>";
            }
            else {
                html += "<tr><td>Planets set: </td><td>" + ta.config.planets.length + "</td></tr>";
                if (ta.config.turn != null && ta.config.turn == vgap.game.turn)
                    html += "<tr><td colspan='2'>Has run this turn.</td></tr>";
                else
                    html += "<tr><td colspan='2'>Has NOT run this turn.</td></tr>";
                if (ta.config.planets.length > 0)
                    html += "<tr><td colspan='2'><button onclick='vgap.addOns.vgapTaxAssistant.runAutoTax();'> RUN NOW </td></tr>";
            }
        }
        html += "</table>";
        $("#AutoTaxUpdate").append(html);
        
    };
    
vgaPlanets.prototype.getNativeGrowthLimit = function (planet) {
        var nativeMax=0;
    	if (planet.nativetype == 9) {
                //siliconoid like it hot
                nativeMax = planet.temp * 1000;
            }
            else {
                nativeMax = Math.round(Math.sin(3.14 * (100 - planet.temp) / 100) * 150000);
            }
        return nativeMax;

    };    
    
vgaPlanets.prototype.getMaxNativesScenario = function (planet, prefergrowth) {
        if (planet.nativeclans < vgap.getNativeGrowthLimit(planet)) return null;
        if (planet.nativetype == 5) return (vgap.getNativeTaxScenario(planet, 0));
        
        var maxincome = vgap.getMaxIncomeScenario(planet, prefergrowth);
        if (maxincome.taxrate == 0) maxincome = vgap.getNativeTaxScenario(planet, 1);
        if (maxincome.newhappiness >= 40) {
            return maxincome;
        }
            return vgap.getNativeTaxForHappyChange(planet, 40 - planet.nativehappypoints);
      
    };
    
vgaPlanets.prototype.getMaxIncome = function (planet) {
        val = planet.clans;

        //player tax rate (fed bonus)
        var taxbonus = 1;
        if (vgap.advActive(2))
            taxbonus = 2;
        val = val * taxbonus;

        //insectoid bonus
        if (planet.nativetype == 6)
            val = val * 2;

        if (val > 5000)
            val = 5000;
            
        return val;
    };
    

    
vgaPlanets.prototype.getMaxIncomeScenario = function (planet, prefergrowth) {
        // see how much money we could possibly get      
        var maxincome = vgap.getNativeTaxForIncome(planet, vgap.getMaxIncome(planet));
        // if maxincome requires tax rate over 100%, it's impossible so go with 100% instead
        if (maxincome.taxrate > 100) {
            maxincome = vgap.getNativeTaxScenario(planet, 100);
        }
        if (vgap.getPlayer(planet.ownerid).raceid == 6 && maxincome.taxrate > 20) {
            maxincome = vgap.getNativeTaxScenario(planet, 20);
        }
        
        // if maxincome is being limited by number of clans, bump taxrate down 1 for better growth (if prefergrowth true)
        if (maxincome.megacredits != maxincome.mcpossible && prefergrowth) {
            maxincome = vgap.getNativeTaxScenario(planet, maxincome.taxrate-1);
        }
        return maxincome;

    };
    
vgapPlanetScreen.prototype.getSuppliesToSurvive =  function () {
        var player = vgap.getPlayer(this.planet.ownerid);
        var raceId = player.raceid;
        var planet = this.planet;
        var climateDeathRate = 10;
        var maxSupported = 0;
        var colGrowth = 0;

        //crystal calculation
        if (raceId == 7)
            maxSupported = planet.temp * 1000;
        else {
            //all others
            maxSupported = Math.round(Math.sin(3.14 * (100 - planet.temp) / 100) * 100000);
            if (planet.temp > 84)
                maxSupported = Math.floor((20099.9 - (200 * planet.temp)) / climateDeathRate);
            else if (planet.temp < 15)
                maxSupported = Math.floor((299.9 + (200 * planet.temp)) / climateDeathRate);
        }

        //Fascist, Robots, Rebels, Colonies can support a small colony of 60 clans on planets over 80 degrees
        if (raceId == 4 || raceId == 9 || raceId == 10 || raceId == 11) {
            if (planet.temp > 80)
                maxSupported = Math.max(maxSupported, 60);
        }

        //rebel arctic planet advantage
        if (planet.temp <= 19 && raceId == 10)
            maxSupported = Math.max(maxSupported, 90000);

        //planetoids do not have an atmosphere
        if (planet.debrisdisk > 0) {
            maxSupported = 0;
            if (vgap.getStarbase(planet.id) != null)
                maxSupported = 500;
        }

        //determine how much we are overpopulated
        var overPopulation = Math.ceil((planet.clans - maxSupported) * (climateDeathRate / 100));
        if (overPopulation > 0) {
            //recalculate maxsupported/overpopulation
            maxSupported = maxSupported + Math.round(planet.supplies * 10 / 40);
            overPopulation = Math.ceil((planet.clans - maxSupported) * (climateDeathRate / 100));

            //update population
            colGrowth = -1 * Math.max(0, overPopulation);
        }
        return colGrowth;
    };
    
    
// AUTO TAX MODELS
    
vgaPlanets.prototype.addOns.vgapTaxAssistant.taxModels.beefertax = function (planet) {
      
        // Check for natives at growth limit or amporhous
        var maxnatives = vgap.getMaxNativesScenario(planet, true);
        if (maxnatives != null) return maxnatives.taxrate;
      
        // if at or below 70 happiness, stop taxing
        if (planet.nativehappypoints <= 70) {
            return 0;
        }      

        // if not, see how much money we could possibly get      
        var maxincome = vgap.getMaxIncomeScenario(planet, true);
 
        
        // if you can get it all without going below 70 happiness, do so
        if (maxincome.newhappiness >= 70) {
            return maxincome.taxrate;
        }
        
        //if not, tax down to 70
            return vgap.getNativeTaxForHappyChange(planet, 70 - planet.nativehappypoints).taxrate;
        
    };
    
vgaPlanets.prototype.addOns.vgapTaxAssistant.taxModels.growthtax = function (planet) {
      
        // Check for natives at growth limit or amporhous
        var maxnatives = vgap.getMaxNativesScenario(planet, true);
        if (maxnatives != null) return maxnatives.taxrate;      
      
        // if new happiness with 0% is <= 100, don't tax
        var maxgrowth = vgap.getNativeTaxScenario(planet, 0);
        if (planet.nativehappypoints + maxgrowth.happinesschange <= 100 || planet.nativetype == 5) {
            return 0;
        }      

        // if not, see how much money we could possibly get      
        var maxincome = vgap.getMaxIncomeScenario(planet, true);
        
        // if you can get it all without going below 70 happiness, do so
        if (maxincome.newhappiness >= 70) {
            return maxincome.taxrate;
        }
        
        //if not, tax down to 70
            return vgap.getNativeTaxForHappyChange(planet, 70 - planet.nativehappypoints).taxrate;
        
    };
    
vgaPlanets.prototype.addOns.vgapTaxAssistant.taxModels.chunktax = function (planet) {
      
        // Check for natives at growth limit or amporhous
        var maxnatives = vgap.getMaxNativesScenario(planet, true);
        if (maxnatives != null) return maxnatives.taxrate;      
      
        // if new happiness with 0% is <= 100, don't tax
        var maxgrowth = vgap.getNativeTaxScenario(planet, 0);
        if (planet.nativehappypoints + maxgrowth.happinesschange <= 100 || planet.nativetype == 5) {
            return 0;
        }      

        // if not, see how much money we could possibly get      
        var maxincome = vgap.getMaxIncomeScenario(planet, true);
        
        // if you can get it all without going below chunk level, do so
        var chunk = 70 - maxgrowth.happinesschange;
        if (maxincome.newhappiness >= chunk) {
            return maxincome.taxrate;
        }
        
        //if not, tax down to chunk level
            return vgap.getNativeTaxForHappyChange(planet, chunk - planet.nativehappypoints).taxrate;
        
    };
    
vgaPlanets.prototype.addOns.vgapTaxAssistant.taxModels.helmettax = function (planet) {
 
      
        // Check for natives at growth limit or amporhous
        var maxnatives = vgap.getMaxNativesScenario(planet, false);
        if (maxnatives != null) return maxnatives.taxrate;      
      
        // if at or below 70 happiness, stop taxing
        if (planet.nativehappypoints <= 70) {
            return 0;
        }      

        // if not, see how much money we could possibly get      
        var maxincome = vgap.getMaxIncomeScenario(planet, false);
        
        // if you can get it all without going below 70 happiness, do so
        if (maxincome.newhappiness >= 70) {
            return maxincome.taxrate;
        }
        
        //if not, tax down to 70
            return vgap.getNativeTaxForHappyChange(planet, 70 - planet.nativehappypoints).taxrate;

};
    
    
//
}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);
