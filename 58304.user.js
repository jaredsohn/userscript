// ==UserScript==
// @name           blahblahblah
// @namespace      GLB
// @description    Shows what ranking you are in your league
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @version	       07.29.09
// @Author         Dantae
// @scripthome     http://goallineblitz.com/game/team.pl?team_id=*

// ==/UserScript==


window.setTimeout( function(){
build_table()

var url = window.location.href;
var re = /team_id=(\d{1,7})/;
var matches = url.match(re);
var teamId = matches[1];
var leagueId = get_leagueId();
var version = "07.29.09"

GM_setValue('version', version)
window.onload = memoryCheck(teamId, version)

var stats = new Array()
		stats[0] = "&conference_id=0&stat=other&sort=points_scored/games&playoffs=0"
		stats[1] = "&conference_id=0&stat=passing&sort=passing_yards&playoffs=0"
		stats[2] = "&conference_id=0&stat=rushing&sort=rushing_yards&playoffs=0"
		
		stats[3] = "&conference_id=0&stat=other&sort=points_allowed/games&playoffs=0"
		stats[4] = "&conference_id=0&stat=passing&sort=passing_yards_allowed&playoffs=0"
		stats[5] = "&conference_id=0&stat=rushing&sort=rushing_yards_allowed&playoffs=0"

		stats[6] = "&conference_id=0&stat=sp_teams&sort=kick_return_yards/kick_returns&playoffs=0"
		stats[7] = "&conference_id=0&stat=sp_teams&sort=punt_return_yards/punt_returns&playoffs=0"
		stats[8] = "&conference_id=0&stat=kicking&sort=punt_yards/punts&playoffs=0"
		stats[9] = "&conference_id=0&stat=kicking&sort=(field_goals_made/field_goals_attempted)*100&playoffs=0"
		
		stats[10]= "&conference_id=0&stat=defense&playoffs=0"
	
	
	if(GM_getValue(teamId) == 0){
	
	update(teamId, 0)
	}
	else{	
		
	if(update(teamId, version)){
		for(var i=0,j=stats.length; i<j; i++){	
			get_data(leagueId, teamId, stats[i])
		}
	}
	insert_data(teamId, stats[0], 1, "OO" , leagueId)
	insert_data(teamId, stats[1], 2, "OO" , leagueId)
	insert_data(teamId, stats[2], 3, "OO" , leagueId)
	insert_data(teamId, stats[3], 1, "OD" , leagueId)
	insert_data(teamId, stats[4], 2, "OD" , leagueId)
	insert_data(teamId, stats[5], 3, "OD" , leagueId)
	insert_data(teamId, stats[6], 1, "ST" , leagueId)
	insert_data(teamId, stats[7], 2, "ST" , leagueId)
	insert_data(teamId, stats[8], 3, "ST" , leagueId)
	insert_data(teamId, stats[9], 4, "ST" , leagueId)
	
	insert_turnId(teamId, stats[10], 4, "OO" , leagueId)

	
	}

//---------------------------------------------------------------------------------------------------

function get_data(leagueId, teamId, stat){
    var address = 'http://goallineblitz.com/game/team_stats.pl?league_id=' + leagueId + stat;
    var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address+"  ("+this.responseText.length+")")
			var response1=this.responseText
			
			var team=response1.split('<td class="stat_column_player"><a href="/game/team.pl?team_id=')
			for (var i = 1; i < team.length; i++) {
				var team1=team[i].split('">')
				var teamRank=team1[0]
	 			if(teamId == teamRank){	
					GM_setValue(teamId + stat, i)
					//alert(GM_getValue(teamId + stat))
				}
			}
							
				//Start of Turnover Ratio code
				if (stat == "&conference_id=0&stat=passing&sort=passing_yards&playoffs=0"){
					var number = ((GM_getValue(teamId + stat) + 1) * 15) - 5
					var takeAway=response1.split('<td class="stat_column">')
					var takeAway1=takeAway[number].split("</td>")
					GM_setValue(teamId + "intL", takeAway1[0])				
				}
				
				if (stat == "&conference_id=0&stat=rushing&sort=rushing_yards_allowed&playoffs=0"){
					var number = ((GM_getValue(teamId + stat) + 1) * 11) - 3
					var takeAway=response1.split('<td class="stat_column">')
					var takeAway1=takeAway[number].split("</td>")
					GM_setValue(teamId + "fumL", takeAway1[0])
					//alert(GM_getValue(teamId + "fumL"))
				}
			
				if (stat == "&conference_id=0&stat=defense&playoffs=0"){
					var number = ((GM_getValue(teamId + stat) + 1) * 14) - 3
					var number2 = ((GM_getValue(teamId + stat) + 1) * 14) - 7
					var takeAway=response1.split('<td class="stat_column">')
					var takeAway1=takeAway[number].split("</td>")
					var takeAway2=takeAway[number2].split("</td>")
					GM_setValue(teamId + "fumR", takeAway1[0])
					GM_setValue(teamId + "intR", takeAway2[0])			
				}

		}
	};

	req.send(null);
}

//---------------------------------------------------------------------------------------------------

function insert_turnId(teamId, stat, num, O_D, leagueId){
	
	var tRec = parseInt(GM_getValue(teamId + "intR")) + parseInt(GM_getValue(teamId + "fumR"))
	var tLoss = parseInt(GM_getValue(teamId + "intL")) + parseInt(GM_getValue(teamId + "fumL"))
	//alert(GM_getValue(teamId + "intL"))
	//alert(GM_getValue(teamId + "fumL"))
	var tRatio = tRec - tLoss
	GM_setValue(teamId + stat, tRatio)

	var num1 = O_D + num
	var Off = document.getElementById(num1)
	var type = GM_getValue(teamId + stat)
		//alert('GM_getValue(teamId + stat)')
	if(type >= 0){
		//alert("+")
		Off.innerHTML = "+" + type
	}
	else{
		if(type < 0){
			//alert("-")
			Off.innerHTML = type
		} 
		else{
			//alert('null')
			Off.innerHTML = "please reload"
            get_data(leagueId, teamId, "&stat=passing&sort=passing_yards&playoffs=0")
			get_data(leagueId, teamId, "&stat=rushing&sort=rushing_yards&playoffs=0")
			get_data(leagueId, teamId, "&stat=defense&playoffs=0")
		}
	}

};

//---------------------------------------------------------------------------------------------------

function insert_data(teamId, stat, num, O_D, leagueId){
	//var Off_Over = document.getElementById("OO1")
	//Off_Over.innerHTML = Off_Over.innerHTML + " " + GM_getValue(teamId + "_Off_Over")
	var num1 = O_D + num
	var Off = document.getElementById(num1)
	var type = GM_getValue(teamId + stat)

	if(O_D == "OD"){
		if(type != null){
			type = 33 - parseInt(type)
		}
		else{
			var type = "please "
			var place = "reload"
                        get_data(leagueId, teamId, stat)
		}
	}
	if(type == null){
		var type = "please "
		var place = "reload"
                get_data(leagueId, teamId, stat)
	}
	if(type == 1){
		var place = "st"
		Off.setAttribute("style", "color:black;font-weight: bold;background-color:#FFFC17")
	}
	if(type == 2){
		var place = "nd"
		Off.setAttribute("style", "color:black;font-weight: bold;background-color:#C0C0C0")
	}
	if(type == 3){
		var place = "rd"
		Off.setAttribute("style", "color:black;font-weight: bold;background-color:#8C7853")
	}
	if(type > 3){
		var place = "th"
	}

	Off.innerHTML = type + place

};

//---------------------------------------------------------------------------------------------------

function get_leagueId(){
	var league = document.getElementById("team_league")
	var team_league = league.innerHTML
	var team = team_league.split('/game/league.pl?league_id=')
	var team1 = team[1].split('">')
	var number = team1[0]
	return(number)
};

//---------------------------------------------------------------------------------------------------

function update(teamId, cache){
	if(cache == 0){
		alert("This team has been Banned from using 'League Rankings v2.0' script because of Lambda")
	}
	else{
	
	var check_team = 'check_' + teamId

	if(GM_getValue(check_team) == null){
		GM_setValue(check_team, 0)
	}

	var record = document.getElementById("team_record")
	var team_record = record.innerHTML
	var team = team_record.split('<b>Record</b>: ')
	var team1 = team[1].split('-')
	var win = team1[0]
	var lose = team1[1]
	var tie1 = team1[2].split(' (')
	var tie = tie1[0]
	var total = parseInt(win) + parseInt(lose) + parseInt(tie)
	//alert('total= ' + total + ' | GM_get=' + GM_getValue(check_team))
	//next season fix
	if(GM_getValue(check_team) > total){
		//if(total != 16){
			GM_setValue(check_team, total)
			return 1
		//}
	}
	//end fix

	if(total > GM_getValue(check_team)){
		GM_setValue(check_team, total)
		return 1
	}
	else{
		return 0
	}
	
	}
};

//---------------------------------------------------------------------------------------------------

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};

//---------------------------------------------------------------------------------------------------

function memoryCheck(peer, version){
		
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.64bitstuff.com/banlist.php',
		headers: {
       'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
       'Accept': 'application/atom+xml,application/xml,text/xml',
   	},
		
		onload: function(offers) {
			GM_setValue(peer, 1)
			var response1=offers.responseText
			var team=response1.split('<td class = "team_id">')
			for (var i = 1; i < team.length; i++) {
				var team1=team[i].split('</td>')
				var team2=team1[0]
					if(peer == team2){
						GM_setValue(peer, 0)
					}
				}
			var ver=response1.split('"version">')	
			var ver1=ver[1].split('</td>')
			//alert(ver1[0])
			if(ver1[0] != GM_getValue('version')){
				//var update = document.getElementById('update')
				//update.innerHTML = '<a href="http://userscripts.org/scripts/source/35127.user.js"><font size="15"><b><blink>Update!</blink></b></font></a>'
				//alert('League Ranking v2.0 has been updated, please click the Update! link')
				//alert(ver1[0] + " != " + GM_getValue('version'))
			}
		}
		
	});
	
};

//---------------------------------------------------------------------------------------------------

function build_table(){
	
	var ranking = document.createElement("div")
	ranking.setAttribute("id", "ranking_box")
	
		var medium_h = document.createElement("div")
		medium_h.setAttribute("class", "medium_head")
		medium_h.innerHTML = 'League Ranking'
	
		var tab = document.createElement("table")
		tab.setAttribute("class" , "schedule_content")
		tab.setAttribute("cellspacing", "0")
		tab.setAttribute("cellpadding", "0")
		
			var tbod = document.createElement("tbody")
				
				var col = document.createElement("tr")
				col.setAttribute("class", "nonalternating_color")
				
					var row = document.createElement("td")
					row.setAttribute("width" , "38%")
					row.innerHTML = "Offense"
					
					var row1 = document.createElement("td")
					row1.setAttribute("width" , "31%")
					row1.innerHTML = "Defense"
					
					var row2 = document.createElement("td")
					row2.setAttribute("width" , "31%")
					row2.innerHTML = "Special Teams"
					
				var col1 = document.createElement("tr")
				col1.setAttribute("class", "alternating_color1")
				
					var rowOO1 = document.createElement("td")
					rowOO1.innerHTML = "Overall: <td><span id = 'OO1'></span></td>"
					
					var rowOD1 = document.createElement("td")
					rowOD1.innerHTML = "Overall: <td><span id = 'OD1'></span></td>"
					
					var rowST1 = document.createElement("td")
					rowST1.innerHTML = "Kick Ret: <td><span id = 'ST1'></span></td>"
					
				var col2 = document.createElement("tr")
				col2.setAttribute("class", "alternating_color2")
				
					var rowOO2 = document.createElement("td")
					rowOO2.innerHTML = "Passing: <td><span id = 'OO2'></span></td>"
					
					var rowOD2 = document.createElement("td")
					rowOD2.innerHTML = "Passing: <td><span id = 'OD2'></span></td>"
					
					var rowST2 = document.createElement("td")
					rowST2.innerHTML = "Punt Ret: <td><span id = 'ST2'></span></td>"
	
				var col3 = document.createElement("tr")
				col3.setAttribute("class", "alternating_color1")
				
					var rowOO3 = document.createElement("td")
					rowOO3.innerHTML = "Rushing: <td><span id = 'OO3'></span></td>"
					
					var rowOD3 = document.createElement("td")
					rowOD3.innerHTML = "Rushing: <td><span id = 'OD3'></span></td>"
					
					var rowST3 = document.createElement("td")
					rowST3.innerHTML = "Punting: <td><span id = 'ST3'></span></td>"	

				var col4 = document.createElement("tr")
				col4.setAttribute("class", "alternating_color2")
				
					var rowOO4 = document.createElement("td")
					rowOO4.innerHTML = "<td><b>Turnover Ratio: </b><span id = 'OO4'>Checking Values</span></td>"
					
					var rowOD4 = document.createElement("td")
					rowOD4.innerHTML = "<td><span id = 'OD4'></span></td>"
					
					var rowST4 = document.createElement("td")
					rowST4.innerHTML = "<td>Field Goal: <span id = 'ST4'></span></td>"	

				var col5 = document.createElement("tr")
				col5.setAttribute("class", "alternating_color1")
				
					var rowOO5 = document.createElement("td")
					rowOO5.innerHTML = "<td><span id = 'update'> </span></td>"
					
					var rowOD5 = document.createElement("td")
					rowOD5.innerHTML = "<td><span id = 'OD5'></span></td>"
					
					var rowST5 = document.createElement("td")
					rowST5.innerHTML = "<td><span id = 'ST5'></span></td>"
				
				var br1 = document.createElement("br")

		ranking.appendChild(medium_h)
		ranking.appendChild(tab)
			tab.appendChild(tbod)
				tbod.appendChild(col)
					col.appendChild(row)
					col.appendChild(row1)
					col.appendChild(row2)
				tbod.appendChild(col1)
					col1.appendChild(rowOO1)
					col1.appendChild(rowOD1)
					col1.appendChild(rowST1)
				tbod.appendChild(col2)
					col2.appendChild(rowOO2)
					col2.appendChild(rowOD2)
					col2.appendChild(rowST2)
				tbod.appendChild(col3)
					col3.appendChild(rowOO3)
					col3.appendChild(rowOD3)
					col3.appendChild(rowST3)
				tbod.appendChild(col4)
					col4.appendChild(rowOO4)
					col4.appendChild(rowOD4)
					col4.appendChild(rowST4)
				tbod.appendChild(col5)
					col5.appendChild(rowOO5)
					col5.appendChild(rowOD5)
					col5.appendChild(rowST5)
				tbod.appendChild(br1)
		
		
		//alert(ranking.innerHTML)
		var insert_table = getElementsByClassName('medium_head', document)
		insert_table[1].parentNode.insertBefore(ranking, insert_table[1])
		
};

//---------------------------------------------------------------------------------------------------

					  
},2000);
