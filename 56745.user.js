// ==UserScript==
// @name           FFS Auto Work
// @namespace      http://userscripts.org/scripts/show/24984
// @include        http://apps.facebook.com/friendsforsale/chores*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @implementation pineflower
// ==/UserScript==

function work() {
	if (window.location.href.indexOf('chores') !== -1) {
		
		var firstPets = $('span.pet_container:eq(0) a');
		if (firstPets.length) {
			performClick(firstPets[0]);
			
			var name = $('span.name', firstPets[0]).html();
			var energy = $('span.energy', firstPets[0]).html();
			
			//alert('pet [' + name + '], energy [' + energy + ']');
			
			var chore = matchChore(energy);
			if (chore > -1) {
				//alert('chore is ' + chore);
				work = $('span.chore_container:eq(' + chore + ') a');
				var chorename = $('span.name', work[0]).html();
				//alert('work is ' + chorename);
				performClick(work[0]);
				var work_energy = $('span.energy_icon', work[0]).html();
				
				// friend
				
				var friend = $('span.friend_container:eq(0) a');
				var friend_name = $('span.name', friend[0]).html();
				if (friend_name == name)
				{
					friend = $('span.friend_container:eq(1) a');
					friend_name = $('span.name', friend[0]).html();
					performClick(friend[0]);
				}
				else
					performClick(friend[0]);
				//var friendname = $('span.name', friend).html();
				//alert('friend is ' + friendname);
				
				/*
				//manual select Friend
				var friend = $('span.friend_container:eq(0) span.friend_container:eq(1)');
				var friend_name = 'Kien Can';
				if (friend_name == name)
				{
					friend_name = $('span.name', friend[1]).html();
					performClick(friend[1]);
				}
				else
				{
					var addfriend = $('div.search_box.input.inputsubmit');
					performClick(friend[0]);
				}
				*/
				
				// action
				var action = $('#app7019261521_checkout div.buy:eq(1) a');
				performClick(action[0]);
				//alert('pet\'s energy is ' + energy + ', chore is ' + chorename + ', energy is ' + work_energy + ', friend is ' + friend_name);

				//confirm
				performClick(document.getElementsByName('button1')[0])
			} else {
				//alert('Too low energy. Max is ' + energy);
				//document.location.reload();
				window.setTimeout(refresh, 5040000);	//delay 14hours to nearly full energy
				//window.setTimeout(refresh, 20000);	//delay 20 seconds
			}
		}
	}
}

function matchChore(energy) {
	var chores = document.getElementsByClassName("chore_container");
	var bestenergy = 0;
	var bestindex = -1;

	var petenergy = parseInt(energy.match(/([0-9]+)/i)[1]);

	// iterate through chores
	for (chore in chores) {
		// ignore any chores not displayed
		if (chores[chore].getElementsByClassName) {
			// select chore that has highest energy
			var chorevalue = chores[chore].getElementsByClassName("energy_icon")[0].innerHTML;
			var chorename = chores[chore].getElementsByClassName("name")[0].innerHTML;
			var choreenergy = parseInt(chorevalue.match(/([0-9]+)/i)[1]);
			
			//alert('Chore ' + chore + ': ' + chorename + ', ' + choreenergy + ' | Pet energy ' + petenergy + ' best energy ' + bestenergy + ' best index ' + bestindex);
			
			if (chorename == 'Unclog Toilet' || 
				chorename == 'Pick-up Poop') {
				continue;	//do not force friend work these tasks ;)
			}
			if (petenergy >= choreenergy && choreenergy > bestenergy) {
				bestenergy = choreenergy;
				bestindex = chore;
			}
		}
	}
	
	return bestindex;
}

function performClick(node) {
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, false);
	node.dispatchEvent(evt);
}

function refresh() {
	document.location.reload();
}

window.setTimeout(work, 7000);	//delay 7 seconds
//work;