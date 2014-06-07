// ==UserScript==
// @name           Kosmonymous' Combat Calculator
// @description    Odds estimator for the Battle Simulator
// @include        http://play.planets.nu/*
// @version        0.2
// ==/UserScript==

function wrapper () { // wrapper for injection

oldVcrProto = vgapMap.prototype.drawExplosions;
oldVcrProto = vcrSim.prototype.init;

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

vcrSim.prototype.init = function (isSim) {

    vcrSim.prototype.stopSim = function () {
        if (!this.player)
            return;

        this.stop();

        //resize to window mode
        this.container.width(900);
        this.container.height(700);
        this.content.css("padding", "10px");
        this.battlefield.height(200);
        this.battlefield.width(880);

        this.leftImg.width(200).height(200);
        this.leftImg.css({ top: 0, left: 0 });
        this.rightImg.width(200).height(200);
        this.rightImg.css({ left: "", right: 0, top: 0 });
        this.baseImg.hide();
        this.distText.hide();

        //show planet and ship selectors
        this.leftSide.show();
        if (this.vsPlanet)
            this.planetSide.show();
        else
            this.rightSide.show();

        //clear the screen
        this.container.center();
        this.paper.clear();

    };

    vcrSim.prototype.close = function () {
        vgap.startMusic();
        this.stop();
        this.container.remove();
        this.calculatorContainer.remove();
        vgap.showDashboard();
    };

    vcrSim.prototype.addToFleet = function (side) {
	if (side == 'Left') {
		if (typeof(this.fleet1) === 'undefined')
			this.fleet1 = new Array();
		var ship = this.getCombatObject("Left");
		ship.BattleValue = $("#LeftBattleValue").val();
		ship.HullId = $("#" + side + "Hull").val();
		this.fleet1.push(ship);
	} else if (side == 'Right') {
		if (typeof(this.fleet2) === 'undefined')
			this.fleet2 = new Array();
		var ship = this.getCombatObject("Right");
		ship.BattleValue = $("#RightBattleValue").val();
		ship.HullId = $("#" + side + "Hull").val();
		this.fleet2.push(ship);
	}
    }

    vcrSim.prototype.clearFleet = function (side) {
	if (side == 'Left') {
		this.fleet1 = new Array();
	} else if (side == 'Right') {
		this.fleet2 = new Array();
	}
    };

    vcrSim.prototype.runFleetSimulation = function (visual) {	
	if(typeof(visual) == 'undefined') this.visual = false;
	else this.visual = true;

	//validation
	if (!this.vsPlanet && ($("#LeftHull").val() == 0 || $("#RightHull").val() == 0))
	    return;

	if (this.vsPlanet && $("#LeftHull").val() == 0)
	    return;

	if (this.visual == false)
		this.calculatorContainer.show();

/*	this.fleet1 = new Array();
	this.fleet1[0] = this.getCombatObject("Left");
	this.fleet2 = new Array();
	this.fleet2[0] = this.getCombatObject("Right");
	this.fleet2[1] = this.getCombatObject("Right");*/
	this.simCount = 0;
	this.simRounds = parseInt($("#CalculatorRounds").val());
	if (this.visual == true)
		this.simRounds = 1;
	this.totalSimRounds = 0;
	this.leftLost = 0;
	this.particleEngineRunning = false;

	while(vgap.sim.calculatorTable.rows.length) {
		vgap.sim.calculatorTable.deleteRow(0);		
	}

	this.runFleetSimulationRecur();
    };

    vcrSim.prototype.runSimForFleet =  function () {


        //resize the screen
        this.resizeForVCR();

        //show base image if needed
/*        if (this.vsPlanet && this.hasStarbase)
            this.baseImg.show();
        else
            this.baseImg.hide();*/

        //run
        this.runVisualFleet();

    };

    vcrSim.prototype.fleetFinished = function () {
	this.results = this.player.results;
	this.runFinished = true;
	this.stopped = true;
	this.runFleetRound();
	};

    vcrSim.prototype.runVisualFleet = function () {

        //clear any old stuff
        this.paper.clear();

        //initialize the visual elements
        this.left.ftrs = new Array(MAX_FIGHTERS);
        this.right.ftrs = new Array(MAX_FIGHTERS);

        this.left.status = new vcrShipStatus();
        this.left.status.draw(this.paper, this.left, this.screenX(0), this.screenY(300), 1);
        this.right.status = new vcrShipStatus();
        this.right.status.draw(this.paper, this.right, this.screenX(600), this.screenY(300), -1);

        this.topFighter = this.screenY(this.rand(50) + 10);
        this.fighterSep = this.screenY(this.rand(10) + 3);
        this.particles = new Array();
        this.shipStatus = this.paper.set();

        //flags
        this.finale = false;
        this.bayIndex = 0;
        this.stopped = false;
        this.runFinished = false;

        //initialize the vcr player itself (the host battle emulator)
//	if (typeof(this.player) !== 'undefined') {
//		this.stopped = true;
//	}
        this.player = new vcrPlayer();
        this.player.init( this.left , this.right, this.battleType, this.seed);
        //this.player.cycleComplete = function () { vgap.sim.updateSim(); };
        this.player.finished = function () { vgap.sim.fleetFinished(); };
        this.player.wait = this.wait;

	this.leftImg.attr("src", hullLeftImg(this.left.HullId));
	this.rightImg.attr("src", hullImg(this.right.HullId));

        //Start the emulator and the visual
        this.player.run();
	if (this.particleEngineRunning === false)
	        this.runParticleEngine(); //culprit, depends on vgap.sim stopped and because we continue this continues also
    };

    vcrSim.prototype.runFleetSimulationRecur = function () {	
	if (this.simCount > 0) {
		if (this.fleet1Iterator == this.fleet1.length && this.fleet2Iterator == this.fleet2.length) {
			this.appendResult(100,100);
			this.leftLost++;
			// both lost
		} else if (this.fleet1Iterator == this.fleet1.length) {
			this.appendResult(100,0);
			this.leftLost++;
			// fleet1 lost
		} else if (this.fleet2Iterator == this.fleet2.length) {
			this.appendResult(0,100);
			// fleet2 lost
		}

		var newtitle = "Left side wins " + (this.totalSimRounds-this.leftLost) + " out of " + this.totalSimRounds;
		var header = document.getElementById("CalculatorOddsText");
		header.firstChild.nodeValue=newtitle;
		// todo handle results
	}

	if (this.simCount < this.simRounds) {
		this.simCount++;
		this.totalSimRounds++;
//		this.fleet1Temp = new Array();
//		this.fleet1Temp[0] = clone(this.fleet1[0]);
		this.fleet1Temp = clone(this.fleet1);
		this.fleet1Iterator = 0;
//		this.fleet2Temp = new Array();
//		this.fleet2Temp[0] = clone(this.fleet2[0]);
		this.fleet2Temp = clone(this.fleet2);
		this.fleet2Iterator = 0;
		this.results = new Array();

		this.runFleetRound();
	}
    };

    vcrSim.prototype.updateShipStats = function (obj) {
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

	} else {
	    obj.Shield += 25;
	    if (obj.Shield > 100) {
		obj.Shield = 100;
	    }
	}

	if (obj.massAdded === true) {
		obj.Mass -= 360;
		obj.massAdded = false;
	}
    }


    vcrSim.prototype.runFleetRound = function () {	
	var fi1temp = this.fleet1Iterator;
	var fi2temp = this.fleet2Iterator;
	for (var i = 0; i < this.results.length; i++) {
		if (this.results[i] == "Left Destroyed" || this.results[i] == "Left Captured") {
			if (this.fleet1Temp[fi1temp].BattleValue <= this.fleet2Temp[fi2temp].BattleValue) {
				this.fleet1Iterator++;
			} else {
				this.fleet2Iterator++;
			}
		} 

		if (this.results[i] == "Right Destroyed" || this.results[i] == "Right Captured") {
			if (this.fleet1Temp[fi1temp].BattleValue <= this.fleet2Temp[fi2temp].BattleValue) {
				this.fleet2Iterator++;
			} else {
				this.fleet1Iterator++;
			}
		}
	} 

	if (this.fleet1Iterator > fi1temp || this.fleet2Iterator > fi2temp) {
		this.updateShipStats(this.fleet1Temp[fi1temp]);
		this.updateShipStats(this.fleet2Temp[fi2temp]);
	}

	if (this.fleet1Iterator == this.fleet1Temp.length || this.fleet2Iterator == this.fleet2Temp.length) {
		this.runFleetSimulationRecur();
		return;
	}

	if (this.visual == false) {
		this.battleType = SHIP_TO_SHIP;
		this.player = new vcrPlayer();
		this.seed = this.rand(RANDOM_SIZE);
		var left;
		var right;
		if (this.fleet1Temp[this.fleet1Iterator].BattleValue <= this.fleet2Temp[this.fleet2Iterator].BattleValue) {
		left = this.fleet1Temp[this.fleet1Iterator];
		right = this.fleet2Temp[this.fleet2Iterator];
		} else {
			right = this.fleet1Temp[this.fleet1Iterator];
			left = this.fleet2Temp[this.fleet2Iterator];
		}
//		var left = this.fleet1Temp[this.fleet1Iterator];
//		var right = this.fleet2Temp[this.fleet2Iterator];

		// fixme: this might add multiple times 
		if (this.battleType == SHIP_TO_SHIP) {
		    //bonus for right hand side against carrier
		    if (left.BayCount > 0 && right.Mass >= 140) {
			if (this.rand(100) <= 60) {
			    right.Mass += 360;
			    right.massAdded = true;
		        }			    
		    }
		}

		this.player.initFast(left, right, this.battleType, this.seed);
		this.player.finished = function () { vgap.sim.finished(); };
		this.player.wait = this.wait;

		this.player.runShipRound();
	} else if (this.visual == true) {
		//setup the combat objects
		if (this.fleet1Temp[this.fleet1Iterator].BattleValue <= this.fleet2Temp[this.fleet2Iterator].BattleValue) {
			this.left = this.fleet1Temp[this.fleet1Iterator];
			this.right = this.fleet2Temp[this.fleet2Iterator];
		} else {
			this.right = this.fleet1Temp[this.fleet1Iterator];
			this.left = this.fleet2Temp[this.fleet2Iterator];
		}
		this.battleType = SHIP_TO_SHIP;

		if (this.battleType == SHIP_TO_SHIP) {
		    //bonus for right hand side against carrier
		    if (this.left.BayCount > 0 && this.right.Mass >= 140) {
			if (this.rand(100) <= 60) {
			    this.right.Mass += 360;
			    this.right.massAdded = true;
		        }			    
		    }
		}

		// todo carrier mass addition

/*		if (this.vsPlanet) {
		    this.battleType = SHIP_TO_PLANET;
		    this.right = this.getPlanetCombatObject();
		}
		else {
		    this.right = this.getCombatObject("Right");

		    //bonus for right hand side against carrier
		    if (this.left.BayCount > 0 && this.right.Mass >= 140) {
		        if (this.rand(100) <= 60)
		            this.right.Mass += 360;
		    }
		}*/

		//set random seed
		this.seed = this.rand(RANDOM_SIZE);

		this.runSimForFleet();
	}
    };

	

//    vcrSim.prototype.runFleetRoundRecur = function () {	

//	}

    vcrPlayer.prototype.runShipRound = function () {	
//	this.results = new Array();

	this.runShipRoundRecur();
	};

    vcrPlayer.prototype.runShipRoundRecur = function () {	

        var stillFighting = this.PlayCycleFast();

        if (this.stopped)
            return;

        if (stillFighting) {
            setTimeout(function () { vgap.sim.player.runShipRoundRecur(); });
            return;
        }

        vgap.sim.results = this.FinishUp();
//        this.finished();

	vgap.sim.runFleetRound();
	};

    vcrSim.prototype.runNonVisual = function () {

	this.left = this.getCombatObject("Left");
	this.battleType = SHIP_TO_SHIP;
	if (this.vsPlanet) {
	    this.battleType = SHIP_TO_PLANET;
	    this.right = this.getPlanetCombatObject();
	}
	else {
	    this.right = this.getCombatObject("Right");

	    //bonus for right hand side against carrier
/*	    if (this.left.BayCount > 0 && this.right.Mass >= 140) {
	        if (this.rand(100) <= 60)
	            this.right.Mass += 360;
	    }*/
	}

        //clear any old stuff

        //initialize the visual elements
        this.left.ftrs = new Array(MAX_FIGHTERS);
        this.right.ftrs = new Array(MAX_FIGHTERS);

        this.left.status = new vcrShipStatus();
        this.right.status = new vcrShipStatus();

        this.topFighter = this.screenY(this.rand(50) + 10);
        this.fighterSep = this.screenY(this.rand(10) + 3);
        this.particles = new Array();

        //flags
        this.finale = false;
        this.bayIndex = 0;
        this.stopped = false;
        this.runFinished = false;

	this.fleet1 = new Array();
	this.fleet1[0] = this.left;
	this.fleet2 = new Array();
	this.fleet2[0] = this.right;
	this.fleet2[1] = this.right;
	this.fleet2shipsDestroyed = 0;
	this.simCount = 0;
	this.simRounds = parseInt($("#CalculatorRounds").val());
	this.totalSimRounds = 0;
	this.leftLost = 0;

	while(vgap.sim.calculatorTable.rows.length) {
		vgap.sim.calculatorTable.deleteRow(0);		
	}

	this.runNonVisualRecur();
    };

    vcrSim.prototype.runNonVisualRecur = function () {
	if (this.simCount < this.simRounds) {
		if (this.fleet2shipsDestroyed == 1) {
			var left = this.player.Objects[0];
			this.player = new vcrPlayer();
			this.seed = this.rand(RANDOM_SIZE);
			var right = clone(this.fleet2[1]);

			if (this.battleType = SHIP_TO_SHIP) {
			    //bonus for right hand side against carrier
			    if (left.BayCount > 0 && right.Mass >= 140) {
				if (this.rand(100) <= 60)
				    right.Mass += 360;
			    }
			}

	//		this.player.initFast(this.fleet1[0], this.fleet2[0], this.battleType, this.seed);
			this.player.initFast(left, right, this.battleType, this.seed);
			this.player.finished = function () { vgap.sim.finished(); };
			this.player.wait = this.wait;

			this.player.runFast();
		} else 
		{
			this.fleet2shipsDestroyed = 0;
			this.simCount++;
			vgap.sim.totalSimRounds++;

			this.player = new vcrPlayer();
			this.seed = this.rand(RANDOM_SIZE);
			var left = clone(this.fleet1[0]);
			var right = clone(this.fleet2[0]);

			if (this.battleType = SHIP_TO_SHIP) {
			    //bonus for right hand side against carrier
			    if (left.BayCount > 0 && right.Mass >= 140) {
				if (this.rand(100) <= 60)
				    right.Mass += 360;
			    }
			}

	//		this.player.initFast(this.fleet1[0], this.fleet2[0], this.battleType, this.seed);
			this.player.initFast(left, right, this.battleType, this.seed);
			this.player.finished = function () { vgap.sim.finished(); };
			this.player.wait = this.wait;

			this.player.runFast();
		}
	}

	if (this.totalSimRounds > 0) {
//		var newtitle = "Left side odds: " + (this.totalSimRounds-this.leftLost)/this.totalSimRounds;
		var newtitle = "Left side wins " + (this.totalSimRounds-this.leftLost) + " out of " + this.totalSimRounds;
		var header = document.getElementById("CalculatorOddsText");
		header.firstChild.nodeValue=newtitle;
	}
    };


	vcrPlayer.prototype.initFast = function (leftSide, rightSide, battleType, seed) {
		this.Objects = [leftSide, rightSide];

		this.stopped = false;
		this.Time = 0;
		this.BattleType = battleType;
		this.Seed = seed % RANDOM_SIZE;

		this.Objects[0].CurrentX = 30;       // left ship location
		if (this.BattleType == SHIP_TO_SHIP) //ship to ship
		    this.Objects[1].CurrentX = 610;   //right ship location
		else
		    this.Objects[1].CurrentX = 570;   //planet location

		//this.Objects[0].Shield = Math.min(leftSide.Shield, 100 - leftSide.Damage);
		//this.Objects[1].Shield = Math.min(rightSide.Shield, 100 - rightSide.Damage);
		//                if (this.Objects[0].RaceId == 4)
		//                    this.Objects[0].Shield += 100;
		//                if (this.Objects[1].RaceId == 4)
		//                    this.Objects[1].Shield += 100;

		//if (this.Objects[0].Shield < 0 || this.IsFreighter(0))
		//    this.Objects[0].Shield = 0;

		//if (this.BattleType == SHIP_TO_SHIP) {
		//    if (this.IsFreighter(1))
		//        this.Objects[1].Shield = 0;
		//}
		//else {
		//    if (this.Objects[1].Crew <= 0)
		//        this.Objects[1].Shield = 0;
		//}
		//if (this.Objects[1].Shield < 0)
		//    this.Objects[1].Shield = 0;


		this.PreloadWeapons(0);
		this.PreloadWeapons(1);

		this.Objects[0].DamageLimit = this.Objects[0].RaceId == 2 ? 151 : 100;
		if (this.BattleType != SHIP_TO_PLANET)
		    this.Objects[1].DamageLimit = this.Objects[1].RaceId == 2 ? 151 : 100;

	};


//    vcrPlayer.prototype.simulateFleetBattle = function () {
//	}

	
    vcrSim.prototype.appendResult = function (leftDamage, rightDamage) {
	var rowCount = vgap.sim.calculatorTable.rows.length;

	var row = vgap.sim.calculatorTable.insertRow(rowCount);
	var cell1 = row.insertCell(0);	
	var element = document.createElement("P");
	var text = document.createTextNode(leftDamage);
	element.appendChild(text);
	cell1.appendChild(element);
	var cell2 = row.insertCell(1);	
	element = document.createElement("P");
	text = document.createTextNode("VS");
	element.appendChild(text);
	cell2.appendChild(element);
	var cell3 = row.insertCell(2);	
	element = document.createElement("P");
	text = document.createTextNode(rightDamage);
	element.appendChild(text);
	cell3.appendChild(element);

	this.calculatorPane.data('jsp').reinitialise();
    };


    vcrPlayer.prototype.runFast = function (wait) {
	

        if (wait)
            this.wait = wait;

        var stillFighting = this.PlayCycleFast();

        if (this.cycleComplete)
            this.cycleComplete();

        if (this.stopped)
            return;

        if (stillFighting) {
            setTimeout(function () { vgap.sim.player.runFast(); }, 0);
            return;
        }


        this.results = this.FinishUp();
        this.finished();

	if (this.Objects[1].Damage >= 100) {
		vgap.sim.fleet2shipsDestroyed++;
	}
	else { for (var i = 0; i < this.results.length; i++) {
		if (this.results[i] == "Left Destroyed" || this.results[i] == "Left Captured") {
			this.appendResult(this.Objects[0].Damage, this.Objects[1].Damage);
			vgap.sim.leftLost++;
		} /*else if () {
			vgap.sim.leftLost++;
		}*/
	} }

	vgap.sim.runNonVisualRecur();
    };

    /** Play one cycle. Return false if its over.*/
    vcrPlayer.prototype.PlayCycleFast = function () {

        //Side is destroyed
        if (this.Objects[0].Damage >= this.Objects[0].DamageLimit || this.Objects[1].Damage >= this.Objects[1].DamageLimit)
            return false;

        //Ship has no crew in ship to ship battle
        if (this.Objects[0].Crew <= 0 || this.Objects[1].Crew <= 0)
            if (this.BattleType == SHIP_TO_SHIP)
                return false;

        //this.Timeout
        if (this.Time >= 2000)
            return false;

        //Increment this.Time
        this.Time++;

        /* Movement */
        var distance = this.Objects[1].CurrentX - this.Objects[0].CurrentX;
        if (distance > 30) {
            this.Objects[0].CurrentX++;
            distance--;
            if (this.BattleType == SHIP_TO_SHIP) {
                this.Objects[1].CurrentX--;
                distance--;
            }
        }

        /* Beams */
        if (distance < 200)
            this.FireBeamsFast(0);
        this.FireBeamsAtFighterFast(0);
        this.FireBeamsAtFighterFast(1);
        if (distance < 200)
            this.FireBeamsFast(1);

        /* Torpedoes */
        if (distance < 300) {
            this.FireTorpedoesFast(0);
            this.FireTorpedoesFast(1);
        }

        /* Fighters */
        this.LaunchFightersFast(0);
        this.LaunchFightersFast(1);
        if (this.Objects[0].BayCount > 0 || this.Objects[1].BayCount > 0)
            this.FighterStuffFast();

        /* Recharge beams */
        this.RechargeBeams(0);
        this.RechargeBeams(1);

        return true;
    };

    /** Fire beam. Hits the enemy with a beam of object from, beam number
    which. */
    vcrPlayer.prototype.FireBeamFast = function (from, which) {
        var charge = this.Objects[from].BeamsCharge[which];
        var beam = vgap.getBeam(this.Objects[from].BeamId);

        var damage = this.rdivaddw(charge * beam.damage, 100, 0);
        var kill = this.rdivaddw(charge * beam.crewkill, 100, 0);

        //privateer 3* kill bonus
        //if (this.Objects[from].RaceId == 5)
        kill *= this.Objects[from].BeamKillBonus;

        this.Hit(1 - from, damage, kill);
        this.Objects[from].BeamsCharge[which] = 0;
    };

    /** Fire beams from specified object. Fires all beams that can
    fire. */
    vcrPlayer.prototype.FireBeamsFast = function (from) {
        for (var i = 0; i < this.Objects[from].BeamCount; i++) {
            var n = this.GetRandom20();
            if (n < 7 && this.Objects[from].BeamsCharge[i] > 50)
                this.FireBeamFast(from, i);
        }
    };

    /** Fire beams at fighter. Fire all beams that can fire at enemy
    fighters. */
    vcrPlayer.prototype.FireBeamsAtFighterFast = function (fm) {
        if (this.Objects[1 - fm].BayCount == 0) {
            /* enemy has no fighters, so just advance the seed; saves some
            2..3% run time */
            this.Seed = (this.Seed + this.Objects[fm].BeamCount) % RANDOM_SIZE;
        } else {
            for (var i = 0; i < this.Objects[fm].BeamCount; i++) {
                var n = this.GetRandom20();
                if (this.Objects[fm].BeamsCharge[i] > 40 && n < 5)
                    this.FireAtFighterFast(fm, i);
            }
        }
    };

    /** Fire at fighters. Fires the specified beam at an enemy fighter,
    if possible. */
    vcrPlayer.prototype.FireAtFighterFast = function (from, beam) {
        var min_dist = 600;
        var ftr_id = -1;
        var at = 1 - from;

        for (var i = 0; i < MAX_FIGHTERS; ++i) {
            if (this.Objects[at].FighterActive[i] > 0) {
                var j = Math.abs(this.Objects[at].FighterX[i] - this.Objects[from].CurrentX);
                if (j < min_dist) {
                    min_dist = j;
                    ftr_id = i;
                }
            }
        }

        if (ftr_id >= 0) {
            this.KillFighterFast(ftr_id, at);
            this.Objects[from].BeamsCharge[beam] = 0;
        }
    };

    /** Kill fighter. The fighter on track i, specified side, is killed and removed from the game. */
    vcrPlayer.prototype.KillFighterFast = function (i, side) {
        this.Objects[side].FighterActive[i] = 0;
    };

    /** Fire torpedo. Launches one torpedo from the specified object. */
    vcrPlayer.prototype.FireTorpFast = function (from, launcher) {
        var n = this.GetRandom100();
        if (n >= this.Objects[from].TorpMissPercent) {
            var torp = vgap.getTorpedo(this.Objects[from].TorpedoId);
            var percent = this.Hit(1 - from, 2 * torp.damage, 2 * torp.crewkill);
        } else {
            //missed
        }
    };

    /** Fire torpedo. Fires all ready torpedoes from the specified object at the enemy. */
    vcrPlayer.prototype.FireTorpedoesFast = function (from) {
        for (var i = 0; i < this.Objects[from].LauncherCount; i++) {
            if (this.Objects[from].Torpedos > 0) {
                var n = this.GetRandom17();
                if (this.Objects[from].TorpedoCharge[i] > 40 || (this.Objects[from].TorpedoCharge[i] > 30 && n < this.Objects[from].TorpedoId)) {
                    this.Objects[from].Torpedos--;
                    this.Objects[from].TorpedoCharge[i] = 0;
                    this.FireTorpFast(from, i);
                }
                //recharge
                this.Objects[from].TorpedoCharge[i] += this.Objects[from].TorpChargeRate;
            }
        }
    };

    /** Start a fighter. Attempts to launch a fighter.
    \pre Object has fighters. */
    vcrPlayer.prototype.LaunchFighterFast = function (side) {
        for (var i = 0; i < MAX_FIGHTERS; ++i) {
            if (this.Objects[side].FighterActive[i] == 0) {
                this.Objects[side].Fighters--;
                this.Objects[side].FighterActive[i] = 1;
                this.Objects[side].FighterX[i] = this.Objects[side].CurrentX;

                return;
            }
        }
    };

    /** Start fighter. Start fighter from specified side, if preconditions fulfilled. */
    vcrPlayer.prototype.LaunchFightersFast = function (side) {
        if (this.Objects[side].BayCount > 0) {
            var n = this.GetRandom20();
            if (n <= this.Objects[side].BayCount && this.Objects[side].Fighters > 0)
                this.LaunchFighterFast(side);
        }
    },

    /** Move fighters. */
    vcrPlayer.prototype.MoveFightersFast = function () {
        for (var i = 0; i < MAX_FIGHTERS; ++i) {
            /* left side */
            if (this.Objects[0].FighterActive[i] == 1 && this.Objects[0].FighterX[i] > this.Objects[1].CurrentX + 10) {
                this.Objects[0].FighterActive[i] = 2;
            }

            if (this.Objects[0].FighterActive[i] == 2 && this.Objects[0].FighterX[i] < this.Objects[0].CurrentX) {
                //land fighter
                this.Objects[0].Fighters++;
                this.Objects[0].FighterActive[i] = 0;
            }
            if (this.Objects[0].FighterActive[i] == 1)
                this.Objects[0].FighterX[i] += 4;
            else if (this.Objects[0].FighterActive[i] == 2)
                this.Objects[0].FighterX[i] -= 4;

            /* right side */
            if (this.Objects[1].FighterActive[i] == 1 && this.Objects[1].FighterX[i] < this.Objects[0].CurrentX - 10) {
                this.Objects[1].FighterActive[i] = 2;
            }
            if (this.Objects[1].FighterActive[i] == 2 && this.Objects[1].FighterX[i] > this.Objects[1].CurrentX) {
                //land fighter
                this.Objects[1].Fighters++;
                this.Objects[1].FighterActive[i] = 0;
            }
            if (this.Objects[1].FighterActive[i] == 1)
                this.Objects[1].FighterX[i] -= 4;
            else if (this.Objects[1].FighterActive[i] == 2)
                this.Objects[1].FighterX[i] += 4;
        }
    };

    /** Left fighter fires. The left fighter on track i fires at its opponent, if it's close enough. */
    vcrPlayer.prototype.FighterShootLeftFast = function (i) {
        if (this.Objects[0].FighterActive[i] == 1 && Math.abs(this.Objects[0].FighterX[i] - this.Objects[1].CurrentX) < 20) {
            this.Hit(1, 2, 2);
        }
    };

    /** Right fighter fires. The right fighter on track i fires at its opponent, if it's close enough. */
    vcrPlayer.prototype.FighterShootRightFast = function (i) {
        if (this.Objects[1].FighterActive[i] == 1 && Math.abs(this.Objects[1].FighterX[i] - this.Objects[0].CurrentX) < 20) {
            this.Hit(0, 2, 2);
        }
    };


    /** Fighter stuff.
    - Fighter movement
    - Fighters fire at enemy
    - Fighter intercept */
    vcrPlayer.prototype.FighterStuffFast = function () {
        this.MoveFightersFast();
        for (var i = 0; i < MAX_FIGHTERS; i++) {
            this.FighterShootLeftFast(i);
            this.FighterShootRightFast(i);
        }

        //Fighters destroy fighters
        if (this.Objects[0].BayCount > 0 && this.Objects[1].BayCount > 0) {
            for (var i = 0; i < MAX_FIGHTERS; ++i) {
                if (this.Objects[0].FighterActive[i] > 0) {
                    for (var j = 0; j < MAX_FIGHTERS; j++) {
                        if (this.Objects[1].FighterActive[j] > 0) {
                            if (this.Objects[0].FighterX[i] == this.Objects[1].FighterX[j]) {
                                /* fighter intercept */
                                var n = this.GetRandom100();
                                if (this.Objects[0].FighterActive[i] == 0) {
                                    /* Tim is the king! A dead fighter can
                                    still fire! Our visualisation can't
                                    handle that, so use the short way.
                                    See tests/vcr/deadfire.vcr for an
                                    example fight. */
                                    if (n >= 50)
                                        this.KillFighterFast(j, 1);
                                } else {
                                    /* regular fighter intercept code */
                                    if (n < 50) {
                                        this.KillFighterFast(i, 0);
                                    } else {
                                        this.KillFighterFast(j, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    vgap.sim.calcSim = function () {

		//validation
		if (!this.vsPlanet && ($("#LeftHull").val() == 0 || $("#RightHull").val() == 0))
		    return;

		if (this.vsPlanet && $("#LeftHull").val() == 0)
		    return;

		this.calculatorContainer.show();

		//run
		this.runNonVisual();

	    };

    vcrSim.prototype.runParticleEngine = function () {

        if (this.stopped) {
	    this.particleEngineRunning = false;
            return;
	}

	this.particleEngineRunning = true;

        //called after each cycle in the vcr.
        var left = this.left;
        var right = this.right;

        //keep updating the location until the particles stop.
        if (this.runFinished && ((right.CurrentX - left.CurrentX) > 300)) {
            left.CurrentX++;
            if (!this.vsPlanet)
                right.CurrentX--;
        }

        //update the ship locations
        this.leftImg.css("left", this.screenX(left.CurrentX) - this.imgSize);
        this.rightImg.css("left", this.screenX(right.CurrentX));
        if (this.hasStarbase) {
            this.baseImg.css("left", this.screenX(right.CurrentX) - this.imgSize * 0.1);
            this.baseX = this.screenX(right.CurrentX) - this.imgSize * 0.1 + (this.imgSize * 0.25 / 2);
        }

        //update the distance text
        var distance = (right.CurrentX - left.CurrentX) * 100;
        this.distText.html("<span>Distance: " + distance + "</span><span>Time: " + this.player.Time + "</span>");

        //update fighter locations
        var speed = this.battlefield.width() / HOR_SCALE * 4;
        for (var i = 0; i < MAX_FIGHTERS; i++) {
            if (left.FighterActive[i] == 1)
                left.ftrs[i].translate(speed, 0);
            if (right.FighterActive[i] == 1)
                right.ftrs[i].translate(-speed, 0);
            if (left.FighterActive[i] == 2)
                left.ftrs[i].translate(-speed, 0);
            if (right.FighterActive[i] == 2)
                right.ftrs[i].translate(speed, 0);
        }

        //remove dead particles
        var newParticles = new Array();
        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            if (particle.isDead())
                particle.clear();
            else
                newParticles.push(particle);
        }
        this.particles = newParticles;

        //update and redraw particles
        for (var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.update();
            particle.clear();
            particle.draw();
        }

        //update status areas
        this.left.status.update();
        this.right.status.update();


        //check if the battle is actually over. If so run the finale!  (explosions or capture rings)
        if (this.finale == false && this.runFinished && this.left.status.holdback == 0 && this.right.status.holdback == 0) {

            this.finale = true;
            var x1 = this.screenX(this.left.CurrentX) - this.imgSize / 2;
            var x2 = this.screenX(this.right.CurrentX) + this.imgSize / 2;
            var y = this.imgTop + this.imgSize / 2;

            for (var i = 0; i < this.player.results.length; i++) {
                if (this.player.results[i] == "Left Destroyed") {

                    //left ship destroyed
                    new vcrExplosion().init(this.paper, x1, y, 150);
                    this.leftImg.hide();

                }
                if (this.player.results[i] == "Right Destroyed") {

                    if (this.vsPlanet) {
                        //planet captured
                        this.drawCaptureRing(x2, y);

                        //starbase destroyed
                        if (this.hasStarbase) {
                            new vcrExplosion().init(this.paper, this.baseX, this.baseY, 60);
                            this.baseImg.hide();
                        }
                    }
                    else {

                        //right ship destroyed
                        new vcrExplosion().init(this.paper, x2, y, 150);
                        this.rightImg.hide();
                    }

                }

                if (this.player.results[i] == "Left Captured")
                    this.drawCaptureRing(x1, y);

                if (this.player.results[i] == "Right Captured")
                    this.drawCaptureRing(x2, y);

            }
        }

        //check if really finished
        if (this.runFinished && this.particles.length == 0)
            return;

        //call for next loop
        setTimeout(function () { vgap.sim.runParticleEngine(); }, this.wait);

    },

// new init stuff

        vgap.pauseMusic();
        this.isSim = isSim;

        //init sound
        this.sounds = new vcrSound();
        this.sounds.enabled = false;
        if (vgap.enableSound)
            this.sounds.load();

        //setup the window
        this.container = $("<div id='VCRSimWin' class='Window'><div id='VCRSimHeader' class='WHeader'><div class='WClose'></div></div></div>").appendTo(vgap.container);
        $("#VCRSimWin .WClose").tclick(function () { vgap.sim.close(); });

        this.content = $("<div id='VCRSim' class='WContent' style='height:640px'></div>").appendTo(this.container);
        this.header = $("#VCRSimHeader");
        this.container.center();
        dragdrop.makeDraggable(document.getElementById("VCRSimWin"), document.getElementById("VCRSimHeader"));

        //setup the calculator window
        this.calculatorContainer = $("<div id='CalculatorWin' class='Window' style='z-index:101;height:300px;width:360px'><div id='CalculatorHeader' class='WHeader'><div class='WClose'></div></div></div>").appendTo(vgap.container);
	this.calculatorHeader = $("#CalculatorHeader");
        $("#CalculatorWin .WClose").tclick(function () { vgap.sim.calculatorContainer.hide(); });

        this.content2 = $("<div id='CalculatorContent' class='WContent' style='height:100%'></div>").appendTo(this.calculatorContainer);
//        this.header = $("#VCRSimHeader");
        this.calculatorContainer.center();
        this.calculatorContainer.hide();
        dragdrop.makeDraggable(document.getElementById("CalculatorWin"), document.getElementById("CalculatorHeader"));

        //control buttons
        if (isSim) {

            //sim buttons
            $("<ul id='SimButtons'></ul><ul id='SpeedButtons'></ul><div class='WTitle'>Battle Simulator</div>").appendTo(this.header);
            $("<li id='ShipVsShipButton' class='SelectedSpeed'>Ship vs Ship</li>").tclick(function() { vgap.sim.shipVsShip(); }).appendTo("#SimButtons");
            $("<li id='ShipVsPlanetButton'>Ship vs Planet</li>").tclick(function () { vgap.sim.shipVsPlanet(); }).appendTo("#SimButtons");
            $("<li id='StopVCR'>Stop</li>").tclick(function() { vgap.sim.stopSim(); }).appendTo("#SimButtons");
            $("<li id='RunVCR'>Run Sim</li>").tclick(function() { vgap.sim.runSim(); }).appendTo("#SimButtons");
            $("<li id='RunVCR'>Run Fleet</li>").tclick(function() { vgap.sim.runFleetSimulation(true); }).appendTo("#SimButtons");
            $("<li id='RunVCR'>Run Calc</li>").tclick(function() { vgap.sim.runFleetSimulation(); }).appendTo("#SimButtons");

        }
        else {
            $("<ul id='PlayButtons'></ul><ul id='SpeedButtons'></ul>").appendTo(this.header);

            //play buttons
            if (vgap.vcrs.length > 1) {
                $("<li id='PrevVCR'>Previous</li>").tclick(function () { vgap.sim.previous(); }).appendTo("#PlayButtons");          
                $("<li id='VCRCount'></li>").appendTo("#PlayButtons");
                $("<li id='NextVCR'>Next</li>").tclick(function () { vgap.sim.next(); }).appendTo("#PlayButtons");   
                this.vcrIndex = 0;
            }
            if (vgap.vcrs.length > 1)
                this.showCount();
        }
        //speed buttons
        $("<li id='Speed135'>Slow</li>").tclick(function () { vgap.sim.setSpeed(135); }).appendTo("#SpeedButtons");
        $("<li id='Speed90' class='SelectedSpeed'>Medium</li>").tclick(function () { vgap.sim.setSpeed(90); }).appendTo("#SpeedButtons");
        $("<li id='Speed50'>Fast</li>").tclick(function () { vgap.sim.setSpeed(50); }).appendTo("#SpeedButtons");
        $("<li id='Speed25'>Fastest</li>").tclick(function () { vgap.sim.setSpeed(25); }).appendTo("#SpeedButtons");

        //Create the battlefield, 2 images set on a raphael paper. Battle Result is the text at the top, BattleDist is the distance away
        var html = "<div id='Battlefield'><div id='BattlePaper'></div><img id='LeftImg'/><img id='RightImg'/><img src='" + STARBASE_ICON + "' id='BaseImg'/><div id='BattleDist'></div><div id='BattleResult'></div></div>";
        $(html).appendTo(this.content);

	var calculatorHtml = "<div id='CalculatorResults' class='DashPane'><table id='CalculatorTable' border='0' style='background-color:#000000' width='100%' cellpadding='0' cellspacing='0'></table></div>";

        this.calculatorPane = $(calculatorHtml).appendTo(this.content2);

	this.calculatorTable = document.getElementById('CalculatorTable');

	$("<div class='WTitle' id='CalculatorOddsText'>Calculator</div>").appendTo(this.calculatorHeader);
	vgap.sim.calculatorPane.jScrollPane();

        //pointers
        this.battlefield = $("#Battlefield");
        this.leftImg = $("#LeftImg");
        this.rightImg = $("#RightImg");
        this.baseImg = $("#BaseImg");
        this.battleTitle = $("#BattleResult");
        this.distText = $("#BattleDist");

        //Setup paper
        this.paper = Raphael("BattlePaper", 900, 360);
        this.paper.safari();
        this.canvas = this.paper.set();

        this.paper = Raphael("BattlePaper", 900, 360);

        if (isSim) {

            //ship and planet selectors
            html = "<div id='LeftSide'>" + this.renderSide("Left") + "<button type='button' id='LeftFleetAdd'>Add to fleet</button>" + "<button type='button' id='LeftFleetClear'>Clear fleet</button>" + "<p id='LeftBattleValueSelection'><label>BattleValue:</label><input type='text' id='LeftBattleValue' value='100'/>"  + "</div>";
            html += "<div id='RightSide'>" + this.renderSide("Right") + "<button type='button' id='RightFleetAdd'>Add to fleet</button>" + "<button type='button' id='RightFleetClear'>Clear fleet</button>" + "<p id='RightBattleValueSelection'><label>BattleValue:</label><input type='text' id='RightBattleValue' value='100'/>" + "</div>";
            html += "<div id='PlanetSide'>" + this.renderPlanetSide() + "</div>";
//	    html += "<div ></div>";
            html += "<div id='CalculatorOptions' > <p style='height:0;border-top:2px solid #CCCCCC;'><label>Calculator rounds:</label><input type='text' id='CalculatorRounds' value='10'/></p> </div>";
            $(html).appendTo(this.content);

            $("#LeftHull").change(function () { vgap.sim.changeHull("Left"); });
            $("#RightHull").change(function () { vgap.sim.changeHull("Right"); });

	    $("#LeftFleetAdd").tclick(function () { vgap.sim.addToFleet('Left'); });
	    $("#RightFleetAdd").tclick(function () { vgap.sim.addToFleet('Right'); });

	    $("#LeftFleetClear").tclick(function () { vgap.sim.clearFleet('Left'); });
	    $("#RightFleetClear").tclick(function () { vgap.sim.clearFleet('Right'); });

            this.leftSide = $("#LeftSide");
            this.rightSide = $("#RightSide");
            this.planetSide = $("#PlanetSide");

            this.planetSide.hide();

        }
        else {

            //resize to fit the screen
            this.resizeForVCR();
            this.container.hide();

        }

        //we're ready
        this.setSpeed(90);
        this.vsPlanet = false;
        this.hasStarbase = false;
        this.ready = true;

    };


} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
