// ==UserScript==
// @name           Dad Sea Monkee Boss Fight
// @namespace      a

// @include        http://127.0.0.1:*/fight.php?ireallymeanit*
// @include        http://*.kingdomofloathing.com/fight.php?ireallymeanit*
// @include        localhost:*.kingdomofloathing.com/fight.php?ireallymeanit*

// @grant          none
// ==/UserScript==

// Dad Sea Monkee Fight Script
// Author: Lightwolf
// Attributes: Cannonfire40 and the others who helped spade the Dad fight.
/* Summary: Parses the Start of fight text, then opens a new window with the round weakness for the fight
  
   Note: You may have to tell your browser to allow popups.

  This script should show all 10 rounds. If any rounds are not showing up, something went horribly wrong.
  If this happens, you can send error reports by copy and pasting the text between:
  "You shake your head and look above the tank" and "You have to end this."
  And submit it to the post at http://alliancefromhell.com/viewtopic.php?f=21&t=5633
*/


var body = document.getElementsByTagName("body");
body = body[0];
var html = body.innerHTML;
var rounds = [];


// The parse text functions for the 10 words
function word1(a) {
    switch(a.toLowerCase())
    {
    case "chaotic":
        rounds[0] = 0;
        break;
    case "rigid":
        rounds[0] = 1;
        break;
    case "rotting":
        rounds[0] = 2;
        break;
    case "horrifying":
        rounds[0] = 3;
        break;
    case "slimy":
        rounds[0] = 4;
        break;
    case "pulpy":
        rounds[0] = 5;
        break;
    }
}

function word2(a) {
    switch(a.toLowerCase())
    {
    case "skitter":
        rounds[1] = 0;
        break;
    case "shamble":
        rounds[1] = 1;
        break;
    case "ooze":
        rounds[1] = 2;
        break;
    case "float":
        rounds[1] = 3;
        break;
    case "slither":
        rounds[1] = 4;
        break;
    case "swim":
        rounds[1] = 5;
        break; 
    }
}

function word3(a) {
    switch(a.toLowerCase())
    {
    case "terrible":
        rounds[2] = 0;
        break;
    case "awful":
        rounds[2] = 1;
        break;
    case "putrescent":
        rounds[2] = 2;
        break;
    case "frightening":
        rounds[2] = 3;
        break;
    case "bloated":
        rounds[2] = 4;
        break;
    case "curious":
        rounds[2] = 5;
        break; 
    }
}

function word45(a,b) {  
    switch(a.toLowerCase())
    {
    case "blackness":
        rounds[4] = 0;
        break;
    case "space":
        rounds[4] = 1;
        break;
    case "void":
        rounds[4] = 2;
        break;
    case "darkness":
        rounds[4] = 3;
        break;
    case "emptiness":
        rounds[4] = 4;
        break;
    case "portal":
        rounds[4] = 5;
        break; 
    }
    
    switch(b.toLowerCase())
    {
    case "warps":
        rounds[3] = 0;
        break;
    case "shifts":
        rounds[3] = 1;
        break;
    case "shimmers":
        rounds[3] = 2;
        break;
    case "shakes":
        rounds[3] = 3;
        break;
    case "wobbles":
        rounds[3] = 4;
        break;
    case "cracks":
        rounds[3] = 5;
        break; 
    }
}

function word67(a,b) {

    var six =  Math.floor( Math.log(b - 1) / Math.log(2) );
    var seven = Math.floor( Math.log( b - Math.pow(2,six) ) / Math.log(2) );

	if( a.toLowerCase() == "slowly")
    {
        rounds[5] = six;
        rounds[6] = seven;
    }
    else if( a.toLowerCase() == "suddenly")
    {
        rounds[6] = six;
        rounds[5] = seven;
    }
}

function word8(a) {
	switch(a.toLowerCase())
    {
    case "brain":
        rounds[7] = 0 - rounds[0];
        break;
    case "mind":
        rounds[7] = 1 - rounds[0];
        break;
    case "reason":
        rounds[7] = 2 - rounds[0];
        break;
    case "sanity":
        rounds[7] = 3 - rounds[0];
        break;
    case "grasponreality":
        rounds[7] = 4 - rounds[0];
        break;
    case "sixsense":
        rounds[7] = 5 - rounds[0];
        break;
    case "eyes":
        rounds[7] = 6 - rounds[0];
        break;
    case "thoughts":
        rounds[7] = 7 - rounds[0];
        break;
    case "senses":
        rounds[7] = 8 - rounds[0];
        break;
    case "memories":
        rounds[7] = 9 - rounds[0];
        break;
    case "fears":
        rounds[7] = 10 - rounds[0];
        break;      
    }
}

function word9(a) {
    rounds[8] = rounds[1] + rounds[2] + rounds[3] + rounds[4] + 7 - a;
}

function word10(a) {
    switch(a.toLowerCase())
    {
    case "spleen":
        rounds[9] = rounds[0];
        break;
    case "stomach":
        rounds[9] = rounds[1];
        break;
    case "skull":
        rounds[9] = rounds[2];
        break;
    case "forehead":
        rounds[9] = rounds[3];
        break;
    case "brain":
        rounds[9] = rounds[4];
        break;
    case "mind":
        rounds[9] = rounds[5];
        break;
    case "heart":
        rounds[9] = rounds[6];
        break;
    case "throat":
        rounds[9] = rounds[7];
        break;
    case "chest":
        rounds[9] = rounds[8];
        break;
    case "head":
        if(rounds.indexOf(0) == -1){
            rounds[9] = 0;
        }
        else if(rounds.indexOf(1) == -1){
            rounds[9] = 1;
        }
        else if(rounds.indexOf(2) == -1){
            rounds[9] = 2;
        }
        else if(rounds.indexOf(3) == -1){
            rounds[9] = 3;
        }
        else if(rounds.indexOf(4) == -1){
            rounds[9] = 4;
        }
        else if(rounds.indexOf(5) == -1){
            rounds[9] = 5;
        }
        break; 
    }
}


function CreateList() {
    var s = "<center><b>Dad Sea Monkee Fight  Script</b></center>"
    s = s + "<center><img class=\"decoded\" src=\"http://images.kingdomofloathing.com/adventureimages/dad_machine.gif\" alt=\"http://images.kingdomofloathing.com/adventureimages/dad_machine.gif\" height=\"150\" width=\"200\"></img></center>";


    for(var i = 0, len = rounds.length; i < len; i++) {
        s = s + "<b>Round " + (i + 1) + "</b>: ";
    
        switch(rounds[i])
        {
        case 0:
            s = s + "<span style=\"color:red\">Hot = Awesome Balls of Fire / Volcanometeor";
            break;
        case 1:
            s = s + "<span style=\"color:blue\">Cold = Snowclone";
            break;
        case 2:
            s = s + "<span style=\"color:green\">Stench = Eggsplosion";
            break;
        case 3:
            s = s + "<span style=\"color:grey\">Spooky = Raise Backup Dancer";
            break;
        case 4:
            s = s + "<span style=\"color:purple\">Sleaze = Grease Lightning";
            break;
        case 5:
            s = s + "Physical = Toynado";
            break;
        }
        
        s = s + "<br\></span>";
    }

    s = s + "</body>";
    
    //body.innerHTML = body.innerHTML + s;
    var myWindow = window.open('','','width=400,height=400');
    var myBody = myWindow.document.body;
    myBody.innerHTML = s;
    myWindow.focus();
}

//Find out where the relevant text starts and stops
var startText = html.indexOf("You shake your head and look above the tank, at the window into space");
var endText = html.indexOf("You have to end this.");

if (startText > 0 && endText > 0)
{
    //Remove punctionation, concatinate multi word key words
    var fightText = html.substring(startText,endText);
    fightText = fightText.replace(/[,.]/g, "");
    fightText = fightText.replace('grasp on reality','grasponreality');
    fightText = fightText.replace("sixth sense","sixsense");
    fightText = fightText.split(" ");

    //There are variations in words for word 4/5... "The Darkness" "cracks open"
    if( fightText[26] == "The")
        fightText.splice(26,1);
    if( fightText[28] == "open")
        fightText.splice(28,1);

    //send the parsed text to the functions to determin weakness
    word1(fightText[14]);
    word2(fightText[16]);
    word3(fightText[22]);
    word45(fightText[26],fightText[27]);
    word67(fightText[28],fightText[30].split("-")[0]);  // pasrse 13-dimensional ect...
    word8(fightText[41]);
    word9(fightText[48].split("-")[0] );
    word10(fightText[58]);
    
    // Send the array of weakness to be dispalyed in the new window
    CreateList();
    
    // Debugging code, that reutnrs the parsed word list from the fight
    /*var s = ""
    
    for(var i = 0, len = fightText.length; i < len; i++) {
        s = s + i + " " + fightText[i];
        s = s + "<br\>";
    }
    
    var myWindow = window.open('','','width=400,height=400');
    var myBody = myWindow.document.body;
    myBody.innerHTML = s;
    myWindow.focus();
    /**/
} 





