// ==UserScript==
// @name           Formation Counter
// @namespace      goallineblitz.com
// @description    Counts how many formations you have in this section
// @include        http://glb2.warriorgeneral.com/game/playbook/offense/*
// @copyright      2014, Trey Patterson
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version        2014.31.01_2
// ==/UserScript==

window.setTimeout(main,10); //needed to start greasemonkey
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="test" type="button">'
                + 'Get Play Count'
                ;
zNode.setAttribute ('id', 'resultsHolder');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("test").addEventListener (
    "click", grabFormationCount, false
);
function main() {
	
}

formationCount = {IFormation:0,
					StrongI:0,
					WeakI:0,
					BigI:0,
					ProSet:0,
					Shotgun:0,
					Shotgun5WR:0,
					Singleback:0,
					SinglebackTrips:0,
					SinglebackSpread:0,
					SinglebackBig:0,
					GoalLine:0};

function grabFormationCount() {
	alert("Working maybe?");
	var foundFormationArray = new Array();
	$(".play_formation").each(function() {
		foundFormationArray.push(this.innerHTML);
	});
	calculateFormation(foundFormationArray);
	$('#resultsHolder').append($("<p>Found Formations:</p>";
	$('#resultsHolder').append($("<p>Formation I Form: " + formationCount.IFormation + "</p>";
	$('#resultsHolder').append($("<p>Formation Strong I: " + formationCount.StrongI + "</p>";
	$('#resultsHolder').append($("<p>Formation Weak I: " + formationCount.WeakI + "</p>";
	$('#resultsHolder').append($("<p>Formation Big I: " + formationCount.BigI + "</p>";
	$('#resultsHolder').append($("<p>Formation Pro Set: " + formationCount.ProSet + "</p>";
	$('#resultsHolder').append($("<p>Formation Shotgun: " + formationCount.Shotgun + "</p>";
	$('#resultsHolder').append($("<p>Formation Shotgun 5WR: " + formationCount.Shotgun5WR + "</p>";
	$('#resultsHolder').append($("<p>Formation Singleback: " + formationCount.Singleback + "</p>";
	$('#resultsHolder').append($("<p>Formation Singleback Trips: " + formationCount.SinglebackTrips + "</p>";
	$('#resultsHolder').append($("<p>Formation Singleback Spread: " + formationCount.SinglebackSpread + "</p>";
	$('#resultsHolder').append($("<p>Formation Singleback Big: " + formationCount.SinglebackBig + "</p>";
	$('#resultsHolder').append($("<p>Formation GoalLine: " + formationCount.GoalLine + "</p>";
	
}

function calculateFormation(foundFormationArray) {
	for (var i = 0; i < foundFormationArray.length; i++) {
		switch (foundFormationArray[i])
		{
			case "I Formation":
				formationCount.IFormation++;
				break;
			case "Strong I Formation":
				formationCount.StrongI++;
				break;
			case "Weak I Formation":
				formationCount.WeakI++;
				break;
			case "Big I Formation":
				formationCount.BigI++;
				break;
			case "Pro Set Formation":
				formationCount.ProSet++;
				break;
			case "Shotgun Formation":
				formationCount.Shotgun++;
				break;
			case "Shotgun 5WR Formation":
				formationCount.Shotgun5WR++;
				break;
			case "Singleback Formation":
				formationCount.Singleback++;
				break;
			case "Singleback Trips Formation":
				formationCount.SinglebackTrips++;
				break;
			case "Singleback Spread Formation":
				formationCount.SinglebackSpread++;
				break;
			case "Singleback Big Formation":
				formationCount.SinglebackBig++;
				break;
			case "Goal Line Formation":
				formationCount.GoalLine++;
				break;
		}
	}
}

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #resultsHolder {
        position:               relative;
        top:                    -100px;
        left:                   0;
        font-size:              20px;
        background:             grey;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
        width: 					200px;
    }
    #test {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}