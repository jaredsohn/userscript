// ==UserScript==
// @name           BvS_deliveries
// @namespace      SirDuck36
// @description    delivery helper
// @include        http://*animecubed.com/billy/bvs/pizzawitch.*
// ==/UserScript==





function KeyCheck(event)
{
    var KeyID = event.keyCode;

   if (KeyID == 192) // '`'
   {
       unsafeWindow.document.drive.submit();
       unsafeWindow.document.anotherdelivery.submit();
       unsafeWindow.document.hittheride.submit();
   }

}

if (/Distance to Destination/.exec(document.body.innerHTML))
{
    /////////////////////////////////////////////////////////////////////////
    // Stage 1: Obtain the necessary information

    var oldSpeed = parseInt(/Current Speed:\n\<font[^<>]+><b>([^<]+)/.exec(document.body.innerHTML)[1]);
    var drivetrain = /Drivetrain: ([^\s]+)/.exec(document.body.innerHTML)[1];
    var durability = /Durability: ([^\s]+)/.exec(document.body.innerHTML)[1];
    var deliciousness = /Deliciousness: ([^\s]+)/.exec(document.body.innerHTML)[1];
    var location = /Distance to Destination: ([^\s]+)/.exec(document.body.innerHTML)[1];

    // One last race selection card input
    var cardInfinitePotential = document.getElementById('trick64');
    var cardOneLastRace = document.getElementById('trick63');

    var cardPizzaPizza = document.getElementById('trick3');
    var cardMeltyCheese = document.getElementById('trick10');

    // Lookup the next statCheck
    var statCheck;
    var statSpeed;
    var statLocation;

    if (/Danger!/.exec(document.body.innerHTML))
    {
	// We are currently facing a statcheck
	statCheck = true;
	statSpeed = /<i>Speed Needed: ([^\s]+)/.exec(document.body.innerHTML)[1];
	statLocation = location;
    }
    else
    {
	// There is a statcheck in the distance
	statCheck = false;
	statSpeed = /<i>Speed ([^\s]+)/.exec(document.body.innerHTML)[1];
	statLocation = /Location ([^<]+)/.exec(document.body.innerHTML)[1];
    }

    /////////////////////////////////////////////////////////////////////////
    // Stage 2: User Strategy

    // This will hold the desired speed to set for stage 3
    var newSpeed;

    if (0)  // Extra hard deliveries strategy
    {
	// Setup
	// Equipment
	//     Pizzawitch sign
	//     Jack Jumps
	//     Game Spoiler
	//     Basic Turbo
	//     Awesominium Banding
	//     Jump Jacks
	// Passenger
	//     White Witch
	// D-abilities
	//     3 Melty Cheese
	//     2 One last race
	//     1 Pizza pizza

	// Use one last race card if needed
	if (drivetrain > 50 && (durability < 50 || deliciousness < 200))
	    if (cardOneLastRace)
		cardOneLastRace.checked = true;

	if (cardMeltyCheese)
	    cardMeltyCheese.checked = true;
	if (cardPizzaPizza)
	    cardPizzaPizza.checked = true;

	// Use pizza pizza at location one
	if (location == 1)
	    newSpeed = 7;
	else
	{
	    if (statCheck && statSpeed == 4)
		newSpeed = 4;
	    else if (/or Slower/.exec(document.body.innerHTML))
	    {
		if (statCheck)
		{
		    if (oldSpeed <= statSpeed)
			newSpeed = 8;
		    else
			newSpeed = statSpeed;
		}
		else
		{
		    if (statLocation - location <= statSpeed + 1)
			newSpeed = statSpeed
		    else
			newSpeed = statLocation - location - 1;
		}
	    }
	    else  // Fast speed check
	    {
		if (statCheck)
		    newSpeed = 8;
		else
		    newSpeed = Math.min(13, oldSpeed + 6);
	    }
	}

	newSpeed = Math.max(newSpeed, oldSpeed - 6);
	newSpeed = Math.min(newSpeed, oldSpeed + 6);
    }

    if (1)  // Crazy hard deliveries strategy
    {
	// Setup
	// Equipment
	//     Jump Jacks
	//     Jack Jumps
	//     Basic Turbo
	//     Awesominium Banding
	//     Cobalt Supercharger
	//     World Class Machine
	// Passenger
	//     Su-Chan
	// D-abilities
	//     5/6 One Last Race
	//     1/0 Infinite Potential 

	// Use one last race card if needed
	if (drivetrain > 50 && (durability < 50 || deliciousness < 200))
	    if (cardOneLastRace)
		cardOneLastRace.checked = true;
	
	if (location == 7)
	    if (cardInfinitePotential)
		cardInfinitePotential.checked = true;
	
	// Select new speed
	if (location == 1)
	    newSpeed = 6;  // Initial max acceleration
	else if (location == 7)
	    newSpeed = 7;  // Layup for first obstacle
	else
	{
	    if (statSpeed == 3)
	    {
		// Slow case
		if (statCheck)
		    newSpeed = Math.max(3,oldSpeed-5);
		else
		{
		    var dist = statLocation - location;
		    newSpeed = dist-1;
		    newSpeed = Math.max(newSpeed,3,oldSpeed-5);
		    newSpeed = Math.min(newSpeed,8,oldSpeed+5);
		}
	    }
	    else
	    {
		// Fast case
		if (statCheck)
		    newSpeed = 8;
		else
		{
		    var layupSpeed = statLocation - location - 1;
		    if (layupSpeed >= 6)
			newSpeed = Math.min(12,layupSpeed,oldSpeed+5);
		    else
			newSpeed = Math.min(12,oldSpeed+5);
		}
	    }
	}
	
    } // End if(0)
    
    /////////////////////////////////////////////////////////////////////////
    // Stage 3: Select the desired newSpeed

    var accel = Math.abs(oldSpeed - newSpeed);
    var idstring = "shift" + accel + newSpeed;
    var shiftInput = document.getElementById(idstring);
    if (shiftInput)
	shiftInput.checked = true;
}

// Setup the event listener
document.documentElement.addEventListener("keyup", KeyCheck, true);