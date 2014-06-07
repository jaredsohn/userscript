// Last Updated: 27th October 2013
// Lead Programmer: Waser Lave
//
// ==UserScript==
// @name          Neopets Perilous Catacombs Solver
// @namespace     http://www.neocodex.us
// @description   Automatically solves the Perilous Catacombs puzzle
// @include       http://www.neopets.com/halloween/sfc/catacombs/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var intv;
var intv2;
var nc = 0;

function reloadPage(){
	window.location = "http://www.neopets.com/halloween/sfc/catacombs/";
}

function testEnd(){
	var endFound = $('#mpcatPopup div.subpop.waitDone').is(":visible");
	
	if (endFound == true){
		var endButton = $("[class='continue']");
		$(endButton).click();
		
		setTimeout(reloadPage, 3000);
	}
}

function testFunc(){
	var selectFound = $('#mpcatPopup div.subpop.select div.copy div.itemList').html();
	var endFound = $('#mpcatPopup div.subpop.waitDone').is(":visible");

	if(selectFound.length == 0 && endFound == false){
		var doors = $("[class*='closed']");
		
		if(doors.length >= 1){
			if(nc == 1){
				nc = 0;
				$(doors[1]).click();
			}else{
				$(doors[0]).click();
			}
		}else{
			alert("No closed doors found");	
		}
	}
}

function testPopups(){
	var vis = $('#mpcatPopup').is(":visible");
	var vis2 = $('#cboxClose').is(":visible");
	var vis3 = $('#mpcatPopup div.subpop.doorResult').is(":visible");
	var vis4 = $('#mpcatPopup div.subpop.ncDoor').is(":visible");
	var exitFound = $('#mpcatPopup div.subpop.exit button').is(":visible");
	var waitFound = $('#mpcatPopup div.subpop.wait div.copy div.timer').html();
	var selectFound = $('#mpcatPopup div.subpop.select div.copy div.itemList').html();
	var monsterFound = $('#mpcatPopup div.subpop.glimpse button').is(":visible");

	if(exitFound == true){
		unsafeWindow.MPCat.ajax.doExit();
	}else if(monsterFound == true){
		var endButton = $("[class='continue']");
		$(endButton).click();
	}else if(selectFound.length > 0){
		clearInterval(intv);
	}else if(vis3 == true){
		window.location = "http://www.neopets.com/halloween/sfc/catacombs/";
	}else if(vis4 == true){
		nc = 1;
		testFunc();
	}else{
		if(vis == true){
			var clue = $('#mpcatPopup div.subpop.doorOption div.copy').html();
			var solutions = [["wears a bow", "Xweetok"],["Two things are constant", "Kreludor and Virtupets"],["Rattle bones", "Halloween"],["It goes up", "Stock"],["Inside, a staircase", "Hidden Tower"],["first is in haunted", "Help"],["tongue that wags", "Dribblet"],["breaks apart", "Krawk Island"],["punished pride", "Sway"],["A cup that fills", "Altador Cup"],["banjo music", [1,2]], ["wordless screaming", "Burst through"], ["rather threatening", "mediator"], ["glorping", "Stomp"], ["warm to the touch", "chill out"], ["skittering sound", "Burst through"], ["snarky comments", "Burst through"], ["out a roar", "courage"], ["loud chanting", "Hum along"], ["is silence", "Stomp"], ["door is glowing", "all quiet"], ["cinnamon scent", "gloves"], ["organ music", "Stomp"], ["unearthly moan", "Knock on"], ["luggage", "Throw"], ["faint whisper", [0,1]], ["disturb its slumber", [0,1]], ["old camping song", [0,2]], ["hear an argument", [1,2]]];
			
			for(var i=0; i<solutions.length; i++){
				if(clue.indexOf(solutions[i][0])>0){
					if( typeof solutions[i][1] === 'string' ) {
						var options = $('#mpcatPopup div.subpop.doorOption div.options ul li');
						
						for (var j=0;j<options.length;j++)
						{
							if ($(options[j]).html().indexOf(solutions[i][1])>-1){
								$(options[j]).click();
							}
						}
					}else{
						var options = $('#mpcatPopup div.subpop.doorOption div.options ul li');
						var rnd = Math.round(Math.random());
						
						$(options[solutions[i][1][rnd]]).click();
					}
				}
			}
		}
	}
}

window.setTimeout(testFunc, 1000);
intv = window.setInterval(testPopups, 3000);
intv2 = window.setInterval(testEnd, 5000);