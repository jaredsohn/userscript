// ==UserScript==
// @name        RC Foe List Assistant
// @namespace   http://userscripts.org/users/508551
// @description This script will check Red Cell's foe list against your foes list, and will create a list of who you have not foelisted and display it beneath the lookup button for easy selection and foelisting.  If nobody needs foelisting a link to the RC foe list on the forums is displayed.
// @include     http://orion.pardus.at/diplomacy.php
// @include     https://orion.pardus.at/diplomacy.php
// @updateURL   https://userscripts.org/scripts/source/180483.meta.js
// @downloadURL https://userscripts.org/scripts/source/180483.user.js
// @version     1.0
// ==/UserScript==

//v1.0
//Copied over from Arty Union Script
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
Outlaws[0] = "Math";

removeOutlaws[0] = "Erius";


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
		drawText.innerHTML = removeCount + " pilots can be removed from your foes lists.<br><a href = 'http://redcell.dayvmattt.com/viewtopic.php?f=24&t=3269' target='_blank'>These (" + f + ") pilots</a> are not foelisted:";
	}
	else{
		drawText.innerHTML = "<a href = 'http://redcell.dayvmattt.com/viewtopic.php?f=24&t=3269' target='_blank'>These (" + f + ") pilots</a> are not foelisted:";
	}
	drawLocation[0].parentNode.appendChild(drawText);
	drawLocation[0].parentNode.appendChild(drawList);

}else{

	var outlawsLabel = document.createElement("h7");
	
	if(removeCount > 0){
		outlawsLabel.innerHTML = "Red Cell enemies are all foelisted.<br>" + removeCount + " pilots can be removed from your foes lists.<br><a href = 'http://redcell.dayvmattt.com/viewtopic.php?f=24&t=3269' target='_blank'>A complete list with their crimes can be found here.</a>";
	}
	else{
		outlawsLabel.innerHTML = "Red Cell enemies are all foelisted.<br><a href = 'http://redcell.dayvmattt.com/viewtopic.php?f=24&t=3269' target='_blank'>A complete list with their crimes can be found here.</a>";
	}
	
	drawLocation[0].parentNode.appendChild(outlawsLabel);
}