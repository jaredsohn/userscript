// ==UserScript==
// @name          Planets.nu super filter
// @description   Allows arbitrary filtering of ship/planet/base lists.
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @version 0.2
// ==/UserScript==

/*------------------------------------------------------------------------------
1. Adds a "Filter" checkbox and textarea to lists. When the checkbox is checked
    the code in the textbox will be run to evaluate each item for inclusion on
    the filitered list, as follows:
    
    The input in the textbox should represent the body of a javascript function
    which takes one parameter (ship, planet, or starbase respectively) and
    returns a value which can be evaluated as a boolean represnting inclusion.
    
    Example, ship filter, filters all ships with FC equivalent to "HYP":
<code>
        return ship.friendlycode.toUpperCase() == "HYP";
</code>  
    Example, planet filter, filters all planets able to build a base:
<code>
        return (planet.duranium >= 120 && planet.tritanium >= 402 &&
                planet.molybdenum >= 340 && planet.megacredits >= 900 &&
                !planet.buildingstarbase && vgap.getStarbase(planet.id) == null);
</code>
    Example, starbase filter, filters bases with no ships in orbit:
<code>
        planet = vgap.getPlanet(starbase.planetid);
        return vgap.shipsAt(planet.x, planet.y).length == 0;
</code>        
 2. When a filter is active, the "back" and "next" controls on the map
    will only iterate through the filtered set. All/idle will be selected
    on the filtered set as well.
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
vgaPlanets.prototype.setupAddOn("vgapSuperFilter");

settings = vgaPlanets.prototype.addOns.vgapSuperFilter.settings;
if (settings.filters == null) {
    console.log("OK");
    settings.filters = {ship: new Array(), planet: new Array(), starbase: new Array()};
}
vgaPlanets.prototype.addOns.vgapSuperFilter.current = {ship: {}, planet: {}, starbase: {}};

vgaPlanets.prototype.addOns.vgapSuperFilter.addFilterControls = function (filterType) {

        var filters = vgaPlanets.prototype.addOns.vgapSuperFilter.settings.filters[filterType];
        var current  = vgaPlanets.prototype.addOns.vgapSuperFilter.current;
        filterbox = $("<input type='checkbox' id='filterbox' checked='" + !!current[filterType].isActive + "' onchange='vgap.dash.show" + filterType.charAt(0).toUpperCase() + filterType.slice(1) + "s();'>Filter</input>");
        filterselect = $("<select id='filterselect' width='100%' name='" + filterType + "'><option>New Filter...</option></select>");
        filterselect.bind("change", function (event) {console.log($("#filterselect").val()); vgaPlanets.prototype.addOns.vgapSuperFilter.changeFilter(); }); 
        for (i = 0; i < filters.length; i++) {
            filterselect.append("<option value='" + filters[i].name + "'>" + filters[i].name + "</option>");
        }
        filterbox.appendTo("#DashboardContent div.jspPane");
        filterselect.appendTo("#DashboardContent div.jspPane");
        

    };
    
vgaPlanets.prototype.addOns.vgapSuperFilter.changeFilter = function () {
        var filterselect = $("#filterselect");
        var filterType = filterselect.attr("name");
        var filters = vgaPlanets.prototype.addOns.vgapSuperFilter.settings.filters[filterType];
        for (i = 0; i < filters.length; i++) {
            if (filters[i].name == filterselect.val()) {
                vgaPlanets.prototype.addOns.vgapSuperFilter.showFilterEdit(filterType, filters[i]);
                return;
            }
        }
    };
    
vgaPlanets.prototype.addOns.vgapSuperFilter.showFilterEdit = function (filterType, filter) {
        var editControls = $("<div></div>");
        editControls.append("<textarea>" + filter.func + "</textarea>");
        console.log(editControls);
        $("#PlanetTable, #ShipTable").replaceWith(editControls);
    };
    

var old_processLoad = vgaPlanets.prototype.processLoad; 
vgaPlanets.prototype.processLoad = function (result) {

        old_processLoad.apply(this, arguments);
        
        if (result.success) {
            this.allmyships = this.myships.slice();
            this.allmyplanets = this.myplanets.slice();
            this.allmystarbases = this.mystarbases.slice();
        }
        this.s_filterbox = $("<input type='checkbox' id='filterbox' onchange='vgap.dash.showShips();'>Filter</input>");
        this.s_filtertext = $("<input type='text' id='filtertext' size='100' onchange='vgap.dash.showShips();' />");
        this.p_filterbox = $("<input type='checkbox' id='filterbox' onchange='vgap.dash.showPlanets();'>Filter</input>");
        this.p_filtertext = $("<input type='text' id='filtertext' size='100' onchange='vgap.dash.showPlanets();' />");
        this.b_filterbox = $("<input type='checkbox' id='filterbox' onchange='vgap.dash.showStarbases();'>Filter</input>");
        this.b_filtertext = $("<input type='text' id='filtertext' size='100' onchange='vgap.dash.showStarbases();' />");        
    };
    
var old_showShips = vgapDashboard.prototype.showShips;
vgapDashboard.prototype.showShips = function (view) {
        vgap.hotkeysOn = false;
        if (vgap.s_filterbox.is(':checked')) {
            var testfunc = new Function("ship", vgap.s_filtertext.val());
            vgap.myships = vgap.allmyships.filter( testfunc );
            vgap.myfilteredships = vgap.myships.slice();            
        }
        else {
            vgap.myships = vgap.allmyships.slice();
        }

        old_showShips.apply(this, arguments);
        /*
        vgap.s_filterbox.appendTo("#DashboardContent div.jspPane");
        vgap.s_filtertext.appendTo("#DashboardContent div.jspPane");
        */
        vgaPlanets.prototype.addOns.vgapSuperFilter.addFilterControls("ship");
        vgap.myships = vgap.allmyships.slice();
    };
    
var old_showPlanets = vgapDashboard.prototype.showPlanets;
vgapDashboard.prototype.showPlanets = function (view) {
        vgap.hotkeysOn = false;
        if (vgap.p_filterbox.is(':checked')) {
            var testfunc = new Function("planet", vgap.p_filtertext.val());
            vgap.myplanets = vgap.allmyplanets.filter( testfunc );
            vgap.myfilteredplanets = vgap.myplanets.slice();
        }
        else {
            vgap.myplanets = vgap.allmyplanets.slice();
        }

        old_showPlanets.apply(this, arguments);
        vgap.p_filterbox.appendTo("#DashboardContent div.jspPane");
        vgap.p_filtertext.appendTo("#DashboardContent div.jspPane");
        vgap.myplanets = vgap.allmyplanets.slice();
        
    };
    
var old_showStarbases = vgapDashboard.prototype.showStarbases;
vgapDashboard.prototype.showStarbases = function (view) {
        vgap.hotkeysOn = false;
        if (vgap.b_filterbox.is(':checked')) {
            var testfunc = new Function("starbase", vgap.b_filtertext.val());
            vgap.mystarbases = vgap.allmystarbases.filter( testfunc );
            vgap.myfilteredstarbases = vgap.mystarbases.slice();
        }
        else {
            vgap.mystarbases = vgap.allmystarbases.slice();
        }

        old_showStarbases.apply(this, arguments);
        vgap.b_filterbox.appendTo("#DashboardContent div.jspPane");
        vgap.b_filtertext.appendTo("#DashboardContent div.jspPane");
        vgap.mystarbases = vgap.allmystarbases.slice();
        
    };

vgaPlanets.prototype.showRNav = function (navType, id) {
        //console.log("RNAV");

        if (navType) {
            //console.log("RNAVTYPE");
            this.rNavType = navType;
            if (navType == "Ship")
                this.rNavArray = (vgap.s_filterbox.is(':checked') && this.myfilteredships.length>0 ? this.myfilteredships : this.myships);
            if (navType == "Planet")
                this.rNavArray = (vgap.p_filterbox.is(':checked') && this.myfilteredplanets.length>0? this.myfilteredplanets : this.myplanets);
            if (navType == "Starbase")
                this.rNavArray = (vgap.b_filterbox.is(':checked') && this.myfilteredstarbases.length>0? this.myfilteredstarbases : this.mystarbases);
            this.rNavIndex = 0;
            for (var i = 0; i < this.rNavArray.length; i++) {
                if (this.rNavArray[i].id == id) {
                    this.rNavIndex = i;
                    break;
                }
            }
            this.rIdleLoadPlanets();
        }

        if (vgap.animations)
            this.rNav.fadeIn();
        else
            this.rNav.show();

        this.showRNavState();

        // vgap.action added for the assistant (Alex):
        // vgap.action();

    };

}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);