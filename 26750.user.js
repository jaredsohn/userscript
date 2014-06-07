// ==UserScript==

// @name           Scout Helper
// @namespace      http://goallinebliz.com
// 
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// ==/UserScript==
window.setTimeout( function() 
{


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
var teams = getElementsByClassName("team_name",document);
var team1 = teams[1].firstChild.innerHTML;
var team2 = teams[2].firstChild.innerHTML;
var current_team="";

var plays = getElementsByClassName("pbp_play",document);
var passYards; var rushYards; var pitchYards;
var team1Yards = new Array(0,0,0,0,0,0);
var team2Yards = new Array(0,0,0,0,0,0);


for(var i=0; i<plays.length;i++) 
{
	var current_play = i+1;
	var play_container = document.getElementById("play_"+current_play);
	if(play_container.innerHTML.indexOf(team1)!=-1)
	{
		current_team = team1;
	}
	else if (play_container.innerHTML.indexOf(team2)!=-1)
	{
		current_team = team2;
	}
	
	var yardPos = plays[i].innerHTML.indexOf("(") + 1;
	var yardEnd = plays[i].innerHTML.indexOf(" yd ");
	var yardString = plays[i].innerHTML.substring(yardPos,yardEnd);
	var yards = parseFloat(yardString);
	var level = 0;
	var color;
	
	if(plays[i].innerHTML.indexOf(" loss)")!=-1)
	{
		yards = yards * -1;
	}

	if (yards >= 50)
	{
		color1 = "#FF2121";
		color2 = "#00F2FF";
		color3 = "#2AFF00";
	}
	else if (yards >= 25)
	{
		color1 = "#FF2121";
		color2 = "#44FF27";
		color3 = "#A5FFA2";
	}
	else if (yards >= 15)
	{
		color1 = "#FF4C4C";
		color2 = "#4BF0FF";
		color3 = "#6FFF59";
	}
	else if (yards >= 10)
	{
		color1 = "#FF7171";
		color2 = "#77EFFF";
		color3 = "#88FF80";
	}
	else if (yards >= 5)
	{
		color1 = "#FF9393";
		color2 = "#A1F4FF";
		color3 = "#A5FFA2";
	}
	else
	{
		color1 = "#FFC5C5";
		color2 = "#D5F9FF";
		color3 = "#CDFFCD";
	}

	if(isNaN(yards))
		yards=0;



	if(plays[i].innerHTML.indexOf(" pass ")!=-1)
	{
		plays[i].style.background = color1;

		if(current_team==team1){
			
			team1Yards[0]+=yards;
			team1Yards[3]++;
		}
		else{
			team2Yards[0]+=yards;
			team2Yards[3]++;
		}
	}
	
	if(plays[i].innerHTML.indexOf(" rush ")!=-1)
	{
		plays[i].style.background = color2;
		if(current_team==team1){
			team1Yards[1]+=yards;
			team1Yards[4]++;
		}
		else{
			team2Yards[1]+=yards;
			team2Yards[4]++;
		}
	}

	if(plays[i].innerHTML.indexOf(" pitch ")!=-1)
	{
		plays[i].style.background = color3;
		if(current_team==team1){
			team1Yards[2]+=yards;
			team1Yards[5]++;
		}
		else{
			team2Yards[2]+=yards;
			team2Yards[5]++;
		}
	}
	

}
var container = getElementsByClassName("medium_head",document)[0];
var statsTable = document.createElement("table");
var text = "<tr style=\"background:black;color:white;font-weight:plain;\"><td></td><td>Pass</td><td>Yards/Pass</td><td>Rush</td><td>Yards/Rush</td><td>Pitch</td><td>Yards/Pitch</td></tr>";
text+="<tr><td style=\"background:black;color:white;font-weight:plain;\">"+team1+"</td>";
for(var i=0; i<team1Yards.length-3; i++)
{

	var numYards = team1Yards[i];
	var numPlays = team1Yards[i+3];
	text+="<td>"+roundNumber(numYards,2)+"</td>";
	text+="<td>"+roundNumber(numYards/numPlays,2)+"</td>";
}
text+="</tr><tr><td style=\"background:black;color:white;font-weight:plain;\">"+team2+"</td>";
for(var i=0; i<team1Yards.length-3; i++)
{
	var numYards = team2Yards[i];
	var numPlays = team2Yards[i+3];
	text+="<td>"+roundNumber(numYards,2)+"</td>";
	text+="<td>"+roundNumber(numYards/numPlays,2)+"</td>";
}
text+="</tr>";
statsTable.innerHTML=text;
statsTable.style.width="75%";
statsTable.style.color="black";
statsTable.style.border="1px black solid";
container.appendChild(statsTable);

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function testFunc(testing)
{
var testContainer = getElementsByClassName("medium_head",document)[0];
testContainer.innerHTML +=" | "+testing;
}
}, 2000);