// ==UserScript==
// @name          Planets.nu ship templates
// @description   Adds saving to and building from ship templates
// @include       http://planets.nu/*
// @version 0.7
// ==/UserScript==

/*------------------------------------------------------------------------------
 1. When at the Ship Assembly screen is displayed, if there is a hull selected,
    show a "Save Template" button. When selected, Save the currently ship config
    as a templatte.
 2. If no hull is selected, display the list of available templates. Options to
    build (if mineral/tech requirements met) or delete template. Highlights
    deficiencies if unable to build.
 3. (ver 0.3) Adds planet cash/minerals to display, tweaks formatting.
 4. Modified display/etc to be more compact. 
 5. Added sorting by hulltech and hullid and a clear assembly button for the build screen.
 6. Moved template storage to localStorage by race
 7. Removed nameclash with save/load functions
------------------------------------------------------------------------------*/


function wrapper () { // wrapper for injection
    
    if (vgap.version < 3.0) {
        console.log("vgapShipTemplates plugin requires at least NU version 3.0. Plugin disabled." );
        return;	
    }
    
    var plugin_version = 0.6;
    
    console.log("vgapShipTemplates plugin version: v" + plugin_version );
    
    vgaPlanets.prototype.setupAddOn = function (addOnName) {                
        if (vgaPlanets.prototype.addOns == null) 
            vgaPlanets.prototype.addOns = {};
        
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
    vgaPlanets.prototype.addOns.vgapShipTemplates.notetype = 133678; 
    
    vgaPlanets.prototype.addOns.vgapShipTemplates.sortTemplates = function (a, b) {
        var hulla = vgap.getHull(a.buildhullid);
        var hullb = vgap.getHull(b.buildhullid);
        
        if (hulla.techlevel == hullb.techlevel) {
            return a.buildhullid - b.buildhullid;
        }
        
        return hulla.techlevel - hullb.techlevel;
    }
    
    
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
        vgap.addOns.vgapShipTemplates.saveObjectLocal(vgap.addOns.vgapShipTemplates.templates);
        $("#SaveTemplate").hide();
    };
    
    vgaPlanets.prototype.addOns.vgapShipTemplates.deleteTemplate = function (index) {
        vgap.addOns.vgapShipTemplates.templates.splice(index, 1);   
        vgap.addOns.vgapShipTemplates.saveObjectLocal(vgap.addOns.vgapShipTemplates.templates);
    };
    
    vgaPlanets.prototype.addOns.vgapShipTemplates.buildFromTemplate = function (index) {        
        // console.log("buildFromTemplate");
        
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
    
    vgaPlanets.prototype.addOns.vgapShipTemplates.clearAssembly = function () {
        vgap.starbaseScreen.clearAssembly();
        console.log("Clear Assembly");
    };
    
    vgap.addOns.vgapShipTemplates.saveObjectLocal = function (obj) {        
        localStorage.removeItem("vgapShipTemplates" + vgap.player.raceid);
        localStorage.setItem("vgapShipTemplates" + vgap.player.raceid, JSON.stringify(obj)); 
        //console.log("setTemplates: " + "vgapShipTemplates" + vgap.player.raceid + " : " + localStorage.getItem("vgapShipTemplates" + vgap.player.raceid));
        
    };
    
    
    vgap.addOns.vgapShipTemplates.getObjectLocal = function () {    
        //console.log("getTemplates");
        return JSON.parse(localStorage.getItem("vgapShipTemplates" + vgap.player.raceid));        
    };
    
    
    var old_processLoad = vgaPlanets.prototype.processLoad; 
    vgaPlanets.prototype.processLoad = function (result) {      
        // console.log("processLoad: " + result);
        // console.log("      apply: " + arguments);
        old_processLoad.apply(this, arguments);
        
        if (result.success) {
            var templates = vgap.addOns.vgapShipTemplates.getObjectLocal();
            //console.log("   template: " + templates);
            if (templates == null)
                templates = [];
            this.addOns.vgapShipTemplates.templates = templates;
        }        
    };
    
    var old_showAssembly = vgapStarbaseScreen.prototype.showAssembly;
    vgapStarbaseScreen.prototype.showAssembly = function () {        
        console.log("showAssembly");
        
        old_showAssembly.apply(this, arguments);
        
        var starbase = this.starbase;7
        if (starbase.buildhullid > 0) {
            var html = "<div><table class='CleanTable'>" +
                "<tr><td><div id='SaveTemplate' class='MoreActionButton' onclick='vgap.addOns.vgapShipTemplates.saveTemplate();'>Save Template</div></td></tr>" + 
                "<tr><td><div id='ClearAssembly' class='MoreActionButton' onclick='vgap.addOns.vgapShipTemplates.clearAssembly();'>Clear Assembly</div></td></tr></table></div>";
            $("#AssemblyBack").after(html);
            //console.log("showAssembly - Save");
        }
        else{
            
            //console.log("showAssembly - List");
            
            var templist = "<div id='TemplateList'><table class='CleanTable'>";
            
            
            vgap.addOns.vgapShipTemplates.templates.sort(vgaPlanets.prototype.addOns.vgapShipTemplates.sortTemplates);
            /*var temps = vgap.addOns.vgapShipTemplates.templates;
            if (temps.length > 1) {
                for (i=0; i < temps.length; i++) {                          
                    for (j=0; j < temps.length -1; j++) {
                        if (temps[j].buildhullid > temps[j+1].buildhullid) {
                            var tempTemp = temps[j+1];
                            temps[j+1] = temps[j];
                            temps[j] = tempTemp;
                        }
                    }  
                }
            }*/
            
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
                
                console.log(hull + engine + beam + torpedo);
                
                templist += "<tr>" + 
                    "<td>" 		  + (ok_all ? "<div class='MoreActionButton' onclick='vgap.addOns.vgapShipTemplates.buildFromTemplate(" + i + ");'>Build </div>" : "<span class='BadText'>Can't Build </span>") + "</td>" +                    
                    "<td colspan=4class='" + (!ok_techhull ?  "BadText" : "") + "'>" + hull.name.toUpperCase() + "</td>" +
                    
                    "</tr>";
                
                templist += "<tr>" +
                    "<td><div class='MoreActionButton' onclick='vgap.addOns.vgapShipTemplates.deleteTemplate(" + i + ");vgap.starbaseScreen.showAssembly();'>Del  </div></td>" + 
                    "<td class='" + (!ok_techengine ? "BadText" : "") + "'>" + (engine != null ? hull.engines + "x " + engine.name : "") + "</td>" +
                    "<td class='" + (!ok_techbeam ? "BadText" : "") + "'>" + (beam != null ? template.buildbeamcount + "x " + beam.name : "") + "</td>" +
                    "<td class='" + (!ok_techtorpedo ? "BadText" : "") + "'>" + (torpedo != null ? template.buildtorpcount + "x " + torpedo.name : (hull.fighterbays>0 ? hull.fighterbays + "x Fighter Bays" : "")) + "</td>" +                    
                    "</tr>";
                
                templist += "<tr>" +
                    "<td></td>" +
                    "<td class='" + (!ok_cost ? "BadText" : "") + "'> M: " + template.cost + "(" + planet.megacredits + ")</td>" + 
                    "<td class='" + (!ok_duranium ? "BadText" : "") + "'> D: " + template.duranium + "(" + planet.duranium + ")</td>" +                    
                    "<td class='" + (!ok_tritanium ? "BadText" : "") + "'> T: " + template.tritanium + "(" + planet.tritanium + ")</td>" +                    
                    "<td class='" + (!ok_molybdenum ? "BadText" : "") + "'> M: " + template.molybdenum + "(" + planet.molybdenum + ")</td>" +
                    "</tr>";
                
                templist += "<tr><td colspan=5><hr></td></tr>";          
            }
            templist += "</table></div>";
            
            $(templist).appendTo("#MoreScreen");
            $("#TemplateList td").attr("style", "padding-right: 10px;");
            $("#TemplateList").height($(window).height() - 100);
            //console.log($("*").queue());
            setTimeout(function () {$("#TemplateList").jScrollPane();}, 500);
        }
        
    };
    
}


var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";
document.body.appendChild(script);
