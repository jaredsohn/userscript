// ==UserScript==
// @name           	GLB Power Rankings V2 (pabst edit)
// @namespace      	goallineblitz.com
// @description    	This is the second version of my power ranking script for GLB. This version gives the user more control over how the rankings are calculated.  Edited by pabst to work on conference pages.
// @include        	http://goallineblitz.com/game/league.pl?league_id=*
// @version		2009.11.14
// @author		garrettfoster, pabst
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



//------------------------------------Build a button to send a start signal and checkboxes to gather user input



function runPowerRankings(){
	//locate an area to place the button
	var location = document.getElementById('conferences');

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
			'<input type="checkbox" class="seasonChk" checked="true"/>' +
			'<span style="padding-right: 1%;">Regular Season</span>' +
			'<input type="checkbox" class="seasonChk" checked="true"/>' +
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
		'</p>';		

	rankingForm.innerHTML = form;		
			
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
	//0 = pre-season
	//1 = regular season
	//2 = playoffs
	//3 = Games are equal yes/no
	//4 = pre-season weight
	//5 = regular season weight
	//6 = playoff weight
	//7 = include momentum
	//8 = mometum weight
	//9 = momentum steps
	//10 = include talent
	//11 = include history
	//12 = preSeason length
	//13 = current season

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

	//set Pre-season length here (handles up to 4)
	userInput[12] = 3;

	//set current season number here
	userInput[13] = 10;
}

var teamLength = document.getElementsByClassName("conference").length*16;

function gatherData(userInput){
	
	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput').innerHTML = '<span id="progress">Getting Rankings: 0%</span><span id="working">.</span>';	
	
	//build a table in rankingData
	location = document.getElementById('rankingData');
	
	var table = document.createElement('table');
	table.setAttribute('id', 'rankingDataTable');
	location.appendChild(table);
	
	location = document.getElementById('rankingDataTable');

	for(var i=0; i<teamLength; i++){
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
	for (var i=0; i<document.getElementsByClassName("conference").length*17; i++){
		if(i == 0 || i == 17){								
			i++;			
		}

		teamId[j] = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[3].firstChild.href.split('=', 2)[1];
		var teamName = document.getElementById('conferences').getElementsByTagName('tr')[i].childNodes[3].firstChild.innerHTML;
		document.getElementById('rankingDataTable').getElementsByTagName('tr')[j].id = teamId[j];
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
		document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed');

		j++;		

		updateProgress(userInput);			
	}		

	//get team overall if needed
	if(userInput[10] == 1){
		for(var i=0; i<teamLength; i++){
			getOverall(teamId[i], userInput);
			updateProgress(userInput);	
		}
	} else {
		for(var i=0; i<teamLength; i++){			
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[1].setAttribute('class', 'completed');
			updateProgress(userInput);	
		}
	}

	//get historical data if needed
	if(userInput[11] == 1){
		for(var i=0; i<teamLength; i++){
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].innerHTML = 0;
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].innerHTML = 0;			
			for(var j=1; j<userInput[13]; j++){
				getHistoricalRecord(teamId[i], j, userInput);
				updateProgress(userInput);
			}
			updateProgress(userInput);
		}
	} else {
		for(var i=0; i<teamLength; i++){
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[2].setAttribute('class', 'completed');
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].innerHTML = '';
			document.getElementById(teamId[i]).getElementsByTagName('td')[3].setAttribute('class', 'completed');
			updateProgress(userInput);
		}
	}
		

	//figure out how many regular season games we need to look at
	var gamesPlayed = getGamesPlayed();
		
	for(var i=0; i<teamLength; i++){
		getTeamPage(gamesPlayed, userInput, teamId[i], userInput);
	}		
}

function calculateResults(userInput){
	//clear the rankingInput and give the user progress feedback
	document.getElementById('rankingInput').innerHTML = "<p>Calculating Rankings<span id='working'>.</span></p>";

	var results = new Array();
	for(i=0; i<teamLength; i++){
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
	for(i=0; i<teamLength; i++){
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
	for(i=0; i<teamLength; i++){
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
			if (oppTeam == ''){
			} else {			
				for (var k=0; k<teamLength; k++){
					if (oppTeam == results[k][0]){
						if (games[i][j][2] > games[i][j][3]){ //you won 
							results[i][14] = results[i][14] + results[k][8];
							results[i][15] = results[i][15] + results[k][7];
							results[i][16] = results[i][16] + results[k][8];
							results[i][17] = results[i][17] + results[k][7];						
						}
						if (games[i][j][3] > games[i][j][2]) { //you lost
							results[i][14] = results[i][14] + results[k][8];
							results[i][15] = results[i][15] + results[k][7];
							results[i][18] = results[i][18] + results[k][8];
							results[i][19] = results[i][19] + results[k][7];
						}
						results[i][12] = results[i][12] + results[k][11];
						results[i][13] = results[i][13] + results[k][10];
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
		results[i][14] = temp.toFixed(3); //SOR	
		temp = results[i][16]/results[i][17];
		results[i][15] = temp.toFixed(3); //SOR (teams you beat)
		temp = results[i][18]/results[i][19];
		results[i][16] = temp.toFixed(3); //SOR (teams you lost to)
		results[i][17] = results[i][10]/results[i][12]; //offensive efficiency
		results[i][18] = results[i][11]/results[i][13];	//defensive efficiency
	}
	
	//calculate raw game grades
	for(var i=0; i<teamLength; i++){ //each team
		for(var j=0; j<24; j++){ //each game
			if(games[i][j][1] == ''){
			} else {			
				for(var k=0; k<teamLength; k++){ //find opponent
					if(games[i][j][1] == results[k][0]){ //once opponent is found
						var expected1 = (((results[i][10]/results[i][7])*results[k][18])+((results[k][11]/results[k][7])*results[i][17]))/2;
						var expected2 = (((results[k][10]/results[k][7])*results[i][18])+((results[i][11]/results[i][7])*results[k][17]))/2;
					
						//compare actual to expected
						var oGrade = (games[i][j][2]/expected1)-1;
						var dGrade = 1-(games[i][j][3]/expected2); 
	
						if(games[i][j][2] > games[i][j][3]){ //you won
							var grade = .67 + (oGrade)/4 + (dGrade)/4;
							
						} else if(games[i][j][2] < games[i][j][3]){ //you lost
							var grade = .33 + (oGrade)/4 + (dGrade)/4;
						
						} else { //you tied
							var grade = .5 + (oGrade)/4 + (dGrade)/4;
							if(grade > 1){grade = 1;}
							if(grade < 0){grade = 0;}
						}
					
						games[i][j][2] = oGrade; //oGrade
						games[i][j][3] = dGrade; //dGrade
						games[i][j][4] = grade; //Grade
						//console.log('team: ' + results[i][1] + ' ograde: ' + games[i][j][2] + ' dgrade: ' + games[i][j][3] + ' grade: ' + games[i][j][4]);

						k = teamLength;
					}
				}
			}	
		}
	}
	
	var momentum = new Array();
	
	for (var i = 0; i < teamLength; i++) {
		momentum[i] = new Array();
		for (var j = 0; j < 24; j++) {
			momentum[i][j] = 1;
		}
	}
		
	//set up modifiers for momentum if needed
	if(userInput[7] == 1){
		for(var i=0; i<teamLength; i++){			
			for(var j=results[i][6]; j>(results[i][6]-userInput[9]); j--){
				momentum[i][j] *= userInput[8];							
			}		
		}
	}
	
	if(userInput[3] == 0){
		for(var i=0; i<teamLength; i++){			
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
	
	for(var i=0; i<teamLength; i++){
		pf = 0;
		pa = 0;
		rrw = 0;		
		for(var j=0; j<teamLength; j++){
			if(results[i][0] == results[j][0]){
			} else {			
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
		results[i][30] = rrw/(teamLength-1);
	}	
	
	//---------------------elo time--------------------------------
	
	//get total game grade (ie record) for each team
	for (var i = 0; i < teamLength; i++) { //each team
		results[i][19] = 0; //initialize team rating
	}
	
	//elo
	done=0;
	i=0;
	do{
		done++;
		do{	
			diff = getDiff(i, results, games);
			if(Math.abs(diff) > 0.01){
				done = 0;
				results[i][19] += diff;				
			}
		}while(diff > 0.01)
		if(i==teamLength-1){
			i=0;
		} else {
			i++;
		}
		updateIcon();		
	}while(done < teamLength)
	
	function getDiff(i, results, games){
		diff=0;
		rating=0;
		for (var j=0; j < 24; j++) { //each game
			if(games[i][j][1] == ''){
			} else {
				for (var k = 0; k < teamLength; k++) { //find opponent rating
					if(games[i][j][1] == results[k][0]){
						rating=results[k][19];
						k=teamLength;
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
	for (i = 0; i < teamLength; i++) {
			results[i][20] = .75*(results[i][19]+50);
	}
	
	if (userInput[10] == 1) {
		for (i = 0; i < teamLength; i++) {
			results[i][20] += .2 * ((results[i][4] / 70) * 100);
		}
	}
	
	if(userInput[11]==1){
		for (i = 0; i < teamLength; i++) {
			results[i][20] += .5 * (results[i][5] * 100);
		}
	}
	
	//define rank
	for (var i=0; i<teamLength; i++){
		results[i][21] = 1; //overall rank
		results[i][22] = 1; //offense rank
		results[i][23] = 1; //defense rank
		for (var j = 0; j < teamLength; j++) {
			if (results[i][0] == results[j][0] && j != (teamLength-1)) {
				j++;
			} //don't compare to yourself
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
	
	//sort ranks
	var output = new Array();
	for (var i=0; i<teamLength; i++){
		output[i]=new Array();
	}
	
	for(var i=0; i<teamLength; i++){
		
		var temp = teamLength+1;
		var rank = teamLength+1;
		for(var j=0; j<teamLength; j++){
			if (rank > results[j][21]){
				temp = j;
				rank= results[j][21];
			}
		}
		output[i] = results[temp];
		output[i][26] = results[temp][21];		
		results[temp][21]=teamLength+1;
	}
	
	outputResults(output);

}

function outputResults(output){
	var html = '<table>' +
					'<tr>' +
						'<th>Rnk</th>' +
						'<td>...</td>' +
						'<th>Off</th>' +
						'<td>...</td>' +
						'<th>Def</th>' +
						'<td>...</td>' +
						'<th>SoS</th>' +
						'<td>...</td>' +
						'<th>Team</th>' +
					'</tr>';						
	for(var i=0; i<teamLength; i++){
		html += '<tr>' +
//						'<td>' + output[i][26] + '</td>' +
						'<td>' + (i+1) + '</td>' +
						'<td>........</td>' +
						'<td>' + output[i][22] + '</td>' + //22
						'<td>........</td>' +
						'<td>' + output[i][23] + '</td>' + //23
						'<td>........</td>' +
						'<td>' + output[i][14] + '</td>' + //14
						'<td>........</td>' +						
						'<td>' + output[i][1] + '</td>' +
					'</tr>';
	}
	
	html += '</table>';
	
	
	location = document.getElementById('rankings');
	location.innerHTML = html;
	
	//build table	
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
	var denom = 2496 - 3*teamLength*(4-userInput[12]);
	document.getElementById('progress').innerHTML = 'Getting Rankings: ' + parseInt((progress.length/denom)*100) + '%';
	if (progress.length == (teamLength * 75)) {
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
var gameId = '';
var a = scheduleContent[section].getElementsByTagName("a");
if (a.length > i*2) {
	gameId = a[i*2+1].href.toString().split("=")[1];
}
						if ((gameId != '') && (gameId.indexOf("team") == -1)) {					
var team2Id = a[i*2].href.toString().split("=").slice(1);
var team1Score = parseInt(a[i*2+1].innerHTML.toString().slice(2));
var team2Score = parseInt(a[i*2+1].innerHTML.toString().split("-")[1]);
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
var gameId = '';
var a = scheduleContent[section].getElementsByTagName("a");
if (a.length > i*2) {
	gameId = a[i*2+1].href.toString().split("=")[1];
}
						if ((gameId != '') && (gameId.indexOf("team") == -1)) {					
var team2Id = a[i*2].href.toString().split("=").slice(1);
var team1Score = parseInt(a[i*2+1].innerHTML.toString().slice(2));
var team2Score = parseInt(a[i*2+1].innerHTML.toString().split("-")[1]);
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
var gameId = '';
var a = scheduleContent[section].getElementsByTagName("a");
if (a.length > i*2) {
	gameId = a[i*2+1].href.toString().split("=")[1];
}
						if ((gameId != '') && (gameId.indexOf("team") == -1)) {
var team2Id = a[i*2].href.toString().split("=").slice(1);
var team1Score = parseInt(a[i*2+1].innerHTML.toString().slice(2));
var team2Score = parseInt(a[i*2+1].innerHTML.toString().split("-")[1]);
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
			}
	});
}
