// ==UserScript==
// @name           Klick-saver Plus
// @version        1.81
// @namespace      http://kobe.cool.ne.jp/yehman/
// @homepage       http://www.frogorbits.com/kol/
// @copyright      © 2010 Nathan Sharfi, Shawn Yeh, and Nick England
// @license        GPL; http://www.gnu.org/copyleft/gpl.html
// @author         Shawn Yeh (http://kobe.cool.ne.jp/yehman/)
// @author         Nick England
// @contributor    CDMoyer
// @contributor    adiabatic (http://www.frogorbits.com/)
// @contributor    Hellion
// @contributor    MutantPickles
// @include        *kingdomofloathing.com/main_c.html
// @include        *kingdomofloathing.com/main.html
// @include        *kingdomofloathing.com/game.php
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/charpane.php
// @include        *kingdomofloathing.com/adventure.php*
// @include        *kingdomofloathing.com/choice.php*
// @include        *kingdomofloathing.com/ocean.php
// @include        *kingdomofloathing.com/account.php
// @exclude        forums*kingdomofloathing.com*
// @include        http://127.0.0.1:*
// @grant	GM_log
// @grant	GM_setValue
// @grant	GM_getValue
// @grant	GM_xmlhttpRequest
// @description    Adds buttons to your charpane which let you select Auto(W)eapon, (I)tem, (S)kill, (M)acro, (A)dventure, (O)lfact, and/or (Q)uit on. Hover your mouse over each button to see what it does when clicked or double-clicked.
// ==/UserScript==


const COUNTER = 1;  		//-1: off  0: start on zero  1: start on one
const OFF = 0;			//Values for autoUse.
const ATTACK = 1;		//0-4 = normal options.
const USE_ITEM = 2;		
const USE_SKILL = 3;
const USE_MACRO = 4;
//const REDLIMIT = 5;		
const GO_ALWAYS = 1;		//values for repeatAdv.
const GO_CONDITIONAL = 3;
const AUTO_USE_LIMIT = 26;	//the default round at which autoUse will be temporarily disabled
const SAFETY_FACTOR = 1.1;	//Safety factor for monster damage: can it one-hit-kill us?
const STOP_LIST = "pail of pretentious paint, "+
			"pretentious paintbrush, "+
			"pretentious palette, "+
			"box of birthday candles, "+
			"eldritch butterknife, "+
			"dodecagram, "+
			"S.O.C.K., "+
			"mosquito larva, "+
			"ruby W, "+
			"sonar-in-a-biscuit, "+
			"baseball, "+
			"enchanted bean";

var turnsplayed = 0;

// The event manager will unload all registered event on page unload, including itself.
// Note only by using addEventListener(target,...) will the event be registered, and not
// target.addEventListener(...), as the prototype function was not replaced.
var registeredEventListeners = new Array();
addEventListener(window, 'unload', unregisterEventListeners, false);

//SGM_log("doc.loc.path="+document.location.pathname);

// to display debug info for a bunch of stuff, comment out the return statement.
function SGM_log(message) {
//	return;
	GM_log(message);
}
GM_log("doc.loc.path=" + document.location.pathname);
switch(document.location.pathname) {
//first screen post-login (?): initialize.
	case "/main_c.html":
	case "/game.php":
	case "/main.html":
		GM_setValue("autoUse", 0);				// OFF, ATTACK, USE_x 
		GM_setValue("repeatAdv", 0);			// 0: off  1: normal  3: stop on specific item drops
		GM_setValue("fightTurns", COUNTER);		// how many combat rounds have we gone?
		GM_setValue("stopAdvAt", 0);			// stop adventuring when our turncount reaches this number.
		GM_setValue("adventuresLeft", 0);		// turns showing in charpane
		GM_setValue("storedSkill", 'none');		// save the 'normal' skill when we have to olfact
		GM_setValue("skillCost",1);			// keep track of MP usage in-fight: what does our skill cost?
		GM_setValue("cancelAtEnd",0);			// flag for use by buttons that attack or use item until end of combat.
		GM_setValue("MonsterDamage",0);			// Smallest Monster damage received from this fight
		GM_setValue("aborted",false);			// combat macro aborted, manual intervention necessary
		GM_setValue("alreadyMacroed",false);	// auto-used a macro once this combat already
		GM_setValue("redbox", 0);			// flag error conditions on auto-usages.
		GM_setValue("hideme",false);			// minimize memory leakage with a choice to hide buttons when you're not gonna use 'em.
		grabMPHP();					// MP, HP, maxMP, maxHP.
		if (!GM_getValue("turnLimit")) GM_setValue("turnLimit", AUTO_USE_LIMIT);
		if (!GM_getValue("finisher")) GM_setValue("finisher", 0);
		break;

	case "/charpane.php":
		SGM_log("processing charpane");
		drawButtons();
		break;

	case "/fight.php":
		doMainFight();
		break;
	case "/trickortreat.php":
		doHalloween();
		break;

	case "/adventure.php":
	case "/choice.php":
	case "/ocean.php":
		grabMPHP();
		GM_setValue("fightcompleteturn",GM_getValue("turnsplayed"));	// record this round as completed.
		SGM_log("setting fightcompleteturn to "+GM_getValue("turnsplayed")+" from choice/adv/ocean");
		if(GM_getValue("repeatAdv") != OFF)
			doAutoAdv(0);
		break;

	case "/account.php":
		buildPrefs();
		break;
}
//end of top-level code.  function defs follow.

function doMainFight() {
	SGM_log("fight!");
	var FightHeader = document.getElementsByTagName("b"); 
	if (!FightHeader) {
		SGM_log("no fight header found, aborting combat action.");
		return; 
	}
	FightHeader = FightHeader[0];
	var body = document.getElementsByTagName("body")[0].innerHTML;
//----------------------
// Notes to the maintainer:
// the GM value "olfact" is a flag to indicate whether the olfaction button is set to active or not.
// It gets set (or cleared) only in the button-click processing section.
// 
// "olfactGo", on the other hand, is a flag to indicate whether or not we are interested in olfacting something RIGHT NOW.
// It is set whenever we load the sidepane and "On the Trail" is not found.
// It is cleared whenever we actually olfact something.

// first, a check to see if we had to save the old selected skill in order to olfact something last round.
	if (GM_getValue("oldskill")) {	// if yes, then we have to switch back to the old skill now.	
		var oldskill = GM_getValue("oldskill");
		var sel = document.getElementsByName("whichskill");	// if combat ends in round 0 due to autoattack or familiar action after autoattack,
															// there is no select box.  Detect this condition.
		if (sel.length) {
			sel = sel[0];
			var opts = sel.childNodes; var len = opts.length;
			for(var i=0; i<len; i++) {
				if(opts[i].value == oldskill) {
					sel.selectedIndex = i;
					break;
				}
			}
			GM_setValue("oldskill",false);					// only un-set the old skill if we managed to reset the skillbox successfully.
		}
		GM_setValue("olfactGo", false);	// safety setting:  If we're putting back the old skill, disable olfaction manually for this round just in case the sidepane hasn't been updated yet.
	}

//	SGM_log("olfact="+GM_getValue("olfact"));
//	SGM_log("olfactGo="+GM_getValue("olfactGo"));
	if(GM_getValue("olfact") && GM_getValue("olfactGo")) {	// If the Olfaction button is on, and "On the trail" is not a current effect:
		var monname = document.getElementById("monname");
//		SGM_log("monname="+monname.innerHTML);
		if(monname && monname.innerHTML.toLowerCase().indexOf(GM_getValue("olfactString").toLowerCase()) != -1) {  // this is what we're after?
			GM_setValue("olfactGo", false);
			addEventListener(window, 'load', function() {
				var sel = document.getElementsByName("whichskill");
				if (!sel.length) {
					SGM_log("no skill input box found; aborting combat action.");
					return; // no skill element found on page; abort.
				}
				sel = sel[0];
				var opts = sel.childNodes; var len = opts.length; var found = false;
				for(var i=0; i<len; i++) {
					if(opts[i].value == 19) {
						found = true;
//						SGM_log("oldskill="+opts[sel.selectedIndex].value);
						GM_setValue("oldskill", opts[sel.selectedIndex].value);
						sel.selectedIndex = i;
						document.forms.namedItem("skill").submit();
						break;
					}
				}
				if(!found) {
//					SGM_log("can't olfact, skill not found.");
					var mydiv = document.createElement('div');
					mydiv.innerHTML = '<center><font color="red">Unable to Olfact: skill not found. (Insufficient MP?)</font></center>';
					document.body.appendChild(mydiv);
					return;	// can't olfact; abort.
				}
			}, true);
			return false;
		}
	}
	
// "Quit adventuring when you hit this string" processing.
	if(GM_getValue("stopGo")) {	
		if (document.body.innerHTML.indexOf(GM_getValue("stopString")) != -1) 
		{	stopAdventuring("hit Quit-On text.");
			//GM_setValue("stopGo", false);				// uncomment this to force re-clicking in order to re-halt.
			return false;
		}	
	}
//-----------------------
	if(GM_getValue("fightTurns") == COUNTER)	// Grab your HP and MP on the first round of combat.
		grabMPHP();

	if (!body.match(/WINWINW|Adventure Again|Go back to /g)){		// still in combat? (no win marker/ no adventure again/ no go back?)
		var turns = GM_getValue("fightTurns");
		
		if (body.match(/Macro Aborted|You twiddle your thumbs|Invalid macro command/)) {
			GM_setValue("aborted",true);
		}

		//Adds Round Counter to page, set COUNTER to -1 to turn counter off
		if (COUNTER >= 0){
			strTurns = " - " + (turns >= AUTO_USE_LIMIT ? "<span style=\"color:red;\">" + "Round " + turns + "</span>" : "Round " + turns);
			FightHeader.innerHTML += strTurns;
		}
		
		addInputButtons();
		grabCombatInfo();
		doCombat(turns);
	}
	//if we get here, it must be the end of a combat
	else {
		var foo = GM_getValue("turnsplayed");
		SGM_log("foo="+foo);
		GM_setValue("fightcompleteturn",foo);	// mark fight as complete.
		SGM_log("fight completed, fightturn set to "+foo);
		if (body.match(/You slink away, dejected and defeated./)) {	// occurs both on beaten-up and on >30 rounds.  yay.
			stopAdventuring("looks like you lost the fight, bucko.");
		}
		GM_setValue("aborted",false);			// just in case we managed to twiddle our thumbs outside of a macro.
		GM_setValue("alreadyMacroed",false);	// done trying to hit the macro button.
		doAutoAdv(0);					// respects the flag we set in stopAdventuring(), so we're fine with always calling it.
	}
}

function drawButtons() {

	var adventuresLeft = GM_getValue("adventuresLeft");
	var insertAt;

	turnsplayed = unsafeWindow.turnsplayed;
	GM_setValue("turnsplayed", turnsplayed);
	//render the button layout
	// needtoolfact is a flag to indicate whether or not "On the Trail" is a currently active effect
	// (i.e. are we already olfacting something).  If flag=True (no olfacting active), then we need to olfact ASAP.
	var needtoolfact = false;
	var fullTest = document.getElementsByTagName("a")[0]; 
	if (!fullTest) {
		SGM_log("Unable to determine if we're in full or compact mode.  Exiting.");
		return;
	}
//	first link in the charpane in Full Mode is your avatar icon, which comes from the /otherimages/ directory.
	if (fullTest.innerHTML.indexOf("/otherimages/") == -1){		// lacking a graphic from the /otherimages/ directory, we assume that we are in Compact Mode.
		insertAt = document.getElementsByTagName("hr")[0];
		if (insertAt == null) {
			GM_log("unable to locate insertion point for button bar.  Exiting.");
			return;
		}
		var newHr = document.createElement('hr');
		newHr.setAttribute('width','50%');
		insertAt.parentNode.insertBefore(newHr, insertAt.nextSibling);
		if(GM_getValue("olfact")) {
			needtoolfact = true;
// find "On the Trail" in compact mode by using the Alt tags on images.
			var imgs = document.getElementsByTagName('img'); var len = imgs.length;
			for(var i=0; i<len; i++) {
				if (imgs[i].alt.indexOf("On the Trail") != -1) {
					needtoolfact = false; i=len; break; 
				}
			}
			if(needtoolfact) GM_setValue("olfactGo", true);
			else GM_setValue("olfactGo", false);
		}
	} else {		// otherwise, we are in Full Mode.
		insertAt = document.getElementsByTagName("table")[0];
		if(GM_getValue("olfact")) {
			needtoolfact = true;
// find "On the Trail" in full mode by using the description text in the font tags.
			var effs = document.getElementsByTagName('font'); len = effs.length;
			for (i=0;i<len;i++) { 
				if (effs[i].innerHTML.indexOf("On the Trail") != -1) { 
					needtoolfact = false; i=len; break;
				} 
			}
			if (needtoolfact) GM_setValue("olfactGo",true);
			else GM_setValue("olfactGo", false);
		}
	}
	
	var oMon = GM_getValue("olfactString","");
	var oString = "click to automatically olfact a monster";
	if (oMon != "") oString = "currently olfacting: "+oMon;
	var newTable = document.createElement('table');
	var newTD;
	var buttontitles = [	"auto-attack with your weapon",
				"auto-use your last-used item",
				"auto-use your last-used skill",
				"auto-use your last-used combat macro",
				"click to auto-adventure-again; dbl-click to set number of turns",
				oString,
				"Quit adventuring when string '" +  GM_getValue("stopString","") + "' is seen"
			];
	var buttontext = ["W","I","S","M","A","O","Q"];
	for (i=0;i<7;i++) {
		newTD = document.createElement('td');
		newTD.setAttribute('title',buttontitles[i]);
		newTD.setAttribute('id','KSP_button_'+(i+1));	//gotta have buttons 1-7, not 0-6.
		newTD.textContent = buttontext[i];
		newTable.appendChild(newTD);
	}
	addGlobalStyle("table[id='KSPbuttonbar'] { table-layout: auto; "
			+ "border-spacing: 1px }"
			+ "table[id='KSPbuttonbar'] td { width: 11px;"
			+ " font-size: .6em;"
			+ " border: 2px solid black;"
			+ " text-align: center; "
			+ " cursor: default }"
			+ "table[id='KSPbuttonbar'] td.off { background-color: white }"
			+ "table[id='KSPbuttonbar'] td.on { background-color: lime }"
			+ "table[id='KSPbuttonbar'] td.warn { background-color: red }"
			+ "table[id='KSPbuttonbar'] td.half { background-color: #32CD32 }"
				);

	newTable.setAttribute('id','KSPbuttonbar');
	var tdArray = newTable.getElementsByTagName("td");
	if (GM_getValue("autoUse") != OFF)
		tdArray[GM_getValue("autoUse") - 1].setAttribute('class',GM_getValue("redbox") == 1 ? 'warn' : 'on');
	if (GM_getValue("repeatAdv") != OFF)
		tdArray[4].setAttribute('class',(GM_getValue("repeatAdv") < 2)?'on':'half');
	if (GM_getValue("stopAdvAt") > turnsplayed)
		tdArray[4].textContent = (GM_getValue("stopAdvAt") - turnsplayed);
	if (GM_getValue("olfact"))
		tdArray[5].setAttribute('class','on');
	if (GM_getValue("stopGo"))
		tdArray[6].setAttribute('class','on');
	
	//add button functions
	//note somewhat funky selections for multi-event buttons is because of JS's mouse event pattern:
	//a double-click event also fires 2 click events.  A little fiddling is therefore required to
	//get the results we want here.
	//auto-use buttons:
	for (var i=0; i < 4; i++) addEventListener(tdArray[i],'click',generic_click, true);
	//extra actions:
	for (var i=0; i<tdArray.length; i++){
		switch (i) {
		case 0:	// W: we get away with click and double-click here because single-click is a toggle, and double-clicking keeps it at its original state.
			addEventListener(tdArray[i], 'dblclick', W_dblclick, true);
			break;
		case 4:	// A
			addEventListener(tdArray[i], 'contextmenu', A_rightclick, false);
			addEventListener(tdArray[i], 'mousedown', A_mousedown, true);
			addEventListener(tdArray[i], 'dblclick', A_dblclick, true);
			break;
		case 5:	// O
			addEventListener(tdArray[i], 'mouseup', O_mouseup, true); 
			addEventListener(tdArray[i], 'dblclick',O_dblclick, true);
			break;
		case 6:	// Q
			addEventListener(tdArray[i], 'mouseup', Q_mouseup, true);
			addEventListener(tdArray[i], 'dblclick', Q_dblclick, true); 
			break;
		default: break;
		}
	}

	insertAt.parentNode.insertBefore(newTable, insertAt.nextSibling);
}

function generic_click(event) {
	var myID = this.getAttribute('id');		//"KSP_button_X"
	var myCode = parseInt(myID.substring(11),10);	//"X" -> 1-4
	if (GM_getValue("autoUse") == myCode) {
		GM_setValue("autoUse", OFF);
		this.setAttribute('class','off');
	} else {
		GM_setValue("autoUse",myCode);
		WISM_light(myCode);
	}
}

function WISM_light(buttonNumber) {	//light 1 of WISM, un-light the other 3.
	for (var i = 1; i < 5; i++) {	
		if (i == buttonNumber) document.getElementById('KSP_button_'+i).setAttribute('class','on');
		else document.getElementById('KSP_button_'+i).setAttribute('class','off');
	}
}
	
function W_dblclick(event) {
	var turnLimit = parseInt(prompt('Stop Auto-Doing Stuff after XX Rounds... (1-29)'));
	if (turnLimit > 1 && turnLimit < 30) GM_setValue("turnLimit", turnLimit);
	else GM_setValue("turnLimit", AUTO_USE_LIMIT);
}

function A_rightclick(event) {
	if (event.button == 2){
		event.stopPropagation();
		event.preventDefault();
	}
}

function A_mousedown(event) {
	if (event.button == 2 && GM_getValue("repeatAdv") != GO_CONDITIONAL){
		GM_setValue("repeatAdv", GO_CONDITIONAL);
		this.setAttribute('class','half');
	} else if (event.button == 0 && GM_getValue("repeatAdv") != GO_ALWAYS){
		GM_setValue("repeatAdv", GO_ALWAYS);
		this.setAttribute('class','on');
	} else {
		GM_setValue("repeatAdv", OFF);
		this.setAttribute('class','off');
	}
}

function A_dblclick(event) {
	var adventureLimit = parseInt(prompt('Auto-adventure for how many turns?'));
	var adventuresLeft = GM_getValue("adventuresLeft");
	if (adventureLimit > adventuresLeft) adventureLimit = adventuresLeft;
	else if (adventureLimit < 0 || !adventureLimit) adventureLimit = 0;
	if (adventureLimit > 0) {
		GM_setValue("stopAdvAt", turnsplayed + adventureLimit);
		GM_setValue("repeatAdv", GO_ALWAYS);
		this.innerHTML = adventureLimit;
		this.setAttribute('class','on');
	} else if (adventureLimit == 0) {
		GM_setValue("stopAdvAt", turnsplayed);
		GM_setValue("repeatAdv", OFF);
		this.innerHTML = 'A';
		this.setAttribute('class','off');
	}
}

function O_mouseup(event) {
	if (GM_getValue("olfact")){
		GM_setValue("olfact", false);
		this.setAttribute('class','off');
	} else {
		GM_setValue("olfact", true);
		this.setAttribute('class','on');
	}
}

function O_dblclick(event) {
	var monster = GM_getValue("olfactString", monster);
	var mylabel = document.getElementById('olabel');
	if (monster == undefined) monster = '';
	monster = prompt('Transcendently Olfact which monster?', monster);
	if (monster && monster != '') {
		GM_setValue("olfactString", monster);
		GM_setValue("olfact", true);
		this.setAttribute('class','on');
		mylabel.title = 'currently olfacting: '+monster;
		
	} else {
		GM_setValue("olfactString", '');
		GM_setValue("olfact", false);
		this.setAttribute('class','off');
		mylabel.title = 'click to automatically olfact a monster';
	}
	event.stopPropagation();
	event.preventDefault();
}

function Q_mouseup (event) {
	if (GM_getValue("stopGo")){
		GM_setValue("stopGo", false);
		this.setAttribute('class','off');
	} else {
		GM_setValue("stopGo", true);
		this.setAttribute('class','on');
	}
}

function Q_dblclick(event) {
	var stopstr = GM_getValue("stopString");
	if(stopstr == undefined) stopstr = '';
	stopstr = prompt('Stop adventuring when seeing this (case-sensitive) string:', stopstr);
	if (stopstr && stopstr != '') {
		GM_setValue("stopString", stopstr);
		GM_setValue("stopGo", true);
		this.setAttribute('class','on');
	} else {
		GM_setValue("stopString", '');
		GM_setValue("stopGo", false);
		this.setAttribute('class','off');
	}
	event.stopPropagation();
	event.preventDefault();
}

// Try to read in MP and HP values 
//
function grabMPHP() {
	GM_get("/api.php?what=status&for=KlickSaverPlus",function(response) {
		readMPHP(response);
	});
}

function readMPHP(response) {
	var CPInfo = JSON.parse(response);
	GM_setValue("HP",CPInfo["hp"]);
	GM_setValue("MaxHP",CPInfo["maxhp"]);
	GM_setValue("MP",CPInfo["mp"]);
	GM_setValue("MaxMP",CPInfo["maxmp"]);
	GM_setValue("adventuresLeft",CPInfo["adventures"]);
}

function addInputButtons() {
	// for attacking until the end of the round
    var NewAttack = document.createElement('input');
	NewAttack.setAttribute('class','button');
	NewAttack.setAttribute('value','Attack!');
	NewAttack.setAttribute('type','button');
	NewAttack.setAttribute('style','margin-left:1em;display:inline;');
	NewAttack.setAttribute("id","NewAttack");
	addEventListener(NewAttack, 'click', AttackScript, true);
	document.getElementById('tack').parentNode.appendChild(NewAttack);

    // for using the current item until the end of the round
	var NewItem = document.createElement('input');
	NewItem.setAttribute('class','button');
	NewItem.setAttribute('value','Item!');
	NewItem.setAttribute('type','button');
	NewItem.setAttribute('style','margin-left:1em;display:inline;');
	addEventListener(NewItem, 'click', ItemScript, true);
	document.getElementById("NewAttack").parentNode.appendChild(NewItem);
}


// Grab combat information like MP, HP, monster damage, and fumble damage
//
function grabCombatInfo(){
	var pageBodyText = document.getElementsByTagName("body")[0].innerHTML;
	
	//This section grabs MP healing
	var MPGainText = pageBodyText.match(/You gain \d+ (?=Muscularity|Mana|Mojo)/g);
	if(MPGainText){
		for(var i=0;i<MPGainText.length;i++){
			var curGain = Number(MPGainText[i].slice(8,-1));
			GM_setValue("MP", GM_getValue("MP") + curGain);
			//SGM_log("Gained "+curGain+" MP, current MP: "+GM_getValue("MP"));
			if(GM_getValue("MP") > GM_getValue("MaxMP"))
				GM_setValue("MP",GM_getValue("MaxMP"));
		}
	}

	//This section grabs player healing
	var HealText = pageBodyText.match(/You gain \d+ (?=hit point)/g);
	if(HealText){
		for(var i=0;i<HealText.length;i++){
			var curHeal = Number(HealText[i].slice(8,-1));
			GM_setValue("HP",GM_getValue("HP") + curHeal);
			//SGM_log("Healed " +curHeal+ " HP, current HP: "+GM_getValue("HP"));
			if(GM_getValue("HP") > GM_getValue("MaxHP") && !(i == HealText.length -1 && pageBodyText.indexOf("Your Jalape") != -1))
				GM_setValue("HP",GM_getValue("MaxHP"));
		}
	}
		
	//This section grabs MP loss
	var MPLossText = pageBodyText.match(/You lose \d+ (?=Muscularity|Mana|Mojo)/g);
	if(MPLossText){
		var curLoss = Number(MPLossText[0].slice(8,-1));
		GM_setValue("MP", GM_getValue("MP") - curLoss);
		//SGM_log("Loss MP: "+curLoss);
		if(GM_getValue("MP") < 0)
			GM_setValue("MP", 0);
	}
	
	//This section tries to grab monster damage
	var DamageText = pageBodyText.match(/You lose \d+ (?=hit point)/g);
	if(DamageText){
		var curDamage = Number(DamageText[0].slice(8,-1));
		GM_setValue("HP",GM_getValue("HP") - curDamage);
		if (curDamage < GM_getValue("MonsterDamage") || GM_getValue("MonsterDamage")==0){
			GM_setValue("MonsterDamage",curDamage);
			//SGM_log("MDam: "+GM_getValue("MonsterDamage") +", current HP: "+GM_getValue("HP"));
		}
	}
}

function doCombat(turns) {
	if (GM_getValue("MonsterDamage") * SAFETY_FACTOR > GM_getValue("HP")) {
		setToRed("too dangerous");
		stopAdventuring("too dangerous to continue! Monster does "+GM_getValue("MonsterDamage")+" vs "+GM_getValue("HP")+ " HP");
		return;
	}
	if (GM_getValue("fightTurns") < GM_getValue("turnLimit")) {
		var useThis = GM_getValue("autoUse");

// 		pickpocket / pickpocket again
		if (GM_getValue("alwayspick") == 1) {
			if (document.forms.namedItem("steal")) document.forms.namedItem("steal").submit();
		}
		var actions = [null, AttackScript, ItemScript, SkillScript, MacroScript];
		if (typeof actions[useThis] == 'function') {
			addEventListener(window, 'load', actions[useThis], true);
		} else {
			SGM_log("no fight action selected");
		}
	} else if (GM_getValue("finisher") != 0) {
		  addEventListener(window, 'load', FinishScript, true);
	} else {
		setToRed("too many rounds");
	}
//	GM_log("fightTurns="+turns);
	GM_setValue("fightTurns", ++turns);
}


function stopAdventuring(msg) {
	GM_setValue("repeatAdv",OFF);
	GM_log("stopping: " + msg);
}

// Automatically click the Adventure Again button from the fight screen
// if forceframe <> 0, force the fight to load in frame 2 (mainpane) because this routine
// is being called from a different frame.
// (hopefully that functionality is no longer necessary.)
function doAutoAdv(forceframe) {
	grabMPHP();
	grabCombatInfo();
	SGM_log("MP: "+GM_getValue("MP")+".  skillCost: "+GM_getValue("skillCost")+".  HP: "+GM_getValue("HP")+".  MonsterDamage: "+GM_getValue("MonsterDamage"));
	SGM_log(" adventuresLeft: "+GM_getValue("adventuresLeft")+" stopAdvAt: "+GM_getValue("stopAdvAt")+" turns played:" +GM_getValue("turnsplayed"));
	
	var stopAdvAt = GM_getValue("stopAdvAt");
	var body = document.getElementsByTagName("body")[0].innerHTML;
	var acquiredStuff = body.match(/item: <b>[^<]+/g);
	if (GM_getValue("repeatAdv") == GO_CONDITIONAL && acquiredStuff){
		for (var i = 0; i < acquiredStuff.length; i++){
			//SGM_log("item" +i+ ": " + acquiredStuff[i].slice(9));
			if (STOP_LIST.indexOf(acquiredStuff[i].slice(9)) >= 0)
				stopAdventuring("found a stop-list item");  //stop-listed item acquired
		}
	}

	if ((GM_getValue("autoUse") == USE_SKILL) && (GM_getValue("MP") < GM_getValue("skillCost"))) {
		stopAdventuring("MP too low for auto-skillcasting (" + GM_getValue("MP") + "/" + GM_getValue("skillCost") + ").");
	} else if (GM_getValue("HP") < 1) {
		stopAdventuring("got beat up!");
	} else if (GM_getValue("repeatAdv") == GO_CONDITIONAL && body.match(/You gain (?:a|some) Level/g)) {
		stopAdventuring("Leveled up!");
	} else if (GM_getValue("MonsterDamage") * SAFETY_FACTOR >= GM_getValue("HP")) {
		stopAdventuring("too risky to continue; HP vs Damage = "+GM_getValue("HP")+", "+GM_getValue("MonsterDamage"));
	} else if ((stopAdvAt > 0) && (stopAdvAt <= GM_getValue("turnsplayed") + 1)) { 
		stopAdventuring("turns complete.");
		GM_setValue("stopAdvAt",0);
	}	
	//Reset some values since combat is over
	ResetCombatOptions();
	if (GM_getValue("repeatAdv") != OFF) {
		addEventListener(window, 'load', function() {
			var anchors = document.getElementsByTagName("a");
			for (var i = 0; i < anchors.length; i++) {
                var anchori_href = anchors[i].getAttribute('href') || "-";
				if ((anchori_href.indexOf("adventure.php") != -1) 
//				||	(anchori_href.indexOf("plains.php?action=brushfire") != -1)     //expired world event
//				||	(anchori_href.indexOf("invasion.php?action") != -1)             //expired world event
				||  (anchori_href.indexOf("action=trickortreat") != -1)             //new trick-or-treat combat
                ||  (anchori_href.indexOf("choice.php?whichchoice=804&pwd") != -1)  //new trick-or-treat noncombat
				||  (anchori_href.indexOf("cellar.php?action=autofaucet") != -1))   {
					SGM_log("href="+anchori_href+"; using anchor "+i);
					if (forceframe == 2) { 
						SGM_log("adventuring again from doAutoAdv() via charpane");
						parent.frames[2].location = anchors[i];
					} else {
						SGM_log("adventuring again from doAutoAdv()");
						document.location = anchors[i]; // document.links[i];
					}
					break;
				}
			}
		}, false);
	}
}

function buildPrefs()
{
    if (!document.querySelector('#privacy')) return;
    var scriptID = 'KSP';
    var scriptName = 'Klick-Saver Plus';
    if (!document.querySelector('#scripts'))
    {
//		SGM_log("Creating script tag");
        //scripts tab is not built, do it here
        var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
        scripts.id = 'scripts';
        var a = scripts.appendChild(document.createElement('a'));
        a.href = '#';
        var img = a.appendChild(document.createElement('img'));
        img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
        img.align = 'absmiddle';
        img.border = '0';
        img.style.paddingRight = '10px';
        a.appendChild(document.createTextNode('Scripts'));
        a.addEventListener('click', function (e)
        {
            //make our new tab active when clicked, clear out the #guts div and add our settings to it
            e.stopPropagation();
            document.querySelector('.active').className = '';
            document.querySelector('#scripts').className = 'active';
            document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
            document.querySelector('#guts').appendChild(buildSettings());
            //click handler for everything in this section
//            document.querySelector('#' + scriptID).addEventListener('click', changeSettings, false);
			GM_get("/account.php?tab=combat", insertAttack);
        }, false);
    }
    else
    {
//		SGM_log("adding to script tag");
        //script tab already exists
        document.querySelector('#scripts').firstChild.addEventListener('click', function (e)
        {
            //some other script is doing the activation work, just add our settings
            e.stopPropagation();
            document.querySelector('#guts').appendChild(buildSettings());
            //click handler for everything in this section
//           document.querySelector('#' + scriptID).addEventListener('click', changeSettings, false);
			GM_get("/account.php?tab=combat", insertAttack);
        }, false);
    }

	function setPrefs(prefSpan) {
		var newBr = document.createElement('br');
		var newB2 = document.createElement('br');				// probably don't need two of these ... ?
		var finisherButton = document.createElement('input');	// sets the skill to use when turnLimit is reached.
		var pickButton = document.createElement('input');		// always click "PickPocket" immediately if the button is present.

		finisherButton.setAttribute('class','button');
		finisherButton.setAttribute('value',(GM_getValue("finisher") == 0)?'Set Finisher':'Finisher - '+finisherName(GM_getValue("finisher")) );
		finisherButton.setAttribute('type','button');
		finisherButton.setAttribute('style','margin-top:.1em;');
		finisherButton.setAttribute('id','finisherButton');
		addEventListener(finisherButton, 'click', finishClicked, true);
		
		pickButton.setAttribute('class','button');
		pickButton.setAttribute('value',(GM_getValue("alwayspick") == 0?'Always pickpocket: NO':'Always pickpocket: YES'));
		pickButton.setAttribute('type','button');
		pickButton.setAttribute('style','margin-top:.1em');
		pickButton.setAttribute('id','pickButton');
		addEventListener(pickButton, 'click', pickClicked, true);
		
		prefSpan.appendChild(newBr);
		prefSpan.appendChild(finisherButton);
		prefSpan.appendChild(newB2);
		prefSpan.appendChild(pickButton);

		function finishClicked() {		// set finisher to whatever's in the autoattack dropdown.
			var whichAttack = document.getElementsByName("whichattack");
			GM_setValue("finisher", whichAttack[0].value);
			this.value = "Finisher - " + finisherName(GM_getValue("finisher"));
		}
		function pickClicked() {		// toggle always-pickpocket option.
			var pickpocket = GM_getValue("alwayspick",0);
			pickpocket = 1 - parseInt(pickpocket);
			GM_setValue("alwayspick",pickpocket);
			this.value = pickpocket?"Always pickpocket: YES":"Always pickpocket: NO";
		}
		// Grab the skill name from the option list to display in the button text.
		function finisherName(val){
			var whichAttack = document.getElementsByName('whichattack');
			for (var i = 0; i < whichAttack[0].options.length; i++)
				if (whichAttack[0].options[i].value == val)
					var finisherStr = whichAttack[0].options[i].text;
			if (finisherStr){
				if (val == 0) return('disabled');
				else if (val == 1) return('Attack with weapon');
				else return(finisherStr.match(/[^\(]+/g)[0]);
			}
			else return(null);
		}
	}

	function buildSettings()
	{
		//build our settings and return them for appending
		var guts = document.body.appendChild(document.createElement('div'));
		guts.id = scriptID;
		
		var subhead = guts.appendChild(document.createElement('div'));
		subhead.className = 'subhead';
		subhead.textContent = scriptName;
		
		var outerdiv = document.createElement('div');
		outerdiv.setAttribute('id','KSP-Div');
		outerdiv.style["border"] = "1px solid blue";
		outerdiv.style["width"] = "95%";
		
		var bigSpan = document.createElement('span');
		bigSpan.setAttribute('id','scriptpref');
		bigSpan.style["margin"] = "0 auto";
		bigSpan.style["display"] = "table-cell";
		bigSpan.style["overflowX"] = "hidden";
		bigSpan.style["overflowY"] = "auto"; 
		bigSpan.style["textalign"] = "left";
		bigSpan.style["lineHeight"] = "2em";
		bigSpan.style["padding"] = "5px";	
		
		var prefSpan = document.createElement('span');
		setPrefs(prefSpan);
		
		bigSpan.appendChild(prefSpan);
		outerdiv.appendChild(bigSpan);
		
		guts.appendChild(outerdiv);
		
		return guts;
	}

}   


// Memory-Leak-free event handling
//
// Registering event handlers with node.addEventHandler causes memory leaks.
// Adding via this function tracks them all, so they can be removed
// when the page unloads.
function addEventListener(target, event, listener, capture)
{
    registeredEventListeners.push( [target, event, listener, capture] );
    target.addEventListener(event, listener, capture);
}
function unregisterEventListeners(event)
{
    for (var i = 1; i < registeredEventListeners.length; i++) // was 0
    {
        var rel = registeredEventListeners[i];
        rel[0].removeEventListener(rel[1], rel[2], rel[3]);
    }
    window.removeEventListener('unload', unregisterEventListeners, false);
}

// n.b. When called from DoCombat(), these functions receive as their parameter an event object of type 'load'.
//		When called via clicking on the Combat-screen buttons, the event object is of type 'click'.
//		If they were clicked on, we want to set the cancelAtEnd option to 1, because we're only performing
//		the auto-action until the end of this combat, rather than as a permanent thing.
function AttackScript(setCancel) {
	var macrotext = document.getElementsByName("macrotext");
	if (!macrotext.length) { 
		GM_setValue("autoUse",ATTACK);
		if (setCancel && setCancel.type && setCancel.type == 'click') GM_setValue("cancelAtEnd",1);
		document.forms.namedItem("attack").submit(); 
		return; 
	}
	macrotext[0].value="abort pastround 25;attack;repeat;"
	document.forms.namedItem("macro").submit();
}

function ItemScript(setCancel) {
	var itemSelect = document.getElementsByName("whichitem");
	if (itemSelect[0].selectedIndex == 0) {
		setToRed("no item");
	} else {
		var macrotext = document.getElementsByName("macrotext");
		if (!macrotext.length) {
			GM_setValue("autoUse",USE_ITEM);
			if (setCancel && setCancel.type && setCancel.type == 'click') GM_setValue("cancelAtEnd",1);
			document.forms.namedItem("useitem").submit();
		} else {
			var itemnumber = itemSelect[0].options[itemSelect[0].selectedIndex].value;
			var itemnumber2 = 0;
			var funksling = document.getElementsByName("whichitem2");
			if (funksling.length) {
				itemnumber2 = funksling[0].options[funksling[0].selectedIndex].value;
			}
			if (itemnumber2 == 0) macrotext[0].value = "abort pastround 25;use "+itemnumber + "; repeat;";
			else macrotext[0].value = "abort pastround 25;use "+itemnumber + "," +itemnumber2 + "; repeat;";
			document.forms.namedItem("macro").submit();		
		}
	}
}

function SkillScript(setCancel) {
	var skillList=document.getElementsByName("whichskill");
	if (skillList[0].selectedIndex == 0) {
		setToRed("no skill selected");
	} else {
		var costText = skillList[0].options[skillList[0].selectedIndex].text.match(/\d+/g);	// please never have a skill with a number in its name.
		if (costText){
			SGM_log("cost="+Number(costText[0]));
			GM_setValue("skillCost", Number(costText[0]));
			GM_setValue("MP", GM_getValue("MP") - costText[0]);	// this will be inaccurate if we macro it, but hopefully that won't matter
																// because we'll get correct values when the macro finishes.
		}
		var macrotext = document.getElementsByName("macrotext");
		if (!macrotext.length) {
//			GM_setValue("autoUse",USE_SKILL);			// these 2 lines would matter if there were a "skill!" button on the combat screen.
//			if (setCancel && setCancel.type && setCancel.type == 'click') GM_setValue("cancelAtEnd",1);
			document.forms.namedItem("skill").submit();
		} else {
			var skillNumber=skillList[0].options[skillList[0].selectedIndex].value;
			macrotext[0].value="abort pastround 25;skill "+skillNumber+"; repeat;";
			document.forms.namedItem("macro").submit();
		}
	}
}

function MacroScript(setCancel) {
	if (GM_getValue("alreadyMacroed")) {
		SGM_log("already macroed once this combat, not gunna do it again.  No way, no how, nosirree.");
		return;
	}
	var whichMacroRef = getSelectByName("whichmacro"); 
	if (!whichMacroRef) {
		SGM_log("no macro selectbox found, abort");
		return;
	}
	var macroChosen = whichMacroRef.selectedIndex;
	if (macroChosen == 0) {
		SGM_log("no macro selected, abort");
		setToRed("no macro");
		return;
	}
	if (GM_getValue("aborted")) {
		setToRed("macro aborted");
		GM_setValue("aborted",false);
		return;
	}
	GM_setValue("alreadyMacroed",true);
	SGM_log("submitting macro");
	document.forms.namedItem("macro").submit();
}

function FinishScript (evt) { 
	if (GM_getValue("finisher") == 1) { // finish by simple attacking
		document.forms.namedItem("attack").submit();
		return;
	}

	// finish with a skill of some sort: do we have skills available?
	var whichSkillRef = document.getElementsByName("whichskill")[0];
	if (!whichSkillRef) return;
	
	// find our Finishing Skill selection in the list of possible choices.
	for(var i = 0; i < whichSkillRef.length; i++)
		if(whichSkillRef.options[i].value == GM_getValue("finisher"))
			whichSkillRef.selectedIndex = i;
	if (whichSkillRef.selectedIndex == 0){
		setToRed("finisher not in skill list");
		return;
	}
	var costText = whichSkillRef.options[whichSkillRef.selectedIndex].text.match(/\d+/g);
	if (costText) {
		GM_setValue("MP", GM_getValue("MP") - costText[0]);
	}
	document.forms.namedItem("skill").submit();		
}

function getSelectByName(name) {
	var selects = document.getElementsByTagName("select");
	return selects.namedItem(name);
}

function setToRed(message) {
	SGM_log("set to red because: "+message);
	GM_setValue("redbox", 1);
	top.document.getElementsByName('charpane')[0].contentDocument.location.reload();
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function GM_get(page, callback)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: page,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}

function insertAttack(txt)
{
// this routine doesn't work right.  feh.
//	SGM_log("txt="+txt);
//	var pdiv = document.createElement('div');
//	pdiv.innerHTML = txt;
//	var abox = pdiv.getElementsByName('whichattack');
//	SGM_log("abox="+abox.innerHTML);
//	var fButton = document.getElementById('finisherButton');
//	fButton.appendChild(abox);
}
	
function doHalloween() {
	var stopAdvAt = GM_getValue("stopAdvAt");
	var body = document.getElementsByTagName("body")[0].innerHTML;
	
	if ((stopAdvAt > 0) && (stopAdvAt <= GM_getValue("turnsplayed") + 1)) { 
		stopAdventuring("turns complete.");
		GM_setValue("stopAdvAt",0);
	}	
	//Reset some values since combat is over
	ResetCombatOptions();
	SGM_log("end-of-combat resets complete in doHalloween.");
	if (GM_getValue("repeatAdv") != OFF) {
//		SGM_log("trick-or-treating again...");
		document.forms[0].submit();
	}
}

function ResetCombatOptions() {
	GM_setValue("fightTurns", COUNTER);
	GM_setValue("MonsterDamage", 0);
	GM_setValue("redbox", 0);
	GM_setValue("aborted",false);			// just in case we managed to twiddle our thumbs outside of a macro.
	GM_setValue("alreadyMacroed",false);	// done trying to hit the macro button.
	if(GM_getValue("cancelAtEnd") == 1){
		GM_setValue("autoUse", OFF);
		GM_setValue("cancelAtEnd", OFF);
	}
}

