// ==UserScript==
// @name           TH General Spading Script
// @description    Tracks TH adventures, including Drops, chips and XP and displays data in Journal -> Personal Notes section
// @include        *twilightheroes.com/fight.php*
// @include        *twilightheroes.com/journal-notes.php
// ==/UserScript==
// SCRIPT CONFIGURATIONS - EDIT THIS AREA

// Set to 1 to enable, 0 to disable

var trackandshowCHIPS = 1;
var trackandshowXP = 1;

// add items you want to ignore to the list below

var IgnoreList = ["badly bent knife","dark arts","hammer","hedge slammer","mangled data plate","metal-rimmed frisbee","pocket laser","byeon","ionic cloud","bezoar juice","athelas leaf","funny little villaintine","yule bat","yule eye","yule bricks","Yule Horse","yule shed","ectoplasmic chains","ectoplasmic glove","ectoplasmic bowling ball","ectoplasmic bedsheet","ectoplasmic pumpkin","ectobit","hunk of scrap metal","cracked nut shells","cracked water chestnuts","cracked wallnut","cracked roasting chestnuts","cracked candied nuts","cracked chockfulo nuts","subscription voucher","crimebusters IOU","water du lac","city map code","financial spreadsheet code","physiology scan code","signal processing code","statistical analysis code","moderately encrypted swipe card","somewhat encrypted swipe card","slightly encrypted swipe card","decrypted swipe card","tritanium","polysteel","red horse pill","athelas capsule","bleeding edge medkit","regoodened draught","byzantium","hyper-c, small","postprecoffee","hyper-c, drop","hyper-c, large","steamwork core","pentium","custom Evader","waaambulance","lightningcycle","a team van","motorpede","luxury chameleon","Lexura Infinides D20","paladinum","yuggothium","malkamite","alien mineral water","the most interesting item in the world","GigaGuy capsule","GigaGuy pellet"];

// add noncombat's title you want to track to the list below, add a "\" before characters like ? ! or .
var NoncombatTrackList = ["Petty Theft","Shouldn't This Be At the Casino\?"];

// As it is, it tracks villains. To ignore them comment the empty list (adding // at the start of the line) and uncomment the populated list

var VillainList = ["empty list"];
//var VillainList = ["Ali C","Anna Conda","Aaron Burr","Arabella vanden Mento","Biff Socko","Big Earl","Blue Elsa","Blue Crush","Bryll Bison","Captain Capsaicin, the Cayenne Crusader","Chuck van Arnolde","Captain Ray Cathode","Clavis Clepsydra, the clockwork woman","Deacon Frostheim","Delilah","Doctor Talon","Doctor Worm","Emmett McFlie","Ender Wiggum","Fast Eddy","Firefly and the Lightning Bug","Fodd Toxic","Goose Blaine","Hans of the Mole People","Jimmy Six","Justin Illusion","Kookoo the Klown","Lavagna","LiquiGirl","LP Hovercraft","Lux Leather, the Rank Bobber","Magnetron","Magnum Opus, the Glock golem","Memphis Tofeles","Mister Chill Out, Man","Mister Citrus","Mister Uh-Uh","Mysterious glowing green orb","Mister Bobo, the superintelligent chimp","Mother of All Whistlers","Raskolnikov","Reptauron, the Flying Lizard","Rolled Doll","Rich Cardinal Lou","Sdrawkcab Xam","Silicon Scooter","Solicitor Calmar","Sophocles","Static","The Baroness","The Brewmeister","The Bully Mammoth","The Human Campfire","The Mad Bomber Wot Bombs at Somethingorother","The Moitalizer","The QB","The Slime","The Sloth","The Tenderizer","The Ticketmaster","The Wight from the Isle","The Arachnid Prince","The Dingo","The Girl Two Doors Down","The Hemisesquicentennial Man","The Human Gnat","The Malappropriator","The Recycler","The Shark","Tricky Nick Dixon","Terce","Thundarr theLokhar","Vociferous","Vuvuzilla"];

// END OF SCRIPT CONFIGURATIONS


var tdList = document.getElementsByTagName("td");
var Body = document.getElementsByTagName("body")[0];
var Result = document.getElementById("result");
var Enemy = document.getElementById("enemy");
var Noncombat = document.getElementsByTagName("h2")[0];
var DropCheck = /^You got an item: (.+) /;
if (/Patrol again/.test(Body.textContent) || /The fight is now over, and it's not pretty\./.test(Body.textContent)) {
	GM_setValue("ZZZZZ TotalAdventures ZZZZZ",GM_getValue("ZZZZZ TotalAdventures ZZZZZ",0)+1)
	}
// records the adventures, combat and noncombats, and their drops if any
// also records chips and XP ranges if they exist
if (Enemy && VillainList.indexOf(Enemy.textContent)==-1) {
	for (var j = 0; j < tdList.length; j++) {
		if (DropCheck.test(tdList[j].textContent) && IgnoreList.indexOf(DropCheck.exec(tdList[j].textContent)[1])==-1) {
			GM_setValue(Enemy.textContent + "|" + DropCheck.exec(tdList[j].textContent)[1],GM_getValue(Enemy.textContent + "|" + DropCheck.exec(tdList[j].textContent)[1],0)+1)
			}
		}
	if (/Patrol again/.test(Body.textContent)) {
		GM_setValue( Enemy.textContent, GM_getValue( Enemy.textContent, 0)+1);
		GM_setValue("ZZZZZ TotalCombats    ZZZZZ",GM_getValue("ZZZZZ TotalCombats    ZZZZZ",0)+1);
		}
	if (Result) {
		if (trackandshowXP){
			var Exp = parseInt(Result.attributes.getNamedItem("data-xp").textContent);
			if (Exp > GM_getValue(Enemy.textContent + "/ " + "XPHigh", 0)) {
				GM_setValue(Enemy.textContent + "/ " + "XPHigh",Exp)
				}
			if (Exp < GM_getValue(Enemy.textContent + "/ " + " XPLow", 1000000000)) {
				GM_setValue(Enemy.textContent + "/ " + " XPLow",Exp)
				}
			}
		if (trackandshowCHIPS){
			var Chips = parseInt(Result.attributes.getNamedItem("data-chips").textContent);
			if (Chips > GM_getValue(Enemy.textContent + "- " + "ChipsHigh", 0)) {
				GM_setValue(Enemy.textContent + "- " + "ChipsHigh",Chips)
				}
			if (Chips < GM_getValue(Enemy.textContent + "- " + " ChipsLow", 1000000000)) {
					GM_setValue(Enemy.textContent + "- " + " ChipsLow",Chips)
				}
			}
		}
	}
else if (Noncombat) {
	if (NoncombatTrackList.indexOf(Noncombat.textContent)!=-1) {
		GM_setValue( Noncombat.textContent, GM_getValue( Noncombat.textContent, 0)+1);
		GM_setValue("ZZZZZ TotalNonCombats ZZZZZ",GM_getValue("ZZZZZ TotalNonCombats ZZZZZ",0)+1);
		for (var j = 0; j < tdList.length; j++) {
			if (DropCheck.test(tdList[j].textContent) && IgnoreList.indexOf(DropCheck.exec(tdList[j].textContent)[1])==-1) {
				GM_setValue(Noncombat.textContent + "|" + DropCheck.exec(tdList[j].textContent)[1],GM_getValue(Noncombat.textContent + "|" + DropCheck.exec(tdList[j].textContent)[1],0)+1)
				}
			}
		}
	var Body = document.getElementsByTagName("body")[0].textContent;
	if (/You gain \d+ XP/.test(Body) && trackandshowXP) {
		var Exp = parseInt(/You gain (\d+) XP/.exec(Body)[1]);
		if (Exp > GM_getValue(Noncombat.textContent + "/ " + "XPHigh", 0)) {
			GM_setValue(Noncombat.textContent + "/ " + "XPHigh",Exp)
			}
		if (Exp < GM_getValue(Noncombat.textContent + "/ " + " XPLow", 1000000000)) {
			GM_setValue(Noncombat.textContent + "/ " + " XPLow",Exp)
			}
		}
	if (/You gain \d+ chips/.test(Body) && trackandshowCHIPS) {
		var Chips = parseInt(/You gain (\d+) chips/.exec(Body)[1]);
		if (Chips > GM_getValue(Noncombat.textContent + "- " + "ChipsHigh", 0)) {
			GM_setValue(Noncombat.textContent + "- " + "ChipsHigh",Chips)
			}
		if (Chips < GM_getValue(Noncombat.textContent + "- " + " ChipsLow", 1000000000)) {
			GM_setValue(Noncombat.textContent + "- " + " ChipsLow",Chips)
			}
		}
	}

//creates a text box in your Journal-> Personal Notes section with
//spading data ready to copy to the wiki and a button to clear it all
if(/journal-notes/.exec(location.href)) {
	a = document.getElementsByTagName('LI')[3];
	var q=document.createElement('button');
	q.innerHTML='Clear Spading Data';
	a.parentNode.appendChild(q);
	q.addEventListener('click',ecClear,true);
	var b = document.getElementsByTagName('textarea')[0];
	b.cols = 90;
	var c = document.getElementsByTagName('h1')[0];
	var f = document.createElement('table');
	var g = document.createElement('tr');
	var h = document.createElement('td');
	var l = document.createElement('textarea');
	l.rows = 40;
	l.cols = 90;
	var statData = "";
	var dropData = "";
	var chipData = "";
	var XPData = "";
	var foeData = "";
	var keys = GM_listValues().sort();
	for (var i=0, key=null; key=keys[i]; i++) {
		var value = GM_getValue(key);
		if(key.indexOf('|')!=-1) {
			var drops = GM_getValue(key);
			var fights = GM_getValue(key.substring(0, key.indexOf('|')));
			dropData = dropData + key + "\t{{statrate|" + fights + "|" + drops + "|+}}\n";
			}
		else if(key.indexOf('- ')!=-1) {
			chipData = chipData + key + "\t" + value + "\n";
			}
		else if(key.indexOf('/ ')!=-1) {
			XPData = XPData + key + "\t" + value + "\n";
			}
		else if(key.indexOf('ZZZZZ')!=-1) {
			statData = statData + key + "\t" + value + "\n";
			}
		else if(key.indexOf('ZZZZZ')==-1 && key.indexOf('/ ')==-1 && key.indexOf('- ')==-1 && key.indexOf('|')==-1) {
			foeData = foeData + key + "\t" + value + "\n";
			}
		}
	var data = "WARNING - ZZZZZ TotalAdventures ZZZZZ doesn't count choice noncombats.\nWARNING - Script doesn't track {Chips/XP/Combat Chance} modifiers, you \nneed to account for those when reporting those data sets.\n\n" + statData;
	data = data + "\n\n\t\t\t\t\t   DROPS\n------------------------------------------------------------------------------------------\n" + dropData;
	data = data + "\n\n\t\t\t\t\t FOE COUNT\n------------------------------------------------------------------------------------------\n" + foeData;
	if (trackandshowCHIPS){data = data + "\n\n\t\t\t\t\tCHIP RANGES\n------------------------------------------------------------------------------------------\n" + chipData;}
	if (trackandshowXP){data = data + "\n\n\t\t\t\t\t XP RANGES\n------------------------------------------------------------------------------------------\n" + XPData;}
	l.value = data;
	h.innerHTML = "<center><h2>SPADING DATA</h2></center>";
	h.insertBefore(l,null);
	g.insertBefore(h,null);
	f.insertBefore(g,null);
	c.parentNode.insertBefore(f,null);
	}
function ecClear() {
	if(confirm("Are you sure you want to delete all data?")) {
		var keys = GM_listValues();
		for (var i=0, key=null; key=keys[i]; i++) {
			GM_deleteValue(key);
			}
	window.location="http://www.twilightheroes.com/journal-notes.php"
		}
	}