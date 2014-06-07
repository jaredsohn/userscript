// ==UserScript==
// @name           Virtual Manager Total Stats
// @namespace      kongregatehack.vman
// @description    Viser spillerens samlede stats.
// @include        *://www.virtualmanager.com/players/*
// ==/UserScript==

start();

function start(){
	var totalElement = document.getElementsByClassName('hidden_total_ability')[0];
	var sums = getSums();
	
	var total = "<tr><td class=\"player_ability_number\"><span style=\"color: rgb(232, 83, 2); font-weight: bold; font-size:50px;\">" + sums.total + "</span></td></tr>";
	total += "<tr><td><b>Technique</b></td><td class=\"player_ability_number\"><span style=\"color: rgb(232, 83, 2); font-weight: bold;\">" + sums.technique + "</span></td></tr>";
	total += "<tr><td><b>Mentality</b></td><td class=\"player_ability_number\"><span style=\"color: rgb(232, 83, 2); font-weight: bold;\">" + sums.mentality + "</span></td></tr>";
	total += "<tr><td><b>Physique</b></td><td class=\"player_ability_number\"><span style=\"color: rgb(232, 83, 2); font-weight: bold;\">" + sums.physique + "</span></td></tr>";
	
	totalElement.parentNode.innerHTML = total;
}

function getSums(){
	var stats = getStats();
	var technique = 0;
	var mentality = 0;
	var physique = 0;
	var total = 0;
	
	for(var i = 0; i < stats.length; i += 3){
		technique += stats[i];
	}
	for(var i = 1; i < stats.length; i += 3){
		mentality += stats[i];
	}
	for(var i = 2; i < stats.length; i += 3){
		physique += stats[i];
	}
	
	total = technique + mentality + physique;
	
	return {technique:technique,mentality:mentality,physique:physique,total:total};
}

function getStats(){
	var statsElms = document.getElementsByClassName('player_ability_number');
	var statsArray = [];
	
	for(var i = 0; i < statsElms.length; i++){
		var nodes = statsElms[i].childNodes;
		
		for(var j = 1; j < nodes.length; j++){
			if(nodes[j].tagName == "SPAN"){
				break;
			}
		}
		
		statsArray.push(parseInt(nodes[j].innerHTML));
	}
	
	return statsArray;
}