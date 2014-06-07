// ==UserScript==
// @name           Save Lineups
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/team/lineups_edit_orig.html?lineup_index=1&setdefault=*
// @include        http://fantasygames.sportingnews.com/stratomatic/team/lineups_edit_branch.html?lineup_index=*
// @include	   http://fantasygames.sportingnews.com/stratomatic/team/lineups_edit_orig.html?lineup_index=*
// @include	   http://fantasygames.sportingnews.com/stratomatic/home_good.html
// ==/UserScript==
var myInnerHTML='';
var parameter2;
var savedLinup2 = new Array();
var savedLinup = new Array();
var overWriteLinup = new Array();
var scriptCode = new Array(); 
var whichSlot = 0;
var currentSave;
var currentSaveName;

var savedDefaultLeft = new Array();
var savedDefaultRight = new Array();

var thisURL = document.URL;
var thisURLIndex = thisURL.substring(thisURL.indexOf('lineup_index=')+13,thisURL.indexOf('lineup_index=')+14);


var savedLinupSplit = new Array();
var currentLineupSplit = new Array();

var initializeSpot = new Array();


var theTeams = document.evaluate("//div[@class='text11']/text()[2]|//div[@class='text11']/text()[4]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var theTeam;
var theTeam2=''


for (var i = 0; i < theTeams.snapshotLength; i++) {

	theTeam = theTeams.snapshotItem(i);
	theTeam = theTeam.nodeValue;
	theTeam = trim(theTeam);


	if(i + 1 == theTeams.snapshotLength){
		
		theTeam2 += theTeam;
	}
	else
	{
		
		theTeam2 += theTeam + "-";
	}



}



for (var p = 1; p < 10;p++){

	initializeSpot[p] = 0;
}


if(thisURL != "http://fantasygames.sportingnews.com/stratomatic/home_good.html"){
	
var d = GM_getValue("save_lineups_toggle", '0');



	if(d == '0'){

	
	}
	else {

		switch(d)
		{
			case "save_lineups_vsleft_slot1":

				var e = GM_getValue("save_lineups_vsleft_slot1");

			break;	

			case "save_lineups_vsleft_slot1b":

				var e = GM_getValue("save_lineups_vsleft_slot1b");

			break;	

			case "save_lineups_vsleft_slot1c":

				var e = GM_getValue("save_lineups_vsleft_slot1c");

			break;	
			case "save_lineups_vsleft_slot1d":

				var e = GM_getValue("save_lineups_vsleft_slot1d");

			break;			
			case "save_lineups_vsleft_slot1e":

				var e = GM_getValue("save_lineups_vsleft_slot1e");

			break;			

			case "save_lineups_vsleft_slot2":

				var e = GM_getValue("save_lineups_vsleft_slot2");

			break;

			case "save_lineups_vsleft_slot2b":

				var e = GM_getValue("save_lineups_vsleft_slot2b");

			break;
			case "save_lineups_vsleft_slot2c":

				var e = GM_getValue("save_lineups_vsleft_slot2c");

			break;	
			case "save_lineups_vsleft_slot2d":

				var e = GM_getValue("save_lineups_vsleft_slot2d");

			break;			
			case "save_lineups_vsleft_slot2e":

				var e = GM_getValue("save_lineups_vsleft_slot2e");

			break;			

			case "save_lineups_vsleft_slot3":

				var e = GM_getValue("save_lineups_vsleft_slot3");
			

			break;	
			case "save_lineups_vsleft_slot3b":

				var e = GM_getValue("save_lineups_vsleft_slot3b");
			

			break;
			case "save_lineups_vsleft_slot3c":

				var e = GM_getValue("save_lineups_vsleft_slot3c");
			

			break;			
			case "save_lineups_vsleft_slot3d":

				var e = GM_getValue("save_lineups_vsleft_slot3d");
			

			break;	
			case "save_lineups_vsleft_slot3e":

				var e = GM_getValue("save_lineups_vsleft_slot3e");
			

			break;			

			case "save_lineups_vsright_slot1":

				var e = GM_getValue("save_lineups_vsright_slot1");

			break;	
			case "save_lineups_vsright_slot1b":

				var e = GM_getValue("save_lineups_vsright_slot1b");

			break;	
			case "save_lineups_vsright_slot1c":

				var e = GM_getValue("save_lineups_vsright_slot1c");

			break;	
			case "save_lineups_vsright_slot1d":

				var e = GM_getValue("save_lineups_vsright_slot1d");

			break;			
			case "save_lineups_vsright_slot1e":

				var e = GM_getValue("save_lineups_vsright_slot1e");

			break;			

			case "save_lineups_vsright_slot2":

				var e = GM_getValue("save_lineups_vsright_slot2");

			break;	
			case "save_lineups_vsright_slot2b":

				var e = GM_getValue("save_lineups_vsright_slot2b");

			break;	
			case "save_lineups_vsright_slot2c":

				var e = GM_getValue("save_lineups_vsright_slot2c");

			break;			
			case "save_lineups_vsright_slot2d":

				var e = GM_getValue("save_lineups_vsright_slot2d");

			break;			
			case "save_lineups_vsright_slot2e":

				var e = GM_getValue("save_lineups_vsright_slot2e");

			break;			

			case "save_lineups_vsright_slot3":

				var e = GM_getValue("save_lineups_vsright_slot3");

			break;	
			case "save_lineups_vsright_slot3b":

				var e = GM_getValue("save_lineups_vsright_slot3b");

			break;	
			case "save_lineups_vsright_slot3c":

				var e = GM_getValue("save_lineups_vsright_slot3c");

			break;				
			case "save_lineups_vsright_slot3d":

				var e = GM_getValue("save_lineups_vsright_slot3d");

			break;				
			case "save_lineups_vsright_slot3e":

				var e = GM_getValue("save_lineups_vsright_slot3e");

			break;				
		}



		if (e != null) savedLinup = e.split("|");
		savedLinup2 = savedLinup[2].split("\n");
		
		
		for (var i = 0; i < savedLinup2.length;i++)
		{
			scriptCode.push(savedLinup2[i]);

		}
		

		var scripts  = document.evaluate("//script[contains(string(),'function initializeLineup')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    		var script = scripts.snapshotItem(0);
    		var myInput = document.createElement('script');

		myInput.innerHTML = scriptCode.join('\n'); 


		scriptCode.length = 0; 

		script.parentNode.insertBefore(myInput, script.nextSibling);

		GM_setValue("save_lineups_toggle", '0');		
	}
	
//Read current lineup
var currentLineups  = document.evaluate("//script[contains(string(),'function initializeLineup')]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var currentLineup = currentLineups.snapshotItem(0);
currentLineup = currentLineup.nodeValue;


//Add Save button
var saveYourLineups  = document.evaluate("//td/input[@value='SAVE YOUR LINEUP']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var saveYourLineup = saveYourLineups.snapshotItem(0);

var newButton = document.createElement('td');

var defaultDropDown = '<br>If you have tinkered with your lineup be sure to "SAVE YOUR LINEUP" before using the "Save to slot" button.<br><br><table summary="saveTable"  class="cleft" cellpadding=3 cellspacing=1 border=0 align="center"><tr class="odd"><td class="text12" align="center">'+
'Slots: <select class="text12" name="slots">'+
'<option value="slot1">------</option>'+
'<option value="slot1">Slot 1</option>'+
'<option value="slot2">Slot 2</option>'+
'<option value="slot3">Slot 3</option>'+
'</select>'+
'&nbsp;&nbsp;<input type="button" value="Save to slot" disabled="disabled" /><br>&nbsp;</td></tr></table>';


/////////////////////////////////////////////////////////
if (thisURLIndex == 1)
{
	
	var aa = GM_getValue("save_lineups_vsleft_slot1",'');
	var bb = GM_getValue("save_lineups_vsleft_slot1b",'');
	var cc = GM_getValue("save_lineups_vsleft_slot1c",'');
	var dd = GM_getValue("save_lineups_vsleft_slot1d",'');
	var ee = GM_getValue("save_lineups_vsleft_slot1e",'');

	if(aa.indexOf(theTeam2) == -1 && bb.indexOf(theTeam2) == -1 && cc.indexOf(theTeam2) == -1 && dd.indexOf(theTeam2) == -1 && ee.indexOf(theTeam2) == -1){

		if(aa != '' && bb != '' && cc != '' && dd != '' && ee != ''){
			
			newButton.innerHTML = '<br>All team slots have been filled up.  Choose team from drop down below to overwrite.<br><br><table summary="saveTable"  class="cleft" cellpadding=3 cellspacing=1 border=0 align="center"><tr class="odd"><td class="text12" align="center">'+
'Slots: <select class="text12" name="slots">'+
'<option value="slot1">------</option>'+
'<option value="'+aa.substring(0,aa.indexOf('|'))+'">'+aa.substring(0,aa.indexOf('|'))+'</option>'+
'<option value="'+bb.substring(0,bb.indexOf('|'))+'">'+bb.substring(0,bb.indexOf('|'))+'</option>'+
'<option value="'+cc.substring(0,cc.indexOf('|'))+'">'+cc.substring(0,cc.indexOf('|'))+'</option>'+
'<option value="'+dd.substring(0,dd.indexOf('|'))+'">'+dd.substring(0,dd.indexOf('|'))+'</option>'+
'<option value="'+ee.substring(0,ee.indexOf('|'))+'">'+ee.substring(0,ee.indexOf('|'))+'</option>'+
'</select>'+
'</td></tr></table>';


		}
		else
		{
			newButton.innerHTML = defaultDropDown;
		}

	}
	else
	{
			newButton.innerHTML = defaultDropDown;
	}	


}
else if (thisURLIndex == 2)
{
	
	var aa = GM_getValue("save_lineups_vsright_slot1",'');
	var bb = GM_getValue("save_lineups_vsright_slot1b",'');
	var cc = GM_getValue("save_lineups_vsright_slot1c",'');
	var dd = GM_getValue("save_lineups_vsright_slot1d",'');
	var ee = GM_getValue("save_lineups_vsright_slot1e",'');

	if(aa.indexOf(theTeam2) == -1 && bb.indexOf(theTeam2) == -1 && cc.indexOf(theTeam2) == -1 && dd.indexOf(theTeam2) == -1 && ee.indexOf(theTeam2) == -1){

		if(aa != '' && bb != '' && cc != '' && dd != '' && ee != ''){
			
			newButton.innerHTML = '<br>All team slots have been filled up.  Choose team from drop down below to overwrite.<br><br><table summary="saveTable"  class="cleft" cellpadding=3 cellspacing=1 border=0 align="center"><tr class="odd"><td class="text12" align="center">'+
'Slots: <select class="text12" name="slots">'+
'<option value="slot1">------</option>'+
'<option value="'+aa.substring(0,aa.indexOf('|'))+'">'+aa.substring(0,aa.indexOf('|'))+'</option>'+
'<option value="'+bb.substring(0,bb.indexOf('|'))+'">'+bb.substring(0,bb.indexOf('|'))+'</option>'+
'<option value="'+cc.substring(0,cc.indexOf('|'))+'">'+cc.substring(0,cc.indexOf('|'))+'</option>'+
'<option value="'+dd.substring(0,dd.indexOf('|'))+'">'+dd.substring(0,dd.indexOf('|'))+'</option>'+
'<option value="'+ee.substring(0,ee.indexOf('|'))+'">'+ee.substring(0,ee.indexOf('|'))+'</option>'+
'</select>'+
'</td></tr></table>';


		}
		else
		{
			newButton.innerHTML = defaultDropDown;
		}

	}
	else
	{
			newButton.innerHTML = defaultDropDown;
	}	


}



/////////////////////////////////////////////////////////	
	



saveYourLineup.parentNode.insertBefore(newButton, saveYourLineup.nextSibling);

//If user clicks button
document.addEventListener('click', function(event) {

		

	if (event.target.getAttribute('value') == "Save to slot"){


		disp_prompt();
		
	}


		if (thisURLIndex == 1){	


		switch(event.target.innerHTML)
		{
			

			case aa.substring(0,aa.indexOf('|')):
					
				if(aa != ''){

				GM_setValue("save_lineups_vsleft_slot1", '');
				GM_setValue("save_lineups_vsleft_slot2", '');
				GM_setValue("save_lineups_vsleft_slot3", '');

				location.href = thisURL;

				}

			break;

			case bb.substring(0,bb.indexOf('|')):

				if(bb != ''){

				GM_setValue("save_lineups_vsleft_slot1b", '');
				GM_setValue("save_lineups_vsleft_slot2b", '');
				GM_setValue("save_lineups_vsleft_slot3b", '');

				location.href = thisURL;

				}

			break;	

			case cc.substring(0,cc.indexOf('|')):

				if(cc != ''){

				GM_setValue("save_lineups_vsleft_slot1c", '');
				GM_setValue("save_lineups_vsleft_slot2c", '');
				GM_setValue("save_lineups_vsleft_slot3c", '');


				}

			break;	

			case dd.substring(0,dd.indexOf('|')):

				if(dd != ''){

				GM_setValue("save_lineups_vsleft_slot1d", '');
				GM_setValue("save_lineups_vsleft_slot2d", '');
				GM_setValue("save_lineups_vsleft_slot3d", '');

				location.href = thisURL;

				}

			break;	

			case ee.substring(0,aa.indexOf('|')):

				if(ee != ''){

				GM_setValue("save_lineups_vsleft_slot1e", '');
				GM_setValue("save_lineups_vsleft_slot2e", '');
				GM_setValue("save_lineups_vsleft_slot3e", '');

				location.href = thisURL;

				}

			break;			


		}

		}
		else if (thisURLIndex == 2){

		switch(event.target.innerHTML)
		{
			

			case aa.substring(0,aa.indexOf('|')):
					
				if(aa != ''){

				GM_setValue("save_lineups_vsright_slot1", '');
				GM_setValue("save_lineups_vsright_slot2", '');
				GM_setValue("save_lineups_vsright_slot3", '');

				location.href = thisURL;

				}

			break;

			case bb.substring(0,bb.indexOf('|')):

				if(bb != ''){

				GM_setValue("save_lineups_vsright_slot1b", '');
				GM_setValue("save_lineups_vsright_slot2b", '');
				GM_setValue("save_lineups_vsright_slot3b", '');

				location.href = thisURL;

				}

			break;	

			case cc.substring(0,cc.indexOf('|')):

				if(cc != ''){

				GM_setValue("save_lineups_vsright_slot1c", '');
				GM_setValue("save_lineups_vsright_slot2c", '');
				GM_setValue("save_lineups_vsright_slot3c", '');


				}

			break;	

			case dd.substring(0,dd.indexOf('|')):

				if(dd != ''){

				GM_setValue("save_lineups_vsright_slot1d", '');
				GM_setValue("save_lineups_vsright_slot2d", '');
				GM_setValue("save_lineups_vsright_slot3d", '');

				location.href = thisURL;

				}

			break;	

			case ee.substring(0,aa.indexOf('|')):

				if(ee != ''){

				GM_setValue("save_lineups_vsright_slot1e", '');
				GM_setValue("save_lineups_vsright_slot2e", '');
				GM_setValue("save_lineups_vsright_slot3e", '');

				location.href = thisURL;

				}

			break;			


		}
			


		}	


	switch(event.target.innerHTML)
		{

			case "------":

				whichSlot = 0;
				var saveToSlots = document.getElementsByTagName('input');

				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					if (saveToSlot.getAttribute('value')){

						var matchSTS = saveToSlot.getAttribute('value').match('Save to slot');
						if(matchSTS)
							saveToSlot.setAttribute('disabled','disabled');
			
					}

				}				

			break;

			case "Slot 1":

				whichSlot = 1;

var saveToSlots = document.getElementsByTagName('input');

for (var i = 0; i < saveToSlots.length; i++) {
	var saveToSlot=saveToSlots[i];
	if (saveToSlot.getAttribute('value')){

		var matchSTS = saveToSlot.getAttribute('value').match('Save to slot');
		if(matchSTS)
			saveToSlot.removeAttribute('disabled');
			
	}

}			

			break;

			case "Slot 2":

				whichSlot = 2;

var saveToSlots = document.getElementsByTagName('input');

for (var i = 0; i < saveToSlots.length; i++) {
	var saveToSlot=saveToSlots[i];
	if (saveToSlot.getAttribute('value')){

		var matchSTS = saveToSlot.getAttribute('value').match('Save to slot');
		if(matchSTS)
			saveToSlot.removeAttribute('disabled');
			
	}

}				

			break;	

			case "Slot 3":

				whichSlot = 3;

var saveToSlots = document.getElementsByTagName('input');

for (var i = 0; i < saveToSlots.length; i++) {
	var saveToSlot=saveToSlots[i];
	if (saveToSlot.getAttribute('value')){

		var matchSTS = saveToSlot.getAttribute('value').match('Save to slot');
		if(matchSTS)
			saveToSlot.removeAttribute('disabled');
			
	}

}				

			break;			
		}
	

	if (event.target.getAttribute('value') == "Load"){


		switch(event.target.getAttribute('name'))
		{
			case "save_lineups_vsleft_slot1":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot1');
				location.href = thisURL;

			break;
			case "save_lineups_vsleft_slot1b":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot1b');
				location.href = thisURL;

			break;
			case "save_lineups_vsleft_slot1c":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot1c');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot1d":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot1d');
				location.href = thisURL;

			break;			
			case "save_lineups_vsleft_slot1e":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot1e');
				location.href = thisURL;

			break;			

			case "save_lineups_vsleft_slot2":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot2');
				location.href = thisURL;
			

			break;	
			case "save_lineups_vsleft_slot2b":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot2b');
				location.href = thisURL;
			

			break;
			case "save_lineups_vsleft_slot2c":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot2c');
				location.href = thisURL;
			

			break;			
			case "save_lineups_vsleft_slot2d":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot2d');
				location.href = thisURL;
			

			break;	
			case "save_lineups_vsleft_slot2e":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot2e');
				location.href = thisURL;
			

			break;			

			case "save_lineups_vsleft_slot3":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot3');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot3b":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot3b');
				location.href = thisURL;

			break;
			case "save_lineups_vsleft_slot3c":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot3c');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot3d":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot3d');
				location.href = thisURL;

			break;			
			case "save_lineups_vsleft_slot3e":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsleft_slot3e');
				location.href = thisURL;

			break;			

			case "save_lineups_vsright_slot1":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot1');
				location.href = thisURL;

			break;
			case "save_lineups_vsright_slot1b":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot1b');
				location.href = thisURL;

			break;
			case "save_lineups_vsright_slot1c":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot1c');
				location.href = thisURL;

			break;
			case "save_lineups_vsright_slot1d":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot1d');
				location.href = thisURL;

			break;			
			case "save_lineups_vsright_slot1e":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot1e');
				location.href = thisURL;

			break;			

			case "save_lineups_vsright_slot2":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot2');
				location.href = thisURL;

			break;	

			case "save_lineups_vsright_slot2b":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot2b');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot2c":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot2c');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot2d":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot2d');
				location.href = thisURL;

			break;			
			case "save_lineups_vsright_slot2e":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot2e');
				location.href = thisURL;

			break;			

			case "save_lineups_vsright_slot3":


				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot3');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot3b":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot3b');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot3c":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot3c');
				location.href = thisURL;

			break;			
			case "save_lineups_vsright_slot3d":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot3d');
				location.href = thisURL;

			break;			
			case "save_lineups_vsright_slot3e":

				GM_setValue("save_lineups_toggle", 'save_lineups_vsright_slot3e');
				location.href = thisURL;

			break;			

		}

	}

	if (event.target.getAttribute('value') == "Delete"){

		switch(event.target.getAttribute('name'))
		{
			case "save_lineups_vsleft_slot1":

				GM_setValue("save_lineups_vsleft_slot1", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;
			case "save_lineups_vsleft_slot1b":

				GM_setValue("save_lineups_vsleft_slot1b", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot1c":


				GM_setValue("save_lineups_vsleft_slot1c", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot1d":

				GM_setValue("save_lineups_vsleft_slot1d", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;			
			case "save_lineups_vsleft_slot1e":

				GM_setValue("save_lineups_vsleft_slot1e", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;			

			case "save_lineups_vsleft_slot2":

				GM_setValue("save_lineups_vsleft_slot2", theTeam2+ '|'+'|');
				location.href = thisURL;
				

			break;
			case "save_lineups_vsleft_slot2b":

				GM_setValue("save_lineups_vsleft_slot2b", theTeam2+ '|'+'|');
				location.href = thisURL;
				

			break;	
			case "save_lineups_vsleft_slot2c":

				GM_setValue("save_lineups_vsleft_slot2c", theTeam2+ '|'+'|');
				location.href = thisURL;
				

			break;	
			case "save_lineups_vsleft_slot2d":

				GM_setValue("save_lineups_vsleft_slot2d", theTeam2+ '|'+'|');
				location.href = thisURL;
				

			break;			
			case "save_lineups_vsleft_slot2e":

				GM_setValue("save_lineups_vsleft_slot2e", theTeam2+ '|'+'|');
				location.href = thisURL;
				

			break;			

			case "save_lineups_vsleft_slot3":

				GM_setValue("save_lineups_vsleft_slot3", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot3b":

				GM_setValue("save_lineups_vsleft_slot3b", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot3c":

				GM_setValue("save_lineups_vsleft_slot3c", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot3d":

				GM_setValue("save_lineups_vsleft_slot3d", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsleft_slot3e":

				GM_setValue("save_lineups_vsleft_slot3e", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;			

			case "save_lineups_vsright_slot1":

				GM_setValue("save_lineups_vsright_slot1", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;
			case "save_lineups_vsright_slot1b":

				GM_setValue("save_lineups_vsright_slot1b", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot1c":

				GM_setValue("save_lineups_vsright_slot1c", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot1d":

				GM_setValue("save_lineups_vsright_slot1d", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot1e":

				GM_setValue("save_lineups_vsright_slot1e", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;			

			case "save_lineups_vsright_slot2":

				GM_setValue("save_lineups_vsright_slot2", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot2b":

				GM_setValue("save_lineups_vsright_slot2b", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot2c":

				GM_setValue("save_lineups_vsright_slot2c", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot2d":

				GM_setValue("save_lineups_vsright_slot2d", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot2e":

				GM_setValue("save_lineups_vsright_slot2e", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;			

			case "save_lineups_vsright_slot3":

				GM_setValue("save_lineups_vsright_slot3", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot3b":

				GM_setValue("save_lineups_vsright_slot3b", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot3c":

				GM_setValue("save_lineups_vsright_slot3c", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot3d":

				GM_setValue("save_lineups_vsright_slot3d", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;	
			case "save_lineups_vsright_slot3e":

				GM_setValue("save_lineups_vsright_slot3e", theTeam2+ '|'+'|');
				location.href = thisURL;

			break;			

		}		


	}

}, true);

savedLinup = '';
 
for (var i = 1; i <4;i++){


	if(i==1){

		if (thisURLIndex == 1){		

			//new//
			var a = GM_getValue("save_lineups_vsleft_slot1",'');

			if(a.indexOf(theTeam2) != -1){	

				if(a.substring(a.indexOf('|')+1,a.lastIndexOf('|'))!=''){		

					if (a != null) savedLinup = a.split("|");
					currentSave = "save_lineups_vsleft_slot1";
				}
				
			}

	
			var b = GM_getValue("save_lineups_vsleft_slot1b",'');

			if(b.indexOf(theTeam2) != -1){	

				if(b.substring(b.indexOf('|')+1,b.lastIndexOf('|'))!=''){		

					if (b != null) savedLinup = b.split("|");
					currentSave = "save_lineups_vsleft_slot1b";
				}

			}

			var c = GM_getValue("save_lineups_vsleft_slot1c",'');

			if(c.indexOf(theTeam2) != -1){	

				if(c.substring(c.indexOf('|')+1,c.lastIndexOf('|'))!=''){				

					if (c != null) savedLinup = c.split("|");
					currentSave = "save_lineups_vsleft_slot1c";

				}

			}

			var d = GM_getValue("save_lineups_vsleft_slot1d",'');

			if(d.indexOf(theTeam2) != -1){	

				if(d.substring(d.indexOf('|')+1,d.lastIndexOf('|'))!=''){		

					if (d != null) savedLinup = d.split("|");
					currentSave = "save_lineups_vsleft_slot1d";

				}

			}
			var e = GM_getValue("save_lineups_vsleft_slot1e",'');

			if(e.indexOf(theTeam2) != -1){	

				if(e.substring(e.indexOf('|')+1,e.lastIndexOf('|'))!=''){		

					if (e != null) savedLinup = e.split("|");
					currentSave = "save_lineups_vsleft_slot1e";

				}

			}			
			//new//
	
			
			if(savedLinup != "" ){
		
			compareSavedCurrentLineups();

			currentSaveName="";

			for (var p = 1; p < 10;p++){

	
				if(initializeSpot[p] != 1){

					currentSaveName = "Slot 1 (default)";	

				}

			}

			for (var p = 1; p < 10;p++){

				initializeSpot[p] = 0;
			}

			if(currentSaveName==""){

				currentSaveName = "Slot 1 (default) (current)";


			}

			}
			
			else{

				currentSaveName = "Slot 1 (default)";

			}			
			//currentSave = "save_lineups_vsleft_slot1";

		}
		else if (thisURLIndex == 2){

			//new//
			var a = GM_getValue("save_lineups_vsright_slot1",'');

			if(a.indexOf(theTeam2) != -1){	

				if(a.substring(a.indexOf('|')+1,a.lastIndexOf('|'))!=''){
					

					if (a != null) savedLinup = a.split("|");
					currentSave = "save_lineups_vsright_slot1";
				}
				

			}

			var b = GM_getValue("save_lineups_vsright_slot1b",'');

			if(b.indexOf(theTeam2) != -1){	

				if(b.substring(b.indexOf('|')+1,b.lastIndexOf('|'))!=''){		

					if (b != null) savedLinup = b.split("|");
					currentSave = "save_lineups_vsright_slot1b";
				}
			}

			var c = GM_getValue("save_lineups_vsright_slot1c",'');

			if(c.indexOf(theTeam2) != -1){	

				if(c.substring(c.indexOf('|')+1,c.lastIndexOf('|'))!=''){		

					if (c != null) savedLinup = c.split("|");
					currentSave = "save_lineups_vsright_slot1c";

				}

			}

			var d = GM_getValue("save_lineups_vsright_slot1d",'');

			if(d.indexOf(theTeam2) != -1){	

				if(d.substring(d.indexOf('|')+1,d.lastIndexOf('|'))!=''){		

					if (d != null) savedLinup = d.split("|");
					currentSave = "save_lineups_vsright_slot1d";

				}

			}
			var e = GM_getValue("save_lineups_vsright_slot1e",'');

			if(e.indexOf(theTeam2) != -1){

				if(e.substring(e.indexOf('|')+1,e.lastIndexOf('|'))!=''){			

					if (e != null) savedLinup = e.split("|");
					currentSave = "save_lineups_vsright_slot1e";

				}

			}			
			//new//

			//GM_log(savedLinup);

			if(savedLinup != "" && savedLinup != undefined){

			compareSavedCurrentLineups();

			currentSaveName="";

			for (var p = 1; p < 10;p++){

				if(initializeSpot[p] != 1){

					currentSaveName = "Slot 1 (default)";
					
				}

			}	

			for (var p = 1; p < 10;p++){

				initializeSpot[p] = 0;
			}			

			if(currentSaveName==""){

				currentSaveName = "Slot 1 (default) (current)";


			}

			}
			else{

				currentSaveName = "Slot 1 (default)";

			}

			//currentSave = "save_lineups_vsright_slot1";
	

		}

	}
	else if(i==2){

		if (thisURLIndex == 1){		

			//new//
			
			var a = GM_getValue("save_lineups_vsleft_slot2",'');
			
			if(a.indexOf(theTeam2) != -1){	

				if(a.substring(a.indexOf('|')+1,a.lastIndexOf('|'))!=''){

					if (a != null) savedLinup = a.split("|");
					currentSave = "save_lineups_vsleft_slot2";
				}
			

			}

			var b = GM_getValue("save_lineups_vsleft_slot2b",'');

			if(b.indexOf(theTeam2) != -1){	

				if(b.substring(b.indexOf('|')+1,b.lastIndexOf('|'))!=''){		

					if (b != null) savedLinup = b.split("|");
					currentSave = "save_lineups_vsleft_slot2b";
	
				}

			}

			var c = GM_getValue("save_lineups_vsleft_slot2c",'');

			if(c.indexOf(theTeam2) != -1){	

				if(c.substring(c.indexOf('|')+1,c.lastIndexOf('|'))!=''){		

					if (c != null) savedLinup = c.split("|");
					currentSave = "save_lineups_vsleft_slot2c";

				}

			}

			var d = GM_getValue("save_lineups_vsleft_slot2d",'');

			if(d.indexOf(theTeam2) != -1){	

				if(d.substring(d.indexOf('|')+1,d.lastIndexOf('|'))!=''){		

					if (d != null) savedLinup = d.split("|");
					currentSave = "save_lineups_vsleft_slot2d";

				}

			}
			var e = GM_getValue("save_lineups_vsleft_slot2e",'');

			if(e.indexOf(theTeam2) != -1){	

				if(e.substring(e.indexOf('|')+1,e.lastIndexOf('|'))!=''){		

					if (e != null) savedLinup = e.split("|");
					currentSave = "save_lineups_vsleft_slot2e";

				}

			}			
			//new//

			

			if(savedLinup != "" && savedLinup != undefined){

			compareSavedCurrentLineups();

			currentSaveName="";

			for (var p = 1; p < 10;p++){

				
				if(initializeSpot[p] != 1){

					currentSaveName = "Slot 2";
					

				}


			}

			for (var p = 1; p < 10;p++){

				initializeSpot[p] = 0;
			}			

			if(currentSaveName==""){

				currentSaveName = "Slot 2 (current)";


			}
			}
			else{

				currentSaveName = "Slot 2";

			}			



			//currentSave = "save_lineups_vsleft_slot2";

		}
		else if (thisURLIndex == 2){

			//new//
			var a = GM_getValue("save_lineups_vsright_slot2",'');

			if(a.indexOf(theTeam2) != -1){	

				if(a.substring(a.indexOf('|')+1,a.lastIndexOf('|'))!=''){
		

					if (a != null) savedLinup = a.split("|");
					currentSave = "save_lineups_vsright_slot2";
				}

			}

			var b = GM_getValue("save_lineups_vsright_slot2b",'');

			if(b.indexOf(theTeam2) != -1){	

				if(b.substring(b.indexOf('|')+1,b.lastIndexOf('|'))!=''){		

					if (b != null) savedLinup = b.split("|");
					currentSave = "save_lineups_vsright_slot2b";

				}
			}

			var c = GM_getValue("save_lineups_vsright_slot2c",'');

			if(c.indexOf(theTeam2) != -1){	

				if(c.substring(c.indexOf('|')+1,c.lastIndexOf('|'))!=''){		

					if (c != null) savedLinup = c.split("|");
					currentSave = "save_lineups_vsright_slot2c";

				}
			}

			var d = GM_getValue("save_lineups_vsright_slot2d",'');

			if(d.indexOf(theTeam2) != -1){	

				if(d.substring(d.indexOf('|')+1,d.lastIndexOf('|'))!=''){		

					if (d != null) savedLinup = d.split("|");
					currentSave = "save_lineups_vsright_slot2d";

				}

			}
			var e = GM_getValue("save_lineups_vsright_slot2e",'');

			if(e.indexOf(theTeam2) != -1){

				if(e.substring(e.indexOf('|')+1,e.lastIndexOf('|'))!=''){			

					if (e != null) savedLinup = e.split("|");
					currentSave = "save_lineups_vsright_slot2e";

				}

			}			
			//new//


			if(savedLinup != "" && savedLinup != undefined){

			compareSavedCurrentLineups();

			currentSaveName="";


			for (var p = 1; p < 10;p++){

	
				if(initializeSpot[p] != 1){

					currentSaveName = "Slot 2";
					
				}

			}

			for (var p = 1; p < 10;p++){

				initializeSpot[p] = 0;
			}			

			if(currentSaveName==""){

				currentSaveName = "Slot 2 (current)";
				

			}

			}
			else{

				currentSaveName = "Slot 2";

			}			
			
			//currentSave = "save_lineups_vsright_slot2";

		}

	}
	else if(i==3){

		if (thisURLIndex == 1){		

			//new//
			var a = GM_getValue("save_lineups_vsleft_slot3",'');

					
			if(a.indexOf(theTeam2) != -1){	

				if(a.substring(a.indexOf('|')+1,a.lastIndexOf('|'))!=''){		

					if (a != null) savedLinup = a.split("|");
					currentSave = "save_lineups_vsleft_slot3";

				}

			}

			var b = GM_getValue("save_lineups_vsleft_slot3b",'');

			if(b.indexOf(theTeam2) != -1){	

				if(b.substring(b.indexOf('|')+1,b.lastIndexOf('|'))!=''){		

					if (b != null) savedLinup = b.split("|");
					currentSave = "save_lineups_vsleft_slot3b";
				}

			}

			var c = GM_getValue("save_lineups_vsleft_slot3c",'');

			if(c.indexOf(theTeam2) != -1){	

				if(c.substring(c.indexOf('|')+1,c.lastIndexOf('|'))!=''){		

					if (c != null) savedLinup = c.split("|");
					currentSave = "save_lineups_vsleft_slot3c";

				}

			}

			var d = GM_getValue("save_lineups_vsleft_slot3d",'');

			if(d.indexOf(theTeam2) != -1){	

				if(d.substring(d.indexOf('|')+1,d.lastIndexOf('|'))!=''){		

					if (d != null) savedLinup = d.split("|");
					currentSave = "save_lineups_vsleft_slot3d";
				}

			}
			var e = GM_getValue("save_lineups_vsleft_slot3e",'');

			if(e.indexOf(theTeam2) != -1){	

				if(e.substring(e.indexOf('|')+1,e.lastIndexOf('|'))!=''){		

					if (e != null) savedLinup = e.split("|");
					currentSave = "save_lineups_vsleft_slot3e";

				}

			}			
			//new//

			
			if(savedLinup != "" && savedLinup != undefined){

				compareSavedCurrentLineups();

				currentSaveName="";

			

				for (var p = 1; p < 10;p++){

					if(initializeSpot[p] != 1){

						currentSaveName = "Slot 3";
						

					}

				}

			for (var p = 1; p < 10;p++){

				initializeSpot[p] = 0;
			}				

			if(currentSaveName==""){

				currentSaveName = "Slot 3 (current)";

			}				

			
			}
			else{

				currentSaveName = "Slot 3";

			}			
			
			//currentSave = "save_lineups_vsleft_slot3";

		}
		else if (thisURLIndex == 2){

			//new//
			var a = GM_getValue("save_lineups_vsright_slot3",'');

			if(a.indexOf(theTeam2) != -1){	

				if(a.substring(a.indexOf('|')+1,a.lastIndexOf('|'))!=''){

						

					if (a != null) savedLinup = a.split("|");
					currentSave = "save_lineups_vsright_slot3";
				}

			}

			var b = GM_getValue("save_lineups_vsright_slot3b",'');

			if(b.indexOf(theTeam2) != -1){			

				if(b.substring(b.indexOf('|')+1,b.lastIndexOf('|'))!=''){

					if (b != null) savedLinup = b.split("|");
					currentSave = "save_lineups_vsright_slot3b";
					
				}


			}

			var c = GM_getValue("save_lineups_vsright_slot3c",'');

			if(c.indexOf(theTeam2) != -1){	

				if(c.substring(c.indexOf('|')+1,c.lastIndexOf('|'))!=''){		

					if (c != null) savedLinup = c.split("|");
					currentSave = "save_lineups_vsright_slot3c";

				}

			}

			var d = GM_getValue("save_lineups_vsright_slot3d",'');

			if(d.indexOf(theTeam2) != -1){	

				if(d.substring(d.indexOf('|')+1,d.lastIndexOf('|'))!=''){		

					if (d != null) savedLinup = d.split("|");
					currentSave = "save_lineups_vsright_slot3d";

				}

			}
			var e = GM_getValue("save_lineups_vsright_slot3e",'');

			if(e.indexOf(theTeam2) != -1){

				if(e.substring(e.indexOf('|')+1,e.lastIndexOf('|'))!=''){			

					if (e != null) savedLinup = e.split("|");
					currentSave = "save_lineups_vsright_slot3e";

				}

			}			
			//new//
	
			
			if(savedLinup != "" && savedLinup != undefined){

			compareSavedCurrentLineups();

			currentSaveName="";

			for (var p = 1; p < 10;p++){

				if(initializeSpot[p] != 1){

					currentSaveName = "Slot 3";
					

				}


			}

			for (var p = 1; p < 10;p++){

				initializeSpot[p] = 0;
			}			

			if(currentSaveName==""){

				currentSaveName = "Slot 3 (current)";

			}	
			}
			else{

				currentSaveName = "Slot 3";

			}			

			//currentSave = "save_lineups_vsright_slot3";

		}

	}	
		
//load saved lineups for display
//var d = GM_getValue("save_lineups");
//if (d != null) savedLinup = d.split("|");
if(savedLinup != "" && savedLinup != undefined){
	
}

if(savedLinup != "" && savedLinup != undefined){


//grab player names
//var lineupNames  = document.evaluate("//script[contains(string(),'function initializeBenchAndDisplayValues()')]",
//document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var lineupNames  = document.evaluate("//script[contains(string(),'display_error')]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var lineupName2;
var lineupName;


for (var p = 0; p < lineupNames.snapshotLength; p++) {

	lineupName2 = lineupNames.snapshotItem(p);
	lineupName += lineupName2.nodeValue;

}

//grab user_ids from stored lineup
var spot1 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(1, ')+18,savedLinup[2].indexOf('initializeSpot(1, ')+24);
spot1 = spot1.substring(0,spot1.indexOf(','));	


var spot1Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot1)+spot1.length+2,savedLinup[2].indexOf(spot1)+spot1.length+4);
spot1Pos = parseFloat(spot1Pos);

convertPositions(spot1Pos);
spot1Pos = parameter2;

if(spot1 == ''){
	
	spot1Pos = '';

}


var spot2 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(2, ')+18,savedLinup[2].indexOf('initializeSpot(2, ')+24);
spot2 = spot2.substring(0,spot2.indexOf(','));

var spot2Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot2)+spot2.length+2,savedLinup[2].indexOf(spot2)+spot2.length+4);
spot2Pos = parseFloat(spot2Pos);

convertPositions(spot2Pos);
spot2Pos = parameter2;

if(spot2 == ''){
	
	spot2Pos = '';

}


var spot3 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(3, ')+18,savedLinup[2].indexOf('initializeSpot(3, ')+24);
spot3 = spot3.substring(0,spot3.indexOf(','));

var spot3Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot3)+spot3.length+2,savedLinup[2].indexOf(spot3)+spot3.length+4);
spot3Pos = parseFloat(spot3Pos);

convertPositions(spot3Pos);
spot3Pos = parameter2;

if(spot3 == ''){
	
	spot3Pos = '';

}

var spot4 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(4, ')+18,savedLinup[2].indexOf('initializeSpot(4, ')+24);
spot4 = spot4.substring(0,spot4.indexOf(','));

var spot4Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot4)+spot4.length+2,savedLinup[2].indexOf(spot4)+spot4.length+4);
spot4Pos = parseFloat(spot4Pos);

convertPositions(spot4Pos);
spot4Pos = parameter2;

if(spot4 == ''){
	
	spot4Pos = '';

}

var spot5 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(5, ')+18,savedLinup[2].indexOf('initializeSpot(5, ')+24);
spot5 = spot5.substring(0,spot5.indexOf(','));

var spot5Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot5)+spot5.length+2,savedLinup[2].indexOf(spot5)+spot5.length+4);
spot5Pos = parseFloat(spot5Pos);

convertPositions(spot5Pos);
spot5Pos = parameter2;

if(spot5 == ''){
	
	spot5Pos = '';

}

var spot6 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(6, ')+18,savedLinup[2].indexOf('initializeSpot(6, ')+24);
spot6 = spot6.substring(0,spot6.indexOf(','));

var spot6Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot6)+spot6.length+2,savedLinup[2].indexOf(spot6)+spot6.length+4);
spot6Pos = parseFloat(spot6Pos);

convertPositions(spot6Pos);
spot6Pos = parameter2;

if(spot6 == ''){
	
	spot6Pos = '';

}

var spot7 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(7, ')+18,savedLinup[2].indexOf('initializeSpot(7, ')+24);
spot7 = spot7.substring(0,spot7.indexOf(','));

var spot7Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot7)+spot7.length+2,savedLinup[2].indexOf(spot7)+spot7.length+4);
spot7Pos = parseFloat(spot7Pos);

convertPositions(spot7Pos);
spot7Pos = parameter2;

if(spot7 == ''){
	
	spot7Pos = '';

}

var spot8 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(8, ')+18,savedLinup[2].indexOf('initializeSpot(8, ')+24);
spot8 = spot8.substring(0,spot8.indexOf(','));

var spot8Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot8)+spot8.length+2,savedLinup[2].indexOf(spot8)+spot8.length+4);
spot8Pos = parseFloat(spot8Pos);

convertPositions(spot8Pos);
spot8Pos = parameter2;

if(spot8 == ''){
	
	spot8Pos = '';

}

var spot9 = savedLinup[2].substring(savedLinup[2].indexOf('initializeSpot(9, ')+18,savedLinup[2].indexOf('initializeSpot(9, ')+24);
spot9 = spot9.substring(0,spot9.indexOf(','));


var spot9Pos = savedLinup[2].substring(savedLinup[2].indexOf(spot9)+spot9.length+2,savedLinup[2].indexOf(spot9)+spot9.length+4);
spot9Pos = parseFloat(spot9Pos);

convertPositions(spot9Pos);
spot9Pos = parameter2;

if(spot9 == ''){
	
	spot9Pos = '';

}


//grab names
if(spot1 == ''){

	var spot1Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot1)==-1){

		var spot1Name = "<b><font color=\"red\">Player not on roster</font></b>";
	
	}
	else
	{

		var spot1Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot1)+19+spot1.length,lineupName.indexOf('display_error_' + spot1)-9);

	
	}
}

if(spot2 == ''){

	var spot2Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot2)==-1){

		var spot2Name = "<b><font color=\"red\">Player not on roster</font></b>";

	}
	else
	{

		var spot2Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot2)+19+spot2.length,lineupName.indexOf('display_error_' + spot2)-9);


	}
}

if(spot3 == ''){

	var spot3Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot3)==-1){

		var spot3Name = "<b><font color=\"red\">Player not on roster</font></b>";

	}
	else
	{

		var spot3Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot3)+19+spot3.length,lineupName.indexOf('display_error_' + spot3)-9);


	}
}

if(spot4 == ''){

	var spot4Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot4)==-1){

		var spot4Name = "<b><font color=\"red\">Player not on roster</font></b>";

	}
	else
	{

		var spot4Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot4)+19+spot4.length,lineupName.indexOf('display_error_' + spot4)-9);


	}
}

if(spot5 == ''){

	var spot5Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot5)==-1){

		var spot5Name = "<b><font color=\"red\">Player not on roster</font></b>";
	}
	else
	{

		var spot5Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot5)+19+spot5.length,lineupName.indexOf('display_error_' + spot5)-9);


	}
}

if(spot6 == ''){

	var spot6Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot6)==-1){

		var spot6Name = "<b><font color=\"red\">Player not on roster</font></b>";
	}
	else
	{

		var spot6Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot6)+19+spot6.length,lineupName.indexOf('display_error_' + spot6)-9);


	}
}

if(spot7 == ''){

	var spot7Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot7)==-1){

		var spot7Name = "<b><font color=\"red\">Player not on roster</font></b>";

	}
	else
	{

		var spot7Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot7)+19+spot7.length,lineupName.indexOf('display_error_' + spot7)-9);


	}
}

if(spot8 == ''){

	var spot8Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot8)==-1){

		var spot8Name = "<b><font color=\"red\">Player not on roster</font></b>";

	}
	else
	{
		var spot8Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot8)+19+spot8.length,lineupName.indexOf('display_error_' + spot8)-9);
	

	}

}

if(spot9 == ''){

	var spot9Name = '';
}
else
{
	if(lineupName.indexOf('display_lineup_' + spot9)==-1){

		var spot9Name = "<b><font color=\"red\">Player not on roster</font></b>";

	}
	else
	{
		var spot9Name = lineupName.substring(lineupName.indexOf('display_lineup_' + spot9)+19+spot9.length,lineupName.indexOf('display_error_' + spot9)-9);

	}
}



//table[@summary='saveTable']
//var lineupLocations  = document.evaluate("//td/input[@value='Save to slot']",
//document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var lineupLocations  = document.evaluate("//table[@summary='saveTable']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



var lineupLocation = lineupLocations.snapshotItem(0);

var myElement = document.createElement("baseballsimulator");


myInnerHTML += '<table class="cleft" cellpadding=5 border="0" width="95%" align="center"><tr><td><table class="datatab_nowidth" border="0" cellpadding=3 cellspacing=1 border=0 align="center">'+
'<tr  class="odd"><td class="tleft" colspan="3" align="left"><b>'+currentSaveName+'</b></td></tr>'+	
'<tr  class="odd"><td class="even text12" colspan="3" align="center"><b>'+savedLinup[1]+'</b></td></tr><tr class="databox_header black"><td><b>#</b></td><td nowrap><b>Name</b></td><td><b>Pos</b></td></tr><TR class="odd"><td class="text10" align="left">'+"1."+'</a></td><td class="text10" nowrap>' + spot1Name + '</td><td>'+spot1Pos+'</td></TR><TR class="even"><td class="text10" align="left">'+"2."+'</a></td><td class="text10" nowrap>' + spot2Name + '</td><td>'+spot2Pos+'</td></TR><TR class="odd"><td class="text10" align="left">'+"3."+'</a></td><td class="text10" nowrap>' + spot3Name + '</td><td>'+spot3Pos+'</td></TR><TR class="even"><td class="text10" align="left">'+"4."+'</a></td><td class="text10" nowrap>' + spot4Name + '</td><td>'+spot4Pos+'</td></TR><TR class="odd"><td class="text10" align="left">'+"5."+'</a></td><td class="text10" nowrap>' + spot5Name + '</td><td>'+spot5Pos+'</td></TR><TR class="even"><td class="text10" align="left">'+"6."+'</a></td><td class="text10" nowrap>' + spot6Name + '</td><td>'+spot6Pos+'</td></TR><TR class="odd"><td class="text10" align="left">'+"7."+'</a></td><td class="text10" nowrap>' + spot7Name + '</td><td>'+spot7Pos+'</td></TR><TR class="even"><td class="text10" align="left">'+"8."+'</a></td><td class="text10" nowrap>' + spot8Name + '</td><td>'+spot8Pos+'</td></TR><TR class="odd"><td class="text10" align="left">'+"9."+'</a></td><td class="text10" nowrap>' + spot9Name + '</td><td>'+spot9Pos+'</td></TR>'+
'<tr class="odd"><td class="text12" colspan="3" align="center">'+
'<table  class="cleft" border="0" cellpadding=3 cellspacing=1 border=0 width="100%" align="center"><tr class="odd"><td class="text10" align="left"><input type="button" align="left" name="'+currentSave+'" value="Load" class="text12"/></td><td  class="text10" align="right"><input type="button" name="'+currentSave+'" value="Delete" class="text12"/></td></tr></table>'+
'</td></tr></table>'+	
'</td><td>';
savedLinup = '';

}//if(savedLinup != ""){
	
}//for (var i = 1; i < 4;i++){

myElement.innerHTML = myInnerHTML;
lineupLocation.parentNode.insertBefore(myElement, lineupLocation.nextSibling);	

}//if(thisURL != "http://fantasygames.sportingnews.com/stratomatic/home_good.html"){
else{
var HIDDEN_DIV_ID = 'baseballsimulatorDiv';
///
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://fantasygames.sportingnews.com/stratomatic/team/lineups.html',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var s = new String(details.responseText);

   var document = appendToDocument(s);
    }
});
///




}



function appendToDocument(html) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }
        div.innerHTML = html;

		var e = GM_getValue("save_lineups_vsleft_slot1");

		if (e != null) savedLinup = e.split("|");
		var savedDefaultLeft = savedLinup[2].split("\n");

		var e = GM_getValue("save_lineups_vsright_slot1");

		if (e != null) savedLinup = e.split("|");
		var savedDefaultRight = savedLinup[2].split("\n");	


var injuryReports  = document.evaluate("//span[contains(string(),'Recently off the Injured List')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var injuryReport = injuryReports.snapshotItem(0);

var benchElement = document.createElement("div");
var benchElementInnerHTML;
benchElementInnerHTML = '<br><table width="95%" align="center"><tr><td class="title" nowrap="nowrap">"Bench" players in current lineups</td></tr></table><table class="datatab_nowidth" width="95%" border="0" cellpadding=0 cellspacing=1 border=0 align="center"><tr class="databox_header black"><td align="center"><b>vs. LHP</b></td><td align="center"><b>vs. RHP</b></td></tr>';
	
/*	
	<TR class="odd"><td class="text10" align="left" width="60%">Potential LHBs in lineup</a></td><td class="text10" align="center">' + 'leftbatterCount2' + '</td></TR><TR class="even"><td class="text10" align="left" width="60%">Potential RHBs in lineup</a></td><td class="text10" align="center">' + 'rightbatterCount2' + '</td></TR><TR class="odd"><td class="text10" align="left">OPS vs L</a></td><td class="text10" align="center">' + 'opsArray2[0]' + '</td></TR><TR class="even"><td class="text10" align="left" width="60%">OPS vs R</a></td><td class="text10" align="center">' + 'opsArray2[1]'  + '</td></TR><TR class="odd"><td class="text10" align="left" width="60%">AVG Hitter balance</a></td><td class="text10" align="center">' + 'balanceMeterAVG2' + '</td></TR></table><br>';
*/

		


	var defaultLineups = document.evaluate("//tr[@class='odd' or @class='even']/td[string-length(string()) < 3][contains(string(),'C') or contains(string(),'1B') or contains(string(),'2B') or contains(string(),'3B') or contains(string(),'SS') or contains(string(),'LF') or contains(string(),'RF') or contains(string(),'DH')]/preceding-sibling::td/a/@href", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var defaultLineupNames = document.evaluate("//tr[@class='odd' or @class='even']/td[string-length(string()) < 3][contains(string(),'C') or contains(string(),'1B') or contains(string(),'2B') or contains(string(),'3B') or contains(string(),'SS') or contains(string(),'LF') or contains(string(),'RF') or contains(string(),'DH')]/preceding-sibling::td/a/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	

	var findPlayer_ID;
	var findPlayer_IDLeft="";
	var findPlayer_IDRight="";
	var findPlayer_IDLocation;
	var isInDefaultLineupFlag = 0;
	var findPlayer_IDLeftArray  = new Array();
	var findPlayer_IDRightArray = new Array();

	//for lineup vs left
	for (var i = 0; i < 9; i++) {
   		var  defaultLineup = defaultLineups.snapshotItem(i);
		
		defaultLineup = defaultLineup.nodeValue;
		findPlayer_ID = defaultLineup.substring(defaultLineup.indexOf('player_id=')+10,defaultLineup.indexOf('&'));

		var  defaultLineupName = defaultLineupNames.snapshotItem(i);
		defaultLineupName = defaultLineupName.nodeValue;

		for (var j = 0; j <  savedDefaultLeft.length; j++){

			findPlayer_IDLocation=savedDefaultLeft[j].indexOf(findPlayer_ID);

			if(findPlayer_IDLocation != -1){

				isInDefaultLineupFlag = 1;


			}

		}

		if (isInDefaultLineupFlag == 0){

			findPlayer_IDLeft += defaultLineupName + "|";
			


		}
		else{

			isInDefaultLineupFlag = 0;

		}
		var findPlayer_IDLeft2 = findPlayer_IDLeft.substring(0,findPlayer_IDLeft.length - 1);

		
	}

	//for lineup vs right
	for (var i = 10; i < 18; i++) {
   		var  defaultLineup = defaultLineups.snapshotItem(i);
		defaultLineup = defaultLineup.nodeValue;
		findPlayer_ID = defaultLineup.substring(defaultLineup.indexOf('player_id=')+10,defaultLineup.indexOf('&'));

		var  defaultLineupName = defaultLineupNames.snapshotItem(i);
		defaultLineupName = defaultLineupName.nodeValue;

		for (var j = 0; j <  savedDefaultRight.length; j++){

			findPlayer_IDLocation=savedDefaultRight[j].indexOf(findPlayer_ID);

			if(findPlayer_IDLocation != -1){

				isInDefaultLineupFlag = 1;


			}

		}

		if (isInDefaultLineupFlag == 0){

			findPlayer_IDRight += defaultLineupName + "|";
			


		}
		else{

			isInDefaultLineupFlag = 0;

		}

		var findPlayer_IDRight2 = findPlayer_IDRight.substring(0,findPlayer_IDRight.length - 1);
			

	}

var maxLength;

findPlayer_IDLeftArray = findPlayer_IDLeft2.split("|");	
findPlayer_IDRightArray = findPlayer_IDRight2.split("|");

if(findPlayer_IDLeftArray.length > findPlayer_IDRightArray.length){

	maxLength = findPlayer_IDLeftArray.length;

}
else if(findPlayer_IDLeftArray.length < findPlayer_IDRightArray.length){

	maxLength = findPlayer_IDRightArray.length;

}
else if(findPlayer_IDLeftArray.length == findPlayer_IDRightArray.length){

	maxLength = findPlayer_IDRightArray.length;

}


for (var k = 0; k <  maxLength; k++){


	if (findPlayer_IDLeftArray[k]==undefined){

		findPlayer_IDLeftArray[k] =  '&nbsp;';

	}

	if (findPlayer_IDRightArray[k]==undefined){

		findPlayer_IDRightArray[k] =  '&nbsp;';

	}

	if (maxLength == 1 && findPlayer_IDLeftArray[k] == '' && findPlayer_IDRightArray[k] ==  ''){

		findPlayer_IDLeftArray[k] =  "none";
		findPlayer_IDRightArray[k] =  "none";			

	}

	if (k%2){

		benchElementInnerHTML += '<TR class="even"><td class="text10" align="center">'+ findPlayer_IDLeftArray[k] +'</td><td class="text10" align="center">' + findPlayer_IDRightArray[k] + '</td></TR>';

	}
	else
	{

		benchElementInnerHTML += '<TR class="odd"><td class="text10" align="center">'+ findPlayer_IDLeftArray[k] +'</td><td class="text10" align="center">' + findPlayer_IDRightArray[k] + '</td></TR>';		

	}




}

benchElement.innerHTML = benchElementInnerHTML;

injuryReport.parentNode.insertBefore(benchElement, injuryReport.descendant);	


        return document;
}


function disp_prompt()
{


	var fname=prompt("Please enter lineup name:");

	if(fname == null)

	{
		return
	}
	else if(fname == "")
	{
		alert("Name is blank.  Please try again");
		return
	}
	else
	{
		fname = fname + "|";
		lineupBackup = theTeam2 + "|" + fname + currentLineup;

		switch(whichSlot)
		{
			case 0:

				alert("Slot is blank.  Please try again");
				return				

			break;

			case 1:

				if (thisURLIndex == 1){

					//new//

					var a = GM_getValue("save_lineups_vsleft_slot1",'');


					if(a.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot1", lineupBackup);
						location.href = thisURL;
					}


					var b = GM_getValue("save_lineups_vsleft_slot1b",'');

					if(b.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot1b", lineupBackup);
						location.href = thisURL;
					}	

					var c = GM_getValue("save_lineups_vsleft_slot1c",'');

					if(c.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot1c", lineupBackup);
						location.href = thisURL;
					}

					var d = GM_getValue("save_lineups_vsleft_slot1d",'');

					if(d.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot1d", lineupBackup);
						location.href = thisURL;
					}					
					
					var e = GM_getValue("save_lineups_vsleft_slot1e",'');

					if(e.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot1e", lineupBackup);
						location.href = thisURL;
					}

					if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

						if(a == ''){

							var a2 = GM_getValue("save_lineups_vsleft_slot2",'');
							var a3 = GM_getValue("save_lineups_vsleft_slot3",'');							

						if(a2==''){

							GM_setValue("save_lineups_vsleft_slot2", theTeam2+ '|'+'|');

						}

						if(a3==''){

							GM_setValue("save_lineups_vsleft_slot3", theTeam2+ '|'+'|');

						}							
							
							GM_setValue("save_lineups_vsleft_slot1", lineupBackup);
							
							location.href = thisURL;

						}else if (b == ''){

							var b2 = GM_getValue("save_lineups_vsleft_slot2b",'');
							var b3 = GM_getValue("save_lineups_vsleft_slot3b",'');

						if(b2==''){

							GM_setValue("save_lineups_vsleft_slot2b", theTeam2+ '|'+'|');

						}

						if(b3==''){

							GM_setValue("save_lineups_vsleft_slot3b", theTeam2+ '|'+'|');

						}							

							GM_setValue("save_lineups_vsleft_slot1b", lineupBackup);
							location.href = thisURL;


						}else if (c == ''){

							/////
							var c2 = GM_getValue("save_lineups_vsleft_slot2c",'');
							var c3 = GM_getValue("save_lineups_vsleft_slot3c",'');

							if(c2==''){

								GM_setValue("save_lineups_vsleft_slot2c", theTeam2+ '|'+'|');

							}

							if(c3==''){

								GM_setValue("save_lineups_vsleft_slot3c", theTeam2+ '|'+'|');

							}
							/////
							

							GM_setValue("save_lineups_vsleft_slot1c", lineupBackup);
							location.href = thisURL;

				
						}else if (d == ''){

							/////
							var d2 = GM_getValue("save_lineups_vsleft_slot2d",'');
							var d3 = GM_getValue("save_lineups_vsleft_slot3d",'');

							if(d2==''){

								GM_setValue("save_lineups_vsleft_slot2d", theTeam2+ '|'+'|');

							}

							if(d3==''){

								GM_setValue("save_lineups_vsleft_slot3d", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot1d", lineupBackup);
							location.href = thisURL;


						}else if (e == ''){

							/////
							var e2 = GM_getValue("save_lineups_vsleft_slot2e",'');
							var e3 = GM_getValue("save_lineups_vsleft_slot3e",'');

							if(e2==''){

								GM_setValue("save_lineups_vsleft_slot2e", theTeam2+ '|'+'|');

							}

							if(e3==''){

								GM_setValue("save_lineups_vsleft_slot3e", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot1e", lineupBackup);
							location.href = thisURL;


						}else		
						{



							//GM_setValue("save_lineups_vsleft_slot1", lineupBackup);
							//location.href = thisURL;
						}


					}
					//new//

				}
				else if (thisURLIndex == 2){

					
					//new//

					var a = GM_getValue("save_lineups_vsright_slot1",'');

					if(a.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot1", lineupBackup);
						location.href = thisURL;
					}


					var b = GM_getValue("save_lineups_vsright_slot1b",'');

					if(b.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot1b", lineupBackup);
						location.href = thisURL;
					}	

					var c = GM_getValue("save_lineups_vsright_slot1c",'');

					if(c.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot1c", lineupBackup);
						location.href = thisURL;
					}

					var d = GM_getValue("save_lineups_vsright_slot1d",'');

					if(d.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot1d", lineupBackup);
						location.href = thisURL;
					}					
					
					var e = GM_getValue("save_lineups_vsright_slot1e",'');

					if(e.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot1e", lineupBackup);
						location.href = thisURL;
					}

					if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

						if(a == ''){

							/////
							var a2 = GM_getValue("save_lineups_vsright_slot2",'');
							var a3 = GM_getValue("save_lineups_vsright_slot3",'');

							if(a2==''){

								GM_setValue("save_lineups_vsright_slot2", theTeam2+ '|'+'|');

							}

							if(a3==''){

								GM_setValue("save_lineups_vsright_slot3", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot1", lineupBackup);
							location.href = thisURL;

						}else if (b == ''){

							/////
							var b2 = GM_getValue("save_lineups_vsright_slot2b",'');
							var b3 = GM_getValue("save_lineups_vsright_slot3b",'');

							if(b2==''){

								GM_setValue("save_lineups_vsright_slot2b", theTeam2+ '|'+'|');

							}

							if(b3==''){

								GM_setValue("save_lineups_vsright_slot3b", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot1b", lineupBackup);
							location.href = thisURL;


						}else if (c == ''){

							/////
							var c2 = GM_getValue("save_lineups_vsright_slot2c",'');
							var c3 = GM_getValue("save_lineups_vsright_slot3c",'');

							if(c2==''){

								GM_setValue("save_lineups_vsright_slot2c", theTeam2+ '|'+'|');

							}

							if(c3==''){

								GM_setValue("save_lineups_vsright_slot3c", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot1c", lineupBackup);
							location.href = thisURL;

				
						}else if (d == ''){

							/////
							var d2 = GM_getValue("save_lineups_vsright_slot2d",'');
							var d3 = GM_getValue("save_lineups_vsright_slot3d",'');

							if(d2==''){

								GM_setValue("save_lineups_vsright_slot2d", theTeam2+ '|'+'|');

							}

							if(d3==''){

								GM_setValue("save_lineups_vsright_slot3d", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot1d", lineupBackup);
							location.href = thisURL;


						}else if (e == ''){

							/////
							var e2 = GM_getValue("save_lineups_vsright_slot2e",'');
							var e3 = GM_getValue("save_lineups_vsright_slot3e",'');

							if(e2==''){

								GM_setValue("save_lineups_vsright_slot2e", theTeam2+ '|'+'|');

							}

							if(e3==''){

								GM_setValue("save_lineups_vsright_slot3e", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot1e", lineupBackup);
							location.href = thisURL;


						}else		
						{

							//GM_setValue("save_lineups_vsright_slot1", lineupBackup);
							//location.href = thisURL;
						}


					}
					//new//
					

				}				

			break;

			case 2:

				if (thisURLIndex == 1){

					//new//

					var a = GM_getValue("save_lineups_vsleft_slot2",'');

					if(a.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot2", lineupBackup);
						location.href = thisURL;
					}


					var b = GM_getValue("save_lineups_vsleft_slot2b",'');

					if(b.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot2b", lineupBackup);
						location.href = thisURL;
					}	

					var c = GM_getValue("save_lineups_vsleft_slot2c",'');

					if(c.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot2c", lineupBackup);
						location.href = thisURL;
					}

					var d = GM_getValue("save_lineups_vsleft_slot2d",'');

					if(d.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot2d", lineupBackup);
						location.href = thisURL;
					}					
					
					var e = GM_getValue("save_lineups_vsleft_slot2e",'');

					if(e.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot2e", lineupBackup);
						location.href = thisURL;
					}

					if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

						if(a == ''){

							/////
							var a1 = GM_getValue("save_lineups_vsleft_slot1",'');
							var a3 = GM_getValue("save_lineups_vsleft_slot3",'');

							if(a1==''){

								GM_setValue("save_lineups_vsleft_slot1", theTeam2+ '|'+'|');

							}

							if(a3==''){

								GM_setValue("save_lineups_vsleft_slot3", theTeam2+ '|'+'|');

							}
							/////							


							GM_setValue("save_lineups_vsleft_slot2", lineupBackup);
							location.href = thisURL;

						}else if (b == ''){

							/////
							var b1 = GM_getValue("save_lineups_vsleft_slot1b",'');
							var b3 = GM_getValue("save_lineups_vsleft_slot3b",'');

							if(b1==''){

								GM_setValue("save_lineups_vsleft_slot1b", theTeam2+ '|'+'|');

							}

							if(b3==''){

								GM_setValue("save_lineups_vsleft_slot3b", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot2b", lineupBackup);
							location.href = thisURL;


						}else if (c == ''){

							/////
							var c1 = GM_getValue("save_lineups_vsleft_slot1c",'');
							var c3 = GM_getValue("save_lineups_vsleft_slot3c",'');

							if(c1==''){

								GM_setValue("save_lineups_vsleft_slot1c", theTeam2+ '|'+'|');

							}

							if(c3==''){

								GM_setValue("save_lineups_vsleft_slot3c", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot2c", lineupBackup);
							location.href = thisURL;

				
						}else if (d == ''){

							/////
							var d1 = GM_getValue("save_lineups_vsleft_slot1d",'');
							var d3 = GM_getValue("save_lineups_vsleft_slot3d",'');

							if(d1==''){

								GM_setValue("save_lineups_vsleft_slot1d", theTeam2+ '|'+'|');

							}

							if(d3==''){

								GM_setValue("save_lineups_vsleft_slot3d", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot2d", lineupBackup);
							location.href = thisURL;


						}else if (e == ''){

							/////
							var e1 = GM_getValue("save_lineups_vsleft_slot1e",'');
							var e3 = GM_getValue("save_lineups_vsleft_slot3e",'');

							if(e1==''){

								GM_setValue("save_lineups_vsleft_slot1e", theTeam2+ '|'+'|');

							}

							if(e3==''){

								GM_setValue("save_lineups_vsleft_slot3e", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot2e", lineupBackup);
							location.href = thisURL;


						}else		
						{

							GM_setValue("save_lineups_vsleft_slot2", lineupBackup);
							location.href = thisURL;
						}


					}
					//new//


				}
				else if (thisURLIndex == 2){

					//new//

					var a = GM_getValue("save_lineups_vsright_slot2",'');

					if(a.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot2", lineupBackup);
						location.href = thisURL;
					}


					var b = GM_getValue("save_lineups_vsright_slot2b",'');

					if(b.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot2b", lineupBackup);
						location.href = thisURL;
					}	

					var c = GM_getValue("save_lineups_vsright_slot2c",'');

					if(c.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot2c", lineupBackup);
						location.href = thisURL;
					}

					var d = GM_getValue("save_lineups_vsright_slot2d",'');

					if(d.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot2d", lineupBackup);
						location.href = thisURL;
					}					
					
					var e = GM_getValue("save_lineups_vsright_slot2e",'');

					if(e.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot2e", lineupBackup);
						location.href = thisURL;
					}

					if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

						if(a == ''){

							/////
							var a1 = GM_getValue("save_lineups_vsright_slot1",'');
							var a3 = GM_getValue("save_lineups_vsright_slot3",'');



							if(a1==''){

								GM_setValue("save_lineups_vsright_slot1", theTeam2+ '|'+'|');

							}

							if(a3==''){

								GM_setValue("save_lineups_vsright_slot3", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot2", lineupBackup);
							location.href = thisURL;

						}else if (b == ''){

							/////
							var b1 = GM_getValue("save_lineups_vsright_slot1b",'');
							var b3 = GM_getValue("save_lineups_vsright_slot3b",'');

							if(b1==''){

								GM_setValue("save_lineups_vsright_slot1b", theTeam2+ '|'+'|');

							}

							if(b3==''){

								GM_setValue("save_lineups_vsright_slot3b", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot2b", lineupBackup);
							location.href = thisURL;


						}else if (c == ''){

							/////
							var c1 = GM_getValue("save_lineups_vsright_slot1c",'');
							var c3 = GM_getValue("save_lineups_vsright_slot3c",'');

							if(c1==''){

								GM_setValue("save_lineups_vsright_slot1c", theTeam2+ '|'+'|');

							}

							if(c3==''){

								GM_setValue("save_lineups_vsright_slot3c", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot2c", lineupBackup);
							location.href = thisURL;

				
						}else if (d == ''){

							/////
							var d1 = GM_getValue("save_lineups_vsright_slot1d",'');
							var d3 = GM_getValue("save_lineups_vsright_slot3d",'');

							if(d1==''){

								GM_setValue("save_lineups_vsright_slot1d", theTeam2+ '|'+'|');

							}

							if(d3==''){

								GM_setValue("save_lineups_vsright_slot3d", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot2d", lineupBackup);
							location.href = thisURL;


						}else if (e == ''){

							/////
							var e1 = GM_getValue("save_lineups_vsright_slot1e",'');
							var e3 = GM_getValue("save_lineups_vsright_slot3e",'');

							if(e1==''){

								GM_setValue("save_lineups_vsright_slot1e", theTeam2+ '|'+'|');

							}

							if(e3==''){

								GM_setValue("save_lineups_vsright_slot3e", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot2e", lineupBackup);
							location.href = thisURL;


						}else		
						{

							//GM_setValue("save_lineups_vsright_slot2", lineupBackup);
							//location.href = thisURL;
						}


					}
					//new//

									

				}

			break;

			case 3:

				if (thisURLIndex == 1){

					//new//

					var a = GM_getValue("save_lineups_vsleft_slot3",'');

					if(a.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot3", lineupBackup);
						location.href = thisURL;
					}


					var b = GM_getValue("save_lineups_vsleft_slot3b",'');

					if(b.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot3b", lineupBackup);
						location.href = thisURL;
					}	

					var c = GM_getValue("save_lineups_vsleft_slot3c",'');

					if(c.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot3c", lineupBackup);
						location.href = thisURL;
					}

					var d = GM_getValue("save_lineups_vsleft_slot3d",'');

					if(d.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot3d", lineupBackup);
						location.href = thisURL;
					}					
					
					var e = GM_getValue("save_lineups_vsleft_slot3e",'');

					if(e.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsleft_slot3e", lineupBackup);
						location.href = thisURL;
					}

					if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

						if(a == ''){

							/////
							var a1 = GM_getValue("save_lineups_vsleft_slot1",'');
							var a2 = GM_getValue("save_lineups_vsleft_slot2",'');

							if(a1==''){

								GM_setValue("save_lineups_vsleft_slot1", theTeam2+ '|'+'|');

							}

							if(a2==''){

								GM_setValue("save_lineups_vsleft_slot2", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot3", lineupBackup);
							location.href = thisURL;

						}else if (b == ''){

							/////
							var b1 = GM_getValue("save_lineups_vsleft_slot1b",'');
							var b2 = GM_getValue("save_lineups_vsleft_slot2b",'');

							if(b1==''){

								GM_setValue("save_lineups_vsleft_slot1b", theTeam2+ '|'+'|');

							}

							if(b2==''){

								GM_setValue("save_lineups_vsleft_slot2b", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot3b", lineupBackup);
							location.href = thisURL;


						}else if (c == ''){

							/////
							var c1 = GM_getValue("save_lineups_vsleft_slot1c",'');
							var c2 = GM_getValue("save_lineups_vsleft_slot2c",'');

							if(c1==''){

								GM_setValue("save_lineups_vsleft_slot1c", theTeam2+ '|'+'|');

							}

							if(c2==''){

								GM_setValue("save_lineups_vsleft_slot2c", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot3c", lineupBackup);
							location.href = thisURL;

				
						}else if (d == ''){

							/////
							var d1 = GM_getValue("save_lineups_vsleft_slot1d",'');
							var d2 = GM_getValue("save_lineups_vsleft_slot2d",'');

							if(d1==''){

								GM_setValue("save_lineups_vsleft_slot1d", theTeam2+ '|'+'|');

							}

							if(d2==''){

								GM_setValue("save_lineups_vsleft_slot2d", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot3d", lineupBackup);
							location.href = thisURL;


						}else if (e == ''){

							/////
							var e1 = GM_getValue("save_lineups_vsleft_slot1e",'');
							var e2 = GM_getValue("save_lineups_vsleft_slot2e",'');

							if(e1==''){

								GM_setValue("save_lineups_vsleft_slot1e", theTeam2+ '|'+'|');

							}

							if(e2==''){

								GM_setValue("save_lineups_vsleft_slot2e", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsleft_slot3e", lineupBackup);
							location.href = thisURL;


						}else		
						{

							//GM_setValue("save_lineups_vsleft_slot3", lineupBackup);
							//location.href = thisURL;
						}


					}
					
					//new//


				}
				else if (thisURLIndex == 2){

					//new//

					var a = GM_getValue("save_lineups_vsright_slot3",'');

					if(a.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot3", lineupBackup);
						location.href = thisURL;
					}


					var b = GM_getValue("save_lineups_vsright_slot3b",'');

					if(b.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot3b", lineupBackup);
						location.href = thisURL;
					}	

					var c = GM_getValue("save_lineups_vsright_slot3c",'');

					if(c.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot3c", lineupBackup);
						location.href = thisURL;
					}

					var d = GM_getValue("save_lineups_vsright_slot3d",'');

					if(d.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot3d", lineupBackup);
						location.href = thisURL;
					}					
					
					var e = GM_getValue("save_lineups_vsright_slot3e",'');

					if(e.indexOf(theTeam2) != -1){
					
						GM_setValue("save_lineups_vsright_slot3e", lineupBackup);
						location.href = thisURL;
					}

					if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

						if(a == ''){

							/////
							var a1 = GM_getValue("save_lineups_vsright_slot1",'');
							var a2 = GM_getValue("save_lineups_vsright_slot2",'');

							if(a1==''){

								GM_setValue("save_lineups_vsright_slot1", theTeam2+ '|'+'|');

							}

							if(a2==''){

								GM_setValue("save_lineups_vsright_slot2", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot3", lineupBackup);
							location.href = thisURL;

						}else if (b == ''){

							/////
							var b1 = GM_getValue("save_lineups_vsright_slot1b",'');
							var b2 = GM_getValue("save_lineups_vsright_slot2b",'');

							if(b1==''){

								GM_setValue("save_lineups_vsright_slot1b", theTeam2+ '|'+'|');

							}

							if(b2==''){

								GM_setValue("save_lineups_vsright_slot2b", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot3b", lineupBackup);
							location.href = thisURL;


						}else if (c == ''){

							/////
							var c1 = GM_getValue("save_lineups_vsright_slot1c",'');
							var c2 = GM_getValue("save_lineups_vsright_slot2c",'');

							if(c1==''){

								GM_setValue("save_lineups_vsright_slot1c", theTeam2+ '|'+'|');

							}

							if(c2==''){

								GM_setValue("save_lineups_vsright_slot2c", theTeam2+ '|'+'|');

							}
							/////

							GM_setValue("save_lineups_vsright_slot3c", lineupBackup);
							location.href = thisURL;

				
						}else if (d == ''){

							/////
							var d1 = GM_getValue("save_lineups_vsright_slot1d",'');
							var d2 = GM_getValue("save_lineups_vsright_slot2d",'');

							if(d1==''){

								GM_setValue("save_lineups_vsright_slot1d", theTeam2+ '|'+'|');

							}

							if(d2==''){

								GM_setValue("save_lineups_vsright_slot2d", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot3d", lineupBackup);
							location.href = thisURL;


						}else if (e == ''){

							/////
							var e1 = GM_getValue("save_lineups_vsright_slot1e",'');
							var e2 = GM_getValue("save_lineups_vsright_slot2e",'');

							if(e1==''){

								GM_setValue("save_lineups_vsright_slot1e", theTeam2+ '|'+'|');

							}

							if(e2==''){

								GM_setValue("save_lineups_vsright_slot2e", theTeam2+ '|'+'|');

							}
							/////							

							GM_setValue("save_lineups_vsright_slot3e", lineupBackup);
							location.href = thisURL;


						}else		
						{

							//GM_setValue("save_lineups_vsright_slot3", lineupBackup);
							//location.href = thisURL;
						}


					}
					//new//
					

				}

			break;			

		}

		
	}



}

function convertPositions(parameter1){

switch(parameter1)
	{
		case 2:
			parameter2 = "C";
		break;	

		case 3:
			parameter2 = "1B";
		break;

		case 4:
			parameter2 = "2B";
		break;

		case 5:
			parameter2 = "3B";
		break;

		case 6:
			parameter2 = "SS";
		break;

		case 7:
			parameter2 = "LF";
			
		break;

		case 8:
			parameter2 = "CF";
		break;

		case 9:
			parameter2 = "RF";
		break;

		case 10:
			parameter2 = "DH";
		break;		

	}

}

function compareSavedCurrentLineups(){
///function?

			savedLinupSplit = savedLinup[2].split(";");
			
			currentLineupSplit = currentLineup.split(";");
			

			for (var n = 0; n < savedLinupSplit.length;n++){

				if(savedLinupSplit[n].indexOf("initializeSpot(1,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(1,") != -1){


							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[1] = 1;

							}
							else{

								initializeSpot[1] = 0;

							}

			

						}

					}

				}

				if(savedLinupSplit[n].indexOf("initializeSpot(2,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(2,") != -1){

							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[2] = 1;

							}
							else{

								initializeSpot[2] = 0;

							}

						}

					}

				}

				if(savedLinupSplit[n].indexOf("initializeSpot(3,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(3,") != -1){

							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[3] = 1;

							}
							else{

								initializeSpot[3] = 0;

							}

						}

					}

				}

				if(savedLinupSplit[n].indexOf("initializeSpot(4,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(4,") != -1){

							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[4] = 1;

							}
							else{

								initializeSpot[4] = 0;

							}

						}

					}

				}

				if(savedLinupSplit[n].indexOf("initializeSpot(5,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(5,") != -1){

							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[5] = 1;

							}
							else{

								initializeSpot[5] = 0;

							}

						}

					}

				}

				if(savedLinupSplit[n].indexOf("initializeSpot(6,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(6,") != -1){

							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[6] = 1;

							}
							else{

								initializeSpot[6] = 0;

							}

						}

					}

				}

				if(savedLinupSplit[n].indexOf("initializeSpot(7,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(7,") != -1){

							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[7] = 1;

							}
							else{

								initializeSpot[7] = 0;

							}

						}

					}

				}

				if(savedLinupSplit[n].indexOf("initializeSpot(8,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(8,") != -1){

							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[8] = 1;

							}
							else{

								initializeSpot[8] = 0;

							}

						}

					}

				}

				if(savedLinupSplit[n].indexOf("initializeSpot(9,") != -1){

					for (var o = 0; o < currentLineupSplit.length;o++){

						if(currentLineupSplit[o].indexOf("initializeSpot(9,") != -1){

							if(currentLineupSplit[o].trim() == savedLinupSplit[n].trim()){

								initializeSpot[9] = 1;

							}
							else{

								initializeSpot[9] = 0;

							}

						}

					}

				}				

			}//for (var n = 0; n < savedLinupSplit.length;n++){
			///


}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}


