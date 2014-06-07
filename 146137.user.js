// ==UserScript==
// @name        Planets.nu ship predictor
// @namespace   planets.nu
// @include     http://planets.nu/home
// @version     0.12
// @grant	none
// ==/UserScript==

// 0.1 pre-release, testing only
// 0.2 release, disabled faulty fuel predictions
// 0.3 fuel prediction, might still be inaccurate
// 0.4 cloaking fuel, new fuel prediction (including towed ships), next turn location calculated (not yet displayed)
// 0.5 works with big beefers ally sharing (including some very special circumstances), newly laid mine fields included to mine scoop
// 0.6 fix: double visualization of fuel change (but still deactivated - last minute bug)
// 0.7 fixed Cobol fuel calculation, added tow break, hyp and chunnelling to next turn destination
// 0.8 fixed several coding errors, towing ship adjusted, so circles (a ship towing its tower or its tower's tower etc) don't crash the UI
// 0.9 fixed another way to crash the ship screen
// 0.10 NRS produces fuel, Merlin uses Supplies
// 0.11 msc fix, adjusted to new server
// 0.12 Intercept fix, removed support for play.planets.nu (working on it)

function wrapper () { // wrapper for injection

if (typeof vgaPlanets.prototype.setupAddOn=="undefined") vgaPlanets.prototype.setupAddOn = function (addOnName) {
			if (vgaPlanets.prototype.addOns == null) vgaPlanets.prototype.addOns = {};
			vgaPlanets.prototype.addOns[addOnName] = {};
			vgaPlanets.prototype.addOns[addOnName].loadSettings = function () {
				var settings = localStorage.getItem(addOnName + ".settings");
				if (settings != null)
					vgaPlanets.prototype.addOns[addOnName].settings = JSON.parse(settings);
				else
					vgaPlanets.prototype.addOns[addOnName].settings = {};
			};
			vgaPlanets.prototype.addOns[addOnName].saveSettings = function () {
				localStorage.setItem(addOnName + ".settings", JSON.stringify(vgaPlanets.prototype.addOns[addOnName].settings));
			};
			vgaPlanets.prototype.addOns[addOnName].current = {};
			vgap.addOns.shipPredictor.loadSettings();	
		};
		
vgaPlanets.prototype.setupAddOn("shipPredictor");


vgaPlanets.prototype.addOns.shipPredictor.oldShowSettings = vgapDashboard.prototype.showSettings;

vgapDashboard.prototype.showSettings = function () {
	vgaPlanets.prototype.addOns.shipPredictor.oldShowSettings.apply(this,arguments);

	var s=vgap.addOns.shipPredictor.settings;
	var html="<br /><br /><h3>Settings for Ship Predictor</h3>";
	html += "<div id='ShipListModTable'><table>";
	html += "<td><input id='disableTow' type='checkbox' " + (s.disableShowTow?" checked ":"") + "onchange='vgap.addOns.shipPredictor.settings.disableShowTow=this.checked;' /> Disable show towing ships.</td>";
	html += "<td><input id='disablePrediction' type='checkbox' " + (s.disablePrediction?" checked ":"") + "onchange='vgap.addOns.shipPredictor.settings.disablePrediction=this.checked;' /> Disable ship prediction.</td>";
	html+="<td><div id='LaunchSim' onclick='vgap.addOns.shipPredictor.saveSettings();' title='Save settings'>Save Settings</div></td></tr></table><hr />";
	$('[onclick="vgap.resetTurn();"]').after(html);
	this.pane.jScrollPane();
};


//Ship predictor
vgapShipScreen.prototype.predictor=function (ship, forTowCalculation){ //be careful when calling 'this', needs the actual shipscreen!
	if (!ship) return;
	var hull=vgap.getHull(ship.hullid);
	var planet=vgap.planetAt(ship.x, ship.y);
	var starbase = null;
	if (planet) starbase = vgap.getStarbase(planet.id);
	var result={
		ammo:0,
		supplies:0,
		neutronium:0,
		duranium:0,
		tritanium:0,
		molybdenum:0,
		megacredits:0,
		damage:0,
		crew:0,
		cargo:0
	};
	var getCargo=function(){
		result.cargo=result.ammo+result.supplies+result.duranium+result.tritanium+result.molybdenum;
	};
	var cloakFuel= function () {
        if ((ship.mission == 9 || (vgap.player.raceid == 3 && ship.mission == 8 && hull.cancloak)) && ship.hullid != 29 && ship.hullid != 31)
            return Math.max(5, Math.floor((hull.mass / 100) * 5));
        else
            return 0;
	}

	//cloak - will it use fuel when it fails because of lack of fuel?
	result.neutronium-=Math.min(ship.neutronium+result.neutronium, cloakFuel());
	
	//build fighters
	getCargo();
	if (ship.bays>0 && vgap.player.raceid>8) {
		var race=vgap.player.raceid;	
		var loadedfighters=0;
		//load
		if (planet!=null && planet.ownerid==vgap.player.id && ship.friendlycode.toUpperCase()=="LFM" && ship.neutronium+result.neutronium>0) {
			loadedfighters=Math.min(Math.floor(planet.molybdenum/2), Math.floor(planet.tritanium/3), Math.floor(planet.supplies/5), Math.floor((hull.cargo-vgap.shipScreen.getTotalCargo(ship)-result.cargo)/10));
			if (loadedfighters>0){
				result.molybdenum+=loadedfighters*2;
				result.tritanium+=loadedfighters*3;
				result.supplies+=loadedfighters*5;
			}
		}
		//build
		var builtfighters=0;
		if ((ship.friendlycode.toUpperCase()=="LFM" && ship.neutronium+result.neutronium>0) || ((race==9||race==11) && ship.mission==8)) {	
			builtfighters=Math.min(Math.floor((ship.molybdenum+result.molybdenum)/2), Math.floor((ship.tritanium+result.tritanium)/3), Math.floor((ship.supplies+result.supplies)/5));
			if (builtfighters>0){
				result.molybdenum-=builtfighters*2;
				result.tritanium-=builtfighters*3;
				result.supplies-=builtfighters*5;
				result.ammo+=builtfighters;
			}
		}
	}
	
	//lady royale
	if (hull.id==42 && ship.neutronium>0)
	{
		result.megacredits+=Math.min(10000-(ship.megacredits+result.megacredits), ship.clans+result.clans);
	}

	//borg repair
	if (vgap.player.raceid==6 && ship.mission == 8 && ship.neutronium > 0 && ship.warp==0) result.damage-=Math.min(ship.damage, 10);

	//bdm
	var bdm=0;
	if (planet!=null) {
		if (ship.friendlycode.toUpperCase()=="BDM")	result.megacredits-=(ship.megacredits+result.megacredits);
		for (var i=0; i<vgap.shipScreen.ships.length; ++i){ //other ships (for bum calculation)
			var s=vgap.shipScreen.ships[i];
			if (s.ownerid!=vgap.player.id && !s.allyupdate) continue;
			if (s.friendlycode.toUpperCase()=="BDM") {
				bdm+=s.megacredits;
				if (s.allyupdate && s.hullid==42 && s.neutronium>0) bdm+=Math.min(10000-s.megacredits, s.clans); //allied Lady Royale
			}
		}		
	}
	
	//bum
	if (planet!=null && (planet.ownerid==0 || planet.ownerid==vgap.player.id || planet.allyupdate) && planet.friendlycode.toUpperCase()=="BUM"){
		var bum = planet.megacredits + bdm;
		for (var i=0; i<vgap.shipScreen.ships.length; ++i){ 
			var s=vgap.shipScreen.ships[i];
			if (s.id < ship.id && s.ownerid != vgap.player.id && !s.allyupdate) {
				bum=0; //can't handle foreign ships
				break;
			}
			if (s.id<ship.id) bum-=Math.min(10000-( s.friendlycode.toUpperCase()=="BDM" ? 0 : s.megacredits), bum);
			else break;
		} 
		if (bum>0) result.megacredits+=bum;
	}
	
	//gather missions (2do: other ships gathering before)
	getCargo();
	if (ship.neutronium > 0 && ship.mission>9 && ship.mission<15 && planet!=null && (planet.ownerid==0 || planet.ownerid==vgap.player.id)){ //2do? allied
		freecargo=hull.cargo-vgap.shipScreen.getTotalCargo(ship)-result.cargo;
		switch (ship.mission){
			case 10:
				if (planet.neutronium>0) result.neutronium+=Math.min(hull.fueltank-ship.neutronium-result.neutronium, planet.neutronium);
				break;
			case 11:
				if (planet.duranium>0) result.duranium+=Math.min(freecargo, planet.duranium);
				break;
			case 12:
				if (planet.tritanium>0) result.tritanium+=Math.min(freecargo, planet.tritanium);
				break;
			case 13:
				if (planet.molybdenum>0) result.molybdenum+=Math.min(freecargo, planet.molybdenum);
				break;
			case 14:
				if (planet.supplies>0) result.supplies+=Math.min(freecargo, planet.supplies);
				break;
			default: break;
		}
	}
	
	//alchemy
	if (hull.id == 105 && ship.friendlycode.toLowerCase() != "nal" && ship.neutronium > 0) //need fuel for that?
	{
		var alchemy=Math.floor((ship.supplies+result.supplies) / 9);
		result.supplies-=9*alchemy;
		switch (ship.friendlycode.toLowerCase()) {
			case "ald": 
				result.duranium+=3*alchemy;
				break;
			case "alt":
				result.tritanium+=3*alchemy;
				break;
			case "alm":
				result.molybdenum+=3*alchemy;
				break;
			default:
				result.duranium+=alchemy;
				result.tritanium+=alchemy;
				result.molybdenum+=alchemy;
				break;
		}
	}
	
	getCargo();
	//refinery NRS=104, Aries=97
	if ((hull.id == 104 || hull.id == 97) && ship.friendlycode.toLowerCase() != "nal" && ship.neutronium > 0) {//need fuel for that?
		var ref=Math.min(ship.duranium+result.duranium+ship.tritanium+result.tritanium+ship.molybdenum+result.molybdenum, hull.fueltank-(ship.neutronium+result.neutronium));
		if (hull.id == 104) {
			ref=Math.min(ref, ship.supplies);
			result.supplies-=ref;
		}
		result.neutronium+=ref;
		//how it's done
		var now=Math.min(ship.duranium+result.duranium, ref);
		result.duranium -= now; ref-=now;
		now=Math.min(ship.tritanium+result.tritanium, ref);
		result.tritanium -= now; ref-=now;
		now=Math.min(ship.molybdenum+result.molybdenum, ref);
		result.molybdenum -= now; ref-=now;
		if (ref!=0) {//whoops, something went wrong
		}
		
		/* that's how I'd do it...
		var a=[ship.duranium,ship.tritanium,ship.molybdenum];
		var k=0;
		while (ref>0) { 
			if (a[k]>0) {a[k]--; ref--};
			k=(k+1)%3;
		}

		result.duranium-=ship.duranium-a[0];
		result.tritanium-=ship.tritanium-a[1];
		result.molybdenum-=ship.molybdenum-a[2];
		*/
	}
	
	getCargo();	
	//lay mines
	if (ship.mission == 2 || (vgap.getPlayer(ship.ownerid).raceid == 7 && ship.mission == 8))
		result.ammo-=vgap.shipScreen.getMineLayTorps(ship);
	getCargo();	
	
	//scoop mines

	//create array of proposed minefields first
	if (ship.torps > 0 && ship.mission == 1 && ship.friendlycode.toLowerCase() == "msc" ){
		var minefields = new Array();
		for (var j = 0; j < vgap.minefields.length; j++) {
			var mf = vgap.minefields[j];
			minefields.push({ ownerid: mf.ownerid, x: mf.x, y: mf.y, radius: mf.radius, isweb: mf.isweb, units: mf.units, radiusPresweep: mf.radius });
		}
		//mine laying minefields (from preview)
		for (var i = 0; i < vgap.ships.length; i++) {
			var s = vgap.ships[i];
			if (s.ownerid != vgap.player.id && !s.allyupdate) continue;
			if (s.neutronium > 0 && s.ammo > 0 && s.torps > 0) {
				if (s.mission == 2 || (s.mission == 8 && vgap.player.raceid == 7)) {
					var isWeb = (s.mission == 8);

					var fieldOwnerId = s.ownerid;

					//miX friendlycode
					if (s.friendlycode.toLowerCase().indexOf("mi") === 0) {
						fieldOwnerId = vgap.getPlayerIdVal(s.friendlycode.toLowerCase().replace("mi", ""));
						if (fieldOwnerId == 0 || fieldOwnerId > vgap.game.slots)
							fieldOwnerId = s.ownerId;
					}
					var units = this.getMineUnits(s);

					//determine if we are inside of one of our minefields
					var minefield = null;
					var closest = 10000.0;
					for (var j = 0; j < minefields.length; j++) {
						var closestField = minefields[j];
						if (closestField.isweb == isWeb && closestField.ownerid == fieldOwnerId) {
							var dist = parseFloat(vgap.map.getDist(s.x, s.y, closestField.x, closestField.y));
							if (dist < closest) {
								minefield = closestField;
								closest = dist;
							}
							if (closest == 0)
								break;
						}
					}
					var newField = true;
					if (minefield != null) {
						if (closest <= minefield.radius)
							newField = false;
					}
					//new field
					if (newField) {
						minefield = { ownerid: fieldOwnerId, x: s.x, y: s.y, isweb: isWeb, units: 0 };
						minefields.push(minefield);
					}

					//add the units to the minefield
					minefield.units += units;
					minefield.changed = 1;

					//max minefield, don't lay so many torps
					if (minefield.units > 22500)
						minefield.units = 22500;

					minefield.radius = Math.sqrt(minefield.units);

				}
			}

		}
        var torp = vgap.getTorpedo(ship.torpedoid);
		getCargo();
        var openCargo = 0;
		var ammo=0;
		//look for scooping ships
		for (var i = 0; i < vgap.ships.length; i++) { 
			var s=vgap.ships[i];
			if (s.ownerid != vgap.player.id && !s.allyupdate) continue;
			if (s.friendlycode.toLowerCase() != "msc" || s.mission != 1 || s.torps < 1 || s.beams < 1 || s.neutronium < 1 ) continue;
			openCargo = vgap.getHull(s.hullid).cargo - vgap.shipScreen.getTotalCargo(s);
			if (s.id==ship.id) openCargo -= result.cargo; //2do? result for other ships
			for (var j = 0; j < minefields.length; j++) {
				var minefield = minefields[j];
				var dist = parseFloat(vgap.map.getDist(s.x, s.y, minefield.x, minefield.y));
				if (minefield.ownerid == s.ownerid && (dist - minefield.radius) <= 0) {
					//Mine scoop
					var unitsScooped = openCargo * s.torpedoid * s.torpedoid;
					if (vgap.player.raceid == 9)
						unitsScooped *= 4;

					if (unitsScooped > minefield.units)
						unitsScooped = minefield.units;

					if (unitsScooped > 0) {
						minefield.units -= unitsScooped;
						minefield.radius = Math.sqrt(minefield.units);
						minefield.swept = 1;
						if (minefield.units < 0)
							minefield.units = 0;

						if (vgap.player.raceid == 9)
							unitsScooped /= 4;

						ammo = Math.floor(unitsScooped / s.torpedoid / s.torpedoid);

						openCargo -= ammo;
						if (s.id==ship.id) result.ammo+=ammo;
					}
				}
			}
			if (s.id==ship.id) break;
		}
	}


	//Starbase fix
	if (starbase && starbase.shipmission == 1 && starbase.targetshipid == ship.id) {
		result.damage-=ship.damage;
		result.crew+=hull.crew-ship.crew;
	}

	//repair with supplies
	if (ship.damage+result.damage>0) {
		var rep=Math.floor(ship.supplies/5);
		rep=Math.min(rep, ship.damage+result.damage);
		result.supplies-=rep*5;
		result.damage-=rep;		
	}

	//mkt
	if (ship.torps>0 && ship.friendlycode.toUpperCase()=="MKT")
	{
		var cost=vgap.getTorpedo(ship.torpedoid).torpedocost;
		var mkt=Math.min(ship.duranium+result.duranium, ship.tritanium+result.duranium, ship.molybdenum+result.molybdenum, Math.floor((ship.megacredits+result.megacredits)/cost));
		result.ammo+=mkt;
		result.duranium-=mkt;
		result.tritanium-=mkt;		
		result.molybdenum-=mkt;
		result.megacredits-=mkt*cost;
	}
	getCargo();
	if (forTowCalculation) return result;
	
	//movement
	var x,y,dist;
	var a=vgap.getNextLoc(ship); //includes breakTow
	x=a[0], y=a[1], dist=a[2];
	var actFuel=ship.neutronium+result.neutronium;
	var actMass=hull.mass+vgap.shipScreen.getTotalCargo(ship)+result.cargo+actFuel;
	if (ship.warp > 0 && dist > 0) {
		actMass += (ship.beams > 0 ? vgap.getBeam(ship.beamid).mass * ship.beams : 0);
		actMass += (ship.torps > 0 ? vgap.getTorpedo(ship.torpedoid).mass * ship.torps : 0);
		if (ship.mission == 6 && ship.mission1target != 0 && actFuel>0) {
		    var towShip = vgap.getShip(ship.mission1target);
		    var towTarget=vgap.isTowTarget(ship.id);
		    if (towShip != null && (towTarget==null || towShip.id!=towTarget.id)) { //towee towing the tower?
				if (towShip.ownerid==vgap.player.id || towShip.allyupdate) {
					if (!vgap.breakTow(ship, towShip)){
						var resultTowship=this.predictor(towShip, true);
						var towMass=0;
						towMass += vgap.getHull(towShip.hullid).mass+vgap.shipScreen.getTotalCargo(towShip)+resultTowship.cargo+towShip.neutronium+resultTowship.neutronium;
						towMass += (towShip.beams > 0 ? vgap.getBeam(towShip.beamid).mass * towShip.beams : 0);
						towMass += (towShip.torps > 0 ? vgap.getTorpedo(towShip.torpedoid).mass * towShip.torps : 0);
						actMass += 10*Math.truncate(towMass/10); //according to http://donovansvgap.com/help/details.htm#fuel2
						//console.log(towMass);
					}
				}
				else actMass += 10*Math.truncate(towShip.mass/10);
			}
		}
		var speed=vgap.getSpeed(ship.warp, vgap.getHull(ship.hullid));
		var xv = (vgap.getEngine(ship.engineid)["warp"+ship.warp] || 0);
		var turnFuel=(vgap.isHyping(ship)||vgap.isChunnelling(ship) ? 50 : Math.floor(xv * Math.floor(actMass / 10) * ((Math.floor(dist) / speed) / 10000)));
		result.neutronium -= turnFuel;
		var color="green";
		if (ship.neutronium+result.neutronium<0 && !(vgap.isHyping(ship)||vgap.isChunnelling(ship))) { //correction for running out of fuel (experimental)
			result.neutronium=-ship.neutronium;
			var i=0, f=0;

			/*while (f<actFuel+1) {
				dist=i;
				i+=1;
				f=Math.floor(xv * Math.floor(actMass / 10) * (i / speed) / 10000);
				//console.log("dist: "+i+" fuel: "+f)
			}*/
			dist=actFuel/turnFuel*dist;
			a=vgap.getNextLoc(ship, dist);
			x=a[0], y=a[1], dist=a[2];
			color="red";
		}
		if (ship.x==x && ship.y==y) color="red";
		vgap.map.drawCircle(x, y,  3, { stroke: color, "stroke-width": 1, "stroke-opacity": "1" });
	}
	this.totalmass=actMass;

	//ramscoop (cobol)
	if (hull.id==96 && ship.warp > 0 && dist>0) {
		result.neutronium+=Math.min(Math.floor(dist)*2, hull.fueltank-(ship.neutronium+result.neutronium));
	}
	
	//radiation
	var radiation = vgap.shipScreen.getPathRadiation(ship);
        var crewDeath = vgap.shipScreen.radiationEffect(ship, radiation);
	if (crewDeath>0) result.crew-=Math.min(crewDeath, ship.crew+result.crew);

	//glory device
	var nextloc=vgap.getNextLoc(ship);
	var d=0;
	for (i=0; i<vgap.ships.length; i++){
		var s=vgap.ships[i];
		if (s.ownerid != vgap.player.id && !s.allyupdate) continue;
		var nextloc1=vgap.getNextLoc(s);
		if ((s.hullid==39 || s.hullid==41 || s.hullid==1034 || s.hullid==1039) && s.friendlycode.toUpperCase()=="POP" && nextloc[0]==nextloc1[0] && nextloc[1]==nextloc1[1]) {
			if (s.id==ship.id) result.damage=100;
			var factor=10000; //normal damage
			if (s.hullid%1000==39 && s.ownerid==ship.ownerid) factor=2000;	//D19b, D19c (20%)
			if (s.hullid==41 && s.ownerid==ship.ownerid) factor=1000; 		//saber (10%)
			if (s.hullid==1034) {
				if (s.ownerid==ship.ownerid) factor=2000;					//D7b (20%) 2do: "friendly ships" - whatever that is
				else factor=5000;											//50%
			}			
			result.damage+=Math.floor((factor)/(hull.mass+1));
			d++;
		}
		if (ship.damage+result.damage>100) {
			result.damage=100-ship.damage;
			break;
		};
	}
	
	//repair if glory
	if (d>0 && ship.damage+result.damage>0 && ship.damage+result.damage<100) {
		var rep=Math.floor(ship.supplies/5);
		result.supplies-=rep*5;
		result.damage-=rep;		
	}

	/* wait a minute, that's after movement (careful, needs to really get there!)	
	var target=vgap.getPlanetAt(x,y);
	var targetStarbase=vgap.getStarbase(target.id);
	//starbase unload all freighters 
	if (targetStarbase && targetStarbase.mission == 4) {
		result.duranium-=ship.duranium;
		result.tritanium-=ship.tritanium;
		result.molybdenum-=ship.molybdenum;
		result.supplies-=ship.supplies;
		result.clans-=ship.clans;
		result.megacredits-=ship.megacredits;
	}
	

	//starbase refuel - that means calculating fuel of all ships (with lower id with this as target
	//starbase load torps onto ships - similar here
	*/
	getCargo();

	var prediction={};
	if (result.neutronium!=0) prediction.neutronium=(result.neutronium>=0?"+":"")+result.neutronium;
	if (result.duranium!=0) prediction.duranium=(result.duranium>0?"+":"")+result.duranium;
	if (result.tritanium!=0) prediction.tritanium=(result.tritanium>0?"+":"")+result.tritanium;
	if (result.molybdenum!=0) prediction.molybdenum=(result.molybdenum>0?"+":"")+result.molybdenum;
	if (result.megacredits!=0) prediction.megacredits=(result.megacredits>0?"+":"")+result.megacredits;
	if (result.damage!=0) prediction.damage=(result.damage>0?"+":"")+result.damage;
	if (result.crew!=0) prediction.crew=(result.crew>0?"+":"")+result.crew;
	if (result.ammo!=0) prediction.ammo=(result.ammo>0?"+":"")+result.ammo;
	if (result.supplies!=0) prediction.supplies=(result.supplies>0?"+":"")+result.supplies;
	if (result.cargo!=0) prediction.cargo=(result.cargo>0?"+":"")+result.cargo;
	vgap.shipScreen.prediction=prediction;
	vgap.shipScreen.nextloc=[x,y];
	return result;
};

//Helpers

vgaPlanets.prototype.getNextLoc = function(ship, maxDist){ //2do? include chunnelling?
	if (!ship) return;
	var curX=ship.x, curY=ship.y;
	var tower = vgap.isTowTarget(ship.id);
	if (tower!=null && !vgap.breakTow(tower, ship) && ship.mission!=6) {
		var TowerLoc=this.getNextLoc(tower);
		TowerLoc[2]=0;	//didn't travel on own engine
		return TowerLoc;
	}
	if (vgap.isChunnelling(ship)) {
		var targetId = parseInt(ship.friendlycode, 10);
		var target = vgap.getShip(targetId);
		if (!target) return;
		return [target.x, target.y, 0];
	}
	if (vgap.isHyping(ship) && (!maxDist || maxDist!=350) ){ //catch recursion
		var hypdist=vgap.map.getDist(ship.x, ship.y, ship.targetx, ship.targety);
		if (hypdist > 360.05 || hypdist < 339.95) return this.getNextLoc(ship, 350);
		else return [ship.targetx, ship.targety, hypdist];
	}
	var endX=ship.targetx;
	var endY=ship.targety;
	if (ship.mission==7) {//intercept
		var interceptTarget = null;
        if (ship.mission1target != 0) {
            interceptTarget = vgap.getShip(ship.mission1target);
		if (interceptTarget.ownerid==vgap.player.id || interceptTarget.allyupdate) { //only ships that can be predicted correctly
			var a=this.getNextLoc(interceptTarget);
			endX=a[0]; endY=a[1];
		}
}
	}
	var diffX = endX - curX;
	var diffY = endY - curY;
	if (diffX==0 && diffY==0) return [curX, curY, 0];
	var totalDist=vgap.map.getDist(curX, curY, endX, endY);
	var speed=vgap.getSpeed(ship.warp, vgap.getHull(ship.hullid));
		//console.log("vorher: totalDist: "+totalDist+" maxDist: "+maxDist);

	if ((maxDist==null || maxDist>totalDist) && !(vgap.isHyping(ship) && maxDist==350)) { //enough fuel and not indirecthyping
		if (vgap.isHyping(ship)) speed=359.55;
		if 	(totalDist<speed+0.5) { //will arrive this turn
			var warpPlanet=vgap.warpWell(endX, endY);
			var hypThreeAway = vgap.isHyping(ship) && ( (Math.abs(warpPlanet.x - endX) == 3) || (Math.abs(warpPlanet.y - endY) == 3) );
			if (warpPlanet && speed>1 && !hypThreeAway) {endX=warpPlanet.x; endY=warpPlanet.y;}
			return [endX, endY, totalDist];
		}
		else totalDist=speed; //waypoint is longer than speed
	}
	else totalDist=maxDist;	//not enough fuel - experimental!!

	var newX, newY;
	if ( Math.abs(diffX) > Math.abs(diffY) ) {
		var moveX = Math.floor( (totalDist * diffX) / Math.sqrt((diffX * diffX) + (diffY * diffY)) + 0.5 );
		var moveY = Math.floor( moveX * (diffY / diffX) + 0.5);
		newX = curX + moveX;
		newY = curY + moveY;
	}
	else {
		var moveY = Math.floor( (totalDist * diffY) / Math.sqrt((diffX * diffX) + (diffY * diffY)) + 0.5 );
		var moveX = Math.floor( moveY * (diffX / diffY) + 0.5);
		newY = curY + moveY;
		newX = curX + moveX
	}
	var actDist=Math.sqrt( (moveX * moveX ) + ( moveY * moveY ) ); //actual distance travelled by own engine (for fuel calculation)
	var warpPlanet=vgap.warpWell(newX, newY);
	var hypThreeAway = vgap.isHyping(ship) && ( (Math.abs(warpPlanet.x - newX) == 3) || (Math.abs(warpPlanet.y - newY) == 3) );
	if (warpPlanet && speed>1 && !hypThreeAway) {newX=warpPlanet.x; newY=warpPlanet.y;}
	//console.log(newX+", "+newY+" actDist: "+actDist+" maxDist: "+maxDist);
	return [newX, newY, actDist];
};

vgaPlanets.prototype.warpWell = function (x, y) {// returns planet or false
        for (var i = 0; i < this.planets.length; i++) {
            var planet = this.planets[i];
            if (planet.debrisdisk > 0) continue;
			var dist = vgap.map.getDist(x, y, planet.x, planet.y);
            if (dist <= 3 && dist > 0)
                return planet;
        }
        return false;
    };
	
vgaPlanets.prototype.breakTow = function (tower, towee) {
	if (!tower || !towee) return;
	var towTarget=vgap.isTowTarget(towee.id)
	if (towTarget==null || tower.id != towTarget.id) return true; //2do: what if multiple ships tow? isTowTarget returns only the lowest id ship
	if (vgap.getHull(tower.hullid).engines==1) return true;
	var f1=((tower.hullid == 44 || tower.hullid == 45 || tower.hullid == 46)?2:1);
	var f2=((towee.hullid == 44 || towee.hullid == 45 || towee.hullid == 46)?2:1);
	if (f1*tower.warp < f2*tower.warp && vgap.map.getDist(towee.x, towee.y, towee.targetx, towee.targety) > vgap.getSpeed(towee.warp, towee.hullid) && towee.neutronium>=25) return true;
	return false;
};

vgaPlanets.prototype.isChunnelling = function (ship) {
        if ((ship.hullid == 56 || ship.hullid == 1055) && ship.warp == 0 && ship.neutronium >= 50 && ship.mission != 6) {
            if (this.isTowTarget(ship.id) == null) {
                var RegExPattern = /([0-9])([0-9])([0-9])/;
                var matchExpression = ship.friendlycode;
                matchExpression = matchExpression.toString();
                if ((matchExpression.match(RegExPattern)) && (matchExpression != '')) {
                    var targetId = parseInt(ship.friendlycode, 10);
                    var target = vgap.getShip(targetId);
                    if (target != null) {
                        if (target.ownerid == ship.ownerid && (target.hullid == 56 || target.hullid == 1054 || (ship.hullid==1055 && target.hullid==51)) && target.warp == 0 && target.neutronium >= 1 && target.mission != 6 && vgap.map.getDist(ship.x, ship.y, target.x, target.y) >= 100 && this.isTowTarget(target.id) == null)
                            return true;
                    }
                }
            }
        }
        return false;
    };

var old_hotkey = vgaPlanets.prototype.hotkey;
vgaPlanets.prototype.hotkey = function (ev){
	old_hotkey.apply(this, arguments);
	//arrows
    if (ev.keyCode >= 37 && ev.keyCode <= 40 && this.shipScreenOpen) {
        this.shipScreen.loadMovement();
    }
};

vgapShipScreen.prototype.chunnel = function () {

        var count = 0;

        var html = "<div id='SelectLocation'>";
        html += "<h1>Initiate Warp Chunnel</h1>";
        if (this.ship.hullid==56) html += "<p>You can open a worm hole to a Chunnel Target (another Firecloud Class Cruiser or a B41b Explorer) and transport this ship and any ships at the same location to the Chunnel Target.</p>";
		if (this.ship.hullid==1055) html += "<p>You can open a worm hole to a Chunnel Target (Firecloud Class Cruiser, B41b Explorer or B200 Probe) and transport this ship to the Chunnel Target.</p>";
        html += "<p>Requirements for chunnel:<ul><li>At least 50 fuel on initiator</li><li>At least 1 fuel on target</li><li>Both ships Warp 0</li><li>Both ships not towing, or towed</li><li>At least 100 ly apart</li></ul></p>";
        html += "<p>Warning: If this ship is towed, this will break the tow</p>";
        html += "<p>The following Chunnel Targets meet these requirements:</p>";

        if (this.ship.neutronium < 50) {
            html += "<div class='WarnText'>You do not have enough fuel to initiate a chunnel.</div>";
        }
        else if (this.ship.mission == 6) {
            html += "<div class='WarnText'>You can not initiate a warp chunnel while towing another ship.</div>";
        }
        else {
            for (var i = 0; i < vgap.myships.length; i++) {
                var target = vgap.myships[i];
                var towship = vgap.isTowTarget(this.ship.id);

                if (towship != null) {
                    towship.mission = 0;
                    towship.changed = 1;
                    this.loadMovement();
                }
                if (target.warp == 0 && (target.hullid == 56 || target.hullid == 1054 || (this.ship.hullid==1055 && target.hullid==51)) && target.mission != 6 && target.neutronium > 0 && vgap.isTowTarget(target.id) == null) {
                    var dist = vgap.map.getDist(this.ship.x, this.ship.y, target.x, target.y);
                    if (dist >= 100) {
                        html += vgap.shipScan(target, "vgap.shipScreen.initChunnel(" + target.id + ");");
                        count++;
                    }
                }
            }
        }
        if (count == 0)
            html += "<div class='WarnText'>No Chunnel Targets meet the requirements.</div>";
        html += "</div>";
        html += "<a class='MoreBack' onclick='vgap.closeMore();return false;'>Cancel</a>";

        vgap.more.empty();
        $(html).appendTo(vgap.more);
        vgap.showMore(300);
        $("#SelectLocation").height($(window).height() - 100);
        $("#SelectLocation").jScrollPane();
    };

var old_loadStatus=vgapShipScreen.prototype.loadStatus;
vgapShipScreen.prototype.loadStatus=function(){
	old_loadStatus.apply(this, arguments);
	if (!vgap.addOns.shipPredictor.settings.disablePrediction) {
		vgap.shipScreen.predictor(this.ship);
		if (this.prediction.ammo) {
			var auxVal = this.hull.fighterbays + " Fighter Bays";
			var ammoText = "Fighters";
			if (this.hull.launchers > 0) {
				var torpedo = vgap.getTorpedo(this.ship.torpedoid);
				if (torpedo != null)
					auxVal = this.ship.torps + " " + torpedo.name;
				else
					auxVal = "? torpedos";
			    	ammoText = "Torpedos";
				$("#ShipStatus tr:contains('Torpedos')").html("<td class='textval'>" + auxVal + "</td><td class='headright'>" + ammoText + "</td><td class='val'>" + this.ship.ammo + " <small>("+this.prediction.ammo+")</small></td>");
			}
			else
				$("#ShipStatus tr:contains('Fighters')").html("<td class='textval'>" + auxVal + "</td><td class='headright'>" + ammoText + "</td><td class='val'>" + this.ship.ammo + " <small>("+this.prediction.ammo+")</small></td>");
		}
		if (this.prediction.crew){
		        var crewCls = "";
			if (this.ship.crew < this.hull.crew)
			    crewCls = "BadText";
			$("#ShipStatus td:contains('Crew')").next().html("<span class='" + crewCls + "'>" + this.ship.crew + "/" + this.hull.crew + "</span> <small>("+this.prediction.crew+")</small>");
		}
		if (this.prediction.damage) {
			var damText = this.ship.damage + "% <small>("+this.prediction.damage+"%)</small>";
			if (this.ship.damage > 0 || this.prediction.damage > 0)
		    		damText = "<span class='BadText'>" + damText + "</span>";
			$("#ShipStatus td:contains('Damage')").next().html(damText);
		}
		$(".val").width("25%");
	}
	else if (this.prediction) delete this.prediction;
};

vgapShipScreen.prototype.setCargoTitle= function () {
        var ship = this.ship;
        var totalCargo = this.getTotalCargo(ship);
        $("#CargoTitle").text("Cargo: " + totalCargo + " / " + this.hull.cargo + (this.prediction && this.prediction.cargo?" ("+this.prediction.cargo+")":""));
    }

var old_loadCargo=vgapShipScreen.prototype.loadCargo;
vgapShipScreen.prototype.loadCargo=function(){
	old_loadCargo.apply(this, arguments);
	if (this.prediction) {
		this.loadStatus();
		vgap.shipScreen.setCargoTitle();
		if (this.prediction.duranium) $("#ShipCargo td:contains('Duranium')").next().html(this.ship.duranium + " kt <small>("+this.prediction.duranium+" kt)</small>");
		if (this.prediction.tritanium) $("#ShipCargo td:contains('Tritanium')").next().html(this.ship.tritanium + " kt <small>("+this.prediction.tritanium+" kt)</small>");
		if (this.prediction.molybdenum) $("#ShipCargo td:contains('Molybdenum')").next().html(this.ship.molybdenum + " kt <small>("+this.prediction.molybdenum+" kt)</small>");
		if (this.prediction.megacredits) $("#ShipCargo td:contains('Megacredits')").next().html(this.ship.megacredits + " <small>("+this.prediction.megacredits+")</small>");
		if (this.prediction.clans) $("#ShipCargo td:contains('Colonists')").next().html(this.ship.clans + " <small>("+this.prediction.clans+")</small>");
		if (this.prediction.supplies) $("#ShipCargo td:contains('Supplies')").next().html(this.ship.supplies + " kt <small>("+this.prediction.supplies+" kt)</small>");

		$(".val").width("25%");
	}
};

var old_loadOrders=vgapShipScreen.prototype.loadOrders;
vgapShipScreen.prototype.loadOrders=function(){
	old_loadOrders.apply(this, arguments);
	if (this.prediction){ 
		this.loadCargo();
	}
};
var old_loadMovement=vgapShipScreen.prototype.loadMovement;
vgapShipScreen.prototype.loadMovement=function(){
	//chunnel lines for new chunnel ship
	if (this.ship.hullid == 1055) vgap.map.draw();
	old_loadMovement.apply(this, arguments);
	if (this.prediction){
		this.loadStatus();
		if (this.prediction.neutronium) {		
			var h=this.ship.neutronium + "<span> / " + this.hull.fueltank + "</span> <small>(" + this.prediction.neutronium + ")</small>";
			$("#FuelStatus").children(".BoxVal").html(h)
		}
		if (this.totalmass) $("td:contains('Total Mass')").next().html(this.totalmass+" kt");
		if (this.nextloc) {
			var nextturnloc="Deep Space";
			var curX=this.nextloc[0]; var curY=this.nextloc[1];
			var dist=this.nextloc[2];
			target = vgap.getTarget(curX, curY);
			if (target != null)
				nextturnloc = target.name.substr(0, 20);
			else if (vgap.warpWell(curX, curY))
				nextturnloc = "Warp Well";                            
			nextturnloc += " (" + curX + ", " + curY + ")";

			if (vgap.isHyping(this.ship) && (dist > 360.05 || dist < 339.95)) {
				var last = vgap.getPath(this.ship)[0];
				var hx = last.x1 + (last.x2-last.x1) * 350 / last.dist;
				var hy = last.y1 + (last.y2-last.y1) * 350 / last.dist;
				nextturnloc = "HYP: Approx. (" + Math.round(hx) + ", " + Math.round(hy) + ")";
			}
			if ($("td:contains('Next Turn')").html()==null) $("td:contains('Waypoint')").parent().after("<td>Next Turn:</td><td class='textval'></td>");
			$("td:contains('Next Turn')").next().html(nextturnloc);
		}
	}
};

var old_changeFC=vgapShipScreen.prototype.changeFC;
vgapShipScreen.prototype.changeFC=function () {
	old_changeFC.apply(this, arguments);
	this.loadStatus();
	this.loadCargo();
};



//show towing/towed ships in shipscreen
var old_loadShipScreen=vgapShipScreen.prototype.load;
vgapShipScreen.prototype.load=function(ship){
	old_loadShipScreen.apply(this, arguments);
	if (!vgap.addOns.shipPredictor.settings.disableShowTow) {
		var ships=vgap.shipScreen.ships;
		var kids=$("#FleetContainer").children();
		var act=0;
		var styletext={0:"1px solid transparent", 1:"1px dashed ", 2:"1px solid ", 3:"3px double #ff0000"};
		var colors=["#ff00ff", "#ffffff", "#0000ff", "#00ff00", "#00ffff", "#ffff00", "#ff6600", "#ffccff", "#669966", "#666699"];
		var c=0, a; //color-ids
		var tow={};
		var size="";
		for (var i=0;i<kids.length;++i){
			size=kids[i].style["width"];
			var style=0;
			if (kids[i].src.match(/hulls/)!=null) { //planet or starbase icon
				var id=ships[act].id;		
				//console.log(i+" "+act+" "+id);
				var tower = vgap.isTowTarget(id);
				if (tower != null) { //being towed
					style++;
					a=(tow[tower.id]?tow[tower.id].c:c);
					tow[tower.id]={"id":id,"c":a};
					if (multipleTowTargets(id)>1) style+=2;
				}
				var towTarget = null;
				if (ships[act].mission1target != 0) towTarget = vgap.getShip(ships[act].mission1target);
				if (ships[act].mission == 6 && towTarget != null) { //towing
					style+=2;
					a=(tow[id]?tow[id].c:c);
					tow[id]={"id":towTarget.id,"c":a};
				}
				++act; //in shiplist
			}
			if (style>-1) {
				size=parseInt(size.replace(/px/,""))-3+"px";
				if (style>=3) {style=3;	size=parseInt(size.replace(/px/,""))-4+"px";}
				kids[i].setAttribute("style", "height:"+size+"; width:"+size+"; border:"+styletext[style]+(style<3&&style>0?colors[a]:""));
				if (style>0) c++;
				if (c>colors.length) c=0;
			}
		}
		//console.log(tow);
	}
};
vgapShipScreen.prototype.isTowTarget = function (shipId) {
        for (var i = 0; i < vgap.ships.length; i++) {
            var ship = vgap.ships[i];
			if (ship.ownerid != vgap.player.id && !ship.allyupdate) continue;
            if (ship.mission == 6 && ship.mission1target == shipId)
                return ship;
        }
        return null;
    };

var multipleTowTargets=function (shipId) {
	var n=0;
	for (var i = 0; i < vgap.ships.length; i++) {
		var ship = vgap.ships[i];
		if (ship.ownerid != vgap.player.id && !ship.allyupdate) continue;
		if (ship.mission == 6 && ship.mission1target == shipId)	n++;
	}
	return n;
};

//Standard Hull Name

var old_changeName=vgapShipScreen.prototype.changeName;
vgapShipScreen.prototype.changeName=function(){
	old_changeName.apply(this, arguments);
	$("<a class='MoreBack' onclick='vgap.shipScreen.changeShipName(true);vgap.closeMore();return false;'>Hull Name</a>").appendTo("#MoreScreen");
};

vgapShipScreen.prototype.changeShipName= function (hullName) {
	if (!hullName) this.ship.name = vgap.cleanUserInput($("#ShipNameText").val());
	else this.ship.name=this.hull.name.toUpperCase();
        $("#ShipTitle").html(this.ship.id + ": " + this.ship.name);
};

} //Wrapper


var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
