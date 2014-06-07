// KoL Click-saver with counter and combat auto-healing
// Copyright (c) 2006, Shawn Yeh(origional work) and Nick England(auto-heal and MP checking)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           d0om Combat UI enhancer with counter based on yehman's script
// @include        *kingdomofloathing.com/main_c.html
// @include        *kingdomofloathing.com/main.html
// @include        *kingdomofloathing.com/fight.php
// @include        *kingdomofloathing.com/charpane.php
// @include        *kingdomofloathing.com/adventure.php*
// @include        *kingdomofloathing.com/choice.php
// @include        127.0.0.1:6*
// @description    Version 1.1a This script will add buttons to your charpane which let you select Auto(W)eapon, (I)tem, (S)kill, (A)dventure, (H)ealing. Also adds buttons to the fight screen Fight! and Item! which repeat that action until end of combat. Double Click H to and type number >1 to set healing when 15away from max, double click A and enter number to adventure that many times.
// ==/UserScript==

/* Changes:
	Version 1.1b: Added auto-healing and MP checking stuff from my old script into yehman's new one. Bugfixes
   Version 1.1:  Auto-use will pause after specified number of rounds, and when item- or skill-use fails.
		     Auto-adventure logic shifted to fight.php and can now be set to repeat for X turns.
   Version 1.01:  Fixed minor bug of counter not resetting in certain situations.
   Version 1.0:  Fixed compatibility problem with Frameworks and KolWiki scripts. (thanks Picklish)
		     Support for fullmode, and made counter toggleable.
   Version 0.9(Initial release):  Buttons added, plus automation of 'use item' and 'use skill.'
   Version 0.2 - 0.7(Pre-release):  Automated 'use weapon' and 'adventure again.'
*/

const COUNTER = 1;  		//-1: off  0: start on zero  1: start on one
const AUTO_USE_LIMIT = 26;	//the round at which autoUse will be temporarily disabled
var safetyNumber=1.8; //This is extra safety factor which is used with monster damage

function AttackScript() {
	GM_setValue("autoUse",1);
	GM_setValue("cancelAtEnd",1);
	document.forms.namedItem("attack").submit('tack');
	}
function ItemScript() {
	GM_setValue("autoUse",2);
	GM_setValue("cancelAtEnd",1);
	document.forms.namedItem("useitem").submit();
	}

if ((window.location.pathname == "/main_c.html") ||(window.location.pathname == "/main.html")){
	GM_log("Initialize Values.");
	GM_setValue("autoUse", 0); 	//0: off  1: weapon  2: item  3: skill
	GM_setValue("repeatAdv", false);
	GM_setValue("fightTurns", COUNTER);
	GM_setValue("remainingAdv", 0);
	GM_setValue("MP",0);
	GM_setValue("HP",0);
	GM_setValue("MaxHP",0);
	GM_setValue("MaxMP",0);
	GM_setValue("skillCost",1);
	GM_setValue("cancelAtEnd",0);
	GM_setValue("autoHeal",0); //0: off 1: on
	GM_setValue("MonsterDamage",0); //Smallest Monster damage recieved from this fight
	GM_setValue("keepHPHigh",false); // set to 1 for healing if 15 below max HP
}

else if (window.location.pathname == "/charpane.php"){

	var pageBodyText = document.getElementsByTagName("body")[0].innerHTML;
	//Try to read in MP and HP values from the charpane if its the first round of combat
	if(GM_getValue("fightTurns") == COUNTER){
		var HMP = pageBodyText.match(/\d+\&nbsp;\/\&nbsp;\d+/g);
		if (HMP) {
				if (HMP[0].indexOf("/") != -1) {
				GM_setValue("HP",HMP[0].substring(0, HMP[0].indexOf("/")-6));
				GM_log("HP="+GM_getValue("HP"));
				GM_setValue("MaxHP",HMP[0].substring(HMP[0].indexOf("/")+7,HMP[0].length));
				GM_log("MaxHP="+GM_getValue("MaxHP"));
				} 
				if (HMP[1].indexOf('/') != -1) {
				GM_setValue("MP",HMP[1].substring(0, HMP[1].indexOf("/")-6));
				GM_log("MP="+GM_getValue("MP"));
				GM_setValue("MaxMP",HMP[1].substring(HMP[1].indexOf("/")+7,HMP[1].length));
				GM_log("MaxMP="+GM_getValue("MaxMP"));
				} 
			  }
			}
	if((Number(GM_getValue("MP")) < Number(GM_getValue("skillCost"))) && GM_getValue("fightTurns") == COUNTER && GM_getValue("autoUse")==3){
		alert("MP="+GM_getValue("MP")+" skill cost="+GM_getValue("skillCost")+" Feeed me! (Out of MP)");
		GM_setValue("repeatAdv",false);
		}
		
		
	//render the button layout
	if (document.getElementsByTagName("a")[0].innerHTML.indexOf("images.kingdomofloathing.com/otherimages") == -1){
		var insertAt = document.getElementsByTagName("hr")[0];
		var newHr = document.createElement('hr');
		newHr.setAttribute('width','50%');
		insertAt.parentNode.insertBefore(newHr, insertAt.nextSibling);
		var test = document.getElementsByTagName("body")[0].innerHTML.substr(document.getElementsByTagName("body")[0].innerHTML.indexOf("Adv</a>:") + 33, 4);
		var adventuresLeft = parseInt(test);
	}else {
		var insertAt = document.getElementsByTagName("table")[0];
		var adventuresLeft = parseInt(document.getElementsByTagName("span")[3].innerHTML);
	}
	var newTable = document.createElement('table');
	var buffer = "<tr><td>W</td><td>I</td><td>S</td><td>A</td><td>H</td></tr>";
	addGlobalStyle("table[id='buttonbox'] { table-layout: auto }"
			+ "table[id='buttonbox'] { border-spacing: 3px }"
			+ "table[id='buttonbox'] td { width: 11px }"
			+ "table[id='buttonbox'] td { font-size: .6em }"
			+ "table[id='buttonbox'] td { border: 2px solid black }"
			+ "table[id='buttonbox'] td { text-align: center }"
			+ "table[id='buttonbox'] td { cursor: default }"
			+ "table[id='buttonbox'] td.off { background-color: white }"
			+ "table[id='buttonbox'] td.on { background-color: lime }"
			+ "table[id='buttonbox'] td.warn { background-color: red }"
				);
	newTable.setAttribute('id','buttonbox');
	newTable.innerHTML = buffer;
	var tdArray = newTable.getElementsByTagName("td");
	insertAt.parentNode.insertBefore(newTable, insertAt.nextSibling);
	if (adventuresLeft == 0)
		GM_setValue("repeatAdv", false);
	if ((GM_getValue("autoUse") % 4) > 0)
		tdArray[GM_getValue("autoUse") % 4 - 1].setAttribute('class',(GM_getValue("autoUse") < 4)?'on':'warn');
	if (GM_getValue("repeatAdv"))
		tdArray[3].setAttribute('class','on');
	if (GM_getValue("remainingAdv") > 0)
		tdArray[3].innerHTML = GM_getValue("remainingAdv");
	if (GM_getValue("autoHeal"))
		tdArray[4].setAttribute("class","on");
	if (GM_getValue("keepHPHigh"))
		tdArray[4].innerHTML = "HH";

	
	//add button functions
	for (var i=0; i<tdArray.length; i++){
		switch (i) {
		   case 0:
			tdArray[i].addEventListener('mouseup', function(event) {
				if (GM_getValue("autoUse") % 4 == 1){
				  GM_setValue("autoUse", 0);
				  this.setAttribute('class','off');
				}else{
				  GM_setValue("autoUse", 1);
				  this.setAttribute('class','on');
				  this.nextSibling.setAttribute('class','off');
				  this.nextSibling.nextSibling.setAttribute('class','off');
				}
			}, true);
		      break;
		   case 1:
			tdArray[i].addEventListener('mouseup', function(event) {
				if (GM_getValue("autoUse") % 4 == 2){
				  GM_setValue("autoUse", 0);
				  this.setAttribute('class','off');
				}else{
				  GM_setValue("autoUse", 2);
				  this.setAttribute('class','on');
				  this.nextSibling.setAttribute('class','off');
				  this.previousSibling.setAttribute('class','off');
				}
			}, true);
		      break;
		   case 2:
			tdArray[i].addEventListener('mouseup', function(event) {
				if (GM_getValue("autoUse") % 4 == 3){
				  GM_setValue("autoUse", 0);
				  this.setAttribute('class','off');
				}else{
				  GM_setValue("autoUse", 3);
				  this.setAttribute('class','on');
				  this.previousSibling.setAttribute('class','off');
				  this.previousSibling.previousSibling.setAttribute('class','off');
				}
			}, true);
		      break;
		   case 3:
			tdArray[i].addEventListener('mouseup', function(event) {
				if (GM_getValue("repeatAdv")){
				  GM_setValue("repeatAdv", false);
				  this.setAttribute('class','off');
				}else{
				  GM_setValue("repeatAdv", true);
				  this.setAttribute('class','on');
				}
			}, false);
			tdArray[i].addEventListener('dblclick', function(event) {
				var adventureLimit = parseInt(prompt('Auto-adventure for how many turns?'));
				if (adventureLimit > adventuresLeft) adventureLimit = adventuresLeft;
				else if (adventureLimit < 0 || !adventureLimit) adventureLimit = 0;
				if (adventureLimit > 0) {
					GM_setValue("remainingAdv", adventureLimit);
					GM_setValue("repeatAdv", true);
					this.innerHTML = adventureLimit;
					this.setAttribute('class','on');
				}
				event.stopPropagation();
				event.preventDefault();
			}, true);
		      break;
		case 4:
		  tdArray[i].addEventListener('click', function(event) {
			if (GM_getValue("autoHeal")){
			  GM_setValue("autoHeal", false);
			  this.setAttribute('class','off');
			}else{
			  GM_setValue("autoHeal", true);
			  this.setAttribute('class','on');
			}
		  }, true);
		tdArray[i].addEventListener('dblclick', function(event) {
				var KeepHPhighInput = parseInt(prompt('AutoHeal at 15 below max HP?'));
				if (KeepHPhighInput > 0) {
					GM_setValue("keepHPHigh", true);
					GM_setValue("autoHeal", true);
					this.innerHTML = "HH";
					this.setAttribute('class','on');
				}
				else{
					GM_setValue("keepHPHigh", false);
					GM_setValue("autoHeal", true);
					this.innerHTML = "H";
					this.setAttribute('class','on');
				}
				event.stopPropagation();
				event.preventDefault();
			}, true);
		  break;
		}
	}
}

else if (window.location.pathname == "/fight.php"){
	var div = document.getElementsByTagName("b")[0];
	var body = document.getElementsByTagName("body")[0].innerHTML;
	if ( (body.indexOf("<!--WINWINWIN-->") == -1) && (body.indexOf("You lose.  ") == -1) && (body.indexOf("You run away, ") == -1) ) {
		var turns = GM_getValue("fightTurns");
		if (COUNTER >= 0){
			strTurns = " - " + (turns > 25 ? "<span style=\"color:red;\">" + "Round " + turns + "</span>" : "Round " + turns);
			div.innerHTML += strTurns;
		}
		
		var buttons = document.getElementsByTagName('input'); // make an array called buttons containing all the input buttons
		
		var NewAttack = document.createElement('input'); // NewAttack is a button we want to attack and turn on autoattack
		NewAttack.setAttribute('class','button');
		NewAttack.setAttribute('value','Attack!');
		NewAttack.setAttribute('type','button');
		NewAttack.setAttribute('style','margin-left:1em;display:inline;');
		NewAttack.setAttribute("id","NewAttack");
		NewAttack.addEventListener('click', AttackScript, true);
		document.getElementById('tack').parentNode.appendChild(NewAttack);
		
		var NewItem = document.createElement('input'); // NewItem is a button we want to item and turn on autoitem
		NewItem.setAttribute('class','button');
		NewItem.setAttribute('value','Item!');
		NewItem.setAttribute('type','button');
		NewItem.setAttribute('style','margin-left:1em;display:inline;');
		NewItem.addEventListener('click', ItemScript, true);
		document.getElementById("NewAttack").parentNode.appendChild(NewItem);
		
		//This section grabs player healing
		var pageBodyText = document.getElementsByTagName("body")[0].innerHTML;
		var HealText = pageBodyText.match(/You gain \d+ hit point/g);
		if(HealText){
			for(var i=0;i<HealText.length;i++){
				var curHeal = HealText[i].substring(HealText[i].indexOf("n")+2, HealText[i].indexOf(" hit point"));
				GM_setValue("HP",Number(GM_getValue("HP"))+Number(curHeal));
				GM_log("Healing HP: "+curHeal);
				if(Number(GM_getValue("HP")) > Number(GM_getValue("MaxHP")))
					GM_setValue("HP",GM_getValue("MaxHP"));
				}
			}
		
		//This section tries to grab monster damage
		var pageBodyText = document.getElementsByTagName("body")[0].innerHTML;
		var DamageText = pageBodyText.match(/You lose \d+ hit point/g);
		if(DamageText){
			var curDamage = DamageText[0].substring(DamageText[0].indexOf("e")+2, DamageText[0].indexOf(" hit point"));
			GM_setValue("HP",Number(GM_getValue("HP"))-Number(curDamage));
			if (Number(curDamage) < Number(GM_getValue("MonsterDamage")) || GM_getValue("MonsterDamage")==0){
				GM_setValue("MonsterDamage",curDamage);
				GM_log("MDam="+GM_getValue("MonsterDamage"));
				}
			}
			
		//This section tries to grab fumble damage
		var pageBodyText = document.getElementsByTagName("body")[0].innerHTML;
		var fumbleText = pageBodyText.match(/FUMBLE![^0-9]+\d+/g);
		if(fumbleText){
			var curDamage = fumbleText[0].substring(fumbleText[0].lastIndexOf(" ")+1);
			GM_setValue("HP",Number(GM_getValue("HP"))-Number(curDamage));
			GM_log("Fumble!"+curDamage);
			}
		
		GM_log("Current HP:"+GM_getValue("HP"));
		
		
		if (turns < AUTO_USE_LIMIT)
		  if (body.indexOf("That doesn't make any sense") == -1) {
		  
		  if(GM_getValue("autoHeal")){
				var returnAutoUse=GM_getValue("autoUse");
				var SalveAvailable=0;
				var BandageAvailable=0;
				if(Number(GM_getValue("MonsterDamage"))*Number(safetyNumber)+2 >= Number(GM_getValue("HP")) || (GM_getValue("keepHPHigh")==1 && Number(GM_getValue("HP"))+15 <= Number(GM_getValue("MaxHP")))){
					GM_setValue("autoUse",0);
					GM_log("Trying to Heal HP="+GM_getValue("HP")+" threshold is "+Number(GM_getValue("MonsterDamage"))*Number(safetyNumber)+2);
					window.addEventListener('load', function() {
						
						for(var i=0; i < this.document.skill.whichskill.length; i++){
							if(this.document.skill.whichskill.options[i].text.indexOf("Salve")!= -1){
								SalveAvailable=i;
								GM_log("salve is skill "+i);
								}
							if(this.document.skill.whichskill.options[i].text.indexOf("Bandages")!= -1){
								BandageAvailable=i;
								GM_log("Bandage is skill "+i);
								}
						}
						
							if(SalveAvailable > 0){ 
								this.document.skill.whichskill.options.selectedIndex=Number(SalveAvailable);
								}
							else if(BandageAvailable > 0) this.document.skill.whichskill.options.selectedIndex=Number(BandageAvailable);
							else {
								alert("Out of MP! I recommend using a Doc's Ointment. Don't have one? Run away.");
								GM_setValue("repeatAdventure",0);
								GM_setValue("autoUse",0);
								return;
							}
						this.document.skill.submit();
						GM_setValue("autoUse",returnAutoUse);
					},true);
				}
				
			}
		  
		  
		  
			if (GM_getValue("autoUse") >= 4){
				GM_setValue("autoUse", GM_getValue("autoUse") % 4);
				top.document.getElementsByName('charpane')[0].contentDocument.location.reload();
			}
			switch (GM_getValue("autoUse")) {
				case 1:
				  window.addEventListener('load', function() { this.document.attack.submit(); }, true);
				break;
				case 2:
				  window.addEventListener('load', function() { this.document.useitem.submit(); }, true);
				break;
				case 3:
				  window.addEventListener('load', function() { 
				   var skillchosen = this.document.skill.whichskill.selectedIndex;
				   GM_log("Selected index "+skillchosen);
				   var costtext=this.document.skill.whichskill.options[skillchosen].text;
                   if(costtext=="(select a skill)"){
					alert("Remember that time you tried to use a skill with none selected? Muppet (your probably out of MP)");
					GM_setValue("autoUse",0);
					GM_setValue("repeatAdv",0);
                return;
                }
              GM_log("Text is "+ costtext);
               var coststart = costtext.indexOf("(");
               var costend = costtext.indexOf(" Mana Points)");
               if(costend == -1)
                costend = costtext.indexOf (" Mojo Points)");
               if(costend == -1)
                costend = costtext.indexOf(" Muscularity Points)");
               GM_setValue("skillCost", costtext.substring(coststart+1,costend));
               GM_log("Skill cost set to "+ GM_getValue("skillCost"));
				  this.document.skill.submit(); 
				  }, true);
			break;
			}
		  }else {
			GM_setValue("autoUse", GM_getValue("autoUse") % 4 + 4);
			top.document.getElementsByName('charpane')[0].contentDocument.location.reload();
		  }
		else if ((GM_getValue("autoUse") > 0) && (GM_getValue("autoUse") < 4)) {
			GM_setValue("autoUse", GM_getValue("autoUse") % 4 + 4);
			top.document.getElementsByName('charpane')[0].contentDocument.location.reload();
		}
		GM_setValue("fightTurns", ++turns);
	}
	else {
		GM_setValue("fightTurns", COUNTER);
		GM_setValue("MonsterDamage",0);
		if(GM_getValue("cancelAtEnd")==1){
			GM_setValue("autoUse",0);
			GM_setValue("cancelAtEnd",0);
		}
		else{
			GM_setValue("autoUse", GM_getValue("autoUse") % 4);
		}
		doAutoAdv();
	}
} else if ((window.location.pathname == "/adventure.php" || window.location.pathname == "/choice.php")
	    && GM_getValue("repeatAdv")){
	doAutoAdv();
}

function doAutoAdv() {
	if (GM_getValue("remainingAdv") > 0) {
		GM_setValue("remainingAdv", GM_getValue("remainingAdv") - 1);
		if (GM_getValue("remainingAdv") == 0)
			GM_setValue("repeatAdv", false);
	}
	if (GM_getValue("repeatAdv"))
		window.addEventListener('load', function() {
			var anchors = document.getElementsByTagName("a");
			for (var i = 0; i < anchors.length; i++)
				if (anchors[i].getAttribute("href").indexOf("adventure.php") != -1) {
					document.location = document.links[i];
					break;
				}
		}, false);
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