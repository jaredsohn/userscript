// ==UserScript==
// @name           FFS Auto Work
// @description    FFS Auto Work Pets. Order by energy.
// @namespace      http://userscripts.org/scripts/show/24984
// @include        http://apps.facebook.com/friendsforsale/chore*
// @implementation pineflower
// ==/UserScript==

var _delay = 5000;	//time to do on next pet
var _delay2 = 600000;	//time to charge 1 energy (10 minutes)
var _lowEnergy = 74;	//low energy: skip
var _polite = 1;	//skip 'Unclog Toilet' and 'Pick-up Poop'
var _multichores = 1;	//allow multi chores
var _userIDSpammed = 0;//100000474862353;	//0 means not spam

function work() {
	if (window.location.href.indexOf('chores') !== -1) {
		var pets = document.getElementsByClassName("pet_container")
		if (pets.length) {
			performClick(pets[0]);
			var petName = pets[0].getElementsByClassName("name")[0].innerHTML;
			petName = petName.trim();
			var strPetEnergy = pets[0].getElementsByClassName("energy")[1].innerHTML;
			var petEnergy = parseInt(strPetEnergy.match(/([0-9]+)/i)[0]);
			//alert('pet [' + petName + '], strPetEnergy [' + strPetEnergy + ']' + ' int(' + petEnergy + ')');
			
			var chore = matchChore(petEnergy);
			if (chore > -1) {
				if (_userIDSpammed > 0) {
					_multichores = 0;	//specified friend, do not allow multiple friends
					dispatchLink('http://apps.facebook.com/friendsforsale/chores?client_id=' + _userIDSpammed);
				}
				
				var chores = document.getElementsByClassName("chore_container");
				var choreName = chores[chore].getElementsByClassName("name")[0].innerHTML;
				var strChoreEnergy = chores[chore].getElementsByClassName("energy_icon")[0].innerHTML;
				var choreEnergy = parseInt(strChoreEnergy.match(/([0-9]+)/i)[1]);
				performClick(chores[chore]);
				//alert(choreName + ' (' + chore + '-' + choreEnergy + ')');
				
				// friend
				if (_userIDSpammed < 1) {
					var friends = document.getElementsByClassName("friend_container");
					var friendName = friends[0].getElementsByClassName("name")[0].innerHTML;
					friendName = friendName.trim();
					if (friendName == petName) {
						friendName = friends[1].getElementsByClassName("name")[0].innerHTML;
						performClick(friends[1]);
					}
					else
						performClick(friends[0]);
					friendName = friendName.trim();
					
					if (petEnergy >= 2*choreEnergy) {
						var friendName2 = friends[1].getElementsByClassName("name")[0].innerHTML;
						friendName2 = friendName2.trim();
						if (friendName2 == petName || friendName2 == friendName) {
							friendName2 = friends[2].getElementsByClassName("name")[0].innerHTML;
							performClick(friends[2]);
						}
						else
							performClick(friends[1]);
						friendName2 = friendName2.trim();
						friendName = friendName + ', ' + friendName2;
					}
				}
				
				// action
				var actions = document.getElementsByClassName("buy");;
				//alert(actions + ' (' + actions.length + ')');
				performClick(actions[2]);	//Add Coins | Cancel | <Work>

				//alert('Pet is ' + petName + ', energy ' + petEnergy + '\nChore is ' + choreName + ', energy ' + choreEnergy + '\nFriend is ' + friendName);
			} else {
				window.setTimeout(refresh, (100-petEnergy)*_delay2 - _delay2/2);	//delay to full energy
				//alert('' + ((100-petEnergy)*_delay2/1000));
			}
		}
	}
}

function matchChore(energy) {
	var bestEnergy = 0;
	var bestIndex = -1;

	if (energy <= _lowEnergy) {
		return bestIndex;
	}

	var chores = document.getElementsByClassName("chore_container");

	// iterate through chores
	var isMulti = 0;
	for (chore in chores) {
		// ignore any chores not displayed
		if (chores[chore].getElementsByClassName) {
			// select chore that has highest energy
			var choreName = chores[chore].getElementsByClassName("name")[0].innerHTML;
			var strChoreEnergy = chores[chore].getElementsByClassName("energy_icon")[0].innerHTML;
			var choreEnergy = parseInt(strChoreEnergy.match(/([0-9]+)/i)[1]);
			
			//alert('Chore ' + chore + ': ' + choreName + ', ' + choreEnergy + ' | Pet energy ' + energy + ' best energy ' + bestEnergy + ' best index ' + bestIndex);
			
			if (_polite == 1 &&
				(choreName == 'Unclog Toilet' || choreName == 'Pick-up Poop')) {
				continue;	//do not force friend work these tasks ;)
			}
			
			if (_multichores == 1 && energy >= 2*choreEnergy && 2*choreEnergy > bestEnergy) {
				bestEnergy = 2*choreEnergy;
				bestIndex = chore;
				isMulti = 1;
			}
			if (energy >= choreEnergy && ((isMulti == 1 && choreEnergy >= bestEnergy) || (isMulti == 0 && choreEnergy > bestEnergy))) {
				bestEnergy = choreEnergy;
				bestIndex = chore;
				isMulti = 0;
			}
		}
	}
	
	return bestIndex;
}

function performClick(node) {
	if (!node)
		return;

	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

	//console.log(node);
	var link = node.getElementsByTagName("a")[0];
	link.dispatchEvent(evt);
}

function dispatchLink(link) {
	window.location.href=link;
}

function refresh() {
	document.location.reload();
}

if (_userIDSpammed > 0) {
	window.setTimeout(work, _delay/2);
}
else {
	window.setTimeout(work, _delay);
}