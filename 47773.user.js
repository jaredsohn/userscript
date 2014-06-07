// ==UserScript==
// @name           GLB League Power Rankings
// @namespace      http://goallineblitz.com
// @description    Adds a button to display the Power Rankings on the league page. Currently based on version 1.0 of my spreadsheet.
// @include        http://goallineblitz.com/game/league.pl?league_id=*
// @author	garrettfoster
// @version 09.04.29
// ==/UserScript==

window.setTimeout( function(){
	
	function createRankingCells(){
		rows = document.getElementsByTagName('TR');		
		for (var i=0; i<34; i++){
			rows[i].childNodes[1].innerHTML = "";
			rows[i].childNodes[1].className = "defense"
			rows[i].childNodes[1].align = 'Center';
			
			var td = document.createElement('td');
			td.setAttribute('class', 'offense');
			td.setAttribute('align', 'center');
			location = rows[i].childNodes[1];
			location.parentNode.insertBefore(td, location);

			td = document.createElement('td');
			td.setAttribute('class', 'overall');
			td.setAttribute('align', 'center');
			location = rows[i].childNodes[1];
			location.parentNode.insertBefore(td, location);

			if(i == 0 || i == 17){								
				rows[i].childNodes[1].innerHTML = "Ovr"
				rows[i].childNodes[2].innerHTML = "Off"
				rows[i].childNodes[3].innerHTML = "Def"		
			}
		}	
		for (var i=0; i<34; i++){
			if(i == 0 || i == 17){								
				i++;			
			}

			id = rows[i].childNodes[5].firstChild.href.split('=', 2)[1];
			rows[i].id = id;		
		}
	}

//	function getGameData(gameId){
//		GM_xmlhttpRequest({
//			method: 'GET',
//			url: 'http://goallineblitz.com/game/game.pl?game_id=' + gameId,
//			headers: {
//			    'User-agent': navigator.userAgent,
//			    'Accept': 'text/xml'
//			},
//			onload: function(response){
//				var sched = document.getElementById('tempDiv').innerHTML;
//				document.getElementById('tempDiv').innerHTML = response.responseText;
//
//				//for now just pull total yards and final score
//				var team1Id = document.getElementById('tempDiv').getElementsByClassName('team_name')[1].childNodes[0].href.split('=', 2)[1];
//				var team2Id = document.getElementById('tempDiv').getElementsByClassName('team_name')[2].childNodes[0].href.split('=', 2)[1];
//				var team1Score = document.getElementById('tempDiv').getElementsByClassName('total')[1].innerHTML;
//				var team2Score = document.getElementById('tempDiv').getElementsByClassName('total')[2].innerHTML;
//				var team1Yards = document.getElementById('tempDiv').getElementsByClassName('box_score_value')[0].innerHTML;
//				var team2Yards = document.getElementById('tempDiv').getElementsByClassName('box_score_value')[0].innerHTML;
//
//				var tr = '<tr><td>' + team1Id + '</td><td>' + team2Id + '</td><td>' + team1Score + '</td><td>' + team2Score + '</td><td>' + team1Yards + '</td><td>' + team2Yards + '</td></tr>';
//				document.getElementById('dataDiv').appendChild(tr);
//
//				document.getElementById('tempDiv').innerHTML = sched;			
//			}
//		});
///	}

	function getRankings(data, dataLength){	
		var stats = new Array();
		for (var i=0; i < 32; i++){
			stats[i] = new Array();
			stats[i][0] = data[i][0][0]; //teamId			
			stats[i][1] = 0; //games
			stats[i][2] = 0; //wins
			stats[i][3] = 0; //losses
			stats[i][4] = 0; //points scored
			stats[i][5] = 0; //points allowed
			var j=0;
			for (var j=0; j<dataLength; j++){
				//calculate games				
				stats[i][1]++;
				// calculate wins
				if (data[i][j][2] > data[i][j][3]){
					stats[i][2]++;
				}
				//calculate losses
				if (data[i][j][3] > data[i][j][2]){
					stats[i][3]++;
				}
				//calculate points for
				stats[i][4] = stats[i][4] + parseInt(data[i][j][2]);
				//calculate points against
				stats[i][5] = stats[i][5] + parseInt(data[i][j][3]);				
			}			
		}
		for (var i=0; i < 32; i++){
			stats[i][6] = 0; //Modified Record
			stats[i][7] = 0.01; //Opponents Points Allowed
			stats[i][8] = 0.01; //Opponents Points Scored
			
			for (var j=0; j<dataLength; j++){
				oppTeam = data[i][j][1];
				for (var k=0; k<32; k++){
					if (oppTeam == stats[k][0]){
						if (data[i][j][2] > data[i][j][3]){ //add opponents wins onto your record						
							stats[i][6] = stats[i][6] + stats[k][2];
						}
						if (data[i][j][3] > data[i][j][2]) { //add opponents losses onto your record
							stats[i][6] = stats[i][6] - stats[k][3];
						}
						stats[i][7] = stats[i][7] + (stats[k][5]/stats[k][1]);
						stats[i][8] = stats[i][8] + (stats[k][4]/stats[k][1]);
					}
				} 								
			}
			//location = document.getElementById(stats[i][0]);
			//location.childNodes[1].innerHTML = stats[i][6];	
			//location.childNodes[2].innerHTML = parseInt((stats[i][4]/stats[i][7])*100) + '%' ;
			//location.childNodes[3].innerHTML = parseInt((stats[i][5]/stats[i][8])*100) + '%' ;
			stats[i][9] = (stats[i][4]/stats[i][7])*100; //Offensive efficiency
			stats[i][10] = (stats[i][5]/stats[i][8])*100; //Defensive efficiency					
		}
		for (var i = 0; i<32; i++){
			stats[i][11] = 1; //overall rank
			stats[i][12] = 1; //offense rank
			stats[i][13] = 1; //defense rank
			for (var j=0; j<32; j++){
				if(stats[i][0] == stats[j][0]  && j != 31){j++;} //don't compare to yourself
				if(stats[i][6] < stats[j][6]){stats[i][11]++;}
				if(stats[i][9] < stats[j][9]){stats[i][12]++;}
				if(stats[i][10] > stats[j][10]){stats[i][13]++;}
			}
			location = document.getElementById(stats[i][0]);
			location.childNodes[1].innerHTML = stats[i][11];	
			location.childNodes[2].innerHTML = stats[i][12];
			location.childNodes[3].innerHTML = stats[i][13];
		}	
	}


	function getTeamSched(teamId, dataLength, team, data){			
		GM_xmlhttpRequest({			method: 'GET',
			url: 'http://goallineblitz.com/game/team.pl?team_id=' + teamId,
			headers: {
			    'User-agent': navigator.userAgent,
			    'Accept': 'text/xml'
			},
			onload: function(response){
				document.getElementById('tempDiv').innerHTML = response.responseText;								
				schedule = document.getElementsByClassName('schedule_content');			
				data[team] = new Array();				
				for (var j=0; j<16; j++){										
					data[team][j] = new Array();					
					var k = j * 2 + 2;					
					var location = schedule[0].childNodes[1].childNodes[k];
					var gameId = location.childNodes[5].childNodes[0].href.split('game_id=', 2)[1];				
					if(gameId == null){
						break;					
					} else {					
						var team1Id = teamId;					
						var team2Id = location.childNodes[3].lastChild.href.split('=', 2)[1]; 
						var team1Score = parseInt(location.childNodes[5].childNodes[0].innerHTML.split(' ', 2)[1].split('-', 2)[0]);
						var team2Score = parseInt(location.childNodes[5].childNodes[0].innerHTML.split(' ', 2)[1].split('-', 2)[1]);
						
						data[team][j][0] = team1Id;
						data[team][j][1] = team2Id;
						data[team][j][2] = team1Score;
						data[team][j][3] = team2Score;
						//console.log(data.length);
						var week = j +1;
						var tr2 = '<game type="preseason" week="' + week + '"><teamId>' + team1Id + '</teamId><teamId>' + team2Id + '</teamId><score>' + team1Score + '</score><score>' + team2Score + '</score></game>';
						var tr1 = document.getElementById('dataDiv').innerHTML;
						document.getElementById('dataDiv').innerHTML = tr1 + tr2;						
					}														
				}
				console.log((dataLength * 32) - (document.getElementsByTagName('game').length));
				document.getElementById('status').innerHTML = parseInt((document.getElementsByTagName('game').length)/(dataLength * 32)*100) + "%";

				if (document.getElementsByTagName('game').length == (dataLength * 32)){
					getRankings(data, dataLength);
				}										
			}
				
		});
	}

	function getData(dataLength){		
		var rows = document.getElementsByTagName('TR');
		var data = new Array();
		var team = 0;
		for (var i=0; i<34; i++){
			if(i == 0 || i == 17){ i++; }			
			var teamId = rows[i].id;
			getTeamSched(teamId, dataLength, team, data);
			team++;
		}
				
	}

	function getDataLength(){
		location = document.getElementsByTagName('TR')[1].childNodes[5].innerHTML;
		var a = parseInt(location.split('-', 3)[0]);
		var b = parseInt(location.split('-', 3)[1]);
		var c = parseInt(location.split('-', 3)[2]);
		var dataLength = (a + b + c);
		return dataLength;
	}	
	
	function getStats(){		
		document.getElementById('stats').setAttribute('disabled', true);		
		var dataLength = getDataLength();		
		createRankingCells();
		getData(dataLength);				
	}
	
	//create a table to store temporary data
	var newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'dataDiv');
	newDiv.setAttribute("style","visibility: hidden; display:none;");
	location = document.getElementById("footer");
	location.appendChild(newDiv);	

	//create a div to store data for calculations
	newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'tempDiv');
	newDiv.setAttribute("style","visibility: hidden; display:none;");
	location = document.getElementById("footer");
	location.appendChild(newDiv);
	
	//create a div to put the new button in
	newDiv = document.createElement('div');
	newDiv.setAttribute('id', 'powerRankDiv');
	newDiv.align = 'left';
	location = document.getElementById('conferences');
	location.parentNode.insertBefore(newDiv, location);

	//create a check list
	location = document.getElementById('powerRankDiv');	

	var chk = document.createElement("input");
	chk.setAttribute("type", "checkbox");
	chk.setAttribute("id", "preseason")
	chk.setAttribute("value", "preseason");		
	location.appendChild(chk);

	var text = document.createElement('span');
	text.innerHTML = " Include Pre-Season Results in rankings?</span><span style='color: red;'> Not Yet Working<br />";
	location.appendChild(text);

	chk = document.createElement("input");
	chk.setAttribute("type", "checkbox");
	chk.setAttribute("id", "postseason")
	chk.setAttribute("value", "postseason");		
	location.appendChild(chk);

	text = document.createElement('span');
	text.innerHTML = " Include Post-Season Results in rankings?</span><span style='color: red;'> Not Yet Working<br />";
	location.appendChild(text);

	chk = document.createElement("input");
	chk.setAttribute("type", "checkbox");
	chk.setAttribute("id", "momentum")
	chk.setAttribute("value", "momentum");		
	location.appendChild(chk);

	text = document.createElement('span');
	text.innerHTML = " Include momemtum in rankings? (This will make more recent games worth more)</span><span style='color: red;'> Not Yet Working<br />";
	location.appendChild(text);

	//create a button to start power-rankings
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("id", "stats");
	button.setAttribute("value", "Get Rankings");
	button.addEventListener("click", getStats,false); 
	location.appendChild(button);

	text = document.createElement('p');
	text.id = 'status';
	text.innerHTML = "0%";
	location.appendChild(text);

	var p = document.createElement('p');
	p.setAttribute('id', 'parsed');
	location.appendChild(p);

}, 60)