// ==UserScript==
// @name           	GLB Power Rankings V2.6GD
// @namespace      	goallineblitz.com
// @description    	This is a modified version of garrettfoster's second version of his power ranking script for GLB.  I added a W-L column and preformatted it for easy posting to the forums.
// @include        	http://goallineblitz.com/game/league.pl?league_id=*
// @version		2010.03.12
// @author		garrettfoster + Gongadan
// ==/UserScript==

//Basic script rundown
	//Signal to start script recieved from button
	//get the user input
	//gather the needed data
	//crunch the data
	//output the results

window.setTimeout( 
	function() {
		runPowerRankings();
	}, 
	60
);

// GLOBALS--Modify as needed
var debugging_on	= 0; // set to 1 to get a bunch of debugging crap you can copy into Excel
var preseasonGames	= 4; // how many games in the preseason?
var season		= 15; // what season number are we in?

//------------------------------------Build a button to send a start signal and checkboxes to gather user input
function runPowerRankings(){
	//locate an area to place the button
	var location = document.getElementById('conferences');

	// get the teams for the dropdown here.  We'll get these again later, but it doesn't take much effort
	var teamId = new Array();
	var teamName = new Array();
	var j=0;
	var i=0;
	for (i=1; i<34; i++) {
		if (i == 17)
			i++;

		var teamPage = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
		if (teamPage[0] == 'http://goallineblitz.com/game/league.pl?league_id') { // WORLD LEAGUE
			teamPage = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			teamName[j] = location.getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			teamName[j] = location.getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];
		j++;		
	}

	var Team1Select = document.createElement('select');
	Team1Select.id = 'Fantasy1';
	var blankop = document.createElement('option');
	blankop.value = 0;
	blankop.innerHTML = '';
	Team1Select.appendChild(blankop);

	var Team2Select = document.createElement('select');
	Team2Select.id = 'Fantasy2';
	var blankop2 = document.createElement('option');
	blankop2.value = 0;
	blankop2.innerHTML = '';
	Team2Select.appendChild(blankop2);

	for (i=0; i < j; i++) {
		var op = document.createElement('option');
		op.value = teamId[i];
		op.innerHTML = teamName[i];
		Team1Select.appendChild(op);
		var op2 = document.createElement('option');
		op2.value = teamId[i];
		op2.innerHTML = teamName[i];
		Team2Select.appendChild(op2);
	}

	//build a div to put in the location
	var div = document.createElement('div');
	div.setAttribute('id', 'rankings');

	//place the div
	location.parentNode.insertBefore(div, location);

	//horizontal rule to make things pretty
	var hr = document.createElement('hr');
	location.parentNode.insertBefore(hr, location);

	//locate the div to place the button and user input in
	location = document.getElementById('rankings');

	//build a div to store the input
	div = document.createElement('div');
	div.setAttribute('id', 'rankingInput');
	location.appendChild(div);

	//build a div to store the data temporarily
	div = document.createElement('div');
	div.setAttribute('id', 'rankingData');
	div.setAttribute("style","visibility: hidden; display:none;");
	location.appendChild(div);

	//build a div to store pages temporarily
	div = document.createElement('div');
	div.setAttribute('id', 'rankingTemp');
	div.setAttribute("style","visibility: hidden; display:none;");
	location.appendChild(div);

	//locate the div to place the button and user input in
	location = document.getElementById('rankingInput');

	//build and place the button
	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('id', 'startRankings');
	button.setAttribute('value', 'Get Rankings');
	button.addEventListener('click', getRankings, false);
	location.appendChild(button);

	button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('id', 'showOptions');
	button.setAttribute('name', '0');
	button.setAttribute('value', 'Show Options >>');
	button.addEventListener('click', showOptions, false);
	location.appendChild(button);

	div = document.createElement('div');
	div.setAttribute('id', 'rankingForm');
	div.setAttribute("style","visibility: hidden; display:none;");
	location.appendChild(div);

	rankingForm = document.getElementById('rankingForm');

	//build a form

	form = 	'<hr />' +
		'<p style="font-weight: bold;">Which part(s) of the season do you want to include?</p>' +
		'<p style="padding-left: 2%;">' +
			'<i>Note: Playoff games do not include post season scrimmages.</i><br />' +			
			'<input type="checkbox" class="seasonChk" />' +
			'<span style="padding-right: 1%;">Pre-Season</span>' +
			'<input type="checkbox" class="seasonChk" checked />' +
			'<span style="padding-right: 1%;">Regular Season</span>' +
			'<input type="checkbox" class="seasonChk" />' +
			'<span style="padding-right: 1%;">Playoffs</span>' +
		'</p>' +
		'<br />' +
		'<p>' +
			'<span style="font-weight: bold; padding-right: 1%;">' +
				'Do you want to consider pre-season, regular season, and playoff games to be equal?' +
			'</span>' +
			'<input type="radio" name="equalGames" class="equalGames" value="1" checked>Yes </input>' +
			'<input type="radio" name="equalGames" class="equalGames" value="0">No </input>' +
			'<span style="font-style: italic;"> (If no, then please specify how games should be weighted below)</span>' +
		'</p>' +
		'<p style="padding-left: 2%;">' +
			'<i>Note: A larger number indicates more importance or weight.</i><br />' +
			'<input id="preSeason" style="width: 10px;" type="text" value="1" /> Pre-Season<br />' +
			'<input id="regularSeason" style="width: 10px;" type="text" value="2" /> Regular Season<br />' +
			'<input id="playoffs" style="width: 10px;" type="text" value="4" /> Playoffs<br />' +
		'</p>' +
		'<br />' +
		'<p>' +
			'<span style="font-weight: bold; padding-right: 1%;">' +
				'Do you want recently played games to weigh more than an older game?' +
			'</span>' +
			'<input type="radio" class="includeMomentum" name="includeMomentum" value="1" >Yes </input>' +
			'<input type="radio" class="includeMomentum" name="includeMomentum" value="0" checked>No </input>' +
			'<span style="font-style: italic;"> (If yes, then please specify how games should be weighted below)</span>' +
		'</p>' +
		'<p style="padding-left: 2%;">' +
			'Make the past' +
			 '<input id="momentumSteps" style="width: 10px;" type="text" value ="4"/>' +			
			' games worth ' +
				'<input id="momentumMax" style="width: 10px;" type="text" value="2" />' +
			' times the oldest game.<br />' +
		'</p>' +
		'<br />' +
		'<p>' +
			'<span style="font-weight: bold; padding-right: 1%;">' +
				'Do you want to include team talent?' +
			'</span>' +
			'<input type="radio" class="talent" name="talent"value="1" >Yes </input>' +
			'<input type="radio" class="talent" name="talent" value="0" checked>No </input>' +
		'</p>' +
		'<p style="padding-left: 2%; font-style: italic;">' +
			'Note: This is helpful early in the season.' +
		'</p>' +
		'<br />' +
		'<p>' +
			'<span style="font-weight: bold; padding-right: 1%;">' +
				'Do you want to include the lifetime record of each team?' +
			'</span>' +
			'<input type="radio" class="history" name="history" value="1" >Yes </input>' +
			'<input type="radio" class="history" name="history" value="0" checked>No </input>' +
		'</p>' +
		'<p style="padding-left: 2%; font-style: italic;">' +
			'Note: This is helpful early in the season.' +
		'</p>' +		
		'<br />' +
		'<p>' +
			'<span style="font-weight: bold; padding-right: 1%;">' +
				'Do you want the results to be formatted for easy posting into the forums?' +
			'</span>' +
			'<input type="radio" class="forumformat" name="forumformat" value="1" checked>Yes </input>' +
			'<input type="radio" class="forumformat" name="forumformat" value="0">No </input>' +
		'</p>' +		
		'<p>' +
			'<span style="padding-left: 2%; font-style: italic; padding-right: 1%;">' +
				'Include team record next to team name in the predictions output?' +
			'</span>' +
			'<input type="radio" class="teamrecord" name="teamrecord" value="1">Yes </input>' +
			'<input type="radio" class="teamrecord" name="teamrecord" value="0" checked>No </input>' +
		'</p>' +
		'<br />' +
		'<p>' +
			'<span style="font-weight: bold; padding-right: 1%;">' +
				'Output next week\'s projected scores (only works from weeks 2-15)?' +
			'</span>' +
			'<input type="radio" class="matchups" name="matchups" value="1" checked>Yes </input>' +
			'<input type="radio" class="matchups" name="matchups" value="0">No </input>' +
		'</p>' +
		'<br />' +


		'<p>' +
			'<b>You may select two teams to calculate a fantasy matchup</b><br />' +
		'</p>' +
		'<p style="padding-left: 2%; font-style: italic;">' +
			'Note: Cross-conference matchups are harder to predict accurately.' +
		'</p>';


	rankingForm.innerHTML = form;		
	rankingForm.appendChild(Team1Select);
	rankingForm.appendChild(Team2Select);
			
}

function showOptions(){
	var state = document.getElementById('showOptions').name;
	if (state == 0){
		document.getElementById('rankingForm').setAttribute('style','');
		document.getElementById('showOptions').name = 1;
		document.getElementById('showOptions').value = 'Hide Options <<';
	}
	if (state == 1){
		document.getElementById('rankingForm').setAttribute('style','visibility: hidden; display:none;');
		document.getElementById('showOptions').name = 0;
		document.getElementById('showOptions').value = 'Show Options >>';
	}
};

//-------------------------------Main Function



function getRankings(){
	var userInput = new Array();
	getUserInput(userInput);
	gatherData(userInput);	
}



//-------------------------------First level Functions



function getUserInput(userInput){
	//User Input Key
	// 0 = pre-season
	// 1 = regular season
	// 2 = playoffs
	// 3 = Games are equal yes/no
	// 4 = pre-season weight
	// 5 = regular season weight
	// 6 = playoff weight
	// 7 = include momentum
	// 8 = mometum weight
	// 9 = momentum steps
	//10 = include talent
	//11 = include history
	//12 = preSeason length
	//13 = current season
	//14 = forum post formatted
	//15 = output matchups
	//16 = fantasy matchup teamId 1
	//17 = fantasy matchup teamId 2
	//18 = show team record in matchups

	for (var i=0; i<3; i++){
		if(document.getElementsByClassName('seasonChk')[i].checked == true){
			userInput[i] = 1;
		} else {
			userInput[i] = 0;
		}
	}
	
	if(document.getElementsByClassName('equalGames')[1].checked == true){
		userInput[3] = 0;
		userInput[4] = parseInt(document.getElementById('preSeason').value);
		userInput[5] = parseInt(document.getElementById('regularSeason').value);
		userInput[6] = parseInt(document.getElementById('playoffs').value);
	} else {
		userInput[3] = 1;
		userInput[4] = 1;
		userInput[5] = 1;
		userInput[6] = 1;
	}

	if(document.getElementsByClassName('includeMomentum')[0].checked == true){
		userInput[7] = 1;
		userInput[8] = parseInt(document.getElementById('momentumMax').value);
		userInput[9] = parseInt(document.getElementById('momentumSteps').value);
	} else {
		userInput[7] = 0;
		userInput[8] = 1;
		userInput[9] = 1;
	}

	if(document.getElementsByClassName('talent')[0].checked == true){
		userInput[10] = 1;
	} else {
		userInput[10] = 0;
	}

	if(document.getElementsByClassName('history')[0].checked == true){
		userInput[11] = 1;
	} else {
		userInput[11] = 0;
	}

	if(document.getElementsByClassName('forumformat')[0].checked == true){
		userInput[14] = 1;
	} else {
		userInput[14] = 0;
	}

	if(document.getElementsByClassName('teamrecord')[0].checked == true){
		userInput[18] = 1;
	} else {
		userInput[18] = 0;
	}

	if(document.getElementsByClassName('matchups')[0].checked == true){
		userInput[15] = 1;
	} else {
		userInput[15] = 0;
	}

	//set Pre-season length here (handles up to 4)
	userInput[12] = preseasonGames;

	//set current season number here
	userInput[13] = season;

	// set the two teams based on the dropdowns
	userInput[16] = parseInt(document.getElementById('Fantasy1').value);
	userInput[17] = parseInt(document.getElementById('Fantasy2').value);
}

function gatherData(userInput) {
	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput').innerHTML = '<span id="progress">Getting Rankings: 0%</span><span id="working">.</span>';	
	
	//build a table in rankingData
	location = document.getElementById('rankingData');
	
	var table = document.createElement('table');
	table.setAttribute('id', 'rankingDataTable');
	location.appendChild(table);
	
	location = document.getElementById('rankingDataTable');

	for(var i=0; i<32; i++){
		tr = document.createElement('tr');
		tr.style.borderStyle="solid";
		location.appendChild(tr);
		tr = location.getElementsByTagName('tr')[i];		
		for(var j=0; j<78; j++){
			var td = document.createElement('td');
			td.innerHTML = '';
			tr.appendChild(td);
		}
	}
				

	//----------fill the table with data	
	var teamId = new Array();	
	var j=0;
	//fill in the team name column and set the row id to the team id	
	for (var i=0; i<34; i++){
		if(i == 0 || i == 17){								
			i++;			
		}

		var teamPage = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2);
		if (teamPage[0] == "http://goallineblitz.com/game/league.pl?league_id") { // WORLD LEAGUE
			teamPage = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[5].firstChild.href.split('=', 2);
			var teamName = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[5].firstChild.innerHTML;
		} else {
			var teamName = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		}
		teamId[j] = teamPage[1];

		document.getElementById('rankingDataTable').getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed');

		j++;		

		updateProgress(userInput);
	}		

	//get team overall if needed
	if(userInput[10] == 1){
		for(var i=0; i<32; i++){
			getOverall(teamId[i], userInput);
			updateProgress(userInput);	
		}
	} else {
		for(var i=0; i<32; i++){			
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].setAttribute('class', 'completed');
			updateProgress(userInput);	
		}
	}

	//get historical data if needed
	if(userInput[11] == 1){
		for(var i=0; i<32; i++){
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].innerHTML = 0;
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].innerHTML = 0;			
			for(var j=1; j<userInput[13]; j++){
				getHistoricalRecord(teamId[i], j, userInput);
				updateProgress(userInput);
			}
			updateProgress(userInput);
		}
	} else {
		for(var i=0; i<32; i++){
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].setAttribute('class', 'completed');
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].setAttribute('class', 'completed');
			updateProgress(userInput);
		}
	}

	//figure out how many regular season games we need to look at
	var gamesPlayed = getGamesPlayed();
		
	for(var i=0; i<32; i++){
		getTeamPage(gamesPlayed, userInput, teamId[i], userInput);
	}		
}

function calculateResults(userInput){
	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput').innerHTML = "<p>Calculating Rankings<span id='working'>.</span></p>";

	var results = new Array();
	for(i=0; i<32; i++){
		results[i] = new Array();
		location = document.getElementById('rankingDataTable').getElementsByTagName('tr');
		results[i][0] = parseInt(location[i].id); //Team Id
		location = location[i].getElementsByTagName('td');		
		results[i][1] = location[0].innerHTML; //Team Name
		
		if(userInput[10] == 1){		
			results[i][2] = parseInt(location[1].innerHTML); //Overall
			results[i][3] = parseInt(location[4].innerHTML); //Chemistry		
			
			//calculate talent
			results[i][4] = results[i][2] - (100 - results[i][3])/10; //Computed Talent
		}
		
		if(userInput[11] == 1){
			//calculate historical winning %		
			var temp = parseInt(location[3].innerHTML)/parseInt(location[2].innerHTML); 
			results[i][5] = temp.toFixed(3); //Historical Winning %
		}

		results[i][6] = parseInt(location[5].innerHTML) - 1; //Last Game

		//calculate wins, losses, games, points
		var wins = 0;
		var losses = 0;
		var games = 0;
		var pointsFor = 0.0001;
		var pointsAlw = 0.0001;
		if(userInput[0] == 1){			
			for(var j=0; j<userInput[12]; j++){
				var k = 6 + 3*(j+4-userInput[12]);
				if(location[k].innerHTML != ''){
					games++;
					k++;					
					var score1 = parseInt(location[k].innerHTML);
					k++;
					var score2 = parseInt(location[k].innerHTML);
					if(score1 > score2){ 
						wins++;
					}
					if(score1 < score2){
						losses++;
					}
					pointsFor += score1;
					pointsAlw += score2;
				} else {

					j=4;
				}						
			}
		}
		if(userInput[1] == 1){
			for(var j=0; j<16; j++){
				var k = 18 + j*3;
				if(location[k].innerHTML != ''){
					games++;
					k++;					
					var score1 = parseInt(location[k].innerHTML);
					k++
					var score2 = parseInt(location[k].innerHTML);
					if(score1 > score2){
						wins++;
					}
					if(score1 < score2){
						losses++;
					}
					pointsFor += score1;
					pointsAlw += score2;
				} else {
					j=16;
				}						
			}
		}
		if(userInput[2] == 1){
			for(var j=0; j<4; j++){
				var k = 66 + j*3;
				if(location[k].innerHTML != ''){
					games++;
					k++;					
					var score1 = parseInt(location[k].innerHTML);
					k++
					var score2 = parseInt(location[k].innerHTML);
					if(score1 > score2){
						wins++;
					}
					if(score1 < score2){
						losses++;
					}
					pointsFor += score1;
					pointsAlw += score2;
				} else {
					j=4;
				}						
			}
		}
		results[i][7] = games; //total games played
		results[i][8] = wins; //total games won
		results[i][9] = losses; //total games lost
		results[i][10] = pointsFor; //total points for
		results[i][11] = pointsAlw; //total points allowed			
	}


	
	//put all the games in an array
	var games = new Array();
	for(i=0; i<32; i++){
		games[i] = new Array();
		for(var j=0; j<24; j++){		
			games[i][j] = new Array();			
			var k = 6 + 3*j;						
			games[i][j][0] = results[i][0]; //team1Id
			games[i][j][1] = document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML;//team2Id
			k++;
			games[i][j][2] = parseInt(document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML);//team1Score
			k++;
			games[i][j][3] = parseInt(document.getElementById(results[i][0]).getElementsByTagName('td')[k].innerHTML);//team2Score
		}
	}

	//calculate opponents points for and against, & SOR (overall, teams beaten, and teams lost to)
	for(i=0; i<32; i++){
		results[i][12] = 0; //--Opponents Points Allowed-- TEMP
		results[i][13] = 0; //--Opponents Points Scored-- TEMP
		results[i][14] = 0; //--Opponent Wins-- TEMP
		results[i][15] = 0; //--Opponent Games --TEMP
		results[i][16] = 0; //--Op Wins that you beat --TEMP
		results[i][17] = 0; //--Op Games that you beat --TEMP
		results[i][18] = 0; //--Op Wins that you lost to --TEMP
		results[i][19] = 0; //--Op Games that you lost to-- TEMP
		 
		for(var j=0; j<24; j++){
			oppTeam = games[i][j][1];
			if (oppTeam != ''){
				for (var k=0; k<32; k++){
					if (oppTeam == results[k][0]){
						results[i][12] += results[k][11];
						results[i][13] += results[k][10];
						results[i][14] += results[k][8];
						results[i][15] += results[k][7];
						if (games[i][j][2] > games[i][j][3]){ //you won 
							results[i][16] += results[k][8];
							results[i][17] += results[k][7];						
						}
						if (games[i][j][3] > games[i][j][2]) { //you lost
							results[i][18] += results[k][8];
							results[i][19] += results[k][7];
						}
					}
				} 
			}								
		}
		
		//write semi-permanent variables
		var temp = results[i][12]/results[i][15];
		results[i][12] = temp.toFixed(3); //Average Opponent Points Allw
		temp = results[i][13]/results[i][15];
		results[i][13] = temp.toFixed(3); //Average Opponent Points Scr
		temp = results[i][14]/results[i][15];
		results[i][14] = temp.toFixed(3); //SOR	(all opps win percentage)
		temp = results[i][16]/results[i][17];
		results[i][15] = temp.toFixed(3); //SOR (teams you beat) (defeated teams' win pcts)
		temp = results[i][18]/results[i][19];
		results[i][16] = temp.toFixed(3); //SOR (teams you lost to) (lost-to teams' win pcts)
		results[i][17] = results[i][10]/results[i][12]; //offensive efficiency
		results[i][18] = results[i][11]/results[i][13];	//defensive efficiency
	}
	
	//calculate raw game grades
	for(var i=0; i<32; i++){ //each team
		for(var j=0; j<24; j++){ //each game
			if(games[i][j][1] != ''){
				for(var k=0; k<32; k++){ //find opponent
					if(games[i][j][1] == results[k][0]){ //once opponent is found
						var expected1 = ((results[i][10]/results[i][7])+(results[k][11]/results[k][7]))/2;
						var expected2 = ((results[k][10]/results[k][7])+(results[i][11]/results[i][7]))/2;
						if (expected1 > 255)
							expected1 = 255;
						if (expected2 > 255)
							expected2 = 255;
						//compare actual to expected
						var oGrade = (games[i][j][2]/expected1)-1;
						var dGrade = 1-(games[i][j][3]/expected2); 
						if (oGrade > 1)
							oGrade = 1;
						if (dGrade < -1)
							dGrade = -1;

						if(games[i][j][2] > games[i][j][3]){ //you won
							var grade = .67 + (oGrade)/4 + (dGrade)/4;
							
						} else if(games[i][j][2] < games[i][j][3]){ //you lost
							var grade = .33 + (oGrade)/4 + (dGrade)/4;
						
						} else { //you tied
							var grade = .5 + (oGrade)/4 + (dGrade)/4;
						}
						if(grade > 1)
							grade = 1;
						if(grade < 0)
							grade = 0;
//						if (debugging_on)
//							console.log(results[i][1] + ' v. ' + results[k][1] + '\nexpected: ' + expected1 + ' - ' + expected2 + '\nactual: ' + games[i][j][2] + ' - ' + games[i][j][3] + '\nograde: ' + oGrade + ' dgrade: ' + dGrade + ' grade: ' + grade);
					
						games[i][j][2] = oGrade; //oGrade
						games[i][j][3] = dGrade; //dGrade
						games[i][j][4] = grade; //Grade
						k = 32;
					}
				}
			}	
		}
	}
	
	var momentum = new Array();
	
	for (var i = 0; i < 32; i++) {
		momentum[i] = new Array();
		for (var j = 0; j < 24; j++) {
			momentum[i][j] = 1;
		}
	}
		
	//set up modifiers for momentum if needed
	if(userInput[7] == 1){
		for(var i=0; i<32; i++){			
			for(var j=results[i][6]; j>(results[i][6]-userInput[9]); j--){
				momentum[i][j] *= userInput[8];							
			}		
		}
	}
	
	if(userInput[3] == 0){
		for(var i=0; i<32; i++){			
			for(var j=0; j<4; j++){
				momentum[i][j] *= userInput[4];							
			}
			for(var j=4; j<20; j++){
				momentum[i][j] *= userInput[5];							
			}
			for(var j=20; j<21; j++){
				momentum[i][j] *= userInput[6];							
			}		
		}
	}

	//---------------------round robin-----------------------------
	
	for(var i=0; i<32; i++){
		pf = 0;
		pa = 0;
		rrw = 0;		
		for(var j=0; j<32; j++){
			if(results[i][0] != results[j][0]){
				temp1 = (((results[i][10]/results[i][7])*results[j][18])+((results[j][11]/results[j][7])*results[i][17]))/2;
				temp2 = (((results[j][10]/results[j][7])*results[i][18])+((results[i][11]/results[i][7])*results[j][17]))/2;
				pf += temp1;
				pa += temp2;
				if(temp1 > temp2){
					rrw++;
				}
			}			
		}
		results[i][24] = pf;
		results[i][25] = pa;
		results[i][30] = rrw/31;
	}	
	
	//---------------------elo time--------------------------------
	
	//get total game grade (ie record) for each team
	for (var i = 0; i < 32; i++) { //each team
		results[i][19] = 0; //initialize team rating
	}
	
	//elo
	done=0;
	i=0;
	do {
		done++;
		do {	
			diff = getDiff(i, results, games);
			if(Math.abs(diff) > .5) {
				done = 0;
				results[i][19] += diff;				
			}
		} while (diff > .5)
		if(i==31){
			i=0;
		} else {
			i++;
		}
		updateIcon();		
	} while (done < 32)
	
	function getDiff(i, results, games){
		diff=0;
		rating=0;
		for (var j=0; j < 24; j++) { //each game
			if(games[i][j][1] != ''){
				for (var k = 0; k < 32; k++) { //find opponent rating
					if(games[i][j][1] == results[k][0]){
						rating=results[k][19];
						k=32;
					}			
				}
				temp = results[i][19] - rating;
				if (temp > 50) {
					temp = 50;
				} else if(temp < -50) {
					temp = -50;
				}
				diff += (games[i][j][4] - ((temp/100)+.5))*momentum[i][j];
			}
		}
		return diff;
	}

	
	//--------------------------elo done -----------

	//calculate ovr, off, and def score
//	for(var i=0; i<32; i++){
//		results[i][24] = 0; //offScore
//		results[i][25] = 0; //defScore
//		for(var j=0; j<24; j++){
//			if(games[i][j][1] == ''){
//			} else {
//				results[i][19] += games[i][j][4] * momentum[i][j];				
//				results[i][24] += games[i][j][2] * momentum[i][j];
//				results[i][25] += games[i][j][3] * momentum[i][j];
//			}
//		}
//	}
	
	//calculate overall rank
	for (i = 0; i < 32; i++) {
			results[i][20] = .75*(results[i][19]+50);
	}
	
	if (userInput[10] == 1) {
		for (i = 0; i < 32; i++) {
			results[i][20] += .2 * ((results[i][4] / 70) * 100);
		}
	}
	
	if(userInput[11]==1){
		for (i = 0; i < 32; i++) {
			results[i][20] += .5 * (results[i][5] * 100);
		}
	}
	
	//define rank
	for (var i=0; i<32; i++){
		results[i][21] = 1; //overall rank
		results[i][22] = 1; //offense rank
		results[i][23] = 1; //defense rank
		for (var j = 0; j < 32; j++) {
			if (results[i][0] != results[j][0]) {  //don't compare to yourself
				if (results[i][20] < results[j][20]) {
					results[i][21]++;
				}
				if(results[i][24] < results[j][24]){
					results[i][22]++;
				}
				if(results[i][25] > results[j][25]){
					results[i][23]++;
				}
			}
		}		
	}
	
	//sort ranks
	var output = new Array();
	for (var i=0; i<32; i++){
		output[i]=new Array();
	}
	
	for(var i=0; i<32; i++){
		var temp = 33;
		var rank = 33;
		for(var j=0; j<32; j++){
			if (rank > results[j][21]){
				temp = j;
				rank= results[j][21];
			}
		}
		output[i] = results[temp];
		output[i][26] = results[temp][21];		
		results[temp][21]=33;
	}
	
	outputResults(userInput, output);
	if (userInput[15]) { // if they want to see matchups
		if (userInput[0]) { // if we're counting preseason
			if ((results[0][7]>0) && (results[0][7]< (16+userInput[12]))) // season's started but not over yet!
				outputMatchups(userInput, results, games);
		} else { // not counting preseason
			if ((results[0][7]>0) && (results[0][7]<16)) // season's started but not over yet!
				outputMatchups(userInput, results, games);
		}
	}
	if (userInput[16] && userInput[17])
		outputFantasyMatchup(userInput,results,games);
}

function getRecord(includePreseason, resultsLine) {
	var record = resultsLine[8] + '-' + resultsLine[9];
	var ties = ( 1 + resultsLine[6] - resultsLine[8] - resultsLine[9] );
	if (!includePreseason) // include preseason in W-L-T
		ties = ( ties - preseasonGames );
	if (ties)
		record += '-' + ties;
	return record;
}

function outputResults(userInput, output){
	var teamRecord;
	var html = '';
	if (userInput[14]) {
		html = '<table><tr>' +
					'<th>[u]Rnk[/u]</th>' +
					'<td>.....</td>' +
					'<th>[u]Off[/u]</th>' +
					'<td>.....</td>' +
					'<th>[u]Def[/u]</th>' +
					'<td>....</td>' +
					'<th>[u]SoS[/u]</th>' +
					'<td>...........</td>' +
					'<td>[u]W-L-T[/u]...</td>' +
					'<th>[u]Team[/u]</th>';
	} else {
		html = '<table><tr>' +
					'<th><u>Rnk</u></th>' +
					'<td>&nbsp;</td>' +
					'<th><u>Off</u></th>' +
					'<td>&nbsp;</td>' +
					'<th><u>Def</u></th>' +
					'<td>&nbsp;</td>' +
					'<th><u>SoS</u></th>' +
					'<td>&nbsp;</td>' +
					'<td><u>W-L-T</u></td>' +
					'<th><u>Team</u></th>';
	}
	if (debugging_on==1) {
		html += '<td>last gm</td>';
		html += '<td>games</td>';
		html += '<td>win</td>';
		html += '<td>loss</td>';
		html += '<td>PF</td>';
		html += '<td>PA</td>';
		html += '<td>Opp Avg PA</td>';
		html += '<td>Opp Avg PF</td>';
		html += '<td>Opp Win pct</td>';
		html += '<td>Def Opp Win pct</td>';
		html += '<td>lost-to Opp win pct</td>';
		html += '<td>PF / OppAvgPA</td>';
		html += '<td>PA / Opp Avg PF</td>';
		html += '<td>Team Rating</td>';
		html += '<td>Raw Rank</td>';
		html += '<td>Overall Rank</td>';
		html += '<td>Off Rank</td>';
		html += '<td>Def Rank</td>';
		html += '<td>pf rr</td>';
		html += '<td>pa rr</td>';
		html += '<td>overall rank output</td>';
		html += '<td>rrw / 31</td>';
	}

	html += '</tr>';
	for(var i=0; i<32; i++){
		html += '<tr><td>' + output[i][26];
		if (userInput[14] && output[i][26] < 10)
			html += '..';
		html += '</td><td>......';
		if (userInput[14] && output[i][22] < 10)
			html += '..';
		html += '</td><td>' + output[i][22] + '</td><td>......';
		if (userInput[14] && output[i][23] < 10)
			html += '..';
		html += '</td><td>' + output[i][23] + '</td><td>........</td>' +
						'<td>' + output[i][14] + '</td>' + //14
						'<td>........</td>';
		teamRecord = getRecord(userInput[0],output[i]);
		html += '<td>' + teamRecord;
		if (userInput[14] && teamRecord.length < 6) // justifying for length
			html += '..';
		if (userInput[14] && teamRecord.length < 5)
			html += '..';
		if (userInput[14] && teamRecord.length < 4)
			html += '..';
		html += '</td><td>' + output[i][1] + '</td>';
		if (debugging_on==1) {
			for (var jj=6; jj<27; jj++)
				html += '<td>' + output[i][jj] + '</td>';
			html += '<td>' + output[i][30] + '</td>';
		}
		html += '</tr>';
	}
	
	html += '</table>';
	
	
	location = document.getElementById('rankings');
	location.innerHTML = html;
	
	//build table	
}

function output_a_prediction(resultLine1, resultLine2, userInput) {
	var expected1 = resultLine1[10] / resultLine1[7]; 	// T1 avg PF
	expected1 *= resultLine2[11] / resultLine2[7]; 		// T2 avg PA
	expected1 /= Math.sqrt(resultLine1[12] * resultLine2[13]);		// geometric mean of T1 OppAvgPA and T2 OppAvgPF
	if (expected1 > 255)
		expected1 = 255;
	var expected2 = resultLine2[10] / resultLine2[7]; 	// T2 avg PF
	expected2 *= resultLine1[11] / resultLine1[7]; 		// T1 avg PA
	expected2 /= Math.sqrt(resultLine2[12] * resultLine1[13]);		// geometric mean of T2 OppAvgPA and T1 OppAvgPF
	if (expected2 > 255)
		expected2 = 255;

	// pick a winner and loser
	if (expected2 > expected1) {
		var Winner = resultLine2;
		var Loser = resultLine1;
		var wScore = expected2;
		var lScore = expected1;
	} else {
		var Winner = resultLine1;
		var Loser = resultLine2;
		var wScore = expected1;
		var lScore = expected2;
	}

	// people always complain about teams showing 1 point.  Frankly 2 points is unlikely too,
	// as are 4, 5, and 8 (in GLB).  I just get rid of 1, 4 and 5, and make 2 unlikely.
	if (wScore < 2.0)
		wScore = 0.0;
	if (lScore < 2.0)
		lScore = 0.0;

	// may as well get rid of 4 & 5 too
	if (wScore.toFixed(0)==4 || wScore.toFixed(0)==5) {
		if (wScore < 4.5)
			wScore = 3.0;
		else
			wScore = 6.0;
	}
	if (lScore.toFixed(0)==4 || lScore.toFixed(0)==5) {
		if (lScore < 4.5)
			lScore = 3.0;
		else
			lScore = 6.0;
	}

	// output
	var html = '<table><tr><td>';
	wScore = wScore.toFixed(0);
	lScore = lScore.toFixed(0);
	// output the predicted score
	if (userInput[14] && wScore < 100)
		html += '&amp;nbsp;&amp;nbsp;'
	if (userInput[14] && wScore < 10)
		html += ' &amp;nbsp;'
	html += wScore + ' - ';
	if (userInput[14] && lScore < 100)
		html += '&amp;nbsp;&amp;nbsp;'
	if (userInput[14] && lScore < 10)
		html += ' &amp;nbsp;'
	html += lScore;
	if (userInput[14])
		html += '&amp;nbsp; &amp;nbsp;';
	html += '</td>';
	html += '<td>' + Winner[1];
	if (userInput[18])
		html += ' (' + getRecord(userInput[0],Winner) + ')';
	if (wScore == lScore)
		html += ' ties ';
	else
		html += ' def. ';
	html += Loser[1];
	if (userInput[18])
		html += ' (' + getRecord(userInput[0],Loser) + ')';
	html += '</td></tr></table>';
	location = document.getElementById('rankings');
	location.innerHTML += html;
}

function outputMatchups(userInput, results, games) {
	var html = '<br><br>';
	if (userInput[14]) {
		html += '<p>[b]NEXT WEEK\'S MATCHUPS[/b]</p>';
		html += '<table><tr><td>[u]Exp Score[/u]</td><td>&amp;nbsp;[u]Matchup[/u]</td></tr></table>';
	} else {
		html += '<p><b>NEXT WEEK\'S MATCHUPS</b></p>';
		html += '<table><tr><td><u>Exp Score</u></td><td><u>Matchup</u></td></tr></table>';
	}
	location = document.getElementById('rankings');
	location.innerHTML += html;
	for(var i=0; i<32; i++){ //each team
		// next game
		var j = results[i][6]+1;
		if(games[i][j][3] != '') { // 3 is opponent if the game hasn't been played yet
			for(var k=i+1; k<32; k++){ //find opponent
				if(games[i][j][3] == results[k][0]){ //once opponent is found
					output_a_prediction(results[i],results[k],userInput);
					k=32;
				}
			}
		}
	}
}

function outputFantasyMatchup(userInput, results, games) {
	var team1Id = userInput[16];
	var team2Id = userInput[17];
	var html = '<br><br>';
	if (userInput[14]) {
		html += '<p>[b]FANTASY MATCHUP[/b]</p>';
		html += '<table><tr><td>[u]Exp Score[/u]</td><td>&amp;nbsp;[u]Matchup[/u]</td></tr></table>';
	} else {
		html += '<p><b>FANTASY MATCHUP</b></p>';
		html += '<table><tr><td><u>Exp Score</u></td><td><u>Matchup</u></td></tr></table>';
	}

	// make sure not same team
	if (team1Id == team2Id)
		html+= '<tr><td>ERROR:  Please select two different teams</tr></td>';
	else {
		// find team1
		for(var i=0; i<33 && results[i][0] != team1Id; i++)
			;
		if (i==32)
			html += '<tr><td>ERROR:  Team 1 not found</tr></td>';

		// find team2
		for(var j=0; j<33 && results[j][0] != team2Id; j++)
			;
		if (j==32)
			html += '<tr><td>ERROR:  Team 2 not found</tr></td>';

	}
	location = document.getElementById('rankings');
	location.innerHTML += html;

	if (i < 32 && j < 32 && (team1Id!=team2Id))
		output_a_prediction(results[i],results[j],userInput);
}


//----------------------------------Supporting Functions



function getOverall(teamId, userInput){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://goallineblitz.com/game/compare_teams.pl?team1=' + teamId + '&team2=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response){
				document.getElementById('rankingTemp').innerHTML = response.responseText;
				var overall = document.getElementById('rankingTemp').getElementsByClassName('rating_bar_fill')[0].innerHTML; 		

				document.getElementById(teamId).getElementsByTagName('td')[1].innerHTML = overall;
				document.getElementById(teamId).getElementsByTagName('td')[1].setAttribute('class', 'completed');
				updateProgress(userInput);
			}
	});	
}

function updateProgress(userInput){
	updateIcon();
	var progress = document.getElementsByClassName('completed');
	var denom = 2496 - 3*32*(4-userInput[12]);
	document.getElementById('progress').innerHTML = 'Getting Rankings: ' + parseInt((progress.length/denom)*100) + '%';
	if(progress.length == denom){ 
		calculateResults(userInput);
	}
}

function updateIcon(){
	working = document.getElementById('working');
	switch(working.innerHTML){
		case '.': working.innerHTML = '..'; break;
		case '..': working.innerHTML = '...'; break;
		case '...': working.innerHTML = '....'; break;
		case '....': working.innerHTML = '.....'; break;
		case '.....': working.innerHTML = '......'; break;
		case '......': working.innerHTML = '.......'; break;
		case '.......': working.innerHTML = '........'; break;
		case '........': working.innerHTML = '.........'; break;
		default : working.innerHTML = '.'; break;		
	}
}

function getGamesPlayed(){
	record = document.getElementById('conferences').getElementsByTagName('tr')[1].childNodes[5].innerHTML;
	var a = parseInt(record.split('-', 3)[0]);
	var b = parseInt(record.split('-', 3)[1]);
	var c = parseInt(record.split('-', 3)[2]);
	var dataLength = (a + b + c);
	return dataLength;
}

function getHistoricalRecord(teamId, season, userInput){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://goallineblitz.com/game/team.pl?season=' + season + '&team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response){
				document.getElementById('rankingTemp').innerHTML = response.responseText;
				var record = document.getElementById('team_record').innerHTML.split(': ', 2)[1];

				var wins = parseInt(record.split('-', 3)[0]);
				var losses = parseInt(record.split('-', 3)[1]);
				var ties = parseInt(record.split('-', 3)[2]);
				var games = parseInt(wins + losses + ties);

				games = parseInt(games + parseInt(document.getElementById(teamId).getElementsByTagName('td')[2].innerHTML));
				wins = parseInt(wins + parseInt(document.getElementById(teamId).getElementsByTagName('td')[3].innerHTML));

				document.getElementById(teamId).getElementsByTagName('td')[2].innerHTML = games;
				document.getElementById(teamId).getElementsByTagName('td')[2].setAttribute('class', 'completed');
				
				document.getElementById(teamId).getElementsByTagName('td')[3].innerHTML = wins;
				document.getElementById(teamId).getElementsByTagName('td')[3].setAttribute('class', 'completed');
				
				updateProgress(userInput);
			}
	});	
}

function getTeamPage(gamesPlayed, userInput, teamId){
	GM_xmlhttpRequest({ 
			method: 'GET',
			url: 'http://goallineblitz.com/game/team.pl?team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response){
				document.getElementById('rankingTemp').innerHTML = response.responseText;
				location = document.getElementById('rankingTemp');				
				var scheduleContent = location.getElementsByClassName('schedule_content');
				var gameCount=(4-userInput[12]);

				//getting team chemistry if needed
				if(userInput[10] == 1){
					var chemistry = parseInt(location.getElementsByClassName('rating_bar_fill')[0].innerHTML);

					document.getElementById(teamId).getElementsByTagName('td')[4].innerHTML = chemistry;
					document.getElementById(teamId).getElementsByTagName('td')[4].setAttribute('class', 'completed');
				} else {
					document.getElementById(teamId).getElementsByTagName('td')[4].innerHTML = '';
					document.getElementById(teamId).getElementsByTagName('td')[4].setAttribute('class', 'completed');
				}
				
				//get pre-season games if needed				
				if(userInput[0] == 1){					
					var section = parseInt(scheduleContent.length - 1); //this tells me which section to look
					for (var i=0; i<userInput[12]; i++){
						var j = 2 + 2*i;
						var k = 6 + 3*(i+4-userInput[12]);
						var location = scheduleContent[section].childNodes[1].childNodes[j].childNodes[5].childNodes[0];
						if (location.innerHTML != 'Matchup'){
							var gameId = location.href.split('game_id=', 2)[1];
						} else {
							var gameId = '';
						}
						if (gameId != ''){ 					
							var team2Id = location.parentNode.parentNode.childNodes[3].lastChild.href.split('=', 2)[1]; 
							var team1Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[0]);
							var team2Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[1]);
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Id;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team1Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							gameCount++;
						} else {
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						}
						updateProgress(userInput);
					}				
				} else {
					for (var i=0; i<userInput[12]; i++){
						var k = 6 + 3*(i+4-userInput[12]);
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						updateProgress(userInput);
					}					
				}
				
				//load regular season data << this is the default
				var section = 0; //this tells me which section to look				
				if(userInput[1] == 1){			
					gameCount=4;					
					for (var i=0; i<16; i++){
						var j = 2 + 2*i;
						var k = 18 + 3*i;
						var location = scheduleContent[section].childNodes[1].childNodes[j].childNodes[5].childNodes[0];
						if (location.innerHTML != 'Matchup'){ 
							var gameId = location.href.split('game_id=', 2)[1];
						} else {
							var gameId = '';
						}
						if (gameId != ''){					
							var team2Id = location.parentNode.parentNode.childNodes[3].lastChild.href.split('=', 2)[1]; 
							var team1Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[0]);
							var team2Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[1]);
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Id;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team1Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							gameCount++;
						} else {
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							var team2Id = location.parentNode.parentNode.childNodes[3].lastChild.href.split('=', 2)[1]; 
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Id; // save this here for next matchup
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						}
						updateProgress(userInput);
					}
				} else {
					for (var i=0; i<16; i++){
						var k = 18 + 3*i;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						updateProgress(userInput);
					}					
				}

				//load the playoff data
				if (userInput[2] == 1 && scheduleContent.length == 3){				
					gameCount = 20;					
					var section = 1;
					for (var i=0; i<4; i++){
						var j = 2 + 2*i;
						var k = 66 + 3*i;
						if (scheduleContent[section].childNodes[1].childNodes.length > j) {
							var location = scheduleContent[section].childNodes[1].childNodes[j].childNodes[5].childNodes[0];
							if (location && location.innerHTML != 'Matchup'){ 
								var gameId = location.href.split('game_id=', 2)[1];
							} else {
								var gameId = '';
							}
						} else {
							var gameId = '';
						}
						if (gameId != ''){					
							var team2Id = location.parentNode.parentNode.childNodes[3].lastChild.href.split('=', 2)[1]; 
							var team1Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[0]);
							var team2Score = parseInt(location.innerHTML.split(' ', 2)[1].split('-', 2)[1]);
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Id;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team1Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = team2Score;
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							gameCount++;
						} else {
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
							k++;
							document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
							document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						}
						updateProgress(userInput);
					}
				} else {
					for (var i=0; i<4; i++){
						var k = 66 + 3*i;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						k++;
						document.getElementById(teamId).getElementsByTagName('td')[k].innerHTML = '';
						document.getElementById(teamId).getElementsByTagName('td')[k].setAttribute('class', 'completed');
						updateProgress(userInput);
					}
				}

				//write the gameCount to the table
				document.getElementById(teamId).getElementsByTagName('td')[5].innerHTML = gameCount;
				document.getElementById(teamId).getElementsByTagName('td')[5].setAttribute('class', 'completed');
				updateProgress(userInput);
				if (debugging_on)
					console.log("updateProgress:  finished getTeamPage for " + teamId);
			}
	});
}
