// ==UserScript==
// @name           Training Test
// @namespace      pbr
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.07.14
// ==/UserScript==

window.setTimeout( function() {
	setup();
	addEvents();
	updateTrainingTable();
}, 100);

var skills = ["strength","speed","agility","jumping","stamina","vision","confidence",
			  "blocking","tackling","throwing","catching","carrying","kicking","punting"];

function Archetype() {
	this.name = null;
	this.position = null;
	this.major = [];
	this.minor = [];
}

var attPct = new Array();
/*
function getArchetypes() {
	var archs = 
[["Pass Blocker","Center",["agility","blocking","confidence","vision"],["speed","stamina","strength"] ],
 ["Run Blocker","Center",["blocking","confidence","strength","vision"],["agility","speed","stamina"] ],
 ["Special Teamer","Center",["agility","blocking","speed","stamina","tackling"],["confidence","strength","vision"] ],
 ["Man Specialist","Cornerback",["agility","jumping","speed","vision"],["catching","confidence","stamina","tackling"] ],
 ["Zone Specialist","Cornerback",["agility","speed","tackling","vision"],["catching","confidence","jumping","stamina"] ],
 ["Hard Hitter","Cornerback",["speed","strength","tackling","vision"],["agility","confidence","jumping","stamina"] ],
 ["Combo Corner","Cornerback",["agility","speed","strength","tackling"],["vision","confidence","jumping","stamina"] ],
 ["Returner","Cornerback",["agility","carrying","speed","stamina","vision"],["confidence","jumping","strength"] ],
 ["Special Teamer","Cornerback",["agility","blocking","speed","stamina","tackling"],["confidence","strength","vision"] ];

	var arr = [];
	for (var i=0; i<archs.length; i++) {
		var a = new Archetype();	
		a.name = archs[i][0];
		a.position = archs[i][1];
		a.major = archs[i][2];
		a.minor = archs[i][3];
		arr.push(a);
	}
	return arr;
}
*/
function setup() {
	for (var i=0; i<skills.length; i++) {
		attPct[skills[i]] = 0;
	}

	var tbl = new Array();
	tbl[0] = document.createElement("table");
	setupAttributeTable(tbl[0]);
	
	tbl[1] = document.createElement("table");
	setupTrainingTable(tbl[1]);

	tbl[2] = document.createElement("table");
	setupButtonTable(tbl[2]);

	tbl[3] = document.createElement("table");
	setupStatusTable(tbl[3]);

	var ui = document.createElement("table");
	var tr = document.createElement("tr");
	for (var i=0; i<tbl.length; i++) {
		var td = document.createElement("td");
		td.appendChild(tbl[i]);
		tr.appendChild(td);
	}
	ui.appendChild(tr);

	var ftr = document.getElementById("footer");
	ftr.parentNode.insertBefore(ui,ftr);

	var sel = document.getElementById("training-type");
	for (var i=0; i<sel.options.length; i++) {
		sel.options[i].disabled = false;
	}
	var sel = document.getElementById("training-0");
	for (var i=0; i<sel.options.length; i++) {
		sel.options[i].disabled = false;
	}
	for (var i=1; i<4; i++) {
		var sel = document.getElementById("training-"+i);
		sel.disabled = true;
	}
}

function addEvents() {
	for (var i=0; i<skills.length; i++) {
		var btn = document.getElementById(skills[i]+"-add");
		btn.addEventListener("click",addPoint,false);
		var btn = document.getElementById(skills[i]+"-sub");
		btn.addEventListener("click",subtractPoint,false);

		for (var j=0; j<5; j++) {
			var btn = document.getElementById(skills[i]+"-bonus-"+j);
			btn.addEventListener("click",buyBonus,false);
		}
	}

	var btn = document.getElementById("BuySkillPoint-button");
	btn.addEventListener("click",buySkillPoint,false);

	var btn = document.getElementById("BuyTempBonus-button");
	btn.addEventListener("click",buyTempBonus,false);

	var btn = document.getElementById("BuyShoppingToken-button");
	btn.addEventListener("click",buyShoppingToken,false);

	var btn = document.getElementById("Boost-button");
	btn.addEventListener("click",boost,false);

	var btn = document.getElementById("Advance-button");
	btn.addEventListener("click",advance,false);

	var btn = document.getElementById("Train-button");
	btn.addEventListener("click",train,false);

	var btn = document.getElementById("Clear-button");
	btn.addEventListener("click",clear,false);

	var btn = document.getElementById("EatSpinach-button");
	btn.addEventListener("click",eatSpinach,false);

	var btn = document.getElementById("training-type");
	btn.addEventListener("click",selectTrainingType,false);

	for (var i=0; i<4; i++) {
		var btn = document.getElementById("training-"+i);
		btn.addEventListener("click",updateTrainingTable,false);
	}

	for (var i=0; i<skills.length; i++) {
		var btn = document.getElementById(skills[i]+"-multi");
		btn.addEventListener("click",buyMulti,false);
	}
}

function buyMulti(e) {
	if (e.target.checked == true) {
		var unlocked = 0;
		for (var i=0; i<skills.length; i++) {
			var btn = document.getElementById(skills[i]+"-multi");
			if (btn.checked == true) unlocked++;
		}

		var tokens = document.getElementById("BonusTokens");
		if (parseInt(tokens.innerHTML) < unlocked*5) {
			console.log("can't afford to unlock");
			e.target.checked = false;
		}
		else {
			console.log("unlocking");
			tokens.innerHTML = parseInt(tokens.innerHTML) - unlocked*5;
		}
	}
	else {
		e.target.checked = true;
	}
	updateTrainingTable();
}

function selectTrainingType(e) {
	console.log("selectTrainingType : "+e.target.value);
	var value = e.target.value;
	if (value != "multi") {
		for (var i=1; i<4; i++) {
			var sel = document.getElementById("training-"+i);
			sel.selectedIndex = 0;
			sel.disabled = true;
		}
	}
	else {
		for (var i=1; i<4; i++) {
			var sel = document.getElementById("training-"+i);
			sel.disabled = false;
		}
	}
	updateTrainingTable();
}

function train(e) {
	var type = document.getElementById("training-type").value;
	if (type != "multi") {
		var tokens = 2;
		var cost = 2;
		switch (type) {
			case "light" : tokens = 3; break;
			case "intense" : tokens = 1; break;
		}

		if (parseInt(document.getElementById("TrainingPoints").innerHTML) < cost) {
			console.log("can't afford training : "+cost);
			return;
		}

		var att = document.getElementById("training-0");
		if (att.selectedIndex != 0) {
			var val = document.getElementById(att.value+"-value"); 
			var result = parseFloat(document.getElementById(att.value+"-pct").innerHTML)/100;
			console.log("training : "+att.value+" + "+attPct[att.value]+" | "+result+" == "+cost);
			attPct[att.value] += result;
			if (attPct[att.value] >= 1) {
				attPct[att.value] -= 1;
				val.innerHTML = (parseFloat(val.innerHTML) + 1).toFixed(2);
			}
			val.style.width = Math.round(100*attPct[att.value])+"%";

			var tp = document.getElementById("TrainingPoints");
			tp.innerHTML = parseInt(tp.innerHTML) - cost;

			var bt = document.getElementById("BonusTokens");
			bt.innerHTML = parseInt(bt.innerHTML) + tokens;
		}
	}
	else {
		var multi = 0;
		for (var i=0; i<4; i++) {
			var sel1 = document.getElementById("training-"+i);
			if (sel1.selectedIndex == 0) continue;

			multi++;
			for (var j=i+1; j<4; j++) {
				var sel2 = document.getElementById("training-"+j);
				if (sel1.selectedIndex == sel2.selectedIndex) {
					console.log("invalid training");
					return;
				}
			}
		}

		if (parseInt(document.getElementById("TrainingPoints").innerHTML) < (multi*2)) {
			console.log("can't afford training : "+(multi*2));
			return;
		}

		var trained = 0;
		var cost = 2;
		for (var i=0; i<4; i++) {
			var att = document.getElementById("training-"+i);
			if (att.selectedIndex != 0) {
				trained++;
				var val = document.getElementById(att.value+"-value");
				var result = parseFloat(document.getElementById(att.value+"-pct").innerHTML)/100;
				console.log("training : "+att.value+" + "+result+" == "+cost);
				attPct[att.value] += result;
				if (attPct[att.value] >= 1) {
					attPct[att.value] -= 1;
					val.innerHTML = (parseFloat(val.innerHTML) + 1).toFixed(2);
				}
				val.style.width = Math.round(100*attPct[att.value])+"%";

				var tp = document.getElementById("TrainingPoints");
				tp.innerHTML = parseInt(tp.innerHTML) - cost;
			}
		}
		switch (trained) {
			case 2 : trained = 2; break;
			case 3 : trained = 4; break;
			case 4 : trained = 6; break;
		}
		var bt = document.getElementById("BonusTokens");
		bt.innerHTML = parseInt(bt.innerHTML) + trained;
	}

	updateTrainingTable();
}

function updateTrainingTable() {
	var tokens = 2;
	var type = document.getElementById("training-type").value;
	console.log(type);
	var bonus_type = 0.85;
	var bonus_multi = 1;
	var bonus_enhanced = 1;
	if (type == "light") {	
		bonus_type = 0.40; 
		tokens = 3;
	}
	else if (type == "intense") {
		bonus_type = 1.20; 
		tokens = 1;
	}
	else if (type == "multi") {
		var mb = [0,0,5,20,30];
		var multis = 0;
		for (var i=0; i<4; i++) {
			var sel = document.getElementById("training-"+i);
			if (sel.value != "-none-") {
				multis++;
			}
		}
		tokens = multis;
		bonus_type = 1.20;
		bonus_multi = 1 + mb[multis]/100;
	}

	for (var i=0; i<skills.length; i++) {
		bonus_enhanced = 1;
		var value = document.getElementById(skills[i]+"-value");
		var v = Math.floor(parseFloat(value.innerHTML))+"";
		for (var j=0; j<5; j++) {
			if (document.getElementById(skills[i]+"-bonus-"+j).checked == true) {
				bonus_enhanced += 0.1;
			}
			else {
				break;
			}
		}

		var pct = document.getElementById(skills[i]+"-pct");
		var tc = trainingChart[v];
		if (tc == null) tc = 1;
		console.log(skills[i]+" -("+v+"/"+tc+")-> bt="+bonus_type+" -- bm="+bonus_multi+" -- be="+bonus_enhanced+" -- tokens="+tokens);
//		var tc = 100*(0.79 * Math.exp(-0.0365*(parseFloat(value.innerHTML))))-0.016;
//		pct.innerHTML = (tc*bonus).toFixed(2) + "%";
		tc = (tc * bonus_type * bonus_enhanced).toFixed(0);
		pct.innerHTML = (tc*bonus_multi).toFixed(1);
	}

	for (var i=0; i<4; i++) {
		var sel = document.getElementById("training-"+i);
		for (var j=1; j<sel.options.length; j++) {
			if (document.getElementById(sel.options[j].text+"-multi").checked == true) {
				sel.options[j].disabled = false;
			}
		}
	}
}

function advance(e) {
	var day = document.getElementById("Day");
	var season = document.getElementById("Season");
	var level = document.getElementById("Level");
	var boosts = document.getElementById("Boosts");
	var xp = document.getElementById("XP");
	var vxp = document.getElementById("VXP");
	var training = document.getElementById("TrainingPoints");
	var age = document.getElementById("Age");

	if (parseInt(day.innerHTML) == 40) {
		if (document.getElementById("HaltOnBoost").checked == true) {
			if (parseInt(boosts.innerHTML) > 0) {
				return;
			}
		}
	}
	if (parseInt(age.innerHTML) < 400) {
		var arr = dailyXP[level.innerHTML];
		if (arr == null) arr = [25,100];

		if (parseInt(day.innerHTML) != 40) {
			xp.innerHTML = parseInt(xp.innerHTML) + arr[0];
		}

		if (parseInt(day.innerHTML) < 32) {
			if (parseInt(day.innerHTML) % 2 == 0) {
				xp.innerHTML = parseInt(xp.innerHTML) + arr[1];
			}
		}
	}

	if (parseInt(level.innerHTML) >= 25) {
		var arr = dailyVXP[level.innerHTML];
		if (arr == null) arr = 200;
		vxp.innerHTML = parseInt(vxp.innerHTML) + arr;
	}

	training.innerHTML = parseInt(training.innerHTML)+2;

	if (parseInt(xp.innerHTML) >= 1000) {
		xp.innerHTML = parseInt(xp.innerHTML)-1000;
		var tmp = boosts.innerHTML;
		boosts.innerHTML = 3;
		boost(null);
		boosts.innerHTML = tmp;
	}

	if (parseInt(day.innerHTML) == 40) {
		day.innerHTML = 0;
		season.innerHTML = parseInt(season.innerHTML)+1;
		boosts.innerHTML = 3;
		training.innerHTML = parseInt(training.innerHTML)+12;
	}
	else {
		day.innerHTML = parseInt(day.innerHTML)+1;
		age.innerHTML = parseInt(age.innerHTML)+1;
	}

	if (document.getElementById("AutoTrain").checked == true) {
		train(null);
	}
}

function clear(e) {
	for (var i=0; i<4; i++) {
		var sel = document.getElementById("training-"+i);
		sel.selectedIndex = 0;
	}
	updateTrainingTable();
}

function boost(e) {
	var boosts = document.getElementById("Boosts");
	if (parseInt(boosts.innerHTML) == 0) {
		console.log("no boosts left");
		return;
	}
	boosts.innerHTML = parseInt(boosts.innerHTML)-1;

	var sp = document.getElementById("SkillPoints");
	sp.innerHTML = parseInt(sp.innerHTML)+5;

	var lvl = document.getElementById("Level");
	lvl.innerHTML = parseInt(lvl.innerHTML)+1;

	var l = parseInt(lvl.innerHTML);
	var major = 2;
	var minor = 1;
	if (l > 21) {
    	major = 1.5;
        minor = 0.75;
	}
	if (l > 29) {
        major = 1.125;
        minor = 0.5625;
	}
	if (l > 37) {
        major = 0.84375;
        minor = 0.421875;
    }

	var numMajors = document.body.innerHTML.split("primary_ability").length-1;
	var numMinors = document.body.innerHTML.split("secondary_ability").length-1;

	var an = document.getElementsByClassName("attribute_name");
	for (var i=0; i<an.length; i++) {
		if (an[i].innerHTML.indexOf("primary_ability") != -1) {		
			var bonus = major / numMajors;
			var att = an[i].nextSibling.nextSibling.id;
			var val = document.getElementById(att+"-value");
			val.innerHTML = (parseFloat(val.innerHTML) + bonus).toFixed(2);
		}
		else if (an[i].innerHTML.indexOf("secondary_ability") != -1) {		
			var bonus = minor / numMinors;
			var att = an[i].nextSibling.nextSibling.id;
			var val = document.getElementById(att+"-value");
			val.innerHTML = (parseFloat(val.innerHTML) + bonus).toFixed(2);
		}
	}

	updateTrainingTable();
}

function buyTempBonus(e) {
	var tokens = document.getElementById("BonusTokens");
	if (parseInt(tokens.innerHTML) >= 4) {
		console.log("can afford it : "+parseInt(tokens.innerHTML)+" > 4");
		tokens.innerHTML = parseInt(tokens.innerHTML)-4;
	}
	else {
		console.log("can't afford it : "+parseInt(tokens.innerHTML)+" < 4");
	}
}

function buySkillPoint(e) {
	var tokens = document.getElementById("BonusTokens");
	if (parseInt(tokens.innerHTML) >= 12) {
		console.log("can afford it : "+parseInt(tokens.innerHTML)+" > 12");
		tokens.innerHTML = parseInt(tokens.innerHTML)-12;
		var sp = document.getElementById("SkillPoints");
		sp.innerHTML = parseInt(sp.innerHTML)+1;
	}
	else {
		console.log("can't afford it : "+parseInt(tokens.innerHTML)+" < 12");
	}
}

function buyShoppingToken(e) {
	var tokens = document.getElementById("BonusTokens");
	if (parseInt(tokens.innerHTML) >= 3) {
		console.log("can afford it : "+parseInt(tokens.innerHTML)+" > 3");
		tokens.innerHTML = parseInt(tokens.innerHTML)-3;
		var st = document.getElementById("ShoppingTokens");
		st.innerHTML = parseInt(st.innerHTML)+1;
	}
	else {
		console.log("can't afford it : "+parseInt(tokens.innerHTML)+" < 3");
	}
}

function buyBonus(e) {
	if (e.target.checked == true) {
		var lvl = parseInt(e.target.id.split("-")[2]);
		for (var i=0; i<lvl; i++) {
			var cbs = e.target.id.slice(0,e.target.id.length-1)+i;
			var cbx = document.getElementById(cbs);
			if (cbx.checked == false) {
				e.target.checked = false;
				console.log("prerequisite not met : "+cbs);
				return;
			}
		}
		var tokens = document.getElementById("BonusTokens");
		if (parseInt(tokens.innerHTML) >= (lvl+1)*5) {
			console.log("can afford it : "+parseInt(tokens.innerHTML)+" > "+(lvl+1)*5);
			tokens.innerHTML = parseInt(tokens.innerHTML) - (lvl+1)*5;
			updateTrainingTable();
		}
		else {
			console.log("can't afford it : "+parseInt(tokens.innerHTML)+" < "+(lvl+1)*5);
			e.target.checked = false;
		}
	}
	else {
		e.target.checked = true;
	}
}

function addPoint(e) {
	var target = document.getElementById(e.target.id.split("-")[0]+"-value");
	var value = parseFloat(target.innerHTML)
	var cost = getSkillsCost(value);
	var sp = document.getElementById("SkillPoints");

	if (parseInt(sp.innerHTML) < cost) {
		console.log("not enough points : "+cost);
		return;
	}

	sp.innerHTML = parseInt(sp.innerHTML) - cost;
	target.innerHTML = (parseFloat(target.innerHTML) + 1).toFixed(2);
	updateTrainingTable();
}

function subtractPoint(e) {
	var target = document.getElementById(e.target.id.split("-")[0]+"-value");
	target.innerHTML = parseFloat(target.innerHTML) - 1;

	var sp = document.getElementById("SkillPoints");
	sp.innerHTML = (parseInt(sp.innerHTML) + getSkillsCost(parseFloat(target.innerHTML))).toFixed(2);
	updateTrainingTable();
}

function eatSpinach(e) {
	var bt = document.getElementById("BonusTokens");
	var sp = document.getElementById("SkillPoints");
	var tp = document.getElementById("TrainingPoints");
	var b =  document.getElementById("Boosts");
	bt.innerHTML = parseInt(bt.innerHTML)+50;
	sp.innerHTML = parseInt(sp.innerHTML)+50;
	tp.innerHTML = parseInt(tp.innerHTML)+50;
	b.innerHTML = parseInt(b.innerHTML)+50;	
}

function setupStatusTable(ui) {
	var status = ["Season","Day","Age","Level","XP","VXP","SkillPoints",
				  "TrainingPoints","BonusTokens","ShoppingTokens","Boosts"];
	var values = [0,0,0,1,0,0,0,0,10,0,3];
	values[6] = parseInt(document.getElementById("skill_points").innerHTML);

	for (var i=0; i<status.length; i++) {
		var tr = document.createElement("tr");
		tr.setAttribute("class","alternating_color"+((i%2)+1));

		var td = document.createElement("td");
		var div = document.createElement("div");
		div.innerHTML = status[i];
		td.appendChild(div);
		tr.appendChild(td);

		var td = document.createElement("td");
		var div = document.createElement("div");
		div.id = status[i];
		div.style.textAlign = "right";
		div.innerHTML = values[i];
		td.appendChild(div);
		tr.appendChild(td);

		ui.appendChild(tr);
	}
}

function setupButtonTable(ui) {
	var buttons = ["Advance","Train","Clear","BuySkillPoint","BuyTempBonus","BuyShoppingToken","Boost","EatSpinach"];

	for (var i=0; i<buttons.length; i++) {
		var tr = document.createElement("tr");
		tr.setAttribute("class","alternating_color"+((i%2)+1));

		var td = document.createElement("td");
		td.appendChild(createButton(buttons[i]+"-button",buttons[i]));

		tr.appendChild(td);
		ui.appendChild(tr);
	}

	var div = document.createElement("div");
	var label = document.createElement("span");
	label.innerHTML = "&nbsp;Auto-Train";
	var box = document.createElement("input");
	box.type = "checkbox";
	box.checked = false;
	box.id = "AutoTrain";
	div.appendChild(box);
	div.appendChild(label);
	
	var tr = document.createElement("tr");
	tr.setAttribute("class","alternating_color"+((i%2)+1));

	tr.appendChild(div);
	ui.appendChild(tr);

	var div = document.createElement("div");
	var label = document.createElement("span");
	label.innerHTML = "&nbsp;Halt On Boost";
	var box = document.createElement("input");
	box.type = "checkbox";
	box.checked = false;
	box.id = "HaltOnBoost";
	div.appendChild(box);
	div.appendChild(label);
	
	var tr = document.createElement("tr");
	tr.setAttribute("class","alternating_color"+((i%2)));

	tr.appendChild(div);
	ui.appendChild(tr);
}

function setupTrainingTable(ui) {
	var row = document.createElement("tr");
	row.setAttribute("class","alternating_color1");
	var td = createSelect("training-type",["light","normal","intense","multi"]);
	row.appendChild(td);
	ui.appendChild(row);

	var row = document.createElement("tr");
	row.setAttribute("class","alternating_color2");
	var td = document.createElement("td");
	td.innerHTML = "&nbsp;"
	row.appendChild(td);
	ui.appendChild(row);

	for (var i=0; i<4; i++) {
		var row = document.createElement("tr");
		row.setAttribute("class","alternating_color"+((i%2)+1));

		var td = document.createElement("td");
		var select = createSelect("training-"+i,["-none-"].concat(skills));
		td.appendChild(select);

		row.appendChild(td);
		ui.appendChild(row);
	}
}

function setupAttributeTable(ui) {
	var header = ["Value","Multi","Skill","Bonus","Pct","",""];

	var head = document.createElement("tr");
	head.setAttribute("class","nonalternating_color");
	for (var i=0; i<header.length; i++) {
		var div = document.createElement("td");
		div.innerHTML = header[i];
		head.appendChild(div);
	}
	head.childNodes[head.childNodes.length-4].setAttribute("colspan",5);
	ui.appendChild(head);

	for (var i=0; i<skills.length; i++) {
		var span = document.createElement("tr");
		span.setAttribute("class","alternating_color"+((i%2)+1));

		var td = document.createElement("td");
		var div2 = document.createElement("div");
		div2.style.width = "40px";
		var div = document.createElement("div");
		div.id = skills[i]+"-value";
		div.innerHTML = parseFloat(document.getElementById(skills[i]).innerHTML).toFixed(2);
		div.style.backgroundImage = "url(http://goallineblitz.com/images/game/design/skill_bars/80.gif)";
		div.style.width = "0%";
		div2.appendChild(div);
		
		td.appendChild(div2);
		span.appendChild(td);

		for (var j=0; j<1; j++) {
			var div = document.createElement("td");
			div.appendChild(createCheckbox(skills[i]+"-multi",false));
			span.appendChild(div);
		}

		var div = document.createElement("td");
		div.innerHTML = skills[i];
		span.appendChild(div);
		
		for (var j=0; j<5; j++) {
			var div = document.createElement("td");
			div.appendChild(createCheckbox(skills[i]+"-bonus-"+j,false));
			span.appendChild(div);
		}

		var div = document.createElement("td");
		div.id = skills[i]+"-pct";
		div.style.textAlign = "right";
		div.innerHTML = 0;
		span.appendChild(div);
		
		var div = document.createElement("td");
		var inp = createButton(skills[i]+"-add","Add");
		div.appendChild(inp);
		span.appendChild(div);

		var div = document.createElement("td");
		var inp = createButton(skills[i]+"-sub", "Subtract");
		div.appendChild(inp);
		span.appendChild(div);

		ui.appendChild(span);
	}
}

function createButton(id, value) {
	var div = document.createElement("div");

	var btn = document.createElement("input");
	btn.type = "button";
	btn.id = id;
	btn.value = value;

	div.appendChild(btn);
	return div;
}

function createCheckbox(id, value) {
	var div = document.createElement("div");
	var inp = document.createElement("input");
	inp.type = "checkbox";
	inp.id = id;
	inp.checked = value;
	div.appendChild(inp);
	return div;
}

function createSelect(id, values) {
	var div = document.createElement("div");
	var inp = document.createElement("select");
	inp.id = id;

	for (var i=0; i<values.length; i++) {	
		var opt = document.createElement("option");
		opt.text = values[i];
		opt.value = values[i];
		if (i > 0) {
			opt.disabled = true;
		}
		inp.add(opt, null);
	}

	div.appendChild(inp);
	return div;
}


function createCheckBoxRow(name,value) {
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	var s = document.createElement("span");
	if (name.length > 0) {
		s.innerHTML = name+":";
	}
	else {
		s.innerHTML = "&nbsp;";
	}
	td.appendChild(s);
	tr.appendChild(td);
	
	for (var i=0; i<value.length; i++) {
		td = document.createElement("td"); 
		var cbox = document.createElement("input");
		cbox.setAttribute("class","pbpfilterbox");
		cbox.setAttribute("type","checkbox");
		cbox.setAttribute("name",value[i]);
		cbox.setAttribute("value",value[i]);
		td.appendChild(cbox);
		
		s = document.createElement("span");
		s.innerHTML = value[i]+"&nbsp;&nbsp;";
		td.appendChild(s);
		
		tr.appendChild(td);
	}
	
	while (tr.childNodes.length < 7) {
		td = document.createElement("td");
		td.innerHTML = "&nbsp;";
		tr.appendChild(td);
	}
	
	td = document.createElement("td");
	td.appendChild(createAllButton());
	tr.appendChild(td);

	td = document.createElement("td");
	td.appendChild(createClearButton());
	tr.appendChild(td);
	return tr;
}

function getSkillsCost(score) {
	return parseInt(Math.exp(.0003 * Math.pow(score, 2)));
}

var dailyXP = {
    1 : [100,568],
    2 : [96,540],
    3 : [91,514],
    4 : [87,489],
    5 : [82,464],
    6 : [77,439],
    7 : [73,413],
    8 : [69,388],
    9 : [65,364],
    10 : [61,343],
    11 : [57,339],
    12 : [54,304],
    13 : [51,282],
    14 : [47,270],
    15 : [45,253],
    16 : [42,235],
    17 : [39,216],
    18 : [37,205],
    19 : [34,191],
    20 : [32,184],
    21 : [30,179],
    22 : [28,160],
    23 : [26,147],
    24 : [25,139],
    25 : [25,130],
    26 : [25,119],
    27 : [25,113],
    28 : [25,106]
}

var dailyVXP = {
    25 : 125,
    26 : 125,
    27 : 125,
    28 : 125,
    29 : 125,
    30 : 150,
    31 : 150,
    32 : 150,
    33 : 150,
    34 : 150,
    35 : 175,
    36 : 175,
    37 : 175,
    38 : 175,
    39 : 175  
}

var trainingChart = {
    4: 67,
    5: 64,
    6: 62,
    7: 59,
    8: 57,
    9: 55,
    10: 53,
    11: 51,
    12: 49,
    13: 48,
    14: 46,
    15: 44,
    16: 42,
    17: 41,
    18: 39,
    19: 38,
    20: 36,
    21: 35,
    22: 34,
    23: 33,
    24: 31,
    25: 30,
    26: 29,
    27: 28,
    28: 27,
    29: 26,
    30: 25,
    31: 24,
    32: 23,
    33: 22,
    34: 21,
    35: 20,
    36: 19,
    37: 19,
    38: 18,
    39: 17,
    40: 17,
    41: 16,
    42: 15,
    43: 15,
    44: 14,
    45: 14,
    46: 13,
    47: 13,
    48: 12,
    49: 12,
    50: 11,
    51: 11,
    52: 11,
    53: 10,
    54: 9,
    55: 9,
    56: 9,
    57: 8,
    58: 8,
    59: 8,
    60: 8,
    61: 8,
    62: 7,
    63: 7,
    64: 7,
    65: 7,
    66: 6,
    67: 6,
    68: 6,
    69: 5,
    70: 5,
    71: 5,
    72: 5,
    73: 5,
    74: 5,
    75: 4,
    76: 4,
    77: 4,
    78: 4,
    79: 4,
    80: 4,
    81: 3,
    82: 3,
    83: 3,
    84: 4,
    85: 2,
    86: 2,
    87: 2,
    88: 2,
    89: 2,
    90: 2
};

