// ==UserScript==

// @name           Game Scout

// @namespace      http://goallinebliz.com

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


var scout = document.getElementById('scoreboard');
scout.innerHTML =  scout.innerHTML + "<br><Div id='scoutbox'></div>";
var scout = document.getElementById('scoutbox');
scout.innerHTML =  "<Table><tr><td><Table cellspacing=0 style='width: 400px;' border='1' id='scouttable'><tr><td id='team1r' colspan='5' align='center'>Rushing</td></tr><tr><td align='center'>Left</td><td align='center'>Middle</td><td align='center'>Right</td><td align='center'>Inside</td><td align='center'>Outside</td></tr><tr><td id='rlv1' align='center'>4</td><td id='rmv1' align='center'>5</td><td id='rrv1' align='center'>3</td><td id='riv1' align='center'>5</td><td id='rov1' align='center'>7</td></tr><tr><td id='rly1' align='center'>4</td><td id='rmy1' align='center'>5</td><td id='rry1' align='center'>3</td><td id='riy1' align='center'></td><td id='roy1' align='center'></td></tr></table></td><td><Table cellspacing=0 style='width: 400px;' border='1' id='scouttable2'><tr><td id='team2r' colspan='5' align='center'>Rushing</td></tr><tr><td align='center'>Left</td><td align='center'>Middle</td><td align='center'>Right</td><td align='center'>Inside</td><td align='center'>Outside</td></tr><tr><td align='center' id='rlv2'>4</td><td id='rmv2' align='center'>5</td><td id='rrv2' align='center'>3</td><td id='riv2' align='center'>5</td><td id='rov2' align='center'>7</td></tr><tr><td id='rly2' align='center'>4</td><td id='rmy2' align='center'>5</td><td id='rry2' align='center'>3</td><td id='riy2' align='center'></td><td id='roy2' align='center'></td></tr></table></td></tr></table>";


var teams = getElementsByClassName("team_name",document);
var team1 = teams[1].firstChild.innerHTML;
var team2 = teams[2].firstChild.innerHTML;
var current_team="";
var team1_score=0;
var team2_score=0;

var team1_plays=0;
var team2_plays=0;

var team1_Left=0;
var team2_Left=0;

var team1_Lefty=0;
var team2_Lefty=0;

var team1_Middle=0;
var team2_Middle=0;

var team1_Middley=0;
var team2_Middley=0;

var team1_Right=0;
var team2_Right=0;

var team1_Righty=0;
var team2_Righty=0;

var team1_Inside=0;
var team2_Inside=0;

var team1_Inside=0;
var team2_Inside=0;

var team1_Outside=0;
var team2_Outside=0;

var team1_Outsidey=0;
var team2_Outsidey=0;

var plays = getElementsByClassName("pbp_play",document);
var number_of_plays = plays.length;
var passplays = 0;
var current_play = 0;
for(var i=0; i<number_of_plays; i++)
{
	current_play = i+1;
	var play_container = document.getElementById("play_"+current_play);
    var play = plays[i];
	var scoreToAdd = 0;
	var playText = play.innerHTML;


	if(play_container.innerHTML.indexOf(team1)!=-1)
	{
		current_team = team1;
	
	}
	else if (play_container.innerHTML.indexOf(team2)!=-1)
	{
		current_team = team2;
	}



var sp = playText.indexOf('(')+1;
		var ep = playText.indexOf(')');
		var yt = playText.slice(sp,ep);
		
if(current_team == team1)
	{
			
        if(playText.match(' rush')!=null)
	    {
		    if(playText.indexOf("to the left")!=-1)
            {    
                team1_plays++;
                team1_Left++;
                team1_Outside++;
		play.style.color='red';
		if(yt.indexOf("yd loss")!=-1)
		{
			team1_Lefty = team1_Lefty - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team1_Lefty = team1_Lefty + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
		    if(playText.indexOf("to the right")!=-1)
            {    
                team1_plays++;
                team1_Right++;
                team1_Outside++;

		if(yt.indexOf("yd loss")!=-1)
		{
			team1_Righty = team1_Righty - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team1_Righty = team1_Righty + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
		    if(playText.indexOf("up the middle")!=-1)
            {    
                team1_plays++;
                team1_Middle++;
                team1_Inside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team1_Middley = team1_Middley - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team1_Middley = team1_Middley + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
	    }
        if(playText.indexOf("pitch to")!=-1)
	    {
		    if(playText.indexOf("to the left")!=-1)
            {    
                team1_plays++;
                team1_Left++;
                team1_Outside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team1_Lefty = team1_Lefty - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team1_Lefty = team1_Lefty + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
		    if(playText.indexOf("to the right")!=-1)
            {    
                team1_plays++;
                team1_Right++;
                team1_Outside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team1_Righty = team1_Righty - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team1_Righty = team1_Righty + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
		    if(playText.indexOf("up the middle")!=-1)
            {    
                team1_plays++;
                team1_Middle++;
                team1_Inside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team1_Middley = team1_Middley - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team1_Middley = team1_Middley + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
	    }


	}
	else 
	{
		current_team = team2;
        if(playText.indexOf(" rush")!=-1)
	    {
		    if(playText.indexOf("to the left")!=-1)
            {    
                team2_plays++;
                team2_Left++;
                team2_Outside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team2_Lefty = team2_Lefty - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team2_Lefty = team2_Lefty + parseFloat(playText.replace(" yd loss","")); 
		}
		    }
		    if(playText.indexOf("to the right")!=-1)
            {    
                team2_plays++;
                team2_Right++;
                team2_Outside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team2_Righty = team2_Righty - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team2_Righty = team2_Righty + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
		    if(playText.indexOf("up the middle")!=-1)
            {    
                team2_plays++;
                team2_Middle++;
                team2_Inside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team2_Middley = team2_Middley - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team2_Middley = team2_Middley + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
	    }
        if(playText.indexOf("pitch to")!=-1)
	    {
		    if(playText.indexOf("to the left")!=-1)
            {    
                team2_plays++;
                team2_Left++;
                team2_Outside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team2_Lefty = team2_Lefty - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team2_Lefty = team2_Lefty + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
		    if(playText.indexOf("to the right")!=-1)
            {    
                team2_plays++;
                team2_Right++;
                team2_Outside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team2_Righty = team2_Righty - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team2_Righty = team2_Righty + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
		    if(playText.indexOf("up the middle")!=-1)
            {    
                team2_plays++;
                team2_Middle++;
                team2_Inside++;
		if(yt.indexOf("yd loss")!=-1)
		{
			team2_Middley = team2_Middley - parseFloat(yt.replace(" yd loss","")); 
		}
		if(yt.indexOf("yd gain")!=-1)
		{
			team2_Middley = team2_Middley + parseFloat(yt.replace(" yd loss","")); 
		}
		    }
	    }

	}
	


        
	
	}

document.getElementById('team1r').innerHTML = team1 +" Rushing";
document.getElementById('team2r').innerHTML = team2 +" Rushing";
document.getElementById('rlv1').innerHTML = team1_Left;
document.getElementById('rmv1').innerHTML = team1_Middle;
document.getElementById('rrv1').innerHTML = team1_Right;
document.getElementById('riv1').innerHTML = String(Math.round(((team1_Inside/team1_plays)*100))) +'%';
document.getElementById('rov1').innerHTML = String(Math.round(((team1_Outside/team1_plays)*100))) +'%';

document.getElementById('rlv2').innerHTML = team2_Left;
document.getElementById('rmv2').innerHTML = team2_Middle;
document.getElementById('rrv2').innerHTML = team2_Right;
document.getElementById('riv2').innerHTML = String(Math.round(((team2_Inside/team2_plays)*100))) +'%';
document.getElementById('rov2').innerHTML = String(Math.round(((team2_Outside/team2_plays)*100))) +'%';

document.getElementById('rly1').innerHTML = String(team1_Lefty) +' yds';
document.getElementById('rmy1').innerHTML = String(team1_Middley) +' yds';
document.getElementById('rry1').innerHTML = String(team1_Righty) +' yds';


document.getElementById('rly2').innerHTML = String(team2_Lefty) +' yds';
document.getElementById('rmy2').innerHTML = String(team2_Middley) +' yds';
document.getElementById('rry2').innerHTML = String(team2_Righty) +' yds';


}, 100);