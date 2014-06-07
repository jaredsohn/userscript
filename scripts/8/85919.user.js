// ==UserScript==

// @name           Watch Game Score

// @namespace      http://goallinebliz.com

// @include        http://goallineblitz.com/game/game.pl?game_id=*

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
var team1_score=0;
var team2_score=0;

var plays = getElementsByClassName("pbp_play",document);
var number_of_plays = plays.length;

for(var i=0; i<number_of_plays; i++)
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

    var play = plays[i];
    var scoreToAdd = 0;
    var playText = play.innerHTML;

    if(playText.indexOf("[TD]")!=-1)
    {
        scoreToAdd = 6;
    }
    
    if(playText.indexOf("Extra point attempted")!=-1)
    {
        if(playText.indexOf("made [XP]")!=-1)
        {
            scoreToAdd = 1;
        }    
        else
        {
            scoreToAdd = 0;
        }
    }
    if(playText.indexOf("made [FG]")!=-1)
    {
        scoreToAdd = 3;
    }

    if(current_team==team1)
    {
        team1_score = team1_score + scoreToAdd;
    }
    else
    {
        team2_score = team2_score + scoreToAdd;
    }
    if(scoreToAdd!=0)
    {
        play.innerHTML = play.innerHTML + " ["+team1+": "+team1_score+" | "+team2+": "+team2_score+"]";
    }
}


}, 100);