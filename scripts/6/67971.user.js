// ==UserScript==
// @author         Roktaal
// @name           eRepublik SJeB Military Tracker by Roktaal
// @namespace      http://www.erepublik.com/en/citizen/profile/2521043
// @description    eRepublik SJeB Military Tracker.
// @version        2.1.2
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/sr
// @require        http://sizzlemctwizzle.com/updater.php?id=67971&days=1&show
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @require        http://jquery-simpletip.googlecode.com/files/jquery.simpletip-1.3.1.min.js
// ==/UserScript==

// ===============================================================================
// Common variables
// ===============================================================================
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

GM_addStyle(
	'.member:hover { cursor: default; background: #dcdcdc; }' +
	'.member span.image { display: none; padding: 2px 2px 2px 2px !important; margin-left: -150px; margin-top: -40px; }' +
	'.member:hover span.image{ display: inline; position: absolute; background: #ffffff; border: 1px solid #cccccc; color:#000000; }' +
	'.member td.image { border-bottom: 0px; padding: 0px !important; }' +
	'.member tr.hlimage td.image { color: rgb(153, 153, 153); }' +
	'div.tooltip1 font.skiller strong { -moz-border-radius: 3px 3px 3px 3px; background: none repeat scroll 0 0 #ADE56C; border: 1px solid #98D651; color: #ffffff !important; float:left; font-size: 11px; line-height: 11px !important; margin-right: 5px; overflow: hidden; padding: 2px; text-align: center; text-shadow: 0 1px 0 #84C538; width: 12px !important; }' +
	'div.tooltip1:hover { cursor: default; text-decoration: none; }' +
	'div.tooltip1 span.hover1 { display: none; padding: 2px 2px 2px 2px !important; margin-left: 407px; margin-top: -18px; }' +
	'div.tooltip1 span.hover2 { display: none; padding: 2px 2px 2px 2px !important; margin-left: 349px; margin-top: -33px; }' +
	'div.tooltip1 span.hover3 { display: none; padding: 2px 2px 2px 2px !important; margin-left: 317px; margin-top: -37px; }' +
	'div.tooltip1 span.hover4 { font-size:9px; display: none; padding: 2px 2px 2px 2px !important; margin-left: 172px; margin-top: -155px; }' +
	'div.tooltip1 span.hover5 { font-size:9px; display: none; padding: 2px 2px 2px 2px !important; margin-left: 297px; margin-top: -70px; }' +
	'div.tooltip1 span.hover6 { display: none; padding: 2px 2px 2px 2px !important; margin-left: 192px; margin-top: -37px; }' +
	'div.tooltip1:hover span.hover1 { display: block; position: absolute; background: #ffffff; border: 1px solid #cccccc; color:#000000; }' +
	'div.tooltip1:hover span.hover2 { display: block; position: absolute; background: #ffffff; border: 1px solid #cccccc; color:#000000; }' +
	'div.tooltip1:hover span.hover3 { display: block; position: absolute; background: #ffffff; border: 1px solid #cccccc; color:#000000; }' +
	'div.tooltip1:hover span.hover4 { display: block; position: absolute; background: #ffffff; border: 1px solid #cccccc; color:#000000; }' +
	'div.tooltip1:hover span.hover5 { display: block; position: absolute; background: #ffffff; border: 1px solid #cccccc; color:#000000; }' +
	'div.tooltip1:hover span.hover6 { display: block; position: absolute; background: #ffffff; border: 1px solid #cccccc; color:#000000; }' +
	'div.tooltip1 td { border-bottom: 0px; padding: 0px !important; }' +
	'div.tooltip1 tr.highlight td { color: rgb(153, 153, 153); }'
);

var html = '<embed width="500" height="30" src="/flash/delicious.swf" quality="best" flashvars="txt=SJeB Tracker v2.1.2 by Roktaal&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/>'
var nMembers
var count = 0
var MembersMap = new Array();
var levelCap = [0, 2, 4, 6, 8, 10, 15, 20, 30, 40, 50, 60, 70, 80, 100, 125, 150, 200, 300, 500, 1000, 1500, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000]
var ranks = ['Private','Corporal','Sergeant','Lieutenant','Captain','Colonel','General','Field Marshal','Field Marshal*','Field Marshal**','Field Marshal***','Field Marshal****','Field Marshal*****']
var ranksCap = [0, 50, 150, 300, 600, 1200, 2500, 5000, 10000, 15000, 20000, 25000, 30000]
var militarySkill = ['Greenhorn', 'Rookie', 'Hotshot', 'Marksman', 'Sharp Shooter', 'Professional', 'Expert', 'Ranger', 'Nemesis', 'Veteran', 'Veteran *', 'Veteran **']
var militarySkillCap = [0, 40, 200, 1000, 4000, 10000, 20000, 40000, 80000, 160000, 320000, 640000]
var workSkill = ['Apprentice', 'Assistant', 'Junior', 'Senior', 'Coordinator', 'Specialist', 'Expert', 'Master', 'Guru', 'Guru *', 'Guru **', 'Guru ***', 'Guru ****']
var workSkillCap = [0, 20, 100, 500, 2000, 5000, 10000, 20000, 40000, 80000, 160000, 320000, 640000]
var iconWorker = "data:image/gif;base64,R0lGODlhDwAPANU%2FAPo6PcaYmfJSVPqmqJeenu4kJ%2F7u7v%2F8%2FPQZHMnLy%2FrDxGhoaO0UF%2FeSlPzQ0QQVFP%2F6%2Bv7z8%2FETFjc3NyoqKlFRUYeNjfRtb%2BwIC%2FUWGq2Cg%2FaNjuwOEvq%2FwD9DQ%2B8uMfvP0N7e3tiTlRwhIe04O%2BTk5Nqsrefx8fIMD%2FA%2BQPifoeZ5e%2F67vPzf4PRxcal%2BfvRucPzf3%2F3g4Pj%2B%2FvNbXn5%2Ff%2FRCRftsbvNgY4qDhNHT0%2FQQE%2FRxcgAAAP%2F%2F%2F%2F%2F%2F%2FyH5BAEAAD8ALAAAAAAPAA8AAAaawJ9wCNlAhsgkCONIOg%2BfwufgRA4KsoKqKoxgBr4BJlL1wWw%2Bn4508Tlju4CnMjKhWklf6kag9Go%2BOCluQx0MBhY9HhY%2BEQwdRAwbPgsjFAslFisIRz8NBQcEEwkTIRM9OQANPwYYLCceJzMeCT09DyI7BjQkDg4mIA4BARoaLyYpNAIMHBwSzRkSGQgIEgwCCjAuPNzd3hcKQQA7"
var iconNoWorker = "data:image/gif;base64,R0lGODlhDwAPANU%2FAMfHx%2F39%2Fba2tv7%2B%2Fn9%2Ff9HR0bOzs8TExLKyssPDw%2FX19bS0tPv7%2B7i4uOvr69vb28LCwt3d3bGxsZycnLm5ueXl5cvLy8jIyLq6uqCgoPr6%2BtXV1cnJyb%2B%2Fv9fX1%2BLi4r29vfj4%2BODg4M7Ozru7u%2Bnp6ZaWlre3t%2FHx8d%2Ff38HBwdPT05mZmZ%2Bfn5KSkoKCgoaGho6Ojuzs7O7u7vT09Orq6qioqOTk5Nzc3JCQkL6%2BvrW1tfDw8NLS0v%2F%2F%2F%2F%2F%2F%2FyH5BAEAAD8ALAAAAAAPAA8AAAaYwJ9wGHgEhsgkT8JLOgcgim7gRH5ICsynKmQgPr4KglH1FQ4%2BX6nT8zkVu03GlossFEkfpGdxETo%2BIwluQw47GgcEGQA%2BDAIORAIPPgsxJggoCT0UVD84GAMjLBUTMxMEEAcRPxoSNTQZIQEtNy8EMB6HFio8PCK9KxscFwApCRYcOwYGAgsGJwIN0js7FzIFPdna2z0FDkEAOw%3D%3D"
var iconUnemployed = "data:image/gif;base64,R0lGODlhDwAPANU%2FAPJLJO8sIemoK%2F%2FHMf7t7Q0LAv%2B7MP3l5v2gLe0dJdOcKPJETf%2F7%2B%2FmFKu0RH%2Fl5Kf%2B5L%2F%2FCMPVnJ%2FmNK%2FE8RfR0efJOVv2yL8qWJvu2ufuytfeWmO0TJOwOH%2B0WH8%2BWJv%2BPLPzDxe4jIPZ7gfRXXt%2BhKfezLptwHciZJj8tDP3a3PmhpP3T1PCuLMGTJe8lM%2FeLkfo%2FJPVrcO4fL%2FRYYPu4uvRWJeV%2FJ%2B0bH%2FzY2vA2QP3e3vmOK%2BwPHvRyeP%2F%2F%2FyH5BAEAAD8ALAAAAAAPAA8AAAaRwJ9weNgchsjkJgFLOncJUULlRMoCiACtKgx1HoNHJ1NlLGKfAiamYzhXDhCq4EI4NknCCzBQFD4DNjMESCM4CBECBSURCAkVQzkcEhEGLSkCBhESHCxCJAEXBhAmJyYQEBcBFj81Dg0Dmn4YlQMNDhoUATy8PBM3E708AToWHj3IyA7JyB4LGRU%2B0tPUPhUaQQA7"
var iconDonate = "data:image/gif;base64,R0lGODlhEAAQANU%2FAOO8csOeX%2Ffbm%2FzmjPzRM%2F%2FrSPXaq%2F3lq%2BbAe7t0INmiOtCYPOmhLvPIY%2FTFVc2UMdejScOsh%2BatWO62Pdzc3Mm3mfrpV%2BahO%2F%2FyzFZYXN61avbUgWpscM6SKdeZK%2BOtPOy5Su7Cc%2B27QuqpOM7OzuWaKvC8Qu%2Fz%2Fc%2BwetqrWuy%2BXfLKjPHImtSoYvOsOt3k8P3VVc%2FU2%2BzMUs3DsPjWRNChXbS6w%2BehMOyoMuXp9fK3LPz%2F%2F%2FjqbOSxSMzMzP%2F%2F%2FyH5BAEAAD8ALAAAAAAQABAAAAaXwJ9wSCwai6HRZWQ4DlkinsUyOq5A2ImkQGAcb7SCuBTClY6XxgCmuwwItx8nRlwkahKda6PzcnYIKQgIGhAQCx4tMh0JPxknBwcCAgcYAhp2hh0aGTkODaAPCiEHGg8IBhgAGS8eCj0ODiAKDwsCGyoKKBk2MxU1oh8mJiIfDxE%2BPz4UQhQ%2BFQEP0hEkTs0%2BPtXW29xGQQA7"
var iconMessage = "data:image/gif;base64,R0lGODlhEAAQANU%2FAKnS3PH%2B%2F%2B3%2B%2F12dANrt86LK1bvc5OT2%2BoS7AOP2%2B7PV3bLc49br78rl6vf%2B%2F%2Fr%2F%2F4S1wZ%2FR2pvG0dTx9dDr8Yy8yJ%2FP2cfp7MHi57bY37DW4ef9%2F%2BHh4WqmAI%2FIAIyxU5jMAJ7UAMzld3KuANHu8ozAALbf5eDz%2BYi4xKHGaMLe55O%2FzbrZ38fi69%2F1%2BtTtd7TT2oXBzMTfd%2Bn2%2BGSZPm%2BsU3KiRnatVJ%2FO13mzWZjEz6PP3bHW3czMzP%2F%2F%2F%2F%2F%2F%2FyH5BAEAAD8ALAAAAAAQABAAAAalwJ9wSCz%2BCBkFb8lsKjIMhW9KrVZZgAPpkegeDt3EgzTLFHwahi%2FAbvsYCx9A4tvsGtPHY9oAbHwFOj4CExEYVRgREwKAKz4OAgsxBlMGNQOYKRIVUy0aFxY4FjkjIS8hIzecKgYBJxcmJgMgHj4eIAMVDguQLgQUFAMiVCIDKFZUAyUIPgglAzAoENPUEDQdCDIIHTZGQxwfmAMfHN7fPejl5uZBADs%3D"

function fetchMembers(ids) {
	nMembers = ids.length
	html += '<table style="color: rgb(153, 153, 153);">'
	html += '<tr>'
	html += '<th style="text-align: left; background: rgb(220,220,220); padding: 2px">No.</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '<th style="text-align: left; background: rgb(220,220,220); padding: 2px">Name</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Level</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Health</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Happin.</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Location</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Citiz.</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Exp</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Rank</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Military Skill</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">Economy Skill</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '<th style="text-align: center; background: rgb(220,220,220); padding: 2px">&nbsp;</th>'
	html += '</tr>'
	
	for(var i=0;i<ids.length;i++) {
		fetchMember(ids[i])
	}
}

function nameFix(name) {
	name = name.replace(/Bosnia and Herzegovina/, "Bosnia-Herzegovina");
	name = name.replace(/Moscow and Central Russia/, "Moscow-and-Central-Russia");
	name = name.replace(/&/g, "").replace(/ /g, "-").replace(/--/g, "-");
	return (name)
}

function nameFix2(name2) {
	name2 = name2.replace(/Bosnia and Herzegovina/, "Republika Srpska");
	return (name2)
}

function formatWellness(data) {
	if (data < 90 && data >= 60) {
		dataFormat = ' color:#FF9900; font-weight: bold"'
	} else if (data < 60) {
		dataFormat = ' color:#CC0000; font-weight: bold"'
	} else {
		dataFormat = '"'
	}
	return (dataFormat)
}

function formatHappiness(data) {
	if (data < 70 && data >= 50) {
		dataFormat = ' color:#FF9900; font-weight: bold"'
	} else if (data < 50) {
		dataFormat = ' color:#CC0000; font-weight: bold"'
	} else {
		dataFormat = '"'
	}
	return (dataFormat)
}

function formatNumber(number) {
	number = parseFloat(number)
	number = number.toFixed(2)
	number += ''
	return (number)
}

function memberRank(rank) {
	if (rank.toLowerCase() == "field marshal") {
		var cRank = "fieldmarshal"
	} else {
		var cRank = rank.toLowerCase()
	}
	return (cRank)
}

function formatExp(level, experience) {
	if (experience > (parseFloat(levelCap[level]) - (parseFloat(levelCap[level]) * 0.1))) {
		expFormat = ' color:#339900; font-weight: bold"';
	} else {
		expFormat = '"';
	}
	return (expFormat)
}

function getNextExp(level, experience) {
	nextExp = parseFloat(levelCap[level]) - parseFloat(experience);
	return (nextExp)
}

function getNextRank(rank, points) {
	if (rank.toLowerCase() == "field marshal") {
		nextRank = 0;
	} else {
		rank = ranks.indexOf(rank) + 1;
		nextRank = parseFloat(ranksCap[rank]) - parseFloat(points);
	}
	return (nextRank)
}

function nextRankPoints(value) {
	for (var v = 0; v < ranksCap.length; v++) {
		if (parseFloat(value) <= ranksCap[v]) {
			nextRankValue = ranksCap[v];
			break;
		}
	}
	return (nextRankValue)
}

function rankPercent(value) {
	for (var v = 0; v < ranksCap.length; v++) {
		if (parseFloat(value) <= ranksCap[v]) {
			currRankValue = ranksCap[v-1];
			nextRankValue = ranksCap[v];
			rPercent = ((parseFloat(value) - currRankValue) / nextRankValue) * 100;
			rPercent = rPercent.toFixed(2);
			break;
		}
	}
	return (rPercent)
}

function formatWorkSkill(value) {
	for (var s = 0; s < workSkillCap.length; s++) {
		if (value <= workSkillCap[s]) {
			skillValue = workSkillCap[s-1];
			break;
		}
	}
	skillLevel = workSkillCap.indexOf(skillValue) + 1;
	return (skillLevel)
}

function getWorkSkill(value) {
	skillRank = workSkill[parseFloat(value) - 1];
	return (skillRank)
}

function nextSkillPoints(value) {
	for (var v = 0; v < workSkillCap.length; v++) {
		if (parseFloat(value) <= workSkillCap[v]) {
			if (parseFloat(value) == 0) {
				nextSkillValue = workSkillCap[1];
			} else {
				nextSkillValue = workSkillCap[v];
			}
			break;
		}
	}
	return (nextSkillValue)
}

function skillPercent(value) {
	for (var v = 0; v < workSkillCap.length; v++) {
		if (parseFloat(value) <= workSkillCap[v]) {
			if (parseFloat(value) == 0) {
				currSkillValue = 0;
				nextSkillValue = workSkillCap[1];
			} else {
				currSkillValue = workSkillCap[v-1];
				nextSkillValue = workSkillCap[v];
			}
			sPercent = ((parseFloat(value) - currSkillValue) / nextSkillValue) * 100;
			sPercent = sPercent.toFixed(2);
			break;
		}
	}
	return (sPercent)
}

function formatMilitarySkill(value) {
	for (var s = 0; s < militarySkillCap.length; s++) {
		if (value <= militarySkillCap[s]) {
			skillValue = militarySkillCap[s-1];
			break;
		}
	}
	skillLevel = militarySkillCap.indexOf(skillValue) + 1;
	return (skillLevel)
}

function getMilitarySkill(value) {
	skillRank = militarySkill[parseFloat(value) - 1];
	return (skillRank)
}

function nextMilitaryPoints(value) {
	for (var v = 0; v < militarySkillCap.length; v++) {
		if (parseFloat(value) <= militarySkillCap[v]) {
			if (parseFloat(value) == 0) {
				nextSkillValue = militarySkillCap[1];
			} else {
				nextSkillValue = militarySkillCap[v];
			}
			break;
		}
	}
	return (nextSkillValue)
}

function militaryPercent(value) {
	for (var v = 0; v < militarySkillCap.length; v++) {
		if (parseFloat(value) <= militarySkillCap[v]) {
			if (parseFloat(value) == 0) {
				currSkillValue = 0;
				nextSkillValue = militarySkillCap[1];
			} else {
				currSkillValue = militarySkillCap[v-1];
				nextSkillValue = militarySkillCap[v];
			}
			sPercent = ((parseFloat(value) - currSkillValue) / nextSkillValue) * 100;
			sPercent = sPercent.toFixed(2);
			break;
		}
	}
	return (sPercent)
}

function fetchMember(id) {
	var Member = null
	OrderNumber = 1
	
	fmRank = 0
	generalRank = 0
	colonelRank = 0
	captainRank = 0
	lieutenantRank = 0
	sergeantRank = 0
	corporalRank = 0
	privateRank = 0
		
	apprenticeRank = 0
	assistantRank = 0
	juniorRank = 0
	seniorRank = 0
	coordinatorRank = 0
	specialistRank = 0
	expertRank = 0
	masterRank = 0
	guruRank = 0
	guru1Rank = 0
	guru2Rank = 0
	guru3Rank = 0
	guru4Rank = 0
	
	tRifle = 0
	tTank = 0
	tArtillery = 0
	tAirunit = 0
		
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v2/feeds/citizens/'+escape(id)+'.json',
		onload:function(response) {
			try {
				if (is_chrome) {
					Member = eval(response.responseText);
				} else {
					Member = eval('(' + response.responseText + ')');
				}
				
				var workSkill = getWorkSkill(formatWorkSkill(Member.work_skill_points));
				
				if (workSkill == 'Apprentice') {
					apprenticeRank = apprenticeRank + 1;
				} else if (workSkill == 'Assistant') {
					assistantRank = assistantRank + 1;
				} else if (workSkill == 'Junior') {
					juniorRank = juniorRank + 1;
				} else if (workSkill == 'Senior') {
					seniorRank = seniorRank + 1;
				} else if (workSkill == 'Coordinator') {
					coordinatorRank = coordinatorRank + 1;
				} else if (workSkill == 'Specialist') {
					specialistRank = specialistRank + 1;
				} else if (workSkill == 'Expert') {
					expertRank = expertRank + 1;
				} else if (workSkill == 'Master') {
					masterRank = masterRank + 1;
				} else if (workSkill == 'Guru') {
					guruRank = guruRank + 1;
				} else if (workSkill == 'Guru *') {
					guru1Rank = guru1Rank + 1;
				} else if (workSkill == 'Guru **') {
					guru2Rank = guru2Rank + 1;
				} else if (workSkill == 'Guru ***') {
					guru3Rank = guru3Rank + 1;
				} else if (workSkill == 'Guru ****') {
					guru4Rank = guru4Rank + 1;
				}
				
				var workerImg = ""
				var workerLnk = ""
				var rifleValueIn = 0;
				var tankValueIn = 0;
				var artilleryValueIn = 0;
				var airunitValueIn = 0;
				
				//=============== Skill =====================
				var memberMilitaryIn = eval(Member.military_skills)
				
				for (var i=0; i < memberMilitaryIn.length; i++) {
					memberMilitaryNameIn = memberMilitaryIn[i].name;
					memberMilitaryValueIn = memberMilitaryIn[i].points;
					
					if (memberMilitaryNameIn == "Rifle") {
						rifleValueIn = parseFloat(memberMilitaryValueIn);
					} else if (memberMilitaryNameIn == "Tank") {
						tankValueIn = parseFloat(memberMilitaryValueIn);
					} else if (memberMilitaryNameIn == "Artillery") {
						artilleryValueIn = parseFloat(memberMilitaryValueIn);
					} else if (memberMilitaryNameIn == "Air unit") {
						airunitValueIn = parseFloat(memberMilitaryValueIn);
					}
				}
				
				var militaryNameArray = ["Rifle", "Tank", "Artillery", "Air unit"];
				var militaryValueArray = [rifleValueIn, tankValueIn, artilleryValueIn, airunitValueIn];
				var maxMilitaryValue = militaryValueArray[0];
				var maxMilitaryName = militaryNameArray[0];
				
				for (i = 1; i < militaryValueArray.length; i++) {
					if (militaryValueArray[i] > maxMilitaryValue) {
						maxMilitaryValue = militaryValueArray[i];
						maxMilitaryName = militaryNameArray[i];
					}	
				}
				
				if (maxMilitaryName == "Rifle") {
					tRifle = tRifle + 1
				} else if (maxMilitaryName == "Tank") {
					tTank = tTank + 1
				} else if (maxMilitaryName == "Artillery") {
					tArtillery = tArtillery + 1
				} else if (maxMilitaryName == "Air unit") {
					tAirunit = tAirunit + 1
				}
				
				//=============== Rank ======================
				var cRank = Member.military.rank
				if (cRank.toLowerCase() == "field marshal") {
					fmRank = fmRank + 1
				} else if (cRank.toLowerCase() == "general") {
					generalRank = generalRank + 1
				} else if (cRank.toLowerCase() == "colonel") {
					colonelRank = colonelRank + 1
				} else if (cRank.toLowerCase() == "captain") {
					captainRank = captainRank + 1
				} else if (cRank.toLowerCase() == "lieutenant") {
					lieutenantRank = lieutenantRank + 1
				} else if (cRank.toLowerCase() == "sergeant") {
					sergeantRank = sergeantRank + 1
				} else if (cRank.toLowerCase() == "corporal") {
					corporalRank = corporalRank + 1
				} else if (cRank.toLowerCase() == "private") {
					privateRank = privateRank + 1
				}
								
				//=============== Employment Image ==========
				if (Member.employer.name) {
					if (Member.employer.name.match('SJeB')) {
						workerImg = '<img title="Employed in '+Member.employer.name+'" src="'+iconWorker+'">'
					} else {
						workerImg = '<img title="Not employed in SJeB" src="'+iconNoWorker+'">'
					}
				} else {
					workerImg = '<img title="Unemployed" src="'+iconUnemployed+'">'
				}
								
				var imghover = '<span class="image" style="z-index: 999; font-weight: normal;"><table><tr class="hlimage"><td class="image"><img src="'+Member.avatar_link.replace(/_55x55/, "")+'" height="100px" width="100px"></td></tr></table></span>';
				
				var div1 = '<div class="tooltip1">'+Member.experience_points+'<span class="hover1" style="z-index: 999; font-weight: normal;"><table><tr class="highlight"><td>Experience to next level: <strong>'+getNextExp(Member.level, Member.experience_points)+'</strong></td></tr></table></span></div>'; // Experience
				
				var div2 = '<div class="tooltip1"><img src="http://www.erepublik.com/images/icons/ranks/'+memberRank(Member.military.rank)+'.png" width="15px" height="15px"><span class="hover2" style="z-index: 999;"><table width="150px"><tr class="highlight"><td width="150px" height="15px" valign="middle" style="text-align: center; border-bottom-style:solid; border-bottom-color: #cccccc; border-bottom-width: 1px;">'+Member.military.rank+'</td></tr><tr class="highlight"><td width="150px" align="center" valign="middle" height="30px"><table border="0"><tr><td height="10px" style="font-size:9px; text-align:center;">'+Member.military.rank_points+' / '+nextRankPoints(Member.military.rank_points)+' ('+rankPercent(Member.military.rank_points)+'%)</td></tr><tr><td height="10px"><div class="bar experience"><div class="border"><span class="lefts"></span><span class="mids" style="width: 110px;"></span><span class="rights"></span></div><div class="fill"><span class="lefts"></span><span class="mids" style="width: '+rankPercent(Member.military.rank_points)+'%;"></span><span class="rights"></span></div></div></td></tr></table></td></tr></table></span></div>';
				
				var div3 = '<div class="tooltip1"><img src="http://www.erepublik.com/images/icons/skills/'+maxMilitaryName.replace(" ", "").toLowerCase()+'.png" width="16px" height="16px"><span class="hover3" style="z-index: 999; font-weight: normal;"><table><tr class="highlight"><td width="70px" style="text-align: center; border-bottom-style:solid; border-bottom-color: #cccccc; border-bottom-width: 1px;">'+maxMilitaryName+'</td></tr><tr class="highlight"><td align="center"><img src="http://www.erepublik.com/images/icons/skills/'+maxMilitaryName.replace(" ", "").toLowerCase()+'.png" width="30px" height="30px"></td></tr></table></span></div>';
				
				var div5 = '<div class="tooltip1"><font class="skiller" title="'+getMilitarySkill(formatMilitarySkill(maxMilitaryValue))+'"><strong>'+formatMilitarySkill(maxMilitaryValue)+'</strong></font> '+getMilitarySkill(formatMilitarySkill(maxMilitaryValue))+'<span class="hover5" style="z-index: 999; font-weight: normal;"><table><tr class="highlight"><td><img src="http://www.erepublik.com/images/icons/skills/rifle.png" width="20px" height="20px"></td><td width="150px" align="center" valign="middle" height="30px"><table border="0"><tr><td height="10px">'+rifleValueIn+' / '+nextMilitaryPoints(rifleValueIn)+' ('+militaryPercent(rifleValueIn)+'%)</td></tr><tr><td height="10px"><div class="bar experience"><div class="border"><span class="lefts"></span><span class="mids" style="width: 110px;"></span><span class="rights"></span></div><div class="fill"><span class="lefts"></span><span class="mids" style="width: '+militaryPercent(rifleValueIn)+'%;"></span><span class="rights"></span></div></div></td></tr></table></td></tr><tr class="highlight"><td><img src="http://www.erepublik.com/images/icons/skills/tank.png" width="20px" height="20px"></td><td width="150px" align="center" valign="middle" height="30px"><table border="0"><tr><td height="10px">'+tankValueIn+' / '+nextMilitaryPoints(tankValueIn)+' ('+militaryPercent(tankValueIn)+'%)</td></tr><tr><td height="10px"><div class="bar experience"><div class="border"><span class="lefts"></span><span class="mids" style="width: 110px;"></span><span class="rights"></span></div><div class="fill"><span class="lefts"></span><span class="mids" style="width: '+militaryPercent(tankValueIn)+'%;"></span><span class="rights"></span></div></div></td></tr></table></td></tr><tr class="highlight"><td><img src="http://www.erepublik.com/images/icons/skills/artillery.png" width="20px" height="20px"></td><td width="150px" align="center" valign="middle" height="30px"><table border="0"><tr><td height="10px">'+artilleryValueIn+' / '+nextMilitaryPoints(artilleryValueIn)+' ('+militaryPercent(artilleryValueIn)+'%)</td></tr><tr><td height="10px"><div class="bar experience"><div class="border"><span class="lefts"></span><span class="mids" style="width: 110px;"></span><span class="rights"></span></div><div class="fill"><span class="lefts"></span><span class="mids" style="width: '+militaryPercent(artilleryValueIn)+'%;"></span><span class="rights"></span></div></div></td></tr></table></td></tr><tr class="highlight"><td><img src="http://www.erepublik.com/images/icons/skills/airunit.png" width="20px" height="20px"></td><td width="150px" align="center" valign="middle" height="30px"><table border="0"><tr><td height="10px">'+airunitValueIn+' / '+nextMilitaryPoints(airunitValueIn)+' ('+militaryPercent(airunitValueIn)+'%)</td></tr><tr><td height="10px"><div class="bar experience"><div class="border"><span class="lefts"></span><span class="mids" style="width: 110px;"></span><span class="rights"></span></div><div class="fill"><span class="lefts"></span><span class="mids" style="width: '+militaryPercent(airunitValueIn)+'%;"></span><span class="rights"></span></div></div></td></tr></table></td></tr></td></tr></table></span></div>';
				
				html += '<tr valign="middle" class="member">'
				html += '<td valign="middle" style="text-align: center">'+OrderNumber+'</td>'
				html += '<td valign="middle" style="text-align: center" width="30px"><a href="'+Member.avatar_link.replace(/_55x55/, "")+'" target="_blank"><img src="'+Member.avatar_link+'" height="14px" width="14px"></a>'+imghover+'</td>'
				html += '<td valign="middle"><a href="/en/citizen/profile/'+Member.id+'">'+Member.name+'</a></td>'
				html += '<td valign="middle" style="text-align:center">'+Member.level+'</td>'
				html += '<td valign="middle" style="padding-right: 10px; text-align:right;'+formatWellness(formatNumber(Member.wellness))+'>'+formatNumber(Member.wellness)+'</td>'
				html += '<td valign="middle" style="padding-right: 10px; text-align:right;'+formatHappiness(formatNumber(Member.happiness))+'>'+formatNumber(Member.happiness)+'</td>'
				html += '<td valign="middle" style="text-align: left"><p style="white-space: nowrap; width: 190px; overflow: hidden;"><img title="'+nameFix2(Member.residence.country.name)+'" src="http://www.erepublik.com/images/flags/M/'+nameFix(Member.residence.country.name)+'.gif" height="14px"> <a title="'+nameFix2(Member.residence.country.name)+'" href="/en/country/'+nameFix(Member.residence.country.name)+'">'+nameFix2(Member.residence.country.name)+'</a>, <a title="'+nameFix2(Member.residence.region.name)+'" href="/en/region/'+nameFix(Member.residence.region.name)+'">'+Member.residence.region.name+'</a></p></td>'
				html += '<td valign="middle" align="center"><a title="'+nameFix2(Member.citizenship.country.name)+'" href="/en/country/'+nameFix(Member.citizenship.country.name)+'"><img title="'+nameFix2(Member.citizenship.country.name)+'" src="http://www.erepublik.com/images/flags/M/'+nameFix(Member.citizenship.country.name)+'.gif" height="14px"></a></td>'
				html += '<td valign="middle" width="50px" style="padding-right: 5px; text-align: right;'+formatExp(Member.level, Member.experience_points)+'>'+div1+'</td>'
				html += '<td valign="middle" align="center" style="padding-left: 4px">'+div2+'</td>'
				html += '<td>'
				html += '<table>'
				html += '<tr>'
				html += '<td valign="middle" width="20px" align="center" style="padding-left: 3px">'+div3+'</td>'
				html += '<td valign="middle" align="left" style="text-align:left"><p style="white-space: nowrap; width: 80px; overflow: hidden;">'+div5+'</p></td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '<td>'
				html += '<table>'
				html += '<tr>'
				html += '<td valign="middle" width="20px" align="center" style="padding-left: 3px">&nbsp;</td>'
				html += '<td valign="middle" align="left" style="text-align:left"><p style="white-space: nowrap; width: 80px; overflow: hidden;"><div class="tooltip1"><font class="skiller" title="'+getWorkSkill(formatWorkSkill(Member.work_skill_points))+'"><strong>'+formatWorkSkill(Member.work_skill_points)+'</strong></font> '+getWorkSkill(formatWorkSkill(Member.work_skill_points))+'</div></p></td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				if (Member.employer.name){
					html += '<td valign="middle" width="30px" align="left" style="text-align:left; padding-left: 5px"><a href="http://economy.erepublik.com/en/company/'+Member.employer.name.replace(/ /gi, "-").toLowerCase()+'/'+Member.employer.id+'" target="_blank">'+workerImg+'</a></td>'
				} else {
					html += '<td valign="middle" width="30px" align="left" style="text-align:left; padding-left: 5px">'+workerImg+'</td>'
				}				html += '<td valign="middle" style="text-align:center; padding: 2px 3px 0px 3px;"><a href="http://economy.erepublik.com/en/citizen/donate/'+Member.id+'"><img title="Donate" src="'+iconDonate+'"></a></td>'
				html += '<td valign="middle" style="text-align:center; padding: 2px 8px 0px 3px;"><a href="http://www.erepublik.com/en/messages/compose/'+Member.id+'"><img title="Send message" src="'+iconMessage+'"></a></td>'
				html += '</tr>'
				
				MembersMap[id] = Member
				OrderNumber = OrderNumber + 1
			}
			catch(err) {
			}
			
			if (++count==nMembers) {
				html += '<tr>'
				html += '<td colspan="16" align="center">'
				html += '<table width="100%">'
				html += '<tr style="background: rgb(220,220,220);">'
				html += '<td style="text-align: center;">Rank summary</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td align="center">'
				html += '<table>'
				html += '<tr>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Field Marshals</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Generals</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Colonels</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Captains</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Lieutenants</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Sergeants</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Corporals</td>'
				html += '<td colspan="2" width="90px" align="center" valign="middle" nowrap="nowrap">Privates</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Field Marshal" src="http://www.erepublik.com/images/icons/ranks/fieldmarshal.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+fmRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="General" src="http://www.erepublik.com/images/icons/ranks/general.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+generalRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Colonel" src="http://www.erepublik.com/images/icons/ranks/colonel.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+colonelRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Captain" src="http://www.erepublik.com/images/icons/ranks/captain.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+captainRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Lieutenant" src="http://www.erepublik.com/images/icons/ranks/lieutenant.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+lieutenantRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Sergeant" src="http://www.erepublik.com/images/icons/ranks/sergeant.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+sergeantRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Corporal" src="http://www.erepublik.com/images/icons/ranks/corporal.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+corporalRank+'</span></td>'
				html += '<td width="45px" height="40px" align="right" valign="middle" nowrap="nowrap"><img title="Private" src="http://www.erepublik.com/images/icons/ranks/private.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="45px">&nbsp;<span style="font-size: 18px">'+privateRank+'</span></td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td colspan="16" align="center">'
				html += '<table width="100%">'
				html += '<tr style="background: rgb(220,220,220);">'
				html += '<td style="text-align: center;">Economy skill summary</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td align="center">'
				html += '<table>'
				html += '<tr>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Guru ****</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Guru ***</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Guru **</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Guru *</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Guru</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Master</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Expert</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Specialist</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Coordinator</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Senior</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Junior</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Assistant</td>'
				html += '<td width="70px" align="center" valign="middle" nowrap="nowrap">Apprentice</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+guru4Rank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+guru4Rank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+guru2Rank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+guru1Rank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+guruRank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+masterRank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+expertRank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+specialistRank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+coordinatorRank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+seniorRank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+juniorRank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+assistantRank+'</span></td>'
				html += '<td width="70px" height="40px" align="center"><span style="font-size: 18px">'+apprenticeRank+'</span></td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td colspan="16" align="center">'
				html += '<table width="100%">'
				html += '<tr style="background: rgb(220,220,220);">'
				html += '<td style="text-align: center;">Military skill summary</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td align="center">'
				html += '<table>'
				html += '<tr>'
				html += '<td colspan="2" width="80px" align="center" valign="middle" nowrap="nowrap">Rifle</td>'
				html += '<td colspan="2" width="80px" align="center" valign="middle" nowrap="nowrap">Tank</td>'
				html += '<td colspan="2" width="80px" align="center" valign="middle" nowrap="nowrap">Artillery</td>'
				html += '<td colspan="2" width="80px" align="center" valign="middle" nowrap="nowrap">Air unit</td>'
				html += '</tr>'
				html += '<tr>'
				html += '<td width="40px" height="40px" align="right" valign="middle" nowrap="nowrap"><img src="http://www.erepublik.com/images/icons/skills/rifle.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="40px">&nbsp;<span style="font-size: 18px">'+tRifle+'</span></td>'
				html += '<td width="40px" height="40px" align="right" valign="middle" nowrap="nowrap"><img src="http://www.erepublik.com/images/icons/skills/tank.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="40px">&nbsp;<span style="font-size: 18px">'+tTank+'</span></td>'
				html += '<td width="40px" height="40px" align="right" valign="middle" nowrap="nowrap"><img src="http://www.erepublik.com/images/icons/skills/artillery.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="40px">&nbsp;<span style="font-size: 18px">'+tArtillery+'</span></td>'
				html += '<td width="40px" height="40px" align="right" valign="middle" nowrap="nowrap"><img src="http://www.erepublik.com/images/icons/skills/airunit.png" width="20px" height="20px">&nbsp;</td>'
				html += '<td width="40px">&nbsp;<span style="font-size: 18px">'+tAirunit+'</span></td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '</table>'
				html += '</td>'
				html += '</tr>'
				html += '</table>'
				
				var displayEl = document.createElement("div");
				displayEl.setAttribute('class', 'core');
				displayEl.setAttribute('style', 'padding-bottom:10px;');
				displayEl.setAttribute('align', 'center');
				displayEl.innerHTML = html;
				latest=document.getElementById('footer');
				latest.parentNode.insertBefore(displayEl, latest);
			}
		}
	});
}

function $(A) {
	return document.getElementById(A);
}

function preFetchMembers() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://sjeb.freehostia.com/membersdata',
		onload:function(response) {
			var spisak_string = response.responseText;
			var fo = spisak_string.split('|');
			var f = null
			f = eval(fo)
			
			fetchMembers(f)
		}
	});
}

function Main(e) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://sjeb.freehostia.com/usersdata',
		onload:function(response) {
			var statusData = "off";
			
			var mApprovedMain = document.getElementById('miniprofile').innerHTML;
			mApprovedMain = mApprovedMain.match('profile/.*?"');
			mApprovedMain = mApprovedMain.join("");
			mApprovedMain = mApprovedMain.substring(mApprovedMain.indexOf('/')+1,mApprovedMain.length-1);
			
			var userIds = response.responseText;
			userIds = userIds.split('|');
			userIds = eval(userIds);
			
			for (var c=0; c < userIds.length; c++) {
				if (mApprovedMain == userIds[c]) {
					statusData = "on";
				}
			}
			if (statusData == "on") {
				preFetchMembers();
			} else if (statusData == "off") {
				html += '</br>'
				html += '<div>You are not authorised to use this script!</div>'
				
				var displayEl = document.createElement("div");
				displayEl.setAttribute('class', 'core');
				displayEl.setAttribute('style', 'padding-bottom:10px;');
				displayEl.setAttribute('align', 'center');
				displayEl.innerHTML = html;
				latest=document.getElementById('footer');
				latest.parentNode.insertBefore(displayEl, latest);
			}
		}
	});
}

window.addEventListener('load', Main, false);

// ===============================================================================
// License and Disclaimer
// ===============================================================================
// This software is donationware. You are welcome to donate eRepublik in-game gold
// to author of this script.  Amount of gold is up to you and it reflects what you
// think author deserves for the effort of contributing to the eRepublik community.
// Software is provided 'AS IS' and without any warranty.
// Use on your own responsibility.
// ===============================================================================