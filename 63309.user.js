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
			var point = parseInt(energy.match(/([0-9]+)/i)[1]);

			//alert('pet [' + name + '], energy [' + point + ']');
			
			if (point >= 10) {
				var chore;
				
				if (point == 100) {
					//Date
					chore = 8;
				}
				else
				if (point >= 75) {
					//Do a Magic Trick
					chore = 4;
				}
				else
				if (point >= 65) {
					//Drink
					chore = 9;
				}
				else
				if (point >= 60) {
					//Sucker Punch
					chore = 11;
				}
				else
				if (point >= 50) {
					//Cheer
					chore = 6;
				}
				else
				if (point >= 35) {
					//Hug
					chore = 2;
				}
				else
				if (point >= 30) {
					//Babysit
					chore = 7;
				}
				else
				if (point >= 25) {
					//Give a Balloon
					chore = 5;
				}
				else {
				//if (point >= 10) {
					//Flirt with
					chore = 3;
				}
				
				//alert('chore is ' + chore);
				work = $('span.chore_container:eq(' + chore + ') a');
				//var chorename = $('span.name', work[0]).html();
				//alert('work is ' + chorename);
				performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq(0) a');
				performClick(friend[0]);
				//var friendname = $('span.name', friend).html();
				//alert('friend is ' + friendname);
				
				// action
				var action = $('div.buy a');
				performClick(action[0]);
			}
			else {
				//alert('Too low energy. Max is ' + point);
				//document.location.reload();
				window.setTimeout(refresh, 5040000);	//delay 14hours to nearly full energy
				//window.setTimeout(refresh, 20000);	//delay 20 seconds
			}
		}
	}
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