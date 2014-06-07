// ==UserScript==
// @name        Grarrl Keno AP
// @namespace   sizeak
// @description Auto Plays Grarrl Keno
// @include     http://www.neopets.com/prehistoric/keno.phtml
// @version     1.0
// @grant       none
// ==/UserScript==

//SETTINGS
var betAmount = "10"; //must put in quotes because I'm lazy, DO IT
var eggs = [7, 25, 8, 40, 70, 21, 38, 42, 57, 63];
var numMatchesForAv = 4;

//Don't mess below here :P
function GetInputByValue(valToFind)
{
    var inputs = document.getElementsByTagName("input");

    for(var i=0; i<inputs.length; i++)
    {
        if(inputs[i].value == valToFind)
        {
            return inputs[i];
        }
    }
}

function AvatarCheck()
{
     var results = document.getElementById("prize_result");
    var matches = document.getElementById("prize_result").getElementsByTagName("b")[0].value;
    matches = parseInt(matches);
    
    if(matches >= numMatchesForAv)
    {
        //pause and ask if they want to carry on
        alert("You should have the Avatar! Script Paused - Click Play Again! to continue");
        return;
    }
    
    //play again :D
    GetInputByValue("Play Again!").click();
    return;
}

function Run()
{
    //correct start page
    if(document.body.innerHTML.indexOf("Hatch those Eggs!") != -1)
    {
        //select the same 10 numbers each play
        for(var i=0; i<eggs.length; i++)
        {
            var cur = document.getElementsByName("ch"+eggs[i].toString());
            
            if(cur.length == 1) //all good
            {
                cur = cur[0];
                cur.checked = true;
                set_eggs(eggs[i], cur.checked); //weird neopets method :D
            }
            else //shouldn't be more than one egg with that name...
            {
                alert("It appears an error has occured, I'd start again...");
                return;
            }
        }
        
        //set the bet
        var betBox = document.getElementsByName("bet");
        
        if(betBox.length != 1)
        {
            alert("It appears an error has occured, I'd start again...");
            return;
        }
        
        betBox = betBox[0];
        betBox.value = betAmount;
        
        //now find and click the hatch button
        GetInputByValue("Hatch those Eggs!").click();
        return;
    }
    else if(document.body.innerHTML.indexOf("Play Again!") != -1) //results page
    {
        //need to wait for results to appear otherwise it's obvious we're not people :/
        window.setTimeout(AvatarCheck, 7000);
    }
    else
    {
        alert("Please start a new game to use this script");
        return;
    }
}

//run the script after a delay to make it seem more human
window.setTimeout(Run, Math.random()*1000+1000); //delay 1-2 seconds