// ==UserScript==
// @name           BvS_PWCardTrades
// @namespace      SirDuck36
// @description    Card Trading helper
// @include        http://*animecubed.com/billy/bvs/pizzawitchgarage.*
// ==/UserScript==



function funNumCards(idnum)
{
    var regString = "<label for=\\\"equip" + idnum +"\\\">([^\s\n<]+)";
    var reg = new RegExp(regString, 'gi');
    return reg.exec(document.body.innerHTML)[1];
}

function funInput(idnum)
{
    return document.getElementById("equip" + idnum);
}

if (/Trade Cards with Cici!/.exec(document.body.innerHTML))
{
    var inputCardCount = document.evaluate("//input[@name='cardcount']", document, null,
					   XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;


//////// BEGIN TEMPARR DEFINITION /////////
var tempArr = [
    // Name, idnum, (minimum cards to stockpile)
    
    // Maximum Tune SuperRares
    "Karen", 67, 1,
    
    // Maximum Tune Rare
    "Beyond The Limit", 61, 2,
    "World Class Machine", 66, 30,

    // Maximum Tune Common
    "Eraser", 60, 2,
    "Initial Drift", 58, 2,
    "Initial Drive", 59, 2,
    "Ride The Gutter", 62, 2,
    "The Roar", 65, 2,

    // Midnight Run SuperRares
    "Overthruster", 41, 3,
    "Lulu", 55, 1,
    "Safety Harness", 42, 3,
    "Sharkskin Spoiler", 43, 3,
    "Cici", 56, 1,
    "Nonstop Counterdrift", 53, 3,
    "Su-Chan", 54, 1,
    
    // Midnight Run Rare
    "Four-Wheel Drift", 48, 1,
    "Into The Shoulder", 51, 1,
    "Kunai Launcher", 40, 1,
    "Ridiculous Spoiler", 38, 1,
    "Double Shift", 49, 1,
    "Machinegun Shift", 50, 1,
    "Roar of the Engine", 52, 1,
    "Jump Jacks", 37, 20,
    "Jack Jumps", 36, 20
    // Cobalt Supercharger

    // Midnight Run Common
    //// Don't think this is needed for current strat...
     
];
/////// END TEMPARR DEFINITION /////////

    var i;
    for (i=0; i<tempArr.length; i+=3)
	if ( tempArr[i+2] < funNumCards(tempArr[i+1]) )
        {
            // Trade all extras of this card
	    funInput(tempArr[i+1]).checked = true;
	    inputCardCount.value = funNumCards(tempArr[i+1]) - tempArr[i+2];

            // Terminate loop
	    break;
        }

}