// ==UserScript==
// @name        Planets.nu advanced starbase screen
// @namespace   planets.nu
// @include     http://planets.nu/home
// @include     http://planets.nu/games/*
// @include     http://*.planets.nu/*
// @grant       none
// @version     0.6
// ==/UserScript==

// Version 0.6 added *.planets.nu
// Version 0.5 removed security issue
// Version 0.4 raiseTech-moreScreen only altered in space dock
// Version 0.3 Debug issues with raiseTech-morescreen
// Version 0.2 raise Tech level and sell supplies from build screen
// Version 0.1 added red font for parts that are too expensive


function wrapper () { // wrapper for injection

//techlevel in shipscreen


vgapStarbaseScreen.prototype.old_render=vgapStarbaseScreen.prototype.renderBuildShipScreen;

vgapStarbaseScreen.prototype.renderBuildShipScreen=function(){
	this.old_render.apply(this, arguments);
this.techLevel = $("<div class='BuildContainer' id='TechLevel'><div class='SepContainer' /></div>");
$("<div class='BuildBar'><div class='SepTitle' onclick=\"vgap.starbaseScreen.raiseTech();\">Tech Levels</div></div>").appendTo("#BuildShipScreen"); 
};

vgapStarbaseScreen.prototype.old_raiseTech=vgapStarbaseScreen.prototype.raiseTech;

vgapStarbaseScreen.prototype.raiseTech=function(){
	var inside=false;
	if (document.getElementById("BuildShipScreen").style.display!='none') {inside=true;} 
	this.old_raiseTech.apply(this, arguments);
	if (inside) {
		vgap.showMore(600);
		$("#MoreScreen a.MoreBack").remove();
		vgap.starbaseScreen.buildToggle('TechLevel');
	};
};

vgapStarbaseScreen.prototype.old_buildToggle=vgapStarbaseScreen.prototype.buildToggle;

vgapStarbaseScreen.prototype.buildToggle= function (section) {
vgapStarbaseScreen.prototype.old_buildToggle.apply(this, arguments);
        hght = $(window).height() - 186 + "px";
        $("#" + section).height(hght);
};




// mark parts that cannot be built

var enoughRes=function(item, planet)
{
        var cost = item.cost;
        if (!cost)
            cost = item.launchercost;
	enough=true;
	if (cost>planet.megacredits) enough=false;
	else if (item.duranium>planet.duranium) enough=false;
	else if (item.tritanium>planet.tritanium) enough=false;
	else if (item.molybdenum>planet.molybdenum) enough=false;
	return enough;
};

vgapStarbaseScreen.prototype.buildHulls= function () {
        this.shipHulls.empty();
        var hullsHtml = "<div class='SepContainer'>";
        if (vgap.isNarrow)
            hullsHtml += "<table width='100%' class='CleanTable'><td>Name</td><td colspan='2'>In Stock</td>";
        else
            hullsHtml += "<table width='100%' class='CleanTable'><tr><td>Tech</td><td>Name</td><td colspan='2'>In Stock</td></tr>";
        for (var i = 0; i < vgap.racehulls.length; i++) {
            var hull = vgap.getHull(vgap.racehulls[i]);
            var cls = "LoadBuy";
            if (hull.id == this.selectedHull)
                cls = "LoadBuySelected";
		if (!enoughRes(hull, this.planet)) cls+="Bad"; //neu
            if (vgap.isNarrow) {
                hullsHtml += "<tr class='" + cls + "' onclick='vgap.starbaseScreen.showBuyHull(" + hull.id + ");'><td>" + hull.name + "</td><td>" + this.getStockText(1, hull.id) + "</td>";
                if (this.starbase.hulltechlevel >= hull.techlevel)
                    hullsHtml += "<td class='BuyActions'><div onclick=\"vgap.starbaseScreen.buyHull(-1, " + hull.id + ");\">sell</div> <div onclick=\"vgap.starbaseScreen.buyHull(1, " + hull.id + ");\">buy</div></td>";
                hullsHtml += "</tr>";
            }
            else {
                hullsHtml += "<tr class='" + cls + "' onclick='vgap.starbaseScreen.showBuyHull(" + hull.id + ");'><td>" + hull.techlevel + "</td><td>" + hull.name + "</td><td>" + this.getStockText(1, hull.id) + "</td>";
                if (this.starbase.hulltechlevel >= hull.techlevel)
                    hullsHtml += "<td class='BuyActions'><div onclick=\"vgap.starbaseScreen.buyHull(-1, " + hull.id + ");\">sell</div> <div onclick=\"vgap.starbaseScreen.buyHull(1, " + hull.id + ");\">buy</div></td>";
                hullsHtml += "</tr>";
            }

        }
        hullsHtml += "</table></div>";
        $(hullsHtml).appendTo("#ShipHulls");

        //vgap.action added for the assistant (Alex):
        vgap.action();
    };

vgapStarbaseScreen.prototype.buildEngines= function () {
        this.shipEngines.empty();
        var html = "<div class='SepContainer'>";
        html += "<table width='100%' class='CleanTable'><tr><td>Tech</td><td>Name</td><td colspan='2'>In Stock</td></tr>";
        for (var i = 0; i < vgap.engines.length; i++) {
            var engine = vgap.engines[i];
            var cls = "LoadBuy";
            if (engine.id == this.selectedEngine)
                cls = "LoadBuySelected";
		if (!enoughRes(engine, this.planet)) cls+="Bad"; //neu		
            html += "<tr class='" + cls + "' onclick='vgap.starbaseScreen.showBuyEngine(" + engine.id + ");'><td>" + engine.techlevel + "</td><td>" + engine.name + "</td><td>" + this.getStockText(2, engine.id) + "</td>";
            if (this.starbase.enginetechlevel >= engine.techlevel)
                html += "<td class='BuyActions'><div onclick=\"vgap.starbaseScreen.buyEngine(-1, " + engine.id + ");\">sell</div> <div onclick=\"vgap.starbaseScreen.buyEngine(1, " + engine.id + ");\">buy</div></td>";
            html += "</tr>";
        }
        html += "</table></div>";
        $(html).appendTo("#ShipEngines");

        // vgap.action added for the assistant (Alex):
        //     vgap.action();
    };

vgapStarbaseScreen.prototype.buildBeams= function () {
        this.shipBeams.empty();
        var html = "<div class='SepContainer'>";
        html += "<table width='100%' class='CleanTable'><tr><td>Tech</td><td>Name</td><td colspan='2'>In Stock</td></tr>";
        for (var i = 0; i < vgap.beams.length; i++) {
            var beam = vgap.beams[i];
            var cls = "LoadBuy";
            if (beam.id == this.selectedBeam)
                cls = "LoadBuySelected";
		if (!enoughRes(beam, this.planet)) cls+="Bad"; //neu
            html += "<tr class='" + cls + "' onclick='vgap.starbaseScreen.showBuyBeam(" + beam.id + ");'><td>" + beam.techlevel + "</td><td>" + beam.name + "</td><td>" + this.getStockText(3, beam.id) + "</td>";
            if (this.starbase.beamtechlevel >= beam.techlevel)
                html += "<td class='BuyActions'><div onclick=\"vgap.starbaseScreen.buyBeam(-1, " + beam.id + ");\">sell</div> <div onclick=\"vgap.starbaseScreen.buyBeam(1, " + beam.id + ");\">buy</div></td>";
            html += "</tr>";

        }
        html += "</table></div>";
        $(html).appendTo("#ShipBeams");

        // vgap.action added for the assistant (Alex):
        //    vgap.action();
    };

vgapStarbaseScreen.prototype.buildLaunchers= function () {
        this.shipLaunchers.empty();
        var html = "<div class='SepContainer'>";
        html += "<table width='100%' class='CleanTable'><tr><td>Tech</td><td>Name</td><td colspan='2'>In Stock</td></tr>";
        for (var i = 0; i < vgap.torpedos.length; i++) {
            var launcher = vgap.torpedos[i];
            var cls = "LoadBuy";
            if (launcher.id == this.selectedLauncher)
                cls = "LoadBuySelected";
		if (!enoughRes(launcher, this.planet)) cls+="Bad"; //neu
            html += "<tr class='" + cls + "' onclick='vgap.starbaseScreen.showBuyLauncher(" + launcher.id + ");'><td>" + launcher.techlevel + "</td><td>" + launcher.name + "</td><td>" + this.getStockText(4, launcher.id) + "</td>";
            if (this.starbase.torptechlevel >= launcher.techlevel)
                html += "<td class='BuyActions'><div onclick=\"vgap.starbaseScreen.buyLauncher(-1, " + launcher.id + ");\">sell</div> <div onclick=\"vgap.starbaseScreen.buyLauncher(1, " + launcher.id + ");\">buy</div></td>";
            html += "</tr>";

        }
        html += "</table></div>";
        $(html).appendTo("#ShipLaunchers");

        // vgap.action added for the assistant (Alex):
        //    vgap.action();
    };

};

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);

//Starbase: stylesheet for red font

var style = document.createElement("style");
style.type = "text/css";
style.textContent = ".LoadBuyBad {color: #CD5555} .LoadBuyBad:hover {cursor: pointer; background-color: #eee} .LoadBuySelectedBad {background-color: #ccc;color: #CD0000}";
document.body.appendChild(style);