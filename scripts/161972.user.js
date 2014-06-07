// ==UserScript==
// @name        Outlaw Assistant
// @namespace   http://userscripts.org/users/509254
// @description This script will check the Union's list of Outlaw pilots against your foes list, and will create a list of who you have not foelisted and display it beneath the lookup button for easy selection and foelisting.  If nobody needs foelisting a link to the Outlaw's List on the forums is displayed.
// @include     http://artemis.pardus.at/diplomacy.php
// @include     https://artemis.pardus.at/diplomacy.php
// @updateURL   https://userscripts.org/scripts/source/161972.meta.js
// @version     3.04
// ==/UserScript==

//v3.03
//44 removed Wormy ban hammers - Linda Lanner, Pandora, Silverclaw
//
//v3.02
//48 Sky Crossbones - pirate
//
//v3.01
//Celso renamed to Nugz
//
//v3.0
// added functionality to alert users when they foelist a pilot prior to selecting a provided name.
//
//v2.27
// 47 added Edd Solo, Teereere
//
//v2.26
// 45 removed Asteo - retired.
//
//v2.25
//46 Asteo, Tzenyetz The Third, Wormy - Thor Max DD peoples
//
//v2.24
//43 Flash Simmons - pirate 
//
//v2.23
//42 Bofa - pirate alliance/Unionite
//
//v2.22
//41 Celso - idiot/pirate
//
//v2.21
//40
// Stormer - UNR/URC pirate
//
//v2.20
//39 
// Antibody - Fed| PUC pirate
//
//v2.19
//38
// Telo (retired), Heredia Elhorriblay (paid reps) removed
//
//v2.18
//40 Telo
// Venom Einbein Dakker rename to Doctor Capaldi
//
//v2.17
//39 Tacoguy
//
//v2.16
//38 Human Inside
//
//v2.15 
//   removed Arrakis
//37 added Celestial 
//
//v2.14
//37 removed The Uncatchable
//
//v2.13
//38 added The Uncatchable
//
//v2.12
//37 removed Soulfly - terms
//
//v2.11
//38 removed Bullstuff - deleted
//
//v2.1
//39 Linda Lanner
//
//v2.0
//outlaw removals
//22 names come off and onto removeOutlaws
//38 outlaws remain
//
//v1.91
//disabled new requests for peace treaty removals.
//
//v1.81
//60 removed Jaya
//
//v1.8
//61 Narf Anisset, Oafman, Chunkie, Marathorn, Exon, Huckleberry, Durandal, Reiziger, Abominated
//
//v1.7
//51 Space Cowboy
//
//v1.61
//50 removed Lancelotv
//
//v1.6
//51 Warson
//
//v1.54
//50 Tro, Sony
//
//v1.53
//feature update fix
//48 Drendie, Akakios, Tealc, Alucard, Arteida, A Horse, Marathorn, Saint Bon, Jaya, Kilgore Trout, Vampyre, Larki
//
//v1.4
//improved algorithms 
//
//v1.3
//36 Tragic, Lancelotv, Hades, Rafe Deathbringer
//
//v1.21
//@updateURL and @downloadURL included
//
//v1.2
//32 - Aaronic has retired.
//
//v1.1 - 2013/3/15
//33 - added Vegas
//https support
//
//v1.0
//32 Outlaws on script launch 2013/3/14
//

/*This finds the foes option list*/
var selectTables = document.getElementsByTagName("select");
var currentFoes = selectTables[selectTables.length-7];
var drawLocation = document.getElementsByTagName("form");

/*Our current list of Outlaws, shoved into an Array.*/
var Outlaws = new Array();
var removeOutlaws = new Array();

var h3 = document.getElementsByTagName("h3");
var inners = h3[5].innerHTML;

/*If for some reason you are not going to foe a pilot, just replace their name with another outlaw in this list.*/
Outlaws[0] = "A Horse";
Outlaws[1] = "Alucard";
Outlaws[2] = "Amaya de Castro";
Outlaws[3] = "Antibody";
Outlaws[4] = "Antichrist";
Outlaws[5] = "Black Chocolate";
Outlaws[6] = "Bob Gramsci";
Outlaws[7] = "Bofa";
Outlaws[8] = "Brock Lesnar";
Outlaws[9] = "Celestial";
Outlaws[10] = "Doctor Capaldi";
Outlaws[11] = "Edd Solo";
Outlaws[12] = "Flash Simmons";
Outlaws[13] = "Ford Saw";
Outlaws[14] = "Hades";
Outlaws[15] = "Human Inside";
Outlaws[16] = "Johndoe";
Outlaws[17] = "Long Tom";
Outlaws[18] = "Mev Einbein Dakker";
Outlaws[19] = "Mourning Storm";
Outlaws[20] = "Nugz";
Outlaws[21] = "Peter Griffin";
Outlaws[22] = "Rafe Deathbringer";
Outlaws[23] = "Relax";
Outlaws[24] = "Servitude";
Outlaws[25] = "Sky Crossbones";
Outlaws[26] = "Smiles";
Outlaws[27] = "Smurf Cloud";
Outlaws[28] = "Sony";
Outlaws[29] = "Stormer";
Outlaws[30] = "Sugar Eater";
Outlaws[31] = "Tacoguy";
Outlaws[32] = "Tealc";
Outlaws[33] = "Teereere";
Outlaws[34] = "The Clone Ranger";
Outlaws[35] = "The Purple Adder";
Outlaws[36] = "Tripod Mistress";
Outlaws[37] = "Tzenyetz The Third";
Outlaws[38] = "Urito";
Outlaws[39] = "Vegas";
Outlaws[40] = "War Emblem";
Outlaws[41] = "Warson";
Outlaws[42] = "Wild Gina";
Outlaws[43] = "Zetaka"; 
//Outlaws[] = "";

removeOutlaws[0] = "Aah Chu";
/*removeOutlaws[1] = "Akakios";
removeOutlaws[2] = "Arteida";
removeOutlaws[3] = "Chunkie";
removeOutlaws[4] = "Drendie";
removeOutlaws[5] = "Durandal";
removeOutlaws[6] = "Exon";
removeOutlaws[7] = "Huckleberry";
removeOutlaws[8] = "Jaya";
removeOutlaws[9] = "Lancelotv";
removeOutlaws[10] = "Kilgore Trout";
removeOutlaws[11] = "Larki";
removeOutlaws[12] = "Lun";
removeOutlaws[13] = "Marathorn";
removeOutlaws[14] = "Narf Anisset";
removeOutlaws[15] = "Oafman";
removeOutlaws[16] = "Reiziger";
removeOutlaws[17] = "Saint Bon";
removeOutlaws[18] = "Space Cowboy";
removeOutlaws[19] = "Tro";
removeOutlaws[20] = "Tragic";
removeOutlaws[21] = "Vampyre";*/
//removeOutlaws[22] = "";



/*function check outlaws with current foes this function will find who you have not foelisted, and add them to the list of who to foe				                      																	*/ //if(inners.match(/[A-Za-z0-9\/.:='"<_]*Inner Assembly/g) == "Inner Assembly"){}else{Outlaws = new Array();}

/*this will be the position in the outlaw array*/
var x = 0;
var Rx = 0;

/*position to look in the foes array*/
var position = 0;
var Rposition = 0;

/*position to add foesNeeded*/
var f = 0;
var foesNeeded = new Array();

while(x<Outlaws.length){
	
	/*this will be the position in the foes array*/
	var y = position;
	
	while(y<currentFoes.length){
		if(Outlaws[x] == currentFoes[y].value){
			currentFoes[y].setAttribute('style', "color:red");			
			position = y;
			y += 9999;
		}else{	
			++y;
		}
	}
	
	/*if y is less than the length, a match was not found, adds x to the foesNeeded array.*/
	if(y < currentFoes.length+2){
		foesNeeded[f] = Outlaws[x];
		++f;
	}
	
	++x;
}

var focus = true;
var removeCount = 0;

while(Rx<removeOutlaws.length){
	
	/*this will be the position in the foes array*/
	var Ry = Rposition;
	
	while(Ry<currentFoes.length){
		if(removeOutlaws[Rx] == currentFoes[Ry].value){
			currentFoes[Ry].setAttribute('style', "color:blue");	
			if(focus == true){
				currentFoes[Ry].setAttribute('selected', true);
				focus = false;
			}
			
			if(currentFoes[Ry].value == removeOutlaws[0]){
				alert("Aah Chu is not a foe and may have been added incorrectly.  Be sure to select a foe from the list prior to looking up a pilot's name.");
			}
			Rposition = Ry;
			Ry += 9999;
			++removeCount;			
		}else{	
			++Ry;
		}
	}
	++Rx;
}

/*if there are no pilots to foe, we really don't need all this stuff so don't do it*/
if(f > 0){

	var drawList = document.createElement("select");
	var optionList = document.createElement("option");

	var counter = 0;

	while(counter < foesNeeded.length){

		optionList = document.createElement("option");
		optionList.setAttribute('value', foesNeeded[counter]);
		drawList.appendChild(optionList);
		drawList.options[drawList.length-1].text = foesNeeded[counter];
		++counter;
	}

	drawList.setAttribute("name", "outlawList");
	drawList.setAttribute("id", "outlawList");
	drawList.setAttribute("onclick", "document.dipl_lookup.lookup_name.value = (outlawList.options[outlawList.options.selectedIndex].value)");
	drawList.setAttribute("size", f);
	drawList.setAttribute("style", "width:4.5cm");


	var drawText = document.createElement("h7");

	if(removeCount > 0){
		drawText.innerHTML = removeCount + " pilots can be removed from your foes lists.<br><a href = 'http://z9.invisionfree.com/Unionforum/index.php?showtopic=2053' target='_blank'>These (" + f + ") pilots</a> are not foelisted:";
	}
	else{
		drawText.innerHTML = "<a href = 'http://z9.invisionfree.com/Unionforum/index.php?showtopic=2053' target='_blank'>These (" + f + ") pilots</a> are not foelisted:";
	}
	drawLocation[0].parentNode.appendChild(drawText);
	drawLocation[0].parentNode.appendChild(drawList);

}else{

	var outlawsLabel = document.createElement("h7");
	
	if(removeCount > 0){
		outlawsLabel.innerHTML = "Union enemies are all foelisted.<br>" + removeCount + " pilots can be removed from your foes lists.<br><a href = 'http://z9.invisionfree.com/Unionforum/index.php?showtopic=2053' target='_blank'>A complete list with their crimes can be found here.</a>";
	}
	else{
		outlawsLabel.innerHTML = "Union enemies are all foelisted.<br><a href = 'http://z9.invisionfree.com/Unionforum/index.php?showtopic=2053' target='_blank'>A complete list with their crimes can be found here.</a>";
	}
	
	drawLocation[0].parentNode.appendChild(outlawsLabel);
}