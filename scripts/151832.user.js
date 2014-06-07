// Version 1.2
// ==UserScript==
// @name           VUSAF Mission Automated Report Form (MARF)
// @namespace      http://userscripts.org
// @description    Prefills/selects information on the VUSAF Mission Report Form.
// @include        http://www.vusaf.org/admin/pirep.php*
// ==/UserScript==

//====================================================================================

var Callsign             = "A7214"; 
var MajorCommand         = "Air Combat Command";
var Commander            = "Jon Clausen";
var Aircraft             = "F-16";
var AircraftTailNumber   = "96085";

var PermanentDutyStation = "Shaw AFB"; 
var TemporaryDutyStation = "";

var Origin               = "KSSC";
var Destination          = "KSSC";

var MissionProfile       = "Currency";

var OpsEvent             = "Red Flag Alaska";


//====================================================================================




function match(input, regexp) {
	return ((input.name && input.name.match(regexp)) ||
            (input.id && input.id.match(regexp)));
}


function getComments()
{

	var s01 = "CALLSIGN: " + Callsign + "\n<br /><br />\n\n";
	var s02 = "PACKAGE/MISSION NUMBER: \n<br /><br />\n\n";
	var s03 = "MISSION TYPE: \n<br /><br />\n\n";
	var s04 = "FUEL AT T/O:\n<br /><br />\n\n";
	var s05 = "FUEL AT ARRIVAL:\n<br /><br />\n\n";
	var s06 = "T/O TIME:\n<br /><br />\n\n";
	var s07 = "ARRIVAL TIME:\n<br /><br />\n\n";
	var s08 = "T/O R/W:\n<br /><br />\n\n";
	var s09 = "LANDING R/W:\n<br /><br />\n\n";
	var s10 = "DEPARTURE USED:  \n<br /><br />\n\n";
	var s11 = "LOADOUT:  \n<br /><br />\n\n";
	var s12 = "ORDINANCE USED/ACCURACY:  \n<br /><br />\n\n";
	var s13 = "MISSION OUTCOME:  \n<br /><br />\n\n";
	var s14 = "VATAWARE/ACMI LINK:  \n<br /><br />\n\n";
	var s15 = "ADDITIONAL INFO:  \n<br /><br />\n\n";
	var s16 = "LESSONS LEARNED:  \n<br /><br />\n\n";

	var sall = s01 + s02 + s03 + s04 + s05+ s06 + s07 + s08 + s09
	sall = sall + s10 + s11 + s12 + s13 + s14 + s15 + s16;

	
	
	
	return sall;
}


function init(arg)
{

	if(localStorage.getItem("MARF_INIT")){
		Callsign = localStorage.getItem("MARF_Callsign");
		MajorCommand = localStorage.getItem("MARF_MajorCommand");
		Commander = localStorage.getItem("MARF_Commander");
		Aircraft = localStorage.getItem("MARF_Aircraft");
		AircraftTailNumber = localStorage.getItem("MARF_AircraftTailNumber");
		PermanentDutyStation = localStorage.getItem("MARF_PermanentDutyStation");
		TemporaryDutyStation = localStorage.getItem("MARF_TemporaryDutyStation");
		Origin = localStorage.getItem("MARF_Origin");
		Destination = localStorage.getItem("MARF_Destination");
		MissionProfile = localStorage.getItem("MARF_MissionProfile");
		OpsEvent = localStorage.getItem("MARF_OpsEvent");
	}else{
		arg = "config";
	}


	if(arg=="config"){

		
		//localStorage.clear();
		localStorage.removeItem("MARF_INIT"); 
		
		var str = prompt("VUSAF CALLSIGN\n(e.g., A7214)","");
		localStorage.setItem("MARF_Callsign", str);
		Callsign = str;

		var str=prompt("MAJOR COMMAND\n(e.g., Air Combat Command)","");
		localStorage.setItem("MARF_MajorCommand", str);
		MajorCommand = str;

		var str=prompt("COMMANDER\n(e.g., Jon Clausen)","");
		localStorage.setItem("MARF_Commander", str);
		Commander = str;	

		var str=prompt("AIRCRAFT\n(e.g., F-16)","");
		localStorage.setItem("MARF_Aircraft", str);
		Aircraft = str;		

		var str=prompt("AIRCRAFT TAIL NUMBER\n","");
		localStorage.setItem("MARF_AircraftTailNumber", str);
		AircraftTailNumber = str;

		var str=prompt("PERMANENT DUTY STATION\n(e.g., Shaw AFB)","");
		localStorage.setItem("MARF_PermanentDutyStation", str);
		PermanentDutyStation = str;	

		var str=prompt("TEMPORARY DUTY STATION\n(e.g., RKSO)","");
		localStorage.setItem("MARF_TemporaryDutyStation", str);
		TemporaryDutyStation = str;		

		var str=prompt("DEPARTURE POINT\n(e.g., KSSC)","");
		localStorage.setItem("MARF_Origin", str);
		Origin = str;			

		var str=prompt("ARRIVAL POINT\n(e.g., KSSC)","");
		localStorage.setItem("MARF_Destination", str);
		Destination = str;				

		var str=prompt("MISSION PROFILE\n(e.g., Currency)","");
		localStorage.setItem("MARF_MissionProfile", str);
		MissionProfile = str;					

		var str=prompt("Event or Operation\n(e.g., Key Resolve)","");
		localStorage.setItem("MARF_OpsEvent", str);
		Operation = str;							
		
		var dT = new Date();
		localStorage.setItem("MARF_INIT", dT);
		
		init();
	

	}

			



}


function selectedIndexer(selobj, pattern_text)
{

	for (var i=0; i < selobj.length; i++){

		var txt = selobj.options[i].text;

		var pattern = new RegExp(pattern_text,"i");

		if(txt.match(pattern)){
			return i;
		}
	}

}


function makeSelection(select)
{

	if (match(select,/Perm_Duty_Station/)) {
		var idx = selectedIndexer(select,PermanentDutyStation);	
		select.selectedIndex=idx;
	}

	if (match(select,/Majcom/)) {
		var idx = selectedIndexer(select,MajorCommand);	
		select.selectedIndex=idx;
	}	

	if (match(select,/Commander/)) {
		var idx = selectedIndexer(select,Commander);
		select.selectedIndex=idx;
	}

	if (match(select,/Aircraft_used/)) {
		var idx = selectedIndexer(select,Aircraft);
		select.selectedIndex=idx;
	}

	if (match(select,/Mission_profile/)) {
		var idx = selectedIndexer(select,MissionProfile);
		select.selectedIndex=idx;
	}

	if (match(select,/operation/)) {
		var idx = selectedIndexer(select,OpsEvent);
		select.selectedIndex=idx;
	}	


	var dT = new Date();
	if (match(select,/BD_day/))   select.selectedIndex=dT.getUTCDate()-1;
	if (match(select,/BD_month/)) select.selectedIndex=dT.getUTCMonth();
	if (match(select,/BD_hour/))  select.selectedIndex=dT.getUTCHours();
	if (match(select,/BD_min/))   select.selectedIndex=dT.getUTCMinutes();

	if (match(select,/ED_day/))   select.selectedIndex=dT.getUTCDate()-1;
	if (match(select,/ED_month/)) select.selectedIndex=dT.getUTCMonth();	
	if (match(select,/ED_hour/))  select.selectedIndex=dT.getUTCHours();
	if (match(select,/ED_min/))   select.selectedIndex=dT.getUTCMinutes();	

		
		
}
	

function fillTextBox(input)
{

	if (match(input,/Aircraft_tail/))
		input.value=AircraftTailNumber;
		
	else if (match(input,/Dep_point/))
		input.value=Origin;
		
	else if (match(input,/Arrival_point/))
		input.value=Destination;
		
	else if (match(input,/Tdy_remote/)){
         	input.value=TemporaryDutyStation;
         	
         }
				
}	

function fillField(input)
{
	if (input.type=="hidden")
		return;
		
	else if (input.type=="text")
		fillTextBox(input);

	else if (input.type && input.type.match(/select/))
		makeSelection(input);

	else if (input.type=="textarea")
		input.defaultValue = getComments();


//	else if (input.type=="checkbox")
//		input.checked=true;
		
	else if (input.type=="radio")
		input.checked=true;		


}


if (!document.forms.length)
	return;

var f=document.forms[0];
for (var i=1; i<document.forms.length; i++){
	if (document.forms[i].elements.length>f.elements.length)
		f=document.forms[i];
}
		
//if (f.elements.length<7)
//	return;

var div=document.createElement("div");
if(localStorage.getItem("MARF_INIT")){
	div.appendChild(document.createTextNode("Mission Automated Report Form (Ctrl-Shift-Z to re-configure)"));
}else{
	div.appendChild(document.createTextNode("Mission Automated Report Form (Ctrl-Shift-Z to setup)"));
}
f.parentNode.insertBefore(div, f);


function start() {

	init();
	
	for (var i=0; i<f.elements.length; i++){
		fillField(f.elements[i]);
	}
}

function keyPressed(e) {
   if( e.ctrlKey && e.shiftKey && e.keyCode == 90 )
        init("config");
}

window.addEventListener('keydown', keyPressed, false);

start();

