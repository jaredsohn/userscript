// ==UserScript==
// @name		   Monsterkill Scout v3
// @namespace	  MonsterkillScout
// @include		http://*goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include		http://glb.warriorgeneral.com/game/game.pl?game_id=*&mode=pbp
// ==/UserScript==

/* ***
savedData - object, keyed by game id 
	<game id> - list of replays, starting at 0
		team0name
		team0id
		team1name
		team1id
		dateAdded
		plays - object
			gameId - not stored; dynamically generated for purposes for combined replays
			i - index of the play on the play by play screen
				prefix with 'play_' to get the id of the div for that replay
			f - object, formation data
				offTeamId
				defTeamId
				teShift
				offForm
				defform
				offName - off play name
				defName - def play name
				primaryPos - position of player that received or carried the ball
			oi - index of the offensive team, either 0 or 1 D
			di - index of the defensive team, either 0 or 1 D
			q - quarter D
			t - time left in the quarter D
			d - down D
			y - yards to first down, if it's inches, this will be 0
			ye - yards to endzone D
			replaylink - link to replay
			playtext - text of play
			oto - timeouts left for the offense D
			dto - timeouts left for the defense D
			os - offense's current score D
			ds - defense's current score D
			pbp - pbp id of a link to the replay D
			pressure  - flag to indicate a sack or hurry
			primary - name of player that received or carried the ball
			r - run type D
				0 = not a run
				1 = pitch to the left
				2 = run to the left
				3 = run up the middle
				4 = run to the right
				5 = pitch to the right
			p - pass type D
				0 = not a pass
				1 = pass left
				2 = pass middle
				3 = pass right
				4 = unidentified pass (sack)
				5 = screen pass left
				6 = screen pass middle
				7 = screen pass right
			yards - yards gained or lost
*/

// Include Dojo from the AOL CDN
var script = document.createElement('script');
script.id = 'dojoElement';
script.src="http://o.aolcdn.com/dojo/1.3.0/dojo/dojo.xd.js";
document.getElementsByTagName('head')[0].appendChild(script);

// version number so that saved data can know what version of the parser
// was used. if data is saved with an old version, it will be overwritten
var parserVersion = 26;

// array and index
var currentPbpIndexToParse = -1;
var currentReplayIndexToParse = -1;
var pbpIdsToParse = [];

GM_addStyle("#body_container {width: 97%; !important}");
GM_addStyle("#body_container {position: absolute; !important}");
GM_addStyle("#content {width: 100%; !important}");
GM_addStyle("tr.alternating_color1 td {padding: 1px; !important}");
GM_addStyle("tr.alternating_color2 td {padding: 1px; !important}");

var gameId = -1;

// holds data from the saved configuration value
// also holds data from the current replay as it is
// parsed
var savedData = {};

var allDataUse;
var autohighlight = false;

function getGameIdFromLocation() {
	var gid = window.location.search;
	gid = gid.slice(gid.indexOf('game_id=')+'game_id='.length);
	if (gid.indexOf('&') > -1) {
		gid = gid.slice(0, gid.indexOf('&'));
	} else {
		gid = gid.slice(0);
	}
	return gid;
}

function resetReplayData() {
	for each (var val in GM_listValues()) {
		if(val.indexOf('replayData')>=0) {
			GM_deleteValue(val);
		}
	}
}

function saveReplayData() {
	// pull in any changes that might have been saved
	// while this page was parsing. ex if you open 2
	// replays in tabs and start both of them scouting
	// at the same time, the second one to finish would
	// erase the previous one
	var tmpGameData = savedData[gameId];
	tmpGameData.parserVersion = parserVersion;
	evalReplayData();
	savedData[gameId] = tmpGameData;
	var replayname = 'replayData' + gameId;
	GM_setValue(replayname, dojo.toJson(savedData));
}

/*
loads all data saved to the configuration value
*/
function evalReplayData() {
	if (GM_getValue('scout_allDataUse')!=null) {
		eval("allDataUse="+GM_getValue('scout_allDataUse')+";");
	} else {
		allDataUse=false;
	}
	
	if (GM_getValue('replayData' + gameId)!=null) {
		eval("savedData="+GM_getValue('replayData' + gameId)+";");
		for(var val in savedData) break;
		tempData = savedData[gameId]['plays'];
		for (var playnum in tempData) { 		
			tempData[playnum].dateAdded=savedData[gameId].dateAdded; // making dateAdded play-level for replay column
		}
		
		/* everything after this is new for play merging*/
		if(allDataUse) {			
			var tempData;
			for each (var val in GM_listValues()) {
				if(val.indexOf('replayData')>=0 && val!='replayData'+gameId) {
					eval("tempData="+GM_getValue(val)+";");
					merge_plays(tempData);	
				}
			}
		}
	}	
}

function merge_plays(obj1){
	var team0id = savedData[gameId].team0id;
	var team1id = savedData[gameId].team1id;
	var flip = true; // whether we have to flip the teams
	for(var tempGame in obj1) break;
	if(obj1[tempGame].team0id==team0id || obj1[tempGame].team1id==team1id) {
		flip = false;
	}
	obj2 = obj1[tempGame]['plays'];
	for (var playnum in obj2) { 
		if(flip) {
			if(obj2[playnum].oi==1) {
				obj2[playnum].oi=0;
				obj2[playnum].di=1;				
			} else {
				obj2[playnum].oi=1;
				obj2[playnum].di=0;				
			}			
		}
		obj2[playnum].dateAdded=obj1[tempGame].dateAdded;
		obj2[playnum].i=obj2[playnum].i+tempGame;
    		savedData[gameId]['plays'][tempGame+playnum] = obj2[playnum]; 
	}
}


/*
	load constraints from greasemonkey
	if this is the first time using the script, it'll create a default list of constraints
*/
var constraints;
function loadConstraints() {
	if (GM_getValue('constraints') && GM_getValue('constraints').length>=537) {
		eval("tempconstraints="+GM_getValue('constraints')+";");
		constraints = new Array();
		for (var key in tempconstraints) {
			constraints.push(tempconstraints[key]);
		}
	} else {
		constraints = [
			{ n:"1st down", c:{d:{e:1}} },
			{ n:"2nd down", c:{d:{e:2}} },
			{ n:"3rd down", c:{d:{e:3}} },
			{ n:"3rd down and 6+ yards", c:{d:{e:3},y:{g:6}} },
			{ n:"3rd down and 10+ yards", c:{d:{e:3},y:{g:10}} },
			{ n:"4th down", c:{d:{e:4}} },
			{ n:"Pitch left", c:{r:{e:1}} },
			{ n:"Handoff left", c:{r:{e:2}} },
			{ n:"Handoff middle", c:{r:{e:3}} },
			{ n:"Handoff right", c:{r:{e:4}} },
			{ n:"Pitch right", c:{r:{e:5}} },
			{ n:"Pass left", c:{p:{e:1}} },
			{ n:"Pass middle", c:{p:{e:2}} },
			{ n:"Pass right", c:{p:{e:3}} },
			{ n:"Screen Pass left", c:{p:{e:5}} },
			{ n:"Screen Pass middle", c:{p:{e:6}} },
			{ n:"Screen Pass right", c:{p:{e:7}} },
			{ n:"Any Situation", c:{} }
		];
		GM_setValue('constraints', dojo.toJson(constraints));
	}
}
function saveConstraints() {
	GM_setValue('constraints', dojo.toJson(constraints));
}

var teams = [];
function populateTeamsData() {
	var teamLinks = dojo.query("div.content_header div.big_head a");
	teams[0] = {};
	teams[0].id = teamLinks[0].href.slice(teamLinks[0].href.indexOf('team_id=')+8);
	teams[0].name = teamLinks[0].innerHTML;
	teams[1] = {};
	teams[1].id = teamLinks[1].href.slice(teamLinks[1].href.indexOf('team_id=')+8);
	teams[1].name = teamLinks[1].innerHTML;
}

var dojo;
var console;
window.addEventListener('load', function(event) {
	dojo = unsafeWindow.dojo;
	console = unsafeWindow.console;
	gameId = getGameIdFromLocation();
	evalReplayData();
	// load constraints from greasemonkey
	loadConstraints();
	dojo.addOnLoad(function() {
		/*
			button to show a form for adding constraints
		*/
		var editConstraintButton = document.createElement('div');
		dojo.style(editConstraintButton, 'height', '20px');
		dojo.style(editConstraintButton, 'float', 'left');
		dojo.style(editConstraintButton, 'margin-right', '1px');
		var editConstraintLink = document.createElement('a');
		editConstraintLink.innerHTML = "Edit Scouting Scenarios";
		editConstraintButton.appendChild(editConstraintLink);
		dojo.connect(editConstraintButton, 'onclick', showConstraints);
		dojo.query("div.content_header div.subhead_link_bar")[0].appendChild(editConstraintButton);

		populateTeamsData();
		/*
			only show the start button if this replay hasnt already been
			parsed and saved with the current version
		*/
		if (savedData[gameId] != null &&
			savedData[gameId].parserVersion != null &&
			savedData[gameId].parserVersion == parserVersion) {
			startParsing();
		} else {
			var br = document.createElement('br');
			dojo.query("#pbp div.medium_head")[0].appendChild(br);
	
			var downloadButton = document.createElement('input');
			downloadButton.id = "downloadButton";
			downloadButton.type="button";
			downloadButton.value = "Start Scouting";
			dojo.query("#pbp div.medium_head")[0].appendChild(downloadButton);
	
			var statusText = document.createElement('div');
			statusText.id = "statusText";
			statusText.className = "medium_head";
			dojo.query("#pbp div.medium_head")[0].appendChild(statusText);
	
			dojo.connect(downloadButton, 'onclick', startParsing);
		}
	});
}, 'false');

var constraintsShown = false;
function showConstraints() {
	if (!constraintsShown) {
		constraintsShown = true;
		dojo.query("#scoreboard")[0].style.display='none';
		dojo.query("#pbp")[0].style.display='none';
		refreshConstraintsList();
	}
}

function deleteConstraint(e) {
	var index = Number(e.target.innerHTML);
	if (confirm('Delete ['+constraints[index].n+']?')) {
		constraints.splice(index, 1);
		saveConstraints();
		refreshConstraintsList();
	}
}

function resetSavedData() {
	if (confirm('Keeping too many games saved can cause issues with the script so it\'s a good idea to clear out the saved data occasionally.\n\nClick OK to clear out old games.\n\nNote this will not erase your Scouting Scenarios, just the scouted game data')) {
		resetReplayData()
	}
}

function toggleDataUse() {
	if(allDataUse==true) {
		allDataUse = false;	
		alert("All games now: Off");
	} else {
		allDataUse = true;
		alert("All games now: On");
	}
	GM_setValue('scout_allDataUse',allDataUse);
}

var isConstraintsDisplayConstructed = false;
function refreshConstraintsList() {
	if (!isConstraintsDisplayConstructed) {
		var container = document.createElement('div');

		var resetButton = document.createElement('input');
		resetButton.type = "button";
		resetButton.value = "Clear Saved Data";
		dojo.connect(resetButton, 'onclick', resetSavedData);
		container.appendChild(resetButton);
		
		var resetButton = document.createElement('input');
		resetButton.type = "button";
		if(allDataUse) {
			resetButton.value = "Evaluate Single Game Only";
		} else {
			resetButton.value = "Evaluate All Saved Games";
		}
		dojo.connect(resetButton, 'onclick', toggleDataUse);
		container.appendChild(resetButton);

		var tbody = document.createElement('tbody');
		tbody.id = "constraintsTbody";

		// constraints list
		var table = document.createElement('table');
		table.style.align="left";
		table.style.width="50%";
		table.appendChild(tbody);
		container.appendChild(table);

		var newCon = document.createElement('input');
		newCon.type = "button";
		newCon.value = "Create a new scenario";
		dojo.connect(newCon, 'onclick', addNewConstraint);
		container.appendChild(newCon);

		// constraints form
		var editConstraintDiv = document.createElement('div');
		editConstraintDiv.id = "editConstraintDiv";
		container.appendChild(editConstraintDiv);

		container.appendChild(document.createElement('br'));
		
		var existingGames = document.createElement('table');
		var dataTotals = document.createElement('span');
		var gameCount = 0;
		for each (var val in GM_listValues().sort()) {
			if(val.indexOf('replayData')>=0) {
				var tempData;
				eval("tempData="+GM_getValue(val)+";");
				for(var tempGame in tempData) break;
				tempData=tempData[tempGame];
				
				var tr = document.createElement('tr');
				
				var deletebutton = document.createElement('input');
				deletebutton.id = tempGame;
				deletebutton.type="button";
				deletebutton.value = "Delete";
				deletebutton.addEventListener("click", function(){GM_deleteValue('replayData'+this.id)}, true);
				tr.appendChild(deletebutton);
							
				var cell = tr.insertCell(-1);
				cell.innerHTML = tempData.dateAdded;
				tr.appendChild(cell);
					
				var cell = tr.insertCell(-1);
				cell.innerHTML = '<img width="75" height="75" src="/game/team_pic.pl?team_id='+ tempData.team0id + '">'+tempData.team0name;
				tr.appendChild(cell);
					
					
				var cell = tr.insertCell(-1);
				cell.innerHTML = tempData.team1name + '<img width="75" height="75" src="/game/team_pic.pl?team_id='+ tempData.team1id + '">';
				tr.appendChild(cell);
								
				existingGames.appendChild(tr);
				gameCount++;
			}
		}
		dataTotals.innerHTML = dataTotals.innerHTML+ "<br\><b>"+(gameCount)+" saved games</b>";
		container.appendChild(existingGames);
		container.appendChild(dataTotals);
		
		var parent = dojo.query("#content")[0];
		parent.insertBefore(container, dojo.query("#scoreboard")[0]);

		isConstraintsDisplayConstructed = true;
	}

	// clear out the current list
	var tbody = dojo.byId('constraintsTbody');
	if (tbody.hasChildNodes()) {
		while (tbody.childNodes.length >= 1) {
			tbody.removeChild( tbody.firstChild );	   
		}
	}
	// fill it back in with current data
	// header
	var tr = document.createElement('tr');
	tr.className = "nonalternating_color";
	addCellTextToRow(tr, "Scouting Scenarios");
	tbody.appendChild(tr);
	// list of scenarios
	for (key in constraints) {
		var tr = document.createElement('tr');
		tr.className = "alternating_color1";

		var b = document.createElement('input');
		b.type = "radio";
		b.name = "editConstraint";
		b.value = key;
		addCellElementToRow(tr, b);
		dojo.connect(b, 'onclick', editConstraint);
		
		addCellTextToRow(tr, constraints[key].n);

		var upB = document.createElement('input');
		upB.type = "button";
		upB.value = "Move Up";
		upB.innerHTML = key;
		addCellElementToRow(tr, upB);
		dojo.connect(upB, 'onclick', moveScenarioUp);

		var downB = document.createElement('input');
		downB.type = "button";
		downB.innerHTML = key;
		downB.value = "Move Down";
		addCellElementToRow(tr, downB);
		dojo.connect(downB, 'onclick', moveScenarioDown);
		
		var delB = document.createElement('input');
		delB.type = "button";
		delB.innerHTML = key;
		delB.value = "Delete";
		addCellElementToRow(tr, delB);
		dojo.connect(delB, 'onclick', deleteConstraint);

		tbody.appendChild(tr);
	}
	// reset the filter form
	clearConstraintDiv();
}

function moveScenarioUp(e) {
	var index = Number(e.target.innerHTML);
	if (index > 0) {
		var tmp = constraints[index];
		constraints.splice(index, 1);
		constraints.splice(index-1, 0, tmp);
		saveConstraints();
		refreshConstraintsList();
	}
}

function moveScenarioDown(e) {
	var index = Number(e.target.innerHTML);
	if (index < (constraints.length-1)) {
		var tmp = constraints[index];
		constraints.splice(index, 1);
		constraints.splice(index+1, 0, tmp);
		saveConstraints();
		refreshConstraintsList();
	}
}

function addNewConstraint() {
	var newname = prompt('Enter a name for the new scenario\n\nThe page will refresh when the new scenario is created.');
	if (newname!=null) {
		if (newname=='') {
			alert("Can't have a blank scenario name");
		} else {
			constraints.push({
				n: newname,
				c: {}
			});
			saveConstraints();
			refreshConstraintsList();
		}
	}
}

/*
	refactored adding options in the filter dropdown
*/
function addFilterOption(ddl, filter) {
	var op = document.createElement('option');
	op.value = filter;
	op.innerHTML = filterTypeToString(filter);
	ddl.appendChild(op);
}
function addOperatorOption(ddl, operator) {
	var op = document.createElement('option');
	op.value = operator;
	op.innerHTML = opToString(operator);
	ddl.appendChild(op);
}

function addOption(ddl, value, text) {
	var op = document.createElement('option');
	op.value = value;
	op.innerHTML = text;
	ddl.appendChild(op);
}
/*
	redraw the list of filters for the selected constraint
*/
function refreshFilterList(constraintIndex) {
	clearConstraintDiv();
	// redraw
	var div = dojo.byId('editConstraintDiv');
	var tbody = document.createElement('tbody');
	tbody.id = 'constraintFilterList';
	var tr = document.createElement('tr');
	tr.className = "nonalternating_color";
	addCellTextToRow(tr, "Add filters to : "+constraints[currentEditConstraintIndex].n);
	tbody.appendChild(tr);
	var table = document.createElement('table');
	table.style.width="50%";
	table.appendChild(tbody);
	div.appendChild(table);

	div.appendChild(document.createElement('hr'));

	var newFilterDDL = document.createElement('select');
	newFilterDDL.id = "newFilterType";
	addFilterOption(newFilterDDL, "d");
	addFilterOption(newFilterDDL, "y");
	addFilterOption(newFilterDDL, "ye");
	addFilterOption(newFilterDDL, "q");
	addFilterOption(newFilterDDL, "t");
	addFilterOption(newFilterDDL, "r");
	addFilterOption(newFilterDDL, "p");
	addFilterOption(newFilterDDL, "pids");
	dojo.connect(newFilterDDL, 'onchange', filterTypeChanged);
	div.appendChild(newFilterDDL);

	newFilterDDL = document.createElement('select');
	newFilterDDL.id = "newFilterOperator";
	addOperatorOption(newFilterDDL, "e");
	addOperatorOption(newFilterDDL, "g");
	addOperatorOption(newFilterDDL, "l");
	addOperatorOption(newFilterDDL, "ge");
	addOperatorOption(newFilterDDL, "le");
	div.appendChild(newFilterDDL);

	var newFilterValueRunType = document.createElement('select');
	newFilterValueRunType.id = "newFilterValueRunType";
	addOption(newFilterValueRunType, 1, 'Pitch left');
	addOption(newFilterValueRunType, 2, 'Handoff left');
	addOption(newFilterValueRunType, 3, 'Up the middle');
	addOption(newFilterValueRunType, 4, 'Handoff right');
	addOption(newFilterValueRunType, 5, 'Pitch right');
	div.appendChild(newFilterValueRunType);

	var newFilterValuePassType = document.createElement('select');
	newFilterValuePassType.id = "newFilterValuePassType";
	addOption(newFilterValuePassType, 1, 'To the left');
	addOption(newFilterValuePassType, 2, 'To the middle');
	addOption(newFilterValuePassType, 3, 'To the right');
	div.appendChild(newFilterValuePassType);

	var newFilterValueInput = document.createElement('input');
	newFilterValueInput.id = "newFilterValue";
	newFilterValueInput.type = "text";
	div.appendChild(newFilterValueInput);

	var addFilterButton = document.createElement('input');
	addFilterButton.type = "button";
	addFilterButton.value = "Add Filter";
	dojo.connect(addFilterButton, 'onclick', addFilter);
	div.appendChild(addFilterButton);
	// start on text input
	showTextInput();

	for (filter in constraints[currentEditConstraintIndex].c) {
		for (operator in constraints[currentEditConstraintIndex].c[filter]) {
			addConstraintRow(filter, operator, constraints[currentEditConstraintIndex].c[filter][operator]);
		}
	}
}
var currentEditConstraintIndex = null;
/*
	radio button click handler
*/
function editConstraint() {
	currentEditConstraintIndex = this.value;
	refreshFilterList();
}

function filterTypeChanged() {
	switch (this.value) {
	case 'p':
		showPassTypes();
		break;
	case 'r':
		showRunTypes();
		break;
	case 'pids':
		showPlayerIdInput();
		break;
	default:
		showTextInput();
	}
}
function showPassTypes() {
	dojo.byId('newFilterValue').style.display = 'none';
	dojo.byId('newFilterValuePassType').style.display = '';
	dojo.byId('newFilterValueRunType').style.display = 'none';
	dojo.byId('newFilterOperator').style.display = 'none';
	dojo.byId('newFilterOperator').value = 'e';
}
function showRunTypes() {
	dojo.byId('newFilterValue').style.display = 'none';
	dojo.byId('newFilterValuePassType').style.display = 'none';
	dojo.byId('newFilterValueRunType').style.display = '';
	dojo.byId('newFilterOperator').style.display = 'none';
	dojo.byId('newFilterOperator').value = 'e';
}
function showPlayerIdInput() {
	dojo.byId('newFilterValue').style.display = '';
	dojo.byId('newFilterValuePassType').style.display = 'none';
	dojo.byId('newFilterValueRunType').style.display = 'none';
	dojo.byId('newFilterOperator').style.display = 'none';
	dojo.byId('newFilterOperator').value = 'e';
}
function showTextInput() {
	dojo.byId('newFilterOperator').style.display = '';
	dojo.byId('newFilterValue').style.display = '';
	dojo.byId('newFilterValuePassType').style.display = 'none';
	dojo.byId('newFilterValueRunType').style.display = 'none';
}

function addFilter() {
	var filterType = dojo.byId('newFilterType').value;
	var op = dojo.byId('newFilterOperator').value;
	if (filterType == 'p') {
		val = dojo.byId('newFilterValuePassType').value;
	} else if (filterType == 'r') {
		val = dojo.byId('newFilterValueRunType').value;
	} else if (filterType == 'pids') {
		val = dojo.byId('newFilterValue').value;
		op = "has";
	} else {
		val = dojo.byId('newFilterValue').value;
	}
	if (confirm("Add this filter to the scenario?") ) {
		if (currentEditConstraintIndex) {
			var con = {};
			if (constraints[currentEditConstraintIndex].c[filterType]) {
				con = constraints[currentEditConstraintIndex].c[filterType];
			}
			con[op] = val;
			constraints[currentEditConstraintIndex].c[filterType] = con;
			saveConstraints();
			//refreshConstraintsList();
			refreshFilterList();
		}
	}
}

function filterTypeToString(filterType) {
	switch (filterType) {
	case 'd':
		return "Down";
	case 'y':
		return "Yards to first down";
	case 'ye':
		return "Yards to endzone";
	case 'q':
		return "Quarter";
	case 't':
		return "Time left in the quarter (seconds)";
	case 'r':
		return "Run play";
	case 'p':
		return "Pass play";
	case 'pids':
		return "Player ID is on the field : ";
	default:
		console.log('unknown filter: '+filterType);
	}
}
/*
	return a string version of the operator
*/
function opToString(operator) {
	switch (operator) {
	case 'e':
		return "equals";
	case 'ge':
		return "greater than or equal to";
	case 'le':
		return "less than or equal to";
	case 'g':
		return "greater than";
	case 'l':
		return "less than";
	case 'has':
		return "";
	default:
		console.log('unknown operator: '+operator);
	}
}
/*
	clears out the edit constraint section
*/
function clearConstraintDiv() {
	var div = dojo.byId('editConstraintDiv');
	if (div.hasChildNodes()) {
		while (div.childNodes.length >= 1) {
			div.removeChild( div.firstChild );	   
		}
	}
}
/*
	add a row to the list of filters on the constraint being editted
*/
function addConstraintRow(filter, op, value) {
	var list = dojo.byId('constraintFilterList');
	tr = document.createElement('tr');
	tr.className = "alternating_color1";

	addCellTextToRow(tr, filterTypeToString(filter)+" "+opToString(op)+" "+value);
	list.appendChild(tr);
}

function startParsing() {
	currentReplayIndexToParse = 0;
	if (savedData[gameId] != null &&
		savedData[gameId].parserVersion != null &&
		savedData[gameId].parserVersion == parserVersion) {
		displayData(true, true, true);

		//for (p in savedData[gameId]['plays']) {
		//	console.log(p+' : ', savedData[gameId]['plays'][p]);
		//}
	} else {
		/*
			reset saved data and parse what we can from this page
		*/
		var team0 = {};
		var team1 = {};

		savedData[gameId]=[];
		savedData[gameId]['plays']=[];
		savedData[gameId].team0name=teams[0].name;
		savedData[gameId].team0id=  teams[0].id;
		savedData[gameId].team1name=teams[1].name;
		savedData[gameId].team1id=  teams[1].id;
		savedData[gameId].dateAdded = Date();
		var currentQuarter = 0;
		team0.to = 3;
		team0.score = 0;
		team1.to = 3;
		team1.score = 0;
		var currentOffense = -1;// 0 or 1
		var replayRows = dojo.query("tbody", "play_by_play_table");
		for (var i = 0; i < replayRows.length; i++) {
			var replayData = {};
			var row = replayRows[i];
			/*
				keep track of which team is the current offense
			*/
			if (getFirstMatch("tr.pbp_team td", row)) {
				// change of possession happened
				if (getData("tr.pbp_team td", row).indexOf(teams[0].name) >= 0) {
					currentOffense = 0;
				} else {
					currentOffense = 1;
				}
			}
			replayData.i = row.id.slice(5);
			replayData.oi = currentOffense;
			replayData.di = (currentOffense+1)%2;
			/*
				current score
			*/
			if (replayData.oi == 0) {
				replayData.os = team0.score;
				replayData.ds = team1.score;
			} else {
				replayData.os = team1.score;
				replayData.ds = team0.score;
			}
			/*
				check for a change in the quarter
			*/
			if (getFirstMatch("tr.pbp_quarter", row)) {
				currentQuarter++;
				if (currentQuarter == 3) {
					// reset the timeouts for the half
					team0.to = 3;
					team1.to = 3;
				}
			}
			replayData.q = currentQuarter;
			/*
				time remaining in the quarter, convert it to seconds
			*/
			var timeText = getData("td.pbp_time_remaining", row);
			var separator = timeText.search(/:/);
			var minutes = timeText.slice(0, separator);
			var seconds = timeText.slice(separator+1);
			replayData.t = Number(minutes)*60 + Number(seconds);

			/* 
				the down, yards to first down, and field position 
				these will be null for kickoffs
			*/
			var down = getData("td.pbp_down", row);
			var fieldPosition = getData("td.pbp_marker", row);
			var playtext = getData("td.pbp_play", row);
			var replaylink = getData("td.pbp_replay", row);
			replayData.playtext = playtext;
			replayData.replaylink = replaylink;
			if (down && fieldPosition) {
				// down
				replayData.d = Number(down.slice(0,1));
				// yards to endzone
				if (fieldPosition.indexOf("OPP ") >= 0) {
					replayData.ye = Number(fieldPosition.slice("OPP ".length));
				} else {
					replayData.ye = 100 - Number(fieldPosition.slice("OWN ".length));
				}
				// yards to first down
				replayData.y = Number(down.slice(down.indexOf("&amp; ") + "&amp; ".length));
				if (isNaN(replayData.y)) {
					if (down.slice(down.indexOf("&amp; ") + "&amp; ".length) == 'G') {
						replayData.y = replayData.ye;
					} else {
						replayData.y = 0;
					}
				}
			}
			/*
				pbp id
			*/
			var replayLink = getFirstMatch("td.pbp_replay a", row);
			if (replayLink) {
				var replayHref = replayLink.href;
				replayData.pbp = replayHref.slice(replayHref.indexOf("pbp_id=")+"pbp_id=".length);
			}
			/*
				play text description
			*/
			var playDesc = getData("td.pbp_play", row);
			/*
				timeouts
			*/
			if (replayData.oi == 0) {
				replayData.oto = team0.to;
				replayData.dto = team1.to;
			} else {
				replayData.oto = team1.to;
				replayData.dto = team0.to;
			}
			var tmpi = playDesc.indexOf(" calls timeout");
			if (tmpi >= 0) {
				var teamCallingTO = playDesc.slice(0, tmpi);
				if (teamCallingTO == teams[0].name) {
					team0.to = team0.to-1;
				} else {
					team1.to = team1.to-1;
				}
			} else if (playDesc.indexOf("[FG]")>=0) {
				if (currentOffense == 0) {
					team0.score = team0.score+3;
				} else {
					team1.score = team1.score+3;
				}
			} else if (playDesc.indexOf("[TD]")>=0) {
				var patPts = 0;
				if (playDesc.indexOf("PAT made by ")>=0) {
					patPts++;
				}
				if (currentOffense == 0) {
					team0.score = team0.score+6+patPts;
				} else {
					team1.score = team1.score+6+patPts;
				}
			}
			/*
			play call 
			*/
			replayData.p = 0;
			replayData.r = 0;
			replayData.pressure = 0;
			var yards = 0;
			var primaryLeftPos = -1; // string positions for extracting the primary player
			var primaryRightPos = -1;
			if (playDesc.indexOf("forced fumble") >= 0 ||
				playDesc.indexOf("intercepted by") >= 0) {
				/*
				if there was a turn over, dont bother counting it 
				TODO come up with a way to determine who called the offense on a turnover 
				*/
			} else {
				if (playDesc.indexOf(" screen pass to ") >= 0) {
					primaryLeftPos = playDesc.indexOf(" screen pass to ")+16;
					if (playDesc.indexOf("the left side") >=0 ) {
						primaryRightPos = playDesc.indexOf("to the left side")-1;
						replayData.p = 5;
					} else if (playDesc.indexOf("the right side") >=0 ) {
						primaryRightPos = playDesc.indexOf("to the right side")-1;
						replayData.p = 7;
					} else if (playDesc.indexOf("over the middle") >=0 ) {
						primaryRightPos = playDesc.indexOf("over the middle")-1;
						replayData.p = 6;
					}
					if(playDesc.indexOf(", hurried by ") >= 0) {
						replayData.pressure = 1;
						primaryRightPos = playDesc.indexOf(", hurried by ");							
					}
				} else if (playDesc.indexOf(" pass to ") >= 0) {
					primaryLeftPos = playDesc.indexOf(" pass to ")+9;
					if (playDesc.indexOf("the left side") >=0 ) {
						primaryRightPos = playDesc.indexOf("up the left side")-1;
						replayData.p = 1;
					} else if (playDesc.indexOf("the right side") >=0 ) {
						primaryRightPos = playDesc.indexOf("up the right side")-1;
						replayData.p = 3;
					} else if (playDesc.indexOf("over the middle") >=0 ) {
						primaryRightPos = playDesc.indexOf("over the middle")-1;
						replayData.p = 2;
					}
					if(playDesc.indexOf(", hurried by ") >= 0) {
						replayData.pressure = 1;
						primaryRightPos = playDesc.indexOf(", hurried by ");							
					}
				} else if (playDesc.indexOf("rush") >=0) {
					primaryLeftPos = 0;
					primaryRightPos = playDesc.indexOf("rush")-1;
					if (playDesc.indexOf("to the right ") >= 0) {
						replayData.r = 4;
					} else if (playDesc.indexOf("to the left ") >= 0) {
						replayData.r = 2;
					} else if (playDesc.indexOf("up the middle") >= 0) {
						replayData.r = 3;
					}
				} else if (playDesc.indexOf("pitch") >= 0) {
					primaryLeftPos = playDesc.indexOf(" pitch to ")+10;
					if (playDesc.indexOf("to the right ") >= 0) {
						primaryRightPos = playDesc.indexOf("to the right")-1;
						replayData.r = 5;
					} else {
						primaryRightPos = playDesc.indexOf("to the left")-1;
						replayData.r = 1;
					}
				} else if (playDesc.indexOf("sacked by") >= 0) {
					replayData.pressure = 1;
					replayData.p = 4;
				}
				
				
				if(primaryRightPos>=0 && primaryLeftPos>=0) {
					replayData.primary = playDesc.substring(primaryLeftPos,primaryRightPos);
				} else {
					replayData.primary = null;
				}
								
				if (playDesc.lastIndexOf('(') >= 0) {
					var yardtext = playDesc.slice(playDesc.lastIndexOf('('));
					if(yardtext.indexOf('turnover on downs')>=0) { // if turnover on downs in the last string, then we want the second to last string
						var yardtext = playDesc.slice(playDesc.lastIndexOf('(',playDesc.lastIndexOf('(')-1));
					}
					if (yardtext.indexOf(' yd ') >= 0) {
						yards = yardtext.slice(1,yardtext.indexOf(' yd '));
						if (yardtext.indexOf('loss') >= 0) {
							yards=-yards;
						}
					} else {
						//if idiots use parenthesis in their name, then this checks the next one, just in case
						var yardtext = playDesc.slice(playDesc.lastIndexOf('(',playDesc.lastIndexOf('(')-1));					
						if (yardtext.indexOf(' yd ') >= 0) {
							yards = yardtext.slice(1,yardtext.indexOf(' yd '));
							if (yardtext.indexOf('loss') >= 0) {
								yards=-yards;
							}
						} else {
							yards = 0;
						}
					}
				} else {
					yards = 0;
				}
				
				// Adding this for evaluation purposes.  If defense deflects ball, but receiver still somehow catches it, set yards to 0, since that's pretty much luck
				if(playDesc.indexOf("[deflected by ") >= 0) {
					yards = 0;	
				}
			}
			replayData.yards = Number(yards);
			/*
				dont keep track of play data for
				kickoffs
				timeouts
			*/
			if ((playDesc.indexOf(" calls timeout") == -1) &&
				(playDesc.indexOf("Kickoff by") == -1) &&
				(playDesc.indexOf("Encroachment penalty committed by") == -1) &&
				(playDesc.indexOf("False start penalty committed by") == -1) &&
				(playDesc.indexOf("forced fumble") == -1) ||
				(playDesc.indexOf("intercepted by") == -1)) {
				// save it
				savedData[gameId]['plays'][savedData[gameId]['plays'].length] = replayData;
			}
			
		}
		/*
			start requesting replays
		*/
		parseNextReplay();
	}
}

/*
utility method for finding the first match of the 
query and returning that dom object
*/
function getFirstMatch(queryString, domToQuery) {
	var tmp = dojo.query(queryString, domToQuery);
	if (tmp && tmp.length > 0) {
		return tmp[0];
	}
	return null;
}

/*
refactored utility method for finding the first match of the 
query and returning the innerHTML of that first match
*/
function getData(queryString, domToQuery) {
	var tmp = getFirstMatch(queryString, domToQuery);
	if (tmp) {
		return tmp.innerHTML;
	}
	return null;
}

function parseNextReplay() {
	if (currentReplayIndexToParse < savedData[gameId]['plays'].length) {
		dojo.byId('statusText').innerHTML = "# of replays left to parse: " + (savedData[gameId]['plays'].length-currentReplayIndexToParse);
		if (savedData[gameId]['plays'][currentReplayIndexToParse].pbp) {
			dojo.xhrGet({
				url: "http://" + window.location.hostname +"/game/replay.pl", 
				content : {game_id: gameId, pbp_id: savedData[gameId]['plays'][currentReplayIndexToParse].pbp},
				load: parseSingleReplay,
				error : function() {},
				handleAs: "text"
			});
		} else {
			currentReplayIndexToParse++;
			parseNextReplay();
		}
	} else {
		dojo.byId('statusText').innerHTML = "- Done Parsing -";
		setTimeout(saveReplayData, 1000);
		// insert all of the data on the page
		displayData(true, true, true);
	}
}
function displayData(formations, playType, statTables) {
	if (formations) {
		displayFormations();
	}
	if (playType) {
		displayOffensiveTable(1);
		displayOffensiveTable(0);
	}
	if (statTables) {
		populateStats();
		displayDefensiveTable(0);
		displayDefensiveTable(1);
	}
}

function displayFormations() {
	for (rindex in savedData[gameId]['plays']) {
		var replay = savedData[gameId]['plays'][rindex];
		if (replay.f) {
			var offenseMessage = "Offense: <b>" + offenses[replay.f.offForm];
			if (replay.f.teShift == 1) {
				offenseMessage += " w/ TE shift";
			}
			offenseMessage += "</b>";
			if(replay.f.offName!=null) {
				offenseMessage += " - " + replay.f.offName;
			}	
			addScoutRow(replay.i, offenseMessage);
		
			var defenseMessage = "Defense: <b>" + defenses[replay.f.defForm];
			defenseMessage += "</b>";
			if(replay.f.defName!=null) {
				defenseMessage += " - " + replay.f.defName;
			}	
			addScoutRow(replay.i, defenseMessage);
		}
	}

}

var offenses = ['Goalline','Big I','Pro Set','Strong I','Weak I','I Formation','SB Big','SB 3WR','Trips Left','Shotgun','SB Spread','Shotgun 5WR','Kick Return','Punt Return','All'];
var defenses = ['Goalline','Goalline Small','5-2','4-4 Big','4-4','4-3','3-4','4-2-5 Nickel (3 CBs)','3-3-5 Nickel (3 CBs)','4-1-6 Dime (4 CBs)','3-2-6 Dime (4 CBs)','3-1-7 Quarter (5 CBs)', 'Kickoff', 'Punt'];
function getDefensiveIndex(formation) {
	for (var i in defenses) {
		if (defenses[i] == formation) {
			return i;
		}
	}
	return null;
}

/*
times that the team ran a certain defense agaisnt the specific offense 
stats - list of
	 team stats - object
		<defense formation id> - object
			<off. formation id> - object
				count - count of plays seen for this o and d pairing
		offCalls - object
*/
var stats = [];
function populateStats() {
	stats[0] = [];
	// initialize team 0
	for (d in defenses) {
		stats[0][d] = [];
		for (o in offenses) {
			stats[0][d][o] = {};
			stats[0][d][o].count = 0;
			stats[0][d][o].yards = 0;
		}
	}
	// initialize team 1
	stats[1] = [];
	for (d in defenses) {
		stats[1][d] = [];
		for (o in offenses) {
			stats[1][d][o] = {};
			stats[1][d][o].count = 0;
			stats[1][d][o].yards = 0;
		}
	}
	for (var replay in savedData[gameId]['plays']) {
		if (replay != "parserVersion" && savedData[gameId]['plays'][replay].f) {
			var f = savedData[gameId]['plays'][replay].f;
			var i = 0;
			if (f.defTeamId == teams[1].id) {
				i = 1;
			}
			stats[i][f.defForm][f.offForm].yards+=savedData[gameId]['plays'][replay].yards;
			stats[i][f.defForm][f.offForm].count++;
			
		}
	}   
}
function displayDefensiveTable(teamIndex) {
	var doc = unsafeWindow.document;
	var tbody = document.createElement('tbody');

	var tr = document.createElement('tr');
	tr.className = "nonalternating_color pbp_quarter";
	
	var td = document.createElement('td');
	if (teamIndex==0) {
		td.innerHTML = "O:" + teams[1].name + "<br>D:" + teams[0].name;
		//td.innerHTML = teams[0].name + " Def. vs";
	} else {
		td.innerHTML = "O:" + teams[0].name + "<br>D:" + teams[1].name;
		//td.innerHTML = teams[1].name + " Def. vs";
	}
	tr.appendChild(td);

	for (var o in offenses) {
		td = document.createElement('td');
		td.align = "center";
		td.innerHTML = offenses[o];
		tr.appendChild(td);
	}
	tbody.appendChild(tr);

	for (var d in stats[teamIndex]) {
		tr = document.createElement('tr');
		tr.className = "alternating_color" + ((d%2)+1) +" pbp_team";

		td = document.createElement('td');
		td.innerHTML = defenses[d];
		tr.appendChild(td);

		for (o in stats[teamIndex][d]) {
			td = document.createElement('td');
			td.align = "center";
			if (stats[teamIndex][d][o].count > 0) { //**
				td.innerHTML = stats[teamIndex][d][o].count + "<br />" + (stats[teamIndex][d][o].yards/stats[teamIndex][d][o].count).toFixed(2);
			} else {
				td.innerHTML = ".";
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}

	var table = document.createElement('table');
	table.appendChild(tbody);

	var statsDiv = document.createElement('div');
	statsDiv.id = "statsDiv";
	statsDiv.className = "medium_head";
	statsDiv.appendChild(table);

	var parent = dojo.query("#pbp")[0];
	parent.insertBefore(statsDiv, parent.firstChild);
}

function parseSingleReplay(response, ioArgs) {
	var tmp = {};
	// pull out the offense team id
	response = response.slice(response.indexOf('team_id=') + 'team_id='.length);
	tmp.offTeamId = response.slice(0, response.indexOf('"'));

	// pull out the defense team id
	response = response.slice(response.indexOf('team_id=') + 'team_id='.length);
	tmp.defTeamId = response.slice(0, response.indexOf('"'));

	// get play names
	if(response.indexOf('Offense Play:<br>')>=0) {
		response = response.slice(response.indexOf('Offense Play:<br>')+'Offense Play:<br>'.length);
		tmp.offName = response.slice(0, response.indexOf('</div>'));
	}
	if(response.indexOf('Defense Play:<br>')>=0) {
		response = response.slice(response.indexOf('Defense Play:<br>')+'Defense Play:<br>'.length);
		tmp.defName = response.slice(0, response.indexOf('</div>'));
	}
	
	// pull out players data
	response = response.slice(response.indexOf('var players = '));
	var playersText = response.slice(0, response.indexOf('var play_data ='));
	if (!playersText) {
		playersText = "var players=[]";
	}
	eval(playersText);

	// pull out play_data
	response = response.slice(response.indexOf('var play_data = '));
	var playDataText = response.slice(0, response.indexOf(';')+1);
	if (!playDataText) {
		playDataText = "var play_data = {}";
	}
	eval(playDataText);
	if (play_data.length > 0) {
		var playerIds = getPlayerIdsByPosition(players);
		
		
		var primary = savedData[gameId]['plays'][currentReplayIndexToParse].primary;
		if(primary!= null) {			
			tmp.primaryPos = getPlayerPositionByName(players,primary);
		} else {
			tmp.primaryPos = "";
		}
		
		
		tmp.offForm = detectOffensiveFormation(playerIds, play_data);
		tmp.defForm = detectDefensiveFormation(playerIds, play_data);
		tmp.teShift = getTEShift(tmp.offForm, playerIds, play_data);
		
		if (savedData[gameId]['plays'] == null) {
			savedData[gameId]['plays'] = [];
		}
		savedData[gameId]['plays'][currentReplayIndexToParse].f=tmp;
	} else {
		// it was a timeout
	}

	// keep a list of player ids
	var playerIdList = [];
	for (var pid in players) {
		playerIdList.push(pid);
	}
	savedData[gameId]['plays'][currentReplayIndexToParse].pids=playerIdList;

	currentReplayIndexToParse++;
	parseNextReplay();
}

// add message under the row in the replay list
function addScoutRow(index, message) {
	var row = document.createElement('tr');
	var alternatingColor = ((Number(index)+1) % 2)+1;
	row.className = "alternating_color"+alternatingColor+" pbp_play_row";
	var col1 = document.createElement('td');
	col1.colSpan = 3;
	col1.className = "pbp_play";
	row.appendChild(col1);
	var col2 = document.createElement('td');
	col2.colSpan = 2;
	col2.className = "pbp_play";
	col2.innerHTML = message;
	row.appendChild(col2);	
	var result = dojo.query("#play_"+index);
	if(result.length>0) {
		dojo.query("#play_"+index)[0].appendChild(row);
	}
}
/*
reorganize by position. so we can query 'what player id is at position X'. 
could be multiple people for a listed position so it's a map of lists
map 
	key : position
	value : list of playerIds
*/
function getPlayerIdsByPosition(players) {
	var newMap = {};
	for (x in players) {
		var p = players[x].position;
		if (newMap[p] != null) {
			newMap[p][newMap[p].length] = x;
		} else {
			var newList = [];
			newList[0] = x;
			newMap[p] = newList;
		}
	}
	return newMap;
}

/*
return position of player with a name
*/
function getPlayerPositionByName(players,playername) {
	var locatedPosition = "";
	for (x in players) {
		if(playername == players[x].name) {
			locatedPosition = players[x].position;
			return locatedPosition;
		}
	}
	return locatedPosition;
}

// detect formation by positions on the field and placement of the positions
function detectOffensiveFormation(playerIdsByPosition, pd) {
	var hasHB = false;
	var hasFB = false;
	var hasK = false;
	var hasP = false;
	var countTE = 0;
	var countWR = 0;

	if (playerIdsByPosition['WR5'] != null) {
		countWR = 5;
	} else if(playerIdsByPosition['WR4'] != null) {
		countWR = 4;
	} else if(playerIdsByPosition['WR3'] != null) {
		countWR = 3;
	} else if(playerIdsByPosition['WR2'] != null) {
		countWR = 2;
	} else if(playerIdsByPosition['WR1'] != null) {
		countWR = 1;
	} else {
		countWR = 0;
	} 
	if (playerIdsByPosition['TE'] != null) {
		countTE = playerIdsByPosition['TE'].length;
	}
	if (playerIdsByPosition['FB'] != null) {
		hasFB = true;
	}
	if (playerIdsByPosition['HB'] != null) {
		hasHB = true;
	}
	if (playerIdsByPosition['P'] != null) {
		hasP = true;
	}
	if (playerIdsByPosition['K'] != null) {
		hasK = true;
	}
	var formation = "Unknown";
	if (hasP) {
		formation = 13;
	} else if (hasK) {
		formation = 12;
	} else if (countTE == 3) {
		formation = 0; // goalline
	} else if (countWR == 5) {
		formation = 11; // shotgun 5wr
	} else if (countWR == 4) {
		formation = 10; // single back 4WR
	} else if (countTE == 2) {
		if (countWR == 1) {
			formation = 1; // 1WR/2TE/2HB
		} else {
			formation = 6; // singleback big
		}
	} else if (countWR == 3) {
		// Shotgun, Singleback, or trips
		var qbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['QB'][0]);
		//season 10 change, ball now starts in the QB's hands for shotgun screen
		if (qbDelta.y > 7 || qbDelta.y < -7) {
			formation = 9; //shotgun
		} else {
			var wr1Delta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['WR1'][0]);
			var wr2Delta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['WR2'][0]);
			var hbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['HB'][0]);
			if(hbDelta.y > 0) { // offense headed south so flip
				wr1Delta.x = wr1Delta.x * -1;
				wr1Delta.y = wr1Delta.y * -1;
				wr2Delta.x = wr2Delta.x * -1;
				wr2Delta.y = wr2Delta.y * -1;
			}
			
			if (wr1Delta.x <= -3 && wr2Delta.x <=-3) { // trips right
				formation = 8;
			} else if (wr1Delta.x >= 3 && wr2Delta.x >= 3) { // trips left
				formation = 8;
			} else {
		   		formation = 7; // single back
		   	}
		}
	} else {
		// I / Weak I / Strong I / Pro Set
		var fbDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['FB'][0]);
		
		if (fbDelta.y > 0) { // offense headed south so flip it
			fbDelta.x = fbDelta.x * -1;
			fbDelta.y = fbDelta.y * -1;	
		}
		if (fbDelta.y <= -10) {
		formation = 2;
		} else if (fbDelta.x <= -3) {
		formation = 3;
		} else if (fbDelta.x >= 3) {
		formation = 4;
		} else {
		formation = 5;
		}
	}
	return formation;
}

/*
returns 1 if the te was shifted left
*/
function getTEShift(f, playerIdsByPosition, pd) {
	if (f >= 0 && f <= 5) {
		var teDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['TE'][0]);
		var cDelta = getPositionLocationRelativeToBall(pd, playerIdsByPosition['C'][0]);
		if ((cDelta.y < 0 && teDelta.x < 0) || (cDelta.y > 0 && teDelta.x > 0)) {
			return 1;
		}
	}   
	return 0;
}

function getPositionLocationRelativeToBall(playData, playerId) {
	var ballLoc = {};
	var posLoc = {};
	for (var i=0; i < playData[0].length; i++) {
		if (playData[0][i].id == 'ball') {
			ballLoc.x = playData[0][i].x;
			ballLoc.y = playData[0][i].y;
		} else if (playData[0][i].id == playerId) {
			posLoc.x = playData[0][i].x;
			posLoc.y = playData[0][i].y;
		}
	}
	if (posLoc.x == null) {
		console.log('didnt find position for playerId '+playerId);
	}
	return {x: ballLoc.x-posLoc.x, y: ballLoc.y-posLoc.y};
}

/*
takes in an array of players taken from the replay screen
*/
function detectDefensiveFormation(playerIdsByPosition, pd) {
	var isDT = false;
	var is5CB = false;
	var is4CB = false;
	var is3CB = false;
	var is2CB = false;
	var is1FS = false;
	var isKR = false;
	var isPR = false;
	var isLILB = false;
	var isROLB = false;
	if (playerIdsByPosition['LILB'] != null) {
		isLILB = true;
	}
	if (playerIdsByPosition['ROLB'] != null) {
		isROLB = true;
	}
	if (playerIdsByPosition['DT'] != null) {
		isDT = true;
	}
	if (playerIdsByPosition['CB5'] != null) {
		is5CB = true;
	}
	if (playerIdsByPosition['CB4'] != null) {
		is4CB = true;
	}
	if (playerIdsByPosition['CB3'] != null) {
		is3CB = true;
	}
	if (playerIdsByPosition['CB2'] != null) {
		is2CB = true;
	}
	if (playerIdsByPosition['FS'] != null) {
		is1FS = true;
	}
	if (playerIdsByPosition['P'] != null) {
		isPR = true;
	}
	if (playerIdsByPosition['K'] != null) {
		isKR = true;
	}
	var formation = '';
	if (isKR) {
		formation = 12;
	} else if (isPR) {
		formation = 13;
	} else if (!is1FS) {
		if (is2CB) {	
			formation = 0;
		} else {
			formation = 1;
		}
	} else if (is5CB) {
		formation = 11;
	} else if (isDT) {
		if (is4CB) {
			formation = 9;
		} else if (is3CB) {
			formation = 7;
		} else if (isLILB) {
			if (is2CB) {	
				formation = 4;
			} else {
				formation = 3;	
			}
		} else {
			if(isROLB) {
				formation = 5;
			} else {
				formation = 2;
			}
		}
	} else {
		if (is4CB) {
			formation = 10;
		} else if (is3CB) {
			formation = 8;
		} else {
			formation = 6;
		}
	}
	return formation;
	//   0             1             2       3       4     5     6         7                       8                    9                     10                  11                      12       13
	//['Goalline','Goalline Small','5-2','4-4 Big','4-4','4-3','3-4','4-2-5 Nickel (3 CBs)','3-3-5 Nickel (3 CBs)','4-1-6 Dime (4 CBs)','3-2-6 Dime (4 CBs)','3-1-7 Quarter (5 CBs)', 'Kickoff', 'Punt'];
}

function displayOffensiveTable(teamIndex) {
	var tbody = document.createElement('tbody');
	var tr = document.createElement('tr');
	addCellTextToRow(tr, teams[teamIndex].name+" offensive plays calls (Run | Pass)", offenses.length-2+1);
	tbody.appendChild(tr);
	tr = document.createElement('tr');
	tr.className = "nonalternating_color pbp_quarter";
	addCellTextToRow(tr, "Scenario");
	// header row for offensive scenarios
	for (var o in offenses) {
		// dont bother with kickoffs
		if (o != 12 && o != 13) {
			addCellTextToRow(tr, offenses[o]);
		}
	}
	tbody.appendChild(tr);
	
	var toggle = 0;
	for (i in constraints) {
		toggle = 0;
		for (j in constraints[i]['c']) {
			if(j=='p') {
				toggle = 1;
			}
		}
		addScenarioRow(tbody, toggle, teamIndex, i);
	}

	var table = document.createElement('table');
	table.appendChild(tbody);

	var statsDiv = document.createElement('div');
	statsDiv.className = "medium_head";
	statsDiv.appendChild(document.createElement('br'));
	statsDiv.appendChild(table);

	var linkTable = document.createElement('table');
	linkTable.id = 'linkTable'+teamIndex;
	statsDiv.appendChild(linkTable);

	statsDiv.appendChild(document.createElement('br'));
	statsDiv.appendChild(document.createElement('hr'));
	statsDiv.appendChild(document.createElement('br'));

	var parent = dojo.query("#pbp")[0];
	parent.insertBefore(statsDiv, parent.firstChild);
}

/*
	returns true if all constraints pass 
	 
	the constraints object is a collection of single value constraints 
	a single value constraint is an object with one member, the key is the operator 
	for the boolean expression of the constraint, the value of that member to be 
	compared in the expression 
*/
function checkConstraints(replay, constraints) {
	for (param in replay) {
		if (constraints[param]) {
			for (operator in constraints[param]) {
				switch (operator) {
				case 'has':
					// return true if the constraint's value exists in the list
					var found = false;
					for (var item in replay[param]) {
						if (replay[param][item] == constraints[param].has) {
							found = true;
						}
					}
					if (!found) {
						return false;
					}
					break;
				case 'e':
					if (replay[param] != constraints[param].e) {
						return false;
					}
					break;
				case 'l':
					if (replay[param] >= constraints[param].l) {
						return false;
					}
					break;
				case 'g':
					if (replay[param] <= constraints[param].g) {
						return false;
					}
					break;
				case 'ge':
					if (replay[param] < constraints[param].ge) {
						return false;
					}
					break;
				case 'le':
					if (replay[param] > constraints[param].le) {
						return false;
					}
					break;
				default :
					console.log('bad constraint',constraints[param]);
				}
			}
		}
	}
	return true;
}

/*
	pass in a function that uses the replay data to determine if the 
	given replay matches the desired scenario
 
	tbody: tbody element where the row will be appended
	color: 0 or 1
	constraints: constraints object
*/
function addScenarioRow(tbody, color, teamIndex, constraintIndex) {
	var scenarioLabel = constraints[i].n;
	var rowConstraints = constraints[i].c;

	var breakdown = {};
	for (var o in offenses) {
		breakdown[o] = {};
		breakdown[o].run = 0;
		breakdown[o].pass = 0;
		breakdown[o].runy = 0;
		breakdown[o].passy = 0;
	}
	for (replayIndex in savedData[gameId]['plays']) {
		var tmp = savedData[gameId]['plays'][replayIndex];
		if (tmp.f && (tmp.f.offForm >= 0) && tmp.oi == teamIndex && checkConstraints(tmp, rowConstraints)) {
			if (tmp.r > 0) {
				breakdown[tmp.f.offForm].run = breakdown[tmp.f.offForm].run + 1;
				breakdown[tmp.f.offForm].runy = breakdown[tmp.f.offForm].runy + tmp.yards;
				breakdown[14].run = breakdown[14].run + 1;
				breakdown[14].runy = breakdown[14].runy + tmp.yards;
			} else if (tmp.p > 0) {
				breakdown[tmp.f.offForm].pass = breakdown[tmp.f.offForm].pass + 1;
				breakdown[tmp.f.offForm].passy = breakdown[tmp.f.offForm].passy + tmp.yards;
				breakdown[14].pass = breakdown[14].pass + 1;
				breakdown[14].passy = breakdown[14].passy + tmp.yards;
			} else {
				// not counted, probably a turn over or a punt return by the offense
			}
		}
	}
	var tr = makeTableRow(color);
	addCellTextToRow(tr, scenarioLabel);
	for (var o in offenses) {
		// ignore kick returns
		if (o != 12 && o!= 13) {
			if ((breakdown[o].run + breakdown[o].pass) > 0) {
				var contents = document.createElement('div');
				// add run button
				run = dojo.doc.createElement('input');
				run.name = "replayDisplay"+teamIndex;
				run.type = "radio";
				if (breakdown[o].run == 0) {
					run.disabled = true;
				}
				//have to do it this way because of FF 3.5 :(
				run.value = teamIndex + ":1:" + o + ":" + constraintIndex;
				contents.appendChild(run);

				// add the run and pass totals
				var divider = document.createElement('span');
				divider.innerHTML = "&nbsp;"+breakdown[o].run
				contents.appendChild(divider);
				
				
				var divider = document.createElement('input');
				divider.name="replayDisplay"+teamIndex;
				divider.type="radio";
				if (breakdown[o].pass == 0 && breakdown[o].run ==0) {
					divider.disabled = true;
				}
				divider.value = teamIndex + ":2:" + o + ":" + constraintIndex;
				divider.addEventListener("click", displayScenarioLinks, true);
				contents.appendChild(divider);
				
				
				var divider = document.createElement('span');
				divider.innerHTML = breakdown[o].pass+"&nbsp;"
				contents.appendChild(divider);
				

				// add pass button
				var pass = document.createElement('input');
				pass.name="replayDisplay"+teamIndex;
				pass.type="radio";
				if (breakdown[o].pass == 0) {
					pass.disabled = true;
				}
				pass.value = teamIndex + ":0:" + o + ":" + constraintIndex;
				contents.appendChild(pass);
				
				// adds the averages
				divider = document.createElement('span');
				divider.innerHTML = "<br />"
				if(breakdown[o].run>=1) {
					divider.innerHTML +=(breakdown[o].runy/breakdown[o].run).toFixed(2);
				} else {
					divider.innerHTML +="___";
				}
				divider.innerHTML +=" | ";
				
				if(breakdown[o].pass>=1) {
					divider.innerHTML +=(breakdown[o].passy/breakdown[o].pass).toFixed(2);
				}else {
					divider.innerHTML +="___";
				}
				divider.innerHTML +="&nbsp;";
							
				contents.appendChild(divider);

				addCellElementToRow(tr, contents);

				pass.addEventListener("click", displayScenarioLinks, true);
				run.addEventListener("click", displayScenarioLinks, true);
			} else {
				addCellTextToRow(tr, ".");
			}
		}
	}
	tbody.appendChild(tr);
}

/*
	display links of the selected scenario/formation
*/
function displayScenarioLinks() {
	var args = this.value.split(':');
	var ti = Number(args[0]);
	var ir = Number(args[1]);
	var o = Number(args[2]);
	var constraint = Number(args[3]);
	var sl = constraints[constraint].n;

	var table = dojo.query("#linkTable"+ti)[0];

	//clear out the table
	while (table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}

	var tbody = document.createElement('tbody');

	tr = document.createElement('tr');
	tr.className = "nonalternating_color pbp_quarter";
	addCellTextToRow(tr, teams[ti].name+" replays "+sl+" | "+offenses[o]+" | "+((ir==1)?"Run plays":((ir==0)?"Pass plays":"All plays")));
	tbody.appendChild(tr);	
	table.appendChild(tbody);	
	var tbody = document.createElement('tbody');

	var playArray=new Array();
	var keyArray = new Array();
	for (replayIndex in savedData[gameId]['plays']) {
		var tmp = savedData[gameId]['plays'][replayIndex];
		if (tmp.f && (tmp.f.offForm>=0) && tmp.oi == ti && (tmp.f.offForm==o || o==offenses.length-1) && checkConstraints(tmp, constraints[constraint].c)) {
			if ((tmp.r > 0 && ir==1) || (tmp.p > 0 && ir==0) || ((tmp.r > 0 || tmp.p > 0) && ir==2)) {
				// Generates rows for filling chosen play types
				var row = document.createElement("tr");
				var newcell = row.insertCell(-1);
				newcell.innerHTML= tmp.d + " & " + tmp.y;
				var newcell = row.insertCell(-1);
				if(tmp.ye > 50) { 
					newcell.innerHTML= "OWN " + (100-tmp.ye);
				} else {
					newcell.innerHTML= "OPP " + tmp.ye;
				}
				var newcell = row.insertCell(-1);
				newcell.innerHTML= tmp.playtext;
				var newcell = row.insertCell(-1);
				newcell.innerHTML= tmp.replaylink;
				
				var sorter = "";
				var cell = row.insertCell(-1);
				var newText  = document.createTextNode(tmp.f.offName + " (" + offenses[tmp.f.offForm] + ")");
				var playnum = tmp.i+''; // used for sorting purposes
				if(tmp.i < 100000000) {playnum = "0"+playnum;}
				if(tmp.i < 10000000) {playnum = "0"+playnum;}
				if(tmp.i < 1000000) {playnum = "0"+playnum;}
				if(tmp.i < 100000) {playnum = "0"+playnum;}
				if(tmp.i < 10000) {playnum = "0"+playnum;}
				if(tmp.i < 1000) {playnum = "0"+playnum;}
				if(tmp.i < 100) {playnum = "0"+playnum;}
				if(tmp.i < 10) {playnum = "0"+playnum;}
				cell.appendChild(newText);
				var cell = row.insertCell(-1);
				if(tmp.f.defName) {
					var newText  = document.createTextNode(tmp.f.defName);
					sorter = tmp.f.defName + tmp.f.defForm + tmp.f.offName + tmp.f.offForm +  playnum;
				} else {
					var newText = document.createTextNode(defenses[tmp.f.defForm]);
					sorter = tmp.f.offName + tmp.f.offForm + tmp.f.defName + tmp.f.defForm +  playnum;
				}
				cell.appendChild(newText);
				
				var cell = row.insertCell(-1);
				var newText  = document.createTextNode(tmp.yards);
				cell.appendChild(newText);	
								
				var cell = row.insertCell(-1);
				var newText  = document.createTextNode(tmp.f.primaryPos);
				cell.appendChild(newText);	
				
				//if(tmp.yards > tmp.y || tmp.yards>10) {
				var cell = row.insertCell(-1);
				if(((tmp.d == 1 && (tmp.yards>=6 || tmp.yards>=tmp.y/2)) || (tmp.d == 2 && tmp.yards>=tmp.y/2) || (tmp.d == 3 && tmp.yards>=tmp.y-2 && tmp.yards>=1) || (tmp.yards >= tmp.y))) { // determines success rate
				//if(((tmp.d == 1 && tmp.yards>=tmp.y/4) || (tmp.d == 2 && tmp.yards>=tmp.y/3) || (tmp.d == 3 && tmp.yards>=tmp.y-2) || (tmp.yards >= tmp.y))) { // determines success rate
				//if(tmp.yards >= 3.5) { // determines success rate
					var newText  = document.createTextNode("1");
					cell.appendChild(newText);					
					row.className = "alternating_color2 pbp_team";
				} else {
					row.className = "alternating_color1 pbp_team";
				}
				
				var newcell = row.insertCell(-1);
				tmpdate = new Date(tmp.dateAdded);
				newcell.innerHTML= tmpdate.getMonth()+1 + "/" + tmpdate.getDate() + "/" + tmpdate.getFullYear() + " " + tmpdate.getHours() + ":" + ('0'+tmpdate.getMinutes()).slice(-2);
		   
				playArray[sorter]=row;
				keyArray.push(sorter);
			}
		}
	}
	
	keyArray.sort();
	//var bigtext = "";
	
	for(i in keyArray) {
	  tbody.appendChild(playArray[keyArray[i]]);
	}
	table.appendChild(tbody);
	if(autohighlight) {
		selectElementContents(tbody); // autohighlighter
	}
}

function makeTableRow(alternateColor) {
	var tr = document.createElement('tr');
	if (alternateColor == 0) {
		tr.className = "alternating_color1 pbp_team";
	} else {
		tr.className = "alternating_color2 pbp_team";
	}
	return tr;
}

function addCellTextToRow(row, cellText, colSpan) {
	var td = document.createElement('td');
	td.innerHTML = cellText;
	td.align = "center";
	td.colSpan = colSpan;
	row.appendChild(td);
}

function addCellElementToRow(row, cellElement, colSpan) {
	var td = document.createElement('td');
	td.appendChild(cellElement);
	td.align = "center";
	td.colSpan = colSpan;
	row.appendChild(td);
}

function changeGame(k) {
	for(i in savedData[k]['plays']) {
		newI = "x" + i;
		savedData[gameId]['plays'][newI] = savedData[k]['plays'][i];
	}
	startParsing();
	//dojo.query("#scoreboard")[0].style.display=null;
	dojo.query("#pbp")[0].style.display=null;
	refreshConstraintsList();
}


function selectElementContents(el) {
   var body = document.body, range, sel;
   if (body.createTextRange) {
       range = body.createTextRange();
       range.moveToElementText(el);
       range.select();
   } else if (document.createRange && window.getSelection) {
       range = document.createRange();
       range.selectNodeContents(el);
       sel = window.getSelection();
       sel.removeAllRanges();
       sel.addRange(range);
   }
}
