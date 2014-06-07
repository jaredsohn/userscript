// ==UserScript==
// @name			pCARS leaderboard filtering
// @namespace		ceth
// @version			alpha 5a
// @author			madcat
// @include			http://cars-stats.wmdportal.com/index.php/leaderboard*
// ==/UserScript==



/** GLOBAL VARIABLES **/

var leaderboard, pager_top, datas, leaderboardRows, filterRadios, radioLabels, filterCheckboxes, checkboxesLabels; 
var filteringIsActive = false;
var radioSettingsVisible = true;
var checkboxSettingsVisible = true;



// TIMES, GAPS, ASSISTS, FILTER ARRAYS

var allPlayersTimes = new Array;
var allPlayersGaps = new Array;
var allPlayersAssists = new Array;
var allPlayersSettings = new Array;
var assistsFilter = new Array;
var gameSettingsFilter = new Array;
var assistsFilterBackup = new Array;
var gameSettingsFilterBackup = new Array;



// HTMLS

var firstLineLabelsHTML = "";
var firstLineSettingsHTML = "";
var secondLineLabelsHTML = "";
var secondLineSettingsHTML = "";

var setupDefaultImageHTML = "";
var setupCustomImageHTML = "";

var wheelImageHTML = "";
var padImageHTML = "";
var keyboardImageHTML = "";

var internalCamImageHTML = "";
var externalCamImageHTML = "";

var AllHTML = "";
var PleaseChooseHTML = "";
var SetupHTML = "";
var ControllerHTML = "";
var CameraHTML = "";



// INPUTS

var steerYes, steerNo, steerBoth, brakeYes, brakeNo, brakeBoth, ABS_Yes, ABS_No, ABS_Both, TC_Yes, TC_No, TC_Both, SC_Yes, SC_No, SC_Both, noDamageYes, noDamageNo, noDamageBoth, gearYes, gearNo, gearBoth, clutchYes, clutchNo, clutchBoth, lineYes, lineNo, lineBoth, setupDefault, setupCustom, controlWheel, controlPad, controlKeyboard, cameraIn, cameraOut;

var setupFilterIs = "";
var controlFilterIs = "";
var cameraFilterIs = "";



// LABELS

var steerAssistLabel, brakeAssistLabel, ABS_label, TC_label, SC_label, damageLabel, gearLabel, clutchLabel, lineLabel, setupLabel, controllerLabel, cameraLabel;




/** FUNCTIONS **/

// CONTROL PANEL HTMLs
function defineControlPanelInnerHTML() {

// CONTROL PANEL

firstLineLabelsHTML = '<table id="firstLineLabels"; style="text-align: center; font-weight: bold;"> <tr style="background: black; color: lightgreen; "> <td style="width: 100px; color: pink; ">Steer assist</td> <td style="width: 100px; color: pink; ">Brake assist</td> <td style="width: 100px; color: pink; ">ABS</td> <td style="width: 100px; color: pink; ">TC</td> <td style="width: 100px; color: pink; ">SC</td> <td style="width: 100px; color: pink; ">No damage</td> <td style="width: 100px; color: pink; ">Auto gear</td> <td style="width: 100px; color: pink; ">Auto clutch</td> <td style="width: 100px; color: pink; ">Driving line</td> </tr> </table>';

firstLineSettingsHTML = '<table id="firstLineSettings"; style="text-align: center; font-weight: bold;"> <tr style="color: grey; background: black;"> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="Steer" value="steerYes">On<br> <INPUT type=radio name="Steer" value="steerNo">Off<br> <INPUT type=radio name="Steer" value="steerBoth">Indif. </p> </td style="width: 100px;"> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="Brake" value="brakeYes">On<br> <INPUT type=radio name="Brake" value="brakeNo">Off<br> <INPUT type=radio name="Brake" value="brakeBoth">Indif. </p> </td> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="ABS" value="ABS_Yes">On<br> <INPUT type=radio name="ABS" value="ABS_No">Off<br> <INPUT type=radio name="ABS" value="ABS_Both">Indif. </p> </td> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="TC" value="TC_Yes">On<br> <INPUT type=radio name="TC" value="TC_No">Off<br> <INPUT type=radio name="TC" value="TC_Both">Indif. </p> </td> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="SC" value="SC_Yes">On<br> <INPUT type=radio name="SC" value="SC_No">Off<br> <INPUT type=radio name="SC" value="SC_Both">Indif. </p> </td> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="noDamage" value="noDamageYes">On<br> <INPUT type=radio name="noDamage" value="noDamageNo">Off<br> <INPUT type=radio name="noDamage" value="noDamageBoth">Indif. </p> </td> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="gear" value="gearYes">On<br> <INPUT type=radio name="gear" value="gearNo">Off<br> <INPUT type=radio name="gear" value="gearBoth">Indif. </p> </td> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="clutch" value="clutchYes">On<br> <INPUT type=radio name="clutch" value="clutchNo">Off<br> <INPUT type=radio name="clutch" value="clutchBoth">Indif. </p> </td> <td style="width: 100px;"> <p style="text-align: left; margin-left: 20px;"> <INPUT type=radio name="line" value="lineYes">On<br> <INPUT type=radio name="line" value="lineNo">Off<br> <INPUT type=radio name="line" value="lineBoth">Indif. </p> </td> </tr> </table>';

secondLineLabelsHTML = '<table id="secondLineLabels"; style="text-align: left; font-weight: bold; margin-top: -3px;"> <tr style="background: black; color: wheat; height: 23px;"> <td style="width: 278px"><span style = "margin-left: 120px">Setup:</span> <span style="color: pink";>All</span></td> <td style="width: 278px">Controller: <span style="color: pink";>Selection</span></td> <td style="width: 278px">Camera: <span style="color: pink";>All</span></td> </tr> </table>';

secondLineSettingsHTML = '<table id="secondLineSettings"; style="text-align: center; font-weight: bold; width: 834px;"> <tr style="background: black; color: grey; "> <td style="width: 347px"> <p style="text-align: left; margin-left: 135px; margin-top: 10px; margin-bottom: 10px"> <INPUT type=checkbox name="setup" value="setupDefault" checked=true> Default<br> <INPUT type=checkbox name="setup" value="setupCustom" checked=true> Custom </p> </td> <td style="width: 347px"> <p style="text-align: left; margin-left: 123px; margin-top: 10px; margin-bottom: 10px"> <INPUT type=checkbox name="controller" value="controllerWheel" checked=true> Wheel<br> <INPUT type=checkbox name="controller" value="controllerPad" checked=true>  Gamepad<br> <INPUT type=checkbox name="controller" value="controllerKeyboard" checked=true> Keyboard </p> </td> <td style="width: 347px"> <p style="text-align: left; margin-left: 131px;"> <INPUT type=checkbox name="camera" value="cameraInternal" checked=true> In-car<br> <INPUT type=checkbox name="camera" value="cameraExternal" checked=true> External </p> </td> </tr> </table>';



// SETUP IMAGES

setupDefaultImageHTML = '<img class="stat_flag setup setup_default" alt="Setup: Default" title="Setup: Default" src="http://cars-stats.wmdportal.com/skin/default/img/stat/setup/default.png" style="position: relative; top: 2px;">';

setupCustomImageHTML = '<img class="stat_flag setup setup_custom" alt="Setup: Custom" title="Setup: Custom" src="http://cars-stats.wmdportal.com/skin/default/img/stat/setup/custom.png" style="position: relative; top: 2px;">';



// CONTROLLER IMAGES

wheelImageHTML = '<img class="stat_flag controlelr controller_wheel" alt="Controller: Wheel" title="Controller: Wheel" src="http://cars-stats.wmdportal.com/skin/default/img/stat/controller/wheel.png" style="position: relative; top: 2px;">';

padImageHTML = '<img class="stat_flag controller controller_gamepad" alt="Controller: Gamepad" title="Controller: Gamepad" src="http://cars-stats.wmdportal.com/skin/default/img/stat/controller/gamepad.png" style="position: relative; top: 2px;">';

keyboardImageHTML = '<img class="stat_flag controller controller_keyboard" alt="Controller: Keyboard" title="Controller: Keyboard" src="http://cars-stats.wmdportal.com/skin/default/img/stat/controller/keyboard.png" style="position: relative; top: 2px;">'; 



// CAMERA IMAGES

internalCamImageHTML = '<img class="stat_flag camera camera_internal" alt="Camera: In-car" title="Camera: In-car" src="http://cars-stats.wmdportal.com/skin/default/img/stat/camera/internal.png" style="position: relative; top: 2px;">';

externalCamImageHTML = '<img class="stat_flag camera camera_external" alt="Camera: External" title="Camera: External" src="http://cars-stats.wmdportal.com/skin/default/img/stat/camera/external.png" style="position: relative; top: 2px;">';


// LABELS

SetupHTML = '<span style = "margin-left: 141px">Setup: </span>';
ControllerHTML = '<span style = "margin-left: 128px">Controller: </span>';
CameraHTML = '<span style = "margin-left: 135px">Camera: </span>';

AllHTML = '<span style="color: lightblue";>All</span>';
PleaseChooseHTML = '<span style="color: pink";>Please choose</span>';


}


// BUILD AND ADD CONTROL PANEL TO THE PAGE
function buildAndAddControlPanel() {

	// Panel

	leaderboard = document.getElementById('leaderboard');
	pager_top = document.getElementsByClassName('leaderboard_container')[0].getElementsByTagName('p')[0];
	datas = leaderboard.getElementsByTagName('tbody')[0];
	leaderboardRows = leaderboard.getElementsByTagName('TR');

	tableLine1 = document.createElement('DIV');
	tableLine2 = document.createElement('DIV');
	tableLine3 = document.createElement('DIV');
	tableLine4 = document.createElement('DIV');
	
	tableLine1.innerHTML = firstLineLabelsHTML;
	tableLine2.innerHTML = firstLineSettingsHTML;
	tableLine3.innerHTML = secondLineLabelsHTML;
	tableLine4.innerHTML = secondLineSettingsHTML;
	
	pager_top.appendChild(tableLine1);
	pager_top.appendChild(tableLine2);
	pager_top.appendChild(tableLine3);
	pager_top.appendChild(tableLine4);

	filterRadios = document.getElementById('firstLineSettings').getElementsByTagName('INPUT');
	radioLabels = document.getElementById('firstLineLabels').getElementsByTagName('td');
	
	filterCheckboxes = document.getElementById('secondLineSettings').getElementsByTagName('INPUT');
	checkboxesLabels = document.getElementById('secondLineLabels').getElementsByTagName('td');
	
	(GM_getValue('firstLineVisible', null) == null) ? (GM_setValue('firstLineVisible', true)) : (radioSettingsVisible = GM_getValue('firstLineVisible', null));
	(GM_getValue('secondLineVisible', null) == null) ? (GM_setValue('secondLineVisible', true)) : (checkboxSettingsVisible = GM_getValue('secondLineVisible', null));
	
	(radioSettingsVisible) ? (document.getElementById('firstLineSettings').style.display = "block") : (document.getElementById('firstLineSettings').style.display = "none");
	
	(checkboxSettingsVisible) ? (document.getElementById('secondLineSettings').style.display = "block") : (document.getElementById('secondLineSettings').style.display = "none");
	
	// Buttons
	
	filterButton = document.createElement('INPUT');
	filterButton.type = 'button';
	filterButton.value = 'FILTER NOW';
	filterButton.style.color = "red";

	disableFilteringButton = document.createElement('INPUT');
	disableFilteringButton.type = 'button';
	disableFilteringButton.value = 'DISABLE FILTERING';

	setFilterToDefaultButton = document.createElement('INPUT');
	setFilterToDefaultButton.type = 'button';
	setFilterToDefaultButton.value = 'SET FILTER TO DEFAULT';
	setFilterToDefaultButton.style.marginLeft = 20 + 'px';

	saveFilterButton = document.createElement('INPUT');
	saveFilterButton.type = 'button';
	saveFilterButton.style.width = 180 + 'px';
	saveFilterButton.value = 'SAVE FILTER SETTINGS';
	saveFilterButton.disabled = true;

	pager_top.appendChild(filterButton);
	pager_top.appendChild(disableFilteringButton);
	pager_top.appendChild(setFilterToDefaultButton);
	pager_top.appendChild(saveFilterButton);

	filterButton.addEventListener("click", filter, false);
	disableFilteringButton.addEventListener("click", disableFilter, false);
	setFilterToDefaultButton.addEventListener("click", setFilterToDefault, false);
	saveFilterButton.addEventListener("click", saveFilterSettings, false);
}


// SET VARIABLES POINTING AT RADIO BUTTONS VALUES
function defineInputs() {

	steerYes = filterRadios[0];
	steerNo = filterRadios[1];
	steerBoth = filterRadios[2];

	brakeYes = filterRadios[3];
	brakeNo = filterRadios[4];
	brakeBoth = filterRadios[5];

	ABS_Yes = filterRadios[6];
	ABS_No = filterRadios[7];
	ABS_Both = filterRadios[8];

	TC_Yes = filterRadios[9];
	TC_No = filterRadios[10];
	TC_Both = filterRadios[11];

	SC_Yes = filterRadios[12];
	SC_No = filterRadios[13];
	SC_Both = filterRadios[14];

	noDamageYes = filterRadios[15];
	noDamageNo = filterRadios[16];
	noDamageBoth = filterRadios[17];

	gearYes = filterRadios[18];
	gearNo = filterRadios[19];
	gearBoth = filterRadios[20];

	clutchYes = filterRadios[21];
	clutchNo = filterRadios[22];
	clutchBoth = filterRadios[23];
	
	lineYes = filterRadios[24];
	lineNo = filterRadios[25];
	lineBoth = filterRadios[26];

	
	setupDefault = filterCheckboxes[0];
	setupCustom = filterCheckboxes[1];

	controlWheel = filterCheckboxes[2];
	controlPad = filterCheckboxes[3];
	controlKeyboard = filterCheckboxes[4];

	cameraIn = filterCheckboxes[5];
	cameraOut = filterCheckboxes[6];
}


// SET VARIABLES POINTING AT FILTER LABELS HTML
function defineLabels() {
	steerAssistLabel = radioLabels[0];
	brakeAssistLabel = radioLabels[1];
	ABS_label = radioLabels[2];
	TC_label = radioLabels[3];
	SC_label = radioLabels[4];
	damageLabel = radioLabels[5];
	gearLabel = radioLabels[6];
	clutchLabel = radioLabels[7];
	lineLabel =  radioLabels[8];
	
	setupLabel = checkboxesLabels[0];
	controllerLabel = checkboxesLabels[1];
	cameraLabel = checkboxesLabels[2];
}


// SET FILTER TO DEFAULT VALUES
function setFilterToDefault() {

	assistsFilter = ['both','both','both','both','both','both','both','both','both'];
	gameSettingsFilter = [true,true,true,true,true,true,true];
	
	loadSavedSettings();
	backupFilterSettings();
	setRadiosToDefault();
	
	setupDefault.checked = gameSettingsFilter[0];
	setupCustom.checked = gameSettingsFilter[1];
	controlWheel.checked = gameSettingsFilter[2];
	controlPad.checked = gameSettingsFilter[3];
	controlKeyboard.checked = gameSettingsFilter[4];
	cameraIn.checked = gameSettingsFilter[5];
	cameraOut.checked = gameSettingsFilter[6];
	
	setSetupLabel();
	setControllerLabel();
	setCameraLabel();
}


// ACTIONS WHEN CLICKING ON RADIO BUTTONS
function radioEvents(event) {

	switch(event) {
	
		case 'steerYes':
		steerAssistLabel.style.color = 'lightgreen';
		assistsFilter[0] = true;
		break;
		
		case 'steerNo':
		steerAssistLabel.style.color = 'pink';
		assistsFilter[0] = false;
		break;	
		
		case 'steerBoth':
		steerAssistLabel.style.color = 'lightblue';
		assistsFilter[0] = "both";
		break;
		
		
		
		case 'brakeYes':
		brakeAssistLabel.style.color = 'lightgreen';
		assistsFilter[1] = true;
		break;
		
		case 'brakeNo':
		brakeAssistLabel.style.color = 'pink';
		assistsFilter[1] = false;
		break;	
		
		case 'brakeBoth':
		brakeAssistLabel.style.color = 'lightblue';
		assistsFilter[1] = "both";
		break;
		
		
		
		case 'ABS_Yes':
		ABS_label.style.color = 'lightgreen';
		assistsFilter[2] = true;
		break;
		
		case 'ABS_No':
		ABS_label.style.color = 'pink';
		assistsFilter[2] = false;
		break;	
		
		case 'ABS_Both':
		ABS_label.style.color = 'lightblue';
		assistsFilter[2] = "both";
		break;		
		
		
		
		case 'TC_Yes':
		TC_label.style.color = 'lightgreen';
		assistsFilter[3] = true;
		break;
		
		case 'TC_No':
		TC_label.style.color = 'pink';
		assistsFilter[3] = false;
		break;
		
		case 'TC_Both':
		TC_label.style.color = 'lightblue';
		assistsFilter[3] = "both";
		break;		
		
		
		
		case 'SC_Yes':
		SC_label.style.color = 'lightgreen';
		assistsFilter[4] = true;
		break;
		
		case 'SC_No':
		SC_label.style.color = 'pink';
		assistsFilter[4] = false;
		break;	
		
		case 'SC_Both':
		SC_label.style.color = 'lightblue';
		assistsFilter[4] = "both";
		break;		
		
		
		
		case 'noDamageYes':
		damageLabel.style.color = 'lightgreen';
		assistsFilter[5] = true;
		break;
		
		case 'noDamageNo':
		damageLabel.style.color = 'pink';
		assistsFilter[5] = false;
		break;	
		
		case 'noDamageBoth':
		damageLabel.style.color = 'lightblue';
		assistsFilter[5] = "both";
		break;	
		
		
		
		case 'gearYes':
		gearLabel.style.color = 'lightgreen';
		assistsFilter[6] = true;
		break;
		
		case 'gearNo':
		gearLabel.style.color = 'pink';
		assistsFilter[6] = false;
		break;	
		
		case 'gearBoth':
		gearLabel.style.color = 'lightblue';
		assistsFilter[6] = "both";
		break;	
		
		
		
		case 'clutchYes':
		clutchLabel.style.color = 'lightgreen';
		assistsFilter[7] = true;
		break;
		
		case 'clutchNo':
		clutchLabel.style.color = 'pink';
		assistsFilter[7] = false;
		break;	
		
		case 'clutchBoth':
		clutchLabel.style.color = 'lightblue';
		assistsFilter[7] = "both";
		break;

		
		
		case 'lineYes':
		lineLabel.style.color = 'lightgreen';
		assistsFilter[8] = true;
		break;
		
		case 'lineNo':
		lineLabel.style.color = 'pink';
		assistsFilter[8] = false;
		break;	
		
		case 'lineBoth':
		lineLabel.style.color = 'lightblue';
		assistsFilter[8] = "both";
		break;	

		
		
		default:
		alert('error in event switch');
		break;
	}
	
	checkIfcurrentFilterMatchSave();
}


// ACTIONS WHEN CLICKING ON CHECKBOXES
function checkBoxesEvents(event) {

	switch(event) {
	
		case 'setupDefault':
		(gameSettingsFilter[0]) ? (gameSettingsFilter[0] = false) : (gameSettingsFilter[0] = true);
		setSetupLabel();
		break;
		
		
		case 'setupCustom':
		(gameSettingsFilter[1]) ? (gameSettingsFilter[1] = false) : (gameSettingsFilter[1] = true);
		setSetupLabel();
		break;	
		
		
		case 'controlWheel':
		(gameSettingsFilter[2]) ? (gameSettingsFilter[2] = false):(gameSettingsFilter[2] = true);
		setControllerLabel();
		break;
		
		
		case 'controlPad':
		(gameSettingsFilter[3]) ? (gameSettingsFilter[3] = false):(gameSettingsFilter[3] = true);
		setControllerLabel();
		break;
		
		
		case 'controlKeyboard':
		(gameSettingsFilter[4]) ? (gameSettingsFilter[4] = false):(gameSettingsFilter[4] = true);
		setControllerLabel();
		break;	
		
		
		case 'cameraInternal':
		(gameSettingsFilter[5]) ? (gameSettingsFilter[5] = false) : (gameSettingsFilter[5] = true);
		setCameraLabel();
		break;
		
		
		case 'cameraExternal':
		(gameSettingsFilter[6]) ? (gameSettingsFilter[6] = false) : (gameSettingsFilter[6] = true);
		setCameraLabel();
		break;
		
		
		default:
		alert('error in checkbox event switch');
		break;
	}
	
	checkIfcurrentFilterMatchSave();
}


// SET SETUP LABEL ICONS (or set it to "All")
function setSetupLabel() {

	if ((gameSettingsFilter[0] && gameSettingsFilter[1]) | (!gameSettingsFilter[0] && !gameSettingsFilter[1])) {
		(gameSettingsFilter[0] && gameSettingsFilter[1]) ? (setupLabel.innerHTML = SetupHTML + AllHTML, setupFilterIs = 'All') : null;
		(!gameSettingsFilter[0] && !gameSettingsFilter[1]) ? (setupLabel.innerHTML = SetupHTML + PleaseChooseHTML, setupFilterIs = 'None') : null;
	}
	
	else {
		(gameSettingsFilter[0]) ? (setupLabel.innerHTML = SetupHTML + setupDefaultImageHTML, setupFilterIs = 'D') : (setupLabel.innerHTML = SetupHTML + setupCustomImageHTML, setupFilterIs = 'C');
	}
}


// SET CONTROLLER LABEL ICONS (or set it to "All")
function setControllerLabel() {

	if ((gameSettingsFilter[2] && gameSettingsFilter[3] && gameSettingsFilter[4]) || (!gameSettingsFilter[2] && !gameSettingsFilter[3] && !gameSettingsFilter[4])) 
	{
		(gameSettingsFilter[2] && gameSettingsFilter[3] && gameSettingsFilter[4]) ? (controllerLabel.innerHTML = ControllerHTML + AllHTML, controlFilterIs = 'All') : (controllerLabel.innerHTML = ControllerHTML + PleaseChooseHTML, controlFilterIs = 'None');
	}
		
	else if ((gameSettingsFilter[2] && gameSettingsFilter[3]) || (gameSettingsFilter[3] && gameSettingsFilter[4]) || (gameSettingsFilter[2] && gameSettingsFilter[4]))
	{
		(gameSettingsFilter[2] && gameSettingsFilter[3]) ? (controllerLabel.innerHTML = ControllerHTML + wheelImageHTML + ' ' + padImageHTML, controlFilterIs = 'WP') : (gameSettingsFilter[3] && gameSettingsFilter[4]) ? (controllerLabel.innerHTML = ControllerHTML + padImageHTML + ' ' + keyboardImageHTML, controlFilterIs = 'PK') : (controllerLabel.innerHTML = ControllerHTML + wheelImageHTML + ' ' + keyboardImageHTML, controlFilterIs = 'WK');
	}
		
	else 
	{
		(gameSettingsFilter[2]) ? (controllerLabel.innerHTML = ControllerHTML + wheelImageHTML, controlFilterIs = 'W') : (gameSettingsFilter[3]) ? (controllerLabel.innerHTML = ControllerHTML + padImageHTML, controlFilterIs = 'P') : (controllerLabel.innerHTML = ControllerHTML + keyboardImageHTML, controlFilterIs = 'K');
	}
}


// SET CAMERA LABEL ICONS (or set it to "All")
function setCameraLabel() {

	if ((gameSettingsFilter[5] && gameSettingsFilter[6]) | (!gameSettingsFilter[5] && !gameSettingsFilter[6])) {
		(gameSettingsFilter[5] && gameSettingsFilter[6]) ? (cameraLabel.innerHTML = CameraHTML + AllHTML, cameraFilterIs = 'All') : null;
		(!gameSettingsFilter[5] && !gameSettingsFilter[6]) ? (cameraLabel.innerHTML = CameraHTML + PleaseChooseHTML, cameraFilterIs = 'None') : null;
	}
	
	else {
		(gameSettingsFilter[5]) ? (cameraLabel.innerHTML = CameraHTML + internalCamImageHTML, cameraFilterIs = 'I') : (cameraLabel.innerHTML = CameraHTML + externalCamImageHTML, cameraFilterIs = 'E');
	}

}


// ADD LISTENERS ON RADIO BUTTONS
function addListeners() {

	document.getElementById('firstLineLabels').addEventListener("click", function() {showHideSettings('firstLine')}, false);
	document.getElementById('secondLineLabels').addEventListener("click", function() {showHideSettings('secondLine')}, false);


	steerYes.addEventListener("click", function() {radioEvents(steerYes.value)}, false);
	steerNo.addEventListener("click", function() {radioEvents(steerNo.value)}, false);
	steerBoth.addEventListener("click", function() {radioEvents(steerBoth.value)}, false);

	brakeYes.addEventListener("click", function() {radioEvents(brakeYes.value)}, false);
	brakeNo.addEventListener("click", function() {radioEvents(brakeNo.value)}, false);
	brakeBoth.addEventListener("click", function() {radioEvents(brakeBoth.value)}, false);

	ABS_Yes.addEventListener("click", function() {radioEvents(ABS_Yes.value)}, false);
	ABS_No.addEventListener("click", function() {radioEvents(ABS_No.value)}, false);
	ABS_Both.addEventListener("click", function() {radioEvents(ABS_Both.value)}, false);

	TC_Yes.addEventListener("click", function() {radioEvents(TC_Yes.value)}, false);
	TC_No.addEventListener("click", function() {radioEvents(TC_No.value)}, false);
	TC_Both.addEventListener("click", function() {radioEvents(TC_Both.value)}, false);

	SC_Yes.addEventListener("click", function() {radioEvents(SC_Yes.value)}, false);
	SC_No.addEventListener("click", function() {radioEvents(SC_No.value)}, false);
	SC_Both.addEventListener("click", function() {radioEvents(SC_Both.value)}, false);

	noDamageYes.addEventListener("click", function() {radioEvents(noDamageYes.value)}, false);
	noDamageNo.addEventListener("click", function() {radioEvents(noDamageNo.value)}, false);
	noDamageBoth.addEventListener("click", function() {radioEvents(noDamageBoth.value)}, false);

	gearYes.addEventListener("click", function() {radioEvents(gearYes.value)}, false);
	gearNo.addEventListener("click", function() {radioEvents(gearNo.value)}, false);
	gearBoth.addEventListener("click", function() {radioEvents(gearBoth.value)}, false);

	clutchYes.addEventListener("click", function() {radioEvents(clutchYes.value)}, false);
	clutchNo.addEventListener("click", function() {radioEvents(clutchNo.value)}, false);
	clutchBoth.addEventListener("click", function() {radioEvents(clutchBoth.value)}, false);
	
	lineYes.addEventListener("click", function() {radioEvents(lineYes.value)}, false);
	lineNo.addEventListener("click", function() {radioEvents(lineNo.value)}, false);
	lineBoth.addEventListener("click", function() {radioEvents(lineBoth.value)}, false);
	
	
	setupDefault.addEventListener("click", function() {checkBoxesEvents('setupDefault')}, false);
	setupCustom.addEventListener("click", function() {checkBoxesEvents('setupCustom')}, false);
	
	controlWheel.addEventListener("click", function() {checkBoxesEvents('controlWheel')}, false);
	controlPad.addEventListener("click", function() {checkBoxesEvents('controlPad')}, false);
	controlKeyboard.addEventListener("click", function() {checkBoxesEvents('controlKeyboard')}, false);
		
	cameraIn.addEventListener("click", function() {checkBoxesEvents('cameraInternal')}, false);
	cameraOut.addEventListener("click", function() {checkBoxesEvents('cameraExternal')}, false);
	
}


// REBUILD COLORS FOR 1ST 2ND 2RD AND ALTERNANCE OF GREY AND LIGHT GREY LINES
function rebuildRowColors() {
	
	var j=0;
	
	for (var i=1; i < leaderboardRows.length; i++) {
	
		if (leaderboardRows[i].style.display != "none") {
		
			switch(j) {
			
				case 0: leaderboardRows[i].style.background = "#FFD700"; j++; break;
				
				case 1: leaderboardRows[i].style.background = "#E6E8FA"; j++; break;
				
				case 2: leaderboardRows[i].style.background = "#AD7457"; j++; break;
				
				default:
				
				if (j%2 == 0) {
					leaderboardRows[i].style.background = "#AAAAAA";
					j++;
				}

				else {
					leaderboardRows[i].style.background = "#BBBBBB";
					j++;
				}
			
				break;
			
			}
		}			
	}
}


// FILTER LEADERBOARD
function filter() {
	
	// check if setup type, controller, and view have at least one option checked
	var errorMsg = "";
	
	if (controlFilterIs == 'None' || setupFilterIs == 'None' || cameraFilterIs == 'None') {
		(setupFilterIs == 'None') ? (errorMsg += "Please choose at least a setup type\n") : null;
		(controlFilterIs == 'None') ? (errorMsg += "Please choose at least a controller\n") : null;
		(cameraFilterIs == 'None') ? (errorMsg += "Please choose at least a camera\n") : null;
		
		alert(errorMsg);
		return;
	}
	
	// check if filtering in needed and if collected datas is in correct quantity
	var noFilteringNeeded = false;
	var enoughAllPlayersAssists = false;
	var enoughAllPlayersSettings = false;
	var bothCheckCounter=0;
	
	for (var i=0; i < 9; i++) {
		(assistsFilter[i] == "both") ? (bothCheckCounter++) : null;
	}
	
	// GM_log ('bothCheckCounter = ' + bothCheckCounter); // debug bothCheckCounter
	
	(allPlayersAssists.length == (leaderboardRows.length-1)) ? enoughAllPlayersAssists = true : null;
	(allPlayersSettings.length == (leaderboardRows.length-1)) ?  enoughAllPlayersSettings = true : null;
	(bothCheckCounter == 9 && controlFilterIs == 'All' && setupFilterIs == 'All' && cameraFilterIs == 'All') ? noFilteringNeeded = true : null;
	
	if (!enoughAllPlayersAssists) {
		alert("Error in building players' assist list. No filtering processed");
		return;
	}
	
	if (!enoughAllPlayersSettings) {
		alert("Error in building players' settings list. No filtering processed");
		return;
	}
	
	if (noFilteringNeeded) {
		alert("Filtering with those filter settings won't filter anything.\nPlease change at least one filter option.");
		return;
	}
	
	
	// Process filtering
	
	disableFilter();	
	
	for (var i=1; i < leaderboardRows.length; i++) {
	
		//GM_log("player: " + i); // debug filtering
	
		var passed=0;
		
		if (bothCheckCounter == 9) {
			passed = 9;
			//GM_log('Filter set to "all both". Passed = ' + passed); // debug filtering
		}
		
		else {
			
			//GM_log("\nPlayer: " + i + "\n\n-Steer: " + allPlayersAssists[i-1][0] + " \n-Brake: " + allPlayersAssists[i-1][1] + "\n-ABS: " + allPlayersAssists[i-1][2] + "\n-TC: " + allPlayersAssists[i-1][3] + "\n-SC: " + allPlayersAssists[i-1][4] + "\n-Damage: " + allPlayersAssists[i-1][5] + "\n-Gear: " + allPlayersAssists[i-1][6] + "\n-Clutch: " + allPlayersAssists[i-1][7] + "\n-Line: " + allPlayersAssists[i-1][8] + '\n\nSetup: ' + allPlayersSettings[i-1][0] + '\nController: ' + allPlayersSettings[i-1][1] + '\nCamera: ' + allPlayersSettings[i-1][2]); // debug filtering
			
			for (var j=0; j<9; j++) {
		
				if (allPlayersAssists[i-1][j] == assistsFilter[j] | assistsFilter[j] == "both") {
					passed++;
				}
		
				else {
					break;
				}
			}
		}
		
		//GM_log('controlFilterIs = ' + controlFilterIs + ' | allPlayersSettings[i-1][1] = ' + allPlayersSettings[i-1][1]); // debug filtering
		((setupFilterIs.indexOf(allPlayersSettings[i-1][0]) != -1) | setupFilterIs == 'All') ? passed++ : null;
		((controlFilterIs.indexOf(allPlayersSettings[i-1][1]) != -1) | controlFilterIs == 'All') ? passed++ : null;
		((cameraFilterIs.indexOf(allPlayersSettings[i-1][2]) != -1) | cameraFilterIs == 'All') ? passed++ : null;
	
		if (passed != 12) {
			leaderboardRows[i].style.display = "none";
		}
		
		//GM_log("----------------------------------------------------------"); // debug filtering
	}
	
	rebuildRowColors();
	recalculateGaps();
	filteringIsActive = true;
	recalculateRanks();
}


// DISABLE LEADERBOARD FILTERING
function disableFilter() {

	for (var i=1; i < leaderboardRows.length; i++) {
		leaderboardRows[i].style.display = "table-row";
	}
	rebuildRowColors();
	recalculateGaps();
	
	filteringIsActive = false;
	recalculateRanks();
}


// GET ASSISTS FOR ALL PLAYERS IN LEADERBOARD
function getLeaderboardAssists() {

	allPlayersAssists = [];
	var playerAssists = new Array;
	var playerSettings = new Array;
	var assistCellsInnerHTMLs = new Array;
	

	for (var i=1; i < leaderboardRows.length; i++) {
		rowCells = leaderboardRows[i].getElementsByTagName('TD');
		//get assist innerHTML
		assistCellsInnerHTMLs.push(rowCells[5].innerHTML);
	}
	
	//alert(assistCellsInnerHTMLs[1])
	
	for (var i=0; i < assistCellsInnerHTMLs.length; i++) {
	
		playerAssists = [];
		playerSettings = [];
		
		// Commented code below was for special cases for previous way SMS displaying the "damage disabled" info. 
		// Previous way: no assist players ("-" tag) and clutch-only players ("C" tag) all had damge enabled (-> damage disabled = off)
		// New (current) way: those specific players can now either have damage on or damage off
		// Keep this code in case of a possible future revert from sms
		
		/*
		if (assistCellsInnerHTMLs[i].indexOf('Driving aids: None') != -1) {
		
			playerAssists = [false,false,false,false,false,false,false,false,false];
			allPlayersAssists.push(playerAssists);
		}
		
		else if (assistCellsInnerHTMLs[i].indexOf("clutch_only.png") != -1) {
		
			playerAssists = [false,false,false,false,false,false,false,true,false];
			allPlayersAssists.push(playerAssists);
		}
		*/
		//else {
		
			(assistCellsInnerHTMLs[i].indexOf('Steering assist: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			(assistCellsInnerHTMLs[i].indexOf('Braking assist: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			(assistCellsInnerHTMLs[i].indexOf('ABS: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			(assistCellsInnerHTMLs[i].indexOf('Traction control: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			(assistCellsInnerHTMLs[i].indexOf('Stability control: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			(assistCellsInnerHTMLs[i].indexOf('Damage disabled: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			(assistCellsInnerHTMLs[i].indexOf('Automatic gears: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			(assistCellsInnerHTMLs[i].indexOf('Automatic clutch: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			(assistCellsInnerHTMLs[i].indexOf('Driving line: On') != -1) ? playerAssists.push(true) : playerAssists.push(false);
			allPlayersAssists.push(playerAssists);
		//}
		
		// Setup type
		(assistCellsInnerHTMLs[i].indexOf('default.png') != -1) ? playerSettings.push('D') : (assistCellsInnerHTMLs[i].indexOf('custom.png') != -1) ? playerSettings.push('C') : GM_log("error in building players' setup type list");
			
		// Controller
		(assistCellsInnerHTMLs[i].indexOf('wheel.png') != -1) ? playerSettings.push('W') : (assistCellsInnerHTMLs[i].indexOf('gamepad.png') != -1) ? playerSettings.push('P') : (assistCellsInnerHTMLs[i].indexOf('keyboard.png') != -1) ? playerSettings.push('K') : GM_log("error in building players' controller list");
			
		// Camera
		(assistCellsInnerHTMLs[i].indexOf('internal.png') != -1) ? playerSettings.push('I') : (assistCellsInnerHTMLs[i].indexOf('external.png') != -1) ? playerSettings.push('E') : GM_log("error in building players' view list");
			
		allPlayersSettings.push(playerSettings);
		
		//GM_log('Player[' + (i+1) + '] settings: ' + allPlayersSettings[i][0] + allPlayersSettings[i][1] + allPlayersSettings[i][2]); // debug
		
		/**
		alert("- Player: " + (i+1) + " - Steer: " + playerAssists[0] + " Brake: " + playerAssists[1] + " ABS: " + playerAssists[2] + " TC: " + playerAssists[3] + " SC: " + playerAssists[4] + " Damage: " + playerAssists[5] + " Gear: " + playerAssists[6] + " Clutch: " + playerAssists[7]);
		**/
		
	}
	
	//GM_log('allPlayersAssists: ' + allPlayersAssists.length + ' | allPlayersSettings: ' + allPlayersSettings.length); // debug
}


// TRANSFORM A TIME FROM A MM:SS.mmm FORMAT TO A MILLISECONDS FORMAT
function minSecMilli_to_milli(MinSecMilli) {

	var length = MinSecMilli.length;
	var milli = parseFloat(MinSecMilli.substring(length-3,length));
	var sec = parseFloat(MinSecMilli.substring(length-4,length-6));
	var min = parseFloat(MinSecMilli.substring(0, length-7));
	//alert(min + ":" + sec + "." + milli);
	var time = milli + sec*1000 + min*60000;
	
	return time;
}


// TRANSFORM A TIME FROM A MILLISECONDS FORMAT TO A MM:SS.mmm FORMAT
function milli_to_minSecMilli(timeInMs) {
	
	var min = 0;
	var sec = 0;
	var milli = 0;
	var addedMinFromSec = 0;
	var newGap = "";
	
	milli = (timeInMs/1000 - Math.floor(timeInMs/1000)) * 1000;
	milli = milli.toFixed(3);
	milli = Math.floor(milli);
	timeInMs = timeInMs-milli;
	//alert(timeInMs);
	
	
	if (timeInMs >=60000) {
	
		sec = timeInMs/60000;
	
		if (sec>=1) {
			min = Math.floor(sec);
			sec = (sec - addedMinFromSec)*60;    
		}
	}
	
	else if (timeInMs <60000) {
	
		sec = timeInMs/1000;
	
	}	
	
	if (milli<10) {
		milli = "00" + milli.toString();
	}
	
	else if (milli<100) {
		milli = "0" + milli.toString();
	}
	
	else {
		milli = milli.toString();
	}
	
	(sec<10) ? (sec = "0" + sec.toString()):(sec = sec.toString());
		
	newGap = "+" + min + ":" + sec + "." + milli;
	
	return newGap;
}


// RECALCULATE GAP COLUMN
function recalculateGaps() {
	
	var bestCell = "";
	var best = 0;
	
	for (var i=1; i < leaderboardRows.length; i++) {
		if (leaderboardRows[i].style.display != "none") {
			if (best == 0) {
				bestCell = leaderboardRows[i].getElementsByTagName('TD')[3].innerHTML;
				best = minSecMilli_to_milli(bestCell);
				leaderboardRows[i].getElementsByTagName('TD')[4].innerHTML = '';
				//alert("best: " + best);
			}
			
			else {
				gapCell = leaderboardRows[i].getElementsByTagName('TD')[4];
				timeCell = leaderboardRows[i].getElementsByTagName('TD')[3];
				playerTime = minSecMilli_to_milli(timeCell.innerHTML);
				//alert("playertime (" + playerTime + ") - best (" + best + ") = " + (playerTime-best));			
				//alert(milli_to_minSecMilli((playerTime - best)));
				gapCell.innerHTML = milli_to_minSecMilli((playerTime - best));
			}
		}
	}
}


// RECALCULATE RANK COLUMN
function recalculateRanks() {

	var newRank = 1;
	var rankCell;
	var currentRank = "";
	
	for (var i=1; i < leaderboardRows.length; i++) {
	
		if (leaderboardRows[i].style.display != "none") {
		
			rankCell = leaderboardRows[i].getElementsByTagName('TD')[1];
	
			if (filteringIsActive) {
				currentRank = rankCell.innerHTML;
				var newHTML = "(" + currentRank + ")";
				
				if (newRank<10) {
				
					for (var j=0; j<5; j++) {
						newHTML = newHTML + "&nbsp";
					}
				}
				
				else if (newRank<100) {
				
					for (var j=0; j<3; j++) {
						newHTML = newHTML + "&nbsp";
					}
				}
				
				newHTML = newHTML + newRank.toString();
				rankCell.innerHTML = newHTML;
				newRank++;
			}
			
			else {
				rankCell.innerHTML = i.toString();
			}
		}
	}	
}


// SHOW/HIDE FILTER PANEL SETTINGS
function showHideSettings(caller) {

	if (caller == "firstLine") {
	
		if (radioSettingsVisible) {
			document.getElementById('firstLineSettings').style.display = "none";
			radioSettingsVisible = false;
		}
		
		else {
			document.getElementById('firstLineSettings').style.display = "block";
			radioSettingsVisible = true;
		}
		
		GM_setValue('firstLineVisible', radioSettingsVisible);		
	}
	
	else {
	
		if (checkboxSettingsVisible) {
			document.getElementById('secondLineSettings').style.display = "none";
			checkboxSettingsVisible = false;
		}
		
		else {
			document.getElementById('secondLineSettings').style.display = "block";
			checkboxSettingsVisible = true;
		}
		
		GM_setValue('secondLineVisible', checkboxSettingsVisible);
	}
}


// SAVE FILTER SETTINGS
function saveFilterSettings() {

	var saveString = '';
	var saveAborded = false;
	
	
	// Add assists settings to save string
	for (var i=0; i < assistsFilter.length; i++) {
		switch(assistsFilter[i]) {
			
			case false:
			saveString += '0';
			break;
			
			case true:
			saveString += '1';
			break;
			
			case 'both':
			saveString += 'B';
			break;
				
			default:
			alert('Error, save aborded\n(assistsFilter error)');
			saveAborded = true;
			break;
		}
	}

	
	// Add setup type setting to save string
	if (setupFilterIs.length == 1) {
		saveString += setupFilterIs;	
	}
	
	else {	
		(setupFilterIs == 'All') ? (saveString += 'A') : (setupFilterIs == 'None') ? (saveString += 'N') : (alert('Error, save aborded\n(setupFilterIs error)'), saveAborded = true);
	}
	
	
	// Add controller type setting to save string
	if (controlFilterIs.length == 1) {
		saveString += controlFilterIs;	
	}
	
	else {
	
		switch(controlFilterIs) {
			
			case 'All':
			saveString += 'A';
			break;
			
			case 'None':
			saveString += 'N';
			break;
			
			case 'WP':
			saveString += '1';
			break;
			
			case 'PK':
			saveString += '2';
			break;
			
			case 'WK':
			saveString += '3';
			break;
				
			default:
			alert('Error, save aborded\n(controlFilterIs error)');
			saveAborded = true;
			break;
		}
	}
	
	
	// Add camera setting to save string
	if (cameraFilterIs.length == 1) {
		saveString += cameraFilterIs;	
	}
	
	else {
		(cameraFilterIs == 'All') ? (saveString += 'A') : (cameraFilterIs == 'None') ? (saveString += 'N') : (alert('Error, save aborded\n(cameraFilterIs error)'), saveAborded = true);
	}
	
	// Display error message is setup type or controller or camera doesn't have at least 1 option checked each
	if (!saveAborded) {
	
		var errorMsg = "";
		var temp = saveString.substr(saveString.length-3,3);
		(temp.charAt(0) == 'N') ? ((errorMsg += "Please choose at least a setup type\n"), saveAborded = true) : null;
		(temp.charAt(1) == 'N') ? ((errorMsg += "Please choose at least a controller\n"), saveAborded = true) : null;
		(temp.charAt(2) == 'N') ? (( errorMsg += "Please choose at least a camera\n"), saveAborded = true) : null;
		(saveAborded) ? (alert(errorMsg + "Save aborded")) :  null;
	}
	
	if (!saveAborded) {
		GM_setValue('filterSettings', saveString);
		saveFilterButton.disabled = true;
		backupFilterSettings();		
	}
}


// CONVERT SAVE SETTINGS FROM SAVE STANDARD TO SCRIPT STANDARD AND SET IT TO ASSISTSFILTER AND GAMESETTINGSFILTER VARIABLES
function loadSavedSettings() {

	var savedSetting = GM_getValue('filterSettings', false);
	
	
	if (!savedSetting) {
	
		for (var i=0; i < 9; i++) {
			setAssistLabelColor(i);
		}
		
		return;
	}
	
	for (var i=0; i < savedSetting.length; i++) {
		
		if (i<9) {
		
			switch(savedSetting.charAt(i)) {
				
				case '0':
				assistsFilter[i] = false;
				setAssistLabelColor(i);
				break;
				
				case '1':
				assistsFilter[i] = true;
				setAssistLabelColor(i);
				break;
				
				case 'B':
				assistsFilter[i] = 'both';
				setAssistLabelColor(i);
				break;
				
				default:
				alert('error in loadSavedSettings function (0-9 switch)');
				break;
			}
		}
		
		else if (i == 9) {
	
			switch(savedSetting.charAt(i)) {
			
				case 'A':
				gameSettingsFilter[i-9] = true;
				gameSettingsFilter[i-8] = true;
				break;
				
				case 'N':
				gameSettingsFilter[i-9] = false;
				gameSettingsFilter[i-8] = false;
				break;
				
				case 'D':
				gameSettingsFilter[i-9] = true;
				gameSettingsFilter[i-8] = false;
				break;
				
				case 'C':
				gameSettingsFilter[i-9] = false;
				gameSettingsFilter[i-8] = true;
				break;
				
				default:
				alert('error in loadSavedSettings function (switch i=9)');
				break;
			}
		}
		
		else if (i == 10) {
		
			switch(savedSetting.charAt(i)) {
			
				case 'A':
				gameSettingsFilter[i-8] = true;
				gameSettingsFilter[i-7] = true;
				gameSettingsFilter[i-6] = true;
				break;
				
				case 'N':
				gameSettingsFilter[i-8] = false;
				gameSettingsFilter[i-7] = false;
				gameSettingsFilter[i-6] = false;
				break;
				
				case 'W':
				gameSettingsFilter[i-8] = true;
				gameSettingsFilter[i-7] = false;
				gameSettingsFilter[i-6] = false;
				break;
				
				case 'P':
				gameSettingsFilter[i-8] = false;
				gameSettingsFilter[i-7] = true;
				gameSettingsFilter[i-6] = false;
				break;
				
				case 'K':
				gameSettingsFilter[i-8] = false;
				gameSettingsFilter[i-7] = false;
				gameSettingsFilter[i-6] = true;
				break;
				
				case '1':
				gameSettingsFilter[i-8] = true;
				gameSettingsFilter[i-7] = true;
				gameSettingsFilter[i-6] = false;
				break;
				
				case '2':
				gameSettingsFilter[i-8] = false;
				gameSettingsFilter[i-7] = true;
				gameSettingsFilter[i-6] = true;
				break;
				
				case '3':
				gameSettingsFilter[i-8] = true;
				gameSettingsFilter[i-7] = false;
				gameSettingsFilter[i-6] = true;
				break;
				
				default:
				alert('error in loadSavedSettings function (switch i=10)');
				break;
			}
		}
		
		else if (i == 11) {
		
			switch(savedSetting.charAt(i)) {
			
				case 'A':
				gameSettingsFilter[i-6] = true;
				gameSettingsFilter[i-5] = true;
				break;
				
				case 'N':
				gameSettingsFilter[i-6] = false;
				gameSettingsFilter[i-5] = false;
				break;
			
				case 'I':
				gameSettingsFilter[i-6] = true;
				gameSettingsFilter[i-5] = false;
				break;
				
				case 'E':
				gameSettingsFilter[i-6] = false;
				gameSettingsFilter[i-5] = true;
				break;
				
				default:
				alert('error in loadSavedSettings function (switch i=11)');
				break;
		
			}
		}
		
		else {
			alert('error in loadSavedSettings function (savedSetting.length > expected)');
		}
	}
}


// SET RADIO INPUTS TO DEFAULT (OR SAVED) VALUES
function setRadiosToDefault() {

	for (var i=0; i<9; i++) {
	
		switch(i) {
			
			case 0:
			(assistsFilter[i] == 'both') ? steerBoth.checked = true : (assistsFilter[i]) ? steerYes.checked = true : (!assistsFilter[i]) ? steerNo.checked = true : alert('error in switch setting radios to default (steer)');
			break;
			
			case 1:
			(assistsFilter[i] == 'both') ? brakeBoth.checked = true : (assistsFilter[i]) ? brakeYes.checked = true : (!assistsFilter[i]) ? brakeNo.checked = true : alert('error in switch setting radios to default (brake)');
			break;
			
			case 2:
			(assistsFilter[i] == 'both') ? ABS_Both.checked = true : (assistsFilter[i]) ? ABS_Yes.checked = true : (!assistsFilter[i]) ? ABS_No.checked = true : alert('error in switch setting radios to default (ABS)');
			break;
			
			case 3:
			(assistsFilter[i] == 'both') ? TC_Both.checked = true : (assistsFilter[i]) ? TC_Yes.checked = true : (!assistsFilter[i]) ? TC_No.checked = true : alert('error in switch setting radios to default (TC)');
			break;
			
			case 4:
			(assistsFilter[i] == 'both') ? SC_Both.checked = true : (assistsFilter[i]) ? SC_Yes.checked = true : (!assistsFilter[i]) ? SC_No.checked = true : alert('error in switch setting radios to default (SC)');
			break;
			
			case 5:
			(assistsFilter[i] == 'both') ? noDamageBoth.checked = true : (assistsFilter[i]) ? noDamageYes.checked = true : (!assistsFilter[i]) ? noDamageNo.checked = true : alert('error in switch setting radios to default (NoDamage)');
			break;
			
			case 6:
			(assistsFilter[i] == 'both') ? gearBoth.checked = true : (assistsFilter[i]) ? gearYes.checked = true : (!assistsFilter[i]) ? gearNo.checked = true : alert('error in switch setting radios to default (gear)');
			break;
			
			case 7:
			(assistsFilter[i] == 'both') ? clutchBoth.checked = true : (assistsFilter[i]) ? clutchYes.checked = true : (!assistsFilter[i]) ? clutchNo.checked = true : alert('error in switch setting radios to default (clutch)');
			break;
			
			case 8:
			(assistsFilter[i] == 'both') ? lineBoth.checked = true : (assistsFilter[i]) ? lineYes.checked = true : (!assistsFilter[i]) ? lineNo.checked = true : alert('error in switch setting radios to default (line)');
			break;
			
			default:
			break;
		}
	}
}


// SET ASSIST LABELS COLORS
function setAssistLabelColor(i) {

	switch(i) {
	
		case 0:
		(assistsFilter[i] == true) ? (steerAssistLabel.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (steerAssistLabel.style.color = 'pink') : (assistsFilter[i] == 'both') ? (steerAssistLabel.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
			
		case 1:
		(assistsFilter[i] == true) ? (brakeAssistLabel.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (brakeAssistLabel.style.color = 'pink') : (assistsFilter[i] == 'both') ? (brakeAssistLabel.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
		
		case 2:
		(assistsFilter[i] == true) ? (ABS_label.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (ABS_label.style.color = 'pink') : (assistsFilter[i] == 'both') ? (ABS_label.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
		
		case 3:
		(assistsFilter[i] == true) ? (TC_label.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (TC_label.style.color = 'pink') : (assistsFilter[i] == 'both') ? (TC_label.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
		
		case 4:
		(assistsFilter[i] == true) ? (SC_label.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (SC_label.style.color = 'pink') : (assistsFilter[i] == 'both') ? (SC_label.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
		
		case 5:
		(assistsFilter[i] == true) ? (damageLabel.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (damageLabel.style.color = 'pink') : (assistsFilter[i] == 'both') ? (damageLabel.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
		
		case 6:
		(assistsFilter[i] == true) ? (gearLabel.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (gearLabel.style.color = 'pink') : (assistsFilter[i] == 'both') ? (gearLabel.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
		
		case 7:
		(assistsFilter[i] == true) ? (clutchLabel.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (clutchLabel.style.color = 'pink') : (assistsFilter[i] == 'both') ? (clutchLabel.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
		
		case 8:
		(assistsFilter[i] == true) ? (lineLabel.style.color = 'lightgreen') : (assistsFilter[i] == false) ? (lineLabel.style.color = 'pink') : (assistsFilter[i] == 'both') ? (lineLabel.style.color = 'lightblue') : alert('setAssistLabelColor error (case0)');
		break;
		
		default:
		alert('Error in setAssistLabelColor');
		break;
	}
}


// GREY SAVE BUTTON IF CURRENT SETTINGS MATCH SAVED SETTINGS
function checkIfcurrentFilterMatchSave() {

	for (var i=0; i<9; i++) {
	
		if (assistsFilter[i] != assistsFilterBackup[i]) {
			saveFilterButton.disabled = false;
			return;
		}
	}
	
	for (var i=0; i<7; i++) {
	
		if (gameSettingsFilter[i] != gameSettingsFilterBackup[i]) {
			saveFilterButton.disabled = false;
			return;
		}
	}
	
	saveFilterButton.disabled = true;
}


// BACKUP SAVED SETTINGS
function backupFilterSettings() {
	
	for (var i=0; i < assistsFilter.length; i++) {
		assistsFilterBackup[i] = assistsFilter[i];
	}
	
	for (var i=0; i < gameSettingsFilter.length; i++) {
		gameSettingsFilterBackup[i] = gameSettingsFilter[i];
	}
}


// ADD / MODIFY CSS STYLES
function addStyle() {

	GM_addStyle("#firstLineLabels { text-align: center; font-weight: bold; border-collapse: separate; border: none; }");
	GM_addStyle("#firstLineSettings { display;block; margin-top: -4px; text-align: center; font-weight: bold; border-collapse: separate; border: none; }");
	GM_addStyle("#secondLineLabels { width: 1100px; text-align: center; font-weight: bold; border-collapse: separate; border: none; }");
	GM_addStyle("#secondLineSettings { display;block; width: 1100px !important; margin-top: -4px; text-align: center; font-weight: bold; border-collapse: separate; border: none; }");
}



/** MAIN **/

defineControlPanelInnerHTML();
buildAndAddControlPanel();
defineInputs();
defineLabels();
setFilterToDefault();
addListeners();
getLeaderboardAssists();
addStyle();


///////////////////

