// ==UserScript==
// @name      KNC Bot
// @namespace http://jakesteele.ca
// @version    0.10
// @description  Knc Auto Bot Bitch
// @match www.king-and-country.com/index.php
// @copyright  2013+, Jacob Steele
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//#################################################
//############   EDITABLE VARIBLES  ###############
//#################################################

// This allows the bot to run when you are attacking a rebel village.
var maj_or_over = true;

// Do you want to attack in any senario? (true or false)
var anySenario = true

// Allows you to change the senario by Javascript or by Button Press.
// True = Mouse Button Click - DEFAULT (performs action much like a human would)
// False = Javascript - Sends the javascript function to the server instead of clicking a button (may improve speed, but is more likely to be detected)
var changeByButton = true; 

// Do you want to stop the script when you are promoted? (true, false)
var stopOnPromo = true; // Currently Disabled Feature. 
// Technically this wont matter, as when you are asked to accept the new unit my script will stop!

// If the above is false, what senerio do you want to attack on?
// Either the full text or just a unique snippet will work!
var senarioText = "As you enter the dark forest you see a man running away";

// Enter in the speed (milliseconds) the script will interval in. Recommended 1000 - 500
var speed = 500;

// Please enter in the input button name for the attack area. First one would be Market, after that its the area.
// Names:
// 1. market
// 2. mountains
// 3. savanna
// 4. plains
// 5. forest
// 6. village
// More exist and are easily found by right clicking the button, go to Insepect Element then copying the name="THIS WORD" into there. 
var inputName = "village";


// Var Display Text - Displays above timer when hacks turned on.
var displayText = "JakeSteele.ca";
//##################################################
//#############  END OF EDITABLE SECTION ###########
//##################################################

// Do not touch the below!

/*
function checkPromo() // Doesnt Work yet!
{
    $(document).ready( function() {
     if($('body').find(":contains('promotion')"))
        {
            cont = false;
            //alert("You received promotion!");
            // Stops script so you can purchase n upgrade. 
            // You also should make sure to accept the next guy.
            // then restart script!
            
        }
    });
} */

function majSen()
{
    $(document).ready( function() {
        
        $("input[name=attack_now]").removeAttr("onClick");
        $("input[name=attack_now]").click();
    });
    
}


function senario()
{
    $(document).ready( function() {
        
        var attack;
        var intro = $("#intro").text();
        var senNumber = document.getElementById("buttons").firstChild.attr("onClick");
        
        if (anySenario == true)
        {
            attack = document.getElementById("buttons").firstChild;
            attack.click();
        } 
        else 
            
            if (intro.indexOf(senarioText) != -1)
            {
                attack = document.getElementById("buttons").firstChild;
                attack.click();
            } else {
                if (senNumber.indexOf("followScenario(0)") === -1)
                {
                    attack = document.getElementById("buttons").firstChild;
                    attack.click();
                    
                } else {
                    changeScenario();
                }
            }
    });
}


function train() {
    
    
    //window.location = "http://king-and-country.com/index.php";
    
    if ($("input[name=" + inputName + "]").is(':disabled') === false)
        // If you can patrol the market, patrol the market	
    {
        
        // Attack Squence
        if (maj_or_over == false)
        {
            $("input[name=" + inputName + "]").click();
        	setInterval(senario, speed);
        }
        else
        {
            $("input[name=" + inputName + "]").removeAttr("onClick");
            $("input[name=" + inputName + "]").click();
            setInterval(majSen, speed);
        }
        // Check Promotion.
        // checkPromo();
        
        
    }
    
}

function addButton() {
    $('.menu').html('<font color="#ffffff">' + displayText + '</font>' + $('.menu').html());
}


$(document).ready(function() {
    addButton();
    train();
});