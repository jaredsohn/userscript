// ==UserScript==
// @name          Planets.nu alternative resource viewer
// @description   Replacement resource viewer, includes options for colonists, natives, temp
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @version 0.3
// ==/UserScript==


function wrapper () { // wrapper for injection


vgapMap.prototype.drawMineralValue = function (x, y, total, density, mined, color) {
        var density = Math.floor(density / 10 * this.zoom) + 1;
        if (density < 1) density = 1;
        if (total > 0)
            this.drawCircle(x, y, Math.sqrt(total/2) * this.zoom, { stroke: color, "stroke-width": density, "stroke-opacity": "0.5" });
        if (mined > 0)
            this.drawCircle(x, y, Math.sqrt(mined/2) * this.zoom, { stroke: color, "stroke-width": 2, "stroke-opacity": "1" });
    }

vgapMap.prototype.showMolybdenum = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            var total = 0;
            if (planet.groundmolybdenum >= 0)
                total = planet.groundmolybdenum + planet.molybdenum;
            else if (planet.totalmolybdenum >= 0)
                total = planet.totalmolybdenum;            
            this.drawMineralValue(planet.x, planet.y, total, planet.densitymolybdenum, planet.molybdenum, "orange");         
        }
    };
    
vgapMap.prototype.showTritanium = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            var total = 0;
            if (planet.groundtritanium >= 0)
                total = planet.groundtritanium + planet.tritanium;
            else if (planet.totaltritanium >= 0)
                total = planet.totaltritanium;            
            this.drawMineralValue(planet.x, planet.y, total, planet.densitytritanium, planet.tritanium, "skyblue");         
        }
    };

vgapMap.prototype.showDuranium = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            var total = 0;
            if (planet.groundduranium >= 0)
                total = planet.groundduranium + planet.duranium;
            else if (planet.totalduranium >= 0)
                total = planet.totalduranium;            
            this.drawMineralValue(planet.x, planet.y, total, planet.densityduranium, planet.duranium, "pink");         
        }
    };
    
vgapMap.prototype.showNeutronium = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            var total = 0;
            if (planet.groundneutronium >= 0)
                total = planet.groundneutronium + planet.neutronium;
            else if (planet.totalneutronium >= 0)
                total = planet.totalneutronium;            
            this.drawMineralValue(planet.x, planet.y, total, planet.densityneutronium, planet.neutronium, "lightviolet");         
        }
    };
    
vgapMap.prototype.showSupplies = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            var total = planet.factories;
            if (planet.nativetype == 2) //bovinoid
                total += Math.min(planet.clans, planet.nativeclans/100);            
            this.drawMineralValue(planet.x, planet.y, planet.supplies, total/20, 0, "lightgray");         
        }
    };
    
vgapMap.prototype.showTemp = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            var temp = planet.temp;
            if (temp < 0) continue;
            var color = Raphael.rgb(0, 255, 0); //temp 50
            if (temp < 15)
                color = Raphael.rgb(0, 0, 255 - 255*temp/50);
            if (temp >= 15 && temp < 50)
                color = Raphael.rgb(0, 255*temp/50, 255 - 255*temp/50);
            if (temp > 50 && temp <= 84)
                color = Raphael.rgb(255*(temp-50)/50, 255 - 255*(temp-50)/50, 0);
            if (temp > 84)
                color = Raphael.rgb(255*(temp-50)/50, 0, 0);            
            this.drawCircle(planet.x, planet.y, 10 /** this.zoom*/, { stroke: color, "stroke-width": 5, "stroke-opacity": "1" });        
        }
    };
    
vgapMap.prototype.showClans = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            
            var player = vgap.getPlayer(planet.ownerid);
            var raceId = player.raceid;
    
            var colGrowth = 0;
            if ((planet.colonisthappypoints + vgap.colonistTaxChange(planet)) >= 70 && planet.clans > 0) {
    
                var colMax = Math.round(Math.sin(3.14 * (100 - planet.temp) / 100) * 100000);
    
                //crystals like it hot
                if (raceId == 7) {
                    colMax = 1000 * planet.temp;
                    colGrowth = Math.round(((planet.temp / 100) * (planet.clans / 20) * (5 / (planet.colonisttaxrate + 5))));
                    if (vgap.advActive(47))
                        colGrowth = Math.round((((planet.temp * planet.temp) / 4000) * (planet.clans / 20) * (5 / (planet.colonisttaxrate + 5))));
                }
                else if (planet.temp >= 15 && planet.temp <= 84)
                    colGrowth = Math.round(Math.sin(3.14 * ((100 - planet.temp) / 100)) * (planet.clans / 20) * (5 / (planet.colonisttaxrate + 5)));
    
                //slows down over 6,600,000
                if (planet.clans > 66000)
                    colGrowth = Math.round(colGrowth / 2);
    
                //planetoids do not have an atmosphere
                if (planet.debrisdisk > 0)
                    colGrowth = 0;
    
                //check against max
                if ((planet.clans + colGrowth) > colMax)
                    colGrowth = colMax - planet.clans;
    
                //100 and 0 degree planets
                if (colGrowth < 0)
                    colGrowth = 0;
            }
            
            /*
            if (colGrowth == 0)
                colGrowth = this.maxPop(true);
            
            if (planet.nativetype == 5)
                colGrowth -= 5;
            */
            
            this.drawMineralValue(planet.x, planet.y, planet.clans, colGrowth/planet.clans*2000, 0, "cyan");         
        }
    };

vgapMap.prototype.showNatives = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            if (planet.nativeclans <= 0) continue;
            var nativeGrowth = 0;
            var nativeMax = 0;
            if ((planet.nativehappypoints + vgap.nativeTaxChange(planet)) >= 70 && planet.nativeclans > 0 && planet.clans > 0) {
                if (planet.nativetype == 9) {
                    //siliconoid like it hot
                    nativeMax = planet.temp * 1000;
                    nativeGrowth = nativeGrowth + Math.round(((planet.temp / 100) * (planet.nativeclans / 25) * (5 / (planet.nativetaxrate + 5))));
                }
                else {
                    nativeMax = Math.round(Math.sin(3.14 * (100 - planet.temp) / 100) * 150000);
                    nativeGrowth = nativeGrowth + Math.round(Math.sin(3.14 * ((100 - planet.temp) / 100)) * (planet.nativeclans / 25) * (5 / (planet.nativetaxrate + 5)));
                }
                //slows down over 6,600,000
                if (planet.nativeclans > 66000)
                    nativeGrowth = Math.round(nativeGrowth / 2);
    
                //check max
                if (planet.nativeclans > nativeMax)
                    nativeGrowth = 0;
            }
            
            this.drawMineralValue(planet.x, planet.y, planet.nativeclans/10, nativeGrowth/planet.nativeclans*2000, 0, "yellow");
            //this.drawText        (planet.x, planet.y, planet.nativeracename.substring(0, 3));
            var nativeletter = planet.nativeracename.substring(0, 1);
            if (planet.nativetype == 4) nativeletter = "V"; //avian
            if (planet.nativetype == 5) nativeletter = "X"; //amorph
            this.canvas.push(this.paper.text(this.screenX(planet.x), this.screenY(planet.y), nativeletter /*+ "  " + planet.nativegovernment*/).attr({ stroke: "yellow", fill: "yellow", "font-size": (30 + 3*planet.nativegovernment) / (this.zoom < 1 ? 1.5 : 1), "stroke-width": 2, "font-family": "courier" }));
        }
    };
    
vgapMap.prototype.showMegacredits = function () {
        //this.draw();
        for (var i = 0; i < vgap.planets.length; i++) {
            var planet = vgap.planets[i];
            
            var nativetaxrate = planet.nativetaxrate;
            var player = vgap.getPlayer(planet.ownerid);
            if (player != null) {
                if (player.raceid == 6 && nativetaxrate > 20)
                    nativetaxrate = 20;
            }

            var val = Math.round(nativetaxrate * planet.nativegovernment * 20 / 100 * planet.nativeclans / 1000);
    
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
                
            var colTax = Math.round(planet.colonisttaxrate * planet.clans / 1000);
    
            //player tax rate (fed bonus)
            var taxbonus = 1;
            if (vgap.advActive(2)) {
                taxbonus = 2;
               // console.log("fed test");
    
            }
    
            colTax = colTax * taxbonus;
    
            val += colTax;
    
            if (val > 5000)
                val = 5000;
         
            this.drawMineralValue(planet.x, planet.y, planet.megacredits, val/50, 0, "lightgreen");         
        }
    };
    
var oldLoadControls = vgapMap.prototype.loadControls; 
vgapMap.prototype.loadControls = function () {

        oldLoadControls.apply(this, arguments);
        
        var additem = "<li class='ShowMinerals' onclick='vgap.map.showClans();'>Colonists</li>";
        additem +=    "<li class='ShowMinerals' onclick='vgap.map.showNatives();'>Natives</li>";
        additem +=    "<li class='ShowMinerals' onclick='vgap.map.showTemp();'>Temperature</li>";
        
        //$("#MapTools").append(additem);
        $("#MapTools > li:contains('Megacredits')").after(additem);

        var height = this.controls.height() - this.toolsMenu.height();
        this.controls.css("marginTop", "-" + this.controls.height() + "px");

    };    
            
    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script); 