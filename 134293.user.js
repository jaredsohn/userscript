// ==UserScript==
// @name        Planets.nu - load your owned ships in simulator
// @namespace   planets.nu
// @include     http://planets.nu/home
// @include     http://*.planets.nu/*
// @include     http://planets.nu/*
// @version     1.1
// @grant	none
// @resource      userscript https://userscripts.org/scripts/source/134293.meta.js
// @updateURL     https://userscripts.org/scripts/source/134293.meta.js
// @downloadURL   https://userscripts.org/scripts/source/134293.user.js
// ==/UserScript==

/* 
0.2 Added own planets
0.3 Hull mass instead of ship mass
0.4 Hide things that aren't there
0.5 add foreign ships from "extended shiplist" addon (if installed), switch sides button
0.6 added privateer 3x Beam Kill Bonus
0.7 added V3 compatibility
0.8 added support for enemyShipListPlugin
0.9 Bugfix (damage, shield, crew not initialized), added special starbases
1.0 Bugfix (simulator interfered with vcrplayer)
1.1 Added "Double Beam Charge Rate" for Fascists (Only in campaing mode!)
*/



function wrapper () { // wrapper for injection

vcrSim.prototype.oldinit=vcrSim.prototype.init;
vcrSim.prototype.init= function (issim)
{	

	//Add own ship
	this.ships = vgap.ships.slice();
	/*V0.7 removed
	if (vgap.addOns.shipList)
	{
		ships=vgap.addOns.shipList.mergeArrays(ships, vgap.addOns.shipList.getShipList());
		own="Known";
	}*/
    if (vgap.plugins["enemyShipListPlugin"]!=null) 
	{
		var listships=vgap.plugins["enemyShipListPlugin"].enemyShipList;
		for (var i=0; i < listships.length; i++)
		{
			if (vgap.getArray(this.ships, listships[i].id)==null) this.ships.push(listships[i]);
		}
		this.ships.sort(function(a,b) {return (a.id - b.id);});
	}
	vgap.sim.DBC={"Left":false,"Right":false}; //double beam charge
	vgap.sim.oldinit.apply(this, arguments);
	if (issim)
	{
		this.showandhide("Left", null);
		this.showandhide("Right", null);
	}
};

vcrSim.prototype.renderSide=function(side){
	var hide = "style='display:none'";
    var html = "";

    html += "<div id='" + side + "ShipSelection'>";
	var own="Known";

	html +=	"<p><label>"+own+" ship:</label><select id='" + side + "OwnShip' onchange='vgap.sim.changeOwnShip(\"" + side + "\");' class='SimLong'>";
        html += "<option value='0'>Select From "+own+" Ships</option>";
        for (var i = 0; i < this.ships.length; i++) {
		var style="";
		if (this.ships[i].ownerid==0) style="class='UnknownText'";
		else if (vgap.getRelation(this.ships[i].ownerid).relationfrom>1) style="class='AllyText'";
		else if (this.ships[i].ownerid!=vgap.player.id) style="class='BadText'"; 
		var turnago=vgap.settings.turn-this.ships[i].infoturn;
		var turninfo="";
		if (turnago > 0) 
		{
			turninfo += " (" + turnago + " turn";
			if (turnago > 1) turninfo+="s";
			turninfo += " ago)";
		}
		html += "<option "+style+"value='" + i + "'>" + this.ships[i].id + ": " + this.ships[i].name + turninfo +"</option>";
        }
        html += "</select>";
	if (side=="Left") {
		html+="<a style='padding:0 0 0 15px' id='Switch' onclick='vgap.sim.switchSides();'>&laquo; Switch &raquo;</a>";	
	}
	html += "</p>";
	// end own ship
	
        html += "<p><label>Hull:</label><select id='" + side + "Hull' onchange='vgap.sim.changeHull(\"" + side + "\");' class='SimLong'>";
        html += "<option value='0'>Select Ship Hull</option>";
        var hulls = vgap.hulls;
        hulls.sort(this.sortHulls);
        for (var i = 0; i < hulls.length; i++) {
            html += "<option value='" + vgap.hulls[i].id + "'>" + hulls[i].name + "</option>";
        }
        html += "</select></p>";

        html += "<p><label>Race:</label><select id='" + side + "Race' onchange='vgap.sim.changeRace(\"" + side + "\");'class='SimLong'>";
        for (var i = 0; i < vgap.races.length; i++) {
            html += "<option value='" + vgap.races[i].id + "'>" + vgap.races[i].name + "</option>";
        }
        html += "</select></p>";

        html += "<p "+hide+" id='" + side + "BeamSelection'><label>Beams:</label><input type='text' id='" + side + "BeamCount' value='0'/><select id='" + side + "Beam' class='SimShort'>";
        for (var i = 0; i < vgap.beams.length; i++) {
            html += "<option value='" + vgap.beams[i].id + "'";
            if (i == vgap.beams.length - 1)
                html += "selected='true'";
            html += ">" + vgap.beams[i].name + "</option>";
        }
        html += "</select>";
    	html += "<div "+hide+" id='" + side + "DBC_div'><input type='checkbox' id='" + side + "DBC' "+ (vgap.sim.DBC[side]?"checked='checked'":"") +" onchange='vgap.sim.DBC[\"" + side + "\"]=!vgap.sim.DBC[\"" + side + "\"]'>2x Beam Charge rate</div>";	
	html += "</p>";
        html += "<p "+hide+" id='" + side + "TorpedoSelection'><label>Torpedos:</label><input type='text' id='" + side + "TorpCount' value='0'/><select id='" + side + "Torp' class='SimShort'>";
        for (var i = 0; i < vgap.torpedos.length; i++) {
            html += "<option value='" + vgap.torpedos[i].id + "'";
            if (i == vgap.torpedos.length - 1)
                html += "selected='true'";
            html += ">" + vgap.torpedos[i].name + "</option>";
        }
        html += "</select></p>";

        html += "<p "+hide+" id='" + side + "FighterSelection'><label>Fighter Bays:</label><span id='" + side + "BayCount'>0</span></p>";
        html += "<p><label>Mass:</label><span id='" + side + "Mass'>0</span></p>";

        html += "<p><label>Damage:</label><input type='text' id='" + side + "Damage' value='0'/></p>";
        html += "<p><label>Shield:</label><input type='text' id='" + side + "Shield' value='100'/></p>";
        html += "<p><label>Crew:</label><input type='text' id='" + side + "Crew' value='0'/></p>";
        html += "<p "+hide+" id='" + side + "AmmoSelection'><label id='" + side + "Ammotype'>Fighters/Torps:</label><input type='text' id='" + side + "Ammo' value='0'/></p>";

        html += "</div>";

        return html;
    };

vcrSim.prototype.showandhide=function(side, hull){	//hide things that aren't there
	if (hull==null)
	{
		hull={};
		hull.beams=0;
		hull.launchers=0;
		hull.fighterbays=0;
	}
	if (side=="Right" && hull==-1) 	//planet
	{	
		if ($("#PlanetStarbase").attr("checked"))
		{	
			$("#StarbaseSelection").show();
			this.baseType = parseInt($("#StarbaseType").val()); 
			$("#BaseImg").attr("src", vgap.getStarbaseIcon(this.baseType));
		}
		else
		{
			$("#StarbaseSelection").hide();
		}
	}
	else { 				//ship
		if (hull.beams) $("#" + side + "BeamSelection").show();
		else $("#" + side + "BeamSelection").hide();

		if (hull.launchers) 
		{
			$("#" + side + "TorpedoSelection").show(); 
			$("#" + side + "Ammotype").text("Torps:");
			$("#" + side + "AmmoSelection").show();
		}
		else $("#" + side + "TorpedoSelection").hide();

		if (hull.fighterbays) 
		{
			$("#" + side + "FighterSelection").show(); 
			$("#" + side + "Ammotype").text("Fighters:");
			$("#" + side + "AmmoSelection").show();
		}
		else $("#" + side + "FighterSelection").hide();

		if (!hull.launchers && !hull.fighterbays) 
		{
			$("#" + side + "AmmoSelection").hide();
			if (!hull.beams) $("#" + side + "Shield").val(0); //Freighters don't have shields, do they?
		}
		if (vgap.settings.campaignmode && parseInt($("#"+side+"Race").val())==4)
		{ 
			if (vgap.sim.DBC[side])
			{
				$("#"+side+"DBC").attr("checked","checked");
			}
			else 
			{
				$("#"+side+"DBC").removeAttr("checked");
			}
			$("#"+side+"DBC_div").show();
		}
		else 
		{
			$("#"+side+"DBC_div").hide();
		}
		
	}
};

vcrSim.prototype.changeOwnShip= function (side) {
    var val=$("#" + side + "OwnShip").val();
	var ownShip = this.ships[val];
        var hullId = ownShip.hullid;
        if (hullId == 0) { console.log("no hullId");
            return;}
	var hull=vgap.getHull(hullId);
	   //console.log("val: "+val+" hullid: "+hullId);
        $("#RightShipSelection").show();
	var isKnown = (ownShip.ownerid==vgap.player.id || (ownShip.ownerid!=0 && vgap.getRelation(ownShip.ownerid).relationfrom>3) || ownShip.engineid>0);
        $("#" + side + "Hull").val(hullId);
        $("#" + side + "Race").val(vgap.getPlayer(ownShip.ownerid).raceid);
        $("#" + side + "Mass").text(hull.mass);
        $("#" + side + "BayCount").text(hull.fighterbays);
	if (isKnown)
	{
		$("#" + side + "BeamCount").val(ownShip.beams == -1 ? hull.beams : ownShip.beams);
		$("#" + side + "Beam").val(ownShip.beamid < 1 ? 10 : ownShip.beamid);
		$("#" + side + "TorpCount").val(ownShip.torps == -1 ? hull.launchers : ownShip.torps);
		$("#" + side + "Torp").val(ownShip.torpedoid < 1 ? 10 : ownShip.torpedoid);
		$("#" + side + "Crew").val(ownShip.crew==-1 ? hull.crew : ownShip.crew);
		$("#" + side + "Ammo").val(ownShip.ammo==-1 ? hull.cargo : ownShip.ammo);
	}
	else {
		$("#" + side + "BeamCount").val(hull.beams);
		$("#" + side + "Beam").val(10);
		$("#" + side + "TorpCount").val(hull.launchers);
		$("#" + side + "Torp").val(10);
	        $("#" + side + "Crew").val(hull.crew);
	        $("#" + side + "Ammo").val(hull.cargo);
	}
	var damage=(ownShip.damage<0?0:ownShip.damage);
        $("#" + side + "Damage").val(damage);
        $("#" + side + "Shield").val(Math.max(0,100-damage));
        //console.log("damage: " +damage);

        if (side == "Left")
            $("#" + side + "Img").attr("src", hullImg(hullId));
        else
            $("#" + side + "Img").attr("src", hullLeftImg(hullId));
        $("#" + side + "Img").show();

	this.showandhide(side, hull);
    };

vcrSim.prototype.switchSides = function () {
	if (this.vsPlanet) return;
	var types=["Hull", "OwnShip", "Race", "BeamCount", "Beam", "TorpCount", "Torp", "Crew", "Ammo", "Damage", "Shield", "BayCount", "Mass", "Img"];
	for (var i=0; i<types.length; ++i) {this.doSwitch(types[i])};
	this.showandhide("Right", vgap.getHull($("#RightHull").val())); 
	this.showandhide("Left", vgap.getHull($("#LeftHull").val())); 
};

vcrSim.prototype.doSwitch = function (type) {
	if (type == "OwnShip" || type == "Hull" || type == "BeamCount" || type == "TorpCount" || type == "Crew" ||  type == "Ammo" || type == "Damage" || type == "Shield" || type == "Beam" || type == "Torp" || type == "Race") {
		var val= $("#Right"+type).val();
		$("#Right"+type).val($("#Left"+type).val());
		$("#Left"+type).val(val);
	}
	if (type == "BayCount" || type == "Mass") {
		var val= $("#Right"+type).text();
		$("#Right"+type).text($("#Left"+type).text());
		$("#Left"+type).text(val);
	}
	if (type == "Img") {
		var val= $("#Right"+type).attr("src").replace(/hullsleft/g, "hulls");
		$("#Right"+type).attr("src", $("#Left"+type).attr("src").replace(/hulls/g, "hullsleft"));
		$("#Left"+type).attr("src", val);
	}
};

vcrSim.prototype.changeHull= function (side) {
        var hullId = $("#" + side + "Hull").val()
        if (hullId == 0)
            return;
	
        $("#RightShipSelection").show();
	$("#" + side + "OwnShip").val(-1)
        var hull = vgap.getHull(hullId);

        $("#" + side + "BeamCount").val(hull.beams);
        $("#" + side + "TorpCount").val(hull.launchers);
        $("#" + side + "BayCount").text(hull.fighterbays);
        $("#" + side + "Crew").val(hull.crew);
        $("#" + side + "Ammo").val(hull.cargo);
        $("#" + side + "Mass").text(hull.mass);
        $("#" + side + "Damage").val("0");
        $("#" + side + "Shield").val("100");
        if (side == "Left")
            $("#" + side + "Img").attr("src", hullImg(hullId));
        else
            $("#" + side + "Img").attr("src", hullLeftImg(hullId));
        $("#" + side + "Img").show();
	
	this.showandhide(side, hull);

    };
vcrSim.prototype.changeRace= function (side) {
        var hullId = $("#" + side + "Hull").val()
        if (hullId == 0)
            return;
        var hull = vgap.getHull(hullId);
 	this.showandhide(side, hull);
};

vcrSim.prototype.old_shipVsShip=vcrSim.prototype.shipVsShip;
vcrSim.prototype.shipVsShip = function () {
	vgap.sim.old_shipVsShip.apply(this, arguments);
	$("#Switch").show();
};
vcrSim.prototype.old_shipVsPlanet=vcrSim.prototype.shipVsPlanet;
vcrSim.prototype.shipVsPlanet = function () {
	vgap.sim.old_shipVsPlanet.apply(this, arguments);
	$("#Switch").hide();
};

vcrSim.prototype.renderPlanetSide= function () {
        side="right";
	var html = "";
        html += "<div id='PlanetSelection'>";
	html +=	"<p><label>Own planet:</label><select id='OwnPlanet' onchange='vgap.sim.changeOwnPlanet();' class='SimLong'>";
        html += "<option value='0'>Select from own Planets</option>";
        var planets = vgap.planets;
        for (var i = 0; i < planets.length; i++) {
		if (planets[i].ownerid!=vgap.player.id) continue; // only own planets
            html += "<option value='" + i + "'>" + planets[i].id + ": " + planets[i].name + "</option>";
        }
        html += "</select></p>";
        html += "<p><label>Planet Defense:</label><input type='text' id='PlanetDefense' value='100'/></p>";
        html += "<p><label>Planet Shield:</label><input type='text' id='PlanetShield' value='100'/></p>";
        html += "<p><label>Has Starbase:</label><input type='checkbox' id='PlanetStarbase' onchange='vgap.sim.showandhide(\"Right\", -1);'/></p>";
        html += "<div id='StarbaseSelection'>";
		html += "<p><label>Starbase Type:</label><select id='StarbaseType' onchange='vgap.sim.showandhide(\"Right\", -1);' class='SimShort'>";
		html += "<option value='0'>Standard Base</option>";
		html += "<option value='1'>Radiation Base</option>";
		html += "<option value='2'>Mining Base</option>";
        html += "</select></p>";		
		html += "<p><label>Starbase Defense:</label><input type='text' id='StarbaseDefense' value='200'/></p>";
        html += "<p><label>Starbase Fighters:</label><input type='text' id='StarbaseFighters' value='60'/></p>";
        html += "<p><label>Beam Tech:</label><input type='text' id='StarbaseBeamTech' value='1'/></p>";
        html += "</div></div>";
        return html;
    };


vcrSim.prototype.changeOwnPlanet= function () {

	var ownPlanet = vgap.planets[$("#OwnPlanet").val()];
        if (ownPlanet.id == 0)
            return;
	var isBase=false;
	for (var i = 0; i < vgap.starbases.length; i++)
	{
		if (vgap.starbases[i].planetid==ownPlanet.id) 
		{
			isBase=true;
			ownBase=vgap.starbases[i];
			break;
		}
	} 
        $("#PlanetDefense").val(ownPlanet.defense);
        if (ownPlanet.defense || isBase) $("#PlanetShield").val("100");
	else $("#PlanetShield").val("0")
        if (isBase)
	{
		$("#PlanetStarbase").attr("checked","checked");
        	$("#StarbaseDefense").val(ownBase.defense);
        	$("#StarbaseFighters").val(ownBase.fighters);
        	$("#StarbaseBeamTech").val(ownBase.beamtechlevel);
			$("#StarbaseType").val(ownBase.starbasetype);
	}
	else $("#PlanetStarbase").removeAttr("checked");
	this.showandhide("Right", -1);
	$("#RightImg").attr("src", ownPlanet.img);
    };
    
vcrSim.prototype.getCombatObject= function (side) {
		/* original */
        this.validate(side);

        var obj = new combatObject();
        obj.init();
        obj.BayCount = parseInt($("#" + side + "BayCount").text());
        obj.BeamCount = parseInt($("#" + side + "BeamCount").val());
        obj.Shield = parseInt($("#" + side + "Shield").val());
        obj.RaceId = parseInt($("#" + side + "Race").val());
        obj.Damage = parseInt($("#" + side + "Damage").val());
        obj.LauncherCount = parseInt($("#" + side + "TorpCount").val());
        obj.TorpedoId = parseInt($("#" + side + "Torp").val());
        obj.BeamId = parseInt($("#" + side + "Beam").val());
        obj.Crew = parseInt($("#" + side + "Crew").val());
        obj.Mass = parseInt($("#" + side + "Mass").text());
        if (obj.BayCount > 0)
            obj.Fighters = parseInt($("#" + side + "Ammo").val());
        if (obj.LauncherCount > 0)
            obj.Torpedos = parseInt($("#" + side + "Ammo").val());

        obj.ftrs = new Array(MAX_FIGHTERS);

        var hullId = $("#" + side + "Hull").val()
        var hull = vgap.getHull(hullId);

        obj.CrewMax = hull.crew;

        //Damage removes weapons
        if (obj.RaceId != 1 && obj.Damage > 0) {
            var max = Math.ceil((100 - obj.Damage) / 10);
            if (obj.RaceId == 2)
                max = Math.ceil((150 - obj.Damage) / 10);

            if (max < 0)
                max = 0;
            if (obj.BayCount > max)
                obj.BayCount = max;
            if (obj.LauncherCount > max)
                obj.LauncherCount = max;
            if (obj.BeamCount > max)
                obj.BeamCount = max;

        }
		/* end original */
        if (obj.RaceId == 1) {
            //fed crew bonus vgap.advActive(1)
            obj.Mass += 50;
            if (obj.BayCount > 0)
                obj.BayCount += 3;
        }

	if (obj.RaceId == 5) {
		// vgap.advActive(15)
		obj.BeamKillBonus=3;
	}
        //fascist beam bonus 36
        if (obj.RaceId == 4 && vgap.sim.DBC[side])
            obj.BeamChargeRate = 2;

        return obj;
    }


vcrSim.prototype.getPlanetCombatObject= function () {

		this.baseType = parseInt($("#StarbaseType").val()); //helmet
        this.validate("planet");

        var planetDefense = parseInt($("#PlanetDefense").val());
        var planetShield = parseInt($("#PlanetShield").val());
        var starbaseDefense = parseInt($("#StarbaseDefense").val());
        var beamTech = parseInt($("#StarbaseBeamTech").val());
        var starbaseFighters = parseInt($("#StarbaseFighters").val());
        this.hasStarbase = $("#PlanetStarbase").attr("checked");
		

		
        var totalDefense = planetDefense;
        if (this.hasStarbase)
            totalDefense += starbaseDefense;

        //mass
        var mass = 100 + totalDefense;
		if (this.hasStarbase && this.baseType==1) mass+=200; //helmet

        //# of beams
        var beams = Math.min(10, (Math.round(Math.sqrt(totalDefense / 3))));

        //beam type
        var beamtype = Math.round(Math.sqrt(planetDefense / 2));
        beamtype = Math.min(10, beamtype);
        if (this.hasStarbase) {
            if (beamTech > beamtype)
                beamtype = beamTech;
        }
        if (beamtype == 0)
            beamtype = 1;
        var beam = vgap.beams[beamtype - 1];

        //# of bays
        var bays = Math.floor(Math.sqrt(planetDefense));

        //# of fighters
        var fighters = Math.round(Math.sqrt(Math.max(0, planetDefense - 0.75)));
        if (this.hasStarbase) {
            bays += 5;
            fighters += starbaseFighters;
        }

        var obj = new combatObject();
        obj.init();
        obj.BayCount = bays;
        obj.BeamCount = beams;
        obj.BeamId = beam.id;
        obj.Mass = mass;
        obj.Shield = planetShield;
        obj.Fighters = fighters;
        obj.Crew = 10000;
        obj.ftrs = new Array(MAX_FIGHTERS);
        obj.hasstarbase = this.hasStarbase;

        return obj;
    }

//max base values per basetype (standard, radiation, mining)
maxDefense = new Array(200, 250, 50);
maxFighters = new Array(60, 80, 20);
maxBeamTech = new Array(10, 10, 1);

vcrSim.prototype.validate=function (side) {

        if (side == "planet") {
			
            this.v("PlanetDefense", 500);
            this.v("PlanetShield", 100);
            this.v("StarbaseDefense", maxDefense[this.baseType]); //helmet
            this.v("StarbaseBeamTech", maxBeamTech[this.baseType]); //helmet
            this.v("StarbaseFighters", maxFighters[this.baseType]); //helmet
        }
        else {

            var hullId = $("#" + side + "Hull").val()
            if (hullId == 0)
                return;
			var race = $("#" + side + "Race").val();
            var hull = vgap.getHull(hullId);

            this.v(side + "BeamCount", hull.beams);
            this.v(side + "TorpCount", hull.launchers);
            this.v(side + "Crew", hull.crew);
            this.v(side + "Ammo", hull.cargo);

            this.v(side + "Damage", (race==2?150:100)); //helmet
    		var damage = parseInt($("#"+side+"Damage").val()); //helmet
            this.v(side + "Shield", Math.max(0,100-damage));
        }
    }
}



var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);