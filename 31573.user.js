// ==UserScript==
// @name           pbr Game Scout statslib
// @namespace      pbr
// @copyright      2008, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.11.04
// ==/UserScript==

function Stats() {
	this.toString = function() {
		return this.team_name[0]+" ("+this.team_id[0]+") vs. "+this.team_name[1]+" ("+this.team_id[1]+")";
	}
	
	this.team_name = [];
	this.team_id = [];
	this.team_possession = [0,0,0,0,0,0,0,0,0,0,0,0];
	this.team_penalty    = [0,0,0,0,0,0,0,0,0,0,0,0];
    
	this.team_att     = [0,0,0,0,0,0,0,0,0,0];
	this.team_yards   = [0,0,0,0,0,0,0,0,0,0];
	this.team_success = [0,0,0,0,0,0,0,0,0,0];
	this.team_firsts  = [0,0,0,0,0,0,0,0,0,0];
	this.team_lyards  = [0,0,0,0,0,0,0,0,0,0];
	
	this.team_pass_att    = [0,0,0,0,0,0];
	this.team_pass_comp   = [0,0,0,0,0,0];
	this.team_pass_yards  = [0,0,0,0,0,0];
	this.team_pass_firsts = [0,0,0,0,0,0];

	this.team_att_down     = [0,0,0,0,0,0,0,0];
	this.team_yards_down   = [0,0,0,0,0,0,0,0];
	this.team_success_down = [0,0,0,0,0,0,0,0];
	this.team_firsts_down  = [0,0,0,0,0,0,0,0];
	this.team_lyards_down  = [0,0,0,0,0,0,0,0];

	this.team_pass_att_down    = [0,0,0,0,0,0,0,0];
	this.team_pass_comp_down   = [0,0,0,0,0,0,0,0];
	this.team_pass_yards_down  = [0,0,0,0,0,0,0,0];
	this.team_pass_firsts_down = [0,0,0,0,0,0,0,0];
    this.team_pass_pressure_down = [0,0,0,0,0,0,0,0];

	this.team_quarter_totals = new Array(6);
	for (var i=0; i<6; i++) {
		this.team_quarter_totals[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}

	this.playerRushingName = [[],[]];
	this.playerRushingStats = [[],[]];   //[att,yard,long,succ,fd,brtk]
	this.playerRushingStatsCombine = [true,true,false,true,true,true];

	this.playerPassingName = [[],[]];
	this.playerPassingStats = [[],[]];   //[comp,att,yard,td,int,pd,drop,bad,hurry]
	this.playerPassingStatsCombine = [true,true,true,true,true,true,true,true,true];

	this.playerReceivingName = [[],[]];
	this.playerReceivingStats = [[],[]]; //[comp,att,drop,yard,long,yac,pd,fd,brtk.kl]
	this.playerReceivingStatsCombine = [true,true,true,true,false,true,true,true,true,true];

	this.playerDefensiveName = [[],[]];
	this.playerDefensiveStats = [[],[]]; //[tot,rtack,rmiss,ptack,pmiss,sttack,stmiss]
	this.playerDefensiveStatsCombine = [true,true,true,true,true,true,true,true];

	this.playerDefensiveRushName = [[],[]];
	this.playerDefensiveRushStats = [[],[]]; //tack,miss,yards,stop,defeat,ff
	this.playerDefensivePassName = [[],[]];
	this.playerDefensivePassStats = [[],[]]; //tack,miss,yards,stop,defeat,ff,int,pd,kl
	this.playerDefensiveSTName = [[],[]];
	this.playerDefensiveSTStats = [[],[]];   //tack,miss,yards,ff
	
	this.playerKickingName = [[],[]];
	this.playerKickingStats = [[],[]];   //[ko,yards,long,tb,in20,net]
	this.playerKickingStatsCombine = [true,true,false,true,true,true];

	this.playerPuntingName = [[],[]];
	this.playerPuntingStats = [[],[]];   //[p,yards,long,tb,in20,net]
	this.playerPuntingStatsCombine = [true,true,false,true,true,true];

	this.playerKickReturnStats = [[],[]];
	this.playerKickReturnName = [[],[]]; //[kr,yards,long,td,brtk,dst]
	this.playerKickReturnStatsCombine = [true,true,false,true,true,true];

	this.playerPuntReturnStats = [[],[]]; 
	this.playerPuntReturnName = [[],[]]; //[pr,yards,long,td,brtk,dst]
	this.playerPuntReturnStatsCombine = [true,true,false,true,true,true];

	this.playerPenaltyName = [[],[]];
	this.playerPenaltyStats = [[],[]];   //[false start, offsides, encroachment]
	this.playerPenaltyStatsCombine = [true,true,true];
	
	this.distanceStats = new Array(4);
	for (var i=0; i<4; i++) {
		this.distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
		//>0cay - >5cay - >15cay
	}

	this.driveList = [[],[]];
}

function Drive() {
	this.teamName;
	this.quarter;
	this.startTime;
	this.endTime;
	this.driveBegan;
	this.driveEnded;
	this.numOfPlays = 0;
	this.netYards = 0;
	this.result;

	this.toString = function() {
		return this.quarter+" : "+this.startTime+" : "+this.endTime+" : " +
		this.timePoss+" : "+this.driveBegan+" : " +
		this.driveEnded+" : "+this.numOfPlays+" : " +
		yardDiff(this.driveBegan,this.driveEnded) +
		" : "+this.result;
	}
}

function addition(left,right) {
	var stats = new Stats();
	var aligned = false;

	//console.log("addition start");
	/*
	if ((left.team_id[0] == right.team_id[0]) ||
			(left.team_id[1] == right.team_id[1])) {
		aligned = true;
	}
	else if ((left.team_name[0] == right.team_name[0]) ||
			(left.team_name[1] == right.team_name[1])) {
		aligned = true;
	}
	else {
		aligned = false;
	}
	*/
	try {
		//if (left.team_id[0].indexOf(parseFloat(right.team_id[0])) != -1) {
		if (parseFloat(left.team_id[0]) == parseFloat(right.team_id[0])) {
			aligned = true;
		}
		else if ((left.team_name[0] == right.team_name[0]) ||
				(left.team_name[1] == right.team_name[1])) {
			aligned = true;
		}
		//else if (left.team_id[1].indexOf(parseFloat(right.team_id[1])) != -1) {
		else if (parseFloat(left.team_id[1]) == parseFloat(right.team_id[1])) {
			aligned = true;
		}
		else {
			aligned = false;
		}
	}
	catch (err) {
		//console.log("addition() says: "+err);
		if ((left.team_id[0] == right.team_id[0]) ||
				(left.team_id[1] == right.team_id[1])) {
			aligned = true;
		}
		else if ((left.team_name[0] == right.team_name[0]) ||
				(left.team_name[1] == right.team_name[1])) {
			aligned = true;
		}
		else {
			aligned = false;
		}
	}

	//console.log(left.team_id+" -- "+right.team_id+" -- "+aligned);

	var len = left.team_possession.length
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_possession[i] = left.team_possession[i] +
			right.team_possession[idx];
	}
	len = left.team_penalty.length
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_penalty[i] = left.team_penalty[i] +
			right.team_penalty[idx];
	}
	len = left.team_att.length;
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_att[i] = left.team_att[i] +
			right.team_att[idx];
		stats.team_yards[i] = left.team_yards[i] +
			right.team_yards[idx];
		stats.team_success[i] = left.team_success[i] +
			right.team_success[idx];
		stats.team_firsts[i] = left.team_firsts[i] +
			right.team_firsts[idx];
		stats.team_lyards[i] = left.team_lyards[i] +
			right.team_lyards[idx];
	}
	len = left.team_pass_comp.length;
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_pass_comp[i] = left.team_pass_comp[i] +
			right.team_pass_comp[idx];
		stats.team_pass_att[i] = left.team_pass_att[i] +
			right.team_pass_att[idx];
		stats.team_pass_yards[i] = left.team_pass_yards[i] +
			right.team_pass_yards[idx];
		stats.team_pass_firsts[i] = left.team_pass_firsts[i] +
			right.team_pass_firsts[idx];
	}
	len = left.team_att_down.length;
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_att_down[i] = left.team_att_down[i] +
			right.team_att_down[idx];
		stats.team_yards_down[i] = left.team_yards_down[i] +
			right.team_yards_down[idx];
		stats.team_success_down[i] = left.team_success_down[i] +
			right.team_success_down[idx];
		stats.team_firsts_down[i] = left.team_firsts_down[i] +
			right.team_firsts_down[idx];
		stats.team_lyards_down[i] = left.team_lyards_down[i] +
			right.team_lyards_down[idx];
	}
	len = left.team_pass_comp_down.length;
	for (var i=0; i<len; i++) {
		if (aligned == true) idx = i;
		else idx = (i+len/2)%len;
		stats.team_pass_comp_down[i] = left.team_pass_comp_down[i] +
			right.team_pass_comp_down[idx];
		stats.team_pass_att_down[i] = left.team_pass_att_down[i] +
			right.team_pass_att_down[idx];
		stats.team_pass_yards_down[i] = left.team_pass_yards_down[i] +
			right.team_pass_yards_down[idx];
		stats.team_pass_firsts_down[i] = left.team_pass_firsts_down[i] +
			right.team_pass_firsts_down[idx];
		stats.team_pass_pressure_down[i] = left.team_pass_pressure_down[i] +
			right.team_pass_pressure_down[idx];
	}
	for (var i=0; i<6; i++) {
		len = left.team_quarter_totals[i].length;
		for (var j=0; j<len; j++) {
			if (aligned == true) idx = j;
			else idx = (j+len/2)%len;
			stats.team_quarter_totals[i][j] = left.team_quarter_totals[i][j] +
				right.team_quarter_totals[i][idx];
		}
	}
	for (var i=0; i<4; i++) {
		len = left.distanceStats[i].length;
		for (var j=0; j<len; j++) {
			if (aligned == true) idx = j;
			else idx = (j+len/2)%len;
			stats.distanceStats[i][j] = left.distanceStats[i][j] +
				right.distanceStats[i][idx];
		}
	}

	var x = left;
	if (x.team_id[0] == null) {
		x = right;
	}
	//console.log(left.team_id+" -- "+right.team_id+" -- "+x.team_id);
    //console.log(left.team_id+":"+left.team_name+" -- "+right.team_id+":"+right.team_name);
	stats.team_name[0] = x.team_name[0];
	stats.team_id[0] = x.team_id[0];
	stats.team_name[1] = x.team_name[1];
	stats.team_id[1] = x.team_id[1];

	var i=0;
	if (aligned == false) {
		i++;
	}
	stats.driveList[0] = right.driveList[i];
	stats.driveList[1] = right.driveList[(i+1)%2];
	
	stats.playerRushingName = [[],[]];
	stats.playerRushingStats = [[],[]];
	combineRushing(stats,left,right,aligned);

	stats.playerReceivingName = [[],[]];
	stats.playerReceivingStats = [[],[]];
	combineReceiving(stats,left,right,aligned);

	stats.playerPassingName = [[],[]];
	stats.playerPassingStats = [[],[]];
	combinePassing(stats,left,right,aligned);

	stats.playerDefensiveName = [[],[]];
	stats.playerDefensiveStats = [[],[]];
	combineDefensive(stats,left,right,aligned);

	stats.playerKickingName = [[],[]];
	stats.playerKickingStats = [[],[]];
	combineKicking(stats,left,right,aligned);

	stats.playerPuntingName = [[],[]];
	stats.playerPuntingStats = [[],[]];
	combinePunting(stats,left,right,aligned);

	stats.playerKickReturnName = [[],[]];
	stats.playerKickReturnStats = [[],[]];
	combineKickReturn(stats,left,right,aligned);

	stats.playerPuntReturnName = [[],[]];
	stats.playerPuntReturnStats = [[],[]];
	combinePuntReturn(stats,left,right,aligned);

	stats.playerPenaltyName = [[],[]];
	stats.playerPenaltyStats = [[],[]];
	combinePenalty(stats,left,right,aligned);

	//console.log("addition end");
	return stats;
}

function combineRushing(total, left, right, align) {
	combineArrays(total.playerRushingName,total.playerRushingStats,
			left.playerRushingName, left.playerRushingStats,
			right.playerRushingName,right.playerRushingStats,
			align,total.playerRushingStatsCombine);
}

function combineReceiving(total, left, right, align) {
	combineArrays(total.playerReceivingName,total.playerReceivingStats,
			left.playerReceivingName, left.playerReceivingStats,
			right.playerReceivingName,right.playerReceivingStats,
			align,total.playerReceivingStatsCombine);
}

function combinePassing(total, left, right, align) {
	combineArrays(total.playerPassingName,total.playerPassingStats,
			left.playerPassingName, left.playerPassingStats,
			right.playerPassingName,right.playerPassingStats,
			align,total.playerPassingStatsCombine);
}

function combineDefensive(total, left, right, align) {
	combineArrays(total.playerDefensiveRushName,total.playerDefensiveRushStats,
			left.playerDefensiveRushName, left.playerDefensiveRushStats,
			right.playerDefensiveRushName,right.playerDefensiveRushStats,
			align,total.playerDefensiveStatsCombine);
	combineArrays(total.playerDefensivePassName,total.playerDefensivePassStats,
			left.playerDefensivePassName, left.playerDefensivePassStats,
			right.playerDefensivePassName,right.playerDefensivePassStats,
			align,total.playerDefensiveStatsCombine);
	combineArrays(total.playerDefensiveSTName,total.playerDefensiveSTStats,
			left.playerDefensiveSTName, left.playerDefensiveSTStats,
			right.playerDefensiveSTName,right.playerDefensiveSTStats,
			align,total.playerDefensiveStatsCombine);
//console.log(total.playerDefensivePassStats+"=="+left.playerDefensivePassStats+"++"+right.playerDefensivePassStats);
}

function combineKicking(total, left, right, align) {
	combineArrays(total.playerKickingName,total.playerKickingStats,
			left.playerKickingName, left.playerKickingStats,
			right.playerKickingName,right.playerKickingStats,
			align,total.playerKickingStatsCombine);
}

function combinePunting(total, left, right, align) {
	combineArrays(total.playerPuntingName,total.playerPuntingStats,
			left.playerPuntingName, left.playerPuntingStats,
			right.playerPuntingName,right.playerPuntingStats,
			align,total.playerPuntingStatsCombine);
}

function combineKickReturn(total, left, right, align) {
	combineArrays(total.playerKickReturnName,total.playerKickReturnStats,
			left.playerKickReturnName, left.playerKickReturnStats,
			right.playerKickReturnName,right.playerKickReturnStats,
			align,total.playerKickReturnStatsCombine);
}

function combinePuntReturn(total, left, right, align) {
	combineArrays(total.playerPuntReturnName,total.playerPuntReturnStats,
			left.playerPuntReturnName, left.playerPuntReturnStats,
			right.playerPuntReturnName,right.playerPuntReturnStats,
			align,total.playerPuntReturnStatsCombine);
}

function combinePenalty(total, left, right, align) {
	combineArrays(total.playerPenaltyName,total.playerPenaltyStats,
			left.playerPenaltyName, left.playerPenaltyStats,
			right.playerPenaltyName,right.playerPenaltyStats,
			align, total.playerPenaltyStatsCombine);
}

function combineArrays(totalName, totalStats, leftName, leftStats, 
		rightName, rightStats, align, combine) {
	for (var t=0; t<leftName.length; t++) {
		for (var i=0; i<leftName[t].length; i++) {
			totalName[t].push(leftName[t][i]);
			totalStats[t].push(leftStats[t][i]);
		}
	}

	for (var t=0; t<2; t++) {
		if (align == true) tidx = t;
		else tidx = (t+1)%2;

		if (rightName[tidx] == null) continue;
		for (var i=0; i<rightName[tidx].length; i++) {
			var idx = totalName[t].indexOf(rightName[tidx][i]);
			if (idx == -1) {
				totalName[t].push(rightName[tidx][i]);
				totalStats[t].push(rightStats[tidx][i]);
			}
			else {
				for (var j=0; j<rightStats[tidx][i].length; j++) {
					if (combine[j] == true) {
						totalStats[t][idx][j] += rightStats[tidx][i][j];
					}
					else {
						totalStats[t][idx][j] = Math.max(totalStats[t][idx][j],
								rightStats[tidx][i][j]);
					}
				}
			}
		}
		try {
			if (showEverything == false) return;
		}
		catch (err) {
		}
	}
}
