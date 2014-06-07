// ==UserScript==
// @name          Planets.nu ship templates
// @description   Adds saving to and building from ship templates
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @version 0.4
// ==/UserScript==

/*------------------------------------------------------------------------------
 1. When at the Ship Assembly screen is displayed, if there is a hull selected,
    show a "Save Template" button. When selected, Save the currently ship config
    as a templatte.
 2. If no hull is selected, display the list of available templates. Options to
    build (if mineral/tech requirements met) or delete template. Highlights
    deficiencies if unable to build.
 3. (ver 0.3) Adds planet cash/minerals to display, tweaks formatting.
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
vgaPlanets.prototype.setupAddOn("vgapShipTemplates");

// Set to -USERSCRIPT_ID to try and prevent note type collisions
vgaPlanets.prototype.addOns.vgapShipTemplates.notetype = -133678;

vgaPlanets.prototype.addOns.vgapShipTemplates.saveTemplate = function () {
        var src = vgap.starbaseScreen.starbase;
        //console.log(src);
        trg = {};
        trg.buildhullid = src.buildhullid;
        trg.buildengineid = src.buildengineid;
        trg.buildbeamcount = src.buildbeamcount;
        trg.buildbeamid = src.buildbeamid;
        trg.buildtorpcount = src.buildtorpcount;
        trg.buildtorpedoid = src.buildtorpedoid;
        
        var hull = vgap.getHull(trg.buildhullid);
        var engine = vgap.getEngine(trg.buildengineid);
        var beam = vgap.getBeam(trg.buildbeamid);
        var torpedo = vgap.getTorpedo(trg.buildtorpedoid);
        trg.cost = hull.cost + (hull.engines * (engine != null ? engine.cost : 0)) + (trg.buildbeamcount * (beam != null ? beam.cost : 0))+ (trg.buildtorpcount * (torpedo != null ? torpedo.launchercost : 0));
        trg.duranium = hull.duranium + (hull.engines * (engine != null ? engine.duranium : 0)) + (trg.buildbeamcount * (beam != null ? beam.duranium : 0))+ (trg.buildtorpcount * (torpedo != null ? torpedo.duranium : 0));
        trg.tritanium = hull.tritanium + (hull.engines * (engine != null ? engine.tritanium : 0)) + (trg.buildbeamcount * (beam != null ? beam.tritanium : 0))+ (trg.buildtorpcount * (torpedo != null ? torpedo.tritanium : 0));
        trg.molybdenum = hull.molybdenum + (hull.engines * (engine != null ? engine.molybdenum : 0)) + (trg.buildbeamcount * (beam != null ? beam.molybdenum : 0))+ (trg.buildtorpcount * (torpedo != null ? torpedo.molybdenum : 0));
        console.log(trg);
        vgap.addOns.vgapShipTemplates.templates.push(trg);
        vgap.saveObjectAsNote(0, vgap.addOns.vgapShipTemplates.notetype, vgap.addOns.vgapShipTemplates.templates);
        $("#SaveTemplate").hide();
    };

vgaPlanets.prototype.addOns.vgapShipTemplates.deleteTemplate = function (index) {
        vgap.addOns.vgapShipTemplates.templates.splice(index, 1);
        vgap.saveObjectAsNote(0, vgap.addOns.vgapShipTemplates.notetype, vgap.addOns.vgapShipTemplates.templates);
    };
    
vgaPlanets.prototype.addOns.vgapShipTemplates.buildFromTemplate = function (index) {
        var template = vgap.addOns.vgapShipTemplates.templates[index];
        var hull = vgap.getHull(template.buildhullid);
        vgap.starbaseScreen.buyHull(1, template.buildhullid);
        if (template.buildengineid > 0)
            vgap.starbaseScreen.buyEngine(hull.engines, template.buildengineid);
        if (template.buildbeamcount > 0)
            vgap.starbaseScreen.buyBeam(template.buildbeamcount, template.buildbeamid);
        if (template.buildtorpcount > 0)
            vgap.starbaseScreen.buyLauncher(template.buildtorpcount, template.buildtorpedoid);
            
        var src = template;
        var trg = vgap.starbaseScreen.starbase;
        trg.buildhullid = src.buildhullid;
        trg.buildengineid = src.buildengineid;
        trg.buildbeamcount = src.buildbeamcount;
        trg.buildbeamid = src.buildbeamid;
        trg.buildtorpcount = src.buildtorpcount;
        trg.buildtorpedoid = src.buildtorpedoid;
        
        vgap.starbaseScreen.showAssembly();
        $("#SaveTemplate").hide();
        
    };

vgaPlanets.prototype.saveObjectAsNote = function (id, type, obj) {
        var note = this.getNote(id, type);
        if (note == null)
            note = this.addNote(id, type);
        note.changed = 1;
        note.body = JSON.stringify(obj);
    };
    
vgaPlanets.prototype.getObjectFromNote = function (id, type) {
        var note = this.getNote(id, type);
        if (note != null)
            return JSON.parse(note.body);
        else
            return null;
    };
    

var old_processLoad = vgaPlanets.prototype.processLoad; 
vgaPlanets.prototype.processLoad = function (result) {

        old_processLoad.apply(this, arguments);
        
        if (result.success) {
            var templates = this.getObjectFromNote(0, vgap.addOns.vgapShipTemplates.notetype);
            if (templates == null)
                templates = [];
            this.addOns.vgapShipTemplates.templates = templates;
        }        
    };

var old_showAssembly = vgapStarbaseScreen.prototype.showAssembly;
vgapStarbaseScreen.prototype.showAssembly = function () {

        old_showAssembly.apply(this, arguments);
        
        var starbase = this.starbase;
        if (starbase.buildhullid > 0) {
            var html = "<div id='SaveTemplate' class='MoreActionButton' onclick='vgap.addOns.vgapShipTemplates.saveTemplate();'>Save Template</div>";
            $("#AssemblyBack").after(html);
        }
        else{
            var templist = "<div id='TemplateList'><table class='CleanTable'>";
            for (i=0; i<vgap.addOns.vgapShipTemplates.templates.length; i++) {
                var template = vgap.addOns.vgapShipTemplates.templates[i];
                var hull = vgap.getHull(template.buildhullid);
                var engine = vgap.getEngine(template.buildengineid);
                var beam = vgap.getBeam(template.buildbeamid);
                var torpedo = vgap.getTorpedo(template.buildtorpedoid);
                var planet = vgap.getPlanet(starbase.planetid);
                var ok_cost = planet.megacredits >= template.cost;
                var ok_duranium = planet.duranium >= template.duranium;
                var ok_tritanium = planet.tritanium >= template.tritanium;
                var ok_molybdenum = planet.molybdenum >= template.molybdenum;
                var ok_techhull = (starbase.hulltechlevel >= hull.techlevel);
                var ok_techengine = (engine == null || starbase.enginetechlevel >= engine.techlevel);
                var ok_techbeam = (beam == null || starbase.beamtechlevel >= beam.techlevel);
                var ok_techtorpedo = (torpedo == null || starbase.torptechlevel >= torpedo.techlevel);
                var ok_all = ok_cost && ok_duranium && ok_tritanium && ok_molybdenum && ok_techhull && ok_techengine && ok_techbeam && ok_techtorpedo;
                templist += "<tr><td rowspan='2'>" + (ok_all ? "<div class='MoreActionButton' onclick='vgap.addOns.vgapShipTemplates.buildFromTemplate(" + i + ");'>Build</div>" : "<span class='BadText'>Can't Build</span>")+ "</td><td>" + hull.name.toUpperCase() + "</td>";
                templist += "<td class='" + (!ok_cost ? "BadText" : "") + "'>  Megacredits</td><td> " + template.cost + "</td><td>(" + planet.megacredits + ")</td>";
                templist += "<td class='BadText'>" + (!ok_techhull ? "Hull Tech " + hull.techlevel : "" ) + "</td></tr>";
                templist += "<tr><td>" + (engine != null ? hull.engines + " " + engine.name : "") + "</td>";
                templist += "<td class='" + (!ok_duranium ? "BadText" : "") + "'>  Duranium</td><td> " + template.duranium + "</td><td>(" + planet.duranium + ")</td>";
                templist += "<td class='BadText'>" + (!ok_techengine ? "Engine Tech " + engine.techlevel : "" ) + "</td></tr>";
                templist += "<tr><td rowspan='2'>" + "<div class='MoreActionButton' onclick='vgap.addOns.vgapShipTemplates.deleteTemplate(" + i + ", 1);vgap.starbaseScreen.showAssembly();'>Del</div></td><td>" + (beam != null ? template.buildbeamcount + " " + beam.name : "") + "</td>";
                templist += "<td class='" + (!ok_tritanium ? "BadText" : "") + "'>  Tritanium</td><td> " + template.tritanium + "</td><td>(" + planet.tritanium + ")</td>";
                templist += "<td class='BadText'>" + (!ok_techbeam ? "Beam Tech " + beam.techlevel : "" ) + "</td></tr>";
                templist += "<tr><td>" + (torpedo != null ? template.buildtorpcount + " " + torpedo.name : (hull.fighterbays>0 ? hull.fighterbays + " Fighter Bays" : "")) + "</td>";
                templist += "<td class='" + (!ok_molybdenum ? "BadText" : "") + "'>  Molybedenum</td><td> " + template.molybdenum + "</td><td>(" + planet.molybdenum + ")</td>";
                templist += "<td class='BadText'>" + (!ok_techtorpedo ? "Torp Tech " + torpedo.techlevel : "" ) + "</td></tr>";
                templist += "<tr><td>-</td></tr>";
            }
            templist += "</table></div>";
            
            $(templist).appendTo("#MoreScreen");
            $("#TemplateList td").attr("style", "padding-right: 10px;");
            $("#TemplateList").height($(window).height() - 100);
            //console.log($("*").queue());
            setTimeout(function () {$("#TemplateList").jScrollPane();}, 500);
        }
        
    };
/*    
var old_loadBuildShipScreen = vgapStarbaseScreen.prototype.loadBuildShipScreen;
vgapStarbaseScreen.prototype.loadBuildShipScreen = function () {

        old_loadBuildShipScreen.apply(this, arguments);
        console.log(vgap.more.queue( function () {$("#TemplateList").jScrollPane();} ));
        
    };
*/

}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);